// Namespacing
// namespace("Sharedo.Core.Case.WorkflowEditor.NodeTypes");

(window as any).Custom = (window as any).Custom || {};
(window as any).Custom.WorkflowActions = (window as any).Custom.WorkflowActions || {};

// View model
(window as any).Custom.WorkflowActions.CreateTaskDesigner = function (element: any, configuration: any, base: any) {
    var self = this;
    var defaults =
    {
        // The selected node
        node: null,

        // The overall process model object
        model: null
    };

    var options = $.extend(true, {}, defaults, configuration);

    self.action = options.node;
    self.model = options.model;

    self.sharedoTypePickerOptions = 
    {
        multiSelect: false,
        selectMode: "systemName",
        selectedItem: self.action.config.taskType,
        rootTypes: ["task"]
    };

    self.assignmentPickerOptions =
    {
        action: self.action,
        sharedoTypeSystemName: self.action.config.taskType,
        assignments: self.action.ui.assignments,
        // Exclude these roles as managed elsewhere
        excludeRoles: ["primary-owner"]
    };

    self.phases = self.action.ui.phases;
    self.phasePickerOptions =
    {
        action: self.action,
        sharedoTypeSystemName: self.action.config.taskType,
        phases: self.phases
    };

    self.priorities = ko.observableArray();

    self.disposables =
    [
        self.action.config.onCompleteOutlet.subscribe(self.setOnCompleteOutlet.bind(self)),
        self.action.config.onOverdueOutlet.subscribe(self.setOnOverdueOutlet.bind(self))
    ];
};

(window as any).Custom.WorkflowActions.CreateTaskDesigner.prototype.loadAndBind = function() {
    const self = this;

    $ajaxMutex.getOnce("/api/ods/optionsets/work-priority")
        .then((response: { optionSetValueProperties: any; }) => {
            self.priorities(response.optionSetValueProperties);
        });
}

window.Custom.WorkflowActions.CreateTaskDesigner.prototype.onDestroy = function()
{
    var self = this;

    _.each(self.disposables, (d: { dispose: () => any; }) => d.dispose());
};

window.Custom.WorkflowActions.CreateTaskDesigner.prototype.setOnCompleteOutlet = function()
{
    var self = this;
    if (self.action.config.onCompleteOutlet())
    {
        self.action.addAvailableOutlet("onComplete", "Task complete");
    }
    else
    {
        self.action.removeAvailableOutlet("onComplete");
    }
};

window.Custom.WorkflowActions.CreateTaskDesigner.prototype.setOnReminderOutlet = function()
{
    var self = this;
    if (self.action.config.onReminderOutlet())
    {
        self.action.addAvailableOutlet("onReminderDue", "Reminder due");
    }
    else
    {
        self.action.removeAvailableOutlet("onReminderDue");
    }
};

window.Custom.WorkflowActions.CreateTaskDesigner.prototype.setOnOverdueOutlet = function()
{
    var self = this;
    if (self.action.config.onOverdueOutlet())
    {
        self.action.addAvailableOutlet("onOverdue", "Overdue");
    }
    else
    {
        self.action.removeAvailableOutlet("onOverdue");
    }
};
