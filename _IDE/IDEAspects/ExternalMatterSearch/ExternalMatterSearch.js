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

/***/ "./src/WebBased/Common/EventsHelper.ts":
/*!*********************************************!*\
  !*** ./src/WebBased/Common/EventsHelper.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fireEvent: () => (/* binding */ fireEvent)
/* harmony export */ });
function fireEvent(event) {
    $ui.events.broadcast(event.eventPath, event);
}


/***/ }),

/***/ "./src/WebBased/Common/ObjectHelper.ts":
/*!*********************************************!*\
  !*** ./src/WebBased/Common/ObjectHelper.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flattenObject: () => (/* binding */ flattenObject),
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
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Common_EventsHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Common/EventsHelper */ "./src/WebBased/Common/EventsHelper.ts");





// abstract class Creator<TConfig> {
//     public abstract FactoryMethod(element: HTMLElement, configuration: IBaseIDEAspectConfiguration<TConfig>, baseModel: any): any;
// }
const FOMR_BUILDER_PATH_STRING = "aspectData.formBuilder.formData";
function getFormBuilderFieldPath(formBuilderField) {
    return `${FOMR_BUILDER_PATH_STRING}.${formBuilderField}`;
}
class BaseIDEAspect {
    constructor(...arr) {
        this.widgetSettings = this.setWidgetJsonSettings();
        this.thisComponentName = this.setThisComponentName();
        this.defaults = this.setDefaults(); //setup the default by calling the abstract method in the child class
        this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
        if (arr.length === 0) {
            //This is the base constructor
            return;
        }
        if (arr.length === 3) {
            //This is the constructor that is called by the IDE
            this._initialise(arr[0], arr[1], arr[2]);
            this.fireEvent("onSetup", this.model);
            this.setup();
            this.fireEvent("afterSetup", this.model);
            return;
        }
    }
    _initialise(element, configuration, baseModel) {
        this.uniqueId = (0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])();
        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = configuration;
        this.baseModel = baseModel;
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
        this.fireEvent("onInitialise", this.model);
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
        this.fireEvent("onDataChanged", this.model);
    }
    // abstract setDependantScriptFiles(): string[];
    // abstract setDependantStyleFiles(): string[];
    // abstract setDependantTemplateFiles(): string[];
    // abstract setDependantMenuTemplateFiles(): string[];
    // abstract setDependantComponentFiles(): string[];
    // abstract setWidgetDesignerSettings(): IWidgetJsonDesigner;
    // abstract setPriority() : number;
    /**
     * Called by the aspect IDE adapter when the model is saved. Manipulate the
     * model as required.
     */
    onSave(model) {
        this.fireEvent("onSave", model);
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
        this.fireEvent("onDestroy", model);
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
        this.fireEvent("onLoad", this.model);
    }
    ;
    /**
     * Called by the aspect IDE adapter before the model is saved
     */
    onBeforeSave(model) {
        this.log("IDEAspects.Example : onBeforeSave");
        this.fireEvent("onBeforeSave", model);
    }
    /**
     * Called by the aspect IDE adapter after the model has been saved.
     */
    onAfterSave(model) {
        this.log("IDEAspects.Example : onAfterSave");
        this.fireEvent("onAfterSave", model);
    }
    /**
     * Called by the aspect IDE adapter when it reloads aspect data
     */
    onReload(model) {
        this.log("IDEAspects.Example : onReload");
        this.fireEvent("onReload", model);
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
    fireEvent(eventName, data) {
        let event = {
            eventPath: this.thisComponentName + "." + eventName,
            eventName: eventName,
            source: this,
            data: data
        };
        (0,_Common_EventsHelper__WEBPACK_IMPORTED_MODULE_3__.fireEvent)(event);
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
// class MyClass {
//     public constructor();
//     public constructor(p1: number);
//     public constructor(p1: string, p2: string);
//     public constructor(p1: string, p2: string, p3: string);
//     public constructor(...arr: any[]) {
//         if (arr.length === 2) {
//             console.log('two arguments constructor called.');
//         } else if (arr.length === 3) {
//             console.log('three arguments constructor called.');
//         } else if (arr.length === 1) {
//             console.log('one argument constructor called.');
//         }
//     }
// }
// let x = new MyClass()


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

/***/ "./src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearchInterface.ts":
/*!***************************************************************************************!*\
  !*** ./src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearchInterface.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Default: () => (/* binding */ Default)
/* harmony export */ });
const Default = {
    fackMode: false,
    searchApiUrl: "api/externalMatterProvider/query/{searchTerm}",
    loadApiUrl: "api/externalMatterProvider/details/{code}",
    dataMapping: [
        { formBuilderField: "matterNumber", searchResultField: "code" },
        { formBuilderField: "matterShortName", searchResultField: "shortName" },
        { formBuilderField: "matterClient{*}", searchResultField: "client.{*}" },
        { formBuilderField: "matterPartnerName", searchResultField: "partner.name" },
        { formBuilderField: "matterPartnerEmail", searchResultField: "partner.email" },
    ],
    fackSearchDataIDEPath: undefined,
    fackLoadDataIDEPath: undefined,
    debug: {
        enabled: true,
        logToConsole: true,
        showInAspect: true
    },
    eventsToReactTo: []
};


/***/ }),

/***/ "./src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearchSettings.ts":
/*!**************************************************************************************!*\
  !*** ./src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearchSettings.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Settings: () => (/* binding */ Settings)
/* harmony export */ });
/* harmony import */ var _ExternalMatterSearchInterface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExternalMatterSearchInterface */ "./src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearchInterface.ts");

const Settings = {
    type: "widget",
    "priority": 6000,
    "designer": {
        "allowInPortalDesigner": false,
        "allowInSharedoPortalDesigner": false,
        "allowAspectAdapter": true,
        "title": "External Matter Search",
        "icon": "fa-cog",
        "description": "External Matter Search",
        "categories": [],
        "isConfigurable": true,
        "configurationWidget": null,
        defaultConfigurationJson: _ExternalMatterSearchInterface__WEBPACK_IMPORTED_MODULE_0__.Default
    },
    "scripts": [],
    "styles": [
        "ExternalMatterSearch.css"
    ],
    "templates": [
        "ExternalMatterSearch.html"
    ],
    "menuTemplates": [],
    "components": [
        "Sharedo.UI.Framework.Components.AutoComplete"
    ]
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
/* harmony import */ var _ExternalMatterSearchInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ExternalMatterSearchInterface */ "./src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearchInterface.ts");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ExternalMatterSearchSettings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ExternalMatterSearchSettings */ "./src/WebBased/IDEAspects/ExternalMatterSearch/ExternalMatterSearchSettings.ts");







class ExternalMatterSearch extends _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_3__.BaseIDEAspect {
    constructor() {
        super(...arguments);
        this.selectedMatter = knockout__WEBPACK_IMPORTED_MODULE_5___default().observable();
    }
    // constructor(element: HTMLElement, configuration: IExternalMatterSearchConfiguration, baseModel: any) {
    //     super(thisWidgetSystemName, "aspectData.odsEntityPicker", element, configuration, baseModel)
    // }
    setWidgetJsonSettings() {
        return _ExternalMatterSearchSettings__WEBPACK_IMPORTED_MODULE_6__.Settings;
    }
    setThisComponentName() {
        return "ExternalMatterSearch";
    }
    setDefaults() {
        return _ExternalMatterSearchInterface__WEBPACK_IMPORTED_MODULE_4__.Default;
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
            model.isSecure = response.isSecure;
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
        this.log("Searching for: " + search, "green");
        let url = this.options.searchApiUrl();
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
        matterModel.isSecureIcon = "fa-solid fa-shield text-danger";
    }
    else {
        matterModel.isSecureIcon = "fa-solid fa-file text-success";
    }
}

})();

