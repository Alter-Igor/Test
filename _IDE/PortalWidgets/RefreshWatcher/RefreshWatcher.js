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
    return ko.toJS(koObject);
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
/*!*********************************************************************!*\
  !*** ./src/WebBased/PortalWidgets/RefreshWatcher/RefreshWatcher.ts ***!
  \*********************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RefreshWatcher: () => (/* binding */ RefreshWatcher)
/* harmony export */ });
/* harmony import */ var _Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Common/ObjectHelper */ "./src/WebBased/Common/ObjectHelper.ts");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_1__);


function RefreshWatcher(element, configuration, baseModel) {
    return new RefreshWatcherClass(element, configuration, baseModel);
}
class RefreshWatcherClass {
    constructor(element, configuration, baseModel) {
        this.defaults = {
            widgets: [],
            useIntervalRefreshEveryXSeconds: false,
            refreshOnEvents: false,
            eventsToListenTo: [],
            intervalSeconds: 0
        };
        this.lastRefresh = new Date();
        this.refreshLog = [];
        this.originalConfiguration = configuration;
        ;
        this.configuration = $.extend(true, {}, this.defaults, configuration);
        let x = knockout__WEBPACK_IMPORTED_MODULE_1___default().observable(this.configuration.configuration);
        this.model = x;
    }
    onDestroy() {
        $ui.util.dispose(this.disposables);
    }
    loadAndBind() {
        this.disposables = [];
        this.model().eventsToListenTo?.forEach((event) => {
            console.log("Subscribing to event", event);
            this.disposables.push($ui.events.subscribe(event.eventName, (e) => {
                this.refreshComponents(event.eventName);
            }, this));
        });
        if (this.model().useIntervalRefreshEveryXSeconds && this.model().intervalSeconds && this.model().intervalSeconds > 0) {
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.interval = setInterval(() => {
                this.refreshComponents("interval");
            }, this.model().intervalSeconds * 1000);
            this.disposables.push(this.interval);
        }
    }
    refreshComponents(eventName) {
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
        console.log("Refreshing components");
        let widgetsToRefresh = this.model().widgets;
        console.log("Widgets to refresh: ", widgetsToRefresh.length);
        widgetsToRefresh?.forEach((widgetToRefresh) => {
            let logItem = { eventName: eventName, widgets: widgetToRefresh, time: new Date(), success: false };
            try {
                let componentToRefresh = $ui.widgets.instances().find((x) => {
                    let classReference = (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_0__.strToClass)(widgetToRefresh.typeName, window);
                    if (!classReference) {
                        return false;
                    }
                    return x instanceof (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_0__.strToClass)(widgetToRefresh.typeName, window);
                });
                if (componentToRefresh && componentToRefresh[widgetToRefresh.methodToExecute]) {
                    // let params = widgets.parameters;
                    console.log("Refreshing", widgetToRefresh.typeName, widgetToRefresh.methodToExecute);
                    componentToRefresh[widgetToRefresh.methodToExecute](); //todo: parameters
                }
            }
            catch (e) {
                console.log(e);
            }
            finally {
                logItem.success = true;
                this.refreshLog.push(logItem);
            }
        });
    }
}

})();

