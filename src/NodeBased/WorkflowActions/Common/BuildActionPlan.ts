import { IActionPlan } from "../../../Interfaces/Workflows/IActionPlan";
import { ICallToAction } from "../../../Interfaces/Workflows/ICallToAction";

export function buildActionPlan(actionPlanModel: IActionPlan): any
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




export function buildCallToAction(callToActionModel: ICallToAction): any | undefined
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