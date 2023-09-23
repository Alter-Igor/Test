/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Interfaces/components/IAutoCompleteFindCardOptions.ts":
/*!*******************************************************************!*\
  !*** ./src/Interfaces/components/IAutoCompleteFindCardOptions.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AUTOCOMPLETE_CARD_TYPE: () => (/* binding */ AUTOCOMPLETE_CARD_TYPE),
/* harmony export */   AUTOCOMPLETE_DISPLAY_MODE: () => (/* binding */ AUTOCOMPLETE_DISPLAY_MODE),
/* harmony export */   AUTOCOMPLETE_MODE: () => (/* binding */ AUTOCOMPLETE_MODE)
/* harmony export */ });
var AUTOCOMPLETE_MODE;
(function (AUTOCOMPLETE_MODE) {
    AUTOCOMPLETE_MODE["CHOOSE"] = "choose";
    AUTOCOMPLETE_MODE["SELECT"] = "select";
})(AUTOCOMPLETE_MODE || (AUTOCOMPLETE_MODE = {}));
var AUTOCOMPLETE_CARD_TYPE;
(function (AUTOCOMPLETE_CARD_TYPE) {
    AUTOCOMPLETE_CARD_TYPE["RESULT"] = "result";
    AUTOCOMPLETE_CARD_TYPE["MESSAGE"] = "message";
})(AUTOCOMPLETE_CARD_TYPE || (AUTOCOMPLETE_CARD_TYPE = {}));
var AUTOCOMPLETE_DISPLAY_MODE;
(function (AUTOCOMPLETE_DISPLAY_MODE) {
    AUTOCOMPLETE_DISPLAY_MODE["SEARCH"] = "search";
    AUTOCOMPLETE_DISPLAY_MODE["LOADING"] = "loading";
    AUTOCOMPLETE_DISPLAY_MODE["RESULT"] = "result";
})(AUTOCOMPLETE_DISPLAY_MODE || (AUTOCOMPLETE_DISPLAY_MODE = {}));


/***/ }),

/***/ "./src/WebBased/Common/ObjectHelper.ts":
/*!*********************************************!*\
  !*** ./src/WebBased/Common/ObjectHelper.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setAllFieldsToNull: () => (/* binding */ setAllFieldsToNull),
/* harmony export */   strToClass: () => (/* binding */ strToClass)
/* harmony export */ });
function strToClass(className, base) {
    const classParts = className.split('.');
    let classReference = base;
    for (const part of classParts) {
        if (!classReference[part]) {
            return undefined;
        }
        classReference = classReference[part];
    }
    ;
    return classReference;
}
function setAllFieldsToNull(model) {
    let keys = Object.keys(model);
    keys.forEach((key) => {
        model[key] = null;
    });
}


/***/ }),

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

/***/ "./src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts":
/*!**************************************************************!*\
  !*** ./src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseIDEAspect: () => (/* binding */ BaseIDEAspect),
/* harmony export */   FOMR_BUILDER_PATH_STRING: () => (/* binding */ FOMR_BUILDER_PATH_STRING),
/* harmony export */   getFormBuilderFieldPath: () => (/* binding */ getFormBuilderFieldPath)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _KOConverter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KOConverter */ "./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts");
/* harmony import */ var _ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ObjectHelpers */ "./src/WebBased/IDEAspects/BaseClasses/ObjectHelpers.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");




// abstract class Creator<TConfig> {
//     public abstract FactoryMethod(element: HTMLElement, configuration: IBaseIDEAspectConfiguration<TConfig>, baseModel: any): any;
// }
const FOMR_BUILDER_PATH_STRING = "aspectData.formBuilder.formData";
function getFormBuilderFieldPath(formBuilderField) {
    return `${FOMR_BUILDER_PATH_STRING}.${formBuilderField}`;
}
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
    constructor(componentName, loadSaveLocation, element, configuration, baseModel) {
        this.uniqueId = (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])();
        this.LocationToSaveOrLoadData = loadSaveLocation;
        this.thisComponentName = componentName;
        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = configuration;
        this.baseModel = baseModel;
        this.defaults = this.setDefaults(); //setup the default by calling the abstract method in the child class
        // this.data = undefined;
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
        this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave(); //setup the location to load and save the data from by calling the abstract method in the child class
    }
    get data() {
        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to load data from set - this method should be overriden", "red");
            return this._data;
        }
        let nestedData = (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.getNestedProperty)(this.model, this.LocationToSaveOrLoadData);
        this.log("Data found at location", "green", nestedData);
        let retValue = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(nestedData);
        this.log("Data found at location", "green", retValue);
        return retValue;
    }
    set data(value) {
        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to save data to set - this method should be overriden", "red");
            this._data = value;
            return;
        }
        let valueToSet = value;
        // if(this.LocationToSaveOrLoadData.includes("formBuilder"))
        // {
        //     //formbuilder Data always need to be string
        //     this.log("Setting formbuilder data - converting to string", "green", value)
        //     valueToSet = JSON.stringify(value);
        //     this.log("after Setting formbuilder data - converted to string", "green", valueToSet)
        // }
        this.log("Setting data at location", "green", valueToSet);
        (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.setNestedProperty)(this.model, this.LocationToSaveOrLoadData, valueToSet);
    }
    /**
     * Called by the aspect IDE adapter when the model is saved. Manipulate the
     * model as required.
     */
    onSave(model) {
        this.log("Saving, model passed in we need to persist to", "green", this.data);
        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to save data to set - this method should be overriden", "red");
            return;
        }
        let dataToPersist = this.data;
        let currentData = (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.getNestedProperty)(model, this.LocationToSaveOrLoadData);
        if (currentData) {
            this.log(`Current data at location ${this.LocationToSaveOrLoadData} :`, "magenta", currentData);
        }
        if (!currentData) {
            // this.log("Data does not exist, we will create", "orange");
            //  setNestedProperty(model, this.LocationToSaveOrLoadData, {});
            // currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
        }
        this.log(`New data to persist to location ${this.LocationToSaveOrLoadData} :`, "blue", dataToPersist);
        (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.setNestedProperty)(model, this.LocationToSaveOrLoadData, dataToPersist);
    }
    ;
    onDestroy(model) {
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
    /**
     *
     * @returns Formbuild if it exists or creates it if it does not
     *
     */
    formbuilder() {
        if (!this.blade?.model?.aspectData?.formBuilder?.formData) {
            this.log("blade.model.aspectData.formBuilder.formData not found - will create the path", "blue");
        }
        else {
            this.log("blade.model.aspectData.formBuilder.formData found", "green");
        }
        //Ensure the path exists
        this.blade = this.blade || {};
        this.blade.model = this.blade.model || {};
        this.blade.model.aspectData = this.blade.model.aspectData || {};
        this.blade.model.aspectData.formBuilder = this.blade.model.aspectData.formBuilder || { formData: {} };
        return this.blade.model.aspectData.formBuilder.formData;
    }
    formbuilderField(formbuilderField, setValue) {
        if (!this.formbuilder()) {
            this.log("Form builder does not exist! ", "red");
            throw new Error("Form builder does not exist!");
        }
        let foundValue = this.formbuilder()[formbuilderField];
        if (!foundValue) {
            this.log(`Form builder does not contain field ${formbuilderField} `, "orange");
            this.log(`Creating field ${formbuilderField} `, "blue");
            this.formbuilder()[formbuilderField] = undefined;
        }
        //Are we doing a set
        if (setValue) {
            this.log(`Setting ${formbuilderField} to ${setValue}`, "green");
            this.formbuilder()[formbuilderField] = setValue;
            return setValue;
        }
        return foundValue;
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

/***/ "./src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearchConfig.ts":
/*!************************************************************************************!*\
  !*** ./src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearchConfig.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Default: () => (/* binding */ Default)
/* harmony export */ });
const Default = {
    fackMode: false,
    searchApiUrl: "api/externalMatterProvider/query/{0}",
    loadApiUrl: "api/externalMatterProvider/details/{data.code}",
    dataMapping: [
        { formBuilderField: "matterNumber", searchResultField: "matterCode" },
        { formBuilderField: "matterShortName", searchResultField: "shortName" },
        { formBuilderField: "matterClient{*}", searchResultField: "client.{*}" },
        { formBuilderField: "matterPartnerName", searchResultField: "partner.name" },
        { formBuilderField: "matterPartnerEmail", searchResultField: "partner.name" },
    ],
    fackSearchDataIDEPath: undefined,
    fackLoadDataIDEPath: undefined,
    debug: {
        enabled: false,
        logToConsole: false,
        showInAspect: false
    }
};
let exmaple = {
    "matterCode": "81735092",
    "shortName": "Contract negotiation for IT services agreement",
    "status": "Closed",
    "isSecure": true,
    "client": {
        "code": "108976",
        "name": "Tech Solutions Inc.",
        "email": ""
    },
    "partner": {
        "code": "19976",
        "name": "Jackson, Gareth",
        "email": "gareth.jackson@hsf.com"
    }
};


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

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
/*!******************************************************************************!*\
  !*** ./src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearch.ts ***!
  \******************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExternalMatterSearch: () => (/* binding */ ExternalMatterSearch)
/* harmony export */ });
/* harmony import */ var _Interfaces_components_IAutoCompleteFindCardOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Interfaces/components/IAutoCompleteFindCardOptions */ "./src/Interfaces/components/IAutoCompleteFindCardOptions.ts");
/* harmony import */ var _Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/ObjectHelper */ "./src/WebBased/Common/ObjectHelper.ts");
/* harmony import */ var _Common_api_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Common/api/api */ "./src/WebBased/Common/api/api.ts");
/* harmony import */ var _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../BaseClasses/BaseIDEAspect */ "./src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts");
/* harmony import */ var _ExternalMatterSearchConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ExternalMatterSearchConfig */ "./src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearchConfig.ts");





