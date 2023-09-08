import { IExtract } from "./IBuildConfiguration";

export interface IFinalTargetSettings {
    enabled: boolean;
    bundleAnalyzer: boolean;
    designerManifest: string | undefined;
    manifest: string;
    modulesToExtract: IExtract[];
    designerPath: string;
    entryTSFile: string;
    // designerPath: string;
    name: string,
    type: string,
    sourcePath: string,
    deployPath: string
    valid: boolean

}
