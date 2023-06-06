namespace("");

/**
 * Constructor for your widget - remember the name of this JS type must match the ID of the widget in it's .widget.json manifest
 * @param {} element            The Html DOM element to which this widget will bind
 * @param {} configuration      The configuration passed in from the designer/config
 * @param {} baseModel          The base widget model (contains unique id etc)
 * @returns {} 
 */


PrepareDocumentDetailsNotRequiredWidget = function (element, configuration, baseModel) {
    var self = this;

    // var doWork = function (context)  {
    //     console.log("tell the related documents widget to reload");
    //     $ui.events.broadcast("sharedo.core.case.components.related-documents.data-changed", { id: context.context.sharedoId });
    //    // context.blade.reload();
    // }
    

    //check every 2 seconds if the document is ready
    var interval = setInterval(function () {
        if (Sharedo?.Core?.Case?.Aspects?.Widgets?.PrepareDocumentDetails?.prototype?.openDocuments) {
            clearInterval(interval);
            let temp = Sharedo.Core.Case.Aspects.Widgets.PrepareDocumentDetails.prototype.openDocuments;
            Sharedo.Core.Case.Aspects.Widgets.PrepareDocumentDetails.prototype.openDocuments = function () {
                console.log("PrepareDocumentDetailsNotRequiredWidget: openDocuments intercepted");
                let context = this;
                
                let title = this.task.title();
                //if title contains the work NotRequired
                if (title.indexOf("NotRequired") > -1) {
                    //wait 5 seconds and reload the blade
                    //setTimeout(doWork.bind(this,context), 5000);
                    //setInterval(doWork.bind(this,context), 5000);
                    deleteRelatedDocument("NotRequired", context.context.sharedoId());
                    return;
                }
                //first call the original function
                return temp();
            }
        }
    }
        , 2000);


    var defaults =
    {
        // Model items from the designer widget
        todoMessage: null
    };
    var options = $.extend(true, {}, defaults, configuration);

    // Setup the local model
    self.model =
    {
        // Remember, only things that might change need to be observable!
        todoMessage: options.todoMessage
    };
};

/**
 * Called by the UI framework when this widget is being unloaded - clean up
 * any subscriptions or references here that would keep this instance alive
 */
PrepareDocumentDetailsNotRequiredWidget.prototype.onDestroy = function () {
    var self = this;
};

/**
 * Called by the UI framework after initial creation and binding to load data
 * into it's model
 */
PrepareDocumentDetailsNotRequiredWidget.prototype.loadAndBind = function () {
    var self = this;
};
