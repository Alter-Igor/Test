export interface IODSPickerConfiguration {
  showPreSharedo: boolean;
  showPostSharedo: boolean;
  narrowLabel: boolean;
  roleConfigModels: IRoleConfigModel[];
  noOdsEntityMessage: string;
  noOdsEntityRequiredMessage: string;
}

export interface IRoleConfigModel {
  roleSystemName: string;
  required: boolean;
  showSearchOds: boolean;
  defaultToCurrentUser: boolean;
  displayName: string;
  validation?: IValidation;
}

export interface IValidation {
  roleSystemName?: any;
  hasErrors: boolean;
}

