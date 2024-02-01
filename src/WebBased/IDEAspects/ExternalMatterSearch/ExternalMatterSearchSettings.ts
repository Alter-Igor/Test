import { IWidgetJson } from "../BaseClasses/Interfaces";
import { Default } from "./ExternalMatterSearchDefaults";
import { IExternalMatterSearchConfiguration } from "./ExternalMatterSearchInterface";
 
export const Settings: IWidgetJson<IExternalMatterSearchConfiguration> =
{
    type: "widget",
    "priority": 6000,
    "designer": {
        "allowInPortalDesigner": false,
        "allowInSharedoPortalDesigner": false,
        "allowAspectAdapter": true,
        "title": "External Matter Search",
        "icon": "fa-cog",
        "description": "External Matter Search",
        "categories": [],
        "isConfigurable": true,
        "configurationWidget": null,
        defaultConfigurationJson:{ configuration: Default}
    },
    "scripts": [
    ],
    "styles": [
        "ExternalMatterSearch.css"
    ],
    "templates": [
        "ExternalMatterSearch.html"
    ],
    "menuTemplates": [],
    "components": [
        "Sharedo.UI.Framework.Components.AutoComplete",
        "Sharedo.Core.Case.TextEditor.Component",
        "Sharedo.UI.Framework.Components.SyntaxEditor"
    ]
}

