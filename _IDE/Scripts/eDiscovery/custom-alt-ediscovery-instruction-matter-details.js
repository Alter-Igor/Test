function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//This function is called from the module-loader webcomponent in the form builder
export function runMe(_x) {
  return _runMe.apply(this, arguments);
}
function _runMe() {
  _runMe = _asyncToGenerator(function* (context) {
    var matterDetails = context.alpacaForm.childrenByPropertyId["matter-details"];
    var expertMatterNumber = context.alpacaForm.childrenByPropertyId["expert-matter-number"];
    var pipelineMatter = context.alpacaForm.childrenByPropertyId["pipeline-matter"];
    hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);

    //add a change event to the expert-matter-number
    context.alpacaForm.childrenByPropertyId["expert-matter-number"].on("change", function (ev) {
      hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);
    });
  });
  return _runMe.apply(this, arguments);
}
function hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter) {
  if (expertMatterNumber.getValue() === "" || pipelineMatter.getValue() == true) {
    matterDetails.options.hidden = true;
    matterDetails.refresh();
  } else {
    matterDetails.options.hidden = false;
    matterDetails.refresh();
  }
}
//# sourceMappingURL=custom-alt-ediscovery-instruction-matter-details.js.map