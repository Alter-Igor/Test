
import { formatValue } from "../../../helpers/Formatter";
import { searchForAttributeRecursive } from "../../Common/api/searchForAttributeWithParents";
import { BaseIDEAspect } from "../BaseClasses/BaseIDEAspect";
import { IDefaultSettingsWithSpecificComponentConfig, IWidgetJson } from "../BaseClasses/Interfaces";
import { Default, ISingleValueAspectConfiguration, WidgetSettings } from "./SingleValueAspectConfig";

let thisWidgetSystemName = "SingleValueAspect";

export class SingleValueAspect extends BaseIDEAspect<ISingleValueAspectConfiguration, any> {
    liveConfigurationRefreshed(): void {
        //nothing
    }
    refresh(newConfig: any): void {
        //nothing
    }
    reset(newConfig: any): void {
        //nothing
    }
    setThisComponentName(): string {
        return "SingleValueAspect";
    }
    setWidgetJsonSettings(): IWidgetJson<ISingleValueAspectConfiguration> {
        return WidgetSettings;
    }

    setDefaults(): IDefaultSettingsWithSpecificComponentConfig<ISingleValueAspectConfiguration> {
        return  Default
    }
    
    // constructor(element: HTMLElement, configuration: ISingleValueAspectConfiguration, baseModel: any) {
    //     super("SingleValueAspect", "aspectData.odsEntityPicker", element, configuration, baseModel)
    //     this.setup();
    // }

    setLocationOfDataToLoadAndSave(): string | undefined {
        return undefined;
    }

    // private initialise() {//! Note: UI framework looks for this method name and if found behaves differently and wont call loadAndBind

    async setup() {
        
        this.setData({
            value: "",
            title: this.options?.title() || "Title Value"
        });

        // Map the roleConfigModels
        this.options?.fieldPath.subscribe((newValue) => {
            this.log("Field path changed", "green",newValue);
            this.loadAndBind();
        });
        this.options?.calculatedTitle(this.options?.title() || "Title Value");
        this.options?.title.subscribe((newValue) => {
            this.log("Title changed", "green", newValue);
            if(newValue)
            {
                 this.options?.calculatedTitle(newValue);
            }
        });
    }

    override loadAndBind(): void {

        this.log("Loading data (model) passed in", "green");
        // super.loadAndBind(); //No need to load and bind as we are not using the base model

        let sharedoId = this.sharedoId();

        if(!sharedoId)
        {
            this.log("No sharedoId passed in", "red");
            return;
        }

        if(!this.options?.fieldPath())
        {
            this.log("No field path passed in", "red");
            return;
        }

        searchForAttributeRecursive(sharedoId, this.options?.fieldPath()!, this.options?.dataSettings().getValueUsingParents(), this.options?.dataSettings().maxDepth()).then((data)=>
        {
            if (!data || data.found == false)
            {
                this.log("No data returned", "red");
                this.options?.calculatedValue(this.options?.valueOnNotFound() || "");
            }
            else
            {
                let formattedValue = formatValue(data.value, this.options?.formatter() || "value");
                this.options?.calculatedValue(formattedValue || "");
            }
        });
    };

    override async onSave(model: any) {

        this.log("No Save Implemented", "green");
        // super.onSave(model);

    };
} 