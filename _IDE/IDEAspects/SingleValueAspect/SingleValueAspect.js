/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Common/Log.ts":
/*!***************************!*\
  !*** ./src/Common/Log.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Section: () => (/* binding */ Section),
/* harmony export */   clearSec: () => (/* binding */ clearSec),
/* harmony export */   err: () => (/* binding */ err),
/* harmony export */   hl: () => (/* binding */ hl),
/* harmony export */   hl1: () => (/* binding */ hl1),
/* harmony export */   imp: () => (/* binding */ imp),
/* harmony export */   inf: () => (/* binding */ inf),
/* harmony export */   l: () => (/* binding */ l),
/* harmony export */   lh: () => (/* binding */ lh),
/* harmony export */   lh1: () => (/* binding */ lh1),
/* harmony export */   lh2: () => (/* binding */ lh2),
/* harmony export */   lh3: () => (/* binding */ lh3),
/* harmony export */   nv: () => (/* binding */ nv),
/* harmony export */   runTest: () => (/* binding */ runTest),
/* harmony export */   secBackOne: () => (/* binding */ secBackOne),
/* harmony export */   suc: () => (/* binding */ suc),
/* harmony export */   wrn: () => (/* binding */ wrn)
/* harmony export */ });
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chalk */ "./node_modules/chalk/source/index.js");
/* harmony import */ var _StackHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StackHelper */ "./src/Common/StackHelper.ts");


chalk__WEBPACK_IMPORTED_MODULE_1__["default"].level = 3;
let defaultMode = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].reset;
let lastSec;
function clearSec() {
    // for(let i = 0; i < 10; i++){
    // console.groupEnd()
    // }
    if (lastSec?.group) {
        for (let i = 0; i < lastSec?.group; i++) {
            console.groupEnd();
        }
    }
    lastSec = new Section("Root", defaultMode);
}
function secBackOne() {
    lastSec = lastSec?.parent;
    console.groupEnd();
}
class Section {
    constructor(sectionName, c, section) {
        this.indent = 0;
        this.indentPad = "";
        this.group = 0;
        this.c = c;
        this.sectionName = sectionName;
        if (section) {
            this.indent = section.indent + 1;
            this.indentPad = "-".repeat(this.indent * 2) + " ";
        }
        lastSec = this;
        this.parent = section;
    }
    log(...args) {
        console.log(defaultMode(args));
    }
    lh1(heading) {
        return lh1(this.indentPad + heading, this);
    }
    lh2(heading) {
        return lh2(this.indentPad + heading, this);
    }
    lh3(heading) {
        return lh3(this.indentPad + heading, this);
    }
    l(...args) {
        return l(this, ...args);
    }
}
function l(...args) {
    let sec = lastSec;
    let firstArg;
    let firstArgModifed;
    args.forEach((arg) => {
        if (arg instanceof Section) {
            sec = arg;
        }
        if (!firstArg && arg.constructor.name === "String") {
            firstArg = args.shift();
        }
    });
    //removed Section from args
    args = args.filter((arg) => {
        return !(arg instanceof Section);
    });
    // let c = sec?.c || mode;
    let c = defaultMode;
    let indentPad = sec?.indentPad || "";
    if (!firstArg) {
        firstArg = "";
    }
    firstArgModifed = firstArg;
    firstArgModifed = indentPad + firstArg;
    //remove color formatting from first arg
    let totLen = firstArgModifed.length - firstArgModifed.replace(/\u001b\[.*?m/g, '').length - 2;
    console.log(firstArgModifed);
    //removed Section from args
    args.forEach((arg) => {
        console.log(arg);
    });
}
function logHeadingSection(c, heading, section) {
    let sec = new Section(heading, c, section);
    let time = new Date(Date.now()).toLocaleString();
    let path = "";
    if (section) {
        path = section.sectionName;
        while (section.parent) {
            section = section.parent;
            path = section.sectionName + " -> " + path;
        }
    }
    //add add heading to end of path and only add -> if path is not empty
    if (path.length > 0) {
        path += " -> ";
    }
    path += heading;
    //position the heading in the middle of the screen
    // console.log(c(heading.padStart((cwidth / 2) + (heading.length / 2), " ").padEnd(cwidth, " ")));
    console.groupCollapsed(c(path));
    sec.group++;
    return sec;
}
function lh1(heading, section = lastSec) {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].bgBlack.greenBright.bold;
    return logHeadingSection(c, heading, section);
}
function lh2(heading, section = lastSec) {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].bgGray.cyanBright.bold;
    return logHeadingSection(c, heading, section);
}
function lh3(heading, section = lastSec) {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].bgGray.magentaBright.bold;
    return logHeadingSection(c, heading, section);
}
const lh = lh1;
const imp = (text) => {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].red.bold.bgBlack;
    return c(text);
};
const inf = (text) => {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].blue.bold;
    return c(text);
};
const wrn = (text) => {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].yellow.bold;
    return c(text);
};
const err = (text) => {
    let er = (new Error());
    let lineNo = (0,_StackHelper__WEBPACK_IMPORTED_MODULE_0__.extractLineNumberFromStack)(er.stack);
    let caller = (0,_StackHelper__WEBPACK_IMPORTED_MODULE_0__.extractCallerFromStack)(er.stack);
    let preText = `[${caller}:${lineNo}]`;
    text = preText + " " + text;
    console.log(er);
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].red.bold;
    return c(text);
};
const suc = (text) => {
    let c = chalk__WEBPACK_IMPORTED_MODULE_1__["default"].green.bold;
    return c(text);
};
const hl = (text) => {
    return chalk__WEBPACK_IMPORTED_MODULE_1__["default"].bgBlue(text);
};
const hl1 = (text) => {
    return chalk__WEBPACK_IMPORTED_MODULE_1__["default"].bgMagenta(text);
};
const nv = (name, value) => {
    return chalk__WEBPACK_IMPORTED_MODULE_1__["default"].bgBlueBright(name.padEnd(30, " ")) + " : " + chalk__WEBPACK_IMPORTED_MODULE_1__["default"].cyanBright(value);
};
let exampleJSon = {
    "name": "test",
    "age": 10,
    "address": {
        "street": "123 Fake Street",
        "city": "London",
        "postcode": "SW1A 1AA"
    }
};
function runTest() {
    console.log("-- test --");
    let sec = lh1("Test Heading 1");
    l(imp("Auto Sec - This is something important"));
    l("Auto Sec - Line 1");
    l("Auto Sec - Line 2");
    l("Auto Sec - Line INFO: " + imp("This is something important"));
    l("Auto Sec - Line WITH ADDITINAL INFO: " + imp("This is something important") + " and this is some additional info");
    l("Auto Sec - Test 2:" + imp("An important value"));
    l("after auto sec Test 3:" + inf("An info value"));
    l("Test 4:" + wrn("An warn value"));
    l("Test 5:" + err("An error value"));
    l("Test 6:" + suc("An success value"));
    l("Test 7:" + hl("An highlight value"));
    l("Test 8:" + hl1("An highlight value"));
    l(nv("Name", "Value"));
    l(nv("Example Name", "http://www.example.com"));
    l(nv("Example Name", "http://www.example.com"));
    sec = sec.lh2("Heading 2");
    sec.l("Test");
    sec.l("Test 2:" + imp("An important value"));
    l("Test 3:" + inf("An info value"));
    l("Test 4:" + wrn("An warn value"));
    l("Test 5:" + err("An error value"));
    l("Test 6:" + suc("An success value"));
    l("Test 7:" + hl("An highlight value"));
    l("Test 8:" + hl1("An highlight value"));
    l(nv("Name", "Value"));
    l(nv("Example Name", "http://www.example.com"));
    l(nv("Example Name", "http://www.example.com"));
    sec = sec.lh3("Head 3");
    l("Test");
    l("Test 2:" + imp("An important value"));
    l("Test 3:" + inf("An info value"));
    l("Test 4:" + wrn("An warn value"));
    l("Test 5:" + err("An error value"));
    l("Test 6:" + suc("An success value"));
    l("Test 7:" + hl("An highlight value"));
    l("Test 8:" + hl1("An highlight value"));
    l(nv("Name", "Value"));
    l(nv("Example Name", "http://www.example.com"));
    l(nv("Example Name", "http://www.example.com"));
    clearSec();
    l("Test Clear Sec");
    l("Test 2:" + imp("An important value"));
    l("Test 3:" + inf("An info value"));
    l("Test 4:" + wrn("An warn value"));
    l("Test 5:" + err("An error value"));
    l("Test 6:" + suc("An success value"));
    l("Test 7:" + hl("An highlight value"));
    l("Test 8:" + hl1("An highlight value"));
    l(nv("Name", "Value"));
    l(nv("Example Name", "http://www.example.com"));
    l(nv("Example Name", "http://www.example.com"));
    l("Test JSON:", exampleJSon);
}
// runTest()
clearSec();
// export {colors};


/***/ }),

/***/ "./src/Common/StackHelper.ts":
/*!***********************************!*\
  !*** ./src/Common/StackHelper.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractCallerFromStack: () => (/* binding */ extractCallerFromStack),
/* harmony export */   extractLineNumberFromStack: () => (/* binding */ extractLineNumberFromStack)
/* harmony export */ });
function extractLineNumberFromStack(stack) {
    if (!stack)
        return null;
    // Extract lines from stack
    const stackLines = stack.split('\n');
    // Find the line with the error (usually the second line)
    const errorLine = stackLines[1] || '';
    // Extract line number from the error line using regex
    const match = errorLine.match(/:(\d+):(\d+)$/);
    return match ? parseInt(match[1]) : null;
}
function extractCallerFromStack(stack) {
    if (!stack)
        return null;
    // Extract lines from stack
    const stackLines = stack.split('\n');
    // Find the line with the caller function (usually the third line)
    const callerLine = stackLines[2] || '';
    // Extract caller function name using regex
    const match = callerLine.match(/at ([\w.<>]+)/);
    return match ? match[1] : null;
}


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
/* harmony export */   executeGetv2: () => (/* binding */ executeGetv2),
/* harmony export */   executePost: () => (/* binding */ executePost),
/* harmony export */   executePut: () => (/* binding */ executePut),
/* harmony export */   getBearerToken: () => (/* binding */ getBearerToken),
/* harmony export */   getCookies: () => (/* binding */ getCookies)
/* harmony export */ });
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Common/Log */ "./src/Common/Log.ts");
/**
 * This file contains the api calls to the backend.
 * utilising the axios library to make the calls.
 * inclusing of webpackIgnore is to allow the webpack to ignore the calls and not try to bundle them.
 */

async function executePost(api, postBody) {
    //return await $ajax.post(/* webpackIgnore: true */ validateApi(api), postBody);
    return (await executeFetch(api, "POST", postBody)).data;
}
// export async function executeGet<T>(api: string) : Promise<T>{
//     return await $ajax.get(/* webpackIgnore: true */ validateApi(api));
// } 
async function executeGet(api) {
    return (await executeFetch(api, "GET", undefined)).data;
}
async function executeGetv2(api) {
    return executeFetch(api, "GET", undefined);
}
async function executePut(api, postBody) {
    //return await $ajax.put(/* webpackIgnore: true */ validateApi(api), postBody);
    return (await executeFetch(api, "PUT", postBody)).data;
}
async function executeDelete(api) {
    //return await $ajax.delete(/* webpackIgnore: true */ validateApi(api));
    return (await executeFetch(api, "DELETE", undefined)).data;
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
    let retValue = {
        data: undefined,
        response: undefined,
        info: {
            success: false,
            error: []
        }
    };
    let url = validateApi(api);
    let fetchHeaders = buildHeaders();
    let response = await fetch(url, {
        method: method,
        headers: fetchHeaders,
        body: data ? JSON.stringify(data) : undefined
    }).then(async (response) => {
        retValue.response = response;
        if (response.ok === false) {
            retValue.info.error.push({
                code: "API_ERROR",
                message: `An error occured while trying to call the API. statusText: ${response.statusText}`,
                userMessage: "An error occured while trying to call the API."
            });
        }
        let data;
        //check if response is JSON
        try {
            if (response.headers.get("content-type")?.includes("application/json")) {
                data = await response.json();
            }
            else {
                data = await response.text();
            }
            retValue.info.success = true;
        }
        catch (e) {
            retValue.info.error.push({
                code: "API_ERROR",
                message: `An error occured while trying to extract the data from the API. Message: ${e?.message || "Unknown"}`,
                userMessage: `An error occured while trying to extract the data from the API.`
            });
        }
        return { data, response };
    }).catch((error) => {
        (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.err)(`Error from API Call ${url}`), error);
        retValue.info.error.push({
            code: "API_ERROR",
            message: error.message,
            userMessage: error.message
        });
        return { data: undefined, response: undefined };
    });
    (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.lh1)(`Response from ${url}`);
    (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)(response);
    retValue.data = response.data;
    if (retValue.info.error.length > 0) {
        retValue.info.success = false;
        retValue.info.error.forEach(e => {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.err)(`Error from API Call ${url}`), e);
        });
    }
    (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.secBackOne)();
    return retValue;
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
/* harmony export */   BaseIDEAspect: () => (/* binding */ BaseIDEAspect),
/* harmony export */   ERROR_DIV_SELECTOR: () => (/* binding */ ERROR_DIV_SELECTOR),
/* harmony export */   FOMR_BUILDER_PATH_STRING: () => (/* binding */ FOMR_BUILDER_PATH_STRING),
/* harmony export */   getFormBuilderFieldPath: () => (/* binding */ getFormBuilderFieldPath)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ObjectHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ObjectHelpers */ "./src/WebBased/IDEAspects/BaseClasses/ObjectHelpers.ts");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Common_EventsHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Common/EventsHelper */ "./src/WebBased/Common/EventsHelper.ts");
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Common/Log */ "./src/Common/Log.ts");
/* harmony import */ var _KOConverter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./KOConverter */ "./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts");






console.log("v: - 5.27");
const FOMR_BUILDER_PATH_STRING = "aspectData.formBuilder.formData";
const ERROR_DIV_SELECTOR = "#render-errors-here";
// abstract class Creator<TConfig> {
//     public abstract FactoryMethod(element: HTMLElement, configuration: IBaseIDEAspectConfiguration<TConfig>, baseModel: any): any;
// }
function getFormBuilderFieldPath(formBuilderField) {
    return `${FOMR_BUILDER_PATH_STRING}.${formBuilderField}`;
}
class BaseIDEAspect {
    constructor(...arr) {
        this.widgetSettings = this.setWidgetJsonSettings();
        this.thisComponentName = this.setThisComponentName();
        this.defaults = this.setDefaults(); //setup the default by calling the abstract method in the child class
        this.errorDivSelector = ERROR_DIV_SELECTOR;
        this.errors = knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray();
        if (arr.length === 0) {
            //This is the base constructor
            return;
        }
        if (arr.length === 3) {
            //This is the constructor that is called by the IDE
            this.uniqueId = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
            this._initialise(arr[0], arr[1], arr[2]);
            this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
            this.fireEvent("onSetup", this.model);
            this.setup();
            this.fireEvent("afterSetup", this.model);
            this.setupLiveConfig();
            this.setupErrorManager();
            this.addAspectLogOutput();
            return;
        }
    }
    _initialise(element, configuration, baseModel) {
        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = configuration;
        this.baseModel = baseModel;
        // this.originalConfiguration
        let baseDefaults = {
            debug: {
                enabled: false,
                logToConsole: false,
                showInAspect: false,
                liveConfig: false
            }
        };
        configuration.debug = $.extend(baseDefaults.debug, configuration.debug);
        // this.originalConfiguration.debug = $.extend(baseDefaults.debug, this.originalConfiguration.debug) as IDebug;
        // configuration.debug = $.extend(baseDefaults, configuration.debug) as IDebug;
        // this.configuration = $.extend(baseDefaults, this.originalConfiguration) as IBaseIDEAspectConfiguration<TConfig>;
        // this.data = undefined;
        // Merge the configuration with the defaults
        this.configuration = $.extend(this.defaults, this.originalConfiguration);
        //create a new model
        this.model = this.configuration._host.model;
        this.enabled = this.model.canEdit;
        this.blade = this.configuration._host.blade;
        this.loaded = this.loaded || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(false);
        // Map the base model properties
        this.sharedoId = this.configuration._host?.model.id;
        if (!this.sharedoId || this.sharedoId()) {
            this.log("No sharedoId found");
        }
        this.sharedoTypeSystemName = this.configuration._host.model.sharedoTypeSystemName;
        if (!this.sharedoTypeSystemName || this.sharedoTypeSystemName()) {
            this.log("No sharedoTypeSystemName found");
        }
        this.options = (0,_KOConverter__WEBPACK_IMPORTED_MODULE_4__.toObservableObject)(this.configuration, this.options);
        // Validation
        this.validation = {};
        this.validationErrorCount = this.validationErrorCount || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(0);
        this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave(); //setup the location to load and save the data from by calling the abstract method in the child class
        this.fireEvent("onInitialise", this.model);
    }
    clearErrors() {
        this.errors?.removeAll();
    }
    setupErrorManager() {
        this.l("Setting up error manager");
        this.errors?.subscribe((newValue) => {
            this.inf("Errors changed", newValue);
            this.buildErrorDiv();
        });
    }
    setupLiveConfig() {
        this.options.debug.subscribe((newValue) => {
            if (newValue.liveConfig) {
                this.activateLiveConfig(newValue.liveConfig);
            }
        });
        this.activateLiveConfig(this.options.debug().liveConfig()); //TODO fix typings
    }
    activateLiveConfig(active) {
        if (!active) {
            this.liveConfigDiv?.remove();
            return;
        }
        if (this.liveConfigDiv) { //leave alone if already active
            return;
        }
        this.l("Setting up live config");
        const serializedData = JSON.stringify(this.configuration, (key, value) => {
            if (key === "_host") {
                return undefined;
            }
            return value;
        }, 4);
        //clone the config
        let config = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(serializedData);
        this.liveConfigData = {
            config: config,
        };
        let timeout = false;
        this.liveConfigDiv = this.createLiveConfigDiv();
        this.element.prepend(this.liveConfigDiv);
        setTimeout(() => {
            config.subscribe((newValue) => {
                // console.log("The new value is " + newValue)
                if (timeout) {
                    return;
                }
                setTimeout(() => {
                    timeout = false;
                    let newConfig = JSON.parse(config());
                    this._initialise(this.element, newConfig, this.baseModel);
                    this.reset(newConfig);
                }, 5000);
                timeout = true;
            });
        }, 3000);
        // ko.applyBindings(this.liveConfigData, this.liveConfigDiv);x
        // }
    }
    createLiveConfigDiv() {
        // Create the outer <div> with class "col-sm-12 formbuilder-editor-json"
        const outerDiv = document.createElement('div');
        outerDiv.className = 'col-sm-12 formbuilder-editor-json';
        // Create the inner <div> with the specified attributes
        const innerDiv = document.createElement('div');
        innerDiv.id = 'liveConfig';
        innerDiv.className = 'form-control textarea';
        innerDiv.style.height = '300px';
        // innerDiv.setAttribute('data-bind', 'syntaxEditor: liveConfigData.config, enable: true, event: { focusout: liveConfigData.onFocusOut }');
        innerDiv.setAttribute('data-bind', 'syntaxEditor: liveConfigData.config');
        // innerDiv.setAttribute('data-bind', 'syntaxEditor: model.config');
        // Append the innerDiv to the outerDiv
        outerDiv.appendChild(innerDiv);
        return outerDiv;
    }
    get data() {
        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to load data from set - this method should be overriden", "red");
            return this._data;
        }
        let nestedData = (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_1__.getNestedProperty)(this.model, this.LocationToSaveOrLoadData);
        this.log("Data found at location", "green", nestedData);
        let retValue = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(nestedData);
        this.log("Data found at location", "green", retValue);
        return retValue;
    }
    buildErrorDiv() {
        this.inf("Building error div");
        let errorDiv = this.element.querySelector(this.errorDivSelector);
        if (!errorDiv || !this.errors || this.errors() || this.errors().length === 0) {
            return;
        }
        (0,_Common_Log__WEBPACK_IMPORTED_MODULE_3__.l)("errorDiv.innerHTML");
        errorDiv.innerHTML = ""; //clean out the div
        let errorContainerDiv = document.createElement("div");
        errorDiv.appendChild(errorContainerDiv);
        errorContainerDiv.className = "ems-error-container";
        let titleDiv = document.createElement("div");
        titleDiv.className = "ems-error-title";
        titleDiv.innerText = "There has been an error:";
        errorContainerDiv.appendChild(titleDiv);
        let foreachDiv = document.createElement("div");
        errorContainerDiv.appendChild(foreachDiv);
        this.errors().forEach((error) => {
            let userMessageDiv = document.createElement("div");
            userMessageDiv.className = "ems-error-user-message";
            userMessageDiv.innerHTML = error.userMessage;
            foreachDiv.appendChild(userMessageDiv);
            if (error.suggestions && error.suggestions.length > 0) {
                let suggestionsDiv = document.createElement("div");
                suggestionsDiv.className = "ems-error-suggestions";
                suggestionsDiv.innerHTML = `<b>Suggestions:</b><br/>${error.suggestions.join("<br/>")}`;
                foreachDiv.appendChild(suggestionsDiv);
            }
            if (error.actions && error.actions.length > 0) {
                let actionsDiv = document.createElement("div");
                actionsDiv.className = "ems-error-actions";
                actionsDiv.innerHTML = `<b>Actions:</b><br/>${error.actions.join("<br/>")}`;
                foreachDiv.appendChild(actionsDiv);
            }
            if (error.internalSuggestions && error.internalSuggestions.length > 0) {
                let internalSuggestionsDiv = document.createElement("div");
                internalSuggestionsDiv.className = "ems-error-internal-suggestions";
                internalSuggestionsDiv.innerHTML = `<b>Internal Suggestions:</b><br/>${error.internalSuggestions.join("<br/>")}`;
                foreachDiv.appendChild(internalSuggestionsDiv);
            }
        });
        if (this.options.debug().supportRequestEnabled) {
            let actionDiv = document.createElement("div");
            actionDiv.className = "ems-error-support-action";
            errorContainerDiv.appendChild(actionDiv);
            let button = document.createElement("button");
            button.className = "btn btn-primary";
            // button.setAttribute("data-bind","click:createSupportTask,visible:options.debug..supportRequestEnabled");
            button.innerText = "Create Support Task";
            actionDiv.appendChild(button);
        }
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
        (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_1__.setNestedProperty)(this.model, this.LocationToSaveOrLoadData, valueToSet);
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
        let currentData = (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_1__.getNestedProperty)(model, this.LocationToSaveOrLoadData);
        if (currentData) {
            this.log(`Current data at location ${this.LocationToSaveOrLoadData} :`, "magenta", currentData);
        }
        if (!currentData) {
            // this.log("Data does not exist, we will create", "orange");
            //  setNestedProperty(model, this.LocationToSaveOrLoadData, {});
            // currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
        }
        this.log(`New data to persist to location ${this.LocationToSaveOrLoadData} :`, "blue", dataToPersist);
        (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_1__.setNestedProperty)(model, this.LocationToSaveOrLoadData, dataToPersist);
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
    canLog() {
        return this.configuration.debug?.enabled;
    }
    logToConsole() {
        return this.canLog() && this.configuration.debug?.logToConsole;
    }
    logToAspect() {
        return this.canLog() && this.configuration.debug?.showInAspect;
    }
    inf(message, ...args) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_3__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_3__.inf)(message), ...args);
        }
    }
    wrn(message, ...args) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_3__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_3__.wrn)(message), ...args);
        }
    }
    err(message, ...args) {
        //get the previous caller
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_3__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_3__.err)(message), ...args);
        }
    }
    nv(name, value) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_3__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_3__.nv)(name, value));
        }
    }
    lh1(message, ...args) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_3__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_3__.lh1)(message), ...args);
        }
    }
    clearSec() {
        (0,_Common_Log__WEBPACK_IMPORTED_MODULE_3__.clearSec)();
    }
    l(message, ...args) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_3__.l)(message, ...args);
        }
        if (this.logToAspect()) {
            let aspectLogOutput = this.aspectLogOutput;
            if (aspectLogOutput) {
                aspectLogOutput.innerText += `${message}\n`;
            }
        }
    }
    addAspectLogOutput() {
        if (!this.logToAspect()) {
            return;
        }
        ;
        this.aspectLogOutput = document.createElement("div");
        let aspectLogOutput = this.aspectLogOutput;
        aspectLogOutput.id = `aspectLogOutput-${this.uniqueId}`;
        aspectLogOutput.style.border = "1px solid black";
        aspectLogOutput.style.padding = "5px";
        aspectLogOutput.style.margin = "5px";
        aspectLogOutput.style.height = "200px";
        aspectLogOutput.style.overflow = "auto";
        aspectLogOutput.style.backgroundColor = "white";
        aspectLogOutput.style.color = "black";
        aspectLogOutput.style.fontSize = "10px";
        aspectLogOutput.style.fontFamily = "monospace";
        aspectLogOutput.style.whiteSpace = "pre-wrap";
        aspectLogOutput.style.wordWrap = "break-word";
        aspectLogOutput.style.display = "none";
        aspectLogOutput.style.position = "relative";
        aspectLogOutput.style.zIndex = "1000";
        aspectLogOutput.style.bottom = "0px";
        aspectLogOutput.style.left = "0px";
        aspectLogOutput.style.right = "0px";
        aspectLogOutput.style.marginLeft = "auto";
        aspectLogOutput.style.marginRight = "auto";
        aspectLogOutput.style.marginBottom = "auto";
        aspectLogOutput.style.marginTop = "auto";
        aspectLogOutput.style.backgroundColor = "rgba(255,255,255,0.8)";
        aspectLogOutput.style.borderRadius = "5px";
        aspectLogOutput.style.padding = "5px";
        aspectLogOutput.style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.75)";
        this.element.prepend(aspectLogOutput);
    }
    fireEvent(eventName, data) {
        let event = {
            eventPath: this.thisComponentName + "." + eventName,
            eventName: eventName,
            source: this,
            data: data
        };
        (0,_Common_EventsHelper__WEBPACK_IMPORTED_MODULE_2__.fireEvent)(event);
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
        return this.ensureFormbuilder(this.blade.model);
        // return this.blade!.model!.aspectData!.formBuilder!.formData;
    }
    /**
     * Ensures there is a form builder in the passed in model and returns it
     * @param model
     * @returns
     */
    ensureFormbuilder(model) {
        if (!model?.aspectData?.formBuilder?.formData) {
            this.log("blade.model.aspectData.formBuilder.formData not found - will create the path", "blue");
        }
        else {
            this.log("blade.model.aspectData.formBuilder.formData found", "green");
        }
        //Ensure the path exists
        model = model || {};
        model.aspectData = model.aspectData || {};
        model.aspectData.formBuilder = model.aspectData.formBuilder || { formData: {} };
        return model.aspectData.formBuilder.formData;
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

/***/ "./src/WebBased/IDEAspects/BaseClasses/IDebug.ts":
/*!*******************************************************!*\
  !*** ./src/WebBased/IDEAspects/BaseClasses/IDebug.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEBUG_DEFAULT: () => (/* binding */ DEBUG_DEFAULT)
