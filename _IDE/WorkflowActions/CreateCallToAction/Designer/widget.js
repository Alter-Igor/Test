// Namespacing
// namespace("");

window.Custom = window.Custom || {};
window.Custom.WorkflowActions = window.Custom.WorkflowActions || {};

// View model
window.Custom.WorkflowActions.CreateCallToActionDesigner = function (element, configuration, base) {
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
  self.sharedoTypePickerOptions = {
    multiSelect: false,
    selectMode: "systemName",
    selectedItem: self.action.config.taskType,
    rootTypes: ["task"]
  };

  // Hold ref info about the selected command
  self.commandMeta = {
    title: ko.observable(null),
    description: ko.observable(null),
    icon: ko.observable(null)
  };

  // Subscribe to changes to the command
  self.disposables = [self.action.config.command.subscribe(self.loadCommandMeta.bind(self))];
};
window.Custom.WorkflowActions.CreateCallToActionDesigner.prototype.onDestroy = function () {
  var self = this;
  _.each(self.disposables, d => d.dispose());
};
window.Custom.WorkflowActions.CreateCallToActionDesigner.prototype.loadAndBind = function () {
  var self = this;
  self.loadCommandMeta();
};
window.Custom.WorkflowActions.CreateCallToActionDesigner.prototype.chooseCommand = function () {
  var self = this;

  // What context have we got selected - transform to menu scope
  var objectType = "Global";
  switch (self.action.config.contextType()) {
    case "sharedo":
      objectType = "Sharedo";
      break;
    case "participant":
      objectType = "Participant";
      break;
    case "participantRole":
      objectType = "ParticipantRole";
      break;
  }
  if (self.model.blade) $ui.stacks.cancelAfter(self.model.blade);else $ui.stacks.cancelAll();
  var selectCommand = function (then) {
    $ui.stacks.openPanel("Sharedo.Core.Case.Menus.SelectCommandBlade", {
      menuType: "General",
      objectType: objectType
    }, {
      closing: function (systemName) {
        then(systemName);
      }
    });
  };
  var editCommand = function (command, config) {
    $ui.stacks.openPanel("Sharedo.Core.Case.Menus.CommandEditorBlade", {
      systemName: command,
      configuration: JSON.parse(config),
      allowRemove: true,
      allowChange: true,
      allowEmpty: true,
      scope: {
        menuType: "General",
        objectType: objectType
      }
    }, {
      closing: function (result) {
        self.action.config.command(result.systemName);
        self.action.config.commandConfig(JSON.stringify(result.configuration));
      }
    });
  };
  var command = self.action.config.command();
  var config = self.action.config.commandConfig();
  if (!command) {
    selectCommand(systemName => {
      editCommand(systemName, "{}");
    });
  } else {
    editCommand(command, config || "{}");
  }
};
window.Custom.WorkflowActions.CreateCallToActionDesigner.prototype.loadCommandMeta = function () {
  var self = this;
  var commandSystemName = self.action.config.command();
  if (!commandSystemName) {
    self.commandMeta.title(null);
    self.commandMeta.description(null);
    self.commandMeta.icon(null);
    return;
  }
  $ajaxMutex.getOnce("/api/commands/" + commandSystemName).then(meta => {
    self.commandMeta.title(meta.title);
    self.commandMeta.description(meta.description);
    self.commandMeta.icon(meta.icon);
  });
};
//# sourceMappingURL=widget.js.map