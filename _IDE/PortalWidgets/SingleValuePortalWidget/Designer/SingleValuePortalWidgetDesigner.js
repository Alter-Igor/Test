/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

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

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = jQuery;

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
/*!********************************************************************************************************!*\
  !*** ./src/WebBased/PortalWidgets/SingleValuePortalWidget/Designer/SingleValuePortalWidgetDesigner.ts ***!
  \********************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingleValuePortalWidgetDesigner: () => (/* binding */ SingleValuePortalWidgetDesigner),
/* harmony export */   SingleValuePortalWidgetDesignerClass: () => (/* binding */ SingleValuePortalWidgetDesignerClass)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SingleValuePortalWidgetConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SingleValuePortalWidgetConfig */ "./src/WebBased/PortalWidgets/SingleValuePortalWidget/SingleValuePortalWidgetConfig.ts");
/* harmony import */ var _IDEAspects_BaseClasses_KOConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../IDEAspects/BaseClasses/KOConverter */ "./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts");




function SingleValuePortalWidgetDesigner(element, configuration, baseModel) {
    return new SingleValuePortalWidgetDesignerClass(element, configuration, baseModel);
}
class SingleValuePortalWidgetDesignerClass {
    constructor(element, configuration, baseModel) {
        this.element = element;
        const defaults = _SingleValuePortalWidgetConfig__WEBPACK_IMPORTED_MODULE_2__.SingleValuePortalDefault;
        // configuration = ko.toJS(configuration);
        var options = jquery__WEBPACK_IMPORTED_MODULE_1__.extend(true, {}, defaults, configuration.configuration);
        let observableOptions = (0,_IDEAspects_BaseClasses_KOConverter__WEBPACK_IMPORTED_MODULE_3__.toObservableObject)(options);
        // Create the model
        this.model = observableOptions;
        // Create the model validators
        this.validation =
            {
                fieldPath: knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed(() => {
                    var message = this.model.fieldPath();
                    if (!message)
                        return "The fieldPath is required";
                    return null;
                })
            };
        // Expose a validationErrorCount observable to tell the host designer blade
        // whether save is currently possible or not. Return 0 to indicate all is valid,
        // or if not, the count of errors. If no validation required, this can be removed.
        this.validationErrorCount = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed(() => {
            var fails = 0;
            if (this.validation.fieldPath())
                fails++;
            return fails;
        });
    }
    getModel() {
        let retValue = {
            configuration: knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this.model)
        };
        return retValue;
    }
    ;
    loadAndBind() {
    }
    ;
}
// namespace("Visualisation.Widgets");
// /**
//  * Constructor for your widget
//  * @param {} element            The Html DOM element to which this widget will bind
//  * @param {} configuration      The configuration passed in from the designer/config
//  * @param {} baseModel          The base widget model (contains unique id etc)
//  * @returns {}
//  */
// Visualisation.Widgets.SingleValueDisplayDesigner = function(element, configuration, baseModel)
// {
//     var self = this;
//     var defaults =
//     {
//         // These configurations are passed from the host of this designer widget
//         blade: null,                        // The blade hosting the widget
//         __scope:
//         {
//             mode: null,                     // Will be globalPortal or sharedoType
//             sharedoTypeSystemName: null     // If mode===sharedoType, contains the type being edited
//         },
//         // Your designer model is also passed in
//         fieldPath: null
//     };
//     var options = $.extend(true, {}, defaults, configuration);
//     // Create the model
//     this.model =
//     {
//         fieldPath: ko.observable(options.fieldPath)
//     };
//     // Create the model validators
//     this.validation =
//     {
//         fieldPath: ko.pureComputed(function()
//         {
//             var message = this.model.fieldPath();
//             if (!message) return "The fieldPath is required";
//             return null;
//         })
//     };
//     // Expose a validationErrorCount observable to tell the host designer blade
//     // whether save is currently possible or not. Return 0 to indicate all is valid,
//     // or if not, the count of errors. If no validation required, this can be removed.
//     this.validationErrorCount = ko.pureComputed(function()
//     {
//         var fails = 0;
//         if (this.validation.fieldPath()) fails++;
//         return fails;
//     });
// };
// /**
//  * Called by the UI framework when this widget is being unloaded - clean up
//  * any subscriptions or references here that would keep this instance alive
//  */
// Visualisation.Widgets.SingleValueDisplayDesigner.prototype.onDestroy = function()
// {
//     var self = this;
// };
// /**
//  * Called by the UI framework after initial creation and binding to load data
//  * into it's model
//  */
// Visualisation.Widgets.SingleValueDisplayDesigner.prototype.loadAndBind = function()
// {
//     var self = this;
// };
// /**
//  * Called by the widget/portal editor framework to get the configuration model
//  */
// Visualisation.Widgets.SingleValueDisplayDesigner.prototype.getModel = function()
// {
//     var self = this;
//     return {
//         fieldPath: this.model.fieldPath()
//     };
// };

})();

