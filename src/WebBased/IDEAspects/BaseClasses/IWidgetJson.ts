import { IDebug } from "./IDebug";

export type I_IDE_Aspect_Modeller_Configuration<TConfig> = TConfig & {
  debug: IDebug;
}



export interface IWidgetJson<TConfigurationSettings> {
  type: "wf-action" | "widget";
  priority: number;
  designer: IWidgetJsonDesigner<I_IDE_Aspect_Modeller_Configuration<TConfigurationSettings>>;
  scripts: string[];
  styles: string[];
  templates: string[];
  menuTemplates: any[];
  components: string[];
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
  defaultConfigurationJson:TConfigurationSettingsWithCommon
}