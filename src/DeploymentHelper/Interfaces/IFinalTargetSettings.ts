import { ITargetTSFile } from "../Validation/TSFileFinder.mjs";
import { IManifestInfo } from "../Validation/TargetSettingsValidator.mjs";
import { IExtract } from "./IBuildConfiguration";

export interface IFinalTargetSettings {
    publicPath: any;
    designerTSFilePath: string;
    designerTSFileName: string;
    designerManifestJSON: any;
    tsFileInfo: ITargetTSFile;
    manifestInfo: IManifestInfo;
    designerManifestInfo: IManifestInfo;
    // manifestFileName: string;
    // designerManifestJSON: any;
    // manifestJSON: any;
    tsDesignerFileInfo: ITargetTSFile;
    // designerTSFilePath: string;
    // designerTSFileName: string;
    // widgetTSFilePath: string;
    templateTsFilePath: string;
    factoryTSFilePath: string;
    templateTsFileName: string;
    erros: Array<string>;
    namespace: string;
    enabled: boolean;
    bundleAnalyzer: boolean;
    designerPath: string;
    designerManifestFilePath: string | undefined;
    designerCSSFiles: string[];
    designerHTMLFiles: string[];
    cssFiles: string[];
    htmlFiles: string[];
    manifestFilePath: string;
    modulesToExtract: IExtract[];
    // designerPath: string;
    name: string,
    type: string,
    sourcePath: string,
    deployPath: string
    valid: boolean
    factoryTSFileName:string,
    widgetTSFileName: string;

}
