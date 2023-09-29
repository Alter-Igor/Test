import { Configuration } from 'webpack';
import webpack from 'webpack';
// import targetsJson from './targets.json' assert { type: "json" };;
import * as path from 'path';
import { clearSec, err, imp, l, lh, lh1, lh3, runTest, suc, wrn } from './src/DeploymentHelper/Log.mjs';
import CopyPlugin from 'copy-webpack-plugin';
import { runBuild } from './src/DeploymentHelper/BuildMIXTargetFile.mjs';
import { IFinalTargetSettings } from './src/DeploymentHelper/Interfaces/IFinalTargetSettings';
import BuildConfigurationJSON from "./BuildConfigurations.json"  assert { type: "json" };
import { IBuildConfiguration } from './src/DeploymentHelper/Interfaces/IBuildConfiguration';
import * as esbuild from 'esbuild'
import Color from 'color';
import { copy } from 'esbuild-plugin-copy';
import fs from 'fs';
//copy
// esbuild-copy-static-files
runTest();

lh("Starting Build Process")
clearSec();

//Load up the build configuration JSON as types so we can use it in the code and ensure it is valid
let BuildConfiguration = BuildConfigurationJSON as IBuildConfiguration


//webpack configuration array
let webpackConfigs: Configuration[] = [];
//esbuild watch context array
let esBuildWatchContextArray = new Array<Promise<esbuild.BuildContext<ESBuildWatchContext>>>();




async function run() 
{

  console.clear();
  l("Starting Build Process".blue.underline.bold)
  l("+".repeat(2000).america.bold)
  l(`Running - at ${new Date(Date.now()).toLocaleString()}`.america.bold)
  l("+".repeat(450).america.bold)


  let targets = await runBuild(BuildConfiguration);
  if (!targets) {
    l("No targets found in config".red.bold);
    return undefined;
  }



  let targetSummary = new Array<{target:IFinalTargetSettings,result:boolean,errors:string[]}>();

  // targets.forEach((target, idx) => {
  for (let idx = 0; idx < targets.length; idx++) //No foreach as we need to await the build
  {
    
    const target = targets[idx];
    let newTargetSummary = {target:target,result:false,errors: target.erros};
    targetSummary.push(newTargetSummary);


    // try
    // {
      // l('-'.repeat(100).bgBlue.bold)
      let sec = lh1(`Processing  ${target.name}`)
      // l('-'.repeat(100).bgBlue.bold)

      const step = getStepLogger(idx);

      if (!target.enabled) {
        sec.l(step() + `-----> Skipping ${target.name} enabled is false!`.bgCyan.bold);
        continue;
      }

      if (!target.valid) {
        sec.l(step() + `------> Skipping ${target.name} as configuration is not valid!`.red.bold);
        continue;
      }



      sec.l(step() + `Building Config File ${target.name}`.green.bold)
      sec.l(' '.repeat(10) + `  -  from: `.blue.bold + `${target.sourcePath}`.gray)
      sec.l(' '.repeat(10) + `  -  to: `.green.bold + `${target.deployPath}`.grey)

      sec.l(step() + `Creating Configuration ${target.name}`.bgGreen.bold);
      let configItem = configureWebpackConfiguration(target, step);
      sec.l(step() + `Configuration ${target.name} created`.bgGreen.bold);
      webpackConfigs.push(configItem);


      if (target.factoryTSFileName && target.factoryTSFileName.length > 0) {
        esBuildWatchContextArray.push(createEsBuildWatchContext(target, target.factoryTSFilePath, target.name + "-factory.js"))
        esBuildWatchContextArray.push(createEsBuildWatchContext(target, target.templateTsFilePath, target.name + "-template.js"));
      }
  // }
  // catch(ex)
  // {
  //   newTargetSummary.errors.push(ex);
  //   newTargetSummary.result = false;
  // }


    newTargetSummary.result = true;
  };



  l(`targetSummary ${targetSummary.length}`);

  clearSec();
  lh("Summary")

  for(let i = 0; i < targetSummary.length; i++)
  {
    const target = targetSummary[i];
    if (target.result) {
      l(suc(`Target ${target.target.name} built successfully`));
    }
    else {
      l(wrn(`Target ${target.target.name} failed to build`));

      for(let i = 0; i < target.errors.length; i++)
      {
        l(`      -> ` + err(target.errors[i]));
      }
  };
  }

  let validTargets = targets.filter((target) => target.valid===true);
  validTargets.forEach((target) => {
    lh3(`Target ${target.name} is valid - Building Manifest File`);
    
    //write the manifest file to the deploy path
    let manifestFilePath = path.resolve(target.deployPath,`${target.name}.${target.manifestInfo.type}.json`);
    let manifestFileContents = JSON.stringify(target.manifestInfo.manifest, null, 2);

    
    l(manifestFilePath);
    l("Writing manifest file");
    fs.writeFileSync(manifestFilePath, manifestFileContents);

    
  });
  
  ("- - ".repeat(1000).blue.underline.bold)
  l("Starting esBuild for wf-templates and wf-factory ".blue.underline.bold)
  esBuildWatchContextArray.forEach(async (esBuildWatchContext) => {
    let context = await esBuildWatchContext;
    context.watch(() => {
      l("esbuild watch triggered".bgMagenta.green.bold)
    });
  });

  ("- - ".repeat(1000).blue.underline.bold)
  l("Starting Webpack".blue.underline.bold)
  webpack(webpackConfigs, (err, stats) => {
    console.log("Webpack completed")
    if (err || stats?.hasErrors()) {
      console.error('There was an error:', err || stats?.toJson().errors);
      // console.log(JSON.stringify(webpackConfigs, null, 2));
      return;
    }
    stats?.stats.forEach((stat) => {
      console.log(stat.toString({
        colors: true,
        modules: false,
        children: false, 
        chunks: true,
        chunkModules: false,
        entrypoints: true,
      }));
    });

    const step = getStepLogger(targets!.length); // Using the next id after all targets for final logs
    console.log(`Webpack completed successfully!`.bgGreen.bold);
  });



}

