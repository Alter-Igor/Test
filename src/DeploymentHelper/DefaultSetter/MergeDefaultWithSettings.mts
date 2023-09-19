import { l } from "../Log.mjs";
import { IFinalTargetSettings } from "../Interfaces/IFinalTargetSettings";
import { validateAndBuildTargetSettings } from "../Validation/TargetSettingsValidator.mjs";
import { IBuildConfiguration } from "../Interfaces/IBuildConfiguration";

export async function mergeDefaultsWithTargets(config: IBuildConfiguration) {

    if (!config.targets) {
        l(`No targets found in config`.red.bold);
        return;
    }

    if (!config.defaults.typeDefaults) {
        l(`Warining! - No typeDefaults found in config`.cyan.bold);

    }



    let targetsTypeNames = Object.keys(config.targets);
    let finalTargetSettings = new Array<IFinalTargetSettings>();

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

        l(`=`.repeat(100).rainbow.bold);
        l(` - ${targetTypeName}`.padStart(50, " ").padEnd(100, " ").blue.bgYellow.bold);
        l(`Default Values:`.green.bold);
        l(defaultValue);
        l(`Targets that will be processed: `.green.bold, targetEntriesNames);



        if (!defaultValue) {
            l(`No default settings found for ${targetTypeName}`.red.bold);
            return;
        }

        let targetEntriesKeys = Object.keys(targetEntries);
        for (let j = 0; j < targetEntriesKeys.length; j++) {
            let key = targetEntriesKeys[j];
            // let targetEntry = targetEntries[key];

            l(` ----- Processing Target ${key} ----`.blue.bold);
            let newTarget: IFinalTargetSettings = await validateAndBuildTargetSettings(config.defaults,targetTypeName, targetEntries, key, defaultValue);
            // newTarget.namespace = targetTypeName;
            finalTargetSettings.push(newTarget);

        };

        l(`=`.repeat(100).rainbow.bold);
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