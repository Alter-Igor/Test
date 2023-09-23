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
/*!*************************************************************************************!*\
  !*** ./src/NodeBased/WorkflowActions/CreateTaskv2/Designer/CreateTaskv2Designer.ts ***!
  \*************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateTaskv2Designer: () => (/* binding */ CreateTaskv2Designer),
/* harmony export */   CreateTaskv2DesignerClass: () => (/* binding */ CreateTaskv2DesignerClass)
/* harmony export */ });
// Namespacing
// namespace("Sharedo.Core.Case.WorkflowEditor.NodeTypes");
// View model
function CreateTaskv2Designer(element, configuration, baseModel) {
    return new CreateTaskv2DesignerClass(element, configuration, baseModel);
}
class CreateTaskv2DesignerClass {
    constructor(element, configuration, baseModel) {
        var defaults = {
            // The selected node
            node: null,
            // The overall process model object
            model: null
        };
        var options = $.extend(true, {}, defaults, configuration);
        this.action = options.node;
        this.model = options.model;
        this.sharedoTypePickerOptions =
            {
                multiSelect: false,
                selectMode: "systemName",
                selectedItem: this.action.config.taskType,
                rootTypes: ["task"]
            };
        this.assignmentPickerOptions =
            {
                action: this.action,
                sharedoTypeSystemName: this.action.config.taskType,
                assignments: this.action.ui.assignments,
                // Exclude these roles as managed elsewhere
                excludeRoles: ["primary-owner"]
            };
        this.phases = this.action.ui.phases;
        this.phasePickerOptions =
            {
                action: this.action,
                sharedoTypeSystemName: this.action.config.taskType,
                phases: this.phases
            };
        this.priorities = ko.observableArray();
        this.disposables =
            [
                this.action.config.onCompleteOutlet.subscribe(this.setOnCompleteOutlet.bind(self)),
                this.action.config.onOverdueOutlet.subscribe(this.setOnOverdueOutlet.bind(self))
            ];
    }
    ;
    loadAndBind() {
        const self = this;
        $ajaxMutex.getOnce("/api/ods/optionsets/work-priority")
            .then((response) => {
            this.priorities(response.optionSetValueProperties);
        });
    }
    onDestroy() {
        var self = this;
        _.each(this.disposables, (d) => d.dispose());
    }
    ;
    setOnCompleteOutlet() {
        var self = this;
        if (this.action.config.onCompleteOutlet()) {
            this.action.addAvailableOutlet("onComplete", "Task complete");
        }
        else {
            this.action.removeAvailableOutlet("onComplete");
        }
    }
    ;
    setOnReminderOutlet() {
        var self = this;
        if (this.action.config.onReminderOutlet()) {
            this.action.addAvailableOutlet("onReminderDue", "Reminder due");
        }
        else {
            this.action.removeAvailableOutlet("onReminderDue");
        }
    }
    ;
    setOnOverdueOutlet() {
        if (this.action.config.onOverdueOutlet()) {
            this.action.addAvailableOutlet("onOverdue", "Overdue");
        }
        else {
            this.action.removeAvailableOutlet("onOverdue");
        }
    }
}

})();

