/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "../../BaseClasses/Utility.ts":
/*!************************************!*\
  !*** ../../BaseClasses/Utility.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   camelize: () => (/* binding */ camelize),
/* harmony export */   cleanJSON: () => (/* binding */ cleanJSON)
/* harmony export */ });
function camelize(str) {
    if (!str)
        return str;
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}
function cleanJSON(rawData) {
    // Remove surrounding <p> tags, newline representations, and &nbsp;
    let cleanedString = rawData.replace(/^<p>|<\/p>|\/n|&nbsp;/g, '').trim();
    // Given that JSON keys should be wrapped in double quotes, but values could already contain them,
    // we'll use a regex to match the pattern of a key followed by a colon.
    let validJsonString = cleanedString.replace(/(?<!")(\b\w+\b)(?=:)/g, '"$1"');
    // The above will handle the JSON keys. Let's assume the values are already correctly formatted.
    // If they aren't, this can get a lot trickier.
    try {
        let jsonObject = JSON.parse(validJsonString);
        console.log(jsonObject);
        return JSON.stringify(jsonObject, null, 2);
    }
    catch (error) {
        console.error("Error parsing JSON:", error.message);
        return error.message;
    }
}


/***/ }),

/***/ "../../Common/DifferedPromise.ts":
/*!***************************************!*\
  !*** ../../Common/DifferedPromise.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeferredPromise: () => (/* binding */ DeferredPromise)
/* harmony export */ });
class DeferredPromise {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            // Type assertions here to satisfy TypeScript's strict checks.
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}


/***/ }),

/***/ "../Common/FormioBuilder.ts":
/*!**********************************!*\
  !*** ../Common/FormioBuilder.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createFormBuilderPage: () => (/* binding */ createFormBuilderPage)
/* harmony export */ });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Styling */ "../Common/Styling.ts");
/* harmony import */ var _Common_DifferedPromise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/DifferedPromise */ "../../Common/DifferedPromise.ts");


function createFormBuilderPage(element, schema) {
    //crerate a iframe using the html and insert it into the element
    (0,_Styling__WEBPACK_IMPORTED_MODULE_0__.checkLowdashCompatability)();
    const deferred = new _Common_DifferedPromise__WEBPACK_IMPORTED_MODULE_1__.DeferredPromise();
    //check if iframe already exists
    let iframe = element.querySelector("iframe");
    if (iframe) {
        element.removeChild(iframe);
    }
    iframe = document.createElement("iframe");
    iframe.setAttribute("src", "/_ideFiles/Widgets/FormWidget/FormIOBuilder/page.html");
    iframe.setAttribute("width", "100%");
    //get current window height
    let screenHeight = window.innerHeight - 200;
    iframe.setAttribute("height", screenHeight.toString());
    //monitor screen height and resize iframe
    window.addEventListener("resize", function () {
        let screenHeight = window.innerHeight - 200;
        if (!iframe) {
            return;
        }
        iframe.setAttribute("height", screenHeight.toString());
    });
    element.appendChild(iframe);
    iframe.onload = function () {
        if (!iframe) {
            return;
        }
        //deferred.resolve(iframe.contentWindow as any);
        render(iframe, schema, deferred);
    };
    return deferred;
}
function render(iframe, schema, deferred) {
    let formioId = "#formio";
    if (!iframe.contentWindow) {
        throw new Error("Could not find iframe.contentWindow");
    }
    let formioDiv = iframe.contentWindow.document.querySelector(formioId);
    if (!formioDiv) {
        throw new Error("Could not find element with id " + formioId);
    }
    // addDefaultFormIOStyleSheetsToIframe(iframe);
    // let fb=  new FormBuilder(formioDiv, undefined, undefined);
    // let formBuilder = (iframe.contentWindow as any)["formBuilder"] as FormBuilder;
    // (window as any)["FB"] = formBuilder;
    // (window as any)["formioDiv"] = formioDiv;
    // deferred.resolve(formBuilder);
    iframe.contentWindow.build(deferred, schema);
}


/***/ }),

/***/ "../Common/Styling.ts":
/*!****************************!*\
  !*** ../Common/Styling.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDefaultFormIOStyleSheetsToIframe: () => (/* binding */ addDefaultFormIOStyleSheetsToIframe),
/* harmony export */   addDefaultFormIOStyleSheetsToShadow: () => (/* binding */ addDefaultFormIOStyleSheetsToShadow),
/* harmony export */   checkLowdashCompatability: () => (/* binding */ checkLowdashCompatability)
/* harmony export */ });
function addDefaultFormIOStyleSheetsToShadow(shadow) {
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
    shadow.appendChild(link);
    link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://cdn.form.io/formiojs/formio.full.min.css";
    shadow.appendChild(link);
    //<link rel="stylesheet" type="text/css" href="https://cdn.form.io/formiojs/formio.full.min.css">
    //<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
    //<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
    link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";
    shadow.appendChild(link);
}
function addDefaultFormIOStyleSheetsToIframe(iframe) {
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
    iframe.contentDocument.head.appendChild(link);
    link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://cdn.form.io/formiojs/formio.full.min.css";
    iframe.contentDocument.head.appendChild(link);
    link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";
    iframe.contentDocument.head.appendChild(link);
}
function checkLowdashCompatability() {
    //lowdash 4 and above has changed contains to includes
    //here we are just aliasing it back to contains for backwards compatibility
    if (!_.contains) {
        console.log("!_.contains");
    }
    if (!_.findWhere) {
        console.log("!_.findWhere");
    }
}
if (!_.contains) {
    _.contains = _.includes;
}
if (!_.findWhere) {
    _.findWhere = _.find;
}


/***/ }),

