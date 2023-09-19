import { HttpResultType, IMatterSearchResult } from "./IConfiguration";


export interface searchResult 
{found:boolean, value:string | undefined, parentId:string | undefined}

export function searchForAttributeRecursive(workItemId: string, attributeName: string, parents: boolean, children: boolean): searchResult {

    let retValue:searchResult = {found:false, value:undefined, parentId:undefined};

    retValue = searchForAttribute(workItemId, attributeName);

    if(retValue.found){
        return retValue;
    }

    if(!parents && !children){
        log.Information("No parents or children to search so only searching current work item");
        return retValue
    }

    if(parents){
        log.Information("Searching parents");
        
        let searchParent = (parentId: string | undefined) =>
        {
            let r: searchResult = {found:false, value:undefined, parentId:undefined};
            if(!parentId){
                log.Information("No parent found");
                return r;
            }

             r = searchForAttribute(parentId, attributeName);
            if(r.found){
                log.Information("Found attribute in parent");
                return r;
            }
            else{
                if(!r.parentId){
                    log.Information("No parent found");
                    return r;
                }
                log.Information("Not found in parent");
                return searchParent(r.parentId);
            }
        }

        retValue = searchParent(retValue.parentId);
    }

    return retValue;

}


export function searchForAttribute(workItemId: string, attributeName: string): searchResult {
    //get the matter
    let retValue :searchResult = {found:false, value:undefined, parentId:undefined};
    let req = {
        "search": {
            "workItemIds": [
                workItemId
            ]
        },
        "enrich": [
            {
                "path": "title"
            },
            {
                "path": "parent.id"
            },
            {
                "path": "type.systemName"
            },
            {
                "path": "reference"
            },
            {
                "path": attributeName
            }
        ]
    }
    log.Information("Searching using ShareDo Id: " + workItemId);
    let httpResultFindByQuery: HttpResultType<IMatterSearchResult> = sharedo.http.post(`/api/v1/public/workItem/findByQuery`, req);


    httpResultFindByQuery.success = true;
    if (!httpResultFindByQuery.success) {
        log.Error("Error");
        log.Information(JSON.stringify(httpResultFindByQuery));
        throw new Error(`Error searching: '${httpResultFindByQuery.status}'`);
    }

    if (!httpResultFindByQuery.body || httpResultFindByQuery.body.totalCount == 0) {
        log.Error("Error");
        log.Information(JSON.stringify(httpResultFindByQuery));
        log.Error(`Work item ${workItemId} not found`);
        throw new Error(`Work item ${workItemId} not found`);
    }

    log.Information(`Work item ${workItemId} found`);
  
    log.Information(JSON.stringify(httpResultFindByQuery.body.results));

    let typeSystemName = httpResultFindByQuery.body.results[0].data["type.systemName"];
    let parentId =       httpResultFindByQuery.body.results[0].data["parent.id"];
    let attribute =      httpResultFindByQuery.body.results[0].data[attributeName] as string | undefined;
    
    log.Information(`Type system name is ${typeSystemName}`);
    log.Information(`Parent Id is ${parentId}`);
    log.Information(`Attribute [${attributeName}] is ${attribute}`);

    retValue.value = attribute;
    if(attribute){
        retValue.found = true;
    }
    retValue.parentId = parentId;

    return retValue;
    
}