"use strict";
const path = require("path");
module.exports = [
    { watch: true,
        entry: {
            "createTask-template": "./source_createTask-template.ts"
        },
        output: {
            path: path.join(__dirname, ""),
            filename: "[name].js",
        },
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        target: "web",
        node: {
            __dirname: false,
        },
    }
];
//# sourceMappingURL=webpack.config.js.map