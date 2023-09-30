import { Options } from '@eonasdan/tempus-dominus';
import { IWidgetJson } from '../BaseClasses/IWidgetJson';


export interface IDatePickerAspectOptions {
    title: string  | undefined; //the title to display above the date picker
    formBuilderField: string  | undefined; //the form builder field to get the value from and set the value to
    pickerEnabled: boolean  | undefined; //if true, the date picker will be enabled
    eventToFireOnUpdate: Array<string> | undefined; //the event to fire when the date is updated
    datePickerOptions: Options  | undefined; //the options to pass to the date picker 
    defaultValue:
    {
        defaultDateFromNowHours: number  | undefined; //when no value is set, set the date to now + this number of hours
        getValueUsingParents:boolean | undefined, //if true, will get the value from the parent data context if not found in the current data context
        maxDepth: number | undefined, //the max depth to search for the value in the parent and parent of parent data context 0 = current data context only
    }
    
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
            "defaultValue":{
                "defaultDateFromNowHours": 24,
                "getValueUsingParents":true,
                "maxDepth": 0,
            },

            "title": "Updated planned due date:",
            "pickerEnabled": true,
            "eventToFireOnUpdate": ["IDEAspects.DatePickerAspect.Update"],
            
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
            },
            "eventsToReactTo": [],
            "dataSettings": {
                "getValueUsingParents": false,
                "maxDepth": 0,
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