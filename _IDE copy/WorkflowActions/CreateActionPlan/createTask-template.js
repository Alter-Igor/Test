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

/***/ "./createActionPlan-template.ts":
/*!**************************************!*\
  !*** ./createActionPlan-template.ts ***!
  \**************************************/
/***/ (() => {

eval("var actionPlan = {\n  type: \"\",\n  mandatory: undefined,\n  order: undefined,\n  callToActionVar: undefined,\n  description: undefined\n};\nactionPlan.description = sharedo.buildString(\"$model.Configuration.description;\");\nactionPlan.type = \"$model.Configuration.type\";\nactionPlan.mandatory = $model.Configuration.mandatory;\nactionPlan.order = $model.Configuration.order;\n;\nactionPlan.callToActionVar = ctx[\"$model.Configuration.callToActionVar\"];\n\n// $ifNotNull.Configuration.outputVariable\nctx[\"$model.Configuration.outputVariable\"] = actionPlan;\n// $endif;\n\n// $ifNotNull.Configuration.outputCollection\nvar listAsString = ctx[\"$model.Configuration.outputCollection\"];\nif (!listAsString) {\n  log.Information('*** create new array');\n  var emptyArray = [];\n  listAsString = emptyArray; //JSON.stringify(emptyArray);\n  // log.Information(listAsString);\n  ctx[\"$model.Configuration.outputCollection\"] = listAsString;\n}\nvar list = listAsString; // JSON.parse(listAsString) as Array<any>;\nlist.push(actionPlan);\nctx[\"$model.Configuration.outputCollection\"] = list;\n// $endif;\n\n//# sourceURL=webpack:///./createActionPlan-template.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./createActionPlan-template.ts"]();
/******/ 	
/******/ })()
;