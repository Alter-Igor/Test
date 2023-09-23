import { Options } from '@eonasdan/tempus-dominus';
import { IWidgetJson } from '../BaseClasses/IWidgetJson';


export interface IDatePickerAspectOptions {
    title: string  | undefined;
    formBuilderField: string  | undefined;
    pickerEnabled: boolean  | undefined;
    eventToFireOnUpdate: Array<string> | undefined;
    datePickerOptions: Options  | undefined;
    defaultDateFromNowHours: number  | undefined;
}

export const setting : IWidgetJson<IDatePickerAspectOptions>= {
    type: 'widget',
    "priority": 6000,
    "designer": {
        "allowInPortalDesigner": false,
        "allowInSharedoPortalDesigner": false,
        "allowAspectAdapter": true,
        "title": "Date Picker Aspect",
        "icon": "fa-cog",
        "description": "Date Picker Aspect",
        "categories": [],
        "isConfigurable": true,
        "configurationWidget": null,

        "defaultConfigurationJson": {
            "formBuilderField": "eDiscoveryUpdatePlannedDate",
            "title": "Updated planned due date:",
            "pickerEnabled": true,
            "eventToFireOnUpdate": ["IDEAspects.DatePickerAspect.Update"],
            "defaultDateFromNowHours": 24,
            "datePickerOptions": {
                "display": {
                    "inline": true,
                    "sideBySide": true,
                    "theme": "light"
                }
            },
            "debug": {
                "enabled": true,
                "logToConsole": true,
                "showInAspect": true
            }
        }
    },
    "scripts": [],
    "styles": [
        "DatePickerAspect.css"
    ],
    "templates": [
        "DatePickerAspect.html"
    ],
    "menuTemplates": [],
    "components": []
}