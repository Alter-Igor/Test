/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Common/HtmlHelper.ts":
/*!**********************************!*\
  !*** ./src/Common/HtmlHelper.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addHighlightClass: () => (/* binding */ addHighlightClass),
/* harmony export */   escapeHtml: () => (/* binding */ escapeHtml)
/* harmony export */ });
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function addHighlightClass(content, targetWord) {
    return content.replace(new RegExp(`\\b${targetWord}\\b`, 'gi'), function (match) {
        return `<span class="highlight">${match}</span>`;
    });
}


/***/ }),

/***/ "./src/Common/JsonToHTMLConverter.ts":
/*!*******************************************!*\
  !*** ./src/Common/JsonToHTMLConverter.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonToHtmlConverter: () => (/* binding */ JsonToHtmlConverter)
/* harmony export */ });
class JsonToHtmlConverter {
    static convert(json) {
        if (json == null)
            return this.escapeHtml("<em>null</em>");
        if (typeof json !== "object")
            return this.escapeHtml(json.toString());
        if (Array.isArray(json)) {
            return this.arrayToHtml(json);
        }
        else {
            return this.objectToHtml(json);
        }
    }
    static arrayToHtml(arr) {
        const itemsHtml = arr.map(item => `<li>${this.convert(item)}</li>`).join("");
        return `<ul>${itemsHtml}</ul>`;
    }
    static objectToHtml(obj) {
        const propertiesHtml = Object.keys(obj)
            .map(key => `<li>${this.escapeHtml(key)}: ${this.convert(obj[key])}</li>`)
            .join("");
        return `<ul>${propertiesHtml}</ul>`;
    }
    static escapeHtml(unsafe) {
        return unsafe.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}
// Usage example:
const json = {
    code: "ERROR_CODE",
    message: "Something went wrong",
    details: {
        info: "Detailed information about the error",
        timestamp: new Date().toISOString(),
        items: [1, 2, 3]
    }
};


/***/ }),

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

/***/ "./src/WebBased/Common/ObjectHelper.ts":
/*!*********************************************!*\
  !*** ./src/WebBased/Common/ObjectHelper.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flattenObject: () => (/* binding */ flattenObject),
/* harmony export */   getNestedProperty: () => (/* binding */ getNestedProperty),
/* harmony export */   setAllFieldsToNull: () => (/* binding */ setAllFieldsToNull),
/* harmony export */   setNestedProperty: () => (/* binding */ setNestedProperty),
/* harmony export */   strToClass: () => (/* binding */ strToClass)
/* harmony export */ });
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Common/Log */ "./src/Common/Log.ts");

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
    //to get new token TODO: check if fail then call
    // await $ajax.get("https://hsf-vnext.sharedo.co.uk/security/refreshTokens?_=" + Date.now);
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
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Common_EventsHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/EventsHelper */ "./src/WebBased/Common/EventsHelper.ts");
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Common/Log */ "./src/Common/Log.ts");
/* harmony import */ var _KOConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./KOConverter */ "./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts");
/* harmony import */ var _Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Common/ObjectHelper */ "./src/WebBased/Common/ObjectHelper.ts");
/* harmony import */ var _Common_HtmlHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Common/HtmlHelper */ "./src/Common/HtmlHelper.ts");
/* harmony import */ var _Common_JsonToHTMLConverter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Common/JsonToHTMLConverter */ "./src/Common/JsonToHTMLConverter.ts");
/* harmony import */ var _Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Common/api/searchForAttributeWithParents */ "./src/WebBased/Common/api/searchForAttributeWithParents.ts");









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
            this.uniqueId = (0,uuid__WEBPACK_IMPORTED_MODULE_8__["default"])();
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
        this.options = (0,_KOConverter__WEBPACK_IMPORTED_MODULE_3__.toObservableObject)(this.configuration, this.options);
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
                }, 500);
                timeout = true;
            });
        }, 3000);
        // ko.applyBindings(this.liveConfigData, this.liveConfigDiv);x
        // }
    }
    ensureStylesLoaded(href) {
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement('link');
            link.href = href;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            document.head.appendChild(link);
        }
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
    async getData() {
        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to load data from set - this method should be overriden", "red");
            return this._data;
        }
        let nestedData = (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.getNestedProperty)(this.model, this.LocationToSaveOrLoadData);
        if (nestedData !== undefined) {
            this.log("Data found at location", "green", nestedData);
            let retValue = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(nestedData);
            this.log("Data found at location", "green", retValue);
            return retValue;
        }
        if (nestedData === undefined && this.options.dataSettings().getValueUsingParents === true) {
            return (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_7__.searchForAttributeRecursive)(this.sharedoId, this.LocationToSaveOrLoadData, this.options.dataSettings().getValueUsingParents, this.options.dataSettings().maxDepth).then((data) => {
                if (data.found) {
                    return data.value;
                }
                return nestedData;
            });
        }
    }
    buildErrorDiv() {
        this.inf("Building error div");
        let errorDiv = this.element.querySelector(this.errorDivSelector);
        if (!errorDiv) {
            return;
        }
        (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)("errorDiv.innerHTML");
        errorDiv.innerHTML = ""; //clean out the div
        if (!this.errors) {
            this.errors = knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray();
        }
        if (this.errors().length === 0) {
            return;
        }
        let errorContainerDiv = document.createElement("div");
        errorDiv.appendChild(errorContainerDiv);
        errorContainerDiv.className = "ide-aspect-error-container";
        let titleDiv = document.createElement("div");
        titleDiv.className = "ide-aspect-error-title";
        titleDiv.innerText = "There has been an error:";
        errorContainerDiv.appendChild(titleDiv);
        let foreachDiv = document.createElement("div");
        errorContainerDiv.appendChild(foreachDiv);
        this.errors().forEach((error) => {
            let userMessageDiv = document.createElement("div");
            userMessageDiv.className = "ide-aspect-error-user-message";
            userMessageDiv.innerHTML = error.userMessage;
            userMessageDiv.onclick = () => {
                //create a div that can scoll
                let detailedMessageDiv = document.createElement("div");
                detailedMessageDiv.className = "ide-aspect-error-detailed-message";
                const code = (0,_Common_HtmlHelper__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(error.code || "");
                const message = (0,_Common_HtmlHelper__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(error.message || "");
                const userMessage = (0,_Common_HtmlHelper__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(error.userMessage || "");
                const errorStack = (0,_Common_HtmlHelper__WEBPACK_IMPORTED_MODULE_5__.escapeHtml)(error.errorStack || "");
                const additionalInfo = _Common_JsonToHTMLConverter__WEBPACK_IMPORTED_MODULE_6__.JsonToHtmlConverter.convert(error.additionalInfo || {});
                const html = `
                            <div>
                            <h2>Error: ${code}</h2>
                            <p><strong>Message:</strong> ${message}</p>
                            <p><strong>User Message:</strong> ${userMessage}</p>
                            <p><strong>Stack:</strong> ${errorStack}</p>
                            <p><strong>Additional Info:</strong> ${additionalInfo}</p>
                            </div>`;
                detailedMessageDiv.innerHTML = html;
                $ui.errorDialog(detailedMessageDiv);
            };
            foreachDiv.appendChild(userMessageDiv);
            if (error.suggestions && error.suggestions.length > 0) {
                let suggestionsDiv = document.createElement("div");
                suggestionsDiv.className = "ide-aspect-error-suggestions";
                suggestionsDiv.innerHTML = `<b>Suggestions:</b><br/>${error.suggestions.join("<br/>")}`;
                foreachDiv.appendChild(suggestionsDiv);
            }
            if (error.actions && error.actions.length > 0) {
                let actionsDiv = document.createElement("div");
                actionsDiv.className = "ide-aspect-error-actions";
                actionsDiv.innerHTML = `<b>Actions:</b><br/>${error.actions.join("<br/>")}`;
                foreachDiv.appendChild(actionsDiv);
            }
            if (error.internalSuggestions && error.internalSuggestions.length > 0) {
                let internalSuggestionsDiv = document.createElement("div");
                internalSuggestionsDiv.className = "ide-aspect-error-internal-suggestions";
                internalSuggestionsDiv.innerHTML = `<b>Internal Suggestions:</b><br/>${error.internalSuggestions.join("<br/>")}`;
                foreachDiv.appendChild(internalSuggestionsDiv);
            }
        });
        if (this.options.debug().supportRequestEnabled) {
            let actionDiv = document.createElement("div");
            actionDiv.className = "ide-aspect-error-support-action";
            errorContainerDiv.appendChild(actionDiv);
            let button = document.createElement("button");
            button.className = "btn btn-primary";
            // button.setAttribute("data-bind","click:createSupportTask,visible:options.debug..supportRequestEnabled");
            button.innerText = "Create Support Task";
            actionDiv.appendChild(button);
        }
    }
    setData(value) {
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
        (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.setNestedProperty)(this.model, this.LocationToSaveOrLoadData, valueToSet);
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
    async onSave(model) {
        this.fireEvent("onSave", model);
        let dataToSave = await this.getData();
        this.log("Saving, model passed in we need to persist to", "green", dataToSave);
        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to save data to set - this method should be overriden", "red");
            return;
        }
        let dataToPersist = await this.getData();
        let currentData = (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.getNestedProperty)(model, this.LocationToSaveOrLoadData);
        if (currentData) {
            this.log(`Current data at location ${this.LocationToSaveOrLoadData} :`, "magenta", currentData);
        }
        if (!currentData) {
            // this.log("Data does not exist, we will create", "orange");
            //  setNestedProperty(model, this.LocationToSaveOrLoadData, {});
            // currentData = getNestedProperty(model, this.LocationToSaveOrLoadData);
        }
        this.log(`New data to persist to location ${this.LocationToSaveOrLoadData} :`, "blue", dataToPersist);
        (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.setNestedProperty)(model, this.LocationToSaveOrLoadData, dataToPersist);
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
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.inf)(message), ...args);
        }
    }
    wrn(message, ...args) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.wrn)(message), ...args);
        }
    }
    err(message, ...args) {
        //get the previous caller
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.err)(message), ...args);
        }
    }
    nv(name, value) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.nv)(name, value));
        }
    }
    lh1(message, ...args) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.lh1)(message), ...args);
        }
    }
    clearSec() {
        (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.clearSec)();
    }
    l(message, ...args) {
        if (this.logToConsole()) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)(message, ...args);
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
        (0,_Common_EventsHelper__WEBPACK_IMPORTED_MODULE_1__.fireEvent)(event);
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

/***/ "./src/WebBased/IDEAspects/BaseClasses/DebugDefaults.ts":
/*!**************************************************************!*\
  !*** ./src/WebBased/IDEAspects/BaseClasses/DebugDefaults.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEBUG_DEFAULT: () => (/* binding */ DEBUG_DEFAULT)
/* harmony export */ });
const DEBUG_DEFAULT = () => {
    let retValue = {
        supportRequestEnabled: false,
        enabled: true,
        logToConsole: true,
        showInAspect: false,
        liveConfig: true,
    };
    return retValue;
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
/* harmony import */ var _BaseClasses_DebugDefaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseClasses/DebugDefaults */ "./src/WebBased/IDEAspects/BaseClasses/DebugDefaults.ts");

