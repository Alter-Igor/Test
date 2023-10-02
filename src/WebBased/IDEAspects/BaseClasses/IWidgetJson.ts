import { IBaseIDEAspectConfiguration } from "./BaseIDEAspect";
import { IDebug } from "./IDebug";

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



export type IDefaultSettings =
{
    debug: IDebug,
    eventsToReactTo: Array<EventToReactTo>,
    refreshOn:IRefreshOn,
    dataSettings:TDataSettings
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