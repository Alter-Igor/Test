// namespace("Sharedo.Core.Case.Panels");

// Sharedo.Core.Case.Panels.ActionPlan = function (element, configuration, base) {
//     var self = this;

//     self.buildModel(configuration, base);
// };

// Sharedo.Core.Case.Panels.ActionPlan.prototype.buildModel = function (configuration, base) {
//     var self = this;

//     var defaults = {
//         sharedoId: null,
//         allowEditing: true,
//         allowCreation: false,
//         allowItemAdding: false,
//         allowItemRemoval: false,
//         canChangeState: false,
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
//         showRelatedTasks: true,
//         showTaskProgress: true,
//         relatedTaskListViewScope: "core-case-task-related",
//         relatedTasksTitle: "Related Tasks",
//         relatedTasksCustomMenu: null,                       // Custom menu editor payload
//     };

//     self.options = $.extend(defaults, configuration);

//     if (self.options.sharedoId === null) {
//         $ui.errorHandling.handleError({ message: "ActionPlan Panel - no sharedo id provided" });
//         return;
//     }

//     self.progressfixedExpanded = ko.observable(true);

//     self.checklistControlId = base.id + "_checklist";
//     self.taskListControlId = base.id + "_taskList";

//     self.canSave = ko.observable(false);
//     self.saveWidget = null;

//     self.checklistLoaded = ko.observable(false);
//     self.taskListLoaded = ko.observable(false);

//     self.widgetsLoaded = ko.pureComputed(function () {
//         return self.checklistLoaded() && self.taskListLoaded();
//     });;

//     self.saveEnabled = ko.computed(function () {
//         if (!self.canSave()) return false;
//         if (!self.options.allowEditing) return false;

//         return true;
//     });
// }

// Sharedo.Core.Case.Panels.ActionPlan.prototype.loadChecklistWidget = function () {
//     var self = this;

//     if (!self.options.showActionPlan)
//         return;

//     var coreConfig =
//     {
//         withChrome: true,
//         title: self.options.actionPlanTitle,
//         icon: null,
//         canExpandCollapse: true
//     };

//     var containerId = "#" + self.checklistControlId;
//     var widgetId = "Sharedo.Core.Case.Widgets.ActionPlan";

//     self.actionPlanWidget = $ui.widgets.loadWidget(widgetId, containerId, coreConfig, self.options, function (widgetModel) {
//         self.canSave(true);
//         self.saveWidget = widgetModel.updateActionPlan;
//         self.checklistLoaded(true);
//     });
// }

// Sharedo.Core.Case.Panels.ActionPlan.prototype.loadTaskListWidget = function () {
//     var self = this;

//     if (!self.options.showRelatedTasks)
//         return;

//     var containerId = "#" + self.taskListControlId;

//     var listViewConfig = {
//         allowBulkActions: true,
//         allowBulkAssign: true,
//         customMenu: self.options.relatedTasksCustomMenu,
//         listView: {
//             scope: self.options.relatedTaskListViewScope,
//             ownerRef: self,                                             // This ensures new blades are stacked after this
//             contextId: self.options.sharedoId
//         }
//     };

//     self.listViewWidget = $ui.widgets.loadWidget("Sharedo.Core.Case.ListViews.ListViewWidget",
//         containerId,
//         {
//             title: self.options.relatedTasksTitle
//         },
//         listViewConfig,
//         function(widgetModel) {
//             self.taskListLoaded(true);
//         });

// }

// Sharedo.Core.Case.Panels.ActionPlan.prototype.loadAndBind = function () {
//     var self = this;

//     if (self.widgetsLoaded())
//         return;

//     self.loadChecklistWidget();
//     self.loadTaskListWidget();
// }

// Sharedo.Core.Case.Panels.ActionPlan.prototype.saveAndClosePanel = function () {
//     var self = this;

//     if (!self.canSave()) return;

//     self.saveWidget(function () {
//         self.closePanel();
//     });
// };

// Sharedo.Core.Case.Panels.ActionPlan.prototype.savePanel = function () {
//     var self = this;

//     if (!self.canSave()) return;

//     self.saveWidget();
// };

// Sharedo.Core.Case.Panels.ActionPlan.prototype.closePanel = function () {
//     var self = this;
//     $ui.stacks.cancel(self);
// };

// Sharedo.Core.Case.Panels.ActionPlan.prototype.onDestroy = function () {
//     var self = this;

//     if (self.listViewWidget) $ui.widgets.destroyWidget(self.listViewWidget);
//     if (self.actionPlanWidget) $ui.widgets.destroyWidget(self.actionPlanWidget);
// };