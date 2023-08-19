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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//This function is called from the module-loader webcomponent in the form builder
//it is called when the form is loaded
//It checks the current phase is in anything except draft it makes the fomr readonly.
function runMe(context) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
// example of gettig data from sharedo
// let data = await $ajax.get("/api/v1/public/workItem/" + sharedoId);    
// if(data.aspectData.formBuilder.formData.altEDiscoverySearchDescription === "test") {
//         console.log("its test");
// } 

window.FB_JobSearch = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkJfSm9iU2VhcmNoLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkEsaUZBQWlGO0FBQ2pGLHNDQUFzQztBQUN0QyxxRkFBcUY7QUFDOUUsU0FBZSxLQUFLLENBQUMsT0FBNEI7O1FBRXBELElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDN0MsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRTNELHlEQUF5RDtRQUN6RCw4REFBOEQ7UUFDOUQsSUFBRyxnQkFBZ0IsS0FBSyxTQUFTLEVBQUU7WUFBQyxPQUFPO1NBQUM7UUFDNUMsSUFBRyxnQkFBZ0IsS0FBSyxPQUFPLEVBQUU7WUFBQyxPQUFPO1NBQUM7UUFFMUMsSUFBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFBQyxPQUFPO1NBQUM7UUFDM0IsNEVBQTRFO1FBQzVFLElBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBRyxJQUFJLEVBQUU7WUFBQyxPQUFPO1NBQUM7UUFDNUMsMEJBQTBCO1FBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWhDLENBQUM7Q0FBQTtBQUVHLHNDQUFzQztBQUN0QywwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLG1DQUFtQztBQUNuQyxLQUFLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vRkJfSm9iU2VhcmNoL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgSUZvcm1CdWlsZGVyQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi8uLi9UeXBpbmdzL0Zvcm1CdWlsZGVyL0lGb3JtQnVpbGRlckNvbnRleHRcIjtcblxuLy9UaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBmcm9tIHRoZSBtb2R1bGUtbG9hZGVyIHdlYmNvbXBvbmVudCBpbiB0aGUgZm9ybSBidWlsZGVyXG4vL2l0IGlzIGNhbGxlZCB3aGVuIHRoZSBmb3JtIGlzIGxvYWRlZFxuLy9JdCBjaGVja3MgdGhlIGN1cnJlbnQgcGhhc2UgaXMgaW4gYW55dGhpbmcgZXhjZXB0IGRyYWZ0IGl0IG1ha2VzIHRoZSBmb21yIHJlYWRvbmx5LlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bk1lKGNvbnRleHQ6IElGb3JtQnVpbGRlckNvbnRleHQpIHtcbiAgICBcbiAgICBsZXQgc2hhcmVkb0lkID0gY29udGV4dC53b3JrSXRlbUNvbnRleHQuaWQoKTsgICAgICBcbiAgICBsZXQgY3VycmVudFBoYXNlTmFtZSA9IGNvbnRleHQud29ya0l0ZW1Db250ZXh0LnBoYXNlTmFtZSgpO1xuICAgIFxuICAgIC8vQ2hlY2sgdGhlIGN1cnJlbnQgcGhhc2UsIHVuZGVmaW5lZCBtZWFuIGl0cyBhIG5ldyBmb3JtIFxuICAgIC8vRHJhZnQgbWVhbnMgaXRzIGEgc2F2ZWQgbmV3IGZvcm0gdGhhdCBoYXMgbm90IGJlZW4gc3VibWl0dGVkXG4gICAgaWYoY3VycmVudFBoYXNlTmFtZSA9PT0gdW5kZWZpbmVkKSB7cmV0dXJuO30gXG4gICAgaWYoY3VycmVudFBoYXNlTmFtZSA9PT0gXCJEcmFmdFwiKSB7cmV0dXJuO30gXG4gICAgXG4gICAgaWYoIWNvbnRleHQuZm9ybSkge3JldHVybjt9XG4gICAgLy9pZiB0aGUgZm9ybSBpcyBhbHJlYWR5IHJlYWRvbmx5IHRoZW4gcmV0dXJuIGFzIHdlIGRvbnQgbmVlZCB0byBkbyBhbnl0aGluZ1xuICAgIGlmKGNvbnRleHQuZm9ybS5yZWFkb25seSgpPT09dHJ1ZSkge3JldHVybjt9XG4gICAgLy9zZXQgdGhlIGZvcm0gdG8gcmVhZG9ubHlcbiAgICBjb250ZXh0LmZvcm0ucmVhZG9ubHkodHJ1ZSk7XG4gICAgICBcbn1cbiAgICBcbiAgICAvLyBleGFtcGxlIG9mIGdldHRpZyBkYXRhIGZyb20gc2hhcmVkb1xuICAgIC8vIGxldCBkYXRhID0gYXdhaXQgJGFqYXguZ2V0KFwiL2FwaS92MS9wdWJsaWMvd29ya0l0ZW0vXCIgKyBzaGFyZWRvSWQpOyAgICBcbiAgICAvLyBpZihkYXRhLmFzcGVjdERhdGEuZm9ybUJ1aWxkZXIuZm9ybURhdGEuYWx0RURpc2NvdmVyeVNlYXJjaERlc2NyaXB0aW9uID09PSBcInRlc3RcIikge1xuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJpdHMgdGVzdFwiKTtcbiAgICAvLyB9ICJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==