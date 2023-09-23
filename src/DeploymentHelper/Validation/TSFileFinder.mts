
import * as path from 'path';
import fs from 'fs';
import { ISetting } from "../Interfaces/IBuildConfiguration";
import { IFinalTargetSettings } from "../Interfaces/IFinalTargetSettings";
import { l, inf, err } from '../Log.mjs';

export type ITargetTSFile = {
    tsFileName : string | undefined,
    tsFilePath : string | undefined,
    error : string | undefined,
    success : boolean
}

export function getTargetTSFileName(targetValue: ISetting, newTarget: IFinalTargetSettings): ITargetTSFile {


    let retValue:ITargetTSFile = {
        tsFileName : undefined,
        tsFilePath : undefined,
        error : undefined,
        success : false
    }

    if(!targetValue.sourcePath)
    {
        l(`        No sourcePath found`);
        retValue.error = `No sourcePath found`;
        return retValue;
    }

    let mainEntryFileName = newTarget.name + ".ts";
    let widgetMainPath = path.join(targetValue.sourcePath, mainEntryFileName);


    l(inf(`        Checking for ${mainEntryFileName} File in ${mainEntryFileName}`));

    if (fs.existsSync(widgetMainPath)) {
        retValue.tsFileName = mainEntryFileName;
        retValue.tsFilePath = widgetMainPath;
        retValue.success = true;
    }
    else {
        
        l(err(`        No Main File ${mainEntryFileName} Found`));
        retValue.error = `No Main File ${mainEntryFileName} Found`;
    }

    return retValue;

}