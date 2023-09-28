import * as ko from "knockout";
import { ISharedoBladeModel, TShareDoBlade, IConfigurationHost } from "../../../Interfaces/SharedoAspectModels";
import { IDebug, ObservableIDebug } from "./IDebug";
import { getNestedProperty, setNestedProperty } from "./ObjectHelpers";
import { v4 as uuid } from 'uuid';
import { TSharedo } from "../../../Interfaces/TSharedo";
import { IWidgetJson, I_IDE_Aspect_Modeller_Configuration } from "./IWidgetJson";
import { ShareDoEvent, fireEvent } from "../../Common/EventsHelper";
import { clearSec, err, inf, l, lh1, nv, wrn } from "../../../Common/Log"
import { IFormBuilderData } from "../../../Interfaces/Aspect/IFormBuilder";
import { TUserErrors } from "../../Common/api/api";
import { NestedObservableObject, toObservableObject } from "./KOConverter";


console.log("v: - 5.27")

export const FOMR_BUILDER_PATH_STRING = "aspectData.formBuilder.formData";
export const ERROR_DIV_SELECTOR = "#render-errors-here";

export type IDefaultSettings<T> = T &
{
    debug: IDebug,
    eventsToReactTo: Array<EventToReactTo>
}



interface EventToReactTo {
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

export type ObservableConfigurationOptions<TConfig> = 
{ [K in keyof IBaseIDEAspectConfiguration<TConfig>]: ko.Observable<IBaseIDEAspectConfiguration<TConfig>[K]>; }

// export type IObservableConfigurationOptions<TConfig> =  {debug: ko.Observable<ObservableIDebug>} &
// {
//     [K in keyof TConfig]: NestedObservableObject<TConfig>[K];
   
// }

export type IBaseIDEAspectConfiguration<TConfig> = IConfigurationHost & I_IDE_Aspect_Modeller_Configuration<TConfig>;
// abstract class Creator<TConfig> {
//     public abstract FactoryMethod(element: HTMLElement, configuration: IBaseIDEAspectConfiguration<TConfig>, baseModel: any): any;
// }




export function getFormBuilderFieldPath(formBuilderField: string) {
    return `${FOMR_BUILDER_PATH_STRING}.${formBuilderField}`;
}

type ObservablePerson<TConfig> = Observableify<IBaseIDEAspectConfiguration<TConfig>>;

export abstract class BaseIDEAspect<TConfig, TPersitance>  {
    _data: any; //non model data storage
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
    widgetSettings!: IWidgetJson<TConfig>;
    aspectLogOutput: HTMLDivElement | undefined;
    liveConfigDiv: HTMLElement | undefined;
    liveConfigData: any;
    errorDivSelector: string;
    errors: ko.ObservableArray<TUserErrors> | undefined;



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
    public constructor(...arr: any[]) {

        this.widgetSettings = this.setWidgetJsonSettings();
        this.thisComponentName = this.setThisComponentName();
        this.defaults = this.setDefaults(); //setup the default by calling the abstract method in the child class

        this.errorDivSelector = ERROR_DIV_SELECTOR;
        this.errors = ko.observableArray<TUserErrors>();

        if (arr.length === 0) {
            //This is the base constructor
            return;
        }

        if (arr.length === 3) {
            //This is the constructor that is called by the IDE
            this.uniqueId = uuid();
            this._initialise(arr[0], arr[1], arr[2]);
            this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
            this.fireEvent("onSetup", this.model);
            this.setup();
            this.fireEvent("afterSetup", this.model);
            this.setupLiveConfig();
            this.setupErrorManager();
            this.addAspectLogOutput();
            return;
        }

    }