let thisWidgetSystemName = "ExternalMatterSearch";
class ExternalMatterSearch extends _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_3__.BaseIDEAspect {
    constructor(element, configuration, baseModel) {
        super(thisWidgetSystemName, "aspectData.odsEntityPicker", element, configuration, baseModel);
        this.selectedMatter = ko.observable();
        this.setup();
    }
    setDefaults() {
        return _ExternalMatterSearchConfig__WEBPACK_IMPORTED_MODULE_4__.Default;
    }
    setExampleForModeller() {
        return _ExternalMatterSearchConfig__WEBPACK_IMPORTED_MODULE_4__.Default;
    }
    setLocationOfDataToLoadAndSave() {
        return undefined;
    }
    // private initialise() {//! Note: UI framework looks for this method name and if found behaves differently and wont call loadAndBind
    /**
     * @method setup
     * @description Sets up the auto complete handler
     * @returns {void}
     */
    setup() {
        this.autoComplete = new Sharedo.UI.Framework.Components.AutoCompleteHandler({
            enabled: true,
            mode: _Interfaces_components_IAutoCompleteFindCardOptions__WEBPACK_IMPORTED_MODULE_0__.AUTOCOMPLETE_MODE.SELECT,
            text: {
                placeholder: "Search for matter",
                empty: "Start typing to lookup a matter by number",
                emptyIcon: "fa-search",
                typing: "Will search when you stop typing",
                searching: "One moment...",
                noResults: "Nothing found"
            },
            select: {
                allowClear: true,
                selectedValue: null,
                onLoad: this.loadMatter.bind(this)
            },
            onFind: this.autoCompleteFinder.bind(this),
            templates: { result: "__matter_search_item_template" },
        });
    }
    /**
     * @method load
     * @description Loads the data from the sharedo model form builder
     * @param {any} model - The model to load from
     * @returns {void}
     */
    load(model) {
        if (!this.sharedoId())
            return;
        model.aspectData = model.aspectData || {};
        model.aspectData.formBuilder = model.aspectData.formBuilder || {};
        model.aspectData.formBuilder.formData = model.aspectData.formBuilder.formData || {};
        var formData = model.aspectData.formBuilder.formData;
        let matterModel = {
            code: formData.externalMatter_Code,
            title: formData.externalMatter_Title,
            client: formData.externalMatter_Client,
            partner: formData.externalMatter_Partner,
            status: formData.externalMatter_Status,
            isSecure: formData.externalMatter_IsSecure,
        };
        addVisualExtension(matterModel);
        this.selectedMatter(matterModel);
    }
    loadMatter(model) {
        //https://hsf-vnext.sharedo.co.uk/api/externalMatterProvider/details/81735089
        if (!model || !model.code)
            return null;
        $ui.stacks.lock(self, "Loading");
        this.log("Loading Matter: " + model.code, "green");
        let url = this.options.loadApiUrl();
        //find any values within {} and replace with the value from the model
        let matches = url.match(/{([^}]+)}/g);
        if (matches) {
            matches.forEach((m) => {
                let key = m.replace("{", "").replace("}", "");
                url = url.replace(m, model[key]);
            });
        }
        this.log("Loading Matter using : " + url, "green");
        (0,_Common_api_api__WEBPACK_IMPORTED_MODULE_2__.executeGet)(url).then((response) => {
            model.code = response.matterCode;
            model.shortName = response.shortName;
            model.client = response.client?.name;
            model.partner = response.partner?.name;
            model.status = response.status;
            model.isSecure = response.secure;
        }).catch((error) => {
            (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_1__.setAllFieldsToNull)(model);
        }).finally(() => {
            addVisualExtension(model);
            this.selectedMatter(model);
            $ui.stacks.unlock(self);
        });
        //Resut the basic selected display card to the auto complete
        return new Sharedo.UI.Framework.Components.AutoCompleteDisplayCard({
            id: model,
            icon: null,
            text: model.code + " - " + model.title
        });
    }
    ;
    _aspectReload(model) {
        this.load(model);
    }
    ;
    save(model) {
        var matter = {
            externalMatter_Code: null,
            externalMatter_Title: null,
            externalMatter_Client: null,
            externalMatter_Partner: null,
            externalMatter_Status: null,
            externalMatter_IsSecure: false
        };
        var modelMatter = this.selectedMatter();
        if (modelMatter) {
            matter.externalMatter_Client = modelMatter.client;
            matter.externalMatter_Partner = modelMatter.partner;
            matter.externalMatter_Title = modelMatter.title;
            matter.externalMatter_Code = modelMatter.code;
            matter.externalMatter_Status = modelMatter.status;
            matter.externalMatter_IsSecure = modelMatter.isSecure;
        }
        $.extend(model.aspectData.formBuilder.formData, matter);
    }
    ;
    autoCompleteFinder(v, handler) {
        var search = v.toLowerCase();
        var result = $.Deferred();
        //if (!self.sharedoId()) return;
        this.log("Searching for: " + search, "green");
        let url = this.options.searchApiUrl();
        //replace any {0} with the search term
        if (url.indexOf("{searchTerm}") > -1) {
            url = url.replace("{searchTerm}", search);
        }
        (0,_Common_api_api__WEBPACK_IMPORTED_MODULE_2__.executeGet)(url).then((data) => {
            let cards = new Array();
            data.externalMatterProviderSearchResults.forEach((d) => {
                addVisualExtension(d);
                cards.push(new Sharedo.UI.Framework.Components.AutoCompleteFindCard({
                    type: _Interfaces_components_IAutoCompleteFindCardOptions__WEBPACK_IMPORTED_MODULE_0__.AUTOCOMPLETE_CARD_TYPE.RESULT,
                    data: d,
                    icon: d.icon,
                    id: d,
                    styles: null,
                    cssClass: d.cssClass,
                }));
            });
            result.resolve(cards);
        });
        return result;
    }
    ;
    autoCompleteSelect(selectCard, handler) {
    }
    ;
    loadAndBind() {
        this.log("No LoadAndBind Implemented", "green");
        // super.loadAndBind();
        this.selectedDiv = this.element.querySelector("#selected");
    }
    ;
    buildSelectedCard() {
        this.log("No BuildSelectedCard Implemented", "green");
        this.selectedDiv.innerHTML = "";
    }
    onSave(model) {
        this.log("No Save Implemented", "green");
        // super.onSave(model);
    }
    ;
}
function flattenObject(ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i))
            continue;
        if ((typeof ob[i]) == 'object') {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x))
                    continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        }
        else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}
function addVisualExtension(matterModel) {
    if (!matterModel)
        return;
    matterModel.cssClass = "";
    //add Icon
    if (matterModel.status == "Closed") {
        matterModel.icon = "fa-lock  text-danger";
        matterModel.cssClass = "closed-matter";
    }
    else {
        matterModel.icon = "fa-unlock text-success";
        matterModel.cssClass = "open-matter";
    }
    //add css class
    if (matterModel.isSecure) {
        matterModel.cssClass += " secure-matter";
    }
}

})();

