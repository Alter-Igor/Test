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
/* harmony export */   getValueFromKOObject: () => (/* binding */ getValueFromKOObject),
/* harmony export */   gvko: () => (/* binding */ gvko),
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
/**
 * This function should be temporary and will be removed once the typescript typing are fixed
 * What is does is check if the passed in object is a knockout observable and if it is it returns the value
 * @param koObject
 * @returns
 */
function getValueFromKOObject(koObject) {
    if (typeof koObject === "function") {
        return koObject();
    }
    return koObject;
}
function gvko(koObject) {
    return getValueFromKOObject(koObject);
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
async function executeFetch(api, method, data, retryCounter) {
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
            if (response.status === 401) {
                retryCounter = retryCounter || 1;
                if (retryCounter > 3) {
                    retValue.info.error.push({
                        code: "API_ERROR",
                        message: `An error occured while trying to call the API after 3 attempts. statusText: ${response.statusText}`,
                        userMessage: "An error occured while trying to call the API."
                    });
                    return { data: undefined, response };
                }
                await $ajax.get("https://hsf-vnext.sharedo.co.uk/security/refreshTokens?_=" + Date.now);
                return await executeFetch(api, method, data, retryCounter);
            }
            retValue.info.error.push({
                code: "API_ERROR",
                message: `An error occured while trying to call the API. statusText: ${response.statusText}`,
                userMessage: "An error occured while trying to call the API."
            });
        }
        let responseData;
        //check if response is JSON
        try {
            if (response.headers.get("content-type")?.includes("application/json")) {
                responseData = await response.json();
            }
            else {
                responseData = await response.text();
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
        return { data: responseData, response };
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
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Common_EventsHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/EventsHelper */ "./src/WebBased/Common/EventsHelper.ts");
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Common/Log */ "./src/Common/Log.ts");
/* harmony import */ var _KOConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./KOConverter */ "./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts");
/* harmony import */ var _Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Common/ObjectHelper */ "./src/WebBased/Common/ObjectHelper.ts");
/* harmony import */ var _Common_HtmlHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Common/HtmlHelper */ "./src/Common/HtmlHelper.ts");
/* harmony import */ var _Common_JsonToHTMLConverter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Common/JsonToHTMLConverter */ "./src/Common/JsonToHTMLConverter.ts");
/* harmony import */ var _Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Common/api/searchForAttributeWithParents */ "./src/WebBased/Common/api/searchForAttributeWithParents.ts");
/* harmony import */ var _DebugDefaults__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DebugDefaults */ "./src/WebBased/IDEAspects/BaseClasses/DebugDefaults.ts");