    _initialise(element: HTMLElement, configuration: I_IDE_Aspect_Modeller_Configuration<TConfig>, baseModel: TSharedo<any>) {

        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = configuration as IBaseIDEAspectConfiguration<TConfig>;
        this.baseModel = baseModel;

        // this.originalConfiguration

        let baseDefaults: I_IDE_Aspect_Modeller_Configuration<any> = {
            debug: {
                enabled: false,
                logToConsole: false,
                showInAspect: false,
                liveConfig: false
            }
        }
        configuration.debug = $.extend(baseDefaults.debug, configuration.debug) as IDebug;

        // this.originalConfiguration.debug = $.extend(baseDefaults.debug, this.originalConfiguration.debug) as IDebug;

        // configuration.debug = $.extend(baseDefaults, configuration.debug) as IDebug;

        // this.configuration = $.extend(baseDefaults, this.originalConfiguration) as IBaseIDEAspectConfiguration<TConfig>;
        // this.data = undefined;
        // Merge the configuration with the defaults
        this.configuration = $.extend(this.defaults, this.originalConfiguration) as IBaseIDEAspectConfiguration<TConfig>;

        //create a new model
        this.model = this.configuration._host.model;
        this.enabled = this.model.canEdit;
        this.blade = this.configuration._host.blade;
        this.loaded = this.loaded || ko.observable(false);
        // Map the base model properties
        this.sharedoId = this.configuration._host?.model.id;
        if (!this.sharedoId || this.sharedoId()) {
            this.log("No sharedoId found");
        }
        this.sharedoTypeSystemName = this.configuration._host.model.sharedoTypeSystemName;
        if (!this.sharedoTypeSystemName || this.sharedoTypeSystemName()) {
            this.log("No sharedoTypeSystemName found");
        }

        (this.options as any) = toObservableObject(this.configuration, (this.options as any));

 
        // Validation
        this.validation = {};
        this.validationErrorCount = this.validationErrorCount || ko.observable(0);

        this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave(); //setup the location to load and save the data from by calling the abstract method in the child class
        this.fireEvent("onInitialise", this.model);
    }

    clearErrors(){
        this.errors?.removeAll();
    }

    setupErrorManager() {

        this.l("Setting up error manager");
        this.errors?.subscribe((newValue) => {
            this.inf("Errors changed", newValue);
            this.buildErrorDiv();
        });

    }

    setupLiveConfig() {
        this.options.debug.subscribe((newValue:any) => {
            if (newValue.liveConfig) {
                this.activateLiveConfig(newValue.liveConfig);
            }});

      
     
        this.activateLiveConfig((this.options.debug().liveConfig as any)()); //TODO fix typings
    }

    activateLiveConfig(active: boolean | undefined){
        if(!active)
        {
            this.liveConfigDiv?.remove();
            return;
        }

        if (this.liveConfigDiv) { //leave alone if already active
            return;
        }

        this.l("Setting up live config");

        const serializedData = JSON.stringify(this.configuration, (key, value) => {
            if (key === "_host") {
                return undefined;
            }
            return value;
        }, 4);

        //clone the config
        let config = ko.observable(serializedData);

        this.liveConfigData = {
            config: config, 
        };

        let timeout: boolean = false;



        this.liveConfigDiv = this.createLiveConfigDiv();

        this.element.prepend(this.liveConfigDiv);

        setTimeout(() => {
            config.subscribe((newValue) => {
                // console.log("The new value is " + newValue)

                if (timeout) {
                    return;
                }
                setTimeout(() => {
                    timeout = false;
                    let newConfig = JSON.parse(config())
                    this._initialise(this.element, newConfig, this.baseModel);
                    this.reset(newConfig);
                }, 5000);
                timeout = true;

            });
        }, 3000);


        // ko.applyBindings(this.liveConfigData, this.liveConfigDiv);x

        // }
    }

    /**
     * Abstract method to be implemented by the child class to refresh the aspect based on the new config
     * @param newConfig 
     */
    abstract refresh(newConfig: any): void;

    /**
    * Abstract method to be implemented by the child class to reset the aspect based on the new config
    * @param newConfig 
    */
    abstract reset(newConfig: any): void;


