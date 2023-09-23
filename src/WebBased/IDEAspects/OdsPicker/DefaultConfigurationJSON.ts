import { IWidgetJson } from '../BaseClasses/IWidgetJson';
import {Default, IODSPickerConfiguration} from './IOdsPickerConfig';


export const Settings : IWidgetJson<IODSPickerConfiguration> = {
    type: 'widget',
    "priority": 6000,
    "designer": {
        "allowInPortalDesigner": false,
        "allowInSharedoPortalDesigner": false,
        "allowAspectAdapter": true,
        "title": "Ods Picker",
        "icon": "fa-cog",
        "description": "Custom ODS Picker.",
        "categories": [],
        "isConfigurable": true,
        "configurationWidget": "IDEAspects.OdsPickerDesigner",
        "defaultConfigurationJson": Default
    },
    "scripts": [
    ],
    "styles": [
        "OdsPicker.css"
    ],
    "templates": [
        "OdsPicker.html"
    ],
    "menuTemplates": [],
    "components": [
        "Sharedo.Core.Case.Participants.AddParticipantService"
    ]
}