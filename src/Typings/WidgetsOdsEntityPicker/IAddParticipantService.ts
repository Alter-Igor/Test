import { IOdsEntity } from "./IOdsEntity";


export interface IAddParticipantService {
  options: Options;
  sharedoId?: any;
  addToSharedoId?: any;
  roleSystemNames: string[];
  selectMode: boolean;
  hasSharedoInfo: string;
  referenceData: ReferenceData;
  participantAddOptions: ParticipantAddOption[];
  loaded: boolean;
  selectedEntity: (value:IOdsEntity|undefined) => IOdsEntity; // add update ods entity
  createSelectedEntityModel(odsId:string,odsType:string,odsName:string,isUser?:boolean):IOdsEntity;
}

export interface ParticipantAddOption {
  role: Role;
  hasAncestorRoleRestrictions: boolean;
  allowedRolesForAncestor?: any;
  ancestors: any[];
}

export interface Role {
  systemName: string;
  name: string;
  iconClass: string;
  isMandatory: boolean;
  isRecommended: boolean;
  isCaseTeamRole: boolean;
  isSecurityTeamRole: boolean;
  isManuallyAssignable: boolean;
  canBeOrdered: boolean;
  canHaveMultiple: boolean;
  canSelectFromOds: boolean;
  canSelectFromSharedo: boolean;
  canSelectFromAncestors: boolean;
  hasAspects: boolean;
  categoryName: string;
  locationTypes: any[];
  allowedParticipantTypes: AllowedParticipantType[];
}

export interface AllowedParticipantType {
  systemName: string;
  name: string;
  iconClass: string;
  addCommand: AddCommand;
  odsEntityTypeSystemName: string;
}

export interface AddCommand {
  invokeType: string;
  invoke: string;
  config: string;
}

export interface ReferenceData {
  participantTypes: ParticipantType[];
  odsTypes: OdsType[];
}

export interface OdsType {
  systemName: string;
  name: string;
  isPersonTag: boolean;
  isOrganisationTag: boolean;
  isTeamTag: boolean;
  isUserTag: boolean;
  displayColour?: string;
  iconClass?: string;
  enableForSearch: boolean;
  enableQuickLink: boolean;
  canAssignTag: boolean;
  canModifyEntity: boolean;
  allowedEntityTypes: string[];
}

export interface ParticipantType {
  systemName: string;
  name: string;
  description?: any;
  enabled: boolean;
  onAddParticipantMenu: boolean;
  iconClass: string;
  openCommand?: string;
  addCommand?: string;
  odsEntityTypeSystemName?: string;
}

export interface Options {
  addNewParticipantsToSharedoId?: any;
  rolesForAddToSharedoId: boolean;
  entityTypes: any[];
  participantTypes: any[];
  excludedParticipantTypes: any[];
  odsType?: any;
  roleSystemNames: string[];
  canAddToAncestors: boolean;
  tryAutoAddParticipant: boolean;
  onAutoAddParticipant?: any;
  filterRolesOnAddParticipantBlade: boolean;
  defaultToSearch: boolean;
  canAddEntityTypes: string[];
  alwaysDefaultToSearchForAncestors: boolean;
}

export interface AddMenuOption {
  title: string;
  alt?: any;
  options: any[];
}