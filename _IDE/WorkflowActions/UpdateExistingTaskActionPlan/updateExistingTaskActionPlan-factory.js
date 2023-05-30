(function () {
  var createModel = function createModel(actionModel, actionOptions, wfModel, stepModel) {
    // Reference self as the action model we're extending
    var self = actionModel;

    // Setup model defaults and extend from loaded config
    var defaults = {
      // Your custom config is passed in this object
      config: {
        taskId: null,
        actionPlanTitle: "",
        // Title for the action plan,
        actionPlanItemsList: null // The variable holding an array of action plan items to associate with the task
        //outputVariable: null,       // The variable to output the new task id to
      },

      // The list of connections as persisted
      connections: {}
    };
    var options = $.extend(true, {}, defaults, actionOptions);

    // Add this action's specific config to the model
    self.config.taskId = ko.observable(options.config.taskId);
    self.config.actionPlanItemsList = ko.observable(options.config.actionPlanItemsList);
    self.config.actionPlanTitle = ko.observable(options.config.actionPlanTitle);
    //self.config.outputVariable = ko.observable(options.config.outputVariable);

    self.validation.taskId = Validator.required(self, self.config.taskId, "You must specify a variable holding the task id");

    // Extend with this action's specific validation
    self.validation.actionPlanTitle = ko.pureComputed(() => {
      var actionPlanTitle = self.config.actionPlanTitle();
      if (!actionPlanTitle) return "Action plan title must be provided";
      return null;
    });

    // Extend the action model with our custom model validation
    self.actionModelErrorCount = ko.pureComputed(function () {
      var fails = 0;
      if (self.validation.taskId()) fails++;
      if (self.validation.actionPlanTitle()) fails++;
      return fails;
    });

    // Create the variable validator/selector - this is dynamic based on context type
    self.ui.taskId = self.trackVariable(self.config.taskId, "/Identifier/Work Type Identifier/Task Identifier");
    //self.ui.outputVariable = self.trackVariable(self.config.outputVariable, "/Identifier/Work Type Identifier/Task Identifier");
    self.ui.actionPlanItemsList = self.trackVariable(self.config.actionPlanItemsList, "/Entity/Action Plan Item", {
      mustBeCollection: true,
      mustNotBeCollection: false
    });
  };
  var dispose = function dispose(actionModel) {
    var self = actionModel;
    self.ui.taskId.dispose();
    //self.ui.outputVariable.dispose();
    self.ui.actionPlanItemsList.dispose();
  };
  return {
    createModel: createModel,
    dispose: dispose
  };
})();
//# sourceMappingURL=updateExistingTaskActionPlan-factory.js.map