/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

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
/*!*************************************************************************************************************************!*\
  !*** ../../Desktop/Test/src/WebBased/PortalWidgets/SingleValuePortalWidget/Designer/SingleValuePortalWidgetDesigner.ts ***!
  \*************************************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingleValuePortalWidgetDesigner: () => (/* binding */ SingleValuePortalWidgetDesigner),
/* harmony export */   SingleValuePortalWidgetDesignerClass: () => (/* binding */ SingleValuePortalWidgetDesignerClass)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SingleValuePortalWidgetConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SingleValuePortalWidgetConfig */ "../../Desktop/Test/src/WebBased/PortalWidgets/SingleValuePortalWidget/SingleValuePortalWidgetConfig.ts");
/* harmony import */ var _IDEAspects_BaseClasses_KOConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../IDEAspects/BaseClasses/KOConverter */ "../../Desktop/Test/src/WebBased/IDEAspects/BaseClasses/KOConverter.ts");




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVzaWduZXIvU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXREZXNpZ25lci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVTyxNQUFNLGFBQWEsR0FBRyxHQUFHLEVBQUU7SUFDaEMsNkNBQTZDO0lBRTdDLElBQUksUUFBUSxHQUFXO1FBQ3JCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsWUFBWSxFQUFFLElBQUk7UUFDbEIsWUFBWSxFQUFFLEtBQUs7UUFDbkIsVUFBVSxFQUFFLEtBQUs7S0FDbEIsQ0FBQztJQUNGLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQUVLLE1BQU0sdUJBQXVCLEdBQXdCO0lBQzFELGNBQWMsRUFBRSxNQUFNO0lBQ3RCLEtBQUssRUFBRSxpSkFBaUo7SUFDeEosV0FBVyxFQUFFLFNBQVM7Q0FDdkI7QUFFTSxNQUFNLHNCQUFzQixHQUFtQjtJQUNwRCxrQkFBa0IsRUFBRSxJQUFJO0lBQ3hCLG9CQUFvQixFQUFFLHdMQUF3TDtJQUM5TSxnQ0FBZ0MsRUFBRSx1QkFBdUI7SUFDekQsV0FBVyxFQUFFLHlCQUF5QjtJQUN0QyxLQUFLLEVBQUUsc0JBQXNCO0lBQzdCLFVBQVUsRUFBRSxTQUFTO0lBQ3JCLFVBQVUsRUFBRSxTQUFTO0lBQ3JCLE9BQU8sRUFBRSw4Q0FBOEM7SUFDdkQsT0FBTyxFQUFFLEtBQUs7Q0FDZixDQUFDO0FBSUssTUFBTSxtQkFBbUIsR0FBZTtJQUM3QyxnQkFBZ0IsRUFBRSxLQUFLO0lBQ3ZCLHNCQUFzQixFQUFFLEtBQUs7SUFDN0IsbUJBQW1CLEVBQUUsS0FBSztDQUMzQixDQUFDO0FBRUssTUFBTSw4QkFBOEIsR0FBaUI7SUFDMUQ7UUFDRSxXQUFXLEVBQUUsSUFBSTtRQUNqQixPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBRSwrREFBK0Q7UUFDckUsbUJBQW1CLEVBQUUsOEVBQThFO1FBQ25HLHFCQUFxQixFQUFFLENBQUMsNkNBQTZDLENBQUM7UUFDdEUsK0JBQStCLEVBQUUsU0FB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QUNuRixJQUFJO0FBQ0osdUJBQXVCO0FBQ3ZCLGVBQWU7QUFDZiw0Q0FBNEM7QUFDNUMsU0FBUztBQUNULEtBQUsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4uLy4uL0Rlc2t0b3AvVGVzdC9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9EZWZhdWx0U2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvS09Db252ZXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvU2luZ2xlVmFsdWVBc3BlY3QvU2luZ2xlVmFsdWVBc3BlY3RDb25maWcudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL1BvcnRhbFdpZGdldHMvU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXQvU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXRDb25maWcudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy9leHRlcm5hbCB2YXIgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL2V4dGVybmFsIHZhciBcImtvXCIiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy8uLi8uLi9EZXNrdG9wL1Rlc3Qvc3JjL1dlYkJhc2VkL1BvcnRhbFdpZGdldHMvU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXQvRGVzaWduZXIvU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXREZXNpZ25lci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJRGVidWcgfSBmcm9tIFwiLi9JRGVidWdcIjtcbmltcG9ydCB7XG4gIElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWcsXG4gIElFcnJvck1hbmFnZW1lbnQsXG4gIElFcnJvclRyYXAsXG4gIElSZWZyZXNoT24sXG4gIElTaGFyZWRvUGFuZWxDb25maWcsXG4gIElTdXBwb3J0QnV0dG9uLFxufSBmcm9tIFwiLi9JbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBjb25zdCBERUJVR19ERUZBVUxUID0gKCkgPT4ge1xuICAvLyEgdGhpcyBpcyBhIGZ1bmN0aW9uIGZvciBkZWJ1ZyBwdXJwb3NlIG9ubHlcblxuICBsZXQgcmV0VmFsdWU6IElEZWJ1ZyA9IHtcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIGxvZ1RvQ29uc29sZTogdHJ1ZSxcbiAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlLFxuICAgIGxpdmVDb25maWc6IGZhbHNlLFxuICB9O1xuICByZXR1cm4gcmV0VmFsdWU7XG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TSEFSRURPX0NPTU1BTkQ6IElTaGFyZWRvUGFuZWxDb25maWcgPSB7XG4gIHR5cGVTeXN0ZW1OYW1lOiBcInRhc2tcIixcbiAgdGl0bGU6IFwiU3VwcG9ydCBSZXF1aXJlZCBmb3IgJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC51c2VyLmZpcnN0bmFtZX0gJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC51c2VyLmxhc3RuYW1lfSBvbiAke2RhdGFDb250ZXh0LnBhZ2VDb250ZXh0LnBhZ2VUaXRsZX1cIixcbiAgZGVzY3JpcHRpb246IHVuZGVmaW5lZFxufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TVVBQT1JUX0JVVFRPTjogSVN1cHBvcnRCdXR0b24gPSB7XG4gIHJhaXNlU3VwcG9ydFRpY2tldDogdHJ1ZSxcbiAgc3VwcG9ydFRpY2tldE1lc3NhZ2U6IFwiU3VwcG9ydCBSZXF1aXJlZCBmb3IgJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC51c2VyLmZpcnN0bmFtZX0gJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC51c2VyLmxhc3RuYW1lfSBvbiAke2RhdGFDb250ZXh0LnBhZ2VDb250ZXh0LnBhZ2VUaXRsZX0gY29udGV4dCAke0pTT04uc3RyaW5naWZ5KGRhdGFDb250ZXh0KX1cIixcbiAgcmFpc2VTdXBwb3J0VGlja2V0U2hhcmVkb0NvbW1hbmQ6IERFRkFVTFRfU0hBUkVET19DT01NQU5ELFxuICBkYXRhQ29udGV4dDogXCJQb3B1bGF0ZWQgYnkgdGhlIHN5c3RlbVwiLFxuICB0aXRsZTogXCJSYWlzZSBTdXBwb3J0IFRpY2tldFwiLFxuICBzdHlsZVJ1bGVzOiB1bmRlZmluZWQsXG4gIGNsYXNzUnVsZXM6IHVuZGVmaW5lZCxcbiAgdG9vbFRpcDogXCJSYWlzZSBhIHN1cHBvcnQgdGlja2V0IHdpdGggdGhlIHN1cHBvcnQgZGVza1wiLFxuICBlbmFibGVkOiBmYWxzZVxufTtcblxuXG5cbmV4cG9ydCBjb25zdCBSRUZSRVNIX09OX0RFRkFVTFRTOiBJUmVmcmVzaE9uID0ge1xuICBzaGFyZWRvSWRDaGFuZ2VkOiBmYWxzZSxcbiAgc2hhcmVkb1BhcmVudElkQ2hhbmdlZDogZmFsc2UsXG4gIHNoYXJlZG9QaGFzZUNoYW5nZWQ6IGZhbHNlLFxufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRVJST1JfTUFOQUdFTUVOVF9UUkFQUzogSUVycm9yVHJhcFtdID0gW1xuICB7XG4gICAgZGF0YUNvbnRleHQ6IG51bGwsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBydWxlOiBcImRhdGFDb250ZXh0LmVycm9yLm1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnZm9yYmlkZGVuJylcIixcbiAgICB1c2VyRnJlaW5kbHlNZXNzYWdlOiBcIlRoZSBtYXR0ZXIgaXMgbm90IGFjY2Vzc2libGUgdG8geW91LiBJdCBtYXkgYmUgYmVoaW5kIGEgSW5mb3JtYXRpb24gQmFycmllci5cIixcbiAgICByZXNvbHV0aW9uU3VnZ2VzdGlvbnM6IFtcIlBsZWFzZSBjb250YWN0IHRoZSBtYXR0ZXIgb3duZXIgZm9yIGFjY2Vzcy5cIl0sXG4gICAgdXNlckZyZWluZGx5SFRNTE1lc3NhZ2VUZW1wbGF0ZTogdW5kZWZpbmVkLFxuICAgIHN1cHBvcnRCdXR0b246IERFRkFVTFRfU1VQUE9SVF9CVVRUT04sXG4gICAgc3R5bGVSdWxlczogW1xuICAgICAge1xuICAgICAgICBydWxlOiBcInRydWVcIixcbiAgICAgICAgc3R5bGU6IFwiYm94LXNoYWRvdzogMXB4IDFweCAxMHB4ICNkNDYwNjA7XCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgY2xhc3NSdWxlczogW1xuICAgICAge1xuICAgICAgICBydWxlOiBcInRydWVcIixcbiAgICAgICAgY3NzQ2xhc3M6IFwiZW1zLXNlbGVjdGVkLWl0ZW1cIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJ1bGU6IFwidHJ1ZVwiLFxuICAgICAgICBjc3NDbGFzczogXCJlbXMtc2hvd1wiLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXTtcblxuLy9jbGFzc1J1bGVzOiBlbXMtc2VsZWN0ZWQtaXRlbSBlbXMtc2hvdycgc3R5bGU9J2JveC1zaGFkb3c6IDFweCAxcHggMTBweCAjZDQ2MDYwOycsXG4vL1xuLy9cIlN1cHBvcnQgUmVxdWlyZWQgZm9yICR7ZGF0YUNvbnRleHQucGFnZUNvbnRleHQudXNlci5maXJzdG5hbWV9ICR7ZGF0YUNvbnRleHQucGFnZUNvbnRleHQudXNlci5sYXN0bmFtZX0gb24gJHtkYXRhQ29udGV4dC5wYWdlQ29udGV4dC5wYWdlVGl0bGV9XCJcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRVJST1JfTUFOQUdFTUVOVF9TRVRUSU5HUzogSUVycm9yTWFuYWdlbWVudCA9IHtcbiAgZXJyb3JUcmFwczogREVGQVVMVF9FUlJPUl9NQU5BR0VNRU5UX1RSQVBTLFxuICBlbmFibGVkOiB0cnVlLFxuICBkaXNwbGF5VW5UcmFwcGVkRXJyb3JJbkFzcGVjdDogdHJ1ZSxcbiAgdW5UcmFwcGVkRXJyb3JzU3VwcG9ydEJ1dHRvbjogdW5kZWZpbmVkLFxufTsgXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJR1VSQVRJT05fU0VUVElOR1M6IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWc8dW5rbm93bj4gPVxuICB7XG4gICAgZGVidWc6IERFQlVHX0RFRkFVTFQoKSxcbiAgICByZWZyZXNoT246IFJFRlJFU0hfT05fREVGQVVMVFMsIFxuICAgIGV2ZW50c1RvUmVhY3RUbzogW1xuICAgICAge1xuICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby51cGRhdGVkXCIsXG4gICAgICAgIG1ldGhvZFRvQ2FsbDogXCJyZWZyZXNoXCIsXG4gICAgICB9LFxuXG4gICAgICB7XG4gICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLmNvcmUuY2FzZS5zaGFyZWRvLXVwZGF0ZWRcIixcbiAgICAgICAgbWV0aG9kVG9DYWxsOiBcInJlZnJlc2hcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBkYXRhU2V0dGluZ3M6IHtcbiAgICAgIGdldFZhbHVlVXNpbmdQYXJlbnRzOiBmYWxzZSxcbiAgICAgIG1heERlcHRoOiAwLFxuICAgIH0sXG4gICAgZXJyb3JNYW5hZ2VtZW50OiBERUZBVUxUX0VSUk9SX01BTkFHRU1FTlRfU0VUVElOR1MsXG4gIH07XG4iLCJpbXBvcnQgKiBhcyBrbyBmcm9tICdrbm9ja291dCc7XG5pbXBvcnQgeyBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCB0eXBlIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD4gPSB7XG4gICAgW0sgaW4ga2V5b2YgVF0gICAgICA6IFRbS10gZXh0ZW5kcyBBcnJheTxpbmZlciBVPiA/IGtvLk9ic2VydmFibGVBcnJheTxOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFU+PiA6XG4gICAgVFtLXSBleHRlbmRzIG9iamVjdCA/IGtvLk9ic2VydmFibGU8TmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUW0tdPj4gOiBrby5PYnNlcnZhYmxlPFRbS10+O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvT2JzZXJ2YWJsZU9iamVjdDxUPihvYmo6IFQsIGV4aXN0aW5nPzogTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxUPik6IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8VD4ge1xuICAgIFxuICAgIGlmKCFleGlzdGluZykgZXhpc3RpbmcgPSB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+O1xuICAgXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmIGtleSAhPT0gXCJfX2tvX21hcHBpbmdfX1wiICYmIGtleSAhPT0gXCJfaG9zdFwiKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXkgYXMga2V5b2YgVF07XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3Rpbmdba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldID0ga28ub2JzZXJ2YWJsZUFycmF5KHZhbHVlLm1hcChpdGVtID0+IHRvT2JzZXJ2YWJsZU9iamVjdChpdGVtLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiBpdGVtPikpKSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3Rpbmdba2V5XT1lbnN1cmVJc09ic2VydmFibGVBcnJheShleGlzdGluZywga2V5KVxuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1trZXldKHZhbHVlLm1hcChpdGVtID0+IHRvT2JzZXJ2YWJsZU9iamVjdChpdGVtLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiBpdGVtPikpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0aW5nW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSA9IGtvLm9ic2VydmFibGUodG9PYnNlcnZhYmxlT2JqZWN0KHZhbHVlLCB7fSBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PHR5cGVvZiB2YWx1ZT4pKSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3Rpbmdba2V5XSAgPSBlbnN1cmVJc09ic2VydmFibGUoZXhpc3RpbmcsIGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nW2tleV0odG9PYnNlcnZhYmxlT2JqZWN0KCh2YWx1ZSBhcyBhbnkpLCAoZXhpc3Rpbmdba2V5XSgpIGFzIGFueSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghZXhpc3Rpbmdba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAoZXhpc3Rpbmdba2V5XSBhcyBhbnkpID0ga28ub2JzZXJ2YWJsZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3Rpbmdba2V5XSA9IGVuc3VyZUlzT2JzZXJ2YWJsZShleGlzdGluZywga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3Rpbmdba2V5XSgodmFsdWUgYXMgYW55KSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBleGlzdGluZyBhcyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0PFQ+O1xufVxuZXhwb3J0IGludGVyZmFjZSBJRGVidWcge1xuICAgIHN1cHBvcnRSZXF1ZXN0RW5hYmxlZD86IGJvb2xlYW47XG4gICAgICBlbmFibGVkOiBib29sZWFuO1xuICAgICAgbG9nVG9Db25zb2xlOiBib29sZWFuO1xuICAgICAgc2hvd0luQXNwZWN0OiBib29sZWFuO1xuICAgICAgbGl2ZUNvbmZpZz86IGJvb2xlYW47XG4gICAgfVxuICBcblxuXG5mdW5jdGlvbiBlbnN1cmVJc09ic2VydmFibGUoZXhpc3Rpbmc6IGFueSwga2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlKGV4aXN0aW5nW2tleV0pKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1trZXldIDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBrby5vYnNlcnZhYmxlKCk7XG4gICAgfVxufVxuXG5cblxuZnVuY3Rpb24gZW5zdXJlSXNPYnNlcnZhYmxlQXJyYXkoZXhpc3Rpbmc6IGFueSwga2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoa28uaXNPYnNlcnZhYmxlQXJyYXkoZXhpc3Rpbmdba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nW2tleV0gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtvLm9ic2VydmFibGVBcnJheSgpO1xuICAgIH1cbn1cblxuLy8gZXhwb3J0IHR5cGUgSV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBUQ29uZmlnICYge1xuLy8gICAgIGRlYnVnOiBJRGVidWc7XG4vLyAgIH1cblxuLy8gZXhwb3J0IHR5cGUgT2JzZXJ2YWJsZUNvbmZpZ3VyYXRpb25PcHRpb25zPFRDb25maWc+ID0gXG4vLyB7IFtLIGluIGtleW9mIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPl06IGtvLk9ic2VydmFibGU8SUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+W0tdPjsgfVxuXG4vLyBleHBvcnQgaW50ZXJmYWNlIElDb25maWd1cmF0aW9uSG9zdCB7XG4vLyAgICAgX2hvc3Q6IHtcbi8vICAgICAgICAgYmxhZGU6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uQWRkRWRpdFNoYXJlZG87XG4vLyAgICAgICAgIGVuYWJsZWQ6IGtvLk9ic2VydmFibGU8Ym9vbGVhbj47IC8vIFVzaW5nICdhbnknIGZvciByZXR1cm4gdHlwZSBhcyBpdCdzIG5vdCBjbGVhciB3aGF0IHRoZXNlIGZ1bmN0aW9ucyByZXR1cm5cbi8vICAgICAgICAgbW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG87XG4vLyAgICAgfVxuLy8gfVxuXG4vLyBleHBvcnQgdHlwZSBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBJQ29uZmlndXJhdGlvbkhvc3QgJiBJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxUQ29uZmlnPjtcblxuLy8gaW50ZXJmYWNlIFJvb3RPYmplY3Qge1xuLy8gICBsMTogc3RyaW5nO1xuLy8gICBvMTogTzE7XG4vLyB9XG5cbi8vIGludGVyZmFjZSBPMSB7XG4vLyAgIGwyOiBzdHJpbmc7XG4vLyAgIG8yOiBPMjtcbi8vICAgYTE6IEExW107XG4vLyB9XG5cbi8vIGludGVyZmFjZSBBMSB7XG4vLyAgIGw0OiBzdHJpbmc7XG4vLyB9XG5cbi8vIGludGVyZmFjZSBPMiB7XG4vLyAgIGwzOiBzdHJpbmc7XG4vLyB9XG4vLyAvLyBOb3cgbGV0J3MgdXNlIHRoZSBmdW5jdGlvbjpcbi8vIGNvbnN0IHg6IElfSURFX0FzcGVjdF9Nb2RlbGxlcl9Db25maWd1cmF0aW9uPFJvb3RPYmplY3Q+ID0ge1xuLy8gICAgIGwxOiBcImwxXCIsXG4vLyAgICAgbzE6IHtcbi8vICAgICAgICAgbDI6XCJsMlwiLFxuLy8gICAgICAgICBvMjoge1xuLy8gICAgICAgICAgICAgbDM6IFwibDNcIixcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgYTE6IFtcbi8vICAgICAgICAgICAgIHsgbDQ6IFwibDRcIiB9XG4vLyAgICAgICAgIF1cbi8vICAgICB9LFxuLy8gICAgIGRlYnVnOlxuLy8gICAgIHtcbi8vICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4vLyAgICAgICAgIGxvZ1RvQ29uc29sZTogZmFsc2UsXG4vLyAgICAgICAgIHNob3dJbkFzcGVjdDogZmFsc2Vcbi8vICAgICB9XG4vLyB9XG5cbi8vIGxldCBtIDogIE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SV9JREVfQXNwZWN0X01vZGVsbGVyX0NvbmZpZ3VyYXRpb248Um9vdE9iamVjdD4+XG5cbi8vIGxldCB5ID0gdG9PYnNlcnZhYmxlT2JqZWN0KHgse30gYXMgYW55KSBhcyAgTmVzdGVkT2JzZXJ2YWJsZU9iamVjdDxJX0lERV9Bc3BlY3RfTW9kZWxsZXJfQ29uZmlndXJhdGlvbjxSb290T2JqZWN0Pj5cblxuLy8gbGV0IHAgPSB5LmRlYnVnKCkubGl2ZUNvbmZpZyEoKVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlT2JqZWN0KG9iajogYW55LCBleGlzdGluZ09ic2VydmFibGVzPzprby5PYnNlcnZhYmxlPGFueT4pOiBrby5PYnNlcnZhYmxlIHtcbi8vICAgICBjb25zdCByZXN1bHQgPSBleGlzdGluZ09ic2VydmFibGVzIHx8IHt9IGFzIGtvLk9ic2VydmFibGU7XG5cbi8vICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbi8vICAgICAgICAgaWYoa2V5ID09PSBcIl9fa29fbWFwcGluZ19fXCIpIGNvbnRpbnVlO1xuLy8gICAgICAgICBpZihrZXkgPT09IFwiX2hvc3RcIikgY29udGludWU7XG5cbi8vICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbi8vICAgICAgICAgICAgIGxldCBuZXd2ID0gb2JqW2tleV07XG4vLyAgICAgICAgICAgICBsZXQgY3VyciA9IChyZXN1bHQgYXMgYW55KVtrZXldIDtcblxuLy8gICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG5ld3YpICYmIHR5cGVvZiBuZXd2ID09PSBcIm9iamVjdFwiICYmIG5ld3YgIT09IG51bGwgJiYgIWtvLmlzT2JzZXJ2YWJsZShuZXd2KSkge1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldID0gdG9PYnNlcnZhYmxlT2JqZWN0KG5ld3YgYXMgb2JqZWN0KSBcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRvT2JzZXJ2YWJsZU9iamVjdFwiLCAocmVzdWx0IGFzIGFueSlba2V5XSk7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSBrby5vYnNlcnZhYmxlKChyZXN1bHQgYXMgYW55KVtrZXldKTtcbi8vICAgICAgICAgICAgICAgICBjb250aW51ZTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmV3dikpIHtcbi8vICAgICAgICAgICAgICAgICBpZiAoY3VyciAmJiBrby5pc09ic2VydmFibGVBcnJheShjdXJyKSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XShuZXd2KTtcbi8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgICAgICAocmVzdWx0IGFzIGFueSlba2V5XSA9IGtvLm9ic2VydmFibGVBcnJheShuZXd2KSBhcyBhbnk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICBpZiAoa28uaXNPYnNlcnZhYmxlKG5ld3YpKSB7XG4vLyAgICAgICAgICAgICAgICAgbmV3diA9IG5ld3YoKTsgLy8gcHVsbCBvdXQgdGhlIHZhbHVlXG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIGlmIChjdXJyICYmIGtvLmlzT2JzZXJ2YWJsZShjdXJyKSkge1xuLy8gICAgICAgICAgICAgICAgIChyZXN1bHQgYXMgYW55KVtrZXldKG5ld3YpOyAvLyB1cGRhdGUgdGhlIGV4aXN0aW5nIG9ic2VydmFibGVcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgKHJlc3VsdCBhcyBhbnkpW2tleV0gPSBrby5vYnNlcnZhYmxlKG5ld3YpO1xuICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuXG4vLyAgICAgcmV0dXJuIHJlc3VsdDtcbi8vIH1cbiIsImltcG9ydCB7IERFQlVHX0RFRkFVTFQsIERFRkFVTFRfRVJST1JfTUFOQUdFTUVOVF9TRVRUSU5HUyB9IGZyb20gXCIuLi9CYXNlQ2xhc3Nlcy9EZWZhdWx0U2V0dGluZ3NcIjtcbmltcG9ydCB7IElEZWZhdWx0U2V0dGluZ3NXaXRoU3BlY2lmaWNDb21wb25lbnRDb25maWcsIElXaWRnZXRKc29uIH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0ludGVyZmFjZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uIHtcbiAgICBmaWVsZFBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICB0aXRsZTogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbFxuICAgIHZhbHVlT25Ob3RGb3VuZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGNhbGN1bGF0ZWRWYWx1ZTogc3RyaW5nO1xuICAgIGNhbGN1bGF0ZWRUaXRsZTogc3RyaW5nO1xuICAgIGZvcm1hdHRlcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxufVxuXG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0OiBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnPElTaW5nbGVWYWx1ZUFzcGVjdENvbmZpZ3VyYXRpb24+ID0ge1xuIFxuICAgIGZpZWxkUGF0aDogXCJ0aXRsZVwiLFxuICAgIHRpdGxlOiBudWxsLFxuICAgIGNhbGN1bGF0ZWRWYWx1ZTogXCJcIixcbiAgICBjYWxjdWxhdGVkVGl0bGU6IFwiXCIsXG4gICAgdmFsdWVPbk5vdEZvdW5kOiBcIk5vdCBGb3VuZFwiLFxuICAgIGZvcm1hdHRlcjogXCJ2YWx1ZVwiLC8vaWYocHJpb3JpdHkubmFtZSA9PT0gJ25vcm1hbCcpIHsgICAgICAgICByZXR1cm4gPSAnPHNwYW4gY2xhc3M9XCJub3JtYWxcIj5Ob3JtYWwgUHJpb3JpdHk8L3NwYW4+JzsgICAgIH0gZWxzZSBpZihwcmlvcml0eS5uYW1lID09PSAnaGlnaCcpIHsgICAgICAgICByZXR1cm4gPSAnPHNwYW4gY2xhc3M9XCJoaWdoXCI+SGlnaCBQcmlvcml0eTwvc3Bhbj4nOyAgICAgfSBlbHNlIGlmKHByaW9yaXR5Lm5hbWUgPT09ICd1cmdlbnQnKSB7ICAgICAgICAgcmV0dXJuID0gJzxzcGFuIGNsYXNzPVwidXJnZW50XCI+VXJnZW50IFByaW9yaXR5PC9zcGFuPic7ICAgICB9IGVsc2UgeyAgICAgICAgIHJldHVybiA9ICc8c3Bhbj5Vbmtub3duIFByaW9yaXR5PC9zcGFuPic7ICAgICB9XG4gICAgZGVidWc6IERFQlVHX0RFRkFVTFQoKSxcbiAgICBcbiAgICBldmVudHNUb1JlYWN0VG86IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZXZlbnRQYXRoOiBcInNoYXJlZG8uY29yZS5jYXNlLnBoYXNlLWNoYW5nZWRcIixcbiAgICAgICAgICAgIG1ldGhvZFRvQ2FsbDogXCJsb2FkQW5kQmluZFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50UGF0aDogXCJzaGFyZWRvLmNvcmUuY2FzZS5mb3Jtcy5waGFzZS5waGFzZS1jaGFuZ2VkXCIsXG4gICAgICAgICAgICBtZXRob2RUb0NhbGw6IFwibG9hZEFuZEJpbmRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby51cGRhdGVkXCIsXG4gICAgICAgICAgICBtZXRob2RUb0NhbGw6IFwibG9hZEFuZEJpbmRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBldmVudFBhdGg6IFwic2hhcmVkby5jb3JlLmNhc2Uuc2hhcmVkby11cGRhdGVkXCIsXG4gICAgICAgICAgICBtZXRob2RUb0NhbGw6IFwibG9hZEFuZEJpbmRcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICByZWZyZXNoT246IHtcbiAgICAgICAgc2hhcmVkb0lkQ2hhbmdlZDogdHJ1ZSxcbiAgICAgICAgc2hhcmVkb1BhcmVudElkQ2hhbmdlZDogdHJ1ZSxcbiAgICAgICAgc2hhcmVkb1BoYXNlQ2hhbmdlZDogdHJ1ZSxcbiAgICB9LFxuICAgIGRhdGFTZXR0aW5nczoge1xuICAgICAgICBnZXRWYWx1ZVVzaW5nUGFyZW50czogZmFsc2UsXG4gICAgICAgIG1heERlcHRoOiAwLFxuICAgIH0sXG4gICAgZXJyb3JNYW5hZ2VtZW50OiBERUZBVUxUX0VSUk9SX01BTkFHRU1FTlRfU0VUVElOR1MsXG5cblxufVxuXG5leHBvcnQgY29uc3QgV2lkZ2V0U2V0dGluZ3MgOiBJV2lkZ2V0SnNvbjxJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uPiA9e1xuICAgIHR5cGU6IFwid2lkZ2V0XCIsXG4gICAgXCJwcmlvcml0eVwiOiA2MDAwLFxuICAgIFwiZGVzaWduZXJcIjoge1xuICAgICAgICBcImFsbG93SW5Qb3J0YWxEZXNpZ25lclwiOiBmYWxzZSxcbiAgICAgICAgXCJhbGxvd0luU2hhcmVkb1BvcnRhbERlc2lnbmVyXCI6IHRydWUsXG4gICAgICAgIFwiYWxsb3dBc3BlY3RBZGFwdGVyXCI6IHRydWUsXG4gICAgICAgIFwidGl0bGVcIjogXCJTaW5nbGUgVmFsdWUgQXNwZWN0XCIsXG4gICAgICAgIFwiaWNvblwiOiBcImZhLWNvZ1wiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiU2luZ2xlIFZhbHVlIEFzcGVjdFwiLFxuICAgICAgICBcImNhdGVnb3JpZXNcIjogWyAgIFwiVUQgLSBJREVBc3BlY3RzXCJdLFxuICAgICAgICBcImlzQ29uZmlndXJhYmxlXCI6IHRydWUsXG4gICAgICAgIFwiY29uZmlndXJhdGlvbldpZGdldFwiOiBudWxsLFxuICAgICAgICBcImRlZmF1bHRDb25maWd1cmF0aW9uSnNvblwiOiB7IGNvbmZpZ3VyYXRpb246IERlZmF1bHR9XG4gICAgfSxcbiAgICBcInNjcmlwdHNcIjogW1xuICAgIF0sXG4gICAgXCJzdHlsZXNcIjogW1xuICAgICAgICBcIlNpbmdsZVZhbHVlQXNwZWN0LmNzc1wiXG4gICAgXSxcbiAgICBcInRlbXBsYXRlc1wiOiBbXG4gICAgICAgIFwiU2luZ2xlVmFsdWVBc3BlY3QuaHRtbFwiXG4gICAgXSxcbiAgICBcIm1lbnVUZW1wbGF0ZXNcIjogW10sXG4gICAgXCJjb21wb25lbnRzXCI6IFtdXG59IiwiaW1wb3J0IHsgSVdpZGdldEpzb24gfSBmcm9tIFwiLi4vLi4vSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9JbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBJU2luZ2xlVmFsdWVBc3BlY3RDb25maWd1cmF0aW9uLCBEZWZhdWx0IH0gZnJvbSBcIi4uLy4uL0lERUFzcGVjdHMvU2luZ2xlVmFsdWVBc3BlY3QvU2luZ2xlVmFsdWVBc3BlY3RDb25maWdcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJU2luZ2xlVmFsdWVQb3J0YWxDb25maWd1cmF0aW9uIGV4dGVuZHMgSVNpbmdsZVZhbHVlQXNwZWN0Q29uZmlndXJhdGlvbiB7XG4gICAgXG59XG5cbmV4cG9ydCBjb25zdCBTaW5nbGVWYWx1ZVBvcnRhbERlZmF1bHQgPSBEZWZhdWx0O1xuXG5leHBvcnQgY29uc3QgV2lkZ2V0U2V0dGluZ3MgOiBJV2lkZ2V0SnNvbjxJU2luZ2xlVmFsdWVQb3J0YWxDb25maWd1cmF0aW9uPiA9e1xuICAgIHR5cGU6IFwid2lkZ2V0XCIsXG4gICAgXCJwcmlvcml0eVwiOiA2MDAwLFxuICAgIFwiZGVzaWduZXJcIjoge1xuICAgICAgICBcImFsbG93SW5Qb3J0YWxEZXNpZ25lclwiOiB0cnVlLFxuICAgICAgICBcImFsbG93SW5TaGFyZWRvUG9ydGFsRGVzaWduZXJcIjogdHJ1ZSxcbiAgICAgICAgXCJhbGxvd0FzcGVjdEFkYXB0ZXJcIjogZmFsc2UsXG4gICAgICAgIFwidGl0bGVcIjogXCJTaW5nbGUgVmFsdWUgUG9ydGFsIFdpZGdldFwiLFxuICAgICAgICBcImljb25cIjogXCJmYS1jb2dcIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlNob3cgYSBzaW5nbGUgdmFsdWUgaW4gYSBwb3J0YWwgd2lkZ2V0XCIsXG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbICAgXCJVRCAtIElERUFzcGVjdHNcIl0sXG4gICAgICAgIFwiaXNDb25maWd1cmFibGVcIjogdHJ1ZSxcbiAgICAgICAgXCJjb25maWd1cmF0aW9uV2lkZ2V0XCI6IFwiUG9ydGFsV2lkZ2V0cy5TaW5nbGVWYWx1ZVBvcnRhbFdpZGdldERlc2lnbmVyXCIsXG4gICAgICAgIFwiZGVmYXVsdENvbmZpZ3VyYXRpb25Kc29uXCI6IHsgY29uZmlndXJhdGlvbjogRGVmYXVsdH1cbiAgICB9LFxuICAgIFwic2NyaXB0c1wiOiBbXG4gICAgXSxcbiAgICBcInN0eWxlc1wiOiBbXG4gICAgICAgIFwiU2luZ2xlVmFsdWVQb3J0YWxXaWRnZXQuY3NzXCJcbiAgICBdLFxuICAgIFwidGVtcGxhdGVzXCI6IFtcbiAgICAgICAgXCJTaW5nbGVWYWx1ZVBvcnRhbFdpZGdldC5odG1sXCJcbiAgICBdLFxuICAgIFwibWVudVRlbXBsYXRlc1wiOiBbXSxcbiAgICBcImNvbXBvbmVudHNcIjogW11cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTsiLCJtb2R1bGUuZXhwb3J0cyA9IGtvOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcclxuaW1wb3J0ICogYXMgJCBmcm9tIFwianF1ZXJ5XCI7XHJcbmltcG9ydCB7IElTaW5nbGVWYWx1ZVBvcnRhbENvbmZpZ3VyYXRpb24sIFNpbmdsZVZhbHVlUG9ydGFsRGVmYXVsdCB9IGZyb20gXCIuLi9TaW5nbGVWYWx1ZVBvcnRhbFdpZGdldENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBOZXN0ZWRPYnNlcnZhYmxlT2JqZWN0LCB0b09ic2VydmFibGVPYmplY3QgfSBmcm9tIFwiLi4vLi4vLi4vSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9LT0NvbnZlcnRlclwiO1xyXG5pbXBvcnQgeyBJRGVmYXVsdFNldHRpbmdzV2l0aFNwZWNpZmljQ29tcG9uZW50Q29uZmlnLCBJV2lkZ2V0Q29uZmlnU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vLi4vSURFQXNwZWN0cy9CYXNlQ2xhc3Nlcy9JbnRlcmZhY2VzXCI7XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFNpbmdsZVZhbHVlUG9ydGFsV2lkZ2V0RGVzaWduZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IGFueSwgYmFzZU1vZGVsOiBhbnkpOiBTaW5nbGVWYWx1ZVBvcnRhbFdpZGdldERlc2lnbmVyQ2xhc3Mge1xyXG4gICAgcmV0dXJuIG5ldyBTaW5nbGVWYWx1ZVBvcnRhbFdpZGdldERlc2lnbmVyQ2xhc3MoZWxlbWVudCwgY29uZmlndXJhdGlvbiwgYmFzZU1vZGVsKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTaW5nbGVWYWx1ZVBvcnRhbFdpZGdldERlc2lnbmVyQ2xhc3Mge1xyXG4gICAgbW9kZWw6IE5lc3RlZE9ic2VydmFibGVPYmplY3Q8SURlZmF1bHRTZXR0aW5nc1dpdGhTcGVjaWZpY0NvbXBvbmVudENvbmZpZzxJU2luZ2xlVmFsdWVQb3J0YWxDb25maWd1cmF0aW9uPj47XHJcbiAgICB2YWxpZGF0aW9uOiBhbnk7XHJcbiAgICB2YWxpZGF0aW9uRXJyb3JDb3VudDoga28uQ29tcHV0ZWQ8bnVtYmVyPjtcclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogSVdpZGdldENvbmZpZ1NldHRpbmdzPElTaW5nbGVWYWx1ZVBvcnRhbENvbmZpZ3VyYXRpb24+LCBiYXNlTW9kZWw6IGFueSkge1xyXG5cclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGRlZmF1bHRzID0gU2luZ2xlVmFsdWVQb3J0YWxEZWZhdWx0XHJcblxyXG4gICAgICAgIC8vIGNvbmZpZ3VyYXRpb24gPSBrby50b0pTKGNvbmZpZ3VyYXRpb24pO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgY29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgbGV0IG9ic2VydmFibGVPcHRpb25zID0gdG9PYnNlcnZhYmxlT2JqZWN0KG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIG1vZGVsXHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG9ic2VydmFibGVPcHRpb25zO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIG1vZGVsIHZhbGlkYXRvcnNcclxuICAgICAgICB0aGlzLnZhbGlkYXRpb24gPVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmllbGRQYXRoOiBrby5wdXJlQ29tcHV0ZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB0aGlzLm1vZGVsLmZpZWxkUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtZXNzYWdlKSByZXR1cm4gXCJUaGUgZmllbGRQYXRoIGlzIHJlcXVpcmVkXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gRXhwb3NlIGEgdmFsaWRhdGlvbkVycm9yQ291bnQgb2JzZXJ2YWJsZSB0byB0ZWxsIHRoZSBob3N0IGRlc2lnbmVyIGJsYWRlXHJcbiAgICAgICAgLy8gd2hldGhlciBzYXZlIGlzIGN1cnJlbnRseSBwb3NzaWJsZSBvciBub3QuIFJldHVybiAwIHRvIGluZGljYXRlIGFsbCBpcyB2YWxpZCxcclxuICAgICAgICAvLyBvciBpZiBub3QsIHRoZSBjb3VudCBvZiBlcnJvcnMuIElmIG5vIHZhbGlkYXRpb24gcmVxdWlyZWQsIHRoaXMgY2FuIGJlIHJlbW92ZWQuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JDb3VudCA9IGtvLnB1cmVDb21wdXRlZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBmYWlscyA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRpb24uZmllbGRQYXRoKCkpIGZhaWxzKys7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWlscztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0TW9kZWwoKTpJV2lkZ2V0Q29uZmlnU2V0dGluZ3M8SVNpbmdsZVZhbHVlUG9ydGFsQ29uZmlndXJhdGlvbj4ge1xyXG4gICAgICAgIGxldCByZXRWYWx1ZTpJV2lkZ2V0Q29uZmlnU2V0dGluZ3M8SVNpbmdsZVZhbHVlUG9ydGFsQ29uZmlndXJhdGlvbj4gPSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb246IGtvLnRvSlModGhpcy5tb2RlbCkgYXMgYW55XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXRWYWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgbG9hZEFuZEJpbmQoKSB7XHJcblxyXG4gICAgfTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8vIG5hbWVzcGFjZShcIlZpc3VhbGlzYXRpb24uV2lkZ2V0c1wiKTtcclxuXHJcbi8vIC8qKlxyXG4vLyAgKiBDb25zdHJ1Y3RvciBmb3IgeW91ciB3aWRnZXRcclxuLy8gICogQHBhcmFtIHt9IGVsZW1lbnQgICAgICAgICAgICBUaGUgSHRtbCBET00gZWxlbWVudCB0byB3aGljaCB0aGlzIHdpZGdldCB3aWxsIGJpbmRcclxuLy8gICogQHBhcmFtIHt9IGNvbmZpZ3VyYXRpb24gICAgICBUaGUgY29uZmlndXJhdGlvbiBwYXNzZWQgaW4gZnJvbSB0aGUgZGVzaWduZXIvY29uZmlnXHJcbi8vICAqIEBwYXJhbSB7fSBiYXNlTW9kZWwgICAgICAgICAgVGhlIGJhc2Ugd2lkZ2V0IG1vZGVsIChjb250YWlucyB1bmlxdWUgaWQgZXRjKVxyXG4vLyAgKiBAcmV0dXJucyB7fVxyXG4vLyAgKi9cclxuLy8gVmlzdWFsaXNhdGlvbi5XaWRnZXRzLlNpbmdsZVZhbHVlRGlzcGxheURlc2lnbmVyID0gZnVuY3Rpb24oZWxlbWVudCwgY29uZmlndXJhdGlvbiwgYmFzZU1vZGVsKVxyXG4vLyB7XHJcbi8vICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbi8vICAgICB2YXIgZGVmYXVsdHMgPVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIC8vIFRoZXNlIGNvbmZpZ3VyYXRpb25zIGFyZSBwYXNzZWQgZnJvbSB0aGUgaG9zdCBvZiB0aGlzIGRlc2lnbmVyIHdpZGdldFxyXG4vLyAgICAgICAgIGJsYWRlOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBibGFkZSBob3N0aW5nIHRoZSB3aWRnZXRcclxuLy8gICAgICAgICBfX3Njb3BlOlxyXG4vLyAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgbW9kZTogbnVsbCwgICAgICAgICAgICAgICAgICAgICAvLyBXaWxsIGJlIGdsb2JhbFBvcnRhbCBvciBzaGFyZWRvVHlwZVxyXG4vLyAgICAgICAgICAgICBzaGFyZWRvVHlwZVN5c3RlbU5hbWU6IG51bGwgICAgIC8vIElmIG1vZGU9PT1zaGFyZWRvVHlwZSwgY29udGFpbnMgdGhlIHR5cGUgYmVpbmcgZWRpdGVkXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICAvLyBZb3VyIGRlc2lnbmVyIG1vZGVsIGlzIGFsc28gcGFzc2VkIGluXHJcbi8vICAgICAgICAgZmllbGRQYXRoOiBudWxsXHJcbi8vICAgICB9O1xyXG4vLyAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIGNvbmZpZ3VyYXRpb24pO1xyXG5cclxuLy8gICAgIC8vIENyZWF0ZSB0aGUgbW9kZWxcclxuLy8gICAgIHRoaXMubW9kZWwgPVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIGZpZWxkUGF0aDoga28ub2JzZXJ2YWJsZShvcHRpb25zLmZpZWxkUGF0aClcclxuLy8gICAgIH07XHJcblxyXG4vLyAgICAgLy8gQ3JlYXRlIHRoZSBtb2RlbCB2YWxpZGF0b3JzXHJcbi8vICAgICB0aGlzLnZhbGlkYXRpb24gPVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIGZpZWxkUGF0aDoga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uKClcclxuLy8gICAgICAgICB7XHJcbi8vICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gdGhpcy5tb2RlbC5maWVsZFBhdGgoKTtcclxuLy8gICAgICAgICAgICAgaWYgKCFtZXNzYWdlKSByZXR1cm4gXCJUaGUgZmllbGRQYXRoIGlzIHJlcXVpcmVkXCI7XHJcbi8vICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4vLyAgICAgICAgIH0pXHJcbi8vICAgICB9O1xyXG5cclxuLy8gICAgIC8vIEV4cG9zZSBhIHZhbGlkYXRpb25FcnJvckNvdW50IG9ic2VydmFibGUgdG8gdGVsbCB0aGUgaG9zdCBkZXNpZ25lciBibGFkZVxyXG4vLyAgICAgLy8gd2hldGhlciBzYXZlIGlzIGN1cnJlbnRseSBwb3NzaWJsZSBvciBub3QuIFJldHVybiAwIHRvIGluZGljYXRlIGFsbCBpcyB2YWxpZCxcclxuLy8gICAgIC8vIG9yIGlmIG5vdCwgdGhlIGNvdW50IG9mIGVycm9ycy4gSWYgbm8gdmFsaWRhdGlvbiByZXF1aXJlZCwgdGhpcyBjYW4gYmUgcmVtb3ZlZC5cclxuLy8gICAgIHRoaXMudmFsaWRhdGlvbkVycm9yQ291bnQgPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24oKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIHZhciBmYWlscyA9IDA7XHJcbi8vICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGlvbi5maWVsZFBhdGgoKSkgZmFpbHMrKztcclxuLy8gICAgICAgICByZXR1cm4gZmFpbHM7XHJcbi8vICAgICB9KTtcclxuLy8gfTtcclxuXHJcbi8vIC8qKlxyXG4vLyAgKiBDYWxsZWQgYnkgdGhlIFVJIGZyYW1ld29yayB3aGVuIHRoaXMgd2lkZ2V0IGlzIGJlaW5nIHVubG9hZGVkIC0gY2xlYW4gdXBcclxuLy8gICogYW55IHN1YnNjcmlwdGlvbnMgb3IgcmVmZXJlbmNlcyBoZXJlIHRoYXQgd291bGQga2VlcCB0aGlzIGluc3RhbmNlIGFsaXZlXHJcbi8vICAqL1xyXG4vLyBWaXN1YWxpc2F0aW9uLldpZGdldHMuU2luZ2xlVmFsdWVEaXNwbGF5RGVzaWduZXIucHJvdG90eXBlLm9uRGVzdHJveSA9IGZ1bmN0aW9uKClcclxuLy8ge1xyXG4vLyAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4vLyB9O1xyXG5cclxuLy8gLyoqXHJcbi8vICAqIENhbGxlZCBieSB0aGUgVUkgZnJhbWV3b3JrIGFmdGVyIGluaXRpYWwgY3JlYXRpb24gYW5kIGJpbmRpbmcgdG8gbG9hZCBkYXRhXHJcbi8vICAqIGludG8gaXQncyBtb2RlbFxyXG4vLyAgKi9cclxuLy8gVmlzdWFsaXNhdGlvbi5XaWRnZXRzLlNpbmdsZVZhbHVlRGlzcGxheURlc2lnbmVyLnByb3RvdHlwZS5sb2FkQW5kQmluZCA9IGZ1bmN0aW9uKClcclxuLy8ge1xyXG4vLyAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4vLyB9O1xyXG5cclxuLy8gLyoqXHJcbi8vICAqIENhbGxlZCBieSB0aGUgd2lkZ2V0L3BvcnRhbCBlZGl0b3IgZnJhbWV3b3JrIHRvIGdldCB0aGUgY29uZmlndXJhdGlvbiBtb2RlbFxyXG4vLyAgKi9cclxuLy8gVmlzdWFsaXNhdGlvbi5XaWRnZXRzLlNpbmdsZVZhbHVlRGlzcGxheURlc2lnbmVyLnByb3RvdHlwZS5nZXRNb2RlbCA9IGZ1bmN0aW9uKClcclxuLy8ge1xyXG4vLyAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBmaWVsZFBhdGg6IHRoaXMubW9kZWwuZmllbGRQYXRoKClcclxuLy8gICAgIH07XHJcbi8vIH07XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=