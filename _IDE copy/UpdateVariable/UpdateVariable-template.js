

let connections = $model.Connections;;
let newValue = sharedo.buildString("$model.Configuration.newValue;");
let currentValue = ctx["$model.Configuration.variableToUpdate;"];

let variableToUpdateName = "$model.Configuration.variableToUpdate;";

log.Information(`Current value of [${variableToUpdateName}] is: ${currentValue}`);
log.Information(`New value of [${variableToUpdateName}] will be set to : ${newValue}`);

ctx["$model.Configuration.variableToUpdate;"] = newValue;
   

