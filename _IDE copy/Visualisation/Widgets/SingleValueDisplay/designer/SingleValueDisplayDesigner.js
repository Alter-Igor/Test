namespace("Visualisation.Widgets");

/**
 * Constructor for your widget
 * @param {} element            The Html DOM element to which this widget will bind
 * @param {} configuration      The configuration passed in from the designer/config
 * @param {} baseModel          The base widget model (contains unique id etc)
 * @returns {} 
 */
Visualisation.Widgets.SingleValueDisplayDesigner = function(element, configuration, baseModel)
{
    var self = this;
    var defaults =
    {
        // These configurations are passed from the host of this designer widget
        blade: null,                        // The blade hosting the widget
        __scope:
        {
            mode: null,                     // Will be globalPortal or sharedoType
            sharedoTypeSystemName: null     // If mode===sharedoType, contains the type being edited
        },
        // Your designer model is also passed in
        fieldPath: null
    };
    var options = $.extend(true, {}, defaults, configuration);

    // Create the model
    self.model =
    {
        fieldPath: ko.observable(options.fieldPath)
    };

    // Create the model validators
    self.validation =
    {
        fieldPath: ko.pureComputed(function()
        {
            var message = self.model.fieldPath();
            if (!message) return "The fieldPath is required";
            return null;
        })
    };

    // Expose a validationErrorCount observable to tell the host designer blade
    // whether save is currently possible or not. Return 0 to indicate all is valid,
    // or if not, the count of errors. If no validation required, this can be removed.
    self.validationErrorCount = ko.pureComputed(function()
    {
        var fails = 0;
        if (self.validation.fieldPath()) fails++;
        return fails;
    });
};

/**
 * Called by the UI framework when this widget is being unloaded - clean up
 * any subscriptions or references here that would keep this instance alive
 */
Visualisation.Widgets.SingleValueDisplayDesigner.prototype.onDestroy = function()
{
    var self = this;
};

/**
 * Called by the UI framework after initial creation and binding to load data
 * into it's model
 */
Visualisation.Widgets.SingleValueDisplayDesigner.prototype.loadAndBind = function()
{
    var self = this;
};

/**
 * Called by the widget/portal editor framework to get the configuration model
 */
Visualisation.Widgets.SingleValueDisplayDesigner.prototype.getModel = function()
{
    var self = this;
    return {
        fieldPath: self.model.fieldPath()
    };
};

