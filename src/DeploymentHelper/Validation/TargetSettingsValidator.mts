import { l } from "../Log.mjs";
import { IFinalTargetSettings } from "../Interfaces/IFinalTargetSettings";
import { validationResults } from "./ValidationResults.mjs";
import * as path from 'path';
import * as fs from 'fs';
import { IDefaults, ISetting, ISettingDefaults, ITargetEntry } from "../Interfaces/IBuildConfiguration";
import { getStringContentsFromfileUri } from "../../helpers/FileHelper.mjs";
import { parse } from "comment-json";

export async function validateAndBuildTargetSettings(defaultSettings: IDefaults, targetTypeName: string, target: ITargetEntry, key: string, defaultValue: ISettingDefaults | undefined) {
    let targetValue = target[key];


    // if(!targetValue && defaultSettings){
    //     targetValue = defaultValue[key] ;
    // }


    // if (targetValue) {
    //     targetValue = Object.assign(targetValue, defaultValue); //Merge the target with the default values
    // }

    l("Key".green.bold)
    l(key);

    l("defaultValue from JSON Configuration".black.bold)
    l(defaultValue);

    l(`targetValue from JSON Configuration for ${key}`.black.bold)
    l(targetValue);

    let mergedSettings = Object.assign(targetValue, defaultValue); //Merge the target with the default values

    l("mergedSettings".magenta.bold)
    l(JSON.stringify(mergedSettings, null, 2).bgYellow);

    let newTarget: IFinalTargetSettings = {
        name: key,
        sourcePath: "",
        deployPath: "",
        type: "",
        designerPath: "",
        valid: true,
        manifestFilePath: "",
        manifestFileName: "",
        designerManifestFilePath: undefined,
        modulesToExtract: [],
        bundleAnalyzer: false,
        enabled: true,
        namespace: targetTypeName,
        erros: new Array<string>(),
        widgetTSFileName: "",
        widgetTSFilePath: "",
        factoryTSFileName: "",
        factoryTSFilePath: "",
        templateTsFileName: "",
        templateTsFilePath: "",
        cssFiles: [],
        htmlFiles: [],
        designerTSFileName: "",
        designerTSFilePath: "",
        designerCSSFiles: [],
        designerHTMLFiles: [],
        manifestJSON: undefined,
        designerManifestJSON: undefined
    }

    // Set the source and deploy paths to include the name of the target
    targetValue.sourcePath = path.join(targetValue.sourcePath!, key);
    targetValue.deployPath = path.join(targetValue.deployPath!, key);

    newTarget = Object.assign(newTarget, targetValue); //copy the object to a new object

    if (!newTarget.sourcePath) {
        l(`        No sourcePath created - Need to have either a default for the type or a specific for the target !`.red.bold);
        newTarget.valid = false;
        return newTarget;
    }
    if (!newTarget.deployPath) {
        l(`        No deployPath created - Need to have either a default for the type or a specific for the target !`.red.bold);
        newTarget.valid = false;
        return newTarget;
    }


    validateTypeAndManifest(newTarget,targetValue);
  
    await validateManifest(newTarget);
    //check the sourcePath a directory called Designer
    if (newTarget.type === "widget") {
        extractWidgetFilePaths(newTarget, targetValue);
    }
    else
    {
         validateWorkflowFiles(newTarget);
    }
    validateDesignerFiles(targetValue, newTarget);

    //Log out the outcome results
    validationResults(newTarget);

    l(`End Result: `.green.bold)
    l(newTarget);

    return newTarget;
}


