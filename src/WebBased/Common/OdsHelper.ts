import { IAspect, IOdsWidget, IOdsWidgetODSEntities } from "../../Typings/FormBuilder/IFormBuilderContext";
import { ICoreAdminOdsPeople } from "../../Typings/OdsList/ICore-admin-ods-people";
import { IODSOrganisationResult } from "../../Typings/OdsList/IODSOrganisationResult";
import { IODSPersonResult } from "../../Typings/OdsList/IODSPeopleSearchResult";
import {  IODSearchResult } from "../../Typings/OdsList/IODSSearchResult";
import { TShareDoBlade } from "../../Typings/ShareDoJS/AddEditSharedo";


// /**
//  * 
//  * @param surname Surname to help filter results
//  * @param email The person with this email address
//  */
// export async function findUserByEmail(surname:string,email : string)
// {
//     //https://hsf-vnext.sharedo.co.uk/api/listview/core-admin-users-all/25/1/username/asc/?view=table&withCounts=1

//     let api = "/api/listview/core-admin-ods-people/40/1/surname/asc/?view=table&withCounts=0";

//     let postBody = [
//         {
//             "fieldId": "surname",
//             "filterId": "clv-filter-text",
//             "config": "{}",
//             "parameters": `{"text":"${surname}"}`
//         }
//     ];

//     let result = await $ajax.post(/* webpackIgnore: true */ window.document.location.origin + api,postBody) as ICoreAdminOdsPeople;

//     if(!result) return undefined;
//     if(!result.rows) return undefined;
//     return result.rows.find(r=> r.data.primaryEmail === email);

// }


export async function searchForUser(search :string)
{
    let postBody = {
        "startPage": 1,
        "endPage": 1,
        "rowsPerPage": 10,
        "searchString": search,
        "odsEntityTypes": [],
        "availability": {
            "isAvailable": null,
            "isOutOfOffice": null,
            "isNotAvailable": null
        },
        "location": {
            "postcode": null,
            "range": 10
        },
        "connection": {
            "systemName": null
        },
        "competencies": [],
        "teams": [],
        "roles": [],
        "odsTypes": [
            "acl",
            "alt-ediscovery-user-type",
            "client",
            "department",
            "document-training-type",
            "employee",
            "expert",
            "external-team",
            "external",
            "pod",
            "structural",
            "system-administrator"
        ],
        "wallManagement": false
    };

    let api = "/api/ods/_search";
    let result = await $ajax.post(/* webpackIgnore: true */ window.document.location.origin + api,postBody) as IODSearchResult;

    return result.rows.map(r=>JSON.parse(r.result) as IODSPersonResult);

    

}


export async function searchForClient(search :string)
{
    let postBody = {
        "startPage": 1,
        "endPage": 1,
        "rowsPerPage": 10,
        "searchString": search,
        "odsEntityTypes": [],
        "availability": {
            "isAvailable": null,
            "isOutOfOffice": null,
            "isNotAvailable": null
        },
        "location": {
            "postcode": null,
            "range": 10
        },
        "connection": {
            "systemName": null
        },
        "competencies": [],
        "teams": [],
        "roles": [],
        "odsTypes": [
            "client"
        ],
        "wallManagement": false
    };

    let api = "/api/ods/_search";
    let result = await $ajax.post(/* webpackIgnore: true */ window.document.location.origin + api,postBody) as IODSearchResult;


    return result.rows.map(r=>JSON.parse(r.result) as IODSOrganisationResult);

    

}

export function getAllOdsPickerForRole(blade: TShareDoBlade | undefined, role: string) : IOdsWidgetODSEntities[] 
{
    let retValue = new Array<IOdsWidgetODSEntities>();
    if(!blade) return retValue;

    let allOdsAspects = getOdsWidgets(blade);
    if(!allOdsAspects) return retValue;
    let aspectWithPartner = allOdsAspects.filter(a=>a.widget.odsEntities().find((o:any)=>o.roleName===role));
    if(!aspectWithPartner) return retValue;

    for(let aspect of aspectWithPartner)
    {
        let odsPartner = aspect.widget.odsEntities().find((o:any)=>o.roleName===role);
        if(!odsPartner) continue;
        retValue.push(odsPartner);
    }

    
    return retValue;
}

export function getOdsWidgets(blade: TShareDoBlade) : IAspect<IOdsWidget>[] | undefined
{
    if(!blade) return undefined;

    let retValue = blade.aspects().filter(a=> a.widget.odsEntities!=undefined);
    return retValue;
    
}