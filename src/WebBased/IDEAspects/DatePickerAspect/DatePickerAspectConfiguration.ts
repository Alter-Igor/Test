import { Options } from '@eonasdan/tempus-dominus';
import { IDefaultSettingsWithSpecificComponentConfig, IWidgetJson } from '../BaseClasses/IWidgetJson';
import { DEBUG_DEFAULT } from '../BaseClasses/DebugDefaults';


export interface IDatePickerAspectOptions {
    title: string  | undefined; //the title to display above the date picker
    formBuilderField: string  | undefined; //the form builder field to get the value from and set the value to
    pickerEnabled: boolean  | undefined; //if true, the date picker will be enabled
    eventToFireOnUpdate: Array<string> | undefined; //the event to fire when the date is updated
    datePickerOptions: Options  | undefined; //the options to pass to the date picker 
    hideInputBox: boolean  | undefined; //if true, the input box will be hidden
    defaultValue:
    {
        defaultDateFromNowHours: number  | undefined; //when no value is set, set the date to now + this number of hours
    }
    
}

export const DATE_PICKER_DEFAULTS : IDefaultSettingsWithSpecificComponentConfig<IDatePickerAspectOptions>=
{
          
    "formBuilderField": "eDiscoveryUpdatePlannedDate",
    "hideInputBox": true,
    "defaultValue":{
        "defaultDateFromNowHours": 24,
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
    "debug": DEBUG_DEFAULT(),
    "refreshOn": {
        "sharedoIdChanged": false,
        "sharedoParentIdChanged": false,
        "sharedoPhaseChanged": false,
    },
    "eventsToReactTo": [],
    "dataSettings": {
        "getValueUsingParents": false,
        "maxDepth": 0,
    }
}

export const DATE_PICKER_WIDGET_DEFAULTS : IWidgetJson<IDatePickerAspectOptions>= {
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

        "defaultConfigurationJson":  { configuration: DATE_PICKER_DEFAULTS}
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