    createLiveConfigDiv(): HTMLElement {
        // Create the outer <div> with class "col-sm-12 formbuilder-editor-json"
        const outerDiv = document.createElement('div');
        outerDiv.className = 'col-sm-12 formbuilder-editor-json';

        // Create the inner <div> with the specified attributes
        const innerDiv = document.createElement('div');
        innerDiv.id = 'liveConfig';
        innerDiv.className = 'form-control textarea';
        innerDiv.style.height = '300px';
        // innerDiv.setAttribute('data-bind', 'syntaxEditor: liveConfigData.config, enable: true, event: { focusout: liveConfigData.onFocusOut }');
        innerDiv.setAttribute('data-bind', 'syntaxEditor: liveConfigData.config');
        // innerDiv.setAttribute('data-bind', 'syntaxEditor: model.config');
        // Append the innerDiv to the outerDiv
        outerDiv.appendChild(innerDiv);

        return outerDiv;
    }

    get data(): TPersitance | undefined {

        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to load data from set - this method should be overriden", "red");
            return this._data;
        }

        let nestedData = getNestedProperty(this.model, this.LocationToSaveOrLoadData);

        this.log("Data found at location", "green", nestedData);
        let retValue = ko.toJS(nestedData);
        this.log("Data found at location", "green", retValue);
        return retValue;
    }

    buildErrorDiv() {
        this.inf("Building error div")
        let errorDiv = this.element.querySelector(this.errorDivSelector);
        if (!errorDiv || !this.errors || this.errors() || this.errors().length === 0) {
            return;
        }

        l("errorDiv.innerHTML")
        errorDiv.innerHTML = ""; //clean out the div


        let errorContainerDiv = document.createElement("div");
        errorDiv.appendChild(errorContainerDiv);

        errorContainerDiv.className = "ems-error-container";
        let titleDiv = document.createElement("div");
        titleDiv.className = "ems-error-title";
        titleDiv.innerText = "There has been an error:";
        errorContainerDiv.appendChild(titleDiv);
        let foreachDiv = document.createElement("div");
        errorContainerDiv.appendChild(foreachDiv);
        this.errors().forEach((error) => {
            
            let userMessageDiv = document.createElement("div");
            userMessageDiv.className = "ems-error-user-message";
            userMessageDiv.innerHTML = error.userMessage;
            foreachDiv.appendChild(userMessageDiv);

            if(error.suggestions && error.suggestions.length > 0)
            {
                let suggestionsDiv = document.createElement("div");
                suggestionsDiv.className = "ems-error-suggestions";
                suggestionsDiv.innerHTML = `<b>Suggestions:</b><br/>${error.suggestions.join("<br/>")}`;
                foreachDiv.appendChild(suggestionsDiv);
            }

            if(error.actions && error.actions.length > 0)
            {
                let actionsDiv = document.createElement("div");
                actionsDiv.className = "ems-error-actions";
                actionsDiv.innerHTML = `<b>Actions:</b><br/>${error.actions.join("<br/>")}`;
                foreachDiv.appendChild(actionsDiv);
            }

            if(error.internalSuggestions && error.internalSuggestions.length > 0)
            {
                let internalSuggestionsDiv = document.createElement("div");
                internalSuggestionsDiv.className = "ems-error-internal-suggestions";
                internalSuggestionsDiv.innerHTML = `<b>Internal Suggestions:</b><br/>${error.internalSuggestions.join("<br/>")}`;
                foreachDiv.appendChild(internalSuggestionsDiv);
            }

        });

        if(this.options.debug().supportRequestEnabled)
        {
            let actionDiv = document.createElement("div");
            actionDiv.className = "ems-error-support-action";
            errorContainerDiv.appendChild(actionDiv);
            let button = document.createElement("button");
            button.className = "btn btn-primary";
            // button.setAttribute("data-bind","click:createSupportTask,visible:options.debug..supportRequestEnabled");
            button.innerText = "Create Support Task";
            actionDiv.appendChild(button);
        }

        
       

    }

