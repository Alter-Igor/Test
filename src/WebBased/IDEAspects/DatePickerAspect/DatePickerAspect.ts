
import * as ko from "knockout";
import { TempusDominus } from '@eonasdan/tempus-dominus';
import { v4 as uuid4 } from "uuid";
import { AspectData } from "../../../Interfaces/OdsList/IODSOrganisationResult";

let thisWidgetSystemName = "DatePickerAspect";


//add style to head: https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css
document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`);



export interface IDatePickerAspect_ConfigurationFromModeller {
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

type ConfigurationWithHost = IDatePickerAspect_ConfigurationFromModeller & Host;

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

export class DatePickerAspect {

    firedEvents: any[];
    monitoredHandlers: any[];
    readyForSave: boolean;
    options?: ConfigurationWithHost;
    disposables?: any[];
    enabled?: boolean;
    instanceId?: string;
    element?: HTMLElement;
    blade: any;
    parentSharedoId?: string;
    toolbarContext: any;
    burgerContext: any;
    sharedoId: ko.Observable<string | undefined> | undefined;
    sharedoTypeSystemName: string | null | undefined;
    reloading?: boolean;
    model: Model;
    isValidTemp: any;
    hostModel: HostModel | null;
    currentPhaseSystemName: ko.Observable<string | undefined> | undefined;
    DatePickerAspectElement: any;
    configuration: IDatePickerAspect_ConfigurationFromModeller;
    host: Host;
    dateTimePicker: TempusDominus | undefined;
    pickerId: string;


    constructor(element: HTMLElement, configurationWithHost: ConfigurationWithHost, baseModel: any) {

        this.firedEvents = [];
        this.monitoredHandlers = [];
        this.readyForSave = false;
        let defaults: IDatePickerAspect_ConfigurationFromModeller =
        {
            // Aspect widget config parameters
            debug: {
                enabled: false,
                logToConsole: false,
                showEvents: false,
                showInAspect: false
            }
        }

       
        this.options = $.extend(true, {}, defaults, configurationWithHost);
        

        this.configuration = this.options;
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

        this.log("----> Constructing", 'background: #222; color: #bada55', configurationWithHost);


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

        this.pickerId = uuid4().toString();

        this.addDebugIfRequired();
    }

    formbuilder() {
        return this.blade.model.aspectData.formBuilder.formData;
    }


    /**
     * Called by the UI framework after initial creation and binding to load data
     * into it's model
     */
    loadAndBind() {

        if(this.element === undefined){
            return; 
        }
        
        let element = this.element.querySelector(".IDEAspects-DatePickerAspect");
        if(!element){
            this.log("No element found", "red");
            return;
        }
        // <div class="log-event" id="datetimepicker1"></div>
        let div = document.createElement("div");
        div.classList.add("log-event");
        div.id = this.pickerId;
        element.appendChild(div);

        
        this.dateTimePicker = new TempusDominus(div, {
            display: {
                inline: true,
                sideBySide:true
              }
          });

          let data = this.formbuilder();
          this.log("Data", "red", data);
          
          let date = this.convertToLocalDate(data.eDiscoveryUpdatePlannedDate)
          
          const parsedDate = this.dateTimePicker.dates.parseInput(date);
      
          
          //if multipleDates is false, the second parameter is not required.
          this.dateTimePicker.dates.setValue(
            parsedDate,
            this.dateTimePicker.dates.lastPickedIndex
          );

          this.dateTimePicker.subscribe("change.td", (e: any) => {
            this.log("Date Changed", "red", e);
            this.onSave();
          });
          
    };

     convertToLocalDate(datestr : string) {
        let date = new Date(Date.parse(datestr));
        return new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    }

    convertToSysDate(date : Date | undefined) {
        if(!date)
        {
            return new Date();
        }
        return new Date(date.getTime()-date.getTimezoneOffset()*60*1000);
    }

    load(model: any) {
        this.log("Load");
    };

    reload(model: any) {
        this.log("Reload");
    };



    onSave(): void {

        this.log("----> Running Save", 'background: #222; color: #bada55');

        let data = this.formbuilder();
        this.log("Data", "red", data);

//+date.getTimezoneOffset()*60*1000

        data.eDiscoveryUpdatePlannedDate =this.convertToSysDate(this.dateTimePicker?.dates.picked[0]).toISOString();

    }


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


