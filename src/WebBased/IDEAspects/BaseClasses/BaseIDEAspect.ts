import * as ko from "knockout";
import { ISharedoBladeModel, TShareDoBlade, IConfigurationHost } from "../../../Interfaces/SharedoAspectModels";
import { IDebug } from "./IDebug";
import { toObservableObject } from "./KOConverter";
import { getNestedProperty, setNestedProperty } from "./ObjectHelpers";
import { v4 as uuid } from 'uuid';
import { TSharedo } from "../../../Interfaces/TSharedo";
import { IWidgetJson, I_IDE_Aspect_Modeller_Configuration} from "./IWidgetJson";
import { ShareDoEvent, fireEvent } from "../../Common/EventsHelper";

export type IDefaultSettings<T> = T & 
{ 
    debug: IDebug,
    eventsToReactTo: Array<EventToReactTo>
}

interface EventToReactTo{
    eventPath: string;
    methodToCall: string;
}

interface IDEAspectConfiguration {
    model: ISharedoBladeModel;
    blade: TShareDoBlade;
}

type Observableify<T> = {
    [P in keyof T]: ko.Observable<T[P]>;
};

export type ObservableConfigurationOptions<TConfig> = { [K in keyof IBaseIDEAspectConfiguration<TConfig>]: ko.Observable<IBaseIDEAspectConfiguration<TConfig>[K]>; }


export type IBaseIDEAspectConfiguration<TConfig> = IConfigurationHost & I_IDE_Aspect_Modeller_Configuration<TConfig>;
// abstract class Creator<TConfig> {
//     public abstract FactoryMethod(element: HTMLElement, configuration: IBaseIDEAspectConfiguration<TConfig>, baseModel: any): any;
// }



export const FOMR_BUILDER_PATH_STRING = "aspectData.formBuilder.formData";
export function getFormBuilderFieldPath(formBuilderField: string) {
    return `${FOMR_BUILDER_PATH_STRING}.${formBuilderField}`;
}

type ObservablePerson<TConfig> = Observableify<IBaseIDEAspectConfiguration<TConfig>>;

export abstract class BaseIDEAspect<TConfig, TPersitance>  {
    _data:any; //non model data storage
    originalConfiguration!: TConfig;
    configuration!: IBaseIDEAspectConfiguration<TConfig>;
    defaults: IDefaultSettings<TConfig> | undefined;
    element!: HTMLElement;
    model: any;
    enabled!: boolean;
    blade!: TShareDoBlade;
    loaded!: ko.Observable<boolean>;
    sharedoId: any;
    sharedoTypeSystemName!: ko.Observable<string>;
    validation: any;
    validationErrorCount!: ko.Observable<number>;
    baseModel!: TSharedo<any>;
    thisComponentName!: string;
    LocationToSaveOrLoadData: string | undefined; //The location to load and save the data from
    options!: ObservableConfigurationOptions<TConfig>
    uniqueId!: string;
    widgetSettings!: IWidgetJson<TConfig> ;



   
    /**
     * Base Constructor for all IDEAspects, forces the implementation of the load and save methods
     * @param componentName //The name of the component e.g. Aspect.QuickView
     * @param loadSaveLocation //The location to load and save the data from e.g. model.aspect.FormBuilder.formData
     * @param element //The element that the aspect is bound to
     * @param configuration //The configuration passed in from the blade and the design time configuration
     * @param baseModel //The base model passed in from the blade
     * @param defaults //The defaults passed in from the widget to set incase of bad configuration or missing configuration
     */
    constructor();
    constructor(element: HTMLElement, configuration: TConfig, baseModel: TSharedo<any>) 
    public constructor(...arr: any[]) 
    {

        this.widgetSettings = this.setWidgetJsonSettings();
        this.thisComponentName = this.setThisComponentName();
        this.defaults = this.setDefaults(); //setup the default by calling the abstract method in the child class
        this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
        
        if(arr.length === 0)
        {
            //This is the base constructor
            return;
        }

        if(arr.length === 3)
        {
            //This is the constructor that is called by the IDE
            this._initialise(arr[0], arr[1], arr[2]);
            
            this.fireEvent("onSetup", this.model);
            this.setup();
            this.fireEvent("afterSetup", this.model);
            return;
        }

    }

