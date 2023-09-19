/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************************************************************************************************!*\
  !*** ./src/NodeBased/WorkflowActions/RecursiveFindAttribute/Designer/RecursiveFindAttributeDesigner.ts ***!
  \*********************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecursiveFindAttributeDesigner: () => (/* binding */ RecursiveFindAttributeDesigner),
/* harmony export */   RecursiveFindAttributeDesignerClass: () => (/* binding */ RecursiveFindAttributeDesignerClass)
/* harmony export */ });
// Assuming there are relevant type definitions for the used properties and methods.
// For the purpose of this conversion, I'm making some assumptions about the types, which might need further refinement.
function RecursiveFindAttributeDesigner(element, configuration, baseModel) {
    return new RecursiveFindAttributeDesignerClass(element, configuration, baseModel);
}
class RecursiveFindAttributeDesignerClass {
    constructor(element, configuration, baseModel) {
        this.disposables = []; // Define specific type if known.
        const defaults = {
            node: null,
            model: null
        };
        const options = $.extend(true, {}, defaults, configuration);
        this.action = options.node;
        this.model = options.model;
    }
    onDestroy() {
    }
    loadAndBind() {
    }
}

})();

var __webpack_export_target__ = (WorkflowActions = typeof WorkflowActions === "undefined" ? {} : WorkflowActions);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVzaWduZXIvUmVjdXJzaXZlRmluZEF0dHJpYnV0ZURlc2lnbmVyLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05BLG9GQUFvRjtBQUNwRix3SEFBd0g7QUFFakgsU0FBUyw4QkFBOEIsQ0FBQyxPQUFvQixFQUFFLGFBQWtCLEVBQUUsU0FBYztJQUNuRyxPQUFPLElBQUksbUNBQW1DLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN0RixDQUFDO0FBY00sTUFBTSxtQ0FBbUM7SUFNNUMsWUFBWSxPQUFvQixFQUFFLGFBQTRCLEVBQUUsU0FBYztRQUg5RSxnQkFBVyxHQUFVLEVBQUUsQ0FBQyxDQUFDLGlDQUFpQztRQUl0RCxNQUFNLFFBQVEsR0FBRztZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBRy9CLENBQUM7SUFFRCxTQUFTO0lBQ1QsQ0FBQztJQUVELFdBQVc7SUFDWCxDQUFDO0NBS0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Xb3JrZmxvd0FjdGlvbnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vV29ya2Zsb3dBY3Rpb25zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Xb3JrZmxvd0FjdGlvbnMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Xb3JrZmxvd0FjdGlvbnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Xb3JrZmxvd0FjdGlvbnMvLi9zcmMvTm9kZUJhc2VkL1dvcmtmbG93QWN0aW9ucy9SZWN1cnNpdmVGaW5kQXR0cmlidXRlL0Rlc2lnbmVyL1JlY3Vyc2l2ZUZpbmRBdHRyaWJ1dGVEZXNpZ25lci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIEFzc3VtaW5nIHRoZXJlIGFyZSByZWxldmFudCB0eXBlIGRlZmluaXRpb25zIGZvciB0aGUgdXNlZCBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzLlxuLy8gRm9yIHRoZSBwdXJwb3NlIG9mIHRoaXMgY29udmVyc2lvbiwgSSdtIG1ha2luZyBzb21lIGFzc3VtcHRpb25zIGFib3V0IHRoZSB0eXBlcywgd2hpY2ggbWlnaHQgbmVlZCBmdXJ0aGVyIHJlZmluZW1lbnQuXG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN1cnNpdmVGaW5kQXR0cmlidXRlRGVzaWduZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IGFueSwgYmFzZU1vZGVsOiBhbnkpOiBSZWN1cnNpdmVGaW5kQXR0cmlidXRlRGVzaWduZXJDbGFzcyB7XG4gICAgcmV0dXJuIG5ldyBSZWN1cnNpdmVGaW5kQXR0cmlidXRlRGVzaWduZXJDbGFzcyhlbGVtZW50LCBjb25maWd1cmF0aW9uLCBiYXNlTW9kZWwpO1xufVxuXG5cbmludGVyZmFjZSBDb25maWd1cmF0aW9uIHtcbiAgICBub2RlPzogYW55OyAvLyBEZWZpbmUgYSBzcGVjaWZpYyB0eXBlIGlmIGtub3duLlxuICAgIG1vZGVsPzogYW55OyAvLyBEZWZpbmUgYSBzcGVjaWZpYyB0eXBlIGlmIGtub3duLlxufVxuXG5pbnRlcmZhY2UgRXhwZWN0ZWRUeXBlUGlja2VyIHtcbiAgICBtdWx0aVNlbGVjdDogYm9vbGVhbjtcbiAgICBzZWxlY3RNb2RlOiBzdHJpbmc7XG4gICAgc2VsZWN0ZWRJdGVtOiBrby5PYnNlcnZhYmxlPHN0cmluZyB8IG51bGw+O1xufVxuXG5leHBvcnQgY2xhc3MgUmVjdXJzaXZlRmluZEF0dHJpYnV0ZURlc2lnbmVyQ2xhc3Mge1xuICAgIGFjdGlvbjogYW55O1xuICAgIG1vZGVsOiBhbnk7XG4gICAgZGlzcG9zYWJsZXM6IGFueVtdID0gW107IC8vIERlZmluZSBzcGVjaWZpYyB0eXBlIGlmIGtub3duLlxuXG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiwgYmFzZU1vZGVsOiBhbnkpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBub2RlOiBudWxsLFxuICAgICAgICAgICAgbW9kZWw6IG51bGxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRzLCBjb25maWd1cmF0aW9uKTtcblxuICAgICAgICB0aGlzLmFjdGlvbiA9IG9wdGlvbnMubm9kZTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG9wdGlvbnMubW9kZWw7XG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgb25EZXN0cm95KCk6IHZvaWQge1xuICAgIH1cblxuICAgIGxvYWRBbmRCaW5kKCk6IHZvaWQge1xuICAgIH1cblxuXG5cblxufVxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==