/* harmony export */ });
const DEBUG_DEFAULT = {
    enabled: false,
    logToConsole: false,
    showInAspect: false
};


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

function toObservableObject(obj, existing) {
    if (!existing)
        existing = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && key !== "__ko_mapping__" && key !== "_host") {
            const value = obj[key];
            if (Array.isArray(value)) {
                if (!existing[key]) {
                    existing[key] = knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray(value.map(item => toObservableObject(item, {})));
                }
                else {
                    existing[key](value.map(item => toObservableObject(item, {})));
                }
            }
            else if (value !== null && typeof value === 'object') {
                if (!existing[key]) {
                    existing[key] = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(toObservableObject(value, {}));
                }
                else {
                    existing[key](toObservableObject(value, existing[key]()));
                }
            }
            else {
                if (!existing[key]) {
                    existing[key] = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(value);
                }
                else {
                    existing[key](value);
                }
            }
        }
    }
    return existing;
}
// export type I_IDE_Aspect_Modeller_Configuration<TConfig> = TConfig & {
//     debug: IDebug;
//   }
// export type ObservableConfigurationOptions<TConfig> = 
// { [K in keyof IBaseIDEAspectConfiguration<TConfig>]: ko.Observable<IBaseIDEAspectConfiguration<TConfig>[K]>; }
// export interface IConfigurationHost {
//     _host: {
//         blade: Sharedo.Core.Case.Sharedo.AddEditSharedo;
//         enabled: ko.Observable<boolean>; // Using 'any' for return type as it's not clear what these functions return
//         model: Sharedo.Core.Case.Sharedo.Models.Sharedo;
//     }
// }
// export type IBaseIDEAspectConfiguration<TConfig> = IConfigurationHost & I_IDE_Aspect_Modeller_Configuration<TConfig>;
// interface RootObject {
//   l1: string;
//   o1: O1;
// }
// interface O1 {
//   l2: string;
//   o2: O2;
//   a1: A1[];
// }
// interface A1 {
//   l4: string;
// }
// interface O2 {
//   l3: string;
// }
// // Now let's use the function:
// const x: I_IDE_Aspect_Modeller_Configuration<RootObject> = {
//     l1: "l1",
//     o1: {
//         l2:"l2",
//         o2: {
//             l3: "l3",
//         },
//         a1: [
//             { l4: "l4" }
//         ]
//     },
//     debug:
//     {
//         enabled: false,
//         logToConsole: false,
//         showInAspect: false
//     }
// }
// let m :  NestedObservableObject<I_IDE_Aspect_Modeller_Configuration<RootObject>>
// let y = toObservableObject(x,{} as any) as  NestedObservableObject<I_IDE_Aspect_Modeller_Configuration<RootObject>>
// let p = y.debug().liveConfig!()
// export function toObservableObject(obj: any, existingObservables?:ko.Observable<any>): ko.Observable {
//     const result = existingObservables || {} as ko.Observable;
//     for (const key in obj) {
//         if(key === "__ko_mapping__") continue;
//         if(key === "_host") continue;
//         if (Object.prototype.hasOwnProperty.call(obj, key)) {
//             let newv = obj[key];
//             let curr = (result as any)[key] ;
//             if (!Array.isArray(newv) && typeof newv === "object" && newv !== null && !ko.isObservable(newv)) {
//                 (result as any)[key] = toObservableObject(newv as object) 
//                 console.log("toObservableObject", (result as any)[key]);
//                 (result as any)[key] = ko.observable((result as any)[key]);
//                 continue;
//             }
//             if (Array.isArray(newv)) {
//                 if (curr && ko.isObservableArray(curr)) {
//                     (result as any)[key](newv);
//                 } else {
//                     (result as any)[key] = ko.observableArray(newv) as any;
//                 }
//                 continue;
//             }
//             if (ko.isObservable(newv)) {
//                 newv = newv(); // pull out the value
//             }
//             if (curr && ko.isObservable(curr)) {
//                 (result as any)[key](newv); // update the existing observable
//             } else {
//                 (result as any)[key] = ko.observable(newv);
//             }
//         }
//     }
//     return result;
// }


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
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Common/Log */ "./src/Common/Log.ts");

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
    (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.inf)(`getNestedProperty(${propertyPath})`), obj);
    const properties = propertyPath.split('.');
    let current = obj;
    for (const prop of properties) {
        // Check if the property has an array index, e.g., "data[0]"
        const matches = prop.match(/^([a-zA-Z0-9_]+)\[([0-9]+)\]$/);
        if (matches) {
            const arrayProp = matches[1];
            const index = parseInt(matches[2], 10);
            if (!Array.isArray(current[arrayProp]) || current[arrayProp][index] === undefined) {
                (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.err)(`getNestedProperty(${propertyPath}): arrayProp or index is undefined`), obj);
                return undefined;
            }
            current = current[arrayProp][index];
        }
        else if (current[prop] === undefined) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.err)(`getNestedProperty(${propertyPath}): prop is undefined`), obj);
            return undefined;
        }
        else {
            current = current[prop];
        }
    }
    return current;
}


/***/ }),

/***/ "./src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspectConfig.ts":
/*!******************************************************************************!*\
  !*** ./src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspectConfig.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Default: () => (/* binding */ Default),
/* harmony export */   WidgetSettings: () => (/* binding */ WidgetSettings)
/* harmony export */ });
/* harmony import */ var _BaseClasses_IDebug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseClasses/IDebug */ "./src/WebBased/IDEAspects/BaseClasses/IDebug.ts");

const Default = {
    fieldPath: "Title",
    title: "Title Value",
    calculatedValue: "",
    calculatedTitle: "",
    valueOnNotFound: "Not Found",
    searchParents: false,
    maxDepth: 0,
    formatter: "value",
    debug: _BaseClasses_IDebug__WEBPACK_IMPORTED_MODULE_0__.DEBUG_DEFAULT,
    eventsToReactTo: [
        {
            eventPath: "sharedo.core.case.phase-changed",
            methodToCall: "loadAndBind"
        },
        {
            eventPath: "sharedo.core.case.forms.phase.phase-changed",
            methodToCall: "loadAndBind"
        },
        {
            eventPath: "sharedo.updated",
            methodToCall: "loadAndBind"
        },
        {
            eventPath: "sharedo.core.case.sharedo-updated",
            methodToCall: "loadAndBind"
        }
    ]
};
const WidgetSettings = {
    type: "widget",
    "priority": 6000,
    "designer": {
        "allowInPortalDesigner": false,
        "allowInSharedoPortalDesigner": false,
        "allowAspectAdapter": true,
        "title": "Single Value Aspect",
        "icon": "fa-cog",
        "description": "Single Value Aspect",
        "categories": [],
        "isConfigurable": true,
        "configurationWidget": null,
        "defaultConfigurationJson": Default
    },
    "scripts": [],
    "styles": [
        "SingleValueAspect.css"
    ],
    "templates": [
        "SingleValueAspect.html"
    ],
    "menuTemplates": [],
    "components": []
};


/***/ }),

/***/ "./src/helpers/Formatter.ts":
/*!**********************************!*\
  !*** ./src/helpers/Formatter.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatFunc: () => (/* binding */ formatFunc),
/* harmony export */   formatValue: () => (/* binding */ formatValue)
/* harmony export */ });
/**
 * * Format a value using a formatter string
 * * Examples:
 * * 1. value
 * * 2. value.toUpperCase()
 * * 3. value ? value.toUpperCase() : ""
 * * 4. value ? value.toUpperCase() : "No Value"
 * * 5. new Date(value).toLocaleDateString()
 * * 6. value ? new Date(value).toLocaleDateString() : ""
 * @param value
 * @param formatter
 * @returns
 */
function formatValue(value, formatter) {
    // Create a new function based on the formatter
    const dynamicFunc = new Function('value', `return (${formatter});`);
    // Invoke the function with the given value
    let returnValue;
    try {
        returnValue = dynamicFunc(value);
    }
    catch (e) {
        console.log(`Error formatting value [${value}] with formatter [${formatter}]`, e);
        returnValue = "Error formatting value - see console";
    }
    return returnValue;
}
const formatFunc = formatValue; // For backwards compatibility


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

/***/ }),

/***/ "./node_modules/chalk/source/index.js":
/*!********************************************!*\
  !*** ./node_modules/chalk/source/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Chalk: () => (/* binding */ Chalk),
/* harmony export */   backgroundColorNames: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.backgroundColorNames),
/* harmony export */   backgroundColors: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.backgroundColorNames),
/* harmony export */   chalkStderr: () => (/* binding */ chalkStderr),
/* harmony export */   colorNames: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.colorNames),
/* harmony export */   colors: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.colorNames),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   foregroundColorNames: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.foregroundColorNames),
/* harmony export */   foregroundColors: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.foregroundColorNames),
/* harmony export */   modifierNames: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.modifierNames),
/* harmony export */   modifiers: () => (/* reexport safe */ _ansi_styles__WEBPACK_IMPORTED_MODULE_1__.modifierNames),
/* harmony export */   supportsColor: () => (/* binding */ stdoutColor),
/* harmony export */   supportsColorStderr: () => (/* binding */ stderrColor)
/* harmony export */ });
/* harmony import */ var _ansi_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor/ansi-styles/index.js */ "./node_modules/chalk/source/vendor/ansi-styles/index.js");
/* harmony import */ var _supports_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #supports-color */ "./node_modules/chalk/source/vendor/supports-color/browser.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities.js */ "./node_modules/chalk/source/utilities.js");




const {stdout: stdoutColor, stderr: stderrColor} = _supports_color__WEBPACK_IMPORTED_MODULE_0__["default"];

const GENERATOR = Symbol('GENERATOR');
const STYLER = Symbol('STYLER');
const IS_EMPTY = Symbol('IS_EMPTY');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = [
	'ansi',
	'ansi',
	'ansi256',
	'ansi16m',
];

const styles = Object.create(null);

const applyOptions = (object, options = {}) => {
	if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
		throw new Error('The `level` option should be an integer from 0 to 3');
	}

	// Detect level if not set manually
	const colorLevel = stdoutColor ? stdoutColor.level : 0;
	object.level = options.level === undefined ? colorLevel : options.level;
};

class Chalk {
	constructor(options) {
		// eslint-disable-next-line no-constructor-return
		return chalkFactory(options);
	}
}

const chalkFactory = options => {
	const chalk = (...strings) => strings.join(' ');
	applyOptions(chalk, options);

	Object.setPrototypeOf(chalk, createChalk.prototype);

	return chalk;
};

function createChalk(options) {
	return chalkFactory(options);
}

Object.setPrototypeOf(createChalk.prototype, Function.prototype);

for (const [styleName, style] of Object.entries(_ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"])) {
	styles[styleName] = {
		get() {
			const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
			Object.defineProperty(this, styleName, {value: builder});
			return builder;
		},
	};
}

styles.visible = {
	get() {
		const builder = createBuilder(this, this[STYLER], true);
		Object.defineProperty(this, 'visible', {value: builder});
		return builder;
	},
};

const getModelAnsi = (model, level, type, ...arguments_) => {
	if (model === 'rgb') {
		if (level === 'ansi16m') {
			return _ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"][type].ansi16m(...arguments_);
		}

		if (level === 'ansi256') {
			return _ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"][type].ansi256(_ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"].rgbToAnsi256(...arguments_));
		}

		return _ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"][type].ansi(_ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"].rgbToAnsi(...arguments_));
	}

	if (model === 'hex') {
		return getModelAnsi('rgb', level, type, ..._ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"].hexToRgb(...arguments_));
	}

	return _ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"][type][model](...arguments_);
};

const usedModels = ['rgb', 'hex', 'ansi256'];

for (const model of usedModels) {
	styles[model] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(getModelAnsi(model, levelMapping[level], 'color', ...arguments_), _ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"].color.close, this[STYLER]);
				return createBuilder(this, styler, this[IS_EMPTY]);
			};
		},
	};

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(getModelAnsi(model, levelMapping[level], 'bgColor', ...arguments_), _ansi_styles__WEBPACK_IMPORTED_MODULE_1__["default"].bgColor.close, this[STYLER]);
				return createBuilder(this, styler, this[IS_EMPTY]);
			};
		},
	};
}

const proto = Object.defineProperties(() => {}, {
	...styles,
	level: {
		enumerable: true,
		get() {
			return this[GENERATOR].level;
		},
		set(level) {
			this[GENERATOR].level = level;
		},
	},
});

const createStyler = (open, close, parent) => {
	let openAll;
	let closeAll;
	if (parent === undefined) {
		openAll = open;
		closeAll = close;
	} else {
		openAll = parent.openAll + open;
		closeAll = close + parent.closeAll;
	}

	return {
		open,
		close,
		openAll,
		closeAll,
		parent,
	};
};

const createBuilder = (self, _styler, _isEmpty) => {
	// Single argument is hot path, implicit coercion is faster than anything
	// eslint-disable-next-line no-implicit-coercion
	const builder = (...arguments_) => applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));

	// We alter the prototype because we must return a function, but there is
	// no way to create a function with a different prototype
	Object.setPrototypeOf(builder, proto);

	builder[GENERATOR] = self;
	builder[STYLER] = _styler;
	builder[IS_EMPTY] = _isEmpty;

	return builder;
};

const applyStyle = (self, string) => {
	if (self.level <= 0 || !string) {
		return self[IS_EMPTY] ? '' : string;
	}

	let styler = self[STYLER];

	if (styler === undefined) {
		return string;
	}

	const {openAll, closeAll} = styler;
	if (string.includes('\u001B')) {
		while (styler !== undefined) {
			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			string = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_2__.stringReplaceAll)(string, styler.close, styler.open);

			styler = styler.parent;
		}
	}

	// We can move both next actions out of loop, because remaining actions in loop won't have
	// any/visible effect on parts we add here. Close the styling before a linebreak and reopen
	// after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
	const lfIndex = string.indexOf('\n');
	if (lfIndex !== -1) {
		string = (0,_utilities_js__WEBPACK_IMPORTED_MODULE_2__.stringEncaseCRLFWithFirstIndex)(string, closeAll, openAll, lfIndex);
	}

	return openAll + string + closeAll;
};

Object.defineProperties(createChalk.prototype, styles);

const chalk = createChalk();
const chalkStderr = createChalk({level: stderrColor ? stderrColor.level : 0});





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chalk);


/***/ }),

/***/ "./node_modules/chalk/source/utilities.js":
/*!************************************************!*\
  !*** ./node_modules/chalk/source/utilities.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stringEncaseCRLFWithFirstIndex: () => (/* binding */ stringEncaseCRLFWithFirstIndex),
/* harmony export */   stringReplaceAll: () => (/* binding */ stringReplaceAll)
/* harmony export */ });
// TODO: When targeting Node.js 16, use `String.prototype.replaceAll`.
function stringReplaceAll(string, substring, replacer) {
	let index = string.indexOf(substring);
	if (index === -1) {
		return string;
	}

	const substringLength = substring.length;
	let endIndex = 0;
	let returnValue = '';
	do {
		returnValue += string.slice(endIndex, index) + substring + replacer;
		endIndex = index + substringLength;
		index = string.indexOf(substring, endIndex);
	} while (index !== -1);

	returnValue += string.slice(endIndex);
	return returnValue;
}

function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
	let endIndex = 0;
	let returnValue = '';
	do {
		const gotCR = string[index - 1] === '\r';
		returnValue += string.slice(endIndex, (gotCR ? index - 1 : index)) + prefix + (gotCR ? '\r\n' : '\n') + postfix;
		endIndex = index + 1;
		index = string.indexOf('\n', endIndex);
	} while (index !== -1);

	returnValue += string.slice(endIndex);
	return returnValue;
}


/***/ }),

/***/ "./node_modules/chalk/source/vendor/ansi-styles/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/chalk/source/vendor/ansi-styles/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   backgroundColorNames: () => (/* binding */ backgroundColorNames),
/* harmony export */   colorNames: () => (/* binding */ colorNames),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   foregroundColorNames: () => (/* binding */ foregroundColorNames),
/* harmony export */   modifierNames: () => (/* binding */ modifierNames)
/* harmony export */ });
const ANSI_BACKGROUND_OFFSET = 10;

const wrapAnsi16 = (offset = 0) => code => `\u001B[${code + offset}m`;

const wrapAnsi256 = (offset = 0) => code => `\u001B[${38 + offset};5;${code}m`;

const wrapAnsi16m = (offset = 0) => (red, green, blue) => `\u001B[${38 + offset};2;${red};${green};${blue}m`;

const styles = {
	modifier: {
		reset: [0, 0],
		// 21 isn't widely supported and 22 does the same thing
		bold: [1, 22],
		dim: [2, 22],
		italic: [3, 23],
		underline: [4, 24],
		overline: [53, 55],
		inverse: [7, 27],
		hidden: [8, 28],
		strikethrough: [9, 29],
	},
	color: {
		black: [30, 39],
		red: [31, 39],
		green: [32, 39],
		yellow: [33, 39],
		blue: [34, 39],
		magenta: [35, 39],
		cyan: [36, 39],
		white: [37, 39],

		// Bright color
		blackBright: [90, 39],
		gray: [90, 39], // Alias of `blackBright`
		grey: [90, 39], // Alias of `blackBright`
		redBright: [91, 39],
		greenBright: [92, 39],
		yellowBright: [93, 39],
		blueBright: [94, 39],
		magentaBright: [95, 39],
		cyanBright: [96, 39],
		whiteBright: [97, 39],
	},
	bgColor: {
		bgBlack: [40, 49],
		bgRed: [41, 49],
		bgGreen: [42, 49],
		bgYellow: [43, 49],
		bgBlue: [44, 49],
		bgMagenta: [45, 49],
		bgCyan: [46, 49],
		bgWhite: [47, 49],

		// Bright color
		bgBlackBright: [100, 49],
		bgGray: [100, 49], // Alias of `bgBlackBright`
		bgGrey: [100, 49], // Alias of `bgBlackBright`
		bgRedBright: [101, 49],
		bgGreenBright: [102, 49],
		bgYellowBright: [103, 49],
		bgBlueBright: [104, 49],
		bgMagentaBright: [105, 49],
		bgCyanBright: [106, 49],
		bgWhiteBright: [107, 49],
	},
};

const modifierNames = Object.keys(styles.modifier);
const foregroundColorNames = Object.keys(styles.color);
const backgroundColorNames = Object.keys(styles.bgColor);
const colorNames = [...foregroundColorNames, ...backgroundColorNames];

