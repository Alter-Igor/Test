import { DEBUG_DEFAULT, DEFAULT_ERROR_MANAGEMENT_SETTINGS } from "../BaseClasses/DefaultSettings";
import { IDefaultSettingsWithSpecificComponentConfig, IWidgetJson } from "../BaseClasses/Interfaces";

export interface ISingleValueAspectConfiguration {
    fieldPath: string | undefined,
    title: string | undefined | null
    valueOnNotFound: string | undefined,
    calculatedValue: string;
    calculatedTitle: string;
    formatter: string | undefined,
}


export const Default: IDefaultSettingsWithSpecificComponentConfig<ISingleValueAspectConfiguration> = {
 
    fieldPath: "title",
    title: null,
    calculatedValue: "",
    calculatedTitle: "",
    valueOnNotFound: "Not Found",
    formatter: "value",//if(priority.name === 'normal') {         return = '<span class="normal">Normal Priority</span>';     } else if(priority.name === 'high') {         return = '<span class="high">High Priority</span>';     } else if(priority.name === 'urgent') {         return = '<span class="urgent">Urgent Priority</span>';     } else {         return = '<span>Unknown Priority</span>';     }
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
    refreshOn: {
        sharedoIdChanged: true,
        sharedoParentIdChanged: true,
        sharedoPhaseChanged: true,
    },
    dataSettings: {
        getValueUsingParents: false,
        maxDepth: 0,
    },
    errorManagement: DEFAULT_ERROR_MANAGEMENT_SETTINGS,


}

export const WidgetSettings : IWidgetJson<ISingleValueAspectConfiguration> ={
    type: "widget",
    "priority": 6000,
    "designer": {
        "allowInPortalDesigner": false,
        "allowInSharedoPortalDesigner": true,
        "allowAspectAdapter": true,
        "title": "Single Value Aspect",
        "icon": "fa-cog",
        "description": "Single Value Aspect",
        "categories": [   "UD - IDEAspects"],
        "isConfigurable": true,
        "configurationWidget": null,
        "defaultConfigurationJson": { configuration: Default}
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