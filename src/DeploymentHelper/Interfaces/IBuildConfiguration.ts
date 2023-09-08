
export interface IBuildConfiguration {
    defaultModulesToExtract: IExtract[] | undefined;
    typeDefaults: ITypeDefaults | undefined;
    targets: ITargets | undefined;
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
  deployPath: string;
  sourcePath: string;
  modulesToExtract?: IExtract[]
}

export interface ISetting {
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
                        "modules":["jquery","axios"],
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
                    "modulesToExtract": [ ]
                }
            },
            "workflowActions": {
                "LargeFiles": {}
            }
        }
}