await run();



interface ESBuildWatchContext extends esbuild.BuildOptions 
  {
    entryPoints: string[];
    outfile: string;
    sourcemap: "inline";
    target: string[];
    logLevel: "debug";
  }


/**
 * Create a watch context for esbuild to watch a file and rebuild it
 * @param target 
 * @param entryPoint 
 * @param outfileName 
 * @returns 
 */
async function createEsBuildWatchContext(target: IFinalTargetSettings, entryPoint: string, outfileName: string): Promise<esbuild.BuildContext<ESBuildWatchContext>> {
  return esbuild.context<ESBuildWatchContext>({
    entryPoints: [entryPoint],
    outfile: target.deployPath + "/" + outfileName,
    sourcemap: "inline",
     bundle: true,
     format: "cjs",
    target: ["chrome58", "firefox57", "safari11", "edge16"],
    logLevel: "debug",
   plugins:  [copy({
    resolveFrom: 'cwd',
    assets: {
      from: [target.sourcePath + "/**/*.json", target.sourcePath + "/**/*.css", target.sourcePath + "/**/*.html"],
      to: [target.deployPath],
      watch: true,
    },
    watch: true,
  })]
});
}


function getStepLogger(id: number): () => string {
  let stepNo = 0;

  let c = Color("blue");
c.apple
  let idString = id.toString().padStart(4, "0").blue.bold;
  return () => `${idString} - Step ${++stepNo} - `;
}


function configureWebpackConfiguration(target: IFinalTargetSettings, step: () => string): Configuration {
  l("target.namespace", target.namespace)
  let config: Configuration = {
    experiments: {
      // outputModule: true,
    },

    watch: true,
    target: "web",
    output: {
      globalObject: 'self',
      publicPath: '/',
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
  l(step() + `Setting webpack entry for  : `.black.bold + `${target.widgetTSFileName}`.green.bold)

  if (!config || !config.output) {
    throw new Error("config is null");
  }
  config.output.path = target.deployPath;
  // config.output.publicPath = target.deployPath; //! this caused issue with loading chunks - should be /
  ///_ideFiles/IDEAspects/DatePickerAspect/vendors-node_modules_popperjs_core_lib_index_js.js
  config.output.publicPath = target.publicPath;
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



  if (target.type === "wf-action") {
    config.entry = {
      //Workflow Entries are handled by esBuild
      // [target.name + "-template"]: target.templateTsFilePath,
      // [target.name + "-factory"]: target.factoryTSFilePath, //we do this later with esBuild
    };
  }
  else {
    config.entry = {
      [target.name]: target.tsFileInfo.tsFilePath!,

    };
  }

  if (target.designerPath?.length) {
    const designerName = `Designer/${target.name}Designer`;
    const designerTsFile = `${target.designerPath}/${target.name}Designer.ts`;
    l(step() + `Designer Found             : `.black.bold + `${designerTsFile}`.blue.bold)
    config.entry[designerName] = designerTsFile;
  }

  return config;
}



// class AppendReturnPlugin {
//   apply(compiler: any) {
//     compiler.hooks.emit.tapAsync('AppendReturnPlugin', (compilation: any, callback: any) => {
//       for (const filename in compilation.assets) {
//         if (filename.includes("-factorys")) {
//           const source = compilation.assets[filename].source();
//           compilation.assets[filename] = {

//             source: () => {
//               let retValue = `(function()
//               { 
//                 ${source}\n
                
//                   return {
//                     createModel: createModel,
//                     getModel: getModel,
//                     dispose: dispose
//                 };
//               })()`

//               return retValue;
//             },
//             size: () => Buffer.from(`${source}\nreturn Factory;`).length,
//           };
//         }
//       }
//       callback();
//     });
//   }
// }