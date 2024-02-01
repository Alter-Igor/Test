import { DateTime, Options, TempusDominus } from '@eonasdan/tempus-dominus';
//https://getdatepicker.com/6/options/display.html
import { IDatePickerAspectOptions, DATE_PICKER_DEFAULTS, DATE_PICKER_WIDGET_DEFAULTS } from "./DatePickerAspectConfiguration";
import { IDefaultSettingsWithSpecificComponentConfig, IWidgetJson } from '../BaseClasses/Interfaces';
import { BaseIDEAspect, getFormBuilderFieldPath } from '../BaseClasses/BaseIDEAspect';
import { DEBUG_DEFAULT } from '../BaseClasses/DefaultSettings';
import ko from 'knockout';
import { evaluteRule, executeEmbeddedCode } from '../../../helpers/evaluteRule';

let thisWidgetSystemName = "DatePickerAspect";

// "fieldPath": "form-alt-ediscovery-job-desired-completion-date-date-only.job-desired-completion-date",
// "title": "Desired Date",
//add style to head: https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css

export class DatePickerAspect extends BaseIDEAspect<IDatePickerAspectOptions, any> {
    liveConfigurationRefreshed(): void {
        this.loadAndBind();
    }
    refresh(newConfig: any): void {
        // throw new Error('Method not implemented.');
    }
    reset(newConfig: any): void {
        // throw new Error('Method not implemented.');
    }


    datePickerDiv: HTMLDivElement | undefined;
    dateTimePicker: TempusDominus | undefined;

    // constructor(element: HTMLElement, configuration: IDatePickerAspectOptions, baseModel: any) {
    //     super("SingleValueAspect", "aspectData.odsEntityPicker", element, configuration, baseModel)
    // }

    //Abstract methods - must be implemented by the derived class

