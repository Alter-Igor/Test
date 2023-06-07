var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export function searchForUser(search) {
    return __awaiter(this, void 0, void 0, function* () {
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
        let api = "api/ods/_search";
        let result = yield $ajax.post(/* webpackIgnore: true */ window.document.location.origin + api, postBody);
        return result.rows.map(r => JSON.parse(r.result));
    });
}
export function searchForClient(search) {
    return __awaiter(this, void 0, void 0, function* () {
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
        let api = "api/ods/_search";
        let result = yield $ajax.post(/* webpackIgnore: true */ window.document.location.origin + api, postBody);
        return result.rows.map(r => JSON.parse(r.result));
    });
}
export function getAllOdsPickerForRole(blade, role) {
    let retValue = new Array();
    if (!blade)
        return retValue;
    let allOdsAspects = getOdsWidgets(blade);
    if (!allOdsAspects)
        return retValue;
    let aspectWithPartner = allOdsAspects.filter(a => a.widget.odsEntities().find((o) => o.roleName === role));
    if (!aspectWithPartner)
        return retValue;
    for (let aspect of aspectWithPartner) {
        let odsPartner = aspect.widget.odsEntities().find((o) => o.roleName === role);
        if (!odsPartner)
            continue;
        retValue.push(odsPartner);
    }
    return retValue;
}
export function getOdsWidgets(blade) {
    if (!blade)
        return undefined;
    let retValue = blade.aspects().filter(a => a.widget.odsEntities != undefined);
    return retValue;
}
//# sourceMappingURL=OdsHelper.js.map