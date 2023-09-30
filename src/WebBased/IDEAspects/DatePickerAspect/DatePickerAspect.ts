import { DateTime, TempusDominus } from '@eonasdan/tempus-dominus';
//https://getdatepicker.com/6/options/display.html
import { IDatePickerAspectOptions, setting} from "./DatePickerAspectConfiguration";
import { IDefaultSettings, IWidgetJson} from '../BaseClasses/IWidgetJson';
import { BaseIDEAspect, getFormBuilderFieldPath } from '../BaseClasses/BaseIDEAspect';

let thisWidgetSystemName = "DatePickerAspect";


//add style to head: https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css

export class DatePickerAspect extends BaseIDEAspect<IDatePickerAspectOptions, any> {
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
        return setting;
    }
   

    setDefaults(): IDefaultSettings<IDatePickerAspectOptions> {
        return {
            // Aspect widget config parameters
            title: undefined,
            formBuilderField: undefined,
            pickerEnabled: true,
            eventToFireOnUpdate: ["IDEAspects.DatePickerAspect.Update"],
            defaultValue: {
                defaultDateFromNowHours: 24,
                getValueUsingParents: true,
                maxDepth: 0,
            },
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
                showInAspect: false
            },
            eventsToReactTo: [],
            dataSettings: {
                getValueUsingParents: false,
                maxDepth: 0,
            }
        }
    }

   //Abstract methods - must be implemented by the derived class
    setLocationOfDataToLoadAndSave(): string {
        if(!this.configuration.formBuilderField)
        {
            this.log("No formbuilder field set in configuration - check aspect configuration", "red");
            throw new Error("No formbuilder field set in configuration - check aspect configuration");
        }
        return getFormBuilderFieldPath(this.configuration.formBuilderField);
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

        let foundValue = await this.getData();
        if (!foundValue) {
            foundValue = this.generateDefaultDate();
        }
        
        retValue = this.ensureDate(foundValue);

        this.setModelDataAsDate(retValue); //set the value to ensure it is valid
       

        return retValue;
    }

    /**
     * @returns get today date + defaultDateFromNowHours (if set in configuration)
     */
    private generateDefaultDate() {
        let defaultDate = new DateTime(DateTime.now());
        if (this.configuration.defaultValue?.defaultDateFromNowHours) {
            defaultDate.setHours(defaultDate.getHours() + this.configuration.defaultValue.defaultDateFromNowHours);
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
            return;
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

        this.dateTimePicker = new TempusDominus(this.datePickerDiv, this.configuration.datePickerOptions || {});
        this.options.datePickerOptions.subscribe((newValue) => {
            this.loadAndBind();
        });


        this.setPickerEnabledState(this.options.pickerEnabled());
        //Set the value of the picker to the value in the model
        let dateToSet = await this.getModelDataAsDate()
        this.dateTimePicker.dates.setValue(
            dateToSet,
            this.dateTimePicker.dates.lastPickedIndex
        );

        this.dateTimePicker.subscribe("change.td", (e: any) => {
            this.log("Date Changed", "red", e);
            this.options.eventToFireOnUpdate()?.forEach((event) => {
                $ui.events.broadcast(event,
                    {
                        source: this,
                        formbuilderField: this.formbuilderField,
                        value: this.getCurrentSelectedDate()
                    }); //fire event and pass in the date
            });
            this.setModelDataAsDate(this.getCurrentSelectedDate());
        });

    };

    /**
     * Ensure the date is a valid date
        * @param d
        * @returns a DateTime based on the input or a default date if the input is not valid
    **/
    ensureDate(d: any) : DateTime {
        let retValue: DateTime;
        //check if d is a date
        if (d instanceof DateTime) {
            return d;
        }

        try {
             retValue = new DateTime(DateTime.parse(d));
            if(!DateTime.isValid(retValue))
            {
                retValue= this.generateDefaultDate();;
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

    public override async onSave(model: any) {
        this.log("Save");
        this.setModelDataAsDate(this.getCurrentSelectedDate());
        super.onSave(model);
    }
}


