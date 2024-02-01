
interface IEmailAttachments {
  relatedDocument: IRelatedDocument
  link: string

} 
      
  
function getEmailAttachments(): Array<IEmailAttachments> {
  logHeading("getEmailAttachments");
  let retValue = new Array<IEmailAttachments>();

  let outboundEmailWorkTypeId = ctx["outboundEmailWorkTypeId"];

 // outboundEmailWorkTypeId = "0986b02d-8d16-4995-b514-b042006c2d0d"; //for testing

  var relatedDocumentsResult = sharedo.http.get("/api/sharedo/".concat(outboundEmailWorkTypeId, "/relatedDocuments"));

  logHeading("relatedDocumentsResult");
  log.Information(JSON.stringify(relatedDocumentsResult));

  if (!relatedDocumentsResult.success) {
    log.Error("failed to get related documents");
    log.Information("result: " + JSON.stringify(relatedDocumentsResult));
    return retValue;
  }


  logHeading("relatedDocumentsResult.body");
  log.Information(JSON.stringify(relatedDocumentsResult.body));

  let relatedDocument: IRelatedDocument[] = relatedDocumentsResult.body;

  if (relatedDocument.length === 0) {
    log.Information("No related document found");
    return retValue;
  }

//call api


  //Loop through the related documents and remove them from the work item
  for (let i = 0; i < relatedDocument.length; i++) {
    let relatedDoc = relatedDocument[i];
    logHeading("relatedDoc");
    log.Information(JSON.stringify(relatedDoc));

   //https://demo-aus.sharedo.tech/api/sharedo/9723e792-4948-460d-9ecf-b013006589c9/relatedDocuments/batch-delete


   //get related document file url
   let fileUrlResponse = sharedo.http.get("/api/relatedDocument/".concat(relatedDoc.id));

   if(!fileUrlResponse.success) {
    logHeading("/api/relatedDocument/ -  Failed");
      log.Error("failed to get file url for related document: " + relatedDoc.id);
      log.Information("result: " + JSON.stringify(fileUrlResponse));
      //continue;
      fileUrlResponse.body =
      {
        "redirectTo": "https://slicedbreaduk.sharepoint.com/sites/sharedo…ic%20Info.docx&action=default&mobileredirect=true"
      }
    }

    

    let fileUrl = fileUrlResponse.body.redirectTo;

   let payload = JSON.stringify([relatedDoc.id]);
    sharedo.http.delete("/api/sharedo/".concat(outboundEmailWorkTypeId, "/relatedDocuments/batch-delete", payload));

    let emailAttachment: IEmailAttachments = {
      relatedDocument: relatedDoc,
      link: fileUrl
    }

    retValue.push(emailAttachment);
    
  }

  return retValue;
}
 


let emailAttachments = getEmailAttachments();

for(let i = 0; i < emailAttachments.length; i++) {
  let emailAttachment = emailAttachments[i];
  log.Information("emailAttachment: " + JSON.stringify(emailAttachment));

  let fileTitle = emailAttachment.relatedDocument.title;
  let fileUrl = emailAttachment.link;

  log.Information("fileTitle: " + fileTitle);
  log.Information("fileUrl: " + fileUrl);

  //add file title and link to email body
  let emailBody = ctx["emailBody"];
  emailBody = emailBody + "<br/><br/>" + fileTitle + "<br/>" + fileUrl;
  ctx["emailBody"] = emailBody;


}

function logHeading(heading:string) {
  log.Information("-------------------------------------");
  log.Information(heading);
  log.Information("-------------------------------------");
}
