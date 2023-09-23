/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/WebBased/Common/ObjectHelper.ts":
/*!*********************************************!*\
  !*** ./src/WebBased/Common/ObjectHelper.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flattenObject: () => (/* binding */ flattenObject),
/* harmony export */   setAllFieldsToNull: () => (/* binding */ setAllFieldsToNull),
/* harmony export */   strToClass: () => (/* binding */ strToClass)
/* harmony export */ });
function strToClass(className, base) {
    const classParts = className.split('.');
    let classReference = base;
    for (const part of classParts) {
        if (!classReference[part]) {
            return undefined;
        }
        classReference = classReference[part];
    }
    ;
    return classReference;
}
function setAllFieldsToNull(model) {
    let keys = Object.keys(model);
    keys.forEach((key) => {
        model[key] = null;
    });
}
function flattenObject(ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i))
            continue;
        if ((typeof ob[i]) == 'object') {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x))
                    continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        }
        else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}


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
/*!*********************************************************************!*\
  !*** ./src/WebBased/PortalWidgets/RefreshWatcher/RefreshWatcher.ts ***!
  \*********************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RefreshWatcher: () => (/* binding */ RefreshWatcher)
/* harmony export */ });
/* harmony import */ var _Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Common/ObjectHelper */ "./src/WebBased/Common/ObjectHelper.ts");

function RefreshWatcher(element, configuration, baseModel) {
    return new RefreshWatcherClass(element, configuration, baseModel);
}
class RefreshWatcherClass {
    constructor(element, configuration, baseModel) {
        this.defaults = {
            widgets: [],
            useIntervalRefreshEveryXSeconds: false,
            refreshOnEvents: false,
            eventsToListenTo: [],
            intervalSeconds: 0
        };
        this.lastRefresh = new Date();
        this.refreshLog = [];
        this.originalConfiguration = configuration;
        ;
        this.configuration = $.extend(true, {}, this.defaults, configuration);
        this.model = ko.observable(this.configuration.configuration);
    }
    onDestroy() {
        $ui.util.dispose(this.disposables);
    }
    loadAndBind() {
        this.disposables = [];
        this.model().eventsToListenTo?.forEach((event) => {
            console.log("Subscribing to event", event);
            this.disposables.push($ui.events.subscribe(event.eventName, (e) => {
                this.refreshComponents(event.eventName);
            }, this));
        });
        if (this.model().useIntervalRefreshEveryXSeconds && this.model().intervalSeconds && this.model().intervalSeconds > 0) {
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.interval = setInterval(() => {
                this.refreshComponents("interval");
            }, this.model().intervalSeconds * 1000);
            this.disposables.push(this.interval);
        }
    }
    refreshComponents(eventName) {
        this.refreshLog = this.refreshLog || [];
        if (this.lastRefresh) //TODO: change this so we collect all refreshes and do them in one go
         {
            let secondsSinceLastRefresh = (new Date().getTime() - this.lastRefresh.getTime()) / 100;
            console.log("Seconds since last refresh", secondsSinceLastRefresh);
            if (secondsSinceLastRefresh < 10) {
                console.log("Skipping refresh, too soon");
                return;
            }
        }
        this.lastRefresh = new Date();
        console.log("Refreshing components");
        let widgetsToRefresh = this.model().widgets;
        console.log("Widgets to refresh: ", widgetsToRefresh.length);
        widgetsToRefresh?.forEach((widgetToRefresh) => {
            let logItem = { eventName: eventName, widgets: widgetToRefresh, time: new Date(), success: false };
            try {
                let componentToRefresh = $ui.widgets.instances().find((x) => {
                    let classReference = (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_0__.strToClass)(widgetToRefresh.typeName, window);
                    if (!classReference) {
                        return false;
                    }
                    return x instanceof (0,_Common_ObjectHelper__WEBPACK_IMPORTED_MODULE_0__.strToClass)(widgetToRefresh.typeName, window);
                });
                if (componentToRefresh && componentToRefresh[widgetToRefresh.methodToExecute]) {
                    // let params = widgets.parameters;
                    console.log("Refreshing", widgetToRefresh.typeName, widgetToRefresh.methodToExecute);
                    componentToRefresh[widgetToRefresh.methodToExecute](); //todo: parameters
                }
            }
            catch (e) {
                console.log(e);
            }
            finally {
                logItem.success = true;
                this.refreshLog.push(logItem);
            }
        });
    }
}

})();

