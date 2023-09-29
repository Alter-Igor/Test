import { IDebug } from "./IDebug";

export const DEBUG_DEFAULT = () =>  {

    let retValue:IDebug = {
      supportRequestEnabled: false,
      enabled: true,
      logToConsole: true,
      showInAspect: false,
      liveConfig: true,
    }
    return retValue;
  
  }