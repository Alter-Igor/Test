import { IDebug } from "./IDebug";
import {
  IDefaultSettingsWithSpecificComponentConfig,
  IErrorManagement,
  IErrorTrap,
  IRefreshOn,
  ISharedoPanelConfig,
  ISupportButton,
} from "./Interfaces";

export const DEBUG_DEFAULT = () => {
  //! this is a function for debug purpose only

  let retValue: IDebug = {
    enabled: true,
    logToConsole: true,
    showInAspect: false,
    liveConfig: false,
  };
  return retValue;
};

export const DEFAULT_SHAREDO_COMMAND: ISharedoPanelConfig = {
  typeSystemName: "task",
  title: "Support Required for ${dataContext.pageContext.user.firstname} ${dataContext.pageContext.user.lastname} on ${dataContext.pageContext.pageTitle}",
  description: undefined
}

export const DEFAULT_SUPPORT_BUTTON: ISupportButton = {
  raiseSupportTicket: true,
  supportTicketMessage: "Support Required for ${dataContext.pageContext.user.firstname} ${dataContext.pageContext.user.lastname} on ${dataContext.pageContext.pageTitle} context ${JSON.stringify(dataContext)}",
  raiseSupportTicketSharedoCommand: DEFAULT_SHAREDO_COMMAND,
  dataContext: "Populated by the system",
  title: "Raise Support Ticket",
  styleRules: undefined,
  classRules: undefined,
  toolTip: "Raise a support ticket with the support desk",
  enabled: false
};



export const REFRESH_ON_DEFAULTS: IRefreshOn = {
  sharedoIdChanged: false,
  sharedoParentIdChanged: false,
  sharedoPhaseChanged: false,
};

export const DEFAULT_ERROR_MANAGEMENT_TRAPS: IErrorTrap[] = [
  {
    dataContext: null,
    enabled: true,
    rule: "dataContext.error.message.toLowerCase().includes('forbidden')",
    userFreindlyMessage: "The matter is not accessible to you. It may be behind a Information Barrier.",
    resolutionSuggestions: ["Please contact the matter owner for access."],
    userFreindlyHTMLMessageTemplate: undefined,
    supportButton: DEFAULT_SUPPORT_BUTTON,
    styleRules: [
      {
        rule: "true",
        style: "box-shadow: 1px 1px 10px #d46060;",
      },
    ],
    classRules: [
      {
        rule: "true",
        cssClass: "ems-selected-item",
      },
      {
        rule: "true",
        cssClass: "ems-show",
      },
    ],
  },
];

//classRules: ems-selected-item ems-show' style='box-shadow: 1px 1px 10px #d46060;',
//
//"Support Required for ${dataContext.pageContext.user.firstname} ${dataContext.pageContext.user.lastname} on ${dataContext.pageContext.pageTitle}"

export const DEFAULT_ERROR_MANAGEMENT_SETTINGS: IErrorManagement = {
  errorTraps: DEFAULT_ERROR_MANAGEMENT_TRAPS,
  enabled: true,
  displayUnTrappedErrorInAspect: true,
  unTrappedErrorsSupportButton: undefined,
}; 

export const DEFAULT_CONFIGURATION_SETTINGS: IDefaultSettingsWithSpecificComponentConfig<unknown> =
  {
    debug: DEBUG_DEFAULT(),
    refreshOn: REFRESH_ON_DEFAULTS, 
    eventsToReactTo: [
      {
        eventPath: "sharedo.updated",
        methodToCall: "refresh",
      },

      {
        eventPath: "sharedo.core.case.sharedo-updated",
        methodToCall: "refresh",
      },
    ],
    dataSettings: {
      getValueUsingParents: false,
      maxDepth: 0,
    },
    errorManagement: DEFAULT_ERROR_MANAGEMENT_SETTINGS,
  };
