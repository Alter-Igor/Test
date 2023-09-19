import { executeFindByQuery } from "./executeFindByQuery/FindByQuery";

export interface searchResult 
{
    found:boolean, 
    value:string | undefined, 
    parentId:string | undefined
    depth:number,
    foundInWorkItemId:string | undefined,
    wasFoundInAncestor:boolean,
    foundInWorkTypeSystemName:string | undefined
}

export async function searchForAttributeRecursive(workItemId: string, attributeName: string, parents: boolean, maxDepth?: number | undefined)
 {
    let useMaxDepth : boolean = maxDepth ? true : false;
    if(maxDepth && maxDepth > 0){
        useMaxDepth = true;
    }


    let retValue:searchResult = {found:false, value:undefined, parentId:undefined, depth:0, foundInWorkItemId:undefined, wasFoundInAncestor:false, foundInWorkTypeSystemName:undefined};

    retValue = await searchForAttribute(workItemId, attributeName);

    if(retValue.found){
        return retValue;
    }

    if(!parents ){
        console.log("No parents or children to search so only searching current work item");
        return retValue
    }

    if(parents){
        console.log("Searching parents");
        let depth = 0;
        let searchParent = async (parentId: string | undefined) =>
        {
            depth++;
            let r: searchResult = {found:false,
                 value:undefined, 
                 parentId:undefined, depth:depth, //depth here will be overriden if there is a parent
                 foundInWorkItemId:undefined, 
                 wasFoundInAncestor:false,
                    foundInWorkTypeSystemName:undefined
                };
            if(!parentId){
                console.log("No parent found");
                return r;
            }

             r = await searchForAttribute(parentId, attributeName);
             r.depth = depth; //update depth as it will be 0
             
            if(r.found){
                console.log("Found attribute in parent");
                r.wasFoundInAncestor = true;
                return r;
            }
            else{

                if(useMaxDepth && depth >= maxDepth!){
                    console.log("Max depth reached");
                    return r;
                }
                

                if(!r.parentId){
                    console.log("No parent found");
                    return r;
                }
                console.log("Not found in parent");
                return searchParent(r.parentId);
            }
        }

        retValue = await searchParent(retValue.parentId);
    }

    return retValue;

}


export async function searchForAttribute(workItemId: string, attributeName: string) {
    //get the matter
    let retValue :searchResult = {
        found:false, value:undefined,
         parentId:undefined, depth:0,
          foundInWorkItemId:undefined,
           wasFoundInAncestor:false,
           foundInWorkTypeSystemName:undefined};
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
    console.log("Searching using ShareDo Id: " + workItemId);
    let httpResultFindByQuery = await executeFindByQuery<any>(req);
    console.log(`Work item ${workItemId} found`);
    console.log(JSON.stringify(httpResultFindByQuery.results));


    let typeSystemName = httpResultFindByQuery.results[0].data["type.systemName"];
    let parentId =       httpResultFindByQuery.results[0].data["parent.id"];
    let attribute =      httpResultFindByQuery.results[0].data[attributeName] as string | undefined;
    
    console.log(`Type system name is ${typeSystemName}`);
    console.log(`Parent Id is ${parentId}`);
    console.log(`Attribute [${attributeName}] is ${attribute}`);

    retValue.value = attribute;
    if(attribute){
        retValue.found = true;
        retValue.foundInWorkItemId = workItemId;
        retValue.foundInWorkTypeSystemName = typeSystemName;
    }
    retValue.parentId = parentId;

    return retValue;
    
}