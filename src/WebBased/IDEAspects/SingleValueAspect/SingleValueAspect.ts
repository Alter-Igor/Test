import { formatValue } from "../../../helpers/Formatter";
import { searchForAttributeRecursive } from "../../Common/api/searchForAttributeWithParents";
import { BaseIDEAspect, Defaults } from "../BaseClasses/BaseIDEAspect";
import { ISingleValueAspectConfiguration } from "./SingleValueAspectConfig";

let thisWidgetSystemName = "SingleValueAspect";


export class SingleValueAspect extends BaseIDEAspect<ISingleValueAspectConfiguration, any> {

    setDefaults(): Defaults<ISingleValueAspectConfiguration> {
        return  {
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
    }
    
    constructor(element: HTMLElement, configuration: ISingleValueAspectConfiguration, baseModel: any) {
        super("SingleValueAspect", "aspectData.odsEntityPicker", element, configuration, baseModel)
        this.setup();
    }

    setLocationOfDataToLoadAndSave(): string | undefined {
        return undefined;
    }

    // private initialise() {//! Note: UI framework looks for this method name and if found behaves differently and wont call loadAndBind

    private setup() {
        
        this.data = {
            value: "",
            title: this.options.title() || "Title Value"
        };

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
                let formattedValue = formatValue(data.value, this.options.formatter() || "value");
                this.options.calculatedValue(formattedValue || "");
            }
        });
    };

    
     

    override onSave(model: any): void {

        this.log("No Save Implemented", "green");
        // super.onSave(model);

    };
} 