"use strict";

// src/NodeBased/WorkflowActions/CreateTaskv2/CreateTaskv2-factory.ts
(function() {
  function createModel(actionModel, actionOptions, wfModel, stepModel) {
    var defaults = {
      // Your custom config is passed in this object
      config: {
        taskType: "task",
        // The task type to create
        taskTitle: null,
        // The title of the task to create
        dueOnVariable: null,
        // Variable holding the date the task is due
        priorityId: null,
        // The priorityId of the task
        dueInDays: 0,
        // The number of days in which the task will be due
        tag: null,
        // Any tag required
        instanceTag: null,
        // Any instance tag required
        addActionPlan: false,
        // Whether to add an action plan to the task
        actionPlanTitle: "",
        // Title for the action plan,
        parentWorkItemId: null,
        // The variable holding the parent work item id
        taskOwnerOdsId: null,
        // The variable holding who to assign the task to
        actionPlanItemsList: null,
        // The variable holding an array of action plan items to associate with the task
        outputVariable: null,
        // The variable to output the new task id to
        onCompleteOutlet: true,
        // Whether to add the "task complete" outlet
        onOverdueOutlet: true,
        // Whether to add the "overdue" outlet
        phaseOutlets: [],
        // List of phase specific outlets,
        assignments: []
        // List of assignments [{roleSystemName, odsIdVariableName}]
      },
      // The list of connections as persisted
      connections: {}
    };
    var options = $.extend(true, {}, defaults, actionOptions);
    actionModel.config.taskType = ko.observable(options.config.taskType);
    actionModel.config.taskTitle = ko.observable(options.config.taskTitle);
    actionModel.config.dueInDays = ko.observable(options.config.dueInDays);
    actionModel.config.tag = ko.observable(options.config.tag);
    actionModel.config.instanceTag = ko.observable(options.config.instanceTag);
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
    actionModel.validation.taskType = Validator.required(actionModel, actionModel.config.taskType, "Must specify the type of task to create");
    actionModel.validation.taskTitle = Validator.required(actionModel, actionModel.config.taskTitle, "Task title must be provided");
    actionModel.validation.parentWorkItemId = Validator.required(actionModel, actionModel.config.parentWorkItemId, "You must specify a variable holding the parent work item id");
    actionModel.validation.actionPlanTitle = ko.pureComputed(() => {
      var addActionPlan = actionModel.config.addActionPlan();
      var actionPlanTitle = actionModel.config.actionPlanTitle();
      if (addActionPlan && !actionPlanTitle)
        return "Action plan title must be provided";
      return null;
    });
    actionModel.actionModelErrorCount = ko.pureComputed(function() {
      var fails = 0;
      if (actionModel.validation.taskType())
        fails++;
      if (actionModel.validation.taskTitle())
        fails++;
      if (actionModel.validation.parentWorkItemId())
        fails++;
      if (actionModel.validation.actionPlanTitle())
        fails++;
      return fails;
    });
    if (options.config.onCompleteOutlet) {
      actionModel.addAvailableOutlet("onComplete", "Task complete");
    }
    if (options.config.onOverdueOutlet) {
      actionModel.addAvailableOutlet("onOverdue", "Overdue");
    }
    actionModel.ui.parentWorkItemId = actionModel.trackVariable(actionModel.config.parentWorkItemId, "/Identifier/Work Type Identifier");
    actionModel.ui.taskOwnerOdsId = actionModel.trackVariable(actionModel.config.taskOwnerOdsId, "/Identifier/Ods Entity Identifier");
    actionModel.ui.dueOnVariable = actionModel.trackVariable(actionModel.config.dueOnVariable, "/Date Time");
    actionModel.ui.actionPlanItemsList = actionModel.trackVariable(
      actionModel.config.actionPlanItemsList,
      "/Entity/Action Plan Item",
      {
        mustBeCollection: true,
        mustNotBeCollection: false
      }
    );
    actionModel.ui.outputVariable = actionModel.trackVariable(actionModel.config.outputVariable, "/Identifier/Work Type Identifier/Task Identifier");
    actionModel.ui.phases = new Sharedo.Core.Case.WorkflowEditor.WFPhaseOutlets(actionModel, options.config.phaseOutlets);
    actionModel.ui.assignments = new Sharedo.Core.Case.WorkflowEditor.WFAssignments(actionModel, options.config.assignments);
  }
  ;
  function dispose(actionModel) {
    actionModel.ui.parentWorkItemId.dispose();
    actionModel.ui.taskOwnerOdsId.dispose();
    actionModel.ui.dueOnVariable.dispose();
    actionModel.ui.actionPlanItemsList.dispose();
    actionModel.ui.outputVariable.dispose();
    actionModel.ui.phases.dispose();
    actionModel.ui.assignments.dispose();
  }
  ;
  function getModel(actionModel) {
    var config = ko.toJS(actionModel.config);
    config.phaseOutlets = actionModel.ui.phases.getModel();
    config.assignments = actionModel.ui.assignments.getModel();
    return config;
  }
  ;
  return {
    createModel,
    getModel,
    dispose
  };
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL05vZGVCYXNlZC9Xb3JrZmxvd0FjdGlvbnMvQ3JlYXRlVGFza3YyL0NyZWF0ZVRhc2t2Mi1mYWN0b3J5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJcdUZFRkYgXG5cbihmdW5jdGlvbigpXG57ICBcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vZGVsKGFjdGlvbk1vZGVsOiBhbnksIGFjdGlvbk9wdGlvbnM6IGFueSwgd2ZNb2RlbDogYW55LCBzdGVwTW9kZWw6IGFueSkgXG4gICAge1xuICAgICAgICAvLyBSZWZlcmVuY2Ugc2VsZiBhcyB0aGUgYWN0aW9uIG1vZGVsIHdlJ3JlIGV4dGVuZGluZ1xuICAgICAgICAvLyB2YXIgc2VsZiA9IGFjdGlvbk1vZGVsO1xuXG4gICAgICAgIC8vIFNldHVwIG1vZGVsIGRlZmF1bHRzIGFuZCBleHRlbmQgZnJvbSBsb2FkZWQgY29uZmlnXG4gICAgICAgIHZhciBkZWZhdWx0cyA9XG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFlvdXIgY3VzdG9tIGNvbmZpZyBpcyBwYXNzZWQgaW4gdGhpcyBvYmplY3RcbiAgICAgICAgICAgIGNvbmZpZzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0YXNrVHlwZTogXCJ0YXNrXCIsICAgICAgICAgICAvLyBUaGUgdGFzayB0eXBlIHRvIGNyZWF0ZVxuICAgICAgICAgICAgICAgIHRhc2tUaXRsZTogbnVsbCwgICAgICAgICAgICAvLyBUaGUgdGl0bGUgb2YgdGhlIHRhc2sgdG8gY3JlYXRlXG4gICAgICAgICAgICAgICAgZHVlT25WYXJpYWJsZTogbnVsbCwgICAgICAgIC8vIFZhcmlhYmxlIGhvbGRpbmcgdGhlIGRhdGUgdGhlIHRhc2sgaXMgZHVlXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlJZDogbnVsbCwgICAgICAgICAgIC8vIFRoZSBwcmlvcml0eUlkIG9mIHRoZSB0YXNrXG4gICAgICAgICAgICAgICAgZHVlSW5EYXlzOiAwLCAgICAgICAgICAgICAgIC8vIFRoZSBudW1iZXIgb2YgZGF5cyBpbiB3aGljaCB0aGUgdGFzayB3aWxsIGJlIGR1ZVxuICAgICAgICAgICAgICAgIHRhZzogbnVsbCwgICAgICAgICAgICAgICAgICAvLyBBbnkgdGFnIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VUYWc6IG51bGwsICAgICAgICAgIC8vIEFueSBpbnN0YW5jZSB0YWcgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICBhZGRBY3Rpb25QbGFuOiBmYWxzZSwgICAgICAgLy8gV2hldGhlciB0byBhZGQgYW4gYWN0aW9uIHBsYW4gdG8gdGhlIHRhc2tcbiAgICAgICAgICAgICAgICBhY3Rpb25QbGFuVGl0bGU6IFwiXCIsICAgICAgICAvLyBUaXRsZSBmb3IgdGhlIGFjdGlvbiBwbGFuLFxuICAgICAgICAgICAgICAgIHBhcmVudFdvcmtJdGVtSWQ6IG51bGwsICAgICAvLyBUaGUgdmFyaWFibGUgaG9sZGluZyB0aGUgcGFyZW50IHdvcmsgaXRlbSBpZFxuICAgICAgICAgICAgICAgIHRhc2tPd25lck9kc0lkOiBudWxsLCAgICAgICAvLyBUaGUgdmFyaWFibGUgaG9sZGluZyB3aG8gdG8gYXNzaWduIHRoZSB0YXNrIHRvXG4gICAgICAgICAgICAgICAgYWN0aW9uUGxhbkl0ZW1zTGlzdDogbnVsbCwgIC8vIFRoZSB2YXJpYWJsZSBob2xkaW5nIGFuIGFycmF5IG9mIGFjdGlvbiBwbGFuIGl0ZW1zIHRvIGFzc29jaWF0ZSB3aXRoIHRoZSB0YXNrXG4gICAgICAgICAgICAgICAgb3V0cHV0VmFyaWFibGU6IG51bGwsICAgICAgIC8vIFRoZSB2YXJpYWJsZSB0byBvdXRwdXQgdGhlIG5ldyB0YXNrIGlkIHRvXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZU91dGxldDogdHJ1ZSwgICAgIC8vIFdoZXRoZXIgdG8gYWRkIHRoZSBcInRhc2sgY29tcGxldGVcIiBvdXRsZXRcbiAgICAgICAgICAgICAgICBvbk92ZXJkdWVPdXRsZXQ6IHRydWUsICAgICAgLy8gV2hldGhlciB0byBhZGQgdGhlIFwib3ZlcmR1ZVwiIG91dGxldFxuICAgICAgICAgICAgICAgIHBoYXNlT3V0bGV0czogW10sICAgICAgICAgICAvLyBMaXN0IG9mIHBoYXNlIHNwZWNpZmljIG91dGxldHMsXG4gICAgICAgICAgICAgICAgYXNzaWdubWVudHM6IFtdICAgICAgICAgICAgIC8vIExpc3Qgb2YgYXNzaWdubWVudHMgW3tyb2xlU3lzdGVtTmFtZSwgb2RzSWRWYXJpYWJsZU5hbWV9XVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLy8gVGhlIGxpc3Qgb2YgY29ubmVjdGlvbnMgYXMgcGVyc2lzdGVkXG4gICAgICAgICAgICBjb25uZWN0aW9uczoge31cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgYWN0aW9uT3B0aW9ucyk7XG5cbiAgICAgICAgLy8gQWRkIHRoaXMgYWN0aW9uJ3Mgc3BlY2lmaWMgY29uZmlnIHRvIHRoZSBtb2RlbFxuICAgICAgICBhY3Rpb25Nb2RlbC5jb25maWcudGFza1R5cGUgPSBrby5vYnNlcnZhYmxlKG9wdGlvbnMuY29uZmlnLnRhc2tUeXBlKTtcbiAgICAgICAgYWN0aW9uTW9kZWwuY29uZmlnLnRhc2tUaXRsZSA9IGtvLm9ic2VydmFibGUob3B0aW9ucy5jb25maWcudGFza1RpdGxlKTtcbiAgICAgICAgYWN0aW9uTW9kZWwuY29uZmlnLmR1ZUluRGF5cyA9IGtvLm9ic2VydmFibGUob3B0aW9ucy5jb25maWcuZHVlSW5EYXlzKTtcbiAgICAgICAgYWN0aW9uTW9kZWwuY29uZmlnLnRhZyA9IGtvLm9ic2VydmFibGUob3B0aW9ucy5jb25maWcudGFnKTtcbiAgICAgICAgYWN0aW9uTW9kZWwuY29uZmlnLmluc3RhbmNlVGFnID0ga28ub2JzZXJ2YWJsZShvcHRpb25zLmNvbmZpZy5pbnN0YW5jZVRhZyk7XG4gICAgICAgIGFjdGlvbk1vZGVsLmNvbmZpZy5kdWVPblZhcmlhYmxlID0ga28ub2JzZXJ2YWJsZShvcHRpb25zLmNvbmZpZy5kdWVPblZhcmlhYmxlKTtcbiAgICAgICAgYWN0aW9uTW9kZWwuY29uZmlnLnByaW9yaXR5SWQgPSBrby5vYnNlcnZhYmxlKG9wdGlvbnMuY29uZmlnLnByaW9yaXR5SWQpO1xuICAgICAgICBhY3Rpb25Nb2RlbC5jb25maWcuYWRkQWN0aW9uUGxhbiA9IGtvLm9ic2VydmFibGUob3B0aW9ucy5jb25maWcuYWRkQWN0aW9uUGxhbik7XG4gICAgICAgIGFjdGlvbk1vZGVsLmNvbmZpZy5hY3Rpb25QbGFuVGl0bGUgPSBrby5vYnNlcnZhYmxlKG9wdGlvbnMuY29uZmlnLmFjdGlvblBsYW5UaXRsZSk7XG4gICAgICAgIGFjdGlvbk1vZGVsLmNvbmZpZy5wYXJlbnRXb3JrSXRlbUlkID0ga28ub2JzZXJ2YWJsZShvcHRpb25zLmNvbmZpZy5wYXJlbnRXb3JrSXRlbUlkKTtcbiAgICAgICAgYWN0aW9uTW9kZWwuY29uZmlnLnRhc2tPd25lck9kc0lkID0ga28ub2JzZXJ2YWJsZShvcHRpb25zLmNvbmZpZy50YXNrT3duZXJPZHNJZCk7XG4gICAgICAgIGFjdGlvbk1vZGVsLmNvbmZpZy5hY3Rpb25QbGFuSXRlbXNMaXN0ID0ga28ub2JzZXJ2YWJsZShvcHRpb25zLmNvbmZpZy5hY3Rpb25QbGFuSXRlbXNMaXN0KTtcbiAgICAgICAgYWN0aW9uTW9kZWwuY29uZmlnLm91dHB1dFZhcmlhYmxlID0ga28ub2JzZXJ2YWJsZShvcHRpb25zLmNvbmZpZy5vdXRwdXRWYXJpYWJsZSk7XG4gICAgICAgIGFjdGlvbk1vZGVsLmNvbmZpZy5vbkNvbXBsZXRlT3V0bGV0ID0ga28ub2JzZXJ2YWJsZShvcHRpb25zLmNvbmZpZy5vbkNvbXBsZXRlT3V0bGV0KTtcbiAgICAgICAgYWN0aW9uTW9kZWwuY29uZmlnLm9uT3ZlcmR1ZU91dGxldCA9IGtvLm9ic2VydmFibGUob3B0aW9ucy5jb25maWcub25PdmVyZHVlT3V0bGV0KTtcblxuICAgICAgICAvLyBFeHRlbmQgd2l0aCB0aGlzIGFjdGlvbidzIHNwZWNpZmljIHZhbGlkYXRpb25cbiAgICAgICAgYWN0aW9uTW9kZWwudmFsaWRhdGlvbi50YXNrVHlwZSA9IFZhbGlkYXRvci5yZXF1aXJlZChhY3Rpb25Nb2RlbCwgYWN0aW9uTW9kZWwuY29uZmlnLnRhc2tUeXBlLCBcIk11c3Qgc3BlY2lmeSB0aGUgdHlwZSBvZiB0YXNrIHRvIGNyZWF0ZVwiKTtcbiAgICAgICAgYWN0aW9uTW9kZWwudmFsaWRhdGlvbi50YXNrVGl0bGUgPSBWYWxpZGF0b3IucmVxdWlyZWQoYWN0aW9uTW9kZWwsIGFjdGlvbk1vZGVsLmNvbmZpZy50YXNrVGl0bGUsIFwiVGFzayB0aXRsZSBtdXN0IGJlIHByb3ZpZGVkXCIpO1xuICAgICAgICBhY3Rpb25Nb2RlbC52YWxpZGF0aW9uLnBhcmVudFdvcmtJdGVtSWQgPSBWYWxpZGF0b3IucmVxdWlyZWQoYWN0aW9uTW9kZWwsIGFjdGlvbk1vZGVsLmNvbmZpZy5wYXJlbnRXb3JrSXRlbUlkLCBcIllvdSBtdXN0IHNwZWNpZnkgYSB2YXJpYWJsZSBob2xkaW5nIHRoZSBwYXJlbnQgd29yayBpdGVtIGlkXCIpO1xuXG4gICAgICAgIGFjdGlvbk1vZGVsLnZhbGlkYXRpb24uYWN0aW9uUGxhblRpdGxlID0ga28ucHVyZUNvbXB1dGVkKCgpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhZGRBY3Rpb25QbGFuID0gYWN0aW9uTW9kZWwuY29uZmlnLmFkZEFjdGlvblBsYW4oKTtcbiAgICAgICAgICAgIHZhciBhY3Rpb25QbGFuVGl0bGUgPSBhY3Rpb25Nb2RlbC5jb25maWcuYWN0aW9uUGxhblRpdGxlKCk7XG4gICAgICAgICAgICBpZiAoYWRkQWN0aW9uUGxhbiAmJiAhYWN0aW9uUGxhblRpdGxlKSByZXR1cm4gXCJBY3Rpb24gcGxhbiB0aXRsZSBtdXN0IGJlIHByb3ZpZGVkXCI7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRXh0ZW5kIHRoZSBhY3Rpb24gbW9kZWwgd2l0aCBvdXIgY3VzdG9tIG1vZGVsIHZhbGlkYXRpb25cbiAgICAgICAgYWN0aW9uTW9kZWwuYWN0aW9uTW9kZWxFcnJvckNvdW50ID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGZhaWxzID0gMDtcbiAgICAgICAgICAgIGlmIChhY3Rpb25Nb2RlbC52YWxpZGF0aW9uLnRhc2tUeXBlKCkpIGZhaWxzKys7XG4gICAgICAgICAgICBpZiAoYWN0aW9uTW9kZWwudmFsaWRhdGlvbi50YXNrVGl0bGUoKSkgZmFpbHMrKztcbiAgICAgICAgICAgIGlmIChhY3Rpb25Nb2RlbC52YWxpZGF0aW9uLnBhcmVudFdvcmtJdGVtSWQoKSkgZmFpbHMrKztcbiAgICAgICAgICAgIGlmIChhY3Rpb25Nb2RlbC52YWxpZGF0aW9uLmFjdGlvblBsYW5UaXRsZSgpKSBmYWlscysrO1xuICAgICAgICAgICAgcmV0dXJuIGZhaWxzO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBZGQgdGhlIGNvbXBsZXRlIGFuZCBkdWUgb3V0bGV0c1xuICAgICAgICBpZiAob3B0aW9ucy5jb25maWcub25Db21wbGV0ZU91dGxldClcbiAgICAgICAge1xuICAgICAgICAgICAgYWN0aW9uTW9kZWwuYWRkQXZhaWxhYmxlT3V0bGV0KFwib25Db21wbGV0ZVwiLCBcIlRhc2sgY29tcGxldGVcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5jb25maWcub25PdmVyZHVlT3V0bGV0KVxuICAgICAgICB7XG4gICAgICAgICAgICBhY3Rpb25Nb2RlbC5hZGRBdmFpbGFibGVPdXRsZXQoXCJvbk92ZXJkdWVcIiwgXCJPdmVyZHVlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVHJhY2sgdmFyaWFibGVzIGFuZCBjcmVhdGUgc2VsZWN0b3IgbW9kZWxzXG4gICAgICAgIGFjdGlvbk1vZGVsLnVpLnBhcmVudFdvcmtJdGVtSWQgPSBhY3Rpb25Nb2RlbC50cmFja1ZhcmlhYmxlKGFjdGlvbk1vZGVsLmNvbmZpZy5wYXJlbnRXb3JrSXRlbUlkLCBcIi9JZGVudGlmaWVyL1dvcmsgVHlwZSBJZGVudGlmaWVyXCIpO1xuICAgICAgICBhY3Rpb25Nb2RlbC51aS50YXNrT3duZXJPZHNJZCA9IGFjdGlvbk1vZGVsLnRyYWNrVmFyaWFibGUoYWN0aW9uTW9kZWwuY29uZmlnLnRhc2tPd25lck9kc0lkLCBcIi9JZGVudGlmaWVyL09kcyBFbnRpdHkgSWRlbnRpZmllclwiKTtcbiAgICAgICAgYWN0aW9uTW9kZWwudWkuZHVlT25WYXJpYWJsZSA9IGFjdGlvbk1vZGVsLnRyYWNrVmFyaWFibGUoYWN0aW9uTW9kZWwuY29uZmlnLmR1ZU9uVmFyaWFibGUsIFwiL0RhdGUgVGltZVwiKTtcbiAgICAgICAgYWN0aW9uTW9kZWwudWkuYWN0aW9uUGxhbkl0ZW1zTGlzdCA9IGFjdGlvbk1vZGVsLnRyYWNrVmFyaWFibGUoYWN0aW9uTW9kZWwuY29uZmlnLmFjdGlvblBsYW5JdGVtc0xpc3QsIFwiL0VudGl0eS9BY3Rpb24gUGxhbiBJdGVtXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbXVzdEJlQ29sbGVjdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtdXN0Tm90QmVDb2xsZWN0aW9uOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGFjdGlvbk1vZGVsLnVpLm91dHB1dFZhcmlhYmxlID0gYWN0aW9uTW9kZWwudHJhY2tWYXJpYWJsZShhY3Rpb25Nb2RlbC5jb25maWcub3V0cHV0VmFyaWFibGUsIFwiL0lkZW50aWZpZXIvV29yayBUeXBlIElkZW50aWZpZXIvVGFzayBJZGVudGlmaWVyXCIpO1xuXG4gICAgICAgIC8vIE1hcCB0aHJvdWdoIHRoZSBwaGFzZSBvdXRsZXRzIHRvIHRoZSB2aWV3IG1vZGVsIGV4cG9zZWQgYnkgV0ZQaGFzZU91dGxldENvbXBvbmVudFxuICAgICAgICBhY3Rpb25Nb2RlbC51aS5waGFzZXMgPSBuZXcgU2hhcmVkby5Db3JlLkNhc2UuV29ya2Zsb3dFZGl0b3IuV0ZQaGFzZU91dGxldHMoYWN0aW9uTW9kZWwsIG9wdGlvbnMuY29uZmlnLnBoYXNlT3V0bGV0cyk7XG5cbiAgICAgICAgLy8gTWFwIHRocm91Z2ggdGhlIGFzc2lnbm1lbnRzIHRvIHRoZSB2aWV3IG1vZGVsIGV4cG9zZWQgYnkgV0ZBc3NpZ25tZW50Q29tcG9uZW50XG4gICAgICAgIGFjdGlvbk1vZGVsLnVpLmFzc2lnbm1lbnRzID0gbmV3IFNoYXJlZG8uQ29yZS5DYXNlLldvcmtmbG93RWRpdG9yLldGQXNzaWdubWVudHMoYWN0aW9uTW9kZWwsIG9wdGlvbnMuY29uZmlnLmFzc2lnbm1lbnRzKTtcbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGRpc3Bvc2UoYWN0aW9uTW9kZWw6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIHZhciBzZWxmID0gYWN0aW9uTW9kZWw7XG4gICAgICAgIGFjdGlvbk1vZGVsLnVpLnBhcmVudFdvcmtJdGVtSWQuZGlzcG9zZSgpO1xuICAgICAgICBhY3Rpb25Nb2RlbC51aS50YXNrT3duZXJPZHNJZC5kaXNwb3NlKCk7XG4gICAgICAgIGFjdGlvbk1vZGVsLnVpLmR1ZU9uVmFyaWFibGUuZGlzcG9zZSgpO1xuICAgICAgICBhY3Rpb25Nb2RlbC51aS5hY3Rpb25QbGFuSXRlbXNMaXN0LmRpc3Bvc2UoKTtcbiAgICAgICAgYWN0aW9uTW9kZWwudWkub3V0cHV0VmFyaWFibGUuZGlzcG9zZSgpO1xuXG4gICAgICAgIGFjdGlvbk1vZGVsLnVpLnBoYXNlcy5kaXNwb3NlKCk7XG4gICAgICAgIGFjdGlvbk1vZGVsLnVpLmFzc2lnbm1lbnRzLmRpc3Bvc2UoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0TW9kZWwoYWN0aW9uTW9kZWw6IGFueSlcbiAgICB7XG4gICAgICAgIC8vIHZhciBzZWxmID0gYWN0aW9uTW9kZWw7XG4gICAgICAgIHZhciBjb25maWcgPSBrby50b0pTKGFjdGlvbk1vZGVsLmNvbmZpZyk7XG4gICAgICAgIFxuICAgICAgICAvLyBUcmFuc2Zvcm0gcGhhc2Ugb3V0bGV0c1xuICAgICAgICBjb25maWcucGhhc2VPdXRsZXRzID0gYWN0aW9uTW9kZWwudWkucGhhc2VzLmdldE1vZGVsKCk7XG5cbiAgICAgICAgLy8gVHJhbnNmb3JtIGFzc2lnbm1lbnRzXG4gICAgICAgIGNvbmZpZy5hc3NpZ25tZW50cyA9IGFjdGlvbk1vZGVsLnVpLmFzc2lnbm1lbnRzLmdldE1vZGVsKCk7XG5cbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlTW9kZWw6IGNyZWF0ZU1vZGVsLFxuICAgICAgICBnZXRNb2RlbDogZ2V0TW9kZWwsXG4gICAgICAgIGRpc3Bvc2U6IGRpc3Bvc2VcbiAgICB9O1xufSkoKTtcblxuXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Q0FFQyxXQUNEO0FBRUksV0FBUyxZQUFZLGFBQWtCLGVBQW9CLFNBQWMsV0FDekU7QUFLSSxRQUFJLFdBQ0o7QUFBQTtBQUFBLE1BRUksUUFDQTtBQUFBLFFBQ0ksVUFBVTtBQUFBO0FBQUEsUUFDVixXQUFXO0FBQUE7QUFBQSxRQUNYLGVBQWU7QUFBQTtBQUFBLFFBQ2YsWUFBWTtBQUFBO0FBQUEsUUFDWixXQUFXO0FBQUE7QUFBQSxRQUNYLEtBQUs7QUFBQTtBQUFBLFFBQ0wsYUFBYTtBQUFBO0FBQUEsUUFDYixlQUFlO0FBQUE7QUFBQSxRQUNmLGlCQUFpQjtBQUFBO0FBQUEsUUFDakIsa0JBQWtCO0FBQUE7QUFBQSxRQUNsQixnQkFBZ0I7QUFBQTtBQUFBLFFBQ2hCLHFCQUFxQjtBQUFBO0FBQUEsUUFDckIsZ0JBQWdCO0FBQUE7QUFBQSxRQUNoQixrQkFBa0I7QUFBQTtBQUFBLFFBQ2xCLGlCQUFpQjtBQUFBO0FBQUEsUUFDakIsY0FBYyxDQUFDO0FBQUE7QUFBQSxRQUNmLGFBQWEsQ0FBQztBQUFBO0FBQUEs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