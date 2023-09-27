/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../Common/Log.ts":
/*!******************************!*\
  !*** ../../../Common/Log.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chalk */ "../../../../node_modules/chalk/source/index.js");
/* harmony import */ var _StackHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StackHelper */ "../../../Common/StackHelper.ts");


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

/***/ "../../../Common/StackHelper.ts":
/*!**************************************!*\
  !*** ../../../Common/StackHelper.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/**
 * This file contains helper functions for working with the ODS API
 * _search is a wrapper around the ODS search endpoint
 */

/**
 * Uses the "/api/ods/_search" endpoint to search for users.
 * @param search The search string to use such as surname or email address
 * @returns
 */
async function searchForUsers(search) {
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
}
/**
 * Uses the "/api/ods/_search" endpoint to search for clients.
 * @param search The search string to use such as client code or name
 * @returns A list of clients
 */
async function searchForClients(search) {
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
    allOdsAspects?.forEach(a => {
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
async function searchOdsAndReturnRows(search, postBody) {
    let APIResult = await (0,_api_ods_search__WEBPACK_IMPORTED_MODULE_0__._search)(postBody);
    //log color
    console.log("%c ODS Search Result", "color: #ff0000", APIResult);
    if (!APIResult) {
        console.log("%c ODS Search Result - undefined", "color: #ff0000");
        return [];
    }
    console.log("%c ODS Search Result", "color: #ff0000", APIResult);
    return extractRowsFromODSSearchResults(APIResult);
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
/* harmony export */   executeGetv2: () => (/* binding */ executeGetv2),
/* harmony export */   executePost: () => (/* binding */ executePost),
/* harmony export */   executePut: () => (/* binding */ executePut),
/* harmony export */   getBearerToken: () => (/* binding */ getBearerToken),
/* harmony export */   getCookies: () => (/* binding */ getCookies)
/* harmony export */ });
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Common/Log */ "../../../Common/Log.ts");
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

async function _search(postBody) {
    try {
        let api = "/api/ods/_search";
        return await (0,_api__WEBPACK_IMPORTED_MODULE_0__.executePost)(window.document.location.origin + api, postBody);
    }
    catch (e) {
        console.warn("ODS Search Error", e, postBody);
    }
    return undefined;
}


/***/ }),

/***/ "../../../../node_modules/chalk/source/index.js":
/*!******************************************************!*\
  !*** ../../../../node_modules/chalk/source/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _ansi_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor/ansi-styles/index.js */ "../../../../node_modules/chalk/source/vendor/ansi-styles/index.js");
/* harmony import */ var _supports_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #supports-color */ "../../../../node_modules/chalk/source/vendor/supports-color/browser.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities.js */ "../../../../node_modules/chalk/source/utilities.js");




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

