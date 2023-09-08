import * as fs from 'fs';
import * as JSONConfigFile from './BuildConfigurations.json'  // Ensure the correct path is provided
import { l } from './Log.mjs';
import { logConfigurationDefaults } from './DefaultSetter/LogDefaultSettings.mjs';
import { mergeDefaultsWithTargets, logOutMergedTargetSettings } from './DefaultSetter/MergeDefaultWithSettings.mjs';
import { IBuildConfiguration } from './Interfaces/IBuildConfiguration';


 function runBuild() {

    let config: IBuildConfiguration = JSONConfigFile as IBuildConfiguration;

    l("Starting Build Process".blue.underline.bold)
    logConfigurationDefaults(config);

    l(`Building Targets using defaults and target settings:`.red.bgBlack)
    let targets = mergeDefaultsWithTargets(config);

    if (!targets) {
        l(`No targets found in config`.red.bold);
        return false;
    }
    logOutMergedTargetSettings(targets);

    //write to targets to a file
    fs.writeFileSync('./targets.json', JSON.stringify(targets, null, 4));
    return true;
}



    

async function deleteFolder(folderPath: string): Promise<void> {
    try {

        await fs.promises.rmdir(folderPath, { recursive: true });
        l(`Folder ${folderPath} has been deleted!`);
    } catch (error) {
        console.error('Error deleting folder:', error);
    }
}

runBuild();