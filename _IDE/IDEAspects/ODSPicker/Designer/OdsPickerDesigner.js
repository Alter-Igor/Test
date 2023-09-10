/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

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
/*!*************************************************************************!*\
  !*** ./src/WebBased/IDEAspects/OdsPicker/Designer/OdsPickerDesigner.ts ***!
  \*************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OdsPickerDesigner: () => (/* binding */ OdsPickerDesigner),
/* harmony export */   OdsPickerDesignerClass: () => (/* binding */ OdsPickerDesignerClass)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);

function OdsPickerDesigner(element, configuration, baseModel) {
    return new OdsPickerDesignerClass(element, configuration, baseModel);
}
class OdsPickerDesignerClass {
    constructor(element, configuration, baseModel) {
        let defaults = {
            showPreSharedo: false,
            showPostSharedo: false,
            narrowLabel: false,
            roleConfigModels: []
        };
        let optionDefaults = {
            aspectIsReadOnly: null,
            entitySystemName: null
        };
        this.configuration = $.extend(defaults, configuration);
        this.options = $.extend(optionDefaults, this.configuration);
        this.sharedoTypeSystemName = this.options.entitySystemName;
        this.loaded = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(false);
        this.lovs = {
            roles: knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray()
        };
        this.model = {
            showPreSharedo: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(this.options.showPreSharedo),
            showPostSharedo: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(this.options.showPostSharedo),
            narrowLabel: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(this.options.narrowLabel),
            roleConfigModels: knockout__WEBPACK_IMPORTED_MODULE_0__.observableArray()
        };
        configuration.roleConfigModels.forEach((x) => {
            this.addRole(x);
        });
        this.hasValidationErrors = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed(() => {
            var roles = this.model.roleConfigModels();
            if (roles.length === 0)
                return true;
            return roles.some(function (x) {
                return x.validation.hasErrors();
            });
        });
    }
    loadAndBind() {
        $ui.stacks.lock();
        $ajax.get("/api/admin/sharedoTypes/" + this.sharedoTypeSystemName + "/participantRoles")
            .done((response) => {
            var ordered = _.sortBy(response, (x) => { return x.participantRoleType; });
            this.lovs.roles(ordered);
        })
            .always(() => {
            this.loaded(true);
            $ui.stacks.unlock();
        });
    }
    ;
    saveAndClose() {
        if (this.hasValidationErrors())
            return;
        var model = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this.model);
        model.roleConfigModels.forEach(function (x) {
            delete x.validation;
        });
        $ui.stacks.close(this, model);
    }
    ;
    discard() {
        $ui.stacks.cancel(this);
    }
    ;
    addRole(role) {
        role = role || {};
        let model = {
            roleSystemName: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(role.roleSystemName),
            label: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(role.label),
            required: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(role.required),
            showSearchOds: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(role.showSearchOds),
            defaultToCurrentUser: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(role.defaultToCurrentUser || false),
            displayName: knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed(() => {
                let role = model.roleSystemName();
                if (!role)
                    return null;
                var match = this.lovs.roles().find(x => x.participantRoleType === role);
                if (!match)
                    return null;
                return match.participantRoleTypeName;
            })
        };
        model.validation = {
            roleSystemName: Validator.required(this, model.roleSystemName, "Role is required"),
            hasErrors: knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed(() => {
                if (model.validation.roleSystemName())
                    return true;
                return false;
            })
        };
        this.model.roleConfigModels.push(model);
    }
    ;
    removeRole(role) {
        this.model.roleConfigModels.remove(role);
    }
    ;
}

})();

