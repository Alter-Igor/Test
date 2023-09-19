/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/WebBased/Common/api/api.ts":
/*!****************************************!*\
  !*** ./src/WebBased/Common/api/api.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
async function executePost(api, postBody) {
    //return await $ajax.post(/* webpackIgnore: true */ validateApi(api), postBody);
    return executeFetch(api, "POST", postBody);
}
// export async function executeGet<T>(api: string) : Promise<T>{
//     return await $ajax.get(/* webpackIgnore: true */ validateApi(api));
// } 
async function executeGet(api) {
    return executeFetch(api, "GET", undefined);
}
async function executePut(api, postBody) {
    //return await $ajax.put(/* webpackIgnore: true */ validateApi(api), postBody);
    return executeFetch(api, "PUT", postBody);
}
async function executeDelete(api) {
    //return await $ajax.delete(/* webpackIgnore: true */ validateApi(api));
    return executeFetch(api, "DELETE", undefined);
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
async function executeFetch(api, method, data) {
    let url = validateApi(api);
    let fetchHeaders = buildHeaders();
    let response = await fetch(url, {
        method: method,
        headers: fetchHeaders,
        body: data ? JSON.stringify(data) : undefined
    }).then((response) => {
        console.log(response);
        //check if response is JSON
        if (response.headers.get("content-type")?.indexOf("application/json") === -1) {
            throw new Error("Response was not JSON");
        }
        //return the json as object
        return response.json();
    });
    return response;
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

/***/ "./src/WebBased/Common/api/executeFindByQuery/FindByQuery.ts":
/*!*******************************************************************!*\
  !*** ./src/WebBased/Common/api/executeFindByQuery/FindByQuery.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeFindByQuery: () => (/* binding */ executeFindByQuery)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ "./src/WebBased/Common/api/api.ts");

function executeFindByQuery(inputOption) {
    return (0,_api__WEBPACK_IMPORTED_MODULE_0__.executePost)("/api/v1/public/workItem/findByQuery", inputOption).then((result) => {
        return result;
    });
}


/***/ }),

/***/ "./src/WebBased/Common/api/searchForAttributeWithParents.ts":
/*!******************************************************************!*\
  !*** ./src/WebBased/Common/api/searchForAttributeWithParents.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   searchForAttribute: () => (/* binding */ searchForAttribute),
/* harmony export */   searchForAttributeRecursive: () => (/* binding */ searchForAttributeRecursive)
/* harmony export */ });
/* harmony import */ var _executeFindByQuery_FindByQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./executeFindByQuery/FindByQuery */ "./src/WebBased/Common/api/executeFindByQuery/FindByQuery.ts");

async function searchForAttributeRecursive(workItemId, attributeName, parents, maxDepth) {
    let useMaxDepth = maxDepth ? true : false;
    if (maxDepth && maxDepth > 0) {
        useMaxDepth = true;
    }
    let retValue = { found: false, value: undefined, parentId: undefined, depth: 0, foundInWorkItemId: undefined, wasFoundInAncestor: false, foundInWorkTypeSystemName: undefined };
    retValue = await searchForAttribute(workItemId, attributeName);
    if (retValue.found) {
        return retValue;
    }
    if (!parents) {
        console.log("No parents or children to search so only searching current work item");
        return retValue;
    }
    if (parents) {
        console.log("Searching parents");
        let depth = 0;
        let searchParent = async (parentId) => {
            depth++;
            let r = { found: false,
                value: undefined,
                parentId: undefined, depth: depth,
                foundInWorkItemId: undefined,
                wasFoundInAncestor: false,
                foundInWorkTypeSystemName: undefined
            };
            if (!parentId) {
                console.log("No parent found");
                return r;
            }
            r = await searchForAttribute(parentId, attributeName);
            r.depth = depth; //update depth as it will be 0
            if (r.found) {
                console.log("Found attribute in parent");
                r.wasFoundInAncestor = true;
                return r;
            }
            else {
                if (useMaxDepth && depth >= maxDepth) {
                    console.log("Max depth reached");
                    return r;
                }
                if (!r.parentId) {
                    console.log("No parent found");
                    return r;
                }
                console.log("Not found in parent");
                return searchParent(r.parentId);
            }
        };
        retValue = await searchParent(retValue.parentId);
    }
    return retValue;
}
async function searchForAttribute(workItemId, attributeName) {
    //get the matter
    let retValue = {
        found: false, value: undefined,
        parentId: undefined, depth: 0,
        foundInWorkItemId: undefined,
        wasFoundInAncestor: false,
        foundInWorkTypeSystemName: undefined
    };
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
    };
    console.log("Searching using ShareDo Id: " + workItemId);
    let httpResultFindByQuery = await (0,_executeFindByQuery_FindByQuery__WEBPACK_IMPORTED_MODULE_0__.executeFindByQuery)(req);
    console.log(`Work item ${workItemId} found`);
    console.log(JSON.stringify(httpResultFindByQuery.results));
    let typeSystemName = httpResultFindByQuery.results[0].data["type.systemName"];
    let parentId = httpResultFindByQuery.results[0].data["parent.id"];
    let attribute = httpResultFindByQuery.results[0].data[attributeName];
    console.log(`Type system name is ${typeSystemName}`);
    console.log(`Parent Id is ${parentId}`);
    console.log(`Attribute [${attributeName}] is ${attribute}`);
    retValue.value = attribute;
    if (attribute) {
        retValue.found = true;
        retValue.foundInWorkItemId = workItemId;
        retValue.foundInWorkTypeSystemName = typeSystemName;
    }
    retValue.parentId = parentId;
    return retValue;
}


/***/ }),

/***/ "./src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts":
/*!**************************************************************!*\
  !*** ./src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseIDEAspect: () => (/* binding */ BaseIDEAspect)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _KOConverter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KOConverter */ "./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts");
/* harmony import */ var _ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ObjectHelpers */ "./src/WebBased/IDEAspects/BaseClasses/ObjectHelpers.ts");



