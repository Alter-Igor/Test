const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { library } = require("webpack");

let mode = "development";

console.log("__dirname:",__dirname);

let outputLocation = "."

module.exports = [ 
  { 
    watch: true,
    target: "web",
    entry: {
      "page":`./page.ts`
         },
    
    output: { 
      globalObject: 'self',
      publicPath: '',
      library: {
        name: 'Widgets', 
        type: 'assign-properties',
        umdNamedDefine: true,
      }, 
      path: path.join(__dirname, outputLocation),
      filename: "[name].js",
    },
    mode: mode, 
    plugins: [
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
      // modules: ['node_modules']
    },
    // resolveLoader: {
    //   modules: [
    //       'node_modules'
    //   ]
    // },
    target: "web",
    node: {
      __dirname: false,
    },
    externals: {
      jquery: 'jQuery',
      knockout: 'ko',
      // moment: 'moment',
    },
  }
];