/***/ "./designer/DefaultForm.ts":
/*!*********************************!*\
  !*** ./designer/DefaultForm.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_FORM: () => (/* binding */ DEFAULT_FORM)
/* harmony export */ });
const DEFAULT_FORM = { "_id": "64f09a1b26b9aefee64fa1de", "title": "Basic Elements", "name": "BasicElements", "path": "basicelements", "type": "form", "display": "form", "tags": [], "access": [{ "type": "read_all", "roles": ["64eff57f57da848e7393cc32", "64eff57f57da848e7393cc38", "64eff57f57da848e7393cc3e"] }], "submissionAccess": [], "owner": "64eff50f57da848e7393c75d", "components": [{ "label": "Text Field 1", "applyMaskOn": "change", "tableView": true, "key": "textField1", "type": "textfield", "input": true }, { "label": "Text Area 1", "applyMaskOn": "change", "autoExpand": false, "tableView": true, "key": "textArea1", "type": "textarea", "input": true }, { "label": "Number 1", "applyMaskOn": "change", "mask": false, "tableView": false, "delimiter": false, "requireDecimal": false, "inputFormat": "plain", "truncateMultipleSpaces": false, "key": "number1", "type": "number", "input": true }, { "label": "Password 1", "applyMaskOn": "change", "tableView": false, "key": "password1", "type": "password", "input": true, "protected": true }, { "label": "Checkbox 1", "tableView": false, "key": "checkbox1", "type": "checkbox", "input": true, "defaultValue": false }, { "type": "button", "label": "Submit", "key": "submit", "disableOnInvalid": true, "input": true, "tableView": false }], "settings": {}, "properties": {}, "project": "64eff57f57da848e7393cc2b", "controller": "", "revisions": "", "submissionRevisions": "", "_vid": 0, "created": "2023-08-31T13:48:11.835Z", "modified": "2023-08-31T13:48:11.844Z", "machineName": "saehwyndnftzzmk:BasicElements", "plan": "trial" };


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
/*!****************************************!*\
  !*** ./designer/FormWidgetDesigner.ts ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormWidgetDesigner: () => (/* binding */ FormWidgetDesigner),
/* harmony export */   FormWidgetDesignerClass: () => (/* binding */ FormWidgetDesignerClass)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseClasses_Utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../BaseClasses/Utility */ "../../BaseClasses/Utility.ts");
/* harmony import */ var _DefaultForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultForm */ "./designer/DefaultForm.ts");
/* harmony import */ var _Common_FormioBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Common/FormioBuilder */ "../Common/FormioBuilder.ts");




function FormWidgetDesigner(element, configuration, baseModel) {
    return new FormWidgetDesignerClass(element, configuration, baseModel);
}
class FormWidgetDesignerClass {
    constructor(element, configuration, baseModel) {
        var _a, _b;
        this.title = ((_b = (_a = configuration === null || configuration === void 0 ? void 0 : configuration.blade) === null || _a === void 0 ? void 0 : _a.model) === null || _b === void 0 ? void 0 : _b.title) || baseModel.title;
        this.element = element;
        const defaults = {
            formBuilderDefinition: JSON.stringify(_DefaultForm__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_FORM, null, 4),
            broadcastOnSubmit: true,
            broadcastOnSubmitEventName: `${baseModel.systemName}.${(0,_BaseClasses_Utility__WEBPACK_IMPORTED_MODULE_1__.camelize)(this.title())}.onSubmit`,
            createWorkTypeOnSubmit: false,
            workItem: JSON.stringify({
                sharedoTypeSystemName: "instruction-b2b-dispute-plaintiff",
                titleIsUserProvided: false,
                reference: null,
                referenecIsUserProvided: false
            }, null, 4),
            aspectData: JSON.stringify({
                instructionWorkTypeDetails: {
                    caseSharedoTypeSystemName: "wk-matter-dispute-plaintiff-recoveries",
                    caseWorkTypeId: 500000284,
                    jurisdictionId: "func:formBuilder.selectedLocation",
                },
                incidentDetailsLocation: {
                    IncidentLocationId: "func:formBuilder.address",
                    IncidentTypeId: "['street']"
                }
            }, null, 4),
            keyDates: JSON.stringify({
                "kd-instruction-received": new Date()
            }, null, 4),
            participants: JSON.stringify([
                {
                    roleSystemName: "client-case-handler",
                    odsReference: $ui.pageContext.user.username(),
                    odsType: "person",
                    odsId: $ui.pageContext.user.userid()
                },
            ], null, 4)
        };
        const options = $.extend(true, {}, defaults, configuration);
        this.formBuilderDefinition = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.formBuilderDefinition);
        console.log("options", options);
        this.model = {
            formBuilderDefinition: this.formBuilderDefinition,
            broadcastOnSubmit: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.broadcastOnSubmit),
            broadcastOnSubmitEventName: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.broadcastOnSubmitEventName),
            createWorkTypeOnSubmit: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.createWorkTypeOnSubmit),
            workItem: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.workItem),
            aspectData: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.aspectData),
            keyDates: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.keyDates),
            participants: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.participants)
        };
        this.title.subscribe((newValue) => {
            this.model.broadcastOnSubmitEventName(`${baseModel.systemName}.${(0,_BaseClasses_Utility__WEBPACK_IMPORTED_MODULE_1__.camelize)(newValue)}.onSubmit`);
        });
        this.validationErrorCount = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed(() => {
            return 0;
        });
    }
    onDestroy() {
        // ...
    }
    loadAndBind() {
        // ...
    }
    getModel() {
        var koModel = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this.model);
        return koModel;
    }
    onFocusOut(data, event) {
        let id = event.target.parentElement.id;
        let koObject = this.model[id];
        try {
            let newValue = JSON.stringify(JSON.parse(koObject()), null, 4);
            koObject(newValue);
        }
        catch (e) {
            console.log("error", e);
        }
    }
    ;
    checkComplex() {
        let id = "#formio-designer";
        let div = this.element.querySelector(id);
        if (!div) {
            throw new Error("Could not find element with id " + id);
        }
        (0,_Common_FormioBuilder__WEBPACK_IMPORTED_MODULE_3__.createFormBuilderPage)(div, this.formBuilderDefinition()).promise.then((formBuilder) => {
            this.formBuilder = formBuilder;
            window.formBuilder = formBuilder;
            formBuilder.instance.on('change', () => {
                this.formBuilderDefinition(JSON.stringify(formBuilder.instance.schema, null, 2));
            });
        });
        // window.open("http://127.0.0.1:5500/src/WebBased/Tester/FormIOBuilder/page.html", "_blank");
    }
}

})();