class BaseIDEAspect {
    /**
     * Base Constructor for all IDEAspects, forces the implementation of the load and save methods
     * @param componentName //The name of the component e.g. Aspect.QuickView
     * @param loadSaveLocation //The location to load and save the data from e.g. model.aspect.FormBuilder.formData
     * @param element //The element that the aspect is bound to
     * @param configuration //The configuration passed in from the blade and the design time configuration
     * @param baseModel //The base model passed in from the blade
     * @param defaults //The defaults passed in from the widget to set incase of bad configuration or missing configuration
     */
    constructor(componentName, loadSaveLocation, element, configuration, baseModel, defaults) {
        this.LocationToSaveOrLoadData = loadSaveLocation;
        this.thisComponentName = componentName;
        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = configuration;
        this.baseModel = baseModel;
        this.defaults = defaults;
        this.data = undefined;
        // Merge the configuration with the defaults
        this.configuration = $.extend(this.defaults, this.originalConfiguration);
        this.element = element;
        //create a new model
        this.model = this.configuration._host.model;
        this.enabled = this.model.canEdit;
        this.blade = this.configuration._host.blade;
        this.loaded = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(false);
        // Map the base model properties
        this.sharedoId = this.configuration._host?.model.id;
        if (!this.sharedoId || this.sharedoId()) {
            this.log("No sharedoId found");
        }
        this.sharedoTypeSystemName = this.configuration._host.model.sharedoTypeSystemName;
        if (!this.sharedoTypeSystemName || this.sharedoTypeSystemName()) {
            this.log("No sharedoTypeSystemName found");
        }
        this.options = (0,_KOConverter__WEBPACK_IMPORTED_MODULE_1__.toObservableObject)(this.configuration);
        // Validation
        this.validation = {};
        this.validationErrorCount = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(0);
    }
    /**
     * Called by the aspect IDE adapter when the model is saved. Manipulate the
     * model as required.
     */
    onSave(model) {
        this.log("Saving, model passed in we need to persist to", "green", this.data);
        let dataToPersist = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this.data);
        let currentData = (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.getNestedProperty)(model, this.LocationToSaveOrLoadData);
        if (!currentData) {
            this.log("Data does not exist, we will create", "orange");
            (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.setNestedProperty)(model, this.LocationToSaveOrLoadData, {});
            currentData = (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.getNestedProperty)(model, this.LocationToSaveOrLoadData);
        }
        this.log(`Current data at location ${this.LocationToSaveOrLoadData}`, "green", currentData);
        this.log(`Data to persist to location ${this.LocationToSaveOrLoadData} :`, "blue", dataToPersist);
        (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.setNestedProperty)(model, this.LocationToSaveOrLoadData, dataToPersist);
    }
    ;
    onDestroy() {
        this.log("IDEAspects.Example : onDestroy");
    }
    ;
    /**
     * Called by the UI framework after initial creation and binding to load data
     * into it's model
     */
    loadAndBind() {
        this.log("IDEAspects.Example : loadAndBind");
        this.log("Loading data (model:any) passed in", "green");
        this.log("Loading data based on location to save", "green", this.LocationToSaveOrLoadData);
    }
    ;
    /**
     * Called by the aspect IDE adapter before the model is saved
     */
    onBeforeSave(model) {
        this.log("IDEAspects.Example : onBeforeSave");
    }
    /**
     * Called by the aspect IDE adapter after the model has been saved.
     */
    onAfterSave(model) {
        this.log("IDEAspects.Example : onAfterSave");
    }
    /**
     * Called by the aspect IDE adapter when it reloads aspect data
     */
    onReload(model) {
        this.log("IDEAspects.Example : onReload");
    }
    /**
     * Provides logging for the component based on the debug configuration
     * @param message
     * @param color
     * @param data
     */
    log(message, color, data) {
        if (this.configuration.debug?.enabled) {
            if (this.configuration.debug.logToConsole) {
                if (!color)
                    color = "black";
                // let lineNo = extractLineNumberFromStack((new Error()).stack);
                console.log(`%c ${this.thisComponentName} - ${message}`, `color:${color}`, data);
            }
        }
    }
}


/***/ }),

/***/ "./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts":
/*!************************************************************!*\
  !*** ./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toObservableObject: () => (/* binding */ toObservableObject)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);

function toObservableObject(obj) {
    const result = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            //check if obj[key] is already a observable
            if (knockout__WEBPACK_IMPORTED_MODULE_0__.isObservable(obj[key])) {
                result[key] = obj[key];
                continue;
            }
            result[key] = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(obj[key]);
        }
    }
    return result;
}


/***/ }),

/***/ "./src/WebBased/IDEAspects/BaseClasses/ObjectHelpers.ts":
/*!**************************************************************!*\
  !*** ./src/WebBased/IDEAspects/BaseClasses/ObjectHelpers.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNestedProperty: () => (/* binding */ getNestedProperty),
/* harmony export */   setNestedProperty: () => (/* binding */ setNestedProperty)
/* harmony export */ });
function setNestedProperty(obj, propertyPath, value) {
    const properties = propertyPath.split('.');
    let current = obj;
    for (let i = 0; i < properties.length - 1; i++) {
        const prop = properties[i];
        if (!current[prop]) {
            current[prop] = {};
        }
        current = current[prop];
    }
    current[properties[properties.length - 1]] = value;
}
function getNestedProperty(obj, propertyPath) {
    const properties = propertyPath.split('.');
    let current = obj;
    for (const prop of properties) {
        if (current[prop] === undefined) {
            return undefined;
        }
        current = current[prop];
    }
    return current;
}


/***/ }),

/***/ "knockout":
/*!*********************!*\
  !*** external "ko" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = ko;

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************************************************************!*\
  !*** ./src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspect.ts ***!
  \************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingleValueAspect: () => (/* binding */ SingleValueAspect)
/* harmony export */ });
/* harmony import */ var _Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Common/api/searchForAttributeWithParents */ "./src/WebBased/Common/api/searchForAttributeWithParents.ts");
/* harmony import */ var _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseClasses/BaseIDEAspect */ "./src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts");


