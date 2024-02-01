import * as ko from "knockout";
import {
    ISharedoBladeModel,
    TShareDoBlade,
    IConfigurationHost,
} from "../../../Interfaces/SharedoAspectModels";
import { IDebug } from "./IDebug";
import { v4 as uuid } from "uuid";
import { TSharedo } from "../../../Interfaces/TSharedo";
import {
    IDefaultSettingsWithSpecificComponentConfig,
    IErrorTrap,
    ISharedoPanelConfig,
    ISupportButton,
    IWidgetJson,
    I_IDE_Aspect_Modeller_Configuration,
    TUserErrors,
} from "./Interfaces";
import { ShareDoEvent, fireEvent } from "../../Common/EventsHelper";
import { clearSec, err, inf, l, lh1, nv, wrn } from "../../../Common/Log";
import { IFormBuilderData } from "../../../Interfaces/Aspect/IFormBuilder";
import { NestedObservableObject, toObservableObject } from "./KOConverter";
import {
    getNestedProperty,
    gvko,
    setNestedProperty,
    strToClass,
} from "../../Common/ObjectHelper";
import { escapeHtml } from "../../../Common/HtmlHelper";
import { JsonToHtmlConverter } from "../../../Common/JsonToHTMLConverter";
import { searchForAttributeRecursive } from "../../Common/api/searchForAttributeWithParents";
import {
    DEBUG_DEFAULT,
    DEFAULT_CONFIGURATION_SETTINGS,
} from "./DefaultSettings";
import { debounceFunction } from "../../../Common/Debound";
import { executeFindByQuery } from "../../Common/api/executeFindByQuery/FindByQuery";
import {
    IGraphQuery,
    IGraphQueryDfaults as IGraphQueryDefaults,
    IGraphQueryField,
} from "../../../Interfaces/api/graph/IGraphQuery";
import { IFindByQueryOptions } from "../../Common/api/executeFindByQuery/IFindByQueryInput";
import { executeFindByGraph } from "../../Common/api/executeFindByGraph/executeFindByGraph";
import { evaluteRule, executeEmbeddedCode } from "../../../helpers/evaluteRule";
import { detect } from "detect-browser";
import { TemplateApplicator } from "./Template/TemplateApplicator";
import { data } from "jquery";
import { DataContext } from "../../Formio/Common/SetDataContext";

console.log("v: - 3.29");

export const FOMR_BUILDER_PATH_STRING = "aspectData.formBuilder.formData";
export const ERROR_DIV_SELECTOR = "#render-errors-here";

interface IDEAspectConfiguration {
    model: ISharedoBladeModel;
    blade: TShareDoBlade;
}

type Observableify<T> = {
    [P in keyof T]: ko.Observable<T[P]>;
};

export type ObservableConfigurationOptions2<TConfig> = {
    [K in keyof IBaseIDEAspectConfiguration<TConfig>]: ko.Observable<
        IBaseIDEAspectConfiguration<TConfig>[K]
    >;
};

export type ObservableSharedoConfigurationOptions<TConfig> =
    NestedObservableObject<I_IDE_Aspect_Modeller_Configuration<TConfig>>;

export type ObservableConfigurationOptions<TConfig> = NestedObservableObject<
    IDefaultSettingsWithSpecificComponentConfig<TConfig>
>;

// export type IObservableConfigurationOptions<TConfig> =  {debug: ko.Observable<ObservableIDebug>} &
// {
//     [K in keyof TConfig]: NestedObservableObject<TConfig>[K];

// }

export type IBaseIDEAspectConfiguration<TConfig> = IConfigurationHost &
    I_IDE_Aspect_Modeller_Configuration<TConfig>;
// abstract class Creator<TConfig> {
//     public abstract FactoryMethod(element: HTMLElement, configuration: IBaseIDEAspectConfiguration<TConfig>, baseModel: any): any;
// }

export function getFormBuilderFieldPath(formBuilderField: string) {
    return `${FOMR_BUILDER_PATH_STRING}.${formBuilderField}`;
}

type ObservablePerson<TConfig> = Observableify<
    IBaseIDEAspectConfiguration<TConfig>
>;

interface IModel {
    [key: string]: any;
}

