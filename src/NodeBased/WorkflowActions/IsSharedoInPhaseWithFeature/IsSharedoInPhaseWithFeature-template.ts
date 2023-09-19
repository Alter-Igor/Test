
import { ConfigurationType, HttpResultType, IMatterSearchResult } from "./IConfiguration";


let connections = $model.Connections;
let configuration: ConfigurationType = $model.Configuration;

let workItemId: string | undefined = ctx[configuration.workItemIdVariable];

if (!workItemId) {
    throw new Error("Cannot progress work item - no work item id");
}

function validate(): boolean {

    if (!configuration.phaseFeature) {
        log.Error(`Phase feature is not set`);
        throw new Error(`Phase feature is not set`);
    }


    //get the matter
    let req = {
        "search": {
            "page": { "page": 1, "rowsPerPage": 20 },
            "sort": { "direction": "ascending", "orderBy": "title" },
            "workItemIds": [workItemId]
        },
        "enrich": [
            { "path": "title" },
            { "path": "type.systemName" },
            { "path": "reference" },
            { "path": "phase.systemName" }
        ]
    }
    log.Information("Getting matter for work item " + workItemId);
    let httpResultFindByQuery: HttpResultType<IMatterSearchResult> = sharedo.http.post(`/api/v1/public/workItem/findByQuery`, req);
    log.Information("Got matter for work item " + workItemId);
    // log.Information(JSON.stringify(httpResultFindByQuery));

    httpResultFindByQuery.success = true;
    if (!httpResultFindByQuery.success) {
        log.Error("Error");
        log.Information(JSON.stringify(httpResultFindByQuery));
        throw new Error(`Failed to jump to phase - API returned '${httpResultFindByQuery.status}'`);
    }

    if (!httpResultFindByQuery.body || httpResultFindByQuery.body.totalCount == 0) {
        log.Error(`Work item ${workItemId} not found`);
        throw new Error(`Work item ${workItemId} not found`);
    }

    log.Information(`Work item ${workItemId} found`);

    let typeSystemName = httpResultFindByQuery.body.results[0].data["type.systemName"];
    let currentPhase = httpResultFindByQuery.body.results[0].data["phase.systemName"];
    let title = httpResultFindByQuery.body.results[0].data["title"];

    log.Information(`Type system name is ${typeSystemName}`);
    log.Information(`Current phase is ${currentPhase}`);
    log.Information(`Title is ${title}`);
    log.Information(`Getting phases on type ${typeSystemName} that have feature flag ${configuration.phaseFeature} enabled`);

    let httpResultFeature: HttpResultType<string[]> = sharedo.http.get(`/api/featureframework/flags/${configuration.phaseFeature}/${typeSystemName}/enabledPhases`);

    if (!httpResultFeature.success) {
        log.Error(`Error getting sub features for type ${typeSystemName}`);
        log.Information(JSON.stringify(httpResultFeature));
        throw new Error(`Failed to jump to phase - API returned '${httpResultFeature.status}'`);
    }

    if (!httpResultFeature.body || httpResultFeature.body.length == 0) {
        log.Information(`No features found - returning false`);
        return false;
    }

    let found = httpResultFeature.body.find((phase) => phase.toLowerCase() === currentPhase.toLowerCase());

    if (!found) {
        log.Information(`Current phase ${currentPhase} is not in the list of phases with feature ${configuration.phaseFeature}`);
        return false;
    }


    log.Information(`Found ${configuration.phaseFeature} on ShareDo ${workItemId} and has been used on ${currentPhase} phase`);

    //check to see if the current phase is in the list of phases

    return true;

}


if (validate() === true) {
    log.Information("Phase is in lis - calling connection exists");
    if (connections.exists) {
        trigger.SubProcess(connections.exists.step).Now();
    }

}
else {
    log.Information("Phase is not in list - calling connection [notExists]");
    if (connections.doesNotExist) {
        trigger.SubProcess(connections.doesNotExist.step).Now();
    }
    else
    {
        log.Warning("No connection [notExists] found");
    }
}

