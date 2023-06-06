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

/***/ "./FB_JobSearch/index.ts":
/*!*******************************!*\
  !*** ./FB_JobSearch/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   runMe: () => (/* binding */ runMe)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n//This function is called from the module-loader webcomponent in the form builder\n//it is called when the form is loaded\n//It checks the current phase is in anything except draft it makes the fomr readonly.\nfunction runMe(context) {\n    return __awaiter(this, void 0, void 0, function* () {\n        let sharedoId = context.workItemContext.id();\n        let currentPhaseName = context.workItemContext.phaseName();\n        //Check the current phase, undefined mean its a new form \n        //Draft means its a saved new form that has not been submitted\n        if (currentPhaseName === undefined) {\n            return;\n        }\n        if (currentPhaseName === \"Draft\") {\n            return;\n        }\n        if (!context.form) {\n            return;\n        }\n        //if the form is already readonly then return as we dont need to do anything\n        if (context.form.readonly() === true) {\n            return;\n        }\n        //set the form to readonly\n        context.form.readonly(true);\n    });\n}\n// example of gettig data from sharedo\n// let data = await $ajax.get(\"/api/v1/public/workItem/\" + sharedoId);    \n// if(data.aspectData.formBuilder.formData.altEDiscoverySearchDescription === \"test\") {\n//         console.log(\"its test\");\n// } \n\n\n//# sourceURL=webpack:///./FB_JobSearch/index.ts?");

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
/******/ 	__webpack_modules__["./FB_JobSearch/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	window.FB_JobSearch = __webpack_exports__;
/******/ 	
/******/ })()
;