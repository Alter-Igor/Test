import { DEBUG_DEFAULT } from "../BaseClasses/DebugDefaults";
import { IDefaultSettingsWithSpecificComponentConfig } from "../BaseClasses/IWidgetJson";
import { DEFAULT_SEARCH_FIELDS_CONFIG } from "./DefaultSearchFields";
import { DEFAULT_SELECTED_FIELDS_CONFIG } from "./DefaultSelectedFields";
import { IExternalMatterSearchConfiguration } from "./ExternalMatterSearchInterface";

export const Default: IDefaultSettingsWithSpecificComponentConfig<IExternalMatterSearchConfiguration>= 
{
    title: "Matter Search",
    showSearchingStatus: true,
    inputVisability: [
        {
            rule: "dataContext.phaseName ? dataContext.phaseName.toLowerCase()==='new' : true"
        }
    ],
    fackMode: false,
    fackLoadDataIDEPath: undefined,
    fackSearchDataIDEPath: undefined,
    formBuilderName: "custom-alt-ediscovery-instruction-matter-details",
    formBuilderFieldSerialisedData: "matterJSON",
    selectedFieldDisplayValue: "${dataContext.matterCode} - ${dataContext.shortName}",
    loadApiResultDataPath: "data",
    loadApiUrl: "/api/proxy/hurricane-api/_/v2/matters/${dataContext.data.matterCode||dataContext.data.code}",
    dataMapping: [
        {
            formBuilderField: "expert-matter-number",
            searchResultField: "${dataContext.data.matterCode}"
        },
        {
            formBuilderField: "expert-matter-number-value",
            searchResultField: "${dataContext.data.matterCode}"
        },
        {
            formBuilderField: "matter-details-ib",
            searchResultField: "${dataContext.data.secure}"
        },
        {
            formBuilderField: "matter-details-name",
            searchResultField: "${dataContext.data.shortName}"
        },
        {
            formBuilderField: "matter-details-client-name",
            searchResultField: "${dataContext.data.client.name}"
        },
        {
            formBuilderField: "matter-details-client-code",
            searchResultField: "${dataContext.data.client.code}"
        },
        {
            formBuilderField: "matter-details-partner-name",
            searchResultField: "${dataContext.data.partner.name}"
        }
    ], 
    fieldMapping: [
        {
            formBuilderField: "jurisdictions-country",
            searchResultField: "${dataContext.data.location.country}"
        }
    ],
    debug: DEBUG_DEFAULT(),
    searchFields: DEFAULT_SEARCH_FIELDS_CONFIG,
    selectedFields: DEFAULT_SELECTED_FIELDS_CONFIG,
    searchApiExecutionSettings: [
        {
            method: "GET",
            url: "/api/proxy/hurricane-api/_/v1/find?q=${dataContext.searchTerm}&engines=MBN",
            resultDataPath: "data[0].results",
            name: "Aderant Matter Content"
        },
        { 
            method: "GET",
            url: "/api/proxy/hurricane-api/_/v1/find?q=${dataContext.searchTerm}&engines=MBC",
            resultDataPath: "data[0].results",
            name: "AAderant Matter Number"
        }
    ],
    refreshOn:
    {
        sharedoIdChanged: true,
        sharedoParentIdChanged: true,
        sharedoPhaseChanged: false,
    },
    eventsToReactTo: [],   
    dataSettings: {
        getValueUsingParents: false,
        maxDepth: 0,
    }
}