let thisWidgetSystemName = "SingleValueAspect";
class SingleValueAspect extends _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_1__.BaseIDEAspect {
    constructor(element, configuration, baseModel) {
        let defaults = {
            fieldPath: "Title",
            title: "Title Value",
            calculatedValue: "",
            calculatedTitle: "",
            valueOnNotFound: "Not Found",
            searchParents: false,
            maxDepth: 0,
            formatter: "value",
            debug: {
                enabled: false,
                logToConsole: false,
                showInAspect: false
            }
        };
        super("SingleValueAspect", "aspectData.odsEntityPicker", element, configuration, baseModel, defaults);
        this.data = {
            value: "",
            title: this.options.title() || "Title Value"
        };
        // Base properties
        this.setup();
    }
    // private initialise() {//! Note: UI framework looks for this method name and if found behaves differently and wont call loadAndBind
    setup() {
        // Map the roleConfigModels
        this.options.fieldPath.subscribe((newValue) => {
            this.log("Field path changed", "green", newValue);
            this.loadAndBind();
        });
        this.options.calculatedTitle(this.options.title() || "Title Value");
        this.options.title.subscribe((newValue) => {
            this.log("Title changed", "green", newValue);
            if (newValue) {
                this.options.calculatedTitle(newValue);
            }
        });
    }
    loadAndBind() {
        this.log("Loading data (model) passed in", "green");
        // super.loadAndBind(); //No need to load and bind as we are not using the base model
        if (!this.sharedoId) {
            this.log("No sharedoId passed in", "red");
            return;
        }
        if (!this.options.fieldPath()) {
            this.log("No field path passed in", "red");
            return;
        }
        (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_0__.searchForAttributeRecursive)(this.sharedoId(), this.options.fieldPath(), this.options.searchParents(), this.options.maxDepth()).then((data) => {
            if (!data || data.found == false) {
                this.log("No data returned", "red");
                this.options.calculatedValue(this.options.valueOnNotFound() || "");
            }
            else {
                let formattedValue = this.formatValue(data.value, this.options.formatter() || "value");
                this.options.calculatedValue(formattedValue || "");
            }
        });
    }
    ;
    formatValue(value, formatter) {
        // Create a new function based on the formatter
        const dynamicFunc = new Function('value', `return (${formatter});`);
        // Invoke the function with the given value
        return dynamicFunc(value);
    }
    onSave(model) {
        this.log("Saving data (model) passed in", "green");
        // super.onSave(model);
    }
    ;
}

})();

