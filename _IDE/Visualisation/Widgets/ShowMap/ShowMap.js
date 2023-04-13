namespace("Visualisation.Widgets");

/**
 * Constructor for your widget - remember the name of this JS type must match the ID of the widget in it's .widget.json manifest
 * @param {} element            The Html DOM element to which this widget will bind
 * @param {} configuration      The configuration passed in from the designer/config
 * @param {} baseModel          The base widget model (contains unique id etc)
 * @returns {} 
 */
Visualisation.Widgets.ShowMap = function (element, configuration, baseModel) {
    var self = this;
    self.buildModel();
    self.buildSubscriptions();
 
    var defaults =
    { 
        // id can be passed as a param during widget creation, or will default to the current sharedo Id if not set
        id: null,

        // Model items from the designer widget
        showMap: null,
        map: {
            fallbackCenter: { lat: 53.47926085418265, lng: -2.2412109375 }, // Manchester
            zoom: 9,
            height: "200px",
            initialLat: 53.476698,
            initialLng: -2.236038,
            initialZoom: 7,
            mapHeight: "200px",
            mapType: "roadmap",
            disableMapControls: true,
            useGoogleGeocoder: false,
            disableDefaultUI: true
        }
 
    };
    var options = $.extend(true, {}, defaults, configuration);
    self.map = {};
    self.mapLoaded = ko.observable(false);
    self.mapElementContainer = $(".map-container", self.element)[0];
    self.mapElementContainer.id = element.id;

    // Default the ID from the current sharedo portal if not passed in
    if (!options.id && $ui && $ui.pageContext && $ui.pageContext.sharedoId) {
        options.id = $ui.pageContext.sharedoId();
    }

    // Setup the local model
    self.model =
    {
        // Remember, only things that might change need to be observable!
        showMap: options.showMap,
        id: options.id,
        location: ko.observable(),
        address:ko.observable(),
        map: options.map

    };

    self.mapLoaded.subscribe(function (val) {
        if (val === false) return;
        // if(self.model.showMap() === false) return;
        self.map = new Sharedo.UI.Framework.Components.Map.Container(self.model.map, self.mapElementContainer);
        new Sharedo.UI.Framework.Components.Map({container: self.map});
        // Added a small timeout here as even though the map-ready event fires, it appears that the canvas isn't fully rendered for a very short period afterwards...
        // This causes issues when subscribers attempt to add a marker point to the map whose canvas is not ready.
        setTimeout(function () {
            $ui.events.broadcast("Visualisation.Widgets.ShowMap");
         
        }, 500);
    });

};

Visualisation.Widgets.ShowMap.prototype.buildModel = function (element) {
    var self = this;

    self.subscriptions = [];
    self.sharedoId = ko.observable();

    self.loadedAddresses = [];
    self.loadedCoordinates = [];

    self.element = element;
    self.mapCanvas = null;
    self.markers = ko.observableArray();
};

Visualisation.Widgets.ShowMap.prototype.buildSubscriptions = function () {
    var self = this;
    self.subscriptions.push($ui.events.subscribe("sharedo.ui.framework.components.map-ready", self.mapReady, self));
}

Visualisation.Widgets.ShowMap.prototype.mapReady = function (data) {
    var self = this;
    if (self.element.id === data.elementId) {
        self.mapCanvas = data.map;

    var marker = new google.maps.Marker({
        position: {
            lat: self.model.location().coords.lat,
            lng: self.model.location().coords.lng    
        },
        map: self.mapCanvas,
        draggable: false,
        animation: google.maps.Animation.DROP,
        title: self.model.location
    });
    }
    self.mapCanvas.setZoom(16);
    window.test=self;
    
};

/**
 * Called by the UI framework when this widget is being unloaded - clean up
 * any subscriptions or references here that would keep this instance alive
 */
Visualisation.Widgets.ShowMap.prototype.onDestroy = function () {
    var self = this; d
};

/**
 * Called by the UI framework after initial creation and binding to load data
 * into it's model
 */
Visualisation.Widgets.ShowMap.prototype.loadAndBind = function () {
    var self = this;
    Visualisation.Widgets.ShowMapAgent.loadWorkItem(self.model.id).then(function (location) {

        // location = { address:"", coords:  { lat: -34.397, lng: 150.644 } };

        console.log("location", location)
        self.model.location(location);
        self.model.address(location.address);

        self.model.map.center = location.coords;
        self.mapLoaded(true);


        

    });


};