import * as ko from "knockout";
import { DateTime, TempusDominus, Options } from '@eonasdan/tempus-dominus';
//https://getdatepicker.com/6/options/display.html
import { v4 as uuid4 } from "uuid";
import { AspectData } from "../../../Interfaces/OdsList/IODSOrganisationResult";

let thisWidgetSystemName = "DatePickerAspect";


//add style to head: https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css
document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`);



export interface IDatePickerAspect_ConfigurationFromModeller {
    debug: Debug | null | undefined;
    title: string | null | undefined;
    formBuilderField: string | null | undefined;
    pickerEnabled: boolean | null | undefined;
    eventToFireOnUpdate: Array<string> | null | undefined;
    datePickerOptions: Options | null | undefined;
    defaultDateFromNowHours: number | null | undefined;
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
    pickerEnabled: ko.Observable<boolean | null | undefined>;
    datePickerDiv: HTMLDivElement | undefined;
    dateTimePickerOptions: ko.Observable<any>;


    constructor(element: HTMLElement, configurationWithHost: ConfigurationWithHost, baseModel: any) {

        this.firedEvents = [];
        this.monitoredHandlers = [];
        this.readyForSave = false;

        let defaults: IDatePickerAspect_ConfigurationFromModeller =
        {
            // Aspect widget config parameters
            title: undefined,
            formBuilderField: undefined,
            pickerEnabled: true,
            eventToFireOnUpdate: ["IDEAspects.DatePickerAspect.Update"],
            defaultDateFromNowHours: 3,
            datePickerOptions: {
                display: {
                    inline: true,
                    sideBySide: true,
                    theme: "light"
                }
            },
            debug: {
                enabled: false,
                logToConsole: false,
                showEvents: false,
                showInAspect: false
            }
        }


        this.options = $.extend(true, {}, defaults, configurationWithHost);

        this.dateTimePickerOptions = ko.observable(this.options.datePickerOptions);

        this.configuration = this.options;
        this.blade = configurationWithHost._host.blade;
        this.hostModel = configurationWithHost._host.model;
        this.host = configurationWithHost._host;

        this.pickerEnabled = ko.observable(this.options.pickerEnabled);
        this.pickerEnabled.subscribe((newValue) => {
            this.setPickerEnabledState(newValue);
        });


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

    private setPickerEnabledState(newValue: boolean | null | undefined) {
        if (!this.datePickerDiv) {
            return;
        }

        if (newValue) {
            this.datePickerDiv.classList.toggle("disabled", false);

        }
        else {
            this.datePickerDiv.classList.toggle("disabled", true);
        }
    }

    formbuilder() {
        if (!this.blade.model.aspectData.formBuilder) {
            this.log("No formbuilder", "blue");
            this.log(`Creating formbuilder`, "blue");
            this.blade.model.aspectData.formBuilder = {
                formData: {}
            };

        }

        if (!this.blade.model.aspectData.formBuilder.formData) {
            this.log("No formbuilder form data", "blue");
            this.log(`Creating formbuilder form data`, "blue");
            this.blade.model.aspectData.formBuilder.formData = {};
        }

        return this.blade.model.aspectData.formBuilder.formData;
    }

    formbuilderField(setValue?: DateTime): DateTime | undefined {
        if (!this.formbuilder()) {
            return undefined;
        }


        if (!this.configuration.formBuilderField) {
            this.log("No formbuilder field set in configuration - check aspect configuration", "red");
            return undefined;
        }


        let foundValue: string = this.formbuilder()[this.configuration.formBuilderField]
        if (!foundValue) {
            this.log(`Form builder does not contain field ${this.configuration.formBuilderField} `, "orange");
            this.log(`Creating field ${this.configuration.formBuilderField} `, "orange");
        }

        //Are we doing a set
        if (setValue) {
            this.formbuilder()[this.configuration.formBuilderField] = setValue.toISOString();
            return setValue;
        }

        if (!foundValue) {
            let defaultDate = new DateTime(DateTime.now());
            if (this.configuration.defaultDateFromNowHours) {
                defaultDate.setHours(defaultDate.getHours() + this.configuration.defaultDateFromNowHours);
            }
            foundValue = defaultDate.toISOString();
        }

        //if not we are doing a get
        let retValue: DateTime
        try {
            retValue = this.convertToLocalDate(foundValue);
        }
        catch (e) {
            this.log(`Unable to parse date ${foundValue} - check aspect configuration `, "red");
            return undefined;
        }

        return retValue;
    }


    /**
     * Called by the UI framework after initial creation and binding to load data
     * into it's model
     */
    loadAndBind() {

        if (this.element === undefined) {
            return;
        }

        let element = this.element.querySelector(".IDEAspects-DatePickerAspect");
        if (!element) {
            this.log("No element found", "red");
            return;
        }


        //check if already exists remove it
        if (this.datePickerDiv) {
            this.log("Already exists", "red");
            this.datePickerDiv.remove();
            return;
        }

        // document.getElementById('datetimepicker1')


        // <div class="log-event" id="datetimepicker1"></div>
        this.datePickerDiv = document.createElement("div");
        this.datePickerDiv.classList.add("the-picker");
        this.datePickerDiv.classList.add("log-event");
        this.datePickerDiv.id = this.pickerId;
        // <input
    //     id="datetimepicker1Input"
    //     type="text"
    //     class="form-control"
    //     data-td-target="#datetimepicker1"
    //   />

        let input = document.createElement("input");
        input.id = this.pickerId + "Input";
        input.type = "text";
        input.classList.add("form-control");
        input.setAttribute("data-td-target", "#" + this.pickerId);
        this.datePickerDiv.appendChild(input);

    //     <span
    //     class="input-group-text"
    //     data-td-target="#datetimepicker1"
    //     data-td-toggle="datetimepicker"
    //   >
    //     <i class="fas fa-calendar"></i>
    //   </span>

        
        let span = document.createElement("span");
        span.classList.add("input-group-text");
        span.setAttribute("data-td-target", "#" + this.pickerId);
        span.setAttribute("data-td-toggle", "datetimepicker");
        let i = document.createElement("i");
        i.classList.add("fas");
        i.classList.add("fa-calendar");
        span.appendChild(i);
        this.datePickerDiv.appendChild(span);


        element.appendChild(this.datePickerDiv);


        this.dateTimePicker = new TempusDominus(this.datePickerDiv, this.dateTimePickerOptions());
        this.dateTimePickerOptions.subscribe((newValue) => {
            this.loadAndBind();
        });


        this.setPickerEnabledState(this.pickerEnabled());

        let date = this.formbuilderField()

        const parsedDate = this.dateTimePicker.dates.parseInput(date);


        //if multipleDates is false, the second parameter is not required.
        this.dateTimePicker.dates.setValue(
            parsedDate,
            this.dateTimePicker.dates.lastPickedIndex
        );

        this.dateTimePicker.subscribe("change.td", (e: any) => {
            this.log("Date Changed", "red", e);

            this.options?.eventToFireOnUpdate?.forEach((event) => {
                $ui.events.broadcast(event,
                    {
                        source: this,
                        formbuilderField: this.formbuilderField,
                        value: this.getCurrentSelectedDate()
                    }); //fire event and pass in the date
            });
            this.onSave();
        });

    };

    convertToLocalDate(datestr: string) {
        let date = new DateTime(DateTime.parse(datestr));
        return new DateTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    }

    convertToSysDate(date: DateTime | undefined) {
        if (!date) {
            return new DateTime();
        }
        return new DateTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    }

    load(model: any) {
        this.log("Load");
    };

    reload(model: any) {
        this.log("Reload");
    };

    getCurrentSelectedDate() {
        return this.dateTimePicker?.dates.picked[0];
    }


    onSave(): void {
        this.log("----> Running Save", 'background: #222; color: #bada55');
        let data = this.formbuilder();
        this.log("Data", "red", data);
        //+date.getTimezoneOffset()*60*1000
        this.log("Current Date", "green", this.getCurrentSelectedDate());
        this.formbuilderField(this.convertToSysDate(this.getCurrentSelectedDate()));
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


