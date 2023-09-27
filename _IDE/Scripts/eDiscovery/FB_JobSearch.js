/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
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
/*!*******************************!*\
  !*** ./FB_JobSearch/index.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   runMe: () => (/* binding */ runMe)
/* harmony export */ });
//This function is called from the module-loader webcomponent in the form builder
//it is called when the form is loaded
//It checks the current phase is in anything except draft it makes the fomr readonly.
async function runMe(context) {
    let sharedoId = context.workItemContext.id();
    let currentPhaseName = context.workItemContext.phaseName();
    //Check the current phase, undefined mean its a new form 
    //Draft means its a saved new form that has not been submitted
    if (currentPhaseName === undefined) {
        return;
    }
    if (currentPhaseName === "Draft") {
        return;
    }
    if (!context.form) {
        return;
    }
    //if the form is already readonly then return as we dont need to do anything
    if (context.form.readonly() === true) {
        return;
    }
    //set the form to readonly
    context.form.readonly(true);
}
// example of gettig data from sharedo
// let data = await $ajax.get("/api/v1/public/workItem/" + sharedoId);    
// if(data.aspectData.formBuilder.formData.altEDiscoverySearchDescription === "test") {
//         console.log("its test");
// } 

window.FB_JobSearch = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkJfSm9iU2VhcmNoLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTEEsaUZBQWlGO0FBQ2pGLHNDQUFzQztBQUl0QyxxRkFBcUY7QUFDOUUsS0FBSyxVQUFVLEtBQUssQ0FBQyxPQUE0QjtJQUVwRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzdDLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUUzRCx5REFBeUQ7SUFDekQsOERBQThEO0lBQzlELElBQUcsZ0JBQWdCLEtBQUssU0FBUyxFQUFFO1FBQUMsT0FBTztLQUFDO0lBQzVDLElBQUcsZ0JBQWdCLEtBQUssT0FBTyxFQUFFO1FBQUMsT0FBTztLQUFDO0lBRTFDLElBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1FBQUMsT0FBTztLQUFDO0lBQzNCLDRFQUE0RTtJQUM1RSxJQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUcsSUFBSSxFQUFFO1FBQUMsT0FBTztLQUFDO0lBQzVDLDBCQUEwQjtJQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVoQyxDQUFDO0FBRUcsc0NBQXNDO0FBQ3RDLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsbUNBQW1DO0FBQ25DLEtBQUsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9GQl9Kb2JTZWFyY2gvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcbi8vVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgZnJvbSB0aGUgbW9kdWxlLWxvYWRlciB3ZWJjb21wb25lbnQgaW4gdGhlIGZvcm0gYnVpbGRlclxuLy9pdCBpcyBjYWxsZWQgd2hlbiB0aGUgZm9ybSBpcyBsb2FkZWRcblxuaW1wb3J0IHsgSUZvcm1CdWlsZGVyQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi8uLi9JbnRlcmZhY2VzL0Zvcm1CdWlsZGVyL0lGb3JtQnVpbGRlckNvbnRleHRcIjtcblxuLy9JdCBjaGVja3MgdGhlIGN1cnJlbnQgcGhhc2UgaXMgaW4gYW55dGhpbmcgZXhjZXB0IGRyYWZ0IGl0IG1ha2VzIHRoZSBmb21yIHJlYWRvbmx5LlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bk1lKGNvbnRleHQ6IElGb3JtQnVpbGRlckNvbnRleHQpIHtcbiAgICBcbiAgICBsZXQgc2hhcmVkb0lkID0gY29udGV4dC53b3JrSXRlbUNvbnRleHQuaWQoKTsgICAgICBcbiAgICBsZXQgY3VycmVudFBoYXNlTmFtZSA9IGNvbnRleHQud29ya0l0ZW1Db250ZXh0LnBoYXNlTmFtZSgpO1xuICAgIFxuICAgIC8vQ2hlY2sgdGhlIGN1cnJlbnQgcGhhc2UsIHVuZGVmaW5lZCBtZWFuIGl0cyBhIG5ldyBmb3JtIFxuICAgIC8vRHJhZnQgbWVhbnMgaXRzIGEgc2F2ZWQgbmV3IGZvcm0gdGhhdCBoYXMgbm90IGJlZW4gc3VibWl0dGVkXG4gICAgaWYoY3VycmVudFBoYXNlTmFtZSA9PT0gdW5kZWZpbmVkKSB7cmV0dXJuO30gXG4gICAgaWYoY3VycmVudFBoYXNlTmFtZSA9PT0gXCJEcmFmdFwiKSB7cmV0dXJuO30gXG4gICAgXG4gICAgaWYoIWNvbnRleHQuZm9ybSkge3JldHVybjt9XG4gICAgLy9pZiB0aGUgZm9ybSBpcyBhbHJlYWR5IHJlYWRvbmx5IHRoZW4gcmV0dXJuIGFzIHdlIGRvbnQgbmVlZCB0byBkbyBhbnl0aGluZ1xuICAgIGlmKGNvbnRleHQuZm9ybS5yZWFkb25seSgpPT09dHJ1ZSkge3JldHVybjt9XG4gICAgLy9zZXQgdGhlIGZvcm0gdG8gcmVhZG9ubHlcbiAgICBjb250ZXh0LmZvcm0ucmVhZG9ubHkodHJ1ZSk7XG4gICAgICBcbn1cbiAgICBcbiAgICAvLyBleGFtcGxlIG9mIGdldHRpZyBkYXRhIGZyb20gc2hhcmVkb1xuICAgIC8vIGxldCBkYXRhID0gYXdhaXQgJGFqYXguZ2V0KFwiL2FwaS92MS9wdWJsaWMvd29ya0l0ZW0vXCIgKyBzaGFyZWRvSWQpOyAgICBcbiAgICAvLyBpZihkYXRhLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEuYWx0RURpc2NvdmVyeVNlYXJjaERlc2NyaXB0aW9uID09PSBcInRlc3RcIikge1xuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgdGVzdFwiKTtcbiAgICAvLyB9ICJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==