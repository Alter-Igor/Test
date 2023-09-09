// import webpack from 'webpack';
// import path from 'path';
// import CopyPlugin from 'copy-webpack-plugin';
// import targets from "../DeploymentHelper/targets.json" assert { type: "json" };

const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const targets = require("../DeploymentHelper/targets.json");


const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
const colors = require('colors');
// import colors from 'colors';

let l = console.log;

targets.forEach((target) => {
  console.log(target);
  console.log(target.name);
});

function run() {
  let id = 0;
  for (let i = 0; i < targets.length; i++) {

    let stepNo = 0;
    let target = targets[i];
    id++;
    let idString = id.toString() + " -  ";
    idString = idString.padEnd(4, "0").random.bold;

    // l('-'.repeat(100).america.bold);
    l(' '.repeat(40).bgBlack + `${idString} - ${target.name}`.america.bgBlack + ' '.repeat(40).bgBlack);
    // l('-'.repeat(100).america.bold);

    //Setp Incrementer
    step = () =>{return idString + "Step " + (++stepNo).toString() + " - "; }

    if (target.enabled === false) {
      l(step() + `-----> Skipping ${target.name} enabled is false!`.bgCyan.bold)
      continue;
    }

    if (target.valid === false) {
      l(step() + `------> Skipping ${target.name} as configuration is not valid!`.red.bold)
      continue;

    }

    let indent = " ".repeat(4);

    if (target.type === "wf-action") {
      l(step() + indent + "Not Implemented Yet - Build Node ".red.bold);
      return;
    }

    l(step() + `Deleting Folder : ${target.deployPath}`.brightRed.bold)
    // deleteFolder(target.deployPath).finally(() => {

    deployTarget(target,step);
  }




  function deployTarget(target,step) {

    let outputLocation = target.deployPath;
    let sourceLocation = target.sourcePath;


    l(step() + `Deploying ${target.name}`.green.bold)
    l(' '.repeat(10) + `  -  from: `.blue.bold + `${sourceLocation}`.gray)
    l(' '.repeat(10) + `  -  to: `.green.bold + `${outputLocation}`.grey)
    

    let config = configureWebpackConfiguration(outputLocation, sourceLocation, target,step);

    l(step() + `Running webpack`.bgGreen.bold)
    webpack(config, (err, stats) => {
      if (err || stats?.hasErrors()) {
        console.error('There was an error:', err || stats?.toJson().errors);
        console.log(config);
        return;
      }
      l(step() + `Webpack completed successfully!`.bgGreen.bold)
    });
  }
}

run();

function configureWebpackConfiguration(outputLocation, sourceLocation, target,step) {

  l(step() + `Configuring Webpack for `.black.bold + `${target.name}`.magenta.bold)

  let config = [
    {
       watch: true,
      target: "web",
      // entry: {
      //   "OdsPicker": "/Users/igorsharedo/Desktop/Test/src/WebBased/IDEAspects/OdsPicker/OdsPicker.ts",
      //   // "designer/OdsPickerDesigner": "./designer/widget.ts"
      // },
      output: {
        globalObject: 'self',
        publicPath: '',
        library: {
          name: 'Aspects',
          type: 'assign-properties',
          umdNamedDefine: true,
        },
        path: outputLocation,
        filename: "[name].js",
      },
      mode: 'development',
      devtool: 'inline-source-map',
      plugins: [
        // new BundleAnalyzerPlugin(),
        new CopyPlugin({
          patterns: [
            {
              from: "**/*.json",
              context: sourceLocation,
              to: path.resolve(outputLocation),
            },
            {
              from: "**/*.css",
              context: sourceLocation,
              to: path.resolve(outputLocation),
            },
            {
              from: "**/*.html",
              context: sourceLocation,
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
        extensions: ['.tsx', '.ts', '.js'],
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

  l(step() + `Setting webpack context to : `.black.bold + `${target.sourcePath}`.green)
  config[0].context = target.sourcePath;

  l(step() + `Setting webpack entry for  : `.black.bold + `${target.entryTSFile}`.green.bold)
  config[0].entry = {};
  config[0].entry[target.name] = target.entryTSFile;

  

  

  if (target.designerPath.length) {
    let designerName = "designer" + target.name + "Designer"; //TODO: move this to target file generator
    let designerTsFile = target.designerPath + "/" + target.name + "Designer" + ".ts";//TODO: move this to target file generator
    l(step() + `Designer Found             : `.black.bold + `${designerTsFile}`.blue.bold)
    config[0].entry[designerName] = designerTsFile;
  }

  // l(`Webpack Entry Configuration is:`.black.bold)
  // l(config[0].entry);

  return config;
}
