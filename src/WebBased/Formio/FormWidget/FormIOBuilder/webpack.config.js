const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { library } = require("webpack");

//names
let widgetName = "FormWidget";
let designerWidgetName = widgetName + "Designer";

//paths
let designerWidgetPath = `./designer/`; //end with a slash /

let outputWidgetDesignerName =designerWidgetPath + designerWidgetName;

let outputWidgetName = widgetName;
let outputLocation = `../../../../../_IDE/Widgets/${widgetName}/FormIOBuilder`;

let mode = "development";

console.log("__dirname:",__dirname);

module.exports = [ 
  { 
    watch: true,
    target: "web",
    entry: {
      "page": "./page.ts",
         },
    
    output: { 
      globalObject: 'self',
      publicPath: '',
      library: {
        name: 'FormWidgetPage', 
        type: 'assign-properties',
        umdNamedDefine: true,
      }, 
      path: path.join(__dirname, outputLocation),
      filename: "[name].js",
    },
    mode: mode, 
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
      // jquery: 'jQuery',
      // knockout: 'ko',
      // moment: 'moment',
    },
  }
];
 