var __webpack_export_target__ = (IDEAspects = typeof IDEAspects === "undefined" ? {} : IDEAspects);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7SUFDNUMsQ0FBQztJQUFBLENBQUM7SUFFRixVQUFVLENBQUMsSUFBUTtRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFBQSxDQUFDO0NBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9JREVBc3BlY3RzL2V4dGVybmFsIHZhciBcImtvXCIiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0lERUFzcGVjdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9JREVBc3BlY3RzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vSURFQXNwZWN0cy8uL3NyYy9XZWJCYXNlZC9JREVBc3BlY3RzL09kc1BpY2tlci9EZXNpZ25lci9PZHNQaWNrZXJEZXNpZ25lci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGtvOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gT2RzUGlja2VyRGVzaWduZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IGFueSwgYmFzZU1vZGVsOiBhbnkpOiBPZHNQaWNrZXJEZXNpZ25lckNsYXNzIHtcbiAgICByZXR1cm4gbmV3IE9kc1BpY2tlckRlc2lnbmVyQ2xhc3MoZWxlbWVudCwgY29uZmlndXJhdGlvbiwgYmFzZU1vZGVsKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb25maWd1cmF0aW9uIHtcbiAgICBzaG93UHJlU2hhcmVkbzogYm9vbGVhbjtcbiAgICBzaG93UG9zdFNoYXJlZG86IGJvb2xlYW47XG4gICAgbmFycm93TGFiZWw6IGJvb2xlYW47XG4gICAgcm9sZUNvbmZpZ01vZGVsczogYW55W107XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSB0aGlzTW9kZWwgZXh0ZW5kcyBDb25maWd1cmF0aW9uIHtcblxufVxuXG5leHBvcnQgY2xhc3MgT2RzUGlja2VyRGVzaWduZXJDbGFzcyB7XG5cbiAgICB2YWxpZGF0aW9uOiBhbnk7XG4gICAgdmFsaWRhdGlvbkVycm9yQ291bnQ6IGtvLkNvbXB1dGVkPG51bWJlcj4gfCB1bmRlZmluZWRcbiAgICBvcHRpb25zOiBhbnk7XG4gICAgc2hhcmVkb1R5cGVTeXN0ZW1OYW1lOiBhbnk7XG4gICAgbG9hZGVkOiBrby5PYnNlcnZhYmxlPGJvb2xlYW4+O1xuICAgIGxvdnM6IHsgcm9sZXM6IGtvLk9ic2VydmFibGVBcnJheTxhbnk+OyB9O1xuICAgIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb247XG4gICAgaGFzVmFsaWRhdGlvbkVycm9yczoga28uUHVyZUNvbXB1dGVkPGFueT47XG4gICAgbW9kZWw6IHtcbiAgICAgICAgIHNob3dQcmVTaGFyZWRvOiBrby5PYnNlcnZhYmxlPGFueT47IFxuICAgICAgICAgc2hvd1Bvc3RTaGFyZWRvOiBrby5PYnNlcnZhYmxlPGFueT47IFxuICAgICAgICAgbmFycm93TGFiZWw6IGtvLk9ic2VydmFibGU8YW55PjsgXG4gICAgICAgICByb2xlQ29uZmlnTW9kZWxzOiBrby5PYnNlcnZhYmxlQXJyYXk8YW55PjsgXG4gICAgICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiwgYmFzZU1vZGVsOiBhbnkpIHtcblxuXG4gICAgICAgIGxldCBkZWZhdWx0czogQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgICAgIHNob3dQcmVTaGFyZWRvOiBmYWxzZSxcbiAgICAgICAgICAgIHNob3dQb3N0U2hhcmVkbzogZmFsc2UsXG4gICAgICAgICAgICBuYXJyb3dMYWJlbDogZmFsc2UsXG4gICAgICAgICAgICByb2xlQ29uZmlnTW9kZWxzOiBbXVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBvcHRpb25EZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGFzcGVjdElzUmVhZE9ubHk6IG51bGwsXG4gICAgICAgICAgICBlbnRpdHlTeXN0ZW1OYW1lOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSAkLmV4dGVuZChkZWZhdWx0cywgY29uZmlndXJhdGlvbik7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKG9wdGlvbkRlZmF1bHRzLCB0aGlzLmNvbmZpZ3VyYXRpb24pO1xuXG4gICAgICAgIHRoaXMuc2hhcmVkb1R5cGVTeXN0ZW1OYW1lID0gdGhpcy5vcHRpb25zLmVudGl0eVN5c3RlbU5hbWU7XG4gICAgICAgIHRoaXMubG9hZGVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5sb3ZzID0ge1xuICAgICAgICAgICAgcm9sZXM6IGtvLm9ic2VydmFibGVBcnJheSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5tb2RlbCA9IHtcbiAgICAgICAgICAgIHNob3dQcmVTaGFyZWRvOiBrby5vYnNlcnZhYmxlKHRoaXMub3B0aW9ucy5zaG93UHJlU2hhcmVkbyksXG4gICAgICAgICAgICBzaG93UG9zdFNoYXJlZG86IGtvLm9ic2VydmFibGUodGhpcy5vcHRpb25zLnNob3dQb3N0U2hhcmVkbyksXG4gICAgICAgICAgICBuYXJyb3dMYWJlbDoga28ub2JzZXJ2YWJsZSh0aGlzLm9wdGlvbnMubmFycm93TGFiZWwpLFxuICAgICAgICAgICAgcm9sZUNvbmZpZ01vZGVsczoga28ub2JzZXJ2YWJsZUFycmF5KClcbiAgICAgICAgfTtcblxuICAgICAgICBjb25maWd1cmF0aW9uLnJvbGVDb25maWdNb2RlbHMuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRSb2xlKHgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmhhc1ZhbGlkYXRpb25FcnJvcnMgPSBrby5wdXJlQ29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICAgICAgdmFyIHJvbGVzID0gdGhpcy5tb2RlbC5yb2xlQ29uZmlnTW9kZWxzKCk7XG4gICAgICAgICAgICBpZiAocm9sZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICByZXR1cm4gcm9sZXMuc29tZShmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4LnZhbGlkYXRpb24uaGFzRXJyb3JzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZEFuZEJpbmQoKSB7XG5cbiAgICAgICAgJHVpLnN0YWNrcy5sb2NrKCk7XG5cbiAgICAgICAgJGFqYXguZ2V0KFwiL2FwaS9hZG1pbi9zaGFyZWRvVHlwZXMvXCIgKyB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSArIFwiL3BhcnRpY2lwYW50Um9sZXNcIilcbiAgICAgICAgICAgIC5kb25lKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIG9yZGVyZWQgPSBfLnNvcnRCeShyZXNwb25zZSwgKHg6IGFueSkgPT4geyByZXR1cm4geC5wYXJ0aWNpcGFudFJvbGVUeXBlOyB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvdnMucm9sZXMob3JkZXJlZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgJHVpLnN0YWNrcy51bmxvY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzYXZlQW5kQ2xvc2UoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzVmFsaWRhdGlvbkVycm9ycygpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtb2RlbCA9IGtvLnRvSlModGhpcy5tb2RlbCk7XG4gICAgICAgIG1vZGVsLnJvbGVDb25maWdNb2RlbHMuZm9yRWFjaChmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgZGVsZXRlIHgudmFsaWRhdGlvbjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHVpLnN0YWNrcy5jbG9zZSh0aGlzLCBtb2RlbCk7XG4gICAgfTtcblxuICAgIGRpc2NhcmQoKSB7XG4gICAgICAgICR1aS5zdGFja3MuY2FuY2VsKHRoaXMpO1xuICAgIH07XG5cbiAgICBhZGRSb2xlKHJvbGU6IGFueSkge1xuXG4gICAgICAgIHJvbGUgPSByb2xlIHx8IHt9O1xuXG4gICAgICAgIGxldCBtb2RlbDphbnkgPSB7XG4gICAgICAgICAgICByb2xlU3lzdGVtTmFtZToga28ub2JzZXJ2YWJsZShyb2xlLnJvbGVTeXN0ZW1OYW1lKSxcbiAgICAgICAgICAgIGxhYmVsOiBrby5vYnNlcnZhYmxlKHJvbGUubGFiZWwpLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGtvLm9ic2VydmFibGUocm9sZS5yZXF1aXJlZCksXG4gICAgICAgICAgICBzaG93U2VhcmNoT2RzOiBrby5vYnNlcnZhYmxlKHJvbGUuc2hvd1NlYXJjaE9kcyksXG4gICAgICAgICAgICBkZWZhdWx0VG9DdXJyZW50VXNlcjoga28ub2JzZXJ2YWJsZShyb2xlLmRlZmF1bHRUb0N1cnJlbnRVc2VyIHx8IGZhbHNlKSxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBrby5wdXJlQ29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByb2xlOiBhbnkgPSBtb2RlbC5yb2xlU3lzdGVtTmFtZSgpO1xuICAgICAgICAgICAgICAgIGlmICghcm9sZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5sb3ZzLnJvbGVzKCkuZmluZCh4ID0+IHgucGFydGljaXBhbnRSb2xlVHlwZSA9PT0gcm9sZSlcbiAgICAgICAgICAgICAgICBpZiAoIW1hdGNoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaC5wYXJ0aWNpcGFudFJvbGVUeXBlTmFtZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgfTtcblxuICAgICAgICBtb2RlbC52YWxpZGF0aW9uPSB7XG4gICAgICAgICAgICByb2xlU3lzdGVtTmFtZSA6IFZhbGlkYXRvci5yZXF1aXJlZCh0aGlzLCBtb2RlbC5yb2xlU3lzdGVtTmFtZSwgXCJSb2xlIGlzIHJlcXVpcmVkXCIpLFxuICAgICAgICAgICAgaGFzRXJyb3JzOiBrby5wdXJlQ29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbC52YWxpZGF0aW9uLnJvbGVTeXN0ZW1OYW1lKCkpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vZGVsLnJvbGVDb25maWdNb2RlbHMucHVzaChtb2RlbCk7XG4gICAgfTtcblxuICAgIHJlbW92ZVJvbGUocm9sZTphbnkpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5yb2xlQ29uZmlnTW9kZWxzLnJlbW92ZShyb2xlKTtcbiAgICB9O1xufVxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=