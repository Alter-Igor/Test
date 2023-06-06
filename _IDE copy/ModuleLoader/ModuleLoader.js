/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ModuleLoader/src/AlphacaAdapter.ts":
/*!************************************************!*\
  !*** ./src/ModuleLoader/src/AlphacaAdapter.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FormBuilder: () => (/* binding */ FormBuilder)\n/* harmony export */ });\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return typeof key === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (typeof input !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (typeof res !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n//this class is to be used to adapt the Alpaca API to the API used by the ModuleLoader\n//this is so we can allow for deprication of the Alpaca API\n//Adapter for Alpaca API\n\n//this is so we can allow for deprication of the Alpaca API\nclass FormBuilder {\n  constructor(context) {\n    _defineProperty(this, \"fieldsById\", {});\n    this.alpacaForm = $(context).alpaca();\n    this.populateFields();\n  }\n  readonly(value) {\n    if (value != undefined) {\n      this.alpacaForm.options.readonly = value;\n      this.alpacaForm.refresh();\n    }\n    return this.alpacaForm.options.readonly;\n  }\n  hidden(value) {\n    if (value != undefined) {\n      this.alpacaForm.options.hidden = !value;\n      this.alpacaForm.refresh();\n    }\n    return !this.alpacaForm.options.hidden;\n  }\n  getValue() {\n    return this.alpacaForm.getValue();\n  }\n  setValue(value) {\n    this.alpacaForm.setValue(value);\n  }\n  isValid() {\n    return this.alpacaForm.isValid();\n  }\n  on(event, callback) {\n    this.alpacaForm.on(event, callback);\n  }\n  populateFields() {\n    this.fieldsById = {};\n    this.fields = [];\n    for (var _key in this.alpacaForm.childrenByPropertyId) {\n      var newItem = new FormBuilder(this.alpacaForm.childrenByPropertyId[_key]);\n      newItem.parent = this;\n      this.fieldsById[_key] = newItem;\n      this.fields.push(newItem);\n    }\n  }\n}\n\n//# sourceURL=webpack://test/./src/ModuleLoader/src/AlphacaAdapter.ts?");

/***/ }),

