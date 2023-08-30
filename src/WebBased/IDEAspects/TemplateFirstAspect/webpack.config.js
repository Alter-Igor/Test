const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { library } = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let outputLocation = "../../../../_IDE/IDEAspects/TemplateFirstAspect";

console.log("__dirname:",__dirname);

module.exports = [
  { 
    watch: true,
    target: "web",
    entry: {
      "TemplateFirstAspect":"./TemplateFirstAspect.ts"
         },
    
    output: {
      globalObject: 'self',
      publicPath: '',
      library: {
        name: 'Aspects',
        type: 'assign-properties',
        umdNamedDefine: true,
      },
      path: path.join(__dirname, outputLocation),
      filename: "[name].js",
    },
    mode: 'production', 
    // devtool: 'inline-source-map',
    plugins: [
        new BundleAnalyzerPlugin(),
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