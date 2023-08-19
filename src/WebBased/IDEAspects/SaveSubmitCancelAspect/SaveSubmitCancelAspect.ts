
import { IPhasePlan, Transition } from "../../../Typings/api/PhasePlan/PhasePlan";
import { getPhasePlan } from "./SaveSubmitCancelAspectAgent";
import * as ko from "knockout";
import { convertTransitionToButton } from "./TransitionToButtonConverter";
import { ButtonType, IButton, IButtonGroup, buildButtonGroupElement } from "./ButtonBuilder";
import { ASMaterialDesignButtonStyles } from "alterspective-material-design-web-components";
let thisWidgetSystemName = "SaveSubmitCancelAspect";


//add style to head: https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css
document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`);
 
export interface Configuration {
    _host: Host;
    eventToFireSaveOn: any;
    singleEvent?: boolean;
    runSaveAfterMilliseconds?: number;
    debug?: Debug | null;
}

interface Defaults {
    debug: Debug | null | undefined;
}


export interface Host {
    model: HostModel | null;
    blade: any | null;
    enabled: boolean | null;
    toolbarContext?: any | null;
    burgerContext?: any | null;
}

export interface HostModel {
    title: string;
    instanceId: string;
    parentSharedoId: string;
    id: string;
}

export interface Debug {
    enabled?: boolean | null;
    logToConsole?: boolean | null;
    showEvents?: boolean | null;
    showInAspect?: boolean | null;
}

type Options = Configuration | Defaults | {
    title: string | null | undefined;
    saveRuns: number;
    eventToFireSaveOn: any;
    debug: Debug
};

export class SaveSubmitCancel {

    private firedEvents: any[];
    private monitoredHandlers: any[];
    private readyForSave: boolean;
    private options?: Configuration;
    private disposables?: any[];
    private enabled?: boolean;
    private instanceId?: string;
    private element?: HTMLElement;
    private blade: any;
    private parentSharedoId?: string;
    private toolbarContext: any;
    private burgerContext: any;
    private sharedoId: string | null | undefined;
    private sharedoTypeSystemName: string | null | undefined;
    private reloading?: boolean;
    private model: Options;
    private isValidTemp: any;
    private phasePlan:  ko.Observable<IPhasePlan | undefined>;
    hostModel: HostModel | null;
    currentPhaseSystemName: ko.Observable<string | undefined> |  undefined;
    buttonGroupElement: HTMLElement | undefined;
    buttonGroups: IButtonGroup[] | undefined;
    saveSubmitCancelElement: any;
    

    constructor(element: HTMLElement, configuration: Configuration, baseModel: any) {
        this.monitorHandlers();
        this.firedEvents = [];
        this.monitoredHandlers = [];
        this.readyForSave = false;
        let defaults: Defaults =
        {
            // Aspect widget config parameters
            debug: {
                enabled: false,
                logToConsole: false,
                showEvents: false,
                showInAspect: false
            }
        }
        let options: Options = $.extend(true, {}, defaults, configuration);
        this.blade = configuration._host.blade;
        this.hostModel = configuration._host.model;
        this.model =
        {
            // This is referencing a standard observable item from the main model
            title: configuration._host?.model?.title,
            // This is the configured message against the aspect instance
            saveRuns: 0,
            debug: options.debug,
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
        this.enabled = configuration._host.blade.enabled;
        this.instanceId = this.hostModel?.instanceId;
        this.element = element;
        this.blade = configuration._host.blade
        this.parentSharedoId = this.hostModel?.parentSharedoId;
        this.toolbarContext = configuration._host.toolbarContext;
        this.burgerContext = configuration._host.burgerContext;
        this.sharedoId = this.hostModel?.id;
        this.reloading = false;
        this.sharedoTypeSystemName = this.blade.model.sharedoTypeSystemName()
        this.currentPhaseSystemName = this.blade.model.phaseSystemName()

   

        this.addDebugIfRequired();
    }

    handlePhasePlanChange(phasePlan: IPhasePlan | undefined) {
        this.log("Phase Plan Changed", "red", phasePlan);

        if(!phasePlan) {
            return;
        }
        // get all the transitions for the current phase
        let transitions : Transition[];

        if(this.currentPhaseSystemName !== undefined && this.currentPhaseSystemName() !== undefined)
        {        
             transitions = phasePlan.transitions.filter(t => t.fromPhaseSystemName == this.currentPhaseSystemName!());
        }
        else
        {
            let startPhase = phasePlan.phases.find(p => p.isStart == true);
            if(!startPhase)
            {
                this.log("No Start Phase","red");
                return;
            }
            transitions = phasePlan.transitions.filter(t => t.fromPhaseSystemName == startPhase?.systemName);
        }

        let options = {
            onClick : (transition: Transition) => {
                this.log("Transition Clicked", "red", transition);
            }
        };

        //Remove existing buttons
        if(this.buttonGroupElement)
        {
            this.buttonGroupElement.remove();
        }
 
        this.log("Transitions to convert", "green", transitions.length);

        //Create Save and Cancel Buttons
        let systemTransitionGroup : IButtonGroup = {
            order: 0,
            enabled: ko.observable(true),
            showTitle: ko.observable(true),
            name: ko.observable("System"),
            buttons: this.createSystemButtons()
        };

        //Create Phase Plan Buttons
        let buttonTransitionGroup : IButtonGroup = {
            order: 1,
            enabled: this.blade.isValid,
            showTitle: ko.observable(true),
            name: ko.observable("Phase Plan"),
            buttons: convertTransitionToButton(transitions,phasePlan.phases,options)
        };
        //Create Button Groups and add System and Phase Plan Buttons 
        this.buttonGroups = [buttonTransitionGroup,systemTransitionGroup];
        //Generate Buttons Group Elements
        this.buttonGroupElement = buildButtonGroupElement(this.buttonGroups, this.blade);
        //Add Buttons to the Aspect

        //find save-submit-cancel class in this.element
        this.saveSubmitCancelElement = this.element!.querySelector(".save-submit-cancel");
    
        if(!this.saveSubmitCancelElement)
        {
            this.log("Save Submit Cancel Element Not Found", "red");
            return;
        }
        this.saveSubmitCancelElement.appendChild(this.buttonGroupElement);
        
 
    }



    private createSystemButtons() {
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
            type: ko.observable(ASMaterialDesignButtonStyles.outlined),
            color: undefined,
            isOptimumPath: false,
            isSystemClosedPhase: false,
            isRemoved: false,
            isOpen: false,
            isStart: false,
            isReportable: false
        };
        retValue.push(saveButton);

        let cancelButton: IButton = {
            order: 2,
            text: ko.observable("Cancel"),
            onClick: () => {
                this.saveClicked();
            },
            id: "",
            icon: ko.observable("fa-times"),
            enabled: ko.observable(true),
            visible: ko.observable(true),
            tooltip: "Cancel the current record",
            type: ko.observable(ASMaterialDesignButtonStyles.text),
            color: undefined,
            isOptimumPath: false,
            isSystemClosedPhase: false,
            isRemoved: false,
            isOpen: false,
            isStart: false,
            isReportable: false
        };
        retValue.push(cancelButton);

        return retValue;
    }

    /**
     * Called by the UI framework after initial creation and binding to load data
     * into it's model
     */
    loadAndBind() {
        this.log("Load And Bind");

        if(!this.sharedoTypeSystemName)
        {
            this.log("No Sharedo Type Name");
            return;
        }
        getPhasePlan(this.sharedoTypeSystemName).then((phasePlan) => {
            this.log("Phase Plan Loaded","red",phasePlan);
            this.phasePlan(phasePlan);

        });

    };

    load(model: any) {
        this.log("Load");
    }; 

    reload(model: any) {
        this.log("Reload");
    };
  
 
    saveClicked(): void {
        // ... as in your JavaScript code
    }

    save(): void {
        // ... as in your JavaScript code
    }

    // ... rest of your methods as in your JavaScript code

    runSaveWithNoValidation(): void {
        // ... as in your JavaScript code
    }

    areAllAspectsLoaded(): void {
        // ... as in your JavaScript code
    }

    saveCompleted(): void {
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
        if (this.model.debug?.enabled) {
            if (this.model.debug.logToConsole) {
                console.log(`%c ${thisWidgetSystemName} - ${message}`, color, data);
            }
        }
    }

    private addDebugIfRequired() {
        if (this.model?.debug?.enabled) {
            (window as any).aspectDebug = (window as any).aspectDebug || {};
            (window as any).aspectDebug[thisWidgetSystemName] = this;
        }
    }
}