    set data(value: TPersitance | undefined) {

        if (this.LocationToSaveOrLoadData === undefined) {
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
        this.log("Setting data at location", "green", valueToSet);
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

        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to save data to set - this method should be overriden", "red");
            return;
        }


        let dataToPersist = this.data;
        let currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
        if (currentData) {
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

    canLog(): boolean {
        return this.configuration.debug?.enabled;
    }
    logToConsole(): boolean {
        return this.canLog() && this.configuration.debug?.logToConsole;
    }
    logToAspect(): boolean {
        return this.canLog() && this.configuration.debug?.showInAspect
    }


    inf(message: string, ...args: any[]) {
        if (this.logToConsole()) {
            l(inf(message), ...args);
        }
    }

    wrn(message: string, ...args: any[]) {
        if (this.logToConsole()) {
            l(wrn(message), ...args);
        }
    }

    err(message: string, ...args: any[]) {

        //get the previous caller



        if (this.logToConsole()) {
            l(err(message), ...args);
        }
    }

    nv(name: string, value: any) {
        if (this.logToConsole()) {
            l(nv(name, value));
        }
    }

    lh1(message: string, ...args: any[]) {
        if (this.logToConsole()) {
            l(lh1(message), ...args);
        }
    }

    clearSec() {
        clearSec();
    }

    l(message: string, ...args: any[]) {
        if (this.logToConsole()) {
            l(message, ...args);
        }
        if (this.logToAspect()) {
            let aspectLogOutput = this.aspectLogOutput;
            if (aspectLogOutput) {
                aspectLogOutput.innerText += `${message}\n`;
            }
        }
    }

    addAspectLogOutput() {
        if (!this.logToAspect()) { return };

        this.aspectLogOutput = document.createElement("div");
        let aspectLogOutput = this.aspectLogOutput;

        aspectLogOutput.id = `aspectLogOutput-${this.uniqueId}`;
        aspectLogOutput.style.border = "1px solid black";
        aspectLogOutput.style.padding = "5px";
        aspectLogOutput.style.margin = "5px";
        aspectLogOutput.style.height = "200px";
        aspectLogOutput.style.overflow = "auto";
        aspectLogOutput.style.backgroundColor = "white";
        aspectLogOutput.style.color = "black";
        aspectLogOutput.style.fontSize = "10px";
        aspectLogOutput.style.fontFamily = "monospace";
        aspectLogOutput.style.whiteSpace = "pre-wrap";
        aspectLogOutput.style.wordWrap = "break-word";
        aspectLogOutput.style.display = "none";
        aspectLogOutput.style.position = "relative";
        aspectLogOutput.style.zIndex = "1000";
        aspectLogOutput.style.bottom = "0px";
        aspectLogOutput.style.left = "0px";
        aspectLogOutput.style.right = "0px";
        aspectLogOutput.style.marginLeft = "auto";
        aspectLogOutput.style.marginRight = "auto";
        aspectLogOutput.style.marginBottom = "auto";
        aspectLogOutput.style.marginTop = "auto";
        aspectLogOutput.style.backgroundColor = "rgba(255,255,255,0.8)";
        aspectLogOutput.style.borderRadius = "5px";
        aspectLogOutput.style.padding = "5px";
        aspectLogOutput.style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.75)";

        this.element.prepend(aspectLogOutput);

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
        else {
            this.log("blade.model.aspectData.formBuilder.formData found", "green");
        }

        //Ensure the path exists
        this.blade = this.blade || {};
        return this.ensureFormbuilder(this.blade.model);

        // return this.blade!.model!.aspectData!.formBuilder!.formData;

    }

    /**
     * Ensures there is a form builder in the passed in model and returns it
     * @param model 
     * @returns 
     */
    ensureFormbuilder(model: any): IFormBuilderData {

        if (!model?.aspectData?.formBuilder?.formData) {
            this.log("blade.model.aspectData.formBuilder.formData not found - will create the path", "blue");
        }
        else {
            this.log("blade.model.aspectData.formBuilder.formData found", "green");
        }

        //Ensure the path exists

        model = model || {};
        model.aspectData = model.aspectData || {};
        model.aspectData.formBuilder = model.aspectData.formBuilder || { formData: {} };


        return model.aspectData.formBuilder.formData;
    }


    formbuilderField(formbuilderField: string, setValue?: string) {
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