function assembleStyles() {
	const codes = new Map();

	for (const [groupName, group] of Object.entries(styles)) {
		for (const [styleName, style] of Object.entries(group)) {
			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`,
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false,
		});
	}

	Object.defineProperty(styles, 'codes', {
		value: codes,
		enumerable: false,
	});

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = wrapAnsi16();
	styles.color.ansi256 = wrapAnsi256();
	styles.color.ansi16m = wrapAnsi16m();
	styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
	styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
	styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);

	// From https://github.com/Qix-/color-convert/blob/3f0e0d4e92e235796ccb17f6e85c72094a651f49/conversions.js
	Object.defineProperties(styles, {
		rgbToAnsi256: {
			value(red, green, blue) {
				// We use the extended greyscale palette here, with the exception of
				// black and white. normal palette only has 4 greyscale shades.
				if (red === green && green === blue) {
					if (red < 8) {
						return 16;
					}

					if (red > 248) {
						return 231;
					}

					return Math.round(((red - 8) / 247) * 24) + 232;
				}

				return 16
					+ (36 * Math.round(red / 255 * 5))
					+ (6 * Math.round(green / 255 * 5))
					+ Math.round(blue / 255 * 5);
			},
			enumerable: false,
		},
		hexToRgb: {
			value(hex) {
				const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
				if (!matches) {
					return [0, 0, 0];
				}

				let [colorString] = matches;

				if (colorString.length === 3) {
					colorString = [...colorString].map(character => character + character).join('');
				}

				const integer = Number.parseInt(colorString, 16);

				return [
					/* eslint-disable no-bitwise */
					(integer >> 16) & 0xFF,
					(integer >> 8) & 0xFF,
					integer & 0xFF,
					/* eslint-enable no-bitwise */
				];
			},
			enumerable: false,
		},
		hexToAnsi256: {
			value: hex => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
			enumerable: false,
		},
		ansi256ToAnsi: {
			value(code) {
				if (code < 8) {
					return 30 + code;
				}

				if (code < 16) {
					return 90 + (code - 8);
				}

				let red;
				let green;
				let blue;

				if (code >= 232) {
					red = (((code - 232) * 10) + 8) / 255;
					green = red;
					blue = red;
				} else {
					code -= 16;

					const remainder = code % 36;

					red = Math.floor(code / 36) / 5;
					green = Math.floor(remainder / 6) / 5;
					blue = (remainder % 6) / 5;
				}

				const value = Math.max(red, green, blue) * 2;

				if (value === 0) {
					return 30;
				}

				// eslint-disable-next-line no-bitwise
				let result = 30 + ((Math.round(blue) << 2) | (Math.round(green) << 1) | Math.round(red));

				if (value === 2) {
					result += 60;
				}

				return result;
			},
			enumerable: false,
		},
		rgbToAnsi: {
			value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
			enumerable: false,
		},
		hexToAnsi: {
			value: hex => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
			enumerable: false,
		},
	});

	return styles;
}

const ansiStyles = assembleStyles();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ansiStyles);


/***/ }),

/***/ "./node_modules/chalk/source/vendor/supports-color/browser.js":
/*!********************************************************************!*\
  !*** ./node_modules/chalk/source/vendor/supports-color/browser.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-env browser */

const level = (() => {
	if (navigator.userAgentData) {
		const brand = navigator.userAgentData.brands.find(({brand}) => brand === 'Chromium');
		if (brand && brand.version > 93) {
			return 3;
		}
	}

	if (/\b(Chrome|Chromium)\//.test(navigator.userAgent)) {
		return 1;
	}

	return 0;
})();

const colorSupport = level !== 0 && {
	level,
	hasBasic: true,
	has256: level >= 2,
	has16m: level >= 3,
};

const supportsColor = {
	stdout: colorSupport,
	stderr: colorSupport,
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (supportsColor);


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
/* harmony import */ var _helpers_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/Formatter */ "./src/helpers/Formatter.ts");
/* harmony import */ var _Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/api/searchForAttributeWithParents */ "./src/WebBased/Common/api/searchForAttributeWithParents.ts");
/* harmony import */ var _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BaseClasses/BaseIDEAspect */ "./src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts");
/* harmony import */ var _SingleValueAspectConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SingleValueAspectConfig */ "./src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspectConfig.ts");




let thisWidgetSystemName = "SingleValueAspect";
class SingleValueAspect extends _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_2__.BaseIDEAspect {
    refresh(newConfig) {
        //nothing
    }
    reset(newConfig) {
        //nothing
    }
    setThisComponentName() {
        return "SingleValueAspect";
    }
    setWidgetJsonSettings() {
        return _SingleValueAspectConfig__WEBPACK_IMPORTED_MODULE_3__.WidgetSettings;
    }
    setDefaults() {
        return _SingleValueAspectConfig__WEBPACK_IMPORTED_MODULE_3__.Default;
    }
    // constructor(element: HTMLElement, configuration: ISingleValueAspectConfiguration, baseModel: any) {
    //     super("SingleValueAspect", "aspectData.odsEntityPicker", element, configuration, baseModel)
    //     this.setup();
    // }
    setLocationOfDataToLoadAndSave() {
        return undefined;
    }
    // private initialise() {//! Note: UI framework looks for this method name and if found behaves differently and wont call loadAndBind
    setup() {
        this.data = {
            value: "",
            title: this.options.title() || "Title Value"
        };
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
        (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_1__.searchForAttributeRecursive)(this.sharedoId(), this.options.fieldPath(), this.options.searchParents(), this.options.maxDepth()).then((data) => {
            if (!data || data.found == false) {
                this.log("No data returned", "red");
                this.options.calculatedValue(this.options.valueOnNotFound() || "");
            }
            else {
                let formattedValue = (0,_helpers_Formatter__WEBPACK_IMPORTED_MODULE_0__.formatValue)(data.value, this.options.formatter() || "value");
                this.options.calculatedValue(formattedValue || "");
            }
        });
    }
    ;
    onSave(model) {
        this.log("No Save Implemented", "green");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVELHNHQUEyQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBQyxFQUFFO1lBRTFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEVBQ2hDO2dCQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDdEU7aUJBRUQ7Z0JBQ0ksSUFBSSxjQUFjLEdBQUcsK0RBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUM7Z0JBQ2xGLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN0RDtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUFBLENBQUM7SUFFTyxNQUFNLENBQUMsS0FBVTtRQUV0QixJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLHVCQUF1QjtJQUUzQixDQUFDO0lBQUEsQ0FBQztDQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9Db21tb24vTG9nLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvQ29tbW9uL1N0YWNrSGVscGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL0V2ZW50c0hlbHBlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvYXBpLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL2FwaS9leGVjdXRlRmluZEJ5UXVlcnkvRmluZEJ5UXVlcnkudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9Db21tb24vYXBpL3NlYXJjaEZvckF0dHJpYnV0ZVdpdGhQYXJlbnRzLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9CYXNlSURFQXNwZWN0LnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9JRGVidWcudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0tPQ29udmVydGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9PYmplY3RIZWxwZXJzLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9TaW5nbGVWYWx1ZUFzcGVjdC9TaW5nbGVWYWx1ZUFzcGVjdENvbmZpZy50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL2hlbHBlcnMvRm9ybWF0dGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvZXh0ZXJuYWwgdmFyIFwia29cIiIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvdmVuZG9yL2Fuc2ktc3R5bGVzL2luZGV4LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL3ZlbmRvci9zdXBwb3J0cy1jb2xvci9icm93c2VyLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9TaW5nbGVWYWx1ZUFzcGVjdC9TaW5nbGVWYWx1ZUFzcGVjdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGssIHsgQ2hhbGtJbnN0YW5jZSB9IGZyb20gJ2NoYWxrJztcbmltcG9ydCB7IGV4dHJhY3RDYWxsZXJGcm9tU3RhY2ssIGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrIH0gZnJvbSAnLi9TdGFja0hlbHBlcic7XG5cbmNoYWxrLmxldmVsID0gMztcbmxldCBkZWZhdWx0TW9kZTogQ2hhbGtJbnN0YW5jZSA9IGNoYWxrLnJlc2V0O1xuXG5cbmxldCBsYXN0U2VjOiBTZWN0aW9uIHwgdW5kZWZpbmVkO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlYygpIHtcblxuICAgIC8vIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKXtcbiAgICAvLyBjb25zb2xlLmdyb3VwRW5kKClcbiAgICAvLyB9XG5cbiAgICBpZiAobGFzdFNlYz8uZ3JvdXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXN0U2VjPy5ncm91cDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGFzdFNlYyA9IG5ldyBTZWN0aW9uKFwiUm9vdFwiLCBkZWZhdWx0TW9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWNCYWNrT25lKCkge1xuICAgIGxhc3RTZWMgPSBsYXN0U2VjPy5wYXJlbnQ7XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xufVxuXG5leHBvcnQgY2xhc3MgU2VjdGlvbiB7XG4gICAgc2VjdGlvbk5hbWU6IHN0cmluZztcbiAgICBwYXJlbnQ6IFNlY3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgYzogQ2hhbGtJbnN0YW5jZVxuICAgIGluZGVudCA9IDA7XG4gICAgaW5kZW50UGFkID0gXCJcIjtcbiAgICBncm91cDogbnVtYmVyID0gMDtcbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uTmFtZTogc3RyaW5nLCBjOiBDaGFsa0luc3RhbmNlLCBzZWN0aW9uPzogU2VjdGlvbikge1xuICAgICAgICB0aGlzLmMgPSBjO1xuICAgICAgICB0aGlzLnNlY3Rpb25OYW1lID0gc2VjdGlvbk5hbWU7XG4gICAgICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmluZGVudCA9IHNlY3Rpb24uaW5kZW50ICsgMTtcbiAgICAgICAgICAgIHRoaXMuaW5kZW50UGFkID0gXCItXCIucmVwZWF0KHRoaXMuaW5kZW50ICogMikgKyBcIiBcIjtcbiAgICAgICAgfVxuICAgICAgICBsYXN0U2VjID0gdGhpcztcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBzZWN0aW9uO1xuICAgIH1cbiAgICBsb2coLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc29sZS5sb2coZGVmYXVsdE1vZGUoYXJncykpO1xuICAgIH1cbiAgICBsaDEoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDEodGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsaDIoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDIodGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsaDMoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDModGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiBsKHRoaXMsIC4uLmFyZ3MpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGwoLi4uYXJnczogYW55W10pIHtcblxuICAgIGxldCBzZWM6IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjO1xuICAgIGxldCBmaXJzdEFyZzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGxldCBmaXJzdEFyZ01vZGlmZWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgICBpZiAoYXJnIGluc3RhbmNlb2YgU2VjdGlvbikge1xuICAgICAgICAgICAgc2VjID0gYXJnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZmlyc3RBcmcgJiYgYXJnLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiU3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGZpcnN0QXJnID0gYXJncy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vcmVtb3ZlZCBTZWN0aW9uIGZyb20gYXJnc1xuICAgIGFyZ3MgPSBhcmdzLmZpbHRlcigoYXJnKSA9PiB7XG4gICAgICAgIHJldHVybiAhKGFyZyBpbnN0YW5jZW9mIFNlY3Rpb24pO1xuICAgIH0pXG5cblxuICAgIC8vIGxldCBjID0gc2VjPy5jIHx8IG1vZGU7XG4gICAgbGV0IGMgPSBkZWZhdWx0TW9kZTtcbiAgICBsZXQgaW5kZW50UGFkID0gc2VjPy5pbmRlbnRQYWQgfHwgXCJcIjtcblxuICAgIGlmICghZmlyc3RBcmcpIHtcbiAgICAgICAgZmlyc3RBcmcgPSBcIlwiO1xuICAgIH1cbiAgICBmaXJzdEFyZ01vZGlmZWQgPSBmaXJzdEFyZztcblxuICAgIGZpcnN0QXJnTW9kaWZlZCA9IGluZGVudFBhZCArIGZpcnN0QXJnO1xuICAgIC8vcmVtb3ZlIGNvbG9yIGZvcm1hdHRpbmcgZnJvbSBmaXJzdCBhcmdcbiAgICBsZXQgdG90TGVuID0gZmlyc3RBcmdNb2RpZmVkLmxlbmd0aCAtIGZpcnN0QXJnTW9kaWZlZC5yZXBsYWNlKC9cXHUwMDFiXFxbLio/bS9nLCAnJykubGVuZ3RoIC0gMjtcblxuXG4gICAgY29uc29sZS5sb2coZmlyc3RBcmdNb2RpZmVkKTtcblxuICAgIC8vcmVtb3ZlZCBTZWN0aW9uIGZyb20gYXJnc1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYXJnKTtcbiAgICB9KVxuXG5cbn1cblxuXG5cbmZ1bmN0aW9uIGxvZ0hlYWRpbmdTZWN0aW9uKGM6IENoYWxrSW5zdGFuY2UsIGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbj86IFNlY3Rpb24pIHtcblxuICAgIGxldCBzZWMgPSBuZXcgU2VjdGlvbihoZWFkaW5nLCBjLCBzZWN0aW9uKTtcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKERhdGUubm93KCkpLnRvTG9jYWxlU3RyaW5nKCk7XG5cbiAgICBsZXQgcGF0aCA9IFwiXCI7XG4gICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgcGF0aCA9IHNlY3Rpb24uc2VjdGlvbk5hbWU7XG4gICAgICAgIHdoaWxlIChzZWN0aW9uLnBhcmVudCkge1xuICAgICAgICAgICAgc2VjdGlvbiA9IHNlY3Rpb24ucGFyZW50O1xuICAgICAgICAgICAgcGF0aCA9IHNlY3Rpb24uc2VjdGlvbk5hbWUgKyBcIiAtPiBcIiArIHBhdGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2FkZCBhZGQgaGVhZGluZyB0byBlbmQgb2YgcGF0aCBhbmQgb25seSBhZGQgLT4gaWYgcGF0aCBpcyBub3QgZW1wdHlcbiAgICBpZiAocGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBhdGggKz0gXCIgLT4gXCI7XG4gICAgfVxuICAgIHBhdGggKz0gaGVhZGluZztcblxuXG5cbiAgICAvL3Bvc2l0aW9uIHRoZSBoZWFkaW5nIGluIHRoZSBtaWRkbGUgb2YgdGhlIHNjcmVlblxuICAgIC8vIGNvbnNvbGUubG9nKGMoaGVhZGluZy5wYWRTdGFydCgoY3dpZHRoIC8gMikgKyAoaGVhZGluZy5sZW5ndGggLyAyKSwgXCIgXCIpLnBhZEVuZChjd2lkdGgsIFwiIFwiKSkpO1xuICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoYyhwYXRoKSk7XG4gICAgc2VjLmdyb3VwKys7XG5cbiAgICByZXR1cm4gc2VjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGgxKGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWMpIHtcbiAgICBsZXQgYyA9IGNoYWxrLmJnQmxhY2suZ3JlZW5CcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaDIoaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYykge1xuICAgIGxldCBjID0gY2hhbGsuYmdHcmF5LmN5YW5CcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaDMoaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYykge1xuICAgIGxldCBjID0gY2hhbGsuYmdHcmF5Lm1hZ2VudGFCcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cblxuZXhwb3J0IGNvbnN0IGxoID0gbGgxO1xuXG5cbmV4cG9ydCBjb25zdCBpbXAgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay5yZWQuYm9sZC5iZ0JsYWNrO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgaW5mID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsuYmx1ZS5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3Qgd3JuID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsueWVsbG93LmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59IFxuXG5leHBvcnQgY29uc3QgZXJyID0gKHRleHQ6IHN0cmluZykgPT4ge1xuXG4gICAgbGV0IGVyID0gKG5ldyBFcnJvcigpKTtcbiAgICBsZXQgbGluZU5vID0gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soZXIuc3RhY2spO1xuICAgIGxldCBjYWxsZXIgPSBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrKGVyLnN0YWNrKTtcblxuICAgIGxldCBwcmVUZXh0ID0gYFske2NhbGxlcn06JHtsaW5lTm99XWA7XG5cbiAgICB0ZXh0ID0gcHJlVGV4dCArIFwiIFwiICsgdGV4dDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhlcik7XG5cbiAgICBsZXQgYyA9IGNoYWxrLnJlZC5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3Qgc3VjID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsuZ3JlZW4uYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGhsID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ0JsdWUodGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBobDEgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGNoYWxrLmJnTWFnZW50YSh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IG52ID0gKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ0JsdWVCcmlnaHQobmFtZS5wYWRFbmQoMzAsIFwiIFwiKSkgKyBcIiA6IFwiICsgY2hhbGsuY3lhbkJyaWdodCh2YWx1ZSk7XG59XG5cbiBcbmxldCBleGFtcGxlSlNvbiA9XG57XG4gICAgXCJuYW1lXCI6IFwidGVzdFwiLFxuICAgIFwiYWdlXCI6IDEwLFxuICAgIFwiYWRkcmVzc1wiOiB7XG4gICAgICAgIFwic3RyZWV0XCI6IFwiMTIzIEZha2UgU3RyZWV0XCIsXG4gICAgICAgIFwiY2l0eVwiOiBcIkxvbmRvblwiLFxuICAgICAgICBcInBvc3Rjb2RlXCI6IFwiU1cxQSAxQUFcIlxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blRlc3QoKSB7XG5cblxuICAgIGNvbnNvbGUubG9nKFwiLS0gdGVzdCAtLVwiKVxuXG4gICAgbGV0IHNlYyA9IGxoMShcIlRlc3QgSGVhZGluZyAxXCIpXG4gICAgbChpbXAoXCJBdXRvIFNlYyAtIFRoaXMgaXMgc29tZXRoaW5nIGltcG9ydGFudFwiKSlcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIDFcIilcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIDJcIilcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIElORk86IFwiICsgaW1wKFwiVGhpcyBpcyBzb21ldGhpbmcgaW1wb3J0YW50XCIpKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgV0lUSCBBRERJVElOQUwgSU5GTzogXCIgKyBpbXAoXCJUaGlzIGlzIHNvbWV0aGluZyBpbXBvcnRhbnRcIikgKyBcIiBhbmQgdGhpcyBpcyBzb21lIGFkZGl0aW9uYWwgaW5mb1wiKVxuICAgIGwoXCJBdXRvIFNlYyAtIFRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiYWZ0ZXIgYXV0byBzZWMgVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuICAgIHNlYyA9IHNlYy5saDIoXCJIZWFkaW5nIDJcIilcbiAgICBzZWMubChcIlRlc3RcIilcbiAgICBzZWMubChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuXG4gICAgc2VjID0gc2VjLmxoMyhcIkhlYWQgM1wiKVxuICAgIGwoXCJUZXN0XCIpXG4gICAgbChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuICAgIGNsZWFyU2VjKCk7XG4gICAgbChcIlRlc3QgQ2xlYXIgU2VjXCIpXG4gICAgbChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuXG5cbiAgICBsKFwiVGVzdCBKU09OOlwiLCBleGFtcGxlSlNvbik7XG5cbn1cblxuLy8gcnVuVGVzdCgpXG5jbGVhclNlYygpO1xuXG4vLyBleHBvcnQge2NvbG9yc307XG4iLCJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0TGluZU51bWJlckZyb21TdGFjayhzdGFjazogc3RyaW5nIHwgdW5kZWZpbmVkKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgaWYgKCFzdGFjaykgcmV0dXJuIG51bGw7XG4gICAgLy8gRXh0cmFjdCBsaW5lcyBmcm9tIHN0YWNrXG4gICAgY29uc3Qgc3RhY2tMaW5lcyA9IHN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAvLyBGaW5kIHRoZSBsaW5lIHdpdGggdGhlIGVycm9yICh1c3VhbGx5IHRoZSBzZWNvbmQgbGluZSlcbiAgICBjb25zdCBlcnJvckxpbmUgPSBzdGFja0xpbmVzWzFdIHx8ICcnO1xuICAgIC8vIEV4dHJhY3QgbGluZSBudW1iZXIgZnJvbSB0aGUgZXJyb3IgbGluZSB1c2luZyByZWdleFxuICAgIGNvbnN0IG1hdGNoID0gZXJyb3JMaW5lLm1hdGNoKC86KFxcZCspOihcXGQrKSQvKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBwYXJzZUludChtYXRjaFsxXSkgOiBudWxsO1xuICB9XG4gIFxuIGV4cG9ydCBmdW5jdGlvbiBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrKHN0YWNrOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoIXN0YWNrKSByZXR1cm4gbnVsbDtcbiAgICAvLyBFeHRyYWN0IGxpbmVzIGZyb20gc3RhY2tcbiAgICBjb25zdCBzdGFja0xpbmVzID0gc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIC8vIEZpbmQgdGhlIGxpbmUgd2l0aCB0aGUgY2FsbGVyIGZ1bmN0aW9uICh1c3VhbGx5IHRoZSB0aGlyZCBsaW5lKVxuICAgIGNvbnN0IGNhbGxlckxpbmUgPSBzdGFja0xpbmVzWzJdIHx8ICcnO1xuICAgIC8vIEV4dHJhY3QgY2FsbGVyIGZ1bmN0aW9uIG5hbWUgdXNpbmcgcmVnZXhcbiAgICBjb25zdCBtYXRjaCA9IGNhbGxlckxpbmUubWF0Y2goL2F0IChbXFx3Ljw+XSspLyk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBudWxsO1xuICB9IiwiXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hhcmVEb0V2ZW50IHtcbiAgICBldmVudFBhdGg6IHN0cmluZztcbiAgICBldmVudE5hbWU6IHN0cmluZztcbiAgICBzb3VyY2U6IGFueTtcbiAgICBkYXRhOiBhbnk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVFdmVudChldmVudDpTaGFyZURvRXZlbnQpIHtcblxuICAgICR1aS5ldmVudHMuYnJvYWRjYXN0KGV2ZW50LmV2ZW50UGF0aCwgZXZlbnQpO1xufSIsIlxuLyoqXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgdGhlIGFwaSBjYWxscyB0byB0aGUgYmFja2VuZC5cbiAqIHV0aWxpc2luZyB0aGUgYXhpb3MgbGlicmFyeSB0byBtYWtlIHRoZSBjYWxscy5cbiAqIGluY2x1c2luZyBvZiB3ZWJwYWNrSWdub3JlIGlzIHRvIGFsbG93IHRoZSB3ZWJwYWNrIHRvIGlnbm9yZSB0aGUgY2FsbHMgYW5kIG5vdCB0cnkgdG8gYnVuZGxlIHRoZW0uXG4gKi9cblxuaW1wb3J0IHsgZXJyLCBpbmYsIGwsIGxoMSwgc2VjQmFja09uZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vTG9nXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlUG9zdDxUPihhcGk6IHN0cmluZywgcG9zdEJvZHk6IGFueSk6IFByb21pc2U8VD4ge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LnBvc3QoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpLCBwb3N0Qm9keSk7XG4gICAgcmV0dXJuIChhd2FpdCBleGVjdXRlRmV0Y2g8VD4oYXBpLCBcIlBPU1RcIiwgcG9zdEJvZHkpKS5kYXRhO1xufVxuXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldDxUPihhcGk6IHN0cmluZykgOiBQcm9taXNlPFQ+e1xuLy8gICAgIHJldHVybiBhd2FpdCAkYWpheC5nZXQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpKTtcbi8vIH0gXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlR2V0PFQ+KGFwaTogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIChhd2FpdCBleGVjdXRlRmV0Y2g8VD4oYXBpLCBcIkdFVFwiLCB1bmRlZmluZWQpKS5kYXRhO1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlR2V0djI8VD4oYXBpOiBzdHJpbmcpe1xuICAgIHJldHVybiAgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJHRVRcIiwgdW5kZWZpbmVkKTtcbn1cblxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlUHV0PFQ+KGFwaTogc3RyaW5nLCBwb3N0Qm9keTogYW55KTogUHJvbWlzZTxUPiB7XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXgucHV0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJQVVRcIiwgcG9zdEJvZHkpKS5kYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZURlbGV0ZTxUPihhcGk6IHN0cmluZyk6IFByb21pc2U8VD4ge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LmRlbGV0ZSgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSkpO1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJERUxFVEVcIiwgdW5kZWZpbmVkKSkuZGF0YTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVBcGkoYXBpOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBsb2NhdGlvbiA9IHdpbmRvdy5kb2N1bWVudC5sb2NhdGlvbi5vcmlnaW47XG5cbiAgICAvL2lmIGFwaSBkb2VzIG5vdCBpbmNsdWRlIHRoZSBsb2NhdGlvbiB0aGVuIGFkZCBpdC5cbiAgICBpZiAoYXBpLmluZGV4T2YobG9jYXRpb24pID09PSAtMSkge1xuICAgICAgICAvL2NoZWNrIGlmIGFwaSBzdGFydCB3aXRoIGEgLyBpZiBub3QgYWRkIGl0LlxuICAgICAgICBpZiAoYXBpLmluZGV4T2YoXCIvXCIpICE9PSAwKSB7XG4gICAgICAgICAgICBhcGkgPSBcIi9cIiArIGFwaTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwaSA9IGxvY2F0aW9uICsgYXBpO1xuICAgIH1cbiAgICByZXR1cm4gYXBpO1xuXG59XG5cbmV4cG9ydCB0eXBlIFRFeGVjdXRlRmV0Y2hSZXNwb25zZSA9XG4gICAge1xuICAgICAgICBkYXRhOiBhbnkgfCB1bmRlZmluZWQsXG4gICAgICAgIHJlc3BvbnNlOiBSZXNwb25zZSB8IHVuZGVmaW5lZCxcbiAgICAgICAgaW5mbzpcbiAgICAgICAge1xuICAgICAgICAgICAgc3VjY2VzczogYm9vbGVhbixcbiAgICAgICAgICAgIGVycm9yOiBBcnJheTxUVXNlckVycm9ycz5cbiAgICAgICAgfVxuICAgIH1cblxuZXhwb3J0IHR5cGUgVFVzZXJFcnJvcnMgPVxuICAgIHtcbiAgICAgICAgY29kZTogc3RyaW5nLFxuICAgICAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgICAgIHVzZXJNZXNzYWdlOiBzdHJpbmcsXG4gICAgICAgIHN1Z2dlc3Rpb25zPzogQXJyYXk8c3RyaW5nPlxuICAgICAgICBpbnRlcm5hbFN1Z2dlc3Rpb25zPzogQXJyYXk8c3RyaW5nPlxuICAgICAgICBhY3Rpb25zPzogQXJyYXk8c3RyaW5nPlxuICAgIH1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVGZXRjaDxUPihhcGk6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8VEV4ZWN1dGVGZXRjaFJlc3BvbnNlPiB7XG4gICAgbGV0IHJldFZhbHVlOiBURXhlY3V0ZUZldGNoUmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHVuZGVmaW5lZCxcbiAgICAgICAgcmVzcG9uc2U6IHVuZGVmaW5lZCxcbiAgICAgICAgaW5mbzoge1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogW11cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCB1cmwgPSB2YWxpZGF0ZUFwaShhcGkpO1xuICAgIGxldCBmZXRjaEhlYWRlcnMgPSBidWlsZEhlYWRlcnMoKTtcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGZldGNoSGVhZGVycyxcbiAgICAgICAgYm9keTogZGF0YSA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogdW5kZWZpbmVkXG4gICAgfVxuICAgICkudGhlbihhc3luYyAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0VmFsdWUucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2RlOiBcIkFQSV9FUlJPUlwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBjYWxsIHRoZSBBUEkuIHN0YXR1c1RleHQ6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gLFxuICAgICAgICAgICAgICAgIHVzZXJNZXNzYWdlOiBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNhbGwgdGhlIEFQSS5cIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgLy9jaGVjayBpZiByZXNwb25zZSBpcyBKU09OXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIik/LmluY2x1ZGVzKFwiYXBwbGljYXRpb24vanNvblwiKSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5zdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZTogYW55KSB7XG4gICAgICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvZGU6IFwiQVBJX0VSUk9SXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGV4dHJhY3QgdGhlIGRhdGEgZnJvbSB0aGUgQVBJLiBNZXNzYWdlOiAke2U/Lm1lc3NhZ2UgfHwgXCJVbmtub3duXCJ9YCxcbiAgICAgICAgICAgICAgICB1c2VyTWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGV4dHJhY3QgdGhlIGRhdGEgZnJvbSB0aGUgQVBJLmBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRhdGEsIHJlc3BvbnNlIH07XG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGwoZXJyKGBFcnJvciBmcm9tIEFQSSBDYWxsICR7dXJsfWApLCBlcnJvcik7XG5cbiAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGNvZGU6IFwiQVBJX0VSUk9SXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgICAgICAgICAgdXNlck1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgZGF0YTogdW5kZWZpbmVkLCByZXNwb25zZTogdW5kZWZpbmVkIH07XG4gICAgfSlcblxuICAgIGxoMShgUmVzcG9uc2UgZnJvbSAke3VybH1gKTtcbiAgICBsKHJlc3BvbnNlKTtcblxuICAgIHJldFZhbHVlLmRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgaWYocmV0VmFsdWUuaW5mby5lcnJvci5sZW5ndGggPiAwKXtcbiAgICAgICAgcmV0VmFsdWUuaW5mby5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgIGwoZXJyKGBFcnJvciBmcm9tIEFQSSBDYWxsICR7dXJsfWApLCBlKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzZWNCYWNrT25lKCk7XG5cbiAgICByZXR1cm4gcmV0VmFsdWU7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkSGVhZGVycygpIHtcbiAgICBsZXQgYmVhcmVyID0gZ2V0QmVhcmVyVG9rZW4oKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBmZXRjaEhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICBpZiAoYmVhcmVyKSB7XG4gICAgICAgIGZldGNoSGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIGJlYXJlcik7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaEhlYWRlcnM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb2tpZXMoKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB7XG4gICAgbGV0IHJldFZhbHVlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gICAgbGV0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpLnJlZHVjZShmdW5jdGlvbiAoY29va2llcywgY29va2llKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IGNvb2tpZS5zcGxpdChcIj1cIik7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBwYXJ0c1swXS50cmltKCk7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0c1sxXTtcblxuICAgICAgICAgICAgcmV0VmFsdWVba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb29raWVzO1xuICAgIH0sIHt9KTtcblxuICAgIHJldHVybiByZXRWYWx1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCZWFyZXJUb2tlbigpIHtcbiAgICB2YXIgY29va2llcyA9IGdldENvb2tpZXMoKTtcbiAgICB2YXIgdG9rZW4gPSBjb29raWVzW1wiX2FwaVwiXTtcblxuICAgIGlmICh0b2tlbikgcmV0dXJuIFwiQmVhcmVyIFwiICsgdG9rZW47XG4gICAgcmV0dXJuIG51bGw7XG59OyIsImltcG9ydCB7IGV4ZWN1dGVQb3N0IH0gZnJvbSBcIi4uL2FwaVwiO1xuaW1wb3J0IHsgSUZpbmRCeVF1ZXJ5T3B0aW9ucyB9IGZyb20gXCIuL0lGaW5kQnlRdWVyeUlucHV0XCI7XG5pbXBvcnQgeyBJRmluZEJ5UXVlcnlSZXN1bHQgfSBmcm9tIFwiLi9JRmluZEJ5UXVlcnlSZXN1bHRcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUZpbmRCeVF1ZXJ5PFQ+KGlucHV0T3B0aW9uOiBJRmluZEJ5UXVlcnlPcHRpb25zKTogUHJvbWlzZTxJRmluZEJ5UXVlcnlSZXN1bHQ8VD4+XG57XG4gICAgcmV0dXJuIGV4ZWN1dGVQb3N0PElGaW5kQnlRdWVyeVJlc3VsdDxUPj4oXCIvYXBpL3YxL3B1YmxpYy93b3JrSXRlbS9maW5kQnlRdWVyeVwiLCBpbnB1dE9wdGlvbikudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG59IiwiaW1wb3J0IHsgZXhlY3V0ZUZpbmRCeVF1ZXJ5IH0gZnJvbSBcIi4vZXhlY3V0ZUZpbmRCeVF1ZXJ5L0ZpbmRCeVF1ZXJ5XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2Ugc2VhcmNoUmVzdWx0IFxue1xuICAgIGZvdW5kOmJvb2xlYW4sIFxuICAgIHZhbHVlOnN0cmluZyB8IHVuZGVmaW5lZCwgXG4gICAgcGFyZW50SWQ6c3RyaW5nIHwgdW5kZWZpbmVkXG4gICAgZGVwdGg6bnVtYmVyLFxuICAgIGZvdW5kSW5Xb3JrSXRlbUlkOnN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICB3YXNGb3VuZEluQW5jZXN0b3I6Ym9vbGVhbixcbiAgICBmb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lOnN0cmluZyB8IHVuZGVmaW5lZFxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlKHdvcmtJdGVtSWQ6IHN0cmluZywgYXR0cmlidXRlTmFtZTogc3RyaW5nLCBwYXJlbnRzOiBib29sZWFuLCBtYXhEZXB0aD86IG51bWJlciB8IHVuZGVmaW5lZClcbiB7XG4gICAgbGV0IHVzZU1heERlcHRoIDogYm9vbGVhbiA9IG1heERlcHRoID8gdHJ1ZSA6IGZhbHNlO1xuICAgIGlmKG1heERlcHRoICYmIG1heERlcHRoID4gMCl7XG4gICAgICAgIHVzZU1heERlcHRoID0gdHJ1ZTtcbiAgICB9XG5cblxuICAgIGxldCByZXRWYWx1ZTpzZWFyY2hSZXN1bHQgPSB7Zm91bmQ6ZmFsc2UsIHZhbHVlOnVuZGVmaW5lZCwgcGFyZW50SWQ6dW5kZWZpbmVkLCBkZXB0aDowLCBmb3VuZEluV29ya0l0ZW1JZDp1bmRlZmluZWQsIHdhc0ZvdW5kSW5BbmNlc3RvcjpmYWxzZSwgZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZTp1bmRlZmluZWR9O1xuXG4gICAgcmV0VmFsdWUgPSBhd2FpdCBzZWFyY2hGb3JBdHRyaWJ1dGUod29ya0l0ZW1JZCwgYXR0cmlidXRlTmFtZSk7XG5cbiAgICBpZihyZXRWYWx1ZS5mb3VuZCl7XG4gICAgICAgIHJldHVybiByZXRWYWx1ZTtcbiAgICB9XG5cbiAgICBpZighcGFyZW50cyApe1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHBhcmVudHMgb3IgY2hpbGRyZW4gdG8gc2VhcmNoIHNvIG9ubHkgc2VhcmNoaW5nIGN1cnJlbnQgd29yayBpdGVtXCIpO1xuICAgICAgICByZXR1cm4gcmV0VmFsdWVcbiAgICB9XG5cbiAgICBpZihwYXJlbnRzKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWFyY2hpbmcgcGFyZW50c1wiKTtcbiAgICAgICAgbGV0IGRlcHRoID0gMDtcbiAgICAgICAgbGV0IHNlYXJjaFBhcmVudCA9IGFzeW5jIChwYXJlbnRJZDogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBkZXB0aCsrO1xuICAgICAgICAgICAgbGV0IHI6IHNlYXJjaFJlc3VsdCA9IHtmb3VuZDpmYWxzZSxcbiAgICAgICAgICAgICAgICAgdmFsdWU6dW5kZWZpbmVkLCBcbiAgICAgICAgICAgICAgICAgcGFyZW50SWQ6dW5kZWZpbmVkLCBkZXB0aDpkZXB0aCwgLy9kZXB0aCBoZXJlIHdpbGwgYmUgb3ZlcnJpZGVuIGlmIHRoZXJlIGlzIGEgcGFyZW50XG4gICAgICAgICAgICAgICAgIGZvdW5kSW5Xb3JrSXRlbUlkOnVuZGVmaW5lZCwgXG4gICAgICAgICAgICAgICAgIHdhc0ZvdW5kSW5BbmNlc3RvcjpmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZTp1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYoIXBhcmVudElkKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHBhcmVudCBmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIHIgPSBhd2FpdCBzZWFyY2hGb3JBdHRyaWJ1dGUocGFyZW50SWQsIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgIHIuZGVwdGggPSBkZXB0aDsgLy91cGRhdGUgZGVwdGggYXMgaXQgd2lsbCBiZSAwXG4gICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihyLmZvdW5kKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIGF0dHJpYnV0ZSBpbiBwYXJlbnRcIik7XG4gICAgICAgICAgICAgICAgci53YXNGb3VuZEluQW5jZXN0b3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgIGlmKHVzZU1heERlcHRoICYmIGRlcHRoID49IG1heERlcHRoISl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWF4IGRlcHRoIHJlYWNoZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGlmKCFyLnBhcmVudElkKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBwYXJlbnQgZm91bmRcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBmb3VuZCBpbiBwYXJlbnRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlYXJjaFBhcmVudChyLnBhcmVudElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldFZhbHVlID0gYXdhaXQgc2VhcmNoUGFyZW50KHJldFZhbHVlLnBhcmVudElkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0VmFsdWU7XG5cbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VhcmNoRm9yQXR0cmlidXRlKHdvcmtJdGVtSWQ6IHN0cmluZywgYXR0cmlidXRlTmFtZTogc3RyaW5nKSB7XG4gICAgLy9nZXQgdGhlIG1hdHRlclxuICAgIGxldCByZXRWYWx1ZSA6c2VhcmNoUmVzdWx0ID0ge1xuICAgICAgICBmb3VuZDpmYWxzZSwgdmFsdWU6dW5kZWZpbmVkLFxuICAgICAgICAgcGFyZW50SWQ6dW5kZWZpbmVkLCBkZXB0aDowLFxuICAgICAgICAgIGZvdW5kSW5Xb3JrSXRlbUlkOnVuZGVmaW5lZCxcbiAgICAgICAgICAgd2FzRm91bmRJbkFuY2VzdG9yOmZhbHNlLFxuICAgICAgICAgICBmb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lOnVuZGVmaW5lZH07XG4gICAgbGV0IHJlcSA9IHtcbiAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJ3b3JrSXRlbUlkc1wiOiBbXG4gICAgICAgICAgICAgICAgd29ya0l0ZW1JZFxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcImVucmljaFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwidGl0bGVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogXCJwYXJlbnQuaWRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogXCJ0eXBlLnN5c3RlbU5hbWVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogXCJyZWZlcmVuY2VcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogYXR0cmlidXRlTmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIHVzaW5nIFNoYXJlRG8gSWQ6IFwiICsgd29ya0l0ZW1JZCk7XG4gICAgbGV0IGh0dHBSZXN1bHRGaW5kQnlRdWVyeSA9IGF3YWl0IGV4ZWN1dGVGaW5kQnlRdWVyeTxhbnk+KHJlcSk7XG4gICAgY29uc29sZS5sb2coYFdvcmsgaXRlbSAke3dvcmtJdGVtSWR9IGZvdW5kYCk7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5LnJlc3VsdHMpKTtcblxuXG4gICAgbGV0IHR5cGVTeXN0ZW1OYW1lID0gaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5LnJlc3VsdHNbMF0uZGF0YVtcInR5cGUuc3lzdGVtTmFtZVwiXTtcbiAgICBsZXQgcGFyZW50SWQgPSAgICAgICBodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0c1swXS5kYXRhW1wicGFyZW50LmlkXCJdO1xuICAgIGxldCBhdHRyaWJ1dGUgPSAgICAgIGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzWzBdLmRhdGFbYXR0cmlidXRlTmFtZV0gYXMgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKGBUeXBlIHN5c3RlbSBuYW1lIGlzICR7dHlwZVN5c3RlbU5hbWV9YCk7XG4gICAgY29uc29sZS5sb2coYFBhcmVudCBJZCBpcyAke3BhcmVudElkfWApO1xuICAgIGNvbnNvbGUubG9nKGBBdHRyaWJ1dGUgWyR7YXR0cmlidXRlTmFtZX1dIGlzICR7YXR0cmlidXRlfWApO1xuXG4gICAgcmV0VmFsdWUudmFsdWUgPSBhdHRyaWJ1dGU7XG4gICAgaWYoYXR0cmlidXRlKXtcbiAgICAgICAgcmV0VmFsdWUuZm91bmQgPSB0cnVlO1xuICAgICAgICByZXRWYWx1ZS5mb3VuZEluV29ya0l0ZW1JZCA9IHdvcmtJdGVtSWQ7XG4gICAgICAgIHJldFZhbHVlLmZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWUgPSB0eXBlU3lzdGVtTmFtZTtcbiAgICB9XG4gICAgcmV0VmFsdWUucGFyZW50SWQgPSBwYXJlbnRJZDtcblxuICAgIHJldHVybiByZXRWYWx1ZTtcbiAgICBcbn0iLCJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcbmltcG9ydCB7IElTaGFyZWRvQmxhZGVNb2RlbCwgVFNoYXJlRG9CbGFkZSwgSUNvbmZpZ3VyYXRpb25Ib3N0IH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvU2hhcmVkb0FzcGVjdE1vZGVsc1wiO1xuaW1wb3J0IHsgSURlYnVnLCBPYnNlcnZhYmxlSURlYnVnIH0gZnJvbSBcIi4vSURlYnVnXCI7XG5pbXBvcnQgeyBnZXROZXN0ZWRQcm9wZXJ0eSwgc2V0TmVzdGVkUHJvcGVydHkgfSBmcm9tIFwiLi9PYmplY3RIZWxwZXJzXCI7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBUU2hhcmVkbyB9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL1RTaGFyZWRvXCI7XG5pbXBvcnQgeyBJV2lkZ2V0SnNvbiwgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9JV2lkZ2V0SnNvblwiO1xuaW1wb3J0IHsgU2hhcmVEb0V2ZW50LCBmaXJlRXZlbnQgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0V2ZW50c0hlbHBlclwiO1xuaW1wb3J0IHsgY2xlYXJTZWMsIGVyciwgaW5mLCBsLCBsaDEsIG52LCB3cm4gfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0xvZ1wiXG5pbXBvcnQgeyBJRm9ybUJ1aWxkZXJEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvQXNwZWN0L0lGb3JtQnVpbGRlclwiO1xuaW1wb3J0IHsgVFVzZXJFcnJvcnMgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9hcGlcIjtcbmltcG9ydCB7IE5lc3RlZE9ic2VydmFibGVPYmplY3QsIHRvT2JzZXJ2YWJsZU9iamVjdCB9IGZyb20gXCIuL0tPQ29udmVydGVyXCI7XG5cblxuY29uc29sZS5sb2coXCJ2OiAtIDUuMjdcIilcblxuZXhwb3J0IGNvbnN0IEZPTVJfQlVJTERFUl9QQVRIX1NUUklORyA9IFwiYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YVwiO1xuZXhwb3J0IGNvbnN0IEVSUk9SX0RJVl9TRUxFQ1RPUiA9IFwiI3JlbmRlci1lcnJvcnMtaGVyZVwiO1xuXG5leHBvcnQgdHlwZSBJRGVmYXVsdFNldHRpbmdzPFQ+ID0gVCAmXG57XG4gICAgZGVidWc6IElEZWJ1ZyxcbiAgICBldmVudHNUb1JlYWN0VG86IEFycmF5PEV2ZW50VG9SZWFjdFRvPlxufVxuXG5cblxuaW50ZXJmYWNlIEV2ZW50VG9SZWFjdFRvIHtcbiAgICBldmVudFBhdGg6IHN0cmluZztcbiAgICBtZXRob2RUb0NhbGw6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElERUFzcGVjdENvbmZpZ3VyYXRpb24ge1xuICAgIG1vZGVsOiBJU2hhcmVkb0JsYWRlTW9kZWw7XG4gICAgYmxhZGU6IFRTaGFyZURvQmxhZGU7XG59XG5cbnR5cGUgT2JzZXJ2YWJsZWlmeTxUPiA9IHtcbiAgICBbUCBpbiBrZXlvZiBUXToga28uT2JzZXJ2YWJsZTxUW1BdPjtcbn07XG5cbmV4cG9ydCB0eXBlIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPiA9IFxueyBbSyBpbiBrZXlvZiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5dOiBrby5PYnNlcnZhYmxlPElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPltLXT47IH1cblxuLy8gZXhwb3J0IHR5cGUgSU9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPiA9ICB7ZGVidWc6IGtvLk9ic2VydmFibGU8T2JzZXJ2YWJsZUlEZWJ1Zz59ICZcbi8vIHtcbi8vICAgICBbSyBpbiBrZXlvZiBUQ29uZmlnXTogTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUQ29uZmlnPltLXTtcbiAgIFxuLy8gfVxuXG5leHBvcnQgdHlwZSBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBJQ29uZmlndXJhdGlvbkhvc3QgJiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbi8vIGFic3RyYWN0IGNsYXNzIENyZWF0b3I8VENvbmZpZz4ge1xuLy8gICAgIHB1YmxpYyBhYnN0cmFjdCBGYWN0b3J5TWV0aG9kKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4sIGJhc2VNb2RlbDogYW55KTogYW55O1xuLy8gfVxuXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybUJ1aWxkZXJGaWVsZFBhdGgoZm9ybUJ1aWxkZXJGaWVsZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGAke0ZPTVJfQlVJTERFUl9QQVRIX1NUUklOR30uJHtmb3JtQnVpbGRlckZpZWxkfWA7XG59XG5cbnR5cGUgT2JzZXJ2YWJsZVBlcnNvbjxUQ29uZmlnPiA9IE9ic2VydmFibGVpZnk8SUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+PjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VJREVBc3BlY3Q8VENvbmZpZywgVFBlcnNpdGFuY2U+ICB7XG4gICAgX2RhdGE6IGFueTsgLy9ub24gbW9kZWwgZGF0YSBzdG9yYWdlXG4gICAgb3JpZ2luYWxDb25maWd1cmF0aW9uITogVENvbmZpZztcbiAgICBjb25maWd1cmF0aW9uITogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgIGRlZmF1bHRzOiBJRGVmYXVsdFNldHRpbmdzPFRDb25maWc+IHwgdW5kZWZpbmVkO1xuICAgIGVsZW1lbnQhOiBIVE1MRWxlbWVudDtcbiAgICBtb2RlbDogYW55O1xuICAgIGVuYWJsZWQhOiBib29sZWFuO1xuICAgIGJsYWRlITogVFNoYXJlRG9CbGFkZTtcbiAgICBsb2FkZWQhOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIHNoYXJlZG9JZDogYW55O1xuICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZSE6IGtvLk9ic2VydmFibGU8c3RyaW5nPjtcbiAgICB2YWxpZGF0aW9uOiBhbnk7XG4gICAgdmFsaWRhdGlvbkVycm9yQ291bnQhOiBrby5PYnNlcnZhYmxlPG51bWJlcj47XG4gICAgYmFzZU1vZGVsITogVFNoYXJlZG88YW55PjtcbiAgICB0aGlzQ29tcG9uZW50TmFtZSE6IHN0cmluZztcbiAgICBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGE6IHN0cmluZyB8IHVuZGVmaW5lZDsgLy9UaGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tXG4gICAgb3B0aW9ucyE6IE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPlxuICAgIHVuaXF1ZUlkITogc3RyaW5nO1xuICAgIHdpZGdldFNldHRpbmdzITogSVdpZGdldEpzb248VENvbmZpZz47XG4gICAgYXNwZWN0TG9nT3V0cHV0OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICBsaXZlQ29uZmlnRGl2OiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICBsaXZlQ29uZmlnRGF0YTogYW55O1xuICAgIGVycm9yRGl2U2VsZWN0b3I6IHN0cmluZztcbiAgICBlcnJvcnM6IGtvLk9ic2VydmFibGVBcnJheTxUVXNlckVycm9ycz4gfCB1bmRlZmluZWQ7XG5cblxuXG4gICAgLyoqXG4gICAgICogQmFzZSBDb25zdHJ1Y3RvciBmb3IgYWxsIElERUFzcGVjdHMsIGZvcmNlcyB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIGxvYWQgYW5kIHNhdmUgbWV0aG9kc1xuICAgICAqIEBwYXJhbSBjb21wb25lbnROYW1lIC8vVGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCBlLmcuIEFzcGVjdC5RdWlja1ZpZXdcbiAgICAgKiBAcGFyYW0gbG9hZFNhdmVMb2NhdGlvbiAvL1RoZSBsb2NhdGlvbiB0byBsb2FkIGFuZCBzYXZlIHRoZSBkYXRhIGZyb20gZS5nLiBtb2RlbC5hc3BlY3QuRm9ybUJ1aWxkZXIuZm9ybURhdGFcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAvL1RoZSBlbGVtZW50IHRoYXQgdGhlIGFzcGVjdCBpcyBib3VuZCB0b1xuICAgICAqIEBwYXJhbSBjb25maWd1cmF0aW9uIC8vVGhlIGNvbmZpZ3VyYXRpb24gcGFzc2VkIGluIGZyb20gdGhlIGJsYWRlIGFuZCB0aGUgZGVzaWduIHRpbWUgY29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSBiYXNlTW9kZWwgLy9UaGUgYmFzZSBtb2RlbCBwYXNzZWQgaW4gZnJvbSB0aGUgYmxhZGVcbiAgICAgKiBAcGFyYW0gZGVmYXVsdHMgLy9UaGUgZGVmYXVsdHMgcGFzc2VkIGluIGZyb20gdGhlIHdpZGdldCB0byBzZXQgaW5jYXNlIG9mIGJhZCBjb25maWd1cmF0aW9uIG9yIG1pc3NpbmcgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCk7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IFRDb25maWcsIGJhc2VNb2RlbDogVFNoYXJlZG88YW55PilcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoLi4uYXJyOiBhbnlbXSkge1xuXG4gICAgICAgIHRoaXMud2lkZ2V0U2V0dGluZ3MgPSB0aGlzLnNldFdpZGdldEpzb25TZXR0aW5ncygpO1xuICAgICAgICB0aGlzLnRoaXNDb21wb25lbnROYW1lID0gdGhpcy5zZXRUaGlzQ29tcG9uZW50TmFtZSgpO1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0gdGhpcy5zZXREZWZhdWx0cygpOyAvL3NldHVwIHRoZSBkZWZhdWx0IGJ5IGNhbGxpbmcgdGhlIGFic3RyYWN0IG1ldGhvZCBpbiB0aGUgY2hpbGQgY2xhc3NcblxuICAgICAgICB0aGlzLmVycm9yRGl2U2VsZWN0b3IgPSBFUlJPUl9ESVZfU0VMRUNUT1I7XG4gICAgICAgIHRoaXMuZXJyb3JzID0ga28ub2JzZXJ2YWJsZUFycmF5PFRVc2VyRXJyb3JzPigpO1xuXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGJhc2UgY29uc3RydWN0b3JcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGNvbnN0cnVjdG9yIHRoYXQgaXMgY2FsbGVkIGJ5IHRoZSBJREVcbiAgICAgICAgICAgIHRoaXMudW5pcXVlSWQgPSB1dWlkKCk7XG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXNlKGFyclswXSwgYXJyWzFdLCBhcnJbMl0pO1xuICAgICAgICAgICAgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPSB0aGlzLnNldExvY2F0aW9uT2ZEYXRhVG9Mb2FkQW5kU2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvblNldHVwXCIsIHRoaXMubW9kZWwpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cCgpO1xuICAgICAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJhZnRlclNldHVwXCIsIHRoaXMubW9kZWwpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cExpdmVDb25maWcoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBFcnJvck1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQXNwZWN0TG9nT3V0cHV0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9pbml0aWFsaXNlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPiwgYmFzZU1vZGVsOiBUU2hhcmVkbzxhbnk+KSB7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgLy9TaGFyZURvIHBhc3NlcyB0aGUgY29uZmlnIGFzIHdlbGwgYXMgb3RoZXIgc3R1ZmYsIHNvIHdlIG5lZWQgdG8gZXh0cmFjdCB0aGUgY29uZmlnXG4gICAgICAgIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiBhcyBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz47XG4gICAgICAgIHRoaXMuYmFzZU1vZGVsID0gYmFzZU1vZGVsO1xuXG4gICAgICAgIC8vIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uXG5cbiAgICAgICAgbGV0IGJhc2VEZWZhdWx0czogSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248YW55PiA9IHtcbiAgICAgICAgICAgIGRlYnVnOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbG9nVG9Db25zb2xlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxpdmVDb25maWc6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uZmlndXJhdGlvbi5kZWJ1ZyA9ICQuZXh0ZW5kKGJhc2VEZWZhdWx0cy5kZWJ1ZywgY29uZmlndXJhdGlvbi5kZWJ1ZykgYXMgSURlYnVnO1xuXG4gICAgICAgIC8vIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uLmRlYnVnID0gJC5leHRlbmQoYmFzZURlZmF1bHRzLmRlYnVnLCB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbi5kZWJ1ZykgYXMgSURlYnVnO1xuXG4gICAgICAgIC8vIGNvbmZpZ3VyYXRpb24uZGVidWcgPSAkLmV4dGVuZChiYXNlRGVmYXVsdHMsIGNvbmZpZ3VyYXRpb24uZGVidWcpIGFzIElEZWJ1ZztcblxuICAgICAgICAvLyB0aGlzLmNvbmZpZ3VyYXRpb24gPSAkLmV4dGVuZChiYXNlRGVmYXVsdHMsIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uKSBhcyBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz47XG4gICAgICAgIC8vIHRoaXMuZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gTWVyZ2UgdGhlIGNvbmZpZ3VyYXRpb24gd2l0aCB0aGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gJC5leHRlbmQodGhpcy5kZWZhdWx0cywgdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24pIGFzIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcblxuICAgICAgICAvL2NyZWF0ZSBhIG5ldyBtb2RlbFxuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5jb25maWd1cmF0aW9uLl9ob3N0Lm1vZGVsO1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLm1vZGVsLmNhbkVkaXQ7XG4gICAgICAgIHRoaXMuYmxhZGUgPSB0aGlzLmNvbmZpZ3VyYXRpb24uX2hvc3QuYmxhZGU7XG4gICAgICAgIHRoaXMubG9hZGVkID0gdGhpcy5sb2FkZWQgfHwga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgIC8vIE1hcCB0aGUgYmFzZSBtb2RlbCBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMuc2hhcmVkb0lkID0gdGhpcy5jb25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbC5pZDtcbiAgICAgICAgaWYgKCF0aGlzLnNoYXJlZG9JZCB8fCB0aGlzLnNoYXJlZG9JZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9JZCBmb3VuZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSA9IHRoaXMuY29uZmlndXJhdGlvbi5faG9zdC5tb2RlbC5zaGFyZWRvVHlwZVN5c3RlbU5hbWU7XG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUgfHwgdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBzaGFyZWRvVHlwZVN5c3RlbU5hbWUgZm91bmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICAodGhpcy5vcHRpb25zIGFzIGFueSkgPSB0b09ic2VydmFibGVPYmplY3QodGhpcy5jb25maWd1cmF0aW9uLCAodGhpcy5vcHRpb25zIGFzIGFueSkpO1xuXG4gXG4gICAgICAgIC8vIFZhbGlkYXRpb25cbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0ge307XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yQ291bnQgPSB0aGlzLnZhbGlkYXRpb25FcnJvckNvdW50IHx8IGtvLm9ic2VydmFibGUoMCk7XG5cbiAgICAgICAgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPSB0aGlzLnNldExvY2F0aW9uT2ZEYXRhVG9Mb2FkQW5kU2F2ZSgpOyAvL3NldHVwIHRoZSBsb2NhdGlvbiB0byBsb2FkIGFuZCBzYXZlIHRoZSBkYXRhIGZyb20gYnkgY2FsbGluZyB0aGUgYWJzdHJhY3QgbWV0aG9kIGluIHRoZSBjaGlsZCBjbGFzc1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uSW5pdGlhbGlzZVwiLCB0aGlzLm1vZGVsKTtcbiAgICB9XG5cbiAgICBjbGVhckVycm9ycygpe1xuICAgICAgICB0aGlzLmVycm9ycz8ucmVtb3ZlQWxsKCk7XG4gICAgfVxuXG4gICAgc2V0dXBFcnJvck1hbmFnZXIoKSB7XG5cbiAgICAgICAgdGhpcy5sKFwiU2V0dGluZyB1cCBlcnJvciBtYW5hZ2VyXCIpO1xuICAgICAgICB0aGlzLmVycm9ycz8uc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbmYoXCJFcnJvcnMgY2hhbmdlZFwiLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkRXJyb3JEaXYoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBzZXR1cExpdmVDb25maWcoKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5kZWJ1Zy5zdWJzY3JpYmUoKG5ld1ZhbHVlOmFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlLmxpdmVDb25maWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2YXRlTGl2ZUNvbmZpZyhuZXdWYWx1ZS5saXZlQ29uZmlnKTtcbiAgICAgICAgICAgIH19KTtcblxuICAgICAgXG4gICAgIFxuICAgICAgICB0aGlzLmFjdGl2YXRlTGl2ZUNvbmZpZygodGhpcy5vcHRpb25zLmRlYnVnKCkubGl2ZUNvbmZpZyBhcyBhbnkpKCkpOyAvL1RPRE8gZml4IHR5cGluZ3NcbiAgICB9XG5cbiAgICBhY3RpdmF0ZUxpdmVDb25maWcoYWN0aXZlOiBib29sZWFuIHwgdW5kZWZpbmVkKXtcbiAgICAgICAgaWYoIWFjdGl2ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5saXZlQ29uZmlnRGl2Py5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxpdmVDb25maWdEaXYpIHsgLy9sZWF2ZSBhbG9uZSBpZiBhbHJlYWR5IGFjdGl2ZVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sKFwiU2V0dGluZyB1cCBsaXZlIGNvbmZpZ1wiKTtcblxuICAgICAgICBjb25zdCBzZXJpYWxpemVkRGF0YSA9IEpTT04uc3RyaW5naWZ5KHRoaXMuY29uZmlndXJhdGlvbiwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwiX2hvc3RcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sIDQpO1xuXG4gICAgICAgIC8vY2xvbmUgdGhlIGNvbmZpZ1xuICAgICAgICBsZXQgY29uZmlnID0ga28ub2JzZXJ2YWJsZShzZXJpYWxpemVkRGF0YSk7XG5cbiAgICAgICAgdGhpcy5saXZlQ29uZmlnRGF0YSA9IHtcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLCBcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgdGltZW91dDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cblxuICAgICAgICB0aGlzLmxpdmVDb25maWdEaXYgPSB0aGlzLmNyZWF0ZUxpdmVDb25maWdEaXYoKTtcblxuICAgICAgICB0aGlzLmVsZW1lbnQucHJlcGVuZCh0aGlzLmxpdmVDb25maWdEaXYpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uZmlnLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlRoZSBuZXcgdmFsdWUgaXMgXCIgKyBuZXdWYWx1ZSlcblxuICAgICAgICAgICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NvbmZpZyA9IEpTT04ucGFyc2UoY29uZmlnKCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpc2UodGhpcy5lbGVtZW50LCBuZXdDb25maWcsIHRoaXMuYmFzZU1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldChuZXdDb25maWcpO1xuICAgICAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSB0cnVlO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMzAwMCk7XG5cblxuICAgICAgICAvLyBrby5hcHBseUJpbmRpbmdzKHRoaXMubGl2ZUNvbmZpZ0RhdGEsIHRoaXMubGl2ZUNvbmZpZ0Rpdik7eFxuXG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBYnN0cmFjdCBtZXRob2QgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzIHRvIHJlZnJlc2ggdGhlIGFzcGVjdCBiYXNlZCBvbiB0aGUgbmV3IGNvbmZpZ1xuICAgICAqIEBwYXJhbSBuZXdDb25maWcgXG4gICAgICovXG4gICAgYWJzdHJhY3QgcmVmcmVzaChuZXdDb25maWc6IGFueSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAqIEFic3RyYWN0IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gcmVzZXQgdGhlIGFzcGVjdCBiYXNlZCBvbiB0aGUgbmV3IGNvbmZpZ1xuICAgICogQHBhcmFtIG5ld0NvbmZpZyBcbiAgICAqL1xuICAgIGFic3RyYWN0IHJlc2V0KG5ld0NvbmZpZzogYW55KTogdm9pZDtcblxuXG4gICAgY3JlYXRlTGl2ZUNvbmZpZ0RpdigpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgb3V0ZXIgPGRpdj4gd2l0aCBjbGFzcyBcImNvbC1zbS0xMiBmb3JtYnVpbGRlci1lZGl0b3ItanNvblwiXG4gICAgICAgIGNvbnN0IG91dGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG91dGVyRGl2LmNsYXNzTmFtZSA9ICdjb2wtc20tMTIgZm9ybWJ1aWxkZXItZWRpdG9yLWpzb24nO1xuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgaW5uZXIgPGRpdj4gd2l0aCB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZXNcbiAgICAgICAgY29uc3QgaW5uZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaW5uZXJEaXYuaWQgPSAnbGl2ZUNvbmZpZyc7XG4gICAgICAgIGlubmVyRGl2LmNsYXNzTmFtZSA9ICdmb3JtLWNvbnRyb2wgdGV4dGFyZWEnO1xuICAgICAgICBpbm5lckRpdi5zdHlsZS5oZWlnaHQgPSAnMzAwcHgnO1xuICAgICAgICAvLyBpbm5lckRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcsICdzeW50YXhFZGl0b3I6IGxpdmVDb25maWdEYXRhLmNvbmZpZywgZW5hYmxlOiB0cnVlLCBldmVudDogeyBmb2N1c291dDogbGl2ZUNvbmZpZ0RhdGEub25Gb2N1c091dCB9Jyk7XG4gICAgICAgIGlubmVyRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJywgJ3N5bnRheEVkaXRvcjogbGl2ZUNvbmZpZ0RhdGEuY29uZmlnJyk7XG4gICAgICAgIC8vIGlubmVyRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJywgJ3N5bnRheEVkaXRvcjogbW9kZWwuY29uZmlnJyk7XG4gICAgICAgIC8vIEFwcGVuZCB0aGUgaW5uZXJEaXYgdG8gdGhlIG91dGVyRGl2XG4gICAgICAgIG91dGVyRGl2LmFwcGVuZENoaWxkKGlubmVyRGl2KTtcblxuICAgICAgICByZXR1cm4gb3V0ZXJEaXY7XG4gICAgfVxuXG4gICAgZ2V0IGRhdGEoKTogVFBlcnNpdGFuY2UgfCB1bmRlZmluZWQge1xuXG4gICAgICAgIGlmICh0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGxvY2F0aW9uIHRvIGxvYWQgZGF0YSBmcm9tIHNldCAtIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZW5cIiwgXCJyZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXN0ZWREYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkodGhpcy5tb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuXG4gICAgICAgIHRoaXMubG9nKFwiRGF0YSBmb3VuZCBhdCBsb2NhdGlvblwiLCBcImdyZWVuXCIsIG5lc3RlZERhdGEpO1xuICAgICAgICBsZXQgcmV0VmFsdWUgPSBrby50b0pTKG5lc3RlZERhdGEpO1xuICAgICAgICB0aGlzLmxvZyhcIkRhdGEgZm91bmQgYXQgbG9jYXRpb25cIiwgXCJncmVlblwiLCByZXRWYWx1ZSk7XG4gICAgICAgIHJldHVybiByZXRWYWx1ZTtcbiAgICB9XG5cbiAgICBidWlsZEVycm9yRGl2KCkge1xuICAgICAgICB0aGlzLmluZihcIkJ1aWxkaW5nIGVycm9yIGRpdlwiKVxuICAgICAgICBsZXQgZXJyb3JEaXYgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmVycm9yRGl2U2VsZWN0b3IpO1xuICAgICAgICBpZiAoIWVycm9yRGl2IHx8ICF0aGlzLmVycm9ycyB8fCB0aGlzLmVycm9ycygpIHx8IHRoaXMuZXJyb3JzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsKFwiZXJyb3JEaXYuaW5uZXJIVE1MXCIpXG4gICAgICAgIGVycm9yRGl2LmlubmVySFRNTCA9IFwiXCI7IC8vY2xlYW4gb3V0IHRoZSBkaXZcblxuXG4gICAgICAgIGxldCBlcnJvckNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVycm9yRGl2LmFwcGVuZENoaWxkKGVycm9yQ29udGFpbmVyRGl2KTtcblxuICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSBcImVtcy1lcnJvci1jb250YWluZXJcIjtcbiAgICAgICAgbGV0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGl0bGVEaXYuY2xhc3NOYW1lID0gXCJlbXMtZXJyb3ItdGl0bGVcIjtcbiAgICAgICAgdGl0bGVEaXYuaW5uZXJUZXh0ID0gXCJUaGVyZSBoYXMgYmVlbiBhbiBlcnJvcjpcIjtcbiAgICAgICAgZXJyb3JDb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuICAgICAgICBsZXQgZm9yZWFjaERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVycm9yQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGZvcmVhY2hEaXYpO1xuICAgICAgICB0aGlzLmVycm9ycygpLmZvckVhY2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCB1c2VyTWVzc2FnZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICB1c2VyTWVzc2FnZURpdi5jbGFzc05hbWUgPSBcImVtcy1lcnJvci11c2VyLW1lc3NhZ2VcIjtcbiAgICAgICAgICAgIHVzZXJNZXNzYWdlRGl2LmlubmVySFRNTCA9IGVycm9yLnVzZXJNZXNzYWdlO1xuICAgICAgICAgICAgZm9yZWFjaERpdi5hcHBlbmRDaGlsZCh1c2VyTWVzc2FnZURpdik7XG5cbiAgICAgICAgICAgIGlmKGVycm9yLnN1Z2dlc3Rpb25zICYmIGVycm9yLnN1Z2dlc3Rpb25zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IHN1Z2dlc3Rpb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uc0Rpdi5jbGFzc05hbWUgPSBcImVtcy1lcnJvci1zdWdnZXN0aW9uc1wiO1xuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zRGl2LmlubmVySFRNTCA9IGA8Yj5TdWdnZXN0aW9uczo8L2I+PGJyLz4ke2Vycm9yLnN1Z2dlc3Rpb25zLmpvaW4oXCI8YnIvPlwiKX1gO1xuICAgICAgICAgICAgICAgIGZvcmVhY2hEaXYuYXBwZW5kQ2hpbGQoc3VnZ2VzdGlvbnNEaXYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihlcnJvci5hY3Rpb25zICYmIGVycm9yLmFjdGlvbnMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgYWN0aW9uc0Rpdi5jbGFzc05hbWUgPSBcImVtcy1lcnJvci1hY3Rpb25zXCI7XG4gICAgICAgICAgICAgICAgYWN0aW9uc0Rpdi5pbm5lckhUTUwgPSBgPGI+QWN0aW9uczo8L2I+PGJyLz4ke2Vycm9yLmFjdGlvbnMuam9pbihcIjxici8+XCIpfWA7XG4gICAgICAgICAgICAgICAgZm9yZWFjaERpdi5hcHBlbmRDaGlsZChhY3Rpb25zRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZXJyb3IuaW50ZXJuYWxTdWdnZXN0aW9ucyAmJiBlcnJvci5pbnRlcm5hbFN1Z2dlc3Rpb25zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IGludGVybmFsU3VnZ2VzdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGludGVybmFsU3VnZ2VzdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJlbXMtZXJyb3ItaW50ZXJuYWwtc3VnZ2VzdGlvbnNcIjtcbiAgICAgICAgICAgICAgICBpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2LmlubmVySFRNTCA9IGA8Yj5JbnRlcm5hbCBTdWdnZXN0aW9uczo8L2I+PGJyLz4ke2Vycm9yLmludGVybmFsU3VnZ2VzdGlvbnMuam9pbihcIjxici8+XCIpfWA7XG4gICAgICAgICAgICAgICAgZm9yZWFjaERpdi5hcHBlbmRDaGlsZChpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICBpZih0aGlzLm9wdGlvbnMuZGVidWcoKS5zdXBwb3J0UmVxdWVzdEVuYWJsZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBhY3Rpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgYWN0aW9uRGl2LmNsYXNzTmFtZSA9IFwiZW1zLWVycm9yLXN1cHBvcnQtYWN0aW9uXCI7XG4gICAgICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChhY3Rpb25EaXYpO1xuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBidXR0b24uY2xhc3NOYW1lID0gXCJidG4gYnRuLXByaW1hcnlcIjtcbiAgICAgICAgICAgIC8vIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJpbmRcIixcImNsaWNrOmNyZWF0ZVN1cHBvcnRUYXNrLHZpc2libGU6b3B0aW9ucy5kZWJ1Zy4uc3VwcG9ydFJlcXVlc3RFbmFibGVkXCIpO1xuICAgICAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9IFwiQ3JlYXRlIFN1cHBvcnQgVGFza1wiO1xuICAgICAgICAgICAgYWN0aW9uRGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICAgICBcblxuICAgIH1cblxuICAgIHNldCBkYXRhKHZhbHVlOiBUUGVyc2l0YW5jZSB8IHVuZGVmaW5lZCkge1xuXG4gICAgICAgIGlmICh0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGxvY2F0aW9uIHRvIHNhdmUgZGF0YSB0byBzZXQgLSB0aGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcnJpZGVuXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cblxuICAgICAgICBsZXQgdmFsdWVUb1NldDogYW55ID0gdmFsdWU7XG4gICAgICAgIC8vIGlmKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLmluY2x1ZGVzKFwiZm9ybUJ1aWxkZXJcIikpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIC8vZm9ybWJ1aWxkZXIgRGF0YSBhbHdheXMgbmVlZCB0byBiZSBzdHJpbmdcbiAgICAgICAgLy8gICAgIHRoaXMubG9nKFwiU2V0dGluZyBmb3JtYnVpbGRlciBkYXRhIC0gY29udmVydGluZyB0byBzdHJpbmdcIiwgXCJncmVlblwiLCB2YWx1ZSlcbiAgICAgICAgLy8gICAgIHZhbHVlVG9TZXQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIC8vICAgICB0aGlzLmxvZyhcImFmdGVyIFNldHRpbmcgZm9ybWJ1aWxkZXIgZGF0YSAtIGNvbnZlcnRlZCB0byBzdHJpbmdcIiwgXCJncmVlblwiLCB2YWx1ZVRvU2V0KVxuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMubG9nKFwiU2V0dGluZyBkYXRhIGF0IGxvY2F0aW9uXCIsIFwiZ3JlZW5cIiwgdmFsdWVUb1NldCk7XG4gICAgICAgIHNldE5lc3RlZFByb3BlcnR5KHRoaXMubW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCB2YWx1ZVRvU2V0KTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkRhdGFDaGFuZ2VkXCIsIHRoaXMubW9kZWwpO1xuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqICEgaW1wb3J0YW50OiBNYW5kYXRvcnkgbWV0aG9kIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyB0byBzZXQgdGhlIGRlZmF1bHRzXG4gICAgICogKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIGNvbnN0cnVjdG9yIHRvIHNldCB0aGUgZGVmYXVsdHNcbiAgICAgKiBAcmV0dXJucyBEZWZhdWx0czxUQ29uZmlnPlxuICAgICAqIEBtZW1iZXJvZiBCYXNlSURFQXNwZWN0XG4gICAgICogQGFic3RyYWN0XG4gICAgICogXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0RGVmYXVsdHMoKTogSURlZmF1bHRTZXR0aW5nczxUQ29uZmlnPjtcblxuICAgIC8vIC8qKlxuICAgIC8vICAqICEgaW1wb3J0YW50OiBNYW5kYXRvcnkgbWV0aG9kIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyB0byBzZXQgdGhlIGRlZmF1bHRzIGZvciB0aGUgd2lkZ2V0Lmpzb25cbiAgICAvLyAgKi9cbiAgICAvLyBhYnN0cmFjdCBzZXRFeGFtcGxlRm9yTW9kZWxsZXIoKTogRGVmYXVsdHM8VENvbmZpZz47XG5cbiAgICAvKipcbiAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBsb2FkIGFuZCBzYXZlIHRvXG4gICAgKiBFeGFtcGxlcyBvZiB0aGlzIGFyZTpcbiAgICAqIC0gYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YS57Zm9ybUJ1aWxkZXJGaWVsZH1cbiAgICAqIC0gYXNwZWN0RGF0YS5vZHNFbnRpdHlQaWNrZXJcbiAgICAqIC0gdW5kZWZpbmVkIChpZiBubyBkYXRhIGlzIHRvIGJlIGxvYWRlZCBvciBzYXZlZCBieSB0aGUgYmFzZSBjbGFzcylcbiAgICAqIEByZXR1cm5zIFRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBsb2FkIGFuZCBzYXZlIHRvIE9SIHVuZGVmaW5lZCBpZiBubyBkYXRhIGlzIHRvIGJlIGxvYWRlZCBvciBzYXZlZCBieSB0aGUgYmFzZSBjbGFzc1xuICAgICovXG4gICAgYWJzdHJhY3Qgc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgZS5nLiBRdWlja1ZpZXcgXG4gICAgICogVGhpcyB3aWxsIGFsc28gYmUgdXNlZCBkdXJpbmcgdGhlIGJ1aWxkIGFuZCB3aWxsIGJlIGFwcGVuZGVkIHdpdGggdGhlIEJ1aWx0IFRhcmdldCBlLmcuIElERUFzcGVjdHMuUXVpY2tWaWV3XG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0VGhpc0NvbXBvbmVudE5hbWUoKTogc3RyaW5nO1xuXG5cbiAgICAvKipcbiAgICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgZmlyc3QgbWV0aG9kIG9uY2UgdGhlIGNsYXNzIGhhcyBiZWVuIGNvbnN0cnVjdGVkLCBkZWZhdWx0IGNvbnRydWN0b3IgbG9naWMgc2hvdWxkIGJlIHBsYWNlZCBoZXJlXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0dXAoKTogdm9pZDtcblxuXG4gICAgLyoqXG4gICAgICogIUlNUE9SVEFOVCAtIFRoaXMgaXMgdGhlIHNldHRpbmdzIGZvciB0aGUgd2lkZ2V0Lmpzb24gdGhhdCB3aWxsIGJlIGdlbmVyYXRlZFxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldFdpZGdldEpzb25TZXR0aW5ncygpOiBJV2lkZ2V0SnNvbjxUQ29uZmlnPjtcblxuXG5cbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRTY3JpcHRGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRTdHlsZUZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudFRlbXBsYXRlRmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50TWVudVRlbXBsYXRlRmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50Q29tcG9uZW50RmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0V2lkZ2V0RGVzaWduZXJTZXR0aW5ncygpOiBJV2lkZ2V0SnNvbkRlc2lnbmVyO1xuICAgIC8vIGFic3RyYWN0IHNldFByaW9yaXR5KCkgOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciB3aGVuIHRoZSBtb2RlbCBpcyBzYXZlZC4gTWFuaXB1bGF0ZSB0aGVcbiAgICAgKiBtb2RlbCBhcyByZXF1aXJlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgb25TYXZlKG1vZGVsOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvblNhdmVcIiwgbW9kZWwpO1xuICAgICAgICB0aGlzLmxvZyhcIlNhdmluZywgbW9kZWwgcGFzc2VkIGluIHdlIG5lZWQgdG8gcGVyc2lzdCB0b1wiLCBcImdyZWVuXCIsIHRoaXMuZGF0YSk7XG5cbiAgICAgICAgaWYgKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gbG9jYXRpb24gdG8gc2F2ZSBkYXRhIHRvIHNldCAtIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZW5cIiwgXCJyZWRcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxldCBkYXRhVG9QZXJzaXN0ID0gdGhpcy5kYXRhO1xuICAgICAgICBsZXQgY3VycmVudERhdGEgPSBnZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgICAgICBpZiAoY3VycmVudERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKGBDdXJyZW50IGRhdGEgYXQgbG9jYXRpb24gJHt0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YX0gOmAsIFwibWFnZW50YVwiLCBjdXJyZW50RGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjdXJyZW50RGF0YSkge1xuICAgICAgICAgICAgLy8gdGhpcy5sb2coXCJEYXRhIGRvZXMgbm90IGV4aXN0LCB3ZSB3aWxsIGNyZWF0ZVwiLCBcIm9yYW5nZVwiKTtcbiAgICAgICAgICAgIC8vICBzZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIHt9KTtcbiAgICAgICAgICAgIC8vIGN1cnJlbnREYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZyhgTmV3IGRhdGEgdG8gcGVyc2lzdCB0byBsb2NhdGlvbiAke3RoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhfSA6YCwgXCJibHVlXCIsIGRhdGFUb1BlcnNpc3QpO1xuICAgICAgICBzZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIGRhdGFUb1BlcnNpc3QpO1xuXG4gICAgfTtcblxuXG5cblxuICAgIG9uRGVzdHJveShtb2RlbD86IGFueSkge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uRGVzdHJveVwiKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkRlc3Ryb3lcIiwgbW9kZWwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIFVJIGZyYW1ld29yayBhZnRlciBpbml0aWFsIGNyZWF0aW9uIGFuZCBiaW5kaW5nIHRvIGxvYWQgZGF0YVxuICAgICAqIGludG8gaXQncyBtb2RlbFxuICAgICAqL1xuICAgIGxvYWRBbmRCaW5kKCkge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IGxvYWRBbmRCaW5kXCIpO1xuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSAobW9kZWw6YW55KSBwYXNzZWQgaW5cIiwgXCJncmVlblwiKTtcbiAgICAgICAgdGhpcy5sb2coXCJMb2FkaW5nIGRhdGEgYmFzZWQgb24gbG9jYXRpb24gdG8gc2F2ZVwiLCBcImdyZWVuXCIsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkxvYWRcIiwgdGhpcy5tb2RlbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIGJlZm9yZSB0aGUgbW9kZWwgaXMgc2F2ZWRcbiAgICAgKi9cbiAgICBvbkJlZm9yZVNhdmUobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkJlZm9yZVNhdmVcIik7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25CZWZvcmVTYXZlXCIsIG1vZGVsKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIGFmdGVyIHRoZSBtb2RlbCBoYXMgYmVlbiBzYXZlZC5cbiAgICAgKi9cbiAgICBvbkFmdGVyU2F2ZShtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uQWZ0ZXJTYXZlXCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uQWZ0ZXJTYXZlXCIsIG1vZGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciB3aGVuIGl0IHJlbG9hZHMgYXNwZWN0IGRhdGFcbiAgICAgKi9cbiAgICBvblJlbG9hZChtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uUmVsb2FkXCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uUmVsb2FkXCIsIG1vZGVsKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGxvZ2dpbmcgZm9yIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGRlYnVnIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBcbiAgICAgKiBAcGFyYW0gY29sb3IgXG4gICAgICogQHBhcmFtIGRhdGEgXG4gICAgICovXG4gICAgbG9nKG1lc3NhZ2U6IHN0cmluZywgY29sb3I/OiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5kZWJ1Zz8uZW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5kZWJ1Zy5sb2dUb0NvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSBjb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICAvLyBsZXQgbGluZU5vID0gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soKG5ldyBFcnJvcigpKS5zdGFjayk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjICR7dGhpcy50aGlzQ29tcG9uZW50TmFtZX0gLSAke21lc3NhZ2V9YCwgYGNvbG9yOiR7Y29sb3J9YCwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5Mb2coKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb24uZGVidWc/LmVuYWJsZWQ7XG4gICAgfVxuICAgIGxvZ1RvQ29uc29sZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuTG9nKCkgJiYgdGhpcy5jb25maWd1cmF0aW9uLmRlYnVnPy5sb2dUb0NvbnNvbGU7XG4gICAgfVxuICAgIGxvZ1RvQXNwZWN0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW5Mb2coKSAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uZGVidWc/LnNob3dJbkFzcGVjdFxuICAgIH1cblxuXG4gICAgaW5mKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwoaW5mKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdybihtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKHdybihtZXNzYWdlKSwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlcnIobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuXG4gICAgICAgIC8vZ2V0IHRoZSBwcmV2aW91cyBjYWxsZXJcblxuXG5cbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwoZXJyKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG52KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChudihuYW1lLCB2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGgxKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwobGgxKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyU2VjKCkge1xuICAgICAgICBjbGVhclNlYygpO1xuICAgIH1cblxuICAgIGwobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sb2dUb0FzcGVjdCgpKSB7XG4gICAgICAgICAgICBsZXQgYXNwZWN0TG9nT3V0cHV0ID0gdGhpcy5hc3BlY3RMb2dPdXRwdXQ7XG4gICAgICAgICAgICBpZiAoYXNwZWN0TG9nT3V0cHV0KSB7XG4gICAgICAgICAgICAgICAgYXNwZWN0TG9nT3V0cHV0LmlubmVyVGV4dCArPSBgJHttZXNzYWdlfVxcbmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRBc3BlY3RMb2dPdXRwdXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2dUb0FzcGVjdCgpKSB7IHJldHVybiB9O1xuXG4gICAgICAgIHRoaXMuYXNwZWN0TG9nT3V0cHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbGV0IGFzcGVjdExvZ091dHB1dCA9IHRoaXMuYXNwZWN0TG9nT3V0cHV0O1xuXG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5pZCA9IGBhc3BlY3RMb2dPdXRwdXQtJHt0aGlzLnVuaXF1ZUlkfWA7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBibGFja1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUucGFkZGluZyA9IFwiNXB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW4gPSBcIjVweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuaGVpZ2h0ID0gXCIyMDBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuZm9udFNpemUgPSBcIjEwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmZvbnRGYW1pbHkgPSBcIm1vbm9zcGFjZVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUud2hpdGVTcGFjZSA9IFwicHJlLXdyYXBcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLndvcmRXcmFwID0gXCJicmVhay13b3JkXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnpJbmRleCA9IFwiMTAwMFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm90dG9tID0gXCIwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUucmlnaHQgPSBcIjBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luTGVmdCA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luUmlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luVG9wID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LDI1NSwyNTUsMC44KVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1cHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnBhZGRpbmcgPSBcIjVweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm94U2hhZG93ID0gXCIwcHggMHB4IDVweCAwcHggcmdiYSgwLDAsMCwwLjc1KVwiO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudC5wcmVwZW5kKGFzcGVjdExvZ091dHB1dCk7XG5cbiAgICB9XG5cbiAgICBmaXJlRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgICAgICBsZXQgZXZlbnQ6IFNoYXJlRG9FdmVudCA9IHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogdGhpcy50aGlzQ29tcG9uZW50TmFtZSArIFwiLlwiICsgZXZlbnROYW1lLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBldmVudE5hbWUsXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH1cbiAgICAgICAgZmlyZUV2ZW50KGV2ZW50KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIEZvcm1idWlsZCBpZiBpdCBleGlzdHMgb3IgY3JlYXRlcyBpdCBpZiBpdCBkb2VzIG5vdFxuICAgICAqIFxuICAgICAqL1xuICAgIGZvcm1idWlsZGVyKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5ibGFkZT8ubW9kZWw/LmFzcGVjdERhdGE/LmZvcm1CdWlsZGVyPy5mb3JtRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIG5vdCBmb3VuZCAtIHdpbGwgY3JlYXRlIHRoZSBwYXRoXCIsIFwiYmx1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBmb3VuZFwiLCBcImdyZWVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9FbnN1cmUgdGhlIHBhdGggZXhpc3RzXG4gICAgICAgIHRoaXMuYmxhZGUgPSB0aGlzLmJsYWRlIHx8IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVGb3JtYnVpbGRlcih0aGlzLmJsYWRlLm1vZGVsKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5ibGFkZSEubW9kZWwhLmFzcGVjdERhdGEhLmZvcm1CdWlsZGVyIS5mb3JtRGF0YTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVuc3VyZXMgdGhlcmUgaXMgYSBmb3JtIGJ1aWxkZXIgaW4gdGhlIHBhc3NlZCBpbiBtb2RlbCBhbmQgcmV0dXJucyBpdFxuICAgICAqIEBwYXJhbSBtb2RlbCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBlbnN1cmVGb3JtYnVpbGRlcihtb2RlbDogYW55KTogSUZvcm1CdWlsZGVyRGF0YSB7XG5cbiAgICAgICAgaWYgKCFtb2RlbD8uYXNwZWN0RGF0YT8uZm9ybUJ1aWxkZXI/LmZvcm1EYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgbm90IGZvdW5kIC0gd2lsbCBjcmVhdGUgdGhlIHBhdGhcIiwgXCJibHVlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIGZvdW5kXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0Vuc3VyZSB0aGUgcGF0aCBleGlzdHNcblxuICAgICAgICBtb2RlbCA9IG1vZGVsIHx8IHt9O1xuICAgICAgICBtb2RlbC5hc3BlY3REYXRhID0gbW9kZWwuYXNwZWN0RGF0YSB8fCB7fTtcbiAgICAgICAgbW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlciA9IG1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIgfHwgeyBmb3JtRGF0YToge30gfTtcblxuXG4gICAgICAgIHJldHVybiBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhO1xuICAgIH1cblxuXG4gICAgZm9ybWJ1aWxkZXJGaWVsZChmb3JtYnVpbGRlckZpZWxkOiBzdHJpbmcsIHNldFZhbHVlPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5mb3JtYnVpbGRlcigpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIkZvcm0gYnVpbGRlciBkb2VzIG5vdCBleGlzdCEgXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRm9ybSBidWlsZGVyIGRvZXMgbm90IGV4aXN0IVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3VuZFZhbHVlID0gdGhpcy5mb3JtYnVpbGRlcigpW2Zvcm1idWlsZGVyRmllbGRdXG4gICAgICAgIGlmICghZm91bmRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coYEZvcm0gYnVpbGRlciBkb2VzIG5vdCBjb250YWluIGZpZWxkICR7Zm9ybWJ1aWxkZXJGaWVsZH0gYCwgXCJvcmFuZ2VcIik7XG4gICAgICAgICAgICB0aGlzLmxvZyhgQ3JlYXRpbmcgZmllbGQgJHtmb3JtYnVpbGRlckZpZWxkfSBgLCBcImJsdWVcIik7XG4gICAgICAgICAgICB0aGlzLmZvcm1idWlsZGVyKClbZm9ybWJ1aWxkZXJGaWVsZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FyZSB3ZSBkb2luZyBhIHNldFxuICAgICAgICBpZiAoc2V0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKGBTZXR0aW5nICR7Zm9ybWJ1aWxkZXJGaWVsZH0gdG8gJHtzZXRWYWx1ZX1gLCBcImdyZWVuXCIpO1xuICAgICAgICAgICAgdGhpcy5mb3JtYnVpbGRlcigpW2Zvcm1idWlsZGVyRmllbGRdID0gc2V0VmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gc2V0VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmRWYWx1ZTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIGNsYXNzIE15Q2xhc3Mge1xuXG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKCk7XG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKHAxOiBudW1iZXIpO1xuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwMTogc3RyaW5nLCBwMjogc3RyaW5nKTtcbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IocDE6IHN0cmluZywgcDI6IHN0cmluZywgcDM6IHN0cmluZyk7XG5cbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IoLi4uYXJyOiBhbnlbXSkge1xuLy8gICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMikge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3R3byBhcmd1bWVudHMgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGFyci5sZW5ndGggPT09IDMpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aHJlZSBhcmd1bWVudHMgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGFyci5sZW5ndGggPT09IDEpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbmUgYXJndW1lbnQgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyB9XG5cbi8vIGxldCB4ID0gbmV3IE15Q2xhc3MoKSIsIlxuZXhwb3J0IGludGVyZmFjZSBJRGVidWcge1xuICBzdXBwb3J0UmVxdWVzdEVuYWJsZWQ/OiBib29sZWFuO1xuICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgbG9nVG9Db25zb2xlOiBib29sZWFuO1xuICAgIHNob3dJbkFzcGVjdDogYm9vbGVhbjtcbiAgICBsaXZlQ29uZmlnPzogYm9vbGVhbjtcbiAgfVxuXG4gIGV4cG9ydCB0eXBlIE9ic2VydmFibGVJRGVidWcgPXtcbiAgICBbSyBpbiBrZXlvZiBJRGVidWddOiBrby5PYnNlcnZhYmxlPElEZWJ1Z1tLXT47XG4gIH1cblxuICBleHBvcnQgY29uc3QgREVCVUdfREVGQVVMVDogSURlYnVnID0ge1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIGxvZ1RvQ29uc29sZTogZmFsc2UsXG4gICAgc2hvd0luQXNwZWN0OiBmYWxzZVxuICB9IiwiaW1wb3J0ICogYXMga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IHsgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb24gfSBmcm9tICcuL0lXaWRnZXRKc29uJztcblxuZXhwb3J0IHR5cGUgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPiA9IHtcbiAgICBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIEFycmF5PGluZmVyIFU+ID8ga28uT2JzZXJ2YWJsZUFycmF5PE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VT4+IDpcbiAgICBUW0tdIGV4dGVuZHMgb2JqZWN0ID8ga28uT2JzZXJ2YWJsZTxOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFRbS10+PiA6XG4gICAga28uT2JzZXJ2YWJsZTxUW0tdPjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB0b09ic2VydmFibGVPYmplY3Q8VD4ob2JqOiBULCBleGlzdGluZzogTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPik6IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD4ge1xuICAgIFxuICAgIGlmKCFleGlzdGluZykgZXhpc3RpbmcgPSB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+O1xuICAgXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmIGtleSAhPT0gXCJfX2tvX21hcHBpbmdfX1wiICYmIGtleSAhPT0gXCJfaG9zdFwiKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXkgYXMga2V5b2YgVF07XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3Rpbmdba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldID0ga28ub2JzZXJ2YWJsZUFycmF5KHZhbHVlLm1hcChpdGVtID0+IHRvT2JzZXJ2YWJsZU9iamVjdChpdGVtLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiBpdGVtPikpKSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSh2YWx1ZS5tYXAoaXRlbSA9PiB0b09ic2VydmFibGVPYmplY3QoaXRlbSwge30gYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDx0eXBlb2YgaXRlbT4pKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZ1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0gPSBrby5vYnNlcnZhYmxlKHRvT2JzZXJ2YWJsZU9iamVjdCh2YWx1ZSwge30gYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDx0eXBlb2YgdmFsdWU+KSkgYXMgYW55O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0odG9PYnNlcnZhYmxlT2JqZWN0KCh2YWx1ZSBhcyBhbnkpLCAoZXhpc3Rpbmdba2V5XSgpIGFzIGFueSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3Rpbmdba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAoZXhpc3Rpbmdba2V5XSBhcyBhbnkpID0ga28ub2JzZXJ2YWJsZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSgodmFsdWUgYXMgYW55KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4aXN0aW5nIGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD47XG59XG5leHBvcnQgaW50ZXJmYWNlIElEZWJ1ZyB7XG4gICAgc3VwcG9ydFJlcXVlc3RFbmFibGVkPzogYm9vbGVhbjtcbiAgICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgICBsb2dUb0NvbnNvbGU6IGJvb2xlYW47XG4gICAgICBzaG93SW5Bc3BlY3Q6IGJvb2xlYW47XG4gICAgICBsaXZlQ29uZmlnPzogYm9vbGVhbjtcbiAgICB9XG4gIFxuXG4vLyBleHBvcnQgdHlwZSBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPiA9IFRDb25maWcgJiB7XG4vLyAgICAgZGVidWc6IElEZWJ1Zztcbi8vICAgfVxuXG4vLyBleHBvcnQgdHlwZSBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSBcbi8vIHsgW0sgaW4ga2V5b2YgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+XToga28uT2JzZXJ2YWJsZTxJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5bS10+OyB9XG5cbi8vIGV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ3VyYXRpb25Ib3N0IHtcbi8vICAgICBfaG9zdDoge1xuLy8gICAgICAgICBibGFkZTogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5BZGRFZGl0U2hhcmVkbztcbi8vICAgICAgICAgZW5hYmxlZDoga28uT2JzZXJ2YWJsZTxib29sZWFuPjsgLy8gVXNpbmcgJ2FueScgZm9yIHJldHVybiB0eXBlIGFzIGl0J3Mgbm90IGNsZWFyIHdoYXQgdGhlc2UgZnVuY3Rpb25zIHJldHVyblxuLy8gICAgICAgICBtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbztcbi8vICAgICB9XG4vLyB9XG5cbi8vIGV4cG9ydCB0eXBlIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPiA9IElDb25maWd1cmF0aW9uSG9zdCAmIElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+O1xuXG4vLyBpbnRlcmZhY2UgUm9vdE9iamVjdCB7XG4vLyAgIGwxOiBzdHJpbmc7XG4vLyAgIG8xOiBPMTtcbi8vIH1cblxuLy8gaW50ZXJmYWNlIE8xIHtcbi8vICAgbDI6IHN0cmluZztcbi8vICAgbzI6IE8yO1xuLy8gICBhMTogQTFbXTtcbi8vIH1cblxuLy8gaW50ZXJmYWNlIEExIHtcbi8vICAgbDQ6IHN0cmluZztcbi8vIH1cblxuLy8gaW50ZXJmYWNlIE8yIHtcbi8vICAgbDM6IHN0cmluZztcbi8vIH1cbi8vIC8vIE5vdyBsZXQncyB1c2UgdGhlIGZ1bmN0aW9uOlxuLy8gY29uc3QgeDogSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248Um9vdE9iamVjdD4gPSB7XG4vLyAgICAgbDE6IFwibDFcIixcbi8vICAgICBvMToge1xuLy8gICAgICAgICBsMjpcImwyXCIsXG4vLyAgICAgICAgIG8yOiB7XG4vLyAgICAgICAgICAgICBsMzogXCJsM1wiLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBhMTogW1xuLy8gICAgICAgICAgICAgeyBsNDogXCJsNFwiIH1cbi8vICAgICAgICAgXVxuLy8gICAgIH0sXG4vLyAgICAgZGVidWc6XG4vLyAgICAge1xuLy8gICAgICAgICBlbmFibGVkOiBmYWxzZSxcbi8vICAgICAgICAgbG9nVG9Db25zb2xlOiBmYWxzZSxcbi8vICAgICAgICAgc2hvd0luQXNwZWN0OiBmYWxzZVxuLy8gICAgIH1cbi8vIH1cblxuLy8gbGV0IG0gOiAgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxSb290T2JqZWN0Pj5cblxuLy8gbGV0IHkgPSB0b09ic2VydmFibGVPYmplY3QoeCx7fSBhcyBhbnkpIGFzICBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFJvb3RPYmplY3Q+PlxuXG4vLyBsZXQgcCA9IHkuZGVidWcoKS5saXZlQ29uZmlnISgpXG5cbi8vIGV4cG9ydCBmdW5jdGlvbiB0b09ic2VydmFibGVPYmplY3Qob2JqOiBhbnksIGV4aXN0aW5nT2JzZXJ2YWJsZXM/OmtvLk9ic2VydmFibGU8YW55Pik6IGtvLk9ic2VydmFibGUge1xuLy8gICAgIGNvbnN0IHJlc3VsdCA9IGV4aXN0aW5nT2JzZXJ2YWJsZXMgfHwge30gYXMga28uT2JzZXJ2YWJsZTtcblxuLy8gICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuLy8gICAgICAgICBpZihrZXkgPT09IFwiX19rb19tYXBwaW5nX19cIikgY29udGludWU7XG4vLyAgICAgICAgIGlmKGtleSA9PT0gXCJfaG9zdFwiKSBjb250aW51ZTtcblxuLy8gICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuLy8gICAgICAgICAgICAgbGV0IG5ld3YgPSBvYmpba2V5XTtcbi8vICAgICAgICAgICAgIGxldCBjdXJyID0gKHJlc3VsdCBhcyBhbnkpW2tleV0gO1xuXG4vLyAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobmV3dikgJiYgdHlwZW9mIG5ld3YgPT09IFwib2JqZWN0XCIgJiYgbmV3diAhPT0gbnVsbCAmJiAha28uaXNPYnNlcnZhYmxlKG5ld3YpKSB7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSB0b09ic2VydmFibGVPYmplY3QobmV3diBhcyBvYmplY3QpIFxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidG9PYnNlcnZhYmxlT2JqZWN0XCIsIChyZXN1bHQgYXMgYW55KVtrZXldKTtcbi8vICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IGtvLm9ic2VydmFibGUoKHJlc3VsdCBhcyBhbnkpW2tleV0pO1xuLy8gICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXd2KSkge1xuLy8gICAgICAgICAgICAgICAgIGlmIChjdXJyICYmIGtvLmlzT2JzZXJ2YWJsZUFycmF5KGN1cnIpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldKG5ld3YpO1xuLy8gICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0ga28ub2JzZXJ2YWJsZUFycmF5KG5ld3YpIGFzIGFueTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgY29udGludWU7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIGlmIChrby5pc09ic2VydmFibGUobmV3dikpIHtcbi8vICAgICAgICAgICAgICAgICBuZXd2ID0gbmV3digpOyAvLyBwdWxsIG91dCB0aGUgdmFsdWVcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgaWYgKGN1cnIgJiYga28uaXNPYnNlcnZhYmxlKGN1cnIpKSB7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0obmV3dik7IC8vIHVwZGF0ZSB0aGUgZXhpc3Rpbmcgb2JzZXJ2YWJsZVxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IGtvLm9ic2VydmFibGUobmV3dik7XG4gICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG5cbi8vICAgICByZXR1cm4gcmVzdWx0O1xuLy8gfVxuIiwiaW1wb3J0IHsgZXJyLCBpbmYsIGwgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0xvZ1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHByb3BlcnR5UGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCBwcm9wID0gcHJvcGVydGllc1tpXTtcbiAgICAgICAgaWYgKCFjdXJyZW50W3Byb3BdKSB7XG4gICAgICAgICAgICBjdXJyZW50W3Byb3BdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XG4gICAgfVxuICAgIGN1cnJlbnRbcHJvcGVydGllc1twcm9wZXJ0aWVzLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nKTogYW55IHtcbiAgICBsKGluZihgZ2V0TmVzdGVkUHJvcGVydHkoJHtwcm9wZXJ0eVBhdGh9KWApLG9iaik7XG4gICAgXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHByb3BlcnR5UGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHByb3BlcnR5IGhhcyBhbiBhcnJheSBpbmRleCwgZS5nLiwgXCJkYXRhWzBdXCJcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHByb3AubWF0Y2goL14oW2EtekEtWjAtOV9dKylcXFsoWzAtOV0rKVxcXSQvKTtcblxuICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgY29uc3QgYXJyYXlQcm9wID0gbWF0Y2hlc1sxXTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQobWF0Y2hlc1syXSwgMTApO1xuXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY3VycmVudFthcnJheVByb3BdKSB8fCBjdXJyZW50W2FycmF5UHJvcF1baW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsKGVycihgZ2V0TmVzdGVkUHJvcGVydHkoJHtwcm9wZXJ0eVBhdGh9KTogYXJyYXlQcm9wIG9yIGluZGV4IGlzIHVuZGVmaW5lZGApLG9iailcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudFthcnJheVByb3BdW2luZGV4XTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50W3Byb3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGwoZXJyKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pOiBwcm9wIGlzIHVuZGVmaW5lZGApLG9iailcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50O1xufSIsImltcG9ydCB7IElEZWZhdWx0U2V0dGluZ3MgfSBmcm9tIFwiLi4vQmFzZUNsYXNzZXMvQmFzZUlERUFzcGVjdFwiO1xuaW1wb3J0IHsgREVCVUdfREVGQVVMVCB9IGZyb20gXCIuLi9CYXNlQ2xhc3Nlcy9JRGVidWdcIjtcbmltcG9ydCB7IElXaWRnZXRKc29uIH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0lXaWRnZXRKc29uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbiB7XG4gICAgZmllbGRQYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgdGl0bGU6IHN0cmluZyB8IHVuZGVmaW5lZFxuICAgIHZhbHVlT25Ob3RGb3VuZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGNhbGN1bGF0ZWRWYWx1ZTogc3RyaW5nO1xuICAgIGNhbGN1bGF0ZWRUaXRsZTogc3RyaW5nO1xuICAgIHNlYXJjaFBhcmVudHM6IGJvb2xlYW4gfCB1bmRlZmluZWQsXG4gICAgbWF4RGVwdGg6IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBmb3JtYXR0ZXI6IHN0cmluZyB8IHVuZGVmaW5lZCxcbn1cblxuXG5leHBvcnQgY29uc3QgRGVmYXVsdDogSURlZmF1bHRTZXR0aW5nczxJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uPiA9IHtcbiAgICBmaWVsZFBhdGg6IFwiVGl0bGVcIixcbiAgICB0aXRsZTogXCJUaXRsZSBWYWx1ZVwiLFxuICAgIGNhbGN1bGF0ZWRWYWx1ZTogXCJcIixcbiAgICBjYWxjdWxhdGVkVGl0bGU6IFwiXCIsXG4gICAgdmFsdWVPbk5vdEZvdW5kOiBcIk5vdCBGb3VuZFwiLFxuICAgIHNlYXJjaFBhcmVudHM6IGZhbHNlLFxuICAgIG1heERlcHRoOiAwLFxuICAgIGZvcm1hdHRlcjogXCJ2YWx1ZVwiLFxuICAgIGRlYnVnOiBERUJVR19ERUZBVUxULFxuICAgIGV2ZW50c1RvUmVhY3RUbzogW1xuICAgICAgICB7XG4gICAgICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby5jb3JlLmNhc2UucGhhc2UtY2hhbmdlZFwiLFxuICAgICAgICAgICAgbWV0aG9kVG9DYWxsOiBcImxvYWRBbmRCaW5kXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZXZlbnRQYXRoOiBcInNoYXJlZG8uY29yZS5jYXNlLmZvcm1zLnBoYXNlLnBoYXNlLWNoYW5nZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLnVwZGF0ZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLmNvcmUuY2FzZS5zaGFyZWRvLXVwZGF0ZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH1cbiAgICBdXG59XG5cbmV4cG9ydCBjb25zdCBXaWRnZXRTZXR0aW5ncyA6IElXaWRnZXRKc29uPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+ID17XG4gICAgdHlwZTogXCJ3aWRnZXRcIixcbiAgICBcInByaW9yaXR5XCI6IDYwMDAsXG4gICAgXCJkZXNpZ25lclwiOiB7XG4gICAgICAgIFwiYWxsb3dJblBvcnRhbERlc2lnbmVyXCI6IGZhbHNlLFxuICAgICAgICBcImFsbG93SW5TaGFyZWRvUG9ydGFsRGVzaWduZXJcIjogZmFsc2UsXG4gICAgICAgIFwiYWxsb3dBc3BlY3RBZGFwdGVyXCI6IHRydWUsXG4gICAgICAgIFwidGl0bGVcIjogXCJTaW5nbGUgVmFsdWUgQXNwZWN0XCIsXG4gICAgICAgIFwiaWNvblwiOiBcImZhLWNvZ1wiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiU2luZ2xlIFZhbHVlIEFzcGVjdFwiLFxuICAgICAgICBcImNhdGVnb3JpZXNcIjogW10sXG4gICAgICAgIFwiaXNDb25maWd1cmFibGVcIjogdHJ1ZSxcbiAgICAgICAgXCJjb25maWd1cmF0aW9uV2lkZ2V0XCI6IG51bGwsXG4gICAgICAgIFwiZGVmYXVsdENvbmZpZ3VyYXRpb25Kc29uXCI6IERlZmF1bHRcbiAgICB9LFxuICAgIFwic2NyaXB0c1wiOiBbXG4gICAgXSxcbiAgICBcInN0eWxlc1wiOiBbXG4gICAgICAgIFwiU2luZ2xlVmFsdWVBc3BlY3QuY3NzXCJcbiAgICBdLFxuICAgIFwidGVtcGxhdGVzXCI6IFtcbiAgICAgICAgXCJTaW5nbGVWYWx1ZUFzcGVjdC5odG1sXCJcbiAgICBdLFxuICAgIFwibWVudVRlbXBsYXRlc1wiOiBbXSxcbiAgICBcImNvbXBvbmVudHNcIjogW11cbn0iLCJcblxuLyoqXG4gKiAqIEZvcm1hdCBhIHZhbHVlIHVzaW5nIGEgZm9ybWF0dGVyIHN0cmluZ1xuICogKiBFeGFtcGxlczogXG4gKiAqIDEuIHZhbHVlXG4gKiAqIDIuIHZhbHVlLnRvVXBwZXJDYXNlKClcbiAqICogMy4gdmFsdWUgPyB2YWx1ZS50b1VwcGVyQ2FzZSgpIDogXCJcIlxuICogKiA0LiB2YWx1ZSA/IHZhbHVlLnRvVXBwZXJDYXNlKCkgOiBcIk5vIFZhbHVlXCJcbiAqICogNS4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlRGF0ZVN0cmluZygpXG4gKiAqIDYuIHZhbHVlID8gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlRGF0ZVN0cmluZygpIDogXCJcIlxuICogQHBhcmFtIHZhbHVlIFxuICogQHBhcmFtIGZvcm1hdHRlciBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VmFsdWUodmFsdWU6IGFueSwgZm9ybWF0dGVyOiBzdHJpbmcpOiBhbnkge1xuICAgIC8vIENyZWF0ZSBhIG5ldyBmdW5jdGlvbiBiYXNlZCBvbiB0aGUgZm9ybWF0dGVyXG4gICAgY29uc3QgZHluYW1pY0Z1bmMgPSBuZXcgRnVuY3Rpb24oJ3ZhbHVlJywgYHJldHVybiAoJHtmb3JtYXR0ZXJ9KTtgKTtcbiAgICAvLyBJbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGdpdmVuIHZhbHVlXG4gICAgbGV0IHJldHVyblZhbHVlOiBhbnk7XG4gICAgdHJ5e1xuICAgICByZXR1cm5WYWx1ZSA9IGR5bmFtaWNGdW5jKHZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2goZSlcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBFcnJvciBmb3JtYXR0aW5nIHZhbHVlIFske3ZhbHVlfV0gd2l0aCBmb3JtYXR0ZXIgWyR7Zm9ybWF0dGVyfV1gLCBlKTtcbiAgICAgICAgcmV0dXJuVmFsdWUgPSBcIkVycm9yIGZvcm1hdHRpbmcgdmFsdWUgLSBzZWUgY29uc29sZVwiXG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxuZXhwb3J0IGNvbnN0IGZvcm1hdEZ1bmMgPSBmb3JtYXRWYWx1ZTsgLy8gRm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IiwiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwibW9kdWxlLmV4cG9ydHMgPSBrbzsiLCJpbXBvcnQgYW5zaVN0eWxlcyBmcm9tICcjYW5zaS1zdHlsZXMnO1xuaW1wb3J0IHN1cHBvcnRzQ29sb3IgZnJvbSAnI3N1cHBvcnRzLWNvbG9yJztcbmltcG9ydCB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L29yZGVyXG5cdHN0cmluZ1JlcGxhY2VBbGwsXG5cdHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleCxcbn0gZnJvbSAnLi91dGlsaXRpZXMuanMnO1xuXG5jb25zdCB7c3Rkb3V0OiBzdGRvdXRDb2xvciwgc3RkZXJyOiBzdGRlcnJDb2xvcn0gPSBzdXBwb3J0c0NvbG9yO1xuXG5jb25zdCBHRU5FUkFUT1IgPSBTeW1ib2woJ0dFTkVSQVRPUicpO1xuY29uc3QgU1RZTEVSID0gU3ltYm9sKCdTVFlMRVInKTtcbmNvbnN0IElTX0VNUFRZID0gU3ltYm9sKCdJU19FTVBUWScpO1xuXG4vLyBgc3VwcG9ydHNDb2xvci5sZXZlbGAg4oaSIGBhbnNpU3R5bGVzLmNvbG9yW25hbWVdYCBtYXBwaW5nXG5jb25zdCBsZXZlbE1hcHBpbmcgPSBbXG5cdCdhbnNpJyxcblx0J2Fuc2knLFxuXHQnYW5zaTI1NicsXG5cdCdhbnNpMTZtJyxcbl07XG5cbmNvbnN0IHN0eWxlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbmNvbnN0IGFwcGx5T3B0aW9ucyA9IChvYmplY3QsIG9wdGlvbnMgPSB7fSkgPT4ge1xuXHRpZiAob3B0aW9ucy5sZXZlbCAmJiAhKE51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sZXZlbCkgJiYgb3B0aW9ucy5sZXZlbCA+PSAwICYmIG9wdGlvbnMubGV2ZWwgPD0gMykpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgbGV2ZWxgIG9wdGlvbiBzaG91bGQgYmUgYW4gaW50ZWdlciBmcm9tIDAgdG8gMycpO1xuXHR9XG5cblx0Ly8gRGV0ZWN0IGxldmVsIGlmIG5vdCBzZXQgbWFudWFsbHlcblx0Y29uc3QgY29sb3JMZXZlbCA9IHN0ZG91dENvbG9yID8gc3Rkb3V0Q29sb3IubGV2ZWwgOiAwO1xuXHRvYmplY3QubGV2ZWwgPSBvcHRpb25zLmxldmVsID09PSB1bmRlZmluZWQgPyBjb2xvckxldmVsIDogb3B0aW9ucy5sZXZlbDtcbn07XG5cbmV4cG9ydCBjbGFzcyBDaGFsayB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RydWN0b3ItcmV0dXJuXG5cdFx0cmV0dXJuIGNoYWxrRmFjdG9yeShvcHRpb25zKTtcblx0fVxufVxuXG5jb25zdCBjaGFsa0ZhY3RvcnkgPSBvcHRpb25zID0+IHtcblx0Y29uc3QgY2hhbGsgPSAoLi4uc3RyaW5ncykgPT4gc3RyaW5ncy5qb2luKCcgJyk7XG5cdGFwcGx5T3B0aW9ucyhjaGFsaywgb3B0aW9ucyk7XG5cblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKGNoYWxrLCBjcmVhdGVDaGFsay5wcm90b3R5cGUpO1xuXG5cdHJldHVybiBjaGFsaztcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoYWxrKG9wdGlvbnMpIHtcblx0cmV0dXJuIGNoYWxrRmFjdG9yeShvcHRpb25zKTtcbn1cblxuT2JqZWN0LnNldFByb3RvdHlwZU9mKGNyZWF0ZUNoYWxrLnByb3RvdHlwZSwgRnVuY3Rpb24ucHJvdG90eXBlKTtcblxuZm9yIChjb25zdCBbc3R5bGVOYW1lLCBzdHlsZV0gb2YgT2JqZWN0LmVudHJpZXMoYW5zaVN0eWxlcykpIHtcblx0c3R5bGVzW3N0eWxlTmFtZV0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIodGhpcywgY3JlYXRlU3R5bGVyKHN0eWxlLm9wZW4sIHN0eWxlLmNsb3NlLCB0aGlzW1NUWUxFUl0pLCB0aGlzW0lTX0VNUFRZXSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgc3R5bGVOYW1lLCB7dmFsdWU6IGJ1aWxkZXJ9KTtcblx0XHRcdHJldHVybiBidWlsZGVyO1xuXHRcdH0sXG5cdH07XG59XG5cbnN0eWxlcy52aXNpYmxlID0ge1xuXHRnZXQoKSB7XG5cdFx0Y29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIodGhpcywgdGhpc1tTVFlMRVJdLCB0cnVlKTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Zpc2libGUnLCB7dmFsdWU6IGJ1aWxkZXJ9KTtcblx0XHRyZXR1cm4gYnVpbGRlcjtcblx0fSxcbn07XG5cbmNvbnN0IGdldE1vZGVsQW5zaSA9IChtb2RlbCwgbGV2ZWwsIHR5cGUsIC4uLmFyZ3VtZW50c18pID0+IHtcblx0aWYgKG1vZGVsID09PSAncmdiJykge1xuXHRcdGlmIChsZXZlbCA9PT0gJ2Fuc2kxNm0nKSB7XG5cdFx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpMTZtKC4uLmFyZ3VtZW50c18pO1xuXHRcdH1cblxuXHRcdGlmIChsZXZlbCA9PT0gJ2Fuc2kyNTYnKSB7XG5cdFx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpMjU2KGFuc2lTdHlsZXMucmdiVG9BbnNpMjU2KC4uLmFyZ3VtZW50c18pKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpKGFuc2lTdHlsZXMucmdiVG9BbnNpKC4uLmFyZ3VtZW50c18pKTtcblx0fVxuXG5cdGlmIChtb2RlbCA9PT0gJ2hleCcpIHtcblx0XHRyZXR1cm4gZ2V0TW9kZWxBbnNpKCdyZ2InLCBsZXZlbCwgdHlwZSwgLi4uYW5zaVN0eWxlcy5oZXhUb1JnYiguLi5hcmd1bWVudHNfKSk7XG5cdH1cblxuXHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXVttb2RlbF0oLi4uYXJndW1lbnRzXyk7XG59O1xuXG5jb25zdCB1c2VkTW9kZWxzID0gWydyZ2InLCAnaGV4JywgJ2Fuc2kyNTYnXTtcblxuZm9yIChjb25zdCBtb2RlbCBvZiB1c2VkTW9kZWxzKSB7XG5cdHN0eWxlc1ttb2RlbF0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3Qge2xldmVsfSA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVyID0gY3JlYXRlU3R5bGVyKGdldE1vZGVsQW5zaShtb2RlbCwgbGV2ZWxNYXBwaW5nW2xldmVsXSwgJ2NvbG9yJywgLi4uYXJndW1lbnRzXyksIGFuc2lTdHlsZXMuY29sb3IuY2xvc2UsIHRoaXNbU1RZTEVSXSk7XG5cdFx0XHRcdHJldHVybiBjcmVhdGVCdWlsZGVyKHRoaXMsIHN0eWxlciwgdGhpc1tJU19FTVBUWV0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXHR9O1xuXG5cdGNvbnN0IGJnTW9kZWwgPSAnYmcnICsgbW9kZWxbMF0udG9VcHBlckNhc2UoKSArIG1vZGVsLnNsaWNlKDEpO1xuXHRzdHlsZXNbYmdNb2RlbF0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3Qge2xldmVsfSA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVyID0gY3JlYXRlU3R5bGVyKGdldE1vZGVsQW5zaShtb2RlbCwgbGV2ZWxNYXBwaW5nW2xldmVsXSwgJ2JnQ29sb3InLCAuLi5hcmd1bWVudHNfKSwgYW5zaVN0eWxlcy5iZ0NvbG9yLmNsb3NlLCB0aGlzW1NUWUxFUl0pO1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlQnVpbGRlcih0aGlzLCBzdHlsZXIsIHRoaXNbSVNfRU1QVFldKTtcblx0XHRcdH07XG5cdFx0fSxcblx0fTtcbn1cblxuY29uc3QgcHJvdG8gPSBPYmplY3QuZGVmaW5lUHJvcGVydGllcygoKSA9PiB7fSwge1xuXHQuLi5zdHlsZXMsXG5cdGxldmVsOiB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tHRU5FUkFUT1JdLmxldmVsO1xuXHRcdH0sXG5cdFx0c2V0KGxldmVsKSB7XG5cdFx0XHR0aGlzW0dFTkVSQVRPUl0ubGV2ZWwgPSBsZXZlbDtcblx0XHR9LFxuXHR9LFxufSk7XG5cbmNvbnN0IGNyZWF0ZVN0eWxlciA9IChvcGVuLCBjbG9zZSwgcGFyZW50KSA9PiB7XG5cdGxldCBvcGVuQWxsO1xuXHRsZXQgY2xvc2VBbGw7XG5cdGlmIChwYXJlbnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wZW5BbGwgPSBvcGVuO1xuXHRcdGNsb3NlQWxsID0gY2xvc2U7XG5cdH0gZWxzZSB7XG5cdFx0b3BlbkFsbCA9IHBhcmVudC5vcGVuQWxsICsgb3Blbjtcblx0XHRjbG9zZUFsbCA9IGNsb3NlICsgcGFyZW50LmNsb3NlQWxsO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRvcGVuLFxuXHRcdGNsb3NlLFxuXHRcdG9wZW5BbGwsXG5cdFx0Y2xvc2VBbGwsXG5cdFx0cGFyZW50LFxuXHR9O1xufTtcblxuY29uc3QgY3JlYXRlQnVpbGRlciA9IChzZWxmLCBfc3R5bGVyLCBfaXNFbXB0eSkgPT4ge1xuXHQvLyBTaW5nbGUgYXJndW1lbnQgaXMgaG90IHBhdGgsIGltcGxpY2l0IGNvZXJjaW9uIGlzIGZhc3RlciB0aGFuIGFueXRoaW5nXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1pbXBsaWNpdC1jb2VyY2lvblxuXHRjb25zdCBidWlsZGVyID0gKC4uLmFyZ3VtZW50c18pID0+IGFwcGx5U3R5bGUoYnVpbGRlciwgKGFyZ3VtZW50c18ubGVuZ3RoID09PSAxKSA/ICgnJyArIGFyZ3VtZW50c19bMF0pIDogYXJndW1lbnRzXy5qb2luKCcgJykpO1xuXG5cdC8vIFdlIGFsdGVyIHRoZSBwcm90b3R5cGUgYmVjYXVzZSB3ZSBtdXN0IHJldHVybiBhIGZ1bmN0aW9uLCBidXQgdGhlcmUgaXNcblx0Ly8gbm8gd2F5IHRvIGNyZWF0ZSBhIGZ1bmN0aW9uIHdpdGggYSBkaWZmZXJlbnQgcHJvdG90eXBlXG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZihidWlsZGVyLCBwcm90byk7XG5cblx0YnVpbGRlcltHRU5FUkFUT1JdID0gc2VsZjtcblx0YnVpbGRlcltTVFlMRVJdID0gX3N0eWxlcjtcblx0YnVpbGRlcltJU19FTVBUWV0gPSBfaXNFbXB0eTtcblxuXHRyZXR1cm4gYnVpbGRlcjtcbn07XG5cbmNvbnN0IGFwcGx5U3R5bGUgPSAoc2VsZiwgc3RyaW5nKSA9PiB7XG5cdGlmIChzZWxmLmxldmVsIDw9IDAgfHwgIXN0cmluZykge1xuXHRcdHJldHVybiBzZWxmW0lTX0VNUFRZXSA/ICcnIDogc3RyaW5nO1xuXHR9XG5cblx0bGV0IHN0eWxlciA9IHNlbGZbU1RZTEVSXTtcblxuXHRpZiAoc3R5bGVyID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gc3RyaW5nO1xuXHR9XG5cblx0Y29uc3Qge29wZW5BbGwsIGNsb3NlQWxsfSA9IHN0eWxlcjtcblx0aWYgKHN0cmluZy5pbmNsdWRlcygnXFx1MDAxQicpKSB7XG5cdFx0d2hpbGUgKHN0eWxlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyBSZXBsYWNlIGFueSBpbnN0YW5jZXMgYWxyZWFkeSBwcmVzZW50IHdpdGggYSByZS1vcGVuaW5nIGNvZGVcblx0XHRcdC8vIG90aGVyd2lzZSBvbmx5IHRoZSBwYXJ0IG9mIHRoZSBzdHJpbmcgdW50aWwgc2FpZCBjbG9zaW5nIGNvZGVcblx0XHRcdC8vIHdpbGwgYmUgY29sb3JlZCwgYW5kIHRoZSByZXN0IHdpbGwgc2ltcGx5IGJlICdwbGFpbicuXG5cdFx0XHRzdHJpbmcgPSBzdHJpbmdSZXBsYWNlQWxsKHN0cmluZywgc3R5bGVyLmNsb3NlLCBzdHlsZXIub3Blbik7XG5cblx0XHRcdHN0eWxlciA9IHN0eWxlci5wYXJlbnQ7XG5cdFx0fVxuXHR9XG5cblx0Ly8gV2UgY2FuIG1vdmUgYm90aCBuZXh0IGFjdGlvbnMgb3V0IG9mIGxvb3AsIGJlY2F1c2UgcmVtYWluaW5nIGFjdGlvbnMgaW4gbG9vcCB3b24ndCBoYXZlXG5cdC8vIGFueS92aXNpYmxlIGVmZmVjdCBvbiBwYXJ0cyB3ZSBhZGQgaGVyZS4gQ2xvc2UgdGhlIHN0eWxpbmcgYmVmb3JlIGEgbGluZWJyZWFrIGFuZCByZW9wZW5cblx0Ly8gYWZ0ZXIgbmV4dCBsaW5lIHRvIGZpeCBhIGJsZWVkIGlzc3VlIG9uIG1hY09TOiBodHRwczovL2dpdGh1Yi5jb20vY2hhbGsvY2hhbGsvcHVsbC85MlxuXHRjb25zdCBsZkluZGV4ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicpO1xuXHRpZiAobGZJbmRleCAhPT0gLTEpIHtcblx0XHRzdHJpbmcgPSBzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgoc3RyaW5nLCBjbG9zZUFsbCwgb3BlbkFsbCwgbGZJbmRleCk7XG5cdH1cblxuXHRyZXR1cm4gb3BlbkFsbCArIHN0cmluZyArIGNsb3NlQWxsO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY3JlYXRlQ2hhbGsucHJvdG90eXBlLCBzdHlsZXMpO1xuXG5jb25zdCBjaGFsayA9IGNyZWF0ZUNoYWxrKCk7XG5leHBvcnQgY29uc3QgY2hhbGtTdGRlcnIgPSBjcmVhdGVDaGFsayh7bGV2ZWw6IHN0ZGVyckNvbG9yID8gc3RkZXJyQ29sb3IubGV2ZWwgOiAwfSk7XG5cbmV4cG9ydCB7XG5cdG1vZGlmaWVyTmFtZXMsXG5cdGZvcmVncm91bmRDb2xvck5hbWVzLFxuXHRiYWNrZ3JvdW5kQ29sb3JOYW1lcyxcblx0Y29sb3JOYW1lcyxcblxuXHQvLyBUT0RPOiBSZW1vdmUgdGhlc2UgYWxpYXNlcyBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uXG5cdG1vZGlmaWVyTmFtZXMgYXMgbW9kaWZpZXJzLFxuXHRmb3JlZ3JvdW5kQ29sb3JOYW1lcyBhcyBmb3JlZ3JvdW5kQ29sb3JzLFxuXHRiYWNrZ3JvdW5kQ29sb3JOYW1lcyBhcyBiYWNrZ3JvdW5kQ29sb3JzLFxuXHRjb2xvck5hbWVzIGFzIGNvbG9ycyxcbn0gZnJvbSAnLi92ZW5kb3IvYW5zaS1zdHlsZXMvaW5kZXguanMnO1xuXG5leHBvcnQge1xuXHRzdGRvdXRDb2xvciBhcyBzdXBwb3J0c0NvbG9yLFxuXHRzdGRlcnJDb2xvciBhcyBzdXBwb3J0c0NvbG9yU3RkZXJyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2hhbGs7XG4iLCIvLyBUT0RPOiBXaGVuIHRhcmdldGluZyBOb2RlLmpzIDE2LCB1c2UgYFN0cmluZy5wcm90b3R5cGUucmVwbGFjZUFsbGAuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nUmVwbGFjZUFsbChzdHJpbmcsIHN1YnN0cmluZywgcmVwbGFjZXIpIHtcblx0bGV0IGluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc3Vic3RyaW5nKTtcblx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdHJldHVybiBzdHJpbmc7XG5cdH1cblxuXHRjb25zdCBzdWJzdHJpbmdMZW5ndGggPSBzdWJzdHJpbmcubGVuZ3RoO1xuXHRsZXQgZW5kSW5kZXggPSAwO1xuXHRsZXQgcmV0dXJuVmFsdWUgPSAnJztcblx0ZG8ge1xuXHRcdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCwgaW5kZXgpICsgc3Vic3RyaW5nICsgcmVwbGFjZXI7XG5cdFx0ZW5kSW5kZXggPSBpbmRleCArIHN1YnN0cmluZ0xlbmd0aDtcblx0XHRpbmRleCA9IHN0cmluZy5pbmRleE9mKHN1YnN0cmluZywgZW5kSW5kZXgpO1xuXHR9IHdoaWxlIChpbmRleCAhPT0gLTEpO1xuXG5cdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCk7XG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleChzdHJpbmcsIHByZWZpeCwgcG9zdGZpeCwgaW5kZXgpIHtcblx0bGV0IGVuZEluZGV4ID0gMDtcblx0bGV0IHJldHVyblZhbHVlID0gJyc7XG5cdGRvIHtcblx0XHRjb25zdCBnb3RDUiA9IHN0cmluZ1tpbmRleCAtIDFdID09PSAnXFxyJztcblx0XHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgsIChnb3RDUiA/IGluZGV4IC0gMSA6IGluZGV4KSkgKyBwcmVmaXggKyAoZ290Q1IgPyAnXFxyXFxuJyA6ICdcXG4nKSArIHBvc3RmaXg7XG5cdFx0ZW5kSW5kZXggPSBpbmRleCArIDE7XG5cdFx0aW5kZXggPSBzdHJpbmcuaW5kZXhPZignXFxuJywgZW5kSW5kZXgpO1xuXHR9IHdoaWxlIChpbmRleCAhPT0gLTEpO1xuXG5cdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCk7XG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn1cbiIsImNvbnN0IEFOU0lfQkFDS0dST1VORF9PRkZTRVQgPSAxMDtcblxuY29uc3Qgd3JhcEFuc2kxNiA9IChvZmZzZXQgPSAwKSA9PiBjb2RlID0+IGBcXHUwMDFCWyR7Y29kZSArIG9mZnNldH1tYDtcblxuY29uc3Qgd3JhcEFuc2kyNTYgPSAob2Zmc2V0ID0gMCkgPT4gY29kZSA9PiBgXFx1MDAxQlskezM4ICsgb2Zmc2V0fTs1OyR7Y29kZX1tYDtcblxuY29uc3Qgd3JhcEFuc2kxNm0gPSAob2Zmc2V0ID0gMCkgPT4gKHJlZCwgZ3JlZW4sIGJsdWUpID0+IGBcXHUwMDFCWyR7MzggKyBvZmZzZXR9OzI7JHtyZWR9OyR7Z3JlZW59OyR7Ymx1ZX1tYDtcblxuY29uc3Qgc3R5bGVzID0ge1xuXHRtb2RpZmllcjoge1xuXHRcdHJlc2V0OiBbMCwgMF0sXG5cdFx0Ly8gMjEgaXNuJ3Qgd2lkZWx5IHN1cHBvcnRlZCBhbmQgMjIgZG9lcyB0aGUgc2FtZSB0aGluZ1xuXHRcdGJvbGQ6IFsxLCAyMl0sXG5cdFx0ZGltOiBbMiwgMjJdLFxuXHRcdGl0YWxpYzogWzMsIDIzXSxcblx0XHR1bmRlcmxpbmU6IFs0LCAyNF0sXG5cdFx0b3ZlcmxpbmU6IFs1MywgNTVdLFxuXHRcdGludmVyc2U6IFs3LCAyN10sXG5cdFx0aGlkZGVuOiBbOCwgMjhdLFxuXHRcdHN0cmlrZXRocm91Z2g6IFs5LCAyOV0sXG5cdH0sXG5cdGNvbG9yOiB7XG5cdFx0YmxhY2s6IFszMCwgMzldLFxuXHRcdHJlZDogWzMxLCAzOV0sXG5cdFx0Z3JlZW46IFszMiwgMzldLFxuXHRcdHllbGxvdzogWzMzLCAzOV0sXG5cdFx0Ymx1ZTogWzM0LCAzOV0sXG5cdFx0bWFnZW50YTogWzM1LCAzOV0sXG5cdFx0Y3lhbjogWzM2LCAzOV0sXG5cdFx0d2hpdGU6IFszNywgMzldLFxuXG5cdFx0Ly8gQnJpZ2h0IGNvbG9yXG5cdFx0YmxhY2tCcmlnaHQ6IFs5MCwgMzldLFxuXHRcdGdyYXk6IFs5MCwgMzldLCAvLyBBbGlhcyBvZiBgYmxhY2tCcmlnaHRgXG5cdFx0Z3JleTogWzkwLCAzOV0sIC8vIEFsaWFzIG9mIGBibGFja0JyaWdodGBcblx0XHRyZWRCcmlnaHQ6IFs5MSwgMzldLFxuXHRcdGdyZWVuQnJpZ2h0OiBbOTIsIDM5XSxcblx0XHR5ZWxsb3dCcmlnaHQ6IFs5MywgMzldLFxuXHRcdGJsdWVCcmlnaHQ6IFs5NCwgMzldLFxuXHRcdG1hZ2VudGFCcmlnaHQ6IFs5NSwgMzldLFxuXHRcdGN5YW5CcmlnaHQ6IFs5NiwgMzldLFxuXHRcdHdoaXRlQnJpZ2h0OiBbOTcsIDM5XSxcblx0fSxcblx0YmdDb2xvcjoge1xuXHRcdGJnQmxhY2s6IFs0MCwgNDldLFxuXHRcdGJnUmVkOiBbNDEsIDQ5XSxcblx0XHRiZ0dyZWVuOiBbNDIsIDQ5XSxcblx0XHRiZ1llbGxvdzogWzQzLCA0OV0sXG5cdFx0YmdCbHVlOiBbNDQsIDQ5XSxcblx0XHRiZ01hZ2VudGE6IFs0NSwgNDldLFxuXHRcdGJnQ3lhbjogWzQ2LCA0OV0sXG5cdFx0YmdXaGl0ZTogWzQ3LCA0OV0sXG5cblx0XHQvLyBCcmlnaHQgY29sb3Jcblx0XHRiZ0JsYWNrQnJpZ2h0OiBbMTAwLCA0OV0sXG5cdFx0YmdHcmF5OiBbMTAwLCA0OV0sIC8vIEFsaWFzIG9mIGBiZ0JsYWNrQnJpZ2h0YFxuXHRcdGJnR3JleTogWzEwMCwgNDldLCAvLyBBbGlhcyBvZiBgYmdCbGFja0JyaWdodGBcblx0XHRiZ1JlZEJyaWdodDogWzEwMSwgNDldLFxuXHRcdGJnR3JlZW5CcmlnaHQ6IFsxMDIsIDQ5XSxcblx0XHRiZ1llbGxvd0JyaWdodDogWzEwMywgNDldLFxuXHRcdGJnQmx1ZUJyaWdodDogWzEwNCwgNDldLFxuXHRcdGJnTWFnZW50YUJyaWdodDogWzEwNSwgNDldLFxuXHRcdGJnQ3lhbkJyaWdodDogWzEwNiwgNDldLFxuXHRcdGJnV2hpdGVCcmlnaHQ6IFsxMDcsIDQ5XSxcblx0fSxcbn07XG5cbmV4cG9ydCBjb25zdCBtb2RpZmllck5hbWVzID0gT2JqZWN0LmtleXMoc3R5bGVzLm1vZGlmaWVyKTtcbmV4cG9ydCBjb25zdCBmb3JlZ3JvdW5kQ29sb3JOYW1lcyA9IE9iamVjdC5rZXlzKHN0eWxlcy5jb2xvcik7XG5leHBvcnQgY29uc3QgYmFja2dyb3VuZENvbG9yTmFtZXMgPSBPYmplY3Qua2V5cyhzdHlsZXMuYmdDb2xvcik7XG5leHBvcnQgY29uc3QgY29sb3JOYW1lcyA9IFsuLi5mb3JlZ3JvdW5kQ29sb3JOYW1lcywgLi4uYmFja2dyb3VuZENvbG9yTmFtZXNdO1xuXG5mdW5jdGlvbiBhc3NlbWJsZVN0eWxlcygpIHtcblx0Y29uc3QgY29kZXMgPSBuZXcgTWFwKCk7XG5cblx0Zm9yIChjb25zdCBbZ3JvdXBOYW1lLCBncm91cF0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVzKSkge1xuXHRcdGZvciAoY29uc3QgW3N0eWxlTmFtZSwgc3R5bGVdIG9mIE9iamVjdC5lbnRyaWVzKGdyb3VwKSkge1xuXHRcdFx0c3R5bGVzW3N0eWxlTmFtZV0gPSB7XG5cdFx0XHRcdG9wZW46IGBcXHUwMDFCWyR7c3R5bGVbMF19bWAsXG5cdFx0XHRcdGNsb3NlOiBgXFx1MDAxQlske3N0eWxlWzFdfW1gLFxuXHRcdFx0fTtcblxuXHRcdFx0Z3JvdXBbc3R5bGVOYW1lXSA9IHN0eWxlc1tzdHlsZU5hbWVdO1xuXG5cdFx0XHRjb2Rlcy5zZXQoc3R5bGVbMF0sIHN0eWxlWzFdKTtcblx0XHR9XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoc3R5bGVzLCBncm91cE5hbWUsIHtcblx0XHRcdHZhbHVlOiBncm91cCxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0pO1xuXHR9XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgJ2NvZGVzJywge1xuXHRcdHZhbHVlOiBjb2Rlcyxcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0fSk7XG5cblx0c3R5bGVzLmNvbG9yLmNsb3NlID0gJ1xcdTAwMUJbMzltJztcblx0c3R5bGVzLmJnQ29sb3IuY2xvc2UgPSAnXFx1MDAxQls0OW0nO1xuXG5cdHN0eWxlcy5jb2xvci5hbnNpID0gd3JhcEFuc2kxNigpO1xuXHRzdHlsZXMuY29sb3IuYW5zaTI1NiA9IHdyYXBBbnNpMjU2KCk7XG5cdHN0eWxlcy5jb2xvci5hbnNpMTZtID0gd3JhcEFuc2kxNm0oKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaSA9IHdyYXBBbnNpMTYoQU5TSV9CQUNLR1JPVU5EX09GRlNFVCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kyNTYgPSB3cmFwQW5zaTI1NihBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaTE2bSA9IHdyYXBBbnNpMTZtKEFOU0lfQkFDS0dST1VORF9PRkZTRVQpO1xuXG5cdC8vIEZyb20gaHR0cHM6Ly9naXRodWIuY29tL1FpeC0vY29sb3ItY29udmVydC9ibG9iLzNmMGUwZDRlOTJlMjM1Nzk2Y2NiMTdmNmU4NWM3MjA5NGE2NTFmNDkvY29udmVyc2lvbnMuanNcblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc3R5bGVzLCB7XG5cdFx0cmdiVG9BbnNpMjU2OiB7XG5cdFx0XHR2YWx1ZShyZWQsIGdyZWVuLCBibHVlKSB7XG5cdFx0XHRcdC8vIFdlIHVzZSB0aGUgZXh0ZW5kZWQgZ3JleXNjYWxlIHBhbGV0dGUgaGVyZSwgd2l0aCB0aGUgZXhjZXB0aW9uIG9mXG5cdFx0XHRcdC8vIGJsYWNrIGFuZCB3aGl0ZS4gbm9ybWFsIHBhbGV0dGUgb25seSBoYXMgNCBncmV5c2NhbGUgc2hhZGVzLlxuXHRcdFx0XHRpZiAocmVkID09PSBncmVlbiAmJiBncmVlbiA9PT0gYmx1ZSkge1xuXHRcdFx0XHRcdGlmIChyZWQgPCA4KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMTY7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHJlZCA+IDI0OCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDIzMTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCgoKHJlZCAtIDgpIC8gMjQ3KSAqIDI0KSArIDIzMjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAxNlxuXHRcdFx0XHRcdCsgKDM2ICogTWF0aC5yb3VuZChyZWQgLyAyNTUgKiA1KSlcblx0XHRcdFx0XHQrICg2ICogTWF0aC5yb3VuZChncmVlbiAvIDI1NSAqIDUpKVxuXHRcdFx0XHRcdCsgTWF0aC5yb3VuZChibHVlIC8gMjU1ICogNSk7XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRoZXhUb1JnYjoge1xuXHRcdFx0dmFsdWUoaGV4KSB7XG5cdFx0XHRcdGNvbnN0IG1hdGNoZXMgPSAvW2EtZlxcZF17Nn18W2EtZlxcZF17M30vaS5leGVjKGhleC50b1N0cmluZygxNikpO1xuXHRcdFx0XHRpZiAoIW1hdGNoZXMpIHtcblx0XHRcdFx0XHRyZXR1cm4gWzAsIDAsIDBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IFtjb2xvclN0cmluZ10gPSBtYXRjaGVzO1xuXG5cdFx0XHRcdGlmIChjb2xvclN0cmluZy5sZW5ndGggPT09IDMpIHtcblx0XHRcdFx0XHRjb2xvclN0cmluZyA9IFsuLi5jb2xvclN0cmluZ10ubWFwKGNoYXJhY3RlciA9PiBjaGFyYWN0ZXIgKyBjaGFyYWN0ZXIpLmpvaW4oJycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgaW50ZWdlciA9IE51bWJlci5wYXJzZUludChjb2xvclN0cmluZywgMTYpO1xuXG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXHRcdFx0XHRcdChpbnRlZ2VyID4+IDE2KSAmIDB4RkYsXG5cdFx0XHRcdFx0KGludGVnZXIgPj4gOCkgJiAweEZGLFxuXHRcdFx0XHRcdGludGVnZXIgJiAweEZGLFxuXHRcdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tYml0d2lzZSAqL1xuXHRcdFx0XHRdO1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0aGV4VG9BbnNpMjU2OiB7XG5cdFx0XHR2YWx1ZTogaGV4ID0+IHN0eWxlcy5yZ2JUb0Fuc2kyNTYoLi4uc3R5bGVzLmhleFRvUmdiKGhleCkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRhbnNpMjU2VG9BbnNpOiB7XG5cdFx0XHR2YWx1ZShjb2RlKSB7XG5cdFx0XHRcdGlmIChjb2RlIDwgOCkge1xuXHRcdFx0XHRcdHJldHVybiAzMCArIGNvZGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY29kZSA8IDE2KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDkwICsgKGNvZGUgLSA4KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCByZWQ7XG5cdFx0XHRcdGxldCBncmVlbjtcblx0XHRcdFx0bGV0IGJsdWU7XG5cblx0XHRcdFx0aWYgKGNvZGUgPj0gMjMyKSB7XG5cdFx0XHRcdFx0cmVkID0gKCgoY29kZSAtIDIzMikgKiAxMCkgKyA4KSAvIDI1NTtcblx0XHRcdFx0XHRncmVlbiA9IHJlZDtcblx0XHRcdFx0XHRibHVlID0gcmVkO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvZGUgLT0gMTY7XG5cblx0XHRcdFx0XHRjb25zdCByZW1haW5kZXIgPSBjb2RlICUgMzY7XG5cblx0XHRcdFx0XHRyZWQgPSBNYXRoLmZsb29yKGNvZGUgLyAzNikgLyA1O1xuXHRcdFx0XHRcdGdyZWVuID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA2KSAvIDU7XG5cdFx0XHRcdFx0Ymx1ZSA9IChyZW1haW5kZXIgJSA2KSAvIDU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCB2YWx1ZSA9IE1hdGgubWF4KHJlZCwgZ3JlZW4sIGJsdWUpICogMjtcblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gMzA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHRsZXQgcmVzdWx0ID0gMzAgKyAoKE1hdGgucm91bmQoYmx1ZSkgPDwgMikgfCAoTWF0aC5yb3VuZChncmVlbikgPDwgMSkgfCBNYXRoLnJvdW5kKHJlZCkpO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gMikge1xuXHRcdFx0XHRcdHJlc3VsdCArPSA2MDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRyZ2JUb0Fuc2k6IHtcblx0XHRcdHZhbHVlOiAocmVkLCBncmVlbiwgYmx1ZSkgPT4gc3R5bGVzLmFuc2kyNTZUb0Fuc2koc3R5bGVzLnJnYlRvQW5zaTI1NihyZWQsIGdyZWVuLCBibHVlKSksXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGhleFRvQW5zaToge1xuXHRcdFx0dmFsdWU6IGhleCA9PiBzdHlsZXMuYW5zaTI1NlRvQW5zaShzdHlsZXMuaGV4VG9BbnNpMjU2KGhleCkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0fSk7XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuY29uc3QgYW5zaVN0eWxlcyA9IGFzc2VtYmxlU3R5bGVzKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFuc2lTdHlsZXM7XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuY29uc3QgbGV2ZWwgPSAoKCkgPT4ge1xuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudERhdGEpIHtcblx0XHRjb25zdCBicmFuZCA9IG5hdmlnYXRvci51c2VyQWdlbnREYXRhLmJyYW5kcy5maW5kKCh7YnJhbmR9KSA9PiBicmFuZCA9PT0gJ0Nocm9taXVtJyk7XG5cdFx0aWYgKGJyYW5kICYmIGJyYW5kLnZlcnNpb24gPiA5Mykge1xuXHRcdFx0cmV0dXJuIDM7XG5cdFx0fVxuXHR9XG5cblx0aWYgKC9cXGIoQ2hyb21lfENocm9taXVtKVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0cmV0dXJuIDA7XG59KSgpO1xuXG5jb25zdCBjb2xvclN1cHBvcnQgPSBsZXZlbCAhPT0gMCAmJiB7XG5cdGxldmVsLFxuXHRoYXNCYXNpYzogdHJ1ZSxcblx0aGFzMjU2OiBsZXZlbCA+PSAyLFxuXHRoYXMxNm06IGxldmVsID49IDMsXG59O1xuXG5jb25zdCBzdXBwb3J0c0NvbG9yID0ge1xuXHRzdGRvdXQ6IGNvbG9yU3VwcG9ydCxcblx0c3RkZXJyOiBjb2xvclN1cHBvcnQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0c0NvbG9yO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxyXG5pbXBvcnQgeyBmb3JtYXRWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi9oZWxwZXJzL0Zvcm1hdHRlclwiO1xyXG5pbXBvcnQgeyBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9zZWFyY2hGb3JBdHRyaWJ1dGVXaXRoUGFyZW50c1wiO1xyXG5pbXBvcnQgeyBCYXNlSURFQXNwZWN0LCBJRGVmYXVsdFNldHRpbmdzIH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3RcIjtcclxuaW1wb3J0IHsgSVdpZGdldEpzb24gfSBmcm9tIFwiLi4vQmFzZUNsYXNzZXMvSVdpZGdldEpzb25cIjtcclxuaW1wb3J0IHsgRGVmYXVsdCwgSVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbiwgV2lkZ2V0U2V0dGluZ3MgfSBmcm9tIFwiLi9TaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ1wiO1xyXG5cclxubGV0IHRoaXNXaWRnZXRTeXN0ZW1OYW1lID0gXCJTaW5nbGVWYWx1ZUFzcGVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpbmdsZVZhbHVlQXNwZWN0IGV4dGVuZHMgQmFzZUlERUFzcGVjdDxJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uLCBhbnk+IHtcclxuICAgIHJlZnJlc2gobmV3Q29uZmlnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL25vdGhpbmdcclxuICAgIH1cclxuICAgIHJlc2V0KG5ld0NvbmZpZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy9ub3RoaW5nXHJcbiAgICB9XHJcbiAgICBzZXRUaGlzQ29tcG9uZW50TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNpbmdsZVZhbHVlQXNwZWN0XCI7XHJcbiAgICB9XHJcbiAgICBzZXRXaWRnZXRKc29uU2V0dGluZ3MoKTogSVdpZGdldEpzb248SVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiBXaWRnZXRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBzZXREZWZhdWx0cygpOiBJRGVmYXVsdFNldHRpbmdzPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+IHtcclxuICAgICAgICByZXR1cm4gIERlZmF1bHRcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbDogYW55KSB7XHJcbiAgICAvLyAgICAgc3VwZXIoXCJTaW5nbGVWYWx1ZUFzcGVjdFwiLCBcImFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyXCIsIGVsZW1lbnQsIGNvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbClcclxuICAgIC8vICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcml2YXRlIGluaXRpYWxpc2UoKSB7Ly8hIE5vdGU6IFVJIGZyYW1ld29yayBsb29rcyBmb3IgdGhpcyBtZXRob2QgbmFtZSBhbmQgaWYgZm91bmQgYmVoYXZlcyBkaWZmZXJlbnRseSBhbmQgd29udCBjYWxsIGxvYWRBbmRCaW5kXHJcblxyXG4gICAgc2V0dXAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kYXRhID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMub3B0aW9ucy50aXRsZSgpIHx8IFwiVGl0bGUgVmFsdWVcIlxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIE1hcCB0aGUgcm9sZUNvbmZpZ01vZGVsc1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5maWVsZFBhdGguc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhcIkZpZWxkIHBhdGggY2hhbmdlZFwiLCBcImdyZWVuXCIsbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRBbmRCaW5kKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmNhbGN1bGF0ZWRUaXRsZSh0aGlzLm9wdGlvbnMudGl0bGUoKSB8fCBcIlRpdGxlIFZhbHVlXCIpO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy50aXRsZS5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiVGl0bGUgY2hhbmdlZFwiLCBcImdyZWVuXCIsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgaWYobmV3VmFsdWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuY2FsY3VsYXRlZFRpdGxlKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG92ZXJyaWRlIGxvYWRBbmRCaW5kKCk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSAobW9kZWwpIHBhc3NlZCBpblwiLCBcImdyZWVuXCIpO1xyXG4gICAgICAgIC8vIHN1cGVyLmxvYWRBbmRCaW5kKCk7IC8vTm8gbmVlZCB0byBsb2FkIGFuZCBiaW5kIGFzIHdlIGFyZSBub3QgdXNpbmcgdGhlIGJhc2UgbW9kZWxcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuc2hhcmVkb0lkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBzaGFyZWRvSWQgcGFzc2VkIGluXCIsIFwicmVkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighdGhpcy5vcHRpb25zLmZpZWxkUGF0aCgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBmaWVsZCBwYXRoIHBhc3NlZCBpblwiLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlKHRoaXMuc2hhcmVkb0lkKCksIHRoaXMub3B0aW9ucy5maWVsZFBhdGgoKSEsIHRoaXMub3B0aW9ucy5zZWFyY2hQYXJlbnRzKCkhLCB0aGlzLm9wdGlvbnMubWF4RGVwdGgoKSkudGhlbigoZGF0YSk9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFkYXRhIHx8IGRhdGEuZm91bmQgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gZGF0YSByZXR1cm5lZFwiLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jYWxjdWxhdGVkVmFsdWUodGhpcy5vcHRpb25zLnZhbHVlT25Ob3RGb3VuZCgpIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0VmFsdWUoZGF0YS52YWx1ZSwgdGhpcy5vcHRpb25zLmZvcm1hdHRlcigpIHx8IFwidmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuY2FsY3VsYXRlZFZhbHVlKGZvcm1hdHRlZFZhbHVlIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIG92ZXJyaWRlIG9uU2F2ZShtb2RlbDogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMubG9nKFwiTm8gU2F2ZSBJbXBsZW1lbnRlZFwiLCBcImdyZWVuXCIpO1xyXG4gICAgICAgIC8vIHN1cGVyLm9uU2F2ZShtb2RlbCk7XHJcblxyXG4gICAgfTtcclxufSAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=