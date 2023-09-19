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
/*!*******************************************************************************************************************!*\
  !*** ./src/NodeBased/WorkflowActions/IsSharedoInPhaseWithFeature/Designer/IsSharedoInPhaseWithFeatureDesigner.ts ***!
  \*******************************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IsSharedoInPhaseWithFeatureDesigner: () => (/* binding */ IsSharedoInPhaseWithFeatureDesigner),
/* harmony export */   IsSharedoInPhaseWithFeatureDesignerClass: () => (/* binding */ IsSharedoInPhaseWithFeatureDesignerClass)
/* harmony export */ });
// Assuming there are relevant type definitions for the used properties and methods.
// For the purpose of this conversion, I'm making some assumptions about the types, which might need further refinement.
function IsSharedoInPhaseWithFeatureDesigner(element, configuration, baseModel) {
    return new IsSharedoInPhaseWithFeatureDesignerClass(element, configuration, baseModel);
}
class IsSharedoInPhaseWithFeatureDesignerClass {
    ;
    constructor(element, configuration, baseModel) {
        this.disposables = []; // Define specific type if known.
        const defaults = {
            node: null,
            model: null
        };
        const options = $.extend(true, {}, defaults, configuration);
        this.action = options.node;
        this.model = options.model;
        this.phasesFeaturesLoading = ko.observable(true);
        this.phaseFeatures = ko.observableArray();
        this.loadAvailablePhasesFeatures();
        if (this.action.config) {
            this.disposables = [
                this.action.config.expectedTypeSystemName?.subscribe(() => {
                })
            ];
        }
        // if (this.action.config) {
        //     this.disposables = [
        //         this.action.config.expectedTypeSystemName?.subscribe(() => {
        //             this.loadAvailablePhases();
        //             this.loadReasons();
        //         })
        //     ];
        // }
    }
    onDestroy() {
    }
    loadAndBind() {
        this.loadAvailablePhasesFeatures();
    }
    loadAvailablePhasesFeatures() {
        this.phasesFeaturesLoading(true);
        $ajaxMutex.getOnce(`/api/featureframework/flags/subFeatures`).then((res) => {
            console.log("subFeatures");
            console.log(res);
            this.phasesFeaturesLoading(false);
            this.phaseFeatures(res);
        });
    }
}

})();

