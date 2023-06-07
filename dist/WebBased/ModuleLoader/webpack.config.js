"use strict";
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
console.log("__dirname:", __dirname);
module.exports = [
    {
        watch: true,
        target: "web",
        entry: {
            "../../../_IDE/ModuleLoader/ModuleLoader": "./ModuleLoader.ts",
        },
        output: {
            globalObject: 'this',
            library: {
                type: "umd",
                name: "ModuleLoader"
            },
            path: path.join(__dirname, "."),
            filename: "[name].js",
        },
        mode: 'development',
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: "**/*.json",
                        context: path.resolve(__dirname),
                        to: path.resolve("../../../_IDE/ModuleLoader"),
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
//# sourceMappingURL=webpack.config.js.map