function extractWidgetFilePaths(newTarget: IFinalTargetSettings, targetValue: ISetting) {
    if(!targetValue.sourcePath)
    {
        l(`        No sourcePath found`.red.bold);
        newTarget.erros.push(`No sourcePath found`);
        newTarget.valid = false;
        return;
    }

    let mainEntryFileName = newTarget.name + ".ts";
    let widgetMainPath = path.join(targetValue.sourcePath, mainEntryFileName);


    l(`        Checking for ${mainEntryFileName} File in ${mainEntryFileName}`.blue.bold);
    if (fs.existsSync(widgetMainPath)) {
        newTarget.widgetTSFileName = mainEntryFileName;
        newTarget.widgetTSFilePath = widgetMainPath;
    }
    else {
        newTarget.valid = false;
        l(`        No Main File ${mainEntryFileName} Found`.red.bold);
        newTarget.erros.push(`No Main File ${mainEntryFileName} Found`);
    }
}

async function validateManifest(newTarget: IFinalTargetSettings) {
    l(`Reading Manifest File: ${newTarget.manifestFilePath}`.blue.bold);
    l(`        :${newTarget.manifestFilePath}`.blue.bold);
    
    if(!newTarget.manifestFilePath || !fs.existsSync(newTarget.manifestFilePath))
    {
        let errMessage = `Invalid ! No manifest file found`;
        l(`        Namespace: ` + errMessage.red.bold);
        l(`             File: ${newTarget.manifestFilePath}`.blue.bold);
        newTarget.erros.push(errMessage);
        newTarget.valid = false;
        return;
    }

    let manifestFileContent = await getStringContentsFromfileUri(newTarget.manifestFilePath);

    try {
        // let manifestFileContent = fs.readFileSync(newTarget.manifest,'utf-8');
        let manifestJson = parse(manifestFileContent, undefined, true) as any;
        newTarget.manifestJSON = manifestJson;

        let idShouldBe = newTarget.namespace + "." + newTarget.name;

        let manifestValue = manifestJson.id;
        if (newTarget.type === "wf-action") {
            manifestValue = manifestJson.systemName;
        }

        if (manifestValue !== idShouldBe) {
            let errMessage = `Invalid ! Namespace in manifest is ${manifestValue} but should be ${idShouldBe}`;
            l(`        Namespace: ` + errMessage.red.bold);
            l(`             File: ${newTarget.manifestFilePath}`.blue.bold);
            newTarget.erros.push(errMessage);
            newTarget.valid = false;
        }

        //TODO: Validate all file references




    }
    catch (err) {
        let errMessage = `Invalid ! Error reading manifest file`;
        l(`        Namespace: ` + errMessage.red.bold);
        l(`             File: ${newTarget.manifestFilePath}`.blue.bold);
        l(`            Error: `.red.bold, err);
        newTarget.erros.push(errMessage);
        newTarget.valid = false;

    }
}

function validateTypeAndManifest(newTarget: IFinalTargetSettings,targetValue :ISetting) {

    l(`        Checking for Type and Manifest`.blue.bold);
    if(!targetValue.sourcePath || !fs.existsSync(targetValue.sourcePath))
    {
        l(`        Type: ` + `Invalid ! No sourcePath found`.red.bold);
        newTarget.valid = false;
        return;
    }
    if(!targetValue.deployPath)
    {
        l(`        Type: ` + `Invalid ! No deployPath found`.red.bold);
        newTarget.valid = false;
        return;
    }


     //search in the newTarget.sourcePath for either a .widget.json or a .wf-action.json
     let widgetJsonPath = findFileByExtension(".widget.json", targetValue.sourcePath);
     let wfActionJsonPath = findFileByExtension(".wf-action.json", targetValue.sourcePath);
     l(`        Checking for .widget.json  in ${widgetJsonPath}`.blue.bold);
     l(`        Checking for .wf-action.json  in ${wfActionJsonPath}`.blue.bold);
    
    if (widgetJsonPath) {
        newTarget.type = "widget";
        newTarget.manifestFilePath = widgetJsonPath;
        newTarget.manifestFileName = path.basename(widgetJsonPath);
    }
    else if (wfActionJsonPath) {
        newTarget.type = "wf-action";
        newTarget.manifestFilePath = wfActionJsonPath;
        newTarget.manifestFileName = path.basename(wfActionJsonPath);
    }
    else {
        newTarget.valid = false;
        l(`        Type: ` + `Invalid ! No .widget.json or .wf-action.json found`.red.bold);
    }
    l(`        Type: ` + newTarget.type.blue.bold);
}

