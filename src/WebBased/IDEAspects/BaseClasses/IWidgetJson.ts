
export interface IWidgetJson {
  type: "wf-action" | "widget";
  priority: number;
  designer: IWidgetJsonDesigner;
  scripts: string[];
  styles: string[];
  templates: string[];
  menuTemplates: any[];
  components: string[];
}

export interface IWidgetJsonDesigner {
  allowInPortalDesigner: boolean;
  allowInSharedoPortalDesigner: boolean;
  allowAspectAdapter: boolean;
  title: string;
  icon: string;
  description: string;
  categories: any[];
  isConfigurable: boolean;
  configurationWidget?: any;
}