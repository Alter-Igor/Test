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

/***/ "../../Common/OdsHelper.ts":
/*!*********************************!*\
  !*** ../../Common/OdsHelper.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAllOdsPickerForRole: () => (/* binding */ getAllOdsPickerForRole),\n/* harmony export */   getOdsWidgets: () => (/* binding */ getOdsWidgets),\n/* harmony export */   searchForClient: () => (/* binding */ searchForClient),\n/* harmony export */   searchForUser: () => (/* binding */ searchForUser)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n// /**\n//  * \n//  * @param surname Surname to help filter results\n//  * @param email The person with this email address\n//  */\n// export async function findUserByEmail(surname:string,email : string)\n// {\n//     //https://hsf-vnext.sharedo.co.uk/api/listview/core-admin-users-all/25/1/username/asc/?view=table&withCounts=1\n//     let api = \"/api/listview/core-admin-ods-people/40/1/surname/asc/?view=table&withCounts=0\";\n//     let postBody = [\n//         {\n//             \"fieldId\": \"surname\",\n//             \"filterId\": \"clv-filter-text\",\n//             \"config\": \"{}\",\n//             \"parameters\": `{\"text\":\"${surname}\"}`\n//         }\n//     ];\n//     let result = await $ajax.post(/* webpackIgnore: true */ window.document.location.origin + api,postBody) as ICoreAdminOdsPeople;\n//     if(!result) return undefined;\n//     if(!result.rows) return undefined;\n//     return result.rows.find(r=> r.data.primaryEmail === email);\n// }\nfunction searchForUser(search) {\n    return __awaiter(this, void 0, void 0, function* () {\n        let postBody = {\n            \"startPage\": 1,\n            \"endPage\": 1,\n            \"rowsPerPage\": 10,\n            \"searchString\": search,\n            \"odsEntityTypes\": [],\n            \"availability\": {\n                \"isAvailable\": null,\n                \"isOutOfOffice\": null,\n                \"isNotAvailable\": null\n            },\n            \"location\": {\n                \"postcode\": null,\n                \"range\": 10\n            },\n            \"connection\": {\n                \"systemName\": null\n            },\n            \"competencies\": [],\n            \"teams\": [],\n            \"roles\": [],\n            \"odsTypes\": [\n                \"acl\",\n                \"alt-ediscovery-user-type\",\n                \"client\",\n                \"department\",\n                \"document-training-type\",\n                \"employee\",\n                \"expert\",\n                \"external-team\",\n                \"external\",\n                \"pod\",\n                \"structural\",\n                \"system-administrator\"\n            ],\n            \"wallManagement\": false\n        };\n        let api = \"/api/ods/_search\";\n        let result = yield $ajax.post(/* webpackIgnore: true */ window.document.location.origin + api, postBody);\n        return result.rows.map(r => JSON.parse(r.result));\n    });\n}\nfunction searchForClient(search) {\n    return __awaiter(this, void 0, void 0, function* () {\n        let postBody = {\n            \"startPage\": 1,\n            \"endPage\": 1,\n            \"rowsPerPage\": 10,\n            \"searchString\": search,\n            \"odsEntityTypes\": [],\n            \"availability\": {\n                \"isAvailable\": null,\n                \"isOutOfOffice\": null,\n                \"isNotAvailable\": null\n            },\n            \"location\": {\n                \"postcode\": null,\n                \"range\": 10\n            },\n            \"connection\": {\n                \"systemName\": null\n            },\n            \"competencies\": [],\n            \"teams\": [],\n            \"roles\": [],\n            \"odsTypes\": [\n                \"client\"\n            ],\n            \"wallManagement\": false\n        };\n        let api = \"/api/ods/_search\";\n        let result = yield $ajax.post(/* webpackIgnore: true */ window.document.location.origin + api, postBody);\n        return result.rows.map(r => JSON.parse(r.result));\n    });\n}\nfunction getAllOdsPickerForRole(blade, role) {\n    let retValue = new Array();\n    if (!blade)\n        return retValue;\n    let allOdsAspects = getOdsWidgets(blade);\n    if (!allOdsAspects)\n        return retValue;\n    let aspectWithPartner = allOdsAspects.filter(a => a.widget.odsEntities().find((o) => o.roleName === role));\n    if (!aspectWithPartner)\n        return retValue;\n    for (let aspect of aspectWithPartner) {\n        let odsPartner = aspect.widget.odsEntities().find((o) => o.roleName === role);\n        if (!odsPartner)\n            continue;\n        retValue.push(odsPartner);\n    }\n    return retValue;\n}\nfunction getOdsWidgets(blade) {\n    if (!blade)\n        return undefined;\n    let retValue = blade.aspects().filter(a => a.widget.odsEntities != undefined);\n    return retValue;\n}\n\n\n//# sourceURL=webpack:///../../Common/OdsHelper.ts?");

