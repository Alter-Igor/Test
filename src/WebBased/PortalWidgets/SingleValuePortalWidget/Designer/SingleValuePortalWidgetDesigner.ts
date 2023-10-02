import * as ko from "knockout";
import * as $ from "jquery";
import { ISingleValuePortalConfiguration, SingleValuePortalDefault } from "../SingleValuePortalWidgetConfig";
import { NestedObservableObject, toObservableObject } from "../../../IDEAspects/BaseClasses/KOConverter";
import { IDefaultSettingsWithSpecificComponentConfig, IWidgetConfigSettings } from "../../../IDEAspects/BaseClasses/IWidgetJson";


export function SingleValuePortalWidgetDesigner(element: HTMLElement, configuration: any, baseModel: any): SingleValuePortalWidgetDesignerClass {
    return new SingleValuePortalWidgetDesignerClass(element, configuration, baseModel);
}


export class SingleValuePortalWidgetDesignerClass {
    model: NestedObservableObject<IDefaultSettingsWithSpecificComponentConfig<ISingleValuePortalConfiguration>>;
    validation: any;
    validationErrorCount: ko.Computed<number>;
    element: HTMLElement;


    constructor(element: HTMLElement, configuration: IWidgetConfigSettings<ISingleValuePortalConfiguration>, baseModel: any) {

        this.element = element;
        const defaults = SingleValuePortalDefault

        // configuration = ko.toJS(configuration);
        

        var options = $.extend(true, {}, defaults, configuration.configuration);

        let observableOptions = toObservableObject(options);

        // Create the model
        this.model = observableOptions;

        // Create the model validators
        this.validation =
        {
            fieldPath: ko.pureComputed(() => {
                var message = this.model.fieldPath();
                if (!message) return "The fieldPath is required";
                return null;
            })

        };

        // Expose a validationErrorCount observable to tell the host designer blade
        // whether save is currently possible or not. Return 0 to indicate all is valid,
        // or if not, the count of errors. If no validation required, this can be removed.
        this.validationErrorCount = ko.pureComputed(() => {
            var fails = 0;
            if (this.validation.fieldPath()) fails++;
            return fails;
        });
    }


    getModel():IWidgetConfigSettings<ISingleValuePortalConfiguration> {
        let retValue:IWidgetConfigSettings<ISingleValuePortalConfiguration> = {
            configuration: ko.toJS(this.model) as any
        }
        return retValue;
    };

    loadAndBind() {

    };

}




// namespace("Visualisation.Widgets");

// /**
//  * Constructor for your widget
//  * @param {} element            The Html DOM element to which this widget will bind
//  * @param {} configuration      The configuration passed in from the designer/config
//  * @param {} baseModel          The base widget model (contains unique id etc)
//  * @returns {}
//  */
// Visualisation.Widgets.SingleValueDisplayDesigner = function(element, configuration, baseModel)
// {
//     var self = this;
//     var defaults =
//     {
//         // These configurations are passed from the host of this designer widget
//         blade: null,                        // The blade hosting the widget
//         __scope:
//         {
//             mode: null,                     // Will be globalPortal or sharedoType
//             sharedoTypeSystemName: null     // If mode===sharedoType, contains the type being edited
//         },
//         // Your designer model is also passed in
//         fieldPath: null
//     };
//     var options = $.extend(true, {}, defaults, configuration);

//     // Create the model
//     this.model =
//     {
//         fieldPath: ko.observable(options.fieldPath)
//     };

//     // Create the model validators
//     this.validation =
//     {
//         fieldPath: ko.pureComputed(function()
//         {
//             var message = this.model.fieldPath();
//             if (!message) return "The fieldPath is required";
//             return null;
//         })
//     };

//     // Expose a validationErrorCount observable to tell the host designer blade
//     // whether save is currently possible or not. Return 0 to indicate all is valid,
//     // or if not, the count of errors. If no validation required, this can be removed.
//     this.validationErrorCount = ko.pureComputed(function()
//     {
//         var fails = 0;
//         if (this.validation.fieldPath()) fails++;
//         return fails;
//     });
// };

// /**
//  * Called by the UI framework when this widget is being unloaded - clean up
//  * any subscriptions or references here that would keep this instance alive
//  */
// Visualisation.Widgets.SingleValueDisplayDesigner.prototype.onDestroy = function()
// {
//     var self = this;
// };

// /**
//  * Called by the UI framework after initial creation and binding to load data
//  * into it's model
//  */
// Visualisation.Widgets.SingleValueDisplayDesigner.prototype.loadAndBind = function()
// {
//     var self = this;
// };

// /**
//  * Called by the widget/portal editor framework to get the configuration model
//  */
// Visualisation.Widgets.SingleValueDisplayDesigner.prototype.getModel = function()
// {
//     var self = this;
//     return {
//         fieldPath: this.model.fieldPath()
//     };
// };

