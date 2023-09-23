import { clearSec, err, l, lh3, secBackOne, wrn } from "../Log.mjs";
import { IFinalTargetSettings } from "../Interfaces/IFinalTargetSettings";
import { validateAndBuildTargetSettings } from "../Validation/TargetSettingsValidator.mjs";
import { IBuildConfiguration } from "../Interfaces/IBuildConfiguration";

export async function mergeDefaultsWithTargets(config: IBuildConfiguration) {

    if (!config.targets) {
        err(`No targets found in config`);
        return;
    }

    if (!config.defaults.typeDefaults) {
        wrn(`Warining! - No typeDefaults found in config`);

    }

    let targetsTypeNames = Object.keys(config.targets);
    let finalTargetSettings = new Array<IFinalTargetSettings>();
    clearSec();
    for (let i = 0; i < targetsTypeNames.length; i++) {

        let targetTypeName = targetsTypeNames[i];

        // targetsTypeNames.forEach(async targetTypeName => {

        let indentValue = 4;
        let indent = " ".repeat(indentValue);
        let targetEntries = config.targets![targetTypeName]
        let targetEntriesNames = Object.keys(config.targets![targetTypeName])
        let defaultValue = config.defaults.typeDefaults ? config.defaults.typeDefaults[targetTypeName] : undefined;

        if (!defaultValue) {
            defaultValue = {
                deployPath: "",
                sourcePath: "",
                modulesToExtract: [],
                enabled: true
            }
        }

        defaultValue.modulesToExtract = defaultValue.modulesToExtract ? defaultValue.modulesToExtract : [];
        if (config.defaults.defaultModulesToExtract) {
            let type = defaultValue.modulesToExtract;
            let global = config.defaults.defaultModulesToExtract;
            defaultValue.modulesToExtract = Object.assign(type, global);
        }


        lh3(`Processing Target Type: ${targetTypeName}`)
        l(defaultValue);
        l(`Targets that will be processed: `, targetEntriesNames);

        if (!defaultValue) {
            err(`No default settings found for ${targetTypeName}`);
            return;
        }

        let targetEntriesKeys = Object.keys(targetEntries);
        for (let j = 0; j < targetEntriesKeys.length; j++) {
            let key = targetEntriesKeys[j];
            // let targetEntry = targetEntries[key];

            lh3(`Processing Target ${key}`);
            let newTarget: IFinalTargetSettings = await validateAndBuildTargetSettings(config.defaults,targetTypeName, targetEntries, key, defaultValue);
            secBackOne();
            // newTarget.namespace = targetTypeName;
            finalTargetSettings.push(newTarget);

        };

        l(`=`.repeat(100).rainbow.bold);
        secBackOne();
    };
    return finalTargetSettings;
}


export function logOutMergedTargetSettings(targets: IFinalTargetSettings[]) {
    l('-'.repeat(80).yellow.bold);
    l(`Targets Generated: ${targets.length}`.bgBlack.yellow.bold);
    l('-'.repeat(80).yellow.bold);

    targets.forEach(target => {
        l(` - ${target.name}`.blue.bold);
        l(`    - sourcePath:` + ` ${target.sourcePath}`.green);
        l(`    - deployPath:` + ` ${target.deployPath}`.blue);
        l(`    - type:` + ` ${target.type}`.america.bold);
        l(`    - designer:` + ` ${target.designerPath}`.green.bold);
        if(target.valid)
        {
            l(`    - valid:` + ` ${target.valid}`.green.bold);
        }
        else
        {
            l(`    - valid:` + ` ${target.valid}`.red.bold);
            l(target.erros)
        }
    });
}