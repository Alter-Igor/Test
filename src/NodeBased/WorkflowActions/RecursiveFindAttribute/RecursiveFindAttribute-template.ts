import { ConfigurationType } from "./IConfiguration";
import { searchForAttributeRecursive } from "./search";


let connections = $model.Connections;
let configuration: ConfigurationType = $model.Configuration;

let workItemId: string | undefined = ctx[configuration.workItemIdVariable];

if (!workItemId) {

    throw new Error(`!workItemId - check ctx.${configuration.workItemIdVariable}`);
}

if (!configuration.attribute) {
    throw new Error(`!configuration.attribute - check configuration`);
}



let attributeValue = searchForAttributeRecursive(workItemId, configuration.attribute, configuration.parents, configuration.children);

if (attributeValue.found) {
    // attributeValue.value = attributeValue.value?.trim() || "";
    log.Information("--------------------------------------")
    log.Information(`Found attribute [${configuration.attribute}] with value [${attributeValue.value?.toString()}]`);
    log.Information(`Setting output variable [${configuration.outputVariable}] to [${attributeValue.value?.toString()}]`);
    log.Information("-------------------------------------")
    ctx[configuration.outputVariable] = attributeValue.value;
    if (connections.found) {
        trigger.SubProcess(connections.found.step()).Now();
    }
}
else {

    if (connections.notFound) {
        trigger.SubProcess(connections.notFound.step()).Now();
    }
}
