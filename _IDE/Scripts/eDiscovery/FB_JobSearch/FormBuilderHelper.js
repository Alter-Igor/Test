/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/WebBased/Scripts/eDiscovery/FB_JobSearch/FormBuilderHelper.ts":
/*!***************************************************************************!*\
  !*** ./src/WebBased/Scripts/eDiscovery/FB_JobSearch/FormBuilderHelper.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   runMe: () => (/* binding */ runMe)\n/* harmony export */ });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n//This function is called from the module-loader webcomponent in the form builder\n//it is called when the form is loaded\n//It checks the current phase is in anything except draft it makes the fomr readonly.\nfunction runMe(_x) {\n  return _runMe.apply(this, arguments);\n}\n\n// example of gettig data from sharedo\n// let data = await $ajax.get(\"/api/v1/public/workItem/\" + sharedoId);    \n// if(data.aspectData.formBuilder.formData.altEDiscoverySearchDescription === \"test\") {\n//         console.log(\"its test\");\n// } \nfunction _runMe() {\n  _runMe = _asyncToGenerator(function* (context) {\n    var sharedoId = context.workItemContext.id();\n    var currentPhaseName = context.workItemContext.phaseName();\n\n    //Check the current phase, undefined mean its a new form \n    //Draft means its a saved new form that has not been submitted\n    if (currentPhaseName === undefined) {\n      return;\n    }\n    if (currentPhaseName === \"Draft\") {\n      return;\n    }\n    if (!context.form) {\n      return;\n    }\n    //if the form is already readonly then return as we dont need to do anything\n    if (context.form.readonly() === true) {\n      return;\n    }\n    //set the form to readonly\n    context.form.readonly(true);\n  });\n  return _runMe.apply(this, arguments);\n}\n\n//# sourceURL=webpack://test/./src/WebBased/Scripts/eDiscovery/FB_JobSearch/FormBuilderHelper.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/WebBased/Scripts/eDiscovery/FB_JobSearch/FormBuilderHelper.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;