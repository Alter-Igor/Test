namespace("Visualisation.Widgets");

/**
 * Constructor for your widget - remember the name of this JS type must match the ID of the widget in it's .widget.json manifest
 * @param {} element            The Html DOM element to which this widget will bind
 * @param {} configuration      The configuration passed in from the designer/config
 * @param {} baseModel          The base widget model (contains unique id etc)
 * @returns {} 
 */
Visualisation.Widgets.SingleValueDisplay = function(element, configuration, baseModel)
{
    var self = this;
    var defaults =
    {
        // id can be passed as a param during widget creation, or will default to the current sharedo Id if not set
        id: null,

        // Model items from the designer widget
        fieldPath: null
    };
    var options = $.extend(true, {}, defaults, configuration);

    // Default the ID from the current sharedo portal if not passed in
    if (!options.id && $ui && $ui.pageContext && $ui.pageContext.sharedoId)
    {
        options.id = $ui.pageContext.sharedoId();
    }

    // Setup the local model
    self.model =
    {
        // Remember, only things that might change need to be observable!
        fieldPath: options.fieldPath,
        id: options.id,
        value: ko.observable(),
    };
};

/**
 * Called by the UI framework when this widget is being unloaded - clean up
 * any subscriptions or references here that would keep this instance alive
 */
Visualisation.Widgets.SingleValueDisplay.prototype.onDestroy = function()
{
    var self = this;
};

/**
 * Called by the UI framework after initial creation and binding to load data
 * into it's model
 */
Visualisation.Widgets.SingleValueDisplay.prototype.loadAndBind = function()
{
    var self = this;

    Visualisation.Widgets.SingleValueDisplayAgent.loadWorkItem(self.model).then(function(data)
    {
        self.model.value(data);
    });

   
};