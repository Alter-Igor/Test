const path = require("path");

module.exports = [
  { watch: true,
    entry: {
        "ModuleLoader":"./src/ModuleLoader/ModuleLoader.ts"
    },
    output: {
      path: path.join(__dirname, "_IDE/ModuleLoader"),
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