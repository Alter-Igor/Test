import { IWidgetJson } from "../BaseClasses/IWidgetJson";

export const Settings: IWidgetJson =
{
    "priority": 6000,
    "designer":
    {
        "allowInPortalDesigner": false,
        "allowInSharedoPortalDesigner": false,
        "allowAspectAdapter": true,
        "title": "External Matter Search",
        "icon": "fa-cog",
        "description": "External Matter Search",
        "categories":
            [],
        "isConfigurable": true,
        "configurationWidget": null
    },
    "scripts":
        [
            "/_ideFiles/IDEAspects/ExternalMatterSearch/ExternalMatterSearch.js"
        ],
    "styles":
        [
            "/_ideFiles/IDEAspects/ExternalMatterSearch/ExternalMatterSearch.css"
        ],
    "templates":
        [
            "/_ideFiles/IDEAspects/ExternalMatterSearch/ExternalMatterSearch.html"
        ],
    "menuTemplates":
        [
        ],
    "components":
        [
            "Sharedo.UI.Framework.Components.AutoComplete"
        ]
}