console.log("v: - 3.29");
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
        this.disposables = [];
        this.refreshLog = new Array();
        this.errorDivSelector = ERROR_DIV_SELECTOR;
        this.errors = knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray();
        if (arr.length === 0) {
            //This is the base constructor
            return;
        }
        if (arr.length === 3) {
            //This is the constructor that is called by the IDE
            this.uniqueId = (0,uuid__WEBPACK_IMPORTED_MODULE_9__["default"])();
            this._initialise(arr[0], arr[1], arr[2]);
            // this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
            this.fireEvent("onSetup", this.model);
            this.setup();
            this.fireEvent("afterSetup", this.model);
            this.setupLiveConfig();
            this.setupEventWatcher();
            this.setupErrorManager();
            this.addAspectLogOutput();
            return;
        }
    }
    _initialise(element, polutedConfiguration, baseModel) {
        //let configuration = polutedConfiguration.configuration; //Poluted as Sharedo added additional information to thsi object depending on where its instansiated
        this.sharedoConfiguration = polutedConfiguration;
        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = polutedConfiguration;
        this.baseModel = baseModel;
        // this.originalConfiguration
        // let baseDefaults: IDefaultConfigSettings<any> = {
        //     debug: {
        //         enabled: false,
        //         logToConsole: false,
        //         showInAspect: false,
        //         liveConfig: false
        //     }
        // }
        //check that we have a sub configuration
        if (!this.sharedoConfiguration.configuration) {
            console.error("No configuration found in the sharedoConfiguration - check the aspect or widget config that ther eis a base configuration of configuration:{}");
            throw new Error("No configuration found in the sharedoConfiguration");
        }
        this.sharedoConfiguration.configuration.debug = $.extend((0,_DebugDefaults__WEBPACK_IMPORTED_MODULE_8__.DEBUG_DEFAULT)(), this.sharedoConfiguration.configuration.debug); //make sure debug is set or use defaults
        // this.originalConfiguration.debug = $.extend(baseDefaults.debug, this.originalConfiguration.debug) as IDebug;
        // configuration.debug = $.extend(baseDefaults, configuration.debug) as IDebug;
        // this.data = undefined;
        // Merge the configuration with the defaults
        this.sharedoConfiguration.configuration = $.extend(this.defaults, this.originalConfiguration.configuration);
        //create a new model
        this.model = this.sharedoConfiguration._host?.model;
        // this.enabled = this.model?.canEdit;
        this.blade = this.sharedoConfiguration._host?.blade;
        this.loaded = this.loaded || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(false);
        // Map the base model properties
        this.sharedoId = this.sharedoConfiguration._host?.model.id || $ui.pageContext?.sharedoId || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        if (!this.sharedoId || this.sharedoId()) {
            this.log("No sharedoId found");
        }
        this.sharedoTypeSystemName = this.sharedoConfiguration._host?.model?.sharedoTypeSystemName || $ui.pageContext?.sharedoTypeName || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        if (!this.sharedoTypeSystemName || !this.sharedoTypeSystemName()) {
            this.log("No sharedoTypeSystemName found");
        }
        this.parentSharedoId = this.sharedoConfiguration._host?.model?.parentSharedoId || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        this.phaseName = this.sharedoConfiguration._host?.model?.phaseName || $ui.pageContext?.phaseName || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        this.phaseIsOpen = this.sharedoConfiguration._host?.model?.phaseIsOpen || $ui.pageContext?.phaseIsOpen || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        // this.shareDoOptions = toObservableObject(this.sharedoConfiguration, this.shareDoOptions);
        // this._shareDoOptions = this.shareDoOptions as ObservableSharedoConfigurationOptions<unknown>
        // Validation
        this.validation = {};
        this.validationErrorCount = this.validationErrorCount || knockout__WEBPACK_IMPORTED_MODULE_0__.observable(0);
        this.applyComponentConfiguration(this.sharedoConfiguration.configuration);
        //setup the location to load and save the data from by calling the abstract method in the child class
        //! --> LocationToSaveOrLoadData <-- - this should be called at the end of this function to ensure that the options and configuration data is availabel to the child class
        this.LocationToSaveOrLoadData = this.setLocationOfDataToLoadAndSave();
        this.fireEvent("onInitialise", this.model);
    }
    applyComponentConfiguration(configuration) {
        let configurationAsObservables = (0,_KOConverter__WEBPACK_IMPORTED_MODULE_3__.toObservableObject)(configuration, this.options);
        this.configuration = configuration;
        this.options = configurationAsObservables;
        // ! Note line below is for typing within the IDEBase, the line above is for typing within the child class
        this._options = configurationAsObservables;
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
        this._options?.debug.subscribe((newValue) => {
            if (newValue.liveConfig) {
                this.activateLiveConfig(newValue.liveConfig);
            }
        });
        this.activateLiveConfig(this._options?.debug().liveConfig()); //TODO fix typings
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
        const serializedData = JSON.stringify(this.sharedoConfiguration, (key, value) => {
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
                    this.applyComponentConfiguration(newConfig.configuration);
                    this.liveConfigurationRefreshed();
                    // this.refresh(newConfig);
                    // this.reset(newConfig);
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
    setupEventWatcher() {
        this._options?.eventsToReactTo()?.forEach((eventToWatch) => {
            console.log("Subscribing to event", eventToWatch);
            this.disposables.push($ui.events.subscribe(eventToWatch.eventPath(), (e) => {
                this.refreshComponent(eventToWatch.eventPath(), eventToWatch.methodToCall());
            }, this));
        });
        let refreshOn = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._options?.refreshOn());
        if (refreshOn) {
            if (refreshOn.sharedoIdChanged) {
                this.disposables.push(this.sharedoId.subscribe((newValue) => {
                    this.refreshComponent("sharedoIdChanged", "refresh");
                }));
            }
            if (refreshOn.sharedoParentIdChanged) {
                this.disposables.push(this.parentSharedoId.subscribe((newValue) => {
                    this.refreshComponent("sharedoParentIdChanged", "refresh");
                }));
            }
            if (refreshOn.sharedoPhaseChanged) {
                this.disposables.push(this.phaseName.subscribe((newValue) => {
                    this.refreshComponent("sharedoPhaseChanged", "refresh");
                }));
            }
        }
    }
    refreshComponent(eventPath, methodToCall) {
        this.refreshLog = this.refreshLog || [];
        if (this.lastRefresh) //TODO: change this so we collect all refreshes and do them in one go
         {
            let secondsSinceLastRefresh = (new Date().getTime() - this.lastRefresh.getTime()) / 100;
            console.log("Seconds since last refresh", secondsSinceLastRefresh);
            if (secondsSinceLastRefresh < 10) {
                console.log("Skipping refresh, too soon");
                return;
            }
        }
        this.lastRefresh = new Date();
        console.log("Refreshing component");
        let logItem = { eventPath: eventPath, methodToCall: methodToCall, time: new Date(), success: false };
        try {
            if (methodToCall) {
                // let params = widgets.parameters;
                console.log("Executing method", methodToCall);
                let componentToRefresh = this;
                if (!componentToRefresh[methodToCall]) {
                    console.log(`Method not found on component ${this.thisComponentName}`, methodToCall);
                }
                {
                    componentToRefresh[methodToCall](); //todo: parameters
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            logItem.success = true;
            this.refreshLog.push(logItem);
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
        if (this._options?.debug().supportRequestEnabled) {
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
        let dataToSave = this._data;
        this.log("Saving, model passed in we need to persist to", "green", dataToSave);
        if (this.LocationToSaveOrLoadData === undefined) {
            this.log("No location to save data to set - this method should be overriden", "red");
            return;
        }
        let dataToPersist = this._data;
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
        this.l("Data saved", model);
    }
    ;
    async getData() {
        if (this._data) {
            return this._data;
        }
        //This section is d=use due to typing issue that needs to be resolved.
        // let useParents = gvko(this._options.dataSettings().getValueUsingParents) as boolean | undefined
        // let shareDoId= gvko(this.sharedoId)
        // let maxDepth = gvko(this._options.dataSettings().maxDepth) as number | undefined
        // let LocationToSaveOrLoadData = gvko(this.LocationToSaveOrLoadData) as string | undefined
        //end area of typing issue
        let useParents = this._options?.dataSettings().getValueUsingParents();
        let shareDoId = this.sharedoId();
        let maxDepth = this._options?.dataSettings().maxDepth();
        let LocationToSaveOrLoadData = (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.gvko)(this.LocationToSaveOrLoadData);
        if (LocationToSaveOrLoadData === undefined) {
            this.log("No location to load data from set - this method should be overriden", "red");
            return this._data;
        }
        this._data = (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.getNestedProperty)(this.model, LocationToSaveOrLoadData);
        if (this._data !== undefined) {
            this.l("Data found at location", this._data);
            this._data = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._data);
            return this._data;
        }
        //if data ot found in the current model, look via the search
        if (this._data === undefined && useParents === false && shareDoId) //! TODO Fix Typings
         {
            return (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_7__.searchForAttributeRecursive)(shareDoId, LocationToSaveOrLoadData, false).then((data) => {
                if (data.found) {
                    this._data = data.value;
                }
                return this._data;
            });
        }
        if (this._data === undefined && useParents === true) //! TODO Fix Typings
         {
            let idToUser = this.sharedoId() || this.parentSharedoId();
            if (!idToUser) {
                this.log("No id to use for search both sharedoId and parentSharedoId are undefined");
                return this._data;
            }
            return (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_7__.searchForAttributeRecursive)(idToUser, LocationToSaveOrLoadData, useParents, maxDepth).then((data) => {
                if (data.found) {
                    this._data = data.value;
                }
                return this._data;
            });
        }
    }
    setData(value) {
        let valueToPersist = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(value);
        let previousValue = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._data);
        this._data = valueToPersist;
        this.fireValueChangedEvent("onDataBeforeChanged", { previousValue: previousValue, newValue: valueToPersist });
        if (this.LocationToSaveOrLoadData === undefined) {
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
        (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.setNestedProperty)(this.model, this.LocationToSaveOrLoadData, this._data);
        this.fireEvent("onDataChanged", this.model);
    }
    onDestroy(model) {
        this.log("IDEAspects.Example : onDestroy");
        this.fireEvent("onDestroy", model);
        $ui.util.dispose(this.disposables);
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
    debugSettings() {
        let debugSetting = (0,_DebugDefaults__WEBPACK_IMPORTED_MODULE_8__.DEBUG_DEFAULT)();
        if (this._options?.debug()) {
            debugSetting = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._options?.debug());
        }
        return debugSetting;
    }
    /**
     * Provides logging for the component based on the debug configuration
     * @param message
     * @param color
     * @param data
     */
    log(message, color, data) {
        if (this.debugSettings().enabled) {
            if (this.debugSettings().logToConsole) {
                if (!color)
                    color = "black";
                // let lineNo = extractLineNumberFromStack((new Error()).stack);
                console.log(`%c ${this.thisComponentName} - ${message}`, `color:${color}`, data);
            }
        }
    }
    canLog() {
        return this.debugSettings().enabled;
    }
    logToConsole() {
        return this.canLog() && this.debugSettings().logToConsole;
    }
    logToAspect() {
        return this.canLog() && this.debugSettings().showInAspect;
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
    fireValueChangedEvent(eventName, changedData) {
        let event = {
            eventPath: this.thisComponentName + "." + eventName,
            eventName: eventName,
            source: this,
            data: changedData
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
        if (!this.blade) {
            //TODO: if no blade where is form builder data
            return undefined;
        }
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
        let formBuilder = this.formbuilder();
        if (!formBuilder) {
            return;
        }
        let foundValue = formBuilder[formbuilderField];
        if (!foundValue) {
            this.log(`Form builder does not contain field ${formbuilderField} `, "orange");
            this.log(`Creating field ${formbuilderField} `, "blue");
            formBuilder[formbuilderField] = undefined;
        }
        //Are we doing a set
        if (setValue) {
            this.log(`Setting ${formbuilderField} to ${setValue}`, "green");
            formBuilder[formbuilderField] = setValue;
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
/* harmony export */   DEBUG_DEFAULT: () => (/* binding */ DEBUG_DEFAULT),
/* harmony export */   DefaultDataSettings: () => (/* binding */ DefaultDataSettings),
/* harmony export */   REFRESH_ON_DEFAULTS: () => (/* binding */ REFRESH_ON_DEFAULTS)
/* harmony export */ });
const DEBUG_DEFAULT = () => {
    let retValue = {
        supportRequestEnabled: false,
        enabled: true,
        logToConsole: true,
        showInAspect: false,
        liveConfig: false,
    };
    return retValue;
};
const REFRESH_ON_DEFAULTS = {
    sharedoIdChanged: false,
    sharedoParentIdChanged: false,
    sharedoPhaseChanged: false,
};
const DefaultDataSettings = {
    debug: DEBUG_DEFAULT(),
    refreshOn: REFRESH_ON_DEFAULTS,
    eventsToReactTo: [
        {
            eventPath: "sharedo.updated",
            methodToCall: "refresh"
        },
        {
            eventPath: "sharedo.core.case.sharedo-updated",
            methodToCall: "refresh"
        }
    ],
    dataSettings: {
        getValueUsingParents: false,
        maxDepth: 0
    }
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
                    // existing[key]=ensureIsObservableArray(existing, key)
                    existing[key](value.map(item => toObservableObject(item, {})));
                }
            }
            else if (value !== null && typeof value === 'object') {
                if (!existing[key]) {
                    existing[key] = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(toObservableObject(value, {}));
                }
                else {
                    // existing[key]  = ensureIsObservable(existing, key);
                    existing[key](toObservableObject(value, existing[key]()));
                }
            }
            else {
                if (!existing[key]) {
                    existing[key] = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(value);
                }
                else {
                    // existing[key] = ensureIsObservable(existing, key);
                    existing[key](value);
                }
            }
        }
    }
    return existing;
}
function ensureIsObservable(existing, key) {
    if (knockout__WEBPACK_IMPORTED_MODULE_0__.isObservable(existing[key])) {
        return existing[key];
    }
    else {
        return knockout__WEBPACK_IMPORTED_MODULE_0__.observable();
    }
}
function ensureIsObservableArray(existing, key) {
    if (knockout__WEBPACK_IMPORTED_MODULE_0__.isObservableArray(existing[key])) {
        return existing[key];
    }
    else {
        return knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray();
    }
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
    fieldPath: "title",
    title: null,
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
    refreshOn: {
        sharedoIdChanged: true,
        sharedoParentIdChanged: true,
        sharedoPhaseChanged: true,
    },
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
        "allowInSharedoPortalDesigner": true,
        "allowAspectAdapter": true,
        "title": "Single Value Aspect",
        "icon": "fa-cog",
        "description": "Single Value Aspect",
        "categories": ["UD - IDEAspects"],
        "isConfigurable": true,
        "configurationWidget": null,
        "defaultConfigurationJson": { configuration: Default }
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
    let dynamicFunc;
    let returnValue;
    try {
        dynamicFunc = new Function('value', `return (${formatter});`);
        // Invoke the function with the given value
        returnValue = dynamicFunc(value);
    }
    catch (e) {
        returnValue = `Error formatting value ${value} with formatter ${formatter} - ${e}`;
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
    liveConfigurationRefreshed() {
        //nothing
    }
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
            title: this.options?.title() || "Title Value"
        });
        // Map the roleConfigModels
        this.options?.fieldPath.subscribe((newValue) => {
            this.log("Field path changed", "green", newValue);
            this.loadAndBind();
        });
        this.options?.calculatedTitle(this.options?.title() || "Title Value");
        this.options?.title.subscribe((newValue) => {
            this.log("Title changed", "green", newValue);
            if (newValue) {
                this.options?.calculatedTitle(newValue);
            }
        });
    }
    loadAndBind() {
        this.log("Loading data (model) passed in", "green");
        // super.loadAndBind(); //No need to load and bind as we are not using the base model
        let sharedoId = this.sharedoId();
        if (!sharedoId) {
            this.log("No sharedoId passed in", "red");
            return;
        }
        if (!this.options?.fieldPath()) {
            this.log("No field path passed in", "red");
            return;
        }
        (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_1__.searchForAttributeRecursive)(sharedoId, this.options?.fieldPath(), this.options?.dataSettings().getValueUsingParents(), this.options?.dataSettings().maxDepth()).then((data) => {
            if (!data || data.found == false) {
                this.log("No data returned", "red");
                this.options?.calculatedValue(this.options?.valueOnNotFound() || "");
            }
            else {
                let formattedValue = (0,_helpers_Formatter__WEBPACK_IMPORTED_MODULE_0__.formatValue)(data.value, this.options?.formatter() || "value");
                this.options?.calculatedValue(formattedValue || "");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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azovL0lERUFzcGVjdHMvLi9zcmMvQ29tbW9uL0h0bWxIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9Db21tb24vSnNvblRvSFRNTENvbnZlcnRlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL0NvbW1vbi9Mb2cudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9Db21tb24vU3RhY2tIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9Db21tb24vRXZlbnRzSGVscGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL09iamVjdEhlbHBlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvYXBpLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL2FwaS9leGVjdXRlRmluZEJ5UXVlcnkvRmluZEJ5UXVlcnkudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9Db21tb24vYXBpL3NlYXJjaEZvckF0dHJpYnV0ZVdpdGhQYXJlbnRzLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9CYXNlSURFQXNwZWN0LnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9EZWJ1Z0RlZmF1bHRzLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9LT0NvbnZlcnRlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvU2luZ2xlVmFsdWVBc3BlY3QvU2luZ2xlVmFsdWVBc3BlY3RDb25maWcudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9oZWxwZXJzL0Zvcm1hdHRlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL2V4dGVybmFsIHZhciBcImtvXCIiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL3ZlbmRvci9hbnNpLXN0eWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS92ZW5kb3Ivc3VwcG9ydHMtY29sb3IvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvU2luZ2xlVmFsdWVBc3BlY3QvU2luZ2xlVmFsdWVBc3BlY3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVIdG1sKHVuc2FmZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHVuc2FmZVxuICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcbiAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYWRkSGlnaGxpZ2h0Q2xhc3MoY29udGVudDogc3RyaW5nLCB0YXJnZXRXb3JkOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gY29udGVudC5yZXBsYWNlKG5ldyBSZWdFeHAoYFxcXFxiJHt0YXJnZXRXb3JkfVxcXFxiYCwgJ2dpJyksIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCJoaWdobGlnaHRcIj4ke21hdGNofTwvc3Bhbj5gO1xuICB9KTtcbn1cbiIsIlxuZXhwb3J0IGNsYXNzIEpzb25Ub0h0bWxDb252ZXJ0ZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydChqc29uOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBpZiAoanNvbiA9PSBudWxsKSByZXR1cm4gdGhpcy5lc2NhcGVIdG1sKFwiPGVtPm51bGw8L2VtPlwiKTtcbiAgICAgICAgaWYgKHR5cGVvZiBqc29uICE9PSBcIm9iamVjdFwiKSByZXR1cm4gdGhpcy5lc2NhcGVIdG1sKGpzb24udG9TdHJpbmcoKSk7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoanNvbikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFycmF5VG9IdG1sKGpzb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0VG9IdG1sKGpzb24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXJyYXlUb0h0bWwoYXJyOiBhbnlbXSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGl0ZW1zSHRtbCA9IGFyci5tYXAoaXRlbSA9PiBgPGxpPiR7dGhpcy5jb252ZXJ0KGl0ZW0pfTwvbGk+YCkuam9pbihcIlwiKTtcbiAgICAgICAgcmV0dXJuIGA8dWw+JHtpdGVtc0h0bWx9PC91bD5gO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIG9iamVjdFRvSHRtbChvYmo6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXNIdG1sID0gT2JqZWN0LmtleXMob2JqKVxuICAgICAgICAgICAgLm1hcChrZXkgPT4gYDxsaT4ke3RoaXMuZXNjYXBlSHRtbChrZXkpfTogJHt0aGlzLmNvbnZlcnQob2JqW2tleV0pfTwvbGk+YClcbiAgICAgICAgICAgIC5qb2luKFwiXCIpO1xuICAgICAgICByZXR1cm4gYDx1bD4ke3Byb3BlcnRpZXNIdG1sfTwvdWw+YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBlc2NhcGVIdG1sKHVuc2FmZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHVuc2FmZS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csIFwiJmx0O1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiJiMwMzk7XCIpO1xuICAgIH1cbn1cblxuLy8gVXNhZ2UgZXhhbXBsZTpcbmNvbnN0IGpzb24gPSB7XG4gICAgY29kZTogXCJFUlJPUl9DT0RFXCIsXG4gICAgbWVzc2FnZTogXCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiLFxuICAgIGRldGFpbHM6IHtcbiAgICAgICAgaW5mbzogXCJEZXRhaWxlZCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZXJyb3JcIixcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIGl0ZW1zOiBbMSwgMiwgM11cbiAgICB9XG59O1xuXG4iLCJpbXBvcnQgY2hhbGssIHsgQ2hhbGtJbnN0YW5jZSB9IGZyb20gJ2NoYWxrJztcbmltcG9ydCB7IGV4dHJhY3RDYWxsZXJGcm9tU3RhY2ssIGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrIH0gZnJvbSAnLi9TdGFja0hlbHBlcic7XG5cbmNoYWxrLmxldmVsID0gMztcbmxldCBkZWZhdWx0TW9kZTogQ2hhbGtJbnN0YW5jZSA9IGNoYWxrLnJlc2V0O1xuXG5cbmxldCBsYXN0U2VjOiBTZWN0aW9uIHwgdW5kZWZpbmVkO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlYygpIHtcblxuICAgIC8vIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKXtcbiAgICAvLyBjb25zb2xlLmdyb3VwRW5kKClcbiAgICAvLyB9XG5cbiAgICBpZiAobGFzdFNlYz8uZ3JvdXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXN0U2VjPy5ncm91cDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGFzdFNlYyA9IG5ldyBTZWN0aW9uKFwiUm9vdFwiLCBkZWZhdWx0TW9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWNCYWNrT25lKCkge1xuICAgIGxhc3RTZWMgPSBsYXN0U2VjPy5wYXJlbnQ7XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xufVxuXG5leHBvcnQgY2xhc3MgU2VjdGlvbiB7XG4gICAgc2VjdGlvbk5hbWU6IHN0cmluZztcbiAgICBwYXJlbnQ6IFNlY3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgYzogQ2hhbGtJbnN0YW5jZVxuICAgIGluZGVudCA9IDA7XG4gICAgaW5kZW50UGFkID0gXCJcIjtcbiAgICBncm91cDogbnVtYmVyID0gMDtcbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uTmFtZTogc3RyaW5nLCBjOiBDaGFsa0luc3RhbmNlLCBzZWN0aW9uPzogU2VjdGlvbikge1xuICAgICAgICB0aGlzLmMgPSBjO1xuICAgICAgICB0aGlzLnNlY3Rpb25OYW1lID0gc2VjdGlvbk5hbWU7XG4gICAgICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmluZGVudCA9IHNlY3Rpb24uaW5kZW50ICsgMTtcbiAgICAgICAgICAgIHRoaXMuaW5kZW50UGFkID0gXCItXCIucmVwZWF0KHRoaXMuaW5kZW50ICogMikgKyBcIiBcIjtcbiAgICAgICAgfVxuICAgICAgICBsYXN0U2VjID0gdGhpcztcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBzZWN0aW9uO1xuICAgIH1cbiAgICBsb2coLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc29sZS5sb2coZGVmYXVsdE1vZGUoYXJncykpO1xuICAgIH1cbiAgICBsaDEoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDEodGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsaDIoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDIodGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsaDMoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDModGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiBsKHRoaXMsIC4uLmFyZ3MpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGwoLi4uYXJnczogYW55W10pIHtcblxuICAgIGxldCBzZWM6IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjO1xuICAgIGxldCBmaXJzdEFyZzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGxldCBmaXJzdEFyZ01vZGlmZWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgICBpZiAoYXJnIGluc3RhbmNlb2YgU2VjdGlvbikge1xuICAgICAgICAgICAgc2VjID0gYXJnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZmlyc3RBcmcgJiYgYXJnLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiU3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGZpcnN0QXJnID0gYXJncy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vcmVtb3ZlZCBTZWN0aW9uIGZyb20gYXJnc1xuICAgIGFyZ3MgPSBhcmdzLmZpbHRlcigoYXJnKSA9PiB7XG4gICAgICAgIHJldHVybiAhKGFyZyBpbnN0YW5jZW9mIFNlY3Rpb24pO1xuICAgIH0pXG5cblxuICAgIC8vIGxldCBjID0gc2VjPy5jIHx8IG1vZGU7XG4gICAgbGV0IGMgPSBkZWZhdWx0TW9kZTtcbiAgICBsZXQgaW5kZW50UGFkID0gc2VjPy5pbmRlbnRQYWQgfHwgXCJcIjtcblxuICAgIGlmICghZmlyc3RBcmcpIHtcbiAgICAgICAgZmlyc3RBcmcgPSBcIlwiO1xuICAgIH1cbiAgICBmaXJzdEFyZ01vZGlmZWQgPSBmaXJzdEFyZztcblxuICAgIGZpcnN0QXJnTW9kaWZlZCA9IGluZGVudFBhZCArIGZpcnN0QXJnO1xuICAgIC8vcmVtb3ZlIGNvbG9yIGZvcm1hdHRpbmcgZnJvbSBmaXJzdCBhcmdcbiAgICBsZXQgdG90TGVuID0gZmlyc3RBcmdNb2RpZmVkLmxlbmd0aCAtIGZpcnN0QXJnTW9kaWZlZC5yZXBsYWNlKC9cXHUwMDFiXFxbLio/bS9nLCAnJykubGVuZ3RoIC0gMjtcblxuXG4gICAgY29uc29sZS5sb2coZmlyc3RBcmdNb2RpZmVkKTtcblxuICAgIC8vcmVtb3ZlZCBTZWN0aW9uIGZyb20gYXJnc1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYXJnKTtcbiAgICB9KVxuXG5cbn1cblxuXG5cbmZ1bmN0aW9uIGxvZ0hlYWRpbmdTZWN0aW9uKGM6IENoYWxrSW5zdGFuY2UsIGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbj86IFNlY3Rpb24pIHtcblxuICAgIGxldCBzZWMgPSBuZXcgU2VjdGlvbihoZWFkaW5nLCBjLCBzZWN0aW9uKTtcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKERhdGUubm93KCkpLnRvTG9jYWxlU3RyaW5nKCk7XG5cbiAgICBsZXQgcGF0aCA9IFwiXCI7XG4gICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgcGF0aCA9IHNlY3Rpb24uc2VjdGlvbk5hbWU7XG4gICAgICAgIHdoaWxlIChzZWN0aW9uLnBhcmVudCkge1xuICAgICAgICAgICAgc2VjdGlvbiA9IHNlY3Rpb24ucGFyZW50O1xuICAgICAgICAgICAgcGF0aCA9IHNlY3Rpb24uc2VjdGlvbk5hbWUgKyBcIiAtPiBcIiArIHBhdGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2FkZCBhZGQgaGVhZGluZyB0byBlbmQgb2YgcGF0aCBhbmQgb25seSBhZGQgLT4gaWYgcGF0aCBpcyBub3QgZW1wdHlcbiAgICBpZiAocGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBhdGggKz0gXCIgLT4gXCI7XG4gICAgfVxuICAgIHBhdGggKz0gaGVhZGluZztcblxuXG5cbiAgICAvL3Bvc2l0aW9uIHRoZSBoZWFkaW5nIGluIHRoZSBtaWRkbGUgb2YgdGhlIHNjcmVlblxuICAgIC8vIGNvbnNvbGUubG9nKGMoaGVhZGluZy5wYWRTdGFydCgoY3dpZHRoIC8gMikgKyAoaGVhZGluZy5sZW5ndGggLyAyKSwgXCIgXCIpLnBhZEVuZChjd2lkdGgsIFwiIFwiKSkpO1xuICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoYyhwYXRoKSk7XG4gICAgc2VjLmdyb3VwKys7XG5cbiAgICByZXR1cm4gc2VjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGgxKGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWMpIHtcbiAgICBsZXQgYyA9IGNoYWxrLmJnQmxhY2suZ3JlZW5CcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaDIoaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYykge1xuICAgIGxldCBjID0gY2hhbGsuYmdHcmF5LmN5YW5CcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaDMoaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYykge1xuICAgIGxldCBjID0gY2hhbGsuYmdHcmF5Lm1hZ2VudGFCcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cblxuZXhwb3J0IGNvbnN0IGxoID0gbGgxO1xuXG5cbmV4cG9ydCBjb25zdCBpbXAgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay5yZWQuYm9sZC5iZ0JsYWNrO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgaW5mID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsuYmx1ZS5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3Qgd3JuID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsueWVsbG93LmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59IFxuXG5leHBvcnQgY29uc3QgZXJyID0gKHRleHQ6IHN0cmluZykgPT4ge1xuXG4gICAgbGV0IGVyID0gKG5ldyBFcnJvcigpKTtcbiAgICBsZXQgbGluZU5vID0gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soZXIuc3RhY2spO1xuICAgIGxldCBjYWxsZXIgPSBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrKGVyLnN0YWNrKTtcblxuICAgIGxldCBwcmVUZXh0ID0gYFske2NhbGxlcn06JHtsaW5lTm99XWA7XG5cbiAgICB0ZXh0ID0gcHJlVGV4dCArIFwiIFwiICsgdGV4dDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhlcik7XG5cbiAgICBsZXQgYyA9IGNoYWxrLnJlZC5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3Qgc3VjID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsuZ3JlZW4uYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGhsID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ0JsdWUodGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBobDEgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGNoYWxrLmJnTWFnZW50YSh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IG52ID0gKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ0JsdWVCcmlnaHQobmFtZS5wYWRFbmQoMzAsIFwiIFwiKSkgKyBcIiA6IFwiICsgY2hhbGsuY3lhbkJyaWdodCh2YWx1ZSk7XG59XG5cbiBcbmxldCBleGFtcGxlSlNvbiA9XG57XG4gICAgXCJuYW1lXCI6IFwidGVzdFwiLFxuICAgIFwiYWdlXCI6IDEwLFxuICAgIFwiYWRkcmVzc1wiOiB7XG4gICAgICAgIFwic3RyZWV0XCI6IFwiMTIzIEZha2UgU3RyZWV0XCIsXG4gICAgICAgIFwiY2l0eVwiOiBcIkxvbmRvblwiLFxuICAgICAgICBcInBvc3Rjb2RlXCI6IFwiU1cxQSAxQUFcIlxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blRlc3QoKSB7XG5cblxuICAgIGNvbnNvbGUubG9nKFwiLS0gdGVzdCAtLVwiKVxuXG4gICAgbGV0IHNlYyA9IGxoMShcIlRlc3QgSGVhZGluZyAxXCIpXG4gICAgbChpbXAoXCJBdXRvIFNlYyAtIFRoaXMgaXMgc29tZXRoaW5nIGltcG9ydGFudFwiKSlcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIDFcIilcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIDJcIilcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIElORk86IFwiICsgaW1wKFwiVGhpcyBpcyBzb21ldGhpbmcgaW1wb3J0YW50XCIpKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgV0lUSCBBRERJVElOQUwgSU5GTzogXCIgKyBpbXAoXCJUaGlzIGlzIHNvbWV0aGluZyBpbXBvcnRhbnRcIikgKyBcIiBhbmQgdGhpcyBpcyBzb21lIGFkZGl0aW9uYWwgaW5mb1wiKVxuICAgIGwoXCJBdXRvIFNlYyAtIFRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiYWZ0ZXIgYXV0byBzZWMgVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuICAgIHNlYyA9IHNlYy5saDIoXCJIZWFkaW5nIDJcIilcbiAgICBzZWMubChcIlRlc3RcIilcbiAgICBzZWMubChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuXG4gICAgc2VjID0gc2VjLmxoMyhcIkhlYWQgM1wiKVxuICAgIGwoXCJUZXN0XCIpXG4gICAgbChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuICAgIGNsZWFyU2VjKCk7XG4gICAgbChcIlRlc3QgQ2xlYXIgU2VjXCIpXG4gICAgbChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuXG5cbiAgICBsKFwiVGVzdCBKU09OOlwiLCBleGFtcGxlSlNvbik7XG5cbn1cblxuLy8gcnVuVGVzdCgpXG5jbGVhclNlYygpO1xuXG4vLyBleHBvcnQge2NvbG9yc307XG4iLCJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0TGluZU51bWJlckZyb21TdGFjayhzdGFjazogc3RyaW5nIHwgdW5kZWZpbmVkKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgaWYgKCFzdGFjaykgcmV0dXJuIG51bGw7XG4gICAgLy8gRXh0cmFjdCBsaW5lcyBmcm9tIHN0YWNrXG4gICAgY29uc3Qgc3RhY2tMaW5lcyA9IHN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAvLyBGaW5kIHRoZSBsaW5lIHdpdGggdGhlIGVycm9yICh1c3VhbGx5IHRoZSBzZWNvbmQgbGluZSlcbiAgICBjb25zdCBlcnJvckxpbmUgPSBzdGFja0xpbmVzWzFdIHx8ICcnO1xuICAgIC8vIEV4dHJhY3QgbGluZSBudW1iZXIgZnJvbSB0aGUgZXJyb3IgbGluZSB1c2luZyByZWdleFxuICAgIGNvbnN0IG1hdGNoID0gZXJyb3JMaW5lLm1hdGNoKC86KFxcZCspOihcXGQrKSQvKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBwYXJzZUludChtYXRjaFsxXSkgOiBudWxsO1xuICB9XG4gIFxuIGV4cG9ydCBmdW5jdGlvbiBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrKHN0YWNrOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoIXN0YWNrKSByZXR1cm4gbnVsbDtcbiAgICAvLyBFeHRyYWN0IGxpbmVzIGZyb20gc3RhY2tcbiAgICBjb25zdCBzdGFja0xpbmVzID0gc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIC8vIEZpbmQgdGhlIGxpbmUgd2l0aCB0aGUgY2FsbGVyIGZ1bmN0aW9uICh1c3VhbGx5IHRoZSB0aGlyZCBsaW5lKVxuICAgIGNvbnN0IGNhbGxlckxpbmUgPSBzdGFja0xpbmVzWzJdIHx8ICcnO1xuICAgIC8vIEV4dHJhY3QgY2FsbGVyIGZ1bmN0aW9uIG5hbWUgdXNpbmcgcmVnZXhcbiAgICBjb25zdCBtYXRjaCA9IGNhbGxlckxpbmUubWF0Y2goL2F0IChbXFx3Ljw+XSspLyk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBudWxsO1xuICB9IiwiXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hhcmVEb0V2ZW50IHtcbiAgICBldmVudFBhdGg6IHN0cmluZztcbiAgICBldmVudE5hbWU6IHN0cmluZztcbiAgICBzb3VyY2U6IGFueTtcbiAgICBkYXRhOiBhbnk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVFdmVudChldmVudDpTaGFyZURvRXZlbnQpIHtcblxuICAgICR1aS5ldmVudHMuYnJvYWRjYXN0KGV2ZW50LmV2ZW50UGF0aCwgZXZlbnQpO1xufSIsImltcG9ydCB7IGwsIGluZiwgZXJyIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Mb2dcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0clRvQ2xhc3MoY2xhc3NOYW1lOnN0cmluZywgYmFzZTphbnkpIHtcbiAgICBjb25zdCBjbGFzc1BhcnRzID0gY2xhc3NOYW1lLnNwbGl0KCcuJyk7XG4gICAgbGV0IGNsYXNzUmVmZXJlbmNlID0gYmFzZTtcblxuICAgIGZvciAoY29uc3QgcGFydCBvZiBjbGFzc1BhcnRzKSB7XG4gICAgICAgIGlmKCFjbGFzc1JlZmVyZW5jZVtwYXJ0XSkgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY2xhc3NSZWZlcmVuY2UgPSBjbGFzc1JlZmVyZW5jZVtwYXJ0XTtcbiAgICB9OyBcbiAgICByZXR1cm4gY2xhc3NSZWZlcmVuY2U7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEFsbEZpZWxkc1RvTnVsbChtb2RlbDphbnkpIHtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG1vZGVsKTtcbiAgICBrZXlzLmZvckVhY2goKGtleTogYW55KSA9PiB7XG4gICAgICAgIG1vZGVsW2tleV0gPSBudWxsO1xuICAgIH0pO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuT2JqZWN0KG9iOiBhbnkpIHtcbiAgICB2YXIgdG9SZXR1cm46IGFueSA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSBpbiBvYikge1xuICAgICAgICBpZiAoIW9iLmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZTtcblxuICAgICAgICBpZiAoKHR5cGVvZiBvYltpXSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhciBmbGF0T2JqZWN0ID0gZmxhdHRlbk9iamVjdChvYltpXSk7XG4gICAgICAgICAgICBmb3IgKHZhciB4IGluIGZsYXRPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZsYXRPYmplY3QuaGFzT3duUHJvcGVydHkoeCkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgdG9SZXR1cm5baSArICcuJyArIHhdID0gZmxhdE9iamVjdFt4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvUmV0dXJuW2ldID0gb2JbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvUmV0dXJuO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICBpZiAoIWN1cnJlbnRbcHJvcF0pIHtcbiAgICAgICAgICAgIGN1cnJlbnRbcHJvcF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcbiAgICB9XG4gICAgY3VycmVudFtwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoIC0gMV1dID0gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcpOiBhbnkge1xuICAgIGwoaW5mKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pYCksb2JqKTtcbiAgICBcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcGVydGllcykge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcHJvcGVydHkgaGFzIGFuIGFycmF5IGluZGV4LCBlLmcuLCBcImRhdGFbMF1cIlxuICAgICAgICBjb25zdCBtYXRjaGVzID0gcHJvcC5tYXRjaCgvXihbYS16QS1aMC05X10rKVxcWyhbMC05XSspXFxdJC8pO1xuXG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJheVByb3AgPSBtYXRjaGVzWzFdO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChtYXRjaGVzWzJdLCAxMCk7XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjdXJyZW50W2FycmF5UHJvcF0pIHx8IGN1cnJlbnRbYXJyYXlQcm9wXVtpbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGwoZXJyKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pOiBhcnJheVByb3Agb3IgaW5kZXggaXMgdW5kZWZpbmVkYCksb2JqKVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W2FycmF5UHJvcF1baW5kZXhdO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRbcHJvcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbChlcnIoYGdldE5lc3RlZFByb3BlcnR5KCR7cHJvcGVydHlQYXRofSk6IHByb3AgaXMgdW5kZWZpbmVkYCksb2JqKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG59XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSB0ZW1wb3JhcnkgYW5kIHdpbGwgYmUgcmVtb3ZlZCBvbmNlIHRoZSB0eXBlc2NyaXB0IHR5cGluZyBhcmUgZml4ZWRcbiAgICAgKiBXaGF0IGlzIGRvZXMgaXMgY2hlY2sgaWYgdGhlIHBhc3NlZCBpbiBvYmplY3QgaXMgYSBrbm9ja291dCBvYnNlcnZhYmxlIGFuZCBpZiBpdCBpcyBpdCByZXR1cm5zIHRoZSB2YWx1ZVxuICAgICAqIEBwYXJhbSBrb09iamVjdCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVGcm9tS09PYmplY3Q8VD4oa29PYmplY3Q6IGFueSkge1xuICAgICAgICBpZih0eXBlb2Yga29PYmplY3QgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGtvT2JqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtvT2JqZWN0XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGd2a28oa29PYmplY3Q6IGFueSk6IGFueSB7XG4gICAgICAgIHJldHVybiBnZXRWYWx1ZUZyb21LT09iamVjdChrb09iamVjdCk7XG4gICAgfSIsIlxuLyoqXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgdGhlIGFwaSBjYWxscyB0byB0aGUgYmFja2VuZC5cbiAqIHV0aWxpc2luZyB0aGUgYXhpb3MgbGlicmFyeSB0byBtYWtlIHRoZSBjYWxscy5cbiAqIGluY2x1c2luZyBvZiB3ZWJwYWNrSWdub3JlIGlzIHRvIGFsbG93IHRoZSB3ZWJwYWNrIHRvIGlnbm9yZSB0aGUgY2FsbHMgYW5kIG5vdCB0cnkgdG8gYnVuZGxlIHRoZW0uXG4gKi9cblxuaW1wb3J0IHsgZXJyLCBpbmYsIGwsIGxoMSwgc2VjQmFja09uZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vTG9nXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlUG9zdDxUPihhcGk6IHN0cmluZywgcG9zdEJvZHk6IGFueSk6IFByb21pc2U8VD4ge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LnBvc3QoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpLCBwb3N0Qm9keSk7XG4gICAgcmV0dXJuIChhd2FpdCBleGVjdXRlRmV0Y2g8VD4oYXBpLCBcIlBPU1RcIiwgcG9zdEJvZHkpKS5kYXRhO1xufVxuXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldDxUPihhcGk6IHN0cmluZykgOiBQcm9taXNlPFQ+e1xuLy8gICAgIHJldHVybiBhd2FpdCAkYWpheC5nZXQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpKTtcbi8vIH0gXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlR2V0PFQ+KGFwaTogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIChhd2FpdCBleGVjdXRlRmV0Y2g8VD4oYXBpLCBcIkdFVFwiLCB1bmRlZmluZWQpKS5kYXRhO1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlR2V0djI8VD4oYXBpOiBzdHJpbmcpe1xuICAgIHJldHVybiAgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJHRVRcIiwgdW5kZWZpbmVkKTtcbn1cblxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlUHV0PFQ+KGFwaTogc3RyaW5nLCBwb3N0Qm9keTogYW55KTogUHJvbWlzZTxUPiB7XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXgucHV0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJQVVRcIiwgcG9zdEJvZHkpKS5kYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZURlbGV0ZTxUPihhcGk6IHN0cmluZyk6IFByb21pc2U8VD4ge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LmRlbGV0ZSgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSkpO1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJERUxFVEVcIiwgdW5kZWZpbmVkKSkuZGF0YTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVBcGkoYXBpOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBsb2NhdGlvbiA9IHdpbmRvdy5kb2N1bWVudC5sb2NhdGlvbi5vcmlnaW47XG5cbiAgICAvL2lmIGFwaSBkb2VzIG5vdCBpbmNsdWRlIHRoZSBsb2NhdGlvbiB0aGVuIGFkZCBpdC5cbiAgICBpZiAoYXBpLmluZGV4T2YobG9jYXRpb24pID09PSAtMSkge1xuICAgICAgICAvL2NoZWNrIGlmIGFwaSBzdGFydCB3aXRoIGEgLyBpZiBub3QgYWRkIGl0LlxuICAgICAgICBpZiAoYXBpLmluZGV4T2YoXCIvXCIpICE9PSAwKSB7XG4gICAgICAgICAgICBhcGkgPSBcIi9cIiArIGFwaTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwaSA9IGxvY2F0aW9uICsgYXBpO1xuICAgIH1cbiAgICByZXR1cm4gYXBpO1xuXG59XG5cbmV4cG9ydCB0eXBlIFRFeGVjdXRlRmV0Y2hSZXNwb25zZSA9XG4gICAge1xuICAgICAgICBkYXRhOiBhbnkgfCB1bmRlZmluZWQsXG4gICAgICAgIHJlc3BvbnNlOiBSZXNwb25zZSB8IHVuZGVmaW5lZCxcbiAgICAgICAgaW5mbzpcbiAgICAgICAge1xuICAgICAgICAgICAgc3VjY2VzczogYm9vbGVhbixcbiAgICAgICAgICAgIGVycm9yOiBBcnJheTxUVXNlckVycm9ycz5cbiAgICAgICAgfVxuICAgIH1cblxuZXhwb3J0IHR5cGUgVFVzZXJFcnJvcnMgPVxuICAgIHtcbiAgICAgICAgY29kZTogc3RyaW5nLFxuICAgICAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgICAgIHVzZXJNZXNzYWdlOiBzdHJpbmcsXG4gICAgICAgIHN1Z2dlc3Rpb25zPzogQXJyYXk8c3RyaW5nPlxuICAgICAgICBpbnRlcm5hbFN1Z2dlc3Rpb25zPzogQXJyYXk8c3RyaW5nPlxuICAgICAgICBhY3Rpb25zPzogQXJyYXk8c3RyaW5nPlxuICAgICAgICBlcnJvclN0YWNrPzogc3RyaW5nLFxuICAgICAgICBhZGRpdGlvbmFsSW5mbz86IGFueVxuICAgIH1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVGZXRjaDxUPihhcGk6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGRhdGE6IGFueSwgcmV0cnlDb3VudGVyPzpudW1iZXIpOiBQcm9taXNlPFRFeGVjdXRlRmV0Y2hSZXNwb25zZT4ge1xuICAgIGxldCByZXRWYWx1ZTogVEV4ZWN1dGVGZXRjaFJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiB1bmRlZmluZWQsXG4gICAgICAgIHJlc3BvbnNlOiB1bmRlZmluZWQsXG4gICAgICAgIGluZm86IHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IFtdXG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIC8vdG8gZ2V0IG5ldyB0b2tlbiBUT0RPOiBjaGVjayBpZiBmYWlsIHRoZW4gY2FsbFxuICAgIC8vIGF3YWl0ICRhamF4LmdldChcImh0dHBzOi8vaHNmLXZuZXh0LnNoYXJlZG8uY28udWsvc2VjdXJpdHkvcmVmcmVzaFRva2Vucz9fPVwiICsgRGF0ZS5ub3cpO1xuXG4gICAgXG5cbiAgICBsZXQgdXJsID0gdmFsaWRhdGVBcGkoYXBpKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gYnVpbGRIZWFkZXJzKCk7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBmZXRjaEhlYWRlcnMsXG4gICAgICAgIGJvZHk6IGRhdGEgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IHVuZGVmaW5lZFxuICAgIH1cbiAgICApLnRoZW4oYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldFZhbHVlLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIGlmIChyZXNwb25zZS5vayA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKXtcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50ZXIgPSByZXRyeUNvdW50ZXIgfHwgMTtcbiAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50ZXIgPiAzKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFwiQVBJX0VSUk9SXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJIGFmdGVyIDMgYXR0ZW1wdHMuIHN0YXR1c1RleHQ6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlck1lc3NhZ2U6IFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJLlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB1bmRlZmluZWQsIHJlc3BvbnNlIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGF3YWl0ICRhamF4LmdldChcImh0dHBzOi8vaHNmLXZuZXh0LnNoYXJlZG8uY28udWsvc2VjdXJpdHkvcmVmcmVzaFRva2Vucz9fPVwiICsgRGF0ZS5ub3cpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBleGVjdXRlRmV0Y2g8VD4oYXBpLCBtZXRob2QsIGRhdGEscmV0cnlDb3VudGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2RlOiBcIkFQSV9FUlJPUlwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBjYWxsIHRoZSBBUEkuIHN0YXR1c1RleHQ6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gLFxuICAgICAgICAgICAgICAgIHVzZXJNZXNzYWdlOiBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNhbGwgdGhlIEFQSS5cIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzcG9uc2VEYXRhO1xuICAgICAgICAvL2NoZWNrIGlmIHJlc3BvbnNlIGlzIEpTT05cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKT8uaW5jbHVkZXMoXCJhcHBsaWNhdGlvbi9qc29uXCIpKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5zdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZTogYW55KSB7XG4gICAgICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvZGU6IFwiQVBJX0VSUk9SXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGV4dHJhY3QgdGhlIGRhdGEgZnJvbSB0aGUgQVBJLiBNZXNzYWdlOiAke2U/Lm1lc3NhZ2UgfHwgXCJVbmtub3duXCJ9YCxcbiAgICAgICAgICAgICAgICB1c2VyTWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGV4dHJhY3QgdGhlIGRhdGEgZnJvbSB0aGUgQVBJLmBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRhdGE6IHJlc3BvbnNlRGF0YSwgcmVzcG9uc2UgfTtcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgbChlcnIoYEVycm9yIGZyb20gQVBJIENhbGwgJHt1cmx9YCksIGVycm9yKTtcblxuICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLnB1c2goe1xuICAgICAgICAgICAgY29kZTogXCJBUElfRVJST1JcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICB1c2VyTWVzc2FnZTogZXJyb3IubWVzc2FnZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4geyBkYXRhOiB1bmRlZmluZWQsIHJlc3BvbnNlOiB1bmRlZmluZWQgfTtcbiAgICB9KVxuXG4gICAgbGgxKGBSZXNwb25zZSBmcm9tICR7dXJsfWApO1xuICAgIGwocmVzcG9uc2UpO1xuXG4gICAgcmV0VmFsdWUuZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICBpZihyZXRWYWx1ZS5pbmZvLmVycm9yLmxlbmd0aCA+IDApe1xuICAgICAgICByZXRWYWx1ZS5pbmZvLnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgICAgbChlcnIoYEVycm9yIGZyb20gQVBJIENhbGwgJHt1cmx9YCksIGUpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNlY0JhY2tPbmUoKTtcblxuICAgIHJldHVybiByZXRWYWx1ZTtcbn1cblxuZnVuY3Rpb24gYnVpbGRIZWFkZXJzKCkge1xuICAgIGxldCBiZWFyZXIgPSBnZXRCZWFyZXJUb2tlbigpO1xuICAgIGxldCBmZXRjaEhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGZldGNoSGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIGlmIChiZWFyZXIpIHtcbiAgICAgICAgZmV0Y2hIZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgYmVhcmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoSGVhZGVycztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29va2llcygpOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcbiAgICBsZXQgcmV0VmFsdWU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgICBsZXQgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIikucmVkdWNlKGZ1bmN0aW9uIChjb29raWVzLCBjb29raWUpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gY29va2llLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhcnRzWzBdLnRyaW0oKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzWzFdO1xuXG4gICAgICAgICAgICByZXRWYWx1ZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvb2tpZXM7XG4gICAgfSwge30pO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJlYXJlclRva2VuKCkge1xuICAgIHZhciBjb29raWVzID0gZ2V0Q29va2llcygpO1xuICAgIHZhciB0b2tlbiA9IGNvb2tpZXNbXCJfYXBpXCJdO1xuXG4gICAgaWYgKHRva2VuKSByZXR1cm4gXCJCZWFyZXIgXCIgKyB0b2tlbjtcbiAgICByZXR1cm4gbnVsbDtcbn07IiwiaW1wb3J0IHsgZXhlY3V0ZVBvc3QgfSBmcm9tIFwiLi4vYXBpXCI7XG5pbXBvcnQgeyBJRmluZEJ5UXVlcnlPcHRpb25zIH0gZnJvbSBcIi4vSUZpbmRCeVF1ZXJ5SW5wdXRcIjtcbmltcG9ydCB7IElGaW5kQnlRdWVyeVJlc3VsdCB9IGZyb20gXCIuL0lGaW5kQnlRdWVyeVJlc3VsdFwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlRmluZEJ5UXVlcnk8VD4oaW5wdXRPcHRpb246IElGaW5kQnlRdWVyeU9wdGlvbnMpOiBQcm9taXNlPElGaW5kQnlRdWVyeVJlc3VsdDxUPj5cbntcbiAgICByZXR1cm4gZXhlY3V0ZVBvc3Q8SUZpbmRCeVF1ZXJ5UmVzdWx0PFQ+PihcIi9hcGkvdjEvcHVibGljL3dvcmtJdGVtL2ZpbmRCeVF1ZXJ5XCIsIGlucHV0T3B0aW9uKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbn0iLCJpbXBvcnQgeyBleGVjdXRlRmluZEJ5UXVlcnkgfSBmcm9tIFwiLi9leGVjdXRlRmluZEJ5UXVlcnkvRmluZEJ5UXVlcnlcIjtcblxuZXhwb3J0IGludGVyZmFjZSBzZWFyY2hSZXN1bHQgXG57XG4gICAgZm91bmQ6Ym9vbGVhbiwgXG4gICAgdmFsdWU6c3RyaW5nIHwgdW5kZWZpbmVkLCBcbiAgICBwYXJlbnRJZDpzdHJpbmcgfCB1bmRlZmluZWRcbiAgICBkZXB0aDpudW1iZXIsXG4gICAgZm91bmRJbldvcmtJdGVtSWQ6c3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHdhc0ZvdW5kSW5BbmNlc3Rvcjpib29sZWFuLFxuICAgIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6c3RyaW5nIHwgdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUod29ya0l0ZW1JZDogc3RyaW5nLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIHBhcmVudHM6IGJvb2xlYW4sIG1heERlcHRoPzogbnVtYmVyIHwgdW5kZWZpbmVkKVxuIHtcbiAgICBsZXQgdXNlTWF4RGVwdGggOiBib29sZWFuID0gbWF4RGVwdGggPyB0cnVlIDogZmFsc2U7XG4gICAgaWYobWF4RGVwdGggJiYgbWF4RGVwdGggPiAwKXtcbiAgICAgICAgdXNlTWF4RGVwdGggPSB0cnVlO1xuICAgIH1cblxuXG4gICAgbGV0IHJldFZhbHVlOnNlYXJjaFJlc3VsdCA9IHtmb3VuZDpmYWxzZSwgdmFsdWU6dW5kZWZpbmVkLCBwYXJlbnRJZDp1bmRlZmluZWQsIGRlcHRoOjAsIGZvdW5kSW5Xb3JrSXRlbUlkOnVuZGVmaW5lZCwgd2FzRm91bmRJbkFuY2VzdG9yOmZhbHNlLCBmb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lOnVuZGVmaW5lZH07XG5cbiAgICByZXRWYWx1ZSA9IGF3YWl0IHNlYXJjaEZvckF0dHJpYnV0ZSh3b3JrSXRlbUlkLCBhdHRyaWJ1dGVOYW1lKTtcblxuICAgIGlmKHJldFZhbHVlLmZvdW5kKXtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIH1cblxuICAgIGlmKCFwYXJlbnRzICl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcGFyZW50cyBvciBjaGlsZHJlbiB0byBzZWFyY2ggc28gb25seSBzZWFyY2hpbmcgY3VycmVudCB3b3JrIGl0ZW1cIik7XG4gICAgICAgIHJldHVybiByZXRWYWx1ZVxuICAgIH1cblxuICAgIGlmKHBhcmVudHMpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaGluZyBwYXJlbnRzXCIpO1xuICAgICAgICBsZXQgZGVwdGggPSAwO1xuICAgICAgICBsZXQgc2VhcmNoUGFyZW50ID0gYXN5bmMgKHBhcmVudElkOiBzdHJpbmcgfCB1bmRlZmluZWQpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlcHRoKys7XG4gICAgICAgICAgICBsZXQgcjogc2VhcmNoUmVzdWx0ID0ge2ZvdW5kOmZhbHNlLFxuICAgICAgICAgICAgICAgICB2YWx1ZTp1bmRlZmluZWQsIFxuICAgICAgICAgICAgICAgICBwYXJlbnRJZDp1bmRlZmluZWQsIGRlcHRoOmRlcHRoLCAvL2RlcHRoIGhlcmUgd2lsbCBiZSBvdmVycmlkZW4gaWYgdGhlcmUgaXMgYSBwYXJlbnRcbiAgICAgICAgICAgICAgICAgZm91bmRJbldvcmtJdGVtSWQ6dW5kZWZpbmVkLCBcbiAgICAgICAgICAgICAgICAgd2FzRm91bmRJbkFuY2VzdG9yOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBmb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lOnVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZighcGFyZW50SWQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcGFyZW50IGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgciA9IGF3YWl0IHNlYXJjaEZvckF0dHJpYnV0ZShwYXJlbnRJZCwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICAgci5kZXB0aCA9IGRlcHRoOyAvL3VwZGF0ZSBkZXB0aCBhcyBpdCB3aWxsIGJlIDBcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHIuZm91bmQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRm91bmQgYXR0cmlidXRlIGluIHBhcmVudFwiKTtcbiAgICAgICAgICAgICAgICByLndhc0ZvdW5kSW5BbmNlc3RvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgaWYodXNlTWF4RGVwdGggJiYgZGVwdGggPj0gbWF4RGVwdGghKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJNYXggZGVwdGggcmVhY2hlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgaWYoIXIucGFyZW50SWQpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHBhcmVudCBmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGZvdW5kIGluIHBhcmVudFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VhcmNoUGFyZW50KHIucGFyZW50SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0VmFsdWUgPSBhd2FpdCBzZWFyY2hQYXJlbnQocmV0VmFsdWUucGFyZW50SWQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXRWYWx1ZTtcblxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hGb3JBdHRyaWJ1dGUod29ya0l0ZW1JZDogc3RyaW5nLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpIHtcbiAgICAvL2dldCB0aGUgbWF0dGVyXG4gICAgbGV0IHJldFZhbHVlIDpzZWFyY2hSZXN1bHQgPSB7XG4gICAgICAgIGZvdW5kOmZhbHNlLCB2YWx1ZTp1bmRlZmluZWQsXG4gICAgICAgICBwYXJlbnRJZDp1bmRlZmluZWQsIGRlcHRoOjAsXG4gICAgICAgICAgZm91bmRJbldvcmtJdGVtSWQ6dW5kZWZpbmVkLFxuICAgICAgICAgICB3YXNGb3VuZEluQW5jZXN0b3I6ZmFsc2UsXG4gICAgICAgICAgIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6dW5kZWZpbmVkfTtcbiAgICBsZXQgcmVxID0ge1xuICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIndvcmtJdGVtSWRzXCI6IFtcbiAgICAgICAgICAgICAgICB3b3JrSXRlbUlkXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiZW5yaWNoXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogXCJ0aXRsZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInBhcmVudC5pZFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInR5cGUuc3lzdGVtTmFtZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInJlZmVyZW5jZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBhdHRyaWJ1dGVOYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2hpbmcgdXNpbmcgU2hhcmVEbyBJZDogXCIgKyB3b3JrSXRlbUlkKTtcbiAgICBsZXQgaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5ID0gYXdhaXQgZXhlY3V0ZUZpbmRCeVF1ZXJ5PGFueT4ocmVxKTtcbiAgICBjb25zb2xlLmxvZyhgV29yayBpdGVtICR7d29ya0l0ZW1JZH0gZm91bmRgKTtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0cykpO1xuXG5cbiAgICBsZXQgdHlwZVN5c3RlbU5hbWUgPSBodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0c1swXS5kYXRhW1widHlwZS5zeXN0ZW1OYW1lXCJdO1xuICAgIGxldCBwYXJlbnRJZCA9ICAgICAgIGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzWzBdLmRhdGFbXCJwYXJlbnQuaWRcIl07XG4gICAgbGV0IGF0dHJpYnV0ZSA9ICAgICAgaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5LnJlc3VsdHNbMF0uZGF0YVthdHRyaWJ1dGVOYW1lXSBhcyBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgXG4gICAgY29uc29sZS5sb2coYFR5cGUgc3lzdGVtIG5hbWUgaXMgJHt0eXBlU3lzdGVtTmFtZX1gKTtcbiAgICBjb25zb2xlLmxvZyhgUGFyZW50IElkIGlzICR7cGFyZW50SWR9YCk7XG4gICAgY29uc29sZS5sb2coYEF0dHJpYnV0ZSBbJHthdHRyaWJ1dGVOYW1lfV0gaXMgJHthdHRyaWJ1dGV9YCk7XG5cbiAgICByZXRWYWx1ZS52YWx1ZSA9IGF0dHJpYnV0ZTtcbiAgICBpZihhdHRyaWJ1dGUpe1xuICAgICAgICByZXRWYWx1ZS5mb3VuZCA9IHRydWU7XG4gICAgICAgIHJldFZhbHVlLmZvdW5kSW5Xb3JrSXRlbUlkID0gd29ya0l0ZW1JZDtcbiAgICAgICAgcmV0VmFsdWUuZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZSA9IHR5cGVTeXN0ZW1OYW1lO1xuICAgIH1cbiAgICByZXRWYWx1ZS5wYXJlbnRJZCA9IHBhcmVudElkO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIFxufSIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xuaW1wb3J0IHsgSVNoYXJlZG9CbGFkZU1vZGVsLCBUU2hhcmVEb0JsYWRlLCBJQ29uZmlndXJhdGlvbkhvc3QgfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9TaGFyZWRvQXNwZWN0TW9kZWxzXCI7XG5pbXBvcnQgeyBJRGVidWcsIE9ic2VydmFibGVJRGVidWcgfSBmcm9tIFwiLi9JRGVidWdcIjtcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB7IFRTaGFyZWRvIH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvVFNoYXJlZG9cIjtcbmltcG9ydCB7IEV2ZW50VG9SZWFjdFRvLCBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnLCBJV2lkZ2V0SnNvbiwgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9JV2lkZ2V0SnNvblwiO1xuaW1wb3J0IHsgU2hhcmVEb0V2ZW50LCBmaXJlRXZlbnQgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0V2ZW50c0hlbHBlclwiO1xuaW1wb3J0IHsgY2xlYXJTZWMsIGVyciwgaW5mLCBsLCBsaDEsIG52LCB3cm4gfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0xvZ1wiXG5pbXBvcnQgeyBJRm9ybUJ1aWxkZXJEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvQXNwZWN0L0lGb3JtQnVpbGRlclwiO1xuaW1wb3J0IHsgVFVzZXJFcnJvcnMgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9hcGlcIjtcbmltcG9ydCB7IE5lc3RlZE9ic2VydmFibGVPYmplY3QsIHRvT2JzZXJ2YWJsZU9iamVjdCB9IGZyb20gXCIuL0tPQ29udmVydGVyXCI7XG5pbXBvcnQgeyBnZXROZXN0ZWRQcm9wZXJ0eSwgZ3Zrbywgc2V0TmVzdGVkUHJvcGVydHksIHN0clRvQ2xhc3MgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL09iamVjdEhlbHBlclwiO1xuaW1wb3J0IHsgZXNjYXBlSHRtbCB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vSHRtbEhlbHBlclwiO1xuaW1wb3J0IHsgSnNvblRvSHRtbENvbnZlcnRlciB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vSnNvblRvSFRNTENvbnZlcnRlclwiO1xuaW1wb3J0IHsgc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9hcGkvc2VhcmNoRm9yQXR0cmlidXRlV2l0aFBhcmVudHNcIjtcbmltcG9ydCB7IERFQlVHX0RFRkFVTFQgfSBmcm9tIFwiLi9EZWJ1Z0RlZmF1bHRzXCI7XG5pbXBvcnQgeyBmb3JFYWNoIH0gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IGNvbG9yIGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCJqcXVlcnlcIjtcblxuXG5jb25zb2xlLmxvZyhcInY6IC0gMy4yOVwiKVxuXG5leHBvcnQgY29uc3QgRk9NUl9CVUlMREVSX1BBVEhfU1RSSU5HID0gXCJhc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhXCI7XG5leHBvcnQgY29uc3QgRVJST1JfRElWX1NFTEVDVE9SID0gXCIjcmVuZGVyLWVycm9ycy1oZXJlXCI7XG5cblxuaW50ZXJmYWNlIElERUFzcGVjdENvbmZpZ3VyYXRpb24ge1xuICAgIG1vZGVsOiBJU2hhcmVkb0JsYWRlTW9kZWw7XG4gICAgYmxhZGU6IFRTaGFyZURvQmxhZGU7XG59XG5cbnR5cGUgT2JzZXJ2YWJsZWlmeTxUPiA9IHtcbiAgICBbUCBpbiBrZXlvZiBUXToga28uT2JzZXJ2YWJsZTxUW1BdPjtcbn07XG5cbmV4cG9ydCB0eXBlIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczI8VENvbmZpZz4gPVxuICAgIHsgW0sgaW4ga2V5b2YgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+XToga28uT2JzZXJ2YWJsZTxJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5bS10+OyB9XG5cblxuZXhwb3J0IHR5cGUgT2JzZXJ2YWJsZVNoYXJlZG9Db25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPiA9IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz4+XG5cbmV4cG9ydCB0eXBlIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPiA9IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxUQ29uZmlnPj5cblxuXG5cbi8vIGV4cG9ydCB0eXBlIElPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSAge2RlYnVnOiBrby5PYnNlcnZhYmxlPE9ic2VydmFibGVJRGVidWc+fSAmXG4vLyB7XG4vLyAgICAgW0sgaW4ga2V5b2YgVENvbmZpZ106IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VENvbmZpZz5bS107XG5cbi8vIH1cblxuZXhwb3J0IHR5cGUgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+ID0gSUNvbmZpZ3VyYXRpb25Ib3N0ICYgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz47XG4vLyBhYnN0cmFjdCBjbGFzcyBDcmVhdG9yPFRDb25maWc+IHtcbi8vICAgICBwdWJsaWMgYWJzdHJhY3QgRmFjdG9yeU1ldGhvZChlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+LCBiYXNlTW9kZWw6IGFueSk6IGFueTtcbi8vIH1cblxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1CdWlsZGVyRmllbGRQYXRoKGZvcm1CdWlsZGVyRmllbGQ6IHN0cmluZykge1xuICAgIHJldHVybiBgJHtGT01SX0JVSUxERVJfUEFUSF9TVFJJTkd9LiR7Zm9ybUJ1aWxkZXJGaWVsZH1gO1xufVxuXG50eXBlIE9ic2VydmFibGVQZXJzb248VENvbmZpZz4gPSBPYnNlcnZhYmxlaWZ5PElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPj47XG5cbmludGVyZmFjZSBJTW9kZWwge1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VJREVBc3BlY3Q8VENvbmZpZywgVFBlcnNpdGFuY2U+ICB7XG4gICAgX2RhdGE6IGFueTsgLy9ub24gbW9kZWwgZGF0YSBzdG9yYWdlXG4gICAgb3JpZ2luYWxDb25maWd1cmF0aW9uITogSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz47XG4gICAgY29uZmlndXJhdGlvbjogSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxUQ29uZmlnPiB8IHVuZGVmaW5lZDtcbiAgICBzaGFyZWRvQ29uZmlndXJhdGlvbiE6IElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbiAgICBkZWZhdWx0czogSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxUQ29uZmlnPiB8IHVuZGVmaW5lZDtcbiAgICBlbGVtZW50ITogSFRNTEVsZW1lbnQ7XG4gICAgbW9kZWw6IElNb2RlbCB8IHVuZGVmaW5lZDtcbiAgICAvLyBlbmFibGVkITogYm9vbGVhbjtcbiAgICBibGFkZTogVFNoYXJlRG9CbGFkZSB8IHVuZGVmaW5lZDtcbiAgICBsb2FkZWQhOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIHNoYXJlZG9JZCE6IGtvLk9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPjtcbiAgICBwYXJlbnRTaGFyZWRvSWQhOiBrby5PYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gICAgc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIToga28uT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuICAgIHBoYXNlTmFtZSE6IGtvLk9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPjtcbiAgICBwaGFzZUlzT3BlbiE6IGtvLk9ic2VydmFibGU8Ym9vbGVhbiB8IHVuZGVmaW5lZD47XG4gICAgdmFsaWRhdGlvbjogYW55O1xuICAgIHZhbGlkYXRpb25FcnJvckNvdW50IToga28uT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIGJhc2VNb2RlbCE6IFRTaGFyZWRvPGFueT47XG4gICAgdGhpc0NvbXBvbmVudE5hbWUhOiBzdHJpbmc7XG4gICAgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhOiBzdHJpbmcgfCB1bmRlZmluZWQ7IC8vVGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbVxuICAgIHNoYXJlRG9PcHRpb25zITogT2JzZXJ2YWJsZVNoYXJlZG9Db25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPlxuICAgIF9zaGFyZURvT3B0aW9ucyE6IE9ic2VydmFibGVTaGFyZWRvQ29uZmlndXJhdGlvbk9wdGlvbnM8dW5rbm93bj4gLy91c2UgZm9yIHR5cGluZ3Mgb2YgdGhpcyBiYXNlIGlkZSBhcyBUQ29uZmlnIGNhdXNlZCBpc3N1ZVxuICAgIG9wdGlvbnM6IE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPFRDb25maWc+PiB8IHVuZGVmaW5lZFxuICAgIF9vcHRpb25zOiBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8SURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzx1bmtub3duPj4gfCB1bmRlZmluZWRcbiAgICB1bmlxdWVJZCE6IHN0cmluZztcbiAgICB3aWRnZXRTZXR0aW5ncyE6IElXaWRnZXRKc29uPFRDb25maWc+O1xuICAgIGFzcGVjdExvZ091dHB1dDogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgbGl2ZUNvbmZpZ0RpdjogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgbGl2ZUNvbmZpZ0RhdGE6IGFueTtcbiAgICBlcnJvckRpdlNlbGVjdG9yOiBzdHJpbmc7XG4gICAgZXJyb3JzOiBrby5PYnNlcnZhYmxlQXJyYXk8VFVzZXJFcnJvcnM+IHwgdW5kZWZpbmVkO1xuICAgIHJlZnJlc2hMb2c6IEFycmF5PGFueT47XG4gICAgbGFzdFJlZnJlc2g6IERhdGUgfCB1bmRlZmluZWQ7XG4gICAgZGlzcG9zYWJsZXM6IEFycmF5PGFueT47XG5cblxuXG5cblxuICAgIC8qKlxuICAgICAqIEJhc2UgQ29uc3RydWN0b3IgZm9yIGFsbCBJREVBc3BlY3RzLCBmb3JjZXMgdGhlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBsb2FkIGFuZCBzYXZlIG1ldGhvZHNcbiAgICAgKiBAcGFyYW0gY29tcG9uZW50TmFtZSAvL1RoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgZS5nLiBBc3BlY3QuUXVpY2tWaWV3XG4gICAgICogQHBhcmFtIGxvYWRTYXZlTG9jYXRpb24gLy9UaGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tIGUuZy4gbW9kZWwuYXNwZWN0LkZvcm1CdWlsZGVyLmZvcm1EYXRhXG4gICAgICogQHBhcmFtIGVsZW1lbnQgLy9UaGUgZWxlbWVudCB0aGF0IHRoZSBhc3BlY3QgaXMgYm91bmQgdG9cbiAgICAgKiBAcGFyYW0gY29uZmlndXJhdGlvbiAvL1RoZSBjb25maWd1cmF0aW9uIHBhc3NlZCBpbiBmcm9tIHRoZSBibGFkZSBhbmQgdGhlIGRlc2lnbiB0aW1lIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0gYmFzZU1vZGVsIC8vVGhlIGJhc2UgbW9kZWwgcGFzc2VkIGluIGZyb20gdGhlIGJsYWRlXG4gICAgICogQHBhcmFtIGRlZmF1bHRzIC8vVGhlIGRlZmF1bHRzIHBhc3NlZCBpbiBmcm9tIHRoZSB3aWRnZXQgdG8gc2V0IGluY2FzZSBvZiBiYWQgY29uZmlndXJhdGlvbiBvciBtaXNzaW5nIGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpO1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBUQ29uZmlnLCBiYXNlTW9kZWw6IFRTaGFyZWRvPGFueT4pXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKC4uLmFycjogYW55W10pIHtcblxuICAgICAgICB0aGlzLndpZGdldFNldHRpbmdzID0gdGhpcy5zZXRXaWRnZXRKc29uU2V0dGluZ3MoKTtcbiAgICAgICAgdGhpcy50aGlzQ29tcG9uZW50TmFtZSA9IHRoaXMuc2V0VGhpc0NvbXBvbmVudE5hbWUoKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IHRoaXMuc2V0RGVmYXVsdHMoKTsgLy9zZXR1cCB0aGUgZGVmYXVsdCBieSBjYWxsaW5nIHRoZSBhYnN0cmFjdCBtZXRob2QgaW4gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5yZWZyZXNoTG9nID0gbmV3IEFycmF5PGFueT4oKVxuXG4gICAgICAgIHRoaXMuZXJyb3JEaXZTZWxlY3RvciA9IEVSUk9SX0RJVl9TRUxFQ1RPUjtcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBrby5vYnNlcnZhYmxlQXJyYXk8VFVzZXJFcnJvcnM+KCk7XG5cbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgYmFzZSBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgY29uc3RydWN0b3IgdGhhdCBpcyBjYWxsZWQgYnkgdGhlIElERVxuICAgICAgICAgICAgdGhpcy51bmlxdWVJZCA9IHV1aWQoKTtcblxuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGlzZShhcnJbMF0sIGFyclsxXSwgYXJyWzJdKTtcbiAgICAgICAgICAgIC8vIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gdGhpcy5zZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25TZXR1cFwiLCB0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUV2ZW50KFwiYWZ0ZXJTZXR1cFwiLCB0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBMaXZlQ29uZmlnKCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwRXZlbnRXYXRjaGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwRXJyb3JNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLmFkZEFzcGVjdExvZ091dHB1dCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBfaW5pdGlhbGlzZShlbGVtZW50OiBIVE1MRWxlbWVudCwgcG9sdXRlZENvbmZpZ3VyYXRpb246IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+LCBiYXNlTW9kZWw6IFRTaGFyZWRvPGFueT4pIHtcblxuICAgICAgICAvL2xldCBjb25maWd1cmF0aW9uID0gcG9sdXRlZENvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbjsgLy9Qb2x1dGVkIGFzIFNoYXJlZG8gYWRkZWQgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiB0byB0aHNpIG9iamVjdCBkZXBlbmRpbmcgb24gd2hlcmUgaXRzIGluc3RhbnNpYXRlZFxuICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uID0gcG9sdXRlZENvbmZpZ3VyYXRpb247XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIC8vU2hhcmVEbyBwYXNzZXMgdGhlIGNvbmZpZyBhcyB3ZWxsIGFzIG90aGVyIHN0dWZmLCBzbyB3ZSBuZWVkIHRvIGV4dHJhY3QgdGhlIGNvbmZpZ1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbiA9IHBvbHV0ZWRDb25maWd1cmF0aW9uXG4gICAgICAgIHRoaXMuYmFzZU1vZGVsID0gYmFzZU1vZGVsO1xuXG4gICAgICAgIC8vIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uXG5cbiAgICAgICAgLy8gbGV0IGJhc2VEZWZhdWx0czogSURlZmF1bHRDb25maWdTZXR0aW5nczxhbnk+ID0ge1xuICAgICAgICAvLyAgICAgZGVidWc6IHtcbiAgICAgICAgLy8gICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgLy8gICAgICAgICBsb2dUb0NvbnNvbGU6IGZhbHNlLFxuICAgICAgICAvLyAgICAgICAgIHNob3dJbkFzcGVjdDogZmFsc2UsXG4gICAgICAgIC8vICAgICAgICAgbGl2ZUNvbmZpZzogZmFsc2VcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vY2hlY2sgdGhhdCB3ZSBoYXZlIGEgc3ViIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgaWYgKCF0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBjb25maWd1cmF0aW9uIGZvdW5kIGluIHRoZSBzaGFyZWRvQ29uZmlndXJhdGlvbiAtIGNoZWNrIHRoZSBhc3BlY3Qgb3Igd2lkZ2V0IGNvbmZpZyB0aGF0IHRoZXIgZWlzIGEgYmFzZSBjb25maWd1cmF0aW9uIG9mIGNvbmZpZ3VyYXRpb246e31cIilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGNvbmZpZ3VyYXRpb24gZm91bmQgaW4gdGhlIHNoYXJlZG9Db25maWd1cmF0aW9uXCIpO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24uZGVidWcgPSAkLmV4dGVuZChERUJVR19ERUZBVUxUKCksIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbi5kZWJ1ZykgYXMgSURlYnVnOyAvL21ha2Ugc3VyZSBkZWJ1ZyBpcyBzZXQgb3IgdXNlIGRlZmF1bHRzXG4gICAgICAgIC8vIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uLmRlYnVnID0gJC5leHRlbmQoYmFzZURlZmF1bHRzLmRlYnVnLCB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbi5kZWJ1ZykgYXMgSURlYnVnO1xuICAgICAgICAvLyBjb25maWd1cmF0aW9uLmRlYnVnID0gJC5leHRlbmQoYmFzZURlZmF1bHRzLCBjb25maWd1cmF0aW9uLmRlYnVnKSBhcyBJRGVidWc7XG5cblxuICAgICAgICAvLyB0aGlzLmRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIE1lcmdlIHRoZSBjb25maWd1cmF0aW9uIHdpdGggdGhlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbiA9ICQuZXh0ZW5kKHRoaXMuZGVmYXVsdHMsIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24pXG5cblxuXG4gICAgICAgIC8vY3JlYXRlIGEgbmV3IG1vZGVsXG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbDtcbiAgICAgICAgLy8gdGhpcy5lbmFibGVkID0gdGhpcy5tb2RlbD8uY2FuRWRpdDtcbiAgICAgICAgdGhpcy5ibGFkZSA9IHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uX2hvc3Q/LmJsYWRlO1xuICAgICAgICB0aGlzLmxvYWRlZCA9IHRoaXMubG9hZGVkIHx8IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuICAgICAgICAvLyBNYXAgdGhlIGJhc2UgbW9kZWwgcHJvcGVydGllc1xuICAgICAgICB0aGlzLnNoYXJlZG9JZCA9IHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsLmlkIHx8ICR1aS5wYWdlQ29udGV4dD8uc2hhcmVkb0lkIHx8IGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgaWYgKCF0aGlzLnNoYXJlZG9JZCB8fCB0aGlzLnNoYXJlZG9JZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9JZCBmb3VuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lID0gdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWw/LnNoYXJlZG9UeXBlU3lzdGVtTmFtZSB8fCAkdWkucGFnZUNvbnRleHQ/LnNoYXJlZG9UeXBlTmFtZSB8fCBrby5vYnNlcnZhYmxlKHVuZGVmaW5lZCk7XG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUgfHwgIXRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIGZvdW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYXJlbnRTaGFyZWRvSWQgPSB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbD8ucGFyZW50U2hhcmVkb0lkIHx8IGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5waGFzZU5hbWUgPSB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbD8ucGhhc2VOYW1lIHx8ICR1aS5wYWdlQ29udGV4dD8ucGhhc2VOYW1lIHx8IGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5waGFzZUlzT3BlbiA9IHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsPy5waGFzZUlzT3BlbiB8fCAkdWkucGFnZUNvbnRleHQ/LnBoYXNlSXNPcGVuIHx8IGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgLy8gdGhpcy5zaGFyZURvT3B0aW9ucyA9IHRvT2JzZXJ2YWJsZU9iamVjdCh0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLCB0aGlzLnNoYXJlRG9PcHRpb25zKTtcbiAgICAgICAgLy8gdGhpcy5fc2hhcmVEb09wdGlvbnMgPSB0aGlzLnNoYXJlRG9PcHRpb25zIGFzIE9ic2VydmFibGVTaGFyZWRvQ29uZmlndXJhdGlvbk9wdGlvbnM8dW5rbm93bj5cblxuICAgICAgICAvLyBWYWxpZGF0aW9uXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHt9O1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvckNvdW50ID0gdGhpcy52YWxpZGF0aW9uRXJyb3JDb3VudCB8fCBrby5vYnNlcnZhYmxlKDApO1xuXG4gICAgICAgIHRoaXMuYXBwbHlDb21wb25lbnRDb25maWd1cmF0aW9uKHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbik7XG4gICAgICAgIC8vc2V0dXAgdGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbSBieSBjYWxsaW5nIHRoZSBhYnN0cmFjdCBtZXRob2QgaW4gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIC8vISAtLT4gTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhIDwtLSAtIHRoaXMgc2hvdWxkIGJlIGNhbGxlZCBhdCB0aGUgZW5kIG9mIHRoaXMgZnVuY3Rpb24gdG8gZW5zdXJlIHRoYXQgdGhlIG9wdGlvbnMgYW5kIGNvbmZpZ3VyYXRpb24gZGF0YSBpcyBhdmFpbGFiZWwgdG8gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gdGhpcy5zZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTsgXG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25Jbml0aWFsaXNlXCIsIHRoaXMubW9kZWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlDb21wb25lbnRDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb246IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8VENvbmZpZz4pIHtcblxuICAgICAgICBsZXQgY29uZmlndXJhdGlvbkFzT2JzZXJ2YWJsZXMgPSB0b09ic2VydmFibGVPYmplY3QoY29uZmlndXJhdGlvbiwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbjtcblxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBjb25maWd1cmF0aW9uQXNPYnNlcnZhYmxlcztcbiAgICAgICAgLy8gISBOb3RlIGxpbmUgYmVsb3cgaXMgZm9yIHR5cGluZyB3aXRoaW4gdGhlIElERUJhc2UsIHRoZSBsaW5lIGFib3ZlIGlzIGZvciB0eXBpbmcgd2l0aGluIHRoZSBjaGlsZCBjbGFzc1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gY29uZmlndXJhdGlvbkFzT2JzZXJ2YWJsZXMgYXMgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8dW5rbm93bj4+O1xuICAgICBcbiAgICB9XG5cbiAgICBjbGVhckVycm9ycygpIHtcbiAgICAgICAgdGhpcy5lcnJvcnM/LnJlbW92ZUFsbCgpO1xuICAgIH1cblxuICAgIHNldHVwRXJyb3JNYW5hZ2VyKCkge1xuXG4gICAgICAgIHRoaXMubChcIlNldHRpbmcgdXAgZXJyb3IgbWFuYWdlclwiKTtcbiAgICAgICAgdGhpcy5lcnJvcnM/LnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5mKFwiRXJyb3JzIGNoYW5nZWRcIiwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5idWlsZEVycm9yRGl2KCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc2V0dXBMaXZlQ29uZmlnKCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zPy5kZWJ1Zy5zdWJzY3JpYmUoKG5ld1ZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZS5saXZlQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUxpdmVDb25maWcobmV3VmFsdWUubGl2ZUNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICB0aGlzLmFjdGl2YXRlTGl2ZUNvbmZpZyh0aGlzLl9vcHRpb25zPy5kZWJ1ZygpLmxpdmVDb25maWcoKSk7IC8vVE9ETyBmaXggdHlwaW5nc1xuICAgIH1cblxuICAgIGFjdGl2YXRlTGl2ZUNvbmZpZyhhY3RpdmU6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZUNvbmZpZ0Rpdj8ucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5saXZlQ29uZmlnRGl2KSB7IC8vbGVhdmUgYWxvbmUgaWYgYWxyZWFkeSBhY3RpdmVcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubChcIlNldHRpbmcgdXAgbGl2ZSBjb25maWdcIik7XG5cbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZERhdGEgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJfaG9zdFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSwgNCk7XG5cbiAgICAgICAgLy9jbG9uZSB0aGUgY29uZmlnXG4gICAgICAgIGxldCBjb25maWcgPSBrby5vYnNlcnZhYmxlKHNlcmlhbGl6ZWREYXRhKTtcblxuICAgICAgICB0aGlzLmxpdmVDb25maWdEYXRhID0ge1xuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHRpbWVvdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG5cbiAgICAgICAgdGhpcy5saXZlQ29uZmlnRGl2ID0gdGhpcy5jcmVhdGVMaXZlQ29uZmlnRGl2KCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LnByZXBlbmQodGhpcy5saXZlQ29uZmlnRGl2KTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbmZpZy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJUaGUgbmV3IHZhbHVlIGlzIFwiICsgbmV3VmFsdWUpXG5cbiAgICAgICAgICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdDb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZygpKVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlDb21wb25lbnRDb25maWd1cmF0aW9uKG5ld0NvbmZpZy5jb25maWd1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXZlQ29uZmlndXJhdGlvblJlZnJlc2hlZCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnJlZnJlc2gobmV3Q29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yZXNldChuZXdDb25maWcpO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHRydWU7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAzMDAwKTtcblxuXG4gICAgICAgIC8vIGtvLmFwcGx5QmluZGluZ3ModGhpcy5saXZlQ29uZmlnRGF0YSwgdGhpcy5saXZlQ29uZmlnRGl2KTt4XG5cbiAgICAgICAgLy8gfVxuICAgIH1cblxuXG5cbiAgICBlbnN1cmVTdHlsZXNMb2FkZWQoaHJlZjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGlua1tocmVmPVwiJHtocmVmfVwiXWApKSB7XG4gICAgICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICAgICAgbGluay5ocmVmID0gaHJlZjtcbiAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVMaXZlQ29uZmlnRGl2KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBvdXRlciA8ZGl2PiB3aXRoIGNsYXNzIFwiY29sLXNtLTEyIGZvcm1idWlsZGVyLWVkaXRvci1qc29uXCJcbiAgICAgICAgY29uc3Qgb3V0ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgb3V0ZXJEaXYuY2xhc3NOYW1lID0gJ2NvbC1zbS0xMiBmb3JtYnVpbGRlci1lZGl0b3ItanNvbic7XG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBpbm5lciA8ZGl2PiB3aXRoIHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlc1xuICAgICAgICBjb25zdCBpbm5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBpbm5lckRpdi5pZCA9ICdsaXZlQ29uZmlnJztcbiAgICAgICAgaW5uZXJEaXYuY2xhc3NOYW1lID0gJ2Zvcm0tY29udHJvbCB0ZXh0YXJlYSc7XG4gICAgICAgIGlubmVyRGl2LnN0eWxlLmhlaWdodCA9ICczMDBweCc7XG4gICAgICAgIC8vIGlubmVyRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJywgJ3N5bnRheEVkaXRvcjogbGl2ZUNvbmZpZ0RhdGEuY29uZmlnLCBlbmFibGU6IHRydWUsIGV2ZW50OiB7IGZvY3Vzb3V0OiBsaXZlQ29uZmlnRGF0YS5vbkZvY3VzT3V0IH0nKTtcbiAgICAgICAgaW5uZXJEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWJpbmQnLCAnc3ludGF4RWRpdG9yOiBsaXZlQ29uZmlnRGF0YS5jb25maWcnKTtcbiAgICAgICAgLy8gaW5uZXJEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWJpbmQnLCAnc3ludGF4RWRpdG9yOiBtb2RlbC5jb25maWcnKTtcbiAgICAgICAgLy8gQXBwZW5kIHRoZSBpbm5lckRpdiB0byB0aGUgb3V0ZXJEaXZcbiAgICAgICAgb3V0ZXJEaXYuYXBwZW5kQ2hpbGQoaW5uZXJEaXYpO1xuXG4gICAgICAgIHJldHVybiBvdXRlckRpdjtcbiAgICB9XG5cbiAgICBzZXR1cEV2ZW50V2F0Y2hlcigpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucz8uZXZlbnRzVG9SZWFjdFRvKCk/LmZvckVhY2goKGV2ZW50VG9XYXRjaCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWJzY3JpYmluZyB0byBldmVudFwiLCBldmVudFRvV2F0Y2gpO1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICAgICR1aS5ldmVudHMuc3Vic2NyaWJlKGV2ZW50VG9XYXRjaC5ldmVudFBhdGgoKSwgKGU6IGFueSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbXBvbmVudChldmVudFRvV2F0Y2guZXZlbnRQYXRoKCksIGV2ZW50VG9XYXRjaC5tZXRob2RUb0NhbGwoKSk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcykpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGxldCByZWZyZXNoT24gPSBrby50b0pTKHRoaXMuX29wdGlvbnM/LnJlZnJlc2hPbigpKTtcbiAgICAgICAgaWYgKHJlZnJlc2hPbikge1xuXG4gICAgICAgICAgICBpZiAocmVmcmVzaE9uLnNoYXJlZG9JZENoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkb0lkLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbXBvbmVudChcInNoYXJlZG9JZENoYW5nZWRcIiwgXCJyZWZyZXNoXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZWZyZXNoT24uc2hhcmVkb1BhcmVudElkQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRTaGFyZWRvSWQuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29tcG9uZW50KFwic2hhcmVkb1BhcmVudElkQ2hhbmdlZFwiLCBcInJlZnJlc2hcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlZnJlc2hPbi5zaGFyZWRvUGhhc2VDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBoYXNlTmFtZS5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb21wb25lbnQoXCJzaGFyZWRvUGhhc2VDaGFuZ2VkXCIsIFwicmVmcmVzaFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG5cblxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJlZnJlc2hDb21wb25lbnQoZXZlbnRQYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQsIG1ldGhvZFRvQ2FsbDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaExvZyA9IHRoaXMucmVmcmVzaExvZyB8fCBbXTtcbiAgICAgICAgaWYgKHRoaXMubGFzdFJlZnJlc2gpIC8vVE9ETzogY2hhbmdlIHRoaXMgc28gd2UgY29sbGVjdCBhbGwgcmVmcmVzaGVzIGFuZCBkbyB0aGVtIGluIG9uZSBnb1xuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgc2Vjb25kc1NpbmNlTGFzdFJlZnJlc2ggPSAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmxhc3RSZWZyZXNoLmdldFRpbWUoKSkgLyAxMDA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlY29uZHMgc2luY2UgbGFzdCByZWZyZXNoXCIsIHNlY29uZHNTaW5jZUxhc3RSZWZyZXNoKTtcbiAgICAgICAgICAgIGlmIChzZWNvbmRzU2luY2VMYXN0UmVmcmVzaCA8IDEwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTa2lwcGluZyByZWZyZXNoLCB0b28gc29vblwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3RSZWZyZXNoID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWZyZXNoaW5nIGNvbXBvbmVudFwiKTtcbiAgICAgICAgbGV0IGxvZ0l0ZW0gPSB7IGV2ZW50UGF0aDogZXZlbnRQYXRoLCBtZXRob2RUb0NhbGw6IG1ldGhvZFRvQ2FsbCwgdGltZTogbmV3IERhdGUoKSwgc3VjY2VzczogZmFsc2UgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChtZXRob2RUb0NhbGwpIHtcbiAgICAgICAgICAgICAgICAvLyBsZXQgcGFyYW1zID0gd2lkZ2V0cy5wYXJhbWV0ZXJzO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXhlY3V0aW5nIG1ldGhvZFwiLCBtZXRob2RUb0NhbGwpO1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRUb1JlZnJlc2ggPSAodGhpcyBhcyBhbnkpO1xuICAgICAgICAgICAgICAgIGlmICghY29tcG9uZW50VG9SZWZyZXNoW21ldGhvZFRvQ2FsbF0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYE1ldGhvZCBub3QgZm91bmQgb24gY29tcG9uZW50ICR7dGhpcy50aGlzQ29tcG9uZW50TmFtZX1gLCBtZXRob2RUb0NhbGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFRvUmVmcmVzaFttZXRob2RUb0NhbGxdKCk7IC8vdG9kbzogcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG5cbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGxvZ0l0ZW0uc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hMb2cucHVzaChsb2dJdGVtKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgYnVpbGRFcnJvckRpdigpIHtcbiAgICAgICAgdGhpcy5pbmYoXCJCdWlsZGluZyBlcnJvciBkaXZcIilcbiAgICAgICAgbGV0IGVycm9yRGl2ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lcnJvckRpdlNlbGVjdG9yKTtcbiAgICAgICAgaWYgKCFlcnJvckRpdikge1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsKFwiZXJyb3JEaXYuaW5uZXJIVE1MXCIpXG4gICAgICAgIGVycm9yRGl2LmlubmVySFRNTCA9IFwiXCI7IC8vY2xlYW4gb3V0IHRoZSBkaXZcblxuICAgICAgICBpZiAoIXRoaXMuZXJyb3JzKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ycyA9IGtvLm9ic2VydmFibGVBcnJheTxUVXNlckVycm9ycz4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lcnJvcnMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlcnJvckNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVycm9yRGl2LmFwcGVuZENoaWxkKGVycm9yQ29udGFpbmVyRGl2KTtcblxuICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3ItY29udGFpbmVyXCI7XG4gICAgICAgIGxldCB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRpdGxlRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci10aXRsZVwiO1xuICAgICAgICB0aXRsZURpdi5pbm5lclRleHQgPSBcIlRoZXJlIGhhcyBiZWVuIGFuIGVycm9yOlwiO1xuICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG4gICAgICAgIGxldCBmb3JlYWNoRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZXJyb3JDb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZm9yZWFjaERpdik7XG5cbiAgICAgICAgdGhpcy5lcnJvcnMoKS5mb3JFYWNoKChlcnJvcikgPT4ge1xuXG4gICAgICAgICAgICBsZXQgdXNlck1lc3NhZ2VEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgdXNlck1lc3NhZ2VEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLXVzZXItbWVzc2FnZVwiO1xuICAgICAgICAgICAgdXNlck1lc3NhZ2VEaXYuaW5uZXJIVE1MID0gZXJyb3IudXNlck1lc3NhZ2U7XG5cblxuXG4gICAgICAgICAgICB1c2VyTWVzc2FnZURpdi5vbmNsaWNrID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgYSBkaXYgdGhhdCBjYW4gc2NvbGxcbiAgICAgICAgICAgICAgICBsZXQgZGV0YWlsZWRNZXNzYWdlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBkZXRhaWxlZE1lc3NhZ2VEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWRldGFpbGVkLW1lc3NhZ2VcIjtcblxuXG4gICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGVzY2FwZUh0bWwoZXJyb3IuY29kZSB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXNjYXBlSHRtbChlcnJvci5tZXNzYWdlIHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJNZXNzYWdlID0gZXNjYXBlSHRtbChlcnJvci51c2VyTWVzc2FnZSB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvclN0YWNrID0gZXNjYXBlSHRtbChlcnJvci5lcnJvclN0YWNrIHx8IFwiXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgYWRkaXRpb25hbEluZm8gPSBKc29uVG9IdG1sQ29udmVydGVyLmNvbnZlcnQoZXJyb3IuYWRkaXRpb25hbEluZm8gfHwge30pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgaHRtbCA9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMj5FcnJvcjogJHtjb2RlfTwvaDI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5NZXNzYWdlOjwvc3Ryb25nPiAke21lc3NhZ2V9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+VXNlciBNZXNzYWdlOjwvc3Ryb25nPiAke3VzZXJNZXNzYWdlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPlN0YWNrOjwvc3Ryb25nPiAke2Vycm9yU3RhY2t9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+QWRkaXRpb25hbCBJbmZvOjwvc3Ryb25nPiAke2FkZGl0aW9uYWxJbmZvfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuXG5cbiAgICAgICAgICAgICAgICBkZXRhaWxlZE1lc3NhZ2VEaXYuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICAgICAgICAgICR1aS5lcnJvckRpYWxvZyhkZXRhaWxlZE1lc3NhZ2VEaXYpO1xuXG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZm9yZWFjaERpdi5hcHBlbmRDaGlsZCh1c2VyTWVzc2FnZURpdik7XG5cbiAgICAgICAgICAgIGlmIChlcnJvci5zdWdnZXN0aW9ucyAmJiBlcnJvci5zdWdnZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN1Z2dlc3Rpb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uc0Rpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3Itc3VnZ2VzdGlvbnNcIjtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uc0Rpdi5pbm5lckhUTUwgPSBgPGI+U3VnZ2VzdGlvbnM6PC9iPjxici8+JHtlcnJvci5zdWdnZXN0aW9ucy5qb2luKFwiPGJyLz5cIil9YDtcbiAgICAgICAgICAgICAgICBmb3JlYWNoRGl2LmFwcGVuZENoaWxkKHN1Z2dlc3Rpb25zRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVycm9yLmFjdGlvbnMgJiYgZXJyb3IuYWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGFjdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWFjdGlvbnNcIjtcbiAgICAgICAgICAgICAgICBhY3Rpb25zRGl2LmlubmVySFRNTCA9IGA8Yj5BY3Rpb25zOjwvYj48YnIvPiR7ZXJyb3IuYWN0aW9ucy5qb2luKFwiPGJyLz5cIil9YDtcbiAgICAgICAgICAgICAgICBmb3JlYWNoRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNEaXYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXJyb3IuaW50ZXJuYWxTdWdnZXN0aW9ucyAmJiBlcnJvci5pbnRlcm5hbFN1Z2dlc3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgaW50ZXJuYWxTdWdnZXN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgaW50ZXJuYWxTdWdnZXN0aW9uc0Rpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3ItaW50ZXJuYWwtc3VnZ2VzdGlvbnNcIjtcbiAgICAgICAgICAgICAgICBpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2LmlubmVySFRNTCA9IGA8Yj5JbnRlcm5hbCBTdWdnZXN0aW9uczo8L2I+PGJyLz4ke2Vycm9yLmludGVybmFsU3VnZ2VzdGlvbnMuam9pbihcIjxici8+XCIpfWA7XG4gICAgICAgICAgICAgICAgZm9yZWFjaERpdi5hcHBlbmRDaGlsZChpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucz8uZGVidWcoKS5zdXBwb3J0UmVxdWVzdEVuYWJsZWQpIHtcbiAgICAgICAgICAgIGxldCBhY3Rpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgYWN0aW9uRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1zdXBwb3J0LWFjdGlvblwiO1xuICAgICAgICAgICAgZXJyb3JDb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoYWN0aW9uRGl2KTtcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9IFwiYnRuIGJ0bi1wcmltYXJ5XCI7XG4gICAgICAgICAgICAvLyBidXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1iaW5kXCIsXCJjbGljazpjcmVhdGVTdXBwb3J0VGFzayx2aXNpYmxlOm9wdGlvbnMuZGVidWcuLnN1cHBvcnRSZXF1ZXN0RW5hYmxlZFwiKTtcbiAgICAgICAgICAgIGJ1dHRvbi5pbm5lclRleHQgPSBcIkNyZWF0ZSBTdXBwb3J0IFRhc2tcIjtcbiAgICAgICAgICAgIGFjdGlvbkRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICB9XG5cblxuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgICAqIEFic3RyYWN0IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gcmVmcmVzaCB0aGUgYXNwZWN0XG4gICAgICAgKiBAcGFyYW0gbmV3Q29uZmlnIFxuICAgICAgICovXG4gICAgYWJzdHJhY3QgcmVmcmVzaChuZXdDb25maWc6IGFueSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAqIEFic3RyYWN0IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gcmVzZXQgdGhlIGFzcGVjdCBiYXNlZCBcbiAgICAqIEBwYXJhbSBuZXdDb25maWcgXG4gICAgKi9cbiAgICBhYnN0cmFjdCByZXNldChuZXdDb25maWc6IGFueSk6IHZvaWQ7XG5cbiAgICBhYnN0cmFjdCBsaXZlQ29uZmlndXJhdGlvblJlZnJlc2hlZCgpOnZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiAhIGltcG9ydGFudDogTWFuZGF0b3J5IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gc2V0IHRoZSBkZWZhdWx0c1xuICAgICAqICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBjb25zdHJ1Y3RvciB0byBzZXQgdGhlIGRlZmF1bHRzXG4gICAgICogQHJldHVybnMgRGVmYXVsdHM8VENvbmZpZz5cbiAgICAgKiBAbWVtYmVyb2YgQmFzZUlERUFzcGVjdFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqIFxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldERlZmF1bHRzKCk6IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8VENvbmZpZz47XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiAhIGltcG9ydGFudDogTWFuZGF0b3J5IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gc2V0IHRoZSBkZWZhdWx0cyBmb3IgdGhlIHdpZGdldC5qc29uXG4gICAgLy8gICovXG4gICAgLy8gYWJzdHJhY3Qgc2V0RXhhbXBsZUZvck1vZGVsbGVyKCk6IERlZmF1bHRzPFRDb25maWc+O1xuXG4gICAgLyoqXG4gICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gbG9hZCBhbmQgc2F2ZSB0b1xuICAgICogRXhhbXBsZXMgb2YgdGhpcyBhcmU6XG4gICAgKiAtIGFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEue2Zvcm1CdWlsZGVyRmllbGR9XG4gICAgKiAtIGFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyXG4gICAgKiAtIHVuZGVmaW5lZCAoaWYgbm8gZGF0YSBpcyB0byBiZSBsb2FkZWQgb3Igc2F2ZWQgYnkgdGhlIGJhc2UgY2xhc3MpXG4gICAgKiBAcmV0dXJucyBUaGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gbG9hZCBhbmQgc2F2ZSB0byBPUiB1bmRlZmluZWQgaWYgbm8gZGF0YSBpcyB0byBiZSBsb2FkZWQgb3Igc2F2ZWQgYnkgdGhlIGJhc2UgY2xhc3NcbiAgICAqL1xuICAgIGFic3RyYWN0IHNldExvY2F0aW9uT2ZEYXRhVG9Mb2FkQW5kU2F2ZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgbmFtZSBvZiB0aGUgY29tcG9uZW50IGUuZy4gUXVpY2tWaWV3IFxuICAgICAqIFRoaXMgd2lsbCBhbHNvIGJlIHVzZWQgZHVyaW5nIHRoZSBidWlsZCBhbmQgd2lsbCBiZSBhcHBlbmRlZCB3aXRoIHRoZSBCdWlsdCBUYXJnZXQgZS5nLiBJREVBc3BlY3RzLlF1aWNrVmlld1xuICAgICAqL1xuICAgIGFic3RyYWN0IHNldFRoaXNDb21wb25lbnROYW1lKCk6IHN0cmluZztcblxuXG4gICAgLyoqXG4gICAgICogIUlNUE9SVEFOVCAtIFRoaXMgaXMgdGhlIGZpcnN0IG1ldGhvZCBvbmNlIHRoZSBjbGFzcyBoYXMgYmVlbiBjb25zdHJ1Y3RlZCwgZGVmYXVsdCBjb250cnVjdG9yIGxvZ2ljIHNob3VsZCBiZSBwbGFjZWQgaGVyZVxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldHVwKCk6IHZvaWQ7XG5cblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBzZXR0aW5ncyBmb3IgdGhlIHdpZGdldC5qc29uIHRoYXQgd2lsbCBiZSBnZW5lcmF0ZWRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRXaWRnZXRKc29uU2V0dGluZ3MoKTogSVdpZGdldEpzb248VENvbmZpZz47XG5cblxuXG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50U2NyaXB0RmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50U3R5bGVGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRUZW1wbGF0ZUZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudE1lbnVUZW1wbGF0ZUZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudENvbXBvbmVudEZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldFdpZGdldERlc2lnbmVyU2V0dGluZ3MoKTogSVdpZGdldEpzb25EZXNpZ25lcjtcbiAgICAvLyBhYnN0cmFjdCBzZXRQcmlvcml0eSgpIDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgd2hlbiB0aGUgbW9kZWwgaXMgc2F2ZWQuIE1hbmlwdWxhdGUgdGhlXG4gICAgICogbW9kZWwgYXMgcmVxdWlyZWQuXG4gICAgICovXG4gICAgb25TYXZlKG1vZGVsOiBhbnkpIHtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvblNhdmVcIiwgbW9kZWwpO1xuXG4gICAgICAgIGxldCBkYXRhVG9TYXZlID0gdGhpcy5fZGF0YVxuICAgICAgICB0aGlzLmxvZyhcIlNhdmluZywgbW9kZWwgcGFzc2VkIGluIHdlIG5lZWQgdG8gcGVyc2lzdCB0b1wiLCBcImdyZWVuXCIsIGRhdGFUb1NhdmUpO1xuXG4gICAgICAgIGlmICh0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGxvY2F0aW9uIHRvIHNhdmUgZGF0YSB0byBzZXQgLSB0aGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcnJpZGVuXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cblxuICAgICAgICBsZXQgZGF0YVRvUGVyc2lzdCA9IHRoaXMuX2RhdGE7XG4gICAgICAgIGxldCBjdXJyZW50RGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG4gICAgICAgIGlmIChjdXJyZW50RGF0YSkge1xuICAgICAgICAgICAgdGhpcy5sb2coYEN1cnJlbnQgZGF0YSBhdCBsb2NhdGlvbiAke3RoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhfSA6YCwgXCJtYWdlbnRhXCIsIGN1cnJlbnREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWN1cnJlbnREYXRhKSB7XG4gICAgICAgICAgICAvLyB0aGlzLmxvZyhcIkRhdGEgZG9lcyBub3QgZXhpc3QsIHdlIHdpbGwgY3JlYXRlXCIsIFwib3JhbmdlXCIpO1xuICAgICAgICAgICAgLy8gIHNldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwge30pO1xuICAgICAgICAgICAgLy8gY3VycmVudERhdGEgPSBnZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nKGBOZXcgZGF0YSB0byBwZXJzaXN0IHRvIGxvY2F0aW9uICR7dGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGF9IDpgLCBcImJsdWVcIiwgZGF0YVRvUGVyc2lzdCk7XG4gICAgICAgIHNldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgZGF0YVRvUGVyc2lzdCk7XG5cbiAgICAgICAgdGhpcy5sKFwiRGF0YSBzYXZlZFwiLCBtb2RlbCk7XG5cbiAgICB9O1xuXG4gICAgYXN5bmMgZ2V0RGF0YSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9UaGlzIHNlY3Rpb24gaXMgZD11c2UgZHVlIHRvIHR5cGluZyBpc3N1ZSB0aGF0IG5lZWRzIHRvIGJlIHJlc29sdmVkLlxuICAgICAgICAvLyBsZXQgdXNlUGFyZW50cyA9IGd2a28odGhpcy5fb3B0aW9ucy5kYXRhU2V0dGluZ3MoKS5nZXRWYWx1ZVVzaW5nUGFyZW50cykgYXMgYm9vbGVhbiB8IHVuZGVmaW5lZFxuICAgICAgICAvLyBsZXQgc2hhcmVEb0lkPSBndmtvKHRoaXMuc2hhcmVkb0lkKVxuICAgICAgICAvLyBsZXQgbWF4RGVwdGggPSBndmtvKHRoaXMuX29wdGlvbnMuZGF0YVNldHRpbmdzKCkubWF4RGVwdGgpIGFzIG51bWJlciB8IHVuZGVmaW5lZFxuICAgICAgICAvLyBsZXQgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gZ3Zrbyh0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSkgYXMgc3RyaW5nIHwgdW5kZWZpbmVkXG4gICAgICAgIC8vZW5kIGFyZWEgb2YgdHlwaW5nIGlzc3VlXG5cbiAgICAgICAgbGV0IHVzZVBhcmVudHMgPSB0aGlzLl9vcHRpb25zPy5kYXRhU2V0dGluZ3MoKS5nZXRWYWx1ZVVzaW5nUGFyZW50cygpXG4gICAgICAgIGxldCBzaGFyZURvSWQgPSB0aGlzLnNoYXJlZG9JZCgpXG4gICAgICAgIGxldCBtYXhEZXB0aCA9IHRoaXMuX29wdGlvbnM/LmRhdGFTZXR0aW5ncygpLm1heERlcHRoKClcbiAgICAgICAgbGV0IExvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9IGd2a28odGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuXG4gICAgICAgIGlmIChMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBsb2NhdGlvbiB0byBsb2FkIGRhdGEgZnJvbSBzZXQgLSB0aGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcnJpZGVuXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkodGhpcy5tb2RlbCwgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcblxuICAgICAgICBpZiAodGhpcy5fZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmwoXCJEYXRhIGZvdW5kIGF0IGxvY2F0aW9uXCIsIHRoaXMuX2RhdGEpO1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGtvLnRvSlModGhpcy5fZGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgZGF0YSBvdCBmb3VuZCBpbiB0aGUgY3VycmVudCBtb2RlbCwgbG9vayB2aWEgdGhlIHNlYXJjaFxuICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gdW5kZWZpbmVkICYmIHVzZVBhcmVudHMgPT09IGZhbHNlICYmIHNoYXJlRG9JZCkgLy8hIFRPRE8gRml4IFR5cGluZ3NcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZShzaGFyZURvSWQsIExvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgZmFsc2UpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5mb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IHVuZGVmaW5lZCAmJiB1c2VQYXJlbnRzID09PSB0cnVlKSAvLyEgVE9ETyBGaXggVHlwaW5nc1xuICAgICAgICB7XG5cbiAgICAgICAgICAgIGxldCBpZFRvVXNlciA9IHRoaXMuc2hhcmVkb0lkKCkgfHwgdGhpcy5wYXJlbnRTaGFyZWRvSWQoKTtcblxuICAgICAgICAgICAgaWYgKCFpZFRvVXNlcikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gaWQgdG8gdXNlIGZvciBzZWFyY2ggYm90aCBzaGFyZWRvSWQgYW5kIHBhcmVudFNoYXJlZG9JZCBhcmUgdW5kZWZpbmVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZShpZFRvVXNlciwgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCB1c2VQYXJlbnRzLCBtYXhEZXB0aCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbiAgICBzZXREYXRhKHZhbHVlOiBUUGVyc2l0YW5jZSB8IHVuZGVmaW5lZCkge1xuXG4gICAgICAgIGxldCB2YWx1ZVRvUGVyc2lzdCA9IGtvLnRvSlModmFsdWUpO1xuICAgICAgICBsZXQgcHJldmlvdXNWYWx1ZSA9IGtvLnRvSlModGhpcy5fZGF0YSk7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZVRvUGVyc2lzdDtcbiAgICAgICAgdGhpcy5maXJlVmFsdWVDaGFuZ2VkRXZlbnQoXCJvbkRhdGFCZWZvcmVDaGFuZ2VkXCIsIHsgcHJldmlvdXNWYWx1ZTogcHJldmlvdXNWYWx1ZSwgbmV3VmFsdWU6IHZhbHVlVG9QZXJzaXN0IH0pO1xuXG4gICAgICAgIGlmICh0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsdWVUb1NldDogYW55ID0gdmFsdWU7XG4gICAgICAgIC8vIGlmKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLmluY2x1ZGVzKFwiZm9ybUJ1aWxkZXJcIikpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIC8vZm9ybWJ1aWxkZXIgRGF0YSBhbHdheXMgbmVlZCB0byBiZSBzdHJpbmdcbiAgICAgICAgLy8gICAgIHRoaXMubG9nKFwiU2V0dGluZyBmb3JtYnVpbGRlciBkYXRhIC0gY29udmVydGluZyB0byBzdHJpbmdcIiwgXCJncmVlblwiLCB2YWx1ZSlcbiAgICAgICAgLy8gICAgIHZhbHVlVG9TZXQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIC8vICAgICB0aGlzLmxvZyhcImFmdGVyIFNldHRpbmcgZm9ybWJ1aWxkZXIgZGF0YSAtIGNvbnZlcnRlZCB0byBzdHJpbmdcIiwgXCJncmVlblwiLCB2YWx1ZVRvU2V0KVxuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMubG9nKFwiU2V0dGluZyBkYXRhIGF0IGxvY2F0aW9uXCIsIFwiZ3JlZW5cIiwgdmFsdWVUb1NldCk7XG4gICAgICAgIHNldE5lc3RlZFByb3BlcnR5KHRoaXMubW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCB0aGlzLl9kYXRhKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkRhdGFDaGFuZ2VkXCIsIHRoaXMubW9kZWwpO1xuICAgIH1cblxuXG4gICAgb25EZXN0cm95KG1vZGVsPzogYW55KSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25EZXN0cm95XCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uRGVzdHJveVwiLCBtb2RlbCk7XG4gICAgICAgICR1aS51dGlsLmRpc3Bvc2UodGhpcy5kaXNwb3NhYmxlcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgVUkgZnJhbWV3b3JrIGFmdGVyIGluaXRpYWwgY3JlYXRpb24gYW5kIGJpbmRpbmcgdG8gbG9hZCBkYXRhXG4gICAgICogaW50byBpdCdzIG1vZGVsXG4gICAgICovXG4gICAgbG9hZEFuZEJpbmQoKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogbG9hZEFuZEJpbmRcIik7XG4gICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBkYXRhIChtb2RlbDphbnkpIHBhc3NlZCBpblwiLCBcImdyZWVuXCIpO1xuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSBiYXNlZCBvbiBsb2NhdGlvbiB0byBzYXZlXCIsIFwiZ3JlZW5cIiwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uTG9hZFwiLCB0aGlzLm1vZGVsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgYmVmb3JlIHRoZSBtb2RlbCBpcyBzYXZlZFxuICAgICAqL1xuICAgIG9uQmVmb3JlU2F2ZShtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uQmVmb3JlU2F2ZVwiKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkJlZm9yZVNhdmVcIiwgbW9kZWwpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgYWZ0ZXIgdGhlIG1vZGVsIGhhcyBiZWVuIHNhdmVkLlxuICAgICAqL1xuICAgIG9uQWZ0ZXJTYXZlKG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25BZnRlclNhdmVcIik7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25BZnRlclNhdmVcIiwgbW9kZWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIHdoZW4gaXQgcmVsb2FkcyBhc3BlY3QgZGF0YVxuICAgICAqL1xuICAgIG9uUmVsb2FkKG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25SZWxvYWRcIik7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25SZWxvYWRcIiwgbW9kZWwpO1xuICAgIH1cblxuXG4gICAgZGVidWdTZXR0aW5ncygpIHtcbiAgICAgICAgbGV0IGRlYnVnU2V0dGluZzogSURlYnVnID0gREVCVUdfREVGQVVMVCgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zPy5kZWJ1ZygpKSB7XG4gICAgICAgICAgICBkZWJ1Z1NldHRpbmcgPSBrby50b0pTKHRoaXMuX29wdGlvbnM/LmRlYnVnKCkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVidWdTZXR0aW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGxvZ2dpbmcgZm9yIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGRlYnVnIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBcbiAgICAgKiBAcGFyYW0gY29sb3IgXG4gICAgICogQHBhcmFtIGRhdGEgXG4gICAgICovXG4gICAgbG9nKG1lc3NhZ2U6IHN0cmluZywgY29sb3I/OiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcblxuXG5cbiAgICAgICAgaWYgKHRoaXMuZGVidWdTZXR0aW5ncygpLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnU2V0dGluZ3MoKS5sb2dUb0NvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSBjb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICAvLyBsZXQgbGluZU5vID0gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soKG5ldyBFcnJvcigpKS5zdGFjayk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjICR7dGhpcy50aGlzQ29tcG9uZW50TmFtZX0gLSAke21lc3NhZ2V9YCwgYGNvbG9yOiR7Y29sb3J9YCwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5Mb2coKTogYm9vbGVhbiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGVidWdTZXR0aW5ncygpLmVuYWJsZWQ7XG4gICAgfVxuICAgIGxvZ1RvQ29uc29sZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuTG9nKCkgJiYgdGhpcy5kZWJ1Z1NldHRpbmdzKCkubG9nVG9Db25zb2xlO1xuICAgIH1cbiAgICBsb2dUb0FzcGVjdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuTG9nKCkgJiYgdGhpcy5kZWJ1Z1NldHRpbmdzKCkuc2hvd0luQXNwZWN0XG4gICAgfVxuXG5cbiAgICBpbmYobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChpbmYobWVzc2FnZSksIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JuKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwod3JuKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVycihtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG5cbiAgICAgICAgLy9nZXQgdGhlIHByZXZpb3VzIGNhbGxlclxuXG5cblxuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChlcnIobWVzc2FnZSksIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbnYobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKG52KG5hbWUsIHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsaDEobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChsaDEobWVzc2FnZSksIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJTZWMoKSB7XG4gICAgICAgIGNsZWFyU2VjKCk7XG4gICAgfVxuXG4gICAgbChtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKG1lc3NhZ2UsIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQXNwZWN0KCkpIHtcbiAgICAgICAgICAgIGxldCBhc3BlY3RMb2dPdXRwdXQgPSB0aGlzLmFzcGVjdExvZ091dHB1dDtcbiAgICAgICAgICAgIGlmIChhc3BlY3RMb2dPdXRwdXQpIHtcbiAgICAgICAgICAgICAgICBhc3BlY3RMb2dPdXRwdXQuaW5uZXJUZXh0ICs9IGAke21lc3NhZ2V9XFxuYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEFzcGVjdExvZ091dHB1dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ1RvQXNwZWN0KCkpIHsgcmV0dXJuIH07XG5cbiAgICAgICAgdGhpcy5hc3BlY3RMb2dPdXRwdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBsZXQgYXNwZWN0TG9nT3V0cHV0ID0gdGhpcy5hc3BlY3RMb2dPdXRwdXQ7XG5cbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LmlkID0gYGFzcGVjdExvZ091dHB1dC0ke3RoaXMudW5pcXVlSWR9YDtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGJsYWNrXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5wYWRkaW5nID0gXCI1cHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm1hcmdpbiA9IFwiNXB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5oZWlnaHQgPSBcIjIwMHB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5mb250U2l6ZSA9IFwiMTBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuZm9udEZhbWlseSA9IFwibW9ub3NwYWNlXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS53aGl0ZVNwYWNlID0gXCJwcmUtd3JhcFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUud29yZFdyYXAgPSBcImJyZWFrLXdvcmRcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuekluZGV4ID0gXCIxMDAwXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5ib3R0b20gPSBcIjBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubGVmdCA9IFwiMHB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5yaWdodCA9IFwiMHB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW5MZWZ0ID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW5SaWdodCA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luQm90dG9tID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW5Ub3AgPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgyNTUsMjU1LDI1NSwwLjgpXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjVweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUucGFkZGluZyA9IFwiNXB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5ib3hTaGFkb3cgPSBcIjBweCAwcHggNXB4IDBweCByZ2JhKDAsMCwwLDAuNzUpXCI7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LnByZXBlbmQoYXNwZWN0TG9nT3V0cHV0KTtcblxuICAgIH1cblxuICAgIGZpcmVFdmVudChldmVudE5hbWU6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgICAgIGxldCBldmVudDogU2hhcmVEb0V2ZW50ID0ge1xuICAgICAgICAgICAgZXZlbnRQYXRoOiB0aGlzLnRoaXNDb21wb25lbnROYW1lICsgXCIuXCIgKyBldmVudE5hbWUsXG4gICAgICAgICAgICBldmVudE5hbWU6IGV2ZW50TmFtZSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfVxuICAgICAgICBmaXJlRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIGZpcmVWYWx1ZUNoYW5nZWRFdmVudChldmVudE5hbWU6IHN0cmluZywgY2hhbmdlZERhdGE6IHsgcHJldmlvdXNWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55IH0pIHtcbiAgICAgICAgbGV0IGV2ZW50OiBTaGFyZURvRXZlbnQgPSB7XG4gICAgICAgICAgICBldmVudFBhdGg6IHRoaXMudGhpc0NvbXBvbmVudE5hbWUgKyBcIi5cIiArIGV2ZW50TmFtZSxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogZXZlbnROYW1lLFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgZGF0YTogY2hhbmdlZERhdGFcbiAgICAgICAgfVxuICAgICAgICBmaXJlRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIEZvcm1idWlsZCBpZiBpdCBleGlzdHMgb3IgY3JlYXRlcyBpdCBpZiBpdCBkb2VzIG5vdFxuICAgICAqIFxuICAgICAqL1xuICAgIGZvcm1idWlsZGVyKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5ibGFkZT8ubW9kZWw/LmFzcGVjdERhdGE/LmZvcm1CdWlsZGVyPy5mb3JtRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIG5vdCBmb3VuZCAtIHdpbGwgY3JlYXRlIHRoZSBwYXRoXCIsIFwiYmx1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBmb3VuZFwiLCBcImdyZWVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9FbnN1cmUgdGhlIHBhdGggZXhpc3RzXG4gICAgICAgIGlmICghdGhpcy5ibGFkZSkge1xuICAgICAgICAgICAgLy9UT0RPOiBpZiBubyBibGFkZSB3aGVyZSBpcyBmb3JtIGJ1aWxkZXIgZGF0YVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYmxhZGUgPSB0aGlzLmJsYWRlIHx8IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVGb3JtYnVpbGRlcih0aGlzLmJsYWRlLm1vZGVsKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5ibGFkZSEubW9kZWwhLmFzcGVjdERhdGEhLmZvcm1CdWlsZGVyIS5mb3JtRGF0YTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVuc3VyZXMgdGhlcmUgaXMgYSBmb3JtIGJ1aWxkZXIgaW4gdGhlIHBhc3NlZCBpbiBtb2RlbCBhbmQgcmV0dXJucyBpdFxuICAgICAqIEBwYXJhbSBtb2RlbCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBlbnN1cmVGb3JtYnVpbGRlcihtb2RlbDogYW55KTogSUZvcm1CdWlsZGVyRGF0YSB7XG5cbiAgICAgICAgaWYgKCFtb2RlbD8uYXNwZWN0RGF0YT8uZm9ybUJ1aWxkZXI/LmZvcm1EYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgbm90IGZvdW5kIC0gd2lsbCBjcmVhdGUgdGhlIHBhdGhcIiwgXCJibHVlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIGZvdW5kXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0Vuc3VyZSB0aGUgcGF0aCBleGlzdHNcblxuICAgICAgICBtb2RlbCA9IG1vZGVsIHx8IHt9O1xuICAgICAgICBtb2RlbC5hc3BlY3REYXRhID0gbW9kZWwuYXNwZWN0RGF0YSB8fCB7fTtcbiAgICAgICAgbW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlciA9IG1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIgfHwgeyBmb3JtRGF0YToge30gfTtcblxuXG4gICAgICAgIHJldHVybiBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhO1xuICAgIH1cblxuXG4gICAgZm9ybWJ1aWxkZXJGaWVsZChmb3JtYnVpbGRlckZpZWxkOiBzdHJpbmcsIHNldFZhbHVlPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5mb3JtYnVpbGRlcigpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIkZvcm0gYnVpbGRlciBkb2VzIG5vdCBleGlzdCEgXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRm9ybSBidWlsZGVyIGRvZXMgbm90IGV4aXN0IVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3JtQnVpbGRlciA9IHRoaXMuZm9ybWJ1aWxkZXIoKSE7XG4gICAgICAgIGlmICghZm9ybUJ1aWxkZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3VuZFZhbHVlID0gZm9ybUJ1aWxkZXJbZm9ybWJ1aWxkZXJGaWVsZF1cbiAgICAgICAgaWYgKCFmb3VuZFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhgRm9ybSBidWlsZGVyIGRvZXMgbm90IGNvbnRhaW4gZmllbGQgJHtmb3JtYnVpbGRlckZpZWxkfSBgLCBcIm9yYW5nZVwiKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGBDcmVhdGluZyBmaWVsZCAke2Zvcm1idWlsZGVyRmllbGR9IGAsIFwiYmx1ZVwiKTtcbiAgICAgICAgICAgIGZvcm1CdWlsZGVyW2Zvcm1idWlsZGVyRmllbGRdID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BcmUgd2UgZG9pbmcgYSBzZXRcbiAgICAgICAgaWYgKHNldFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhgU2V0dGluZyAke2Zvcm1idWlsZGVyRmllbGR9IHRvICR7c2V0VmFsdWV9YCwgXCJncmVlblwiKTtcbiAgICAgICAgICAgIGZvcm1CdWlsZGVyW2Zvcm1idWlsZGVyRmllbGRdID0gc2V0VmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gc2V0VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmRWYWx1ZTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIGNsYXNzIE15Q2xhc3Mge1xuXG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKCk7XG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKHAxOiBudW1iZXIpO1xuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwMTogc3RyaW5nLCBwMjogc3RyaW5nKTtcbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IocDE6IHN0cmluZywgcDI6IHN0cmluZywgcDM6IHN0cmluZyk7XG5cbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IoLi4uYXJyOiBhbnlbXSkge1xuLy8gICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMikge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3R3byBhcmd1bWVudHMgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGFyci5sZW5ndGggPT09IDMpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aHJlZSBhcmd1bWVudHMgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGFyci5sZW5ndGggPT09IDEpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbmUgYXJndW1lbnQgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyB9XG5cbi8vIGxldCB4ID0gbmV3IE15Q2xhc3MoKSIsImltcG9ydCB7IElEZWJ1ZyB9IGZyb20gXCIuL0lEZWJ1Z1wiO1xuaW1wb3J0IHsgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZywgSVJlZnJlc2hPbiB9IGZyb20gXCIuL0lXaWRnZXRKc29uXCI7XG5cbmV4cG9ydCBjb25zdCBERUJVR19ERUZBVUxUID0gKCkgPT4gIHtcblxuICAgIGxldCByZXRWYWx1ZTpJRGVidWcgPSB7XG4gICAgICBzdXBwb3J0UmVxdWVzdEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIGxvZ1RvQ29uc29sZTogdHJ1ZSxcbiAgICAgIHNob3dJbkFzcGVjdDogZmFsc2UsXG4gICAgICBsaXZlQ29uZmlnOiBmYWxzZSxcbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbHVlO1xuICBcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBSRUZSRVNIX09OX0RFRkFVTFRTIDpJUmVmcmVzaE9uPVxuICB7XG4gICAgc2hhcmVkb0lkQ2hhbmdlZDogZmFsc2UsXG4gICAgc2hhcmVkb1BhcmVudElkQ2hhbmdlZDogZmFsc2UsXG4gICAgc2hhcmVkb1BoYXNlQ2hhbmdlZDogZmFsc2UsXG4gIH1cblxuXG4gIGV4cG9ydCBjb25zdCBEZWZhdWx0RGF0YVNldHRpbmdzOklEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8dW5rbm93bj4gPVxuICB7XG4gICAgZGVidWc6IERFQlVHX0RFRkFVTFQoKSxcbiAgICByZWZyZXNoT246IFJFRlJFU0hfT05fREVGQVVMVFMsXG4gICAgZXZlbnRzVG9SZWFjdFRvOiBbXG4gICAgICB7XG4gICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLnVwZGF0ZWRcIixcbiAgICAgICAgbWV0aG9kVG9DYWxsOiBcInJlZnJlc2hcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZXZlbnRQYXRoOiBcInNoYXJlZG8uY29yZS5jYXNlLnNoYXJlZG8tdXBkYXRlZFwiLFxuICAgICAgICBtZXRob2RUb0NhbGw6IFwicmVmcmVzaFwiXG4gICAgICB9XG4gICAgXSxcbiAgICBkYXRhU2V0dGluZ3M6IHtcbiAgICAgIGdldFZhbHVlVXNpbmdQYXJlbnRzOiBmYWxzZSxcbiAgICAgIG1heERlcHRoOiAwXG4gICAgfVxuICB9XG4gICIsImltcG9ydCAqIGFzIGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCB7IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uIH0gZnJvbSAnLi9JV2lkZ2V0SnNvbic7XG5cbmV4cG9ydCB0eXBlIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD4gPSB7XG4gICAgW0sgaW4ga2V5b2YgVF0gICAgICA6IFRbS10gZXh0ZW5kcyBBcnJheTxpbmZlciBVPiA/IGtvLk9ic2VydmFibGVBcnJheTxOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFU+PiA6XG4gICAgVFtLXSBleHRlbmRzIG9iamVjdCA/IGtvLk9ic2VydmFibGU8TmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUW0tdPj4gOiBrby5PYnNlcnZhYmxlPFRbS10+O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvT2JzZXJ2YWJsZU9iamVjdDxUPihvYmo6IFQsIGV4aXN0aW5nPzogTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPik6IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD4ge1xuICAgIFxuICAgIGlmKCFleGlzdGluZykgZXhpc3RpbmcgPSB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+O1xuICAgXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmIGtleSAhPT0gXCJfX2tvX21hcHBpbmdfX1wiICYmIGtleSAhPT0gXCJfaG9zdFwiKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXkgYXMga2V5b2YgVF07XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3Rpbmdba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldID0ga28ub2JzZXJ2YWJsZUFycmF5KHZhbHVlLm1hcChpdGVtID0+IHRvT2JzZXJ2YWJsZU9iamVjdChpdGVtLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiBpdGVtPikpKSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3Rpbmdba2V5XT1lbnN1cmVJc09ic2VydmFibGVBcnJheShleGlzdGluZywga2V5KVxuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldKHZhbHVlLm1hcChpdGVtID0+IHRvT2JzZXJ2YWJsZU9iamVjdChpdGVtLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiBpdGVtPikpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IGtvLm9ic2VydmFibGUodG9PYnNlcnZhYmxlT2JqZWN0KHZhbHVlLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiB2YWx1ZT4pKSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3Rpbmdba2V5XSAgPSBlbnN1cmVJc09ic2VydmFibGUoZXhpc3RpbmcsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0odG9PYnNlcnZhYmxlT2JqZWN0KCh2YWx1ZSBhcyBhbnkpLCAoZXhpc3Rpbmdba2V5XSgpIGFzIGFueSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3Rpbmdba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAoZXhpc3Rpbmdba2V5XSBhcyBhbnkpID0ga28ub2JzZXJ2YWJsZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3Rpbmdba2V5XSA9IGVuc3VyZUlzT2JzZXJ2YWJsZShleGlzdGluZywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSgodmFsdWUgYXMgYW55KSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBleGlzdGluZyBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+O1xufVxuZXhwb3J0IGludGVyZmFjZSBJRGVidWcge1xuICAgIHN1cHBvcnRSZXF1ZXN0RW5hYmxlZD86IGJvb2xlYW47XG4gICAgICBlbmFibGVkOiBib29sZWFuO1xuICAgICAgbG9nVG9Db25zb2xlOiBib29sZWFuO1xuICAgICAgc2hvd0luQXNwZWN0OiBib29sZWFuO1xuICAgICAgbGl2ZUNvbmZpZz86IGJvb2xlYW47XG4gICAgfVxuICBcblxuXG5mdW5jdGlvbiBlbnN1cmVJc09ic2VydmFibGUoZXhpc3Rpbmc6IGFueSwga2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlKGV4aXN0aW5nW2tleV0pKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1trZXldIDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBrby5vYnNlcnZhYmxlKCk7XG4gICAgfVxufVxuXG5cblxuZnVuY3Rpb24gZW5zdXJlSXNPYnNlcnZhYmxlQXJyYXkoZXhpc3Rpbmc6IGFueSwga2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlQXJyYXkoZXhpc3Rpbmdba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nW2tleV0gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgIH1cbn1cblxuLy8gZXhwb3J0IHR5cGUgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBUQ29uZmlnICYge1xuLy8gICAgIGRlYnVnOiBJRGVidWc7XG4vLyAgIH1cblxuLy8gZXhwb3J0IHR5cGUgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+ID0gXG4vLyB7IFtLIGluIGtleW9mIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPl06IGtvLk9ic2VydmFibGU8SUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+W0tdPjsgfVxuXG4vLyBleHBvcnQgaW50ZXJmYWNlIElDb25maWd1cmF0aW9uSG9zdCB7XG4vLyAgICAgX2hvc3Q6IHtcbi8vICAgICAgICAgYmxhZGU6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uQWRkRWRpdFNoYXJlZG87XG4vLyAgICAgICAgIGVuYWJsZWQ6IGtvLk9ic2VydmFibGU8Ym9vbGVhbj47IC8vIFVzaW5nICdhbnknIGZvciByZXR1cm4gdHlwZSBhcyBpdCdzIG5vdCBjbGVhciB3aGF0IHRoZXNlIGZ1bmN0aW9ucyByZXR1cm5cbi8vICAgICAgICAgbW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG87XG4vLyAgICAgfVxuLy8gfVxuXG4vLyBleHBvcnQgdHlwZSBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBJQ29uZmlndXJhdGlvbkhvc3QgJiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPjtcblxuLy8gaW50ZXJmYWNlIFJvb3RPYmplY3Qge1xuLy8gICBsMTogc3RyaW5nO1xuLy8gICBvMTogTzE7XG4vLyB9XG5cbi8vIGludGVyZmFjZSBPMSB7XG4vLyAgIGwyOiBzdHJpbmc7XG4vLyAgIG8yOiBPMjtcbi8vICAgYTE6IEExW107XG4vLyB9XG5cbi8vIGludGVyZmFjZSBBMSB7XG4vLyAgIGw0OiBzdHJpbmc7XG4vLyB9XG5cbi8vIGludGVyZmFjZSBPMiB7XG4vLyAgIGwzOiBzdHJpbmc7XG4vLyB9XG4vLyAvLyBOb3cgbGV0J3MgdXNlIHRoZSBmdW5jdGlvbjpcbi8vIGNvbnN0IHg6IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFJvb3RPYmplY3Q+ID0ge1xuLy8gICAgIGwxOiBcImwxXCIsXG4vLyAgICAgbzE6IHtcbi8vICAgICAgICAgbDI6XCJsMlwiLFxuLy8gICAgICAgICBvMjoge1xuLy8gICAgICAgICAgICAgbDM6IFwibDNcIixcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgYTE6IFtcbi8vICAgICAgICAgICAgIHsgbDQ6IFwibDRcIiB9XG4vLyAgICAgICAgIF1cbi8vICAgICB9LFxuLy8gICAgIGRlYnVnOlxuLy8gICAgIHtcbi8vICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4vLyAgICAgICAgIGxvZ1RvQ29uc29sZTogZmFsc2UsXG4vLyAgICAgICAgIHNob3dJbkFzcGVjdDogZmFsc2Vcbi8vICAgICB9XG4vLyB9XG5cbi8vIGxldCBtIDogIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248Um9vdE9iamVjdD4+XG5cbi8vIGxldCB5ID0gdG9PYnNlcnZhYmxlT2JqZWN0KHgse30gYXMgYW55KSBhcyAgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxSb290T2JqZWN0Pj5cblxuLy8gbGV0IHAgPSB5LmRlYnVnKCkubGl2ZUNvbmZpZyEoKVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlT2JqZWN0KG9iajogYW55LCBleGlzdGluZ09ic2VydmFibGVzPzprby5PYnNlcnZhYmxlPGFueT4pOiBrby5PYnNlcnZhYmxlIHtcbi8vICAgICBjb25zdCByZXN1bHQgPSBleGlzdGluZ09ic2VydmFibGVzIHx8IHt9IGFzIGtvLk9ic2VydmFibGU7XG5cbi8vICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbi8vICAgICAgICAgaWYoa2V5ID09PSBcIl9fa29fbWFwcGluZ19fXCIpIGNvbnRpbnVlO1xuLy8gICAgICAgICBpZihrZXkgPT09IFwiX2hvc3RcIikgY29udGludWU7XG5cbi8vICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbi8vICAgICAgICAgICAgIGxldCBuZXd2ID0gb2JqW2tleV07XG4vLyAgICAgICAgICAgICBsZXQgY3VyciA9IChyZXN1bHQgYXMgYW55KVtrZXldIDtcblxuLy8gICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG5ld3YpICYmIHR5cGVvZiBuZXd2ID09PSBcIm9iamVjdFwiICYmIG5ld3YgIT09IG51bGwgJiYgIWtvLmlzT2JzZXJ2YWJsZShuZXd2KSkge1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0gdG9PYnNlcnZhYmxlT2JqZWN0KG5ld3YgYXMgb2JqZWN0KSBcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRvT2JzZXJ2YWJsZU9iamVjdFwiLCAocmVzdWx0IGFzIGFueSlba2V5XSk7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSBrby5vYnNlcnZhYmxlKChyZXN1bHQgYXMgYW55KVtrZXldKTtcbi8vICAgICAgICAgICAgICAgICBjb250aW51ZTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmV3dikpIHtcbi8vICAgICAgICAgICAgICAgICBpZiAoY3VyciAmJiBrby5pc09ic2VydmFibGVBcnJheShjdXJyKSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XShuZXd2KTtcbi8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IGtvLm9ic2VydmFibGVBcnJheShuZXd2KSBhcyBhbnk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKG5ld3YpKSB7XG4vLyAgICAgICAgICAgICAgICAgbmV3diA9IG5ld3YoKTsgLy8gcHVsbCBvdXQgdGhlIHZhbHVlXG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIGlmIChjdXJyICYmIGtvLmlzT2JzZXJ2YWJsZShjdXJyKSkge1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldKG5ld3YpOyAvLyB1cGRhdGUgdGhlIGV4aXN0aW5nIG9ic2VydmFibGVcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSBrby5vYnNlcnZhYmxlKG5ld3YpO1xuICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyAgICAgcmV0dXJuIHJlc3VsdDtcbi8vIH1cbiIsImltcG9ydCB7IERFQlVHX0RFRkFVTFQgfSBmcm9tIFwiLi4vQmFzZUNsYXNzZXMvRGVidWdEZWZhdWx0c1wiO1xuaW1wb3J0IHsgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZywgSVdpZGdldEpzb24gfSBmcm9tIFwiLi4vQmFzZUNsYXNzZXMvSVdpZGdldEpzb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uIHtcbiAgICBmaWVsZFBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICB0aXRsZTogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbFxuICAgIHZhbHVlT25Ob3RGb3VuZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGNhbGN1bGF0ZWRWYWx1ZTogc3RyaW5nO1xuICAgIGNhbGN1bGF0ZWRUaXRsZTogc3RyaW5nO1xuICAgIGZvcm1hdHRlcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxufVxuXG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0OiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+ID0ge1xuIFxuICAgIGZpZWxkUGF0aDogXCJ0aXRsZVwiLFxuICAgIHRpdGxlOiBudWxsLFxuICAgIGNhbGN1bGF0ZWRWYWx1ZTogXCJcIixcbiAgICBjYWxjdWxhdGVkVGl0bGU6IFwiXCIsXG4gICAgdmFsdWVPbk5vdEZvdW5kOiBcIk5vdCBGb3VuZFwiLFxuICAgIGZvcm1hdHRlcjogXCJ2YWx1ZVwiLC8vaWYocHJpb3JpdHkubmFtZSA9PT0gJ25vcm1hbCcpIHsgICAgICAgICByZXR1cm4gPSAnPHNwYW4gY2xhc3M9XCJub3JtYWxcIj5Ob3JtYWwgUHJpb3JpdHk8L3NwYW4+JzsgICAgIH0gZWxzZSBpZihwcmlvcml0eS5uYW1lID09PSAnaGlnaCcpIHsgICAgICAgICByZXR1cm4gPSAnPHNwYW4gY2xhc3M9XCJoaWdoXCI+SGlnaCBQcmlvcml0eTwvc3Bhbj4nOyAgICAgfSBlbHNlIGlmKHByaW9yaXR5Lm5hbWUgPT09ICd1cmdlbnQnKSB7ICAgICAgICAgcmV0dXJuID0gJzxzcGFuIGNsYXNzPVwidXJnZW50XCI+VXJnZW50IFByaW9yaXR5PC9zcGFuPic7ICAgICB9IGVsc2UgeyAgICAgICAgIHJldHVybiA9ICc8c3Bhbj5Vbmtub3duIFByaW9yaXR5PC9zcGFuPic7ICAgICB9XG4gICAgZGVidWc6IERFQlVHX0RFRkFVTFQoKSxcbiAgICBcbiAgICBldmVudHNUb1JlYWN0VG86IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZXZlbnRQYXRoOiBcInNoYXJlZG8uY29yZS5jYXNlLnBoYXNlLWNoYW5nZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLmNvcmUuY2FzZS5mb3Jtcy5waGFzZS5waGFzZS1jaGFuZ2VkXCIsXG4gICAgICAgICAgICBtZXRob2RUb0NhbGw6IFwibG9hZEFuZEJpbmRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby51cGRhdGVkXCIsXG4gICAgICAgICAgICBtZXRob2RUb0NhbGw6IFwibG9hZEFuZEJpbmRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby5jb3JlLmNhc2Uuc2hhcmVkby11cGRhdGVkXCIsXG4gICAgICAgICAgICBtZXRob2RUb0NhbGw6IFwibG9hZEFuZEJpbmRcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICByZWZyZXNoT246IHtcbiAgICAgICAgc2hhcmVkb0lkQ2hhbmdlZDogdHJ1ZSxcbiAgICAgICAgc2hhcmVkb1BhcmVudElkQ2hhbmdlZDogdHJ1ZSxcbiAgICAgICAgc2hhcmVkb1BoYXNlQ2hhbmdlZDogdHJ1ZSxcbiAgICB9LFxuICAgIGRhdGFTZXR0aW5nczoge1xuICAgICAgICBnZXRWYWx1ZVVzaW5nUGFyZW50czogZmFsc2UsXG4gICAgICAgIG1heERlcHRoOiAwLFxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBjb25zdCBXaWRnZXRTZXR0aW5ncyA6IElXaWRnZXRKc29uPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+ID17XG4gICAgdHlwZTogXCJ3aWRnZXRcIixcbiAgICBcInByaW9yaXR5XCI6IDYwMDAsXG4gICAgXCJkZXNpZ25lclwiOiB7XG4gICAgICAgIFwiYWxsb3dJblBvcnRhbERlc2lnbmVyXCI6IGZhbHNlLFxuICAgICAgICBcImFsbG93SW5TaGFyZWRvUG9ydGFsRGVzaWduZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJhbGxvd0FzcGVjdEFkYXB0ZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJ0aXRsZVwiOiBcIlNpbmdsZSBWYWx1ZSBBc3BlY3RcIixcbiAgICAgICAgXCJpY29uXCI6IFwiZmEtY29nXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJTaW5nbGUgVmFsdWUgQXNwZWN0XCIsXG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbICAgXCJVRCAtIElERUFzcGVjdHNcIl0sXG4gICAgICAgIFwiaXNDb25maWd1cmFibGVcIjogdHJ1ZSxcbiAgICAgICAgXCJjb25maWd1cmF0aW9uV2lkZ2V0XCI6IG51bGwsXG4gICAgICAgIFwiZGVmYXVsdENvbmZpZ3VyYXRpb25Kc29uXCI6IHsgY29uZmlndXJhdGlvbjogRGVmYXVsdH1cbiAgICB9LFxuICAgIFwic2NyaXB0c1wiOiBbXG4gICAgXSxcbiAgICBcInN0eWxlc1wiOiBbXG4gICAgICAgIFwiU2luZ2xlVmFsdWVBc3BlY3QuY3NzXCJcbiAgICBdLFxuICAgIFwidGVtcGxhdGVzXCI6IFtcbiAgICAgICAgXCJTaW5nbGVWYWx1ZUFzcGVjdC5odG1sXCJcbiAgICBdLFxuICAgIFwibWVudVRlbXBsYXRlc1wiOiBbXSxcbiAgICBcImNvbXBvbmVudHNcIjogW11cbn0iLCJcblxuLyoqXG4gKiAqIEZvcm1hdCBhIHZhbHVlIHVzaW5nIGEgZm9ybWF0dGVyIHN0cmluZ1xuICogKiBFeGFtcGxlczogXG4gKiAqIDEuIHZhbHVlXG4gKiAqIDIuIHZhbHVlLnRvVXBwZXJDYXNlKClcbiAqICogMy4gdmFsdWUgPyB2YWx1ZS50b1VwcGVyQ2FzZSgpIDogXCJcIlxuICogKiA0LiB2YWx1ZSA/IHZhbHVlLnRvVXBwZXJDYXNlKCkgOiBcIk5vIFZhbHVlXCJcbiAqICogNS4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlRGF0ZVN0cmluZygpXG4gKiAqIDYuIHZhbHVlID8gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlRGF0ZVN0cmluZygpIDogXCJcIlxuICogQHBhcmFtIHZhbHVlIFxuICogQHBhcmFtIGZvcm1hdHRlciBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VmFsdWUodmFsdWU6IGFueSwgZm9ybWF0dGVyOiBzdHJpbmcpOiBhbnkge1xuICAgIC8vIENyZWF0ZSBhIG5ldyBmdW5jdGlvbiBiYXNlZCBvbiB0aGUgZm9ybWF0dGVyXG4gICAgbGV0IGR5bmFtaWNGdW5jIDogRnVuY3Rpb25cbiAgICBsZXQgcmV0dXJuVmFsdWU6IGFueTtcbiAgICB0cnl7XG4gICAgICAgICBkeW5hbWljRnVuYyA9IG5ldyBGdW5jdGlvbigndmFsdWUnLCBgcmV0dXJuICgke2Zvcm1hdHRlcn0pO2ApO1xuICAgIC8vIEludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gdmFsdWVcbiAgICAgcmV0dXJuVmFsdWUgPSBkeW5hbWljRnVuYyh2YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoKGUpXG4gICAge1xuICAgICAgICByZXR1cm5WYWx1ZSA9IGBFcnJvciBmb3JtYXR0aW5nIHZhbHVlICR7dmFsdWV9IHdpdGggZm9ybWF0dGVyICR7Zm9ybWF0dGVyfSAtICR7ZX1gO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRGdW5jID0gZm9ybWF0VmFsdWU7IC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIGNvbnN0IHV1aWQgPSB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5hdGl2ZS5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVTdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsIm1vZHVsZS5leHBvcnRzID0ga287IiwiaW1wb3J0IGFuc2lTdHlsZXMgZnJvbSAnI2Fuc2ktc3R5bGVzJztcbmltcG9ydCBzdXBwb3J0c0NvbG9yIGZyb20gJyNzdXBwb3J0cy1jb2xvcic7XG5pbXBvcnQgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGltcG9ydC9vcmRlclxuXHRzdHJpbmdSZXBsYWNlQWxsLFxuXHRzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgsXG59IGZyb20gJy4vdXRpbGl0aWVzLmpzJztcblxuY29uc3Qge3N0ZG91dDogc3Rkb3V0Q29sb3IsIHN0ZGVycjogc3RkZXJyQ29sb3J9ID0gc3VwcG9ydHNDb2xvcjtcblxuY29uc3QgR0VORVJBVE9SID0gU3ltYm9sKCdHRU5FUkFUT1InKTtcbmNvbnN0IFNUWUxFUiA9IFN5bWJvbCgnU1RZTEVSJyk7XG5jb25zdCBJU19FTVBUWSA9IFN5bWJvbCgnSVNfRU1QVFknKTtcblxuLy8gYHN1cHBvcnRzQ29sb3IubGV2ZWxgIOKGkiBgYW5zaVN0eWxlcy5jb2xvcltuYW1lXWAgbWFwcGluZ1xuY29uc3QgbGV2ZWxNYXBwaW5nID0gW1xuXHQnYW5zaScsXG5cdCdhbnNpJyxcblx0J2Fuc2kyNTYnLFxuXHQnYW5zaTE2bScsXG5dO1xuXG5jb25zdCBzdHlsZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5jb25zdCBhcHBseU9wdGlvbnMgPSAob2JqZWN0LCBvcHRpb25zID0ge30pID0+IHtcblx0aWYgKG9wdGlvbnMubGV2ZWwgJiYgIShOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubGV2ZWwpICYmIG9wdGlvbnMubGV2ZWwgPj0gMCAmJiBvcHRpb25zLmxldmVsIDw9IDMpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgYGxldmVsYCBvcHRpb24gc2hvdWxkIGJlIGFuIGludGVnZXIgZnJvbSAwIHRvIDMnKTtcblx0fVxuXG5cdC8vIERldGVjdCBsZXZlbCBpZiBub3Qgc2V0IG1hbnVhbGx5XG5cdGNvbnN0IGNvbG9yTGV2ZWwgPSBzdGRvdXRDb2xvciA/IHN0ZG91dENvbG9yLmxldmVsIDogMDtcblx0b2JqZWN0LmxldmVsID0gb3B0aW9ucy5sZXZlbCA9PT0gdW5kZWZpbmVkID8gY29sb3JMZXZlbCA6IG9wdGlvbnMubGV2ZWw7XG59O1xuXG5leHBvcnQgY2xhc3MgQ2hhbGsge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0cnVjdG9yLXJldHVyblxuXHRcdHJldHVybiBjaGFsa0ZhY3Rvcnkob3B0aW9ucyk7XG5cdH1cbn1cblxuY29uc3QgY2hhbGtGYWN0b3J5ID0gb3B0aW9ucyA9PiB7XG5cdGNvbnN0IGNoYWxrID0gKC4uLnN0cmluZ3MpID0+IHN0cmluZ3Muam9pbignICcpO1xuXHRhcHBseU9wdGlvbnMoY2hhbGssIG9wdGlvbnMpO1xuXG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZihjaGFsaywgY3JlYXRlQ2hhbGsucHJvdG90eXBlKTtcblxuXHRyZXR1cm4gY2hhbGs7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDaGFsayhvcHRpb25zKSB7XG5cdHJldHVybiBjaGFsa0ZhY3Rvcnkob3B0aW9ucyk7XG59XG5cbk9iamVjdC5zZXRQcm90b3R5cGVPZihjcmVhdGVDaGFsay5wcm90b3R5cGUsIEZ1bmN0aW9uLnByb3RvdHlwZSk7XG5cbmZvciAoY29uc3QgW3N0eWxlTmFtZSwgc3R5bGVdIG9mIE9iamVjdC5lbnRyaWVzKGFuc2lTdHlsZXMpKSB7XG5cdHN0eWxlc1tzdHlsZU5hbWVdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IGJ1aWxkZXIgPSBjcmVhdGVCdWlsZGVyKHRoaXMsIGNyZWF0ZVN0eWxlcihzdHlsZS5vcGVuLCBzdHlsZS5jbG9zZSwgdGhpc1tTVFlMRVJdKSwgdGhpc1tJU19FTVBUWV0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHN0eWxlTmFtZSwge3ZhbHVlOiBidWlsZGVyfSk7XG5cdFx0XHRyZXR1cm4gYnVpbGRlcjtcblx0XHR9LFxuXHR9O1xufVxuXG5zdHlsZXMudmlzaWJsZSA9IHtcblx0Z2V0KCkge1xuXHRcdGNvbnN0IGJ1aWxkZXIgPSBjcmVhdGVCdWlsZGVyKHRoaXMsIHRoaXNbU1RZTEVSXSwgdHJ1ZSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd2aXNpYmxlJywge3ZhbHVlOiBidWlsZGVyfSk7XG5cdFx0cmV0dXJuIGJ1aWxkZXI7XG5cdH0sXG59O1xuXG5jb25zdCBnZXRNb2RlbEFuc2kgPSAobW9kZWwsIGxldmVsLCB0eXBlLCAuLi5hcmd1bWVudHNfKSA9PiB7XG5cdGlmIChtb2RlbCA9PT0gJ3JnYicpIHtcblx0XHRpZiAobGV2ZWwgPT09ICdhbnNpMTZtJykge1xuXHRcdFx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV0uYW5zaTE2bSguLi5hcmd1bWVudHNfKTtcblx0XHR9XG5cblx0XHRpZiAobGV2ZWwgPT09ICdhbnNpMjU2Jykge1xuXHRcdFx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV0uYW5zaTI1NihhbnNpU3R5bGVzLnJnYlRvQW5zaTI1NiguLi5hcmd1bWVudHNfKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV0uYW5zaShhbnNpU3R5bGVzLnJnYlRvQW5zaSguLi5hcmd1bWVudHNfKSk7XG5cdH1cblxuXHRpZiAobW9kZWwgPT09ICdoZXgnKSB7XG5cdFx0cmV0dXJuIGdldE1vZGVsQW5zaSgncmdiJywgbGV2ZWwsIHR5cGUsIC4uLmFuc2lTdHlsZXMuaGV4VG9SZ2IoLi4uYXJndW1lbnRzXykpO1xuXHR9XG5cblx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV1bbW9kZWxdKC4uLmFyZ3VtZW50c18pO1xufTtcblxuY29uc3QgdXNlZE1vZGVscyA9IFsncmdiJywgJ2hleCcsICdhbnNpMjU2J107XG5cbmZvciAoY29uc3QgbW9kZWwgb2YgdXNlZE1vZGVscykge1xuXHRzdHlsZXNbbW9kZWxdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IHtsZXZlbH0gPSB0aGlzO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0XHRcdGNvbnN0IHN0eWxlciA9IGNyZWF0ZVN0eWxlcihnZXRNb2RlbEFuc2kobW9kZWwsIGxldmVsTWFwcGluZ1tsZXZlbF0sICdjb2xvcicsIC4uLmFyZ3VtZW50c18pLCBhbnNpU3R5bGVzLmNvbG9yLmNsb3NlLCB0aGlzW1NUWUxFUl0pO1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlQnVpbGRlcih0aGlzLCBzdHlsZXIsIHRoaXNbSVNfRU1QVFldKTtcblx0XHRcdH07XG5cdFx0fSxcblx0fTtcblxuXHRjb25zdCBiZ01vZGVsID0gJ2JnJyArIG1vZGVsWzBdLnRvVXBwZXJDYXNlKCkgKyBtb2RlbC5zbGljZSgxKTtcblx0c3R5bGVzW2JnTW9kZWxdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IHtsZXZlbH0gPSB0aGlzO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0XHRcdGNvbnN0IHN0eWxlciA9IGNyZWF0ZVN0eWxlcihnZXRNb2RlbEFuc2kobW9kZWwsIGxldmVsTWFwcGluZ1tsZXZlbF0sICdiZ0NvbG9yJywgLi4uYXJndW1lbnRzXyksIGFuc2lTdHlsZXMuYmdDb2xvci5jbG9zZSwgdGhpc1tTVFlMRVJdKTtcblx0XHRcdFx0cmV0dXJuIGNyZWF0ZUJ1aWxkZXIodGhpcywgc3R5bGVyLCB0aGlzW0lTX0VNUFRZXSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cdH07XG59XG5cbmNvbnN0IHByb3RvID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoKCkgPT4ge30sIHtcblx0Li4uc3R5bGVzLFxuXHRsZXZlbDoge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIHRoaXNbR0VORVJBVE9SXS5sZXZlbDtcblx0XHR9LFxuXHRcdHNldChsZXZlbCkge1xuXHRcdFx0dGhpc1tHRU5FUkFUT1JdLmxldmVsID0gbGV2ZWw7XG5cdFx0fSxcblx0fSxcbn0pO1xuXG5jb25zdCBjcmVhdGVTdHlsZXIgPSAob3BlbiwgY2xvc2UsIHBhcmVudCkgPT4ge1xuXHRsZXQgb3BlbkFsbDtcblx0bGV0IGNsb3NlQWxsO1xuXHRpZiAocGFyZW50ID09PSB1bmRlZmluZWQpIHtcblx0XHRvcGVuQWxsID0gb3Blbjtcblx0XHRjbG9zZUFsbCA9IGNsb3NlO1xuXHR9IGVsc2Uge1xuXHRcdG9wZW5BbGwgPSBwYXJlbnQub3BlbkFsbCArIG9wZW47XG5cdFx0Y2xvc2VBbGwgPSBjbG9zZSArIHBhcmVudC5jbG9zZUFsbDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0b3Blbixcblx0XHRjbG9zZSxcblx0XHRvcGVuQWxsLFxuXHRcdGNsb3NlQWxsLFxuXHRcdHBhcmVudCxcblx0fTtcbn07XG5cbmNvbnN0IGNyZWF0ZUJ1aWxkZXIgPSAoc2VsZiwgX3N0eWxlciwgX2lzRW1wdHkpID0+IHtcblx0Ly8gU2luZ2xlIGFyZ3VtZW50IGlzIGhvdCBwYXRoLCBpbXBsaWNpdCBjb2VyY2lvbiBpcyBmYXN0ZXIgdGhhbiBhbnl0aGluZ1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8taW1wbGljaXQtY29lcmNpb25cblx0Y29uc3QgYnVpbGRlciA9ICguLi5hcmd1bWVudHNfKSA9PiBhcHBseVN0eWxlKGJ1aWxkZXIsIChhcmd1bWVudHNfLmxlbmd0aCA9PT0gMSkgPyAoJycgKyBhcmd1bWVudHNfWzBdKSA6IGFyZ3VtZW50c18uam9pbignICcpKTtcblxuXHQvLyBXZSBhbHRlciB0aGUgcHJvdG90eXBlIGJlY2F1c2Ugd2UgbXVzdCByZXR1cm4gYSBmdW5jdGlvbiwgYnV0IHRoZXJlIGlzXG5cdC8vIG5vIHdheSB0byBjcmVhdGUgYSBmdW5jdGlvbiB3aXRoIGEgZGlmZmVyZW50IHByb3RvdHlwZVxuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YoYnVpbGRlciwgcHJvdG8pO1xuXG5cdGJ1aWxkZXJbR0VORVJBVE9SXSA9IHNlbGY7XG5cdGJ1aWxkZXJbU1RZTEVSXSA9IF9zdHlsZXI7XG5cdGJ1aWxkZXJbSVNfRU1QVFldID0gX2lzRW1wdHk7XG5cblx0cmV0dXJuIGJ1aWxkZXI7XG59O1xuXG5jb25zdCBhcHBseVN0eWxlID0gKHNlbGYsIHN0cmluZykgPT4ge1xuXHRpZiAoc2VsZi5sZXZlbCA8PSAwIHx8ICFzdHJpbmcpIHtcblx0XHRyZXR1cm4gc2VsZltJU19FTVBUWV0gPyAnJyA6IHN0cmluZztcblx0fVxuXG5cdGxldCBzdHlsZXIgPSBzZWxmW1NUWUxFUl07XG5cblx0aWYgKHN0eWxlciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHN0cmluZztcblx0fVxuXG5cdGNvbnN0IHtvcGVuQWxsLCBjbG9zZUFsbH0gPSBzdHlsZXI7XG5cdGlmIChzdHJpbmcuaW5jbHVkZXMoJ1xcdTAwMUInKSkge1xuXHRcdHdoaWxlIChzdHlsZXIgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Ly8gUmVwbGFjZSBhbnkgaW5zdGFuY2VzIGFscmVhZHkgcHJlc2VudCB3aXRoIGEgcmUtb3BlbmluZyBjb2RlXG5cdFx0XHQvLyBvdGhlcndpc2Ugb25seSB0aGUgcGFydCBvZiB0aGUgc3RyaW5nIHVudGlsIHNhaWQgY2xvc2luZyBjb2RlXG5cdFx0XHQvLyB3aWxsIGJlIGNvbG9yZWQsIGFuZCB0aGUgcmVzdCB3aWxsIHNpbXBseSBiZSAncGxhaW4nLlxuXHRcdFx0c3RyaW5nID0gc3RyaW5nUmVwbGFjZUFsbChzdHJpbmcsIHN0eWxlci5jbG9zZSwgc3R5bGVyLm9wZW4pO1xuXG5cdFx0XHRzdHlsZXIgPSBzdHlsZXIucGFyZW50O1xuXHRcdH1cblx0fVxuXG5cdC8vIFdlIGNhbiBtb3ZlIGJvdGggbmV4dCBhY3Rpb25zIG91dCBvZiBsb29wLCBiZWNhdXNlIHJlbWFpbmluZyBhY3Rpb25zIGluIGxvb3Agd29uJ3QgaGF2ZVxuXHQvLyBhbnkvdmlzaWJsZSBlZmZlY3Qgb24gcGFydHMgd2UgYWRkIGhlcmUuIENsb3NlIHRoZSBzdHlsaW5nIGJlZm9yZSBhIGxpbmVicmVhayBhbmQgcmVvcGVuXG5cdC8vIGFmdGVyIG5leHQgbGluZSB0byBmaXggYSBibGVlZCBpc3N1ZSBvbiBtYWNPUzogaHR0cHM6Ly9naXRodWIuY29tL2NoYWxrL2NoYWxrL3B1bGwvOTJcblx0Y29uc3QgbGZJbmRleCA9IHN0cmluZy5pbmRleE9mKCdcXG4nKTtcblx0aWYgKGxmSW5kZXggIT09IC0xKSB7XG5cdFx0c3RyaW5nID0gc3RyaW5nRW5jYXNlQ1JMRldpdGhGaXJzdEluZGV4KHN0cmluZywgY2xvc2VBbGwsIG9wZW5BbGwsIGxmSW5kZXgpO1xuXHR9XG5cblx0cmV0dXJuIG9wZW5BbGwgKyBzdHJpbmcgKyBjbG9zZUFsbDtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNyZWF0ZUNoYWxrLnByb3RvdHlwZSwgc3R5bGVzKTtcblxuY29uc3QgY2hhbGsgPSBjcmVhdGVDaGFsaygpO1xuZXhwb3J0IGNvbnN0IGNoYWxrU3RkZXJyID0gY3JlYXRlQ2hhbGsoe2xldmVsOiBzdGRlcnJDb2xvciA/IHN0ZGVyckNvbG9yLmxldmVsIDogMH0pO1xuXG5leHBvcnQge1xuXHRtb2RpZmllck5hbWVzLFxuXHRmb3JlZ3JvdW5kQ29sb3JOYW1lcyxcblx0YmFja2dyb3VuZENvbG9yTmFtZXMsXG5cdGNvbG9yTmFtZXMsXG5cblx0Ly8gVE9ETzogUmVtb3ZlIHRoZXNlIGFsaWFzZXMgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvblxuXHRtb2RpZmllck5hbWVzIGFzIG1vZGlmaWVycyxcblx0Zm9yZWdyb3VuZENvbG9yTmFtZXMgYXMgZm9yZWdyb3VuZENvbG9ycyxcblx0YmFja2dyb3VuZENvbG9yTmFtZXMgYXMgYmFja2dyb3VuZENvbG9ycyxcblx0Y29sb3JOYW1lcyBhcyBjb2xvcnMsXG59IGZyb20gJy4vdmVuZG9yL2Fuc2ktc3R5bGVzL2luZGV4LmpzJztcblxuZXhwb3J0IHtcblx0c3Rkb3V0Q29sb3IgYXMgc3VwcG9ydHNDb2xvcixcblx0c3RkZXJyQ29sb3IgYXMgc3VwcG9ydHNDb2xvclN0ZGVycixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNoYWxrO1xuIiwiLy8gVE9ETzogV2hlbiB0YXJnZXRpbmcgTm9kZS5qcyAxNiwgdXNlIGBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VBbGxgLlxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1JlcGxhY2VBbGwoc3RyaW5nLCBzdWJzdHJpbmcsIHJlcGxhY2VyKSB7XG5cdGxldCBpbmRleCA9IHN0cmluZy5pbmRleE9mKHN1YnN0cmluZyk7XG5cdGlmIChpbmRleCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gc3RyaW5nO1xuXHR9XG5cblx0Y29uc3Qgc3Vic3RyaW5nTGVuZ3RoID0gc3Vic3RyaW5nLmxlbmd0aDtcblx0bGV0IGVuZEluZGV4ID0gMDtcblx0bGV0IHJldHVyblZhbHVlID0gJyc7XG5cdGRvIHtcblx0XHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgsIGluZGV4KSArIHN1YnN0cmluZyArIHJlcGxhY2VyO1xuXHRcdGVuZEluZGV4ID0gaW5kZXggKyBzdWJzdHJpbmdMZW5ndGg7XG5cdFx0aW5kZXggPSBzdHJpbmcuaW5kZXhPZihzdWJzdHJpbmcsIGVuZEluZGV4KTtcblx0fSB3aGlsZSAoaW5kZXggIT09IC0xKTtcblxuXHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgpO1xuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgoc3RyaW5nLCBwcmVmaXgsIHBvc3RmaXgsIGluZGV4KSB7XG5cdGxldCBlbmRJbmRleCA9IDA7XG5cdGxldCByZXR1cm5WYWx1ZSA9ICcnO1xuXHRkbyB7XG5cdFx0Y29uc3QgZ290Q1IgPSBzdHJpbmdbaW5kZXggLSAxXSA9PT0gJ1xccic7XG5cdFx0cmV0dXJuVmFsdWUgKz0gc3RyaW5nLnNsaWNlKGVuZEluZGV4LCAoZ290Q1IgPyBpbmRleCAtIDEgOiBpbmRleCkpICsgcHJlZml4ICsgKGdvdENSID8gJ1xcclxcbicgOiAnXFxuJykgKyBwb3N0Zml4O1xuXHRcdGVuZEluZGV4ID0gaW5kZXggKyAxO1xuXHRcdGluZGV4ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicsIGVuZEluZGV4KTtcblx0fSB3aGlsZSAoaW5kZXggIT09IC0xKTtcblxuXHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgpO1xuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XG59XG4iLCJjb25zdCBBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUID0gMTA7XG5cbmNvbnN0IHdyYXBBbnNpMTYgPSAob2Zmc2V0ID0gMCkgPT4gY29kZSA9PiBgXFx1MDAxQlske2NvZGUgKyBvZmZzZXR9bWA7XG5cbmNvbnN0IHdyYXBBbnNpMjU2ID0gKG9mZnNldCA9IDApID0+IGNvZGUgPT4gYFxcdTAwMUJbJHszOCArIG9mZnNldH07NTske2NvZGV9bWA7XG5cbmNvbnN0IHdyYXBBbnNpMTZtID0gKG9mZnNldCA9IDApID0+IChyZWQsIGdyZWVuLCBibHVlKSA9PiBgXFx1MDAxQlskezM4ICsgb2Zmc2V0fTsyOyR7cmVkfTske2dyZWVufTske2JsdWV9bWA7XG5cbmNvbnN0IHN0eWxlcyA9IHtcblx0bW9kaWZpZXI6IHtcblx0XHRyZXNldDogWzAsIDBdLFxuXHRcdC8vIDIxIGlzbid0IHdpZGVseSBzdXBwb3J0ZWQgYW5kIDIyIGRvZXMgdGhlIHNhbWUgdGhpbmdcblx0XHRib2xkOiBbMSwgMjJdLFxuXHRcdGRpbTogWzIsIDIyXSxcblx0XHRpdGFsaWM6IFszLCAyM10sXG5cdFx0dW5kZXJsaW5lOiBbNCwgMjRdLFxuXHRcdG92ZXJsaW5lOiBbNTMsIDU1XSxcblx0XHRpbnZlcnNlOiBbNywgMjddLFxuXHRcdGhpZGRlbjogWzgsIDI4XSxcblx0XHRzdHJpa2V0aHJvdWdoOiBbOSwgMjldLFxuXHR9LFxuXHRjb2xvcjoge1xuXHRcdGJsYWNrOiBbMzAsIDM5XSxcblx0XHRyZWQ6IFszMSwgMzldLFxuXHRcdGdyZWVuOiBbMzIsIDM5XSxcblx0XHR5ZWxsb3c6IFszMywgMzldLFxuXHRcdGJsdWU6IFszNCwgMzldLFxuXHRcdG1hZ2VudGE6IFszNSwgMzldLFxuXHRcdGN5YW46IFszNiwgMzldLFxuXHRcdHdoaXRlOiBbMzcsIDM5XSxcblxuXHRcdC8vIEJyaWdodCBjb2xvclxuXHRcdGJsYWNrQnJpZ2h0OiBbOTAsIDM5XSxcblx0XHRncmF5OiBbOTAsIDM5XSwgLy8gQWxpYXMgb2YgYGJsYWNrQnJpZ2h0YFxuXHRcdGdyZXk6IFs5MCwgMzldLCAvLyBBbGlhcyBvZiBgYmxhY2tCcmlnaHRgXG5cdFx0cmVkQnJpZ2h0OiBbOTEsIDM5XSxcblx0XHRncmVlbkJyaWdodDogWzkyLCAzOV0sXG5cdFx0eWVsbG93QnJpZ2h0OiBbOTMsIDM5XSxcblx0XHRibHVlQnJpZ2h0OiBbOTQsIDM5XSxcblx0XHRtYWdlbnRhQnJpZ2h0OiBbOTUsIDM5XSxcblx0XHRjeWFuQnJpZ2h0OiBbOTYsIDM5XSxcblx0XHR3aGl0ZUJyaWdodDogWzk3LCAzOV0sXG5cdH0sXG5cdGJnQ29sb3I6IHtcblx0XHRiZ0JsYWNrOiBbNDAsIDQ5XSxcblx0XHRiZ1JlZDogWzQxLCA0OV0sXG5cdFx0YmdHcmVlbjogWzQyLCA0OV0sXG5cdFx0YmdZZWxsb3c6IFs0MywgNDldLFxuXHRcdGJnQmx1ZTogWzQ0LCA0OV0sXG5cdFx0YmdNYWdlbnRhOiBbNDUsIDQ5XSxcblx0XHRiZ0N5YW46IFs0NiwgNDldLFxuXHRcdGJnV2hpdGU6IFs0NywgNDldLFxuXG5cdFx0Ly8gQnJpZ2h0IGNvbG9yXG5cdFx0YmdCbGFja0JyaWdodDogWzEwMCwgNDldLFxuXHRcdGJnR3JheTogWzEwMCwgNDldLCAvLyBBbGlhcyBvZiBgYmdCbGFja0JyaWdodGBcblx0XHRiZ0dyZXk6IFsxMDAsIDQ5XSwgLy8gQWxpYXMgb2YgYGJnQmxhY2tCcmlnaHRgXG5cdFx0YmdSZWRCcmlnaHQ6IFsxMDEsIDQ5XSxcblx0XHRiZ0dyZWVuQnJpZ2h0OiBbMTAyLCA0OV0sXG5cdFx0YmdZZWxsb3dCcmlnaHQ6IFsxMDMsIDQ5XSxcblx0XHRiZ0JsdWVCcmlnaHQ6IFsxMDQsIDQ5XSxcblx0XHRiZ01hZ2VudGFCcmlnaHQ6IFsxMDUsIDQ5XSxcblx0XHRiZ0N5YW5CcmlnaHQ6IFsxMDYsIDQ5XSxcblx0XHRiZ1doaXRlQnJpZ2h0OiBbMTA3LCA0OV0sXG5cdH0sXG59O1xuXG5leHBvcnQgY29uc3QgbW9kaWZpZXJOYW1lcyA9IE9iamVjdC5rZXlzKHN0eWxlcy5tb2RpZmllcik7XG5leHBvcnQgY29uc3QgZm9yZWdyb3VuZENvbG9yTmFtZXMgPSBPYmplY3Qua2V5cyhzdHlsZXMuY29sb3IpO1xuZXhwb3J0IGNvbnN0IGJhY2tncm91bmRDb2xvck5hbWVzID0gT2JqZWN0LmtleXMoc3R5bGVzLmJnQ29sb3IpO1xuZXhwb3J0IGNvbnN0IGNvbG9yTmFtZXMgPSBbLi4uZm9yZWdyb3VuZENvbG9yTmFtZXMsIC4uLmJhY2tncm91bmRDb2xvck5hbWVzXTtcblxuZnVuY3Rpb24gYXNzZW1ibGVTdHlsZXMoKSB7XG5cdGNvbnN0IGNvZGVzID0gbmV3IE1hcCgpO1xuXG5cdGZvciAoY29uc3QgW2dyb3VwTmFtZSwgZ3JvdXBdIG9mIE9iamVjdC5lbnRyaWVzKHN0eWxlcykpIHtcblx0XHRmb3IgKGNvbnN0IFtzdHlsZU5hbWUsIHN0eWxlXSBvZiBPYmplY3QuZW50cmllcyhncm91cCkpIHtcblx0XHRcdHN0eWxlc1tzdHlsZU5hbWVdID0ge1xuXHRcdFx0XHRvcGVuOiBgXFx1MDAxQlske3N0eWxlWzBdfW1gLFxuXHRcdFx0XHRjbG9zZTogYFxcdTAwMUJbJHtzdHlsZVsxXX1tYCxcblx0XHRcdH07XG5cblx0XHRcdGdyb3VwW3N0eWxlTmFtZV0gPSBzdHlsZXNbc3R5bGVOYW1lXTtcblxuXHRcdFx0Y29kZXMuc2V0KHN0eWxlWzBdLCBzdHlsZVsxXSk7XG5cdFx0fVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgZ3JvdXBOYW1lLCB7XG5cdFx0XHR2YWx1ZTogZ3JvdXAsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9KTtcblx0fVxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdHlsZXMsICdjb2RlcycsIHtcblx0XHR2YWx1ZTogY29kZXMsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdH0pO1xuXG5cdHN0eWxlcy5jb2xvci5jbG9zZSA9ICdcXHUwMDFCWzM5bSc7XG5cdHN0eWxlcy5iZ0NvbG9yLmNsb3NlID0gJ1xcdTAwMUJbNDltJztcblxuXHRzdHlsZXMuY29sb3IuYW5zaSA9IHdyYXBBbnNpMTYoKTtcblx0c3R5bGVzLmNvbG9yLmFuc2kyNTYgPSB3cmFwQW5zaTI1NigpO1xuXHRzdHlsZXMuY29sb3IuYW5zaTE2bSA9IHdyYXBBbnNpMTZtKCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kgPSB3cmFwQW5zaTE2KEFOU0lfQkFDS0dST1VORF9PRkZTRVQpO1xuXHRzdHlsZXMuYmdDb2xvci5hbnNpMjU2ID0gd3JhcEFuc2kyNTYoQU5TSV9CQUNLR1JPVU5EX09GRlNFVCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kxNm0gPSB3cmFwQW5zaTE2bShBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUKTtcblxuXHQvLyBGcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9RaXgtL2NvbG9yLWNvbnZlcnQvYmxvYi8zZjBlMGQ0ZTkyZTIzNTc5NmNjYjE3ZjZlODVjNzIwOTRhNjUxZjQ5L2NvbnZlcnNpb25zLmpzXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHN0eWxlcywge1xuXHRcdHJnYlRvQW5zaTI1Njoge1xuXHRcdFx0dmFsdWUocmVkLCBncmVlbiwgYmx1ZSkge1xuXHRcdFx0XHQvLyBXZSB1c2UgdGhlIGV4dGVuZGVkIGdyZXlzY2FsZSBwYWxldHRlIGhlcmUsIHdpdGggdGhlIGV4Y2VwdGlvbiBvZlxuXHRcdFx0XHQvLyBibGFjayBhbmQgd2hpdGUuIG5vcm1hbCBwYWxldHRlIG9ubHkgaGFzIDQgZ3JleXNjYWxlIHNoYWRlcy5cblx0XHRcdFx0aWYgKHJlZCA9PT0gZ3JlZW4gJiYgZ3JlZW4gPT09IGJsdWUpIHtcblx0XHRcdFx0XHRpZiAocmVkIDwgOCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDE2O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChyZWQgPiAyNDgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAyMzE7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIE1hdGgucm91bmQoKChyZWQgLSA4KSAvIDI0NykgKiAyNCkgKyAyMzI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gMTZcblx0XHRcdFx0XHQrICgzNiAqIE1hdGgucm91bmQocmVkIC8gMjU1ICogNSkpXG5cdFx0XHRcdFx0KyAoNiAqIE1hdGgucm91bmQoZ3JlZW4gLyAyNTUgKiA1KSlcblx0XHRcdFx0XHQrIE1hdGgucm91bmQoYmx1ZSAvIDI1NSAqIDUpO1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0aGV4VG9SZ2I6IHtcblx0XHRcdHZhbHVlKGhleCkge1xuXHRcdFx0XHRjb25zdCBtYXRjaGVzID0gL1thLWZcXGRdezZ9fFthLWZcXGRdezN9L2kuZXhlYyhoZXgudG9TdHJpbmcoMTYpKTtcblx0XHRcdFx0aWYgKCFtYXRjaGVzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFswLCAwLCAwXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBbY29sb3JTdHJpbmddID0gbWF0Y2hlcztcblxuXHRcdFx0XHRpZiAoY29sb3JTdHJpbmcubGVuZ3RoID09PSAzKSB7XG5cdFx0XHRcdFx0Y29sb3JTdHJpbmcgPSBbLi4uY29sb3JTdHJpbmddLm1hcChjaGFyYWN0ZXIgPT4gY2hhcmFjdGVyICsgY2hhcmFjdGVyKS5qb2luKCcnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IGludGVnZXIgPSBOdW1iZXIucGFyc2VJbnQoY29sb3JTdHJpbmcsIDE2KTtcblxuXHRcdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblx0XHRcdFx0XHQoaW50ZWdlciA+PiAxNikgJiAweEZGLFxuXHRcdFx0XHRcdChpbnRlZ2VyID4+IDgpICYgMHhGRixcblx0XHRcdFx0XHRpbnRlZ2VyICYgMHhGRixcblx0XHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWJpdHdpc2UgKi9cblx0XHRcdFx0XTtcblx0XHRcdH0sXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGhleFRvQW5zaTI1Njoge1xuXHRcdFx0dmFsdWU6IGhleCA9PiBzdHlsZXMucmdiVG9BbnNpMjU2KC4uLnN0eWxlcy5oZXhUb1JnYihoZXgpKSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0YW5zaTI1NlRvQW5zaToge1xuXHRcdFx0dmFsdWUoY29kZSkge1xuXHRcdFx0XHRpZiAoY29kZSA8IDgpIHtcblx0XHRcdFx0XHRyZXR1cm4gMzAgKyBjb2RlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGNvZGUgPCAxNikge1xuXHRcdFx0XHRcdHJldHVybiA5MCArIChjb2RlIC0gOCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgcmVkO1xuXHRcdFx0XHRsZXQgZ3JlZW47XG5cdFx0XHRcdGxldCBibHVlO1xuXG5cdFx0XHRcdGlmIChjb2RlID49IDIzMikge1xuXHRcdFx0XHRcdHJlZCA9ICgoKGNvZGUgLSAyMzIpICogMTApICsgOCkgLyAyNTU7XG5cdFx0XHRcdFx0Z3JlZW4gPSByZWQ7XG5cdFx0XHRcdFx0Ymx1ZSA9IHJlZDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb2RlIC09IDE2O1xuXG5cdFx0XHRcdFx0Y29uc3QgcmVtYWluZGVyID0gY29kZSAlIDM2O1xuXG5cdFx0XHRcdFx0cmVkID0gTWF0aC5mbG9vcihjb2RlIC8gMzYpIC8gNTtcblx0XHRcdFx0XHRncmVlbiA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gNikgLyA1O1xuXHRcdFx0XHRcdGJsdWUgPSAocmVtYWluZGVyICUgNikgLyA1O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgdmFsdWUgPSBNYXRoLm1heChyZWQsIGdyZWVuLCBibHVlKSAqIDI7XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIDMwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdFx0bGV0IHJlc3VsdCA9IDMwICsgKChNYXRoLnJvdW5kKGJsdWUpIDw8IDIpIHwgKE1hdGgucm91bmQoZ3JlZW4pIDw8IDEpIHwgTWF0aC5yb3VuZChyZWQpKTtcblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IDIpIHtcblx0XHRcdFx0XHRyZXN1bHQgKz0gNjA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0cmdiVG9BbnNpOiB7XG5cdFx0XHR2YWx1ZTogKHJlZCwgZ3JlZW4sIGJsdWUpID0+IHN0eWxlcy5hbnNpMjU2VG9BbnNpKHN0eWxlcy5yZ2JUb0Fuc2kyNTYocmVkLCBncmVlbiwgYmx1ZSkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRoZXhUb0Fuc2k6IHtcblx0XHRcdHZhbHVlOiBoZXggPT4gc3R5bGVzLmFuc2kyNTZUb0Fuc2koc3R5bGVzLmhleFRvQW5zaTI1NihoZXgpKSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdH0pO1xuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmNvbnN0IGFuc2lTdHlsZXMgPSBhc3NlbWJsZVN0eWxlcygpO1xuXG5leHBvcnQgZGVmYXVsdCBhbnNpU3R5bGVzO1xuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbmNvbnN0IGxldmVsID0gKCgpID0+IHtcblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnREYXRhKSB7XG5cdFx0Y29uc3QgYnJhbmQgPSBuYXZpZ2F0b3IudXNlckFnZW50RGF0YS5icmFuZHMuZmluZCgoe2JyYW5kfSkgPT4gYnJhbmQgPT09ICdDaHJvbWl1bScpO1xuXHRcdGlmIChicmFuZCAmJiBicmFuZC52ZXJzaW9uID4gOTMpIHtcblx0XHRcdHJldHVybiAzO1xuXHRcdH1cblx0fVxuXG5cdGlmICgvXFxiKENocm9tZXxDaHJvbWl1bSlcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdHJldHVybiAwO1xufSkoKTtcblxuY29uc3QgY29sb3JTdXBwb3J0ID0gbGV2ZWwgIT09IDAgJiYge1xuXHRsZXZlbCxcblx0aGFzQmFzaWM6IHRydWUsXG5cdGhhczI1NjogbGV2ZWwgPj0gMixcblx0aGFzMTZtOiBsZXZlbCA+PSAzLFxufTtcblxuY29uc3Qgc3VwcG9ydHNDb2xvciA9IHtcblx0c3Rkb3V0OiBjb2xvclN1cHBvcnQsXG5cdHN0ZGVycjogY29sb3JTdXBwb3J0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydHNDb2xvcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcclxuaW1wb3J0IHsgZm9ybWF0VmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vaGVscGVycy9Gb3JtYXR0ZXJcIjtcclxuaW1wb3J0IHsgc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9hcGkvc2VhcmNoRm9yQXR0cmlidXRlV2l0aFBhcmVudHNcIjtcclxuaW1wb3J0IHsgQmFzZUlERUFzcGVjdCB9IGZyb20gXCIuLi9CYXNlQ2xhc3Nlcy9CYXNlSURFQXNwZWN0XCI7XHJcbmltcG9ydCB7IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWcsIElXaWRnZXRKc29uIH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0lXaWRnZXRKc29uXCI7XHJcbmltcG9ydCB7IERlZmF1bHQsIElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24sIFdpZGdldFNldHRpbmdzIH0gZnJvbSBcIi4vU2luZ2xlVmFsdWVBc3BlY3RDb25maWdcIjtcclxuXHJcbmxldCB0aGlzV2lkZ2V0U3lzdGVtTmFtZSA9IFwiU2luZ2xlVmFsdWVBc3BlY3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaW5nbGVWYWx1ZUFzcGVjdCBleHRlbmRzIEJhc2VJREVBc3BlY3Q8SVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbiwgYW55PiB7XHJcbiAgICBsaXZlQ29uZmlndXJhdGlvblJlZnJlc2hlZCgpOiB2b2lkIHtcclxuICAgICAgICAvL25vdGhpbmdcclxuICAgIH1cclxuICAgIHJlZnJlc2gobmV3Q29uZmlnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL25vdGhpbmdcclxuICAgIH1cclxuICAgIHJlc2V0KG5ld0NvbmZpZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy9ub3RoaW5nXHJcbiAgICB9XHJcbiAgICBzZXRUaGlzQ29tcG9uZW50TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNpbmdsZVZhbHVlQXNwZWN0XCI7XHJcbiAgICB9XHJcbiAgICBzZXRXaWRnZXRKc29uU2V0dGluZ3MoKTogSVdpZGdldEpzb248SVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiBXaWRnZXRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBzZXREZWZhdWx0cygpOiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+IHtcclxuICAgICAgICByZXR1cm4gIERlZmF1bHRcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbDogYW55KSB7XHJcbiAgICAvLyAgICAgc3VwZXIoXCJTaW5nbGVWYWx1ZUFzcGVjdFwiLCBcImFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyXCIsIGVsZW1lbnQsIGNvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbClcclxuICAgIC8vICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcml2YXRlIGluaXRpYWxpc2UoKSB7Ly8hIE5vdGU6IFVJIGZyYW1ld29yayBsb29rcyBmb3IgdGhpcyBtZXRob2QgbmFtZSBhbmQgaWYgZm91bmQgYmVoYXZlcyBkaWZmZXJlbnRseSBhbmQgd29udCBjYWxsIGxvYWRBbmRCaW5kXHJcblxyXG4gICAgYXN5bmMgc2V0dXAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLm9wdGlvbnM/LnRpdGxlKCkgfHwgXCJUaXRsZSBWYWx1ZVwiXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcCB0aGUgcm9sZUNvbmZpZ01vZGVsc1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz8uZmllbGRQYXRoLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJGaWVsZCBwYXRoIGNoYW5nZWRcIiwgXCJncmVlblwiLG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQW5kQmluZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz8uY2FsY3VsYXRlZFRpdGxlKHRoaXMub3B0aW9ucz8udGl0bGUoKSB8fCBcIlRpdGxlIFZhbHVlXCIpO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz8udGl0bGUuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhcIlRpdGxlIGNoYW5nZWRcIiwgXCJncmVlblwiLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmKG5ld1ZhbHVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zPy5jYWxjdWxhdGVkVGl0bGUobmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcnJpZGUgbG9hZEFuZEJpbmQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBkYXRhIChtb2RlbCkgcGFzc2VkIGluXCIsIFwiZ3JlZW5cIik7XHJcbiAgICAgICAgLy8gc3VwZXIubG9hZEFuZEJpbmQoKTsgLy9ObyBuZWVkIHRvIGxvYWQgYW5kIGJpbmQgYXMgd2UgYXJlIG5vdCB1c2luZyB0aGUgYmFzZSBtb2RlbFxyXG5cclxuICAgICAgICBsZXQgc2hhcmVkb0lkID0gdGhpcy5zaGFyZWRvSWQoKTtcclxuXHJcbiAgICAgICAgaWYoIXNoYXJlZG9JZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gc2hhcmVkb0lkIHBhc3NlZCBpblwiLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXRoaXMub3B0aW9ucz8uZmllbGRQYXRoKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGZpZWxkIHBhdGggcGFzc2VkIGluXCIsIFwicmVkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUoc2hhcmVkb0lkLCB0aGlzLm9wdGlvbnM/LmZpZWxkUGF0aCgpISwgdGhpcy5vcHRpb25zPy5kYXRhU2V0dGluZ3MoKS5nZXRWYWx1ZVVzaW5nUGFyZW50cygpLCB0aGlzLm9wdGlvbnM/LmRhdGFTZXR0aW5ncygpLm1heERlcHRoKCkpLnRoZW4oKGRhdGEpPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGF0YSB8fCBkYXRhLmZvdW5kID09IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGRhdGEgcmV0dXJuZWRcIiwgXCJyZWRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnM/LmNhbGN1bGF0ZWRWYWx1ZSh0aGlzLm9wdGlvbnM/LnZhbHVlT25Ob3RGb3VuZCgpIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0VmFsdWUoZGF0YS52YWx1ZSwgdGhpcy5vcHRpb25zPy5mb3JtYXR0ZXIoKSB8fCBcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zPy5jYWxjdWxhdGVkVmFsdWUoZm9ybWF0dGVkVmFsdWUgfHwgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgb3ZlcnJpZGUgYXN5bmMgb25TYXZlKG1vZGVsOiBhbnkpIHtcclxuXHJcbiAgICAgICAgdGhpcy5sb2coXCJObyBTYXZlIEltcGxlbWVudGVkXCIsIFwiZ3JlZW5cIik7XHJcbiAgICAgICAgLy8gc3VwZXIub25TYXZlKG1vZGVsKTtcclxuXHJcbiAgICB9O1xyXG59ICJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==