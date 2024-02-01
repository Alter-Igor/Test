import { IFinalTargetSettings } from "../Interfaces/IFinalTargetSettings";
import { validationResults } from "./ValidationResults.mjs";
import * as path from 'path';
import * as fs from 'fs';
import { IDefaults, ISetting, ITargetEntry } from "../Interfaces/IBuildConfiguration";
import { getStringContentsFromfileUri } from "../../helpers/FileHelper.mjs";
import { parse } from "comment-json";
import { getTargetTSFileName } from "./TSFileFinder.mjs";
import { mergeValues } from "./ObjectMerger.mjs";
import { compileTypeScriptToJavaScript } from "../TypeScriptToJavascript.mjs"
import { nv, l, inf, suc, err } from "../Log.mjs";
import { BaseIDEAspect } from "../../WebBased/IDEAspects/BaseClasses/BaseIDEAspect";
import { IWidgetJson } from "../../WebBased/IDEAspects/BaseClasses/Interfaces";

export async function validateAndBuildTargetSettings(defaultSettings: IDefaults, targetTypeName: string, target: ITargetEntry, key: string, defaultValue: ISetting) {
    let targetValue = target[key];


    // if(!targetValue && defaultSettings){
    //     targetValue = defaultValue[key] ;
    // }


    // if (targetValue) {
    //     targetValue = Object.assign(targetValue, defaultValue); //Merge the target with the default values
    // }

    nv("Key", key);

    l("defaultValue from JSON Configuration", defaultValue);
    l(`targetValue from JSON Configuration for ${key}`, targetValue);


    //merge targetValue  and defaultValue giving priority to targetValue




    // let mergedSettings = Object.assign(targetValue,defaultValue); //Merge the target with the default values

    targetValue = mergeValues(targetValue, defaultValue);


    l("mergedSettings".magenta.bold)
    l(JSON.stringify(targetValue, null, 2).bgYellow);

    let newTarget: IFinalTargetSettings = {
        name: key,
        sourcePath: "",
        deployPath: "",
        type: "",
        designerPath: "",
        valid: true,
        manifestFilePath: "",
        // manifestFileName: "",
        designerManifestFilePath: undefined,
        modulesToExtract: [],
        bundleAnalyzer: false,
        enabled: true,
        namespace: targetTypeName,
        erros: new Array<string>(),
        widgetTSFileName: "",
        // widgetTSFilePath: "",
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
        designerManifestJSON: undefined,
        tsFileInfo: {
            tsFileName: undefined,
            tsFilePath: undefined,
            error: undefined,
            success: false
        },
        manifestInfo: {
            manifestFileName: undefined,
            manifestFilePath: undefined,
            type: undefined,
            success: false,
            manifest: undefined
        },
        designerManifestInfo: {
            manifestFileName: undefined,
            manifestFilePath: undefined,
            type: undefined,
            success: false,
            manifest: undefined
        },
        tsDesignerFileInfo: {
            tsFileName: undefined,
            tsFilePath: undefined,
            error: undefined,
            success: false
        },
        publicPath: undefined
    }

    // Set the source and deploy paths to include the name of the target
    targetValue.sourcePath = path.join(targetValue.sourcePath!, key);
    targetValue.deployPath = path.join(targetValue.deployPath!, key);

    
    newTarget.publicPath= `/_ideFiles/${newTarget.namespace}/${newTarget.name}/`

    newTarget = Object.assign(newTarget, targetValue); //copy the object to a new object

    if (newTarget.enabled === false) {
        newTarget.valid = false;
        newTarget.erros.push("Target is disabled");
        return newTarget;
    }

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


    
    //Get TS files but not for workflows ! yet
    if(targetValue.type!=="workflow")
    {
        let getTargetTSFileNameResult = getTargetTSFileName(targetValue, newTarget);
        if (getTargetTSFileNameResult.success === false) {
            l(`        No Typescript file found`.red.bold);
            newTarget.valid = false;
            newTarget.erros.push(getTargetTSFileNameResult.error!);
            return newTarget;
        }
        newTarget.tsFileInfo = getTargetTSFileNameResult;
        l(`        Typescript file found: ${newTarget.tsFileInfo.tsFilePath}`);
    }
    else{
        validateWorkflowFiles(newTarget);
    }


    // validateTypeAndManifest(newTarget,targetValue);
    

    let manifestResult = await validateManifestSetManifestJSON(newTarget, targetValue);

    if (manifestResult.success === false) {
        let errMessage = `Invalid ! No Manifest file found`;
        l(`        Error: ` + err(errMessage));
        newTarget.valid = false;
        newTarget.erros.push(errMessage);
        return newTarget;
    }

    newTarget.manifestInfo = manifestResult;
    newTarget.type = manifestResult.type!;


    //check the sourcePath a directory called Designer
    if (newTarget.type === "widget") {
        // extractWidgetFilePaths(newTarget, targetValue);
    }
    
    validateDesignerFiles(targetValue, newTarget);

    //Log out the outcome results
    validationResults(newTarget);

   
    
    // l(`End Result: `.green.bold)
    // l(newTarget);

    return newTarget;
}


