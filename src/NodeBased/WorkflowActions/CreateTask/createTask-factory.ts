import * as ko from "knockout";


(function()
{ 

    var createModel = function(actionModel: any, actionOptions: any, wfModel: any, stepModel: any)
    {
        // Reference self as the action model we're extending
        // var self = actionModel;

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
        actionModel.config.taskType = ko.observable(options.config.taskType);
        actionModel.config.taskTitle = ko.observable(options.config.taskTitle);
        actionModel.config.dueInDays = ko.observable(options.config.dueInDays);
        actionModel.config.tag = ko.observable(options.config.tag);
        actionModel.config.dueOnVariable = ko.observable(options.config.dueOnVariable);
        actionModel.config.priorityId = ko.observable(options.config.priorityId);
        actionModel.config.addActionPlan = ko.observable(options.config.addActionPlan);
        actionModel.config.actionPlanTitle = ko.observable(options.config.actionPlanTitle);
        actionModel.config.parentWorkItemId = ko.observable(options.config.parentWorkItemId);
        actionModel.config.taskOwnerOdsId = ko.observable(options.config.taskOwnerOdsId);
        actionModel.config.actionPlanItemsList = ko.observable(options.config.actionPlanItemsList);
        actionModel.config.outputVariable = ko.observable(options.config.outputVariable);
        actionModel.config.onCompleteOutlet = ko.observable(options.config.onCompleteOutlet);
        actionModel.config.onOverdueOutlet = ko.observable(options.config.onOverdueOutlet);

        // Extend with this action's specific validation
        actionModel.validation.taskType = Validator.required(actionModel, actionModel.config.taskType, "Must specify the type of task to create");
        actionModel.validation.taskTitle = Validator.required(actionModel, actionModel.config.taskTitle, "Task title must be provided");
        actionModel.validation.parentWorkItemId = Validator.required(actionModel, actionModel.config.parentWorkItemId, "You must specify a variable holding the parent work item id");

        actionModel.validation.actionPlanTitle = ko.pureComputed(() =>
        {
            var addActionPlan = actionModel.config.addActionPlan();
            var actionPlanTitle = actionModel.config.actionPlanTitle();
            if (addActionPlan && !actionPlanTitle) return "Action plan title must be provided";
            return null;
        });

        // Extend the action model with our custom model validation
        actionModel.actionModelErrorCount = ko.pureComputed(function()
        {
            var fails = 0;
            if (actionModel.validation.taskType()) fails++;
            if (actionModel.validation.taskTitle()) fails++;
            if (actionModel.validation.parentWorkItemId()) fails++;
            if (actionModel.validation.actionPlanTitle()) fails++;
            return fails;
        });

        // Add the complete and due outlets
        if (options.config.onCompleteOutlet)
        {
            actionModel.addAvailableOutlet("onComplete", "Task complete");
        }

        if (options.config.onOverdueOutlet)
        {
            actionModel.addAvailableOutlet("onOverdue", "Overdue");
        }

        // Track variables and create selector models
        actionModel.ui.parentWorkItemId = actionModel.trackVariable(actionModel.config.parentWorkItemId, "/Identifier/Work Type Identifier");
        actionModel.ui.taskOwnerOdsId = actionModel.trackVariable(actionModel.config.taskOwnerOdsId, "/Identifier/Ods Entity Identifier");
        actionModel.ui.dueOnVariable = actionModel.trackVariable(actionModel.config.dueOnVariable, "/Date Time");
        actionModel.ui.actionPlanItemsList = actionModel.trackVariable(actionModel.config.actionPlanItemsList, "/Entity/Action Plan Item",
            {
                mustBeCollection: true,
                mustNotBeCollection: false
            });
        actionModel.ui.outputVariable = actionModel.trackVariable(actionModel.config.outputVariable, "/Identifier/Work Type Identifier/Task Identifier");

        // Map through the phase outlets to the view model exposed by WFPhaseOutletComponent
        actionModel.ui.phases = new Sharedo.Core.Case.WorkflowEditor.WFPhaseOutlets(actionModel, options.config.phaseOutlets);

        // Map through the assignments to the view model exposed by WFAssignmentComponent
        actionModel.ui.assignments = new Sharedo.Core.Case.WorkflowEditor.WFAssignments(actionModel, options.config.assignments);
    };
    
    var dispose = function(actionModel: any)
    {
        // var self = actionModel;
        actionModel.ui.parentWorkItemId.dispose();
        actionModel.ui.taskOwnerOdsId.dispose();
        actionModel.ui.dueOnVariable.dispose();
        actionModel.ui.actionPlanItemsList.dispose();
        actionModel.ui.outputVariable.dispose();

        actionModel.ui.phases.dispose();
        actionModel.ui.assignments.dispose();
    };

    var getModel = function(actionModel: any)
    {
        // var self = actionModel;
        var config = ko.toJS(actionModel.config);
        
        // Transform phase outlets
        config.phaseOutlets = actionModel.ui.phases.getModel();

        // Transform assignments
        config.assignments = actionModel.ui.assignments.getModel();

        return config;
    };

    return {
        createModel: createModel,
        getModel: getModel,
        dispose: dispose
    };
})();
