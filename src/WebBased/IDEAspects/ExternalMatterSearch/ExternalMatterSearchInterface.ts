import { IDefaultSettings } from "../BaseClasses/BaseIDEAspect";

export interface IExternalMatterSearchConfiguration {
    fackMode: boolean;
    searchApiUrl: string; ///"api/externalMatterProvider/query/{0}"
    loadApiUrl: string; //"api/externalMatterProvider/details/{data.code}" 
    // searchResultTemplate: string; // "code,description"
    dataMapping: IDataMapping[],
    fackSearchDataIDEPath: string | undefined;
    fackLoadDataIDEPath: string | undefined;
}

export interface IDataMapping {
    formBuilderField: string;
    searchResultField: string;
}

export const Default: IDefaultSettings<IExternalMatterSearchConfiguration>= {
    fackMode: false,
    searchApiUrl: "api/externalMatterProvider/query/{searchTerm}",
    loadApiUrl: "api/externalMatterProvider/details/{code}",
    dataMapping: [
        { formBuilderField: "matterNumber", searchResultField: "code" },
        { formBuilderField: "matterShortName", searchResultField: "shortName" },
        { formBuilderField: "matterClient{*}", searchResultField: "client.{*}" },
        { formBuilderField: "matterPartnerName", searchResultField: "partner.name" },
        { formBuilderField: "matterPartnerEmail", searchResultField: "partner.email" },
    ],
    fackSearchDataIDEPath: undefined,
    fackLoadDataIDEPath: undefined,
    debug:
    {
        enabled: true,
        logToConsole: true,
        showInAspect: true
    },
    eventsToReactTo: []
}


