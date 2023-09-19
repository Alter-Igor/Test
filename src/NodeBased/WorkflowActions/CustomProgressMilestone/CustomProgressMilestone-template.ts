
import { ConfigurationType, HttpResultType, IMatterSearchResult } from "./IConfiguration";

log.Information(``);
log.Information(`--- Custom Progress Milestone ---`);

let configuration: ConfigurationType = $model.Configuration;
let connections = $model.Connections;
let workItemId: string | undefined = ctx[configuration.workItemIdVariable];

if (!workItemId) {
    throw new Error("Cannot progress work item - no work item id");
}

function setPhaseByFeature() {
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
            { "path": "phase.systemName" },
            { "path": "reference" }
        ]
    }
    log.Information("Getting ShareDo Details for work item " + workItemId);
    let httpResultFindByQuery: HttpResultType<IMatterSearchResult> = sharedo.http.post(`/api/v1/public/workItem/findByQuery`, req);

    httpResultFindByQuery.success = true;
    if (!httpResultFindByQuery.success) {
        log.Error("Error getting ShareDo Details here is the JSON result");
        log.Information('');
        log.Information(JSON.stringify(httpResultFindByQuery, null, 4));
        log.Information('');
        throw new Error(`Failed to jump to phase - API returned '${httpResultFindByQuery.status}'`);
    }

    let typeSystemName = httpResultFindByQuery.body.results[0].data["type.systemName"];
    let currentPhase = httpResultFindByQuery.body.results[0].data["phase.systemName"];
    let title = httpResultFindByQuery.body.results[0].data["title"];

    log.Information(``);
    log.Information(`----------------- Details of Sharedo ---------------------------------`);
    log.Information(``);
    log.Information(`Type system name is    : ${typeSystemName}`);
    log.Information(`Current phase is       : ${currentPhase}`);
    log.Information(`Title is               : ${title}`);
    log.Information(``);
    log.Information(`----------------- Details of Sharedo ---------------------------------`);
    log.Information(``);

    log.Information(`Getting phases on type ${typeSystemName} that have feature flag ${configuration.phaseFeature} enabled`);
    let httpResultFeature: HttpResultType<string[]> = sharedo.http.get(`/api/featureframework/flags/${configuration.phaseFeature}/${typeSystemName}/enabledPhases`);

    if (!httpResultFeature.success) {
        log.Error(`- Error getting sub features for type ${typeSystemName}`);
        log.Information('');
        log.Information(JSON.stringify(httpResultFeature, null, 4));
        log.Information('');
        throw new Error(`Failed to jump to phase - API returned '${httpResultFeature.status}'`);
    }

    if (!httpResultFeature.body || httpResultFeature.body.length == 0) {
        log.Warning("No features found - Ignoring this action, though you may want to check the configuration");
        return false;
    }

    log.Information(`- Found ${configuration.phaseFeature} and has been used on ${httpResultFeature.body.length} phase`);
    if (httpResultFeature.body.length > 1) {
        log.Warning(`  - More than one feature found! Could be an issue - Check these phases: ${JSON.stringify(httpResultFeature.body)}`);
    }
    let phaseToSet = httpResultFeature.body[0];

    log.Information(`- Setting phase to ${phaseToSet}`);
    configuration.phaseSystemName = phaseToSet;
    log.Information(`- Calling setPhase(${phaseToSet})`);
    setPhase(phaseToSet);
    return true;

}

const setPhase = (targetPhase: string): boolean => {

    if (!targetPhase) {
        throw new Error(`Cannot progress work item - no target phase`);
    }

    if (configuration.jumpToPhase) {
        log.Information(`Jumping phase of work item ${workItemId} to ${targetPhase}`);

        let model = {
            toPhaseSystemName: targetPhase,
            description: sharedo.buildString(configuration.description || ""),
            reasonOptionSetValue: configuration.reasonType,
            suppressEvents: configuration.suppressEvents,
            suppressGuards: configuration.suppressChecksAndGuards
        };

        log.Information(`------------------ Jump --------------------`);
        log.Information(`Jump model: ${JSON.stringify(model)}`);

        let httpResult: HttpResultType<any> = sharedo.http.post(`/api/sharedo/${workItemId}/phase/jumpTo`, model);
        if (!httpResult.success) {
            log.Information(`Failed DOING JUMP TO PHASE - JSON result:`);
            log.Information(``);
            log.Information(JSON.stringify(httpResult, null, 4));
            log.Information(``);

            if (httpResult.status === 'Forbidden') {
                throw new Error(`Failed to jump to phase - API returned '${httpResult.status}' - please verify that the Event Engine application has the 'core.admin.jumptophase' permission`);
            }
            throw new Error(`Failed to jump to phase - API returned '${httpResult.status}'`);
        }
        log.Information(`------------------ Jump Completed --------------------`);
        return true;
    }

    log.Information(`------------------ Set Phase --------------------`);
    log.Information(`- Progress milestone action of work item ${workItemId} to ${targetPhase}`);
    sharedo.setPhase(workItemId, targetPhase, false, sharedo.buildString(configuration.reasonText || ""));
    log.Information(`- Progress milestone action of work item ${workItemId} to ${targetPhase} has been completed`);
    log.Information(`------------------ Set Phase Completed --------------------`);
    return true;
}

let success: boolean = false;
if (!configuration.dynamic) {

    let targetPhase: string | undefined | null = configuration.phaseSystemName;
    log.Information(`Static phase jump for work item ${workItemId}`);
    if (!targetPhase) {
        throw new Error("Cannot progress work item - no target phase");
    }
    success = setPhase(targetPhase);
}
else {
    log.Information(`Dynamic phase jump for work item ${workItemId}`);
    success = setPhaseByFeature();
}

if(success) {
    log.Information("Progress Milestone Success - calling connection [success]");
    if (connections.success) {
        trigger.SubProcess(connections.success.step).Now();
    }
    else
    {
        log.Warning("No connection [success] found");
    }
}
else
{
    log.Information("Progress Milestone Failed - calling connection [failed]");
    if (connections.failed) {
        trigger.SubProcess(connections.failed.step).Now();
    }
    else
    {
        log.Warning("No connection [failed] found");
    }
}
