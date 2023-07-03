const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { library } = require("webpack");

let outputLocation = "../../../../_IDE/Scripts/eDiscovery";

console.log("__dirname:",__dirname);

module.exports = [
  { 
    watch: true,
    target: "web",
    entry: {
      "FB_MatterDetails":"./FB_MatterDetails/index.ts",
      "FB_JobSearch":"./FB_JobSearch/index.ts",
         },
    
    output: {
      globalObject: 'self',
      publicPath: '',
      library: {
        name: '[name]',
        type: 'window',
        umdNamedDefine: true,
      },
      path: path.join(__dirname, outputLocation),
      filename: "[name].js",
    },
    mode: 'production', 
    devtool: 'inline-source-map',
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
      extensions: ['.tsx','.ts', '.js'],
    },
    target: "web",
    node: {
      __dirname: false,
    },
  }
];