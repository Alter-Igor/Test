import { Configuration } from 'webpack';
import webpack from 'webpack';
import targetsJson from './targets.json' assert { type: "json" };;
import * as path from 'path';
import { l } from './src/DeploymentHelper/Log.mjs';
import CopyPlugin from 'copy-webpack-plugin';
import { runBuild } from './src/DeploymentHelper/BuildMIXTargetFile.mjs';
import { exec } from 'child_process';
import { IFinalTargetSettings } from './src/DeploymentHelper/Interfaces/IFinalTargetSettings';




// type Target  = IFinalTargetSettings 
// {
//   name: string;
//   enabled?: boolean;
//   valid?: boolean;
//   type?: string;
//   designerPath?: string;
//   sourcePath: string;
//   deployPath: string;
//   entryTSFile: string;
//   namespace?: string;
// }

const Default_Config: Configuration = {
   watch: true,
  target: "web",
  output: {
    globalObject: 'self',
    publicPath: '',
    library: {
      name: 'Aspects',
      type: 'assign-properties',
      umdNamedDefine: true,
    },
    path: "#outputPath",
    filename: "[name].js",
  },
  mode: 'development',
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
    extensions: ['.tsx', '.ts', '.js'],
  },
  node: {
    __dirname: false,
  },
  externals: {
    jquery: 'jQuery',
    knockout: 'ko',
    moment: 'moment',
  },
};



function getStepLogger(id: number): () => string {
  let stepNo = 0;
  let idString = id.toString().padEnd(4, "0").random.bold;
  return () => `${idString}Step ${++stepNo} - `;
}



function configureWebpackConfiguration(target: IFinalTargetSettings, step: () => string): Configuration {
    
  l("target.namespace",target.namespace)
  let config: Configuration = {
      watch: true,
     target: "web",
     output: {
       globalObject: 'self',
       publicPath: '',
       library: {
         name: target.namespace,
         type: 'assign-properties',
         umdNamedDefine: true,
       },
       path: target.deployPath,
       filename: "[name].js",
     },
     mode: 'development',
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
       extensions: ['.tsx', '.ts', '.js'],
     },
     node: {
       __dirname: false,
     },
     externals: {
       jquery: 'jQuery',
       knockout: 'ko',
       moment: 'moment',
       Sharedo: 'Sharedo',
     },
   };
  

  l(step() + `Configuring Webpack for `.black.bold + `${target.name}`.magenta.bold)
  l(step() + `Setting webpack context to : `.black.bold + `${target.sourcePath}`.green)
  l(step() + `Setting webpack entry for  : `.black.bold + `${target.entryTSFile}`.green.bold)

    if(!config || !config.output)
  {
    throw new Error("config is null");
  }
  config.output.path = target.deployPath;
  config.output.publicPath = target.deployPath;
  config.output.filename = "[name].js";
  
  // let lib : webpack.LibraryOptions = {
  //   type: 'assign-properties'
  // };


  l(step() + `Adding Copy Plugin`.bgGreen.bold);
  let copyPlugin =
  new CopyPlugin({
    patterns: [
      {
        from: "**/*.json",
        context: target.sourcePath,
        to: path.resolve(target.deployPath),
      },
      {
        from: "**/*.css",
        context: target.sourcePath,
        to: path.resolve(target.deployPath),
      },
      {
        from: "**/*.html",
        context: target.sourcePath,
        to: path.resolve(target.deployPath),
      },
    ],
  });

  config.plugins = [copyPlugin];
  
  config.entry = {
    [target.name]: target.entryTSFile
  };

  if (target.designerPath?.length) {
    const designerName = `Designer/${target.name}Designer`;
    const designerTsFile = `${target.designerPath}/${target.name}Designer.ts`;
    l(step() + `Designer Found             : `.black.bold + `${designerTsFile}`.blue.bold)
    config.entry[designerName] = designerTsFile;
  }

  return config;
}

let targets: IFinalTargetSettings[] = targetsJson as IFinalTargetSettings[];
// console.log(targets);

async function run() {

  console.clear();
  l("Starting Build Process".blue.underline.bold)
l("+".repeat(2000).america.bold)
l(`Running - at ${new Date(Date.now()).toLocaleString()}`.america.bold)
l("+".repeat(450).america.bold)


  await runBuild();
  
  let webpackConfigs: Configuration[] = [];

  targets.forEach((target, idx) => {

    l('-'.repeat(100).bgBlue.bold)
    l(`Processing  ${target.name}`)
    l('-'.repeat(100).bgBlue.bold)

    const step = getStepLogger(idx);

    if (!target.enabled) {
      console.log(step() + `-----> Skipping ${target.name} enabled is false!`.bgCyan.bold);
      return;
    }

    if (!target.valid) {
      console.log(step() + `------> Skipping ${target.name} as configuration is not valid!`.red.bold);
      return;
    }

    if (target.type === "wf-action") {
      console.log(step() + "Not Implemented Yet - Build Node".red.bold);
      return;
    }

    l(step() + `Building Config File ${target.name}`.green.bold)
    l(' '.repeat(10) + `  -  from: `.blue.bold + `${target.sourcePath}`.gray)
    l(' '.repeat(10) + `  -  to: `.green.bold + `${target.deployPath}`.grey)

    l(step() + `Creating Configuration ${target.name}`.bgGreen.bold);
    let configItem = configureWebpackConfiguration(target, step);
    l(step() + `Configuration ${target.name} created`.bgGreen.bold);
    webpackConfigs.push(configItem);
  });

  ("- - ".repeat(1000).blue.underline.bold)
  l("Starting Webpack".blue.underline.bold)

  // l(JSON.stringify(webpackConfigs, null, 2))

  webpack(webpackConfigs, (err, stats) => {
    if (err || stats?.hasErrors()) {
      console.error('There was an error:', err || stats?.toJson().errors);
      console.log(JSON.stringify(webpackConfigs, null, 2));
      return;
    }
    stats?.stats.forEach((stat) => {
      console.log(stat.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        entrypoints: false,
      }));
    });
    const step = getStepLogger(targets.length); // Using the next id after all targets for final logs
    console.log(`Webpack completed successfully!`.bgGreen.bold);
  });
}

run();
