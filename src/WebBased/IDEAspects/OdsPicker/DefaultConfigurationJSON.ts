import {IODSPickerConfiguration} from './IOdsPickerConfig';
export const exampleODSPickerDefaultConfigurationJSON:IODSPickerConfiguration =
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
    ]

}
