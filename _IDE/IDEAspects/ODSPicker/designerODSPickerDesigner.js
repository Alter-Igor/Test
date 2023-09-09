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
/*!***************************************!*\
  !*** ./Designer/ODSPickerDesigner.ts ***!
  \***************************************/
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

var __webpack_export_target__ = (Aspects = typeof Aspects === "undefined" ? {} : Aspects);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzaWduZXJPRFNQaWNrZXJEZXNpZ25lci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTitCO0FBR3hCLFNBQVMsaUJBQWlCLENBQUMsT0FBb0IsRUFBRSxhQUFrQixFQUFFLFNBQWM7SUFDdEYsT0FBTyxJQUFJLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDekUsQ0FBQztBQWNNLE1BQU0sc0JBQXNCO0lBaUIvQixZQUFZLE9BQW9CLEVBQUUsYUFBNEIsRUFBRSxTQUFjO1FBRzFFLElBQUksUUFBUSxHQUFrQjtZQUMxQixjQUFjLEVBQUUsS0FBSztZQUNyQixlQUFlLEVBQUUsS0FBSztZQUN0QixXQUFXLEVBQUUsS0FBSztZQUNsQixnQkFBZ0IsRUFBRSxFQUFFO1NBQ3ZCLENBQUM7UUFFRixJQUFJLGNBQWMsR0FBRztZQUNqQixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGdCQUFnQixFQUFFLElBQUk7U0FDekI7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDO1FBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsZ0RBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1IsS0FBSyxFQUFFLHFEQUFrQixFQUFFO1NBQzlCLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsY0FBYyxFQUFFLGdEQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7WUFDMUQsZUFBZSxFQUFFLGdEQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7WUFDNUQsV0FBVyxFQUFFLGdEQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDcEQsZ0JBQWdCLEVBQUUscURBQWtCLEVBQUU7U0FDekMsQ0FBQztRQUVGLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGtEQUFlLENBQUMsR0FBRyxFQUFFO1lBQzVDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFDbEIsT0FBTyxJQUFJLENBQUM7WUFFaEIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDekIsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVztRQUVQLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFbEIsS0FBSyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMscUJBQXFCLEdBQUcsbUJBQW1CLENBQUM7YUFDbkYsSUFBSSxDQUFDLENBQUMsUUFBYSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDO2FBQ0QsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNULElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFBQSxDQUFDO0lBRUYsWUFBWTtRQUVSLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzFCLE9BQU87UUFFWCxJQUFJLEtBQUssR0FBRywwQ0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUN0QyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUFBLENBQUM7SUFFRixPQUFPO1FBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUFBLENBQUM7SUFFRixPQUFPLENBQUMsSUFBUztRQUViLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRWxCLElBQUksS0FBSyxHQUFPO1lBQ1osY0FBYyxFQUFFLGdEQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUNsRCxLQUFLLEVBQUUsZ0RBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxnREFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDdEMsYUFBYSxFQUFFLGdEQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNoRCxvQkFBb0IsRUFBRSxnREFBYSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxLQUFLLENBQUM7WUFDdkUsV0FBVyxFQUFFLGtEQUFlLENBQUMsR0FBRyxFQUFFO2dCQUM5QixJQUFJLElBQUksR0FBUSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxJQUFJO29CQUNMLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsS0FBSyxJQUFJLENBQUM7Z0JBQ3ZFLElBQUksQ0FBQyxLQUFLO29CQUNOLE9BQU8sSUFBSSxDQUFDO2dCQUVoQixPQUFPLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQztZQUN6QyxDQUFDLENBQUM7U0FFTCxDQUFDO1FBRUYsS0FBSyxDQUFDLFVBQVUsR0FBRTtZQUNkLGNBQWMsRUFBRyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDO1lBQ25GLFNBQVMsRUFBRSxrREFBZSxDQUFDLEdBQUcsRUFBRTtnQkFDNUIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRTtvQkFBRSxPQUFPLElBQUksQ0FBQztnQkFDbkQsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQyxDQUFDO1NBQ0w7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQUEsQ0FBQztJQUVGLFVBQVUsQ0FBQyxJQUFRO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUFBLENBQUM7Q0FDTCIsInNvdXJjZXMiOlsid2VicGFjazovL0FzcGVjdHMvZXh0ZXJuYWwgdmFyIFwia29cIiIsIndlYnBhY2s6Ly9Bc3BlY3RzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0FzcGVjdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0FzcGVjdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Bc3BlY3RzLy4vRGVzaWduZXIvT0RTUGlja2VyRGVzaWduZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBrbzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIE9kc1BpY2tlckRlc2lnbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBhbnksIGJhc2VNb2RlbDogYW55KTogT2RzUGlja2VyRGVzaWduZXJDbGFzcyB7XG4gICAgcmV0dXJuIG5ldyBPZHNQaWNrZXJEZXNpZ25lckNsYXNzKGVsZW1lbnQsIGNvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbCk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlndXJhdGlvbiB7XG4gICAgc2hvd1ByZVNoYXJlZG86IGJvb2xlYW47XG4gICAgc2hvd1Bvc3RTaGFyZWRvOiBib29sZWFuO1xuICAgIG5hcnJvd0xhYmVsOiBib29sZWFuO1xuICAgIHJvbGVDb25maWdNb2RlbHM6IGFueVtdO1xuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgdGhpc01vZGVsIGV4dGVuZHMgQ29uZmlndXJhdGlvbiB7XG5cbn1cblxuZXhwb3J0IGNsYXNzIE9kc1BpY2tlckRlc2lnbmVyQ2xhc3Mge1xuXG4gICAgdmFsaWRhdGlvbjogYW55O1xuICAgIHZhbGlkYXRpb25FcnJvckNvdW50OiBrby5Db21wdXRlZDxudW1iZXI+IHwgdW5kZWZpbmVkXG4gICAgb3B0aW9uczogYW55O1xuICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZTogYW55O1xuICAgIGxvYWRlZDoga28uT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgICBsb3ZzOiB7IHJvbGVzOiBrby5PYnNlcnZhYmxlQXJyYXk8YW55PjsgfTtcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uO1xuICAgIGhhc1ZhbGlkYXRpb25FcnJvcnM6IGtvLlB1cmVDb21wdXRlZDxhbnk+O1xuICAgIG1vZGVsOiB7XG4gICAgICAgICBzaG93UHJlU2hhcmVkbzoga28uT2JzZXJ2YWJsZTxhbnk+OyBcbiAgICAgICAgIHNob3dQb3N0U2hhcmVkbzoga28uT2JzZXJ2YWJsZTxhbnk+OyBcbiAgICAgICAgIG5hcnJvd0xhYmVsOiBrby5PYnNlcnZhYmxlPGFueT47IFxuICAgICAgICAgcm9sZUNvbmZpZ01vZGVsczoga28uT2JzZXJ2YWJsZUFycmF5PGFueT47IFxuICAgICAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbDogYW55KSB7XG5cblxuICAgICAgICBsZXQgZGVmYXVsdHM6IENvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAgICAgICBzaG93UHJlU2hhcmVkbzogZmFsc2UsXG4gICAgICAgICAgICBzaG93UG9zdFNoYXJlZG86IGZhbHNlLFxuICAgICAgICAgICAgbmFycm93TGFiZWw6IGZhbHNlLFxuICAgICAgICAgICAgcm9sZUNvbmZpZ01vZGVsczogW11cbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgb3B0aW9uRGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBhc3BlY3RJc1JlYWRPbmx5OiBudWxsLFxuICAgICAgICAgICAgZW50aXR5U3lzdGVtTmFtZTogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gJC5leHRlbmQoZGVmYXVsdHMsIGNvbmZpZ3VyYXRpb24pO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZChvcHRpb25EZWZhdWx0cywgdGhpcy5jb25maWd1cmF0aW9uKTtcblxuICAgICAgICB0aGlzLnNoYXJlZG9UeXBlU3lzdGVtTmFtZSA9IHRoaXMub3B0aW9ucy5lbnRpdHlTeXN0ZW1OYW1lO1xuICAgICAgICB0aGlzLmxvYWRlZCA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xuXG4gICAgICAgIHRoaXMubG92cyA9IHtcbiAgICAgICAgICAgIHJvbGVzOiBrby5vYnNlcnZhYmxlQXJyYXkoKVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubW9kZWwgPSB7XG4gICAgICAgICAgICBzaG93UHJlU2hhcmVkbzoga28ub2JzZXJ2YWJsZSh0aGlzLm9wdGlvbnMuc2hvd1ByZVNoYXJlZG8pLFxuICAgICAgICAgICAgc2hvd1Bvc3RTaGFyZWRvOiBrby5vYnNlcnZhYmxlKHRoaXMub3B0aW9ucy5zaG93UG9zdFNoYXJlZG8pLFxuICAgICAgICAgICAgbmFycm93TGFiZWw6IGtvLm9ic2VydmFibGUodGhpcy5vcHRpb25zLm5hcnJvd0xhYmVsKSxcbiAgICAgICAgICAgIHJvbGVDb25maWdNb2RlbHM6IGtvLm9ic2VydmFibGVBcnJheSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uZmlndXJhdGlvbi5yb2xlQ29uZmlnTW9kZWxzLmZvckVhY2goKHgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkUm9sZSh4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5oYXNWYWxpZGF0aW9uRXJyb3JzID0ga28ucHVyZUNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgICAgIHZhciByb2xlcyA9IHRoaXMubW9kZWwucm9sZUNvbmZpZ01vZGVscygpO1xuICAgICAgICAgICAgaWYgKHJvbGVzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHJvbGVzLnNvbWUoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geC52YWxpZGF0aW9uLmhhc0Vycm9ycygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRBbmRCaW5kKCkge1xuXG4gICAgICAgICR1aS5zdGFja3MubG9jaygpO1xuXG4gICAgICAgICRhamF4LmdldChcIi9hcGkvYWRtaW4vc2hhcmVkb1R5cGVzL1wiICsgdGhpcy5zaGFyZWRvVHlwZVN5c3RlbU5hbWUgKyBcIi9wYXJ0aWNpcGFudFJvbGVzXCIpXG4gICAgICAgICAgICAuZG9uZSgocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBvcmRlcmVkID0gXy5zb3J0QnkocmVzcG9uc2UsICh4OiBhbnkpID0+IHsgcmV0dXJuIHgucGFydGljaXBhbnRSb2xlVHlwZTsgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb3ZzLnJvbGVzKG9yZGVyZWQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkKHRydWUpO1xuICAgICAgICAgICAgICAgICR1aS5zdGFja3MudW5sb2NrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2F2ZUFuZENsb3NlKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1ZhbGlkYXRpb25FcnJvcnMoKSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbW9kZWwgPSBrby50b0pTKHRoaXMubW9kZWwpO1xuICAgICAgICBtb2RlbC5yb2xlQ29uZmlnTW9kZWxzLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB4LnZhbGlkYXRpb247XG4gICAgICAgIH0pO1xuXG4gICAgICAgICR1aS5zdGFja3MuY2xvc2UodGhpcywgbW9kZWwpO1xuICAgIH07XG5cbiAgICBkaXNjYXJkKCkge1xuICAgICAgICAkdWkuc3RhY2tzLmNhbmNlbCh0aGlzKTtcbiAgICB9O1xuXG4gICAgYWRkUm9sZShyb2xlOiBhbnkpIHtcblxuICAgICAgICByb2xlID0gcm9sZSB8fCB7fTtcblxuICAgICAgICBsZXQgbW9kZWw6YW55ID0ge1xuICAgICAgICAgICAgcm9sZVN5c3RlbU5hbWU6IGtvLm9ic2VydmFibGUocm9sZS5yb2xlU3lzdGVtTmFtZSksXG4gICAgICAgICAgICBsYWJlbDoga28ub2JzZXJ2YWJsZShyb2xlLmxhYmVsKSxcbiAgICAgICAgICAgIHJlcXVpcmVkOiBrby5vYnNlcnZhYmxlKHJvbGUucmVxdWlyZWQpLFxuICAgICAgICAgICAgc2hvd1NlYXJjaE9kczoga28ub2JzZXJ2YWJsZShyb2xlLnNob3dTZWFyY2hPZHMpLFxuICAgICAgICAgICAgZGVmYXVsdFRvQ3VycmVudFVzZXI6IGtvLm9ic2VydmFibGUocm9sZS5kZWZhdWx0VG9DdXJyZW50VXNlciB8fCBmYWxzZSksXG4gICAgICAgICAgICBkaXNwbGF5TmFtZToga28ucHVyZUNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcm9sZTogYW55ID0gbW9kZWwucm9sZVN5c3RlbU5hbWUoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJvbGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHRoaXMubG92cy5yb2xlcygpLmZpbmQoeCA9PiB4LnBhcnRpY2lwYW50Um9sZVR5cGUgPT09IHJvbGUpXG4gICAgICAgICAgICAgICAgaWYgKCFtYXRjaClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2gucGFydGljaXBhbnRSb2xlVHlwZU5hbWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgIH07XG5cbiAgICAgICAgbW9kZWwudmFsaWRhdGlvbj0ge1xuICAgICAgICAgICAgcm9sZVN5c3RlbU5hbWUgOiBWYWxpZGF0b3IucmVxdWlyZWQodGhpcywgbW9kZWwucm9sZVN5c3RlbU5hbWUsIFwiUm9sZSBpcyByZXF1aXJlZFwiKSxcbiAgICAgICAgICAgIGhhc0Vycm9yczoga28ucHVyZUNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWwudmFsaWRhdGlvbi5yb2xlU3lzdGVtTmFtZSgpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RlbC5yb2xlQ29uZmlnTW9kZWxzLnB1c2gobW9kZWwpO1xuICAgIH07XG5cbiAgICByZW1vdmVSb2xlKHJvbGU6YW55KSB7XG4gICAgICAgIHRoaXMubW9kZWwucm9sZUNvbmZpZ01vZGVscy5yZW1vdmUocm9sZSk7XG4gICAgfTtcbn1cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9