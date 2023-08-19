/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ModuleLoader"] = factory();
	else
		root["ModuleLoader"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./AlphacaAdapter.ts":
/*!***************************!*\
  !*** ./AlphacaAdapter.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FormBuilder: () => (/* binding */ FormBuilder)\n/* harmony export */ });\n//this class is to be used to adapt the Alpaca API to the API used by the ModuleLoader\n//this is so we can allow for deprication of the Alpaca API\n//Adapter for Alpaca API\n//this is so we can allow for deprication of the Alpaca API\nclass FormBuilder {\n    constructor(context, parent) {\n        this.fieldsById = {};\n        this.fields = [];\n        this.name = '';\n        //check to see if context is a HTMLElement or an AlpacaField\n        if (context instanceof HTMLElement) {\n            this.alpacaForm = $(context).alpaca();\n        }\n        else {\n            this.alpacaForm = context;\n        }\n        this.parent = parent;\n        this.name = this.alpacaForm.name;\n        this.populateFields();\n    }\n    readonly(value) {\n        if (value != undefined) {\n            this.alpacaForm.options.readonly = value;\n            this.alpacaForm.refresh();\n        }\n        return this.alpacaForm.options.readonly;\n    }\n    hidden(value) {\n        if (value != undefined) {\n            this.alpacaForm.options.hidden = value;\n            this.alpacaForm.refresh();\n        }\n        return this.alpacaForm.options.hidden;\n    }\n    getValue() {\n        return this.alpacaForm.getValue();\n    }\n    setValue(value) {\n        this.alpacaForm.setValue(value);\n        if (this.alpacaForm._events.change) {\n            this.alpacaForm._events.change();\n        }\n        this.alpacaForm.refresh();\n    }\n    isValid() {\n        return this.alpacaForm.isValid();\n    }\n    on(event, callback) {\n        this.alpacaForm.on(event, callback);\n    }\n    populateFields() {\n        this.fieldsById = {};\n        this.fields = [];\n        for (let key in this.alpacaForm.childrenByPropertyId) {\n            let childAlpacaForm = this.alpacaForm.childrenByPropertyId[key];\n            let newItem = new FormBuilder(childAlpacaForm, this);\n            newItem.parent = this;\n            this.fieldsById[key] = newItem;\n            this.fields.push(newItem);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://ModuleLoader/./AlphacaAdapter.ts?");

/***/ }),