export abstract class BaseIDEAspect<TConfig, TPersitance> {
    _data: any; //non model data storage
    originalConfiguration!: I_IDE_Aspect_Modeller_Configuration<TConfig>;
    configuration:
        | IDefaultSettingsWithSpecificComponentConfig<TConfig>
        | undefined;
    sharedoConfiguration!: IBaseIDEAspectConfiguration<TConfig>;
    defaults: IDefaultSettingsWithSpecificComponentConfig<TConfig> | undefined;
    element!: HTMLElement;
    model: IModel | undefined;
    // enabled!: boolean;
    blade: TShareDoBlade | undefined;
    loaded!: ko.Observable<boolean>;
    sharedoId!: ko.Observable<string | undefined>;
    parentSharedoId!: ko.Observable<string | undefined>;
    sharedoTypeSystemName!: ko.Observable<string | undefined>;
    phaseName!: ko.Observable<string | undefined>;
    phaseIsOpen!: ko.Observable<boolean | undefined>;
    validation: any;
    validationErrorCount!: ko.Observable<number>;
    baseModel!: TSharedo<any>;
    thisComponentName!: string;
    LocationToSaveOrLoadData: string | undefined; //The location to load and save the data from
    shareDoOptions!: ObservableSharedoConfigurationOptions<TConfig>;
    _shareDoOptions!: ObservableSharedoConfigurationOptions<unknown>; //use for typings of this base ide as TConfig caused issue
    options:
        | ObservableConfigurationOptions<
            IDefaultSettingsWithSpecificComponentConfig<TConfig>
        >
        | undefined;
    _options:
        | ObservableConfigurationOptions<
            IDefaultSettingsWithSpecificComponentConfig<unknown>
        >
        | undefined;
    uniqueId!: string;
    widgetSettings!: IWidgetJson<TConfig>;
    aspectLogOutput: HTMLDivElement | undefined;
    liveConfigDiv: HTMLElement | undefined;
    liveConfigData: any;
    errorDivSelector: string;
    errors: ko.ObservableArray<TUserErrors> | undefined;
    refreshLog: Array<any>;
    lastRefresh: Date | undefined;
    disposables: Array<any>;

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
    constructor(
        element: HTMLElement,
        configuration: TConfig,
        baseModel: TSharedo<any>
    );
    public constructor(...arr: any[]) {
        this.widgetSettings = this.setWidgetJsonSettings();
        this.thisComponentName = this.setThisComponentName();
        this.defaults = this.setDefaults(); //setup the default by calling the abstract method in the child class
        this.disposables = [];
        this.refreshLog = new Array<any>();

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
            // this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
            this.fireEvent("onSetup", this.model);
            this.setup();
            this.fireEvent("afterSetup", this.model);
            this.setupLiveConfig();
            this.setupEventWatcher();
            this.setupErrorManager();
            this.addAspectLogOutput();
            return;
        }
    }

    _initialise(
        element: HTMLElement,
        polutedConfiguration: I_IDE_Aspect_Modeller_Configuration<TConfig>,
        baseModel: TSharedo<any>
    ) {
        //let configuration = polutedConfiguration.configuration; //Poluted as Sharedo added additional information to thsi object depending on where its instansiated
        this.sharedoConfiguration = polutedConfiguration;
        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = polutedConfiguration;
        this.baseModel = baseModel;

        // this.originalConfiguration

        // let baseDefaults: IDefaultConfigSettings<any> = {
        //     debug: {
        //         enabled: false,
        //         logToConsole: false,
        //         showInAspect: false,
        //         liveConfig: false
        //     }
        // }

        //check that we have a sub configuration
        if (!this.sharedoConfiguration.configuration) {
            console.error(
                "No configuration found in the sharedoConfiguration - check the aspect or widget config that ther eis a base configuration of configuration:{}"
            );
            throw new Error("No configuration found in the sharedoConfiguration");
        }

        this.sharedoConfiguration.configuration = $.extend(
            DEFAULT_CONFIGURATION_SETTINGS,
            this.sharedoConfiguration.configuration
        ); //make sure debug is set or use defaults
        // this.originalConfiguration.debug = $.extend(baseDefaults.debug, this.originalConfiguration.debug) as IDebug;
        // configuration.debug = $.extend(baseDefaults, configuration.debug) as IDebug;

        // this.data = undefined;
        // Merge the configuration with the defaults
        this.sharedoConfiguration.configuration = $.extend(
            this.defaults,
            this.originalConfiguration.configuration
        );

        //create a new model
        this.model = this.sharedoConfiguration._host?.model;
        // this.enabled = this.model?.canEdit;
        this.blade = this.sharedoConfiguration._host?.blade;
        this.loaded = this.loaded || ko.observable(false);
        // Map the base model properties
        this.sharedoId =
            this.sharedoConfiguration._host?.model.id ||
            $ui.pageContext?.sharedoId ||
            ko.observable(undefined);
        if (!this.sharedoId || this.sharedoId()) {
            this.log("No sharedoId found");
        }

        this.sharedoTypeSystemName =
            this.sharedoConfiguration._host?.model?.sharedoTypeSystemName ||
            $ui.pageContext?.sharedoTypeName ||
            ko.observable(undefined);
        if (!this.sharedoTypeSystemName || !this.sharedoTypeSystemName()) {
            this.log("No sharedoTypeSystemName found");
        }

        this.parentSharedoId =
            this.sharedoConfiguration._host?.model?.parentSharedoId ||
            ko.observable(undefined);
        this.phaseName =
            this.sharedoConfiguration._host?.model?.phaseName ||
            $ui.pageContext?.phaseName ||
            ko.observable(undefined);
        this.phaseIsOpen =
            this.sharedoConfiguration._host?.model?.phaseIsOpen ||
            $ui.pageContext?.phaseIsOpen ||
            ko.observable(undefined);
        // this.shareDoOptions = toObservableObject(this.sharedoConfiguration, this.shareDoOptions);
        // this._shareDoOptions = this.shareDoOptions as ObservableSharedoConfigurationOptions<unknown>

        // Validation
        this.validation = {};
        this.validationErrorCount = this.validationErrorCount || ko.observable(0);

        this.applyComponentConfiguration(this.sharedoConfiguration.configuration);
        //setup the location to load and save the data from by calling the abstract method in the child class
        //! --> LocationToSaveOrLoadData <-- - this should be called at the end of this function to ensure that the options and configuration data is availabel to the child class
        this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
        this.fireEvent("onInitialise", this.model);
    }

    private applyComponentConfiguration(
        configuration: IDefaultSettingsWithSpecificComponentConfig<TConfig>
    ) {
        let configurationAsObservables = toObservableObject(
            configuration,
            this.options
        );
        this.configuration = configuration;

        this.options = configurationAsObservables;
        // ! Note line below is for typing within the IDEBase, the line above is for typing within the child class
        this._options =
            configurationAsObservables as ObservableConfigurationOptions<
                IDefaultSettingsWithSpecificComponentConfig<unknown>
            >;
    }

    clearErrors() {
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
        this._options?.debug.subscribe((newValue: any) => {
            if (newValue.liveConfig) {
                this.activateLiveConfig(newValue.liveConfig);
            }
        });

        this.activateLiveConfig(this._options?.debug().liveConfig()); //TODO fix typings
    }

    activateLiveConfig(active: boolean | undefined) {
        if (!active) {
            this.liveConfigDiv?.remove();
            return;
        }

        if (this.liveConfigDiv) {
            //leave alone if already active
            return;
        }

        this.l("Setting up live config");

        const serializedData = JSON.stringify(
            this.sharedoConfiguration,
            (key, value) => {
                if (key === "_host") {
                    return undefined;
                }
                return value;
            },
            4
        );

        //clone the config
        let config = ko.observable(serializedData);

        this.liveConfigData = {
            config: config,
        };

        let timeout: boolean = false;

        this.liveConfigDiv = this.createLiveConfigDiv();

        this.element.prepend(this.liveConfigDiv);
        let applyChange = () => {
            this.applyComponentConfiguration(JSON.parse(config()).configuration);
            this.liveConfigurationRefreshed();
            this.buildErrorDiv();
        };

        setTimeout(() => {
            config.subscribe((newValue) => {
                const debouncedApplyChange = debounceFunction(applyChange, 3000);
                debouncedApplyChange();

                // console.log("The new value is " + newValue)

                // if (timeout) {
                //     return;
                // }
                // setTimeout(() => {
                //     timeout = false;
                //     let newConfig = JSON.parse(config())

                //     this.applyComponentConfiguration(newConfig.configuration);
                //     this.liveConfigurationRefreshed();
                //     // this.refresh(newConfig);
                //     // this.reset(newConfig);
                // }, 500);
                // timeout = true;
            });
        }, 3000);

        // ko.applyBindings(this.liveConfigData, this.liveConfigDiv);x

        // }
    }

    ensureStylesLoaded(href: string): void {
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement("link");
            link.href = href;
            link.rel = "stylesheet";
            link.type = "text/css";
            document.head.appendChild(link);
        }
    }

    createLiveConfigDiv(): HTMLElement {
        // Create the outer <div> with class "col-sm-12 formbuilder-editor-json"
        const outerDiv = document.createElement("div");
        outerDiv.className = "col-sm-12 formbuilder-editor-json";

        // Create the inner <div> with the specified attributes
        const innerDiv = document.createElement("div");
        innerDiv.id = "liveConfig";
        innerDiv.className = "form-control textarea";
        innerDiv.style.height = "300px";
        // innerDiv.setAttribute('data-bind', 'syntaxEditor: liveConfigData.config, enable: true, event: { focusout: liveConfigData.onFocusOut }');
        innerDiv.setAttribute("data-bind", "syntaxEditor: liveConfigData.config");
        // innerDiv.setAttribute('data-bind', 'syntaxEditor: model.config');
        // Append the innerDiv to the outerDiv
        outerDiv.appendChild(innerDiv);

        return outerDiv;
    }

    setupEventWatcher() {
        this._options?.eventsToReactTo()?.forEach((eventToWatch) => {
            console.log("Subscribing to event", eventToWatch);
            this.disposables.push(
                $ui.events.subscribe(
                    eventToWatch.eventPath(),
                    (e: any) => {
                        this.refreshComponent(
                            eventToWatch.eventPath(),
                            eventToWatch.methodToCall()
                        );
                    },
                    this
                )
            );
        });

        let refreshOn = ko.toJS(this._options?.refreshOn());
        if (refreshOn) {
            if (refreshOn.sharedoIdChanged) {
                this.disposables.push(
                    this.sharedoId.subscribe((newValue) => {
                        this.refreshComponent("sharedoIdChanged", "refresh");
                    })
                );
            }

            if (refreshOn.sharedoParentIdChanged) {
                this.disposables.push(
                    this.parentSharedoId.subscribe((newValue) => {
                        this.refreshComponent("sharedoParentIdChanged", "refresh");
                    })
                );
            }

            if (refreshOn.sharedoPhaseChanged) {
                this.disposables.push(
                    this.phaseName.subscribe((newValue) => {
                        this.refreshComponent("sharedoPhaseChanged", "refresh");
                    })
                );
            }
        }
    }

    refreshComponent(
        eventPath: string | undefined,
        methodToCall: string | undefined
    ) {
        this.refreshLog = this.refreshLog || [];
        if (this.lastRefresh) {
            //TODO: change this so we collect all refreshes and do them in one go
            let secondsSinceLastRefresh =
                (new Date().getTime() - this.lastRefresh.getTime()) / 100;
            console.log("Seconds since last refresh", secondsSinceLastRefresh);
            if (secondsSinceLastRefresh < 10) {
                console.log("Skipping refresh, too soon");
                return;
            }
        }

        this.lastRefresh = new Date();
        console.log("Refreshing component");
        let logItem = {
            eventPath: eventPath,
            methodToCall: methodToCall,
            time: new Date(),
            success: false,
        };
        try {
            if (methodToCall) {
                // let params = widgets.parameters;
                console.log("Executing method", methodToCall);
                let componentToRefresh = this as any;
                if (!componentToRefresh[methodToCall]) {
                    console.log(
                        `Method not found on component ${this.thisComponentName}`,
                        methodToCall
                    );
                }
                {
                    componentToRefresh[methodToCall](); //todo: parameters
                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            logItem.success = true;
            this.refreshLog.push(logItem);
        }
    }

    buildErrorDiv() {
        this.inf("Building error div");
        let errorDiv = this.element.querySelector(this.errorDivSelector);
        if (!errorDiv) {
            return;
        }

        l("errorDiv.innerHTML");
        errorDiv.innerHTML = ""; //clean out the div

        if (!this.errors) {
            this.errors = ko.observableArray<TUserErrors>();
        }
        if (this.errors().length === 0) {
            return;
        }

        let errorContainerDiv = document.createElement("div");
        errorDiv.appendChild(errorContainerDiv);

        errorContainerDiv.className = "ide-aspect-error-container";
        let titleDiv = document.createElement("div");
        titleDiv.className = "ide-aspect-error-title";
        titleDiv.innerText = "There has been an error:";
        errorContainerDiv.appendChild(titleDiv);
        let foreachDiv = document.createElement("div");
        errorContainerDiv.appendChild(foreachDiv);

        // this.errors().forEach((error) => {
        for (let i = 0; i < this.errors().length; i++) {
            let error = this.errors()[i];
            //Look for any trapping and add to the error object
            this.addErrorTrapping(error);
            //Render the error div and add to the foreach div
            foreachDiv.appendChild(this.buildIndividualError(error));
        }
    }

    buildIndividualError(error: TUserErrors) {
        let templateApplicator = new TemplateApplicator();
        let dataContext = this.getDataContext([{ obj: error, key: "error" }]);
        let linkedTrappedError = error.linkedTrappedError;

        let individualErrorDiv: HTMLDivElement = document.createElement("div");

        individualErrorDiv.className = "ide-aspect-error-individual-error";
        if (linkedTrappedError) {
            templateApplicator.addCSS(
                linkedTrappedError.classRules,
                individualErrorDiv,
                "dataContext",
                dataContext
            );
            templateApplicator.addStyle(
                linkedTrappedError.styleRules,
                individualErrorDiv,
                "dataContext",
                dataContext
            );
        }

        let userMessageDiv = document.createElement("div");
        userMessageDiv.className = "ide-aspect-error-user-message";

        let suggestionsDiv: HTMLDivElement | undefined;
        let supportButtonDiv: HTMLDivElement | undefined;
        let actionsDiv: HTMLDivElement | undefined;
        // actionsDiv.className = "ide-aspect-error-actions";

        let internalSuggestionsDiv: HTMLDivElement | undefined;
        // internalSuggestionsDiv.className = "ide-aspect-error-internal-suggestions";

        userMessageDiv.innerHTML =
            linkedTrappedError?.userFreindlyMessage ||
            error.userMessage ||
            error.message ||
            "Unknown error";

        if (linkedTrappedError?.userFreindlyHTMLMessageTemplate) {
            let userFreindlyMessage = executeEmbeddedCode(
                linkedTrappedError.userFreindlyHTMLMessageTemplate,
                dataContext
            );
            userMessageDiv.innerHTML = userFreindlyMessage;
            //Find section divs in the template if they exist
            suggestionsDiv =
                (userMessageDiv.querySelector(".ide-aspect-error-suggestions") as
                    | HTMLDivElement
                    | undefined) || suggestionsDiv;
            actionsDiv =
                (userMessageDiv.querySelector(".ide-aspect-error-actions") as
                    | HTMLDivElement
                    | undefined) || actionsDiv;
            internalSuggestionsDiv =
                (userMessageDiv.querySelector(
                    ".ide-aspect-error-internal-suggestions"
                ) as HTMLDivElement | undefined) || internalSuggestionsDiv;
        }

        individualErrorDiv.appendChild(userMessageDiv);

        // userMessageDiv.onclick = () => {

        //     //create a div that can scoll
        //     let detailedMessageDiv = document.createElement("div");
        //     detailedMessageDiv.className = "ide-aspect-error-detailed-message";

        //     const code = escapeHtml(error.code || "");
        //     const message = escapeHtml(error.message || "");
        //     const userMessage = escapeHtml(error.userMessage || "");
        //     const errorStack = escapeHtml(error.errorStack || "");

        //     const additionalInfo = JsonToHtmlConverter.convert(error.additionalInfo || {});

        //     const html = `
        //                     <div>
        //                     <h2>Error: ${code}</h2>
        //                     <p><strong>Message:</strong> ${message}</p>
        //                     <p><strong>User Message:</strong> ${userMessage}</p>
        //                     <p><strong>Stack:</strong> ${errorStack}</p>
        //                     <p><strong>Additional Info:</strong> ${additionalInfo}</p>
        //                     </div>`;

        //     detailedMessageDiv.innerHTML = html;
        //     $ui.errorDialog(detailedMessageDiv);

        // }

        //create the sections divs if they done exists and add to the individual error div
        {
            if (!suggestionsDiv) {
                suggestionsDiv = document.createElement("div");
                individualErrorDiv.appendChild(suggestionsDiv);
            }

            if (!actionsDiv) {
                actionsDiv = document.createElement("div");
                individualErrorDiv.appendChild(actionsDiv);
            }

            if (!internalSuggestionsDiv) {
                internalSuggestionsDiv = document.createElement("div");
                individualErrorDiv.appendChild(internalSuggestionsDiv);
            }

            if (!supportButtonDiv) {
                supportButtonDiv = document.createElement("div");
                individualErrorDiv.appendChild(supportButtonDiv);
            }
        }

        let resolutionSuggestions =
            linkedTrappedError?.resolutionSuggestions ||
            error.internalSuggestions ||
            [];
        if (resolutionSuggestions.length > 0) {
            suggestionsDiv.className = "ide-aspect-error-suggestions";
            suggestionsDiv.innerHTML = `<b>Suggestions:</b><br/>${resolutionSuggestions.join(
                "<br/>"
            )}`;
        }

        let actions = error.sharedoErrorActions || [];
        if (actions.length > 0) {
            actionsDiv.innerHTML = `<b>Actions:</b><br/>${actions.join("<br/>")}`;
        }

        let internalSuggestions = error.internalSuggestions || [];
        if (internalSuggestions.length > 0) {
            internalSuggestionsDiv.innerHTML = `<b>Internal Suggestions:</b><br/>${internalSuggestions.join(
                "<br/>"
            )}`;
        }

        let supportButton =
            linkedTrappedError?.supportButton ||
            this.configuration?.errorManagement?.unTrappedErrorsSupportButton;
        if (supportButton && supportButton.enabled) {
            let actionDiv = document.createElement("div");
            actionDiv.className = "ide-aspect-error-support-action";
            individualErrorDiv.appendChild(actionDiv);
            let button = document.createElement("button");
            button.className = "btn btn-primary";

            button.onclick = () => {
                this.createOpenPanel(supportButton, dataContext);
            };

            templateApplicator.addCSS(
                supportButton.classRules,
                actionDiv,
                "dataContext",
                dataContext
            );
            templateApplicator.addStyle(
                supportButton.styleRules,
                actionDiv,
                "dataContext",
                dataContext
            );

            button.innerText = supportButton.title;
            actionDiv.appendChild(button);
        }

        return individualErrorDiv;
    }

    createOpenPanel(
        supportButton: ISupportButton | undefined,
        dataContext: any
    ) {
 
        if (!supportButton) {
            return;
        } 


        let buttonConfig = supportButton.raiseSupportTicketSharedoCommand;
        let supportTicketMessage = buttonConfig.description ||  supportButton.supportTicketMessage || "";

        let config: ISharedoPanelConfig =
        {
            title: executeEmbeddedCode(buttonConfig.title, dataContext),
            typeSystemName: executeEmbeddedCode(buttonConfig.typeSystemName, dataContext),
            description:executeEmbeddedCode(supportTicketMessage, dataContext)
        }
        $ui.nav.invoke({
            invokeType: "panel",
            invoke: "Sharedo.Core.Case.Sharedo.AddEditSharedo",
            config: config,
        });
    }

    addErrorTrapping(error: TUserErrors) {
        //run rules in error traps to see if this error has been trapped bhy a rule
        let errorTrapped = false;
        // let errorTraps = gvko<IErrorTrap[]>(this._options?.errorManagement()?.errorTraps) || [];
        let errorTraps = this.configuration?.errorManagement?.errorTraps || [];

        // errorTraps.forEach((trap) => {
        for (
            let errorTrapsIndex = 0;
            errorTrapsIndex < errorTraps.length;
            errorTrapsIndex++
        ) {
            let trap = errorTraps[errorTrapsIndex];
            if (trap.enabled === false) {
                continue;
            }
            try {
                let dataContext = this.getDataContext([{ obj: error, key: "error" }]);
                l(
                    `Evaluating rule [${trap.rule}] on error ${error} with dataContext:`,
                    dataContext
                );
                let ruleResult = evaluteRule(trap.rule, dataContext);
                if (ruleResult) {
                    errorTrapped = true;
                    error.linkedTrappedError = trap;
                    break;
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
    getDataContext(additional?: [{ obj: any; key: string }] | undefined): any {
        const browser = detect();
        let dataContext: any = {
            thisComponentName: this.thisComponentName,
            user: ko.toJS($ui.pageContext?.user),
            pageContext: ko.toJS($ui.pageContext),
            aspectData: ko.toJS(this.baseModel),
            configuration: ko.toJS(this._options),
            browser: browser,
        };

        let additionalData = additional || [];
        for (let i = 0; i < additionalData.length; i++) {
            let item = additionalData[i];
            dataContext[item.key] = item.obj;
        }

        return dataContext;
    }

    // createSupportTask() {
    //     //TODO: Create a support task
    //     $ui.nav.invoke({
    //         "invokeType": "panel",
    //         "invoke": "Sharedo.Core.Case.Sharedo.AddEditSharedo",
    //         "config": "{\"typeSystemName\":\"task-eddiscovery-adhoc\",\"title\":\"\",\"Support Request\":\"\"}"
    //     });

    // }

    /**
     * Abstract method to be implemented by the child class to refresh the aspect
     * @param newConfig
     */
    abstract refresh(newConfig: any): void;

    /**
     * Abstract method to be implemented by the child class to reset the aspect based
     * @param newConfig
     */
    abstract reset(newConfig: any): void;

    abstract liveConfigurationRefreshed(): void;

    /**
     * ! important: Mandatory method to be implemented by the child class to set the defaults
     * * This method is called by the constructor to set the defaults
     * @returns Defaults<TConfig>
     * @memberof BaseIDEAspect
     * @abstract
     *
     */
    abstract setDefaults(): IDefaultSettingsWithSpecificComponentConfig<TConfig>;

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
    onSave(model: any) {
        this.fireEvent("onSave", model);

        let dataToSave = this._data;
        this.log(
            "Saving, model passed in we need to persist to",
            "green",
            dataToSave
        );

        if (this.LocationToSaveOrLoadData === undefined) {
            this.log(
                "No location to save data to set - this method should be overriden",
                "red"
            );
            return;
        }

        let dataToPersist = this._data;
        let currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
        if (currentData) {
            this.log(
                `Current data at location ${this.LocationToSaveOrLoadData} :`,
                "magenta",
                currentData
            );
        }
        if (!currentData) {
            // this.log("Data does not exist, we will create", "orange");
            //  setNestedProperty(model, this.LocationToSaveOrLoadData, {});
            // currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
        }
        this.log(
            `New data to persist to location ${this.LocationToSaveOrLoadData} :`,
            "blue",
            dataToPersist
        );
        setNestedProperty(model, this.LocationToSaveOrLoadData, dataToPersist);

        this.l("Data saved", model);
    }

    /**
     * Gets the data to load, defaults to LocationToSaveOrLoadData unless a fieldPath is passed in
     * @param fieldPath
     * @returns
     */
    async getData(fieldPath?: string) {
        if (this._data) {
            return this._data;
        }

        fieldPath = fieldPath || this.LocationToSaveOrLoadData;

        //This section is d=use due to typing issue that needs to be resolved.
        // let useParents = gvko(this._options.dataSettings().getValueUsingParents) as boolean | undefined
        // let shareDoId= gvko(this.sharedoId)
        // let maxDepth = gvko(this._options.dataSettings().maxDepth) as number | undefined
        // let LocationToSaveOrLoadData = gvko(this.LocationToSaveOrLoadData) as string | undefined
        //end area of typing issue

        let useParents = this._options?.dataSettings().getValueUsingParents();
        let shareDoId = this.sharedoId();
        let maxDepth = this._options?.dataSettings().maxDepth();

        // let LocationToSaveOrLoadData = gvko(this.LocationToSaveOrLoadData);

        if (fieldPath === undefined) {
            this.log(
                "No location to load data from set - this method should be overriden",
                "red"
            );
            return this._data;
        }

        this._data = getNestedProperty(this.model, fieldPath);

        if (this._data !== undefined) {
            this.l("Data found at location", this._data);
            this._data = ko.toJS(this._data);
            return this._data;
        }

        //if data ot found in the current model, look via the search
        if (this._data === undefined && useParents === false && shareDoId) {
            //! TODO Fix Typings
            return searchForAttributeRecursive(shareDoId, fieldPath, false).then(
                (data) => {
                    if (data.found) {
                        this._data = data.value;
                    }
                    return this._data;
                }
            );
        }

        if (this._data === undefined && useParents === true) {
            //! TODO Fix Typings
            let idToUser = this.sharedoId() || this.parentSharedoId();

            if (!idToUser) {
                this.log(
                    "No id to use for search both sharedoId and parentSharedoId are undefined"
                );
                return this._data;
            }
            return searchForAttributeRecursive(
                idToUser,
                fieldPath,
                useParents,
                maxDepth
            ).then((data) => {
                if (data.found) {
                    this._data = data.value;
                }
                return this._data;
            });
        }
    }

    searchForAttributeRecursive(
        id: string,
        attribute: string,
        useParents: boolean,
        maxDepth: number | undefined
    ): Promise<any> {
        return searchForAttributeRecursive(id, attribute, useParents, maxDepth);
    }

    async searchByGraph(fieldPath: string, useParent: boolean = false) {
        let inputOption: IGraphQuery = JSON.parse(JSON.stringify(IGraphQueryDefaults));
        let shareDoId = this.sharedoId();
        let parentId = this.parentSharedoId();

        let query: IGraphQueryField = {
            path: fieldPath,
        };

        inputOption.fields.push(query);

        if (useParent === false && shareDoId) {
            //! TODO Fix Typings
            inputOption.entityId = shareDoId;
        } else if (useParent === true && parentId) {
            //! TODO Fix Typings
            inputOption.entityId = parentId;
        }

        if (!inputOption.entityId) {
            this.log(
                "No id to use for search both sharedoId and parentSharedoId are undefined"
            );
            return;
        }

        let result = await executeFindByGraph(inputOption);

        if (result.info.success === false) {
            this.log("Error executing search", "red", result.info);
            return;
        }

        return result.data?.data[fieldPath];
    }

    setData(value: TPersitance | undefined) {
        let valueToPersist = ko.toJS(value);
        let previousValue = ko.toJS(this._data);
        this._data = valueToPersist;
        this.fireValueChangedEvent("onDataBeforeChanged", {
            previousValue: previousValue,
            newValue: valueToPersist,
        });

        if (this.LocationToSaveOrLoadData === undefined) {
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
        setNestedProperty(this.model, this.LocationToSaveOrLoadData, this._data);
        this.fireEvent("onDataChanged", this.model);
    }

    onDestroy(model?: any) {
        this.log("IDEAspects.Example : onDestroy");
        this.fireEvent("onDestroy", model);
        $ui.util.dispose(this.disposables);
    }

    /**
     * Called by the UI framework after initial creation and binding to load data
     * into it's model
     */
    loadAndBind() {
        this.log("IDEAspects.Example : loadAndBind");
        this.log("Loading data (model:any) passed in", "green");
        this.log(
            "Loading data based on location to save",
            "green",
            this.LocationToSaveOrLoadData
        );
        this.fireEvent("onLoad", this.model);
    }

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

    debugSettings() {
        let debugSetting: IDebug = DEBUG_DEFAULT();

        if (this._options?.debug()) {
            debugSetting = ko.toJS(this._options?.debug());
        }

        return debugSetting;
    }

    /**
     * Provides logging for the component based on the debug configuration
     * @param message
     * @param color
     * @param data
     */
    log(message: string, color?: string, data?: any): void {
        if (this.debugSettings().enabled) {
            if (this.debugSettings().logToConsole) {
                if (!color) color = "black";
                // let lineNo = extractLineNumberFromStack((new Error()).stack);
                console.log(
                    `%c ${this.thisComponentName} - ${message}`,
                    `color:${color}`,
                    data
                );
            }
        }
    }

    canLog(): boolean {
        return this.debugSettings().enabled;
    }
    logToConsole(): boolean {
        return this.canLog() && this.debugSettings().logToConsole;
    }
    logToAspect(): boolean {
        return this.canLog() && this.debugSettings().showInAspect;
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
        if (!this.logToAspect()) {
            return;
        }

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
            data: data,
        };
        fireEvent(event);
    }

    fireValueChangedEvent(
        eventName: string,
        changedData: { previousValue: any; newValue: any }
    ) {
        let event: ShareDoEvent = {
            eventPath: this.thisComponentName + "." + eventName,
            eventName: eventName,
            source: this,
            data: changedData,
        };
        fireEvent(event);
    }

    /**
     *
     * @returns Formbuild if it exists or creates it if it does not
     *
     */
    formbuilder() {
        if (!this.blade?.model?.aspectData?.formBuilder?.formData) {
            this.log(
                "blade.model.aspectData.formBuilder.formData not found - will create the path",
                "blue"
            );
        } else {
            this.log("blade.model.aspectData.formBuilder.formData found", "green");
        }

        //Ensure the path exists
        if (!this.blade) {
            //TODO: if no blade where is form builder data
            return undefined;
        }
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
            this.log(
                "blade.model.aspectData.formBuilder.formData not found - will create the path",
                "blue"
            );
        } else {
            this.log("blade.model.aspectData.formBuilder.formData found", "green");
        }

        //Ensure the path exists

        model = model || {};
        model.aspectData = model.aspectData || {};
        model.aspectData.formBuilder = model.aspectData.formBuilder || {
            formData: {},
        };

        return model.aspectData.formBuilder.formData;
    }

    formbuilderField(formbuilderField: string, setValue?: string) {
        if (!this.formbuilder()) {
            this.log("Form builder does not exist! ", "red");
            throw new Error("Form builder does not exist!");
        }

        let formBuilder = this.formbuilder()!;
        if (!formBuilder) {
            return;
        }

        let foundValue = formBuilder[formbuilderField];
        if (!foundValue) {
            this.log(
                `Form builder does not contain field ${formbuilderField} `,
                "orange"
            );
            this.log(`Creating field ${formbuilderField} `, "blue");
            formBuilder[formbuilderField] = undefined;
        }

        //Are we doing a set
        if (setValue) {
            this.log(`Setting ${formbuilderField} to ${setValue}`, "green");
            formBuilder[formbuilderField] = setValue;
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