/***/ "../../../../node_modules/chalk/source/utilities.js":
/*!**********************************************************!*\
  !*** ../../../../node_modules/chalk/source/utilities.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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

/***/ "../../../../node_modules/chalk/source/vendor/ansi-styles/index.js":
/*!*************************************************************************!*\
  !*** ../../../../node_modules/chalk/source/vendor/ansi-styles/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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

/***/ "../../../../node_modules/chalk/source/vendor/supports-color/browser.js":
/*!******************************************************************************!*\
  !*** ../../../../node_modules/chalk/source/vendor/supports-color/browser.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

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
// import { IFormBuilderContext } from "../../../../Typings/FormBuilder/IFormBuilderContext";
// import { IShareDoOptionSet } from "../../../../Typings/OptionSets/IShareDoOptionSet";
// import { IOdsEntity } from "../../../../Typings/WidgetsOdsEntityPicker/IOdsEntity";


//constants 
const matterPartnerRoleSystemName = "matter-partner";
const clientRoleSystemName = "client";
//This function is called from the module-loader webcomponent in the form builder
function runMe(context) {
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
        if (context.workItemContext?.phaseName()?.toLowerCase().includes("draft") || !context.workItemContext?.phaseName()) {
            exit = false;
        }
        if (exit === true) {
            //only run this code if the work item is new
            console.log("%c [ModuleLoader] FB_MatterDetails - exit (only run on new)", "background: #222; color: #bada55", context.workItemContext.id());
            console.log("%c [ModuleLoader] context.workItemContext.id() ", "background: #222; color: #bada55", context.workItemContext.id());
            console.log("%c [ModuleLoader] context.workItemContext?.phaseName() ", "background: #222; color: #bada55", context.workItemContext?.phaseName());
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
    if (!context.form)
        throw new Error("No form");
    //add event handlet for expert-matter-number changed
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]?.on("change", function (ev) {
        console.log("%c Partner name changed to: " + matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]?.getValue(), "color: pink; font-size: 20px;");
    });
    //add event handlet for expert-matter-number changed
    context.form.fieldsById[enumFields.expertMatterNumber]?.on("change", function (ev) {
        // hide or show the matter details field
        hideShowMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter);
        // update the matter details field
        updateMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter);
    });
    //add event handlet for pipeline-matter changed
    context.form.fieldsById[enumFields.pipelineMatter]?.on("change", function (ev) {
        // hide or show the matter details field
        hideShowMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter);
        // update the matter details field
        updateMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter);
    });
    //add event handlet for jurisdiction changed
    //update the OOB Jurisdiction aspect field and formbuilder fields
    context.form.fieldsById[enumFields.jurisdictionsCountry]?.on("change", async function (ev) {
        //update blade jurisdiction     
        let selectedId = context.form?.fieldsById["jurisdictions-country"]?.getValue();
        console.log("%c Jurisdiction changed to: " + context.form?.fieldsById["jurisdictions-country"]?.getValue(), "color: red; font-size: 20px;");
        let aspect = context.getAspect("Sharedo.Core.Legal.Aspects.Widgets.InstructionWorkTypeDetails");
        let selectedJurisdictionCountry = await $ajax.get(/* webpackIgnore: true */ `/api/v1/public/modeller/optionSets/allValues/${selectedId}`);
        if (!selectedJurisdictionCountry) {
            //log issue
            console.log("%c [ModuleLoader] getAspect return value", "background: #222; color: #bada55", selectedJurisdictionCountry);
            return;
        }
        let options = await $ajax.get(/* webpackIgnore: true */ `/api/v1/public/modeller/optionSets/jurisdictions/values`);
        let selectedJurisdiction = options.find((option) => option.name === selectedJurisdictionCountry.name);
        if (!selectedJurisdiction) {
            //log issue
            console.log("%c [ModuleLoader] getAspect return value", "background: #222; color: #bada55", selectedJurisdiction);
            return;
        }
        aspect.widget.instruction.jurisdictionId(selectedJurisdiction.id);
    });
}
// hide or show the matter details field
function hideShowMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter) {
    setMatterDetailsState(context, matterDetails, pipelineMatter.getValue());
}
// make all child properties readonly
function setMatterDetailsState(context, matterDetails, status = true) {
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
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsIbLastChecked]?.hidden(true);
    ensureReadOnlyFields(context);
}
// clear all the child properties of the matter details sub area of the form builder
async function clearMatterDetails(matterDetails) {
    matterDetails.fields?.forEach(function (child) {
        child.setValue("");
    });
}
/*
1. We first get the data from the endpoint by calling getMatterData() function
2. Then we clear the matterDetails
3. We find the selected matter by using the matter code and client code from the data we got from the endpoint
4. If the matter is undefined, we clear the matterDetails and return
5. If the matter is not undefined, we set the values of the matterDetails fields */
async function updateMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter) {
    let data = await getMatterData(expertMatterNumber.getValue());
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
    if (!matterDetails.parent?.fieldsById)
        throw new Error("No client");
    let tempMatterNumber = matterDetails.parent?.fieldsById['temp-matter-number']?.getValue();
    if (tempMatterNumber === undefined || tempMatterNumber.length === 0) {
        // matterDetails.parent.childrenByPropertyId['temp-matter-number'].setValue("N/A");
    }
    //set the value portion of the expert-matter-number field
    context.form?.fieldsById[enumFields.expertMatterNumberValue]?.setValue(selectedMatter?.data?.matterCode || "");
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsClientName]?.setValue(selectedMatter?.data?.client?.name || "");
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsClientCode]?.setValue(selectedMatter?.data?.client?.code || "");
    // matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPracticeArea]?.setValue(selectedMatter?.data?.practiceArea?.name || "");
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsName]?.setValue(selectedMatter?.data?.shortName || "");
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]?.setValue(selectedMatter?.data?.partner?.name || "");
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsIb]?.setValue(selectedMatter?.data?.secure || "");
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
        console.log("%c Found Client name : " + client?.name, "color: pink; font-size: 20px;", clients);
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
        console.log("%c Partner name changed to: " + user?.id, "color: pink; font-size: 20px;", user);
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
async function getMatterData(expertMatterNumber) {
    let retValue = [];
    if (expertMatterNumber === undefined || expertMatterNumber.length === 0) {
        return retValue;
    }
    //return await $ajax.get(/* webpackIgnore: true */ window.document.location.origin + "/_ideFiles/SampleData/eDiscovery/matters.json") as IExpertMatter[];
    // //get the data from the server without cache
    try {
        let data = await (0,_Common_api_api__WEBPACK_IMPORTED_MODULE_1__.executeGet)(`/api/externalMatterProvider/details/${expertMatterNumber}`);
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
}
/**
 * Generates a temp matter number and sets it to the temp-matter-number field
 * @param context The form builder context
 */
function generateTempMatterNumber(context) {
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
    context.form?.fieldsById[enumFields.tempMatterNumber]?.setValue(tempMatterNumber);
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
    //log color
    console.log("%c [MatterDetails] validateIfPipelineMatter", "color: #green");
    console.log("%c [MatterDetails] context.workItemContext()", " color: #green", context.workItemContext);
    if (context.workItemContext.sharedoTypeSystemName()?.includes("pipeline") !== true) {
        return;
    }
    let pipelineFormField = context.form?.fieldsById[enumFields.pipelineMatter];
    if (pipelineFormField) {
        //ensure pipleine matter is readonly
        console.log("%c [MatterDetails] pipelineFormField.setValue(true)", " color: #green");
        pipelineFormField.setValue(true);
    }
}
function ensureReadOnlyFields(context) {
    let pipelineFormField = context.form?.fieldsById[enumFields.pipelineMatter];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQzVDLG9CQUFvQjtBQUNwQixnQkFBZ0I7QUFDaEIsWUFBWTtBQUNaLFFBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vLi4vLi4vQ29tbW9uL0xvZy50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vQ29tbW9uL1N0YWNrSGVscGVyLnRzIiwid2VicGFjazovLy8uLi8uLi9Db21tb24vT2RzSGVscGVyLnRzIiwid2VicGFjazovLy8uLi8uLi9Db21tb24vYXBpL2FwaS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vQ29tbW9uL2FwaS9vZHMvc2VhcmNoLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL2luZGV4LmpzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS92ZW5kb3IvYW5zaS1zdHlsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvdmVuZG9yL3N1cHBvcnRzLWNvbG9yL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vRkJfTWF0dGVyRGV0YWlscy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGssIHsgQ2hhbGtJbnN0YW5jZSB9IGZyb20gJ2NoYWxrJztcbmltcG9ydCB7IGV4dHJhY3RDYWxsZXJGcm9tU3RhY2ssIGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrIH0gZnJvbSAnLi9TdGFja0hlbHBlcic7XG5cbmNoYWxrLmxldmVsID0gMztcbmxldCBkZWZhdWx0TW9kZTogQ2hhbGtJbnN0YW5jZSA9IGNoYWxrLnJlc2V0O1xuXG5cbmxldCBsYXN0U2VjOiBTZWN0aW9uIHwgdW5kZWZpbmVkO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhclNlYygpIHtcblxuICAgIC8vIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKXtcbiAgICAvLyBjb25zb2xlLmdyb3VwRW5kKClcbiAgICAvLyB9XG5cbiAgICBpZiAobGFzdFNlYz8uZ3JvdXApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXN0U2VjPy5ncm91cDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGFzdFNlYyA9IG5ldyBTZWN0aW9uKFwiUm9vdFwiLCBkZWZhdWx0TW9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWNCYWNrT25lKCkge1xuICAgIGxhc3RTZWMgPSBsYXN0U2VjPy5wYXJlbnQ7XG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xufVxuXG5leHBvcnQgY2xhc3MgU2VjdGlvbiB7XG4gICAgc2VjdGlvbk5hbWU6IHN0cmluZztcbiAgICBwYXJlbnQ6IFNlY3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgYzogQ2hhbGtJbnN0YW5jZVxuICAgIGluZGVudCA9IDA7XG4gICAgaW5kZW50UGFkID0gXCJcIjtcbiAgICBncm91cDogbnVtYmVyID0gMDtcbiAgICBjb25zdHJ1Y3RvcihzZWN0aW9uTmFtZTogc3RyaW5nLCBjOiBDaGFsa0luc3RhbmNlLCBzZWN0aW9uPzogU2VjdGlvbikge1xuICAgICAgICB0aGlzLmMgPSBjO1xuICAgICAgICB0aGlzLnNlY3Rpb25OYW1lID0gc2VjdGlvbk5hbWU7XG4gICAgICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmluZGVudCA9IHNlY3Rpb24uaW5kZW50ICsgMTtcbiAgICAgICAgICAgIHRoaXMuaW5kZW50UGFkID0gXCItXCIucmVwZWF0KHRoaXMuaW5kZW50ICogMikgKyBcIiBcIjtcbiAgICAgICAgfVxuICAgICAgICBsYXN0U2VjID0gdGhpcztcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBzZWN0aW9uO1xuICAgIH1cbiAgICBsb2coLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgY29uc29sZS5sb2coZGVmYXVsdE1vZGUoYXJncykpO1xuICAgIH1cbiAgICBsaDEoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDEodGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsaDIoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDIodGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsaDMoaGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaDModGhpcy5pbmRlbnRQYWQgKyBoZWFkaW5nLCB0aGlzKVxuICAgIH1cbiAgICBsKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiBsKHRoaXMsIC4uLmFyZ3MpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGwoLi4uYXJnczogYW55W10pIHtcblxuICAgIGxldCBzZWM6IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjO1xuICAgIGxldCBmaXJzdEFyZzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGxldCBmaXJzdEFyZ01vZGlmZWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgICBpZiAoYXJnIGluc3RhbmNlb2YgU2VjdGlvbikge1xuICAgICAgICAgICAgc2VjID0gYXJnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZmlyc3RBcmcgJiYgYXJnLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiU3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGZpcnN0QXJnID0gYXJncy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8vcmVtb3ZlZCBTZWN0aW9uIGZyb20gYXJnc1xuICAgIGFyZ3MgPSBhcmdzLmZpbHRlcigoYXJnKSA9PiB7XG4gICAgICAgIHJldHVybiAhKGFyZyBpbnN0YW5jZW9mIFNlY3Rpb24pO1xuICAgIH0pXG5cblxuICAgIC8vIGxldCBjID0gc2VjPy5jIHx8IG1vZGU7XG4gICAgbGV0IGMgPSBkZWZhdWx0TW9kZTtcbiAgICBsZXQgaW5kZW50UGFkID0gc2VjPy5pbmRlbnRQYWQgfHwgXCJcIjtcblxuICAgIGlmICghZmlyc3RBcmcpIHtcbiAgICAgICAgZmlyc3RBcmcgPSBcIlwiO1xuICAgIH1cbiAgICBmaXJzdEFyZ01vZGlmZWQgPSBmaXJzdEFyZztcblxuICAgIGZpcnN0QXJnTW9kaWZlZCA9IGluZGVudFBhZCArIGZpcnN0QXJnO1xuICAgIC8vcmVtb3ZlIGNvbG9yIGZvcm1hdHRpbmcgZnJvbSBmaXJzdCBhcmdcbiAgICBsZXQgdG90TGVuID0gZmlyc3RBcmdNb2RpZmVkLmxlbmd0aCAtIGZpcnN0QXJnTW9kaWZlZC5yZXBsYWNlKC9cXHUwMDFiXFxbLio/bS9nLCAnJykubGVuZ3RoIC0gMjtcblxuXG4gICAgY29uc29sZS5sb2coZmlyc3RBcmdNb2RpZmVkKTtcblxuICAgIC8vcmVtb3ZlZCBTZWN0aW9uIGZyb20gYXJnc1xuXG4gICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYXJnKTtcbiAgICB9KVxuXG5cbn1cblxuXG5cbmZ1bmN0aW9uIGxvZ0hlYWRpbmdTZWN0aW9uKGM6IENoYWxrSW5zdGFuY2UsIGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbj86IFNlY3Rpb24pIHtcblxuICAgIGxldCBzZWMgPSBuZXcgU2VjdGlvbihoZWFkaW5nLCBjLCBzZWN0aW9uKTtcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKERhdGUubm93KCkpLnRvTG9jYWxlU3RyaW5nKCk7XG5cbiAgICBsZXQgcGF0aCA9IFwiXCI7XG4gICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgcGF0aCA9IHNlY3Rpb24uc2VjdGlvbk5hbWU7XG4gICAgICAgIHdoaWxlIChzZWN0aW9uLnBhcmVudCkge1xuICAgICAgICAgICAgc2VjdGlvbiA9IHNlY3Rpb24ucGFyZW50O1xuICAgICAgICAgICAgcGF0aCA9IHNlY3Rpb24uc2VjdGlvbk5hbWUgKyBcIiAtPiBcIiArIHBhdGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL2FkZCBhZGQgaGVhZGluZyB0byBlbmQgb2YgcGF0aCBhbmQgb25seSBhZGQgLT4gaWYgcGF0aCBpcyBub3QgZW1wdHlcbiAgICBpZiAocGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBhdGggKz0gXCIgLT4gXCI7XG4gICAgfVxuICAgIHBhdGggKz0gaGVhZGluZztcblxuXG5cbiAgICAvL3Bvc2l0aW9uIHRoZSBoZWFkaW5nIGluIHRoZSBtaWRkbGUgb2YgdGhlIHNjcmVlblxuICAgIC8vIGNvbnNvbGUubG9nKGMoaGVhZGluZy5wYWRTdGFydCgoY3dpZHRoIC8gMikgKyAoaGVhZGluZy5sZW5ndGggLyAyKSwgXCIgXCIpLnBhZEVuZChjd2lkdGgsIFwiIFwiKSkpO1xuICAgIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQoYyhwYXRoKSk7XG4gICAgc2VjLmdyb3VwKys7XG5cbiAgICByZXR1cm4gc2VjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGgxKGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWMpIHtcbiAgICBsZXQgYyA9IGNoYWxrLmJnQmxhY2suZ3JlZW5CcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaDIoaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYykge1xuICAgIGxldCBjID0gY2hhbGsuYmdHcmF5LmN5YW5CcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaDMoaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYykge1xuICAgIGxldCBjID0gY2hhbGsuYmdHcmF5Lm1hZ2VudGFCcmlnaHQuYm9sZDtcbiAgICByZXR1cm4gbG9nSGVhZGluZ1NlY3Rpb24oYywgaGVhZGluZywgc2VjdGlvbik7XG59XG5cblxuZXhwb3J0IGNvbnN0IGxoID0gbGgxO1xuXG5cbmV4cG9ydCBjb25zdCBpbXAgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay5yZWQuYm9sZC5iZ0JsYWNrO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgaW5mID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsuYmx1ZS5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3Qgd3JuID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsueWVsbG93LmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59IFxuXG5leHBvcnQgY29uc3QgZXJyID0gKHRleHQ6IHN0cmluZykgPT4ge1xuXG4gICAgbGV0IGVyID0gKG5ldyBFcnJvcigpKTtcbiAgICBsZXQgbGluZU5vID0gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soZXIuc3RhY2spO1xuICAgIGxldCBjYWxsZXIgPSBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrKGVyLnN0YWNrKTtcblxuICAgIGxldCBwcmVUZXh0ID0gYFske2NhbGxlcn06JHtsaW5lTm99XWA7XG5cbiAgICB0ZXh0ID0gcHJlVGV4dCArIFwiIFwiICsgdGV4dDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhlcik7XG5cbiAgICBsZXQgYyA9IGNoYWxrLnJlZC5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3Qgc3VjID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsuZ3JlZW4uYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGhsID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ0JsdWUodGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBobDEgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGNoYWxrLmJnTWFnZW50YSh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IG52ID0gKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ0JsdWVCcmlnaHQobmFtZS5wYWRFbmQoMzAsIFwiIFwiKSkgKyBcIiA6IFwiICsgY2hhbGsuY3lhbkJyaWdodCh2YWx1ZSk7XG59XG5cbiBcbmxldCBleGFtcGxlSlNvbiA9XG57XG4gICAgXCJuYW1lXCI6IFwidGVzdFwiLFxuICAgIFwiYWdlXCI6IDEwLFxuICAgIFwiYWRkcmVzc1wiOiB7XG4gICAgICAgIFwic3RyZWV0XCI6IFwiMTIzIEZha2UgU3RyZWV0XCIsXG4gICAgICAgIFwiY2l0eVwiOiBcIkxvbmRvblwiLFxuICAgICAgICBcInBvc3Rjb2RlXCI6IFwiU1cxQSAxQUFcIlxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blRlc3QoKSB7XG5cblxuICAgIGNvbnNvbGUubG9nKFwiLS0gdGVzdCAtLVwiKVxuXG4gICAgbGV0IHNlYyA9IGxoMShcIlRlc3QgSGVhZGluZyAxXCIpXG4gICAgbChpbXAoXCJBdXRvIFNlYyAtIFRoaXMgaXMgc29tZXRoaW5nIGltcG9ydGFudFwiKSlcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIDFcIilcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIDJcIilcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIElORk86IFwiICsgaW1wKFwiVGhpcyBpcyBzb21ldGhpbmcgaW1wb3J0YW50XCIpKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgV0lUSCBBRERJVElOQUwgSU5GTzogXCIgKyBpbXAoXCJUaGlzIGlzIHNvbWV0aGluZyBpbXBvcnRhbnRcIikgKyBcIiBhbmQgdGhpcyBpcyBzb21lIGFkZGl0aW9uYWwgaW5mb1wiKVxuICAgIGwoXCJBdXRvIFNlYyAtIFRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiYWZ0ZXIgYXV0byBzZWMgVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuICAgIHNlYyA9IHNlYy5saDIoXCJIZWFkaW5nIDJcIilcbiAgICBzZWMubChcIlRlc3RcIilcbiAgICBzZWMubChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuXG4gICAgc2VjID0gc2VjLmxoMyhcIkhlYWQgM1wiKVxuICAgIGwoXCJUZXN0XCIpXG4gICAgbChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuICAgIGNsZWFyU2VjKCk7XG4gICAgbChcIlRlc3QgQ2xlYXIgU2VjXCIpXG4gICAgbChcIlRlc3QgMjpcIiArIGltcChcIkFuIGltcG9ydGFudCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCAzOlwiICsgaW5mKFwiQW4gaW5mbyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA0OlwiICsgd3JuKFwiQW4gd2FybiB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA1OlwiICsgZXJyKFwiQW4gZXJyb3IgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNjpcIiArIHN1YyhcIkFuIHN1Y2Nlc3MgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNzpcIiArIGhsKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDg6XCIgKyBobDEoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChudihcIk5hbWVcIiwgXCJWYWx1ZVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcbiAgICBsKG52KFwiRXhhbXBsZSBOYW1lXCIsIFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbVwiKSlcblxuXG5cbiAgICBsKFwiVGVzdCBKU09OOlwiLCBleGFtcGxlSlNvbik7XG5cbn1cblxuLy8gcnVuVGVzdCgpXG5jbGVhclNlYygpO1xuXG4vLyBleHBvcnQge2NvbG9yc307XG4iLCJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0TGluZU51bWJlckZyb21TdGFjayhzdGFjazogc3RyaW5nIHwgdW5kZWZpbmVkKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgaWYgKCFzdGFjaykgcmV0dXJuIG51bGw7XG4gICAgLy8gRXh0cmFjdCBsaW5lcyBmcm9tIHN0YWNrXG4gICAgY29uc3Qgc3RhY2tMaW5lcyA9IHN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAvLyBGaW5kIHRoZSBsaW5lIHdpdGggdGhlIGVycm9yICh1c3VhbGx5IHRoZSBzZWNvbmQgbGluZSlcbiAgICBjb25zdCBlcnJvckxpbmUgPSBzdGFja0xpbmVzWzFdIHx8ICcnO1xuICAgIC8vIEV4dHJhY3QgbGluZSBudW1iZXIgZnJvbSB0aGUgZXJyb3IgbGluZSB1c2luZyByZWdleFxuICAgIGNvbnN0IG1hdGNoID0gZXJyb3JMaW5lLm1hdGNoKC86KFxcZCspOihcXGQrKSQvKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBwYXJzZUludChtYXRjaFsxXSkgOiBudWxsO1xuICB9XG4gIFxuIGV4cG9ydCBmdW5jdGlvbiBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrKHN0YWNrOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAoIXN0YWNrKSByZXR1cm4gbnVsbDtcbiAgICAvLyBFeHRyYWN0IGxpbmVzIGZyb20gc3RhY2tcbiAgICBjb25zdCBzdGFja0xpbmVzID0gc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIC8vIEZpbmQgdGhlIGxpbmUgd2l0aCB0aGUgY2FsbGVyIGZ1bmN0aW9uICh1c3VhbGx5IHRoZSB0aGlyZCBsaW5lKVxuICAgIGNvbnN0IGNhbGxlckxpbmUgPSBzdGFja0xpbmVzWzJdIHx8ICcnO1xuICAgIC8vIEV4dHJhY3QgY2FsbGVyIGZ1bmN0aW9uIG5hbWUgdXNpbmcgcmVnZXhcbiAgICBjb25zdCBtYXRjaCA9IGNhbGxlckxpbmUubWF0Y2goL2F0IChbXFx3Ljw+XSspLyk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBudWxsO1xuICB9IiwiLyoqXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgaGVscGVyIGZ1bmN0aW9ucyBmb3Igd29ya2luZyB3aXRoIHRoZSBPRFMgQVBJXG4gKiBfc2VhcmNoIGlzIGEgd3JhcHBlciBhcm91bmQgdGhlIE9EUyBzZWFyY2ggZW5kcG9pbnRcbiAqL1xuXG5pbXBvcnQgeyBJQXNwZWN0IH0gZnJvbSBcIi4uLy4uL0ludGVyZmFjZXMvQXNwZWN0L0lBc3BlY3RcIjtcbmltcG9ydCB7IElPRFNPcmdhbmlzYXRpb25SZXN1bHQgfSBmcm9tIFwiLi4vLi4vSW50ZXJmYWNlcy9PZHNMaXN0L0lPRFNPcmdhbmlzYXRpb25SZXN1bHRcIjtcbmltcG9ydCB7IElPRFNQZXJzb25SZXN1bHQgfSBmcm9tIFwiLi4vLi4vSW50ZXJmYWNlcy9PZHNMaXN0L0lPRFNQZW9wbGVTZWFyY2hSZXN1bHRcIjtcbmltcG9ydCB7IElPRFNlYXJjaFJlc3VsdCB9IGZyb20gXCIuLi8uLi9JbnRlcmZhY2VzL09kc0xpc3QvSU9EU1NlYXJjaFJlc3VsdFwiO1xuaW1wb3J0IHsgVFNoYXJlRG9CbGFkZSB9IGZyb20gXCIuLi8uLi9JbnRlcmZhY2VzL1NoYXJlZG9Bc3BlY3RNb2RlbHNcIjtcbmltcG9ydCB7IElSb2xlQ29uZmlnTW9kZWxzIH0gZnJvbSBcIi4uLy4uL0ludGVyZmFjZXMvV2lkZ2V0c09kc0VudGl0eVBpY2tlci9JUm9sZUNvbmZpZ01vZGVsc1wiO1xuaW1wb3J0IHsgSU9kc1dpZGdldE9EU0VudGl0aWVzLCBJT2RzV2lkZ2V0IH0gZnJvbSBcIi4uLy4uL0ludGVyZmFjZXMvV2lkZ2V0c09kc0VudGl0eVBpY2tlci9JV2lkZ2V0T2RzRW50aXR5UGlja2VyXCI7XG5pbXBvcnQgeyBfc2VhcmNoIH0gZnJvbSBcIi4vYXBpL29kcy9zZWFyY2hcIjtcblxuXG4vKipcbiAqIFVzZXMgdGhlIFwiL2FwaS9vZHMvX3NlYXJjaFwiIGVuZHBvaW50IHRvIHNlYXJjaCBmb3IgdXNlcnMuXG4gKiBAcGFyYW0gc2VhcmNoIFRoZSBzZWFyY2ggc3RyaW5nIHRvIHVzZSBzdWNoIGFzIHN1cm5hbWUgb3IgZW1haWwgYWRkcmVzc1xuICogQHJldHVybnMgXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hGb3JVc2VycyhzZWFyY2g6IHN0cmluZykgOiBQcm9taXNlPElPRFNQZXJzb25SZXN1bHRbXT5cbiB7XG4gICAgbGV0IHBvc3RCb2R5ID0ge1xuICAgICAgICBcInN0YXJ0UGFnZVwiOiAxLFxuICAgICAgICBcImVuZFBhZ2VcIjogMSxcbiAgICAgICAgXCJyb3dzUGVyUGFnZVwiOiAxMCxcbiAgICAgICAgXCJzZWFyY2hTdHJpbmdcIjogc2VhcmNoLFxuICAgICAgICBcIm9kc0VudGl0eVR5cGVzXCI6IFtdLFxuICAgICAgICBcImF2YWlsYWJpbGl0eVwiOiB7XG4gICAgICAgICAgICBcImlzQXZhaWxhYmxlXCI6IG51bGwsXG4gICAgICAgICAgICBcImlzT3V0T2ZPZmZpY2VcIjogbnVsbCxcbiAgICAgICAgICAgIFwiaXNOb3RBdmFpbGFibGVcIjogbnVsbFxuICAgICAgICB9LFxuICAgICAgICBcImxvY2F0aW9uXCI6IHtcbiAgICAgICAgICAgIFwicG9zdGNvZGVcIjogbnVsbCxcbiAgICAgICAgICAgIFwicmFuZ2VcIjogMTBcbiAgICAgICAgfSxcbiAgICAgICAgXCJjb25uZWN0aW9uXCI6IHtcbiAgICAgICAgICAgIFwic3lzdGVtTmFtZVwiOiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIFwiY29tcGV0ZW5jaWVzXCI6IFtdLFxuICAgICAgICBcInRlYW1zXCI6IFtdLFxuICAgICAgICBcInJvbGVzXCI6IFtdLFxuICAgICAgICBcIm9kc1R5cGVzXCI6IFtcbiAgICAgICAgICAgIFwiYWNsXCIsXG4gICAgICAgICAgICBcImFsdC1lZGlzY292ZXJ5LXVzZXItdHlwZVwiLFxuICAgICAgICAgICAgXCJjbGllbnRcIixcbiAgICAgICAgICAgIFwiZGVwYXJ0bWVudFwiLFxuICAgICAgICAgICAgXCJkb2N1bWVudC10cmFpbmluZy10eXBlXCIsXG4gICAgICAgICAgICBcImVtcGxveWVlXCIsXG4gICAgICAgICAgICBcImV4cGVydFwiLFxuICAgICAgICAgICAgXCJleHRlcm5hbC10ZWFtXCIsXG4gICAgICAgICAgICBcImV4dGVybmFsXCIsXG4gICAgICAgICAgICBcInBvZFwiLFxuICAgICAgICAgICAgXCJzdHJ1Y3R1cmFsXCIsXG4gICAgICAgICAgICBcInN5c3RlbS1hZG1pbmlzdHJhdG9yXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJ3YWxsTWFuYWdlbWVudFwiOiBmYWxzZVxuICAgIH07XG4gICAgcmV0dXJuIHNlYXJjaE9kc0FuZFJldHVyblJvd3M8SU9EU1BlcnNvblJlc3VsdD4oc2VhcmNoLHBvc3RCb2R5KTtcbn1cblxuLyoqXG4gKiBVc2VzIHRoZSBcIi9hcGkvb2RzL19zZWFyY2hcIiBlbmRwb2ludCB0byBzZWFyY2ggZm9yIGNsaWVudHMuXG4gKiBAcGFyYW0gc2VhcmNoIFRoZSBzZWFyY2ggc3RyaW5nIHRvIHVzZSBzdWNoIGFzIGNsaWVudCBjb2RlIG9yIG5hbWVcbiAqIEByZXR1cm5zIEEgbGlzdCBvZiBjbGllbnRzXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hGb3JDbGllbnRzKHNlYXJjaDogc3RyaW5nKTogUHJvbWlzZTxJT0RTT3JnYW5pc2F0aW9uUmVzdWx0W10+IHtcblxuICAgICAgICBsZXQgcG9zdEJvZHkgPSB7XG4gICAgICAgICAgICBcInN0YXJ0UGFnZVwiOiAxLFxuICAgICAgICAgICAgXCJlbmRQYWdlXCI6IDEsXG4gICAgICAgICAgICBcInJvd3NQZXJQYWdlXCI6IDEwLFxuICAgICAgICAgICAgXCJzZWFyY2hTdHJpbmdcIjogc2VhcmNoLFxuICAgICAgICAgICAgXCJvZHNFbnRpdHlUeXBlc1wiOiBbXSxcbiAgICAgICAgICAgIFwiYXZhaWxhYmlsaXR5XCI6IHtcbiAgICAgICAgICAgICAgICBcImlzQXZhaWxhYmxlXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgXCJpc091dE9mT2ZmaWNlXCI6IG51bGwsXG4gICAgICAgICAgICAgICAgXCJpc05vdEF2YWlsYWJsZVwiOiBudWxsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJsb2NhdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgXCJwb3N0Y29kZVwiOiBudWxsLFxuICAgICAgICAgICAgICAgIFwicmFuZ2VcIjogMTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImNvbm5lY3Rpb25cIjoge1xuICAgICAgICAgICAgICAgIFwic3lzdGVtTmFtZVwiOiBudWxsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJjb21wZXRlbmNpZXNcIjogW10sXG4gICAgICAgICAgICBcInRlYW1zXCI6IFtdLFxuICAgICAgICAgICAgXCJyb2xlc1wiOiBbXSxcbiAgICAgICAgICAgIFwib2RzVHlwZXNcIjogW1xuICAgICAgICAgICAgICAgIFwiY2xpZW50XCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcIndhbGxNYW5hZ2VtZW50XCI6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBzZWFyY2hPZHNBbmRSZXR1cm5Sb3dzPElPRFNPcmdhbmlzYXRpb25SZXN1bHQ+KHNlYXJjaCxwb3N0Qm9keSk7XG59XG5cblxuLy8gUmVnaW9uOiBHZXQgYWxsIHJvbGUgY29uZmlnIGZvciByb2xlXG4vLyBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHRvIGdldCBhbGwgdGhlIHJvbGUgY29uZmlnIGZvciBhIGdpdmVuIHJvbGVcbi8vIEl0IGlzIHVzZWQgaW4gdGhlIFwiZ2V0Um9sZUNvbmZpZ0ZvclJvbGVcIiBmdW5jdGlvbiBiZWxvd1xuLy8gdGhlIGludGVyZmFjZSBpcyB1c2VkIHRvIHJldHVybiB0aGUgcmVzdWx0cyBvZiB0aGUgZnVuY3Rpb25cblxuLyoqXG4gKiBUaGlzIGludGVyZmFjZSBpcyB1c2VkIHRvIHJldHVybiB0aGUgcmVzdWx0cyBvZiB0aGUgZnVuY3Rpb25cbiAqIEBwcm9wZXJ0eSByb2xlQ29uZmlnIC0gdGhlIHJvbGUgY29uZmlnIGZvciB0aGUgZ2l2ZW4gcm9sZVxuICogQHByb3BlcnR5IE9EU0VudGl0aWVzIC0gdGhlIE9EUyBlbnRpdGllcyBmb3IgdGhlIGdpdmVuIHJvbGVcbiAqIEJvdGggYXJlIHJldHVybmVkIGFzIGJvdGggYXJlIG5lZWRlZCB3aGVuIHVwZGF0aW5nIHRoZSB3aWRnZXRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJR2V0QWxsUm9sZUNvbmZpZ0ZvclJvbGUge1xuICAgIHJvbGVDb25maWc6IElSb2xlQ29uZmlnTW9kZWxzW10sXG4gICAgT0RTRW50aXRpZXM6IElPZHNXaWRnZXRPRFNFbnRpdGllc1tdXG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGFsbCB0aGUgcm9sZSBjb25maWcgZm9yIGEgZ2l2ZW4gcm9sZVxuICogQHBhcmFtIGJsYWRlIFxuICogQHBhcmFtIHJvbGUgXG4gKiBAcmV0dXJucyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbFJvbGVDb25maWdGb3JSb2xlKGJsYWRlOiBUU2hhcmVEb0JsYWRlIHwgdW5kZWZpbmVkLCByb2xlOiBzdHJpbmcpOiBJR2V0QWxsUm9sZUNvbmZpZ0ZvclJvbGUge1xuICAgIGxldCByZXRWYWx1ZTogSUdldEFsbFJvbGVDb25maWdGb3JSb2xlID1cbiAgICB7XG4gICAgICAgIHJvbGVDb25maWc6IFtdLFxuICAgICAgICBPRFNFbnRpdGllczogW11cbiAgICB9O1xuICAgIGlmICghYmxhZGUpIHJldHVybiByZXRWYWx1ZTtcblxuICAgIGxldCBhbGxPZHNBc3BlY3RzID0gZ2V0T2RzV2lkZ2V0cyhibGFkZSk7XG5cbiAgICAvLyBwLm9wdGlvbnMucm9sZUNvbmZpZ01vZGVscy5mb3JFYWNoKChyOmFueSkgPT4ge1xuICAgIGFsbE9kc0FzcGVjdHM/LmZvckVhY2goYSA9PiB7XG5cbiAgICAgICAgYS53aWRnZXQub2RzRW50aXRpZXMoKS5mb3JFYWNoKG9kcyA9PiB7XG4gICAgICAgICAgICBpZiAoIW9kcy5yb2xlU3lzdGVtTmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9kcy5yb2xlU3lzdGVtTmFtZSgpID09PSByb2xlKSB7XG4gICAgICAgICAgICAgICAgcmV0VmFsdWUuT0RTRW50aXRpZXMucHVzaChvZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGEud2lkZ2V0Lm9wdGlvbnMucm9sZUNvbmZpZ01vZGVscy5mb3JFYWNoKHIgPT4ge1xuICAgICAgICAgICAgaWYgKHIucm9sZVN5c3RlbU5hbWUgPT09IHJvbGUpIHtcbiAgICAgICAgICAgICAgICByZXRWYWx1ZS5yb2xlQ29uZmlnLnB1c2gocik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9KVxuXG4gICAgLy8gaWYoIWFsbE9kc0FzcGVjdHMpIHJldHVybiByZXRWYWx1ZTtcbiAgICAvLyBsZXQgYXNwZWN0V2l0aFBhcnRuZXIgPSBhbGxPZHNBc3BlY3RzLmZpbHRlcihhPT5hLndpZGdldC5vZHNFbnRpdGllcygpLmZpbmQoKG86YW55KT0+by5yb2xlTmFtZT09PXJvbGUpKTtcbiAgICAvLyBpZighYXNwZWN0V2l0aFBhcnRuZXIpIHJldHVybiByZXRWYWx1ZTtcblxuICAgIC8vIGZvcihsZXQgYXNwZWN0IG9mIGFzcGVjdFdpdGhQYXJ0bmVyKVxuICAgIC8vIHtcbiAgICAvLyAgICAgbGV0IG9kc1BhcnRuZXIgPSBhc3BlY3Qud2lkZ2V0Lm9kc0VudGl0aWVzKCkuZmluZCgobzphbnkpPT5vLnJvbGVOYW1lPT09cm9sZSk7XG4gICAgLy8gICAgIGlmKCFvZHNQYXJ0bmVyKSBjb250aW51ZTtcbiAgICAvLyAgICAgcmV0VmFsdWUucHVzaChvZHNQYXJ0bmVyKTtcbiAgICAvLyB9XG4gICAgcmV0dXJuIHJldFZhbHVlO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhbGwgdGhlIHJvbGUgY29uZmlnIGZvciBhIGdpdmVuIHJvbGVcbiAqIEBwYXJhbSBibGFkZVxuICogQHBhcmFtIHJvbGVcbiAqIEByZXR1cm5zXG4qKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPZHNXaWRnZXRzKGJsYWRlOiBUU2hhcmVEb0JsYWRlKTogSUFzcGVjdDxJT2RzV2lkZ2V0PltdIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWJsYWRlKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgbGV0IHR5cGVUb0NoZWNrID0gU2hhcmVkby5Db3JlLkNhc2UuQXNwZWN0cy5XaWRnZXRzLk9kc0VudGl0eVBpY2tlcjtcblxuICAgIGxldCByZXRWYWx1ZSA9IGJsYWRlLmFzcGVjdHMoKS5maWx0ZXIoYSA9PiBhLndpZGdldCBpbnN0YW5jZW9mIHR5cGVUb0NoZWNrKTtcbiAgICByZXR1cm4gcmV0VmFsdWU7XG5cbn1cblxuLy8gI3JlZ2lvbiBHZXQgYWxsIHJvbGUgY29uZmlnIGZvciByb2xlXG4vLyAjcmVnaW9uIHByaXZhdGUgZnVuY3Rpb25zXG4vKipcbiAqIFVzZXMgdGhlIFwiL2FwaS9vZHMvX3NlYXJjaFwiIGVuZHBvaW50IHRvIHNlYXJjaCBmb3IgY2xpZW50cy5cbiAqIEBwYXJhbSBzZWFyY2ggVGhlIHNlYXJjaCBzdHJpbmcgdG8gdXNlIHN1Y2ggYXMgY2xpZW50IGNvZGUgb3IgbmFtZVxuICogQHJldHVybnMgQSBsaXN0IG9mIGNsaWVudHNcbiAqL1xuYXN5bmMgZnVuY3Rpb24gc2VhcmNoT2RzQW5kUmV0dXJuUm93czxUPihzZWFyY2g6IHN0cmluZyxwb3N0Qm9keTphbnkpOiBQcm9taXNlPFRbXT4ge1xuICAgIGxldCBBUElSZXN1bHQgPSBhd2FpdCBfc2VhcmNoPFQ+KHBvc3RCb2R5KTtcbiAgICAvL2xvZyBjb2xvclxuICAgIGNvbnNvbGUubG9nKFwiJWMgT0RTIFNlYXJjaCBSZXN1bHRcIiwgXCJjb2xvcjogI2ZmMDAwMFwiLCBBUElSZXN1bHQpO1xuICAgIGlmKCFBUElSZXN1bHQpIFxuICAgIHtcbiAgICAgICAgY29uc29sZS5sb2coXCIlYyBPRFMgU2VhcmNoIFJlc3VsdCAtIHVuZGVmaW5lZFwiLCBcImNvbG9yOiAjZmYwMDAwXCIpO1xuICAgICAgICByZXR1cm4gW107ICBcbiAgICB9XG4gICAgY29uc29sZS5sb2coXCIlYyBPRFMgU2VhcmNoIFJlc3VsdFwiLCBcImNvbG9yOiAjZmYwMDAwXCIsIEFQSVJlc3VsdCk7XG4gICAgcmV0dXJuIGV4dHJhY3RSb3dzRnJvbU9EU1NlYXJjaFJlc3VsdHM8VD4oQVBJUmVzdWx0KTtcbiAgXG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RSb3dzRnJvbU9EU1NlYXJjaFJlc3VsdHM8VD4oIEFQSVJlc3VsdDogSU9EU2VhcmNoUmVzdWx0PFQ+KSA6IFRbXVxuIHtcbiAgICB0cnlcbiAgICB7XG4gICAgICAgIGxldCByZXRWYWx1ZSA9IEFQSVJlc3VsdC5yb3dzLm1hcChyID0+IEpTT04ucGFyc2Uoci5yZXN1bHQpKTtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIH1cbiAgICBjYXRjaChlKVxuICAgIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiT0RTIEhlbHBlciBFcnJvciB0cnlpbmcgdG8gZXh0cmFjdCByb3dzIGZyb20gc2VhcmNoIHJlc3VsdFwiLCBlLEFQSVJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbn1cblxuXG5cbi8vICNlbmRyZWdpb24gcHJpdmF0ZSBmdW5jdGlvbnMiLCJcbi8qKlxuICogVGhpcyBmaWxlIGNvbnRhaW5zIHRoZSBhcGkgY2FsbHMgdG8gdGhlIGJhY2tlbmQuXG4gKiB1dGlsaXNpbmcgdGhlIGF4aW9zIGxpYnJhcnkgdG8gbWFrZSB0aGUgY2FsbHMuXG4gKiBpbmNsdXNpbmcgb2Ygd2VicGFja0lnbm9yZSBpcyB0byBhbGxvdyB0aGUgd2VicGFjayB0byBpZ25vcmUgdGhlIGNhbGxzIGFuZCBub3QgdHJ5IHRvIGJ1bmRsZSB0aGVtLlxuICovXG5cbmltcG9ydCB7IGVyciwgaW5mLCBsLCBsaDEsIHNlY0JhY2tPbmUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0xvZ1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVBvc3Q8VD4oYXBpOiBzdHJpbmcsIHBvc3RCb2R5OiBhbnkpOiBQcm9taXNlPFQ+IHtcbiAgICAvL3JldHVybiBhd2FpdCAkYWpheC5wb3N0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJQT1NUXCIsIHBvc3RCb2R5KSkuZGF0YTtcbn1cblxuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVHZXQ8VD4oYXBpOiBzdHJpbmcpIDogUHJvbWlzZTxUPntcbi8vICAgICByZXR1cm4gYXdhaXQgJGFqYXguZ2V0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSk7XG4vLyB9IFxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldDxUPihhcGk6IHN0cmluZyk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJHRVRcIiwgdW5kZWZpbmVkKSkuZGF0YTtcbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldHYyPFQ+KGFwaTogc3RyaW5nKXtcbiAgICByZXR1cm4gIGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiR0VUXCIsIHVuZGVmaW5lZCk7XG59XG5cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVB1dDxUPihhcGk6IHN0cmluZywgcG9zdEJvZHk6IGFueSk6IFByb21pc2U8VD4ge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LnB1dCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSksIHBvc3RCb2R5KTtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiUFVUXCIsIHBvc3RCb2R5KSkuZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVEZWxldGU8VD4oYXBpOiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICAvL3JldHVybiBhd2FpdCAkYWpheC5kZWxldGUoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpKTtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiREVMRVRFXCIsIHVuZGVmaW5lZCkpLmRhdGE7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQXBpKGFwaTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgbG9jYXRpb24gPSB3aW5kb3cuZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luO1xuXG4gICAgLy9pZiBhcGkgZG9lcyBub3QgaW5jbHVkZSB0aGUgbG9jYXRpb24gdGhlbiBhZGQgaXQuXG4gICAgaWYgKGFwaS5pbmRleE9mKGxvY2F0aW9uKSA9PT0gLTEpIHtcbiAgICAgICAgLy9jaGVjayBpZiBhcGkgc3RhcnQgd2l0aCBhIC8gaWYgbm90IGFkZCBpdC5cbiAgICAgICAgaWYgKGFwaS5pbmRleE9mKFwiL1wiKSAhPT0gMCkge1xuICAgICAgICAgICAgYXBpID0gXCIvXCIgKyBhcGk7XG4gICAgICAgIH1cblxuICAgICAgICBhcGkgPSBsb2NhdGlvbiArIGFwaTtcbiAgICB9XG4gICAgcmV0dXJuIGFwaTtcblxufVxuXG5leHBvcnQgdHlwZSBURXhlY3V0ZUZldGNoUmVzcG9uc2UgPVxuICAgIHtcbiAgICAgICAgZGF0YTogYW55IHwgdW5kZWZpbmVkLFxuICAgICAgICByZXNwb25zZTogUmVzcG9uc2UgfCB1bmRlZmluZWQsXG4gICAgICAgIGluZm86XG4gICAgICAgIHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGJvb2xlYW4sXG4gICAgICAgICAgICBlcnJvcjogQXJyYXk8VFVzZXJFcnJvcnM+XG4gICAgICAgIH1cbiAgICB9XG5cbmV4cG9ydCB0eXBlIFRVc2VyRXJyb3JzID1cbiAgICB7XG4gICAgICAgIGNvZGU6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICB1c2VyTWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBzdWdnZXN0aW9ucz86IEFycmF5PHN0cmluZz5cbiAgICAgICAgaW50ZXJuYWxTdWdnZXN0aW9ucz86IEFycmF5PHN0cmluZz5cbiAgICAgICAgYWN0aW9ucz86IEFycmF5PHN0cmluZz5cbiAgICB9XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlRmV0Y2g8VD4oYXBpOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBkYXRhOiBhbnkpOiBQcm9taXNlPFRFeGVjdXRlRmV0Y2hSZXNwb25zZT4ge1xuICAgIGxldCByZXRWYWx1ZTogVEV4ZWN1dGVGZXRjaFJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiB1bmRlZmluZWQsXG4gICAgICAgIHJlc3BvbnNlOiB1bmRlZmluZWQsXG4gICAgICAgIGluZm86IHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IFtdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdXJsID0gdmFsaWRhdGVBcGkoYXBpKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gYnVpbGRIZWFkZXJzKCk7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBmZXRjaEhlYWRlcnMsXG4gICAgICAgIGJvZHk6IGRhdGEgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IHVuZGVmaW5lZFxuICAgIH1cbiAgICApLnRoZW4oYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldFZhbHVlLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIGlmIChyZXNwb25zZS5vayA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgY29kZTogXCJBUElfRVJST1JcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJLiBzdGF0dXNUZXh0OiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCxcbiAgICAgICAgICAgICAgICB1c2VyTWVzc2FnZTogXCJBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBjYWxsIHRoZSBBUEkuXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIC8vY2hlY2sgaWYgcmVzcG9uc2UgaXMgSlNPTlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpPy5pbmNsdWRlcyhcImFwcGxpY2F0aW9uL2pzb25cIikpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldFZhbHVlLmluZm8uc3VjY2VzcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGU6IGFueSkge1xuICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2RlOiBcIkFQSV9FUlJPUlwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBleHRyYWN0IHRoZSBkYXRhIGZyb20gdGhlIEFQSS4gTWVzc2FnZTogJHtlPy5tZXNzYWdlIHx8IFwiVW5rbm93blwifWAsXG4gICAgICAgICAgICAgICAgdXNlck1lc3NhZ2U6IGBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBleHRyYWN0IHRoZSBkYXRhIGZyb20gdGhlIEFQSS5gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkYXRhLCByZXNwb25zZSB9O1xuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsKGVycihgRXJyb3IgZnJvbSBBUEkgQ2FsbCAke3VybH1gKSwgZXJyb3IpO1xuXG4gICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IucHVzaCh7XG4gICAgICAgICAgICBjb2RlOiBcIkFQSV9FUlJPUlwiLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgIHVzZXJNZXNzYWdlOiBlcnJvci5tZXNzYWdlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7IGRhdGE6IHVuZGVmaW5lZCwgcmVzcG9uc2U6IHVuZGVmaW5lZCB9O1xuICAgIH0pXG5cbiAgICBsaDEoYFJlc3BvbnNlIGZyb20gJHt1cmx9YCk7XG4gICAgbChyZXNwb25zZSk7XG5cbiAgICByZXRWYWx1ZS5kYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgIGlmKHJldFZhbHVlLmluZm8uZXJyb3IubGVuZ3RoID4gMCl7XG4gICAgICAgIHJldFZhbHVlLmluZm8uc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICBsKGVycihgRXJyb3IgZnJvbSBBUEkgQ2FsbCAke3VybH1gKSwgZSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2VjQmFja09uZSgpO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xufVxuXG5mdW5jdGlvbiBidWlsZEhlYWRlcnMoKSB7XG4gICAgbGV0IGJlYXJlciA9IGdldEJlYXJlclRva2VuKCk7XG4gICAgbGV0IGZldGNoSGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgZmV0Y2hIZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgaWYgKGJlYXJlcikge1xuICAgICAgICBmZXRjaEhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBiZWFyZXIpO1xuICAgIH1cbiAgICByZXR1cm4gZmV0Y2hIZWFkZXJzO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29raWVzKCk6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0ge1xuICAgIGxldCByZXRWYWx1ZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICAgIGxldCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKS5yZWR1Y2UoZnVuY3Rpb24gKGNvb2tpZXMsIGNvb2tpZSkge1xuICAgICAgICB2YXIgcGFydHMgPSBjb29raWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gcGFydHNbMF0udHJpbSgpO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gcGFydHNbMV07XG5cbiAgICAgICAgICAgIHJldFZhbHVlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29va2llcztcbiAgICB9LCB7fSk7XG5cbiAgICByZXR1cm4gcmV0VmFsdWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmVhcmVyVG9rZW4oKSB7XG4gICAgdmFyIGNvb2tpZXMgPSBnZXRDb29raWVzKCk7XG4gICAgdmFyIHRva2VuID0gY29va2llc1tcIl9hcGlcIl07XG5cbiAgICBpZiAodG9rZW4pIHJldHVybiBcIkJlYXJlciBcIiArIHRva2VuO1xuICAgIHJldHVybiBudWxsO1xufTsiLCJcbmltcG9ydCB7IElPRFNTZWFyY2hQb3N0Qm9keSB9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL2FwaS9vZHMvX3NlYXJjaFwiO1xuaW1wb3J0IHsgSU9EU2VhcmNoUmVzdWx0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvT2RzTGlzdC9JT0RTU2VhcmNoUmVzdWx0XCI7XG5pbXBvcnQgeyBleGVjdXRlUG9zdCB9IGZyb20gXCIuLi9hcGlcIjtcblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gX3NlYXJjaDxUPihwb3N0Qm9keTpJT0RTU2VhcmNoUG9zdEJvZHkpIDogUHJvbWlzZTxJT0RTZWFyY2hSZXN1bHQ8VD4gfCB1bmRlZmluZWQ+XG57XG4gICAgdHJ5XG4gICAge1xuICAgICAgICBsZXQgYXBpID0gXCIvYXBpL29kcy9fc2VhcmNoXCI7XG4gICAgICAgIHJldHVybiBhd2FpdCBleGVjdXRlUG9zdDxJT0RTZWFyY2hSZXN1bHQ8VD4+KHdpbmRvdy5kb2N1bWVudC5sb2NhdGlvbi5vcmlnaW4gKyBhcGksIHBvc3RCb2R5KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpXG4gICAge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJPRFMgU2VhcmNoIEVycm9yXCIsIGUscG9zdEJvZHkpO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4iLCJpbXBvcnQgYW5zaVN0eWxlcyBmcm9tICcjYW5zaS1zdHlsZXMnO1xuaW1wb3J0IHN1cHBvcnRzQ29sb3IgZnJvbSAnI3N1cHBvcnRzLWNvbG9yJztcbmltcG9ydCB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L29yZGVyXG5cdHN0cmluZ1JlcGxhY2VBbGwsXG5cdHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleCxcbn0gZnJvbSAnLi91dGlsaXRpZXMuanMnO1xuXG5jb25zdCB7c3Rkb3V0OiBzdGRvdXRDb2xvciwgc3RkZXJyOiBzdGRlcnJDb2xvcn0gPSBzdXBwb3J0c0NvbG9yO1xuXG5jb25zdCBHRU5FUkFUT1IgPSBTeW1ib2woJ0dFTkVSQVRPUicpO1xuY29uc3QgU1RZTEVSID0gU3ltYm9sKCdTVFlMRVInKTtcbmNvbnN0IElTX0VNUFRZID0gU3ltYm9sKCdJU19FTVBUWScpO1xuXG4vLyBgc3VwcG9ydHNDb2xvci5sZXZlbGAg4oaSIGBhbnNpU3R5bGVzLmNvbG9yW25hbWVdYCBtYXBwaW5nXG5jb25zdCBsZXZlbE1hcHBpbmcgPSBbXG5cdCdhbnNpJyxcblx0J2Fuc2knLFxuXHQnYW5zaTI1NicsXG5cdCdhbnNpMTZtJyxcbl07XG5cbmNvbnN0IHN0eWxlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbmNvbnN0IGFwcGx5T3B0aW9ucyA9IChvYmplY3QsIG9wdGlvbnMgPSB7fSkgPT4ge1xuXHRpZiAob3B0aW9ucy5sZXZlbCAmJiAhKE51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sZXZlbCkgJiYgb3B0aW9ucy5sZXZlbCA+PSAwICYmIG9wdGlvbnMubGV2ZWwgPD0gMykpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgbGV2ZWxgIG9wdGlvbiBzaG91bGQgYmUgYW4gaW50ZWdlciBmcm9tIDAgdG8gMycpO1xuXHR9XG5cblx0Ly8gRGV0ZWN0IGxldmVsIGlmIG5vdCBzZXQgbWFudWFsbHlcblx0Y29uc3QgY29sb3JMZXZlbCA9IHN0ZG91dENvbG9yID8gc3Rkb3V0Q29sb3IubGV2ZWwgOiAwO1xuXHRvYmplY3QubGV2ZWwgPSBvcHRpb25zLmxldmVsID09PSB1bmRlZmluZWQgPyBjb2xvckxldmVsIDogb3B0aW9ucy5sZXZlbDtcbn07XG5cbmV4cG9ydCBjbGFzcyBDaGFsayB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RydWN0b3ItcmV0dXJuXG5cdFx0cmV0dXJuIGNoYWxrRmFjdG9yeShvcHRpb25zKTtcblx0fVxufVxuXG5jb25zdCBjaGFsa0ZhY3RvcnkgPSBvcHRpb25zID0+IHtcblx0Y29uc3QgY2hhbGsgPSAoLi4uc3RyaW5ncykgPT4gc3RyaW5ncy5qb2luKCcgJyk7XG5cdGFwcGx5T3B0aW9ucyhjaGFsaywgb3B0aW9ucyk7XG5cblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKGNoYWxrLCBjcmVhdGVDaGFsay5wcm90b3R5cGUpO1xuXG5cdHJldHVybiBjaGFsaztcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoYWxrKG9wdGlvbnMpIHtcblx0cmV0dXJuIGNoYWxrRmFjdG9yeShvcHRpb25zKTtcbn1cblxuT2JqZWN0LnNldFByb3RvdHlwZU9mKGNyZWF0ZUNoYWxrLnByb3RvdHlwZSwgRnVuY3Rpb24ucHJvdG90eXBlKTtcblxuZm9yIChjb25zdCBbc3R5bGVOYW1lLCBzdHlsZV0gb2YgT2JqZWN0LmVudHJpZXMoYW5zaVN0eWxlcykpIHtcblx0c3R5bGVzW3N0eWxlTmFtZV0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIodGhpcywgY3JlYXRlU3R5bGVyKHN0eWxlLm9wZW4sIHN0eWxlLmNsb3NlLCB0aGlzW1NUWUxFUl0pLCB0aGlzW0lTX0VNUFRZXSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgc3R5bGVOYW1lLCB7dmFsdWU6IGJ1aWxkZXJ9KTtcblx0XHRcdHJldHVybiBidWlsZGVyO1xuXHRcdH0sXG5cdH07XG59XG5cbnN0eWxlcy52aXNpYmxlID0ge1xuXHRnZXQoKSB7XG5cdFx0Y29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIodGhpcywgdGhpc1tTVFlMRVJdLCB0cnVlKTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Zpc2libGUnLCB7dmFsdWU6IGJ1aWxkZXJ9KTtcblx0XHRyZXR1cm4gYnVpbGRlcjtcblx0fSxcbn07XG5cbmNvbnN0IGdldE1vZGVsQW5zaSA9IChtb2RlbCwgbGV2ZWwsIHR5cGUsIC4uLmFyZ3VtZW50c18pID0+IHtcblx0aWYgKG1vZGVsID09PSAncmdiJykge1xuXHRcdGlmIChsZXZlbCA9PT0gJ2Fuc2kxNm0nKSB7XG5cdFx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpMTZtKC4uLmFyZ3VtZW50c18pO1xuXHRcdH1cblxuXHRcdGlmIChsZXZlbCA9PT0gJ2Fuc2kyNTYnKSB7XG5cdFx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpMjU2KGFuc2lTdHlsZXMucmdiVG9BbnNpMjU2KC4uLmFyZ3VtZW50c18pKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpKGFuc2lTdHlsZXMucmdiVG9BbnNpKC4uLmFyZ3VtZW50c18pKTtcblx0fVxuXG5cdGlmIChtb2RlbCA9PT0gJ2hleCcpIHtcblx0XHRyZXR1cm4gZ2V0TW9kZWxBbnNpKCdyZ2InLCBsZXZlbCwgdHlwZSwgLi4uYW5zaVN0eWxlcy5oZXhUb1JnYiguLi5hcmd1bWVudHNfKSk7XG5cdH1cblxuXHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXVttb2RlbF0oLi4uYXJndW1lbnRzXyk7XG59O1xuXG5jb25zdCB1c2VkTW9kZWxzID0gWydyZ2InLCAnaGV4JywgJ2Fuc2kyNTYnXTtcblxuZm9yIChjb25zdCBtb2RlbCBvZiB1c2VkTW9kZWxzKSB7XG5cdHN0eWxlc1ttb2RlbF0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3Qge2xldmVsfSA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVyID0gY3JlYXRlU3R5bGVyKGdldE1vZGVsQW5zaShtb2RlbCwgbGV2ZWxNYXBwaW5nW2xldmVsXSwgJ2NvbG9yJywgLi4uYXJndW1lbnRzXyksIGFuc2lTdHlsZXMuY29sb3IuY2xvc2UsIHRoaXNbU1RZTEVSXSk7XG5cdFx0XHRcdHJldHVybiBjcmVhdGVCdWlsZGVyKHRoaXMsIHN0eWxlciwgdGhpc1tJU19FTVBUWV0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXHR9O1xuXG5cdGNvbnN0IGJnTW9kZWwgPSAnYmcnICsgbW9kZWxbMF0udG9VcHBlckNhc2UoKSArIG1vZGVsLnNsaWNlKDEpO1xuXHRzdHlsZXNbYmdNb2RlbF0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3Qge2xldmVsfSA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVyID0gY3JlYXRlU3R5bGVyKGdldE1vZGVsQW5zaShtb2RlbCwgbGV2ZWxNYXBwaW5nW2xldmVsXSwgJ2JnQ29sb3InLCAuLi5hcmd1bWVudHNfKSwgYW5zaVN0eWxlcy5iZ0NvbG9yLmNsb3NlLCB0aGlzW1NUWUxFUl0pO1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlQnVpbGRlcih0aGlzLCBzdHlsZXIsIHRoaXNbSVNfRU1QVFldKTtcblx0XHRcdH07XG5cdFx0fSxcblx0fTtcbn1cblxuY29uc3QgcHJvdG8gPSBPYmplY3QuZGVmaW5lUHJvcGVydGllcygoKSA9PiB7fSwge1xuXHQuLi5zdHlsZXMsXG5cdGxldmVsOiB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tHRU5FUkFUT1JdLmxldmVsO1xuXHRcdH0sXG5cdFx0c2V0KGxldmVsKSB7XG5cdFx0XHR0aGlzW0dFTkVSQVRPUl0ubGV2ZWwgPSBsZXZlbDtcblx0XHR9LFxuXHR9LFxufSk7XG5cbmNvbnN0IGNyZWF0ZVN0eWxlciA9IChvcGVuLCBjbG9zZSwgcGFyZW50KSA9PiB7XG5cdGxldCBvcGVuQWxsO1xuXHRsZXQgY2xvc2VBbGw7XG5cdGlmIChwYXJlbnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wZW5BbGwgPSBvcGVuO1xuXHRcdGNsb3NlQWxsID0gY2xvc2U7XG5cdH0gZWxzZSB7XG5cdFx0b3BlbkFsbCA9IHBhcmVudC5vcGVuQWxsICsgb3Blbjtcblx0XHRjbG9zZUFsbCA9IGNsb3NlICsgcGFyZW50LmNsb3NlQWxsO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRvcGVuLFxuXHRcdGNsb3NlLFxuXHRcdG9wZW5BbGwsXG5cdFx0Y2xvc2VBbGwsXG5cdFx0cGFyZW50LFxuXHR9O1xufTtcblxuY29uc3QgY3JlYXRlQnVpbGRlciA9IChzZWxmLCBfc3R5bGVyLCBfaXNFbXB0eSkgPT4ge1xuXHQvLyBTaW5nbGUgYXJndW1lbnQgaXMgaG90IHBhdGgsIGltcGxpY2l0IGNvZXJjaW9uIGlzIGZhc3RlciB0aGFuIGFueXRoaW5nXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1pbXBsaWNpdC1jb2VyY2lvblxuXHRjb25zdCBidWlsZGVyID0gKC4uLmFyZ3VtZW50c18pID0+IGFwcGx5U3R5bGUoYnVpbGRlciwgKGFyZ3VtZW50c18ubGVuZ3RoID09PSAxKSA/ICgnJyArIGFyZ3VtZW50c19bMF0pIDogYXJndW1lbnRzXy5qb2luKCcgJykpO1xuXG5cdC8vIFdlIGFsdGVyIHRoZSBwcm90b3R5cGUgYmVjYXVzZSB3ZSBtdXN0IHJldHVybiBhIGZ1bmN0aW9uLCBidXQgdGhlcmUgaXNcblx0Ly8gbm8gd2F5IHRvIGNyZWF0ZSBhIGZ1bmN0aW9uIHdpdGggYSBkaWZmZXJlbnQgcHJvdG90eXBlXG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZihidWlsZGVyLCBwcm90byk7XG5cblx0YnVpbGRlcltHRU5FUkFUT1JdID0gc2VsZjtcblx0YnVpbGRlcltTVFlMRVJdID0gX3N0eWxlcjtcblx0YnVpbGRlcltJU19FTVBUWV0gPSBfaXNFbXB0eTtcblxuXHRyZXR1cm4gYnVpbGRlcjtcbn07XG5cbmNvbnN0IGFwcGx5U3R5bGUgPSAoc2VsZiwgc3RyaW5nKSA9PiB7XG5cdGlmIChzZWxmLmxldmVsIDw9IDAgfHwgIXN0cmluZykge1xuXHRcdHJldHVybiBzZWxmW0lTX0VNUFRZXSA/ICcnIDogc3RyaW5nO1xuXHR9XG5cblx0bGV0IHN0eWxlciA9IHNlbGZbU1RZTEVSXTtcblxuXHRpZiAoc3R5bGVyID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gc3RyaW5nO1xuXHR9XG5cblx0Y29uc3Qge29wZW5BbGwsIGNsb3NlQWxsfSA9IHN0eWxlcjtcblx0aWYgKHN0cmluZy5pbmNsdWRlcygnXFx1MDAxQicpKSB7XG5cdFx0d2hpbGUgKHN0eWxlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyBSZXBsYWNlIGFueSBpbnN0YW5jZXMgYWxyZWFkeSBwcmVzZW50IHdpdGggYSByZS1vcGVuaW5nIGNvZGVcblx0XHRcdC8vIG90aGVyd2lzZSBvbmx5IHRoZSBwYXJ0IG9mIHRoZSBzdHJpbmcgdW50aWwgc2FpZCBjbG9zaW5nIGNvZGVcblx0XHRcdC8vIHdpbGwgYmUgY29sb3JlZCwgYW5kIHRoZSByZXN0IHdpbGwgc2ltcGx5IGJlICdwbGFpbicuXG5cdFx0XHRzdHJpbmcgPSBzdHJpbmdSZXBsYWNlQWxsKHN0cmluZywgc3R5bGVyLmNsb3NlLCBzdHlsZXIub3Blbik7XG5cblx0XHRcdHN0eWxlciA9IHN0eWxlci5wYXJlbnQ7XG5cdFx0fVxuXHR9XG5cblx0Ly8gV2UgY2FuIG1vdmUgYm90aCBuZXh0IGFjdGlvbnMgb3V0IG9mIGxvb3AsIGJlY2F1c2UgcmVtYWluaW5nIGFjdGlvbnMgaW4gbG9vcCB3b24ndCBoYXZlXG5cdC8vIGFueS92aXNpYmxlIGVmZmVjdCBvbiBwYXJ0cyB3ZSBhZGQgaGVyZS4gQ2xvc2UgdGhlIHN0eWxpbmcgYmVmb3JlIGEgbGluZWJyZWFrIGFuZCByZW9wZW5cblx0Ly8gYWZ0ZXIgbmV4dCBsaW5lIHRvIGZpeCBhIGJsZWVkIGlzc3VlIG9uIG1hY09TOiBodHRwczovL2dpdGh1Yi5jb20vY2hhbGsvY2hhbGsvcHVsbC85MlxuXHRjb25zdCBsZkluZGV4ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicpO1xuXHRpZiAobGZJbmRleCAhPT0gLTEpIHtcblx0XHRzdHJpbmcgPSBzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgoc3RyaW5nLCBjbG9zZUFsbCwgb3BlbkFsbCwgbGZJbmRleCk7XG5cdH1cblxuXHRyZXR1cm4gb3BlbkFsbCArIHN0cmluZyArIGNsb3NlQWxsO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY3JlYXRlQ2hhbGsucHJvdG90eXBlLCBzdHlsZXMpO1xuXG5jb25zdCBjaGFsayA9IGNyZWF0ZUNoYWxrKCk7XG5leHBvcnQgY29uc3QgY2hhbGtTdGRlcnIgPSBjcmVhdGVDaGFsayh7bGV2ZWw6IHN0ZGVyckNvbG9yID8gc3RkZXJyQ29sb3IubGV2ZWwgOiAwfSk7XG5cbmV4cG9ydCB7XG5cdG1vZGlmaWVyTmFtZXMsXG5cdGZvcmVncm91bmRDb2xvck5hbWVzLFxuXHRiYWNrZ3JvdW5kQ29sb3JOYW1lcyxcblx0Y29sb3JOYW1lcyxcblxuXHQvLyBUT0RPOiBSZW1vdmUgdGhlc2UgYWxpYXNlcyBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uXG5cdG1vZGlmaWVyTmFtZXMgYXMgbW9kaWZpZXJzLFxuXHRmb3JlZ3JvdW5kQ29sb3JOYW1lcyBhcyBmb3JlZ3JvdW5kQ29sb3JzLFxuXHRiYWNrZ3JvdW5kQ29sb3JOYW1lcyBhcyBiYWNrZ3JvdW5kQ29sb3JzLFxuXHRjb2xvck5hbWVzIGFzIGNvbG9ycyxcbn0gZnJvbSAnLi92ZW5kb3IvYW5zaS1zdHlsZXMvaW5kZXguanMnO1xuXG5leHBvcnQge1xuXHRzdGRvdXRDb2xvciBhcyBzdXBwb3J0c0NvbG9yLFxuXHRzdGRlcnJDb2xvciBhcyBzdXBwb3J0c0NvbG9yU3RkZXJyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2hhbGs7XG4iLCIvLyBUT0RPOiBXaGVuIHRhcmdldGluZyBOb2RlLmpzIDE2LCB1c2UgYFN0cmluZy5wcm90b3R5cGUucmVwbGFjZUFsbGAuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nUmVwbGFjZUFsbChzdHJpbmcsIHN1YnN0cmluZywgcmVwbGFjZXIpIHtcblx0bGV0IGluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc3Vic3RyaW5nKTtcblx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdHJldHVybiBzdHJpbmc7XG5cdH1cblxuXHRjb25zdCBzdWJzdHJpbmdMZW5ndGggPSBzdWJzdHJpbmcubGVuZ3RoO1xuXHRsZXQgZW5kSW5kZXggPSAwO1xuXHRsZXQgcmV0dXJuVmFsdWUgPSAnJztcblx0ZG8ge1xuXHRcdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCwgaW5kZXgpICsgc3Vic3RyaW5nICsgcmVwbGFjZXI7XG5cdFx0ZW5kSW5kZXggPSBpbmRleCArIHN1YnN0cmluZ0xlbmd0aDtcblx0XHRpbmRleCA9IHN0cmluZy5pbmRleE9mKHN1YnN0cmluZywgZW5kSW5kZXgpO1xuXHR9IHdoaWxlIChpbmRleCAhPT0gLTEpO1xuXG5cdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCk7XG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleChzdHJpbmcsIHByZWZpeCwgcG9zdGZpeCwgaW5kZXgpIHtcblx0bGV0IGVuZEluZGV4ID0gMDtcblx0bGV0IHJldHVyblZhbHVlID0gJyc7XG5cdGRvIHtcblx0XHRjb25zdCBnb3RDUiA9IHN0cmluZ1tpbmRleCAtIDFdID09PSAnXFxyJztcblx0XHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgsIChnb3RDUiA/IGluZGV4IC0gMSA6IGluZGV4KSkgKyBwcmVmaXggKyAoZ290Q1IgPyAnXFxyXFxuJyA6ICdcXG4nKSArIHBvc3RmaXg7XG5cdFx0ZW5kSW5kZXggPSBpbmRleCArIDE7XG5cdFx0aW5kZXggPSBzdHJpbmcuaW5kZXhPZignXFxuJywgZW5kSW5kZXgpO1xuXHR9IHdoaWxlIChpbmRleCAhPT0gLTEpO1xuXG5cdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCk7XG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn1cbiIsImNvbnN0IEFOU0lfQkFDS0dST1VORF9PRkZTRVQgPSAxMDtcblxuY29uc3Qgd3JhcEFuc2kxNiA9IChvZmZzZXQgPSAwKSA9PiBjb2RlID0+IGBcXHUwMDFCWyR7Y29kZSArIG9mZnNldH1tYDtcblxuY29uc3Qgd3JhcEFuc2kyNTYgPSAob2Zmc2V0ID0gMCkgPT4gY29kZSA9PiBgXFx1MDAxQlskezM4ICsgb2Zmc2V0fTs1OyR7Y29kZX1tYDtcblxuY29uc3Qgd3JhcEFuc2kxNm0gPSAob2Zmc2V0ID0gMCkgPT4gKHJlZCwgZ3JlZW4sIGJsdWUpID0+IGBcXHUwMDFCWyR7MzggKyBvZmZzZXR9OzI7JHtyZWR9OyR7Z3JlZW59OyR7Ymx1ZX1tYDtcblxuY29uc3Qgc3R5bGVzID0ge1xuXHRtb2RpZmllcjoge1xuXHRcdHJlc2V0OiBbMCwgMF0sXG5cdFx0Ly8gMjEgaXNuJ3Qgd2lkZWx5IHN1cHBvcnRlZCBhbmQgMjIgZG9lcyB0aGUgc2FtZSB0aGluZ1xuXHRcdGJvbGQ6IFsxLCAyMl0sXG5cdFx0ZGltOiBbMiwgMjJdLFxuXHRcdGl0YWxpYzogWzMsIDIzXSxcblx0XHR1bmRlcmxpbmU6IFs0LCAyNF0sXG5cdFx0b3ZlcmxpbmU6IFs1MywgNTVdLFxuXHRcdGludmVyc2U6IFs3LCAyN10sXG5cdFx0aGlkZGVuOiBbOCwgMjhdLFxuXHRcdHN0cmlrZXRocm91Z2g6IFs5LCAyOV0sXG5cdH0sXG5cdGNvbG9yOiB7XG5cdFx0YmxhY2s6IFszMCwgMzldLFxuXHRcdHJlZDogWzMxLCAzOV0sXG5cdFx0Z3JlZW46IFszMiwgMzldLFxuXHRcdHllbGxvdzogWzMzLCAzOV0sXG5cdFx0Ymx1ZTogWzM0LCAzOV0sXG5cdFx0bWFnZW50YTogWzM1LCAzOV0sXG5cdFx0Y3lhbjogWzM2LCAzOV0sXG5cdFx0d2hpdGU6IFszNywgMzldLFxuXG5cdFx0Ly8gQnJpZ2h0IGNvbG9yXG5cdFx0YmxhY2tCcmlnaHQ6IFs5MCwgMzldLFxuXHRcdGdyYXk6IFs5MCwgMzldLCAvLyBBbGlhcyBvZiBgYmxhY2tCcmlnaHRgXG5cdFx0Z3JleTogWzkwLCAzOV0sIC8vIEFsaWFzIG9mIGBibGFja0JyaWdodGBcblx0XHRyZWRCcmlnaHQ6IFs5MSwgMzldLFxuXHRcdGdyZWVuQnJpZ2h0OiBbOTIsIDM5XSxcblx0XHR5ZWxsb3dCcmlnaHQ6IFs5MywgMzldLFxuXHRcdGJsdWVCcmlnaHQ6IFs5NCwgMzldLFxuXHRcdG1hZ2VudGFCcmlnaHQ6IFs5NSwgMzldLFxuXHRcdGN5YW5CcmlnaHQ6IFs5NiwgMzldLFxuXHRcdHdoaXRlQnJpZ2h0OiBbOTcsIDM5XSxcblx0fSxcblx0YmdDb2xvcjoge1xuXHRcdGJnQmxhY2s6IFs0MCwgNDldLFxuXHRcdGJnUmVkOiBbNDEsIDQ5XSxcblx0XHRiZ0dyZWVuOiBbNDIsIDQ5XSxcblx0XHRiZ1llbGxvdzogWzQzLCA0OV0sXG5cdFx0YmdCbHVlOiBbNDQsIDQ5XSxcblx0XHRiZ01hZ2VudGE6IFs0NSwgNDldLFxuXHRcdGJnQ3lhbjogWzQ2LCA0OV0sXG5cdFx0YmdXaGl0ZTogWzQ3LCA0OV0sXG5cblx0XHQvLyBCcmlnaHQgY29sb3Jcblx0XHRiZ0JsYWNrQnJpZ2h0OiBbMTAwLCA0OV0sXG5cdFx0YmdHcmF5OiBbMTAwLCA0OV0sIC8vIEFsaWFzIG9mIGBiZ0JsYWNrQnJpZ2h0YFxuXHRcdGJnR3JleTogWzEwMCwgNDldLCAvLyBBbGlhcyBvZiBgYmdCbGFja0JyaWdodGBcblx0XHRiZ1JlZEJyaWdodDogWzEwMSwgNDldLFxuXHRcdGJnR3JlZW5CcmlnaHQ6IFsxMDIsIDQ5XSxcblx0XHRiZ1llbGxvd0JyaWdodDogWzEwMywgNDldLFxuXHRcdGJnQmx1ZUJyaWdodDogWzEwNCwgNDldLFxuXHRcdGJnTWFnZW50YUJyaWdodDogWzEwNSwgNDldLFxuXHRcdGJnQ3lhbkJyaWdodDogWzEwNiwgNDldLFxuXHRcdGJnV2hpdGVCcmlnaHQ6IFsxMDcsIDQ5XSxcblx0fSxcbn07XG5cbmV4cG9ydCBjb25zdCBtb2RpZmllck5hbWVzID0gT2JqZWN0LmtleXMoc3R5bGVzLm1vZGlmaWVyKTtcbmV4cG9ydCBjb25zdCBmb3JlZ3JvdW5kQ29sb3JOYW1lcyA9IE9iamVjdC5rZXlzKHN0eWxlcy5jb2xvcik7XG5leHBvcnQgY29uc3QgYmFja2dyb3VuZENvbG9yTmFtZXMgPSBPYmplY3Qua2V5cyhzdHlsZXMuYmdDb2xvcik7XG5leHBvcnQgY29uc3QgY29sb3JOYW1lcyA9IFsuLi5mb3JlZ3JvdW5kQ29sb3JOYW1lcywgLi4uYmFja2dyb3VuZENvbG9yTmFtZXNdO1xuXG5mdW5jdGlvbiBhc3NlbWJsZVN0eWxlcygpIHtcblx0Y29uc3QgY29kZXMgPSBuZXcgTWFwKCk7XG5cblx0Zm9yIChjb25zdCBbZ3JvdXBOYW1lLCBncm91cF0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVzKSkge1xuXHRcdGZvciAoY29uc3QgW3N0eWxlTmFtZSwgc3R5bGVdIG9mIE9iamVjdC5lbnRyaWVzKGdyb3VwKSkge1xuXHRcdFx0c3R5bGVzW3N0eWxlTmFtZV0gPSB7XG5cdFx0XHRcdG9wZW46IGBcXHUwMDFCWyR7c3R5bGVbMF19bWAsXG5cdFx0XHRcdGNsb3NlOiBgXFx1MDAxQlske3N0eWxlWzFdfW1gLFxuXHRcdFx0fTtcblxuXHRcdFx0Z3JvdXBbc3R5bGVOYW1lXSA9IHN0eWxlc1tzdHlsZU5hbWVdO1xuXG5cdFx0XHRjb2Rlcy5zZXQoc3R5bGVbMF0sIHN0eWxlWzFdKTtcblx0XHR9XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoc3R5bGVzLCBncm91cE5hbWUsIHtcblx0XHRcdHZhbHVlOiBncm91cCxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0pO1xuXHR9XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgJ2NvZGVzJywge1xuXHRcdHZhbHVlOiBjb2Rlcyxcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0fSk7XG5cblx0c3R5bGVzLmNvbG9yLmNsb3NlID0gJ1xcdTAwMUJbMzltJztcblx0c3R5bGVzLmJnQ29sb3IuY2xvc2UgPSAnXFx1MDAxQls0OW0nO1xuXG5cdHN0eWxlcy5jb2xvci5hbnNpID0gd3JhcEFuc2kxNigpO1xuXHRzdHlsZXMuY29sb3IuYW5zaTI1NiA9IHdyYXBBbnNpMjU2KCk7XG5cdHN0eWxlcy5jb2xvci5hbnNpMTZtID0gd3JhcEFuc2kxNm0oKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaSA9IHdyYXBBbnNpMTYoQU5TSV9CQUNLR1JPVU5EX09GRlNFVCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kyNTYgPSB3cmFwQW5zaTI1NihBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaTE2bSA9IHdyYXBBbnNpMTZtKEFOU0lfQkFDS0dST1VORF9PRkZTRVQpO1xuXG5cdC8vIEZyb20gaHR0cHM6Ly9naXRodWIuY29tL1FpeC0vY29sb3ItY29udmVydC9ibG9iLzNmMGUwZDRlOTJlMjM1Nzk2Y2NiMTdmNmU4NWM3MjA5NGE2NTFmNDkvY29udmVyc2lvbnMuanNcblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc3R5bGVzLCB7XG5cdFx0cmdiVG9BbnNpMjU2OiB7XG5cdFx0XHR2YWx1ZShyZWQsIGdyZWVuLCBibHVlKSB7XG5cdFx0XHRcdC8vIFdlIHVzZSB0aGUgZXh0ZW5kZWQgZ3JleXNjYWxlIHBhbGV0dGUgaGVyZSwgd2l0aCB0aGUgZXhjZXB0aW9uIG9mXG5cdFx0XHRcdC8vIGJsYWNrIGFuZCB3aGl0ZS4gbm9ybWFsIHBhbGV0dGUgb25seSBoYXMgNCBncmV5c2NhbGUgc2hhZGVzLlxuXHRcdFx0XHRpZiAocmVkID09PSBncmVlbiAmJiBncmVlbiA9PT0gYmx1ZSkge1xuXHRcdFx0XHRcdGlmIChyZWQgPCA4KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMTY7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHJlZCA+IDI0OCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDIzMTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCgoKHJlZCAtIDgpIC8gMjQ3KSAqIDI0KSArIDIzMjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAxNlxuXHRcdFx0XHRcdCsgKDM2ICogTWF0aC5yb3VuZChyZWQgLyAyNTUgKiA1KSlcblx0XHRcdFx0XHQrICg2ICogTWF0aC5yb3VuZChncmVlbiAvIDI1NSAqIDUpKVxuXHRcdFx0XHRcdCsgTWF0aC5yb3VuZChibHVlIC8gMjU1ICogNSk7XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRoZXhUb1JnYjoge1xuXHRcdFx0dmFsdWUoaGV4KSB7XG5cdFx0XHRcdGNvbnN0IG1hdGNoZXMgPSAvW2EtZlxcZF17Nn18W2EtZlxcZF17M30vaS5leGVjKGhleC50b1N0cmluZygxNikpO1xuXHRcdFx0XHRpZiAoIW1hdGNoZXMpIHtcblx0XHRcdFx0XHRyZXR1cm4gWzAsIDAsIDBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IFtjb2xvclN0cmluZ10gPSBtYXRjaGVzO1xuXG5cdFx0XHRcdGlmIChjb2xvclN0cmluZy5sZW5ndGggPT09IDMpIHtcblx0XHRcdFx0XHRjb2xvclN0cmluZyA9IFsuLi5jb2xvclN0cmluZ10ubWFwKGNoYXJhY3RlciA9PiBjaGFyYWN0ZXIgKyBjaGFyYWN0ZXIpLmpvaW4oJycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgaW50ZWdlciA9IE51bWJlci5wYXJzZUludChjb2xvclN0cmluZywgMTYpO1xuXG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXHRcdFx0XHRcdChpbnRlZ2VyID4+IDE2KSAmIDB4RkYsXG5cdFx0XHRcdFx0KGludGVnZXIgPj4gOCkgJiAweEZGLFxuXHRcdFx0XHRcdGludGVnZXIgJiAweEZGLFxuXHRcdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tYml0d2lzZSAqL1xuXHRcdFx0XHRdO1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0aGV4VG9BbnNpMjU2OiB7XG5cdFx0XHR2YWx1ZTogaGV4ID0+IHN0eWxlcy5yZ2JUb0Fuc2kyNTYoLi4uc3R5bGVzLmhleFRvUmdiKGhleCkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRhbnNpMjU2VG9BbnNpOiB7XG5cdFx0XHR2YWx1ZShjb2RlKSB7XG5cdFx0XHRcdGlmIChjb2RlIDwgOCkge1xuXHRcdFx0XHRcdHJldHVybiAzMCArIGNvZGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY29kZSA8IDE2KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDkwICsgKGNvZGUgLSA4KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCByZWQ7XG5cdFx0XHRcdGxldCBncmVlbjtcblx0XHRcdFx0bGV0IGJsdWU7XG5cblx0XHRcdFx0aWYgKGNvZGUgPj0gMjMyKSB7XG5cdFx0XHRcdFx0cmVkID0gKCgoY29kZSAtIDIzMikgKiAxMCkgKyA4KSAvIDI1NTtcblx0XHRcdFx0XHRncmVlbiA9IHJlZDtcblx0XHRcdFx0XHRibHVlID0gcmVkO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvZGUgLT0gMTY7XG5cblx0XHRcdFx0XHRjb25zdCByZW1haW5kZXIgPSBjb2RlICUgMzY7XG5cblx0XHRcdFx0XHRyZWQgPSBNYXRoLmZsb29yKGNvZGUgLyAzNikgLyA1O1xuXHRcdFx0XHRcdGdyZWVuID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA2KSAvIDU7XG5cdFx0XHRcdFx0Ymx1ZSA9IChyZW1haW5kZXIgJSA2KSAvIDU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCB2YWx1ZSA9IE1hdGgubWF4KHJlZCwgZ3JlZW4sIGJsdWUpICogMjtcblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gMzA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHRsZXQgcmVzdWx0ID0gMzAgKyAoKE1hdGgucm91bmQoYmx1ZSkgPDwgMikgfCAoTWF0aC5yb3VuZChncmVlbikgPDwgMSkgfCBNYXRoLnJvdW5kKHJlZCkpO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gMikge1xuXHRcdFx0XHRcdHJlc3VsdCArPSA2MDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRyZ2JUb0Fuc2k6IHtcblx0XHRcdHZhbHVlOiAocmVkLCBncmVlbiwgYmx1ZSkgPT4gc3R5bGVzLmFuc2kyNTZUb0Fuc2koc3R5bGVzLnJnYlRvQW5zaTI1NihyZWQsIGdyZWVuLCBibHVlKSksXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGhleFRvQW5zaToge1xuXHRcdFx0dmFsdWU6IGhleCA9PiBzdHlsZXMuYW5zaTI1NlRvQW5zaShzdHlsZXMuaGV4VG9BbnNpMjU2KGhleCkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0fSk7XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuY29uc3QgYW5zaVN0eWxlcyA9IGFzc2VtYmxlU3R5bGVzKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFuc2lTdHlsZXM7XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuY29uc3QgbGV2ZWwgPSAoKCkgPT4ge1xuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudERhdGEpIHtcblx0XHRjb25zdCBicmFuZCA9IG5hdmlnYXRvci51c2VyQWdlbnREYXRhLmJyYW5kcy5maW5kKCh7YnJhbmR9KSA9PiBicmFuZCA9PT0gJ0Nocm9taXVtJyk7XG5cdFx0aWYgKGJyYW5kICYmIGJyYW5kLnZlcnNpb24gPiA5Mykge1xuXHRcdFx0cmV0dXJuIDM7XG5cdFx0fVxuXHR9XG5cblx0aWYgKC9cXGIoQ2hyb21lfENocm9taXVtKVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0cmV0dXJuIDA7XG59KSgpO1xuXG5jb25zdCBjb2xvclN1cHBvcnQgPSBsZXZlbCAhPT0gMCAmJiB7XG5cdGxldmVsLFxuXHRoYXNCYXNpYzogdHJ1ZSxcblx0aGFzMjU2OiBsZXZlbCA+PSAyLFxuXHRoYXMxNm06IGxldmVsID49IDMsXG59O1xuXG5jb25zdCBzdXBwb3J0c0NvbG9yID0ge1xuXHRzdGRvdXQ6IGNvbG9yU3VwcG9ydCxcblx0c3RkZXJyOiBjb2xvclN1cHBvcnQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0c0NvbG9yO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcbi8vIGltcG9ydCB7IElGb3JtQnVpbGRlckNvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwaW5ncy9Gb3JtQnVpbGRlci9JRm9ybUJ1aWxkZXJDb250ZXh0XCI7XG4vLyBpbXBvcnQgeyBJU2hhcmVEb09wdGlvblNldCB9IGZyb20gXCIuLi8uLi8uLi8uLi9UeXBpbmdzL09wdGlvblNldHMvSVNoYXJlRG9PcHRpb25TZXRcIjtcbi8vIGltcG9ydCB7IElPZHNFbnRpdHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwaW5ncy9XaWRnZXRzT2RzRW50aXR5UGlja2VyL0lPZHNFbnRpdHlcIjtcbmltcG9ydCB7ICBnZXRBbGxSb2xlQ29uZmlnRm9yUm9sZSwgc2VhcmNoRm9yQ2xpZW50cywgc2VhcmNoRm9yVXNlcnMgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL09kc0hlbHBlclwiO1xuaW1wb3J0IHsgZXhlY3V0ZUdldCwgZXhlY3V0ZVBvc3QgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL2FwaS9hcGlcIjtcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSBcIi4uLy4uLy4uL01vZHVsZUxvYWRlci9BbHBoYWNhQWRhcHRlclwiO1xuXG5pbXBvcnQgeyBJRXhwZXJ0TWF0dGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvSUV4cGVydE1hdHRlckRhdGFcIjtcbmltcG9ydCB7IElGb3JtQnVpbGRlckNvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vSW50ZXJmYWNlcy9Gb3JtQnVpbGRlci9JRm9ybUJ1aWxkZXJDb250ZXh0XCI7XG5pbXBvcnQgeyBJU2hhcmVEb09wdGlvblNldCB9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL09wdGlvblNldHMvSVNoYXJlRG9PcHRpb25TZXRcIjtcbmltcG9ydCB7IElPZHNFbnRpdHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vSW50ZXJmYWNlcy9XaWRnZXRzT2RzRW50aXR5UGlja2VyL0lPZHNFbnRpdHlcIjtcblxudHlwZSBPZHNXaWRnZXQgPSB7XG4gICAgW2tleTpzdHJpbmddOiBhbnlcbn07XG4gIFxuLy9jb25zdGFudHMgXG5jb25zdCBtYXR0ZXJQYXJ0bmVyUm9sZVN5c3RlbU5hbWUgPSBcIm1hdHRlci1wYXJ0bmVyXCI7XG5jb25zdCBjbGllbnRSb2xlU3lzdGVtTmFtZSA9IFwiY2xpZW50XCI7XG5cbi8vVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgZnJvbSB0aGUgbW9kdWxlLWxvYWRlciB3ZWJjb21wb25lbnQgaW4gdGhlIGZvcm0gYnVpbGRlclxuZXhwb3J0IGZ1bmN0aW9uIHJ1bk1lKGNvbnRleHQ6IElGb3JtQnVpbGRlckNvbnRleHQpIDogYm9vbGVhbiB7XG4gICBcbiAgICBsZXQgeyBleHBlcnRNYXR0ZXJOdW1iZXIsIG1hdHRlckRldGFpbHMsIHBpcGVsaW5lTWF0dGVyIH0gPSBjcmVhdGVWYXJpYWJsZXMoY29udGV4dCk7XG5cbiAgICBpZighZXhwZXJ0TWF0dGVyTnVtYmVyKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBleHBlcnRNYXR0ZXJOdW1iZXJcIik7XG4gICAgaWYoIW1hdHRlckRldGFpbHMpIHRocm93IG5ldyBFcnJvcihcIk5vIG1hdHRlckRldGFpbHNcIik7XG4gICAgaWYoIXBpcGVsaW5lTWF0dGVyKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBwaXBlbGluZU1hdHRlclwiKTtcbiAgICBcbiAgICAod2luZG93IGFzIGFueSkudGVzdGVyID0gY29udGV4dDsgLy9qdXN0IGZvciBkZWJ1Z2dpbmdcbiAgICBcbiAgICBpZihjb250ZXh0LndvcmtJdGVtQ29udGV4dC5pZCgpICE9PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBlbnN1cmVSZWFkT25seUZpZWxkcyhjb250ZXh0KTtcbiAgICAgICAvLyB2YWxpZGF0ZVRlbXBNYXR0ZXJOdW1iZXIoY29udGV4dCk7XG4gICAgICAgIGxldCBleGl0ID0gdHJ1ZTtcbiAgICAgICAgLy9pZiB0aGUgd29yayBpdGVtIGlzIG5ldyBvciBpbiBkcmFmdCBkb250IGV4aXRcbiAgICAgICAgaWYoY29udGV4dC53b3JrSXRlbUNvbnRleHQ/LnBoYXNlTmFtZSgpPy50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwiZHJhZnRcIikgfHwgIWNvbnRleHQud29ya0l0ZW1Db250ZXh0Py5waGFzZU5hbWUoKSlcbiAgICAgICAge1xuICAgICAgICAgICAgZXhpdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihleGl0PT09dHJ1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgIC8vb25seSBydW4gdGhpcyBjb2RlIGlmIHRoZSB3b3JrIGl0ZW0gaXMgbmV3XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjIFtNb2R1bGVMb2FkZXJdIEZCX01hdHRlckRldGFpbHMgLSBleGl0IChvbmx5IHJ1biBvbiBuZXcpXCIsIFwiYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTVcIiwgY29udGV4dC53b3JrSXRlbUNvbnRleHQuaWQoKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjIFtNb2R1bGVMb2FkZXJdIGNvbnRleHQud29ya0l0ZW1Db250ZXh0LmlkKCkgXCIsIFwiYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTVcIiwgY29udGV4dC53b3JrSXRlbUNvbnRleHQuaWQoKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjIFtNb2R1bGVMb2FkZXJdIGNvbnRleHQud29ya0l0ZW1Db250ZXh0Py5waGFzZU5hbWUoKSBcIiwgXCJiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NVwiLCBjb250ZXh0LndvcmtJdGVtQ29udGV4dD8ucGhhc2VOYW1lKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcbiAgICAod2luZG93IGFzIGFueSkuYXNwZWN0RGVidWdlciA9ICh3aW5kb3cgYXMgYW55KS5hc3BlY3REZWJ1Z2VyIHx8IHt9O1xuICAgICh3aW5kb3cgYXMgYW55KS5hc3BlY3REZWJ1Z2VyLm1hdHRlckRldGFpbHNGb3JtQnVpbGRlciA9IG1hdHRlckRldGFpbHM7XG5cbiAgICBoaWRlU2hvd01hdHRlckRldGFpbHMoY29udGV4dCxtYXR0ZXJEZXRhaWxzLCBleHBlcnRNYXR0ZXJOdW1iZXIsIHBpcGVsaW5lTWF0dGVyKTtcbiAgICAvL2FkZCBhIGNoYW5nZSBldmVudCB0byB0aGUgZXhwZXJ0LW1hdHRlci1udW1iZXJcbiAgICBhZGRFdmVudEhhbmRsZXJzKGNvbnRleHQsIG1hdHRlckRldGFpbHMsIGV4cGVydE1hdHRlck51bWJlciwgcGlwZWxpbmVNYXR0ZXIpO1xuICAgIC8vZ2VuZXJhdGVUZW1wTWF0dGVyTnVtYmVyKGNvbnRleHQpO1xuICAgIHZhbGlkYXRlSWZQaXBlbGluZU1hdHRlcihjb250ZXh0LG1hdHRlckRldGFpbHMpO1xuXG4gICAgJHVpLmV2ZW50cy5icm9hZGNhc3QoXCJzY3JpcHQubWF0dGVyRGV0YWlsc0xvYWRlZFwiLCBjb250ZXh0KTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBjcmVhdGVzIHZhcmlhYmxlcyBmb3IgdGhlIGZvcm0uXG5mdW5jdGlvbiBjcmVhdGVWYXJpYWJsZXMoY29udGV4dDogSUZvcm1CdWlsZGVyQ29udGV4dCkge1xuICAgIC8vIEdldCB0aGUgZmllbGRzXG4gICAgLy8gbGV0IG1hdHRlckRldGFpbHMgPSBjb250ZXh0LmZpZWxkc1tlbnVtRmllbGRzLm1hdHRlckRldGFpbHNdO1xuXG4gICAgaWYoIWNvbnRleHQuZm9ybSkgdGhyb3cgbmV3IEVycm9yKFwiTm8gZm9ybVwiKTtcblxuICAgIGxldCBtYXR0ZXJEZXRhaWxzID0gY29udGV4dC5mb3JtLmZpZWxkc0J5SWRbZW51bUZpZWxkcy5tYXR0ZXJEZXRhaWxzXTsgXG4gICAgbGV0IGV4cGVydE1hdHRlck51bWJlciA9IGNvbnRleHQuZm9ybS5maWVsZHNCeUlkW2VudW1GaWVsZHMuZXhwZXJ0TWF0dGVyTnVtYmVyXTtcbiAgICBsZXQgcGlwZWxpbmVNYXR0ZXIgPSBjb250ZXh0LmZvcm0uZmllbGRzQnlJZFtlbnVtRmllbGRzLnBpcGVsaW5lTWF0dGVyXTtcbiAgICBcblxuICAgIC8vIFJldHVybiB0aGUgdmFyaWFibGVzXG4gICAgcmV0dXJuIHsgZXhwZXJ0TWF0dGVyTnVtYmVyLCBtYXR0ZXJEZXRhaWxzLCBwaXBlbGluZU1hdHRlciB9O1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudEhhbmRsZXJzKGNvbnRleHQ6IElGb3JtQnVpbGRlckNvbnRleHQsIG1hdHRlckRldGFpbHM6IEZvcm1CdWlsZGVyLCBleHBlcnRNYXR0ZXJOdW1iZXI6IEZvcm1CdWlsZGVyLCBwaXBlbGluZU1hdHRlcjogRm9ybUJ1aWxkZXIpIHtcbiAgICBpZighY29udGV4dC5mb3JtKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBmb3JtXCIpO1xuICAgIC8vYWRkIGV2ZW50IGhhbmRsZXQgZm9yIGV4cGVydC1tYXR0ZXItbnVtYmVyIGNoYW5nZWRcbiAgICBtYXR0ZXJEZXRhaWxzLmZpZWxkc0J5SWRbZW51bU1hdHRlckRldGFpbEZpZWxkcy5tYXR0ZXJEZXRhaWxzUGFydG5lck5hbWVdPy5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAodGhpczogYW55LCBldjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiJWMgUGFydG5lciBuYW1lIGNoYW5nZWQgdG86IFwiICsgbWF0dGVyRGV0YWlscy5maWVsZHNCeUlkW2VudW1NYXR0ZXJEZXRhaWxGaWVsZHMubWF0dGVyRGV0YWlsc1BhcnRuZXJOYW1lXT8uZ2V0VmFsdWUoKSwgXCJjb2xvcjogcGluazsgZm9udC1zaXplOiAyMHB4O1wiKTtcbiAgICB9KTtcblxuICAgIC8vYWRkIGV2ZW50IGhhbmRsZXQgZm9yIGV4cGVydC1tYXR0ZXItbnVtYmVyIGNoYW5nZWRcbiAgICBjb250ZXh0LmZvcm0uZmllbGRzQnlJZFtlbnVtRmllbGRzLmV4cGVydE1hdHRlck51bWJlcl0/Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICh0aGlzOiBhbnksIGV2OiBhbnkpIHtcbiAgICAgICAgLy8gaGlkZSBvciBzaG93IHRoZSBtYXR0ZXIgZGV0YWlscyBmaWVsZFxuICAgICAgICBoaWRlU2hvd01hdHRlckRldGFpbHMoY29udGV4dCxtYXR0ZXJEZXRhaWxzLCBleHBlcnRNYXR0ZXJOdW1iZXIsIHBpcGVsaW5lTWF0dGVyKTtcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBtYXR0ZXIgZGV0YWlscyBmaWVsZFxuICAgICAgICB1cGRhdGVNYXR0ZXJEZXRhaWxzKGNvbnRleHQsbWF0dGVyRGV0YWlscywgZXhwZXJ0TWF0dGVyTnVtYmVyLCBwaXBlbGluZU1hdHRlcik7XG4gICAgfSk7XG5cbiAgICAvL2FkZCBldmVudCBoYW5kbGV0IGZvciBwaXBlbGluZS1tYXR0ZXIgY2hhbmdlZFxuICAgIGNvbnRleHQuZm9ybS5maWVsZHNCeUlkW2VudW1GaWVsZHMucGlwZWxpbmVNYXR0ZXJdPy5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAodGhpczogYW55LCBldjogYW55KSB7XG4gICAgICAgIC8vIGhpZGUgb3Igc2hvdyB0aGUgbWF0dGVyIGRldGFpbHMgZmllbGRcbiAgICAgICAgaGlkZVNob3dNYXR0ZXJEZXRhaWxzKGNvbnRleHQsbWF0dGVyRGV0YWlscywgZXhwZXJ0TWF0dGVyTnVtYmVyLCBwaXBlbGluZU1hdHRlcik7XG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbWF0dGVyIGRldGFpbHMgZmllbGRcbiAgICAgICAgdXBkYXRlTWF0dGVyRGV0YWlscyhjb250ZXh0LG1hdHRlckRldGFpbHMsIGV4cGVydE1hdHRlck51bWJlciwgcGlwZWxpbmVNYXR0ZXIpOyBcbiAgICB9KTtcblxuICAgIC8vYWRkIGV2ZW50IGhhbmRsZXQgZm9yIGp1cmlzZGljdGlvbiBjaGFuZ2VkXG4gICAgLy91cGRhdGUgdGhlIE9PQiBKdXJpc2RpY3Rpb24gYXNwZWN0IGZpZWxkIGFuZCBmb3JtYnVpbGRlciBmaWVsZHNcbiAgICBjb250ZXh0LmZvcm0uZmllbGRzQnlJZFtlbnVtRmllbGRzLmp1cmlzZGljdGlvbnNDb3VudHJ5XT8ub24oXCJjaGFuZ2VcIiwgYXN5bmMgZnVuY3Rpb24gKHRoaXM6IGFueSwgZXY6IGFueSkge1xuICAgICAgICAvL3VwZGF0ZSBibGFkZSBqdXJpc2RpY3Rpb24gICAgIFxuICAgICAgICBsZXQgc2VsZWN0ZWRJZCA9IGNvbnRleHQuZm9ybT8uZmllbGRzQnlJZFtcImp1cmlzZGljdGlvbnMtY291bnRyeVwiXT8uZ2V0VmFsdWUoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCIlYyBKdXJpc2RpY3Rpb24gY2hhbmdlZCB0bzogXCIgKyBjb250ZXh0LmZvcm0/LmZpZWxkc0J5SWRbXCJqdXJpc2RpY3Rpb25zLWNvdW50cnlcIl0/LmdldFZhbHVlKCksIFwiY29sb3I6IHJlZDsgZm9udC1zaXplOiAyMHB4O1wiKTtcbiAgICAgICAgbGV0IGFzcGVjdCA9IGNvbnRleHQuZ2V0QXNwZWN0KFwiU2hhcmVkby5Db3JlLkxlZ2FsLkFzcGVjdHMuV2lkZ2V0cy5JbnN0cnVjdGlvbldvcmtUeXBlRGV0YWlsc1wiKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkSnVyaXNkaWN0aW9uQ291bnRyeSA9IGF3YWl0ICRhamF4LmdldCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovYC9hcGkvdjEvcHVibGljL21vZGVsbGVyL29wdGlvblNldHMvYWxsVmFsdWVzLyR7c2VsZWN0ZWRJZH1gKSBhcyBJU2hhcmVEb09wdGlvblNldDtcbiAgICAgICAgaWYgKCFzZWxlY3RlZEp1cmlzZGljdGlvbkNvdW50cnkpIHtcbiAgICAgICAgICAgIC8vbG9nIGlzc3VlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjIFtNb2R1bGVMb2FkZXJdIGdldEFzcGVjdCByZXR1cm4gdmFsdWVcIiwgXCJiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NVwiLCBzZWxlY3RlZEp1cmlzZGljdGlvbkNvdW50cnkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcHRpb25zID0gYXdhaXQgJGFqYXguZ2V0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi9gL2FwaS92MS9wdWJsaWMvbW9kZWxsZXIvb3B0aW9uU2V0cy9qdXJpc2RpY3Rpb25zL3ZhbHVlc2ApO1xuICAgICAgICBsZXQgc2VsZWN0ZWRKdXJpc2RpY3Rpb24gPSBvcHRpb25zLmZpbmQoKG9wdGlvbjogSVNoYXJlRG9PcHRpb25TZXQpID0+IG9wdGlvbi5uYW1lID09PSBzZWxlY3RlZEp1cmlzZGljdGlvbkNvdW50cnkubmFtZSk7XG4gICAgICAgIGlmICghc2VsZWN0ZWRKdXJpc2RpY3Rpb24pIHtcbiAgICAgICAgICAgIC8vbG9nIGlzc3VlXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjIFtNb2R1bGVMb2FkZXJdIGdldEFzcGVjdCByZXR1cm4gdmFsdWVcIiwgXCJiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NVwiLCBzZWxlY3RlZEp1cmlzZGljdGlvbik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXNwZWN0LndpZGdldC5pbnN0cnVjdGlvbi5qdXJpc2RpY3Rpb25JZChzZWxlY3RlZEp1cmlzZGljdGlvbi5pZCk7XG4gICAgfSk7XG59XG5cbi8vIGhpZGUgb3Igc2hvdyB0aGUgbWF0dGVyIGRldGFpbHMgZmllbGRcbmZ1bmN0aW9uIGhpZGVTaG93TWF0dGVyRGV0YWlscyhjb250ZXh0OiBJRm9ybUJ1aWxkZXJDb250ZXh0LG1hdHRlckRldGFpbHM6IEZvcm1CdWlsZGVyICwgZXhwZXJ0TWF0dGVyTnVtYmVyOiBGb3JtQnVpbGRlciwgcGlwZWxpbmVNYXR0ZXI6IEZvcm1CdWlsZGVyKSB7XG4gICAgc2V0TWF0dGVyRGV0YWlsc1N0YXRlKGNvbnRleHQsbWF0dGVyRGV0YWlscywgcGlwZWxpbmVNYXR0ZXIuZ2V0VmFsdWUoKSk7XG59XG5cbi8vIG1ha2UgYWxsIGNoaWxkIHByb3BlcnRpZXMgcmVhZG9ubHlcbmZ1bmN0aW9uIHNldE1hdHRlckRldGFpbHNTdGF0ZShjb250ZXh0OiBJRm9ybUJ1aWxkZXJDb250ZXh0LG1hdHRlckRldGFpbHM6IEZvcm1CdWlsZGVyLCBzdGF0dXM6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgaWYoIW1hdHRlckRldGFpbHMuZmllbGRzKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBmaWVsZHNcIik7XG4gICAgaWYoIW1hdHRlckRldGFpbHMuZmllbGRzQnlJZCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gZmllbGRzQnlJZFwiKTtcbiAgICAvLyBnZXQgYWxsIHRoZSBjaGlsZCBwcm9wZXJ0aWVzXG4gICAgbWF0dGVyRGV0YWlscy5maWVsZHMuZm9yRWFjaChjaGlsZCA9PlxuICAgIHtcbiAgICAgICAgLy8gc2V0IHRoZSByZWFkb25seSBzdGF0dXMgb2YgdGhlIGNoaWxkIHByb3BlcnR5XG4gICAgICAgIGNoaWxkLnJlYWRvbmx5KCFzdGF0dXMpO1xuICAgIH0pO1xuXG4gICAgLy8gc2V0IHRoZSByZWFkb25seSBzdGF0dXMgb2YgdGhlIG1hdHRlciBkZXRhaWxzIHN1YiBhcmVhXG4gICAgbWF0dGVyRGV0YWlscy5maWVsZHNCeUlkW2VudW1NYXR0ZXJEZXRhaWxGaWVsZHMubWF0dGVyRGV0YWlsc0liTGFzdENoZWNrZWRdPy5oaWRkZW4odHJ1ZSk7XG5cbiAgICBlbnN1cmVSZWFkT25seUZpZWxkcyhjb250ZXh0KTtcblxuXG59XG5cbi8vIGNsZWFyIGFsbCB0aGUgY2hpbGQgcHJvcGVydGllcyBvZiB0aGUgbWF0dGVyIGRldGFpbHMgc3ViIGFyZWEgb2YgdGhlIGZvcm0gYnVpbGRlclxuYXN5bmMgZnVuY3Rpb24gY2xlYXJNYXR0ZXJEZXRhaWxzKG1hdHRlckRldGFpbHM6IEZvcm1CdWlsZGVyKSB7XG4gICAgbWF0dGVyRGV0YWlscy5maWVsZHM/LmZvckVhY2goZnVuY3Rpb24gKGNoaWxkOiBhbnkpIHtcbiAgICAgICAgY2hpbGQuc2V0VmFsdWUoXCJcIik7XG4gICAgfSk7IFxufVxuXG5cbi8qIFxuMS4gV2UgZmlyc3QgZ2V0IHRoZSBkYXRhIGZyb20gdGhlIGVuZHBvaW50IGJ5IGNhbGxpbmcgZ2V0TWF0dGVyRGF0YSgpIGZ1bmN0aW9uXG4yLiBUaGVuIHdlIGNsZWFyIHRoZSBtYXR0ZXJEZXRhaWxzXG4zLiBXZSBmaW5kIHRoZSBzZWxlY3RlZCBtYXR0ZXIgYnkgdXNpbmcgdGhlIG1hdHRlciBjb2RlIGFuZCBjbGllbnQgY29kZSBmcm9tIHRoZSBkYXRhIHdlIGdvdCBmcm9tIHRoZSBlbmRwb2ludFxuNC4gSWYgdGhlIG1hdHRlciBpcyB1bmRlZmluZWQsIHdlIGNsZWFyIHRoZSBtYXR0ZXJEZXRhaWxzIGFuZCByZXR1cm5cbjUuIElmIHRoZSBtYXR0ZXIgaXMgbm90IHVuZGVmaW5lZCwgd2Ugc2V0IHRoZSB2YWx1ZXMgb2YgdGhlIG1hdHRlckRldGFpbHMgZmllbGRzICovXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVNYXR0ZXJEZXRhaWxzKGNvbnRleHQ6IElGb3JtQnVpbGRlckNvbnRleHQsbWF0dGVyRGV0YWlsczogRm9ybUJ1aWxkZXIsIGV4cGVydE1hdHRlck51bWJlcjogRm9ybUJ1aWxkZXIsIHBpcGVsaW5lTWF0dGVyOiBGb3JtQnVpbGRlcikge1xuXG4gICAgXG4gICAgbGV0IGRhdGEgPSBhd2FpdCBnZXRNYXR0ZXJEYXRhKGV4cGVydE1hdHRlck51bWJlci5nZXRWYWx1ZSgpKTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAvL2NsZWFyTWF0dGVyRGV0YWlscyhtYXR0ZXJEZXRhaWxzKTsgLy9jbGVhciB0aGUgbWF0dGVyIGRldGFpbHMgZm9ybVxuICAgIGxldCBzZWxlY3RlZE1hdHRlciA9IGRhdGEuZmluZChmdW5jdGlvbiAobWF0dGVyOiBhbnkpIHtcbiAgICAgICAgLy9zZXQgdGhlIGRpc3BsYXkgcG9ydGlvbiBvZiB0aGUgZXhwZXJ0LW1hdHRlci1udW1iZXIgZmllbGRcbiAgICAgICAvLyByZXR1cm4gZXhwZXJ0TWF0dGVyTnVtYmVyLmdldFZhbHVlKCkgPT09IGAke21hdHRlci5kYXRhLm1hdHRlckNvZGV9IC0gJHttYXR0ZXIuZGF0YS5jbGllbnQubmFtZX1gO1xuICAgICAgIHJldHVybiBleHBlcnRNYXR0ZXJOdW1iZXIuZ2V0VmFsdWUoKSA9PT0gbWF0dGVyLmRhdGEubWF0dGVyQ29kZTtcbiAgICAgICAgXG4gICAgfSk7XG5cbiAgICBpZiAoc2VsZWN0ZWRNYXR0ZXIgPT09IHVuZGVmaW5lZCB8fCBwaXBlbGluZU1hdHRlci5nZXRWYWx1ZSgpID09PSB0cnVlKSB7IC8vaWYgdGhlIG1hdHRlciBpcyBub3QgZm91bmQgb3IgaWYgdGhlIG1hdHRlciBpcyBhIHBpcGVsaW5lIG1hdHRlciwgY2xlYXIgdGhlIG1hdHRlciBkZXRhaWxzIGZvcm0gYW5kIHJldHVyblxuICAgICAgICBjbGVhck1hdHRlckRldGFpbHMobWF0dGVyRGV0YWlscyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZighbWF0dGVyRGV0YWlscy5wYXJlbnQ/LmZpZWxkc0J5SWQpIHRocm93IG5ldyBFcnJvcihcIk5vIGNsaWVudFwiKTtcbiAgICBsZXQgdGVtcE1hdHRlck51bWJlciA9IG1hdHRlckRldGFpbHMucGFyZW50Py5maWVsZHNCeUlkWyd0ZW1wLW1hdHRlci1udW1iZXInXT8uZ2V0VmFsdWUoKTtcblxuICAgIGlmICh0ZW1wTWF0dGVyTnVtYmVyID09PSB1bmRlZmluZWQgfHwgdGVtcE1hdHRlck51bWJlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gbWF0dGVyRGV0YWlscy5wYXJlbnQuY2hpbGRyZW5CeVByb3BlcnR5SWRbJ3RlbXAtbWF0dGVyLW51bWJlciddLnNldFZhbHVlKFwiTi9BXCIpO1xuICAgIH1cblxuICAgICAvL3NldCB0aGUgdmFsdWUgcG9ydGlvbiBvZiB0aGUgZXhwZXJ0LW1hdHRlci1udW1iZXIgZmllbGRcbiAgICAgY29udGV4dC5mb3JtPy5maWVsZHNCeUlkW2VudW1GaWVsZHMuZXhwZXJ0TWF0dGVyTnVtYmVyVmFsdWVdPy5zZXRWYWx1ZShzZWxlY3RlZE1hdHRlcj8uZGF0YT8ubWF0dGVyQ29kZSB8fCBcIlwiKTtcbiAgICAgICBcblxuICAgIG1hdHRlckRldGFpbHMuZmllbGRzQnlJZFtlbnVtTWF0dGVyRGV0YWlsRmllbGRzLm1hdHRlckRldGFpbHNDbGllbnROYW1lXT8uc2V0VmFsdWUoc2VsZWN0ZWRNYXR0ZXI/LmRhdGE/LmNsaWVudD8ubmFtZSB8fCBcIlwiKTtcbiAgICBtYXR0ZXJEZXRhaWxzLmZpZWxkc0J5SWRbZW51bU1hdHRlckRldGFpbEZpZWxkcy5tYXR0ZXJEZXRhaWxzQ2xpZW50Q29kZV0/LnNldFZhbHVlKHNlbGVjdGVkTWF0dGVyPy5kYXRhPy5jbGllbnQ/LmNvZGUgfHwgXCJcIik7XG4gICAvLyBtYXR0ZXJEZXRhaWxzLmZpZWxkc0J5SWRbZW51bU1hdHRlckRldGFpbEZpZWxkcy5tYXR0ZXJEZXRhaWxzUHJhY3RpY2VBcmVhXT8uc2V0VmFsdWUoc2VsZWN0ZWRNYXR0ZXI/LmRhdGE/LnByYWN0aWNlQXJlYT8ubmFtZSB8fCBcIlwiKTtcbiAgICBtYXR0ZXJEZXRhaWxzLmZpZWxkc0J5SWRbZW51bU1hdHRlckRldGFpbEZpZWxkcy5tYXR0ZXJEZXRhaWxzTmFtZV0/LnNldFZhbHVlKHNlbGVjdGVkTWF0dGVyPy5kYXRhPy5zaG9ydE5hbWUgfHwgXCJcIik7XG4gICAgbWF0dGVyRGV0YWlscy5maWVsZHNCeUlkW2VudW1NYXR0ZXJEZXRhaWxGaWVsZHMubWF0dGVyRGV0YWlsc1BhcnRuZXJOYW1lXT8uc2V0VmFsdWUoc2VsZWN0ZWRNYXR0ZXI/LmRhdGE/LnBhcnRuZXI/Lm5hbWUgfHwgXCJcIik7XG4gICAgbWF0dGVyRGV0YWlscy5maWVsZHNCeUlkW2VudW1NYXR0ZXJEZXRhaWxGaWVsZHMubWF0dGVyRGV0YWlsc0liXT8uc2V0VmFsdWUoc2VsZWN0ZWRNYXR0ZXI/LmRhdGE/LnNlY3VyZSB8fCBcIlwiKTtcblxuICAgIGNvbnNvbGUubG9nKFwibWF0dGVyRGV0YWlscy5pc1ZhbGlkKCk6XCIgKyBtYXR0ZXJEZXRhaWxzLmlzVmFsaWQoKSk7XG5cblxuICAgIHRyeVxuICAgIHtcbiAgICAgICAgdHJ5VXBkYXRlQ2xpZW50T2RzUGlja2VyKHNlbGVjdGVkTWF0dGVyLCBjb250ZXh0KTtcbiAgICB9XG4gICAgY2F0Y2goZSlcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIGF1dG8gdXBkYXRpbmcgb2RzIHBpY2tlcnMsIHVzZXIgcmVxdWlyZWQgdG8gc2VsZWN0IG1hbnVhbGx5XCIpO1xuICAgIH1cblxuICAgIHRyeVxuICAgIHtcbiAgICAgICAgdHJ5VXBkYXRlUGFydG5lck9kc1BpY2tlcihzZWxlY3RlZE1hdHRlciwgY29udGV4dCk7XG4gICAgfVxuICAgIGNhdGNoKGUpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBhdXRvIHVwZGF0aW5nIG9kcyBwaWNrZXJzLCB1c2VyIHJlcXVpcmVkIHRvIHNlbGVjdCBtYW51YWxseVwiKTtcbiAgICB9XG4gICAgXG59XG5cblxuLyoqXG4gKiBUcnkgdG8gdXBkYXRlIHRoZSBjbGllbnQgb2RzIHBpY2tlciB1c2luZyB0aGUgc2VsZWN0ZWQgbWF0dGVyIFxuICogVXNlcyBzZWFyY2hGb3JDbGllbnQgZnVuY3Rpb24gd2hpYyBpcyBhIGNvbW1vbiBvZHMgaGVscGVyIGZ1bmN0aW9uXG4gKiBAcGFyYW0gc2VsZWN0ZWRNYXR0ZXIgVGhlIHNlbGVjdGVkIG1hdHRlclxuICogQHBhcmFtIGNvbnRleHQgVGhlIGZvcm0gYnVpbGRlciBjb250ZXh0XG4gKi9cbmZ1bmN0aW9uIHRyeVVwZGF0ZUNsaWVudE9kc1BpY2tlcihzZWxlY3RlZE1hdHRlcjogSUV4cGVydE1hdHRlciwgY29udGV4dDogSUZvcm1CdWlsZGVyQ29udGV4dCkge1xuICAgIGxldCBjbGllbnRDb2RlID0gc2VsZWN0ZWRNYXR0ZXIuZGF0YS5jbGllbnQuY29kZTtcbiAgICBzZWFyY2hGb3JDbGllbnRzKGNsaWVudENvZGUpLnRoZW4oKGNsaWVudHMpID0+IHtcbiAgICAgICAgbGV0IGNsaWVudCA9IGNsaWVudHNbMF07XG4gICAgICAgIGNvbnNvbGUubG9nKFwiJWMgRm91bmQgQ2xpZW50IG5hbWUgOiBcIiArIGNsaWVudD8ubmFtZSwgXCJjb2xvcjogcGluazsgZm9udC1zaXplOiAyMHB4O1wiLCBjbGllbnRzKTtcbiAgICAgICAgbGV0IG9kc0NsaWVudCA9IGdldENsaWVudE9kc1BpY2tlcihjb250ZXh0KTtcbiAgICAgICAgbGV0IG9kc1JvbGVDb25maWcgPSBvZHNDbGllbnQucm9sZUNvbmZpZ1swXTtcbiAgICAgICAgbGV0IG9kc0VudGl0aWVzID0gb2RzQ2xpZW50Lk9EU0VudGl0aWVzWzBdO1xuICAgIFxuICAgICAgICBpZiAoIW9kc1JvbGVDb25maWcgfHwgIW9kc0VudGl0aWVzKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGlmICghY2xpZW50KSB7XG4gICAgICAgICAgICBvZHNFbnRpdGllcy5zZWxlY3RlZChmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGVudGl0eSA6IElPZHNFbnRpdHkgPSBvZHNSb2xlQ29uZmlnLmFkZFNlcnZpY2UuY3JlYXRlU2VsZWN0ZWRFbnRpdHlNb2RlbChjbGllbnQuaWQsIFwib3JnYW5pc2F0aW9uXCIsIGNsaWVudC5uYW1lKTtcbiAgICAgICAgb2RzUm9sZUNvbmZpZy5hZGRTZXJ2aWNlLnNlbGVjdGVkRW50aXR5KGVudGl0eSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogVHJpZXMgdG8gdXBkYXRlIHRoZSBwYXJ0bmVyIG9kcyBwaWNrZXJcbiAqIEBwYXJhbSBzZWxlY3RlZE1hdHRlciBUaGUgc2VsZWN0ZWQgbWF0dGVyXG4gKiBAcGFyYW0gY29udGV4dCAgVGhlIGZvcm0gYnVpbGRlciBjb250ZXh0XG4gKi9cbmZ1bmN0aW9uIHRyeVVwZGF0ZVBhcnRuZXJPZHNQaWNrZXIoc2VsZWN0ZWRNYXR0ZXI6IElFeHBlcnRNYXR0ZXIsIGNvbnRleHQ6IElGb3JtQnVpbGRlckNvbnRleHQpIHtcbiAgICBsZXQgcGFydG5lckxhc3ROYW1lID0gc2VsZWN0ZWRNYXR0ZXIuZGF0YS5wYXJ0bmVyLm5hbWUuc3BsaXQoXCIsXCIpWzBdO1xuICAgIHNlYXJjaEZvclVzZXJzKHNlbGVjdGVkTWF0dGVyLmRhdGEucGFydG5lci5lbWFpbCkudGhlbigodXNlcnMpID0+IHtcbiAgICAgICAgbGV0IHVzZXIgPSB1c2Vyc1swXTtcbiAgICAgICAgY29uc29sZS5sb2coXCIlYyBQYXJ0bmVyIG5hbWUgY2hhbmdlZCB0bzogXCIgKyB1c2VyPy5pZCwgXCJjb2xvcjogcGluazsgZm9udC1zaXplOiAyMHB4O1wiLCB1c2VyKTtcbiAgICAgICAgbGV0IG9kc01hdHRlclBhcnRuZXIgPSBnZXRQYXJ0bmVyT2RzUGlja2VyKGNvbnRleHQpO1xuICAgICAgICBsZXQgb2RzUm9sZUNvbmZpZyA9IG9kc01hdHRlclBhcnRuZXIucm9sZUNvbmZpZ1swXTtcbiAgICAgICAgbGV0IG9kc0VudGl0aWVzID0gb2RzTWF0dGVyUGFydG5lci5PRFNFbnRpdGllc1swXTtcbiAgICBcbiAgICAgICAgaWYgKCFvZHNSb2xlQ29uZmlnIHx8ICFvZHNFbnRpdGllcylcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIG9kc0VudGl0aWVzLnNlbGVjdGVkKGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbnRpdHkgOiBJT2RzRW50aXR5ID0gb2RzUm9sZUNvbmZpZy5hZGRTZXJ2aWNlLmNyZWF0ZVNlbGVjdGVkRW50aXR5TW9kZWwodXNlci5pZCwgXCJ1c2VyXCIsIHVzZXIuZmlyc3ROYW1lICsgXCIgXCIgKyB1c2VyLnN1cm5hbWUpO1xuICAgICAgICBvZHNSb2xlQ29uZmlnLmFkZFNlcnZpY2Uuc2VsZWN0ZWRFbnRpdHkoZW50aXR5KTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBDYWxsIHRoZSBzZXJ2ZXIgdG8gZ2V0IHRoZSBtYXR0ZXIgZGF0YVxuICogQHJldHVybnMgdGhlIGRhdGEgZnJvbSB0aGUgc2VydmVyIHdpdGhvdXQgY2FjaGVcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2V0TWF0dGVyRGF0YShleHBlcnRNYXR0ZXJOdW1iZXI/OnN0cmluZykgOiBQcm9taXNlPElFeHBlcnRNYXR0ZXJbXT4ge1xuICAgIFxuICAgIGxldCByZXRWYWx1ZTpJRXhwZXJ0TWF0dGVyW10gPSBbXTtcbiAgICBpZihleHBlcnRNYXR0ZXJOdW1iZXIgPT09IHVuZGVmaW5lZCB8fCBleHBlcnRNYXR0ZXJOdW1iZXIubGVuZ3RoID09PSAwKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIH1cbiAgIFxuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LmdldCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHdpbmRvdy5kb2N1bWVudC5sb2NhdGlvbi5vcmlnaW4gKyBcIi9faWRlRmlsZXMvU2FtcGxlRGF0YS9lRGlzY292ZXJ5L21hdHRlcnMuanNvblwiKSBhcyBJRXhwZXJ0TWF0dGVyW107XG4gICAgLy8gLy9nZXQgdGhlIGRhdGEgZnJvbSB0aGUgc2VydmVyIHdpdGhvdXQgY2FjaGVcbiAgICB0cnlcbiAgICB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZXhlY3V0ZUdldDxhbnk+KGAvYXBpL2V4dGVybmFsTWF0dGVyUHJvdmlkZXIvZGV0YWlscy8ke2V4cGVydE1hdHRlck51bWJlcn1gKTtcbiAgICAgICAgY29uc29sZS5sb2coXCIlYyBbTW9kdWxlTG9hZGVyXSBnZXRNYXR0ZXJEYXRhIHJldHVybiB2YWx1ZVwiLCBcImJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1XCIsIGRhdGEpXG4gICAgICAgIGlmKGRhdGEgJiYgZGF0YS5tYXR0ZXJDb2RlKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgbWF0dGVyOklFeHBlcnRNYXR0ZXIgPSB7XG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0VmFsdWUucHVzaChtYXR0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoKGUpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBnZXQgbWF0dGVyIGRhdGEgZnJvbSBzZXJ2ZXJcIixlKTtcblxuICAgIH1cbiAgICAgcmV0dXJuIHJldFZhbHVlO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHRlbXAgbWF0dGVyIG51bWJlciBhbmQgc2V0cyBpdCB0byB0aGUgdGVtcC1tYXR0ZXItbnVtYmVyIGZpZWxkXG4gKiBAcGFyYW0gY29udGV4dCBUaGUgZm9ybSBidWlsZGVyIGNvbnRleHRcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVUZW1wTWF0dGVyTnVtYmVyKGNvbnRleHQ6IElGb3JtQnVpbGRlckNvbnRleHQpXG57XG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGxldCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpOyBcbiAgICBsZXQgaG91ciA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBsZXQgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgbGV0IHNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuICAgIGxldCBtaWxsaXNlY29uZCA9IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCk7XG4gICAvLyBsZXQgdGVtcE1hdHRlck51bWJlciA9IGBUJHt5ZWFyfSR7bW9udGh9JHtkYXl9JHtob3VyfSR7bWludXRlfSR7c2Vjb25kfSR7bWlsbGlzZWNvbmR9YDtcbiAgIGxldCB0ZW1wTWF0dGVyTnVtYmVyID0gYFRbJHt5ZWFyfV1gO1xuICAgIGNvbnRleHQuZm9ybT8uZmllbGRzQnlJZFtlbnVtRmllbGRzLnRlbXBNYXR0ZXJOdW1iZXJdPy5zZXRWYWx1ZSh0ZW1wTWF0dGVyTnVtYmVyKTtcbn1cblxuLyoqXG4gKiBFbnVtIGZvciB0aGUgZmllbGRzIGluIHRoZSBmb3JtIGJ1aWxkZXJcbiAqL1xuZXhwb3J0IGVudW0gZW51bUZpZWxkcyB7XG4gICAgY3VzdG9tQWx0RWRpc2NvdmVyeUluc3RydWN0aW9uTWF0dGVyRGV0YWlscyA9IFwiY3VzdG9tLWFsdC1lZGlzY292ZXJ5LWluc3RydWN0aW9uLW1hdHRlci1kZXRhaWxzXCIsXG4gICAganVyaXNkaWN0aW9uc0NvdW50cnkgPSBcImp1cmlzZGljdGlvbnMtY291bnRyeVwiLFxuICAgIHBpcGVsaW5lTWF0dGVyID0gXCJwaXBlbGluZS1tYXR0ZXJcIixcbiAgICBleHBlcnRNYXR0ZXJOdW1iZXIgPSBcImV4cGVydC1tYXR0ZXItbnVtYmVyXCIsXG4gICAgZXhwZXJ0TWF0dGVyTnVtYmVyVmFsdWUgPSBcImV4cGVydC1tYXR0ZXItbnVtYmVyLXZhbHVlXCIsXG4gICAgdGVtcE1hdHRlck51bWJlciA9IFwidGVtcC1tYXR0ZXItbnVtYmVyXCIsXG4gICAgc3ViTWF0dGVyQ29kZSA9IFwic3ViLW1hdHRlci1jb2RlXCIsXG4gICAgYWJjTWF0dGVyTnVtYmVyID0gXCJhYmMtbWF0dGVyLW51bWJlclwiLFxuICAgIG1hdHRlckRldGFpbHMgPSBcIm1hdHRlci1kZXRhaWxzXCIsXG4gICAgXG59XG5cbi8qKlxuICogRW51bSBmb3IgdGhlIGZpZWxkcyBpbiB0aGUgbWF0dGVyIGRldGFpbHMgc3ViIGFyZWEgb2YgdGhlIGZvcm0gYnVpbGRlclxuICovXG5leHBvcnQgZW51bSBlbnVtTWF0dGVyRGV0YWlsRmllbGRzIHtcbiAgICBtYXR0ZXJEZXRhaWxzUGFydG5lclNlbGVjdG9yID0gXCJtYXR0ZXItZGV0YWlscy1wYXJ0bmVyLXNlbGVjdG9yXCIsXG4gICAgbWF0dGVyRGV0YWlsc1BhcnRuZXJOYW1lID0gXCJtYXR0ZXItZGV0YWlscy1wYXJ0bmVyLW5hbWVcIixcbiAgICBtYXR0ZXJEZXRhaWxzQ2xpZW50TmFtZSA9IFwibWF0dGVyLWRldGFpbHMtY2xpZW50LW5hbWVcIixcbiAgICBtYXR0ZXJEZXRhaWxzQ2xpZW50Q29kZSA9IFwibWF0dGVyLWRldGFpbHMtY2xpZW50LWNvZGVcIixcbiAgICBtYXR0ZXJEZXRhaWxzUHJhY3RpY2VBcmVhID0gXCJtYXR0ZXItZGV0YWlscy1wcmFjdGljZS1hcmVhXCIsXG4gICAgbWF0dGVyRGV0YWlsc05hbWUgPSBcIm1hdHRlci1kZXRhaWxzLW5hbWVcIixcbiAgICBtYXR0ZXJEZXRhaWxzSWIgPSBcIm1hdHRlci1kZXRhaWxzLWliXCIsXG4gICAgbWF0dGVyRGV0YWlsc0liTGFzdENoZWNrZWQgPSBcIm1hdHRlci1kZXRhaWxzLWliLWxhc3QtY2hlY2tcIlxufVxuXG4vKipcbiAqIFNlYXJjaGVzIGZvciB0aGUgcGFydG5lciBvZHMgcGlja2VyIGluIHRoZSBibGFkZSB1c2luZyBjb21tb24gb2RzIGhlbHBlciBmdW5jdGlvbnNcbiAqIEBwYXJhbSBjb250ZXh0IFxuICogQHJldHVybnMgXG4gKi9cbmZ1bmN0aW9uIGdldFBhcnRuZXJPZHNQaWNrZXIoY29udGV4dDogSUZvcm1CdWlsZGVyQ29udGV4dCkge1xuICAgIHJldHVybiBnZXRBbGxSb2xlQ29uZmlnRm9yUm9sZShjb250ZXh0LmJsYWRlLG1hdHRlclBhcnRuZXJSb2xlU3lzdGVtTmFtZSk7XG59XG5cbi8qKlxuICogU2VhcmNoZXMgZm9yIHRoZSBwYXJ0bmVyIG9kcyBwaWNrZXIgaW4gdGhlIGJsYWRlIHVzaW5nIGNvbW1vbiBvZHMgaGVscGVyIGZ1bmN0aW9uc1xuICogQHBhcmFtIGNvbnRleHQgXG4gKiBAcmV0dXJucyBcbiAqL1xuZnVuY3Rpb24gZ2V0Q2xpZW50T2RzUGlja2VyKGNvbnRleHQ6IElGb3JtQnVpbGRlckNvbnRleHQpIHtcbiAgICByZXR1cm4gZ2V0QWxsUm9sZUNvbmZpZ0ZvclJvbGUoY29udGV4dC5ibGFkZSwgY2xpZW50Um9sZVN5c3RlbU5hbWUpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUlmUGlwZWxpbmVNYXR0ZXIoY29udGV4dDogSUZvcm1CdWlsZGVyQ29udGV4dCxtYXR0ZXJEZXRhaWxzOiBGb3JtQnVpbGRlcilcbntcbiAgICAvL2xvZyBjb2xvclxuICAgIGNvbnNvbGUubG9nKFwiJWMgW01hdHRlckRldGFpbHNdIHZhbGlkYXRlSWZQaXBlbGluZU1hdHRlclwiLCBcImNvbG9yOiAjZ3JlZW5cIik7XG4gICAgY29uc29sZS5sb2coXCIlYyBbTWF0dGVyRGV0YWlsc10gY29udGV4dC53b3JrSXRlbUNvbnRleHQoKVwiLCBcIiBjb2xvcjogI2dyZWVuXCIsIGNvbnRleHQud29ya0l0ZW1Db250ZXh0KTtcblxuICAgIGlmKGNvbnRleHQud29ya0l0ZW1Db250ZXh0LnNoYXJlZG9UeXBlU3lzdGVtTmFtZSgpPy5pbmNsdWRlcyhcInBpcGVsaW5lXCIpICE9PSB0cnVlKVxuICAgIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBsZXQgcGlwZWxpbmVGb3JtRmllbGQgPSBjb250ZXh0LmZvcm0/LmZpZWxkc0J5SWRbZW51bUZpZWxkcy5waXBlbGluZU1hdHRlcl07XG4gIFxuICAgIGlmKHBpcGVsaW5lRm9ybUZpZWxkKVxuICAgIHsgICAgXG4gICAgICAgIC8vZW5zdXJlIHBpcGxlaW5lIG1hdHRlciBpcyByZWFkb25seVxuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCIlYyBbTWF0dGVyRGV0YWlsc10gcGlwZWxpbmVGb3JtRmllbGQuc2V0VmFsdWUodHJ1ZSlcIiwgXCIgY29sb3I6ICNncmVlblwiKTsgICBcbiAgICAgICAgcGlwZWxpbmVGb3JtRmllbGQuc2V0VmFsdWUodHJ1ZSk7XG4gICAgfVxuXG4gICAgICBcblxuXG59XG5cbmZ1bmN0aW9uIGVuc3VyZVJlYWRPbmx5RmllbGRzKGNvbnRleHQ6IElGb3JtQnVpbGRlckNvbnRleHQpXG57XG4gICAgbGV0IHBpcGVsaW5lRm9ybUZpZWxkID0gY29udGV4dC5mb3JtPy5maWVsZHNCeUlkW2VudW1GaWVsZHMucGlwZWxpbmVNYXR0ZXJdO1xuICAgIGlmKHBpcGVsaW5lRm9ybUZpZWxkKVxuICAgIHtcbiAgICAgICAgcGlwZWxpbmVGb3JtRmllbGQucmVhZG9ubHkodHJ1ZSk7XG4gICAgICAgIHBpcGVsaW5lRm9ybUZpZWxkLmhpZGRlbih0cnVlKTtcbiAgICB9XG59XG5cblxuLy8gZnVuY3Rpb24gdmFsaWRhdGVUZW1wTWF0dGVyTnVtYmVyKGNvbnRleHQ6IElGb3JtQnVpbGRlckNvbnRleHQpIHtcblxuLy8gICAgIC8vbG9nIGNvbG9yXG4vLyAgICAgY29uc29sZS5sb2coXCIlYyBbTWF0dGVyRGV0YWlsc10gdmFsaWRhdGVUZW1wTWF0dGVyTnVtYmVyXCIsIFwiYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTVcIik7XG4vLyAgICAgLy9leGl0IGlzIHN0aWxsIG5ldyBhbmQgbWF0dGVyIG5vdCBzYXZlZFxuLy8gICAgIGlmKGNvbnRleHQud29ya0l0ZW1Db250ZXh0LmlkKCk9PT11bmRlZmluZWQpXG4vLyAgICAge1xuLy8gICAgICAgICByZXR1cm47XG4vLyAgICAgfVxuXG4vLyAgICAgLy9leGl0IGlmIHRoZSB0ZW1wIG1hdHRlciBudW1iZXIgaXMgc2V0XG4vLyAgICAgbGV0IHRlbXBNYXR0ZXJOdW1iZXIgPSBjb250ZXh0LmZvcm0/LmZpZWxkc0J5SWRbZW51bUZpZWxkcy50ZW1wTWF0dGVyTnVtYmVyXT8uZ2V0VmFsdWUoKTtcbi8vICAgICBjb25zb2xlLmxvZyhcIiVjIFtNYXR0ZXJEZXRhaWxzXSB0ZW1wTWF0dGVyTnVtYmVyXCIsIFwiYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTVcIiwgdGVtcE1hdHRlck51bWJlcik7XG4vLyAgICAgaWYodGVtcE1hdHRlck51bWJlciAhPSB1bmRlZmluZWQgJiYgdGVtcE1hdHRlck51bWJlci5zdGFydHNXaXRoKFwiVFtcIikpXG4vLyAgICAge1xuLy8gICAgICAgICByZXR1cm47XG4vLyAgICAgfVxuXG4vLyAgICAgLy9ydW4gZXZlcnkgNTAwbXMgdG8gY2hlY2sgZm9yIGEgdGVtcCBtYXR0ZXIgbnVtYmVyXG4vLyAgICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcInZhbGlkYXRlVGVtcE1hdHRlck51bWJlclwiKTtcbi8vICAgICAgICAgbGV0IHRlbXBNYXR0ZXJOdW1iZXIgPSBhd2FpdCBnZXRQaXBlbGluZU1hdHRlck51bWJlcihjb250ZXh0LndvcmtJdGVtQ29udGV4dC5pZCgpKTtcbi8vICAgICAgICAgaWYodGVtcE1hdHRlck51bWJlciAhPSB1bmRlZmluZWQgJiYgdGVtcE1hdHRlck51bWJlci5sZW5ndGggPiAwKVxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgICBjb250ZXh0LmZvcm0/LmZpZWxkc0J5SWRbZW51bUZpZWxkcy50ZW1wTWF0dGVyTnVtYmVyXT8uc2V0VmFsdWUodGVtcE1hdHRlck51bWJlcik7XG4vLyAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbi8vICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgfVxuICAgICAgICBcbi8vICAgICB9LDUwMCk7XG5cblxuLy8gfVxuXG4vLyBhc3luYyBmdW5jdGlvbiBnZXRQaXBlbGluZU1hdHRlck51bWJlcihpZDpzdHJpbmcpIDogUHJvbWlzZTxzdHJpbmc+XG4vLyB7XG4vLyAgICAgbGV0IGFwaSA9IGAvYXBpL3YxL3B1YmxpYy93b3JrSXRlbS9maW5kQnlRdWVyeWA7XG4vLyAgICAgbGV0IGRhdGEgPSB7XG4vLyAgICAgICAgIFwic2VhcmNoXCI6IHtcbi8vICAgICAgICAgICBcIndvcmtJdGVtSWRzXCI6IFtcbi8vICAgICAgICAgICAgIGlkXG4vLyAgICAgICAgICAgXVxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBcImVucmljaFwiOiBbXG4gICAgXG4vLyAgICAgICAgICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwiZm9ybS1jdXN0b20tYWx0LWVkaXNjb3ZlcnktaW5zdHJ1Y3Rpb24tbWF0dGVyLWRldGFpbHMudGVtcC1tYXR0ZXItbnVtYmVyXCJcbi8vICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXX07XG5cbi8vICAgICByZXR1cm4gZXhlY3V0ZVBvc3Q8VEdldFBpcGVsaW5lTWF0dGVyTnVtYmVyUmVzcG9uc2U+KGFwaSxkYXRhKS50aGVuKChkYXRhKSA9PiB7XG4vLyAgICAgICAgICBjb25zb2xlLmxvZyhcImdldFBpcGVsaW5lTWF0dGVyTnVtYmVyXCIsZGF0YSk7XG4vLyAgICAgICAgICBsZXQgcmV0VmFsdWUgOiBzdHJpbmcgPSBkYXRhLnJlc3VsdHNbMF0uZGF0YVtcImZvcm0tY3VzdG9tLWFsdC1lZGlzY292ZXJ5LWluc3RydWN0aW9uLW1hdHRlci1kZXRhaWxzLnRlbXAtbWF0dGVyLW51bWJlclwiXTtcbiAgICAgICBcbi8vICAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuLy8gICAgIH0pO1xuXG5cbi8vIH1cblxuLy8gdHlwZSBUR2V0UGlwZWxpbmVNYXR0ZXJOdW1iZXJSZXNwb25zZSA9IHtcbi8vICAgICAgICAgXCJ0b3RhbENvdW50XCI6IDEsXG4vLyAgICAgICAgIFwidG9va01zXCI6IDcxLFxuLy8gICAgICAgICBcInJlc3VsdHNcIjogW1xuLy8gICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgIFwic2NvcmVcIjogMCxcbi8vICAgICAgICAgICAgICAgICBcImlkXCI6IFwiNGRkNzBlM2YtYjI5NC00NDc5LTkwMmUtYjA1NzAwOWUzZTYzXCIsXG4vLyAgICAgICAgICAgICAgICAgXCJkYXRhXCI6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgXCJmb3JtLWN1c3RvbS1hbHQtZWRpc2NvdmVyeS1pbnN0cnVjdGlvbi1tYXR0ZXItZGV0YWlscy50ZW1wLW1hdHRlci1udW1iZXJcIjogXCJUWzIwMjNdMDAwMDA3XCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJHYXJldGggSmFja3NvbiBMdGQgLSBcIixcbi8vICAgICAgICAgICAgICAgICAgICAgXCJwaGFzZS5uYW1lXCI6IFwiRHJhZnRcIlxuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXVxuLy8gICAgIH1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==