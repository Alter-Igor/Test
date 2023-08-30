
import { IPhasePlan, Phase, Transition } from "../../../Typings/api/PhasePlan/PhasePlan";
import { getTemplates } from "./TemplateFirstAspectAgent";
import * as ko from "knockout";
import { ASMaterialButton, ASMaterialDesignButtonStyles } from "alterspective-material-design-web-components";
import { ColorTranslator } from 'colortranslator';
import { ITemplatesListViewResult } from "./ITemplates";

let thisWidgetSystemName = "TemplateFirstAspect";

export interface ITemplateFirst_ConfigurationFromModeller {
    backgroundColor: string;
    debug: Debug | null | undefined;
}


export interface Host {
    model: HostModel | null;
    blade: any | null;
    enabled: boolean | null;
    toolbarContext?: any | null;
    burgerContext?: any | null;
    _host: Host;
}

type ConfigurationWithHost = ITemplateFirst_ConfigurationFromModeller & Host;

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

export class TemplateFirst {

   
    private element?: HTMLElement;
    private blade: any;
    private sharedoId: ko.Observable<string | undefined> | undefined;
    private sharedoTypeSystemName: string | null | undefined;
    private model: Model;
    private isValidTemp: any;
    hostModel: HostModel | null;
    currentPhaseSystemName: ko.Observable<string | undefined> | undefined;
    buttonGroupElement: HTMLElement | undefined;
    templatesList: ko.Observable<ITemplatesListViewResult | undefined>;
    configuration: ITemplateFirst_ConfigurationFromModeller;
    host: Host;


    constructor(element: HTMLElement, configurationWithHost: ConfigurationWithHost, baseModel: any) {
       
        let defaults: ITemplateFirst_ConfigurationFromModeller =
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
        this.templatesList = ko.observable<ITemplatesListViewResult | undefined>();
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

       
        this.log("Init", 'background: #222; color: #bada55');

        // if (this.model.eventToFireSaveOn) {
        //     this.disposables = [
        //         $ui.events.subscribe(this.model.eventToFireSaveOn, this.save, this)
        //     ];
        // }

        this.element = element;
        this.blade = configurationWithHost._host.blade
        this.sharedoId = this.hostModel?.id;
        this.sharedoTypeSystemName = this.blade.model.sharedoTypeSystemName()
        this.currentPhaseSystemName = this.blade.model.phaseSystemName

    
        this.addDebugIfRequired();
    }

    handlePhasePlanChange(phasePlan: IPhasePlan | undefined) {
        this.log("Phase Plan Changed", "red", phasePlan);
       

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
        getTemplates(this.sharedoTypeSystemName).then((templatesListViewResult) => {
            this.log("Phase Plan Loaded", "red", templatesListViewResult);

            if(!templatesListViewResult) {
                return;
            }

            this.templatesList(templatesListViewResult)

        });
    }

    load(model: any) {
        this.log("Load");
    };

    reload(model: any) {
        this.log("Reload");
    };


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


