import { searchForAttributeRecursive } from "../../Common/api/searchForAttributeWithParents";
import { BaseIDEAspect } from "../BaseClasses/BaseIDEAspect";
import { IDebug } from "../BaseClasses/IDebug";
import { ISingleValueAspectConfiguration } from "./SingleValueAspectConfig";

let thisWidgetSystemName = "SingleValueAspect";


export class SingleValueAspect extends BaseIDEAspect<ISingleValueAspectConfiguration, any> {

 
    
    constructor(element: HTMLElement, configuration: ISingleValueAspectConfiguration, baseModel: any) {

        let defaults : ISingleValueAspectConfiguration & { debug:IDebug} = {
            fieldPath: "Title",
            title: "Title Value",
            calculatedValue: "",
            calculatedTitle: "",
            valueOnNotFound: "Not Found",
            searchParents: false,
            maxDepth: 0,
            formatter: "value",
            debug: {
                enabled: false,
                logToConsole: false,
                showInAspect: false
            }

        };
        super("SingleValueAspect", "aspectData.odsEntityPicker", element, configuration, baseModel, defaults)

        this.data = {
            value: "",
            title: this.options.title() || "Title Value"
        };
        // Base properties

        this.setup();
    }


    // private initialise() {//! Note: UI framework looks for this method name and if found behaves differently and wont call loadAndBind

    private setup() {
        // Map the roleConfigModels
        this.options.fieldPath.subscribe((newValue) => {
            this.log("Field path changed", "green",newValue);
            this.loadAndBind();
        });
        this.options.calculatedTitle(this.options.title() || "Title Value");
        this.options.title.subscribe((newValue) => {
            this.log("Title changed", "green", newValue);
            if(newValue)
            {
                 this.options.calculatedTitle(newValue);
            }
        });
    }

    override loadAndBind(): void {

        this.log("Loading data (model) passed in", "green");
        // super.loadAndBind(); //No need to load and bind as we are not using the base model

        if(!this.sharedoId)
        {
            this.log("No sharedoId passed in", "red");
            return;
        }

        if(!this.options.fieldPath())
        {
            this.log("No field path passed in", "red");
            return;
        }

        searchForAttributeRecursive(this.sharedoId(), this.options.fieldPath()!, this.options.searchParents()!, this.options.maxDepth()).then((data)=>
        {
            if (!data || data.found == false)
            {
                this.log("No data returned", "red");
                this.options.calculatedValue(this.options.valueOnNotFound() || "");
            }
            else
            {
                let formattedValue = this.formatValue(data.value, this.options.formatter() || "value");

                this.options.calculatedValue(formattedValue || "");
            }
        });
    };

    formatValue(value: any, formatter: string): any {
        // Create a new function based on the formatter
        const dynamicFunc = new Function('value', `return (${formatter});`);
        // Invoke the function with the given value
        return dynamicFunc(value);
    }
     

    override onSave(model: any): void {

        this.log("Saving data (model) passed in", "green");
        // super.onSave(model);

    };
} 