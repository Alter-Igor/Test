
import { IWidgetJson } from "../../IDEAspects/BaseClasses/Interfaces";
import { SingleValueAspect } from "../../IDEAspects/SingleValueAspect/SingleValueAspect";
import { ISingleValueAspectConfiguration } from "../../IDEAspects/SingleValueAspect/SingleValueAspectConfig";
import { SingleValuePortalDefault, WidgetSettings } from "./SingleValuePortalWidgetConfig";

let thisWidgetSystemName = "SingleValuePortalWidget";

export class SingleValuePortalWidget extends SingleValueAspect{
    liveConfigurationRefreshed(): void {
       //nothing to do
    }

  
override setThisComponentName(): string {
        return thisWidgetSystemName;
}

    override setDefaults() {
        return  SingleValuePortalDefault
    }
    

    override setWidgetJsonSettings(): IWidgetJson<ISingleValueAspectConfiguration> {
        return WidgetSettings;
    }

}