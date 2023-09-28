import { IDefaultSettings } from "../BaseClasses/BaseIDEAspect";
import { DEFAULT_SEARCH_FIELDS_CONFIG } from "./DefaultSearchFields";
import { DEFAULT_SELECTED_FIELDS_CONFIG } from "./DefaultSelectedFields";
import { IExternalMatterSearchConfiguration } from "./ExternalMatterSearchInterface";

export const Default: IDefaultSettings<IExternalMatterSearchConfiguration>= {
    title: "Matter Search",
    inputVisability: [
        {
            rule: "phaseName().toLowerCase()==='new'",
        }
    ],
    fackMode: false,
    formBuilderFieldSerialisedData: "matterJSON",
    selectedFieldDisplayValue:"{matterCode} - {shortName}",
    searchApiResultCollectionPath: "data[0].results",
    loadApiResultDataPath: "data",
    searchApiUrl: "api/externalMatterProvider/query/{searchTerm}",
    loadApiUrl: "api/externalMatterProvider/details/{code}",
    dataMapping: [
        { formBuilderField: "matterNumber", searchResultField: "{matterCode}" },
        { formBuilderField: "matterShortName", searchResultField: "{shortName}" },
        { formBuilderField: "matterClient{*}", searchResultField: "{client}.{*}" },
        { formBuilderField: "matterPartner{*}", searchResultField: "{partner}.{*}" },
        { formBuilderField: "matterIsSecure", searchResultField: "{isSecure}" },
    ],
    fackSearchDataIDEPath: undefined,
    fackLoadDataIDEPath: undefined,
    debug:
    {
        enabled: true,
        logToConsole: true,
        showInAspect: true,
        liveConfig: true,
        supportRequestEnabled: true,
    },
    eventsToReactTo: [],
    searchFields: DEFAULT_SEARCH_FIELDS_CONFIG,
    selectedFields: DEFAULT_SELECTED_FIELDS_CONFIG
    
}