namespace("Visualisation.Widgets");

/**
 * Agent for accessing the APIs to obtain data for this widget
 */
Visualisation.Widgets.SingleValueDisplayAgent = function()
{
    /**
     * Example of using findByQuery API to load work item
     * by it's ID, and enrich with specific parameters
     */
    var loadWorkItem = function(model)
    {
        var promise = $.Deferred();

        var request = {

            // Simple search - get by id
            search:
            {
                workItemIds: [model.id]
            },

            // Enrich with fields from data composer - use data composer
            // screen in modeller to browse around the data graph and find
            // the fields you might need
            enrich:
            [
                { path: model.fieldPath }
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
                let result = "";
                if(data.results[0].data[model.fieldPath]!=null)
                {
                    result=data.results[0].data[model.fieldPath];
                }
              
                promise.resolve(result);
            }
        });

        return promise;
    }

    
    
    return {
        loadWorkItem: loadWorkItem
    };
}();