var __webpack_export_target__ = (IDEAspects = typeof IDEAspects === "undefined" ? {} : IDEAspects);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUM7UUFDOUIsV0FBVyxDQUFDLElBQUksR0FBRyxzQkFBc0IsQ0FBQztRQUMxQyxXQUFXLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQztLQUMxQztTQUVEO1FBQ0ksV0FBVyxDQUFDLElBQUksR0FBRyx3QkFBd0IsQ0FBQztRQUM1QyxXQUFXLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztLQUN4QztJQUVELGVBQWU7SUFDZixJQUFHLFdBQVcsQ0FBQyxRQUFRLEVBQUM7UUFDcEIsV0FBVyxDQUFDLFFBQVEsSUFBSSxnQkFBZ0IsQ0FBQztLQUM1QztBQUdMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL0ludGVyZmFjZXMvY29tcG9uZW50cy9JQXV0b0NvbXBsZXRlRmluZENhcmRPcHRpb25zLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL09iamVjdEhlbHBlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvYXBpLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9CYXNlSURFQXNwZWN0LnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9LT0NvbnZlcnRlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvT2JqZWN0SGVscGVycy50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvRXh0ZXJuYWxNYXR0ZXJTZWFyY2gvRXh0ZXJuYWxNYXR0ZXJTZWFyY2hDb25maWcudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy9leHRlcm5hbCB2YXIgXCJrb1wiIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9FeHRlcm5hbE1hdHRlclNlYXJjaC9FeHRlcm5hbE1hdHRlclNlYXJjaC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLyoqXG4gKiBAaW50ZXJmYWNlIElBdXRvQ29tcGxldGVGaW5kQ2FyZE9wdGlvbnNcbiAqIEBkZXNjcmlwdGlvbiBPcHRpb25zIGZvciB0aGUgQXV0b0NvbXBsZXRlRmluZENhcmRcbiAqIEBwcm9wZXJ0eSB7QVVUT0NPTVBMRVRFX0NBUkRfVFlQRX0gdHlwZSAtIFRoZSB0eXBlIG9mIGNhcmQgdG8gcmVuZGVyXG4gKiBAcHJvcGVydHkge2FueX0gaWQgLSBUaGUgaWQgb2YgdGhlIGNhcmRcbiAqIEBwcm9wZXJ0eSB7YW55fSBkYXRhIC0gVGhlIGRhdGEgcGFja2FnZSBmb3IgdGhlIG1hdGNoXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaWNvbiAtIFRoZSBpY29uIHRvIGRpc3BsYXlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0ZXh0IC0gVGhlIHRleHQgdG8gZGlzcGxheVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHN0eWxlcyAtIFRoZSBzdHlsZXMgdG8gYXBwbHkgdG8gdGhlIGNhcmRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0ZW1wbGF0ZSAtIFRoZSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVuZGVyIHRoZSBjYXJkLGlmIHRoaXMgaXNuJ3Qgc3BlY2lmaWVkLCB3aWxsIHVzZSB0aGUgZGVmYXVsdCB0ZW1wbGF0ZSBmb3IgdGhlIHR5cGUgIHdoaWNoIGlzIGVpdGhlciBhIHN0YW5kYXJkIHRlbXBsYXRlIGZyb20gdGhlIGF1dG8gY29tcGxldGUgKHVzZXMgc2ltcGxlIHByb3BlcnRpZXMgb25seSksIG9yIGEgZ2xvYmFsbHkgb3ZlcnJpZGRlbiB0ZW1wbGF0ZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjc3NDbGFzcyAtIFRoZSBjc3MgY2xhc3MgdG8gYXBwbHkgdG8gdGhlIGNhcmRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQXV0b0NvbXBsZXRlRmluZENhcmRPcHRpb25zIHtcbiAgICB0eXBlPzogQVVUT0NPTVBMRVRFX0NBUkRfVFlQRSxcbiAgICBpZD86IGFueSxcbiAgICBkYXRhPzogYW55LCAvLyBkYXRhOiBUaGUgZGF0YSBwYWNrYWdlIGZvciB0aGUgbWF0Y2hcbiAgICBpY29uPzogc3RyaW5nIHwgbnVsbCxcbiAgICB0ZXh0Pzogc3RyaW5nLFxuICAgIHN0eWxlcz86IHN0cmluZyB8IG51bGwsXG4gICAgdGVtcGxhdGU/OiBhbnksXG4gICAgY3NzQ2xhc3M/OiBzdHJpbmcgfCBudWxsLFxufVxuXG5leHBvcnQgZW51bSBBVVRPQ09NUExFVEVfTU9ERSB7XG4gICAgQ0hPT1NFID0gJ2Nob29zZScsXG4gICAgU0VMRUNUID0gJ3NlbGVjdCdcbn1cblxuZXhwb3J0IGVudW0gQVVUT0NPTVBMRVRFX0NBUkRfVFlQRSB7XG4gICAgUkVTVUxUID0gJ3Jlc3VsdCcsXG4gICAgTUVTU0FHRSA9ICdtZXNzYWdlJ1xufVxuXG5leHBvcnQgZW51bSBBVVRPQ09NUExFVEVfRElTUExBWV9NT0RFIHtcbiAgICBTRUFSQ0ggPSAnc2VhcmNoJyxcbiAgICBMT0FESU5HID0gJ2xvYWRpbmcnLFxuICAgIFJFU1VMVCA9ICdyZXN1bHQnXG59IiwiXG5leHBvcnQgZnVuY3Rpb24gc3RyVG9DbGFzcyhjbGFzc05hbWU6c3RyaW5nLCBiYXNlOmFueSkge1xuICAgIGNvbnN0IGNsYXNzUGFydHMgPSBjbGFzc05hbWUuc3BsaXQoJy4nKTtcbiAgICBsZXQgY2xhc3NSZWZlcmVuY2UgPSBiYXNlO1xuXG4gICAgZm9yIChjb25zdCBwYXJ0IG9mIGNsYXNzUGFydHMpIHtcbiAgICAgICAgaWYoIWNsYXNzUmVmZXJlbmNlW3BhcnRdKSBcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjbGFzc1JlZmVyZW5jZSA9IGNsYXNzUmVmZXJlbmNlW3BhcnRdO1xuICAgIH07IFxuICAgIHJldHVybiBjbGFzc1JlZmVyZW5jZTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QWxsRmllbGRzVG9OdWxsKG1vZGVsOmFueSkge1xuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobW9kZWwpO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5OiBhbnkpID0+IHtcbiAgICAgICAgbW9kZWxba2V5XSA9IG51bGw7XG4gICAgfSk7XG59IiwiXG4vKipcbiAqIFRoaXMgZmlsZSBjb250YWlucyB0aGUgYXBpIGNhbGxzIHRvIHRoZSBiYWNrZW5kLlxuICogdXRpbGlzaW5nIHRoZSBheGlvcyBsaWJyYXJ5IHRvIG1ha2UgdGhlIGNhbGxzLlxuICogaW5jbHVzaW5nIG9mIHdlYnBhY2tJZ25vcmUgaXMgdG8gYWxsb3cgdGhlIHdlYnBhY2sgdG8gaWdub3JlIHRoZSBjYWxscyBhbmQgbm90IHRyeSB0byBidW5kbGUgdGhlbS5cbiAqL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVBvc3Q8VD4oYXBpOiBzdHJpbmcsIHBvc3RCb2R5OiBhbnkpIDogUHJvbWlzZTxUPntcbiAgICAvL3JldHVybiBhd2FpdCAkYWpheC5wb3N0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiBleGVjdXRlRmV0Y2g8VD4oYXBpLFwiUE9TVFwiLHBvc3RCb2R5KTtcbn1cblxuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVHZXQ8VD4oYXBpOiBzdHJpbmcpIDogUHJvbWlzZTxUPntcbi8vICAgICByZXR1cm4gYXdhaXQgJGFqYXguZ2V0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSk7XG4vLyB9IFxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldDxUPihhcGk6IHN0cmluZykgOiBQcm9taXNlPFQ+e1xuICAgcmV0dXJuIGV4ZWN1dGVGZXRjaDxUPihhcGksXCJHRVRcIix1bmRlZmluZWQpO1xufVxuXG5cblxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlUHV0PFQ+KGFwaTogc3RyaW5nLCBwb3N0Qm9keTogYW55KSA6IFByb21pc2U8VD57XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXgucHV0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiBleGVjdXRlRmV0Y2g8VD4oYXBpLFwiUFVUXCIscG9zdEJvZHkpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZURlbGV0ZTxUPihhcGk6IHN0cmluZykgOiBQcm9taXNlPFQ+e1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LmRlbGV0ZSgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSkpO1xuICAgIHJldHVybiBleGVjdXRlRmV0Y2g8VD4oYXBpLFwiREVMRVRFXCIsdW5kZWZpbmVkKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVBcGkoYXBpOiBzdHJpbmcpIDogc3RyaW5ne1xuICAgbGV0IGxvY2F0aW9uPSAgd2luZG93LmRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbjtcblxuICAgLy9pZiBhcGkgZG9lcyBub3QgaW5jbHVkZSB0aGUgbG9jYXRpb24gdGhlbiBhZGQgaXQuXG4gICAgaWYoYXBpLmluZGV4T2YobG9jYXRpb24pID09PSAtMSl7XG4gICAgICAgIC8vY2hlY2sgaWYgYXBpIHN0YXJ0IHdpdGggYSAvIGlmIG5vdCBhZGQgaXQuXG4gICAgICAgIGlmKGFwaS5pbmRleE9mKFwiL1wiKSAhPT0gMCl7XG4gICAgICAgICAgICBhcGkgPSBcIi9cIiArIGFwaTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYXBpID0gbG9jYXRpb24gKyBhcGk7XG4gICAgfVxuICAgIHJldHVybiBhcGk7XG4gICAgXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlRmV0Y2g8VD4oYXBpOiBzdHJpbmcsIG1ldGhvZDpzdHJpbmcsZGF0YTphbnkpIDogUHJvbWlzZTxUPntcbiAgICBsZXQgdXJsID0gdmFsaWRhdGVBcGkoYXBpKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gYnVpbGRIZWFkZXJzKCk7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGZldGNoSGVhZGVycyxcbiAgICAgICAgYm9keTogZGF0YT8gSlNPTi5zdHJpbmdpZnkoZGF0YSk6IHVuZGVmaW5lZFxuICAgIH1cbiAgICApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgIC8vY2hlY2sgaWYgcmVzcG9uc2UgaXMgSlNPTlxuICAgICAgICBpZihyZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKT8uaW5kZXhPZihcImFwcGxpY2F0aW9uL2pzb25cIikgPT09IC0xKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlc3BvbnNlIHdhcyBub3QgSlNPTlwiKTtcbiAgICAgICAgfVxuICAgICAgICAvL3JldHVybiB0aGUganNvbiBhcyBvYmplY3RcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkSGVhZGVycygpIHtcbiAgICBsZXQgYmVhcmVyID0gZ2V0QmVhcmVyVG9rZW4oKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBmZXRjaEhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICBpZiAoYmVhcmVyKSB7XG4gICAgICAgIGZldGNoSGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIGJlYXJlcik7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaEhlYWRlcnM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb2tpZXMoKTogeyBba2V5OnN0cmluZ106c3RyaW5nIH1cbntcbiAgICBsZXQgcmV0VmFsdWU6IHsgW2tleTpzdHJpbmddOnN0cmluZyB9ID0ge307XG4gICAgbGV0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpLnJlZHVjZShmdW5jdGlvbiAoY29va2llcywgY29va2llKVxuICAgIHtcbiAgICAgICAgdmFyIHBhcnRzID0gY29va2llLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMilcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhcnRzWzBdLnRyaW0oKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzWzFdO1xuXG4gICAgICAgICAgICByZXRWYWx1ZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvb2tpZXM7XG4gICAgfSwge30pO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJlYXJlclRva2VuKClcbntcbiAgICB2YXIgY29va2llcyA9IGdldENvb2tpZXMoKTtcbiAgICB2YXIgdG9rZW4gPSBjb29raWVzW1wiX2FwaVwiXTtcblxuICAgIGlmKCB0b2tlbiApIHJldHVybiBcIkJlYXJlciBcIiArIHRva2VuO1xuICAgIHJldHVybiBudWxsO1xufTsiLCJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcbmltcG9ydCB7IElTaGFyZWRvQmxhZGVNb2RlbCwgVFNoYXJlRG9CbGFkZSwgSUNvbmZpZ3VyYXRpb25Ib3N0IH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvU2hhcmVkb0FzcGVjdE1vZGVsc1wiO1xuaW1wb3J0IHsgSURlYnVnIH0gZnJvbSBcIi4vSURlYnVnXCI7XG5pbXBvcnQgeyB0b09ic2VydmFibGVPYmplY3QgfSBmcm9tIFwiLi9LT0NvbnZlcnRlclwiO1xuaW1wb3J0IHsgZ2V0TmVzdGVkUHJvcGVydHksIHNldE5lc3RlZFByb3BlcnR5IH0gZnJvbSBcIi4vT2JqZWN0SGVscGVyc1wiO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgVFNoYXJlZG8gfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9UU2hhcmVkb1wiO1xuXG5leHBvcnQgdHlwZSBEZWZhdWx0czxUPiA9IFQgJiB7IGRlYnVnOiBJRGVidWcgfVxuXG5pbnRlcmZhY2UgSURFQXNwZWN0Q29uZmlndXJhdGlvbiB7XG4gICAgbW9kZWw6IElTaGFyZWRvQmxhZGVNb2RlbDtcbiAgICBibGFkZTogVFNoYXJlRG9CbGFkZTtcbn1cblxudHlwZSBPYnNlcnZhYmxlaWZ5PFQ+ID0ge1xuICAgIFtQIGluIGtleW9mIFRdOiBrby5PYnNlcnZhYmxlPFRbUF0+O1xufTtcblxuZXhwb3J0IHR5cGUgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+ID0geyBbSyBpbiBrZXlvZiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5dOiBrby5PYnNlcnZhYmxlPElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPltLXT47IH1cblxuZXhwb3J0IHR5cGUgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBUQ29uZmlnICYge1xuICAgIGRlYnVnOiBJRGVidWc7XG59XG5cbmV4cG9ydCB0eXBlIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPiA9IElDb25maWd1cmF0aW9uSG9zdCAmIElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+O1xuLy8gYWJzdHJhY3QgY2xhc3MgQ3JlYXRvcjxUQ29uZmlnPiB7XG4vLyAgICAgcHVibGljIGFic3RyYWN0IEZhY3RvcnlNZXRob2QoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPiwgYmFzZU1vZGVsOiBhbnkpOiBhbnk7XG4vLyB9XG5cblxuXG5leHBvcnQgY29uc3QgRk9NUl9CVUlMREVSX1BBVEhfU1RSSU5HID0gXCJhc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybUJ1aWxkZXJGaWVsZFBhdGgoZm9ybUJ1aWxkZXJGaWVsZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGAke0ZPTVJfQlVJTERFUl9QQVRIX1NUUklOR30uJHtmb3JtQnVpbGRlckZpZWxkfWA7XG59XG5cbnR5cGUgT2JzZXJ2YWJsZVBlcnNvbjxUQ29uZmlnPiA9IE9ic2VydmFibGVpZnk8SUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+PjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VJREVBc3BlY3Q8VENvbmZpZywgVFBlcnNpdGFuY2U+ICB7XG4gICAgX2RhdGE6YW55OyAvL25vbiBtb2RlbCBkYXRhIHN0b3JhZ2VcbiAgICBvcmlnaW5hbENvbmZpZ3VyYXRpb246IFRDb25maWc7XG4gICAgY29uZmlndXJhdGlvbjogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgIGRlZmF1bHRzOiBEZWZhdWx0czxUQ29uZmlnPiB8IHVuZGVmaW5lZDtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBtb2RlbDogYW55O1xuICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgYmxhZGU6IFRTaGFyZURvQmxhZGU7XG4gICAgbG9hZGVkOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIHNoYXJlZG9JZDogYW55O1xuICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgIHZhbGlkYXRpb246IGFueTtcbiAgICB2YWxpZGF0aW9uRXJyb3JDb3VudDoga28uT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIGJhc2VNb2RlbDogVFNoYXJlZG88YW55PjtcbiAgICB0aGlzQ29tcG9uZW50TmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgXG4gICAgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhOiBzdHJpbmcgfCB1bmRlZmluZWQ7IC8vVGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbVxuICAgIG9wdGlvbnM6IE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPlxuICAgIHVuaXF1ZUlkOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBCYXNlIENvbnN0cnVjdG9yIGZvciBhbGwgSURFQXNwZWN0cywgZm9yY2VzIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgbG9hZCBhbmQgc2F2ZSBtZXRob2RzXG4gICAgICogQHBhcmFtIGNvbXBvbmVudE5hbWUgLy9UaGUgbmFtZSBvZiB0aGUgY29tcG9uZW50IGUuZy4gQXNwZWN0LlF1aWNrVmlld1xuICAgICAqIEBwYXJhbSBsb2FkU2F2ZUxvY2F0aW9uIC8vVGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbSBlLmcuIG1vZGVsLmFzcGVjdC5Gb3JtQnVpbGRlci5mb3JtRGF0YVxuICAgICAqIEBwYXJhbSBlbGVtZW50IC8vVGhlIGVsZW1lbnQgdGhhdCB0aGUgYXNwZWN0IGlzIGJvdW5kIHRvXG4gICAgICogQHBhcmFtIGNvbmZpZ3VyYXRpb24gLy9UaGUgY29uZmlndXJhdGlvbiBwYXNzZWQgaW4gZnJvbSB0aGUgYmxhZGUgYW5kIHRoZSBkZXNpZ24gdGltZSBjb25maWd1cmF0aW9uXG4gICAgICogQHBhcmFtIGJhc2VNb2RlbCAvL1RoZSBiYXNlIG1vZGVsIHBhc3NlZCBpbiBmcm9tIHRoZSBibGFkZVxuICAgICAqIEBwYXJhbSBkZWZhdWx0cyAvL1RoZSBkZWZhdWx0cyBwYXNzZWQgaW4gZnJvbSB0aGUgd2lkZ2V0IHRvIHNldCBpbmNhc2Ugb2YgYmFkIGNvbmZpZ3VyYXRpb24gb3IgbWlzc2luZyBjb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50TmFtZTogc3RyaW5nLCBsb2FkU2F2ZUxvY2F0aW9uOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICBjb25maWd1cmF0aW9uOiBUQ29uZmlnLCBiYXNlTW9kZWw6IFRTaGFyZWRvPGFueT4pIHtcblxuICAgICAgICAgIFxuICAgICAgICB0aGlzLnVuaXF1ZUlkID0gdXVpZCgpO1xuICAgICAgICB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9IGxvYWRTYXZlTG9jYXRpb247XG4gICAgICAgIHRoaXMudGhpc0NvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAvL1NoYXJlRG8gcGFzc2VzIHRoZSBjb25maWcgYXMgd2VsbCBhcyBvdGhlciBzdHVmZiwgc28gd2UgbmVlZCB0byBleHRyYWN0IHRoZSBjb25maWdcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uIGFzIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbiAgICAgICAgdGhpcy5iYXNlTW9kZWwgPSBiYXNlTW9kZWw7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IHRoaXMuc2V0RGVmYXVsdHMoKTsgLy9zZXR1cCB0aGUgZGVmYXVsdCBieSBjYWxsaW5nIHRoZSBhYnN0cmFjdCBtZXRob2QgaW4gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgXG4gICAgICAgIC8vIHRoaXMuZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gTWVyZ2UgdGhlIGNvbmZpZ3VyYXRpb24gd2l0aCB0aGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gJC5leHRlbmQodGhpcy5kZWZhdWx0cywgdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24pIGFzIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDsgXG4gICAgICAgIC8vY3JlYXRlIGEgbmV3IG1vZGVsXG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLmNvbmZpZ3VyYXRpb24uX2hvc3QubW9kZWw7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMubW9kZWwuY2FuRWRpdDtcbiAgICAgICAgdGhpcy5ibGFkZSA9IHRoaXMuY29uZmlndXJhdGlvbi5faG9zdC5ibGFkZTtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgLy8gTWFwIHRoZSBiYXNlIG1vZGVsIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5zaGFyZWRvSWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsLmlkO1xuICAgICAgICBpZiAoIXRoaXMuc2hhcmVkb0lkIHx8IHRoaXMuc2hhcmVkb0lkKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gc2hhcmVkb0lkIGZvdW5kXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lID0gdGhpcy5jb25maWd1cmF0aW9uLl9ob3N0Lm1vZGVsLnNoYXJlZG9UeXBlU3lzdGVtTmFtZTtcbiAgICAgICAgaWYgKCF0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSB8fCB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9UeXBlU3lzdGVtTmFtZSBmb3VuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHRvT2JzZXJ2YWJsZU9iamVjdCh0aGlzLmNvbmZpZ3VyYXRpb24pO1xuXG4gICAgICAgIC8vIFZhbGlkYXRpb25cbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0ge307XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yQ291bnQgPSBrby5vYnNlcnZhYmxlKDApO1xuXG4gICAgICAgIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gdGhpcy5zZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTsgLy9zZXR1cCB0aGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tIGJ5IGNhbGxpbmcgdGhlIGFic3RyYWN0IG1ldGhvZCBpbiB0aGUgY2hpbGQgY2xhc3NcblxuXG4gICAgfVxuXG4gICAgZ2V0IGRhdGEoKSA6IFRQZXJzaXRhbmNlIHwgdW5kZWZpbmVkIHtcbiAgICBcbiAgICAgICAgaWYodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBsb2NhdGlvbiB0byBsb2FkIGRhdGEgZnJvbSBzZXQgLSB0aGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcnJpZGVuXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmVzdGVkRGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KHRoaXMubW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICBcbiAgICAgICAgdGhpcy5sb2coXCJEYXRhIGZvdW5kIGF0IGxvY2F0aW9uXCIsIFwiZ3JlZW5cIiwgbmVzdGVkRGF0YSk7XG4gICAgICAgIGxldCByZXRWYWx1ZSA9IGtvLnRvSlMobmVzdGVkRGF0YSk7XG4gICAgICAgIHRoaXMubG9nKFwiRGF0YSBmb3VuZCBhdCBsb2NhdGlvblwiLCBcImdyZWVuXCIsIHJldFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIH1cblxuICAgIHNldCBkYXRhKHZhbHVlOiBUUGVyc2l0YW5jZSB8IHVuZGVmaW5lZCkge1xuICAgICAgXG4gICAgICAgIGlmKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gbG9jYXRpb24gdG8gc2F2ZSBkYXRhIHRvIHNldCAtIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZW5cIiwgXCJyZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxldCB2YWx1ZVRvU2V0OiBhbnkgPSB2YWx1ZTtcbiAgICAgICAgLy8gaWYodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEuaW5jbHVkZXMoXCJmb3JtQnVpbGRlclwiKSlcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgLy9mb3JtYnVpbGRlciBEYXRhIGFsd2F5cyBuZWVkIHRvIGJlIHN0cmluZ1xuICAgICAgICAvLyAgICAgdGhpcy5sb2coXCJTZXR0aW5nIGZvcm1idWlsZGVyIGRhdGEgLSBjb252ZXJ0aW5nIHRvIHN0cmluZ1wiLCBcImdyZWVuXCIsIHZhbHVlKVxuICAgICAgICAvLyAgICAgdmFsdWVUb1NldCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgLy8gICAgIHRoaXMubG9nKFwiYWZ0ZXIgU2V0dGluZyBmb3JtYnVpbGRlciBkYXRhIC0gY29udmVydGVkIHRvIHN0cmluZ1wiLCBcImdyZWVuXCIsIHZhbHVlVG9TZXQpXG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5sb2coXCJTZXR0aW5nIGRhdGEgYXQgbG9jYXRpb25cIiwgXCJncmVlblwiLHZhbHVlVG9TZXQpO1xuICAgICAgICBzZXROZXN0ZWRQcm9wZXJ0eSh0aGlzLm1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgdmFsdWVUb1NldCk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqICEgaW1wb3J0YW50OiBNYW5kYXRvcnkgbWV0aG9kIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyB0byBzZXQgdGhlIGRlZmF1bHRzXG4gICAgICogKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIGNvbnN0cnVjdG9yIHRvIHNldCB0aGUgZGVmYXVsdHNcbiAgICAgKiBAcmV0dXJucyBEZWZhdWx0czxUQ29uZmlnPlxuICAgICAqIEBtZW1iZXJvZiBCYXNlSURFQXNwZWN0XG4gICAgICogQGFic3RyYWN0XG4gICAgICogXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0RGVmYXVsdHMoKTogRGVmYXVsdHM8VENvbmZpZz47XG5cbiAgICAvKipcbiAgICAgKiAhIGltcG9ydGFudDogTWFuZGF0b3J5IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gc2V0IHRoZSBkZWZhdWx0cyBmb3IgdGhlIHdpZGdldC5qc29uXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0RXhhbXBsZUZvck1vZGVsbGVyKCk6IERlZmF1bHRzPFRDb25maWc+O1xuXG4gICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBsb2FkIGFuZCBzYXZlIHRvXG4gICAgICogRXhhbXBsZXMgb2YgdGhpcyBhcmU6XG4gICAgICogLSBhc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhLntmb3JtQnVpbGRlckZpZWxkfVxuICAgICAqIC0gYXNwZWN0RGF0YS5vZHNFbnRpdHlQaWNrZXJcbiAgICAgKiAtIHVuZGVmaW5lZCAoaWYgbm8gZGF0YSBpcyB0byBiZSBsb2FkZWQgb3Igc2F2ZWQgYnkgdGhlIGJhc2UgY2xhc3MpXG4gICAgICogQHJldHVybnMgVGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGxvYWQgYW5kIHNhdmUgdG8gT1IgdW5kZWZpbmVkIGlmIG5vIGRhdGEgaXMgdG8gYmUgbG9hZGVkIG9yIHNhdmVkIGJ5IHRoZSBiYXNlIGNsYXNzXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIHdoZW4gdGhlIG1vZGVsIGlzIHNhdmVkLiBNYW5pcHVsYXRlIHRoZVxuICAgICAqIG1vZGVsIGFzIHJlcXVpcmVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBvblNhdmUobW9kZWw6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZyhcIlNhdmluZywgbW9kZWwgcGFzc2VkIGluIHdlIG5lZWQgdG8gcGVyc2lzdCB0b1wiLCBcImdyZWVuXCIsIHRoaXMuZGF0YSk7XG5cbiAgICAgICAgaWYodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBsb2NhdGlvbiB0byBzYXZlIGRhdGEgdG8gc2V0IC0gdGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRlblwiLCBcInJlZFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IGRhdGFUb1BlcnNpc3QgPSB0aGlzLmRhdGE7XG4gICAgICAgIGxldCBjdXJyZW50RGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG4gICAgICAgIGlmKGN1cnJlbnREYXRhKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxvZyhgQ3VycmVudCBkYXRhIGF0IGxvY2F0aW9uICR7dGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGF9IDpgLCBcIm1hZ2VudGFcIiwgY3VycmVudERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudERhdGEpIHtcbiAgICAgICAgICAgLy8gdGhpcy5sb2coXCJEYXRhIGRvZXMgbm90IGV4aXN0LCB3ZSB3aWxsIGNyZWF0ZVwiLCBcIm9yYW5nZVwiKTtcbiAgICAgICAgICAvLyAgc2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCB7fSk7XG4gICAgICAgICAgIC8vIGN1cnJlbnREYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZyhgTmV3IGRhdGEgdG8gcGVyc2lzdCB0byBsb2NhdGlvbiAke3RoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhfSA6YCwgXCJibHVlXCIsIGRhdGFUb1BlcnNpc3QpO1xuICAgICAgICBzZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIGRhdGFUb1BlcnNpc3QpO1xuICAgIH07XG5cblxuICAgXG5cbiAgICBvbkRlc3Ryb3kobW9kZWw/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkRlc3Ryb3lcIik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgVUkgZnJhbWV3b3JrIGFmdGVyIGluaXRpYWwgY3JlYXRpb24gYW5kIGJpbmRpbmcgdG8gbG9hZCBkYXRhXG4gICAgICogaW50byBpdCdzIG1vZGVsXG4gICAgICovXG4gICAgbG9hZEFuZEJpbmQoKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogbG9hZEFuZEJpbmRcIik7XG4gICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBkYXRhIChtb2RlbDphbnkpIHBhc3NlZCBpblwiLCBcImdyZWVuXCIpO1xuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSBiYXNlZCBvbiBsb2NhdGlvbiB0byBzYXZlXCIsIFwiZ3JlZW5cIiwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciBiZWZvcmUgdGhlIG1vZGVsIGlzIHNhdmVkXG4gICAgICovXG4gICAgb25CZWZvcmVTYXZlKG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25CZWZvcmVTYXZlXCIpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgYWZ0ZXIgdGhlIG1vZGVsIGhhcyBiZWVuIHNhdmVkLlxuICAgICAqL1xuICAgIG9uQWZ0ZXJTYXZlKG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25BZnRlclNhdmVcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgd2hlbiBpdCByZWxvYWRzIGFzcGVjdCBkYXRhXG4gICAgICovXG4gICAgb25SZWxvYWQobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvblJlbG9hZFwiKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgbG9nZ2luZyBmb3IgdGhlIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgZGVidWcgY29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFxuICAgICAqIEBwYXJhbSBjb2xvciBcbiAgICAgKiBAcGFyYW0gZGF0YSBcbiAgICAgKi9cbiAgICBsb2cobWVzc2FnZTogc3RyaW5nLCBjb2xvcj86IHN0cmluZywgZGF0YT86IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmRlYnVnPy5lbmFibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmRlYnVnLmxvZ1RvQ29uc29sZSkge1xuICAgICAgICAgICAgICAgIGlmICghY29sb3IpIGNvbG9yID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIC8vIGxldCBsaW5lTm8gPSBleHRyYWN0TGluZU51bWJlckZyb21TdGFjaygobmV3IEVycm9yKCkpLnN0YWNrKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJWMgJHt0aGlzLnRoaXNDb21wb25lbnROYW1lfSAtICR7bWVzc2FnZX1gLCBgY29sb3I6JHtjb2xvcn1gLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHJldHVybnMgRm9ybWJ1aWxkIGlmIGl0IGV4aXN0cyBvciBjcmVhdGVzIGl0IGlmIGl0IGRvZXMgbm90XG4gICAgICogXG4gICAgICovXG4gICAgZm9ybWJ1aWxkZXIoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmJsYWRlPy5tb2RlbD8uYXNwZWN0RGF0YT8uZm9ybUJ1aWxkZXI/LmZvcm1EYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgbm90IGZvdW5kIC0gd2lsbCBjcmVhdGUgdGhlIHBhdGhcIiwgXCJibHVlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIGZvdW5kXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0Vuc3VyZSB0aGUgcGF0aCBleGlzdHNcbiAgICAgICAgdGhpcy5ibGFkZSA9IHRoaXMuYmxhZGUgfHwge307XG4gICAgICAgIHRoaXMuYmxhZGUubW9kZWwgPSB0aGlzLmJsYWRlLm1vZGVsIHx8IHt9O1xuICAgICAgICB0aGlzLmJsYWRlLm1vZGVsLmFzcGVjdERhdGEgPSB0aGlzLmJsYWRlLm1vZGVsLmFzcGVjdERhdGEgfHwge307XG4gICAgICAgIHRoaXMuYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlciA9IHRoaXMuYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlciB8fCB7IGZvcm1EYXRhOiB7fSB9O1xuXG4gICBcbiAgICAgICAgcmV0dXJuIHRoaXMuYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YTtcblxuICAgIH1cblxuICAgIGZvcm1idWlsZGVyRmllbGQoZm9ybWJ1aWxkZXJGaWVsZDpzdHJpbmcsIHNldFZhbHVlPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5mb3JtYnVpbGRlcigpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIkZvcm0gYnVpbGRlciBkb2VzIG5vdCBleGlzdCEgXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRm9ybSBidWlsZGVyIGRvZXMgbm90IGV4aXN0IVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3VuZFZhbHVlID0gdGhpcy5mb3JtYnVpbGRlcigpW2Zvcm1idWlsZGVyRmllbGRdXG4gICAgICAgIGlmICghZm91bmRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coYEZvcm0gYnVpbGRlciBkb2VzIG5vdCBjb250YWluIGZpZWxkICR7Zm9ybWJ1aWxkZXJGaWVsZH0gYCwgXCJvcmFuZ2VcIik7XG4gICAgICAgICAgICB0aGlzLmxvZyhgQ3JlYXRpbmcgZmllbGQgJHtmb3JtYnVpbGRlckZpZWxkfSBgLCBcImJsdWVcIik7XG4gICAgICAgICAgICB0aGlzLmZvcm1idWlsZGVyKClbZm9ybWJ1aWxkZXJGaWVsZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FyZSB3ZSBkb2luZyBhIHNldFxuICAgICAgICBpZiAoc2V0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKGBTZXR0aW5nICR7Zm9ybWJ1aWxkZXJGaWVsZH0gdG8gJHtzZXRWYWx1ZX1gLCBcImdyZWVuXCIpO1xuICAgICAgICAgICAgdGhpcy5mb3JtYnVpbGRlcigpW2Zvcm1idWlsZGVyRmllbGRdID0gc2V0VmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gc2V0VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmRWYWx1ZTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlT2JqZWN0PFQgZXh0ZW5kcyBvYmplY3Q+KG9iajogVCk6IHsgW0sgaW4ga2V5b2YgVF06IGtvLk9ic2VydmFibGU8VFtLXT4gfSB7XG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgLy9jaGVjayBpZiBvYmpba2V5XSBpcyBhbHJlYWR5IGEgb2JzZXJ2YWJsZVxuICAgICAgICAgICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShvYmpba2V5XSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBrby5vYnNlcnZhYmxlKG9ialtrZXldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiXG5leHBvcnQgZnVuY3Rpb24gc2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHByb3BlcnR5UGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCBwcm9wID0gcHJvcGVydGllc1tpXTtcbiAgICAgICAgaWYgKCFjdXJyZW50W3Byb3BdKSB7XG4gICAgICAgICAgICBjdXJyZW50W3Byb3BdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XG4gICAgfVxuICAgIGN1cnJlbnRbcHJvcGVydGllc1twcm9wZXJ0aWVzLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcGVydGllcykge1xuICAgICAgICBpZiAoY3VycmVudFtwcm9wXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbn1cbiIsImltcG9ydCB7IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uIH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3RcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJRXh0ZXJuYWxNYXR0ZXJTZWFyY2hDb25maWd1cmF0aW9uIHtcbiAgICBmYWNrTW9kZTogYm9vbGVhbjtcbiAgICBzZWFyY2hBcGlVcmw6IHN0cmluZzsgLy8vXCJhcGkvZXh0ZXJuYWxNYXR0ZXJQcm92aWRlci9xdWVyeS97MH1cIlxuICAgIGxvYWRBcGlVcmw6IHN0cmluZzsgLy9cImFwaS9leHRlcm5hbE1hdHRlclByb3ZpZGVyL2RldGFpbHMve2RhdGEuY29kZX1cIiBcbiAgICAvLyBzZWFyY2hSZXN1bHRUZW1wbGF0ZTogc3RyaW5nOyAvLyBcImNvZGUsZGVzY3JpcHRpb25cIlxuXG4gICAgZGF0YU1hcHBpbmc6IElEYXRhTWFwcGluZ1tdLFxuICAgIGZhY2tTZWFyY2hEYXRhSURFUGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGZhY2tMb2FkRGF0YUlERVBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhTWFwcGluZyB7XG4gICAgZm9ybUJ1aWxkZXJGaWVsZDogc3RyaW5nO1xuICAgIHNlYXJjaFJlc3VsdEZpZWxkOiBzdHJpbmc7XG59XG5cblxuXG5leHBvcnQgY29uc3QgRGVmYXVsdDogSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248SUV4dGVybmFsTWF0dGVyU2VhcmNoQ29uZmlndXJhdGlvbj4gPSB7XG4gICAgZmFja01vZGU6IGZhbHNlLFxuICAgIHNlYXJjaEFwaVVybDogXCJhcGkvZXh0ZXJuYWxNYXR0ZXJQcm92aWRlci9xdWVyeS97MH1cIixcbiAgICBsb2FkQXBpVXJsOiBcImFwaS9leHRlcm5hbE1hdHRlclByb3ZpZGVyL2RldGFpbHMve2RhdGEuY29kZX1cIixcbiAgICBkYXRhTWFwcGluZzogW1xuICAgICAgICB7IGZvcm1CdWlsZGVyRmllbGQ6IFwibWF0dGVyTnVtYmVyXCIsIHNlYXJjaFJlc3VsdEZpZWxkOiBcIm1hdHRlckNvZGVcIiB9LFxuICAgICAgICB7IGZvcm1CdWlsZGVyRmllbGQ6IFwibWF0dGVyU2hvcnROYW1lXCIsIHNlYXJjaFJlc3VsdEZpZWxkOiBcInNob3J0TmFtZVwiIH0sXG4gICAgICAgIHsgZm9ybUJ1aWxkZXJGaWVsZDogXCJtYXR0ZXJDbGllbnR7Kn1cIiwgc2VhcmNoUmVzdWx0RmllbGQ6IFwiY2xpZW50LnsqfVwiIH0sXG4gICAgICAgIHsgZm9ybUJ1aWxkZXJGaWVsZDogXCJtYXR0ZXJQYXJ0bmVyTmFtZVwiLCBzZWFyY2hSZXN1bHRGaWVsZDogXCJwYXJ0bmVyLm5hbWVcIiB9LFxuICAgICAgICB7IGZvcm1CdWlsZGVyRmllbGQ6IFwibWF0dGVyUGFydG5lckVtYWlsXCIsIHNlYXJjaFJlc3VsdEZpZWxkOiBcInBhcnRuZXIubmFtZVwiIH0sXG4gICAgXSxcbiAgICBmYWNrU2VhcmNoRGF0YUlERVBhdGg6IHVuZGVmaW5lZCxcbiAgICBmYWNrTG9hZERhdGFJREVQYXRoOiB1bmRlZmluZWQsXG4gICAgZGVidWc6XG4gICAge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbG9nVG9Db25zb2xlOiBmYWxzZSxcbiAgICAgICAgc2hvd0luQXNwZWN0OiBmYWxzZVxuICAgIH1cbn1cblxuXG5cbmxldCBleG1hcGxlID0ge1xuICAgIFwibWF0dGVyQ29kZVwiOiBcIjgxNzM1MDkyXCIsXG4gICAgXCJzaG9ydE5hbWVcIjogXCJDb250cmFjdCBuZWdvdGlhdGlvbiBmb3IgSVQgc2VydmljZXMgYWdyZWVtZW50XCIsXG4gICAgXCJzdGF0dXNcIjogXCJDbG9zZWRcIixcbiAgICBcImlzU2VjdXJlXCI6IHRydWUsXG4gICAgXCJjbGllbnRcIjoge1xuICAgICAgICBcImNvZGVcIjogXCIxMDg5NzZcIixcbiAgICAgICAgXCJuYW1lXCI6IFwiVGVjaCBTb2x1dGlvbnMgSW5jLlwiLFxuICAgICAgICBcImVtYWlsXCI6IFwiXCJcbiAgICB9LFxuICAgIFwicGFydG5lclwiOiB7XG4gICAgICAgIFwiY29kZVwiOiBcIjE5OTc2XCIsXG4gICAgICAgIFwibmFtZVwiOiBcIkphY2tzb24sIEdhcmV0aFwiLFxuICAgICAgICBcImVtYWlsXCI6IFwiZ2FyZXRoLmphY2tzb25AaHNmLmNvbVwiXG4gICAgfVxufVxuIiwiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwibW9kdWxlLmV4cG9ydHMgPSBrbzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJrbm9ja291dFwiO1xyXG5pbXBvcnQgeyBBVVRPQ09NUExFVEVfTU9ERSwgQVVUT0NPTVBMRVRFX0NBUkRfVFlQRX0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvY29tcG9uZW50cy9JQXV0b0NvbXBsZXRlRmluZENhcmRPcHRpb25zXCI7XHJcbmltcG9ydCB7IHNldEFsbEZpZWxkc1RvTnVsbCB9IGZyb20gXCIuLi8uLi9Db21tb24vT2JqZWN0SGVscGVyXCI7XHJcbmltcG9ydCB7IGV4ZWN1dGVHZXQgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9hcGlcIjtcclxuaW1wb3J0IHsgQmFzZUlERUFzcGVjdCwgRGVmYXVsdHN9IGZyb20gXCIuLi9CYXNlQ2xhc3Nlcy9CYXNlSURFQXNwZWN0XCI7XHJcbmltcG9ydCB7IERlZmF1bHQsIElFeHRlcm5hbE1hdHRlclNlYXJjaENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9FeHRlcm5hbE1hdHRlclNlYXJjaENvbmZpZ1wiO1xyXG5cclxubGV0IHRoaXNXaWRnZXRTeXN0ZW1OYW1lID0gXCJFeHRlcm5hbE1hdHRlclNlYXJjaFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEV4dGVybmFsTWF0dGVyU2VhcmNoIGV4dGVuZHMgQmFzZUlERUFzcGVjdDxJRXh0ZXJuYWxNYXR0ZXJTZWFyY2hDb25maWd1cmF0aW9uLCBhbnk+IHtcclxuICAgIGF1dG9Db21wbGV0ZTogU2hhcmVkby5VSS5GcmFtZXdvcmsuQ29tcG9uZW50cy5BdXRvQ29tcGxldGVIYW5kbGVyIHwgdW5kZWZpbmVkO1xyXG4gICAgc2VsZWN0ZWREaXY6IGFueTtcclxuICAgIHNlbGVjdGVkTWF0dGVyOiBPYnNlcnZhYmxlPGFueT4gPSBrby5vYnNlcnZhYmxlPGFueT4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogSUV4dGVybmFsTWF0dGVyU2VhcmNoQ29uZmlndXJhdGlvbiwgYmFzZU1vZGVsOiBhbnkpIHtcclxuICAgICAgICBzdXBlcih0aGlzV2lkZ2V0U3lzdGVtTmFtZSwgXCJhc3BlY3REYXRhLm9kc0VudGl0eVBpY2tlclwiLCBlbGVtZW50LCBjb25maWd1cmF0aW9uLCBiYXNlTW9kZWwpXHJcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERlZmF1bHRzKCk6IERlZmF1bHRzPElFeHRlcm5hbE1hdHRlclNlYXJjaENvbmZpZ3VyYXRpb24+IHtcclxuICAgICAgICByZXR1cm4gRGVmYXVsdFxyXG4gICAgfVxyXG5cclxuICAgIHNldEV4YW1wbGVGb3JNb2RlbGxlcigpOiBEZWZhdWx0czxJRXh0ZXJuYWxNYXR0ZXJTZWFyY2hDb25maWd1cmF0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIERlZmF1bHRcclxuICAgIH1cclxuXHJcbiAgICBzZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBwcml2YXRlIGluaXRpYWxpc2UoKSB7Ly8hIE5vdGU6IFVJIGZyYW1ld29yayBsb29rcyBmb3IgdGhpcyBtZXRob2QgbmFtZSBhbmQgaWYgZm91bmQgYmVoYXZlcyBkaWZmZXJlbnRseSBhbmQgd29udCBjYWxsIGxvYWRBbmRCaW5kXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbWV0aG9kIHNldHVwXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gU2V0cyB1cCB0aGUgYXV0byBjb21wbGV0ZSBoYW5kbGVyXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXR1cCgpIHtcclxuICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZSA9IG5ldyBTaGFyZWRvLlVJLkZyYW1ld29yay5Db21wb25lbnRzLkF1dG9Db21wbGV0ZUhhbmRsZXIoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtb2RlOiBBVVRPQ09NUExFVEVfTU9ERS5TRUxFQ1QsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIlNlYXJjaCBmb3IgbWF0dGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHk6IFwiU3RhcnQgdHlwaW5nIHRvIGxvb2t1cCBhIG1hdHRlciBieSBudW1iZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eUljb246IFwiZmEtc2VhcmNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwaW5nOiBcIldpbGwgc2VhcmNoIHdoZW4geW91IHN0b3AgdHlwaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoaW5nOiBcIk9uZSBtb21lbnQuLi5cIixcclxuICAgICAgICAgICAgICAgICAgICBub1Jlc3VsdHM6IFwiTm90aGluZyBmb3VuZFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93Q2xlYXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBvbkxvYWQ6IHRoaXMubG9hZE1hdHRlci5iaW5kKHRoaXMpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb25GaW5kOiB0aGlzLmF1dG9Db21wbGV0ZUZpbmRlci5iaW5kKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVzOiB7IHJlc3VsdDogXCJfX21hdHRlcl9zZWFyY2hfaXRlbV90ZW1wbGF0ZVwiIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG1ldGhvZCBsb2FkXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gTG9hZHMgdGhlIGRhdGEgZnJvbSB0aGUgc2hhcmVkbyBtb2RlbCBmb3JtIGJ1aWxkZXJcclxuICAgICAqIEBwYXJhbSB7YW55fSBtb2RlbCAtIFRoZSBtb2RlbCB0byBsb2FkIGZyb21cclxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBsb2FkKG1vZGVsOiBhbnkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2hhcmVkb0lkKCkpIHJldHVybjtcclxuICAgICAgICBtb2RlbC5hc3BlY3REYXRhID0gbW9kZWwuYXNwZWN0RGF0YSB8fCB7fTtcclxuICAgICAgICBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyID0gbW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlciB8fCB7fTtcclxuICAgICAgICBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhID0gbW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSB8fCB7fTtcclxuICAgICAgICB2YXIgZm9ybURhdGEgPSBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhO1xyXG5cclxuICAgICAgICBsZXQgbWF0dGVyTW9kZWwgPSB7XHJcbiAgICAgICAgICAgIGNvZGU6IGZvcm1EYXRhLmV4dGVybmFsTWF0dGVyX0NvZGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBmb3JtRGF0YS5leHRlcm5hbE1hdHRlcl9UaXRsZSxcclxuICAgICAgICAgICAgY2xpZW50OiBmb3JtRGF0YS5leHRlcm5hbE1hdHRlcl9DbGllbnQsXHJcbiAgICAgICAgICAgIHBhcnRuZXI6IGZvcm1EYXRhLmV4dGVybmFsTWF0dGVyX1BhcnRuZXIsXHJcbiAgICAgICAgICAgIHN0YXR1czogZm9ybURhdGEuZXh0ZXJuYWxNYXR0ZXJfU3RhdHVzLFxyXG4gICAgICAgICAgICBpc1NlY3VyZTogZm9ybURhdGEuZXh0ZXJuYWxNYXR0ZXJfSXNTZWN1cmUsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYWRkVmlzdWFsRXh0ZW5zaW9uKG1hdHRlck1vZGVsKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1hdHRlcihtYXR0ZXJNb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZE1hdHRlcihtb2RlbDogYW55KSB7XHJcbiAgICAgICAgLy9odHRwczovL2hzZi12bmV4dC5zaGFyZWRvLmNvLnVrL2FwaS9leHRlcm5hbE1hdHRlclByb3ZpZGVyL2RldGFpbHMvODE3MzUwODlcclxuXHJcbiAgICAgICAgaWYgKCFtb2RlbCB8fCAhbW9kZWwuY29kZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgJHVpLnN0YWNrcy5sb2NrKHNlbGYsIFwiTG9hZGluZ1wiKTtcclxuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgTWF0dGVyOiBcIiArIG1vZGVsLmNvZGUsIFwiZ3JlZW5cIik7XHJcblxyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLm9wdGlvbnMubG9hZEFwaVVybCgpO1xyXG5cclxuICAgICAgICAvL2ZpbmQgYW55IHZhbHVlcyB3aXRoaW4ge30gYW5kIHJlcGxhY2Ugd2l0aCB0aGUgdmFsdWUgZnJvbSB0aGUgbW9kZWxcclxuICAgICAgICBsZXQgbWF0Y2hlcyA9IHVybC5tYXRjaCgveyhbXn1dKyl9L2cpO1xyXG4gICAgICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgICAgICAgIG1hdGNoZXMuZm9yRWFjaCgobTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gbS5yZXBsYWNlKFwie1wiLCBcIlwiKS5yZXBsYWNlKFwifVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKG0sIG1vZGVsW2tleV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgTWF0dGVyIHVzaW5nIDogXCIgKyB1cmwsIFwiZ3JlZW5cIik7XHJcblxyXG4gICAgICAgIGV4ZWN1dGVHZXQodXJsKS50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIG1vZGVsLmNvZGUgPSByZXNwb25zZS5tYXR0ZXJDb2RlO1xyXG4gICAgICAgICAgICBtb2RlbC5zaG9ydE5hbWUgPSByZXNwb25zZS5zaG9ydE5hbWU7XHJcbiAgICAgICAgICAgIG1vZGVsLmNsaWVudCA9IHJlc3BvbnNlLmNsaWVudD8ubmFtZTtcclxuICAgICAgICAgICAgbW9kZWwucGFydG5lciA9IHJlc3BvbnNlLnBhcnRuZXI/Lm5hbWU7XHJcbiAgICAgICAgICAgIG1vZGVsLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcclxuICAgICAgICAgICAgbW9kZWwuaXNTZWN1cmUgPSByZXNwb25zZS5zZWN1cmU7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc2V0QWxsRmllbGRzVG9OdWxsKG1vZGVsKTtcclxuICAgICAgICB9KS5maW5hbGx5KCgpID0+IHtcclxuICAgICAgICAgICAgYWRkVmlzdWFsRXh0ZW5zaW9uKG1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1hdHRlcihtb2RlbCk7XHJcbiAgICAgICAgICAgICR1aS5zdGFja3MudW5sb2NrKHNlbGYpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL1Jlc3V0IHRoZSBiYXNpYyBzZWxlY3RlZCBkaXNwbGF5IGNhcmQgdG8gdGhlIGF1dG8gY29tcGxldGVcclxuICAgICAgICByZXR1cm4gbmV3IFNoYXJlZG8uVUkuRnJhbWV3b3JrLkNvbXBvbmVudHMuQXV0b0NvbXBsZXRlRGlzcGxheUNhcmQoe1xyXG4gICAgICAgICAgICBpZDogbW9kZWwsXHJcbiAgICAgICAgICAgIGljb246IG51bGwsXHJcbiAgICAgICAgICAgIHRleHQ6IG1vZGVsLmNvZGUgKyBcIiAtIFwiICsgbW9kZWwudGl0bGVcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIF9hc3BlY3RSZWxvYWQobW9kZWw6IGFueSkge1xyXG4gICAgICAgIHRoaXMubG9hZChtb2RlbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNhdmUobW9kZWw6IGFueSkge1xyXG4gICAgICAgIHZhciBtYXR0ZXIgPSB7XHJcbiAgICAgICAgICAgIGV4dGVybmFsTWF0dGVyX0NvZGU6IG51bGwsXHJcbiAgICAgICAgICAgIGV4dGVybmFsTWF0dGVyX1RpdGxlOiBudWxsLFxyXG4gICAgICAgICAgICBleHRlcm5hbE1hdHRlcl9DbGllbnQ6IG51bGwsXHJcbiAgICAgICAgICAgIGV4dGVybmFsTWF0dGVyX1BhcnRuZXI6IG51bGwsXHJcbiAgICAgICAgICAgIGV4dGVybmFsTWF0dGVyX1N0YXR1czogbnVsbCxcclxuICAgICAgICAgICAgZXh0ZXJuYWxNYXR0ZXJfSXNTZWN1cmU6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIG1vZGVsTWF0dGVyID0gdGhpcy5zZWxlY3RlZE1hdHRlcigpO1xyXG5cclxuICAgICAgICBpZiAobW9kZWxNYXR0ZXIpIHtcclxuICAgICAgICAgICAgbWF0dGVyLmV4dGVybmFsTWF0dGVyX0NsaWVudCA9IG1vZGVsTWF0dGVyLmNsaWVudDtcclxuICAgICAgICAgICAgbWF0dGVyLmV4dGVybmFsTWF0dGVyX1BhcnRuZXIgPSBtb2RlbE1hdHRlci5wYXJ0bmVyO1xyXG4gICAgICAgICAgICBtYXR0ZXIuZXh0ZXJuYWxNYXR0ZXJfVGl0bGUgPSBtb2RlbE1hdHRlci50aXRsZTtcclxuICAgICAgICAgICAgbWF0dGVyLmV4dGVybmFsTWF0dGVyX0NvZGUgPSBtb2RlbE1hdHRlci5jb2RlO1xyXG4gICAgICAgICAgICBtYXR0ZXIuZXh0ZXJuYWxNYXR0ZXJfU3RhdHVzID0gbW9kZWxNYXR0ZXIuc3RhdHVzO1xyXG4gICAgICAgICAgICBtYXR0ZXIuZXh0ZXJuYWxNYXR0ZXJfSXNTZWN1cmUgPSBtb2RlbE1hdHRlci5pc1NlY3VyZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQuZXh0ZW5kKG1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEsIG1hdHRlcik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgIFxyXG5cclxuICAgIGF1dG9Db21wbGV0ZUZpbmRlcih2OiBzdHJpbmcsIGhhbmRsZXI6IGFueSkge1xyXG5cclxuICAgICAgICB2YXIgc2VhcmNoID0gdi50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgIC8vaWYgKCFzZWxmLnNoYXJlZG9JZCgpKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMubG9nKFwiU2VhcmNoaW5nIGZvcjogXCIgKyBzZWFyY2gsIFwiZ3JlZW5cIik7XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMub3B0aW9ucy5zZWFyY2hBcGlVcmwoKTtcclxuXHJcbiAgICAgICAgLy9yZXBsYWNlIGFueSB7MH0gd2l0aCB0aGUgc2VhcmNoIHRlcm1cclxuICAgICAgICBpZiAodXJsLmluZGV4T2YoXCJ7c2VhcmNoVGVybX1cIikgPiAtMSkge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShcIntzZWFyY2hUZXJtfVwiLCBzZWFyY2gpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhlY3V0ZUdldCh1cmwpLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2FyZHMgPSBuZXcgQXJyYXk8U2hhcmVkby5VSS5GcmFtZXdvcmsuQ29tcG9uZW50cy5BdXRvQ29tcGxldGVGaW5kQ2FyZD4oKTtcclxuICAgICAgICAgICAgZGF0YS5leHRlcm5hbE1hdHRlclByb3ZpZGVyU2VhcmNoUmVzdWx0cy5mb3JFYWNoKChkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGFkZFZpc3VhbEV4dGVuc2lvbihkKTtcclxuICAgICAgICAgICAgICAgIGNhcmRzLnB1c2gobmV3IFNoYXJlZG8uVUkuRnJhbWV3b3JrLkNvbXBvbmVudHMuQXV0b0NvbXBsZXRlRmluZENhcmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEFVVE9DT01QTEVURV9DQVJEX1RZUEUuUkVTVUxULFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGQsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogZC5pY29uLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBkLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlczogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBjc3NDbGFzczogZC5jc3NDbGFzcyxcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5yZXNvbHZlKGNhcmRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgYXV0b0NvbXBsZXRlU2VsZWN0KHNlbGVjdENhcmQ6IGFueSwgaGFuZGxlcjogYW55KSB7XHJcbiAgICB9O1xyXG5cclxuICAgIG92ZXJyaWRlIGxvYWRBbmRCaW5kKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubG9nKFwiTm8gTG9hZEFuZEJpbmQgSW1wbGVtZW50ZWRcIiwgXCJncmVlblwiKTtcclxuICAgICAgICAvLyBzdXBlci5sb2FkQW5kQmluZCgpO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdGVkRGl2ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIGJ1aWxkU2VsZWN0ZWRDYXJkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubG9nKFwiTm8gQnVpbGRTZWxlY3RlZENhcmQgSW1wbGVtZW50ZWRcIiwgXCJncmVlblwiKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRGl2LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvdmVycmlkZSBvblNhdmUobW9kZWw6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubG9nKFwiTm8gU2F2ZSBJbXBsZW1lbnRlZFwiLCBcImdyZWVuXCIpO1xyXG4gICAgICAgIC8vIHN1cGVyLm9uU2F2ZShtb2RlbCk7XHJcbiAgICB9O1xyXG59IFxyXG5cclxuXHJcbmZ1bmN0aW9uIGZsYXR0ZW5PYmplY3Qob2I6IGFueSkge1xyXG4gICAgdmFyIHRvUmV0dXJuOiBhbnkgPSB7fTtcclxuXHJcbiAgICBmb3IgKHZhciBpIGluIG9iKSB7XHJcbiAgICAgICAgaWYgKCFvYi5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGlmICgodHlwZW9mIG9iW2ldKSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB2YXIgZmxhdE9iamVjdCA9IGZsYXR0ZW5PYmplY3Qob2JbaV0pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB4IGluIGZsYXRPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZmxhdE9iamVjdC5oYXNPd25Qcm9wZXJ0eSh4KSkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgdG9SZXR1cm5baSArICcuJyArIHhdID0gZmxhdE9iamVjdFt4XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRvUmV0dXJuW2ldID0gb2JbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvUmV0dXJuO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gYWRkVmlzdWFsRXh0ZW5zaW9uKG1hdHRlck1vZGVsOiBhbnkpIHtcclxuICAgIFxyXG4gICAgaWYgKCFtYXR0ZXJNb2RlbCkgcmV0dXJuO1xyXG5cclxuICAgIG1hdHRlck1vZGVsLmNzc0NsYXNzID0gXCJcIjtcclxuICAgIFxyXG5cclxuICAgIC8vYWRkIEljb25cclxuICAgIGlmKG1hdHRlck1vZGVsLnN0YXR1cyA9PSBcIkNsb3NlZFwiKXtcclxuICAgICAgICBtYXR0ZXJNb2RlbC5pY29uID0gXCJmYS1sb2NrICB0ZXh0LWRhbmdlclwiO1xyXG4gICAgICAgIG1hdHRlck1vZGVsLmNzc0NsYXNzID0gXCJjbG9zZWQtbWF0dGVyXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgbWF0dGVyTW9kZWwuaWNvbiA9IFwiZmEtdW5sb2NrIHRleHQtc3VjY2Vzc1wiO1xyXG4gICAgICAgIG1hdHRlck1vZGVsLmNzc0NsYXNzID0gXCJvcGVuLW1hdHRlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vYWRkIGNzcyBjbGFzc1xyXG4gICAgaWYobWF0dGVyTW9kZWwuaXNTZWN1cmUpe1xyXG4gICAgICAgIG1hdHRlck1vZGVsLmNzc0NsYXNzICs9IFwiIHNlY3VyZS1tYXR0ZXJcIjtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==