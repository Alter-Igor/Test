// namespace("Visualisation.Widgets");

// /**
//  * Constructor for your widget - remember the name of this JS type must match the ID of the widget in it's .widget.json manifest
//  * @param {} element            The Html DOM element to which this widget will bind
//  * @param {} configuration      The configuration passed in from the designer/config
//  * @param {} baseModel          The base widget model (contains unique id etc)
//  * @returns {} 
//  */
// Visualisation.Widgets.ActionPlan = function(element, configuration, baseModel)
// {
//     var self = this;
//     self.buildModel(configuration, baseModel);
// };

// Visualisation.Widgets.ActionPlan.prototype.buildModel = function (configuration, base) {
//     var self = this;
//     self.disposables = [];

//     var defaults = {
//         sharedoId: $ui.pageContext.sharedoId(),
//         allowEditing: true,
//         allowCreation: true,
//         allowItemAdding: true,
//         allowItemRemoval: true,
//         canChangeState: true,
//         onPanel: true,
//         lock: function () {
//             $ui.stacks.lock(self);
//         },
//         unlock: function () {
//             $ui.stacks.unlock(self);
//         },
//         showPhasePlan: true,
//         phasePlanTitle: "Progress",
//         showActionPlan: true,
//         actionPlanTitle: "Checklist",
//         showRelatedTasks: false,
//         showTaskProgress: false,
//         relatedTaskListViewScope: "core-case-task-related",
//         relatedTasksTitle: "Related Tasks",
//         relatedTasksCustomMenu: null,                       // Custom menu editor payload
//     };

//     self.options = $.extend(defaults, configuration);

//     if (self.options.sharedoId === null) {
//         $ui.errorHandling.handleError({ message: "ActionPlan Panel - no sharedo id provided" });
//         return;
//     }

//     //sharedo.core.case.action-plan.updated
//     self.disposables.push($ui.events.subscribe("sharedo.core.case.action-plan.updated", function(data) {
        
//         console.log("Action Plan Updated");
//         console.log(data);

//         self.refresh();
//     }, self));

//     self.progressfixedExpanded = ko.observable(true);

//     self.checklistControlId = base.id + "_checklist";

//     self.canSave = ko.observable(false);
//     self.saveWidget = null;

//     self.checklistLoaded = ko.observable(false);
//     self.taskListLoaded = ko.observable(false);

//     self.widgetsLoaded = ko.pureComputed(function () {
//         return self.checklistLoaded();
//     });;

//     self.saveEnabled = ko.computed(function () {
//         if (!self.canSave()) return false;
//         if (!self.options.allowEditing) return false;

//         return true;
//     });
// }

// Visualisation.Widgets.ActionPlan.prototype.loadChecklistWidget = function () {
//     var self = this;

//     if (!self.options.showActionPlan)
//         return;

//     var coreConfig =
//     {
//         withChrome: false,
//         title: self.options.actionPlanTitle,
//         icon: null,
//         canExpandCollapse: false
//     };

//     var containerId = "#Visualisation-Widgets-ActionPlan";
//     var widgetId = "Sharedo.Core.Case.Widgets.ActionPlan";

//     self.actionPlanWidget = $ui.widgets.loadWidget(widgetId, containerId, coreConfig, self.options, function (widgetModel) {
//         self.canSave(true);
//         self.saveWidget = widgetModel.updateActionPlan;
//         self.widgetModel = widgetModel;
//         self.checklistLoaded(true);
//     });

        
//     //self.disposables.push($ui.events.subscribe("sharedo.core.case.action-plan.changed", self.loadChecklistWidget, self));

// }



// Visualisation.Widgets.ActionPlan.prototype.loadAndBind = function () {
//     var self = this;

//     if (self.widgetsLoaded())
//         return;

//     self.loadChecklistWidget();
// }

// // Visualisation.Widgets.ActionPlan.prototype.saveAndClosePanel = function () {
// //     var self = this;

// //     if (!self.canSave()) return;

// //     self.saveWidget(function () {
// //         self.closePanel();
// //     });
// // };

// // Visualisation.Widgets.ActionPlan.prototype.savePanel = function () {
// //     var self = this;

// //     if (!self.canSave()) return;

// //     self.saveWidget();
// // };

// // Visualisation.Widgets.ActionPlan.prototype.closePanel = function () {
// //     var self = this;
// //     $ui.stacks.cancel(self);
// // };

// Visualisation.Widgets.ActionPlan.prototype.refresh = function()
// {
   
//     this.widgetModel.loadAndBind()
// }


// Visualisation.Widgets.ActionPlan.prototype.onDestroy = function () {
//     var self = this;

//     $ui.util.dispose(self.disposables);
//     if (self.listViewWidget) $ui.widgets.destroyWidget(self.listViewWidget);
//     if (self.actionPlanWidget) $ui.widgets.destroyWidget(self.actionPlanWidget);
// };
