import { l } from "../Log.mjs";
import { IFinalTargetSettings } from "../Interfaces/IFinalTargetSettings";
import { validationResults } from "./ValidationResults.mjs";
import * as path from 'path';
import * as fs from 'fs';
import { ISettingDefaults, ITargetEntry } from "../Interfaces/IBuildConfiguration";
import { getStringContentsFromfileUri } from "../../helpers/FileHelper.mjs";
import { parse } from "comment-json";

export async function validateAndBuildTargetSettings(targetTypeName: string, target: ITargetEntry, key: string, defaultValue: ISettingDefaults | undefined) {
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
        entryTSFile: "",
        designerPath: "",
        valid: true,
        manifest: "",
        modulesToExtract: [],
        designerManifest: undefined,
        bundleAnalyzer: false,
        enabled: true,
        namespace: targetTypeName,
        erros: new Array<string>()
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



    //search in the newTarget.sourcePath for either a .widget.json or a .wf-action.json




    let widgetJsonPath = findFileByExtension(".widget.json", targetValue.sourcePath);
    let wfActionJsonPath = findFileByExtension(".wf-action.json", targetValue.sourcePath);
    l(`        Checking for .widget.json  in ${widgetJsonPath}`.blue.bold);
    l(`        Checking for .wf-action.json  in ${wfActionJsonPath}`.blue.bold);
    if (widgetJsonPath) {
        newTarget.type = "widget";
        newTarget.manifest = widgetJsonPath;
    }
    else if (wfActionJsonPath) {
        newTarget.type = "wf-action";
        newTarget.manifest = wfActionJsonPath;
    }
    else {
        newTarget.valid = false;
        l(`        Type: ` + `Invalid ! No .widget.json or .wf-action.json found`.red.bold);
    }


    //validateNamespace
    //read the newTarget.manifest and check the namespace
    //if the namespace is not the same as the newTarget.namespace then set valid to false


    l(`Reading Manifest File: ${newTarget.manifest}`.blue.bold)

    let manifestFileContent = await getStringContentsFromfileUri(newTarget.manifest);

    try {


        // let manifestFileContent = fs.readFileSync(newTarget.manifest,'utf-8');
        let manifestJson = parse(manifestFileContent,undefined,true) as any;
        
        let idShouldBe = newTarget.namespace + "." + newTarget.name;

        let manifestValue = manifestJson.id;
        if(newTarget.type === "wf-action"){
            manifestValue = manifestJson.systemName;
        }

        if (manifestValue !== idShouldBe) {
            let errMessage = `Invalid ! Namespace in manifest is ${manifestValue} but should be ${idShouldBe}`
            l(`        Namespace: ` + errMessage.red.bold);
            l(`             File: ${newTarget.manifest}`.blue.bold)
            newTarget.erros.push(errMessage);
            newTarget.valid = false;
        }

        

    }
    catch (err) {
        let errMessage = `Invalid ! Error reading manifest file`
        l(`        Namespace: ` + errMessage.red.bold);
        l(`             File: ${newTarget.manifest}`.blue.bold)
        l(`            Error: `.red.bold,err);
        newTarget.erros.push(errMessage);
        newTarget.valid = false;

    }

    //check the sourcePath a directory called Designer
    let designerPath = path.join(targetValue.sourcePath, "Designer");
    l(`        Checking for Designer directory in ${designerPath}`.blue.bold);
    if (fs.existsSync(designerPath)) {
        newTarget.designerPath = designerPath;

        newTarget.designerManifest = findFileByExtension(".widget.json", designerPath);
        if (!newTarget.designerManifest) {
            newTarget.valid = false;
            let errMessage =`No Designer Manifest Found`
            l(`        ` + errMessage.red.bold);
            newTarget.erros.push(errMessage);

        }
    }
    else {
        l(`        No Designer Folder Exists`.red.bold);
    }


    //find the main entry points for the widget or wf-action
    //they would have the name of the folder with .ts on the end
    let mainEntryFileName = newTarget.name + ".ts";
    let widgetMainPath = path.join(targetValue.sourcePath, mainEntryFileName);


    l(`        Checking for ${mainEntryFileName} File in ${mainEntryFileName}`.blue.bold);
    if (fs.existsSync(widgetMainPath)) {
        newTarget.entryTSFile = widgetMainPath;
    }
    else {
        newTarget.valid = false;
        l(`        No Main File ${mainEntryFileName} Found`.red.bold);
    }


    //Log out the outcome results
    validationResults(newTarget);

    l(`End Result: `.green.bold)
    l(newTarget);

    return newTarget;
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