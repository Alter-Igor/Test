import * as ko from "knockout";
import { IAspect } from "../../../Typings/Aspect/IAspect";
import { TShareDoBlade } from "../../../Typings/SharedoAspectModels/TShareDoBlade";
import { IDebug } from "./IDebug";
import { toObservableObject } from "./KOConverter";
import { setNestedProperty, getNestedProperty } from "./ObjectHelpers";

import { IConfigurationHost, ISharedoBladeModel, IAspectBaseModel } from "../../../Typings/SharedoAspectModels";
import { Sharedo } from "../../../Typings/ShareDo/Sharedo";




interface IDEAspectConfiguration {
    model: ISharedoBladeModel;
    blade: TShareDoBlade;
}

type Observableify<T> = {
    [P in keyof T]: ko.Observable<T[P]>;
};

export type ObservableConfigurationOptions<TConfig> = { [K in keyof IBaseIDEAspectConfiguration<TConfig>]: ko.Observable<IBaseIDEAspectConfiguration<TConfig>[K]>; }

export type IBaseIDEAspectConfiguration<TConfig> = IConfigurationHost & TConfig &
{
    debug: IDebug;
}
// abstract class Creator<TConfig> {
//     public abstract FactoryMethod(element: HTMLElement, configuration: IBaseIDEAspectConfiguration<TConfig>, baseModel: any): any;
// }

type ObservablePerson<TConfig> = Observableify<IBaseIDEAspectConfiguration<TConfig>>;

export class BaseIDEAspect<TConfig, TPersitance>  {
    originalConfiguration: TConfig;
    configuration: IBaseIDEAspectConfiguration<TConfig>;
    defaults: TConfig | undefined;
    element: HTMLElement;
    model: any;
    enabled: boolean;
    blade: Sharedo.Core.Case.Sharedo.AddEditSharedo;
    loaded: ko.Observable<boolean>;
    sharedoId: any;
    sharedoTypeSystemName: ko.Observable<string>;
    validation: any;
    validationErrorCount: ko.Observable<number>;
    baseModel: IAspectBaseModel;
    thisComponentName: string | undefined;
    data: TPersitance | undefined;
    LocationToSaveOrLoadData: string; //The location to load and save the data from
    options: ObservableConfigurationOptions<TConfig>

    /**
     * Base Constructor for all IDEAspects, forces the implementation of the load and save methods
     * @param componentName //The name of the component e.g. Aspect.QuickView
     * @param loadSaveLocation //The location to load and save the data from e.g. model.aspect.FormBuilder.formData
     * @param element //The element that the aspect is bound to
     * @param configuration //The configuration passed in from the blade and the design time configuration
     * @param baseModel //The base model passed in from the blade
     * @param defaults //The defaults passed in from the widget to set incase of bad configuration or missing configuration
     */
    constructor(componentName: string, loadSaveLocation: string, element: HTMLElement,
        configuration: TConfig, baseModel: Sharedo.Core.Case.Sharedo.Models.Sharedo, defaults: TConfig) {

        this.LocationToSaveOrLoadData = loadSaveLocation;
        this.thisComponentName = componentName;
        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = configuration as IBaseIDEAspectConfiguration<TConfig>;
        this.baseModel = baseModel;
        this.defaults = defaults;
        this.data = undefined;
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

    }

    /**
     * Called by the aspect IDE adapter when the model is saved. Manipulate the
     * model as required.
     */
    public onSave(model: any): void {
        this.log("Saving, model passed in we need to persist to", "green", this.data);
        let dataToPersist = ko.toJS(this.data);
        let currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
        if (!currentData) {
            this.log("Data does not exist, we will create", "orange");
            setNestedProperty(model, this.LocationToSaveOrLoadData, {});
            currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
        }
        this.log(`Current data at location ${this.LocationToSaveOrLoadData}`, "green", currentData);
        this.log(`Data to persist to location ${this.LocationToSaveOrLoadData} :`, "blue", dataToPersist);
        setNestedProperty(model, this.LocationToSaveOrLoadData, dataToPersist);
    };


    onDestroy() {
        this.log("IDEAspects.Example : onDestroy");
    };

    /**
     * Called by the UI framework after initial creation and binding to load data
     * into it's model
     */
    loadAndBind() {
        this.log("IDEAspects.Example : loadAndBind");
        this.log("Loading data (model:any) passed in", "green");
        this.log("Loading data based on location to save", "green", this.LocationToSaveOrLoadData);
    };

    /**
     * Called by the aspect IDE adapter before the model is saved
     */
    onBeforeSave(model: Sharedo.Core.Case.Sharedo.Models.Sharedo) {
        this.log("IDEAspects.Example : onBeforeSave");
    }


    /**
     * Called by the aspect IDE adapter after the model has been saved.
     */
    onAfterSave(model: Sharedo.Core.Case.Sharedo.Models.Sharedo) {
        this.log("IDEAspects.Example : onAfterSave");
    }

    /**
     * Called by the aspect IDE adapter when it reloads aspect data
     */
    onReload(model: Sharedo.Core.Case.Sharedo.Models.Sharedo) {
        this.log("IDEAspects.Example : onReload");
        
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
                console.log(`%c ${this.thisComponentName} - ${message}`, `color:${color}`, data);
            }
        }
    }

}