var __webpack_export_target__ = (PortalWidgets = typeof PortalWidgets === "undefined" ? {} : PortalWidgets);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVMsRUFBQyxTQUFTLEVBQUUsT0FBTyxFQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUMsS0FBSyxFQUFDLENBQUM7WUFFOUYsSUFBSTtnQkFDQSxJQUFJLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7b0JBRTdELElBQUksY0FBYyxHQUFHLGdFQUFVLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDbEUsSUFBRyxDQUFDLGNBQWMsRUFDbEI7d0JBQ0ksT0FBTyxLQUFLLENBQUM7cUJBQ2hCO29CQUNBLE9BQU8sQ0FBQyxZQUFZLGdFQUFVLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQ3JFLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksa0JBQWtCLElBQUksa0JBQWtCLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxFQUFFO29CQUMzRSxtQ0FBbUM7b0JBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUNyRixrQkFBa0IsQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQjtpQkFDNUU7YUFDSjtZQUNELE9BQU8sQ0FBQyxFQUFFO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFFbEI7b0JBRUQ7Z0JBQ0ksT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzLy4vc3JjL1dlYkJhc2VkL0NvbW1vbi9PYmplY3RIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Qb3J0YWxXaWRnZXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vUG9ydGFsV2lkZ2V0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1BvcnRhbFdpZGdldHMvLi9zcmMvV2ViQmFzZWQvUG9ydGFsV2lkZ2V0cy9SZWZyZXNoV2F0Y2hlci9SZWZyZXNoV2F0Y2hlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBmdW5jdGlvbiBzdHJUb0NsYXNzKGNsYXNzTmFtZTpzdHJpbmcsIGJhc2U6YW55KSB7XG4gICAgY29uc3QgY2xhc3NQYXJ0cyA9IGNsYXNzTmFtZS5zcGxpdCgnLicpO1xuICAgIGxldCBjbGFzc1JlZmVyZW5jZSA9IGJhc2U7XG5cbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgY2xhc3NQYXJ0cykge1xuICAgICAgICBpZighY2xhc3NSZWZlcmVuY2VbcGFydF0pIFxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNsYXNzUmVmZXJlbmNlID0gY2xhc3NSZWZlcmVuY2VbcGFydF07XG4gICAgfTsgXG4gICAgcmV0dXJuIGNsYXNzUmVmZXJlbmNlO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBbGxGaWVsZHNUb051bGwobW9kZWw6YW55KSB7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhtb2RlbCk7XG4gICAga2V5cy5mb3JFYWNoKChrZXk6IGFueSkgPT4ge1xuICAgICAgICBtb2RlbFtrZXldID0gbnVsbDtcbiAgICB9KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbk9iamVjdChvYjogYW55KSB7XG4gICAgdmFyIHRvUmV0dXJuOiBhbnkgPSB7fTtcblxuICAgIGZvciAodmFyIGkgaW4gb2IpIHtcbiAgICAgICAgaWYgKCFvYi5oYXNPd25Qcm9wZXJ0eShpKSkgY29udGludWU7XG5cbiAgICAgICAgaWYgKCh0eXBlb2Ygb2JbaV0pID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB2YXIgZmxhdE9iamVjdCA9IGZsYXR0ZW5PYmplY3Qob2JbaV0pO1xuICAgICAgICAgICAgZm9yICh2YXIgeCBpbiBmbGF0T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmbGF0T2JqZWN0Lmhhc093blByb3BlcnR5KHgpKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIHRvUmV0dXJuW2kgKyAnLicgKyB4XSA9IGZsYXRPYmplY3RbeF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b1JldHVybltpXSA9IG9iW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b1JldHVybjtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IElSZWZyZXNoV2F0Y2hlckNvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi9SZWZyZXNoV2F0Y2hlckNvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IFRTaGFyZWRvIH0gZnJvbSBcIi4uLy4uLy4uL0ludGVyZmFjZXMvVFNoYXJlZG9cIjtcbmltcG9ydCB7IElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbn0gZnJvbSBcIi4uLy4uL0lERUFzcGVjdHMvQmFzZUNsYXNzZXMvQmFzZUlERUFzcGVjdFwiO1xuaW1wb3J0IHsgc3RyVG9DbGFzcyB9IGZyb20gXCIuLi8uLi9Db21tb24vT2JqZWN0SGVscGVyXCI7XG5cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBSZWZyZXNoV2F0Y2hlcihlbGVtZW50OiBIVE1MRWxlbWVudCwgY29uZmlndXJhdGlvbjogYW55LCBiYXNlTW9kZWw6IGFueSk6IFJlZnJlc2hXYXRjaGVyQ2xhc3Mge1xuICAgIHJldHVybiBuZXcgUmVmcmVzaFdhdGNoZXJDbGFzcyhlbGVtZW50LCBjb25maWd1cmF0aW9uLCBiYXNlTW9kZWwpO1xufVxuXG5pbnRlcmZhY2UgSUNvbmZpZyB7XG4gICAgY29uZmlndXJhdGlvbjogSVJlZnJlc2hXYXRjaGVyQ29uZmlndXJhdGlvblxufVxuXG5jbGFzcyBSZWZyZXNoV2F0Y2hlckNsYXNzIHtcblxuICAgIGRlZmF1bHRzOiBJUmVmcmVzaFdhdGNoZXJDb25maWd1cmF0aW9uID1cbiAgICAgICAge1xuICAgICAgICAgICAgd2lkZ2V0czogW10sXG4gICAgICAgICAgICB1c2VJbnRlcnZhbFJlZnJlc2hFdmVyeVhTZWNvbmRzOiBmYWxzZSxcbiAgICAgICAgICAgIHJlZnJlc2hPbkV2ZW50czogZmFsc2UsXG4gICAgICAgICAgICBldmVudHNUb0xpc3RlblRvOiBbXSxcbiAgICAgICAgICAgIGludGVydmFsU2Vjb25kczogMFxuICAgICAgICB9XG4gICAgY29uZmlndXJhdGlvbjogSUJhc2VJREVBc3BlY3RDb25maWd1cmF0aW9uPElDb25maWc+OyBkaXNwb3NhYmxlczogYW55O1xuICAgIGludGVydmFsOiBOb2RlSlMuVGltZW91dCB8IHVuZGVmaW5lZDtcbiAgICBtb2RlbDoga28uT2JzZXJ2YWJsZTxJUmVmcmVzaFdhdGNoZXJDb25maWd1cmF0aW9uPjtcbiAgICBvcmlnaW5hbENvbmZpZ3VyYXRpb246IElCYXNlSURFQXNwZWN0Q29uZmlndXJhdGlvbjxJQ29uZmlnPjtcbiAgICBsYXN0UmVmcmVzaDogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgcmVmcmVzaExvZzogYW55W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248SUNvbmZpZz4sIGJhc2VNb2RlbDogVFNoYXJlZG88YW55Pikge1xuXG4gICAgICAgIHRoaXMub3JpZ2luYWxDb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiBhcyBJQmFzZUlERUFzcGVjdENvbmZpZ3VyYXRpb248SUNvbmZpZz47O1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5kZWZhdWx0cywgY29uZmlndXJhdGlvbik7XG5cbiAgICAgICAgdGhpcy5tb2RlbCA9IGtvLm9ic2VydmFibGUodGhpcy5jb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24pO1xuXG4gICAgfVxuXG4gICAgcHVibGljIG9uRGVzdHJveSgpOiB2b2lkIHtcblxuICAgICAgICAkdWkudXRpbC5kaXNwb3NlKHRoaXMuZGlzcG9zYWJsZXMpO1xuICAgIH1cblxuXG5cbiAgICBwdWJsaWMgbG9hZEFuZEJpbmQoKTogdm9pZCB7XG5cblxuICAgICAgICB0aGlzLmRpc3Bvc2FibGVzID0gW107XG5cbiAgICAgICAgdGhpcy5tb2RlbCgpLmV2ZW50c1RvTGlzdGVuVG8/LmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1YnNjcmliaW5nIHRvIGV2ZW50XCIsIGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zYWJsZXMucHVzaChcbiAgICAgICAgICAgJHVpLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQuZXZlbnROYW1lLCAoZTphbnkpPT57XG4gICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbXBvbmVudHMoZXZlbnQuZXZlbnROYW1lKTtcbiAgICAgICAgICAgIH0sIHRoaXMpKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbCgpLnVzZUludGVydmFsUmVmcmVzaEV2ZXJ5WFNlY29uZHMgJiYgdGhpcy5tb2RlbCgpLmludGVydmFsU2Vjb25kcyAmJiB0aGlzLm1vZGVsKCkuaW50ZXJ2YWxTZWNvbmRzISA+IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29tcG9uZW50cyhcImludGVydmFsXCIpO1xuXG4gICAgICAgICAgICB9LCB0aGlzLm1vZGVsKCkuaW50ZXJ2YWxTZWNvbmRzISAqIDEwMDApO1xuXG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLnB1c2godGhpcy5pbnRlcnZhbCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJlZnJlc2hDb21wb25lbnRzKGV2ZW50TmFtZTpzdHJpbmcpIHtcblxuICAgICAgICB0aGlzLnJlZnJlc2hMb2cgPSB0aGlzLnJlZnJlc2hMb2cgfHwgW107XG4gICAgICAgIFxuXG4gICAgICAgIGlmKHRoaXMubGFzdFJlZnJlc2gpIC8vVE9ETzogY2hhbmdlIHRoaXMgc28gd2UgY29sbGVjdCBhbGwgcmVmcmVzaGVzIGFuZCBkbyB0aGVtIGluIG9uZSBnb1xuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgc2Vjb25kc1NpbmNlTGFzdFJlZnJlc2ggPSAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmxhc3RSZWZyZXNoLmdldFRpbWUoKSkgLyAxMDA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlY29uZHMgc2luY2UgbGFzdCByZWZyZXNoXCIsIHNlY29uZHNTaW5jZUxhc3RSZWZyZXNoKTtcbiAgICAgICAgICAgIGlmKHNlY29uZHNTaW5jZUxhc3RSZWZyZXNoIDwgMTApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTa2lwcGluZyByZWZyZXNoLCB0b28gc29vblwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXN0UmVmcmVzaCA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJSZWZyZXNoaW5nIGNvbXBvbmVudHNcIik7XG5cbiAgICAgICAgbGV0IHdpZGdldHNUb1JlZnJlc2ggPSB0aGlzLm1vZGVsKCkud2lkZ2V0cztcbiAgICAgICAgY29uc29sZS5sb2coXCJXaWRnZXRzIHRvIHJlZnJlc2g6IFwiLCB3aWRnZXRzVG9SZWZyZXNoLmxlbmd0aCk7XG5cbiAgICAgICAgd2lkZ2V0c1RvUmVmcmVzaD8uZm9yRWFjaCgod2lkZ2V0VG9SZWZyZXNoKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBsb2dJdGVtID0ge2V2ZW50TmFtZTpldmVudE5hbWUsIHdpZGdldHM6d2lkZ2V0VG9SZWZyZXNoLCB0aW1lOiBuZXcgRGF0ZSgpLCBzdWNjZXNzOmZhbHNlfTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRUb1JlZnJlc2ggPSAkdWkud2lkZ2V0cy5pbnN0YW5jZXMoKS5maW5kKCh4OiBhbnkpID0+IFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsYXNzUmVmZXJlbmNlID0gc3RyVG9DbGFzcyh3aWRnZXRUb1JlZnJlc2gudHlwZU5hbWUsIHdpbmRvdyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFjbGFzc1JlZmVyZW5jZSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIHN0clRvQ2xhc3Mod2lkZ2V0VG9SZWZyZXNoLnR5cGVOYW1lLCB3aW5kb3cpIFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudFRvUmVmcmVzaCAmJiBjb21wb25lbnRUb1JlZnJlc2hbd2lkZ2V0VG9SZWZyZXNoLm1ldGhvZFRvRXhlY3V0ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHBhcmFtcyA9IHdpZGdldHMucGFyYW1ldGVycztcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWZyZXNoaW5nXCIsIHdpZGdldFRvUmVmcmVzaC50eXBlTmFtZSwgd2lkZ2V0VG9SZWZyZXNoLm1ldGhvZFRvRXhlY3V0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFRvUmVmcmVzaFt3aWRnZXRUb1JlZnJlc2gubWV0aG9kVG9FeGVjdXRlXSgpOyAvL3RvZG86IHBhcmFtZXRlcnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsb2dJdGVtLnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaExvZy5wdXNoKGxvZ0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==