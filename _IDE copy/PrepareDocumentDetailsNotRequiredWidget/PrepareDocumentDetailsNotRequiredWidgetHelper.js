
async function deleteRelatedDocument(title, parentWorkTypeId) {

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

let result = await $ajax.post("/api/executionengine/graph/sharedo/query", model);

//loop through the documents and find the one with the title we want to delete
//then unlink and delete it
result.data["workitem.documents"].forEach(async function (d) {
  //find there d.title contains the string title
  if (d.title.includes(title)) { 
    console.log("Found document with title: " + d.title);
    console.log("JSON of document info: " + JSON.stringify(d))
    //https://hsf-vnext.sharedo.co.uk/api/sharedo/43c7b466-2cd1-40fd-b865-afe700648041/relatedDocuments/batch-delete


    let repositoryContextJson = JSON.parse(d.repositoryContextJson);
    let repositoryId = repositoryContextJson.Id;
    //log
    console.log("repositoryId: " + repositoryId);
    //--------------------- Unlink --------------------
    console.log("Unlinking document with title: " + d.title);
    let url = `/api/sharedo/${repositoryId}/relatedDocuments/${d.id}`;
    console.log("unlink url: " + url);
    let httpUnlink = await $ajax.delete(url);
    console.log("httpUnlink: " + JSON.stringify(httpUnlink))
    console.log("Document unlinked with title: " + d.title);
    //--------------------- Unlink End --------------------

    //--------------------- Delete --------------------

    //log
    console.log("Deleting document with title: " + d.title);
    let deletePayload =
    {
      "nodeId": d.documentId,
    }
     url = `/api/sharedo/${repositoryId}/repository/${d.repositoryId}?Id=${d.repositoryId}`;
    console.log("delete url: " + url);
    let httpDelete = await $ajax.delete(url, deletePayload);
    console.log("Document deleted with title: " + d.title);
    //--------------------- Delete End --------------------
    //exit the loop
    $ui.events.broadcast("sharedo.core.case.components.related-documents.data-changed", { id: parentWorkTypeId });
    return;
  }
});


                

}