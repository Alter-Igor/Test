import { IAddParticipantService } from "./IAddParticipantService";

export interface IRoleConfigModels {
  roleSystemName: string;
  label: string;
  required: boolean;
  showSearchOds: boolean;
  defaultToCurrentUser: boolean;
  displayName: string;
  addMenuOptions: AddMenuOption[];
  addService: IAddParticipantService;
}



export interface AddMenuOption {
  title: string;
  alt?: any;
  options: any[];
}