var __webpack_export_target__ = (WorkflowActions = typeof WorkflowActions === "undefined" ? {} : WorkflowActions);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FDbEQ7SUFDTCxDQUFDO0NBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Xb3JrZmxvd0FjdGlvbnMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vV29ya2Zsb3dBY3Rpb25zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Xb3JrZmxvd0FjdGlvbnMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Xb3JrZmxvd0FjdGlvbnMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Xb3JrZmxvd0FjdGlvbnMvLi9zcmMvTm9kZUJhc2VkL1dvcmtmbG93QWN0aW9ucy9DcmVhdGVUYXNrdjIvRGVzaWduZXIvQ3JlYXRlVGFza3YyRGVzaWduZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBOYW1lc3BhY2luZ1xuLy8gbmFtZXNwYWNlKFwiU2hhcmVkby5Db3JlLkNhc2UuV29ya2Zsb3dFZGl0b3IuTm9kZVR5cGVzXCIpO1xuXG4gXG4vLyBWaWV3IG1vZGVsXG5cbmV4cG9ydCBmdW5jdGlvbiBDcmVhdGVUYXNrdjJEZXNpZ25lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogYW55LCBiYXNlTW9kZWw6IGFueSk6IENyZWF0ZVRhc2t2MkRlc2lnbmVyQ2xhc3Mge1xuICAgIHJldHVybiBuZXcgQ3JlYXRlVGFza3YyRGVzaWduZXJDbGFzcyhlbGVtZW50LCBjb25maWd1cmF0aW9uLCBiYXNlTW9kZWwpO1xufVxuXG5leHBvcnQgY2xhc3MgQ3JlYXRlVGFza3YyRGVzaWduZXJDbGFzcyB7XG4gICAgYWN0aW9uOiBhbnk7XG4gICAgbW9kZWw6IGFueTtcbiAgICBzaGFyZWRvVHlwZVBpY2tlck9wdGlvbnM6IHsgbXVsdGlTZWxlY3Q6IGJvb2xlYW47IHNlbGVjdE1vZGU6IHN0cmluZzsgc2VsZWN0ZWRJdGVtOiBhbnk7IHJvb3RUeXBlczogc3RyaW5nW107IH07XG4gICAgYXNzaWdubWVudFBpY2tlck9wdGlvbnM6IHtcbiAgICAgICAgYWN0aW9uOiBhbnk7IHNoYXJlZG9UeXBlU3lzdGVtTmFtZTogYW55OyBhc3NpZ25tZW50czogYW55O1xuICAgICAgICAvLyBFeGNsdWRlIHRoZXNlIHJvbGVzIGFzIG1hbmFnZWQgZWxzZXdoZXJlXG4gICAgICAgIGV4Y2x1ZGVSb2xlczogc3RyaW5nW107XG4gICAgfTtcbiAgICBwaGFzZXM6IGFueTtcbiAgICBwaGFzZVBpY2tlck9wdGlvbnM6IHsgYWN0aW9uOiBhbnk7IHNoYXJlZG9UeXBlU3lzdGVtTmFtZTogYW55OyBwaGFzZXM6IGFueTsgfTtcbiAgICBwcmlvcml0aWVzOiBhbnk7XG4gICAgZGlzcG9zYWJsZXM6IGFueVtdO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IGFueSwgYmFzZU1vZGVsOiBhbnkpIHtcblxuICAgICAgICB2YXIgZGVmYXVsdHMgPVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBUaGUgc2VsZWN0ZWQgbm9kZVxuICAgICAgICAgICAgbm9kZTogbnVsbCxcblxuICAgICAgICAgICAgLy8gVGhlIG92ZXJhbGwgcHJvY2VzcyBtb2RlbCBvYmplY3RcbiAgICAgICAgICAgIG1vZGVsOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIGNvbmZpZ3VyYXRpb24pO1xuXG4gICAgICAgIHRoaXMuYWN0aW9uID0gb3B0aW9ucy5ub2RlO1xuICAgICAgICB0aGlzLm1vZGVsID0gb3B0aW9ucy5tb2RlbDtcblxuICAgICAgICB0aGlzLnNoYXJlZG9UeXBlUGlja2VyT3B0aW9ucyA9XG4gICAgICAgIHtcbiAgICAgICAgICAgIG11bHRpU2VsZWN0OiBmYWxzZSxcbiAgICAgICAgICAgIHNlbGVjdE1vZGU6IFwic3lzdGVtTmFtZVwiLFxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtOiB0aGlzLmFjdGlvbi5jb25maWcudGFza1R5cGUsXG4gICAgICAgICAgICByb290VHlwZXM6IFtcInRhc2tcIl1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFzc2lnbm1lbnRQaWNrZXJPcHRpb25zID1cbiAgICAgICAge1xuICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbixcbiAgICAgICAgICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZTogdGhpcy5hY3Rpb24uY29uZmlnLnRhc2tUeXBlLFxuICAgICAgICAgICAgYXNzaWdubWVudHM6IHRoaXMuYWN0aW9uLnVpLmFzc2lnbm1lbnRzLFxuICAgICAgICAgICAgLy8gRXhjbHVkZSB0aGVzZSByb2xlcyBhcyBtYW5hZ2VkIGVsc2V3aGVyZVxuICAgICAgICAgICAgZXhjbHVkZVJvbGVzOiBbXCJwcmltYXJ5LW93bmVyXCJdXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5waGFzZXMgPSB0aGlzLmFjdGlvbi51aS5waGFzZXM7XG4gICAgICAgIHRoaXMucGhhc2VQaWNrZXJPcHRpb25zID1cbiAgICAgICAge1xuICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbixcbiAgICAgICAgICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZTogdGhpcy5hY3Rpb24uY29uZmlnLnRhc2tUeXBlLFxuICAgICAgICAgICAgcGhhc2VzOiB0aGlzLnBoYXNlc1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucHJpb3JpdGllcyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xuXG4gICAgICAgIHRoaXMuZGlzcG9zYWJsZXMgPVxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uLmNvbmZpZy5vbkNvbXBsZXRlT3V0bGV0LnN1YnNjcmliZSh0aGlzLnNldE9uQ29tcGxldGVPdXRsZXQuYmluZChzZWxmKSksXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb24uY29uZmlnLm9uT3ZlcmR1ZU91dGxldC5zdWJzY3JpYmUodGhpcy5zZXRPbk92ZXJkdWVPdXRsZXQuYmluZChzZWxmKSlcbiAgICAgICAgICAgIF07XG4gICAgfTtcblxuICAgIGxvYWRBbmRCaW5kKCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICAkYWpheE11dGV4LmdldE9uY2UoXCIvYXBpL29kcy9vcHRpb25zZXRzL3dvcmstcHJpb3JpdHlcIilcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZTogeyBvcHRpb25TZXRWYWx1ZVByb3BlcnRpZXM6IGFueTsgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJpb3JpdGllcyhyZXNwb25zZS5vcHRpb25TZXRWYWx1ZVByb3BlcnRpZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgXy5lYWNoKHRoaXMuZGlzcG9zYWJsZXMsIChkOiB7IGRpc3Bvc2U6ICgpID0+IGFueTsgfSkgPT4gZC5kaXNwb3NlKCkpO1xuICAgIH07XG5cbiAgICBzZXRPbkNvbXBsZXRlT3V0bGV0KCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmFjdGlvbi5jb25maWcub25Db21wbGV0ZU91dGxldCgpKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbi5hZGRBdmFpbGFibGVPdXRsZXQoXCJvbkNvbXBsZXRlXCIsIFwiVGFzayBjb21wbGV0ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uLnJlbW92ZUF2YWlsYWJsZU91dGxldChcIm9uQ29tcGxldGVcIik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2V0T25SZW1pbmRlck91dGxldCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5hY3Rpb24uY29uZmlnLm9uUmVtaW5kZXJPdXRsZXQoKSkge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb24uYWRkQXZhaWxhYmxlT3V0bGV0KFwib25SZW1pbmRlckR1ZVwiLCBcIlJlbWluZGVyIGR1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uLnJlbW92ZUF2YWlsYWJsZU91dGxldChcIm9uUmVtaW5kZXJEdWVcIik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2V0T25PdmVyZHVlT3V0bGV0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGlvbi5jb25maWcub25PdmVyZHVlT3V0bGV0KCkpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uLmFkZEF2YWlsYWJsZU91dGxldChcIm9uT3ZlcmR1ZVwiLCBcIk92ZXJkdWVcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbi5yZW1vdmVBdmFpbGFibGVPdXRsZXQoXCJvbk92ZXJkdWVcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=