function validateWorkflowFiles(newTarget: IFinalTargetSettings) {
    if (newTarget.type === "wf-action") {
        l(`Type is workflow, looking for factory and template files`.blue.bold);

        let foundTsFiles = findFilesByExtension(".ts", newTarget.sourcePath);
        let factoryFile = foundTsFiles.find(file => file.toLocaleLowerCase().endsWith("factory.ts"));
        if (!factoryFile) {
            l(`        No factory file found`.red.bold);
            newTarget.valid = false;
        }
        else {
          
            newTarget.factoryTSFileName = path.basename(factoryFile);;
            newTarget.factoryTSFilePath = factoryFile;
        }

        let templateFile = foundTsFiles.find(file => file.toLocaleLowerCase().endsWith("template.ts"));
        if (!templateFile) {
            l(`        No template file found`.red.bold);
            newTarget.valid = false;
        }
        else {
            newTarget.templateTsFileName = path.basename(templateFile);
            newTarget.templateTsFilePath = templateFile;
        }

    }
}

function validateDesignerFiles(targetValue: ISetting, newTarget: IFinalTargetSettings) {

    if(!targetValue.sourcePath || !fs.existsSync(targetValue.sourcePath))
    {
        l(`        No sourcePath found`.red.bold);
        newTarget.valid = false;
        return;
    }

    let designerPath = path.join(targetValue.sourcePath, "Designer");
    l(`        Checking for Designer directory in ${designerPath}`.blue.bold);
    if (fs.existsSync(designerPath)) {
        newTarget.designerPath = designerPath;

        newTarget.designerManifestFilePath = findFileByExtension(".widget.json", designerPath);
        if (!newTarget.designerManifestFilePath) {
            newTarget.valid = false;
            let errMessage = `No Designer Manifest Found`;
            l(`        ` + errMessage.red.bold);
            newTarget.erros.push(errMessage);

        }
        else
        {
            l(`        Designer Manifest Found: ${newTarget.designerManifestFilePath}`.blue.bold);
            try{
            newTarget.designerManifestJSON = parse(fs.readFileSync(newTarget.designerManifestFilePath,'utf-8'),undefined,true) as any;
            }
            catch(err)
            {
                newTarget.valid = false;
                let errMessage = `Error reading Designer Manifest ${newTarget.designerManifestFilePath}`;
                l(`        ` + errMessage.red.bold);
                newTarget.erros.push(errMessage);
            }
        }

        let foundTsFiles = findFilesByExtension(".ts", designerPath);
        let designerFile = foundTsFiles.find(file => file.toLocaleLowerCase().endsWith("designer.ts"));
        if (!designerFile) {
            newTarget.valid = false;
            let errMessage = `No Designer File Found`;
            l(`        ` + errMessage.red.bold);
            newTarget.erros.push(errMessage);
        }
        else {
            newTarget.designerTSFileName = path.basename(designerFile);
            newTarget.designerTSFilePath = designerFile;
        }

    }
    else {
        l(`        No Designer Folder Exists`.red.bold);
    }
    
}

export function findFileByExtension(extension: string, directory: string) {
    let files = fs.readdirSync(directory);
    let foundFile = files.find((file: any) => file.endsWith(extension));
    //get file path
    if (foundFile) {
        foundFile = path.join(directory, foundFile);
    }
    return foundFile;
}

export function findFilesByExtension(extension: string, directory: string) {
    let files = fs.readdirSync(directory);
    let foundFile = files.filter((file: any) => file.endsWith(extension));
    //get file path
    if (foundFile) {
        foundFile = foundFile.map((file: any) => path.join(directory, file));
    }
    return foundFile;
}