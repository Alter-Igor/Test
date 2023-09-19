/**
 * This file contains helper functions for working with the ODS API
 * _search is a wrapper around the ODS search endpoint
 */

import { IAspect } from "../../Interfaces/Aspect/IAspect";
import { IODSOrganisationResult } from "../../Interfaces/OdsList/IODSOrganisationResult";
import { IODSPersonResult } from "../../Interfaces/OdsList/IODSPeopleSearchResult";
import { IODSearchResult } from "../../Interfaces/OdsList/IODSSearchResult";
import { TShareDoBlade } from "../../Interfaces/SharedoAspectModels";
import { IRoleConfigModels } from "../../Interfaces/WidgetsOdsEntityPicker/IRoleConfigModels";
import { IOdsWidgetODSEntities, IOdsWidget } from "../../Interfaces/WidgetsOdsEntityPicker/IWidgetOdsEntityPicker";
import { _search } from "./api/ods/search";


/**
 * Uses the "/api/ods/_search" endpoint to search for users.
 * @param search The search string to use such as surname or email address
 * @returns 
 */
export async function searchForUsers(search: string) : Promise<IODSPersonResult[]>
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
    return searchOdsAndReturnRows<IODSPersonResult>(search,postBody);
}

/**
 * Uses the "/api/ods/_search" endpoint to search for clients.
 * @param search The search string to use such as client code or name
 * @returns A list of clients
 */
export async function searchForClients(search: string): Promise<IODSOrganisationResult[]> {

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
        return searchOdsAndReturnRows<IODSOrganisationResult>(search,postBody);
}


// Region: Get all role config for role
// This is a helper function to get all the role config for a given role
// It is used in the "getRoleConfigForRole" function below
// the interface is used to return the results of the function

/**
 * This interface is used to return the results of the function
 * @property roleConfig - the role config for the given role
 * @property ODSEntities - the ODS entities for the given role
 * Both are returned as both are needed when updating the widget
 */
export interface IGetAllRoleConfigForRole {
    roleConfig: IRoleConfigModels[],
    ODSEntities: IOdsWidgetODSEntities[]
}

/**
 * This function returns all the role config for a given role
 * @param blade 
 * @param role 
 * @returns 
 */
export function getAllRoleConfigForRole(blade: TShareDoBlade | undefined, role: string): IGetAllRoleConfigForRole {
    let retValue: IGetAllRoleConfigForRole =
    {
        roleConfig: [],
        ODSEntities: []
    };
    if (!blade) return retValue;

    let allOdsAspects = getOdsWidgets(blade);

    // p.options.roleConfigModels.forEach((r:any) => {
    allOdsAspects?.forEach(a => {

        a.widget.odsEntities().forEach(ods => {
            if (!ods.roleSystemName) {
                return;
            }

            if (ods.roleSystemName() === role) {
                retValue.ODSEntities.push(ods);
            }
        })

        a.widget.options.roleConfigModels.forEach(r => {
            if (r.roleSystemName === role) {
                retValue.roleConfig.push(r);
            }
        })

    })

    // if(!allOdsAspects) return retValue;
    // let aspectWithPartner = allOdsAspects.filter(a=>a.widget.odsEntities().find((o:any)=>o.roleName===role));
    // if(!aspectWithPartner) return retValue;

    // for(let aspect of aspectWithPartner)
    // {
    //     let odsPartner = aspect.widget.odsEntities().find((o:any)=>o.roleName===role);
    //     if(!odsPartner) continue;
    //     retValue.push(odsPartner);
    // }
    return retValue;
}

/**
 * This function returns all the role config for a given role
 * @param blade
 * @param role
 * @returns
**/
export function getOdsWidgets(blade: TShareDoBlade): IAspect<IOdsWidget>[] | undefined {
    if (!blade) return undefined;

    let typeToCheck = Sharedo.Core.Case.Aspects.Widgets.OdsEntityPicker;

    let retValue = blade.aspects().filter(a => a.widget instanceof typeToCheck);
    return retValue;

}

// #region Get all role config for role
// #region private functions
/**
 * Uses the "/api/ods/_search" endpoint to search for clients.
 * @param search The search string to use such as client code or name
 * @returns A list of clients
 */
async function searchOdsAndReturnRows<T>(search: string,postBody:any): Promise<T[]> {
    let APIResult = await _search<T>(postBody);
    //log color
    console.log("%c ODS Search Result", "color: #ff0000", APIResult);
    if(!APIResult) 
    {
        console.log("%c ODS Search Result - undefined", "color: #ff0000");
        return [];  
    }
    console.log("%c ODS Search Result", "color: #ff0000", APIResult);
    return extractRowsFromODSSearchResults<T>(APIResult);
  
}

function extractRowsFromODSSearchResults<T>( APIResult: IODSearchResult<T>) : T[]
 {
    try
    {
        let retValue = APIResult.rows.map(r => JSON.parse(r.result));
        return retValue;
    }
    catch(e)
    {
        console.warn("ODS Helper Error trying to extract rows from search result", e,APIResult);
    }
    return [];
}



// #endregion private functions