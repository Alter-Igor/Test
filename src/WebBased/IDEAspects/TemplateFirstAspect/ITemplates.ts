export interface ITemplatesListViewResult {
  resultCount: number;
  rows: IRow[];
}

export interface IRow {
  id: string;
  colour?: any;
  icon?: any;
  title?: any;
  subTitle?: any;
  reference?: any;
  openCommand?: any;
  viewCommand: IViewCommand;
  menu: IMenu[];
  cardViewActions?: any;
  enableDragDrop: boolean;
  dragDropBlade?: any;
  data: ITemplate;
}

export interface ITemplate {
  id: string;
  systemName: string;
  title: string;
  description: string;
  contextTypeSystemName?: string;
  contextTypeName?: string;
  baseTemplateType: string;
  templateType: string;
  isActive: boolean;
  isPinned: boolean;
  status: string;
  upgradeStatus?: string;
  upgradeMessage?: string;
  hasPlans: boolean;
  planCount: IPlanCount[];
  planCountValue: number;
  tags: string[];
  totalUsageCountValue: number;
  totalUsageCount: IPlanCount[];
  isContentBlock: boolean;
  isDocumentTemplate: boolean;
  isEmailTemplate: boolean;
  isSmsTemplate: boolean;
}

export interface IPlanCount {
  title?: any;
  countClass: string;
  value: number;
}

export interface IMenu {
  command?: any;
  children: IChild[];
  title?: any;
  icon: string;
  commandForceNavigateNewWindow: boolean;
}

export interface IChild {
  command?: ICommand;
  children?: any;
  title: string;
  icon?: string;
  commandForceNavigateNewWindow: boolean;
}

export interface ICommand {
  invokeType: string;
  invoke?: string;
  config: string;
}

export interface IViewCommand {
  invokeType: string;
  invoke: string;
  config: string;
}