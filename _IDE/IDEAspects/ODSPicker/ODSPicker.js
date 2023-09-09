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
/*!**********************!*\
  !*** ./ODSPicker.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OdsPicker: () => (/* binding */ OdsPicker)
/* harmony export */ });
console.log("=========================== ODSPICKER ===========================");
class OdsPicker {
    constructor(element, configuration, baseModel) {
        this.defaults = {
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
        // super("OdsPicker", "aspectData.odsEntityPicker", element, configuration, baseModel,defaults )
    }
    /**
     * Do not create a method called initialise unless you want to handle all KO bindings yourself.
     */
    // private initialise() {
    //     // Map the roleConfigModels
    // }
    loadAndBind() {
        console.log("OdsPicker loadAndBind");
    }
    ;
}

})();

var __webpack_export_target__ = (Aspects = typeof Aspects === "undefined" ? {} : Aspects);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0RTUGlja2VyLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDSEEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO0FBRTFFLE1BQU0sU0FBUztJQUlsQixZQUFZLE9BQW9CLEVBQUUsYUFBa0IsRUFBRSxTQUFjO1FBRWhFLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGtCQUFrQixFQUFFLHlCQUF5QjtZQUM3QywwQkFBMEIsRUFBRSxzQkFBc0I7WUFDbEQsV0FBVyxFQUFFLEtBQUs7WUFDbEIsS0FBSyxFQUFFO2dCQUNILE9BQU8sRUFBRSxLQUFLO2dCQUNkLFlBQVksRUFBRSxLQUFLO2dCQUNuQixZQUFZLEVBQUUsS0FBSzthQUN0QjtTQUVKLENBQUM7UUFDRixnR0FBZ0c7SUFHcEcsQ0FBQztJQUdEOztPQUVHO0lBQ0gseUJBQXlCO0lBQ3pCLGtDQUFrQztJQUVsQyxJQUFJO0lBRUgsV0FBVztRQUVSLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUV6QyxDQUFDO0lBQUEsQ0FBQztDQVNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQXNwZWN0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Bc3BlY3RzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Bc3BlY3RzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0FzcGVjdHMvLi9PRFNQaWNrZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcblxuXG5jb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PSBPRFNQSUNLRVIgPT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xuXG5leHBvcnQgY2xhc3MgT2RzUGlja2VyIHtcbiAgICBkZWZhdWx0czogeyByb2xlQ29uZmlnTW9kZWxzOiBuZXZlcltdOyBzaG93UHJlU2hhcmVkbzogYm9vbGVhbjsgc2hvd1Bvc3RTaGFyZWRvOiBib29sZWFuOyBub09kc0VudGl0eU1lc3NhZ2U6IHN0cmluZzsgbm9PZHNFbnRpdHlSZXF1aXJlZE1lc3NhZ2U6IHN0cmluZzsgbmFycm93TGFiZWw6IGJvb2xlYW47IGRlYnVnOiB7IGVuYWJsZWQ6IGJvb2xlYW47IGxvZ1RvQ29uc29sZTogYm9vbGVhbjsgc2hvd0luQXNwZWN0OiBib29sZWFuOyB9OyB9O1xuIFxuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IGFueSwgYmFzZU1vZGVsOiBhbnkpIHtcblxuICAgICAgICB0aGlzLmRlZmF1bHRzID0ge1xuICAgICAgICAgICAgcm9sZUNvbmZpZ01vZGVsczogW10sXG4gICAgICAgICAgICBzaG93UHJlU2hhcmVkbzogdHJ1ZSxcbiAgICAgICAgICAgIHNob3dQb3N0U2hhcmVkbzogdHJ1ZSxcbiAgICAgICAgICAgIG5vT2RzRW50aXR5TWVzc2FnZTogJ05vIHBhcnRpY2lwYW50IHNlbGVjdGVkJyxcbiAgICAgICAgICAgIG5vT2RzRW50aXR5UmVxdWlyZWRNZXNzYWdlOiAnUGFydGljaXBhbnQgcmVxdWlyZWQnLFxuICAgICAgICAgICAgbmFycm93TGFiZWw6IGZhbHNlLFxuICAgICAgICAgICAgZGVidWc6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsb2dUb0NvbnNvbGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dJbkFzcGVjdDogZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuICAgICAgICAvLyBzdXBlcihcIk9kc1BpY2tlclwiLCBcImFzcGVjdERhdGEub2RzRW50aXR5UGlja2VyXCIsIGVsZW1lbnQsIGNvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbCxkZWZhdWx0cyApXG4gICAgICAgIFxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEbyBub3QgY3JlYXRlIGEgbWV0aG9kIGNhbGxlZCBpbml0aWFsaXNlIHVubGVzcyB5b3Ugd2FudCB0byBoYW5kbGUgYWxsIEtPIGJpbmRpbmdzIHlvdXJzZWxmLlxuICAgICAqL1xuICAgIC8vIHByaXZhdGUgaW5pdGlhbGlzZSgpIHtcbiAgICAvLyAgICAgLy8gTWFwIHRoZSByb2xlQ29uZmlnTW9kZWxzXG4gICAgICAgIFxuICAgIC8vIH1cblxuICAgICBsb2FkQW5kQmluZCgpOiB2b2lkIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIk9kc1BpY2tlciBsb2FkQW5kQmluZFwiKTtcblxuICAgIH07XG5cblxuXG5cblxuICAgIC8vIG92ZXJyaWRlIG9uU2F2ZShtb2RlbDogYW55KTogdm9pZCB7XG4gICAgLy8gICAgIHN1cGVyLm9uU2F2ZShtb2RlbCk7XG4gICAgLy8gfTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==