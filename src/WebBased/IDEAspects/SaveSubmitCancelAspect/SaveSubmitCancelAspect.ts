
import { IPhasePlan, Phase, Transition } from "../../../Typings/api/PhasePlan/PhasePlan";
import { getPhasePlan } from "./SaveSubmitCancelAspectAgent";
import * as ko from "knockout";
import { convertTransitionToButton } from "./TransitionToButtonConverter";
import { ButtonType, IButton, IButtonGroup, buildButtonGroupElement } from "./ButtonBuilder";
import { ASMaterialButton, ASMaterialDesignButtonStyles } from "alterspective-material-design-web-components";
import { ColorTranslator } from 'colortranslator';

let thisWidgetSystemName = "SaveSubmitCancelAspect";


//add style to head: https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css
document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`);



export interface ISaveSubmitCancel_ConfigurationFromModeller {
    backgroundColor: string;
    debug: Debug | null | undefined;
}


interface IPhaseChangeConfiguration {
    id: string;
    toPhase: string;
    suppressPhaseChangeEvent: boolean;
}

export interface Host {
    model: HostModel | null;
    blade: any | null;
    enabled: boolean | null;
    toolbarContext?: any | null;
    burgerContext?: any | null;
    _host: Host;
}

type ConfigurationWithHost = ISaveSubmitCancel_ConfigurationFromModeller & Host;

export interface HostModel {
    title: string;
    instanceId: string;
    parentSharedoId: string;
    id: ko.Observable<string | undefined>;
}

export interface Debug {
    enabled?: boolean | null;
    logToConsole?: boolean | null;
    showEvents?: boolean | null;
    showInAspect?: boolean | null;
}

type Model = {
    title: string | null | undefined;
    saveRuns: number;
};

export class SaveSubmitCancel {

    private firedEvents: any[];
    private monitoredHandlers: any[];
    private readyForSave: boolean;
    private options?: ConfigurationWithHost;
    private disposables?: any[];
    private enabled?: boolean;
    private instanceId?: string;
    private element?: HTMLElement;
    private blade: any;
    private parentSharedoId?: string;
    private toolbarContext: any;
    private burgerContext: any;
    private sharedoId: ko.Observable<string | undefined> | undefined;
    private sharedoTypeSystemName: string | null | undefined;
    private reloading?: boolean;
    private model: Model;
    private isValidTemp: any;
    private phasePlan: ko.Observable<IPhasePlan | undefined>;
    hostModel: HostModel | null;
    currentPhaseSystemName: ko.Observable<string | undefined> | undefined;
    buttonGroupElement: HTMLElement | undefined;
    buttonGroups: IButtonGroup[] | undefined;
    saveSubmitCancelElement: any;
    configuration: ISaveSubmitCancel_ConfigurationFromModeller;
    host: Host;


    constructor(element: HTMLElement, configurationWithHost: ConfigurationWithHost, baseModel: any) {
        this.monitorHandlers();
        this.firedEvents = [];
        this.monitoredHandlers = [];
        this.readyForSave = false;
        let defaults: ISaveSubmitCancel_ConfigurationFromModeller =
        {
            // Aspect widget config parameters
            debug: {
                enabled: false,
                logToConsole: false,
                showEvents: false,
                showInAspect: false
            },
            backgroundColor: "white"
        }

        configurationWithHost = $.extend(true, {}, defaults, configurationWithHost);
        this.configuration = configurationWithHost; //just so we have a some config to use without host
        this.blade = configurationWithHost._host.blade;
        this.hostModel = configurationWithHost._host.model;
        this.host = configurationWithHost._host;

        this.model =
        {
            // This is referencing a standard observable item from the main model
            title: configurationWithHost._host?.model?.title,
            // This is the configured message against the aspect instance
            saveRuns: 0,
        };

        this.phasePlan = ko.observable<IPhasePlan | undefined>(undefined);
        this.phasePlan.subscribe(this.handlePhasePlanChange.bind(this));
        this.log("Init", 'background: #222; color: #bada55');

        // if (this.model.eventToFireSaveOn) {
        //     this.disposables = [
        //         $ui.events.subscribe(this.model.eventToFireSaveOn, this.save, this)
        //     ];
        // }

        // Every widget gets this
        this.enabled = configurationWithHost._host.blade.enabled;
        this.instanceId = this.hostModel?.instanceId;
        this.element = element;
        this.blade = configurationWithHost._host.blade
        this.parentSharedoId = this.hostModel?.parentSharedoId;
        this.toolbarContext = configurationWithHost._host.toolbarContext;
        this.burgerContext = configurationWithHost._host.burgerContext;

        this.sharedoId = this.hostModel?.id;
        this.reloading = false;
        this.sharedoTypeSystemName = this.blade.model.sharedoTypeSystemName()
        this.currentPhaseSystemName = this.blade.model.phaseSystemName

        if (this.currentPhaseSystemName !== undefined) {
            this.currentPhaseSystemName.subscribe(() => {
                this.log("Current Phase Changed", "red", this.currentPhaseSystemName!());
                this.loadAndBind();
            });
        };
        //add backgroundColor to element css var


        if (this.configuration.backgroundColor.length === 0) {
            this.configuration.backgroundColor = "white";
        }
        const c = new ColorTranslator(this.configuration.backgroundColor);
        console.log("ColorTranslator:", c);
        this.element.style.setProperty('--nav-bar-background', this.configuration.backgroundColor);
        this.element.style.setProperty('--nav-bar-background-red', c.R.toString());
        this.element.style.setProperty('--nav-bar-background-green', c.G.toString());
        this.element.style.setProperty('--nav-bar-background-blue', c.B.toString());

        console.log("background color set to " + this.configuration.backgroundColor);
        this.addDebugIfRequired();
    }

    handlePhasePlanChange(phasePlan: IPhasePlan | undefined) {
        this.log("Phase Plan Changed", "red", phasePlan);
        this.buttonGroups = [];
        if (!phasePlan) {
            return;
        }
        // get all the transitions for the current phase
        let transitions: Transition[];
        let currentPhase: Phase | undefined;

        if (this.currentPhaseSystemName !== undefined && this.currentPhaseSystemName() !== undefined) {
            transitions = phasePlan.transitions.filter(t => t.fromPhaseSystemName == this.currentPhaseSystemName!());
            currentPhase = phasePlan.phases.find(p => p.systemName == this.currentPhaseSystemName!());
        }
        else {
            let startPhase = phasePlan.phases.find(p => p.isStart == true);
            if (!startPhase) {
                this.log("No Start Phase", "red");
                return;
            }
            transitions = phasePlan.transitions.filter(t => t.fromPhaseSystemName == startPhase?.systemName);
        }

        let options = {
            onClick: (element: ASMaterialButton) => {

                //element.target.options.additional_params.transition.toPhaseSystemName

                if(!element.options)
                {
                    return;
                }
                let data = element.options.additional_params;
                this.log("Transition Clicked", "red", data);

               

                if (data.action === "transition") {
                    let transition = data.transition as Transition;

                    // if(this.sharedoId === undefined || this.sharedoId() === undefined)
                    // {
                     
                        
                        if(this.sharedoId === undefined || this.sharedoId() === undefined)
                        {
                            let next = () => {
                                this.log("Save Ran for New ShareDo", "red");
                                let trans = () =>
                                {
                                    this.log("Fresh ShareDo now Transition Phase", "red", transition);
                                    this.transitionPhase(transition);
                                }
                                this.blade.loadSharedo(trans);
                                return;
                            }
                        }
                        
                        let next = () => {
                            this.log("Save Ran for Existing ShareDo", "red");
                            this.transitionPhase(transition);
                        }
                         
                        this.blade.save(false,next)
                        // return;
                    // }

                    
                }

            },
            enabled: this.blade.isValid,
        };

        //Remove existing buttons
        if (this.buttonGroupElement) {
            this.buttonGroupElement.remove();
        }

        this.log("Transitions to convert", "green", transitions.length);

        let systemGroup: IButtonGroup | undefined = undefined;
        if (!currentPhase || currentPhase.isOpen) {
            //Create Save and Cancel Buttons
            systemGroup = {
                order: 0,
                enabled: ko.observable(true),
                showTitle: ko.observable(true),
                name: ko.observable("System"),
                buttons: this.createSystemButtons(options)
            };
            this.buttonGroups.push(systemGroup);
        }

        //Create Phase Plan Buttons
        let buttonTransitionGroup: IButtonGroup = {
            order: 1,
            enabled: this.blade.isValid,
            showTitle: ko.observable(true),
            name: ko.observable("Phase Plan"),
            buttons: convertTransitionToButton(transitions, phasePlan.phases, options)
        };
        this.buttonGroups.push(buttonTransitionGroup);
        //Create Button Groups and add System and Phase Plan Buttons 


        //Generate Buttons Group Elements
        this.buttonGroupElement = buildButtonGroupElement(this.buttonGroups, this.blade, this.configuration);
        //Add Buttons to the Aspect

        //find save-submit-cancel class in this.element
        this.saveSubmitCancelElement = this.element!.querySelector(".save-submit-cancel");

        if (!this.saveSubmitCancelElement) {
            this.log("Save Submit Cancel Element Not Found", "red");
            return;
        }
        this.saveSubmitCancelElement.appendChild(this.buttonGroupElement);


    }



    private transitionPhase(transition: Transition) {
        let config: IPhaseChangeConfiguration = {
            id: this.sharedoId ? this.sharedoId() || "" : "",
            toPhase: transition.toPhaseSystemName,
            suppressPhaseChangeEvent: false
        };
        Sharedo.Core.Case.SharedoActions.changePhase(config, (result: any) => {
            this.log("Phase Change Result", "red", result);
            if (result.closeUI) {
                $ui.stacks.cancelAll();
            }
            else {
                this.loadAndBind();
            }
        });
    }

    private createSystemButtons(options: any) {
        console.log(ASMaterialDesignButtonStyles.outlined)
        let x = ASMaterialDesignButtonStyles.outlined;

        let retValue: IButton[] = [];
        let saveButton: IButton = {
            order: 1,
            text: ko.observable("Save"),
            onClick: () => {
                this.saveClicked();
            },
            id: "",
            icon: ko.observable("fa-save"),
            enabled: ko.observable(true),
            visible: ko.observable(true),
            tooltip: "Save the current record",
            actionType: ButtonType.save,
            materialDesignButtonType: ko.observable(ASMaterialDesignButtonStyles.outlined),
            color: undefined,
            isOptimumPath: false,
            isSystemClosedPhase: false,
            isRemoved: false,
            isOpen: false,
            isStart: false,
            isReportable: false,
            data: {
                "action": "save"
            }
        };
        retValue.push(saveButton);

        let cancelButton: IButton = {
            order: 0,
            text: ko.observable("Close Blade"),
            onClick: () => {
                this.cancelClicked();
            },
            id: "",
            icon: ko.observable("fa-times"),
            enabled: ko.observable(true),
            visible: ko.observable(true),
            tooltip: "Close the blade (without saving)",
            actionType: ButtonType.cancel,
            materialDesignButtonType: ko.observable(ASMaterialDesignButtonStyles.text),
            color: undefined,
            isOptimumPath: false,
            isSystemClosedPhase: false,
            isRemoved: false,
            isOpen: false,
            isStart: false,
            isReportable: false,
            data: {
                "action": "cancel"
            }
        };
        retValue.push(cancelButton);

        return retValue;
    }


    /**
     * Called by the UI framework after initial creation and binding to load data
     * into it's model
     */
    loadAndBind() {
        this.blade.loadSharedo(this.afterLoadAndBind.bind(this));
    };

    afterLoadAndBind() {
        this.log("Load And Bind");

        if (!this.sharedoTypeSystemName) {
            this.log("No Sharedo Type Name");
            return;
        }
        getPhasePlan(this.sharedoTypeSystemName).then((phasePlan) => {
            this.log("Phase Plan Loaded", "red", phasePlan);
            this.phasePlan(phasePlan);

        });
    }

    load(model: any) {
        this.log("Load");
    };

    reload(model: any) {
        this.log("Reload");
    };


    cancelClicked() {
        console.log("Cancel Clicked");
        $ui.stacks.cancelAll();
        return;
    }

    saveClicked(): void {
        console.log("Save Clicked");
        this.save();
    }

    save(): void {
    this.model.saveRuns++;
    this.log("----> Running Save", 'background: #222; color: #bada55');
    //Store the validate function in temp
    this.isValidTemp = this.blade.isValid;
    //wait 500 ms then run the save - to give models time to load
   
        //override the validate function
        this.blade.isValid = () => { return true };
        this.blade.save(false, () => {
            this.loadAndBind();
            this.saveCompleted();
        }, false, null);
        this.blade.isValid = this.isValidTemp;

    }

    // ... rest of your methods as in your JavaScript code

    runSaveWithNoValidation(): void {
        // ... as in your JavaScript code
    }

    areAllAspectsLoaded(): void {
        // ... as in your JavaScript code
    }

    async saveCompleted() {
        console.log("Save Completed");
        // ... as in your JavaScript code
    }

    monitorHandlers(isSaveSubmitCancel?: boolean): void {
        // ... as in your JavaScript code 
    }

    addSubscription(eventName: string): void {
        // ... as in your JavaScript code
    }

    // ... all other methods similar to your JavaScript code





    log(message: string, color?: string, data?: any): void {
        if (this.configuration.debug?.enabled) {
            if (this.configuration.debug.logToConsole) {
                console.log(`%c ${thisWidgetSystemName} - ${message}`, color, data);
            }
        }
    }

    private addDebugIfRequired() {
        if (this.configuration.debug?.enabled) {
            (window as any).aspectDebug = (window as any).aspectDebug || {};
            (window as any).aspectDebug[thisWidgetSystemName] = this;
        }
    }
}


