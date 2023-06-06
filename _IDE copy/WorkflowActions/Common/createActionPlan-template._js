let actionPlan = actions.sharedo.BuildActionPlanItem();

actionPlan = actionPlan.WithDescription(sharedo.buildString("$model.Configuration.description;"));

let type = "$model.Configuration.type";

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
actionPlan = actionPlan.MarkRequired();
// $endif

let order = $model.Configuration.order;;
actionPlan = actionPlan.WithOrder(order);

// $ifNotNull.Configuration.callToActionVar
{
    let callToAction = ctx["$model.Configuration.callToActionVar"];
    if (!callToAction)
    {
        log.Warning("Create action plan - a call to action variable ($model.Configuration.callToActionVar) was specified but was empty");
    }
    else
    {
        actionPlan = actionPlan.WithCallToAction(callToAction);
    }
}
// $endif

let plan = actionPlan.Build();

if (!plan) {
    throw "Unable to build action plan, please check Seq logs for more information";
}

// $ifNotNull.Configuration.outputVariable
ctx["$model.Configuration.outputVariable"] = plan;
// $endif;

// $ifNotNull.Configuration.outputCollection
var list = ctx["$model.Configuration.outputCollection"];
if (!list)
{
    list = ctx["$model.Configuration.outputCollection"] = [];
}
list.push(plan);
// $endif;
