﻿
let connections = $model.Connections;
let taskId = Guid.NewGuid();
let dueOn = DateTime.Now;
 
// $ifNotNull.Configuration.dueInDays
if ("$model.Configuration.dueInDays")
{
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
if (connections["$current.systemName"])
{
    task.OnPhase("$current.systemName", connections["$current.systemName"].step);
}
// $endeach
// $endif;

// $ifNotNull.Configuration.parentWorkItemId
let parentId = ctx["$model.Configuration.parentWorkItemId"];
if (parentId)
{
    task = task.ForSharedo(parentId);
}
// $endif

// $ifNotNull.Configuration.taskOwnerOdsId
let ownerId = ctx["$model.Configuration.taskOwnerOdsId"];
if (ownerId)
{
    task = task.Assign("primary-owner").To(ownerId);
}
// $endif

// $if.Model.Configuration.has-assignments
// $each.Model.Configuration.assignments
if( ctx["$current.odsIdVariableName"] ) task = task.Assign("$current.roleSystemName").To(ctx["$current.odsIdVariableName"]);
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

        if (itemsAsString)
        {
            let items = itemsAsString;//JSON.parse(itemsAsString) as Array<any>;
            items.slice()
            .sort((a, b) => Number.parseInt(a.order,10) - Number.parseInt(b.order,10))
            .forEach(function(i) {
                let actionPlanItem = buildActionPlan(i);
                actionPlanBuilder = actionPlanBuilder.AddItem(actionPlanItem);
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


 function buildActionPlan(actionPlanModel: IActionPlan): any
{

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

// $if.Configuration.mandatory
if(actionPlanModel.mandatory)
{
    actionPlan = actionPlan.MarkRequired();
}
// $endif

let order = actionPlanModel.order;
actionPlan = actionPlan.WithOrder(order);

// $ifNotNull.Configuration.callToActionVar
if(actionPlanModel.callToActionVar)
{
    let callToAction = actionPlanModel.callToActionVar;
    if (!callToAction)
    {
        log.Warning("Create action plan - a call to action variable ($model.Configuration.callToActionVar) was specified but was empty");
    }
    else
    {
        actionPlan = actionPlan.WithCallToAction(buildCallToAction(callToAction));
    }
}
// $endif

let plan = actionPlan.Build();

return plan;

}




 function buildCallToAction(callToActionModel: ICallToAction): any | undefined
{
    let cta = actions.sharedo
    .BuildCallToAction()
    .WithDisplay(callToActionModel.title);
    if(callToActionModel.styles)
    {
        cta = cta.WithStyles(callToActionModel.styles);
    }

// $ifNotNull.Configuration.styles
    //.WithStyles("$model.Configuration.styles")
// $endif
    cta = cta.Build();

cta.CallToActionContextType = callToActionModel.contextType

// $ifNotNull.Configuration.contextIdVariable
if(callToActionModel.contextIdVariable)
{
    cta.CallToActionContextId = Guid.Parse(callToActionModel.contextIdVariable);
}
// $endif

cta.CallToActionCommand = callToActionModel.command;

// $ifNotNull.Configuration.commandConfig
cta.CallToActionCommandConfiguration = callToActionModel.commandConfig;
// $endif

// $ifNull.Configuration.commandConfig
cta.CallToActionCommandConfiguration = "{}";
// $endif

// $ifNotNull.Configuration.icon
cta.CallToActionIcon =  callToActionModel.icon;
// $endif;    

// $ifNotNull.Configuration.css
cta.CallToActionCss =   callToActionModel.css;
// $endif;

return cta;

}