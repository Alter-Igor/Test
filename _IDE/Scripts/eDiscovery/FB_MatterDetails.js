/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../Common/OdsHelper.ts":
/*!*********************************!*\
  !*** ../../Common/OdsHelper.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAllRoleConfigForRole: () => (/* binding */ getAllRoleConfigForRole),
/* harmony export */   getOdsWidgets: () => (/* binding */ getOdsWidgets),
/* harmony export */   searchForClients: () => (/* binding */ searchForClients),
/* harmony export */   searchForUsers: () => (/* binding */ searchForUsers)
/* harmony export */ });
/* harmony import */ var _api_ods_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/ods/search */ "../../Common/api/ods/search.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * Uses the "/api/ods/_search" endpoint to search for users.
 * @param search The search string to use such as surname or email address
 * @returns
 */
function searchForUsers(search) {
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
        return searchOdsAndReturnRows(search, postBody);
    });
}
/**
 * Uses the "/api/ods/_search" endpoint to search for clients.
 * @param search The search string to use such as client code or name
 * @returns A list of clients
 */
function searchForClients(search) {
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
        return searchOdsAndReturnRows(search, postBody);
    });
}
/**
 * This function returns all the role config for a given role
 * @param blade
 * @param role
 * @returns
 */
function getAllRoleConfigForRole(blade, role) {
    let retValue = {
        roleConfig: [],
        ODSEntities: []
    };
    if (!blade)
        return retValue;
    let allOdsAspects = getOdsWidgets(blade);
    // p.options.roleConfigModels.forEach((r:any) => {
    allOdsAspects === null || allOdsAspects === void 0 ? void 0 : allOdsAspects.forEach(a => {
        a.widget.odsEntities().forEach(ods => {
            if (!ods.roleSystemName) {
                return;
            }
            if (ods.roleSystemName() === role) {
                retValue.ODSEntities.push(ods);
            }
        });
        a.widget.options.roleConfigModels.forEach(r => {
            if (r.roleSystemName === role) {
                retValue.roleConfig.push(r);
            }
        });
    });
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
function getOdsWidgets(blade) {
    if (!blade)
        return undefined;
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
function searchOdsAndReturnRows(search, postBody) {
    return __awaiter(this, void 0, void 0, function* () {
        let APIResult = yield (0,_api_ods_search__WEBPACK_IMPORTED_MODULE_0__._search)(postBody);
        //log color
        console.log("%c ODS Search Result", "color: #ff0000", APIResult);
        if (!APIResult) {
            console.log("%c ODS Search Result - undefined", "color: #ff0000");
            return [];
        }
        console.log("%c ODS Search Result", "color: #ff0000", APIResult);
        return extractRowsFromODSSearchResults(APIResult);
    });
}
function extractRowsFromODSSearchResults(APIResult) {
    try {
        let retValue = APIResult.rows.map(r => JSON.parse(r.result));
        return retValue;
    }
    catch (e) {
        console.warn("ODS Helper Error trying to extract rows from search result", e, APIResult);
    }
    return [];
}
// #endregion private functions


/***/ }),

/***/ "../../Common/api/api.ts":
/*!*******************************!*\
  !*** ../../Common/api/api.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeDelete: () => (/* binding */ executeDelete),
/* harmony export */   executeFetch: () => (/* binding */ executeFetch),
/* harmony export */   executeGet: () => (/* binding */ executeGet),
/* harmony export */   executePost: () => (/* binding */ executePost),
/* harmony export */   executePut: () => (/* binding */ executePut),
/* harmony export */   getBearerToken: () => (/* binding */ getBearerToken),
/* harmony export */   getCookies: () => (/* binding */ getCookies)
/* harmony export */ });
/**
 * This file contains the api calls to the backend.
 * utilising the axios library to make the calls.
 * inclusing of webpackIgnore is to allow the webpack to ignore the calls and not try to bundle them.
 */
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function executePost(api, postBody) {
    return __awaiter(this, void 0, void 0, function* () {
        //return await $ajax.post(/* webpackIgnore: true */ validateApi(api), postBody);
        return executeFetch(api, "POST", postBody);
    });
}
// export async function executeGet<T>(api: string) : Promise<T>{
//     return await $ajax.get(/* webpackIgnore: true */ validateApi(api));
// } 
function executeGet(api) {
    return __awaiter(this, void 0, void 0, function* () {
        return executeFetch(api, "GET", undefined);
    });
}
function executePut(api, postBody) {
    return __awaiter(this, void 0, void 0, function* () {
        //return await $ajax.put(/* webpackIgnore: true */ validateApi(api), postBody);
        return executeFetch(api, "PUT", postBody);
    });
}
function executeDelete(api) {
    return __awaiter(this, void 0, void 0, function* () {
        //return await $ajax.delete(/* webpackIgnore: true */ validateApi(api));
        return executeFetch(api, "DELETE", undefined);
    });
}
function validateApi(api) {
    let location = window.document.location.origin;
    //if api does not include the location then add it.
    if (api.indexOf(location) === -1) {
        //check if api start with a / if not add it.
        if (api.indexOf("/") !== 0) {
            api = "/" + api;
        }
        api = location + api;
    }
    return api;
}
function executeFetch(api, method, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = validateApi(api);
        let fetchHeaders = buildHeaders();
        let response = yield fetch(url, {
            method: method,
            headers: fetchHeaders,
            body: data ? JSON.stringify(data) : undefined
        }).then((response) => {
            var _a;
            console.log(response);
            //check if response is JSON
            if (((_a = response.headers.get("content-type")) === null || _a === void 0 ? void 0 : _a.indexOf("application/json")) === -1) {
                throw new Error("Response was not JSON");
            }
            //return the json as object
            return response.json();
        });
        return response;
    });
}
function buildHeaders() {
    let bearer = getBearerToken();
    let fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    if (bearer) {
        fetchHeaders.append("Authorization", bearer);
    }
    return fetchHeaders;
}
function getCookies() {
    let retValue = {};
    let cookies = document.cookie.split(";").reduce(function (cookies, cookie) {
        var parts = cookie.split("=");
        if (parts.length === 2) {
            var key = parts[0].trim();
            var value = parts[1];
            retValue[key] = value;
        }
        return cookies;
    }, {});
    return retValue;
}
;
function getBearerToken() {
    var cookies = getCookies();
    var token = cookies["_api"];
    if (token)
        return "Bearer " + token;
    return null;
}
;


/***/ }),

/***/ "../../Common/api/ods/search.ts":
/*!**************************************!*\
  !*** ../../Common/api/ods/search.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _search: () => (/* binding */ _search)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ "../../Common/api/api.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function _search(postBody) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let api = "/api/ods/_search";
            return yield (0,_api__WEBPACK_IMPORTED_MODULE_0__.executePost)(window.document.location.origin + api, postBody);
        }
        catch (e) {
            console.warn("ODS Search Error", e, postBody);
        }
        return undefined;
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************!*\
  !*** ./FB_MatterDetails/index.ts ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   enumFields: () => (/* binding */ enumFields),
/* harmony export */   enumMatterDetailFields: () => (/* binding */ enumMatterDetailFields),
/* harmony export */   runMe: () => (/* binding */ runMe)
/* harmony export */ });
/* harmony import */ var _Common_OdsHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Common/OdsHelper */ "../../Common/OdsHelper.ts");
/* harmony import */ var _Common_api_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Common/api/api */ "../../Common/api/api.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


//constants 
const matterPartnerRoleSystemName = "matter-partner";
const clientRoleSystemName = "client";
//This function is called from the module-loader webcomponent in the form builder
function runMe(context) {
    var _a, _b, _c, _d;
    let { expertMatterNumber, matterDetails, pipelineMatter } = createVariables(context);
    if (!expertMatterNumber)
        throw new Error("No expertMatterNumber");
    if (!matterDetails)
        throw new Error("No matterDetails");
    if (!pipelineMatter)
        throw new Error("No pipelineMatter");
    window.tester = context; //just for debugging
    if (context.workItemContext.id() !== undefined) {
        ensureReadOnlyFields(context);
        // validateTempMatterNumber(context);
        let exit = true;
        //if the work item is new or in draft dont exit
        if (((_b = (_a = context.workItemContext) === null || _a === void 0 ? void 0 : _a.phaseName()) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes("draft")) || !((_c = context.workItemContext) === null || _c === void 0 ? void 0 : _c.phaseName())) {
            exit = false;
        }
        if (exit === true) {
            //only run this code if the work item is new
            console.log("%c [ModuleLoader] FB_MatterDetails - exit (only run on new)", "background: #222; color: #bada55", context.workItemContext.id());
            console.log("%c [ModuleLoader] context.workItemContext.id() ", "background: #222; color: #bada55", context.workItemContext.id());
            console.log("%c [ModuleLoader] context.workItemContext?.phaseName() ", "background: #222; color: #bada55", (_d = context.workItemContext) === null || _d === void 0 ? void 0 : _d.phaseName());
            return true;
        }
    }
    window.aspectDebuger = window.aspectDebuger || {};
    window.aspectDebuger.matterDetailsFormBuilder = matterDetails;
    hideShowMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter);
    //add a change event to the expert-matter-number
    addEventHandlers(context, matterDetails, expertMatterNumber, pipelineMatter);
    //generateTempMatterNumber(context);
    validateIfPipelineMatter(context, matterDetails);
    $ui.events.broadcast("script.matterDetailsLoaded", context);
    return true;
}
// This function creates variables for the form.
function createVariables(context) {
    // Get the fields
    // let matterDetails = context.fields[enumFields.matterDetails];
    if (!context.form)
        throw new Error("No form");
    let matterDetails = context.form.fieldsById[enumFields.matterDetails];
    let expertMatterNumber = context.form.fieldsById[enumFields.expertMatterNumber];
    let pipelineMatter = context.form.fieldsById[enumFields.pipelineMatter];
    // Return the variables
    return { expertMatterNumber, matterDetails, pipelineMatter };
}
function addEventHandlers(context, matterDetails, expertMatterNumber, pipelineMatter) {
    var _a, _b, _c, _d;
    if (!context.form)
        throw new Error("No form");
    //add event handlet for expert-matter-number changed
    (_a = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]) === null || _a === void 0 ? void 0 : _a.on("change", function (ev) {
        var _a;
        console.log("%c Partner name changed to: " + ((_a = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]) === null || _a === void 0 ? void 0 : _a.getValue()), "color: pink; font-size: 20px;");
    });
    //add event handlet for expert-matter-number changed
    (_b = context.form.fieldsById[enumFields.expertMatterNumber]) === null || _b === void 0 ? void 0 : _b.on("change", function (ev) {
        // hide or show the matter details field
        hideShowMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter);
        // update the matter details field
        updateMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter);
    });
    //add event handlet for pipeline-matter changed
    (_c = context.form.fieldsById[enumFields.pipelineMatter]) === null || _c === void 0 ? void 0 : _c.on("change", function (ev) {
        // hide or show the matter details field
        hideShowMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter);
        // update the matter details field
        updateMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter);
    });
    //add event handlet for jurisdiction changed
    //update the OOB Jurisdiction aspect field and formbuilder fields
    (_d = context.form.fieldsById[enumFields.jurisdictionsCountry]) === null || _d === void 0 ? void 0 : _d.on("change", function (ev) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            //update blade jurisdiction     
            let selectedId = (_b = (_a = context.form) === null || _a === void 0 ? void 0 : _a.fieldsById["jurisdictions-country"]) === null || _b === void 0 ? void 0 : _b.getValue();
            console.log("%c Jurisdiction changed to: " + ((_d = (_c = context.form) === null || _c === void 0 ? void 0 : _c.fieldsById["jurisdictions-country"]) === null || _d === void 0 ? void 0 : _d.getValue()), "color: red; font-size: 20px;");
            let aspect = context.getAspect("Sharedo.Core.Legal.Aspects.Widgets.InstructionWorkTypeDetails");
            let selectedJurisdictionCountry = yield $ajax.get(/* webpackIgnore: true */ `/api/v1/public/modeller/optionSets/allValues/${selectedId}`);
            if (!selectedJurisdictionCountry) {
                //log issue
                console.log("%c [ModuleLoader] getAspect return value", "background: #222; color: #bada55", selectedJurisdictionCountry);
                return;
            }
            let options = yield $ajax.get(/* webpackIgnore: true */ `/api/v1/public/modeller/optionSets/jurisdictions/values`);
            let selectedJurisdiction = options.find((option) => option.name === selectedJurisdictionCountry.name);
            if (!selectedJurisdiction) {
                //log issue
                console.log("%c [ModuleLoader] getAspect return value", "background: #222; color: #bada55", selectedJurisdiction);
                return;
            }
            aspect.widget.instruction.jurisdictionId(selectedJurisdiction.id);
        });
    });
}
// hide or show the matter details field
function hideShowMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter) {
    setMatterDetailsState(context, matterDetails, pipelineMatter.getValue());
}
// make all child properties readonly
function setMatterDetailsState(context, matterDetails, status = true) {
    var _a;
    if (!matterDetails.fields)
        throw new Error("No fields");
    if (!matterDetails.fieldsById)
        throw new Error("No fieldsById");
    // get all the child properties
    matterDetails.fields.forEach(child => {
        // set the readonly status of the child property
        child.readonly(!status);
    });
    // set the readonly status of the matter details sub area
    (_a = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsIbLastChecked]) === null || _a === void 0 ? void 0 : _a.hidden(true);
    ensureReadOnlyFields(context);
}
// clear all the child properties of the matter details sub area of the form builder
function clearMatterDetails(matterDetails) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        (_a = matterDetails.fields) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
            child.setValue("");
        });
    });
}
/*
1. We first get the data from the endpoint by calling getMatterData() function
2. Then we clear the matterDetails
3. We find the selected matter by using the matter code and client code from the data we got from the endpoint
4. If the matter is undefined, we clear the matterDetails and return
5. If the matter is not undefined, we set the values of the matterDetails fields */
function updateMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield getMatterData(expertMatterNumber.getValue());
        console.log(data);
        //clearMatterDetails(matterDetails); //clear the matter details form
        let selectedMatter = data.find(function (matter) {
            //set the display portion of the expert-matter-number field
            // return expertMatterNumber.getValue() === `${matter.data.matterCode} - ${matter.data.client.name}`;
            return expertMatterNumber.getValue() === matter.data.matterCode;
        });
        if (selectedMatter === undefined || pipelineMatter.getValue() === true) { //if the matter is not found or if the matter is a pipeline matter, clear the matter details form and return
            clearMatterDetails(matterDetails);
            return;
        }
        if (!((_a = matterDetails.parent) === null || _a === void 0 ? void 0 : _a.fieldsById))
            throw new Error("No client");
        let tempMatterNumber = (_c = (_b = matterDetails.parent) === null || _b === void 0 ? void 0 : _b.fieldsById['temp-matter-number']) === null || _c === void 0 ? void 0 : _c.getValue();
        if (tempMatterNumber === undefined || tempMatterNumber.length === 0) {
            // matterDetails.parent.childrenByPropertyId['temp-matter-number'].setValue("N/A");
        }
        //set the value portion of the expert-matter-number field
        (_e = (_d = context.form) === null || _d === void 0 ? void 0 : _d.fieldsById[enumFields.expertMatterNumberValue]) === null || _e === void 0 ? void 0 : _e.setValue(((_f = selectedMatter === null || selectedMatter === void 0 ? void 0 : selectedMatter.data) === null || _f === void 0 ? void 0 : _f.matterCode) || "");
        (_g = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsClientName]) === null || _g === void 0 ? void 0 : _g.setValue(((_j = (_h = selectedMatter === null || selectedMatter === void 0 ? void 0 : selectedMatter.data) === null || _h === void 0 ? void 0 : _h.client) === null || _j === void 0 ? void 0 : _j.name) || "");
        (_k = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsClientCode]) === null || _k === void 0 ? void 0 : _k.setValue(((_m = (_l = selectedMatter === null || selectedMatter === void 0 ? void 0 : selectedMatter.data) === null || _l === void 0 ? void 0 : _l.client) === null || _m === void 0 ? void 0 : _m.code) || "");
        // matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPracticeArea]?.setValue(selectedMatter?.data?.practiceArea?.name || "");
        (_o = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsName]) === null || _o === void 0 ? void 0 : _o.setValue(((_p = selectedMatter === null || selectedMatter === void 0 ? void 0 : selectedMatter.data) === null || _p === void 0 ? void 0 : _p.shortName) || "");
        (_q = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]) === null || _q === void 0 ? void 0 : _q.setValue(((_s = (_r = selectedMatter === null || selectedMatter === void 0 ? void 0 : selectedMatter.data) === null || _r === void 0 ? void 0 : _r.partner) === null || _s === void 0 ? void 0 : _s.name) || "");
        (_t = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsIb]) === null || _t === void 0 ? void 0 : _t.setValue(((_u = selectedMatter === null || selectedMatter === void 0 ? void 0 : selectedMatter.data) === null || _u === void 0 ? void 0 : _u.secure) || "");
        console.log("matterDetails.isValid():" + matterDetails.isValid());
        try {
            tryUpdateClientOdsPicker(selectedMatter, context);
        }
        catch (e) {
            console.log("Failed to auto updating ods pickers, user required to select manually");
        }
        try {
            tryUpdatePartnerOdsPicker(selectedMatter, context);
        }
        catch (e) {
            console.log("Failed to auto updating ods pickers, user required to select manually");
        }
    });
}
/**
 * Try to update the client ods picker using the selected matter
 * Uses searchForClient function whic is a common ods helper function
 * @param selectedMatter The selected matter
 * @param context The form builder context
 */
