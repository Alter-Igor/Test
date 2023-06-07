"use strict";
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = [
    {
        watch: true,
        target: "web",
        entry: {
            "../_IDE/ModuleLoader/ModuleLoader": "./WebBased/ModuleLoader/ModuleLoader.ts",
            "../_IDE/Scripts/eDiscovery/FB_MatterDetails/FormBuilderHelper": "./WebBased/Scripts/eDiscovery/FB_MatterDetails/FormBuilderHelper.ts",
            "../_IDE/Scripts/eDiscovery/FB_JobSearch/FormBuilderHelper": "./WebBased/Scripts/eDiscovery/FB_JobSearch/FormBuilderHelper.ts",
        },
        output: {
            globalObject: 'self',
            library: "MyLib",
            path: path.join(__dirname, "."),
            filename: "[name].js",
        },
        mode: 'development',
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: "**/*.json",
                        context: path.resolve(__dirname, "WebBased"),
                        to: path.resolve("..", __dirname, "_IDE"),
                    },
                    {
                        from: "**/*.html",
                        context: path.resolve(__dirname, "WebBased"),
                        to: path.resolve("..", __dirname, "_IDE"),
                    },
                    {
                        from: "**/*.css",
                        context: path.resolve(__dirname, "WebBased"),
                        to: path.resolve("..", __dirname, "_IDE"),
                    },
                ],
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        target: "web",
        node: {
            __dirname: false,
        },
    }
];
//# sourceMappingURL=webpack.config%20copy.js.map