var __webpack_export_target__ = (PortalWidgets = typeof PortalWidgets === "undefined" ? {} : PortalWidgets);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVzaWduZXIvU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXREZXNpZ25lci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdPLE1BQU0sYUFBYSxHQUFHLEdBQUcsRUFBRTtJQUU5QixJQUFJLFFBQVEsR0FBVTtRQUNwQixxQkFBcUIsRUFBRSxLQUFLO1FBQzVCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsWUFBWSxFQUFFLElBQUk7UUFDbEIsWUFBWSxFQUFFLEtBQUs7UUFDbkIsVUFBVSxFQUFFLEtBQUs7S0FDbEI7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUVsQixDQUFDO0FBRU0sTUFBTSxtQkFBbUIsR0FDaEM7SUFDRSxnQkFBZ0IsRUFBRSxLQUFLO0lBQ3ZCLHNCQUFzQixFQUFFLEtBQUs7SUFDN0IsbUJBQW1CLEVBQUUsS0FBSztDQUMzQjtBQUdNLE1BQU0sbUJBQW1CLEdBQ2hDO0lBQ0UsS0FBSyxFQUFFLGFBQWEsRUFBRTtJQUN0QixTQUFTLEVBQUUsbUJBQW1CO0lBQzlCLGVBQWUsRUFBRTtRQUNmO1lBQ0UsU0FBUyxFQUFFLGlCQUFpQjtZQUM1QixZQUFZLEVBQUUsU0FBUztTQUN4QjtRQUNEO1lBQ0UsU0FBUyxFQUFFLG1DQUFtQztZQUM5QyxZQUFZLEVBQUUsU0FBUztTQUN4QjtLQUNGO0lBQ0QsWUFBWSxFQUFFO1FBQ1osb0JBQW9CLEVBQUUsS0FBSztRQUMzQixRQUFRLEVBQUUsQ0FBQztLQUNaO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDNEI7QUFReEIsU0FBUyxrQkFBa0IsQ0FBSSxHQUFNLEVBQUUsUUFBb0M7SUFFOUUsSUFBRyxDQUFDLFFBQVE7UUFBRSxRQUFRLEdBQUcsRUFBK0IsQ0FBQztJQUV6RCxLQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRTtRQUNuQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLGdCQUFnQixJQUFJLEdB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c291cmNlcyI6WyJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0RlYnVnRGVmYXVsdHMudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0tPQ29udmVydGVyLnRzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9TaW5nbGVWYWx1ZUFzcGVjdC9TaW5nbGVWYWx1ZUFzcGVjdENvbmZpZy50cyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vc3JjL1dlYkJhc2VkL1BvcnRhbFdpZGdldHMvU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXQvU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXRDb25maWcudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy9leHRlcm5hbCB2YXIgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL2V4dGVybmFsIHZhciBcImtvXCIiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uL3NyYy9XZWJCYXNlZC9Qb3J0YWxXaWRnZXRzL1NpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0L0Rlc2lnbmVyL1NpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0RGVzaWduZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSURlYnVnIH0gZnJvbSBcIi4vSURlYnVnXCI7XG5pbXBvcnQgeyBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnLCBJUmVmcmVzaE9uIH0gZnJvbSBcIi4vSVdpZGdldEpzb25cIjtcblxuZXhwb3J0IGNvbnN0IERFQlVHX0RFRkFVTFQgPSAoKSA9PiAge1xuXG4gICAgbGV0IHJldFZhbHVlOklEZWJ1ZyA9IHtcbiAgICAgIHN1cHBvcnRSZXF1ZXN0RW5hYmxlZDogZmFsc2UsXG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgbG9nVG9Db25zb2xlOiB0cnVlLFxuICAgICAgc2hvd0luQXNwZWN0OiBmYWxzZSxcbiAgICAgIGxpdmVDb25maWc6IGZhbHNlLFxuICAgIH1cbiAgICByZXR1cm4gcmV0VmFsdWU7XG4gIFxuICB9XG5cbiAgZXhwb3J0IGNvbnN0IFJFRlJFU0hfT05fREVGQVVMVFMgOklSZWZyZXNoT249XG4gIHtcbiAgICBzaGFyZWRvSWRDaGFuZ2VkOiBmYWxzZSxcbiAgICBzaGFyZWRvUGFyZW50SWRDaGFuZ2VkOiBmYWxzZSxcbiAgICBzaGFyZWRvUGhhc2VDaGFuZ2VkOiBmYWxzZSxcbiAgfVxuXG5cbiAgZXhwb3J0IGNvbnN0IERlZmF1bHREYXRhU2V0dGluZ3M6SURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzx1bmtub3duPiA9XG4gIHtcbiAgICBkZWJ1ZzogREVCVUdfREVGQVVMVCgpLFxuICAgIHJlZnJlc2hPbjogUkVGUkVTSF9PTl9ERUZBVUxUUyxcbiAgICBldmVudHNUb1JlYWN0VG86IFtcbiAgICAgIHtcbiAgICAgICAgZXZlbnRQYXRoOiBcInNoYXJlZG8udXBkYXRlZFwiLFxuICAgICAgICBtZXRob2RUb0NhbGw6IFwicmVmcmVzaFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby5jb3JlLmNhc2Uuc2hhcmVkby11cGRhdGVkXCIsXG4gICAgICAgIG1ldGhvZFRvQ2FsbDogXCJyZWZyZXNoXCJcbiAgICAgIH1cbiAgICBdLFxuICAgIGRhdGFTZXR0aW5nczoge1xuICAgICAgZ2V0VmFsdWVVc2luZ1BhcmVudHM6IGZhbHNlLFxuICAgICAgbWF4RGVwdGg6IDBcbiAgICB9XG4gIH1cbiAgIiwiaW1wb3J0ICogYXMga28gZnJvbSAna25vY2tvdXQnO1xuaW1wb3J0IHsgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb24gfSBmcm9tICcuL0lXaWRnZXRKc29uJztcblxuZXhwb3J0IHR5cGUgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPiA9IHtcbiAgICBbSyBpbiBrZXlvZiBUXSAgICAgIDogVFtLXSBleHRlbmRzIEFycmF5PGluZmVyIFU+ID8ga28uT2JzZXJ2YWJsZUFycmF5PE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VT4+IDpcbiAgICBUW0tdIGV4dGVuZHMgb2JqZWN0ID8ga28uT2JzZXJ2YWJsZTxOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFRbS10+PiA6IGtvLk9ic2VydmFibGU8VFtLXT47XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlT2JqZWN0PFQ+KG9iajogVCwgZXhpc3Rpbmc/OiBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+KTogTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPiB7XG4gICAgXG4gICAgaWYoIWV4aXN0aW5nKSBleGlzdGluZyA9IHt9IGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD47XG4gICBcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYga2V5ICE9PSBcIl9fa29fbWFwcGluZ19fXCIgJiYga2V5ICE9PSBcIl9ob3N0XCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleSBhcyBrZXlvZiBUXTtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZ1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0gPSBrby5vYnNlcnZhYmxlQXJyYXkodmFsdWUubWFwKGl0ZW0gPT4gdG9PYnNlcnZhYmxlT2JqZWN0KGl0ZW0sIHt9IGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8dHlwZW9mIGl0ZW0+KSkpIGFzIGFueTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleGlzdGluZ1trZXldPWVuc3VyZUlzT2JzZXJ2YWJsZUFycmF5KGV4aXN0aW5nLCBrZXkpXG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0odmFsdWUubWFwKGl0ZW0gPT4gdG9PYnNlcnZhYmxlT2JqZWN0KGl0ZW0sIHt9IGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8dHlwZW9mIGl0ZW0+KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3Rpbmdba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldID0ga28ub2JzZXJ2YWJsZSh0b09ic2VydmFibGVPYmplY3QodmFsdWUsIHt9IGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8dHlwZW9mIHZhbHVlPikpIGFzIGFueTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleGlzdGluZ1trZXldICA9IGVuc3VyZUlzT2JzZXJ2YWJsZShleGlzdGluZywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSh0b09ic2VydmFibGVPYmplY3QoKHZhbHVlIGFzIGFueSksIChleGlzdGluZ1trZXldKCkgYXMgYW55KSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdGluZ1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIChleGlzdGluZ1trZXldIGFzIGFueSkgPSBrby5vYnNlcnZhYmxlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleGlzdGluZ1trZXldID0gZW5zdXJlSXNPYnNlcnZhYmxlKGV4aXN0aW5nLCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldKCh2YWx1ZSBhcyBhbnkpKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4aXN0aW5nIGFzIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD47XG59XG5leHBvcnQgaW50ZXJmYWNlIElEZWJ1ZyB7XG4gICAgc3VwcG9ydFJlcXVlc3RFbmFibGVkPzogYm9vbGVhbjtcbiAgICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgICBsb2dUb0NvbnNvbGU6IGJvb2xlYW47XG4gICAgICBzaG93SW5Bc3BlY3Q6IGJvb2xlYW47XG4gICAgICBsaXZlQ29uZmlnPzogYm9vbGVhbjtcbiAgICB9XG4gIFxuXG5cbmZ1bmN0aW9uIGVuc3VyZUlzT2JzZXJ2YWJsZShleGlzdGluZzogYW55LCBrZXk6IHN0cmluZykge1xuICAgIGlmIChrby5pc09ic2VydmFibGUoZXhpc3Rpbmdba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nW2tleV0gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtvLm9ic2VydmFibGUoKTtcbiAgICB9XG59XG5cblxuXG5mdW5jdGlvbiBlbnN1cmVJc09ic2VydmFibGVBcnJheShleGlzdGluZzogYW55LCBrZXk6IHN0cmluZykge1xuICAgIGlmIChrby5pc09ic2VydmFibGVBcnJheShleGlzdGluZ1trZXldKSkge1xuICAgICAgICByZXR1cm4gZXhpc3Rpbmdba2V5XSA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgfVxufVxuXG4vLyBleHBvcnQgdHlwZSBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPiA9IFRDb25maWcgJiB7XG4vLyAgICAgZGVidWc6IElEZWJ1Zztcbi8vICAgfVxuXG4vLyBleHBvcnQgdHlwZSBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSBcbi8vIHsgW0sgaW4ga2V5b2YgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+XToga28uT2JzZXJ2YWJsZTxJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz5bS10+OyB9XG5cbi8vIGV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ3VyYXRpb25Ib3N0IHtcbi8vICAgICBfaG9zdDoge1xuLy8gICAgICAgICBibGFkZTogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5BZGRFZGl0U2hhcmVkbztcbi8vICAgICAgICAgZW5hYmxlZDoga28uT2JzZXJ2YWJsZTxib29sZWFuPjsgLy8gVXNpbmcgJ2FueScgZm9yIHJldHVybiB0eXBlIGFzIGl0J3Mgbm90IGNsZWFyIHdoYXQgdGhlc2UgZnVuY3Rpb25zIHJldHVyblxuLy8gICAgICAgICBtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbztcbi8vICAgICB9XG4vLyB9XG5cbi8vIGV4cG9ydCB0eXBlIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPiA9IElDb25maWd1cmF0aW9uSG9zdCAmIElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFRDb25maWc+O1xuXG4vLyBpbnRlcmZhY2UgUm9vdE9iamVjdCB7XG4vLyAgIGwxOiBzdHJpbmc7XG4vLyAgIG8xOiBPMTtcbi8vIH1cblxuLy8gaW50ZXJmYWNlIE8xIHtcbi8vICAgbDI6IHN0cmluZztcbi8vICAgbzI6IE8yO1xuLy8gICBhMTogQTFbXTtcbi8vIH1cblxuLy8gaW50ZXJmYWNlIEExIHtcbi8vICAgbDQ6IHN0cmluZztcbi8vIH1cblxuLy8gaW50ZXJmYWNlIE8yIHtcbi8vICAgbDM6IHN0cmluZztcbi8vIH1cbi8vIC8vIE5vdyBsZXQncyB1c2UgdGhlIGZ1bmN0aW9uOlxuLy8gY29uc3QgeDogSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248Um9vdE9iamVjdD4gPSB7XG4vLyAgICAgbDE6IFwibDFcIixcbi8vICAgICBvMToge1xuLy8gICAgICAgICBsMjpcImwyXCIsXG4vLyAgICAgICAgIG8yOiB7XG4vLyAgICAgICAgICAgICBsMzogXCJsM1wiLFxuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBhMTogW1xuLy8gICAgICAgICAgICAgeyBsNDogXCJsNFwiIH1cbi8vICAgICAgICAgXVxuLy8gICAgIH0sXG4vLyAgICAgZGVidWc6XG4vLyAgICAge1xuLy8gICAgICAgICBlbmFibGVkOiBmYWxzZSxcbi8vICAgICAgICAgbG9nVG9Db25zb2xlOiBmYWxzZSxcbi8vICAgICAgICAgc2hvd0luQXNwZWN0OiBmYWxzZVxuLy8gICAgIH1cbi8vIH1cblxuLy8gbGV0IG0gOiAgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxSb290T2JqZWN0Pj5cblxuLy8gbGV0IHkgPSB0b09ic2VydmFibGVPYmplY3QoeCx7fSBhcyBhbnkpIGFzICBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFJvb3RPYmplY3Q+PlxuXG4vLyBsZXQgcCA9IHkuZGVidWcoKS5saXZlQ29uZmlnISgpXG5cbi8vIGV4cG9ydCBmdW5jdGlvbiB0b09ic2VydmFibGVPYmplY3Qob2JqOiBhbnksIGV4aXN0aW5nT2JzZXJ2YWJsZXM/OmtvLk9ic2VydmFibGU8YW55Pik6IGtvLk9ic2VydmFibGUge1xuLy8gICAgIGNvbnN0IHJlc3VsdCA9IGV4aXN0aW5nT2JzZXJ2YWJsZXMgfHwge30gYXMga28uT2JzZXJ2YWJsZTtcblxuLy8gICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuLy8gICAgICAgICBpZihrZXkgPT09IFwiX19rb19tYXBwaW5nX19cIikgY29udGludWU7XG4vLyAgICAgICAgIGlmKGtleSA9PT0gXCJfaG9zdFwiKSBjb250aW51ZTtcblxuLy8gICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuLy8gICAgICAgICAgICAgbGV0IG5ld3YgPSBvYmpba2V5XTtcbi8vICAgICAgICAgICAgIGxldCBjdXJyID0gKHJlc3VsdCBhcyBhbnkpW2tleV0gO1xuXG4vLyAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobmV3dikgJiYgdHlwZW9mIG5ld3YgPT09IFwib2JqZWN0XCIgJiYgbmV3diAhPT0gbnVsbCAmJiAha28uaXNPYnNlcnZhYmxlKG5ld3YpKSB7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSB0b09ic2VydmFibGVPYmplY3QobmV3diBhcyBvYmplY3QpIFxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidG9PYnNlcnZhYmxlT2JqZWN0XCIsIChyZXN1bHQgYXMgYW55KVtrZXldKTtcbi8vICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IGtvLm9ic2VydmFibGUoKHJlc3VsdCBhcyBhbnkpW2tleV0pO1xuLy8gICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXd2KSkge1xuLy8gICAgICAgICAgICAgICAgIGlmIChjdXJyICYmIGtvLmlzT2JzZXJ2YWJsZUFycmF5KGN1cnIpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldKG5ld3YpO1xuLy8gICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0ga28ub2JzZXJ2YWJsZUFycmF5KG5ld3YpIGFzIGFueTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgY29udGludWU7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIGlmIChrby5pc09ic2VydmFibGUobmV3dikpIHtcbi8vICAgICAgICAgICAgICAgICBuZXd2ID0gbmV3digpOyAvLyBwdWxsIG91dCB0aGUgdmFsdWVcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgaWYgKGN1cnIgJiYga28uaXNPYnNlcnZhYmxlKGN1cnIpKSB7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0obmV3dik7IC8vIHVwZGF0ZSB0aGUgZXhpc3Rpbmcgb2JzZXJ2YWJsZVxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IGtvLm9ic2VydmFibGUobmV3dik7XG4gICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG5cbi8vICAgICByZXR1cm4gcmVzdWx0O1xuLy8gfVxuIiwiaW1wb3J0IHsgREVCVUdfREVGQVVMVCB9IGZyb20gXCIuLi9CYXNlQ2xhc3Nlcy9EZWJ1Z0RlZmF1bHRzXCI7XG5pbXBvcnQgeyBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnLCBJV2lkZ2V0SnNvbiB9IGZyb20gXCIuLi9CYXNlQ2xhc3Nlcy9JV2lkZ2V0SnNvblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24ge1xuICAgIGZpZWxkUGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsXG4gICAgdmFsdWVPbk5vdEZvdW5kOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgY2FsY3VsYXRlZFZhbHVlOiBzdHJpbmc7XG4gICAgY2FsY3VsYXRlZFRpdGxlOiBzdHJpbmc7XG4gICAgZm9ybWF0dGVyOiBzdHJpbmcgfCB1bmRlZmluZWQsXG59XG5cblxuZXhwb3J0IGNvbnN0IERlZmF1bHQ6IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8SVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbj4gPSB7XG4gXG4gICAgZmllbGRQYXRoOiBcInRpdGxlXCIsXG4gICAgdGl0bGU6IG51bGwsXG4gICAgY2FsY3VsYXRlZFZhbHVlOiBcIlwiLFxuICAgIGNhbGN1bGF0ZWRUaXRsZTogXCJcIixcbiAgICB2YWx1ZU9uTm90Rm91bmQ6IFwiTm90IEZvdW5kXCIsXG4gICAgZm9ybWF0dGVyOiBcInZhbHVlXCIsLy9pZihwcmlvcml0eS5uYW1lID09PSAnbm9ybWFsJykgeyAgICAgICAgIHJldHVybiA9ICc8c3BhbiBjbGFzcz1cIm5vcm1hbFwiPk5vcm1hbCBQcmlvcml0eTwvc3Bhbj4nOyAgICAgfSBlbHNlIGlmKHByaW9yaXR5Lm5hbWUgPT09ICdoaWdoJykgeyAgICAgICAgIHJldHVybiA9ICc8c3BhbiBjbGFzcz1cImhpZ2hcIj5IaWdoIFByaW9yaXR5PC9zcGFuPic7ICAgICB9IGVsc2UgaWYocHJpb3JpdHkubmFtZSA9PT0gJ3VyZ2VudCcpIHsgICAgICAgICByZXR1cm4gPSAnPHNwYW4gY2xhc3M9XCJ1cmdlbnRcIj5VcmdlbnQgUHJpb3JpdHk8L3NwYW4+JzsgICAgIH0gZWxzZSB7ICAgICAgICAgcmV0dXJuID0gJzxzcGFuPlVua25vd24gUHJpb3JpdHk8L3NwYW4+JzsgICAgIH1cbiAgICBkZWJ1ZzogREVCVUdfREVGQVVMVCgpLFxuICAgIFxuICAgIGV2ZW50c1RvUmVhY3RUbzogW1xuICAgICAgICB7XG4gICAgICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby5jb3JlLmNhc2UucGhhc2UtY2hhbmdlZFwiLFxuICAgICAgICAgICAgbWV0aG9kVG9DYWxsOiBcImxvYWRBbmRCaW5kXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZXZlbnRQYXRoOiBcInNoYXJlZG8uY29yZS5jYXNlLmZvcm1zLnBoYXNlLnBoYXNlLWNoYW5nZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLnVwZGF0ZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLmNvcmUuY2FzZS5zaGFyZWRvLXVwZGF0ZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH1cbiAgICBdLFxuICAgIHJlZnJlc2hPbjoge1xuICAgICAgICBzaGFyZWRvSWRDaGFuZ2VkOiB0cnVlLFxuICAgICAgICBzaGFyZWRvUGFyZW50SWRDaGFuZ2VkOiB0cnVlLFxuICAgICAgICBzaGFyZWRvUGhhc2VDaGFuZ2VkOiB0cnVlLFxuICAgIH0sXG4gICAgZGF0YVNldHRpbmdzOiB7XG4gICAgICAgIGdldFZhbHVlVXNpbmdQYXJlbnRzOiBmYWxzZSxcbiAgICAgICAgbWF4RGVwdGg6IDAsXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IFdpZGdldFNldHRpbmdzIDogSVdpZGdldEpzb248SVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbj4gPXtcbiAgICB0eXBlOiBcIndpZGdldFwiLFxuICAgIFwicHJpb3JpdHlcIjogNjAwMCxcbiAgICBcImRlc2lnbmVyXCI6IHtcbiAgICAgICAgXCJhbGxvd0luUG9ydGFsRGVzaWduZXJcIjogZmFsc2UsXG4gICAgICAgIFwiYWxsb3dJblNoYXJlZG9Qb3J0YWxEZXNpZ25lclwiOiB0cnVlLFxuICAgICAgICBcImFsbG93QXNwZWN0QWRhcHRlclwiOiB0cnVlLFxuICAgICAgICBcInRpdGxlXCI6IFwiU2luZ2xlIFZhbHVlIEFzcGVjdFwiLFxuICAgICAgICBcImljb25cIjogXCJmYS1jb2dcIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlNpbmdsZSBWYWx1ZSBBc3BlY3RcIixcbiAgICAgICAgXCJjYXRlZ29yaWVzXCI6IFsgICBcIlVEIC0gSURFQXNwZWN0c1wiXSxcbiAgICAgICAgXCJpc0NvbmZpZ3VyYWJsZVwiOiB0cnVlLFxuICAgICAgICBcImNvbmZpZ3VyYXRpb25XaWRnZXRcIjogbnVsbCxcbiAgICAgICAgXCJkZWZhdWx0Q29uZmlndXJhdGlvbkpzb25cIjogeyBjb25maWd1cmF0aW9uOiBEZWZhdWx0fVxuICAgIH0sXG4gICAgXCJzY3JpcHRzXCI6IFtcbiAgICBdLFxuICAgIFwic3R5bGVzXCI6IFtcbiAgICAgICAgXCJTaW5nbGVWYWx1ZUFzcGVjdC5jc3NcIlxuICAgIF0sXG4gICAgXCJ0ZW1wbGF0ZXNcIjogW1xuICAgICAgICBcIlNpbmdsZVZhbHVlQXNwZWN0Lmh0bWxcIlxuICAgIF0sXG4gICAgXCJtZW51VGVtcGxhdGVzXCI6IFtdLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXVxufSIsImltcG9ydCB7IElXaWRnZXRKc29uIH0gZnJvbSBcIi4uLy4uL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvSVdpZGdldEpzb25cIjtcbmltcG9ydCB7IElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24sIERlZmF1bHQgfSBmcm9tIFwiLi4vLi4vSURFQXNwZWN0cy9TaW5nbGVWYWx1ZUFzcGVjdC9TaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTaW5nbGVWYWx1ZVBvcnRhbENvbmZpZ3VyYXRpb24gZXh0ZW5kcyBJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uIHtcbiAgICBcbn1cblxuZXhwb3J0IGNvbnN0IFNpbmdsZVZhbHVlUG9ydGFsRGVmYXVsdCA9IERlZmF1bHQ7XG5cbmV4cG9ydCBjb25zdCBXaWRnZXRTZXR0aW5ncyA6IElXaWRnZXRKc29uPElTaW5nbGVWYWx1ZVBvcnRhbENvbmZpZ3VyYXRpb24+ID17XG4gICAgdHlwZTogXCJ3aWRnZXRcIixcbiAgICBcInByaW9yaXR5XCI6IDYwMDAsXG4gICAgXCJkZXNpZ25lclwiOiB7XG4gICAgICAgIFwiYWxsb3dJblBvcnRhbERlc2lnbmVyXCI6IHRydWUsXG4gICAgICAgIFwiYWxsb3dJblNoYXJlZG9Qb3J0YWxEZXNpZ25lclwiOiB0cnVlLFxuICAgICAgICBcImFsbG93QXNwZWN0QWRhcHRlclwiOiBmYWxzZSxcbiAgICAgICAgXCJ0aXRsZVwiOiBcIlNpbmdsZSBWYWx1ZSBQb3J0YWwgV2lkZ2V0XCIsXG4gICAgICAgIFwiaWNvblwiOiBcImZhLWNvZ1wiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiU2hvdyBhIHNpbmdsZSB2YWx1ZSBpbiBhIHBvcnRhbCB3aWRnZXRcIixcbiAgICAgICAgXCJjYXRlZ29yaWVzXCI6IFsgICBcIlVEIC0gSURFQXNwZWN0c1wiXSxcbiAgICAgICAgXCJpc0NvbmZpZ3VyYWJsZVwiOiB0cnVlLFxuICAgICAgICBcImNvbmZpZ3VyYXRpb25XaWRnZXRcIjogXCJQb3J0YWxXaWRnZXRzLlNpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0RGVzaWduZXJcIixcbiAgICAgICAgXCJkZWZhdWx0Q29uZmlndXJhdGlvbkpzb25cIjogeyBjb25maWd1cmF0aW9uOiBEZWZhdWx0fVxuICAgIH0sXG4gICAgXCJzY3JpcHRzXCI6IFtcbiAgICBdLFxuICAgIFwic3R5bGVzXCI6IFtcbiAgICAgICAgXCJTaW5nbGVWYWx1ZVBvcnRhbFdpZGdldC5jc3NcIlxuICAgIF0sXG4gICAgXCJ0ZW1wbGF0ZXNcIjogW1xuICAgICAgICBcIlNpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0Lmh0bWxcIlxuICAgIF0sXG4gICAgXCJtZW51VGVtcGxhdGVzXCI6IFtdLFxuICAgIFwiY29tcG9uZW50c1wiOiBbXVxufSIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5OyIsIm1vZHVsZS5leHBvcnRzID0ga287IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xyXG5pbXBvcnQgKiBhcyAkIGZyb20gXCJqcXVlcnlcIjtcclxuaW1wb3J0IHsgSVNpbmdsZVZhbHVlUG9ydGFsQ29uZmlndXJhdGlvbiwgU2luZ2xlVmFsdWVQb3J0YWxEZWZhdWx0IH0gZnJvbSBcIi4uL1NpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0Q29uZmlnXCI7XHJcbmltcG9ydCB7IE5lc3RlZE9ic2VydmFibGVPYmplY3QsIHRvT2JzZXJ2YWJsZU9iamVjdCB9IGZyb20gXCIuLi8uLi8uLi9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0tPQ29udmVydGVyXCI7XHJcbmltcG9ydCB7IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWcsIElXaWRnZXRDb25maWdTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi8uLi9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL0lXaWRnZXRKc29uXCI7XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFNpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0RGVzaWduZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IGFueSwgYmFzZU1vZGVsOiBhbnkpOiBTaW5nbGVWYWx1ZVBvcnRhbFdpZGdldERlc2lnbmVyQ2xhc3Mge1xyXG4gICAgcmV0dXJuIG5ldyBTaW5nbGVWYWx1ZVBvcnRhbFdpZGdldERlc2lnbmVyQ2xhc3MoZWxlbWVudCwgY29uZmlndXJhdGlvbiwgYmFzZU1vZGVsKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTaW5nbGVWYWx1ZVBvcnRhbFdpZGdldERlc2lnbmVyQ2xhc3Mge1xyXG4gICAgbW9kZWw6IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxJU2luZ2xlVmFsdWVQb3J0YWxDb25maWd1cmF0aW9uPj47XHJcbiAgICB2YWxpZGF0aW9uOiBhbnk7XHJcbiAgICB2YWxpZGF0aW9uRXJyb3JDb3VudDoga28uQ29tcHV0ZWQ8bnVtYmVyPjtcclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogSVdpZGdldENvbmZpZ1NldHRpbmdzPElTaW5nbGVWYWx1ZVBvcnRhbENvbmZpZ3VyYXRpb24+LCBiYXNlTW9kZWw6IGFueSkge1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGRlZmF1bHRzID0gU2luZ2xlVmFsdWVQb3J0YWxEZWZhdWx0XHJcblxyXG4gICAgICAgIC8vIGNvbmZpZ3VyYXRpb24gPSBrby50b0pTKGNvbmZpZ3VyYXRpb24pO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgY29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgbGV0IG9ic2VydmFibGVPcHRpb25zID0gdG9PYnNlcnZhYmxlT2JqZWN0KG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIG1vZGVsXHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG9ic2VydmFibGVPcHRpb25zO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIG1vZGVsIHZhbGlkYXRvcnNcclxuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmllbGRQYXRoOiBrby5wdXJlQ29tcHV0ZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB0aGlzLm1vZGVsLmZpZWxkUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtZXNzYWdlKSByZXR1cm4gXCJUaGUgZmllbGRQYXRoIGlzIHJlcXVpcmVkXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gRXhwb3NlIGEgdmFsaWRhdGlvbkVycm9yQ291bnQgb2JzZXJ2YWJsZSB0byB0ZWxsIHRoZSBob3N0IGRlc2lnbmVyIGJsYWRlXHJcbiAgICAgICAgLy8gd2hldGhlciBzYXZlIGlzIGN1cnJlbnRseSBwb3NzaWJsZSBvciBub3QuIFJldHVybiAwIHRvIGluZGljYXRlIGFsbCBpcyB2YWxpZCxcclxuICAgICAgICAvLyBvciBpZiBub3QsIHRoZSBjb3VudCBvZiBlcnJvcnMuIElmIG5vIHZhbGlkYXRpb24gcmVxdWlyZWQsIHRoaXMgY2FuIGJlIHJlbW92ZWQuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JDb3VudCA9IGtvLnB1cmVDb21wdXRlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBmYWlscyA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRpb24uZmllbGRQYXRoKCkpIGZhaWxzKys7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWlscztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0TW9kZWwoKTpJV2lkZ2V0Q29uZmlnU2V0dGluZ3M8SVNpbmdsZVZhbHVlUG9ydGFsQ29uZmlndXJhdGlvbj4ge1xyXG4gICAgICAgIGxldCByZXRWYWx1ZTpJV2lkZ2V0Q29uZmlnU2V0dGluZ3M8SVNpbmdsZVZhbHVlUG9ydGFsQ29uZmlndXJhdGlvbj4gPSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb246IGtvLnRvSlModGhpcy5tb2RlbCkgYXMgYW55XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXRWYWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgbG9hZEFuZEJpbmQoKSB7XHJcblxyXG4gICAgfTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8vIG5hbWVzcGFjZShcIlZpc3VhbGlzYXRpb24uV2lkZ2V0c1wiKTtcclxuXHJcbi8vIC8qKlxyXG4vLyAgKiBDb25zdHJ1Y3RvciBmb3IgeW91ciB3aWRnZXRcclxuLy8gICogQHBhcmFtIHt9IGVsZW1lbnQgICAgICAgICAgICBUaGUgSHRtbCBET00gZWxlbWVudCB0byB3aGljaCB0aGlzIHdpZGdldCB3aWxsIGJpbmRcclxuLy8gICogQHBhcmFtIHt9IGNvbmZpZ3VyYXRpb24gICAgICBUaGUgY29uZmlndXJhdGlvbiBwYXNzZWQgaW4gZnJvbSB0aGUgZGVzaWduZXIvY29uZmlnXHJcbi8vICAqIEBwYXJhbSB7fSBiYXNlTW9kZWwgICAgICAgICAgVGhlIGJhc2Ugd2lkZ2V0IG1vZGVsIChjb250YWlucyB1bmlxdWUgaWQgZXRjKVxyXG4vLyAgKiBAcmV0dXJucyB7fVxyXG4vLyAgKi9cclxuLy8gVmlzdWFsaXNhdGlvbi5XaWRnZXRzLlNpbmdsZVZhbHVlRGlzcGxheURlc2lnbmVyID0gZnVuY3Rpb24oZWxlbWVudCwgY29uZmlndXJhdGlvbiwgYmFzZU1vZGVsKVxyXG4vLyB7XHJcbi8vICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbi8vICAgICB2YXIgZGVmYXVsdHMgPVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIC8vIFRoZXNlIGNvbmZpZ3VyYXRpb25zIGFyZSBwYXNzZWQgZnJvbSB0aGUgaG9zdCBvZiB0aGlzIGRlc2lnbmVyIHdpZGdldFxyXG4vLyAgICAgICAgIGJsYWRlOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBibGFkZSBob3N0aW5nIHRoZSB3aWRnZXRcclxuLy8gICAgICAgICBfX3Njb3BlOlxyXG4vLyAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgbW9kZTogbnVsbCwgICAgICAgICAgICAgICAgICAgICAvLyBXaWxsIGJlIGdsb2JhbFBvcnRhbCBvciBzaGFyZWRvVHlwZVxyXG4vLyAgICAgICAgICAgICBzaGFyZWRvVHlwZVN5c3RlbU5hbWU6IG51bGwgICAgIC8vIElmIG1vZGU9PT1zaGFyZWRvVHlwZSwgY29udGFpbnMgdGhlIHR5cGUgYmVpbmcgZWRpdGVkXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICAvLyBZb3VyIGRlc2lnbmVyIG1vZGVsIGlzIGFsc28gcGFzc2VkIGluXHJcbi8vICAgICAgICAgZmllbGRQYXRoOiBudWxsXHJcbi8vICAgICB9O1xyXG4vLyAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIGNvbmZpZ3VyYXRpb24pO1xyXG5cclxuLy8gICAgIC8vIENyZWF0ZSB0aGUgbW9kZWxcclxuLy8gICAgIHRoaXMubW9kZWwgPVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIGZpZWxkUGF0aDoga28ub2JzZXJ2YWJsZShvcHRpb25zLmZpZWxkUGF0aClcclxuLy8gICAgIH07XHJcblxyXG4vLyAgICAgLy8gQ3JlYXRlIHRoZSBtb2RlbCB2YWxpZGF0b3JzXHJcbi8vICAgICB0aGlzLnZhbGlkYXRpb24gPVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIGZpZWxkUGF0aDoga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uKClcclxuLy8gICAgICAgICB7XHJcbi8vICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gdGhpcy5tb2RlbC5maWVsZFBhdGgoKTtcclxuLy8gICAgICAgICAgICAgaWYgKCFtZXNzYWdlKSByZXR1cm4gXCJUaGUgZmllbGRQYXRoIGlzIHJlcXVpcmVkXCI7XHJcbi8vICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4vLyAgICAgICAgIH0pXHJcbi8vICAgICB9O1xyXG5cclxuLy8gICAgIC8vIEV4cG9zZSBhIHZhbGlkYXRpb25FcnJvckNvdW50IG9ic2VydmFibGUgdG8gdGVsbCB0aGUgaG9zdCBkZXNpZ25lciBibGFkZVxyXG4vLyAgICAgLy8gd2hldGhlciBzYXZlIGlzIGN1cnJlbnRseSBwb3NzaWJsZSBvciBub3QuIFJldHVybiAwIHRvIGluZGljYXRlIGFsbCBpcyB2YWxpZCxcclxuLy8gICAgIC8vIG9yIGlmIG5vdCwgdGhlIGNvdW50IG9mIGVycm9ycy4gSWYgbm8gdmFsaWRhdGlvbiByZXF1aXJlZCwgdGhpcyBjYW4gYmUgcmVtb3ZlZC5cclxuLy8gICAgIHRoaXMudmFsaWRhdGlvbkVycm9yQ291bnQgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24oKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIHZhciBmYWlscyA9IDA7XHJcbi8vICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGlvbi5maWVsZFBhdGgoKSkgZmFpbHMrKztcclxuLy8gICAgICAgICByZXR1cm4gZmFpbHM7XHJcbi8vICAgICB9KTtcclxuLy8gfTtcclxuXHJcbi8vIC8qKlxyXG4vLyAgKiBDYWxsZWQgYnkgdGhlIFVJIGZyYW1ld29yayB3aGVuIHRoaXMgd2lkZ2V0IGlzIGJlaW5nIHVubG9hZGVkIC0gY2xlYW4gdXBcclxuLy8gICogYW55IHN1YnNjcmlwdGlvbnMgb3IgcmVmZXJlbmNlcyBoZXJlIHRoYXQgd291bGQga2VlcCB0aGlzIGluc3RhbmNlIGFsaXZlXHJcbi8vICAqL1xyXG4vLyBWaXN1YWxpc2F0aW9uLldpZGdldHMuU2luZ2xlVmFsdWVEaXNwbGF5RGVzaWduZXIucHJvdG90eXBlLm9uRGVzdHJveSA9IGZ1bmN0aW9uKClcclxuLy8ge1xyXG4vLyAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4vLyB9O1xyXG5cclxuLy8gLyoqXHJcbi8vICAqIENhbGxlZCBieSB0aGUgVUkgZnJhbWV3b3JrIGFmdGVyIGluaXRpYWwgY3JlYXRpb24gYW5kIGJpbmRpbmcgdG8gbG9hZCBkYXRhXHJcbi8vICAqIGludG8gaXQncyBtb2RlbFxyXG4vLyAgKi9cclxuLy8gVmlzdWFsaXNhdGlvbi5XaWRnZXRzLlNpbmdsZVZhbHVlRGlzcGxheURlc2lnbmVyLnByb3RvdHlwZS5sb2FkQW5kQmluZCA9IGZ1bmN0aW9uKClcclxuLy8ge1xyXG4vLyAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4vLyB9O1xyXG5cclxuLy8gLyoqXHJcbi8vICAqIENhbGxlZCBieSB0aGUgd2lkZ2V0L3BvcnRhbCBlZGl0b3IgZnJhbWV3b3JrIHRvIGdldCB0aGUgY29uZmlndXJhdGlvbiBtb2RlbFxyXG4vLyAgKi9cclxuLy8gVmlzdWFsaXNhdGlvbi5XaWRnZXRzLlNpbmdsZVZhbHVlRGlzcGxheURlc2lnbmVyLnByb3RvdHlwZS5nZXRNb2RlbCA9IGZ1bmN0aW9uKClcclxuLy8ge1xyXG4vLyAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBmaWVsZFBhdGg6IHRoaXMubW9kZWwuZmllbGRQYXRoKClcclxuLy8gICAgIH07XHJcbi8vIH07XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=