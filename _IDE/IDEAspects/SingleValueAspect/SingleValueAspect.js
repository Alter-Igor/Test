/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "../../Desktop/Test/node_modules/detect-browser/es/index.js":
/*!******************************************************************!*\
  !*** ../../Desktop/Test/node_modules/detect-browser/es/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BotInfo: () => (/* binding */ BotInfo),
/* harmony export */   BrowserInfo: () => (/* binding */ BrowserInfo),
/* harmony export */   NodeInfo: () => (/* binding */ NodeInfo),
/* harmony export */   ReactNativeInfo: () => (/* binding */ ReactNativeInfo),
/* harmony export */   SearchBotDeviceInfo: () => (/* binding */ SearchBotDeviceInfo),
/* harmony export */   browserName: () => (/* binding */ browserName),
/* harmony export */   detect: () => (/* binding */ detect),
/* harmony export */   detectOS: () => (/* binding */ detectOS),
/* harmony export */   getNodeVersion: () => (/* binding */ getNodeVersion),
/* harmony export */   parseUserAgent: () => (/* binding */ parseUserAgent)
/* harmony export */ });
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var BrowserInfo = /** @class */ (function () {
    function BrowserInfo(name, version, os) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.type = 'browser';
    }
    return BrowserInfo;
}());

var NodeInfo = /** @class */ (function () {
    function NodeInfo(version) {
        this.version = version;
        this.type = 'node';
        this.name = 'node';
        this.os = process.platform;
    }
    return NodeInfo;
}());

var SearchBotDeviceInfo = /** @class */ (function () {
    function SearchBotDeviceInfo(name, version, os, bot) {
        this.name = name;
        this.version = version;
        this.os = os;
        this.bot = bot;
        this.type = 'bot-device';
    }
    return SearchBotDeviceInfo;
}());

var BotInfo = /** @class */ (function () {
    function BotInfo() {
        this.type = 'bot';
        this.bot = true; // NOTE: deprecated test name instead
        this.name = 'bot';
        this.version = null;
        this.os = null;
    }
    return BotInfo;
}());

var ReactNativeInfo = /** @class */ (function () {
    function ReactNativeInfo() {
        this.type = 'react-native';
        this.name = 'react-native';
        this.version = null;
        this.os = null;
    }
    return ReactNativeInfo;
}());

// tslint:disable-next-line:max-line-length
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
    ['aol', /AOLShield\/([0-9\._]+)/],
    ['edge', /Edge\/([0-9\._]+)/],
    ['edge-ios', /EdgiOS\/([0-9\._]+)/],
    ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
    ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
    ['samsung', /SamsungBrowser\/([0-9\.]+)/],
    ['silk', /\bSilk\/([0-9._-]+)\b/],
    ['miui', /MiuiBrowser\/([0-9\.]+)$/],
    ['beaker', /BeakerBrowser\/([0-9\.]+)/],
    ['edge-chromium', /EdgA?\/([0-9\.]+)/],
    [
        'chromium-webview',
        /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/,
    ],
    ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
    ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
    ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
    ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
    ['fxios', /FxiOS\/([0-9\.]+)/],
    ['opera-mini', /Opera Mini.*Version\/([0-9\.]+)/],
    ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
    ['opera', /OPR\/([0-9\.]+)(:?\s|$)/],
    ['pie', /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
    ['pie', /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
    ['netfront', /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
    ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
    ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
    ['ie', /MSIE\s(7\.0)/],
    ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
    ['android', /Android\s([0-9\.]+)/],
    ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
    ['safari', /Version\/([0-9\._]+).*Safari/],
    ['facebook', /FB[AS]V\/([0-9\.]+)/],
    ['instagram', /Instagram\s([0-9\.]+)/],
    ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/],
    ['ios-webview', /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
    ['curl', /^curl\/([0-9\.]+)$/],
    ['searchbot', SEARCHBOX_UA_REGEX],
];
var operatingSystemRules = [
    ['iOS', /iP(hone|od|ad)/],
    ['Android OS', /Android/],
    ['BlackBerry OS', /BlackBerry|BB10/],
    ['Windows Mobile', /IEMobile/],
    ['Amazon OS', /Kindle/],
    ['Windows 3.11', /Win16/],
    ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
    ['Windows 98', /(Windows 98)|(Win98)/],
    ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
    ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
    ['Windows Server 2003', /(Windows NT 5.2)/],
    ['Windows Vista', /(Windows NT 6.0)/],
    ['Windows 7', /(Windows NT 6.1)/],
    ['Windows 8', /(Windows NT 6.2)/],
    ['Windows 8.1', /(Windows NT 6.3)/],
    ['Windows 10', /(Windows NT 10.0)/],
    ['Windows ME', /Windows ME/],
    ['Windows CE', /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
    ['Open BSD', /OpenBSD/],
    ['Sun OS', /SunOS/],
    ['Chrome OS', /CrOS/],
    ['Linux', /(Linux)|(X11)/],
    ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
    ['QNX', /QNX/],
    ['BeOS', /BeOS/],
    ['OS/2', /OS\/2/],
];
function detect(userAgent) {
    if (!!userAgent) {
        return parseUserAgent(userAgent);
    }
    if (typeof document === 'undefined' &&
        typeof navigator !== 'undefined' &&
        navigator.product === 'ReactNative') {
        return new ReactNativeInfo();
    }
    if (typeof navigator !== 'undefined') {
        return parseUserAgent(navigator.userAgent);
    }
    return getNodeVersion();
}
function matchUserAgent(ua) {
    // opted for using reduce here rather than Array#first with a regex.test call
    // this is primarily because using the reduce we only perform the regex
    // execution once rather than once for the test and for the exec again below
    // probably something that needs to be benchmarked though
    return (ua !== '' &&
        userAgentRules.reduce(function (matched, _a) {
            var browser = _a[0], regex = _a[1];
            if (matched) {
                return matched;
            }
            var uaMatch = regex.exec(ua);
            return !!uaMatch && [browser, uaMatch];
        }, false));
}
function browserName(ua) {
    var data = matchUserAgent(ua);
    return data ? data[0] : null;
}
function parseUserAgent(ua) {
    var matchedRule = matchUserAgent(ua);
    if (!matchedRule) {
        return null;
    }
    var name = matchedRule[0], match = matchedRule[1];
    if (name === 'searchbot') {
        return new BotInfo();
    }
    // Do not use RegExp for split operation as some browser do not support it (See: http://blog.stevenlevithan.com/archives/cross-browser-split)
    var versionParts = match[1] && match[1].split('.').join('_').split('_').slice(0, 3);
    if (versionParts) {
        if (versionParts.length < REQUIRED_VERSION_PARTS) {
            versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
        }
    }
    else {
        versionParts = [];
    }
    var version = versionParts.join('.');
    var os = detectOS(ua);
    var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
    if (searchBotMatch && searchBotMatch[1]) {
        return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1]);
    }
    return new BrowserInfo(name, version, os);
}
function detectOS(ua) {
    for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
        var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
        var match = regex.exec(ua);
        if (match) {
            return os;
        }
    }
    return null;
}
function getNodeVersion() {
    var isNode = typeof process !== 'undefined' && process.version;
    return isNode ? new NodeInfo(process.version.slice(1)) : null;
}
function createVersionParts(count) {
    var output = [];
    for (var ii = 0; ii < count; ii++) {
        output.push('0');
    }
    return output;
}


/***/ }),

/***/ "../../Desktop/Test/node_modules/uuid/dist/esm-browser/native.js":
/*!***********************************************************************!*\
  !*** ../../Desktop/Test/node_modules/uuid/dist/esm-browser/native.js ***!
  \***********************************************************************/
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

/***/ "../../Desktop/Test/node_modules/uuid/dist/esm-browser/regex.js":
/*!**********************************************************************!*\
  !*** ../../Desktop/Test/node_modules/uuid/dist/esm-browser/regex.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "../../Desktop/Test/node_modules/uuid/dist/esm-browser/rng.js":
/*!********************************************************************!*\
  !*** ../../Desktop/Test/node_modules/uuid/dist/esm-browser/rng.js ***!
  \********************************************************************/
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

/***/ "../../Desktop/Test/node_modules/uuid/dist/esm-browser/stringify.js":
/*!**************************************************************************!*\
  !*** ../../Desktop/Test/node_modules/uuid/dist/esm-browser/stringify.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "../../Desktop/Test/node_modules/uuid/dist/esm-browser/validate.js");

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

/***/ "../../Desktop/Test/node_modules/uuid/dist/esm-browser/v4.js":
/*!*******************************************************************!*\
  !*** ../../Desktop/Test/node_modules/uuid/dist/esm-browser/v4.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "../../Desktop/Test/node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "../../Desktop/Test/node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "../../Desktop/Test/node_modules/uuid/dist/esm-browser/stringify.js");




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

/***/ "../../Desktop/Test/node_modules/uuid/dist/esm-browser/validate.js":
/*!*************************************************************************!*\
  !*** ../../Desktop/Test/node_modules/uuid/dist/esm-browser/validate.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "../../Desktop/Test/node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "../../Desktop/Test/src/Common/Base64Encoding.ts":
/*!*******************************************************!*\
  !*** ../../Desktop/Test/src/Common/Base64Encoding.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base64ToUtf8: () => (/* binding */ base64ToUtf8),
/* harmony export */   utf8ToBase64: () => (/* binding */ utf8ToBase64)
/* harmony export */ });
function utf8ToBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
    }));
}
function base64ToUtf8(str) {
    return decodeURIComponent(atob(str).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


/***/ }),

/***/ "../../Desktop/Test/src/Common/Debound.ts":
/*!************************************************!*\
  !*** ../../Desktop/Test/src/Common/Debound.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounceFunction: () => (/* binding */ debounceFunction)
/* harmony export */ });
let timer;
function debounceFunction(func, wait) {
    return function executedFunction() {
        const later = () => {
            clearTimeout(timer);
            func();
        };
        clearTimeout(timer);
        timer = window.setTimeout(later, wait); // Cast to number if TypeScript complains
    };
}


/***/ }),

/***/ "../../Desktop/Test/src/Common/JsonToHTMLConverter.ts":
/*!************************************************************!*\
  !*** ../../Desktop/Test/src/Common/JsonToHTMLConverter.ts ***!
  \************************************************************/
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

/***/ "../../Desktop/Test/src/Common/Log.ts":
/*!********************************************!*\
  !*** ../../Desktop/Test/src/Common/Log.ts ***!
  \********************************************/
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
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chalk */ "../../Desktop/Test/node_modules/chalk/source/index.js");
/* harmony import */ var _StackHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StackHelper */ "../../Desktop/Test/src/Common/StackHelper.ts");


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

/***/ "../../Desktop/Test/src/Common/StackHelper.ts":
/*!****************************************************!*\
  !*** ../../Desktop/Test/src/Common/StackHelper.ts ***!
  \****************************************************/
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

/***/ "../../Desktop/Test/src/Interfaces/api/graph/IGraphQuery.ts":
/*!******************************************************************!*\
  !*** ../../Desktop/Test/src/Interfaces/api/graph/IGraphQuery.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IGraphQueryDfaults: () => (/* binding */ IGraphQueryDfaults)
/* harmony export */ });
const IGraphQueryDfaults = {
    "fields": [
        {
            "path": "workitem.title"
        },
        {
            "path": "workitem.id"
        }
    ],
    "debug": false,
    "allowParallelExecution": true,
    "executeCalculatedFields": true,
    "responseType": "flat",
    "entityType": undefined,
    "entityId": ""
};


/***/ }),

/***/ "../../Desktop/Test/src/WebBased/Common/EventsHelper.ts":
/*!**************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/Common/EventsHelper.ts ***!
  \**************************************************************/
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

/***/ "../../Desktop/Test/src/WebBased/Common/ObjectHelper.ts":
/*!**************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/Common/ObjectHelper.ts ***!
  \**************************************************************/
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
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Common/Log */ "../../Desktop/Test/src/Common/Log.ts");

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
    return ko.toJS(koObject);
}


/***/ }),

/***/ "../../Desktop/Test/src/WebBased/Common/api/api.ts":
/*!*********************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/Common/api/api.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeDelete: () => (/* binding */ executeDelete),
/* harmony export */   executeFetch: () => (/* binding */ executeFetch),
/* harmony export */   executeGet: () => (/* binding */ executeGet),
/* harmony export */   executeGetv2: () => (/* binding */ executeGetv2),
/* harmony export */   executePost: () => (/* binding */ executePost),
/* harmony export */   executePostv2: () => (/* binding */ executePostv2),
/* harmony export */   executePut: () => (/* binding */ executePut),
/* harmony export */   getBearerToken: () => (/* binding */ getBearerToken),
/* harmony export */   getCookies: () => (/* binding */ getCookies)
/* harmony export */ });
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Common/Log */ "../../Desktop/Test/src/Common/Log.ts");
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
async function executePostv2(api, postBody) {
    //return await $ajax.post(/* webpackIgnore: true */ validateApi(api), postBody);
    return executeFetch(api, "POST", postBody);
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

/***/ "../../Desktop/Test/src/WebBased/Common/api/executeFindByGraph/executeFindByGraph.ts":
/*!*******************************************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/Common/api/executeFindByGraph/executeFindByGraph.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeFindByGraph: () => (/* binding */ executeFindByGraph)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ "../../Desktop/Test/src/WebBased/Common/api/api.ts");

function executeFindByGraph(inputOption) {
    return (0,_api__WEBPACK_IMPORTED_MODULE_0__.executePostv2)("/api/graph/workitem/query", inputOption);
}


/***/ }),

/***/ "../../Desktop/Test/src/WebBased/Common/api/executeFindByQuery/FindByQuery.ts":
/*!************************************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/Common/api/executeFindByQuery/FindByQuery.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeFindByQuery: () => (/* binding */ executeFindByQuery)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ "../../Desktop/Test/src/WebBased/Common/api/api.ts");

function executeFindByQuery(inputOption) {
    return (0,_api__WEBPACK_IMPORTED_MODULE_0__.executePost)("/api/v1/public/workItem/findByQuery", inputOption).then((result) => {
        return result;
    });
}


/***/ }),

/***/ "../../Desktop/Test/src/WebBased/Common/api/searchForAttributeWithParents.ts":
/*!***********************************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/Common/api/searchForAttributeWithParents.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   searchForAttribute: () => (/* binding */ searchForAttribute),
/* harmony export */   searchForAttributeRecursive: () => (/* binding */ searchForAttributeRecursive)
/* harmony export */ });
/* harmony import */ var _executeFindByQuery_FindByQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./executeFindByQuery/FindByQuery */ "../../Desktop/Test/src/WebBased/Common/api/executeFindByQuery/FindByQuery.ts");

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
    if (!httpResultFindByQuery) {
        console.log("No result found");
        return retValue;
    }
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

/***/ "../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts":
/*!*******************************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts ***!
  \*******************************************************************************/
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
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! uuid */ "../../Desktop/Test/node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var _Common_EventsHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/EventsHelper */ "../../Desktop/Test/src/WebBased/Common/EventsHelper.ts");
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Common/Log */ "../../Desktop/Test/src/Common/Log.ts");
/* harmony import */ var _KOConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./KOConverter */ "../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/KOConverter.ts");
/* harmony import */ var _Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Common/ObjectHelper */ "../../Desktop/Test/src/WebBased/Common/ObjectHelper.ts");
/* harmony import */ var _Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Common/api/searchForAttributeWithParents */ "../../Desktop/Test/src/WebBased/Common/api/searchForAttributeWithParents.ts");
/* harmony import */ var _DefaultSettings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DefaultSettings */ "../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/DefaultSettings.ts");
/* harmony import */ var _Common_Debound__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Common/Debound */ "../../Desktop/Test/src/Common/Debound.ts");
/* harmony import */ var _Interfaces_api_graph_IGraphQuery__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../Interfaces/api/graph/IGraphQuery */ "../../Desktop/Test/src/Interfaces/api/graph/IGraphQuery.ts");
/* harmony import */ var _Common_api_executeFindByGraph_executeFindByGraph__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Common/api/executeFindByGraph/executeFindByGraph */ "../../Desktop/Test/src/WebBased/Common/api/executeFindByGraph/executeFindByGraph.ts");
/* harmony import */ var _helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../helpers/evaluteRule */ "../../Desktop/Test/src/helpers/evaluteRule.ts");
/* harmony import */ var detect_browser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! detect-browser */ "../../Desktop/Test/node_modules/detect-browser/es/index.js");
/* harmony import */ var _Template_TemplateApplicator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Template/TemplateApplicator */ "../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/Template/TemplateApplicator.ts");














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
            this.uniqueId = (0,uuid__WEBPACK_IMPORTED_MODULE_12__["default"])();
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
        this.sharedoConfiguration.configuration = $.extend(_DefaultSettings__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_CONFIGURATION_SETTINGS, this.sharedoConfiguration.configuration); //make sure debug is set or use defaults
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
        this.sharedoId =
            this.sharedoConfiguration._host?.model.id ||
                $ui.pageContext?.sharedoId ||
                knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        if (!this.sharedoId || this.sharedoId()) {
            this.log("No sharedoId found");
        }
        this.sharedoTypeSystemName =
            this.sharedoConfiguration._host?.model?.sharedoTypeSystemName ||
                $ui.pageContext?.sharedoTypeName ||
                knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        if (!this.sharedoTypeSystemName || !this.sharedoTypeSystemName()) {
            this.log("No sharedoTypeSystemName found");
        }
        this.parentSharedoId =
            this.sharedoConfiguration._host?.model?.parentSharedoId ||
                knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        this.phaseName =
            this.sharedoConfiguration._host?.model?.phaseName ||
                $ui.pageContext?.phaseName ||
                knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
        this.phaseIsOpen =
            this.sharedoConfiguration._host?.model?.phaseIsOpen ||
                $ui.pageContext?.phaseIsOpen ||
                knockout__WEBPACK_IMPORTED_MODULE_0__.observable(undefined);
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
        this._options =
            configurationAsObservables;
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
        if (this.liveConfigDiv) {
            //leave alone if already active
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
        let applyChange = () => {
            this.applyComponentConfiguration(JSON.parse(config()).configuration);
            this.liveConfigurationRefreshed();
            this.buildErrorDiv();
        };
        setTimeout(() => {
            config.subscribe((newValue) => {
                const debouncedApplyChange = (0,_Common_Debound__WEBPACK_IMPORTED_MODULE_7__.debounceFunction)(applyChange, 3000);
                debouncedApplyChange();
                // console.log("The new value is " + newValue)
                // if (timeout) {
                //     return;
                // }
                // setTimeout(() => {
                //     timeout = false;
                //     let newConfig = JSON.parse(config())
                //     this.applyComponentConfiguration(newConfig.configuration);
                //     this.liveConfigurationRefreshed();
                //     // this.refresh(newConfig);
                //     // this.reset(newConfig);
                // }, 500);
                // timeout = true;
            });
        }, 3000);
        // ko.applyBindings(this.liveConfigData, this.liveConfigDiv);x
        // }
    }
    ensureStylesLoaded(href) {
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement("link");
            link.href = href;
            link.rel = "stylesheet";
            link.type = "text/css";
            document.head.appendChild(link);
        }
    }
    createLiveConfigDiv() {
        // Create the outer <div> with class "col-sm-12 formbuilder-editor-json"
        const outerDiv = document.createElement("div");
        outerDiv.className = "col-sm-12 formbuilder-editor-json";
        // Create the inner <div> with the specified attributes
        const innerDiv = document.createElement("div");
        innerDiv.id = "liveConfig";
        innerDiv.className = "form-control textarea";
        innerDiv.style.height = "300px";
        // innerDiv.setAttribute('data-bind', 'syntaxEditor: liveConfigData.config, enable: true, event: { focusout: liveConfigData.onFocusOut }');
        innerDiv.setAttribute("data-bind", "syntaxEditor: liveConfigData.config");
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
        if (this.lastRefresh) {
            //TODO: change this so we collect all refreshes and do them in one go
            let secondsSinceLastRefresh = (new Date().getTime() - this.lastRefresh.getTime()) / 100;
            console.log("Seconds since last refresh", secondsSinceLastRefresh);
            if (secondsSinceLastRefresh < 10) {
                console.log("Skipping refresh, too soon");
                return;
            }
        }
        this.lastRefresh = new Date();
        console.log("Refreshing component");
        let logItem = {
            eventPath: eventPath,
            methodToCall: methodToCall,
            time: new Date(),
            success: false,
        };
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
        // this.errors().forEach((error) => {
        for (let i = 0; i < this.errors().length; i++) {
            let error = this.errors()[i];
            //Look for any trapping and add to the error object
            this.addErrorTrapping(error);
            //Render the error div and add to the foreach div
            foreachDiv.appendChild(this.buildIndividualError(error));
        }
    }
    buildIndividualError(error) {
        let templateApplicator = new _Template_TemplateApplicator__WEBPACK_IMPORTED_MODULE_11__.TemplateApplicator();
        let dataContext = this.getDataContext([{ obj: error, key: "error" }]);
        let linkedTrappedError = error.linkedTrappedError;
        let individualErrorDiv = document.createElement("div");
        individualErrorDiv.className = "ide-aspect-error-individual-error";
        if (linkedTrappedError) {
            templateApplicator.addCSS(linkedTrappedError.classRules, individualErrorDiv, "dataContext", dataContext);
            templateApplicator.addStyle(linkedTrappedError.styleRules, individualErrorDiv, "dataContext", dataContext);
        }
        let userMessageDiv = document.createElement("div");
        userMessageDiv.className = "ide-aspect-error-user-message";
        let suggestionsDiv;
        let supportButtonDiv;
        let actionsDiv;
        // actionsDiv.className = "ide-aspect-error-actions";
        let internalSuggestionsDiv;
        // internalSuggestionsDiv.className = "ide-aspect-error-internal-suggestions";
        userMessageDiv.innerHTML =
            linkedTrappedError?.userFreindlyMessage ||
                error.userMessage ||
                error.message ||
                "Unknown error";
        if (linkedTrappedError?.userFreindlyHTMLMessageTemplate) {
            let userFreindlyMessage = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_10__.executeEmbeddedCode)(linkedTrappedError.userFreindlyHTMLMessageTemplate, dataContext);
            userMessageDiv.innerHTML = userFreindlyMessage;
            //Find section divs in the template if they exist
            suggestionsDiv =
                userMessageDiv.querySelector(".ide-aspect-error-suggestions") || suggestionsDiv;
            actionsDiv =
                userMessageDiv.querySelector(".ide-aspect-error-actions") || actionsDiv;
            internalSuggestionsDiv =
                userMessageDiv.querySelector(".ide-aspect-error-internal-suggestions") || internalSuggestionsDiv;
        }
        individualErrorDiv.appendChild(userMessageDiv);
        // userMessageDiv.onclick = () => {
        //     //create a div that can scoll
        //     let detailedMessageDiv = document.createElement("div");
        //     detailedMessageDiv.className = "ide-aspect-error-detailed-message";
        //     const code = escapeHtml(error.code || "");
        //     const message = escapeHtml(error.message || "");
        //     const userMessage = escapeHtml(error.userMessage || "");
        //     const errorStack = escapeHtml(error.errorStack || "");
        //     const additionalInfo = JsonToHtmlConverter.convert(error.additionalInfo || {});
        //     const html = `
        //                     <div>
        //                     <h2>Error: ${code}</h2>
        //                     <p><strong>Message:</strong> ${message}</p>
        //                     <p><strong>User Message:</strong> ${userMessage}</p>
        //                     <p><strong>Stack:</strong> ${errorStack}</p>
        //                     <p><strong>Additional Info:</strong> ${additionalInfo}</p>
        //                     </div>`;
        //     detailedMessageDiv.innerHTML = html;
        //     $ui.errorDialog(detailedMessageDiv);
        // }
        //create the sections divs if they done exists and add to the individual error div
        {
            if (!suggestionsDiv) {
                suggestionsDiv = document.createElement("div");
                individualErrorDiv.appendChild(suggestionsDiv);
            }
            if (!actionsDiv) {
                actionsDiv = document.createElement("div");
                individualErrorDiv.appendChild(actionsDiv);
            }
            if (!internalSuggestionsDiv) {
                internalSuggestionsDiv = document.createElement("div");
                individualErrorDiv.appendChild(internalSuggestionsDiv);
            }
            if (!supportButtonDiv) {
                supportButtonDiv = document.createElement("div");
                individualErrorDiv.appendChild(supportButtonDiv);
            }
        }
        let resolutionSuggestions = linkedTrappedError?.resolutionSuggestions ||
            error.internalSuggestions ||
            [];
        if (resolutionSuggestions.length > 0) {
            suggestionsDiv.className = "ide-aspect-error-suggestions";
            suggestionsDiv.innerHTML = `<b>Suggestions:</b><br/>${resolutionSuggestions.join("<br/>")}`;
        }
        let actions = error.sharedoErrorActions || [];
        if (actions.length > 0) {
            actionsDiv.innerHTML = `<b>Actions:</b><br/>${actions.join("<br/>")}`;
        }
        let internalSuggestions = error.internalSuggestions || [];
        if (internalSuggestions.length > 0) {
            internalSuggestionsDiv.innerHTML = `<b>Internal Suggestions:</b><br/>${internalSuggestions.join("<br/>")}`;
        }
        let supportButton = linkedTrappedError?.supportButton ||
            this.configuration?.errorManagement?.unTrappedErrorsSupportButton;
        if (supportButton && supportButton.enabled) {
            let actionDiv = document.createElement("div");
            actionDiv.className = "ide-aspect-error-support-action";
            individualErrorDiv.appendChild(actionDiv);
            let button = document.createElement("button");
            button.className = "btn btn-primary";
            button.onclick = () => {
                this.createOpenPanel(supportButton, dataContext);
            };
            templateApplicator.addCSS(supportButton.classRules, actionDiv, "dataContext", dataContext);
            templateApplicator.addStyle(supportButton.styleRules, actionDiv, "dataContext", dataContext);
            button.innerText = supportButton.title;
            actionDiv.appendChild(button);
        }
        return individualErrorDiv;
    }
    createOpenPanel(supportButton, dataContext) {
        if (!supportButton) {
            return;
        }
        let buttonConfig = supportButton.raiseSupportTicketSharedoCommand;
        let supportTicketMessage = buttonConfig.description || supportButton.supportTicketMessage || "";
        let config = {
            title: (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_10__.executeEmbeddedCode)(buttonConfig.title, dataContext),
            typeSystemName: (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_10__.executeEmbeddedCode)(buttonConfig.typeSystemName, dataContext),
            description: (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_10__.executeEmbeddedCode)(supportTicketMessage, dataContext)
        };
        $ui.nav.invoke({
            invokeType: "panel",
            invoke: "Sharedo.Core.Case.Sharedo.AddEditSharedo",
            config: config,
        });
    }
    addErrorTrapping(error) {
        //run rules in error traps to see if this error has been trapped bhy a rule
        let errorTrapped = false;
        // let errorTraps = gvko<IErrorTrap[]>(this._options?.errorManagement()?.errorTraps) || [];
        let errorTraps = this.configuration?.errorManagement?.errorTraps || [];
        // errorTraps.forEach((trap) => {
        for (let errorTrapsIndex = 0; errorTrapsIndex < errorTraps.length; errorTrapsIndex++) {
            let trap = errorTraps[errorTrapsIndex];
            if (trap.enabled === false) {
                continue;
            }
            try {
                let dataContext = this.getDataContext([{ obj: error, key: "error" }]);
                (0,_Common_Log__WEBPACK_IMPORTED_MODULE_2__.l)(`Evaluating rule [${trap.rule}] on error ${error} with dataContext:`, dataContext);
                let ruleResult = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_10__.evaluteRule)(trap.rule, dataContext);
                if (ruleResult) {
                    errorTrapped = true;
                    error.linkedTrappedError = trap;
                    break;
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    getDataContext(additional) {
        const browser = (0,detect_browser__WEBPACK_IMPORTED_MODULE_13__.detect)();
        let dataContext = {
            thisComponentName: this.thisComponentName,
            user: knockout__WEBPACK_IMPORTED_MODULE_0__.toJS($ui.pageContext?.user),
            pageContext: knockout__WEBPACK_IMPORTED_MODULE_0__.toJS($ui.pageContext),
            aspectData: knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this.baseModel),
            configuration: knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._options),
            browser: browser,
        };
        let additionalData = additional || [];
        for (let i = 0; i < additionalData.length; i++) {
            let item = additionalData[i];
            dataContext[item.key] = item.obj;
        }
        return dataContext;
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
    /**
     * Gets the data to load, defaults to LocationToSaveOrLoadData unless a fieldPath is passed in
     * @param fieldPath
     * @returns
     */
    async getData(fieldPath) {
        if (this._data) {
            return this._data;
        }
        fieldPath = fieldPath || this.LocationToSaveOrLoadData;
        //This section is d=use due to typing issue that needs to be resolved.
        // let useParents = gvko(this._options.dataSettings().getValueUsingParents) as boolean | undefined
        // let shareDoId= gvko(this.sharedoId)
        // let maxDepth = gvko(this._options.dataSettings().maxDepth) as number | undefined
        // let LocationToSaveOrLoadData = gvko(this.LocationToSaveOrLoadData) as string | undefined
        //end area of typing issue
        let useParents = this._options?.dataSettings().getValueUsingParents();
        let shareDoId = this.sharedoId();
        let maxDepth = this._options?.dataSettings().maxDepth();
        // let LocationToSaveOrLoadData = gvko(this.LocationToSaveOrLoadData);
        if (fieldPath === undefined) {
            this.log("No location to load data from set - this method should be overriden", "red");
            return this._data;
        }
        this._data = (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_4__.getNestedProperty)(this.model, fieldPath);
        if (this._data !== undefined) {
            this.l("Data found at location", this._data);
            this._data = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._data);
            return this._data;
        }
        //if data ot found in the current model, look via the search
        if (this._data === undefined && useParents === false && shareDoId) {
            //! TODO Fix Typings
            return (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_5__.searchForAttributeRecursive)(shareDoId, fieldPath, false).then((data) => {
                if (data.found) {
                    this._data = data.value;
                }
                return this._data;
            });
        }
        if (this._data === undefined && useParents === true) {
            //! TODO Fix Typings
            let idToUser = this.sharedoId() || this.parentSharedoId();
            if (!idToUser) {
                this.log("No id to use for search both sharedoId and parentSharedoId are undefined");
                return this._data;
            }
            return (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_5__.searchForAttributeRecursive)(idToUser, fieldPath, useParents, maxDepth).then((data) => {
                if (data.found) {
                    this._data = data.value;
                }
                return this._data;
            });
        }
    }
    searchForAttributeRecursive(id, attribute, useParents, maxDepth) {
        return (0,_Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_5__.searchForAttributeRecursive)(id, attribute, useParents, maxDepth);
    }
    async searchByGraph(fieldPath, useParent = false) {
        let inputOption = JSON.parse(JSON.stringify(_Interfaces_api_graph_IGraphQuery__WEBPACK_IMPORTED_MODULE_8__.IGraphQueryDfaults));
        let shareDoId = this.sharedoId();
        let parentId = this.parentSharedoId();
        let query = {
            path: fieldPath,
        };
        inputOption.fields.push(query);
        if (useParent === false && shareDoId) {
            //! TODO Fix Typings
            inputOption.entityId = shareDoId;
        }
        else if (useParent === true && parentId) {
            //! TODO Fix Typings
            inputOption.entityId = parentId;
        }
        if (!inputOption.entityId) {
            this.log("No id to use for search both sharedoId and parentSharedoId are undefined");
            return;
        }
        let result = await (0,_Common_api_executeFindByGraph_executeFindByGraph__WEBPACK_IMPORTED_MODULE_9__.executeFindByGraph)(inputOption);
        if (result.info.success === false) {
            this.log("Error executing search", "red", result.info);
            return;
        }
        return result.data?.data[fieldPath];
    }
    setData(value) {
        let valueToPersist = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(value);
        let previousValue = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this._data);
        this._data = valueToPersist;
        this.fireValueChangedEvent("onDataBeforeChanged", {
            previousValue: previousValue,
            newValue: valueToPersist,
        });
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
        let debugSetting = (0,_DefaultSettings__WEBPACK_IMPORTED_MODULE_6__.DEBUG_DEFAULT)();
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
            data: data,
        };
        (0,_Common_EventsHelper__WEBPACK_IMPORTED_MODULE_1__.fireEvent)(event);
    }
    fireValueChangedEvent(eventName, changedData) {
        let event = {
            eventPath: this.thisComponentName + "." + eventName,
            eventName: eventName,
            source: this,
            data: changedData,
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
        model.aspectData.formBuilder = model.aspectData.formBuilder || {
            formData: {},
        };
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

/***/ "../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/DefaultSettings.ts":
/*!*********************************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/DefaultSettings.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEBUG_DEFAULT: () => (/* binding */ DEBUG_DEFAULT),
/* harmony export */   DEFAULT_CONFIGURATION_SETTINGS: () => (/* binding */ DEFAULT_CONFIGURATION_SETTINGS),
/* harmony export */   DEFAULT_ERROR_MANAGEMENT_SETTINGS: () => (/* binding */ DEFAULT_ERROR_MANAGEMENT_SETTINGS),
/* harmony export */   DEFAULT_ERROR_MANAGEMENT_TRAPS: () => (/* binding */ DEFAULT_ERROR_MANAGEMENT_TRAPS),
/* harmony export */   DEFAULT_SHAREDO_COMMAND: () => (/* binding */ DEFAULT_SHAREDO_COMMAND),
/* harmony export */   DEFAULT_SUPPORT_BUTTON: () => (/* binding */ DEFAULT_SUPPORT_BUTTON),
/* harmony export */   REFRESH_ON_DEFAULTS: () => (/* binding */ REFRESH_ON_DEFAULTS)
/* harmony export */ });
const DEBUG_DEFAULT = () => {
    //! this is a function for debug purpose only
    let retValue = {
        enabled: true,
        logToConsole: true,
        showInAspect: false,
        liveConfig: false,
    };
    return retValue;
};
const DEFAULT_SHAREDO_COMMAND = {
    typeSystemName: "task",
    title: "Support Required for ${dataContext.pageContext.user.firstname} ${dataContext.pageContext.user.lastname} on ${dataContext.pageContext.pageTitle}",
    description: undefined
};
const DEFAULT_SUPPORT_BUTTON = {
    raiseSupportTicket: true,
    supportTicketMessage: "Support Required for ${dataContext.pageContext.user.firstname} ${dataContext.pageContext.user.lastname} on ${dataContext.pageContext.pageTitle} context ${JSON.stringify(dataContext)}",
    raiseSupportTicketSharedoCommand: DEFAULT_SHAREDO_COMMAND,
    dataContext: "Populated by the system",
    title: "Raise Support Ticket",
    styleRules: undefined,
    classRules: undefined,
    toolTip: "Raise a support ticket with the support desk",
    enabled: false
};
const REFRESH_ON_DEFAULTS = {
    sharedoIdChanged: false,
    sharedoParentIdChanged: false,
    sharedoPhaseChanged: false,
};
const DEFAULT_ERROR_MANAGEMENT_TRAPS = [
    {
        dataContext: null,
        enabled: true,
        rule: "dataContext.error.message.toLowerCase().includes('forbidden')",
        userFreindlyMessage: "The matter is not accessible to you. It may be behind a Information Barrier.",
        resolutionSuggestions: ["Please contact the matter owner for access."],
        userFreindlyHTMLMessageTemplate: undefined,
        supportButton: DEFAULT_SUPPORT_BUTTON,
        styleRules: [
            {
                rule: "true",
                style: "box-shadow: 1px 1px 10px #d46060;",
            },
        ],
        classRules: [
            {
                rule: "true",
                cssClass: "ems-selected-item",
            },
            {
                rule: "true",
                cssClass: "ems-show",
            },
        ],
    },
];
//classRules: ems-selected-item ems-show' style='box-shadow: 1px 1px 10px #d46060;',
//
//"Support Required for ${dataContext.pageContext.user.firstname} ${dataContext.pageContext.user.lastname} on ${dataContext.pageContext.pageTitle}"
const DEFAULT_ERROR_MANAGEMENT_SETTINGS = {
    errorTraps: DEFAULT_ERROR_MANAGEMENT_TRAPS,
    enabled: true,
    displayUnTrappedErrorInAspect: true,
    unTrappedErrorsSupportButton: undefined,
};
const DEFAULT_CONFIGURATION_SETTINGS = {
    debug: DEBUG_DEFAULT(),
    refreshOn: REFRESH_ON_DEFAULTS,
    eventsToReactTo: [
        {
            eventPath: "sharedo.updated",
            methodToCall: "refresh",
        },
        {
            eventPath: "sharedo.core.case.sharedo-updated",
            methodToCall: "refresh",
        },
    ],
    dataSettings: {
        getValueUsingParents: false,
        maxDepth: 0,
    },
    errorManagement: DEFAULT_ERROR_MANAGEMENT_SETTINGS,
};


/***/ }),

/***/ "../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/KOConverter.ts":
/*!*****************************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/KOConverter.ts ***!
  \*****************************************************************************/
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

/***/ "../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/Template/TemplateApplicator.ts":
/*!*********************************************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/Template/TemplateApplicator.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplateApplicator: () => (/* binding */ TemplateApplicator)
/* harmony export */ });
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Common/Log */ "../../Desktop/Test/src/Common/Log.ts");
/* harmony import */ var _helpers_VakueExtractor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../helpers/VakueExtractor */ "../../Desktop/Test/src/helpers/VakueExtractor.ts");
/* harmony import */ var _helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../helpers/evaluteRule */ "../../Desktop/Test/src/helpers/evaluteRule.ts");



class TemplateApplicator {
    constructor() {
    }
    setupElement(element, valueAccessor, allBindings, viewModel, bindingContext) {
        let instruction = allBindings().matterSearchBinding;
        if (!instruction) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.err)("No instruction defined"));
            return;
        }
        if (instruction.type == "IFieldPlacement") {
            let rowField = instruction.object;
            this.buildPlacements(rowField, "dataContextName", viewModel, element);
        }
    }
    updateElement(element, valueAccessor, allBindings, viewModel, bindingContext) {
        (0,_Common_Log__WEBPACK_IMPORTED_MODULE_0__.l)("updateElement", element, valueAccessor, allBindings, viewModel, bindingContext);
    }
    buildPlacements(placement, dataContextName, viewModel, container) {
        let rowCounter = 0;
        const rootDiv = document.createElement('div');
        container.appendChild(rootDiv);
        if (placement.container) {
            container.classList.add('ems-container');
            let containerParent = container.parentElement;
            if (containerParent) {
                containerParent.classList.add('ems-container-parent');
                this.addCSS(placement.container.cssClass, containerParent, dataContextName, viewModel);
                this.addStyle(placement.container.style, containerParent, dataContextName, viewModel);
            }
        }
        // rootDiv.classList.add('flex-row');
        rootDiv.classList.add('ems-placement-item');
        rootDiv.id = 'resultItem';
        this.addCSS(placement.cssClass, rootDiv, dataContextName, viewModel);
        this.addStyle(placement.style, rootDiv, dataContextName, viewModel);
        if (placement.icon) {
            this.addIcons(placement.icon, dataContextName, rootDiv, viewModel);
        }
        const divRowContainer = document.createElement('div');
        divRowContainer.classList.add('ems-row-container');
        rootDiv.appendChild(divRowContainer);
        placement.rows?.forEach(row => {
            rowCounter++;
            const rowDiv = document.createElement('div');
            rowDiv.style.alignItems = row.alignItems || 'space-between';
            rowDiv.classList.add('ems-row' + rowCounter);
            rowDiv.classList.add('ems-row');
            this.addCSS(row.cssClass, rowDiv, dataContextName, viewModel);
            this.addStyle(row.style, rowDiv, dataContextName, viewModel);
            row.fields?.forEach(field => {
                this.addField(field, dataContextName, rowDiv, viewModel);
            });
            divRowContainer.appendChild(rowDiv);
        });
    }
    addField(field, dataContextName, rowDiv, viewModel) {
        const fieldDiv = document.createElement('div');
        fieldDiv.classList.add('ems-row-group');
        this.addCSS(field.cssClass, fieldDiv, dataContextName, viewModel);
        if (field.width)
            fieldDiv.style.width = `${field.width}px`;
        if (field.position)
            fieldDiv.style.textAlign = field.position;
        this.addStyle(field.style, fieldDiv, dataContextName, viewModel);
        if (field.label) {
            const labelElem = document.createElement('label');
            labelElem.textContent = field.label;
            labelElem.classList.add('ems-label');
            fieldDiv.appendChild(labelElem);
        }
        this.addIcons(field.icon, dataContextName, fieldDiv, viewModel); //TODO
        const spanElem = document.createElement('span');
        // addCustomBinding(spanElem, field,"IFieldRowField");
        // else {
        //   spanElem.setAttribute('data-bind', `text:${dataContextName}.${field.field}`);
        // }
        spanElem.classList.add('ems-field-value');
        if (field.field instanceof Array) {
            this.addFieldArray(field.field, field.formatter, spanElem, viewModel);
        }
        if (typeof field.field === "string") {
            this.setInnerHTML(field.field, field.formatter, viewModel, spanElem);
        }
        fieldDiv.appendChild(spanElem);
        rowDiv.appendChild(fieldDiv);
    }
    setInnerHTML(value, formatter, viewModel, element) {
        let valueToSet = (0,_helpers_VakueExtractor__WEBPACK_IMPORTED_MODULE_1__.extractValue)(value, viewModel, formatter);
        element.innerHTML = valueToSet;
    }
    addIcons(icons, dataContextName, fieldDiv, viewModel) {
        if (!icons)
            return;
        if (typeof icons === "string") {
            icons = [{ icon: icons }];
        }
        icons.forEach(iconRule => {
            // <div class="column-auto" style="margin-right:5px">
            // <span class="fa card-icon" data-bind="css:icon"></span>
            // </div>
            const iconElem = document.createElement('span');
            iconElem.className = 'fa card-icon ' + iconRule.icon;
            iconElem.classList.add('ems-icon');
            if (iconRule.cssClass)
                iconElem.classList.add(iconRule.cssClass);
            if (typeof iconRule.style === "string")
                iconElem.setAttribute('style', iconRule.style);
            if (iconRule.rule) {
                console.log("iconRule.rule", iconRule.rule);
                // let fullRulePath = `${iconRule.rule}`
                // if (dataContextName) {
                //   fullRulePath = `${dataContextName}.${iconRule.rule}`;
                // }
                // iconElem.setAttribute('data-bind', `visible:$root.evalFunc("${fullRulePath}",${dataContextName}, "${dataContextName}")`);
                let value = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.evaluteRule)(iconRule.rule, viewModel);
                if (!value) {
                    iconElem.style.display = "none";
                }
            }
            if (iconRule.position === 'before') {
                fieldDiv.insertBefore(iconElem, fieldDiv.firstChild);
            }
            if (iconRule.position === 'after') {
                fieldDiv.appendChild(iconElem);
            }
            if (!iconRule.position) {
                fieldDiv.appendChild(iconElem);
            }
        });
    }
    addCSS(cssClass, rootDiv, dataContextName, viewModel) {
        if (typeof cssClass === "string") {
            cssClass = [{ cssClass: cssClass }];
        }
        if (cssClass instanceof Array) {
            let arrItem = cssClass;
            for (let i = 0; i < arrItem.length; i++) {
                let cssRule = arrItem[i];
                let cssValue = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.executeEmbeddedCode)(cssRule.cssClass, viewModel);
                if (cssRule.rule) {
                    let currentDataBind = rootDiv.getAttribute('data-bind') || '';
                    if (currentDataBind) {
                        currentDataBind += ',';
                    }
                    //rootDiv.setAttribute('data-bind', `${currentDataBind} css: { ${cssRule.cssClass} : $root.evalFunc("${dataContextName}.${cssRule.rule}",${dataContextName}, "${dataContextName}") }`);
                    let rule = cssRule.rule;
                    let value = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.evaluteRule)(rule, viewModel);
                    if (value) {
                        rootDiv.classList.add(cssValue);
                    }
                }
                else {
                    rootDiv.classList.add(cssValue);
                }
            }
        }
    }
    addFieldArray(fields, formatter, fieldDiv, viewModel) {
        if (!fields)
            return;
        fields.forEach(field => {
            if (field.rule) {
                console.log("fieldRule.rule", field.rule);
                let value = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.evaluteRule)(field.rule, viewModel);
                if (value) {
                    this.setInnerHTML(field.field, formatter, viewModel, fieldDiv);
                    // fieldDiv.innerHTML = fieldValue;
                }
            }
            else {
                this.setInnerHTML(field.field, formatter, viewModel, fieldDiv);
            }
        });
    }
    addStyle(style, rootDiv, dataContextName, viewModel) {
        if (style == undefined)
            return;
        if (typeof style === "string") {
            style = [{ style: style }];
        }
        // if(!Array.isArray(style))
        // {
        //   style = [style];
        // }
        if (style instanceof Array) {
            let arrItem = style;
            for (let i = 0; i < arrItem.length; i++) {
                let styleRule = arrItem[i].rule;
                if (styleRule) {
                    let currentDataBind = rootDiv.getAttribute('data-bind') || '';
                    if (currentDataBind) {
                        currentDataBind += ',';
                    }
                    //rootDiv.setAttribute('data-bind', `${currentDataBind} css: { ${cssRule.cssClass} : $root.evalFunc("${dataContextName}.${cssRule.rule}",${dataContextName}, "${dataContextName}") }`);
                    let value = (0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.evaluteRule)(styleRule, viewModel);
                    if (value) {
                        this.setStyles(style, viewModel, dataContextName, rootDiv);
                    }
                }
                else {
                    this.setStyles(style, viewModel, dataContextName, rootDiv);
                }
            }
        }
        else {
            this.setStyles(style, viewModel, dataContextName, rootDiv);
        }
    }
    setStyles(style, data, dataContextName, rootDiv) {
        let retValue = {};
        if (!style) {
            return "";
        }
        ;
        if (typeof style === "string") {
            let n = {
                style: style
            };
            return this.buildStyleNameValue(n, retValue);
        }
        if (Array.isArray(style)) {
            let arrItem = style;
            if (Array.isArray(arrItem)) {
                for (let i = 0; i < arrItem.length; i++) {
                    let styleRuleOrNameValue = arrItem[i];
                    if (styleRuleOrNameValue.rule) {
                        if ((0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.evaluteRule)(styleRuleOrNameValue.rule, data)) {
                            if (!styleRuleOrNameValue.style)
                                continue;
                            retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
                        }
                    }
                    else {
                        retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
                    }
                }
            }
            for (let i = 0; i < arrItem.length; i++) {
                let styleRuleOrNameValue = arrItem[i];
                if (styleRuleOrNameValue.rule) {
                    if ((0,_helpers_evaluteRule__WEBPACK_IMPORTED_MODULE_2__.evaluteRule)(styleRuleOrNameValue.rule, data)) {
                        if (!styleRuleOrNameValue.style)
                            continue;
                        retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
                    }
                }
                else {
                    retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
                }
            }
        }
        else {
            if (typeof style === "object") { //must be a NameValue
                retValue = style;
            }
        }
        //loop through the retValue and add styles to element
        for (let key in retValue) {
            if (retValue.hasOwnProperty(key)) {
                rootDiv.style[key] = retValue[key];
            }
        }
    }
    buildStyleNameValue(rule, retValue) {
        if (typeof rule.style === "object") {
            retValue = { ...retValue, ...rule.style };
        }
        if (typeof rule.style === "string") {
            let styleItems = rule.style.split(";");
            for (let i = 0; i < styleItems.length; i++) {
                let styleItem = styleItems[i];
                let nameValue = styleItem.split(":");
                if (nameValue.length == 2) {
                    retValue[nameValue[0].trim()] = nameValue[1].trim();
                }
            }
        }
        return retValue;
    }
}


/***/ }),

/***/ "../../Desktop/Test/src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspectConfig.ts":
/*!***********************************************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspectConfig.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Default: () => (/* binding */ Default),
/* harmony export */   WidgetSettings: () => (/* binding */ WidgetSettings)
/* harmony export */ });
/* harmony import */ var _BaseClasses_DefaultSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BaseClasses/DefaultSettings */ "../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/DefaultSettings.ts");

const Default = {
    fieldPath: "title",
    title: null,
    calculatedValue: "",
    calculatedTitle: "",
    valueOnNotFound: "Not Found",
    formatter: "value",
    debug: (0,_BaseClasses_DefaultSettings__WEBPACK_IMPORTED_MODULE_0__.DEBUG_DEFAULT)(),
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
    },
    errorManagement: _BaseClasses_DefaultSettings__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_ERROR_MANAGEMENT_SETTINGS,
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

/***/ "../../Desktop/Test/src/helpers/Formatter.ts":
/*!***************************************************!*\
  !*** ../../Desktop/Test/src/helpers/Formatter.ts ***!
  \***************************************************/
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

/***/ "../../Desktop/Test/src/helpers/VakueExtractor.ts":
/*!********************************************************!*\
  !*** ../../Desktop/Test/src/helpers/VakueExtractor.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractValue: () => (/* binding */ extractValue)
/* harmony export */ });
/* harmony import */ var _evaluteRule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./evaluteRule */ "../../Desktop/Test/src/helpers/evaluteRule.ts");
/* harmony import */ var _Formatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Formatter */ "../../Desktop/Test/src/helpers/Formatter.ts");


/**
 * This function will extract the value from the value string.
 * The value string can be a simple string, or a function call.
 * @param value The value to extract or calculated value
 * @param viewModel The view model to use for the function call and data context
 * @param formatter A formatter to use on the value e.g. value.ToUpper()
 * @returns
 */
function extractValue(value, viewModel, formatter, dataContextName) {
    let valueToSet = (0,_evaluteRule__WEBPACK_IMPORTED_MODULE_0__.executeEmbeddedCode)(value, viewModel, dataContextName);
    if (typeof valueToSet !== "string") {
        valueToSet = JSON.stringify(valueToSet, null, 2);
    }
    if (formatter) {
        valueToSet = (0,_Formatter__WEBPACK_IMPORTED_MODULE_1__.formatFunc)(valueToSet, formatter);
    }
    return valueToSet;
}


/***/ }),

/***/ "../../Desktop/Test/src/helpers/evaluteRule.ts":
/*!*****************************************************!*\
  !*** ../../Desktop/Test/src/helpers/evaluteRule.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkAndLogUndefined: () => (/* binding */ checkAndLogUndefined),
/* harmony export */   evaluteRule: () => (/* binding */ evaluteRule),
/* harmony export */   executeEmbeddedCode: () => (/* binding */ executeEmbeddedCode),
/* harmony export */   executeFunc: () => (/* binding */ executeFunc)
/* harmony export */ });
/* harmony import */ var _Common_JsonToHTMLConverter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common/JsonToHTMLConverter */ "../../Desktop/Test/src/Common/JsonToHTMLConverter.ts");
/* harmony import */ var _Common_Log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/Log */ "../../Desktop/Test/src/Common/Log.ts");
/* harmony import */ var _Common_Base64Encoding__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common/Base64Encoding */ "../../Desktop/Test/src/Common/Base64Encoding.ts");



function evaluteRule(rule, dataContext, dataContextName) {
    if (!rule) {
        return false;
    }
    try {
        const returnValue = executeFunc(rule, dataContext, dataContextName);
        if (typeof returnValue === 'boolean') {
            return returnValue;
        }
        else {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.err)((`Rule [${rule}] did not return a boolean value. It returned: ${returnValue}`)));
            return false; // Default value if the rule doesn't return a boolean
        }
    }
    catch (e) {
        console.log(`Error evaluating rule [${rule}] with data context`, e);
        return false; // Default value in case of an error
    }
}
function executeFunc(expression, dataContext, dataContextName) {
    // Create a new function based on the formatter
    (0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.inf)(`evaluteRule(${expression})`), dataContext);
    if (expression === "") {
        return "";
    }
    if (!expression) {
        return undefined;
    }
    let dynamicFunc;
    try {
        let dataContextNameToUse = 'dataContext';
        //replace the dataContextName with the dataContextNameToUse
        // Replace the dataContextName with the dataContextNameToUse
        if (dataContextName) {
            // Escape special characters in the string for use in regular expressions
            const escapedDataContextName = dataContextName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedDataContextName, 'g');
            expression = expression.replace(regex, dataContextNameToUse);
        }
        checkAndLogUndefined(dataContext, expression, dataContextNameToUse);
        dynamicFunc = new Function(`${dataContextNameToUse}`, `return (${expression});`);
    }
    catch (e) {
        let errMessage = `Error creating function for expression [${expression}]`;
        (0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.err)(errMessage), e);
        return errMessage;
    }
    (0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.inf)(`evaluteRule(${expression}) - dynamicFunc: `), dynamicFunc);
    try {
        const returnValue = dynamicFunc(dataContext);
        return returnValue;
    }
    catch (e) {
        console.log(`Error evaluating rule [${expression}] with data context`, e);
        return `${e}`; // Default value in case of an error
    }
}
function checkAndLogUndefined(obj, rule, dataContextName) {
    const props = rule.split('.');
    let current = {};
    current[dataContextName] = obj;
    for (let i = 0; i < props.length; i++) {
        if (current[props[i]] === undefined) {
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.err)(`Error while evaluating a rule ${rule}! The property ${dataContextName}.${props.slice(0, i + 1).join('.')} is undefined.`));
            (0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.l)((0,_Common_Log__WEBPACK_IMPORTED_MODULE_1__.err)(`Check the configuration of the rule ${rule}!`));
            return undefined;
        }
        current = current[props[i]];
    }
    return current;
}
/**
 * Example: "title: ${title.toUpperCase()} Matter Search ${2 + 2}"
 * Resurn: "title: TITLE MATTER SEARCH 4"
 * @param input
 * @param dataContext
 * @param dataContextName
 * @returns
 */
function executeEmbeddedCode(input, dataContext, dataContextName) {
    if (!input) {
        return "";
    }
    return input.replace(/\$\{(.+?)\}/g, (_, code) => {
        try {
            // WARNING: Eval can execute arbitrary code and is unsafe
            // Only use with trusted input
            dataContext["helpers"] = dataContext["helpers"] || {};
            dataContext["helpers"].utf8ToBase64 = _Common_Base64Encoding__WEBPACK_IMPORTED_MODULE_2__.utf8ToBase64;
            let val = executeFunc(code, dataContext, dataContextName);
            if (val === undefined) {
                val = '';
            }
            // val = JSON.stringify(val, undefined, 2);
            val = _Common_JsonToHTMLConverter__WEBPACK_IMPORTED_MODULE_0__.JsonToHtmlConverter.convert(val);
            //remove outter " from val
            // val = val.substring(1, val.length - 1);
            return val;
        }
        catch (error) {
            console.error('Failed to execute embedded code:', error);
            let val = '';
            if (error.message) {
                val = error.message;
            }
            else {
                val = JSON.stringify(error);
            }
            return JSON.stringify(val);
        }
    });
}


/***/ }),

/***/ "knockout":
/*!*********************!*\
  !*** external "ko" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = ko;

/***/ }),

/***/ "../../Desktop/Test/node_modules/chalk/source/index.js":
/*!*************************************************************!*\
  !*** ../../Desktop/Test/node_modules/chalk/source/index.js ***!
  \*************************************************************/
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
/* harmony import */ var _ansi_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor/ansi-styles/index.js */ "../../Desktop/Test/node_modules/chalk/source/vendor/ansi-styles/index.js");
/* harmony import */ var _supports_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #supports-color */ "../../Desktop/Test/node_modules/chalk/source/vendor/supports-color/browser.js");
/* harmony import */ var _utilities_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities.js */ "../../Desktop/Test/node_modules/chalk/source/utilities.js");




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

/***/ "../../Desktop/Test/node_modules/chalk/source/utilities.js":
/*!*****************************************************************!*\
  !*** ../../Desktop/Test/node_modules/chalk/source/utilities.js ***!
  \*****************************************************************/
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

/***/ "../../Desktop/Test/node_modules/chalk/source/vendor/ansi-styles/index.js":
/*!********************************************************************************!*\
  !*** ../../Desktop/Test/node_modules/chalk/source/vendor/ansi-styles/index.js ***!
  \********************************************************************************/
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

/***/ "../../Desktop/Test/node_modules/chalk/source/vendor/supports-color/browser.js":
/*!*************************************************************************************!*\
  !*** ../../Desktop/Test/node_modules/chalk/source/vendor/supports-color/browser.js ***!
  \*************************************************************************************/
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
/*!*****************************************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspect.ts ***!
  \*****************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingleValueAspect: () => (/* binding */ SingleValueAspect)
/* harmony export */ });
/* harmony import */ var _helpers_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/Formatter */ "../../Desktop/Test/src/helpers/Formatter.ts");
/* harmony import */ var _Common_api_searchForAttributeWithParents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/api/searchForAttributeWithParents */ "../../Desktop/Test/src/WebBased/Common/api/searchForAttributeWithParents.ts");
/* harmony import */ var _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../BaseClasses/BaseIDEAspect */ "../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts");
/* harmony import */ var _SingleValueAspectConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SingleValueAspectConfig */ "../../Desktop/Test/src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspectConfig.ts");




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENBOztBQUVBLHFEQUFxRCxjQUFjOztBQUVuRSxzREFBc0QsYUFBYSxFQUFFLEVBQUUsS0FBSzs7QUFFNUUsb0VBQW9FLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSzs7QUFFMUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVPO0FBQ0E7QUFDQTtBQUNBOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0IscUJBQXFCLFNBQVM7QUFDOUI7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsNkJB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LEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDeEU7aUJBRUQ7Z0JBQ0ksSUFBSSxjQUFjLEdBQUcsK0RBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksT0FBTyxDQUFDLENBQUM7Z0JBQ25GLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN2RDtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUFBLENBQUM7SUFFTyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQVU7UUFFNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6Qyx1QkFBdUI7SUFFM0IsQ0FBQztJQUFBLENBQUM7Q0FDTCIsInNvdXJjZXMiOlsid2VicGFjazovL0lERUFzcGVjdHMvLi4vLi4vRGVza3RvcC9UZXN0L25vZGVfbW9kdWxlcy9kZXRlY3QtYnJvd3Nlci9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4uLy4uL0Rlc2t0b3AvVGVzdC9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4uLy4uL0Rlc2t0b3AvVGVzdC9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi4vLi4vRGVza3RvcC9UZXN0L25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi4vLi4vRGVza3RvcC9UZXN0L25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi4vLi4vRGVza3RvcC9UZXN0L25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvQ29tbW9uL0Jhc2U2NEVuY29kaW5nLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9Db21tb24vRGVib3VuZC50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvQ29tbW9uL0pzb25Ub0hUTUxDb252ZXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL0NvbW1vbi9Mb2cudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL0NvbW1vbi9TdGFja0hlbHBlci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvSW50ZXJmYWNlcy9hcGkvZ3JhcGgvSUdyYXBoUXVlcnkudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL0NvbW1vbi9FdmVudHNIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL0NvbW1vbi9PYmplY3RIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvYXBpLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9XZWJCYXNlZC9Db21tb24vYXBpL2V4ZWN1dGVGaW5kQnlHcmFwaC9leGVjdXRlRmluZEJ5R3JhcGgudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvZXhlY3V0ZUZpbmRCeVF1ZXJ5L0ZpbmRCeVF1ZXJ5LnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9XZWJCYXNlZC9Db21tb24vYXBpL3NlYXJjaEZvckF0dHJpYnV0ZVdpdGhQYXJlbnRzLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3QudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvRGVmYXVsdFNldHRpbmdzLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0tPQ29udmVydGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL1RlbXBsYXRlL1RlbXBsYXRlQXBwbGljYXRvci50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9TaW5nbGVWYWx1ZUFzcGVjdC9TaW5nbGVWYWx1ZUFzcGVjdENvbmZpZy50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvaGVscGVycy9Gb3JtYXR0ZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL2hlbHBlcnMvVmFrdWVFeHRyYWN0b3IudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL2hlbHBlcnMvZXZhbHV0ZVJ1bGUudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy9leHRlcm5hbCB2YXIgXCJrb1wiIiwid2VicGFjazovL0lERUFzcGVjdHMvLi4vLi4vRGVza3RvcC9UZXN0L25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS92ZW5kb3IvYW5zaS1zdHlsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS92ZW5kb3Ivc3VwcG9ydHMtY29sb3IvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9TaW5nbGVWYWx1ZUFzcGVjdC9TaW5nbGVWYWx1ZUFzcGVjdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG52YXIgQnJvd3NlckluZm8gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnJvd3NlckluZm8obmFtZSwgdmVyc2lvbiwgb3MpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5vcyA9IG9zO1xuICAgICAgICB0aGlzLnR5cGUgPSAnYnJvd3Nlcic7XG4gICAgfVxuICAgIHJldHVybiBCcm93c2VySW5mbztcbn0oKSk7XG5leHBvcnQgeyBCcm93c2VySW5mbyB9O1xudmFyIE5vZGVJbmZvID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5vZGVJbmZvKHZlcnNpb24pIHtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy50eXBlID0gJ25vZGUnO1xuICAgICAgICB0aGlzLm5hbWUgPSAnbm9kZSc7XG4gICAgICAgIHRoaXMub3MgPSBwcm9jZXNzLnBsYXRmb3JtO1xuICAgIH1cbiAgICByZXR1cm4gTm9kZUluZm87XG59KCkpO1xuZXhwb3J0IHsgTm9kZUluZm8gfTtcbnZhciBTZWFyY2hCb3REZXZpY2VJbmZvID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNlYXJjaEJvdERldmljZUluZm8obmFtZSwgdmVyc2lvbiwgb3MsIGJvdCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLm9zID0gb3M7XG4gICAgICAgIHRoaXMuYm90ID0gYm90O1xuICAgICAgICB0aGlzLnR5cGUgPSAnYm90LWRldmljZSc7XG4gICAgfVxuICAgIHJldHVybiBTZWFyY2hCb3REZXZpY2VJbmZvO1xufSgpKTtcbmV4cG9ydCB7IFNlYXJjaEJvdERldmljZUluZm8gfTtcbnZhciBCb3RJbmZvID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJvdEluZm8oKSB7XG4gICAgICAgIHRoaXMudHlwZSA9ICdib3QnO1xuICAgICAgICB0aGlzLmJvdCA9IHRydWU7IC8vIE5PVEU6IGRlcHJlY2F0ZWQgdGVzdCBuYW1lIGluc3RlYWRcbiAgICAgICAgdGhpcy5uYW1lID0gJ2JvdCc7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IG51bGw7XG4gICAgICAgIHRoaXMub3MgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gQm90SW5mbztcbn0oKSk7XG5leHBvcnQgeyBCb3RJbmZvIH07XG52YXIgUmVhY3ROYXRpdmVJbmZvID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlYWN0TmF0aXZlSW5mbygpIHtcbiAgICAgICAgdGhpcy50eXBlID0gJ3JlYWN0LW5hdGl2ZSc7XG4gICAgICAgIHRoaXMubmFtZSA9ICdyZWFjdC1uYXRpdmUnO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSBudWxsO1xuICAgICAgICB0aGlzLm9zID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIFJlYWN0TmF0aXZlSW5mbztcbn0oKSk7XG5leHBvcnQgeyBSZWFjdE5hdGl2ZUluZm8gfTtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbnZhciBTRUFSQ0hCT1hfVUFfUkVHRVggPSAvYWxleGF8Ym90fGNyYXdsKGVyfGluZyl8ZmFjZWJvb2tleHRlcm5hbGhpdHxmZWVkYnVybmVyfGdvb2dsZSB3ZWIgcHJldmlld3xuYWdpb3N8cG9zdHJhbmt8cGluZ2RvbXxzbHVycHxzcGlkZXJ8eWFob28hfHlhbmRleC87XG52YXIgU0VBUkNIQk9UX09TX1JFR0VYID0gLyhudWhrfGN1cmx8R29vZ2xlYm90fFlhbW15Ym90fE9wZW5ib3R8U2x1cnB8TVNOQm90fEFza1xcIEplZXZlc1xcL1Rlb21hfGlhX2FyY2hpdmVyKS87XG52YXIgUkVRVUlSRURfVkVSU0lPTl9QQVJUUyA9IDM7XG52YXIgdXNlckFnZW50UnVsZXMgPSBbXG4gICAgWydhb2wnLCAvQU9MU2hpZWxkXFwvKFswLTlcXC5fXSspL10sXG4gICAgWydlZGdlJywgL0VkZ2VcXC8oWzAtOVxcLl9dKykvXSxcbiAgICBbJ2VkZ2UtaW9zJywgL0VkZ2lPU1xcLyhbMC05XFwuX10rKS9dLFxuICAgIFsneWFuZGV4YnJvd3NlcicsIC9ZYUJyb3dzZXJcXC8oWzAtOVxcLl9dKykvXSxcbiAgICBbJ2tha2FvdGFsaycsIC9LQUtBT1RBTEtcXHMoWzAtOVxcLl0rKS9dLFxuICAgIFsnc2Ftc3VuZycsIC9TYW1zdW5nQnJvd3NlclxcLyhbMC05XFwuXSspL10sXG4gICAgWydzaWxrJywgL1xcYlNpbGtcXC8oWzAtOS5fLV0rKVxcYi9dLFxuICAgIFsnbWl1aScsIC9NaXVpQnJvd3NlclxcLyhbMC05XFwuXSspJC9dLFxuICAgIFsnYmVha2VyJywgL0JlYWtlckJyb3dzZXJcXC8oWzAtOVxcLl0rKS9dLFxuICAgIFsnZWRnZS1jaHJvbWl1bScsIC9FZGdBP1xcLyhbMC05XFwuXSspL10sXG4gICAgW1xuICAgICAgICAnY2hyb21pdW0td2VidmlldycsXG4gICAgICAgIC8oPyFDaHJvbS4qT1BSKXd2XFwpLipDaHJvbSg/OmV8aXVtKVxcLyhbMC05XFwuXSspKDo/XFxzfCQpLyxcbiAgICBdLFxuICAgIFsnY2hyb21lJywgLyg/IUNocm9tLipPUFIpQ2hyb20oPzplfGl1bSlcXC8oWzAtOVxcLl0rKSg6P1xcc3wkKS9dLFxuICAgIFsncGhhbnRvbWpzJywgL1BoYW50b21KU1xcLyhbMC05XFwuXSspKDo/XFxzfCQpL10sXG4gICAgWydjcmlvcycsIC9DcmlPU1xcLyhbMC05XFwuXSspKDo/XFxzfCQpL10sXG4gICAgWydmaXJlZm94JywgL0ZpcmVmb3hcXC8oWzAtOVxcLl0rKSg/Olxcc3wkKS9dLFxuICAgIFsnZnhpb3MnLCAvRnhpT1NcXC8oWzAtOVxcLl0rKS9dLFxuICAgIFsnb3BlcmEtbWluaScsIC9PcGVyYSBNaW5pLipWZXJzaW9uXFwvKFswLTlcXC5dKykvXSxcbiAgICBbJ29wZXJhJywgL09wZXJhXFwvKFswLTlcXC5dKykoPzpcXHN8JCkvXSxcbiAgICBbJ29wZXJhJywgL09QUlxcLyhbMC05XFwuXSspKDo/XFxzfCQpL10sXG4gICAgWydwaWUnLCAvXk1pY3Jvc29mdCBQb2NrZXQgSW50ZXJuZXQgRXhwbG9yZXJcXC8oXFxkK1xcLlxcZCspJC9dLFxuICAgIFsncGllJywgL15Nb3ppbGxhXFwvXFxkXFwuXFxkK1xcc1xcKGNvbXBhdGlibGU7XFxzKD86TVNQP0lFfE1TSW50ZXJuZXQgRXhwbG9yZXIpIChcXGQrXFwuXFxkKyk7LipXaW5kb3dzIENFLipcXCkkL10sXG4gICAgWyduZXRmcm9udCcsIC9eTW96aWxsYVxcL1xcZFxcLlxcZCsuKk5ldEZyb250XFwvKFxcZC5cXGQpL10sXG4gICAgWydpZScsIC9UcmlkZW50XFwvN1xcLjAuKnJ2XFw6KFswLTlcXC5dKykuKlxcKS4qR2Vja28kL10sXG4gICAgWydpZScsIC9NU0lFXFxzKFswLTlcXC5dKyk7LipUcmlkZW50XFwvWzQtN10uMC9dLFxuICAgIFsnaWUnLCAvTVNJRVxccyg3XFwuMCkvXSxcbiAgICBbJ2JiMTAnLCAvQkIxMDtcXHNUb3VjaC4qVmVyc2lvblxcLyhbMC05XFwuXSspL10sXG4gICAgWydhbmRyb2lkJywgL0FuZHJvaWRcXHMoWzAtOVxcLl0rKS9dLFxuICAgIFsnaW9zJywgL1ZlcnNpb25cXC8oWzAtOVxcLl9dKykuKk1vYmlsZS4qU2FmYXJpLiovXSxcbiAgICBbJ3NhZmFyaScsIC9WZXJzaW9uXFwvKFswLTlcXC5fXSspLipTYWZhcmkvXSxcbiAgICBbJ2ZhY2Vib29rJywgL0ZCW0FTXVZcXC8oWzAtOVxcLl0rKS9dLFxuICAgIFsnaW5zdGFncmFtJywgL0luc3RhZ3JhbVxccyhbMC05XFwuXSspL10sXG4gICAgWydpb3Mtd2VidmlldycsIC9BcHBsZVdlYktpdFxcLyhbMC05XFwuXSspLipNb2JpbGUvXSxcbiAgICBbJ2lvcy13ZWJ2aWV3JywgL0FwcGxlV2ViS2l0XFwvKFswLTlcXC5dKykuKkdlY2tvXFwpJC9dLFxuICAgIFsnY3VybCcsIC9eY3VybFxcLyhbMC05XFwuXSspJC9dLFxuICAgIFsnc2VhcmNoYm90JywgU0VBUkNIQk9YX1VBX1JFR0VYXSxcbl07XG52YXIgb3BlcmF0aW5nU3lzdGVtUnVsZXMgPSBbXG4gICAgWydpT1MnLCAvaVAoaG9uZXxvZHxhZCkvXSxcbiAgICBbJ0FuZHJvaWQgT1MnLCAvQW5kcm9pZC9dLFxuICAgIFsnQmxhY2tCZXJyeSBPUycsIC9CbGFja0JlcnJ5fEJCMTAvXSxcbiAgICBbJ1dpbmRvd3MgTW9iaWxlJywgL0lFTW9iaWxlL10sXG4gICAgWydBbWF6b24gT1MnLCAvS2luZGxlL10sXG4gICAgWydXaW5kb3dzIDMuMTEnLCAvV2luMTYvXSxcbiAgICBbJ1dpbmRvd3MgOTUnLCAvKFdpbmRvd3MgOTUpfChXaW45NSl8KFdpbmRvd3NfOTUpL10sXG4gICAgWydXaW5kb3dzIDk4JywgLyhXaW5kb3dzIDk4KXwoV2luOTgpL10sXG4gICAgWydXaW5kb3dzIDIwMDAnLCAvKFdpbmRvd3MgTlQgNS4wKXwoV2luZG93cyAyMDAwKS9dLFxuICAgIFsnV2luZG93cyBYUCcsIC8oV2luZG93cyBOVCA1LjEpfChXaW5kb3dzIFhQKS9dLFxuICAgIFsnV2luZG93cyBTZXJ2ZXIgMjAwMycsIC8oV2luZG93cyBOVCA1LjIpL10sXG4gICAgWydXaW5kb3dzIFZpc3RhJywgLyhXaW5kb3dzIE5UIDYuMCkvXSxcbiAgICBbJ1dpbmRvd3MgNycsIC8oV2luZG93cyBOVCA2LjEpL10sXG4gICAgWydXaW5kb3dzIDgnLCAvKFdpbmRvd3MgTlQgNi4yKS9dLFxuICAgIFsnV2luZG93cyA4LjEnLCAvKFdpbmRvd3MgTlQgNi4zKS9dLFxuICAgIFsnV2luZG93cyAxMCcsIC8oV2luZG93cyBOVCAxMC4wKS9dLFxuICAgIFsnV2luZG93cyBNRScsIC9XaW5kb3dzIE1FL10sXG4gICAgWydXaW5kb3dzIENFJywgL1dpbmRvd3MgQ0V8V2luQ0V8TWljcm9zb2Z0IFBvY2tldCBJbnRlcm5ldCBFeHBsb3Jlci9dLFxuICAgIFsnT3BlbiBCU0QnLCAvT3BlbkJTRC9dLFxuICAgIFsnU3VuIE9TJywgL1N1bk9TL10sXG4gICAgWydDaHJvbWUgT1MnLCAvQ3JPUy9dLFxuICAgIFsnTGludXgnLCAvKExpbnV4KXwoWDExKS9dLFxuICAgIFsnTWFjIE9TJywgLyhNYWNfUG93ZXJQQyl8KE1hY2ludG9zaCkvXSxcbiAgICBbJ1FOWCcsIC9RTlgvXSxcbiAgICBbJ0JlT1MnLCAvQmVPUy9dLFxuICAgIFsnT1MvMicsIC9PU1xcLzIvXSxcbl07XG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0KHVzZXJBZ2VudCkge1xuICAgIGlmICghIXVzZXJBZ2VudCkge1xuICAgICAgICByZXR1cm4gcGFyc2VVc2VyQWdlbnQodXNlckFnZW50KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWFjdE5hdGl2ZUluZm8oKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBwYXJzZVVzZXJBZ2VudChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIGdldE5vZGVWZXJzaW9uKCk7XG59XG5mdW5jdGlvbiBtYXRjaFVzZXJBZ2VudCh1YSkge1xuICAgIC8vIG9wdGVkIGZvciB1c2luZyByZWR1Y2UgaGVyZSByYXRoZXIgdGhhbiBBcnJheSNmaXJzdCB3aXRoIGEgcmVnZXgudGVzdCBjYWxsXG4gICAgLy8gdGhpcyBpcyBwcmltYXJpbHkgYmVjYXVzZSB1c2luZyB0aGUgcmVkdWNlIHdlIG9ubHkgcGVyZm9ybSB0aGUgcmVnZXhcbiAgICAvLyBleGVjdXRpb24gb25jZSByYXRoZXIgdGhhbiBvbmNlIGZvciB0aGUgdGVzdCBhbmQgZm9yIHRoZSBleGVjIGFnYWluIGJlbG93XG4gICAgLy8gcHJvYmFibHkgc29tZXRoaW5nIHRoYXQgbmVlZHMgdG8gYmUgYmVuY2htYXJrZWQgdGhvdWdoXG4gICAgcmV0dXJuICh1YSAhPT0gJycgJiZcbiAgICAgICAgdXNlckFnZW50UnVsZXMucmVkdWNlKGZ1bmN0aW9uIChtYXRjaGVkLCBfYSkge1xuICAgICAgICAgICAgdmFyIGJyb3dzZXIgPSBfYVswXSwgcmVnZXggPSBfYVsxXTtcbiAgICAgICAgICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdWFNYXRjaCA9IHJlZ2V4LmV4ZWModWEpO1xuICAgICAgICAgICAgcmV0dXJuICEhdWFNYXRjaCAmJiBbYnJvd3NlciwgdWFNYXRjaF07XG4gICAgICAgIH0sIGZhbHNlKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYnJvd3Nlck5hbWUodWEpIHtcbiAgICB2YXIgZGF0YSA9IG1hdGNoVXNlckFnZW50KHVhKTtcbiAgICByZXR1cm4gZGF0YSA/IGRhdGFbMF0gOiBudWxsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVXNlckFnZW50KHVhKSB7XG4gICAgdmFyIG1hdGNoZWRSdWxlID0gbWF0Y2hVc2VyQWdlbnQodWEpO1xuICAgIGlmICghbWF0Y2hlZFJ1bGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBuYW1lID0gbWF0Y2hlZFJ1bGVbMF0sIG1hdGNoID0gbWF0Y2hlZFJ1bGVbMV07XG4gICAgaWYgKG5hbWUgPT09ICdzZWFyY2hib3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgQm90SW5mbygpO1xuICAgIH1cbiAgICAvLyBEbyBub3QgdXNlIFJlZ0V4cCBmb3Igc3BsaXQgb3BlcmF0aW9uIGFzIHNvbWUgYnJvd3NlciBkbyBub3Qgc3VwcG9ydCBpdCAoU2VlOiBodHRwOi8vYmxvZy5zdGV2ZW5sZXZpdGhhbi5jb20vYXJjaGl2ZXMvY3Jvc3MtYnJvd3Nlci1zcGxpdClcbiAgICB2YXIgdmVyc2lvblBhcnRzID0gbWF0Y2hbMV0gJiYgbWF0Y2hbMV0uc3BsaXQoJy4nKS5qb2luKCdfJykuc3BsaXQoJ18nKS5zbGljZSgwLCAzKTtcbiAgICBpZiAodmVyc2lvblBhcnRzKSB7XG4gICAgICAgIGlmICh2ZXJzaW9uUGFydHMubGVuZ3RoIDwgUkVRVUlSRURfVkVSU0lPTl9QQVJUUykge1xuICAgICAgICAgICAgdmVyc2lvblBhcnRzID0gX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCB2ZXJzaW9uUGFydHMsIHRydWUpLCBjcmVhdGVWZXJzaW9uUGFydHMoUkVRVUlSRURfVkVSU0lPTl9QQVJUUyAtIHZlcnNpb25QYXJ0cy5sZW5ndGgpLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmVyc2lvblBhcnRzID0gW107XG4gICAgfVxuICAgIHZhciB2ZXJzaW9uID0gdmVyc2lvblBhcnRzLmpvaW4oJy4nKTtcbiAgICB2YXIgb3MgPSBkZXRlY3RPUyh1YSk7XG4gICAgdmFyIHNlYXJjaEJvdE1hdGNoID0gU0VBUkNIQk9UX09TX1JFR0VYLmV4ZWModWEpO1xuICAgIGlmIChzZWFyY2hCb3RNYXRjaCAmJiBzZWFyY2hCb3RNYXRjaFsxXSkge1xuICAgICAgICByZXR1cm4gbmV3IFNlYXJjaEJvdERldmljZUluZm8obmFtZSwgdmVyc2lvbiwgb3MsIHNlYXJjaEJvdE1hdGNoWzFdKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBCcm93c2VySW5mbyhuYW1lLCB2ZXJzaW9uLCBvcyk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0T1ModWEpIHtcbiAgICBmb3IgKHZhciBpaSA9IDAsIGNvdW50ID0gb3BlcmF0aW5nU3lzdGVtUnVsZXMubGVuZ3RoOyBpaSA8IGNvdW50OyBpaSsrKSB7XG4gICAgICAgIHZhciBfYSA9IG9wZXJhdGluZ1N5c3RlbVJ1bGVzW2lpXSwgb3MgPSBfYVswXSwgcmVnZXggPSBfYVsxXTtcbiAgICAgICAgdmFyIG1hdGNoID0gcmVnZXguZXhlYyh1YSk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIG9zO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldE5vZGVWZXJzaW9uKCkge1xuICAgIHZhciBpc05vZGUgPSB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy52ZXJzaW9uO1xuICAgIHJldHVybiBpc05vZGUgPyBuZXcgTm9kZUluZm8ocHJvY2Vzcy52ZXJzaW9uLnNsaWNlKDEpKSA6IG51bGw7XG59XG5mdW5jdGlvbiBjcmVhdGVWZXJzaW9uUGFydHMoY291bnQpIHtcbiAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGNvdW50OyBpaSsrKSB7XG4gICAgICAgIG91dHB1dC5wdXNoKCcwJyk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG4iLCJjb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xuZXhwb3J0IGRlZmF1bHQge1xuICByYW5kb21VVUlEXG59OyIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgcmV0dXJuIChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgbmF0aXZlIGZyb20gJy4vbmF0aXZlLmpzJztcbmltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAobmF0aXZlLnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBuYXRpdmUucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCJleHBvcnQgZnVuY3Rpb24gdXRmOFRvQmFzZTY0KHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYnRvYShlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC8lKFswLTlBLUZdezJ9KS9nLCAobWF0Y2gsIHAxKSA9PiB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KHAxLCAxNikpO1xuICAgIH0pKTtcbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBiYXNlNjRUb1V0Zjgoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoYXRvYihzdHIpLnNwbGl0KCcnKS5tYXAoYyA9PiB7XG4gICAgICAgIHJldHVybiAnJScgKyAoJzAwJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKTtcbiAgICB9KS5qb2luKCcnKSk7XG59IiwibGV0IHRpbWVyOiBudW1iZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZUZ1bmN0aW9uKGZ1bmM6ICgpID0+IHZvaWQsIHdhaXQ6IG51bWJlcik6ICgpID0+IHZvaWQge1xuICAgIHJldHVybiBmdW5jdGlvbiBleGVjdXRlZEZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBsYXRlciA9ICgpID0+IHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICBmdW5jKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQobGF0ZXIsIHdhaXQpIGFzIHVua25vd24gYXMgbnVtYmVyOyAvLyBDYXN0IHRvIG51bWJlciBpZiBUeXBlU2NyaXB0IGNvbXBsYWluc1xuICAgIH07XG59XG4gIiwiXG5leHBvcnQgY2xhc3MgSnNvblRvSHRtbENvbnZlcnRlciB7XG4gICAgcHVibGljIHN0YXRpYyBjb252ZXJ0KGpzb246IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGlmIChqc29uID09IG51bGwpIHJldHVybiB0aGlzLmVzY2FwZUh0bWwoXCI8ZW0+bnVsbDwvZW0+XCIpO1xuICAgICAgICBpZiAodHlwZW9mIGpzb24gIT09IFwib2JqZWN0XCIpIHJldHVybiB0aGlzLmVzY2FwZUh0bWwoanNvbi50b1N0cmluZygpKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShqc29uKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlUb0h0bWwoanNvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RUb0h0bWwoanNvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhcnJheVRvSHRtbChhcnI6IGFueVtdKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaXRlbXNIdG1sID0gYXJyLm1hcChpdGVtID0+IGA8bGk+JHt0aGlzLmNvbnZlcnQoaXRlbSl9PC9saT5gKS5qb2luKFwiXCIpO1xuICAgICAgICByZXR1cm4gYDx1bD4ke2l0ZW1zSHRtbH08L3VsPmA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgb2JqZWN0VG9IdG1sKG9iajogYW55KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcHJvcGVydGllc0h0bWwgPSBPYmplY3Qua2V5cyhvYmopXG4gICAgICAgICAgICAubWFwKGtleSA9PiBgPGxpPiR7dGhpcy5lc2NhcGVIdG1sKGtleSl9OiAke3RoaXMuY29udmVydChvYmpba2V5XSl9PC9saT5gKVxuICAgICAgICAgICAgLmpvaW4oXCJcIik7XG4gICAgICAgIHJldHVybiBgPHVsPiR7cHJvcGVydGllc0h0bWx9PC91bD5gO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGVzY2FwZUh0bWwodW5zYWZlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdW5zYWZlLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvPi9nLCBcIiZndDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCImIzAzOTtcIik7XG4gICAgfVxufVxuXG4vLyBVc2FnZSBleGFtcGxlOlxuY29uc3QganNvbiA9IHtcbiAgICBjb2RlOiBcIkVSUk9SX0NPREVcIixcbiAgICBtZXNzYWdlOiBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCIsXG4gICAgZGV0YWlsczoge1xuICAgICAgICBpbmZvOiBcIkRldGFpbGVkIGluZm9ybWF0aW9uIGFib3V0IHRoZSBlcnJvclwiLFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgaXRlbXM6IFsxLCAyLCAzXVxuICAgIH1cbn07XG5cbiIsImltcG9ydCBjaGFsaywgeyBDaGFsa0luc3RhbmNlIH0gZnJvbSAnY2hhbGsnO1xuaW1wb3J0IHsgZXh0cmFjdENhbGxlckZyb21TdGFjaywgZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2sgfSBmcm9tICcuL1N0YWNrSGVscGVyJztcblxuY2hhbGsubGV2ZWwgPSAzO1xubGV0IGRlZmF1bHRNb2RlOiBDaGFsa0luc3RhbmNlID0gY2hhbGsucmVzZXQ7XG5cblxubGV0IGxhc3RTZWM6IFNlY3Rpb24gfCB1bmRlZmluZWQ7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyU2VjKCkge1xuXG4gICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IDEwOyBpKyspe1xuICAgIC8vIGNvbnNvbGUuZ3JvdXBFbmQoKVxuICAgIC8vIH1cblxuICAgIGlmIChsYXN0U2VjPy5ncm91cCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhc3RTZWM/Lmdyb3VwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsYXN0U2VjID0gbmV3IFNlY3Rpb24oXCJSb290XCIsIGRlZmF1bHRNb2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlY0JhY2tPbmUoKSB7XG4gICAgbGFzdFNlYyA9IGxhc3RTZWM/LnBhcmVudDtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG59XG5cbmV4cG9ydCBjbGFzcyBTZWN0aW9uIHtcbiAgICBzZWN0aW9uTmFtZTogc3RyaW5nO1xuICAgIHBhcmVudDogU2VjdGlvbiB8IHVuZGVmaW5lZDtcbiAgICBjOiBDaGFsa0luc3RhbmNlXG4gICAgaW5kZW50ID0gMDtcbiAgICBpbmRlbnRQYWQgPSBcIlwiO1xuICAgIGdyb3VwOiBudW1iZXIgPSAwO1xuICAgIGNvbnN0cnVjdG9yKHNlY3Rpb25OYW1lOiBzdHJpbmcsIGM6IENoYWxrSW5zdGFuY2UsIHNlY3Rpb24/OiBTZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuYyA9IGM7XG4gICAgICAgIHRoaXMuc2VjdGlvbk5hbWUgPSBzZWN0aW9uTmFtZTtcbiAgICAgICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZW50ID0gc2VjdGlvbi5pbmRlbnQgKyAxO1xuICAgICAgICAgICAgdGhpcy5pbmRlbnRQYWQgPSBcIi1cIi5yZXBlYXQodGhpcy5pbmRlbnQgKiAyKSArIFwiIFwiO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RTZWMgPSB0aGlzO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHNlY3Rpb247XG4gICAgfVxuICAgIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkZWZhdWx0TW9kZShhcmdzKSk7XG4gICAgfVxuICAgIGxoMShoZWFkaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxoMSh0aGlzLmluZGVudFBhZCArIGhlYWRpbmcsIHRoaXMpXG4gICAgfVxuICAgIGxoMihoZWFkaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxoMih0aGlzLmluZGVudFBhZCArIGhlYWRpbmcsIHRoaXMpXG4gICAgfVxuICAgIGxoMyhoZWFkaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxoMyh0aGlzLmluZGVudFBhZCArIGhlYWRpbmcsIHRoaXMpXG4gICAgfVxuICAgIGwoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIGwodGhpcywgLi4uYXJncyk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbCguLi5hcmdzOiBhbnlbXSkge1xuXG4gICAgbGV0IHNlYzogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWM7XG4gICAgbGV0IGZpcnN0QXJnOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgbGV0IGZpcnN0QXJnTW9kaWZlZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBTZWN0aW9uKSB7XG4gICAgICAgICAgICBzZWMgPSBhcmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmaXJzdEFyZyAmJiBhcmcuY29uc3RydWN0b3IubmFtZSA9PT0gXCJTdHJpbmdcIikge1xuICAgICAgICAgICAgZmlyc3RBcmcgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy9yZW1vdmVkIFNlY3Rpb24gZnJvbSBhcmdzXG4gICAgYXJncyA9IGFyZ3MuZmlsdGVyKChhcmcpID0+IHtcbiAgICAgICAgcmV0dXJuICEoYXJnIGluc3RhbmNlb2YgU2VjdGlvbik7XG4gICAgfSlcblxuXG4gICAgLy8gbGV0IGMgPSBzZWM/LmMgfHwgbW9kZTtcbiAgICBsZXQgYyA9IGRlZmF1bHRNb2RlO1xuICAgIGxldCBpbmRlbnRQYWQgPSBzZWM/LmluZGVudFBhZCB8fCBcIlwiO1xuXG4gICAgaWYgKCFmaXJzdEFyZykge1xuICAgICAgICBmaXJzdEFyZyA9IFwiXCI7XG4gICAgfVxuICAgIGZpcnN0QXJnTW9kaWZlZCA9IGZpcnN0QXJnO1xuXG4gICAgZmlyc3RBcmdNb2RpZmVkID0gaW5kZW50UGFkICsgZmlyc3RBcmc7XG4gICAgLy9yZW1vdmUgY29sb3IgZm9ybWF0dGluZyBmcm9tIGZpcnN0IGFyZ1xuICAgIGxldCB0b3RMZW4gPSBmaXJzdEFyZ01vZGlmZWQubGVuZ3RoIC0gZmlyc3RBcmdNb2RpZmVkLnJlcGxhY2UoL1xcdTAwMWJcXFsuKj9tL2csICcnKS5sZW5ndGggLSAyO1xuXG5cbiAgICBjb25zb2xlLmxvZyhmaXJzdEFyZ01vZGlmZWQpO1xuXG4gICAgLy9yZW1vdmVkIFNlY3Rpb24gZnJvbSBhcmdzXG5cbiAgICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhhcmcpO1xuICAgIH0pXG5cblxufVxuXG5cblxuZnVuY3Rpb24gbG9nSGVhZGluZ1NlY3Rpb24oYzogQ2hhbGtJbnN0YW5jZSwgaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uPzogU2VjdGlvbikge1xuXG4gICAgbGV0IHNlYyA9IG5ldyBTZWN0aW9uKGhlYWRpbmcsIGMsIHNlY3Rpb24pO1xuICAgIGxldCB0aW1lID0gbmV3IERhdGUoRGF0ZS5ub3coKSkudG9Mb2NhbGVTdHJpbmcoKTtcblxuICAgIGxldCBwYXRoID0gXCJcIjtcbiAgICBpZiAoc2VjdGlvbikge1xuICAgICAgICBwYXRoID0gc2VjdGlvbi5zZWN0aW9uTmFtZTtcbiAgICAgICAgd2hpbGUgKHNlY3Rpb24ucGFyZW50KSB7XG4gICAgICAgICAgICBzZWN0aW9uID0gc2VjdGlvbi5wYXJlbnQ7XG4gICAgICAgICAgICBwYXRoID0gc2VjdGlvbi5zZWN0aW9uTmFtZSArIFwiIC0+IFwiICsgcGF0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vYWRkIGFkZCBoZWFkaW5nIHRvIGVuZCBvZiBwYXRoIGFuZCBvbmx5IGFkZCAtPiBpZiBwYXRoIGlzIG5vdCBlbXB0eVxuICAgIGlmIChwYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcGF0aCArPSBcIiAtPiBcIjtcbiAgICB9XG4gICAgcGF0aCArPSBoZWFkaW5nO1xuXG5cblxuICAgIC8vcG9zaXRpb24gdGhlIGhlYWRpbmcgaW4gdGhlIG1pZGRsZSBvZiB0aGUgc2NyZWVuXG4gICAgLy8gY29uc29sZS5sb2coYyhoZWFkaW5nLnBhZFN0YXJ0KChjd2lkdGggLyAyKSArIChoZWFkaW5nLmxlbmd0aCAvIDIpLCBcIiBcIikucGFkRW5kKGN3aWR0aCwgXCIgXCIpKSk7XG4gICAgY29uc29sZS5ncm91cENvbGxhcHNlZChjKHBhdGgpKTtcbiAgICBzZWMuZ3JvdXArKztcblxuICAgIHJldHVybiBzZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaDEoaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYykge1xuICAgIGxldCBjID0gY2hhbGsuYmdCbGFjay5ncmVlbkJyaWdodC5ib2xkO1xuICAgIHJldHVybiBsb2dIZWFkaW5nU2VjdGlvbihjLCBoZWFkaW5nLCBzZWN0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxoMihoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb246IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjKSB7XG4gICAgbGV0IGMgPSBjaGFsay5iZ0dyYXkuY3lhbkJyaWdodC5ib2xkO1xuICAgIHJldHVybiBsb2dIZWFkaW5nU2VjdGlvbihjLCBoZWFkaW5nLCBzZWN0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxoMyhoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb246IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjKSB7XG4gICAgbGV0IGMgPSBjaGFsay5iZ0dyYXkubWFnZW50YUJyaWdodC5ib2xkO1xuICAgIHJldHVybiBsb2dIZWFkaW5nU2VjdGlvbihjLCBoZWFkaW5nLCBzZWN0aW9uKTtcbn1cblxuXG5leHBvcnQgY29uc3QgbGggPSBsaDE7XG5cblxuZXhwb3J0IGNvbnN0IGltcCA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLnJlZC5ib2xkLmJnQmxhY2s7XG4gICAgcmV0dXJuIGModGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBpbmYgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay5ibHVlLmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCB3cm4gPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay55ZWxsb3cuYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn0gXG5cbmV4cG9ydCBjb25zdCBlcnIgPSAodGV4dDogc3RyaW5nKSA9PiB7XG5cbiAgICBsZXQgZXIgPSAobmV3IEVycm9yKCkpO1xuICAgIGxldCBsaW5lTm8gPSBleHRyYWN0TGluZU51bWJlckZyb21TdGFjayhlci5zdGFjayk7XG4gICAgbGV0IGNhbGxlciA9IGV4dHJhY3RDYWxsZXJGcm9tU3RhY2soZXIuc3RhY2spO1xuXG4gICAgbGV0IHByZVRleHQgPSBgWyR7Y2FsbGVyfToke2xpbmVOb31dYDtcblxuICAgIHRleHQgPSBwcmVUZXh0ICsgXCIgXCIgKyB0ZXh0O1xuICAgIFxuICAgIGNvbnNvbGUubG9nKGVyKTtcblxuICAgIGxldCBjID0gY2hhbGsucmVkLmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBzdWMgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay5ncmVlbi5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgaGwgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGNoYWxrLmJnQmx1ZSh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGhsMSA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gY2hhbGsuYmdNYWdlbnRhKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgbnYgPSAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGNoYWxrLmJnQmx1ZUJyaWdodChuYW1lLnBhZEVuZCgzMCwgXCIgXCIpKSArIFwiIDogXCIgKyBjaGFsay5jeWFuQnJpZ2h0KHZhbHVlKTtcbn1cblxuIFxubGV0IGV4YW1wbGVKU29uID1cbntcbiAgICBcIm5hbWVcIjogXCJ0ZXN0XCIsXG4gICAgXCJhZ2VcIjogMTAsXG4gICAgXCJhZGRyZXNzXCI6IHtcbiAgICAgICAgXCJzdHJlZXRcIjogXCIxMjMgRmFrZSBTdHJlZXRcIixcbiAgICAgICAgXCJjaXR5XCI6IFwiTG9uZG9uXCIsXG4gICAgICAgIFwicG9zdGNvZGVcIjogXCJTVzFBIDFBQVwiXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuVGVzdCgpIHtcblxuXG4gICAgY29uc29sZS5sb2coXCItLSB0ZXN0IC0tXCIpXG5cbiAgICBsZXQgc2VjID0gbGgxKFwiVGVzdCBIZWFkaW5nIDFcIilcbiAgICBsKGltcChcIkF1dG8gU2VjIC0gVGhpcyBpcyBzb21ldGhpbmcgaW1wb3J0YW50XCIpKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgMVwiKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgMlwiKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgSU5GTzogXCIgKyBpbXAoXCJUaGlzIGlzIHNvbWV0aGluZyBpbXBvcnRhbnRcIikpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSBXSVRIIEFERElUSU5BTCBJTkZPOiBcIiArIGltcChcIlRoaXMgaXMgc29tZXRoaW5nIGltcG9ydGFudFwiKSArIFwiIGFuZCB0aGlzIGlzIHNvbWUgYWRkaXRpb25hbCBpbmZvXCIpXG4gICAgbChcIkF1dG8gU2VjIC0gVGVzdCAyOlwiICsgaW1wKFwiQW4gaW1wb3J0YW50IHZhbHVlXCIpKVxuICAgIGwoXCJhZnRlciBhdXRvIHNlYyBUZXN0IDM6XCIgKyBpbmYoXCJBbiBpbmZvIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDQ6XCIgKyB3cm4oXCJBbiB3YXJuIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDU6XCIgKyBlcnIoXCJBbiBlcnJvciB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA2OlwiICsgc3VjKFwiQW4gc3VjY2VzcyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA3OlwiICsgaGwoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgODpcIiArIGhsMShcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKG52KFwiTmFtZVwiLCBcIlZhbHVlXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuXG4gICAgc2VjID0gc2VjLmxoMihcIkhlYWRpbmcgMlwiKVxuICAgIHNlYy5sKFwiVGVzdFwiKVxuICAgIHNlYy5sKFwiVGVzdCAyOlwiICsgaW1wKFwiQW4gaW1wb3J0YW50IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDM6XCIgKyBpbmYoXCJBbiBpbmZvIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDQ6XCIgKyB3cm4oXCJBbiB3YXJuIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDU6XCIgKyBlcnIoXCJBbiBlcnJvciB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA2OlwiICsgc3VjKFwiQW4gc3VjY2VzcyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA3OlwiICsgaGwoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgODpcIiArIGhsMShcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKG52KFwiTmFtZVwiLCBcIlZhbHVlXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuXG5cbiAgICBzZWMgPSBzZWMubGgzKFwiSGVhZCAzXCIpXG4gICAgbChcIlRlc3RcIilcbiAgICBsKFwiVGVzdCAyOlwiICsgaW1wKFwiQW4gaW1wb3J0YW50IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDM6XCIgKyBpbmYoXCJBbiBpbmZvIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDQ6XCIgKyB3cm4oXCJBbiB3YXJuIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDU6XCIgKyBlcnIoXCJBbiBlcnJvciB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA2OlwiICsgc3VjKFwiQW4gc3VjY2VzcyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA3OlwiICsgaGwoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgODpcIiArIGhsMShcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKG52KFwiTmFtZVwiLCBcIlZhbHVlXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuXG4gICAgY2xlYXJTZWMoKTtcbiAgICBsKFwiVGVzdCBDbGVhciBTZWNcIilcbiAgICBsKFwiVGVzdCAyOlwiICsgaW1wKFwiQW4gaW1wb3J0YW50IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDM6XCIgKyBpbmYoXCJBbiBpbmZvIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDQ6XCIgKyB3cm4oXCJBbiB3YXJuIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDU6XCIgKyBlcnIoXCJBbiBlcnJvciB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA2OlwiICsgc3VjKFwiQW4gc3VjY2VzcyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA3OlwiICsgaGwoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgODpcIiArIGhsMShcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKG52KFwiTmFtZVwiLCBcIlZhbHVlXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuXG5cblxuICAgIGwoXCJUZXN0IEpTT046XCIsIGV4YW1wbGVKU29uKTtcblxufVxuXG4vLyBydW5UZXN0KClcbmNsZWFyU2VjKCk7XG5cbi8vIGV4cG9ydCB7Y29sb3JzfTtcbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrKHN0YWNrOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBudW1iZXIgfCBudWxsIHtcbiAgICBpZiAoIXN0YWNrKSByZXR1cm4gbnVsbDtcbiAgICAvLyBFeHRyYWN0IGxpbmVzIGZyb20gc3RhY2tcbiAgICBjb25zdCBzdGFja0xpbmVzID0gc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIC8vIEZpbmQgdGhlIGxpbmUgd2l0aCB0aGUgZXJyb3IgKHVzdWFsbHkgdGhlIHNlY29uZCBsaW5lKVxuICAgIGNvbnN0IGVycm9yTGluZSA9IHN0YWNrTGluZXNbMV0gfHwgJyc7XG4gICAgLy8gRXh0cmFjdCBsaW5lIG51bWJlciBmcm9tIHRoZSBlcnJvciBsaW5lIHVzaW5nIHJlZ2V4XG4gICAgY29uc3QgbWF0Y2ggPSBlcnJvckxpbmUubWF0Y2goLzooXFxkKyk6KFxcZCspJC8pO1xuICAgIHJldHVybiBtYXRjaCA/IHBhcnNlSW50KG1hdGNoWzFdKSA6IG51bGw7XG4gIH1cbiAgXG4gZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RDYWxsZXJGcm9tU3RhY2soc3RhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICghc3RhY2spIHJldHVybiBudWxsO1xuICAgIC8vIEV4dHJhY3QgbGluZXMgZnJvbSBzdGFja1xuICAgIGNvbnN0IHN0YWNrTGluZXMgPSBzdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgLy8gRmluZCB0aGUgbGluZSB3aXRoIHRoZSBjYWxsZXIgZnVuY3Rpb24gKHVzdWFsbHkgdGhlIHRoaXJkIGxpbmUpXG4gICAgY29uc3QgY2FsbGVyTGluZSA9IHN0YWNrTGluZXNbMl0gfHwgJyc7XG4gICAgLy8gRXh0cmFjdCBjYWxsZXIgZnVuY3Rpb24gbmFtZSB1c2luZyByZWdleFxuICAgIGNvbnN0IG1hdGNoID0gY2FsbGVyTGluZS5tYXRjaCgvYXQgKFtcXHcuPD5dKykvKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6IG51bGw7XG4gIH0iLCJcblxuZXhwb3J0IGNvbnN0IElHcmFwaFF1ZXJ5RGZhdWx0czogSUdyYXBoUXVlcnkgPSB7XG4gICAgXCJmaWVsZHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICBcInBhdGhcIjogXCJ3b3JraXRlbS50aXRsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwicGF0aFwiOiBcIndvcmtpdGVtLmlkXCJcbiAgICAgICAgfVxuICAgIF0sXG4gICAgXCJkZWJ1Z1wiOiBmYWxzZSxcbiAgICBcImFsbG93UGFyYWxsZWxFeGVjdXRpb25cIjogdHJ1ZSxcbiAgICBcImV4ZWN1dGVDYWxjdWxhdGVkRmllbGRzXCI6IHRydWUsXG4gICAgXCJyZXNwb25zZVR5cGVcIjogXCJmbGF0XCIsXG4gICAgXCJlbnRpdHlUeXBlXCI6dW5kZWZpbmVkLFxuICAgIFwiZW50aXR5SWRcIjogXCJcIlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElHcmFwaFF1ZXJ5IHtcbiAgZmllbGRzOiBJR3JhcGhRdWVyeUZpZWxkW107XG4gIGRlYnVnOiBib29sZWFuO1xuICBhbGxvd1BhcmFsbGVsRXhlY3V0aW9uOiBib29sZWFuO1xuICBleGVjdXRlQ2FsY3VsYXRlZEZpZWxkczogYm9vbGVhbjtcbiAgcmVzcG9uc2VUeXBlOiBzdHJpbmc7XG4gIGVudGl0eVR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgZW50aXR5SWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJR3JhcGhRdWVyeUZpZWxkIHtcbiAgcGF0aDogc3RyaW5nO1xufSIsIlxuXG5leHBvcnQgaW50ZXJmYWNlIFNoYXJlRG9FdmVudCB7XG4gICAgZXZlbnRQYXRoOiBzdHJpbmc7XG4gICAgZXZlbnROYW1lOiBzdHJpbmc7XG4gICAgc291cmNlOiBhbnk7XG4gICAgZGF0YTogYW55O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJlRXZlbnQoZXZlbnQ6U2hhcmVEb0V2ZW50KSB7XG5cbiAgICAkdWkuZXZlbnRzLmJyb2FkY2FzdChldmVudC5ldmVudFBhdGgsIGV2ZW50KTtcbn0iLCJpbXBvcnQgeyBsLCBpbmYsIGVyciB9IGZyb20gXCIuLi8uLi9Db21tb24vTG9nXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJUb0NsYXNzKGNsYXNzTmFtZTpzdHJpbmcsIGJhc2U6YW55KSB7XG4gICAgY29uc3QgY2xhc3NQYXJ0cyA9IGNsYXNzTmFtZS5zcGxpdCgnLicpO1xuICAgIGxldCBjbGFzc1JlZmVyZW5jZSA9IGJhc2U7XG5cbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgY2xhc3NQYXJ0cykge1xuICAgICAgICBpZighY2xhc3NSZWZlcmVuY2VbcGFydF0pIFxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNsYXNzUmVmZXJlbmNlID0gY2xhc3NSZWZlcmVuY2VbcGFydF07XG4gICAgfTsgXG4gICAgcmV0dXJuIGNsYXNzUmVmZXJlbmNlO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBbGxGaWVsZHNUb051bGwobW9kZWw6YW55KSB7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhtb2RlbCk7XG4gICAga2V5cy5mb3JFYWNoKChrZXk6IGFueSkgPT4ge1xuICAgICAgICBtb2RlbFtrZXldID0gbnVsbDtcbiAgICB9KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbk9iamVjdChvYjogYW55KSB7XG4gICAgdmFyIHRvUmV0dXJuOiBhbnkgPSB7fTtcblxuICAgIGZvciAodmFyIGkgaW4gb2IpIHtcbiAgICAgICAgaWYgKCFvYi5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG5cbiAgICAgICAgaWYgKCh0eXBlb2Ygb2JbaV0pID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB2YXIgZmxhdE9iamVjdCA9IGZsYXR0ZW5PYmplY3Qob2JbaV0pO1xuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBmbGF0T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmbGF0T2JqZWN0Lmhhc093blByb3BlcnR5KHgpKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIHRvUmV0dXJuW2kgKyAnLicgKyB4XSA9IGZsYXRPYmplY3RbeF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b1JldHVybltpXSA9IG9iW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b1JldHVybjtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHByb3BlcnR5UGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCBwcm9wID0gcHJvcGVydGllc1tpXTtcbiAgICAgICAgaWYgKCFjdXJyZW50W3Byb3BdKSB7XG4gICAgICAgICAgICBjdXJyZW50W3Byb3BdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XG4gICAgfVxuICAgIGN1cnJlbnRbcHJvcGVydGllc1twcm9wZXJ0aWVzLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nKTogYW55IHtcbiAgICBsKGluZihgZ2V0TmVzdGVkUHJvcGVydHkoJHtwcm9wZXJ0eVBhdGh9KWApLG9iaik7XG4gICAgXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHByb3BlcnR5UGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHByb3BlcnR5IGhhcyBhbiBhcnJheSBpbmRleCwgZS5nLiwgXCJkYXRhWzBdXCJcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHByb3AubWF0Y2goL14oW2EtekEtWjAtOV9dKylcXFsoWzAtOV0rKVxcXSQvKTtcblxuICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgY29uc3QgYXJyYXlQcm9wID0gbWF0Y2hlc1sxXTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQobWF0Y2hlc1syXSwgMTApO1xuXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY3VycmVudFthcnJheVByb3BdKSB8fCBjdXJyZW50W2FycmF5UHJvcF1baW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsKGVycihgZ2V0TmVzdGVkUHJvcGVydHkoJHtwcm9wZXJ0eVBhdGh9KTogYXJyYXlQcm9wIG9yIGluZGV4IGlzIHVuZGVmaW5lZGApLG9iailcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudFthcnJheVByb3BdW2luZGV4XTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50W3Byb3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGwoZXJyKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pOiBwcm9wIGlzIHVuZGVmaW5lZGApLG9iailcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50O1xufVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgdGVtcG9yYXJ5IGFuZCB3aWxsIGJlIHJlbW92ZWQgb25jZSB0aGUgdHlwZXNjcmlwdCB0eXBpbmcgYXJlIGZpeGVkXG4gICAgICogV2hhdCBpcyBkb2VzIGlzIGNoZWNrIGlmIHRoZSBwYXNzZWQgaW4gb2JqZWN0IGlzIGEga25vY2tvdXQgb2JzZXJ2YWJsZSBhbmQgaWYgaXQgaXMgaXQgcmV0dXJucyB0aGUgdmFsdWVcbiAgICAgKiBAcGFyYW0ga29PYmplY3QgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlRnJvbUtPT2JqZWN0PFQ+KGtvT2JqZWN0OiBhbnkpIHtcbiAgICAgICAgaWYodHlwZW9mIGtvT2JqZWN0ID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBrb09iamVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrb09iamVjdFxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBndmtvPFQ+KGtvT2JqZWN0OiBhbnkpOiBUIHwgYW55IHtcbiAgICAgICAgcmV0dXJuIGtvLnRvSlMoa29PYmplY3QpO1xuICAgIH0iLCJcbi8qKlxuICogVGhpcyBmaWxlIGNvbnRhaW5zIHRoZSBhcGkgY2FsbHMgdG8gdGhlIGJhY2tlbmQuXG4gKiB1dGlsaXNpbmcgdGhlIGF4aW9zIGxpYnJhcnkgdG8gbWFrZSB0aGUgY2FsbHMuXG4gKiBpbmNsdXNpbmcgb2Ygd2VicGFja0lnbm9yZSBpcyB0byBhbGxvdyB0aGUgd2VicGFjayB0byBpZ25vcmUgdGhlIGNhbGxzIGFuZCBub3QgdHJ5IHRvIGJ1bmRsZSB0aGVtLlxuICovXG5cbmltcG9ydCB7IGVyciwgaW5mLCBsLCBsaDEsIHNlY0JhY2tPbmUgfSBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0xvZ1wiO1xuaW1wb3J0IHsgVFVzZXJFcnJvcnMgfSBmcm9tIFwiLi4vLi4vSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9JbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlUG9zdDxUPihhcGk6IHN0cmluZywgcG9zdEJvZHk6IGFueSk6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LnBvc3QoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpLCBwb3N0Qm9keSk7XG4gICAgcmV0dXJuIChhd2FpdCBleGVjdXRlRmV0Y2g8VD4oYXBpLCBcIlBPU1RcIiwgcG9zdEJvZHkpKS5kYXRhO1xufVxuXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZUdldDxUPihhcGk6IHN0cmluZykgOiBQcm9taXNlPFQ+e1xuLy8gICAgIHJldHVybiBhd2FpdCAkYWpheC5nZXQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpKTtcbi8vIH0gXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlR2V0PFQ+KGFwaTogc3RyaW5nKTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIChhd2FpdCBleGVjdXRlRmV0Y2g8VD4oYXBpLCBcIkdFVFwiLCB1bmRlZmluZWQpKS5kYXRhO1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlR2V0djI8VD4oYXBpOiBzdHJpbmcpe1xuICAgIHJldHVybiAgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJHRVRcIiwgdW5kZWZpbmVkKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVQb3N0djI8VFJlc3BvbnNlPihhcGk6IHN0cmluZywgcG9zdEJvZHk6IGFueSkge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LnBvc3QoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpLCBwb3N0Qm9keSk7XG4gICAgcmV0dXJuIGV4ZWN1dGVGZXRjaDxUUmVzcG9uc2U+KGFwaSwgXCJQT1NUXCIsIHBvc3RCb2R5KTtcbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVB1dDxUPihhcGk6IHN0cmluZywgcG9zdEJvZHk6IGFueSk6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LnB1dCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSksIHBvc3RCb2R5KTtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiUFVUXCIsIHBvc3RCb2R5KSkuZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVEZWxldGU8VD4oYXBpOiBzdHJpbmcpOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICAvL3JldHVybiBhd2FpdCAkYWpheC5kZWxldGUoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB2YWxpZGF0ZUFwaShhcGkpKTtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiREVMRVRFXCIsIHVuZGVmaW5lZCkpLmRhdGE7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQXBpKGFwaTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgbG9jYXRpb24gPSB3aW5kb3cuZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luO1xuXG4gICAgLy9pZiBhcGkgZG9lcyBub3QgaW5jbHVkZSB0aGUgbG9jYXRpb24gdGhlbiBhZGQgaXQuXG4gICAgaWYgKGFwaS5pbmRleE9mKGxvY2F0aW9uKSA9PT0gLTEpIHtcbiAgICAgICAgLy9jaGVjayBpZiBhcGkgc3RhcnQgd2l0aCBhIC8gaWYgbm90IGFkZCBpdC5cbiAgICAgICAgaWYgKGFwaS5pbmRleE9mKFwiL1wiKSAhPT0gMCkge1xuICAgICAgICAgICAgYXBpID0gXCIvXCIgKyBhcGk7XG4gICAgICAgIH1cblxuICAgICAgICBhcGkgPSBsb2NhdGlvbiArIGFwaTtcbiAgICB9XG4gICAgcmV0dXJuIGFwaTtcblxufVxuXG5leHBvcnQgdHlwZSBURXhlY3V0ZUZldGNoUmVzcG9uc2U8VFJlc3BvbnNlPiA9XG4gICAge1xuICAgICAgICBkYXRhOiBUUmVzcG9uc2UgfCB1bmRlZmluZWQsXG4gICAgICAgIHJlc3BvbnNlOiBSZXNwb25zZSB8IHVuZGVmaW5lZCxcbiAgICAgICAgaW5mbzpcbiAgICAgICAge1xuICAgICAgICAgICAgc3VjY2VzczogYm9vbGVhbixcbiAgICAgICAgICAgIGVycm9yOiBBcnJheTxUVXNlckVycm9ycz5cbiAgICAgICAgfVxuICAgIH1cblxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlRmV0Y2g8VFJlc3BvbnNlPihhcGk6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGRhdGE6IGFueSwgcmV0cnlDb3VudGVyPzpudW1iZXIpOiBQcm9taXNlPFRFeGVjdXRlRmV0Y2hSZXNwb25zZTxUUmVzcG9uc2U+PiB7XG4gICAgbGV0IHJldFZhbHVlOiBURXhlY3V0ZUZldGNoUmVzcG9uc2U8VFJlc3BvbnNlPiA9IHtcbiAgICAgICAgZGF0YTogdW5kZWZpbmVkLFxuICAgICAgICByZXNwb25zZTogdW5kZWZpbmVkLFxuICAgICAgICBpbmZvOiB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBbXVxuICAgICAgICB9XG4gICAgfVxuICAgICAgICAvL3RvIGdldCBuZXcgdG9rZW4gVE9ETzogY2hlY2sgaWYgZmFpbCB0aGVuIGNhbGxcbiAgICAvLyBhd2FpdCAkYWpheC5nZXQoXCJodHRwczovL2hzZi12bmV4dC5zaGFyZWRvLmNvLnVrL3NlY3VyaXR5L3JlZnJlc2hUb2tlbnM/Xz1cIiArIERhdGUubm93KTtcblxuICAgIFxuXG4gICAgbGV0IHVybCA9IHZhbGlkYXRlQXBpKGFwaSk7XG4gICAgbGV0IGZldGNoSGVhZGVycyA9IGJ1aWxkSGVhZGVycygpO1xuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogZmV0Y2hIZWFkZXJzLFxuICAgICAgICBib2R5OiBkYXRhID8gSlNPTi5zdHJpbmdpZnkoZGF0YSkgOiB1bmRlZmluZWRcbiAgICB9XG4gICAgKS50aGVuKGFzeW5jIChyZXNwb25zZSkgPT4ge1xuICAgICAgICByZXRWYWx1ZS5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICBpZiAocmVzcG9uc2Uub2sgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IDQwMSl7XG4gICAgICAgICAgICAgICAgcmV0cnlDb3VudGVyID0gcmV0cnlDb3VudGVyIHx8IDE7XG4gICAgICAgICAgICAgICAgaWYocmV0cnlDb3VudGVyID4gMyl7XG4gICAgICAgICAgICAgICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBcIkFQSV9FUlJPUlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNhbGwgdGhlIEFQSSBhZnRlciAzIGF0dGVtcHRzLiBzdGF0dXNUZXh0OiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJNZXNzYWdlOiBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNhbGwgdGhlIEFQSS5cIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogdW5kZWZpbmVkLCByZXNwb25zZSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhd2FpdCAkYWpheC5nZXQoXCJodHRwczovL2hzZi12bmV4dC5zaGFyZWRvLmNvLnVrL3NlY3VyaXR5L3JlZnJlc2hUb2tlbnM/Xz1cIiArIERhdGUubm93KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgZXhlY3V0ZUZldGNoPFRSZXNwb25zZT4oYXBpLCBtZXRob2QsIGRhdGEscmV0cnlDb3VudGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2RlOiBcIkFQSV9FUlJPUlwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBjYWxsIHRoZSBBUEkuIHN0YXR1c1RleHQ6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gLFxuICAgICAgICAgICAgICAgIHVzZXJNZXNzYWdlOiBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNhbGwgdGhlIEFQSS5cIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzcG9uc2VEYXRhO1xuICAgICAgICAvL2NoZWNrIGlmIHJlc3BvbnNlIGlzIEpTT05cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKT8uaW5jbHVkZXMoXCJhcHBsaWNhdGlvbi9qc29uXCIpKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5zdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZTogYW55KSB7XG4gICAgICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvZGU6IFwiQVBJX0VSUk9SXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGV4dHJhY3QgdGhlIGRhdGEgZnJvbSB0aGUgQVBJLiBNZXNzYWdlOiAke2U/Lm1lc3NhZ2UgfHwgXCJVbmtub3duXCJ9YCxcbiAgICAgICAgICAgICAgICB1c2VyTWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGV4dHJhY3QgdGhlIGRhdGEgZnJvbSB0aGUgQVBJLmBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRhdGE6IHJlc3BvbnNlRGF0YSwgcmVzcG9uc2UgfTtcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgbChlcnIoYEVycm9yIGZyb20gQVBJIENhbGwgJHt1cmx9YCksIGVycm9yKTtcblxuICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLnB1c2goe1xuICAgICAgICAgICAgY29kZTogXCJBUElfRVJST1JcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgICAgICB1c2VyTWVzc2FnZTogZXJyb3IubWVzc2FnZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4geyBkYXRhOiB1bmRlZmluZWQsIHJlc3BvbnNlOiB1bmRlZmluZWQgfTtcbiAgICB9KVxuXG4gICAgbGgxKGBSZXNwb25zZSBmcm9tICR7dXJsfWApO1xuICAgIGwocmVzcG9uc2UpO1xuXG4gICAgcmV0VmFsdWUuZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICBpZihyZXRWYWx1ZS5pbmZvLmVycm9yLmxlbmd0aCA+IDApe1xuICAgICAgICByZXRWYWx1ZS5pbmZvLnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgICAgbChlcnIoYEVycm9yIGZyb20gQVBJIENhbGwgJHt1cmx9YCksIGUpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHNlY0JhY2tPbmUoKTtcblxuICAgIHJldHVybiByZXRWYWx1ZTtcbn1cblxuZnVuY3Rpb24gYnVpbGRIZWFkZXJzKCkge1xuICAgIGxldCBiZWFyZXIgPSBnZXRCZWFyZXJUb2tlbigpO1xuICAgIGxldCBmZXRjaEhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGZldGNoSGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIGlmIChiZWFyZXIpIHtcbiAgICAgICAgZmV0Y2hIZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgYmVhcmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGZldGNoSGVhZGVycztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29va2llcygpOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcbiAgICBsZXQgcmV0VmFsdWU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgICBsZXQgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIikucmVkdWNlKGZ1bmN0aW9uIChjb29raWVzLCBjb29raWUpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gY29va2llLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdmFyIGtleSA9IHBhcnRzWzBdLnRyaW0oKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzWzFdO1xuXG4gICAgICAgICAgICByZXRWYWx1ZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvb2tpZXM7XG4gICAgfSwge30pO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJlYXJlclRva2VuKCkge1xuICAgIHZhciBjb29raWVzID0gZ2V0Q29va2llcygpO1xuICAgIHZhciB0b2tlbiA9IGNvb2tpZXNbXCJfYXBpXCJdO1xuXG4gICAgaWYgKHRva2VuKSByZXR1cm4gXCJCZWFyZXIgXCIgKyB0b2tlbjtcbiAgICByZXR1cm4gbnVsbDtcbn07IiwiXG5pbXBvcnQgeyBJR3JhcGhRdWVyeSB9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL2FwaS9ncmFwaC9JR3JhcGhRdWVyeVwiO1xuaW1wb3J0IHsgSUdyYXBoUXVlcnlSZXNvbnNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvYXBpL2dyYXBoL0lHcmFwaFF1ZXJ5UmVzcG9uc2VcIjtcbmltcG9ydCB7IGV4ZWN1dGVQb3N0LCBleGVjdXRlUG9zdHYyIH0gZnJvbSBcIi4uL2FwaVwiO1xuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVGaW5kQnlHcmFwaChpbnB1dE9wdGlvbjogSUdyYXBoUXVlcnkpXG57XG4gICAgcmV0dXJuIGV4ZWN1dGVQb3N0djI8SUdyYXBoUXVlcnlSZXNvbnNlPihcIi9hcGkvZ3JhcGgvd29ya2l0ZW0vcXVlcnlcIiwgaW5wdXRPcHRpb24pXG59XG4iLCJpbXBvcnQgeyBleGVjdXRlUG9zdCB9IGZyb20gXCIuLi9hcGlcIjtcbmltcG9ydCB7IElGaW5kQnlRdWVyeU9wdGlvbnMgfSBmcm9tIFwiLi9JRmluZEJ5UXVlcnlJbnB1dFwiO1xuaW1wb3J0IHsgSUZpbmRCeVF1ZXJ5UmVzdWx0IH0gZnJvbSBcIi4vSUZpbmRCeVF1ZXJ5UmVzdWx0XCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVGaW5kQnlRdWVyeTxUPihpbnB1dE9wdGlvbjogSUZpbmRCeVF1ZXJ5T3B0aW9ucylcbntcbiAgICByZXR1cm4gZXhlY3V0ZVBvc3Q8SUZpbmRCeVF1ZXJ5UmVzdWx0PFQ+PihcIi9hcGkvdjEvcHVibGljL3dvcmtJdGVtL2ZpbmRCeVF1ZXJ5XCIsIGlucHV0T3B0aW9uKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbn0iLCJpbXBvcnQgeyBleGVjdXRlRmluZEJ5UXVlcnkgfSBmcm9tIFwiLi9leGVjdXRlRmluZEJ5UXVlcnkvRmluZEJ5UXVlcnlcIjtcblxuZXhwb3J0IGludGVyZmFjZSBzZWFyY2hSZXN1bHQgXG57XG4gICAgZm91bmQ6Ym9vbGVhbiwgXG4gICAgdmFsdWU6c3RyaW5nIHwgdW5kZWZpbmVkLCBcbiAgICBwYXJlbnRJZDpzdHJpbmcgfCB1bmRlZmluZWRcbiAgICBkZXB0aDpudW1iZXIsXG4gICAgZm91bmRJbldvcmtJdGVtSWQ6c3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHdhc0ZvdW5kSW5BbmNlc3Rvcjpib29sZWFuLFxuICAgIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6c3RyaW5nIHwgdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUod29ya0l0ZW1JZDogc3RyaW5nLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIHBhcmVudHM6IGJvb2xlYW4sIG1heERlcHRoPzogbnVtYmVyIHwgdW5kZWZpbmVkKVxuIHtcbiAgICBsZXQgdXNlTWF4RGVwdGggOiBib29sZWFuID0gbWF4RGVwdGggPyB0cnVlIDogZmFsc2U7XG4gICAgaWYobWF4RGVwdGggJiYgbWF4RGVwdGggPiAwKXtcbiAgICAgICAgdXNlTWF4RGVwdGggPSB0cnVlO1xuICAgIH1cblxuXG4gICAgbGV0IHJldFZhbHVlOnNlYXJjaFJlc3VsdCA9IHtmb3VuZDpmYWxzZSwgdmFsdWU6dW5kZWZpbmVkLCBwYXJlbnRJZDp1bmRlZmluZWQsIGRlcHRoOjAsIGZvdW5kSW5Xb3JrSXRlbUlkOnVuZGVmaW5lZCwgd2FzRm91bmRJbkFuY2VzdG9yOmZhbHNlLCBmb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lOnVuZGVmaW5lZH07XG5cbiAgICByZXRWYWx1ZSA9IGF3YWl0IHNlYXJjaEZvckF0dHJpYnV0ZSh3b3JrSXRlbUlkLCBhdHRyaWJ1dGVOYW1lKTtcblxuICAgIGlmKHJldFZhbHVlLmZvdW5kKXtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIH1cblxuICAgIGlmKCFwYXJlbnRzICl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcGFyZW50cyBvciBjaGlsZHJlbiB0byBzZWFyY2ggc28gb25seSBzZWFyY2hpbmcgY3VycmVudCB3b3JrIGl0ZW1cIik7XG4gICAgICAgIHJldHVybiByZXRWYWx1ZVxuICAgIH1cblxuICAgIGlmKHBhcmVudHMpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNlYXJjaGluZyBwYXJlbnRzXCIpO1xuICAgICAgICBsZXQgZGVwdGggPSAwO1xuICAgICAgICBsZXQgc2VhcmNoUGFyZW50ID0gYXN5bmMgKHBhcmVudElkOiBzdHJpbmcgfCB1bmRlZmluZWQpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlcHRoKys7XG4gICAgICAgICAgICBsZXQgcjogc2VhcmNoUmVzdWx0ID0ge2ZvdW5kOmZhbHNlLFxuICAgICAgICAgICAgICAgICB2YWx1ZTp1bmRlZmluZWQsIFxuICAgICAgICAgICAgICAgICBwYXJlbnRJZDp1bmRlZmluZWQsIGRlcHRoOmRlcHRoLCAvL2RlcHRoIGhlcmUgd2lsbCBiZSBvdmVycmlkZW4gaWYgdGhlcmUgaXMgYSBwYXJlbnRcbiAgICAgICAgICAgICAgICAgZm91bmRJbldvcmtJdGVtSWQ6dW5kZWZpbmVkLCBcbiAgICAgICAgICAgICAgICAgd2FzRm91bmRJbkFuY2VzdG9yOmZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBmb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lOnVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZighcGFyZW50SWQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcGFyZW50IGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgciA9IGF3YWl0IHNlYXJjaEZvckF0dHJpYnV0ZShwYXJlbnRJZCwgYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICAgci5kZXB0aCA9IGRlcHRoOyAvL3VwZGF0ZSBkZXB0aCBhcyBpdCB3aWxsIGJlIDBcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHIuZm91bmQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRm91bmQgYXR0cmlidXRlIGluIHBhcmVudFwiKTtcbiAgICAgICAgICAgICAgICByLndhc0ZvdW5kSW5BbmNlc3RvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgaWYodXNlTWF4RGVwdGggJiYgZGVwdGggPj0gbWF4RGVwdGghKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJNYXggZGVwdGggcmVhY2hlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgaWYoIXIucGFyZW50SWQpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHBhcmVudCBmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IGZvdW5kIGluIHBhcmVudFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VhcmNoUGFyZW50KHIucGFyZW50SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0VmFsdWUgPSBhd2FpdCBzZWFyY2hQYXJlbnQocmV0VmFsdWUucGFyZW50SWQpO1xuICAgIH1cblxuICAgIHJldHVybiByZXRWYWx1ZTtcblxufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hGb3JBdHRyaWJ1dGUod29ya0l0ZW1JZDogc3RyaW5nLCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpIHtcbiAgICAvL2dldCB0aGUgbWF0dGVyXG4gICAgbGV0IHJldFZhbHVlIDpzZWFyY2hSZXN1bHQgPSB7XG4gICAgICAgIGZvdW5kOmZhbHNlLCB2YWx1ZTp1bmRlZmluZWQsXG4gICAgICAgICBwYXJlbnRJZDp1bmRlZmluZWQsIGRlcHRoOjAsXG4gICAgICAgICAgZm91bmRJbldvcmtJdGVtSWQ6dW5kZWZpbmVkLFxuICAgICAgICAgICB3YXNGb3VuZEluQW5jZXN0b3I6ZmFsc2UsXG4gICAgICAgICAgIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6dW5kZWZpbmVkfTtcbiAgICBsZXQgcmVxID0ge1xuICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIndvcmtJdGVtSWRzXCI6IFtcbiAgICAgICAgICAgICAgICB3b3JrSXRlbUlkXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiZW5yaWNoXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInBhdGhcIjogXCJ0aXRsZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInBhcmVudC5pZFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInR5cGUuc3lzdGVtTmFtZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInJlZmVyZW5jZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBhdHRyaWJ1dGVOYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2hpbmcgdXNpbmcgU2hhcmVEbyBJZDogXCIgKyB3b3JrSXRlbUlkKTtcbiAgICBsZXQgaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5ID0gYXdhaXQgZXhlY3V0ZUZpbmRCeVF1ZXJ5PGFueT4ocmVxKTtcblxuICAgIGlmKCFodHRwUmVzdWx0RmluZEJ5UXVlcnkpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHJlc3VsdCBmb3VuZFwiKTtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgV29yayBpdGVtICR7d29ya0l0ZW1JZH0gZm91bmRgKTtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0cykpO1xuXG5cbiAgICBsZXQgdHlwZVN5c3RlbU5hbWUgPSBodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0c1swXS5kYXRhW1widHlwZS5zeXN0ZW1OYW1lXCJdO1xuICAgIGxldCBwYXJlbnRJZCA9ICAgICAgIGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzWzBdLmRhdGFbXCJwYXJlbnQuaWRcIl07XG4gICAgbGV0IGF0dHJpYnV0ZSA9ICAgICAgaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5LnJlc3VsdHNbMF0uZGF0YVthdHRyaWJ1dGVOYW1lXSBhcyBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgXG4gICAgY29uc29sZS5sb2coYFR5cGUgc3lzdGVtIG5hbWUgaXMgJHt0eXBlU3lzdGVtTmFtZX1gKTtcbiAgICBjb25zb2xlLmxvZyhgUGFyZW50IElkIGlzICR7cGFyZW50SWR9YCk7XG4gICAgY29uc29sZS5sb2coYEF0dHJpYnV0ZSBbJHthdHRyaWJ1dGVOYW1lfV0gaXMgJHthdHRyaWJ1dGV9YCk7XG5cbiAgICByZXRWYWx1ZS52YWx1ZSA9IGF0dHJpYnV0ZTtcbiAgICBpZihhdHRyaWJ1dGUpe1xuICAgICAgICByZXRWYWx1ZS5mb3VuZCA9IHRydWU7XG4gICAgICAgIHJldFZhbHVlLmZvdW5kSW5Xb3JrSXRlbUlkID0gd29ya0l0ZW1JZDtcbiAgICAgICAgcmV0VmFsdWUuZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZSA9IHR5cGVTeXN0ZW1OYW1lO1xuICAgIH1cbiAgICByZXRWYWx1ZS5wYXJlbnRJZCA9IHBhcmVudElkO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIFxufSIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xuaW1wb3J0IHtcbiAgICBJU2hhcmVkb0JsYWRlTW9kZWwsXG4gICAgVFNoYXJlRG9CbGFkZSxcbiAgICBJQ29uZmlndXJhdGlvbkhvc3QsXG59IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL1NoYXJlZG9Bc3BlY3RNb2RlbHNcIjtcbmltcG9ydCB7IElEZWJ1ZyB9IGZyb20gXCIuL0lEZWJ1Z1wiO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gXCJ1dWlkXCI7XG5pbXBvcnQgeyBUU2hhcmVkbyB9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL1RTaGFyZWRvXCI7XG5pbXBvcnQge1xuICAgIElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWcsXG4gICAgSUVycm9yVHJhcCxcbiAgICBJU2hhcmVkb1BhbmVsQ29uZmlnLFxuICAgIElTdXBwb3J0QnV0dG9uLFxuICAgIElXaWRnZXRKc29uLFxuICAgIElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uLFxuICAgIFRVc2VyRXJyb3JzLFxufSBmcm9tIFwiLi9JbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBTaGFyZURvRXZlbnQsIGZpcmVFdmVudCB9IGZyb20gXCIuLi8uLi9Db21tb24vRXZlbnRzSGVscGVyXCI7XG5pbXBvcnQgeyBjbGVhclNlYywgZXJyLCBpbmYsIGwsIGxoMSwgbnYsIHdybiB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vTG9nXCI7XG5pbXBvcnQgeyBJRm9ybUJ1aWxkZXJEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvQXNwZWN0L0lGb3JtQnVpbGRlclwiO1xuaW1wb3J0IHsgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdCwgdG9PYnNlcnZhYmxlT2JqZWN0IH0gZnJvbSBcIi4vS09Db252ZXJ0ZXJcIjtcbmltcG9ydCB7XG4gICAgZ2V0TmVzdGVkUHJvcGVydHksXG4gICAgZ3ZrbyxcbiAgICBzZXROZXN0ZWRQcm9wZXJ0eSxcbiAgICBzdHJUb0NsYXNzLFxufSBmcm9tIFwiLi4vLi4vQ29tbW9uL09iamVjdEhlbHBlclwiO1xuaW1wb3J0IHsgZXNjYXBlSHRtbCB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vSHRtbEhlbHBlclwiO1xuaW1wb3J0IHsgSnNvblRvSHRtbENvbnZlcnRlciB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vSnNvblRvSFRNTENvbnZlcnRlclwiO1xuaW1wb3J0IHsgc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9hcGkvc2VhcmNoRm9yQXR0cmlidXRlV2l0aFBhcmVudHNcIjtcbmltcG9ydCB7XG4gICAgREVCVUdfREVGQVVMVCxcbiAgICBERUZBVUxUX0NPTkZJR1VSQVRJT05fU0VUVElOR1MsXG59IGZyb20gXCIuL0RlZmF1bHRTZXR0aW5nc1wiO1xuaW1wb3J0IHsgZGVib3VuY2VGdW5jdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vRGVib3VuZFwiO1xuaW1wb3J0IHsgZXhlY3V0ZUZpbmRCeVF1ZXJ5IH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9hcGkvZXhlY3V0ZUZpbmRCeVF1ZXJ5L0ZpbmRCeVF1ZXJ5XCI7XG5pbXBvcnQge1xuICAgIElHcmFwaFF1ZXJ5LFxuICAgIElHcmFwaFF1ZXJ5RGZhdWx0cyBhcyBJR3JhcGhRdWVyeURlZmF1bHRzLFxuICAgIElHcmFwaFF1ZXJ5RmllbGQsXG59IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL2FwaS9ncmFwaC9JR3JhcGhRdWVyeVwiO1xuaW1wb3J0IHsgSUZpbmRCeVF1ZXJ5T3B0aW9ucyB9IGZyb20gXCIuLi8uLi9Db21tb24vYXBpL2V4ZWN1dGVGaW5kQnlRdWVyeS9JRmluZEJ5UXVlcnlJbnB1dFwiO1xuaW1wb3J0IHsgZXhlY3V0ZUZpbmRCeUdyYXBoIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9hcGkvZXhlY3V0ZUZpbmRCeUdyYXBoL2V4ZWN1dGVGaW5kQnlHcmFwaFwiO1xuaW1wb3J0IHsgZXZhbHV0ZVJ1bGUsIGV4ZWN1dGVFbWJlZGRlZENvZGUgfSBmcm9tIFwiLi4vLi4vLi4vaGVscGVycy9ldmFsdXRlUnVsZVwiO1xuaW1wb3J0IHsgZGV0ZWN0IH0gZnJvbSBcImRldGVjdC1icm93c2VyXCI7XG5pbXBvcnQgeyBUZW1wbGF0ZUFwcGxpY2F0b3IgfSBmcm9tIFwiLi9UZW1wbGF0ZS9UZW1wbGF0ZUFwcGxpY2F0b3JcIjtcbmltcG9ydCB7IGRhdGEgfSBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgeyBEYXRhQ29udGV4dCB9IGZyb20gXCIuLi8uLi9Gb3JtaW8vQ29tbW9uL1NldERhdGFDb250ZXh0XCI7XG5cbmNvbnNvbGUubG9nKFwidjogLSAzLjI5XCIpO1xuXG5leHBvcnQgY29uc3QgRk9NUl9CVUlMREVSX1BBVEhfU1RSSU5HID0gXCJhc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhXCI7XG5leHBvcnQgY29uc3QgRVJST1JfRElWX1NFTEVDVE9SID0gXCIjcmVuZGVyLWVycm9ycy1oZXJlXCI7XG5cbmludGVyZmFjZSBJREVBc3BlY3RDb25maWd1cmF0aW9uIHtcbiAgICBtb2RlbDogSVNoYXJlZG9CbGFkZU1vZGVsO1xuICAgIGJsYWRlOiBUU2hhcmVEb0JsYWRlO1xufVxuXG50eXBlIE9ic2VydmFibGVpZnk8VD4gPSB7XG4gICAgW1AgaW4ga2V5b2YgVF06IGtvLk9ic2VydmFibGU8VFtQXT47XG59O1xuXG5leHBvcnQgdHlwZSBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnMyPFRDb25maWc+ID0ge1xuICAgIFtLIGluIGtleW9mIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPl06IGtvLk9ic2VydmFibGU8XG4gICAgICAgIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPltLXVxuICAgID47XG59O1xuXG5leHBvcnQgdHlwZSBPYnNlcnZhYmxlU2hhcmVkb0NvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+ID1cbiAgICBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+PjtcblxuZXhwb3J0IHR5cGUgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+ID0gTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxcbiAgICBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPFRDb25maWc+XG4+O1xuXG4vLyBleHBvcnQgdHlwZSBJT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+ID0gIHtkZWJ1Zzoga28uT2JzZXJ2YWJsZTxPYnNlcnZhYmxlSURlYnVnPn0gJlxuLy8ge1xuLy8gICAgIFtLIGluIGtleW9mIFRDb25maWddOiBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFRDb25maWc+W0tdO1xuXG4vLyB9XG5cbmV4cG9ydCB0eXBlIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPiA9IElDb25maWd1cmF0aW9uSG9zdCAmXG4gICAgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz47XG4vLyBhYnN0cmFjdCBjbGFzcyBDcmVhdG9yPFRDb25maWc+IHtcbi8vICAgICBwdWJsaWMgYWJzdHJhY3QgRmFjdG9yeU1ldGhvZChlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+LCBiYXNlTW9kZWw6IGFueSk6IGFueTtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1CdWlsZGVyRmllbGRQYXRoKGZvcm1CdWlsZGVyRmllbGQ6IHN0cmluZykge1xuICAgIHJldHVybiBgJHtGT01SX0JVSUxERVJfUEFUSF9TVFJJTkd9LiR7Zm9ybUJ1aWxkZXJGaWVsZH1gO1xufVxuXG50eXBlIE9ic2VydmFibGVQZXJzb248VENvbmZpZz4gPSBPYnNlcnZhYmxlaWZ5PFxuICAgIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPlxuPjtcblxuaW50ZXJmYWNlIElNb2RlbCB7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUlERUFzcGVjdDxUQ29uZmlnLCBUUGVyc2l0YW5jZT4ge1xuICAgIF9kYXRhOiBhbnk7IC8vbm9uIG1vZGVsIGRhdGEgc3RvcmFnZVxuICAgIG9yaWdpbmFsQ29uZmlndXJhdGlvbiE6IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgIGNvbmZpZ3VyYXRpb246XG4gICAgICAgIHwgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxUQ29uZmlnPlxuICAgICAgICB8IHVuZGVmaW5lZDtcbiAgICBzaGFyZWRvQ29uZmlndXJhdGlvbiE6IElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbiAgICBkZWZhdWx0czogSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxUQ29uZmlnPiB8IHVuZGVmaW5lZDtcbiAgICBlbGVtZW50ITogSFRNTEVsZW1lbnQ7XG4gICAgbW9kZWw6IElNb2RlbCB8IHVuZGVmaW5lZDtcbiAgICAvLyBlbmFibGVkITogYm9vbGVhbjtcbiAgICBibGFkZTogVFNoYXJlRG9CbGFkZSB8IHVuZGVmaW5lZDtcbiAgICBsb2FkZWQhOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIHNoYXJlZG9JZCE6IGtvLk9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPjtcbiAgICBwYXJlbnRTaGFyZWRvSWQhOiBrby5PYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gICAgc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIToga28uT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuICAgIHBoYXNlTmFtZSE6IGtvLk9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPjtcbiAgICBwaGFzZUlzT3BlbiE6IGtvLk9ic2VydmFibGU8Ym9vbGVhbiB8IHVuZGVmaW5lZD47XG4gICAgdmFsaWRhdGlvbjogYW55O1xuICAgIHZhbGlkYXRpb25FcnJvckNvdW50IToga28uT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIGJhc2VNb2RlbCE6IFRTaGFyZWRvPGFueT47XG4gICAgdGhpc0NvbXBvbmVudE5hbWUhOiBzdHJpbmc7XG4gICAgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhOiBzdHJpbmcgfCB1bmRlZmluZWQ7IC8vVGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbVxuICAgIHNoYXJlRG9PcHRpb25zITogT2JzZXJ2YWJsZVNoYXJlZG9Db25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPjtcbiAgICBfc2hhcmVEb09wdGlvbnMhOiBPYnNlcnZhYmxlU2hhcmVkb0NvbmZpZ3VyYXRpb25PcHRpb25zPHVua25vd24+OyAvL3VzZSBmb3IgdHlwaW5ncyBvZiB0aGlzIGJhc2UgaWRlIGFzIFRDb25maWcgY2F1c2VkIGlzc3VlXG4gICAgb3B0aW9uczpcbiAgICAgICAgfCBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8XG4gICAgICAgICAgICBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPFRDb25maWc+XG4gICAgICAgID5cbiAgICAgICAgfCB1bmRlZmluZWQ7XG4gICAgX29wdGlvbnM6XG4gICAgICAgIHwgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFxuICAgICAgICAgICAgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzx1bmtub3duPlxuICAgICAgICA+XG4gICAgICAgIHwgdW5kZWZpbmVkO1xuICAgIHVuaXF1ZUlkITogc3RyaW5nO1xuICAgIHdpZGdldFNldHRpbmdzITogSVdpZGdldEpzb248VENvbmZpZz47XG4gICAgYXNwZWN0TG9nT3V0cHV0OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICBsaXZlQ29uZmlnRGl2OiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICBsaXZlQ29uZmlnRGF0YTogYW55O1xuICAgIGVycm9yRGl2U2VsZWN0b3I6IHN0cmluZztcbiAgICBlcnJvcnM6IGtvLk9ic2VydmFibGVBcnJheTxUVXNlckVycm9ycz4gfCB1bmRlZmluZWQ7XG4gICAgcmVmcmVzaExvZzogQXJyYXk8YW55PjtcbiAgICBsYXN0UmVmcmVzaDogRGF0ZSB8IHVuZGVmaW5lZDtcbiAgICBkaXNwb3NhYmxlczogQXJyYXk8YW55PjtcblxuICAgIC8qKlxuICAgICAqIEJhc2UgQ29uc3RydWN0b3IgZm9yIGFsbCBJREVBc3BlY3RzLCBmb3JjZXMgdGhlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBsb2FkIGFuZCBzYXZlIG1ldGhvZHNcbiAgICAgKiBAcGFyYW0gY29tcG9uZW50TmFtZSAvL1RoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgZS5nLiBBc3BlY3QuUXVpY2tWaWV3XG4gICAgICogQHBhcmFtIGxvYWRTYXZlTG9jYXRpb24gLy9UaGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tIGUuZy4gbW9kZWwuYXNwZWN0LkZvcm1CdWlsZGVyLmZvcm1EYXRhXG4gICAgICogQHBhcmFtIGVsZW1lbnQgLy9UaGUgZWxlbWVudCB0aGF0IHRoZSBhc3BlY3QgaXMgYm91bmQgdG9cbiAgICAgKiBAcGFyYW0gY29uZmlndXJhdGlvbiAvL1RoZSBjb25maWd1cmF0aW9uIHBhc3NlZCBpbiBmcm9tIHRoZSBibGFkZSBhbmQgdGhlIGRlc2lnbiB0aW1lIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0gYmFzZU1vZGVsIC8vVGhlIGJhc2UgbW9kZWwgcGFzc2VkIGluIGZyb20gdGhlIGJsYWRlXG4gICAgICogQHBhcmFtIGRlZmF1bHRzIC8vVGhlIGRlZmF1bHRzIHBhc3NlZCBpbiBmcm9tIHRoZSB3aWRnZXQgdG8gc2V0IGluY2FzZSBvZiBiYWQgY29uZmlndXJhdGlvbiBvciBtaXNzaW5nIGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgY29uZmlndXJhdGlvbjogVENvbmZpZyxcbiAgICAgICAgYmFzZU1vZGVsOiBUU2hhcmVkbzxhbnk+XG4gICAgKTtcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoLi4uYXJyOiBhbnlbXSkge1xuICAgICAgICB0aGlzLndpZGdldFNldHRpbmdzID0gdGhpcy5zZXRXaWRnZXRKc29uU2V0dGluZ3MoKTtcbiAgICAgICAgdGhpcy50aGlzQ29tcG9uZW50TmFtZSA9IHRoaXMuc2V0VGhpc0NvbXBvbmVudE5hbWUoKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IHRoaXMuc2V0RGVmYXVsdHMoKTsgLy9zZXR1cCB0aGUgZGVmYXVsdCBieSBjYWxsaW5nIHRoZSBhYnN0cmFjdCBtZXRob2QgaW4gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5yZWZyZXNoTG9nID0gbmV3IEFycmF5PGFueT4oKTtcblxuICAgICAgICB0aGlzLmVycm9yRGl2U2VsZWN0b3IgPSBFUlJPUl9ESVZfU0VMRUNUT1I7XG4gICAgICAgIHRoaXMuZXJyb3JzID0ga28ub2JzZXJ2YWJsZUFycmF5PFRVc2VyRXJyb3JzPigpO1xuXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGJhc2UgY29uc3RydWN0b3JcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAvL1RoaXMgaXMgdGhlIGNvbnN0cnVjdG9yIHRoYXQgaXMgY2FsbGVkIGJ5IHRoZSBJREVcbiAgICAgICAgICAgIHRoaXMudW5pcXVlSWQgPSB1dWlkKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpc2UoYXJyWzBdLCBhcnJbMV0sIGFyclsyXSk7XG4gICAgICAgICAgICAvLyB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9IHRoaXMuc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk7XG4gICAgICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uU2V0dXBcIiwgdGhpcy5tb2RlbCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgICAgICAgICB0aGlzLmZpcmVFdmVudChcImFmdGVyU2V0dXBcIiwgdGhpcy5tb2RlbCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwTGl2ZUNvbmZpZygpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cEV2ZW50V2F0Y2hlcigpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cEVycm9yTWFuYWdlcigpO1xuICAgICAgICAgICAgdGhpcy5hZGRBc3BlY3RMb2dPdXRwdXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9pbml0aWFsaXNlKFxuICAgICAgICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgcG9sdXRlZENvbmZpZ3VyYXRpb246IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+LFxuICAgICAgICBiYXNlTW9kZWw6IFRTaGFyZWRvPGFueT5cbiAgICApIHtcbiAgICAgICAgLy9sZXQgY29uZmlndXJhdGlvbiA9IHBvbHV0ZWRDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb247IC8vUG9sdXRlZCBhcyBTaGFyZWRvIGFkZGVkIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gdG8gdGhzaSBvYmplY3QgZGVwZW5kaW5nIG9uIHdoZXJlIGl0cyBpbnN0YW5zaWF0ZWRcbiAgICAgICAgdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbiA9IHBvbHV0ZWRDb25maWd1cmF0aW9uO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAvL1NoYXJlRG8gcGFzc2VzIHRoZSBjb25maWcgYXMgd2VsbCBhcyBvdGhlciBzdHVmZiwgc28gd2UgbmVlZCB0byBleHRyYWN0IHRoZSBjb25maWdcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24gPSBwb2x1dGVkQ29uZmlndXJhdGlvbjtcbiAgICAgICAgdGhpcy5iYXNlTW9kZWwgPSBiYXNlTW9kZWw7XG5cbiAgICAgICAgLy8gdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb25cblxuICAgICAgICAvLyBsZXQgYmFzZURlZmF1bHRzOiBJRGVmYXVsdENvbmZpZ1NldHRpbmdzPGFueT4gPSB7XG4gICAgICAgIC8vICAgICBkZWJ1Zzoge1xuICAgICAgICAvLyAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAvLyAgICAgICAgIGxvZ1RvQ29uc29sZTogZmFsc2UsXG4gICAgICAgIC8vICAgICAgICAgc2hvd0luQXNwZWN0OiBmYWxzZSxcbiAgICAgICAgLy8gICAgICAgICBsaXZlQ29uZmlnOiBmYWxzZVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy9jaGVjayB0aGF0IHdlIGhhdmUgYSBzdWIgY29uZmlndXJhdGlvblxuICAgICAgICBpZiAoIXRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICBcIk5vIGNvbmZpZ3VyYXRpb24gZm91bmQgaW4gdGhlIHNoYXJlZG9Db25maWd1cmF0aW9uIC0gY2hlY2sgdGhlIGFzcGVjdCBvciB3aWRnZXQgY29uZmlnIHRoYXQgdGhlciBlaXMgYSBiYXNlIGNvbmZpZ3VyYXRpb24gb2YgY29uZmlndXJhdGlvbjp7fVwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29uZmlndXJhdGlvbiBmb3VuZCBpbiB0aGUgc2hhcmVkb0NvbmZpZ3VyYXRpb25cIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24gPSAkLmV4dGVuZChcbiAgICAgICAgICAgIERFRkFVTFRfQ09ORklHVVJBVElPTl9TRVRUSU5HUyxcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvblxuICAgICAgICApOyAvL21ha2Ugc3VyZSBkZWJ1ZyBpcyBzZXQgb3IgdXNlIGRlZmF1bHRzXG4gICAgICAgIC8vIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uLmRlYnVnID0gJC5leHRlbmQoYmFzZURlZmF1bHRzLmRlYnVnLCB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbi5kZWJ1ZykgYXMgSURlYnVnO1xuICAgICAgICAvLyBjb25maWd1cmF0aW9uLmRlYnVnID0gJC5leHRlbmQoYmFzZURlZmF1bHRzLCBjb25maWd1cmF0aW9uLmRlYnVnKSBhcyBJRGVidWc7XG5cbiAgICAgICAgLy8gdGhpcy5kYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBNZXJnZSB0aGUgY29uZmlndXJhdGlvbiB3aXRoIHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24gPSAkLmV4dGVuZChcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdHMsXG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9uXG4gICAgICAgICk7XG5cbiAgICAgICAgLy9jcmVhdGUgYSBuZXcgbW9kZWxcbiAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsO1xuICAgICAgICAvLyB0aGlzLmVuYWJsZWQgPSB0aGlzLm1vZGVsPy5jYW5FZGl0O1xuICAgICAgICB0aGlzLmJsYWRlID0gdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8uYmxhZGU7XG4gICAgICAgIHRoaXMubG9hZGVkID0gdGhpcy5sb2FkZWQgfHwga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgIC8vIE1hcCB0aGUgYmFzZSBtb2RlbCBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMuc2hhcmVkb0lkID1cbiAgICAgICAgICAgIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsLmlkIHx8XG4gICAgICAgICAgICAkdWkucGFnZUNvbnRleHQ/LnNoYXJlZG9JZCB8fFxuICAgICAgICAgICAga28ub2JzZXJ2YWJsZSh1bmRlZmluZWQpO1xuICAgICAgICBpZiAoIXRoaXMuc2hhcmVkb0lkIHx8IHRoaXMuc2hhcmVkb0lkKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gc2hhcmVkb0lkIGZvdW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUgPVxuICAgICAgICAgICAgdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWw/LnNoYXJlZG9UeXBlU3lzdGVtTmFtZSB8fFxuICAgICAgICAgICAgJHVpLnBhZ2VDb250ZXh0Py5zaGFyZWRvVHlwZU5hbWUgfHxcbiAgICAgICAgICAgIGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgaWYgKCF0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSB8fCAhdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBzaGFyZWRvVHlwZVN5c3RlbU5hbWUgZm91bmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBhcmVudFNoYXJlZG9JZCA9XG4gICAgICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbD8ucGFyZW50U2hhcmVkb0lkIHx8XG4gICAgICAgICAgICBrby5vYnNlcnZhYmxlKHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMucGhhc2VOYW1lID1cbiAgICAgICAgICAgIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsPy5waGFzZU5hbWUgfHxcbiAgICAgICAgICAgICR1aS5wYWdlQ29udGV4dD8ucGhhc2VOYW1lIHx8XG4gICAgICAgICAgICBrby5vYnNlcnZhYmxlKHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMucGhhc2VJc09wZW4gPVxuICAgICAgICAgICAgdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWw/LnBoYXNlSXNPcGVuIHx8XG4gICAgICAgICAgICAkdWkucGFnZUNvbnRleHQ/LnBoYXNlSXNPcGVuIHx8XG4gICAgICAgICAgICBrby5vYnNlcnZhYmxlKHVuZGVmaW5lZCk7XG4gICAgICAgIC8vIHRoaXMuc2hhcmVEb09wdGlvbnMgPSB0b09ic2VydmFibGVPYmplY3QodGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbiwgdGhpcy5zaGFyZURvT3B0aW9ucyk7XG4gICAgICAgIC8vIHRoaXMuX3NoYXJlRG9PcHRpb25zID0gdGhpcy5zaGFyZURvT3B0aW9ucyBhcyBPYnNlcnZhYmxlU2hhcmVkb0NvbmZpZ3VyYXRpb25PcHRpb25zPHVua25vd24+XG5cbiAgICAgICAgLy8gVmFsaWRhdGlvblxuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPSB7fTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JDb3VudCA9IHRoaXMudmFsaWRhdGlvbkVycm9yQ291bnQgfHwga28ub2JzZXJ2YWJsZSgwKTtcblxuICAgICAgICB0aGlzLmFwcGx5Q29tcG9uZW50Q29uZmlndXJhdGlvbih0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24pO1xuICAgICAgICAvL3NldHVwIHRoZSBsb2NhdGlvbiB0byBsb2FkIGFuZCBzYXZlIHRoZSBkYXRhIGZyb20gYnkgY2FsbGluZyB0aGUgYWJzdHJhY3QgbWV0aG9kIGluIHRoZSBjaGlsZCBjbGFzc1xuICAgICAgICAvLyEgLS0+IExvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA8LS0gLSB0aGlzIHNob3VsZCBiZSBjYWxsZWQgYXQgdGhlIGVuZCBvZiB0aGlzIGZ1bmN0aW9uIHRvIGVuc3VyZSB0aGF0IHRoZSBvcHRpb25zIGFuZCBjb25maWd1cmF0aW9uIGRhdGEgaXMgYXZhaWxhYmVsIHRvIHRoZSBjaGlsZCBjbGFzc1xuICAgICAgICB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9IHRoaXMuc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25Jbml0aWFsaXNlXCIsIHRoaXMubW9kZWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXBwbHlDb21wb25lbnRDb25maWd1cmF0aW9uKFxuICAgICAgICBjb25maWd1cmF0aW9uOiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPFRDb25maWc+XG4gICAgKSB7XG4gICAgICAgIGxldCBjb25maWd1cmF0aW9uQXNPYnNlcnZhYmxlcyA9IHRvT2JzZXJ2YWJsZU9iamVjdChcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbjtcblxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBjb25maWd1cmF0aW9uQXNPYnNlcnZhYmxlcztcbiAgICAgICAgLy8gISBOb3RlIGxpbmUgYmVsb3cgaXMgZm9yIHR5cGluZyB3aXRoaW4gdGhlIElERUJhc2UsIHRoZSBsaW5lIGFib3ZlIGlzIGZvciB0eXBpbmcgd2l0aGluIHRoZSBjaGlsZCBjbGFzc1xuICAgICAgICB0aGlzLl9vcHRpb25zID1cbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25Bc09ic2VydmFibGVzIGFzIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxcbiAgICAgICAgICAgICAgICBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPHVua25vd24+XG4gICAgICAgICAgICA+O1xuICAgIH1cblxuICAgIGNsZWFyRXJyb3JzKCkge1xuICAgICAgICB0aGlzLmVycm9ycz8ucmVtb3ZlQWxsKCk7XG4gICAgfVxuXG4gICAgc2V0dXBFcnJvck1hbmFnZXIoKSB7XG4gICAgICAgIHRoaXMubChcIlNldHRpbmcgdXAgZXJyb3IgbWFuYWdlclwiKTtcbiAgICAgICAgdGhpcy5lcnJvcnM/LnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5mKFwiRXJyb3JzIGNoYW5nZWRcIiwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5idWlsZEVycm9yRGl2KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldHVwTGl2ZUNvbmZpZygpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucz8uZGVidWcuc3Vic2NyaWJlKChuZXdWYWx1ZTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUubGl2ZUNvbmZpZykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVMaXZlQ29uZmlnKG5ld1ZhbHVlLmxpdmVDb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFjdGl2YXRlTGl2ZUNvbmZpZyh0aGlzLl9vcHRpb25zPy5kZWJ1ZygpLmxpdmVDb25maWcoKSk7IC8vVE9ETyBmaXggdHlwaW5nc1xuICAgIH1cblxuICAgIGFjdGl2YXRlTGl2ZUNvbmZpZyhhY3RpdmU6IGJvb2xlYW4gfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMubGl2ZUNvbmZpZ0Rpdj8ucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5saXZlQ29uZmlnRGl2KSB7XG4gICAgICAgICAgICAvL2xlYXZlIGFsb25lIGlmIGFscmVhZHkgYWN0aXZlXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmwoXCJTZXR0aW5nIHVwIGxpdmUgY29uZmlnXCIpO1xuXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWREYXRhID0gSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLFxuICAgICAgICAgICAgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBcIl9ob3N0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDRcbiAgICAgICAgKTtcblxuICAgICAgICAvL2Nsb25lIHRoZSBjb25maWdcbiAgICAgICAgbGV0IGNvbmZpZyA9IGtvLm9ic2VydmFibGUoc2VyaWFsaXplZERhdGEpO1xuXG4gICAgICAgIHRoaXMubGl2ZUNvbmZpZ0RhdGEgPSB7XG4gICAgICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgdGltZW91dDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMubGl2ZUNvbmZpZ0RpdiA9IHRoaXMuY3JlYXRlTGl2ZUNvbmZpZ0RpdigpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudC5wcmVwZW5kKHRoaXMubGl2ZUNvbmZpZ0Rpdik7XG4gICAgICAgIGxldCBhcHBseUNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDb21wb25lbnRDb25maWd1cmF0aW9uKEpTT04ucGFyc2UoY29uZmlnKCkpLmNvbmZpZ3VyYXRpb24pO1xuICAgICAgICAgICAgdGhpcy5saXZlQ29uZmlndXJhdGlvblJlZnJlc2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5idWlsZEVycm9yRGl2KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjb25maWcuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlYm91bmNlZEFwcGx5Q2hhbmdlID0gZGVib3VuY2VGdW5jdGlvbihhcHBseUNoYW5nZSwgMzAwMCk7XG4gICAgICAgICAgICAgICAgZGVib3VuY2VkQXBwbHlDaGFuZ2UoKTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVGhlIG5ldyB2YWx1ZSBpcyBcIiArIG5ld1ZhbHVlKVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGltZW91dCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgbmV3Q29uZmlnID0gSlNPTi5wYXJzZShjb25maWcoKSlcblxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmFwcGx5Q29tcG9uZW50Q29uZmlndXJhdGlvbihuZXdDb25maWcuY29uZmlndXJhdGlvbik7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMubGl2ZUNvbmZpZ3VyYXRpb25SZWZyZXNoZWQoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gdGhpcy5yZWZyZXNoKG5ld0NvbmZpZyk7XG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIHRoaXMucmVzZXQobmV3Q29uZmlnKTtcbiAgICAgICAgICAgICAgICAvLyB9LCA1MDApO1xuICAgICAgICAgICAgICAgIC8vIHRpbWVvdXQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDMwMDApO1xuXG4gICAgICAgIC8vIGtvLmFwcGx5QmluZGluZ3ModGhpcy5saXZlQ29uZmlnRGF0YSwgdGhpcy5saXZlQ29uZmlnRGl2KTt4XG5cbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGVuc3VyZVN0eWxlc0xvYWRlZChocmVmOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsaW5rW2hyZWY9XCIke2hyZWZ9XCJdYCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcbiAgICAgICAgICAgIGxpbmsuaHJlZiA9IGhyZWY7XG4gICAgICAgICAgICBsaW5rLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICAgICAgICAgICAgbGluay50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUxpdmVDb25maWdEaXYoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvLyBDcmVhdGUgdGhlIG91dGVyIDxkaXY+IHdpdGggY2xhc3MgXCJjb2wtc20tMTIgZm9ybWJ1aWxkZXItZWRpdG9yLWpzb25cIlxuICAgICAgICBjb25zdCBvdXRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG91dGVyRGl2LmNsYXNzTmFtZSA9IFwiY29sLXNtLTEyIGZvcm1idWlsZGVyLWVkaXRvci1qc29uXCI7XG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBpbm5lciA8ZGl2PiB3aXRoIHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlc1xuICAgICAgICBjb25zdCBpbm5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGlubmVyRGl2LmlkID0gXCJsaXZlQ29uZmlnXCI7XG4gICAgICAgIGlubmVyRGl2LmNsYXNzTmFtZSA9IFwiZm9ybS1jb250cm9sIHRleHRhcmVhXCI7XG4gICAgICAgIGlubmVyRGl2LnN0eWxlLmhlaWdodCA9IFwiMzAwcHhcIjtcbiAgICAgICAgLy8gaW5uZXJEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWJpbmQnLCAnc3ludGF4RWRpdG9yOiBsaXZlQ29uZmlnRGF0YS5jb25maWcsIGVuYWJsZTogdHJ1ZSwgZXZlbnQ6IHsgZm9jdXNvdXQ6IGxpdmVDb25maWdEYXRhLm9uRm9jdXNPdXQgfScpO1xuICAgICAgICBpbm5lckRpdi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJpbmRcIiwgXCJzeW50YXhFZGl0b3I6IGxpdmVDb25maWdEYXRhLmNvbmZpZ1wiKTtcbiAgICAgICAgLy8gaW5uZXJEaXYuc2V0QXR0cmlidXRlKCdkYXRhLWJpbmQnLCAnc3ludGF4RWRpdG9yOiBtb2RlbC5jb25maWcnKTtcbiAgICAgICAgLy8gQXBwZW5kIHRoZSBpbm5lckRpdiB0byB0aGUgb3V0ZXJEaXZcbiAgICAgICAgb3V0ZXJEaXYuYXBwZW5kQ2hpbGQoaW5uZXJEaXYpO1xuXG4gICAgICAgIHJldHVybiBvdXRlckRpdjtcbiAgICB9XG5cbiAgICBzZXR1cEV2ZW50V2F0Y2hlcigpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucz8uZXZlbnRzVG9SZWFjdFRvKCk/LmZvckVhY2goKGV2ZW50VG9XYXRjaCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdWJzY3JpYmluZyB0byBldmVudFwiLCBldmVudFRvV2F0Y2gpO1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICAgICR1aS5ldmVudHMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICBldmVudFRvV2F0Y2guZXZlbnRQYXRoKCksXG4gICAgICAgICAgICAgICAgICAgIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbXBvbmVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFRvV2F0Y2guZXZlbnRQYXRoKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUb1dhdGNoLm1ldGhvZFRvQ2FsbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0aGlzXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHJlZnJlc2hPbiA9IGtvLnRvSlModGhpcy5fb3B0aW9ucz8ucmVmcmVzaE9uKCkpO1xuICAgICAgICBpZiAocmVmcmVzaE9uKSB7XG4gICAgICAgICAgICBpZiAocmVmcmVzaE9uLnNoYXJlZG9JZENoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkb0lkLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbXBvbmVudChcInNoYXJlZG9JZENoYW5nZWRcIiwgXCJyZWZyZXNoXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZWZyZXNoT24uc2hhcmVkb1BhcmVudElkQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRTaGFyZWRvSWQuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29tcG9uZW50KFwic2hhcmVkb1BhcmVudElkQ2hhbmdlZFwiLCBcInJlZnJlc2hcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlZnJlc2hPbi5zaGFyZWRvUGhhc2VDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBoYXNlTmFtZS5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb21wb25lbnQoXCJzaGFyZWRvUGhhc2VDaGFuZ2VkXCIsIFwicmVmcmVzaFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaENvbXBvbmVudChcbiAgICAgICAgZXZlbnRQYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgICAgIG1ldGhvZFRvQ2FsbDogc3RyaW5nIHwgdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaExvZyA9IHRoaXMucmVmcmVzaExvZyB8fCBbXTtcbiAgICAgICAgaWYgKHRoaXMubGFzdFJlZnJlc2gpIHtcbiAgICAgICAgICAgIC8vVE9ETzogY2hhbmdlIHRoaXMgc28gd2UgY29sbGVjdCBhbGwgcmVmcmVzaGVzIGFuZCBkbyB0aGVtIGluIG9uZSBnb1xuICAgICAgICAgICAgbGV0IHNlY29uZHNTaW5jZUxhc3RSZWZyZXNoID1cbiAgICAgICAgICAgICAgICAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmxhc3RSZWZyZXNoLmdldFRpbWUoKSkgLyAxMDA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlY29uZHMgc2luY2UgbGFzdCByZWZyZXNoXCIsIHNlY29uZHNTaW5jZUxhc3RSZWZyZXNoKTtcbiAgICAgICAgICAgIGlmIChzZWNvbmRzU2luY2VMYXN0UmVmcmVzaCA8IDEwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTa2lwcGluZyByZWZyZXNoLCB0b28gc29vblwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3RSZWZyZXNoID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWZyZXNoaW5nIGNvbXBvbmVudFwiKTtcbiAgICAgICAgbGV0IGxvZ0l0ZW0gPSB7XG4gICAgICAgICAgICBldmVudFBhdGg6IGV2ZW50UGF0aCxcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogbWV0aG9kVG9DYWxsLFxuICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG1ldGhvZFRvQ2FsbCkge1xuICAgICAgICAgICAgICAgIC8vIGxldCBwYXJhbXMgPSB3aWRnZXRzLnBhcmFtZXRlcnM7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFeGVjdXRpbmcgbWV0aG9kXCIsIG1ldGhvZFRvQ2FsbCk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudFRvUmVmcmVzaCA9IHRoaXMgYXMgYW55O1xuICAgICAgICAgICAgICAgIGlmICghY29tcG9uZW50VG9SZWZyZXNoW21ldGhvZFRvQ2FsbF0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgICAgICBgTWV0aG9kIG5vdCBmb3VuZCBvbiBjb21wb25lbnQgJHt0aGlzLnRoaXNDb21wb25lbnROYW1lfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2RUb0NhbGxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRUb1JlZnJlc2hbbWV0aG9kVG9DYWxsXSgpOyAvL3RvZG86IHBhcmFtZXRlcnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgbG9nSXRlbS5zdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaExvZy5wdXNoKGxvZ0l0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVpbGRFcnJvckRpdigpIHtcbiAgICAgICAgdGhpcy5pbmYoXCJCdWlsZGluZyBlcnJvciBkaXZcIik7XG4gICAgICAgIGxldCBlcnJvckRpdiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZXJyb3JEaXZTZWxlY3Rvcik7XG4gICAgICAgIGlmICghZXJyb3JEaXYpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGwoXCJlcnJvckRpdi5pbm5lckhUTUxcIik7XG4gICAgICAgIGVycm9yRGl2LmlubmVySFRNTCA9IFwiXCI7IC8vY2xlYW4gb3V0IHRoZSBkaXZcblxuICAgICAgICBpZiAoIXRoaXMuZXJyb3JzKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ycyA9IGtvLm9ic2VydmFibGVBcnJheTxUVXNlckVycm9ycz4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lcnJvcnMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlcnJvckNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVycm9yRGl2LmFwcGVuZENoaWxkKGVycm9yQ29udGFpbmVyRGl2KTtcblxuICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3ItY29udGFpbmVyXCI7XG4gICAgICAgIGxldCB0aXRsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRpdGxlRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci10aXRsZVwiO1xuICAgICAgICB0aXRsZURpdi5pbm5lclRleHQgPSBcIlRoZXJlIGhhcyBiZWVuIGFuIGVycm9yOlwiO1xuICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZCh0aXRsZURpdik7XG4gICAgICAgIGxldCBmb3JlYWNoRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZXJyb3JDb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZm9yZWFjaERpdik7XG5cbiAgICAgICAgLy8gdGhpcy5lcnJvcnMoKS5mb3JFYWNoKChlcnJvcikgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZXJyb3JzKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBlcnJvciA9IHRoaXMuZXJyb3JzKClbaV07XG4gICAgICAgICAgICAvL0xvb2sgZm9yIGFueSB0cmFwcGluZyBhbmQgYWRkIHRvIHRoZSBlcnJvciBvYmplY3RcbiAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JUcmFwcGluZyhlcnJvcik7XG4gICAgICAgICAgICAvL1JlbmRlciB0aGUgZXJyb3IgZGl2IGFuZCBhZGQgdG8gdGhlIGZvcmVhY2ggZGl2XG4gICAgICAgICAgICBmb3JlYWNoRGl2LmFwcGVuZENoaWxkKHRoaXMuYnVpbGRJbmRpdmlkdWFsRXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1aWxkSW5kaXZpZHVhbEVycm9yKGVycm9yOiBUVXNlckVycm9ycykge1xuICAgICAgICBsZXQgdGVtcGxhdGVBcHBsaWNhdG9yID0gbmV3IFRlbXBsYXRlQXBwbGljYXRvcigpO1xuICAgICAgICBsZXQgZGF0YUNvbnRleHQgPSB0aGlzLmdldERhdGFDb250ZXh0KFt7IG9iajogZXJyb3IsIGtleTogXCJlcnJvclwiIH1dKTtcbiAgICAgICAgbGV0IGxpbmtlZFRyYXBwZWRFcnJvciA9IGVycm9yLmxpbmtlZFRyYXBwZWRFcnJvcjtcblxuICAgICAgICBsZXQgaW5kaXZpZHVhbEVycm9yRGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgICAgaW5kaXZpZHVhbEVycm9yRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1pbmRpdmlkdWFsLWVycm9yXCI7XG4gICAgICAgIGlmIChsaW5rZWRUcmFwcGVkRXJyb3IpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlQXBwbGljYXRvci5hZGRDU1MoXG4gICAgICAgICAgICAgICAgbGlua2VkVHJhcHBlZEVycm9yLmNsYXNzUnVsZXMsXG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEVycm9yRGl2LFxuICAgICAgICAgICAgICAgIFwiZGF0YUNvbnRleHRcIixcbiAgICAgICAgICAgICAgICBkYXRhQ29udGV4dFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRlbXBsYXRlQXBwbGljYXRvci5hZGRTdHlsZShcbiAgICAgICAgICAgICAgICBsaW5rZWRUcmFwcGVkRXJyb3Iuc3R5bGVSdWxlcyxcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsRXJyb3JEaXYsXG4gICAgICAgICAgICAgICAgXCJkYXRhQ29udGV4dFwiLFxuICAgICAgICAgICAgICAgIGRhdGFDb250ZXh0XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHVzZXJNZXNzYWdlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdXNlck1lc3NhZ2VEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLXVzZXItbWVzc2FnZVwiO1xuXG4gICAgICAgIGxldCBzdWdnZXN0aW9uc0RpdjogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBzdXBwb3J0QnV0dG9uRGl2OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGFjdGlvbnNEaXY6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICAvLyBhY3Rpb25zRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1hY3Rpb25zXCI7XG5cbiAgICAgICAgbGV0IGludGVybmFsU3VnZ2VzdGlvbnNEaXY6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICAvLyBpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1pbnRlcm5hbC1zdWdnZXN0aW9uc1wiO1xuXG4gICAgICAgIHVzZXJNZXNzYWdlRGl2LmlubmVySFRNTCA9XG4gICAgICAgICAgICBsaW5rZWRUcmFwcGVkRXJyb3I/LnVzZXJGcmVpbmRseU1lc3NhZ2UgfHxcbiAgICAgICAgICAgIGVycm9yLnVzZXJNZXNzYWdlIHx8XG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlIHx8XG4gICAgICAgICAgICBcIlVua25vd24gZXJyb3JcIjtcblxuICAgICAgICBpZiAobGlua2VkVHJhcHBlZEVycm9yPy51c2VyRnJlaW5kbHlIVE1MTWVzc2FnZVRlbXBsYXRlKSB7XG4gICAgICAgICAgICBsZXQgdXNlckZyZWluZGx5TWVzc2FnZSA9IGV4ZWN1dGVFbWJlZGRlZENvZGUoXG4gICAgICAgICAgICAgICAgbGlua2VkVHJhcHBlZEVycm9yLnVzZXJGcmVpbmRseUhUTUxNZXNzYWdlVGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgZGF0YUNvbnRleHRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB1c2VyTWVzc2FnZURpdi5pbm5lckhUTUwgPSB1c2VyRnJlaW5kbHlNZXNzYWdlO1xuICAgICAgICAgICAgLy9GaW5kIHNlY3Rpb24gZGl2cyBpbiB0aGUgdGVtcGxhdGUgaWYgdGhleSBleGlzdFxuICAgICAgICAgICAgc3VnZ2VzdGlvbnNEaXYgPVxuICAgICAgICAgICAgICAgICh1c2VyTWVzc2FnZURpdi5xdWVyeVNlbGVjdG9yKFwiLmlkZS1hc3BlY3QtZXJyb3Itc3VnZ2VzdGlvbnNcIikgYXNcbiAgICAgICAgICAgICAgICAgICAgfCBIVE1MRGl2RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB8IHVuZGVmaW5lZCkgfHwgc3VnZ2VzdGlvbnNEaXY7XG4gICAgICAgICAgICBhY3Rpb25zRGl2ID1cbiAgICAgICAgICAgICAgICAodXNlck1lc3NhZ2VEaXYucXVlcnlTZWxlY3RvcihcIi5pZGUtYXNwZWN0LWVycm9yLWFjdGlvbnNcIikgYXNcbiAgICAgICAgICAgICAgICAgICAgfCBIVE1MRGl2RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB8IHVuZGVmaW5lZCkgfHwgYWN0aW9uc0RpdjtcbiAgICAgICAgICAgIGludGVybmFsU3VnZ2VzdGlvbnNEaXYgPVxuICAgICAgICAgICAgICAgICh1c2VyTWVzc2FnZURpdi5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgICBcIi5pZGUtYXNwZWN0LWVycm9yLWludGVybmFsLXN1Z2dlc3Rpb25zXCJcbiAgICAgICAgICAgICAgICApIGFzIEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkKSB8fCBpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2O1xuICAgICAgICB9XG5cbiAgICAgICAgaW5kaXZpZHVhbEVycm9yRGl2LmFwcGVuZENoaWxkKHVzZXJNZXNzYWdlRGl2KTtcblxuICAgICAgICAvLyB1c2VyTWVzc2FnZURpdi5vbmNsaWNrID0gKCkgPT4ge1xuXG4gICAgICAgIC8vICAgICAvL2NyZWF0ZSBhIGRpdiB0aGF0IGNhbiBzY29sbFxuICAgICAgICAvLyAgICAgbGV0IGRldGFpbGVkTWVzc2FnZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIC8vICAgICBkZXRhaWxlZE1lc3NhZ2VEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWRldGFpbGVkLW1lc3NhZ2VcIjtcblxuICAgICAgICAvLyAgICAgY29uc3QgY29kZSA9IGVzY2FwZUh0bWwoZXJyb3IuY29kZSB8fCBcIlwiKTtcbiAgICAgICAgLy8gICAgIGNvbnN0IG1lc3NhZ2UgPSBlc2NhcGVIdG1sKGVycm9yLm1lc3NhZ2UgfHwgXCJcIik7XG4gICAgICAgIC8vICAgICBjb25zdCB1c2VyTWVzc2FnZSA9IGVzY2FwZUh0bWwoZXJyb3IudXNlck1lc3NhZ2UgfHwgXCJcIik7XG4gICAgICAgIC8vICAgICBjb25zdCBlcnJvclN0YWNrID0gZXNjYXBlSHRtbChlcnJvci5lcnJvclN0YWNrIHx8IFwiXCIpO1xuXG4gICAgICAgIC8vICAgICBjb25zdCBhZGRpdGlvbmFsSW5mbyA9IEpzb25Ub0h0bWxDb252ZXJ0ZXIuY29udmVydChlcnJvci5hZGRpdGlvbmFsSW5mbyB8fCB7fSk7XG5cbiAgICAgICAgLy8gICAgIGNvbnN0IGh0bWwgPSBgXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8aDI+RXJyb3I6ICR7Y29kZX08L2gyPlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+TWVzc2FnZTo8L3N0cm9uZz4gJHttZXNzYWdlfTwvcD5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPlVzZXIgTWVzc2FnZTo8L3N0cm9uZz4gJHt1c2VyTWVzc2FnZX08L3A+XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5TdGFjazo8L3N0cm9uZz4gJHtlcnJvclN0YWNrfTwvcD5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPkFkZGl0aW9uYWwgSW5mbzo8L3N0cm9uZz4gJHthZGRpdGlvbmFsSW5mb308L3A+XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcblxuICAgICAgICAvLyAgICAgZGV0YWlsZWRNZXNzYWdlRGl2LmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIC8vICAgICAkdWkuZXJyb3JEaWFsb2coZGV0YWlsZWRNZXNzYWdlRGl2KTtcblxuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy9jcmVhdGUgdGhlIHNlY3Rpb25zIGRpdnMgaWYgdGhleSBkb25lIGV4aXN0cyBhbmQgYWRkIHRvIHRoZSBpbmRpdmlkdWFsIGVycm9yIGRpdlxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIXN1Z2dlc3Rpb25zRGl2KSB7XG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxFcnJvckRpdi5hcHBlbmRDaGlsZChzdWdnZXN0aW9uc0Rpdik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghYWN0aW9uc0Rpdikge1xuICAgICAgICAgICAgICAgIGFjdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxFcnJvckRpdi5hcHBlbmRDaGlsZChhY3Rpb25zRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2KSB7XG4gICAgICAgICAgICAgICAgaW50ZXJuYWxTdWdnZXN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEVycm9yRGl2LmFwcGVuZENoaWxkKGludGVybmFsU3VnZ2VzdGlvbnNEaXYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXN1cHBvcnRCdXR0b25EaXYpIHtcbiAgICAgICAgICAgICAgICBzdXBwb3J0QnV0dG9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsRXJyb3JEaXYuYXBwZW5kQ2hpbGQoc3VwcG9ydEJ1dHRvbkRpdik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzb2x1dGlvblN1Z2dlc3Rpb25zID1cbiAgICAgICAgICAgIGxpbmtlZFRyYXBwZWRFcnJvcj8ucmVzb2x1dGlvblN1Z2dlc3Rpb25zIHx8XG4gICAgICAgICAgICBlcnJvci5pbnRlcm5hbFN1Z2dlc3Rpb25zIHx8XG4gICAgICAgICAgICBbXTtcbiAgICAgICAgaWYgKHJlc29sdXRpb25TdWdnZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzdWdnZXN0aW9uc0Rpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3Itc3VnZ2VzdGlvbnNcIjtcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zRGl2LmlubmVySFRNTCA9IGA8Yj5TdWdnZXN0aW9uczo8L2I+PGJyLz4ke3Jlc29sdXRpb25TdWdnZXN0aW9ucy5qb2luKFxuICAgICAgICAgICAgICAgIFwiPGJyLz5cIlxuICAgICAgICAgICAgKX1gO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFjdGlvbnMgPSBlcnJvci5zaGFyZWRvRXJyb3JBY3Rpb25zIHx8IFtdO1xuICAgICAgICBpZiAoYWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBhY3Rpb25zRGl2LmlubmVySFRNTCA9IGA8Yj5BY3Rpb25zOjwvYj48YnIvPiR7YWN0aW9ucy5qb2luKFwiPGJyLz5cIil9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbnRlcm5hbFN1Z2dlc3Rpb25zID0gZXJyb3IuaW50ZXJuYWxTdWdnZXN0aW9ucyB8fCBbXTtcbiAgICAgICAgaWYgKGludGVybmFsU3VnZ2VzdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaW50ZXJuYWxTdWdnZXN0aW9uc0Rpdi5pbm5lckhUTUwgPSBgPGI+SW50ZXJuYWwgU3VnZ2VzdGlvbnM6PC9iPjxici8+JHtpbnRlcm5hbFN1Z2dlc3Rpb25zLmpvaW4oXG4gICAgICAgICAgICAgICAgXCI8YnIvPlwiXG4gICAgICAgICAgICApfWA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3VwcG9ydEJ1dHRvbiA9XG4gICAgICAgICAgICBsaW5rZWRUcmFwcGVkRXJyb3I/LnN1cHBvcnRCdXR0b24gfHxcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbj8uZXJyb3JNYW5hZ2VtZW50Py51blRyYXBwZWRFcnJvcnNTdXBwb3J0QnV0dG9uO1xuICAgICAgICBpZiAoc3VwcG9ydEJ1dHRvbiAmJiBzdXBwb3J0QnV0dG9uLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGxldCBhY3Rpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgYWN0aW9uRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1zdXBwb3J0LWFjdGlvblwiO1xuICAgICAgICAgICAgaW5kaXZpZHVhbEVycm9yRGl2LmFwcGVuZENoaWxkKGFjdGlvbkRpdik7XG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBcImJ0biBidG4tcHJpbWFyeVwiO1xuXG4gICAgICAgICAgICBidXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU9wZW5QYW5lbChzdXBwb3J0QnV0dG9uLCBkYXRhQ29udGV4dCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0ZW1wbGF0ZUFwcGxpY2F0b3IuYWRkQ1NTKFxuICAgICAgICAgICAgICAgIHN1cHBvcnRCdXR0b24uY2xhc3NSdWxlcyxcbiAgICAgICAgICAgICAgICBhY3Rpb25EaXYsXG4gICAgICAgICAgICAgICAgXCJkYXRhQ29udGV4dFwiLFxuICAgICAgICAgICAgICAgIGRhdGFDb250ZXh0XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGVtcGxhdGVBcHBsaWNhdG9yLmFkZFN0eWxlKFxuICAgICAgICAgICAgICAgIHN1cHBvcnRCdXR0b24uc3R5bGVSdWxlcyxcbiAgICAgICAgICAgICAgICBhY3Rpb25EaXYsXG4gICAgICAgICAgICAgICAgXCJkYXRhQ29udGV4dFwiLFxuICAgICAgICAgICAgICAgIGRhdGFDb250ZXh0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gc3VwcG9ydEJ1dHRvbi50aXRsZTtcbiAgICAgICAgICAgIGFjdGlvbkRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGl2aWR1YWxFcnJvckRpdjtcbiAgICB9XG5cbiAgICBjcmVhdGVPcGVuUGFuZWwoXG4gICAgICAgIHN1cHBvcnRCdXR0b246IElTdXBwb3J0QnV0dG9uIHwgdW5kZWZpbmVkLFxuICAgICAgICBkYXRhQ29udGV4dDogYW55XG4gICAgKSB7XG4gXG4gICAgICAgIGlmICghc3VwcG9ydEJ1dHRvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IFxuXG5cbiAgICAgICAgbGV0IGJ1dHRvbkNvbmZpZyA9IHN1cHBvcnRCdXR0b24ucmFpc2VTdXBwb3J0VGlja2V0U2hhcmVkb0NvbW1hbmQ7XG4gICAgICAgIGxldCBzdXBwb3J0VGlja2V0TWVzc2FnZSA9IGJ1dHRvbkNvbmZpZy5kZXNjcmlwdGlvbiB8fCAgc3VwcG9ydEJ1dHRvbi5zdXBwb3J0VGlja2V0TWVzc2FnZSB8fCBcIlwiO1xuXG4gICAgICAgIGxldCBjb25maWc6IElTaGFyZWRvUGFuZWxDb25maWcgPVxuICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZTogZXhlY3V0ZUVtYmVkZGVkQ29kZShidXR0b25Db25maWcudGl0bGUsIGRhdGFDb250ZXh0KSxcbiAgICAgICAgICAgIHR5cGVTeXN0ZW1OYW1lOiBleGVjdXRlRW1iZWRkZWRDb2RlKGJ1dHRvbkNvbmZpZy50eXBlU3lzdGVtTmFtZSwgZGF0YUNvbnRleHQpLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ZXhlY3V0ZUVtYmVkZGVkQ29kZShzdXBwb3J0VGlja2V0TWVzc2FnZSwgZGF0YUNvbnRleHQpXG4gICAgICAgIH1cbiAgICAgICAgJHVpLm5hdi5pbnZva2Uoe1xuICAgICAgICAgICAgaW52b2tlVHlwZTogXCJwYW5lbFwiLFxuICAgICAgICAgICAgaW52b2tlOiBcIlNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uQWRkRWRpdFNoYXJlZG9cIixcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRFcnJvclRyYXBwaW5nKGVycm9yOiBUVXNlckVycm9ycykge1xuICAgICAgICAvL3J1biBydWxlcyBpbiBlcnJvciB0cmFwcyB0byBzZWUgaWYgdGhpcyBlcnJvciBoYXMgYmVlbiB0cmFwcGVkIGJoeSBhIHJ1bGVcbiAgICAgICAgbGV0IGVycm9yVHJhcHBlZCA9IGZhbHNlO1xuICAgICAgICAvLyBsZXQgZXJyb3JUcmFwcyA9IGd2a288SUVycm9yVHJhcFtdPih0aGlzLl9vcHRpb25zPy5lcnJvck1hbmFnZW1lbnQoKT8uZXJyb3JUcmFwcykgfHwgW107XG4gICAgICAgIGxldCBlcnJvclRyYXBzID0gdGhpcy5jb25maWd1cmF0aW9uPy5lcnJvck1hbmFnZW1lbnQ/LmVycm9yVHJhcHMgfHwgW107XG5cbiAgICAgICAgLy8gZXJyb3JUcmFwcy5mb3JFYWNoKCh0cmFwKSA9PiB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgZXJyb3JUcmFwc0luZGV4ID0gMDtcbiAgICAgICAgICAgIGVycm9yVHJhcHNJbmRleCA8IGVycm9yVHJhcHMubGVuZ3RoO1xuICAgICAgICAgICAgZXJyb3JUcmFwc0luZGV4KytcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgdHJhcCA9IGVycm9yVHJhcHNbZXJyb3JUcmFwc0luZGV4XTtcbiAgICAgICAgICAgIGlmICh0cmFwLmVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBkYXRhQ29udGV4dCA9IHRoaXMuZ2V0RGF0YUNvbnRleHQoW3sgb2JqOiBlcnJvciwga2V5OiBcImVycm9yXCIgfV0pO1xuICAgICAgICAgICAgICAgIGwoXG4gICAgICAgICAgICAgICAgICAgIGBFdmFsdWF0aW5nIHJ1bGUgWyR7dHJhcC5ydWxlfV0gb24gZXJyb3IgJHtlcnJvcn0gd2l0aCBkYXRhQ29udGV4dDpgLFxuICAgICAgICAgICAgICAgICAgICBkYXRhQ29udGV4dFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgbGV0IHJ1bGVSZXN1bHQgPSBldmFsdXRlUnVsZSh0cmFwLnJ1bGUsIGRhdGFDb250ZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAocnVsZVJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvclRyYXBwZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBlcnJvci5saW5rZWRUcmFwcGVkRXJyb3IgPSB0cmFwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0RGF0YUNvbnRleHQoYWRkaXRpb25hbD86IFt7IG9iajogYW55OyBrZXk6IHN0cmluZyB9XSB8IHVuZGVmaW5lZCk6IGFueSB7XG4gICAgICAgIGNvbnN0IGJyb3dzZXIgPSBkZXRlY3QoKTtcbiAgICAgICAgbGV0IGRhdGFDb250ZXh0OiBhbnkgPSB7XG4gICAgICAgICAgICB0aGlzQ29tcG9uZW50TmFtZTogdGhpcy50aGlzQ29tcG9uZW50TmFtZSxcbiAgICAgICAgICAgIHVzZXI6IGtvLnRvSlMoJHVpLnBhZ2VDb250ZXh0Py51c2VyKSxcbiAgICAgICAgICAgIHBhZ2VDb250ZXh0OiBrby50b0pTKCR1aS5wYWdlQ29udGV4dCksXG4gICAgICAgICAgICBhc3BlY3REYXRhOiBrby50b0pTKHRoaXMuYmFzZU1vZGVsKSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb246IGtvLnRvSlModGhpcy5fb3B0aW9ucyksXG4gICAgICAgICAgICBicm93c2VyOiBicm93c2VyLFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBhZGRpdGlvbmFsRGF0YSA9IGFkZGl0aW9uYWwgfHwgW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkaXRpb25hbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gYWRkaXRpb25hbERhdGFbaV07XG4gICAgICAgICAgICBkYXRhQ29udGV4dFtpdGVtLmtleV0gPSBpdGVtLm9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhQ29udGV4dDtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGVTdXBwb3J0VGFzaygpIHtcbiAgICAvLyAgICAgLy9UT0RPOiBDcmVhdGUgYSBzdXBwb3J0IHRhc2tcbiAgICAvLyAgICAgJHVpLm5hdi5pbnZva2Uoe1xuICAgIC8vICAgICAgICAgXCJpbnZva2VUeXBlXCI6IFwicGFuZWxcIixcbiAgICAvLyAgICAgICAgIFwiaW52b2tlXCI6IFwiU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5BZGRFZGl0U2hhcmVkb1wiLFxuICAgIC8vICAgICAgICAgXCJjb25maWdcIjogXCJ7XFxcInR5cGVTeXN0ZW1OYW1lXFxcIjpcXFwidGFzay1lZGRpc2NvdmVyeS1hZGhvY1xcXCIsXFxcInRpdGxlXFxcIjpcXFwiXFxcIixcXFwiU3VwcG9ydCBSZXF1ZXN0XFxcIjpcXFwiXFxcIn1cIlxuICAgIC8vICAgICB9KTtcblxuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIEFic3RyYWN0IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gcmVmcmVzaCB0aGUgYXNwZWN0XG4gICAgICogQHBhcmFtIG5ld0NvbmZpZ1xuICAgICAqL1xuICAgIGFic3RyYWN0IHJlZnJlc2gobmV3Q29uZmlnOiBhbnkpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQWJzdHJhY3QgbWV0aG9kIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyB0byByZXNldCB0aGUgYXNwZWN0IGJhc2VkXG4gICAgICogQHBhcmFtIG5ld0NvbmZpZ1xuICAgICAqL1xuICAgIGFic3RyYWN0IHJlc2V0KG5ld0NvbmZpZzogYW55KTogdm9pZDtcblxuICAgIGFic3RyYWN0IGxpdmVDb25maWd1cmF0aW9uUmVmcmVzaGVkKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiAhIGltcG9ydGFudDogTWFuZGF0b3J5IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gc2V0IHRoZSBkZWZhdWx0c1xuICAgICAqICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJ5IHRoZSBjb25zdHJ1Y3RvciB0byBzZXQgdGhlIGRlZmF1bHRzXG4gICAgICogQHJldHVybnMgRGVmYXVsdHM8VENvbmZpZz5cbiAgICAgKiBAbWVtYmVyb2YgQmFzZUlERUFzcGVjdFxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0RGVmYXVsdHMoKTogSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxUQ29uZmlnPjtcblxuICAgIC8vIC8qKlxuICAgIC8vICAqICEgaW1wb3J0YW50OiBNYW5kYXRvcnkgbWV0aG9kIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyB0byBzZXQgdGhlIGRlZmF1bHRzIGZvciB0aGUgd2lkZ2V0Lmpzb25cbiAgICAvLyAgKi9cbiAgICAvLyBhYnN0cmFjdCBzZXRFeGFtcGxlRm9yTW9kZWxsZXIoKTogRGVmYXVsdHM8VENvbmZpZz47XG5cbiAgICAvKipcbiAgICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gbG9hZCBhbmQgc2F2ZSB0b1xuICAgICAqIEV4YW1wbGVzIG9mIHRoaXMgYXJlOlxuICAgICAqIC0gYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YS57Zm9ybUJ1aWxkZXJGaWVsZH1cbiAgICAgKiAtIGFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyXG4gICAgICogLSB1bmRlZmluZWQgKGlmIG5vIGRhdGEgaXMgdG8gYmUgbG9hZGVkIG9yIHNhdmVkIGJ5IHRoZSBiYXNlIGNsYXNzKVxuICAgICAqIEByZXR1cm5zIFRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBsb2FkIGFuZCBzYXZlIHRvIE9SIHVuZGVmaW5lZCBpZiBubyBkYXRhIGlzIHRvIGJlIGxvYWRlZCBvciBzYXZlZCBieSB0aGUgYmFzZSBjbGFzc1xuICAgICAqL1xuICAgIGFic3RyYWN0IHNldExvY2F0aW9uT2ZEYXRhVG9Mb2FkQW5kU2F2ZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgbmFtZSBvZiB0aGUgY29tcG9uZW50IGUuZy4gUXVpY2tWaWV3XG4gICAgICogVGhpcyB3aWxsIGFsc28gYmUgdXNlZCBkdXJpbmcgdGhlIGJ1aWxkIGFuZCB3aWxsIGJlIGFwcGVuZGVkIHdpdGggdGhlIEJ1aWx0IFRhcmdldCBlLmcuIElERUFzcGVjdHMuUXVpY2tWaWV3XG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0VGhpc0NvbXBvbmVudE5hbWUoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogIUlNUE9SVEFOVCAtIFRoaXMgaXMgdGhlIGZpcnN0IG1ldGhvZCBvbmNlIHRoZSBjbGFzcyBoYXMgYmVlbiBjb25zdHJ1Y3RlZCwgZGVmYXVsdCBjb250cnVjdG9yIGxvZ2ljIHNob3VsZCBiZSBwbGFjZWQgaGVyZVxuICAgICAqL1xuICAgIGFic3RyYWN0IHNldHVwKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgc2V0dGluZ3MgZm9yIHRoZSB3aWRnZXQuanNvbiB0aGF0IHdpbGwgYmUgZ2VuZXJhdGVkXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0V2lkZ2V0SnNvblNldHRpbmdzKCk6IElXaWRnZXRKc29uPFRDb25maWc+O1xuXG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50U2NyaXB0RmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50U3R5bGVGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRUZW1wbGF0ZUZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudE1lbnVUZW1wbGF0ZUZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudENvbXBvbmVudEZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldFdpZGdldERlc2lnbmVyU2V0dGluZ3MoKTogSVdpZGdldEpzb25EZXNpZ25lcjtcbiAgICAvLyBhYnN0cmFjdCBzZXRQcmlvcml0eSgpIDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgd2hlbiB0aGUgbW9kZWwgaXMgc2F2ZWQuIE1hbmlwdWxhdGUgdGhlXG4gICAgICogbW9kZWwgYXMgcmVxdWlyZWQuXG4gICAgICovXG4gICAgb25TYXZlKG1vZGVsOiBhbnkpIHtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvblNhdmVcIiwgbW9kZWwpO1xuXG4gICAgICAgIGxldCBkYXRhVG9TYXZlID0gdGhpcy5fZGF0YTtcbiAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgICBcIlNhdmluZywgbW9kZWwgcGFzc2VkIGluIHdlIG5lZWQgdG8gcGVyc2lzdCB0b1wiLFxuICAgICAgICAgICAgXCJncmVlblwiLFxuICAgICAgICAgICAgZGF0YVRvU2F2ZVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgICAgICBcIk5vIGxvY2F0aW9uIHRvIHNhdmUgZGF0YSB0byBzZXQgLSB0aGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcnJpZGVuXCIsXG4gICAgICAgICAgICAgICAgXCJyZWRcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhVG9QZXJzaXN0ID0gdGhpcy5fZGF0YTtcbiAgICAgICAgbGV0IGN1cnJlbnREYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgaWYgKGN1cnJlbnREYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgICAgICBgQ3VycmVudCBkYXRhIGF0IGxvY2F0aW9uICR7dGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGF9IDpgLFxuICAgICAgICAgICAgICAgIFwibWFnZW50YVwiLFxuICAgICAgICAgICAgICAgIGN1cnJlbnREYXRhXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudERhdGEpIHtcbiAgICAgICAgICAgIC8vIHRoaXMubG9nKFwiRGF0YSBkb2VzIG5vdCBleGlzdCwgd2Ugd2lsbCBjcmVhdGVcIiwgXCJvcmFuZ2VcIik7XG4gICAgICAgICAgICAvLyAgc2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCB7fSk7XG4gICAgICAgICAgICAvLyBjdXJyZW50RGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgICBgTmV3IGRhdGEgdG8gcGVyc2lzdCB0byBsb2NhdGlvbiAke3RoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhfSA6YCxcbiAgICAgICAgICAgIFwiYmx1ZVwiLFxuICAgICAgICAgICAgZGF0YVRvUGVyc2lzdFxuICAgICAgICApO1xuICAgICAgICBzZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIGRhdGFUb1BlcnNpc3QpO1xuXG4gICAgICAgIHRoaXMubChcIkRhdGEgc2F2ZWRcIiwgbW9kZWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRhdGEgdG8gbG9hZCwgZGVmYXVsdHMgdG8gTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhIHVubGVzcyBhIGZpZWxkUGF0aCBpcyBwYXNzZWQgaW5cbiAgICAgKiBAcGFyYW0gZmllbGRQYXRoXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBhc3luYyBnZXREYXRhKGZpZWxkUGF0aD86IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBmaWVsZFBhdGggPSBmaWVsZFBhdGggfHwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGE7XG5cbiAgICAgICAgLy9UaGlzIHNlY3Rpb24gaXMgZD11c2UgZHVlIHRvIHR5cGluZyBpc3N1ZSB0aGF0IG5lZWRzIHRvIGJlIHJlc29sdmVkLlxuICAgICAgICAvLyBsZXQgdXNlUGFyZW50cyA9IGd2a28odGhpcy5fb3B0aW9ucy5kYXRhU2V0dGluZ3MoKS5nZXRWYWx1ZVVzaW5nUGFyZW50cykgYXMgYm9vbGVhbiB8IHVuZGVmaW5lZFxuICAgICAgICAvLyBsZXQgc2hhcmVEb0lkPSBndmtvKHRoaXMuc2hhcmVkb0lkKVxuICAgICAgICAvLyBsZXQgbWF4RGVwdGggPSBndmtvKHRoaXMuX29wdGlvbnMuZGF0YVNldHRpbmdzKCkubWF4RGVwdGgpIGFzIG51bWJlciB8IHVuZGVmaW5lZFxuICAgICAgICAvLyBsZXQgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gZ3Zrbyh0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSkgYXMgc3RyaW5nIHwgdW5kZWZpbmVkXG4gICAgICAgIC8vZW5kIGFyZWEgb2YgdHlwaW5nIGlzc3VlXG5cbiAgICAgICAgbGV0IHVzZVBhcmVudHMgPSB0aGlzLl9vcHRpb25zPy5kYXRhU2V0dGluZ3MoKS5nZXRWYWx1ZVVzaW5nUGFyZW50cygpO1xuICAgICAgICBsZXQgc2hhcmVEb0lkID0gdGhpcy5zaGFyZWRvSWQoKTtcbiAgICAgICAgbGV0IG1heERlcHRoID0gdGhpcy5fb3B0aW9ucz8uZGF0YVNldHRpbmdzKCkubWF4RGVwdGgoKTtcblxuICAgICAgICAvLyBsZXQgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gZ3Zrbyh0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG5cbiAgICAgICAgaWYgKGZpZWxkUGF0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgICAgICBcIk5vIGxvY2F0aW9uIHRvIGxvYWQgZGF0YSBmcm9tIHNldCAtIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZW5cIixcbiAgICAgICAgICAgICAgICBcInJlZFwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkodGhpcy5tb2RlbCwgZmllbGRQYXRoKTtcblxuICAgICAgICBpZiAodGhpcy5fZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmwoXCJEYXRhIGZvdW5kIGF0IGxvY2F0aW9uXCIsIHRoaXMuX2RhdGEpO1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGtvLnRvSlModGhpcy5fZGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgZGF0YSBvdCBmb3VuZCBpbiB0aGUgY3VycmVudCBtb2RlbCwgbG9vayB2aWEgdGhlIHNlYXJjaFxuICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gdW5kZWZpbmVkICYmIHVzZVBhcmVudHMgPT09IGZhbHNlICYmIHNoYXJlRG9JZCkge1xuICAgICAgICAgICAgLy8hIFRPRE8gRml4IFR5cGluZ3NcbiAgICAgICAgICAgIHJldHVybiBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUoc2hhcmVEb0lkLCBmaWVsZFBhdGgsIGZhbHNlKS50aGVuKFxuICAgICAgICAgICAgICAgIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2RhdGEgPT09IHVuZGVmaW5lZCAmJiB1c2VQYXJlbnRzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyEgVE9ETyBGaXggVHlwaW5nc1xuICAgICAgICAgICAgbGV0IGlkVG9Vc2VyID0gdGhpcy5zaGFyZWRvSWQoKSB8fCB0aGlzLnBhcmVudFNoYXJlZG9JZCgpO1xuXG4gICAgICAgICAgICBpZiAoIWlkVG9Vc2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgICAgICAgICAgIFwiTm8gaWQgdG8gdXNlIGZvciBzZWFyY2ggYm90aCBzaGFyZWRvSWQgYW5kIHBhcmVudFNoYXJlZG9JZCBhcmUgdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZShcbiAgICAgICAgICAgICAgICBpZFRvVXNlcixcbiAgICAgICAgICAgICAgICBmaWVsZFBhdGgsXG4gICAgICAgICAgICAgICAgdXNlUGFyZW50cyxcbiAgICAgICAgICAgICAgICBtYXhEZXB0aFxuICAgICAgICAgICAgKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUoXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGF0dHJpYnV0ZTogc3RyaW5nLFxuICAgICAgICB1c2VQYXJlbnRzOiBib29sZWFuLFxuICAgICAgICBtYXhEZXB0aDogbnVtYmVyIHwgdW5kZWZpbmVkXG4gICAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZShpZCwgYXR0cmlidXRlLCB1c2VQYXJlbnRzLCBtYXhEZXB0aCk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2VhcmNoQnlHcmFwaChmaWVsZFBhdGg6IHN0cmluZywgdXNlUGFyZW50OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGlucHV0T3B0aW9uOiBJR3JhcGhRdWVyeSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoSUdyYXBoUXVlcnlEZWZhdWx0cykpO1xuICAgICAgICBsZXQgc2hhcmVEb0lkID0gdGhpcy5zaGFyZWRvSWQoKTtcbiAgICAgICAgbGV0IHBhcmVudElkID0gdGhpcy5wYXJlbnRTaGFyZWRvSWQoKTtcblxuICAgICAgICBsZXQgcXVlcnk6IElHcmFwaFF1ZXJ5RmllbGQgPSB7XG4gICAgICAgICAgICBwYXRoOiBmaWVsZFBhdGgsXG4gICAgICAgIH07XG5cbiAgICAgICAgaW5wdXRPcHRpb24uZmllbGRzLnB1c2gocXVlcnkpO1xuXG4gICAgICAgIGlmICh1c2VQYXJlbnQgPT09IGZhbHNlICYmIHNoYXJlRG9JZCkge1xuICAgICAgICAgICAgLy8hIFRPRE8gRml4IFR5cGluZ3NcbiAgICAgICAgICAgIGlucHV0T3B0aW9uLmVudGl0eUlkID0gc2hhcmVEb0lkO1xuICAgICAgICB9IGVsc2UgaWYgKHVzZVBhcmVudCA9PT0gdHJ1ZSAmJiBwYXJlbnRJZCkge1xuICAgICAgICAgICAgLy8hIFRPRE8gRml4IFR5cGluZ3NcbiAgICAgICAgICAgIGlucHV0T3B0aW9uLmVudGl0eUlkID0gcGFyZW50SWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlucHV0T3B0aW9uLmVudGl0eUlkKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgICAgICBcIk5vIGlkIHRvIHVzZSBmb3Igc2VhcmNoIGJvdGggc2hhcmVkb0lkIGFuZCBwYXJlbnRTaGFyZWRvSWQgYXJlIHVuZGVmaW5lZFwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVGaW5kQnlHcmFwaChpbnB1dE9wdGlvbik7XG5cbiAgICAgICAgaWYgKHJlc3VsdC5pbmZvLnN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIkVycm9yIGV4ZWN1dGluZyBzZWFyY2hcIiwgXCJyZWRcIiwgcmVzdWx0LmluZm8pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhPy5kYXRhW2ZpZWxkUGF0aF07XG4gICAgfVxuXG4gICAgc2V0RGF0YSh2YWx1ZTogVFBlcnNpdGFuY2UgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgbGV0IHZhbHVlVG9QZXJzaXN0ID0ga28udG9KUyh2YWx1ZSk7XG4gICAgICAgIGxldCBwcmV2aW91c1ZhbHVlID0ga28udG9KUyh0aGlzLl9kYXRhKTtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlVG9QZXJzaXN0O1xuICAgICAgICB0aGlzLmZpcmVWYWx1ZUNoYW5nZWRFdmVudChcIm9uRGF0YUJlZm9yZUNoYW5nZWRcIiwge1xuICAgICAgICAgICAgcHJldmlvdXNWYWx1ZTogcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgICAgIG5ld1ZhbHVlOiB2YWx1ZVRvUGVyc2lzdCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YWx1ZVRvU2V0OiBhbnkgPSB2YWx1ZTtcbiAgICAgICAgLy8gaWYodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEuaW5jbHVkZXMoXCJmb3JtQnVpbGRlclwiKSlcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgLy9mb3JtYnVpbGRlciBEYXRhIGFsd2F5cyBuZWVkIHRvIGJlIHN0cmluZ1xuICAgICAgICAvLyAgICAgdGhpcy5sb2coXCJTZXR0aW5nIGZvcm1idWlsZGVyIGRhdGEgLSBjb252ZXJ0aW5nIHRvIHN0cmluZ1wiLCBcImdyZWVuXCIsIHZhbHVlKVxuICAgICAgICAvLyAgICAgdmFsdWVUb1NldCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgLy8gICAgIHRoaXMubG9nKFwiYWZ0ZXIgU2V0dGluZyBmb3JtYnVpbGRlciBkYXRhIC0gY29udmVydGVkIHRvIHN0cmluZ1wiLCBcImdyZWVuXCIsIHZhbHVlVG9TZXQpXG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5sb2coXCJTZXR0aW5nIGRhdGEgYXQgbG9jYXRpb25cIiwgXCJncmVlblwiLCB2YWx1ZVRvU2V0KTtcbiAgICAgICAgc2V0TmVzdGVkUHJvcGVydHkodGhpcy5tb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIHRoaXMuX2RhdGEpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uRGF0YUNoYW5nZWRcIiwgdGhpcy5tb2RlbCk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KG1vZGVsPzogYW55KSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25EZXN0cm95XCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uRGVzdHJveVwiLCBtb2RlbCk7XG4gICAgICAgICR1aS51dGlsLmRpc3Bvc2UodGhpcy5kaXNwb3NhYmxlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBVSSBmcmFtZXdvcmsgYWZ0ZXIgaW5pdGlhbCBjcmVhdGlvbiBhbmQgYmluZGluZyB0byBsb2FkIGRhdGFcbiAgICAgKiBpbnRvIGl0J3MgbW9kZWxcbiAgICAgKi9cbiAgICBsb2FkQW5kQmluZCgpIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBsb2FkQW5kQmluZFwiKTtcbiAgICAgICAgdGhpcy5sb2coXCJMb2FkaW5nIGRhdGEgKG1vZGVsOmFueSkgcGFzc2VkIGluXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgICAgXCJMb2FkaW5nIGRhdGEgYmFzZWQgb24gbG9jYXRpb24gdG8gc2F2ZVwiLFxuICAgICAgICAgICAgXCJncmVlblwiLFxuICAgICAgICAgICAgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGFcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkxvYWRcIiwgdGhpcy5tb2RlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgYmVmb3JlIHRoZSBtb2RlbCBpcyBzYXZlZFxuICAgICAqL1xuICAgIG9uQmVmb3JlU2F2ZShtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uQmVmb3JlU2F2ZVwiKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkJlZm9yZVNhdmVcIiwgbW9kZWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIGFmdGVyIHRoZSBtb2RlbCBoYXMgYmVlbiBzYXZlZC5cbiAgICAgKi9cbiAgICBvbkFmdGVyU2F2ZShtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uQWZ0ZXJTYXZlXCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uQWZ0ZXJTYXZlXCIsIG1vZGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciB3aGVuIGl0IHJlbG9hZHMgYXNwZWN0IGRhdGFcbiAgICAgKi9cbiAgICBvblJlbG9hZChtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uUmVsb2FkXCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uUmVsb2FkXCIsIG1vZGVsKTtcbiAgICB9XG5cbiAgICBkZWJ1Z1NldHRpbmdzKCkge1xuICAgICAgICBsZXQgZGVidWdTZXR0aW5nOiBJRGVidWcgPSBERUJVR19ERUZBVUxUKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnM/LmRlYnVnKCkpIHtcbiAgICAgICAgICAgIGRlYnVnU2V0dGluZyA9IGtvLnRvSlModGhpcy5fb3B0aW9ucz8uZGVidWcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVidWdTZXR0aW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGxvZ2dpbmcgZm9yIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGRlYnVnIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSBjb2xvclxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgbG9nKG1lc3NhZ2U6IHN0cmluZywgY29sb3I/OiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGVidWdTZXR0aW5ncygpLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnU2V0dGluZ3MoKS5sb2dUb0NvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSBjb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICAvLyBsZXQgbGluZU5vID0gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soKG5ldyBFcnJvcigpKS5zdGFjayk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIGAlYyAke3RoaXMudGhpc0NvbXBvbmVudE5hbWV9IC0gJHttZXNzYWdlfWAsXG4gICAgICAgICAgICAgICAgICAgIGBjb2xvcjoke2NvbG9yfWAsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuTG9nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWJ1Z1NldHRpbmdzKCkuZW5hYmxlZDtcbiAgICB9XG4gICAgbG9nVG9Db25zb2xlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW5Mb2coKSAmJiB0aGlzLmRlYnVnU2V0dGluZ3MoKS5sb2dUb0NvbnNvbGU7XG4gICAgfVxuICAgIGxvZ1RvQXNwZWN0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW5Mb2coKSAmJiB0aGlzLmRlYnVnU2V0dGluZ3MoKS5zaG93SW5Bc3BlY3Q7XG4gICAgfVxuXG4gICAgaW5mKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwoaW5mKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdybihtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKHdybihtZXNzYWdlKSwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlcnIobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICAvL2dldCB0aGUgcHJldmlvdXMgY2FsbGVyXG5cbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwoZXJyKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG52KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChudihuYW1lLCB2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGgxKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwobGgxKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyU2VjKCkge1xuICAgICAgICBjbGVhclNlYygpO1xuICAgIH1cblxuICAgIGwobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sb2dUb0FzcGVjdCgpKSB7XG4gICAgICAgICAgICBsZXQgYXNwZWN0TG9nT3V0cHV0ID0gdGhpcy5hc3BlY3RMb2dPdXRwdXQ7XG4gICAgICAgICAgICBpZiAoYXNwZWN0TG9nT3V0cHV0KSB7XG4gICAgICAgICAgICAgICAgYXNwZWN0TG9nT3V0cHV0LmlubmVyVGV4dCArPSBgJHttZXNzYWdlfVxcbmA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRBc3BlY3RMb2dPdXRwdXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5sb2dUb0FzcGVjdCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFzcGVjdExvZ091dHB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGxldCBhc3BlY3RMb2dPdXRwdXQgPSB0aGlzLmFzcGVjdExvZ091dHB1dDtcblxuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuaWQgPSBgYXNwZWN0TG9nT3V0cHV0LSR7dGhpcy51bmlxdWVJZH1gO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgYmxhY2tcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnBhZGRpbmcgPSBcIjVweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luID0gXCI1cHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmhlaWdodCA9IFwiMjAwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5jb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmZvbnRTaXplID0gXCIxMHB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5mb250RmFtaWx5ID0gXCJtb25vc3BhY2VcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLndoaXRlU3BhY2UgPSBcInByZS13cmFwXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS53b3JkV3JhcCA9IFwiYnJlYWstd29yZFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS56SW5kZXggPSBcIjEwMDBcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJvdHRvbSA9IFwiMHB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnJpZ2h0ID0gXCIwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm1hcmdpbkxlZnQgPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm1hcmdpblJpZ2h0ID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm1hcmdpblRvcCA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDI1NSwyNTUsMjU1LDAuOClcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNXB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5wYWRkaW5nID0gXCI1cHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJveFNoYWRvdyA9IFwiMHB4IDBweCA1cHggMHB4IHJnYmEoMCwwLDAsMC43NSlcIjtcblxuICAgICAgICB0aGlzLmVsZW1lbnQucHJlcGVuZChhc3BlY3RMb2dPdXRwdXQpO1xuICAgIH1cblxuICAgIGZpcmVFdmVudChldmVudE5hbWU6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgICAgIGxldCBldmVudDogU2hhcmVEb0V2ZW50ID0ge1xuICAgICAgICAgICAgZXZlbnRQYXRoOiB0aGlzLnRoaXNDb21wb25lbnROYW1lICsgXCIuXCIgKyBldmVudE5hbWUsXG4gICAgICAgICAgICBldmVudE5hbWU6IGV2ZW50TmFtZSxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIH07XG4gICAgICAgIGZpcmVFdmVudChldmVudCk7XG4gICAgfVxuXG4gICAgZmlyZVZhbHVlQ2hhbmdlZEV2ZW50KFxuICAgICAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICAgICAgY2hhbmdlZERhdGE6IHsgcHJldmlvdXNWYWx1ZTogYW55OyBuZXdWYWx1ZTogYW55IH1cbiAgICApIHtcbiAgICAgICAgbGV0IGV2ZW50OiBTaGFyZURvRXZlbnQgPSB7XG4gICAgICAgICAgICBldmVudFBhdGg6IHRoaXMudGhpc0NvbXBvbmVudE5hbWUgKyBcIi5cIiArIGV2ZW50TmFtZSxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogZXZlbnROYW1lLFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgZGF0YTogY2hhbmdlZERhdGEsXG4gICAgICAgIH07XG4gICAgICAgIGZpcmVFdmVudChldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBGb3JtYnVpbGQgaWYgaXQgZXhpc3RzIG9yIGNyZWF0ZXMgaXQgaWYgaXQgZG9lcyBub3RcbiAgICAgKlxuICAgICAqL1xuICAgIGZvcm1idWlsZGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuYmxhZGU/Lm1vZGVsPy5hc3BlY3REYXRhPy5mb3JtQnVpbGRlcj8uZm9ybURhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgICAgICAgIFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBub3QgZm91bmQgLSB3aWxsIGNyZWF0ZSB0aGUgcGF0aFwiLFxuICAgICAgICAgICAgICAgIFwiYmx1ZVwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIGZvdW5kXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0Vuc3VyZSB0aGUgcGF0aCBleGlzdHNcbiAgICAgICAgaWYgKCF0aGlzLmJsYWRlKSB7XG4gICAgICAgICAgICAvL1RPRE86IGlmIG5vIGJsYWRlIHdoZXJlIGlzIGZvcm0gYnVpbGRlciBkYXRhXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYmxhZGUgPSB0aGlzLmJsYWRlIHx8IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5lbnN1cmVGb3JtYnVpbGRlcih0aGlzLmJsYWRlLm1vZGVsKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5ibGFkZSEubW9kZWwhLmFzcGVjdERhdGEhLmZvcm1CdWlsZGVyIS5mb3JtRGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbnN1cmVzIHRoZXJlIGlzIGEgZm9ybSBidWlsZGVyIGluIHRoZSBwYXNzZWQgaW4gbW9kZWwgYW5kIHJldHVybnMgaXRcbiAgICAgKiBAcGFyYW0gbW9kZWxcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIGVuc3VyZUZvcm1idWlsZGVyKG1vZGVsOiBhbnkpOiBJRm9ybUJ1aWxkZXJEYXRhIHtcbiAgICAgICAgaWYgKCFtb2RlbD8uYXNwZWN0RGF0YT8uZm9ybUJ1aWxkZXI/LmZvcm1EYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgICAgICBcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgbm90IGZvdW5kIC0gd2lsbCBjcmVhdGUgdGhlIHBhdGhcIixcbiAgICAgICAgICAgICAgICBcImJsdWVcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBmb3VuZFwiLCBcImdyZWVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9FbnN1cmUgdGhlIHBhdGggZXhpc3RzXG5cbiAgICAgICAgbW9kZWwgPSBtb2RlbCB8fCB7fTtcbiAgICAgICAgbW9kZWwuYXNwZWN0RGF0YSA9IG1vZGVsLmFzcGVjdERhdGEgfHwge307XG4gICAgICAgIG1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIgPSBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyIHx8IHtcbiAgICAgICAgICAgIGZvcm1EYXRhOiB7fSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YTtcbiAgICB9XG5cbiAgICBmb3JtYnVpbGRlckZpZWxkKGZvcm1idWlsZGVyRmllbGQ6IHN0cmluZywgc2V0VmFsdWU/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZvcm1idWlsZGVyKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiRm9ybSBidWlsZGVyIGRvZXMgbm90IGV4aXN0ISBcIiwgXCJyZWRcIik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGb3JtIGJ1aWxkZXIgZG9lcyBub3QgZXhpc3QhXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZvcm1CdWlsZGVyID0gdGhpcy5mb3JtYnVpbGRlcigpITtcbiAgICAgICAgaWYgKCFmb3JtQnVpbGRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZvdW5kVmFsdWUgPSBmb3JtQnVpbGRlcltmb3JtYnVpbGRlckZpZWxkXTtcbiAgICAgICAgaWYgKCFmb3VuZFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgICAgICBgRm9ybSBidWlsZGVyIGRvZXMgbm90IGNvbnRhaW4gZmllbGQgJHtmb3JtYnVpbGRlckZpZWxkfSBgLFxuICAgICAgICAgICAgICAgIFwib3JhbmdlXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmxvZyhgQ3JlYXRpbmcgZmllbGQgJHtmb3JtYnVpbGRlckZpZWxkfSBgLCBcImJsdWVcIik7XG4gICAgICAgICAgICBmb3JtQnVpbGRlcltmb3JtYnVpbGRlckZpZWxkXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vQXJlIHdlIGRvaW5nIGEgc2V0XG4gICAgICAgIGlmIChzZXRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coYFNldHRpbmcgJHtmb3JtYnVpbGRlckZpZWxkfSB0byAke3NldFZhbHVlfWAsIFwiZ3JlZW5cIik7XG4gICAgICAgICAgICBmb3JtQnVpbGRlcltmb3JtYnVpbGRlckZpZWxkXSA9IHNldFZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHNldFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvdW5kVmFsdWU7XG4gICAgfVxufVxuXG4vLyBjbGFzcyBNeUNsYXNzIHtcblxuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpO1xuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwMTogbnVtYmVyKTtcbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IocDE6IHN0cmluZywgcDI6IHN0cmluZyk7XG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKHAxOiBzdHJpbmcsIHAyOiBzdHJpbmcsIHAzOiBzdHJpbmcpO1xuXG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKC4uLmFycjogYW55W10pIHtcbi8vICAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDIpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0d28gYXJndW1lbnRzIGNvbnN0cnVjdG9yIGNhbGxlZC4nKTtcbi8vICAgICAgICAgfSBlbHNlIGlmIChhcnIubGVuZ3RoID09PSAzKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhyZWUgYXJndW1lbnRzIGNvbnN0cnVjdG9yIGNhbGxlZC4nKTtcbi8vICAgICAgICAgfSBlbHNlIGlmIChhcnIubGVuZ3RoID09PSAxKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25lIGFyZ3VtZW50IGNvbnN0cnVjdG9yIGNhbGxlZC4nKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cblxuLy8gfVxuXG4vLyBsZXQgeCA9IG5ldyBNeUNsYXNzKClcbiIsImltcG9ydCB7IElEZWJ1ZyB9IGZyb20gXCIuL0lEZWJ1Z1wiO1xuaW1wb3J0IHtcbiAgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZyxcbiAgSUVycm9yTWFuYWdlbWVudCxcbiAgSUVycm9yVHJhcCxcbiAgSVJlZnJlc2hPbixcbiAgSVNoYXJlZG9QYW5lbENvbmZpZyxcbiAgSVN1cHBvcnRCdXR0b24sXG59IGZyb20gXCIuL0ludGVyZmFjZXNcIjtcblxuZXhwb3J0IGNvbnN0IERFQlVHX0RFRkFVTFQgPSAoKSA9PiB7XG4gIC8vISB0aGlzIGlzIGEgZnVuY3Rpb24gZm9yIGRlYnVnIHB1cnBvc2Ugb25seVxuXG4gIGxldCByZXRWYWx1ZTogSURlYnVnID0ge1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgbG9nVG9Db25zb2xlOiB0cnVlLFxuICAgIHNob3dJbkFzcGVjdDogZmFsc2UsXG4gICAgbGl2ZUNvbmZpZzogZmFsc2UsXG4gIH07XG4gIHJldHVybiByZXRWYWx1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NIQVJFRE9fQ09NTUFORDogSVNoYXJlZG9QYW5lbENvbmZpZyA9IHtcbiAgdHlwZVN5c3RlbU5hbWU6IFwidGFza1wiLFxuICB0aXRsZTogXCJTdXBwb3J0IFJlcXVpcmVkIGZvciAke2RhdGFDb250ZXh0LnBhZ2VDb250ZXh0LnVzZXIuZmlyc3RuYW1lfSAke2RhdGFDb250ZXh0LnBhZ2VDb250ZXh0LnVzZXIubGFzdG5hbWV9IG9uICR7ZGF0YUNvbnRleHQucGFnZUNvbnRleHQucGFnZVRpdGxlfVwiLFxuICBkZXNjcmlwdGlvbjogdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NVUFBPUlRfQlVUVE9OOiBJU3VwcG9ydEJ1dHRvbiA9IHtcbiAgcmFpc2VTdXBwb3J0VGlja2V0OiB0cnVlLFxuICBzdXBwb3J0VGlja2V0TWVzc2FnZTogXCJTdXBwb3J0IFJlcXVpcmVkIGZvciAke2RhdGFDb250ZXh0LnBhZ2VDb250ZXh0LnVzZXIuZmlyc3RuYW1lfSAke2RhdGFDb250ZXh0LnBhZ2VDb250ZXh0LnVzZXIubGFzdG5hbWV9IG9uICR7ZGF0YUNvbnRleHQucGFnZUNvbnRleHQucGFnZVRpdGxlfSBjb250ZXh0ICR7SlNPTi5zdHJpbmdpZnkoZGF0YUNvbnRleHQpfVwiLFxuICByYWlzZVN1cHBvcnRUaWNrZXRTaGFyZWRvQ29tbWFuZDogREVGQVVMVF9TSEFSRURPX0NPTU1BTkQsXG4gIGRhdGFDb250ZXh0OiBcIlBvcHVsYXRlZCBieSB0aGUgc3lzdGVtXCIsXG4gIHRpdGxlOiBcIlJhaXNlIFN1cHBvcnQgVGlja2V0XCIsXG4gIHN0eWxlUnVsZXM6IHVuZGVmaW5lZCxcbiAgY2xhc3NSdWxlczogdW5kZWZpbmVkLFxuICB0b29sVGlwOiBcIlJhaXNlIGEgc3VwcG9ydCB0aWNrZXQgd2l0aCB0aGUgc3VwcG9ydCBkZXNrXCIsXG4gIGVuYWJsZWQ6IGZhbHNlXG59O1xuXG5cblxuZXhwb3J0IGNvbnN0IFJFRlJFU0hfT05fREVGQVVMVFM6IElSZWZyZXNoT24gPSB7XG4gIHNoYXJlZG9JZENoYW5nZWQ6IGZhbHNlLFxuICBzaGFyZWRvUGFyZW50SWRDaGFuZ2VkOiBmYWxzZSxcbiAgc2hhcmVkb1BoYXNlQ2hhbmdlZDogZmFsc2UsXG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FUlJPUl9NQU5BR0VNRU5UX1RSQVBTOiBJRXJyb3JUcmFwW10gPSBbXG4gIHtcbiAgICBkYXRhQ29udGV4dDogbnVsbCxcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIHJ1bGU6IFwiZGF0YUNvbnRleHQuZXJyb3IubWVzc2FnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdmb3JiaWRkZW4nKVwiLFxuICAgIHVzZXJGcmVpbmRseU1lc3NhZ2U6IFwiVGhlIG1hdHRlciBpcyBub3QgYWNjZXNzaWJsZSB0byB5b3UuIEl0IG1heSBiZSBiZWhpbmQgYSBJbmZvcm1hdGlvbiBCYXJyaWVyLlwiLFxuICAgIHJlc29sdXRpb25TdWdnZXN0aW9uczogW1wiUGxlYXNlIGNvbnRhY3QgdGhlIG1hdHRlciBvd25lciBmb3IgYWNjZXNzLlwiXSxcbiAgICB1c2VyRnJlaW5kbHlIVE1MTWVzc2FnZVRlbXBsYXRlOiB1bmRlZmluZWQsXG4gICAgc3VwcG9ydEJ1dHRvbjogREVGQVVMVF9TVVBQT1JUX0JVVFRPTixcbiAgICBzdHlsZVJ1bGVzOiBbXG4gICAgICB7XG4gICAgICAgIHJ1bGU6IFwidHJ1ZVwiLFxuICAgICAgICBzdHlsZTogXCJib3gtc2hhZG93OiAxcHggMXB4IDEwcHggI2Q0NjA2MDtcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBjbGFzc1J1bGVzOiBbXG4gICAgICB7XG4gICAgICAgIHJ1bGU6IFwidHJ1ZVwiLFxuICAgICAgICBjc3NDbGFzczogXCJlbXMtc2VsZWN0ZWQtaXRlbVwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcnVsZTogXCJ0cnVlXCIsXG4gICAgICAgIGNzc0NsYXNzOiBcImVtcy1zaG93XCIsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5dO1xuXG4vL2NsYXNzUnVsZXM6IGVtcy1zZWxlY3RlZC1pdGVtIGVtcy1zaG93JyBzdHlsZT0nYm94LXNoYWRvdzogMXB4IDFweCAxMHB4ICNkNDYwNjA7Jyxcbi8vXG4vL1wiU3VwcG9ydCBSZXF1aXJlZCBmb3IgJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC51c2VyLmZpcnN0bmFtZX0gJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC51c2VyLmxhc3RuYW1lfSBvbiAke2RhdGFDb250ZXh0LnBhZ2VDb250ZXh0LnBhZ2VUaXRsZX1cIlxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FUlJPUl9NQU5BR0VNRU5UX1NFVFRJTkdTOiBJRXJyb3JNYW5hZ2VtZW50ID0ge1xuICBlcnJvclRyYXBzOiBERUZBVUxUX0VSUk9SX01BTkFHRU1FTlRfVFJBUFMsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIGRpc3BsYXlVblRyYXBwZWRFcnJvckluQXNwZWN0OiB0cnVlLFxuICB1blRyYXBwZWRFcnJvcnNTdXBwb3J0QnV0dG9uOiB1bmRlZmluZWQsXG59OyBcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09ORklHVVJBVElPTl9TRVRUSU5HUzogSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzx1bmtub3duPiA9XG4gIHtcbiAgICBkZWJ1ZzogREVCVUdfREVGQVVMVCgpLFxuICAgIHJlZnJlc2hPbjogUkVGUkVTSF9PTl9ERUZBVUxUUywgXG4gICAgZXZlbnRzVG9SZWFjdFRvOiBbXG4gICAgICB7XG4gICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLnVwZGF0ZWRcIixcbiAgICAgICAgbWV0aG9kVG9DYWxsOiBcInJlZnJlc2hcIixcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAgZXZlbnRQYXRoOiBcInNoYXJlZG8uY29yZS5jYXNlLnNoYXJlZG8tdXBkYXRlZFwiLFxuICAgICAgICBtZXRob2RUb0NhbGw6IFwicmVmcmVzaFwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGRhdGFTZXR0aW5nczoge1xuICAgICAgZ2V0VmFsdWVVc2luZ1BhcmVudHM6IGZhbHNlLFxuICAgICAgbWF4RGVwdGg6IDAsXG4gICAgfSxcbiAgICBlcnJvck1hbmFnZW1lbnQ6IERFRkFVTFRfRVJST1JfTUFOQUdFTUVOVF9TRVRUSU5HUyxcbiAgfTtcbiIsImltcG9ydCAqIGFzIGtvIGZyb20gJ2tub2Nrb3V0JztcbmltcG9ydCB7IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uIH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IHR5cGUgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPiA9IHtcbiAgICBbSyBpbiBrZXlvZiBUXSAgICAgIDogVFtLXSBleHRlbmRzIEFycmF5PGluZmVyIFU+ID8ga28uT2JzZXJ2YWJsZUFycmF5PE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VT4+IDpcbiAgICBUW0tdIGV4dGVuZHMgb2JqZWN0ID8ga28uT2JzZXJ2YWJsZTxOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFRbS10+PiA6IGtvLk9ic2VydmFibGU8VFtLXT47XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlT2JqZWN0PFQ+KG9iajogVCwgZXhpc3Rpbmc/OiBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+KTogTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPiB7XG4gICAgXG4gICAgaWYoIWV4aXN0aW5nKSBleGlzdGluZyA9IHt9IGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD47XG4gICBcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYga2V5ICE9PSBcIl9fa29fbWFwcGluZ19fXCIgJiYga2V5ICE9PSBcIl9ob3N0XCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleSBhcyBrZXlvZiBUXTtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZ1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0gPSBrby5vYnNlcnZhYmxlQXJyYXkodmFsdWUubWFwKGl0ZW0gPT4gdG9PYnNlcnZhYmxlT2JqZWN0KGl0ZW0sIHt9IGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8dHlwZW9mIGl0ZW0+KSkpIGFzIGFueTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleGlzdGluZ1trZXldPWVuc3VyZUlzT2JzZXJ2YWJsZUFycmF5KGV4aXN0aW5nLCBrZXkpXG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0odmFsdWUubWFwKGl0ZW0gPT4gdG9PYnNlcnZhYmxlT2JqZWN0KGl0ZW0sIHt9IGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8dHlwZW9mIGl0ZW0+KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3Rpbmdba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldID0ga28ub2JzZXJ2YWJsZSh0b09ic2VydmFibGVPYmplY3QodmFsdWUsIHt9IGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8dHlwZW9mIHZhbHVlPikpIGFzIGFueTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleGlzdGluZ1trZXldICA9IGVuc3VyZUlzT2JzZXJ2YWJsZShleGlzdGluZywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSh0b09ic2VydmFibGVPYmplY3QoKHZhbHVlIGFzIGFueSksIChleGlzdGluZ1trZXldKCkgYXMgYW55KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZ1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIChleGlzdGluZ1trZXldIGFzIGFueSkgPSBrby5vYnNlcnZhYmxlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleGlzdGluZ1trZXldID0gZW5zdXJlSXNPYnNlcnZhYmxlKGV4aXN0aW5nLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldKCh2YWx1ZSBhcyBhbnkpKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4aXN0aW5nIGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD47XG59XG5leHBvcnQgaW50ZXJmYWNlIElEZWJ1ZyB7XG4gICAgc3VwcG9ydFJlcXVlc3RFbmFibGVkPzogYm9vbGVhbjtcbiAgICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgICBsb2dUb0NvbnNvbGU6IGJvb2xlYW47XG4gICAgICBzaG93SW5Bc3BlY3Q6IGJvb2xlYW47XG4gICAgICBsaXZlQ29uZmlnPzogYm9vbGVhbjtcbiAgICB9XG4gIFxuXG5cbmZ1bmN0aW9uIGVuc3VyZUlzT2JzZXJ2YWJsZShleGlzdGluZzogYW55LCBrZXk6IHN0cmluZykge1xuICAgIGlmIChrby5pc09ic2VydmFibGUoZXhpc3Rpbmdba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nW2tleV0gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtvLm9ic2VydmFibGUoKTtcbiAgICB9XG59XG5cblxuXG5mdW5jdGlvbiBlbnN1cmVJc09ic2VydmFibGVBcnJheShleGlzdGluZzogYW55LCBrZXk6IHN0cmluZykge1xuICAgIGlmIChrby5pc09ic2VydmFibGVBcnJheShleGlzdGluZ1trZXldKSkge1xuICAgICAgICByZXR1cm4gZXhpc3Rpbmdba2V5XSA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgfVxufVxuXG4vLyBleHBvcnQgdHlwZSBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPiA9IFRDb25maWcgJiB7XG4vLyAgICAgZGVidWc6IElEZWJ1Zztcbi8vICAgfVxuXG4vLyBleHBvcnQgdHlwZSBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSBcbi8vIHsgW0sgaW4ga2V5b2YgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+XToga28uT2JzZXJ2YWJsZTxJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5bS10+OyB9XG5cbi8vIGV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ3VyYXRpb25Ib3N0IHtcbi8vICAgICBfaG9zdDoge1xuLy8gICAgICAgICBibGFkZTogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5BZGRFZGl0U2hhcmVkbztcbi8vICAgICAgICAgZW5hYmxlZDoga28uT2JzZXJ2YWJsZTxib29sZWFuPjsgLy8gVXNpbmcgJ2FueScgZm9yIHJldHVybiB0eXBlIGFzIGl0J3Mgbm90IGNsZWFyIHdoYXQgdGhlc2UgZnVuY3Rpb25zIHJldHVyblxuLy8gICAgICAgICBtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbztcbi8vICAgICB9XG4vLyB9XG5cbi8vIGV4cG9ydCB0eXBlIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPiA9IElDb25maWd1cmF0aW9uSG9zdCAmIElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+O1xuXG4vLyBpbnRlcmZhY2UgUm9vdE9iamVjdCB7XG4vLyAgIGwxOiBzdHJpbmc7XG4vLyAgIG8xOiBPMTtcbi8vIH1cblxuLy8gaW50ZXJmYWNlIE8xIHtcbi8vICAgbDI6IHN0cmluZztcbi8vICAgbzI6IE8yO1xuLy8gICBhMTogQTFbXTtcbi8vIH1cblxuLy8gaW50ZXJmYWNlIEExIHtcbi8vICAgbDQ6IHN0cmluZztcbi8vIH1cblxuLy8gaW50ZXJmYWNlIE8yIHtcbi8vICAgbDM6IHN0cmluZztcbi8vIH1cbi8vIC8vIE5vdyBsZXQncyB1c2UgdGhlIGZ1bmN0aW9uOlxuLy8gY29uc3QgeDogSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248Um9vdE9iamVjdD4gPSB7XG4vLyAgICAgbDE6IFwibDFcIixcbi8vICAgICBvMToge1xuLy8gICAgICAgICBsMjpcImwyXCIsXG4vLyAgICAgICAgIG8yOiB7XG4vLyAgICAgICAgICAgICBsMzogXCJsM1wiLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBhMTogW1xuLy8gICAgICAgICAgICAgeyBsNDogXCJsNFwiIH1cbi8vICAgICAgICAgXVxuLy8gICAgIH0sXG4vLyAgICAgZGVidWc6XG4vLyAgICAge1xuLy8gICAgICAgICBlbmFibGVkOiBmYWxzZSxcbi8vICAgICAgICAgbG9nVG9Db25zb2xlOiBmYWxzZSxcbi8vICAgICAgICAgc2hvd0luQXNwZWN0OiBmYWxzZVxuLy8gICAgIH1cbi8vIH1cblxuLy8gbGV0IG0gOiAgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxSb290T2JqZWN0Pj5cblxuLy8gbGV0IHkgPSB0b09ic2VydmFibGVPYmplY3QoeCx7fSBhcyBhbnkpIGFzICBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFJvb3RPYmplY3Q+PlxuXG4vLyBsZXQgcCA9IHkuZGVidWcoKS5saXZlQ29uZmlnISgpXG5cbi8vIGV4cG9ydCBmdW5jdGlvbiB0b09ic2VydmFibGVPYmplY3Qob2JqOiBhbnksIGV4aXN0aW5nT2JzZXJ2YWJsZXM/OmtvLk9ic2VydmFibGU8YW55Pik6IGtvLk9ic2VydmFibGUge1xuLy8gICAgIGNvbnN0IHJlc3VsdCA9IGV4aXN0aW5nT2JzZXJ2YWJsZXMgfHwge30gYXMga28uT2JzZXJ2YWJsZTtcblxuLy8gICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuLy8gICAgICAgICBpZihrZXkgPT09IFwiX19rb19tYXBwaW5nX19cIikgY29udGludWU7XG4vLyAgICAgICAgIGlmKGtleSA9PT0gXCJfaG9zdFwiKSBjb250aW51ZTtcblxuLy8gICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuLy8gICAgICAgICAgICAgbGV0IG5ld3YgPSBvYmpba2V5XTtcbi8vICAgICAgICAgICAgIGxldCBjdXJyID0gKHJlc3VsdCBhcyBhbnkpW2tleV0gO1xuXG4vLyAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobmV3dikgJiYgdHlwZW9mIG5ld3YgPT09IFwib2JqZWN0XCIgJiYgbmV3diAhPT0gbnVsbCAmJiAha28uaXNPYnNlcnZhYmxlKG5ld3YpKSB7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSB0b09ic2VydmFibGVPYmplY3QobmV3diBhcyBvYmplY3QpIFxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidG9PYnNlcnZhYmxlT2JqZWN0XCIsIChyZXN1bHQgYXMgYW55KVtrZXldKTtcbi8vICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IGtvLm9ic2VydmFibGUoKHJlc3VsdCBhcyBhbnkpW2tleV0pO1xuLy8gICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXd2KSkge1xuLy8gICAgICAgICAgICAgICAgIGlmIChjdXJyICYmIGtvLmlzT2JzZXJ2YWJsZUFycmF5KGN1cnIpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldKG5ld3YpO1xuLy8gICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0ga28ub2JzZXJ2YWJsZUFycmF5KG5ld3YpIGFzIGFueTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgY29udGludWU7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIGlmIChrby5pc09ic2VydmFibGUobmV3dikpIHtcbi8vICAgICAgICAgICAgICAgICBuZXd2ID0gbmV3digpOyAvLyBwdWxsIG91dCB0aGUgdmFsdWVcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgaWYgKGN1cnIgJiYga28uaXNPYnNlcnZhYmxlKGN1cnIpKSB7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0obmV3dik7IC8vIHVwZGF0ZSB0aGUgZXhpc3Rpbmcgb2JzZXJ2YWJsZVxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IGtvLm9ic2VydmFibGUobmV3dik7XG4gICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG5cbi8vICAgICByZXR1cm4gcmVzdWx0O1xuLy8gfVxuIiwiaW1wb3J0IHsgZXJyLCBsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL0NvbW1vbi9Mb2dcIjtcbmltcG9ydCB7IGV4dHJhY3RWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9oZWxwZXJzL1Zha3VlRXh0cmFjdG9yXCI7XG5pbXBvcnQgeyBldmFsdXRlUnVsZSwgZXhlY3V0ZUVtYmVkZGVkQ29kZSwgZXhlY3V0ZUZ1bmMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaGVscGVycy9ldmFsdXRlUnVsZVwiO1xuaW1wb3J0IHsgSUZpZWxkUGxhY2VtZW50LCBJRmllbGRSb3dGaWVsZCwgSUljb25SdWxlLCBJQ1NTUnVsZSwgSUZpZWxkUnVsZSwgSVN0eWxlRW50cnksIElTdHlsZVJ1bGUsIElOYW1lVmFsdWUsIElDc3NDbGFzc0VudHJ5IH0gZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgVEN1c3RvbUJpbmRpbmdDb250ZXh0IH0gZnJvbSBcIi4vVGVtcGxhdGVHZW5lcmF0b3JcIjtcblxuXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVBcHBsaWNhdG9yIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG5cbiAgc2V0dXBFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZUFjY2Vzc29yOiAoKSA9PiBhbnksIGFsbEJpbmRpbmdzOiBhbnksIHZpZXdNb2RlbDogYW55LCBiaW5kaW5nQ29udGV4dDogYW55KSB7XG4gICAgbGV0IGluc3RydWN0aW9uID0gYWxsQmluZGluZ3MoKS5tYXR0ZXJTZWFyY2hCaW5kaW5nIGFzIFRDdXN0b21CaW5kaW5nQ29udGV4dFxuICAgIGlmICghaW5zdHJ1Y3Rpb24pIHtcbiAgICAgIGwoZXJyKFwiTm8gaW5zdHJ1Y3Rpb24gZGVmaW5lZFwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpbnN0cnVjdGlvbi50eXBlID09IFwiSUZpZWxkUGxhY2VtZW50XCIpIHtcbiAgICAgIGxldCByb3dGaWVsZCA9IGluc3RydWN0aW9uLm9iamVjdCBhcyBJRmllbGRQbGFjZW1lbnQ7XG4gICAgICB0aGlzLmJ1aWxkUGxhY2VtZW50cyhyb3dGaWVsZCwgXCJkYXRhQ29udGV4dE5hbWVcIiwgdmlld01vZGVsLCBlbGVtZW50IGFzIEhUTUxEaXZFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVFbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZUFjY2Vzc29yOiAoKSA9PiBhbnksIGFsbEJpbmRpbmdzOiBhbnksIHZpZXdNb2RlbDogYW55LCBiaW5kaW5nQ29udGV4dDogYW55KSB7XG4gICAgbChcInVwZGF0ZUVsZW1lbnRcIiwgZWxlbWVudCwgdmFsdWVBY2Nlc3NvciwgYWxsQmluZGluZ3MsIHZpZXdNb2RlbCwgYmluZGluZ0NvbnRleHQpXG5cbiAgfVxuXG5cbiAgYnVpbGRQbGFjZW1lbnRzKHBsYWNlbWVudDogSUZpZWxkUGxhY2VtZW50LCBkYXRhQ29udGV4dE5hbWU6IHN0cmluZywgdmlld01vZGVsOiBhbnksIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQpIHtcbiAgICBsZXQgcm93Q291bnRlciA9IDA7XG4gICAgY29uc3Qgcm9vdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyb290RGl2KTtcblxuICAgIGlmIChwbGFjZW1lbnQuY29udGFpbmVyKSB7XG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZW1zLWNvbnRhaW5lcicpO1xuICAgICAgbGV0IGNvbnRhaW5lclBhcmVudCA9IGNvbnRhaW5lci5wYXJlbnRFbGVtZW50IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgaWYgKGNvbnRhaW5lclBhcmVudCkge1xuICAgICAgICBjb250YWluZXJQYXJlbnQuY2xhc3NMaXN0LmFkZCgnZW1zLWNvbnRhaW5lci1wYXJlbnQnKTtcbiAgICAgICAgdGhpcy5hZGRDU1MocGxhY2VtZW50LmNvbnRhaW5lci5jc3NDbGFzcywgY29udGFpbmVyUGFyZW50LCBkYXRhQ29udGV4dE5hbWUsIHZpZXdNb2RlbCk7XG4gICAgICAgIHRoaXMuYWRkU3R5bGUocGxhY2VtZW50LmNvbnRhaW5lci5zdHlsZSwgY29udGFpbmVyUGFyZW50LCBkYXRhQ29udGV4dE5hbWUsIHZpZXdNb2RlbCk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyByb290RGl2LmNsYXNzTGlzdC5hZGQoJ2ZsZXgtcm93Jyk7XG4gICAgcm9vdERpdi5jbGFzc0xpc3QuYWRkKCdlbXMtcGxhY2VtZW50LWl0ZW0nKTtcbiAgICByb290RGl2LmlkID0gJ3Jlc3VsdEl0ZW0nO1xuICAgIHRoaXMuYWRkQ1NTKHBsYWNlbWVudC5jc3NDbGFzcywgcm9vdERpdiwgZGF0YUNvbnRleHROYW1lLCB2aWV3TW9kZWwpO1xuICAgIHRoaXMuYWRkU3R5bGUocGxhY2VtZW50LnN0eWxlLCByb290RGl2LCBkYXRhQ29udGV4dE5hbWUsIHZpZXdNb2RlbCk7XG5cbiAgICBpZiAocGxhY2VtZW50Lmljb24pIHtcbiAgICAgIHRoaXMuYWRkSWNvbnMocGxhY2VtZW50Lmljb24sIGRhdGFDb250ZXh0TmFtZSwgcm9vdERpdiwgdmlld01vZGVsKTtcbiAgICB9XG5cbiAgICBjb25zdCBkaXZSb3dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXZSb3dDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZW1zLXJvdy1jb250YWluZXInKTtcblxuICAgIHJvb3REaXYuYXBwZW5kQ2hpbGQoZGl2Um93Q29udGFpbmVyKTtcblxuICAgIHBsYWNlbWVudC5yb3dzPy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICByb3dDb3VudGVyKys7XG4gICAgICBjb25zdCByb3dEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHJvd0Rpdi5zdHlsZS5hbGlnbkl0ZW1zID0gcm93LmFsaWduSXRlbXMgfHwgJ3NwYWNlLWJldHdlZW4nO1xuICAgICAgcm93RGl2LmNsYXNzTGlzdC5hZGQoJ2Vtcy1yb3cnICsgcm93Q291bnRlcik7XG4gICAgICByb3dEaXYuY2xhc3NMaXN0LmFkZCgnZW1zLXJvdycpO1xuICAgICAgdGhpcy5hZGRDU1Mocm93LmNzc0NsYXNzLCByb3dEaXYsIGRhdGFDb250ZXh0TmFtZSwgdmlld01vZGVsKTtcbiAgICAgIHRoaXMuYWRkU3R5bGUocm93LnN0eWxlLCByb3dEaXYsIGRhdGFDb250ZXh0TmFtZSwgdmlld01vZGVsKTtcbiAgICAgIHJvdy5maWVsZHM/LmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICB0aGlzLmFkZEZpZWxkKGZpZWxkLCBkYXRhQ29udGV4dE5hbWUsIHJvd0Rpdiwgdmlld01vZGVsKTtcbiAgICAgIH0pO1xuICAgICAgZGl2Um93Q29udGFpbmVyLmFwcGVuZENoaWxkKHJvd0Rpdik7XG4gICAgfSk7XG4gIH1cblxuXG5cbiAgYWRkRmllbGQoZmllbGQ6IElGaWVsZFJvd0ZpZWxkLCBkYXRhQ29udGV4dE5hbWU6IHN0cmluZywgcm93RGl2OiBIVE1MRGl2RWxlbWVudCwgdmlld01vZGVsOiBhbnkpIHtcbiAgICBjb25zdCBmaWVsZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZpZWxkRGl2LmNsYXNzTGlzdC5hZGQoJ2Vtcy1yb3ctZ3JvdXAnKTtcbiAgICB0aGlzLmFkZENTUyhmaWVsZC5jc3NDbGFzcywgZmllbGREaXYsIGRhdGFDb250ZXh0TmFtZSwgdmlld01vZGVsKTtcblxuICAgIGlmIChmaWVsZC53aWR0aCkgZmllbGREaXYuc3R5bGUud2lkdGggPSBgJHtmaWVsZC53aWR0aH1weGA7XG4gICAgaWYgKGZpZWxkLnBvc2l0aW9uKSBmaWVsZERpdi5zdHlsZS50ZXh0QWxpZ24gPSBmaWVsZC5wb3NpdGlvbjtcbiAgICB0aGlzLmFkZFN0eWxlKGZpZWxkLnN0eWxlLCBmaWVsZERpdiwgZGF0YUNvbnRleHROYW1lLCB2aWV3TW9kZWwpO1xuXG4gICAgaWYgKGZpZWxkLmxhYmVsKSB7XG4gICAgICBjb25zdCBsYWJlbEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgbGFiZWxFbGVtLnRleHRDb250ZW50ID0gZmllbGQubGFiZWw7XG4gICAgICBsYWJlbEVsZW0uY2xhc3NMaXN0LmFkZCgnZW1zLWxhYmVsJyk7XG4gICAgICBmaWVsZERpdi5hcHBlbmRDaGlsZChsYWJlbEVsZW0pO1xuICAgIH1cblxuXG4gICAgdGhpcy5hZGRJY29ucyhmaWVsZC5pY29uLCBkYXRhQ29udGV4dE5hbWUsIGZpZWxkRGl2LCB2aWV3TW9kZWwpOyAvL1RPRE9cblxuXG4gICAgY29uc3Qgc3BhbkVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cblxuXG4gICAgLy8gYWRkQ3VzdG9tQmluZGluZyhzcGFuRWxlbSwgZmllbGQsXCJJRmllbGRSb3dGaWVsZFwiKTtcbiAgICAvLyBlbHNlIHtcbiAgICAvLyAgIHNwYW5FbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJywgYHRleHQ6JHtkYXRhQ29udGV4dE5hbWV9LiR7ZmllbGQuZmllbGR9YCk7XG4gICAgLy8gfVxuICAgIHNwYW5FbGVtLmNsYXNzTGlzdC5hZGQoJ2Vtcy1maWVsZC12YWx1ZScpO1xuXG4gICAgaWYgKGZpZWxkLmZpZWxkIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuYWRkRmllbGRBcnJheShmaWVsZC5maWVsZCwgZmllbGQuZm9ybWF0dGVyLCBzcGFuRWxlbSwgdmlld01vZGVsKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGZpZWxkLmZpZWxkID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLnNldElubmVySFRNTChmaWVsZC5maWVsZCwgZmllbGQuZm9ybWF0dGVyLCB2aWV3TW9kZWwsIHNwYW5FbGVtKTtcbiAgICB9XG5cbiAgICBmaWVsZERpdi5hcHBlbmRDaGlsZChzcGFuRWxlbSk7XG4gICAgcm93RGl2LmFwcGVuZENoaWxkKGZpZWxkRGl2KTtcblxuXG4gIH1cblxuICBzZXRJbm5lckhUTUwodmFsdWU6IHN0cmluZywgZm9ybWF0dGVyOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkLCB2aWV3TW9kZWw6IGFueSwgZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgdmFsdWVUb1NldCA9IGV4dHJhY3RWYWx1ZSh2YWx1ZSwgdmlld01vZGVsLCBmb3JtYXR0ZXIpO1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gdmFsdWVUb1NldDtcbiAgfVxuXG4gIGFkZEljb25zKGljb25zOiBJSWNvblJ1bGVbXSB8IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwsIGRhdGFDb250ZXh0TmFtZTogc3RyaW5nLCBmaWVsZERpdjogSFRNTERpdkVsZW1lbnQsIHZpZXdNb2RlbDogYW55KSB7XG5cbiAgICBpZiAoIWljb25zKSByZXR1cm47XG5cbiAgICBpZiAodHlwZW9mIGljb25zID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBpY29ucyA9IFt7IGljb246IGljb25zIH1dO1xuICAgIH1cbiAgICBpY29ucy5mb3JFYWNoKGljb25SdWxlID0+IHtcbiAgICAgIC8vIDxkaXYgY2xhc3M9XCJjb2x1bW4tYXV0b1wiIHN0eWxlPVwibWFyZ2luLXJpZ2h0OjVweFwiPlxuICAgICAgLy8gPHNwYW4gY2xhc3M9XCJmYSBjYXJkLWljb25cIiBkYXRhLWJpbmQ9XCJjc3M6aWNvblwiPjwvc3Bhbj5cbiAgICAgIC8vIDwvZGl2PlxuXG4gICAgICBjb25zdCBpY29uRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIGljb25FbGVtLmNsYXNzTmFtZSA9ICdmYSBjYXJkLWljb24gJyArIGljb25SdWxlLmljb247XG4gICAgICBpY29uRWxlbS5jbGFzc0xpc3QuYWRkKCdlbXMtaWNvbicpO1xuICAgICAgaWYgKGljb25SdWxlLmNzc0NsYXNzKSBpY29uRWxlbS5jbGFzc0xpc3QuYWRkKGljb25SdWxlLmNzc0NsYXNzKTtcbiAgICAgIGlmICh0eXBlb2YgaWNvblJ1bGUuc3R5bGUgPT09IFwic3RyaW5nXCIpIGljb25FbGVtLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBpY29uUnVsZS5zdHlsZSk7XG4gICAgICBpZiAoaWNvblJ1bGUucnVsZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImljb25SdWxlLnJ1bGVcIiwgaWNvblJ1bGUucnVsZSk7XG5cbiAgICAgICAgLy8gbGV0IGZ1bGxSdWxlUGF0aCA9IGAke2ljb25SdWxlLnJ1bGV9YFxuICAgICAgICAvLyBpZiAoZGF0YUNvbnRleHROYW1lKSB7XG4gICAgICAgIC8vICAgZnVsbFJ1bGVQYXRoID0gYCR7ZGF0YUNvbnRleHROYW1lfS4ke2ljb25SdWxlLnJ1bGV9YDtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGljb25FbGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJywgYHZpc2libGU6JHJvb3QuZXZhbEZ1bmMoXCIke2Z1bGxSdWxlUGF0aH1cIiwke2RhdGFDb250ZXh0TmFtZX0sIFwiJHtkYXRhQ29udGV4dE5hbWV9XCIpYCk7XG4gICAgICAgIGxldCB2YWx1ZSA9IGV2YWx1dGVSdWxlKGljb25SdWxlLnJ1bGUsIHZpZXdNb2RlbCk7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICBpY29uRWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGljb25SdWxlLnBvc2l0aW9uID09PSAnYmVmb3JlJykge1xuICAgICAgICBmaWVsZERpdi5pbnNlcnRCZWZvcmUoaWNvbkVsZW0sIGZpZWxkRGl2LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaWNvblJ1bGUucG9zaXRpb24gPT09ICdhZnRlcicpIHtcbiAgICAgICAgZmllbGREaXYuYXBwZW5kQ2hpbGQoaWNvbkVsZW0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWljb25SdWxlLnBvc2l0aW9uKSB7XG4gICAgICAgIGZpZWxkRGl2LmFwcGVuZENoaWxkKGljb25FbGVtKTtcbiAgICAgIH1cblxuICAgIH0pO1xuICB9XG5cbiAgYWRkQ1NTKGNzc0NsYXNzOiBJQ3NzQ2xhc3NFbnRyeSwgcm9vdERpdjogSFRNTERpdkVsZW1lbnQsIGRhdGFDb250ZXh0TmFtZTogc3RyaW5nLCB2aWV3TW9kZWw6IGFueSkge1xuXG4gICAgaWYgKHR5cGVvZiBjc3NDbGFzcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY3NzQ2xhc3MgPSBbeyBjc3NDbGFzczogY3NzQ2xhc3MgfV07XG4gICAgfVxuXG4gICAgaWYgKGNzc0NsYXNzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGxldCBhcnJJdGVtID0gY3NzQ2xhc3MgYXMgSUNTU1J1bGVbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJySXRlbS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgY3NzUnVsZSA9IGFyckl0ZW1baV07XG4gICAgICAgIGxldCBjc3NWYWx1ZSA9IGV4ZWN1dGVFbWJlZGRlZENvZGUoY3NzUnVsZS5jc3NDbGFzcywgdmlld01vZGVsKTtcblxuICAgICAgICBpZiAoY3NzUnVsZS5ydWxlKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnREYXRhQmluZCA9IHJvb3REaXYuZ2V0QXR0cmlidXRlKCdkYXRhLWJpbmQnKSB8fCAnJztcbiAgICAgICAgICBpZiAoY3VycmVudERhdGFCaW5kKSB7XG4gICAgICAgICAgICBjdXJyZW50RGF0YUJpbmQgKz0gJywnO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvL3Jvb3REaXYuc2V0QXR0cmlidXRlKCdkYXRhLWJpbmQnLCBgJHtjdXJyZW50RGF0YUJpbmR9IGNzczogeyAke2Nzc1J1bGUuY3NzQ2xhc3N9IDogJHJvb3QuZXZhbEZ1bmMoXCIke2RhdGFDb250ZXh0TmFtZX0uJHtjc3NSdWxlLnJ1bGV9XCIsJHtkYXRhQ29udGV4dE5hbWV9LCBcIiR7ZGF0YUNvbnRleHROYW1lfVwiKSB9YCk7XG5cbiAgICAgICAgICBsZXQgcnVsZSA9IGNzc1J1bGUucnVsZTtcblxuICAgICAgICAgIGxldCB2YWx1ZSA9IGV2YWx1dGVSdWxlKHJ1bGUsIHZpZXdNb2RlbCk7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICByb290RGl2LmNsYXNzTGlzdC5hZGQoY3NzVmFsdWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJvb3REaXYuY2xhc3NMaXN0LmFkZChjc3NWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIGFkZEZpZWxkQXJyYXkoZmllbGRzOiBJRmllbGRSdWxlW10gfCB1bmRlZmluZWQgfCBudWxsLCBmb3JtYXR0ZXI6IHN0cmluZyB8IG51bGx8IHVuZGVmaW5lZCwgZmllbGREaXY6IEhUTUxFbGVtZW50LCB2aWV3TW9kZWw6IGFueSkge1xuXG5cbiAgICBpZiAoIWZpZWxkcykgcmV0dXJuO1xuXG5cbiAgICBmaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG5cblxuXG4gICAgICBpZiAoZmllbGQucnVsZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImZpZWxkUnVsZS5ydWxlXCIsIGZpZWxkLnJ1bGUpO1xuICAgICAgICBsZXQgdmFsdWUgPSBldmFsdXRlUnVsZShmaWVsZC5ydWxlLCB2aWV3TW9kZWwpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnNldElubmVySFRNTChmaWVsZC5maWVsZCwgZm9ybWF0dGVyLCB2aWV3TW9kZWwsIGZpZWxkRGl2KTtcbiAgICAgICAgICAvLyBmaWVsZERpdi5pbm5lckhUTUwgPSBmaWVsZFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRJbm5lckhUTUwoZmllbGQuZmllbGQsIGZvcm1hdHRlciwgdmlld01vZGVsLCBmaWVsZERpdik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhZGRTdHlsZShzdHlsZTogSVN0eWxlRW50cnksIHJvb3REaXY6IEhUTUxEaXZFbGVtZW50LCBkYXRhQ29udGV4dE5hbWU6IHN0cmluZywgdmlld01vZGVsOiBhbnkpIHtcbiAgICBpZiAoc3R5bGUgPT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgaWYgKHR5cGVvZiBzdHlsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgc3R5bGUgPSBbeyBzdHlsZTogc3R5bGUgfV07XG4gICAgfVxuXG4gICAgLy8gaWYoIUFycmF5LmlzQXJyYXkoc3R5bGUpKVxuICAgIC8vIHtcbiAgICAvLyAgIHN0eWxlID0gW3N0eWxlXTtcbiAgICAvLyB9XG5cbiAgICBpZiAoc3R5bGUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgbGV0IGFyckl0ZW0gPSBzdHlsZSBhcyBJU3R5bGVSdWxlW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyckl0ZW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHN0eWxlUnVsZSA9IGFyckl0ZW1baV0ucnVsZTtcblxuXG4gICAgICAgIGlmIChzdHlsZVJ1bGUpIHtcbiAgICAgICAgICBsZXQgY3VycmVudERhdGFCaW5kID0gcm9vdERpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcpIHx8ICcnO1xuICAgICAgICAgIGlmIChjdXJyZW50RGF0YUJpbmQpIHtcbiAgICAgICAgICAgIGN1cnJlbnREYXRhQmluZCArPSAnLCc7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vcm9vdERpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcsIGAke2N1cnJlbnREYXRhQmluZH0gY3NzOiB7ICR7Y3NzUnVsZS5jc3NDbGFzc30gOiAkcm9vdC5ldmFsRnVuYyhcIiR7ZGF0YUNvbnRleHROYW1lfS4ke2Nzc1J1bGUucnVsZX1cIiwke2RhdGFDb250ZXh0TmFtZX0sIFwiJHtkYXRhQ29udGV4dE5hbWV9XCIpIH1gKTtcbiAgICAgICAgICBsZXQgdmFsdWUgPSBldmFsdXRlUnVsZShzdHlsZVJ1bGUsIHZpZXdNb2RlbCk7XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlcyhzdHlsZSwgdmlld01vZGVsLCBkYXRhQ29udGV4dE5hbWUsIHJvb3REaXYpXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRTdHlsZXMoc3R5bGUsIHZpZXdNb2RlbCwgZGF0YUNvbnRleHROYW1lLCByb290RGl2KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZXRTdHlsZXMoc3R5bGUsIHZpZXdNb2RlbCwgZGF0YUNvbnRleHROYW1lLCByb290RGl2KVxuICAgIH1cblxuICB9XG5cbiAgc2V0U3R5bGVzKHN0eWxlOiBJU3R5bGVFbnRyeSwgZGF0YTogYW55LCBkYXRhQ29udGV4dE5hbWU6IHN0cmluZywgcm9vdERpdjogSFRNTEVsZW1lbnQpOiBhbnkge1xuICAgIGxldCByZXRWYWx1ZTogSU5hbWVWYWx1ZSA9IHt9O1xuXG4gICAgaWYgKCFzdHlsZSkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2Ygc3R5bGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxldCBuOiBJU3R5bGVSdWxlID0ge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJ1aWxkU3R5bGVOYW1lVmFsdWUobiwgcmV0VmFsdWUpO1xuICAgIH1cblxuXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdHlsZSkpIHtcbiAgICAgIGxldCBhcnJJdGVtID0gc3R5bGUgYXMgSVN0eWxlUnVsZVtdO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJySXRlbSkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJJdGVtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbGV0IHN0eWxlUnVsZU9yTmFtZVZhbHVlID0gYXJySXRlbVtpXTtcbiAgICAgICAgICBpZiAoc3R5bGVSdWxlT3JOYW1lVmFsdWUucnVsZSkge1xuICAgICAgICAgICAgaWYgKGV2YWx1dGVSdWxlKHN0eWxlUnVsZU9yTmFtZVZhbHVlLnJ1bGUsIGRhdGEpKSB7XG4gICAgICAgICAgICAgIGlmICghc3R5bGVSdWxlT3JOYW1lVmFsdWUuc3R5bGUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICByZXRWYWx1ZSA9IHRoaXMuYnVpbGRTdHlsZU5hbWVWYWx1ZShzdHlsZVJ1bGVPck5hbWVWYWx1ZSwgcmV0VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldFZhbHVlID0gdGhpcy5idWlsZFN0eWxlTmFtZVZhbHVlKHN0eWxlUnVsZU9yTmFtZVZhbHVlLCByZXRWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJySXRlbS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3R5bGVSdWxlT3JOYW1lVmFsdWUgPSBhcnJJdGVtW2ldO1xuICAgICAgICBpZiAoc3R5bGVSdWxlT3JOYW1lVmFsdWUucnVsZSkge1xuICAgICAgICAgIGlmIChldmFsdXRlUnVsZShzdHlsZVJ1bGVPck5hbWVWYWx1ZS5ydWxlLCBkYXRhKSkge1xuICAgICAgICAgICAgaWYgKCFzdHlsZVJ1bGVPck5hbWVWYWx1ZS5zdHlsZSkgY29udGludWU7XG4gICAgICAgICAgICByZXRWYWx1ZSA9IHRoaXMuYnVpbGRTdHlsZU5hbWVWYWx1ZShzdHlsZVJ1bGVPck5hbWVWYWx1ZSwgcmV0VmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXRWYWx1ZSA9IHRoaXMuYnVpbGRTdHlsZU5hbWVWYWx1ZShzdHlsZVJ1bGVPck5hbWVWYWx1ZSwgcmV0VmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuXG4gICAgICBpZiAodHlwZW9mIHN0eWxlID09PSBcIm9iamVjdFwiKSB7IC8vbXVzdCBiZSBhIE5hbWVWYWx1ZVxuICAgICAgICByZXRWYWx1ZSA9IHN0eWxlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vbG9vcCB0aHJvdWdoIHRoZSByZXRWYWx1ZSBhbmQgYWRkIHN0eWxlcyB0byBlbGVtZW50XG4gICAgZm9yIChsZXQga2V5IGluIHJldFZhbHVlKSB7XG4gICAgICBpZiAocmV0VmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICByb290RGl2LnN0eWxlW2tleSBhcyBhbnldID0gcmV0VmFsdWVba2V5IGFzIGFueV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBidWlsZFN0eWxlTmFtZVZhbHVlKHJ1bGU6IElTdHlsZVJ1bGUsIHJldFZhbHVlOiBJTmFtZVZhbHVlKSB7XG5cbiAgICBpZiAodHlwZW9mIHJ1bGUuc3R5bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldFZhbHVlID0geyAuLi5yZXRWYWx1ZSwgLi4ucnVsZS5zdHlsZSB9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcnVsZS5zdHlsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbGV0IHN0eWxlSXRlbXMgPSBydWxlLnN0eWxlLnNwbGl0KFwiO1wiKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3R5bGVJdGVtID0gc3R5bGVJdGVtc1tpXTtcbiAgICAgICAgbGV0IG5hbWVWYWx1ZSA9IHN0eWxlSXRlbS5zcGxpdChcIjpcIik7XG4gICAgICAgIGlmIChuYW1lVmFsdWUubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICByZXRWYWx1ZVtuYW1lVmFsdWVbMF0udHJpbSgpXSA9IG5hbWVWYWx1ZVsxXS50cmltKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldFZhbHVlO1xuICB9XG5cblxuXG59XG5cblxuIiwiaW1wb3J0IHsgREVCVUdfREVGQVVMVCwgREVGQVVMVF9FUlJPUl9NQU5BR0VNRU5UX1NFVFRJTkdTIH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0RlZmF1bHRTZXR0aW5nc1wiO1xuaW1wb3J0IHsgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZywgSVdpZGdldEpzb24gfSBmcm9tIFwiLi4vQmFzZUNsYXNzZXMvSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24ge1xuICAgIGZpZWxkUGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsXG4gICAgdmFsdWVPbk5vdEZvdW5kOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgY2FsY3VsYXRlZFZhbHVlOiBzdHJpbmc7XG4gICAgY2FsY3VsYXRlZFRpdGxlOiBzdHJpbmc7XG4gICAgZm9ybWF0dGVyOiBzdHJpbmcgfCB1bmRlZmluZWQsXG59XG5cblxuZXhwb3J0IGNvbnN0IERlZmF1bHQ6IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8SVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbj4gPSB7XG4gXG4gICAgZmllbGRQYXRoOiBcInRpdGxlXCIsXG4gICAgdGl0bGU6IG51bGwsXG4gICAgY2FsY3VsYXRlZFZhbHVlOiBcIlwiLFxuICAgIGNhbGN1bGF0ZWRUaXRsZTogXCJcIixcbiAgICB2YWx1ZU9uTm90Rm91bmQ6IFwiTm90IEZvdW5kXCIsXG4gICAgZm9ybWF0dGVyOiBcInZhbHVlXCIsLy9pZihwcmlvcml0eS5uYW1lID09PSAnbm9ybWFsJykgeyAgICAgICAgIHJldHVybiA9ICc8c3BhbiBjbGFzcz1cIm5vcm1hbFwiPk5vcm1hbCBQcmlvcml0eTwvc3Bhbj4nOyAgICAgfSBlbHNlIGlmKHByaW9yaXR5Lm5hbWUgPT09ICdoaWdoJykgeyAgICAgICAgIHJldHVybiA9ICc8c3BhbiBjbGFzcz1cImhpZ2hcIj5IaWdoIFByaW9yaXR5PC9zcGFuPic7ICAgICB9IGVsc2UgaWYocHJpb3JpdHkubmFtZSA9PT0gJ3VyZ2VudCcpIHsgICAgICAgICByZXR1cm4gPSAnPHNwYW4gY2xhc3M9XCJ1cmdlbnRcIj5VcmdlbnQgUHJpb3JpdHk8L3NwYW4+JzsgICAgIH0gZWxzZSB7ICAgICAgICAgcmV0dXJuID0gJzxzcGFuPlVua25vd24gUHJpb3JpdHk8L3NwYW4+JzsgICAgIH1cbiAgICBkZWJ1ZzogREVCVUdfREVGQVVMVCgpLFxuICAgIFxuICAgIGV2ZW50c1RvUmVhY3RUbzogW1xuICAgICAgICB7XG4gICAgICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby5jb3JlLmNhc2UucGhhc2UtY2hhbmdlZFwiLFxuICAgICAgICAgICAgbWV0aG9kVG9DYWxsOiBcImxvYWRBbmRCaW5kXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZXZlbnRQYXRoOiBcInNoYXJlZG8uY29yZS5jYXNlLmZvcm1zLnBoYXNlLnBoYXNlLWNoYW5nZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLnVwZGF0ZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLmNvcmUuY2FzZS5zaGFyZWRvLXVwZGF0ZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH1cbiAgICBdLFxuICAgIHJlZnJlc2hPbjoge1xuICAgICAgICBzaGFyZWRvSWRDaGFuZ2VkOiB0cnVlLFxuICAgICAgICBzaGFyZWRvUGFyZW50SWRDaGFuZ2VkOiB0cnVlLFxuICAgICAgICBzaGFyZWRvUGhhc2VDaGFuZ2VkOiB0cnVlLFxuICAgIH0sXG4gICAgZGF0YVNldHRpbmdzOiB7XG4gICAgICAgIGdldFZhbHVlVXNpbmdQYXJlbnRzOiBmYWxzZSxcbiAgICAgICAgbWF4RGVwdGg6IDAsXG4gICAgfSxcbiAgICBlcnJvck1hbmFnZW1lbnQ6IERFRkFVTFRfRVJST1JfTUFOQUdFTUVOVF9TRVRUSU5HUyxcblxuXG59XG5cbmV4cG9ydCBjb25zdCBXaWRnZXRTZXR0aW5ncyA6IElXaWRnZXRKc29uPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+ID17XG4gICAgdHlwZTogXCJ3aWRnZXRcIixcbiAgICBcInByaW9yaXR5XCI6IDYwMDAsXG4gICAgXCJkZXNpZ25lclwiOiB7XG4gICAgICAgIFwiYWxsb3dJblBvcnRhbERlc2lnbmVyXCI6IGZhbHNlLFxuICAgICAgICBcImFsbG93SW5TaGFyZWRvUG9ydGFsRGVzaWduZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJhbGxvd0FzcGVjdEFkYXB0ZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJ0aXRsZVwiOiBcIlNpbmdsZSBWYWx1ZSBBc3BlY3RcIixcbiAgICAgICAgXCJpY29uXCI6IFwiZmEtY29nXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJTaW5nbGUgVmFsdWUgQXNwZWN0XCIsXG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbICAgXCJVRCAtIElERUFzcGVjdHNcIl0sXG4gICAgICAgIFwiaXNDb25maWd1cmFibGVcIjogdHJ1ZSxcbiAgICAgICAgXCJjb25maWd1cmF0aW9uV2lkZ2V0XCI6IG51bGwsXG4gICAgICAgIFwiZGVmYXVsdENvbmZpZ3VyYXRpb25Kc29uXCI6IHsgY29uZmlndXJhdGlvbjogRGVmYXVsdH1cbiAgICB9LFxuICAgIFwic2NyaXB0c1wiOiBbXG4gICAgXSxcbiAgICBcInN0eWxlc1wiOiBbXG4gICAgICAgIFwiU2luZ2xlVmFsdWVBc3BlY3QuY3NzXCJcbiAgICBdLFxuICAgIFwidGVtcGxhdGVzXCI6IFtcbiAgICAgICAgXCJTaW5nbGVWYWx1ZUFzcGVjdC5odG1sXCJcbiAgICBdLFxuICAgIFwibWVudVRlbXBsYXRlc1wiOiBbXSxcbiAgICBcImNvbXBvbmVudHNcIjogW11cbn0iLCJcblxuLyoqXG4gKiAqIEZvcm1hdCBhIHZhbHVlIHVzaW5nIGEgZm9ybWF0dGVyIHN0cmluZ1xuICogKiBFeGFtcGxlczogXG4gKiAqIDEuIHZhbHVlXG4gKiAqIDIuIHZhbHVlLnRvVXBwZXJDYXNlKClcbiAqICogMy4gdmFsdWUgPyB2YWx1ZS50b1VwcGVyQ2FzZSgpIDogXCJcIlxuICogKiA0LiB2YWx1ZSA/IHZhbHVlLnRvVXBwZXJDYXNlKCkgOiBcIk5vIFZhbHVlXCJcbiAqICogNS4gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlRGF0ZVN0cmluZygpXG4gKiAqIDYuIHZhbHVlID8gbmV3IERhdGUodmFsdWUpLnRvTG9jYWxlRGF0ZVN0cmluZygpIDogXCJcIlxuICogQHBhcmFtIHZhbHVlIFxuICogQHBhcmFtIGZvcm1hdHRlciBcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VmFsdWUodmFsdWU6IGFueSwgZm9ybWF0dGVyOiBzdHJpbmcpOiBhbnkge1xuICAgIC8vIENyZWF0ZSBhIG5ldyBmdW5jdGlvbiBiYXNlZCBvbiB0aGUgZm9ybWF0dGVyXG4gICAgbGV0IGR5bmFtaWNGdW5jIDogRnVuY3Rpb25cbiAgICBsZXQgcmV0dXJuVmFsdWU6IGFueTtcbiAgICB0cnl7XG4gICAgICAgICBkeW5hbWljRnVuYyA9IG5ldyBGdW5jdGlvbigndmFsdWUnLCBgcmV0dXJuICgke2Zvcm1hdHRlcn0pO2ApO1xuICAgIC8vIEludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gdmFsdWVcbiAgICAgcmV0dXJuVmFsdWUgPSBkeW5hbWljRnVuYyh2YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoKGUpXG4gICAge1xuICAgICAgICByZXR1cm5WYWx1ZSA9IGBFcnJvciBmb3JtYXR0aW5nIHZhbHVlICR7dmFsdWV9IHdpdGggZm9ybWF0dGVyICR7Zm9ybWF0dGVyfSAtICR7ZX1gO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRGdW5jID0gZm9ybWF0VmFsdWU7IC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSIsImltcG9ydCB7IGV4ZWN1dGVFbWJlZGRlZENvZGUsIGV4ZWN1dGVGdW5jIH0gZnJvbSBcIi4vZXZhbHV0ZVJ1bGVcIjtcbmltcG9ydCB7IGZvcm1hdEZ1bmMgfSBmcm9tIFwiLi9Gb3JtYXR0ZXJcIjtcblxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBleHRyYWN0IHRoZSB2YWx1ZSBmcm9tIHRoZSB2YWx1ZSBzdHJpbmcuXG4gKiBUaGUgdmFsdWUgc3RyaW5nIGNhbiBiZSBhIHNpbXBsZSBzdHJpbmcsIG9yIGEgZnVuY3Rpb24gY2FsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gZXh0cmFjdCBvciBjYWxjdWxhdGVkIHZhbHVlXG4gKiBAcGFyYW0gdmlld01vZGVsIFRoZSB2aWV3IG1vZGVsIHRvIHVzZSBmb3IgdGhlIGZ1bmN0aW9uIGNhbGwgYW5kIGRhdGEgY29udGV4dFxuICogQHBhcmFtIGZvcm1hdHRlciBBIGZvcm1hdHRlciB0byB1c2Ugb24gdGhlIHZhbHVlIGUuZy4gdmFsdWUuVG9VcHBlcigpXG4gKiBAcmV0dXJucyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RWYWx1ZSh2YWx1ZTogc3RyaW5nLCB2aWV3TW9kZWw6IGFueSwgZm9ybWF0dGVyOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkLGRhdGFDb250ZXh0TmFtZT86c3RyaW5nKSB7XG4gICAgbGV0IHZhbHVlVG9TZXQgPSBleGVjdXRlRW1iZWRkZWRDb2RlKHZhbHVlLCB2aWV3TW9kZWwsZGF0YUNvbnRleHROYW1lKTtcbiAgXG4gICAgaWYgKHR5cGVvZiB2YWx1ZVRvU2V0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB2YWx1ZVRvU2V0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWVUb1NldCwgbnVsbCwgMik7XG4gICAgfVxuICBcbiAgICBpZiAoZm9ybWF0dGVyKSB7XG4gICAgICB2YWx1ZVRvU2V0ID0gZm9ybWF0RnVuYyh2YWx1ZVRvU2V0LCBmb3JtYXR0ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVUb1NldDtcbiAgfSIsImltcG9ydCB7IGRhdGEgfSBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgeyBKc29uVG9IdG1sQ29udmVydGVyIH0gZnJvbSBcIi4uL0NvbW1vbi9Kc29uVG9IVE1MQ29udmVydGVyXCI7XG5pbXBvcnQgeyBsLCBpbmYsIGVyciwgbGgxIH0gZnJvbSBcIi4uL0NvbW1vbi9Mb2dcIjtcbmltcG9ydCB7IHV0ZjhUb0Jhc2U2NCB9IGZyb20gXCIuLi9Db21tb24vQmFzZTY0RW5jb2RpbmdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1dGVSdWxlKHJ1bGU6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwsIGRhdGFDb250ZXh0OiBhbnksIGRhdGFDb250ZXh0TmFtZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuXG4gIGlmICghcnVsZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgcmV0dXJuVmFsdWU6IGFueSA9IGV4ZWN1dGVGdW5jKHJ1bGUsIGRhdGFDb250ZXh0LCBkYXRhQ29udGV4dE5hbWUpO1xuICAgIGlmICh0eXBlb2YgcmV0dXJuVmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsKGVycigoYFJ1bGUgWyR7cnVsZX1dIGRpZCBub3QgcmV0dXJuIGEgYm9vbGVhbiB2YWx1ZS4gSXQgcmV0dXJuZWQ6ICR7cmV0dXJuVmFsdWV9YCkpKTtcbiAgICAgIHJldHVybiBmYWxzZTsgLy8gRGVmYXVsdCB2YWx1ZSBpZiB0aGUgcnVsZSBkb2Vzbid0IHJldHVybiBhIGJvb2xlYW5cbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhgRXJyb3IgZXZhbHVhdGluZyBydWxlIFske3J1bGV9XSB3aXRoIGRhdGEgY29udGV4dGAsIGUpO1xuICAgIHJldHVybiBmYWxzZTsgLy8gRGVmYXVsdCB2YWx1ZSBpbiBjYXNlIG9mIGFuIGVycm9yXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVGdW5jKGV4cHJlc3Npb246IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwsIGRhdGFDb250ZXh0OiBhbnksIGRhdGFDb250ZXh0TmFtZT86IHN0cmluZykge1xuICAvLyBDcmVhdGUgYSBuZXcgZnVuY3Rpb24gYmFzZWQgb24gdGhlIGZvcm1hdHRlclxuICBsKGluZihgZXZhbHV0ZVJ1bGUoJHtleHByZXNzaW9ufSlgKSwgZGF0YUNvbnRleHQpO1xuXG4gIGlmIChleHByZXNzaW9uID09PSBcIlwiKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBpZiAoIWV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGxldCBkeW5hbWljRnVuYzogRnVuY3Rpb25cbiAgdHJ5IHtcbiAgICBsZXQgZGF0YUNvbnRleHROYW1lVG9Vc2UgPSAnZGF0YUNvbnRleHQnO1xuXG4gICAgLy9yZXBsYWNlIHRoZSBkYXRhQ29udGV4dE5hbWUgd2l0aCB0aGUgZGF0YUNvbnRleHROYW1lVG9Vc2VcbiAgICAvLyBSZXBsYWNlIHRoZSBkYXRhQ29udGV4dE5hbWUgd2l0aCB0aGUgZGF0YUNvbnRleHROYW1lVG9Vc2VcbiAgICBpZiAoZGF0YUNvbnRleHROYW1lKSB7XG5cbiAgICAgIC8vIEVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgaW4gdGhlIHN0cmluZyBmb3IgdXNlIGluIHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAgICAgIGNvbnN0IGVzY2FwZWREYXRhQ29udGV4dE5hbWUgPSBkYXRhQ29udGV4dE5hbWUucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcblxuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGVzY2FwZWREYXRhQ29udGV4dE5hbWUsICdnJyk7XG4gICAgICBleHByZXNzaW9uID0gZXhwcmVzc2lvbi5yZXBsYWNlKHJlZ2V4LCBkYXRhQ29udGV4dE5hbWVUb1VzZSk7XG4gICAgfVxuXG4gICAgY2hlY2tBbmRMb2dVbmRlZmluZWQoZGF0YUNvbnRleHQsIGV4cHJlc3Npb24sIGRhdGFDb250ZXh0TmFtZVRvVXNlKTtcblxuXG5cblxuICAgIGR5bmFtaWNGdW5jID0gbmV3IEZ1bmN0aW9uKGAke2RhdGFDb250ZXh0TmFtZVRvVXNlfWAsIGByZXR1cm4gKCR7ZXhwcmVzc2lvbn0pO2ApO1xuXG4gIH1cbiAgY2F0Y2ggKGUpIHtcbiAgICBsZXQgZXJyTWVzc2FnZSA9IGBFcnJvciBjcmVhdGluZyBmdW5jdGlvbiBmb3IgZXhwcmVzc2lvbiBbJHtleHByZXNzaW9ufV1gO1xuICAgIGwoZXJyKGVyck1lc3NhZ2UpLCBlKTtcbiAgICByZXR1cm4gZXJyTWVzc2FnZTtcbiAgfVxuXG5cbiAgbChpbmYoYGV2YWx1dGVSdWxlKCR7ZXhwcmVzc2lvbn0pIC0gZHluYW1pY0Z1bmM6IGApLCBkeW5hbWljRnVuYyk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXR1cm5WYWx1ZTogYW55ID0gZHluYW1pY0Z1bmMoZGF0YUNvbnRleHQpO1xuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGBFcnJvciBldmFsdWF0aW5nIHJ1bGUgWyR7ZXhwcmVzc2lvbn1dIHdpdGggZGF0YSBjb250ZXh0YCwgZSk7XG4gICAgcmV0dXJuIGAke2V9YDsgLy8gRGVmYXVsdCB2YWx1ZSBpbiBjYXNlIG9mIGFuIGVycm9yXG4gIH1cbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0FuZExvZ1VuZGVmaW5lZChvYmo6IGFueSwgcnVsZTogc3RyaW5nLCBkYXRhQ29udGV4dE5hbWU6IHN0cmluZykge1xuICBjb25zdCBwcm9wcyA9IHJ1bGUuc3BsaXQoJy4nKTtcbiAgbGV0IGN1cnJlbnQ6IGFueSA9IHt9O1xuICBjdXJyZW50W2RhdGFDb250ZXh0TmFtZV0gPSBvYmo7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChjdXJyZW50W3Byb3BzW2ldXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsKGVycihgRXJyb3Igd2hpbGUgZXZhbHVhdGluZyBhIHJ1bGUgJHtydWxlfSEgVGhlIHByb3BlcnR5ICR7ZGF0YUNvbnRleHROYW1lfS4ke3Byb3BzLnNsaWNlKDAsIGkgKyAxKS5qb2luKCcuJyl9IGlzIHVuZGVmaW5lZC5gKSk7XG4gICAgICBsKGVycihgQ2hlY2sgdGhlIGNvbmZpZ3VyYXRpb24gb2YgdGhlIHJ1bGUgJHtydWxlfSFgKSk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wc1tpXV07XG4gIH1cblxuICByZXR1cm4gY3VycmVudDtcbn1cblxuXG4vKipcbiAqIEV4YW1wbGU6IFwidGl0bGU6ICR7dGl0bGUudG9VcHBlckNhc2UoKX0gTWF0dGVyIFNlYXJjaCAkezIgKyAyfVwiXG4gKiBSZXN1cm46IFwidGl0bGU6IFRJVExFIE1BVFRFUiBTRUFSQ0ggNFwiXG4gKiBAcGFyYW0gaW5wdXQgXG4gKiBAcGFyYW0gZGF0YUNvbnRleHQgXG4gKiBAcGFyYW0gZGF0YUNvbnRleHROYW1lIFxuICogQHJldHVybnMgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlRW1iZWRkZWRDb2RlKGlucHV0OiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsLCBkYXRhQ29udGV4dDogYW55LCBkYXRhQ29udGV4dE5hbWU/OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gIGlmICghaW5wdXQpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIHJldHVybiBpbnB1dC5yZXBsYWNlKC9cXCRcXHsoLis/KVxcfS9nLCAoXywgY29kZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBXQVJOSU5HOiBFdmFsIGNhbiBleGVjdXRlIGFyYml0cmFyeSBjb2RlIGFuZCBpcyB1bnNhZmVcbiAgICAgIC8vIE9ubHkgdXNlIHdpdGggdHJ1c3RlZCBpbnB1dFxuXG4gICAgICBkYXRhQ29udGV4dFtcImhlbHBlcnNcIl0gPSBkYXRhQ29udGV4dFtcImhlbHBlcnNcIl0gfHwge307XG4gICAgICBkYXRhQ29udGV4dFtcImhlbHBlcnNcIl0udXRmOFRvQmFzZTY0ID0gdXRmOFRvQmFzZTY0O1xuIFxuICAgICAgbGV0IHZhbCA9IGV4ZWN1dGVGdW5jKGNvZGUsIGRhdGFDb250ZXh0LCBkYXRhQ29udGV4dE5hbWUpO1xuICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbCA9ICcnO1xuICAgICAgfVxuICAgICAgLy8gdmFsID0gSlNPTi5zdHJpbmdpZnkodmFsLCB1bmRlZmluZWQsIDIpO1xuXG4gICAgICB2YWwgPSBKc29uVG9IdG1sQ29udmVydGVyLmNvbnZlcnQodmFsKTtcbiAgICAgIFxuICAgICAgLy9yZW1vdmUgb3V0dGVyIFwiIGZyb20gdmFsXG4gICAgICAvLyB2YWwgPSB2YWwuc3Vic3RyaW5nKDEsIHZhbC5sZW5ndGggLSAxKTtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGV4ZWN1dGUgZW1iZWRkZWQgY29kZTonLCBlcnJvcik7XG5cbiAgICAgIGxldCB2YWwgPSAnJztcbiAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgIHZhbCA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFsID0gSlNPTi5zdHJpbmdpZnkoZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICB9XG4gIH0pO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBrbzsiLCJpbXBvcnQgYW5zaVN0eWxlcyBmcm9tICcjYW5zaS1zdHlsZXMnO1xuaW1wb3J0IHN1cHBvcnRzQ29sb3IgZnJvbSAnI3N1cHBvcnRzLWNvbG9yJztcbmltcG9ydCB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L29yZGVyXG5cdHN0cmluZ1JlcGxhY2VBbGwsXG5cdHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleCxcbn0gZnJvbSAnLi91dGlsaXRpZXMuanMnO1xuXG5jb25zdCB7c3Rkb3V0OiBzdGRvdXRDb2xvciwgc3RkZXJyOiBzdGRlcnJDb2xvcn0gPSBzdXBwb3J0c0NvbG9yO1xuXG5jb25zdCBHRU5FUkFUT1IgPSBTeW1ib2woJ0dFTkVSQVRPUicpO1xuY29uc3QgU1RZTEVSID0gU3ltYm9sKCdTVFlMRVInKTtcbmNvbnN0IElTX0VNUFRZID0gU3ltYm9sKCdJU19FTVBUWScpO1xuXG4vLyBgc3VwcG9ydHNDb2xvci5sZXZlbGAg4oaSIGBhbnNpU3R5bGVzLmNvbG9yW25hbWVdYCBtYXBwaW5nXG5jb25zdCBsZXZlbE1hcHBpbmcgPSBbXG5cdCdhbnNpJyxcblx0J2Fuc2knLFxuXHQnYW5zaTI1NicsXG5cdCdhbnNpMTZtJyxcbl07XG5cbmNvbnN0IHN0eWxlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbmNvbnN0IGFwcGx5T3B0aW9ucyA9IChvYmplY3QsIG9wdGlvbnMgPSB7fSkgPT4ge1xuXHRpZiAob3B0aW9ucy5sZXZlbCAmJiAhKE51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sZXZlbCkgJiYgb3B0aW9ucy5sZXZlbCA+PSAwICYmIG9wdGlvbnMubGV2ZWwgPD0gMykpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBgbGV2ZWxgIG9wdGlvbiBzaG91bGQgYmUgYW4gaW50ZWdlciBmcm9tIDAgdG8gMycpO1xuXHR9XG5cblx0Ly8gRGV0ZWN0IGxldmVsIGlmIG5vdCBzZXQgbWFudWFsbHlcblx0Y29uc3QgY29sb3JMZXZlbCA9IHN0ZG91dENvbG9yID8gc3Rkb3V0Q29sb3IubGV2ZWwgOiAwO1xuXHRvYmplY3QubGV2ZWwgPSBvcHRpb25zLmxldmVsID09PSB1bmRlZmluZWQgPyBjb2xvckxldmVsIDogb3B0aW9ucy5sZXZlbDtcbn07XG5cbmV4cG9ydCBjbGFzcyBDaGFsayB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RydWN0b3ItcmV0dXJuXG5cdFx0cmV0dXJuIGNoYWxrRmFjdG9yeShvcHRpb25zKTtcblx0fVxufVxuXG5jb25zdCBjaGFsa0ZhY3RvcnkgPSBvcHRpb25zID0+IHtcblx0Y29uc3QgY2hhbGsgPSAoLi4uc3RyaW5ncykgPT4gc3RyaW5ncy5qb2luKCcgJyk7XG5cdGFwcGx5T3B0aW9ucyhjaGFsaywgb3B0aW9ucyk7XG5cblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKGNoYWxrLCBjcmVhdGVDaGFsay5wcm90b3R5cGUpO1xuXG5cdHJldHVybiBjaGFsaztcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoYWxrKG9wdGlvbnMpIHtcblx0cmV0dXJuIGNoYWxrRmFjdG9yeShvcHRpb25zKTtcbn1cblxuT2JqZWN0LnNldFByb3RvdHlwZU9mKGNyZWF0ZUNoYWxrLnByb3RvdHlwZSwgRnVuY3Rpb24ucHJvdG90eXBlKTtcblxuZm9yIChjb25zdCBbc3R5bGVOYW1lLCBzdHlsZV0gb2YgT2JqZWN0LmVudHJpZXMoYW5zaVN0eWxlcykpIHtcblx0c3R5bGVzW3N0eWxlTmFtZV0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIodGhpcywgY3JlYXRlU3R5bGVyKHN0eWxlLm9wZW4sIHN0eWxlLmNsb3NlLCB0aGlzW1NUWUxFUl0pLCB0aGlzW0lTX0VNUFRZXSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgc3R5bGVOYW1lLCB7dmFsdWU6IGJ1aWxkZXJ9KTtcblx0XHRcdHJldHVybiBidWlsZGVyO1xuXHRcdH0sXG5cdH07XG59XG5cbnN0eWxlcy52aXNpYmxlID0ge1xuXHRnZXQoKSB7XG5cdFx0Y29uc3QgYnVpbGRlciA9IGNyZWF0ZUJ1aWxkZXIodGhpcywgdGhpc1tTVFlMRVJdLCB0cnVlKTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3Zpc2libGUnLCB7dmFsdWU6IGJ1aWxkZXJ9KTtcblx0XHRyZXR1cm4gYnVpbGRlcjtcblx0fSxcbn07XG5cbmNvbnN0IGdldE1vZGVsQW5zaSA9IChtb2RlbCwgbGV2ZWwsIHR5cGUsIC4uLmFyZ3VtZW50c18pID0+IHtcblx0aWYgKG1vZGVsID09PSAncmdiJykge1xuXHRcdGlmIChsZXZlbCA9PT0gJ2Fuc2kxNm0nKSB7XG5cdFx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpMTZtKC4uLmFyZ3VtZW50c18pO1xuXHRcdH1cblxuXHRcdGlmIChsZXZlbCA9PT0gJ2Fuc2kyNTYnKSB7XG5cdFx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpMjU2KGFuc2lTdHlsZXMucmdiVG9BbnNpMjU2KC4uLmFyZ3VtZW50c18pKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXS5hbnNpKGFuc2lTdHlsZXMucmdiVG9BbnNpKC4uLmFyZ3VtZW50c18pKTtcblx0fVxuXG5cdGlmIChtb2RlbCA9PT0gJ2hleCcpIHtcblx0XHRyZXR1cm4gZ2V0TW9kZWxBbnNpKCdyZ2InLCBsZXZlbCwgdHlwZSwgLi4uYW5zaVN0eWxlcy5oZXhUb1JnYiguLi5hcmd1bWVudHNfKSk7XG5cdH1cblxuXHRyZXR1cm4gYW5zaVN0eWxlc1t0eXBlXVttb2RlbF0oLi4uYXJndW1lbnRzXyk7XG59O1xuXG5jb25zdCB1c2VkTW9kZWxzID0gWydyZ2InLCAnaGV4JywgJ2Fuc2kyNTYnXTtcblxuZm9yIChjb25zdCBtb2RlbCBvZiB1c2VkTW9kZWxzKSB7XG5cdHN0eWxlc1ttb2RlbF0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3Qge2xldmVsfSA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVyID0gY3JlYXRlU3R5bGVyKGdldE1vZGVsQW5zaShtb2RlbCwgbGV2ZWxNYXBwaW5nW2xldmVsXSwgJ2NvbG9yJywgLi4uYXJndW1lbnRzXyksIGFuc2lTdHlsZXMuY29sb3IuY2xvc2UsIHRoaXNbU1RZTEVSXSk7XG5cdFx0XHRcdHJldHVybiBjcmVhdGVCdWlsZGVyKHRoaXMsIHN0eWxlciwgdGhpc1tJU19FTVBUWV0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXHR9O1xuXG5cdGNvbnN0IGJnTW9kZWwgPSAnYmcnICsgbW9kZWxbMF0udG9VcHBlckNhc2UoKSArIG1vZGVsLnNsaWNlKDEpO1xuXHRzdHlsZXNbYmdNb2RlbF0gPSB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3Qge2xldmVsfSA9IHRoaXM7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVyID0gY3JlYXRlU3R5bGVyKGdldE1vZGVsQW5zaShtb2RlbCwgbGV2ZWxNYXBwaW5nW2xldmVsXSwgJ2JnQ29sb3InLCAuLi5hcmd1bWVudHNfKSwgYW5zaVN0eWxlcy5iZ0NvbG9yLmNsb3NlLCB0aGlzW1NUWUxFUl0pO1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlQnVpbGRlcih0aGlzLCBzdHlsZXIsIHRoaXNbSVNfRU1QVFldKTtcblx0XHRcdH07XG5cdFx0fSxcblx0fTtcbn1cblxuY29uc3QgcHJvdG8gPSBPYmplY3QuZGVmaW5lUHJvcGVydGllcygoKSA9PiB7fSwge1xuXHQuLi5zdHlsZXMsXG5cdGxldmVsOiB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRnZXQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tHRU5FUkFUT1JdLmxldmVsO1xuXHRcdH0sXG5cdFx0c2V0KGxldmVsKSB7XG5cdFx0XHR0aGlzW0dFTkVSQVRPUl0ubGV2ZWwgPSBsZXZlbDtcblx0XHR9LFxuXHR9LFxufSk7XG5cbmNvbnN0IGNyZWF0ZVN0eWxlciA9IChvcGVuLCBjbG9zZSwgcGFyZW50KSA9PiB7XG5cdGxldCBvcGVuQWxsO1xuXHRsZXQgY2xvc2VBbGw7XG5cdGlmIChwYXJlbnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wZW5BbGwgPSBvcGVuO1xuXHRcdGNsb3NlQWxsID0gY2xvc2U7XG5cdH0gZWxzZSB7XG5cdFx0b3BlbkFsbCA9IHBhcmVudC5vcGVuQWxsICsgb3Blbjtcblx0XHRjbG9zZUFsbCA9IGNsb3NlICsgcGFyZW50LmNsb3NlQWxsO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRvcGVuLFxuXHRcdGNsb3NlLFxuXHRcdG9wZW5BbGwsXG5cdFx0Y2xvc2VBbGwsXG5cdFx0cGFyZW50LFxuXHR9O1xufTtcblxuY29uc3QgY3JlYXRlQnVpbGRlciA9IChzZWxmLCBfc3R5bGVyLCBfaXNFbXB0eSkgPT4ge1xuXHQvLyBTaW5nbGUgYXJndW1lbnQgaXMgaG90IHBhdGgsIGltcGxpY2l0IGNvZXJjaW9uIGlzIGZhc3RlciB0aGFuIGFueXRoaW5nXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1pbXBsaWNpdC1jb2VyY2lvblxuXHRjb25zdCBidWlsZGVyID0gKC4uLmFyZ3VtZW50c18pID0+IGFwcGx5U3R5bGUoYnVpbGRlciwgKGFyZ3VtZW50c18ubGVuZ3RoID09PSAxKSA/ICgnJyArIGFyZ3VtZW50c19bMF0pIDogYXJndW1lbnRzXy5qb2luKCcgJykpO1xuXG5cdC8vIFdlIGFsdGVyIHRoZSBwcm90b3R5cGUgYmVjYXVzZSB3ZSBtdXN0IHJldHVybiBhIGZ1bmN0aW9uLCBidXQgdGhlcmUgaXNcblx0Ly8gbm8gd2F5IHRvIGNyZWF0ZSBhIGZ1bmN0aW9uIHdpdGggYSBkaWZmZXJlbnQgcHJvdG90eXBlXG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZihidWlsZGVyLCBwcm90byk7XG5cblx0YnVpbGRlcltHRU5FUkFUT1JdID0gc2VsZjtcblx0YnVpbGRlcltTVFlMRVJdID0gX3N0eWxlcjtcblx0YnVpbGRlcltJU19FTVBUWV0gPSBfaXNFbXB0eTtcblxuXHRyZXR1cm4gYnVpbGRlcjtcbn07XG5cbmNvbnN0IGFwcGx5U3R5bGUgPSAoc2VsZiwgc3RyaW5nKSA9PiB7XG5cdGlmIChzZWxmLmxldmVsIDw9IDAgfHwgIXN0cmluZykge1xuXHRcdHJldHVybiBzZWxmW0lTX0VNUFRZXSA/ICcnIDogc3RyaW5nO1xuXHR9XG5cblx0bGV0IHN0eWxlciA9IHNlbGZbU1RZTEVSXTtcblxuXHRpZiAoc3R5bGVyID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gc3RyaW5nO1xuXHR9XG5cblx0Y29uc3Qge29wZW5BbGwsIGNsb3NlQWxsfSA9IHN0eWxlcjtcblx0aWYgKHN0cmluZy5pbmNsdWRlcygnXFx1MDAxQicpKSB7XG5cdFx0d2hpbGUgKHN0eWxlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHQvLyBSZXBsYWNlIGFueSBpbnN0YW5jZXMgYWxyZWFkeSBwcmVzZW50IHdpdGggYSByZS1vcGVuaW5nIGNvZGVcblx0XHRcdC8vIG90aGVyd2lzZSBvbmx5IHRoZSBwYXJ0IG9mIHRoZSBzdHJpbmcgdW50aWwgc2FpZCBjbG9zaW5nIGNvZGVcblx0XHRcdC8vIHdpbGwgYmUgY29sb3JlZCwgYW5kIHRoZSByZXN0IHdpbGwgc2ltcGx5IGJlICdwbGFpbicuXG5cdFx0XHRzdHJpbmcgPSBzdHJpbmdSZXBsYWNlQWxsKHN0cmluZywgc3R5bGVyLmNsb3NlLCBzdHlsZXIub3Blbik7XG5cblx0XHRcdHN0eWxlciA9IHN0eWxlci5wYXJlbnQ7XG5cdFx0fVxuXHR9XG5cblx0Ly8gV2UgY2FuIG1vdmUgYm90aCBuZXh0IGFjdGlvbnMgb3V0IG9mIGxvb3AsIGJlY2F1c2UgcmVtYWluaW5nIGFjdGlvbnMgaW4gbG9vcCB3b24ndCBoYXZlXG5cdC8vIGFueS92aXNpYmxlIGVmZmVjdCBvbiBwYXJ0cyB3ZSBhZGQgaGVyZS4gQ2xvc2UgdGhlIHN0eWxpbmcgYmVmb3JlIGEgbGluZWJyZWFrIGFuZCByZW9wZW5cblx0Ly8gYWZ0ZXIgbmV4dCBsaW5lIHRvIGZpeCBhIGJsZWVkIGlzc3VlIG9uIG1hY09TOiBodHRwczovL2dpdGh1Yi5jb20vY2hhbGsvY2hhbGsvcHVsbC85MlxuXHRjb25zdCBsZkluZGV4ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicpO1xuXHRpZiAobGZJbmRleCAhPT0gLTEpIHtcblx0XHRzdHJpbmcgPSBzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgoc3RyaW5nLCBjbG9zZUFsbCwgb3BlbkFsbCwgbGZJbmRleCk7XG5cdH1cblxuXHRyZXR1cm4gb3BlbkFsbCArIHN0cmluZyArIGNsb3NlQWxsO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY3JlYXRlQ2hhbGsucHJvdG90eXBlLCBzdHlsZXMpO1xuXG5jb25zdCBjaGFsayA9IGNyZWF0ZUNoYWxrKCk7XG5leHBvcnQgY29uc3QgY2hhbGtTdGRlcnIgPSBjcmVhdGVDaGFsayh7bGV2ZWw6IHN0ZGVyckNvbG9yID8gc3RkZXJyQ29sb3IubGV2ZWwgOiAwfSk7XG5cbmV4cG9ydCB7XG5cdG1vZGlmaWVyTmFtZXMsXG5cdGZvcmVncm91bmRDb2xvck5hbWVzLFxuXHRiYWNrZ3JvdW5kQ29sb3JOYW1lcyxcblx0Y29sb3JOYW1lcyxcblxuXHQvLyBUT0RPOiBSZW1vdmUgdGhlc2UgYWxpYXNlcyBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uXG5cdG1vZGlmaWVyTmFtZXMgYXMgbW9kaWZpZXJzLFxuXHRmb3JlZ3JvdW5kQ29sb3JOYW1lcyBhcyBmb3JlZ3JvdW5kQ29sb3JzLFxuXHRiYWNrZ3JvdW5kQ29sb3JOYW1lcyBhcyBiYWNrZ3JvdW5kQ29sb3JzLFxuXHRjb2xvck5hbWVzIGFzIGNvbG9ycyxcbn0gZnJvbSAnLi92ZW5kb3IvYW5zaS1zdHlsZXMvaW5kZXguanMnO1xuXG5leHBvcnQge1xuXHRzdGRvdXRDb2xvciBhcyBzdXBwb3J0c0NvbG9yLFxuXHRzdGRlcnJDb2xvciBhcyBzdXBwb3J0c0NvbG9yU3RkZXJyLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2hhbGs7XG4iLCIvLyBUT0RPOiBXaGVuIHRhcmdldGluZyBOb2RlLmpzIDE2LCB1c2UgYFN0cmluZy5wcm90b3R5cGUucmVwbGFjZUFsbGAuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nUmVwbGFjZUFsbChzdHJpbmcsIHN1YnN0cmluZywgcmVwbGFjZXIpIHtcblx0bGV0IGluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc3Vic3RyaW5nKTtcblx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdHJldHVybiBzdHJpbmc7XG5cdH1cblxuXHRjb25zdCBzdWJzdHJpbmdMZW5ndGggPSBzdWJzdHJpbmcubGVuZ3RoO1xuXHRsZXQgZW5kSW5kZXggPSAwO1xuXHRsZXQgcmV0dXJuVmFsdWUgPSAnJztcblx0ZG8ge1xuXHRcdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCwgaW5kZXgpICsgc3Vic3RyaW5nICsgcmVwbGFjZXI7XG5cdFx0ZW5kSW5kZXggPSBpbmRleCArIHN1YnN0cmluZ0xlbmd0aDtcblx0XHRpbmRleCA9IHN0cmluZy5pbmRleE9mKHN1YnN0cmluZywgZW5kSW5kZXgpO1xuXHR9IHdoaWxlIChpbmRleCAhPT0gLTEpO1xuXG5cdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCk7XG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleChzdHJpbmcsIHByZWZpeCwgcG9zdGZpeCwgaW5kZXgpIHtcblx0bGV0IGVuZEluZGV4ID0gMDtcblx0bGV0IHJldHVyblZhbHVlID0gJyc7XG5cdGRvIHtcblx0XHRjb25zdCBnb3RDUiA9IHN0cmluZ1tpbmRleCAtIDFdID09PSAnXFxyJztcblx0XHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgsIChnb3RDUiA/IGluZGV4IC0gMSA6IGluZGV4KSkgKyBwcmVmaXggKyAoZ290Q1IgPyAnXFxyXFxuJyA6ICdcXG4nKSArIHBvc3RmaXg7XG5cdFx0ZW5kSW5kZXggPSBpbmRleCArIDE7XG5cdFx0aW5kZXggPSBzdHJpbmcuaW5kZXhPZignXFxuJywgZW5kSW5kZXgpO1xuXHR9IHdoaWxlIChpbmRleCAhPT0gLTEpO1xuXG5cdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCk7XG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn1cbiIsImNvbnN0IEFOU0lfQkFDS0dST1VORF9PRkZTRVQgPSAxMDtcblxuY29uc3Qgd3JhcEFuc2kxNiA9IChvZmZzZXQgPSAwKSA9PiBjb2RlID0+IGBcXHUwMDFCWyR7Y29kZSArIG9mZnNldH1tYDtcblxuY29uc3Qgd3JhcEFuc2kyNTYgPSAob2Zmc2V0ID0gMCkgPT4gY29kZSA9PiBgXFx1MDAxQlskezM4ICsgb2Zmc2V0fTs1OyR7Y29kZX1tYDtcblxuY29uc3Qgd3JhcEFuc2kxNm0gPSAob2Zmc2V0ID0gMCkgPT4gKHJlZCwgZ3JlZW4sIGJsdWUpID0+IGBcXHUwMDFCWyR7MzggKyBvZmZzZXR9OzI7JHtyZWR9OyR7Z3JlZW59OyR7Ymx1ZX1tYDtcblxuY29uc3Qgc3R5bGVzID0ge1xuXHRtb2RpZmllcjoge1xuXHRcdHJlc2V0OiBbMCwgMF0sXG5cdFx0Ly8gMjEgaXNuJ3Qgd2lkZWx5IHN1cHBvcnRlZCBhbmQgMjIgZG9lcyB0aGUgc2FtZSB0aGluZ1xuXHRcdGJvbGQ6IFsxLCAyMl0sXG5cdFx0ZGltOiBbMiwgMjJdLFxuXHRcdGl0YWxpYzogWzMsIDIzXSxcblx0XHR1bmRlcmxpbmU6IFs0LCAyNF0sXG5cdFx0b3ZlcmxpbmU6IFs1MywgNTVdLFxuXHRcdGludmVyc2U6IFs3LCAyN10sXG5cdFx0aGlkZGVuOiBbOCwgMjhdLFxuXHRcdHN0cmlrZXRocm91Z2g6IFs5LCAyOV0sXG5cdH0sXG5cdGNvbG9yOiB7XG5cdFx0YmxhY2s6IFszMCwgMzldLFxuXHRcdHJlZDogWzMxLCAzOV0sXG5cdFx0Z3JlZW46IFszMiwgMzldLFxuXHRcdHllbGxvdzogWzMzLCAzOV0sXG5cdFx0Ymx1ZTogWzM0LCAzOV0sXG5cdFx0bWFnZW50YTogWzM1LCAzOV0sXG5cdFx0Y3lhbjogWzM2LCAzOV0sXG5cdFx0d2hpdGU6IFszNywgMzldLFxuXG5cdFx0Ly8gQnJpZ2h0IGNvbG9yXG5cdFx0YmxhY2tCcmlnaHQ6IFs5MCwgMzldLFxuXHRcdGdyYXk6IFs5MCwgMzldLCAvLyBBbGlhcyBvZiBgYmxhY2tCcmlnaHRgXG5cdFx0Z3JleTogWzkwLCAzOV0sIC8vIEFsaWFzIG9mIGBibGFja0JyaWdodGBcblx0XHRyZWRCcmlnaHQ6IFs5MSwgMzldLFxuXHRcdGdyZWVuQnJpZ2h0OiBbOTIsIDM5XSxcblx0XHR5ZWxsb3dCcmlnaHQ6IFs5MywgMzldLFxuXHRcdGJsdWVCcmlnaHQ6IFs5NCwgMzldLFxuXHRcdG1hZ2VudGFCcmlnaHQ6IFs5NSwgMzldLFxuXHRcdGN5YW5CcmlnaHQ6IFs5NiwgMzldLFxuXHRcdHdoaXRlQnJpZ2h0OiBbOTcsIDM5XSxcblx0fSxcblx0YmdDb2xvcjoge1xuXHRcdGJnQmxhY2s6IFs0MCwgNDldLFxuXHRcdGJnUmVkOiBbNDEsIDQ5XSxcblx0XHRiZ0dyZWVuOiBbNDIsIDQ5XSxcblx0XHRiZ1llbGxvdzogWzQzLCA0OV0sXG5cdFx0YmdCbHVlOiBbNDQsIDQ5XSxcblx0XHRiZ01hZ2VudGE6IFs0NSwgNDldLFxuXHRcdGJnQ3lhbjogWzQ2LCA0OV0sXG5cdFx0YmdXaGl0ZTogWzQ3LCA0OV0sXG5cblx0XHQvLyBCcmlnaHQgY29sb3Jcblx0XHRiZ0JsYWNrQnJpZ2h0OiBbMTAwLCA0OV0sXG5cdFx0YmdHcmF5OiBbMTAwLCA0OV0sIC8vIEFsaWFzIG9mIGBiZ0JsYWNrQnJpZ2h0YFxuXHRcdGJnR3JleTogWzEwMCwgNDldLCAvLyBBbGlhcyBvZiBgYmdCbGFja0JyaWdodGBcblx0XHRiZ1JlZEJyaWdodDogWzEwMSwgNDldLFxuXHRcdGJnR3JlZW5CcmlnaHQ6IFsxMDIsIDQ5XSxcblx0XHRiZ1llbGxvd0JyaWdodDogWzEwMywgNDldLFxuXHRcdGJnQmx1ZUJyaWdodDogWzEwNCwgNDldLFxuXHRcdGJnTWFnZW50YUJyaWdodDogWzEwNSwgNDldLFxuXHRcdGJnQ3lhbkJyaWdodDogWzEwNiwgNDldLFxuXHRcdGJnV2hpdGVCcmlnaHQ6IFsxMDcsIDQ5XSxcblx0fSxcbn07XG5cbmV4cG9ydCBjb25zdCBtb2RpZmllck5hbWVzID0gT2JqZWN0LmtleXMoc3R5bGVzLm1vZGlmaWVyKTtcbmV4cG9ydCBjb25zdCBmb3JlZ3JvdW5kQ29sb3JOYW1lcyA9IE9iamVjdC5rZXlzKHN0eWxlcy5jb2xvcik7XG5leHBvcnQgY29uc3QgYmFja2dyb3VuZENvbG9yTmFtZXMgPSBPYmplY3Qua2V5cyhzdHlsZXMuYmdDb2xvcik7XG5leHBvcnQgY29uc3QgY29sb3JOYW1lcyA9IFsuLi5mb3JlZ3JvdW5kQ29sb3JOYW1lcywgLi4uYmFja2dyb3VuZENvbG9yTmFtZXNdO1xuXG5mdW5jdGlvbiBhc3NlbWJsZVN0eWxlcygpIHtcblx0Y29uc3QgY29kZXMgPSBuZXcgTWFwKCk7XG5cblx0Zm9yIChjb25zdCBbZ3JvdXBOYW1lLCBncm91cF0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVzKSkge1xuXHRcdGZvciAoY29uc3QgW3N0eWxlTmFtZSwgc3R5bGVdIG9mIE9iamVjdC5lbnRyaWVzKGdyb3VwKSkge1xuXHRcdFx0c3R5bGVzW3N0eWxlTmFtZV0gPSB7XG5cdFx0XHRcdG9wZW46IGBcXHUwMDFCWyR7c3R5bGVbMF19bWAsXG5cdFx0XHRcdGNsb3NlOiBgXFx1MDAxQlske3N0eWxlWzFdfW1gLFxuXHRcdFx0fTtcblxuXHRcdFx0Z3JvdXBbc3R5bGVOYW1lXSA9IHN0eWxlc1tzdHlsZU5hbWVdO1xuXG5cdFx0XHRjb2Rlcy5zZXQoc3R5bGVbMF0sIHN0eWxlWzFdKTtcblx0XHR9XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoc3R5bGVzLCBncm91cE5hbWUsIHtcblx0XHRcdHZhbHVlOiBncm91cCxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0pO1xuXHR9XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgJ2NvZGVzJywge1xuXHRcdHZhbHVlOiBjb2Rlcyxcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0fSk7XG5cblx0c3R5bGVzLmNvbG9yLmNsb3NlID0gJ1xcdTAwMUJbMzltJztcblx0c3R5bGVzLmJnQ29sb3IuY2xvc2UgPSAnXFx1MDAxQls0OW0nO1xuXG5cdHN0eWxlcy5jb2xvci5hbnNpID0gd3JhcEFuc2kxNigpO1xuXHRzdHlsZXMuY29sb3IuYW5zaTI1NiA9IHdyYXBBbnNpMjU2KCk7XG5cdHN0eWxlcy5jb2xvci5hbnNpMTZtID0gd3JhcEFuc2kxNm0oKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaSA9IHdyYXBBbnNpMTYoQU5TSV9CQUNLR1JPVU5EX09GRlNFVCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kyNTYgPSB3cmFwQW5zaTI1NihBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaTE2bSA9IHdyYXBBbnNpMTZtKEFOU0lfQkFDS0dST1VORF9PRkZTRVQpO1xuXG5cdC8vIEZyb20gaHR0cHM6Ly9naXRodWIuY29tL1FpeC0vY29sb3ItY29udmVydC9ibG9iLzNmMGUwZDRlOTJlMjM1Nzk2Y2NiMTdmNmU4NWM3MjA5NGE2NTFmNDkvY29udmVyc2lvbnMuanNcblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc3R5bGVzLCB7XG5cdFx0cmdiVG9BbnNpMjU2OiB7XG5cdFx0XHR2YWx1ZShyZWQsIGdyZWVuLCBibHVlKSB7XG5cdFx0XHRcdC8vIFdlIHVzZSB0aGUgZXh0ZW5kZWQgZ3JleXNjYWxlIHBhbGV0dGUgaGVyZSwgd2l0aCB0aGUgZXhjZXB0aW9uIG9mXG5cdFx0XHRcdC8vIGJsYWNrIGFuZCB3aGl0ZS4gbm9ybWFsIHBhbGV0dGUgb25seSBoYXMgNCBncmV5c2NhbGUgc2hhZGVzLlxuXHRcdFx0XHRpZiAocmVkID09PSBncmVlbiAmJiBncmVlbiA9PT0gYmx1ZSkge1xuXHRcdFx0XHRcdGlmIChyZWQgPCA4KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMTY7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHJlZCA+IDI0OCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDIzMTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCgoKHJlZCAtIDgpIC8gMjQ3KSAqIDI0KSArIDIzMjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiAxNlxuXHRcdFx0XHRcdCsgKDM2ICogTWF0aC5yb3VuZChyZWQgLyAyNTUgKiA1KSlcblx0XHRcdFx0XHQrICg2ICogTWF0aC5yb3VuZChncmVlbiAvIDI1NSAqIDUpKVxuXHRcdFx0XHRcdCsgTWF0aC5yb3VuZChibHVlIC8gMjU1ICogNSk7XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRoZXhUb1JnYjoge1xuXHRcdFx0dmFsdWUoaGV4KSB7XG5cdFx0XHRcdGNvbnN0IG1hdGNoZXMgPSAvW2EtZlxcZF17Nn18W2EtZlxcZF17M30vaS5leGVjKGhleC50b1N0cmluZygxNikpO1xuXHRcdFx0XHRpZiAoIW1hdGNoZXMpIHtcblx0XHRcdFx0XHRyZXR1cm4gWzAsIDAsIDBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IFtjb2xvclN0cmluZ10gPSBtYXRjaGVzO1xuXG5cdFx0XHRcdGlmIChjb2xvclN0cmluZy5sZW5ndGggPT09IDMpIHtcblx0XHRcdFx0XHRjb2xvclN0cmluZyA9IFsuLi5jb2xvclN0cmluZ10ubWFwKGNoYXJhY3RlciA9PiBjaGFyYWN0ZXIgKyBjaGFyYWN0ZXIpLmpvaW4oJycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgaW50ZWdlciA9IE51bWJlci5wYXJzZUludChjb2xvclN0cmluZywgMTYpO1xuXG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXHRcdFx0XHRcdChpbnRlZ2VyID4+IDE2KSAmIDB4RkYsXG5cdFx0XHRcdFx0KGludGVnZXIgPj4gOCkgJiAweEZGLFxuXHRcdFx0XHRcdGludGVnZXIgJiAweEZGLFxuXHRcdFx0XHRcdC8qIGVzbGludC1lbmFibGUgbm8tYml0d2lzZSAqL1xuXHRcdFx0XHRdO1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0aGV4VG9BbnNpMjU2OiB7XG5cdFx0XHR2YWx1ZTogaGV4ID0+IHN0eWxlcy5yZ2JUb0Fuc2kyNTYoLi4uc3R5bGVzLmhleFRvUmdiKGhleCkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRhbnNpMjU2VG9BbnNpOiB7XG5cdFx0XHR2YWx1ZShjb2RlKSB7XG5cdFx0XHRcdGlmIChjb2RlIDwgOCkge1xuXHRcdFx0XHRcdHJldHVybiAzMCArIGNvZGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY29kZSA8IDE2KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDkwICsgKGNvZGUgLSA4KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCByZWQ7XG5cdFx0XHRcdGxldCBncmVlbjtcblx0XHRcdFx0bGV0IGJsdWU7XG5cblx0XHRcdFx0aWYgKGNvZGUgPj0gMjMyKSB7XG5cdFx0XHRcdFx0cmVkID0gKCgoY29kZSAtIDIzMikgKiAxMCkgKyA4KSAvIDI1NTtcblx0XHRcdFx0XHRncmVlbiA9IHJlZDtcblx0XHRcdFx0XHRibHVlID0gcmVkO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvZGUgLT0gMTY7XG5cblx0XHRcdFx0XHRjb25zdCByZW1haW5kZXIgPSBjb2RlICUgMzY7XG5cblx0XHRcdFx0XHRyZWQgPSBNYXRoLmZsb29yKGNvZGUgLyAzNikgLyA1O1xuXHRcdFx0XHRcdGdyZWVuID0gTWF0aC5mbG9vcihyZW1haW5kZXIgLyA2KSAvIDU7XG5cdFx0XHRcdFx0Ymx1ZSA9IChyZW1haW5kZXIgJSA2KSAvIDU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCB2YWx1ZSA9IE1hdGgubWF4KHJlZCwgZ3JlZW4sIGJsdWUpICogMjtcblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IDApIHtcblx0XHRcdFx0XHRyZXR1cm4gMzA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0XHRsZXQgcmVzdWx0ID0gMzAgKyAoKE1hdGgucm91bmQoYmx1ZSkgPDwgMikgfCAoTWF0aC5yb3VuZChncmVlbikgPDwgMSkgfCBNYXRoLnJvdW5kKHJlZCkpO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gMikge1xuXHRcdFx0XHRcdHJlc3VsdCArPSA2MDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRyZ2JUb0Fuc2k6IHtcblx0XHRcdHZhbHVlOiAocmVkLCBncmVlbiwgYmx1ZSkgPT4gc3R5bGVzLmFuc2kyNTZUb0Fuc2koc3R5bGVzLnJnYlRvQW5zaTI1NihyZWQsIGdyZWVuLCBibHVlKSksXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGhleFRvQW5zaToge1xuXHRcdFx0dmFsdWU6IGhleCA9PiBzdHlsZXMuYW5zaTI1NlRvQW5zaShzdHlsZXMuaGV4VG9BbnNpMjU2KGhleCkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0fSk7XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuY29uc3QgYW5zaVN0eWxlcyA9IGFzc2VtYmxlU3R5bGVzKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFuc2lTdHlsZXM7XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuY29uc3QgbGV2ZWwgPSAoKCkgPT4ge1xuXHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudERhdGEpIHtcblx0XHRjb25zdCBicmFuZCA9IG5hdmlnYXRvci51c2VyQWdlbnREYXRhLmJyYW5kcy5maW5kKCh7YnJhbmR9KSA9PiBicmFuZCA9PT0gJ0Nocm9taXVtJyk7XG5cdFx0aWYgKGJyYW5kICYmIGJyYW5kLnZlcnNpb24gPiA5Mykge1xuXHRcdFx0cmV0dXJuIDM7XG5cdFx0fVxuXHR9XG5cblx0aWYgKC9cXGIoQ2hyb21lfENocm9taXVtKVxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0cmV0dXJuIDA7XG59KSgpO1xuXG5jb25zdCBjb2xvclN1cHBvcnQgPSBsZXZlbCAhPT0gMCAmJiB7XG5cdGxldmVsLFxuXHRoYXNCYXNpYzogdHJ1ZSxcblx0aGFzMjU2OiBsZXZlbCA+PSAyLFxuXHRoYXMxNm06IGxldmVsID49IDMsXG59O1xuXG5jb25zdCBzdXBwb3J0c0NvbG9yID0ge1xuXHRzdGRvdXQ6IGNvbG9yU3VwcG9ydCxcblx0c3RkZXJyOiBjb2xvclN1cHBvcnQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0c0NvbG9yO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxyXG5pbXBvcnQgeyBmb3JtYXRWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi9oZWxwZXJzL0Zvcm1hdHRlclwiO1xyXG5pbXBvcnQgeyBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9zZWFyY2hGb3JBdHRyaWJ1dGVXaXRoUGFyZW50c1wiO1xyXG5pbXBvcnQgeyBCYXNlSURFQXNwZWN0IH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3RcIjtcclxuaW1wb3J0IHsgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZywgSVdpZGdldEpzb24gfSBmcm9tIFwiLi4vQmFzZUNsYXNzZXMvSW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBEZWZhdWx0LCBJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uLCBXaWRnZXRTZXR0aW5ncyB9IGZyb20gXCIuL1NpbmdsZVZhbHVlQXNwZWN0Q29uZmlnXCI7XHJcblxyXG5sZXQgdGhpc1dpZGdldFN5c3RlbU5hbWUgPSBcIlNpbmdsZVZhbHVlQXNwZWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2luZ2xlVmFsdWVBc3BlY3QgZXh0ZW5kcyBCYXNlSURFQXNwZWN0PElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24sIGFueT4ge1xyXG4gICAgbGl2ZUNvbmZpZ3VyYXRpb25SZWZyZXNoZWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy9ub3RoaW5nXHJcbiAgICB9XHJcbiAgICByZWZyZXNoKG5ld0NvbmZpZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgLy9ub3RoaW5nXHJcbiAgICB9XHJcbiAgICByZXNldChuZXdDb25maWc6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vbm90aGluZ1xyXG4gICAgfVxyXG4gICAgc2V0VGhpc0NvbXBvbmVudE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJTaW5nbGVWYWx1ZUFzcGVjdFwiO1xyXG4gICAgfVxyXG4gICAgc2V0V2lkZ2V0SnNvblNldHRpbmdzKCk6IElXaWRnZXRKc29uPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+IHtcclxuICAgICAgICByZXR1cm4gV2lkZ2V0U2V0dGluZ3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGVmYXVsdHMoKTogSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuICBEZWZhdWx0XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uLCBiYXNlTW9kZWw6IGFueSkge1xyXG4gICAgLy8gICAgIHN1cGVyKFwiU2luZ2xlVmFsdWVBc3BlY3RcIiwgXCJhc3BlY3REYXRhLm9kc0VudGl0eVBpY2tlclwiLCBlbGVtZW50LCBjb25maWd1cmF0aW9uLCBiYXNlTW9kZWwpXHJcbiAgICAvLyAgICAgdGhpcy5zZXR1cCgpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHNldExvY2F0aW9uT2ZEYXRhVG9Mb2FkQW5kU2F2ZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJpdmF0ZSBpbml0aWFsaXNlKCkgey8vISBOb3RlOiBVSSBmcmFtZXdvcmsgbG9va3MgZm9yIHRoaXMgbWV0aG9kIG5hbWUgYW5kIGlmIGZvdW5kIGJlaGF2ZXMgZGlmZmVyZW50bHkgYW5kIHdvbnQgY2FsbCBsb2FkQW5kQmluZFxyXG5cclxuICAgIGFzeW5jIHNldHVwKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHZhbHVlOiBcIlwiLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5vcHRpb25zPy50aXRsZSgpIHx8IFwiVGl0bGUgVmFsdWVcIlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBNYXAgdGhlIHJvbGVDb25maWdNb2RlbHNcclxuICAgICAgICB0aGlzLm9wdGlvbnM/LmZpZWxkUGF0aC5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiRmllbGQgcGF0aCBjaGFuZ2VkXCIsIFwiZ3JlZW5cIixuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEFuZEJpbmQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9wdGlvbnM/LmNhbGN1bGF0ZWRUaXRsZSh0aGlzLm9wdGlvbnM/LnRpdGxlKCkgfHwgXCJUaXRsZSBWYWx1ZVwiKTtcclxuICAgICAgICB0aGlzLm9wdGlvbnM/LnRpdGxlLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJUaXRsZSBjaGFuZ2VkXCIsIFwiZ3JlZW5cIiwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICBpZihuZXdWYWx1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucz8uY2FsY3VsYXRlZFRpdGxlKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG92ZXJyaWRlIGxvYWRBbmRCaW5kKCk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSAobW9kZWwpIHBhc3NlZCBpblwiLCBcImdyZWVuXCIpO1xyXG4gICAgICAgIC8vIHN1cGVyLmxvYWRBbmRCaW5kKCk7IC8vTm8gbmVlZCB0byBsb2FkIGFuZCBiaW5kIGFzIHdlIGFyZSBub3QgdXNpbmcgdGhlIGJhc2UgbW9kZWxcclxuXHJcbiAgICAgICAgbGV0IHNoYXJlZG9JZCA9IHRoaXMuc2hhcmVkb0lkKCk7XHJcblxyXG4gICAgICAgIGlmKCFzaGFyZWRvSWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9JZCBwYXNzZWQgaW5cIiwgXCJyZWRcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLm9wdGlvbnM/LmZpZWxkUGF0aCgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBmaWVsZCBwYXRoIHBhc3NlZCBpblwiLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlKHNoYXJlZG9JZCwgdGhpcy5vcHRpb25zPy5maWVsZFBhdGgoKSEsIHRoaXMub3B0aW9ucz8uZGF0YVNldHRpbmdzKCkuZ2V0VmFsdWVVc2luZ1BhcmVudHMoKSwgdGhpcy5vcHRpb25zPy5kYXRhU2V0dGluZ3MoKS5tYXhEZXB0aCgpKS50aGVuKChkYXRhKT0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YS5mb3VuZCA9PSBmYWxzZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2coXCJObyBkYXRhIHJldHVybmVkXCIsIFwicmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zPy5jYWxjdWxhdGVkVmFsdWUodGhpcy5vcHRpb25zPy52YWx1ZU9uTm90Rm91bmQoKSB8fCBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZSA9IGZvcm1hdFZhbHVlKGRhdGEudmFsdWUsIHRoaXMub3B0aW9ucz8uZm9ybWF0dGVyKCkgfHwgXCJ2YWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucz8uY2FsY3VsYXRlZFZhbHVlKGZvcm1hdHRlZFZhbHVlIHx8IFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIG92ZXJyaWRlIGFzeW5jIG9uU2F2ZShtb2RlbDogYW55KSB7XHJcblxyXG4gICAgICAgIHRoaXMubG9nKFwiTm8gU2F2ZSBJbXBsZW1lbnRlZFwiLCBcImdyZWVuXCIpO1xyXG4gICAgICAgIC8vIHN1cGVyLm9uU2F2ZShtb2RlbCk7XHJcblxyXG4gICAgfTtcclxufSAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=