var __webpack_export_target__ = (Widgets = typeof Widgets === "undefined" ? {} : Widgets);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLEVBQUMsa0JBQWtCLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxjQUFjLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsZ0JBQWdCLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsWUFBWSxFQUFDLGFBQWEsRUFBQyxRQUFRLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsY0FBYyxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMs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QUMsQ0FBQztTQUUzRDtRQUNELDRFQUFxQixDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNqRixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUM5QixNQUFjLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUMxQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUNuQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsOEZBQThGO0lBR2xHLENBQUM7Q0FFSiIsInNvdXJjZXMiOlsid2VicGFjazovL1dpZGdldHMvLi4vLi4vQmFzZUNsYXNzZXMvVXRpbGl0eS50cyIsIndlYnBhY2s6Ly9XaWRnZXRzLy4uLy4uL0NvbW1vbi9EaWZmZXJlZFByb21pc2UudHMiLCJ3ZWJwYWNrOi8vV2lkZ2V0cy8uLi9Db21tb24vRm9ybWlvQnVpbGRlci50cyIsIndlYnBhY2s6Ly9XaWRnZXRzLy4uL0NvbW1vbi9TdHlsaW5nLnRzIiwid2VicGFjazovL1dpZGdldHMvLi9kZXNpZ25lci9EZWZhdWx0Rm9ybS50cyIsIndlYnBhY2s6Ly9XaWRnZXRzL2V4dGVybmFsIHZhciBcImtvXCIiLCJ3ZWJwYWNrOi8vV2lkZ2V0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9XaWRnZXRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL1dpZGdldHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1dpZGdldHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9XaWRnZXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vV2lkZ2V0cy8uL2Rlc2lnbmVyL0Zvcm1XaWRnZXREZXNpZ25lci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsaXplKHN0cjogc3RyaW5nKSB7XG4gIGlmICghc3RyKSByZXR1cm4gc3RyO1xuXG4gIHJldHVybiBzdHIucmVwbGFjZSgvKD86Xlxcd3xbQS1aXXxcXGJcXHcpL2csIGZ1bmN0aW9uICh3b3JkLCBpbmRleCkge1xuICAgIHJldHVybiBpbmRleCA9PT0gMCA/IHdvcmQudG9Mb3dlckNhc2UoKSA6IHdvcmQudG9VcHBlckNhc2UoKTtcbiAgfSkucmVwbGFjZSgvXFxzKy9nLCAnJyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuSlNPTihyYXdEYXRhOiBzdHJpbmcpIHtcblxuICAvLyBSZW1vdmUgc3Vycm91bmRpbmcgPHA+IHRhZ3MsIG5ld2xpbmUgcmVwcmVzZW50YXRpb25zLCBhbmQgJm5ic3A7XG4gIGxldCBjbGVhbmVkU3RyaW5nID0gcmF3RGF0YS5yZXBsYWNlKC9ePHA+fDxcXC9wPnxcXC9ufCZuYnNwOy9nLCAnJykudHJpbSgpO1xuXG4gIC8vIEdpdmVuIHRoYXQgSlNPTiBrZXlzIHNob3VsZCBiZSB3cmFwcGVkIGluIGRvdWJsZSBxdW90ZXMsIGJ1dCB2YWx1ZXMgY291bGQgYWxyZWFkeSBjb250YWluIHRoZW0sXG4gIC8vIHdlJ2xsIHVzZSBhIHJlZ2V4IHRvIG1hdGNoIHRoZSBwYXR0ZXJuIG9mIGEga2V5IGZvbGxvd2VkIGJ5IGEgY29sb24uXG4gIGxldCB2YWxpZEpzb25TdHJpbmcgPSBjbGVhbmVkU3RyaW5nLnJlcGxhY2UoLyg/PCFcIikoXFxiXFx3K1xcYikoPz06KS9nLCAnXCIkMVwiJyk7XG5cbiAgLy8gVGhlIGFib3ZlIHdpbGwgaGFuZGxlIHRoZSBKU09OIGtleXMuIExldCdzIGFzc3VtZSB0aGUgdmFsdWVzIGFyZSBhbHJlYWR5IGNvcnJlY3RseSBmb3JtYXR0ZWQuXG4gIC8vIElmIHRoZXkgYXJlbid0LCB0aGlzIGNhbiBnZXQgYSBsb3QgdHJpY2tpZXIuXG5cbiAgdHJ5IHtcbiAgICBsZXQganNvbk9iamVjdCA9IEpTT04ucGFyc2UodmFsaWRKc29uU3RyaW5nKTtcbiAgICBjb25zb2xlLmxvZyhqc29uT2JqZWN0KTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoanNvbk9iamVjdCwgbnVsbCwgMik7XG4gIH0gY2F0Y2ggKGVycm9yOmFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIEpTT046XCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgIHJldHVybiBlcnJvci5tZXNzYWdlO1xuICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgRGVmZXJyZWRQcm9taXNlPFQ+IHtcbiAgICBwcm9taXNlOiBQcm9taXNlPFQ+O1xuICAgIHJlc29sdmUhOiAodmFsdWU/OiBUIHwgUHJvbWlzZUxpa2U8VD4pID0+IHZvaWQ7XG4gICAgcmVqZWN0ITogKHJlYXNvbj86IGFueSkgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAvLyBUeXBlIGFzc2VydGlvbnMgaGVyZSB0byBzYXRpc2Z5IFR5cGVTY3JpcHQncyBzdHJpY3QgY2hlY2tzLlxuICAgICAgICAgICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZSBhcyBhbnk7XG4gICAgICAgICAgICB0aGlzLnJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tIFwiZm9ybWlvanNcIjtcbmltcG9ydCB7IGNoZWNrTG93ZGFzaENvbXBhdGFiaWxpdHkgfSBmcm9tIFwiLi9TdHlsaW5nXCI7XG5pbXBvcnQgeyBEZWZlcnJlZFByb21pc2UgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0RpZmZlcmVkUHJvbWlzZVwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb3JtQnVpbGRlclBhZ2UoZWxlbWVudDogRWxlbWVudCxzY2hlbWE6IHN0cmluZykgOiBEZWZlcnJlZFByb21pc2U8Rm9ybUJ1aWxkZXI+IHtcbiAgICAvL2NyZXJhdGUgYSBpZnJhbWUgdXNpbmcgdGhlIGh0bWwgYW5kIGluc2VydCBpdCBpbnRvIHRoZSBlbGVtZW50XG4gICAgY2hlY2tMb3dkYXNoQ29tcGF0YWJpbGl0eSgpO1xuXG4gICAgY29uc3QgZGVmZXJyZWQgPSBuZXcgRGVmZXJyZWRQcm9taXNlPEZvcm1CdWlsZGVyPigpO1xuXG4gICAgLy9jaGVjayBpZiBpZnJhbWUgYWxyZWFkeSBleGlzdHNcbiAgICBsZXQgaWZyYW1lID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaWZyYW1lXCIpO1xuICAgIGlmIChpZnJhbWUpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgIH1cbiBcblxuICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcIi9faWRlRmlsZXMvV2lkZ2V0cy9Gb3JtV2lkZ2V0L0Zvcm1JT0J1aWxkZXIvcGFnZS5odG1sXCIpO1xuXG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFwiMTAwJVwiKTtcblxuICAgIC8vZ2V0IGN1cnJlbnQgd2luZG93IGhlaWdodFxuICAgIGxldCBzY3JlZW5IZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMDA7XG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBzY3JlZW5IZWlnaHQudG9TdHJpbmcoKSk7XG5cbiAgICAvL21vbml0b3Igc2NyZWVuIGhlaWdodCBhbmQgcmVzaXplIGlmcmFtZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHNjcmVlbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDIwMDtcbiAgICAgICAgaWYgKCFpZnJhbWUpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgc2NyZWVuSGVpZ2h0LnRvU3RyaW5nKCkpO1xuICAgIH0pO1xuXG5cblxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcblxuXG4gICAgaWZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFpZnJhbWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgXG5cbiAgICAgICAgLy9kZWZlcnJlZC5yZXNvbHZlKGlmcmFtZS5jb250ZW50V2luZG93IGFzIGFueSk7XG4gICAgICAgIHJlbmRlcihpZnJhbWUsc2NoZW1hLGRlZmVycmVkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmZXJyZWQ7XG5cbn1cblxuZnVuY3Rpb24gcmVuZGVyKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQsc2NoZW1hOnN0cmluZyB8IHVuZGVmaW5lZCxkZWZlcnJlZCAgOiBEZWZlcnJlZFByb21pc2U8Rm9ybUJ1aWxkZXI+KSB7XG4gICAgbGV0IGZvcm1pb0lkID0gXCIjZm9ybWlvXCI7XG4gICAgaWYgKCFpZnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBpZnJhbWUuY29udGVudFdpbmRvd1wiKTtcbiAgICB9XG5cbiAgICBsZXQgZm9ybWlvRGl2ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihmb3JtaW9JZCk7XG5cbiAgICBpZiAoIWZvcm1pb0Rpdikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBlbGVtZW50IHdpdGggaWQgXCIgKyBmb3JtaW9JZCk7XG4gICAgfVxuICAgIC8vIGFkZERlZmF1bHRGb3JtSU9TdHlsZVNoZWV0c1RvSWZyYW1lKGlmcmFtZSk7XG5cbiAgIC8vIGxldCBmYj0gIG5ldyBGb3JtQnVpbGRlcihmb3JtaW9EaXYsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcblxuICAgIFxuICAgXG4gICAgLy8gbGV0IGZvcm1CdWlsZGVyID0gKGlmcmFtZS5jb250ZW50V2luZG93IGFzIGFueSlbXCJmb3JtQnVpbGRlclwiXSBhcyBGb3JtQnVpbGRlcjtcbiAgICAvLyAod2luZG93IGFzIGFueSlbXCJGQlwiXSA9IGZvcm1CdWlsZGVyO1xuICAgIC8vICh3aW5kb3cgYXMgYW55KVtcImZvcm1pb0RpdlwiXSA9IGZvcm1pb0RpdjtcbiAgICAvLyBkZWZlcnJlZC5yZXNvbHZlKGZvcm1CdWlsZGVyKTtcbiAgICBcblxuICAgIChpZnJhbWUuY29udGVudFdpbmRvdyBhcyBhbnkpLmJ1aWxkKGRlZmVycmVkLHNjaGVtYSk7XG59XG4iLCJcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZERlZmF1bHRGb3JtSU9TdHlsZVNoZWV0c1RvU2hhZG93KHNoYWRvdzogU2hhZG93Um9vdCkge1xuICAgIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIGxpbmsucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gICAgbGluay5ocmVmID0gXCJodHRwczovL3N0YWNrcGF0aC5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC80LjQuMS9jc3MvYm9vdHN0cmFwLm1pbi5jc3NcIjtcbiAgICBzaGFkb3cuYXBwZW5kQ2hpbGQobGluayk7XG5cbiAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIGxpbmsucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gICAgbGluay5ocmVmID0gXCJodHRwczovL2Nkbi5mb3JtLmlvL2Zvcm1pb2pzL2Zvcm1pby5mdWxsLm1pbi5jc3NcIjtcbiAgICBzaGFkb3cuYXBwZW5kQ2hpbGQobGluayk7XG5cblxuICAgICAvLzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG4uZm9ybS5pby9mb3JtaW9qcy9mb3JtaW8uZnVsbC5taW4uY3NzXCI+XG4gICAgIC8vPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2Jvb3RzdHJhcEA0LjYuMC9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzc1wiPlxuXG4gICAgIC8vPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNC43LjAvY3NzL2ZvbnQtYXdlc29tZS5jc3NcIj5cblxuICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICBsaW5rLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICAgICBsaW5rLmhyZWYgPSBcImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS80LjcuMC9jc3MvZm9udC1hd2Vzb21lLmNzc1wiO1xuICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgIFxuXG59XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRGVmYXVsdEZvcm1JT1N0eWxlU2hlZXRzVG9JZnJhbWUoaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCkge1xuICAgIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIGxpbmsucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gICAgbGluay5ocmVmID0gXCJodHRwczovL3N0YWNrcGF0aC5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC80LjQuMS9jc3MvYm9vdHN0cmFwLm1pbi5jc3NcIjtcbiAgICBpZnJhbWUuY29udGVudERvY3VtZW50IS5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuXG4gICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICBsaW5rLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICAgIGxpbmsuaHJlZiA9IFwiaHR0cHM6Ly9jZG4uZm9ybS5pby9mb3JtaW9qcy9mb3JtaW8uZnVsbC5taW4uY3NzXCI7XG4gICAgaWZyYW1lLmNvbnRlbnREb2N1bWVudCEuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcblxuXG4gICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICBsaW5rLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICAgIGxpbmsuaHJlZiA9IFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUuY3NzXCI7XG4gICAgaWZyYW1lLmNvbnRlbnREb2N1bWVudCEuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgXG5cbn1cblxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrTG93ZGFzaENvbXBhdGFiaWxpdHkoKSB7XG4gICAgLy9sb3dkYXNoIDQgYW5kIGFib3ZlIGhhcyBjaGFuZ2VkIGNvbnRhaW5zIHRvIGluY2x1ZGVzXG4gICAgLy9oZXJlIHdlIGFyZSBqdXN0IGFsaWFzaW5nIGl0IGJhY2sgdG8gY29udGFpbnMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgaWYoIV8uY29udGFpbnMpXG4gICAge1xuICAgICAgIGNvbnNvbGUubG9nKFwiIV8uY29udGFpbnNcIilcbiAgICB9XG5cbiAgICBpZighXy5maW5kV2hlcmUpXG4gICAge1xuICAgICAgICBjb25zb2xlLmxvZyhcIiFfLmZpbmRXaGVyZVwiKVxuICAgIH1cbn1cblxuaWYoIV8uY29udGFpbnMpXG57XG4gICAgXy5jb250YWlucyA9IF8uaW5jbHVkZXM7XG59XG5cbmlmKCFfLmZpbmRXaGVyZSlcbntcbiAgICBfLmZpbmRXaGVyZSA9IF8uZmluZDtcbn0iLCJleHBvcnQgY29uc3QgREVGQVVMVF9GT1JNID0gXG57XCJfaWRcIjpcIjY0ZjA5YTFiMjZiOWFlZmVlNjRmYTFkZVwiLFwidGl0bGVcIjpcIkJhc2ljIEVsZW1lbnRzXCIsXCJuYW1lXCI6XCJCYXNpY0VsZW1lbnRzXCIsXCJwYXRoXCI6XCJiYXNpY2VsZW1lbnRzXCIsXCJ0eXBlXCI6XCJmb3JtXCIsXCJkaXNwbGF5XCI6XCJmb3JtXCIsXCJ0YWdzXCI6W10sXCJhY2Nlc3NcIjpbe1widHlwZVwiOlwicmVhZF9hbGxcIixcInJvbGVzXCI6W1wiNjRlZmY1N2Y1N2RhODQ4ZTczOTNjYzMyXCIsXCI2NGVmZjU3ZjU3ZGE4NDhlNzM5M2NjMzhcIixcIjY0ZWZmNTdmNTdkYTg0OGU3MzkzY2MzZVwiXX1dLFwic3VibWlzc2lvbkFjY2Vzc1wiOltdLFwib3duZXJcIjpcIjY0ZWZmNTBmNTdkYTg0OGU3MzkzYzc1ZFwiLFwiY29tcG9uZW50c1wiOlt7XCJsYWJlbFwiOlwiVGV4dCBGaWVsZCAxXCIsXCJhcHBseU1hc2tPblwiOlwiY2hhbmdlXCIsXCJ0YWJsZVZpZXdcIjp0cnVlLFwia2V5XCI6XCJ0ZXh0RmllbGQxXCIsXCJ0eXBlXCI6XCJ0ZXh0ZmllbGRcIixcImlucHV0XCI6dHJ1ZX0se1wibGFiZWxcIjpcIlRleHQgQXJlYSAxXCIsXCJhcHBseU1hc2tPblwiOlwiY2hhbmdlXCIsXCJhdXRvRXhwYW5kXCI6ZmFsc2UsXCJ0YWJsZVZpZXdcIjp0cnVlLFwia2V5XCI6XCJ0ZXh0QXJlYTFcIixcInR5cGVcIjpcInRleHRhcmVhXCIsXCJpbnB1dFwiOnRydWV9LHtcImxhYmVsXCI6XCJOdW1iZXIgMVwiLFwiYXBwbHlNYXNrT25cIjpcImNoYW5nZVwiLFwibWFza1wiOmZhbHNlLFwidGFibGVWaWV3XCI6ZmFsc2UsXCJkZWxpbWl0ZXJcIjpmYWxzZSxcInJlcXVpcmVEZWNpbWFsXCI6ZmFsc2UsXCJpbnB1dEZvcm1hdFwiOlwicGxhaW5cIixcInRydW5jYXRlTXVsdGlwbGVTcGFjZXNcIjpmYWxzZSxcImtleVwiOlwibnVtYmVyMVwiLFwidHlwZVwiOlwibnVtYmVyXCIsXCJpbnB1dFwiOnRydWV9LHtcImxhYmVsXCI6XCJQYXNzd29yZCAxXCIsXCJhcHBseU1hc2tPblwiOlwiY2hhbmdlXCIsXCJ0YWJsZVZpZXdcIjpmYWxzZSxcImtleVwiOlwicGFzc3dvcmQxXCIsXCJ0eXBlXCI6XCJwYXNzd29yZFwiLFwiaW5wdXRcIjp0cnVlLFwicHJvdGVjdGVkXCI6dHJ1ZX0se1wibGFiZWxcIjpcIkNoZWNrYm94IDFcIixcInRhYmxlVmlld1wiOmZhbHNlLFwia2V5XCI6XCJjaGVja2JveDFcIixcInR5cGVcIjpcImNoZWNrYm94XCIsXCJpbnB1dFwiOnRydWUsXCJkZWZhdWx0VmFsdWVcIjpmYWxzZX0se1widHlwZVwiOlwiYnV0dG9uXCIsXCJsYWJlbFwiOlwiU3VibWl0XCIsXCJrZXlcIjpcInN1Ym1pdFwiLFwiZGlzYWJsZU9uSW52YWxpZFwiOnRydWUsXCJpbnB1dFwiOnRydWUsXCJ0YWJsZVZpZXdcIjpmYWxzZX1dLFwic2V0dGluZ3NcIjp7fSxcInByb3BlcnRpZXNcIjp7fSxcInByb2plY3RcIjpcIjY0ZWZmNTdmNTdkYTg0OGU3MzkzY2MyYlwiLFwiY29udHJvbGxlclwiOlwiXCIsXCJyZXZpc2lvbnNcIjpcIlwiLFwic3VibWlzc2lvblJldmlzaW9uc1wiOlwiXCIsXCJfdmlkXCI6MCxcImNyZWF0ZWRcIjpcIjIwMjMtMDgtMzFUMTM6NDg6MTEuODM1WlwiLFwibW9kaWZpZWRcIjpcIjIwMjMtMDgtMzFUMTM6NDg6MTEuODQ0WlwiLFwibWFjaGluZU5hbWVcIjpcInNhZWh3eW5kbmZ0enptazpCYXNpY0VsZW1lbnRzXCIsXCJwbGFuXCI6XCJ0cmlhbFwifVxuIiwibW9kdWxlLmV4cG9ydHMgPSBrbzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XHJcbmltcG9ydCB7IElXaWRnZXRCYXNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL1R5cGluZ3MvV2lkZ2V0cy9JV2lkZ2V0XCI7XHJcbmltcG9ydCB7IGNhbWVsaXplLCBjbGVhbkpTT04gfSBmcm9tIFwiLi4vLi4vLi4vQmFzZUNsYXNzZXMvVXRpbGl0eVwiO1xyXG5pbXBvcnQgeyBERUZBVUxUX0ZPUk0gfSBmcm9tIFwiLi9EZWZhdWx0Rm9ybVwiO1xyXG5pbXBvcnQgeyBUU2hhcmVEb0JsYWRlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL1R5cGluZ3MvU2hhcmVEb0pTL0FkZEVkaXRTaGFyZWRvXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUZvcm1CdWlsZGVyUGFnZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRm9ybWlvQnVpbGRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGb3JtV2lkZ2V0RGVzaWduZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IGFueSwgYmFzZU1vZGVsOiBhbnkpOiBGb3JtV2lkZ2V0RGVzaWduZXJDbGFzcyB7XHJcbiAgICByZXR1cm4gbmV3IEZvcm1XaWRnZXREZXNpZ25lckNsYXNzKGVsZW1lbnQsIGNvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1XaWRnZXRDb25maWd1cmF0aW9uIHtcclxuICAgIGZvcm1CdWlsZGVyRGVmaW5pdGlvbjogc3RyaW5nO1xyXG4gICAgYnJvYWRjYXN0T25TdWJtaXQ6IGJvb2xlYW47XHJcbiAgICBicm9hZGNhc3RPblN1Ym1pdEV2ZW50TmFtZTogc3RyaW5nO1xyXG4gICAgY3JlYXRlV29ya1R5cGVPblN1Ym1pdDogYm9vbGVhbjtcclxuICAgIHdvcmtJdGVtOiBzdHJpbmc7XHJcbiAgICBhc3BlY3REYXRhOiBzdHJpbmc7XHJcbiAgICBrZXlEYXRlczogc3RyaW5nO1xyXG4gICAgcGFydGljaXBhbnRzOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1XaWRnZXREZXNpZ25lck1vZGVsIHtcclxuICAgIGZvcm1CdWlsZGVyRGVmaW5pdGlvbjoga28uT2JzZXJ2YWJsZTxzdHJpbmc+XHJcbiAgICBicm9hZGNhc3RPblN1Ym1pdDoga28uT2JzZXJ2YWJsZTxib29sZWFuPlxyXG4gICAgYnJvYWRjYXN0T25TdWJtaXRFdmVudE5hbWU6IGtvLk9ic2VydmFibGU8c3RyaW5nPlxyXG4gICAgY3JlYXRlV29ya1R5cGVPblN1Ym1pdDoga28uT2JzZXJ2YWJsZTxib29sZWFuPlxyXG4gICAgd29ya0l0ZW06IGtvLk9ic2VydmFibGU8c3RyaW5nPlxyXG4gICAgYXNwZWN0RGF0YToga28uT2JzZXJ2YWJsZTxzdHJpbmc+XHJcbiAgICBrZXlEYXRlczoga28uT2JzZXJ2YWJsZTxzdHJpbmc+XHJcbiAgICBwYXJ0aWNpcGFudHM6IGtvLk9ic2VydmFibGU8c3RyaW5nPlxyXG5cclxufVxyXG5cclxuaW50ZXJmYWNlIENvbmZndXJhdGlvbkFuZEJsYWRlIGV4dGVuZHMgSUZvcm1XaWRnZXRDb25maWd1cmF0aW9uIHtcclxuICAgIGJsYWRlOiBUU2hhcmVEb0JsYWRlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtV2lkZ2V0RGVzaWduZXJDbGFzcyB7XHJcbiAgICB2YWxpZGF0aW9uOiBhbnk7XHJcbiAgICB2YWxpZGF0aW9uRXJyb3JDb3VudDoga28uQ29tcHV0ZWQ8bnVtYmVyPjtcclxuICAgIGZvcm1CdWlsZGVyRGVmaW5pdGlvbjoga28uT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG4gICAgbW9kZWw6IElGb3JtV2lkZ2V0RGVzaWduZXJNb2RlbDtcclxuICAgIHRleHRFZGl0b3JGb3JtQnVpbGRlckRlZmluaXRpb246IGFueTtcclxuICAgIHRpdGxlOiBrby5PYnNlcnZhYmxlPHN0cmluZz47XHJcbiAgICB0ZXh0RWRpdG9yQXNwZWN0RGF0YTogYW55O1xyXG4gICAgdGV4dEVkaXRvcktleURhdGVzOiBhbnk7XHJcbiAgICB0ZXh0RWRpdG9yV29ya0l0ZW06IGFueTtcclxuICAgIHRleHRFZGl0b3JQYXJ0aWNpcGFudHM6IGFueTtcclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgZm9ybUJ1aWxkZXI6IGFueSB8IHVuZGVmaW5lZDtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IENvbmZndXJhdGlvbkFuZEJsYWRlLCBiYXNlTW9kZWw6IElXaWRnZXRCYXNlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IGNvbmZpZ3VyYXRpb24/LmJsYWRlPy5tb2RlbD8udGl0bGUgfHwgYmFzZU1vZGVsLnRpdGxlXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICBjb25zdCBkZWZhdWx0czogSUZvcm1XaWRnZXRDb25maWd1cmF0aW9uID0ge1xyXG4gICAgICAgICAgICBmb3JtQnVpbGRlckRlZmluaXRpb246IEpTT04uc3RyaW5naWZ5KERFRkFVTFRfRk9STSwgbnVsbCwgNCksXHJcbiAgICAgICAgICAgIGJyb2FkY2FzdE9uU3VibWl0OiB0cnVlLFxyXG4gICAgICAgICAgICBicm9hZGNhc3RPblN1Ym1pdEV2ZW50TmFtZTogYCR7YmFzZU1vZGVsLnN5c3RlbU5hbWV9LiR7Y2FtZWxpemUodGhpcy50aXRsZSgpKX0ub25TdWJtaXRgLFxyXG4gICAgICAgICAgICBjcmVhdGVXb3JrVHlwZU9uU3VibWl0OiBmYWxzZSxcclxuICAgICAgICAgICAgd29ya0l0ZW06IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZTogXCJpbnN0cnVjdGlvbi1iMmItZGlzcHV0ZS1wbGFpbnRpZmZcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlSXNVc2VyUHJvdmlkZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcmVmZXJlbmVjSXNVc2VyUHJvdmlkZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sIG51bGwsIDQpLFxyXG4gICAgICAgICAgICBhc3BlY3REYXRhOiBKU09OLnN0cmluZ2lmeShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbldvcmtUeXBlRGV0YWlsczpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2VTaGFyZWRvVHlwZVN5c3RlbU5hbWU6IFwid2stbWF0dGVyLWRpc3B1dGUtcGxhaW50aWZmLXJlY292ZXJpZXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZVdvcmtUeXBlSWQ6IDUwMDAwMDI4NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAganVyaXNkaWN0aW9uSWQ6IFwiZnVuYzpmb3JtQnVpbGRlci5zZWxlY3RlZExvY2F0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBpbmNpZGVudERldGFpbHNMb2NhdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEluY2lkZW50TG9jYXRpb25JZDogXCJmdW5jOmZvcm1CdWlsZGVyLmFkZHJlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgSW5jaWRlbnRUeXBlSWQ6IFwiWydzdHJlZXQnXVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgbnVsbCwgNCksXHJcbiAgICAgICAgICAgIGtleURhdGVzOiBKU09OLnN0cmluZ2lmeShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImtkLWluc3RydWN0aW9uLXJlY2VpdmVkXCI6IG5ldyBEYXRlKClcclxuICAgICAgICAgICAgICAgIH0sIG51bGwsIDQpLFxyXG4gICAgICAgICAgICBwYXJ0aWNpcGFudHM6IEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByb2xlU3lzdGVtTmFtZTogXCJjbGllbnQtY2FzZS1oYW5kbGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb2RzUmVmZXJlbmNlOiAkdWkucGFnZUNvbnRleHQudXNlci51c2VybmFtZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG9kc1R5cGU6IFwicGVyc29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb2RzSWQ6ICR1aS5wYWdlQ29udGV4dC51c2VyLnVzZXJpZCgpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLCBudWxsLCA0KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIGNvbmZpZ3VyYXRpb24pO1xyXG4gICAgICAgIHRoaXMuZm9ybUJ1aWxkZXJEZWZpbml0aW9uID0ga28ub2JzZXJ2YWJsZShvcHRpb25zLmZvcm1CdWlsZGVyRGVmaW5pdGlvbilcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvcHRpb25zXCIsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSB7XHJcbiAgICAgICAgICAgIGZvcm1CdWlsZGVyRGVmaW5pdGlvbjogdGhpcy5mb3JtQnVpbGRlckRlZmluaXRpb24sXHJcbiAgICAgICAgICAgIGJyb2FkY2FzdE9uU3VibWl0OiBrby5vYnNlcnZhYmxlKG9wdGlvbnMuYnJvYWRjYXN0T25TdWJtaXQpLFxyXG4gICAgICAgICAgICBicm9hZGNhc3RPblN1Ym1pdEV2ZW50TmFtZToga28ub2JzZXJ2YWJsZShvcHRpb25zLmJyb2FkY2FzdE9uU3VibWl0RXZlbnROYW1lKSxcclxuICAgICAgICAgICAgY3JlYXRlV29ya1R5cGVPblN1Ym1pdDoga28ub2JzZXJ2YWJsZShvcHRpb25zLmNyZWF0ZVdvcmtUeXBlT25TdWJtaXQpLFxyXG4gICAgICAgICAgICB3b3JrSXRlbToga28ub2JzZXJ2YWJsZShvcHRpb25zLndvcmtJdGVtKSxcclxuICAgICAgICAgICAgYXNwZWN0RGF0YToga28ub2JzZXJ2YWJsZShvcHRpb25zLmFzcGVjdERhdGEpLFxyXG4gICAgICAgICAgICBrZXlEYXRlczoga28ub2JzZXJ2YWJsZShvcHRpb25zLmtleURhdGVzKSxcclxuICAgICAgICAgICAgcGFydGljaXBhbnRzOiBrby5vYnNlcnZhYmxlKG9wdGlvbnMucGFydGljaXBhbnRzKVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnRpdGxlLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5icm9hZGNhc3RPblN1Ym1pdEV2ZW50TmFtZShgJHtiYXNlTW9kZWwuc3lzdGVtTmFtZX0uJHtjYW1lbGl6ZShuZXdWYWx1ZSl9Lm9uU3VibWl0YCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yQ291bnQgPSBrby5wdXJlQ29tcHV0ZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRBbmRCaW5kKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgfVxyXG5cclxuICAgIGdldE1vZGVsKCkge1xyXG4gICAgICAgIHZhciBrb01vZGVsID0ga28udG9KUyh0aGlzLm1vZGVsKTtcclxuICAgICAgICByZXR1cm4ga29Nb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBvbkZvY3VzT3V0KGRhdGE6IGFueSwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGxldCBpZCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIGxldCBrb09iamVjdCA9ICh0aGlzLm1vZGVsIGFzIGFueSlbaWRdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IEpTT04uc3RyaW5naWZ5KEpTT04ucGFyc2Uoa29PYmplY3QoKSksIG51bGwsIDQpO1xyXG4gICAgICAgICAgICBrb09iamVjdChuZXdWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIiwgZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgY2hlY2tDb21wbGV4KCkge1xyXG4gICAgICAgIGxldCBpZCA9IFwiI2Zvcm1pby1kZXNpZ25lclwiO1xyXG4gICAgICAgIGxldCBkaXYgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihpZCk7XHJcblxyXG4gICAgICAgIGlmICghZGl2KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIGVsZW1lbnQgd2l0aCBpZCBcIiArIGlkKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNyZWF0ZUZvcm1CdWlsZGVyUGFnZShkaXYsdGhpcy5mb3JtQnVpbGRlckRlZmluaXRpb24oKSkucHJvbWlzZS50aGVuKChmb3JtQnVpbGRlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1CdWlsZGVyID0gZm9ybUJ1aWxkZXI7XHJcbiAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5mb3JtQnVpbGRlciA9IGZvcm1CdWlsZGVyO1xyXG4gICAgICAgICAgICBmb3JtQnVpbGRlci5pbnN0YW5jZS5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQnVpbGRlckRlZmluaXRpb24oSlNPTi5zdHJpbmdpZnkoZm9ybUJ1aWxkZXIuaW5zdGFuY2Uuc2NoZW1hLCBudWxsLCAyKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHdpbmRvdy5vcGVuKFwiaHR0cDovLzEyNy4wLjAuMTo1NTAwL3NyYy9XZWJCYXNlZC9UZXN0ZXIvRm9ybUlPQnVpbGRlci9wYWdlLmh0bWxcIiwgXCJfYmxhbmtcIik7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9