const Default = {
    fieldPath: "Title",
    title: "Title Value",
    calculatedValue: "",
    calculatedTitle: "",
    valueOnNotFound: "Not Found",
    formatter: "value",
    debug: (0,_BaseClasses_DebugDefaults__WEBPACK_IMPORTED_MODULE_0__.DEBUG_DEFAULT)(),
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
    ],
    dataSettings: {
        getValueUsingParents: false,
        maxDepth: 0,
    }
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
    async setup() {
        this.setData({
            value: "",
            title: this.options.title() || "Title Value"
        });
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
        (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_1__.searchForAttributeRecursive)(this.sharedoId(), this.options.fieldPath(), this.options.dataSettings().getValueUsingParents, this.options.dataSettings().maxDepth).then((data) => {
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
    async onSave(model) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L0h0bWxIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9Db21tb24vSnNvblRvSFRNTENvbnZlcnRlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL0NvbW1vbi9Mb2cudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9Db21tb24vU3RhY2tIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9Db21tb24vRXZlbnRzSGVscGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL09iamVjdEhlbHBlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvYXBpLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL2FwaS9leGVjdXRlRmluZEJ5UXVlcnkvRmluZEJ5UXVlcnkudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9Db21tb24vYXBpL3NlYXJjaEZvckF0dHJpYnV0ZVdpdGhQYXJlbnRzLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9CYXNlSURFQXNwZWN0LnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9EZWJ1Z0RlZmF1bHRzLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9LT0NvbnZlcnRlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvU2luZ2xlVmFsdWVBc3BlY3QvU2luZ2xlVmFsdWVBc3BlY3RDb25maWcudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9oZWxwZXJzL0Zvcm1hdHRlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL2V4dGVybmFsIHZhciBcImtvXCIiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL3ZlbmRvci9hbnNpLXN0eWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS92ZW5kb3Ivc3VwcG9ydHMtY29sb3IvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvU2luZ2xlVmFsdWVBc3BlY3QvU2luZ2xlVmFsdWVBc3BlY3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVIdG1sKHVuc2FmZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHVuc2FmZVxuICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcbiAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYWRkSGlnaGxpZ2h0Q2xhc3MoY29udGVudDogc3RyaW5nLCB0YXJnZXRXb3JkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gY29udGVudC5yZXBsYWNlKG5ldyBSZWdFeHAoYFxcXFxiJHt0YXJnZXRXb3JkfVxcXFxiYCwgJ2dpJyksIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCJoaWdobGlnaHRcIj4ke21hdGNofTwvc3Bhbj5gO1xuICB9KTtcbn1cbiIsIlxuZXhwb3J0IGNsYXNzIEpzb25Ub0h0bWxDb252ZXJ0ZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydChqc29uOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBpZiAoanNvbiA9PSBudWxsKSByZXR1cm4gdGhpcy5lc2NhcGVIdG1sKFwiPGVtPm51bGw8L2VtPlwiKTtcbiAgICAgICAgaWYgKHR5cGVvZiBqc29uICE9PSBcIm9iamVjdFwiKSByZXR1cm4gdGhpcy5lc2NhcGVIdG1sKGpzb24udG9TdHJpbmcoKSk7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoanNvbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFycmF5VG9IdG1sKGpzb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0VG9IdG1sKGpzb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXJyYXlUb0h0bWwoYXJyOiBhbnlbXSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGl0ZW1zSHRtbCA9IGFyci5tYXAoaXRlbSA9PiBgPGxpPiR7dGhpcy5jb252ZXJ0KGl0ZW0pfTwvbGk+YCkuam9pbihcIlwiKTtcbiAgICAgICAgcmV0dXJuIGA8dWw+JHtpdGVtc0h0bWx9PC91bD5gO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIG9iamVjdFRvSHRtbChvYmo6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXNIdG1sID0gT2JqZWN0LmtleXMob2JqKVxuICAgICAgICAgICAgLm1hcChrZXkgPT4gYDxsaT4ke3RoaXMuZXNjYXBlSHRtbChrZXkpfTogJHt0aGlzLmNvbnZlcnQob2JqW2tleV0pfTwvbGk+YClcbiAgICAgICAgICAgIC5qb2luKFwiXCIpO1xuICAgICAgICByZXR1cm4gYDx1bD4ke3Byb3BlcnRpZXNIdG1sfTwvdWw+YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBlc2NhcGVIdG1sKHVuc2FmZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHVuc2FmZS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xuICAgIH1cbn1cblxuLy8gVXNhZ2UgZXhhbXBsZTpcbmNvbnN0IGpzb24gPSB7XG4gICAgY29kZTogXCJFUlJPUl9DT0RFXCIsXG4gICAgbWVzc2FnZTogXCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiLFxuICAgIGRldGFpbHM6IHtcbiAgICAgICAgaW5mbzogXCJEZXRhaWxlZCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZXJyb3JcIixcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIGl0ZW1zOiBbMSwgMiwgM11cbiAgICB9XG59O1xuXG4iLCJpbXBvcnQgY2hhbGssIHsgQ2hhbGtJbnN0YW5jZSB9IGZyb20gJ2NoYWxrJztcbmltcG9ydCB7IGV4dHJhY3RDYWxsZXJGcm9tU3RhY2ssIGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrIH0gZnJvbSAnLi9TdGFja0hlbHBlcic7XG5cbmNoYWxrLmxldmVsID0gMztcbmxldCBkZWZhdWx0TW9kZTogQ2hhbGtJbnN0YW5jZSA9IGNoYWxrLnJlc2V0O1xuXG5cbmxldCBsYXN0U2VjOiBTZWN0aW9uIHwgdW5kZWZpbmVkO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlYygpIHtcblxuICAgIC8vIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKXtcbiAgICAvLyBjb25zb2xlLmdyb3VwRW5kKClcbiAgICAvLyB9XG5cbiAgICBpZiAobGFzdFNlYz8uZ3JvdXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXN0U2VjPy5ncm91cDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGFzdFNlYyA9IG5ldyBTZWN0aW9uKFwiUm9vdFwiLCBkZWZhdWx0TW9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWNCYWNrT25lKCkge1xuICAgIGxhc3RTZWMgPSBsYXN0U2VjPy5wYXJlbnQ7XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xufVxuXG5leHBvcnQgY2xhc3MgU2VjdGlvbiB7XG4gICAgc2VjdGlvbk5hbWU6IHN0cmluZztcbiAgICBwYXJlbnQ6IFNlY3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgYzogQ2hhbGtJbnN0YW5jZVxuICAgIGluZGVudCA9IDA7XG4gICAgaW5kZW50UGFkID0gXCJcIjtcbiAgICBncm91cDogbnVtYmVyID0gMDtcbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uTmFtZTogc3RyaW5nLCBjOiBDaGFsa0luc3RhbmNlLCBzZWN0aW9uPzogU2VjdGlvbikge1xuICAgICAgICB0aGlzLmMgPSBjO1xuICAgICAgICB0aGlzLnNlY3Rpb25OYW1lID0gc2VjdGlvbk5hbWU7XG4gICAgICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmluZGVudCA9IHNlY3Rpb24uaW5kZW50ICsgMTtcbiAgICAgICAgICAgIHRoaXMuaW5kZW50UGFkID0gXCItXCIucmVwZWF0KHRoaXMuaW5kZW50ICogMikgKyBcIiBcIjtcbiAgICAgICAgfVxuICAgICAgICBsYXN0U2VjID0gdGhpcztcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBzZWN0aW9uO1xuICAgIH1cbiAgICBsb2coLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc29sZS5sb2coZGVmYXVsdE1vZGUoYXJncykpO1xuICAgIH1cbiAgICBsaDEoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDEodGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsaDIoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDIodGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsaDMoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDModGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiBsKHRoaXMsIC4uLmFyZ3MpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGwoLi4uYXJnczogYW55W10pIHtcblxuICAgIGxldCBzZWM6IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjO1xuICAgIGxldCBmaXJzdEFyZzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGxldCBmaXJzdEFyZ01vZGlmZWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgICBpZiAoYXJnIGluc3RhbmNlb2YgU2VjdGlvbikge1xuICAgICAgICAgICAgc2VjID0gYXJnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZmlyc3RBcmcgJiYgYXJnLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiU3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGZpcnN0QXJnID0gYXJncy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vcmVtb3ZlZCBTZWN0aW9uIGZyb20gYXJnc1xuICAgIGFyZ3MgPSBhcmdzLmZpbHRlcigoYXJnKSA9PiB7XG4gICAgICAgIHJldHVybiAhKGFyZyBpbnN0YW5jZW9mIFNlY3Rpb24pO1xuICAgIH0pXG5cblxuICAgIC8vIGxldCBjID0gc2VjPy5jIHx8IG1vZGU7XG4gICAgbGV0IGMgPSBkZWZhdWx0TW9kZTtcbiAgICBsZXQgaW5kZW50UGFkID0gc2VjPy5pbmRlbnRQYWQgfHwgXCJcIjtcblxuICAgIGlmICghZmlyc3RBcmcpIHtcbiAgICAgICAgZmlyc3RBcmcgPSBcIlwiO1xuICAgIH1cbiAgICBmaXJzdEFyZ01vZGlmZWQgPSBmaXJzdEFyZztcblxuICAgIGZpcnN0QXJnTW9kaWZlZCA9IGluZGVudFBhZCArIGZpcnN0QXJnO1xuICAgIC8vcmVtb3ZlIGNvbG9yIGZvcm1hdHRpbmcgZnJvbSBmaXJzdCBhcmdcbiAgICBsZXQgdG90TGVuID0gZmlyc3RBcmdNb2RpZmVkLmxlbmd0aCAtIGZpcnN0QXJnTW9kaWZlZC5yZXBsYWNlKC9cXHUwMDFiXFxbLio/bS9nLCAnJykubGVuZ3RoIC0gMjtcblxuXG4gICAgY29uc29sZS5sb2coZmlyc3RBcmdNb2RpZmVkKTtcblxuICAgIC8vcmVtb3ZlZCBTZWN0aW9uIGZyb20gYXJnc1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYXJnKTtcbiAgICB9KVxuXG5cbn1cblxuXG5cbmZ1bmN0aW9uIGxvZ0hlYWRpbmdTZWN0aW9uKGM6IENoYWxrSW5zdGFuY2UsIGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbj86IFNlY3Rpb24pIHtcblxuICAgIGxldCBzZWMgPSBuZXcgU2VjdGlvbihoZWFkaW5nLCBjLCBzZWN0aW9uKTtcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKERhdGUubm93KCkpLnRvTG9jYWxlU3RyaW5nKCk7XG5cbiAgICBsZXQgcGF0aCA9IFwiXCI7XG4gICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgcGF0aCA9IHNlY3Rpb24uc2VjdGlvbk5hbWU7XG4gICAgICAgIHdoaWxlIChzZWN0aW9uLnBhcmVudCkge1xuICAgICAgICAgICAgc2VjdGlvbiA9IHNlY3Rpb24ucGFyZW50O1xuICAgICAgICAgICAgcGF0aCA9IHNlY3Rpb24uc2VjdGlvbk5hbWUgKyBcIiAtPiBcIiArIHBhdGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2FkZCBhZGQgaGVhZGluZyB0byBlbmQgb2YgcGF0aCBhbmQgb25seSBhZGQgLT4gaWYgcGF0aCBpcyBub3QgZW1wdHlcbiAgICBpZiAocGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBhdGggKz0gXCIgLT4gXCI7XG4gICAgfVxuICAgIHBhdGggKz0gaGVhZGluZztcblxuXG5cbiAgICAvL3Bvc2l0aW9uIHRoZSBoZWFkaW5nIGluIHRoZSBtaWRkbGUgb2YgdGhlIHNjcmVlblxuICAgIC8vIGNvbnNvbGUubG9nKGMoaGVhZGluZy5wYWRTdGFydCgoY3dpZHRoIC8gMikgKyAoaGVhZGluZy5sZW5ndGggLyAyKSwgXCIgXCIpLnBhZEVuZChjd2lkdGgsIFwiIFwiKSkpO1xuICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoYyhwYXRoKSk7XG4gICAgc2VjLmdyb3VwKys7XG5cbiAgICByZXR1cm4gc2VjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGgxKGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWMpIHtcbiAgICBsZXQgYyA9IGNoYWxrLmJnQmxhY2suZ3JlZW5CcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaDIoaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYykge1xuICAgIGxldCBjID0gY2hhbGsuYmdHcmF5LmN5YW5CcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaDMoaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYykge1xuICAgIGxldCBjID0gY2hhbGsuYmdHcmF5Lm1hZ2VudGFCcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cblxuZXhwb3J0IGNvbnN0IGxoID0gbGgxO1xuXG5cbmV4cG9ydCBjb25zdCBpbXAgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay5yZWQuYm9sZC5iZ0JsYWNrO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgaW5mID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsuYmx1ZS5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3Qgd3JuID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsueWVsbG93LmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59IFxuXG5leHBvcnQgY29uc3QgZXJyID0gKHRleHQ6IHN0cmluZykgPT4ge1xuXG4gICAgbGV0IGVyID0gKG5ldyBFcnJvcigpKTtcbiAgICBsZXQgbGluZU5vID0gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soZXIuc3RhY2spO1xuICAgIGxldCBjYWxsZXIgPSBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrKGVyLnN0YWNrKTtcblxuICAgIGxldCBwcmVUZXh0ID0gYFske2NhbGxlcn06JHtsaW5lTm99XWA7XG5cbiAgICB0ZXh0ID0gcHJlVGV4dCArIFwiIFwiICsgdGV4dDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhlcik7XG5cbiAgICBsZXQgYyA9IGNoYWxrLnJlZC5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3Qgc3VjID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsuZ3JlZW4uYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGhsID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ0JsdWUodGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBobDEgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGNoYWxrLmJnTWFnZW50YSh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IG52ID0gKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ0JsdWVCcmlnaHQobmFtZS5wYWRFbmQoMzAsIFwiIFwiKSkgKyBcIiA6IFwiICsgY2hhbGsuY3lhbkJyaWdodCh2YWx1ZSk7XG59XG5cbiBcbmxldCBleGFtcGxlSlNvbiA9XG57XG4gICAgXCJuYW1lXCI6IFwidGVzdFwiLFxuICAgIFwiYWdlXCI6IDEwLFxuICAgIFwiYWRkcmVzc1wiOiB7XG4gICAgICAgIFwic3RyZWV0XCI6IFwiMTIzIEZha2UgU3RyZWV0XCIsXG4gICAgICAgIFwiY2l0eVwiOiBcIkxvbmRvblwiLFxuICAgICAgICBcInBvc3Rjb2RlXCI6IFwiU1cxQSAxQUFcIlxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blRlc3QoKSB7XG5cblxuICAgIGNvbnNvbGUubG9nKFwiLS0gdGVzdCAtLVwiKVxuXG4gICAgbGV0IHNlYyA9IGxoMShcIlRlc3QgSGVhZGluZyAxXCIpXG4gICAgbChpbXAoXCJBdXRvIFNlYyAtIFRoaXMgaXMgc29tZXRoaW5nIGltcG9ydGFudFwiKSlcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIDFcIilcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIDJcIilcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIElORk86IFwiICsgaW1wKFwiVGhpcyBpcyBzb21ldGhpbmcgaW1wb3J0YW50XCIpKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgV0lUSCBBRERJVElOQUwgSU5GTzogXCIgKyBpbXAoXCJUaGlzIGlzIHNvbWV0aGluZyBpbXBvcnRhbnRcIikgKyBcIiBhbmQgdGhpcyBpcyBzb21lIGFkZGl0aW9uYWwgaW5mb1wiKVxuICAgIGwoXCJBdXRvIFNlYyAtIFRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiYWZ0ZXIgYXV0byBzZWMgVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuICAgIHNlYyA9IHNlYy5saDIoXCJIZWFkaW5nIDJcIilcbiAgICBzZWMubChcIlRlc3RcIilcbiAgICBzZWMubChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuXG4gICAgc2VjID0gc2VjLmxoMyhcIkhlYWQgM1wiKVxuICAgIGwoXCJUZXN0XCIpXG4gICAgbChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuICAgIGNsZWFyU2VjKCk7XG4gICAgbChcIlRlc3QgQ2xlYXIgU2VjXCIpXG4gICAgbChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuXG5cbiAgICBsKFwiVGVzdCBKU09OOlwiLCBleGFtcGxlSlNvbik7XG5cbn1cblxuLy8gcnVuVGVzdCgpXG5jbGVhclNlYygpO1xuXG4vLyBleHBvcnQge2NvbG9yc307XG4iLCJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0TGluZU51bWJlckZyb21TdGFjayhzdGFjazogc3RyaW5nIHwgdW5kZWZpbmVkKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgaWYgKCFzdGFjaykgcmV0dXJuIG51bGw7XG4gICAgLy8gRXh0cmFjdCBsaW5lcyBmcm9tIHN0YWNrXG4gICAgY29uc3Qgc3RhY2tMaW5lcyA9IHN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAvLyBGaW5kIHRoZSBsaW5lIHdpdGggdGhlIGVycm9yICh1c3VhbGx5IHRoZSBzZWNvbmQgbGluZSlcbiAgICBjb25zdCBlcnJvckxpbmUgPSBzdGFja0xpbmVzWzFdIHx8ICcnO1xuICAgIC8vIEV4dHJhY3QgbGluZSBudW1iZXIgZnJvbSB0aGUgZXJyb3IgbGluZSB1c2luZyByZWdleFxuICAgIGNvbnN0IG1hdGNoID0gZXJyb3JMaW5lLm1hdGNoKC86KFxcZCspOihcXGQrKSQvKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBwYXJzZUludChtYXRjaFsxXSkgOiBudWxsO1xuICB9XG4gIFxuIGV4cG9ydCBmdW5jdGlvbiBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrKHN0YWNrOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoIXN0YWNrKSByZXR1cm4gbnVsbDtcbiAgICAvLyBFeHRyYWN0IGxpbmVzIGZyb20gc3RhY2tcbiAgICBjb25zdCBzdGFja0xpbmVzID0gc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIC8vIEZpbmQgdGhlIGxpbmUgd2l0aCB0aGUgY2FsbGVyIGZ1bmN0aW9uICh1c3VhbGx5IHRoZSB0aGlyZCBsaW5lKVxuICAgIGNvbnN0IGNhbGxlckxpbmUgPSBzdGFja0xpbmVzWzJdIHx8ICcnO1xuICAgIC8vIEV4dHJhY3QgY2FsbGVyIGZ1bmN0aW9uIG5hbWUgdXNpbmcgcmVnZXhcbiAgICBjb25zdCBtYXRjaCA9IGNhbGxlckxpbmUubWF0Y2goL2F0IChbXFx3Ljw+XSspLyk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBudWxsO1xuICB9IiwiXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hhcmVEb0V2ZW50IHtcbiAgICBldmVudFBhdGg6IHN0cmluZztcbiAgICBldmVudE5hbWU6IHN0cmluZztcbiAgICBzb3VyY2U6IGFueTtcbiAgICBkYXRhOiBhbnk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVFdmVudChldmVudDpTaGFyZURvRXZlbnQpIHtcblxuICAgICR1aS5ldmVudHMuYnJvYWRjYXN0KGV2ZW50LmV2ZW50UGF0aCwgZXZlbnQpO1xufSIsImltcG9ydCB7IGwsIGluZiwgZXJyIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Mb2dcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0clRvQ2xhc3MoY2xhc3NOYW1lOnN0cmluZywgYmFzZTphbnkpIHtcbiAgICBjb25zdCBjbGFzc1BhcnRzID0gY2xhc3NOYW1lLnNwbGl0KCcuJyk7XG4gICAgbGV0IGNsYXNzUmVmZXJlbmNlID0gYmFzZTtcblxuICAgIGZvciAoY29uc3QgcGFydCBvZiBjbGFzc1BhcnRzKSB7XG4gICAgICAgIGlmKCFjbGFzc1JlZmVyZW5jZVtwYXJ0XSkgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY2xhc3NSZWZlcmVuY2UgPSBjbGFzc1JlZmVyZW5jZVtwYXJ0XTtcbiAgICB9OyBcbiAgICByZXR1cm4gY2xhc3NSZWZlcmVuY2U7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEFsbEZpZWxkc1RvTnVsbChtb2RlbDphbnkpIHtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG1vZGVsKTtcbiAgICBrZXlzLmZvckVhY2goKGtleTogYW55KSA9PiB7XG4gICAgICAgIG1vZGVsW2tleV0gPSBudWxsO1xuICAgIH0pO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuT2JqZWN0KG9iOiBhbnkpIHtcbiAgICB2YXIgdG9SZXR1cm46IGFueSA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSBpbiBvYikge1xuICAgICAgICBpZiAoIW9iLmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZTtcblxuICAgICAgICBpZiAoKHR5cGVvZiBvYltpXSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhciBmbGF0T2JqZWN0ID0gZmxhdHRlbk9iamVjdChvYltpXSk7XG4gICAgICAgICAgICBmb3IgKHZhciB4IGluIGZsYXRPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZsYXRPYmplY3QuaGFzT3duUHJvcGVydHkoeCkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgdG9SZXR1cm5baSArICcuJyArIHhdID0gZmxhdE9iamVjdFt4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvUmV0dXJuW2ldID0gb2JbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvUmV0dXJuO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICBpZiAoIWN1cnJlbnRbcHJvcF0pIHtcbiAgICAgICAgICAgIGN1cnJlbnRbcHJvcF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcbiAgICB9XG4gICAgY3VycmVudFtwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoIC0gMV1dID0gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcpOiBhbnkge1xuICAgIGwoaW5mKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pYCksb2JqKTtcbiAgICBcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcGVydGllcykge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcHJvcGVydHkgaGFzIGFuIGFycmF5IGluZGV4LCBlLmcuLCBcImRhdGFbMF1cIlxuICAgICAgICBjb25zdCBtYXRjaGVzID0gcHJvcC5tYXRjaCgvXihbYS16QS1aMC05X10rKVxcWyhbMC05XSspXFxdJC8pO1xuXG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJheVByb3AgPSBtYXRjaGVzWzFdO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChtYXRjaGVzWzJdLCAxMCk7XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjdXJyZW50W2FycmF5UHJvcF0pIHx8IGN1cnJlbnRbYXJyYXlQcm9wXVtpbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGwoZXJyKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pOiBhcnJheVByb3Agb3IgaW5kZXggaXMgdW5kZWZpbmVkYCksb2JqKVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W2FycmF5UHJvcF1baW5kZXhdO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRbcHJvcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbChlcnIoYGdldE5lc3RlZFByb3BlcnR5KCR7cHJvcGVydHlQYXRofSk6IHByb3AgaXMgdW5kZWZpbmVkYCksb2JqKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG59IiwiXG4vKipcbiAqIFRoaXMgZmlsZSBjb250YWlucyB0aGUgYXBpIGNhbGxzIHRvIHRoZSBiYWNrZW5kLlxuICogdXRpbGlzaW5nIHRoZSBheGlvcyBsaWJyYXJ5IHRvIG1ha2UgdGhlIGNhbGxzLlxuICogaW5jbHVzaW5nIG9mIHdlYnBhY2tJZ25vcmUgaXMgdG8gYWxsb3cgdGhlIHdlYnBhY2sgdG8gaWdub3JlIHRoZSBjYWxscyBhbmQgbm90IHRyeSB0byBidW5kbGUgdGhlbS5cbiAqL1xuXG5pbXBvcnQgeyBlcnIsIGluZiwgbCwgbGgxLCBzZWNCYWNrT25lIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Mb2dcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVQb3N0PFQ+KGFwaTogc3RyaW5nLCBwb3N0Qm9keTogYW55KTogUHJvbWlzZTxUPiB7XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXgucG9zdCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSksIHBvc3RCb2R5KTtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiUE9TVFwiLCBwb3N0Qm9keSkpLmRhdGE7XG59XG5cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlR2V0PFQ+KGFwaTogc3RyaW5nKSA6IFByb21pc2U8VD57XG4vLyAgICAgcmV0dXJuIGF3YWl0ICRhamF4LmdldCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSkpO1xuLy8gfSBcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVHZXQ8VD4oYXBpOiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiR0VUXCIsIHVuZGVmaW5lZCkpLmRhdGE7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVHZXR2MjxUPihhcGk6IHN0cmluZyl7XG4gICAgcmV0dXJuICBleGVjdXRlRmV0Y2g8VD4oYXBpLCBcIkdFVFwiLCB1bmRlZmluZWQpO1xufVxuXG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVQdXQ8VD4oYXBpOiBzdHJpbmcsIHBvc3RCb2R5OiBhbnkpOiBQcm9taXNlPFQ+IHtcbiAgICAvL3JldHVybiBhd2FpdCAkYWpheC5wdXQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpLCBwb3N0Qm9keSk7XG4gICAgcmV0dXJuIChhd2FpdCBleGVjdXRlRmV0Y2g8VD4oYXBpLCBcIlBVVFwiLCBwb3N0Qm9keSkpLmRhdGE7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlRGVsZXRlPFQ+KGFwaTogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXguZGVsZXRlKC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSk7XG4gICAgcmV0dXJuIChhd2FpdCBleGVjdXRlRmV0Y2g8VD4oYXBpLCBcIkRFTEVURVwiLCB1bmRlZmluZWQpKS5kYXRhO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUFwaShhcGk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IGxvY2F0aW9uID0gd2luZG93LmRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbjtcblxuICAgIC8vaWYgYXBpIGRvZXMgbm90IGluY2x1ZGUgdGhlIGxvY2F0aW9uIHRoZW4gYWRkIGl0LlxuICAgIGlmIChhcGkuaW5kZXhPZihsb2NhdGlvbikgPT09IC0xKSB7XG4gICAgICAgIC8vY2hlY2sgaWYgYXBpIHN0YXJ0IHdpdGggYSAvIGlmIG5vdCBhZGQgaXQuXG4gICAgICAgIGlmIChhcGkuaW5kZXhPZihcIi9cIikgIT09IDApIHtcbiAgICAgICAgICAgIGFwaSA9IFwiL1wiICsgYXBpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBpID0gbG9jYXRpb24gKyBhcGk7XG4gICAgfVxuICAgIHJldHVybiBhcGk7XG5cbn1cblxuZXhwb3J0IHR5cGUgVEV4ZWN1dGVGZXRjaFJlc3BvbnNlID1cbiAgICB7XG4gICAgICAgIGRhdGE6IGFueSB8IHVuZGVmaW5lZCxcbiAgICAgICAgcmVzcG9uc2U6IFJlc3BvbnNlIHwgdW5kZWZpbmVkLFxuICAgICAgICBpbmZvOlxuICAgICAgICB7XG4gICAgICAgICAgICBzdWNjZXNzOiBib29sZWFuLFxuICAgICAgICAgICAgZXJyb3I6IEFycmF5PFRVc2VyRXJyb3JzPlxuICAgICAgICB9XG4gICAgfVxuXG5leHBvcnQgdHlwZSBUVXNlckVycm9ycyA9XG4gICAge1xuICAgICAgICBjb2RlOiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgdXNlck1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgc3VnZ2VzdGlvbnM/OiBBcnJheTxzdHJpbmc+XG4gICAgICAgIGludGVybmFsU3VnZ2VzdGlvbnM/OiBBcnJheTxzdHJpbmc+XG4gICAgICAgIGFjdGlvbnM/OiBBcnJheTxzdHJpbmc+XG4gICAgICAgIGVycm9yU3RhY2s/OiBzdHJpbmcsXG4gICAgICAgIGFkZGl0aW9uYWxJbmZvPzogYW55XG4gICAgfVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUZldGNoPFQ+KGFwaTogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxURXhlY3V0ZUZldGNoUmVzcG9uc2U+IHtcbiAgICBsZXQgcmV0VmFsdWU6IFRFeGVjdXRlRmV0Y2hSZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogdW5kZWZpbmVkLFxuICAgICAgICByZXNwb25zZTogdW5kZWZpbmVkLFxuICAgICAgICBpbmZvOiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBbXVxuICAgICAgICB9XG4gICAgfVxuICAgICAgICAvL3RvIGdldCBuZXcgdG9rZW4gVE9ETzogY2hlY2sgaWYgZmFpbCB0aGVuIGNhbGxcbiAgICAvLyBhd2FpdCAkYWpheC5nZXQoXCJodHRwczovL2hzZi12bmV4dC5zaGFyZWRvLmNvLnVrL3NlY3VyaXR5L3JlZnJlc2hUb2tlbnM/Xz1cIiArIERhdGUubm93KTtcblxuICAgIFxuXG4gICAgbGV0IHVybCA9IHZhbGlkYXRlQXBpKGFwaSk7XG4gICAgbGV0IGZldGNoSGVhZGVycyA9IGJ1aWxkSGVhZGVycygpO1xuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogZmV0Y2hIZWFkZXJzLFxuICAgICAgICBib2R5OiBkYXRhID8gSlNPTi5zdHJpbmdpZnkoZGF0YSkgOiB1bmRlZmluZWRcbiAgICB9XG4gICAgKS50aGVuKGFzeW5jIChyZXNwb25zZSkgPT4ge1xuICAgICAgICByZXRWYWx1ZS5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICBpZiAocmVzcG9uc2Uub2sgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvZGU6IFwiQVBJX0VSUk9SXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNhbGwgdGhlIEFQSS4gc3RhdHVzVGV4dDogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWAsXG4gICAgICAgICAgICAgICAgdXNlck1lc3NhZ2U6IFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJLlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICAvL2NoZWNrIGlmIHJlc3BvbnNlIGlzIEpTT05cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKT8uaW5jbHVkZXMoXCJhcHBsaWNhdGlvbi9qc29uXCIpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXRWYWx1ZS5pbmZvLnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgY29kZTogXCJBUElfRVJST1JcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gZXh0cmFjdCB0aGUgZGF0YSBmcm9tIHRoZSBBUEkuIE1lc3NhZ2U6ICR7ZT8ubWVzc2FnZSB8fCBcIlVua25vd25cIn1gLFxuICAgICAgICAgICAgICAgIHVzZXJNZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gZXh0cmFjdCB0aGUgZGF0YSBmcm9tIHRoZSBBUEkuYFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZGF0YSwgcmVzcG9uc2UgfTtcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgbChlcnIoYEVycm9yIGZyb20gQVBJIENhbGwgJHt1cmx9YCksIGVycm9yKTtcblxuICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLnB1c2goe1xuICAgICAgICAgICAgY29kZTogXCJBUElfRVJST1JcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICB1c2VyTWVzc2FnZTogZXJyb3IubWVzc2FnZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4geyBkYXRhOiB1bmRlZmluZWQsIHJlc3BvbnNlOiB1bmRlZmluZWQgfTtcbiAgICB9KVxuXG4gICAgbGgxKGBSZXNwb25zZSBmcm9tICR7dXJsfWApO1xuICAgIGwocmVzcG9uc2UpO1xuXG4gICAgcmV0VmFsdWUuZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICBpZihyZXRWYWx1ZS5pbmZvLmVycm9yLmxlbmd0aCA+IDApe1xuICAgICAgICByZXRWYWx1ZS5pbmZvLnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgICAgbChlcnIoYEVycm9yIGZyb20gQVBJIENhbGwgJHt1cmx9YCksIGUpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNlY0JhY2tPbmUoKTtcblxuICAgIHJldHVybiByZXRWYWx1ZTtcbn1cblxuZnVuY3Rpb24gYnVpbGRIZWFkZXJzKCkge1xuICAgIGxldCBiZWFyZXIgPSBnZXRCZWFyZXJUb2tlbigpO1xuICAgIGxldCBmZXRjaEhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGZldGNoSGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIGlmIChiZWFyZXIpIHtcbiAgICAgICAgZmV0Y2hIZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgYmVhcmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoSGVhZGVycztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29va2llcygpOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcbiAgICBsZXQgcmV0VmFsdWU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgICBsZXQgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIikucmVkdWNlKGZ1bmN0aW9uIChjb29raWVzLCBjb29raWUpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gY29va2llLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhcnRzWzBdLnRyaW0oKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzWzFdO1xuXG4gICAgICAgICAgICByZXRWYWx1ZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvb2tpZXM7XG4gICAgfSwge30pO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJlYXJlclRva2VuKCkge1xuICAgIHZhciBjb29raWVzID0gZ2V0Q29va2llcygpO1xuICAgIHZhciB0b2tlbiA9IGNvb2tpZXNbXCJfYXBpXCJdO1xuXG4gICAgaWYgKHRva2VuKSByZXR1cm4gXCJCZWFyZXIgXCIgKyB0b2tlbjtcbiAgICByZXR1cm4gbnVsbDtcbn07IiwiaW1wb3J0IHsgZXhlY3V0ZVBvc3QgfSBmcm9tIFwiLi4vYXBpXCI7XG5pbXBvcnQgeyBJRmluZEJ5UXVlcnlPcHRpb25zIH0gZnJvbSBcIi4vSUZpbmRCeVF1ZXJ5SW5wdXRcIjtcbmltcG9ydCB7IElGaW5kQnlRdWVyeVJlc3VsdCB9IGZyb20gXCIuL0lGaW5kQnlRdWVyeVJlc3VsdFwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlRmluZEJ5UXVlcnk8VD4oaW5wdXRPcHRpb246IElGaW5kQnlRdWVyeU9wdGlvbnMpOiBQcm9taXNlPElGaW5kQnlRdWVyeVJlc3VsdDxUPj5cbntcbiAgICByZXR1cm4gZXhlY3V0ZVBvc3Q8SUZpbmRCeVF1ZXJ5UmVzdWx0PFQ+PihcIi9hcGkvdjEvcHVibGljL3dvcmtJdGVtL2ZpbmRCeVF1ZXJ5XCIsIGlucHV0T3B0aW9uKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbn0iLCJpbXBvcnQgeyBleGVjdXRlRmluZEJ5UXVlcnkgfSBmcm9tIFwiLi9leGVjdXRlRmluZEJ5UXVlcnkvRmluZEJ5UXVlcnlcIjtcblxuZXhwb3J0IGludGVyZmFjZSBzZWFyY2hSZXN1bHQgXG57XG4gICAgZm91bmQ6Ym9vbGVhbiwgXG4gICAgdmFsdWU6c3RyaW5nIHwgdW5kZWZpbmVkLCBcbiAgICBwYXJlbnRJZDpzdHJpbmcgfCB1bmRlZmluZWRcbiAgICBkZXB0aDpudW1iZXIsXG4gICAgZm91bmRJbldvcmtJdGVtSWQ6c3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHdhc0ZvdW5kSW5BbmNlc3Rvcjpib29sZWFuLFxuICAgIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6c3RyaW5nIHwgdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUod29ya0l0ZW1JZDogc3RyaW5nLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIHBhcmVudHM6IGJvb2xlYW4sIG1heERlcHRoPzogbnVtYmVyIHwgdW5kZWZpbmVkKVxuIHtcbiAgICBsZXQgdXNlTWF4RGVwdGggOiBib29sZWFuID0gbWF4RGVwdGggPyB0cnVlIDogZmFsc2U7XG4gICAgaWYobWF4RGVwdGggJiYgbWF4RGVwdGggPiAwKXtcbiAgICAgICAgdXNlTWF4RGVwdGggPSB0cnVlO1xuICAgIH1cblxuXG4gICAgbGV0IHJldFZhbHVlOnNlYXJjaFJlc3VsdCA9IHtmb3VuZDpmYWxzZSwgdmFsdWU6dW5kZWZpbmVkLCBwYXJlbnRJZDp1bmRlZmluZWQsIGRlcHRoOjAsIGZvdW5kSW5Xb3JrSXRlbUlkOnVuZGVmaW5lZCwgd2FzRm91bmRJbkFuY2VzdG9yOmZhbHNlLCBmb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lOnVuZGVmaW5lZH07XG5cbiAgICByZXRWYWx1ZSA9IGF3YWl0IHNlYXJjaEZvckF0dHJpYnV0ZSh3b3JrSXRlbUlkLCBhdHRyaWJ1dGVOYW1lKTtcblxuICAgIGlmKHJldFZhbHVlLmZvdW5kKXtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIH1cblxuICAgIGlmKCFwYXJlbnRzICl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcGFyZW50cyBvciBjaGlsZHJlbiB0byBzZWFyY2ggc28gb25seSBzZWFyY2hpbmcgY3VycmVudCB3b3JrIGl0ZW1cIik7XG4gICAgICAgIHJldHVybiByZXRWYWx1ZVxuICAgIH1cblxuICAgIGlmKHBhcmVudHMpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaGluZyBwYXJlbnRzXCIpO1xuICAgICAgICBsZXQgZGVwdGggPSAwO1xuICAgICAgICBsZXQgc2VhcmNoUGFyZW50ID0gYXN5bmMgKHBhcmVudElkOiBzdHJpbmcgfCB1bmRlZmluZWQpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlcHRoKys7XG4gICAgICAgICAgICBsZXQgcjogc2VhcmNoUmVzdWx0ID0ge2ZvdW5kOmZhbHNlLFxuICAgICAgICAgICAgICAgICB2YWx1ZTp1bmRlZmluZWQsIFxuICAgICAgICAgICAgICAgICBwYXJlbnRJZDp1bmRlZmluZWQsIGRlcHRoOmRlcHRoLCAvL2RlcHRoIGhlcmUgd2lsbCBiZSBvdmVycmlkZW4gaWYgdGhlcmUgaXMgYSBwYXJlbnRcbiAgICAgICAgICAgICAgICAgZm91bmRJbldvcmtJdGVtSWQ6dW5kZWZpbmVkLCBcbiAgICAgICAgICAgICAgICAgd2FzRm91bmRJbkFuY2VzdG9yOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBmb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lOnVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZighcGFyZW50SWQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcGFyZW50IGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgciA9IGF3YWl0IHNlYXJjaEZvckF0dHJpYnV0ZShwYXJlbnRJZCwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICAgci5kZXB0aCA9IGRlcHRoOyAvL3VwZGF0ZSBkZXB0aCBhcyBpdCB3aWxsIGJlIDBcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHIuZm91bmQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRm91bmQgYXR0cmlidXRlIGluIHBhcmVudFwiKTtcbiAgICAgICAgICAgICAgICByLndhc0ZvdW5kSW5BbmNlc3RvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgaWYodXNlTWF4RGVwdGggJiYgZGVwdGggPj0gbWF4RGVwdGghKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJNYXggZGVwdGggcmVhY2hlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgaWYoIXIucGFyZW50SWQpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHBhcmVudCBmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGZvdW5kIGluIHBhcmVudFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VhcmNoUGFyZW50KHIucGFyZW50SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0VmFsdWUgPSBhd2FpdCBzZWFyY2hQYXJlbnQocmV0VmFsdWUucGFyZW50SWQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXRWYWx1ZTtcblxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hGb3JBdHRyaWJ1dGUod29ya0l0ZW1JZDogc3RyaW5nLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpIHtcbiAgICAvL2dldCB0aGUgbWF0dGVyXG4gICAgbGV0IHJldFZhbHVlIDpzZWFyY2hSZXN1bHQgPSB7XG4gICAgICAgIGZvdW5kOmZhbHNlLCB2YWx1ZTp1bmRlZmluZWQsXG4gICAgICAgICBwYXJlbnRJZDp1bmRlZmluZWQsIGRlcHRoOjAsXG4gICAgICAgICAgZm91bmRJbldvcmtJdGVtSWQ6dW5kZWZpbmVkLFxuICAgICAgICAgICB3YXNGb3VuZEluQW5jZXN0b3I6ZmFsc2UsXG4gICAgICAgICAgIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6dW5kZWZpbmVkfTtcbiAgICBsZXQgcmVxID0ge1xuICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIndvcmtJdGVtSWRzXCI6IFtcbiAgICAgICAgICAgICAgICB3b3JrSXRlbUlkXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiZW5yaWNoXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogXCJ0aXRsZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInBhcmVudC5pZFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInR5cGUuc3lzdGVtTmFtZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInJlZmVyZW5jZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBhdHRyaWJ1dGVOYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2hpbmcgdXNpbmcgU2hhcmVEbyBJZDogXCIgKyB3b3JrSXRlbUlkKTtcbiAgICBsZXQgaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5ID0gYXdhaXQgZXhlY3V0ZUZpbmRCeVF1ZXJ5PGFueT4ocmVxKTtcbiAgICBjb25zb2xlLmxvZyhgV29yayBpdGVtICR7d29ya0l0ZW1JZH0gZm91bmRgKTtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0cykpO1xuXG5cbiAgICBsZXQgdHlwZVN5c3RlbU5hbWUgPSBodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0c1swXS5kYXRhW1widHlwZS5zeXN0ZW1OYW1lXCJdO1xuICAgIGxldCBwYXJlbnRJZCA9ICAgICAgIGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzWzBdLmRhdGFbXCJwYXJlbnQuaWRcIl07XG4gICAgbGV0IGF0dHJpYnV0ZSA9ICAgICAgaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5LnJlc3VsdHNbMF0uZGF0YVthdHRyaWJ1dGVOYW1lXSBhcyBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgXG4gICAgY29uc29sZS5sb2coYFR5cGUgc3lzdGVtIG5hbWUgaXMgJHt0eXBlU3lzdGVtTmFtZX1gKTtcbiAgICBjb25zb2xlLmxvZyhgUGFyZW50IElkIGlzICR7cGFyZW50SWR9YCk7XG4gICAgY29uc29sZS5sb2coYEF0dHJpYnV0ZSBbJHthdHRyaWJ1dGVOYW1lfV0gaXMgJHthdHRyaWJ1dGV9YCk7XG5cbiAgICByZXRWYWx1ZS52YWx1ZSA9IGF0dHJpYnV0ZTtcbiAgICBpZihhdHRyaWJ1dGUpe1xuICAgICAgICByZXRWYWx1ZS5mb3VuZCA9IHRydWU7XG4gICAgICAgIHJldFZhbHVlLmZvdW5kSW5Xb3JrSXRlbUlkID0gd29ya0l0ZW1JZDtcbiAgICAgICAgcmV0VmFsdWUuZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZSA9IHR5cGVTeXN0ZW1OYW1lO1xuICAgIH1cbiAgICByZXRWYWx1ZS5wYXJlbnRJZCA9IHBhcmVudElkO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIFxufSIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xuaW1wb3J0IHsgSVNoYXJlZG9CbGFkZU1vZGVsLCBUU2hhcmVEb0JsYWRlLCBJQ29uZmlndXJhdGlvbkhvc3QgfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9TaGFyZWRvQXNwZWN0TW9kZWxzXCI7XG5pbXBvcnQgeyBJRGVidWcsIE9ic2VydmFibGVJRGVidWcgfSBmcm9tIFwiLi9JRGVidWdcIjtcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB7IFRTaGFyZWRvIH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvVFNoYXJlZG9cIjtcbmltcG9ydCB7IElEZWZhdWx0U2V0dGluZ3MsIElXaWRnZXRKc29uLCBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbiB9IGZyb20gXCIuL0lXaWRnZXRKc29uXCI7XG5pbXBvcnQgeyBTaGFyZURvRXZlbnQsIGZpcmVFdmVudCB9IGZyb20gXCIuLi8uLi9Db21tb24vRXZlbnRzSGVscGVyXCI7XG5pbXBvcnQgeyBjbGVhclNlYywgZXJyLCBpbmYsIGwsIGxoMSwgbnYsIHdybiB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vTG9nXCJcbmltcG9ydCB7IElGb3JtQnVpbGRlckRhdGEgfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9Bc3BlY3QvSUZvcm1CdWlsZGVyXCI7XG5pbXBvcnQgeyBUVXNlckVycm9ycyB9IGZyb20gXCIuLi8uLi9Db21tb24vYXBpL2FwaVwiO1xuaW1wb3J0IHsgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdCwgdG9PYnNlcnZhYmxlT2JqZWN0IH0gZnJvbSBcIi4vS09Db252ZXJ0ZXJcIjtcbmltcG9ydCB7IGdldE5lc3RlZFByb3BlcnR5LCBzZXROZXN0ZWRQcm9wZXJ0eSB9IGZyb20gXCIuLi8uLi9Db21tb24vT2JqZWN0SGVscGVyXCI7XG5pbXBvcnQgeyBlc2NhcGVIdG1sIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBKc29uVG9IdG1sQ29udmVydGVyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Kc29uVG9IVE1MQ29udmVydGVyXCI7XG5pbXBvcnQgeyBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9zZWFyY2hGb3JBdHRyaWJ1dGVXaXRoUGFyZW50c1wiO1xuXG5cbmNvbnNvbGUubG9nKFwidjogLSA1LjI3XCIpXG5cbmV4cG9ydCBjb25zdCBGT01SX0JVSUxERVJfUEFUSF9TVFJJTkcgPSBcImFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGFcIjtcbmV4cG9ydCBjb25zdCBFUlJPUl9ESVZfU0VMRUNUT1IgPSBcIiNyZW5kZXItZXJyb3JzLWhlcmVcIjtcblxuXG5cblxuXG5cbmludGVyZmFjZSBJREVBc3BlY3RDb25maWd1cmF0aW9uIHtcbiAgICBtb2RlbDogSVNoYXJlZG9CbGFkZU1vZGVsO1xuICAgIGJsYWRlOiBUU2hhcmVEb0JsYWRlO1xufVxuXG50eXBlIE9ic2VydmFibGVpZnk8VD4gPSB7XG4gICAgW1AgaW4ga2V5b2YgVF06IGtvLk9ic2VydmFibGU8VFtQXT47XG59O1xuXG5leHBvcnQgdHlwZSBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPVxuICAgIHsgW0sgaW4ga2V5b2YgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+XToga28uT2JzZXJ2YWJsZTxJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5bS10+OyB9XG5cbi8vIGV4cG9ydCB0eXBlIElPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSAge2RlYnVnOiBrby5PYnNlcnZhYmxlPE9ic2VydmFibGVJRGVidWc+fSAmXG4vLyB7XG4vLyAgICAgW0sgaW4ga2V5b2YgVENvbmZpZ106IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VENvbmZpZz5bS107XG5cbi8vIH1cblxuZXhwb3J0IHR5cGUgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+ID0gSUNvbmZpZ3VyYXRpb25Ib3N0ICYgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz47XG4vLyBhYnN0cmFjdCBjbGFzcyBDcmVhdG9yPFRDb25maWc+IHtcbi8vICAgICBwdWJsaWMgYWJzdHJhY3QgRmFjdG9yeU1ldGhvZChlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+LCBiYXNlTW9kZWw6IGFueSk6IGFueTtcbi8vIH1cblxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1CdWlsZGVyRmllbGRQYXRoKGZvcm1CdWlsZGVyRmllbGQ6IHN0cmluZykge1xuICAgIHJldHVybiBgJHtGT01SX0JVSUxERVJfUEFUSF9TVFJJTkd9LiR7Zm9ybUJ1aWxkZXJGaWVsZH1gO1xufVxuXG50eXBlIE9ic2VydmFibGVQZXJzb248VENvbmZpZz4gPSBPYnNlcnZhYmxlaWZ5PElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPj47XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlSURFQXNwZWN0PFRDb25maWcsIFRQZXJzaXRhbmNlPiAge1xuICAgIF9kYXRhOiBhbnk7IC8vbm9uIG1vZGVsIGRhdGEgc3RvcmFnZVxuICAgIG9yaWdpbmFsQ29uZmlndXJhdGlvbiE6IFRDb25maWc7XG4gICAgY29uZmlndXJhdGlvbiE6IElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbiAgICBkZWZhdWx0czogSURlZmF1bHRTZXR0aW5nczxUQ29uZmlnPiB8IHVuZGVmaW5lZDtcbiAgICBlbGVtZW50ITogSFRNTEVsZW1lbnQ7XG4gICAgbW9kZWw6IGFueTtcbiAgICBlbmFibGVkITogYm9vbGVhbjtcbiAgICBibGFkZSE6IFRTaGFyZURvQmxhZGU7XG4gICAgbG9hZGVkIToga28uT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgICBzaGFyZWRvSWQ6IGFueTtcbiAgICBzaGFyZWRvVHlwZVN5c3RlbU5hbWUhOiBrby5PYnNlcnZhYmxlPHN0cmluZz47XG4gICAgdmFsaWRhdGlvbjogYW55O1xuICAgIHZhbGlkYXRpb25FcnJvckNvdW50IToga28uT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIGJhc2VNb2RlbCE6IFRTaGFyZWRvPGFueT47XG4gICAgdGhpc0NvbXBvbmVudE5hbWUhOiBzdHJpbmc7XG4gICAgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhOiBzdHJpbmcgfCB1bmRlZmluZWQ7IC8vVGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbVxuICAgIG9wdGlvbnMhOiBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz5cbiAgICB1bmlxdWVJZCE6IHN0cmluZztcbiAgICB3aWRnZXRTZXR0aW5ncyE6IElXaWRnZXRKc29uPFRDb25maWc+O1xuICAgIGFzcGVjdExvZ091dHB1dDogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgbGl2ZUNvbmZpZ0RpdjogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgbGl2ZUNvbmZpZ0RhdGE6IGFueTtcbiAgICBlcnJvckRpdlNlbGVjdG9yOiBzdHJpbmc7XG4gICAgZXJyb3JzOiBrby5PYnNlcnZhYmxlQXJyYXk8VFVzZXJFcnJvcnM+IHwgdW5kZWZpbmVkO1xuICAgIFxuICAgIFxuXG5cblxuICAgIC8qKlxuICAgICAqIEJhc2UgQ29uc3RydWN0b3IgZm9yIGFsbCBJREVBc3BlY3RzLCBmb3JjZXMgdGhlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBsb2FkIGFuZCBzYXZlIG1ldGhvZHNcbiAgICAgKiBAcGFyYW0gY29tcG9uZW50TmFtZSAvL1RoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgZS5nLiBBc3BlY3QuUXVpY2tWaWV3XG4gICAgICogQHBhcmFtIGxvYWRTYXZlTG9jYXRpb24gLy9UaGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tIGUuZy4gbW9kZWwuYXNwZWN0LkZvcm1CdWlsZGVyLmZvcm1EYXRhXG4gICAgICogQHBhcmFtIGVsZW1lbnQgLy9UaGUgZWxlbWVudCB0aGF0IHRoZSBhc3BlY3QgaXMgYm91bmQgdG9cbiAgICAgKiBAcGFyYW0gY29uZmlndXJhdGlvbiAvL1RoZSBjb25maWd1cmF0aW9uIHBhc3NlZCBpbiBmcm9tIHRoZSBibGFkZSBhbmQgdGhlIGRlc2lnbiB0aW1lIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0gYmFzZU1vZGVsIC8vVGhlIGJhc2UgbW9kZWwgcGFzc2VkIGluIGZyb20gdGhlIGJsYWRlXG4gICAgICogQHBhcmFtIGRlZmF1bHRzIC8vVGhlIGRlZmF1bHRzIHBhc3NlZCBpbiBmcm9tIHRoZSB3aWRnZXQgdG8gc2V0IGluY2FzZSBvZiBiYWQgY29uZmlndXJhdGlvbiBvciBtaXNzaW5nIGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpO1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBUQ29uZmlnLCBiYXNlTW9kZWw6IFRTaGFyZWRvPGFueT4pXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKC4uLmFycjogYW55W10pIHtcblxuICAgICAgICB0aGlzLndpZGdldFNldHRpbmdzID0gdGhpcy5zZXRXaWRnZXRKc29uU2V0dGluZ3MoKTtcbiAgICAgICAgdGhpcy50aGlzQ29tcG9uZW50TmFtZSA9IHRoaXMuc2V0VGhpc0NvbXBvbmVudE5hbWUoKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IHRoaXMuc2V0RGVmYXVsdHMoKTsgLy9zZXR1cCB0aGUgZGVmYXVsdCBieSBjYWxsaW5nIHRoZSBhYnN0cmFjdCBtZXRob2QgaW4gdGhlIGNoaWxkIGNsYXNzXG5cbiAgICAgICAgdGhpcy5lcnJvckRpdlNlbGVjdG9yID0gRVJST1JfRElWX1NFTEVDVE9SO1xuICAgICAgICB0aGlzLmVycm9ycyA9IGtvLm9ic2VydmFibGVBcnJheTxUVXNlckVycm9ycz4oKTtcblxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy9UaGlzIGlzIHRoZSBiYXNlIGNvbnN0cnVjdG9yXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgLy9UaGlzIGlzIHRoZSBjb25zdHJ1Y3RvciB0aGF0IGlzIGNhbGxlZCBieSB0aGUgSURFXG4gICAgICAgICAgICB0aGlzLnVuaXF1ZUlkID0gdXVpZCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXNlKGFyclswXSwgYXJyWzFdLCBhcnJbMl0pO1xuICAgICAgICAgICAgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPSB0aGlzLnNldExvY2F0aW9uT2ZEYXRhVG9Mb2FkQW5kU2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvblNldHVwXCIsIHRoaXMubW9kZWwpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cCgpO1xuICAgICAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJhZnRlclNldHVwXCIsIHRoaXMubW9kZWwpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cExpdmVDb25maWcoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBFcnJvck1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQXNwZWN0TG9nT3V0cHV0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIF9pbml0aWFsaXNlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPiwgYmFzZU1vZGVsOiBUU2hhcmVkbzxhbnk+KSB7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgLy9TaGFyZURvIHBhc3NlcyB0aGUgY29uZmlnIGFzIHdlbGwgYXMgb3RoZXIgc3R1ZmYsIHNvIHdlIG5lZWQgdG8gZXh0cmFjdCB0aGUgY29uZmlnXG4gICAgICAgIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiBhcyBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz47XG4gICAgICAgIHRoaXMuYmFzZU1vZGVsID0gYmFzZU1vZGVsO1xuXG4gICAgICAgIC8vIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uXG5cbiAgICAgICAgbGV0IGJhc2VEZWZhdWx0czogSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248YW55PiA9IHtcbiAgICAgICAgICAgIGRlYnVnOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbG9nVG9Db25zb2xlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxpdmVDb25maWc6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uZmlndXJhdGlvbi5kZWJ1ZyA9ICQuZXh0ZW5kKGJhc2VEZWZhdWx0cy5kZWJ1ZywgY29uZmlndXJhdGlvbi5kZWJ1ZykgYXMgSURlYnVnO1xuXG4gICAgICAgIC8vIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uLmRlYnVnID0gJC5leHRlbmQoYmFzZURlZmF1bHRzLmRlYnVnLCB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbi5kZWJ1ZykgYXMgSURlYnVnO1xuXG4gICAgICAgIC8vIGNvbmZpZ3VyYXRpb24uZGVidWcgPSAkLmV4dGVuZChiYXNlRGVmYXVsdHMsIGNvbmZpZ3VyYXRpb24uZGVidWcpIGFzIElEZWJ1ZztcblxuICAgICAgICAvLyB0aGlzLmNvbmZpZ3VyYXRpb24gPSAkLmV4dGVuZChiYXNlRGVmYXVsdHMsIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uKSBhcyBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz47XG4gICAgICAgIC8vIHRoaXMuZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gTWVyZ2UgdGhlIGNvbmZpZ3VyYXRpb24gd2l0aCB0aGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gJC5leHRlbmQodGhpcy5kZWZhdWx0cywgdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24pIGFzIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcblxuICAgICAgICAvL2NyZWF0ZSBhIG5ldyBtb2RlbFxuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5jb25maWd1cmF0aW9uLl9ob3N0Lm1vZGVsO1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLm1vZGVsLmNhbkVkaXQ7XG4gICAgICAgIHRoaXMuYmxhZGUgPSB0aGlzLmNvbmZpZ3VyYXRpb24uX2hvc3QuYmxhZGU7XG4gICAgICAgIHRoaXMubG9hZGVkID0gdGhpcy5sb2FkZWQgfHwga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgIC8vIE1hcCB0aGUgYmFzZSBtb2RlbCBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMuc2hhcmVkb0lkID0gdGhpcy5jb25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbC5pZDtcbiAgICAgICAgaWYgKCF0aGlzLnNoYXJlZG9JZCB8fCB0aGlzLnNoYXJlZG9JZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9JZCBmb3VuZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSA9IHRoaXMuY29uZmlndXJhdGlvbi5faG9zdC5tb2RlbC5zaGFyZWRvVHlwZVN5c3RlbU5hbWU7XG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUgfHwgdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBzaGFyZWRvVHlwZVN5c3RlbU5hbWUgZm91bmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICAodGhpcy5vcHRpb25zIGFzIGFueSkgPSB0b09ic2VydmFibGVPYmplY3QodGhpcy5jb25maWd1cmF0aW9uLCAodGhpcy5vcHRpb25zIGFzIGFueSkpO1xuXG5cbiAgICAgICAgLy8gVmFsaWRhdGlvblxuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSB7fTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JDb3VudCA9IHRoaXMudmFsaWRhdGlvbkVycm9yQ291bnQgfHwga28ub2JzZXJ2YWJsZSgwKTtcblxuICAgICAgICB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9IHRoaXMuc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk7IC8vc2V0dXAgdGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbSBieSBjYWxsaW5nIHRoZSBhYnN0cmFjdCBtZXRob2QgaW4gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25Jbml0aWFsaXNlXCIsIHRoaXMubW9kZWwpO1xuICAgIH1cblxuICAgIGNsZWFyRXJyb3JzKCkge1xuICAgICAgICB0aGlzLmVycm9ycz8ucmVtb3ZlQWxsKCk7XG4gICAgfVxuXG4gICAgc2V0dXBFcnJvck1hbmFnZXIoKSB7XG5cbiAgICAgICAgdGhpcy5sKFwiU2V0dGluZyB1cCBlcnJvciBtYW5hZ2VyXCIpO1xuICAgICAgICB0aGlzLmVycm9ycz8uc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbmYoXCJFcnJvcnMgY2hhbmdlZFwiLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkRXJyb3JEaXYoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBzZXR1cExpdmVDb25maWcoKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5kZWJ1Zy5zdWJzY3JpYmUoKG5ld1ZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZS5saXZlQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUxpdmVDb25maWcobmV3VmFsdWUubGl2ZUNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICB0aGlzLmFjdGl2YXRlTGl2ZUNvbmZpZygodGhpcy5vcHRpb25zLmRlYnVnKCkubGl2ZUNvbmZpZyBhcyBhbnkpKCkpOyAvL1RPRE8gZml4IHR5cGluZ3NcbiAgICB9XG5cbiAgICBhY3RpdmF0ZUxpdmVDb25maWcoYWN0aXZlOiBib29sZWFuIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmxpdmVDb25maWdEaXY/LnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGl2ZUNvbmZpZ0RpdikgeyAvL2xlYXZlIGFsb25lIGlmIGFscmVhZHkgYWN0aXZlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmwoXCJTZXR0aW5nIHVwIGxpdmUgY29uZmlnXCIpO1xuXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWREYXRhID0gSlNPTi5zdHJpbmdpZnkodGhpcy5jb25maWd1cmF0aW9uLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJfaG9zdFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSwgNCk7XG5cbiAgICAgICAgLy9jbG9uZSB0aGUgY29uZmlnXG4gICAgICAgIGxldCBjb25maWcgPSBrby5vYnNlcnZhYmxlKHNlcmlhbGl6ZWREYXRhKTtcblxuICAgICAgICB0aGlzLmxpdmVDb25maWdEYXRhID0ge1xuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHRpbWVvdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG5cbiAgICAgICAgdGhpcy5saXZlQ29uZmlnRGl2ID0gdGhpcy5jcmVhdGVMaXZlQ29uZmlnRGl2KCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LnByZXBlbmQodGhpcy5saXZlQ29uZmlnRGl2KTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbmZpZy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJUaGUgbmV3IHZhbHVlIGlzIFwiICsgbmV3VmFsdWUpXG5cbiAgICAgICAgICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdDb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZygpKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0aWFsaXNlKHRoaXMuZWxlbWVudCwgbmV3Q29uZmlnLCB0aGlzLmJhc2VNb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXQobmV3Q29uZmlnKTtcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSB0cnVlO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMzAwMCk7XG5cblxuICAgICAgICAvLyBrby5hcHBseUJpbmRpbmdzKHRoaXMubGl2ZUNvbmZpZ0RhdGEsIHRoaXMubGl2ZUNvbmZpZ0Rpdik7eFxuXG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBYnN0cmFjdCBtZXRob2QgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzIHRvIHJlZnJlc2ggdGhlIGFzcGVjdCBiYXNlZCBvbiB0aGUgbmV3IGNvbmZpZ1xuICAgICAqIEBwYXJhbSBuZXdDb25maWcgXG4gICAgICovXG4gICAgYWJzdHJhY3QgcmVmcmVzaChuZXdDb25maWc6IGFueSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAqIEFic3RyYWN0IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gcmVzZXQgdGhlIGFzcGVjdCBiYXNlZCBvbiB0aGUgbmV3IGNvbmZpZ1xuICAgICogQHBhcmFtIG5ld0NvbmZpZyBcbiAgICAqL1xuICAgIGFic3RyYWN0IHJlc2V0KG5ld0NvbmZpZzogYW55KTogdm9pZDtcblxuICAgIGVuc3VyZVN0eWxlc0xvYWRlZChocmVmOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsaW5rW2hyZWY9XCIke2hyZWZ9XCJdYCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgICAgICBsaW5rLmhyZWYgPSBocmVmO1xuICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG4gICAgICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUxpdmVDb25maWdEaXYoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvLyBDcmVhdGUgdGhlIG91dGVyIDxkaXY+IHdpdGggY2xhc3MgXCJjb2wtc20tMTIgZm9ybWJ1aWxkZXItZWRpdG9yLWpzb25cIlxuICAgICAgICBjb25zdCBvdXRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBvdXRlckRpdi5jbGFzc05hbWUgPSAnY29sLXNtLTEyIGZvcm1idWlsZGVyLWVkaXRvci1qc29uJztcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGlubmVyIDxkaXY+IHdpdGggdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGVzXG4gICAgICAgIGNvbnN0IGlubmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGlubmVyRGl2LmlkID0gJ2xpdmVDb25maWcnO1xuICAgICAgICBpbm5lckRpdi5jbGFzc05hbWUgPSAnZm9ybS1jb250cm9sIHRleHRhcmVhJztcbiAgICAgICAgaW5uZXJEaXYuc3R5bGUuaGVpZ2h0ID0gJzMwMHB4JztcbiAgICAgICAgLy8gaW5uZXJEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWJpbmQnLCAnc3ludGF4RWRpdG9yOiBsaXZlQ29uZmlnRGF0YS5jb25maWcsIGVuYWJsZTogdHJ1ZSwgZXZlbnQ6IHsgZm9jdXNvdXQ6IGxpdmVDb25maWdEYXRhLm9uRm9jdXNPdXQgfScpO1xuICAgICAgICBpbm5lckRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcsICdzeW50YXhFZGl0b3I6IGxpdmVDb25maWdEYXRhLmNvbmZpZycpO1xuICAgICAgICAvLyBpbm5lckRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcsICdzeW50YXhFZGl0b3I6IG1vZGVsLmNvbmZpZycpO1xuICAgICAgICAvLyBBcHBlbmQgdGhlIGlubmVyRGl2IHRvIHRoZSBvdXRlckRpdlxuICAgICAgICBvdXRlckRpdi5hcHBlbmRDaGlsZChpbm5lckRpdik7XG5cbiAgICAgICAgcmV0dXJuIG91dGVyRGl2O1xuICAgIH1cblxuICAgIGFzeW5jIGdldERhdGEoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gbG9jYXRpb24gdG8gbG9hZCBkYXRhIGZyb20gc2V0IC0gdGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRlblwiLCBcInJlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5lc3RlZERhdGEgPSBnZXROZXN0ZWRQcm9wZXJ0eSh0aGlzLm1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG5cbiAgICAgICAgaWYobmVzdGVkRGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIkRhdGEgZm91bmQgYXQgbG9jYXRpb25cIiwgXCJncmVlblwiLCBuZXN0ZWREYXRhKTtcbiAgICAgICAgICAgIGxldCByZXRWYWx1ZSA9IGtvLnRvSlMobmVzdGVkRGF0YSk7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIkRhdGEgZm91bmQgYXQgbG9jYXRpb25cIiwgXCJncmVlblwiLCByZXRWYWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgICAgIH1cblxuICAgIFxuXG4gICAgICAgIGlmKG5lc3RlZERhdGEgPT09IHVuZGVmaW5lZCAmJiB0aGlzLm9wdGlvbnMuZGF0YVNldHRpbmdzKCkuZ2V0VmFsdWVVc2luZ1BhcmVudHMgPT09IHRydWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUodGhpcy5zaGFyZWRvSWQsdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsdGhpcy5vcHRpb25zLmRhdGFTZXR0aW5ncygpLmdldFZhbHVlVXNpbmdQYXJlbnRzISx0aGlzLm9wdGlvbnMuZGF0YVNldHRpbmdzKCkubWF4RGVwdGgpLnRoZW4oKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5mb3VuZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmVzdGVkRGF0YTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGJ1aWxkRXJyb3JEaXYoKSB7XG4gICAgICAgIHRoaXMuaW5mKFwiQnVpbGRpbmcgZXJyb3IgZGl2XCIpXG4gICAgICAgIGxldCBlcnJvckRpdiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZXJyb3JEaXZTZWxlY3Rvcik7XG4gICAgICAgIGlmICghZXJyb3JEaXYgKSB7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGwoXCJlcnJvckRpdi5pbm5lckhUTUxcIilcbiAgICAgICAgZXJyb3JEaXYuaW5uZXJIVE1MID0gXCJcIjsgLy9jbGVhbiBvdXQgdGhlIGRpdlxuXG4gICAgICAgIGlmKCF0aGlzLmVycm9ycylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5lcnJvcnMgPSBrby5vYnNlcnZhYmxlQXJyYXk8VFVzZXJFcnJvcnM+KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5lcnJvcnMoKS5sZW5ndGggPT09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlcnJvckNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVycm9yRGl2LmFwcGVuZENoaWxkKGVycm9yQ29udGFpbmVyRGl2KTtcblxuICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3ItY29udGFpbmVyXCI7XG4gICAgICAgIGxldCB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRpdGxlRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci10aXRsZVwiO1xuICAgICAgICB0aXRsZURpdi5pbm5lclRleHQgPSBcIlRoZXJlIGhhcyBiZWVuIGFuIGVycm9yOlwiO1xuICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG4gICAgICAgIGxldCBmb3JlYWNoRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZXJyb3JDb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZm9yZWFjaERpdik7XG4gICAgICAgXG4gICAgICAgIHRoaXMuZXJyb3JzKCkuZm9yRWFjaCgoZXJyb3IpID0+IHtcblxuICAgICAgICAgICAgbGV0IHVzZXJNZXNzYWdlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHVzZXJNZXNzYWdlRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci11c2VyLW1lc3NhZ2VcIjtcbiAgICAgICAgICAgIHVzZXJNZXNzYWdlRGl2LmlubmVySFRNTCA9IGVycm9yLnVzZXJNZXNzYWdlO1xuXG5cbiAgICAgICAgIFxuICAgICAgICAgICAgdXNlck1lc3NhZ2VEaXYub25jbGljayA9ICgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIGEgZGl2IHRoYXQgY2FuIHNjb2xsXG4gICAgICAgICAgICAgICAgbGV0IGRldGFpbGVkTWVzc2FnZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgZGV0YWlsZWRNZXNzYWdlRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1kZXRhaWxlZC1tZXNzYWdlXCI7XG4gICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBlc2NhcGVIdG1sKGVycm9yLmNvZGUgfHwgXCJcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVzY2FwZUh0bWwoZXJyb3IubWVzc2FnZSB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyTWVzc2FnZSA9IGVzY2FwZUh0bWwoZXJyb3IudXNlck1lc3NhZ2UgfHwgXCJcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JTdGFjayA9IGVzY2FwZUh0bWwoZXJyb3IuZXJyb3JTdGFjayB8fCBcIlwiKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWxJbmZvID0gSnNvblRvSHRtbENvbnZlcnRlci5jb252ZXJ0KGVycm9yLmFkZGl0aW9uYWxJbmZvIHx8IHt9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGh0bWwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+RXJyb3I6ICR7Y29kZX08L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+TWVzc2FnZTo8L3N0cm9uZz4gJHttZXNzYWdlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPlVzZXIgTWVzc2FnZTo8L3N0cm9uZz4gJHt1c2VyTWVzc2FnZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5TdGFjazo8L3N0cm9uZz4gJHtlcnJvclN0YWNrfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkFkZGl0aW9uYWwgSW5mbzo8L3N0cm9uZz4gJHthZGRpdGlvbmFsSW5mb308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcblxuXG4gICAgICAgICAgICAgICAgZGV0YWlsZWRNZXNzYWdlRGl2LmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICAgICAgICAgICAgICAkdWkuZXJyb3JEaWFsb2coZGV0YWlsZWRNZXNzYWdlRGl2KTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGZvcmVhY2hEaXYuYXBwZW5kQ2hpbGQodXNlck1lc3NhZ2VEaXYpO1xuXG4gICAgICAgICAgICBpZiAoZXJyb3Iuc3VnZ2VzdGlvbnMgJiYgZXJyb3Iuc3VnZ2VzdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBzdWdnZXN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLXN1Z2dlc3Rpb25zXCI7XG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnNEaXYuaW5uZXJIVE1MID0gYDxiPlN1Z2dlc3Rpb25zOjwvYj48YnIvPiR7ZXJyb3Iuc3VnZ2VzdGlvbnMuam9pbihcIjxici8+XCIpfWA7XG4gICAgICAgICAgICAgICAgZm9yZWFjaERpdi5hcHBlbmRDaGlsZChzdWdnZXN0aW9uc0Rpdik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlcnJvci5hY3Rpb25zICYmIGVycm9yLmFjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBhY3Rpb25zRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1hY3Rpb25zXCI7XG4gICAgICAgICAgICAgICAgYWN0aW9uc0Rpdi5pbm5lckhUTUwgPSBgPGI+QWN0aW9uczo8L2I+PGJyLz4ke2Vycm9yLmFjdGlvbnMuam9pbihcIjxici8+XCIpfWA7XG4gICAgICAgICAgICAgICAgZm9yZWFjaERpdi5hcHBlbmRDaGlsZChhY3Rpb25zRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVycm9yLmludGVybmFsU3VnZ2VzdGlvbnMgJiYgZXJyb3IuaW50ZXJuYWxTdWdnZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGludGVybmFsU3VnZ2VzdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGludGVybmFsU3VnZ2VzdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWludGVybmFsLXN1Z2dlc3Rpb25zXCI7XG4gICAgICAgICAgICAgICAgaW50ZXJuYWxTdWdnZXN0aW9uc0Rpdi5pbm5lckhUTUwgPSBgPGI+SW50ZXJuYWwgU3VnZ2VzdGlvbnM6PC9iPjxici8+JHtlcnJvci5pbnRlcm5hbFN1Z2dlc3Rpb25zLmpvaW4oXCI8YnIvPlwiKX1gO1xuICAgICAgICAgICAgICAgIGZvcmVhY2hEaXYuYXBwZW5kQ2hpbGQoaW50ZXJuYWxTdWdnZXN0aW9uc0Rpdik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZygpLnN1cHBvcnRSZXF1ZXN0RW5hYmxlZCkge1xuICAgICAgICAgICAgbGV0IGFjdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBhY3Rpb25EaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLXN1cHBvcnQtYWN0aW9uXCI7XG4gICAgICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChhY3Rpb25EaXYpO1xuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBidXR0b24uY2xhc3NOYW1lID0gXCJidG4gYnRuLXByaW1hcnlcIjtcbiAgICAgICAgICAgIC8vIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJpbmRcIixcImNsaWNrOmNyZWF0ZVN1cHBvcnRUYXNrLHZpc2libGU6b3B0aW9ucy5kZWJ1Zy4uc3VwcG9ydFJlcXVlc3RFbmFibGVkXCIpO1xuICAgICAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9IFwiQ3JlYXRlIFN1cHBvcnQgVGFza1wiO1xuICAgICAgICAgICAgYWN0aW9uRGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH1cblxuXG5cblxuICAgIH1cblxuICAgIHNldERhdGEodmFsdWU6IFRQZXJzaXRhbmNlIHwgdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gbG9jYXRpb24gdG8gc2F2ZSBkYXRhIHRvIHNldCAtIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZW5cIiwgXCJyZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxldCB2YWx1ZVRvU2V0OiBhbnkgPSB2YWx1ZTtcbiAgICAgICAgLy8gaWYodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEuaW5jbHVkZXMoXCJmb3JtQnVpbGRlclwiKSlcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgLy9mb3JtYnVpbGRlciBEYXRhIGFsd2F5cyBuZWVkIHRvIGJlIHN0cmluZ1xuICAgICAgICAvLyAgICAgdGhpcy5sb2coXCJTZXR0aW5nIGZvcm1idWlsZGVyIGRhdGEgLSBjb252ZXJ0aW5nIHRvIHN0cmluZ1wiLCBcImdyZWVuXCIsIHZhbHVlKVxuICAgICAgICAvLyAgICAgdmFsdWVUb1NldCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgLy8gICAgIHRoaXMubG9nKFwiYWZ0ZXIgU2V0dGluZyBmb3JtYnVpbGRlciBkYXRhIC0gY29udmVydGVkIHRvIHN0cmluZ1wiLCBcImdyZWVuXCIsIHZhbHVlVG9TZXQpXG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5sb2coXCJTZXR0aW5nIGRhdGEgYXQgbG9jYXRpb25cIiwgXCJncmVlblwiLCB2YWx1ZVRvU2V0KTtcbiAgICAgICAgc2V0TmVzdGVkUHJvcGVydHkodGhpcy5tb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIHZhbHVlVG9TZXQpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uRGF0YUNoYW5nZWRcIiwgdGhpcy5tb2RlbCk7XG5cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogISBpbXBvcnRhbnQ6IE1hbmRhdG9yeSBtZXRob2QgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzIHRvIHNldCB0aGUgZGVmYXVsdHNcbiAgICAgKiAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSB0aGUgY29uc3RydWN0b3IgdG8gc2V0IHRoZSBkZWZhdWx0c1xuICAgICAqIEByZXR1cm5zIERlZmF1bHRzPFRDb25maWc+XG4gICAgICogQG1lbWJlcm9mIEJhc2VJREVBc3BlY3RcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXREZWZhdWx0cygpOiBJRGVmYXVsdFNldHRpbmdzPFRDb25maWc+O1xuXG4gICAgLy8gLyoqXG4gICAgLy8gICogISBpbXBvcnRhbnQ6IE1hbmRhdG9yeSBtZXRob2QgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzIHRvIHNldCB0aGUgZGVmYXVsdHMgZm9yIHRoZSB3aWRnZXQuanNvblxuICAgIC8vICAqL1xuICAgIC8vIGFic3RyYWN0IHNldEV4YW1wbGVGb3JNb2RlbGxlcigpOiBEZWZhdWx0czxUQ29uZmlnPjtcblxuICAgIC8qKlxuICAgICogIUlNUE9SVEFOVCAtIFRoaXMgaXMgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGxvYWQgYW5kIHNhdmUgdG9cbiAgICAqIEV4YW1wbGVzIG9mIHRoaXMgYXJlOlxuICAgICogLSBhc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhLntmb3JtQnVpbGRlckZpZWxkfVxuICAgICogLSBhc3BlY3REYXRhLm9kc0VudGl0eVBpY2tlclxuICAgICogLSB1bmRlZmluZWQgKGlmIG5vIGRhdGEgaXMgdG8gYmUgbG9hZGVkIG9yIHNhdmVkIGJ5IHRoZSBiYXNlIGNsYXNzKVxuICAgICogQHJldHVybnMgVGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGxvYWQgYW5kIHNhdmUgdG8gT1IgdW5kZWZpbmVkIGlmIG5vIGRhdGEgaXMgdG8gYmUgbG9hZGVkIG9yIHNhdmVkIGJ5IHRoZSBiYXNlIGNsYXNzXG4gICAgKi9cbiAgICBhYnN0cmFjdCBzZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogIUlNUE9SVEFOVCAtIFRoaXMgaXMgdGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCBlLmcuIFF1aWNrVmlldyBcbiAgICAgKiBUaGlzIHdpbGwgYWxzbyBiZSB1c2VkIGR1cmluZyB0aGUgYnVpbGQgYW5kIHdpbGwgYmUgYXBwZW5kZWQgd2l0aCB0aGUgQnVpbHQgVGFyZ2V0IGUuZy4gSURFQXNwZWN0cy5RdWlja1ZpZXdcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRUaGlzQ29tcG9uZW50TmFtZSgpOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBmaXJzdCBtZXRob2Qgb25jZSB0aGUgY2xhc3MgaGFzIGJlZW4gY29uc3RydWN0ZWQsIGRlZmF1bHQgY29udHJ1Y3RvciBsb2dpYyBzaG91bGQgYmUgcGxhY2VkIGhlcmVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXR1cCgpOiB2b2lkO1xuXG5cbiAgICAvKipcbiAgICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgc2V0dGluZ3MgZm9yIHRoZSB3aWRnZXQuanNvbiB0aGF0IHdpbGwgYmUgZ2VuZXJhdGVkXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0V2lkZ2V0SnNvblNldHRpbmdzKCk6IElXaWRnZXRKc29uPFRDb25maWc+O1xuXG5cblxuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudFNjcmlwdEZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudFN0eWxlRmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50VGVtcGxhdGVGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRNZW51VGVtcGxhdGVGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRDb21wb25lbnRGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXRXaWRnZXREZXNpZ25lclNldHRpbmdzKCk6IElXaWRnZXRKc29uRGVzaWduZXI7XG4gICAgLy8gYWJzdHJhY3Qgc2V0UHJpb3JpdHkoKSA6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIHdoZW4gdGhlIG1vZGVsIGlzIHNhdmVkLiBNYW5pcHVsYXRlIHRoZVxuICAgICAqIG1vZGVsIGFzIHJlcXVpcmVkLlxuICAgICAqL1xuICAgICBhc3luYyBvblNhdmUobW9kZWw6IGFueSkge1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uU2F2ZVwiLCBtb2RlbCk7XG5cbiAgICAgICAgbGV0IGRhdGFUb1NhdmUgPSBhd2FpdCB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgdGhpcy5sb2coXCJTYXZpbmcsIG1vZGVsIHBhc3NlZCBpbiB3ZSBuZWVkIHRvIHBlcnNpc3QgdG9cIiwgXCJncmVlblwiLCBkYXRhVG9TYXZlKTtcblxuICAgICAgICBpZiAodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBsb2NhdGlvbiB0byBzYXZlIGRhdGEgdG8gc2V0IC0gdGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRlblwiLCBcInJlZFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IGRhdGFUb1BlcnNpc3QgPSBhd2FpdCB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgbGV0IGN1cnJlbnREYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgaWYgKGN1cnJlbnREYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhgQ3VycmVudCBkYXRhIGF0IGxvY2F0aW9uICR7dGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGF9IDpgLCBcIm1hZ2VudGFcIiwgY3VycmVudERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudERhdGEpIHtcbiAgICAgICAgICAgIC8vIHRoaXMubG9nKFwiRGF0YSBkb2VzIG5vdCBleGlzdCwgd2Ugd2lsbCBjcmVhdGVcIiwgXCJvcmFuZ2VcIik7XG4gICAgICAgICAgICAvLyAgc2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCB7fSk7XG4gICAgICAgICAgICAvLyBjdXJyZW50RGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2coYE5ldyBkYXRhIHRvIHBlcnNpc3QgdG8gbG9jYXRpb24gJHt0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YX0gOmAsIFwiYmx1ZVwiLCBkYXRhVG9QZXJzaXN0KTtcbiAgICAgICAgc2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCBkYXRhVG9QZXJzaXN0KTtcblxuICAgIH07XG5cblxuXG5cbiAgICBvbkRlc3Ryb3kobW9kZWw/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkRlc3Ryb3lcIik7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25EZXN0cm95XCIsIG1vZGVsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBVSSBmcmFtZXdvcmsgYWZ0ZXIgaW5pdGlhbCBjcmVhdGlvbiBhbmQgYmluZGluZyB0byBsb2FkIGRhdGFcbiAgICAgKiBpbnRvIGl0J3MgbW9kZWxcbiAgICAgKi9cbiAgICBsb2FkQW5kQmluZCgpIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBsb2FkQW5kQmluZFwiKTtcbiAgICAgICAgdGhpcy5sb2coXCJMb2FkaW5nIGRhdGEgKG1vZGVsOmFueSkgcGFzc2VkIGluXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBkYXRhIGJhc2VkIG9uIGxvY2F0aW9uIHRvIHNhdmVcIiwgXCJncmVlblwiLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25Mb2FkXCIsIHRoaXMubW9kZWwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciBiZWZvcmUgdGhlIG1vZGVsIGlzIHNhdmVkXG4gICAgICovXG4gICAgb25CZWZvcmVTYXZlKG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25CZWZvcmVTYXZlXCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uQmVmb3JlU2F2ZVwiLCBtb2RlbCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciBhZnRlciB0aGUgbW9kZWwgaGFzIGJlZW4gc2F2ZWQuXG4gICAgICovXG4gICAgb25BZnRlclNhdmUobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkFmdGVyU2F2ZVwiKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkFmdGVyU2F2ZVwiLCBtb2RlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgd2hlbiBpdCByZWxvYWRzIGFzcGVjdCBkYXRhXG4gICAgICovXG4gICAgb25SZWxvYWQobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvblJlbG9hZFwiKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvblJlbG9hZFwiLCBtb2RlbCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBsb2dnaW5nIGZvciB0aGUgY29tcG9uZW50IGJhc2VkIG9uIHRoZSBkZWJ1ZyBjb25maWd1cmF0aW9uXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgXG4gICAgICogQHBhcmFtIGNvbG9yIFxuICAgICAqIEBwYXJhbSBkYXRhIFxuICAgICAqL1xuICAgIGxvZyhtZXNzYWdlOiBzdHJpbmcsIGNvbG9yPzogc3RyaW5nLCBkYXRhPzogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uZGVidWc/LmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uZGVidWcubG9nVG9Db25zb2xlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb2xvcikgY29sb3IgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgLy8gbGV0IGxpbmVObyA9IGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrKChuZXcgRXJyb3IoKSkuc3RhY2spO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYyAke3RoaXMudGhpc0NvbXBvbmVudE5hbWV9IC0gJHttZXNzYWdlfWAsIGBjb2xvcjoke2NvbG9yfWAsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuTG9nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uLmRlYnVnPy5lbmFibGVkO1xuICAgIH1cbiAgICBsb2dUb0NvbnNvbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbkxvZygpICYmIHRoaXMuY29uZmlndXJhdGlvbi5kZWJ1Zz8ubG9nVG9Db25zb2xlO1xuICAgIH1cbiAgICBsb2dUb0FzcGVjdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuTG9nKCkgJiYgdGhpcy5jb25maWd1cmF0aW9uLmRlYnVnPy5zaG93SW5Bc3BlY3RcbiAgICB9XG5cblxuICAgIGluZihtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKGluZihtZXNzYWdlKSwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cm4obWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbCh3cm4obWVzc2FnZSksIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXJyKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcblxuICAgICAgICAvL2dldCB0aGUgcHJldmlvdXMgY2FsbGVyXG5cblxuXG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKGVycihtZXNzYWdlKSwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBudihuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwobnYobmFtZSwgdmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxoMShtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKGxoMShtZXNzYWdlKSwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhclNlYygpIHtcbiAgICAgICAgY2xlYXJTZWMoKTtcbiAgICB9XG5cbiAgICBsKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwobWVzc2FnZSwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubG9nVG9Bc3BlY3QoKSkge1xuICAgICAgICAgICAgbGV0IGFzcGVjdExvZ091dHB1dCA9IHRoaXMuYXNwZWN0TG9nT3V0cHV0O1xuICAgICAgICAgICAgaWYgKGFzcGVjdExvZ091dHB1dCkge1xuICAgICAgICAgICAgICAgIGFzcGVjdExvZ091dHB1dC5pbm5lclRleHQgKz0gYCR7bWVzc2FnZX1cXG5gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQXNwZWN0TG9nT3V0cHV0KCkge1xuICAgICAgICBpZiAoIXRoaXMubG9nVG9Bc3BlY3QoKSkgeyByZXR1cm4gfTtcblxuICAgICAgICB0aGlzLmFzcGVjdExvZ091dHB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGxldCBhc3BlY3RMb2dPdXRwdXQgPSB0aGlzLmFzcGVjdExvZ091dHB1dDtcblxuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuaWQgPSBgYXNwZWN0TG9nT3V0cHV0LSR7dGhpcy51bmlxdWVJZH1gO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgYmxhY2tcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnBhZGRpbmcgPSBcIjVweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luID0gXCI1cHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmhlaWdodCA9IFwiMjAwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmZvbnRTaXplID0gXCIxMHB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5mb250RmFtaWx5ID0gXCJtb25vc3BhY2VcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLndoaXRlU3BhY2UgPSBcInByZS13cmFwXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS53b3JkV3JhcCA9IFwiYnJlYWstd29yZFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS56SW5kZXggPSBcIjEwMDBcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJvdHRvbSA9IFwiMHB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnJpZ2h0ID0gXCIwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm1hcmdpbkxlZnQgPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm1hcmdpblJpZ2h0ID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm1hcmdpblRvcCA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDI1NSwyNTUsMjU1LDAuOClcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNXB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5wYWRkaW5nID0gXCI1cHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJveFNoYWRvdyA9IFwiMHB4IDBweCA1cHggMHB4IHJnYmEoMCwwLDAsMC43NSlcIjtcblxuICAgICAgICB0aGlzLmVsZW1lbnQucHJlcGVuZChhc3BlY3RMb2dPdXRwdXQpO1xuXG4gICAgfVxuXG4gICAgZmlyZUV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IGV2ZW50OiBTaGFyZURvRXZlbnQgPSB7XG4gICAgICAgICAgICBldmVudFBhdGg6IHRoaXMudGhpc0NvbXBvbmVudE5hbWUgKyBcIi5cIiArIGV2ZW50TmFtZSxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogZXZlbnROYW1lLFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9XG4gICAgICAgIGZpcmVFdmVudChldmVudCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBGb3JtYnVpbGQgaWYgaXQgZXhpc3RzIG9yIGNyZWF0ZXMgaXQgaWYgaXQgZG9lcyBub3RcbiAgICAgKiBcbiAgICAgKi9cbiAgICBmb3JtYnVpbGRlcigpIHtcblxuICAgICAgICBpZiAoIXRoaXMuYmxhZGU/Lm1vZGVsPy5hc3BlY3REYXRhPy5mb3JtQnVpbGRlcj8uZm9ybURhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBub3QgZm91bmQgLSB3aWxsIGNyZWF0ZSB0aGUgcGF0aFwiLCBcImJsdWVcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgZm91bmRcIiwgXCJncmVlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vRW5zdXJlIHRoZSBwYXRoIGV4aXN0c1xuICAgICAgICB0aGlzLmJsYWRlID0gdGhpcy5ibGFkZSB8fCB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5zdXJlRm9ybWJ1aWxkZXIodGhpcy5ibGFkZS5tb2RlbCk7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuYmxhZGUhLm1vZGVsIS5hc3BlY3REYXRhIS5mb3JtQnVpbGRlciEuZm9ybURhdGE7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbnN1cmVzIHRoZXJlIGlzIGEgZm9ybSBidWlsZGVyIGluIHRoZSBwYXNzZWQgaW4gbW9kZWwgYW5kIHJldHVybnMgaXRcbiAgICAgKiBAcGFyYW0gbW9kZWwgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgZW5zdXJlRm9ybWJ1aWxkZXIobW9kZWw6IGFueSk6IElGb3JtQnVpbGRlckRhdGEge1xuXG4gICAgICAgIGlmICghbW9kZWw/LmFzcGVjdERhdGE/LmZvcm1CdWlsZGVyPy5mb3JtRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIG5vdCBmb3VuZCAtIHdpbGwgY3JlYXRlIHRoZSBwYXRoXCIsIFwiYmx1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBmb3VuZFwiLCBcImdyZWVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9FbnN1cmUgdGhlIHBhdGggZXhpc3RzXG5cbiAgICAgICAgbW9kZWwgPSBtb2RlbCB8fCB7fTtcbiAgICAgICAgbW9kZWwuYXNwZWN0RGF0YSA9IG1vZGVsLmFzcGVjdERhdGEgfHwge307XG4gICAgICAgIG1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIgPSBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyIHx8IHsgZm9ybURhdGE6IHt9IH07XG5cblxuICAgICAgICByZXR1cm4gbW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YTtcbiAgICB9XG5cblxuICAgIGZvcm1idWlsZGVyRmllbGQoZm9ybWJ1aWxkZXJGaWVsZDogc3RyaW5nLCBzZXRWYWx1ZT86IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuZm9ybWJ1aWxkZXIoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJGb3JtIGJ1aWxkZXIgZG9lcyBub3QgZXhpc3QhIFwiLCBcInJlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZvcm0gYnVpbGRlciBkb2VzIG5vdCBleGlzdCFcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZm91bmRWYWx1ZSA9IHRoaXMuZm9ybWJ1aWxkZXIoKVtmb3JtYnVpbGRlckZpZWxkXVxuICAgICAgICBpZiAoIWZvdW5kVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKGBGb3JtIGJ1aWxkZXIgZG9lcyBub3QgY29udGFpbiBmaWVsZCAke2Zvcm1idWlsZGVyRmllbGR9IGAsIFwib3JhbmdlXCIpO1xuICAgICAgICAgICAgdGhpcy5sb2coYENyZWF0aW5nIGZpZWxkICR7Zm9ybWJ1aWxkZXJGaWVsZH0gYCwgXCJibHVlXCIpO1xuICAgICAgICAgICAgdGhpcy5mb3JtYnVpbGRlcigpW2Zvcm1idWlsZGVyRmllbGRdID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BcmUgd2UgZG9pbmcgYSBzZXRcbiAgICAgICAgaWYgKHNldFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhgU2V0dGluZyAke2Zvcm1idWlsZGVyRmllbGR9IHRvICR7c2V0VmFsdWV9YCwgXCJncmVlblwiKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybWJ1aWxkZXIoKVtmb3JtYnVpbGRlckZpZWxkXSA9IHNldFZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHNldFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvdW5kVmFsdWU7XG4gICAgfVxuXG59XG5cblxuXG4vLyBjbGFzcyBNeUNsYXNzIHtcblxuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpO1xuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwMTogbnVtYmVyKTtcbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IocDE6IHN0cmluZywgcDI6IHN0cmluZyk7XG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKHAxOiBzdHJpbmcsIHAyOiBzdHJpbmcsIHAzOiBzdHJpbmcpO1xuXG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKC4uLmFycjogYW55W10pIHtcbi8vICAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDIpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0d28gYXJndW1lbnRzIGNvbnN0cnVjdG9yIGNhbGxlZC4nKTtcbi8vICAgICAgICAgfSBlbHNlIGlmIChhcnIubGVuZ3RoID09PSAzKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhyZWUgYXJndW1lbnRzIGNvbnN0cnVjdG9yIGNhbGxlZC4nKTtcbi8vICAgICAgICAgfSBlbHNlIGlmIChhcnIubGVuZ3RoID09PSAxKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25lIGFyZ3VtZW50IGNvbnN0cnVjdG9yIGNhbGxlZC4nKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cblxuLy8gfVxuXG4vLyBsZXQgeCA9IG5ldyBNeUNsYXNzKCkiLCJpbXBvcnQgeyBJRGVidWcgfSBmcm9tIFwiLi9JRGVidWdcIjtcblxuZXhwb3J0IGNvbnN0IERFQlVHX0RFRkFVTFQgPSAoKSA9PiAge1xuXG4gICAgbGV0IHJldFZhbHVlOklEZWJ1ZyA9IHtcbiAgICAgIHN1cHBvcnRSZXF1ZXN0RW5hYmxlZDogZmFsc2UsXG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgbG9nVG9Db25zb2xlOiB0cnVlLFxuICAgICAgc2hvd0luQXNwZWN0OiBmYWxzZSxcbiAgICAgIGxpdmVDb25maWc6IHRydWUsXG4gICAgfVxuICAgIHJldHVybiByZXRWYWx1ZTtcbiAgXG4gIH0iLCJpbXBvcnQgKiBhcyBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgeyBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vSVdpZGdldEpzb24nO1xuXG5leHBvcnQgdHlwZSBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+ID0ge1xuICAgIFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgQXJyYXk8aW5mZXIgVT4gPyBrby5PYnNlcnZhYmxlQXJyYXk8TmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxVPj4gOlxuICAgIFRbS10gZXh0ZW5kcyBvYmplY3QgPyBrby5PYnNlcnZhYmxlPE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VFtLXT4+IDpcbiAgICBrby5PYnNlcnZhYmxlPFRbS10+O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvT2JzZXJ2YWJsZU9iamVjdDxUPihvYmo6IFQsIGV4aXN0aW5nOiBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+KTogTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPiB7XG4gICAgXG4gICAgaWYoIWV4aXN0aW5nKSBleGlzdGluZyA9IHt9IGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD47XG4gICBcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYga2V5ICE9PSBcIl9fa29fbWFwcGluZ19fXCIgJiYga2V5ICE9PSBcIl9ob3N0XCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleSBhcyBrZXlvZiBUXTtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZ1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0gPSBrby5vYnNlcnZhYmxlQXJyYXkodmFsdWUubWFwKGl0ZW0gPT4gdG9PYnNlcnZhYmxlT2JqZWN0KGl0ZW0sIHt9IGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8dHlwZW9mIGl0ZW0+KSkpIGFzIGFueTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldKHZhbHVlLm1hcChpdGVtID0+IHRvT2JzZXJ2YWJsZU9iamVjdChpdGVtLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiBpdGVtPikpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IGtvLm9ic2VydmFibGUodG9PYnNlcnZhYmxlT2JqZWN0KHZhbHVlLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiB2YWx1ZT4pKSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSh0b09ic2VydmFibGVPYmplY3QoKHZhbHVlIGFzIGFueSksIChleGlzdGluZ1trZXldKCkgYXMgYW55KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZ1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIChleGlzdGluZ1trZXldIGFzIGFueSkgPSBrby5vYnNlcnZhYmxlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldKCh2YWx1ZSBhcyBhbnkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZXhpc3RpbmcgYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSURlYnVnIHtcbiAgICBzdXBwb3J0UmVxdWVzdEVuYWJsZWQ/OiBib29sZWFuO1xuICAgICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgICAgIGxvZ1RvQ29uc29sZTogYm9vbGVhbjtcbiAgICAgIHNob3dJbkFzcGVjdDogYm9vbGVhbjtcbiAgICAgIGxpdmVDb25maWc/OiBib29sZWFuO1xuICAgIH1cbiAgXG5cbi8vIGV4cG9ydCB0eXBlIElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+ID0gVENvbmZpZyAmIHtcbi8vICAgICBkZWJ1ZzogSURlYnVnO1xuLy8gICB9XG5cbi8vIGV4cG9ydCB0eXBlIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPiA9IFxuLy8geyBbSyBpbiBrZXlvZiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5dOiBrby5PYnNlcnZhYmxlPElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPltLXT47IH1cblxuLy8gZXhwb3J0IGludGVyZmFjZSBJQ29uZmlndXJhdGlvbkhvc3Qge1xuLy8gICAgIF9ob3N0OiB7XG4vLyAgICAgICAgIGJsYWRlOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLkFkZEVkaXRTaGFyZWRvO1xuLy8gICAgICAgICBlbmFibGVkOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+OyAvLyBVc2luZyAnYW55JyBmb3IgcmV0dXJuIHR5cGUgYXMgaXQncyBub3QgY2xlYXIgd2hhdCB0aGVzZSBmdW5jdGlvbnMgcmV0dXJuXG4vLyAgICAgICAgIG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZXhwb3J0IHR5cGUgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+ID0gSUNvbmZpZ3VyYXRpb25Ib3N0ICYgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz47XG5cbi8vIGludGVyZmFjZSBSb290T2JqZWN0IHtcbi8vICAgbDE6IHN0cmluZztcbi8vICAgbzE6IE8xO1xuLy8gfVxuXG4vLyBpbnRlcmZhY2UgTzEge1xuLy8gICBsMjogc3RyaW5nO1xuLy8gICBvMjogTzI7XG4vLyAgIGExOiBBMVtdO1xuLy8gfVxuXG4vLyBpbnRlcmZhY2UgQTEge1xuLy8gICBsNDogc3RyaW5nO1xuLy8gfVxuXG4vLyBpbnRlcmZhY2UgTzIge1xuLy8gICBsMzogc3RyaW5nO1xuLy8gfVxuLy8gLy8gTm93IGxldCdzIHVzZSB0aGUgZnVuY3Rpb246XG4vLyBjb25zdCB4OiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxSb290T2JqZWN0PiA9IHtcbi8vICAgICBsMTogXCJsMVwiLFxuLy8gICAgIG8xOiB7XG4vLyAgICAgICAgIGwyOlwibDJcIixcbi8vICAgICAgICAgbzI6IHtcbi8vICAgICAgICAgICAgIGwzOiBcImwzXCIsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIGExOiBbXG4vLyAgICAgICAgICAgICB7IGw0OiBcImw0XCIgfVxuLy8gICAgICAgICBdXG4vLyAgICAgfSxcbi8vICAgICBkZWJ1Zzpcbi8vICAgICB7XG4vLyAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuLy8gICAgICAgICBsb2dUb0NvbnNvbGU6IGZhbHNlLFxuLy8gICAgICAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlXG4vLyAgICAgfVxuLy8gfVxuXG4vLyBsZXQgbSA6ICBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFJvb3RPYmplY3Q+PlxuXG4vLyBsZXQgeSA9IHRvT2JzZXJ2YWJsZU9iamVjdCh4LHt9IGFzIGFueSkgYXMgIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248Um9vdE9iamVjdD4+XG5cbi8vIGxldCBwID0geS5kZWJ1ZygpLmxpdmVDb25maWchKClcblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHRvT2JzZXJ2YWJsZU9iamVjdChvYmo6IGFueSwgZXhpc3RpbmdPYnNlcnZhYmxlcz86a28uT2JzZXJ2YWJsZTxhbnk+KToga28uT2JzZXJ2YWJsZSB7XG4vLyAgICAgY29uc3QgcmVzdWx0ID0gZXhpc3RpbmdPYnNlcnZhYmxlcyB8fCB7fSBhcyBrby5PYnNlcnZhYmxlO1xuXG4vLyAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4vLyAgICAgICAgIGlmKGtleSA9PT0gXCJfX2tvX21hcHBpbmdfX1wiKSBjb250aW51ZTtcbi8vICAgICAgICAgaWYoa2V5ID09PSBcIl9ob3N0XCIpIGNvbnRpbnVlO1xuXG4vLyAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4vLyAgICAgICAgICAgICBsZXQgbmV3diA9IG9ialtrZXldO1xuLy8gICAgICAgICAgICAgbGV0IGN1cnIgPSAocmVzdWx0IGFzIGFueSlba2V5XSA7XG5cbi8vICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShuZXd2KSAmJiB0eXBlb2YgbmV3diA9PT0gXCJvYmplY3RcIiAmJiBuZXd2ICE9PSBudWxsICYmICFrby5pc09ic2VydmFibGUobmV3dikpIHtcbi8vICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IHRvT2JzZXJ2YWJsZU9iamVjdChuZXd2IGFzIG9iamVjdCkgXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0b09ic2VydmFibGVPYmplY3RcIiwgKHJlc3VsdCBhcyBhbnkpW2tleV0pO1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0ga28ub2JzZXJ2YWJsZSgocmVzdWx0IGFzIGFueSlba2V5XSk7XG4vLyAgICAgICAgICAgICAgICAgY29udGludWU7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5ld3YpKSB7XG4vLyAgICAgICAgICAgICAgICAgaWYgKGN1cnIgJiYga28uaXNPYnNlcnZhYmxlQXJyYXkoY3VycikpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0obmV3dik7XG4vLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSBrby5vYnNlcnZhYmxlQXJyYXkobmV3dikgYXMgYW55O1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICBjb250aW51ZTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShuZXd2KSkge1xuLy8gICAgICAgICAgICAgICAgIG5ld3YgPSBuZXd2KCk7IC8vIHB1bGwgb3V0IHRoZSB2YWx1ZVxuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICBpZiAoY3VyciAmJiBrby5pc09ic2VydmFibGUoY3VycikpIHtcbi8vICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XShuZXd2KTsgLy8gdXBkYXRlIHRoZSBleGlzdGluZyBvYnNlcnZhYmxlXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0ga28ub2JzZXJ2YWJsZShuZXd2KTtcbiAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgIH1cblxuLy8gICAgIHJldHVybiByZXN1bHQ7XG4vLyB9XG4iLCJpbXBvcnQgeyBERUJVR19ERUZBVUxUIH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0RlYnVnRGVmYXVsdHNcIjtcbmltcG9ydCB7IElEZWZhdWx0U2V0dGluZ3MsIElXaWRnZXRKc29uIH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0lXaWRnZXRKc29uXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbiB7XG4gICAgZmllbGRQYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgdGl0bGU6IHN0cmluZyB8IHVuZGVmaW5lZFxuICAgIHZhbHVlT25Ob3RGb3VuZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGNhbGN1bGF0ZWRWYWx1ZTogc3RyaW5nO1xuICAgIGNhbGN1bGF0ZWRUaXRsZTogc3RyaW5nO1xuICAgIGZvcm1hdHRlcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxufVxuXG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0OiBJRGVmYXVsdFNldHRpbmdzPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+ID0ge1xuICAgIGZpZWxkUGF0aDogXCJUaXRsZVwiLFxuICAgIHRpdGxlOiBcIlRpdGxlIFZhbHVlXCIsXG4gICAgY2FsY3VsYXRlZFZhbHVlOiBcIlwiLFxuICAgIGNhbGN1bGF0ZWRUaXRsZTogXCJcIixcbiAgICB2YWx1ZU9uTm90Rm91bmQ6IFwiTm90IEZvdW5kXCIsXG4gICAgZm9ybWF0dGVyOiBcInZhbHVlXCIsXG4gICAgZGVidWc6IERFQlVHX0RFRkFVTFQoKSxcbiAgICBldmVudHNUb1JlYWN0VG86IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZXZlbnRQYXRoOiBcInNoYXJlZG8uY29yZS5jYXNlLnBoYXNlLWNoYW5nZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLmNvcmUuY2FzZS5mb3Jtcy5waGFzZS5waGFzZS1jaGFuZ2VkXCIsXG4gICAgICAgICAgICBtZXRob2RUb0NhbGw6IFwibG9hZEFuZEJpbmRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby51cGRhdGVkXCIsXG4gICAgICAgICAgICBtZXRob2RUb0NhbGw6IFwibG9hZEFuZEJpbmRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby5jb3JlLmNhc2Uuc2hhcmVkby11cGRhdGVkXCIsXG4gICAgICAgICAgICBtZXRob2RUb0NhbGw6IFwibG9hZEFuZEJpbmRcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBkYXRhU2V0dGluZ3M6IHtcbiAgICAgICAgZ2V0VmFsdWVVc2luZ1BhcmVudHM6IGZhbHNlLFxuICAgICAgICBtYXhEZXB0aDogMCxcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBXaWRnZXRTZXR0aW5ncyA6IElXaWRnZXRKc29uPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+ID17XG4gICAgdHlwZTogXCJ3aWRnZXRcIixcbiAgICBcInByaW9yaXR5XCI6IDYwMDAsXG4gICAgXCJkZXNpZ25lclwiOiB7XG4gICAgICAgIFwiYWxsb3dJblBvcnRhbERlc2lnbmVyXCI6IGZhbHNlLFxuICAgICAgICBcImFsbG93SW5TaGFyZWRvUG9ydGFsRGVzaWduZXJcIjogZmFsc2UsXG4gICAgICAgIFwiYWxsb3dBc3BlY3RBZGFwdGVyXCI6IHRydWUsXG4gICAgICAgIFwidGl0bGVcIjogXCJTaW5nbGUgVmFsdWUgQXNwZWN0XCIsXG4gICAgICAgIFwiaWNvblwiOiBcImZhLWNvZ1wiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiU2luZ2xlIFZhbHVlIEFzcGVjdFwiLFxuICAgICAgICBcImNhdGVnb3JpZXNcIjogW10sXG4gICAgICAgIFwiaXNDb25maWd1cmFibGVcIjogdHJ1ZSxcbiAgICAgICAgXCJjb25maWd1cmF0aW9uV2lkZ2V0XCI6IG51bGwsXG4gICAgICAgIFwiZGVmYXVsdENvbmZpZ3VyYXRpb25Kc29uXCI6IERlZmF1bHRcbiAgICB9LFxuICAgIFwic2NyaXB0c1wiOiBbXG4gICAgXSxcbiAgICBcInN0eWxlc1wiOiBbXG4gICAgICAgIFwiU2luZ2xlVmFsdWVBc3BlY3QuY3NzXCJcbiAgICBdLFxuICAgIFwidGVtcGxhdGVzXCI6IFtcbiAgICAgICAgXCJTaW5nbGVWYWx1ZUFzcGVjdC5odG1sXCJcbiAgICBdLFxuICAgIFwibWVudVRlbXBsYXRlc1wiOiBbXSxcbiAgICBcImNvbXBvbmVudHNcIjogW11cbn0iLCJcblxuLyoqXG4gKiAqIEZvcm1hdCBhIHZhbHVlIHVzaW5nIGEgZm9ybWF0dGVyIHN0cmluZ1xuICogKiBFeGFtcGxlczogXG4gKiAqIDEuIHZhbHVlXG4gKiAqIDIuIHZhbHVlLnRvVXBwZXJDYXNlKClcbiAqICogMy4gdmFsdWUgPyB2YWx1ZS50b1VwcGVyQ2FzZSgpIDogXCJcIlxuICogKiA0LiB2YWx1ZSA/IHZhbHVlLnRvVXBwZXJDYXNlKCkgOiBcIk5vIFZhbHVlXCJcbiAqICogNS4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlRGF0ZVN0cmluZygpXG4gKiAqIDYuIHZhbHVlID8gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlRGF0ZVN0cmluZygpIDogXCJcIlxuICogQHBhcmFtIHZhbHVlIFxuICogQHBhcmFtIGZvcm1hdHRlciBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VmFsdWUodmFsdWU6IGFueSwgZm9ybWF0dGVyOiBzdHJpbmcpOiBhbnkge1xuICAgIC8vIENyZWF0ZSBhIG5ldyBmdW5jdGlvbiBiYXNlZCBvbiB0aGUgZm9ybWF0dGVyXG4gICAgY29uc3QgZHluYW1pY0Z1bmMgPSBuZXcgRnVuY3Rpb24oJ3ZhbHVlJywgYHJldHVybiAoJHtmb3JtYXR0ZXJ9KTtgKTtcbiAgICAvLyBJbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGdpdmVuIHZhbHVlXG4gICAgbGV0IHJldHVyblZhbHVlOiBhbnk7XG4gICAgdHJ5e1xuICAgICByZXR1cm5WYWx1ZSA9IGR5bmFtaWNGdW5jKHZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2goZSlcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBFcnJvciBmb3JtYXR0aW5nIHZhbHVlIFske3ZhbHVlfV0gd2l0aCBmb3JtYXR0ZXIgWyR7Zm9ybWF0dGVyfV1gLCBlKTtcbiAgICAgICAgcmV0dXJuVmFsdWUgPSBcIkVycm9yIGZvcm1hdHRpbmcgdmFsdWUgLSBzZWUgY29uc29sZVwiXG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxuZXhwb3J0IGNvbnN0IGZvcm1hdEZ1bmMgPSBmb3JtYXRWYWx1ZTsgLy8gRm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IiwiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwibW9kdWxlLmV4cG9ydHMgPSBrbzsiLCJpbXBvcnQgYW5zaVN0eWxlcyBmcm9tICcjYW5zaS1zdHlsZXMnO1xuaW1wb3J0IHN1cHBvcnRzQ29sb3IgZnJvbSAnI3N1cHBvcnRzLWNvbG9yJztcbmltcG9ydCB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L29yZGVyXG5cdHN0cmluZ1JlcGxhY2VBbGwsXG5cdHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleCxcbn0gZnJvbSAnLi91dGlsaXRpZXMuanMnO1xuXG5jb25zdCB7c3Rkb3V0OiBzdGRvdXRDb2xvciwgc3RkZXJyOiBzdGRlcnJDb2xvcn0gPSBzdXBwb3J0c0NvbG9yO1xuXG5jb25zdCBHRU5FUkFUT1IgPSBTeW1ib2woJ0dFTkVSQVRPUicpO1xuY29uc3QgU1RZTEVSID0gU3ltYm9sKCdTVFlMRVInKTtcbmNvbnN0IElTX0VNUFRZID0gU3ltYm9sKCdJU19FTVBUWScpO1xuXG4vLyBgc3VwcG9ydHNDb2xvci5sZXZlbGAg4oaSIGBhbnNpU3R5bGVzLmNvbG9yW25hbWVdYCBtYXBwaW5nXG5jb25zdCBsZXZlbE1hcHBpbmcgPSBbXG5cdCdhbnNpJyxcblx0J2Fuc2knLFxuXHQnYW5zaTI1NicsXG5cdCdhbnNpMTZtJyxcbl07XG5cbmNvbnN0IHN0eWxlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbmNvbnN0IGFwcGx5T3B0aW9ucyA9IChvYmplY3QsIG9wdGlvbnMgPSB7fSkgPT4ge1xuXHRpZiAob3B0aW9ucy5sZXZlbCAmJiAhKE51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sZXZlbCkgJiYgb3B0aW9ucy5sZXZlbCA+PSAwICYmIG9wdGlvbnMubGV2ZWwgPD0gMykpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgbGV2ZWxgIG9wdGlvbiBzaG91bGQgYmUgYW4gaW50ZWdlciBmcm9tIDAgdG8gMycpO1xuXHR9XG5cblx0Ly8gRGV0ZWN0IGxldmVsIGlmIG5vdCBzZXQgbWFudWFsbHlcblx0Y29uc3QgY29sb3JMZXZlbCA9IHN0ZG91dENvbG9yID8gc3Rkb3V0Q29sb3IubGV2ZWwgOiAwO1xuXHRvYmplY3QubGV2ZWwgPSBvcHRpb25zLmxldmVsID09PSB1bmRlZmluZWQgPyBjb2xvckxldmVsIDogb3B0aW9ucy5sZXZlbDtcbn07XG5cbmV4cG9ydCBjbGFzcyBDaGFsayB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RydWN0b3ItcmV0dXJuXG5cdFx0cmV0dXJuIGNoYWxrRmFjdG9yeShvcHRpb25zKTtcblx0fVxufVxuXG5jb25zdCBjaGFsa0ZhY3RvcnkgPSBvcHRpb25zID0+IHtcblx0Y29uc3QgY2hhbGsgPSAoLi4uc3RyaW5ncykgPT4gc3RyaW5ncy5qb2luKCcgJyk7XG5cdGFwcGx5T3B0aW9ucyhjaGFsaywgb3B0aW9ucyk7XG5cblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKGNoYWxrLCBjcmVhdGVDaGFsay5wcm90b3R5cGUpO1xuXG5cdHJldHVybiBjaGFsaztcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoYWxrKG9wdGlvbnMpIHtcblx0cmV0dXJuIGNoYWxrRmFjdG9yeShvcHRpb25zKTtcbn1cblxuT2JqZWN0LnNldFByb3RvdHlwZU9mKGNyZWF0ZUNoYWxrLnByb3RvdHlwZSwgRnVuY3Rpb24ucHJvdG90eXBlKTtcblxuZm9yIChjb25zdCBbc3R5bGVOYW1lLCBzdHlsZV0gb2YgT2JqZWN0LmVudHJpZXMoYW5zaVN0eWxlcykpIHtcblx0c3R5bGVzW3N0eWxlTmFtZV0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIodGhpcywgY3JlYXRlU3R5bGVyKHN0eWxlLm9wZW4sIHN0eWxlLmNsb3NlLCB0aGlzW1NUWUxFUl0pLCB0aGlzW0lTX0VNUFRZXSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgc3R5bGVOYW1lLCB7dmFsdWU6IGJ1aWxkZXJ9KTtcblx0XHRcdHJldHVybiBidWlsZGVyO1xuXHRcdH0sXG5cdH07XG59XG5cbnN0eWxlcy52aXNpYmxlID0ge1xuXHRnZXQoKSB7XG5cdFx0Y29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIodGhpcywgdGhpc1tTVFlMRVJdLCB0cnVlKTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Zpc2libGUnLCB7dmFsdWU6IGJ1aWxkZXJ9KTtcblx0XHRyZXR1cm4gYnVpbGRlcjtcblx0fSxcbn07XG5cbmNvbnN0IGdldE1vZGVsQW5zaSA9IChtb2RlbCwgbGV2ZWwsIHR5cGUsIC4uLmFyZ3VtZW50c18pID0+IHtcblx0aWYgKG1vZGVsID09PSAncmdiJykge1xuXHRcdGlmIChsZXZlbCA9PT0gJ2Fuc2kxNm0nKSB7XG5cdFx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpMTZtKC4uLmFyZ3VtZW50c18pO1xuXHRcdH1cblxuXHRcdGlmIChsZXZlbCA9PT0gJ2Fuc2kyNTYnKSB7XG5cdFx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpMjU2KGFuc2lTdHlsZXMucmdiVG9BbnNpMjU2KC4uLmFyZ3VtZW50c18pKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpKGFuc2lTdHlsZXMucmdiVG9BbnNpKC4uLmFyZ3VtZW50c18pKTtcblx0fVxuXG5cdGlmIChtb2RlbCA9PT0gJ2hleCcpIHtcblx0XHRyZXR1cm4gZ2V0TW9kZWxBbnNpKCdyZ2InLCBsZXZlbCwgdHlwZSwgLi4uYW5zaVN0eWxlcy5oZXhUb1JnYiguLi5hcmd1bWVudHNfKSk7XG5cdH1cblxuXHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXVttb2RlbF0oLi4uYXJndW1lbnRzXyk7XG59O1xuXG5jb25zdCB1c2VkTW9kZWxzID0gWydyZ2InLCAnaGV4JywgJ2Fuc2kyNTYnXTtcblxuZm9yIChjb25zdCBtb2RlbCBvZiB1c2VkTW9kZWxzKSB7XG5cdHN0eWxlc1ttb2RlbF0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3Qge2xldmVsfSA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVyID0gY3JlYXRlU3R5bGVyKGdldE1vZGVsQW5zaShtb2RlbCwgbGV2ZWxNYXBwaW5nW2xldmVsXSwgJ2NvbG9yJywgLi4uYXJndW1lbnRzXyksIGFuc2lTdHlsZXMuY29sb3IuY2xvc2UsIHRoaXNbU1RZTEVSXSk7XG5cdFx0XHRcdHJldHVybiBjcmVhdGVCdWlsZGVyKHRoaXMsIHN0eWxlciwgdGhpc1tJU19FTVBUWV0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXHR9O1xuXG5cdGNvbnN0IGJnTW9kZWwgPSAnYmcnICsgbW9kZWxbMF0udG9VcHBlckNhc2UoKSArIG1vZGVsLnNsaWNlKDEpO1xuXHRzdHlsZXNbYmdNb2RlbF0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3Qge2xldmVsfSA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVyID0gY3JlYXRlU3R5bGVyKGdldE1vZGVsQW5zaShtb2RlbCwgbGV2ZWxNYXBwaW5nW2xldmVsXSwgJ2JnQ29sb3InLCAuLi5hcmd1bWVudHNfKSwgYW5zaVN0eWxlcy5iZ0NvbG9yLmNsb3NlLCB0aGlzW1NUWUxFUl0pO1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlQnVpbGRlcih0aGlzLCBzdHlsZXIsIHRoaXNbSVNfRU1QVFldKTtcblx0XHRcdH07XG5cdFx0fSxcblx0fTtcbn1cblxuY29uc3QgcHJvdG8gPSBPYmplY3QuZGVmaW5lUHJvcGVydGllcygoKSA9PiB7fSwge1xuXHQuLi5zdHlsZXMsXG5cdGxldmVsOiB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tHRU5FUkFUT1JdLmxldmVsO1xuXHRcdH0sXG5cdFx0c2V0KGxldmVsKSB7XG5cdFx0XHR0aGlzW0dFTkVSQVRPUl0ubGV2ZWwgPSBsZXZlbDtcblx0XHR9LFxuXHR9LFxufSk7XG5cbmNvbnN0IGNyZWF0ZVN0eWxlciA9IChvcGVuLCBjbG9zZSwgcGFyZW50KSA9PiB7XG5cdGxldCBvcGVuQWxsO1xuXHRsZXQgY2xvc2VBbGw7XG5cdGlmIChwYXJlbnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wZW5BbGwgPSBvcGVuO1xuXHRcdGNsb3NlQWxsID0gY2xvc2U7XG5cdH0gZWxzZSB7XG5cdFx0b3BlbkFsbCA9IHBhcmVudC5vcGVuQWxsICsgb3Blbjtcblx0XHRjbG9zZUFsbCA9IGNsb3NlICsgcGFyZW50LmNsb3NlQWxsO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRvcGVuLFxuXHRcdGNsb3NlLFxuXHRcdG9wZW5BbGwsXG5cdFx0Y2xvc2VBbGwsXG5cdFx0cGFyZW50LFxuXHR9O1xufTtcblxuY29uc3QgY3JlYXRlQnVpbGRlciA9IChzZWxmLCBfc3R5bGVyLCBfaXNFbXB0eSkgPT4ge1xuXHQvLyBTaW5nbGUgYXJndW1lbnQgaXMgaG90IHBhdGgsIGltcGxpY2l0IGNvZXJjaW9uIGlzIGZhc3RlciB0aGFuIGFueXRoaW5nXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1pbXBsaWNpdC1jb2VyY2lvblxuXHRjb25zdCBidWlsZGVyID0gKC4uLmFyZ3VtZW50c18pID0+IGFwcGx5U3R5bGUoYnVpbGRlciwgKGFyZ3VtZW50c18ubGVuZ3RoID09PSAxKSA/ICgnJyArIGFyZ3VtZW50c19bMF0pIDogYXJndW1lbnRzXy5qb2luKCcgJykpO1xuXG5cdC8vIFdlIGFsdGVyIHRoZSBwcm90b3R5cGUgYmVjYXVzZSB3ZSBtdXN0IHJldHVybiBhIGZ1bmN0aW9uLCBidXQgdGhlcmUgaXNcblx0Ly8gbm8gd2F5IHRvIGNyZWF0ZSBhIGZ1bmN0aW9uIHdpdGggYSBkaWZmZXJlbnQgcHJvdG90eXBlXG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZihidWlsZGVyLCBwcm90byk7XG5cblx0YnVpbGRlcltHRU5FUkFUT1JdID0gc2VsZjtcblx0YnVpbGRlcltTVFlMRVJdID0gX3N0eWxlcjtcblx0YnVpbGRlcltJU19FTVBUWV0gPSBfaXNFbXB0eTtcblxuXHRyZXR1cm4gYnVpbGRlcjtcbn07XG5cbmNvbnN0IGFwcGx5U3R5bGUgPSAoc2VsZiwgc3RyaW5nKSA9PiB7XG5cdGlmIChzZWxmLmxldmVsIDw9IDAgfHwgIXN0cmluZykge1xuXHRcdHJldHVybiBzZWxmW0lTX0VNUFRZXSA/ICcnIDogc3RyaW5nO1xuXHR9XG5cblx0bGV0IHN0eWxlciA9IHNlbGZbU1RZTEVSXTtcblxuXHRpZiAoc3R5bGVyID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gc3RyaW5nO1xuXHR9XG5cblx0Y29uc3Qge29wZW5BbGwsIGNsb3NlQWxsfSA9IHN0eWxlcjtcblx0aWYgKHN0cmluZy5pbmNsdWRlcygnXFx1MDAxQicpKSB7XG5cdFx0d2hpbGUgKHN0eWxlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyBSZXBsYWNlIGFueSBpbnN0YW5jZXMgYWxyZWFkeSBwcmVzZW50IHdpdGggYSByZS1vcGVuaW5nIGNvZGVcblx0XHRcdC8vIG90aGVyd2lzZSBvbmx5IHRoZSBwYXJ0IG9mIHRoZSBzdHJpbmcgdW50aWwgc2FpZCBjbG9zaW5nIGNvZGVcblx0XHRcdC8vIHdpbGwgYmUgY29sb3JlZCwgYW5kIHRoZSByZXN0IHdpbGwgc2ltcGx5IGJlICdwbGFpbicuXG5cdFx0XHRzdHJpbmcgPSBzdHJpbmdSZXBsYWNlQWxsKHN0cmluZywgc3R5bGVyLmNsb3NlLCBzdHlsZXIub3Blbik7XG5cblx0XHRcdHN0eWxlciA9IHN0eWxlci5wYXJlbnQ7XG5cdFx0fVxuXHR9XG5cblx0Ly8gV2UgY2FuIG1vdmUgYm90aCBuZXh0IGFjdGlvbnMgb3V0IG9mIGxvb3AsIGJlY2F1c2UgcmVtYWluaW5nIGFjdGlvbnMgaW4gbG9vcCB3b24ndCBoYXZlXG5cdC8vIGFueS92aXNpYmxlIGVmZmVjdCBvbiBwYXJ0cyB3ZSBhZGQgaGVyZS4gQ2xvc2UgdGhlIHN0eWxpbmcgYmVmb3JlIGEgbGluZWJyZWFrIGFuZCByZW9wZW5cblx0Ly8gYWZ0ZXIgbmV4dCBsaW5lIHRvIGZpeCBhIGJsZWVkIGlzc3VlIG9uIG1hY09TOiBodHRwczovL2dpdGh1Yi5jb20vY2hhbGsvY2hhbGsvcHVsbC85MlxuXHRjb25zdCBsZkluZGV4ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicpO1xuXHRpZiAobGZJbmRleCAhPT0gLTEpIHtcblx0XHRzdHJpbmcgPSBzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgoc3RyaW5nLCBjbG9zZUFsbCwgb3BlbkFsbCwgbGZJbmRleCk7XG5cdH1cblxuXHRyZXR1cm4gb3BlbkFsbCArIHN0cmluZyArIGNsb3NlQWxsO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY3JlYXRlQ2hhbGsucHJvdG90eXBlLCBzdHlsZXMpO1xuXG5jb25zdCBjaGFsayA9IGNyZWF0ZUNoYWxrKCk7XG5leHBvcnQgY29uc3QgY2hhbGtTdGRlcnIgPSBjcmVhdGVDaGFsayh7bGV2ZWw6IHN0ZGVyckNvbG9yID8gc3RkZXJyQ29sb3IubGV2ZWwgOiAwfSk7XG5cbmV4cG9ydCB7XG5cdG1vZGlmaWVyTmFtZXMsXG5cdGZvcmVncm91bmRDb2xvck5hbWVzLFxuXHRiYWNrZ3JvdW5kQ29sb3JOYW1lcyxcblx0Y29sb3JOYW1lcyxcblxuXHQvLyBUT0RPOiBSZW1vdmUgdGhlc2UgYWxpYXNlcyBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uXG5cdG1vZGlmaWVyTmFtZXMgYXMgbW9kaWZpZXJzLFxuXHRmb3JlZ3JvdW5kQ29sb3JOYW1lcyBhcyBmb3JlZ3JvdW5kQ29sb3JzLFxuXHRiYWNrZ3JvdW5kQ29sb3JOYW1lcyBhcyBiYWNrZ3JvdW5kQ29sb3JzLFxuXHRjb2xvck5hbWVzIGFzIGNvbG9ycyxcbn0gZnJvbSAnLi92ZW5kb3IvYW5zaS1zdHlsZXMvaW5kZXguanMnO1xuXG5leHBvcnQge1xuXHRzdGRvdXRDb2xvciBhcyBzdXBwb3J0c0NvbG9yLFxuXHRzdGRlcnJDb2xvciBhcyBzdXBwb3J0c0NvbG9yU3RkZXJyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2hhbGs7XG4iLCIvLyBUT0RPOiBXaGVuIHRhcmdldGluZyBOb2RlLmpzIDE2LCB1c2UgYFN0cmluZy5wcm90b3R5cGUucmVwbGFjZUFsbGAuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nUmVwbGFjZUFsbChzdHJpbmcsIHN1YnN0cmluZywgcmVwbGFjZXIpIHtcblx0bGV0IGluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc3Vic3RyaW5nKTtcblx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdHJldHVybiBzdHJpbmc7XG5cdH1cblxuXHRjb25zdCBzdWJzdHJpbmdMZW5ndGggPSBzdWJzdHJpbmcubGVuZ3RoO1xuXHRsZXQgZW5kSW5kZXggPSAwO1xuXHRsZXQgcmV0dXJuVmFsdWUgPSAnJztcblx0ZG8ge1xuXHRcdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCwgaW5kZXgpICsgc3Vic3RyaW5nICsgcmVwbGFjZXI7XG5cdFx0ZW5kSW5kZXggPSBpbmRleCArIHN1YnN0cmluZ0xlbmd0aDtcblx0XHRpbmRleCA9IHN0cmluZy5pbmRleE9mKHN1YnN0cmluZywgZW5kSW5kZXgpO1xuXHR9IHdoaWxlIChpbmRleCAhPT0gLTEpO1xuXG5cdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCk7XG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleChzdHJpbmcsIHByZWZpeCwgcG9zdGZpeCwgaW5kZXgpIHtcblx0bGV0IGVuZEluZGV4ID0gMDtcblx0bGV0IHJldHVyblZhbHVlID0gJyc7XG5cdGRvIHtcblx0XHRjb25zdCBnb3RDUiA9IHN0cmluZ1tpbmRleCAtIDFdID09PSAnXFxyJztcblx0XHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgsIChnb3RDUiA/IGluZGV4IC0gMSA6IGluZGV4KSkgKyBwcmVmaXggKyAoZ290Q1IgPyAnXFxyXFxuJyA6ICdcXG4nKSArIHBvc3RmaXg7XG5cdFx0ZW5kSW5kZXggPSBpbmRleCArIDE7XG5cdFx0aW5kZXggPSBzdHJpbmcuaW5kZXhPZignXFxuJywgZW5kSW5kZXgpO1xuXHR9IHdoaWxlIChpbmRleCAhPT0gLTEpO1xuXG5cdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCk7XG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn1cbiIsImNvbnN0IEFOU0lfQkFDS0dST1VORF9PRkZTRVQgPSAxMDtcblxuY29uc3Qgd3JhcEFuc2kxNiA9IChvZmZzZXQgPSAwKSA9PiBjb2RlID0+IGBcXHUwMDFCWyR7Y29kZSArIG9mZnNldH1tYDtcblxuY29uc3Qgd3JhcEFuc2kyNTYgPSAob2Zmc2V0ID0gMCkgPT4gY29kZSA9PiBgXFx1MDAxQlskezM4ICsgb2Zmc2V0fTs1OyR7Y29kZX1tYDtcblxuY29uc3Qgd3JhcEFuc2kxNm0gPSAob2Zmc2V0ID0gMCkgPT4gKHJlZCwgZ3JlZW4sIGJsdWUpID0+IGBcXHUwMDFCWyR7MzggKyBvZmZzZXR9OzI7JHtyZWR9OyR7Z3JlZW59OyR7Ymx1ZX1tYDtcblxuY29uc3Qgc3R5bGVzID0ge1xuXHRtb2RpZmllcjoge1xuXHRcdHJlc2V0OiBbMCwgMF0sXG5cdFx0Ly8gMjEgaXNuJ3Qgd2lkZWx5IHN1cHBvcnRlZCBhbmQgMjIgZG9lcyB0aGUgc2FtZSB0aGluZ1xuXHRcdGJvbGQ6IFsxLCAyMl0sXG5cdFx0ZGltOiBbMiwgMjJdLFxuXHRcdGl0YWxpYzogWzMsIDIzXSxcblx0XHR1bmRlcmxpbmU6IFs0LCAyNF0sXG5cdFx0b3ZlcmxpbmU6IFs1MywgNTVdLFxuXHRcdGludmVyc2U6IFs3LCAyN10sXG5cdFx0aGlkZGVuOiBbOCwgMjhdLFxuXHRcdHN0cmlrZXRocm91Z2g6IFs5LCAyOV0sXG5cdH0sXG5cdGNvbG9yOiB7XG5cdFx0YmxhY2s6IFszMCwgMzldLFxuXHRcdHJlZDogWzMxLCAzOV0sXG5cdFx0Z3JlZW46IFszMiwgMzldLFxuXHRcdHllbGxvdzogWzMzLCAzOV0sXG5cdFx0Ymx1ZTogWzM0LCAzOV0sXG5cdFx0bWFnZW50YTogWzM1LCAzOV0sXG5cdFx0Y3lhbjogWzM2LCAzOV0sXG5cdFx0d2hpdGU6IFszNywgMzldLFxuXG5cdFx0Ly8gQnJpZ2h0IGNvbG9yXG5cdFx0YmxhY2tCcmlnaHQ6IFs5MCwgMzldLFxuXHRcdGdyYXk6IFs5MCwgMzldLCAvLyBBbGlhcyBvZiBgYmxhY2tCcmlnaHRgXG5cdFx0Z3JleTogWzkwLCAzOV0sIC8vIEFsaWFzIG9mIGBibGFja0JyaWdodGBcblx0XHRyZWRCcmlnaHQ6IFs5MSwgMzldLFxuXHRcdGdyZWVuQnJpZ2h0OiBbOTIsIDM5XSxcblx0XHR5ZWxsb3dCcmlnaHQ6IFs5MywgMzldLFxuXHRcdGJsdWVCcmlnaHQ6IFs5NCwgMzldLFxuXHRcdG1hZ2VudGFCcmlnaHQ6IFs5NSwgMzldLFxuXHRcdGN5YW5CcmlnaHQ6IFs5NiwgMzldLFxuXHRcdHdoaXRlQnJpZ2h0OiBbOTcsIDM5XSxcblx0fSxcblx0YmdDb2xvcjoge1xuXHRcdGJnQmxhY2s6IFs0MCwgNDldLFxuXHRcdGJnUmVkOiBbNDEsIDQ5XSxcblx0XHRiZ0dyZWVuOiBbNDIsIDQ5XSxcblx0XHRiZ1llbGxvdzogWzQzLCA0OV0sXG5cdFx0YmdCbHVlOiBbNDQsIDQ5XSxcblx0XHRiZ01hZ2VudGE6IFs0NSwgNDldLFxuXHRcdGJnQ3lhbjogWzQ2LCA0OV0sXG5cdFx0YmdXaGl0ZTogWzQ3LCA0OV0sXG5cblx0XHQvLyBCcmlnaHQgY29sb3Jcblx0XHRiZ0JsYWNrQnJpZ2h0OiBbMTAwLCA0OV0sXG5cdFx0YmdHcmF5OiBbMTAwLCA0OV0sIC8vIEFsaWFzIG9mIGBiZ0JsYWNrQnJpZ2h0YFxuXHRcdGJnR3JleTogWzEwMCwgNDldLCAvLyBBbGlhcyBvZiBgYmdCbGFja0JyaWdodGBcblx0XHRiZ1JlZEJyaWdodDogWzEwMSwgNDldLFxuXHRcdGJnR3JlZW5CcmlnaHQ6IFsxMDIsIDQ5XSxcblx0XHRiZ1llbGxvd0JyaWdodDogWzEwMywgNDldLFxuXHRcdGJnQmx1ZUJyaWdodDogWzEwNCwgNDldLFxuXHRcdGJnTWFnZW50YUJyaWdodDogWzEwNSwgNDldLFxuXHRcdGJnQ3lhbkJyaWdodDogWzEwNiwgNDldLFxuXHRcdGJnV2hpdGVCcmlnaHQ6IFsxMDcsIDQ5XSxcblx0fSxcbn07XG5cbmV4cG9ydCBjb25zdCBtb2RpZmllck5hbWVzID0gT2JqZWN0LmtleXMoc3R5bGVzLm1vZGlmaWVyKTtcbmV4cG9ydCBjb25zdCBmb3JlZ3JvdW5kQ29sb3JOYW1lcyA9IE9iamVjdC5rZXlzKHN0eWxlcy5jb2xvcik7XG5leHBvcnQgY29uc3QgYmFja2dyb3VuZENvbG9yTmFtZXMgPSBPYmplY3Qua2V5cyhzdHlsZXMuYmdDb2xvcik7XG5leHBvcnQgY29uc3QgY29sb3JOYW1lcyA9IFsuLi5mb3JlZ3JvdW5kQ29sb3JOYW1lcywgLi4uYmFja2dyb3VuZENvbG9yTmFtZXNdO1xuXG5mdW5jdGlvbiBhc3NlbWJsZVN0eWxlcygpIHtcblx0Y29uc3QgY29kZXMgPSBuZXcgTWFwKCk7XG5cblx0Zm9yIChjb25zdCBbZ3JvdXBOYW1lLCBncm91cF0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVzKSkge1xuXHRcdGZvciAoY29uc3QgW3N0eWxlTmFtZSwgc3R5bGVdIG9mIE9iamVjdC5lbnRyaWVzKGdyb3VwKSkge1xuXHRcdFx0c3R5bGVzW3N0eWxlTmFtZV0gPSB7XG5cdFx0XHRcdG9wZW46IGBcXHUwMDFCWyR7c3R5bGVbMF19bWAsXG5cdFx0XHRcdGNsb3NlOiBgXFx1MDAxQlske3N0eWxlWzFdfW1gLFxuXHRcdFx0fTtcblxuXHRcdFx0Z3JvdXBbc3R5bGVOYW1lXSA9IHN0eWxlc1tzdHlsZU5hbWVdO1xuXG5cdFx0XHRjb2Rlcy5zZXQoc3R5bGVbMF0sIHN0eWxlWzFdKTtcblx0XHR9XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoc3R5bGVzLCBncm91cE5hbWUsIHtcblx0XHRcdHZhbHVlOiBncm91cCxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0pO1xuXHR9XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgJ2NvZGVzJywge1xuXHRcdHZhbHVlOiBjb2Rlcyxcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0fSk7XG5cblx0c3R5bGVzLmNvbG9yLmNsb3NlID0gJ1xcdTAwMUJbMzltJztcblx0c3R5bGVzLmJnQ29sb3IuY2xvc2UgPSAnXFx1MDAxQls0OW0nO1xuXG5cdHN0eWxlcy5jb2xvci5hbnNpID0gd3JhcEFuc2kxNigpO1xuXHRzdHlsZXMuY29sb3IuYW5zaTI1NiA9IHdyYXBBbnNpMjU2KCk7XG5cdHN0eWxlcy5jb2xvci5hbnNpMTZtID0gd3JhcEFuc2kxNm0oKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaSA9IHdyYXBBbnNpMTYoQU5TSV9CQUNLR1JPVU5EX09GRlNFVCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kyNTYgPSB3cmFwQW5zaTI1NihBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaTE2bSA9IHdyYXBBbnNpMTZtKEFOU0lfQkFDS0dST1VORF9PRkZTRVQpO1xuXG5cdC8vIEZyb20gaHR0cHM6Ly9naXRodWIuY29tL1FpeC0vY29sb3ItY29udmVydC9ibG9iLzNmMGUwZDRlOTJlMjM1Nzk2Y2NiMTdmNmU4NWM3MjA5NGE2NTFmNDkvY29udmVyc2lvbnMuanNcblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc3R5bGVzLCB7XG5cdFx0cmdiVG9BbnNpMjU2OiB7XG5cdFx0XHR2YWx1ZShyZWQsIGdyZWVuLCBibHVlKSB7XG5cdFx0XHRcdC8vIFdlIHVzZSB0aGUgZXh0ZW5kZWQgZ3JleXNjYWxlIHBhbGV0dGUgaGVyZSwgd2l0aCB0aGUgZXhjZXB0aW9uIG9mXG5cdFx0XHRcdC8vIGJsYWNrIGFuZCB3aGl0ZS4gbm9ybWFsIHBhbGV0dGUgb25seSBoYXMgNCBncmV5c2NhbGUgc2hhZGVzLlxuXHRcdFx0XHRpZiAocmVkID09PSBncmVlbiAmJiBncmVlbiA9PT0gYmx1ZSkge1xuXHRcdFx0XHRcdGlmIChyZWQgPCA4KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMTY7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHJlZCA+IDI0OCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDIzMTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCgoKHJlZCAtIDgpIC8gMjQ3KSAqIDI0KSArIDIzMjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAxNlxuXHRcdFx0XHRcdCsgKDM2ICogTWF0aC5yb3VuZChyZWQgLyAyNTUgKiA1KSlcblx0XHRcdFx0XHQrICg2ICogTWF0aC5yb3VuZChncmVlbiAvIDI1NSAqIDUpKVxuXHRcdFx0XHRcdCsgTWF0aC5yb3VuZChibHVlIC8gMjU1ICogNSk7XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRoZXhUb1JnYjoge1xuXHRcdFx0dmFsdWUoaGV4KSB7XG5cdFx0XHRcdGNvbnN0IG1hdGNoZXMgPSAvW2EtZlxcZF17Nn18W2EtZlxcZF17M30vaS5leGVjKGhleC50b1N0cmluZygxNikpO1xuXHRcdFx0XHRpZiAoIW1hdGNoZXMpIHtcblx0XHRcdFx0XHRyZXR1cm4gWzAsIDAsIDBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IFtjb2xvclN0cmluZ10gPSBtYXRjaGVzO1xuXG5cdFx0XHRcdGlmIChjb2xvclN0cmluZy5sZW5ndGggPT09IDMpIHtcblx0XHRcdFx0XHRjb2xvclN0cmluZyA9IFsuLi5jb2xvclN0cmluZ10ubWFwKGNoYXJhY3RlciA9PiBjaGFyYWN0ZXIgKyBjaGFyYWN0ZXIpLmpvaW4oJycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgaW50ZWdlciA9IE51bWJlci5wYXJzZUludChjb2xvclN0cmluZywgMTYpO1xuXG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXHRcdFx0XHRcdChpbnRlZ2VyID4+IDE2KSAmIDB4RkYsXG5cdFx0XHRcdFx0KGludGVnZXIgPj4gOCkgJiAweEZGLFxuXHRcdFx0XHRcdGludGVnZXIgJiAweEZGLFxuXHRcdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tYml0d2lzZSAqL1xuXHRcdFx0XHRdO1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0aGV4VG9BbnNpMjU2OiB7XG5cdFx0XHR2YWx1ZTogaGV4ID0+IHN0eWxlcy5yZ2JUb0Fuc2kyNTYoLi4uc3R5bGVzLmhleFRvUmdiKGhleCkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRhbnNpMjU2VG9BbnNpOiB7XG5cdFx0XHR2YWx1ZShjb2RlKSB7XG5cdFx0XHRcdGlmIChjb2RlIDwgOCkge1xuXHRcdFx0XHRcdHJldHVybiAzMCArIGNvZGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY29kZSA8IDE2KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDkwICsgKGNvZGUgLSA4KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCByZWQ7XG5cdFx0XHRcdGxldCBncmVlbjtcblx0XHRcdFx0bGV0IGJsdWU7XG5cblx0XHRcdFx0aWYgKGNvZGUgPj0gMjMyKSB7XG5cdFx0XHRcdFx0cmVkID0gKCgoY29kZSAtIDIzMikgKiAxMCkgKyA4KSAvIDI1NTtcblx0XHRcdFx0XHRncmVlbiA9IHJlZDtcblx0XHRcdFx0XHRibHVlID0gcmVkO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvZGUgLT0gMTY7XG5cblx0XHRcdFx0XHRjb25zdCByZW1haW5kZXIgPSBjb2RlICUgMzY7XG5cblx0XHRcdFx0XHRyZWQgPSBNYXRoLmZsb29yKGNvZGUgLyAzNikgLyA1O1xuXHRcdFx0XHRcdGdyZWVuID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA2KSAvIDU7XG5cdFx0XHRcdFx0Ymx1ZSA9IChyZW1haW5kZXIgJSA2KSAvIDU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCB2YWx1ZSA9IE1hdGgubWF4KHJlZCwgZ3JlZW4sIGJsdWUpICogMjtcblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gMzA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHRsZXQgcmVzdWx0ID0gMzAgKyAoKE1hdGgucm91bmQoYmx1ZSkgPDwgMikgfCAoTWF0aC5yb3VuZChncmVlbikgPDwgMSkgfCBNYXRoLnJvdW5kKHJlZCkpO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gMikge1xuXHRcdFx0XHRcdHJlc3VsdCArPSA2MDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRyZ2JUb0Fuc2k6IHtcblx0XHRcdHZhbHVlOiAocmVkLCBncmVlbiwgYmx1ZSkgPT4gc3R5bGVzLmFuc2kyNTZUb0Fuc2koc3R5bGVzLnJnYlRvQW5zaTI1NihyZWQsIGdyZWVuLCBibHVlKSksXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGhleFRvQW5zaToge1xuXHRcdFx0dmFsdWU6IGhleCA9PiBzdHlsZXMuYW5zaTI1NlRvQW5zaShzdHlsZXMuaGV4VG9BbnNpMjU2KGhleCkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0fSk7XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuY29uc3QgYW5zaVN0eWxlcyA9IGFzc2VtYmxlU3R5bGVzKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFuc2lTdHlsZXM7XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuY29uc3QgbGV2ZWwgPSAoKCkgPT4ge1xuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudERhdGEpIHtcblx0XHRjb25zdCBicmFuZCA9IG5hdmlnYXRvci51c2VyQWdlbnREYXRhLmJyYW5kcy5maW5kKCh7YnJhbmR9KSA9PiBicmFuZCA9PT0gJ0Nocm9taXVtJyk7XG5cdFx0aWYgKGJyYW5kICYmIGJyYW5kLnZlcnNpb24gPiA5Mykge1xuXHRcdFx0cmV0dXJuIDM7XG5cdFx0fVxuXHR9XG5cblx0aWYgKC9cXGIoQ2hyb21lfENocm9taXVtKVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0cmV0dXJuIDA7XG59KSgpO1xuXG5jb25zdCBjb2xvclN1cHBvcnQgPSBsZXZlbCAhPT0gMCAmJiB7XG5cdGxldmVsLFxuXHRoYXNCYXNpYzogdHJ1ZSxcblx0aGFzMjU2OiBsZXZlbCA+PSAyLFxuXHRoYXMxNm06IGxldmVsID49IDMsXG59O1xuXG5jb25zdCBzdXBwb3J0c0NvbG9yID0ge1xuXHRzdGRvdXQ6IGNvbG9yU3VwcG9ydCxcblx0c3RkZXJyOiBjb2xvclN1cHBvcnQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0c0NvbG9yO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxyXG5pbXBvcnQgeyBmb3JtYXRWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi9oZWxwZXJzL0Zvcm1hdHRlclwiO1xyXG5pbXBvcnQgeyBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9zZWFyY2hGb3JBdHRyaWJ1dGVXaXRoUGFyZW50c1wiO1xyXG5pbXBvcnQgeyBCYXNlSURFQXNwZWN0IH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3RcIjtcclxuaW1wb3J0IHsgSURlZmF1bHRTZXR0aW5ncywgSVdpZGdldEpzb24gfSBmcm9tIFwiLi4vQmFzZUNsYXNzZXMvSVdpZGdldEpzb25cIjtcclxuaW1wb3J0IHsgRGVmYXVsdCwgSVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbiwgV2lkZ2V0U2V0dGluZ3MgfSBmcm9tIFwiLi9TaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ1wiO1xyXG5cclxubGV0IHRoaXNXaWRnZXRTeXN0ZW1OYW1lID0gXCJTaW5nbGVWYWx1ZUFzcGVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpbmdsZVZhbHVlQXNwZWN0IGV4dGVuZHMgQmFzZUlERUFzcGVjdDxJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uLCBhbnk+IHtcclxuICAgIHJlZnJlc2gobmV3Q29uZmlnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL25vdGhpbmdcclxuICAgIH1cclxuICAgIHJlc2V0KG5ld0NvbmZpZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy9ub3RoaW5nXHJcbiAgICB9XHJcbiAgICBzZXRUaGlzQ29tcG9uZW50TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNpbmdsZVZhbHVlQXNwZWN0XCI7XHJcbiAgICB9XHJcbiAgICBzZXRXaWRnZXRKc29uU2V0dGluZ3MoKTogSVdpZGdldEpzb248SVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiBXaWRnZXRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBzZXREZWZhdWx0cygpOiBJRGVmYXVsdFNldHRpbmdzPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+IHtcclxuICAgICAgICByZXR1cm4gIERlZmF1bHRcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbDogYW55KSB7XHJcbiAgICAvLyAgICAgc3VwZXIoXCJTaW5nbGVWYWx1ZUFzcGVjdFwiLCBcImFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyXCIsIGVsZW1lbnQsIGNvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbClcclxuICAgIC8vICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcml2YXRlIGluaXRpYWxpc2UoKSB7Ly8hIE5vdGU6IFVJIGZyYW1ld29yayBsb29rcyBmb3IgdGhpcyBtZXRob2QgbmFtZSBhbmQgaWYgZm91bmQgYmVoYXZlcyBkaWZmZXJlbnRseSBhbmQgd29udCBjYWxsIGxvYWRBbmRCaW5kXHJcblxyXG4gICAgYXN5bmMgc2V0dXAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLm9wdGlvbnMudGl0bGUoKSB8fCBcIlRpdGxlIFZhbHVlXCJcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gTWFwIHRoZSByb2xlQ29uZmlnTW9kZWxzXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmZpZWxkUGF0aC5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiRmllbGQgcGF0aCBjaGFuZ2VkXCIsIFwiZ3JlZW5cIixuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEFuZEJpbmQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuY2FsY3VsYXRlZFRpdGxlKHRoaXMub3B0aW9ucy50aXRsZSgpIHx8IFwiVGl0bGUgVmFsdWVcIik7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zLnRpdGxlLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJUaXRsZSBjaGFuZ2VkXCIsIFwiZ3JlZW5cIiwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICBpZihuZXdWYWx1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jYWxjdWxhdGVkVGl0bGUobmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcnJpZGUgbG9hZEFuZEJpbmQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBkYXRhIChtb2RlbCkgcGFzc2VkIGluXCIsIFwiZ3JlZW5cIik7XHJcbiAgICAgICAgLy8gc3VwZXIubG9hZEFuZEJpbmQoKTsgLy9ObyBuZWVkIHRvIGxvYWQgYW5kIGJpbmQgYXMgd2UgYXJlIG5vdCB1c2luZyB0aGUgYmFzZSBtb2RlbFxyXG5cclxuICAgICAgICBpZighdGhpcy5zaGFyZWRvSWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9JZCBwYXNzZWQgaW5cIiwgXCJyZWRcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLm9wdGlvbnMuZmllbGRQYXRoKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGZpZWxkIHBhdGggcGFzc2VkIGluXCIsIFwicmVkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUodGhpcy5zaGFyZWRvSWQoKSwgdGhpcy5vcHRpb25zLmZpZWxkUGF0aCgpISwgdGhpcy5vcHRpb25zLmRhdGFTZXR0aW5ncygpLmdldFZhbHVlVXNpbmdQYXJlbnRzISwgdGhpcy5vcHRpb25zLmRhdGFTZXR0aW5ncygpLm1heERlcHRoKS50aGVuKChkYXRhKT0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YS5mb3VuZCA9PSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coXCJObyBkYXRhIHJldHVybmVkXCIsIFwicmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmNhbGN1bGF0ZWRWYWx1ZSh0aGlzLm9wdGlvbnMudmFsdWVPbk5vdEZvdW5kKCkgfHwgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybWF0dGVkVmFsdWUgPSBmb3JtYXRWYWx1ZShkYXRhLnZhbHVlLCB0aGlzLm9wdGlvbnMuZm9ybWF0dGVyKCkgfHwgXCJ2YWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jYWxjdWxhdGVkVmFsdWUoZm9ybWF0dGVkVmFsdWUgfHwgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgb3ZlcnJpZGUgYXN5bmMgb25TYXZlKG1vZGVsOiBhbnkpIHtcclxuXHJcbiAgICAgICAgdGhpcy5sb2coXCJObyBTYXZlIEltcGxlbWVudGVkXCIsIFwiZ3JlZW5cIik7XHJcbiAgICAgICAgLy8gc3VwZXIub25TYXZlKG1vZGVsKTtcclxuXHJcbiAgICB9O1xyXG59ICJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==