var __webpack_export_target__ = (IDEAspects = typeof IDEAspects === "undefined" ? {} : IDEAspects);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBR1EsTUFBTSxDQUFDLEtBQVU7UUFFdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRCx1QkFBdUI7SUFFM0IsQ0FBQztJQUFBLENBQUM7Q0FDTCIsInNvdXJjZXMiOlsid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL2FwaS9hcGkudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9Db21tb24vYXBpL2V4ZWN1dGVGaW5kQnlRdWVyeS9GaW5kQnlRdWVyeS50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvc2VhcmNoRm9yQXR0cmlidXRlV2l0aFBhcmVudHMudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3QudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0tPQ29udmVydGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9PYmplY3RIZWxwZXJzLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvZXh0ZXJuYWwgdmFyIFwia29cIiIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvU2luZ2xlVmFsdWVBc3BlY3QvU2luZ2xlVmFsdWVBc3BlY3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIFRoaXMgZmlsZSBjb250YWlucyB0aGUgYXBpIGNhbGxzIHRvIHRoZSBiYWNrZW5kLlxuICogdXRpbGlzaW5nIHRoZSBheGlvcyBsaWJyYXJ5IHRvIG1ha2UgdGhlIGNhbGxzLlxuICogaW5jbHVzaW5nIG9mIHdlYnBhY2tJZ25vcmUgaXMgdG8gYWxsb3cgdGhlIHdlYnBhY2sgdG8gaWdub3JlIHRoZSBjYWxscyBhbmQgbm90IHRyeSB0byBidW5kbGUgdGhlbS5cbiAqL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVBvc3Q8VD4oYXBpOiBzdHJpbmcsIHBvc3RCb2R5OiBhbnkpIDogUHJvbWlzZTxUPntcbiAgICAvL3JldHVybiBhd2FpdCAkYWpheC5wb3N0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiBleGVjdXRlRmV0Y2g8VD4oYXBpLFwiUE9TVFwiLHBvc3RCb2R5KTtcbn1cblxuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVHZXQ8VD4oYXBpOiBzdHJpbmcpIDogUHJvbWlzZTxUPntcbi8vICAgICByZXR1cm4gYXdhaXQgJGFqYXguZ2V0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSk7XG4vLyB9IFxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldDxUPihhcGk6IHN0cmluZykgOiBQcm9taXNlPFQ+e1xuICAgcmV0dXJuIGV4ZWN1dGVGZXRjaDxUPihhcGksXCJHRVRcIix1bmRlZmluZWQpO1xufVxuXG5cblxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlUHV0PFQ+KGFwaTogc3RyaW5nLCBwb3N0Qm9keTogYW55KSA6IFByb21pc2U8VD57XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXgucHV0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiBleGVjdXRlRmV0Y2g8VD4oYXBpLFwiUFVUXCIscG9zdEJvZHkpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZURlbGV0ZTxUPihhcGk6IHN0cmluZykgOiBQcm9taXNlPFQ+e1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LmRlbGV0ZSgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSkpO1xuICAgIHJldHVybiBleGVjdXRlRmV0Y2g8VD4oYXBpLFwiREVMRVRFXCIsdW5kZWZpbmVkKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVBcGkoYXBpOiBzdHJpbmcpIDogc3RyaW5ne1xuICAgbGV0IGxvY2F0aW9uPSAgd2luZG93LmRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbjtcblxuICAgLy9pZiBhcGkgZG9lcyBub3QgaW5jbHVkZSB0aGUgbG9jYXRpb24gdGhlbiBhZGQgaXQuXG4gICAgaWYoYXBpLmluZGV4T2YobG9jYXRpb24pID09PSAtMSl7XG4gICAgICAgIC8vY2hlY2sgaWYgYXBpIHN0YXJ0IHdpdGggYSAvIGlmIG5vdCBhZGQgaXQuXG4gICAgICAgIGlmKGFwaS5pbmRleE9mKFwiL1wiKSAhPT0gMCl7XG4gICAgICAgICAgICBhcGkgPSBcIi9cIiArIGFwaTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXBpID0gbG9jYXRpb24gKyBhcGk7XG4gICAgfVxuICAgIHJldHVybiBhcGk7XG4gICAgXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlRmV0Y2g8VD4oYXBpOiBzdHJpbmcsIG1ldGhvZDpzdHJpbmcsZGF0YTphbnkpIDogUHJvbWlzZTxUPntcbiAgICBsZXQgdXJsID0gdmFsaWRhdGVBcGkoYXBpKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gYnVpbGRIZWFkZXJzKCk7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGZldGNoSGVhZGVycyxcbiAgICAgICAgYm9keTogZGF0YT8gSlNPTi5zdHJpbmdpZnkoZGF0YSk6IHVuZGVmaW5lZFxuICAgIH1cbiAgICApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgIC8vY2hlY2sgaWYgcmVzcG9uc2UgaXMgSlNPTlxuICAgICAgICBpZihyZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKT8uaW5kZXhPZihcImFwcGxpY2F0aW9uL2pzb25cIikgPT09IC0xKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlc3BvbnNlIHdhcyBub3QgSlNPTlwiKTtcbiAgICAgICAgfVxuICAgICAgICAvL3JldHVybiB0aGUganNvbiBhcyBvYmplY3RcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkSGVhZGVycygpIHtcbiAgICBsZXQgYmVhcmVyID0gZ2V0QmVhcmVyVG9rZW4oKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBmZXRjaEhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICBpZiAoYmVhcmVyKSB7XG4gICAgICAgIGZldGNoSGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIGJlYXJlcik7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaEhlYWRlcnM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb2tpZXMoKTogeyBba2V5OnN0cmluZ106c3RyaW5nIH1cbntcbiAgICBsZXQgcmV0VmFsdWU6IHsgW2tleTpzdHJpbmddOnN0cmluZyB9ID0ge307XG4gICAgbGV0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpLnJlZHVjZShmdW5jdGlvbiAoY29va2llcywgY29va2llKVxuICAgIHtcbiAgICAgICAgdmFyIHBhcnRzID0gY29va2llLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhcnRzWzBdLnRyaW0oKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzWzFdO1xuXG4gICAgICAgICAgICByZXRWYWx1ZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvb2tpZXM7XG4gICAgfSwge30pO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJlYXJlclRva2VuKClcbntcbiAgICB2YXIgY29va2llcyA9IGdldENvb2tpZXMoKTtcbiAgICB2YXIgdG9rZW4gPSBjb29raWVzW1wiX2FwaVwiXTtcblxuICAgIGlmKCB0b2tlbiApIHJldHVybiBcIkJlYXJlciBcIiArIHRva2VuO1xuICAgIHJldHVybiBudWxsO1xufTsiLCJpbXBvcnQgeyBleGVjdXRlUG9zdCB9IGZyb20gXCIuLi9hcGlcIjtcbmltcG9ydCB7IElGaW5kQnlRdWVyeU9wdGlvbnMgfSBmcm9tIFwiLi9JRmluZEJ5UXVlcnlJbnB1dFwiO1xuaW1wb3J0IHsgSUZpbmRCeVF1ZXJ5UmVzdWx0IH0gZnJvbSBcIi4vSUZpbmRCeVF1ZXJ5UmVzdWx0XCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVGaW5kQnlRdWVyeTxUPihpbnB1dE9wdGlvbjogSUZpbmRCeVF1ZXJ5T3B0aW9ucyk6IFByb21pc2U8SUZpbmRCeVF1ZXJ5UmVzdWx0PFQ+Plxue1xuICAgIHJldHVybiBleGVjdXRlUG9zdDxJRmluZEJ5UXVlcnlSZXN1bHQ8VD4+KFwiL2FwaS92MS9wdWJsaWMvd29ya0l0ZW0vZmluZEJ5UXVlcnlcIiwgaW5wdXRPcHRpb24pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xufSIsImltcG9ydCB7IGV4ZWN1dGVGaW5kQnlRdWVyeSB9IGZyb20gXCIuL2V4ZWN1dGVGaW5kQnlRdWVyeS9GaW5kQnlRdWVyeVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIHNlYXJjaFJlc3VsdCBcbntcbiAgICBmb3VuZDpib29sZWFuLCBcbiAgICB2YWx1ZTpzdHJpbmcgfCB1bmRlZmluZWQsIFxuICAgIHBhcmVudElkOnN0cmluZyB8IHVuZGVmaW5lZFxuICAgIGRlcHRoOm51bWJlcixcbiAgICBmb3VuZEluV29ya0l0ZW1JZDpzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgd2FzRm91bmRJbkFuY2VzdG9yOmJvb2xlYW4sXG4gICAgZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZTpzdHJpbmcgfCB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZSh3b3JrSXRlbUlkOiBzdHJpbmcsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgcGFyZW50czogYm9vbGVhbiwgbWF4RGVwdGg/OiBudW1iZXIgfCB1bmRlZmluZWQpXG4ge1xuICAgIGxldCB1c2VNYXhEZXB0aCA6IGJvb2xlYW4gPSBtYXhEZXB0aCA/IHRydWUgOiBmYWxzZTtcbiAgICBpZihtYXhEZXB0aCAmJiBtYXhEZXB0aCA+IDApe1xuICAgICAgICB1c2VNYXhEZXB0aCA9IHRydWU7XG4gICAgfVxuXG5cbiAgICBsZXQgcmV0VmFsdWU6c2VhcmNoUmVzdWx0ID0ge2ZvdW5kOmZhbHNlLCB2YWx1ZTp1bmRlZmluZWQsIHBhcmVudElkOnVuZGVmaW5lZCwgZGVwdGg6MCwgZm91bmRJbldvcmtJdGVtSWQ6dW5kZWZpbmVkLCB3YXNGb3VuZEluQW5jZXN0b3I6ZmFsc2UsIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6dW5kZWZpbmVkfTtcblxuICAgIHJldFZhbHVlID0gYXdhaXQgc2VhcmNoRm9yQXR0cmlidXRlKHdvcmtJdGVtSWQsIGF0dHJpYnV0ZU5hbWUpO1xuXG4gICAgaWYocmV0VmFsdWUuZm91bmQpe1xuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgfVxuXG4gICAgaWYoIXBhcmVudHMgKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBwYXJlbnRzIG9yIGNoaWxkcmVuIHRvIHNlYXJjaCBzbyBvbmx5IHNlYXJjaGluZyBjdXJyZW50IHdvcmsgaXRlbVwiKTtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlXG4gICAgfVxuXG4gICAgaWYocGFyZW50cyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIHBhcmVudHNcIik7XG4gICAgICAgIGxldCBkZXB0aCA9IDA7XG4gICAgICAgIGxldCBzZWFyY2hQYXJlbnQgPSBhc3luYyAocGFyZW50SWQ6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgZGVwdGgrKztcbiAgICAgICAgICAgIGxldCByOiBzZWFyY2hSZXN1bHQgPSB7Zm91bmQ6ZmFsc2UsXG4gICAgICAgICAgICAgICAgIHZhbHVlOnVuZGVmaW5lZCwgXG4gICAgICAgICAgICAgICAgIHBhcmVudElkOnVuZGVmaW5lZCwgZGVwdGg6ZGVwdGgsIC8vZGVwdGggaGVyZSB3aWxsIGJlIG92ZXJyaWRlbiBpZiB0aGVyZSBpcyBhIHBhcmVudFxuICAgICAgICAgICAgICAgICBmb3VuZEluV29ya0l0ZW1JZDp1bmRlZmluZWQsIFxuICAgICAgICAgICAgICAgICB3YXNGb3VuZEluQW5jZXN0b3I6ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6dW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKCFwYXJlbnRJZCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBwYXJlbnQgZm91bmRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICByID0gYXdhaXQgc2VhcmNoRm9yQXR0cmlidXRlKHBhcmVudElkLCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgICByLmRlcHRoID0gZGVwdGg7IC8vdXBkYXRlIGRlcHRoIGFzIGl0IHdpbGwgYmUgMFxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoci5mb3VuZCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBhdHRyaWJ1dGUgaW4gcGFyZW50XCIpO1xuICAgICAgICAgICAgICAgIHIud2FzRm91bmRJbkFuY2VzdG9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBpZih1c2VNYXhEZXB0aCAmJiBkZXB0aCA+PSBtYXhEZXB0aCEpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1heCBkZXB0aCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBpZighci5wYXJlbnRJZCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcGFyZW50IGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgZm91bmQgaW4gcGFyZW50XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2hQYXJlbnQoci5wYXJlbnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXRWYWx1ZSA9IGF3YWl0IHNlYXJjaFBhcmVudChyZXRWYWx1ZS5wYXJlbnRJZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xuXG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaEZvckF0dHJpYnV0ZSh3b3JrSXRlbUlkOiBzdHJpbmcsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZykge1xuICAgIC8vZ2V0IHRoZSBtYXR0ZXJcbiAgICBsZXQgcmV0VmFsdWUgOnNlYXJjaFJlc3VsdCA9IHtcbiAgICAgICAgZm91bmQ6ZmFsc2UsIHZhbHVlOnVuZGVmaW5lZCxcbiAgICAgICAgIHBhcmVudElkOnVuZGVmaW5lZCwgZGVwdGg6MCxcbiAgICAgICAgICBmb3VuZEluV29ya0l0ZW1JZDp1bmRlZmluZWQsXG4gICAgICAgICAgIHdhc0ZvdW5kSW5BbmNlc3RvcjpmYWxzZSxcbiAgICAgICAgICAgZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZTp1bmRlZmluZWR9O1xuICAgIGxldCByZXEgPSB7XG4gICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwid29ya0l0ZW1JZHNcIjogW1xuICAgICAgICAgICAgICAgIHdvcmtJdGVtSWRcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJlbnJpY2hcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInRpdGxlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwicGFyZW50LmlkXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwidHlwZS5zeXN0ZW1OYW1lXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwicmVmZXJlbmNlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IGF0dHJpYnV0ZU5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIlNlYXJjaGluZyB1c2luZyBTaGFyZURvIElkOiBcIiArIHdvcmtJdGVtSWQpO1xuICAgIGxldCBodHRwUmVzdWx0RmluZEJ5UXVlcnkgPSBhd2FpdCBleGVjdXRlRmluZEJ5UXVlcnk8YW55PihyZXEpO1xuICAgIGNvbnNvbGUubG9nKGBXb3JrIGl0ZW0gJHt3b3JrSXRlbUlkfSBmb3VuZGApO1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzKSk7XG5cblxuICAgIGxldCB0eXBlU3lzdGVtTmFtZSA9IGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzWzBdLmRhdGFbXCJ0eXBlLnN5c3RlbU5hbWVcIl07XG4gICAgbGV0IHBhcmVudElkID0gICAgICAgaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5LnJlc3VsdHNbMF0uZGF0YVtcInBhcmVudC5pZFwiXTtcbiAgICBsZXQgYXR0cmlidXRlID0gICAgICBodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0c1swXS5kYXRhW2F0dHJpYnV0ZU5hbWVdIGFzIHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhgVHlwZSBzeXN0ZW0gbmFtZSBpcyAke3R5cGVTeXN0ZW1OYW1lfWApO1xuICAgIGNvbnNvbGUubG9nKGBQYXJlbnQgSWQgaXMgJHtwYXJlbnRJZH1gKTtcbiAgICBjb25zb2xlLmxvZyhgQXR0cmlidXRlIFske2F0dHJpYnV0ZU5hbWV9XSBpcyAke2F0dHJpYnV0ZX1gKTtcblxuICAgIHJldFZhbHVlLnZhbHVlID0gYXR0cmlidXRlO1xuICAgIGlmKGF0dHJpYnV0ZSl7XG4gICAgICAgIHJldFZhbHVlLmZvdW5kID0gdHJ1ZTtcbiAgICAgICAgcmV0VmFsdWUuZm91bmRJbldvcmtJdGVtSWQgPSB3b3JrSXRlbUlkO1xuICAgICAgICByZXRWYWx1ZS5mb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lID0gdHlwZVN5c3RlbU5hbWU7XG4gICAgfVxuICAgIHJldFZhbHVlLnBhcmVudElkID0gcGFyZW50SWQ7XG5cbiAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgXG59IiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XG5pbXBvcnQgeyBJU2hhcmVkb0JsYWRlTW9kZWwsIFRTaGFyZURvQmxhZGUsIElDb25maWd1cmF0aW9uSG9zdCB9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL1NoYXJlZG9Bc3BlY3RNb2RlbHNcIjtcbmltcG9ydCB7IElEZWJ1ZyB9IGZyb20gXCIuL0lEZWJ1Z1wiO1xuaW1wb3J0IHsgdG9PYnNlcnZhYmxlT2JqZWN0IH0gZnJvbSBcIi4vS09Db252ZXJ0ZXJcIjtcbmltcG9ydCB7IGdldE5lc3RlZFByb3BlcnR5LCBzZXROZXN0ZWRQcm9wZXJ0eSB9IGZyb20gXCIuL09iamVjdEhlbHBlcnNcIjtcblxuXG5cblxuaW50ZXJmYWNlIElERUFzcGVjdENvbmZpZ3VyYXRpb24ge1xuICAgIG1vZGVsOiBJU2hhcmVkb0JsYWRlTW9kZWw7XG4gICAgYmxhZGU6IFRTaGFyZURvQmxhZGU7XG59XG5cbnR5cGUgT2JzZXJ2YWJsZWlmeTxUPiA9IHtcbiAgICBbUCBpbiBrZXlvZiBUXToga28uT2JzZXJ2YWJsZTxUW1BdPjtcbn07XG5cbmV4cG9ydCB0eXBlIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPiA9IHsgW0sgaW4ga2V5b2YgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+XToga28uT2JzZXJ2YWJsZTxJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5bS10+OyB9XG5cbmV4cG9ydCB0eXBlIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPiA9IElDb25maWd1cmF0aW9uSG9zdCAmIFRDb25maWcgJlxue1xuICAgIGRlYnVnOiBJRGVidWc7XG59XG4vLyBhYnN0cmFjdCBjbGFzcyBDcmVhdG9yPFRDb25maWc+IHtcbi8vICAgICBwdWJsaWMgYWJzdHJhY3QgRmFjdG9yeU1ldGhvZChlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+LCBiYXNlTW9kZWw6IGFueSk6IGFueTtcbi8vIH1cblxudHlwZSBPYnNlcnZhYmxlUGVyc29uPFRDb25maWc+ID0gT2JzZXJ2YWJsZWlmeTxJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4+O1xuXG5leHBvcnQgY2xhc3MgQmFzZUlERUFzcGVjdDxUQ29uZmlnLCBUUGVyc2l0YW5jZT4gIHtcbiAgICBvcmlnaW5hbENvbmZpZ3VyYXRpb246IFRDb25maWc7XG4gICAgY29uZmlndXJhdGlvbjogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgIGRlZmF1bHRzOiBUQ29uZmlnIHwgdW5kZWZpbmVkO1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIG1vZGVsOiBhbnk7XG4gICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgICBibGFkZTogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5BZGRFZGl0U2hhcmVkbztcbiAgICBsb2FkZWQ6IGtvLk9ic2VydmFibGU8Ym9vbGVhbj47XG4gICAgc2hhcmVkb0lkOiBhbnk7XG4gICAgc2hhcmVkb1R5cGVTeXN0ZW1OYW1lOiBrby5PYnNlcnZhYmxlPHN0cmluZz47XG4gICAgdmFsaWRhdGlvbjogYW55O1xuICAgIHZhbGlkYXRpb25FcnJvckNvdW50OiBrby5PYnNlcnZhYmxlPG51bWJlcj47XG4gICAgYmFzZU1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvO1xuICAgIHRoaXNDb21wb25lbnROYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgZGF0YTogVFBlcnNpdGFuY2UgfCB1bmRlZmluZWQ7XG4gICAgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhOiBzdHJpbmc7IC8vVGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbVxuICAgIG9wdGlvbnM6IE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPlxuXG4gICAgLyoqXG4gICAgICogQmFzZSBDb25zdHJ1Y3RvciBmb3IgYWxsIElERUFzcGVjdHMsIGZvcmNlcyB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIGxvYWQgYW5kIHNhdmUgbWV0aG9kc1xuICAgICAqIEBwYXJhbSBjb21wb25lbnROYW1lIC8vVGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCBlLmcuIEFzcGVjdC5RdWlja1ZpZXdcbiAgICAgKiBAcGFyYW0gbG9hZFNhdmVMb2NhdGlvbiAvL1RoZSBsb2NhdGlvbiB0byBsb2FkIGFuZCBzYXZlIHRoZSBkYXRhIGZyb20gZS5nLiBtb2RlbC5hc3BlY3QuRm9ybUJ1aWxkZXIuZm9ybURhdGFcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAvL1RoZSBlbGVtZW50IHRoYXQgdGhlIGFzcGVjdCBpcyBib3VuZCB0b1xuICAgICAqIEBwYXJhbSBjb25maWd1cmF0aW9uIC8vVGhlIGNvbmZpZ3VyYXRpb24gcGFzc2VkIGluIGZyb20gdGhlIGJsYWRlIGFuZCB0aGUgZGVzaWduIHRpbWUgY29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSBiYXNlTW9kZWwgLy9UaGUgYmFzZSBtb2RlbCBwYXNzZWQgaW4gZnJvbSB0aGUgYmxhZGVcbiAgICAgKiBAcGFyYW0gZGVmYXVsdHMgLy9UaGUgZGVmYXVsdHMgcGFzc2VkIGluIGZyb20gdGhlIHdpZGdldCB0byBzZXQgaW5jYXNlIG9mIGJhZCBjb25maWd1cmF0aW9uIG9yIG1pc3NpbmcgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudE5hbWU6IHN0cmluZywgbG9hZFNhdmVMb2NhdGlvbjogc3RyaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgY29uZmlndXJhdGlvbjogVENvbmZpZywgYmFzZU1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvLCBkZWZhdWx0czogVENvbmZpZykge1xuXG4gICAgICAgIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gbG9hZFNhdmVMb2NhdGlvbjtcbiAgICAgICAgdGhpcy50aGlzQ29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWU7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIC8vU2hhcmVEbyBwYXNzZXMgdGhlIGNvbmZpZyBhcyB3ZWxsIGFzIG90aGVyIHN0dWZmLCBzbyB3ZSBuZWVkIHRvIGV4dHJhY3QgdGhlIGNvbmZpZ1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb24gYXMgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgICAgICB0aGlzLmJhc2VNb2RlbCA9IGJhc2VNb2RlbDtcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgICAgICB0aGlzLmRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIE1lcmdlIHRoZSBjb25maWd1cmF0aW9uIHdpdGggdGhlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9ICQuZXh0ZW5kKHRoaXMuZGVmYXVsdHMsIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uKSBhcyBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz47XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIC8vY3JlYXRlIGEgbmV3IG1vZGVsXG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLmNvbmZpZ3VyYXRpb24uX2hvc3QubW9kZWw7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMubW9kZWwuY2FuRWRpdDtcbiAgICAgICAgdGhpcy5ibGFkZSA9IHRoaXMuY29uZmlndXJhdGlvbi5faG9zdC5ibGFkZTtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgLy8gTWFwIHRoZSBiYXNlIG1vZGVsIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5zaGFyZWRvSWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsLmlkO1xuICAgICAgICBpZiAoIXRoaXMuc2hhcmVkb0lkIHx8IHRoaXMuc2hhcmVkb0lkKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gc2hhcmVkb0lkIGZvdW5kXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lID0gdGhpcy5jb25maWd1cmF0aW9uLl9ob3N0Lm1vZGVsLnNoYXJlZG9UeXBlU3lzdGVtTmFtZTtcbiAgICAgICAgaWYgKCF0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSB8fCB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9UeXBlU3lzdGVtTmFtZSBmb3VuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHRvT2JzZXJ2YWJsZU9iamVjdCh0aGlzLmNvbmZpZ3VyYXRpb24pO1xuXG4gICAgICAgIC8vIFZhbGlkYXRpb25cbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0ge307XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yQ291bnQgPSBrby5vYnNlcnZhYmxlKDApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgd2hlbiB0aGUgbW9kZWwgaXMgc2F2ZWQuIE1hbmlwdWxhdGUgdGhlXG4gICAgICogbW9kZWwgYXMgcmVxdWlyZWQuXG4gICAgICovXG4gICAgcHVibGljIG9uU2F2ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nKFwiU2F2aW5nLCBtb2RlbCBwYXNzZWQgaW4gd2UgbmVlZCB0byBwZXJzaXN0IHRvXCIsIFwiZ3JlZW5cIiwgdGhpcy5kYXRhKTtcbiAgICAgICAgbGV0IGRhdGFUb1BlcnNpc3QgPSBrby50b0pTKHRoaXMuZGF0YSk7XG4gICAgICAgIGxldCBjdXJyZW50RGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG4gICAgICAgIGlmICghY3VycmVudERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiRGF0YSBkb2VzIG5vdCBleGlzdCwgd2Ugd2lsbCBjcmVhdGVcIiwgXCJvcmFuZ2VcIik7XG4gICAgICAgICAgICBzZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIHt9KTtcbiAgICAgICAgICAgIGN1cnJlbnREYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZyhgQ3VycmVudCBkYXRhIGF0IGxvY2F0aW9uICR7dGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGF9YCwgXCJncmVlblwiLCBjdXJyZW50RGF0YSk7XG4gICAgICAgIHRoaXMubG9nKGBEYXRhIHRvIHBlcnNpc3QgdG8gbG9jYXRpb24gJHt0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YX0gOmAsIFwiYmx1ZVwiLCBkYXRhVG9QZXJzaXN0KTtcbiAgICAgICAgc2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCBkYXRhVG9QZXJzaXN0KTtcbiAgICB9O1xuXG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25EZXN0cm95XCIpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIFVJIGZyYW1ld29yayBhZnRlciBpbml0aWFsIGNyZWF0aW9uIGFuZCBiaW5kaW5nIHRvIGxvYWQgZGF0YVxuICAgICAqIGludG8gaXQncyBtb2RlbFxuICAgICAqL1xuICAgIGxvYWRBbmRCaW5kKCkge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IGxvYWRBbmRCaW5kXCIpO1xuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSAobW9kZWw6YW55KSBwYXNzZWQgaW5cIiwgXCJncmVlblwiKTtcbiAgICAgICAgdGhpcy5sb2coXCJMb2FkaW5nIGRhdGEgYmFzZWQgb24gbG9jYXRpb24gdG8gc2F2ZVwiLCBcImdyZWVuXCIsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgYmVmb3JlIHRoZSBtb2RlbCBpcyBzYXZlZFxuICAgICAqL1xuICAgIG9uQmVmb3JlU2F2ZShtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uQmVmb3JlU2F2ZVwiKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIGFmdGVyIHRoZSBtb2RlbCBoYXMgYmVlbiBzYXZlZC5cbiAgICAgKi9cbiAgICBvbkFmdGVyU2F2ZShtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uQWZ0ZXJTYXZlXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIHdoZW4gaXQgcmVsb2FkcyBhc3BlY3QgZGF0YVxuICAgICAqL1xuICAgIG9uUmVsb2FkKG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25SZWxvYWRcIik7XG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgbG9nZ2luZyBmb3IgdGhlIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgZGVidWcgY29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFxuICAgICAqIEBwYXJhbSBjb2xvciBcbiAgICAgKiBAcGFyYW0gZGF0YSBcbiAgICAgKi9cbiAgICBsb2cobWVzc2FnZTogc3RyaW5nLCBjb2xvcj86IHN0cmluZywgZGF0YT86IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmRlYnVnPy5lbmFibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmRlYnVnLmxvZ1RvQ29uc29sZSkge1xuICAgICAgICAgICAgICAgIGlmICghY29sb3IpIGNvbG9yID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIC8vIGxldCBsaW5lTm8gPSBleHRyYWN0TGluZU51bWJlckZyb21TdGFjaygobmV3IEVycm9yKCkpLnN0YWNrKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJWMgJHt0aGlzLnRoaXNDb21wb25lbnROYW1lfSAtICR7bWVzc2FnZX1gLCBgY29sb3I6JHtjb2xvcn1gLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b09ic2VydmFibGVPYmplY3Q8VCBleHRlbmRzIG9iamVjdD4ob2JqOiBUKTogeyBbSyBpbiBrZXlvZiBUXToga28uT2JzZXJ2YWJsZTxUW0tdPiB9IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICAvL2NoZWNrIGlmIG9ialtrZXldIGlzIGFscmVhZHkgYSBvYnNlcnZhYmxlXG4gICAgICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGtvLm9ic2VydmFibGUob2JqW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCJcbmV4cG9ydCBmdW5jdGlvbiBzZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICBpZiAoIWN1cnJlbnRbcHJvcF0pIHtcbiAgICAgICAgICAgIGN1cnJlbnRbcHJvcF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcbiAgICB9XG4gICAgY3VycmVudFtwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoIC0gMV1dID0gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBwcm9wZXJ0eVBhdGguc3BsaXQoJy4nKTtcbiAgICBsZXQgY3VycmVudCA9IG9iajtcblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChjdXJyZW50W3Byb3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBrbzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9hcGkvc2VhcmNoRm9yQXR0cmlidXRlV2l0aFBhcmVudHNcIjtcclxuaW1wb3J0IHsgQmFzZUlERUFzcGVjdCB9IGZyb20gXCIuLi9CYXNlQ2xhc3Nlcy9CYXNlSURFQXNwZWN0XCI7XHJcbmltcG9ydCB7IElEZWJ1ZyB9IGZyb20gXCIuLi9CYXNlQ2xhc3Nlcy9JRGVidWdcIjtcclxuaW1wb3J0IHsgSVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbiB9IGZyb20gXCIuL1NpbmdsZVZhbHVlQXNwZWN0Q29uZmlnXCI7XHJcblxyXG5sZXQgdGhpc1dpZGdldFN5c3RlbU5hbWUgPSBcIlNpbmdsZVZhbHVlQXNwZWN0XCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNpbmdsZVZhbHVlQXNwZWN0IGV4dGVuZHMgQmFzZUlERUFzcGVjdDxJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uLCBhbnk+IHtcclxuXHJcbiBcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbDogYW55KSB7XHJcblxyXG4gICAgICAgIGxldCBkZWZhdWx0cyA6IElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24gJiB7IGRlYnVnOklEZWJ1Z30gPSB7XHJcbiAgICAgICAgICAgIGZpZWxkUGF0aDogXCJUaXRsZVwiLFxyXG4gICAgICAgICAgICB0aXRsZTogXCJUaXRsZSBWYWx1ZVwiLFxyXG4gICAgICAgICAgICBjYWxjdWxhdGVkVmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZWRUaXRsZTogXCJcIixcclxuICAgICAgICAgICAgdmFsdWVPbk5vdEZvdW5kOiBcIk5vdCBGb3VuZFwiLFxyXG4gICAgICAgICAgICBzZWFyY2hQYXJlbnRzOiBmYWxzZSxcclxuICAgICAgICAgICAgbWF4RGVwdGg6IDAsXHJcbiAgICAgICAgICAgIGZvcm1hdHRlcjogXCJ2YWx1ZVwiLFxyXG4gICAgICAgICAgICBkZWJ1Zzoge1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBsb2dUb0NvbnNvbGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2hvd0luQXNwZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3VwZXIoXCJTaW5nbGVWYWx1ZUFzcGVjdFwiLCBcImFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyXCIsIGVsZW1lbnQsIGNvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbCwgZGVmYXVsdHMpXHJcblxyXG4gICAgICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLm9wdGlvbnMudGl0bGUoKSB8fCBcIlRpdGxlIFZhbHVlXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIEJhc2UgcHJvcGVydGllc1xyXG5cclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHByaXZhdGUgaW5pdGlhbGlzZSgpIHsvLyEgTm90ZTogVUkgZnJhbWV3b3JrIGxvb2tzIGZvciB0aGlzIG1ldGhvZCBuYW1lIGFuZCBpZiBmb3VuZCBiZWhhdmVzIGRpZmZlcmVudGx5IGFuZCB3b250IGNhbGwgbG9hZEFuZEJpbmRcclxuXHJcbiAgICBwcml2YXRlIHNldHVwKCkge1xyXG4gICAgICAgIC8vIE1hcCB0aGUgcm9sZUNvbmZpZ01vZGVsc1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5maWVsZFBhdGguc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhcIkZpZWxkIHBhdGggY2hhbmdlZFwiLCBcImdyZWVuXCIsbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRBbmRCaW5kKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmNhbGN1bGF0ZWRUaXRsZSh0aGlzLm9wdGlvbnMudGl0bGUoKSB8fCBcIlRpdGxlIFZhbHVlXCIpO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy50aXRsZS5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiVGl0bGUgY2hhbmdlZFwiLCBcImdyZWVuXCIsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgaWYobmV3VmFsdWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuY2FsY3VsYXRlZFRpdGxlKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG92ZXJyaWRlIGxvYWRBbmRCaW5kKCk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSAobW9kZWwpIHBhc3NlZCBpblwiLCBcImdyZWVuXCIpO1xyXG4gICAgICAgIC8vIHN1cGVyLmxvYWRBbmRCaW5kKCk7IC8vTm8gbmVlZCB0byBsb2FkIGFuZCBiaW5kIGFzIHdlIGFyZSBub3QgdXNpbmcgdGhlIGJhc2UgbW9kZWxcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuc2hhcmVkb0lkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBzaGFyZWRvSWQgcGFzc2VkIGluXCIsIFwicmVkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighdGhpcy5vcHRpb25zLmZpZWxkUGF0aCgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBmaWVsZCBwYXRoIHBhc3NlZCBpblwiLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlKHRoaXMuc2hhcmVkb0lkKCksIHRoaXMub3B0aW9ucy5maWVsZFBhdGgoKSEsIHRoaXMub3B0aW9ucy5zZWFyY2hQYXJlbnRzKCkhLCB0aGlzLm9wdGlvbnMubWF4RGVwdGgoKSkudGhlbigoZGF0YSk9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFkYXRhIHx8IGRhdGEuZm91bmQgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gZGF0YSByZXR1cm5lZFwiLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jYWxjdWxhdGVkVmFsdWUodGhpcy5vcHRpb25zLnZhbHVlT25Ob3RGb3VuZCgpIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXRWYWx1ZShkYXRhLnZhbHVlLCB0aGlzLm9wdGlvbnMuZm9ybWF0dGVyKCkgfHwgXCJ2YWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuY2FsY3VsYXRlZFZhbHVlKGZvcm1hdHRlZFZhbHVlIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZvcm1hdFZhbHVlKHZhbHVlOiBhbnksIGZvcm1hdHRlcjogc3RyaW5nKTogYW55IHtcclxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgZnVuY3Rpb24gYmFzZWQgb24gdGhlIGZvcm1hdHRlclxyXG4gICAgICAgIGNvbnN0IGR5bmFtaWNGdW5jID0gbmV3IEZ1bmN0aW9uKCd2YWx1ZScsIGByZXR1cm4gKCR7Zm9ybWF0dGVyfSk7YCk7XHJcbiAgICAgICAgLy8gSW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBnaXZlbiB2YWx1ZVxyXG4gICAgICAgIHJldHVybiBkeW5hbWljRnVuYyh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICAgXHJcblxyXG4gICAgb3ZlcnJpZGUgb25TYXZlKG1vZGVsOiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5sb2coXCJTYXZpbmcgZGF0YSAobW9kZWwpIHBhc3NlZCBpblwiLCBcImdyZWVuXCIpO1xyXG4gICAgICAgIC8vIHN1cGVyLm9uU2F2ZShtb2RlbCk7XHJcblxyXG4gICAgfTtcclxufSAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=