// TODO: Use SSVE to build your code generation model
// TODO: Below will create a basic work item - add your custom config etc to the payload etc.


let title = sharedo.buildString("$model.Configuration.title");
let parentWorkItemVariable = "$model.Configuration.parentWorkItemIdVariable";
let parentWorkTypeId = ctx[parentWorkItemVariable];

let variableMappings = [];
let collectionMappings = [
  {
    "variableSystemName": "currentDocumentId",
    "composerPath": "workitem.documents",
    "propertyPath": "id"
  },
  {
    "variableSystemName": "currentTitle",
    "composerPath": "workitem.documents",
    "propertyPath": "title"
  },
  {
    "variableSystemName": "currentShareDoId",
    "composerPath": "workitem.documents",
    "propertyPath": "filedInSharedoId"
  },
  {
    "variableSystemName": "currentRepositoryId",
    "composerPath": "workitem.documents",
    "propertyPath": "repositoryId"
  },
  {
    "variableSystemName": "repositoryContextJson",
    "composerPath": "workitem.documents",
    "propertyPath": "repositoryContextJson"
  }
];

let model =
{
  entityType: "task-activity-prepare-document",
  fields: [],
  allowParallelExecution: true,
  responseType: "flat",
  entityId: parentWorkTypeId
}

variableMappings.forEach(function (m) {
  model.fields.push({ path: m.composerPath });
});

collectionMappings.forEach(function (m) {
  model.fields.push({ path: m.composerPath, includeFields: [{ path: m.propertyPath }] });
});

let httpResult = sharedo.http.post("/api/executionengine/graph/sharedo/query", model);
if (!httpResult.success)
  throw "Failed to load data from graph API - API returned '" + httpResult.status + "'";

let result = httpResult.body;

//loop through the documents and find the one with the title we want to delete
//then unlink and delete it
result.data["workitem.documents"].forEach(function (d) {
  //find there d.title contains the string title
  if (d.title.includes(title)) { 
    log.Information("Found document with title: " + d.title);
    log.Information("JSON of document info: " + JSON.stringify(d))
    //https://hsf-vnext.sharedo.co.uk/api/sharedo/43c7b466-2cd1-40fd-b865-afe700648041/relatedDocuments/batch-delete


    let repositoryContextJson = JSON.parse(d.repositoryContextJson);
    let repositoryId = repositoryContextJson.Id;
    //log
    log.Information("repositoryId: " + repositoryId);
    //--------------------- Unlink --------------------
    log.Information("Unlinking document with title: " + d.title);
    let url = `/api/sharedo/${repositoryId}/relatedDocuments/${d.id}`;
    log.Information("unlink url: " + url);
    let httpUnlink = sharedo.http.delete(url);
    
    log.Information("httpUnlink: " + JSON.stringify(httpUnlink))
    
    if (!httpUnlink.success) { throw "Failed to unlink document:" + httpUnlink.status + "'"; }
    log.Information("Document unlinked with title: " + d.title);
    //--------------------- Unlink End --------------------

    //--------------------- Delete --------------------

    //log
    log.Information("Deleting document with title: " + d.title);
    let deletePayload =
    {
      "nodeId": d.documentId,
    }
     url = `/api/sharedo/${repositoryId}/repository/${d.repositoryId}?Id=${d.repositoryId}`;
    log.Information("delete url: " + url);
    let httpDelete = sharedo.http.delete(url, deletePayload);
    if (!httpDelete.success) { throw "Failed to delete document:" + httpDelete.status + "'"; }
    log.Information("Document deleted with title: " + d.title);
    //--------------------- Delete End --------------------
    //exit the loop
    return;
  }
});



