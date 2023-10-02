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
    return getValueFromKOObject(koObject);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztxQkFDaEI7b0JBQ0EsT0FBTyxDQUFDLFlBQVksZ0VBQVUsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDckUsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxrQkFBa0IsSUFBSSxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEVBQUU7b0JBQzNFLG1DQUFtQztvQkFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ3JGLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUMsa0JBQWtCO2lCQUM1RTthQUNKO1lBQ0QsT0FBTyxDQUFDLEVBQUU7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUVsQjtvQkFFRDtnQkFDSSxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDakM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiIsInNvdXJjZXMiOlsid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9zcmMvQ29tbW9uL0xvZy50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vc3JjL0NvbW1vbi9TdGFja0hlbHBlci50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9PYmplY3RIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy9leHRlcm5hbCB2YXIgXCJrb1wiIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL2luZGV4LmpzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9ub2RlX21vZHVsZXMvY2hhbGsvc291cmNlL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vbm9kZV9tb2R1bGVzL2NoYWxrL3NvdXJjZS92ZW5kb3IvYW5zaS1zdHlsZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL25vZGVfbW9kdWxlcy9jaGFsay9zb3VyY2UvdmVuZG9yL3N1cHBvcnRzLWNvbG9yL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL3NyYy9XZWJCYXNlZC9Qb3J0YWxXaWRnZXRzL1JlZnJlc2hXYXRjaGVyL1JlZnJlc2hXYXRjaGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsaywgeyBDaGFsa0luc3RhbmNlIH0gZnJvbSAnY2hhbGsnO1xuaW1wb3J0IHsgZXh0cmFjdENhbGxlckZyb21TdGFjaywgZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2sgfSBmcm9tICcuL1N0YWNrSGVscGVyJztcblxuY2hhbGsubGV2ZWwgPSAzO1xubGV0IGRlZmF1bHRNb2RlOiBDaGFsa0luc3RhbmNlID0gY2hhbGsucmVzZXQ7XG5cblxubGV0IGxhc3RTZWM6IFNlY3Rpb24gfCB1bmRlZmluZWQ7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyU2VjKCkge1xuXG4gICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IDEwOyBpKyspe1xuICAgIC8vIGNvbnNvbGUuZ3JvdXBFbmQoKVxuICAgIC8vIH1cblxuICAgIGlmIChsYXN0U2VjPy5ncm91cCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhc3RTZWM/Lmdyb3VwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsYXN0U2VjID0gbmV3IFNlY3Rpb24oXCJSb290XCIsIGRlZmF1bHRNb2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlY0JhY2tPbmUoKSB7XG4gICAgbGFzdFNlYyA9IGxhc3RTZWM/LnBhcmVudDtcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG59XG5cbmV4cG9ydCBjbGFzcyBTZWN0aW9uIHtcbiAgICBzZWN0aW9uTmFtZTogc3RyaW5nO1xuICAgIHBhcmVudDogU2VjdGlvbiB8IHVuZGVmaW5lZDtcbiAgICBjOiBDaGFsa0luc3RhbmNlXG4gICAgaW5kZW50ID0gMDtcbiAgICBpbmRlbnRQYWQgPSBcIlwiO1xuICAgIGdyb3VwOiBudW1iZXIgPSAwO1xuICAgIGNvbnN0cnVjdG9yKHNlY3Rpb25OYW1lOiBzdHJpbmcsIGM6IENoYWxrSW5zdGFuY2UsIHNlY3Rpb24/OiBTZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuYyA9IGM7XG4gICAgICAgIHRoaXMuc2VjdGlvbk5hbWUgPSBzZWN0aW9uTmFtZTtcbiAgICAgICAgaWYgKHNlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZW50ID0gc2VjdGlvbi5pbmRlbnQgKyAxO1xuICAgICAgICAgICAgdGhpcy5pbmRlbnRQYWQgPSBcIi1cIi5yZXBlYXQodGhpcy5pbmRlbnQgKiAyKSArIFwiIFwiO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RTZWMgPSB0aGlzO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHNlY3Rpb247XG4gICAgfVxuICAgIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkZWZhdWx0TW9kZShhcmdzKSk7XG4gICAgfVxuICAgIGxoMShoZWFkaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxoMSh0aGlzLmluZGVudFBhZCArIGhlYWRpbmcsIHRoaXMpXG4gICAgfVxuICAgIGxoMihoZWFkaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxoMih0aGlzLmluZGVudFBhZCArIGhlYWRpbmcsIHRoaXMpXG4gICAgfVxuICAgIGxoMyhoZWFkaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxoMyh0aGlzLmluZGVudFBhZCArIGhlYWRpbmcsIHRoaXMpXG4gICAgfVxuICAgIGwoLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIGwodGhpcywgLi4uYXJncyk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbCguLi5hcmdzOiBhbnlbXSkge1xuXG4gICAgbGV0IHNlYzogU2VjdGlvbiB8IHVuZGVmaW5lZCA9IGxhc3RTZWM7XG4gICAgbGV0IGZpcnN0QXJnOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgbGV0IGZpcnN0QXJnTW9kaWZlZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBTZWN0aW9uKSB7XG4gICAgICAgICAgICBzZWMgPSBhcmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmaXJzdEFyZyAmJiBhcmcuY29uc3RydWN0b3IubmFtZSA9PT0gXCJTdHJpbmdcIikge1xuICAgICAgICAgICAgZmlyc3RBcmcgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLy9yZW1vdmVkIFNlY3Rpb24gZnJvbSBhcmdzXG4gICAgYXJncyA9IGFyZ3MuZmlsdGVyKChhcmcpID0+IHtcbiAgICAgICAgcmV0dXJuICEoYXJnIGluc3RhbmNlb2YgU2VjdGlvbik7XG4gICAgfSlcblxuXG4gICAgLy8gbGV0IGMgPSBzZWM/LmMgfHwgbW9kZTtcbiAgICBsZXQgYyA9IGRlZmF1bHRNb2RlO1xuICAgIGxldCBpbmRlbnRQYWQgPSBzZWM/LmluZGVudFBhZCB8fCBcIlwiO1xuXG4gICAgaWYgKCFmaXJzdEFyZykge1xuICAgICAgICBmaXJzdEFyZyA9IFwiXCI7XG4gICAgfVxuICAgIGZpcnN0QXJnTW9kaWZlZCA9IGZpcnN0QXJnO1xuXG4gICAgZmlyc3RBcmdNb2RpZmVkID0gaW5kZW50UGFkICsgZmlyc3RBcmc7XG4gICAgLy9yZW1vdmUgY29sb3IgZm9ybWF0dGluZyBmcm9tIGZpcnN0IGFyZ1xuICAgIGxldCB0b3RMZW4gPSBmaXJzdEFyZ01vZGlmZWQubGVuZ3RoIC0gZmlyc3RBcmdNb2RpZmVkLnJlcGxhY2UoL1xcdTAwMWJcXFsuKj9tL2csICcnKS5sZW5ndGggLSAyO1xuXG5cbiAgICBjb25zb2xlLmxvZyhmaXJzdEFyZ01vZGlmZWQpO1xuXG4gICAgLy9yZW1vdmVkIFNlY3Rpb24gZnJvbSBhcmdzXG5cbiAgICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhhcmcpO1xuICAgIH0pXG5cblxufVxuXG5cblxuZnVuY3Rpb24gbG9nSGVhZGluZ1NlY3Rpb24oYzogQ2hhbGtJbnN0YW5jZSwgaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uPzogU2VjdGlvbikge1xuXG4gICAgbGV0IHNlYyA9IG5ldyBTZWN0aW9uKGhlYWRpbmcsIGMsIHNlY3Rpb24pO1xuICAgIGxldCB0aW1lID0gbmV3IERhdGUoRGF0ZS5ub3coKSkudG9Mb2NhbGVTdHJpbmcoKTtcblxuICAgIGxldCBwYXRoID0gXCJcIjtcbiAgICBpZiAoc2VjdGlvbikge1xuICAgICAgICBwYXRoID0gc2VjdGlvbi5zZWN0aW9uTmFtZTtcbiAgICAgICAgd2hpbGUgKHNlY3Rpb24ucGFyZW50KSB7XG4gICAgICAgICAgICBzZWN0aW9uID0gc2VjdGlvbi5wYXJlbnQ7XG4gICAgICAgICAgICBwYXRoID0gc2VjdGlvbi5zZWN0aW9uTmFtZSArIFwiIC0+IFwiICsgcGF0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vYWRkIGFkZCBoZWFkaW5nIHRvIGVuZCBvZiBwYXRoIGFuZCBvbmx5IGFkZCAtPiBpZiBwYXRoIGlzIG5vdCBlbXB0eVxuICAgIGlmIChwYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcGF0aCArPSBcIiAtPiBcIjtcbiAgICB9XG4gICAgcGF0aCArPSBoZWFkaW5nO1xuXG5cblxuICAgIC8vcG9zaXRpb24gdGhlIGhlYWRpbmcgaW4gdGhlIG1pZGRsZSBvZiB0aGUgc2NyZWVuXG4gICAgLy8gY29uc29sZS5sb2coYyhoZWFkaW5nLnBhZFN0YXJ0KChjd2lkdGggLyAyKSArIChoZWFkaW5nLmxlbmd0aCAvIDIpLCBcIiBcIikucGFkRW5kKGN3aWR0aCwgXCIgXCIpKSk7XG4gICAgY29uc29sZS5ncm91cENvbGxhcHNlZChjKHBhdGgpKTtcbiAgICBzZWMuZ3JvdXArKztcblxuICAgIHJldHVybiBzZWM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaDEoaGVhZGluZzogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uIHwgdW5kZWZpbmVkID0gbGFzdFNlYykge1xuICAgIGxldCBjID0gY2hhbGsuYmdCbGFjay5ncmVlbkJyaWdodC5ib2xkO1xuICAgIHJldHVybiBsb2dIZWFkaW5nU2VjdGlvbihjLCBoZWFkaW5nLCBzZWN0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxoMihoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb246IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjKSB7XG4gICAgbGV0IGMgPSBjaGFsay5iZ0dyYXkuY3lhbkJyaWdodC5ib2xkO1xuICAgIHJldHVybiBsb2dIZWFkaW5nU2VjdGlvbihjLCBoZWFkaW5nLCBzZWN0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxoMyhoZWFkaW5nOiBzdHJpbmcsIHNlY3Rpb246IFNlY3Rpb24gfCB1bmRlZmluZWQgPSBsYXN0U2VjKSB7XG4gICAgbGV0IGMgPSBjaGFsay5iZ0dyYXkubWFnZW50YUJyaWdodC5ib2xkO1xuICAgIHJldHVybiBsb2dIZWFkaW5nU2VjdGlvbihjLCBoZWFkaW5nLCBzZWN0aW9uKTtcbn1cblxuXG5leHBvcnQgY29uc3QgbGggPSBsaDE7XG5cblxuZXhwb3J0IGNvbnN0IGltcCA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgYyA9IGNoYWxrLnJlZC5ib2xkLmJnQmxhY2s7XG4gICAgcmV0dXJuIGModGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBpbmYgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay5ibHVlLmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCB3cm4gPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay55ZWxsb3cuYm9sZDtcbiAgICByZXR1cm4gYyh0ZXh0KTtcbn0gXG5cbmV4cG9ydCBjb25zdCBlcnIgPSAodGV4dDogc3RyaW5nKSA9PiB7XG5cbiAgICBsZXQgZXIgPSAobmV3IEVycm9yKCkpO1xuICAgIGxldCBsaW5lTm8gPSBleHRyYWN0TGluZU51bWJlckZyb21TdGFjayhlci5zdGFjayk7XG4gICAgbGV0IGNhbGxlciA9IGV4dHJhY3RDYWxsZXJGcm9tU3RhY2soZXIuc3RhY2spO1xuXG4gICAgbGV0IHByZVRleHQgPSBgWyR7Y2FsbGVyfToke2xpbmVOb31dYDtcblxuICAgIHRleHQgPSBwcmVUZXh0ICsgXCIgXCIgKyB0ZXh0O1xuICAgIFxuICAgIGNvbnNvbGUubG9nKGVyKTtcblxuICAgIGxldCBjID0gY2hhbGsucmVkLmJvbGQ7XG4gICAgcmV0dXJuIGModGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBzdWMgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbGV0IGMgPSBjaGFsay5ncmVlbi5ib2xkO1xuICAgIHJldHVybiBjKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgaGwgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGNoYWxrLmJnQmx1ZSh0ZXh0KTtcbn1cblxuZXhwb3J0IGNvbnN0IGhsMSA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gY2hhbGsuYmdNYWdlbnRhKHRleHQpO1xufVxuXG5leHBvcnQgY29uc3QgbnYgPSAobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGNoYWxrLmJnQmx1ZUJyaWdodChuYW1lLnBhZEVuZCgzMCwgXCIgXCIpKSArIFwiIDogXCIgKyBjaGFsay5jeWFuQnJpZ2h0KHZhbHVlKTtcbn1cblxuIFxubGV0IGV4YW1wbGVKU29uID1cbntcbiAgICBcIm5hbWVcIjogXCJ0ZXN0XCIsXG4gICAgXCJhZ2VcIjogMTAsXG4gICAgXCJhZGRyZXNzXCI6IHtcbiAgICAgICAgXCJzdHJlZXRcIjogXCIxMjMgRmFrZSBTdHJlZXRcIixcbiAgICAgICAgXCJjaXR5XCI6IFwiTG9uZG9uXCIsXG4gICAgICAgIFwicG9zdGNvZGVcIjogXCJTVzFBIDFBQVwiXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuVGVzdCgpIHtcblxuXG4gICAgY29uc29sZS5sb2coXCItLSB0ZXN0IC0tXCIpXG5cbiAgICBsZXQgc2VjID0gbGgxKFwiVGVzdCBIZWFkaW5nIDFcIilcbiAgICBsKGltcChcIkF1dG8gU2VjIC0gVGhpcyBpcyBzb21ldGhpbmcgaW1wb3J0YW50XCIpKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgMVwiKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgMlwiKVxuICAgIGwoXCJBdXRvIFNlYyAtIExpbmUgSU5GTzogXCIgKyBpbXAoXCJUaGlzIGlzIHNvbWV0aGluZyBpbXBvcnRhbnRcIikpXG4gICAgbChcIkF1dG8gU2VjIC0gTGluZSBXSVRIIEFERElUSU5BTCBJTkZPOiBcIiArIGltcChcIlRoaXMgaXMgc29tZXRoaW5nIGltcG9ydGFudFwiKSArIFwiIGFuZCB0aGlzIGlzIHNvbWUgYWRkaXRpb25hbCBpbmZvXCIpXG4gICAgbChcIkF1dG8gU2VjIC0gVGVzdCAyOlwiICsgaW1wKFwiQW4gaW1wb3J0YW50IHZhbHVlXCIpKVxuICAgIGwoXCJhZnRlciBhdXRvIHNlYyBUZXN0IDM6XCIgKyBpbmYoXCJBbiBpbmZvIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDQ6XCIgKyB3cm4oXCJBbiB3YXJuIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDU6XCIgKyBlcnIoXCJBbiBlcnJvciB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA2OlwiICsgc3VjKFwiQW4gc3VjY2VzcyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA3OlwiICsgaGwoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgODpcIiArIGhsMShcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKG52KFwiTmFtZVwiLCBcIlZhbHVlXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuXG4gICAgc2VjID0gc2VjLmxoMihcIkhlYWRpbmcgMlwiKVxuICAgIHNlYy5sKFwiVGVzdFwiKVxuICAgIHNlYy5sKFwiVGVzdCAyOlwiICsgaW1wKFwiQW4gaW1wb3J0YW50IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDM6XCIgKyBpbmYoXCJBbiBpbmZvIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDQ6XCIgKyB3cm4oXCJBbiB3YXJuIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDU6XCIgKyBlcnIoXCJBbiBlcnJvciB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA2OlwiICsgc3VjKFwiQW4gc3VjY2VzcyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA3OlwiICsgaGwoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgODpcIiArIGhsMShcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKG52KFwiTmFtZVwiLCBcIlZhbHVlXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuXG5cbiAgICBzZWMgPSBzZWMubGgzKFwiSGVhZCAzXCIpXG4gICAgbChcIlRlc3RcIilcbiAgICBsKFwiVGVzdCAyOlwiICsgaW1wKFwiQW4gaW1wb3J0YW50IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDM6XCIgKyBpbmYoXCJBbiBpbmZvIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDQ6XCIgKyB3cm4oXCJBbiB3YXJuIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDU6XCIgKyBlcnIoXCJBbiBlcnJvciB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA2OlwiICsgc3VjKFwiQW4gc3VjY2VzcyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA3OlwiICsgaGwoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgODpcIiArIGhsMShcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKG52KFwiTmFtZVwiLCBcIlZhbHVlXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuXG4gICAgY2xlYXJTZWMoKTtcbiAgICBsKFwiVGVzdCBDbGVhciBTZWNcIilcbiAgICBsKFwiVGVzdCAyOlwiICsgaW1wKFwiQW4gaW1wb3J0YW50IHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDM6XCIgKyBpbmYoXCJBbiBpbmZvIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDQ6XCIgKyB3cm4oXCJBbiB3YXJuIHZhbHVlXCIpKVxuICAgIGwoXCJUZXN0IDU6XCIgKyBlcnIoXCJBbiBlcnJvciB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA2OlwiICsgc3VjKFwiQW4gc3VjY2VzcyB2YWx1ZVwiKSlcbiAgICBsKFwiVGVzdCA3OlwiICsgaGwoXCJBbiBoaWdobGlnaHQgdmFsdWVcIikpXG4gICAgbChcIlRlc3QgODpcIiArIGhsMShcIkFuIGhpZ2hsaWdodCB2YWx1ZVwiKSlcbiAgICBsKG52KFwiTmFtZVwiLCBcIlZhbHVlXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuICAgIGwobnYoXCJFeGFtcGxlIE5hbWVcIiwgXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tXCIpKVxuXG5cblxuICAgIGwoXCJUZXN0IEpTT046XCIsIGV4YW1wbGVKU29uKTtcblxufVxuXG4vLyBydW5UZXN0KClcbmNsZWFyU2VjKCk7XG5cbi8vIGV4cG9ydCB7Y29sb3JzfTtcbiIsIlxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RMaW5lTnVtYmVyRnJvbVN0YWNrKHN0YWNrOiBzdHJpbmcgfCB1bmRlZmluZWQpOiBudW1iZXIgfCBudWxsIHtcbiAgICBpZiAoIXN0YWNrKSByZXR1cm4gbnVsbDtcbiAgICAvLyBFeHRyYWN0IGxpbmVzIGZyb20gc3RhY2tcbiAgICBjb25zdCBzdGFja0xpbmVzID0gc3RhY2suc3BsaXQoJ1xcbicpO1xuICAgIC8vIEZpbmQgdGhlIGxpbmUgd2l0aCB0aGUgZXJyb3IgKHVzdWFsbHkgdGhlIHNlY29uZCBsaW5lKVxuICAgIGNvbnN0IGVycm9yTGluZSA9IHN0YWNrTGluZXNbMV0gfHwgJyc7XG4gICAgLy8gRXh0cmFjdCBsaW5lIG51bWJlciBmcm9tIHRoZSBlcnJvciBsaW5lIHVzaW5nIHJlZ2V4XG4gICAgY29uc3QgbWF0Y2ggPSBlcnJvckxpbmUubWF0Y2goLzooXFxkKyk6KFxcZCspJC8pO1xuICAgIHJldHVybiBtYXRjaCA/IHBhcnNlSW50KG1hdGNoWzFdKSA6IG51bGw7XG4gIH1cbiAgXG4gZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RDYWxsZXJGcm9tU3RhY2soc3RhY2s6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmICghc3RhY2spIHJldHVybiBudWxsO1xuICAgIC8vIEV4dHJhY3QgbGluZXMgZnJvbSBzdGFja1xuICAgIGNvbnN0IHN0YWNrTGluZXMgPSBzdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgLy8gRmluZCB0aGUgbGluZSB3aXRoIHRoZSBjYWxsZXIgZnVuY3Rpb24gKHVzdWFsbHkgdGhlIHRoaXJkIGxpbmUpXG4gICAgY29uc3QgY2FsbGVyTGluZSA9IHN0YWNrTGluZXNbMl0gfHwgJyc7XG4gICAgLy8gRXh0cmFjdCBjYWxsZXIgZnVuY3Rpb24gbmFtZSB1c2luZyByZWdleFxuICAgIGNvbnN0IG1hdGNoID0gY2FsbGVyTGluZS5tYXRjaCgvYXQgKFtcXHcuPD5dKykvKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6IG51bGw7XG4gIH0iLCJpbXBvcnQgeyBsLCBpbmYsIGVyciB9IGZyb20gXCIuLi8uLi9Db21tb24vTG9nXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJUb0NsYXNzKGNsYXNzTmFtZTpzdHJpbmcsIGJhc2U6YW55KSB7XG4gICAgY29uc3QgY2xhc3NQYXJ0cyA9IGNsYXNzTmFtZS5zcGxpdCgnLicpO1xuICAgIGxldCBjbGFzc1JlZmVyZW5jZSA9IGJhc2U7XG5cbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgY2xhc3NQYXJ0cykge1xuICAgICAgICBpZighY2xhc3NSZWZlcmVuY2VbcGFydF0pIFxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNsYXNzUmVmZXJlbmNlID0gY2xhc3NSZWZlcmVuY2VbcGFydF07XG4gICAgfTsgXG4gICAgcmV0dXJuIGNsYXNzUmVmZXJlbmNlO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBbGxGaWVsZHNUb051bGwobW9kZWw6YW55KSB7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhtb2RlbCk7XG4gICAga2V5cy5mb3JFYWNoKChrZXk6IGFueSkgPT4ge1xuICAgICAgICBtb2RlbFtrZXldID0gbnVsbDtcbiAgICB9KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbk9iamVjdChvYjogYW55KSB7XG4gICAgdmFyIHRvUmV0dXJuOiBhbnkgPSB7fTtcblxuICAgIGZvciAodmFyIGkgaW4gb2IpIHtcbiAgICAgICAgaWYgKCFvYi5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG5cbiAgICAgICAgaWYgKCh0eXBlb2Ygb2JbaV0pID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB2YXIgZmxhdE9iamVjdCA9IGZsYXR0ZW5PYmplY3Qob2JbaV0pO1xuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBmbGF0T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmbGF0T2JqZWN0Lmhhc093blByb3BlcnR5KHgpKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIHRvUmV0dXJuW2kgKyAnLicgKyB4XSA9IGZsYXRPYmplY3RbeF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b1JldHVybltpXSA9IG9iW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b1JldHVybjtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHByb3BlcnR5UGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCBwcm9wID0gcHJvcGVydGllc1tpXTtcbiAgICAgICAgaWYgKCFjdXJyZW50W3Byb3BdKSB7XG4gICAgICAgICAgICBjdXJyZW50W3Byb3BdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XG4gICAgfVxuICAgIGN1cnJlbnRbcHJvcGVydGllc1twcm9wZXJ0aWVzLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nKTogYW55IHtcbiAgICBsKGluZihgZ2V0TmVzdGVkUHJvcGVydHkoJHtwcm9wZXJ0eVBhdGh9KWApLG9iaik7XG4gICAgXG4gICAgY29uc3QgcHJvcGVydGllcyA9IHByb3BlcnR5UGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHByb3BlcnR5IGhhcyBhbiBhcnJheSBpbmRleCwgZS5nLiwgXCJkYXRhWzBdXCJcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHByb3AubWF0Y2goL14oW2EtekEtWjAtOV9dKylcXFsoWzAtOV0rKVxcXSQvKTtcblxuICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgICAgY29uc3QgYXJyYXlQcm9wID0gbWF0Y2hlc1sxXTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQobWF0Y2hlc1syXSwgMTApO1xuXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY3VycmVudFthcnJheVByb3BdKSB8fCBjdXJyZW50W2FycmF5UHJvcF1baW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsKGVycihgZ2V0TmVzdGVkUHJvcGVydHkoJHtwcm9wZXJ0eVBhdGh9KTogYXJyYXlQcm9wIG9yIGluZGV4IGlzIHVuZGVmaW5lZGApLG9iailcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudFthcnJheVByb3BdW2luZGV4XTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50W3Byb3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGwoZXJyKGBnZXROZXN0ZWRQcm9wZXJ0eSgke3Byb3BlcnR5UGF0aH0pOiBwcm9wIGlzIHVuZGVmaW5lZGApLG9iailcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudFtwcm9wXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50O1xufVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgdGVtcG9yYXJ5IGFuZCB3aWxsIGJlIHJlbW92ZWQgb25jZSB0aGUgdHlwZXNjcmlwdCB0eXBpbmcgYXJlIGZpeGVkXG4gICAgICogV2hhdCBpcyBkb2VzIGlzIGNoZWNrIGlmIHRoZSBwYXNzZWQgaW4gb2JqZWN0IGlzIGEga25vY2tvdXQgb2JzZXJ2YWJsZSBhbmQgaWYgaXQgaXMgaXQgcmV0dXJucyB0aGUgdmFsdWVcbiAgICAgKiBAcGFyYW0ga29PYmplY3QgXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlRnJvbUtPT2JqZWN0PFQ+KGtvT2JqZWN0OiBhbnkpIHtcbiAgICAgICAgaWYodHlwZW9mIGtvT2JqZWN0ID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBrb09iamVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrb09iamVjdFxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBndmtvKGtvT2JqZWN0OiBhbnkpOiBhbnkge1xuICAgICAgICByZXR1cm4gZ2V0VmFsdWVGcm9tS09PYmplY3Qoa29PYmplY3QpO1xuICAgIH0iLCJtb2R1bGUuZXhwb3J0cyA9IGtvOyIsImltcG9ydCBhbnNpU3R5bGVzIGZyb20gJyNhbnNpLXN0eWxlcyc7XG5pbXBvcnQgc3VwcG9ydHNDb2xvciBmcm9tICcjc3VwcG9ydHMtY29sb3InO1xuaW1wb3J0IHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvb3JkZXJcblx0c3RyaW5nUmVwbGFjZUFsbCxcblx0c3RyaW5nRW5jYXNlQ1JMRldpdGhGaXJzdEluZGV4LFxufSBmcm9tICcuL3V0aWxpdGllcy5qcyc7XG5cbmNvbnN0IHtzdGRvdXQ6IHN0ZG91dENvbG9yLCBzdGRlcnI6IHN0ZGVyckNvbG9yfSA9IHN1cHBvcnRzQ29sb3I7XG5cbmNvbnN0IEdFTkVSQVRPUiA9IFN5bWJvbCgnR0VORVJBVE9SJyk7XG5jb25zdCBTVFlMRVIgPSBTeW1ib2woJ1NUWUxFUicpO1xuY29uc3QgSVNfRU1QVFkgPSBTeW1ib2woJ0lTX0VNUFRZJyk7XG5cbi8vIGBzdXBwb3J0c0NvbG9yLmxldmVsYCDihpIgYGFuc2lTdHlsZXMuY29sb3JbbmFtZV1gIG1hcHBpbmdcbmNvbnN0IGxldmVsTWFwcGluZyA9IFtcblx0J2Fuc2knLFxuXHQnYW5zaScsXG5cdCdhbnNpMjU2Jyxcblx0J2Fuc2kxNm0nLFxuXTtcblxuY29uc3Qgc3R5bGVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuY29uc3QgYXBwbHlPcHRpb25zID0gKG9iamVjdCwgb3B0aW9ucyA9IHt9KSA9PiB7XG5cdGlmIChvcHRpb25zLmxldmVsICYmICEoTnVtYmVyLmlzSW50ZWdlcihvcHRpb25zLmxldmVsKSAmJiBvcHRpb25zLmxldmVsID49IDAgJiYgb3B0aW9ucy5sZXZlbCA8PSAzKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignVGhlIGBsZXZlbGAgb3B0aW9uIHNob3VsZCBiZSBhbiBpbnRlZ2VyIGZyb20gMCB0byAzJyk7XG5cdH1cblxuXHQvLyBEZXRlY3QgbGV2ZWwgaWYgbm90IHNldCBtYW51YWxseVxuXHRjb25zdCBjb2xvckxldmVsID0gc3Rkb3V0Q29sb3IgPyBzdGRvdXRDb2xvci5sZXZlbCA6IDA7XG5cdG9iamVjdC5sZXZlbCA9IG9wdGlvbnMubGV2ZWwgPT09IHVuZGVmaW5lZCA/IGNvbG9yTGV2ZWwgOiBvcHRpb25zLmxldmVsO1xufTtcblxuZXhwb3J0IGNsYXNzIENoYWxrIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdHJ1Y3Rvci1yZXR1cm5cblx0XHRyZXR1cm4gY2hhbGtGYWN0b3J5KG9wdGlvbnMpO1xuXHR9XG59XG5cbmNvbnN0IGNoYWxrRmFjdG9yeSA9IG9wdGlvbnMgPT4ge1xuXHRjb25zdCBjaGFsayA9ICguLi5zdHJpbmdzKSA9PiBzdHJpbmdzLmpvaW4oJyAnKTtcblx0YXBwbHlPcHRpb25zKGNoYWxrLCBvcHRpb25zKTtcblxuXHRPYmplY3Quc2V0UHJvdG90eXBlT2YoY2hhbGssIGNyZWF0ZUNoYWxrLnByb3RvdHlwZSk7XG5cblx0cmV0dXJuIGNoYWxrO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQ2hhbGsob3B0aW9ucykge1xuXHRyZXR1cm4gY2hhbGtGYWN0b3J5KG9wdGlvbnMpO1xufVxuXG5PYmplY3Quc2V0UHJvdG90eXBlT2YoY3JlYXRlQ2hhbGsucHJvdG90eXBlLCBGdW5jdGlvbi5wcm90b3R5cGUpO1xuXG5mb3IgKGNvbnN0IFtzdHlsZU5hbWUsIHN0eWxlXSBvZiBPYmplY3QuZW50cmllcyhhbnNpU3R5bGVzKSkge1xuXHRzdHlsZXNbc3R5bGVOYW1lXSA9IHtcblx0XHRnZXQoKSB7XG5cdFx0XHRjb25zdCBidWlsZGVyID0gY3JlYXRlQnVpbGRlcih0aGlzLCBjcmVhdGVTdHlsZXIoc3R5bGUub3Blbiwgc3R5bGUuY2xvc2UsIHRoaXNbU1RZTEVSXSksIHRoaXNbSVNfRU1QVFldKTtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBzdHlsZU5hbWUsIHt2YWx1ZTogYnVpbGRlcn0pO1xuXHRcdFx0cmV0dXJuIGJ1aWxkZXI7XG5cdFx0fSxcblx0fTtcbn1cblxuc3R5bGVzLnZpc2libGUgPSB7XG5cdGdldCgpIHtcblx0XHRjb25zdCBidWlsZGVyID0gY3JlYXRlQnVpbGRlcih0aGlzLCB0aGlzW1NUWUxFUl0sIHRydWUpO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndmlzaWJsZScsIHt2YWx1ZTogYnVpbGRlcn0pO1xuXHRcdHJldHVybiBidWlsZGVyO1xuXHR9LFxufTtcblxuY29uc3QgZ2V0TW9kZWxBbnNpID0gKG1vZGVsLCBsZXZlbCwgdHlwZSwgLi4uYXJndW1lbnRzXykgPT4ge1xuXHRpZiAobW9kZWwgPT09ICdyZ2InKSB7XG5cdFx0aWYgKGxldmVsID09PSAnYW5zaTE2bScpIHtcblx0XHRcdHJldHVybiBhbnNpU3R5bGVzW3R5cGVdLmFuc2kxNm0oLi4uYXJndW1lbnRzXyk7XG5cdFx0fVxuXG5cdFx0aWYgKGxldmVsID09PSAnYW5zaTI1NicpIHtcblx0XHRcdHJldHVybiBhbnNpU3R5bGVzW3R5cGVdLmFuc2kyNTYoYW5zaVN0eWxlcy5yZ2JUb0Fuc2kyNTYoLi4uYXJndW1lbnRzXykpO1xuXHRcdH1cblxuXHRcdHJldHVybiBhbnNpU3R5bGVzW3R5cGVdLmFuc2koYW5zaVN0eWxlcy5yZ2JUb0Fuc2koLi4uYXJndW1lbnRzXykpO1xuXHR9XG5cblx0aWYgKG1vZGVsID09PSAnaGV4Jykge1xuXHRcdHJldHVybiBnZXRNb2RlbEFuc2koJ3JnYicsIGxldmVsLCB0eXBlLCAuLi5hbnNpU3R5bGVzLmhleFRvUmdiKC4uLmFyZ3VtZW50c18pKTtcblx0fVxuXG5cdHJldHVybiBhbnNpU3R5bGVzW3R5cGVdW21vZGVsXSguLi5hcmd1bWVudHNfKTtcbn07XG5cbmNvbnN0IHVzZWRNb2RlbHMgPSBbJ3JnYicsICdoZXgnLCAnYW5zaTI1NiddO1xuXG5mb3IgKGNvbnN0IG1vZGVsIG9mIHVzZWRNb2RlbHMpIHtcblx0c3R5bGVzW21vZGVsXSA9IHtcblx0XHRnZXQoKSB7XG5cdFx0XHRjb25zdCB7bGV2ZWx9ID0gdGhpcztcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJndW1lbnRzXykge1xuXHRcdFx0XHRjb25zdCBzdHlsZXIgPSBjcmVhdGVTdHlsZXIoZ2V0TW9kZWxBbnNpKG1vZGVsLCBsZXZlbE1hcHBpbmdbbGV2ZWxdLCAnY29sb3InLCAuLi5hcmd1bWVudHNfKSwgYW5zaVN0eWxlcy5jb2xvci5jbG9zZSwgdGhpc1tTVFlMRVJdKTtcblx0XHRcdFx0cmV0dXJuIGNyZWF0ZUJ1aWxkZXIodGhpcywgc3R5bGVyLCB0aGlzW0lTX0VNUFRZXSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cdH07XG5cblx0Y29uc3QgYmdNb2RlbCA9ICdiZycgKyBtb2RlbFswXS50b1VwcGVyQ2FzZSgpICsgbW9kZWwuc2xpY2UoMSk7XG5cdHN0eWxlc1tiZ01vZGVsXSA9IHtcblx0XHRnZXQoKSB7XG5cdFx0XHRjb25zdCB7bGV2ZWx9ID0gdGhpcztcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJndW1lbnRzXykge1xuXHRcdFx0XHRjb25zdCBzdHlsZXIgPSBjcmVhdGVTdHlsZXIoZ2V0TW9kZWxBbnNpKG1vZGVsLCBsZXZlbE1hcHBpbmdbbGV2ZWxdLCAnYmdDb2xvcicsIC4uLmFyZ3VtZW50c18pLCBhbnNpU3R5bGVzLmJnQ29sb3IuY2xvc2UsIHRoaXNbU1RZTEVSXSk7XG5cdFx0XHRcdHJldHVybiBjcmVhdGVCdWlsZGVyKHRoaXMsIHN0eWxlciwgdGhpc1tJU19FTVBUWV0pO1xuXHRcdFx0fTtcblx0XHR9LFxuXHR9O1xufVxuXG5jb25zdCBwcm90byA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCgpID0+IHt9LCB7XG5cdC4uLnN0eWxlcyxcblx0bGV2ZWw6IHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdGdldCgpIHtcblx0XHRcdHJldHVybiB0aGlzW0dFTkVSQVRPUl0ubGV2ZWw7XG5cdFx0fSxcblx0XHRzZXQobGV2ZWwpIHtcblx0XHRcdHRoaXNbR0VORVJBVE9SXS5sZXZlbCA9IGxldmVsO1xuXHRcdH0sXG5cdH0sXG59KTtcblxuY29uc3QgY3JlYXRlU3R5bGVyID0gKG9wZW4sIGNsb3NlLCBwYXJlbnQpID0+IHtcblx0bGV0IG9wZW5BbGw7XG5cdGxldCBjbG9zZUFsbDtcblx0aWYgKHBhcmVudCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3BlbkFsbCA9IG9wZW47XG5cdFx0Y2xvc2VBbGwgPSBjbG9zZTtcblx0fSBlbHNlIHtcblx0XHRvcGVuQWxsID0gcGFyZW50Lm9wZW5BbGwgKyBvcGVuO1xuXHRcdGNsb3NlQWxsID0gY2xvc2UgKyBwYXJlbnQuY2xvc2VBbGw7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdG9wZW4sXG5cdFx0Y2xvc2UsXG5cdFx0b3BlbkFsbCxcblx0XHRjbG9zZUFsbCxcblx0XHRwYXJlbnQsXG5cdH07XG59O1xuXG5jb25zdCBjcmVhdGVCdWlsZGVyID0gKHNlbGYsIF9zdHlsZXIsIF9pc0VtcHR5KSA9PiB7XG5cdC8vIFNpbmdsZSBhcmd1bWVudCBpcyBob3QgcGF0aCwgaW1wbGljaXQgY29lcmNpb24gaXMgZmFzdGVyIHRoYW4gYW55dGhpbmdcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWltcGxpY2l0LWNvZXJjaW9uXG5cdGNvbnN0IGJ1aWxkZXIgPSAoLi4uYXJndW1lbnRzXykgPT4gYXBwbHlTdHlsZShidWlsZGVyLCAoYXJndW1lbnRzXy5sZW5ndGggPT09IDEpID8gKCcnICsgYXJndW1lbnRzX1swXSkgOiBhcmd1bWVudHNfLmpvaW4oJyAnKSk7XG5cblx0Ly8gV2UgYWx0ZXIgdGhlIHByb3RvdHlwZSBiZWNhdXNlIHdlIG11c3QgcmV0dXJuIGEgZnVuY3Rpb24sIGJ1dCB0aGVyZSBpc1xuXHQvLyBubyB3YXkgdG8gY3JlYXRlIGEgZnVuY3Rpb24gd2l0aCBhIGRpZmZlcmVudCBwcm90b3R5cGVcblx0T2JqZWN0LnNldFByb3RvdHlwZU9mKGJ1aWxkZXIsIHByb3RvKTtcblxuXHRidWlsZGVyW0dFTkVSQVRPUl0gPSBzZWxmO1xuXHRidWlsZGVyW1NUWUxFUl0gPSBfc3R5bGVyO1xuXHRidWlsZGVyW0lTX0VNUFRZXSA9IF9pc0VtcHR5O1xuXG5cdHJldHVybiBidWlsZGVyO1xufTtcblxuY29uc3QgYXBwbHlTdHlsZSA9IChzZWxmLCBzdHJpbmcpID0+IHtcblx0aWYgKHNlbGYubGV2ZWwgPD0gMCB8fCAhc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHNlbGZbSVNfRU1QVFldID8gJycgOiBzdHJpbmc7XG5cdH1cblxuXHRsZXQgc3R5bGVyID0gc2VsZltTVFlMRVJdO1xuXG5cdGlmIChzdHlsZXIgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBzdHJpbmc7XG5cdH1cblxuXHRjb25zdCB7b3BlbkFsbCwgY2xvc2VBbGx9ID0gc3R5bGVyO1xuXHRpZiAoc3RyaW5nLmluY2x1ZGVzKCdcXHUwMDFCJykpIHtcblx0XHR3aGlsZSAoc3R5bGVyICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdC8vIFJlcGxhY2UgYW55IGluc3RhbmNlcyBhbHJlYWR5IHByZXNlbnQgd2l0aCBhIHJlLW9wZW5pbmcgY29kZVxuXHRcdFx0Ly8gb3RoZXJ3aXNlIG9ubHkgdGhlIHBhcnQgb2YgdGhlIHN0cmluZyB1bnRpbCBzYWlkIGNsb3NpbmcgY29kZVxuXHRcdFx0Ly8gd2lsbCBiZSBjb2xvcmVkLCBhbmQgdGhlIHJlc3Qgd2lsbCBzaW1wbHkgYmUgJ3BsYWluJy5cblx0XHRcdHN0cmluZyA9IHN0cmluZ1JlcGxhY2VBbGwoc3RyaW5nLCBzdHlsZXIuY2xvc2UsIHN0eWxlci5vcGVuKTtcblxuXHRcdFx0c3R5bGVyID0gc3R5bGVyLnBhcmVudDtcblx0XHR9XG5cdH1cblxuXHQvLyBXZSBjYW4gbW92ZSBib3RoIG5leHQgYWN0aW9ucyBvdXQgb2YgbG9vcCwgYmVjYXVzZSByZW1haW5pbmcgYWN0aW9ucyBpbiBsb29wIHdvbid0IGhhdmVcblx0Ly8gYW55L3Zpc2libGUgZWZmZWN0IG9uIHBhcnRzIHdlIGFkZCBoZXJlLiBDbG9zZSB0aGUgc3R5bGluZyBiZWZvcmUgYSBsaW5lYnJlYWsgYW5kIHJlb3BlblxuXHQvLyBhZnRlciBuZXh0IGxpbmUgdG8gZml4IGEgYmxlZWQgaXNzdWUgb24gbWFjT1M6IGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFsay9jaGFsay9wdWxsLzkyXG5cdGNvbnN0IGxmSW5kZXggPSBzdHJpbmcuaW5kZXhPZignXFxuJyk7XG5cdGlmIChsZkluZGV4ICE9PSAtMSkge1xuXHRcdHN0cmluZyA9IHN0cmluZ0VuY2FzZUNSTEZXaXRoRmlyc3RJbmRleChzdHJpbmcsIGNsb3NlQWxsLCBvcGVuQWxsLCBsZkluZGV4KTtcblx0fVxuXG5cdHJldHVybiBvcGVuQWxsICsgc3RyaW5nICsgY2xvc2VBbGw7XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhjcmVhdGVDaGFsay5wcm90b3R5cGUsIHN0eWxlcyk7XG5cbmNvbnN0IGNoYWxrID0gY3JlYXRlQ2hhbGsoKTtcbmV4cG9ydCBjb25zdCBjaGFsa1N0ZGVyciA9IGNyZWF0ZUNoYWxrKHtsZXZlbDogc3RkZXJyQ29sb3IgPyBzdGRlcnJDb2xvci5sZXZlbCA6IDB9KTtcblxuZXhwb3J0IHtcblx0bW9kaWZpZXJOYW1lcyxcblx0Zm9yZWdyb3VuZENvbG9yTmFtZXMsXG5cdGJhY2tncm91bmRDb2xvck5hbWVzLFxuXHRjb2xvck5hbWVzLFxuXG5cdC8vIFRPRE86IFJlbW92ZSB0aGVzZSBhbGlhc2VzIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb25cblx0bW9kaWZpZXJOYW1lcyBhcyBtb2RpZmllcnMsXG5cdGZvcmVncm91bmRDb2xvck5hbWVzIGFzIGZvcmVncm91bmRDb2xvcnMsXG5cdGJhY2tncm91bmRDb2xvck5hbWVzIGFzIGJhY2tncm91bmRDb2xvcnMsXG5cdGNvbG9yTmFtZXMgYXMgY29sb3JzLFxufSBmcm9tICcuL3ZlbmRvci9hbnNpLXN0eWxlcy9pbmRleC5qcyc7XG5cbmV4cG9ydCB7XG5cdHN0ZG91dENvbG9yIGFzIHN1cHBvcnRzQ29sb3IsXG5cdHN0ZGVyckNvbG9yIGFzIHN1cHBvcnRzQ29sb3JTdGRlcnIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjaGFsaztcbiIsIi8vIFRPRE86IFdoZW4gdGFyZ2V0aW5nIE5vZGUuanMgMTYsIHVzZSBgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlQWxsYC5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdSZXBsYWNlQWxsKHN0cmluZywgc3Vic3RyaW5nLCByZXBsYWNlcikge1xuXHRsZXQgaW5kZXggPSBzdHJpbmcuaW5kZXhPZihzdWJzdHJpbmcpO1xuXHRpZiAoaW5kZXggPT09IC0xKSB7XG5cdFx0cmV0dXJuIHN0cmluZztcblx0fVxuXG5cdGNvbnN0IHN1YnN0cmluZ0xlbmd0aCA9IHN1YnN0cmluZy5sZW5ndGg7XG5cdGxldCBlbmRJbmRleCA9IDA7XG5cdGxldCByZXR1cm5WYWx1ZSA9ICcnO1xuXHRkbyB7XG5cdFx0cmV0dXJuVmFsdWUgKz0gc3RyaW5nLnNsaWNlKGVuZEluZGV4LCBpbmRleCkgKyBzdWJzdHJpbmcgKyByZXBsYWNlcjtcblx0XHRlbmRJbmRleCA9IGluZGV4ICsgc3Vic3RyaW5nTGVuZ3RoO1xuXHRcdGluZGV4ID0gc3RyaW5nLmluZGV4T2Yoc3Vic3RyaW5nLCBlbmRJbmRleCk7XG5cdH0gd2hpbGUgKGluZGV4ICE9PSAtMSk7XG5cblx0cmV0dXJuVmFsdWUgKz0gc3RyaW5nLnNsaWNlKGVuZEluZGV4KTtcblx0cmV0dXJuIHJldHVyblZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nRW5jYXNlQ1JMRldpdGhGaXJzdEluZGV4KHN0cmluZywgcHJlZml4LCBwb3N0Zml4LCBpbmRleCkge1xuXHRsZXQgZW5kSW5kZXggPSAwO1xuXHRsZXQgcmV0dXJuVmFsdWUgPSAnJztcblx0ZG8ge1xuXHRcdGNvbnN0IGdvdENSID0gc3RyaW5nW2luZGV4IC0gMV0gPT09ICdcXHInO1xuXHRcdHJldHVyblZhbHVlICs9IHN0cmluZy5zbGljZShlbmRJbmRleCwgKGdvdENSID8gaW5kZXggLSAxIDogaW5kZXgpKSArIHByZWZpeCArIChnb3RDUiA/ICdcXHJcXG4nIDogJ1xcbicpICsgcG9zdGZpeDtcblx0XHRlbmRJbmRleCA9IGluZGV4ICsgMTtcblx0XHRpbmRleCA9IHN0cmluZy5pbmRleE9mKCdcXG4nLCBlbmRJbmRleCk7XG5cdH0gd2hpbGUgKGluZGV4ICE9PSAtMSk7XG5cblx0cmV0dXJuVmFsdWUgKz0gc3RyaW5nLnNsaWNlKGVuZEluZGV4KTtcblx0cmV0dXJuIHJldHVyblZhbHVlO1xufVxuIiwiY29uc3QgQU5TSV9CQUNLR1JPVU5EX09GRlNFVCA9IDEwO1xuXG5jb25zdCB3cmFwQW5zaTE2ID0gKG9mZnNldCA9IDApID0+IGNvZGUgPT4gYFxcdTAwMUJbJHtjb2RlICsgb2Zmc2V0fW1gO1xuXG5jb25zdCB3cmFwQW5zaTI1NiA9IChvZmZzZXQgPSAwKSA9PiBjb2RlID0+IGBcXHUwMDFCWyR7MzggKyBvZmZzZXR9OzU7JHtjb2RlfW1gO1xuXG5jb25zdCB3cmFwQW5zaTE2bSA9IChvZmZzZXQgPSAwKSA9PiAocmVkLCBncmVlbiwgYmx1ZSkgPT4gYFxcdTAwMUJbJHszOCArIG9mZnNldH07Mjske3JlZH07JHtncmVlbn07JHtibHVlfW1gO1xuXG5jb25zdCBzdHlsZXMgPSB7XG5cdG1vZGlmaWVyOiB7XG5cdFx0cmVzZXQ6IFswLCAwXSxcblx0XHQvLyAyMSBpc24ndCB3aWRlbHkgc3VwcG9ydGVkIGFuZCAyMiBkb2VzIHRoZSBzYW1lIHRoaW5nXG5cdFx0Ym9sZDogWzEsIDIyXSxcblx0XHRkaW06IFsyLCAyMl0sXG5cdFx0aXRhbGljOiBbMywgMjNdLFxuXHRcdHVuZGVybGluZTogWzQsIDI0XSxcblx0XHRvdmVybGluZTogWzUzLCA1NV0sXG5cdFx0aW52ZXJzZTogWzcsIDI3XSxcblx0XHRoaWRkZW46IFs4LCAyOF0sXG5cdFx0c3RyaWtldGhyb3VnaDogWzksIDI5XSxcblx0fSxcblx0Y29sb3I6IHtcblx0XHRibGFjazogWzMwLCAzOV0sXG5cdFx0cmVkOiBbMzEsIDM5XSxcblx0XHRncmVlbjogWzMyLCAzOV0sXG5cdFx0eWVsbG93OiBbMzMsIDM5XSxcblx0XHRibHVlOiBbMzQsIDM5XSxcblx0XHRtYWdlbnRhOiBbMzUsIDM5XSxcblx0XHRjeWFuOiBbMzYsIDM5XSxcblx0XHR3aGl0ZTogWzM3LCAzOV0sXG5cblx0XHQvLyBCcmlnaHQgY29sb3Jcblx0XHRibGFja0JyaWdodDogWzkwLCAzOV0sXG5cdFx0Z3JheTogWzkwLCAzOV0sIC8vIEFsaWFzIG9mIGBibGFja0JyaWdodGBcblx0XHRncmV5OiBbOTAsIDM5XSwgLy8gQWxpYXMgb2YgYGJsYWNrQnJpZ2h0YFxuXHRcdHJlZEJyaWdodDogWzkxLCAzOV0sXG5cdFx0Z3JlZW5CcmlnaHQ6IFs5MiwgMzldLFxuXHRcdHllbGxvd0JyaWdodDogWzkzLCAzOV0sXG5cdFx0Ymx1ZUJyaWdodDogWzk0LCAzOV0sXG5cdFx0bWFnZW50YUJyaWdodDogWzk1LCAzOV0sXG5cdFx0Y3lhbkJyaWdodDogWzk2LCAzOV0sXG5cdFx0d2hpdGVCcmlnaHQ6IFs5NywgMzldLFxuXHR9LFxuXHRiZ0NvbG9yOiB7XG5cdFx0YmdCbGFjazogWzQwLCA0OV0sXG5cdFx0YmdSZWQ6IFs0MSwgNDldLFxuXHRcdGJnR3JlZW46IFs0MiwgNDldLFxuXHRcdGJnWWVsbG93OiBbNDMsIDQ5XSxcblx0XHRiZ0JsdWU6IFs0NCwgNDldLFxuXHRcdGJnTWFnZW50YTogWzQ1LCA0OV0sXG5cdFx0YmdDeWFuOiBbNDYsIDQ5XSxcblx0XHRiZ1doaXRlOiBbNDcsIDQ5XSxcblxuXHRcdC8vIEJyaWdodCBjb2xvclxuXHRcdGJnQmxhY2tCcmlnaHQ6IFsxMDAsIDQ5XSxcblx0XHRiZ0dyYXk6IFsxMDAsIDQ5XSwgLy8gQWxpYXMgb2YgYGJnQmxhY2tCcmlnaHRgXG5cdFx0YmdHcmV5OiBbMTAwLCA0OV0sIC8vIEFsaWFzIG9mIGBiZ0JsYWNrQnJpZ2h0YFxuXHRcdGJnUmVkQnJpZ2h0OiBbMTAxLCA0OV0sXG5cdFx0YmdHcmVlbkJyaWdodDogWzEwMiwgNDldLFxuXHRcdGJnWWVsbG93QnJpZ2h0OiBbMTAzLCA0OV0sXG5cdFx0YmdCbHVlQnJpZ2h0OiBbMTA0LCA0OV0sXG5cdFx0YmdNYWdlbnRhQnJpZ2h0OiBbMTA1LCA0OV0sXG5cdFx0YmdDeWFuQnJpZ2h0OiBbMTA2LCA0OV0sXG5cdFx0YmdXaGl0ZUJyaWdodDogWzEwNywgNDldLFxuXHR9LFxufTtcblxuZXhwb3J0IGNvbnN0IG1vZGlmaWVyTmFtZXMgPSBPYmplY3Qua2V5cyhzdHlsZXMubW9kaWZpZXIpO1xuZXhwb3J0IGNvbnN0IGZvcmVncm91bmRDb2xvck5hbWVzID0gT2JqZWN0LmtleXMoc3R5bGVzLmNvbG9yKTtcbmV4cG9ydCBjb25zdCBiYWNrZ3JvdW5kQ29sb3JOYW1lcyA9IE9iamVjdC5rZXlzKHN0eWxlcy5iZ0NvbG9yKTtcbmV4cG9ydCBjb25zdCBjb2xvck5hbWVzID0gWy4uLmZvcmVncm91bmRDb2xvck5hbWVzLCAuLi5iYWNrZ3JvdW5kQ29sb3JOYW1lc107XG5cbmZ1bmN0aW9uIGFzc2VtYmxlU3R5bGVzKCkge1xuXHRjb25zdCBjb2RlcyA9IG5ldyBNYXAoKTtcblxuXHRmb3IgKGNvbnN0IFtncm91cE5hbWUsIGdyb3VwXSBvZiBPYmplY3QuZW50cmllcyhzdHlsZXMpKSB7XG5cdFx0Zm9yIChjb25zdCBbc3R5bGVOYW1lLCBzdHlsZV0gb2YgT2JqZWN0LmVudHJpZXMoZ3JvdXApKSB7XG5cdFx0XHRzdHlsZXNbc3R5bGVOYW1lXSA9IHtcblx0XHRcdFx0b3BlbjogYFxcdTAwMUJbJHtzdHlsZVswXX1tYCxcblx0XHRcdFx0Y2xvc2U6IGBcXHUwMDFCWyR7c3R5bGVbMV19bWAsXG5cdFx0XHR9O1xuXG5cdFx0XHRncm91cFtzdHlsZU5hbWVdID0gc3R5bGVzW3N0eWxlTmFtZV07XG5cblx0XHRcdGNvZGVzLnNldChzdHlsZVswXSwgc3R5bGVbMV0pO1xuXHRcdH1cblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdHlsZXMsIGdyb3VwTmFtZSwge1xuXHRcdFx0dmFsdWU6IGdyb3VwLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSk7XG5cdH1cblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoc3R5bGVzLCAnY29kZXMnLCB7XG5cdFx0dmFsdWU6IGNvZGVzLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHR9KTtcblxuXHRzdHlsZXMuY29sb3IuY2xvc2UgPSAnXFx1MDAxQlszOW0nO1xuXHRzdHlsZXMuYmdDb2xvci5jbG9zZSA9ICdcXHUwMDFCWzQ5bSc7XG5cblx0c3R5bGVzLmNvbG9yLmFuc2kgPSB3cmFwQW5zaTE2KCk7XG5cdHN0eWxlcy5jb2xvci5hbnNpMjU2ID0gd3JhcEFuc2kyNTYoKTtcblx0c3R5bGVzLmNvbG9yLmFuc2kxNm0gPSB3cmFwQW5zaTE2bSgpO1xuXHRzdHlsZXMuYmdDb2xvci5hbnNpID0gd3JhcEFuc2kxNihBTlNJX0JBQ0tHUk9VTkRfT0ZGU0VUKTtcblx0c3R5bGVzLmJnQ29sb3IuYW5zaTI1NiA9IHdyYXBBbnNpMjU2KEFOU0lfQkFDS0dST1VORF9PRkZTRVQpO1xuXHRzdHlsZXMuYmdDb2xvci5hbnNpMTZtID0gd3JhcEFuc2kxNm0oQU5TSV9CQUNLR1JPVU5EX09GRlNFVCk7XG5cblx0Ly8gRnJvbSBodHRwczovL2dpdGh1Yi5jb20vUWl4LS9jb2xvci1jb252ZXJ0L2Jsb2IvM2YwZTBkNGU5MmUyMzU3OTZjY2IxN2Y2ZTg1YzcyMDk0YTY1MWY0OS9jb252ZXJzaW9ucy5qc1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyhzdHlsZXMsIHtcblx0XHRyZ2JUb0Fuc2kyNTY6IHtcblx0XHRcdHZhbHVlKHJlZCwgZ3JlZW4sIGJsdWUpIHtcblx0XHRcdFx0Ly8gV2UgdXNlIHRoZSBleHRlbmRlZCBncmV5c2NhbGUgcGFsZXR0ZSBoZXJlLCB3aXRoIHRoZSBleGNlcHRpb24gb2Zcblx0XHRcdFx0Ly8gYmxhY2sgYW5kIHdoaXRlLiBub3JtYWwgcGFsZXR0ZSBvbmx5IGhhcyA0IGdyZXlzY2FsZSBzaGFkZXMuXG5cdFx0XHRcdGlmIChyZWQgPT09IGdyZWVuICYmIGdyZWVuID09PSBibHVlKSB7XG5cdFx0XHRcdFx0aWYgKHJlZCA8IDgpIHtcblx0XHRcdFx0XHRcdHJldHVybiAxNjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAocmVkID4gMjQ4KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMjMxO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBNYXRoLnJvdW5kKCgocmVkIC0gOCkgLyAyNDcpICogMjQpICsgMjMyO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIDE2XG5cdFx0XHRcdFx0KyAoMzYgKiBNYXRoLnJvdW5kKHJlZCAvIDI1NSAqIDUpKVxuXHRcdFx0XHRcdCsgKDYgKiBNYXRoLnJvdW5kKGdyZWVuIC8gMjU1ICogNSkpXG5cdFx0XHRcdFx0KyBNYXRoLnJvdW5kKGJsdWUgLyAyNTUgKiA1KTtcblx0XHRcdH0sXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGhleFRvUmdiOiB7XG5cdFx0XHR2YWx1ZShoZXgpIHtcblx0XHRcdFx0Y29uc3QgbWF0Y2hlcyA9IC9bYS1mXFxkXXs2fXxbYS1mXFxkXXszfS9pLmV4ZWMoaGV4LnRvU3RyaW5nKDE2KSk7XG5cdFx0XHRcdGlmICghbWF0Y2hlcykge1xuXHRcdFx0XHRcdHJldHVybiBbMCwgMCwgMF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgW2NvbG9yU3RyaW5nXSA9IG1hdGNoZXM7XG5cblx0XHRcdFx0aWYgKGNvbG9yU3RyaW5nLmxlbmd0aCA9PT0gMykge1xuXHRcdFx0XHRcdGNvbG9yU3RyaW5nID0gWy4uLmNvbG9yU3RyaW5nXS5tYXAoY2hhcmFjdGVyID0+IGNoYXJhY3RlciArIGNoYXJhY3Rlcikuam9pbignJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBpbnRlZ2VyID0gTnVtYmVyLnBhcnNlSW50KGNvbG9yU3RyaW5nLCAxNik7XG5cblx0XHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG5cdFx0XHRcdFx0KGludGVnZXIgPj4gMTYpICYgMHhGRixcblx0XHRcdFx0XHQoaW50ZWdlciA+PiA4KSAmIDB4RkYsXG5cdFx0XHRcdFx0aW50ZWdlciAmIDB4RkYsXG5cdFx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby1iaXR3aXNlICovXG5cdFx0XHRcdF07XG5cdFx0XHR9LFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0fSxcblx0XHRoZXhUb0Fuc2kyNTY6IHtcblx0XHRcdHZhbHVlOiBoZXggPT4gc3R5bGVzLnJnYlRvQW5zaTI1NiguLi5zdHlsZXMuaGV4VG9SZ2IoaGV4KSksXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdGFuc2kyNTZUb0Fuc2k6IHtcblx0XHRcdHZhbHVlKGNvZGUpIHtcblx0XHRcdFx0aWYgKGNvZGUgPCA4KSB7XG5cdFx0XHRcdFx0cmV0dXJuIDMwICsgY29kZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjb2RlIDwgMTYpIHtcblx0XHRcdFx0XHRyZXR1cm4gOTAgKyAoY29kZSAtIDgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHJlZDtcblx0XHRcdFx0bGV0IGdyZWVuO1xuXHRcdFx0XHRsZXQgYmx1ZTtcblxuXHRcdFx0XHRpZiAoY29kZSA+PSAyMzIpIHtcblx0XHRcdFx0XHRyZWQgPSAoKChjb2RlIC0gMjMyKSAqIDEwKSArIDgpIC8gMjU1O1xuXHRcdFx0XHRcdGdyZWVuID0gcmVkO1xuXHRcdFx0XHRcdGJsdWUgPSByZWQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29kZSAtPSAxNjtcblxuXHRcdFx0XHRcdGNvbnN0IHJlbWFpbmRlciA9IGNvZGUgJSAzNjtcblxuXHRcdFx0XHRcdHJlZCA9IE1hdGguZmxvb3IoY29kZSAvIDM2KSAvIDU7XG5cdFx0XHRcdFx0Z3JlZW4gPSBNYXRoLmZsb29yKHJlbWFpbmRlciAvIDYpIC8gNTtcblx0XHRcdFx0XHRibHVlID0gKHJlbWFpbmRlciAlIDYpIC8gNTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHZhbHVlID0gTWF0aC5tYXgocmVkLCBncmVlbiwgYmx1ZSkgKiAyO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gMCkge1xuXHRcdFx0XHRcdHJldHVybiAzMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0XHRcdGxldCByZXN1bHQgPSAzMCArICgoTWF0aC5yb3VuZChibHVlKSA8PCAyKSB8IChNYXRoLnJvdW5kKGdyZWVuKSA8PCAxKSB8IE1hdGgucm91bmQocmVkKSk7XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSAyKSB7XG5cdFx0XHRcdFx0cmVzdWx0ICs9IDYwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHRcdHJnYlRvQW5zaToge1xuXHRcdFx0dmFsdWU6IChyZWQsIGdyZWVuLCBibHVlKSA9PiBzdHlsZXMuYW5zaTI1NlRvQW5zaShzdHlsZXMucmdiVG9BbnNpMjU2KHJlZCwgZ3JlZW4sIGJsdWUpKSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0aGV4VG9BbnNpOiB7XG5cdFx0XHR2YWx1ZTogaGV4ID0+IHN0eWxlcy5hbnNpMjU2VG9BbnNpKHN0eWxlcy5oZXhUb0Fuc2kyNTYoaGV4KSksXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHR9LFxuXHR9KTtcblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5jb25zdCBhbnNpU3R5bGVzID0gYXNzZW1ibGVTdHlsZXMoKTtcblxuZXhwb3J0IGRlZmF1bHQgYW5zaVN0eWxlcztcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG5jb25zdCBsZXZlbCA9ICgoKSA9PiB7XG5cdGlmIChuYXZpZ2F0b3IudXNlckFnZW50RGF0YSkge1xuXHRcdGNvbnN0IGJyYW5kID0gbmF2aWdhdG9yLnVzZXJBZ2VudERhdGEuYnJhbmRzLmZpbmQoKHticmFuZH0pID0+IGJyYW5kID09PSAnQ2hyb21pdW0nKTtcblx0XHRpZiAoYnJhbmQgJiYgYnJhbmQudmVyc2lvbiA+IDkzKSB7XG5cdFx0XHRyZXR1cm4gMztcblx0XHR9XG5cdH1cblxuXHRpZiAoL1xcYihDaHJvbWV8Q2hyb21pdW0pXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRyZXR1cm4gMDtcbn0pKCk7XG5cbmNvbnN0IGNvbG9yU3VwcG9ydCA9IGxldmVsICE9PSAwICYmIHtcblx0bGV2ZWwsXG5cdGhhc0Jhc2ljOiB0cnVlLFxuXHRoYXMyNTY6IGxldmVsID49IDIsXG5cdGhhczE2bTogbGV2ZWwgPj0gMyxcbn07XG5cbmNvbnN0IHN1cHBvcnRzQ29sb3IgPSB7XG5cdHN0ZG91dDogY29sb3JTdXBwb3J0LFxuXHRzdGRlcnI6IGNvbG9yU3VwcG9ydCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnRzQ29sb3I7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgSVJlZnJlc2hXYXRjaGVyQ29uZmlndXJhdGlvbiB9IGZyb20gXCIuL1JlZnJlc2hXYXRjaGVyQ29uZmlndXJhdGlvblwiO1xuaW1wb3J0IHsgVFNoYXJlZG8gfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9UU2hhcmVkb1wiO1xuaW1wb3J0IHsgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9ufSBmcm9tIFwiLi4vLi4vSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9CYXNlSURFQXNwZWN0XCI7XG5pbXBvcnQgeyBzdHJUb0NsYXNzIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9PYmplY3RIZWxwZXJcIjtcbmltcG9ydCBrbyBmcm9tIFwia25vY2tvdXRcIjtcbmltcG9ydCB7IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWcgfSBmcm9tIFwiLi4vLi4vSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9JV2lkZ2V0SnNvblwiO1xuXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gUmVmcmVzaFdhdGNoZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IGFueSwgYmFzZU1vZGVsOiBhbnkpOiBSZWZyZXNoV2F0Y2hlckNsYXNzIHtcbiAgICByZXR1cm4gbmV3IFJlZnJlc2hXYXRjaGVyQ2xhc3MoZWxlbWVudCwgY29uZmlndXJhdGlvbiwgYmFzZU1vZGVsKTtcbn1cblxuaW50ZXJmYWNlIElDb25maWcge1xuICAgIGNvbmZpZ3VyYXRpb246IElSZWZyZXNoV2F0Y2hlckNvbmZpZ3VyYXRpb25cbn1cblxuY2xhc3MgUmVmcmVzaFdhdGNoZXJDbGFzcyB7XG5cbiAgICBkZWZhdWx0czogSVJlZnJlc2hXYXRjaGVyQ29uZmlndXJhdGlvbiA9XG4gICAgICAgIHtcbiAgICAgICAgICAgIHdpZGdldHM6IFtdLFxuICAgICAgICAgICAgdXNlSW50ZXJ2YWxSZWZyZXNoRXZlcnlYU2Vjb25kczogZmFsc2UsXG4gICAgICAgICAgICByZWZyZXNoT25FdmVudHM6IGZhbHNlLFxuICAgICAgICAgICAgZXZlbnRzVG9MaXN0ZW5UbzogW10sXG4gICAgICAgICAgICBpbnRlcnZhbFNlY29uZHM6IDBcbiAgICAgICAgfVxuICAgIGNvbmZpZ3VyYXRpb246IElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxJUmVmcmVzaFdhdGNoZXJDb25maWd1cmF0aW9uPjsgZGlzcG9zYWJsZXM6IGFueTtcbiAgICBpbnRlcnZhbDogTm9kZUpTLlRpbWVvdXQgfCB1bmRlZmluZWQ7XG4gICAgbW9kZWw6IGtvLk9ic2VydmFibGU8SURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxJUmVmcmVzaFdhdGNoZXJDb25maWd1cmF0aW9uPj5cbiAgICBvcmlnaW5hbENvbmZpZ3VyYXRpb246IElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxJUmVmcmVzaFdhdGNoZXJDb25maWd1cmF0aW9uPjtcbiAgICBsYXN0UmVmcmVzaDogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgcmVmcmVzaExvZzogYW55W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248SVJlZnJlc2hXYXRjaGVyQ29uZmlndXJhdGlvbj4sIGJhc2VNb2RlbDogVFNoYXJlZG88YW55Pikge1xuXG4gICAgICAgIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiBhcyBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248SVJlZnJlc2hXYXRjaGVyQ29uZmlndXJhdGlvbj47O1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5kZWZhdWx0cywgY29uZmlndXJhdGlvbik7XG5cbiAgICAgICAgbGV0IHggPSBrby5vYnNlcnZhYmxlKHRoaXMuY29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IHg7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgb25EZXN0cm95KCk6IHZvaWQge1xuXG4gICAgICAgICR1aS51dGlsLmRpc3Bvc2UodGhpcy5kaXNwb3NhYmxlcyk7XG4gICAgfVxuXG5cblxuICAgIHB1YmxpYyBsb2FkQW5kQmluZCgpOiB2b2lkIHtcblxuXG4gICAgICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBbXTtcblxuICAgICAgICB0aGlzLm1vZGVsKCkuZXZlbnRzVG9MaXN0ZW5Ubz8uZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJpbmcgdG8gZXZlbnRcIiwgZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5wdXNoKFxuICAgICAgICAgICAkdWkuZXZlbnRzLnN1YnNjcmliZShldmVudC5ldmVudE5hbWUsIChlOmFueSk9PntcbiAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29tcG9uZW50cyhldmVudC5ldmVudE5hbWUpO1xuICAgICAgICAgICAgfSwgdGhpcykpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsKCkudXNlSW50ZXJ2YWxSZWZyZXNoRXZlcnlYU2Vjb25kcyAmJiB0aGlzLm1vZGVsKCkuaW50ZXJ2YWxTZWNvbmRzICYmIHRoaXMubW9kZWwoKS5pbnRlcnZhbFNlY29uZHMhID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb21wb25lbnRzKFwiaW50ZXJ2YWxcIik7XG5cbiAgICAgICAgICAgIH0sIHRoaXMubW9kZWwoKS5pbnRlcnZhbFNlY29uZHMhICogMTAwMCk7XG5cbiAgICAgICAgICAgIHRoaXMuZGlzcG9zYWJsZXMucHVzaCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmVmcmVzaENvbXBvbmVudHMoZXZlbnROYW1lOnN0cmluZykge1xuXG4gICAgICAgIHRoaXMucmVmcmVzaExvZyA9IHRoaXMucmVmcmVzaExvZyB8fCBbXTtcbiAgICAgICAgXG5cbiAgICAgICAgaWYodGhpcy5sYXN0UmVmcmVzaCkgLy9UT0RPOiBjaGFuZ2UgdGhpcyBzbyB3ZSBjb2xsZWN0IGFsbCByZWZyZXNoZXMgYW5kIGRvIHRoZW0gaW4gb25lIGdvXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBzZWNvbmRzU2luY2VMYXN0UmVmcmVzaCA9IChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMubGFzdFJlZnJlc2guZ2V0VGltZSgpKSAvIDEwMDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2Vjb25kcyBzaW5jZSBsYXN0IHJlZnJlc2hcIiwgc2Vjb25kc1NpbmNlTGFzdFJlZnJlc2gpO1xuICAgICAgICAgICAgaWYoc2Vjb25kc1NpbmNlTGFzdFJlZnJlc2ggPCAxMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNraXBwaW5nIHJlZnJlc2gsIHRvbyBzb29uXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3RSZWZyZXNoID0gbmV3IERhdGUoKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZnJlc2hpbmcgY29tcG9uZW50c1wiKTtcblxuICAgICAgICBsZXQgd2lkZ2V0c1RvUmVmcmVzaCA9IHRoaXMubW9kZWwoKS53aWRnZXRzO1xuICAgICAgICBjb25zb2xlLmxvZyhcIldpZGdldHMgdG8gcmVmcmVzaDogXCIsIHdpZGdldHNUb1JlZnJlc2gubGVuZ3RoKTtcblxuICAgICAgICB3aWRnZXRzVG9SZWZyZXNoPy5mb3JFYWNoKCh3aWRnZXRUb1JlZnJlc2gpID0+IHtcblxuICAgICAgICAgICAgbGV0IGxvZ0l0ZW0gPSB7ZXZlbnROYW1lOmV2ZW50TmFtZSwgd2lkZ2V0czp3aWRnZXRUb1JlZnJlc2gsIHRpbWU6IG5ldyBEYXRlKCksIHN1Y2Nlc3M6ZmFsc2V9O1xuICAgICAgICAgICBcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudFRvUmVmcmVzaCA9ICR1aS53aWRnZXRzLmluc3RhbmNlcygpLmZpbmQoKHg6IGFueSkgPT4gXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2xhc3NSZWZlcmVuY2UgPSBzdHJUb0NsYXNzKHdpZGdldFRvUmVmcmVzaC50eXBlTmFtZSwgd2luZG93KTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWNsYXNzUmVmZXJlbmNlKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4IGluc3RhbmNlb2Ygc3RyVG9DbGFzcyh3aWRnZXRUb1JlZnJlc2gudHlwZU5hbWUsIHdpbmRvdykgXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50VG9SZWZyZXNoICYmIGNvbXBvbmVudFRvUmVmcmVzaFt3aWRnZXRUb1JlZnJlc2gubWV0aG9kVG9FeGVjdXRlXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgcGFyYW1zID0gd2lkZ2V0cy5wYXJhbWV0ZXJzO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlZnJlc2hpbmdcIiwgd2lkZ2V0VG9SZWZyZXNoLnR5cGVOYW1lLCB3aWRnZXRUb1JlZnJlc2gubWV0aG9kVG9FeGVjdXRlKTtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50VG9SZWZyZXNoW3dpZGdldFRvUmVmcmVzaC5tZXRob2RUb0V4ZWN1dGVdKCk7IC8vdG9kbzogcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxvZ0l0ZW0uc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTG9nLnB1c2gobG9nSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9