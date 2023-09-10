import { IActionPlan } from "../../../Interfaces/Workflows/IActionPlan";
import { ICallToAction } from "../../../Interfaces/Workflows/ICallToAction";

let connections = $model.Connections;
let taskId = Guid.NewGuid();
let dueOn = DateTime.Now;

// $ifNotNull.Configuration.outputVariable
ctx["$model.Configuration.outputVariable"] = taskId.ToString(); // It's a guid, need to to string it 
// $endif;

// $ifNotNull.Configuration.dueInDays
if ("$model.Configuration.dueInDays") {
    dueOn = DateTime.Now.AddDays($model.Configuration.dueInDays);
}
// $endif

// $ifNotNull.Configuration.dueOnVariable
dueOn = DateTime.Parse(ctx["$model.Configuration.dueOnVariable"]);
// $endif

let task = actions.sharedo.BuildTask()
    .WithId(taskId)
    .OfType("$model.Configuration.taskType")
    .WithTitle(sharedo.buildString("$model.Configuration.taskTitle;"))
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
let parentId = ctx["$model.Configuration.parentWorkItemId"];
if (parentId) {
    task = task.ForSharedo(parentId);
}
// $endif

// $ifNotNull.Configuration.taskOwnerOdsId
let ownerId = ctx["$model.Configuration.taskOwnerOdsId"];
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
    let actionPlanBuilder = task
        .WithActionPlan()
        .WithTitle(sharedo.buildString("$model.Configuration.actionPlanTitle;"));

    // Add action plan items
    // $ifNotNull.Configuration.actionPlanItemsList
    {
        let itemsAsString = ctx["$model.Configuration.actionPlanItemsList"] as IActionPlan[];

        log.Information('*** itemsAsString:');
        log.Information(JSON.stringify(itemsAsString));

        if (itemsAsString) {
            let items = itemsAsString;//JSON.parse(itemsAsString) as Array<any>;
            items.slice()
                .sort((a, b) => Number.parseInt(a.order, 10) - Number.parseInt(b.order, 10))
                .forEach(function (i) {
                    log.Information('*** i:');
                    log.Information('description: ' + i.description);
                    log.Information('type: ' + i.type);
                    log.Information('order: ' + i.order);
                    log.Information('**********');
                    let actionPlanItem = buildActionPlan(i);
                    log.Information('*** actionPlanItem:');
                    log.Information(JSON.stringify(actionPlanItem));

                    actionPlanBuilder = actionPlanBuilder.AddItem(actionPlanItem);
                });
        }
    }
    // $endif

    log.Information('*** actionPlanBuilder:');
    log.Information(JSON.stringify(actionPlanBuilder));

    task = actionPlanBuilder.Build();
}
// $endif

task.Save();

log.Information('*** task:');
log.Information(JSON.stringify(task));




function buildActionPlan(actionPlanModel: IActionPlan): any {
    log.Information("*** function buildActionPlan()");
    let actionPlan = actions.sharedo.BuildActionPlanItem();

    actionPlan = actionPlan.WithDescription(actionPlanModel.description);

    let type = actionPlanModel.type;

    if (type === "checkbox") {
        actionPlan = actionPlan.AddCheckbox();
    }

    if (type === "infobox") {
        actionPlan = actionPlan.AddInformation();
    }

    if (type === "header") {
        actionPlan = actionPlan.AddHeader();
    }

    if (actionPlanModel.mandatory) {
        actionPlan = actionPlan.MarkRequired();
    }

    let order = actionPlanModel.order;
    actionPlan = actionPlan.WithOrder(order);


    if (actionPlanModel.callToActionVar) {
        let callToAction = actionPlanModel.callToActionVar;
        if (!callToAction) {
            log.Warning("Create action plan - a call to action variable ($model.Configuration.callToActionVar) was specified but was empty");
        }
        else {
            let cta = buildCallToAction(callToAction);
            actionPlan = actionPlan.WithCallToAction(cta);
        }
    }


    let plan = actionPlan.Build();
    log.Information("*** function buildActionPlan() finished");
    return plan;

}




function buildCallToAction(callToActionModel: ICallToAction): any | undefined {
    log.Information("*********** function buildCallToAction() *****************");
    log.Information("************-Data-****************");
    log.Information(JSON.stringify(callToActionModel));
    log.Information("****************************");
    let cta = actions.sharedo
        .BuildCallToAction()
        .WithDisplay(callToActionModel.title);
    if (callToActionModel.styles) {
        cta = cta.WithStyles(callToActionModel.styles);
    }
    cta = cta.Build();

    cta.CallToActionContextType = callToActionModel.contextType


    log.Information("ContextIdVariable: " + callToActionModel.contextIdVariable);
    if (callToActionModel.contextIdVariable) {
        let contextId = ctx[callToActionModel.contextIdVariable];
        if (contextId) {

            log.Information(`typeof contextId: ${typeof contextId}`);
            if (typeof contextId === 'string') {
                contextId = Guid.Parse(contextId);
            }

            log.Information("ContextId: " + contextId);
            cta.CallToActionContextId = contextId;
            log.Information("cta.CallToActionContextId: " + cta.CallToActionContextId);
        }
        else {
            log.Warning(`ContextIdVariable: ${callToActionModel.contextIdVariable} was not found in the context`);
        }
    }


    cta.CallToActionCommand = callToActionModel.command;

    // ifNotNull.Configuration.commandConfig
    if (callToActionModel.commandConfig) {
        cta.CallToActionCommandConfiguration = callToActionModel.commandConfig;
    }
    // endif

    // ifNull.Configuration.commandConfig
    if (!callToActionModel.commandConfig) {
        cta.CallToActionCommandConfiguration = "{}";
    }
    // endif

    // ifNotNull.Configuration.icon
    if (callToActionModel.icon) {
        cta.CallToActionIcon = callToActionModel.icon;
    }
    // endif;    

    // ifNotNull.Configuration.css
    if (callToActionModel.css) {
        cta.CallToActionCss = callToActionModel.css;
    }
    // endif;
    log.Information('**** buildCallToAction finished');
    return cta;

}