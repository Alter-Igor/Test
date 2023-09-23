import * as fs from 'fs';
// import  JSONConfigFile from './BuildConfigurations.json' assert { type: "json" };  // Ensure the correct path is provided
import { clearSec, l, lh1, lh2 } from './Log.mjs';
import { logConfigurationDefaults } from './DefaultSetter/LogDefaultSettings.mjs';
import { mergeDefaultsWithTargets, logOutMergedTargetSettings } from './DefaultSetter/MergeDefaultWithSettings.mjs';
import { IBuildConfiguration } from './Interfaces/IBuildConfiguration';


 export async function runBuild(JSONConfigFile:IBuildConfiguration) {

    let config: IBuildConfiguration = JSONConfigFile as IBuildConfiguration;
    let sec = lh1("Starting Build Process")
    clearSec();
    logConfigurationDefaults(config);

    lh2(`Building Targets using defaults and target settings:`)
    let targets = await mergeDefaultsWithTargets(config);

    if (!targets) {
        l(`No targets found in config`.red.bold);
        return undefined;
    }
    await logOutMergedTargetSettings(targets);

    //write to targets to a file
    l(`Writing targets to file ./targets.json`.red.bgGreen)
    fs.writeFileSync('./targets.json', JSON.stringify(targets, null, 4));
    return targets;
}



    

async function deleteFolder(folderPath: string): Promise<void> {
    try {

        await fs.promises.rmdir(folderPath, { recursive: true });
        l(`Folder ${folderPath} has been deleted!`);
    } catch (error) {
        console.error('Error deleting folder:', error);
    }
}

// runBuild();