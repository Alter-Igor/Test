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

/***/ "./src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspect.ts":
/*!************************************************************************!*\
  !*** ./src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspect.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./src/WebBased/PortalWidgets/SingleValuePortalWidget/SingleValuePortalWidgetConfig.ts":
/*!*********************************************************************************************!*\
  !*** ./src/WebBased/PortalWidgets/SingleValuePortalWidget/SingleValuePortalWidgetConfig.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingleValuePortalDefault: () => (/* binding */ SingleValuePortalDefault),
/* harmony export */   WidgetSettings: () => (/* binding */ WidgetSettings)
/* harmony export */ });
/* harmony import */ var _IDEAspects_SingleValueAspect_SingleValueAspectConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../IDEAspects/SingleValueAspect/SingleValueAspectConfig */ "./src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspectConfig.ts");

const SingleValuePortalDefault = _IDEAspects_SingleValueAspect_SingleValueAspectConfig__WEBPACK_IMPORTED_MODULE_0__.Default;
const WidgetSettings = {
    type: "widget",
    "priority": 6000,
    "designer": {
        "allowInPortalDesigner": true,
        "allowInSharedoPortalDesigner": true,
        "allowAspectAdapter": false,
        "title": "Single Value Portal Widget",
        "icon": "fa-cog",
        "description": "Show a single value in a portal widget",
        "categories": ["UD - IDEAspects"],
        "isConfigurable": true,
        "configurationWidget": "PortalWidgets.SingleValuePortalWidgetDesigner",
        "defaultConfigurationJson": { configuration: _IDEAspects_SingleValueAspect_SingleValueAspectConfig__WEBPACK_IMPORTED_MODULE_0__.Default }
    },
    "scripts": [],
    "styles": [
        "SingleValuePortalWidget.css"
    ],
    "templates": [
        "SingleValuePortalWidget.html"
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
/*!***************************************************************************************!*\
  !*** ./src/WebBased/PortalWidgets/SingleValuePortalWidget/SingleValuePortalWidget.ts ***!
  \***************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingleValuePortalWidget: () => (/* binding */ SingleValuePortalWidget)
/* harmony export */ });
/* harmony import */ var _IDEAspects_SingleValueAspect_SingleValueAspect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../IDEAspects/SingleValueAspect/SingleValueAspect */ "./src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspect.ts");
/* harmony import */ var _SingleValuePortalWidgetConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SingleValuePortalWidgetConfig */ "./src/WebBased/PortalWidgets/SingleValuePortalWidget/SingleValuePortalWidgetConfig.ts");


let thisWidgetSystemName = "SingleValuePortalWidget";
class SingleValuePortalWidget extends _IDEAspects_SingleValueAspect_SingleValueAspect__WEBPACK_IMPORTED_MODULE_0__.SingleValueAspect {
    liveConfigurationRefreshed() {
        //nothing to do
    }
    setThisComponentName() {
        return thisWidgetSystemName;
    }
    setDefaults() {
        return _SingleValuePortalWidgetConfig__WEBPACK_IMPORTED_MODULE_1__.SingleValuePortalDefault;
    }
    setWidgetJsonSettings() {
        return _SingleValuePortalWidgetConfig__WEBPACK_IMPORTED_MODULE_1__.WidgetSettings;
    }
}

})();

