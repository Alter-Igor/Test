import { IWidgetJson } from "../../IDEAspects/BaseClasses/IWidgetJson";
import { ISingleValueAspectConfiguration, Default } from "../../IDEAspects/SingleValueAspect/SingleValueAspectConfig";

export interface ISingleValuePortalConfiguration extends ISingleValueAspectConfiguration {
    
}

export const SingleValuePortalDefault = Default;

export const WidgetSettings : IWidgetJson<ISingleValuePortalConfiguration> ={
    type: "widget",
    "priority": 6000,
    "designer": {
        "allowInPortalDesigner": true,
        "allowInSharedoPortalDesigner": true,
        "allowAspectAdapter": false,
        "title": "Single Value Portal Widget",
        "icon": "fa-cog",
        "description": "Show a single value in a portal widget",
        "categories": [   "UD - IDEAspects"],
        "isConfigurable": true,
        "configurationWidget": "PortalWidgets.SingleValuePortalWidgetDesigner",
        "defaultConfigurationJson": { configuration: Default}
    },
    "scripts": [
    ],
    "styles": [
        "SingleValuePortalWidget.css"
    ],
    "templates": [
        "SingleValuePortalWidget.html"
    ],
    "menuTemplates": [],
    "components": []
}