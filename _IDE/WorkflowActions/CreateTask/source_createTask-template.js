import { buildActionPlan } from "../Common/BuildActionPlan";
var connections = $model.Connections;
var taskId = Guid.NewGuid();
var dueOn = DateTime.Now;

// $ifNotNull.Configuration.dueInDays
if ("$model.Configuration.dueInDays") {
  dueOn = DateTime.Now.AddDays($model.Configuration.dueInDays);
}
// $endif

// $ifNotNull.Configuration.dueOnVariable
dueOn = DateTime.Parse(ctx["$model.Configuration.dueOnVariable"]);
// $endif

var task = actions.sharedo.BuildTask().WithId(taskId).OfType("$model.Configuration.taskType").WithTitle(sharedo.buildString("$model.Configuration.taskTitle;"))
// $ifNotNull.Configuration.priorityId
.WithPriorityId($model.Configuration.priorityId)
// $endif;
// $if.Connections.has-onComplete
.OnComplete(connections["onComplete"].step)
// $endif;
// $if.Connections.has-onOverdue
.OnOverdue(connections["onOverdue"].step)
// $endif;
.DueOn(dueOn)
// $ifNotNull.Configuration.tag
.WithTag(sharedo.buildString("$model.Configuration.tag;"))
// $endif
// $if.Connections.has-onReminderDue
.OnReminderDue(connections["onReminderDue"].step).At(1).Minutes;
// $endif;

// $if.Model.Configuration.has-phaseOutlets
// $each.Model.Configuration.phaseOutlets
if (connections["$current.systemName"]) {
  task.OnPhase("$current.systemName", connections["$current.systemName"].step);
}
// $endeach
// $endif;

// $ifNotNull.Configuration.parentWorkItemId
var parentId = ctx["$model.Configuration.parentWorkItemId"];
if (parentId) {
  task = task.ForSharedo(parentId);
}
// $endif

// $ifNotNull.Configuration.taskOwnerOdsId
var ownerId = ctx["$model.Configuration.taskOwnerOdsId"];
if (ownerId) {
  task = task.Assign("primary-owner").To(ownerId);
}
// $endif

// $if.Model.Configuration.has-assignments
// $each.Model.Configuration.assignments
if (ctx["$current.odsIdVariableName"]) task = task.Assign("$current.roleSystemName").To(ctx["$current.odsIdVariableName"]);
// $endeach
// $endif

// $if.Configuration.addActionPlan
{
  // Add action plan
  var actionPlanBuilder = task.WithActionPlan().WithTitle(sharedo.buildString("$model.Configuration.actionPlanTitle;"));

  // Add action plan items
  // $ifNotNull.Configuration.actionPlanItemsList
  {
    var itemsAsString = ctx["$model.Configuration.actionPlanItemsList"];
    log.Information('*** itemsAsString:');
    log.Information(JSON.stringify(itemsAsString));
    if (itemsAsString) {
      var items = itemsAsString; //JSON.parse(itemsAsString) as Array<any>;
      items.slice().sort((a, b) => Number.parseInt(a.order, 10) - Number.parseInt(b.order, 10)).forEach(function (i) {
        var actionPlanItem = buildActionPlan(i);
        actionPlanBuilder = actionPlanBuilder.AddItem(i);
      });
    }
  }
  // $endif

  task = actionPlanBuilder.Build();
}
// $endif

task.Save();

// $ifNotNull.Configuration.outputVariable
ctx["$model.Configuration.outputVariable"] = taskId.ToString(); // It's a guid, need to to string it 
// $endif;
//# sourceMappingURL=source_createTask-template.js.map