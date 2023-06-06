(function()
{ 
    var createModel = function(actionModel: any, actionOptions: any, wfModel: any, stepModel: any)
    {
        // Reference self as the action model we're extending
        var self = actionModel;

        // Setup model defaults and extend from loaded config
        var defaults =
        {
            // Your custom config is passed in this object
            config:
            {
                taskType: "task",           // The task type to create
                taskTitle: null,            // The title of the task to create
                dueOnVariable: null,        // Variable holding the date the task is due
                priorityId: null,           // The priorityId of the task
                dueInDays: 0,               // The number of days in which the task will be due
                tag: null,                  // Any tag required
                addActionPlan: false,       // Whether to add an action plan to the task
                actionPlanTitle: "",        // Title for the action plan,
                parentWorkItemId: null,     // The variable holding the parent work item id
                taskOwnerOdsId: null,       // The variable holding who to assign the task to
                actionPlanItemsList: null,  // The variable holding an array of action plan items to associate with the task
                outputVariable: null,       // The variable to output the new task id to
                onCompleteOutlet: true,     // Whether to add the "task complete" outlet
                onOverdueOutlet: true,      // Whether to add the "overdue" outlet
                phaseOutlets: [],           // List of phase specific outlets,
                assignments: []             // List of assignments [{roleSystemName, odsIdVariableName}]
            },

            // The list of connections as persisted
            connections: {}
        };

        var options = $.extend(true, {}, defaults, actionOptions);

        // Add this action's specific config to the model
        self.config.taskType = ko.observable(options.config.taskType);
        self.config.taskTitle = ko.observable(options.config.taskTitle);
        self.config.dueInDays = ko.observable(options.config.dueInDays);
        self.config.tag = ko.observable(options.config.tag);
        self.config.dueOnVariable = ko.observable(options.config.dueOnVariable);
        self.config.priorityId = ko.observable(options.config.priorityId);
        self.config.addActionPlan = ko.observable(options.config.addActionPlan);
        self.config.actionPlanTitle = ko.observable(options.config.actionPlanTitle);
        self.config.parentWorkItemId = ko.observable(options.config.parentWorkItemId);
        self.config.taskOwnerOdsId = ko.observable(options.config.taskOwnerOdsId);
        self.config.actionPlanItemsList = ko.observable(options.config.actionPlanItemsList);
        self.config.outputVariable = ko.observable(options.config.outputVariable);
        self.config.onCompleteOutlet = ko.observable(options.config.onCompleteOutlet);
        self.config.onOverdueOutlet = ko.observable(options.config.onOverdueOutlet);

        // Extend with this action's specific validation
        self.validation.taskType = Validator.required(self, self.config.taskType, "Must specify the type of task to create");
        self.validation.taskTitle = Validator.required(self, self.config.taskTitle, "Task title must be provided");
        self.validation.parentWorkItemId = Validator.required(self, self.config.parentWorkItemId, "You must specify a variable holding the parent work item id");

        self.validation.actionPlanTitle = ko.pureComputed(() =>
        {
            var addActionPlan = self.config.addActionPlan();
            var actionPlanTitle = self.config.actionPlanTitle();
            if (addActionPlan && !actionPlanTitle) return "Action plan title must be provided";
            return null;
        });

        // Extend the action model with our custom model validation
        self.actionModelErrorCount = ko.pureComputed(function()
        {
            var fails = 0;
            if (self.validation.taskType()) fails++;
            if (self.validation.taskTitle()) fails++;
            if (self.validation.parentWorkItemId()) fails++;
            if (self.validation.actionPlanTitle()) fails++;
            return fails;
        });

        // Add the complete and due outlets
        if (options.config.onCompleteOutlet)
        {
            self.addAvailableOutlet("onComplete", "Task complete");
        }

        if (options.config.onOverdueOutlet)
        {
            self.addAvailableOutlet("onOverdue", "Overdue");
        }

        // Track variables and create selector models
        self.ui.parentWorkItemId = self.trackVariable(self.config.parentWorkItemId, "/Identifier/Work Type Identifier");
        self.ui.taskOwnerOdsId = self.trackVariable(self.config.taskOwnerOdsId, "/Identifier/Ods Entity Identifier");
        self.ui.dueOnVariable = self.trackVariable(self.config.dueOnVariable, "/Date Time");
        self.ui.actionPlanItemsList = self.trackVariable(self.config.actionPlanItemsList, "/Entity/Action Plan Item",
            {
                mustBeCollection: true,
                mustNotBeCollection: false
            });
        self.ui.outputVariable = self.trackVariable(self.config.outputVariable, "/Identifier/Work Type Identifier/Task Identifier");

        // Map through the phase outlets to the view model exposed by WFPhaseOutletComponent
        self.ui.phases = new Sharedo.Core.Case.WorkflowEditor.WFPhaseOutlets(self, options.config.phaseOutlets);

        // Map through the assignments to the view model exposed by WFAssignmentComponent
        self.ui.assignments = new Sharedo.Core.Case.WorkflowEditor.WFAssignments(self, options.config.assignments);
    };
    
    var dispose = function(actionModel: any)
    {
        var self = actionModel;
        self.ui.parentWorkItemId.dispose();
        self.ui.taskOwnerOdsId.dispose();
        self.ui.dueOnVariable.dispose();
        self.ui.actionPlanItemsList.dispose();
        self.ui.outputVariable.dispose();

        self.ui.phases.dispose();
        self.ui.assignments.dispose();
    };

    var getModel = function(actionModel: any)
    {
        var self = actionModel;
        var config = ko.toJS(self.config);
        
        // Transform phase outlets
        config.phaseOutlets = self.ui.phases.getModel();

        // Transform assignments
        config.assignments = self.ui.assignments.getModel();

        return config;
    };

    return {
        createModel: createModel,
        getModel: getModel,
        dispose: dispose
    };
})();
