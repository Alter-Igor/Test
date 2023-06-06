(function () {
  var createModel = function (actionModel, actionOptions, wfModel, stepModel) {
    // Reference self as the action model we're extending
    var self = actionModel;

    // Setup model defaults and extend from loaded config
    var defaults = {
      // Your custom config is passed in this object
      config: {
        description: null,
        // Action plan description
        type: "checkbox",
        mandatory: false,
        order: 100,
        // Action plan ordering
        callToActionVar: null,
        // Optional call to action to add to this item
        outputVariable: null,
        // Output variable
        outputCollection: null // Output this action plan item to a list of them
      },

      // The list of connections as persisted
      connections: {}
    };
    var options = $.extend(true, {}, defaults, actionOptions);

    // Add this action's specific config to the model
    self.config.description = ko.observable(options.config.description);
    self.config.type = ko.observable(options.config.type);
    self.config.mandatory = ko.observable(options.config.mandatory);
    self.config.order = ko.observable(options.config.order);
    self.config.callToActionVar = ko.observable(options.config.callToActionVar);
    self.config.outputVariable = ko.observable(options.config.outputVariable);
    self.config.outputCollection = ko.observable(options.config.outputCollection);
    self.ui.allowCta = ko.observable();
    self.ui.allowMandatory = ko.observable();
    self.ui.types = [{
      value: "checkbox",
      name: "Checkbox",
      allowCta: true,
      allowMandatory: true
    }, {
      value: "infobox",
      name: "Info Box",
      allowCta: true,
      allowMandatory: false
    }, {
      value: "header",
      name: "Header",
      allowCta: false,
      allowMandatory: false
    }];
    if (self.config.type()) {
      var item = _.find(self.ui.types, t => {
        return t.value === self.config.type();
      });
      if (!item) {
        self.ui.allowCta(true);
        self.ui.allowMandatory(false);
      } else {
        self.ui.allowCta(item.allowCta);
        self.ui.allowMandatory(item.allowMandatory);
      }
    }
    self.config.type.subscribe(() => {
      var item = _.find(self.ui.types, t => {
        return t.value === self.config.type();
      });
      if (!item) {
        self.ui.allowCta(true);
        self.ui.allowMandatory(false);
      } else {
        self.ui.allowCta(item.allowCta);
        self.ui.allowMandatory(item.allowMandatory);
      }
    });

    // Extend with this action's specific validation
    self.validation.description = Validator.required(self, self.config.description, "Description is required");
    self.validation.order = Validator.required(self, self.config.order, "Ordering is required");

    // Extend the action model with our custom model validation
    self.actionModelErrorCount = ko.pureComputed(function () {
      var fails = 0;
      if (self.validation.description()) fails++;
      if (self.validation.order()) fails++;
      return fails;
    });

    // Track variable associated with C2A
    self.ui.callToActionVarSelector = self.trackVariable(self.config.callToActionVar, "/Entity/Call To Action");
    self.ui.outputVariableSelector = self.trackVariable(self.config.outputVariable, "/Entity/Action Plan Item");
    self.ui.outputCollectionSelector = self.trackVariable(self.config.outputCollection, "/Entity/Action Plan Item", {
      mustBeCollection: true,
      mustNotBeCollection: false
    });
  };
  var dispose = function (actionModel) {
    var self = actionModel;
    self.ui.callToActionVarSelector.dispose();
    self.ui.outputVariableSelector.dispose();
    self.ui.outputCollectionSelector.dispose();
  };
  return {
    createModel: createModel,
    dispose: dispose
  };
})();
//# sourceMappingURL=createActionPlan-factory.js.map