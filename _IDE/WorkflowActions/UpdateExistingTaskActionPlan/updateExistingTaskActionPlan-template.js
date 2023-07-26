(() => {
  log.Information("---- updateExistingTaskActionPlan-template ----");
  let taskId = ctx["$model.Configuration.taskId;"];
  if (!taskId) {
    throw new Error("Task id was not provided");
  }
  log.Information("taskId: " + taskId);
  let existingAp = false;
  let existingApId = getExistingActionPlanId(taskId);
  log.Information("getExistingActionPlanId(taskId) : " + existingApId);
  if (existingApId) {
    existingAp = true;
  }

  // outputObject(actions.sharedo.WithSharedo(taskId), "actions.sharedo.WithSharedo(taskId)");
  // outputObject(actions.sharedo.BuildActionPlan(), "actions.sharedo.BuildActionPlan()");
  // outputObject(actions.sharedo.BuildActionPlan().ForSharedo(taskId), "actions.sharedo.BuildActionPlan().ForSharedo(taskId)");
  // outputObject(actions.sharedo.BuildActionPlan().ForSharedo(taskId).ForExistingActionPlan(), "actions.sharedo.BuildActionPlan().ForSharedo(taskId).ForExistingActionPlan()");

  //create the action plan builder
  let actionPlanBuilder = actions.sharedo.BuildActionPlan().ForSharedo(taskId);
  outputJsonOfObject(actionPlanBuilder, "actionPlanBuilder");

  // if (existingAp === false) {
  log.Information("No existing action plan found so creation one");
  actionPlanBuilder.WithTitle(sharedo.buildString("$model.Configuration.actionPlanTitle;"));
  //}
  //else {
  //!Warning - this code doesnt seem to work
  //ended up using the API to post a update
  //log.Information("Existing action plan found so updating" + existingApId);
  //actionPlanBuilder = actionPlanBuilder.ForExistingActionPlan();
  // outputActionPlan(actionPlanBuilder);
  //}

  //used to build action plan items for existing action plan
  let actionPlanItemsArray = new Array();

  // Add action plan items
  // $ifNotNull.Configuration.actionPlanItemsList
  {
    let itemsAsString = ctx["$model.Configuration.actionPlanItemsList"];
    outputJsonOfObject(itemsAsString, "Variable: $model.Configuration.actionPlanItemsList");
    if (itemsAsString) {
      let items = itemsAsString; //JSON.parse(itemsAsString) as Array<any>;
      items.slice().sort((a, b) => Number.parseInt(a.order, 10) - Number.parseInt(b.order, 10)).forEach(function (i) {
        log.Information('Adding Action Plan Item:');
        log.Information('- description: ' + i.description);
        log.Information('- type: ' + i.type);
        log.Information('- order: ' + i.order);
        log.Information('**********');
        let actionPlanItem = buildActionPlan(i);
        //Add to array to be used to update existing action plan
        actionPlanItemsArray.push(actionPlanItem);
        actionPlanBuilder = actionPlanBuilder.AddItem(actionPlanItem);
      });
    }
  }
  // $endif

  if (existingAp === true) {
    log.Information("----- Update Existing via API -------");
    outputJsonOfObject(actionPlanItemsArray, "actionPlanItemsArray");
    updateExistingTaskActionPlanItems(taskId, actionPlanItemsArray);
  } else {
    log.Information("----- Save New Action Plan -------");
    actionPlanBuilder = actionPlanBuilder.Build();
    actionPlanBuilder.Save();
  }
  log.Information("---- updateExistingTaskActionPlan-template finished ----");
  function outputObject(obj, name) {
    log.Information("");
    log.Information("----- Obj[" + name + "] -------");
    for (let key in obj) {
      if (typeof obj[key] === 'function') {
        log.Information("function " + key);
        let info = JSON.stringify(obj[key]);
        if (typeof info === 'string') {
          log.Information(info);
        }
      } else {
        log.Information(key + " : " + obj[key]);
        log.Information(JSON.stringify(obj[key]));
      }
    }
    log.Information("----- Obj End " + name + "-------");
    log.Information("");
  }
  function outputJsonOfObject(obj, name) {
    log.Information("************- " + name + " -****************");
    log.Information(JSON.stringify(obj));
    log.Information("***********************************************");
  }
  ;
  function buildActionPlan(actionPlanModel) {
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
      } else {
        let cta = buildCallToAction(callToAction);
        actionPlan = actionPlan.WithCallToAction(cta);
      }
    }
    let plan = actionPlan.Build();
    log.Information("*** function buildActionPlan() finished");
    return plan;
  }
  function buildCallToAction(callToActionModel) {
    log.Information("*********** function buildCallToAction() *****************");
    log.Information("************-Data-****************");
    log.Information(JSON.stringify(callToActionModel));
    log.Information("****************************");
    let cta = actions.sharedo.BuildCallToAction().WithDisplay(callToActionModel.title);
    if (callToActionModel.styles) {
      cta = cta.WithStyles(callToActionModel.styles);
    }
    cta = cta.Build();
    cta.CallToActionContextType = callToActionModel.contextType;
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
      } else {
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
    log.Information('**** buildCallToAction finished ****');
    return cta;
  }
  function getExistingActionPlanId(id) {
    let result = sharedo.http.get(`/api/sharedo/${id}/actionplan`);
    //log.Information("result: " + JSON.stringify(result));
    if (result.success) {
      //log.Information("result.body: " + JSON.stringify(result.body));
      if (result.body && result.body.id) {
        //log.Information("result.body.id: " + result.body.id);
        return result.body.id;
      }
    }
    return undefined;
  }
  function updateExistingTaskActionPlanItems(id, actionPlanBuilder) {
    //remove Ids from action plan items
    //have to build a new array as we cannot delete Id from the passed in actionPlanBuilder
    //Object does not support dynamic members 
    let arrayWithRemovedIds = new Array();

    //Loop though the new action plan items and remove the Ids
    //add the new items with the removed ids to the new array
    for (let i = 0; i < actionPlanBuilder.length; i++) {
      let item = JSON.stringify(actionPlanBuilder[i]);
      let dataItem = JSON.parse(item);
      if (dataItem.Id) {
        log.Information(typeof dataItem.Id);
        delete dataItem.Id; //remove or post fails
      }

      arrayWithRemovedIds.push(dataItem);
    }
    outputJsonOfObject(arrayWithRemovedIds, "Action Plan Items To Be Added To Existing Action Plan");
    let url = `/api/sharedo/${id}/actionplan/items`;
    log.Information("Posting to url: " + url);
    let result = sharedo.http.post(url, arrayWithRemovedIds);
    outputJsonOfObject(result, "result");
    if (result.status === "Created") {
      log.Information("update success: " + JSON.stringify(result.body));
    } else {
      log.Information("update failed: " + JSON.stringify(result));
    }
  }
})();
//# sourceMappingURL=updateExistingTaskActionPlan-template.js.map