function tryUpdateClientOdsPicker(selectedMatter, context) {
    let clientCode = selectedMatter.data.client.code;
    (0,_Common_OdsHelper__WEBPACK_IMPORTED_MODULE_0__.searchForClients)(clientCode).then((clients) => {
        let client = clients[0];
        console.log("%c Found Client name : " + (client === null || client === void 0 ? void 0 : client.name), "color: pink; font-size: 20px;", clients);
        let odsClient = getClientOdsPicker(context);
        let odsRoleConfig = odsClient.roleConfig[0];
        let odsEntities = odsClient.ODSEntities[0];
        if (!odsRoleConfig || !odsEntities)
            return;
        if (!client) {
            odsEntities.selected(false);
            return;
        }
        let entity = odsRoleConfig.addService.createSelectedEntityModel(client.id, "organisation", client.name);
        odsRoleConfig.addService.selectedEntity(entity);
    });
}
/**
 * Tries to update the partner ods picker
 * @param selectedMatter The selected matter
 * @param context  The form builder context
 */
function tryUpdatePartnerOdsPicker(selectedMatter, context) {
    let partnerLastName = selectedMatter.data.partner.name.split(",")[0];
    (0,_Common_OdsHelper__WEBPACK_IMPORTED_MODULE_0__.searchForUsers)(selectedMatter.data.partner.email).then((users) => {
        let user = users[0];
        console.log("%c Partner name changed to: " + (user === null || user === void 0 ? void 0 : user.id), "color: pink; font-size: 20px;", user);
        let odsMatterPartner = getPartnerOdsPicker(context);
        let odsRoleConfig = odsMatterPartner.roleConfig[0];
        let odsEntities = odsMatterPartner.ODSEntities[0];
        if (!odsRoleConfig || !odsEntities)
            return;
        if (!user) {
            odsEntities.selected(false);
            return;
        }
        let entity = odsRoleConfig.addService.createSelectedEntityModel(user.id, "user", user.firstName + " " + user.surname);
        odsRoleConfig.addService.selectedEntity(entity);
    });
}
/**
 * Call the server to get the matter data
 * @returns the data from the server without cache
 */
function getMatterData(expertMatterNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        let retValue = [];
        if (expertMatterNumber === undefined || expertMatterNumber.length === 0) {
            return retValue;
        }
        //return await $ajax.get(/* webpackIgnore: true */ window.document.location.origin + "/_ideFiles/SampleData/eDiscovery/matters.json") as IExpertMatter[];
        // //get the data from the server without cache
        try {
            let data = yield (0,_Common_api_api__WEBPACK_IMPORTED_MODULE_1__.executeGet)(`/api/externalMatterProvider/details/${expertMatterNumber}`);
            console.log("%c [ModuleLoader] getMatterData return value", "background: #222; color: #bada55", data);
            if (data && data.matterCode) {
                let matter = {
                    data: data
                };
                retValue.push(matter);
            }
        }
        catch (e) {
            console.log("Failed to get matter data from server", e);
        }
        return retValue;
    });
}
/**
 * Generates a temp matter number and sets it to the temp-matter-number field
 * @param context The form builder context
 */
function generateTempMatterNumber(context) {
    var _a, _b;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let millisecond = date.getMilliseconds();
    // let tempMatterNumber = `T${year}${month}${day}${hour}${minute}${second}${millisecond}`;
    let tempMatterNumber = `T[${year}]`;
    (_b = (_a = context.form) === null || _a === void 0 ? void 0 : _a.fieldsById[enumFields.tempMatterNumber]) === null || _b === void 0 ? void 0 : _b.setValue(tempMatterNumber);
}
/**
 * Enum for the fields in the form builder
 */
var enumFields;
(function (enumFields) {
    enumFields["customAltEdiscoveryInstructionMatterDetails"] = "custom-alt-ediscovery-instruction-matter-details";
    enumFields["jurisdictionsCountry"] = "jurisdictions-country";
    enumFields["pipelineMatter"] = "pipeline-matter";
    enumFields["expertMatterNumber"] = "expert-matter-number";
    enumFields["expertMatterNumberValue"] = "expert-matter-number-value";
    enumFields["tempMatterNumber"] = "temp-matter-number";
    enumFields["subMatterCode"] = "sub-matter-code";
    enumFields["abcMatterNumber"] = "abc-matter-number";
    enumFields["matterDetails"] = "matter-details";
})(enumFields || (enumFields = {}));
/**
 * Enum for the fields in the matter details sub area of the form builder
 */
var enumMatterDetailFields;
(function (enumMatterDetailFields) {
    enumMatterDetailFields["matterDetailsPartnerSelector"] = "matter-details-partner-selector";
    enumMatterDetailFields["matterDetailsPartnerName"] = "matter-details-partner-name";
    enumMatterDetailFields["matterDetailsClientName"] = "matter-details-client-name";
    enumMatterDetailFields["matterDetailsClientCode"] = "matter-details-client-code";
    enumMatterDetailFields["matterDetailsPracticeArea"] = "matter-details-practice-area";
    enumMatterDetailFields["matterDetailsName"] = "matter-details-name";
    enumMatterDetailFields["matterDetailsIb"] = "matter-details-ib";
    enumMatterDetailFields["matterDetailsIbLastChecked"] = "matter-details-ib-last-check";
})(enumMatterDetailFields || (enumMatterDetailFields = {}));
/**
 * Searches for the partner ods picker in the blade using common ods helper functions
 * @param context
 * @returns
 */
function getPartnerOdsPicker(context) {
    return (0,_Common_OdsHelper__WEBPACK_IMPORTED_MODULE_0__.getAllRoleConfigForRole)(context.blade, matterPartnerRoleSystemName);
}
/**
 * Searches for the partner ods picker in the blade using common ods helper functions
 * @param context
 * @returns
 */
function getClientOdsPicker(context) {
    return (0,_Common_OdsHelper__WEBPACK_IMPORTED_MODULE_0__.getAllRoleConfigForRole)(context.blade, clientRoleSystemName);
}
function validateIfPipelineMatter(context, matterDetails) {
    var _a, _b;
    //log color
    console.log("%c [MatterDetails] validateIfPipelineMatter", "color: #green");
    console.log("%c [MatterDetails] context.workItemContext()", " color: #green", context.workItemContext);
    if (((_a = context.workItemContext.sharedoTypeSystemName()) === null || _a === void 0 ? void 0 : _a.includes("pipeline")) !== true) {
        return;
    }
    let pipelineFormField = (_b = context.form) === null || _b === void 0 ? void 0 : _b.fieldsById[enumFields.pipelineMatter];
    if (pipelineFormField) {
        //ensure pipleine matter is readonly
        console.log("%c [MatterDetails] pipelineFormField.setValue(true)", " color: #green");
        pipelineFormField.setValue(true);
    }
}
function ensureReadOnlyFields(context) {
    var _a;
    let pipelineFormField = (_a = context.form) === null || _a === void 0 ? void 0 : _a.fieldsById[enumFields.pipelineMatter];
    if (pipelineFormField) {
        pipelineFormField.readonly(true);
        pipelineFormField.hidden(true);
    }
}
// function validateTempMatterNumber(context: IFormBuilderContext) {
//     //log color
//     console.log("%c [MatterDetails] validateTempMatterNumber", "background: #222; color: #bada55");
//     //exit is still new and matter not saved
//     if(context.workItemContext.id()===undefined)
//     {
//         return;
//     }
//     //exit if the temp matter number is set
//     let tempMatterNumber = context.form?.fieldsById[enumFields.tempMatterNumber]?.getValue();
//     console.log("%c [MatterDetails] tempMatterNumber", "background: #222; color: #bada55", tempMatterNumber);
//     if(tempMatterNumber != undefined && tempMatterNumber.startsWith("T["))
//     {
//         return;
//     }
//     //run every 500ms to check for a temp matter number
//     let interval = setInterval(async () => {
//         console.log("validateTempMatterNumber");
//         let tempMatterNumber = await getPipelineMatterNumber(context.workItemContext.id());
//         if(tempMatterNumber != undefined && tempMatterNumber.length > 0)
//         {
//             context.form?.fieldsById[enumFields.tempMatterNumber]?.setValue(tempMatterNumber);
//             clearInterval(interval);
//             return;
//         }
//     },500);
// }
// async function getPipelineMatterNumber(id:string) : Promise<string>
// {
//     let api = `/api/v1/public/workItem/findByQuery`;
//     let data = {
//         "search": {
//           "workItemIds": [
//             id
//           ]
//         },
//         "enrich": [
//                   {
//                       "path": "form-custom-alt-ediscovery-instruction-matter-details.temp-matter-number"
//                   }
//         ]};
//     return executePost<TGetPipelineMatterNumberResponse>(api,data).then((data) => {
//          console.log("getPipelineMatterNumber",data);
//          let retValue : string = data.results[0].data["form-custom-alt-ediscovery-instruction-matter-details.temp-matter-number"];
//         return retValue;
//     });
// }
// type TGetPipelineMatterNumberResponse = {
//         "totalCount": 1,
//         "tookMs": 71,
//         "results": [
//             {
//                 "score": 0,
//                 "id": "4dd70e3f-b294-4479-902e-b057009e3e63",
//                 "data": {
//                     "form-custom-alt-ediscovery-instruction-matter-details.temp-matter-number": "T[2023]000007",
//                     "title": "Gareth Jackson Ltd - ",
//                     "phase.name": "Draft"
//                 }
//             }
//         ]
//     }

})();

