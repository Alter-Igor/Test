export interface ICoreAdminOdsPeople {
  resultCount: number;
  rows: Row[];
}

interface Row {
  id: string;
  colour?: any;
  icon?: any;
  title?: any;
  subTitle?: any;
  reference?: any;
  openCommand?: any;
  viewCommand: ViewCommand;
  menu: Menu[];
  cardViewActions?: any;
  enableDragDrop: boolean;
  dragDropBlade?: any;
  data: Data;
}

interface Data {
  id: string;
  title?: any;
  firstname: string;
  surname: string;
  isActive: boolean;
  wallsAssigned: boolean;
  partyTypes: any[];
  assignments: number;
  isUser: boolean;
  primaryEmail: string;
}

interface Menu {
  command?: any;
  children: Child[];
  title?: any;
  icon: string;
  commandForceNavigateNewWindow: boolean;
}

interface Child {
  command: Command;
  children?: any;
  title: string;
  icon: string;
  commandForceNavigateNewWindow: boolean;
}

interface Command {
  invokeType: string;
  invoke?: string;
  config: string;
}

interface ViewCommand {
  invokeType: string;
  invoke: string;
  config: string;
}