var __webpack_export_target__ = (WorkflowActions = typeof WorkflowActions === "undefined" ? {} : WorkflowActions);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVzaWduZXIvSXNTaGFyZWRvSW5QaGFzZVdpdGhGZWF0dXJlRGVzaWduZXIuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkEsb0ZBQW9GO0FBQ3BGLHdIQUF3SDtBQUVqSCxTQUFTLG1DQUFtQyxDQUFDLE9BQW9CLEVBQUUsYUFBa0IsRUFBRSxTQUFjO0lBQ3hHLE9BQU8sSUFBSSx3Q0FBd0MsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzNGLENBQUM7QUFjTSxNQUFNLHdDQUF3QztJQUtELENBQUM7SUFHakQsWUFBWSxPQUFvQixFQUFFLGFBQTRCLEVBQUUsU0FBYztRQUw5RSxnQkFBVyxHQUFVLEVBQUUsQ0FBQyxDQUFDLGlDQUFpQztRQU10RCxNQUFNLFFBQVEsR0FBRztZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBRTNCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBRW5DLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQ2I7WUFDQSxJQUFJLENBQUMsV0FBVyxHQUFHO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQzFELENBQUMsQ0FBQzthQUNMLENBQUM7U0FDTDtRQUNMLDRCQUE0QjtRQUM1QiwyQkFBMkI7UUFDM0IsdUVBQXVFO1FBQ3ZFLDBDQUEwQztRQUMxQyxrQ0FBa0M7UUFFbEMsYUFBYTtRQUNiLFNBQVM7UUFDVCxJQUFJO0lBQ1IsQ0FBQztJQUVELFNBQVM7SUFFVCxDQUFDO0lBRUQsV0FBVztRQUVQLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFHRCwyQkFBMkI7UUFDdkIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWpDLFVBQVUsQ0FBQyxPQUFPLENBQUMseUNBQXlDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFPLEVBQUUsRUFBRTtZQUMzRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBR0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Xb3JrZmxvd0FjdGlvbnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vV29ya2Zsb3dBY3Rpb25zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Xb3JrZmxvd0FjdGlvbnMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Xb3JrZmxvd0FjdGlvbnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Xb3JrZmxvd0FjdGlvbnMvLi9zcmMvTm9kZUJhc2VkL1dvcmtmbG93QWN0aW9ucy9Jc1NoYXJlZG9JblBoYXNlV2l0aEZlYXR1cmUvRGVzaWduZXIvSXNTaGFyZWRvSW5QaGFzZVdpdGhGZWF0dXJlRGVzaWduZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBBc3N1bWluZyB0aGVyZSBhcmUgcmVsZXZhbnQgdHlwZSBkZWZpbml0aW9ucyBmb3IgdGhlIHVzZWQgcHJvcGVydGllcyBhbmQgbWV0aG9kcy5cbi8vIEZvciB0aGUgcHVycG9zZSBvZiB0aGlzIGNvbnZlcnNpb24sIEknbSBtYWtpbmcgc29tZSBhc3N1bXB0aW9ucyBhYm91dCB0aGUgdHlwZXMsIHdoaWNoIG1pZ2h0IG5lZWQgZnVydGhlciByZWZpbmVtZW50LlxuXG5leHBvcnQgZnVuY3Rpb24gSXNTaGFyZWRvSW5QaGFzZVdpdGhGZWF0dXJlRGVzaWduZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IGFueSwgYmFzZU1vZGVsOiBhbnkpOiBJc1NoYXJlZG9JblBoYXNlV2l0aEZlYXR1cmVEZXNpZ25lckNsYXNzIHtcbiAgICByZXR1cm4gbmV3IElzU2hhcmVkb0luUGhhc2VXaXRoRmVhdHVyZURlc2lnbmVyQ2xhc3MoZWxlbWVudCwgY29uZmlndXJhdGlvbiwgYmFzZU1vZGVsKTtcbn1cblxuXG5pbnRlcmZhY2UgQ29uZmlndXJhdGlvbiB7XG4gICAgbm9kZT86IGFueTsgLy8gRGVmaW5lIGEgc3BlY2lmaWMgdHlwZSBpZiBrbm93bi5cbiAgICBtb2RlbD86IGFueTsgLy8gRGVmaW5lIGEgc3BlY2lmaWMgdHlwZSBpZiBrbm93bi5cbn1cblxuaW50ZXJmYWNlIEV4cGVjdGVkVHlwZVBpY2tlciB7XG4gICAgbXVsdGlTZWxlY3Q6IGJvb2xlYW47XG4gICAgc2VsZWN0TW9kZTogc3RyaW5nO1xuICAgIHNlbGVjdGVkSXRlbToga28uT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPjtcbn1cblxuZXhwb3J0IGNsYXNzIElzU2hhcmVkb0luUGhhc2VXaXRoRmVhdHVyZURlc2lnbmVyQ2xhc3Mge1xuICAgIGFjdGlvbjogYW55O1xuICAgIG1vZGVsOiBhbnk7XG4gICAgZGlzcG9zYWJsZXM6IGFueVtdID0gW107IC8vIERlZmluZSBzcGVjaWZpYyB0eXBlIGlmIGtub3duLlxuICAgIHBoYXNlRmVhdHVyZXM6IGtvLk9ic2VydmFibGVBcnJheTxhbnlbXT4gO1xuICAgIHBoYXNlc0ZlYXR1cmVzTG9hZGluZzogIGtvLk9ic2VydmFibGU8Ym9vbGVhbj4gOztcblxuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24sIGJhc2VNb2RlbDogYW55KSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgbm9kZTogbnVsbCxcbiAgICAgICAgICAgIG1vZGVsOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgY29uZmlndXJhdGlvbik7XG5cbiAgICAgICAgdGhpcy5hY3Rpb24gPSBvcHRpb25zLm5vZGU7XG4gICAgICAgIHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsO1xuXG4gICAgICAgIHRoaXMucGhhc2VzRmVhdHVyZXNMb2FkaW5nID0ga28ub2JzZXJ2YWJsZSh0cnVlKTtcbiAgICAgICAgdGhpcy5waGFzZUZlYXR1cmVzID0ga28ub2JzZXJ2YWJsZUFycmF5KCk7XG5cbiAgICAgICAgdGhpcy5sb2FkQXZhaWxhYmxlUGhhc2VzRmVhdHVyZXMoKTtcblxuICAgICAgICBpZih0aGlzLmFjdGlvbi5jb25maWcpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uLmNvbmZpZy5leHBlY3RlZFR5cGVTeXN0ZW1OYW1lPy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgIC8vIGlmICh0aGlzLmFjdGlvbi5jb25maWcpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBbXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5hY3Rpb24uY29uZmlnLmV4cGVjdGVkVHlwZVN5c3RlbU5hbWU/LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMubG9hZEF2YWlsYWJsZVBoYXNlcygpO1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmxvYWRSZWFzb25zKCk7XG5cbiAgICAgICAgLy8gICAgICAgICB9KVxuICAgICAgICAvLyAgICAgXTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIG9uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICBcbiAgICB9XG5cbiAgICBsb2FkQW5kQmluZCgpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLmxvYWRBdmFpbGFibGVQaGFzZXNGZWF0dXJlcygpO1xuICAgIH1cblxuXG4gICAgbG9hZEF2YWlsYWJsZVBoYXNlc0ZlYXR1cmVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBoYXNlc0ZlYXR1cmVzTG9hZGluZyh0cnVlKTtcblxuICAgICAgICAkYWpheE11dGV4LmdldE9uY2UoYC9hcGkvZmVhdHVyZWZyYW1ld29yay9mbGFncy9zdWJGZWF0dXJlc2ApLnRoZW4oKHJlczphbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3ViRmVhdHVyZXNcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgdGhpcy5waGFzZXNGZWF0dXJlc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5waGFzZUZlYXR1cmVzKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59XG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9