var __webpack_export_target__ = (IDEAspects = typeof IDEAspects === "undefined" ? {} : IDEAspects);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7S0FDeEM7SUFFRCxlQUFlO0lBQ2YsSUFBRyxXQUFXLENBQUMsUUFBUSxFQUFDO1FBQ3BCLFdBQVcsQ0FBQyxRQUFRLElBQUksZ0JBQWdCLENBQUM7UUFDekMsV0FBVyxDQUFDLFlBQVksR0FBRyxnQ0FBZ0MsQ0FBQztLQUMvRDtTQUVEO1FBQ0ksV0FBVyxDQUFDLFlBQVksR0FBRywrQkFBK0IsQ0FBQztLQUU5RDtBQUdMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL0ludGVyZmFjZXMvY29tcG9uZW50cy9JQXV0b0NvbXBsZXRlRmluZENhcmRPcHRpb25zLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL0V2ZW50c0hlbHBlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9PYmplY3RIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9Db21tb24vYXBpL2FwaS50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvQmFzZUlERUFzcGVjdC50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvS09Db252ZXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL09iamVjdEhlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0V4dGVybmFsTWF0dGVyU2VhcmNoL0V4dGVybmFsTWF0dGVyU2VhcmNoSW50ZXJmYWNlLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9FeHRlcm5hbE1hdHRlclNlYXJjaC9FeHRlcm5hbE1hdHRlclNlYXJjaFNldHRpbmdzLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvZXh0ZXJuYWwgdmFyIFwia29cIiIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvRXh0ZXJuYWxNYXR0ZXJTZWFyY2gvRXh0ZXJuYWxNYXR0ZXJTZWFyY2gudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbi8qKlxuICogQGludGVyZmFjZSBJQXV0b0NvbXBsZXRlRmluZENhcmRPcHRpb25zXG4gKiBAZGVzY3JpcHRpb24gT3B0aW9ucyBmb3IgdGhlIEF1dG9Db21wbGV0ZUZpbmRDYXJkXG4gKiBAcHJvcGVydHkge0FVVE9DT01QTEVURV9DQVJEX1RZUEV9IHR5cGUgLSBUaGUgdHlwZSBvZiBjYXJkIHRvIHJlbmRlclxuICogQHByb3BlcnR5IHthbnl9IGlkIC0gVGhlIGlkIG9mIHRoZSBjYXJkXG4gKiBAcHJvcGVydHkge2FueX0gZGF0YSAtIFRoZSBkYXRhIHBhY2thZ2UgZm9yIHRoZSBtYXRjaFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGljb24gLSBUaGUgaWNvbiB0byBkaXNwbGF5XG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGV4dCAtIFRoZSB0ZXh0IHRvIGRpc3BsYXlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzdHlsZXMgLSBUaGUgc3R5bGVzIHRvIGFwcGx5IHRvIHRoZSBjYXJkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGVtcGxhdGUgLSBUaGUgdGVtcGxhdGUgdG8gdXNlIHRvIHJlbmRlciB0aGUgY2FyZCxpZiB0aGlzIGlzbid0IHNwZWNpZmllZCwgd2lsbCB1c2UgdGhlIGRlZmF1bHQgdGVtcGxhdGUgZm9yIHRoZSB0eXBlICB3aGljaCBpcyBlaXRoZXIgYSBzdGFuZGFyZCB0ZW1wbGF0ZSBmcm9tIHRoZSBhdXRvIGNvbXBsZXRlICh1c2VzIHNpbXBsZSBwcm9wZXJ0aWVzIG9ubHkpLCBvciBhIGdsb2JhbGx5IG92ZXJyaWRkZW4gdGVtcGxhdGUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3NzQ2xhc3MgLSBUaGUgY3NzIGNsYXNzIHRvIGFwcGx5IHRvIHRoZSBjYXJkXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUF1dG9Db21wbGV0ZUZpbmRDYXJkT3B0aW9ucyB7XG4gICAgdHlwZT86IEFVVE9DT01QTEVURV9DQVJEX1RZUEUsXG4gICAgaWQ/OiBhbnksXG4gICAgZGF0YT86IGFueSwgLy8gZGF0YTogVGhlIGRhdGEgcGFja2FnZSBmb3IgdGhlIG1hdGNoXG4gICAgaWNvbj86IHN0cmluZyB8IG51bGwsXG4gICAgdGV4dD86IHN0cmluZyxcbiAgICBzdHlsZXM/OiBzdHJpbmcgfCBudWxsLFxuICAgIHRlbXBsYXRlPzogYW55LFxuICAgIGNzc0NsYXNzPzogc3RyaW5nIHwgbnVsbCxcbn1cblxuZXhwb3J0IGVudW0gQVVUT0NPTVBMRVRFX01PREUge1xuICAgIENIT09TRSA9ICdjaG9vc2UnLFxuICAgIFNFTEVDVCA9ICdzZWxlY3QnXG59XG5cbmV4cG9ydCBlbnVtIEFVVE9DT01QTEVURV9DQVJEX1RZUEUge1xuICAgIFJFU1VMVCA9ICdyZXN1bHQnLFxuICAgIE1FU1NBR0UgPSAnbWVzc2FnZSdcbn1cblxuZXhwb3J0IGVudW0gQVVUT0NPTVBMRVRFX0RJU1BMQVlfTU9ERSB7XG4gICAgU0VBUkNIID0gJ3NlYXJjaCcsXG4gICAgTE9BRElORyA9ICdsb2FkaW5nJyxcbiAgICBSRVNVTFQgPSAncmVzdWx0J1xufSIsIlxuXG5leHBvcnQgaW50ZXJmYWNlIFNoYXJlRG9FdmVudCB7XG4gICAgZXZlbnRQYXRoOiBzdHJpbmc7XG4gICAgZXZlbnROYW1lOiBzdHJpbmc7XG4gICAgc291cmNlOiBhbnk7XG4gICAgZGF0YTogYW55O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJlRXZlbnQoZXZlbnQ6U2hhcmVEb0V2ZW50KSB7XG5cbiAgICAkdWkuZXZlbnRzLmJyb2FkY2FzdChldmVudC5ldmVudFBhdGgsIGV2ZW50KTtcbn0iLCJcbmV4cG9ydCBmdW5jdGlvbiBzdHJUb0NsYXNzKGNsYXNzTmFtZTpzdHJpbmcsIGJhc2U6YW55KSB7XG4gICAgY29uc3QgY2xhc3NQYXJ0cyA9IGNsYXNzTmFtZS5zcGxpdCgnLicpO1xuICAgIGxldCBjbGFzc1JlZmVyZW5jZSA9IGJhc2U7XG5cbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgY2xhc3NQYXJ0cykge1xuICAgICAgICBpZighY2xhc3NSZWZlcmVuY2VbcGFydF0pIFxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNsYXNzUmVmZXJlbmNlID0gY2xhc3NSZWZlcmVuY2VbcGFydF07XG4gICAgfTsgXG4gICAgcmV0dXJuIGNsYXNzUmVmZXJlbmNlO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBbGxGaWVsZHNUb051bGwobW9kZWw6YW55KSB7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhtb2RlbCk7XG4gICAga2V5cy5mb3JFYWNoKChrZXk6IGFueSkgPT4ge1xuICAgICAgICBtb2RlbFtrZXldID0gbnVsbDtcbiAgICB9KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbk9iamVjdChvYjogYW55KSB7XG4gICAgdmFyIHRvUmV0dXJuOiBhbnkgPSB7fTtcblxuICAgIGZvciAodmFyIGkgaW4gb2IpIHtcbiAgICAgICAgaWYgKCFvYi5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG5cbiAgICAgICAgaWYgKCh0eXBlb2Ygb2JbaV0pID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB2YXIgZmxhdE9iamVjdCA9IGZsYXR0ZW5PYmplY3Qob2JbaV0pO1xuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBmbGF0T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmbGF0T2JqZWN0Lmhhc093blByb3BlcnR5KHgpKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIHRvUmV0dXJuW2kgKyAnLicgKyB4XSA9IGZsYXRPYmplY3RbeF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b1JldHVybltpXSA9IG9iW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b1JldHVybjtcbn0iLCJcbi8qKlxuICogVGhpcyBmaWxlIGNvbnRhaW5zIHRoZSBhcGkgY2FsbHMgdG8gdGhlIGJhY2tlbmQuXG4gKiB1dGlsaXNpbmcgdGhlIGF4aW9zIGxpYnJhcnkgdG8gbWFrZSB0aGUgY2FsbHMuXG4gKiBpbmNsdXNpbmcgb2Ygd2VicGFja0lnbm9yZSBpcyB0byBhbGxvdyB0aGUgd2VicGFjayB0byBpZ25vcmUgdGhlIGNhbGxzIGFuZCBub3QgdHJ5IHRvIGJ1bmRsZSB0aGVtLlxuICovXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlUG9zdDxUPihhcGk6IHN0cmluZywgcG9zdEJvZHk6IGFueSkgOiBQcm9taXNlPFQ+e1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LnBvc3QoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpLCBwb3N0Qm9keSk7XG4gICAgcmV0dXJuIGV4ZWN1dGVGZXRjaDxUPihhcGksXCJQT1NUXCIscG9zdEJvZHkpO1xufVxuXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldDxUPihhcGk6IHN0cmluZykgOiBQcm9taXNlPFQ+e1xuLy8gICAgIHJldHVybiBhd2FpdCAkYWpheC5nZXQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpKTtcbi8vIH0gXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlR2V0PFQ+KGFwaTogc3RyaW5nKSA6IFByb21pc2U8VD57XG4gICByZXR1cm4gZXhlY3V0ZUZldGNoPFQ+KGFwaSxcIkdFVFwiLHVuZGVmaW5lZCk7XG59XG5cblxuXG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVQdXQ8VD4oYXBpOiBzdHJpbmcsIHBvc3RCb2R5OiBhbnkpIDogUHJvbWlzZTxUPntcbiAgICAvL3JldHVybiBhd2FpdCAkYWpheC5wdXQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpLCBwb3N0Qm9keSk7XG4gICAgcmV0dXJuIGV4ZWN1dGVGZXRjaDxUPihhcGksXCJQVVRcIixwb3N0Qm9keSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlRGVsZXRlPFQ+KGFwaTogc3RyaW5nKSA6IFByb21pc2U8VD57XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXguZGVsZXRlKC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSk7XG4gICAgcmV0dXJuIGV4ZWN1dGVGZXRjaDxUPihhcGksXCJERUxFVEVcIix1bmRlZmluZWQpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUFwaShhcGk6IHN0cmluZykgOiBzdHJpbmd7XG4gICBsZXQgbG9jYXRpb249ICB3aW5kb3cuZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luO1xuXG4gICAvL2lmIGFwaSBkb2VzIG5vdCBpbmNsdWRlIHRoZSBsb2NhdGlvbiB0aGVuIGFkZCBpdC5cbiAgICBpZihhcGkuaW5kZXhPZihsb2NhdGlvbikgPT09IC0xKXtcbiAgICAgICAgLy9jaGVjayBpZiBhcGkgc3RhcnQgd2l0aCBhIC8gaWYgbm90IGFkZCBpdC5cbiAgICAgICAgaWYoYXBpLmluZGV4T2YoXCIvXCIpICE9PSAwKXtcbiAgICAgICAgICAgIGFwaSA9IFwiL1wiICsgYXBpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBhcGkgPSBsb2NhdGlvbiArIGFwaTtcbiAgICB9XG4gICAgcmV0dXJuIGFwaTtcbiAgICBcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVGZXRjaDxUPihhcGk6IHN0cmluZywgbWV0aG9kOnN0cmluZyxkYXRhOmFueSkgOiBQcm9taXNlPFQ+e1xuICAgIGxldCB1cmwgPSB2YWxpZGF0ZUFwaShhcGkpO1xuICAgIGxldCBmZXRjaEhlYWRlcnMgPSBidWlsZEhlYWRlcnMoKTtcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwse1xuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogZmV0Y2hIZWFkZXJzLFxuICAgICAgICBib2R5OiBkYXRhPyBKU09OLnN0cmluZ2lmeShkYXRhKTogdW5kZWZpbmVkXG4gICAgfVxuICAgICkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgLy9jaGVjayBpZiByZXNwb25zZSBpcyBKU09OXG4gICAgICAgIGlmKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpPy5pbmRleE9mKFwiYXBwbGljYXRpb24vanNvblwiKSA9PT0gLTEpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVzcG9uc2Ugd2FzIG5vdCBKU09OXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vcmV0dXJuIHRoZSBqc29uIGFzIG9iamVjdFxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXNwb25zZTtcbn1cblxuZnVuY3Rpb24gYnVpbGRIZWFkZXJzKCkge1xuICAgIGxldCBiZWFyZXIgPSBnZXRCZWFyZXJUb2tlbigpO1xuICAgIGxldCBmZXRjaEhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGZldGNoSGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIGlmIChiZWFyZXIpIHtcbiAgICAgICAgZmV0Y2hIZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgYmVhcmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoSGVhZGVycztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29va2llcygpOiB7IFtrZXk6c3RyaW5nXTpzdHJpbmcgfVxue1xuICAgIGxldCByZXRWYWx1ZTogeyBba2V5OnN0cmluZ106c3RyaW5nIH0gPSB7fTtcbiAgICBsZXQgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIikucmVkdWNlKGZ1bmN0aW9uIChjb29raWVzLCBjb29raWUpXG4gICAge1xuICAgICAgICB2YXIgcGFydHMgPSBjb29raWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAyKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIga2V5ID0gcGFydHNbMF0udHJpbSgpO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gcGFydHNbMV07XG5cbiAgICAgICAgICAgIHJldFZhbHVlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29va2llcztcbiAgICB9LCB7fSk7XG5cbiAgICByZXR1cm4gcmV0VmFsdWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmVhcmVyVG9rZW4oKVxue1xuICAgIHZhciBjb29raWVzID0gZ2V0Q29va2llcygpO1xuICAgIHZhciB0b2tlbiA9IGNvb2tpZXNbXCJfYXBpXCJdO1xuXG4gICAgaWYoIHRva2VuICkgcmV0dXJuIFwiQmVhcmVyIFwiICsgdG9rZW47XG4gICAgcmV0dXJuIG51bGw7XG59OyIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xuaW1wb3J0IHsgSVNoYXJlZG9CbGFkZU1vZGVsLCBUU2hhcmVEb0JsYWRlLCBJQ29uZmlndXJhdGlvbkhvc3QgfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9TaGFyZWRvQXNwZWN0TW9kZWxzXCI7XG5pbXBvcnQgeyBJRGVidWcgfSBmcm9tIFwiLi9JRGVidWdcIjtcbmltcG9ydCB7IHRvT2JzZXJ2YWJsZU9iamVjdCB9IGZyb20gXCIuL0tPQ29udmVydGVyXCI7XG5pbXBvcnQgeyBnZXROZXN0ZWRQcm9wZXJ0eSwgc2V0TmVzdGVkUHJvcGVydHkgfSBmcm9tIFwiLi9PYmplY3RIZWxwZXJzXCI7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBUU2hhcmVkbyB9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL1RTaGFyZWRvXCI7XG5pbXBvcnQgeyBJV2lkZ2V0SnNvbiwgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb259IGZyb20gXCIuL0lXaWRnZXRKc29uXCI7XG5pbXBvcnQgeyBTaGFyZURvRXZlbnQsIGZpcmVFdmVudCB9IGZyb20gXCIuLi8uLi9Db21tb24vRXZlbnRzSGVscGVyXCI7XG5cbmV4cG9ydCB0eXBlIElEZWZhdWx0U2V0dGluZ3M8VD4gPSBUICYgXG57IFxuICAgIGRlYnVnOiBJRGVidWcsXG4gICAgZXZlbnRzVG9SZWFjdFRvOiBBcnJheTxFdmVudFRvUmVhY3RUbz5cbn1cblxuaW50ZXJmYWNlIEV2ZW50VG9SZWFjdFRve1xuICAgIGV2ZW50UGF0aDogc3RyaW5nO1xuICAgIG1ldGhvZFRvQ2FsbDogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSURFQXNwZWN0Q29uZmlndXJhdGlvbiB7XG4gICAgbW9kZWw6IElTaGFyZWRvQmxhZGVNb2RlbDtcbiAgICBibGFkZTogVFNoYXJlRG9CbGFkZTtcbn1cblxudHlwZSBPYnNlcnZhYmxlaWZ5PFQ+ID0ge1xuICAgIFtQIGluIGtleW9mIFRdOiBrby5PYnNlcnZhYmxlPFRbUF0+O1xufTtcblxuZXhwb3J0IHR5cGUgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+ID0geyBbSyBpbiBrZXlvZiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5dOiBrby5PYnNlcnZhYmxlPElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPltLXT47IH1cblxuXG5leHBvcnQgdHlwZSBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBJQ29uZmlndXJhdGlvbkhvc3QgJiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbi8vIGFic3RyYWN0IGNsYXNzIENyZWF0b3I8VENvbmZpZz4ge1xuLy8gICAgIHB1YmxpYyBhYnN0cmFjdCBGYWN0b3J5TWV0aG9kKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4sIGJhc2VNb2RlbDogYW55KTogYW55O1xuLy8gfVxuXG5cblxuZXhwb3J0IGNvbnN0IEZPTVJfQlVJTERFUl9QQVRIX1NUUklORyA9IFwiYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YVwiO1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1CdWlsZGVyRmllbGRQYXRoKGZvcm1CdWlsZGVyRmllbGQ6IHN0cmluZykge1xuICAgIHJldHVybiBgJHtGT01SX0JVSUxERVJfUEFUSF9TVFJJTkd9LiR7Zm9ybUJ1aWxkZXJGaWVsZH1gO1xufVxuXG50eXBlIE9ic2VydmFibGVQZXJzb248VENvbmZpZz4gPSBPYnNlcnZhYmxlaWZ5PElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPj47XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlSURFQXNwZWN0PFRDb25maWcsIFRQZXJzaXRhbmNlPiAge1xuICAgIF9kYXRhOmFueTsgLy9ub24gbW9kZWwgZGF0YSBzdG9yYWdlXG4gICAgb3JpZ2luYWxDb25maWd1cmF0aW9uITogVENvbmZpZztcbiAgICBjb25maWd1cmF0aW9uITogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgIGRlZmF1bHRzOiBJRGVmYXVsdFNldHRpbmdzPFRDb25maWc+IHwgdW5kZWZpbmVkO1xuICAgIGVsZW1lbnQhOiBIVE1MRWxlbWVudDtcbiAgICBtb2RlbDogYW55O1xuICAgIGVuYWJsZWQhOiBib29sZWFuO1xuICAgIGJsYWRlITogVFNoYXJlRG9CbGFkZTtcbiAgICBsb2FkZWQhOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIHNoYXJlZG9JZDogYW55O1xuICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZSE6IGtvLk9ic2VydmFibGU8c3RyaW5nPjtcbiAgICB2YWxpZGF0aW9uOiBhbnk7XG4gICAgdmFsaWRhdGlvbkVycm9yQ291bnQhOiBrby5PYnNlcnZhYmxlPG51bWJlcj47XG4gICAgYmFzZU1vZGVsITogVFNoYXJlZG88YW55PjtcbiAgICB0aGlzQ29tcG9uZW50TmFtZSE6IHN0cmluZztcbiAgICBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGE6IHN0cmluZyB8IHVuZGVmaW5lZDsgLy9UaGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tXG4gICAgb3B0aW9ucyE6IE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPlxuICAgIHVuaXF1ZUlkITogc3RyaW5nO1xuICAgIHdpZGdldFNldHRpbmdzITogSVdpZGdldEpzb248VENvbmZpZz4gO1xuXG5cblxuICAgXG4gICAgLyoqXG4gICAgICogQmFzZSBDb25zdHJ1Y3RvciBmb3IgYWxsIElERUFzcGVjdHMsIGZvcmNlcyB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIGxvYWQgYW5kIHNhdmUgbWV0aG9kc1xuICAgICAqIEBwYXJhbSBjb21wb25lbnROYW1lIC8vVGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCBlLmcuIEFzcGVjdC5RdWlja1ZpZXdcbiAgICAgKiBAcGFyYW0gbG9hZFNhdmVMb2NhdGlvbiAvL1RoZSBsb2NhdGlvbiB0byBsb2FkIGFuZCBzYXZlIHRoZSBkYXRhIGZyb20gZS5nLiBtb2RlbC5hc3BlY3QuRm9ybUJ1aWxkZXIuZm9ybURhdGFcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAvL1RoZSBlbGVtZW50IHRoYXQgdGhlIGFzcGVjdCBpcyBib3VuZCB0b1xuICAgICAqIEBwYXJhbSBjb25maWd1cmF0aW9uIC8vVGhlIGNvbmZpZ3VyYXRpb24gcGFzc2VkIGluIGZyb20gdGhlIGJsYWRlIGFuZCB0aGUgZGVzaWduIHRpbWUgY29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSBiYXNlTW9kZWwgLy9UaGUgYmFzZSBtb2RlbCBwYXNzZWQgaW4gZnJvbSB0aGUgYmxhZGVcbiAgICAgKiBAcGFyYW0gZGVmYXVsdHMgLy9UaGUgZGVmYXVsdHMgcGFzc2VkIGluIGZyb20gdGhlIHdpZGdldCB0byBzZXQgaW5jYXNlIG9mIGJhZCBjb25maWd1cmF0aW9uIG9yIG1pc3NpbmcgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCk7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IFRDb25maWcsIGJhc2VNb2RlbDogVFNoYXJlZG88YW55PikgXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKC4uLmFycjogYW55W10pIFxuICAgIHtcblxuICAgICAgICB0aGlzLndpZGdldFNldHRpbmdzID0gdGhpcy5zZXRXaWRnZXRKc29uU2V0dGluZ3MoKTtcbiAgICAgICAgdGhpcy50aGlzQ29tcG9uZW50TmFtZSA9IHRoaXMuc2V0VGhpc0NvbXBvbmVudE5hbWUoKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IHRoaXMuc2V0RGVmYXVsdHMoKTsgLy9zZXR1cCB0aGUgZGVmYXVsdCBieSBjYWxsaW5nIHRoZSBhYnN0cmFjdCBtZXRob2QgaW4gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gdGhpcy5zZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTtcbiAgICAgICAgXG4gICAgICAgIGlmKGFyci5sZW5ndGggPT09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgYmFzZSBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoYXJyLmxlbmd0aCA9PT0gMylcbiAgICAgICAge1xuICAgICAgICAgICAgLy9UaGlzIGlzIHRoZSBjb25zdHJ1Y3RvciB0aGF0IGlzIGNhbGxlZCBieSB0aGUgSURFXG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXNlKGFyclswXSwgYXJyWzFdLCBhcnJbMl0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uU2V0dXBcIiwgdGhpcy5tb2RlbCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgICAgICAgICB0aGlzLmZpcmVFdmVudChcImFmdGVyU2V0dXBcIiwgdGhpcy5tb2RlbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9pbml0aWFsaXNlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPiwgYmFzZU1vZGVsOiBUU2hhcmVkbzxhbnk+KVxuICAgIHtcbiAgICAgICAgdGhpcy51bmlxdWVJZCA9IHV1aWQoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgLy9TaGFyZURvIHBhc3NlcyB0aGUgY29uZmlnIGFzIHdlbGwgYXMgb3RoZXIgc3R1ZmYsIHNvIHdlIG5lZWQgdG8gZXh0cmFjdCB0aGUgY29uZmlnXG4gICAgICAgIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiBhcyBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz47XG4gICAgICAgIHRoaXMuYmFzZU1vZGVsID0gYmFzZU1vZGVsO1xuICAgICAgICBcbiAgICAgICAgLy8gdGhpcy5kYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBNZXJnZSB0aGUgY29uZmlndXJhdGlvbiB3aXRoIHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSAkLmV4dGVuZCh0aGlzLmRlZmF1bHRzLCB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbikgYXMgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50OyBcbiAgICAgICAgLy9jcmVhdGUgYSBuZXcgbW9kZWxcbiAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMuY29uZmlndXJhdGlvbi5faG9zdC5tb2RlbDtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdGhpcy5tb2RlbC5jYW5FZGl0O1xuICAgICAgICB0aGlzLmJsYWRlID0gdGhpcy5jb25maWd1cmF0aW9uLl9ob3N0LmJsYWRlO1xuICAgICAgICB0aGlzLmxvYWRlZCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICAvLyBNYXAgdGhlIGJhc2UgbW9kZWwgcHJvcGVydGllc1xuICAgICAgICB0aGlzLnNoYXJlZG9JZCA9IHRoaXMuY29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWwuaWQ7XG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvSWQgfHwgdGhpcy5zaGFyZWRvSWQoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBzaGFyZWRvSWQgZm91bmRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUgPSB0aGlzLmNvbmZpZ3VyYXRpb24uX2hvc3QubW9kZWwuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lO1xuICAgICAgICBpZiAoIXRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIHx8IHRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIGZvdW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0gdG9PYnNlcnZhYmxlT2JqZWN0KHRoaXMuY29uZmlndXJhdGlvbik7XG5cbiAgICAgICAgLy8gVmFsaWRhdGlvblxuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSB7fTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JDb3VudCA9IGtvLm9ic2VydmFibGUoMCk7XG5cbiAgICAgICAgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPSB0aGlzLnNldExvY2F0aW9uT2ZEYXRhVG9Mb2FkQW5kU2F2ZSgpOyAvL3NldHVwIHRoZSBsb2NhdGlvbiB0byBsb2FkIGFuZCBzYXZlIHRoZSBkYXRhIGZyb20gYnkgY2FsbGluZyB0aGUgYWJzdHJhY3QgbWV0aG9kIGluIHRoZSBjaGlsZCBjbGFzc1xuXG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25Jbml0aWFsaXNlXCIsIHRoaXMubW9kZWwpO1xuICAgIH1cblxuXG4gICAgZ2V0IGRhdGEoKSA6IFRQZXJzaXRhbmNlIHwgdW5kZWZpbmVkIHtcbiAgICBcbiAgICAgICAgaWYodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBsb2NhdGlvbiB0byBsb2FkIGRhdGEgZnJvbSBzZXQgLSB0aGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcnJpZGVuXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmVzdGVkRGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KHRoaXMubW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICBcbiAgICAgICAgdGhpcy5sb2coXCJEYXRhIGZvdW5kIGF0IGxvY2F0aW9uXCIsIFwiZ3JlZW5cIiwgbmVzdGVkRGF0YSk7XG4gICAgICAgIGxldCByZXRWYWx1ZSA9IGtvLnRvSlMobmVzdGVkRGF0YSk7XG4gICAgICAgIHRoaXMubG9nKFwiRGF0YSBmb3VuZCBhdCBsb2NhdGlvblwiLCBcImdyZWVuXCIsIHJldFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIH1cblxuICAgIHNldCBkYXRhKHZhbHVlOiBUUGVyc2l0YW5jZSB8IHVuZGVmaW5lZCkge1xuICAgICAgXG4gICAgICAgIGlmKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gbG9jYXRpb24gdG8gc2F2ZSBkYXRhIHRvIHNldCAtIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZW5cIiwgXCJyZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxldCB2YWx1ZVRvU2V0OiBhbnkgPSB2YWx1ZTtcbiAgICAgICAgLy8gaWYodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEuaW5jbHVkZXMoXCJmb3JtQnVpbGRlclwiKSlcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgLy9mb3JtYnVpbGRlciBEYXRhIGFsd2F5cyBuZWVkIHRvIGJlIHN0cmluZ1xuICAgICAgICAvLyAgICAgdGhpcy5sb2coXCJTZXR0aW5nIGZvcm1idWlsZGVyIGRhdGEgLSBjb252ZXJ0aW5nIHRvIHN0cmluZ1wiLCBcImdyZWVuXCIsIHZhbHVlKVxuICAgICAgICAvLyAgICAgdmFsdWVUb1NldCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgLy8gICAgIHRoaXMubG9nKFwiYWZ0ZXIgU2V0dGluZyBmb3JtYnVpbGRlciBkYXRhIC0gY29udmVydGVkIHRvIHN0cmluZ1wiLCBcImdyZWVuXCIsIHZhbHVlVG9TZXQpXG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5sb2coXCJTZXR0aW5nIGRhdGEgYXQgbG9jYXRpb25cIiwgXCJncmVlblwiLHZhbHVlVG9TZXQpO1xuICAgICAgICBzZXROZXN0ZWRQcm9wZXJ0eSh0aGlzLm1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgdmFsdWVUb1NldCk7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25EYXRhQ2hhbmdlZFwiLCB0aGlzLm1vZGVsKTtcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiAhIGltcG9ydGFudDogTWFuZGF0b3J5IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gc2V0IHRoZSBkZWZhdWx0c1xuICAgICAqICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBjb25zdHJ1Y3RvciB0byBzZXQgdGhlIGRlZmF1bHRzXG4gICAgICogQHJldHVybnMgRGVmYXVsdHM8VENvbmZpZz5cbiAgICAgKiBAbWVtYmVyb2YgQmFzZUlERUFzcGVjdFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIFxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldERlZmF1bHRzKCk6IElEZWZhdWx0U2V0dGluZ3M8VENvbmZpZz47XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiAhIGltcG9ydGFudDogTWFuZGF0b3J5IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gc2V0IHRoZSBkZWZhdWx0cyBmb3IgdGhlIHdpZGdldC5qc29uXG4gICAgLy8gICovXG4gICAgLy8gYWJzdHJhY3Qgc2V0RXhhbXBsZUZvck1vZGVsbGVyKCk6IERlZmF1bHRzPFRDb25maWc+O1xuXG4gICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBsb2FkIGFuZCBzYXZlIHRvXG4gICAgICogRXhhbXBsZXMgb2YgdGhpcyBhcmU6XG4gICAgICogLSBhc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhLntmb3JtQnVpbGRlckZpZWxkfVxuICAgICAqIC0gYXNwZWN0RGF0YS5vZHNFbnRpdHlQaWNrZXJcbiAgICAgKiAtIHVuZGVmaW5lZCAoaWYgbm8gZGF0YSBpcyB0byBiZSBsb2FkZWQgb3Igc2F2ZWQgYnkgdGhlIGJhc2UgY2xhc3MpXG4gICAgICogQHJldHVybnMgVGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGxvYWQgYW5kIHNhdmUgdG8gT1IgdW5kZWZpbmVkIGlmIG5vIGRhdGEgaXMgdG8gYmUgbG9hZGVkIG9yIHNhdmVkIGJ5IHRoZSBiYXNlIGNsYXNzXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgZS5nLiBRdWlja1ZpZXcgXG4gICAgICogVGhpcyB3aWxsIGFsc28gYmUgdXNlZCBkdXJpbmcgdGhlIGJ1aWxkIGFuZCB3aWxsIGJlIGFwcGVuZGVkIHdpdGggdGhlIEJ1aWx0IFRhcmdldCBlLmcuIElERUFzcGVjdHMuUXVpY2tWaWV3XG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0VGhpc0NvbXBvbmVudE5hbWUoKTogc3RyaW5nOyBcblxuXG4gICAgLyoqXG4gICAgICogIUlNUE9SVEFOVCAtIFRoaXMgaXMgdGhlIGZpcnN0IG1ldGhvZCBvbmNlIHRoZSBjbGFzcyBoYXMgYmVlbiBjb25zdHJ1Y3RlZCwgZGVmYXVsdCBjb250cnVjdG9yIGxvZ2ljIHNob3VsZCBiZSBwbGFjZWQgaGVyZVxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldHVwKCk6IHZvaWQ7XG5cblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBzZXR0aW5ncyBmb3IgdGhlIHdpZGdldC5qc29uIHRoYXQgd2lsbCBiZSBnZW5lcmF0ZWRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRXaWRnZXRKc29uU2V0dGluZ3MoKTogSVdpZGdldEpzb248VENvbmZpZz47XG5cblxuXG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50U2NyaXB0RmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50U3R5bGVGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRUZW1wbGF0ZUZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudE1lbnVUZW1wbGF0ZUZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudENvbXBvbmVudEZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldFdpZGdldERlc2lnbmVyU2V0dGluZ3MoKTogSVdpZGdldEpzb25EZXNpZ25lcjtcbiAgICAvLyBhYnN0cmFjdCBzZXRQcmlvcml0eSgpIDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgd2hlbiB0aGUgbW9kZWwgaXMgc2F2ZWQuIE1hbmlwdWxhdGUgdGhlXG4gICAgICogbW9kZWwgYXMgcmVxdWlyZWQuXG4gICAgICovXG4gICAgcHVibGljIG9uU2F2ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25TYXZlXCIsIG1vZGVsKTtcbiAgICAgICAgdGhpcy5sb2coXCJTYXZpbmcsIG1vZGVsIHBhc3NlZCBpbiB3ZSBuZWVkIHRvIHBlcnNpc3QgdG9cIiwgXCJncmVlblwiLCB0aGlzLmRhdGEpO1xuXG4gICAgICAgIGlmKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gbG9jYXRpb24gdG8gc2F2ZSBkYXRhIHRvIHNldCAtIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZW5cIiwgXCJyZWRcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxldCBkYXRhVG9QZXJzaXN0ID0gdGhpcy5kYXRhO1xuICAgICAgICBsZXQgY3VycmVudERhdGEgPSBnZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgICAgICBpZihjdXJyZW50RGF0YSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2coYEN1cnJlbnQgZGF0YSBhdCBsb2NhdGlvbiAke3RoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhfSA6YCwgXCJtYWdlbnRhXCIsIGN1cnJlbnREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWN1cnJlbnREYXRhKSB7XG4gICAgICAgICAgIC8vIHRoaXMubG9nKFwiRGF0YSBkb2VzIG5vdCBleGlzdCwgd2Ugd2lsbCBjcmVhdGVcIiwgXCJvcmFuZ2VcIik7XG4gICAgICAgICAgLy8gIHNldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwge30pO1xuICAgICAgICAgICAvLyBjdXJyZW50RGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2coYE5ldyBkYXRhIHRvIHBlcnNpc3QgdG8gbG9jYXRpb24gJHt0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YX0gOmAsIFwiYmx1ZVwiLCBkYXRhVG9QZXJzaXN0KTtcbiAgICAgICAgc2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCBkYXRhVG9QZXJzaXN0KTtcbiAgICAgICAgXG4gICAgfTtcblxuXG4gICBcblxuICAgIG9uRGVzdHJveShtb2RlbD86IGFueSkge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uRGVzdHJveVwiKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkRlc3Ryb3lcIiwgbW9kZWwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIFVJIGZyYW1ld29yayBhZnRlciBpbml0aWFsIGNyZWF0aW9uIGFuZCBiaW5kaW5nIHRvIGxvYWQgZGF0YVxuICAgICAqIGludG8gaXQncyBtb2RlbFxuICAgICAqL1xuICAgIGxvYWRBbmRCaW5kKCkge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IGxvYWRBbmRCaW5kXCIpO1xuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSAobW9kZWw6YW55KSBwYXNzZWQgaW5cIiwgXCJncmVlblwiKTtcbiAgICAgICAgdGhpcy5sb2coXCJMb2FkaW5nIGRhdGEgYmFzZWQgb24gbG9jYXRpb24gdG8gc2F2ZVwiLCBcImdyZWVuXCIsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkxvYWRcIiwgdGhpcy5tb2RlbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIGJlZm9yZSB0aGUgbW9kZWwgaXMgc2F2ZWRcbiAgICAgKi9cbiAgICBvbkJlZm9yZVNhdmUobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkJlZm9yZVNhdmVcIik7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25CZWZvcmVTYXZlXCIsIG1vZGVsKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIGFmdGVyIHRoZSBtb2RlbCBoYXMgYmVlbiBzYXZlZC5cbiAgICAgKi9cbiAgICBvbkFmdGVyU2F2ZShtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uQWZ0ZXJTYXZlXCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uQWZ0ZXJTYXZlXCIsIG1vZGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciB3aGVuIGl0IHJlbG9hZHMgYXNwZWN0IGRhdGFcbiAgICAgKi9cbiAgICBvblJlbG9hZChtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uUmVsb2FkXCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uUmVsb2FkXCIsIG1vZGVsKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGxvZ2dpbmcgZm9yIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGRlYnVnIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBcbiAgICAgKiBAcGFyYW0gY29sb3IgXG4gICAgICogQHBhcmFtIGRhdGEgXG4gICAgICovXG4gICAgbG9nKG1lc3NhZ2U6IHN0cmluZywgY29sb3I/OiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5kZWJ1Zz8uZW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5kZWJ1Zy5sb2dUb0NvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSBjb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICAvLyBsZXQgbGluZU5vID0gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soKG5ldyBFcnJvcigpKS5zdGFjayk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjICR7dGhpcy50aGlzQ29tcG9uZW50TmFtZX0gLSAke21lc3NhZ2V9YCwgYGNvbG9yOiR7Y29sb3J9YCwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaXJlRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgICAgICBsZXQgZXZlbnQ6IFNoYXJlRG9FdmVudCA9IHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogdGhpcy50aGlzQ29tcG9uZW50TmFtZSArIFwiLlwiICsgZXZlbnROYW1lLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBldmVudE5hbWUsXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH1cbiAgICAgICAgZmlyZUV2ZW50KGV2ZW50KTtcbiAgICB9XG4gICAgXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBGb3JtYnVpbGQgaWYgaXQgZXhpc3RzIG9yIGNyZWF0ZXMgaXQgaWYgaXQgZG9lcyBub3RcbiAgICAgKiBcbiAgICAgKi9cbiAgICBmb3JtYnVpbGRlcigpIHtcblxuICAgICAgICBpZiAoIXRoaXMuYmxhZGU/Lm1vZGVsPy5hc3BlY3REYXRhPy5mb3JtQnVpbGRlcj8uZm9ybURhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBub3QgZm91bmQgLSB3aWxsIGNyZWF0ZSB0aGUgcGF0aFwiLCBcImJsdWVcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgZm91bmRcIiwgXCJncmVlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vRW5zdXJlIHRoZSBwYXRoIGV4aXN0c1xuICAgICAgICB0aGlzLmJsYWRlID0gdGhpcy5ibGFkZSB8fCB7fTtcbiAgICAgICAgdGhpcy5ibGFkZS5tb2RlbCA9IHRoaXMuYmxhZGUubW9kZWwgfHwge307XG4gICAgICAgIHRoaXMuYmxhZGUubW9kZWwuYXNwZWN0RGF0YSA9IHRoaXMuYmxhZGUubW9kZWwuYXNwZWN0RGF0YSB8fCB7fTtcbiAgICAgICAgdGhpcy5ibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyID0gdGhpcy5ibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyIHx8IHsgZm9ybURhdGE6IHt9IH07XG5cbiAgIFxuICAgICAgICByZXR1cm4gdGhpcy5ibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhO1xuXG4gICAgfVxuXG4gICAgZm9ybWJ1aWxkZXJGaWVsZChmb3JtYnVpbGRlckZpZWxkOnN0cmluZywgc2V0VmFsdWU/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZvcm1idWlsZGVyKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiRm9ybSBidWlsZGVyIGRvZXMgbm90IGV4aXN0ISBcIiwgXCJyZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGb3JtIGJ1aWxkZXIgZG9lcyBub3QgZXhpc3QhXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZvdW5kVmFsdWUgPSB0aGlzLmZvcm1idWlsZGVyKClbZm9ybWJ1aWxkZXJGaWVsZF1cbiAgICAgICAgaWYgKCFmb3VuZFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhgRm9ybSBidWlsZGVyIGRvZXMgbm90IGNvbnRhaW4gZmllbGQgJHtmb3JtYnVpbGRlckZpZWxkfSBgLCBcIm9yYW5nZVwiKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGBDcmVhdGluZyBmaWVsZCAke2Zvcm1idWlsZGVyRmllbGR9IGAsIFwiYmx1ZVwiKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybWJ1aWxkZXIoKVtmb3JtYnVpbGRlckZpZWxkXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQXJlIHdlIGRvaW5nIGEgc2V0XG4gICAgICAgIGlmIChzZXRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coYFNldHRpbmcgJHtmb3JtYnVpbGRlckZpZWxkfSB0byAke3NldFZhbHVlfWAsIFwiZ3JlZW5cIik7XG4gICAgICAgICAgICB0aGlzLmZvcm1idWlsZGVyKClbZm9ybWJ1aWxkZXJGaWVsZF0gPSBzZXRWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBzZXRWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3VuZFZhbHVlO1xuICAgIH1cblxufVxuXG5cblxuLy8gY2xhc3MgTXlDbGFzcyB7XG5cbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IoKTtcbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IocDE6IG51bWJlcik7XG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKHAxOiBzdHJpbmcsIHAyOiBzdHJpbmcpO1xuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwMTogc3RyaW5nLCBwMjogc3RyaW5nLCBwMzogc3RyaW5nKTtcblxuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvciguLi5hcnI6IGFueVtdKSB7XG4vLyAgICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAyKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygndHdvIGFyZ3VtZW50cyBjb25zdHJ1Y3RvciBjYWxsZWQuJyk7XG4vLyAgICAgICAgIH0gZWxzZSBpZiAoYXJyLmxlbmd0aCA9PT0gMykge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3RocmVlIGFyZ3VtZW50cyBjb25zdHJ1Y3RvciBjYWxsZWQuJyk7XG4vLyAgICAgICAgIH0gZWxzZSBpZiAoYXJyLmxlbmd0aCA9PT0gMSkge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ29uZSBhcmd1bWVudCBjb25zdHJ1Y3RvciBjYWxsZWQuJyk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG5cbi8vIH1cblxuLy8gbGV0IHggPSBuZXcgTXlDbGFzcygpIiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b09ic2VydmFibGVPYmplY3Q8VCBleHRlbmRzIG9iamVjdD4ob2JqOiBUKTogeyBbSyBpbiBrZXlvZiBUXToga28uT2JzZXJ2YWJsZTxUW0tdPiB9IHtcbiAgICBjb25zdCByZXN1bHQ6IGFueSA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICAvL2NoZWNrIGlmIG9ialtrZXldIGlzIGFscmVhZHkgYSBvYnNlcnZhYmxlXG4gICAgICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGtvLm9ic2VydmFibGUob2JqW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn0iLCJcbmV4cG9ydCBmdW5jdGlvbiBzZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICBpZiAoIWN1cnJlbnRbcHJvcF0pIHtcbiAgICAgICAgICAgIGN1cnJlbnRbcHJvcF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcbiAgICB9XG4gICAgY3VycmVudFtwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoIC0gMV1dID0gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBwcm9wZXJ0eVBhdGguc3BsaXQoJy4nKTtcbiAgICBsZXQgY3VycmVudCA9IG9iajtcblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChjdXJyZW50W3Byb3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50O1xufVxuIiwiaW1wb3J0IHsgSURlZmF1bHRTZXR0aW5ncyB9IGZyb20gXCIuLi9CYXNlQ2xhc3Nlcy9CYXNlSURFQXNwZWN0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUV4dGVybmFsTWF0dGVyU2VhcmNoQ29uZmlndXJhdGlvbiB7XG4gICAgZmFja01vZGU6IGJvb2xlYW47XG4gICAgc2VhcmNoQXBpVXJsOiBzdHJpbmc7IC8vL1wiYXBpL2V4dGVybmFsTWF0dGVyUHJvdmlkZXIvcXVlcnkvezB9XCJcbiAgICBsb2FkQXBpVXJsOiBzdHJpbmc7IC8vXCJhcGkvZXh0ZXJuYWxNYXR0ZXJQcm92aWRlci9kZXRhaWxzL3tkYXRhLmNvZGV9XCIgXG4gICAgLy8gc2VhcmNoUmVzdWx0VGVtcGxhdGU6IHN0cmluZzsgLy8gXCJjb2RlLGRlc2NyaXB0aW9uXCJcbiAgICBkYXRhTWFwcGluZzogSURhdGFNYXBwaW5nW10sXG4gICAgZmFja1NlYXJjaERhdGFJREVQYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgZmFja0xvYWREYXRhSURFUGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhTWFwcGluZyB7XG4gICAgZm9ybUJ1aWxkZXJGaWVsZDogc3RyaW5nO1xuICAgIHNlYXJjaFJlc3VsdEZpZWxkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0OiBJRGVmYXVsdFNldHRpbmdzPElFeHRlcm5hbE1hdHRlclNlYXJjaENvbmZpZ3VyYXRpb24+PSB7XG4gICAgZmFja01vZGU6IGZhbHNlLFxuICAgIHNlYXJjaEFwaVVybDogXCJhcGkvZXh0ZXJuYWxNYXR0ZXJQcm92aWRlci9xdWVyeS97c2VhcmNoVGVybX1cIixcbiAgICBsb2FkQXBpVXJsOiBcImFwaS9leHRlcm5hbE1hdHRlclByb3ZpZGVyL2RldGFpbHMve2NvZGV9XCIsXG4gICAgZGF0YU1hcHBpbmc6IFtcbiAgICAgICAgeyBmb3JtQnVpbGRlckZpZWxkOiBcIm1hdHRlck51bWJlclwiLCBzZWFyY2hSZXN1bHRGaWVsZDogXCJjb2RlXCIgfSxcbiAgICAgICAgeyBmb3JtQnVpbGRlckZpZWxkOiBcIm1hdHRlclNob3J0TmFtZVwiLCBzZWFyY2hSZXN1bHRGaWVsZDogXCJzaG9ydE5hbWVcIiB9LFxuICAgICAgICB7IGZvcm1CdWlsZGVyRmllbGQ6IFwibWF0dGVyQ2xpZW50eyp9XCIsIHNlYXJjaFJlc3VsdEZpZWxkOiBcImNsaWVudC57Kn1cIiB9LFxuICAgICAgICB7IGZvcm1CdWlsZGVyRmllbGQ6IFwibWF0dGVyUGFydG5lck5hbWVcIiwgc2VhcmNoUmVzdWx0RmllbGQ6IFwicGFydG5lci5uYW1lXCIgfSxcbiAgICAgICAgeyBmb3JtQnVpbGRlckZpZWxkOiBcIm1hdHRlclBhcnRuZXJFbWFpbFwiLCBzZWFyY2hSZXN1bHRGaWVsZDogXCJwYXJ0bmVyLmVtYWlsXCIgfSxcbiAgICBdLFxuICAgIGZhY2tTZWFyY2hEYXRhSURFUGF0aDogdW5kZWZpbmVkLFxuICAgIGZhY2tMb2FkRGF0YUlERVBhdGg6IHVuZGVmaW5lZCxcbiAgICBkZWJ1ZzpcbiAgICB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIGxvZ1RvQ29uc29sZTogdHJ1ZSxcbiAgICAgICAgc2hvd0luQXNwZWN0OiB0cnVlXG4gICAgfSxcbiAgICBldmVudHNUb1JlYWN0VG86IFtdXG59XG5cblxuIiwiaW1wb3J0IHsgSVdpZGdldEpzb24gfSBmcm9tIFwiLi4vQmFzZUNsYXNzZXMvSVdpZGdldEpzb25cIjtcbmltcG9ydCB7IERlZmF1bHQsIElFeHRlcm5hbE1hdHRlclNlYXJjaENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9FeHRlcm5hbE1hdHRlclNlYXJjaEludGVyZmFjZVwiO1xuIFxuZXhwb3J0IGNvbnN0IFNldHRpbmdzOiBJV2lkZ2V0SnNvbjxJRXh0ZXJuYWxNYXR0ZXJTZWFyY2hDb25maWd1cmF0aW9uPiA9XG57XG4gICAgdHlwZTogXCJ3aWRnZXRcIixcbiAgICBcInByaW9yaXR5XCI6IDYwMDAsXG4gICAgXCJkZXNpZ25lclwiOiB7XG4gICAgICAgIFwiYWxsb3dJblBvcnRhbERlc2lnbmVyXCI6IGZhbHNlLFxuICAgICAgICBcImFsbG93SW5TaGFyZWRvUG9ydGFsRGVzaWduZXJcIjogZmFsc2UsXG4gICAgICAgIFwiYWxsb3dBc3BlY3RBZGFwdGVyXCI6IHRydWUsXG4gICAgICAgIFwidGl0bGVcIjogXCJFeHRlcm5hbCBNYXR0ZXIgU2VhcmNoXCIsXG4gICAgICAgIFwiaWNvblwiOiBcImZhLWNvZ1wiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiRXh0ZXJuYWwgTWF0dGVyIFNlYXJjaFwiLFxuICAgICAgICBcImNhdGVnb3JpZXNcIjogW10sXG4gICAgICAgIFwiaXNDb25maWd1cmFibGVcIjogdHJ1ZSxcbiAgICAgICAgXCJjb25maWd1cmF0aW9uV2lkZ2V0XCI6IG51bGwsXG4gICAgICAgIGRlZmF1bHRDb25maWd1cmF0aW9uSnNvbjpEZWZhdWx0XG4gICAgfSxcbiAgICBcInNjcmlwdHNcIjogW1xuICAgIF0sXG4gICAgXCJzdHlsZXNcIjogW1xuICAgICAgICBcIkV4dGVybmFsTWF0dGVyU2VhcmNoLmNzc1wiXG4gICAgXSxcbiAgICBcInRlbXBsYXRlc1wiOiBbXG4gICAgICAgIFwiRXh0ZXJuYWxNYXR0ZXJTZWFyY2guaHRtbFwiXG4gICAgXSxcbiAgICBcIm1lbnVUZW1wbGF0ZXNcIjogW10sXG4gICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgICAgXCJTaGFyZWRvLlVJLkZyYW1ld29yay5Db21wb25lbnRzLkF1dG9Db21wbGV0ZVwiXG4gICAgXVxufVxuXG4iLCJjb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xuZXhwb3J0IGRlZmF1bHQge1xuICByYW5kb21VVUlEXG59OyIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgcmV0dXJuIChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgbmF0aXZlIGZyb20gJy4vbmF0aXZlLmpzJztcbmltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAobmF0aXZlLnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBuYXRpdmUucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCJtb2R1bGUuZXhwb3J0cyA9IGtvOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBBVVRPQ09NUExFVEVfTU9ERSwgQVVUT0NPTVBMRVRFX0NBUkRfVFlQRX0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvY29tcG9uZW50cy9JQXV0b0NvbXBsZXRlRmluZENhcmRPcHRpb25zXCI7XHJcbmltcG9ydCB7IHNldEFsbEZpZWxkc1RvTnVsbCB9IGZyb20gXCIuLi8uLi9Db21tb24vT2JqZWN0SGVscGVyXCI7XHJcbmltcG9ydCB7IGV4ZWN1dGVHZXQgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9hcGlcIjtcclxuaW1wb3J0IHsgQmFzZUlERUFzcGVjdCwgSURlZmF1bHRTZXR0aW5nc30gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3RcIjtcclxuaW1wb3J0IHsgRGVmYXVsdCwgSUV4dGVybmFsTWF0dGVyU2VhcmNoQ29uZmlndXJhdGlvbiB9IGZyb20gXCIuL0V4dGVybmFsTWF0dGVyU2VhcmNoSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElXaWRnZXRKc29ufSBmcm9tIFwiLi4vQmFzZUNsYXNzZXMvSVdpZGdldEpzb25cIjtcclxuaW1wb3J0IGtvLCB7IE9ic2VydmFibGUgfSBmcm9tIFwia25vY2tvdXRcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tIFwiLi9FeHRlcm5hbE1hdHRlclNlYXJjaFNldHRpbmdzXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlcm5hbE1hdHRlclNlYXJjaCBleHRlbmRzIEJhc2VJREVBc3BlY3Q8SUV4dGVybmFsTWF0dGVyU2VhcmNoQ29uZmlndXJhdGlvbiwgYW55PiB7XHJcbiAgICBhdXRvQ29tcGxldGU6IFNoYXJlZG8uVUkuRnJhbWV3b3JrLkNvbXBvbmVudHMuQXV0b0NvbXBsZXRlSGFuZGxlciB8IHVuZGVmaW5lZDtcclxuICAgIHNlbGVjdGVkRGl2OiBhbnk7XHJcbiAgICBzZWxlY3RlZE1hdHRlcjogT2JzZXJ2YWJsZTxhbnk+ID0ga28ub2JzZXJ2YWJsZTxhbnk+KCk7XHJcbiAgICBcclxuICAgIC8vIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJRXh0ZXJuYWxNYXR0ZXJTZWFyY2hDb25maWd1cmF0aW9uLCBiYXNlTW9kZWw6IGFueSkge1xyXG4gICAgLy8gICAgIHN1cGVyKHRoaXNXaWRnZXRTeXN0ZW1OYW1lLCBcImFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyXCIsIGVsZW1lbnQsIGNvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbClcclxuICAgIC8vIH1cclxuXHJcbiAgICBzZXRXaWRnZXRKc29uU2V0dGluZ3MoKTogSVdpZGdldEpzb248SUV4dGVybmFsTWF0dGVyU2VhcmNoQ29uZmlndXJhdGlvbj57XHJcbiAgICAgICAgcmV0dXJuIFNldHRpbmdzXHJcbiAgICB9XHJcbiAgIFxyXG4gICAgc2V0VGhpc0NvbXBvbmVudE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJFeHRlcm5hbE1hdHRlclNlYXJjaFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERlZmF1bHRzKCk6IElEZWZhdWx0U2V0dGluZ3M8SUV4dGVybmFsTWF0dGVyU2VhcmNoQ29uZmlndXJhdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcml2YXRlIGluaXRpYWxpc2UoKSB7Ly8hIE5vdGU6IFVJIGZyYW1ld29yayBsb29rcyBmb3IgdGhpcyBtZXRob2QgbmFtZSBhbmQgaWYgZm91bmQgYmVoYXZlcyBkaWZmZXJlbnRseSBhbmQgd29udCBjYWxsIGxvYWRBbmRCaW5kXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbWV0aG9kIHNldHVwXHJcbiAgICAgKiBAZGVzY3JpcHRpb24gU2V0cyB1cCB0aGUgYXV0byBjb21wbGV0ZSBoYW5kbGVyXHJcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgIHNldHVwKCkge1xyXG4gICAgICAgIHRoaXMuYXV0b0NvbXBsZXRlID0gbmV3IFNoYXJlZG8uVUkuRnJhbWV3b3JrLkNvbXBvbmVudHMuQXV0b0NvbXBsZXRlSGFuZGxlcihcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1vZGU6IEFVVE9DT01QTEVURV9NT0RFLlNFTEVDVCxcclxuICAgICAgICAgICAgICAgIHRleHQ6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiU2VhcmNoIGZvciBtYXR0ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eTogXCJTdGFydCB0eXBpbmcgdG8gbG9va3VwIGEgbWF0dGVyIGJ5IG51bWJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtcHR5SWNvbjogXCJmYS1zZWFyY2hcIixcclxuICAgICAgICAgICAgICAgICAgICB0eXBpbmc6IFwiV2lsbCBzZWFyY2ggd2hlbiB5b3Ugc3RvcCB0eXBpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hpbmc6IFwiT25lIG1vbWVudC4uLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vUmVzdWx0czogXCJOb3RoaW5nIGZvdW5kXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Q6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dDbGVhcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFZhbHVlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uTG9hZDogdGhpcy5sb2FkTWF0dGVyLmJpbmQodGhpcylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkZpbmQ6IHRoaXMuYXV0b0NvbXBsZXRlRmluZGVyLmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZXM6IHsgcmVzdWx0OiBcIl9fbWF0dGVyX3NlYXJjaF9pdGVtX3RlbXBsYXRlXCIgfSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbWV0aG9kIGxvYWRcclxuICAgICAqIEBkZXNjcmlwdGlvbiBMb2FkcyB0aGUgZGF0YSBmcm9tIHRoZSBzaGFyZWRvIG1vZGVsIGZvcm0gYnVpbGRlclxyXG4gICAgICogQHBhcmFtIHthbnl9IG1vZGVsIC0gVGhlIG1vZGVsIHRvIGxvYWQgZnJvbVxyXG4gICAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGxvYWQobW9kZWw6IGFueSkge1xyXG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvSWQoKSkgcmV0dXJuO1xyXG4gICAgICAgIG1vZGVsLmFzcGVjdERhdGEgPSBtb2RlbC5hc3BlY3REYXRhIHx8IHt9O1xyXG4gICAgICAgIG1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIgPSBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyIHx8IHt9O1xyXG4gICAgICAgIG1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgPSBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIHx8IHt9O1xyXG4gICAgICAgIHZhciBmb3JtRGF0YSA9IG1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGE7XHJcblxyXG4gICAgICAgIGxldCBtYXR0ZXJNb2RlbCA9IHtcclxuICAgICAgICAgICAgY29kZTogZm9ybURhdGEuZXh0ZXJuYWxNYXR0ZXJfQ29kZSxcclxuICAgICAgICAgICAgdGl0bGU6IGZvcm1EYXRhLmV4dGVybmFsTWF0dGVyX1RpdGxlLFxyXG4gICAgICAgICAgICBjbGllbnQ6IGZvcm1EYXRhLmV4dGVybmFsTWF0dGVyX0NsaWVudCxcclxuICAgICAgICAgICAgcGFydG5lcjogZm9ybURhdGEuZXh0ZXJuYWxNYXR0ZXJfUGFydG5lcixcclxuICAgICAgICAgICAgc3RhdHVzOiBmb3JtRGF0YS5leHRlcm5hbE1hdHRlcl9TdGF0dXMsXHJcbiAgICAgICAgICAgIGlzU2VjdXJlOiBmb3JtRGF0YS5leHRlcm5hbE1hdHRlcl9Jc1NlY3VyZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBhZGRWaXN1YWxFeHRlbnNpb24obWF0dGVyTW9kZWwpO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdGVkTWF0dGVyKG1hdHRlck1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkTWF0dGVyKG1vZGVsOiBhbnkpIHtcclxuICAgICAgICAvL2h0dHBzOi8vaHNmLXZuZXh0LnNoYXJlZG8uY28udWsvYXBpL2V4dGVybmFsTWF0dGVyUHJvdmlkZXIvZGV0YWlscy84MTczNTA4OVxyXG5cclxuICAgICAgICBpZiAoIW1vZGVsIHx8ICFtb2RlbC5jb2RlKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAkdWkuc3RhY2tzLmxvY2soc2VsZiwgXCJMb2FkaW5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBNYXR0ZXI6IFwiICsgbW9kZWwuY29kZSwgXCJncmVlblwiKTtcclxuXHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMub3B0aW9ucy5sb2FkQXBpVXJsKCk7XHJcblxyXG4gICAgICAgIC8vZmluZCBhbnkgdmFsdWVzIHdpdGhpbiB7fSBhbmQgcmVwbGFjZSB3aXRoIHRoZSB2YWx1ZSBmcm9tIHRoZSBtb2RlbFxyXG4gICAgICAgIGxldCBtYXRjaGVzID0gdXJsLm1hdGNoKC97KFtefV0rKX0vZyk7XHJcbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgICAgICAgbWF0Y2hlcy5mb3JFYWNoKChtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBtLnJlcGxhY2UoXCJ7XCIsIFwiXCIpLnJlcGxhY2UoXCJ9XCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UobSwgbW9kZWxba2V5XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBNYXR0ZXIgdXNpbmcgOiBcIiArIHVybCwgXCJncmVlblwiKTtcclxuXHJcbiAgICAgICAgZXhlY3V0ZUdldCh1cmwpLnRoZW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgbW9kZWwuY29kZSA9IHJlc3BvbnNlLm1hdHRlckNvZGU7XHJcbiAgICAgICAgICAgIG1vZGVsLnNob3J0TmFtZSA9IHJlc3BvbnNlLnNob3J0TmFtZTtcclxuICAgICAgICAgICAgbW9kZWwuY2xpZW50ID0gcmVzcG9uc2UuY2xpZW50Py5uYW1lO1xyXG4gICAgICAgICAgICBtb2RlbC5wYXJ0bmVyID0gcmVzcG9uc2UucGFydG5lcj8ubmFtZTtcclxuICAgICAgICAgICAgbW9kZWwuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xyXG4gICAgICAgICAgICBtb2RlbC5pc1NlY3VyZSA9IHJlc3BvbnNlLmlzU2VjdXJlO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHNldEFsbEZpZWxkc1RvTnVsbChtb2RlbCk7XHJcbiAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGFkZFZpc3VhbEV4dGVuc2lvbihtb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRNYXR0ZXIobW9kZWwpO1xyXG4gICAgICAgICAgICAkdWkuc3RhY2tzLnVubG9jayhzZWxmKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9SZXN1dCB0aGUgYmFzaWMgc2VsZWN0ZWQgZGlzcGxheSBjYXJkIHRvIHRoZSBhdXRvIGNvbXBsZXRlXHJcbiAgICAgICAgcmV0dXJuIG5ldyBTaGFyZWRvLlVJLkZyYW1ld29yay5Db21wb25lbnRzLkF1dG9Db21wbGV0ZURpc3BsYXlDYXJkKHtcclxuICAgICAgICAgICAgaWQ6IG1vZGVsLFxyXG4gICAgICAgICAgICBpY29uOiBudWxsLFxyXG4gICAgICAgICAgICB0ZXh0OiBtb2RlbC5jb2RlICsgXCIgLSBcIiArIG1vZGVsLnRpdGxlXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgIFxyXG4gICAgfTtcclxuXHJcbiAgICBfYXNwZWN0UmVsb2FkKG1vZGVsOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmxvYWQobW9kZWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzYXZlKG1vZGVsOiBhbnkpIHtcclxuICAgICAgICB2YXIgbWF0dGVyID0ge1xyXG4gICAgICAgICAgICBleHRlcm5hbE1hdHRlcl9Db2RlOiBudWxsLFxyXG4gICAgICAgICAgICBleHRlcm5hbE1hdHRlcl9UaXRsZTogbnVsbCxcclxuICAgICAgICAgICAgZXh0ZXJuYWxNYXR0ZXJfQ2xpZW50OiBudWxsLFxyXG4gICAgICAgICAgICBleHRlcm5hbE1hdHRlcl9QYXJ0bmVyOiBudWxsLFxyXG4gICAgICAgICAgICBleHRlcm5hbE1hdHRlcl9TdGF0dXM6IG51bGwsXHJcbiAgICAgICAgICAgIGV4dGVybmFsTWF0dGVyX0lzU2VjdXJlOiBmYWxzZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBtb2RlbE1hdHRlciA9IHRoaXMuc2VsZWN0ZWRNYXR0ZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKG1vZGVsTWF0dGVyKSB7XHJcbiAgICAgICAgICAgIG1hdHRlci5leHRlcm5hbE1hdHRlcl9DbGllbnQgPSBtb2RlbE1hdHRlci5jbGllbnQ7XHJcbiAgICAgICAgICAgIG1hdHRlci5leHRlcm5hbE1hdHRlcl9QYXJ0bmVyID0gbW9kZWxNYXR0ZXIucGFydG5lcjtcclxuICAgICAgICAgICAgbWF0dGVyLmV4dGVybmFsTWF0dGVyX1RpdGxlID0gbW9kZWxNYXR0ZXIudGl0bGU7XHJcbiAgICAgICAgICAgIG1hdHRlci5leHRlcm5hbE1hdHRlcl9Db2RlID0gbW9kZWxNYXR0ZXIuY29kZTtcclxuICAgICAgICAgICAgbWF0dGVyLmV4dGVybmFsTWF0dGVyX1N0YXR1cyA9IG1vZGVsTWF0dGVyLnN0YXR1cztcclxuICAgICAgICAgICAgbWF0dGVyLmV4dGVybmFsTWF0dGVyX0lzU2VjdXJlID0gbW9kZWxNYXR0ZXIuaXNTZWN1cmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkLmV4dGVuZChtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhLCBtYXR0ZXIpO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIGF1dG9Db21wbGV0ZUZpbmRlcih2OiBzdHJpbmcsIGhhbmRsZXI6IGFueSkge1xyXG4gICAgICAgIHZhciBzZWFyY2ggPSB2LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2coXCJTZWFyY2hpbmcgZm9yOiBcIiArIHNlYXJjaCwgXCJncmVlblwiKTtcclxuICAgICAgICBsZXQgdXJsID0gdGhpcy5vcHRpb25zLnNlYXJjaEFwaVVybCgpO1xyXG5cclxuICAgICAgICBpZiAodXJsLmluZGV4T2YoXCJ7c2VhcmNoVGVybX1cIikgPiAtMSkge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShcIntzZWFyY2hUZXJtfVwiLCBzZWFyY2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleGVjdXRlR2V0KHVybCkudGhlbigoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjYXJkcyA9IG5ldyBBcnJheTxTaGFyZWRvLlVJLkZyYW1ld29yay5Db21wb25lbnRzLkF1dG9Db21wbGV0ZUZpbmRDYXJkPigpO1xyXG4gICAgICAgICAgICBkYXRhLmV4dGVybmFsTWF0dGVyUHJvdmlkZXJTZWFyY2hSZXN1bHRzLmZvckVhY2goKGQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRkVmlzdWFsRXh0ZW5zaW9uKGQpO1xyXG4gICAgICAgICAgICAgICAgY2FyZHMucHVzaChuZXcgU2hhcmVkby5VSS5GcmFtZXdvcmsuQ29tcG9uZW50cy5BdXRvQ29tcGxldGVGaW5kQ2FyZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQVVUT0NPTVBMRVRFX0NBUkRfVFlQRS5SRVNVTFQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZCxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBkLmljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzOiBkLmNzc0NsYXNzLFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmVzdWx0LnJlc29sdmUoY2FyZHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuXHJcbiAgICBhdXRvQ29tcGxldGVTZWxlY3Qoc2VsZWN0Q2FyZDogYW55LCBoYW5kbGVyOiBhbnkpIHtcclxuICAgIH07XHJcblxyXG4gICAgb3ZlcnJpZGUgbG9hZEFuZEJpbmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2coXCJObyBMb2FkQW5kQmluZCBJbXBsZW1lbnRlZFwiLCBcImdyZWVuXCIpO1xyXG4gICAgICAgIC8vIHN1cGVyLmxvYWRBbmRCaW5kKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWREaXYgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWxlY3RlZFwiKTtcclxuICAgICAgICBcclxuICAgIH07XHJcblxyXG4gICAgYnVpbGRTZWxlY3RlZENhcmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2coXCJObyBCdWlsZFNlbGVjdGVkQ2FyZCBJbXBsZW1lbnRlZFwiLCBcImdyZWVuXCIpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWREaXYuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG92ZXJyaWRlIG9uU2F2ZShtb2RlbDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2coXCJObyBTYXZlIEltcGxlbWVudGVkXCIsIFwiZ3JlZW5cIik7XHJcbiAgICAgICAgLy8gc3VwZXIub25TYXZlKG1vZGVsKTtcclxuICAgIH07XHJcbn0gXHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBhZGRWaXN1YWxFeHRlbnNpb24obWF0dGVyTW9kZWw6IGFueSkge1xyXG4gICAgXHJcbiAgICBpZiAoIW1hdHRlck1vZGVsKSByZXR1cm47XHJcblxyXG4gICAgbWF0dGVyTW9kZWwuY3NzQ2xhc3MgPSBcIlwiO1xyXG4gICAgXHJcblxyXG4gICAgLy9hZGQgSWNvblxyXG4gICAgaWYobWF0dGVyTW9kZWwuc3RhdHVzID09IFwiQ2xvc2VkXCIpe1xyXG4gICAgICAgIG1hdHRlck1vZGVsLmljb24gPSBcImZhLWxvY2sgIHRleHQtZGFuZ2VyXCI7XHJcbiAgICAgICAgbWF0dGVyTW9kZWwuY3NzQ2xhc3MgPSBcImNsb3NlZC1tYXR0ZXJcIjtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBtYXR0ZXJNb2RlbC5pY29uID0gXCJmYS11bmxvY2sgdGV4dC1zdWNjZXNzXCI7XHJcbiAgICAgICAgbWF0dGVyTW9kZWwuY3NzQ2xhc3MgPSBcIm9wZW4tbWF0dGVyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy9hZGQgY3NzIGNsYXNzXHJcbiAgICBpZihtYXR0ZXJNb2RlbC5pc1NlY3VyZSl7XHJcbiAgICAgICAgbWF0dGVyTW9kZWwuY3NzQ2xhc3MgKz0gXCIgc2VjdXJlLW1hdHRlclwiO1xyXG4gICAgICAgIG1hdHRlck1vZGVsLmlzU2VjdXJlSWNvbiA9IFwiZmEtc29saWQgZmEtc2hpZWxkIHRleHQtZGFuZ2VyXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgbWF0dGVyTW9kZWwuaXNTZWN1cmVJY29uID0gXCJmYS1zb2xpZCBmYS1maWxlIHRleHQtc3VjY2Vzc1wiO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==