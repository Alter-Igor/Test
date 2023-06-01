function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
export function runMe(_x) {
  return _runMe.apply(this, arguments);
}
function _runMe() {
  _runMe = _asyncToGenerator(function* (context) {
    var thisModuleName = "altEDiscoverySearchDescription";
    console.log("%c[".concat(thisModuleName, "] - RunMe Executing"), "color: #00aaff", context);
    if (context.koContext.$parentContext === undefined) {
      return;
    }
    var sharedoId = context.workItemContext.id();

    // example of gettig data from sharedo
    // let data = await $ajax.get("/api/v1/public/workItem/" + sharedoId);    
    // if(data.aspectData.formBuilder.formData.altEDiscoverySearchDescription === "test") {
    //         console.log("its test");
    // }  

    var currentPhaseName = context.workItemContext.phaseName();
    console.log("%c[".concat(thisModuleName, "] - currentPhaseName"), "color: #00aaff", currentPhaseName);
    if (currentPhaseName === undefined) {
      return;
    }
    if (currentPhaseName === "Draft") {
      return;
    }
    if (context.form.options.readonly === true) {
      return;
    }
    context.form.options.readonly = true;
    context.form.refresh();
  });
  return _runMe.apply(this, arguments);
}
//# sourceMappingURL=Search.js.map