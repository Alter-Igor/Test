// import { DEBUG_DEFAULT } from "../BaseClasses/DebugDefaults";
// import { IDefaultSettingsWithSpecificComponentConfig } from "../BaseClasses/IWidgetJson";

// export interface IODSPickerConfiguration {
//   showPreSharedo: boolean;
//   showPostSharedo: boolean;
//   narrowLabel: boolean;
//   roleConfigModels: IRoleConfigModel[];
//   noOdsEntityMessage: string;
//   noOdsEntityRequiredMessage: string;
// }

// export interface IRoleConfigModel {
//   roleSystemName: string;
//   required: boolean;
//   showSearchOds: boolean;
//   defaultToCurrentUser: boolean;
//   displayName: string;
//   validation?: IValidation;
// }

// export interface IValidation {
//   roleSystemName?: any;
//   hasErrors: boolean;
// }


// export const Default: IDefaultSettingsWithSpecificComponentConfig<IODSPickerConfiguration>= 
//   {
//       "showPreSharedo": true,
//       "showPostSharedo": true,
//       "narrowLabel": false,
//       noOdsEntityMessage: '',
//       noOdsEntityRequiredMessage: '',
//       "roleConfigModels": [
//           {
//               "roleSystemName": "client",
//               "required": true,
//               "showSearchOds": true,
//               "defaultToCurrentUser": false,
//               "displayName": "Client"
//           },
//           {
//               "roleSystemName": "matter-party",
//               "required": false,
//               "showSearchOds": true,
//               "defaultToCurrentUser": false,
//               "displayName": "Matter Party"
//           }
//       ],
//       debug:DEBUG_DEFAULT(),
//       eventsToReactTo: [],
//       dataSettings:{
//           getValueUsingParents: false,
//           maxDepth: 0,
//       }
  
//   }
  