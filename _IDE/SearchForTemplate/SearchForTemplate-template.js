// TODO: Use SSVE to build your code generation model
// TODO: Below will create a basic work item - add your custom config etc to the payload etc.


// log.Information("JSON.stringify(actions)..");
// let dat = JSON.stringify(actions);
// log.Information("post JSON.stringify(actions)..");
// log.Information("dat:" + dat);

let configuredSearchItemsObj = [];

let searchRequest = [];
// Setup API skeleton
let configuredSearchItems = `$model.Configuration.searchEntries`;
//check if configuredSearchItems is empty
if (configuredSearchItems == null || configuredSearchItems == undefined || configuredSearchItems == "") {
    log.Error("configuredSearchItems is empty");
    throw "Search entries must be configured";
}


//log type of configuredSearchItems
// log.Information("typeof configuredSearchItems:" + typeof configuredSearchItems);
log.Information("configuredSearchItems:" + configuredSearchItems);
configuredSearchItemsObj = JSON.parse(configuredSearchItems);
if (Array.isArray(configuredSearchItemsObj) == false) {
    throw "Search entries must be an array";
}
log.Information("configuredSearchItemsObj.length:" + configuredSearchItemsObj.length);

for (let i = 0; i < configuredSearchItemsObj.length; i++) {
    let item = configuredSearchItemsObj[i];

    let newSearchEntry =
    {
        "fieldId": item.fieldType,
        "filterId": "clv-filter-text",
        "config": "{}",
        "parameters": `{\"text\":\"${sharedo.buildString(item.searchValue)}\"}`
    };
    searchRequest.push(newSearchEntry);
}




// Debug the payload
// log.Information("Search request payload:" + JSON.stringify(searchRequest, null, 4));


//let response = sharedo.http.post("/api/listview/core-admin-document-templates-documents/20/1/title/asc/?view=table&withCounts=1", searchRequest);
//let response = sharedo.http.get("/api/admin/docGen/templates/_lists/minimal");

let filter = {
    "ExcludeInactive": true,
    "IsDocument": true,
    // "TemplateType": "document-issued"
}
let initialResponse = sharedo.http.post("/api/docgen/templates/find", filter);

if (!initialResponse.success) {
    log.Error("Could not search for template");
    log.Error("Status was: " + initialResponse.status);
    throw "Failed to find templates - stopping process";
}
// log.Information("initialResponse.body:" + JSON.stringify(initialResponse.body));
log.Information("initialResponse.body:" + initialResponse.body.length);

let ids = initialResponse.body.map(item => item.id);

let response = sharedo.http.post("/api/docgen/templates/byIds", ids);

// try {
//     log.Information("Response was: " + JSON.stringify(response.body, null, 4));
// }
// catch (e) {
//     // Body wasn't an object
//     log.Information("Response was: " + response.body);
// }

if (!response.success) {
    log.Error("Could not search for template");
    log.Error("Status was: " + response.status);

    throw "Failed to create work item - stopping process";
}

// response.body = [{
//     "dmsFolderName": "",
//     "systemName": "re-confirm-completion-lender",
//     "id": "54999ffa-bd6e-4a79-9d4a-09a904453ffb",
//     "title": "Confirm completion to Lender",
//     "description": "Confirm completion to Lender\r\n",
//     "active": true,
//     "isPinned": false,
//     "categories": [
//         "Correspondence Third Party"
//     ]
// }];

var newId = null;
if (response.body && response.body.length > 0) {

    //filter the response.body to get the template we want where the title includes the work hello
    let filteredResponse = response.body;
    log.Information("filteredResponse.length:" + filteredResponse.length);
    for (let i = 0; i < configuredSearchItemsObj.length; i++) {
        let item = configuredSearchItemsObj[i];
        let field = item.fieldType;
        let value = sharedo.buildString(item.searchValue).toLowerCase();
        log.Information("---- Applying search criteria ---");
        log.Information("- fieldType:" + field);
        log.Information("- searchValue:" + value);
        log.Information("---------------------------------");
        
        filteredResponse = filteredResponse.filter(r => 
            {
                log.Information(`--- checking field [${field}] which has the value of ${field[r]}---- `);
                //check if r[field] is an array
                if (Array.isArray(r[field]) == true) {    
                    log.Information(`-- ${field} is an array - checking each item`);           
                    for (let i = 0; i < r[field].length; i++) {
                        let aritem = r[field][i];
                        log.Information(`--- Array Item [${i}] = ${aritem}`);
                        if (aritem.toLowerCase().includes(value)) {
                            log.Information(`--- ${field}[${i}]: ${r[field]} includes ${value}`);
                            return true;
                        }
                    }
                    return false;
                }               

                if (r[field].toLowerCase().includes(value)) {
                    log.Information(`-- field: ${r[field]} includes ${value}`);
                    return true;
                }            
            });
        log.Information("--- filteredResponse.length:" + filteredResponse.length);
    }

    if (filteredResponse.length > 0) {
        newId = filteredResponse[0].systemName;
    }

}

if (!newId) {
    log.Warning("Could not find template based on the search criteria");
    log.Information("Search criteria was: " + JSON.stringify(configuredSearchItemsObj, null, 4));
}
else {
    log.Information("Successfully search for template: " + newId);

    // $ifNotNull.Configuration.outputVariable
    ctx["$model.Configuration.outputVariable"] = newId;
    // $endif;

}