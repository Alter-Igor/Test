import { I_IDE_Aspect_Modeller_Configuration } from "../BaseClasses/BaseIDEAspect";

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

export const Default: I_IDE_Aspect_Modeller_Configuration<IExternalMatterSearchConfiguration> = {
    fackMode: false,
    searchApiUrl: "api/externalMatterProvider/query/{0}",
    loadApiUrl: "api/externalMatterProvider/details/{data.code}",
    dataMapping: [
        { formBuilderField: "matterNumber", searchResultField: "matterCode" },
        { formBuilderField: "matterShortName", searchResultField: "shortName" },
        { formBuilderField: "matterClient{*}", searchResultField: "client.{*}" },
        { formBuilderField: "matterPartnerName", searchResultField: "partner.name" },
        { formBuilderField: "matterPartnerEmail", searchResultField: "partner.name" },
    ],
    fackSearchDataIDEPath: undefined,
    fackLoadDataIDEPath: undefined,
    debug:
    {
        enabled: false,
        logToConsole: false,
        showInAspect: false
    }
}