// /**
//  * Extract the widget file paths from the target settings
//  * populated the widgetTSFileName and widgetTSFilePath
//  * @param newTarget 
//  * @param targetValue 
//  */
// function extractWidgetFilePaths(newTarget: IFinalTargetSettings, targetValue: ISetting) {
//     let tsFile = getTargetTSFileName(targetValue, newTarget);
//     if (tsFile.success) {
//         newTarget.widgetTSFileName = tsFile.tsFileName!;
//         newTarget.widgetTSFilePath = tsFile.tsFilePath!;
//     }
//     else {
//         newTarget.valid = false;
//         newTarget.erros.push(tsFile.error!);
//     }
// }


export type IManifestInfo =
    {
        manifestFileName: string | undefined;
        manifestFilePath: string | undefined;
        type: string | undefined,
        success: boolean,
        manifest: IWidgetJson<any> | undefined
    }

/**
 * 
 * @param newTarget 
 * @param targetValue 
 * @returns The manifest as a object
 */
async function validateManifestSetManifestJSON(newTarget: IFinalTargetSettings, targetValue: ISetting): Promise<IManifestInfo> {

    let retValue: IManifestInfo = {
        type: undefined,
        success: false,
        manifest: undefined,
        manifestFileName: undefined,
        manifestFilePath: undefined
    }

    let tsFiles = getTargetTSFileName(targetValue, newTarget);

    if (targetValue.generatDefaultConfigurationJson && targetValue.generatDefaultConfigurationJson === true) {
        l(inf(`Generating Default Configuration Json from ${tsFiles.tsFilePath}`));

        l(inf(`Compiling Typescript to Javascript`));
        let generatedJsFilePath = await compileTypeScriptToJavaScript(tsFiles.tsFilePath!);
        l(inf(`Typescript Compiled`));

        if (!generatedJsFilePath ) {
            l(`        No javascript content found`.red.bold);
            newTarget.valid = false;
            return retValue;
        }
        l(suc(`Javascript Module Generated from Typescript and placed in ${generatedJsFilePath}`));
        let module = await import(generatedJsFilePath);
        let keys = Object.keys(module.default);
        l(suc(`Javascript Module Imported`) + inf(`${keys.join(",")}`));
        if (keys.includes(newTarget.name) === false) {
            let errMessage = `Invalid ! No class found with name ${newTarget.name} in file ${tsFiles.tsFilePath}, found ${keys.join(",")}`;
            l(`            Error: ` + errMessage);
            l(`             File: ${tsFiles.tsFilePath}`);
            newTarget.erros.push(errMessage);
            newTarget.valid = false;
            return retValue;
        }
        let instance: BaseIDEAspect<any, any>;
        l(inf(`Attempting to create instance of class [${newTarget.name}]`));

        try {
            instance = new module.default[newTarget.name]() as BaseIDEAspect<any, any>;
            if (!instance) {
                throw new Error(`Instance is null`);
            }
        }
        catch (err) {
            let errMessage = `Invalid ! Error creating instance of class ${newTarget.name} in file ${tsFiles.tsFilePath} - ${err}`;
            l(`            Error: ` + errMessage);
            l(`             File: ${tsFiles.tsFilePath}`);
            newTarget.erros.push(errMessage);
            newTarget.valid = false;
            return retValue;
        }


        let widgetSettings = instance.widgetSettings;
        if (!widgetSettings) {
            let errMessage = `Invalid ! No widgetSettings found in class ${newTarget.name} in file ${tsFiles.tsFilePath}`;
            l(`            Error: ` + errMessage);
            l(`             File: ${tsFiles.tsFilePath}`);
            newTarget.erros.push(errMessage);
            newTarget.valid = false;
            return retValue;
        }

        let name = instance.thisComponentName;
        if (!name) {
            let errMessage = `Invalid ! No thisComponentName found in class ${newTarget.name} in file ${tsFiles.tsFilePath}`;
            l(`            Error: ` + errMessage);
            l(`             File: ${tsFiles.tsFilePath}`);
            newTarget.erros.push(errMessage);
            newTarget.valid = false;
            return retValue;
        }

        let ideType = instance.widgetSettings.type;
        if (!ideType) {
            let errMessage = `Invalid ! No type found in widgetSettings in class ${newTarget.name} in file ${tsFiles.tsFilePath}`;
            l(`            Error: ` + errMessage);
            l(`             File: ${tsFiles.tsFilePath}`);
            newTarget.erros.push(errMessage);
            newTarget.valid = false;
            return retValue;
        }
        


        let manifest = {
            id: newTarget.namespace + "." + name,
        };
        manifest = Object.assign(manifest, widgetSettings);
        l(suc(`Manifest Generated`));
        retValue.manifest = (manifest as any) as IWidgetJson<any>;

        
        //build the scripts array
        retValue.manifest.scripts = retValue.manifest.scripts || [];
        //check that all scripts are in the same directory as the ts file
        retValue.manifest.scripts.forEach(script => {
            let scriptPath = path.join(path.dirname(tsFiles.tsFilePath!), script);
            if (!fs.existsSync(scriptPath)) {
                let errMessage = `Invalid ! Script file ${script} not found in ${path.dirname(tsFiles.tsFilePath!)}`;
                l(`            Error: ` + err(errMessage));
                l(`             File: ${tsFiles.tsFilePath}`);
                newTarget.erros.push(errMessage);
                newTarget.valid = false;
                return retValue;
            }
        });

        //we dont check for the default script as it will be generated
        let defaultScript = newTarget.name + ".js";
        retValue.manifest.scripts.push(defaultScript);

        //append newTarget.publicPath to all scripts
        retValue.manifest.scripts = retValue.manifest.scripts.map(script => newTarget.publicPath + script);

        //append newTarget.publicPath to all styles
        retValue.manifest.styles = retValue.manifest.styles || [];
        //check all styles are in the same directory as the ts file
        retValue.manifest.styles.forEach(style => {
            let stylePath = path.join(path.dirname(tsFiles.tsFilePath!), style);
            if (!fs.existsSync(stylePath)) {
                let errMessage = `Invalid ! Style file ${style} not found in ${path.dirname(tsFiles.tsFilePath!)}`;
                l(`            Error: ` + err(errMessage));
                l(`             File: ${tsFiles.tsFilePath}`);
                newTarget.erros.push(errMessage);
                newTarget.valid = false;
                return retValue;
            }
        });

        retValue.manifest.styles = retValue.manifest.styles.map(style => newTarget.publicPath + style);

        //append newTarget.publicPath to all templates
        retValue.manifest.templates = retValue.manifest.templates || [];

        //check all templates are in the same directory as the ts file
        retValue.manifest.templates.forEach(template => {
            let templatePath = path.join(path.dirname(tsFiles.tsFilePath!), template);
            if (!fs.existsSync(templatePath)) {
                let errMessage = `Invalid ! Template file ${template} not found in ${path.dirname(tsFiles.tsFilePath!)}`;
                l(`            Error: ` + err(errMessage));
                l(`             File: ${tsFiles.tsFilePath}`);
                newTarget.erros.push(errMessage);
                newTarget.valid = false;
                return retValue;
            }
        });

        retValue.manifest.templates = retValue.manifest.templates.map(template => newTarget.publicPath + template);

        //append newTarget.publicPath to all menuTemplates
        retValue.manifest.menuTemplates= retValue.manifest.menuTemplates || [];

        //check all menuTemplates are in the same directory as the ts file
        retValue.manifest.menuTemplates.forEach(menuTemplate => {
            let menuTemplatePath = path.join(path.dirname(tsFiles.tsFilePath!), menuTemplate);
            if (!fs.existsSync(menuTemplatePath)) {
                let errMessage = `Invalid ! Menu Template file ${menuTemplate} not found in ${path.dirname(tsFiles.tsFilePath!)}`;
                l(`            Error: ` + err(errMessage));
                l(`             File: ${tsFiles.tsFilePath}`);
                newTarget.erros.push(errMessage);
                newTarget.valid = false;
                return retValue;
            }
        });
        

        retValue.manifest.menuTemplates = retValue.manifest.menuTemplates.map(menuTemplate => newTarget.publicPath + menuTemplate);

    
        retValue.success = true;
        retValue.type = ideType;
        return retValue;
    }



    l(`Checking for Type and Manifest`);
    if (!targetValue.sourcePath || !fs.existsSync(targetValue.sourcePath)) {
        let errMessage = `Invalid ! No sourcePath found`;
        l(err(`        Error: ` + errMessage));
        l(`             File: ${targetValue.sourcePath}`);
        newTarget.erros.push(errMessage);
        newTarget.valid = false;
        return retValue;
    }


    //search in the newTarget.sourcePath for either a .widget.json or a .wf-action.json

    let widgetJsonPath = findFileByExtension(".widget.json", targetValue.sourcePath);
    let wfActionJsonPath = findFileByExtension(".wf-action.json", targetValue.sourcePath);
    l(`        Checking for .widget.json  in ${widgetJsonPath}`.blue.bold);
    l(`        Checking for .wf-action.json  in ${wfActionJsonPath}`.blue.bold);

    if (widgetJsonPath) {
        retValue.type = "widget";
        retValue.manifestFilePath = widgetJsonPath;
        retValue.manifestFileName = path.basename(widgetJsonPath);
    }
    else if (wfActionJsonPath) {
        retValue.type = "wf-action";
        retValue.manifestFilePath = wfActionJsonPath;
        retValue.manifestFileName = path.basename(wfActionJsonPath);
        
    }
    else {
        let errMessage = `Invalid ! No manifest file found`;
        l(`        Error: ` + errMessage);
        l(`             File: ${targetValue.sourcePath}`);
        newTarget.erros.push(errMessage);
        newTarget.valid = false;
        return retValue;
    }
    l(`        Type: ` + newTarget.type.blue.bold);


    l(`Reading Manifest File: ${newTarget.manifestFilePath}`.blue.bold);
    l(`        :${newTarget.manifestFilePath}`.blue.bold);

    if (!retValue.manifestFilePath || !fs.existsSync(retValue.manifestFilePath)) {
        let errMessage = `Invalid ! No manifest file found`;
        l(`        Namespace: ` + errMessage.red.bold);
        l(`             File: ${newTarget.manifestFilePath}`.blue.bold);
        newTarget.erros.push(errMessage);
        newTarget.valid = false;
        return retValue;
    }

    let manifestFileContent = await getStringContentsFromfileUri(retValue.manifestFilePath);

    if (!manifestFileContent) {
        let errMessage = `Invalid ! No manifest file found`;
        l(`        Error: ` + err(errMessage));
        newTarget.erros.push(errMessage);
        newTarget.valid = false;
        return retValue;
    }


    try {
        // let manifestFileContent = fs.readFileSync(newTarget.manifest,'utf-8');
        let manifestJson = parse(manifestFileContent, undefined, true) as any;
        retValue.success = true;
        retValue.manifest = manifestJson;

        //TODO: Ignore for now as this is for workflows and need to deal with 
        // let idShouldBe = newTarget.namespace + "." + newTarget.name;

        // let manifestValue = manifestJson.id;
        // if (newTarget.type === "wf-action") {
        //     manifestValue = manifestJson.systemName;
        // }

        // if (manifestValue !== idShouldBe) {
        //     let errMessage = `Invalid ! Namespace in manifest is ${manifestValue} but should be ${idShouldBe}`;
        //     l(`        Namespace: ` + errMessage.red.bold);
        //     l(`             File: ${newTarget.manifestFilePath}`.blue.bold);
        //     newTarget.erros.push(errMessage);
        //     newTarget.valid = false;
        // }

        return retValue;
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

    return retValue;
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

    if (!targetValue.sourcePath || !fs.existsSync(targetValue.sourcePath)) {
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
        else {
            l(`        Designer Manifest Found: ${newTarget.designerManifestFilePath}`.blue.bold);
            try {
                newTarget.designerManifestJSON = parse(fs.readFileSync(newTarget.designerManifestFilePath, 'utf-8'), undefined, true) as any;
            }
            catch (err) {
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

