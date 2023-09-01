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
  !*** ./designer/designer/designer.ts ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormWidgetDesignerDesigner: () => (/* binding */ FormWidgetDesignerDesigner),
/* harmony export */   FormWidgetDesignerDesignerClass: () => (/* binding */ FormWidgetDesignerDesignerClass)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);

function FormWidgetDesignerDesigner(element, configuration, baseModel) {
    return new FormWidgetDesignerDesignerClass(element, configuration, baseModel);
}
class FormWidgetDesignerDesignerClass {
    constructor(element, configuration, baseModel) {
        const defaults = {
            todoMessage: "",
        };
        const options = $.extend(true, {}, defaults, configuration);
        this.model = {
            todoMessage: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.todoMessage),
        };
        this.validation = {
            todoMessage: knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed(() => {
                var _a;
                const message = (_a = this.model) === null || _a === void 0 ? void 0 : _a.todoMessage();
                if (!message)
                    return "The message is required";
                return null;
            }),
        };
        this.validationErrorCount = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed(() => {
            let fails = 0;
            if (this.validation.todoMessage())
                fails++;
            return fails;
        });
    }
    onDestroy() {
        // ...
    }
    loadAndBind() {
        // ...
    }
    getModel() {
        const self = this;
        return {
            todoMessage: self.model.todoMessage()
        };
    }
}

})();

var __webpack_export_target__ = (Widgets = typeof Widgets === "undefined" ? {} : Widgets);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9kZXNpZ25lci9kZXNpZ25lci9Gb3JtV2lkZ2V0RGVzaWduZXJEZXNpZ25lci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTitCO0FBR3hCLFNBQVMsMEJBQTBCLENBQUMsT0FBb0IsRUFBRSxhQUFrQixFQUFFLFNBQWM7SUFDL0YsT0FBTyxJQUFJLCtCQUErQixDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDbEYsQ0FBQztBQWVNLE1BQU0sK0JBQStCO0lBS3hDLFlBQVksT0FBb0IsRUFBRSxhQUE0QixFQUFFLFNBQWM7UUFFMUUsTUFBTSxRQUFRLEdBQUc7WUFDYixXQUFXLEVBQUUsRUFBRTtTQUNsQixDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsV0FBVyxFQUFFLGdEQUFhLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztTQUNsRCxDQUFDO1FBRUYsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNkLFdBQVcsRUFBRSxrREFBZSxDQUFDLEdBQUcsRUFBRTs7Z0JBRTlCLE1BQU0sT0FBTyxHQUFHLFVBQUksQ0FBQyxLQUFLLDBDQUFFLFdBQVcsRUFBRSxDQUFDO2dCQUMxQyxJQUFJLENBQUMsT0FBTztvQkFBRSxPQUFPLHlCQUF5QixDQUFDO2dCQUMvQyxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUM7U0FDTCxDQUFDO1FBRUYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLGtEQUFlLENBQUMsR0FBRyxFQUFFO1lBQzdDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0JBQUUsS0FBSyxFQUFFLENBQUM7WUFDM0MsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsU0FBUztRQUNMLE1BQU07SUFDVixDQUFDO0lBRUQsV0FBVztRQUNQLE1BQU07SUFDVixDQUFDO0lBRUQsUUFBUTtRQUNKLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixPQUFPO1lBQ0gsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1NBQ3hDLENBQUM7SUFDTixDQUFDO0NBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9XaWRnZXRzL2V4dGVybmFsIHZhciBcImtvXCIiLCJ3ZWJwYWNrOi8vV2lkZ2V0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9XaWRnZXRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL1dpZGdldHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1dpZGdldHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9XaWRnZXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vV2lkZ2V0cy8uL2Rlc2lnbmVyL2Rlc2lnbmVyL2Rlc2lnbmVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ga287IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBGb3JtV2lkZ2V0RGVzaWduZXJEZXNpZ25lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogYW55LCBiYXNlTW9kZWw6IGFueSk6IEZvcm1XaWRnZXREZXNpZ25lckRlc2lnbmVyQ2xhc3Mge1xuICAgIHJldHVybiBuZXcgRm9ybVdpZGdldERlc2lnbmVyRGVzaWduZXJDbGFzcyhlbGVtZW50LCBjb25maWd1cmF0aW9uLCBiYXNlTW9kZWwpO1xufSBcblxuZXhwb3J0IGludGVyZmFjZSBDb25maWd1cmF0aW9uIHtcbiAgICBibGFkZT86IGFueTtcbiAgICBfX3Njb3BlPzoge1xuICAgICAgICBtb2RlPzogYW55O1xuICAgICAgICBzaGFyZWRvVHlwZVN5c3RlbU5hbWU/OiBhbnk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSB0aGlzTW9kZWwgZXh0ZW5kcyBDb25maWd1cmF0aW9uXG57XG4gICAgdG9kb01lc3NhZ2U6IGtvLk9ic2VydmFibGU8c3RyaW5nPiAsXG59XG5cbmV4cG9ydCBjbGFzcyBGb3JtV2lkZ2V0RGVzaWduZXJEZXNpZ25lckNsYXNzIHtcbiAgICBtb2RlbDogdGhpc01vZGVsO1xuICAgIHZhbGlkYXRpb246IGFueTtcbiAgICB2YWxpZGF0aW9uRXJyb3JDb3VudDoga28uQ29tcHV0ZWQ8bnVtYmVyPjtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uLCBiYXNlTW9kZWw6IGFueSkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICB0b2RvTWVzc2FnZTogXCJcIixcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBjb25maWd1cmF0aW9uKTtcblxuICAgICAgICB0aGlzLm1vZGVsID0ge1xuICAgICAgICAgICAgdG9kb01lc3NhZ2U6IGtvLm9ic2VydmFibGUob3B0aW9ucy50b2RvTWVzc2FnZSksXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy52YWxpZGF0aW9uID0ge1xuICAgICAgICAgICAgdG9kb01lc3NhZ2U6IGtvLnB1cmVDb21wdXRlZCgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5tb2RlbD8udG9kb01lc3NhZ2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoIW1lc3NhZ2UpIHJldHVybiBcIlRoZSBtZXNzYWdlIGlzIHJlcXVpcmVkXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvckNvdW50ID0ga28ucHVyZUNvbXB1dGVkKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBmYWlscyA9IDA7XG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0aW9uLnRvZG9NZXNzYWdlKCkpIGZhaWxzKys7XG4gICAgICAgICAgICByZXR1cm4gZmFpbHM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgLy8gLi4uXG4gICAgfVxuXG4gICAgbG9hZEFuZEJpbmQoKTogdm9pZCB7XG4gICAgICAgIC8vIC4uLlxuICAgIH1cblxuICAgIGdldE1vZGVsKCk6IHsgdG9kb01lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCB9IHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b2RvTWVzc2FnZTogc2VsZi5tb2RlbC50b2RvTWVzc2FnZSgpXG4gICAgICAgIH07XG4gICAgfVxufVxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=