    _initialise(element: HTMLElement, configuration: I_IDE_Aspect_Modeller_Configuration<TConfig>, baseModel: TSharedo<any>)
    {
        this.uniqueId = uuid();
        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = configuration as IBaseIDEAspectConfiguration<TConfig>;
        this.baseModel = baseModel;
        
        // this.data = undefined;
        // Merge the configuration with the defaults
        this.configuration = $.extend(this.defaults, this.originalConfiguration) as IBaseIDEAspectConfiguration<TConfig>;
        this.element = element; 
        //create a new model
        this.model = this.configuration._host.model;
        this.enabled = this.model.canEdit;
        this.blade = this.configuration._host.blade;
        this.loaded = ko.observable(false);
        // Map the base model properties
        this.sharedoId = this.configuration._host?.model.id;
        if (!this.sharedoId || this.sharedoId()) {
            this.log("No sharedoId found");
        }
        this.sharedoTypeSystemName = this.configuration._host.model.sharedoTypeSystemName;
        if (!this.sharedoTypeSystemName || this.sharedoTypeSystemName()) {
            this.log("No sharedoTypeSystemName found");
        }

        this.options = toObservableObject(this.configuration);

        // Validation
        this.validation = {};
        this.validationErrorCount = ko.observable(0);

        this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave(); //setup the location to load and save the data from by calling the abstract method in the child class

        this.fireEvent("onInitialise", this.model);
    }


    get data() : TPersitance | undefined {
    
        if(this.LocationToSaveOrLoadData === undefined)
        {
            this.log("No location to load data from set - this method should be overriden", "red");
            return this._data;
        }

        let nestedData = getNestedProperty(this.model, this.LocationToSaveOrLoadData);
       
        this.log("Data found at location", "green", nestedData);
        let retValue = ko.toJS(nestedData);
        this.log("Data found at location", "green", retValue);
        return retValue;
    }

    set data(value: TPersitance | undefined) {
      
        if(this.LocationToSaveOrLoadData === undefined)
        {
            this.log("No location to save data to set - this method should be overriden", "red");
            this._data = value;
            return;
        }


        let valueToSet: any = value;
        // if(this.LocationToSaveOrLoadData.includes("formBuilder"))
        // {
        //     //formbuilder Data always need to be string
        //     this.log("Setting formbuilder data - converting to string", "green", value)
        //     valueToSet = JSON.stringify(value);
        //     this.log("after Setting formbuilder data - converted to string", "green", valueToSet)
        // }
        this.log("Setting data at location", "green",valueToSet);
        setNestedProperty(this.model, this.LocationToSaveOrLoadData, valueToSet);
        this.fireEvent("onDataChanged", this.model);

    }



    /**
     * ! important: Mandatory method to be implemented by the child class to set the defaults
     * * This method is called by the constructor to set the defaults
     * @returns Defaults<TConfig>
     * @memberof BaseIDEAspect
     * @abstract
     * 
     */
    abstract setDefaults(): IDefaultSettings<TConfig>;

    // /**
    //  * ! important: Mandatory method to be implemented by the child class to set the defaults for the widget.json
    //  */
    // abstract setExampleForModeller(): Defaults<TConfig>;

     /**
     * !IMPORTANT - This is the location of the data to load and save to
     * Examples of this are:
     * - aspectData.formBuilder.formData.{formBuilderField}
     * - aspectData.odsEntityPicker
     * - undefined (if no data is to be loaded or saved by the base class)
     * @returns The location of the data to load and save to OR undefined if no data is to be loaded or saved by the base class
     */
    abstract setLocationOfDataToLoadAndSave(): string | undefined;

    /**
     * !IMPORTANT - This is the name of the component e.g. QuickView 
     * This will also be used during the build and will be appended with the Built Target e.g. IDEAspects.QuickView
     */
    abstract setThisComponentName(): string; 


    /**
     * !IMPORTANT - This is the first method once the class has been constructed, default contructor logic should be placed here
     */
    abstract setup(): void;


    /**
     * !IMPORTANT - This is the settings for the widget.json that will be generated
     */
    abstract setWidgetJsonSettings(): IWidgetJson<TConfig>;



    // abstract setDependantScriptFiles(): string[];
    // abstract setDependantStyleFiles(): string[];
    // abstract setDependantTemplateFiles(): string[];
    // abstract setDependantMenuTemplateFiles(): string[];
    // abstract setDependantComponentFiles(): string[];
    // abstract setWidgetDesignerSettings(): IWidgetJsonDesigner;
    // abstract setPriority() : number;

