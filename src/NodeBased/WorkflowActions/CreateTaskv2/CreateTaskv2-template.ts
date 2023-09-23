import { IActionPlan } from "../../../Interfaces/Workflows/IActionPlan";
import { ICallToAction } from "../../../Interfaces/Workflows/ICallToAction";
import { IShareDoGetResponse } from "../../../Interfaces/Workflows/IShareDoGetResponse";

let connections = $model.Connections;
let configuration = $model.Configuration;
let taskId = Guid.NewGuid();
let dueOn = DateTime.Now;

log.Information(`taskId:${JSON.stringify(taskId)}`);
log.Information(`taskId:${taskId.ToString()}`);



// $ifNotNull.Configuration.outputVariable
if (configuration.outputVariable) {
    ctx[configuration.outputVariable] = taskId.ToString(); // It's a guid, need to to string it 
}
// $endif;

// $ifNotNull.Configuration.dueInDays
if (configuration.dueInDays) {
    if (configuration.dueInDays) {
        dueOn = DateTime.Now.AddDays($model.Configuration.dueInDays);
    }
}
// $endif

// $ifNotNull.Configuration.dueOnVariable
if (configuration.dueOnVariable) {
    dueOn = DateTime.Parse(ctx[configuration.dueOnVariable]);
}
// $endif


// outputObject(actions.sharedo.BuildTask,"BuildTask");



let task = actions.sharedo.BuildTask()

// outputObject(task,"task");



task = task.WithId(taskId)
    .OfType(configuration.taskType)
    .WithTitle(sharedo.buildString(configuration.taskTitle))
    .DueOn(dueOn)


// outputObject(task,"task 2");


if (connections["onOverdue"]) {
    task.OnOverdue(connections["onOverdue"].step)
}
if (connections["onComplete"]) {
    task.OnComplete(connections["onComplete"].step)
}


if (configuration.tag) {
    task.WithTag(sharedo.buildString(configuration.tag))
}

if (configuration.priorityId) {
    task.WithPriorityId($model.Configuration.priorityId)
}




if (configuration.OnReminderDue) {
    task.OnReminderDue(connections["onReminderDue"].step).At(1).Minutes;
}

if (configuration.phaseOutlets) {
    configuration.phaseOutlets.forEach((outlet: any) => {
        if (connections[outlet.systemName]) {
            task.OnPhase(outlet.systemName, connections[outlet.systemName].step);
        }
    });
}



if (configuration.parentWorkItemId) {
    let parentId = ctx[configuration.parentWorkItemId];
    if (parentId) {
        task = task.ForSharedo(parentId);
    }
}



if (configuration.taskOwnerOdsId) {
    let ownerId = ctx[configuration.taskOwnerOdsId];
    if (ownerId) {
        task = task.Assign("primary-owner").To(ownerId);
    }
} 



if (configuration.assignments) {
    configuration.assignments.forEach((assignment: any) => {
        if (assignment.odsIdVariableName) {
            task = task.Assign(assignment.roleSystemName).To(ctx[assignment.odsIdVariableName]);
        }
    });
}



if (configuration.addActionPlan) {
    // Add action plan
    let actionPlanBuilder = task
        .WithActionPlan()
        .WithTitle(sharedo.buildString(configuration.actionPlanTitle));

    // Add action plan items
    if (configuration.actionPlanItemsList) {
        let itemsAsString = ctx[configuration.actionPlanItemsList] as IActionPlan[];

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


    log.Information('*** actionPlanBuilder:');
    log.Information(JSON.stringify(actionPlanBuilder));

    task = actionPlanBuilder.Build();

    log.Information('*** final Task:');
    log.Information(JSON.stringify(task));


}

// outputObject(task,"pre save");

task.Save();


if (configuration.instanceTag) {
    log.Information('*** Updating the Instance Tag ****');
    
    let model = {
        value: configuration.instanceTag
    };

    let url=`/api/v1/public/workItem/${taskId.ToString()}/attributes/instanceTag`;
    log.Information(`url: ${url}`);
    let result: IShareDoGetResponse<any> = sharedo.http.post(url, model);
    
    if(!result.success)
    {
        log.Error(`Failed to update InstanceTag Attribute: ${JSON.stringify(result)}`);
        log.Information(`JSON: ${JSON.stringify(result)}`);
        throw new Error(`Failed to update InstanceTag Attribute!`);
    }
   
    log.Information(`InstanceTag Attribute Updated!`);
    log.Information('*** Updating the Instance Tag Complated ****');
}


// outputObject(task,"post save");

log.Information('*** task post save:');
log.Information(JSON.stringify(task));


// if(configuration.instanceTag)
// {
//     task.instanceTag(configuration.instanceTag);
// }


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

function outputObject(obj: any, name: string) {
    log.Information("");
    log.Information("----- Obj[" + name + "] -------");
    for (let key in obj) {
        if (typeof obj[key] === 'function') {
            log.Information("function " + key);
            let info = JSON.stringify(obj[key]);
            if (typeof info === 'string') {
                log.Information(info);
            }
        }
        else {
            log.Information(key + " : " + obj[key]);
            log.Information(JSON.stringify(obj[key]));
        }
    }
    log.Information("----- Obj End " + name + "-------");
    log.Information("");
}