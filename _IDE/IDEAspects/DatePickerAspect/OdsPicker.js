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
/*!********************************************************!*\
  !*** ../../WebBased/IDEAspects/OdsPicker/OdsPicker.ts ***!
  \********************************************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2RzUGlja2VyLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDSEEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO0FBRTFFLE1BQU0sU0FBUztJQUlsQixZQUFZLE9BQW9CLEVBQUUsYUFBa0IsRUFBRSxTQUFjO1FBRWhFLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGtCQUFrQixFQUFFLHlCQUF5QjtZQUM3QywwQkFBMEIsRUFBRSxzQkFBc0I7WUFDbEQsV0FBVyxFQUFFLEtBQUs7WUFDbEIsS0FBSyxFQUFFO2dCQUNILE9BQU8sRUFBRSxLQUFLO2dCQUNkLFlBQVksRUFBRSxLQUFLO2dCQUNuQixZQUFZLEVBQUUsS0FBSzthQUN0QjtTQUVKLENBQUM7UUFDRixnR0FBZ0c7SUFHcEcsQ0FBQztJQUdEOztPQUVHO0lBQ0gseUJBQXlCO0lBQ3pCLGtDQUFrQztJQUVsQyxJQUFJO0lBRUgsV0FBVztRQUVSLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUV6QyxDQUFDO0lBQUEsQ0FBQztDQVNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQXNwZWN0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Bc3BlY3RzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Bc3BlY3RzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQXNwZWN0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0FzcGVjdHMvLi4vLi4vV2ViQmFzZWQvSURFQXNwZWN0cy9PZHNQaWNrZXIvT2RzUGlja2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG5cblxuY29uc29sZS5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT0gT0RTUElDS0VSID09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcblxuZXhwb3J0IGNsYXNzIE9kc1BpY2tlciB7XG4gICAgZGVmYXVsdHM6IHsgcm9sZUNvbmZpZ01vZGVsczogbmV2ZXJbXTsgc2hvd1ByZVNoYXJlZG86IGJvb2xlYW47IHNob3dQb3N0U2hhcmVkbzogYm9vbGVhbjsgbm9PZHNFbnRpdHlNZXNzYWdlOiBzdHJpbmc7IG5vT2RzRW50aXR5UmVxdWlyZWRNZXNzYWdlOiBzdHJpbmc7IG5hcnJvd0xhYmVsOiBib29sZWFuOyBkZWJ1ZzogeyBlbmFibGVkOiBib29sZWFuOyBsb2dUb0NvbnNvbGU6IGJvb2xlYW47IHNob3dJbkFzcGVjdDogYm9vbGVhbjsgfTsgfTtcbiBcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBhbnksIGJhc2VNb2RlbDogYW55KSB7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIHJvbGVDb25maWdNb2RlbHM6IFtdLFxuICAgICAgICAgICAgc2hvd1ByZVNoYXJlZG86IHRydWUsXG4gICAgICAgICAgICBzaG93UG9zdFNoYXJlZG86IHRydWUsXG4gICAgICAgICAgICBub09kc0VudGl0eU1lc3NhZ2U6ICdObyBwYXJ0aWNpcGFudCBzZWxlY3RlZCcsXG4gICAgICAgICAgICBub09kc0VudGl0eVJlcXVpcmVkTWVzc2FnZTogJ1BhcnRpY2lwYW50IHJlcXVpcmVkJyxcbiAgICAgICAgICAgIG5hcnJvd0xhYmVsOiBmYWxzZSxcbiAgICAgICAgICAgIGRlYnVnOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbG9nVG9Db25zb2xlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93SW5Bc3BlY3Q6IGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcbiAgICAgICAgLy8gc3VwZXIoXCJPZHNQaWNrZXJcIiwgXCJhc3BlY3REYXRhLm9kc0VudGl0eVBpY2tlclwiLCBlbGVtZW50LCBjb25maWd1cmF0aW9uLCBiYXNlTW9kZWwsZGVmYXVsdHMgKVxuICAgICAgICBcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRG8gbm90IGNyZWF0ZSBhIG1ldGhvZCBjYWxsZWQgaW5pdGlhbGlzZSB1bmxlc3MgeW91IHdhbnQgdG8gaGFuZGxlIGFsbCBLTyBiaW5kaW5ncyB5b3Vyc2VsZi5cbiAgICAgKi9cbiAgICAvLyBwcml2YXRlIGluaXRpYWxpc2UoKSB7XG4gICAgLy8gICAgIC8vIE1hcCB0aGUgcm9sZUNvbmZpZ01vZGVsc1xuICAgICAgICBcbiAgICAvLyB9XG5cbiAgICAgbG9hZEFuZEJpbmQoKTogdm9pZCB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJPZHNQaWNrZXIgbG9hZEFuZEJpbmRcIik7XG5cbiAgICB9O1xuXG5cblxuXG5cbiAgICAvLyBvdmVycmlkZSBvblNhdmUobW9kZWw6IGFueSk6IHZvaWQge1xuICAgIC8vICAgICBzdXBlci5vblNhdmUobW9kZWwpO1xuICAgIC8vIH07XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=