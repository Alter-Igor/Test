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
/* harmony export */   BaseIDEAspect: () => (/* binding */ BaseIDEAspect)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _KOConverter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KOConverter */ "./src/WebBased/IDEAspects/BaseClasses/KOConverter.ts");
/* harmony import */ var _ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ObjectHelpers */ "./src/WebBased/IDEAspects/BaseClasses/ObjectHelpers.ts");



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
    constructor(componentName, loadSaveLocation, element, configuration, baseModel, defaults) {
        this.LocationToSaveOrLoadData = loadSaveLocation;
        this.thisComponentName = componentName;
        this.element = element;
        //ShareDo passes the config as well as other stuff, so we need to extract the config
        this.originalConfiguration = configuration;
        this.baseModel = baseModel;
        this.defaults = defaults;
        this.data = undefined;
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
    }
    /**
     * Called by the aspect IDE adapter when the model is saved. Manipulate the
     * model as required.
     */
    onSave(model) {
        this.log("Saving, model passed in we need to persist to", "green", this.data);
        let dataToPersist = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this.data);
        let currentData = (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.getNestedProperty)(model, this.LocationToSaveOrLoadData);
        if (!currentData) {
            this.log("Data does not exist, we will create", "orange");
            (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.setNestedProperty)(model, this.LocationToSaveOrLoadData, {});
            currentData = (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.getNestedProperty)(model, this.LocationToSaveOrLoadData);
        }
        this.log(`Current data at location ${this.LocationToSaveOrLoadData}`, "green", currentData);
        this.log(`Data to persist to location ${this.LocationToSaveOrLoadData} :`, "blue", dataToPersist);
        (0,_ObjectHelpers__WEBPACK_IMPORTED_MODULE_2__.setNestedProperty)(model, this.LocationToSaveOrLoadData, dataToPersist);
    }
    ;
    onDestroy() {
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
    constructor(element, configuration, baseModel) {
        let defaults = {
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
        super("OdsPicker", "aspectData.odsEntityPicker", element, configuration, baseModel, defaults);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNyQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFBQSxDQUFDO0NBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvQmFzZUlERUFzcGVjdC50cyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzLy4vc3JjL1dlYkJhc2VkL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvS09Db252ZXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL0Jhc2VDbGFzc2VzL09iamVjdEhlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy9leHRlcm5hbCB2YXIgXCJrb1wiIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0lERUFzcGVjdHMvLi9zcmMvV2ViQmFzZWQvSURFQXNwZWN0cy9PZHNQaWNrZXIvT2RzUGlja2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xuaW1wb3J0IHsgU2hhcmVkbyB9IGZyb20gXCIuLi8uLi8uLi9JbnRlcmZhY2VzL1NoYXJlRG8vU2hhcmVkb1wiO1xuaW1wb3J0IHsgSVNoYXJlZG9CbGFkZU1vZGVsLCBUU2hhcmVEb0JsYWRlLCBJQ29uZmlndXJhdGlvbkhvc3QgfSBmcm9tIFwiLi4vLi4vLi4vSW50ZXJmYWNlcy9TaGFyZWRvQXNwZWN0TW9kZWxzXCI7XG5pbXBvcnQgeyBJRGVidWcgfSBmcm9tIFwiLi9JRGVidWdcIjtcbmltcG9ydCB7IHRvT2JzZXJ2YWJsZU9iamVjdCB9IGZyb20gXCIuL0tPQ29udmVydGVyXCI7XG5pbXBvcnQgeyBnZXROZXN0ZWRQcm9wZXJ0eSwgc2V0TmVzdGVkUHJvcGVydHkgfSBmcm9tIFwiLi9PYmplY3RIZWxwZXJzXCI7XG5cblxuXG5cbmludGVyZmFjZSBJREVBc3BlY3RDb25maWd1cmF0aW9uIHtcbiAgICBtb2RlbDogSVNoYXJlZG9CbGFkZU1vZGVsO1xuICAgIGJsYWRlOiBUU2hhcmVEb0JsYWRlO1xufVxuXG50eXBlIE9ic2VydmFibGVpZnk8VD4gPSB7XG4gICAgW1AgaW4ga2V5b2YgVF06IGtvLk9ic2VydmFibGU8VFtQXT47XG59O1xuXG5leHBvcnQgdHlwZSBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz4gPSB7IFtLIGluIGtleW9mIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPl06IGtvLk9ic2VydmFibGU8SUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+W0tdPjsgfVxuXG5leHBvcnQgdHlwZSBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248VENvbmZpZz4gPSBJQ29uZmlndXJhdGlvbkhvc3QgJiBUQ29uZmlnICZcbntcbiAgICBkZWJ1ZzogSURlYnVnO1xufVxuLy8gYWJzdHJhY3QgY2xhc3MgQ3JlYXRvcjxUQ29uZmlnPiB7XG4vLyAgICAgcHVibGljIGFic3RyYWN0IEZhY3RvcnlNZXRob2QoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPiwgYmFzZU1vZGVsOiBhbnkpOiBhbnk7XG4vLyB9XG5cbnR5cGUgT2JzZXJ2YWJsZVBlcnNvbjxUQ29uZmlnPiA9IE9ic2VydmFibGVpZnk8SUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+PjtcblxuZXhwb3J0IGNsYXNzIEJhc2VJREVBc3BlY3Q8VENvbmZpZywgVFBlcnNpdGFuY2U+ICB7XG4gICAgb3JpZ2luYWxDb25maWd1cmF0aW9uOiBUQ29uZmlnO1xuICAgIGNvbmZpZ3VyYXRpb246IElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbiAgICBkZWZhdWx0czogVENvbmZpZyB8IHVuZGVmaW5lZDtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBtb2RlbDogYW55O1xuICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgYmxhZGU6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uQWRkRWRpdFNoYXJlZG87XG4gICAgbG9hZGVkOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIHNoYXJlZG9JZDogYW55O1xuICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgIHZhbGlkYXRpb246IGFueTtcbiAgICB2YWxpZGF0aW9uRXJyb3JDb3VudDoga28uT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIGJhc2VNb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbztcbiAgICB0aGlzQ29tcG9uZW50TmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGRhdGE6IFRQZXJzaXRhbmNlIHwgdW5kZWZpbmVkO1xuICAgIExvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YTogc3RyaW5nOyAvL1RoZSBsb2NhdGlvbiB0byBsb2FkIGFuZCBzYXZlIHRoZSBkYXRhIGZyb21cbiAgICBvcHRpb25zOiBPYnNlcnZhYmxlQ29uZmlndXJhdGlvbk9wdGlvbnM8VENvbmZpZz5cblxuICAgIC8qKlxuICAgICAqIEJhc2UgQ29uc3RydWN0b3IgZm9yIGFsbCBJREVBc3BlY3RzLCBmb3JjZXMgdGhlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBsb2FkIGFuZCBzYXZlIG1ldGhvZHNcbiAgICAgKiBAcGFyYW0gY29tcG9uZW50TmFtZSAvL1RoZSBuYW1lIG9mIHRoZSBjb21wb25lbnQgZS5nLiBBc3BlY3QuUXVpY2tWaWV3XG4gICAgICogQHBhcmFtIGxvYWRTYXZlTG9jYXRpb24gLy9UaGUgbG9jYXRpb24gdG8gbG9hZCBhbmQgc2F2ZSB0aGUgZGF0YSBmcm9tIGUuZy4gbW9kZWwuYXNwZWN0LkZvcm1CdWlsZGVyLmZvcm1EYXRhXG4gICAgICogQHBhcmFtIGVsZW1lbnQgLy9UaGUgZWxlbWVudCB0aGF0IHRoZSBhc3BlY3QgaXMgYm91bmQgdG9cbiAgICAgKiBAcGFyYW0gY29uZmlndXJhdGlvbiAvL1RoZSBjb25maWd1cmF0aW9uIHBhc3NlZCBpbiBmcm9tIHRoZSBibGFkZSBhbmQgdGhlIGRlc2lnbiB0aW1lIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0gYmFzZU1vZGVsIC8vVGhlIGJhc2UgbW9kZWwgcGFzc2VkIGluIGZyb20gdGhlIGJsYWRlXG4gICAgICogQHBhcmFtIGRlZmF1bHRzIC8vVGhlIGRlZmF1bHRzIHBhc3NlZCBpbiBmcm9tIHRoZSB3aWRnZXQgdG8gc2V0IGluY2FzZSBvZiBiYWQgY29uZmlndXJhdGlvbiBvciBtaXNzaW5nIGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb21wb25lbnROYW1lOiBzdHJpbmcsIGxvYWRTYXZlTG9jYXRpb246IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIGNvbmZpZ3VyYXRpb246IFRDb25maWcsIGJhc2VNb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbywgZGVmYXVsdHM6IFRDb25maWcpIHtcblxuICAgICAgICB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSA9IGxvYWRTYXZlTG9jYXRpb247XG4gICAgICAgIHRoaXMudGhpc0NvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAvL1NoYXJlRG8gcGFzc2VzIHRoZSBjb25maWcgYXMgd2VsbCBhcyBvdGhlciBzdHVmZiwgc28gd2UgbmVlZCB0byBleHRyYWN0IHRoZSBjb25maWdcbiAgICAgICAgdGhpcy5vcmlnaW5hbENvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uIGFzIElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxUQ29uZmlnPjtcbiAgICAgICAgdGhpcy5iYXNlTW9kZWwgPSBiYXNlTW9kZWw7XG4gICAgICAgIHRoaXMuZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICAgICAgdGhpcy5kYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBNZXJnZSB0aGUgY29uZmlndXJhdGlvbiB3aXRoIHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSAkLmV4dGVuZCh0aGlzLmRlZmF1bHRzLCB0aGlzLm9yaWdpbmFsQ29uZmlndXJhdGlvbikgYXMgSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPFRDb25maWc+O1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAvL2NyZWF0ZSBhIG5ldyBtb2RlbFxuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5jb25maWd1cmF0aW9uLl9ob3N0Lm1vZGVsO1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLm1vZGVsLmNhbkVkaXQ7XG4gICAgICAgIHRoaXMuYmxhZGUgPSB0aGlzLmNvbmZpZ3VyYXRpb24uX2hvc3QuYmxhZGU7XG4gICAgICAgIHRoaXMubG9hZGVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG4gICAgICAgIC8vIE1hcCB0aGUgYmFzZSBtb2RlbCBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMuc2hhcmVkb0lkID0gdGhpcy5jb25maWd1cmF0aW9uLl9ob3N0Py5tb2RlbC5pZDtcbiAgICAgICAgaWYgKCF0aGlzLnNoYXJlZG9JZCB8fCB0aGlzLnNoYXJlZG9JZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIk5vIHNoYXJlZG9JZCBmb3VuZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSA9IHRoaXMuY29uZmlndXJhdGlvbi5faG9zdC5tb2RlbC5zaGFyZWRvVHlwZVN5c3RlbU5hbWU7XG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUgfHwgdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJObyBzaGFyZWRvVHlwZVN5c3RlbU5hbWUgZm91bmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0b09ic2VydmFibGVPYmplY3QodGhpcy5jb25maWd1cmF0aW9uKTtcblxuICAgICAgICAvLyBWYWxpZGF0aW9uXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbiA9IHt9O1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvckNvdW50ID0ga28ub2JzZXJ2YWJsZSgwKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIHdoZW4gdGhlIG1vZGVsIGlzIHNhdmVkLiBNYW5pcHVsYXRlIHRoZVxuICAgICAqIG1vZGVsIGFzIHJlcXVpcmVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBvblNhdmUobW9kZWw6IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZyhcIlNhdmluZywgbW9kZWwgcGFzc2VkIGluIHdlIG5lZWQgdG8gcGVyc2lzdCB0b1wiLCBcImdyZWVuXCIsIHRoaXMuZGF0YSk7XG4gICAgICAgIGxldCBkYXRhVG9QZXJzaXN0ID0ga28udG9KUyh0aGlzLmRhdGEpO1xuICAgICAgICBsZXQgY3VycmVudERhdGEgPSBnZXROZXN0ZWRQcm9wZXJ0eShtb2RlbCwgdGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGEpO1xuICAgICAgICBpZiAoIWN1cnJlbnREYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIkRhdGEgZG9lcyBub3QgZXhpc3QsIHdlIHdpbGwgY3JlYXRlXCIsIFwib3JhbmdlXCIpO1xuICAgICAgICAgICAgc2V0TmVzdGVkUHJvcGVydHkobW9kZWwsIHRoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhLCB7fSk7XG4gICAgICAgICAgICBjdXJyZW50RGF0YSA9IGdldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2coYEN1cnJlbnQgZGF0YSBhdCBsb2NhdGlvbiAke3RoaXMuTG9jYXRpb25Ub1NhdmVPckxvYWREYXRhfWAsIFwiZ3JlZW5cIiwgY3VycmVudERhdGEpO1xuICAgICAgICB0aGlzLmxvZyhgRGF0YSB0byBwZXJzaXN0IHRvIGxvY2F0aW9uICR7dGhpcy5Mb2NhdGlvblRvU2F2ZU9yTG9hZERhdGF9IDpgLCBcImJsdWVcIiwgZGF0YVRvUGVyc2lzdCk7XG4gICAgICAgIHNldE5lc3RlZFByb3BlcnR5KG1vZGVsLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSwgZGF0YVRvUGVyc2lzdCk7XG4gICAgfTtcblxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uRGVzdHJveVwiKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJ5IHRoZSBVSSBmcmFtZXdvcmsgYWZ0ZXIgaW5pdGlhbCBjcmVhdGlvbiBhbmQgYmluZGluZyB0byBsb2FkIGRhdGFcbiAgICAgKiBpbnRvIGl0J3MgbW9kZWxcbiAgICAgKi9cbiAgICBsb2FkQW5kQmluZCgpIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBsb2FkQW5kQmluZFwiKTtcbiAgICAgICAgdGhpcy5sb2coXCJMb2FkaW5nIGRhdGEgKG1vZGVsOmFueSkgcGFzc2VkIGluXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIHRoaXMubG9nKFwiTG9hZGluZyBkYXRhIGJhc2VkIG9uIGxvY2F0aW9uIHRvIHNhdmVcIiwgXCJncmVlblwiLCB0aGlzLkxvY2F0aW9uVG9TYXZlT3JMb2FkRGF0YSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBieSB0aGUgYXNwZWN0IElERSBhZGFwdGVyIGJlZm9yZSB0aGUgbW9kZWwgaXMgc2F2ZWRcbiAgICAgKi9cbiAgICBvbkJlZm9yZVNhdmUobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkJlZm9yZVNhdmVcIik7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciBhZnRlciB0aGUgbW9kZWwgaGFzIGJlZW4gc2F2ZWQuXG4gICAgICovXG4gICAgb25BZnRlclNhdmUobW9kZWw6IFNoYXJlZG8uQ29yZS5DYXNlLlNoYXJlZG8uTW9kZWxzLlNoYXJlZG8pIHtcbiAgICAgICAgdGhpcy5sb2coXCJJREVBc3BlY3RzLkV4YW1wbGUgOiBvbkFmdGVyU2F2ZVwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYnkgdGhlIGFzcGVjdCBJREUgYWRhcHRlciB3aGVuIGl0IHJlbG9hZHMgYXNwZWN0IGRhdGFcbiAgICAgKi9cbiAgICBvblJlbG9hZChtb2RlbDogU2hhcmVkby5Db3JlLkNhc2UuU2hhcmVkby5Nb2RlbHMuU2hhcmVkbykge1xuICAgICAgICB0aGlzLmxvZyhcIklERUFzcGVjdHMuRXhhbXBsZSA6IG9uUmVsb2FkXCIpO1xuICAgICAgICBcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFByb3ZpZGVzIGxvZ2dpbmcgZm9yIHRoZSBjb21wb25lbnQgYmFzZWQgb24gdGhlIGRlYnVnIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBcbiAgICAgKiBAcGFyYW0gY29sb3IgXG4gICAgICogQHBhcmFtIGRhdGEgXG4gICAgICovXG4gICAgbG9nKG1lc3NhZ2U6IHN0cmluZywgY29sb3I/OiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5kZWJ1Zz8uZW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5kZWJ1Zy5sb2dUb0NvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSBjb2xvciA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICAvLyBsZXQgbGluZU5vID0gZXh0cmFjdExpbmVOdW1iZXJGcm9tU3RhY2soKG5ldyBFcnJvcigpKS5zdGFjayk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjICR7dGhpcy50aGlzQ29tcG9uZW50TmFtZX0gLSAke21lc3NhZ2V9YCwgYGNvbG9yOiR7Y29sb3J9YCwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlT2JqZWN0PFQgZXh0ZW5kcyBvYmplY3Q+KG9iajogVCk6IHsgW0sgaW4ga2V5b2YgVF06IGtvLk9ic2VydmFibGU8VFtLXT4gfSB7XG4gICAgY29uc3QgcmVzdWx0OiBhbnkgPSB7fTtcblxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgLy9jaGVjayBpZiBvYmpba2V5XSBpcyBhbHJlYWR5IGEgb2JzZXJ2YWJsZVxuICAgICAgICAgICAgaWYgKGtvLmlzT2JzZXJ2YWJsZShvYmpba2V5XSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBrby5vYnNlcnZhYmxlKG9ialtrZXldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59IiwiXG5leHBvcnQgZnVuY3Rpb24gc2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHByb3BlcnR5UGF0aC5zcGxpdCgnLicpO1xuICAgIGxldCBjdXJyZW50ID0gb2JqO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCBwcm9wID0gcHJvcGVydGllc1tpXTtcbiAgICAgICAgaWYgKCFjdXJyZW50W3Byb3BdKSB7XG4gICAgICAgICAgICBjdXJyZW50W3Byb3BdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcHJvcF07XG4gICAgfVxuICAgIGN1cnJlbnRbcHJvcGVydGllc1twcm9wZXJ0aWVzLmxlbmd0aCAtIDFdXSA9IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVzdGVkUHJvcGVydHkob2JqOiBhbnksIHByb3BlcnR5UGF0aDogc3RyaW5nKTogYW55IHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gcHJvcGVydHlQYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnQgPSBvYmo7XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcGVydGllcykge1xuICAgICAgICBpZiAoY3VycmVudFtwcm9wXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50W3Byb3BdO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ga287IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xuaW1wb3J0IHtJT0RTUGlja2VyQ29uZmlndXJhdGlvbn0gZnJvbSBcIi4vSU9kc1BpY2tlckNvbmZpZ1wiXG5pbXBvcnQgeyBCYXNlSURFQXNwZWN0IH0gZnJvbSBcIi4uL0Jhc2VDbGFzc2VzL0Jhc2VJREVBc3BlY3RcIjtcbiBcbiBcbmludGVyZmFjZSBPZHNFbnRpdHlNb2RlbCB7XG4gICAgcm9sZU5hbWU6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHJvbGVTeXN0ZW1OYW1lOiBrby5PYnNlcnZhYmxlPHN0cmluZz47XG4gICAgcGFydGljaXBhbnRUeXBlOiBrby5PYnNlcnZhYmxlPHN0cmluZz47XG4gICAgb2RzSWQ6IGtvLk9ic2VydmFibGU8c3RyaW5nPjtcbiAgICBvZHNOYW1lOiBrby5PYnNlcnZhYmxlPHN0cmluZz47XG4gICAgc3RhdHVzOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIGljb246IGtvLk9ic2VydmFibGU8c3RyaW5nPjtcbiAgICBzZWxlY3RlZDoga28uT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgICBzaG93U2VhcmNoT2RzOiBib29sZWFuO1xuICAgIHJlcXVpcmVkOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIGFkZE1lbnVPcHRpb25zOiBrby5PYnNlcnZhYmxlQXJyYXk8YW55Pjtcbn1cblxuXG4vLyBleHBvcnQgZnVuY3Rpb24gT2RzUGlja2VyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uLCBiYXNlTW9kZWw6IGFueSk6IE9kc1BpY2tlckNsYXNzIHtcbi8vICAgICByZXR1cm4gbmV3IE9kc1BpY2tlckNsYXNzKGVsZW1lbnQsIGNvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbCk7XG4vLyB9XG5cbmV4cG9ydCBjbGFzcyBPZHNQaWNrZXIgZXh0ZW5kcyBCYXNlSURFQXNwZWN0PElPRFNQaWNrZXJDb25maWd1cmF0aW9uLCBhbnk+IHtcbiAgICBvZHNFbnRpdGllczoga28uT2JzZXJ2YWJsZUFycmF5PGFueT47XG4gICAgc2hvd0FzcGVjdDoga28uUHVyZUNvbXB1dGVkPGJvb2xlYW4+IHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IElPRFNQaWNrZXJDb25maWd1cmF0aW9uLCBiYXNlTW9kZWw6IGFueSkge1xuXG4gICAgICAgIGxldCBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIHJvbGVDb25maWdNb2RlbHM6IFtdLFxuICAgICAgICAgICAgc2hvd1ByZVNoYXJlZG86IHRydWUsXG4gICAgICAgICAgICBzaG93UG9zdFNoYXJlZG86IHRydWUsXG4gICAgICAgICAgICBub09kc0VudGl0eU1lc3NhZ2U6ICdObyBwYXJ0aWNpcGFudCBzZWxlY3RlZCcsXG4gICAgICAgICAgICBub09kc0VudGl0eVJlcXVpcmVkTWVzc2FnZTogJ1BhcnRpY2lwYW50IHJlcXVpcmVkJyxcbiAgICAgICAgICAgIG5hcnJvd0xhYmVsOiBmYWxzZSxcbiAgICAgICAgICAgIGRlYnVnOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbG9nVG9Db25zb2xlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcbiAgICAgICAgc3VwZXIoXCJPZHNQaWNrZXJcIiwgXCJhc3BlY3REYXRhLm9kc0VudGl0eVBpY2tlclwiLCBlbGVtZW50LCBjb25maWd1cmF0aW9uLCBiYXNlTW9kZWwsZGVmYXVsdHMgKVxuXG4gICAgICAgIC8vIEJhc2UgcHJvcGVydGllc1xuICAgICAgICB0aGlzLm9kc0VudGl0aWVzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICB9IFxuICBcblxuICAgIC8vIHByaXZhdGUgaW5pdGlhbGlzZSgpIHsvLyEgTm90ZTogVUkgZnJhbWV3b3JrIGxvb2tzIGZvciB0aGlzIG1ldGhvZCBuYW1lIGFuZCBpZiBmb3VuZCBiZWhhdmVzIGRpZmZlcmVudGx5IGFuZCB3b250IGNhbGwgbG9hZEFuZEJpbmRcblxuICAgICAgICBwcml2YXRlIHNldHVwKCkge1xuICAgICAgICAvLyBNYXAgdGhlIHJvbGVDb25maWdNb2RlbHNcblxuICAgICAgICB0aGlzLm9wdGlvbnMucm9sZUNvbmZpZ01vZGVscygpLmZvckVhY2gocm9sZUNvbmZpZ01vZGVsID0+IHtcbiAgICAgICAgICAgIHRoaXMub2RzRW50aXRpZXMucHVzaCh0aGlzLmdldE9kc0VudGl0eU1vZGVsKHJvbGVDb25maWdNb2RlbCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNob3dBc3BlY3QgPSBrby5wdXJlQ29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zaG93UHJlU2hhcmVkbygpKSB7XG4gICAgICAgICAgICAgICAgLy8gV2Ugc2hvdyB0aGUgd2lkZ2V0IG9uIHNhdmVcbiAgICAgICAgICAgICAgICAkdWkud2lkZ2V0cy5zaG93KHRoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnNob3dQb3N0U2hhcmVkbygpICYmIHRoaXMuc2hhcmVkb0lkKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBzaG93IHRoZSB3aWRnZXQgb24gc2F2ZVxuICAgICAgICAgICAgICAgICR1aS53aWRnZXRzLnNob3codGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdlIGhpZGUgdGhlIHdpZGdldCBvbiBsb2FkXG4gICAgICAgICAgICAkdWkud2lkZ2V0cy5oaWRlKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvdmVycmlkZSBsb2FkQW5kQmluZCgpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmxvZyhcIkxvYWRpbmcgZGF0YSAobW9kZWwpIHBhc3NlZCBpblwiLCBcImdyZWVuXCIpO1xuICAgICAgICBzdXBlci5sb2FkQW5kQmluZCgpO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsLmFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyKSB7XG4gICAgICAgICAgICBfLmVhY2godGhpcy5vZHNFbnRpdGllcygpLFxuICAgICAgICAgICAgICAgICAob2RzRW50aXR5OmFueSkgPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gXy5maW5kKHRoaXMubW9kZWwuYXNwZWN0RGF0YS5vZHNFbnRpdHlQaWNrZXIub2RzRW50aXRpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW06YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucm9sZVN5c3RlbU5hbWUgPT09IG9kc0VudGl0eS5yb2xlU3lzdGVtTmFtZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEub2RzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9kc0VudGl0eS5wYXJ0aWNpcGFudFR5cGUoZGF0YS5wYXJ0aWNpcGFudFR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2RzRW50aXR5Lm9kc0lkKGRhdGEub2RzSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2RzRW50aXR5Lm9kc05hbWUoZGF0YS5vZHNOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9kc0VudGl0eS5zdGF0dXMoZGF0YS5pc0FjdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZHNFbnRpdHkuc2VsZWN0ZWQodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnBhcnRpY2lwYW50VHlwZSA9PT0gXCJwZXJzb25cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZHNFbnRpdHkuaWNvbihcImZhLW1hbGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5wYXJ0aWNpcGFudFR5cGUgPT09IFwib3JnYW5pc2F0aW9uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2RzRW50aXR5Lmljb24oXCJmYS11bml2ZXJzaXR5XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkQWRkT3B0aW9ucygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbGlkYXRpb25zKCk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgbG9hZEFkZE9wdGlvbnMoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5sb2coXCJMb2FkaW5nIGFkZCBvcHRpb25zXCIsIFwiZ3JlZW5cIik7XG4gICAgICAgIGxldCBtb2RlbHMgPSBrby51bndyYXAodGhpcy5vcHRpb25zLnJvbGVDb25maWdNb2RlbHMoKSk7XG5cbiAgICAgICAgbW9kZWxzLmZvckVhY2goIChtb2RlbDphbnkpPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkRW50aXR5ID0ga28ub2JzZXJ2YWJsZSgpO1xuICBcbiAgICAgICAgICAgIG1vZGVsLmFkZE1lbnVPcHRpb25zID0gW107XG4gICAgICAgICAgICBsZXQgYyA9IFNoYXJlZG8uQ29yZS5DYXNlLlBhcnRpY2lwYW50cy5BZGRQYXJ0aWNpcGFudFNlcnZpY2U7XG4gICAgICAgICAgICBsZXQgcCA9IG5ldyBjKHtcbiAgICAgICAgICAgICAgICBzaGFyZWRvSWQ6IHRoaXMuc2hhcmVkb0lkLFxuICAgICAgICAgICAgICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZTogdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUoKSwgLy8hIHRlc3QgaXQgdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUoKSBvciB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZVxuICAgICAgICAgICAgICAgIHJvbGVTeXN0ZW1OYW1lczogW2tvLnVud3JhcChtb2RlbC5yb2xlU3lzdGVtTmFtZSldLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5OiBzZWxlY3RlZEVudGl0eSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9TZWFyY2g6IG1vZGVsLnNob3dTZWFyY2hPZHNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW9kZWwuYWRkU2VydmljZSA9IG5ldyBTaGFyZWRvLkNvcmUuQ2FzZS5QYXJ0aWNpcGFudHMuQWRkUGFydGljaXBhbnRTZXJ2aWNlKHtcbiAgICAgICAgICAgICAgICBzaGFyZWRvSWQ6IHRoaXMuc2hhcmVkb0lkLFxuICAgICAgICAgICAgICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZTogdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUoKSwgLy8hIHRlc3QgaXQgdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUoKSBvciB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZVxuICAgICAgICAgICAgICAgIHJvbGVTeXN0ZW1OYW1lczogW2tvLnVud3JhcChtb2RlbC5yb2xlU3lzdGVtTmFtZSldLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRW50aXR5OiBzZWxlY3RlZEVudGl0eSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9TZWFyY2g6IG1vZGVsLnNob3dTZWFyY2hPZHNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxlY3RlZEVudGl0eS5zdWJzY3JpYmUoIChlbnRpdHkpPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtYXRjaCA9IHRoaXMub2RzRW50aXRpZXMoKS5maW5kKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga28udW53cmFwKHgucm9sZVN5c3RlbU5hbWUpID09PSBrby51bndyYXAobW9kZWwucm9sZVN5c3RlbU5hbWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFtYXRjaClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgbWF0Y2gub2RzSWQoZW50aXR5LmlkKTtcbiAgICAgICAgICAgICAgICAkdWkuZXZlbnRzLmJyb2FkY2FzdChcIlNoYXJlZG8uQ29yZS5DYXNlLkFzcGVjdHMuV2lkZ2V0cy5PZHNFbnRpdHlQaWNrZXIub2RzRW50aXR5Q2hhbmdlZFwiLCBtYXRjaCk7XG4gICAgICAgICAgICAgICAgJHVpLmV2ZW50cy5icm9hZGNhc3QoXCJvZHNlbnRpdHlwaWNrZXIuZW50aXR5LWNoYW5nZWRcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5OiBrby50b0pTKG1hdGNoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlSWQ6IHRoaXMubW9kZWwuaW5zdGFuY2VJZFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRFbnRpdHlEZXRhaWxzKGVudGl0eS5pZCwgbWF0Y2gpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBsb2FkZXJzID0gbW9kZWxzXG4gICAgICAgICAgICAubWFwKCAobW9kZWw6YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsLmFkZFNlcnZpY2UubG9hZCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgJC53aGVuLmFwcGx5KCQsIGxvYWRlcnMpXG4gICAgICAgICAgICAuYWx3YXlzKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbW9kZWxzLmZvckVhY2goIChtb2RlbDphbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lbnUgPSBtb2RlbC5hZGRTZXJ2aWNlLmdldEFkZE1lbnUoKTtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuYWRkTWVudU9wdGlvbnMgPSBtZW51O1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbnRpdHkgPSBfLmZpbmQodGhpcy5vZHNFbnRpdGllcygpLCAgKHg6YW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga28udW53cmFwKHgucm9sZVN5c3RlbU5hbWUpID09PSBrby51bndyYXAobW9kZWwucm9sZVN5c3RlbU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LmFkZE1lbnVPcHRpb25zKG1lbnUpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdXBkYXRlVmFsaWRhdGlvbnMoKSB7XG5cblxuICAgICAgICBsZXQgdmFsaWRhdGlvbkVycm9yQ291bnQgPSBfLmZpbHRlcih0aGlzLm9kc0VudGl0aWVzKCksXG4gICAgICAgICAgICAgKGVudGl0eTphbnkpID0+e1xuICAgICAgICAgICAgICAgIHJldHVybiAoZW50aXR5LnJlcXVpcmVkKCkgPT09IHRydWUpICYmIChlbnRpdHkuc2VsZWN0ZWQoKSA9PT0gZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGlmICghdmFsaWRhdGlvbkVycm9yQ291bnQpIHRoaXMudmFsaWRhdGlvbigwKTtcbiAgICAgICAgZWxzZSB0aGlzLnZhbGlkYXRpb25FcnJvckNvdW50KHZhbGlkYXRpb25FcnJvckNvdW50Lmxlbmd0aCk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgZ2V0T2RzRW50aXR5TW9kZWwobW9kZWw6IGFueSk6IE9kc0VudGl0eU1vZGVsIHtcblxuICAgICAgICB0aGlzLmxvZyhcIkdldHRpbmcgT2RzRW50aXR5TW9kZWxcIiwgXCJncmVlblwiLCBtb2RlbCk7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChtb2RlbC5vZHNJZClcbiAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICBsZXQgcmV0dXJuTW9kZWwgPSB7XG4gICAgICAgICAgICByb2xlTmFtZTogbW9kZWwuZGlzcGxheU5hbWUsXG4gICAgICAgICAgICBsYWJlbDogbW9kZWwubGFiZWwsXG4gICAgICAgICAgICByb2xlU3lzdGVtTmFtZToga28ub2JzZXJ2YWJsZShtb2RlbC5yb2xlU3lzdGVtTmFtZSksXG4gICAgICAgICAgICBwYXJ0aWNpcGFudFR5cGU6IGtvLm9ic2VydmFibGUobW9kZWwucGFydGljaXBhbnRUeXBlKSxcbiAgICAgICAgICAgIG9kc0lkOiBrby5vYnNlcnZhYmxlKG1vZGVsLm9kc0lkKSxcbiAgICAgICAgICAgIG9kc05hbWU6IGtvLm9ic2VydmFibGUobW9kZWwub2RzTmFtZSksXG4gICAgICAgICAgICBzdGF0dXM6IGtvLm9ic2VydmFibGUobW9kZWwuaXNBY3RpdmUpLFxuICAgICAgICAgICAgaWNvbjoga28ub2JzZXJ2YWJsZShtb2RlbC5pY29uKSxcbiAgICAgICAgICAgIHNlbGVjdGVkOiBrby5vYnNlcnZhYmxlKHNlbGVjdGVkKSxcbiAgICAgICAgICAgIHNob3dTZWFyY2hPZHM6IG1vZGVsLnNob3dTZWFyY2hPZHMsXG4gICAgICAgICAgICByZXF1aXJlZDoga28ub2JzZXJ2YWJsZShtb2RlbC5yZXF1aXJlZCksXG4gICAgICAgICAgICBhZGRNZW51T3B0aW9uczoga28ub2JzZXJ2YWJsZUFycmF5KG1vZGVsLmFkZE1lbnVPcHRpb25zKVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIERlZmF1bHQgdG8gY3VycmVudCB1c2VyP1xuICAgICAgICB0aGlzLmFwcGx5RGVmYXVsdFVzZXJQcmVmZXJlbmNlKHJldHVybk1vZGVsLCBtb2RlbCk7XG5cbiAgICAgICAgcmV0dXJuTW9kZWwuc2VsZWN0ZWQuc3Vic2NyaWJlKHRoaXMudXBkYXRlVmFsaWRhdGlvbnMuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgcmV0dXJuIHJldHVybk1vZGVsO1xuICAgIH07XG5cbiAgICBwcml2YXRlIGFwcGx5RGVmYXVsdFVzZXJQcmVmZXJlbmNlKG9kc0VudGl0eU1vZGVsOiBhbnksIHJvbGVDb25maWc6IGFueSk6IHZvaWQge1xuXG5cbiAgICAgICAgbGV0IGlzTmV3ID0gIXRoaXMuc2hhcmVkb0lkKCk7XG4gICAgICAgIGlmICghaXNOZXcpIHJldHVybjtcblxuICAgICAgICBsZXQgY3VycmVudFVzZXJJZCA9ICR1aS5wYWdlQ29udGV4dC51c2VyICYmIGtvLnVud3JhcCgkdWkucGFnZUNvbnRleHQudXNlci51c2VyaWQpO1xuICAgICAgICBpZiAoIWN1cnJlbnRVc2VySWQpIHJldHVybjtcblxuICAgICAgICBpZiAocm9sZUNvbmZpZy5kZWZhdWx0VG9DdXJyZW50VXNlciAmJiAhcm9sZUNvbmZpZy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgb2RzRW50aXR5TW9kZWwuc2VsZWN0ZWQodHJ1ZSk7XG4gICAgICAgICAgICBvZHNFbnRpdHlNb2RlbC5vZHNJZChjdXJyZW50VXNlcklkKTtcbiAgICAgICAgICAgIG9kc0VudGl0eU1vZGVsLm9kc05hbWUoJHVpLnBhZ2VDb250ZXh0LnVzZXIuZmlyc3RuYW1lKCkgKyBcIiBcIiArICR1aS5wYWdlQ29udGV4dC51c2VyLmxhc3RuYW1lKCkpO1xuICAgICAgICAgICAgb2RzRW50aXR5TW9kZWwucGFydGljaXBhbnRUeXBlKFwicGVyc29uXCIpO1xuICAgICAgICAgICAgb2RzRW50aXR5TW9kZWwuaWNvbihcImZhLW1hbGVcIik7ICAgIC8vIFRPRE8gZnJvbSBwYXJ0aWNpcGFudCB0eXBlIGNvbmZpZ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZVBhcnRpY2lwYW50KHJlbW92ZWU6IGFueSk6IHZvaWQge1xuXG5cbiAgICAgICAgbGV0IGRhdGEgPSBfLmZpbmQodGhpcy5vZHNFbnRpdGllcygpLFxuICAgICAgICAgICAgIChpdGVtOmFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnJvbGVTeXN0ZW1OYW1lKCkgPT09IHJlbW92ZWUucm9sZVN5c3RlbU5hbWUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBkYXRhLnNlbGVjdGVkKGZhbHNlKTtcbiAgICAgICAgICAgIGRhdGEub2RzSWQobnVsbCk7XG4gICAgICAgICAgICBkYXRhLm9kc05hbWUobnVsbCk7XG4gICAgICAgICAgICBkYXRhLnN0YXR1cyhudWxsKTtcbiAgICAgICAgICAgIGRhdGEuaWNvbihudWxsKTtcbiAgICAgICAgICAgICR1aS5ldmVudHMuYnJvYWRjYXN0KFwiU2hhcmVkby5Db3JlLkNhc2UuQXNwZWN0cy5XaWRnZXRzLk9kc0VudGl0eVBpY2tlci5vZHNFbnRpdHlDaGFuZ2VkXCIsIHJlbW92ZWUpO1xuICAgICAgICAgICAgJHVpLmV2ZW50cy5icm9hZGNhc3QoXCJvZHNlbnRpdHlwaWNrZXIuZW50aXR5LWNoYW5nZWRcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eToga28udG9KUyhyZW1vdmVlKSxcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VJZDogdGhpcy5tb2RlbC5pbnN0YW5jZUlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRFbnRpdHlEZXRhaWxzKG9kc0lkOiBhbnksIGl0ZW06IGFueSk6IHZvaWQge1xuXG5cbiAgICAgICAgJHVpLnN0YXJ0V2FpdGluZ0Zvcignb2RzRW50aXR5RGV0YWlscycpO1xuXG4gICAgICAgICRhamF4LmdldChcIi9hcGkvb2RzL1wiICsgb2RzSWQgKyBcIi90eXBlXCIsXG4gICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAob2RzRGF0YTphbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2RzRGF0YS50eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBlcnNvblxuICAgICAgICAgICAgICAgICAgICBpdGVtLmljb24oXCJmYS1tYWxlXCIpOyAgIC8vIFRPRE8gZ2V0IGZyb20gY29uZmlnLnBhcnRpY2lwYW50VHlwZXMuaWNvbkNsYXNzXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucGFydGljaXBhbnRUeXBlKFwicGVyc29uXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob2RzRGF0YS50eXBlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9yZ2FuaXNhdGlvblxuICAgICAgICAgICAgICAgICAgICBpdGVtLmljb24oXCJmYS1iYW5rXCIpOyAgIC8vIFRPRE8gZ2V0IGZyb20gY29uZmlnLnBhcnRpY2lwYW50VHlwZXMuaWNvbkNsYXNzXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucGFydGljaXBhbnRUeXBlKFwib3JnYW5pc2F0aW9uXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpdGVtLnN0YXR1cyhvZHNEYXRhLmlzQWN0aXZlKTtcbiAgICAgICAgICAgICAgICBpdGVtLm9kc05hbWUob2RzRGF0YS5uYW1lKTtcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgJHVpLnN0b3BXYWl0aW5nRm9yKCdvZHNFbnRpdHlEZXRhaWxzJyk7XG5cbiAgICAgICAgICAgIH0pO1xuICBcbiAgICB9O1xuICAgXG4gICAgb3ZlcnJpZGUgb25TYXZlKG1vZGVsOiBhbnkpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmxvZyhcIlNhdmluZywgbW9kZWwgcGFzc2VkIGluIHdlIG5lZWQgdG8gcGVyc2lzdCB0b1wiLCBcImdyZWVuXCIsIHRoaXMuZGF0YSk7XG4gICAgICAgIGxldCBvZHNFbnRpdGllcyA9IGtvLnRvSlModGhpcy5vZHNFbnRpdGllcyk7XG4gICAgICAgIGlmICghbW9kZWwuYXNwZWN0RGF0YS5vZHNFbnRpdHlQaWNrZXIpXG4gICAgICAgICAgICBtb2RlbC5hc3BlY3REYXRhLm9kc0VudGl0eVBpY2tlciA9IHsgb2RzRW50aXRpZXM6IFtdIH07XG5cbiAgICAgICAgbGV0IGVudGl0aWVzID0gbW9kZWwuYXNwZWN0RGF0YS5vZHNFbnRpdHlQaWNrZXIub2RzRW50aXRpZXM7XG4gICAgICAgIG9kc0VudGl0aWVzLmZvckVhY2goICh4KSA9PiB7XG4gICAgICAgICAgICBlbnRpdGllcy5wdXNoKHgpO1xuICAgICAgICB9KTtcbiAgICB9O1xufSAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=