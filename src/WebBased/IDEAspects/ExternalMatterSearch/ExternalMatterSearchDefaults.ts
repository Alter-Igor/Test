import { IDefaultSettings } from "../BaseClasses/BaseIDEAspect";
import { DEBUG_DEFAULT } from "../BaseClasses/DebugDefaults";
import { DEFAULT_SEARCH_FIELDS_CONFIG } from "./DefaultSearchFields";
import { DEFAULT_SELECTED_FIELDS_CONFIG } from "./DefaultSelectedFields";
import { IExternalMatterSearchConfiguration } from "./ExternalMatterSearchInterface";

export const Default: IDefaultSettings<IExternalMatterSearchConfiguration>= 
{
    title: "Matter Search",
    inputVisability: [
        {
            rule: "phaseName().toLowerCase()==='new'"
        }
    ],
    fackMode: false,
    fackLoadDataIDEPath: undefined,
    fackSearchDataIDEPath: undefined,
    formBuilderFieldSerialisedData: "matterJSON",
    selectedFieldDisplayValue: "`${dataContext.matterCode} - ${dataContext.shortName}`",
    loadApiResultDataPath: "data",
    loadApiUrl: "`/api/proxy/hurricane-api/_/v2/matters/${dataContext.data.matterCode||dataContext.data.code}`",
    dataMapping: [
        {
            formBuilderField: "expert-matter-number",
            searchResultField: "`${dataContext.data.matterCode}`"
        },
        {
            formBuilderField: "expert-matter-number-value",
            searchResultField: "`${dataContext.data.matterCode}`"
        },
        {
            formBuilderField: "matter-details-ib",
            searchResultField: "`${dataContext.data.secure}`"
        },
        {
            formBuilderField: "matter-details-name",
            searchResultField: "`${dataContext.data.shortName}`"
        },
        {
            formBuilderField: "matter-details-client-name",
            searchResultField: "`${dataContext.data.client.name}`"
        },
        {
            formBuilderField: "matter-details-client-code",
            searchResultField: "`${dataContext.data.client.code}`"
        },
        {
            formBuilderField: "matter-details-partner-name",
            searchResultField: "`${dataContext.data.partner.name}`"
        }
    ], 
    debug: DEBUG_DEFAULT(),
    searchFields: DEFAULT_SEARCH_FIELDS_CONFIG,
    selectedFields: DEFAULT_SELECTED_FIELDS_CONFIG,
    searchApiExecutionSettings: [
        {
            method: "GET",
            url: "/api/proxy/hurricane-api/_/v1/find?q={searchTerm}&engines=MBN",
            resultDataPath: "data[0].results",
            name: "Matter Number"
        },
        { 
            method: "GET",
            url: "/api/proxy/hurricane-api/_/v1/find?q={searchTerm}&engines=MBC",
            resultDataPath: "data[0].results",
            name: "Matter Content"
        }
    ],
    eventsToReactTo: [],   
}
