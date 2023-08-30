// Namespacing
// namespace("");

//ensure Custom.WorkflowActions object exists
window.Custom = window.Custom || {};
window.Custom.WorkflowActions = window.Custom.WorkflowActions || {};

// View model
window.Custom.WorkflowActions.Search = function (element, configuration, base) {
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
//# sourceMappingURL=widget.js.map