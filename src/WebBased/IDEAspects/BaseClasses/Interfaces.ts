
import { IDebug } from "./IDebug";
import {  IStyleEntry, ICssClassEntry } from "./Template/Interfaces";

export type I_IDE_Aspect_Modeller_Configuration<TConfig> = IWidgetConfigSettings<TConfig> 

export type TDataSettings=
{
    getValueUsingParents: boolean,
    maxDepth: number,
} 

export interface EventToReactTo {
  eventPath: string;
  methodToCall: string;
}

export type IDefaultSettingsWithSpecificComponentConfig<TConfig> = TConfig & IDefaultSettings
// {
//     debug: IDebug,
//     eventsToReactTo: Array<EventToReactTo>,
//     refreshOn:IRefreshOn,
//     dataSettings:TDataSettings
//     // config:IDefaultConfigSettings<TConfig>
// }

export type IErrorManagement={
  enabled: boolean,
  errorTraps: IErrorTrap[],
  displayUnTrappedErrorInAspect?: boolean,
  unTrappedErrorsSupportButton?: ISupportButton
}

export type ISupportButton = {
  enabled:  boolean | undefined;
  title: string;
  toolTip: string;
  raiseSupportTicket: boolean,
  supportTicketMessage: string,
  raiseSupportTicketSharedoCommand: ISharedoPanelConfig,
  dataContext: string,
  styleRules : IStyleEntry,
  classRules: ICssClassEntry
}



export type TUserErrors =
    {
        code: string,
        message: string,
        userMessage: string,
        internalSuggestions?: Array<string>
        sharedoErrorActions?: Array<string>
        errorStack?: string,
        additionalInfo?: any,
        linkedTrappedError?: IErrorTrap
    }


export type IErrorTrap = {
  dataContext: any; //populated by the system
  enabled?: boolean,
  rule?: string | undefined,
  userFreindlyMessage?: string | undefined,
  userFreindlyHTMLMessageTemplate?: string | undefined,
  resolutionSuggestions?: string[] | undefined,
  supportButton?:ISupportButton | undefined,
  classRules?: ICssClassEntry,
  styleRules?: IStyleEntry,
}

// {
//   "invokeType": "panel",
//   "invoke": "Sharedo.Core.Case.Sharedo.AddEditSharedo",
//   "config": "{\"typeSystemName\":\"task-eddiscovery-adhoc\",\"title\":\"\",\"Support Request\":\"\"}"
// }

export type ISharedoPanelConfig = {
  typeSystemName: string,
  title: string,
  description: string | undefined,
}

export type ISharedoCommand = {
  invokeType: "panel",
  invoke: string,
  config: ISharedoPanelConfig
}



export type IDefaultSettings =
{
    debug: IDebug,
    eventsToReactTo: Array<EventToReactTo>,
    refreshOn:IRefreshOn,
    dataSettings:TDataSettings
    errorManagement: IErrorManagement | null;
}

export type IRefreshOn= {
  sharedoIdChanged: boolean,
  sharedoParentIdChanged: boolean,
  sharedoPhaseChanged: boolean,
}


// export type IDefaultSettingsWithSpecificComponentConfig<TConfig> = TConfig &
// {
//     debug: IDebug,
//     eventsToReactTo: Array<EventToReactTo>,
//     dataSettings:TDataSettings
// }

// export type IDefaultConfigSettings<TConfig> = TConfig &
// {
//     debug: IDebug,
//     eventsToReactTo: Array<EventToReactTo>,
//     dataSettings:TDataSettings
// }

export interface IWidgetJson<TConfigurationSettings> {
  type: "wf-action" | "widget";
  priority: number;
  designer: IWidgetJsonDesigner<IDefaultSettingsWithSpecificComponentConfig<TConfigurationSettings>>;
  scripts: string[];
  styles: string[];
  templates: string[];
  menuTemplates: any[];
  components: string[];
}

export interface IWidgetConfigSettings<TConfig> {
  configuration:IDefaultSettingsWithSpecificComponentConfig<TConfig>
}

export interface IWidgetJsonDesigner<TConfigurationSettingsWithCommon> {
  allowInPortalDesigner: boolean;
  allowInSharedoPortalDesigner: boolean;
  allowAspectAdapter: boolean;
  title: string;
  icon: string;
  description: string;
  categories: any[];
  isConfigurable: boolean;
  configurationWidget?: any;
  defaultConfigurationJson:IWidgetConfigSettings<TConfigurationSettingsWithCommon>
}