window.FB_MatterDetails = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkJfTWF0dGVyRGV0YWlscy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXMkM7QUFHM0M7Ozs7R0FJRztBQUNJLFNBQWUsY0FBYyxDQUFDLE1BQWM7O1FBRS9DLElBQUksUUFBUSxHQUFHO1lBQ1gsV0FBVyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsQ0FBQztZQUNaLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLGNBQWMsRUFBRSxNQUFNO1lBQ3RCLGdCQUFnQixFQUFFLEVBQUU7WUFDcEIsY0FBYyxFQUFFO2dCQUNaLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixlQUFlLEVBQUUsSUFBSTtnQkFDckIsZ0JBQWdCLEVBQUUsSUFBSTthQUN6QjtZQUNELFVBQVUsRUFBRTtnQkFDUixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELFlBQVksRUFBRTtnQkFDVixZQUFZLEVBQUUsSUFBSTthQUNyQjtZQUNELGNBQWMsRUFBRSxFQUFFO1lBQ2xCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUU7Z0JBQ1IsS0FBSztnQkFDTCwwQkFBMEI7Z0JBQzFCLFFBQVE7Z0JBQ1IsWUFBWTtnQkFDWix3QkFBd0I7Z0JBQ3hCLFVBQVU7Z0JBQ1YsUUFBUTtnQkFDUixlQUFlO2dCQUNmLFVBQVU7Z0JBQ1YsS0FBSztnQkFDTCxZQUFZO2dCQUNaLHNCQUFzQjthQUN6QjtZQUNELGdCQUFnQixFQUFFLEtBQUs7U0FDMUIsQ0FBQztRQUNGLE9BQU8sc0JBQXNCLENBQW1CLE1BQU0sRUFBQyxRQUFRLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQUE7QUFFRDs7OztHQUlHO0FBQ0ksU0FBZSxnQkFBZ0IsQ0FBQyxNQUFjOztRQUU3QyxJQUFJLFFBQVEsR0FBRztZQUNYLFdBQVcsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLENBQUM7WUFDWixhQUFhLEVBQUUsRUFBRTtZQUNqQixjQUFjLEVBQUUsTUFBTTtZQUN0QixnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLGNBQWMsRUFBRTtnQkFDWixhQUFhLEVBQUUsSUFBSTtnQkFDbkIsZUFBZSxFQUFFLElBQUk7Z0JBQ3JCLGdCQUFnQixFQUFFLElBQUk7YUFDekI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFLElBQUk7YUFDckI7WUFDRCxjQUFjLEVBQUUsRUFBRTtZQUNsQixPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFO2dCQUNSLFFBQVE7YUFDWDtZQUNELGdCQUFnQixFQUFFLEtBQUs7U0FDMUIsQ0FBQztRQUNGLE9BQU8sc0JBQXNCLENBQXlCLE1BQU0sRUFBQyxRQUFRLENBQUMsQ0FBQztJQUMvRSxDQUFDO0NBQUE7QUFtQkQ7Ozs7O0dBS0c7QUFDSSxTQUFTLHVCQUF1QixDQUFDLEtBQWdDLEVBQUUsSUFBWTtJQUNsRixJQUFJLFFBQVEsR0FDWjtRQUNJLFVBQVUsRUFBRSxFQUFFO1FBQ2QsV0FBVyxFQUFFLEVBQUU7S0FDbEIsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTyxRQUFRLENBQUM7SUFFNUIsSUFBSSxhQUFhLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXpDLGtEQUFrRDtJQUNsRCxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBRXZCLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFO2dCQUNyQixPQUFPO2FBQ1Y7WUFFRCxJQUFJLEdBQUcsQ0FBQyxjQUFjLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQy9CLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQyxDQUFDO1FBRUYsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzFDLElBQUksQ0FBQyxDQUFDLGNBQWMsS0FBSyxJQUFJLEVBQUU7Z0JBQzNCLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9CO1FBQ0wsQ0FBQyxDQUFDO0lBRU4sQ0FBQyxDQUFDO0lBRUYsc0NBQXNDO0lBQ3RDLDRHQUE0RztJQUM1RywwQ0FBMEM7SUFFMUMsdUNBQXVDO0lBQ3ZDLElBQUk7SUFDSixxRkFBcUY7SUFDckYsZ0NBQWdDO0lBQ2hDLGlDQUFpQztJQUNqQyxJQUFJO0lBQ0osT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0ksU0FBUyxhQUFhLENBQUMsS0FBb0I7SUFDOUMsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLFNBQVMsQ0FBQztJQUU3QixJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztJQUVwRSxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sWUFBWSxXQUFXLENBQUMsQ0FBQztJQUM1RSxPQUFPLFFBQVEsQ0FBQztBQUVwQixDQUFDO0FBRUQsdUNBQXVDO0FBQ3ZDLDRCQUE0QjtBQUM1Qjs7OztHQUlHO0FBQ0gsU0FBZSxzQkFBc0IsQ0FBSSxNQUFjLEVBQUMsUUFBWTs7UUFDaEUsSUFBSSxTQUFTLEdBQUcsTUFBTSx3REFBTyxDQUFJLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLFdBQVc7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pFLElBQUcsQ0FBQyxTQUFTLEVBQ2I7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDbEUsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakUsT0FBTywrQkFBK0IsQ0FBSSxTQUFTLENBQUMsQ0FBQztJQUV6RCxDQUFDO0NBQUE7QUFFRCxTQUFTLCtCQUErQixDQUFLLFNBQTZCO0lBRXRFLElBQ0E7UUFDSSxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDN0QsT0FBTyxRQUFRLENBQUM7S0FDbkI7SUFDRCxPQUFNLENBQUMsRUFDUDtRQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsNERBQTRELEVBQUUsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzNGO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBSUQsK0JBQStCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4Ti9COzs7O0dBSUc7Ozs7Ozs7Ozs7QUFFSSxTQUFlLFdBQVcsQ0FBSSxHQUFXLEVBQUUsUUFBYTs7UUFDM0QsZ0ZBQWdGO1FBQ2hGLE9BQU8sWUFBWSxDQUFJLEdBQUcsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUFBO0FBRUQsaUVBQWlFO0FBQ2pFLDBFQUEwRTtBQUMxRSxLQUFLO0FBRUUsU0FBZSxVQUFVLENBQUksR0FBVzs7UUFDNUMsT0FBTyxZQUFZLENBQUksR0FBRyxFQUFDLEtBQUssRUFBQyxTQUFTLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQUE7QUFNTSxTQUFlLFVBQVUsQ0FBSSxHQUFXLEVBQUUsUUFBYTs7UUFDMUQsK0VBQStFO1FBQy9FLE9BQU8sWUFBWSxDQUFJLEdBQUcsRUFBQyxLQUFLLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUFBO0FBRU0sU0FBZSxhQUFhLENBQUksR0FBVzs7UUFDOUMsd0VBQXdFO1FBQ3hFLE9BQU8sWUFBWSxDQUFJLEdBQUcsRUFBQyxRQUFRLEVBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUFBO0FBRUQsU0FBUyxXQUFXLENBQUMsR0FBVztJQUM3QixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFFL0MsbURBQW1EO0lBQ2xELElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQztRQUM1Qiw0Q0FBNEM7UUFDNUMsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBQztZQUN0QixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUNuQjtRQUVELEdBQUcsR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDO0tBQ3hCO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFFZixDQUFDO0FBRU0sU0FBZSxZQUFZLENBQUksR0FBVyxFQUFFLE1BQWEsRUFBQyxJQUFROztRQUNyRSxJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxZQUFZLEdBQUcsWUFBWSxFQUFFLENBQUM7UUFDbEMsSUFBSSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFDO1lBQzNCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFLFlBQVk7WUFDckIsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxTQUFTO1NBQzlDLENBQ0EsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTs7WUFFaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QiwyQkFBMkI7WUFDM0IsSUFBRyxlQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsMENBQUUsT0FBTyxDQUFDLGtCQUFrQixDQUFDLE1BQUssQ0FBQyxDQUFDLEVBQUM7Z0JBQ3hFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQzthQUM1QztZQUNELDJCQUEyQjtZQUMzQixPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7Q0FBQTtBQUVELFNBQVMsWUFBWTtJQUNqQixJQUFJLE1BQU0sR0FBRyxjQUFjLEVBQUUsQ0FBQztJQUM5QixJQUFJLFlBQVksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQ2pDLFlBQVksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDeEQsSUFBSSxNQUFNLEVBQUU7UUFDUixZQUFZLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNoRDtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFHTSxTQUFTLFVBQVU7SUFFdEIsSUFBSSxRQUFRLEdBQTRCLEVBQUUsQ0FBQztJQUMzQyxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtRQUVyRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQ3RCO1lBQ0ksSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVyQixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQUFBLENBQUM7QUFFSyxTQUFTLGNBQWM7SUFFMUIsSUFBSSxPQUFPLEdBQUcsVUFBVSxFQUFFLENBQUM7SUFDM0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTVCLElBQUksS0FBSztRQUFHLE9BQU8sU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNyQyxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFHbUM7QUFHOUIsU0FBZSxPQUFPLENBQUksUUFBMkI7O1FBRXhELElBQ0E7WUFDSSxJQUFJLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQztZQUM3QixPQUFPLE1BQU0saURBQVcsQ0FBcUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNqRztRQUNELE9BQU8sQ0FBQyxFQUNSO1lBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEVBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEQ7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0NBQUE7Ozs7Ozs7VUNqQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0Z1RztBQUNyQztBQVFsRSxZQUFZO0FBQ1osTUFBTSwyQkFBMkIsR0FBRyxnQkFBZ0IsQ0FBQztBQUNyRCxNQUFNLG9CQUFvQixHQUFHLFFBQVEsQ0FBQztBQUV0QyxpRkFBaUY7QUFDMUUsU0FBUyxLQUFLLENBQUMsT0FBNEI7O0lBRTlDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXJGLElBQUcsQ0FBQyxrQkFBa0I7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDakUsSUFBRyxDQUFDLGFBQWE7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdkQsSUFBRyxDQUFDLGNBQWM7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFeEQsTUFBYyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxvQkFBb0I7SUFFdEQsSUFBRyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxLQUFLLFNBQVMsRUFDN0M7UUFDSSxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixxQ0FBcUM7UUFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLCtDQUErQztRQUMvQyxJQUFHLG9CQUFPLENBQUMsZUFBZSwwQ0FBRSxTQUFTLEVBQUUsMENBQUUsV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLGNBQU8sQ0FBQyxlQUFlLDBDQUFFLFNBQVMsRUFBRSxHQUNqSDtZQUNJLElBQUksR0FBRyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFHLElBQUksS0FBRyxJQUFJLEVBQ2Q7WUFDSyw0Q0FBNEM7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2REFBNkQsRUFBRSxrQ0FBa0MsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsRUFBRSxrQ0FBa0MsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakksT0FBTyxDQUFDLEdBQUcsQ0FBQyx5REFBeUQsRUFBRSxrQ0FBa0MsRUFBRSxhQUFPLENBQUMsZUFBZSwwQ0FBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQ2pKLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7S0FDSjtJQUdBLE1BQWMsQ0FBQyxhQUFhLEdBQUksTUFBYyxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7SUFDbkUsTUFBYyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsR0FBRyxhQUFhLENBQUM7SUFFdkUscUJBQXFCLENBQUMsT0FBTyxFQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNqRixnREFBZ0Q7SUFDaEQsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUM3RSxvQ0FBb0M7SUFDcEMsd0JBQXdCLENBQUMsT0FBTyxFQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRWhELEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLDRCQUE0QixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxnREFBZ0Q7QUFDaEQsU0FBUyxlQUFlLENBQUMsT0FBNEI7SUFDakQsaUJBQWlCO0lBQ2pCLGdFQUFnRTtJQUVoRSxJQUFHLENBQUMsT0FBTyxDQUFDLElBQUk7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTdDLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RSxJQUFJLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hGLElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUd4RSx1QkFBdUI7SUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsQ0FBQztBQUNqRSxDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxPQUE0QixFQUFFLGFBQTBCLEVBQUUsa0JBQStCLEVBQUUsY0FBMkI7O0lBQzVJLElBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0Msb0RBQW9EO0lBQ3BELG1CQUFhLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLHdCQUF3QixDQUFDLDBDQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBcUIsRUFBTzs7UUFDaEgsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsSUFBRyxtQkFBYSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyx3QkFBd0IsQ0FBQywwQ0FBRSxRQUFRLEVBQUUsR0FBRSwrQkFBK0IsQ0FBQyxDQUFDO0lBQ3pLLENBQUMsQ0FBQyxDQUFDO0lBRUgsb0RBQW9EO0lBQ3BELGFBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQywwQ0FBRSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQXFCLEVBQU87UUFDN0Ysd0NBQXdDO1FBQ3hDLHFCQUFxQixDQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDakYsa0NBQWtDO1FBQ2xDLG1CQUFtQixDQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDbkYsQ0FBQyxDQUFDLENBQUM7SUFFSCwrQ0FBK0M7SUFDL0MsYUFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQywwQ0FBRSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQXFCLEVBQU87UUFDekYsd0NBQXdDO1FBQ3hDLHFCQUFxQixDQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDakYsa0NBQWtDO1FBQ2xDLG1CQUFtQixDQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDbkYsQ0FBQyxDQUFDLENBQUM7SUFFSCw0Q0FBNEM7SUFDNUMsaUVBQWlFO0lBQ2pFLGFBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQywwQ0FBRSxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQTJCLEVBQU87OztZQUNyRyxnQ0FBZ0M7WUFDaEMsSUFBSSxVQUFVLEdBQUcsbUJBQU8sQ0FBQyxJQUFJLDBDQUFFLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQywwQ0FBRSxRQUFRLEVBQUUsQ0FBQztZQUMvRSxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixJQUFHLG1CQUFPLENBQUMsSUFBSSwwQ0FBRSxVQUFVLENBQUMsdUJBQXVCLENBQUMsMENBQUUsUUFBUSxFQUFFLEdBQUUsOEJBQThCLENBQUMsQ0FBQztZQUM1SSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLCtEQUErRCxDQUFDLENBQUM7WUFDaEcsSUFBSSwyQkFBMkIsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMseUJBQXlCLGlEQUFnRCxVQUFVLEVBQUUsQ0FBc0IsQ0FBQztZQUM5SixJQUFJLENBQUMsMkJBQTJCLEVBQUU7Z0JBQzlCLFdBQVc7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsRUFBRSxrQ0FBa0MsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO2dCQUN6SCxPQUFPO2FBQ1Y7WUFDRCxJQUFJLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMseUJBQXlCLDBEQUF5RCxDQUFDLENBQUM7WUFDbEgsSUFBSSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBeUIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6SCxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ3ZCLFdBQVc7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsRUFBRSxrQ0FBa0MsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNsSCxPQUFPO2FBQ1Y7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7O0tBQ3JFLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCx3Q0FBd0M7QUFDeEMsU0FBUyxxQkFBcUIsQ0FBQyxPQUE0QixFQUFDLGFBQTBCLEVBQUcsa0JBQStCLEVBQUUsY0FBMkI7SUFDakoscUJBQXFCLENBQUMsT0FBTyxFQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUM1RSxDQUFDO0FBRUQscUNBQXFDO0FBQ3JDLFNBQVMscUJBQXFCLENBQUMsT0FBNEIsRUFBQyxhQUEwQixFQUFFLFNBQWtCLElBQUk7O0lBQzFHLElBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkQsSUFBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvRCwrQkFBK0I7SUFDL0IsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFFakMsZ0RBQWdEO1FBQ2hELEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUMsQ0FBQztJQUVILHlEQUF5RDtJQUN6RCxtQkFBYSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQywwQkFBMEIsQ0FBQywwQ0FBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFMUYsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7QUFHbEMsQ0FBQztBQUVELG9GQUFvRjtBQUNwRixTQUFlLGtCQUFrQixDQUFDLGFBQTBCOzs7UUFDeEQsbUJBQWEsQ0FBQyxNQUFNLDBDQUFFLE9BQU8sQ0FBQyxVQUFVLEtBQVU7WUFDOUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQzs7Q0FDTjtBQUdEOzs7OzttRkFLbUY7QUFDbkYsU0FBZSxtQkFBbUIsQ0FBQyxPQUE0QixFQUFDLGFBQTBCLEVBQUUsa0JBQStCLEVBQUUsY0FBMkI7OztRQUdwSixJQUFJLElBQUksR0FBRyxNQUFNLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsb0VBQW9FO1FBQ3BFLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxNQUFXO1lBQ2hELDJEQUEyRDtZQUM1RCxxR0FBcUc7WUFDckcsT0FBTyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUVuRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksY0FBYyxLQUFLLFNBQVMsSUFBSSxjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFLEVBQUUsNEdBQTRHO1lBQ2xMLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2xDLE9BQU87U0FDVjtRQUVELElBQUcsQ0FBQyxvQkFBYSxDQUFDLE1BQU0sMENBQUUsVUFBVTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkUsSUFBSSxnQkFBZ0IsR0FBRyx5QkFBYSxDQUFDLE1BQU0sMENBQUUsVUFBVSxDQUFDLG9CQUFvQixDQUFDLDBDQUFFLFFBQVEsRUFBRSxDQUFDO1FBRTFGLElBQUksZ0JBQWdCLEtBQUssU0FBUyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDakUsbUZBQW1GO1NBQ3RGO1FBRUEseURBQXlEO1FBQ3pELG1CQUFPLENBQUMsSUFBSSwwQ0FBRSxVQUFVLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLDBDQUFFLFFBQVEsQ0FBQyxxQkFBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLElBQUksMENBQUUsVUFBVSxLQUFJLEVBQUUsQ0FBQyxDQUFDO1FBR2hILG1CQUFhLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLHVCQUF1QixDQUFDLDBDQUFFLFFBQVEsQ0FBQywyQkFBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLElBQUksMENBQUUsTUFBTSwwQ0FBRSxJQUFJLEtBQUksRUFBRSxDQUFDLENBQUM7UUFDN0gsbUJBQWEsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsdUJBQXVCLENBQUMsMENBQUUsUUFBUSxDQUFDLDJCQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsSUFBSSwwQ0FBRSxNQUFNLDBDQUFFLElBQUksS0FBSSxFQUFFLENBQUMsQ0FBQztRQUM5SCx3SUFBd0k7UUFDdkksbUJBQWEsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsMENBQUUsUUFBUSxDQUFDLHFCQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsSUFBSSwwQ0FBRSxTQUFTLEtBQUksRUFBRSxDQUFDLENBQUM7UUFDcEgsbUJBQWEsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsd0JBQXdCLENBQUMsMENBQUUsUUFBUSxDQUFDLDJCQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsSUFBSSwwQ0FBRSxPQUFPLDBDQUFFLElBQUksS0FBSSxFQUFFLENBQUMsQ0FBQztRQUMvSCxtQkFBYSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsMENBQUUsUUFBUSxDQUFDLHFCQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsSUFBSSwwQ0FBRSxNQUFNLEtBQUksRUFBRSxDQUFDLENBQUM7UUFFL0csT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUdsRSxJQUNBO1lBQ0ksd0JBQXdCLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsT0FBTSxDQUFDLEVBQ1A7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHVFQUF1RSxDQUFDLENBQUM7U0FDeEY7UUFFRCxJQUNBO1lBQ0kseUJBQXlCLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsT0FBTSxDQUFDLEVBQ1A7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLHVFQUF1RSxDQUFDLENBQUM7U0FDeEY7O0NBRUo7QUFHRDs7Ozs7R0FLRztBQUNILFNBQVMsd0JBQXdCLENBQUMsY0FBNkIsRUFBRSxPQUE0QjtJQUN6RixJQUFJLFVBQVUsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDakQsbUVBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDMUMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLElBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksR0FBRSwrQkFBK0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRyxJQUFJLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLFdBQVc7WUFDOUIsT0FBTztRQUVYLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLE9BQU87U0FDVjtRQUNELElBQUksTUFBTSxHQUFnQixhQUFhLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNySCxhQUFhLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyx5QkFBeUIsQ0FBQyxjQUE2QixFQUFFLE9BQTRCO0lBQzFGLElBQUksZUFBZSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsaUVBQWMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM3RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsSUFBRyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsRUFBRSxHQUFFLCtCQUErQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlGLElBQUksZ0JBQWdCLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEQsSUFBSSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksV0FBVyxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsV0FBVztZQUM5QixPQUFPO1FBRVgsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsT0FBTztTQUNWO1FBRUQsSUFBSSxNQUFNLEdBQWdCLGFBQWEsQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25JLGFBQWEsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQWUsYUFBYSxDQUFDLGtCQUEwQjs7UUFFbkQsSUFBSSxRQUFRLEdBQW1CLEVBQUUsQ0FBQztRQUNsQyxJQUFHLGtCQUFrQixLQUFLLFNBQVMsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUN0RTtZQUNJLE9BQU8sUUFBUSxDQUFDO1NBQ25CO1FBRUQseUpBQXlKO1FBQ3pKLCtDQUErQztRQUMvQyxJQUNBO1lBQ0ksSUFBSSxJQUFJLEdBQUcsTUFBTSwyREFBVSxDQUFNLHVDQUF1QyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7WUFDOUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsRUFBRSxrQ0FBa0MsRUFBRSxJQUFJLENBQUM7WUFDckcsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFDMUI7Z0JBQ0ksSUFBSSxNQUFNLEdBQWlCO29CQUN2QixJQUFJLEVBQUUsSUFBSTtpQkFDYixDQUFDO2dCQUVGLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekI7U0FDSjtRQUNELE9BQU0sQ0FBQyxFQUNQO1lBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBQyxDQUFDLENBQUMsQ0FBQztTQUUxRDtRQUNBLE9BQU8sUUFBUSxDQUFDO0lBQ3JCLENBQUM7Q0FBQTtBQUVEOzs7R0FHRztBQUNILFNBQVMsd0JBQXdCLENBQUMsT0FBNEI7O0lBRTFELElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDL0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQy9CLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMxQywwRkFBMEY7SUFDMUYsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLElBQUksR0FBRyxDQUFDO0lBQ25DLG1CQUFPLENBQUMsSUFBSSwwQ0FBRSxVQUFVLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLDBDQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3RGLENBQUM7QUFFRDs7R0FFRztBQUNILElBQVksVUFXWDtBQVhELFdBQVksVUFBVTtJQUNsQiw4R0FBZ0c7SUFDaEcsNERBQThDO0lBQzlDLGdEQUFrQztJQUNsQyx5REFBMkM7SUFDM0Msb0VBQXNEO0lBQ3RELHFEQUF1QztJQUN2QywrQ0FBaUM7SUFDakMsbURBQXFDO0lBQ3JDLDhDQUFnQztBQUVwQyxDQUFDLEVBWFcsVUFBVSxLQUFWLFVBQVUsUUFXckI7QUFFRDs7R0FFRztBQUNILElBQVksc0JBU1g7QUFURCxXQUFZLHNCQUFzQjtJQUM5QiwwRkFBZ0U7SUFDaEUsa0ZBQXdEO0lBQ3hELGdGQUFzRDtJQUN0RCxnRkFBc0Q7SUFDdEQsb0ZBQTBEO0lBQzFELG1FQUF5QztJQUN6QywrREFBcUM7SUFDckMscUZBQTJEO0FBQy9ELENBQUMsRUFUVyxzQkFBc0IsS0FBdEIsc0JBQXNCLFFBU2pDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsbUJBQW1CLENBQUMsT0FBNEI7SUFDckQsT0FBTywwRUFBdUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDOUUsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLGtCQUFrQixDQUFDLE9BQTRCO0lBQ3BELE9BQU8sMEVBQXVCLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3hFLENBQUM7QUFFRCxTQUFTLHdCQUF3QixDQUFDLE9BQTRCLEVBQUMsYUFBMEI7O0lBRXJGLFdBQVc7SUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsOENBQThDLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXZHLElBQUcsY0FBTyxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRSwwQ0FBRSxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQUssSUFBSSxFQUNqRjtRQUNJLE9BQU87S0FDVjtJQUVELElBQUksaUJBQWlCLEdBQUcsYUFBTyxDQUFDLElBQUksMENBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUU1RSxJQUFHLGlCQUFpQixFQUNwQjtRQUNJLG9DQUFvQztRQUVwQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFEQUFxRCxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDckYsaUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BDO0FBS0wsQ0FBQztBQUVELFNBQVMsb0JBQW9CLENBQUMsT0FBNEI7O0lBRXRELElBQUksaUJBQWlCLEdBQUcsYUFBTyxDQUFDLElBQUksMENBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM1RSxJQUFHLGlCQUFpQixFQUNwQjtRQUNJLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEM7QUFDTCxDQUFDO0FBR0Qsb0VBQW9FO0FBRXBFLGtCQUFrQjtBQUNsQixzR0FBc0c7QUFDdEcsK0NBQStDO0FBQy9DLG1EQUFtRDtBQUNuRCxRQUFRO0FBQ1Isa0JBQWtCO0FBQ2xCLFFBQVE7QUFFUiw4Q0FBOEM7QUFDOUMsZ0dBQWdHO0FBQ2hHLGdIQUFnSDtBQUNoSCw2RUFBNkU7QUFDN0UsUUFBUTtBQUNSLGtCQUFrQjtBQUNsQixRQUFRO0FBRVIsMERBQTBEO0FBQzFELCtDQUErQztBQUMvQyxtREFBbUQ7QUFDbkQsOEZBQThGO0FBQzlGLDJFQUEyRTtBQUMzRSxZQUFZO0FBQ1osaUdBQWlHO0FBQ2pHLHVDQUF1QztBQUN2QyxzQkFBc0I7QUFDdEIsWUFBWTtBQUVaLGNBQWM7QUFHZCxJQUFJO0FBRUosc0VBQXNFO0FBQ3RFLElBQUk7QUFDSix1REFBdUQ7QUFDdkQsbUJBQW1CO0FBQ25CLHNCQUFzQjtBQUN0Qiw2QkFBNkI7QUFDN0IsaUJBQWlCO0FBQ2pCLGNBQWM7QUFDZCxhQUFhO0FBQ2Isc0JBQXNCO0FBRXRCLHNCQUFzQjtBQUN0QiwyR0FBMkc7QUFDM0csc0JBQXNCO0FBQ3RCLGNBQWM7QUFFZCxzRkFBc0Y7QUFDdEYsd0RBQXdEO0FBQ3hELHFJQUFxSTtBQUVySSwyQkFBMkI7QUFDM0IsVUFBVTtBQUdWLElBQUk7QUFFSiw0Q0FBNEM7QUFDNUMsMkJBQTJCO0FBQzNCLHdCQUF3QjtBQUN4Qix1QkFBdUI7QUFDdkIsZ0JBQWdCO0FBQ2hCLDhCQUE4QjtBQUM5QixnRUFBZ0U7QUFDaEUsNEJBQTRCO0FBQzVCLG1IQUFtSDtBQUNuSCx3REFBd0Q7QUFDeEQsNENBQTRDO0FBQzVDLG9CQUFvQjtBQUNwQixnQkFBZ0I7QUFDaEIsWUFBWTtBQUNaLFFBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vLi4vQ29tbW9uL09kc0hlbHBlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vQ29tbW9uL2FwaS9hcGkudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL0NvbW1vbi9hcGkvb2RzL3NlYXJjaC50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9GQl9NYXR0ZXJEZXRhaWxzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhpcyBmaWxlIGNvbnRhaW5zIGhlbHBlciBmdW5jdGlvbnMgZm9yIHdvcmtpbmcgd2l0aCB0aGUgT0RTIEFQSVxuICogX3NlYXJjaCBpcyBhIHdyYXBwZXIgYXJvdW5kIHRoZSBPRFMgc2VhcmNoIGVuZHBvaW50XG4gKi9cbmltcG9ydCB7IElBc3BlY3QgfSBmcm9tIFwiLi4vLi4vVHlwaW5ncy9Bc3BlY3QvSUFzcGVjdFwiO1xuaW1wb3J0IHsgSU9EU09yZ2FuaXNhdGlvblJlc3VsdCB9IGZyb20gXCIuLi8uLi9UeXBpbmdzL09kc0xpc3QvSU9EU09yZ2FuaXNhdGlvblJlc3VsdFwiO1xuaW1wb3J0IHsgSU9EU1BlcnNvblJlc3VsdCB9IGZyb20gXCIuLi8uLi9UeXBpbmdzL09kc0xpc3QvSU9EU1Blb3BsZVNlYXJjaFJlc3VsdFwiO1xuaW1wb3J0IHsgSU9EU2VhcmNoUmVzdWx0IH0gZnJvbSBcIi4uLy4uL1R5cGluZ3MvT2RzTGlzdC9JT0RTU2VhcmNoUmVzdWx0XCI7XG5pbXBvcnQgeyBUU2hhcmVEb0JsYWRlIH0gZnJvbSBcIi4uLy4uL1R5cGluZ3MvU2hhcmVEb0pTL0FkZEVkaXRTaGFyZWRvXCI7XG5pbXBvcnQgeyBJUm9sZUNvbmZpZ01vZGVscyB9IGZyb20gXCIuLi8uLi9UeXBpbmdzL1dpZGdldHNPZHNFbnRpdHlQaWNrZXIvSVJvbGVDb25maWdNb2RlbHNcIjtcbmltcG9ydCB7IElPZHNXaWRnZXQsIElPZHNXaWRnZXRPRFNFbnRpdGllcyB9IGZyb20gXCIuLi8uLi9UeXBpbmdzL1dpZGdldHNPZHNFbnRpdHlQaWNrZXIvSVdpZGdldE9kc0VudGl0eVBpY2tlclwiO1xuaW1wb3J0IHsgX3NlYXJjaCB9IGZyb20gXCIuL2FwaS9vZHMvc2VhcmNoXCI7XG5cblxuLyoqXG4gKiBVc2VzIHRoZSBcIi9hcGkvb2RzL19zZWFyY2hcIiBlbmRwb2ludCB0byBzZWFyY2ggZm9yIHVzZXJzLlxuICogQHBhcmFtIHNlYXJjaCBUaGUgc2VhcmNoIHN0cmluZyB0byB1c2Ugc3VjaCBhcyBzdXJuYW1lIG9yIGVtYWlsIGFkZHJlc3NcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VhcmNoRm9yVXNlcnMoc2VhcmNoOiBzdHJpbmcpIDogUHJvbWlzZTxJT0RTUGVyc29uUmVzdWx0W10+XG4ge1xuICAgIGxldCBwb3N0Qm9keSA9IHtcbiAgICAgICAgXCJzdGFydFBhZ2VcIjogMSxcbiAgICAgICAgXCJlbmRQYWdlXCI6IDEsXG4gICAgICAgIFwicm93c1BlclBhZ2VcIjogMTAsXG4gICAgICAgIFwic2VhcmNoU3RyaW5nXCI6IHNlYXJjaCxcbiAgICAgICAgXCJvZHNFbnRpdHlUeXBlc1wiOiBbXSxcbiAgICAgICAgXCJhdmFpbGFiaWxpdHlcIjoge1xuICAgICAgICAgICAgXCJpc0F2YWlsYWJsZVwiOiBudWxsLFxuICAgICAgICAgICAgXCJpc091dE9mT2ZmaWNlXCI6IG51bGwsXG4gICAgICAgICAgICBcImlzTm90QXZhaWxhYmxlXCI6IG51bGxcbiAgICAgICAgfSxcbiAgICAgICAgXCJsb2NhdGlvblwiOiB7XG4gICAgICAgICAgICBcInBvc3Rjb2RlXCI6IG51bGwsXG4gICAgICAgICAgICBcInJhbmdlXCI6IDEwXG4gICAgICAgIH0sXG4gICAgICAgIFwiY29ubmVjdGlvblwiOiB7XG4gICAgICAgICAgICBcInN5c3RlbU5hbWVcIjogbnVsbFxuICAgICAgICB9LFxuICAgICAgICBcImNvbXBldGVuY2llc1wiOiBbXSxcbiAgICAgICAgXCJ0ZWFtc1wiOiBbXSxcbiAgICAgICAgXCJyb2xlc1wiOiBbXSxcbiAgICAgICAgXCJvZHNUeXBlc1wiOiBbXG4gICAgICAgICAgICBcImFjbFwiLFxuICAgICAgICAgICAgXCJhbHQtZWRpc2NvdmVyeS11c2VyLXR5cGVcIixcbiAgICAgICAgICAgIFwiY2xpZW50XCIsXG4gICAgICAgICAgICBcImRlcGFydG1lbnRcIixcbiAgICAgICAgICAgIFwiZG9jdW1lbnQtdHJhaW5pbmctdHlwZVwiLFxuICAgICAgICAgICAgXCJlbXBsb3llZVwiLFxuICAgICAgICAgICAgXCJleHBlcnRcIixcbiAgICAgICAgICAgIFwiZXh0ZXJuYWwtdGVhbVwiLFxuICAgICAgICAgICAgXCJleHRlcm5hbFwiLFxuICAgICAgICAgICAgXCJwb2RcIixcbiAgICAgICAgICAgIFwic3RydWN0dXJhbFwiLFxuICAgICAgICAgICAgXCJzeXN0ZW0tYWRtaW5pc3RyYXRvclwiXG4gICAgICAgIF0sXG4gICAgICAgIFwid2FsbE1hbmFnZW1lbnRcIjogZmFsc2VcbiAgICB9O1xuICAgIHJldHVybiBzZWFyY2hPZHNBbmRSZXR1cm5Sb3dzPElPRFNQZXJzb25SZXN1bHQ+KHNlYXJjaCxwb3N0Qm9keSk7XG59XG5cbi8qKlxuICogVXNlcyB0aGUgXCIvYXBpL29kcy9fc2VhcmNoXCIgZW5kcG9pbnQgdG8gc2VhcmNoIGZvciBjbGllbnRzLlxuICogQHBhcmFtIHNlYXJjaCBUaGUgc2VhcmNoIHN0cmluZyB0byB1c2Ugc3VjaCBhcyBjbGllbnQgY29kZSBvciBuYW1lXG4gKiBAcmV0dXJucyBBIGxpc3Qgb2YgY2xpZW50c1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VhcmNoRm9yQ2xpZW50cyhzZWFyY2g6IHN0cmluZyk6IFByb21pc2U8SU9EU09yZ2FuaXNhdGlvblJlc3VsdFtdPiB7XG5cbiAgICAgICAgbGV0IHBvc3RCb2R5ID0ge1xuICAgICAgICAgICAgXCJzdGFydFBhZ2VcIjogMSxcbiAgICAgICAgICAgIFwiZW5kUGFnZVwiOiAxLFxuICAgICAgICAgICAgXCJyb3dzUGVyUGFnZVwiOiAxMCxcbiAgICAgICAgICAgIFwic2VhcmNoU3RyaW5nXCI6IHNlYXJjaCxcbiAgICAgICAgICAgIFwib2RzRW50aXR5VHlwZXNcIjogW10sXG4gICAgICAgICAgICBcImF2YWlsYWJpbGl0eVwiOiB7XG4gICAgICAgICAgICAgICAgXCJpc0F2YWlsYWJsZVwiOiBudWxsLFxuICAgICAgICAgICAgICAgIFwiaXNPdXRPZk9mZmljZVwiOiBudWxsLFxuICAgICAgICAgICAgICAgIFwiaXNOb3RBdmFpbGFibGVcIjogbnVsbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwibG9jYXRpb25cIjoge1xuICAgICAgICAgICAgICAgIFwicG9zdGNvZGVcIjogbnVsbCxcbiAgICAgICAgICAgICAgICBcInJhbmdlXCI6IDEwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJjb25uZWN0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICBcInN5c3RlbU5hbWVcIjogbnVsbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiY29tcGV0ZW5jaWVzXCI6IFtdLFxuICAgICAgICAgICAgXCJ0ZWFtc1wiOiBbXSxcbiAgICAgICAgICAgIFwicm9sZXNcIjogW10sXG4gICAgICAgICAgICBcIm9kc1R5cGVzXCI6IFtcbiAgICAgICAgICAgICAgICBcImNsaWVudFwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJ3YWxsTWFuYWdlbWVudFwiOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc2VhcmNoT2RzQW5kUmV0dXJuUm93czxJT0RTT3JnYW5pc2F0aW9uUmVzdWx0PihzZWFyY2gscG9zdEJvZHkpO1xufVxuXG5cbi8vIFJlZ2lvbjogR2V0IGFsbCByb2xlIGNvbmZpZyBmb3Igcm9sZVxuLy8gVGhpcyBpcyBhIGhlbHBlciBmdW5jdGlvbiB0byBnZXQgYWxsIHRoZSByb2xlIGNvbmZpZyBmb3IgYSBnaXZlbiByb2xlXG4vLyBJdCBpcyB1c2VkIGluIHRoZSBcImdldFJvbGVDb25maWdGb3JSb2xlXCIgZnVuY3Rpb24gYmVsb3dcbi8vIHRoZSBpbnRlcmZhY2UgaXMgdXNlZCB0byByZXR1cm4gdGhlIHJlc3VsdHMgb2YgdGhlIGZ1bmN0aW9uXG5cbi8qKlxuICogVGhpcyBpbnRlcmZhY2UgaXMgdXNlZCB0byByZXR1cm4gdGhlIHJlc3VsdHMgb2YgdGhlIGZ1bmN0aW9uXG4gKiBAcHJvcGVydHkgcm9sZUNvbmZpZyAtIHRoZSByb2xlIGNvbmZpZyBmb3IgdGhlIGdpdmVuIHJvbGVcbiAqIEBwcm9wZXJ0eSBPRFNFbnRpdGllcyAtIHRoZSBPRFMgZW50aXRpZXMgZm9yIHRoZSBnaXZlbiByb2xlXG4gKiBCb3RoIGFyZSByZXR1cm5lZCBhcyBib3RoIGFyZSBuZWVkZWQgd2hlbiB1cGRhdGluZyB0aGUgd2lkZ2V0XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUdldEFsbFJvbGVDb25maWdGb3JSb2xlIHtcbiAgICByb2xlQ29uZmlnOiBJUm9sZUNvbmZpZ01vZGVsc1tdLFxuICAgIE9EU0VudGl0aWVzOiBJT2RzV2lkZ2V0T0RTRW50aXRpZXNbXVxufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhbGwgdGhlIHJvbGUgY29uZmlnIGZvciBhIGdpdmVuIHJvbGVcbiAqIEBwYXJhbSBibGFkZSBcbiAqIEBwYXJhbSByb2xlIFxuICogQHJldHVybnMgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxSb2xlQ29uZmlnRm9yUm9sZShibGFkZTogVFNoYXJlRG9CbGFkZSB8IHVuZGVmaW5lZCwgcm9sZTogc3RyaW5nKTogSUdldEFsbFJvbGVDb25maWdGb3JSb2xlIHtcbiAgICBsZXQgcmV0VmFsdWU6IElHZXRBbGxSb2xlQ29uZmlnRm9yUm9sZSA9XG4gICAge1xuICAgICAgICByb2xlQ29uZmlnOiBbXSxcbiAgICAgICAgT0RTRW50aXRpZXM6IFtdXG4gICAgfTtcbiAgICBpZiAoIWJsYWRlKSByZXR1cm4gcmV0VmFsdWU7XG5cbiAgICBsZXQgYWxsT2RzQXNwZWN0cyA9IGdldE9kc1dpZGdldHMoYmxhZGUpO1xuXG4gICAgLy8gcC5vcHRpb25zLnJvbGVDb25maWdNb2RlbHMuZm9yRWFjaCgocjphbnkpID0+IHtcbiAgICBhbGxPZHNBc3BlY3RzPy5mb3JFYWNoKGEgPT4ge1xuXG4gICAgICAgIGEud2lkZ2V0Lm9kc0VudGl0aWVzKCkuZm9yRWFjaChvZHMgPT4ge1xuICAgICAgICAgICAgaWYgKCFvZHMucm9sZVN5c3RlbU5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvZHMucm9sZVN5c3RlbU5hbWUoKSA9PT0gcm9sZSkge1xuICAgICAgICAgICAgICAgIHJldFZhbHVlLk9EU0VudGl0aWVzLnB1c2gob2RzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBhLndpZGdldC5vcHRpb25zLnJvbGVDb25maWdNb2RlbHMuZm9yRWFjaChyID0+IHtcbiAgICAgICAgICAgIGlmIChyLnJvbGVTeXN0ZW1OYW1lID09PSByb2xlKSB7XG4gICAgICAgICAgICAgICAgcmV0VmFsdWUucm9sZUNvbmZpZy5wdXNoKHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfSlcblxuICAgIC8vIGlmKCFhbGxPZHNBc3BlY3RzKSByZXR1cm4gcmV0VmFsdWU7XG4gICAgLy8gbGV0IGFzcGVjdFdpdGhQYXJ0bmVyID0gYWxsT2RzQXNwZWN0cy5maWx0ZXIoYT0+YS53aWRnZXQub2RzRW50aXRpZXMoKS5maW5kKChvOmFueSk9Pm8ucm9sZU5hbWU9PT1yb2xlKSk7XG4gICAgLy8gaWYoIWFzcGVjdFdpdGhQYXJ0bmVyKSByZXR1cm4gcmV0VmFsdWU7XG5cbiAgICAvLyBmb3IobGV0IGFzcGVjdCBvZiBhc3BlY3RXaXRoUGFydG5lcilcbiAgICAvLyB7XG4gICAgLy8gICAgIGxldCBvZHNQYXJ0bmVyID0gYXNwZWN0LndpZGdldC5vZHNFbnRpdGllcygpLmZpbmQoKG86YW55KT0+by5yb2xlTmFtZT09PXJvbGUpO1xuICAgIC8vICAgICBpZighb2RzUGFydG5lcikgY29udGludWU7XG4gICAgLy8gICAgIHJldFZhbHVlLnB1c2gob2RzUGFydG5lcik7XG4gICAgLy8gfVxuICAgIHJldHVybiByZXRWYWx1ZTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYWxsIHRoZSByb2xlIGNvbmZpZyBmb3IgYSBnaXZlbiByb2xlXG4gKiBAcGFyYW0gYmxhZGVcbiAqIEBwYXJhbSByb2xlXG4gKiBAcmV0dXJuc1xuKiovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2RzV2lkZ2V0cyhibGFkZTogVFNoYXJlRG9CbGFkZSk6IElBc3BlY3Q8SU9kc1dpZGdldD5bXSB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFibGFkZSkgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIGxldCB0eXBlVG9DaGVjayA9IFNoYXJlZG8uQ29yZS5DYXNlLkFzcGVjdHMuV2lkZ2V0cy5PZHNFbnRpdHlQaWNrZXI7XG5cbiAgICBsZXQgcmV0VmFsdWUgPSBibGFkZS5hc3BlY3RzKCkuZmlsdGVyKGEgPT4gYS53aWRnZXQgaW5zdGFuY2VvZiB0eXBlVG9DaGVjayk7XG4gICAgcmV0dXJuIHJldFZhbHVlO1xuXG59XG5cbi8vICNyZWdpb24gR2V0IGFsbCByb2xlIGNvbmZpZyBmb3Igcm9sZVxuLy8gI3JlZ2lvbiBwcml2YXRlIGZ1bmN0aW9uc1xuLyoqXG4gKiBVc2VzIHRoZSBcIi9hcGkvb2RzL19zZWFyY2hcIiBlbmRwb2ludCB0byBzZWFyY2ggZm9yIGNsaWVudHMuXG4gKiBAcGFyYW0gc2VhcmNoIFRoZSBzZWFyY2ggc3RyaW5nIHRvIHVzZSBzdWNoIGFzIGNsaWVudCBjb2RlIG9yIG5hbWVcbiAqIEByZXR1cm5zIEEgbGlzdCBvZiBjbGllbnRzXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHNlYXJjaE9kc0FuZFJldHVyblJvd3M8VD4oc2VhcmNoOiBzdHJpbmcscG9zdEJvZHk6YW55KTogUHJvbWlzZTxUW10+IHtcbiAgICBsZXQgQVBJUmVzdWx0ID0gYXdhaXQgX3NlYXJjaDxUPihwb3N0Qm9keSk7XG4gICAgLy9sb2cgY29sb3JcbiAgICBjb25zb2xlLmxvZyhcIiVjIE9EUyBTZWFyY2ggUmVzdWx0XCIsIFwiY29sb3I6ICNmZjAwMDBcIiwgQVBJUmVzdWx0KTtcbiAgICBpZighQVBJUmVzdWx0KSBcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiJWMgT0RTIFNlYXJjaCBSZXN1bHQgLSB1bmRlZmluZWRcIiwgXCJjb2xvcjogI2ZmMDAwMFwiKTtcbiAgICAgICAgcmV0dXJuIFtdOyAgXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiJWMgT0RTIFNlYXJjaCBSZXN1bHRcIiwgXCJjb2xvcjogI2ZmMDAwMFwiLCBBUElSZXN1bHQpO1xuICAgIHJldHVybiBleHRyYWN0Um93c0Zyb21PRFNTZWFyY2hSZXN1bHRzPFQ+KEFQSVJlc3VsdCk7XG4gIFxufVxuXG5mdW5jdGlvbiBleHRyYWN0Um93c0Zyb21PRFNTZWFyY2hSZXN1bHRzPFQ+KCBBUElSZXN1bHQ6IElPRFNlYXJjaFJlc3VsdDxUPikgOiBUW11cbiB7XG4gICAgdHJ5XG4gICAge1xuICAgICAgICBsZXQgcmV0VmFsdWUgPSBBUElSZXN1bHQucm93cy5tYXAociA9PiBKU09OLnBhcnNlKHIucmVzdWx0KSk7XG4gICAgICAgIHJldHVybiByZXRWYWx1ZTtcbiAgICB9XG4gICAgY2F0Y2goZSlcbiAgICB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk9EUyBIZWxwZXIgRXJyb3IgdHJ5aW5nIHRvIGV4dHJhY3Qgcm93cyBmcm9tIHNlYXJjaCByZXN1bHRcIiwgZSxBUElSZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gW107XG59XG5cblxuXG4vLyAjZW5kcmVnaW9uIHByaXZhdGUgZnVuY3Rpb25zIiwiXG4vKipcbiAqIFRoaXMgZmlsZSBjb250YWlucyB0aGUgYXBpIGNhbGxzIHRvIHRoZSBiYWNrZW5kLlxuICogdXRpbGlzaW5nIHRoZSBheGlvcyBsaWJyYXJ5IHRvIG1ha2UgdGhlIGNhbGxzLlxuICogaW5jbHVzaW5nIG9mIHdlYnBhY2tJZ25vcmUgaXMgdG8gYWxsb3cgdGhlIHdlYnBhY2sgdG8gaWdub3JlIHRoZSBjYWxscyBhbmQgbm90IHRyeSB0byBidW5kbGUgdGhlbS5cbiAqL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVBvc3Q8VD4oYXBpOiBzdHJpbmcsIHBvc3RCb2R5OiBhbnkpIDogUHJvbWlzZTxUPntcbiAgICAvL3JldHVybiBhd2FpdCAkYWpheC5wb3N0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiBleGVjdXRlRmV0Y2g8VD4oYXBpLFwiUE9TVFwiLHBvc3RCb2R5KTtcbn1cblxuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVHZXQ8VD4oYXBpOiBzdHJpbmcpIDogUHJvbWlzZTxUPntcbi8vICAgICByZXR1cm4gYXdhaXQgJGFqYXguZ2V0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSk7XG4vLyB9IFxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldDxUPihhcGk6IHN0cmluZykgOiBQcm9taXNlPFQ+e1xuICAgcmV0dXJuIGV4ZWN1dGVGZXRjaDxUPihhcGksXCJHRVRcIix1bmRlZmluZWQpO1xufVxuXG5cblxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlUHV0PFQ+KGFwaTogc3RyaW5nLCBwb3N0Qm9keTogYW55KSA6IFByb21pc2U8VD57XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXgucHV0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiBleGVjdXRlRmV0Y2g8VD4oYXBpLFwiUFVUXCIscG9zdEJvZHkpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZURlbGV0ZTxUPihhcGk6IHN0cmluZykgOiBQcm9taXNlPFQ+e1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LmRlbGV0ZSgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSkpO1xuICAgIHJldHVybiBleGVjdXRlRmV0Y2g8VD4oYXBpLFwiREVMRVRFXCIsdW5kZWZpbmVkKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVBcGkoYXBpOiBzdHJpbmcpIDogc3RyaW5ne1xuICAgbGV0IGxvY2F0aW9uPSAgd2luZG93LmRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbjtcblxuICAgLy9pZiBhcGkgZG9lcyBub3QgaW5jbHVkZSB0aGUgbG9jYXRpb24gdGhlbiBhZGQgaXQuXG4gICAgaWYoYXBpLmluZGV4T2YobG9jYXRpb24pID09PSAtMSl7XG4gICAgICAgIC8vY2hlY2sgaWYgYXBpIHN0YXJ0IHdpdGggYSAvIGlmIG5vdCBhZGQgaXQuXG4gICAgICAgIGlmKGFwaS5pbmRleE9mKFwiL1wiKSAhPT0gMCl7XG4gICAgICAgICAgICBhcGkgPSBcIi9cIiArIGFwaTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXBpID0gbG9jYXRpb24gKyBhcGk7XG4gICAgfVxuICAgIHJldHVybiBhcGk7XG4gICAgXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlRmV0Y2g8VD4oYXBpOiBzdHJpbmcsIG1ldGhvZDpzdHJpbmcsZGF0YTphbnkpIDogUHJvbWlzZTxUPntcbiAgICBsZXQgdXJsID0gdmFsaWRhdGVBcGkoYXBpKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gYnVpbGRIZWFkZXJzKCk7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGZldGNoSGVhZGVycyxcbiAgICAgICAgYm9keTogZGF0YT8gSlNPTi5zdHJpbmdpZnkoZGF0YSk6IHVuZGVmaW5lZFxuICAgIH1cbiAgICApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgIC8vY2hlY2sgaWYgcmVzcG9uc2UgaXMgSlNPTlxuICAgICAgICBpZihyZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKT8uaW5kZXhPZihcImFwcGxpY2F0aW9uL2pzb25cIikgPT09IC0xKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlc3BvbnNlIHdhcyBub3QgSlNPTlwiKTtcbiAgICAgICAgfVxuICAgICAgICAvL3JldHVybiB0aGUganNvbiBhcyBvYmplY3RcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkSGVhZGVycygpIHtcbiAgICBsZXQgYmVhcmVyID0gZ2V0QmVhcmVyVG9rZW4oKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBmZXRjaEhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICBpZiAoYmVhcmVyKSB7XG4gICAgICAgIGZldGNoSGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIGJlYXJlcik7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaEhlYWRlcnM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb2tpZXMoKTogeyBba2V5OnN0cmluZ106c3RyaW5nIH1cbntcbiAgICBsZXQgcmV0VmFsdWU6IHsgW2tleTpzdHJpbmddOnN0cmluZyB9ID0ge307XG4gICAgbGV0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpLnJlZHVjZShmdW5jdGlvbiAoY29va2llcywgY29va2llKVxuICAgIHtcbiAgICAgICAgdmFyIHBhcnRzID0gY29va2llLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhcnRzWzBdLnRyaW0oKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzWzFdO1xuXG4gICAgICAgICAgICByZXRWYWx1ZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvb2tpZXM7XG4gICAgfSwge30pO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJlYXJlclRva2VuKClcbntcbiAgICB2YXIgY29va2llcyA9IGdldENvb2tpZXMoKTtcbiAgICB2YXIgdG9rZW4gPSBjb29raWVzW1wiX2FwaVwiXTtcblxuICAgIGlmKCB0b2tlbiApIHJldHVybiBcIkJlYXJlciBcIiArIHRva2VuO1xuICAgIHJldHVybiBudWxsO1xufTsiLCJpbXBvcnQgeyBJT0RTU2VhcmNoUG9zdEJvZHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwaW5ncy9hcGkvb2RzL19zZWFyY2hcIjtcbmltcG9ydCB7IElPRFNlYXJjaFJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi8uLi9UeXBpbmdzL09kc0xpc3QvSU9EU1NlYXJjaFJlc3VsdFwiO1xuaW1wb3J0IHsgZXhlY3V0ZVBvc3QgfSBmcm9tIFwiLi4vYXBpXCI7XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIF9zZWFyY2g8VD4ocG9zdEJvZHk6SU9EU1NlYXJjaFBvc3RCb2R5KSA6IFByb21pc2U8SU9EU2VhcmNoUmVzdWx0PFQ+IHwgdW5kZWZpbmVkPlxue1xuICAgIHRyeVxuICAgIHtcbiAgICAgICAgbGV0IGFwaSA9IFwiL2FwaS9vZHMvX3NlYXJjaFwiO1xuICAgICAgICByZXR1cm4gYXdhaXQgZXhlY3V0ZVBvc3Q8SU9EU2VhcmNoUmVzdWx0PFQ+Pih3aW5kb3cuZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luICsgYXBpLCBwb3N0Qm9keSk7XG4gICAgfVxuICAgIGNhdGNoIChlKVxuICAgIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT0RTIFNlYXJjaCBFcnJvclwiLCBlLHBvc3RCb2R5KTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcbmltcG9ydCB7IElGb3JtQnVpbGRlckNvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwaW5ncy9Gb3JtQnVpbGRlci9JRm9ybUJ1aWxkZXJDb250ZXh0XCI7XG5pbXBvcnQgeyBJU2hhcmVEb09wdGlvblNldCB9IGZyb20gXCIuLi8uLi8uLi8uLi9UeXBpbmdzL09wdGlvblNldHMvSVNoYXJlRG9PcHRpb25TZXRcIjtcbmltcG9ydCB7IElPZHNFbnRpdHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwaW5ncy9XaWRnZXRzT2RzRW50aXR5UGlja2VyL0lPZHNFbnRpdHlcIjtcbmltcG9ydCB7ICBnZXRBbGxSb2xlQ29uZmlnRm9yUm9sZSwgc2VhcmNoRm9yQ2xpZW50cywgc2VhcmNoRm9yVXNlcnMgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL09kc0hlbHBlclwiO1xuaW1wb3J0IHsgZXhlY3V0ZUdldCwgZXhlY3V0ZVBvc3QgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL2FwaS9hcGlcIjtcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSBcIi4uLy4uLy4uL01vZHVsZUxvYWRlci9BbHBoYWNhQWRhcHRlclwiO1xuaW1wb3J0IHsgSUV4cGVydE1hdHRlciB9IGZyb20gXCIuLi9UeXBpbmdzL0lFeHBlcnRNYXR0ZXJEYXRhXCI7XG5cbnR5cGUgT2RzV2lkZ2V0ID0ge1xuICAgIFtrZXk6c3RyaW5nXTogYW55XG59O1xuXG4vL2NvbnN0YW50cyBcbmNvbnN0IG1hdHRlclBhcnRuZXJSb2xlU3lzdGVtTmFtZSA9IFwibWF0dGVyLXBhcnRuZXJcIjtcbmNvbnN0IGNsaWVudFJvbGVTeXN0ZW1OYW1lID0gXCJjbGllbnRcIjtcblxuLy9UaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBmcm9tIHRoZSBtb2R1bGUtbG9hZGVyIHdlYmNvbXBvbmVudCBpbiB0aGUgZm9ybSBidWlsZGVyXG5leHBvcnQgZnVuY3Rpb24gcnVuTWUoY29udGV4dDogSUZvcm1CdWlsZGVyQ29udGV4dCkgOiBib29sZWFuIHtcbiAgIFxuICAgIGxldCB7IGV4cGVydE1hdHRlck51bWJlciwgbWF0dGVyRGV0YWlscywgcGlwZWxpbmVNYXR0ZXIgfSA9IGNyZWF0ZVZhcmlhYmxlcyhjb250ZXh0KTtcblxuICAgIGlmKCFleHBlcnRNYXR0ZXJOdW1iZXIpIHRocm93IG5ldyBFcnJvcihcIk5vIGV4cGVydE1hdHRlck51bWJlclwiKTtcbiAgICBpZighbWF0dGVyRGV0YWlscykgdGhyb3cgbmV3IEVycm9yKFwiTm8gbWF0dGVyRGV0YWlsc1wiKTtcbiAgICBpZighcGlwZWxpbmVNYXR0ZXIpIHRocm93IG5ldyBFcnJvcihcIk5vIHBpcGVsaW5lTWF0dGVyXCIpO1xuICAgIFxuICAgICh3aW5kb3cgYXMgYW55KS50ZXN0ZXIgPSBjb250ZXh0OyAvL2p1c3QgZm9yIGRlYnVnZ2luZ1xuICAgIFxuICAgIGlmKGNvbnRleHQud29ya0l0ZW1Db250ZXh0LmlkKCkgIT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGVuc3VyZVJlYWRPbmx5RmllbGRzKGNvbnRleHQpO1xuICAgICAgIC8vIHZhbGlkYXRlVGVtcE1hdHRlck51bWJlcihjb250ZXh0KTtcbiAgICAgICAgbGV0IGV4aXQgPSB0cnVlO1xuICAgICAgICAvL2lmIHRoZSB3b3JrIGl0ZW0gaXMgbmV3IG9yIGluIGRyYWZ0IGRvbnQgZXhpdFxuICAgICAgICBpZihjb250ZXh0LndvcmtJdGVtQ29udGV4dD8ucGhhc2VOYW1lKCk/LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoXCJkcmFmdFwiKSB8fCAhY29udGV4dC53b3JrSXRlbUNvbnRleHQ/LnBoYXNlTmFtZSgpKVxuICAgICAgICB7XG4gICAgICAgICAgICBleGl0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGV4aXQ9PT10cnVlKVxuICAgICAgICB7XG4gICAgICAgICAgICAgLy9vbmx5IHJ1biB0aGlzIGNvZGUgaWYgdGhlIHdvcmsgaXRlbSBpcyBuZXdcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWMgW01vZHVsZUxvYWRlcl0gRkJfTWF0dGVyRGV0YWlscyAtIGV4aXQgKG9ubHkgcnVuIG9uIG5ldylcIiwgXCJiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NVwiLCBjb250ZXh0LndvcmtJdGVtQ29udGV4dC5pZCgpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWMgW01vZHVsZUxvYWRlcl0gY29udGV4dC53b3JrSXRlbUNvbnRleHQuaWQoKSBcIiwgXCJiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NVwiLCBjb250ZXh0LndvcmtJdGVtQ29udGV4dC5pZCgpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWMgW01vZHVsZUxvYWRlcl0gY29udGV4dC53b3JrSXRlbUNvbnRleHQ/LnBoYXNlTmFtZSgpIFwiLCBcImJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1XCIsIGNvbnRleHQud29ya0l0ZW1Db250ZXh0Py5waGFzZU5hbWUoKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuICAgICh3aW5kb3cgYXMgYW55KS5hc3BlY3REZWJ1Z2VyID0gKHdpbmRvdyBhcyBhbnkpLmFzcGVjdERlYnVnZXIgfHwge307XG4gICAgKHdpbmRvdyBhcyBhbnkpLmFzcGVjdERlYnVnZXIubWF0dGVyRGV0YWlsc0Zvcm1CdWlsZGVyID0gbWF0dGVyRGV0YWlscztcblxuICAgIGhpZGVTaG93TWF0dGVyRGV0YWlscyhjb250ZXh0LG1hdHRlckRldGFpbHMsIGV4cGVydE1hdHRlck51bWJlciwgcGlwZWxpbmVNYXR0ZXIpO1xuICAgIC8vYWRkIGEgY2hhbmdlIGV2ZW50IHRvIHRoZSBleHBlcnQtbWF0dGVyLW51bWJlclxuICAgIGFkZEV2ZW50SGFuZGxlcnMoY29udGV4dCwgbWF0dGVyRGV0YWlscywgZXhwZXJ0TWF0dGVyTnVtYmVyLCBwaXBlbGluZU1hdHRlcik7XG4gICAgLy9nZW5lcmF0ZVRlbXBNYXR0ZXJOdW1iZXIoY29udGV4dCk7XG4gICAgdmFsaWRhdGVJZlBpcGVsaW5lTWF0dGVyKGNvbnRleHQsbWF0dGVyRGV0YWlscyk7XG5cbiAgICAkdWkuZXZlbnRzLmJyb2FkY2FzdChcInNjcmlwdC5tYXR0ZXJEZXRhaWxzTG9hZGVkXCIsIGNvbnRleHQpO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgdmFyaWFibGVzIGZvciB0aGUgZm9ybS5cbmZ1bmN0aW9uIGNyZWF0ZVZhcmlhYmxlcyhjb250ZXh0OiBJRm9ybUJ1aWxkZXJDb250ZXh0KSB7XG4gICAgLy8gR2V0IHRoZSBmaWVsZHNcbiAgICAvLyBsZXQgbWF0dGVyRGV0YWlscyA9IGNvbnRleHQuZmllbGRzW2VudW1GaWVsZHMubWF0dGVyRGV0YWlsc107XG5cbiAgICBpZighY29udGV4dC5mb3JtKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBmb3JtXCIpO1xuXG4gICAgbGV0IG1hdHRlckRldGFpbHMgPSBjb250ZXh0LmZvcm0uZmllbGRzQnlJZFtlbnVtRmllbGRzLm1hdHRlckRldGFpbHNdOyBcbiAgICBsZXQgZXhwZXJ0TWF0dGVyTnVtYmVyID0gY29udGV4dC5mb3JtLmZpZWxkc0J5SWRbZW51bUZpZWxkcy5leHBlcnRNYXR0ZXJOdW1iZXJdO1xuICAgIGxldCBwaXBlbGluZU1hdHRlciA9IGNvbnRleHQuZm9ybS5maWVsZHNCeUlkW2VudW1GaWVsZHMucGlwZWxpbmVNYXR0ZXJdO1xuICAgIFxuXG4gICAgLy8gUmV0dXJuIHRoZSB2YXJpYWJsZXNcbiAgICByZXR1cm4geyBleHBlcnRNYXR0ZXJOdW1iZXIsIG1hdHRlckRldGFpbHMsIHBpcGVsaW5lTWF0dGVyIH07XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50SGFuZGxlcnMoY29udGV4dDogSUZvcm1CdWlsZGVyQ29udGV4dCwgbWF0dGVyRGV0YWlsczogRm9ybUJ1aWxkZXIsIGV4cGVydE1hdHRlck51bWJlcjogRm9ybUJ1aWxkZXIsIHBpcGVsaW5lTWF0dGVyOiBGb3JtQnVpbGRlcikge1xuICAgIGlmKCFjb250ZXh0LmZvcm0pIHRocm93IG5ldyBFcnJvcihcIk5vIGZvcm1cIik7XG4gICAgLy9hZGQgZXZlbnQgaGFuZGxldCBmb3IgZXhwZXJ0LW1hdHRlci1udW1iZXIgY2hhbmdlZFxuICAgIG1hdHRlckRldGFpbHMuZmllbGRzQnlJZFtlbnVtTWF0dGVyRGV0YWlsRmllbGRzLm1hdHRlckRldGFpbHNQYXJ0bmVyTmFtZV0/Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICh0aGlzOiBhbnksIGV2OiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCIlYyBQYXJ0bmVyIG5hbWUgY2hhbmdlZCB0bzogXCIgKyBtYXR0ZXJEZXRhaWxzLmZpZWxkc0J5SWRbZW51bU1hdHRlckRldGFpbEZpZWxkcy5tYXR0ZXJEZXRhaWxzUGFydG5lck5hbWVdPy5nZXRWYWx1ZSgpLCBcImNvbG9yOiBwaW5rOyBmb250LXNpemU6IDIwcHg7XCIpO1xuICAgIH0pO1xuXG4gICAgLy9hZGQgZXZlbnQgaGFuZGxldCBmb3IgZXhwZXJ0LW1hdHRlci1udW1iZXIgY2hhbmdlZFxuICAgIGNvbnRleHQuZm9ybS5maWVsZHNCeUlkW2VudW1GaWVsZHMuZXhwZXJ0TWF0dGVyTnVtYmVyXT8ub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKHRoaXM6IGFueSwgZXY6IGFueSkge1xuICAgICAgICAvLyBoaWRlIG9yIHNob3cgdGhlIG1hdHRlciBkZXRhaWxzIGZpZWxkXG4gICAgICAgIGhpZGVTaG93TWF0dGVyRGV0YWlscyhjb250ZXh0LG1hdHRlckRldGFpbHMsIGV4cGVydE1hdHRlck51bWJlciwgcGlwZWxpbmVNYXR0ZXIpO1xuICAgICAgICAvLyB1cGRhdGUgdGhlIG1hdHRlciBkZXRhaWxzIGZpZWxkXG4gICAgICAgIHVwZGF0ZU1hdHRlckRldGFpbHMoY29udGV4dCxtYXR0ZXJEZXRhaWxzLCBleHBlcnRNYXR0ZXJOdW1iZXIsIHBpcGVsaW5lTWF0dGVyKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGV2ZW50IGhhbmRsZXQgZm9yIHBpcGVsaW5lLW1hdHRlciBjaGFuZ2VkXG4gICAgY29udGV4dC5mb3JtLmZpZWxkc0J5SWRbZW51bUZpZWxkcy5waXBlbGluZU1hdHRlcl0/Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICh0aGlzOiBhbnksIGV2OiBhbnkpIHtcbiAgICAgICAgLy8gaGlkZSBvciBzaG93IHRoZSBtYXR0ZXIgZGV0YWlscyBmaWVsZFxuICAgICAgICBoaWRlU2hvd01hdHRlckRldGFpbHMoY29udGV4dCxtYXR0ZXJEZXRhaWxzLCBleHBlcnRNYXR0ZXJOdW1iZXIsIHBpcGVsaW5lTWF0dGVyKTtcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBtYXR0ZXIgZGV0YWlscyBmaWVsZFxuICAgICAgICB1cGRhdGVNYXR0ZXJEZXRhaWxzKGNvbnRleHQsbWF0dGVyRGV0YWlscywgZXhwZXJ0TWF0dGVyTnVtYmVyLCBwaXBlbGluZU1hdHRlcik7IFxuICAgIH0pO1xuXG4gICAgLy9hZGQgZXZlbnQgaGFuZGxldCBmb3IganVyaXNkaWN0aW9uIGNoYW5nZWRcbiAgICAvL3VwZGF0ZSB0aGUgT09CIEp1cmlzZGljdGlvbiBhc3BlY3QgZmllbGQgYW5kIGZvcm1idWlsZGVyIGZpZWxkc1xuICAgIGNvbnRleHQuZm9ybS5maWVsZHNCeUlkW2VudW1GaWVsZHMuanVyaXNkaWN0aW9uc0NvdW50cnldPy5vbihcImNoYW5nZVwiLCBhc3luYyBmdW5jdGlvbiAodGhpczogYW55LCBldjogYW55KSB7XG4gICAgICAgIC8vdXBkYXRlIGJsYWRlIGp1cmlzZGljdGlvbiAgICAgXG4gICAgICAgIGxldCBzZWxlY3RlZElkID0gY29udGV4dC5mb3JtPy5maWVsZHNCeUlkW1wianVyaXNkaWN0aW9ucy1jb3VudHJ5XCJdPy5nZXRWYWx1ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIiVjIEp1cmlzZGljdGlvbiBjaGFuZ2VkIHRvOiBcIiArIGNvbnRleHQuZm9ybT8uZmllbGRzQnlJZFtcImp1cmlzZGljdGlvbnMtY291bnRyeVwiXT8uZ2V0VmFsdWUoKSwgXCJjb2xvcjogcmVkOyBmb250LXNpemU6IDIwcHg7XCIpO1xuICAgICAgICBsZXQgYXNwZWN0ID0gY29udGV4dC5nZXRBc3BlY3QoXCJTaGFyZWRvLkNvcmUuTGVnYWwuQXNwZWN0cy5XaWRnZXRzLkluc3RydWN0aW9uV29ya1R5cGVEZXRhaWxzXCIpO1xuICAgICAgICBsZXQgc2VsZWN0ZWRKdXJpc2RpY3Rpb25Db3VudHJ5ID0gYXdhaXQgJGFqYXguZ2V0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi9gL2FwaS92MS9wdWJsaWMvbW9kZWxsZXIvb3B0aW9uU2V0cy9hbGxWYWx1ZXMvJHtzZWxlY3RlZElkfWApIGFzIElTaGFyZURvT3B0aW9uU2V0O1xuICAgICAgICBpZiAoIXNlbGVjdGVkSnVyaXNkaWN0aW9uQ291bnRyeSkge1xuICAgICAgICAgICAgLy9sb2cgaXNzdWVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWMgW01vZHVsZUxvYWRlcl0gZ2V0QXNwZWN0IHJldHVybiB2YWx1ZVwiLCBcImJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1XCIsIHNlbGVjdGVkSnVyaXNkaWN0aW9uQ291bnRyeSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9wdGlvbnMgPSBhd2FpdCAkYWpheC5nZXQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqL2AvYXBpL3YxL3B1YmxpYy9tb2RlbGxlci9vcHRpb25TZXRzL2p1cmlzZGljdGlvbnMvdmFsdWVzYCk7XG4gICAgICAgIGxldCBzZWxlY3RlZEp1cmlzZGljdGlvbiA9IG9wdGlvbnMuZmluZCgob3B0aW9uOiBJU2hhcmVEb09wdGlvblNldCkgPT4gb3B0aW9uLm5hbWUgPT09IHNlbGVjdGVkSnVyaXNkaWN0aW9uQ291bnRyeS5uYW1lKTtcbiAgICAgICAgaWYgKCFzZWxlY3RlZEp1cmlzZGljdGlvbikge1xuICAgICAgICAgICAgLy9sb2cgaXNzdWVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWMgW01vZHVsZUxvYWRlcl0gZ2V0QXNwZWN0IHJldHVybiB2YWx1ZVwiLCBcImJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1XCIsIHNlbGVjdGVkSnVyaXNkaWN0aW9uKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhc3BlY3Qud2lkZ2V0Lmluc3RydWN0aW9uLmp1cmlzZGljdGlvbklkKHNlbGVjdGVkSnVyaXNkaWN0aW9uLmlkKTtcbiAgICB9KTtcbn1cblxuLy8gaGlkZSBvciBzaG93IHRoZSBtYXR0ZXIgZGV0YWlscyBmaWVsZFxuZnVuY3Rpb24gaGlkZVNob3dNYXR0ZXJEZXRhaWxzKGNvbnRleHQ6IElGb3JtQnVpbGRlckNvbnRleHQsbWF0dGVyRGV0YWlsczogRm9ybUJ1aWxkZXIgLCBleHBlcnRNYXR0ZXJOdW1iZXI6IEZvcm1CdWlsZGVyLCBwaXBlbGluZU1hdHRlcjogRm9ybUJ1aWxkZXIpIHtcbiAgICBzZXRNYXR0ZXJEZXRhaWxzU3RhdGUoY29udGV4dCxtYXR0ZXJEZXRhaWxzLCBwaXBlbGluZU1hdHRlci5nZXRWYWx1ZSgpKTtcbn1cblxuLy8gbWFrZSBhbGwgY2hpbGQgcHJvcGVydGllcyByZWFkb25seVxuZnVuY3Rpb24gc2V0TWF0dGVyRGV0YWlsc1N0YXRlKGNvbnRleHQ6IElGb3JtQnVpbGRlckNvbnRleHQsbWF0dGVyRGV0YWlsczogRm9ybUJ1aWxkZXIsIHN0YXR1czogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBpZighbWF0dGVyRGV0YWlscy5maWVsZHMpIHRocm93IG5ldyBFcnJvcihcIk5vIGZpZWxkc1wiKTtcbiAgICBpZighbWF0dGVyRGV0YWlscy5maWVsZHNCeUlkKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBmaWVsZHNCeUlkXCIpO1xuICAgIC8vIGdldCBhbGwgdGhlIGNoaWxkIHByb3BlcnRpZXNcbiAgICBtYXR0ZXJEZXRhaWxzLmZpZWxkcy5mb3JFYWNoKGNoaWxkID0+XG4gICAge1xuICAgICAgICAvLyBzZXQgdGhlIHJlYWRvbmx5IHN0YXR1cyBvZiB0aGUgY2hpbGQgcHJvcGVydHlcbiAgICAgICAgY2hpbGQucmVhZG9ubHkoIXN0YXR1cyk7XG4gICAgfSk7XG5cbiAgICAvLyBzZXQgdGhlIHJlYWRvbmx5IHN0YXR1cyBvZiB0aGUgbWF0dGVyIGRldGFpbHMgc3ViIGFyZWFcbiAgICBtYXR0ZXJEZXRhaWxzLmZpZWxkc0J5SWRbZW51bU1hdHRlckRldGFpbEZpZWxkcy5tYXR0ZXJEZXRhaWxzSWJMYXN0Q2hlY2tlZF0/LmhpZGRlbih0cnVlKTtcblxuICAgIGVuc3VyZVJlYWRPbmx5RmllbGRzKGNvbnRleHQpO1xuXG5cbn1cblxuLy8gY2xlYXIgYWxsIHRoZSBjaGlsZCBwcm9wZXJ0aWVzIG9mIHRoZSBtYXR0ZXIgZGV0YWlscyBzdWIgYXJlYSBvZiB0aGUgZm9ybSBidWlsZGVyXG5hc3luYyBmdW5jdGlvbiBjbGVhck1hdHRlckRldGFpbHMobWF0dGVyRGV0YWlsczogRm9ybUJ1aWxkZXIpIHtcbiAgICBtYXR0ZXJEZXRhaWxzLmZpZWxkcz8uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQ6IGFueSkge1xuICAgICAgICBjaGlsZC5zZXRWYWx1ZShcIlwiKTtcbiAgICB9KTsgXG59XG5cblxuLyogXG4xLiBXZSBmaXJzdCBnZXQgdGhlIGRhdGEgZnJvbSB0aGUgZW5kcG9pbnQgYnkgY2FsbGluZyBnZXRNYXR0ZXJEYXRhKCkgZnVuY3Rpb25cbjIuIFRoZW4gd2UgY2xlYXIgdGhlIG1hdHRlckRldGFpbHNcbjMuIFdlIGZpbmQgdGhlIHNlbGVjdGVkIG1hdHRlciBieSB1c2luZyB0aGUgbWF0dGVyIGNvZGUgYW5kIGNsaWVudCBjb2RlIGZyb20gdGhlIGRhdGEgd2UgZ290IGZyb20gdGhlIGVuZHBvaW50XG40LiBJZiB0aGUgbWF0dGVyIGlzIHVuZGVmaW5lZCwgd2UgY2xlYXIgdGhlIG1hdHRlckRldGFpbHMgYW5kIHJldHVyblxuNS4gSWYgdGhlIG1hdHRlciBpcyBub3QgdW5kZWZpbmVkLCB3ZSBzZXQgdGhlIHZhbHVlcyBvZiB0aGUgbWF0dGVyRGV0YWlscyBmaWVsZHMgKi9cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZU1hdHRlckRldGFpbHMoY29udGV4dDogSUZvcm1CdWlsZGVyQ29udGV4dCxtYXR0ZXJEZXRhaWxzOiBGb3JtQnVpbGRlciwgZXhwZXJ0TWF0dGVyTnVtYmVyOiBGb3JtQnVpbGRlciwgcGlwZWxpbmVNYXR0ZXI6IEZvcm1CdWlsZGVyKSB7XG5cbiAgICBcbiAgICBsZXQgZGF0YSA9IGF3YWl0IGdldE1hdHRlckRhdGEoZXhwZXJ0TWF0dGVyTnVtYmVyLmdldFZhbHVlKCkpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIC8vY2xlYXJNYXR0ZXJEZXRhaWxzKG1hdHRlckRldGFpbHMpOyAvL2NsZWFyIHRoZSBtYXR0ZXIgZGV0YWlscyBmb3JtXG4gICAgbGV0IHNlbGVjdGVkTWF0dGVyID0gZGF0YS5maW5kKGZ1bmN0aW9uIChtYXR0ZXI6IGFueSkge1xuICAgICAgICAvL3NldCB0aGUgZGlzcGxheSBwb3J0aW9uIG9mIHRoZSBleHBlcnQtbWF0dGVyLW51bWJlciBmaWVsZFxuICAgICAgIC8vIHJldHVybiBleHBlcnRNYXR0ZXJOdW1iZXIuZ2V0VmFsdWUoKSA9PT0gYCR7bWF0dGVyLmRhdGEubWF0dGVyQ29kZX0gLSAke21hdHRlci5kYXRhLmNsaWVudC5uYW1lfWA7XG4gICAgICAgcmV0dXJuIGV4cGVydE1hdHRlck51bWJlci5nZXRWYWx1ZSgpID09PSBtYXR0ZXIuZGF0YS5tYXR0ZXJDb2RlO1xuICAgICAgICBcbiAgICB9KTtcblxuICAgIGlmIChzZWxlY3RlZE1hdHRlciA9PT0gdW5kZWZpbmVkIHx8IHBpcGVsaW5lTWF0dGVyLmdldFZhbHVlKCkgPT09IHRydWUpIHsgLy9pZiB0aGUgbWF0dGVyIGlzIG5vdCBmb3VuZCBvciBpZiB0aGUgbWF0dGVyIGlzIGEgcGlwZWxpbmUgbWF0dGVyLCBjbGVhciB0aGUgbWF0dGVyIGRldGFpbHMgZm9ybSBhbmQgcmV0dXJuXG4gICAgICAgIGNsZWFyTWF0dGVyRGV0YWlscyhtYXR0ZXJEZXRhaWxzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmKCFtYXR0ZXJEZXRhaWxzLnBhcmVudD8uZmllbGRzQnlJZCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gY2xpZW50XCIpO1xuICAgIGxldCB0ZW1wTWF0dGVyTnVtYmVyID0gbWF0dGVyRGV0YWlscy5wYXJlbnQ/LmZpZWxkc0J5SWRbJ3RlbXAtbWF0dGVyLW51bWJlciddPy5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKHRlbXBNYXR0ZXJOdW1iZXIgPT09IHVuZGVmaW5lZCB8fCB0ZW1wTWF0dGVyTnVtYmVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBtYXR0ZXJEZXRhaWxzLnBhcmVudC5jaGlsZHJlbkJ5UHJvcGVydHlJZFsndGVtcC1tYXR0ZXItbnVtYmVyJ10uc2V0VmFsdWUoXCJOL0FcIik7XG4gICAgfVxuXG4gICAgIC8vc2V0IHRoZSB2YWx1ZSBwb3J0aW9uIG9mIHRoZSBleHBlcnQtbWF0dGVyLW51bWJlciBmaWVsZFxuICAgICBjb250ZXh0LmZvcm0/LmZpZWxkc0J5SWRbZW51bUZpZWxkcy5leHBlcnRNYXR0ZXJOdW1iZXJWYWx1ZV0/LnNldFZhbHVlKHNlbGVjdGVkTWF0dGVyPy5kYXRhPy5tYXR0ZXJDb2RlIHx8IFwiXCIpO1xuICAgICAgIFxuXG4gICAgbWF0dGVyRGV0YWlscy5maWVsZHNCeUlkW2VudW1NYXR0ZXJEZXRhaWxGaWVsZHMubWF0dGVyRGV0YWlsc0NsaWVudE5hbWVdPy5zZXRWYWx1ZShzZWxlY3RlZE1hdHRlcj8uZGF0YT8uY2xpZW50Py5uYW1lIHx8IFwiXCIpO1xuICAgIG1hdHRlckRldGFpbHMuZmllbGRzQnlJZFtlbnVtTWF0dGVyRGV0YWlsRmllbGRzLm1hdHRlckRldGFpbHNDbGllbnRDb2RlXT8uc2V0VmFsdWUoc2VsZWN0ZWRNYXR0ZXI/LmRhdGE/LmNsaWVudD8uY29kZSB8fCBcIlwiKTtcbiAgIC8vIG1hdHRlckRldGFpbHMuZmllbGRzQnlJZFtlbnVtTWF0dGVyRGV0YWlsRmllbGRzLm1hdHRlckRldGFpbHNQcmFjdGljZUFyZWFdPy5zZXRWYWx1ZShzZWxlY3RlZE1hdHRlcj8uZGF0YT8ucHJhY3RpY2VBcmVhPy5uYW1lIHx8IFwiXCIpO1xuICAgIG1hdHRlckRldGFpbHMuZmllbGRzQnlJZFtlbnVtTWF0dGVyRGV0YWlsRmllbGRzLm1hdHRlckRldGFpbHNOYW1lXT8uc2V0VmFsdWUoc2VsZWN0ZWRNYXR0ZXI/LmRhdGE/LnNob3J0TmFtZSB8fCBcIlwiKTtcbiAgICBtYXR0ZXJEZXRhaWxzLmZpZWxkc0J5SWRbZW51bU1hdHRlckRldGFpbEZpZWxkcy5tYXR0ZXJEZXRhaWxzUGFydG5lck5hbWVdPy5zZXRWYWx1ZShzZWxlY3RlZE1hdHRlcj8uZGF0YT8ucGFydG5lcj8ubmFtZSB8fCBcIlwiKTtcbiAgICBtYXR0ZXJEZXRhaWxzLmZpZWxkc0J5SWRbZW51bU1hdHRlckRldGFpbEZpZWxkcy5tYXR0ZXJEZXRhaWxzSWJdPy5zZXRWYWx1ZShzZWxlY3RlZE1hdHRlcj8uZGF0YT8uc2VjdXJlIHx8IFwiXCIpO1xuXG4gICAgY29uc29sZS5sb2coXCJtYXR0ZXJEZXRhaWxzLmlzVmFsaWQoKTpcIiArIG1hdHRlckRldGFpbHMuaXNWYWxpZCgpKTtcblxuXG4gICAgdHJ5XG4gICAge1xuICAgICAgICB0cnlVcGRhdGVDbGllbnRPZHNQaWNrZXIoc2VsZWN0ZWRNYXR0ZXIsIGNvbnRleHQpO1xuICAgIH1cbiAgICBjYXRjaChlKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gYXV0byB1cGRhdGluZyBvZHMgcGlja2VycywgdXNlciByZXF1aXJlZCB0byBzZWxlY3QgbWFudWFsbHlcIik7XG4gICAgfVxuXG4gICAgdHJ5XG4gICAge1xuICAgICAgICB0cnlVcGRhdGVQYXJ0bmVyT2RzUGlja2VyKHNlbGVjdGVkTWF0dGVyLCBjb250ZXh0KTtcbiAgICB9XG4gICAgY2F0Y2goZSlcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIGF1dG8gdXBkYXRpbmcgb2RzIHBpY2tlcnMsIHVzZXIgcmVxdWlyZWQgdG8gc2VsZWN0IG1hbnVhbGx5XCIpO1xuICAgIH1cbiAgICBcbn1cblxuXG4vKipcbiAqIFRyeSB0byB1cGRhdGUgdGhlIGNsaWVudCBvZHMgcGlja2VyIHVzaW5nIHRoZSBzZWxlY3RlZCBtYXR0ZXIgXG4gKiBVc2VzIHNlYXJjaEZvckNsaWVudCBmdW5jdGlvbiB3aGljIGlzIGEgY29tbW9uIG9kcyBoZWxwZXIgZnVuY3Rpb25cbiAqIEBwYXJhbSBzZWxlY3RlZE1hdHRlciBUaGUgc2VsZWN0ZWQgbWF0dGVyXG4gKiBAcGFyYW0gY29udGV4dCBUaGUgZm9ybSBidWlsZGVyIGNvbnRleHRcbiAqL1xuZnVuY3Rpb24gdHJ5VXBkYXRlQ2xpZW50T2RzUGlja2VyKHNlbGVjdGVkTWF0dGVyOiBJRXhwZXJ0TWF0dGVyLCBjb250ZXh0OiBJRm9ybUJ1aWxkZXJDb250ZXh0KSB7XG4gICAgbGV0IGNsaWVudENvZGUgPSBzZWxlY3RlZE1hdHRlci5kYXRhLmNsaWVudC5jb2RlO1xuICAgIHNlYXJjaEZvckNsaWVudHMoY2xpZW50Q29kZSkudGhlbigoY2xpZW50cykgPT4ge1xuICAgICAgICBsZXQgY2xpZW50ID0gY2xpZW50c1swXTtcbiAgICAgICAgY29uc29sZS5sb2coXCIlYyBGb3VuZCBDbGllbnQgbmFtZSA6IFwiICsgY2xpZW50Py5uYW1lLCBcImNvbG9yOiBwaW5rOyBmb250LXNpemU6IDIwcHg7XCIsIGNsaWVudHMpO1xuICAgICAgICBsZXQgb2RzQ2xpZW50ID0gZ2V0Q2xpZW50T2RzUGlja2VyKGNvbnRleHQpO1xuICAgICAgICBsZXQgb2RzUm9sZUNvbmZpZyA9IG9kc0NsaWVudC5yb2xlQ29uZmlnWzBdO1xuICAgICAgICBsZXQgb2RzRW50aXRpZXMgPSBvZHNDbGllbnQuT0RTRW50aXRpZXNbMF07XG4gICAgXG4gICAgICAgIGlmICghb2RzUm9sZUNvbmZpZyB8fCAhb2RzRW50aXRpZXMpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgaWYgKCFjbGllbnQpIHtcbiAgICAgICAgICAgIG9kc0VudGl0aWVzLnNlbGVjdGVkKGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZW50aXR5IDogSU9kc0VudGl0eSA9IG9kc1JvbGVDb25maWcuYWRkU2VydmljZS5jcmVhdGVTZWxlY3RlZEVudGl0eU1vZGVsKGNsaWVudC5pZCwgXCJvcmdhbmlzYXRpb25cIiwgY2xpZW50Lm5hbWUpO1xuICAgICAgICBvZHNSb2xlQ29uZmlnLmFkZFNlcnZpY2Uuc2VsZWN0ZWRFbnRpdHkoZW50aXR5KTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBUcmllcyB0byB1cGRhdGUgdGhlIHBhcnRuZXIgb2RzIHBpY2tlclxuICogQHBhcmFtIHNlbGVjdGVkTWF0dGVyIFRoZSBzZWxlY3RlZCBtYXR0ZXJcbiAqIEBwYXJhbSBjb250ZXh0ICBUaGUgZm9ybSBidWlsZGVyIGNvbnRleHRcbiAqL1xuZnVuY3Rpb24gdHJ5VXBkYXRlUGFydG5lck9kc1BpY2tlcihzZWxlY3RlZE1hdHRlcjogSUV4cGVydE1hdHRlciwgY29udGV4dDogSUZvcm1CdWlsZGVyQ29udGV4dCkge1xuICAgIGxldCBwYXJ0bmVyTGFzdE5hbWUgPSBzZWxlY3RlZE1hdHRlci5kYXRhLnBhcnRuZXIubmFtZS5zcGxpdChcIixcIilbMF07XG4gICAgc2VhcmNoRm9yVXNlcnMoc2VsZWN0ZWRNYXR0ZXIuZGF0YS5wYXJ0bmVyLmVtYWlsKS50aGVuKCh1c2VycykgPT4ge1xuICAgICAgICBsZXQgdXNlciA9IHVzZXJzWzBdO1xuICAgICAgICBjb25zb2xlLmxvZyhcIiVjIFBhcnRuZXIgbmFtZSBjaGFuZ2VkIHRvOiBcIiArIHVzZXI/LmlkLCBcImNvbG9yOiBwaW5rOyBmb250LXNpemU6IDIwcHg7XCIsIHVzZXIpO1xuICAgICAgICBsZXQgb2RzTWF0dGVyUGFydG5lciA9IGdldFBhcnRuZXJPZHNQaWNrZXIoY29udGV4dCk7XG4gICAgICAgIGxldCBvZHNSb2xlQ29uZmlnID0gb2RzTWF0dGVyUGFydG5lci5yb2xlQ29uZmlnWzBdO1xuICAgICAgICBsZXQgb2RzRW50aXRpZXMgPSBvZHNNYXR0ZXJQYXJ0bmVyLk9EU0VudGl0aWVzWzBdO1xuICAgIFxuICAgICAgICBpZiAoIW9kc1JvbGVDb25maWcgfHwgIW9kc0VudGl0aWVzKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgb2RzRW50aXRpZXMuc2VsZWN0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVudGl0eSA6IElPZHNFbnRpdHkgPSBvZHNSb2xlQ29uZmlnLmFkZFNlcnZpY2UuY3JlYXRlU2VsZWN0ZWRFbnRpdHlNb2RlbCh1c2VyLmlkLCBcInVzZXJcIiwgdXNlci5maXJzdE5hbWUgKyBcIiBcIiArIHVzZXIuc3VybmFtZSk7XG4gICAgICAgIG9kc1JvbGVDb25maWcuYWRkU2VydmljZS5zZWxlY3RlZEVudGl0eShlbnRpdHkpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIENhbGwgdGhlIHNlcnZlciB0byBnZXQgdGhlIG1hdHRlciBkYXRhXG4gKiBAcmV0dXJucyB0aGUgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIgd2l0aG91dCBjYWNoZVxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRNYXR0ZXJEYXRhKGV4cGVydE1hdHRlck51bWJlcj86c3RyaW5nKSA6IFByb21pc2U8SUV4cGVydE1hdHRlcltdPiB7XG4gICAgXG4gICAgbGV0IHJldFZhbHVlOklFeHBlcnRNYXR0ZXJbXSA9IFtdO1xuICAgIGlmKGV4cGVydE1hdHRlck51bWJlciA9PT0gdW5kZWZpbmVkIHx8IGV4cGVydE1hdHRlck51bWJlci5sZW5ndGggPT09IDApXG4gICAge1xuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgfVxuICAgXG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXguZ2V0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gd2luZG93LmRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbiArIFwiL19pZGVGaWxlcy9TYW1wbGVEYXRhL2VEaXNjb3ZlcnkvbWF0dGVycy5qc29uXCIpIGFzIElFeHBlcnRNYXR0ZXJbXTtcbiAgICAvLyAvL2dldCB0aGUgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIgd2l0aG91dCBjYWNoZVxuICAgIHRyeVxuICAgIHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBleGVjdXRlR2V0PGFueT4oYC9hcGkvZXh0ZXJuYWxNYXR0ZXJQcm92aWRlci9kZXRhaWxzLyR7ZXhwZXJ0TWF0dGVyTnVtYmVyfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhcIiVjIFtNb2R1bGVMb2FkZXJdIGdldE1hdHRlckRhdGEgcmV0dXJuIHZhbHVlXCIsIFwiYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTVcIiwgZGF0YSlcbiAgICAgICAgaWYoZGF0YSAmJiBkYXRhLm1hdHRlckNvZGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBtYXR0ZXI6SUV4cGVydE1hdHRlciA9IHtcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXRWYWx1ZS5wdXNoKG1hdHRlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2goZSlcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIGdldCBtYXR0ZXIgZGF0YSBmcm9tIHNlcnZlclwiLGUpO1xuXG4gICAgfVxuICAgICByZXR1cm4gcmV0VmFsdWU7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgdGVtcCBtYXR0ZXIgbnVtYmVyIGFuZCBzZXRzIGl0IHRvIHRoZSB0ZW1wLW1hdHRlci1udW1iZXIgZmllbGRcbiAqIEBwYXJhbSBjb250ZXh0IFRoZSBmb3JtIGJ1aWxkZXIgY29udGV4dFxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVRlbXBNYXR0ZXJOdW1iZXIoY29udGV4dDogSUZvcm1CdWlsZGVyQ29udGV4dClcbntcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgbGV0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICBsZXQgZGF5ID0gZGF0ZS5nZXREYXRlKCk7IFxuICAgIGxldCBob3VyID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGxldCBtaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICBsZXQgc2Vjb25kID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgbGV0IG1pbGxpc2Vjb25kID0gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgIC8vIGxldCB0ZW1wTWF0dGVyTnVtYmVyID0gYFQke3llYXJ9JHttb250aH0ke2RheX0ke2hvdXJ9JHttaW51dGV9JHtzZWNvbmR9JHttaWxsaXNlY29uZH1gO1xuICAgbGV0IHRlbXBNYXR0ZXJOdW1iZXIgPSBgVFske3llYXJ9XWA7XG4gICAgY29udGV4dC5mb3JtPy5maWVsZHNCeUlkW2VudW1GaWVsZHMudGVtcE1hdHRlck51bWJlcl0/LnNldFZhbHVlKHRlbXBNYXR0ZXJOdW1iZXIpO1xufVxuXG4vKipcbiAqIEVudW0gZm9yIHRoZSBmaWVsZHMgaW4gdGhlIGZvcm0gYnVpbGRlclxuICovXG5leHBvcnQgZW51bSBlbnVtRmllbGRzIHtcbiAgICBjdXN0b21BbHRFZGlzY292ZXJ5SW5zdHJ1Y3Rpb25NYXR0ZXJEZXRhaWxzID0gXCJjdXN0b20tYWx0LWVkaXNjb3ZlcnktaW5zdHJ1Y3Rpb24tbWF0dGVyLWRldGFpbHNcIixcbiAgICBqdXJpc2RpY3Rpb25zQ291bnRyeSA9IFwianVyaXNkaWN0aW9ucy1jb3VudHJ5XCIsXG4gICAgcGlwZWxpbmVNYXR0ZXIgPSBcInBpcGVsaW5lLW1hdHRlclwiLFxuICAgIGV4cGVydE1hdHRlck51bWJlciA9IFwiZXhwZXJ0LW1hdHRlci1udW1iZXJcIixcbiAgICBleHBlcnRNYXR0ZXJOdW1iZXJWYWx1ZSA9IFwiZXhwZXJ0LW1hdHRlci1udW1iZXItdmFsdWVcIixcbiAgICB0ZW1wTWF0dGVyTnVtYmVyID0gXCJ0ZW1wLW1hdHRlci1udW1iZXJcIixcbiAgICBzdWJNYXR0ZXJDb2RlID0gXCJzdWItbWF0dGVyLWNvZGVcIixcbiAgICBhYmNNYXR0ZXJOdW1iZXIgPSBcImFiYy1tYXR0ZXItbnVtYmVyXCIsXG4gICAgbWF0dGVyRGV0YWlscyA9IFwibWF0dGVyLWRldGFpbHNcIixcbiAgICBcbn1cblxuLyoqXG4gKiBFbnVtIGZvciB0aGUgZmllbGRzIGluIHRoZSBtYXR0ZXIgZGV0YWlscyBzdWIgYXJlYSBvZiB0aGUgZm9ybSBidWlsZGVyXG4gKi9cbmV4cG9ydCBlbnVtIGVudW1NYXR0ZXJEZXRhaWxGaWVsZHMge1xuICAgIG1hdHRlckRldGFpbHNQYXJ0bmVyU2VsZWN0b3IgPSBcIm1hdHRlci1kZXRhaWxzLXBhcnRuZXItc2VsZWN0b3JcIixcbiAgICBtYXR0ZXJEZXRhaWxzUGFydG5lck5hbWUgPSBcIm1hdHRlci1kZXRhaWxzLXBhcnRuZXItbmFtZVwiLFxuICAgIG1hdHRlckRldGFpbHNDbGllbnROYW1lID0gXCJtYXR0ZXItZGV0YWlscy1jbGllbnQtbmFtZVwiLFxuICAgIG1hdHRlckRldGFpbHNDbGllbnRDb2RlID0gXCJtYXR0ZXItZGV0YWlscy1jbGllbnQtY29kZVwiLFxuICAgIG1hdHRlckRldGFpbHNQcmFjdGljZUFyZWEgPSBcIm1hdHRlci1kZXRhaWxzLXByYWN0aWNlLWFyZWFcIixcbiAgICBtYXR0ZXJEZXRhaWxzTmFtZSA9IFwibWF0dGVyLWRldGFpbHMtbmFtZVwiLFxuICAgIG1hdHRlckRldGFpbHNJYiA9IFwibWF0dGVyLWRldGFpbHMtaWJcIixcbiAgICBtYXR0ZXJEZXRhaWxzSWJMYXN0Q2hlY2tlZCA9IFwibWF0dGVyLWRldGFpbHMtaWItbGFzdC1jaGVja1wiXG59XG5cbi8qKlxuICogU2VhcmNoZXMgZm9yIHRoZSBwYXJ0bmVyIG9kcyBwaWNrZXIgaW4gdGhlIGJsYWRlIHVzaW5nIGNvbW1vbiBvZHMgaGVscGVyIGZ1bmN0aW9uc1xuICogQHBhcmFtIGNvbnRleHQgXG4gKiBAcmV0dXJucyBcbiAqL1xuZnVuY3Rpb24gZ2V0UGFydG5lck9kc1BpY2tlcihjb250ZXh0OiBJRm9ybUJ1aWxkZXJDb250ZXh0KSB7XG4gICAgcmV0dXJuIGdldEFsbFJvbGVDb25maWdGb3JSb2xlKGNvbnRleHQuYmxhZGUsbWF0dGVyUGFydG5lclJvbGVTeXN0ZW1OYW1lKTtcbn1cblxuLyoqXG4gKiBTZWFyY2hlcyBmb3IgdGhlIHBhcnRuZXIgb2RzIHBpY2tlciBpbiB0aGUgYmxhZGUgdXNpbmcgY29tbW9uIG9kcyBoZWxwZXIgZnVuY3Rpb25zXG4gKiBAcGFyYW0gY29udGV4dCBcbiAqIEByZXR1cm5zIFxuICovXG5mdW5jdGlvbiBnZXRDbGllbnRPZHNQaWNrZXIoY29udGV4dDogSUZvcm1CdWlsZGVyQ29udGV4dCkge1xuICAgIHJldHVybiBnZXRBbGxSb2xlQ29uZmlnRm9yUm9sZShjb250ZXh0LmJsYWRlLCBjbGllbnRSb2xlU3lzdGVtTmFtZSk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlSWZQaXBlbGluZU1hdHRlcihjb250ZXh0OiBJRm9ybUJ1aWxkZXJDb250ZXh0LG1hdHRlckRldGFpbHM6IEZvcm1CdWlsZGVyKVxue1xuICAgIC8vbG9nIGNvbG9yXG4gICAgY29uc29sZS5sb2coXCIlYyBbTWF0dGVyRGV0YWlsc10gdmFsaWRhdGVJZlBpcGVsaW5lTWF0dGVyXCIsIFwiY29sb3I6ICNncmVlblwiKTtcbiAgICBjb25zb2xlLmxvZyhcIiVjIFtNYXR0ZXJEZXRhaWxzXSBjb250ZXh0LndvcmtJdGVtQ29udGV4dCgpXCIsIFwiIGNvbG9yOiAjZ3JlZW5cIiwgY29udGV4dC53b3JrSXRlbUNvbnRleHQpO1xuXG4gICAgaWYoY29udGV4dC53b3JrSXRlbUNvbnRleHQuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lKCk/LmluY2x1ZGVzKFwicGlwZWxpbmVcIikgIT09IHRydWUpXG4gICAge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGxldCBwaXBlbGluZUZvcm1GaWVsZCA9IGNvbnRleHQuZm9ybT8uZmllbGRzQnlJZFtlbnVtRmllbGRzLnBpcGVsaW5lTWF0dGVyXTtcbiAgXG4gICAgaWYocGlwZWxpbmVGb3JtRmllbGQpXG4gICAgeyAgICBcbiAgICAgICAgLy9lbnN1cmUgcGlwbGVpbmUgbWF0dGVyIGlzIHJlYWRvbmx5XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhcIiVjIFtNYXR0ZXJEZXRhaWxzXSBwaXBlbGluZUZvcm1GaWVsZC5zZXRWYWx1ZSh0cnVlKVwiLCBcIiBjb2xvcjogI2dyZWVuXCIpOyAgIFxuICAgICAgICBwaXBlbGluZUZvcm1GaWVsZC5zZXRWYWx1ZSh0cnVlKTtcbiAgICB9XG5cbiAgICAgIFxuXG5cbn1cblxuZnVuY3Rpb24gZW5zdXJlUmVhZE9ubHlGaWVsZHMoY29udGV4dDogSUZvcm1CdWlsZGVyQ29udGV4dClcbntcbiAgICBsZXQgcGlwZWxpbmVGb3JtRmllbGQgPSBjb250ZXh0LmZvcm0/LmZpZWxkc0J5SWRbZW51bUZpZWxkcy5waXBlbGluZU1hdHRlcl07XG4gICAgaWYocGlwZWxpbmVGb3JtRmllbGQpXG4gICAge1xuICAgICAgICBwaXBlbGluZUZvcm1GaWVsZC5yZWFkb25seSh0cnVlKTtcbiAgICAgICAgcGlwZWxpbmVGb3JtRmllbGQuaGlkZGVuKHRydWUpO1xuICAgIH1cbn1cblxuXG4vLyBmdW5jdGlvbiB2YWxpZGF0ZVRlbXBNYXR0ZXJOdW1iZXIoY29udGV4dDogSUZvcm1CdWlsZGVyQ29udGV4dCkge1xuXG4vLyAgICAgLy9sb2cgY29sb3Jcbi8vICAgICBjb25zb2xlLmxvZyhcIiVjIFtNYXR0ZXJEZXRhaWxzXSB2YWxpZGF0ZVRlbXBNYXR0ZXJOdW1iZXJcIiwgXCJiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NVwiKTtcbi8vICAgICAvL2V4aXQgaXMgc3RpbGwgbmV3IGFuZCBtYXR0ZXIgbm90IHNhdmVkXG4vLyAgICAgaWYoY29udGV4dC53b3JrSXRlbUNvbnRleHQuaWQoKT09PXVuZGVmaW5lZClcbi8vICAgICB7XG4vLyAgICAgICAgIHJldHVybjtcbi8vICAgICB9XG5cbi8vICAgICAvL2V4aXQgaWYgdGhlIHRlbXAgbWF0dGVyIG51bWJlciBpcyBzZXRcbi8vICAgICBsZXQgdGVtcE1hdHRlck51bWJlciA9IGNvbnRleHQuZm9ybT8uZmllbGRzQnlJZFtlbnVtRmllbGRzLnRlbXBNYXR0ZXJOdW1iZXJdPy5nZXRWYWx1ZSgpO1xuLy8gICAgIGNvbnNvbGUubG9nKFwiJWMgW01hdHRlckRldGFpbHNdIHRlbXBNYXR0ZXJOdW1iZXJcIiwgXCJiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NVwiLCB0ZW1wTWF0dGVyTnVtYmVyKTtcbi8vICAgICBpZih0ZW1wTWF0dGVyTnVtYmVyICE9IHVuZGVmaW5lZCAmJiB0ZW1wTWF0dGVyTnVtYmVyLnN0YXJ0c1dpdGgoXCJUW1wiKSlcbi8vICAgICB7XG4vLyAgICAgICAgIHJldHVybjtcbi8vICAgICB9XG5cbi8vICAgICAvL3J1biBldmVyeSA1MDBtcyB0byBjaGVjayBmb3IgYSB0ZW1wIG1hdHRlciBudW1iZXJcbi8vICAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwidmFsaWRhdGVUZW1wTWF0dGVyTnVtYmVyXCIpO1xuLy8gICAgICAgICBsZXQgdGVtcE1hdHRlck51bWJlciA9IGF3YWl0IGdldFBpcGVsaW5lTWF0dGVyTnVtYmVyKGNvbnRleHQud29ya0l0ZW1Db250ZXh0LmlkKCkpO1xuLy8gICAgICAgICBpZih0ZW1wTWF0dGVyTnVtYmVyICE9IHVuZGVmaW5lZCAmJiB0ZW1wTWF0dGVyTnVtYmVyLmxlbmd0aCA+IDApXG4vLyAgICAgICAgIHtcbi8vICAgICAgICAgICAgIGNvbnRleHQuZm9ybT8uZmllbGRzQnlJZFtlbnVtRmllbGRzLnRlbXBNYXR0ZXJOdW1iZXJdPy5zZXRWYWx1ZSh0ZW1wTWF0dGVyTnVtYmVyKTtcbi8vICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuLy8gICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICB9XG4gICAgICAgIFxuLy8gICAgIH0sNTAwKTtcblxuXG4vLyB9XG5cbi8vIGFzeW5jIGZ1bmN0aW9uIGdldFBpcGVsaW5lTWF0dGVyTnVtYmVyKGlkOnN0cmluZykgOiBQcm9taXNlPHN0cmluZz5cbi8vIHtcbi8vICAgICBsZXQgYXBpID0gYC9hcGkvdjEvcHVibGljL3dvcmtJdGVtL2ZpbmRCeVF1ZXJ5YDtcbi8vICAgICBsZXQgZGF0YSA9IHtcbi8vICAgICAgICAgXCJzZWFyY2hcIjoge1xuLy8gICAgICAgICAgIFwid29ya0l0ZW1JZHNcIjogW1xuLy8gICAgICAgICAgICAgaWRcbi8vICAgICAgICAgICBdXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIFwiZW5yaWNoXCI6IFtcbiAgICBcbi8vICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICBcInBhdGhcIjogXCJmb3JtLWN1c3RvbS1hbHQtZWRpc2NvdmVyeS1pbnN0cnVjdGlvbi1tYXR0ZXItZGV0YWlscy50ZW1wLW1hdHRlci1udW1iZXJcIlxuLy8gICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICBdfTtcblxuLy8gICAgIHJldHVybiBleGVjdXRlUG9zdDxUR2V0UGlwZWxpbmVNYXR0ZXJOdW1iZXJSZXNwb25zZT4oYXBpLGRhdGEpLnRoZW4oKGRhdGEpID0+IHtcbi8vICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0UGlwZWxpbmVNYXR0ZXJOdW1iZXJcIixkYXRhKTtcbi8vICAgICAgICAgIGxldCByZXRWYWx1ZSA6IHN0cmluZyA9IGRhdGEucmVzdWx0c1swXS5kYXRhW1wiZm9ybS1jdXN0b20tYWx0LWVkaXNjb3ZlcnktaW5zdHJ1Y3Rpb24tbWF0dGVyLWRldGFpbHMudGVtcC1tYXR0ZXItbnVtYmVyXCJdO1xuICAgICAgIFxuLy8gICAgICAgICByZXR1cm4gcmV0VmFsdWU7XG4vLyAgICAgfSk7XG5cblxuLy8gfVxuXG4vLyB0eXBlIFRHZXRQaXBlbGluZU1hdHRlck51bWJlclJlc3BvbnNlID0ge1xuLy8gICAgICAgICBcInRvdGFsQ291bnRcIjogMSxcbi8vICAgICAgICAgXCJ0b29rTXNcIjogNzEsXG4vLyAgICAgICAgIFwicmVzdWx0c1wiOiBbXG4vLyAgICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICAgICAgXCJzY29yZVwiOiAwLFxuLy8gICAgICAgICAgICAgICAgIFwiaWRcIjogXCI0ZGQ3MGUzZi1iMjk0LTQ0NzktOTAyZS1iMDU3MDA5ZTNlNjNcIixcbi8vICAgICAgICAgICAgICAgICBcImRhdGFcIjoge1xuLy8gICAgICAgICAgICAgICAgICAgICBcImZvcm0tY3VzdG9tLWFsdC1lZGlzY292ZXJ5LWluc3RydWN0aW9uLW1hdHRlci1kZXRhaWxzLnRlbXAtbWF0dGVyLW51bWJlclwiOiBcIlRbMjAyM10wMDAwMDdcIixcbi8vICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkdhcmV0aCBKYWNrc29uIEx0ZCAtIFwiLFxuLy8gICAgICAgICAgICAgICAgICAgICBcInBoYXNlLm5hbWVcIjogXCJEcmFmdFwiXG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdXG4vLyAgICAgfVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9