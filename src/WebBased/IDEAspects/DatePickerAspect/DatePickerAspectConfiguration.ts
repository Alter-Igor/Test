import { Options } from '@eonasdan/tempus-dominus';
import { IDefaultSettingsWithSpecificComponentConfig, IWidgetJson } from '../BaseClasses/Interfaces';
import { DEBUG_DEFAULT, DEFAULT_ERROR_MANAGEMENT_SETTINGS } from '../BaseClasses/DefaultSettings';


export interface IDatePickerAspectOptions {
    title: string  | undefined; //the title to display above the date picker
    formBuilderField: string  | undefined; //the form builder field to get the value from and set the value to
    getValueOptions: getValueOption[] | string  | undefined; //the field path to get the value from (if different from the form builder field)
    pickerEnabled: boolean  | undefined; //if true, the date picker will be enabled
    eventToFireOnUpdate: Array<string> | undefined; //the event to fire when the date is updated
    datePickerOptions: Options  | undefined; //the options to pass to the date picker 
    hideInputBox: boolean  | undefined; //if true, the input box will be hidden
    defaultValue:
    {
        defaultDateFromNowHours: number  | undefined; //when no value is set, set the date to now + this number of hours
    }
    
}


export interface getValueOption
{
    rule: string;
    fieldPath: string;
}



export const DATE_PICKER_DEFAULTS : IDefaultSettingsWithSpecificComponentConfig<IDatePickerAspectOptions>=
{
          
    "formBuilderField": "eDiscoveryUpdatePlannedDate",
    "getValueOptions": [
        {
            "rule": "!dataContext.aspectData.formBuilder.formData.eDiscoveryUpdatePlannedDate",
            "fieldPath":"form-alt-ediscovery-job-desired-completion-date-date-only.job-desired-completion-date",
        }
    ],
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
    },
    "errorManagement": DEFAULT_ERROR_MANAGEMENT_SETTINGS
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