var __webpack_export_target__ = (PortalWidgets = typeof PortalWidgets === "undefined" ? {} : PortalWidgets);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU8sS0FBSyxDQUFDO3FCQUNoQjtvQkFDQSxPQUFPLENBQUMsWUFBWSxnRUFBVSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyRSxDQUFDLENBQUMsQ0FBQztnQkFFSCxJQUFJLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsRUFBRTtvQkFDM0UsbUNBQW1DO29CQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDckYsa0JBQWtCLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxrQkFBa0I7aUJBQzVFO2FBQ0o7WUFDRCxPQUFPLENBQUMsRUFBRTtnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBRWxCO29CQUVEO2dCQUNJLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNqQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL3NyYy9Db21tb24vTG9nLnRzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9zcmMvQ29tbW9uL1N0YWNrSGVscGVyLnRzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9zcmMvV2ViQmFzZWQvQ29tbW9uL09iamVjdEhlbHBlci50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL2V4dGVybmFsIHZhciBcImtvXCIiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL3ZlbmRvci9hbnNpLXN0eWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS92ZW5kb3Ivc3VwcG9ydHMtY29sb3IvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vc3JjL1dlYkJhc2VkL1BvcnRhbFdpZGdldHMvUmVmcmVzaFdhdGNoZXIvUmVmcmVzaFdhdGNoZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrLCB7IENoYWxrSW5zdGFuY2UgfSBmcm9tICdjaGFsayc7XG5pbXBvcnQgeyBleHRyYWN0Q2FsbGVyRnJvbVN0YWNrLCBleHRyYWN0TGluZU51bWJlckZyb21TdGFjayB9IGZyb20gJy4vU3RhY2tIZWxwZXInO1xuXG5jaGFsay5sZXZlbCA9IDM7XG5sZXQgZGVmYXVsdE1vZGU6IENoYWxrSW5zdGFuY2UgPSBjaGFsay5yZXNldDtcblxuXG5sZXQgbGFzdFNlYzogU2VjdGlvbiB8IHVuZGVmaW5lZDtcblxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTZWMoKSB7XG5cbiAgICAvLyBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrKyl7XG4gICAgLy8gY29uc29sZS5ncm91cEVuZCgpXG4gICAgLy8gfVxuXG4gICAgaWYgKGxhc3RTZWM/Lmdyb3VwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFzdFNlYz8uZ3JvdXA7IGkrKykge1xuICAgICAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxhc3RTZWMgPSBuZXcgU2VjdGlvbihcIlJvb3RcIiwgZGVmYXVsdE1vZGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VjQmFja09uZSgpIHtcbiAgICBsYXN0U2VjID0gbGFzdFNlYz8ucGFyZW50O1xuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbn1cblxuZXhwb3J0IGNsYXNzIFNlY3Rpb24ge1xuICAgIHNlY3Rpb25OYW1lOiBzdHJpbmc7XG4gICAgcGFyZW50OiBTZWN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIGM6IENoYWxrSW5zdGFuY2VcbiAgICBpbmRlbnQgPSAwO1xuICAgIGluZGVudFBhZCA9IFwiXCI7XG4gICAgZ3JvdXA6IG51bWJlciA9IDA7XG4gICAgY29uc3RydWN0b3Ioc2VjdGlvbk5hbWU6IHN0cmluZywgYzogQ2hhbGtJbnN0YW5jZSwgc2VjdGlvbj86IFNlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5jID0gYztcbiAgICAgICAgdGhpcy5zZWN0aW9uTmFtZSA9IHNlY3Rpb25OYW1lO1xuICAgICAgICBpZiAoc2VjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5pbmRlbnQgPSBzZWN0aW9uLmluZGVudCArIDE7XG4gICAgICAgICAgICB0aGlzLmluZGVudFBhZCA9IFwiLVwiLnJlcGVhdCh0aGlzLmluZGVudCAqIDIpICsgXCIgXCI7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdFNlYyA9IHRoaXM7XG4gICAgICAgIHRoaXMucGFyZW50ID0gc2VjdGlvbjtcbiAgICB9XG4gICAgbG9nKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRlZmF1bHRNb2RlKGFyZ3MpKTtcbiAgICB9XG4gICAgbGgxKGhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGgxKHRoaXMuaW5kZW50UGFkICsgaGVhZGluZywgdGhpcylcbiAgICB9XG4gICAgbGgyKGhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGgyKHRoaXMuaW5kZW50UGFkICsgaGVhZGluZywgdGhpcylcbiAgICB9XG4gICAgbGgzKGhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGgzKHRoaXMuaW5kZW50UGFkICsgaGVhZGluZywgdGhpcylcbiAgICB9XG4gICAgbCguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gbCh0aGlzLCAuLi5hcmdzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsKC4uLmFyZ3M6IGFueVtdKSB7XG5cbiAgICBsZXQgc2VjOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYztcbiAgICBsZXQgZmlyc3RBcmc6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZmlyc3RBcmdNb2RpZmVkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgaWYgKGFyZyBpbnN0YW5jZW9mIFNlY3Rpb24pIHtcbiAgICAgICAgICAgIHNlYyA9IGFyZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZpcnN0QXJnICYmIGFyZy5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIlN0cmluZ1wiKSB7XG4gICAgICAgICAgICBmaXJzdEFyZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvL3JlbW92ZWQgU2VjdGlvbiBmcm9tIGFyZ3NcbiAgICBhcmdzID0gYXJncy5maWx0ZXIoKGFyZykgPT4ge1xuICAgICAgICByZXR1cm4gIShhcmcgaW5zdGFuY2VvZiBTZWN0aW9uKTtcbiAgICB9KVxuXG5cbiAgICAvLyBsZXQgYyA9IHNlYz8uYyB8fCBtb2RlO1xuICAgIGxldCBjID0gZGVmYXVsdE1vZGU7XG4gICAgbGV0IGluZGVudFBhZCA9IHNlYz8uaW5kZW50UGFkIHx8IFwiXCI7XG5cbiAgICBpZiAoIWZpcnN0QXJnKSB7XG4gICAgICAgIGZpcnN0QXJnID0gXCJcIjtcbiAgICB9XG4gICAgZmlyc3RBcmdNb2RpZmVkID0gZmlyc3RBcmc7XG5cbiAgICBmaXJzdEFyZ01vZGlmZWQgPSBpbmRlbnRQYWQgKyBmaXJzdEFyZztcbiAgICAvL3JlbW92ZSBjb2xvciBmb3JtYXR0aW5nIGZyb20gZmlyc3QgYXJnXG4gICAgbGV0IHRvdExlbiA9IGZpcnN0QXJnTW9kaWZlZC5sZW5ndGggLSBmaXJzdEFyZ01vZGlmZWQucmVwbGFjZSgvXFx1MDAxYlxcWy4qP20vZywgJycpLmxlbmd0aCAtIDI7XG5cblxuICAgIGNvbnNvbGUubG9nKGZpcnN0QXJnTW9kaWZlZCk7XG5cbiAgICAvL3JlbW92ZWQgU2VjdGlvbiBmcm9tIGFyZ3NcblxuICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZyk7XG4gICAgfSlcblxuXG59XG5cblxuXG5mdW5jdGlvbiBsb2dIZWFkaW5nU2VjdGlvbihjOiBDaGFsa0luc3RhbmNlLCBoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb24/OiBTZWN0aW9uKSB7XG5cbiAgICBsZXQgc2VjID0gbmV3IFNlY3Rpb24oaGVhZGluZywgYywgc2VjdGlvbik7XG4gICAgbGV0IHRpbWUgPSBuZXcgRGF0ZShEYXRlLm5vdygpKS50b0xvY2FsZVN0cmluZygpO1xuXG4gICAgbGV0IHBhdGggPSBcIlwiO1xuICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgIHBhdGggPSBzZWN0aW9uLnNlY3Rpb25OYW1lO1xuICAgICAgICB3aGlsZSAoc2VjdGlvbi5wYXJlbnQpIHtcbiAgICAgICAgICAgIHNlY3Rpb24gPSBzZWN0aW9uLnBhcmVudDtcbiAgICAgICAgICAgIHBhdGggPSBzZWN0aW9uLnNlY3Rpb25OYW1lICsgXCIgLT4gXCIgKyBwYXRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9hZGQgYWRkIGhlYWRpbmcgdG8gZW5kIG9mIHBhdGggYW5kIG9ubHkgYWRkIC0+IGlmIHBhdGggaXMgbm90IGVtcHR5XG4gICAgaWYgKHBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICBwYXRoICs9IFwiIC0+IFwiO1xuICAgIH1cbiAgICBwYXRoICs9IGhlYWRpbmc7XG5cblxuXG4gICAgLy9wb3NpdGlvbiB0aGUgaGVhZGluZyBpbiB0aGUgbWlkZGxlIG9mIHRoZSBzY3JlZW5cbiAgICAvLyBjb25zb2xlLmxvZyhjKGhlYWRpbmcucGFkU3RhcnQoKGN3aWR0aCAvIDIpICsgKGhlYWRpbmcubGVuZ3RoIC8gMiksIFwiIFwiKS5wYWRFbmQoY3dpZHRoLCBcIiBcIikpKTtcbiAgICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkKGMocGF0aCkpO1xuICAgIHNlYy5ncm91cCsrO1xuXG4gICAgcmV0dXJuIHNlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxoMShoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb246IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjKSB7XG4gICAgbGV0IGMgPSBjaGFsay5iZ0JsYWNrLmdyZWVuQnJpZ2h0LmJvbGQ7XG4gICAgcmV0dXJuIGxvZ0hlYWRpbmdTZWN0aW9uKGMsIGhlYWRpbmcsIHNlY3Rpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGgyKGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWMpIHtcbiAgICBsZXQgYyA9IGNoYWxrLmJnR3JheS5jeWFuQnJpZ2h0LmJvbGQ7XG4gICAgcmV0dXJuIGxvZ0hlYWRpbmdTZWN0aW9uKGMsIGhlYWRpbmcsIHNlY3Rpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGgzKGhlYWRpbmc6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWMpIHtcbiAgICBsZXQgYyA9IGNoYWxrLmJnR3JheS5tYWdlbnRhQnJpZ2h0LmJvbGQ7XG4gICAgcmV0dXJuIGxvZ0hlYWRpbmdTZWN0aW9uKGMsIGhlYWRpbmcsIHNlY3Rpb24pO1xufVxuXG5cbmV4cG9ydCBjb25zdCBsaCA9IGxoMTtcblxuXG5leHBvcnQgY29uc3QgaW1wID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBjID0gY2hhbGsucmVkLmJvbGQuYmdCbGFjaztcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGluZiA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLmJsdWUuYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IHdybiA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLnllbGxvdy5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufSBcblxuZXhwb3J0IGNvbnN0IGVyciA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcblxuICAgIGxldCBlciA9IChuZXcgRXJyb3IoKSk7XG4gICAgbGV0IGxpbmVObyA9IGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrKGVyLnN0YWNrKTtcbiAgICBsZXQgY2FsbGVyID0gZXh0cmFjdENhbGxlckZyb21TdGFjayhlci5zdGFjayk7XG5cbiAgICBsZXQgcHJlVGV4dCA9IGBbJHtjYWxsZXJ9OiR7bGluZU5vfV1gO1xuXG4gICAgdGV4dCA9IHByZVRleHQgKyBcIiBcIiArIHRleHQ7XG4gICAgXG4gICAgY29uc29sZS5sb2coZXIpO1xuXG4gICAgbGV0IGMgPSBjaGFsay5yZWQuYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IHN1YyA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLmdyZWVuLmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBobCA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gY2hhbGsuYmdCbHVlKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgaGwxID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjaGFsay5iZ01hZ2VudGEodGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBudiA9IChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gY2hhbGsuYmdCbHVlQnJpZ2h0KG5hbWUucGFkRW5kKDMwLCBcIiBcIikpICsgXCIgOiBcIiArIGNoYWxrLmN5YW5CcmlnaHQodmFsdWUpO1xufVxuXG4gXG5sZXQgZXhhbXBsZUpTb24gPVxue1xuICAgIFwibmFtZVwiOiBcInRlc3RcIixcbiAgICBcImFnZVwiOiAxMCxcbiAgICBcImFkZHJlc3NcIjoge1xuICAgICAgICBcInN0cmVldFwiOiBcIjEyMyBGYWtlIFN0cmVldFwiLFxuICAgICAgICBcImNpdHlcIjogXCJMb25kb25cIixcbiAgICAgICAgXCJwb3N0Y29kZVwiOiBcIlNXMUEgMUFBXCJcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5UZXN0KCkge1xuXG5cbiAgICBjb25zb2xlLmxvZyhcIi0tIHRlc3QgLS1cIilcblxuICAgIGxldCBzZWMgPSBsaDEoXCJUZXN0IEhlYWRpbmcgMVwiKVxuICAgIGwoaW1wKFwiQXV0byBTZWMgLSBUaGlzIGlzIHNvbWV0aGluZyBpbXBvcnRhbnRcIikpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSAxXCIpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSAyXCIpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSBJTkZPOiBcIiArIGltcChcIlRoaXMgaXMgc29tZXRoaW5nIGltcG9ydGFudFwiKSlcbiAgICBsKFwiQXV0byBTZWMgLSBMaW5lIFdJVEggQURESVRJTkFMIElORk86IFwiICsgaW1wKFwiVGhpcyBpcyBzb21ldGhpbmcgaW1wb3J0YW50XCIpICsgXCIgYW5kIHRoaXMgaXMgc29tZSBhZGRpdGlvbmFsIGluZm9cIilcbiAgICBsKFwiQXV0byBTZWMgLSBUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcImFmdGVyIGF1dG8gc2VjIFRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cbiAgICBzZWMgPSBzZWMubGgyKFwiSGVhZGluZyAyXCIpXG4gICAgc2VjLmwoXCJUZXN0XCIpXG4gICAgc2VjLmwoXCJUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cblxuICAgIHNlYyA9IHNlYy5saDMoXCJIZWFkIDNcIilcbiAgICBsKFwiVGVzdFwiKVxuICAgIGwoXCJUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cbiAgICBjbGVhclNlYygpO1xuICAgIGwoXCJUZXN0IENsZWFyIFNlY1wiKVxuICAgIGwoXCJUZXN0IDI6XCIgKyBpbXAoXCJBbiBpbXBvcnRhbnQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgMzpcIiArIGluZihcIkFuIGluZm8gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNDpcIiArIHdybihcIkFuIHdhcm4gdmFsdWVcIikpXG4gICAgbChcIlRlc3QgNTpcIiArIGVycihcIkFuIGVycm9yIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDY6XCIgKyBzdWMoXCJBbiBzdWNjZXNzIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDc6XCIgKyBobChcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA4OlwiICsgaGwxKFwiQW4gaGlnaGxpZ2h0IHZhbHVlXCIpKVxuICAgIGwobnYoXCJOYW1lXCIsIFwiVmFsdWVcIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG4gICAgbChudihcIkV4YW1wbGUgTmFtZVwiLCBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb21cIikpXG5cblxuXG4gICAgbChcIlRlc3QgSlNPTjpcIiwgZXhhbXBsZUpTb24pO1xuXG59XG5cbi8vIHJ1blRlc3QoKVxuY2xlYXJTZWMoKTtcblxuLy8gZXhwb3J0IHtjb2xvcnN9O1xuIiwiXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soc3RhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCk6IG51bWJlciB8IG51bGwge1xuICAgIGlmICghc3RhY2spIHJldHVybiBudWxsO1xuICAgIC8vIEV4dHJhY3QgbGluZXMgZnJvbSBzdGFja1xuICAgIGNvbnN0IHN0YWNrTGluZXMgPSBzdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgLy8gRmluZCB0aGUgbGluZSB3aXRoIHRoZSBlcnJvciAodXN1YWxseSB0aGUgc2Vjb25kIGxpbmUpXG4gICAgY29uc3QgZXJyb3JMaW5lID0gc3RhY2tMaW5lc1sxXSB8fCAnJztcbiAgICAvLyBFeHRyYWN0IGxpbmUgbnVtYmVyIGZyb20gdGhlIGVycm9yIGxpbmUgdXNpbmcgcmVnZXhcbiAgICBjb25zdCBtYXRjaCA9IGVycm9yTGluZS5tYXRjaCgvOihcXGQrKTooXFxkKykkLyk7XG4gICAgcmV0dXJuIG1hdGNoID8gcGFyc2VJbnQobWF0Y2hbMV0pIDogbnVsbDtcbiAgfVxuICBcbiBleHBvcnQgZnVuY3Rpb24gZXh0cmFjdENhbGxlckZyb21TdGFjayhzdGFjazogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKCFzdGFjaykgcmV0dXJuIG51bGw7XG4gICAgLy8gRXh0cmFjdCBsaW5lcyBmcm9tIHN0YWNrXG4gICAgY29uc3Qgc3RhY2tMaW5lcyA9IHN0YWNrLnNwbGl0KCdcXG4nKTtcbiAgICAvLyBGaW5kIHRoZSBsaW5lIHdpdGggdGhlIGNhbGxlciBmdW5jdGlvbiAodXN1YWxseSB0aGUgdGhpcmQgbGluZSlcbiAgICBjb25zdCBjYWxsZXJMaW5lID0gc3RhY2tMaW5lc1syXSB8fCAnJztcbiAgICAvLyBFeHRyYWN0IGNhbGxlciBmdW5jdGlvbiBuYW1lIHVzaW5nIHJlZ2V4XG4gICAgY29uc3QgbWF0Y2ggPSBjYWxsZXJMaW5lLm1hdGNoKC9hdCAoW1xcdy48Pl0rKS8pO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogbnVsbDtcbiAgfSIsImltcG9ydCB7IGwsIGluZiwgZXJyIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Mb2dcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHN0clRvQ2xhc3MoY2xhc3NOYW1lOnN0cmluZywgYmFzZTphbnkpIHtcbiAgICBjb25zdCBjbGFzc1BhcnRzID0gY2xhc3NOYW1lLnNwbGl0KCcuJyk7XG4gICAgbGV0IGNsYXNzUmVmZXJlbmNlID0gYmFzZTtcblxuICAgIGZvciAoY29uc3QgcGFydCBvZiBjbGFzc1BhcnRzKSB7XG4gICAgICAgIGlmKCFjbGFzc1JlZmVyZW5jZVtwYXJ0XSkgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY2xhc3NSZWZlcmVuY2UgPSBjbGFzc1JlZmVyZW5jZVtwYXJ0XTtcbiAgICB9OyBcbiAgICByZXR1cm4gY2xhc3NSZWZlcmVuY2U7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEFsbEZpZWxkc1RvTnVsbChtb2RlbDphbnkpIHtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG1vZGVsKTtcbiAgICBrZXlzLmZvckVhY2goKGtleTogYW55KSA9PiB7XG4gICAgICAgIG1vZGVsW2tleV0gPSBudWxsO1xuICAgIH0pO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuT2JqZWN0KG9iOiBhbnkpIHtcbiAgICB2YXIgdG9SZXR1cm46IGFueSA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSBpbiBvYikge1xuICAgICAgICBpZiAoIW9iLmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZTtcblxuICAgICAgICBpZiAoKHR5cGVvZiBvYltpXSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhciBmbGF0T2JqZWN0ID0gZmxhdHRlbk9iamVjdChvYltpXSk7XG4gICAgICAgICAgICBmb3IgKHZhciB4IGluIGZsYXRPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZsYXRPYmplY3QuaGFzT3duUHJvcGVydHkoeCkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgdG9SZXR1cm5baSArICcuJyArIHhdID0gZmxhdE9iamVjdFt4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvUmV0dXJuW2ldID0gb2JbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvUmV0dXJuO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0aWVzW2ldO1xuICAgICAgICBpZiAoIWN1cnJlbnRbcHJvcF0pIHtcbiAgICAgICAgICAgIGN1cnJlbnRbcHJvcF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcbiAgICB9XG4gICAgY3VycmVudFtwcm9wZXJ0aWVzW3Byb3BlcnRpZXMubGVuZ3RoIC0gMV1dID0gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXN0ZWRQcm9wZXJ0eShvYmo6IGFueSwgcHJvcGVydHlQYXRoOiBzdHJpbmcpOiBhbnkge1xuICAgIGwoaW5mKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pYCksb2JqKTtcbiAgICBcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcGVydGllcykge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcHJvcGVydHkgaGFzIGFuIGFycmF5IGluZGV4LCBlLmcuLCBcImRhdGFbMF1cIlxuICAgICAgICBjb25zdCBtYXRjaGVzID0gcHJvcC5tYXRjaCgvXihbYS16QS1aMC05X10rKVxcWyhbMC05XSspXFxdJC8pO1xuXG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJheVByb3AgPSBtYXRjaGVzWzFdO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChtYXRjaGVzWzJdLCAxMCk7XG5cbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjdXJyZW50W2FycmF5UHJvcF0pIHx8IGN1cnJlbnRbYXJyYXlQcm9wXVtpbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGwoZXJyKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pOiBhcnJheVByb3Agb3IgaW5kZXggaXMgdW5kZWZpbmVkYCksb2JqKVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W2FycmF5UHJvcF1baW5kZXhdO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRbcHJvcF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbChlcnIoYGdldE5lc3RlZFByb3BlcnR5KCR7cHJvcGVydHlQYXRofSk6IHByb3AgaXMgdW5kZWZpbmVkYCksb2JqKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG59XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSB0ZW1wb3JhcnkgYW5kIHdpbGwgYmUgcmVtb3ZlZCBvbmNlIHRoZSB0eXBlc2NyaXB0IHR5cGluZyBhcmUgZml4ZWRcbiAgICAgKiBXaGF0IGlzIGRvZXMgaXMgY2hlY2sgaWYgdGhlIHBhc3NlZCBpbiBvYmplY3QgaXMgYSBrbm9ja291dCBvYnNlcnZhYmxlIGFuZCBpZiBpdCBpcyBpdCByZXR1cm5zIHRoZSB2YWx1ZVxuICAgICAqIEBwYXJhbSBrb09iamVjdCBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVGcm9tS09PYmplY3Q8VD4oa29PYmplY3Q6IGFueSkge1xuICAgICAgICBpZih0eXBlb2Yga29PYmplY3QgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGtvT2JqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtvT2JqZWN0XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGd2a288VD4oa29PYmplY3Q6IGFueSk6IFQgfCBhbnkge1xuICAgICAgICByZXR1cm4ga28udG9KUyhrb09iamVjdCk7XG4gICAgfSIsIm1vZHVsZS5leHBvcnRzID0ga287IiwiaW1wb3J0IGFuc2lTdHlsZXMgZnJvbSAnI2Fuc2ktc3R5bGVzJztcbmltcG9ydCBzdXBwb3J0c0NvbG9yIGZyb20gJyNzdXBwb3J0cy1jb2xvcic7XG5pbXBvcnQgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGltcG9ydC9vcmRlclxuXHRzdHJpbmdSZXBsYWNlQWxsLFxuXHRzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgsXG59IGZyb20gJy4vdXRpbGl0aWVzLmpzJztcblxuY29uc3Qge3N0ZG91dDogc3Rkb3V0Q29sb3IsIHN0ZGVycjogc3RkZXJyQ29sb3J9ID0gc3VwcG9ydHNDb2xvcjtcblxuY29uc3QgR0VORVJBVE9SID0gU3ltYm9sKCdHRU5FUkFUT1InKTtcbmNvbnN0IFNUWUxFUiA9IFN5bWJvbCgnU1RZTEVSJyk7XG5jb25zdCBJU19FTVBUWSA9IFN5bWJvbCgnSVNfRU1QVFknKTtcblxuLy8gYHN1cHBvcnRzQ29sb3IubGV2ZWxgIOKGkiBgYW5zaVN0eWxlcy5jb2xvcltuYW1lXWAgbWFwcGluZ1xuY29uc3QgbGV2ZWxNYXBwaW5nID0gW1xuXHQnYW5zaScsXG5cdCdhbnNpJyxcblx0J2Fuc2kyNTYnLFxuXHQnYW5zaTE2bScsXG5dO1xuXG5jb25zdCBzdHlsZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5jb25zdCBhcHBseU9wdGlvbnMgPSAob2JqZWN0LCBvcHRpb25zID0ge30pID0+IHtcblx0aWYgKG9wdGlvbnMubGV2ZWwgJiYgIShOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubGV2ZWwpICYmIG9wdGlvbnMubGV2ZWwgPj0gMCAmJiBvcHRpb25zLmxldmVsIDw9IDMpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgYGxldmVsYCBvcHRpb24gc2hvdWxkIGJlIGFuIGludGVnZXIgZnJvbSAwIHRvIDMnKTtcblx0fVxuXG5cdC8vIERldGVjdCBsZXZlbCBpZiBub3Qgc2V0IG1hbnVhbGx5XG5cdGNvbnN0IGNvbG9yTGV2ZWwgPSBzdGRvdXRDb2xvciA/IHN0ZG91dENvbG9yLmxldmVsIDogMDtcblx0b2JqZWN0LmxldmVsID0gb3B0aW9ucy5sZXZlbCA9PT0gdW5kZWZpbmVkID8gY29sb3JMZXZlbCA6IG9wdGlvbnMubGV2ZWw7XG59O1xuXG5leHBvcnQgY2xhc3MgQ2hhbGsge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0cnVjdG9yLXJldHVyblxuXHRcdHJldHVybiBjaGFsa0ZhY3Rvcnkob3B0aW9ucyk7XG5cdH1cbn1cblxuY29uc3QgY2hhbGtGYWN0b3J5ID0gb3B0aW9ucyA9PiB7XG5cdGNvbnN0IGNoYWxrID0gKC4uLnN0cmluZ3MpID0+IHN0cmluZ3Muam9pbignICcpO1xuXHRhcHBseU9wdGlvbnMoY2hhbGssIG9wdGlvbnMpO1xuXG5cdE9iamVjdC5zZXRQcm90b3R5cGVPZihjaGFsaywgY3JlYXRlQ2hhbGsucHJvdG90eXBlKTtcblxuXHRyZXR1cm4gY2hhbGs7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDaGFsayhvcHRpb25zKSB7XG5cdHJldHVybiBjaGFsa0ZhY3Rvcnkob3B0aW9ucyk7XG59XG5cbk9iamVjdC5zZXRQcm90b3R5cGVPZihjcmVhdGVDaGFsay5wcm90b3R5cGUsIEZ1bmN0aW9uLnByb3RvdHlwZSk7XG5cbmZvciAoY29uc3QgW3N0eWxlTmFtZSwgc3R5bGVdIG9mIE9iamVjdC5lbnRyaWVzKGFuc2lTdHlsZXMpKSB7XG5cdHN0eWxlc1tzdHlsZU5hbWVdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IGJ1aWxkZXIgPSBjcmVhdGVCdWlsZGVyKHRoaXMsIGNyZWF0ZVN0eWxlcihzdHlsZS5vcGVuLCBzdHlsZS5jbG9zZSwgdGhpc1tTVFlMRVJdKSwgdGhpc1tJU19FTVBUWV0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHN0eWxlTmFtZSwge3ZhbHVlOiBidWlsZGVyfSk7XG5cdFx0XHRyZXR1cm4gYnVpbGRlcjtcblx0XHR9LFxuXHR9O1xufVxuXG5zdHlsZXMudmlzaWJsZSA9IHtcblx0Z2V0KCkge1xuXHRcdGNvbnN0IGJ1aWxkZXIgPSBjcmVhdGVCdWlsZGVyKHRoaXMsIHRoaXNbU1RZTEVSXSwgdHJ1ZSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd2aXNpYmxlJywge3ZhbHVlOiBidWlsZGVyfSk7XG5cdFx0cmV0dXJuIGJ1aWxkZXI7XG5cdH0sXG59O1xuXG5jb25zdCBnZXRNb2RlbEFuc2kgPSAobW9kZWwsIGxldmVsLCB0eXBlLCAuLi5hcmd1bWVudHNfKSA9PiB7XG5cdGlmIChtb2RlbCA9PT0gJ3JnYicpIHtcblx0XHRpZiAobGV2ZWwgPT09ICdhbnNpMTZtJykge1xuXHRcdFx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV0uYW5zaTE2bSguLi5hcmd1bWVudHNfKTtcblx0XHR9XG5cblx0XHRpZiAobGV2ZWwgPT09ICdhbnNpMjU2Jykge1xuXHRcdFx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV0uYW5zaTI1NihhbnNpU3R5bGVzLnJnYlRvQW5zaTI1NiguLi5hcmd1bWVudHNfKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV0uYW5zaShhbnNpU3R5bGVzLnJnYlRvQW5zaSguLi5hcmd1bWVudHNfKSk7XG5cdH1cblxuXHRpZiAobW9kZWwgPT09ICdoZXgnKSB7XG5cdFx0cmV0dXJuIGdldE1vZGVsQW5zaSgncmdiJywgbGV2ZWwsIHR5cGUsIC4uLmFuc2lTdHlsZXMuaGV4VG9SZ2IoLi4uYXJndW1lbnRzXykpO1xuXHR9XG5cblx0cmV0dXJuIGFuc2lTdHlsZXNbdHlwZV1bbW9kZWxdKC4uLmFyZ3VtZW50c18pO1xufTtcblxuY29uc3QgdXNlZE1vZGVscyA9IFsncmdiJywgJ2hleCcsICdhbnNpMjU2J107XG5cbmZvciAoY29uc3QgbW9kZWwgb2YgdXNlZE1vZGVscykge1xuXHRzdHlsZXNbbW9kZWxdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IHtsZXZlbH0gPSB0aGlzO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0XHRcdGNvbnN0IHN0eWxlciA9IGNyZWF0ZVN0eWxlcihnZXRNb2RlbEFuc2kobW9kZWwsIGxldmVsTWFwcGluZ1tsZXZlbF0sICdjb2xvcicsIC4uLmFyZ3VtZW50c18pLCBhbnNpU3R5bGVzLmNvbG9yLmNsb3NlLCB0aGlzW1NUWUxFUl0pO1xuXHRcdFx0XHRyZXR1cm4gY3JlYXRlQnVpbGRlcih0aGlzLCBzdHlsZXIsIHRoaXNbSVNfRU1QVFldKTtcblx0XHRcdH07XG5cdFx0fSxcblx0fTtcblxuXHRjb25zdCBiZ01vZGVsID0gJ2JnJyArIG1vZGVsWzBdLnRvVXBwZXJDYXNlKCkgKyBtb2RlbC5zbGljZSgxKTtcblx0c3R5bGVzW2JnTW9kZWxdID0ge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IHtsZXZlbH0gPSB0aGlzO1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0XHRcdGNvbnN0IHN0eWxlciA9IGNyZWF0ZVN0eWxlcihnZXRNb2RlbEFuc2kobW9kZWwsIGxldmVsTWFwcGluZ1tsZXZlbF0sICdiZ0NvbG9yJywgLi4uYXJndW1lbnRzXyksIGFuc2lTdHlsZXMuYmdDb2xvci5jbG9zZSwgdGhpc1tTVFlMRVJdKTtcblx0XHRcdFx0cmV0dXJuIGNyZWF0ZUJ1aWxkZXIodGhpcywgc3R5bGVyLCB0aGlzW0lTX0VNUFRZXSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cdH07XG59XG5cbmNvbnN0IHByb3RvID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoKCkgPT4ge30sIHtcblx0Li4uc3R5bGVzLFxuXHRsZXZlbDoge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0Z2V0KCkge1xuXHRcdFx0cmV0dXJuIHRoaXNbR0VORVJBVE9SXS5sZXZlbDtcblx0XHR9LFxuXHRcdHNldChsZXZlbCkge1xuXHRcdFx0dGhpc1tHRU5FUkFUT1JdLmxldmVsID0gbGV2ZWw7XG5cdFx0fSxcblx0fSxcbn0pO1xuXG5jb25zdCBjcmVhdGVTdHlsZXIgPSAob3BlbiwgY2xvc2UsIHBhcmVudCkgPT4ge1xuXHRsZXQgb3BlbkFsbDtcblx0bGV0IGNsb3NlQWxsO1xuXHRpZiAocGFyZW50ID09PSB1bmRlZmluZWQpIHtcblx0XHRvcGVuQWxsID0gb3Blbjtcblx0XHRjbG9zZUFsbCA9IGNsb3NlO1xuXHR9IGVsc2Uge1xuXHRcdG9wZW5BbGwgPSBwYXJlbnQub3BlbkFsbCArIG9wZW47XG5cdFx0Y2xvc2VBbGwgPSBjbG9zZSArIHBhcmVudC5jbG9zZUFsbDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0b3Blbixcblx0XHRjbG9zZSxcblx0XHRvcGVuQWxsLFxuXHRcdGNsb3NlQWxsLFxuXHRcdHBhcmVudCxcblx0fTtcbn07XG5cbmNvbnN0IGNyZWF0ZUJ1aWxkZXIgPSAoc2VsZiwgX3N0eWxlciwgX2lzRW1wdHkpID0+IHtcblx0Ly8gU2luZ2xlIGFyZ3VtZW50IGlzIGhvdCBwYXRoLCBpbXBsaWNpdCBjb2VyY2lvbiBpcyBmYXN0ZXIgdGhhbiBhbnl0aGluZ1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8taW1wbGljaXQtY29lcmNpb25cblx0Y29uc3QgYnVpbGRlciA9ICguLi5hcmd1bWVudHNfKSA9PiBhcHBseVN0eWxlKGJ1aWxkZXIsIChhcmd1bWVudHNfLmxlbmd0aCA9PT0gMSkgPyAoJycgKyBhcmd1bWVudHNfWzBdKSA6IGFyZ3VtZW50c18uam9pbignICcpKTtcblxuXHQvLyBXZSBhbHRlciB0aGUgcHJvdG90eXBlIGJlY2F1c2Ugd2UgbXVzdCByZXR1cm4gYSBmdW5jdGlvbiwgYnV0IHRoZXJlIGlzXG5cdC8vIG5vIHdheSB0byBjcmVhdGUgYSBmdW5jdGlvbiB3aXRoIGEgZGlmZmVyZW50IHByb3RvdHlwZVxuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YoYnVpbGRlciwgcHJvdG8pO1xuXG5cdGJ1aWxkZXJbR0VORVJBVE9SXSA9IHNlbGY7XG5cdGJ1aWxkZXJbU1RZTEVSXSA9IF9zdHlsZXI7XG5cdGJ1aWxkZXJbSVNfRU1QVFldID0gX2lzRW1wdHk7XG5cblx0cmV0dXJuIGJ1aWxkZXI7XG59O1xuXG5jb25zdCBhcHBseVN0eWxlID0gKHNlbGYsIHN0cmluZykgPT4ge1xuXHRpZiAoc2VsZi5sZXZlbCA8PSAwIHx8ICFzdHJpbmcpIHtcblx0XHRyZXR1cm4gc2VsZltJU19FTVBUWV0gPyAnJyA6IHN0cmluZztcblx0fVxuXG5cdGxldCBzdHlsZXIgPSBzZWxmW1NUWUxFUl07XG5cblx0aWYgKHN0eWxlciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHN0cmluZztcblx0fVxuXG5cdGNvbnN0IHtvcGVuQWxsLCBjbG9zZUFsbH0gPSBzdHlsZXI7XG5cdGlmIChzdHJpbmcuaW5jbHVkZXMoJ1xcdTAwMUInKSkge1xuXHRcdHdoaWxlIChzdHlsZXIgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Ly8gUmVwbGFjZSBhbnkgaW5zdGFuY2VzIGFscmVhZHkgcHJlc2VudCB3aXRoIGEgcmUtb3BlbmluZyBjb2RlXG5cdFx0XHQvLyBvdGhlcndpc2Ugb25seSB0aGUgcGFydCBvZiB0aGUgc3RyaW5nIHVudGlsIHNhaWQgY2xvc2luZyBjb2RlXG5cdFx0XHQvLyB3aWxsIGJlIGNvbG9yZWQsIGFuZCB0aGUgcmVzdCB3aWxsIHNpbXBseSBiZSAncGxhaW4nLlxuXHRcdFx0c3RyaW5nID0gc3RyaW5nUmVwbGFjZUFsbChzdHJpbmcsIHN0eWxlci5jbG9zZSwgc3R5bGVyLm9wZW4pO1xuXG5cdFx0XHRzdHlsZXIgPSBzdHlsZXIucGFyZW50O1xuXHRcdH1cblx0fVxuXG5cdC8vIFdlIGNhbiBtb3ZlIGJvdGggbmV4dCBhY3Rpb25zIG91dCBvZiBsb29wLCBiZWNhdXNlIHJlbWFpbmluZyBhY3Rpb25zIGluIGxvb3Agd29uJ3QgaGF2ZVxuXHQvLyBhbnkvdmlzaWJsZSBlZmZlY3Qgb24gcGFydHMgd2UgYWRkIGhlcmUuIENsb3NlIHRoZSBzdHlsaW5nIGJlZm9yZSBhIGxpbmVicmVhayBhbmQgcmVvcGVuXG5cdC8vIGFmdGVyIG5leHQgbGluZSB0byBmaXggYSBibGVlZCBpc3N1ZSBvbiBtYWNPUzogaHR0cHM6Ly9naXRodWIuY29tL2NoYWxrL2NoYWxrL3B1bGwvOTJcblx0Y29uc3QgbGZJbmRleCA9IHN0cmluZy5pbmRleE9mKCdcXG4nKTtcblx0aWYgKGxmSW5kZXggIT09IC0xKSB7XG5cdFx0c3RyaW5nID0gc3RyaW5nRW5jYXNlQ1JMRldpdGhGaXJzdEluZGV4KHN0cmluZywgY2xvc2VBbGwsIG9wZW5BbGwsIGxmSW5kZXgpO1xuXHR9XG5cblx0cmV0dXJuIG9wZW5BbGwgKyBzdHJpbmcgKyBjbG9zZUFsbDtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNyZWF0ZUNoYWxrLnByb3RvdHlwZSwgc3R5bGVzKTtcblxuY29uc3QgY2hhbGsgPSBjcmVhdGVDaGFsaygpO1xuZXhwb3J0IGNvbnN0IGNoYWxrU3RkZXJyID0gY3JlYXRlQ2hhbGsoe2xldmVsOiBzdGRlcnJDb2xvciA/IHN0ZGVyckNvbG9yLmxldmVsIDogMH0pO1xuXG5leHBvcnQge1xuXHRtb2RpZmllck5hbWVzLFxuXHRmb3JlZ3JvdW5kQ29sb3JOYW1lcyxcblx0YmFja2dyb3VuZENvbG9yTmFtZXMsXG5cdGNvbG9yTmFtZXMsXG5cblx0Ly8gVE9ETzogUmVtb3ZlIHRoZXNlIGFsaWFzZXMgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvblxuXHRtb2RpZmllck5hbWVzIGFzIG1vZGlmaWVycyxcblx0Zm9yZWdyb3VuZENvbG9yTmFtZXMgYXMgZm9yZWdyb3VuZENvbG9ycyxcblx0YmFja2dyb3VuZENvbG9yTmFtZXMgYXMgYmFja2dyb3VuZENvbG9ycyxcblx0Y29sb3JOYW1lcyBhcyBjb2xvcnMsXG59IGZyb20gJy4vdmVuZG9yL2Fuc2ktc3R5bGVzL2luZGV4LmpzJztcblxuZXhwb3J0IHtcblx0c3Rkb3V0Q29sb3IgYXMgc3VwcG9ydHNDb2xvcixcblx0c3RkZXJyQ29sb3IgYXMgc3VwcG9ydHNDb2xvclN0ZGVycixcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNoYWxrO1xuIiwiLy8gVE9ETzogV2hlbiB0YXJnZXRpbmcgTm9kZS5qcyAxNiwgdXNlIGBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VBbGxgLlxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1JlcGxhY2VBbGwoc3RyaW5nLCBzdWJzdHJpbmcsIHJlcGxhY2VyKSB7XG5cdGxldCBpbmRleCA9IHN0cmluZy5pbmRleE9mKHN1YnN0cmluZyk7XG5cdGlmIChpbmRleCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gc3RyaW5nO1xuXHR9XG5cblx0Y29uc3Qgc3Vic3RyaW5nTGVuZ3RoID0gc3Vic3RyaW5nLmxlbmd0aDtcblx0bGV0IGVuZEluZGV4ID0gMDtcblx0bGV0IHJldHVyblZhbHVlID0gJyc7XG5cdGRvIHtcblx0XHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgsIGluZGV4KSArIHN1YnN0cmluZyArIHJlcGxhY2VyO1xuXHRcdGVuZEluZGV4ID0gaW5kZXggKyBzdWJzdHJpbmdMZW5ndGg7XG5cdFx0aW5kZXggPSBzdHJpbmcuaW5kZXhPZihzdWJzdHJpbmcsIGVuZEluZGV4KTtcblx0fSB3aGlsZSAoaW5kZXggIT09IC0xKTtcblxuXHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgpO1xuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdFbmNhc2VDUkxGV2l0aEZpcnN0SW5kZXgoc3RyaW5nLCBwcmVmaXgsIHBvc3RmaXgsIGluZGV4KSB7XG5cdGxldCBlbmRJbmRleCA9IDA7XG5cdGxldCByZXR1cm5WYWx1ZSA9ICcnO1xuXHRkbyB7XG5cdFx0Y29uc3QgZ290Q1IgPSBzdHJpbmdbaW5kZXggLSAxXSA9PT0gJ1xccic7XG5cdFx0cmV0dXJuVmFsdWUgKz0gc3RyaW5nLnNsaWNlKGVuZEluZGV4LCAoZ290Q1IgPyBpbmRleCAtIDEgOiBpbmRleCkpICsgcHJlZml4ICsgKGdvdENSID8gJ1xcclxcbicgOiAnXFxuJykgKyBwb3N0Zml4O1xuXHRcdGVuZEluZGV4ID0gaW5kZXggKyAxO1xuXHRcdGluZGV4ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicsIGVuZEluZGV4KTtcblx0fSB3aGlsZSAoaW5kZXggIT09IC0xKTtcblxuXHRyZXR1cm5WYWx1ZSArPSBzdHJpbmcuc2xpY2UoZW5kSW5kZXgpO1xuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XG59XG4iLCJjb25zdCBBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUID0gMTA7XG5cbmNvbnN0IHdyYXBBbnNpMTYgPSAob2Zmc2V0ID0gMCkgPT4gY29kZSA9PiBgXFx1MDAxQlske2NvZGUgKyBvZmZzZXR9bWA7XG5cbmNvbnN0IHdyYXBBbnNpMjU2ID0gKG9mZnNldCA9IDApID0+IGNvZGUgPT4gYFxcdTAwMUJbJHszOCArIG9mZnNldH07NTske2NvZGV9bWA7XG5cbmNvbnN0IHdyYXBBbnNpMTZtID0gKG9mZnNldCA9IDApID0+IChyZWQsIGdyZWVuLCBibHVlKSA9PiBgXFx1MDAxQlskezM4ICsgb2Zmc2V0fTsyOyR7cmVkfTske2dyZWVufTske2JsdWV9bWA7XG5cbmNvbnN0IHN0eWxlcyA9IHtcblx0bW9kaWZpZXI6IHtcblx0XHRyZXNldDogWzAsIDBdLFxuXHRcdC8vIDIxIGlzbid0IHdpZGVseSBzdXBwb3J0ZWQgYW5kIDIyIGRvZXMgdGhlIHNhbWUgdGhpbmdcblx0XHRib2xkOiBbMSwgMjJdLFxuXHRcdGRpbTogWzIsIDIyXSxcblx0XHRpdGFsaWM6IFszLCAyM10sXG5cdFx0dW5kZXJsaW5lOiBbNCwgMjRdLFxuXHRcdG92ZXJsaW5lOiBbNTMsIDU1XSxcblx0XHRpbnZlcnNlOiBbNywgMjddLFxuXHRcdGhpZGRlbjogWzgsIDI4XSxcblx0XHRzdHJpa2V0aHJvdWdoOiBbOSwgMjldLFxuXHR9LFxuXHRjb2xvcjoge1xuXHRcdGJsYWNrOiBbMzAsIDM5XSxcblx0XHRyZWQ6IFszMSwgMzldLFxuXHRcdGdyZWVuOiBbMzIsIDM5XSxcblx0XHR5ZWxsb3c6IFszMywgMzldLFxuXHRcdGJsdWU6IFszNCwgMzldLFxuXHRcdG1hZ2VudGE6IFszNSwgMzldLFxuXHRcdGN5YW46IFszNiwgMzldLFxuXHRcdHdoaXRlOiBbMzcsIDM5XSxcblxuXHRcdC8vIEJyaWdodCBjb2xvclxuXHRcdGJsYWNrQnJpZ2h0OiBbOTAsIDM5XSxcblx0XHRncmF5OiBbOTAsIDM5XSwgLy8gQWxpYXMgb2YgYGJsYWNrQnJpZ2h0YFxuXHRcdGdyZXk6IFs5MCwgMzldLCAvLyBBbGlhcyBvZiBgYmxhY2tCcmlnaHRgXG5cdFx0cmVkQnJpZ2h0OiBbOTEsIDM5XSxcblx0XHRncmVlbkJyaWdodDogWzkyLCAzOV0sXG5cdFx0eWVsbG93QnJpZ2h0OiBbOTMsIDM5XSxcblx0XHRibHVlQnJpZ2h0OiBbOTQsIDM5XSxcblx0XHRtYWdlbnRhQnJpZ2h0OiBbOTUsIDM5XSxcblx0XHRjeWFuQnJpZ2h0OiBbOTYsIDM5XSxcblx0XHR3aGl0ZUJyaWdodDogWzk3LCAzOV0sXG5cdH0sXG5cdGJnQ29sb3I6IHtcblx0XHRiZ0JsYWNrOiBbNDAsIDQ5XSxcblx0XHRiZ1JlZDogWzQxLCA0OV0sXG5cdFx0YmdHcmVlbjogWzQyLCA0OV0sXG5cdFx0YmdZZWxsb3c6IFs0MywgNDldLFxuXHRcdGJnQmx1ZTogWzQ0LCA0OV0sXG5cdFx0YmdNYWdlbnRhOiBbNDUsIDQ5XSxcblx0XHRiZ0N5YW46IFs0NiwgNDldLFxuXHRcdGJnV2hpdGU6IFs0NywgNDldLFxuXG5cdFx0Ly8gQnJpZ2h0IGNvbG9yXG5cdFx0YmdCbGFja0JyaWdodDogWzEwMCwgNDldLFxuXHRcdGJnR3JheTogWzEwMCwgNDldLCAvLyBBbGlhcyBvZiBgYmdCbGFja0JyaWdodGBcblx0XHRiZ0dyZXk6IFsxMDAsIDQ5XSwgLy8gQWxpYXMgb2YgYGJnQmxhY2tCcmlnaHRgXG5cdFx0YmdSZWRCcmlnaHQ6IFsxMDEsIDQ5XSxcblx0XHRiZ0dyZWVuQnJpZ2h0OiBbMTAyLCA0OV0sXG5cdFx0YmdZZWxsb3dCcmlnaHQ6IFsxMDMsIDQ5XSxcblx0XHRiZ0JsdWVCcmlnaHQ6IFsxMDQsIDQ5XSxcblx0XHRiZ01hZ2VudGFCcmlnaHQ6IFsxMDUsIDQ5XSxcblx0XHRiZ0N5YW5CcmlnaHQ6IFsxMDYsIDQ5XSxcblx0XHRiZ1doaXRlQnJpZ2h0OiBbMTA3LCA0OV0sXG5cdH0sXG59O1xuXG5leHBvcnQgY29uc3QgbW9kaWZpZXJOYW1lcyA9IE9iamVjdC5rZXlzKHN0eWxlcy5tb2RpZmllcik7XG5leHBvcnQgY29uc3QgZm9yZWdyb3VuZENvbG9yTmFtZXMgPSBPYmplY3Qua2V5cyhzdHlsZXMuY29sb3IpO1xuZXhwb3J0IGNvbnN0IGJhY2tncm91bmRDb2xvck5hbWVzID0gT2JqZWN0LmtleXMoc3R5bGVzLmJnQ29sb3IpO1xuZXhwb3J0IGNvbnN0IGNvbG9yTmFtZXMgPSBbLi4uZm9yZWdyb3VuZENvbG9yTmFtZXMsIC4uLmJhY2tncm91bmRDb2xvck5hbWVzXTtcblxuZnVuY3Rpb24gYXNzZW1ibGVTdHlsZXMoKSB7XG5cdGNvbnN0IGNvZGVzID0gbmV3IE1hcCgpO1xuXG5cdGZvciAoY29uc3QgW2dyb3VwTmFtZSwgZ3JvdXBdIG9mIE9iamVjdC5lbnRyaWVzKHN0eWxlcykpIHtcblx0XHRmb3IgKGNvbnN0IFtzdHlsZU5hbWUsIHN0eWxlXSBvZiBPYmplY3QuZW50cmllcyhncm91cCkpIHtcblx0XHRcdHN0eWxlc1tzdHlsZU5hbWVdID0ge1xuXHRcdFx0XHRvcGVuOiBgXFx1MDAxQlske3N0eWxlWzBdfW1gLFxuXHRcdFx0XHRjbG9zZTogYFxcdTAwMUJbJHtzdHlsZVsxXX1tYCxcblx0XHRcdH07XG5cblx0XHRcdGdyb3VwW3N0eWxlTmFtZV0gPSBzdHlsZXNbc3R5bGVOYW1lXTtcblxuXHRcdFx0Y29kZXMuc2V0KHN0eWxlWzBdLCBzdHlsZVsxXSk7XG5cdFx0fVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHN0eWxlcywgZ3JvdXBOYW1lLCB7XG5cdFx0XHR2YWx1ZTogZ3JvdXAsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9KTtcblx0fVxuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdHlsZXMsICdjb2RlcycsIHtcblx0XHR2YWx1ZTogY29kZXMsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdH0pO1xuXG5cdHN0eWxlcy5jb2xvci5jbG9zZSA9ICdcXHUwMDFCWzM5bSc7XG5cdHN0eWxlcy5iZ0NvbG9yLmNsb3NlID0gJ1xcdTAwMUJbNDltJztcblxuXHRzdHlsZXMuY29sb3IuYW5zaSA9IHdyYXBBbnNpMTYoKTtcblx0c3R5bGVzLmNvbG9yLmFuc2kyNTYgPSB3cmFwQW5zaTI1NigpO1xuXHRzdHlsZXMuY29sb3IuYW5zaTE2bSA9IHdyYXBBbnNpMTZtKCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kgPSB3cmFwQW5zaTE2KEFOU0lfQkFDS0dST1VORF9PRkZTRVQpO1xuXHRzdHlsZXMuYmdDb2xvci5hbnNpMjU2ID0gd3JhcEFuc2kyNTYoQU5TSV9CQUNLR1JPVU5EX09GRlNFVCk7XG5cdHN0eWxlcy5iZ0NvbG9yLmFuc2kxNm0gPSB3cmFwQW5zaTE2bShBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUKTtcblxuXHQvLyBGcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9RaXgtL2NvbG9yLWNvbnZlcnQvYmxvYi8zZjBlMGQ0ZTkyZTIzNTc5NmNjYjE3ZjZlODVjNzIwOTRhNjUxZjQ5L2NvbnZlcnNpb25zLmpzXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHN0eWxlcywge1xuXHRcdHJnYlRvQW5zaTI1Njoge1xuXHRcdFx0dmFsdWUocmVkLCBncmVlbiwgYmx1ZSkge1xuXHRcdFx0XHQvLyBXZSB1c2UgdGhlIGV4dGVuZGVkIGdyZXlzY2FsZSBwYWxldHRlIGhlcmUsIHdpdGggdGhlIGV4Y2VwdGlvbiBvZlxuXHRcdFx0XHQvLyBibGFjayBhbmQgd2hpdGUuIG5vcm1hbCBwYWxldHRlIG9ubHkgaGFzIDQgZ3JleXNjYWxlIHNoYWRlcy5cblx0XHRcdFx0aWYgKHJlZCA9PT0gZ3JlZW4gJiYgZ3JlZW4gPT09IGJsdWUpIHtcblx0XHRcdFx0XHRpZiAocmVkIDwgOCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDE2O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChyZWQgPiAyNDgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAyMzE7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIE1hdGgucm91bmQoKChyZWQgLSA4KSAvIDI0NykgKiAyNCkgKyAyMzI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gMTZcblx0XHRcdFx0XHQrICgzNiAqIE1hdGgucm91bmQocmVkIC8gMjU1ICogNSkpXG5cdFx0XHRcdFx0KyAoNiAqIE1hdGgucm91bmQoZ3JlZW4gLyAyNTUgKiA1KSlcblx0XHRcdFx0XHQrIE1hdGgucm91bmQoYmx1ZSAvIDI1NSAqIDUpO1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0aGV4VG9SZ2I6IHtcblx0XHRcdHZhbHVlKGhleCkge1xuXHRcdFx0XHRjb25zdCBtYXRjaGVzID0gL1thLWZcXGRdezZ9fFthLWZcXGRdezN9L2kuZXhlYyhoZXgudG9TdHJpbmcoMTYpKTtcblx0XHRcdFx0aWYgKCFtYXRjaGVzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFswLCAwLCAwXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBbY29sb3JTdHJpbmddID0gbWF0Y2hlcztcblxuXHRcdFx0XHRpZiAoY29sb3JTdHJpbmcubGVuZ3RoID09PSAzKSB7XG5cdFx0XHRcdFx0Y29sb3JTdHJpbmcgPSBbLi4uY29sb3JTdHJpbmddLm1hcChjaGFyYWN0ZXIgPT4gY2hhcmFjdGVyICsgY2hhcmFjdGVyKS5qb2luKCcnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IGludGVnZXIgPSBOdW1iZXIucGFyc2VJbnQoY29sb3JTdHJpbmcsIDE2KTtcblxuXHRcdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRcdC8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblx0XHRcdFx0XHQoaW50ZWdlciA+PiAxNikgJiAweEZGLFxuXHRcdFx0XHRcdChpbnRlZ2VyID4+IDgpICYgMHhGRixcblx0XHRcdFx0XHRpbnRlZ2VyICYgMHhGRixcblx0XHRcdFx0XHQvKiBlc2xpbnQtZW5hYmxlIG5vLWJpdHdpc2UgKi9cblx0XHRcdFx0XTtcblx0XHRcdH0sXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGhleFRvQW5zaTI1Njoge1xuXHRcdFx0dmFsdWU6IGhleCA9PiBzdHlsZXMucmdiVG9BbnNpMjU2KC4uLnN0eWxlcy5oZXhUb1JnYihoZXgpKSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0YW5zaTI1NlRvQW5zaToge1xuXHRcdFx0dmFsdWUoY29kZSkge1xuXHRcdFx0XHRpZiAoY29kZSA8IDgpIHtcblx0XHRcdFx0XHRyZXR1cm4gMzAgKyBjb2RlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGNvZGUgPCAxNikge1xuXHRcdFx0XHRcdHJldHVybiA5MCArIChjb2RlIC0gOCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgcmVkO1xuXHRcdFx0XHRsZXQgZ3JlZW47XG5cdFx0XHRcdGxldCBibHVlO1xuXG5cdFx0XHRcdGlmIChjb2RlID49IDIzMikge1xuXHRcdFx0XHRcdHJlZCA9ICgoKGNvZGUgLSAyMzIpICogMTApICsgOCkgLyAyNTU7XG5cdFx0XHRcdFx0Z3JlZW4gPSByZWQ7XG5cdFx0XHRcdFx0Ymx1ZSA9IHJlZDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb2RlIC09IDE2O1xuXG5cdFx0XHRcdFx0Y29uc3QgcmVtYWluZGVyID0gY29kZSAlIDM2O1xuXG5cdFx0XHRcdFx0cmVkID0gTWF0aC5mbG9vcihjb2RlIC8gMzYpIC8gNTtcblx0XHRcdFx0XHRncmVlbiA9IE1hdGguZmxvb3IocmVtYWluZGVyIC8gNikgLyA1O1xuXHRcdFx0XHRcdGJsdWUgPSAocmVtYWluZGVyICUgNikgLyA1O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgdmFsdWUgPSBNYXRoLm1heChyZWQsIGdyZWVuLCBibHVlKSAqIDI7XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSAwKSB7XG5cdFx0XHRcdFx0cmV0dXJuIDMwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdFx0bGV0IHJlc3VsdCA9IDMwICsgKChNYXRoLnJvdW5kKGJsdWUpIDw8IDIpIHwgKE1hdGgucm91bmQoZ3JlZW4pIDw8IDEpIHwgTWF0aC5yb3VuZChyZWQpKTtcblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IDIpIHtcblx0XHRcdFx0XHRyZXN1bHQgKz0gNjA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0cmdiVG9BbnNpOiB7XG5cdFx0XHR2YWx1ZTogKHJlZCwgZ3JlZW4sIGJsdWUpID0+IHN0eWxlcy5hbnNpMjU2VG9BbnNpKHN0eWxlcy5yZ2JUb0Fuc2kyNTYocmVkLCBncmVlbiwgYmx1ZSkpLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRoZXhUb0Fuc2k6IHtcblx0XHRcdHZhbHVlOiBoZXggPT4gc3R5bGVzLmFuc2kyNTZUb0Fuc2koc3R5bGVzLmhleFRvQW5zaTI1NihoZXgpKSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdH0pO1xuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmNvbnN0IGFuc2lTdHlsZXMgPSBhc3NlbWJsZVN0eWxlcygpO1xuXG5leHBvcnQgZGVmYXVsdCBhbnNpU3R5bGVzO1xuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbmNvbnN0IGxldmVsID0gKCgpID0+IHtcblx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnREYXRhKSB7XG5cdFx0Y29uc3QgYnJhbmQgPSBuYXZpZ2F0b3IudXNlckFnZW50RGF0YS5icmFuZHMuZmluZCgoe2JyYW5kfSkgPT4gYnJhbmQgPT09ICdDaHJvbWl1bScpO1xuXHRcdGlmIChicmFuZCAmJiBicmFuZC52ZXJzaW9uID4gOTMpIHtcblx0XHRcdHJldHVybiAzO1xuXHRcdH1cblx0fVxuXG5cdGlmICgvXFxiKENocm9tZXxDaHJvbWl1bSlcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdHJldHVybiAwO1xufSkoKTtcblxuY29uc3QgY29sb3JTdXBwb3J0ID0gbGV2ZWwgIT09IDAgJiYge1xuXHRsZXZlbCxcblx0aGFzQmFzaWM6IHRydWUsXG5cdGhhczI1NjogbGV2ZWwgPj0gMixcblx0aGFzMTZtOiBsZXZlbCA+PSAzLFxufTtcblxuY29uc3Qgc3VwcG9ydHNDb2xvciA9IHtcblx0c3Rkb3V0OiBjb2xvclN1cHBvcnQsXG5cdHN0ZGVycjogY29sb3JTdXBwb3J0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydHNDb2xvcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBJUmVmcmVzaFdhdGNoZXJDb25maWd1cmF0aW9uIH0gZnJvbSBcIi4vUmVmcmVzaFdhdGNoZXJDb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBUU2hhcmVkbyB9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL1RTaGFyZWRvXCI7XG5pbXBvcnQgeyBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb259IGZyb20gXCIuLi8uLi9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3RcIjtcbmltcG9ydCB7IHN0clRvQ2xhc3MgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL09iamVjdEhlbHBlclwiO1xuaW1wb3J0IGtvIGZyb20gXCJrbm9ja291dFwiO1xuaW1wb3J0IHsgSURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZyB9IGZyb20gXCIuLi8uLi9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0ludGVyZmFjZXNcIjtcblxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIFJlZnJlc2hXYXRjaGVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBhbnksIGJhc2VNb2RlbDogYW55KTogUmVmcmVzaFdhdGNoZXJDbGFzcyB7XG4gICAgcmV0dXJuIG5ldyBSZWZyZXNoV2F0Y2hlckNsYXNzKGVsZW1lbnQsIGNvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbCk7XG59XG5cbmludGVyZmFjZSBJQ29uZmlnIHtcbiAgICBjb25maWd1cmF0aW9uOiBJUmVmcmVzaFdhdGNoZXJDb25maWd1cmF0aW9uXG59XG5cbmNsYXNzIFJlZnJlc2hXYXRjaGVyQ2xhc3Mge1xuXG4gICAgZGVmYXVsdHM6IElSZWZyZXNoV2F0Y2hlckNvbmZpZ3VyYXRpb24gPVxuICAgICAgICB7XG4gICAgICAgICAgICB3aWRnZXRzOiBbXSxcbiAgICAgICAgICAgIHVzZUludGVydmFsUmVmcmVzaEV2ZXJ5WFNlY29uZHM6IGZhbHNlLFxuICAgICAgICAgICAgcmVmcmVzaE9uRXZlbnRzOiBmYWxzZSxcbiAgICAgICAgICAgIGV2ZW50c1RvTGlzdGVuVG86IFtdLFxuICAgICAgICAgICAgaW50ZXJ2YWxTZWNvbmRzOiAwXG4gICAgICAgIH1cbiAgICBjb25maWd1cmF0aW9uOiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248SVJlZnJlc2hXYXRjaGVyQ29uZmlndXJhdGlvbj47IGRpc3Bvc2FibGVzOiBhbnk7XG4gICAgaW50ZXJ2YWw6IE5vZGVKUy5UaW1lb3V0IHwgdW5kZWZpbmVkO1xuICAgIG1vZGVsOiBrby5PYnNlcnZhYmxlPElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8SVJlZnJlc2hXYXRjaGVyQ29uZmlndXJhdGlvbj4+XG4gICAgb3JpZ2luYWxDb25maWd1cmF0aW9uOiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248SVJlZnJlc2hXYXRjaGVyQ29uZmlndXJhdGlvbj47XG4gICAgbGFzdFJlZnJlc2g6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHJlZnJlc2hMb2c6IGFueVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPElSZWZyZXNoV2F0Y2hlckNvbmZpZ3VyYXRpb24+LCBiYXNlTW9kZWw6IFRTaGFyZWRvPGFueT4pIHtcblxuICAgICAgICB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb24gYXMgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPElSZWZyZXNoV2F0Y2hlckNvbmZpZ3VyYXRpb24+OztcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuZGVmYXVsdHMsIGNvbmZpZ3VyYXRpb24pO1xuXG4gICAgICAgIGxldCB4ID0ga28ub2JzZXJ2YWJsZSh0aGlzLmNvbmZpZ3VyYXRpb24uY29uZmlndXJhdGlvbik7XG4gICAgICAgIHRoaXMubW9kZWwgPSB4O1xuXG4gICAgfVxuXG4gICAgcHVibGljIG9uRGVzdHJveSgpOiB2b2lkIHtcblxuICAgICAgICAkdWkudXRpbC5kaXNwb3NlKHRoaXMuZGlzcG9zYWJsZXMpO1xuICAgIH1cblxuXG5cbiAgICBwdWJsaWMgbG9hZEFuZEJpbmQoKTogdm9pZCB7XG5cblxuICAgICAgICB0aGlzLmRpc3Bvc2FibGVzID0gW107XG5cbiAgICAgICAgdGhpcy5tb2RlbCgpLmV2ZW50c1RvTGlzdGVuVG8/LmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1YnNjcmliaW5nIHRvIGV2ZW50XCIsIGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgICAgJHVpLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQuZXZlbnROYW1lLCAoZTphbnkpPT57XG4gICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbXBvbmVudHMoZXZlbnQuZXZlbnROYW1lKTtcbiAgICAgICAgICAgIH0sIHRoaXMpKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbCgpLnVzZUludGVydmFsUmVmcmVzaEV2ZXJ5WFNlY29uZHMgJiYgdGhpcy5tb2RlbCgpLmludGVydmFsU2Vjb25kcyAmJiB0aGlzLm1vZGVsKCkuaW50ZXJ2YWxTZWNvbmRzISA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29tcG9uZW50cyhcImludGVydmFsXCIpO1xuXG4gICAgICAgICAgICB9LCB0aGlzLm1vZGVsKCkuaW50ZXJ2YWxTZWNvbmRzISAqIDEwMDApO1xuXG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLnB1c2godGhpcy5pbnRlcnZhbCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJlZnJlc2hDb21wb25lbnRzKGV2ZW50TmFtZTpzdHJpbmcpIHtcblxuICAgICAgICB0aGlzLnJlZnJlc2hMb2cgPSB0aGlzLnJlZnJlc2hMb2cgfHwgW107XG4gICAgICAgIFxuXG4gICAgICAgIGlmKHRoaXMubGFzdFJlZnJlc2gpIC8vVE9ETzogY2hhbmdlIHRoaXMgc28gd2UgY29sbGVjdCBhbGwgcmVmcmVzaGVzIGFuZCBkbyB0aGVtIGluIG9uZSBnb1xuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgc2Vjb25kc1NpbmNlTGFzdFJlZnJlc2ggPSAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmxhc3RSZWZyZXNoLmdldFRpbWUoKSkgLyAxMDA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlY29uZHMgc2luY2UgbGFzdCByZWZyZXNoXCIsIHNlY29uZHNTaW5jZUxhc3RSZWZyZXNoKTtcbiAgICAgICAgICAgIGlmKHNlY29uZHNTaW5jZUxhc3RSZWZyZXNoIDwgMTApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTa2lwcGluZyByZWZyZXNoLCB0b28gc29vblwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXN0UmVmcmVzaCA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJSZWZyZXNoaW5nIGNvbXBvbmVudHNcIik7XG5cbiAgICAgICAgbGV0IHdpZGdldHNUb1JlZnJlc2ggPSB0aGlzLm1vZGVsKCkud2lkZ2V0cztcbiAgICAgICAgY29uc29sZS5sb2coXCJXaWRnZXRzIHRvIHJlZnJlc2g6IFwiLCB3aWRnZXRzVG9SZWZyZXNoLmxlbmd0aCk7XG5cbiAgICAgICAgd2lkZ2V0c1RvUmVmcmVzaD8uZm9yRWFjaCgod2lkZ2V0VG9SZWZyZXNoKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBsb2dJdGVtID0ge2V2ZW50TmFtZTpldmVudE5hbWUsIHdpZGdldHM6d2lkZ2V0VG9SZWZyZXNoLCB0aW1lOiBuZXcgRGF0ZSgpLCBzdWNjZXNzOmZhbHNlfTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRUb1JlZnJlc2ggPSAkdWkud2lkZ2V0cy5pbnN0YW5jZXMoKS5maW5kKCh4OiBhbnkpID0+IFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsYXNzUmVmZXJlbmNlID0gc3RyVG9DbGFzcyh3aWRnZXRUb1JlZnJlc2gudHlwZU5hbWUsIHdpbmRvdyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFjbGFzc1JlZmVyZW5jZSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIHN0clRvQ2xhc3Mod2lkZ2V0VG9SZWZyZXNoLnR5cGVOYW1lLCB3aW5kb3cpIFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudFRvUmVmcmVzaCAmJiBjb21wb25lbnRUb1JlZnJlc2hbd2lkZ2V0VG9SZWZyZXNoLm1ldGhvZFRvRXhlY3V0ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHBhcmFtcyA9IHdpZGdldHMucGFyYW1ldGVycztcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWZyZXNoaW5nXCIsIHdpZGdldFRvUmVmcmVzaC50eXBlTmFtZSwgd2lkZ2V0VG9SZWZyZXNoLm1ldGhvZFRvRXhlY3V0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFRvUmVmcmVzaFt3aWRnZXRUb1JlZnJlc2gubWV0aG9kVG9FeGVjdXRlXSgpOyAvL3RvZG86IHBhcmFtZXRlcnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsb2dJdGVtLnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaExvZy5wdXNoKGxvZ0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==