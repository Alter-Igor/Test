import { DEBUG_DEFAULT } from "../BaseClasses/DebugDefaults";
import { IDefaultSettings, IWidgetJson } from "../BaseClasses/IWidgetJson";

export interface ISingleValueAspectConfiguration {
    fieldPath: string | undefined,
    title: string | undefined
    valueOnNotFound: string | undefined,
    calculatedValue: string;
    calculatedTitle: string;
    formatter: string | undefined,
}


export const Default: IDefaultSettings<ISingleValueAspectConfiguration> = {
    fieldPath: "Title",
    title: "Title Value",
    calculatedValue: "",
    calculatedTitle: "",
    valueOnNotFound: "Not Found",
    formatter: "value",
    debug: DEBUG_DEFAULT(),
    eventsToReactTo: [
        {
            eventPath: "sharedo.core.case.phase-changed",
            methodToCall: "loadAndBind"
        },
        {
            eventPath: "sharedo.core.case.forms.phase.phase-changed",
            methodToCall: "loadAndBind"
        },
        {
            eventPath: "sharedo.updated",
            methodToCall: "loadAndBind"
        },
        {
            eventPath: "sharedo.core.case.sharedo-updated",
            methodToCall: "loadAndBind"
        }
    ],
    dataSettings: {
        getValueUsingParents: false,
        maxDepth: 0,
    }
}

export const WidgetSettings : IWidgetJson<ISingleValueAspectConfiguration> ={
    type: "widget",
    "priority": 6000,
    "designer": {
        "allowInPortalDesigner": false,
        "allowInSharedoPortalDesigner": false,
        "allowAspectAdapter": true,
        "title": "Single Value Aspect",
        "icon": "fa-cog",
        "description": "Single Value Aspect",
        "categories": [],
        "isConfigurable": true,
        "configurationWidget": null,
        "defaultConfigurationJson": Default
    },
    "scripts": [
    ],
    "styles": [
        "SingleValueAspect.css"
    ],
    "templates": [
        "SingleValueAspect.html"
    ],
    "menuTemplates": [],
    "components": []
}