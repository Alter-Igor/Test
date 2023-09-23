/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

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
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");




// abstract class Creator<TConfig> {
//     public abstract FactoryMethod(element: HTMLElement, configuration: IBaseIDEAspectConfiguration<TConfig>, baseModel: any): any;
// }
const FOMR_BUILDER_PATH_STRING = "aspectData.formBuilder.formData";
function getFormBuilderFieldPath(formBuilderField) {
    return `${FOMR_BUILDER_PATH_STRING}.${formBuilderField}`;
}
class BaseIDEAspect {
    /**
     * Base Constructor for all IDEAspects, forces the implementation of the load and save methods
     * @param componentName //The name of the component e.g. Aspect.QuickView
     * @param loadSaveLocation //The location to load and save the data from e.g. model.aspect.FormBuilder.formData
     * @param element //The element that the aspect is bound to
     * @param configuration //The configuration passed in from the blade and the design time configuration
     * @param baseModel //The base model passed in from the blade
     * @param defaults //The defaults passed in from the widget to set incase of bad configuration or missing configuration
     */
    constructor(componentName, loadSaveLocation, element, configuration, baseModel) {
        this.uniqueId = (0,uuid__WEBPACK_IMPORTED_MODULE_3__["default"])();
        this.LocationToSaveOrLoadData = loadSaveLocation;
        this.thisComponentName = componentName;
        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = configuration;
        this.baseModel = baseModel;
        this.defaults = this.setDefaults(); //setup the default by calling the abstract method in the child class
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
    }
    /**
     * Called by the aspect IDE adapter when the model is saved. Manipulate the
     * model as required.
     */
    onSave(model) {
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
    }
    ;
    /**
     * Called by the aspect IDE adapter before the model is saved
     */
    onBeforeSave(model) {
        this.log("IDEAspects.Example : onBeforeSave");
    }
    /**
     * Called by the aspect IDE adapter after the model has been saved.
     */
    onAfterSave(model) {
        this.log("IDEAspects.Example : onAfterSave");
    }
    /**
     * Called by the aspect IDE adapter when it reloads aspect data
     */
    onReload(model) {
        this.log("IDEAspects.Example : onReload");
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
/*!********************************************************!*\
  !*** ./src/WebBased/IDEAspects/OdsPicker/OdsPicker.ts ***!
  \********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OdsPicker: () => (/* binding */ OdsPicker)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseClasses/BaseIDEAspect */ "./src/WebBased/IDEAspects/BaseClasses/BaseIDEAspect.ts");


// export function OdsPicker(element: HTMLElement, configuration: Configuration, baseModel: any): OdsPickerClass {
//     return new OdsPickerClass(element, configuration, baseModel);
// }
class OdsPicker extends _BaseClasses_BaseIDEAspect__WEBPACK_IMPORTED_MODULE_1__.BaseIDEAspect {
    setLocationOfDataToLoadAndSave() {
        return undefined;
    }
    setDefaults() {
        return {
            roleConfigModels: [],
            showPreSharedo: true,
            showPostSharedo: true,
            noOdsEntityMessage: 'No participant selected',
            noOdsEntityRequiredMessage: 'Participant required',
            narrowLabel: false,
            debug: {
                enabled: false,
                logToConsole: false,
                showInAspect: false
            }
        };
    }
    constructor(element, configuration, baseModel) {
        super("OdsPicker", "aspectData.odsEntityPicker", element, configuration, baseModel);
        // Base properties
        this.odsEntities = knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray();
        this.setup();
    }
    // private initialise() {//! Note: UI framework looks for this method name and if found behaves differently and wont call loadAndBind
    setup() {
        // Map the roleConfigModels
        this.options.roleConfigModels().forEach(roleConfigModel => {
            this.odsEntities.push(this.getOdsEntityModel(roleConfigModel));
        });
        this.showAspect = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed(() => {
            if (this.options.showPreSharedo()) {
                // We show the widget on save
                $ui.widgets.show(this);
                return true;
            }
            if (this.options.showPostSharedo() && this.sharedoId()) {
                // We show the widget on save
                $ui.widgets.show(this);
                return true;
            }
            // We hide the widget on load
            $ui.widgets.hide(this);
            return false;
        });
    }
    loadAndBind() {
        this.log("Loading data (model) passed in", "green");
        super.loadAndBind();
        if (this.model.aspectData.odsEntityPicker) {
            _.each(this.odsEntities(), (odsEntity) => {
                let data = _.find(this.model.aspectData.odsEntityPicker.odsEntities, (item) => {
                    return item.roleSystemName === odsEntity.roleSystemName();
                });
                if (data && data.odsId) {
                    odsEntity.participantType(data.participantType);
                    odsEntity.odsId(data.odsId);
                    odsEntity.odsName(data.odsName);
                    odsEntity.status(data.isActive);
                    odsEntity.selected(true);
                    if (data.participantType === "person")
                        odsEntity.icon("fa-male");
                    if (data.participantType === "organisation")
                        odsEntity.icon("fa-university");
                }
            });
        }
        this.loadAddOptions();
        this.updateValidations();
    }
    ;
    loadAddOptions() {
        this.log("Loading add options", "green");
        let models = knockout__WEBPACK_IMPORTED_MODULE_0__.unwrap(this.options.roleConfigModels());
        models.forEach((model) => {
            let selectedEntity = knockout__WEBPACK_IMPORTED_MODULE_0__.observable();
            model.addMenuOptions = [];
            let c = Sharedo.Core.Case.Participants.AddParticipantService;
            let p = new c({
                sharedoId: this.sharedoId,
                sharedoTypeSystemName: this.sharedoTypeSystemName(),
                roleSystemNames: [knockout__WEBPACK_IMPORTED_MODULE_0__.unwrap(model.roleSystemName)],
                selectedEntity: selectedEntity,
                defaultToSearch: model.showSearchOds
            });
            model.addService = new Sharedo.Core.Case.Participants.AddParticipantService({
                sharedoId: this.sharedoId,
                sharedoTypeSystemName: this.sharedoTypeSystemName(),
                roleSystemNames: [knockout__WEBPACK_IMPORTED_MODULE_0__.unwrap(model.roleSystemName)],
                selectedEntity: selectedEntity,
                defaultToSearch: model.showSearchOds
            });
            selectedEntity.subscribe((entity) => {
                let match = this.odsEntities().find(x => {
                    return knockout__WEBPACK_IMPORTED_MODULE_0__.unwrap(x.roleSystemName) === knockout__WEBPACK_IMPORTED_MODULE_0__.unwrap(model.roleSystemName);
                });
                if (!match)
                    return;
                match.odsId(entity.id);
                $ui.events.broadcast("Sharedo.Core.Case.Aspects.Widgets.OdsEntityPicker.odsEntityChanged", match);
                $ui.events.broadcast("odsentitypicker.entity-changed", {
                    entity: knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(match),
                    instanceId: this.model.instanceId
                });
                this.loadEntityDetails(entity.id, match);
            });
        });
        let loaders = models
            .map((model) => {
            return model.addService.load();
        });
        $.when.apply($, loaders)
            .always(() => {
            models.forEach((model) => {
                let menu = model.addService.getAddMenu();
                model.addMenuOptions = menu;
                let entity = _.find(this.odsEntities(), (x) => {
                    return knockout__WEBPACK_IMPORTED_MODULE_0__.unwrap(x.roleSystemName) === knockout__WEBPACK_IMPORTED_MODULE_0__.unwrap(model.roleSystemName);
                });
                if (entity)
                    entity.addMenuOptions(menu);
            });
            this.loaded(true);
        });
    }
    ;
    updateValidations() {
        let validationErrorCount = _.filter(this.odsEntities(), (entity) => {
            return (entity.required() === true) && (entity.selected() === false);
        });
        if (!validationErrorCount)
            this.validation(0);
        else
            this.validationErrorCount(validationErrorCount.length);
    }
    ;
    getOdsEntityModel(model) {
        this.log("Getting OdsEntityModel", "green", model);
        let selected = false;
        if (model.odsId)
            selected = true;
        let returnModel = {
            roleName: model.displayName,
            label: model.label,
            roleSystemName: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(model.roleSystemName),
            participantType: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(model.participantType),
            odsId: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(model.odsId),
            odsName: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(model.odsName),
            status: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(model.isActive),
            icon: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(model.icon),
            selected: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(selected),
            showSearchOds: model.showSearchOds,
            required: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(model.required),
            addMenuOptions: knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray(model.addMenuOptions)
        };
        // Default to current user?
        this.applyDefaultUserPreference(returnModel, model);
        returnModel.selected.subscribe(this.updateValidations.bind(this));
        return returnModel;
    }
    ;
    applyDefaultUserPreference(odsEntityModel, roleConfig) {
        let isNew = !this.sharedoId();
        if (!isNew)
            return;
        let currentUserId = $ui.pageContext.user && knockout__WEBPACK_IMPORTED_MODULE_0__.unwrap($ui.pageContext.user.userid);
        if (!currentUserId)
            return;
        if (roleConfig.defaultToCurrentUser && !roleConfig.selected) {
            odsEntityModel.selected(true);
            odsEntityModel.odsId(currentUserId);
            odsEntityModel.odsName($ui.pageContext.user.firstname() + " " + $ui.pageContext.user.lastname());
            odsEntityModel.participantType("person");
            odsEntityModel.icon("fa-male"); // TODO from participant type config
        }
    }
    removeParticipant(removee) {
        let data = _.find(this.odsEntities(), (item) => {
            return item.roleSystemName() === removee.roleSystemName();
        });
        if (data) {
            data.selected(false);
            data.odsId(null);
            data.odsName(null);
            data.status(null);
            data.icon(null);
            $ui.events.broadcast("Sharedo.Core.Case.Aspects.Widgets.OdsEntityPicker.odsEntityChanged", removee);
            $ui.events.broadcast("odsentitypicker.entity-changed", {
                entity: knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(removee),
                instanceId: this.model.instanceId
            });
        }
    }
    loadEntityDetails(odsId, item) {
        $ui.startWaitingFor('odsEntityDetails');
        $ajax.get("/api/ods/" + odsId + "/type", {}, (odsData) => {
            if (odsData.type === 1) {
                // Person
                item.icon("fa-male"); // TODO get from config.participantTypes.iconClass
                item.participantType("person");
            }
            if (odsData.type === 2) {
                // Organisation
                item.icon("fa-bank"); // TODO get from config.participantTypes.iconClass
                item.participantType("organisation");
            }
            item.status(odsData.isActive);
            item.odsName(odsData.name);
            item.selected(true);
            $ui.stopWaitingFor('odsEntityDetails');
        });
    }
    ;
    onSave(model) {
        this.log("Saving, model passed in we need to persist to", "green", this.data);
        let odsEntities = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this.odsEntities);
        if (!model.aspectData.odsEntityPicker)
            model.aspectData.odsEntityPicker = { odsEntities: [] };
        let entities = model.aspectData.odsEntityPicker.odsEntities;
        odsEntities.forEach((x) => {
            entities.push(x);
        });
    }
    ;
}

})();

