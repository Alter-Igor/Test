import { IFormBuilderContext } from "../../../Typings/FormBuilder/IFormBuilderContext";
export declare function runMe(context: IFormBuilderContext): Promise<void>;
export declare enum enumFields {
    customAltEdiscoveryInstructionMatterDetails = "custom-alt-ediscovery-instruction-matter-details",
    jurisdictionsCountry = "jurisdictions-country",
    pipelineMatter = "pipeline-matter",
    expertMatterNumber = "expert-matter-number",
    tempMatterNumber = "temp-matter-number",
    subMatterCode = "sub-matter-code",
    abcMatterNumber = "abc-matter-number",
    matterDetails = "matter-details"
}
export declare enum enumMatterDetailFields {
    matterDetailsPartnerSelector = "matter-details-partner-selector",
    matterDetailsPartnerName = "matter-details-partner-name",
    matterDetailsClientName = "matter-details-client-name",
    matterDetailsClientCode = "matter-details-client-code",
    matterDetailsPracticeArea = "matter-details-practice-area",
    matterDetailsName = "matter-details-name",
    matterDetailsIb = "matter-details-ib"
}