var __webpack_export_target__ = (PortalWidgets = typeof PortalWidgets === "undefined" ? {} : PortalWidgets);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFTztBQUNBO0FBQ0E7QUFDQTs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCLHFCQUFxQixTQUFTO0FBQzlCOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDZCQUE2QixFQUFFLFNBQVMsRUFBRTtBQUMxQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBOztBQUVBOztBQUVBLGlFQUFlLFVBQVUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzlOMUI7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRCxNQUFNO0FBQzVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLGFBQWEsRUFBQzs7Ozs7OztVQzdCN0I7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSnlGO0FBRUU7QUFFM0YsSUFBSSxvQkFBb0IsR0FBRyx5QkFBeUIsQ0FBQztBQUU5QyxNQUFNLHVCQUF3QixTQUFRLDhGQUFpQjtJQUMxRCwwQkFBMEI7UUFDdkIsZUFBZTtJQUNsQixDQUFDO0lBR0ksb0JBQW9CO1FBQ3JCLE9BQU8sb0JBQW9CLENBQUM7SUFDcEMsQ0FBQztJQUVZLFdBQVc7UUFDaEIsT0FBUSxvRkFBd0I7SUFDcEMsQ0FBQztJQUdRLHFCQUFxQjtRQUMxQixPQUFPLDBFQUFjLENBQUM7SUFDMUIsQ0FBQztDQUVKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL3NyYy9Db21tb24vSHRtbEhlbHBlci50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vc3JjL0NvbW1vbi9Kc29uVG9IVE1MQ29udmVydGVyLnRzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9zcmMvQ29tbW9uL0xvZy50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vc3JjL0NvbW1vbi9TdGFja0hlbHBlci50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9FdmVudHNIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL3NyYy9XZWJCYXNlZC9Db21tb24vT2JqZWN0SGVscGVyLnRzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL2FwaS9hcGkudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL3NyYy9XZWJCYXNlZC9Db21tb24vYXBpL2V4ZWN1dGVGaW5kQnlRdWVyeS9GaW5kQnlRdWVyeS50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvc2VhcmNoRm9yQXR0cmlidXRlV2l0aFBhcmVudHMudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3QudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0RlYnVnRGVmYXVsdHMudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0tPQ29udmVydGVyLnRzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9TaW5nbGVWYWx1ZUFzcGVjdC9TaW5nbGVWYWx1ZUFzcGVjdC50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvU2luZ2xlVmFsdWVBc3BlY3QvU2luZ2xlVmFsdWVBc3BlY3RDb25maWcudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL3NyYy9XZWJCYXNlZC9Qb3J0YWxXaWRnZXRzL1NpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0L1NpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0Q29uZmlnLnRzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9zcmMvaGVscGVycy9Gb3JtYXR0ZXIudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy9leHRlcm5hbCB2YXIgXCJrb1wiIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL2luZGV4LmpzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS92ZW5kb3IvYW5zaS1zdHlsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvdmVuZG9yL3N1cHBvcnRzLWNvbG9yL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL3NyYy9XZWJCYXNlZC9Qb3J0YWxXaWRnZXRzL1NpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0L1NpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlSHRtbCh1bnNhZmU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiB1bnNhZmVcbiAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXG4gICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXG4gICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG4gICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEhpZ2hsaWdodENsYXNzKGNvbnRlbnQ6IHN0cmluZywgdGFyZ2V0V29yZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGNvbnRlbnQucmVwbGFjZShuZXcgUmVnRXhwKGBcXFxcYiR7dGFyZ2V0V29yZH1cXFxcYmAsICdnaScpLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gYDxzcGFuIGNsYXNzPVwiaGlnaGxpZ2h0XCI+JHttYXRjaH08L3NwYW4+YDtcbiAgfSk7XG59XG4iLCJcbmV4cG9ydCBjbGFzcyBKc29uVG9IdG1sQ29udmVydGVyIHtcbiAgICBwdWJsaWMgc3RhdGljIGNvbnZlcnQoanNvbjogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGpzb24gPT0gbnVsbCkgcmV0dXJuIHRoaXMuZXNjYXBlSHRtbChcIjxlbT5udWxsPC9lbT5cIik7XG4gICAgICAgIGlmICh0eXBlb2YganNvbiAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHRoaXMuZXNjYXBlSHRtbChqc29uLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheVRvSHRtbChqc29uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdFRvSHRtbChqc29uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGFycmF5VG9IdG1sKGFycjogYW55W10pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBpdGVtc0h0bWwgPSBhcnIubWFwKGl0ZW0gPT4gYDxsaT4ke3RoaXMuY29udmVydChpdGVtKX08L2xpPmApLmpvaW4oXCJcIik7XG4gICAgICAgIHJldHVybiBgPHVsPiR7aXRlbXNIdG1sfTwvdWw+YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBvYmplY3RUb0h0bWwob2JqOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzSHRtbCA9IE9iamVjdC5rZXlzKG9iailcbiAgICAgICAgICAgIC5tYXAoa2V5ID0+IGA8bGk+JHt0aGlzLmVzY2FwZUh0bWwoa2V5KX06ICR7dGhpcy5jb252ZXJ0KG9ialtrZXldKX08L2xpPmApXG4gICAgICAgICAgICAuam9pbihcIlwiKTtcbiAgICAgICAgcmV0dXJuIGA8dWw+JHtwcm9wZXJ0aWVzSHRtbH08L3VsPmA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZXNjYXBlSHRtbCh1bnNhZmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB1bnNhZmUucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcbiAgICB9XG59XG5cbi8vIFVzYWdlIGV4YW1wbGU6XG5jb25zdCBqc29uID0ge1xuICAgIGNvZGU6IFwiRVJST1JfQ09ERVwiLFxuICAgIG1lc3NhZ2U6IFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIixcbiAgICBkZXRhaWxzOiB7XG4gICAgICAgIGluZm86IFwiRGV0YWlsZWQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGVycm9yXCIsXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBpdGVtczogWzEsIDIsIDNdXG4gICAgfVxufTtcblxuIiwiaW1wb3J0IGNoYWxrLCB7IENoYWxrSW5zdGFuY2UgfSBmcm9tICdjaGFsayc7XG5pbXBvcnQgeyBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrLCBleHRyYWN0TGluZU51bWJlckZyb21TdGFjayB9IGZyb20gJy4vU3RhY2tIZWxwZXInO1xuXG5jaGFsay5sZXZlbCA9IDM7XG5sZXQgZGVmYXVsdE1vZGU6IENoYWxrSW5zdGFuY2UgPSBjaGFsay5yZXNldDtcblxuXG5sZXQgbGFzdFNlYzogU2VjdGlvbiB8IHVuZGVmaW5lZDtcblxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTZWMoKSB7XG5cbiAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrKyl7XG4gICAgLy8gY29uc29sZS5ncm91cEVuZCgpXG4gICAgLy8gfVxuXG4gICAgaWYgKGxhc3RTZWM/Lmdyb3VwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFzdFNlYz8uZ3JvdXA7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxhc3RTZWMgPSBuZXcgU2VjdGlvbihcIlJvb3RcIiwgZGVmYXVsdE1vZGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VjQmFja09uZSgpIHtcbiAgICBsYXN0U2VjID0gbGFzdFNlYz8ucGFyZW50O1xuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbn1cblxuZXhwb3J0IGNsYXNzIFNlY3Rpb24ge1xuICAgIHNlY3Rpb25OYW1lOiBzdHJpbmc7XG4gICAgcGFyZW50OiBTZWN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIGM6IENoYWxrSW5zdGFuY2VcbiAgICBpbmRlbnQgPSAwO1xuICAgIGluZGVudFBhZCA9IFwiXCI7XG4gICAgZ3JvdXA6IG51bWJlciA9IDA7XG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbk5hbWU6IHN0cmluZywgYzogQ2hhbGtJbnN0YW5jZSwgc2VjdGlvbj86IFNlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5jID0gYztcbiAgICAgICAgdGhpcy5zZWN0aW9uTmFtZSA9IHNlY3Rpb25OYW1lO1xuICAgICAgICBpZiAoc2VjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5pbmRlbnQgPSBzZWN0aW9uLmluZGVudCArIDE7XG4gICAgICAgICAgICB0aGlzLmluZGVudFBhZCA9IFwiLVwiLnJlcGVhdCh0aGlzLmluZGVudCAqIDIpICsgXCIgXCI7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdFNlYyA9IHRoaXM7XG4gICAgICAgIHRoaXMucGFyZW50ID0gc2VjdGlvbjtcbiAgICB9XG4gICAgbG9nKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRlZmF1bHRNb2RlKGFyZ3MpKTtcbiAgICB9XG4gICAgbGgxKGhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGgxKHRoaXMuaW5kZW50UGFkICsgaGVhZGluZywgdGhpcylcbiAgICB9XG4gICAgbGgyKGhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGgyKHRoaXMuaW5kZW50UGFkICsgaGVhZGluZywgdGhpcylcbiAgICB9XG4gICAgbGgzKGhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGgzKHRoaXMuaW5kZW50UGFkICsgaGVhZGluZywgdGhpcylcbiAgICB9XG4gICAgbCguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gbCh0aGlzLCAuLi5hcmdzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsKC4uLmFyZ3M6IGFueVtdKSB7XG5cbiAgICBsZXQgc2VjOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYztcbiAgICBsZXQgZmlyc3RBcmc6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZmlyc3RBcmdNb2RpZmVkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgaWYgKGFyZyBpbnN0YW5jZW9mIFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHNlYyA9IGFyZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZpcnN0QXJnICYmIGFyZy5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIlN0cmluZ1wiKSB7XG4gICAgICAgICAgICBmaXJzdEFyZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvL3JlbW92ZWQgU2VjdGlvbiBmcm9tIGFyZ3NcbiAgICBhcmdzID0gYXJncy5maWx0ZXIoKGFyZykgPT4ge1xuICAgICAgICByZXR1cm4gIShhcmcgaW5zdGFuY2VvZiBTZWN0aW9uKTtcbiAgICB9KVxuXG5cbiAgICAvLyBsZXQgYyA9IHNlYz8uYyB8fCBtb2RlO1xuICAgIGxldCBjID0gZGVmYXVsdE1vZGU7XG4gICAgbGV0IGluZGVudFBhZCA9IHNlYz8uaW5kZW50UGFkIHx8IFwiXCI7XG5cbiAgICBpZiAoIWZpcnN0QXJnKSB7XG4gICAgICAgIGZpcnN0QXJnID0gXCJcIjtcbiAgICB9XG4gICAgZmlyc3RBcmdNb2RpZmVkID0gZmlyc3RBcmc7XG5cbiAgICBmaXJzdEFyZ01vZGlmZWQgPSBpbmRlbnRQYWQgKyBmaXJzdEFyZztcbiAgICAvL3JlbW92ZSBjb2xvciBmb3JtYXR0aW5nIGZyb20gZmlyc3QgYXJnXG4gICAgbGV0IHRvdExlbiA9IGZpcnN0QXJnTW9kaWZlZC5sZW5ndGggLSBmaXJzdEFyZ01vZGlmZWQucmVwbGFjZSgvXFx1MDAxYlxcWy4qP20vZywgJycpLmxlbmd0aCAtIDI7XG5cblxuICAgIGNvbnNvbGUubG9nKGZpcnN0QXJnTW9kaWZlZCk7XG5cbiAgICAvL3JlbW92ZWQgU2VjdGlvbiBmcm9tIGFyZ3NcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZyk7XG4gICAgfSlcblxuXG59XG5cblxuXG5mdW5jdGlvbiBsb2dIZWFkaW5nU2VjdGlvbihjOiBDaGFsa0luc3RhbmNlLCBoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb24/OiBTZWN0aW9uKSB7XG5cbiAgICBsZXQgc2VjID0gbmV3IFNlY3Rpb24oaGVhZGluZywgYywgc2VjdGlvbik7XG4gICAgbGV0IHRpbWUgPSBuZXcgRGF0ZShEYXRlLm5vdygpKS50b0xvY2FsZVN0cmluZygpO1xuXG4gICAgbGV0IHBhdGggPSBcIlwiO1xuICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgIHBhdGggPSBzZWN0aW9uLnNlY3Rpb25OYW1lO1xuICAgICAgICB3aGlsZSAoc2VjdGlvbi5wYXJlbnQpIHtcbiAgICAgICAgICAgIHNlY3Rpb24gPSBzZWN0aW9uLnBhcmVudDtcbiAgICAgICAgICAgIHBhdGggPSBzZWN0aW9uLnNlY3Rpb25OYW1lICsgXCIgLT4gXCIgKyBwYXRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9hZGQgYWRkIGhlYWRpbmcgdG8gZW5kIG9mIHBhdGggYW5kIG9ubHkgYWRkIC0+IGlmIHBhdGggaXMgbm90IGVtcHR5XG4gICAgaWYgKHBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICBwYXRoICs9IFwiIC0+IFwiO1xuICAgIH1cbiAgICBwYXRoICs9IGhlYWRpbmc7XG5cblxuXG4gICAgLy9wb3NpdGlvbiB0aGUgaGVhZGluZyBpbiB0aGUgbWlkZGxlIG9mIHRoZSBzY3JlZW5cbiAgICAvLyBjb25zb2xlLmxvZyhjKGhlYWRpbmcucGFkU3RhcnQoKGN3aWR0aCAvIDIpICsgKGhlYWRpbmcubGVuZ3RoIC8gMiksIFwiIFwiKS5wYWRFbmQoY3dpZHRoLCBcIiBcIikpKTtcbiAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKGMocGF0aCkpO1xuICAgIHNlYy5ncm91cCsrO1xuXG4gICAgcmV0dXJuIHNlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxoMShoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb246IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjKSB7XG4gICAgbGV0IGMgPSBjaGFsay5iZ0JsYWNrLmdyZWVuQnJpZ2h0LmJvbGQ7XG4gICAgcmV0dXJuIGxvZ0hlYWRpbmdTZWN0aW9uKGMsIGhlYWRpbmcsIHNlY3Rpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGgyKGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWMpIHtcbiAgICBsZXQgYyA9IGNoYWxrLmJnR3JheS5jeWFuQnJpZ2h0LmJvbGQ7XG4gICAgcmV0dXJuIGxvZ0hlYWRpbmdTZWN0aW9uKGMsIGhlYWRpbmcsIHNlY3Rpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGgzKGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWMpIHtcbiAgICBsZXQgYyA9IGNoYWxrLmJnR3JheS5tYWdlbnRhQnJpZ2h0LmJvbGQ7XG4gICAgcmV0dXJuIGxvZ0hlYWRpbmdTZWN0aW9uKGMsIGhlYWRpbmcsIHNlY3Rpb24pO1xufVxuXG5cbmV4cG9ydCBjb25zdCBsaCA9IGxoMTtcblxuXG5leHBvcnQgY29uc3QgaW1wID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsucmVkLmJvbGQuYmdCbGFjaztcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGluZiA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLmJsdWUuYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IHdybiA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLnllbGxvdy5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufSBcblxuZXhwb3J0IGNvbnN0IGVyciA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcblxuICAgIGxldCBlciA9IChuZXcgRXJyb3IoKSk7XG4gICAgbGV0IGxpbmVObyA9IGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrKGVyLnN0YWNrKTtcbiAgICBsZXQgY2FsbGVyID0gZXh0cmFjdENhbGxlckZyb21TdGFjayhlci5zdGFjayk7XG5cbiAgICBsZXQgcHJlVGV4dCA9IGBbJHtjYWxsZXJ9OiR7bGluZU5vfV1gO1xuXG4gICAgdGV4dCA9IHByZVRleHQgKyBcIiBcIiArIHRleHQ7XG4gICAgXG4gICAgY29uc29sZS5sb2coZXIpO1xuXG4gICAgbGV0IGMgPSBjaGFsay5yZWQuYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IHN1YyA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLmdyZWVuLmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBobCA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gY2hhbGsuYmdCbHVlKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgaGwxID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ01hZ2VudGEodGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBudiA9IChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gY2hhbGsuYmdCbHVlQnJpZ2h0KG5hbWUucGFkRW5kKDMwLCBcIiBcIikpICsgXCIgOiBcIiArIGNoYWxrLmN5YW5CcmlnaHQodmFsdWUpO1xufVxuXG4gXG5sZXQgZXhhbXBsZUpTb24gPVxue1xuICAgIFwibmFtZVwiOiBcInRlc3RcIixcbiAgICBcImFnZVwiOiAxMCxcbiAgICBcImFkZHJlc3NcIjoge1xuICAgICAgICBcInN0cmVldFwiOiBcIjEyMyBGYWtlIFN0cmVldFwiLFxuICAgICAgICBcImNpdHlcIjogXCJMb25kb25cIixcbiAgICAgICAgXCJwb3N0Y29kZVwiOiBcIlNXMUEgMUFBXCJcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5UZXN0KCkge1xuXG5cbiAgICBjb25zb2xlLmxvZyhcIi0tIHRlc3QgLS1cIilcblxuICAgIGxldCBzZWMgPSBsaDEoXCJUZXN0IEhlYWRpbmcgMVwiKVxuICAgIGwoaW1wKFwiQXV0byBTZWMgLSBUaGlzIGlzIHNvbWV0aGluZyBpbXBvcnRhbnRcIikpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSAxXCIpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSAyXCIpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSBJTkZPOiBcIiArIGltcChcIlRoaXMgaXMgc29tZXRoaW5nIGltcG9ydGFudFwiKSlcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIFdJVEggQURESVRJTkFMIElORk86IFwiICsgaW1wKFwiVGhpcyBpcyBzb21ldGhpbmcgaW1wb3J0YW50XCIpICsgXCIgYW5kIHRoaXMgaXMgc29tZSBhZGRpdGlvbmFsIGluZm9cIilcbiAgICBsKFwiQXV0byBTZWMgLSBUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcImFmdGVyIGF1dG8gc2VjIFRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cbiAgICBzZWMgPSBzZWMubGgyKFwiSGVhZGluZyAyXCIpXG4gICAgc2VjLmwoXCJUZXN0XCIpXG4gICAgc2VjLmwoXCJUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cblxuICAgIHNlYyA9IHNlYy5saDMoXCJIZWFkIDNcIilcbiAgICBsKFwiVGVzdFwiKVxuICAgIGwoXCJUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cbiAgICBjbGVhclNlYygpO1xuICAgIGwoXCJUZXN0IENsZWFyIFNlY1wiKVxuICAgIGwoXCJUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cblxuXG4gICAgbChcIlRlc3QgSlNPTjpcIiwgZXhhbXBsZUpTb24pO1xuXG59XG5cbi8vIHJ1blRlc3QoKVxuY2xlYXJTZWMoKTtcblxuLy8gZXhwb3J0IHtjb2xvcnN9O1xuIiwiXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soc3RhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCk6IG51bWJlciB8IG51bGwge1xuICAgIGlmICghc3RhY2spIHJldHVybiBudWxsO1xuICAgIC8vIEV4dHJhY3QgbGluZXMgZnJvbSBzdGFja1xuICAgIGNvbnN0IHN0YWNrTGluZXMgPSBzdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgLy8gRmluZCB0aGUgbGluZSB3aXRoIHRoZSBlcnJvciAodXN1YWxseSB0aGUgc2Vjb25kIGxpbmUpXG4gICAgY29uc3QgZXJyb3JMaW5lID0gc3RhY2tMaW5lc1sxXSB8fCAnJztcbiAgICAvLyBFeHRyYWN0IGxpbmUgbnVtYmVyIGZyb20gdGhlIGVycm9yIGxpbmUgdXNpbmcgcmVnZXhcbiAgICBjb25zdCBtYXRjaCA9IGVycm9yTGluZS5tYXRjaCgvOihcXGQrKTooXFxkKykkLyk7XG4gICAgcmV0dXJuIG1hdGNoID8gcGFyc2VJbnQobWF0Y2hbMV0pIDogbnVsbDtcbiAgfVxuICBcbiBleHBvcnQgZnVuY3Rpb24gZXh0cmFjdENhbGxlckZyb21TdGFjayhzdGFjazogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKCFzdGFjaykgcmV0dXJuIG51bGw7XG4gICAgLy8gRXh0cmFjdCBsaW5lcyBmcm9tIHN0YWNrXG4gICAgY29uc3Qgc3RhY2tMaW5lcyA9IHN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAvLyBGaW5kIHRoZSBsaW5lIHdpdGggdGhlIGNhbGxlciBmdW5jdGlvbiAodXN1YWxseSB0aGUgdGhpcmQgbGluZSlcbiAgICBjb25zdCBjYWxsZXJMaW5lID0gc3RhY2tMaW5lc1syXSB8fCAnJztcbiAgICAvLyBFeHRyYWN0IGNhbGxlciBmdW5jdGlvbiBuYW1lIHVzaW5nIHJlZ2V4XG4gICAgY29uc3QgbWF0Y2ggPSBjYWxsZXJMaW5lLm1hdGNoKC9hdCAoW1xcdy48Pl0rKS8pO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogbnVsbDtcbiAgfSIsIlxuXG5leHBvcnQgaW50ZXJmYWNlIFNoYXJlRG9FdmVudCB7XG4gICAgZXZlbnRQYXRoOiBzdHJpbmc7XG4gICAgZXZlbnROYW1lOiBzdHJpbmc7XG4gICAgc291cmNlOiBhbnk7XG4gICAgZGF0YTogYW55O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJlRXZlbnQoZXZlbnQ6U2hhcmVEb0V2ZW50KSB7XG5cbiAgICAkdWkuZXZlbnRzLmJyb2FkY2FzdChldmVudC5ldmVudFBhdGgsIGV2ZW50KTtcbn0iLCJpbXBvcnQgeyBsLCBpbmYsIGVyciB9IGZyb20gXCIuLi8uLi9Db21tb24vTG9nXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJUb0NsYXNzKGNsYXNzTmFtZTpzdHJpbmcsIGJhc2U6YW55KSB7XG4gICAgY29uc3QgY2xhc3NQYXJ0cyA9IGNsYXNzTmFtZS5zcGxpdCgnLicpO1xuICAgIGxldCBjbGFzc1JlZmVyZW5jZSA9IGJhc2U7XG5cbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgY2xhc3NQYXJ0cykge1xuICAgICAgICBpZighY2xhc3NSZWZlcmVuY2VbcGFydF0pIFxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNsYXNzUmVmZXJlbmNlID0gY2xhc3NSZWZlcmVuY2VbcGFydF07XG4gICAgfTsgXG4gICAgcmV0dXJuIGNsYXNzUmVmZXJlbmNlO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBbGxGaWVsZHNUb051bGwobW9kZWw6YW55KSB7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhtb2RlbCk7XG4gICAga2V5cy5mb3JFYWNoKChrZXk6IGFueSkgPT4ge1xuICAgICAgICBtb2RlbFtrZXldID0gbnVsbDtcbiAgICB9KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbk9iamVjdChvYjogYW55KSB7XG4gICAgdmFyIHRvUmV0dXJuOiBhbnkgPSB7fTtcblxuICAgIGZvciAodmFyIGkgaW4gb2IpIHtcbiAgICAgICAgaWYgKCFvYi5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG5cbiAgICAgICAgaWYgKCh0eXBlb2Ygb2JbaV0pID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB2YXIgZmxhdE9iamVjdCA9IGZsYXR0ZW5PYmplY3Qob2JbaV0pO1xuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBmbGF0T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmbGF0T2JqZWN0Lmhhc093blByb3BlcnR5KHgpKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIHRvUmV0dXJuW2kgKyAnLicgKyB4XSA9IGZsYXRPYmplY3RbeF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b1JldHVybltpXSA9IG9iW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b1JldHVybjtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHByb3BlcnR5UGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCBwcm9wID0gcHJvcGVydGllc1tpXTtcbiAgICAgICAgaWYgKCFjdXJyZW50W3Byb3BdKSB7XG4gICAgICAgICAgICBjdXJyZW50W3Byb3BdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XG4gICAgfVxuICAgIGN1cnJlbnRbcHJvcGVydGllc1twcm9wZXJ0aWVzLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nKTogYW55IHtcbiAgICBsKGluZihgZ2V0TmVzdGVkUHJvcGVydHkoJHtwcm9wZXJ0eVBhdGh9KWApLG9iaik7XG4gICAgXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHByb3BlcnR5UGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHByb3BlcnR5IGhhcyBhbiBhcnJheSBpbmRleCwgZS5nLiwgXCJkYXRhWzBdXCJcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHByb3AubWF0Y2goL14oW2EtekEtWjAtOV9dKylcXFsoWzAtOV0rKVxcXSQvKTtcblxuICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgY29uc3QgYXJyYXlQcm9wID0gbWF0Y2hlc1sxXTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQobWF0Y2hlc1syXSwgMTApO1xuXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY3VycmVudFthcnJheVByb3BdKSB8fCBjdXJyZW50W2FycmF5UHJvcF1baW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsKGVycihgZ2V0TmVzdGVkUHJvcGVydHkoJHtwcm9wZXJ0eVBhdGh9KTogYXJyYXlQcm9wIG9yIGluZGV4IGlzIHVuZGVmaW5lZGApLG9iailcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudFthcnJheVByb3BdW2luZGV4XTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50W3Byb3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGwoZXJyKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pOiBwcm9wIGlzIHVuZGVmaW5lZGApLG9iailcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50O1xufVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgdGVtcG9yYXJ5IGFuZCB3aWxsIGJlIHJlbW92ZWQgb25jZSB0aGUgdHlwZXNjcmlwdCB0eXBpbmcgYXJlIGZpeGVkXG4gICAgICogV2hhdCBpcyBkb2VzIGlzIGNoZWNrIGlmIHRoZSBwYXNzZWQgaW4gb2JqZWN0IGlzIGEga25vY2tvdXQgb2JzZXJ2YWJsZSBhbmQgaWYgaXQgaXMgaXQgcmV0dXJucyB0aGUgdmFsdWVcbiAgICAgKiBAcGFyYW0ga29PYmplY3QgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlRnJvbUtPT2JqZWN0PFQ+KGtvT2JqZWN0OiBhbnkpIHtcbiAgICAgICAgaWYodHlwZW9mIGtvT2JqZWN0ID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBrb09iamVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrb09iamVjdFxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBndmtvKGtvT2JqZWN0OiBhbnkpOiBhbnkge1xuICAgICAgICByZXR1cm4gZ2V0VmFsdWVGcm9tS09PYmplY3Qoa29PYmplY3QpO1xuICAgIH0iLCJcbi8qKlxuICogVGhpcyBmaWxlIGNvbnRhaW5zIHRoZSBhcGkgY2FsbHMgdG8gdGhlIGJhY2tlbmQuXG4gKiB1dGlsaXNpbmcgdGhlIGF4aW9zIGxpYnJhcnkgdG8gbWFrZSB0aGUgY2FsbHMuXG4gKiBpbmNsdXNpbmcgb2Ygd2VicGFja0lnbm9yZSBpcyB0byBhbGxvdyB0aGUgd2VicGFjayB0byBpZ25vcmUgdGhlIGNhbGxzIGFuZCBub3QgdHJ5IHRvIGJ1bmRsZSB0aGVtLlxuICovXG5cbmltcG9ydCB7IGVyciwgaW5mLCBsLCBsaDEsIHNlY0JhY2tPbmUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0xvZ1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVBvc3Q8VD4oYXBpOiBzdHJpbmcsIHBvc3RCb2R5OiBhbnkpOiBQcm9taXNlPFQ+IHtcbiAgICAvL3JldHVybiBhd2FpdCAkYWpheC5wb3N0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJQT1NUXCIsIHBvc3RCb2R5KSkuZGF0YTtcbn1cblxuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVHZXQ8VD4oYXBpOiBzdHJpbmcpIDogUHJvbWlzZTxUPntcbi8vICAgICByZXR1cm4gYXdhaXQgJGFqYXguZ2V0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSk7XG4vLyB9IFxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldDxUPihhcGk6IHN0cmluZyk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJHRVRcIiwgdW5kZWZpbmVkKSkuZGF0YTtcbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldHYyPFQ+KGFwaTogc3RyaW5nKXtcbiAgICByZXR1cm4gIGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiR0VUXCIsIHVuZGVmaW5lZCk7XG59XG5cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVB1dDxUPihhcGk6IHN0cmluZywgcG9zdEJvZHk6IGFueSk6IFByb21pc2U8VD4ge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LnB1dCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSksIHBvc3RCb2R5KTtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiUFVUXCIsIHBvc3RCb2R5KSkuZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVEZWxldGU8VD4oYXBpOiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICAvL3JldHVybiBhd2FpdCAkYWpheC5kZWxldGUoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpKTtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiREVMRVRFXCIsIHVuZGVmaW5lZCkpLmRhdGE7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQXBpKGFwaTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgbG9jYXRpb24gPSB3aW5kb3cuZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luO1xuXG4gICAgLy9pZiBhcGkgZG9lcyBub3QgaW5jbHVkZSB0aGUgbG9jYXRpb24gdGhlbiBhZGQgaXQuXG4gICAgaWYgKGFwaS5pbmRleE9mKGxvY2F0aW9uKSA9PT0gLTEpIHtcbiAgICAgICAgLy9jaGVjayBpZiBhcGkgc3RhcnQgd2l0aCBhIC8gaWYgbm90IGFkZCBpdC5cbiAgICAgICAgaWYgKGFwaS5pbmRleE9mKFwiL1wiKSAhPT0gMCkge1xuICAgICAgICAgICAgYXBpID0gXCIvXCIgKyBhcGk7XG4gICAgICAgIH1cblxuICAgICAgICBhcGkgPSBsb2NhdGlvbiArIGFwaTtcbiAgICB9XG4gICAgcmV0dXJuIGFwaTtcblxufVxuXG5leHBvcnQgdHlwZSBURXhlY3V0ZUZldGNoUmVzcG9uc2UgPVxuICAgIHtcbiAgICAgICAgZGF0YTogYW55IHwgdW5kZWZpbmVkLFxuICAgICAgICByZXNwb25zZTogUmVzcG9uc2UgfCB1bmRlZmluZWQsXG4gICAgICAgIGluZm86XG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGJvb2xlYW4sXG4gICAgICAgICAgICBlcnJvcjogQXJyYXk8VFVzZXJFcnJvcnM+XG4gICAgICAgIH1cbiAgICB9XG5cbmV4cG9ydCB0eXBlIFRVc2VyRXJyb3JzID1cbiAgICB7XG4gICAgICAgIGNvZGU6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICB1c2VyTWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBzdWdnZXN0aW9ucz86IEFycmF5PHN0cmluZz5cbiAgICAgICAgaW50ZXJuYWxTdWdnZXN0aW9ucz86IEFycmF5PHN0cmluZz5cbiAgICAgICAgYWN0aW9ucz86IEFycmF5PHN0cmluZz5cbiAgICAgICAgZXJyb3JTdGFjaz86IHN0cmluZyxcbiAgICAgICAgYWRkaXRpb25hbEluZm8/OiBhbnlcbiAgICB9XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlRmV0Y2g8VD4oYXBpOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBkYXRhOiBhbnksIHJldHJ5Q291bnRlcj86bnVtYmVyKTogUHJvbWlzZTxURXhlY3V0ZUZldGNoUmVzcG9uc2U+IHtcbiAgICBsZXQgcmV0VmFsdWU6IFRFeGVjdXRlRmV0Y2hSZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogdW5kZWZpbmVkLFxuICAgICAgICByZXNwb25zZTogdW5kZWZpbmVkLFxuICAgICAgICBpbmZvOiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBbXVxuICAgICAgICB9XG4gICAgfVxuICAgICAgICAvL3RvIGdldCBuZXcgdG9rZW4gVE9ETzogY2hlY2sgaWYgZmFpbCB0aGVuIGNhbGxcbiAgICAvLyBhd2FpdCAkYWpheC5nZXQoXCJodHRwczovL2hzZi12bmV4dC5zaGFyZWRvLmNvLnVrL3NlY3VyaXR5L3JlZnJlc2hUb2tlbnM/Xz1cIiArIERhdGUubm93KTtcblxuICAgIFxuXG4gICAgbGV0IHVybCA9IHZhbGlkYXRlQXBpKGFwaSk7XG4gICAgbGV0IGZldGNoSGVhZGVycyA9IGJ1aWxkSGVhZGVycygpO1xuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogZmV0Y2hIZWFkZXJzLFxuICAgICAgICBib2R5OiBkYXRhID8gSlNPTi5zdHJpbmdpZnkoZGF0YSkgOiB1bmRlZmluZWRcbiAgICB9XG4gICAgKS50aGVuKGFzeW5jIChyZXNwb25zZSkgPT4ge1xuICAgICAgICByZXRWYWx1ZS5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICBpZiAocmVzcG9uc2Uub2sgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IDQwMSl7XG4gICAgICAgICAgICAgICAgcmV0cnlDb3VudGVyID0gcmV0cnlDb3VudGVyIHx8IDE7XG4gICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudGVyID4gMyl7XG4gICAgICAgICAgICAgICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBcIkFQSV9FUlJPUlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNhbGwgdGhlIEFQSSBhZnRlciAzIGF0dGVtcHRzLiBzdGF0dXNUZXh0OiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJNZXNzYWdlOiBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNhbGwgdGhlIEFQSS5cIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogdW5kZWZpbmVkLCByZXNwb25zZSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhd2FpdCAkYWpheC5nZXQoXCJodHRwczovL2hzZi12bmV4dC5zaGFyZWRvLmNvLnVrL3NlY3VyaXR5L3JlZnJlc2hUb2tlbnM/Xz1cIiArIERhdGUubm93KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgbWV0aG9kLCBkYXRhLHJldHJ5Q291bnRlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgY29kZTogXCJBUElfRVJST1JcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJLiBzdGF0dXNUZXh0OiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCxcbiAgICAgICAgICAgICAgICB1c2VyTWVzc2FnZTogXCJBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBjYWxsIHRoZSBBUEkuXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlRGF0YTtcbiAgICAgICAgLy9jaGVjayBpZiByZXNwb25zZSBpcyBKU09OXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIik/LmluY2x1ZGVzKFwiYXBwbGljYXRpb24vanNvblwiKSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldFZhbHVlLmluZm8uc3VjY2VzcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGU6IGFueSkge1xuICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2RlOiBcIkFQSV9FUlJPUlwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBleHRyYWN0IHRoZSBkYXRhIGZyb20gdGhlIEFQSS4gTWVzc2FnZTogJHtlPy5tZXNzYWdlIHx8IFwiVW5rbm93blwifWAsXG4gICAgICAgICAgICAgICAgdXNlck1lc3NhZ2U6IGBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBleHRyYWN0IHRoZSBkYXRhIGZyb20gdGhlIEFQSS5gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkYXRhOiByZXNwb25zZURhdGEsIHJlc3BvbnNlIH07XG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGwoZXJyKGBFcnJvciBmcm9tIEFQSSBDYWxsICR7dXJsfWApLCBlcnJvcik7XG5cbiAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5wdXNoKHtcbiAgICAgICAgICAgIGNvZGU6IFwiQVBJX0VSUk9SXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgICAgICAgICAgdXNlck1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHsgZGF0YTogdW5kZWZpbmVkLCByZXNwb25zZTogdW5kZWZpbmVkIH07XG4gICAgfSlcblxuICAgIGxoMShgUmVzcG9uc2UgZnJvbSAke3VybH1gKTtcbiAgICBsKHJlc3BvbnNlKTtcblxuICAgIHJldFZhbHVlLmRhdGEgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgaWYocmV0VmFsdWUuaW5mby5lcnJvci5sZW5ndGggPiAwKXtcbiAgICAgICAgcmV0VmFsdWUuaW5mby5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgIGwoZXJyKGBFcnJvciBmcm9tIEFQSSBDYWxsICR7dXJsfWApLCBlKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzZWNCYWNrT25lKCk7XG5cbiAgICByZXR1cm4gcmV0VmFsdWU7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkSGVhZGVycygpIHtcbiAgICBsZXQgYmVhcmVyID0gZ2V0QmVhcmVyVG9rZW4oKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBmZXRjaEhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICBpZiAoYmVhcmVyKSB7XG4gICAgICAgIGZldGNoSGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIGJlYXJlcik7XG4gICAgfVxuICAgIHJldHVybiBmZXRjaEhlYWRlcnM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb2tpZXMoKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB7XG4gICAgbGV0IHJldFZhbHVlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gICAgbGV0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpLnJlZHVjZShmdW5jdGlvbiAoY29va2llcywgY29va2llKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IGNvb2tpZS5zcGxpdChcIj1cIik7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBwYXJ0c1swXS50cmltKCk7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0c1sxXTtcblxuICAgICAgICAgICAgcmV0VmFsdWVba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb29raWVzO1xuICAgIH0sIHt9KTtcblxuICAgIHJldHVybiByZXRWYWx1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCZWFyZXJUb2tlbigpIHtcbiAgICB2YXIgY29va2llcyA9IGdldENvb2tpZXMoKTtcbiAgICB2YXIgdG9rZW4gPSBjb29raWVzW1wiX2FwaVwiXTtcblxuICAgIGlmICh0b2tlbikgcmV0dXJuIFwiQmVhcmVyIFwiICsgdG9rZW47XG4gICAgcmV0dXJuIG51bGw7XG59OyIsImltcG9ydCB7IGV4ZWN1dGVQb3N0IH0gZnJvbSBcIi4uL2FwaVwiO1xuaW1wb3J0IHsgSUZpbmRCeVF1ZXJ5T3B0aW9ucyB9IGZyb20gXCIuL0lGaW5kQnlRdWVyeUlucHV0XCI7XG5pbXBvcnQgeyBJRmluZEJ5UXVlcnlSZXN1bHQgfSBmcm9tIFwiLi9JRmluZEJ5UXVlcnlSZXN1bHRcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUZpbmRCeVF1ZXJ5PFQ+KGlucHV0T3B0aW9uOiBJRmluZEJ5UXVlcnlPcHRpb25zKTogUHJvbWlzZTxJRmluZEJ5UXVlcnlSZXN1bHQ8VD4+XG57XG4gICAgcmV0dXJuIGV4ZWN1dGVQb3N0PElGaW5kQnlRdWVyeVJlc3VsdDxUPj4oXCIvYXBpL3YxL3B1YmxpYy93b3JrSXRlbS9maW5kQnlRdWVyeVwiLCBpbnB1dE9wdGlvbikudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG59IiwiaW1wb3J0IHsgZXhlY3V0ZUZpbmRCeVF1ZXJ5IH0gZnJvbSBcIi4vZXhlY3V0ZUZpbmRCeVF1ZXJ5L0ZpbmRCeVF1ZXJ5XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2Ugc2VhcmNoUmVzdWx0IFxue1xuICAgIGZvdW5kOmJvb2xlYW4sIFxuICAgIHZhbHVlOnN0cmluZyB8IHVuZGVmaW5lZCwgXG4gICAgcGFyZW50SWQ6c3RyaW5nIHwgdW5kZWZpbmVkXG4gICAgZGVwdGg6bnVtYmVyLFxuICAgIGZvdW5kSW5Xb3JrSXRlbUlkOnN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICB3YXNGb3VuZEluQW5jZXN0b3I6Ym9vbGVhbixcbiAgICBmb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lOnN0cmluZyB8IHVuZGVmaW5lZFxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlKHdvcmtJdGVtSWQ6IHN0cmluZywgYXR0cmlidXRlTmFtZTogc3RyaW5nLCBwYXJlbnRzOiBib29sZWFuLCBtYXhEZXB0aD86IG51bWJlciB8IHVuZGVmaW5lZClcbiB7XG4gICAgbGV0IHVzZU1heERlcHRoIDogYm9vbGVhbiA9IG1heERlcHRoID8gdHJ1ZSA6IGZhbHNlO1xuICAgIGlmKG1heERlcHRoICYmIG1heERlcHRoID4gMCl7XG4gICAgICAgIHVzZU1heERlcHRoID0gdHJ1ZTtcbiAgICB9XG5cblxuICAgIGxldCByZXRWYWx1ZTpzZWFyY2hSZXN1bHQgPSB7Zm91bmQ6ZmFsc2UsIHZhbHVlOnVuZGVmaW5lZCwgcGFyZW50SWQ6dW5kZWZpbmVkLCBkZXB0aDowLCBmb3VuZEluV29ya0l0ZW1JZDp1bmRlZmluZWQsIHdhc0ZvdW5kSW5BbmNlc3RvcjpmYWxzZSwgZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZTp1bmRlZmluZWR9O1xuXG4gICAgcmV0VmFsdWUgPSBhd2FpdCBzZWFyY2hGb3JBdHRyaWJ1dGUod29ya0l0ZW1JZCwgYXR0cmlidXRlTmFtZSk7XG5cbiAgICBpZihyZXRWYWx1ZS5mb3VuZCl7XG4gICAgICAgIHJldHVybiByZXRWYWx1ZTtcbiAgICB9XG5cbiAgICBpZighcGFyZW50cyApe1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHBhcmVudHMgb3IgY2hpbGRyZW4gdG8gc2VhcmNoIHNvIG9ubHkgc2VhcmNoaW5nIGN1cnJlbnQgd29yayBpdGVtXCIpO1xuICAgICAgICByZXR1cm4gcmV0VmFsdWVcbiAgICB9XG5cbiAgICBpZihwYXJlbnRzKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWFyY2hpbmcgcGFyZW50c1wiKTtcbiAgICAgICAgbGV0IGRlcHRoID0gMDtcbiAgICAgICAgbGV0IHNlYXJjaFBhcmVudCA9IGFzeW5jIChwYXJlbnRJZDogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBkZXB0aCsrO1xuICAgICAgICAgICAgbGV0IHI6IHNlYXJjaFJlc3VsdCA9IHtmb3VuZDpmYWxzZSxcbiAgICAgICAgICAgICAgICAgdmFsdWU6dW5kZWZpbmVkLCBcbiAgICAgICAgICAgICAgICAgcGFyZW50SWQ6dW5kZWZpbmVkLCBkZXB0aDpkZXB0aCwgLy9kZXB0aCBoZXJlIHdpbGwgYmUgb3ZlcnJpZGVuIGlmIHRoZXJlIGlzIGEgcGFyZW50XG4gICAgICAgICAgICAgICAgIGZvdW5kSW5Xb3JrSXRlbUlkOnVuZGVmaW5lZCwgXG4gICAgICAgICAgICAgICAgIHdhc0ZvdW5kSW5BbmNlc3RvcjpmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZTp1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYoIXBhcmVudElkKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHBhcmVudCBmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIHIgPSBhd2FpdCBzZWFyY2hGb3JBdHRyaWJ1dGUocGFyZW50SWQsIGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgICAgIHIuZGVwdGggPSBkZXB0aDsgLy91cGRhdGUgZGVwdGggYXMgaXQgd2lsbCBiZSAwXG4gICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihyLmZvdW5kKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIGF0dHJpYnV0ZSBpbiBwYXJlbnRcIik7XG4gICAgICAgICAgICAgICAgci53YXNGb3VuZEluQW5jZXN0b3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgIGlmKHVzZU1heERlcHRoICYmIGRlcHRoID49IG1heERlcHRoISl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWF4IGRlcHRoIHJlYWNoZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGlmKCFyLnBhcmVudElkKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBwYXJlbnQgZm91bmRcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBmb3VuZCBpbiBwYXJlbnRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlYXJjaFBhcmVudChyLnBhcmVudElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldFZhbHVlID0gYXdhaXQgc2VhcmNoUGFyZW50KHJldFZhbHVlLnBhcmVudElkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0VmFsdWU7XG5cbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VhcmNoRm9yQXR0cmlidXRlKHdvcmtJdGVtSWQ6IHN0cmluZywgYXR0cmlidXRlTmFtZTogc3RyaW5nKSB7XG4gICAgLy9nZXQgdGhlIG1hdHRlclxuICAgIGxldCByZXRWYWx1ZSA6c2VhcmNoUmVzdWx0ID0ge1xuICAgICAgICBmb3VuZDpmYWxzZSwgdmFsdWU6dW5kZWZpbmVkLFxuICAgICAgICAgcGFyZW50SWQ6dW5kZWZpbmVkLCBkZXB0aDowLFxuICAgICAgICAgIGZvdW5kSW5Xb3JrSXRlbUlkOnVuZGVmaW5lZCxcbiAgICAgICAgICAgd2FzRm91bmRJbkFuY2VzdG9yOmZhbHNlLFxuICAgICAgICAgICBmb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lOnVuZGVmaW5lZH07XG4gICAgbGV0IHJlcSA9IHtcbiAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJ3b3JrSXRlbUlkc1wiOiBbXG4gICAgICAgICAgICAgICAgd29ya0l0ZW1JZFxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcImVucmljaFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwidGl0bGVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogXCJwYXJlbnQuaWRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogXCJ0eXBlLnN5c3RlbU5hbWVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogXCJyZWZlcmVuY2VcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogYXR0cmlidXRlTmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIHVzaW5nIFNoYXJlRG8gSWQ6IFwiICsgd29ya0l0ZW1JZCk7XG4gICAgbGV0IGh0dHBSZXN1bHRGaW5kQnlRdWVyeSA9IGF3YWl0IGV4ZWN1dGVGaW5kQnlRdWVyeTxhbnk+KHJlcSk7XG4gICAgY29uc29sZS5sb2coYFdvcmsgaXRlbSAke3dvcmtJdGVtSWR9IGZvdW5kYCk7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5LnJlc3VsdHMpKTtcblxuXG4gICAgbGV0IHR5cGVTeXN0ZW1OYW1lID0gaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5LnJlc3VsdHNbMF0uZGF0YVtcInR5cGUuc3lzdGVtTmFtZVwiXTtcbiAgICBsZXQgcGFyZW50SWQgPSAgICAgICBodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0c1swXS5kYXRhW1wicGFyZW50LmlkXCJdO1xuICAgIGxldCBhdHRyaWJ1dGUgPSAgICAgIGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzWzBdLmRhdGFbYXR0cmlidXRlTmFtZV0gYXMgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKGBUeXBlIHN5c3RlbSBuYW1lIGlzICR7dHlwZVN5c3RlbU5hbWV9YCk7XG4gICAgY29uc29sZS5sb2coYFBhcmVudCBJZCBpcyAke3BhcmVudElkfWApO1xuICAgIGNvbnNvbGUubG9nKGBBdHRyaWJ1dGUgWyR7YXR0cmlidXRlTmFtZX1dIGlzICR7YXR0cmlidXRlfWApO1xuXG4gICAgcmV0VmFsdWUudmFsdWUgPSBhdHRyaWJ1dGU7XG4gICAgaWYoYXR0cmlidXRlKXtcbiAgICAgICAgcmV0VmFsdWUuZm91bmQgPSB0cnVlO1xuICAgICAgICByZXRWYWx1ZS5mb3VuZEluV29ya0l0ZW1JZCA9IHdvcmtJdGVtSWQ7XG4gICAgICAgIHJldFZhbHVlLmZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWUgPSB0eXBlU3lzdGVtTmFtZTtcbiAgICB9XG4gICAgcmV0VmFsdWUucGFyZW50SWQgPSBwYXJlbnRJZDtcblxuICAgIHJldHVybiByZXRWYWx1ZTtcbiAgICBcbn0iLCJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcbmltcG9ydCB7IElTaGFyZWRvQmxhZGVNb2RlbCwgVFNoYXJlRG9CbGFkZSwgSUNvbmZpZ3VyYXRpb25Ib3N0IH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvU2hhcmVkb0FzcGVjdE1vZGVsc1wiO1xuaW1wb3J0IHsgSURlYnVnLCBPYnNlcnZhYmxlSURlYnVnIH0gZnJvbSBcIi4vSURlYnVnXCI7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBUU2hhcmVkbyB9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL1RTaGFyZWRvXCI7XG5pbXBvcnQgeyBFdmVudFRvUmVhY3RUbywgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZywgSVdpZGdldEpzb24sIElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uIH0gZnJvbSBcIi4vSVdpZGdldEpzb25cIjtcbmltcG9ydCB7IFNoYXJlRG9FdmVudCwgZmlyZUV2ZW50IH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9FdmVudHNIZWxwZXJcIjtcbmltcG9ydCB7IGNsZWFyU2VjLCBlcnIsIGluZiwgbCwgbGgxLCBudiwgd3JuIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Mb2dcIlxuaW1wb3J0IHsgSUZvcm1CdWlsZGVyRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL0FzcGVjdC9JRm9ybUJ1aWxkZXJcIjtcbmltcG9ydCB7IFRVc2VyRXJyb3JzIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9hcGkvYXBpXCI7XG5pbXBvcnQgeyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0LCB0b09ic2VydmFibGVPYmplY3QgfSBmcm9tIFwiLi9LT0NvbnZlcnRlclwiO1xuaW1wb3J0IHsgZ2V0TmVzdGVkUHJvcGVydHksIGd2a28sIHNldE5lc3RlZFByb3BlcnR5LCBzdHJUb0NsYXNzIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9PYmplY3RIZWxwZXJcIjtcbmltcG9ydCB7IGVzY2FwZUh0bWwgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0h0bWxIZWxwZXJcIjtcbmltcG9ydCB7IEpzb25Ub0h0bWxDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0pzb25Ub0hUTUxDb252ZXJ0ZXJcIjtcbmltcG9ydCB7IHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZSB9IGZyb20gXCIuLi8uLi9Db21tb24vYXBpL3NlYXJjaEZvckF0dHJpYnV0ZVdpdGhQYXJlbnRzXCI7XG5pbXBvcnQgeyBERUJVR19ERUZBVUxUIH0gZnJvbSBcIi4vRGVidWdEZWZhdWx0c1wiO1xuaW1wb3J0IHsgZm9yRWFjaCB9IGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCBjb2xvciBmcm9tIFwiY29sb3JcIjtcbmltcG9ydCB7IGRhdGEgfSBmcm9tIFwianF1ZXJ5XCI7XG5cblxuY29uc29sZS5sb2coXCJ2OiAtIDMuMjlcIilcblxuZXhwb3J0IGNvbnN0IEZPTVJfQlVJTERFUl9QQVRIX1NUUklORyA9IFwiYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YVwiO1xuZXhwb3J0IGNvbnN0IEVSUk9SX0RJVl9TRUxFQ1RPUiA9IFwiI3JlbmRlci1lcnJvcnMtaGVyZVwiO1xuXG5cbmludGVyZmFjZSBJREVBc3BlY3RDb25maWd1cmF0aW9uIHtcbiAgICBtb2RlbDogSVNoYXJlZG9CbGFkZU1vZGVsO1xuICAgIGJsYWRlOiBUU2hhcmVEb0JsYWRlO1xufVxuXG50eXBlIE9ic2VydmFibGVpZnk8VD4gPSB7XG4gICAgW1AgaW4ga2V5b2YgVF06IGtvLk9ic2VydmFibGU8VFtQXT47XG59O1xuXG5leHBvcnQgdHlwZSBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnMyPFRDb25maWc+ID1cbiAgICB7IFtLIGluIGtleW9mIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPl06IGtvLk9ic2VydmFibGU8SUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+W0tdPjsgfVxuXG5cbmV4cG9ydCB0eXBlIE9ic2VydmFibGVTaGFyZWRvQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+PlxuXG5leHBvcnQgdHlwZSBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8VENvbmZpZz4+XG5cblxuXG4vLyBleHBvcnQgdHlwZSBJT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+ID0gIHtkZWJ1Zzoga28uT2JzZXJ2YWJsZTxPYnNlcnZhYmxlSURlYnVnPn0gJlxuLy8ge1xuLy8gICAgIFtLIGluIGtleW9mIFRDb25maWddOiBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFRDb25maWc+W0tdO1xuXG4vLyB9XG5cbmV4cG9ydCB0eXBlIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPiA9IElDb25maWd1cmF0aW9uSG9zdCAmIElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+O1xuLy8gYWJzdHJhY3QgY2xhc3MgQ3JlYXRvcjxUQ29uZmlnPiB7XG4vLyAgICAgcHVibGljIGFic3RyYWN0IEZhY3RvcnlNZXRob2QoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPiwgYmFzZU1vZGVsOiBhbnkpOiBhbnk7XG4vLyB9XG5cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtQnVpbGRlckZpZWxkUGF0aChmb3JtQnVpbGRlckZpZWxkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYCR7Rk9NUl9CVUlMREVSX1BBVEhfU1RSSU5HfS4ke2Zvcm1CdWlsZGVyRmllbGR9YDtcbn1cblxudHlwZSBPYnNlcnZhYmxlUGVyc29uPFRDb25maWc+ID0gT2JzZXJ2YWJsZWlmeTxJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4+O1xuXG5pbnRlcmZhY2UgSU1vZGVsIHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlSURFQXNwZWN0PFRDb25maWcsIFRQZXJzaXRhbmNlPiAge1xuICAgIF9kYXRhOiBhbnk7IC8vbm9uIG1vZGVsIGRhdGEgc3RvcmFnZVxuICAgIG9yaWdpbmFsQ29uZmlndXJhdGlvbiE6IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgIGNvbmZpZ3VyYXRpb246IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8VENvbmZpZz4gfCB1bmRlZmluZWQ7XG4gICAgc2hhcmVkb0NvbmZpZ3VyYXRpb24hOiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz47XG4gICAgZGVmYXVsdHM6IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8VENvbmZpZz4gfCB1bmRlZmluZWQ7XG4gICAgZWxlbWVudCE6IEhUTUxFbGVtZW50O1xuICAgIG1vZGVsOiBJTW9kZWwgfCB1bmRlZmluZWQ7XG4gICAgLy8gZW5hYmxlZCE6IGJvb2xlYW47XG4gICAgYmxhZGU6IFRTaGFyZURvQmxhZGUgfCB1bmRlZmluZWQ7XG4gICAgbG9hZGVkIToga28uT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgICBzaGFyZWRvSWQhOiBrby5PYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gICAgcGFyZW50U2hhcmVkb0lkIToga28uT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZSE6IGtvLk9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPjtcbiAgICBwaGFzZU5hbWUhOiBrby5PYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gICAgcGhhc2VJc09wZW4hOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4gfCB1bmRlZmluZWQ+O1xuICAgIHZhbGlkYXRpb246IGFueTtcbiAgICB2YWxpZGF0aW9uRXJyb3JDb3VudCE6IGtvLk9ic2VydmFibGU8bnVtYmVyPjtcbiAgICBiYXNlTW9kZWwhOiBUU2hhcmVkbzxhbnk+O1xuICAgIHRoaXNDb21wb25lbnROYW1lITogc3RyaW5nO1xuICAgIExvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YTogc3RyaW5nIHwgdW5kZWZpbmVkOyAvL1RoZSBsb2NhdGlvbiB0byBsb2FkIGFuZCBzYXZlIHRoZSBkYXRhIGZyb21cbiAgICBzaGFyZURvT3B0aW9ucyE6IE9ic2VydmFibGVTaGFyZWRvQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz5cbiAgICBfc2hhcmVEb09wdGlvbnMhOiBPYnNlcnZhYmxlU2hhcmVkb0NvbmZpZ3VyYXRpb25PcHRpb25zPHVua25vd24+IC8vdXNlIGZvciB0eXBpbmdzIG9mIHRoaXMgYmFzZSBpZGUgYXMgVENvbmZpZyBjYXVzZWQgaXNzdWVcbiAgICBvcHRpb25zOiBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8SURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxUQ29uZmlnPj4gfCB1bmRlZmluZWRcbiAgICBfb3B0aW9uczogT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8dW5rbm93bj4+IHwgdW5kZWZpbmVkXG4gICAgdW5pcXVlSWQhOiBzdHJpbmc7XG4gICAgd2lkZ2V0U2V0dGluZ3MhOiBJV2lkZ2V0SnNvbjxUQ29uZmlnPjtcbiAgICBhc3BlY3RMb2dPdXRwdXQ6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgIGxpdmVDb25maWdEaXY6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgIGxpdmVDb25maWdEYXRhOiBhbnk7XG4gICAgZXJyb3JEaXZTZWxlY3Rvcjogc3RyaW5nO1xuICAgIGVycm9yczoga28uT2JzZXJ2YWJsZUFycmF5PFRVc2VyRXJyb3JzPiB8IHVuZGVmaW5lZDtcbiAgICByZWZyZXNoTG9nOiBBcnJheTxhbnk+O1xuICAgIGxhc3RSZWZyZXNoOiBEYXRlIHwgdW5kZWZpbmVkO1xuICAgIGRpc3Bvc2FibGVzOiBBcnJheTxhbnk+O1xuXG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBCYXNlIENvbnN0cnVjdG9yIGZvciBhbGwgSURFQXNwZWN0cywgZm9yY2VzIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgbG9hZCBhbmQgc2F2ZSBtZXRob2RzXG4gICAgICogQHBhcmFtIGNvbXBvbmVudE5hbWUgLy9UaGUgbmFtZSBvZiB0aGUgY29tcG9uZW50IGUuZy4gQXNwZWN0LlF1aWNrVmlld1xuICAgICAqIEBwYXJhbSBsb2FkU2F2ZUxvY2F0aW9uIC8vVGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbSBlLmcuIG1vZGVsLmFzcGVjdC5Gb3JtQnVpbGRlci5mb3JtRGF0YVxuICAgICAqIEBwYXJhbSBlbGVtZW50IC8vVGhlIGVsZW1lbnQgdGhhdCB0aGUgYXNwZWN0IGlzIGJvdW5kIHRvXG4gICAgICogQHBhcmFtIGNvbmZpZ3VyYXRpb24gLy9UaGUgY29uZmlndXJhdGlvbiBwYXNzZWQgaW4gZnJvbSB0aGUgYmxhZGUgYW5kIHRoZSBkZXNpZ24gdGltZSBjb25maWd1cmF0aW9uXG4gICAgICogQHBhcmFtIGJhc2VNb2RlbCAvL1RoZSBiYXNlIG1vZGVsIHBhc3NlZCBpbiBmcm9tIHRoZSBibGFkZVxuICAgICAqIEBwYXJhbSBkZWZhdWx0cyAvL1RoZSBkZWZhdWx0cyBwYXNzZWQgaW4gZnJvbSB0aGUgd2lkZ2V0IHRvIHNldCBpbmNhc2Ugb2YgYmFkIGNvbmZpZ3VyYXRpb24gb3IgbWlzc2luZyBjb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKTtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogVENvbmZpZywgYmFzZU1vZGVsOiBUU2hhcmVkbzxhbnk+KVxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciguLi5hcnI6IGFueVtdKSB7XG5cbiAgICAgICAgdGhpcy53aWRnZXRTZXR0aW5ncyA9IHRoaXMuc2V0V2lkZ2V0SnNvblNldHRpbmdzKCk7XG4gICAgICAgIHRoaXMudGhpc0NvbXBvbmVudE5hbWUgPSB0aGlzLnNldFRoaXNDb21wb25lbnROYW1lKCk7XG4gICAgICAgIHRoaXMuZGVmYXVsdHMgPSB0aGlzLnNldERlZmF1bHRzKCk7IC8vc2V0dXAgdGhlIGRlZmF1bHQgYnkgY2FsbGluZyB0aGUgYWJzdHJhY3QgbWV0aG9kIGluIHRoZSBjaGlsZCBjbGFzc1xuICAgICAgICB0aGlzLmRpc3Bvc2FibGVzID0gW107XG4gICAgICAgIHRoaXMucmVmcmVzaExvZyA9IG5ldyBBcnJheTxhbnk+KClcblxuICAgICAgICB0aGlzLmVycm9yRGl2U2VsZWN0b3IgPSBFUlJPUl9ESVZfU0VMRUNUT1I7XG4gICAgICAgIHRoaXMuZXJyb3JzID0ga28ub2JzZXJ2YWJsZUFycmF5PFRVc2VyRXJyb3JzPigpO1xuXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGJhc2UgY29uc3RydWN0b3JcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGNvbnN0cnVjdG9yIHRoYXQgaXMgY2FsbGVkIGJ5IHRoZSBJREVcbiAgICAgICAgICAgIHRoaXMudW5pcXVlSWQgPSB1dWlkKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpc2UoYXJyWzBdLCBhcnJbMV0sIGFyclsyXSk7XG4gICAgICAgICAgICAvLyB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9IHRoaXMuc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk7XG4gICAgICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uU2V0dXBcIiwgdGhpcy5tb2RlbCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgICAgICAgICB0aGlzLmZpcmVFdmVudChcImFmdGVyU2V0dXBcIiwgdGhpcy5tb2RlbCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwTGl2ZUNvbmZpZygpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cEV2ZW50V2F0Y2hlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cEVycm9yTWFuYWdlcigpO1xuICAgICAgICAgICAgdGhpcy5hZGRBc3BlY3RMb2dPdXRwdXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgX2luaXRpYWxpc2UoZWxlbWVudDogSFRNTEVsZW1lbnQsIHBvbHV0ZWRDb25maWd1cmF0aW9uOiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPiwgYmFzZU1vZGVsOiBUU2hhcmVkbzxhbnk+KSB7XG5cbiAgICAgICAgLy9sZXQgY29uZmlndXJhdGlvbiA9IHBvbHV0ZWRDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb247IC8vUG9sdXRlZCBhcyBTaGFyZWRvIGFkZGVkIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gdG8gdGhzaSBvYmplY3QgZGVwZW5kaW5nIG9uIHdoZXJlIGl0cyBpbnN0YW5zaWF0ZWRcbiAgICAgICAgdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbiA9IHBvbHV0ZWRDb25maWd1cmF0aW9uO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAvL1NoYXJlRG8gcGFzc2VzIHRoZSBjb25maWcgYXMgd2VsbCBhcyBvdGhlciBzdHVmZiwgc28gd2UgbmVlZCB0byBleHRyYWN0IHRoZSBjb25maWdcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24gPSBwb2x1dGVkQ29uZmlndXJhdGlvblxuICAgICAgICB0aGlzLmJhc2VNb2RlbCA9IGJhc2VNb2RlbDtcblxuICAgICAgICAvLyB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvblxuXG4gICAgICAgIC8vIGxldCBiYXNlRGVmYXVsdHM6IElEZWZhdWx0Q29uZmlnU2V0dGluZ3M8YW55PiA9IHtcbiAgICAgICAgLy8gICAgIGRlYnVnOiB7XG4gICAgICAgIC8vICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIC8vICAgICAgICAgbG9nVG9Db25zb2xlOiBmYWxzZSxcbiAgICAgICAgLy8gICAgICAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlLFxuICAgICAgICAvLyAgICAgICAgIGxpdmVDb25maWc6IGZhbHNlXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvL2NoZWNrIHRoYXQgd2UgaGF2ZSBhIHN1YiBjb25maWd1cmF0aW9uXG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gY29uZmlndXJhdGlvbiBmb3VuZCBpbiB0aGUgc2hhcmVkb0NvbmZpZ3VyYXRpb24gLSBjaGVjayB0aGUgYXNwZWN0IG9yIHdpZGdldCBjb25maWcgdGhhdCB0aGVyIGVpcyBhIGJhc2UgY29uZmlndXJhdGlvbiBvZiBjb25maWd1cmF0aW9uOnt9XCIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb25maWd1cmF0aW9uIGZvdW5kIGluIHRoZSBzaGFyZWRvQ29uZmlndXJhdGlvblwiKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9uLmRlYnVnID0gJC5leHRlbmQoREVCVUdfREVGQVVMVCgpLCB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24uZGVidWcpIGFzIElEZWJ1ZzsgLy9tYWtlIHN1cmUgZGVidWcgaXMgc2V0IG9yIHVzZSBkZWZhdWx0c1xuICAgICAgICAvLyB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbi5kZWJ1ZyA9ICQuZXh0ZW5kKGJhc2VEZWZhdWx0cy5kZWJ1ZywgdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24uZGVidWcpIGFzIElEZWJ1ZztcbiAgICAgICAgLy8gY29uZmlndXJhdGlvbi5kZWJ1ZyA9ICQuZXh0ZW5kKGJhc2VEZWZhdWx0cywgY29uZmlndXJhdGlvbi5kZWJ1ZykgYXMgSURlYnVnO1xuXG5cbiAgICAgICAgLy8gdGhpcy5kYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBNZXJnZSB0aGUgY29uZmlndXJhdGlvbiB3aXRoIHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24gPSAkLmV4dGVuZCh0aGlzLmRlZmF1bHRzLCB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9uKVxuXG5cblxuICAgICAgICAvL2NyZWF0ZSBhIG5ldyBtb2RlbFxuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWw7XG4gICAgICAgIC8vIHRoaXMuZW5hYmxlZCA9IHRoaXMubW9kZWw/LmNhbkVkaXQ7XG4gICAgICAgIHRoaXMuYmxhZGUgPSB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5ibGFkZTtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0aGlzLmxvYWRlZCB8fCBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgLy8gTWFwIHRoZSBiYXNlIG1vZGVsIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5zaGFyZWRvSWQgPSB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbC5pZCB8fCAkdWkucGFnZUNvbnRleHQ/LnNoYXJlZG9JZCB8fCBrby5vYnNlcnZhYmxlKHVuZGVmaW5lZCk7XG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvSWQgfHwgdGhpcy5zaGFyZWRvSWQoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBzaGFyZWRvSWQgZm91bmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSA9IHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsPy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUgfHwgJHVpLnBhZ2VDb250ZXh0Py5zaGFyZWRvVHlwZU5hbWUgfHwga28ub2JzZXJ2YWJsZSh1bmRlZmluZWQpO1xuICAgICAgICBpZiAoIXRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIHx8ICF0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9UeXBlU3lzdGVtTmFtZSBmb3VuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGFyZW50U2hhcmVkb0lkID0gdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWw/LnBhcmVudFNoYXJlZG9JZCB8fCBrby5vYnNlcnZhYmxlKHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMucGhhc2VOYW1lID0gdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWw/LnBoYXNlTmFtZSB8fCAkdWkucGFnZUNvbnRleHQ/LnBoYXNlTmFtZSB8fCBrby5vYnNlcnZhYmxlKHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMucGhhc2VJc09wZW4gPSB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbD8ucGhhc2VJc09wZW4gfHwgJHVpLnBhZ2VDb250ZXh0Py5waGFzZUlzT3BlbiB8fCBrby5vYnNlcnZhYmxlKHVuZGVmaW5lZCk7XG4gICAgICAgIC8vIHRoaXMuc2hhcmVEb09wdGlvbnMgPSB0b09ic2VydmFibGVPYmplY3QodGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbiwgdGhpcy5zaGFyZURvT3B0aW9ucyk7XG4gICAgICAgIC8vIHRoaXMuX3NoYXJlRG9PcHRpb25zID0gdGhpcy5zaGFyZURvT3B0aW9ucyBhcyBPYnNlcnZhYmxlU2hhcmVkb0NvbmZpZ3VyYXRpb25PcHRpb25zPHVua25vd24+XG5cbiAgICAgICAgLy8gVmFsaWRhdGlvblxuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSB7fTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JDb3VudCA9IHRoaXMudmFsaWRhdGlvbkVycm9yQ291bnQgfHwga28ub2JzZXJ2YWJsZSgwKTtcblxuICAgICAgICB0aGlzLmFwcGx5Q29tcG9uZW50Q29uZmlndXJhdGlvbih0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24pO1xuICAgICAgICAvL3NldHVwIHRoZSBsb2NhdGlvbiB0byBsb2FkIGFuZCBzYXZlIHRoZSBkYXRhIGZyb20gYnkgY2FsbGluZyB0aGUgYWJzdHJhY3QgbWV0aG9kIGluIHRoZSBjaGlsZCBjbGFzc1xuICAgICAgICAvLyEgLS0+IExvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA8LS0gLSB0aGlzIHNob3VsZCBiZSBjYWxsZWQgYXQgdGhlIGVuZCBvZiB0aGlzIGZ1bmN0aW9uIHRvIGVuc3VyZSB0aGF0IHRoZSBvcHRpb25zIGFuZCBjb25maWd1cmF0aW9uIGRhdGEgaXMgYXZhaWxhYmVsIHRvIHRoZSBjaGlsZCBjbGFzc1xuICAgICAgICB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9IHRoaXMuc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk7IFxuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uSW5pdGlhbGlzZVwiLCB0aGlzLm1vZGVsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGx5Q29tcG9uZW50Q29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uOiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPFRDb25maWc+KSB7XG5cbiAgICAgICAgbGV0IGNvbmZpZ3VyYXRpb25Bc09ic2VydmFibGVzID0gdG9PYnNlcnZhYmxlT2JqZWN0KGNvbmZpZ3VyYXRpb24sIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb247XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0gY29uZmlndXJhdGlvbkFzT2JzZXJ2YWJsZXM7XG4gICAgICAgIC8vICEgTm90ZSBsaW5lIGJlbG93IGlzIGZvciB0eXBpbmcgd2l0aGluIHRoZSBJREVCYXNlLCB0aGUgbGluZSBhYm92ZSBpcyBmb3IgdHlwaW5nIHdpdGhpbiB0aGUgY2hpbGQgY2xhc3NcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IGNvbmZpZ3VyYXRpb25Bc09ic2VydmFibGVzIGFzIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPHVua25vd24+PjtcbiAgICAgXG4gICAgfVxuXG4gICAgY2xlYXJFcnJvcnMoKSB7XG4gICAgICAgIHRoaXMuZXJyb3JzPy5yZW1vdmVBbGwoKTtcbiAgICB9XG5cbiAgICBzZXR1cEVycm9yTWFuYWdlcigpIHtcblxuICAgICAgICB0aGlzLmwoXCJTZXR0aW5nIHVwIGVycm9yIG1hbmFnZXJcIik7XG4gICAgICAgIHRoaXMuZXJyb3JzPy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluZihcIkVycm9ycyBjaGFuZ2VkXCIsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRFcnJvckRpdigpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHNldHVwTGl2ZUNvbmZpZygpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucz8uZGVidWcuc3Vic2NyaWJlKChuZXdWYWx1ZTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUubGl2ZUNvbmZpZykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVMaXZlQ29uZmlnKG5ld1ZhbHVlLmxpdmVDb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgdGhpcy5hY3RpdmF0ZUxpdmVDb25maWcodGhpcy5fb3B0aW9ucz8uZGVidWcoKS5saXZlQ29uZmlnKCkpOyAvL1RPRE8gZml4IHR5cGluZ3NcbiAgICB9XG5cbiAgICBhY3RpdmF0ZUxpdmVDb25maWcoYWN0aXZlOiBib29sZWFuIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmxpdmVDb25maWdEaXY/LnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGl2ZUNvbmZpZ0RpdikgeyAvL2xlYXZlIGFsb25lIGlmIGFscmVhZHkgYWN0aXZlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmwoXCJTZXR0aW5nIHVwIGxpdmUgY29uZmlnXCIpO1xuXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWREYXRhID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbiwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwiX2hvc3RcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sIDQpO1xuXG4gICAgICAgIC8vY2xvbmUgdGhlIGNvbmZpZ1xuICAgICAgICBsZXQgY29uZmlnID0ga28ub2JzZXJ2YWJsZShzZXJpYWxpemVkRGF0YSk7XG5cbiAgICAgICAgdGhpcy5saXZlQ29uZmlnRGF0YSA9IHtcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCB0aW1lb3V0OiBib29sZWFuID0gZmFsc2U7XG5cblxuXG4gICAgICAgIHRoaXMubGl2ZUNvbmZpZ0RpdiA9IHRoaXMuY3JlYXRlTGl2ZUNvbmZpZ0RpdigpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudC5wcmVwZW5kKHRoaXMubGl2ZUNvbmZpZ0Rpdik7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25maWcuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVGhlIG5ldyB2YWx1ZSBpcyBcIiArIG5ld1ZhbHVlKVxuXG4gICAgICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Q29uZmlnID0gSlNPTi5wYXJzZShjb25maWcoKSlcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Q29tcG9uZW50Q29uZmlndXJhdGlvbihuZXdDb25maWcuY29uZmlndXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGl2ZUNvbmZpZ3VyYXRpb25SZWZyZXNoZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5yZWZyZXNoKG5ld0NvbmZpZyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucmVzZXQobmV3Q29uZmlnKTtcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSB0cnVlO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMzAwMCk7XG5cblxuICAgICAgICAvLyBrby5hcHBseUJpbmRpbmdzKHRoaXMubGl2ZUNvbmZpZ0RhdGEsIHRoaXMubGl2ZUNvbmZpZ0Rpdik7eFxuXG4gICAgICAgIC8vIH1cbiAgICB9XG5cblxuXG4gICAgZW5zdXJlU3R5bGVzTG9hZGVkKGhyZWY6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxpbmtbaHJlZj1cIiR7aHJlZn1cIl1gKSkge1xuICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgICAgIGxpbmsuaHJlZiA9IGhyZWY7XG4gICAgICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlTGl2ZUNvbmZpZ0RpdigpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgb3V0ZXIgPGRpdj4gd2l0aCBjbGFzcyBcImNvbC1zbS0xMiBmb3JtYnVpbGRlci1lZGl0b3ItanNvblwiXG4gICAgICAgIGNvbnN0IG91dGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG91dGVyRGl2LmNsYXNzTmFtZSA9ICdjb2wtc20tMTIgZm9ybWJ1aWxkZXItZWRpdG9yLWpzb24nO1xuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgaW5uZXIgPGRpdj4gd2l0aCB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZXNcbiAgICAgICAgY29uc3QgaW5uZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaW5uZXJEaXYuaWQgPSAnbGl2ZUNvbmZpZyc7XG4gICAgICAgIGlubmVyRGl2LmNsYXNzTmFtZSA9ICdmb3JtLWNvbnRyb2wgdGV4dGFyZWEnO1xuICAgICAgICBpbm5lckRpdi5zdHlsZS5oZWlnaHQgPSAnMzAwcHgnO1xuICAgICAgICAvLyBpbm5lckRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcsICdzeW50YXhFZGl0b3I6IGxpdmVDb25maWdEYXRhLmNvbmZpZywgZW5hYmxlOiB0cnVlLCBldmVudDogeyBmb2N1c291dDogbGl2ZUNvbmZpZ0RhdGEub25Gb2N1c091dCB9Jyk7XG4gICAgICAgIGlubmVyRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJywgJ3N5bnRheEVkaXRvcjogbGl2ZUNvbmZpZ0RhdGEuY29uZmlnJyk7XG4gICAgICAgIC8vIGlubmVyRGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJywgJ3N5bnRheEVkaXRvcjogbW9kZWwuY29uZmlnJyk7XG4gICAgICAgIC8vIEFwcGVuZCB0aGUgaW5uZXJEaXYgdG8gdGhlIG91dGVyRGl2XG4gICAgICAgIG91dGVyRGl2LmFwcGVuZENoaWxkKGlubmVyRGl2KTtcblxuICAgICAgICByZXR1cm4gb3V0ZXJEaXY7XG4gICAgfVxuXG4gICAgc2V0dXBFdmVudFdhdGNoZXIoKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnM/LmV2ZW50c1RvUmVhY3RUbygpPy5mb3JFYWNoKChldmVudFRvV2F0Y2gpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJpbmcgdG8gZXZlbnRcIiwgZXZlbnRUb1dhdGNoKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgICAgICAgICAkdWkuZXZlbnRzLnN1YnNjcmliZShldmVudFRvV2F0Y2guZXZlbnRQYXRoKCksIChlOiBhbnkpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb21wb25lbnQoZXZlbnRUb1dhdGNoLmV2ZW50UGF0aCgpLCBldmVudFRvV2F0Y2gubWV0aG9kVG9DYWxsKCkpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBsZXQgcmVmcmVzaE9uID0ga28udG9KUyh0aGlzLl9vcHRpb25zPy5yZWZyZXNoT24oKSk7XG4gICAgICAgIGlmIChyZWZyZXNoT24pIHtcblxuICAgICAgICAgICAgaWYgKHJlZnJlc2hPbi5zaGFyZWRvSWRDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZG9JZC5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb21wb25lbnQoXCJzaGFyZWRvSWRDaGFuZ2VkXCIsIFwicmVmcmVzaFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVmcmVzaE9uLnNoYXJlZG9QYXJlbnRJZENoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50U2hhcmVkb0lkLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbXBvbmVudChcInNoYXJlZG9QYXJlbnRJZENoYW5nZWRcIiwgXCJyZWZyZXNoXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZWZyZXNoT24uc2hhcmVkb1BoYXNlQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waGFzZU5hbWUuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29tcG9uZW50KFwic2hhcmVkb1BoYXNlQ2hhbmdlZFwiLCBcInJlZnJlc2hcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuXG5cblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZWZyZXNoQ29tcG9uZW50KGV2ZW50UGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkLCBtZXRob2RUb0NhbGw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnJlZnJlc2hMb2cgPSB0aGlzLnJlZnJlc2hMb2cgfHwgW107XG4gICAgICAgIGlmICh0aGlzLmxhc3RSZWZyZXNoKSAvL1RPRE86IGNoYW5nZSB0aGlzIHNvIHdlIGNvbGxlY3QgYWxsIHJlZnJlc2hlcyBhbmQgZG8gdGhlbSBpbiBvbmUgZ29cbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHNlY29uZHNTaW5jZUxhc3RSZWZyZXNoID0gKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5sYXN0UmVmcmVzaC5nZXRUaW1lKCkpIC8gMTAwO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWNvbmRzIHNpbmNlIGxhc3QgcmVmcmVzaFwiLCBzZWNvbmRzU2luY2VMYXN0UmVmcmVzaCk7XG4gICAgICAgICAgICBpZiAoc2Vjb25kc1NpbmNlTGFzdFJlZnJlc2ggPCAxMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2tpcHBpbmcgcmVmcmVzaCwgdG9vIHNvb25cIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXN0UmVmcmVzaCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVmcmVzaGluZyBjb21wb25lbnRcIik7XG4gICAgICAgIGxldCBsb2dJdGVtID0geyBldmVudFBhdGg6IGV2ZW50UGF0aCwgbWV0aG9kVG9DYWxsOiBtZXRob2RUb0NhbGwsIHRpbWU6IG5ldyBEYXRlKCksIHN1Y2Nlc3M6IGZhbHNlIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kVG9DYWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gbGV0IHBhcmFtcyA9IHdpZGdldHMucGFyYW1ldGVycztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV4ZWN1dGluZyBtZXRob2RcIiwgbWV0aG9kVG9DYWxsKTtcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50VG9SZWZyZXNoID0gKHRoaXMgYXMgYW55KTtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBvbmVudFRvUmVmcmVzaFttZXRob2RUb0NhbGxdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBNZXRob2Qgbm90IGZvdW5kIG9uIGNvbXBvbmVudCAke3RoaXMudGhpc0NvbXBvbmVudE5hbWV9YCwgbWV0aG9kVG9DYWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRUb1JlZnJlc2hbbWV0aG9kVG9DYWxsXSgpOyAvL3RvZG86IHBhcmFtZXRlcnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBsb2dJdGVtLnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoTG9nLnB1c2gobG9nSXRlbSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGJ1aWxkRXJyb3JEaXYoKSB7XG4gICAgICAgIHRoaXMuaW5mKFwiQnVpbGRpbmcgZXJyb3IgZGl2XCIpXG4gICAgICAgIGxldCBlcnJvckRpdiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZXJyb3JEaXZTZWxlY3Rvcik7XG4gICAgICAgIGlmICghZXJyb3JEaXYpIHtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbChcImVycm9yRGl2LmlubmVySFRNTFwiKVxuICAgICAgICBlcnJvckRpdi5pbm5lckhUTUwgPSBcIlwiOyAvL2NsZWFuIG91dCB0aGUgZGl2XG5cbiAgICAgICAgaWYgKCF0aGlzLmVycm9ycykge1xuICAgICAgICAgICAgdGhpcy5lcnJvcnMgPSBrby5vYnNlcnZhYmxlQXJyYXk8VFVzZXJFcnJvcnM+KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZXJyb3JzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZXJyb3JDb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBlcnJvckRpdi5hcHBlbmRDaGlsZChlcnJvckNvbnRhaW5lckRpdik7XG5cbiAgICAgICAgZXJyb3JDb250YWluZXJEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWNvbnRhaW5lclwiO1xuICAgICAgICBsZXQgdGl0bGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aXRsZURpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3ItdGl0bGVcIjtcbiAgICAgICAgdGl0bGVEaXYuaW5uZXJUZXh0ID0gXCJUaGVyZSBoYXMgYmVlbiBhbiBlcnJvcjpcIjtcbiAgICAgICAgZXJyb3JDb250YWluZXJEaXYuYXBwZW5kQ2hpbGQodGl0bGVEaXYpO1xuICAgICAgICBsZXQgZm9yZWFjaERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVycm9yQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGZvcmVhY2hEaXYpO1xuXG4gICAgICAgIHRoaXMuZXJyb3JzKCkuZm9yRWFjaCgoZXJyb3IpID0+IHtcblxuICAgICAgICAgICAgbGV0IHVzZXJNZXNzYWdlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHVzZXJNZXNzYWdlRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci11c2VyLW1lc3NhZ2VcIjtcbiAgICAgICAgICAgIHVzZXJNZXNzYWdlRGl2LmlubmVySFRNTCA9IGVycm9yLnVzZXJNZXNzYWdlO1xuXG5cblxuICAgICAgICAgICAgdXNlck1lc3NhZ2VEaXYub25jbGljayA9ICgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIGEgZGl2IHRoYXQgY2FuIHNjb2xsXG4gICAgICAgICAgICAgICAgbGV0IGRldGFpbGVkTWVzc2FnZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgZGV0YWlsZWRNZXNzYWdlRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1kZXRhaWxlZC1tZXNzYWdlXCI7XG5cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBlc2NhcGVIdG1sKGVycm9yLmNvZGUgfHwgXCJcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVzY2FwZUh0bWwoZXJyb3IubWVzc2FnZSB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyTWVzc2FnZSA9IGVzY2FwZUh0bWwoZXJyb3IudXNlck1lc3NhZ2UgfHwgXCJcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JTdGFjayA9IGVzY2FwZUh0bWwoZXJyb3IuZXJyb3JTdGFjayB8fCBcIlwiKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWxJbmZvID0gSnNvblRvSHRtbENvbnZlcnRlci5jb252ZXJ0KGVycm9yLmFkZGl0aW9uYWxJbmZvIHx8IHt9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGh0bWwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+RXJyb3I6ICR7Y29kZX08L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+TWVzc2FnZTo8L3N0cm9uZz4gJHttZXNzYWdlfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPlVzZXIgTWVzc2FnZTo8L3N0cm9uZz4gJHt1c2VyTWVzc2FnZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5TdGFjazo8L3N0cm9uZz4gJHtlcnJvclN0YWNrfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkFkZGl0aW9uYWwgSW5mbzo8L3N0cm9uZz4gJHthZGRpdGlvbmFsSW5mb308L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcblxuXG4gICAgICAgICAgICAgICAgZGV0YWlsZWRNZXNzYWdlRGl2LmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICAgICAgICAgICAgICAkdWkuZXJyb3JEaWFsb2coZGV0YWlsZWRNZXNzYWdlRGl2KTtcblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGZvcmVhY2hEaXYuYXBwZW5kQ2hpbGQodXNlck1lc3NhZ2VEaXYpO1xuXG4gICAgICAgICAgICBpZiAoZXJyb3Iuc3VnZ2VzdGlvbnMgJiYgZXJyb3Iuc3VnZ2VzdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBzdWdnZXN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLXN1Z2dlc3Rpb25zXCI7XG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnNEaXYuaW5uZXJIVE1MID0gYDxiPlN1Z2dlc3Rpb25zOjwvYj48YnIvPiR7ZXJyb3Iuc3VnZ2VzdGlvbnMuam9pbihcIjxici8+XCIpfWA7XG4gICAgICAgICAgICAgICAgZm9yZWFjaERpdi5hcHBlbmRDaGlsZChzdWdnZXN0aW9uc0Rpdik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlcnJvci5hY3Rpb25zICYmIGVycm9yLmFjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBhY3Rpb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBhY3Rpb25zRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1hY3Rpb25zXCI7XG4gICAgICAgICAgICAgICAgYWN0aW9uc0Rpdi5pbm5lckhUTUwgPSBgPGI+QWN0aW9uczo8L2I+PGJyLz4ke2Vycm9yLmFjdGlvbnMuam9pbihcIjxici8+XCIpfWA7XG4gICAgICAgICAgICAgICAgZm9yZWFjaERpdi5hcHBlbmRDaGlsZChhY3Rpb25zRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVycm9yLmludGVybmFsU3VnZ2VzdGlvbnMgJiYgZXJyb3IuaW50ZXJuYWxTdWdnZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGludGVybmFsU3VnZ2VzdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGludGVybmFsU3VnZ2VzdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWludGVybmFsLXN1Z2dlc3Rpb25zXCI7XG4gICAgICAgICAgICAgICAgaW50ZXJuYWxTdWdnZXN0aW9uc0Rpdi5pbm5lckhUTUwgPSBgPGI+SW50ZXJuYWwgU3VnZ2VzdGlvbnM6PC9iPjxici8+JHtlcnJvci5pbnRlcm5hbFN1Z2dlc3Rpb25zLmpvaW4oXCI8YnIvPlwiKX1gO1xuICAgICAgICAgICAgICAgIGZvcmVhY2hEaXYuYXBwZW5kQ2hpbGQoaW50ZXJuYWxTdWdnZXN0aW9uc0Rpdik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnM/LmRlYnVnKCkuc3VwcG9ydFJlcXVlc3RFbmFibGVkKSB7XG4gICAgICAgICAgICBsZXQgYWN0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGFjdGlvbkRpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3Itc3VwcG9ydC1hY3Rpb25cIjtcbiAgICAgICAgICAgIGVycm9yQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGFjdGlvbkRpdik7XG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBcImJ0biBidG4tcHJpbWFyeVwiO1xuICAgICAgICAgICAgLy8gYnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtYmluZFwiLFwiY2xpY2s6Y3JlYXRlU3VwcG9ydFRhc2ssdmlzaWJsZTpvcHRpb25zLmRlYnVnLi5zdXBwb3J0UmVxdWVzdEVuYWJsZWRcIik7XG4gICAgICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gXCJDcmVhdGUgU3VwcG9ydCBUYXNrXCI7XG4gICAgICAgICAgICBhY3Rpb25EaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgfVxuXG5cblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICAgKiBBYnN0cmFjdCBtZXRob2QgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzIHRvIHJlZnJlc2ggdGhlIGFzcGVjdFxuICAgICAgICogQHBhcmFtIG5ld0NvbmZpZyBcbiAgICAgICAqL1xuICAgIGFic3RyYWN0IHJlZnJlc2gobmV3Q29uZmlnOiBhbnkpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgKiBBYnN0cmFjdCBtZXRob2QgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzIHRvIHJlc2V0IHRoZSBhc3BlY3QgYmFzZWQgXG4gICAgKiBAcGFyYW0gbmV3Q29uZmlnIFxuICAgICovXG4gICAgYWJzdHJhY3QgcmVzZXQobmV3Q29uZmlnOiBhbnkpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3QgbGl2ZUNvbmZpZ3VyYXRpb25SZWZyZXNoZWQoKTp2b2lkO1xuXG4gICAgLyoqXG4gICAgICogISBpbXBvcnRhbnQ6IE1hbmRhdG9yeSBtZXRob2QgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzIHRvIHNldCB0aGUgZGVmYXVsdHNcbiAgICAgKiAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBieSB0aGUgY29uc3RydWN0b3IgdG8gc2V0IHRoZSBkZWZhdWx0c1xuICAgICAqIEByZXR1cm5zIERlZmF1bHRzPFRDb25maWc+XG4gICAgICogQG1lbWJlcm9mIEJhc2VJREVBc3BlY3RcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiBcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXREZWZhdWx0cygpOiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPFRDb25maWc+O1xuXG4gICAgLy8gLyoqXG4gICAgLy8gICogISBpbXBvcnRhbnQ6IE1hbmRhdG9yeSBtZXRob2QgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzIHRvIHNldCB0aGUgZGVmYXVsdHMgZm9yIHRoZSB3aWRnZXQuanNvblxuICAgIC8vICAqL1xuICAgIC8vIGFic3RyYWN0IHNldEV4YW1wbGVGb3JNb2RlbGxlcigpOiBEZWZhdWx0czxUQ29uZmlnPjtcblxuICAgIC8qKlxuICAgICogIUlNUE9SVEFOVCAtIFRoaXMgaXMgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGxvYWQgYW5kIHNhdmUgdG9cbiAgICAqIEV4YW1wbGVzIG9mIHRoaXMgYXJlOlxuICAgICogLSBhc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhLntmb3JtQnVpbGRlckZpZWxkfVxuICAgICogLSBhc3BlY3REYXRhLm9kc0VudGl0eVBpY2tlclxuICAgICogLSB1bmRlZmluZWQgKGlmIG5vIGRhdGEgaXMgdG8gYmUgbG9hZGVkIG9yIHNhdmVkIGJ5IHRoZSBiYXNlIGNsYXNzKVxuICAgICogQHJldHVybnMgVGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGxvYWQgYW5kIHNhdmUgdG8gT1IgdW5kZWZpbmVkIGlmIG5vIGRhdGEgaXMgdG8gYmUgbG9hZGVkIG9yIHNhdmVkIGJ5IHRoZSBiYXNlIGNsYXNzXG4gICAgKi9cbiAgICBhYnN0cmFjdCBzZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogIUlNUE9SVEFOVCAtIFRoaXMgaXMgdGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCBlLmcuIFF1aWNrVmlldyBcbiAgICAgKiBUaGlzIHdpbGwgYWxzbyBiZSB1c2VkIGR1cmluZyB0aGUgYnVpbGQgYW5kIHdpbGwgYmUgYXBwZW5kZWQgd2l0aCB0aGUgQnVpbHQgVGFyZ2V0IGUuZy4gSURFQXNwZWN0cy5RdWlja1ZpZXdcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRUaGlzQ29tcG9uZW50TmFtZSgpOiBzdHJpbmc7XG5cblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBmaXJzdCBtZXRob2Qgb25jZSB0aGUgY2xhc3MgaGFzIGJlZW4gY29uc3RydWN0ZWQsIGRlZmF1bHQgY29udHJ1Y3RvciBsb2dpYyBzaG91bGQgYmUgcGxhY2VkIGhlcmVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXR1cCgpOiB2b2lkO1xuXG5cbiAgICAvKipcbiAgICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgc2V0dGluZ3MgZm9yIHRoZSB3aWRnZXQuanNvbiB0aGF0IHdpbGwgYmUgZ2VuZXJhdGVkXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0V2lkZ2V0SnNvblNldHRpbmdzKCk6IElXaWRnZXRKc29uPFRDb25maWc+O1xuXG5cblxuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudFNjcmlwdEZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudFN0eWxlRmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50VGVtcGxhdGVGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRNZW51VGVtcGxhdGVGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRDb21wb25lbnRGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXRXaWRnZXREZXNpZ25lclNldHRpbmdzKCk6IElXaWRnZXRKc29uRGVzaWduZXI7XG4gICAgLy8gYWJzdHJhY3Qgc2V0UHJpb3JpdHkoKSA6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIHdoZW4gdGhlIG1vZGVsIGlzIHNhdmVkLiBNYW5pcHVsYXRlIHRoZVxuICAgICAqIG1vZGVsIGFzIHJlcXVpcmVkLlxuICAgICAqL1xuICAgIG9uU2F2ZShtb2RlbDogYW55KSB7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25TYXZlXCIsIG1vZGVsKTtcblxuICAgICAgICBsZXQgZGF0YVRvU2F2ZSA9IHRoaXMuX2RhdGFcbiAgICAgICAgdGhpcy5sb2coXCJTYXZpbmcsIG1vZGVsIHBhc3NlZCBpbiB3ZSBuZWVkIHRvIHBlcnNpc3QgdG9cIiwgXCJncmVlblwiLCBkYXRhVG9TYXZlKTtcblxuICAgICAgICBpZiAodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBsb2NhdGlvbiB0byBzYXZlIGRhdGEgdG8gc2V0IC0gdGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRlblwiLCBcInJlZFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IGRhdGFUb1BlcnNpc3QgPSB0aGlzLl9kYXRhO1xuICAgICAgICBsZXQgY3VycmVudERhdGEgPSBnZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgICAgICBpZiAoY3VycmVudERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKGBDdXJyZW50IGRhdGEgYXQgbG9jYXRpb24gJHt0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YX0gOmAsIFwibWFnZW50YVwiLCBjdXJyZW50RGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjdXJyZW50RGF0YSkge1xuICAgICAgICAgICAgLy8gdGhpcy5sb2coXCJEYXRhIGRvZXMgbm90IGV4aXN0LCB3ZSB3aWxsIGNyZWF0ZVwiLCBcIm9yYW5nZVwiKTtcbiAgICAgICAgICAgIC8vICBzZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIHt9KTtcbiAgICAgICAgICAgIC8vIGN1cnJlbnREYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZyhgTmV3IGRhdGEgdG8gcGVyc2lzdCB0byBsb2NhdGlvbiAke3RoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhfSA6YCwgXCJibHVlXCIsIGRhdGFUb1BlcnNpc3QpO1xuICAgICAgICBzZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIGRhdGFUb1BlcnNpc3QpO1xuXG4gICAgICAgIHRoaXMubChcIkRhdGEgc2F2ZWRcIiwgbW9kZWwpO1xuXG4gICAgfTtcblxuICAgIGFzeW5jIGdldERhdGEoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vVGhpcyBzZWN0aW9uIGlzIGQ9dXNlIGR1ZSB0byB0eXBpbmcgaXNzdWUgdGhhdCBuZWVkcyB0byBiZSByZXNvbHZlZC5cbiAgICAgICAgLy8gbGV0IHVzZVBhcmVudHMgPSBndmtvKHRoaXMuX29wdGlvbnMuZGF0YVNldHRpbmdzKCkuZ2V0VmFsdWVVc2luZ1BhcmVudHMpIGFzIGJvb2xlYW4gfCB1bmRlZmluZWRcbiAgICAgICAgLy8gbGV0IHNoYXJlRG9JZD0gZ3Zrbyh0aGlzLnNoYXJlZG9JZClcbiAgICAgICAgLy8gbGV0IG1heERlcHRoID0gZ3Zrbyh0aGlzLl9vcHRpb25zLmRhdGFTZXR0aW5ncygpLm1heERlcHRoKSBhcyBudW1iZXIgfCB1bmRlZmluZWRcbiAgICAgICAgLy8gbGV0IExvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9IGd2a28odGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpIGFzIHN0cmluZyB8IHVuZGVmaW5lZFxuICAgICAgICAvL2VuZCBhcmVhIG9mIHR5cGluZyBpc3N1ZVxuXG4gICAgICAgIGxldCB1c2VQYXJlbnRzID0gdGhpcy5fb3B0aW9ucz8uZGF0YVNldHRpbmdzKCkuZ2V0VmFsdWVVc2luZ1BhcmVudHMoKVxuICAgICAgICBsZXQgc2hhcmVEb0lkID0gdGhpcy5zaGFyZWRvSWQoKVxuICAgICAgICBsZXQgbWF4RGVwdGggPSB0aGlzLl9vcHRpb25zPy5kYXRhU2V0dGluZ3MoKS5tYXhEZXB0aCgpXG4gICAgICAgIGxldCBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPSBndmtvKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcblxuICAgICAgICBpZiAoTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gbG9jYXRpb24gdG8gbG9hZCBkYXRhIGZyb20gc2V0IC0gdGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRlblwiLCBcInJlZFwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KHRoaXMubW9kZWwsIExvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2RhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5sKFwiRGF0YSBmb3VuZCBhdCBsb2NhdGlvblwiLCB0aGlzLl9kYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBrby50b0pTKHRoaXMuX2RhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgIH1cblxuICAgICAgICAvL2lmIGRhdGEgb3QgZm91bmQgaW4gdGhlIGN1cnJlbnQgbW9kZWwsIGxvb2sgdmlhIHRoZSBzZWFyY2hcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IHVuZGVmaW5lZCAmJiB1c2VQYXJlbnRzID09PSBmYWxzZSAmJiBzaGFyZURvSWQpIC8vISBUT0RPIEZpeCBUeXBpbmdzXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUoc2hhcmVEb0lkLCBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIGZhbHNlKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9kYXRhID09PSB1bmRlZmluZWQgJiYgdXNlUGFyZW50cyA9PT0gdHJ1ZSkgLy8hIFRPRE8gRml4IFR5cGluZ3NcbiAgICAgICAge1xuXG4gICAgICAgICAgICBsZXQgaWRUb1VzZXIgPSB0aGlzLnNoYXJlZG9JZCgpIHx8IHRoaXMucGFyZW50U2hhcmVkb0lkKCk7XG5cbiAgICAgICAgICAgIGlmICghaWRUb1VzZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGlkIHRvIHVzZSBmb3Igc2VhcmNoIGJvdGggc2hhcmVkb0lkIGFuZCBwYXJlbnRTaGFyZWRvSWQgYXJlIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUoaWRUb1VzZXIsIExvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgdXNlUGFyZW50cywgbWF4RGVwdGgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5mb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG5cblxuXG4gICAgc2V0RGF0YSh2YWx1ZTogVFBlcnNpdGFuY2UgfCB1bmRlZmluZWQpIHtcblxuICAgICAgICBsZXQgdmFsdWVUb1BlcnNpc3QgPSBrby50b0pTKHZhbHVlKTtcbiAgICAgICAgbGV0IHByZXZpb3VzVmFsdWUgPSBrby50b0pTKHRoaXMuX2RhdGEpO1xuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWVUb1BlcnNpc3Q7XG4gICAgICAgIHRoaXMuZmlyZVZhbHVlQ2hhbmdlZEV2ZW50KFwib25EYXRhQmVmb3JlQ2hhbmdlZFwiLCB7IHByZXZpb3VzVmFsdWU6IHByZXZpb3VzVmFsdWUsIG5ld1ZhbHVlOiB2YWx1ZVRvUGVyc2lzdCB9KTtcblxuICAgICAgICBpZiAodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbHVlVG9TZXQ6IGFueSA9IHZhbHVlO1xuICAgICAgICAvLyBpZih0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YS5pbmNsdWRlcyhcImZvcm1CdWlsZGVyXCIpKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICAvL2Zvcm1idWlsZGVyIERhdGEgYWx3YXlzIG5lZWQgdG8gYmUgc3RyaW5nXG4gICAgICAgIC8vICAgICB0aGlzLmxvZyhcIlNldHRpbmcgZm9ybWJ1aWxkZXIgZGF0YSAtIGNvbnZlcnRpbmcgdG8gc3RyaW5nXCIsIFwiZ3JlZW5cIiwgdmFsdWUpXG4gICAgICAgIC8vICAgICB2YWx1ZVRvU2V0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAvLyAgICAgdGhpcy5sb2coXCJhZnRlciBTZXR0aW5nIGZvcm1idWlsZGVyIGRhdGEgLSBjb252ZXJ0ZWQgdG8gc3RyaW5nXCIsIFwiZ3JlZW5cIiwgdmFsdWVUb1NldClcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLmxvZyhcIlNldHRpbmcgZGF0YSBhdCBsb2NhdGlvblwiLCBcImdyZWVuXCIsIHZhbHVlVG9TZXQpO1xuICAgICAgICBzZXROZXN0ZWRQcm9wZXJ0eSh0aGlzLm1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgdGhpcy5fZGF0YSk7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25EYXRhQ2hhbmdlZFwiLCB0aGlzLm1vZGVsKTtcbiAgICB9XG5cblxuICAgIG9uRGVzdHJveShtb2RlbD86IGFueSkge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uRGVzdHJveVwiKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkRlc3Ryb3lcIiwgbW9kZWwpO1xuICAgICAgICAkdWkudXRpbC5kaXNwb3NlKHRoaXMuZGlzcG9zYWJsZXMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIFVJIGZyYW1ld29yayBhZnRlciBpbml0aWFsIGNyZWF0aW9uIGFuZCBiaW5kaW5nIHRvIGxvYWQgZGF0YVxuICAgICAqIGludG8gaXQncyBtb2RlbFxuICAgICAqL1xuICAgIGxvYWRBbmRCaW5kKCkge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IGxvYWRBbmRCaW5kXCIpO1xuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSAobW9kZWw6YW55KSBwYXNzZWQgaW5cIiwgXCJncmVlblwiKTtcbiAgICAgICAgdGhpcy5sb2coXCJMb2FkaW5nIGRhdGEgYmFzZWQgb24gbG9jYXRpb24gdG8gc2F2ZVwiLCBcImdyZWVuXCIsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkxvYWRcIiwgdGhpcy5tb2RlbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIGJlZm9yZSB0aGUgbW9kZWwgaXMgc2F2ZWRcbiAgICAgKi9cbiAgICBvbkJlZm9yZVNhdmUobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkJlZm9yZVNhdmVcIik7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25CZWZvcmVTYXZlXCIsIG1vZGVsKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIGFmdGVyIHRoZSBtb2RlbCBoYXMgYmVlbiBzYXZlZC5cbiAgICAgKi9cbiAgICBvbkFmdGVyU2F2ZShtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uQWZ0ZXJTYXZlXCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uQWZ0ZXJTYXZlXCIsIG1vZGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciB3aGVuIGl0IHJlbG9hZHMgYXNwZWN0IGRhdGFcbiAgICAgKi9cbiAgICBvblJlbG9hZChtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uUmVsb2FkXCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uUmVsb2FkXCIsIG1vZGVsKTtcbiAgICB9XG5cblxuICAgIGRlYnVnU2V0dGluZ3MoKSB7XG4gICAgICAgIGxldCBkZWJ1Z1NldHRpbmc6IElEZWJ1ZyA9IERFQlVHX0RFRkFVTFQoKTtcblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucz8uZGVidWcoKSkge1xuICAgICAgICAgICAgZGVidWdTZXR0aW5nID0ga28udG9KUyh0aGlzLl9vcHRpb25zPy5kZWJ1ZygpKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlYnVnU2V0dGluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm92aWRlcyBsb2dnaW5nIGZvciB0aGUgY29tcG9uZW50IGJhc2VkIG9uIHRoZSBkZWJ1ZyBjb25maWd1cmF0aW9uXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgXG4gICAgICogQHBhcmFtIGNvbG9yIFxuICAgICAqIEBwYXJhbSBkYXRhIFxuICAgICAqL1xuICAgIGxvZyhtZXNzYWdlOiBzdHJpbmcsIGNvbG9yPzogc3RyaW5nLCBkYXRhPzogYW55KTogdm9pZCB7XG5cblxuXG4gICAgICAgIGlmICh0aGlzLmRlYnVnU2V0dGluZ3MoKS5lbmFibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Z1NldHRpbmdzKCkubG9nVG9Db25zb2xlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb2xvcikgY29sb3IgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgLy8gbGV0IGxpbmVObyA9IGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrKChuZXcgRXJyb3IoKSkuc3RhY2spO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYyAke3RoaXMudGhpc0NvbXBvbmVudE5hbWV9IC0gJHttZXNzYWdlfWAsIGBjb2xvcjoke2NvbG9yfWAsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuTG9nKCk6IGJvb2xlYW4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRlYnVnU2V0dGluZ3MoKS5lbmFibGVkO1xuICAgIH1cbiAgICBsb2dUb0NvbnNvbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbkxvZygpICYmIHRoaXMuZGVidWdTZXR0aW5ncygpLmxvZ1RvQ29uc29sZTtcbiAgICB9XG4gICAgbG9nVG9Bc3BlY3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbkxvZygpICYmIHRoaXMuZGVidWdTZXR0aW5ncygpLnNob3dJbkFzcGVjdFxuICAgIH1cblxuXG4gICAgaW5mKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwoaW5mKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdybihtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKHdybihtZXNzYWdlKSwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlcnIobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuXG4gICAgICAgIC8vZ2V0IHRoZSBwcmV2aW91cyBjYWxsZXJcblxuXG5cbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwoZXJyKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG52KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChudihuYW1lLCB2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGgxKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwobGgxKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyU2VjKCkge1xuICAgICAgICBjbGVhclNlYygpO1xuICAgIH1cblxuICAgIGwobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sb2dUb0FzcGVjdCgpKSB7XG4gICAgICAgICAgICBsZXQgYXNwZWN0TG9nT3V0cHV0ID0gdGhpcy5hc3BlY3RMb2dPdXRwdXQ7XG4gICAgICAgICAgICBpZiAoYXNwZWN0TG9nT3V0cHV0KSB7XG4gICAgICAgICAgICAgICAgYXNwZWN0TG9nT3V0cHV0LmlubmVyVGV4dCArPSBgJHttZXNzYWdlfVxcbmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRBc3BlY3RMb2dPdXRwdXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2dUb0FzcGVjdCgpKSB7IHJldHVybiB9O1xuXG4gICAgICAgIHRoaXMuYXNwZWN0TG9nT3V0cHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbGV0IGFzcGVjdExvZ091dHB1dCA9IHRoaXMuYXNwZWN0TG9nT3V0cHV0O1xuXG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5pZCA9IGBhc3BlY3RMb2dPdXRwdXQtJHt0aGlzLnVuaXF1ZUlkfWA7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBibGFja1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUucGFkZGluZyA9IFwiNXB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW4gPSBcIjVweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuaGVpZ2h0ID0gXCIyMDBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuZm9udFNpemUgPSBcIjEwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmZvbnRGYW1pbHkgPSBcIm1vbm9zcGFjZVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUud2hpdGVTcGFjZSA9IFwicHJlLXdyYXBcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLndvcmRXcmFwID0gXCJicmVhay13b3JkXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnpJbmRleCA9IFwiMTAwMFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm90dG9tID0gXCIwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUucmlnaHQgPSBcIjBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luTGVmdCA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luUmlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luVG9wID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LDI1NSwyNTUsMC44KVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1cHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnBhZGRpbmcgPSBcIjVweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm94U2hhZG93ID0gXCIwcHggMHB4IDVweCAwcHggcmdiYSgwLDAsMCwwLjc1KVwiO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudC5wcmVwZW5kKGFzcGVjdExvZ091dHB1dCk7XG5cbiAgICB9XG5cbiAgICBmaXJlRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgICAgICBsZXQgZXZlbnQ6IFNoYXJlRG9FdmVudCA9IHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogdGhpcy50aGlzQ29tcG9uZW50TmFtZSArIFwiLlwiICsgZXZlbnROYW1lLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBldmVudE5hbWUsXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH1cbiAgICAgICAgZmlyZUV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICBmaXJlVmFsdWVDaGFuZ2VkRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGNoYW5nZWREYXRhOiB7IHByZXZpb3VzVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSB9KSB7XG4gICAgICAgIGxldCBldmVudDogU2hhcmVEb0V2ZW50ID0ge1xuICAgICAgICAgICAgZXZlbnRQYXRoOiB0aGlzLnRoaXNDb21wb25lbnROYW1lICsgXCIuXCIgKyBldmVudE5hbWUsXG4gICAgICAgICAgICBldmVudE5hbWU6IGV2ZW50TmFtZSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgIGRhdGE6IGNoYW5nZWREYXRhXG4gICAgICAgIH1cbiAgICAgICAgZmlyZUV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBGb3JtYnVpbGQgaWYgaXQgZXhpc3RzIG9yIGNyZWF0ZXMgaXQgaWYgaXQgZG9lcyBub3RcbiAgICAgKiBcbiAgICAgKi9cbiAgICBmb3JtYnVpbGRlcigpIHtcblxuICAgICAgICBpZiAoIXRoaXMuYmxhZGU/Lm1vZGVsPy5hc3BlY3REYXRhPy5mb3JtQnVpbGRlcj8uZm9ybURhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBub3QgZm91bmQgLSB3aWxsIGNyZWF0ZSB0aGUgcGF0aFwiLCBcImJsdWVcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgZm91bmRcIiwgXCJncmVlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vRW5zdXJlIHRoZSBwYXRoIGV4aXN0c1xuICAgICAgICBpZiAoIXRoaXMuYmxhZGUpIHtcbiAgICAgICAgICAgIC8vVE9ETzogaWYgbm8gYmxhZGUgd2hlcmUgaXMgZm9ybSBidWlsZGVyIGRhdGFcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJsYWRlID0gdGhpcy5ibGFkZSB8fCB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5zdXJlRm9ybWJ1aWxkZXIodGhpcy5ibGFkZS5tb2RlbCk7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuYmxhZGUhLm1vZGVsIS5hc3BlY3REYXRhIS5mb3JtQnVpbGRlciEuZm9ybURhdGE7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbnN1cmVzIHRoZXJlIGlzIGEgZm9ybSBidWlsZGVyIGluIHRoZSBwYXNzZWQgaW4gbW9kZWwgYW5kIHJldHVybnMgaXRcbiAgICAgKiBAcGFyYW0gbW9kZWwgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgZW5zdXJlRm9ybWJ1aWxkZXIobW9kZWw6IGFueSk6IElGb3JtQnVpbGRlckRhdGEge1xuXG4gICAgICAgIGlmICghbW9kZWw/LmFzcGVjdERhdGE/LmZvcm1CdWlsZGVyPy5mb3JtRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIG5vdCBmb3VuZCAtIHdpbGwgY3JlYXRlIHRoZSBwYXRoXCIsIFwiYmx1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBmb3VuZFwiLCBcImdyZWVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9FbnN1cmUgdGhlIHBhdGggZXhpc3RzXG5cbiAgICAgICAgbW9kZWwgPSBtb2RlbCB8fCB7fTtcbiAgICAgICAgbW9kZWwuYXNwZWN0RGF0YSA9IG1vZGVsLmFzcGVjdERhdGEgfHwge307XG4gICAgICAgIG1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIgPSBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyIHx8IHsgZm9ybURhdGE6IHt9IH07XG5cblxuICAgICAgICByZXR1cm4gbW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YTtcbiAgICB9XG5cblxuICAgIGZvcm1idWlsZGVyRmllbGQoZm9ybWJ1aWxkZXJGaWVsZDogc3RyaW5nLCBzZXRWYWx1ZT86IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuZm9ybWJ1aWxkZXIoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJGb3JtIGJ1aWxkZXIgZG9lcyBub3QgZXhpc3QhIFwiLCBcInJlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZvcm0gYnVpbGRlciBkb2VzIG5vdCBleGlzdCFcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZm9ybUJ1aWxkZXIgPSB0aGlzLmZvcm1idWlsZGVyKCkhO1xuICAgICAgICBpZiAoIWZvcm1CdWlsZGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZm91bmRWYWx1ZSA9IGZvcm1CdWlsZGVyW2Zvcm1idWlsZGVyRmllbGRdXG4gICAgICAgIGlmICghZm91bmRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coYEZvcm0gYnVpbGRlciBkb2VzIG5vdCBjb250YWluIGZpZWxkICR7Zm9ybWJ1aWxkZXJGaWVsZH0gYCwgXCJvcmFuZ2VcIik7XG4gICAgICAgICAgICB0aGlzLmxvZyhgQ3JlYXRpbmcgZmllbGQgJHtmb3JtYnVpbGRlckZpZWxkfSBgLCBcImJsdWVcIik7XG4gICAgICAgICAgICBmb3JtQnVpbGRlcltmb3JtYnVpbGRlckZpZWxkXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQXJlIHdlIGRvaW5nIGEgc2V0XG4gICAgICAgIGlmIChzZXRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coYFNldHRpbmcgJHtmb3JtYnVpbGRlckZpZWxkfSB0byAke3NldFZhbHVlfWAsIFwiZ3JlZW5cIik7XG4gICAgICAgICAgICBmb3JtQnVpbGRlcltmb3JtYnVpbGRlckZpZWxkXSA9IHNldFZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHNldFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvdW5kVmFsdWU7XG4gICAgfVxuXG59XG5cblxuXG4vLyBjbGFzcyBNeUNsYXNzIHtcblxuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpO1xuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwMTogbnVtYmVyKTtcbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IocDE6IHN0cmluZywgcDI6IHN0cmluZyk7XG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKHAxOiBzdHJpbmcsIHAyOiBzdHJpbmcsIHAzOiBzdHJpbmcpO1xuXG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKC4uLmFycjogYW55W10pIHtcbi8vICAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDIpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0d28gYXJndW1lbnRzIGNvbnN0cnVjdG9yIGNhbGxlZC4nKTtcbi8vICAgICAgICAgfSBlbHNlIGlmIChhcnIubGVuZ3RoID09PSAzKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhyZWUgYXJndW1lbnRzIGNvbnN0cnVjdG9yIGNhbGxlZC4nKTtcbi8vICAgICAgICAgfSBlbHNlIGlmIChhcnIubGVuZ3RoID09PSAxKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25lIGFyZ3VtZW50IGNvbnN0cnVjdG9yIGNhbGxlZC4nKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cblxuLy8gfVxuXG4vLyBsZXQgeCA9IG5ldyBNeUNsYXNzKCkiLCJpbXBvcnQgeyBJRGVidWcgfSBmcm9tIFwiLi9JRGVidWdcIjtcbmltcG9ydCB7IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWcsIElSZWZyZXNoT24gfSBmcm9tIFwiLi9JV2lkZ2V0SnNvblwiO1xuXG5leHBvcnQgY29uc3QgREVCVUdfREVGQVVMVCA9ICgpID0+ICB7XG5cbiAgICBsZXQgcmV0VmFsdWU6SURlYnVnID0ge1xuICAgICAgc3VwcG9ydFJlcXVlc3RFbmFibGVkOiBmYWxzZSxcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICBsb2dUb0NvbnNvbGU6IHRydWUsXG4gICAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlLFxuICAgICAgbGl2ZUNvbmZpZzogZmFsc2UsXG4gICAgfVxuICAgIHJldHVybiByZXRWYWx1ZTtcbiAgXG4gIH1cblxuICBleHBvcnQgY29uc3QgUkVGUkVTSF9PTl9ERUZBVUxUUyA6SVJlZnJlc2hPbj1cbiAge1xuICAgIHNoYXJlZG9JZENoYW5nZWQ6IGZhbHNlLFxuICAgIHNoYXJlZG9QYXJlbnRJZENoYW5nZWQ6IGZhbHNlLFxuICAgIHNoYXJlZG9QaGFzZUNoYW5nZWQ6IGZhbHNlLFxuICB9XG5cblxuICBleHBvcnQgY29uc3QgRGVmYXVsdERhdGFTZXR0aW5nczpJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPHVua25vd24+ID1cbiAge1xuICAgIGRlYnVnOiBERUJVR19ERUZBVUxUKCksXG4gICAgcmVmcmVzaE9uOiBSRUZSRVNIX09OX0RFRkFVTFRTLFxuICAgIGV2ZW50c1RvUmVhY3RUbzogW1xuICAgICAge1xuICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby51cGRhdGVkXCIsXG4gICAgICAgIG1ldGhvZFRvQ2FsbDogXCJyZWZyZXNoXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLmNvcmUuY2FzZS5zaGFyZWRvLXVwZGF0ZWRcIixcbiAgICAgICAgbWV0aG9kVG9DYWxsOiBcInJlZnJlc2hcIlxuICAgICAgfVxuICAgIF0sXG4gICAgZGF0YVNldHRpbmdzOiB7XG4gICAgICBnZXRWYWx1ZVVzaW5nUGFyZW50czogZmFsc2UsXG4gICAgICBtYXhEZXB0aDogMFxuICAgIH1cbiAgfVxuICAiLCJpbXBvcnQgKiBhcyBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgeyBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vSVdpZGdldEpzb24nO1xuXG5leHBvcnQgdHlwZSBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+ID0ge1xuICAgIFtLIGluIGtleW9mIFRdICAgICAgOiBUW0tdIGV4dGVuZHMgQXJyYXk8aW5mZXIgVT4gPyBrby5PYnNlcnZhYmxlQXJyYXk8TmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxVPj4gOlxuICAgIFRbS10gZXh0ZW5kcyBvYmplY3QgPyBrby5PYnNlcnZhYmxlPE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VFtLXT4+IDoga28uT2JzZXJ2YWJsZTxUW0tdPjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB0b09ic2VydmFibGVPYmplY3Q8VD4ob2JqOiBULCBleGlzdGluZz86IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD4pOiBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+IHtcbiAgICBcbiAgICBpZighZXhpc3RpbmcpIGV4aXN0aW5nID0ge30gYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPjtcbiAgIFxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSAmJiBrZXkgIT09IFwiX19rb19tYXBwaW5nX19cIiAmJiBrZXkgIT09IFwiX2hvc3RcIikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBvYmpba2V5IGFzIGtleW9mIFRdO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IGtvLm9ic2VydmFibGVBcnJheSh2YWx1ZS5tYXAoaXRlbSA9PiB0b09ic2VydmFibGVPYmplY3QoaXRlbSwge30gYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDx0eXBlb2YgaXRlbT4pKSkgYXMgYW55O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0aW5nW2tleV09ZW5zdXJlSXNPYnNlcnZhYmxlQXJyYXkoZXhpc3RpbmcsIGtleSlcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSh2YWx1ZS5tYXAoaXRlbSA9PiB0b09ic2VydmFibGVPYmplY3QoaXRlbSwge30gYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDx0eXBlb2YgaXRlbT4pKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZ1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0gPSBrby5vYnNlcnZhYmxlKHRvT2JzZXJ2YWJsZU9iamVjdCh2YWx1ZSwge30gYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDx0eXBlb2YgdmFsdWU+KSkgYXMgYW55O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0aW5nW2tleV0gID0gZW5zdXJlSXNPYnNlcnZhYmxlKGV4aXN0aW5nLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldKHRvT2JzZXJ2YWJsZU9iamVjdCgodmFsdWUgYXMgYW55KSwgKGV4aXN0aW5nW2tleV0oKSBhcyBhbnkpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgKGV4aXN0aW5nW2tleV0gYXMgYW55KSA9IGtvLm9ic2VydmFibGUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0aW5nW2tleV0gPSBlbnN1cmVJc09ic2VydmFibGUoZXhpc3RpbmcsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0oKHZhbHVlIGFzIGFueSkpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZXhpc3RpbmcgYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSURlYnVnIHtcbiAgICBzdXBwb3J0UmVxdWVzdEVuYWJsZWQ/OiBib29sZWFuO1xuICAgICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgICAgIGxvZ1RvQ29uc29sZTogYm9vbGVhbjtcbiAgICAgIHNob3dJbkFzcGVjdDogYm9vbGVhbjtcbiAgICAgIGxpdmVDb25maWc/OiBib29sZWFuO1xuICAgIH1cbiAgXG5cblxuZnVuY3Rpb24gZW5zdXJlSXNPYnNlcnZhYmxlKGV4aXN0aW5nOiBhbnksIGtleTogc3RyaW5nKSB7XG4gICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShleGlzdGluZ1trZXldKSkge1xuICAgICAgICByZXR1cm4gZXhpc3Rpbmdba2V5XSA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4ga28ub2JzZXJ2YWJsZSgpO1xuICAgIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGVuc3VyZUlzT2JzZXJ2YWJsZUFycmF5KGV4aXN0aW5nOiBhbnksIGtleTogc3RyaW5nKSB7XG4gICAgaWYgKGtvLmlzT2JzZXJ2YWJsZUFycmF5KGV4aXN0aW5nW2tleV0pKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1trZXldIDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBrby5vYnNlcnZhYmxlQXJyYXkoKTtcbiAgICB9XG59XG5cbi8vIGV4cG9ydCB0eXBlIElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+ID0gVENvbmZpZyAmIHtcbi8vICAgICBkZWJ1ZzogSURlYnVnO1xuLy8gICB9XG5cbi8vIGV4cG9ydCB0eXBlIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPiA9IFxuLy8geyBbSyBpbiBrZXlvZiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5dOiBrby5PYnNlcnZhYmxlPElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPltLXT47IH1cblxuLy8gZXhwb3J0IGludGVyZmFjZSBJQ29uZmlndXJhdGlvbkhvc3Qge1xuLy8gICAgIF9ob3N0OiB7XG4vLyAgICAgICAgIGJsYWRlOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLkFkZEVkaXRTaGFyZWRvO1xuLy8gICAgICAgICBlbmFibGVkOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+OyAvLyBVc2luZyAnYW55JyBmb3IgcmV0dXJuIHR5cGUgYXMgaXQncyBub3QgY2xlYXIgd2hhdCB0aGVzZSBmdW5jdGlvbnMgcmV0dXJuXG4vLyAgICAgICAgIG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZXhwb3J0IHR5cGUgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+ID0gSUNvbmZpZ3VyYXRpb25Ib3N0ICYgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz47XG5cbi8vIGludGVyZmFjZSBSb290T2JqZWN0IHtcbi8vICAgbDE6IHN0cmluZztcbi8vICAgbzE6IE8xO1xuLy8gfVxuXG4vLyBpbnRlcmZhY2UgTzEge1xuLy8gICBsMjogc3RyaW5nO1xuLy8gICBvMjogTzI7XG4vLyAgIGExOiBBMVtdO1xuLy8gfVxuXG4vLyBpbnRlcmZhY2UgQTEge1xuLy8gICBsNDogc3RyaW5nO1xuLy8gfVxuXG4vLyBpbnRlcmZhY2UgTzIge1xuLy8gICBsMzogc3RyaW5nO1xuLy8gfVxuLy8gLy8gTm93IGxldCdzIHVzZSB0aGUgZnVuY3Rpb246XG4vLyBjb25zdCB4OiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxSb290T2JqZWN0PiA9IHtcbi8vICAgICBsMTogXCJsMVwiLFxuLy8gICAgIG8xOiB7XG4vLyAgICAgICAgIGwyOlwibDJcIixcbi8vICAgICAgICAgbzI6IHtcbi8vICAgICAgICAgICAgIGwzOiBcImwzXCIsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIGExOiBbXG4vLyAgICAgICAgICAgICB7IGw0OiBcImw0XCIgfVxuLy8gICAgICAgICBdXG4vLyAgICAgfSxcbi8vICAgICBkZWJ1Zzpcbi8vICAgICB7XG4vLyAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuLy8gICAgICAgICBsb2dUb0NvbnNvbGU6IGZhbHNlLFxuLy8gICAgICAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlXG4vLyAgICAgfVxuLy8gfVxuXG4vLyBsZXQgbSA6ICBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFJvb3RPYmplY3Q+PlxuXG4vLyBsZXQgeSA9IHRvT2JzZXJ2YWJsZU9iamVjdCh4LHt9IGFzIGFueSkgYXMgIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248Um9vdE9iamVjdD4+XG5cbi8vIGxldCBwID0geS5kZWJ1ZygpLmxpdmVDb25maWchKClcblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHRvT2JzZXJ2YWJsZU9iamVjdChvYmo6IGFueSwgZXhpc3RpbmdPYnNlcnZhYmxlcz86a28uT2JzZXJ2YWJsZTxhbnk+KToga28uT2JzZXJ2YWJsZSB7XG4vLyAgICAgY29uc3QgcmVzdWx0ID0gZXhpc3RpbmdPYnNlcnZhYmxlcyB8fCB7fSBhcyBrby5PYnNlcnZhYmxlO1xuXG4vLyAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4vLyAgICAgICAgIGlmKGtleSA9PT0gXCJfX2tvX21hcHBpbmdfX1wiKSBjb250aW51ZTtcbi8vICAgICAgICAgaWYoa2V5ID09PSBcIl9ob3N0XCIpIGNvbnRpbnVlO1xuXG4vLyAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4vLyAgICAgICAgICAgICBsZXQgbmV3diA9IG9ialtrZXldO1xuLy8gICAgICAgICAgICAgbGV0IGN1cnIgPSAocmVzdWx0IGFzIGFueSlba2V5XSA7XG5cbi8vICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShuZXd2KSAmJiB0eXBlb2YgbmV3diA9PT0gXCJvYmplY3RcIiAmJiBuZXd2ICE9PSBudWxsICYmICFrby5pc09ic2VydmFibGUobmV3dikpIHtcbi8vICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IHRvT2JzZXJ2YWJsZU9iamVjdChuZXd2IGFzIG9iamVjdCkgXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0b09ic2VydmFibGVPYmplY3RcIiwgKHJlc3VsdCBhcyBhbnkpW2tleV0pO1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0ga28ub2JzZXJ2YWJsZSgocmVzdWx0IGFzIGFueSlba2V5XSk7XG4vLyAgICAgICAgICAgICAgICAgY29udGludWU7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5ld3YpKSB7XG4vLyAgICAgICAgICAgICAgICAgaWYgKGN1cnIgJiYga28uaXNPYnNlcnZhYmxlQXJyYXkoY3VycikpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0obmV3dik7XG4vLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSBrby5vYnNlcnZhYmxlQXJyYXkobmV3dikgYXMgYW55O1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICBjb250aW51ZTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShuZXd2KSkge1xuLy8gICAgICAgICAgICAgICAgIG5ld3YgPSBuZXd2KCk7IC8vIHB1bGwgb3V0IHRoZSB2YWx1ZVxuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICBpZiAoY3VyciAmJiBrby5pc09ic2VydmFibGUoY3VycikpIHtcbi8vICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XShuZXd2KTsgLy8gdXBkYXRlIHRoZSBleGlzdGluZyBvYnNlcnZhYmxlXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0ga28ub2JzZXJ2YWJsZShuZXd2KTtcbiAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgIH1cblxuLy8gICAgIHJldHVybiByZXN1bHQ7XG4vLyB9XG4iLCJcclxuaW1wb3J0IHsgZm9ybWF0VmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vaGVscGVycy9Gb3JtYXR0ZXJcIjtcclxuaW1wb3J0IHsgc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9hcGkvc2VhcmNoRm9yQXR0cmlidXRlV2l0aFBhcmVudHNcIjtcclxuaW1wb3J0IHsgQmFzZUlERUFzcGVjdCB9IGZyb20gXCIuLi9CYXNlQ2xhc3Nlcy9CYXNlSURFQXNwZWN0XCI7XHJcbmltcG9ydCB7IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWcsIElXaWRnZXRKc29uIH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0lXaWRnZXRKc29uXCI7XHJcbmltcG9ydCB7IERlZmF1bHQsIElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24sIFdpZGdldFNldHRpbmdzIH0gZnJvbSBcIi4vU2luZ2xlVmFsdWVBc3BlY3RDb25maWdcIjtcclxuXHJcbmxldCB0aGlzV2lkZ2V0U3lzdGVtTmFtZSA9IFwiU2luZ2xlVmFsdWVBc3BlY3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaW5nbGVWYWx1ZUFzcGVjdCBleHRlbmRzIEJhc2VJREVBc3BlY3Q8SVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbiwgYW55PiB7XHJcbiAgICBsaXZlQ29uZmlndXJhdGlvblJlZnJlc2hlZCgpOiB2b2lkIHtcclxuICAgICAgICAvL25vdGhpbmdcclxuICAgIH1cclxuICAgIHJlZnJlc2gobmV3Q29uZmlnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL25vdGhpbmdcclxuICAgIH1cclxuICAgIHJlc2V0KG5ld0NvbmZpZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy9ub3RoaW5nXHJcbiAgICB9XHJcbiAgICBzZXRUaGlzQ29tcG9uZW50TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNpbmdsZVZhbHVlQXNwZWN0XCI7XHJcbiAgICB9XHJcbiAgICBzZXRXaWRnZXRKc29uU2V0dGluZ3MoKTogSVdpZGdldEpzb248SVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiBXaWRnZXRTZXR0aW5ncztcclxuICAgIH1cclxuXHJcbiAgICBzZXREZWZhdWx0cygpOiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+IHtcclxuICAgICAgICByZXR1cm4gIERlZmF1bHRcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbDogYW55KSB7XHJcbiAgICAvLyAgICAgc3VwZXIoXCJTaW5nbGVWYWx1ZUFzcGVjdFwiLCBcImFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyXCIsIGVsZW1lbnQsIGNvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbClcclxuICAgIC8vICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcml2YXRlIGluaXRpYWxpc2UoKSB7Ly8hIE5vdGU6IFVJIGZyYW1ld29yayBsb29rcyBmb3IgdGhpcyBtZXRob2QgbmFtZSBhbmQgaWYgZm91bmQgYmVoYXZlcyBkaWZmZXJlbnRseSBhbmQgd29udCBjYWxsIGxvYWRBbmRCaW5kXHJcblxyXG4gICAgYXN5bmMgc2V0dXAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgdmFsdWU6IFwiXCIsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLm9wdGlvbnM/LnRpdGxlKCkgfHwgXCJUaXRsZSBWYWx1ZVwiXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcCB0aGUgcm9sZUNvbmZpZ01vZGVsc1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz8uZmllbGRQYXRoLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJGaWVsZCBwYXRoIGNoYW5nZWRcIiwgXCJncmVlblwiLG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQW5kQmluZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz8uY2FsY3VsYXRlZFRpdGxlKHRoaXMub3B0aW9ucz8udGl0bGUoKSB8fCBcIlRpdGxlIFZhbHVlXCIpO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucz8udGl0bGUuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhcIlRpdGxlIGNoYW5nZWRcIiwgXCJncmVlblwiLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmKG5ld1ZhbHVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zPy5jYWxjdWxhdGVkVGl0bGUobmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcnJpZGUgbG9hZEFuZEJpbmQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBkYXRhIChtb2RlbCkgcGFzc2VkIGluXCIsIFwiZ3JlZW5cIik7XHJcbiAgICAgICAgLy8gc3VwZXIubG9hZEFuZEJpbmQoKTsgLy9ObyBuZWVkIHRvIGxvYWQgYW5kIGJpbmQgYXMgd2UgYXJlIG5vdCB1c2luZyB0aGUgYmFzZSBtb2RlbFxyXG5cclxuICAgICAgICBsZXQgc2hhcmVkb0lkID0gdGhpcy5zaGFyZWRvSWQoKTtcclxuXHJcbiAgICAgICAgaWYoIXNoYXJlZG9JZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gc2hhcmVkb0lkIHBhc3NlZCBpblwiLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXRoaXMub3B0aW9ucz8uZmllbGRQYXRoKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGZpZWxkIHBhdGggcGFzc2VkIGluXCIsIFwicmVkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUoc2hhcmVkb0lkLCB0aGlzLm9wdGlvbnM/LmZpZWxkUGF0aCgpISwgdGhpcy5vcHRpb25zPy5kYXRhU2V0dGluZ3MoKS5nZXRWYWx1ZVVzaW5nUGFyZW50cygpLCB0aGlzLm9wdGlvbnM/LmRhdGFTZXR0aW5ncygpLm1heERlcHRoKCkpLnRoZW4oKGRhdGEpPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghZGF0YSB8fCBkYXRhLmZvdW5kID09IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhcIk5vIGRhdGEgcmV0dXJuZWRcIiwgXCJyZWRcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnM/LmNhbGN1bGF0ZWRWYWx1ZSh0aGlzLm9wdGlvbnM/LnZhbHVlT25Ob3RGb3VuZCgpIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0VmFsdWUoZGF0YS52YWx1ZSwgdGhpcy5vcHRpb25zPy5mb3JtYXR0ZXIoKSB8fCBcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zPy5jYWxjdWxhdGVkVmFsdWUoZm9ybWF0dGVkVmFsdWUgfHwgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgb3ZlcnJpZGUgYXN5bmMgb25TYXZlKG1vZGVsOiBhbnkpIHtcclxuXHJcbiAgICAgICAgdGhpcy5sb2coXCJObyBTYXZlIEltcGxlbWVudGVkXCIsIFwiZ3JlZW5cIik7XHJcbiAgICAgICAgLy8gc3VwZXIub25TYXZlKG1vZGVsKTtcclxuXHJcbiAgICB9O1xyXG59ICIsImltcG9ydCB7IERFQlVHX0RFRkFVTFQgfSBmcm9tIFwiLi4vQmFzZUNsYXNzZXMvRGVidWdEZWZhdWx0c1wiO1xuaW1wb3J0IHsgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZywgSVdpZGdldEpzb24gfSBmcm9tIFwiLi4vQmFzZUNsYXNzZXMvSVdpZGdldEpzb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uIHtcbiAgICBmaWVsZFBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICB0aXRsZTogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbFxuICAgIHZhbHVlT25Ob3RGb3VuZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGNhbGN1bGF0ZWRWYWx1ZTogc3RyaW5nO1xuICAgIGNhbGN1bGF0ZWRUaXRsZTogc3RyaW5nO1xuICAgIGZvcm1hdHRlcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxufVxuXG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0OiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+ID0ge1xuIFxuICAgIGZpZWxkUGF0aDogXCJ0aXRsZVwiLFxuICAgIHRpdGxlOiBudWxsLFxuICAgIGNhbGN1bGF0ZWRWYWx1ZTogXCJcIixcbiAgICBjYWxjdWxhdGVkVGl0bGU6IFwiXCIsXG4gICAgdmFsdWVPbk5vdEZvdW5kOiBcIk5vdCBGb3VuZFwiLFxuICAgIGZvcm1hdHRlcjogXCJ2YWx1ZVwiLC8vaWYocHJpb3JpdHkubmFtZSA9PT0gJ25vcm1hbCcpIHsgICAgICAgICByZXR1cm4gPSAnPHNwYW4gY2xhc3M9XCJub3JtYWxcIj5Ob3JtYWwgUHJpb3JpdHk8L3NwYW4+JzsgICAgIH0gZWxzZSBpZihwcmlvcml0eS5uYW1lID09PSAnaGlnaCcpIHsgICAgICAgICByZXR1cm4gPSAnPHNwYW4gY2xhc3M9XCJoaWdoXCI+SGlnaCBQcmlvcml0eTwvc3Bhbj4nOyAgICAgfSBlbHNlIGlmKHByaW9yaXR5Lm5hbWUgPT09ICd1cmdlbnQnKSB7ICAgICAgICAgcmV0dXJuID0gJzxzcGFuIGNsYXNzPVwidXJnZW50XCI+VXJnZW50IFByaW9yaXR5PC9zcGFuPic7ICAgICB9IGVsc2UgeyAgICAgICAgIHJldHVybiA9ICc8c3Bhbj5Vbmtub3duIFByaW9yaXR5PC9zcGFuPic7ICAgICB9XG4gICAgZGVidWc6IERFQlVHX0RFRkFVTFQoKSxcbiAgICBcbiAgICBldmVudHNUb1JlYWN0VG86IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZXZlbnRQYXRoOiBcInNoYXJlZG8uY29yZS5jYXNlLnBoYXNlLWNoYW5nZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLmNvcmUuY2FzZS5mb3Jtcy5waGFzZS5waGFzZS1jaGFuZ2VkXCIsXG4gICAgICAgICAgICBtZXRob2RUb0NhbGw6IFwibG9hZEFuZEJpbmRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby51cGRhdGVkXCIsXG4gICAgICAgICAgICBtZXRob2RUb0NhbGw6IFwibG9hZEFuZEJpbmRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby5jb3JlLmNhc2Uuc2hhcmVkby11cGRhdGVkXCIsXG4gICAgICAgICAgICBtZXRob2RUb0NhbGw6IFwibG9hZEFuZEJpbmRcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICByZWZyZXNoT246IHtcbiAgICAgICAgc2hhcmVkb0lkQ2hhbmdlZDogdHJ1ZSxcbiAgICAgICAgc2hhcmVkb1BhcmVudElkQ2hhbmdlZDogdHJ1ZSxcbiAgICAgICAgc2hhcmVkb1BoYXNlQ2hhbmdlZDogdHJ1ZSxcbiAgICB9LFxuICAgIGRhdGFTZXR0aW5nczoge1xuICAgICAgICBnZXRWYWx1ZVVzaW5nUGFyZW50czogZmFsc2UsXG4gICAgICAgIG1heERlcHRoOiAwLFxuICAgIH1cblxuXG59XG5cbmV4cG9ydCBjb25zdCBXaWRnZXRTZXR0aW5ncyA6IElXaWRnZXRKc29uPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+ID17XG4gICAgdHlwZTogXCJ3aWRnZXRcIixcbiAgICBcInByaW9yaXR5XCI6IDYwMDAsXG4gICAgXCJkZXNpZ25lclwiOiB7XG4gICAgICAgIFwiYWxsb3dJblBvcnRhbERlc2lnbmVyXCI6IGZhbHNlLFxuICAgICAgICBcImFsbG93SW5TaGFyZWRvUG9ydGFsRGVzaWduZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJhbGxvd0FzcGVjdEFkYXB0ZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJ0aXRsZVwiOiBcIlNpbmdsZSBWYWx1ZSBBc3BlY3RcIixcbiAgICAgICAgXCJpY29uXCI6IFwiZmEtY29nXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJTaW5nbGUgVmFsdWUgQXNwZWN0XCIsXG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbICAgXCJVRCAtIElERUFzcGVjdHNcIl0sXG4gICAgICAgIFwiaXNDb25maWd1cmFibGVcIjogdHJ1ZSxcbiAgICAgICAgXCJjb25maWd1cmF0aW9uV2lkZ2V0XCI6IG51bGwsXG4gICAgICAgIFwiZGVmYXVsdENvbmZpZ3VyYXRpb25Kc29uXCI6IHsgY29uZmlndXJhdGlvbjogRGVmYXVsdH1cbiAgICB9LFxuICAgIFwic2NyaXB0c1wiOiBbXG4gICAgXSxcbiAgICBcInN0eWxlc1wiOiBbXG4gICAgICAgIFwiU2luZ2xlVmFsdWVBc3BlY3QuY3NzXCJcbiAgICBdLFxuICAgIFwidGVtcGxhdGVzXCI6IFtcbiAgICAgICAgXCJTaW5nbGVWYWx1ZUFzcGVjdC5odG1sXCJcbiAgICBdLFxuICAgIFwibWVudVRlbXBsYXRlc1wiOiBbXSxcbiAgICBcImNvbXBvbmVudHNcIjogW11cbn0iLCJpbXBvcnQgeyBJV2lkZ2V0SnNvbiB9IGZyb20gXCIuLi8uLi9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0lXaWRnZXRKc29uXCI7XG5pbXBvcnQgeyBJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uLCBEZWZhdWx0IH0gZnJvbSBcIi4uLy4uL0lERUFzcGVjdHMvU2luZ2xlVmFsdWVBc3BlY3QvU2luZ2xlVmFsdWVBc3BlY3RDb25maWdcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJU2luZ2xlVmFsdWVQb3J0YWxDb25maWd1cmF0aW9uIGV4dGVuZHMgSVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbiB7XG4gICAgXG59XG5cbmV4cG9ydCBjb25zdCBTaW5nbGVWYWx1ZVBvcnRhbERlZmF1bHQgPSBEZWZhdWx0O1xuXG5leHBvcnQgY29uc3QgV2lkZ2V0U2V0dGluZ3MgOiBJV2lkZ2V0SnNvbjxJU2luZ2xlVmFsdWVQb3J0YWxDb25maWd1cmF0aW9uPiA9e1xuICAgIHR5cGU6IFwid2lkZ2V0XCIsXG4gICAgXCJwcmlvcml0eVwiOiA2MDAwLFxuICAgIFwiZGVzaWduZXJcIjoge1xuICAgICAgICBcImFsbG93SW5Qb3J0YWxEZXNpZ25lclwiOiB0cnVlLFxuICAgICAgICBcImFsbG93SW5TaGFyZWRvUG9ydGFsRGVzaWduZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJhbGxvd0FzcGVjdEFkYXB0ZXJcIjogZmFsc2UsXG4gICAgICAgIFwidGl0bGVcIjogXCJTaW5nbGUgVmFsdWUgUG9ydGFsIFdpZGdldFwiLFxuICAgICAgICBcImljb25cIjogXCJmYS1jb2dcIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlNob3cgYSBzaW5nbGUgdmFsdWUgaW4gYSBwb3J0YWwgd2lkZ2V0XCIsXG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbICAgXCJVRCAtIElERUFzcGVjdHNcIl0sXG4gICAgICAgIFwiaXNDb25maWd1cmFibGVcIjogdHJ1ZSxcbiAgICAgICAgXCJjb25maWd1cmF0aW9uV2lkZ2V0XCI6IFwiUG9ydGFsV2lkZ2V0cy5TaW5nbGVWYWx1ZVBvcnRhbFdpZGdldERlc2lnbmVyXCIsXG4gICAgICAgIFwiZGVmYXVsdENvbmZpZ3VyYXRpb25Kc29uXCI6IHsgY29uZmlndXJhdGlvbjogRGVmYXVsdH1cbiAgICB9LFxuICAgIFwic2NyaXB0c1wiOiBbXG4gICAgXSxcbiAgICBcInN0eWxlc1wiOiBbXG4gICAgICAgIFwiU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXQuY3NzXCJcbiAgICBdLFxuICAgIFwidGVtcGxhdGVzXCI6IFtcbiAgICAgICAgXCJTaW5nbGVWYWx1ZVBvcnRhbFdpZGdldC5odG1sXCJcbiAgICBdLFxuICAgIFwibWVudVRlbXBsYXRlc1wiOiBbXSxcbiAgICBcImNvbXBvbmVudHNcIjogW11cbn0iLCJcblxuLyoqXG4gKiAqIEZvcm1hdCBhIHZhbHVlIHVzaW5nIGEgZm9ybWF0dGVyIHN0cmluZ1xuICogKiBFeGFtcGxlczogXG4gKiAqIDEuIHZhbHVlXG4gKiAqIDIuIHZhbHVlLnRvVXBwZXJDYXNlKClcbiAqICogMy4gdmFsdWUgPyB2YWx1ZS50b1VwcGVyQ2FzZSgpIDogXCJcIlxuICogKiA0LiB2YWx1ZSA/IHZhbHVlLnRvVXBwZXJDYXNlKCkgOiBcIk5vIFZhbHVlXCJcbiAqICogNS4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlRGF0ZVN0cmluZygpXG4gKiAqIDYuIHZhbHVlID8gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlRGF0ZVN0cmluZygpIDogXCJcIlxuICogQHBhcmFtIHZhbHVlIFxuICogQHBhcmFtIGZvcm1hdHRlciBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VmFsdWUodmFsdWU6IGFueSwgZm9ybWF0dGVyOiBzdHJpbmcpOiBhbnkge1xuICAgIC8vIENyZWF0ZSBhIG5ldyBmdW5jdGlvbiBiYXNlZCBvbiB0aGUgZm9ybWF0dGVyXG4gICAgbGV0IGR5bmFtaWNGdW5jIDogRnVuY3Rpb25cbiAgICBsZXQgcmV0dXJuVmFsdWU6IGFueTtcbiAgICB0cnl7XG4gICAgICAgICBkeW5hbWljRnVuYyA9IG5ldyBGdW5jdGlvbigndmFsdWUnLCBgcmV0dXJuICgke2Zvcm1hdHRlcn0pO2ApO1xuICAgIC8vIEludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gdmFsdWVcbiAgICAgcmV0dXJuVmFsdWUgPSBkeW5hbWljRnVuYyh2YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoKGUpXG4gICAge1xuICAgICAgICByZXR1cm5WYWx1ZSA9IGBFcnJvciBmb3JtYXR0aW5nIHZhbHVlICR7dmFsdWV9IHdpdGggZm9ybWF0dGVyICR7Zm9ybWF0dGVyfSAtICR7ZX1gO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRGdW5jID0gZm9ybWF0VmFsdWU7IC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIGNvbnN0IHV1aWQgPSB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5hdGl2ZS5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVTdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsIm1vZHVsZS5leHBvcnRzID0ga287IiwiaW1wb3J0IGFuc2lTdHlsZXMgZnJvbSAnI2Fuc2ktc3R5bGVzJztcbmltcG9ydCBzdXBwb3J0c0NvbG9yIGZyb20gJyNzdXBwb3J0cy1jb2xvcic7XG5pbXBvcnQgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGltcG9ydC9vcmRlclxuXHRzdHJpbmdSZXBsYWNlQWxsLFxuXHRzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgsXG59IGZyb20gJy4vdXRpbGl0aWVzLmpzJztcblxuY29uc3Qge3N0ZG91dDogc3Rkb3V0Q29sb3IsIHN0ZGVycjogc3RkZXJyQ29sb3J9ID0gc3VwcG9ydHNDb2xvcjtcblxuY29uc3QgR0VORVJBVE9SID0gU3ltYm9sKCdHRU5FUkFUT1InKTtcbmNvbnN0IFNUWUxFUiA9IFN5bWJvbCgnU1RZTEVSJyk7XG5jb25zdCBJU19FTVBUWSA9IFN5bWJvbCgnSVNfRU1QVFknKTtcblxuLy8gYHN1cHBvcnRzQ29sb3IubGV2ZWxgIOKGkiBgYW5zaVN0eWxlcy5jb2xvcltuYW1lXWAgbWFwcGluZ1xuY29uc3QgbGV2ZWxNYXBwaW5nID0gW1xuXHQnYW5zaScsXG5cdCdhbnNpJyxcblx0J2Fuc2kyNTYnLFxuXHQnYW5zaTE2bScsXG5dO1xuXG5jb25zdCBzdHlsZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5jb25zdCBhcHBseU9wdGlvbnMgPSAob2JqZWN0LCBvcHRpb25zID0ge30pID0+IHtcblx0aWYgKG9wdGlvbnMubGV2ZWwgJiYgIShOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubGV2ZWwpICYmIG9wdGlvbnMubGV2ZWwgPj0gMCAmJiBvcHRpb25zLmxldmVsIDw9IDMpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgYGxldmVsYCBvcHRpb24gc2hvdWxkIGJlIGFuIGludGVnZXIgZnJvbSAwIHRvIDMnKTtcblx0fVxuXG5cdC8vIERldGVjdCBsZXZlbCBpZiBub3Qgc2V0IG1hbnVhbGx5XG5cdGNvbnN0IGNvbG9yTGV2ZWwgPSBzdGRvdXRDb2xvciA/IHN0ZG91dENvbG9yLmxldmVsIDogMDtcblx0b2JqZWN0LmxldmVsID0gb3B0aW9ucy5sZXZlbCA9PT0gdW5kZWZpbmVkID8gY29sb3JMZXZlbCA6IG9wdGlvbnMubGV2ZWw7XG59O1xuXG5leHBvcnQgY2xhc3MgQ2hhbGsge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0cnVjdG9yLXJldHVyblxuXHRcdHJldHVybiBjaGFsa0ZhY3Rvcnkob3B0aW9ucyk7XG5cdH1cbn1cblxuY29uc3QgY2hhbGtGYWN0b3J5ID0gb3B0aW9ucyA9PiB7XG5cdGNvbnN0IGNoYWxrID0gKC4uLnN0cmluZ3MpID0+IHN0cmluZ3Muam9pbignICcpO1xuXHRhcHBseU9wdGlvbnMoY2hhbGssIG9wdGlvbnMpO1xuXG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZihjaGFsaywgY3JlYXRlQ2hhbGsucHJvdG90eXBlKTtcblxuXHRyZXR1cm4gY2hhbGs7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDaGFsayhvcHRpb25zKSB7XG5cdHJldHVybiBjaGFsa0ZhY3Rvcnkob3B0aW9ucyk7XG59XG5cbk9iamVjdC5zZXRQcm90b3R5cGVPZihjcmVhdGVDaGFsay5wcm90b3R5cGUsIEZ1bmN0aW9uLnByb3RvdHlwZSk7XG5cbmZvciAoY29uc3QgW3N0eWxlTmFtZSwgc3R5bGVdIG9mIE9iamVjdC5lbnRyaWVzKGFuc2lTdHlsZXMpKSB7XG5cdHN0eWxlc1tzdHlsZU5hbWVdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IGJ1aWxkZXIgPSBjcmVhdGVCdWlsZGVyKHRoaXMsIGNyZWF0ZVN0eWxlcihzdHlsZS5vcGVuLCBzdHlsZS5jbG9zZSwgdGhpc1tTVFlMRVJdKSwgdGhpc1tJU19FTVBUWV0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHN0eWxlTmFtZSwge3ZhbHVlOiBidWlsZGVyfSk7XG5cdFx0XHRyZXR1cm4gYnVpbGRlcjtcblx0XHR9LFxuXHR9O1xufVxuXG5zdHlsZXMudmlzaWJsZSA9IHtcblx0Z2V0KCkge1xuXHRcdGNvbnN0IGJ1aWxkZXIgPSBjcmVhdGVCdWlsZGVyKHRoaXMsIHRoaXNbU1RZTEVSXSwgdHJ1ZSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd2aXNpYmxlJywge3ZhbHVlOiBidWlsZGVyfSk7XG5cdFx0cmV0dXJuIGJ1aWxkZXI7XG5cdH0sXG59O1xuXG5jb25zdCBnZXRNb2RlbEFuc2kgPSAobW9kZWwsIGxldmVsLCB0eXBlLCAuLi5hcmd1bWVudHNfKSA9PiB7XG5cdGlmIChtb2RlbCA9PT0gJ3JnYicpIHtcblx0XHRpZiAobGV2ZWwgPT09ICdhbnNpMTZtJykge1xuXHRcdFx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV0uYW5zaTE2bSguLi5hcmd1bWVudHNfKTtcblx0XHR9XG5cblx0XHRpZiAobGV2ZWwgPT09ICdhbnNpMjU2Jykge1xuXHRcdFx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV0uYW5zaTI1NihhbnNpU3R5bGVzLnJnYlRvQW5zaTI1NiguLi5hcmd1bWVudHNfKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV0uYW5zaShhbnNpU3R5bGVzLnJnYlRvQW5zaSguLi5hcmd1bWVudHNfKSk7XG5cdH1cblxuXHRpZiAobW9kZWwgPT09ICdoZXgnKSB7XG5cdFx0cmV0dXJuIGdldE1vZGVsQW5zaSgncmdiJywgbGV2ZWwsIHR5cGUsIC4uLmFuc2lTdHlsZXMuaGV4VG9SZ2IoLi4uYXJndW1lbnRzXykpO1xuXHR9XG5cblx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV1bbW9kZWxdKC4uLmFyZ3VtZW50c18pO1xufTtcblxuY29uc3QgdXNlZE1vZGVscyA9IFsncmdiJywgJ2hleCcsICdhbnNpMjU2J107XG5cbmZvciAoY29uc3QgbW9kZWwgb2YgdXNlZE1vZGVscykge1xuXHRzdHlsZXNbbW9kZWxdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IHtsZXZlbH0gPSB0aGlzO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0XHRcdGNvbnN0IHN0eWxlciA9IGNyZWF0ZVN0eWxlcihnZXRNb2RlbEFuc2kobW9kZWwsIGxldmVsTWFwcGluZ1tsZXZlbF0sICdjb2xvcicsIC4uLmFyZ3VtZW50c18pLCBhbnNpU3R5bGVzLmNvbG9yLmNsb3NlLCB0aGlzW1NUWUxFUl0pO1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlQnVpbGRlcih0aGlzLCBzdHlsZXIsIHRoaXNbSVNfRU1QVFldKTtcblx0XHRcdH07XG5cdFx0fSxcblx0fTtcblxuXHRjb25zdCBiZ01vZGVsID0gJ2JnJyArIG1vZGVsWzBdLnRvVXBwZXJDYXNlKCkgKyBtb2RlbC5zbGljZSgxKTtcblx0c3R5bGVzW2JnTW9kZWxdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IHtsZXZlbH0gPSB0aGlzO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0XHRcdGNvbnN0IHN0eWxlciA9IGNyZWF0ZVN0eWxlcihnZXRNb2RlbEFuc2kobW9kZWwsIGxldmVsTWFwcGluZ1tsZXZlbF0sICdiZ0NvbG9yJywgLi4uYXJndW1lbnRzXyksIGFuc2lTdHlsZXMuYmdDb2xvci5jbG9zZSwgdGhpc1tTVFlMRVJdKTtcblx0XHRcdFx0cmV0dXJuIGNyZWF0ZUJ1aWxkZXIodGhpcywgc3R5bGVyLCB0aGlzW0lTX0VNUFRZXSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cdH07XG59XG5cbmNvbnN0IHByb3RvID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoKCkgPT4ge30sIHtcblx0Li4uc3R5bGVzLFxuXHRsZXZlbDoge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIHRoaXNbR0VORVJBVE9SXS5sZXZlbDtcblx0XHR9LFxuXHRcdHNldChsZXZlbCkge1xuXHRcdFx0dGhpc1tHRU5FUkFUT1JdLmxldmVsID0gbGV2ZWw7XG5cdFx0fSxcblx0fSxcbn0pO1xuXG5jb25zdCBjcmVhdGVTdHlsZXIgPSAob3BlbiwgY2xvc2UsIHBhcmVudCkgPT4ge1xuXHRsZXQgb3BlbkFsbDtcblx0bGV0IGNsb3NlQWxsO1xuXHRpZiAocGFyZW50ID09PSB1bmRlZmluZWQpIHtcblx0XHRvcGVuQWxsID0gb3Blbjtcblx0XHRjbG9zZUFsbCA9IGNsb3NlO1xuXHR9IGVsc2Uge1xuXHRcdG9wZW5BbGwgPSBwYXJlbnQub3BlbkFsbCArIG9wZW47XG5cdFx0Y2xvc2VBbGwgPSBjbG9zZSArIHBhcmVudC5jbG9zZUFsbDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0b3Blbixcblx0XHRjbG9zZSxcblx0XHRvcGVuQWxsLFxuXHRcdGNsb3NlQWxsLFxuXHRcdHBhcmVudCxcblx0fTtcbn07XG5cbmNvbnN0IGNyZWF0ZUJ1aWxkZXIgPSAoc2VsZiwgX3N0eWxlciwgX2lzRW1wdHkpID0+IHtcblx0Ly8gU2luZ2xlIGFyZ3VtZW50IGlzIGhvdCBwYXRoLCBpbXBsaWNpdCBjb2VyY2lvbiBpcyBmYXN0ZXIgdGhhbiBhbnl0aGluZ1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8taW1wbGljaXQtY29lcmNpb25cblx0Y29uc3QgYnVpbGRlciA9ICguLi5hcmd1bWVudHNfKSA9PiBhcHBseVN0eWxlKGJ1aWxkZXIsIChhcmd1bWVudHNfLmxlbmd0aCA9PT0gMSkgPyAoJycgKyBhcmd1bWVudHNfWzBdKSA6IGFyZ3VtZW50c18uam9pbignICcpKTtcblxuXHQvLyBXZSBhbHRlciB0aGUgcHJvdG90eXBlIGJlY2F1c2Ugd2UgbXVzdCByZXR1cm4gYSBmdW5jdGlvbiwgYnV0IHRoZXJlIGlzXG5cdC8vIG5vIHdheSB0byBjcmVhdGUgYSBmdW5jdGlvbiB3aXRoIGEgZGlmZmVyZW50IHByb3RvdHlwZVxuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YoYnVpbGRlciwgcHJvdG8pO1xuXG5cdGJ1aWxkZXJbR0VORVJBVE9SXSA9IHNlbGY7XG5cdGJ1aWxkZXJbU1RZTEVSXSA9IF9zdHlsZXI7XG5cdGJ1aWxkZXJbSVNfRU1QVFldID0gX2lzRW1wdHk7XG5cblx0cmV0dXJuIGJ1aWxkZXI7XG59O1xuXG5jb25zdCBhcHBseVN0eWxlID0gKHNlbGYsIHN0cmluZykgPT4ge1xuXHRpZiAoc2VsZi5sZXZlbCA8PSAwIHx8ICFzdHJpbmcpIHtcblx0XHRyZXR1cm4gc2VsZltJU19FTVBUWV0gPyAnJyA6IHN0cmluZztcblx0fVxuXG5cdGxldCBzdHlsZXIgPSBzZWxmW1NUWUxFUl07XG5cblx0aWYgKHN0eWxlciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHN0cmluZztcblx0fVxuXG5cdGNvbnN0IHtvcGVuQWxsLCBjbG9zZUFsbH0gPSBzdHlsZXI7XG5cdGlmIChzdHJpbmcuaW5jbHVkZXMoJ1xcdTAwMUInKSkge1xuXHRcdHdoaWxlIChzdHlsZXIgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Ly8gUmVwbGFjZSBhbnkgaW5zdGFuY2VzIGFscmVhZHkgcHJlc2VudCB3aXRoIGEgcmUtb3BlbmluZyBjb2RlXG5cdFx0XHQvLyBvdGhlcndpc2Ugb25seSB0aGUgcGFydCBvZiB0aGUgc3RyaW5nIHVudGlsIHNhaWQgY2xvc2luZyBjb2RlXG5cdFx0XHQvLyB3aWxsIGJlIGNvbG9yZWQsIGFuZCB0aGUgcmVzdCB3aWxsIHNpbXBseSBiZSAncGxhaW4nLlxuXHRcdFx0c3RyaW5nID0gc3RyaW5nUmVwbGFjZUFsbChzdHJpbmcsIHN0eWxlci5jbG9zZSwgc3R5bGVyLm9wZW4pO1xuXG5cdFx0XHRzdHlsZXIgPSBzdHlsZXIucGFyZW50O1xuXHRcdH1cblx0fVxuXG5cdC8vIFdlIGNhbiBtb3ZlIGJvdGggbmV4dCBhY3Rpb25zIG91dCBvZiBsb29wLCBiZWNhdXNlIHJlbWFpbmluZyBhY3Rpb25zIGluIGxvb3Agd29uJ3QgaGF2ZVxuXHQvLyBhbnkvdmlzaWJsZSBlZmZlY3Qgb24gcGFydHMgd2UgYWRkIGhlcmUuIENsb3NlIHRoZSBzdHlsaW5nIGJlZm9yZSBhIGxpbmVicmVhayBhbmQgcmVvcGVuXG5cdC8vIGFmdGVyIG5leHQgbGluZSB0byBmaXggYSBibGVlZCBpc3N1ZSBvbiBtYWNPUzogaHR0cHM6Ly9naXRodWIuY29tL2NoYWxrL2NoYWxrL3B1bGwvOTJcblx0Y29uc3QgbGZJbmRleCA9IHN0cmluZy5pbmRleE9mKCdcXG4nKTtcblx0aWYgKGxmSW5kZXggIT09IC0xKSB7XG5cdFx0c3RyaW5nID0gc3RyaW5nRW5jYXNlQ1JMRldpdGhGaXJzdEluZGV4KHN0cmluZywgY2xvc2VBbGwsIG9wZW5BbGwsIGxmSW5kZXgpO1xuXHR9XG5cblx0cmV0dXJuIG9wZW5BbGwgKyBzdHJpbmcgKyBjbG9zZUFsbDtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNyZWF0ZUNoYWxrLnByb3RvdHlwZSwgc3R5bGVzKTtcblxuY29uc3QgY2hhbGsgPSBjcmVhdGVDaGFsaygpO1xuZXhwb3J0IGNvbnN0IGNoYWxrU3RkZXJyID0gY3JlYXRlQ2hhbGsoe2xldmVsOiBzdGRlcnJDb2xvciA/IHN0ZGVyckNvbG9yLmxldmVsIDogMH0pO1xuXG5leHBvcnQge1xuXHRtb2RpZmllck5hbWVzLFxuXHRmb3JlZ3JvdW5kQ29sb3JOYW1lcyxcblx0YmFja2dyb3VuZENvbG9yTmFtZXMsXG5cdGNvbG9yTmFtZXMsXG5cblx0Ly8gVE9ETzogUmVtb3ZlIHRoZXNlIGFsaWFzZXMgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvblxuXHRtb2RpZmllck5hbWVzIGFzIG1vZGlmaWVycyxcblx0Zm9yZWdyb3VuZENvbG9yTmFtZXMgYXMgZm9yZWdyb3VuZENvbG9ycyxcblx0YmFja2dyb3VuZENvbG9yTmFtZXMgYXMgYmFja2dyb3VuZENvbG9ycyxcblx0Y29sb3JOYW1lcyBhcyBjb2xvcnMsXG59IGZyb20gJy4vdmVuZG9yL2Fuc2ktc3R5bGVzL2luZGV4LmpzJztcblxuZXhwb3J0IHtcblx0c3Rkb3V0Q29sb3IgYXMgc3VwcG9ydHNDb2xvcixcblx0c3RkZXJyQ29sb3IgYXMgc3VwcG9ydHNDb2xvclN0ZGVycixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNoYWxrO1xuIiwiLy8gVE9ETzogV2hlbiB0YXJnZXRpbmcgTm9kZS5qcyAxNiwgdXNlIGBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VBbGxgLlxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1JlcGxhY2VBbGwoc3RyaW5nLCBzdWJzdHJpbmcsIHJlcGxhY2VyKSB7XG5cdGxldCBpbmRleCA9IHN0cmluZy5pbmRleE9mKHN1YnN0cmluZyk7XG5cdGlmIChpbmRleCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gc3RyaW5nO1xuXHR9XG5cblx0Y29uc3Qgc3Vic3RyaW5nTGVuZ3RoID0gc3Vic3RyaW5nLmxlbmd0aDtcblx0bGV0IGVuZEluZGV4ID0gMDtcblx0bGV0IHJldHVyblZhbHVlID0gJyc7XG5cdGRvIHtcblx0XHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgsIGluZGV4KSArIHN1YnN0cmluZyArIHJlcGxhY2VyO1xuXHRcdGVuZEluZGV4ID0gaW5kZXggKyBzdWJzdHJpbmdMZW5ndGg7XG5cdFx0aW5kZXggPSBzdHJpbmcuaW5kZXhPZihzdWJzdHJpbmcsIGVuZEluZGV4KTtcblx0fSB3aGlsZSAoaW5kZXggIT09IC0xKTtcblxuXHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgpO1xuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgoc3RyaW5nLCBwcmVmaXgsIHBvc3RmaXgsIGluZGV4KSB7XG5cdGxldCBlbmRJbmRleCA9IDA7XG5cdGxldCByZXR1cm5WYWx1ZSA9ICcnO1xuXHRkbyB7XG5cdFx0Y29uc3QgZ290Q1IgPSBzdHJpbmdbaW5kZXggLSAxXSA9PT0gJ1xccic7XG5cdFx0cmV0dXJuVmFsdWUgKz0gc3RyaW5nLnNsaWNlKGVuZEluZGV4LCAoZ290Q1IgPyBpbmRleCAtIDEgOiBpbmRleCkpICsgcHJlZml4ICsgKGdvdENSID8gJ1xcclxcbicgOiAnXFxuJykgKyBwb3N0Zml4O1xuXHRcdGVuZEluZGV4ID0gaW5kZXggKyAxO1xuXHRcdGluZGV4ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicsIGVuZEluZGV4KTtcblx0fSB3aGlsZSAoaW5kZXggIT09IC0xKTtcblxuXHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgpO1xuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XG59XG4iLCJjb25zdCBBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUID0gMTA7XG5cbmNvbnN0IHdyYXBBbnNpMTYgPSAob2Zmc2V0ID0gMCkgPT4gY29kZSA9PiBgXFx1MDAxQlske2NvZGUgKyBvZmZzZXR9bWA7XG5cbmNvbnN0IHdyYXBBbnNpMjU2ID0gKG9mZnNldCA9IDApID0+IGNvZGUgPT4gYFxcdTAwMUJbJHszOCArIG9mZnNldH07NTske2NvZGV9bWA7XG5cbmNvbnN0IHdyYXBBbnNpMTZtID0gKG9mZnNldCA9IDApID0+IChyZWQsIGdyZWVuLCBibHVlKSA9PiBgXFx1MDAxQlskezM4ICsgb2Zmc2V0fTsyOyR7cmVkfTske2dyZWVufTske2JsdWV9bWA7XG5cbmNvbnN0IHN0eWxlcyA9IHtcblx0bW9kaWZpZXI6IHtcblx0XHRyZXNldDogWzAsIDBdLFxuXHRcdC8vIDIxIGlzbid0IHdpZGVseSBzdXBwb3J0ZWQgYW5kIDIyIGRvZXMgdGhlIHNhbWUgdGhpbmdcblx0XHRib2xkOiBbMSwgMjJdLFxuXHRcdGRpbTogWzIsIDIyXSxcblx0XHRpdGFsaWM6IFszLCAyM10sXG5cdFx0dW5kZXJsaW5lOiBbNCwgMjRdLFxuXHRcdG92ZXJsaW5lOiBbNTMsIDU1XSxcblx0XHRpbnZlcnNlOiBbNywgMjddLFxuXHRcdGhpZGRlbjogWzgsIDI4XSxcblx0XHRzdHJpa2V0aHJvdWdoOiBbOSwgMjldLFxuXHR9LFxuXHRjb2xvcjoge1xuXHRcdGJsYWNrOiBbMzAsIDM5XSxcblx0XHRyZWQ6IFszMSwgMzldLFxuXHRcdGdyZWVuOiBbMzIsIDM5XSxcblx0XHR5ZWxsb3c6IFszMywgMzldLFxuXHRcdGJsdWU6IFszNCwgMzldLFxuXHRcdG1hZ2VudGE6IFszNSwgMzldLFxuXHRcdGN5YW46IFszNiwgMzldLFxuXHRcdHdoaXRlOiBbMzcsIDM5XSxcblxuXHRcdC8vIEJyaWdodCBjb2xvclxuXHRcdGJsYWNrQnJpZ2h0OiBbOTAsIDM5XSxcblx0XHRncmF5OiBbOTAsIDM5XSwgLy8gQWxpYXMgb2YgYGJsYWNrQnJpZ2h0YFxuXHRcdGdyZXk6IFs5MCwgMzldLCAvLyBBbGlhcyBvZiBgYmxhY2tCcmlnaHRgXG5cdFx0cmVkQnJpZ2h0OiBbOTEsIDM5XSxcblx0XHRncmVlbkJyaWdodDogWzkyLCAzOV0sXG5cdFx0eWVsbG93QnJpZ2h0OiBbOTMsIDM5XSxcblx0XHRibHVlQnJpZ2h0OiBbOTQsIDM5XSxcblx0XHRtYWdlbnRhQnJpZ2h0OiBbOTUsIDM5XSxcblx0XHRjeWFuQnJpZ2h0OiBbOTYsIDM5XSxcblx0XHR3aGl0ZUJyaWdodDogWzk3LCAzOV0sXG5cdH0sXG5cdGJnQ29sb3I6IHtcblx0XHRiZ0JsYWNrOiBbNDAsIDQ5XSxcblx0XHRiZ1JlZDogWzQxLCA0OV0sXG5cdFx0YmdHcmVlbjogWzQyLCA0OV0sXG5cdFx0YmdZZWxsb3c6IFs0MywgNDldLFxuXHRcdGJnQmx1ZTogWzQ0LCA0OV0sXG5cdFx0YmdNYWdlbnRhOiBbNDUsIDQ5XSxcblx0XHRiZ0N5YW46IFs0NiwgNDldLFxuXHRcdGJnV2hpdGU6IFs0NywgNDldLFxuXG5cdFx0Ly8gQnJpZ2h0IGNvbG9yXG5cdFx0YmdCbGFja0JyaWdodDogWzEwMCwgNDldLFxuXHRcdGJnR3JheTogWzEwMCwgNDldLCAvLyBBbGlhcyBvZiBgYmdCbGFja0JyaWdodGBcblx0XHRiZ0dyZXk6IFsxMDAsIDQ5XSwgLy8gQWxpYXMgb2YgYGJnQmxhY2tCcmlnaHRgXG5cdFx0YmdSZWRCcmlnaHQ6IFsxMDEsIDQ5XSxcblx0XHRiZ0dyZWVuQnJpZ2h0OiBbMTAyLCA0OV0sXG5cdFx0YmdZZWxsb3dCcmlnaHQ6IFsxMDMsIDQ5XSxcblx0XHRiZ0JsdWVCcmlnaHQ6IFsxMDQsIDQ5XSxcblx0XHRiZ01hZ2VudGFCcmlnaHQ6IFsxMDUsIDQ5XSxcblx0XHRiZ0N5YW5CcmlnaHQ6IFsxMDYsIDQ5XSxcblx0XHRiZ1doaXRlQnJpZ2h0OiBbMTA3LCA0OV0sXG5cdH0sXG59O1xuXG5leHBvcnQgY29uc3QgbW9kaWZpZXJOYW1lcyA9IE9iamVjdC5rZXlzKHN0eWxlcy5tb2RpZmllcik7XG5leHBvcnQgY29uc3QgZm9yZWdyb3VuZENvbG9yTmFtZXMgPSBPYmplY3Qua2V5cyhzdHlsZXMuY29sb3IpO1xuZXhwb3J0IGNvbnN0IGJhY2tncm91bmRDb2xvck5hbWVzID0gT2JqZWN0LmtleXMoc3R5bGVzLmJnQ29sb3IpO1xuZXhwb3J0IGNvbnN0IGNvbG9yTmFtZXMgPSBbLi4uZm9yZWdyb3VuZENvbG9yTmFtZXMsIC4uLmJhY2tncm91bmRDb2xvck5hbWVzXTtcblxuZnVuY3Rpb24gYXNzZW1ibGVTdHlsZXMoKSB7XG5cdGNvbnN0IGNvZGVzID0gbmV3IE1hcCgpO1xuXG5cdGZvciAoY29uc3QgW2dyb3VwTmFtZSwgZ3JvdXBdIG9mIE9iamVjdC5lbnRyaWVzKHN0eWxlcykpIHtcblx0XHRmb3IgKGNvbnN0IFtzdHlsZU5hbWUsIHN0eWxlXSBvZiBPYmplY3QuZW50cmllcyhncm91cCkpIHtcblx0XHRcdHN0eWxlc1tzdHlsZU5hbWVdID0ge1xuXHRcdFx0XHRvcGVuOiBgXFx1MDAxQlske3N0eWxlWzBdfW1gLFxuXHRcdFx0XHRjbG9zZTogYFxcdTAwMUJbJHtzdHlsZVsxXX1tYCxcblx0XHRcdH07XG5cblx0XHRcdGdyb3VwW3N0eWxlTmFtZV0gPSBzdHlsZXNbc3R5bGVOYW1lXTtcblxuXHRcdFx0Y29kZXMuc2V0KHN0eWxlWzBdLCBzdHlsZVsxXSk7XG5cdFx0fVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgZ3JvdXBOYW1lLCB7XG5cdFx0XHR2YWx1ZTogZ3JvdXAsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9KTtcblx0fVxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdHlsZXMsICdjb2RlcycsIHtcblx0XHR2YWx1ZTogY29kZXMsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdH0pO1xuXG5cdHN0eWxlcy5jb2xvci5jbG9zZSA9ICdcXHUwMDFCWzM5bSc7XG5cdHN0eWxlcy5iZ0NvbG9yLmNsb3NlID0gJ1xcdTAwMUJbNDltJztcblxuXHRzdHlsZXMuY29sb3IuYW5zaSA9IHdyYXBBbnNpMTYoKTtcblx0c3R5bGVzLmNvbG9yLmFuc2kyNTYgPSB3cmFwQW5zaTI1NigpO1xuXHRzdHlsZXMuY29sb3IuYW5zaTE2bSA9IHdyYXBBbnNpMTZtKCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kgPSB3cmFwQW5zaTE2KEFOU0lfQkFDS0dST1VORF9PRkZTRVQpO1xuXHRzdHlsZXMuYmdDb2xvci5hbnNpMjU2ID0gd3JhcEFuc2kyNTYoQU5TSV9CQUNLR1JPVU5EX09GRlNFVCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kxNm0gPSB3cmFwQW5zaTE2bShBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUKTtcblxuXHQvLyBGcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9RaXgtL2NvbG9yLWNvbnZlcnQvYmxvYi8zZjBlMGQ0ZTkyZTIzNTc5NmNjYjE3ZjZlODVjNzIwOTRhNjUxZjQ5L2NvbnZlcnNpb25zLmpzXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHN0eWxlcywge1xuXHRcdHJnYlRvQW5zaTI1Njoge1xuXHRcdFx0dmFsdWUocmVkLCBncmVlbiwgYmx1ZSkge1xuXHRcdFx0XHQvLyBXZSB1c2UgdGhlIGV4dGVuZGVkIGdyZXlzY2FsZSBwYWxldHRlIGhlcmUsIHdpdGggdGhlIGV4Y2VwdGlvbiBvZlxuXHRcdFx0XHQvLyBibGFjayBhbmQgd2hpdGUuIG5vcm1hbCBwYWxldHRlIG9ubHkgaGFzIDQgZ3JleXNjYWxlIHNoYWRlcy5cblx0XHRcdFx0aWYgKHJlZCA9PT0gZ3JlZW4gJiYgZ3JlZW4gPT09IGJsdWUpIHtcblx0XHRcdFx0XHRpZiAocmVkIDwgOCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDE2O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChyZWQgPiAyNDgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAyMzE7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIE1hdGgucm91bmQoKChyZWQgLSA4KSAvIDI0NykgKiAyNCkgKyAyMzI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gMTZcblx0XHRcdFx0XHQrICgzNiAqIE1hdGgucm91bmQocmVkIC8gMjU1ICogNSkpXG5cdFx0XHRcdFx0KyAoNiAqIE1hdGgucm91bmQoZ3JlZW4gLyAyNTUgKiA1KSlcblx0XHRcdFx0XHQrIE1hdGgucm91bmQoYmx1ZSAvIDI1NSAqIDUpO1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0aGV4VG9SZ2I6IHtcblx0XHRcdHZhbHVlKGhleCkge1xuXHRcdFx0XHRjb25zdCBtYXRjaGVzID0gL1thLWZcXGRdezZ9fFthLWZcXGRdezN9L2kuZXhlYyhoZXgudG9TdHJpbmcoMTYpKTtcblx0XHRcdFx0aWYgKCFtYXRjaGVzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFswLCAwLCAwXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBbY29sb3JTdHJpbmddID0gbWF0Y2hlcztcblxuXHRcdFx0XHRpZiAoY29sb3JTdHJpbmcubGVuZ3RoID09PSAzKSB7XG5cdFx0XHRcdFx0Y29sb3JTdHJpbmcgPSBbLi4uY29sb3JTdHJpbmddLm1hcChjaGFyYWN0ZXIgPT4gY2hhcmFjdGVyICsgY2hhcmFjdGVyKS5qb2luKCcnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IGludGVnZXIgPSBOdW1iZXIucGFyc2VJbnQoY29sb3JTdHJpbmcsIDE2KTtcblxuXHRcdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblx0XHRcdFx0XHQoaW50ZWdlciA+PiAxNikgJiAweEZGLFxuXHRcdFx0XHRcdChpbnRlZ2VyID4+IDgpICYgMHhGRixcblx0XHRcdFx0XHRpbnRlZ2VyICYgMHhGRixcblx0XHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWJpdHdpc2UgKi9cblx0XHRcdFx0XTtcblx0XHRcdH0sXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGhleFRvQW5zaTI1Njoge1xuXHRcdFx0dmFsdWU6IGhleCA9PiBzdHlsZXMucmdiVG9BbnNpMjU2KC4uLnN0eWxlcy5oZXhUb1JnYihoZXgpKSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0YW5zaTI1NlRvQW5zaToge1xuXHRcdFx0dmFsdWUoY29kZSkge1xuXHRcdFx0XHRpZiAoY29kZSA8IDgpIHtcblx0XHRcdFx0XHRyZXR1cm4gMzAgKyBjb2RlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGNvZGUgPCAxNikge1xuXHRcdFx0XHRcdHJldHVybiA5MCArIChjb2RlIC0gOCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgcmVkO1xuXHRcdFx0XHRsZXQgZ3JlZW47XG5cdFx0XHRcdGxldCBibHVlO1xuXG5cdFx0XHRcdGlmIChjb2RlID49IDIzMikge1xuXHRcdFx0XHRcdHJlZCA9ICgoKGNvZGUgLSAyMzIpICogMTApICsgOCkgLyAyNTU7XG5cdFx0XHRcdFx0Z3JlZW4gPSByZWQ7XG5cdFx0XHRcdFx0Ymx1ZSA9IHJlZDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb2RlIC09IDE2O1xuXG5cdFx0XHRcdFx0Y29uc3QgcmVtYWluZGVyID0gY29kZSAlIDM2O1xuXG5cdFx0XHRcdFx0cmVkID0gTWF0aC5mbG9vcihjb2RlIC8gMzYpIC8gNTtcblx0XHRcdFx0XHRncmVlbiA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gNikgLyA1O1xuXHRcdFx0XHRcdGJsdWUgPSAocmVtYWluZGVyICUgNikgLyA1O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgdmFsdWUgPSBNYXRoLm1heChyZWQsIGdyZWVuLCBibHVlKSAqIDI7XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIDMwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdFx0bGV0IHJlc3VsdCA9IDMwICsgKChNYXRoLnJvdW5kKGJsdWUpIDw8IDIpIHwgKE1hdGgucm91bmQoZ3JlZW4pIDw8IDEpIHwgTWF0aC5yb3VuZChyZWQpKTtcblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IDIpIHtcblx0XHRcdFx0XHRyZXN1bHQgKz0gNjA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0cmdiVG9BbnNpOiB7XG5cdFx0XHR2YWx1ZTogKHJlZCwgZ3JlZW4sIGJsdWUpID0+IHN0eWxlcy5hbnNpMjU2VG9BbnNpKHN0eWxlcy5yZ2JUb0Fuc2kyNTYocmVkLCBncmVlbiwgYmx1ZSkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRoZXhUb0Fuc2k6IHtcblx0XHRcdHZhbHVlOiBoZXggPT4gc3R5bGVzLmFuc2kyNTZUb0Fuc2koc3R5bGVzLmhleFRvQW5zaTI1NihoZXgpKSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdH0pO1xuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmNvbnN0IGFuc2lTdHlsZXMgPSBhc3NlbWJsZVN0eWxlcygpO1xuXG5leHBvcnQgZGVmYXVsdCBhbnNpU3R5bGVzO1xuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbmNvbnN0IGxldmVsID0gKCgpID0+IHtcblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnREYXRhKSB7XG5cdFx0Y29uc3QgYnJhbmQgPSBuYXZpZ2F0b3IudXNlckFnZW50RGF0YS5icmFuZHMuZmluZCgoe2JyYW5kfSkgPT4gYnJhbmQgPT09ICdDaHJvbWl1bScpO1xuXHRcdGlmIChicmFuZCAmJiBicmFuZC52ZXJzaW9uID4gOTMpIHtcblx0XHRcdHJldHVybiAzO1xuXHRcdH1cblx0fVxuXG5cdGlmICgvXFxiKENocm9tZXxDaHJvbWl1bSlcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdHJldHVybiAwO1xufSkoKTtcblxuY29uc3QgY29sb3JTdXBwb3J0ID0gbGV2ZWwgIT09IDAgJiYge1xuXHRsZXZlbCxcblx0aGFzQmFzaWM6IHRydWUsXG5cdGhhczI1NjogbGV2ZWwgPj0gMixcblx0aGFzMTZtOiBsZXZlbCA+PSAzLFxufTtcblxuY29uc3Qgc3VwcG9ydHNDb2xvciA9IHtcblx0c3Rkb3V0OiBjb2xvclN1cHBvcnQsXG5cdHN0ZGVycjogY29sb3JTdXBwb3J0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydHNDb2xvcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcclxuaW1wb3J0IHsgSVdpZGdldEpzb24gfSBmcm9tIFwiLi4vLi4vSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9JV2lkZ2V0SnNvblwiO1xyXG5pbXBvcnQgeyBTaW5nbGVWYWx1ZUFzcGVjdCB9IGZyb20gXCIuLi8uLi9JREVBc3BlY3RzL1NpbmdsZVZhbHVlQXNwZWN0L1NpbmdsZVZhbHVlQXNwZWN0XCI7XHJcbmltcG9ydCB7IElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi4vLi4vSURFQXNwZWN0cy9TaW5nbGVWYWx1ZUFzcGVjdC9TaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTaW5nbGVWYWx1ZVBvcnRhbERlZmF1bHQsIFdpZGdldFNldHRpbmdzIH0gZnJvbSBcIi4vU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXRDb25maWdcIjtcclxuXHJcbmxldCB0aGlzV2lkZ2V0U3lzdGVtTmFtZSA9IFwiU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaW5nbGVWYWx1ZVBvcnRhbFdpZGdldCBleHRlbmRzIFNpbmdsZVZhbHVlQXNwZWN0e1xyXG4gICAgbGl2ZUNvbmZpZ3VyYXRpb25SZWZyZXNoZWQoKTogdm9pZCB7XHJcbiAgICAgICAvL25vdGhpbmcgdG8gZG9cclxuICAgIH1cclxuXHJcbiAgXHJcbm92ZXJyaWRlIHNldFRoaXNDb21wb25lbnROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNXaWRnZXRTeXN0ZW1OYW1lO1xyXG59XHJcblxyXG4gICAgb3ZlcnJpZGUgc2V0RGVmYXVsdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuICBTaW5nbGVWYWx1ZVBvcnRhbERlZmF1bHRcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIG92ZXJyaWRlIHNldFdpZGdldEpzb25TZXR0aW5ncygpOiBJV2lkZ2V0SnNvbjxJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIFdpZGdldFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==