var __webpack_export_target__ = (IDEAspects = typeof IDEAspects === "undefined" ? {} : IDEAspects);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2RzUGlja2VyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFHb0I7QUFDb0I7QUFDckM7QUFxQmxDLG9DQUFvQztBQUNwQyxxSUFBcUk7QUFDckksSUFBSTtBQUlHLE1BQU0sd0JBQXdCLEdBQUcsaUNBQWlDLENBQUM7QUFDbkUsU0FBUyx1QkFBdUIsQ0FBQyxnQkFBd0I7SUFDNUQsT0FBTyxHQUFHLHdCQUF3QixJQUFJLGdCQUFnQixFQUFFLENBQUM7QUFDN0QsQ0FBQztBQUlNLE1BQWUsYUFBYTtJQXFCL0I7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLGFBQXFCLEVBQUUsZ0JBQXdCLEVBQUUsT0FBb0IsRUFDN0UsYUFBc0IsRUFBRSxTQUF3QjtRQUdoRCxJQUFJLENBQUMsUUFBUSxHQUFHLGdEQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsd0JBQXdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDakQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGFBQWEsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixvRkFBb0Y7UUFDcEYsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGFBQXFELENBQUM7UUFDbkYsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxxRUFBcUU7UUFFekcseUJBQXlCO1FBQ3pCLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQXlDLENBQUM7UUFDakgsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxnREFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUNsQztRQUNELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUM7UUFDbEYsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBRTtZQUM3RCxJQUFJLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7U0FDOUM7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLGdFQUFrQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV0RCxhQUFhO1FBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGdEQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLENBQUMscUdBQXFHO0lBR2hMLENBQUM7SUFFRCxJQUFJLElBQUk7UUFFSixJQUFHLElBQUksQ0FBQyx3QkFBd0IsS0FBSyxTQUFTLEVBQzlDO1lBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxxRUFBcUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDckI7UUFFRCxJQUFJLFVBQVUsR0FBRyxpRUFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBRTlFLElBQUksQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELElBQUksUUFBUSxHQUFHLDBDQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEQsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLEtBQThCO1FBRW5DLElBQUcsSUFBSSxDQUFDLHdCQUF3QixLQUFLLFNBQVMsRUFDOUM7WUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLG1FQUFtRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JGLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLE9BQU87U0FDVjtRQUdELElBQUksVUFBVSxHQUFRLEtBQUssQ0FBQztRQUM1Qiw0REFBNEQ7UUFDNUQsSUFBSTtRQUNKLGtEQUFrRDtRQUNsRCxrRkFBa0Y7UUFDbEYsMENBQTBDO1FBQzFDLDRGQUE0RjtRQUM1RixJQUFJO1FBQ0osSUFBSSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxPQUFPLEVBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsaUVBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQTZCRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBVTtRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLCtDQUErQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUUsSUFBRyxJQUFJLENBQUMsd0JBQXdCLEtBQUssU0FBUyxFQUM5QztZQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsbUVBQW1FLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckYsT0FBTztTQUNWO1FBR0QsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM5QixJQUFJLFdBQVcsR0FBRyxpRUFBaUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDMUUsSUFBRyxXQUFXLEVBQ2Q7WUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLDRCQUE0QixJQUFJLENBQUMsd0JBQXdCLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDbkc7UUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2YsNkRBQTZEO1lBQzlELGdFQUFnRTtZQUMvRCx5RUFBeUU7U0FDM0U7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxJQUFJLENBQUMsd0JBQXdCLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDdEcsaUVBQWlCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBQUEsQ0FBQztJQUtGLFNBQVMsQ0FBQyxLQUFXO1FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQUEsQ0FBQztJQUVGOzs7T0FHRztJQUNILFdBQVc7UUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBQUEsQ0FBQztJQUVGOztPQUVHO0lBQ0gsWUFBWSxDQUFDLEtBQStDO1FBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBR0Q7O09BRUc7SUFDSCxXQUFXLENBQUMsS0FBK0M7UUFDdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVEsQ0FBQyxLQUErQztRQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7SUFFOUMsQ0FBQztJQUdEOzs7OztPQUtHO0lBQ0gsR0FBRyxDQUFDLE9BQWUsRUFBRSxLQUFjLEVBQUUsSUFBVTtRQUMzQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRTtZQUNuQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtnQkFDdkMsSUFBSSxDQUFDLEtBQUs7b0JBQUUsS0FBSyxHQUFHLE9BQU8sQ0FBQztnQkFDNUIsZ0VBQWdFO2dCQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixNQUFNLE9BQU8sRUFBRSxFQUFFLFNBQVMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDcEY7U0FDSjtJQUNMLENBQUM7SUFHRDs7OztPQUlHO0lBQ0gsV0FBVztRQUVQLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRTtZQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLDhFQUE4RSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3BHO2FBRUQ7WUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLG1EQUFtRCxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzFFO1FBRUQsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO1FBQ2hFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUd0RyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO0lBRTVELENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxnQkFBdUIsRUFBRSxRQUFpQjtRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1FBQ3JELElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxnQkFBZ0IsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQy9FLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLGdCQUFnQixHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsU0FBUyxDQUFDO1NBQ3BEO1FBRUQsb0JBQW9CO1FBQ3BCLElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLGdCQUFnQixPQUFPLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUNoRCxPQUFPLFFBQVEsQ0FBQztTQUNuQjtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7Q0FFSjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMVQ4QjtBQUV4QixTQUFTLGtCQUFrQixDQUFtQixHQUFNO0lBQ3ZELE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztJQUV2QixLQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRTtRQUNuQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDaEQsMkNBQTJDO1lBQzNDLElBQUksa0RBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDM0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsU0FBUzthQUNaO1lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGdEQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDekM7S0FDSjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEJNLFNBQVMsaUJBQWlCLENBQUMsR0FBUSxFQUFFLFlBQW9CLEVBQUUsS0FBVTtJQUN4RSxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQztJQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUN0QjtRQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7SUFDRCxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDdkQsQ0FBQztBQUVNLFNBQVMsaUJBQWlCLENBQUMsR0FBUSxFQUFFLFlBQW9CO0lBQzVELE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBRWxCLEtBQUssTUFBTSxJQUFJLElBQUksVUFBVSxFQUFFO1FBQzNCLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUM3QixPQUFPLFNBQVMsQ0FBQztTQUNwQjtRQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUJEO0FBQ0EsaUVBQWU7QUFDZjtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ0hELGlFQUFlLGNBQWMsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsR0FBRyx5Q0FBeUM7Ozs7Ozs7Ozs7Ozs7OztBQ0FwSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU8sd0RBQVE7QUFDZjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENTO0FBQ047QUFDc0I7O0FBRWpEO0FBQ0EsTUFBTSxrREFBTTtBQUNaLFdBQVcsa0RBQU07QUFDakI7O0FBRUE7QUFDQSxpREFBaUQsK0NBQUcsS0FBSzs7QUFFekQ7QUFDQSxtQ0FBbUM7O0FBRW5DO0FBQ0E7O0FBRUEsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFNBQVMsOERBQWU7QUFDeEI7O0FBRUEsaUVBQWUsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztBQzVCYzs7QUFFL0I7QUFDQSxxQ0FBcUMsaURBQUs7QUFDMUM7O0FBRUEsaUVBQWUsUUFBUTs7Ozs7Ozs7Ozs7QUNOdkI7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOK0I7QUFFd0M7QUFtQnZFLGtIQUFrSDtBQUNsSCxvRUFBb0U7QUFDcEUsSUFBSTtBQUVHLE1BQU0sU0FBVSxTQUFRLHFFQUEyQztJQUN0RSw4QkFBOEI7UUFDMUIsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUlELFdBQVc7UUFDUCxPQUFPO1lBQ0gsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixjQUFjLEVBQUUsSUFBSTtZQUNwQixlQUFlLEVBQUUsSUFBSTtZQUNyQixrQkFBa0IsRUFBRSx5QkFBeUI7WUFDN0MsMEJBQTBCLEVBQUUsc0JBQXNCO1lBQ2xELFdBQVcsRUFBRSxLQUFLO1lBQ2xCLEtBQUssRUFBRTtnQkFDSCxPQUFPLEVBQUUsS0FBSztnQkFDZCxZQUFZLEVBQUUsS0FBSztnQkFDbkIsWUFBWSxFQUFFLEtBQUs7YUFDdEI7U0FFSixDQUFDO0lBQ04sQ0FBQztJQUdELFlBQVksT0FBb0IsRUFBRSxhQUFzQyxFQUFFLFNBQWM7UUFFcEYsS0FBSyxDQUFDLFdBQVcsRUFBRSw0QkFBNEIsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBRTtRQUVwRixrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxxREFBa0IsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBR0QscUlBQXFJO0lBRXpILEtBQUs7UUFDYiwyQkFBMkI7UUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLEdBQUcsa0RBQWUsQ0FBQyxHQUFHLEVBQUU7WUFDbkMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFO2dCQUMvQiw2QkFBNkI7Z0JBQzdCLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixPQUFPLElBQUksQ0FBQzthQUNmO1lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDcEQsNkJBQTZCO2dCQUM3QixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUVELDZCQUE2QjtZQUM3QixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFUSxXQUFXO1FBRWhCLElBQUksQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEQsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXBCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFO1lBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUNwQixDQUFDLFNBQWEsRUFBRSxFQUFFO2dCQUNmLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFDOUQsQ0FBQyxJQUFRLEVBQUUsRUFBRTtvQkFDVixPQUFPLElBQUksQ0FBQyxjQUFjLEtBQUssU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUM5RCxDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNwQixTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDaEQsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVCLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNoQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFekIsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLFFBQVE7d0JBQ2pDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzlCLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxjQUFjO3dCQUN2QyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUN2QztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ1Y7UUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUFBLENBQUM7SUFFTSxjQUFjO1FBRWxCLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxNQUFNLEdBQUcsNENBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUV4RCxNQUFNLENBQUMsT0FBTyxDQUFFLENBQUMsS0FBUyxFQUFDLEVBQUU7WUFDekIsSUFBSSxjQUFjLEdBQUcsZ0RBQWEsRUFBRSxDQUFDO1lBRXJDLEtBQUssQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQztZQUM3RCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDVixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3pCLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQkFDbkQsZUFBZSxFQUFFLENBQUMsNENBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2xELGNBQWMsRUFBRSxjQUFjO2dCQUM5QixlQUFlLEVBQUUsS0FBSyxDQUFDLGFBQWE7YUFDdkMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQztnQkFDeEUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN6QixxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUU7Z0JBQ25ELGVBQWUsRUFBRSxDQUFDLDRDQUFTLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNsRCxjQUFjLEVBQUUsY0FBYztnQkFDOUIsZUFBZSxFQUFFLEtBQUssQ0FBQyxhQUFhO2FBQ3ZDLENBQUMsQ0FBQztZQUVILGNBQWMsQ0FBQyxTQUFTLENBQUUsQ0FBQyxNQUFNLEVBQUMsRUFBRTtnQkFDaEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDcEMsT0FBTyw0Q0FBUyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyw0Q0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLEtBQUs7b0JBQ04sT0FBTztnQkFFWCxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0VBQW9FLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2xHLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGdDQUFnQyxFQUNqRDtvQkFDSSxNQUFNLEVBQUUsMENBQU8sQ0FBQyxLQUFLLENBQUM7b0JBQ3RCLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7aUJBQ3BDLENBQUMsQ0FBQztnQkFDUCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxPQUFPLEdBQUcsTUFBTTthQUNmLEdBQUcsQ0FBRSxDQUFDLEtBQVMsRUFBRSxFQUFFO1lBQ2hCLE9BQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVQLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUM7YUFDbkIsTUFBTSxDQUFFLEdBQUcsRUFBRTtZQUNWLE1BQU0sQ0FBQyxPQUFPLENBQUUsQ0FBQyxLQUFTLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDekMsS0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBRTVCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFHLENBQUMsQ0FBSyxFQUFFLEVBQUU7b0JBQy9DLE9BQU8sNENBQVMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEtBQUssNENBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksTUFBTTtvQkFDTixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFBQSxDQUFDO0lBRUYsaUJBQWlCO1FBR2IsSUFBSSxvQkFBb0IsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFDakQsQ0FBQyxNQUFVLEVBQUUsRUFBRTtZQUNaLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7UUFDUCxJQUFJLENBQUMsb0JBQW9CO1lBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDekMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFBQSxDQUFDO0lBRU0saUJBQWlCLENBQUMsS0FBVTtRQUVoQyxJQUFJLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVuRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxLQUFLLENBQUMsS0FBSztZQUNYLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFcEIsSUFBSSxXQUFXLEdBQUc7WUFDZCxRQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVc7WUFDM0IsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO1lBQ2xCLGNBQWMsRUFBRSxnREFBYSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7WUFDbkQsZUFBZSxFQUFFLGdEQUFhLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztZQUNyRCxLQUFLLEVBQUUsZ0RBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ2pDLE9BQU8sRUFBRSxnREFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDckMsTUFBTSxFQUFFLGdEQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxJQUFJLEVBQUUsZ0RBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQy9CLFFBQVEsRUFBRSxnREFBYSxDQUFDLFFBQVEsQ0FBQztZQUNqQyxhQUFhLEVBQUUsS0FBSyxDQUFDLGFBQWE7WUFDbEMsUUFBUSxFQUFFLGdEQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUN2QyxjQUFjLEVBQUUscURBQWtCLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztTQUMzRCxDQUFDO1FBRUYsMkJBQTJCO1FBQzNCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEQsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWxFLE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFBQSxDQUFDO0lBRU0sMEJBQTBCLENBQUMsY0FBbUIsRUFBRSxVQUFlO1FBR25FLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTztRQUVuQixJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSw0Q0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxhQUFhO1lBQUUsT0FBTztRQUUzQixJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDekQsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixjQUFjLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3BDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDakcsY0FBYyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUksb0NBQW9DO1NBQzFFO0lBQ0wsQ0FBQztJQUVNLGlCQUFpQixDQUFDLE9BQVk7UUFHakMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQy9CLENBQUMsSUFBUSxFQUFFLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFFUCxJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvRUFBb0UsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxnQ0FBZ0MsRUFDakQ7Z0JBQ0ksTUFBTSxFQUFFLDBDQUFPLENBQUMsT0FBTyxDQUFDO2dCQUN4QixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO2FBQ3BDLENBQUMsQ0FBQztTQUNWO0lBQ0wsQ0FBQztJQUVPLGlCQUFpQixDQUFDLEtBQVUsRUFBRSxJQUFTO1FBRzNDLEdBQUcsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUV4QyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxLQUFLLEdBQUcsT0FBTyxFQUNuQyxFQUFFLEVBQ0QsQ0FBQyxPQUFXLEVBQUUsRUFBRTtZQUNiLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQ3BCLFNBQVM7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFHLGtEQUFrRDtnQkFDMUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNsQztZQUNELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQ3BCLGVBQWU7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFHLGtEQUFrRDtnQkFDMUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUN4QztZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFcEIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRTNDLENBQUMsQ0FBQyxDQUFDO0lBRVgsQ0FBQztJQUFBLENBQUM7SUFFTyxNQUFNLENBQUMsS0FBVTtRQUV0QixJQUFJLENBQUMsR0FBRyxDQUFDLCtDQUErQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUUsSUFBSSxXQUFXLEdBQUcsMENBQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZUFBZTtZQUNqQyxLQUFLLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUUzRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUM7UUFDNUQsV0FBVyxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQUEsQ0FBQztDQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3QudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0tPQ29udmVydGVyLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9PYmplY3RIZWxwZXJzLnRzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL0lERUFzcGVjdHMvZXh0ZXJuYWwgdmFyIFwia29cIiIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvT2RzUGlja2VyL09kc1BpY2tlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcbmltcG9ydCB7IElTaGFyZWRvQmxhZGVNb2RlbCwgVFNoYXJlRG9CbGFkZSwgSUNvbmZpZ3VyYXRpb25Ib3N0IH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvU2hhcmVkb0FzcGVjdE1vZGVsc1wiO1xuaW1wb3J0IHsgSURlYnVnIH0gZnJvbSBcIi4vSURlYnVnXCI7XG5pbXBvcnQgeyB0b09ic2VydmFibGVPYmplY3QgfSBmcm9tIFwiLi9LT0NvbnZlcnRlclwiO1xuaW1wb3J0IHsgZ2V0TmVzdGVkUHJvcGVydHksIHNldE5lc3RlZFByb3BlcnR5IH0gZnJvbSBcIi4vT2JqZWN0SGVscGVyc1wiO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgVFNoYXJlZG8gfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9UU2hhcmVkb1wiO1xuXG5leHBvcnQgdHlwZSBEZWZhdWx0czxUPiA9IFQgJiB7IGRlYnVnOiBJRGVidWcgfVxuXG5pbnRlcmZhY2UgSURFQXNwZWN0Q29uZmlndXJhdGlvbiB7XG4gICAgbW9kZWw6IElTaGFyZWRvQmxhZGVNb2RlbDtcbiAgICBibGFkZTogVFNoYXJlRG9CbGFkZTtcbn1cblxudHlwZSBPYnNlcnZhYmxlaWZ5PFQ+ID0ge1xuICAgIFtQIGluIGtleW9mIFRdOiBrby5PYnNlcnZhYmxlPFRbUF0+O1xufTtcblxuZXhwb3J0IHR5cGUgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+ID0geyBbSyBpbiBrZXlvZiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5dOiBrby5PYnNlcnZhYmxlPElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPltLXT47IH1cblxuZXhwb3J0IHR5cGUgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBUQ29uZmlnICYge1xuICAgIGRlYnVnOiBJRGVidWc7XG59XG5cbmV4cG9ydCB0eXBlIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPiA9IElDb25maWd1cmF0aW9uSG9zdCAmIElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+O1xuLy8gYWJzdHJhY3QgY2xhc3MgQ3JlYXRvcjxUQ29uZmlnPiB7XG4vLyAgICAgcHVibGljIGFic3RyYWN0IEZhY3RvcnlNZXRob2QoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPiwgYmFzZU1vZGVsOiBhbnkpOiBhbnk7XG4vLyB9XG5cblxuXG5leHBvcnQgY29uc3QgRk9NUl9CVUlMREVSX1BBVEhfU1RSSU5HID0gXCJhc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybUJ1aWxkZXJGaWVsZFBhdGgoZm9ybUJ1aWxkZXJGaWVsZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGAke0ZPTVJfQlVJTERFUl9QQVRIX1NUUklOR30uJHtmb3JtQnVpbGRlckZpZWxkfWA7XG59XG5cbnR5cGUgT2JzZXJ2YWJsZVBlcnNvbjxUQ29uZmlnPiA9IE9ic2VydmFibGVpZnk8SUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+PjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VJREVBc3BlY3Q8VENvbmZpZywgVFBlcnNpdGFuY2U+ICB7XG4gICAgX2RhdGE6YW55OyAvL25vbiBtb2RlbCBkYXRhIHN0b3JhZ2VcbiAgICBvcmlnaW5hbENvbmZpZ3VyYXRpb246IFRDb25maWc7XG4gICAgY29uZmlndXJhdGlvbjogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgIGRlZmF1bHRzOiBEZWZhdWx0czxUQ29uZmlnPiB8IHVuZGVmaW5lZDtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBtb2RlbDogYW55O1xuICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgYmxhZGU6IFRTaGFyZURvQmxhZGU7XG4gICAgbG9hZGVkOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIHNoYXJlZG9JZDogYW55O1xuICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgIHZhbGlkYXRpb246IGFueTtcbiAgICB2YWxpZGF0aW9uRXJyb3JDb3VudDoga28uT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIGJhc2VNb2RlbDogVFNoYXJlZG88YW55PjtcbiAgICB0aGlzQ29tcG9uZW50TmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgXG4gICAgTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhOiBzdHJpbmcgfCB1bmRlZmluZWQ7IC8vVGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbVxuICAgIG9wdGlvbnM6IE9ic2VydmFibGVDb25maWd1cmF0aW9uT3B0aW9uczxUQ29uZmlnPlxuICAgIHVuaXF1ZUlkOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBCYXNlIENvbnN0cnVjdG9yIGZvciBhbGwgSURFQXNwZWN0cywgZm9yY2VzIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgbG9hZCBhbmQgc2F2ZSBtZXRob2RzXG4gICAgICogQHBhcmFtIGNvbXBvbmVudE5hbWUgLy9UaGUgbmFtZSBvZiB0aGUgY29tcG9uZW50IGUuZy4gQXNwZWN0LlF1aWNrVmlld1xuICAgICAqIEBwYXJhbSBsb2FkU2F2ZUxvY2F0aW9uIC8vVGhlIGxvY2F0aW9uIHRvIGxvYWQgYW5kIHNhdmUgdGhlIGRhdGEgZnJvbSBlLmcuIG1vZGVsLmFzcGVjdC5Gb3JtQnVpbGRlci5mb3JtRGF0YVxuICAgICAqIEBwYXJhbSBlbGVtZW50IC8vVGhlIGVsZW1lbnQgdGhhdCB0aGUgYXNwZWN0IGlzIGJvdW5kIHRvXG4gICAgICogQHBhcmFtIGNvbmZpZ3VyYXRpb24gLy9UaGUgY29uZmlndXJhdGlvbiBwYXNzZWQgaW4gZnJvbSB0aGUgYmxhZGUgYW5kIHRoZSBkZXNpZ24gdGltZSBjb25maWd1cmF0aW9uXG4gICAgICogQHBhcmFtIGJhc2VNb2RlbCAvL1RoZSBiYXNlIG1vZGVsIHBhc3NlZCBpbiBmcm9tIHRoZSBibGFkZVxuICAgICAqIEBwYXJhbSBkZWZhdWx0cyAvL1RoZSBkZWZhdWx0cyBwYXNzZWQgaW4gZnJvbSB0aGUgd2lkZ2V0IHRvIHNldCBpbmNhc2Ugb2YgYmFkIGNvbmZpZ3VyYXRpb24gb3IgbWlzc2luZyBjb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29tcG9uZW50TmFtZTogc3RyaW5nLCBsb2FkU2F2ZUxvY2F0aW9uOiBzdHJpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICBjb25maWd1cmF0aW9uOiBUQ29uZmlnLCBiYXNlTW9kZWw6IFRTaGFyZWRvPGFueT4pIHtcblxuICAgICAgICAgIFxuICAgICAgICB0aGlzLnVuaXF1ZUlkID0gdXVpZCgpO1xuICAgICAgICB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9IGxvYWRTYXZlTG9jYXRpb247XG4gICAgICAgIHRoaXMudGhpc0NvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAvL1NoYXJlRG8gcGFzc2VzIHRoZSBjb25maWcgYXMgd2VsbCBhcyBvdGhlciBzdHVmZiwgc28gd2UgbmVlZCB0byBleHRyYWN0IHRoZSBjb25maWdcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uIGFzIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbiAgICAgICAgdGhpcy5iYXNlTW9kZWwgPSBiYXNlTW9kZWw7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IHRoaXMuc2V0RGVmYXVsdHMoKTsgLy9zZXR1cCB0aGUgZGVmYXVsdCBieSBjYWxsaW5nIHRoZSBhYnN0cmFjdCBtZXRob2QgaW4gdGhlIGNoaWxkIGNsYXNzXG4gICAgICAgXG4gICAgICAgIC8vIHRoaXMuZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gTWVyZ2UgdGhlIGNvbmZpZ3VyYXRpb24gd2l0aCB0aGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gJC5leHRlbmQodGhpcy5kZWZhdWx0cywgdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24pIGFzIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDsgXG4gICAgICAgIC8vY3JlYXRlIGEgbmV3IG1vZGVsXG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLmNvbmZpZ3VyYXRpb24uX2hvc3QubW9kZWw7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMubW9kZWwuY2FuRWRpdDtcbiAgICAgICAgdGhpcy5ibGFkZSA9IHRoaXMuY29uZmlndXJhdGlvbi5faG9zdC5ibGFkZTtcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBrby5vYnNlcnZhYmxlKGZhbHNlKTtcbiAgICAgICAgLy8gTWFwIHRoZSBiYXNlIG1vZGVsIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5zaGFyZWRvSWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uX2hvc3Q/Lm1vZGVsLmlkO1xuICAgICAgICBpZiAoIXRoaXMuc2hhcmVkb0lkIHx8IHRoaXMuc2hhcmVkb0lkKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gc2hhcmVkb0lkIGZvdW5kXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lID0gdGhpcy5jb25maWd1cmF0aW9uLl9ob3N0Lm1vZGVsLnNoYXJlZG9UeXBlU3lzdGVtTmFtZTtcbiAgICAgICAgaWYgKCF0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSB8fCB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9UeXBlU3lzdGVtTmFtZSBmb3VuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHRvT2JzZXJ2YWJsZU9iamVjdCh0aGlzLmNvbmZpZ3VyYXRpb24pO1xuXG4gICAgICAgIC8vIFZhbGlkYXRpb25cbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0ge307XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yQ291bnQgPSBrby5vYnNlcnZhYmxlKDApO1xuXG4gICAgICAgIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID0gdGhpcy5zZXRMb2NhdGlvbk9mRGF0YVRvTG9hZEFuZFNhdmUoKTsgLy9zZXR1cCB0aGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tIGJ5IGNhbGxpbmcgdGhlIGFic3RyYWN0IG1ldGhvZCBpbiB0aGUgY2hpbGQgY2xhc3NcblxuXG4gICAgfVxuXG4gICAgZ2V0IGRhdGEoKSA6IFRQZXJzaXRhbmNlIHwgdW5kZWZpbmVkIHtcbiAgICBcbiAgICAgICAgaWYodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBsb2NhdGlvbiB0byBsb2FkIGRhdGEgZnJvbSBzZXQgLSB0aGlzIG1ldGhvZCBzaG91bGQgYmUgb3ZlcnJpZGVuXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmVzdGVkRGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KHRoaXMubW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICBcbiAgICAgICAgdGhpcy5sb2coXCJEYXRhIGZvdW5kIGF0IGxvY2F0aW9uXCIsIFwiZ3JlZW5cIiwgbmVzdGVkRGF0YSk7XG4gICAgICAgIGxldCByZXRWYWx1ZSA9IGtvLnRvSlMobmVzdGVkRGF0YSk7XG4gICAgICAgIHRoaXMubG9nKFwiRGF0YSBmb3VuZCBhdCBsb2NhdGlvblwiLCBcImdyZWVuXCIsIHJldFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHJldFZhbHVlO1xuICAgIH1cblxuICAgIHNldCBkYXRhKHZhbHVlOiBUUGVyc2l0YW5jZSB8IHVuZGVmaW5lZCkge1xuICAgICAgXG4gICAgICAgIGlmKHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubG9nKFwiTm8gbG9jYXRpb24gdG8gc2F2ZSBkYXRhIHRvIHNldCAtIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVycmlkZW5cIiwgXCJyZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxldCB2YWx1ZVRvU2V0OiBhbnkgPSB2YWx1ZTtcbiAgICAgICAgLy8gaWYodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEuaW5jbHVkZXMoXCJmb3JtQnVpbGRlclwiKSlcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgLy9mb3JtYnVpbGRlciBEYXRhIGFsd2F5cyBuZWVkIHRvIGJlIHN0cmluZ1xuICAgICAgICAvLyAgICAgdGhpcy5sb2coXCJTZXR0aW5nIGZvcm1idWlsZGVyIGRhdGEgLSBjb252ZXJ0aW5nIHRvIHN0cmluZ1wiLCBcImdyZWVuXCIsIHZhbHVlKVxuICAgICAgICAvLyAgICAgdmFsdWVUb1NldCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgLy8gICAgIHRoaXMubG9nKFwiYWZ0ZXIgU2V0dGluZyBmb3JtYnVpbGRlciBkYXRhIC0gY29udmVydGVkIHRvIHN0cmluZ1wiLCBcImdyZWVuXCIsIHZhbHVlVG9TZXQpXG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5sb2coXCJTZXR0aW5nIGRhdGEgYXQgbG9jYXRpb25cIiwgXCJncmVlblwiLHZhbHVlVG9TZXQpO1xuICAgICAgICBzZXROZXN0ZWRQcm9wZXJ0eSh0aGlzLm1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgdmFsdWVUb1NldCk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqICEgaW1wb3J0YW50OiBNYW5kYXRvcnkgbWV0aG9kIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyB0byBzZXQgdGhlIGRlZmF1bHRzXG4gICAgICogKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIGNvbnN0cnVjdG9yIHRvIHNldCB0aGUgZGVmYXVsdHNcbiAgICAgKiBAcmV0dXJucyBEZWZhdWx0czxUQ29uZmlnPlxuICAgICAqIEBtZW1iZXJvZiBCYXNlSURFQXNwZWN0XG4gICAgICogQGFic3RyYWN0XG4gICAgICogXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0RGVmYXVsdHMoKTogRGVmYXVsdHM8VENvbmZpZz47XG5cbiAgICAvKipcbiAgICAgKiAhIGltcG9ydGFudDogTWFuZGF0b3J5IG1ldGhvZCB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgdG8gc2V0IHRoZSBkZWZhdWx0cyBmb3IgdGhlIHdpZGdldC5qc29uXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0RXhhbXBsZUZvck1vZGVsbGVyKCk6IERlZmF1bHRzPFRDb25maWc+O1xuXG4gICAgIC8qKlxuICAgICAqICFJTVBPUlRBTlQgLSBUaGlzIGlzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBsb2FkIGFuZCBzYXZlIHRvXG4gICAgICogRXhhbXBsZXMgb2YgdGhpcyBhcmU6XG4gICAgICogLSBhc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhLntmb3JtQnVpbGRlckZpZWxkfVxuICAgICAqIC0gYXNwZWN0RGF0YS5vZHNFbnRpdHlQaWNrZXJcbiAgICAgKiAtIHVuZGVmaW5lZCAoaWYgbm8gZGF0YSBpcyB0byBiZSBsb2FkZWQgb3Igc2F2ZWQgYnkgdGhlIGJhc2UgY2xhc3MpXG4gICAgICogQHJldHVybnMgVGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGxvYWQgYW5kIHNhdmUgdG8gT1IgdW5kZWZpbmVkIGlmIG5vIGRhdGEgaXMgdG8gYmUgbG9hZGVkIG9yIHNhdmVkIGJ5IHRoZSBiYXNlIGNsYXNzXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIHdoZW4gdGhlIG1vZGVsIGlzIHNhdmVkLiBNYW5pcHVsYXRlIHRoZVxuICAgICAqIG1vZGVsIGFzIHJlcXVpcmVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBvblNhdmUobW9kZWw6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZyhcIlNhdmluZywgbW9kZWwgcGFzc2VkIGluIHdlIG5lZWQgdG8gcGVyc2lzdCB0b1wiLCBcImdyZWVuXCIsIHRoaXMuZGF0YSk7XG5cbiAgICAgICAgaWYodGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBsb2NhdGlvbiB0byBzYXZlIGRhdGEgdG8gc2V0IC0gdGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRlblwiLCBcInJlZFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IGRhdGFUb1BlcnNpc3QgPSB0aGlzLmRhdGE7XG4gICAgICAgIGxldCBjdXJyZW50RGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG4gICAgICAgIGlmKGN1cnJlbnREYXRhKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxvZyhgQ3VycmVudCBkYXRhIGF0IGxvY2F0aW9uICR7dGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGF9IDpgLCBcIm1hZ2VudGFcIiwgY3VycmVudERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudERhdGEpIHtcbiAgICAgICAgICAgLy8gdGhpcy5sb2coXCJEYXRhIGRvZXMgbm90IGV4aXN0LCB3ZSB3aWxsIGNyZWF0ZVwiLCBcIm9yYW5nZVwiKTtcbiAgICAgICAgICAvLyAgc2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCB7fSk7XG4gICAgICAgICAgIC8vIGN1cnJlbnREYXRhID0gZ2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZyhgTmV3IGRhdGEgdG8gcGVyc2lzdCB0byBsb2NhdGlvbiAke3RoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhfSA6YCwgXCJibHVlXCIsIGRhdGFUb1BlcnNpc3QpO1xuICAgICAgICBzZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEsIGRhdGFUb1BlcnNpc3QpO1xuICAgIH07XG5cblxuICAgXG5cbiAgICBvbkRlc3Ryb3kobW9kZWw/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkRlc3Ryb3lcIik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgVUkgZnJhbWV3b3JrIGFmdGVyIGluaXRpYWwgY3JlYXRpb24gYW5kIGJpbmRpbmcgdG8gbG9hZCBkYXRhXG4gICAgICogaW50byBpdCdzIG1vZGVsXG4gICAgICovXG4gICAgbG9hZEFuZEJpbmQoKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogbG9hZEFuZEJpbmRcIik7XG4gICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBkYXRhIChtb2RlbDphbnkpIHBhc3NlZCBpblwiLCBcImdyZWVuXCIpO1xuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSBiYXNlZCBvbiBsb2NhdGlvbiB0byBzYXZlXCIsIFwiZ3JlZW5cIiwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciBiZWZvcmUgdGhlIG1vZGVsIGlzIHNhdmVkXG4gICAgICovXG4gICAgb25CZWZvcmVTYXZlKG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25CZWZvcmVTYXZlXCIpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgYWZ0ZXIgdGhlIG1vZGVsIGhhcyBiZWVuIHNhdmVkLlxuICAgICAqL1xuICAgIG9uQWZ0ZXJTYXZlKG1vZGVsOiBTaGFyZWRvLkNvcmUuQ2FzZS5TaGFyZWRvLk1vZGVscy5TaGFyZWRvKSB7XG4gICAgICAgIHRoaXMubG9nKFwiSURFQXNwZWN0cy5FeGFtcGxlIDogb25BZnRlclNhdmVcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBhc3BlY3QgSURFIGFkYXB0ZXIgd2hlbiBpdCByZWxvYWRzIGFzcGVjdCBkYXRhXG4gICAgICovXG4gICAgb25SZWxvYWQobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvblJlbG9hZFwiKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUHJvdmlkZXMgbG9nZ2luZyBmb3IgdGhlIGNvbXBvbmVudCBiYXNlZCBvbiB0aGUgZGVidWcgY29uZmlndXJhdGlvblxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFxuICAgICAqIEBwYXJhbSBjb2xvciBcbiAgICAgKiBAcGFyYW0gZGF0YSBcbiAgICAgKi9cbiAgICBsb2cobWVzc2FnZTogc3RyaW5nLCBjb2xvcj86IHN0cmluZywgZGF0YT86IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmRlYnVnPy5lbmFibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmRlYnVnLmxvZ1RvQ29uc29sZSkge1xuICAgICAgICAgICAgICAgIGlmICghY29sb3IpIGNvbG9yID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgIC8vIGxldCBsaW5lTm8gPSBleHRyYWN0TGluZU51bWJlckZyb21TdGFjaygobmV3IEVycm9yKCkpLnN0YWNrKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJWMgJHt0aGlzLnRoaXNDb21wb25lbnROYW1lfSAtICR7bWVzc2FnZX1gLCBgY29sb3I6JHtjb2xvcn1gLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHJldHVybnMgRm9ybWJ1aWxkIGlmIGl0IGV4aXN0cyBvciBjcmVhdGVzIGl0IGlmIGl0IGRvZXMgbm90XG4gICAgICogXG4gICAgICovXG4gICAgZm9ybWJ1aWxkZXIoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmJsYWRlPy5tb2RlbD8uYXNwZWN0RGF0YT8uZm9ybUJ1aWxkZXI/LmZvcm1EYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcImJsYWRlLm1vZGVsLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEgbm90IGZvdW5kIC0gd2lsbCBjcmVhdGUgdGhlIHBhdGhcIiwgXCJibHVlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJibGFkZS5tb2RlbC5hc3BlY3REYXRhLmZvcm1CdWlsZGVyLmZvcm1EYXRhIGZvdW5kXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0Vuc3VyZSB0aGUgcGF0aCBleGlzdHNcbiAgICAgICAgdGhpcy5ibGFkZSA9IHRoaXMuYmxhZGUgfHwge307XG4gICAgICAgIHRoaXMuYmxhZGUubW9kZWwgPSB0aGlzLmJsYWRlLm1vZGVsIHx8IHt9O1xuICAgICAgICB0aGlzLmJsYWRlLm1vZGVsLmFzcGVjdERhdGEgPSB0aGlzLmJsYWRlLm1vZGVsLmFzcGVjdERhdGEgfHwge307XG4gICAgICAgIHRoaXMuYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlciA9IHRoaXMuYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlciB8fCB7IGZvcm1EYXRhOiB7fSB9O1xuXG4gICBcbiAgICAgICAgcmV0dXJuIHRoaXMuYmxhZGUubW9kZWwuYXNwZWN0RGF0YS5mb3JtQnVpbGRlci5mb3JtRGF0YTtcblxuICAgIH1cblxuICAgIGZvcm1idWlsZGVyRmllbGQoZm9ybWJ1aWxkZXJGaWVsZDpzdHJpbmcsIHNldFZhbHVlPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5mb3JtYnVpbGRlcigpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIkZvcm0gYnVpbGRlciBkb2VzIG5vdCBleGlzdCEgXCIsIFwicmVkXCIpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRm9ybSBidWlsZGVyIGRvZXMgbm90IGV4aXN0IVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3VuZFZhbHVlID0gdGhpcy5mb3JtYnVpbGRlcigpW2Zvcm1idWlsZGVyRmllbGRdXG4gICAgICAgIGlmICghZm91bmRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5sb2coYEZvcm0gYnVpbGRlciBkb2VzIG5vdCBjb250YWluIGZpZWxkICR7Zm9ybWJ1aWxkZXJGaWVsZH0gYCwgXCJvcmFuZ2VcIik7XG4gICAgICAgICAgICB0aGlzLmxvZyhgQ3JlYXRpbmcgZmllbGQgJHtmb3JtYnVpbGRlckZpZWxkfSBgLCBcImJsdWVcIik7XG4gICAgICAgICAgICB0aGlzLmZvcm1idWlsZGVyKClbZm9ybWJ1aWxkZXJGaWVsZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL0FyZSB3ZSBkb2luZyBhIHNldFxuICAgICAgICBpZiAoc2V0VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKGBTZXR0aW5nICR7Zm9ybWJ1aWxkZXJGaWVsZH0gdG8gJHtzZXRWYWx1ZX1gLCBcImdyZWVuXCIpO1xuICAgICAgICAgICAgdGhpcy5mb3JtYnVpbGRlcigpW2Zvcm1idWlsZGVyRmllbGRdID0gc2V0VmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gc2V0VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmRWYWx1ZTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlT2JqZWN0PFQgZXh0ZW5kcyBvYmplY3Q+KG9iajogVCk6IHsgW0sgaW4ga2V5b2YgVF06IGtvLk9ic2VydmFibGU8VFtLXT4gfSB7XG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgLy9jaGVjayBpZiBvYmpba2V5XSBpcyBhbHJlYWR5IGEgb2JzZXJ2YWJsZVxuICAgICAgICAgICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShvYmpba2V5XSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBrby5vYnNlcnZhYmxlKG9ialtrZXldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiXG5leHBvcnQgZnVuY3Rpb24gc2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHByb3BlcnR5UGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCBwcm9wID0gcHJvcGVydGllc1tpXTtcbiAgICAgICAgaWYgKCFjdXJyZW50W3Byb3BdKSB7XG4gICAgICAgICAgICBjdXJyZW50W3Byb3BdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XG4gICAgfVxuICAgIGN1cnJlbnRbcHJvcGVydGllc1twcm9wZXJ0aWVzLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcGVydGllcykge1xuICAgICAgICBpZiAoY3VycmVudFtwcm9wXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbn1cbiIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIGNvbnN0IHV1aWQgPSB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5hdGl2ZS5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVTdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsIm1vZHVsZS5leHBvcnRzID0ga287IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xuaW1wb3J0IHtJT0RTUGlja2VyQ29uZmlndXJhdGlvbn0gZnJvbSBcIi4vSU9kc1BpY2tlckNvbmZpZ1wiXG5pbXBvcnQgeyBCYXNlSURFQXNwZWN0LCBEZWZhdWx0cyB9IGZyb20gXCIuLi9CYXNlQ2xhc3Nlcy9CYXNlSURFQXNwZWN0XCI7XG4gXG4gXG5pbnRlcmZhY2UgT2RzRW50aXR5TW9kZWwge1xuICAgIHJvbGVOYW1lOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICByb2xlU3lzdGVtTmFtZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgIHBhcnRpY2lwYW50VHlwZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgIG9kc0lkOiBrby5PYnNlcnZhYmxlPHN0cmluZz47XG4gICAgb2RzTmFtZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgIHN0YXR1czoga28uT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgICBpY29uOiBrby5PYnNlcnZhYmxlPHN0cmluZz47XG4gICAgc2VsZWN0ZWQ6IGtvLk9ic2VydmFibGU8Ym9vbGVhbj47XG4gICAgc2hvd1NlYXJjaE9kczogYm9vbGVhbjtcbiAgICByZXF1aXJlZDoga28uT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgICBhZGRNZW51T3B0aW9uczoga28uT2JzZXJ2YWJsZUFycmF5PGFueT47XG59XG5cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIE9kc1BpY2tlcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiwgYmFzZU1vZGVsOiBhbnkpOiBPZHNQaWNrZXJDbGFzcyB7XG4vLyAgICAgcmV0dXJuIG5ldyBPZHNQaWNrZXJDbGFzcyhlbGVtZW50LCBjb25maWd1cmF0aW9uLCBiYXNlTW9kZWwpO1xuLy8gfVxuXG5leHBvcnQgY2xhc3MgT2RzUGlja2VyIGV4dGVuZHMgQmFzZUlERUFzcGVjdDxJT0RTUGlja2VyQ29uZmlndXJhdGlvbiwgYW55PiB7XG4gICAgc2V0TG9jYXRpb25PZkRhdGFUb0xvYWRBbmRTYXZlKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIG9kc0VudGl0aWVzOiBrby5PYnNlcnZhYmxlQXJyYXk8YW55PjtcbiAgICBzaG93QXNwZWN0OiBrby5QdXJlQ29tcHV0ZWQ8Ym9vbGVhbj4gfCB1bmRlZmluZWQ7XG5cbiAgICBzZXREZWZhdWx0cygpOiBEZWZhdWx0czxJT0RTUGlja2VyQ29uZmlndXJhdGlvbj4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm9sZUNvbmZpZ01vZGVsczogW10sXG4gICAgICAgICAgICBzaG93UHJlU2hhcmVkbzogdHJ1ZSxcbiAgICAgICAgICAgIHNob3dQb3N0U2hhcmVkbzogdHJ1ZSxcbiAgICAgICAgICAgIG5vT2RzRW50aXR5TWVzc2FnZTogJ05vIHBhcnRpY2lwYW50IHNlbGVjdGVkJyxcbiAgICAgICAgICAgIG5vT2RzRW50aXR5UmVxdWlyZWRNZXNzYWdlOiAnUGFydGljaXBhbnQgcmVxdWlyZWQnLFxuICAgICAgICAgICAgbmFycm93TGFiZWw6IGZhbHNlLFxuICAgICAgICAgICAgZGVidWc6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsb2dUb0NvbnNvbGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dJbkFzcGVjdDogZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuICAgIH1cbiAgICBcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJT0RTUGlja2VyQ29uZmlndXJhdGlvbiwgYmFzZU1vZGVsOiBhbnkpIHtcblxuICAgICAgICBzdXBlcihcIk9kc1BpY2tlclwiLCBcImFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyXCIsIGVsZW1lbnQsIGNvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbCApXG5cbiAgICAgICAgLy8gQmFzZSBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMub2RzRW50aXRpZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xuICAgIH0gXG4gIFxuXG4gICAgLy8gcHJpdmF0ZSBpbml0aWFsaXNlKCkgey8vISBOb3RlOiBVSSBmcmFtZXdvcmsgbG9va3MgZm9yIHRoaXMgbWV0aG9kIG5hbWUgYW5kIGlmIGZvdW5kIGJlaGF2ZXMgZGlmZmVyZW50bHkgYW5kIHdvbnQgY2FsbCBsb2FkQW5kQmluZFxuXG4gICAgICAgIHByaXZhdGUgc2V0dXAoKSB7XG4gICAgICAgIC8vIE1hcCB0aGUgcm9sZUNvbmZpZ01vZGVsc1xuXG4gICAgICAgIHRoaXMub3B0aW9ucy5yb2xlQ29uZmlnTW9kZWxzKCkuZm9yRWFjaChyb2xlQ29uZmlnTW9kZWwgPT4ge1xuICAgICAgICAgICAgdGhpcy5vZHNFbnRpdGllcy5wdXNoKHRoaXMuZ2V0T2RzRW50aXR5TW9kZWwocm9sZUNvbmZpZ01vZGVsKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2hvd0FzcGVjdCA9IGtvLnB1cmVDb21wdXRlZCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNob3dQcmVTaGFyZWRvKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBzaG93IHRoZSB3aWRnZXQgb24gc2F2ZVxuICAgICAgICAgICAgICAgICR1aS53aWRnZXRzLnNob3codGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2hvd1Bvc3RTaGFyZWRvKCkgJiYgdGhpcy5zaGFyZWRvSWQoKSkge1xuICAgICAgICAgICAgICAgIC8vIFdlIHNob3cgdGhlIHdpZGdldCBvbiBzYXZlXG4gICAgICAgICAgICAgICAgJHVpLndpZGdldHMuc2hvdyh0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2UgaGlkZSB0aGUgd2lkZ2V0IG9uIGxvYWRcbiAgICAgICAgICAgICR1aS53aWRnZXRzLmhpZGUodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG92ZXJyaWRlIGxvYWRBbmRCaW5kKCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBkYXRhIChtb2RlbCkgcGFzc2VkIGluXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIHN1cGVyLmxvYWRBbmRCaW5kKCk7XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwuYXNwZWN0RGF0YS5vZHNFbnRpdHlQaWNrZXIpIHtcbiAgICAgICAgICAgIF8uZWFjaCh0aGlzLm9kc0VudGl0aWVzKCksXG4gICAgICAgICAgICAgICAgIChvZHNFbnRpdHk6YW55KSA9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBfLmZpbmQodGhpcy5tb2RlbC5hc3BlY3REYXRhLm9kc0VudGl0eVBpY2tlci5vZHNFbnRpdGllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAoaXRlbTphbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5yb2xlU3lzdGVtTmFtZSA9PT0gb2RzRW50aXR5LnJvbGVTeXN0ZW1OYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5vZHNJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2RzRW50aXR5LnBhcnRpY2lwYW50VHlwZShkYXRhLnBhcnRpY2lwYW50VHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZHNFbnRpdHkub2RzSWQoZGF0YS5vZHNJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZHNFbnRpdHkub2RzTmFtZShkYXRhLm9kc05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2RzRW50aXR5LnN0YXR1cyhkYXRhLmlzQWN0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9kc0VudGl0eS5zZWxlY3RlZCh0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEucGFydGljaXBhbnRUeXBlID09PSBcInBlcnNvblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9kc0VudGl0eS5pY29uKFwiZmEtbWFsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnBhcnRpY2lwYW50VHlwZSA9PT0gXCJvcmdhbmlzYXRpb25cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZHNFbnRpdHkuaWNvbihcImZhLXVuaXZlcnNpdHlcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRBZGRPcHRpb25zKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsaWRhdGlvbnMoKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBsb2FkQWRkT3B0aW9ucygpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgYWRkIG9wdGlvbnNcIiwgXCJncmVlblwiKTtcbiAgICAgICAgbGV0IG1vZGVscyA9IGtvLnVud3JhcCh0aGlzLm9wdGlvbnMucm9sZUNvbmZpZ01vZGVscygpKTtcblxuICAgICAgICBtb2RlbHMuZm9yRWFjaCggKG1vZGVsOmFueSk9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRFbnRpdHkgPSBrby5vYnNlcnZhYmxlKCk7XG4gIFxuICAgICAgICAgICAgbW9kZWwuYWRkTWVudU9wdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGxldCBjID0gU2hhcmVkby5Db3JlLkNhc2UuUGFydGljaXBhbnRzLkFkZFBhcnRpY2lwYW50U2VydmljZTtcbiAgICAgICAgICAgIGxldCBwID0gbmV3IGMoe1xuICAgICAgICAgICAgICAgIHNoYXJlZG9JZDogdGhpcy5zaGFyZWRvSWQsXG4gICAgICAgICAgICAgICAgc2hhcmVkb1R5cGVTeXN0ZW1OYW1lOiB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSgpLCAvLyEgdGVzdCBpdCB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSgpIG9yIHRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lXG4gICAgICAgICAgICAgICAgcm9sZVN5c3RlbU5hbWVzOiBba28udW53cmFwKG1vZGVsLnJvbGVTeXN0ZW1OYW1lKV0sXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHk6IHNlbGVjdGVkRW50aXR5LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUb1NlYXJjaDogbW9kZWwuc2hvd1NlYXJjaE9kc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtb2RlbC5hZGRTZXJ2aWNlID0gbmV3IFNoYXJlZG8uQ29yZS5DYXNlLlBhcnRpY2lwYW50cy5BZGRQYXJ0aWNpcGFudFNlcnZpY2Uoe1xuICAgICAgICAgICAgICAgIHNoYXJlZG9JZDogdGhpcy5zaGFyZWRvSWQsXG4gICAgICAgICAgICAgICAgc2hhcmVkb1R5cGVTeXN0ZW1OYW1lOiB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSgpLCAvLyEgdGVzdCBpdCB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSgpIG9yIHRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lXG4gICAgICAgICAgICAgICAgcm9sZVN5c3RlbU5hbWVzOiBba28udW53cmFwKG1vZGVsLnJvbGVTeXN0ZW1OYW1lKV0sXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRFbnRpdHk6IHNlbGVjdGVkRW50aXR5LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRUb1NlYXJjaDogbW9kZWwuc2hvd1NlYXJjaE9kc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5LnN1YnNjcmliZSggKGVudGl0eSk9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoID0gdGhpcy5vZHNFbnRpdGllcygpLmZpbmQoeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrby51bndyYXAoeC5yb2xlU3lzdGVtTmFtZSkgPT09IGtvLnVud3JhcChtb2RlbC5yb2xlU3lzdGVtTmFtZSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1hdGNoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBtYXRjaC5vZHNJZChlbnRpdHkuaWQpO1xuICAgICAgICAgICAgICAgICR1aS5ldmVudHMuYnJvYWRjYXN0KFwiU2hhcmVkby5Db3JlLkNhc2UuQXNwZWN0cy5XaWRnZXRzLk9kc0VudGl0eVBpY2tlci5vZHNFbnRpdHlDaGFuZ2VkXCIsIG1hdGNoKTtcbiAgICAgICAgICAgICAgICAkdWkuZXZlbnRzLmJyb2FkY2FzdChcIm9kc2VudGl0eXBpY2tlci5lbnRpdHktY2hhbmdlZFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHk6IGtvLnRvSlMobWF0Y2gpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VJZDogdGhpcy5tb2RlbC5pbnN0YW5jZUlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZEVudGl0eURldGFpbHMoZW50aXR5LmlkLCBtYXRjaCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGxvYWRlcnMgPSBtb2RlbHNcbiAgICAgICAgICAgIC5tYXAoIChtb2RlbDphbnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWwuYWRkU2VydmljZS5sb2FkKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAkLndoZW4uYXBwbHkoJCwgbG9hZGVycylcbiAgICAgICAgICAgIC5hbHdheXMoICgpID0+IHtcbiAgICAgICAgICAgICAgICBtb2RlbHMuZm9yRWFjaCggKG1vZGVsOmFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWVudSA9IG1vZGVsLmFkZFNlcnZpY2UuZ2V0QWRkTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5hZGRNZW51T3B0aW9ucyA9IG1lbnU7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGVudGl0eSA9IF8uZmluZCh0aGlzLm9kc0VudGl0aWVzKCksICAoeDphbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrby51bndyYXAoeC5yb2xlU3lzdGVtTmFtZSkgPT09IGtvLnVud3JhcChtb2RlbC5yb2xlU3lzdGVtTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHkpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkuYWRkTWVudU9wdGlvbnMobWVudSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB1cGRhdGVWYWxpZGF0aW9ucygpIHtcblxuXG4gICAgICAgIGxldCB2YWxpZGF0aW9uRXJyb3JDb3VudCA9IF8uZmlsdGVyKHRoaXMub2RzRW50aXRpZXMoKSxcbiAgICAgICAgICAgICAoZW50aXR5OmFueSkgPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIChlbnRpdHkucmVxdWlyZWQoKSA9PT0gdHJ1ZSkgJiYgKGVudGl0eS5zZWxlY3RlZCgpID09PSBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uRXJyb3JDb3VudCkgdGhpcy52YWxpZGF0aW9uKDApO1xuICAgICAgICBlbHNlIHRoaXMudmFsaWRhdGlvbkVycm9yQ291bnQodmFsaWRhdGlvbkVycm9yQ291bnQubGVuZ3RoKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBnZXRPZHNFbnRpdHlNb2RlbChtb2RlbDogYW55KTogT2RzRW50aXR5TW9kZWwge1xuXG4gICAgICAgIHRoaXMubG9nKFwiR2V0dGluZyBPZHNFbnRpdHlNb2RlbFwiLCBcImdyZWVuXCIsIG1vZGVsKTtcblxuICAgICAgICBsZXQgc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKG1vZGVsLm9kc0lkKVxuICAgICAgICAgICAgc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgIGxldCByZXR1cm5Nb2RlbCA9IHtcbiAgICAgICAgICAgIHJvbGVOYW1lOiBtb2RlbC5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgIGxhYmVsOiBtb2RlbC5sYWJlbCxcbiAgICAgICAgICAgIHJvbGVTeXN0ZW1OYW1lOiBrby5vYnNlcnZhYmxlKG1vZGVsLnJvbGVTeXN0ZW1OYW1lKSxcbiAgICAgICAgICAgIHBhcnRpY2lwYW50VHlwZToga28ub2JzZXJ2YWJsZShtb2RlbC5wYXJ0aWNpcGFudFR5cGUpLFxuICAgICAgICAgICAgb2RzSWQ6IGtvLm9ic2VydmFibGUobW9kZWwub2RzSWQpLFxuICAgICAgICAgICAgb2RzTmFtZToga28ub2JzZXJ2YWJsZShtb2RlbC5vZHNOYW1lKSxcbiAgICAgICAgICAgIHN0YXR1czoga28ub2JzZXJ2YWJsZShtb2RlbC5pc0FjdGl2ZSksXG4gICAgICAgICAgICBpY29uOiBrby5vYnNlcnZhYmxlKG1vZGVsLmljb24pLFxuICAgICAgICAgICAgc2VsZWN0ZWQ6IGtvLm9ic2VydmFibGUoc2VsZWN0ZWQpLFxuICAgICAgICAgICAgc2hvd1NlYXJjaE9kczogbW9kZWwuc2hvd1NlYXJjaE9kcyxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBrby5vYnNlcnZhYmxlKG1vZGVsLnJlcXVpcmVkKSxcbiAgICAgICAgICAgIGFkZE1lbnVPcHRpb25zOiBrby5vYnNlcnZhYmxlQXJyYXkobW9kZWwuYWRkTWVudU9wdGlvbnMpXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gRGVmYXVsdCB0byBjdXJyZW50IHVzZXI/XG4gICAgICAgIHRoaXMuYXBwbHlEZWZhdWx0VXNlclByZWZlcmVuY2UocmV0dXJuTW9kZWwsIG1vZGVsKTtcblxuICAgICAgICByZXR1cm5Nb2RlbC5zZWxlY3RlZC5zdWJzY3JpYmUodGhpcy51cGRhdGVWYWxpZGF0aW9ucy5iaW5kKHRoaXMpKTtcblxuICAgICAgICByZXR1cm4gcmV0dXJuTW9kZWw7XG4gICAgfTtcblxuICAgIHByaXZhdGUgYXBwbHlEZWZhdWx0VXNlclByZWZlcmVuY2Uob2RzRW50aXR5TW9kZWw6IGFueSwgcm9sZUNvbmZpZzogYW55KTogdm9pZCB7XG5cblxuICAgICAgICBsZXQgaXNOZXcgPSAhdGhpcy5zaGFyZWRvSWQoKTtcbiAgICAgICAgaWYgKCFpc05ldykgcmV0dXJuO1xuXG4gICAgICAgIGxldCBjdXJyZW50VXNlcklkID0gJHVpLnBhZ2VDb250ZXh0LnVzZXIgJiYga28udW53cmFwKCR1aS5wYWdlQ29udGV4dC51c2VyLnVzZXJpZCk7XG4gICAgICAgIGlmICghY3VycmVudFVzZXJJZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChyb2xlQ29uZmlnLmRlZmF1bHRUb0N1cnJlbnRVc2VyICYmICFyb2xlQ29uZmlnLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICBvZHNFbnRpdHlNb2RlbC5zZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgICAgIG9kc0VudGl0eU1vZGVsLm9kc0lkKGN1cnJlbnRVc2VySWQpO1xuICAgICAgICAgICAgb2RzRW50aXR5TW9kZWwub2RzTmFtZSgkdWkucGFnZUNvbnRleHQudXNlci5maXJzdG5hbWUoKSArIFwiIFwiICsgJHVpLnBhZ2VDb250ZXh0LnVzZXIubGFzdG5hbWUoKSk7XG4gICAgICAgICAgICBvZHNFbnRpdHlNb2RlbC5wYXJ0aWNpcGFudFR5cGUoXCJwZXJzb25cIik7XG4gICAgICAgICAgICBvZHNFbnRpdHlNb2RlbC5pY29uKFwiZmEtbWFsZVwiKTsgICAgLy8gVE9ETyBmcm9tIHBhcnRpY2lwYW50IHR5cGUgY29uZmlnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlUGFydGljaXBhbnQocmVtb3ZlZTogYW55KTogdm9pZCB7XG5cblxuICAgICAgICBsZXQgZGF0YSA9IF8uZmluZCh0aGlzLm9kc0VudGl0aWVzKCksXG4gICAgICAgICAgICAgKGl0ZW06YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucm9sZVN5c3RlbU5hbWUoKSA9PT0gcmVtb3ZlZS5yb2xlU3lzdGVtTmFtZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEuc2VsZWN0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgZGF0YS5vZHNJZChudWxsKTtcbiAgICAgICAgICAgIGRhdGEub2RzTmFtZShudWxsKTtcbiAgICAgICAgICAgIGRhdGEuc3RhdHVzKG51bGwpO1xuICAgICAgICAgICAgZGF0YS5pY29uKG51bGwpO1xuICAgICAgICAgICAgJHVpLmV2ZW50cy5icm9hZGNhc3QoXCJTaGFyZWRvLkNvcmUuQ2FzZS5Bc3BlY3RzLldpZGdldHMuT2RzRW50aXR5UGlja2VyLm9kc0VudGl0eUNoYW5nZWRcIiwgcmVtb3ZlZSk7XG4gICAgICAgICAgICAkdWkuZXZlbnRzLmJyb2FkY2FzdChcIm9kc2VudGl0eXBpY2tlci5lbnRpdHktY2hhbmdlZFwiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5OiBrby50b0pTKHJlbW92ZWUpLFxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZUlkOiB0aGlzLm1vZGVsLmluc3RhbmNlSWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEVudGl0eURldGFpbHMob2RzSWQ6IGFueSwgaXRlbTogYW55KTogdm9pZCB7XG5cblxuICAgICAgICAkdWkuc3RhcnRXYWl0aW5nRm9yKCdvZHNFbnRpdHlEZXRhaWxzJyk7XG5cbiAgICAgICAgJGFqYXguZ2V0KFwiL2FwaS9vZHMvXCIgKyBvZHNJZCArIFwiL3R5cGVcIixcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgIChvZHNEYXRhOmFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvZHNEYXRhLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGVyc29uXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaWNvbihcImZhLW1hbGVcIik7ICAgLy8gVE9ETyBnZXQgZnJvbSBjb25maWcucGFydGljaXBhbnRUeXBlcy5pY29uQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXJ0aWNpcGFudFR5cGUoXCJwZXJzb25cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvZHNEYXRhLnR5cGUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3JnYW5pc2F0aW9uXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaWNvbihcImZhLWJhbmtcIik7ICAgLy8gVE9ETyBnZXQgZnJvbSBjb25maWcucGFydGljaXBhbnRUeXBlcy5pY29uQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXJ0aWNpcGFudFR5cGUoXCJvcmdhbmlzYXRpb25cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGl0ZW0uc3RhdHVzKG9kc0RhdGEuaXNBY3RpdmUpO1xuICAgICAgICAgICAgICAgIGl0ZW0ub2RzTmFtZShvZHNEYXRhLm5hbWUpO1xuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAkdWkuc3RvcFdhaXRpbmdGb3IoJ29kc0VudGl0eURldGFpbHMnKTtcblxuICAgICAgICAgICAgfSk7XG4gIFxuICAgIH07XG4gICBcbiAgICBvdmVycmlkZSBvblNhdmUobW9kZWw6IGFueSk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMubG9nKFwiU2F2aW5nLCBtb2RlbCBwYXNzZWQgaW4gd2UgbmVlZCB0byBwZXJzaXN0IHRvXCIsIFwiZ3JlZW5cIiwgdGhpcy5kYXRhKTtcbiAgICAgICAgbGV0IG9kc0VudGl0aWVzID0ga28udG9KUyh0aGlzLm9kc0VudGl0aWVzKTtcbiAgICAgICAgaWYgKCFtb2RlbC5hc3BlY3REYXRhLm9kc0VudGl0eVBpY2tlcilcbiAgICAgICAgICAgIG1vZGVsLmFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyID0geyBvZHNFbnRpdGllczogW10gfTtcblxuICAgICAgICBsZXQgZW50aXRpZXMgPSBtb2RlbC5hc3BlY3REYXRhLm9kc0VudGl0eVBpY2tlci5vZHNFbnRpdGllcztcbiAgICAgICAgb2RzRW50aXRpZXMuZm9yRWFjaCggKHgpID0+IHtcbiAgICAgICAgICAgIGVudGl0aWVzLnB1c2goeCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59ICJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==