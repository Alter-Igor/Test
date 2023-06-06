declare const _exports: {
    watch: boolean;
    entry: {
        "createTask-template": string;
    };
    output: {
        path: string;
        filename: string;
    };
    mode: string;
    module: {
        rules: {
            test: RegExp;
            exclude: RegExp;
            loader: string;
        }[];
    };
    resolve: {
        extensions: string[];
    };
    target: string;
    node: {
        __dirname: boolean;
    };
}[];
export = _exports;
