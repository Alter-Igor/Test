import { IFinalTargetSettings } from "../Interfaces/IFinalTargetSettings";
import { l as log } from "../Log.mjs";


/**
 * Runs though the target settings and checks if they are valid
 * @param newTarget 
 * @returns 
 */
export function validationResults(newTarget: IFinalTargetSettings) {

    if (newTarget.sourcePath) {
        log(`        Will build from: ` + `${newTarget.sourcePath}`.magenta.bold)
    }
    else {
        newTarget.valid = false;
        let errMessage = `        Will build from: ` + `Invalid ! No Value Set`.red.bold;
        newTarget.erros.push(errMessage);
        log(`        ` + errMessage)
    }

    if (newTarget.deployPath) {
        log(`        Will deploy to: ` + `${newTarget.deployPath}`.magenta.bold)
    }
    else {
        newTarget.valid = false;
        log(`        Will deploy to: ` + `Invalid ! No Value Set`.red.bold)
    }

    if (newTarget.entryTSFile) {
        log(`        Entry File: ` + `${newTarget.entryTSFile}`.magenta.bold)
    }
    else {
        newTarget.valid = false;
        let errMessage = `Entry File: ` + `Invalid ! No Value Set`.red.bold;
        log(`        `+ errMessage)
        newTarget.erros.push(errMessage);
    }

    if (newTarget.type) {
        log(`        Type: ` + `${newTarget.type}`.magenta.bold)
    }
    else {
        newTarget.valid = false;
        log(`        Type: ` + `Invalid ! No Value Set`.red.bold)
    }

    if (newTarget.valid == false) {
        log(`    - ${newTarget.name}` + " - Invalid - will not be built or deployed".red.bold)
    }
    return;
}