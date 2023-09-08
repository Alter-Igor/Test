"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Test the JSON Config against the interfaces here
var test = {
    defaultModulesToExtract: [
        {
            modules: ["lodash"],
            extractedFileName: "lodash.js"
        }
    ],
    typeDefaults: {
        "globals": {
            "deployPath": "/Users/igorsharedo/Desktop/Test/_IDE/Globals",
            "sourcePath": "/Users/igorsharedo/Desktop/Test/src/WebBased/Globals",
            "modulesToExtract": [
                {
                    "modules": ["jquery", "axios"],
                    "extractedFileName": "utils.js"
                }
            ]
        },
        "widgets": {
            "deployPath": "/Users/igorsharedo/Desktop/Test/_IDE/Widgets",
            "sourcePath": "/Users/igorsharedo/Desktop/Test/src/WebBased/Widgets"
        },
        "ideAspects": {
            "deployPath": "/Users/igorsharedo/Desktop/Test/_IDE/IDEAspects",
            "sourcePath": "/Users/igorsharedo/Desktop/Test/src/WebBased/IDEAspects"
        },
        "workflowActions": {
            "deployPath": "/Users/igorsharedo/Desktop/Test/_IDE/WorkflowsActions}",
            "sourcePath": "/Users/igorsharedo/Desktop/Test/src/NodeBased/WorkflowActions"
        }
    },
    targets: {
        "ideAspects": {
            "ODSPicker": {
                "modulesToExtract": []
            }
        },
        "workflowActions": {
            "LargeFiles": {}
        }
    }
};
