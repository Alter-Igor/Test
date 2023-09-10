import { IActionPlan } from "../../../Interfaces/Workflows/IActionPlan";
import { ICallToAction } from "../../../Interfaces/Workflows/ICallToAction";
import { IShareDoActionPlan } from "../../../Interfaces/Workflows/IShareDoActionPlan";
import { IShareDoGetResponse } from "../../../Interfaces/Workflows/IShareDoGetResponse";

(() => {
    log.Information("---- Search-template ----");
    let taskId = ctx["$model.Configuration.taskId;"];
    if (!taskId) {
        throw new Error("Task id was not provided");
    }

    log.Information("taskId: " + taskId);
    let existingAp = false;
    let existingApId = getExistingActionPlanId(taskId);
    if(existingApId)
    {
         existingAp = true
    }

    let actionPlanBuilder = actions.sharedo.BuildActionPlan().ForSharedo(taskId);
    // let actionPlan = actionPlanBuilder.ActionPlan;
    // //Note Id is always empty so use title
    // log.Information("actionPlan: " + JSON.stringify(actionPlan));
    // let apId;
    // if (actionPlan && actionPlan.Title) { //must only be == not ===     
    //     log.Information("Existing action plan found");
    //     actionPlanBuilder = actionPlanBuilder.ForExistingActionPlan(actionPlan.Id);
    //     existingAp = true;
    // }

    if (!existingAp) {
        log.Information("No existing action plan found so creation one");

        actionPlanBuilder.WithTitle(sharedo.buildString("$model.Configuration.actionPlanTitle;"));
    }
    else{
        actionPlanBuilder.ForExistingActionPlan();
    }

    let obj = actionPlanBuilder;
    for (let key in obj) {
        if (typeof obj[key] === 'function') {
            log.Information("function " + key);
        }
        else {
            log.Information(key + " : " + obj[key]);
            log.Information(JSON.stringify(obj[key]));
        }
    }

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
    actionPlanBuilder = actionPlanBuilder.Build();

    // $endif



    //loop though object and show all method and properties


    log.Information("----- save -------");

    actionPlanBuilder.Save();
    // ()=>{

    // let taskId = ctx["$model.Configuration.taskId"];
    // if(!taskId) {
    //     throw new Error("Task id was not provided");
    // }

 
    // {
    //     // Add action plan
    //     let actionPlanBuilder = task
    //         .WithActionPlan()
    //         .WithTitle(sharedo.buildString("$model.Configuration.actionPlanTitle;"));


    // task.Save();

    // log.Information('*** task:');
    // log.Information(JSON.stringify(task));




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

    function getExistingActionPlanId(id:string)
    {
        let result : IShareDoGetResponse<IShareDoActionPlan> = sharedo.http.get(`/api/sharedo/${id}/actionplan`);
        log.Information("result: " + JSON.stringify(result));
        if(result.success)
        {
            log.Information("result.body: " + JSON.stringify(result.body));
            if(result.body && result.body.id)
            {
                log.Information("result.body.id: " + result.body.id);
                return result.body.id;
            }
        }
        
        return undefined;

    }


})();