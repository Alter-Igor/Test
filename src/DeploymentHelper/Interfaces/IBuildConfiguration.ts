
export interface IBuildConfiguration {
    defaults: IDefaults;
    targets: ITargets | undefined;
}

export interface IDefaults {
    ideRoot: string;
    defaultModulesToExtract: IExtract[] | undefined,
    typeDefaults: ITypeDefaults | undefined;
}


export interface ITypeDefaults {
    [key: string]: ISettingDefaults;
}

export interface ITargets {
    [key: string]: ITargetEntry;
}

export interface ITargetEntry {
    [key: string]: ISetting;
}


export interface ISettingDefaults {
    enabled: boolean;
    deployPath: string;
    sourcePath: string;
    modulesToExtract?: IExtract[]
}

export interface ISetting {
    enabled?: boolean;
    deployPath?: string;
    sourcePath?: string;
    modulesToExtract?: IExtract[]
}

export interface IExtract {
    modules: string[];
    extractedFileName: string;
}




//Test the JSON Config against the interfaces here
let test: IBuildConfiguration = {
    "defaults":
    {
        "ideRoot": "_ideFiles",
        "defaultModulesToExtract": [
            {
                "modules": ["lodash"],
                "extractedFileName": "lodash.js"
            }
        ],
        "typeDefaults": {
            "Globals": {
                "enabled": true,
                "deployPath": "/Users/igorsharedo/Desktop/Test/_IDE/Globals",
                "sourcePath": "/Users/igorsharedo/Desktop/Test/src/WebBased/Globals",
                "modulesToExtract": [
                    {
                        "modules": ["jquery", "axios"],
                        "extractedFileName": "utils.js"
                    }
                ]


            },
            "Widgets": {
                "deployPath": "/Users/igorsharedo/Desktop/Test/_IDE/Widgets",
                "sourcePath": "/Users/igorsharedo/Desktop/Test/src/WebBased/Widgets",
                "enabled": true
            },
            "IDEAspects": {
                "deployPath": "/Users/igorsharedo/Desktop/Test/_IDE/IDEAspects",
                "sourcePath": "/Users/igorsharedo/Desktop/Test/src/WebBased/IDEAspects",
                "enabled": true
            },
            "WorkflowActions": {
                "deployPath": "/Users/igorsharedo/Desktop/Test/_IDE/WorkflowActions",
                "sourcePath": "/Users/igorsharedo/Desktop/Test/src/NodeBased/WorkflowActions",
                "enabled": true
            }
        }
    },
    "targets": {
        "IDEAspects": {
            "OdsPicker": {
                "modulesToExtract": []
            },
            "DatePickerAspect": {}
        },
        "WorkflowActions": {
            "LargeFiles": {
                "enabled": false
            },
            "CustomProgressMilestone": {
                "enabled": true
            }
        }
    }
}