    /**
     * Called by the aspect IDE adapter when the model is saved. Manipulate the
     * model as required.
     */
    public onSave(model: any): void {
        this.fireEvent("onSave", model);
        this.log("Saving, model passed in we need to persist to", "green", this.data);

        if(this.LocationToSaveOrLoadData === undefined)
        {
            this.log("No location to save data to set - this method should be overriden", "red");
            return;
        }


        let dataToPersist = this.data;
        let currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
        if(currentData)
        {
            this.log(`Current data at location ${this.LocationToSaveOrLoadData} :`, "magenta", currentData);
        }
        if (!currentData) {
           // this.log("Data does not exist, we will create", "orange");
          //  setNestedProperty(model, this.LocationToSaveOrLoadData, {});
           // currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
        }
        this.log(`New data to persist to location ${this.LocationToSaveOrLoadData} :`, "blue", dataToPersist);
        setNestedProperty(model, this.LocationToSaveOrLoadData, dataToPersist);
        
    };


   

    onDestroy(model?: any) {
        this.log("IDEAspects.Example : onDestroy");
        this.fireEvent("onDestroy", model);
    };

    /**
     * Called by the UI framework after initial creation and binding to load data
     * into it's model
     */
    loadAndBind() {
        this.log("IDEAspects.Example : loadAndBind");
        this.log("Loading data (model:any) passed in", "green");
        this.log("Loading data based on location to save", "green", this.LocationToSaveOrLoadData);
        this.fireEvent("onLoad", this.model);
    };

    /**
     * Called by the aspect IDE adapter before the model is saved
     */
    onBeforeSave(model: Sharedo.Core.Case.Sharedo.Models.Sharedo) {
        this.log("IDEAspects.Example : onBeforeSave");
        this.fireEvent("onBeforeSave", model);
    }


    /**
     * Called by the aspect IDE adapter after the model has been saved.
     */
    onAfterSave(model: Sharedo.Core.Case.Sharedo.Models.Sharedo) {
        this.log("IDEAspects.Example : onAfterSave");
        this.fireEvent("onAfterSave", model);
    }

    /**
     * Called by the aspect IDE adapter when it reloads aspect data
     */
    onReload(model: Sharedo.Core.Case.Sharedo.Models.Sharedo) {
        this.log("IDEAspects.Example : onReload");
        this.fireEvent("onReload", model);
    }


    /**
     * Provides logging for the component based on the debug configuration
     * @param message 
     * @param color 
     * @param data 
     */
    log(message: string, color?: string, data?: any): void {
        if (this.configuration.debug?.enabled) {
            if (this.configuration.debug.logToConsole) {
                if (!color) color = "black";
                // let lineNo = extractLineNumberFromStack((new Error()).stack);
                console.log(`%c ${this.thisComponentName} - ${message}`, `color:${color}`, data);
            }
        }
    }

    fireEvent(eventName: string, data: any) {
        let event: ShareDoEvent = {
            eventPath: this.thisComponentName + "." + eventName,
            eventName: eventName,
            source: this,
            data: data
        }
        fireEvent(event);
    }
    

    /**
     * 
     * @returns Formbuild if it exists or creates it if it does not
     * 
     */
    formbuilder() {

        if (!this.blade?.model?.aspectData?.formBuilder?.formData) {
            this.log("blade.model.aspectData.formBuilder.formData not found - will create the path", "blue");
        }
        else
        {
            this.log("blade.model.aspectData.formBuilder.formData found", "green");
        }

        //Ensure the path exists
        this.blade = this.blade || {};
        this.blade.model = this.blade.model || {};
        this.blade.model.aspectData = this.blade.model.aspectData || {};
        this.blade.model.aspectData.formBuilder = this.blade.model.aspectData.formBuilder || { formData: {} };

   
        return this.blade.model.aspectData.formBuilder.formData;

    }

    formbuilderField(formbuilderField:string, setValue?: string) {
        if (!this.formbuilder()) {
            this.log("Form builder does not exist! ", "red");
            throw new Error("Form builder does not exist!");
        }

        let foundValue = this.formbuilder()[formbuilderField]
        if (!foundValue) {
            this.log(`Form builder does not contain field ${formbuilderField} `, "orange");
            this.log(`Creating field ${formbuilderField} `, "blue");
            this.formbuilder()[formbuilderField] = undefined;
        }

        //Are we doing a set
        if (setValue) {
            this.log(`Setting ${formbuilderField} to ${setValue}`, "green");
            this.formbuilder()[formbuilderField] = setValue;
            return setValue;
        }

        return foundValue;
    }

}



// class MyClass {

//     public constructor();
//     public constructor(p1: number);
//     public constructor(p1: string, p2: string);
//     public constructor(p1: string, p2: string, p3: string);

//     public constructor(...arr: any[]) {
//         if (arr.length === 2) {
//             console.log('two arguments constructor called.');
//         } else if (arr.length === 3) {
//             console.log('three arguments constructor called.');
//         } else if (arr.length === 1) {
//             console.log('one argument constructor called.');
//         }
//     }

// }

// let x = new MyClass()