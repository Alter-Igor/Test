namespace("Widgets.Alt.eDiscovery.DataCatalogue");

/**
 * Constructor for your widget - remember the name of this JS type must match the ID of the widget in it's .widget.json manifest
 * @param {} element            The Html DOM element to which this widget will bind
 * @param {} configuration      The configuration passed in from the designer/config
 * @param {} baseModel          The base widget model (contains unique id etc)
 * @returns {} 
 */
Widgets.Alt.eDiscovery.DataCatalogue.DataCatalogueTotals = function(element, configuration, baseModel)
{
    var self = this;
    var defaults =
    {
        // id can be passed as a param during widget creation, or will default to the current sharedo Id if not set
        id: null
       
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
        id: options.id,
        items: ko.observableArray(),
        totalFiles: ko.observable(),
        totalSize: ko.observable(),
    };

    self.model.items.subscribe((items)=>{

        let totalFiles = 0;
        let totalSize = 0;
        //loop though items
        items.data.forEach((item)=>{
            let fileCount =Number(item["form-alt-ediscovery-data-catalogue-actuals.actual-collection-file-count"]);
            let fileSize = Number(item["form-alt-ediscovery-data-catalogue-actuals.actual-collection-size"]);
           
            totalFiles += fileCount;
            totalSize += fileSize;
            
            self.model.totalFiles(totalFiles);
            self.model.totalSize(totalSize);
        });
    });
};

/**
 * Called by the UI framework when this widget is being unloaded - clean up
 * any subscriptions or references here that would keep this instance alive
 */
Widgets.Alt.eDiscovery.DataCatalogue.DataCatalogueTotals.prototype.onDestroy = function()
{
    var self = this;
};

/**
 * Called by the UI framework after initial creation and binding to load data
 * into it's model
 */
Widgets.Alt.eDiscovery.DataCatalogue.DataCatalogueTotals.prototype.loadAndBind = function()
{
    var self = this;

    Widgets.Alt.eDiscovery.DataCatalogue.DataCatalogueTotalsAgent.loadWorkItem(self.model.id).then(function(data)
    {

        console.log(data);
        self.model.items(data);
        
    });

    Widgets.Alt.eDiscovery.DataCatalogue.DataCatalogueTotalsAgent.getExternalData().then(function(response)
    {
        self.model.knownAssociates(_.map(response.data, function(person)
        {
            return {
                name: person.firstName + " " + person.lastName,
                email: person.email,
                picture: person.picture
            };
        }));
    });
};