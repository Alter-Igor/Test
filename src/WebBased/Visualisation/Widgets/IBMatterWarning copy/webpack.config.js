const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { library } = require("webpack");

let outputLocation = "../../../../../_IDE/Visualisation/Widgets/IBMatterWarning";

console.log("__dirname:",__dirname);

module.exports = [
  { 
    watch: true,
    target: "web",
    entry: {
      "IBMatterWarning":"./IBMatterWarning.ts",
      "designer/IBMatterWarningDesigner":"./designer/IBMatterWarningDesigner"
         },
    
    output: {
      globalObject: 'self',
      publicPath: '',
      library: {
        name: 'eDiscovery',
        type: 'assign-properties',
        umdNamedDefine: true,
      },
      path: path.join(__dirname, outputLocation),
      filename: "[name].js",
    },
    mode: 'production', 
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "**/*.json",
            context: path.resolve(__dirname),
            to: path.resolve(outputLocation),
          },     
          {
            from: "**/*.css",
            context: path.resolve(__dirname),
            to: path.resolve(outputLocation),
          }, 
          {
            from: "**/*.html",
            context: path.resolve(__dirname),
            to: path.resolve(outputLocation),
          }, 
        ],
      }),
    ],
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
    externals: {
      jquery: 'jQuery',
      knockout: 'ko',
      moment: 'moment',
    },
  }
];