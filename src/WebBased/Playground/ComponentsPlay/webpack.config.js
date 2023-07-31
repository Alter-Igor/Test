const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { library } = require("webpack");

let outputLocation = "../../../../_IDE/Visualisation/Widgets/PlayGround/ComponentsPlay";

console.log("__dirname:",__dirname);
console.log("outputLocation:",outputLocation);

module.exports = [
  { 
    watch: true,
    target: "web",
    entry: {
      "ComponentsPlay":"./ComponentsPlay.ts",
      "designer/ComponentsPlayDesigner":"./designer/ComponentsPlayDesigner"
         },
    
    output: {
      globalObject: 'self',
      publicPath: '',
      library: {
        name: 'PlayGround',
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