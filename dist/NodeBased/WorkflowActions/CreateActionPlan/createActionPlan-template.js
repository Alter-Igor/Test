"use strict";
let actionPlan = {
    type: "",
    mandatory: undefined,
    order: undefined,
    callToActionVar: undefined,
    description: undefined
};
actionPlan.description = sharedo.buildString("$model.Configuration.description;");
actionPlan.type = "$model.Configuration.type";
actionPlan.mandatory = $model.Configuration.mandatory;
actionPlan.order = $model.Configuration.order;
;
actionPlan.callToActionVar = ctx["$model.Configuration.callToActionVar"];
// $ifNotNull.Configuration.outputVariable
ctx["$model.Configuration.outputVariable"] = actionPlan;
// $endif;
// $ifNotNull.Configuration.outputCollection
let listAsString = ctx["$model.Configuration.outputCollection"];
if (!listAsString) {
    log.Information('*** create new array');
    let emptyArray = [];
    listAsString = emptyArray; //JSON.stringify(emptyArray);
    // log.Information(listAsString);
    ctx["$model.Configuration.outputCollection"] = listAsString;
}
let list = listAsString; // JSON.parse(listAsString) as Array<any>;
list.push(actionPlan);
ctx["$model.Configuration.outputCollection"] = list;
// $endif;
//# sourceMappingURL=createActionPlan-template.js.map