/***/ "./ModuleLoader.ts":
/*!*************************!*\
  !*** ./ModuleLoader.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AlphacaAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AlphacaAdapter */ \"./AlphacaAdapter.ts\");\n/**\n * ModuleLoader\n * created by: Igor Jericevich\n * created on: 2023/05/31\n * @module ModuleLoader\n * @description This module is used to load other modules into the form builder\n * Note: This module is used in the eDiscovery project to provide helper functions to the form builder\n * within form builder add a\n */\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n//log to the screen that this file has been loaed into the browser\nconsole.log(\"%c [ModuleLoader] module-loader webcomponent loaded\", \"background: #222; color: #bada55\", undefined);\n//create the template for the webcomponent\nconst template = document.createElement('template');\ntemplate.innerHTML = `\n<div style=\"display:none;\" class=\"module-loader\">  \n    <slot></slot>\n</div>`;\n//create the webcomponent\n//using shadow dom to isolate any html and css produced by the module\nclass ModuleLoader extends HTMLElement {\n    constructor() {\n        super();\n        //log that the constructor has been called\n        console.log(\"%c [ModuleLoader] constructor\", \"background: #222; color: #bada55\", this);\n        //attach the shadow dom and add the template\n        this.addTemplateToShadowRoot();\n    }\n    /**\n     * Attaches the template to the shadow root\n     * @private\n     * @memberof ModuleLoader\n     * @returns {void}\n     */\n    addTemplateToShadowRoot() {\n        this.attachShadow({ mode: 'open' });\n        if (!this.shadowRoot)\n            throw new Error(\"No shadowRoot\");\n        this.thisShadowRoot = this.shadowRoot;\n        this.shadowRoot.appendChild(template.content.cloneNode(true));\n    }\n    connectedCallback() {\n        console.log(\"%c [ModuleLoader] connectedCallback\", \"background: #222; color: #bada55\", this);\n        // setTimeout(() => {\n        if (!this.thisShadowRoot)\n            throw new Error(\"No thisShadowRoot\");\n        let slots = this.thisShadowRoot.querySelectorAll('slot');\n        console.log(slots);\n        let scriptURL = slots[0].assignedNodes()[0].textContent;\n        console.log(scriptURL);\n        if (!scriptURL)\n            return;\n        //import the script with no cache\n        //get the name of the script file from scriptURL less the .js\n        let moduleName = scriptURL.substring(scriptURL.lastIndexOf('/') + 1, scriptURL.lastIndexOf('.'));\n        let scriptUrl = window.location.origin + scriptURL + \"?v=\" + new Date().getTime();\n        let loadScript = () => __awaiter(this, void 0, void 0, function* () {\n            try {\n                yield import(/* webpackIgnore: true */ scriptUrl);\n                let runMe = window[moduleName].runMe;\n                console.log(\"module\", runMe);\n                if (!runMe)\n                    throw new Error(\"No runMe function\");\n                if (!this.parentElement)\n                    throw new Error(\"No parentElement\");\n                let closestForm = this.parentElement.closest(\"form\");\n                if (!closestForm)\n                    throw new Error(\"No closestForm\");\n                let context = createFormBuilderContext(closestForm);\n                runMe(context);\n            }\n            catch (e) {\n                console.log(e);\n            }\n        });\n        loadScript();\n        this.render();\n    }\n    render() {\n        console.log(\"%c [ModuleLoader] render\", \"background: #222; color: #bada55\", this);\n    }\n}\nwindow.customElements.define('module-loader', ModuleLoader);\nfunction createFormBuilderContext(element) {\n    //log\n    console.log(\"%c [ModuleLoader] createFormBuilderContext\", \"background: #222; color: #bada55\", element);\n    if (!element)\n        throw new Error(\"No element\");\n    if (!element.parentElement)\n        throw new Error(\"No element.parentElement\");\n    console.log(\"%c [ModuleLoader] Applying context\", \"background: #222; color: #bada55\");\n    let koContext = window.ko.contextFor(element.parentElement);\n    let blade = getBlade(koContext);\n    let workItemContext = window.ko.contextFor(element.parentElement).$parentContext.$data.options.model;\n    console.log(\"%c [ModuleLoader] createFormBuilderContext\", \"background: #222; color: #bada55\", koContext, blade, element, workItemContext);\n    let retValue = {\n        koContext: koContext,\n        blade: blade,\n        element: element,\n        form: getAlpacaFormAdapter(element),\n        workItemContext: workItemContext,\n        getAspect: (aspectSystemName) => getAspect(aspectSystemName, blade)\n    };\n    //log with color\n    console.log(\"%c [ModuleLoader] createFormBuilderContext return value\", \"background: #222; color: #bada55\", retValue);\n    return retValue;\n}\nfunction getAlpacaFormFields(context) {\n    let alpaca = $(context).alpaca();\n    return alpaca.childrenByPropertyId;\n}\nfunction getAlpacaForm(context) {\n    let alpaca = $(context).alpaca();\n    return alpaca;\n}\nfunction getBlade(context) {\n    var _a;\n    let blade = (_a = context.$parentContext) === null || _a === void 0 ? void 0 : _a.$root.options.blade;\n    return blade;\n}\nfunction getAspect(aspectSystemName, blade) {\n    let find = blade.aspects().find(t => t.widget.base.systemName == \"Sharedo.Core.Legal.Aspects.Widgets.InstructionWorkTypeDetails\");\n    if (!find) {\n        //log\n        console.log(\"%c [ModuleLoader] getAspect return value\", \"background: #222; color: #bada55\", find);\n    }\n    return find;\n}\nfunction getAlpacaFormAdapter(element) {\n    return new _AlphacaAdapter__WEBPACK_IMPORTED_MODULE_0__.FormBuilder(element);\n}\n\n\n//# sourceURL=webpack://ModuleLoader/./ModuleLoader.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ModuleLoader.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});