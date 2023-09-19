import { IExtract } from "./IBuildConfiguration";

export interface IFinalTargetSettings {
    manifestFileName: string;
    designerManifestJSON: any;
    manifestJSON: any;
    designerTSFilePath: string;
    designerTSFileName: string;
    widgetTSFilePath: string;
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