/***/ "./src/ModuleLoader/src/ModuleLoader.ts":
/*!**********************************************!*\
  !*** ./src/ModuleLoader/src/ModuleLoader.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AlphacaAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AlphacaAdapter */ \"./src/ModuleLoader/src/AlphacaAdapter.ts\");\n/**\n * ModuleLoader\n * created by: Igor Jericevich\n * created on: 2023/05/31\n * @module ModuleLoader\n * @description This module is used to load other modules into the form builder\n * Note: This module is used in the eDiscovery project to provide helper functions to the form builder\n * within form builder add a \n */\n\n\n\n//log to the screen that this file has been loaed into the browser\nconsole.log(\"%c [ModuleLoader] module-loader webcomponent loaded\", \"background: #222; color: #bada55\", undefined);\n\n//create the template for the webcomponent\nvar template = document.createElement('template');\ntemplate.innerHTML = \"\\n<div style=\\\"display:none;\\\" class=\\\"module-loader\\\">  \\n    <slot></slot>\\n</div>\";\n\n//create the webcomponent\n//using shadow dom to isolate any html and css produced by the module\nclass ModuleLoader extends HTMLElement {\n  constructor() {\n    super();\n    //log that the constructor has been called\n    console.log(\"%c [ModuleLoader] constructor\", \"background: #222; color: #bada55\", this);\n    //attach the shadow dom and add the template\n    this.addTemplateToShadowRoot();\n  }\n\n  /**\n   * Attaches the template to the shadow root\n   * @private\n   * @memberof ModuleLoader\n   * @returns {void}\n   */\n  addTemplateToShadowRoot() {\n    this.attachShadow({\n      mode: 'open'\n    });\n    if (!this.shadowRoot) throw new Error(\"No shadowRoot\");\n    this.thisShadowRoot = this.shadowRoot;\n    this.shadowRoot.appendChild(template.content.cloneNode(true));\n  }\n  connectedCallback() {\n    console.log(\"%c [ModuleLoader] connectedCallback\", \"background: #222; color: #bada55\", this);\n\n    // setTimeout(() => {\n    if (!this.thisShadowRoot) throw new Error(\"No thisShadowRoot\");\n    var slots = this.thisShadowRoot.querySelectorAll('slot');\n    console.log(slots);\n    var scriptURL = slots[0].assignedNodes()[0].textContent;\n    console.log(scriptURL);\n    if (!scriptURL) return;\n    //import the script with no cache\n\n    var scriptUrl = window.location.origin + scriptURL + \"?v=\" + new Date().getTime();\n    __webpack_require__(\"./src/ModuleLoader/src lazy recursive\")(scriptUrl).then(module => {\n      console.log(\"module\", module);\n      var runMe = module.runMe;\n      if (!runMe) throw new Error(\"No runMe function\");\n      if (!this.parentElement) throw new Error(\"No parentElement\");\n      var closestForm = this.parentElement.closest(\"form\");\n      if (!closestForm) throw new Error(\"No closestForm\");\n      var context = createFormBuilderContext(closestForm);\n      runMe(context);\n    }).catch(err => {\n      console.log(err);\n    });\n\n    // }, 1000);\n\n    this.render();\n  }\n  render() {\n    console.log(\"%c [ModuleLoader] render\", \"background: #222; color: #bada55\", this);\n  }\n}\nwindow.customElements.define('module-loader', ModuleLoader);\nfunction createFormBuilderContext(element) {\n  //log\n  console.log(\"%c [ModuleLoader] createFormBuilderContext\", \"background: #222; color: #bada55\", element);\n  if (!element) throw new Error(\"No element\");\n  if (!element.parentElement) throw new Error(\"No element.parentElement\");\n  console.log(\"%c [ModuleLoader] Applying context\", \"background: #222; color: #bada55\");\n  var koContext = window.ko.contextFor(element.parentElement);\n  var blade = getBlade(koContext);\n  var workItemContext = window.ko.contextFor(element.parentElement).$parentContext.$data.options.model;\n  console.log(\"%c [ModuleLoader] createFormBuilderContext\", \"background: #222; color: #bada55\", koContext, blade, element, workItemContext);\n  var retValue = {\n    koContext: koContext,\n    blade: blade,\n    element: element,\n    form: getAlpacaFormAdapter(element),\n    workItemContext: workItemContext,\n    getAspect: aspectSystemName => _getAspect(aspectSystemName, blade)\n  };\n  //log with color\n  console.log(\"%c [ModuleLoader] createFormBuilderContext return value\", \"background: #222; color: #bada55\", retValue);\n  return retValue;\n}\nfunction getAlpacaFormFields(context) {\n  var alpaca = $(context).alpaca();\n  return alpaca.childrenByPropertyId;\n}\nfunction getAlpacaForm(context) {\n  var alpaca = $(context).alpaca();\n  return alpaca;\n}\nfunction getBlade(context) {\n  var _context$$parentConte;\n  var blade = (_context$$parentConte = context.$parentContext) === null || _context$$parentConte === void 0 ? void 0 : _context$$parentConte.$root.options.blade;\n  return blade;\n}\nfunction _getAspect(aspectSystemName, blade) {\n  var find = blade.aspects().find(t => t.widget.base.systemName == \"Sharedo.Core.Legal.Aspects.Widgets.InstructionWorkTypeDetails\");\n  if (!find) {\n    //log\n    console.log(\"%c [ModuleLoader] getAspect return value\", \"background: #222; color: #bada55\", find);\n  }\n  return find;\n}\nfunction getAlpacaFormAdapter(element) {\n  return new _AlphacaAdapter__WEBPACK_IMPORTED_MODULE_0__.FormBuilder(element);\n}\n\n//# sourceURL=webpack://test/./src/ModuleLoader/src/ModuleLoader.ts?");

/***/ }),

/***/ "./src/ModuleLoader/src lazy recursive":
/*!*****************************************************!*\
  !*** ./src/ModuleLoader/src/ lazy namespace object ***!
  \*****************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/ModuleLoader/src lazy recursive\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://test/./src/ModuleLoader/src/_lazy_namespace_object?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ModuleLoader/src/ModuleLoader.ts");
/******/ 	
/******/ })()
;