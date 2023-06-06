const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
  { watch: true,
    entry: {
        "_IDE/ModuleLoader/ModuleLoader":"./src/WebBased/ModuleLoader/ModuleLoader.ts",
        "_IDE/Scripts/eDiscovery/FB_MatterDetails/FormBuilderHelper":"./src/WebBased/Scripts/eDiscovery/FB_MatterDetails/FormBuilderHelper.ts",
        "_IDE/Scripts/eDiscovery/FB_JobSearch/FormBuilderHelper":"./src/WebBased/Scripts/eDiscovery/FB_JobSearch/FormBuilderHelper.ts",
    },
    output: {
      path: path.join(__dirname, "."),
      filename: "[name].js",
    },
    mode: 'development',
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "**/*.json",
            context: path.resolve(__dirname, "src","WebBased"),
            to: path.resolve(__dirname, "_IDE"),
          },
          {
            from: "**/*.html",
            context: path.resolve(__dirname,"src","WebBased"),
            to: path.resolve(__dirname, "_IDE"),
          },
          {
            from: "**/*.css",
            context: path.resolve(__dirname,"src","WebBased"),
            to: path.resolve(__dirname, "_IDE"),
          },
          {
            from: "**/*.js",
            context: path.resolve(__dirname, "src"),
            to: path.resolve(__dirname, "_IDE"),
          },

        ],
      }),
    ],
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