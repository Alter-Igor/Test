import { IBuildConfiguration } from "../Interfaces/IBuildConfiguration";
import {l} from "../Log.mjs";

export function logConfigurationDefaults(config:IBuildConfiguration) {
    l(`Reading Configuration [BuildConfigurations.json] `.green.underline);
    l(`Types Defined:`.magenta.bgBlack);

    if(!config.defaults.typeDefaults)
    {
        l(`No typeDefaults found in config`.red.bold);
        return;
    }

    Object.keys(config.defaults.typeDefaults).forEach(key => {
        let typeDefault = config.defaults.typeDefaults![key] 

        // * First variable in the Object.assign() is the target object so typeDefault is the overriding object
        l(` -- ${key} --`.green.bold);
      
        // if (typeDefault.sourcePath) {
        //     l(`    Will build from: ` + `${typeDefault.sourcePath}`.magenta.bold);
        // }
        // if (typeDefault.deployPath) {
        //     l(`    Will deploy to: ` + `${typeDefault.deployPath}`.magenta.bold);
        // }
        l(typeDefault);
    });
}