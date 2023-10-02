import { IDebug } from "./IDebug";
import { IDefaultSettingsWithSpecificComponentConfig, IRefreshOn } from "./IWidgetJson";

export const DEBUG_DEFAULT = () =>  {

    let retValue:IDebug = {
      supportRequestEnabled: false,
      enabled: true,
      logToConsole: true,
      showInAspect: false,
      liveConfig: false,
    }
    return retValue;
  
  }

  export const REFRESH_ON_DEFAULTS :IRefreshOn=
  {
    sharedoIdChanged: false,
    sharedoParentIdChanged: false,
    sharedoPhaseChanged: false,
  }


  export const DefaultDataSettings:IDefaultSettingsWithSpecificComponentConfig<unknown> =
  {
    debug: DEBUG_DEFAULT(),
    refreshOn: REFRESH_ON_DEFAULTS,
    eventsToReactTo: [
      {
        eventPath: "sharedo.updated",
        methodToCall: "refresh"
      },
      {
        eventPath: "sharedo.core.case.sharedo-updated",
        methodToCall: "refresh"
      }
    ],
    dataSettings: {
      getValueUsingParents: false,
      maxDepth: 0
    }
  }
  