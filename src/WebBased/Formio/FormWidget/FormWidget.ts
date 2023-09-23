
import * as ko from "knockout";
import { renderForm } from "../Common/FormioRender";
import { IFormWidgetConfiguration } from "./designer/FormWidgetDesigner";
import { convertFormIOData_To_FormBuilderData } from "../Common/Converter";
import { createWorkType } from "./CreateWorkType";
import { AspectData } from "../../../Interfaces/OdsList/IODSOrganisationResult";

let thisWidgetSystemName = "FormWidget";



export interface Host {
    model: HostModel | null;
    // blade: any | null;
    enabled: boolean | null;
    toolbarContext?: any | null;
    burgerContext?: any | null;
    _host?: Host;
}

type ConfigurationWithHost = IFormWidgetConfiguration & Host;

export interface HostModel {
    title: string;
    instanceId: string;
    parentSharedoId: string;
    id: ko.Observable<string | undefined>;
    aspectData: AspectData;
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

export class FormWidget {

    firedEvents: any[];
    monitoredHandlers: any[];
    readyForSave: boolean;
    options?: ConfigurationWithHost;
    disposables?: any[];
    enabled?: boolean;
    instanceId?: string;
    element: Element | null | undefined;
    parentSharedoId?: string;
    toolbarContext: any;
    burgerContext: any;
    sharedoId: ko.Observable<string | undefined> | undefined;
    sharedoTypeSystemName: string | null | undefined;
    reloading?: boolean;
    model: Model;
    isValidTemp: any;
    // hostModel: HostModel | null;
    currentPhaseSystemName: ko.Observable<string | undefined> | undefined;
    thisWidgetElement: any;
    formDefinition: ko.Observable<string> | undefined;
    host: Host | undefined;
    widgetBody: Element | null | undefined;
    formIO: any;



    constructor(element: HTMLElement, configurationWithHost: ConfigurationWithHost, baseModel: any) {

        this.firedEvents = [];
        this.monitoredHandlers = [];
        this.readyForSave = false;
        let defaults: IFormWidgetConfiguration =
        {
            formBuilderDefinition: "",
            broadcastOnSubmit: true,
            broadcastOnSubmitEventName: "",
            createWorkTypeOnSubmit: false,
            workItem: "",
            aspectData: "",
            keyDates: "",
            participants: "",
            formData:{},
            showPreview: false,
        }

        this.options = $.extend(true, {}, defaults, configurationWithHost);

        // this.hostModel = configurationWithHost._host.model;
        // this.host = configurationWithHost._host; 

        this.model =
        {
            // This is referencing a standard observable item from the main model
            // title: configurationWithHost._host?.model?.title,
            // This is the configured message against the aspect instance
            saveRuns: 0,
            title: ""
        };

        this.log("----> Constructing", 'background: #222; color: #bada55', configurationWithHost);
        // this.instanceId = this.hostModel?.instanceId;

        this.ensureElement(element);
        // this.parentSharedoId = this.hostModel?.parentSharedoId;
        // this.toolbarContext = configurationWithHost._host.toolbarContext;
        // this.burgerContext = configurationWithHost._host.burgerContext;

        // this.sharedoId = this.hostModel?.id; 
        this.reloading = false;
        // this.sharedoTypeSystemName = this.blade.model.sharedoTypeSystemName()
        // this.currentPhaseSystemName = this.blade.model.phaseSystemName

        if (this.currentPhaseSystemName !== undefined) {
            this.currentPhaseSystemName.subscribe(() => {
                this.log("Current Phase Changed", "red", this.currentPhaseSystemName!());
                this.loadAndBind();
            });
        };
    }

    private ensureElement(element: HTMLElement) {
        this.widgetBody = element.querySelector(".widget-body");
        if (!this.widgetBody) {
            this.widgetBody = document.createElement("div");
            this.widgetBody.className = "widget-body";
            element.appendChild(this.widgetBody);
        }

        let widgetElement = this.widgetBody.querySelector("widget-form-widget");
        if (!widgetElement) {
            widgetElement = document.createElement("widget-form-widget");
            element.appendChild(widgetElement);
        }
        this.element = widgetElement;
    }

    /**
     * 
     * @returns Return the formbuilder data on this matter if it exists
     */
    formbuilder(): any | undefined {
        // return this.blade.model.aspectData.formBuilder.formData;
    }


    /**
     * Called by the UI framework after initial creation and binding to load data
     * into it's model
     */
    async loadAndBind() {

        let div: HTMLElement = this.element!.querySelector("#formio")!;
        if (div) {
            div.remove();
        }

        div = document.createElement("div");
        div.id = "formio-container";
        this.element!.appendChild(div);

        // renderForm(div, formUrl);
        this.log("----- renderTestForm(div);", "red");
        // await setAll();
        this.formIO = await renderForm(div, this.options?.formBuilderDefinition);

        this.formIO.on('submit', (submission: any) => {
            this.handleFormSubmit(submission);
        });

    }

    handleFormSubmit(submission: any) {
        this.log("Submission was made!", "green", submission);
        this.log("broadcast OnSubmit", "green", this.options?.broadcastOnSubmit);
        this.log("Broadcasting event", "green", this.options?.broadcastOnSubmitEventName);
        let convertedData = convertFormIOData_To_FormBuilderData(submission, this.options?.model?.aspectData);
        if (this.options?.broadcastOnSubmit) {

            this.log("Broadcasting event", "green", this.options?.broadcastOnSubmitEventName);
            $ui.events.broadcast(this.options?.broadcastOnSubmitEventName, convertedData);
        }

        if (this.options?.createWorkTypeOnSubmit === true) {
            createWorkType(this.options?.workItem, this.options?.aspectData, this.options?.keyDates, this.options?.participants, convertedData)
        }
    }

    load(model: any) {
        this.log("Load");
    };

    reload(model: any) {
        this.log("Reload");
    };



    onSave(): void {
        this.log("onSave");

    }


    log(message: string, color?: string, data?: any): void {

        console.log(`%c ${thisWidgetSystemName} - ${message}`, color, data);

    }

}

