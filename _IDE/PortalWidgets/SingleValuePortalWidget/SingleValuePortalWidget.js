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

/***/ "../../Desktop/Test/src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspect.ts":
/*!*****************************************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspect.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "../../Desktop/Test/src/WebBased/PortalWidgets/SingleValuePortalWidget/SingleValuePortalWidgetConfig.ts":
/*!**************************************************************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/PortalWidgets/SingleValuePortalWidget/SingleValuePortalWidgetConfig.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingleValuePortalDefault: () => (/* binding */ SingleValuePortalDefault),
/* harmony export */   WidgetSettings: () => (/* binding */ WidgetSettings)
/* harmony export */ });
/* harmony import */ var _IDEAspects_SingleValueAspect_SingleValueAspectConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../IDEAspects/SingleValueAspect/SingleValueAspectConfig */ "../../Desktop/Test/src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspectConfig.ts");

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
/*!********************************************************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/PortalWidgets/SingleValuePortalWidget/SingleValuePortalWidget.ts ***!
  \********************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingleValuePortalWidget: () => (/* binding */ SingleValuePortalWidget)
/* harmony export */ });
/* harmony import */ var _IDEAspects_SingleValueAspect_SingleValueAspect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../IDEAspects/SingleValueAspect/SingleValueAspect */ "../../Desktop/Test/src/WebBased/IDEAspects/SingleValueAspect/SingleValueAspect.ts");
/* harmony import */ var _SingleValuePortalWidgetConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SingleValuePortalWidgetConfig */ "../../Desktop/Test/src/WebBased/PortalWidgets/SingleValuePortalWidget/SingleValuePortalWidgetConfig.ts");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSnlGO0FBRUU7QUFFM0YsSUFBSSxvQkFBb0IsR0FBRyx5QkFBeUIsQ0FBQztBQUU5QyxNQUFNLHVCQUF3QixTQUFRLDhGQUFpQjtJQUMxRCwwQkFBMEI7UUFDdkIsZUFBZTtJQUNsQixDQUFDO0lBR0ksb0JBQW9CO1FBQ3JCLE9BQU8sb0JBQW9CLENBQUM7SUFDcEMsQ0FBQztJQUVZLFdBQVc7UUFDaEIsT0FBUSxvRkFBd0I7SUFDcEMsQ0FBQztJQUdRLHFCQUFxQjtRQUMxQixPQUFPLDBFQUFjLENBQUM7SUFDMUIsQ0FBQztDQUVKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvbm9kZV9tb2R1bGVzL2RldGVjdC1icm93c2VyL2VzL2luZGV4LmpzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi4vLi4vRGVza3RvcC9UZXN0L25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi4vLi4vRGVza3RvcC9UZXN0L25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9Db21tb24vQmFzZTY0RW5jb2RpbmcudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL0NvbW1vbi9EZWJvdW5kLnRzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9Db21tb24vSnNvblRvSFRNTENvbnZlcnRlci50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvQ29tbW9uL0xvZy50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvQ29tbW9uL1N0YWNrSGVscGVyLnRzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9JbnRlcmZhY2VzL2FwaS9ncmFwaC9JR3JhcGhRdWVyeS50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvV2ViQmFzZWQvQ29tbW9uL0V2ZW50c0hlbHBlci50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvV2ViQmFzZWQvQ29tbW9uL09iamVjdEhlbHBlci50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvV2ViQmFzZWQvQ29tbW9uL2FwaS9hcGkudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvZXhlY3V0ZUZpbmRCeUdyYXBoL2V4ZWN1dGVGaW5kQnlHcmFwaC50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvV2ViQmFzZWQvQ29tbW9uL2FwaS9leGVjdXRlRmluZEJ5UXVlcnkvRmluZEJ5UXVlcnkudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL0NvbW1vbi9hcGkvc2VhcmNoRm9yQXR0cmlidXRlV2l0aFBhcmVudHMudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvQmFzZUlERUFzcGVjdC50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9EZWZhdWx0U2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvS09Db252ZXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvVGVtcGxhdGUvVGVtcGxhdGVBcHBsaWNhdG9yLnRzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL1NpbmdsZVZhbHVlQXNwZWN0L1NpbmdsZVZhbHVlQXNwZWN0LnRzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL1NpbmdsZVZhbHVlQXNwZWN0L1NpbmdsZVZhbHVlQXNwZWN0Q29uZmlnLnRzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9XZWJCYXNlZC9Qb3J0YWxXaWRnZXRzL1NpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0L1NpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0Q29uZmlnLnRzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9oZWxwZXJzL0Zvcm1hdHRlci50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvaGVscGVycy9WYWt1ZUV4dHJhY3Rvci50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvaGVscGVycy9ldmFsdXRlUnVsZS50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL2V4dGVybmFsIHZhciBcImtvXCIiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL3ZlbmRvci9hbnNpLXN0eWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL3ZlbmRvci9zdXBwb3J0cy1jb2xvci9icm93c2VyLmpzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi4vLi4vRGVza3RvcC9UZXN0L3NyYy9XZWJCYXNlZC9Qb3J0YWxXaWRnZXRzL1NpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0L1NpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbnZhciBCcm93c2VySW5mbyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcm93c2VySW5mbyhuYW1lLCB2ZXJzaW9uLCBvcykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLm9zID0gb3M7XG4gICAgICAgIHRoaXMudHlwZSA9ICdicm93c2VyJztcbiAgICB9XG4gICAgcmV0dXJuIEJyb3dzZXJJbmZvO1xufSgpKTtcbmV4cG9ydCB7IEJyb3dzZXJJbmZvIH07XG52YXIgTm9kZUluZm8gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTm9kZUluZm8odmVyc2lvbikge1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLnR5cGUgPSAnbm9kZSc7XG4gICAgICAgIHRoaXMubmFtZSA9ICdub2RlJztcbiAgICAgICAgdGhpcy5vcyA9IHByb2Nlc3MucGxhdGZvcm07XG4gICAgfVxuICAgIHJldHVybiBOb2RlSW5mbztcbn0oKSk7XG5leHBvcnQgeyBOb2RlSW5mbyB9O1xudmFyIFNlYXJjaEJvdERldmljZUluZm8gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2VhcmNoQm90RGV2aWNlSW5mbyhuYW1lLCB2ZXJzaW9uLCBvcywgYm90KSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMub3MgPSBvcztcbiAgICAgICAgdGhpcy5ib3QgPSBib3Q7XG4gICAgICAgIHRoaXMudHlwZSA9ICdib3QtZGV2aWNlJztcbiAgICB9XG4gICAgcmV0dXJuIFNlYXJjaEJvdERldmljZUluZm87XG59KCkpO1xuZXhwb3J0IHsgU2VhcmNoQm90RGV2aWNlSW5mbyB9O1xudmFyIEJvdEluZm8gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQm90SW5mbygpIHtcbiAgICAgICAgdGhpcy50eXBlID0gJ2JvdCc7XG4gICAgICAgIHRoaXMuYm90ID0gdHJ1ZTsgLy8gTk9URTogZGVwcmVjYXRlZCB0ZXN0IG5hbWUgaW5zdGVhZFxuICAgICAgICB0aGlzLm5hbWUgPSAnYm90JztcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5vcyA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBCb3RJbmZvO1xufSgpKTtcbmV4cG9ydCB7IEJvdEluZm8gfTtcbnZhciBSZWFjdE5hdGl2ZUluZm8gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVhY3ROYXRpdmVJbmZvKCkge1xuICAgICAgICB0aGlzLnR5cGUgPSAncmVhY3QtbmF0aXZlJztcbiAgICAgICAgdGhpcy5uYW1lID0gJ3JlYWN0LW5hdGl2ZSc7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IG51bGw7XG4gICAgICAgIHRoaXMub3MgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3ROYXRpdmVJbmZvO1xufSgpKTtcbmV4cG9ydCB7IFJlYWN0TmF0aXZlSW5mbyB9O1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxudmFyIFNFQVJDSEJPWF9VQV9SRUdFWCA9IC9hbGV4YXxib3R8Y3Jhd2woZXJ8aW5nKXxmYWNlYm9va2V4dGVybmFsaGl0fGZlZWRidXJuZXJ8Z29vZ2xlIHdlYiBwcmV2aWV3fG5hZ2lvc3xwb3N0cmFua3xwaW5nZG9tfHNsdXJwfHNwaWRlcnx5YWhvbyF8eWFuZGV4LztcbnZhciBTRUFSQ0hCT1RfT1NfUkVHRVggPSAvKG51aGt8Y3VybHxHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrXFwgSmVldmVzXFwvVGVvbWF8aWFfYXJjaGl2ZXIpLztcbnZhciBSRVFVSVJFRF9WRVJTSU9OX1BBUlRTID0gMztcbnZhciB1c2VyQWdlbnRSdWxlcyA9IFtcbiAgICBbJ2FvbCcsIC9BT0xTaGllbGRcXC8oWzAtOVxcLl9dKykvXSxcbiAgICBbJ2VkZ2UnLCAvRWRnZVxcLyhbMC05XFwuX10rKS9dLFxuICAgIFsnZWRnZS1pb3MnLCAvRWRnaU9TXFwvKFswLTlcXC5fXSspL10sXG4gICAgWyd5YW5kZXhicm93c2VyJywgL1lhQnJvd3NlclxcLyhbMC05XFwuX10rKS9dLFxuICAgIFsna2FrYW90YWxrJywgL0tBS0FPVEFMS1xccyhbMC05XFwuXSspL10sXG4gICAgWydzYW1zdW5nJywgL1NhbXN1bmdCcm93c2VyXFwvKFswLTlcXC5dKykvXSxcbiAgICBbJ3NpbGsnLCAvXFxiU2lsa1xcLyhbMC05Ll8tXSspXFxiL10sXG4gICAgWydtaXVpJywgL01pdWlCcm93c2VyXFwvKFswLTlcXC5dKykkL10sXG4gICAgWydiZWFrZXInLCAvQmVha2VyQnJvd3NlclxcLyhbMC05XFwuXSspL10sXG4gICAgWydlZGdlLWNocm9taXVtJywgL0VkZ0E/XFwvKFswLTlcXC5dKykvXSxcbiAgICBbXG4gICAgICAgICdjaHJvbWl1bS13ZWJ2aWV3JyxcbiAgICAgICAgLyg/IUNocm9tLipPUFIpd3ZcXCkuKkNocm9tKD86ZXxpdW0pXFwvKFswLTlcXC5dKykoOj9cXHN8JCkvLFxuICAgIF0sXG4gICAgWydjaHJvbWUnLCAvKD8hQ2hyb20uKk9QUilDaHJvbSg/OmV8aXVtKVxcLyhbMC05XFwuXSspKDo/XFxzfCQpL10sXG4gICAgWydwaGFudG9tanMnLCAvUGhhbnRvbUpTXFwvKFswLTlcXC5dKykoOj9cXHN8JCkvXSxcbiAgICBbJ2NyaW9zJywgL0NyaU9TXFwvKFswLTlcXC5dKykoOj9cXHN8JCkvXSxcbiAgICBbJ2ZpcmVmb3gnLCAvRmlyZWZveFxcLyhbMC05XFwuXSspKD86XFxzfCQpL10sXG4gICAgWydmeGlvcycsIC9GeGlPU1xcLyhbMC05XFwuXSspL10sXG4gICAgWydvcGVyYS1taW5pJywgL09wZXJhIE1pbmkuKlZlcnNpb25cXC8oWzAtOVxcLl0rKS9dLFxuICAgIFsnb3BlcmEnLCAvT3BlcmFcXC8oWzAtOVxcLl0rKSg/Olxcc3wkKS9dLFxuICAgIFsnb3BlcmEnLCAvT1BSXFwvKFswLTlcXC5dKykoOj9cXHN8JCkvXSxcbiAgICBbJ3BpZScsIC9eTWljcm9zb2Z0IFBvY2tldCBJbnRlcm5ldCBFeHBsb3JlclxcLyhcXGQrXFwuXFxkKykkL10sXG4gICAgWydwaWUnLCAvXk1vemlsbGFcXC9cXGRcXC5cXGQrXFxzXFwoY29tcGF0aWJsZTtcXHMoPzpNU1A/SUV8TVNJbnRlcm5ldCBFeHBsb3JlcikgKFxcZCtcXC5cXGQrKTsuKldpbmRvd3MgQ0UuKlxcKSQvXSxcbiAgICBbJ25ldGZyb250JywgL15Nb3ppbGxhXFwvXFxkXFwuXFxkKy4qTmV0RnJvbnRcXC8oXFxkLlxcZCkvXSxcbiAgICBbJ2llJywgL1RyaWRlbnRcXC83XFwuMC4qcnZcXDooWzAtOVxcLl0rKS4qXFwpLipHZWNrbyQvXSxcbiAgICBbJ2llJywgL01TSUVcXHMoWzAtOVxcLl0rKTsuKlRyaWRlbnRcXC9bNC03XS4wL10sXG4gICAgWydpZScsIC9NU0lFXFxzKDdcXC4wKS9dLFxuICAgIFsnYmIxMCcsIC9CQjEwO1xcc1RvdWNoLipWZXJzaW9uXFwvKFswLTlcXC5dKykvXSxcbiAgICBbJ2FuZHJvaWQnLCAvQW5kcm9pZFxccyhbMC05XFwuXSspL10sXG4gICAgWydpb3MnLCAvVmVyc2lvblxcLyhbMC05XFwuX10rKS4qTW9iaWxlLipTYWZhcmkuKi9dLFxuICAgIFsnc2FmYXJpJywgL1ZlcnNpb25cXC8oWzAtOVxcLl9dKykuKlNhZmFyaS9dLFxuICAgIFsnZmFjZWJvb2snLCAvRkJbQVNdVlxcLyhbMC05XFwuXSspL10sXG4gICAgWydpbnN0YWdyYW0nLCAvSW5zdGFncmFtXFxzKFswLTlcXC5dKykvXSxcbiAgICBbJ2lvcy13ZWJ2aWV3JywgL0FwcGxlV2ViS2l0XFwvKFswLTlcXC5dKykuKk1vYmlsZS9dLFxuICAgIFsnaW9zLXdlYnZpZXcnLCAvQXBwbGVXZWJLaXRcXC8oWzAtOVxcLl0rKS4qR2Vja29cXCkkL10sXG4gICAgWydjdXJsJywgL15jdXJsXFwvKFswLTlcXC5dKykkL10sXG4gICAgWydzZWFyY2hib3QnLCBTRUFSQ0hCT1hfVUFfUkVHRVhdLFxuXTtcbnZhciBvcGVyYXRpbmdTeXN0ZW1SdWxlcyA9IFtcbiAgICBbJ2lPUycsIC9pUChob25lfG9kfGFkKS9dLFxuICAgIFsnQW5kcm9pZCBPUycsIC9BbmRyb2lkL10sXG4gICAgWydCbGFja0JlcnJ5IE9TJywgL0JsYWNrQmVycnl8QkIxMC9dLFxuICAgIFsnV2luZG93cyBNb2JpbGUnLCAvSUVNb2JpbGUvXSxcbiAgICBbJ0FtYXpvbiBPUycsIC9LaW5kbGUvXSxcbiAgICBbJ1dpbmRvd3MgMy4xMScsIC9XaW4xNi9dLFxuICAgIFsnV2luZG93cyA5NScsIC8oV2luZG93cyA5NSl8KFdpbjk1KXwoV2luZG93c185NSkvXSxcbiAgICBbJ1dpbmRvd3MgOTgnLCAvKFdpbmRvd3MgOTgpfChXaW45OCkvXSxcbiAgICBbJ1dpbmRvd3MgMjAwMCcsIC8oV2luZG93cyBOVCA1LjApfChXaW5kb3dzIDIwMDApL10sXG4gICAgWydXaW5kb3dzIFhQJywgLyhXaW5kb3dzIE5UIDUuMSl8KFdpbmRvd3MgWFApL10sXG4gICAgWydXaW5kb3dzIFNlcnZlciAyMDAzJywgLyhXaW5kb3dzIE5UIDUuMikvXSxcbiAgICBbJ1dpbmRvd3MgVmlzdGEnLCAvKFdpbmRvd3MgTlQgNi4wKS9dLFxuICAgIFsnV2luZG93cyA3JywgLyhXaW5kb3dzIE5UIDYuMSkvXSxcbiAgICBbJ1dpbmRvd3MgOCcsIC8oV2luZG93cyBOVCA2LjIpL10sXG4gICAgWydXaW5kb3dzIDguMScsIC8oV2luZG93cyBOVCA2LjMpL10sXG4gICAgWydXaW5kb3dzIDEwJywgLyhXaW5kb3dzIE5UIDEwLjApL10sXG4gICAgWydXaW5kb3dzIE1FJywgL1dpbmRvd3MgTUUvXSxcbiAgICBbJ1dpbmRvd3MgQ0UnLCAvV2luZG93cyBDRXxXaW5DRXxNaWNyb3NvZnQgUG9ja2V0IEludGVybmV0IEV4cGxvcmVyL10sXG4gICAgWydPcGVuIEJTRCcsIC9PcGVuQlNEL10sXG4gICAgWydTdW4gT1MnLCAvU3VuT1MvXSxcbiAgICBbJ0Nocm9tZSBPUycsIC9Dck9TL10sXG4gICAgWydMaW51eCcsIC8oTGludXgpfChYMTEpL10sXG4gICAgWydNYWMgT1MnLCAvKE1hY19Qb3dlclBDKXwoTWFjaW50b3NoKS9dLFxuICAgIFsnUU5YJywgL1FOWC9dLFxuICAgIFsnQmVPUycsIC9CZU9TL10sXG4gICAgWydPUy8yJywgL09TXFwvMi9dLFxuXTtcbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3QodXNlckFnZW50KSB7XG4gICAgaWYgKCEhdXNlckFnZW50KSB7XG4gICAgICAgIHJldHVybiBwYXJzZVVzZXJBZ2VudCh1c2VyQWdlbnQpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgICAgICByZXR1cm4gbmV3IFJlYWN0TmF0aXZlSW5mbygpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlVXNlckFnZW50KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0Tm9kZVZlcnNpb24oKTtcbn1cbmZ1bmN0aW9uIG1hdGNoVXNlckFnZW50KHVhKSB7XG4gICAgLy8gb3B0ZWQgZm9yIHVzaW5nIHJlZHVjZSBoZXJlIHJhdGhlciB0aGFuIEFycmF5I2ZpcnN0IHdpdGggYSByZWdleC50ZXN0IGNhbGxcbiAgICAvLyB0aGlzIGlzIHByaW1hcmlseSBiZWNhdXNlIHVzaW5nIHRoZSByZWR1Y2Ugd2Ugb25seSBwZXJmb3JtIHRoZSByZWdleFxuICAgIC8vIGV4ZWN1dGlvbiBvbmNlIHJhdGhlciB0aGFuIG9uY2UgZm9yIHRoZSB0ZXN0IGFuZCBmb3IgdGhlIGV4ZWMgYWdhaW4gYmVsb3dcbiAgICAvLyBwcm9iYWJseSBzb21ldGhpbmcgdGhhdCBuZWVkcyB0byBiZSBiZW5jaG1hcmtlZCB0aG91Z2hcbiAgICByZXR1cm4gKHVhICE9PSAnJyAmJlxuICAgICAgICB1c2VyQWdlbnRSdWxlcy5yZWR1Y2UoZnVuY3Rpb24gKG1hdGNoZWQsIF9hKSB7XG4gICAgICAgICAgICB2YXIgYnJvd3NlciA9IF9hWzBdLCByZWdleCA9IF9hWzFdO1xuICAgICAgICAgICAgaWYgKG1hdGNoZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB1YU1hdGNoID0gcmVnZXguZXhlYyh1YSk7XG4gICAgICAgICAgICByZXR1cm4gISF1YU1hdGNoICYmIFticm93c2VyLCB1YU1hdGNoXTtcbiAgICAgICAgfSwgZmFsc2UpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyTmFtZSh1YSkge1xuICAgIHZhciBkYXRhID0gbWF0Y2hVc2VyQWdlbnQodWEpO1xuICAgIHJldHVybiBkYXRhID8gZGF0YVswXSA6IG51bGw7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVc2VyQWdlbnQodWEpIHtcbiAgICB2YXIgbWF0Y2hlZFJ1bGUgPSBtYXRjaFVzZXJBZ2VudCh1YSk7XG4gICAgaWYgKCFtYXRjaGVkUnVsZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIG5hbWUgPSBtYXRjaGVkUnVsZVswXSwgbWF0Y2ggPSBtYXRjaGVkUnVsZVsxXTtcbiAgICBpZiAobmFtZSA9PT0gJ3NlYXJjaGJvdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCb3RJbmZvKCk7XG4gICAgfVxuICAgIC8vIERvIG5vdCB1c2UgUmVnRXhwIGZvciBzcGxpdCBvcGVyYXRpb24gYXMgc29tZSBicm93c2VyIGRvIG5vdCBzdXBwb3J0IGl0IChTZWU6IGh0dHA6Ly9ibG9nLnN0ZXZlbmxldml0aGFuLmNvbS9hcmNoaXZlcy9jcm9zcy1icm93c2VyLXNwbGl0KVxuICAgIHZhciB2ZXJzaW9uUGFydHMgPSBtYXRjaFsxXSAmJiBtYXRjaFsxXS5zcGxpdCgnLicpLmpvaW4oJ18nKS5zcGxpdCgnXycpLnNsaWNlKDAsIDMpO1xuICAgIGlmICh2ZXJzaW9uUGFydHMpIHtcbiAgICAgICAgaWYgKHZlcnNpb25QYXJ0cy5sZW5ndGggPCBSRVFVSVJFRF9WRVJTSU9OX1BBUlRTKSB7XG4gICAgICAgICAgICB2ZXJzaW9uUGFydHMgPSBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIHZlcnNpb25QYXJ0cywgdHJ1ZSksIGNyZWF0ZVZlcnNpb25QYXJ0cyhSRVFVSVJFRF9WRVJTSU9OX1BBUlRTIC0gdmVyc2lvblBhcnRzLmxlbmd0aCksIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2ZXJzaW9uUGFydHMgPSBbXTtcbiAgICB9XG4gICAgdmFyIHZlcnNpb24gPSB2ZXJzaW9uUGFydHMuam9pbignLicpO1xuICAgIHZhciBvcyA9IGRldGVjdE9TKHVhKTtcbiAgICB2YXIgc2VhcmNoQm90TWF0Y2ggPSBTRUFSQ0hCT1RfT1NfUkVHRVguZXhlYyh1YSk7XG4gICAgaWYgKHNlYXJjaEJvdE1hdGNoICYmIHNlYXJjaEJvdE1hdGNoWzFdKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VhcmNoQm90RGV2aWNlSW5mbyhuYW1lLCB2ZXJzaW9uLCBvcywgc2VhcmNoQm90TWF0Y2hbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEJyb3dzZXJJbmZvKG5hbWUsIHZlcnNpb24sIG9zKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RPUyh1YSkge1xuICAgIGZvciAodmFyIGlpID0gMCwgY291bnQgPSBvcGVyYXRpbmdTeXN0ZW1SdWxlcy5sZW5ndGg7IGlpIDwgY291bnQ7IGlpKyspIHtcbiAgICAgICAgdmFyIF9hID0gb3BlcmF0aW5nU3lzdGVtUnVsZXNbaWldLCBvcyA9IF9hWzBdLCByZWdleCA9IF9hWzFdO1xuICAgICAgICB2YXIgbWF0Y2ggPSByZWdleC5leGVjKHVhKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gb3M7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm9kZVZlcnNpb24oKSB7XG4gICAgdmFyIGlzTm9kZSA9IHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLnZlcnNpb247XG4gICAgcmV0dXJuIGlzTm9kZSA/IG5ldyBOb2RlSW5mbyhwcm9jZXNzLnZlcnNpb24uc2xpY2UoMSkpIDogbnVsbDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVZlcnNpb25QYXJ0cyhjb3VudCkge1xuICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgY291bnQ7IGlpKyspIHtcbiAgICAgICAgb3V0cHV0LnB1c2goJzAnKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn1cbiIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIGNvbnN0IHV1aWQgPSB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5hdGl2ZS5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVTdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsImV4cG9ydCBmdW5jdGlvbiB1dGY4VG9CYXNlNjQoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBidG9hKGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoLyUoWzAtOUEtRl17Mn0pL2csIChtYXRjaCwgcDEpID0+IHtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQocDEsIDE2KSk7XG4gICAgfSkpO1xufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGJhc2U2NFRvVXRmOChzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChhdG9iKHN0cikuc3BsaXQoJycpLm1hcChjID0+IHtcbiAgICAgICAgcmV0dXJuICclJyArICgnMDAnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpO1xuICAgIH0pLmpvaW4oJycpKTtcbn0iLCJsZXQgdGltZXI6IG51bWJlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlRnVuY3Rpb24oZnVuYzogKCkgPT4gdm9pZCwgd2FpdDogbnVtYmVyKTogKCkgPT4gdm9pZCB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGV4ZWN1dGVkRnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChsYXRlciwgd2FpdCkgYXMgdW5rbm93biBhcyBudW1iZXI7IC8vIENhc3QgdG8gbnVtYmVyIGlmIFR5cGVTY3JpcHQgY29tcGxhaW5zXG4gICAgfTtcbn1cbiAiLCJcbmV4cG9ydCBjbGFzcyBKc29uVG9IdG1sQ29udmVydGVyIHtcbiAgICBwdWJsaWMgc3RhdGljIGNvbnZlcnQoanNvbjogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGpzb24gPT0gbnVsbCkgcmV0dXJuIHRoaXMuZXNjYXBlSHRtbChcIjxlbT5udWxsPC9lbT5cIik7XG4gICAgICAgIGlmICh0eXBlb2YganNvbiAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHRoaXMuZXNjYXBlSHRtbChqc29uLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcnJheVRvSHRtbChqc29uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdFRvSHRtbChqc29uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGFycmF5VG9IdG1sKGFycjogYW55W10pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBpdGVtc0h0bWwgPSBhcnIubWFwKGl0ZW0gPT4gYDxsaT4ke3RoaXMuY29udmVydChpdGVtKX08L2xpPmApLmpvaW4oXCJcIik7XG4gICAgICAgIHJldHVybiBgPHVsPiR7aXRlbXNIdG1sfTwvdWw+YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBvYmplY3RUb0h0bWwob2JqOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzSHRtbCA9IE9iamVjdC5rZXlzKG9iailcbiAgICAgICAgICAgIC5tYXAoa2V5ID0+IGA8bGk+JHt0aGlzLmVzY2FwZUh0bWwoa2V5KX06ICR7dGhpcy5jb252ZXJ0KG9ialtrZXldKX08L2xpPmApXG4gICAgICAgICAgICAuam9pbihcIlwiKTtcbiAgICAgICAgcmV0dXJuIGA8dWw+JHtwcm9wZXJ0aWVzSHRtbH08L3VsPmA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZXNjYXBlSHRtbCh1bnNhZmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB1bnNhZmUucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvPC9nLCBcIiZsdDtcIilcbiAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIiYjMDM5O1wiKTtcbiAgICB9XG59XG5cbi8vIFVzYWdlIGV4YW1wbGU6XG5jb25zdCBqc29uID0ge1xuICAgIGNvZGU6IFwiRVJST1JfQ09ERVwiLFxuICAgIG1lc3NhZ2U6IFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIixcbiAgICBkZXRhaWxzOiB7XG4gICAgICAgIGluZm86IFwiRGV0YWlsZWQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGVycm9yXCIsXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICBpdGVtczogWzEsIDIsIDNdXG4gICAgfVxufTtcblxuIiwiaW1wb3J0IGNoYWxrLCB7IENoYWxrSW5zdGFuY2UgfSBmcm9tICdjaGFsayc7XG5pbXBvcnQgeyBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrLCBleHRyYWN0TGluZU51bWJlckZyb21TdGFjayB9IGZyb20gJy4vU3RhY2tIZWxwZXInO1xuXG5jaGFsay5sZXZlbCA9IDM7XG5sZXQgZGVmYXVsdE1vZGU6IENoYWxrSW5zdGFuY2UgPSBjaGFsay5yZXNldDtcblxuXG5sZXQgbGFzdFNlYzogU2VjdGlvbiB8IHVuZGVmaW5lZDtcblxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTZWMoKSB7XG5cbiAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrKyl7XG4gICAgLy8gY29uc29sZS5ncm91cEVuZCgpXG4gICAgLy8gfVxuXG4gICAgaWYgKGxhc3RTZWM/Lmdyb3VwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFzdFNlYz8uZ3JvdXA7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxhc3RTZWMgPSBuZXcgU2VjdGlvbihcIlJvb3RcIiwgZGVmYXVsdE1vZGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VjQmFja09uZSgpIHtcbiAgICBsYXN0U2VjID0gbGFzdFNlYz8ucGFyZW50O1xuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbn1cblxuZXhwb3J0IGNsYXNzIFNlY3Rpb24ge1xuICAgIHNlY3Rpb25OYW1lOiBzdHJpbmc7XG4gICAgcGFyZW50OiBTZWN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIGM6IENoYWxrSW5zdGFuY2VcbiAgICBpbmRlbnQgPSAwO1xuICAgIGluZGVudFBhZCA9IFwiXCI7XG4gICAgZ3JvdXA6IG51bWJlciA9IDA7XG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbk5hbWU6IHN0cmluZywgYzogQ2hhbGtJbnN0YW5jZSwgc2VjdGlvbj86IFNlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5jID0gYztcbiAgICAgICAgdGhpcy5zZWN0aW9uTmFtZSA9IHNlY3Rpb25OYW1lO1xuICAgICAgICBpZiAoc2VjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5pbmRlbnQgPSBzZWN0aW9uLmluZGVudCArIDE7XG4gICAgICAgICAgICB0aGlzLmluZGVudFBhZCA9IFwiLVwiLnJlcGVhdCh0aGlzLmluZGVudCAqIDIpICsgXCIgXCI7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdFNlYyA9IHRoaXM7XG4gICAgICAgIHRoaXMucGFyZW50ID0gc2VjdGlvbjtcbiAgICB9XG4gICAgbG9nKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRlZmF1bHRNb2RlKGFyZ3MpKTtcbiAgICB9XG4gICAgbGgxKGhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGgxKHRoaXMuaW5kZW50UGFkICsgaGVhZGluZywgdGhpcylcbiAgICB9XG4gICAgbGgyKGhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGgyKHRoaXMuaW5kZW50UGFkICsgaGVhZGluZywgdGhpcylcbiAgICB9XG4gICAgbGgzKGhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGgzKHRoaXMuaW5kZW50UGFkICsgaGVhZGluZywgdGhpcylcbiAgICB9XG4gICAgbCguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gbCh0aGlzLCAuLi5hcmdzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsKC4uLmFyZ3M6IGFueVtdKSB7XG5cbiAgICBsZXQgc2VjOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYztcbiAgICBsZXQgZmlyc3RBcmc6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZmlyc3RBcmdNb2RpZmVkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgaWYgKGFyZyBpbnN0YW5jZW9mIFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHNlYyA9IGFyZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZpcnN0QXJnICYmIGFyZy5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIlN0cmluZ1wiKSB7XG4gICAgICAgICAgICBmaXJzdEFyZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvL3JlbW92ZWQgU2VjdGlvbiBmcm9tIGFyZ3NcbiAgICBhcmdzID0gYXJncy5maWx0ZXIoKGFyZykgPT4ge1xuICAgICAgICByZXR1cm4gIShhcmcgaW5zdGFuY2VvZiBTZWN0aW9uKTtcbiAgICB9KVxuXG5cbiAgICAvLyBsZXQgYyA9IHNlYz8uYyB8fCBtb2RlO1xuICAgIGxldCBjID0gZGVmYXVsdE1vZGU7XG4gICAgbGV0IGluZGVudFBhZCA9IHNlYz8uaW5kZW50UGFkIHx8IFwiXCI7XG5cbiAgICBpZiAoIWZpcnN0QXJnKSB7XG4gICAgICAgIGZpcnN0QXJnID0gXCJcIjtcbiAgICB9XG4gICAgZmlyc3RBcmdNb2RpZmVkID0gZmlyc3RBcmc7XG5cbiAgICBmaXJzdEFyZ01vZGlmZWQgPSBpbmRlbnRQYWQgKyBmaXJzdEFyZztcbiAgICAvL3JlbW92ZSBjb2xvciBmb3JtYXR0aW5nIGZyb20gZmlyc3QgYXJnXG4gICAgbGV0IHRvdExlbiA9IGZpcnN0QXJnTW9kaWZlZC5sZW5ndGggLSBmaXJzdEFyZ01vZGlmZWQucmVwbGFjZSgvXFx1MDAxYlxcWy4qP20vZywgJycpLmxlbmd0aCAtIDI7XG5cblxuICAgIGNvbnNvbGUubG9nKGZpcnN0QXJnTW9kaWZlZCk7XG5cbiAgICAvL3JlbW92ZWQgU2VjdGlvbiBmcm9tIGFyZ3NcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZyk7XG4gICAgfSlcblxuXG59XG5cblxuXG5mdW5jdGlvbiBsb2dIZWFkaW5nU2VjdGlvbihjOiBDaGFsa0luc3RhbmNlLCBoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb24/OiBTZWN0aW9uKSB7XG5cbiAgICBsZXQgc2VjID0gbmV3IFNlY3Rpb24oaGVhZGluZywgYywgc2VjdGlvbik7XG4gICAgbGV0IHRpbWUgPSBuZXcgRGF0ZShEYXRlLm5vdygpKS50b0xvY2FsZVN0cmluZygpO1xuXG4gICAgbGV0IHBhdGggPSBcIlwiO1xuICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgIHBhdGggPSBzZWN0aW9uLnNlY3Rpb25OYW1lO1xuICAgICAgICB3aGlsZSAoc2VjdGlvbi5wYXJlbnQpIHtcbiAgICAgICAgICAgIHNlY3Rpb24gPSBzZWN0aW9uLnBhcmVudDtcbiAgICAgICAgICAgIHBhdGggPSBzZWN0aW9uLnNlY3Rpb25OYW1lICsgXCIgLT4gXCIgKyBwYXRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9hZGQgYWRkIGhlYWRpbmcgdG8gZW5kIG9mIHBhdGggYW5kIG9ubHkgYWRkIC0+IGlmIHBhdGggaXMgbm90IGVtcHR5XG4gICAgaWYgKHBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICBwYXRoICs9IFwiIC0+IFwiO1xuICAgIH1cbiAgICBwYXRoICs9IGhlYWRpbmc7XG5cblxuXG4gICAgLy9wb3NpdGlvbiB0aGUgaGVhZGluZyBpbiB0aGUgbWlkZGxlIG9mIHRoZSBzY3JlZW5cbiAgICAvLyBjb25zb2xlLmxvZyhjKGhlYWRpbmcucGFkU3RhcnQoKGN3aWR0aCAvIDIpICsgKGhlYWRpbmcubGVuZ3RoIC8gMiksIFwiIFwiKS5wYWRFbmQoY3dpZHRoLCBcIiBcIikpKTtcbiAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKGMocGF0aCkpO1xuICAgIHNlYy5ncm91cCsrO1xuXG4gICAgcmV0dXJuIHNlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxoMShoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb246IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjKSB7XG4gICAgbGV0IGMgPSBjaGFsay5iZ0JsYWNrLmdyZWVuQnJpZ2h0LmJvbGQ7XG4gICAgcmV0dXJuIGxvZ0hlYWRpbmdTZWN0aW9uKGMsIGhlYWRpbmcsIHNlY3Rpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGgyKGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWMpIHtcbiAgICBsZXQgYyA9IGNoYWxrLmJnR3JheS5jeWFuQnJpZ2h0LmJvbGQ7XG4gICAgcmV0dXJuIGxvZ0hlYWRpbmdTZWN0aW9uKGMsIGhlYWRpbmcsIHNlY3Rpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGgzKGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWMpIHtcbiAgICBsZXQgYyA9IGNoYWxrLmJnR3JheS5tYWdlbnRhQnJpZ2h0LmJvbGQ7XG4gICAgcmV0dXJuIGxvZ0hlYWRpbmdTZWN0aW9uKGMsIGhlYWRpbmcsIHNlY3Rpb24pO1xufVxuXG5cbmV4cG9ydCBjb25zdCBsaCA9IGxoMTtcblxuXG5leHBvcnQgY29uc3QgaW1wID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsucmVkLmJvbGQuYmdCbGFjaztcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGluZiA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLmJsdWUuYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IHdybiA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLnllbGxvdy5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufSBcblxuZXhwb3J0IGNvbnN0IGVyciA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcblxuICAgIGxldCBlciA9IChuZXcgRXJyb3IoKSk7XG4gICAgbGV0IGxpbmVObyA9IGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrKGVyLnN0YWNrKTtcbiAgICBsZXQgY2FsbGVyID0gZXh0cmFjdENhbGxlckZyb21TdGFjayhlci5zdGFjayk7XG5cbiAgICBsZXQgcHJlVGV4dCA9IGBbJHtjYWxsZXJ9OiR7bGluZU5vfV1gO1xuXG4gICAgdGV4dCA9IHByZVRleHQgKyBcIiBcIiArIHRleHQ7XG4gICAgXG4gICAgY29uc29sZS5sb2coZXIpO1xuXG4gICAgbGV0IGMgPSBjaGFsay5yZWQuYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IHN1YyA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLmdyZWVuLmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBobCA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gY2hhbGsuYmdCbHVlKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgaGwxID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ01hZ2VudGEodGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBudiA9IChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gY2hhbGsuYmdCbHVlQnJpZ2h0KG5hbWUucGFkRW5kKDMwLCBcIiBcIikpICsgXCIgOiBcIiArIGNoYWxrLmN5YW5CcmlnaHQodmFsdWUpO1xufVxuXG4gXG5sZXQgZXhhbXBsZUpTb24gPVxue1xuICAgIFwibmFtZVwiOiBcInRlc3RcIixcbiAgICBcImFnZVwiOiAxMCxcbiAgICBcImFkZHJlc3NcIjoge1xuICAgICAgICBcInN0cmVldFwiOiBcIjEyMyBGYWtlIFN0cmVldFwiLFxuICAgICAgICBcImNpdHlcIjogXCJMb25kb25cIixcbiAgICAgICAgXCJwb3N0Y29kZVwiOiBcIlNXMUEgMUFBXCJcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5UZXN0KCkge1xuXG5cbiAgICBjb25zb2xlLmxvZyhcIi0tIHRlc3QgLS1cIilcblxuICAgIGxldCBzZWMgPSBsaDEoXCJUZXN0IEhlYWRpbmcgMVwiKVxuICAgIGwoaW1wKFwiQXV0byBTZWMgLSBUaGlzIGlzIHNvbWV0aGluZyBpbXBvcnRhbnRcIikpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSAxXCIpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSAyXCIpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSBJTkZPOiBcIiArIGltcChcIlRoaXMgaXMgc29tZXRoaW5nIGltcG9ydGFudFwiKSlcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIFdJVEggQURESVRJTkFMIElORk86IFwiICsgaW1wKFwiVGhpcyBpcyBzb21ldGhpbmcgaW1wb3J0YW50XCIpICsgXCIgYW5kIHRoaXMgaXMgc29tZSBhZGRpdGlvbmFsIGluZm9cIilcbiAgICBsKFwiQXV0byBTZWMgLSBUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcImFmdGVyIGF1dG8gc2VjIFRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cbiAgICBzZWMgPSBzZWMubGgyKFwiSGVhZGluZyAyXCIpXG4gICAgc2VjLmwoXCJUZXN0XCIpXG4gICAgc2VjLmwoXCJUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cblxuICAgIHNlYyA9IHNlYy5saDMoXCJIZWFkIDNcIilcbiAgICBsKFwiVGVzdFwiKVxuICAgIGwoXCJUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cbiAgICBjbGVhclNlYygpO1xuICAgIGwoXCJUZXN0IENsZWFyIFNlY1wiKVxuICAgIGwoXCJUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cblxuXG4gICAgbChcIlRlc3QgSlNPTjpcIiwgZXhhbXBsZUpTb24pO1xuXG59XG5cbi8vIHJ1blRlc3QoKVxuY2xlYXJTZWMoKTtcblxuLy8gZXhwb3J0IHtjb2xvcnN9O1xuIiwiXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soc3RhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCk6IG51bWJlciB8IG51bGwge1xuICAgIGlmICghc3RhY2spIHJldHVybiBudWxsO1xuICAgIC8vIEV4dHJhY3QgbGluZXMgZnJvbSBzdGFja1xuICAgIGNvbnN0IHN0YWNrTGluZXMgPSBzdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgLy8gRmluZCB0aGUgbGluZSB3aXRoIHRoZSBlcnJvciAodXN1YWxseSB0aGUgc2Vjb25kIGxpbmUpXG4gICAgY29uc3QgZXJyb3JMaW5lID0gc3RhY2tMaW5lc1sxXSB8fCAnJztcbiAgICAvLyBFeHRyYWN0IGxpbmUgbnVtYmVyIGZyb20gdGhlIGVycm9yIGxpbmUgdXNpbmcgcmVnZXhcbiAgICBjb25zdCBtYXRjaCA9IGVycm9yTGluZS5tYXRjaCgvOihcXGQrKTooXFxkKykkLyk7XG4gICAgcmV0dXJuIG1hdGNoID8gcGFyc2VJbnQobWF0Y2hbMV0pIDogbnVsbDtcbiAgfVxuICBcbiBleHBvcnQgZnVuY3Rpb24gZXh0cmFjdENhbGxlckZyb21TdGFjayhzdGFjazogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKCFzdGFjaykgcmV0dXJuIG51bGw7XG4gICAgLy8gRXh0cmFjdCBsaW5lcyBmcm9tIHN0YWNrXG4gICAgY29uc3Qgc3RhY2tMaW5lcyA9IHN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAvLyBGaW5kIHRoZSBsaW5lIHdpdGggdGhlIGNhbGxlciBmdW5jdGlvbiAodXN1YWxseSB0aGUgdGhpcmQgbGluZSlcbiAgICBjb25zdCBjYWxsZXJMaW5lID0gc3RhY2tMaW5lc1syXSB8fCAnJztcbiAgICAvLyBFeHRyYWN0IGNhbGxlciBmdW5jdGlvbiBuYW1lIHVzaW5nIHJlZ2V4XG4gICAgY29uc3QgbWF0Y2ggPSBjYWxsZXJMaW5lLm1hdGNoKC9hdCAoW1xcdy48Pl0rKS8pO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogbnVsbDtcbiAgfSIsIlxuXG5leHBvcnQgY29uc3QgSUdyYXBoUXVlcnlEZmF1bHRzOiBJR3JhcGhRdWVyeSA9IHtcbiAgICBcImZpZWxkc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwicGF0aFwiOiBcIndvcmtpdGVtLnRpdGxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJwYXRoXCI6IFwid29ya2l0ZW0uaWRcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcImRlYnVnXCI6IGZhbHNlLFxuICAgIFwiYWxsb3dQYXJhbGxlbEV4ZWN1dGlvblwiOiB0cnVlLFxuICAgIFwiZXhlY3V0ZUNhbGN1bGF0ZWRGaWVsZHNcIjogdHJ1ZSxcbiAgICBcInJlc3BvbnNlVHlwZVwiOiBcImZsYXRcIixcbiAgICBcImVudGl0eVR5cGVcIjp1bmRlZmluZWQsXG4gICAgXCJlbnRpdHlJZFwiOiBcIlwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUdyYXBoUXVlcnkge1xuICBmaWVsZHM6IElHcmFwaFF1ZXJ5RmllbGRbXTtcbiAgZGVidWc6IGJvb2xlYW47XG4gIGFsbG93UGFyYWxsZWxFeGVjdXRpb246IGJvb2xlYW47XG4gIGV4ZWN1dGVDYWxjdWxhdGVkRmllbGRzOiBib29sZWFuO1xuICByZXNwb25zZVR5cGU6IHN0cmluZztcbiAgZW50aXR5VHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBlbnRpdHlJZDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElHcmFwaFF1ZXJ5RmllbGQge1xuICBwYXRoOiBzdHJpbmc7XG59IiwiXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hhcmVEb0V2ZW50IHtcbiAgICBldmVudFBhdGg6IHN0cmluZztcbiAgICBldmVudE5hbWU6IHN0cmluZztcbiAgICBzb3VyY2U6IGFueTtcbiAgICBkYXRhOiBhbnk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVFdmVudChldmVudDpTaGFyZURvRXZlbnQpIHtcblxuICAgICR1aS5ldmVudHMuYnJvYWRjYXN0KGV2ZW50LmV2ZW50UGF0aCwgZXZlbnQpO1xufSIsImltcG9ydCB7IGwsIGluZiwgZXJyIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Mb2dcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0clRvQ2xhc3MoY2xhc3NOYW1lOnN0cmluZywgYmFzZTphbnkpIHtcbiAgICBjb25zdCBjbGFzc1BhcnRzID0gY2xhc3NOYW1lLnNwbGl0KCcuJyk7XG4gICAgbGV0IGNsYXNzUmVmZXJlbmNlID0gYmFzZTtcblxuICAgIGZvciAoY29uc3QgcGFydCBvZiBjbGFzc1BhcnRzKSB7XG4gICAgICAgIGlmKCFjbGFzc1JlZmVyZW5jZVtwYXJ0XSkgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY2xhc3NSZWZlcmVuY2UgPSBjbGFzc1JlZmVyZW5jZVtwYXJ0XTtcbiAgICB9OyBcbiAgICByZXR1cm4gY2xhc3NSZWZlcmVuY2U7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEFsbEZpZWxkc1RvTnVsbChtb2RlbDphbnkpIHtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG1vZGVsKTtcbiAgICBrZXlzLmZvckVhY2goKGtleTogYW55KSA9PiB7XG4gICAgICAgIG1vZGVsW2tleV0gPSBudWxsO1xuICAgIH0pO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuT2JqZWN0KG9iOiBhbnkpIHtcbiAgICB2YXIgdG9SZXR1cm46IGFueSA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSBpbiBvYikge1xuICAgICAgICBpZiAoIW9iLmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZTtcblxuICAgICAgICBpZiAoKHR5cGVvZiBvYltpXSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhciBmbGF0T2JqZWN0ID0gZmxhdHRlbk9iamVjdChvYltpXSk7XG4gICAgICAgICAgICBmb3IgKHZhciB4IGluIGZsYXRPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZsYXRPYmplY3QuaGFzT3duUHJvcGVydHkoeCkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgdG9SZXR1cm5baSArICcuJyArIHhdID0gZmxhdE9iamVjdFt4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvUmV0dXJuW2ldID0gb2JbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvUmV0dXJuO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICBpZiAoIWN1cnJlbnRbcHJvcF0pIHtcbiAgICAgICAgICAgIGN1cnJlbnRbcHJvcF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcbiAgICB9XG4gICAgY3VycmVudFtwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoIC0gMV1dID0gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcpOiBhbnkge1xuICAgIGwoaW5mKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pYCksb2JqKTtcbiAgICBcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcGVydGllcykge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcHJvcGVydHkgaGFzIGFuIGFycmF5IGluZGV4LCBlLmcuLCBcImRhdGFbMF1cIlxuICAgICAgICBjb25zdCBtYXRjaGVzID0gcHJvcC5tYXRjaCgvXihbYS16QS1aMC05X10rKVxcWyhbMC05XSspXFxdJC8pO1xuXG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJheVByb3AgPSBtYXRjaGVzWzFdO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChtYXRjaGVzWzJdLCAxMCk7XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjdXJyZW50W2FycmF5UHJvcF0pIHx8IGN1cnJlbnRbYXJyYXlQcm9wXVtpbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGwoZXJyKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pOiBhcnJheVByb3Agb3IgaW5kZXggaXMgdW5kZWZpbmVkYCksb2JqKVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W2FycmF5UHJvcF1baW5kZXhdO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRbcHJvcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbChlcnIoYGdldE5lc3RlZFByb3BlcnR5KCR7cHJvcGVydHlQYXRofSk6IHByb3AgaXMgdW5kZWZpbmVkYCksb2JqKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG59XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSB0ZW1wb3JhcnkgYW5kIHdpbGwgYmUgcmVtb3ZlZCBvbmNlIHRoZSB0eXBlc2NyaXB0IHR5cGluZyBhcmUgZml4ZWRcbiAgICAgKiBXaGF0IGlzIGRvZXMgaXMgY2hlY2sgaWYgdGhlIHBhc3NlZCBpbiBvYmplY3QgaXMgYSBrbm9ja291dCBvYnNlcnZhYmxlIGFuZCBpZiBpdCBpcyBpdCByZXR1cm5zIHRoZSB2YWx1ZVxuICAgICAqIEBwYXJhbSBrb09iamVjdCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVGcm9tS09PYmplY3Q8VD4oa29PYmplY3Q6IGFueSkge1xuICAgICAgICBpZih0eXBlb2Yga29PYmplY3QgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGtvT2JqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtvT2JqZWN0XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGd2a288VD4oa29PYmplY3Q6IGFueSk6IFQgfCBhbnkge1xuICAgICAgICByZXR1cm4ga28udG9KUyhrb09iamVjdCk7XG4gICAgfSIsIlxuLyoqXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgdGhlIGFwaSBjYWxscyB0byB0aGUgYmFja2VuZC5cbiAqIHV0aWxpc2luZyB0aGUgYXhpb3MgbGlicmFyeSB0byBtYWtlIHRoZSBjYWxscy5cbiAqIGluY2x1c2luZyBvZiB3ZWJwYWNrSWdub3JlIGlzIHRvIGFsbG93IHRoZSB3ZWJwYWNrIHRvIGlnbm9yZSB0aGUgY2FsbHMgYW5kIG5vdCB0cnkgdG8gYnVuZGxlIHRoZW0uXG4gKi9cblxuaW1wb3J0IHsgZXJyLCBpbmYsIGwsIGxoMSwgc2VjQmFja09uZSB9IGZyb20gXCIuLi8uLi8uLi9Db21tb24vTG9nXCI7XG5pbXBvcnQgeyBUVXNlckVycm9ycyB9IGZyb20gXCIuLi8uLi9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0ludGVyZmFjZXNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVQb3N0PFQ+KGFwaTogc3RyaW5nLCBwb3N0Qm9keTogYW55KTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXgucG9zdCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSksIHBvc3RCb2R5KTtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiUE9TVFwiLCBwb3N0Qm9keSkpLmRhdGE7XG59XG5cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlR2V0PFQ+KGFwaTogc3RyaW5nKSA6IFByb21pc2U8VD57XG4vLyAgICAgcmV0dXJuIGF3YWl0ICRhamF4LmdldCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSkpO1xuLy8gfSBcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVHZXQ8VD4oYXBpOiBzdHJpbmcpOiBQcm9taXNlPFQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gKGF3YWl0IGV4ZWN1dGVGZXRjaDxUPihhcGksIFwiR0VUXCIsIHVuZGVmaW5lZCkpLmRhdGE7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVHZXR2MjxUPihhcGk6IHN0cmluZyl7XG4gICAgcmV0dXJuICBleGVjdXRlRmV0Y2g8VD4oYXBpLCBcIkdFVFwiLCB1bmRlZmluZWQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVBvc3R2MjxUUmVzcG9uc2U+KGFwaTogc3RyaW5nLCBwb3N0Qm9keTogYW55KSB7XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXgucG9zdCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSksIHBvc3RCb2R5KTtcbiAgICByZXR1cm4gZXhlY3V0ZUZldGNoPFRSZXNwb25zZT4oYXBpLCBcIlBPU1RcIiwgcG9zdEJvZHkpO1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBleGVjdXRlUHV0PFQ+KGFwaTogc3RyaW5nLCBwb3N0Qm9keTogYW55KTogUHJvbWlzZTxUIHwgdW5kZWZpbmVkPiB7XG4gICAgLy9yZXR1cm4gYXdhaXQgJGFqYXgucHV0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gdmFsaWRhdGVBcGkoYXBpKSwgcG9zdEJvZHkpO1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJQVVRcIiwgcG9zdEJvZHkpKS5kYXRhO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZURlbGV0ZTxUPihhcGk6IHN0cmluZyk6IFByb21pc2U8VCB8IHVuZGVmaW5lZD4ge1xuICAgIC8vcmV0dXJuIGF3YWl0ICRhamF4LmRlbGV0ZSgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovIHZhbGlkYXRlQXBpKGFwaSkpO1xuICAgIHJldHVybiAoYXdhaXQgZXhlY3V0ZUZldGNoPFQ+KGFwaSwgXCJERUxFVEVcIiwgdW5kZWZpbmVkKSkuZGF0YTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVBcGkoYXBpOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBsb2NhdGlvbiA9IHdpbmRvdy5kb2N1bWVudC5sb2NhdGlvbi5vcmlnaW47XG5cbiAgICAvL2lmIGFwaSBkb2VzIG5vdCBpbmNsdWRlIHRoZSBsb2NhdGlvbiB0aGVuIGFkZCBpdC5cbiAgICBpZiAoYXBpLmluZGV4T2YobG9jYXRpb24pID09PSAtMSkge1xuICAgICAgICAvL2NoZWNrIGlmIGFwaSBzdGFydCB3aXRoIGEgLyBpZiBub3QgYWRkIGl0LlxuICAgICAgICBpZiAoYXBpLmluZGV4T2YoXCIvXCIpICE9PSAwKSB7XG4gICAgICAgICAgICBhcGkgPSBcIi9cIiArIGFwaTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwaSA9IGxvY2F0aW9uICsgYXBpO1xuICAgIH1cbiAgICByZXR1cm4gYXBpO1xuXG59XG5cbmV4cG9ydCB0eXBlIFRFeGVjdXRlRmV0Y2hSZXNwb25zZTxUUmVzcG9uc2U+ID1cbiAgICB7XG4gICAgICAgIGRhdGE6IFRSZXNwb25zZSB8IHVuZGVmaW5lZCxcbiAgICAgICAgcmVzcG9uc2U6IFJlc3BvbnNlIHwgdW5kZWZpbmVkLFxuICAgICAgICBpbmZvOlxuICAgICAgICB7XG4gICAgICAgICAgICBzdWNjZXNzOiBib29sZWFuLFxuICAgICAgICAgICAgZXJyb3I6IEFycmF5PFRVc2VyRXJyb3JzPlxuICAgICAgICB9XG4gICAgfVxuXG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGVGZXRjaDxUUmVzcG9uc2U+KGFwaTogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgZGF0YTogYW55LCByZXRyeUNvdW50ZXI/Om51bWJlcik6IFByb21pc2U8VEV4ZWN1dGVGZXRjaFJlc3BvbnNlPFRSZXNwb25zZT4+IHtcbiAgICBsZXQgcmV0VmFsdWU6IFRFeGVjdXRlRmV0Y2hSZXNwb25zZTxUUmVzcG9uc2U+ID0ge1xuICAgICAgICBkYXRhOiB1bmRlZmluZWQsXG4gICAgICAgIHJlc3BvbnNlOiB1bmRlZmluZWQsXG4gICAgICAgIGluZm86IHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IFtdXG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIC8vdG8gZ2V0IG5ldyB0b2tlbiBUT0RPOiBjaGVjayBpZiBmYWlsIHRoZW4gY2FsbFxuICAgIC8vIGF3YWl0ICRhamF4LmdldChcImh0dHBzOi8vaHNmLXZuZXh0LnNoYXJlZG8uY28udWsvc2VjdXJpdHkvcmVmcmVzaFRva2Vucz9fPVwiICsgRGF0ZS5ub3cpO1xuXG4gICAgXG5cbiAgICBsZXQgdXJsID0gdmFsaWRhdGVBcGkoYXBpKTtcbiAgICBsZXQgZmV0Y2hIZWFkZXJzID0gYnVpbGRIZWFkZXJzKCk7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBmZXRjaEhlYWRlcnMsXG4gICAgICAgIGJvZHk6IGRhdGEgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IHVuZGVmaW5lZFxuICAgIH1cbiAgICApLnRoZW4oYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJldFZhbHVlLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIGlmIChyZXNwb25zZS5vayA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKXtcbiAgICAgICAgICAgICAgICByZXRyeUNvdW50ZXIgPSByZXRyeUNvdW50ZXIgfHwgMTtcbiAgICAgICAgICAgICAgICBpZihyZXRyeUNvdW50ZXIgPiAzKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0VmFsdWUuaW5mby5lcnJvci5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IFwiQVBJX0VSUk9SXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJIGFmdGVyIDMgYXR0ZW1wdHMuIHN0YXR1c1RleHQ6ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlck1lc3NhZ2U6IFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJLlwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB1bmRlZmluZWQsIHJlc3BvbnNlIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGF3YWl0ICRhamF4LmdldChcImh0dHBzOi8vaHNmLXZuZXh0LnNoYXJlZG8uY28udWsvc2VjdXJpdHkvcmVmcmVzaFRva2Vucz9fPVwiICsgRGF0ZS5ub3cpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBleGVjdXRlRmV0Y2g8VFJlc3BvbnNlPihhcGksIG1ldGhvZCwgZGF0YSxyZXRyeUNvdW50ZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvZGU6IFwiQVBJX0VSUk9SXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogYEFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNhbGwgdGhlIEFQSS4gc3RhdHVzVGV4dDogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWAsXG4gICAgICAgICAgICAgICAgdXNlck1lc3NhZ2U6IFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FsbCB0aGUgQVBJLlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXNwb25zZURhdGE7XG4gICAgICAgIC8vY2hlY2sgaWYgcmVzcG9uc2UgaXMgSlNPTlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpPy5pbmNsdWRlcyhcImFwcGxpY2F0aW9uL2pzb25cIikpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXRWYWx1ZS5pbmZvLnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlOiBhbnkpIHtcbiAgICAgICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IucHVzaCh7XG4gICAgICAgICAgICAgICAgY29kZTogXCJBUElfRVJST1JcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gZXh0cmFjdCB0aGUgZGF0YSBmcm9tIHRoZSBBUEkuIE1lc3NhZ2U6ICR7ZT8ubWVzc2FnZSB8fCBcIlVua25vd25cIn1gLFxuICAgICAgICAgICAgICAgIHVzZXJNZXNzYWdlOiBgQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gZXh0cmFjdCB0aGUgZGF0YSBmcm9tIHRoZSBBUEkuYFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZGF0YTogcmVzcG9uc2VEYXRhLCByZXNwb25zZSB9O1xuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBsKGVycihgRXJyb3IgZnJvbSBBUEkgQ2FsbCAke3VybH1gKSwgZXJyb3IpO1xuXG4gICAgICAgIHJldFZhbHVlLmluZm8uZXJyb3IucHVzaCh7XG4gICAgICAgICAgICBjb2RlOiBcIkFQSV9FUlJPUlwiLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgIHVzZXJNZXNzYWdlOiBlcnJvci5tZXNzYWdlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB7IGRhdGE6IHVuZGVmaW5lZCwgcmVzcG9uc2U6IHVuZGVmaW5lZCB9O1xuICAgIH0pXG5cbiAgICBsaDEoYFJlc3BvbnNlIGZyb20gJHt1cmx9YCk7XG4gICAgbChyZXNwb25zZSk7XG5cbiAgICByZXRWYWx1ZS5kYXRhID0gcmVzcG9uc2UuZGF0YTtcblxuICAgIGlmKHJldFZhbHVlLmluZm8uZXJyb3IubGVuZ3RoID4gMCl7XG4gICAgICAgIHJldFZhbHVlLmluZm8uc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICByZXRWYWx1ZS5pbmZvLmVycm9yLmZvckVhY2goZSA9PiB7XG4gICAgICAgICAgICBsKGVycihgRXJyb3IgZnJvbSBBUEkgQ2FsbCAke3VybH1gKSwgZSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc2VjQmFja09uZSgpO1xuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xufVxuXG5mdW5jdGlvbiBidWlsZEhlYWRlcnMoKSB7XG4gICAgbGV0IGJlYXJlciA9IGdldEJlYXJlclRva2VuKCk7XG4gICAgbGV0IGZldGNoSGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgZmV0Y2hIZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgaWYgKGJlYXJlcikge1xuICAgICAgICBmZXRjaEhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBiZWFyZXIpO1xuICAgIH1cbiAgICByZXR1cm4gZmV0Y2hIZWFkZXJzO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb29raWVzKCk6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0ge1xuICAgIGxldCByZXRWYWx1ZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICAgIGxldCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKS5yZWR1Y2UoZnVuY3Rpb24gKGNvb2tpZXMsIGNvb2tpZSkge1xuICAgICAgICB2YXIgcGFydHMgPSBjb29raWUuc3BsaXQoXCI9XCIpO1xuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gcGFydHNbMF0udHJpbSgpO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gcGFydHNbMV07XG5cbiAgICAgICAgICAgIHJldFZhbHVlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29va2llcztcbiAgICB9LCB7fSk7XG5cbiAgICByZXR1cm4gcmV0VmFsdWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmVhcmVyVG9rZW4oKSB7XG4gICAgdmFyIGNvb2tpZXMgPSBnZXRDb29raWVzKCk7XG4gICAgdmFyIHRva2VuID0gY29va2llc1tcIl9hcGlcIl07XG5cbiAgICBpZiAodG9rZW4pIHJldHVybiBcIkJlYXJlciBcIiArIHRva2VuO1xuICAgIHJldHVybiBudWxsO1xufTsiLCJcbmltcG9ydCB7IElHcmFwaFF1ZXJ5IH0gZnJvbSBcIi4uLy4uLy4uLy4uL0ludGVyZmFjZXMvYXBpL2dyYXBoL0lHcmFwaFF1ZXJ5XCI7XG5pbXBvcnQgeyBJR3JhcGhRdWVyeVJlc29uc2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vSW50ZXJmYWNlcy9hcGkvZ3JhcGgvSUdyYXBoUXVlcnlSZXNwb25zZVwiO1xuaW1wb3J0IHsgZXhlY3V0ZVBvc3QsIGV4ZWN1dGVQb3N0djIgfSBmcm9tIFwiLi4vYXBpXCI7XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUZpbmRCeUdyYXBoKGlucHV0T3B0aW9uOiBJR3JhcGhRdWVyeSlcbntcbiAgICByZXR1cm4gZXhlY3V0ZVBvc3R2MjxJR3JhcGhRdWVyeVJlc29uc2U+KFwiL2FwaS9ncmFwaC93b3JraXRlbS9xdWVyeVwiLCBpbnB1dE9wdGlvbilcbn1cbiIsImltcG9ydCB7IGV4ZWN1dGVQb3N0IH0gZnJvbSBcIi4uL2FwaVwiO1xuaW1wb3J0IHsgSUZpbmRCeVF1ZXJ5T3B0aW9ucyB9IGZyb20gXCIuL0lGaW5kQnlRdWVyeUlucHV0XCI7XG5pbXBvcnQgeyBJRmluZEJ5UXVlcnlSZXN1bHQgfSBmcm9tIFwiLi9JRmluZEJ5UXVlcnlSZXN1bHRcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUZpbmRCeVF1ZXJ5PFQ+KGlucHV0T3B0aW9uOiBJRmluZEJ5UXVlcnlPcHRpb25zKVxue1xuICAgIHJldHVybiBleGVjdXRlUG9zdDxJRmluZEJ5UXVlcnlSZXN1bHQ8VD4+KFwiL2FwaS92MS9wdWJsaWMvd29ya0l0ZW0vZmluZEJ5UXVlcnlcIiwgaW5wdXRPcHRpb24pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xufSIsImltcG9ydCB7IGV4ZWN1dGVGaW5kQnlRdWVyeSB9IGZyb20gXCIuL2V4ZWN1dGVGaW5kQnlRdWVyeS9GaW5kQnlRdWVyeVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIHNlYXJjaFJlc3VsdCBcbntcbiAgICBmb3VuZDpib29sZWFuLCBcbiAgICB2YWx1ZTpzdHJpbmcgfCB1bmRlZmluZWQsIFxuICAgIHBhcmVudElkOnN0cmluZyB8IHVuZGVmaW5lZFxuICAgIGRlcHRoOm51bWJlcixcbiAgICBmb3VuZEluV29ya0l0ZW1JZDpzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgd2FzRm91bmRJbkFuY2VzdG9yOmJvb2xlYW4sXG4gICAgZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZTpzdHJpbmcgfCB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZSh3b3JrSXRlbUlkOiBzdHJpbmcsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgcGFyZW50czogYm9vbGVhbiwgbWF4RGVwdGg/OiBudW1iZXIgfCB1bmRlZmluZWQpXG4ge1xuICAgIGxldCB1c2VNYXhEZXB0aCA6IGJvb2xlYW4gPSBtYXhEZXB0aCA/IHRydWUgOiBmYWxzZTtcbiAgICBpZihtYXhEZXB0aCAmJiBtYXhEZXB0aCA+IDApe1xuICAgICAgICB1c2VNYXhEZXB0aCA9IHRydWU7XG4gICAgfVxuXG5cbiAgICBsZXQgcmV0VmFsdWU6c2VhcmNoUmVzdWx0ID0ge2ZvdW5kOmZhbHNlLCB2YWx1ZTp1bmRlZmluZWQsIHBhcmVudElkOnVuZGVmaW5lZCwgZGVwdGg6MCwgZm91bmRJbldvcmtJdGVtSWQ6dW5kZWZpbmVkLCB3YXNGb3VuZEluQW5jZXN0b3I6ZmFsc2UsIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6dW5kZWZpbmVkfTtcblxuICAgIHJldFZhbHVlID0gYXdhaXQgc2VhcmNoRm9yQXR0cmlidXRlKHdvcmtJdGVtSWQsIGF0dHJpYnV0ZU5hbWUpO1xuXG4gICAgaWYocmV0VmFsdWUuZm91bmQpe1xuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgfVxuXG4gICAgaWYoIXBhcmVudHMgKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJObyBwYXJlbnRzIG9yIGNoaWxkcmVuIHRvIHNlYXJjaCBzbyBvbmx5IHNlYXJjaGluZyBjdXJyZW50IHdvcmsgaXRlbVwiKTtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlXG4gICAgfVxuXG4gICAgaWYocGFyZW50cyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIHBhcmVudHNcIik7XG4gICAgICAgIGxldCBkZXB0aCA9IDA7XG4gICAgICAgIGxldCBzZWFyY2hQYXJlbnQgPSBhc3luYyAocGFyZW50SWQ6IHN0cmluZyB8IHVuZGVmaW5lZCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgZGVwdGgrKztcbiAgICAgICAgICAgIGxldCByOiBzZWFyY2hSZXN1bHQgPSB7Zm91bmQ6ZmFsc2UsXG4gICAgICAgICAgICAgICAgIHZhbHVlOnVuZGVmaW5lZCwgXG4gICAgICAgICAgICAgICAgIHBhcmVudElkOnVuZGVmaW5lZCwgZGVwdGg6ZGVwdGgsIC8vZGVwdGggaGVyZSB3aWxsIGJlIG92ZXJyaWRlbiBpZiB0aGVyZSBpcyBhIHBhcmVudFxuICAgICAgICAgICAgICAgICBmb3VuZEluV29ya0l0ZW1JZDp1bmRlZmluZWQsIFxuICAgICAgICAgICAgICAgICB3YXNGb3VuZEluQW5jZXN0b3I6ZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kSW5Xb3JrVHlwZVN5c3RlbU5hbWU6dW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmKCFwYXJlbnRJZCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBwYXJlbnQgZm91bmRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICByID0gYXdhaXQgc2VhcmNoRm9yQXR0cmlidXRlKHBhcmVudElkLCBhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgICByLmRlcHRoID0gZGVwdGg7IC8vdXBkYXRlIGRlcHRoIGFzIGl0IHdpbGwgYmUgMFxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoci5mb3VuZCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBhdHRyaWJ1dGUgaW4gcGFyZW50XCIpO1xuICAgICAgICAgICAgICAgIHIud2FzRm91bmRJbkFuY2VzdG9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBpZih1c2VNYXhEZXB0aCAmJiBkZXB0aCA+PSBtYXhEZXB0aCEpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1heCBkZXB0aCByZWFjaGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBpZighci5wYXJlbnRJZCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcGFyZW50IGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgZm91bmQgaW4gcGFyZW50XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWFyY2hQYXJlbnQoci5wYXJlbnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXRWYWx1ZSA9IGF3YWl0IHNlYXJjaFBhcmVudChyZXRWYWx1ZS5wYXJlbnRJZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldFZhbHVlO1xuXG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlYXJjaEZvckF0dHJpYnV0ZSh3b3JrSXRlbUlkOiBzdHJpbmcsIGF0dHJpYnV0ZU5hbWU6IHN0cmluZykge1xuICAgIC8vZ2V0IHRoZSBtYXR0ZXJcbiAgICBsZXQgcmV0VmFsdWUgOnNlYXJjaFJlc3VsdCA9IHtcbiAgICAgICAgZm91bmQ6ZmFsc2UsIHZhbHVlOnVuZGVmaW5lZCxcbiAgICAgICAgIHBhcmVudElkOnVuZGVmaW5lZCwgZGVwdGg6MCxcbiAgICAgICAgICBmb3VuZEluV29ya0l0ZW1JZDp1bmRlZmluZWQsXG4gICAgICAgICAgIHdhc0ZvdW5kSW5BbmNlc3RvcjpmYWxzZSxcbiAgICAgICAgICAgZm91bmRJbldvcmtUeXBlU3lzdGVtTmFtZTp1bmRlZmluZWR9O1xuICAgIGxldCByZXEgPSB7XG4gICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwid29ya0l0ZW1JZHNcIjogW1xuICAgICAgICAgICAgICAgIHdvcmtJdGVtSWRcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJlbnJpY2hcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwicGF0aFwiOiBcInRpdGxlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwicGFyZW50LmlkXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwidHlwZS5zeXN0ZW1OYW1lXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IFwicmVmZXJlbmNlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJwYXRoXCI6IGF0dHJpYnV0ZU5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIlNlYXJjaGluZyB1c2luZyBTaGFyZURvIElkOiBcIiArIHdvcmtJdGVtSWQpO1xuICAgIGxldCBodHRwUmVzdWx0RmluZEJ5UXVlcnkgPSBhd2FpdCBleGVjdXRlRmluZEJ5UXVlcnk8YW55PihyZXEpO1xuXG4gICAgaWYoIWh0dHBSZXN1bHRGaW5kQnlRdWVyeSlcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcmVzdWx0IGZvdW5kXCIpO1xuICAgICAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGBXb3JrIGl0ZW0gJHt3b3JrSXRlbUlkfSBmb3VuZGApO1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzKSk7XG5cblxuICAgIGxldCB0eXBlU3lzdGVtTmFtZSA9IGh0dHBSZXN1bHRGaW5kQnlRdWVyeS5yZXN1bHRzWzBdLmRhdGFbXCJ0eXBlLnN5c3RlbU5hbWVcIl07XG4gICAgbGV0IHBhcmVudElkID0gICAgICAgaHR0cFJlc3VsdEZpbmRCeVF1ZXJ5LnJlc3VsdHNbMF0uZGF0YVtcInBhcmVudC5pZFwiXTtcbiAgICBsZXQgYXR0cmlidXRlID0gICAgICBodHRwUmVzdWx0RmluZEJ5UXVlcnkucmVzdWx0c1swXS5kYXRhW2F0dHJpYnV0ZU5hbWVdIGFzIHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhgVHlwZSBzeXN0ZW0gbmFtZSBpcyAke3R5cGVTeXN0ZW1OYW1lfWApO1xuICAgIGNvbnNvbGUubG9nKGBQYXJlbnQgSWQgaXMgJHtwYXJlbnRJZH1gKTtcbiAgICBjb25zb2xlLmxvZyhgQXR0cmlidXRlIFske2F0dHJpYnV0ZU5hbWV9XSBpcyAke2F0dHJpYnV0ZX1gKTtcblxuICAgIHJldFZhbHVlLnZhbHVlID0gYXR0cmlidXRlO1xuICAgIGlmKGF0dHJpYnV0ZSl7XG4gICAgICAgIHJldFZhbHVlLmZvdW5kID0gdHJ1ZTtcbiAgICAgICAgcmV0VmFsdWUuZm91bmRJbldvcmtJdGVtSWQgPSB3b3JrSXRlbUlkO1xuICAgICAgICByZXRWYWx1ZS5mb3VuZEluV29ya1R5cGVTeXN0ZW1OYW1lID0gdHlwZVN5c3RlbU5hbWU7XG4gICAgfVxuICAgIHJldFZhbHVlLnBhcmVudElkID0gcGFyZW50SWQ7XG5cbiAgICByZXR1cm4gcmV0VmFsdWU7XG4gICAgXG59IiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XG5pbXBvcnQge1xuICAgIElTaGFyZWRvQmxhZGVNb2RlbCxcbiAgICBUU2hhcmVEb0JsYWRlLFxuICAgIElDb25maWd1cmF0aW9uSG9zdCxcbn0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvU2hhcmVkb0FzcGVjdE1vZGVsc1wiO1xuaW1wb3J0IHsgSURlYnVnIH0gZnJvbSBcIi4vSURlYnVnXCI7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSBcInV1aWRcIjtcbmltcG9ydCB7IFRTaGFyZWRvIH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvVFNoYXJlZG9cIjtcbmltcG9ydCB7XG4gICAgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZyxcbiAgICBJRXJyb3JUcmFwLFxuICAgIElTaGFyZWRvUGFuZWxDb25maWcsXG4gICAgSVN1cHBvcnRCdXR0b24sXG4gICAgSVdpZGdldEpzb24sXG4gICAgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb24sXG4gICAgVFVzZXJFcnJvcnMsXG59IGZyb20gXCIuL0ludGVyZmFjZXNcIjtcbmltcG9ydCB7IFNoYXJlRG9FdmVudCwgZmlyZUV2ZW50IH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9FdmVudHNIZWxwZXJcIjtcbmltcG9ydCB7IGNsZWFyU2VjLCBlcnIsIGluZiwgbCwgbGgxLCBudiwgd3JuIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Mb2dcIjtcbmltcG9ydCB7IElGb3JtQnVpbGRlckRhdGEgfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9Bc3BlY3QvSUZvcm1CdWlsZGVyXCI7XG5pbXBvcnQgeyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0LCB0b09ic2VydmFibGVPYmplY3QgfSBmcm9tIFwiLi9LT0NvbnZlcnRlclwiO1xuaW1wb3J0IHtcbiAgICBnZXROZXN0ZWRQcm9wZXJ0eSxcbiAgICBndmtvLFxuICAgIHNldE5lc3RlZFByb3BlcnR5LFxuICAgIHN0clRvQ2xhc3MsXG59IGZyb20gXCIuLi8uLi9Db21tb24vT2JqZWN0SGVscGVyXCI7XG5pbXBvcnQgeyBlc2NhcGVIdG1sIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9IdG1sSGVscGVyXCI7XG5pbXBvcnQgeyBKc29uVG9IdG1sQ29udmVydGVyIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Kc29uVG9IVE1MQ29udmVydGVyXCI7XG5pbXBvcnQgeyBzZWFyY2hGb3JBdHRyaWJ1dGVSZWN1cnNpdmUgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9zZWFyY2hGb3JBdHRyaWJ1dGVXaXRoUGFyZW50c1wiO1xuaW1wb3J0IHtcbiAgICBERUJVR19ERUZBVUxULFxuICAgIERFRkFVTFRfQ09ORklHVVJBVElPTl9TRVRUSU5HUyxcbn0gZnJvbSBcIi4vRGVmYXVsdFNldHRpbmdzXCI7XG5pbXBvcnQgeyBkZWJvdW5jZUZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9EZWJvdW5kXCI7XG5pbXBvcnQgeyBleGVjdXRlRmluZEJ5UXVlcnkgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9leGVjdXRlRmluZEJ5UXVlcnkvRmluZEJ5UXVlcnlcIjtcbmltcG9ydCB7XG4gICAgSUdyYXBoUXVlcnksXG4gICAgSUdyYXBoUXVlcnlEZmF1bHRzIGFzIElHcmFwaFF1ZXJ5RGVmYXVsdHMsXG4gICAgSUdyYXBoUXVlcnlGaWVsZCxcbn0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvYXBpL2dyYXBoL0lHcmFwaFF1ZXJ5XCI7XG5pbXBvcnQgeyBJRmluZEJ5UXVlcnlPcHRpb25zIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9hcGkvZXhlY3V0ZUZpbmRCeVF1ZXJ5L0lGaW5kQnlRdWVyeUlucHV0XCI7XG5pbXBvcnQgeyBleGVjdXRlRmluZEJ5R3JhcGggfSBmcm9tIFwiLi4vLi4vQ29tbW9uL2FwaS9leGVjdXRlRmluZEJ5R3JhcGgvZXhlY3V0ZUZpbmRCeUdyYXBoXCI7XG5pbXBvcnQgeyBldmFsdXRlUnVsZSwgZXhlY3V0ZUVtYmVkZGVkQ29kZSB9IGZyb20gXCIuLi8uLi8uLi9oZWxwZXJzL2V2YWx1dGVSdWxlXCI7XG5pbXBvcnQgeyBkZXRlY3QgfSBmcm9tIFwiZGV0ZWN0LWJyb3dzZXJcIjtcbmltcG9ydCB7IFRlbXBsYXRlQXBwbGljYXRvciB9IGZyb20gXCIuL1RlbXBsYXRlL1RlbXBsYXRlQXBwbGljYXRvclwiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCB7IERhdGFDb250ZXh0IH0gZnJvbSBcIi4uLy4uL0Zvcm1pby9Db21tb24vU2V0RGF0YUNvbnRleHRcIjtcblxuY29uc29sZS5sb2coXCJ2OiAtIDMuMjlcIik7XG5cbmV4cG9ydCBjb25zdCBGT01SX0JVSUxERVJfUEFUSF9TVFJJTkcgPSBcImFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGFcIjtcbmV4cG9ydCBjb25zdCBFUlJPUl9ESVZfU0VMRUNUT1IgPSBcIiNyZW5kZXItZXJyb3JzLWhlcmVcIjtcblxuaW50ZXJmYWNlIElERUFzcGVjdENvbmZpZ3VyYXRpb24ge1xuICAgIG1vZGVsOiBJU2hhcmVkb0JsYWRlTW9kZWw7XG4gICAgYmxhZGU6IFRTaGFyZURvQmxhZGU7XG59XG5cbnR5cGUgT2JzZXJ2YWJsZWlmeTxUPiA9IHtcbiAgICBbUCBpbiBrZXlvZiBUXToga28uT2JzZXJ2YWJsZTxUW1BdPjtcbn07XG5cbmV4cG9ydCB0eXBlIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczI8VENvbmZpZz4gPSB7XG4gICAgW0sgaW4ga2V5b2YgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+XToga28uT2JzZXJ2YWJsZTxcbiAgICAgICAgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+W0tdXG4gICAgPjtcbn07XG5cbmV4cG9ydCB0eXBlIE9ic2VydmFibGVTaGFyZWRvQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPVxuICAgIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz4+O1xuXG5leHBvcnQgdHlwZSBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFxuICAgIElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8VENvbmZpZz5cbj47XG5cbi8vIGV4cG9ydCB0eXBlIElPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSAge2RlYnVnOiBrby5PYnNlcnZhYmxlPE9ic2VydmFibGVJRGVidWc+fSAmXG4vLyB7XG4vLyAgICAgW0sgaW4ga2V5b2YgVENvbmZpZ106IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VENvbmZpZz5bS107XG5cbi8vIH1cblxuZXhwb3J0IHR5cGUgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+ID0gSUNvbmZpZ3VyYXRpb25Ib3N0ICZcbiAgICBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbi8vIGFic3RyYWN0IGNsYXNzIENyZWF0b3I8VENvbmZpZz4ge1xuLy8gICAgIHB1YmxpYyBhYnN0cmFjdCBGYWN0b3J5TWV0aG9kKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4sIGJhc2VNb2RlbDogYW55KTogYW55O1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybUJ1aWxkZXJGaWVsZFBhdGgoZm9ybUJ1aWxkZXJGaWVsZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGAke0ZPTVJfQlVJTERFUl9QQVRIX1NUUklOR30uJHtmb3JtQnVpbGRlckZpZWxkfWA7XG59XG5cbnR5cGUgT2JzZXJ2YWJsZVBlcnNvbjxUQ29uZmlnPiA9IE9ic2VydmFibGVpZnk8XG4gICAgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+XG4+O1xuXG5pbnRlcmZhY2UgSU1vZGVsIHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlSURFQXNwZWN0PFRDb25maWcsIFRQZXJzaXRhbmNlPiB7XG4gICAgX2RhdGE6IGFueTsgLy9ub24gbW9kZWwgZGF0YSBzdG9yYWdlXG4gICAgb3JpZ2luYWxDb25maWd1cmF0aW9uITogSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz47XG4gICAgY29uZmlndXJhdGlvbjpcbiAgICAgICAgfCBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPFRDb25maWc+XG4gICAgICAgIHwgdW5kZWZpbmVkO1xuICAgIHNoYXJlZG9Db25maWd1cmF0aW9uITogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgIGRlZmF1bHRzOiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPFRDb25maWc+IHwgdW5kZWZpbmVkO1xuICAgIGVsZW1lbnQhOiBIVE1MRWxlbWVudDtcbiAgICBtb2RlbDogSU1vZGVsIHwgdW5kZWZpbmVkO1xuICAgIC8vIGVuYWJsZWQhOiBib29sZWFuO1xuICAgIGJsYWRlOiBUU2hhcmVEb0JsYWRlIHwgdW5kZWZpbmVkO1xuICAgIGxvYWRlZCE6IGtvLk9ic2VydmFibGU8Ym9vbGVhbj47XG4gICAgc2hhcmVkb0lkIToga28uT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuICAgIHBhcmVudFNoYXJlZG9JZCE6IGtvLk9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPjtcbiAgICBzaGFyZWRvVHlwZVN5c3RlbU5hbWUhOiBrby5PYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gICAgcGhhc2VOYW1lIToga28uT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuICAgIHBoYXNlSXNPcGVuIToga28uT2JzZXJ2YWJsZTxib29sZWFuIHwgdW5kZWZpbmVkPjtcbiAgICB2YWxpZGF0aW9uOiBhbnk7XG4gICAgdmFsaWRhdGlvbkVycm9yQ291bnQhOiBrby5PYnNlcnZhYmxlPG51bWJlcj47XG4gICAgYmFzZU1vZGVsITogVFNoYXJlZG88YW55PjtcbiAgICB0aGlzQ29tcG9uZW50TmFtZSE6IHN0cmluZztcbiAgICBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGE6IHN0cmluZyB8IHVuZGVmaW5lZDsgLy9UaGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tXG4gICAgc2hhcmVEb09wdGlvbnMhOiBPYnNlcnZhYmxlU2hhcmVkb0NvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+O1xuICAgIF9zaGFyZURvT3B0aW9ucyE6IE9ic2VydmFibGVTaGFyZWRvQ29uZmlndXJhdGlvbk9wdGlvbnM8dW5rbm93bj47IC8vdXNlIGZvciB0eXBpbmdzIG9mIHRoaXMgYmFzZSBpZGUgYXMgVENvbmZpZyBjYXVzZWQgaXNzdWVcbiAgICBvcHRpb25zOlxuICAgICAgICB8IE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxcbiAgICAgICAgICAgIElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8VENvbmZpZz5cbiAgICAgICAgPlxuICAgICAgICB8IHVuZGVmaW5lZDtcbiAgICBfb3B0aW9uczpcbiAgICAgICAgfCBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8XG4gICAgICAgICAgICBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPHVua25vd24+XG4gICAgICAgID5cbiAgICAgICAgfCB1bmRlZmluZWQ7XG4gICAgdW5pcXVlSWQhOiBzdHJpbmc7XG4gICAgd2lkZ2V0U2V0dGluZ3MhOiBJV2lkZ2V0SnNvbjxUQ29uZmlnPjtcbiAgICBhc3BlY3RMb2dPdXRwdXQ6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgIGxpdmVDb25maWdEaXY6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgIGxpdmVDb25maWdEYXRhOiBhbnk7XG4gICAgZXJyb3JEaXZTZWxlY3Rvcjogc3RyaW5nO1xuICAgIGVycm9yczoga28uT2JzZXJ2YWJsZUFycmF5PFRVc2VyRXJyb3JzPiB8IHVuZGVmaW5lZDtcbiAgICByZWZyZXNoTG9nOiBBcnJheTxhbnk+O1xuICAgIGxhc3RSZWZyZXNoOiBEYXRlIHwgdW5kZWZpbmVkO1xuICAgIGRpc3Bvc2FibGVzOiBBcnJheTxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQmFzZSBDb25zdHJ1Y3RvciBmb3IgYWxsIElERUFzcGVjdHMsIGZvcmNlcyB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhlIGxvYWQgYW5kIHNhdmUgbWV0aG9kc1xuICAgICAqIEBwYXJhbSBjb21wb25lbnROYW1lIC8vVGhlIG5hbWUgb2YgdGhlIGNvbXBvbmVudCBlLmcuIEFzcGVjdC5RdWlja1ZpZXdcbiAgICAgKiBAcGFyYW0gbG9hZFNhdmVMb2NhdGlvbiAvL1RoZSBsb2NhdGlvbiB0byBsb2FkIGFuZCBzYXZlIHRoZSBkYXRhIGZyb20gZS5nLiBtb2RlbC5hc3BlY3QuRm9ybUJ1aWxkZXIuZm9ybURhdGFcbiAgICAgKiBAcGFyYW0gZWxlbWVudCAvL1RoZSBlbGVtZW50IHRoYXQgdGhlIGFzcGVjdCBpcyBib3VuZCB0b1xuICAgICAqIEBwYXJhbSBjb25maWd1cmF0aW9uIC8vVGhlIGNvbmZpZ3VyYXRpb24gcGFzc2VkIGluIGZyb20gdGhlIGJsYWRlIGFuZCB0aGUgZGVzaWduIHRpbWUgY29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSBiYXNlTW9kZWwgLy9UaGUgYmFzZSBtb2RlbCBwYXNzZWQgaW4gZnJvbSB0aGUgYmxhZGVcbiAgICAgKiBAcGFyYW0gZGVmYXVsdHMgLy9UaGUgZGVmYXVsdHMgcGFzc2VkIGluIGZyb20gdGhlIHdpZGdldCB0byBzZXQgaW5jYXNlIG9mIGJhZCBjb25maWd1cmF0aW9uIG9yIG1pc3NpbmcgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCk7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICBjb25maWd1cmF0aW9uOiBUQ29uZmlnLFxuICAgICAgICBiYXNlTW9kZWw6IFRTaGFyZWRvPGFueT5cbiAgICApO1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvciguLi5hcnI6IGFueVtdKSB7XG4gICAgICAgIHRoaXMud2lkZ2V0U2V0dGluZ3MgPSB0aGlzLnNldFdpZGdldEpzb25TZXR0aW5ncygpO1xuICAgICAgICB0aGlzLnRoaXNDb21wb25lbnROYW1lID0gdGhpcy5zZXRUaGlzQ29tcG9uZW50TmFtZSgpO1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0gdGhpcy5zZXREZWZhdWx0cygpOyAvL3NldHVwIHRoZSBkZWZhdWx0IGJ5IGNhbGxpbmcgdGhlIGFic3RyYWN0IG1ldGhvZCBpbiB0aGUgY2hpbGQgY2xhc3NcbiAgICAgICAgdGhpcy5kaXNwb3NhYmxlcyA9IFtdO1xuICAgICAgICB0aGlzLnJlZnJlc2hMb2cgPSBuZXcgQXJyYXk8YW55PigpO1xuXG4gICAgICAgIHRoaXMuZXJyb3JEaXZTZWxlY3RvciA9IEVSUk9SX0RJVl9TRUxFQ1RPUjtcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBrby5vYnNlcnZhYmxlQXJyYXk8VFVzZXJFcnJvcnM+KCk7XG5cbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgYmFzZSBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIC8vVGhpcyBpcyB0aGUgY29uc3RydWN0b3IgdGhhdCBpcyBjYWxsZWQgYnkgdGhlIElERVxuICAgICAgICAgICAgdGhpcy51bmlxdWVJZCA9IHV1aWQoKTtcblxuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGlzZShhcnJbMF0sIGFyclsxXSwgYXJyWzJdKTtcbiAgICAgICAgICAgIC8vIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gdGhpcy5zZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25TZXR1cFwiLCB0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUV2ZW50KFwiYWZ0ZXJTZXR1cFwiLCB0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBMaXZlQ29uZmlnKCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwRXZlbnRXYXRjaGVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldHVwRXJyb3JNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLmFkZEFzcGVjdExvZ091dHB1dCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2luaXRpYWxpc2UoXG4gICAgICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICBwb2x1dGVkQ29uZmlndXJhdGlvbjogSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz4sXG4gICAgICAgIGJhc2VNb2RlbDogVFNoYXJlZG88YW55PlxuICAgICkge1xuICAgICAgICAvL2xldCBjb25maWd1cmF0aW9uID0gcG9sdXRlZENvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbjsgLy9Qb2x1dGVkIGFzIFNoYXJlZG8gYWRkZWQgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiB0byB0aHNpIG9iamVjdCBkZXBlbmRpbmcgb24gd2hlcmUgaXRzIGluc3RhbnNpYXRlZFxuICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uID0gcG9sdXRlZENvbmZpZ3VyYXRpb247XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIC8vU2hhcmVEbyBwYXNzZXMgdGhlIGNvbmZpZyBhcyB3ZWxsIGFzIG90aGVyIHN0dWZmLCBzbyB3ZSBuZWVkIHRvIGV4dHJhY3QgdGhlIGNvbmZpZ1xuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbiA9IHBvbHV0ZWRDb25maWd1cmF0aW9uO1xuICAgICAgICB0aGlzLmJhc2VNb2RlbCA9IGJhc2VNb2RlbDtcblxuICAgICAgICAvLyB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvblxuXG4gICAgICAgIC8vIGxldCBiYXNlRGVmYXVsdHM6IElEZWZhdWx0Q29uZmlnU2V0dGluZ3M8YW55PiA9IHtcbiAgICAgICAgLy8gICAgIGRlYnVnOiB7XG4gICAgICAgIC8vICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIC8vICAgICAgICAgbG9nVG9Db25zb2xlOiBmYWxzZSxcbiAgICAgICAgLy8gICAgICAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlLFxuICAgICAgICAvLyAgICAgICAgIGxpdmVDb25maWc6IGZhbHNlXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvL2NoZWNrIHRoYXQgd2UgaGF2ZSBhIHN1YiBjb25maWd1cmF0aW9uXG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgIFwiTm8gY29uZmlndXJhdGlvbiBmb3VuZCBpbiB0aGUgc2hhcmVkb0NvbmZpZ3VyYXRpb24gLSBjaGVjayB0aGUgYXNwZWN0IG9yIHdpZGdldCBjb25maWcgdGhhdCB0aGVyIGVpcyBhIGJhc2UgY29uZmlndXJhdGlvbiBvZiBjb25maWd1cmF0aW9uOnt9XCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb25maWd1cmF0aW9uIGZvdW5kIGluIHRoZSBzaGFyZWRvQ29uZmlndXJhdGlvblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbiA9ICQuZXh0ZW5kKFxuICAgICAgICAgICAgREVGQVVMVF9DT05GSUdVUkFUSU9OX1NFVFRJTkdTLFxuICAgICAgICAgICAgdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9uXG4gICAgICAgICk7IC8vbWFrZSBzdXJlIGRlYnVnIGlzIHNldCBvciB1c2UgZGVmYXVsdHNcbiAgICAgICAgLy8gdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24uZGVidWcgPSAkLmV4dGVuZChiYXNlRGVmYXVsdHMuZGVidWcsIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uLmRlYnVnKSBhcyBJRGVidWc7XG4gICAgICAgIC8vIGNvbmZpZ3VyYXRpb24uZGVidWcgPSAkLmV4dGVuZChiYXNlRGVmYXVsdHMsIGNvbmZpZ3VyYXRpb24uZGVidWcpIGFzIElEZWJ1ZztcblxuICAgICAgICAvLyB0aGlzLmRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIE1lcmdlIHRoZSBjb25maWd1cmF0aW9uIHdpdGggdGhlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbiA9ICQuZXh0ZW5kKFxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0cyxcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25cbiAgICAgICAgKTtcblxuICAgICAgICAvL2NyZWF0ZSBhIG5ldyBtb2RlbFxuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWw7XG4gICAgICAgIC8vIHRoaXMuZW5hYmxlZCA9IHRoaXMubW9kZWw/LmNhbkVkaXQ7XG4gICAgICAgIHRoaXMuYmxhZGUgPSB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5ibGFkZTtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0aGlzLmxvYWRlZCB8fCBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgLy8gTWFwIHRoZSBiYXNlIG1vZGVsIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5zaGFyZWRvSWQgPVxuICAgICAgICAgICAgdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWwuaWQgfHxcbiAgICAgICAgICAgICR1aS5wYWdlQ29udGV4dD8uc2hhcmVkb0lkIHx8XG4gICAgICAgICAgICBrby5vYnNlcnZhYmxlKHVuZGVmaW5lZCk7XG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvSWQgfHwgdGhpcy5zaGFyZWRvSWQoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBzaGFyZWRvSWQgZm91bmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSA9XG4gICAgICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbD8uc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIHx8XG4gICAgICAgICAgICAkdWkucGFnZUNvbnRleHQ/LnNoYXJlZG9UeXBlTmFtZSB8fFxuICAgICAgICAgICAga28ub2JzZXJ2YWJsZSh1bmRlZmluZWQpO1xuICAgICAgICBpZiAoIXRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lIHx8ICF0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9UeXBlU3lzdGVtTmFtZSBmb3VuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGFyZW50U2hhcmVkb0lkID1cbiAgICAgICAgICAgIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsPy5wYXJlbnRTaGFyZWRvSWQgfHxcbiAgICAgICAgICAgIGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5waGFzZU5hbWUgPVxuICAgICAgICAgICAgdGhpcy5zaGFyZWRvQ29uZmlndXJhdGlvbi5faG9zdD8ubW9kZWw/LnBoYXNlTmFtZSB8fFxuICAgICAgICAgICAgJHVpLnBhZ2VDb250ZXh0Py5waGFzZU5hbWUgfHxcbiAgICAgICAgICAgIGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5waGFzZUlzT3BlbiA9XG4gICAgICAgICAgICB0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbD8ucGhhc2VJc09wZW4gfHxcbiAgICAgICAgICAgICR1aS5wYWdlQ29udGV4dD8ucGhhc2VJc09wZW4gfHxcbiAgICAgICAgICAgIGtvLm9ic2VydmFibGUodW5kZWZpbmVkKTtcbiAgICAgICAgLy8gdGhpcy5zaGFyZURvT3B0aW9ucyA9IHRvT2JzZXJ2YWJsZU9iamVjdCh0aGlzLnNoYXJlZG9Db25maWd1cmF0aW9uLCB0aGlzLnNoYXJlRG9PcHRpb25zKTtcbiAgICAgICAgLy8gdGhpcy5fc2hhcmVEb09wdGlvbnMgPSB0aGlzLnNoYXJlRG9PcHRpb25zIGFzIE9ic2VydmFibGVTaGFyZWRvQ29uZmlndXJhdGlvbk9wdGlvbnM8dW5rbm93bj5cblxuICAgICAgICAvLyBWYWxpZGF0aW9uXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHt9O1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvckNvdW50ID0gdGhpcy52YWxpZGF0aW9uRXJyb3JDb3VudCB8fCBrby5vYnNlcnZhYmxlKDApO1xuXG4gICAgICAgIHRoaXMuYXBwbHlDb21wb25lbnRDb25maWd1cmF0aW9uKHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbik7XG4gICAgICAgIC8vc2V0dXAgdGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbSBieSBjYWxsaW5nIHRoZSBhYnN0cmFjdCBtZXRob2QgaW4gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIC8vISAtLT4gTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhIDwtLSAtIHRoaXMgc2hvdWxkIGJlIGNhbGxlZCBhdCB0aGUgZW5kIG9mIHRoaXMgZnVuY3Rpb24gdG8gZW5zdXJlIHRoYXQgdGhlIG9wdGlvbnMgYW5kIGNvbmZpZ3VyYXRpb24gZGF0YSBpcyBhdmFpbGFiZWwgdG8gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gdGhpcy5zZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoXCJvbkluaXRpYWxpc2VcIiwgdGhpcy5tb2RlbCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseUNvbXBvbmVudENvbmZpZ3VyYXRpb24oXG4gICAgICAgIGNvbmZpZ3VyYXRpb246IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8VENvbmZpZz5cbiAgICApIHtcbiAgICAgICAgbGV0IGNvbmZpZ3VyYXRpb25Bc09ic2VydmFibGVzID0gdG9PYnNlcnZhYmxlT2JqZWN0KFxuICAgICAgICAgICAgY29uZmlndXJhdGlvbixcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGNvbmZpZ3VyYXRpb25Bc09ic2VydmFibGVzO1xuICAgICAgICAvLyAhIE5vdGUgbGluZSBiZWxvdyBpcyBmb3IgdHlwaW5nIHdpdGhpbiB0aGUgSURFQmFzZSwgdGhlIGxpbmUgYWJvdmUgaXMgZm9yIHR5cGluZyB3aXRoaW4gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPVxuICAgICAgICAgICAgY29uZmlndXJhdGlvbkFzT2JzZXJ2YWJsZXMgYXMgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFxuICAgICAgICAgICAgICAgIElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8dW5rbm93bj5cbiAgICAgICAgICAgID47XG4gICAgfVxuXG4gICAgY2xlYXJFcnJvcnMoKSB7XG4gICAgICAgIHRoaXMuZXJyb3JzPy5yZW1vdmVBbGwoKTtcbiAgICB9XG5cbiAgICBzZXR1cEVycm9yTWFuYWdlcigpIHtcbiAgICAgICAgdGhpcy5sKFwiU2V0dGluZyB1cCBlcnJvciBtYW5hZ2VyXCIpO1xuICAgICAgICB0aGlzLmVycm9ycz8uc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbmYoXCJFcnJvcnMgY2hhbmdlZFwiLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkRXJyb3JEaXYoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0dXBMaXZlQ29uZmlnKCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zPy5kZWJ1Zy5zdWJzY3JpYmUoKG5ld1ZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZS5saXZlQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUxpdmVDb25maWcobmV3VmFsdWUubGl2ZUNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWN0aXZhdGVMaXZlQ29uZmlnKHRoaXMuX29wdGlvbnM/LmRlYnVnKCkubGl2ZUNvbmZpZygpKTsgLy9UT0RPIGZpeCB0eXBpbmdzXG4gICAgfVxuXG4gICAgYWN0aXZhdGVMaXZlQ29uZmlnKGFjdGl2ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5saXZlQ29uZmlnRGl2Py5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxpdmVDb25maWdEaXYpIHtcbiAgICAgICAgICAgIC8vbGVhdmUgYWxvbmUgaWYgYWxyZWFkeSBhY3RpdmVcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubChcIlNldHRpbmcgdXAgbGl2ZSBjb25maWdcIik7XG5cbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZERhdGEgPSBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkb0NvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IFwiX2hvc3RcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgNFxuICAgICAgICApO1xuXG4gICAgICAgIC8vY2xvbmUgdGhlIGNvbmZpZ1xuICAgICAgICBsZXQgY29uZmlnID0ga28ub2JzZXJ2YWJsZShzZXJpYWxpemVkRGF0YSk7XG5cbiAgICAgICAgdGhpcy5saXZlQ29uZmlnRGF0YSA9IHtcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCB0aW1lb3V0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5saXZlQ29uZmlnRGl2ID0gdGhpcy5jcmVhdGVMaXZlQ29uZmlnRGl2KCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LnByZXBlbmQodGhpcy5saXZlQ29uZmlnRGl2KTtcbiAgICAgICAgbGV0IGFwcGx5Q2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcHBseUNvbXBvbmVudENvbmZpZ3VyYXRpb24oSlNPTi5wYXJzZShjb25maWcoKSkuY29uZmlndXJhdGlvbik7XG4gICAgICAgICAgICB0aGlzLmxpdmVDb25maWd1cmF0aW9uUmVmcmVzaGVkKCk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkRXJyb3JEaXYoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbmZpZy5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVib3VuY2VkQXBwbHlDaGFuZ2UgPSBkZWJvdW5jZUZ1bmN0aW9uKGFwcGx5Q2hhbmdlLCAzMDAwKTtcbiAgICAgICAgICAgICAgICBkZWJvdW5jZWRBcHBseUNoYW5nZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJUaGUgbmV3IHZhbHVlIGlzIFwiICsgbmV3VmFsdWUpXG5cbiAgICAgICAgICAgICAgICAvLyBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICB0aW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBuZXdDb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZygpKVxuXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuYXBwbHlDb21wb25lbnRDb25maWd1cmF0aW9uKG5ld0NvbmZpZy5jb25maWd1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5saXZlQ29uZmlndXJhdGlvblJlZnJlc2hlZCgpO1xuICAgICAgICAgICAgICAgIC8vICAgICAvLyB0aGlzLnJlZnJlc2gobmV3Q29uZmlnKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgLy8gdGhpcy5yZXNldChuZXdDb25maWcpO1xuICAgICAgICAgICAgICAgIC8vIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgLy8gdGltZW91dCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMzAwMCk7XG5cbiAgICAgICAgLy8ga28uYXBwbHlCaW5kaW5ncyh0aGlzLmxpdmVDb25maWdEYXRhLCB0aGlzLmxpdmVDb25maWdEaXYpO3hcblxuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgZW5zdXJlU3R5bGVzTG9hZGVkKGhyZWY6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxpbmtbaHJlZj1cIiR7aHJlZn1cIl1gKSkge1xuICAgICAgICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuICAgICAgICAgICAgbGluay5ocmVmID0gaHJlZjtcbiAgICAgICAgICAgIGxpbmsucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gICAgICAgICAgICBsaW5rLnR5cGUgPSBcInRleHQvY3NzXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlTGl2ZUNvbmZpZ0RpdigpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgb3V0ZXIgPGRpdj4gd2l0aCBjbGFzcyBcImNvbC1zbS0xMiBmb3JtYnVpbGRlci1lZGl0b3ItanNvblwiXG4gICAgICAgIGNvbnN0IG91dGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgb3V0ZXJEaXYuY2xhc3NOYW1lID0gXCJjb2wtc20tMTIgZm9ybWJ1aWxkZXItZWRpdG9yLWpzb25cIjtcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGlubmVyIDxkaXY+IHdpdGggdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGVzXG4gICAgICAgIGNvbnN0IGlubmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW5uZXJEaXYuaWQgPSBcImxpdmVDb25maWdcIjtcbiAgICAgICAgaW5uZXJEaXYuY2xhc3NOYW1lID0gXCJmb3JtLWNvbnRyb2wgdGV4dGFyZWFcIjtcbiAgICAgICAgaW5uZXJEaXYuc3R5bGUuaGVpZ2h0ID0gXCIzMDBweFwiO1xuICAgICAgICAvLyBpbm5lckRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcsICdzeW50YXhFZGl0b3I6IGxpdmVDb25maWdEYXRhLmNvbmZpZywgZW5hYmxlOiB0cnVlLCBldmVudDogeyBmb2N1c291dDogbGl2ZUNvbmZpZ0RhdGEub25Gb2N1c091dCB9Jyk7XG4gICAgICAgIGlubmVyRGl2LnNldEF0dHJpYnV0ZShcImRhdGEtYmluZFwiLCBcInN5bnRheEVkaXRvcjogbGl2ZUNvbmZpZ0RhdGEuY29uZmlnXCIpO1xuICAgICAgICAvLyBpbm5lckRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcsICdzeW50YXhFZGl0b3I6IG1vZGVsLmNvbmZpZycpO1xuICAgICAgICAvLyBBcHBlbmQgdGhlIGlubmVyRGl2IHRvIHRoZSBvdXRlckRpdlxuICAgICAgICBvdXRlckRpdi5hcHBlbmRDaGlsZChpbm5lckRpdik7XG5cbiAgICAgICAgcmV0dXJuIG91dGVyRGl2O1xuICAgIH1cblxuICAgIHNldHVwRXZlbnRXYXRjaGVyKCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zPy5ldmVudHNUb1JlYWN0VG8oKT8uZm9yRWFjaCgoZXZlbnRUb1dhdGNoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1YnNjcmliaW5nIHRvIGV2ZW50XCIsIGV2ZW50VG9XYXRjaCk7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgJHVpLmV2ZW50cy5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VG9XYXRjaC5ldmVudFBhdGgoKSxcbiAgICAgICAgICAgICAgICAgICAgKGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29tcG9uZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VG9XYXRjaC5ldmVudFBhdGgoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFRvV2F0Y2gubWV0aG9kVG9DYWxsKClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcmVmcmVzaE9uID0ga28udG9KUyh0aGlzLl9vcHRpb25zPy5yZWZyZXNoT24oKSk7XG4gICAgICAgIGlmIChyZWZyZXNoT24pIHtcbiAgICAgICAgICAgIGlmIChyZWZyZXNoT24uc2hhcmVkb0lkQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRvSWQuc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29tcG9uZW50KFwic2hhcmVkb0lkQ2hhbmdlZFwiLCBcInJlZnJlc2hcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlZnJlc2hPbi5zaGFyZWRvUGFyZW50SWRDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudFNoYXJlZG9JZC5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb21wb25lbnQoXCJzaGFyZWRvUGFyZW50SWRDaGFuZ2VkXCIsIFwicmVmcmVzaFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVmcmVzaE9uLnNoYXJlZG9QaGFzZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGhhc2VOYW1lLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbXBvbmVudChcInNoYXJlZG9QaGFzZUNoYW5nZWRcIiwgXCJyZWZyZXNoXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoQ29tcG9uZW50KFxuICAgICAgICBldmVudFBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICAgICAgbWV0aG9kVG9DYWxsOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoTG9nID0gdGhpcy5yZWZyZXNoTG9nIHx8IFtdO1xuICAgICAgICBpZiAodGhpcy5sYXN0UmVmcmVzaCkge1xuICAgICAgICAgICAgLy9UT0RPOiBjaGFuZ2UgdGhpcyBzbyB3ZSBjb2xsZWN0IGFsbCByZWZyZXNoZXMgYW5kIGRvIHRoZW0gaW4gb25lIGdvXG4gICAgICAgICAgICBsZXQgc2Vjb25kc1NpbmNlTGFzdFJlZnJlc2ggPVxuICAgICAgICAgICAgICAgIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMubGFzdFJlZnJlc2guZ2V0VGltZSgpKSAvIDEwMDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2Vjb25kcyBzaW5jZSBsYXN0IHJlZnJlc2hcIiwgc2Vjb25kc1NpbmNlTGFzdFJlZnJlc2gpO1xuICAgICAgICAgICAgaWYgKHNlY29uZHNTaW5jZUxhc3RSZWZyZXNoIDwgMTApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNraXBwaW5nIHJlZnJlc2gsIHRvbyBzb29uXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFzdFJlZnJlc2ggPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZnJlc2hpbmcgY29tcG9uZW50XCIpO1xuICAgICAgICBsZXQgbG9nSXRlbSA9IHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogZXZlbnRQYXRoLFxuICAgICAgICAgICAgbWV0aG9kVG9DYWxsOiBtZXRob2RUb0NhbGwsXG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobWV0aG9kVG9DYWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gbGV0IHBhcmFtcyA9IHdpZGdldHMucGFyYW1ldGVycztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV4ZWN1dGluZyBtZXRob2RcIiwgbWV0aG9kVG9DYWxsKTtcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50VG9SZWZyZXNoID0gdGhpcyBhcyBhbnk7XG4gICAgICAgICAgICAgICAgaWYgKCFjb21wb25lbnRUb1JlZnJlc2hbbWV0aG9kVG9DYWxsXSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgICAgIGBNZXRob2Qgbm90IGZvdW5kIG9uIGNvbXBvbmVudCAke3RoaXMudGhpc0NvbXBvbmVudE5hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZFRvQ2FsbFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFRvUmVmcmVzaFttZXRob2RUb0NhbGxdKCk7IC8vdG9kbzogcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBsb2dJdGVtLnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoTG9nLnB1c2gobG9nSXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBidWlsZEVycm9yRGl2KCkge1xuICAgICAgICB0aGlzLmluZihcIkJ1aWxkaW5nIGVycm9yIGRpdlwiKTtcbiAgICAgICAgbGV0IGVycm9yRGl2ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lcnJvckRpdlNlbGVjdG9yKTtcbiAgICAgICAgaWYgKCFlcnJvckRpdikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbChcImVycm9yRGl2LmlubmVySFRNTFwiKTtcbiAgICAgICAgZXJyb3JEaXYuaW5uZXJIVE1MID0gXCJcIjsgLy9jbGVhbiBvdXQgdGhlIGRpdlxuXG4gICAgICAgIGlmICghdGhpcy5lcnJvcnMpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzID0ga28ub2JzZXJ2YWJsZUFycmF5PFRVc2VyRXJyb3JzPigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVycm9ycygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVycm9yQ29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZXJyb3JEaXYuYXBwZW5kQ2hpbGQoZXJyb3JDb250YWluZXJEaXYpO1xuXG4gICAgICAgIGVycm9yQ29udGFpbmVyRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1jb250YWluZXJcIjtcbiAgICAgICAgbGV0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGl0bGVEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLXRpdGxlXCI7XG4gICAgICAgIHRpdGxlRGl2LmlubmVyVGV4dCA9IFwiVGhlcmUgaGFzIGJlZW4gYW4gZXJyb3I6XCI7XG4gICAgICAgIGVycm9yQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRpdGxlRGl2KTtcbiAgICAgICAgbGV0IGZvcmVhY2hEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBlcnJvckNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChmb3JlYWNoRGl2KTtcblxuICAgICAgICAvLyB0aGlzLmVycm9ycygpLmZvckVhY2goKGVycm9yKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5lcnJvcnMoKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGVycm9yID0gdGhpcy5lcnJvcnMoKVtpXTtcbiAgICAgICAgICAgIC8vTG9vayBmb3IgYW55IHRyYXBwaW5nIGFuZCBhZGQgdG8gdGhlIGVycm9yIG9iamVjdFxuICAgICAgICAgICAgdGhpcy5hZGRFcnJvclRyYXBwaW5nKGVycm9yKTtcbiAgICAgICAgICAgIC8vUmVuZGVyIHRoZSBlcnJvciBkaXYgYW5kIGFkZCB0byB0aGUgZm9yZWFjaCBkaXZcbiAgICAgICAgICAgIGZvcmVhY2hEaXYuYXBwZW5kQ2hpbGQodGhpcy5idWlsZEluZGl2aWR1YWxFcnJvcihlcnJvcikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVpbGRJbmRpdmlkdWFsRXJyb3IoZXJyb3I6IFRVc2VyRXJyb3JzKSB7XG4gICAgICAgIGxldCB0ZW1wbGF0ZUFwcGxpY2F0b3IgPSBuZXcgVGVtcGxhdGVBcHBsaWNhdG9yKCk7XG4gICAgICAgIGxldCBkYXRhQ29udGV4dCA9IHRoaXMuZ2V0RGF0YUNvbnRleHQoW3sgb2JqOiBlcnJvciwga2V5OiBcImVycm9yXCIgfV0pO1xuICAgICAgICBsZXQgbGlua2VkVHJhcHBlZEVycm9yID0gZXJyb3IubGlua2VkVHJhcHBlZEVycm9yO1xuXG4gICAgICAgIGxldCBpbmRpdmlkdWFsRXJyb3JEaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgICBpbmRpdmlkdWFsRXJyb3JEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWluZGl2aWR1YWwtZXJyb3JcIjtcbiAgICAgICAgaWYgKGxpbmtlZFRyYXBwZWRFcnJvcikge1xuICAgICAgICAgICAgdGVtcGxhdGVBcHBsaWNhdG9yLmFkZENTUyhcbiAgICAgICAgICAgICAgICBsaW5rZWRUcmFwcGVkRXJyb3IuY2xhc3NSdWxlcyxcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsRXJyb3JEaXYsXG4gICAgICAgICAgICAgICAgXCJkYXRhQ29udGV4dFwiLFxuICAgICAgICAgICAgICAgIGRhdGFDb250ZXh0XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGVtcGxhdGVBcHBsaWNhdG9yLmFkZFN0eWxlKFxuICAgICAgICAgICAgICAgIGxpbmtlZFRyYXBwZWRFcnJvci5zdHlsZVJ1bGVzLFxuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxFcnJvckRpdixcbiAgICAgICAgICAgICAgICBcImRhdGFDb250ZXh0XCIsXG4gICAgICAgICAgICAgICAgZGF0YUNvbnRleHRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdXNlck1lc3NhZ2VEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB1c2VyTWVzc2FnZURpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3ItdXNlci1tZXNzYWdlXCI7XG5cbiAgICAgICAgbGV0IHN1Z2dlc3Rpb25zRGl2OiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IHN1cHBvcnRCdXR0b25EaXY6IEhUTUxEaXZFbGVtZW50IHwgdW5kZWZpbmVkO1xuICAgICAgICBsZXQgYWN0aW9uc0RpdjogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIC8vIGFjdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWFjdGlvbnNcIjtcblxuICAgICAgICBsZXQgaW50ZXJuYWxTdWdnZXN0aW9uc0RpdjogSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIC8vIGludGVybmFsU3VnZ2VzdGlvbnNEaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLWludGVybmFsLXN1Z2dlc3Rpb25zXCI7XG5cbiAgICAgICAgdXNlck1lc3NhZ2VEaXYuaW5uZXJIVE1MID1cbiAgICAgICAgICAgIGxpbmtlZFRyYXBwZWRFcnJvcj8udXNlckZyZWluZGx5TWVzc2FnZSB8fFxuICAgICAgICAgICAgZXJyb3IudXNlck1lc3NhZ2UgfHxcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHxcbiAgICAgICAgICAgIFwiVW5rbm93biBlcnJvclwiO1xuXG4gICAgICAgIGlmIChsaW5rZWRUcmFwcGVkRXJyb3I/LnVzZXJGcmVpbmRseUhUTUxNZXNzYWdlVGVtcGxhdGUpIHtcbiAgICAgICAgICAgIGxldCB1c2VyRnJlaW5kbHlNZXNzYWdlID0gZXhlY3V0ZUVtYmVkZGVkQ29kZShcbiAgICAgICAgICAgICAgICBsaW5rZWRUcmFwcGVkRXJyb3IudXNlckZyZWluZGx5SFRNTE1lc3NhZ2VUZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICBkYXRhQ29udGV4dFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHVzZXJNZXNzYWdlRGl2LmlubmVySFRNTCA9IHVzZXJGcmVpbmRseU1lc3NhZ2U7XG4gICAgICAgICAgICAvL0ZpbmQgc2VjdGlvbiBkaXZzIGluIHRoZSB0ZW1wbGF0ZSBpZiB0aGV5IGV4aXN0XG4gICAgICAgICAgICBzdWdnZXN0aW9uc0RpdiA9XG4gICAgICAgICAgICAgICAgKHVzZXJNZXNzYWdlRGl2LnF1ZXJ5U2VsZWN0b3IoXCIuaWRlLWFzcGVjdC1lcnJvci1zdWdnZXN0aW9uc1wiKSBhc1xuICAgICAgICAgICAgICAgICAgICB8IEhUTUxEaXZFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHwgdW5kZWZpbmVkKSB8fCBzdWdnZXN0aW9uc0RpdjtcbiAgICAgICAgICAgIGFjdGlvbnNEaXYgPVxuICAgICAgICAgICAgICAgICh1c2VyTWVzc2FnZURpdi5xdWVyeVNlbGVjdG9yKFwiLmlkZS1hc3BlY3QtZXJyb3ItYWN0aW9uc1wiKSBhc1xuICAgICAgICAgICAgICAgICAgICB8IEhUTUxEaXZFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHwgdW5kZWZpbmVkKSB8fCBhY3Rpb25zRGl2O1xuICAgICAgICAgICAgaW50ZXJuYWxTdWdnZXN0aW9uc0RpdiA9XG4gICAgICAgICAgICAgICAgKHVzZXJNZXNzYWdlRGl2LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAgIFwiLmlkZS1hc3BlY3QtZXJyb3ItaW50ZXJuYWwtc3VnZ2VzdGlvbnNcIlxuICAgICAgICAgICAgICAgICkgYXMgSFRNTERpdkVsZW1lbnQgfCB1bmRlZmluZWQpIHx8IGludGVybmFsU3VnZ2VzdGlvbnNEaXY7XG4gICAgICAgIH1cblxuICAgICAgICBpbmRpdmlkdWFsRXJyb3JEaXYuYXBwZW5kQ2hpbGQodXNlck1lc3NhZ2VEaXYpO1xuXG4gICAgICAgIC8vIHVzZXJNZXNzYWdlRGl2Lm9uY2xpY2sgPSAoKSA9PiB7XG5cbiAgICAgICAgLy8gICAgIC8vY3JlYXRlIGEgZGl2IHRoYXQgY2FuIHNjb2xsXG4gICAgICAgIC8vICAgICBsZXQgZGV0YWlsZWRNZXNzYWdlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgLy8gICAgIGRldGFpbGVkTWVzc2FnZURpdi5jbGFzc05hbWUgPSBcImlkZS1hc3BlY3QtZXJyb3ItZGV0YWlsZWQtbWVzc2FnZVwiO1xuXG4gICAgICAgIC8vICAgICBjb25zdCBjb2RlID0gZXNjYXBlSHRtbChlcnJvci5jb2RlIHx8IFwiXCIpO1xuICAgICAgICAvLyAgICAgY29uc3QgbWVzc2FnZSA9IGVzY2FwZUh0bWwoZXJyb3IubWVzc2FnZSB8fCBcIlwiKTtcbiAgICAgICAgLy8gICAgIGNvbnN0IHVzZXJNZXNzYWdlID0gZXNjYXBlSHRtbChlcnJvci51c2VyTWVzc2FnZSB8fCBcIlwiKTtcbiAgICAgICAgLy8gICAgIGNvbnN0IGVycm9yU3RhY2sgPSBlc2NhcGVIdG1sKGVycm9yLmVycm9yU3RhY2sgfHwgXCJcIik7XG5cbiAgICAgICAgLy8gICAgIGNvbnN0IGFkZGl0aW9uYWxJbmZvID0gSnNvblRvSHRtbENvbnZlcnRlci5jb252ZXJ0KGVycm9yLmFkZGl0aW9uYWxJbmZvIHx8IHt9KTtcblxuICAgICAgICAvLyAgICAgY29uc3QgaHRtbCA9IGBcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIDxoMj5FcnJvcjogJHtjb2RlfTwvaDI+XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz5NZXNzYWdlOjwvc3Ryb25nPiAke21lc3NhZ2V9PC9wPlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+VXNlciBNZXNzYWdlOjwvc3Ryb25nPiAke3VzZXJNZXNzYWdlfTwvcD5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPlN0YWNrOjwvc3Ryb25nPiAke2Vycm9yU3RhY2t9PC9wPlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+QWRkaXRpb25hbCBJbmZvOjwvc3Ryb25nPiAke2FkZGl0aW9uYWxJbmZvfTwvcD5cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuXG4gICAgICAgIC8vICAgICBkZXRhaWxlZE1lc3NhZ2VEaXYuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgLy8gICAgICR1aS5lcnJvckRpYWxvZyhkZXRhaWxlZE1lc3NhZ2VEaXYpO1xuXG4gICAgICAgIC8vIH1cblxuICAgICAgICAvL2NyZWF0ZSB0aGUgc2VjdGlvbnMgZGl2cyBpZiB0aGV5IGRvbmUgZXhpc3RzIGFuZCBhZGQgdG8gdGhlIGluZGl2aWR1YWwgZXJyb3IgZGl2XG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghc3VnZ2VzdGlvbnNEaXYpIHtcbiAgICAgICAgICAgICAgICBzdWdnZXN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEVycm9yRGl2LmFwcGVuZENoaWxkKHN1Z2dlc3Rpb25zRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFhY3Rpb25zRGl2KSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgaW5kaXZpZHVhbEVycm9yRGl2LmFwcGVuZENoaWxkKGFjdGlvbnNEaXYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWludGVybmFsU3VnZ2VzdGlvbnNEaXYpIHtcbiAgICAgICAgICAgICAgICBpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBpbmRpdmlkdWFsRXJyb3JEaXYuYXBwZW5kQ2hpbGQoaW50ZXJuYWxTdWdnZXN0aW9uc0Rpdik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghc3VwcG9ydEJ1dHRvbkRpdikge1xuICAgICAgICAgICAgICAgIHN1cHBvcnRCdXR0b25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgIGluZGl2aWR1YWxFcnJvckRpdi5hcHBlbmRDaGlsZChzdXBwb3J0QnV0dG9uRGl2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXNvbHV0aW9uU3VnZ2VzdGlvbnMgPVxuICAgICAgICAgICAgbGlua2VkVHJhcHBlZEVycm9yPy5yZXNvbHV0aW9uU3VnZ2VzdGlvbnMgfHxcbiAgICAgICAgICAgIGVycm9yLmludGVybmFsU3VnZ2VzdGlvbnMgfHxcbiAgICAgICAgICAgIFtdO1xuICAgICAgICBpZiAocmVzb2x1dGlvblN1Z2dlc3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zRGl2LmNsYXNzTmFtZSA9IFwiaWRlLWFzcGVjdC1lcnJvci1zdWdnZXN0aW9uc1wiO1xuICAgICAgICAgICAgc3VnZ2VzdGlvbnNEaXYuaW5uZXJIVE1MID0gYDxiPlN1Z2dlc3Rpb25zOjwvYj48YnIvPiR7cmVzb2x1dGlvblN1Z2dlc3Rpb25zLmpvaW4oXG4gICAgICAgICAgICAgICAgXCI8YnIvPlwiXG4gICAgICAgICAgICApfWA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWN0aW9ucyA9IGVycm9yLnNoYXJlZG9FcnJvckFjdGlvbnMgfHwgW107XG4gICAgICAgIGlmIChhY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGFjdGlvbnNEaXYuaW5uZXJIVE1MID0gYDxiPkFjdGlvbnM6PC9iPjxici8+JHthY3Rpb25zLmpvaW4oXCI8YnIvPlwiKX1gO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGludGVybmFsU3VnZ2VzdGlvbnMgPSBlcnJvci5pbnRlcm5hbFN1Z2dlc3Rpb25zIHx8IFtdO1xuICAgICAgICBpZiAoaW50ZXJuYWxTdWdnZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpbnRlcm5hbFN1Z2dlc3Rpb25zRGl2LmlubmVySFRNTCA9IGA8Yj5JbnRlcm5hbCBTdWdnZXN0aW9uczo8L2I+PGJyLz4ke2ludGVybmFsU3VnZ2VzdGlvbnMuam9pbihcbiAgICAgICAgICAgICAgICBcIjxici8+XCJcbiAgICAgICAgICAgICl9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdXBwb3J0QnV0dG9uID1cbiAgICAgICAgICAgIGxpbmtlZFRyYXBwZWRFcnJvcj8uc3VwcG9ydEJ1dHRvbiB8fFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uPy5lcnJvck1hbmFnZW1lbnQ/LnVuVHJhcHBlZEVycm9yc1N1cHBvcnRCdXR0b247XG4gICAgICAgIGlmIChzdXBwb3J0QnV0dG9uICYmIHN1cHBvcnRCdXR0b24uZW5hYmxlZCkge1xuICAgICAgICAgICAgbGV0IGFjdGlvbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBhY3Rpb25EaXYuY2xhc3NOYW1lID0gXCJpZGUtYXNwZWN0LWVycm9yLXN1cHBvcnQtYWN0aW9uXCI7XG4gICAgICAgICAgICBpbmRpdmlkdWFsRXJyb3JEaXYuYXBwZW5kQ2hpbGQoYWN0aW9uRGl2KTtcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9IFwiYnRuIGJ0bi1wcmltYXJ5XCI7XG5cbiAgICAgICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlT3BlblBhbmVsKHN1cHBvcnRCdXR0b24sIGRhdGFDb250ZXh0KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRlbXBsYXRlQXBwbGljYXRvci5hZGRDU1MoXG4gICAgICAgICAgICAgICAgc3VwcG9ydEJ1dHRvbi5jbGFzc1J1bGVzLFxuICAgICAgICAgICAgICAgIGFjdGlvbkRpdixcbiAgICAgICAgICAgICAgICBcImRhdGFDb250ZXh0XCIsXG4gICAgICAgICAgICAgICAgZGF0YUNvbnRleHRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0ZW1wbGF0ZUFwcGxpY2F0b3IuYWRkU3R5bGUoXG4gICAgICAgICAgICAgICAgc3VwcG9ydEJ1dHRvbi5zdHlsZVJ1bGVzLFxuICAgICAgICAgICAgICAgIGFjdGlvbkRpdixcbiAgICAgICAgICAgICAgICBcImRhdGFDb250ZXh0XCIsXG4gICAgICAgICAgICAgICAgZGF0YUNvbnRleHRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGJ1dHRvbi5pbm5lclRleHQgPSBzdXBwb3J0QnV0dG9uLnRpdGxlO1xuICAgICAgICAgICAgYWN0aW9uRGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kaXZpZHVhbEVycm9yRGl2O1xuICAgIH1cblxuICAgIGNyZWF0ZU9wZW5QYW5lbChcbiAgICAgICAgc3VwcG9ydEJ1dHRvbjogSVN1cHBvcnRCdXR0b24gfCB1bmRlZmluZWQsXG4gICAgICAgIGRhdGFDb250ZXh0OiBhbnlcbiAgICApIHtcbiBcbiAgICAgICAgaWYgKCFzdXBwb3J0QnV0dG9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gXG5cblxuICAgICAgICBsZXQgYnV0dG9uQ29uZmlnID0gc3VwcG9ydEJ1dHRvbi5yYWlzZVN1cHBvcnRUaWNrZXRTaGFyZWRvQ29tbWFuZDtcbiAgICAgICAgbGV0IHN1cHBvcnRUaWNrZXRNZXNzYWdlID0gYnV0dG9uQ29uZmlnLmRlc2NyaXB0aW9uIHx8ICBzdXBwb3J0QnV0dG9uLnN1cHBvcnRUaWNrZXRNZXNzYWdlIHx8IFwiXCI7XG5cbiAgICAgICAgbGV0IGNvbmZpZzogSVNoYXJlZG9QYW5lbENvbmZpZyA9XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiBleGVjdXRlRW1iZWRkZWRDb2RlKGJ1dHRvbkNvbmZpZy50aXRsZSwgZGF0YUNvbnRleHQpLFxuICAgICAgICAgICAgdHlwZVN5c3RlbU5hbWU6IGV4ZWN1dGVFbWJlZGRlZENvZGUoYnV0dG9uQ29uZmlnLnR5cGVTeXN0ZW1OYW1lLCBkYXRhQ29udGV4dCksXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjpleGVjdXRlRW1iZWRkZWRDb2RlKHN1cHBvcnRUaWNrZXRNZXNzYWdlLCBkYXRhQ29udGV4dClcbiAgICAgICAgfVxuICAgICAgICAkdWkubmF2Lmludm9rZSh7XG4gICAgICAgICAgICBpbnZva2VUeXBlOiBcInBhbmVsXCIsXG4gICAgICAgICAgICBpbnZva2U6IFwiU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5BZGRFZGl0U2hhcmVkb1wiLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZEVycm9yVHJhcHBpbmcoZXJyb3I6IFRVc2VyRXJyb3JzKSB7XG4gICAgICAgIC8vcnVuIHJ1bGVzIGluIGVycm9yIHRyYXBzIHRvIHNlZSBpZiB0aGlzIGVycm9yIGhhcyBiZWVuIHRyYXBwZWQgYmh5IGEgcnVsZVxuICAgICAgICBsZXQgZXJyb3JUcmFwcGVkID0gZmFsc2U7XG4gICAgICAgIC8vIGxldCBlcnJvclRyYXBzID0gZ3ZrbzxJRXJyb3JUcmFwW10+KHRoaXMuX29wdGlvbnM/LmVycm9yTWFuYWdlbWVudCgpPy5lcnJvclRyYXBzKSB8fCBbXTtcbiAgICAgICAgbGV0IGVycm9yVHJhcHMgPSB0aGlzLmNvbmZpZ3VyYXRpb24/LmVycm9yTWFuYWdlbWVudD8uZXJyb3JUcmFwcyB8fCBbXTtcblxuICAgICAgICAvLyBlcnJvclRyYXBzLmZvckVhY2goKHRyYXApID0+IHtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICAgIGxldCBlcnJvclRyYXBzSW5kZXggPSAwO1xuICAgICAgICAgICAgZXJyb3JUcmFwc0luZGV4IDwgZXJyb3JUcmFwcy5sZW5ndGg7XG4gICAgICAgICAgICBlcnJvclRyYXBzSW5kZXgrK1xuICAgICAgICApIHtcbiAgICAgICAgICAgIGxldCB0cmFwID0gZXJyb3JUcmFwc1tlcnJvclRyYXBzSW5kZXhdO1xuICAgICAgICAgICAgaWYgKHRyYXAuZW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFDb250ZXh0ID0gdGhpcy5nZXREYXRhQ29udGV4dChbeyBvYmo6IGVycm9yLCBrZXk6IFwiZXJyb3JcIiB9XSk7XG4gICAgICAgICAgICAgICAgbChcbiAgICAgICAgICAgICAgICAgICAgYEV2YWx1YXRpbmcgcnVsZSBbJHt0cmFwLnJ1bGV9XSBvbiBlcnJvciAke2Vycm9yfSB3aXRoIGRhdGFDb250ZXh0OmAsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFDb250ZXh0XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBsZXQgcnVsZVJlc3VsdCA9IGV2YWx1dGVSdWxlKHRyYXAucnVsZSwgZGF0YUNvbnRleHQpO1xuICAgICAgICAgICAgICAgIGlmIChydWxlUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yVHJhcHBlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yLmxpbmtlZFRyYXBwZWRFcnJvciA9IHRyYXA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXREYXRhQ29udGV4dChhZGRpdGlvbmFsPzogW3sgb2JqOiBhbnk7IGtleTogc3RyaW5nIH1dIHwgdW5kZWZpbmVkKTogYW55IHtcbiAgICAgICAgY29uc3QgYnJvd3NlciA9IGRldGVjdCgpO1xuICAgICAgICBsZXQgZGF0YUNvbnRleHQ6IGFueSA9IHtcbiAgICAgICAgICAgIHRoaXNDb21wb25lbnROYW1lOiB0aGlzLnRoaXNDb21wb25lbnROYW1lLFxuICAgICAgICAgICAgdXNlcjoga28udG9KUygkdWkucGFnZUNvbnRleHQ/LnVzZXIpLFxuICAgICAgICAgICAgcGFnZUNvbnRleHQ6IGtvLnRvSlMoJHVpLnBhZ2VDb250ZXh0KSxcbiAgICAgICAgICAgIGFzcGVjdERhdGE6IGtvLnRvSlModGhpcy5iYXNlTW9kZWwpLFxuICAgICAgICAgICAgY29uZmlndXJhdGlvbjoga28udG9KUyh0aGlzLl9vcHRpb25zKSxcbiAgICAgICAgICAgIGJyb3dzZXI6IGJyb3dzZXIsXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGFkZGl0aW9uYWxEYXRhID0gYWRkaXRpb25hbCB8fCBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGRpdGlvbmFsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBhZGRpdGlvbmFsRGF0YVtpXTtcbiAgICAgICAgICAgIGRhdGFDb250ZXh0W2l0ZW0ua2V5XSA9IGl0ZW0ub2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGFDb250ZXh0O1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZVN1cHBvcnRUYXNrKCkge1xuICAgIC8vICAgICAvL1RPRE86IENyZWF0ZSBhIHN1cHBvcnQgdGFza1xuICAgIC8vICAgICAkdWkubmF2Lmludm9rZSh7XG4gICAgLy8gICAgICAgICBcImludm9rZVR5cGVcIjogXCJwYW5lbFwiLFxuICAgIC8vICAgICAgICAgXCJpbnZva2VcIjogXCJTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLkFkZEVkaXRTaGFyZWRvXCIsXG4gICAgLy8gICAgICAgICBcImNvbmZpZ1wiOiBcIntcXFwidHlwZVN5c3RlbU5hbWVcXFwiOlxcXCJ0YXNrLWVkZGlzY292ZXJ5LWFkaG9jXFxcIixcXFwidGl0bGVcXFwiOlxcXCJcXFwiLFxcXCJTdXBwb3J0IFJlcXVlc3RcXFwiOlxcXCJcXFwifVwiXG4gICAgLy8gICAgIH0pO1xuXG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogQWJzdHJhY3QgbWV0aG9kIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyB0byByZWZyZXNoIHRoZSBhc3BlY3RcbiAgICAgKiBAcGFyYW0gbmV3Q29uZmlnXG4gICAgICovXG4gICAgYWJzdHJhY3QgcmVmcmVzaChuZXdDb25maWc6IGFueSk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBBYnN0cmFjdCBtZXRob2QgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzIHRvIHJlc2V0IHRoZSBhc3BlY3QgYmFzZWRcbiAgICAgKiBAcGFyYW0gbmV3Q29uZmlnXG4gICAgICovXG4gICAgYWJzdHJhY3QgcmVzZXQobmV3Q29uZmlnOiBhbnkpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3QgbGl2ZUNvbmZpZ3VyYXRpb25SZWZyZXNoZWQoKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqICEgaW1wb3J0YW50OiBNYW5kYXRvcnkgbWV0aG9kIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyB0byBzZXQgdGhlIGRlZmF1bHRzXG4gICAgICogKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIGNvbnN0cnVjdG9yIHRvIHNldCB0aGUgZGVmYXVsdHNcbiAgICAgKiBAcmV0dXJucyBEZWZhdWx0czxUQ29uZmlnPlxuICAgICAqIEBtZW1iZXJvZiBCYXNlSURFQXNwZWN0XG4gICAgICogQGFic3RyYWN0XG4gICAgICpcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXREZWZhdWx0cygpOiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPFRDb25maWc+O1xuXG4gICAgLy8gLyoqXG4gICAgLy8gICogISBpbXBvcnRhbnQ6IE1hbmRhdG9yeSBtZXRob2QgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzIHRvIHNldCB0aGUgZGVmYXVsdHMgZm9yIHRoZSB3aWRnZXQuanNvblxuICAgIC8vICAqL1xuICAgIC8vIGFic3RyYWN0IHNldEV4YW1wbGVGb3JNb2RlbGxlcigpOiBEZWZhdWx0czxUQ29uZmlnPjtcblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBsb2FkIGFuZCBzYXZlIHRvXG4gICAgICogRXhhbXBsZXMgb2YgdGhpcyBhcmU6XG4gICAgICogLSBhc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhLntmb3JtQnVpbGRlckZpZWxkfVxuICAgICAqIC0gYXNwZWN0RGF0YS5vZHNFbnRpdHlQaWNrZXJcbiAgICAgKiAtIHVuZGVmaW5lZCAoaWYgbm8gZGF0YSBpcyB0byBiZSBsb2FkZWQgb3Igc2F2ZWQgYnkgdGhlIGJhc2UgY2xhc3MpXG4gICAgICogQHJldHVybnMgVGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGxvYWQgYW5kIHNhdmUgdG8gT1IgdW5kZWZpbmVkIGlmIG5vIGRhdGEgaXMgdG8gYmUgbG9hZGVkIG9yIHNhdmVkIGJ5IHRoZSBiYXNlIGNsYXNzXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgZS5nLiBRdWlja1ZpZXdcbiAgICAgKiBUaGlzIHdpbGwgYWxzbyBiZSB1c2VkIGR1cmluZyB0aGUgYnVpbGQgYW5kIHdpbGwgYmUgYXBwZW5kZWQgd2l0aCB0aGUgQnVpbHQgVGFyZ2V0IGUuZy4gSURFQXNwZWN0cy5RdWlja1ZpZXdcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRUaGlzQ29tcG9uZW50TmFtZSgpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiAhSU1QT1JUQU5UIC0gVGhpcyBpcyB0aGUgZmlyc3QgbWV0aG9kIG9uY2UgdGhlIGNsYXNzIGhhcyBiZWVuIGNvbnN0cnVjdGVkLCBkZWZhdWx0IGNvbnRydWN0b3IgbG9naWMgc2hvdWxkIGJlIHBsYWNlZCBoZXJlXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0dXAoKTogdm9pZDtcblxuICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBzZXR0aW5ncyBmb3IgdGhlIHdpZGdldC5qc29uIHRoYXQgd2lsbCBiZSBnZW5lcmF0ZWRcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRXaWRnZXRKc29uU2V0dGluZ3MoKTogSVdpZGdldEpzb248VENvbmZpZz47XG5cbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRTY3JpcHRGaWxlcygpOiBzdHJpbmdbXTtcbiAgICAvLyBhYnN0cmFjdCBzZXREZXBlbmRhbnRTdHlsZUZpbGVzKCk6IHN0cmluZ1tdO1xuICAgIC8vIGFic3RyYWN0IHNldERlcGVuZGFudFRlbXBsYXRlRmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50TWVudVRlbXBsYXRlRmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0RGVwZW5kYW50Q29tcG9uZW50RmlsZXMoKTogc3RyaW5nW107XG4gICAgLy8gYWJzdHJhY3Qgc2V0V2lkZ2V0RGVzaWduZXJTZXR0aW5ncygpOiBJV2lkZ2V0SnNvbkRlc2lnbmVyO1xuICAgIC8vIGFic3RyYWN0IHNldFByaW9yaXR5KCkgOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciB3aGVuIHRoZSBtb2RlbCBpcyBzYXZlZC4gTWFuaXB1bGF0ZSB0aGVcbiAgICAgKiBtb2RlbCBhcyByZXF1aXJlZC5cbiAgICAgKi9cbiAgICBvblNhdmUobW9kZWw6IGFueSkge1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uU2F2ZVwiLCBtb2RlbCk7XG5cbiAgICAgICAgbGV0IGRhdGFUb1NhdmUgPSB0aGlzLl9kYXRhO1xuICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgIFwiU2F2aW5nLCBtb2RlbCBwYXNzZWQgaW4gd2UgbmVlZCB0byBwZXJzaXN0IHRvXCIsXG4gICAgICAgICAgICBcImdyZWVuXCIsXG4gICAgICAgICAgICBkYXRhVG9TYXZlXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgICAgICAgIFwiTm8gbG9jYXRpb24gdG8gc2F2ZSBkYXRhIHRvIHNldCAtIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZW5cIixcbiAgICAgICAgICAgICAgICBcInJlZFwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGFUb1BlcnNpc3QgPSB0aGlzLl9kYXRhO1xuICAgICAgICBsZXQgY3VycmVudERhdGEgPSBnZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgICAgICBpZiAoY3VycmVudERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgICAgICAgIGBDdXJyZW50IGRhdGEgYXQgbG9jYXRpb24gJHt0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YX0gOmAsXG4gICAgICAgICAgICAgICAgXCJtYWdlbnRhXCIsXG4gICAgICAgICAgICAgICAgY3VycmVudERhdGFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjdXJyZW50RGF0YSkge1xuICAgICAgICAgICAgLy8gdGhpcy5sb2coXCJEYXRhIGRvZXMgbm90IGV4aXN0LCB3ZSB3aWxsIGNyZWF0ZVwiLCBcIm9yYW5nZVwiKTtcbiAgICAgICAgICAgIC8vICBzZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIHt9KTtcbiAgICAgICAgICAgIC8vIGN1cnJlbnREYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgIGBOZXcgZGF0YSB0byBwZXJzaXN0IHRvIGxvY2F0aW9uICR7dGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGF9IDpgLFxuICAgICAgICAgICAgXCJibHVlXCIsXG4gICAgICAgICAgICBkYXRhVG9QZXJzaXN0XG4gICAgICAgICk7XG4gICAgICAgIHNldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgZGF0YVRvUGVyc2lzdCk7XG5cbiAgICAgICAgdGhpcy5sKFwiRGF0YSBzYXZlZFwiLCBtb2RlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGF0YSB0byBsb2FkLCBkZWZhdWx0cyB0byBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgdW5sZXNzIGEgZmllbGRQYXRoIGlzIHBhc3NlZCBpblxuICAgICAqIEBwYXJhbSBmaWVsZFBhdGhcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIGFzeW5jIGdldERhdGEoZmllbGRQYXRoPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZpZWxkUGF0aCA9IGZpZWxkUGF0aCB8fCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YTtcblxuICAgICAgICAvL1RoaXMgc2VjdGlvbiBpcyBkPXVzZSBkdWUgdG8gdHlwaW5nIGlzc3VlIHRoYXQgbmVlZHMgdG8gYmUgcmVzb2x2ZWQuXG4gICAgICAgIC8vIGxldCB1c2VQYXJlbnRzID0gZ3Zrbyh0aGlzLl9vcHRpb25zLmRhdGFTZXR0aW5ncygpLmdldFZhbHVlVXNpbmdQYXJlbnRzKSBhcyBib29sZWFuIHwgdW5kZWZpbmVkXG4gICAgICAgIC8vIGxldCBzaGFyZURvSWQ9IGd2a28odGhpcy5zaGFyZWRvSWQpXG4gICAgICAgIC8vIGxldCBtYXhEZXB0aCA9IGd2a28odGhpcy5fb3B0aW9ucy5kYXRhU2V0dGluZ3MoKS5tYXhEZXB0aCkgYXMgbnVtYmVyIHwgdW5kZWZpbmVkXG4gICAgICAgIC8vIGxldCBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPSBndmtvKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKSBhcyBzdHJpbmcgfCB1bmRlZmluZWRcbiAgICAgICAgLy9lbmQgYXJlYSBvZiB0eXBpbmcgaXNzdWVcblxuICAgICAgICBsZXQgdXNlUGFyZW50cyA9IHRoaXMuX29wdGlvbnM/LmRhdGFTZXR0aW5ncygpLmdldFZhbHVlVXNpbmdQYXJlbnRzKCk7XG4gICAgICAgIGxldCBzaGFyZURvSWQgPSB0aGlzLnNoYXJlZG9JZCgpO1xuICAgICAgICBsZXQgbWF4RGVwdGggPSB0aGlzLl9vcHRpb25zPy5kYXRhU2V0dGluZ3MoKS5tYXhEZXB0aCgpO1xuXG4gICAgICAgIC8vIGxldCBMb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPSBndmtvKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcblxuICAgICAgICBpZiAoZmllbGRQYXRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgICAgICAgIFwiTm8gbG9jYXRpb24gdG8gbG9hZCBkYXRhIGZyb20gc2V0IC0gdGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRlblwiLFxuICAgICAgICAgICAgICAgIFwicmVkXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RhdGEgPSBnZXROZXN0ZWRQcm9wZXJ0eSh0aGlzLm1vZGVsLCBmaWVsZFBhdGgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9kYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubChcIkRhdGEgZm91bmQgYXQgbG9jYXRpb25cIiwgdGhpcy5fZGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9kYXRhID0ga28udG9KUyh0aGlzLl9kYXRhKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pZiBkYXRhIG90IGZvdW5kIGluIHRoZSBjdXJyZW50IG1vZGVsLCBsb29rIHZpYSB0aGUgc2VhcmNoXG4gICAgICAgIGlmICh0aGlzLl9kYXRhID09PSB1bmRlZmluZWQgJiYgdXNlUGFyZW50cyA9PT0gZmFsc2UgJiYgc2hhcmVEb0lkKSB7XG4gICAgICAgICAgICAvLyEgVE9ETyBGaXggVHlwaW5nc1xuICAgICAgICAgICAgcmV0dXJuIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZShzaGFyZURvSWQsIGZpZWxkUGF0aCwgZmFsc2UpLnRoZW4oXG4gICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZGF0YSA9PT0gdW5kZWZpbmVkICYmIHVzZVBhcmVudHMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIC8vISBUT0RPIEZpeCBUeXBpbmdzXG4gICAgICAgICAgICBsZXQgaWRUb1VzZXIgPSB0aGlzLnNoYXJlZG9JZCgpIHx8IHRoaXMucGFyZW50U2hhcmVkb0lkKCk7XG5cbiAgICAgICAgICAgIGlmICghaWRUb1VzZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgXCJObyBpZCB0byB1c2UgZm9yIHNlYXJjaCBib3RoIHNoYXJlZG9JZCBhbmQgcGFyZW50U2hhcmVkb0lkIGFyZSB1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlKFxuICAgICAgICAgICAgICAgIGlkVG9Vc2VyLFxuICAgICAgICAgICAgICAgIGZpZWxkUGF0aCxcbiAgICAgICAgICAgICAgICB1c2VQYXJlbnRzLFxuICAgICAgICAgICAgICAgIG1heERlcHRoXG4gICAgICAgICAgICApLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5mb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZShcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgYXR0cmlidXRlOiBzdHJpbmcsXG4gICAgICAgIHVzZVBhcmVudHM6IGJvb2xlYW4sXG4gICAgICAgIG1heERlcHRoOiBudW1iZXIgfCB1bmRlZmluZWRcbiAgICApOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlKGlkLCBhdHRyaWJ1dGUsIHVzZVBhcmVudHMsIG1heERlcHRoKTtcbiAgICB9XG5cbiAgICBhc3luYyBzZWFyY2hCeUdyYXBoKGZpZWxkUGF0aDogc3RyaW5nLCB1c2VQYXJlbnQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBsZXQgaW5wdXRPcHRpb246IElHcmFwaFF1ZXJ5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShJR3JhcGhRdWVyeURlZmF1bHRzKSk7XG4gICAgICAgIGxldCBzaGFyZURvSWQgPSB0aGlzLnNoYXJlZG9JZCgpO1xuICAgICAgICBsZXQgcGFyZW50SWQgPSB0aGlzLnBhcmVudFNoYXJlZG9JZCgpO1xuXG4gICAgICAgIGxldCBxdWVyeTogSUdyYXBoUXVlcnlGaWVsZCA9IHtcbiAgICAgICAgICAgIHBhdGg6IGZpZWxkUGF0aCxcbiAgICAgICAgfTtcblxuICAgICAgICBpbnB1dE9wdGlvbi5maWVsZHMucHVzaChxdWVyeSk7XG5cbiAgICAgICAgaWYgKHVzZVBhcmVudCA9PT0gZmFsc2UgJiYgc2hhcmVEb0lkKSB7XG4gICAgICAgICAgICAvLyEgVE9ETyBGaXggVHlwaW5nc1xuICAgICAgICAgICAgaW5wdXRPcHRpb24uZW50aXR5SWQgPSBzaGFyZURvSWQ7XG4gICAgICAgIH0gZWxzZSBpZiAodXNlUGFyZW50ID09PSB0cnVlICYmIHBhcmVudElkKSB7XG4gICAgICAgICAgICAvLyEgVE9ETyBGaXggVHlwaW5nc1xuICAgICAgICAgICAgaW5wdXRPcHRpb24uZW50aXR5SWQgPSBwYXJlbnRJZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaW5wdXRPcHRpb24uZW50aXR5SWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgICAgICAgIFwiTm8gaWQgdG8gdXNlIGZvciBzZWFyY2ggYm90aCBzaGFyZWRvSWQgYW5kIHBhcmVudFNoYXJlZG9JZCBhcmUgdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUZpbmRCeUdyYXBoKGlucHV0T3B0aW9uKTtcblxuICAgICAgICBpZiAocmVzdWx0LmluZm8uc3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiRXJyb3IgZXhlY3V0aW5nIHNlYXJjaFwiLCBcInJlZFwiLCByZXN1bHQuaW5mbyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE/LmRhdGFbZmllbGRQYXRoXTtcbiAgICB9XG5cbiAgICBzZXREYXRhKHZhbHVlOiBUUGVyc2l0YW5jZSB8IHVuZGVmaW5lZCkge1xuICAgICAgICBsZXQgdmFsdWVUb1BlcnNpc3QgPSBrby50b0pTKHZhbHVlKTtcbiAgICAgICAgbGV0IHByZXZpb3VzVmFsdWUgPSBrby50b0pTKHRoaXMuX2RhdGEpO1xuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWVUb1BlcnNpc3Q7XG4gICAgICAgIHRoaXMuZmlyZVZhbHVlQ2hhbmdlZEV2ZW50KFwib25EYXRhQmVmb3JlQ2hhbmdlZFwiLCB7XG4gICAgICAgICAgICBwcmV2aW91c1ZhbHVlOiBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgICAgbmV3VmFsdWU6IHZhbHVlVG9QZXJzaXN0LFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbHVlVG9TZXQ6IGFueSA9IHZhbHVlO1xuICAgICAgICAvLyBpZih0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YS5pbmNsdWRlcyhcImZvcm1CdWlsZGVyXCIpKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICAvL2Zvcm1idWlsZGVyIERhdGEgYWx3YXlzIG5lZWQgdG8gYmUgc3RyaW5nXG4gICAgICAgIC8vICAgICB0aGlzLmxvZyhcIlNldHRpbmcgZm9ybWJ1aWxkZXIgZGF0YSAtIGNvbnZlcnRpbmcgdG8gc3RyaW5nXCIsIFwiZ3JlZW5cIiwgdmFsdWUpXG4gICAgICAgIC8vICAgICB2YWx1ZVRvU2V0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAvLyAgICAgdGhpcy5sb2coXCJhZnRlciBTZXR0aW5nIGZvcm1idWlsZGVyIGRhdGEgLSBjb252ZXJ0ZWQgdG8gc3RyaW5nXCIsIFwiZ3JlZW5cIiwgdmFsdWVUb1NldClcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLmxvZyhcIlNldHRpbmcgZGF0YSBhdCBsb2NhdGlvblwiLCBcImdyZWVuXCIsIHZhbHVlVG9TZXQpO1xuICAgICAgICBzZXROZXN0ZWRQcm9wZXJ0eSh0aGlzLm1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgdGhpcy5fZGF0YSk7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25EYXRhQ2hhbmdlZFwiLCB0aGlzLm1vZGVsKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3kobW9kZWw/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkRlc3Ryb3lcIik7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25EZXN0cm95XCIsIG1vZGVsKTtcbiAgICAgICAgJHVpLnV0aWwuZGlzcG9zZSh0aGlzLmRpc3Bvc2FibGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIFVJIGZyYW1ld29yayBhZnRlciBpbml0aWFsIGNyZWF0aW9uIGFuZCBiaW5kaW5nIHRvIGxvYWQgZGF0YVxuICAgICAqIGludG8gaXQncyBtb2RlbFxuICAgICAqL1xuICAgIGxvYWRBbmRCaW5kKCkge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IGxvYWRBbmRCaW5kXCIpO1xuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSAobW9kZWw6YW55KSBwYXNzZWQgaW5cIiwgXCJncmVlblwiKTtcbiAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgICBcIkxvYWRpbmcgZGF0YSBiYXNlZCBvbiBsb2NhdGlvbiB0byBzYXZlXCIsXG4gICAgICAgICAgICBcImdyZWVuXCIsXG4gICAgICAgICAgICB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uTG9hZFwiLCB0aGlzLm1vZGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciBiZWZvcmUgdGhlIG1vZGVsIGlzIHNhdmVkXG4gICAgICovXG4gICAgb25CZWZvcmVTYXZlKG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25CZWZvcmVTYXZlXCIpO1xuICAgICAgICB0aGlzLmZpcmVFdmVudChcIm9uQmVmb3JlU2F2ZVwiLCBtb2RlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgYWZ0ZXIgdGhlIG1vZGVsIGhhcyBiZWVuIHNhdmVkLlxuICAgICAqL1xuICAgIG9uQWZ0ZXJTYXZlKG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25BZnRlclNhdmVcIik7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25BZnRlclNhdmVcIiwgbW9kZWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIHdoZW4gaXQgcmVsb2FkcyBhc3BlY3QgZGF0YVxuICAgICAqL1xuICAgIG9uUmVsb2FkKG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25SZWxvYWRcIik7XG4gICAgICAgIHRoaXMuZmlyZUV2ZW50KFwib25SZWxvYWRcIiwgbW9kZWwpO1xuICAgIH1cblxuICAgIGRlYnVnU2V0dGluZ3MoKSB7XG4gICAgICAgIGxldCBkZWJ1Z1NldHRpbmc6IElEZWJ1ZyA9IERFQlVHX0RFRkFVTFQoKTtcblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucz8uZGVidWcoKSkge1xuICAgICAgICAgICAgZGVidWdTZXR0aW5nID0ga28udG9KUyh0aGlzLl9vcHRpb25zPy5kZWJ1ZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWJ1Z1NldHRpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgbG9nZ2luZyBmb3IgdGhlIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgZGVidWcgY29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSBtZXNzYWdlXG4gICAgICogQHBhcmFtIGNvbG9yXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICBsb2cobWVzc2FnZTogc3RyaW5nLCBjb2xvcj86IHN0cmluZywgZGF0YT86IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kZWJ1Z1NldHRpbmdzKCkuZW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdTZXR0aW5ncygpLmxvZ1RvQ29uc29sZSkge1xuICAgICAgICAgICAgICAgIGlmICghY29sb3IpIGNvbG9yID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIC8vIGxldCBsaW5lTm8gPSBleHRyYWN0TGluZU51bWJlckZyb21TdGFjaygobmV3IEVycm9yKCkpLnN0YWNrKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgYCVjICR7dGhpcy50aGlzQ29tcG9uZW50TmFtZX0gLSAke21lc3NhZ2V9YCxcbiAgICAgICAgICAgICAgICAgICAgYGNvbG9yOiR7Y29sb3J9YCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5Mb2coKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlYnVnU2V0dGluZ3MoKS5lbmFibGVkO1xuICAgIH1cbiAgICBsb2dUb0NvbnNvbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbkxvZygpICYmIHRoaXMuZGVidWdTZXR0aW5ncygpLmxvZ1RvQ29uc29sZTtcbiAgICB9XG4gICAgbG9nVG9Bc3BlY3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbkxvZygpICYmIHRoaXMuZGVidWdTZXR0aW5ncygpLnNob3dJbkFzcGVjdDtcbiAgICB9XG5cbiAgICBpbmYobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChpbmYobWVzc2FnZSksIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JuKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgaWYgKHRoaXMubG9nVG9Db25zb2xlKCkpIHtcbiAgICAgICAgICAgIGwod3JuKG1lc3NhZ2UpLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVycihtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIC8vZ2V0IHRoZSBwcmV2aW91cyBjYWxsZXJcblxuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChlcnIobWVzc2FnZSksIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbnYobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKG52KG5hbWUsIHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsaDEobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5sb2dUb0NvbnNvbGUoKSkge1xuICAgICAgICAgICAgbChsaDEobWVzc2FnZSksIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJTZWMoKSB7XG4gICAgICAgIGNsZWFyU2VjKCk7XG4gICAgfVxuXG4gICAgbChtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQ29uc29sZSgpKSB7XG4gICAgICAgICAgICBsKG1lc3NhZ2UsIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxvZ1RvQXNwZWN0KCkpIHtcbiAgICAgICAgICAgIGxldCBhc3BlY3RMb2dPdXRwdXQgPSB0aGlzLmFzcGVjdExvZ091dHB1dDtcbiAgICAgICAgICAgIGlmIChhc3BlY3RMb2dPdXRwdXQpIHtcbiAgICAgICAgICAgICAgICBhc3BlY3RMb2dPdXRwdXQuaW5uZXJUZXh0ICs9IGAke21lc3NhZ2V9XFxuYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEFzcGVjdExvZ091dHB1dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxvZ1RvQXNwZWN0KCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXNwZWN0TG9nT3V0cHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbGV0IGFzcGVjdExvZ091dHB1dCA9IHRoaXMuYXNwZWN0TG9nT3V0cHV0O1xuXG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5pZCA9IGBhc3BlY3RMb2dPdXRwdXQtJHt0aGlzLnVuaXF1ZUlkfWA7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBibGFja1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUucGFkZGluZyA9IFwiNXB4XCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5tYXJnaW4gPSBcIjVweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuaGVpZ2h0ID0gXCIyMDBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuZm9udFNpemUgPSBcIjEwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmZvbnRGYW1pbHkgPSBcIm1vbm9zcGFjZVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUud2hpdGVTcGFjZSA9IFwicHJlLXdyYXBcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLndvcmRXcmFwID0gXCJicmVhay13b3JkXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnpJbmRleCA9IFwiMTAwMFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm90dG9tID0gXCIwcHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUucmlnaHQgPSBcIjBweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luTGVmdCA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luUmlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiYXV0b1wiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUubWFyZ2luVG9wID0gXCJhdXRvXCI7XG4gICAgICAgIGFzcGVjdExvZ091dHB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LDI1NSwyNTUsMC44KVwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1cHhcIjtcbiAgICAgICAgYXNwZWN0TG9nT3V0cHV0LnN0eWxlLnBhZGRpbmcgPSBcIjVweFwiO1xuICAgICAgICBhc3BlY3RMb2dPdXRwdXQuc3R5bGUuYm94U2hhZG93ID0gXCIwcHggMHB4IDVweCAwcHggcmdiYSgwLDAsMCwwLjc1KVwiO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudC5wcmVwZW5kKGFzcGVjdExvZ091dHB1dCk7XG4gICAgfVxuXG4gICAgZmlyZUV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IGV2ZW50OiBTaGFyZURvRXZlbnQgPSB7XG4gICAgICAgICAgICBldmVudFBhdGg6IHRoaXMudGhpc0NvbXBvbmVudE5hbWUgKyBcIi5cIiArIGV2ZW50TmFtZSxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogZXZlbnROYW1lLFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZUV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICBmaXJlVmFsdWVDaGFuZ2VkRXZlbnQoXG4gICAgICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgICBjaGFuZ2VkRGF0YTogeyBwcmV2aW91c1ZhbHVlOiBhbnk7IG5ld1ZhbHVlOiBhbnkgfVxuICAgICkge1xuICAgICAgICBsZXQgZXZlbnQ6IFNoYXJlRG9FdmVudCA9IHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogdGhpcy50aGlzQ29tcG9uZW50TmFtZSArIFwiLlwiICsgZXZlbnROYW1lLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBldmVudE5hbWUsXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgICAgICBkYXRhOiBjaGFuZ2VkRGF0YSxcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZUV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEZvcm1idWlsZCBpZiBpdCBleGlzdHMgb3IgY3JlYXRlcyBpdCBpZiBpdCBkb2VzIG5vdFxuICAgICAqXG4gICAgICovXG4gICAgZm9ybWJ1aWxkZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5ibGFkZT8ubW9kZWw/LmFzcGVjdERhdGE/LmZvcm1CdWlsZGVyPy5mb3JtRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgICAgICAgXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIG5vdCBmb3VuZCAtIHdpbGwgY3JlYXRlIHRoZSBwYXRoXCIsXG4gICAgICAgICAgICAgICAgXCJibHVlXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgZm91bmRcIiwgXCJncmVlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vRW5zdXJlIHRoZSBwYXRoIGV4aXN0c1xuICAgICAgICBpZiAoIXRoaXMuYmxhZGUpIHtcbiAgICAgICAgICAgIC8vVE9ETzogaWYgbm8gYmxhZGUgd2hlcmUgaXMgZm9ybSBidWlsZGVyIGRhdGFcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ibGFkZSA9IHRoaXMuYmxhZGUgfHwge307XG4gICAgICAgIHJldHVybiB0aGlzLmVuc3VyZUZvcm1idWlsZGVyKHRoaXMuYmxhZGUubW9kZWwpO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGlzLmJsYWRlIS5tb2RlbCEuYXNwZWN0RGF0YSEuZm9ybUJ1aWxkZXIhLmZvcm1EYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVuc3VyZXMgdGhlcmUgaXMgYSBmb3JtIGJ1aWxkZXIgaW4gdGhlIHBhc3NlZCBpbiBtb2RlbCBhbmQgcmV0dXJucyBpdFxuICAgICAqIEBwYXJhbSBtb2RlbFxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgZW5zdXJlRm9ybWJ1aWxkZXIobW9kZWw6IGFueSk6IElGb3JtQnVpbGRlckRhdGEge1xuICAgICAgICBpZiAoIW1vZGVsPy5hc3BlY3REYXRhPy5mb3JtQnVpbGRlcj8uZm9ybURhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgICAgICAgIFwiYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YSBub3QgZm91bmQgLSB3aWxsIGNyZWF0ZSB0aGUgcGF0aFwiLFxuICAgICAgICAgICAgICAgIFwiYmx1ZVwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIGZvdW5kXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0Vuc3VyZSB0aGUgcGF0aCBleGlzdHNcblxuICAgICAgICBtb2RlbCA9IG1vZGVsIHx8IHt9O1xuICAgICAgICBtb2RlbC5hc3BlY3REYXRhID0gbW9kZWwuYXNwZWN0RGF0YSB8fCB7fTtcbiAgICAgICAgbW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlciA9IG1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIgfHwge1xuICAgICAgICAgICAgZm9ybURhdGE6IHt9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBtb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhO1xuICAgIH1cblxuICAgIGZvcm1idWlsZGVyRmllbGQoZm9ybWJ1aWxkZXJGaWVsZDogc3RyaW5nLCBzZXRWYWx1ZT86IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuZm9ybWJ1aWxkZXIoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJGb3JtIGJ1aWxkZXIgZG9lcyBub3QgZXhpc3QhIFwiLCBcInJlZFwiKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZvcm0gYnVpbGRlciBkb2VzIG5vdCBleGlzdCFcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZm9ybUJ1aWxkZXIgPSB0aGlzLmZvcm1idWlsZGVyKCkhO1xuICAgICAgICBpZiAoIWZvcm1CdWlsZGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZm91bmRWYWx1ZSA9IGZvcm1CdWlsZGVyW2Zvcm1idWlsZGVyRmllbGRdO1xuICAgICAgICBpZiAoIWZvdW5kVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgICAgICAgIGBGb3JtIGJ1aWxkZXIgZG9lcyBub3QgY29udGFpbiBmaWVsZCAke2Zvcm1idWlsZGVyRmllbGR9IGAsXG4gICAgICAgICAgICAgICAgXCJvcmFuZ2VcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMubG9nKGBDcmVhdGluZyBmaWVsZCAke2Zvcm1idWlsZGVyRmllbGR9IGAsIFwiYmx1ZVwiKTtcbiAgICAgICAgICAgIGZvcm1CdWlsZGVyW2Zvcm1idWlsZGVyRmllbGRdID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9BcmUgd2UgZG9pbmcgYSBzZXRcbiAgICAgICAgaWYgKHNldFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhgU2V0dGluZyAke2Zvcm1idWlsZGVyRmllbGR9IHRvICR7c2V0VmFsdWV9YCwgXCJncmVlblwiKTtcbiAgICAgICAgICAgIGZvcm1CdWlsZGVyW2Zvcm1idWlsZGVyRmllbGRdID0gc2V0VmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gc2V0VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmRWYWx1ZTtcbiAgICB9XG59XG5cbi8vIGNsYXNzIE15Q2xhc3Mge1xuXG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKCk7XG4vLyAgICAgcHVibGljIGNvbnN0cnVjdG9yKHAxOiBudW1iZXIpO1xuLy8gICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwMTogc3RyaW5nLCBwMjogc3RyaW5nKTtcbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IocDE6IHN0cmluZywgcDI6IHN0cmluZywgcDM6IHN0cmluZyk7XG5cbi8vICAgICBwdWJsaWMgY29uc3RydWN0b3IoLi4uYXJyOiBhbnlbXSkge1xuLy8gICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMikge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3R3byBhcmd1bWVudHMgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGFyci5sZW5ndGggPT09IDMpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aHJlZSBhcmd1bWVudHMgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9IGVsc2UgaWYgKGFyci5sZW5ndGggPT09IDEpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbmUgYXJndW1lbnQgY29uc3RydWN0b3IgY2FsbGVkLicpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyB9XG5cbi8vIGxldCB4ID0gbmV3IE15Q2xhc3MoKVxuIiwiaW1wb3J0IHsgSURlYnVnIH0gZnJvbSBcIi4vSURlYnVnXCI7XG5pbXBvcnQge1xuICBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnLFxuICBJRXJyb3JNYW5hZ2VtZW50LFxuICBJRXJyb3JUcmFwLFxuICBJUmVmcmVzaE9uLFxuICBJU2hhcmVkb1BhbmVsQ29uZmlnLFxuICBJU3VwcG9ydEJ1dHRvbixcbn0gZnJvbSBcIi4vSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY29uc3QgREVCVUdfREVGQVVMVCA9ICgpID0+IHtcbiAgLy8hIHRoaXMgaXMgYSBmdW5jdGlvbiBmb3IgZGVidWcgcHVycG9zZSBvbmx5XG5cbiAgbGV0IHJldFZhbHVlOiBJRGVidWcgPSB7XG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBsb2dUb0NvbnNvbGU6IHRydWUsXG4gICAgc2hvd0luQXNwZWN0OiBmYWxzZSxcbiAgICBsaXZlQ29uZmlnOiBmYWxzZSxcbiAgfTtcbiAgcmV0dXJuIHJldFZhbHVlO1xufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU0hBUkVET19DT01NQU5EOiBJU2hhcmVkb1BhbmVsQ29uZmlnID0ge1xuICB0eXBlU3lzdGVtTmFtZTogXCJ0YXNrXCIsXG4gIHRpdGxlOiBcIlN1cHBvcnQgUmVxdWlyZWQgZm9yICR7ZGF0YUNvbnRleHQucGFnZUNvbnRleHQudXNlci5maXJzdG5hbWV9ICR7ZGF0YUNvbnRleHQucGFnZUNvbnRleHQudXNlci5sYXN0bmFtZX0gb24gJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC5wYWdlVGl0bGV9XCIsXG4gIGRlc2NyaXB0aW9uOiB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU1VQUE9SVF9CVVRUT046IElTdXBwb3J0QnV0dG9uID0ge1xuICByYWlzZVN1cHBvcnRUaWNrZXQ6IHRydWUsXG4gIHN1cHBvcnRUaWNrZXRNZXNzYWdlOiBcIlN1cHBvcnQgUmVxdWlyZWQgZm9yICR7ZGF0YUNvbnRleHQucGFnZUNvbnRleHQudXNlci5maXJzdG5hbWV9ICR7ZGF0YUNvbnRleHQucGFnZUNvbnRleHQudXNlci5sYXN0bmFtZX0gb24gJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC5wYWdlVGl0bGV9IGNvbnRleHQgJHtKU09OLnN0cmluZ2lmeShkYXRhQ29udGV4dCl9XCIsXG4gIHJhaXNlU3VwcG9ydFRpY2tldFNoYXJlZG9Db21tYW5kOiBERUZBVUxUX1NIQVJFRE9fQ09NTUFORCxcbiAgZGF0YUNvbnRleHQ6IFwiUG9wdWxhdGVkIGJ5IHRoZSBzeXN0ZW1cIixcbiAgdGl0bGU6IFwiUmFpc2UgU3VwcG9ydCBUaWNrZXRcIixcbiAgc3R5bGVSdWxlczogdW5kZWZpbmVkLFxuICBjbGFzc1J1bGVzOiB1bmRlZmluZWQsXG4gIHRvb2xUaXA6IFwiUmFpc2UgYSBzdXBwb3J0IHRpY2tldCB3aXRoIHRoZSBzdXBwb3J0IGRlc2tcIixcbiAgZW5hYmxlZDogZmFsc2Vcbn07XG5cblxuXG5leHBvcnQgY29uc3QgUkVGUkVTSF9PTl9ERUZBVUxUUzogSVJlZnJlc2hPbiA9IHtcbiAgc2hhcmVkb0lkQ2hhbmdlZDogZmFsc2UsXG4gIHNoYXJlZG9QYXJlbnRJZENoYW5nZWQ6IGZhbHNlLFxuICBzaGFyZWRvUGhhc2VDaGFuZ2VkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VSUk9SX01BTkFHRU1FTlRfVFJBUFM6IElFcnJvclRyYXBbXSA9IFtcbiAge1xuICAgIGRhdGFDb250ZXh0OiBudWxsLFxuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgcnVsZTogXCJkYXRhQ29udGV4dC5lcnJvci5tZXNzYWdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2ZvcmJpZGRlbicpXCIsXG4gICAgdXNlckZyZWluZGx5TWVzc2FnZTogXCJUaGUgbWF0dGVyIGlzIG5vdCBhY2Nlc3NpYmxlIHRvIHlvdS4gSXQgbWF5IGJlIGJlaGluZCBhIEluZm9ybWF0aW9uIEJhcnJpZXIuXCIsXG4gICAgcmVzb2x1dGlvblN1Z2dlc3Rpb25zOiBbXCJQbGVhc2UgY29udGFjdCB0aGUgbWF0dGVyIG93bmVyIGZvciBhY2Nlc3MuXCJdLFxuICAgIHVzZXJGcmVpbmRseUhUTUxNZXNzYWdlVGVtcGxhdGU6IHVuZGVmaW5lZCxcbiAgICBzdXBwb3J0QnV0dG9uOiBERUZBVUxUX1NVUFBPUlRfQlVUVE9OLFxuICAgIHN0eWxlUnVsZXM6IFtcbiAgICAgIHtcbiAgICAgICAgcnVsZTogXCJ0cnVlXCIsXG4gICAgICAgIHN0eWxlOiBcImJveC1zaGFkb3c6IDFweCAxcHggMTBweCAjZDQ2MDYwO1wiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGNsYXNzUnVsZXM6IFtcbiAgICAgIHtcbiAgICAgICAgcnVsZTogXCJ0cnVlXCIsXG4gICAgICAgIGNzc0NsYXNzOiBcImVtcy1zZWxlY3RlZC1pdGVtXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBydWxlOiBcInRydWVcIixcbiAgICAgICAgY3NzQ2xhc3M6IFwiZW1zLXNob3dcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl07XG5cbi8vY2xhc3NSdWxlczogZW1zLXNlbGVjdGVkLWl0ZW0gZW1zLXNob3cnIHN0eWxlPSdib3gtc2hhZG93OiAxcHggMXB4IDEwcHggI2Q0NjA2MDsnLFxuLy9cbi8vXCJTdXBwb3J0IFJlcXVpcmVkIGZvciAke2RhdGFDb250ZXh0LnBhZ2VDb250ZXh0LnVzZXIuZmlyc3RuYW1lfSAke2RhdGFDb250ZXh0LnBhZ2VDb250ZXh0LnVzZXIubGFzdG5hbWV9IG9uICR7ZGF0YUNvbnRleHQucGFnZUNvbnRleHQucGFnZVRpdGxlfVwiXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VSUk9SX01BTkFHRU1FTlRfU0VUVElOR1M6IElFcnJvck1hbmFnZW1lbnQgPSB7XG4gIGVycm9yVHJhcHM6IERFRkFVTFRfRVJST1JfTUFOQUdFTUVOVF9UUkFQUyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgZGlzcGxheVVuVHJhcHBlZEVycm9ySW5Bc3BlY3Q6IHRydWUsXG4gIHVuVHJhcHBlZEVycm9yc1N1cHBvcnRCdXR0b246IHVuZGVmaW5lZCxcbn07IFxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT05GSUdVUkFUSU9OX1NFVFRJTkdTOiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPHVua25vd24+ID1cbiAge1xuICAgIGRlYnVnOiBERUJVR19ERUZBVUxUKCksXG4gICAgcmVmcmVzaE9uOiBSRUZSRVNIX09OX0RFRkFVTFRTLCBcbiAgICBldmVudHNUb1JlYWN0VG86IFtcbiAgICAgIHtcbiAgICAgICAgZXZlbnRQYXRoOiBcInNoYXJlZG8udXBkYXRlZFwiLFxuICAgICAgICBtZXRob2RUb0NhbGw6IFwicmVmcmVzaFwiLFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby5jb3JlLmNhc2Uuc2hhcmVkby11cGRhdGVkXCIsXG4gICAgICAgIG1ldGhvZFRvQ2FsbDogXCJyZWZyZXNoXCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgZGF0YVNldHRpbmdzOiB7XG4gICAgICBnZXRWYWx1ZVVzaW5nUGFyZW50czogZmFsc2UsXG4gICAgICBtYXhEZXB0aDogMCxcbiAgICB9LFxuICAgIGVycm9yTWFuYWdlbWVudDogREVGQVVMVF9FUlJPUl9NQU5BR0VNRU5UX1NFVFRJTkdTLFxuICB9O1xuIiwiaW1wb3J0ICogYXMga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IHsgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb24gfSBmcm9tICcuL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgdHlwZSBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+ID0ge1xuICAgIFtLIGluIGtleW9mIFRdICAgICAgOiBUW0tdIGV4dGVuZHMgQXJyYXk8aW5mZXIgVT4gPyBrby5PYnNlcnZhYmxlQXJyYXk8TmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxVPj4gOlxuICAgIFRbS10gZXh0ZW5kcyBvYmplY3QgPyBrby5PYnNlcnZhYmxlPE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VFtLXT4+IDoga28uT2JzZXJ2YWJsZTxUW0tdPjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB0b09ic2VydmFibGVPYmplY3Q8VD4ob2JqOiBULCBleGlzdGluZz86IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD4pOiBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+IHtcbiAgICBcbiAgICBpZighZXhpc3RpbmcpIGV4aXN0aW5nID0ge30gYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPjtcbiAgIFxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSAmJiBrZXkgIT09IFwiX19rb19tYXBwaW5nX19cIiAmJiBrZXkgIT09IFwiX2hvc3RcIikge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBvYmpba2V5IGFzIGtleW9mIFRdO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IGtvLm9ic2VydmFibGVBcnJheSh2YWx1ZS5tYXAoaXRlbSA9PiB0b09ic2VydmFibGVPYmplY3QoaXRlbSwge30gYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDx0eXBlb2YgaXRlbT4pKSkgYXMgYW55O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0aW5nW2tleV09ZW5zdXJlSXNPYnNlcnZhYmxlQXJyYXkoZXhpc3RpbmcsIGtleSlcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSh2YWx1ZS5tYXAoaXRlbSA9PiB0b09ic2VydmFibGVPYmplY3QoaXRlbSwge30gYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDx0eXBlb2YgaXRlbT4pKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZ1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0gPSBrby5vYnNlcnZhYmxlKHRvT2JzZXJ2YWJsZU9iamVjdCh2YWx1ZSwge30gYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDx0eXBlb2YgdmFsdWU+KSkgYXMgYW55O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0aW5nW2tleV0gID0gZW5zdXJlSXNPYnNlcnZhYmxlKGV4aXN0aW5nLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldKHRvT2JzZXJ2YWJsZU9iamVjdCgodmFsdWUgYXMgYW55KSwgKGV4aXN0aW5nW2tleV0oKSBhcyBhbnkpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgKGV4aXN0aW5nW2tleV0gYXMgYW55KSA9IGtvLm9ic2VydmFibGUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0aW5nW2tleV0gPSBlbnN1cmVJc09ic2VydmFibGUoZXhpc3RpbmcsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0oKHZhbHVlIGFzIGFueSkpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZXhpc3RpbmcgYXMgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSURlYnVnIHtcbiAgICBzdXBwb3J0UmVxdWVzdEVuYWJsZWQ/OiBib29sZWFuO1xuICAgICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgICAgIGxvZ1RvQ29uc29sZTogYm9vbGVhbjtcbiAgICAgIHNob3dJbkFzcGVjdDogYm9vbGVhbjtcbiAgICAgIGxpdmVDb25maWc/OiBib29sZWFuO1xuICAgIH1cbiAgXG5cblxuZnVuY3Rpb24gZW5zdXJlSXNPYnNlcnZhYmxlKGV4aXN0aW5nOiBhbnksIGtleTogc3RyaW5nKSB7XG4gICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShleGlzdGluZ1trZXldKSkge1xuICAgICAgICByZXR1cm4gZXhpc3Rpbmdba2V5XSA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4ga28ub2JzZXJ2YWJsZSgpO1xuICAgIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGVuc3VyZUlzT2JzZXJ2YWJsZUFycmF5KGV4aXN0aW5nOiBhbnksIGtleTogc3RyaW5nKSB7XG4gICAgaWYgKGtvLmlzT2JzZXJ2YWJsZUFycmF5KGV4aXN0aW5nW2tleV0pKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1trZXldIDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBrby5vYnNlcnZhYmxlQXJyYXkoKTtcbiAgICB9XG59XG5cbi8vIGV4cG9ydCB0eXBlIElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+ID0gVENvbmZpZyAmIHtcbi8vICAgICBkZWJ1ZzogSURlYnVnO1xuLy8gICB9XG5cbi8vIGV4cG9ydCB0eXBlIE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPiA9IFxuLy8geyBbSyBpbiBrZXlvZiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5dOiBrby5PYnNlcnZhYmxlPElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPltLXT47IH1cblxuLy8gZXhwb3J0IGludGVyZmFjZSBJQ29uZmlndXJhdGlvbkhvc3Qge1xuLy8gICAgIF9ob3N0OiB7XG4vLyAgICAgICAgIGJsYWRlOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLkFkZEVkaXRTaGFyZWRvO1xuLy8gICAgICAgICBlbmFibGVkOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+OyAvLyBVc2luZyAnYW55JyBmb3IgcmV0dXJuIHR5cGUgYXMgaXQncyBub3QgY2xlYXIgd2hhdCB0aGVzZSBmdW5jdGlvbnMgcmV0dXJuXG4vLyAgICAgICAgIG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gZXhwb3J0IHR5cGUgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+ID0gSUNvbmZpZ3VyYXRpb25Ib3N0ICYgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz47XG5cbi8vIGludGVyZmFjZSBSb290T2JqZWN0IHtcbi8vICAgbDE6IHN0cmluZztcbi8vICAgbzE6IE8xO1xuLy8gfVxuXG4vLyBpbnRlcmZhY2UgTzEge1xuLy8gICBsMjogc3RyaW5nO1xuLy8gICBvMjogTzI7XG4vLyAgIGExOiBBMVtdO1xuLy8gfVxuXG4vLyBpbnRlcmZhY2UgQTEge1xuLy8gICBsNDogc3RyaW5nO1xuLy8gfVxuXG4vLyBpbnRlcmZhY2UgTzIge1xuLy8gICBsMzogc3RyaW5nO1xuLy8gfVxuLy8gLy8gTm93IGxldCdzIHVzZSB0aGUgZnVuY3Rpb246XG4vLyBjb25zdCB4OiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxSb290T2JqZWN0PiA9IHtcbi8vICAgICBsMTogXCJsMVwiLFxuLy8gICAgIG8xOiB7XG4vLyAgICAgICAgIGwyOlwibDJcIixcbi8vICAgICAgICAgbzI6IHtcbi8vICAgICAgICAgICAgIGwzOiBcImwzXCIsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIGExOiBbXG4vLyAgICAgICAgICAgICB7IGw0OiBcImw0XCIgfVxuLy8gICAgICAgICBdXG4vLyAgICAgfSxcbi8vICAgICBkZWJ1Zzpcbi8vICAgICB7XG4vLyAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuLy8gICAgICAgICBsb2dUb0NvbnNvbGU6IGZhbHNlLFxuLy8gICAgICAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlXG4vLyAgICAgfVxuLy8gfVxuXG4vLyBsZXQgbSA6ICBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFJvb3RPYmplY3Q+PlxuXG4vLyBsZXQgeSA9IHRvT2JzZXJ2YWJsZU9iamVjdCh4LHt9IGFzIGFueSkgYXMgIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248Um9vdE9iamVjdD4+XG5cbi8vIGxldCBwID0geS5kZWJ1ZygpLmxpdmVDb25maWchKClcblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHRvT2JzZXJ2YWJsZU9iamVjdChvYmo6IGFueSwgZXhpc3RpbmdPYnNlcnZhYmxlcz86a28uT2JzZXJ2YWJsZTxhbnk+KToga28uT2JzZXJ2YWJsZSB7XG4vLyAgICAgY29uc3QgcmVzdWx0ID0gZXhpc3RpbmdPYnNlcnZhYmxlcyB8fCB7fSBhcyBrby5PYnNlcnZhYmxlO1xuXG4vLyAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4vLyAgICAgICAgIGlmKGtleSA9PT0gXCJfX2tvX21hcHBpbmdfX1wiKSBjb250aW51ZTtcbi8vICAgICAgICAgaWYoa2V5ID09PSBcIl9ob3N0XCIpIGNvbnRpbnVlO1xuXG4vLyAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4vLyAgICAgICAgICAgICBsZXQgbmV3diA9IG9ialtrZXldO1xuLy8gICAgICAgICAgICAgbGV0IGN1cnIgPSAocmVzdWx0IGFzIGFueSlba2V5XSA7XG5cbi8vICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShuZXd2KSAmJiB0eXBlb2YgbmV3diA9PT0gXCJvYmplY3RcIiAmJiBuZXd2ICE9PSBudWxsICYmICFrby5pc09ic2VydmFibGUobmV3dikpIHtcbi8vICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IHRvT2JzZXJ2YWJsZU9iamVjdChuZXd2IGFzIG9iamVjdCkgXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0b09ic2VydmFibGVPYmplY3RcIiwgKHJlc3VsdCBhcyBhbnkpW2tleV0pO1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0ga28ub2JzZXJ2YWJsZSgocmVzdWx0IGFzIGFueSlba2V5XSk7XG4vLyAgICAgICAgICAgICAgICAgY29udGludWU7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5ld3YpKSB7XG4vLyAgICAgICAgICAgICAgICAgaWYgKGN1cnIgJiYga28uaXNPYnNlcnZhYmxlQXJyYXkoY3VycikpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0obmV3dik7XG4vLyAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSBrby5vYnNlcnZhYmxlQXJyYXkobmV3dikgYXMgYW55O1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICBjb250aW51ZTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShuZXd2KSkge1xuLy8gICAgICAgICAgICAgICAgIG5ld3YgPSBuZXd2KCk7IC8vIHB1bGwgb3V0IHRoZSB2YWx1ZVxuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICBpZiAoY3VyciAmJiBrby5pc09ic2VydmFibGUoY3VycikpIHtcbi8vICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XShuZXd2KTsgLy8gdXBkYXRlIHRoZSBleGlzdGluZyBvYnNlcnZhYmxlXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0ga28ub2JzZXJ2YWJsZShuZXd2KTtcbiAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgIH1cblxuLy8gICAgIHJldHVybiByZXN1bHQ7XG4vLyB9XG4iLCJpbXBvcnQgeyBlcnIsIGwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vQ29tbW9uL0xvZ1wiO1xuaW1wb3J0IHsgZXh0cmFjdFZhbHVlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2hlbHBlcnMvVmFrdWVFeHRyYWN0b3JcIjtcbmltcG9ydCB7IGV2YWx1dGVSdWxlLCBleGVjdXRlRW1iZWRkZWRDb2RlLCBleGVjdXRlRnVuYyB9IGZyb20gXCIuLi8uLi8uLi8uLi9oZWxwZXJzL2V2YWx1dGVSdWxlXCI7XG5pbXBvcnQgeyBJRmllbGRQbGFjZW1lbnQsIElGaWVsZFJvd0ZpZWxkLCBJSWNvblJ1bGUsIElDU1NSdWxlLCBJRmllbGRSdWxlLCBJU3R5bGVFbnRyeSwgSVN0eWxlUnVsZSwgSU5hbWVWYWx1ZSwgSUNzc0NsYXNzRW50cnkgfSBmcm9tIFwiLi9JbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBUQ3VzdG9tQmluZGluZ0NvbnRleHQgfSBmcm9tIFwiLi9UZW1wbGF0ZUdlbmVyYXRvclwiO1xuXG5cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZUFwcGxpY2F0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cblxuICBzZXR1cEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIHZhbHVlQWNjZXNzb3I6ICgpID0+IGFueSwgYWxsQmluZGluZ3M6IGFueSwgdmlld01vZGVsOiBhbnksIGJpbmRpbmdDb250ZXh0OiBhbnkpIHtcbiAgICBsZXQgaW5zdHJ1Y3Rpb24gPSBhbGxCaW5kaW5ncygpLm1hdHRlclNlYXJjaEJpbmRpbmcgYXMgVEN1c3RvbUJpbmRpbmdDb250ZXh0XG4gICAgaWYgKCFpbnN0cnVjdGlvbikge1xuICAgICAgbChlcnIoXCJObyBpbnN0cnVjdGlvbiBkZWZpbmVkXCIpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGluc3RydWN0aW9uLnR5cGUgPT0gXCJJRmllbGRQbGFjZW1lbnRcIikge1xuICAgICAgbGV0IHJvd0ZpZWxkID0gaW5zdHJ1Y3Rpb24ub2JqZWN0IGFzIElGaWVsZFBsYWNlbWVudDtcbiAgICAgIHRoaXMuYnVpbGRQbGFjZW1lbnRzKHJvd0ZpZWxkLCBcImRhdGFDb250ZXh0TmFtZVwiLCB2aWV3TW9kZWwsIGVsZW1lbnQgYXMgSFRNTERpdkVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIHZhbHVlQWNjZXNzb3I6ICgpID0+IGFueSwgYWxsQmluZGluZ3M6IGFueSwgdmlld01vZGVsOiBhbnksIGJpbmRpbmdDb250ZXh0OiBhbnkpIHtcbiAgICBsKFwidXBkYXRlRWxlbWVudFwiLCBlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBhbGxCaW5kaW5ncywgdmlld01vZGVsLCBiaW5kaW5nQ29udGV4dClcblxuICB9XG5cblxuICBidWlsZFBsYWNlbWVudHMocGxhY2VtZW50OiBJRmllbGRQbGFjZW1lbnQsIGRhdGFDb250ZXh0TmFtZTogc3RyaW5nLCB2aWV3TW9kZWw6IGFueSwgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCkge1xuICAgIGxldCByb3dDb3VudGVyID0gMDtcbiAgICBjb25zdCByb290RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJvb3REaXYpO1xuXG4gICAgaWYgKHBsYWNlbWVudC5jb250YWluZXIpIHtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdlbXMtY29udGFpbmVyJyk7XG4gICAgICBsZXQgY29udGFpbmVyUGFyZW50ID0gY29udGFpbmVyLnBhcmVudEVsZW1lbnQgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICBpZiAoY29udGFpbmVyUGFyZW50KSB7XG4gICAgICAgIGNvbnRhaW5lclBhcmVudC5jbGFzc0xpc3QuYWRkKCdlbXMtY29udGFpbmVyLXBhcmVudCcpO1xuICAgICAgICB0aGlzLmFkZENTUyhwbGFjZW1lbnQuY29udGFpbmVyLmNzc0NsYXNzLCBjb250YWluZXJQYXJlbnQsIGRhdGFDb250ZXh0TmFtZSwgdmlld01vZGVsKTtcbiAgICAgICAgdGhpcy5hZGRTdHlsZShwbGFjZW1lbnQuY29udGFpbmVyLnN0eWxlLCBjb250YWluZXJQYXJlbnQsIGRhdGFDb250ZXh0TmFtZSwgdmlld01vZGVsKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIHJvb3REaXYuY2xhc3NMaXN0LmFkZCgnZmxleC1yb3cnKTtcbiAgICByb290RGl2LmNsYXNzTGlzdC5hZGQoJ2Vtcy1wbGFjZW1lbnQtaXRlbScpO1xuICAgIHJvb3REaXYuaWQgPSAncmVzdWx0SXRlbSc7XG4gICAgdGhpcy5hZGRDU1MocGxhY2VtZW50LmNzc0NsYXNzLCByb290RGl2LCBkYXRhQ29udGV4dE5hbWUsIHZpZXdNb2RlbCk7XG4gICAgdGhpcy5hZGRTdHlsZShwbGFjZW1lbnQuc3R5bGUsIHJvb3REaXYsIGRhdGFDb250ZXh0TmFtZSwgdmlld01vZGVsKTtcblxuICAgIGlmIChwbGFjZW1lbnQuaWNvbikge1xuICAgICAgdGhpcy5hZGRJY29ucyhwbGFjZW1lbnQuaWNvbiwgZGF0YUNvbnRleHROYW1lLCByb290RGl2LCB2aWV3TW9kZWwpO1xuICAgIH1cblxuICAgIGNvbnN0IGRpdlJvd0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdlJvd0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdlbXMtcm93LWNvbnRhaW5lcicpO1xuXG4gICAgcm9vdERpdi5hcHBlbmRDaGlsZChkaXZSb3dDb250YWluZXIpO1xuXG4gICAgcGxhY2VtZW50LnJvd3M/LmZvckVhY2gocm93ID0+IHtcbiAgICAgIHJvd0NvdW50ZXIrKztcbiAgICAgIGNvbnN0IHJvd0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcm93RGl2LnN0eWxlLmFsaWduSXRlbXMgPSByb3cuYWxpZ25JdGVtcyB8fCAnc3BhY2UtYmV0d2Vlbic7XG4gICAgICByb3dEaXYuY2xhc3NMaXN0LmFkZCgnZW1zLXJvdycgKyByb3dDb3VudGVyKTtcbiAgICAgIHJvd0Rpdi5jbGFzc0xpc3QuYWRkKCdlbXMtcm93Jyk7XG4gICAgICB0aGlzLmFkZENTUyhyb3cuY3NzQ2xhc3MsIHJvd0RpdiwgZGF0YUNvbnRleHROYW1lLCB2aWV3TW9kZWwpO1xuICAgICAgdGhpcy5hZGRTdHlsZShyb3cuc3R5bGUsIHJvd0RpdiwgZGF0YUNvbnRleHROYW1lLCB2aWV3TW9kZWwpO1xuICAgICAgcm93LmZpZWxkcz8uZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIHRoaXMuYWRkRmllbGQoZmllbGQsIGRhdGFDb250ZXh0TmFtZSwgcm93RGl2LCB2aWV3TW9kZWwpO1xuICAgICAgfSk7XG4gICAgICBkaXZSb3dDb250YWluZXIuYXBwZW5kQ2hpbGQocm93RGl2KTtcbiAgICB9KTtcbiAgfVxuXG5cblxuICBhZGRGaWVsZChmaWVsZDogSUZpZWxkUm93RmllbGQsIGRhdGFDb250ZXh0TmFtZTogc3RyaW5nLCByb3dEaXY6IEhUTUxEaXZFbGVtZW50LCB2aWV3TW9kZWw6IGFueSkge1xuICAgIGNvbnN0IGZpZWxkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZmllbGREaXYuY2xhc3NMaXN0LmFkZCgnZW1zLXJvdy1ncm91cCcpO1xuICAgIHRoaXMuYWRkQ1NTKGZpZWxkLmNzc0NsYXNzLCBmaWVsZERpdiwgZGF0YUNvbnRleHROYW1lLCB2aWV3TW9kZWwpO1xuXG4gICAgaWYgKGZpZWxkLndpZHRoKSBmaWVsZERpdi5zdHlsZS53aWR0aCA9IGAke2ZpZWxkLndpZHRofXB4YDtcbiAgICBpZiAoZmllbGQucG9zaXRpb24pIGZpZWxkRGl2LnN0eWxlLnRleHRBbGlnbiA9IGZpZWxkLnBvc2l0aW9uO1xuICAgIHRoaXMuYWRkU3R5bGUoZmllbGQuc3R5bGUsIGZpZWxkRGl2LCBkYXRhQ29udGV4dE5hbWUsIHZpZXdNb2RlbCk7XG5cbiAgICBpZiAoZmllbGQubGFiZWwpIHtcbiAgICAgIGNvbnN0IGxhYmVsRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICBsYWJlbEVsZW0udGV4dENvbnRlbnQgPSBmaWVsZC5sYWJlbDtcbiAgICAgIGxhYmVsRWxlbS5jbGFzc0xpc3QuYWRkKCdlbXMtbGFiZWwnKTtcbiAgICAgIGZpZWxkRGl2LmFwcGVuZENoaWxkKGxhYmVsRWxlbSk7XG4gICAgfVxuXG5cbiAgICB0aGlzLmFkZEljb25zKGZpZWxkLmljb24sIGRhdGFDb250ZXh0TmFtZSwgZmllbGREaXYsIHZpZXdNb2RlbCk7IC8vVE9ET1xuXG5cbiAgICBjb25zdCBzcGFuRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuXG5cbiAgICAvLyBhZGRDdXN0b21CaW5kaW5nKHNwYW5FbGVtLCBmaWVsZCxcIklGaWVsZFJvd0ZpZWxkXCIpO1xuICAgIC8vIGVsc2Uge1xuICAgIC8vICAgc3BhbkVsZW0uc2V0QXR0cmlidXRlKCdkYXRhLWJpbmQnLCBgdGV4dDoke2RhdGFDb250ZXh0TmFtZX0uJHtmaWVsZC5maWVsZH1gKTtcbiAgICAvLyB9XG4gICAgc3BhbkVsZW0uY2xhc3NMaXN0LmFkZCgnZW1zLWZpZWxkLXZhbHVlJyk7XG5cbiAgICBpZiAoZmllbGQuZmllbGQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5hZGRGaWVsZEFycmF5KGZpZWxkLmZpZWxkLCBmaWVsZC5mb3JtYXR0ZXIsIHNwYW5FbGVtLCB2aWV3TW9kZWwpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZmllbGQuZmllbGQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRoaXMuc2V0SW5uZXJIVE1MKGZpZWxkLmZpZWxkLCBmaWVsZC5mb3JtYXR0ZXIsIHZpZXdNb2RlbCwgc3BhbkVsZW0pO1xuICAgIH1cblxuICAgIGZpZWxkRGl2LmFwcGVuZENoaWxkKHNwYW5FbGVtKTtcbiAgICByb3dEaXYuYXBwZW5kQ2hpbGQoZmllbGREaXYpO1xuXG5cbiAgfVxuXG4gIHNldElubmVySFRNTCh2YWx1ZTogc3RyaW5nLCBmb3JtYXR0ZXI6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsIHZpZXdNb2RlbDogYW55LCBlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGxldCB2YWx1ZVRvU2V0ID0gZXh0cmFjdFZhbHVlKHZhbHVlLCB2aWV3TW9kZWwsIGZvcm1hdHRlcik7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSB2YWx1ZVRvU2V0O1xuICB9XG5cbiAgYWRkSWNvbnMoaWNvbnM6IElJY29uUnVsZVtdIHwgc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCwgZGF0YUNvbnRleHROYW1lOiBzdHJpbmcsIGZpZWxkRGl2OiBIVE1MRGl2RWxlbWVudCwgdmlld01vZGVsOiBhbnkpIHtcblxuICAgIGlmICghaWNvbnMpIHJldHVybjtcblxuICAgIGlmICh0eXBlb2YgaWNvbnMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGljb25zID0gW3sgaWNvbjogaWNvbnMgfV07XG4gICAgfVxuICAgIGljb25zLmZvckVhY2goaWNvblJ1bGUgPT4ge1xuICAgICAgLy8gPGRpdiBjbGFzcz1cImNvbHVtbi1hdXRvXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6NXB4XCI+XG4gICAgICAvLyA8c3BhbiBjbGFzcz1cImZhIGNhcmQtaWNvblwiIGRhdGEtYmluZD1cImNzczppY29uXCI+PC9zcGFuPlxuICAgICAgLy8gPC9kaXY+XG5cbiAgICAgIGNvbnN0IGljb25FbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgaWNvbkVsZW0uY2xhc3NOYW1lID0gJ2ZhIGNhcmQtaWNvbiAnICsgaWNvblJ1bGUuaWNvbjtcbiAgICAgIGljb25FbGVtLmNsYXNzTGlzdC5hZGQoJ2Vtcy1pY29uJyk7XG4gICAgICBpZiAoaWNvblJ1bGUuY3NzQ2xhc3MpIGljb25FbGVtLmNsYXNzTGlzdC5hZGQoaWNvblJ1bGUuY3NzQ2xhc3MpO1xuICAgICAgaWYgKHR5cGVvZiBpY29uUnVsZS5zdHlsZSA9PT0gXCJzdHJpbmdcIikgaWNvbkVsZW0uc2V0QXR0cmlidXRlKCdzdHlsZScsIGljb25SdWxlLnN0eWxlKTtcbiAgICAgIGlmIChpY29uUnVsZS5ydWxlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaWNvblJ1bGUucnVsZVwiLCBpY29uUnVsZS5ydWxlKTtcblxuICAgICAgICAvLyBsZXQgZnVsbFJ1bGVQYXRoID0gYCR7aWNvblJ1bGUucnVsZX1gXG4gICAgICAgIC8vIGlmIChkYXRhQ29udGV4dE5hbWUpIHtcbiAgICAgICAgLy8gICBmdWxsUnVsZVBhdGggPSBgJHtkYXRhQ29udGV4dE5hbWV9LiR7aWNvblJ1bGUucnVsZX1gO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gaWNvbkVsZW0uc2V0QXR0cmlidXRlKCdkYXRhLWJpbmQnLCBgdmlzaWJsZTokcm9vdC5ldmFsRnVuYyhcIiR7ZnVsbFJ1bGVQYXRofVwiLCR7ZGF0YUNvbnRleHROYW1lfSwgXCIke2RhdGFDb250ZXh0TmFtZX1cIilgKTtcbiAgICAgICAgbGV0IHZhbHVlID0gZXZhbHV0ZVJ1bGUoaWNvblJ1bGUucnVsZSwgdmlld01vZGVsKTtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgIGljb25FbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaWNvblJ1bGUucG9zaXRpb24gPT09ICdiZWZvcmUnKSB7XG4gICAgICAgIGZpZWxkRGl2Lmluc2VydEJlZm9yZShpY29uRWxlbSwgZmllbGREaXYuZmlyc3RDaGlsZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpY29uUnVsZS5wb3NpdGlvbiA9PT0gJ2FmdGVyJykge1xuICAgICAgICBmaWVsZERpdi5hcHBlbmRDaGlsZChpY29uRWxlbSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghaWNvblJ1bGUucG9zaXRpb24pIHtcbiAgICAgICAgZmllbGREaXYuYXBwZW5kQ2hpbGQoaWNvbkVsZW0pO1xuICAgICAgfVxuXG4gICAgfSk7XG4gIH1cblxuICBhZGRDU1MoY3NzQ2xhc3M6IElDc3NDbGFzc0VudHJ5LCByb290RGl2OiBIVE1MRGl2RWxlbWVudCwgZGF0YUNvbnRleHROYW1lOiBzdHJpbmcsIHZpZXdNb2RlbDogYW55KSB7XG5cbiAgICBpZiAodHlwZW9mIGNzc0NsYXNzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjc3NDbGFzcyA9IFt7IGNzc0NsYXNzOiBjc3NDbGFzcyB9XTtcbiAgICB9XG5cbiAgICBpZiAoY3NzQ2xhc3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgbGV0IGFyckl0ZW0gPSBjc3NDbGFzcyBhcyBJQ1NTUnVsZVtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJJdGVtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBjc3NSdWxlID0gYXJySXRlbVtpXTtcbiAgICAgICAgbGV0IGNzc1ZhbHVlID0gZXhlY3V0ZUVtYmVkZGVkQ29kZShjc3NSdWxlLmNzc0NsYXNzLCB2aWV3TW9kZWwpO1xuXG4gICAgICAgIGlmIChjc3NSdWxlLnJ1bGUpIHtcbiAgICAgICAgICBsZXQgY3VycmVudERhdGFCaW5kID0gcm9vdERpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcpIHx8ICcnO1xuICAgICAgICAgIGlmIChjdXJyZW50RGF0YUJpbmQpIHtcbiAgICAgICAgICAgIGN1cnJlbnREYXRhQmluZCArPSAnLCc7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vcm9vdERpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYmluZCcsIGAke2N1cnJlbnREYXRhQmluZH0gY3NzOiB7ICR7Y3NzUnVsZS5jc3NDbGFzc30gOiAkcm9vdC5ldmFsRnVuYyhcIiR7ZGF0YUNvbnRleHROYW1lfS4ke2Nzc1J1bGUucnVsZX1cIiwke2RhdGFDb250ZXh0TmFtZX0sIFwiJHtkYXRhQ29udGV4dE5hbWV9XCIpIH1gKTtcblxuICAgICAgICAgIGxldCBydWxlID0gY3NzUnVsZS5ydWxlO1xuXG4gICAgICAgICAgbGV0IHZhbHVlID0gZXZhbHV0ZVJ1bGUocnVsZSwgdmlld01vZGVsKTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJvb3REaXYuY2xhc3NMaXN0LmFkZChjc3NWYWx1ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcm9vdERpdi5jbGFzc0xpc3QuYWRkKGNzc1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgYWRkRmllbGRBcnJheShmaWVsZHM6IElGaWVsZFJ1bGVbXSB8IHVuZGVmaW5lZCB8IG51bGwsIGZvcm1hdHRlcjogc3RyaW5nIHwgbnVsbHwgdW5kZWZpbmVkLCBmaWVsZERpdjogSFRNTEVsZW1lbnQsIHZpZXdNb2RlbDogYW55KSB7XG5cblxuICAgIGlmICghZmllbGRzKSByZXR1cm47XG5cblxuICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcblxuXG5cbiAgICAgIGlmIChmaWVsZC5ydWxlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmllbGRSdWxlLnJ1bGVcIiwgZmllbGQucnVsZSk7XG4gICAgICAgIGxldCB2YWx1ZSA9IGV2YWx1dGVSdWxlKGZpZWxkLnJ1bGUsIHZpZXdNb2RlbCk7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuc2V0SW5uZXJIVE1MKGZpZWxkLmZpZWxkLCBmb3JtYXR0ZXIsIHZpZXdNb2RlbCwgZmllbGREaXYpO1xuICAgICAgICAgIC8vIGZpZWxkRGl2LmlubmVySFRNTCA9IGZpZWxkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnNldElubmVySFRNTChmaWVsZC5maWVsZCwgZm9ybWF0dGVyLCB2aWV3TW9kZWwsIGZpZWxkRGl2KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZFN0eWxlKHN0eWxlOiBJU3R5bGVFbnRyeSwgcm9vdERpdjogSFRNTERpdkVsZW1lbnQsIGRhdGFDb250ZXh0TmFtZTogc3RyaW5nLCB2aWV3TW9kZWw6IGFueSkge1xuICAgIGlmIChzdHlsZSA9PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICBpZiAodHlwZW9mIHN0eWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBzdHlsZSA9IFt7IHN0eWxlOiBzdHlsZSB9XTtcbiAgICB9XG5cbiAgICAvLyBpZighQXJyYXkuaXNBcnJheShzdHlsZSkpXG4gICAgLy8ge1xuICAgIC8vICAgc3R5bGUgPSBbc3R5bGVdO1xuICAgIC8vIH1cblxuICAgIGlmIChzdHlsZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBsZXQgYXJySXRlbSA9IHN0eWxlIGFzIElTdHlsZVJ1bGVbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJySXRlbS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc3R5bGVSdWxlID0gYXJySXRlbVtpXS5ydWxlO1xuXG5cbiAgICAgICAgaWYgKHN0eWxlUnVsZSkge1xuICAgICAgICAgIGxldCBjdXJyZW50RGF0YUJpbmQgPSByb290RGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJykgfHwgJyc7XG4gICAgICAgICAgaWYgKGN1cnJlbnREYXRhQmluZCkge1xuICAgICAgICAgICAgY3VycmVudERhdGFCaW5kICs9ICcsJztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy9yb290RGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1iaW5kJywgYCR7Y3VycmVudERhdGFCaW5kfSBjc3M6IHsgJHtjc3NSdWxlLmNzc0NsYXNzfSA6ICRyb290LmV2YWxGdW5jKFwiJHtkYXRhQ29udGV4dE5hbWV9LiR7Y3NzUnVsZS5ydWxlfVwiLCR7ZGF0YUNvbnRleHROYW1lfSwgXCIke2RhdGFDb250ZXh0TmFtZX1cIikgfWApO1xuICAgICAgICAgIGxldCB2YWx1ZSA9IGV2YWx1dGVSdWxlKHN0eWxlUnVsZSwgdmlld01vZGVsKTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGVzKHN0eWxlLCB2aWV3TW9kZWwsIGRhdGFDb250ZXh0TmFtZSwgcm9vdERpdilcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFN0eWxlcyhzdHlsZSwgdmlld01vZGVsLCBkYXRhQ29udGV4dE5hbWUsIHJvb3REaXYpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnNldFN0eWxlcyhzdHlsZSwgdmlld01vZGVsLCBkYXRhQ29udGV4dE5hbWUsIHJvb3REaXYpXG4gICAgfVxuXG4gIH1cblxuICBzZXRTdHlsZXMoc3R5bGU6IElTdHlsZUVudHJ5LCBkYXRhOiBhbnksIGRhdGFDb250ZXh0TmFtZTogc3RyaW5nLCByb290RGl2OiBIVE1MRWxlbWVudCk6IGFueSB7XG4gICAgbGV0IHJldFZhbHVlOiBJTmFtZVZhbHVlID0ge307XG5cbiAgICBpZiAoIXN0eWxlKSB7XG4gICAgICByZXR1cm4gXCJcIjtcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBzdHlsZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbGV0IG46IElTdHlsZVJ1bGUgPSB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYnVpbGRTdHlsZU5hbWVWYWx1ZShuLCByZXRWYWx1ZSk7XG4gICAgfVxuXG5cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHN0eWxlKSkge1xuICAgICAgbGV0IGFyckl0ZW0gPSBzdHlsZSBhcyBJU3R5bGVSdWxlW107XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcnJJdGVtKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyckl0ZW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgc3R5bGVSdWxlT3JOYW1lVmFsdWUgPSBhcnJJdGVtW2ldO1xuICAgICAgICAgIGlmIChzdHlsZVJ1bGVPck5hbWVWYWx1ZS5ydWxlKSB7XG4gICAgICAgICAgICBpZiAoZXZhbHV0ZVJ1bGUoc3R5bGVSdWxlT3JOYW1lVmFsdWUucnVsZSwgZGF0YSkpIHtcbiAgICAgICAgICAgICAgaWYgKCFzdHlsZVJ1bGVPck5hbWVWYWx1ZS5zdHlsZSkgY29udGludWU7XG4gICAgICAgICAgICAgIHJldFZhbHVlID0gdGhpcy5idWlsZFN0eWxlTmFtZVZhbHVlKHN0eWxlUnVsZU9yTmFtZVZhbHVlLCByZXRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0VmFsdWUgPSB0aGlzLmJ1aWxkU3R5bGVOYW1lVmFsdWUoc3R5bGVSdWxlT3JOYW1lVmFsdWUsIHJldFZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJJdGVtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBzdHlsZVJ1bGVPck5hbWVWYWx1ZSA9IGFyckl0ZW1baV07XG4gICAgICAgIGlmIChzdHlsZVJ1bGVPck5hbWVWYWx1ZS5ydWxlKSB7XG4gICAgICAgICAgaWYgKGV2YWx1dGVSdWxlKHN0eWxlUnVsZU9yTmFtZVZhbHVlLnJ1bGUsIGRhdGEpKSB7XG4gICAgICAgICAgICBpZiAoIXN0eWxlUnVsZU9yTmFtZVZhbHVlLnN0eWxlKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldFZhbHVlID0gdGhpcy5idWlsZFN0eWxlTmFtZVZhbHVlKHN0eWxlUnVsZU9yTmFtZVZhbHVlLCByZXRWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldFZhbHVlID0gdGhpcy5idWlsZFN0eWxlTmFtZVZhbHVlKHN0eWxlUnVsZU9yTmFtZVZhbHVlLCByZXRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG5cbiAgICAgIGlmICh0eXBlb2Ygc3R5bGUgPT09IFwib2JqZWN0XCIpIHsgLy9tdXN0IGJlIGEgTmFtZVZhbHVlXG4gICAgICAgIHJldFZhbHVlID0gc3R5bGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9sb29wIHRocm91Z2ggdGhlIHJldFZhbHVlIGFuZCBhZGQgc3R5bGVzIHRvIGVsZW1lbnRcbiAgICBmb3IgKGxldCBrZXkgaW4gcmV0VmFsdWUpIHtcbiAgICAgIGlmIChyZXRWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHJvb3REaXYuc3R5bGVba2V5IGFzIGFueV0gPSByZXRWYWx1ZVtrZXkgYXMgYW55XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIGJ1aWxkU3R5bGVOYW1lVmFsdWUocnVsZTogSVN0eWxlUnVsZSwgcmV0VmFsdWU6IElOYW1lVmFsdWUpIHtcblxuICAgIGlmICh0eXBlb2YgcnVsZS5zdHlsZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0VmFsdWUgPSB7IC4uLnJldFZhbHVlLCAuLi5ydWxlLnN0eWxlIH07XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBydWxlLnN0eWxlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBsZXQgc3R5bGVJdGVtcyA9IHJ1bGUuc3R5bGUuc3BsaXQoXCI7XCIpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHlsZUl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBzdHlsZUl0ZW0gPSBzdHlsZUl0ZW1zW2ldO1xuICAgICAgICBsZXQgbmFtZVZhbHVlID0gc3R5bGVJdGVtLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgaWYgKG5hbWVWYWx1ZS5sZW5ndGggPT0gMikge1xuICAgICAgICAgIHJldFZhbHVlW25hbWVWYWx1ZVswXS50cmltKCldID0gbmFtZVZhbHVlWzFdLnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0VmFsdWU7XG4gIH1cblxuXG5cbn1cblxuXG4iLCJcclxuaW1wb3J0IHsgZm9ybWF0VmFsdWUgfSBmcm9tIFwiLi4vLi4vLi4vaGVscGVycy9Gb3JtYXR0ZXJcIjtcclxuaW1wb3J0IHsgc2VhcmNoRm9yQXR0cmlidXRlUmVjdXJzaXZlIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9hcGkvc2VhcmNoRm9yQXR0cmlidXRlV2l0aFBhcmVudHNcIjtcclxuaW1wb3J0IHsgQmFzZUlERUFzcGVjdCB9IGZyb20gXCIuLi9CYXNlQ2xhc3Nlcy9CYXNlSURFQXNwZWN0XCI7XHJcbmltcG9ydCB7IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWcsIElXaWRnZXRKc29uIH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgRGVmYXVsdCwgSVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbiwgV2lkZ2V0U2V0dGluZ3MgfSBmcm9tIFwiLi9TaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ1wiO1xyXG5cclxubGV0IHRoaXNXaWRnZXRTeXN0ZW1OYW1lID0gXCJTaW5nbGVWYWx1ZUFzcGVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpbmdsZVZhbHVlQXNwZWN0IGV4dGVuZHMgQmFzZUlERUFzcGVjdDxJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uLCBhbnk+IHtcclxuICAgIGxpdmVDb25maWd1cmF0aW9uUmVmcmVzaGVkKCk6IHZvaWQge1xyXG4gICAgICAgIC8vbm90aGluZ1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaChuZXdDb25maWc6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vbm90aGluZ1xyXG4gICAgfVxyXG4gICAgcmVzZXQobmV3Q29uZmlnOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAvL25vdGhpbmdcclxuICAgIH1cclxuICAgIHNldFRoaXNDb21wb25lbnROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2luZ2xlVmFsdWVBc3BlY3RcIjtcclxuICAgIH1cclxuICAgIHNldFdpZGdldEpzb25TZXR0aW5ncygpOiBJV2lkZ2V0SnNvbjxJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIFdpZGdldFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERlZmF1bHRzKCk6IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8SVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiAgRGVmYXVsdFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogSVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbiwgYmFzZU1vZGVsOiBhbnkpIHtcclxuICAgIC8vICAgICBzdXBlcihcIlNpbmdsZVZhbHVlQXNwZWN0XCIsIFwiYXNwZWN0RGF0YS5vZHNFbnRpdHlQaWNrZXJcIiwgZWxlbWVudCwgY29uZmlndXJhdGlvbiwgYmFzZU1vZGVsKVxyXG4gICAgLy8gICAgIHRoaXMuc2V0dXAoKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBzZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHByaXZhdGUgaW5pdGlhbGlzZSgpIHsvLyEgTm90ZTogVUkgZnJhbWV3b3JrIGxvb2tzIGZvciB0aGlzIG1ldGhvZCBuYW1lIGFuZCBpZiBmb3VuZCBiZWhhdmVzIGRpZmZlcmVudGx5IGFuZCB3b250IGNhbGwgbG9hZEFuZEJpbmRcclxuXHJcbiAgICBhc3luYyBzZXR1cCgpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICB2YWx1ZTogXCJcIixcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMub3B0aW9ucz8udGl0bGUoKSB8fCBcIlRpdGxlIFZhbHVlXCJcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gTWFwIHRoZSByb2xlQ29uZmlnTW9kZWxzXHJcbiAgICAgICAgdGhpcy5vcHRpb25zPy5maWVsZFBhdGguc3Vic2NyaWJlKChuZXdWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZyhcIkZpZWxkIHBhdGggY2hhbmdlZFwiLCBcImdyZWVuXCIsbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRBbmRCaW5kKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPy5jYWxjdWxhdGVkVGl0bGUodGhpcy5vcHRpb25zPy50aXRsZSgpIHx8IFwiVGl0bGUgVmFsdWVcIik7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zPy50aXRsZS5zdWJzY3JpYmUoKG5ld1ZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiVGl0bGUgY2hhbmdlZFwiLCBcImdyZWVuXCIsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgaWYobmV3VmFsdWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnM/LmNhbGN1bGF0ZWRUaXRsZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvdmVycmlkZSBsb2FkQW5kQmluZCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5sb2coXCJMb2FkaW5nIGRhdGEgKG1vZGVsKSBwYXNzZWQgaW5cIiwgXCJncmVlblwiKTtcclxuICAgICAgICAvLyBzdXBlci5sb2FkQW5kQmluZCgpOyAvL05vIG5lZWQgdG8gbG9hZCBhbmQgYmluZCBhcyB3ZSBhcmUgbm90IHVzaW5nIHRoZSBiYXNlIG1vZGVsXHJcblxyXG4gICAgICAgIGxldCBzaGFyZWRvSWQgPSB0aGlzLnNoYXJlZG9JZCgpO1xyXG5cclxuICAgICAgICBpZighc2hhcmVkb0lkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBzaGFyZWRvSWQgcGFzc2VkIGluXCIsIFwicmVkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighdGhpcy5vcHRpb25zPy5maWVsZFBhdGgoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gZmllbGQgcGF0aCBwYXNzZWQgaW5cIiwgXCJyZWRcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlYXJjaEZvckF0dHJpYnV0ZVJlY3Vyc2l2ZShzaGFyZWRvSWQsIHRoaXMub3B0aW9ucz8uZmllbGRQYXRoKCkhLCB0aGlzLm9wdGlvbnM/LmRhdGFTZXR0aW5ncygpLmdldFZhbHVlVXNpbmdQYXJlbnRzKCksIHRoaXMub3B0aW9ucz8uZGF0YVNldHRpbmdzKCkubWF4RGVwdGgoKSkudGhlbigoZGF0YSk9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFkYXRhIHx8IGRhdGEuZm91bmQgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gZGF0YSByZXR1cm5lZFwiLCBcInJlZFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucz8uY2FsY3VsYXRlZFZhbHVlKHRoaXMub3B0aW9ucz8udmFsdWVPbk5vdEZvdW5kKCkgfHwgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybWF0dGVkVmFsdWUgPSBmb3JtYXRWYWx1ZShkYXRhLnZhbHVlLCB0aGlzLm9wdGlvbnM/LmZvcm1hdHRlcigpIHx8IFwidmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnM/LmNhbGN1bGF0ZWRWYWx1ZShmb3JtYXR0ZWRWYWx1ZSB8fCBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBvdmVycmlkZSBhc3luYyBvblNhdmUobW9kZWw6IGFueSkge1xyXG5cclxuICAgICAgICB0aGlzLmxvZyhcIk5vIFNhdmUgSW1wbGVtZW50ZWRcIiwgXCJncmVlblwiKTtcclxuICAgICAgICAvLyBzdXBlci5vblNhdmUobW9kZWwpO1xyXG5cclxuICAgIH07XHJcbn0gIiwiaW1wb3J0IHsgREVCVUdfREVGQVVMVCwgREVGQVVMVF9FUlJPUl9NQU5BR0VNRU5UX1NFVFRJTkdTIH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0RlZmF1bHRTZXR0aW5nc1wiO1xuaW1wb3J0IHsgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZywgSVdpZGdldEpzb24gfSBmcm9tIFwiLi4vQmFzZUNsYXNzZXMvSW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24ge1xuICAgIGZpZWxkUGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsXG4gICAgdmFsdWVPbk5vdEZvdW5kOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgY2FsY3VsYXRlZFZhbHVlOiBzdHJpbmc7XG4gICAgY2FsY3VsYXRlZFRpdGxlOiBzdHJpbmc7XG4gICAgZm9ybWF0dGVyOiBzdHJpbmcgfCB1bmRlZmluZWQsXG59XG5cblxuZXhwb3J0IGNvbnN0IERlZmF1bHQ6IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8SVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbj4gPSB7XG4gXG4gICAgZmllbGRQYXRoOiBcInRpdGxlXCIsXG4gICAgdGl0bGU6IG51bGwsXG4gICAgY2FsY3VsYXRlZFZhbHVlOiBcIlwiLFxuICAgIGNhbGN1bGF0ZWRUaXRsZTogXCJcIixcbiAgICB2YWx1ZU9uTm90Rm91bmQ6IFwiTm90IEZvdW5kXCIsXG4gICAgZm9ybWF0dGVyOiBcInZhbHVlXCIsLy9pZihwcmlvcml0eS5uYW1lID09PSAnbm9ybWFsJykgeyAgICAgICAgIHJldHVybiA9ICc8c3BhbiBjbGFzcz1cIm5vcm1hbFwiPk5vcm1hbCBQcmlvcml0eTwvc3Bhbj4nOyAgICAgfSBlbHNlIGlmKHByaW9yaXR5Lm5hbWUgPT09ICdoaWdoJykgeyAgICAgICAgIHJldHVybiA9ICc8c3BhbiBjbGFzcz1cImhpZ2hcIj5IaWdoIFByaW9yaXR5PC9zcGFuPic7ICAgICB9IGVsc2UgaWYocHJpb3JpdHkubmFtZSA9PT0gJ3VyZ2VudCcpIHsgICAgICAgICByZXR1cm4gPSAnPHNwYW4gY2xhc3M9XCJ1cmdlbnRcIj5VcmdlbnQgUHJpb3JpdHk8L3NwYW4+JzsgICAgIH0gZWxzZSB7ICAgICAgICAgcmV0dXJuID0gJzxzcGFuPlVua25vd24gUHJpb3JpdHk8L3NwYW4+JzsgICAgIH1cbiAgICBkZWJ1ZzogREVCVUdfREVGQVVMVCgpLFxuICAgIFxuICAgIGV2ZW50c1RvUmVhY3RUbzogW1xuICAgICAgICB7XG4gICAgICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby5jb3JlLmNhc2UucGhhc2UtY2hhbmdlZFwiLFxuICAgICAgICAgICAgbWV0aG9kVG9DYWxsOiBcImxvYWRBbmRCaW5kXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZXZlbnRQYXRoOiBcInNoYXJlZG8uY29yZS5jYXNlLmZvcm1zLnBoYXNlLnBoYXNlLWNoYW5nZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLnVwZGF0ZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLmNvcmUuY2FzZS5zaGFyZWRvLXVwZGF0ZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH1cbiAgICBdLFxuICAgIHJlZnJlc2hPbjoge1xuICAgICAgICBzaGFyZWRvSWRDaGFuZ2VkOiB0cnVlLFxuICAgICAgICBzaGFyZWRvUGFyZW50SWRDaGFuZ2VkOiB0cnVlLFxuICAgICAgICBzaGFyZWRvUGhhc2VDaGFuZ2VkOiB0cnVlLFxuICAgIH0sXG4gICAgZGF0YVNldHRpbmdzOiB7XG4gICAgICAgIGdldFZhbHVlVXNpbmdQYXJlbnRzOiBmYWxzZSxcbiAgICAgICAgbWF4RGVwdGg6IDAsXG4gICAgfSxcbiAgICBlcnJvck1hbmFnZW1lbnQ6IERFRkFVTFRfRVJST1JfTUFOQUdFTUVOVF9TRVRUSU5HUyxcblxuXG59XG5cbmV4cG9ydCBjb25zdCBXaWRnZXRTZXR0aW5ncyA6IElXaWRnZXRKc29uPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+ID17XG4gICAgdHlwZTogXCJ3aWRnZXRcIixcbiAgICBcInByaW9yaXR5XCI6IDYwMDAsXG4gICAgXCJkZXNpZ25lclwiOiB7XG4gICAgICAgIFwiYWxsb3dJblBvcnRhbERlc2lnbmVyXCI6IGZhbHNlLFxuICAgICAgICBcImFsbG93SW5TaGFyZWRvUG9ydGFsRGVzaWduZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJhbGxvd0FzcGVjdEFkYXB0ZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJ0aXRsZVwiOiBcIlNpbmdsZSBWYWx1ZSBBc3BlY3RcIixcbiAgICAgICAgXCJpY29uXCI6IFwiZmEtY29nXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJTaW5nbGUgVmFsdWUgQXNwZWN0XCIsXG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbICAgXCJVRCAtIElERUFzcGVjdHNcIl0sXG4gICAgICAgIFwiaXNDb25maWd1cmFibGVcIjogdHJ1ZSxcbiAgICAgICAgXCJjb25maWd1cmF0aW9uV2lkZ2V0XCI6IG51bGwsXG4gICAgICAgIFwiZGVmYXVsdENvbmZpZ3VyYXRpb25Kc29uXCI6IHsgY29uZmlndXJhdGlvbjogRGVmYXVsdH1cbiAgICB9LFxuICAgIFwic2NyaXB0c1wiOiBbXG4gICAgXSxcbiAgICBcInN0eWxlc1wiOiBbXG4gICAgICAgIFwiU2luZ2xlVmFsdWVBc3BlY3QuY3NzXCJcbiAgICBdLFxuICAgIFwidGVtcGxhdGVzXCI6IFtcbiAgICAgICAgXCJTaW5nbGVWYWx1ZUFzcGVjdC5odG1sXCJcbiAgICBdLFxuICAgIFwibWVudVRlbXBsYXRlc1wiOiBbXSxcbiAgICBcImNvbXBvbmVudHNcIjogW11cbn0iLCJpbXBvcnQgeyBJV2lkZ2V0SnNvbiB9IGZyb20gXCIuLi8uLi9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0ludGVyZmFjZXNcIjtcbmltcG9ydCB7IElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24sIERlZmF1bHQgfSBmcm9tIFwiLi4vLi4vSURFQXNwZWN0cy9TaW5nbGVWYWx1ZUFzcGVjdC9TaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTaW5nbGVWYWx1ZVBvcnRhbENvbmZpZ3VyYXRpb24gZXh0ZW5kcyBJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uIHtcbiAgICBcbn1cblxuZXhwb3J0IGNvbnN0IFNpbmdsZVZhbHVlUG9ydGFsRGVmYXVsdCA9IERlZmF1bHQ7XG5cbmV4cG9ydCBjb25zdCBXaWRnZXRTZXR0aW5ncyA6IElXaWRnZXRKc29uPElTaW5nbGVWYWx1ZVBvcnRhbENvbmZpZ3VyYXRpb24+ID17XG4gICAgdHlwZTogXCJ3aWRnZXRcIixcbiAgICBcInByaW9yaXR5XCI6IDYwMDAsXG4gICAgXCJkZXNpZ25lclwiOiB7XG4gICAgICAgIFwiYWxsb3dJblBvcnRhbERlc2lnbmVyXCI6IHRydWUsXG4gICAgICAgIFwiYWxsb3dJblNoYXJlZG9Qb3J0YWxEZXNpZ25lclwiOiB0cnVlLFxuICAgICAgICBcImFsbG93QXNwZWN0QWRhcHRlclwiOiBmYWxzZSxcbiAgICAgICAgXCJ0aXRsZVwiOiBcIlNpbmdsZSBWYWx1ZSBQb3J0YWwgV2lkZ2V0XCIsXG4gICAgICAgIFwiaWNvblwiOiBcImZhLWNvZ1wiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiU2hvdyBhIHNpbmdsZSB2YWx1ZSBpbiBhIHBvcnRhbCB3aWRnZXRcIixcbiAgICAgICAgXCJjYXRlZ29yaWVzXCI6IFsgICBcIlVEIC0gSURFQXNwZWN0c1wiXSxcbiAgICAgICAgXCJpc0NvbmZpZ3VyYWJsZVwiOiB0cnVlLFxuICAgICAgICBcImNvbmZpZ3VyYXRpb25XaWRnZXRcIjogXCJQb3J0YWxXaWRnZXRzLlNpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0RGVzaWduZXJcIixcbiAgICAgICAgXCJkZWZhdWx0Q29uZmlndXJhdGlvbkpzb25cIjogeyBjb25maWd1cmF0aW9uOiBEZWZhdWx0fVxuICAgIH0sXG4gICAgXCJzY3JpcHRzXCI6IFtcbiAgICBdLFxuICAgIFwic3R5bGVzXCI6IFtcbiAgICAgICAgXCJTaW5nbGVWYWx1ZVBvcnRhbFdpZGdldC5jc3NcIlxuICAgIF0sXG4gICAgXCJ0ZW1wbGF0ZXNcIjogW1xuICAgICAgICBcIlNpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0Lmh0bWxcIlxuICAgIF0sXG4gICAgXCJtZW51VGVtcGxhdGVzXCI6IFtdLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXVxufSIsIlxuXG4vKipcbiAqICogRm9ybWF0IGEgdmFsdWUgdXNpbmcgYSBmb3JtYXR0ZXIgc3RyaW5nXG4gKiAqIEV4YW1wbGVzOiBcbiAqICogMS4gdmFsdWVcbiAqICogMi4gdmFsdWUudG9VcHBlckNhc2UoKVxuICogKiAzLiB2YWx1ZSA/IHZhbHVlLnRvVXBwZXJDYXNlKCkgOiBcIlwiXG4gKiAqIDQuIHZhbHVlID8gdmFsdWUudG9VcHBlckNhc2UoKSA6IFwiTm8gVmFsdWVcIlxuICogKiA1LiBuZXcgRGF0ZSh2YWx1ZSkudG9Mb2NhbGVEYXRlU3RyaW5nKClcbiAqICogNi4gdmFsdWUgPyBuZXcgRGF0ZSh2YWx1ZSkudG9Mb2NhbGVEYXRlU3RyaW5nKCkgOiBcIlwiXG4gKiBAcGFyYW0gdmFsdWUgXG4gKiBAcGFyYW0gZm9ybWF0dGVyIFxuICogQHJldHVybnMgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRWYWx1ZSh2YWx1ZTogYW55LCBmb3JtYXR0ZXI6IHN0cmluZyk6IGFueSB7XG4gICAgLy8gQ3JlYXRlIGEgbmV3IGZ1bmN0aW9uIGJhc2VkIG9uIHRoZSBmb3JtYXR0ZXJcbiAgICBsZXQgZHluYW1pY0Z1bmMgOiBGdW5jdGlvblxuICAgIGxldCByZXR1cm5WYWx1ZTogYW55O1xuICAgIHRyeXtcbiAgICAgICAgIGR5bmFtaWNGdW5jID0gbmV3IEZ1bmN0aW9uKCd2YWx1ZScsIGByZXR1cm4gKCR7Zm9ybWF0dGVyfSk7YCk7XG4gICAgLy8gSW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBnaXZlbiB2YWx1ZVxuICAgICByZXR1cm5WYWx1ZSA9IGR5bmFtaWNGdW5jKHZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2goZSlcbiAgICB7XG4gICAgICAgIHJldHVyblZhbHVlID0gYEVycm9yIGZvcm1hdHRpbmcgdmFsdWUgJHt2YWx1ZX0gd2l0aCBmb3JtYXR0ZXIgJHtmb3JtYXR0ZXJ9IC0gJHtlfWA7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxuZXhwb3J0IGNvbnN0IGZvcm1hdEZ1bmMgPSBmb3JtYXRWYWx1ZTsgLy8gRm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IiwiaW1wb3J0IHsgZXhlY3V0ZUVtYmVkZGVkQ29kZSwgZXhlY3V0ZUZ1bmMgfSBmcm9tIFwiLi9ldmFsdXRlUnVsZVwiO1xuaW1wb3J0IHsgZm9ybWF0RnVuYyB9IGZyb20gXCIuL0Zvcm1hdHRlclwiO1xuXG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGV4dHJhY3QgdGhlIHZhbHVlIGZyb20gdGhlIHZhbHVlIHN0cmluZy5cbiAqIFRoZSB2YWx1ZSBzdHJpbmcgY2FuIGJlIGEgc2ltcGxlIHN0cmluZywgb3IgYSBmdW5jdGlvbiBjYWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBleHRyYWN0IG9yIGNhbGN1bGF0ZWQgdmFsdWVcbiAqIEBwYXJhbSB2aWV3TW9kZWwgVGhlIHZpZXcgbW9kZWwgdG8gdXNlIGZvciB0aGUgZnVuY3Rpb24gY2FsbCBhbmQgZGF0YSBjb250ZXh0XG4gKiBAcGFyYW0gZm9ybWF0dGVyIEEgZm9ybWF0dGVyIHRvIHVzZSBvbiB0aGUgdmFsdWUgZS5nLiB2YWx1ZS5Ub1VwcGVyKClcbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFZhbHVlKHZhbHVlOiBzdHJpbmcsIHZpZXdNb2RlbDogYW55LCBmb3JtYXR0ZXI6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsZGF0YUNvbnRleHROYW1lPzpzdHJpbmcpIHtcbiAgICBsZXQgdmFsdWVUb1NldCA9IGV4ZWN1dGVFbWJlZGRlZENvZGUodmFsdWUsIHZpZXdNb2RlbCxkYXRhQ29udGV4dE5hbWUpO1xuICBcbiAgICBpZiAodHlwZW9mIHZhbHVlVG9TZXQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHZhbHVlVG9TZXQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZVRvU2V0LCBudWxsLCAyKTtcbiAgICB9XG4gIFxuICAgIGlmIChmb3JtYXR0ZXIpIHtcbiAgICAgIHZhbHVlVG9TZXQgPSBmb3JtYXRGdW5jKHZhbHVlVG9TZXQsIGZvcm1hdHRlcik7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVRvU2V0O1xuICB9IiwiaW1wb3J0IHsgZGF0YSB9IGZyb20gXCJqcXVlcnlcIjtcbmltcG9ydCB7IEpzb25Ub0h0bWxDb252ZXJ0ZXIgfSBmcm9tIFwiLi4vQ29tbW9uL0pzb25Ub0hUTUxDb252ZXJ0ZXJcIjtcbmltcG9ydCB7IGwsIGluZiwgZXJyLCBsaDEgfSBmcm9tIFwiLi4vQ29tbW9uL0xvZ1wiO1xuaW1wb3J0IHsgdXRmOFRvQmFzZTY0IH0gZnJvbSBcIi4uL0NvbW1vbi9CYXNlNjRFbmNvZGluZ1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZXZhbHV0ZVJ1bGUocnVsZTogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCwgZGF0YUNvbnRleHQ6IGFueSwgZGF0YUNvbnRleHROYW1lPzogc3RyaW5nKTogYm9vbGVhbiB7XG5cbiAgaWYgKCFydWxlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXR1cm5WYWx1ZTogYW55ID0gZXhlY3V0ZUZ1bmMocnVsZSwgZGF0YUNvbnRleHQsIGRhdGFDb250ZXh0TmFtZSk7XG4gICAgaWYgKHR5cGVvZiByZXR1cm5WYWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGwoZXJyKChgUnVsZSBbJHtydWxlfV0gZGlkIG5vdCByZXR1cm4gYSBib29sZWFuIHZhbHVlLiBJdCByZXR1cm5lZDogJHtyZXR1cm5WYWx1ZX1gKSkpO1xuICAgICAgcmV0dXJuIGZhbHNlOyAvLyBEZWZhdWx0IHZhbHVlIGlmIHRoZSBydWxlIGRvZXNuJ3QgcmV0dXJuIGEgYm9vbGVhblxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGBFcnJvciBldmFsdWF0aW5nIHJ1bGUgWyR7cnVsZX1dIHdpdGggZGF0YSBjb250ZXh0YCwgZSk7XG4gICAgcmV0dXJuIGZhbHNlOyAvLyBEZWZhdWx0IHZhbHVlIGluIGNhc2Ugb2YgYW4gZXJyb3JcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUZ1bmMoZXhwcmVzc2lvbjogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCwgZGF0YUNvbnRleHQ6IGFueSwgZGF0YUNvbnRleHROYW1lPzogc3RyaW5nKSB7XG4gIC8vIENyZWF0ZSBhIG5ldyBmdW5jdGlvbiBiYXNlZCBvbiB0aGUgZm9ybWF0dGVyXG4gIGwoaW5mKGBldmFsdXRlUnVsZSgke2V4cHJlc3Npb259KWApLCBkYXRhQ29udGV4dCk7XG5cbiAgaWYgKGV4cHJlc3Npb24gPT09IFwiXCIpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGlmICghZXhwcmVzc2lvbikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgbGV0IGR5bmFtaWNGdW5jOiBGdW5jdGlvblxuICB0cnkge1xuICAgIGxldCBkYXRhQ29udGV4dE5hbWVUb1VzZSA9ICdkYXRhQ29udGV4dCc7XG5cbiAgICAvL3JlcGxhY2UgdGhlIGRhdGFDb250ZXh0TmFtZSB3aXRoIHRoZSBkYXRhQ29udGV4dE5hbWVUb1VzZVxuICAgIC8vIFJlcGxhY2UgdGhlIGRhdGFDb250ZXh0TmFtZSB3aXRoIHRoZSBkYXRhQ29udGV4dE5hbWVUb1VzZVxuICAgIGlmIChkYXRhQ29udGV4dE5hbWUpIHtcblxuICAgICAgLy8gRXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiB0aGUgc3RyaW5nIGZvciB1c2UgaW4gcmVndWxhciBleHByZXNzaW9uc1xuICAgICAgY29uc3QgZXNjYXBlZERhdGFDb250ZXh0TmFtZSA9IGRhdGFDb250ZXh0TmFtZS5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpO1xuXG4gICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoZXNjYXBlZERhdGFDb250ZXh0TmFtZSwgJ2cnKTtcbiAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UocmVnZXgsIGRhdGFDb250ZXh0TmFtZVRvVXNlKTtcbiAgICB9XG5cbiAgICBjaGVja0FuZExvZ1VuZGVmaW5lZChkYXRhQ29udGV4dCwgZXhwcmVzc2lvbiwgZGF0YUNvbnRleHROYW1lVG9Vc2UpO1xuXG5cblxuXG4gICAgZHluYW1pY0Z1bmMgPSBuZXcgRnVuY3Rpb24oYCR7ZGF0YUNvbnRleHROYW1lVG9Vc2V9YCwgYHJldHVybiAoJHtleHByZXNzaW9ufSk7YCk7XG5cbiAgfVxuICBjYXRjaCAoZSkge1xuICAgIGxldCBlcnJNZXNzYWdlID0gYEVycm9yIGNyZWF0aW5nIGZ1bmN0aW9uIGZvciBleHByZXNzaW9uIFske2V4cHJlc3Npb259XWA7XG4gICAgbChlcnIoZXJyTWVzc2FnZSksIGUpO1xuICAgIHJldHVybiBlcnJNZXNzYWdlO1xuICB9XG5cblxuICBsKGluZihgZXZhbHV0ZVJ1bGUoJHtleHByZXNzaW9ufSkgLSBkeW5hbWljRnVuYzogYCksIGR5bmFtaWNGdW5jKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJldHVyblZhbHVlOiBhbnkgPSBkeW5hbWljRnVuYyhkYXRhQ29udGV4dCk7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coYEVycm9yIGV2YWx1YXRpbmcgcnVsZSBbJHtleHByZXNzaW9ufV0gd2l0aCBkYXRhIGNvbnRleHRgLCBlKTtcbiAgICByZXR1cm4gYCR7ZX1gOyAvLyBEZWZhdWx0IHZhbHVlIGluIGNhc2Ugb2YgYW4gZXJyb3JcbiAgfVxufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQW5kTG9nVW5kZWZpbmVkKG9iajogYW55LCBydWxlOiBzdHJpbmcsIGRhdGFDb250ZXh0TmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHByb3BzID0gcnVsZS5zcGxpdCgnLicpO1xuICBsZXQgY3VycmVudDogYW55ID0ge307XG4gIGN1cnJlbnRbZGF0YUNvbnRleHROYW1lXSA9IG9iajtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGN1cnJlbnRbcHJvcHNbaV1dID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGwoZXJyKGBFcnJvciB3aGlsZSBldmFsdWF0aW5nIGEgcnVsZSAke3J1bGV9ISBUaGUgcHJvcGVydHkgJHtkYXRhQ29udGV4dE5hbWV9LiR7cHJvcHMuc2xpY2UoMCwgaSArIDEpLmpvaW4oJy4nKX0gaXMgdW5kZWZpbmVkLmApKTtcbiAgICAgIGwoZXJyKGBDaGVjayB0aGUgY29uZmlndXJhdGlvbiBvZiB0aGUgcnVsZSAke3J1bGV9IWApKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BzW2ldXTtcbiAgfVxuXG4gIHJldHVybiBjdXJyZW50O1xufVxuXG5cbi8qKlxuICogRXhhbXBsZTogXCJ0aXRsZTogJHt0aXRsZS50b1VwcGVyQ2FzZSgpfSBNYXR0ZXIgU2VhcmNoICR7MiArIDJ9XCJcbiAqIFJlc3VybjogXCJ0aXRsZTogVElUTEUgTUFUVEVSIFNFQVJDSCA0XCJcbiAqIEBwYXJhbSBpbnB1dCBcbiAqIEBwYXJhbSBkYXRhQ29udGV4dCBcbiAqIEBwYXJhbSBkYXRhQ29udGV4dE5hbWUgXG4gKiBAcmV0dXJucyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVFbWJlZGRlZENvZGUoaW5wdXQ6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwsIGRhdGFDb250ZXh0OiBhbnksIGRhdGFDb250ZXh0TmFtZT86IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgaWYgKCFpbnB1dCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL1xcJFxceyguKz8pXFx9L2csIChfLCBjb2RlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFdBUk5JTkc6IEV2YWwgY2FuIGV4ZWN1dGUgYXJiaXRyYXJ5IGNvZGUgYW5kIGlzIHVuc2FmZVxuICAgICAgLy8gT25seSB1c2Ugd2l0aCB0cnVzdGVkIGlucHV0XG5cbiAgICAgIGRhdGFDb250ZXh0W1wiaGVscGVyc1wiXSA9IGRhdGFDb250ZXh0W1wiaGVscGVyc1wiXSB8fCB7fTtcbiAgICAgIGRhdGFDb250ZXh0W1wiaGVscGVyc1wiXS51dGY4VG9CYXNlNjQgPSB1dGY4VG9CYXNlNjQ7XG4gXG4gICAgICBsZXQgdmFsID0gZXhlY3V0ZUZ1bmMoY29kZSwgZGF0YUNvbnRleHQsIGRhdGFDb250ZXh0TmFtZSk7XG4gICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsID0gJyc7XG4gICAgICB9XG4gICAgICAvLyB2YWwgPSBKU09OLnN0cmluZ2lmeSh2YWwsIHVuZGVmaW5lZCwgMik7XG5cbiAgICAgIHZhbCA9IEpzb25Ub0h0bWxDb252ZXJ0ZXIuY29udmVydCh2YWwpO1xuICAgICAgXG4gICAgICAvL3JlbW92ZSBvdXR0ZXIgXCIgZnJvbSB2YWxcbiAgICAgIC8vIHZhbCA9IHZhbC5zdWJzdHJpbmcoMSwgdmFsLmxlbmd0aCAtIDEpO1xuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZXhlY3V0ZSBlbWJlZGRlZCBjb2RlOicsIGVycm9yKTtcblxuICAgICAgbGV0IHZhbCA9ICcnO1xuICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgdmFsID0gZXJyb3IubWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YWwgPSBKU09OLnN0cmluZ2lmeShlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgIH1cbiAgfSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGtvOyIsImltcG9ydCBhbnNpU3R5bGVzIGZyb20gJyNhbnNpLXN0eWxlcyc7XG5pbXBvcnQgc3VwcG9ydHNDb2xvciBmcm9tICcjc3VwcG9ydHMtY29sb3InO1xuaW1wb3J0IHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvb3JkZXJcblx0c3RyaW5nUmVwbGFjZUFsbCxcblx0c3RyaW5nRW5jYXNlQ1JMRldpdGhGaXJzdEluZGV4LFxufSBmcm9tICcuL3V0aWxpdGllcy5qcyc7XG5cbmNvbnN0IHtzdGRvdXQ6IHN0ZG91dENvbG9yLCBzdGRlcnI6IHN0ZGVyckNvbG9yfSA9IHN1cHBvcnRzQ29sb3I7XG5cbmNvbnN0IEdFTkVSQVRPUiA9IFN5bWJvbCgnR0VORVJBVE9SJyk7XG5jb25zdCBTVFlMRVIgPSBTeW1ib2woJ1NUWUxFUicpO1xuY29uc3QgSVNfRU1QVFkgPSBTeW1ib2woJ0lTX0VNUFRZJyk7XG5cbi8vIGBzdXBwb3J0c0NvbG9yLmxldmVsYCDihpIgYGFuc2lTdHlsZXMuY29sb3JbbmFtZV1gIG1hcHBpbmdcbmNvbnN0IGxldmVsTWFwcGluZyA9IFtcblx0J2Fuc2knLFxuXHQnYW5zaScsXG5cdCdhbnNpMjU2Jyxcblx0J2Fuc2kxNm0nLFxuXTtcblxuY29uc3Qgc3R5bGVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuY29uc3QgYXBwbHlPcHRpb25zID0gKG9iamVjdCwgb3B0aW9ucyA9IHt9KSA9PiB7XG5cdGlmIChvcHRpb25zLmxldmVsICYmICEoTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmxldmVsKSAmJiBvcHRpb25zLmxldmVsID49IDAgJiYgb3B0aW9ucy5sZXZlbCA8PSAzKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignVGhlIGBsZXZlbGAgb3B0aW9uIHNob3VsZCBiZSBhbiBpbnRlZ2VyIGZyb20gMCB0byAzJyk7XG5cdH1cblxuXHQvLyBEZXRlY3QgbGV2ZWwgaWYgbm90IHNldCBtYW51YWxseVxuXHRjb25zdCBjb2xvckxldmVsID0gc3Rkb3V0Q29sb3IgPyBzdGRvdXRDb2xvci5sZXZlbCA6IDA7XG5cdG9iamVjdC5sZXZlbCA9IG9wdGlvbnMubGV2ZWwgPT09IHVuZGVmaW5lZCA/IGNvbG9yTGV2ZWwgOiBvcHRpb25zLmxldmVsO1xufTtcblxuZXhwb3J0IGNsYXNzIENoYWxrIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdHJ1Y3Rvci1yZXR1cm5cblx0XHRyZXR1cm4gY2hhbGtGYWN0b3J5KG9wdGlvbnMpO1xuXHR9XG59XG5cbmNvbnN0IGNoYWxrRmFjdG9yeSA9IG9wdGlvbnMgPT4ge1xuXHRjb25zdCBjaGFsayA9ICguLi5zdHJpbmdzKSA9PiBzdHJpbmdzLmpvaW4oJyAnKTtcblx0YXBwbHlPcHRpb25zKGNoYWxrLCBvcHRpb25zKTtcblxuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YoY2hhbGssIGNyZWF0ZUNoYWxrLnByb3RvdHlwZSk7XG5cblx0cmV0dXJuIGNoYWxrO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQ2hhbGsob3B0aW9ucykge1xuXHRyZXR1cm4gY2hhbGtGYWN0b3J5KG9wdGlvbnMpO1xufVxuXG5PYmplY3Quc2V0UHJvdG90eXBlT2YoY3JlYXRlQ2hhbGsucHJvdG90eXBlLCBGdW5jdGlvbi5wcm90b3R5cGUpO1xuXG5mb3IgKGNvbnN0IFtzdHlsZU5hbWUsIHN0eWxlXSBvZiBPYmplY3QuZW50cmllcyhhbnNpU3R5bGVzKSkge1xuXHRzdHlsZXNbc3R5bGVOYW1lXSA9IHtcblx0XHRnZXQoKSB7XG5cdFx0XHRjb25zdCBidWlsZGVyID0gY3JlYXRlQnVpbGRlcih0aGlzLCBjcmVhdGVTdHlsZXIoc3R5bGUub3Blbiwgc3R5bGUuY2xvc2UsIHRoaXNbU1RZTEVSXSksIHRoaXNbSVNfRU1QVFldKTtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBzdHlsZU5hbWUsIHt2YWx1ZTogYnVpbGRlcn0pO1xuXHRcdFx0cmV0dXJuIGJ1aWxkZXI7XG5cdFx0fSxcblx0fTtcbn1cblxuc3R5bGVzLnZpc2libGUgPSB7XG5cdGdldCgpIHtcblx0XHRjb25zdCBidWlsZGVyID0gY3JlYXRlQnVpbGRlcih0aGlzLCB0aGlzW1NUWUxFUl0sIHRydWUpO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndmlzaWJsZScsIHt2YWx1ZTogYnVpbGRlcn0pO1xuXHRcdHJldHVybiBidWlsZGVyO1xuXHR9LFxufTtcblxuY29uc3QgZ2V0TW9kZWxBbnNpID0gKG1vZGVsLCBsZXZlbCwgdHlwZSwgLi4uYXJndW1lbnRzXykgPT4ge1xuXHRpZiAobW9kZWwgPT09ICdyZ2InKSB7XG5cdFx0aWYgKGxldmVsID09PSAnYW5zaTE2bScpIHtcblx0XHRcdHJldHVybiBhbnNpU3R5bGVzW3R5cGVdLmFuc2kxNm0oLi4uYXJndW1lbnRzXyk7XG5cdFx0fVxuXG5cdFx0aWYgKGxldmVsID09PSAnYW5zaTI1NicpIHtcblx0XHRcdHJldHVybiBhbnNpU3R5bGVzW3R5cGVdLmFuc2kyNTYoYW5zaVN0eWxlcy5yZ2JUb0Fuc2kyNTYoLi4uYXJndW1lbnRzXykpO1xuXHRcdH1cblxuXHRcdHJldHVybiBhbnNpU3R5bGVzW3R5cGVdLmFuc2koYW5zaVN0eWxlcy5yZ2JUb0Fuc2koLi4uYXJndW1lbnRzXykpO1xuXHR9XG5cblx0aWYgKG1vZGVsID09PSAnaGV4Jykge1xuXHRcdHJldHVybiBnZXRNb2RlbEFuc2koJ3JnYicsIGxldmVsLCB0eXBlLCAuLi5hbnNpU3R5bGVzLmhleFRvUmdiKC4uLmFyZ3VtZW50c18pKTtcblx0fVxuXG5cdHJldHVybiBhbnNpU3R5bGVzW3R5cGVdW21vZGVsXSguLi5hcmd1bWVudHNfKTtcbn07XG5cbmNvbnN0IHVzZWRNb2RlbHMgPSBbJ3JnYicsICdoZXgnLCAnYW5zaTI1NiddO1xuXG5mb3IgKGNvbnN0IG1vZGVsIG9mIHVzZWRNb2RlbHMpIHtcblx0c3R5bGVzW21vZGVsXSA9IHtcblx0XHRnZXQoKSB7XG5cdFx0XHRjb25zdCB7bGV2ZWx9ID0gdGhpcztcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJndW1lbnRzXykge1xuXHRcdFx0XHRjb25zdCBzdHlsZXIgPSBjcmVhdGVTdHlsZXIoZ2V0TW9kZWxBbnNpKG1vZGVsLCBsZXZlbE1hcHBpbmdbbGV2ZWxdLCAnY29sb3InLCAuLi5hcmd1bWVudHNfKSwgYW5zaVN0eWxlcy5jb2xvci5jbG9zZSwgdGhpc1tTVFlMRVJdKTtcblx0XHRcdFx0cmV0dXJuIGNyZWF0ZUJ1aWxkZXIodGhpcywgc3R5bGVyLCB0aGlzW0lTX0VNUFRZXSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cdH07XG5cblx0Y29uc3QgYmdNb2RlbCA9ICdiZycgKyBtb2RlbFswXS50b1VwcGVyQ2FzZSgpICsgbW9kZWwuc2xpY2UoMSk7XG5cdHN0eWxlc1tiZ01vZGVsXSA9IHtcblx0XHRnZXQoKSB7XG5cdFx0XHRjb25zdCB7bGV2ZWx9ID0gdGhpcztcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJndW1lbnRzXykge1xuXHRcdFx0XHRjb25zdCBzdHlsZXIgPSBjcmVhdGVTdHlsZXIoZ2V0TW9kZWxBbnNpKG1vZGVsLCBsZXZlbE1hcHBpbmdbbGV2ZWxdLCAnYmdDb2xvcicsIC4uLmFyZ3VtZW50c18pLCBhbnNpU3R5bGVzLmJnQ29sb3IuY2xvc2UsIHRoaXNbU1RZTEVSXSk7XG5cdFx0XHRcdHJldHVybiBjcmVhdGVCdWlsZGVyKHRoaXMsIHN0eWxlciwgdGhpc1tJU19FTVBUWV0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXHR9O1xufVxuXG5jb25zdCBwcm90byA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCgpID0+IHt9LCB7XG5cdC4uLnN0eWxlcyxcblx0bGV2ZWw6IHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiB0aGlzW0dFTkVSQVRPUl0ubGV2ZWw7XG5cdFx0fSxcblx0XHRzZXQobGV2ZWwpIHtcblx0XHRcdHRoaXNbR0VORVJBVE9SXS5sZXZlbCA9IGxldmVsO1xuXHRcdH0sXG5cdH0sXG59KTtcblxuY29uc3QgY3JlYXRlU3R5bGVyID0gKG9wZW4sIGNsb3NlLCBwYXJlbnQpID0+IHtcblx0bGV0IG9wZW5BbGw7XG5cdGxldCBjbG9zZUFsbDtcblx0aWYgKHBhcmVudCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3BlbkFsbCA9IG9wZW47XG5cdFx0Y2xvc2VBbGwgPSBjbG9zZTtcblx0fSBlbHNlIHtcblx0XHRvcGVuQWxsID0gcGFyZW50Lm9wZW5BbGwgKyBvcGVuO1xuXHRcdGNsb3NlQWxsID0gY2xvc2UgKyBwYXJlbnQuY2xvc2VBbGw7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdG9wZW4sXG5cdFx0Y2xvc2UsXG5cdFx0b3BlbkFsbCxcblx0XHRjbG9zZUFsbCxcblx0XHRwYXJlbnQsXG5cdH07XG59O1xuXG5jb25zdCBjcmVhdGVCdWlsZGVyID0gKHNlbGYsIF9zdHlsZXIsIF9pc0VtcHR5KSA9PiB7XG5cdC8vIFNpbmdsZSBhcmd1bWVudCBpcyBob3QgcGF0aCwgaW1wbGljaXQgY29lcmNpb24gaXMgZmFzdGVyIHRoYW4gYW55dGhpbmdcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWltcGxpY2l0LWNvZXJjaW9uXG5cdGNvbnN0IGJ1aWxkZXIgPSAoLi4uYXJndW1lbnRzXykgPT4gYXBwbHlTdHlsZShidWlsZGVyLCAoYXJndW1lbnRzXy5sZW5ndGggPT09IDEpID8gKCcnICsgYXJndW1lbnRzX1swXSkgOiBhcmd1bWVudHNfLmpvaW4oJyAnKSk7XG5cblx0Ly8gV2UgYWx0ZXIgdGhlIHByb3RvdHlwZSBiZWNhdXNlIHdlIG11c3QgcmV0dXJuIGEgZnVuY3Rpb24sIGJ1dCB0aGVyZSBpc1xuXHQvLyBubyB3YXkgdG8gY3JlYXRlIGEgZnVuY3Rpb24gd2l0aCBhIGRpZmZlcmVudCBwcm90b3R5cGVcblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKGJ1aWxkZXIsIHByb3RvKTtcblxuXHRidWlsZGVyW0dFTkVSQVRPUl0gPSBzZWxmO1xuXHRidWlsZGVyW1NUWUxFUl0gPSBfc3R5bGVyO1xuXHRidWlsZGVyW0lTX0VNUFRZXSA9IF9pc0VtcHR5O1xuXG5cdHJldHVybiBidWlsZGVyO1xufTtcblxuY29uc3QgYXBwbHlTdHlsZSA9IChzZWxmLCBzdHJpbmcpID0+IHtcblx0aWYgKHNlbGYubGV2ZWwgPD0gMCB8fCAhc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHNlbGZbSVNfRU1QVFldID8gJycgOiBzdHJpbmc7XG5cdH1cblxuXHRsZXQgc3R5bGVyID0gc2VsZltTVFlMRVJdO1xuXG5cdGlmIChzdHlsZXIgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBzdHJpbmc7XG5cdH1cblxuXHRjb25zdCB7b3BlbkFsbCwgY2xvc2VBbGx9ID0gc3R5bGVyO1xuXHRpZiAoc3RyaW5nLmluY2x1ZGVzKCdcXHUwMDFCJykpIHtcblx0XHR3aGlsZSAoc3R5bGVyICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdC8vIFJlcGxhY2UgYW55IGluc3RhbmNlcyBhbHJlYWR5IHByZXNlbnQgd2l0aCBhIHJlLW9wZW5pbmcgY29kZVxuXHRcdFx0Ly8gb3RoZXJ3aXNlIG9ubHkgdGhlIHBhcnQgb2YgdGhlIHN0cmluZyB1bnRpbCBzYWlkIGNsb3NpbmcgY29kZVxuXHRcdFx0Ly8gd2lsbCBiZSBjb2xvcmVkLCBhbmQgdGhlIHJlc3Qgd2lsbCBzaW1wbHkgYmUgJ3BsYWluJy5cblx0XHRcdHN0cmluZyA9IHN0cmluZ1JlcGxhY2VBbGwoc3RyaW5nLCBzdHlsZXIuY2xvc2UsIHN0eWxlci5vcGVuKTtcblxuXHRcdFx0c3R5bGVyID0gc3R5bGVyLnBhcmVudDtcblx0XHR9XG5cdH1cblxuXHQvLyBXZSBjYW4gbW92ZSBib3RoIG5leHQgYWN0aW9ucyBvdXQgb2YgbG9vcCwgYmVjYXVzZSByZW1haW5pbmcgYWN0aW9ucyBpbiBsb29wIHdvbid0IGhhdmVcblx0Ly8gYW55L3Zpc2libGUgZWZmZWN0IG9uIHBhcnRzIHdlIGFkZCBoZXJlLiBDbG9zZSB0aGUgc3R5bGluZyBiZWZvcmUgYSBsaW5lYnJlYWsgYW5kIHJlb3BlblxuXHQvLyBhZnRlciBuZXh0IGxpbmUgdG8gZml4IGEgYmxlZWQgaXNzdWUgb24gbWFjT1M6IGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFsay9jaGFsay9wdWxsLzkyXG5cdGNvbnN0IGxmSW5kZXggPSBzdHJpbmcuaW5kZXhPZignXFxuJyk7XG5cdGlmIChsZkluZGV4ICE9PSAtMSkge1xuXHRcdHN0cmluZyA9IHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleChzdHJpbmcsIGNsb3NlQWxsLCBvcGVuQWxsLCBsZkluZGV4KTtcblx0fVxuXG5cdHJldHVybiBvcGVuQWxsICsgc3RyaW5nICsgY2xvc2VBbGw7XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhjcmVhdGVDaGFsay5wcm90b3R5cGUsIHN0eWxlcyk7XG5cbmNvbnN0IGNoYWxrID0gY3JlYXRlQ2hhbGsoKTtcbmV4cG9ydCBjb25zdCBjaGFsa1N0ZGVyciA9IGNyZWF0ZUNoYWxrKHtsZXZlbDogc3RkZXJyQ29sb3IgPyBzdGRlcnJDb2xvci5sZXZlbCA6IDB9KTtcblxuZXhwb3J0IHtcblx0bW9kaWZpZXJOYW1lcyxcblx0Zm9yZWdyb3VuZENvbG9yTmFtZXMsXG5cdGJhY2tncm91bmRDb2xvck5hbWVzLFxuXHRjb2xvck5hbWVzLFxuXG5cdC8vIFRPRE86IFJlbW92ZSB0aGVzZSBhbGlhc2VzIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb25cblx0bW9kaWZpZXJOYW1lcyBhcyBtb2RpZmllcnMsXG5cdGZvcmVncm91bmRDb2xvck5hbWVzIGFzIGZvcmVncm91bmRDb2xvcnMsXG5cdGJhY2tncm91bmRDb2xvck5hbWVzIGFzIGJhY2tncm91bmRDb2xvcnMsXG5cdGNvbG9yTmFtZXMgYXMgY29sb3JzLFxufSBmcm9tICcuL3ZlbmRvci9hbnNpLXN0eWxlcy9pbmRleC5qcyc7XG5cbmV4cG9ydCB7XG5cdHN0ZG91dENvbG9yIGFzIHN1cHBvcnRzQ29sb3IsXG5cdHN0ZGVyckNvbG9yIGFzIHN1cHBvcnRzQ29sb3JTdGRlcnIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjaGFsaztcbiIsIi8vIFRPRE86IFdoZW4gdGFyZ2V0aW5nIE5vZGUuanMgMTYsIHVzZSBgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlQWxsYC5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdSZXBsYWNlQWxsKHN0cmluZywgc3Vic3RyaW5nLCByZXBsYWNlcikge1xuXHRsZXQgaW5kZXggPSBzdHJpbmcuaW5kZXhPZihzdWJzdHJpbmcpO1xuXHRpZiAoaW5kZXggPT09IC0xKSB7XG5cdFx0cmV0dXJuIHN0cmluZztcblx0fVxuXG5cdGNvbnN0IHN1YnN0cmluZ0xlbmd0aCA9IHN1YnN0cmluZy5sZW5ndGg7XG5cdGxldCBlbmRJbmRleCA9IDA7XG5cdGxldCByZXR1cm5WYWx1ZSA9ICcnO1xuXHRkbyB7XG5cdFx0cmV0dXJuVmFsdWUgKz0gc3RyaW5nLnNsaWNlKGVuZEluZGV4LCBpbmRleCkgKyBzdWJzdHJpbmcgKyByZXBsYWNlcjtcblx0XHRlbmRJbmRleCA9IGluZGV4ICsgc3Vic3RyaW5nTGVuZ3RoO1xuXHRcdGluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc3Vic3RyaW5nLCBlbmRJbmRleCk7XG5cdH0gd2hpbGUgKGluZGV4ICE9PSAtMSk7XG5cblx0cmV0dXJuVmFsdWUgKz0gc3RyaW5nLnNsaWNlKGVuZEluZGV4KTtcblx0cmV0dXJuIHJldHVyblZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nRW5jYXNlQ1JMRldpdGhGaXJzdEluZGV4KHN0cmluZywgcHJlZml4LCBwb3N0Zml4LCBpbmRleCkge1xuXHRsZXQgZW5kSW5kZXggPSAwO1xuXHRsZXQgcmV0dXJuVmFsdWUgPSAnJztcblx0ZG8ge1xuXHRcdGNvbnN0IGdvdENSID0gc3RyaW5nW2luZGV4IC0gMV0gPT09ICdcXHInO1xuXHRcdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCwgKGdvdENSID8gaW5kZXggLSAxIDogaW5kZXgpKSArIHByZWZpeCArIChnb3RDUiA/ICdcXHJcXG4nIDogJ1xcbicpICsgcG9zdGZpeDtcblx0XHRlbmRJbmRleCA9IGluZGV4ICsgMTtcblx0XHRpbmRleCA9IHN0cmluZy5pbmRleE9mKCdcXG4nLCBlbmRJbmRleCk7XG5cdH0gd2hpbGUgKGluZGV4ICE9PSAtMSk7XG5cblx0cmV0dXJuVmFsdWUgKz0gc3RyaW5nLnNsaWNlKGVuZEluZGV4KTtcblx0cmV0dXJuIHJldHVyblZhbHVlO1xufVxuIiwiY29uc3QgQU5TSV9CQUNLR1JPVU5EX09GRlNFVCA9IDEwO1xuXG5jb25zdCB3cmFwQW5zaTE2ID0gKG9mZnNldCA9IDApID0+IGNvZGUgPT4gYFxcdTAwMUJbJHtjb2RlICsgb2Zmc2V0fW1gO1xuXG5jb25zdCB3cmFwQW5zaTI1NiA9IChvZmZzZXQgPSAwKSA9PiBjb2RlID0+IGBcXHUwMDFCWyR7MzggKyBvZmZzZXR9OzU7JHtjb2RlfW1gO1xuXG5jb25zdCB3cmFwQW5zaTE2bSA9IChvZmZzZXQgPSAwKSA9PiAocmVkLCBncmVlbiwgYmx1ZSkgPT4gYFxcdTAwMUJbJHszOCArIG9mZnNldH07Mjske3JlZH07JHtncmVlbn07JHtibHVlfW1gO1xuXG5jb25zdCBzdHlsZXMgPSB7XG5cdG1vZGlmaWVyOiB7XG5cdFx0cmVzZXQ6IFswLCAwXSxcblx0XHQvLyAyMSBpc24ndCB3aWRlbHkgc3VwcG9ydGVkIGFuZCAyMiBkb2VzIHRoZSBzYW1lIHRoaW5nXG5cdFx0Ym9sZDogWzEsIDIyXSxcblx0XHRkaW06IFsyLCAyMl0sXG5cdFx0aXRhbGljOiBbMywgMjNdLFxuXHRcdHVuZGVybGluZTogWzQsIDI0XSxcblx0XHRvdmVybGluZTogWzUzLCA1NV0sXG5cdFx0aW52ZXJzZTogWzcsIDI3XSxcblx0XHRoaWRkZW46IFs4LCAyOF0sXG5cdFx0c3RyaWtldGhyb3VnaDogWzksIDI5XSxcblx0fSxcblx0Y29sb3I6IHtcblx0XHRibGFjazogWzMwLCAzOV0sXG5cdFx0cmVkOiBbMzEsIDM5XSxcblx0XHRncmVlbjogWzMyLCAzOV0sXG5cdFx0eWVsbG93OiBbMzMsIDM5XSxcblx0XHRibHVlOiBbMzQsIDM5XSxcblx0XHRtYWdlbnRhOiBbMzUsIDM5XSxcblx0XHRjeWFuOiBbMzYsIDM5XSxcblx0XHR3aGl0ZTogWzM3LCAzOV0sXG5cblx0XHQvLyBCcmlnaHQgY29sb3Jcblx0XHRibGFja0JyaWdodDogWzkwLCAzOV0sXG5cdFx0Z3JheTogWzkwLCAzOV0sIC8vIEFsaWFzIG9mIGBibGFja0JyaWdodGBcblx0XHRncmV5OiBbOTAsIDM5XSwgLy8gQWxpYXMgb2YgYGJsYWNrQnJpZ2h0YFxuXHRcdHJlZEJyaWdodDogWzkxLCAzOV0sXG5cdFx0Z3JlZW5CcmlnaHQ6IFs5MiwgMzldLFxuXHRcdHllbGxvd0JyaWdodDogWzkzLCAzOV0sXG5cdFx0Ymx1ZUJyaWdodDogWzk0LCAzOV0sXG5cdFx0bWFnZW50YUJyaWdodDogWzk1LCAzOV0sXG5cdFx0Y3lhbkJyaWdodDogWzk2LCAzOV0sXG5cdFx0d2hpdGVCcmlnaHQ6IFs5NywgMzldLFxuXHR9LFxuXHRiZ0NvbG9yOiB7XG5cdFx0YmdCbGFjazogWzQwLCA0OV0sXG5cdFx0YmdSZWQ6IFs0MSwgNDldLFxuXHRcdGJnR3JlZW46IFs0MiwgNDldLFxuXHRcdGJnWWVsbG93OiBbNDMsIDQ5XSxcblx0XHRiZ0JsdWU6IFs0NCwgNDldLFxuXHRcdGJnTWFnZW50YTogWzQ1LCA0OV0sXG5cdFx0YmdDeWFuOiBbNDYsIDQ5XSxcblx0XHRiZ1doaXRlOiBbNDcsIDQ5XSxcblxuXHRcdC8vIEJyaWdodCBjb2xvclxuXHRcdGJnQmxhY2tCcmlnaHQ6IFsxMDAsIDQ5XSxcblx0XHRiZ0dyYXk6IFsxMDAsIDQ5XSwgLy8gQWxpYXMgb2YgYGJnQmxhY2tCcmlnaHRgXG5cdFx0YmdHcmV5OiBbMTAwLCA0OV0sIC8vIEFsaWFzIG9mIGBiZ0JsYWNrQnJpZ2h0YFxuXHRcdGJnUmVkQnJpZ2h0OiBbMTAxLCA0OV0sXG5cdFx0YmdHcmVlbkJyaWdodDogWzEwMiwgNDldLFxuXHRcdGJnWWVsbG93QnJpZ2h0OiBbMTAzLCA0OV0sXG5cdFx0YmdCbHVlQnJpZ2h0OiBbMTA0LCA0OV0sXG5cdFx0YmdNYWdlbnRhQnJpZ2h0OiBbMTA1LCA0OV0sXG5cdFx0YmdDeWFuQnJpZ2h0OiBbMTA2LCA0OV0sXG5cdFx0YmdXaGl0ZUJyaWdodDogWzEwNywgNDldLFxuXHR9LFxufTtcblxuZXhwb3J0IGNvbnN0IG1vZGlmaWVyTmFtZXMgPSBPYmplY3Qua2V5cyhzdHlsZXMubW9kaWZpZXIpO1xuZXhwb3J0IGNvbnN0IGZvcmVncm91bmRDb2xvck5hbWVzID0gT2JqZWN0LmtleXMoc3R5bGVzLmNvbG9yKTtcbmV4cG9ydCBjb25zdCBiYWNrZ3JvdW5kQ29sb3JOYW1lcyA9IE9iamVjdC5rZXlzKHN0eWxlcy5iZ0NvbG9yKTtcbmV4cG9ydCBjb25zdCBjb2xvck5hbWVzID0gWy4uLmZvcmVncm91bmRDb2xvck5hbWVzLCAuLi5iYWNrZ3JvdW5kQ29sb3JOYW1lc107XG5cbmZ1bmN0aW9uIGFzc2VtYmxlU3R5bGVzKCkge1xuXHRjb25zdCBjb2RlcyA9IG5ldyBNYXAoKTtcblxuXHRmb3IgKGNvbnN0IFtncm91cE5hbWUsIGdyb3VwXSBvZiBPYmplY3QuZW50cmllcyhzdHlsZXMpKSB7XG5cdFx0Zm9yIChjb25zdCBbc3R5bGVOYW1lLCBzdHlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZ3JvdXApKSB7XG5cdFx0XHRzdHlsZXNbc3R5bGVOYW1lXSA9IHtcblx0XHRcdFx0b3BlbjogYFxcdTAwMUJbJHtzdHlsZVswXX1tYCxcblx0XHRcdFx0Y2xvc2U6IGBcXHUwMDFCWyR7c3R5bGVbMV19bWAsXG5cdFx0XHR9O1xuXG5cdFx0XHRncm91cFtzdHlsZU5hbWVdID0gc3R5bGVzW3N0eWxlTmFtZV07XG5cblx0XHRcdGNvZGVzLnNldChzdHlsZVswXSwgc3R5bGVbMV0pO1xuXHRcdH1cblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdHlsZXMsIGdyb3VwTmFtZSwge1xuXHRcdFx0dmFsdWU6IGdyb3VwLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSk7XG5cdH1cblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoc3R5bGVzLCAnY29kZXMnLCB7XG5cdFx0dmFsdWU6IGNvZGVzLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHR9KTtcblxuXHRzdHlsZXMuY29sb3IuY2xvc2UgPSAnXFx1MDAxQlszOW0nO1xuXHRzdHlsZXMuYmdDb2xvci5jbG9zZSA9ICdcXHUwMDFCWzQ5bSc7XG5cblx0c3R5bGVzLmNvbG9yLmFuc2kgPSB3cmFwQW5zaTE2KCk7XG5cdHN0eWxlcy5jb2xvci5hbnNpMjU2ID0gd3JhcEFuc2kyNTYoKTtcblx0c3R5bGVzLmNvbG9yLmFuc2kxNm0gPSB3cmFwQW5zaTE2bSgpO1xuXHRzdHlsZXMuYmdDb2xvci5hbnNpID0gd3JhcEFuc2kxNihBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaTI1NiA9IHdyYXBBbnNpMjU2KEFOU0lfQkFDS0dST1VORF9PRkZTRVQpO1xuXHRzdHlsZXMuYmdDb2xvci5hbnNpMTZtID0gd3JhcEFuc2kxNm0oQU5TSV9CQUNLR1JPVU5EX09GRlNFVCk7XG5cblx0Ly8gRnJvbSBodHRwczovL2dpdGh1Yi5jb20vUWl4LS9jb2xvci1jb252ZXJ0L2Jsb2IvM2YwZTBkNGU5MmUyMzU3OTZjY2IxN2Y2ZTg1YzcyMDk0YTY1MWY0OS9jb252ZXJzaW9ucy5qc1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyhzdHlsZXMsIHtcblx0XHRyZ2JUb0Fuc2kyNTY6IHtcblx0XHRcdHZhbHVlKHJlZCwgZ3JlZW4sIGJsdWUpIHtcblx0XHRcdFx0Ly8gV2UgdXNlIHRoZSBleHRlbmRlZCBncmV5c2NhbGUgcGFsZXR0ZSBoZXJlLCB3aXRoIHRoZSBleGNlcHRpb24gb2Zcblx0XHRcdFx0Ly8gYmxhY2sgYW5kIHdoaXRlLiBub3JtYWwgcGFsZXR0ZSBvbmx5IGhhcyA0IGdyZXlzY2FsZSBzaGFkZXMuXG5cdFx0XHRcdGlmIChyZWQgPT09IGdyZWVuICYmIGdyZWVuID09PSBibHVlKSB7XG5cdFx0XHRcdFx0aWYgKHJlZCA8IDgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAxNjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAocmVkID4gMjQ4KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMjMxO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBNYXRoLnJvdW5kKCgocmVkIC0gOCkgLyAyNDcpICogMjQpICsgMjMyO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIDE2XG5cdFx0XHRcdFx0KyAoMzYgKiBNYXRoLnJvdW5kKHJlZCAvIDI1NSAqIDUpKVxuXHRcdFx0XHRcdCsgKDYgKiBNYXRoLnJvdW5kKGdyZWVuIC8gMjU1ICogNSkpXG5cdFx0XHRcdFx0KyBNYXRoLnJvdW5kKGJsdWUgLyAyNTUgKiA1KTtcblx0XHRcdH0sXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGhleFRvUmdiOiB7XG5cdFx0XHR2YWx1ZShoZXgpIHtcblx0XHRcdFx0Y29uc3QgbWF0Y2hlcyA9IC9bYS1mXFxkXXs2fXxbYS1mXFxkXXszfS9pLmV4ZWMoaGV4LnRvU3RyaW5nKDE2KSk7XG5cdFx0XHRcdGlmICghbWF0Y2hlcykge1xuXHRcdFx0XHRcdHJldHVybiBbMCwgMCwgMF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgW2NvbG9yU3RyaW5nXSA9IG1hdGNoZXM7XG5cblx0XHRcdFx0aWYgKGNvbG9yU3RyaW5nLmxlbmd0aCA9PT0gMykge1xuXHRcdFx0XHRcdGNvbG9yU3RyaW5nID0gWy4uLmNvbG9yU3RyaW5nXS5tYXAoY2hhcmFjdGVyID0+IGNoYXJhY3RlciArIGNoYXJhY3Rlcikuam9pbignJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBpbnRlZ2VyID0gTnVtYmVyLnBhcnNlSW50KGNvbG9yU3RyaW5nLCAxNik7XG5cblx0XHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG5cdFx0XHRcdFx0KGludGVnZXIgPj4gMTYpICYgMHhGRixcblx0XHRcdFx0XHQoaW50ZWdlciA+PiA4KSAmIDB4RkYsXG5cdFx0XHRcdFx0aW50ZWdlciAmIDB4RkYsXG5cdFx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby1iaXR3aXNlICovXG5cdFx0XHRcdF07XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRoZXhUb0Fuc2kyNTY6IHtcblx0XHRcdHZhbHVlOiBoZXggPT4gc3R5bGVzLnJnYlRvQW5zaTI1NiguLi5zdHlsZXMuaGV4VG9SZ2IoaGV4KSksXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGFuc2kyNTZUb0Fuc2k6IHtcblx0XHRcdHZhbHVlKGNvZGUpIHtcblx0XHRcdFx0aWYgKGNvZGUgPCA4KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDMwICsgY29kZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjb2RlIDwgMTYpIHtcblx0XHRcdFx0XHRyZXR1cm4gOTAgKyAoY29kZSAtIDgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHJlZDtcblx0XHRcdFx0bGV0IGdyZWVuO1xuXHRcdFx0XHRsZXQgYmx1ZTtcblxuXHRcdFx0XHRpZiAoY29kZSA+PSAyMzIpIHtcblx0XHRcdFx0XHRyZWQgPSAoKChjb2RlIC0gMjMyKSAqIDEwKSArIDgpIC8gMjU1O1xuXHRcdFx0XHRcdGdyZWVuID0gcmVkO1xuXHRcdFx0XHRcdGJsdWUgPSByZWQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29kZSAtPSAxNjtcblxuXHRcdFx0XHRcdGNvbnN0IHJlbWFpbmRlciA9IGNvZGUgJSAzNjtcblxuXHRcdFx0XHRcdHJlZCA9IE1hdGguZmxvb3IoY29kZSAvIDM2KSAvIDU7XG5cdFx0XHRcdFx0Z3JlZW4gPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDYpIC8gNTtcblx0XHRcdFx0XHRibHVlID0gKHJlbWFpbmRlciAlIDYpIC8gNTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHZhbHVlID0gTWF0aC5tYXgocmVkLCBncmVlbiwgYmx1ZSkgKiAyO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gMCkge1xuXHRcdFx0XHRcdHJldHVybiAzMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHRcdGxldCByZXN1bHQgPSAzMCArICgoTWF0aC5yb3VuZChibHVlKSA8PCAyKSB8IChNYXRoLnJvdW5kKGdyZWVuKSA8PCAxKSB8IE1hdGgucm91bmQocmVkKSk7XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSAyKSB7XG5cdFx0XHRcdFx0cmVzdWx0ICs9IDYwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdHJnYlRvQW5zaToge1xuXHRcdFx0dmFsdWU6IChyZWQsIGdyZWVuLCBibHVlKSA9PiBzdHlsZXMuYW5zaTI1NlRvQW5zaShzdHlsZXMucmdiVG9BbnNpMjU2KHJlZCwgZ3JlZW4sIGJsdWUpKSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0aGV4VG9BbnNpOiB7XG5cdFx0XHR2YWx1ZTogaGV4ID0+IHN0eWxlcy5hbnNpMjU2VG9BbnNpKHN0eWxlcy5oZXhUb0Fuc2kyNTYoaGV4KSksXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHR9KTtcblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5jb25zdCBhbnNpU3R5bGVzID0gYXNzZW1ibGVTdHlsZXMoKTtcblxuZXhwb3J0IGRlZmF1bHQgYW5zaVN0eWxlcztcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG5jb25zdCBsZXZlbCA9ICgoKSA9PiB7XG5cdGlmIChuYXZpZ2F0b3IudXNlckFnZW50RGF0YSkge1xuXHRcdGNvbnN0IGJyYW5kID0gbmF2aWdhdG9yLnVzZXJBZ2VudERhdGEuYnJhbmRzLmZpbmQoKHticmFuZH0pID0+IGJyYW5kID09PSAnQ2hyb21pdW0nKTtcblx0XHRpZiAoYnJhbmQgJiYgYnJhbmQudmVyc2lvbiA+IDkzKSB7XG5cdFx0XHRyZXR1cm4gMztcblx0XHR9XG5cdH1cblxuXHRpZiAoL1xcYihDaHJvbWV8Q2hyb21pdW0pXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRyZXR1cm4gMDtcbn0pKCk7XG5cbmNvbnN0IGNvbG9yU3VwcG9ydCA9IGxldmVsICE9PSAwICYmIHtcblx0bGV2ZWwsXG5cdGhhc0Jhc2ljOiB0cnVlLFxuXHRoYXMyNTY6IGxldmVsID49IDIsXG5cdGhhczE2bTogbGV2ZWwgPj0gMyxcbn07XG5cbmNvbnN0IHN1cHBvcnRzQ29sb3IgPSB7XG5cdHN0ZG91dDogY29sb3JTdXBwb3J0LFxuXHRzdGRlcnI6IGNvbG9yU3VwcG9ydCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnRzQ29sb3I7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXHJcbmltcG9ydCB7IElXaWRnZXRKc29uIH0gZnJvbSBcIi4uLy4uL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvSW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBTaW5nbGVWYWx1ZUFzcGVjdCB9IGZyb20gXCIuLi8uLi9JREVBc3BlY3RzL1NpbmdsZVZhbHVlQXNwZWN0L1NpbmdsZVZhbHVlQXNwZWN0XCI7XHJcbmltcG9ydCB7IElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi4vLi4vSURFQXNwZWN0cy9TaW5nbGVWYWx1ZUFzcGVjdC9TaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTaW5nbGVWYWx1ZVBvcnRhbERlZmF1bHQsIFdpZGdldFNldHRpbmdzIH0gZnJvbSBcIi4vU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXRDb25maWdcIjtcclxuXHJcbmxldCB0aGlzV2lkZ2V0U3lzdGVtTmFtZSA9IFwiU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaW5nbGVWYWx1ZVBvcnRhbFdpZGdldCBleHRlbmRzIFNpbmdsZVZhbHVlQXNwZWN0e1xyXG4gICAgbGl2ZUNvbmZpZ3VyYXRpb25SZWZyZXNoZWQoKTogdm9pZCB7XHJcbiAgICAgICAvL25vdGhpbmcgdG8gZG9cclxuICAgIH1cclxuXHJcbiAgXHJcbm92ZXJyaWRlIHNldFRoaXNDb21wb25lbnROYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNXaWRnZXRTeXN0ZW1OYW1lO1xyXG59XHJcblxyXG4gICAgb3ZlcnJpZGUgc2V0RGVmYXVsdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuICBTaW5nbGVWYWx1ZVBvcnRhbERlZmF1bHRcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIG92ZXJyaWRlIHNldFdpZGdldEpzb25TZXR0aW5ncygpOiBJV2lkZ2V0SnNvbjxJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIFdpZGdldFNldHRpbmdzO1xyXG4gICAgfVxyXG5cclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==