    setThisComponentName(): string {
        return "DatePickerAspect";
    }
    setup(): void {

        document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`);

    }

    setWidgetJsonSettings(): IWidgetJson<IDatePickerAspectOptions> {
        return DATE_PICKER_WIDGET_DEFAULTS;
    }

    setDefaults(): IDefaultSettingsWithSpecificComponentConfig<IDatePickerAspectOptions> {
        return DATE_PICKER_DEFAULTS;
    }

    //Abstract methods - must be implemented by the derived class
    setLocationOfDataToLoadAndSave(): string {
        if (!this.sharedoConfiguration.configuration.formBuilderField) {
            this.err("No formbuilder field set in configuration - check aspect configuration");
            throw new Error("No formbuilder field set in configuration - check aspect configuration");
        }

        let formBuilderField = executeEmbeddedCode(this.sharedoConfiguration.configuration.formBuilderField, this.getDataContext());

        return getFormBuilderFieldPath(formBuilderField);
    }
    getDataContext(): any {
        let dataContext = ko.toJS(this.model) as any;
        let formBuilderData= this.formbuilder();
        dataContext["formBuilder"] = formBuilderData; //to make it easier to access the formbuilder data
        return dataContext;

    }


    async getValueToPopulate()  {

        
        let dataContext = this.getDataContext();
        let retValue: string | undefined = executeEmbeddedCode(this.configuration?.formBuilderField,dataContext) || "";

        if(retValue)
        {
            retValue = await this.getData()
            if(retValue)
            {
                retValue = JSON.stringify(retValue, null, 2);
            }
        }

       
        if (this.configuration?.getValueOptions) {
            if (typeof this.configuration?.getValueOptions === "string") {
                retValue = executeEmbeddedCode(this.configuration?.getValueOptions, dataContext);
            }

            if (Array.isArray(this.configuration?.getValueOptions)) {

                // this.configuration.getValueOptions.forEach((option) => {
                for(let i = 0; i < this.configuration.getValueOptions.length; i++){
                    let option = this.configuration.getValueOptions[i];
 
                    let value = evaluteRule(option.rule, dataContext);
                    if (value) {
                        retValue = await this.searchByGraph(option.fieldPath, true);
                        break; //we stop as soon as we have a true rule
                    }
                };
            }
        }
        
        return retValue;

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

    /**
     * Sanatise the data before saving, form build data needs to be a string
     */
    setModelDataAsDate(newValue: DateTime | undefined) {
        this.setData(newValue?.toISOString() || undefined);
    }

    /** 
     * Gets the data from form builder and converts to DateTime
     */
    async getModelDataAsDate() {
        let retValue: DateTime
        let foundValue = await this.getValueToPopulate();

        //  let foundValue = await this.getData(fieldPath);
        if (!foundValue) {
            retValue = this.generateDefaultDate();
        }
        else{
            retValue = this.ensureDate(foundValue);
        }

        this.setModelDataAsDate(retValue); //set the value to ensure it is valid


        return retValue;
    }

    /**
     * @returns get today date + defaultDateFromNowHours (if set in configuration)
     */
    private generateDefaultDate() {
        let defaultDate = new DateTime(DateTime.now());
        let defaultDateFromNowHours = this.options?.defaultValue().defaultDateFromNowHours();
        if (defaultDateFromNowHours) {
            defaultDate.setHours(defaultDate.getHours() + defaultDateFromNowHours);
        }
        return defaultDate;
    }

    /**
     * Called by the UI framework after initial creation and binding to load data
     * into it's model
     */
    async loadAndBind() {

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
        }

        if (this.dateTimePicker) {
            this.dateTimePicker.dispose();
        }

        //Build the date picker div 
        this.datePickerDiv = document.createElement("div");
        this.datePickerDiv.classList.add("the-picker");
        this.datePickerDiv.classList.add("log-event");
        this.datePickerDiv.id = this.uniqueId;

        let input = document.createElement("input");
        input.id = this.uniqueId + "Input";
        input.type = "text";
        input.classList.add("form-control");
        input.setAttribute("data-td-target", "#" + this.uniqueId);

        if (this.options?.hideInputBox()) {
            input.classList.add("hidden");
        }
        this.options?.hideInputBox.subscribe((newValue) => {
            if (newValue) {
                input.classList.add("hidden");
            }
            else {
                input.classList.remove("hidden");
            }
        });

        this.datePickerDiv.appendChild(input);

        // let span = document.createElement("span");
        // span.classList.add("input-group-text");
        // span.setAttribute("data-td-target", "#" + this.uniqueId);
        // span.setAttribute("data-td-toggle", "datetimepicker");
        // let i = document.createElement("i"); 
        // i.classList.add("fas");
        // i.classList.add("fa-calendar");
        // span.appendChild(i); 
        // this.datePickerDiv.appendChild(span);

        element.appendChild(this.datePickerDiv);

        let datePickerOption = ko.toJS(this.options?.datePickerOptions()) as Options | undefined;

        try {
            this.dateTimePicker = new TempusDominus(this.datePickerDiv, datePickerOption);
            // this.options?.datePickerOptions.subscribe((newValue) => { ///! causing recurring
            //     this.loadAndBind();
            // });


            this.setPickerEnabledState(this.options?.pickerEnabled());
            //Set the value of the picker to the value in the model
            let dateToSet = await this.getModelDataAsDate()
            this.dateTimePicker.dates.setValue(
                dateToSet,
                this.dateTimePicker.dates.lastPickedIndex
            );

            this.dateTimePicker.subscribe("change.td", (e: any) => {
                this.log("Date Changed", "red", e);
                this.options?.eventToFireOnUpdate()?.forEach((event) => {
                    $ui.events.broadcast(event,
                        {
                            source: this,
                            formbuilderField: this.options?.formBuilderField(),
                            value: this.getCurrentSelectedDate()
                        }); //fire event and pass in the date
                });
                this.setModelDataAsDate(this.getCurrentSelectedDate());
            });
        }
        catch (e) {
            this.log("Error parsing date picker options", "red", e);
            //create error div
            let errorDiv = document.createElement("div");
            errorDiv.classList.add("alert");
            errorDiv.classList.add("alert-danger");
            errorDiv.classList.add("alert-dismissible");
            errorDiv.classList.add("fade");
            errorDiv.classList.add("show");
            errorDiv.setAttribute("role", "alert");
            errorDiv.innerHTML = `<strong>Error parsing date picker options</strong> - check aspect configuration <br> ${e}`;

            this.datePickerDiv.appendChild(errorDiv);

        }



    };

    /**
     * Ensure the date is a valid date
        * @param d
        * @returns a DateTime based on the input or a default date if the input is not valid
    **/
    ensureDate(d: any): DateTime {
        let retValue: DateTime;
        //check if d is a date
        if (d instanceof DateTime) {
            return d;
        }

        try {
            retValue = new DateTime(DateTime.parse(d));
            if (!DateTime.isValid(retValue)) {
                retValue = this.generateDefaultDate();;
            }

        }
        catch (e) {
            this.log(`Unable to parse date ${d} (setting date to default date) - check aspect configuration `, "red");
            retValue = this.generateDefaultDate();
        }

        return retValue;
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

    public override onSave(model: any) {
        this.log("Save");
        this.setModelDataAsDate(this.getCurrentSelectedDate());
        super.onSave(model);
    }
}


