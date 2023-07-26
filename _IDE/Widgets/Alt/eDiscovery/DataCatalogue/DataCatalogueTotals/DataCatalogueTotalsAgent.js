namespace("Widgets.Alt.eDiscovery.DataCatalogue");

/**
 * Agent for accessing the APIs to obtain data for this widget
 */
Widgets.Alt.eDiscovery.DataCatalogue.DataCatalogueTotalsAgent = function()
{
    /**
     * Example of using findByQuery API to load work item
     * by it's ID, and enrich with specific parameters
     */
    var loadWorkItem = function(id)
    {
        var promise = $.Deferred();

        var request = {
            "search": {
              "workItemIds": [
                id
              ]
            },
            "enrich": [
                  
              {
                "path": "title"
              },
              {
                "path": "reference"
              },
              {
                "path": "roles.client.ods.name"
              },
              {
                  "path":"descendants!q?path=task-ediscovery-project-job-data-catalogue-item&closed=true",
                  "includeFields": [
                      {
                          "path": "form-alt-ediscovery-data-catalogue-actuals.actual-collection-file-count"
                      },
                      {
                          "path": "form-alt-ediscovery-data-catalogue-actuals.actual-collection-size"
                      },
                      {
                          "path": "Title"
                      },
                       {
                          "path": "phase.name"
                      }
                  ]
              }
            ]
            
          };

        $ajax.post("/api/v1/public/workItem/findByQuery", request).then(function(data)
        {
            if (!data || data.totalCount < 1 || data.results.length < 1)
            {
                promise.reject("Not found");
            }
            else
            {
                promise.resolve(
                    {
                        data: data.results[0].data["descendants!q?path=task-ediscovery-project-job-data-catalogue-item&closed=true"] || data.results[0].data["roles.primary-owner.ods.name"] 
                    });
            }
        });

        return promise;
    }

    /**
     * Example of using an external API to get additional data not held in sharedo.
     * Note - this is using https://dummyapi.io - you'll need to sign up (it's free)
     * and get an app id for this call to work - set the app id below;
     */
    var getExternalData = function()
    {
        var appId = "[[YOUR-APP-ID]]";

        // Return the jQuery AJAX promise directly as we're not going to mutate the data here
        return $.ajax(
            {
                url: "https://dummyapi.io/data/api/user?limit=3",
                headers: { "app-id": appId }
            }
        );
    }
    
    return {
        loadWorkItem: loadWorkItem,
        getExternalData: getExternalData
    };
}();