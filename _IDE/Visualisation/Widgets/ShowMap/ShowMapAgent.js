namespace("Visualisation.Widgets");

/**
 * Agent for accessing the APIs to obtain data for this widget
 */
Visualisation.Widgets.ShowMapAgent = function () {
    /**
     * Example of using findByQuery API to load work item
     * by it's ID, and enrich with specific parameters
     */

    var geoCoder = function (address, callback) {

        new google.maps.Geocoder().geocode({ address: address, region: "uk" }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log("Geocode successful, result:");
                console.log();

                callback(results[0].geometry);
                // $ui.events.broadcast("sharedo.ui.framework.components.address-geocoded", { elementId: self.mapContainer.id, geometry: results[0].geometry });
            } else {
                console.log("Geocode was not successful, reason: " + status);

                return null;
            }
        });
    }


    var initMap = function (address) {


        geoCoder(address, function (location) {

            console.log("back from geo:", location)
            const myLatLng = location;
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 4,
                center: myLatLng,
            });

            new google.maps.Marker({
                position: myLatLng,
                map,
                title: "Hello World!",
            });
        })
    }




    var loadWorkItem = function (id) {
        var promise = $.Deferred();

        var request = {

            // Simple search - get by id
            search:
            {
                workItemIds: [id]
            },

            // Enrich with fields from data composer - use data composer
            // screen in modeller to browse around the data graph and find
            // the fields you might need
            enrich:
                [
                    // Some basic details
                    { path: "propertyDetails.properties.location.formatted" },
                    { path: "propertyDetails.properties.location.coords.lat" },
                     { path: "propertyDetails.properties.location.coords.long" }
                   
                ]
        };

console.log("request",request);

        $ajax.post("/api/v1/public/workItem/findByQuery", request).then(function (data) {
            console.log("data",data);
            
            
            if (!data || data.totalCount < 1 || data.results.length < 1) {
                promise.reject("Not found");
            }
            else {
                let coords = { lat: -34.397, lng: 150.644 };
                let payload = { address:"", coords: coords };

                let properties = data.results[0].data["propertyDetails.properties"];
                if(properties)
                {
                    if(properties[0])
                    {
                        payload.coords.lat = properties[0]["propertyDetails.properties.location.coords.lat"]
                        payload.coords.lng  = properties[0]["propertyDetails.properties.location.coords.long"];
                        payload.address= properties[0]["propertyDetails.properties.location.formatted"];
                    }
                }
                
                
                promise.resolve(payload);
            }
        });

        return promise;
    }



    return {
        loadWorkItem: loadWorkItem,
        initMap: initMap,
        geoCoder: geoCoder
    };
}();