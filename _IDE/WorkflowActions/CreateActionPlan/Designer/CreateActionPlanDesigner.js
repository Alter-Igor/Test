/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************************************************************************************!*\
  !*** ./src/NodeBased/WorkflowActions/CreateActionPlan/Designer/CreateActionPlanDesigner.ts ***!
  \*********************************************************************************************/

// Namespacing
// namespace("");
//ensure Custom.WorkflowActions object exists
window.Custom = window.Custom || {};
window.Custom.WorkflowActions = window.Custom.WorkflowActions || {};
// View model
window.Custom.WorkflowActions.CreateActionPlanDesigner = function (element, configuration, base) {
    var self = this;
    var defaults = {
        // The selected node
        node: null,
        // The overall process model object
        model: null
    };
    var options = $.extend(true, {}, defaults, configuration);
    self.action = options.node;
    self.model = options.model;
};

})();

var __webpack_export_target__ = (WorkflowActions = typeof WorkflowActions === "undefined" ? {} : WorkflowActions);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVzaWduZXIvQ3JlYXRlQWN0aW9uUGxhbkRlc2lnbmVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxjQUFjO0FBQ2QsaUJBQWlCO0FBRWpCLDZDQUE2QztBQUM3QyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztBQUdwRSxhQUFhO0FBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsd0JBQXdCLEdBQUcsVUFBVSxPQUFXLEVBQUUsYUFBa0IsRUFBRSxJQUFTO0lBRXpHLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztJQUNoQixJQUFJLFFBQVEsR0FDWjtRQUNJLG9CQUFvQjtRQUNwQixJQUFJLEVBQUUsSUFBSTtRQUVWLG1DQUFtQztRQUNuQyxLQUFLLEVBQUUsSUFBSTtLQUNkLENBQUM7SUFFRixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRTFELElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFFL0IsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vV29ya2Zsb3dBY3Rpb25zLy4vc3JjL05vZGVCYXNlZC9Xb3JrZmxvd0FjdGlvbnMvQ3JlYXRlQWN0aW9uUGxhbi9EZXNpZ25lci9DcmVhdGVBY3Rpb25QbGFuRGVzaWduZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gTmFtZXNwYWNpbmdcbi8vIG5hbWVzcGFjZShcIlwiKTtcblxuLy9lbnN1cmUgQ3VzdG9tLldvcmtmbG93QWN0aW9ucyBvYmplY3QgZXhpc3RzXG53aW5kb3cuQ3VzdG9tID0gd2luZG93LkN1c3RvbSB8fCB7fTtcbndpbmRvdy5DdXN0b20uV29ya2Zsb3dBY3Rpb25zID0gd2luZG93LkN1c3RvbS5Xb3JrZmxvd0FjdGlvbnMgfHwge307XG5cbiBcbi8vIFZpZXcgbW9kZWxcbndpbmRvdy5DdXN0b20uV29ya2Zsb3dBY3Rpb25zLkNyZWF0ZUFjdGlvblBsYW5EZXNpZ25lciA9IGZ1bmN0aW9uIChlbGVtZW50OmFueSwgY29uZmlndXJhdGlvbjogYW55LCBiYXNlOiBhbnkpIFxue1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZGVmYXVsdHMgPVxuICAgIHtcbiAgICAgICAgLy8gVGhlIHNlbGVjdGVkIG5vZGVcbiAgICAgICAgbm9kZTogbnVsbCxcblxuICAgICAgICAvLyBUaGUgb3ZlcmFsbCBwcm9jZXNzIG1vZGVsIG9iamVjdFxuICAgICAgICBtb2RlbDogbnVsbFxuICAgIH07XG5cbiAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgY29uZmlndXJhdGlvbik7XG5cbiAgICBzZWxmLmFjdGlvbiA9IG9wdGlvbnMubm9kZTtcbiAgICBzZWxmLm1vZGVsID0gb3B0aW9ucy5tb2RlbDtcblxufTtcblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=