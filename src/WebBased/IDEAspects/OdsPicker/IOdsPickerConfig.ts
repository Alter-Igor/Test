import { IDefaultSettings } from "../BaseClasses/BaseIDEAspect";
import { DEBUG_DEFAULT } from "../BaseClasses/DebugDefaults";

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


export const Default: IDefaultSettings<IODSPickerConfiguration>= 
  {
      "showPreSharedo": true,
      "showPostSharedo": true,
      "narrowLabel": false,
      noOdsEntityMessage: '',
      noOdsEntityRequiredMessage: '',
      "roleConfigModels": [
          {
              "roleSystemName": "client",
              "required": true,
              "showSearchOds": true,
              "defaultToCurrentUser": false,
              "displayName": "Client"
          },
          {
              "roleSystemName": "matter-party",
              "required": false,
              "showSearchOds": true,
              "defaultToCurrentUser": false,
              "displayName": "Matter Party"
          }
      ],
      debug:DEBUG_DEFAULT(),
      eventsToReactTo: []
  
  }
  