/***/ }),

/***/ "./FB_MatterDetails/index.ts":
/*!***********************************!*\
  !*** ./FB_MatterDetails/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   enumFields: () => (/* binding */ enumFields),\n/* harmony export */   enumMatterDetailFields: () => (/* binding */ enumMatterDetailFields),\n/* harmony export */   runMe: () => (/* binding */ runMe)\n/* harmony export */ });\n/* harmony import */ var _Common_OdsHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Common/OdsHelper */ \"../../Common/OdsHelper.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n//This function is called from the module-loader webcomponent in the form builder\nfunction runMe(context) {\n    let { expertMatterNumber, matterDetails, pipelineMatter } = createVariables(context);\n    if (!expertMatterNumber)\n        throw new Error(\"No expertMatterNumber\");\n    if (!matterDetails)\n        throw new Error(\"No matterDetails\");\n    if (!pipelineMatter)\n        throw new Error(\"No pipelineMatter\");\n    window.tester = context; //just for debugging\n    hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);\n    //add a change event to the expert-matter-number\n    addEventHandlers(context, matterDetails, expertMatterNumber, pipelineMatter);\n    generateTempMatterNumber(context);\n}\n// This function creates variables for the form.\nfunction createVariables(context) {\n    // Get the fields\n    // let matterDetails = context.fields[enumFields.matterDetails];\n    if (!context.form)\n        throw new Error(\"No form\");\n    let matterDetails = context.form.fieldsById[enumFields.matterDetails];\n    let expertMatterNumber = context.form.fieldsById[enumFields.expertMatterNumber];\n    let pipelineMatter = context.form.fieldsById[enumFields.pipelineMatter];\n    // Return the variables\n    return { expertMatterNumber, matterDetails, pipelineMatter };\n}\nfunction addEventHandlers(context, matterDetails, expertMatterNumber, pipelineMatter) {\n    var _a, _b, _c, _d;\n    if (!context.form)\n        throw new Error(\"No form\");\n    (_a = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]) === null || _a === void 0 ? void 0 : _a.on(\"change\", function (ev) {\n        var _a;\n        //log color\n        console.log(\"%c Partner name changed to: \" + ((_a = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]) === null || _a === void 0 ? void 0 : _a.getValue()), \"color: pink; font-size: 20px;\");\n    });\n    (_b = context.form.fieldsById[enumFields.expertMatterNumber]) === null || _b === void 0 ? void 0 : _b.on(\"change\", function (ev) {\n        // hide or show the matter details field\n        hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);\n        // update the matter details field\n        updateMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter);\n    });\n    //add event handlet for pipeline-matter changed\n    (_c = context.form.fieldsById[enumFields.pipelineMatter]) === null || _c === void 0 ? void 0 : _c.on(\"change\", function (ev) {\n        // hide or show the matter details field\n        hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);\n        // update the matter details field\n        updateMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter);\n    });\n    //add event handlet for jurisdiction changed\n    (_d = context.form.fieldsById[enumFields.jurisdictionsCountry]) === null || _d === void 0 ? void 0 : _d.on(\"change\", function (ev) {\n        var _a, _b, _c, _d;\n        return __awaiter(this, void 0, void 0, function* () {\n            //update blade jurisdiction     \n            let selectedId = (_b = (_a = context.form) === null || _a === void 0 ? void 0 : _a.fieldsById[\"jurisdictions-country\"]) === null || _b === void 0 ? void 0 : _b.getValue();\n            console.log(\"%c Jurisdiction changed to: \" + ((_d = (_c = context.form) === null || _c === void 0 ? void 0 : _c.fieldsById[\"jurisdictions-country\"]) === null || _d === void 0 ? void 0 : _d.getValue()), \"color: red; font-size: 20px;\");\n            let aspect = context.getAspect(\"Sharedo.Core.Legal.Aspects.Widgets.InstructionWorkTypeDetails\");\n            let selectedJurisdictionCountry = yield $ajax.get(/* webpackIgnore: true */ `/api/v1/public/modeller/optionSets/allValues/${selectedId}`);\n            if (!selectedJurisdictionCountry) {\n                //log issue\n                console.log(\"%c [ModuleLoader] getAspect return value\", \"background: #222; color: #bada55\", selectedJurisdictionCountry);\n                return;\n            }\n            let options = yield $ajax.get(/* webpackIgnore: true */ `/api/v1/public/modeller/optionSets/jurisdictions/values`);\n            let selectedJurisdiction = options.find((option) => option.name === selectedJurisdictionCountry.name);\n            if (!selectedJurisdiction) {\n                //log issue\n                console.log(\"%c [ModuleLoader] getAspect return value\", \"background: #222; color: #bada55\", selectedJurisdiction);\n                return;\n            }\n            aspect.widget.instruction.jurisdictionId(selectedJurisdiction.id);\n        });\n    });\n}\n// hide or show the matter details field\nfunction hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter) {\n    setMatterDetailsState(matterDetails, pipelineMatter.getValue());\n}\n// make all child properties readonly\nfunction setMatterDetailsState(matterDetails, status = true) {\n    if (!matterDetails.fields)\n        throw new Error(\"No fields\");\n    if (!matterDetails.fieldsById)\n        throw new Error(\"No fieldsById\");\n    // get all the child properties\n    matterDetails.fields.forEach(child => {\n        // set the readonly status of the child property\n        child.readonly(!status);\n    });\n    // show/hide the partner name and selector\n    // matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerSelector]?.hidden(!status);\n    // matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]?.hidden(status);\n}\n// clear all the child properties of the matter details sub area of the form builder\nfunction clearMatterDetails(matterDetails) {\n    var _a;\n    return __awaiter(this, void 0, void 0, function* () {\n        (_a = matterDetails.fields) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {\n            child.setValue(\"\");\n        });\n    });\n}\nfunction clearMatterPartnerOdsPicker(context) {\n    let odsMatterPartner = getPartnerOdsPicker(context);\n    if (odsMatterPartner) {\n        odsMatterPartner.selected(false);\n    }\n}\n/*\n1. We first get the data from the endpoint by calling getMatterData() function\n2. Then we clear the matterDetails\n3. We find the selected matter by using the matter code and client name from the data we got from the endpoint\n4. If the matter is undefined, we clear the matterDetails and return\n5. If the matter is not undefined, we set the values of the matterDetails fields */\nfunction updateMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter) {\n    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;\n    return __awaiter(this, void 0, void 0, function* () {\n        let data = yield getMatterData();\n        clearMatterDetails(matterDetails); //clear the matter details form\n        let selectedMatter = data.find(function (matter) {\n            //set the display portion of the expert-matter-number field\n            return expertMatterNumber.getValue() === `${matter.data.matterCode} - ${matter.data.client.name}`;\n        });\n        if (selectedMatter === undefined || pipelineMatter.getValue() === true) { //if the matter is not found or if the matter is a pipeline matter, clear the matter details form and return\n            clearMatterDetails(matterDetails);\n            return;\n        }\n        if (!((_a = matterDetails.parent) === null || _a === void 0 ? void 0 : _a.fieldsById))\n            throw new Error(\"No client\");\n        let tempMatterNumber = (_c = (_b = matterDetails.parent) === null || _b === void 0 ? void 0 : _b.fieldsById['temp-matter-number']) === null || _c === void 0 ? void 0 : _c.getValue();\n        if (tempMatterNumber === undefined || tempMatterNumber.length === 0) {\n            // matterDetails.parent.childrenByPropertyId['temp-matter-number'].setValue(\"N/A\");\n        }\n        //set the value portion of the expert-matter-number field\n        (_e = (_d = context.form) === null || _d === void 0 ? void 0 : _d.fieldsById[enumFields.expertMatterNumberValue]) === null || _e === void 0 ? void 0 : _e.setValue(selectedMatter.data.matterCode);\n        (_f = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsClientName]) === null || _f === void 0 ? void 0 : _f.setValue(selectedMatter.data.client.name);\n        (_g = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsClientCode]) === null || _g === void 0 ? void 0 : _g.setValue(selectedMatter.data.client.code);\n        (_h = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPracticeArea]) === null || _h === void 0 ? void 0 : _h.setValue(selectedMatter.data.practiceArea.name);\n        (_j = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsName]) === null || _j === void 0 ? void 0 : _j.setValue(selectedMatter.data.shortName);\n        (_k = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]) === null || _k === void 0 ? void 0 : _k.setValue(selectedMatter.data.partner.name);\n        (_l = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsIb]) === null || _l === void 0 ? void 0 : _l.setValue(selectedMatter.data.secure);\n        console.log(\"matterDetails.isValid():\" + matterDetails.isValid());\n        tryUpdatePartnerOdsPicker(selectedMatter, context);\n        tryUpdateClientOdsPicker(selectedMatter, context);\n    });\n}\nfunction tryUpdateClientOdsPicker(selectedMatter, context) {\n    let clientCode = selectedMatter.data.client.code;\n    (0,_Common_OdsHelper__WEBPACK_IMPORTED_MODULE_0__.searchForClient)(clientCode).then((clients) => {\n        let client = clients[0];\n        console.log(\"%c Partner name changed to: \" + (client === null || client === void 0 ? void 0 : client.id), \"color: pink; font-size: 20px;\", clients);\n        let odsClientPicker = getClientOdsPicker(context);\n        if (!odsClientPicker)\n            return;\n        if (!client) {\n            odsClientPicker.selected(false);\n            return;\n        }\n        odsClientPicker.icon('fa-bank');\n        odsClientPicker.odsName(client.name);\n        odsClientPicker.odsId(client.id);\n        odsClientPicker.selected(true);\n    });\n}\nfunction tryUpdatePartnerOdsPicker(selectedMatter, context) {\n    let partnerLastName = selectedMatter.data.partner.name.split(\",\")[0];\n    (0,_Common_OdsHelper__WEBPACK_IMPORTED_MODULE_0__.searchForUser)(selectedMatter.data.partner.email).then((users) => {\n        let user = users[0];\n        console.log(\"%c Partner name changed to: \" + (user === null || user === void 0 ? void 0 : user.id), \"color: pink; font-size: 20px;\", user);\n        let odsMatterPartner = getPartnerOdsPicker(context);\n        if (!odsMatterPartner)\n            return;\n        if (!user) {\n            odsMatterPartner.selected(false);\n            return;\n        }\n        odsMatterPartner.icon('fa-male');\n        odsMatterPartner.odsName(user.firstName + \" \" + user.surname);\n        odsMatterPartner.odsId(user.id);\n        odsMatterPartner.selected(true);\n    });\n}\nfunction getMatterData() {\n    return __awaiter(this, void 0, void 0, function* () {\n        //get the data from the server without cache\n        return yield $ajax.get(/* webpackIgnore: true */ window.document.location.origin + \"/_ideFiles/SampleData/eDiscovery/matters.json\");\n    });\n}\nfunction generateTempMatterNumber(context) {\n    var _a, _b;\n    let date = new Date();\n    let year = date.getFullYear();\n    let month = date.getMonth() + 1;\n    let day = date.getDate();\n    let hour = date.getHours();\n    let minute = date.getMinutes();\n    let second = date.getSeconds();\n    let millisecond = date.getMilliseconds();\n    let tempMatterNumber = `T${year}${month}${day}${hour}${minute}${second}${millisecond}`;\n    (_b = (_a = context.form) === null || _a === void 0 ? void 0 : _a.fieldsById[enumFields.tempMatterNumber]) === null || _b === void 0 ? void 0 : _b.setValue(tempMatterNumber);\n}\nvar enumFields;\n(function (enumFields) {\n    enumFields[\"customAltEdiscoveryInstructionMatterDetails\"] = \"custom-alt-ediscovery-instruction-matter-details\";\n    enumFields[\"jurisdictionsCountry\"] = \"jurisdictions-country\";\n    enumFields[\"pipelineMatter\"] = \"pipeline-matter\";\n    enumFields[\"expertMatterNumber\"] = \"expert-matter-number\";\n    enumFields[\"expertMatterNumberValue\"] = \"expert-matter-number-value\";\n    enumFields[\"tempMatterNumber\"] = \"temp-matter-number\";\n    enumFields[\"subMatterCode\"] = \"sub-matter-code\";\n    enumFields[\"abcMatterNumber\"] = \"abc-matter-number\";\n    enumFields[\"matterDetails\"] = \"matter-details\";\n})(enumFields || (enumFields = {}));\nvar enumMatterDetailFields;\n(function (enumMatterDetailFields) {\n    enumMatterDetailFields[\"matterDetailsPartnerSelector\"] = \"matter-details-partner-selector\";\n    enumMatterDetailFields[\"matterDetailsPartnerName\"] = \"matter-details-partner-name\";\n    enumMatterDetailFields[\"matterDetailsClientName\"] = \"matter-details-client-name\";\n    enumMatterDetailFields[\"matterDetailsClientCode\"] = \"matter-details-client-code\";\n    enumMatterDetailFields[\"matterDetailsPracticeArea\"] = \"matter-details-practice-area\";\n    enumMatterDetailFields[\"matterDetailsName\"] = \"matter-details-name\";\n    enumMatterDetailFields[\"matterDetailsIb\"] = \"matter-details-ib\";\n})(enumMatterDetailFields || (enumMatterDetailFields = {}));\nfunction getPartnerOdsPicker(context) {\n    return (0,_Common_OdsHelper__WEBPACK_IMPORTED_MODULE_0__.getAllOdsPickerForRole)(context.blade, \"Matter Partner\")[0];\n}\nfunction getClientOdsPicker(context) {\n    return (0,_Common_OdsHelper__WEBPACK_IMPORTED_MODULE_0__.getAllOdsPickerForRole)(context.blade, \"Client\")[0];\n}\n\n\n//# sourceURL=webpack:///./FB_MatterDetails/index.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./FB_MatterDetails/index.ts");
/******/ 	window.FB_MatterDetails = __webpack_exports__;
/******/ 	
/******/ })()
;