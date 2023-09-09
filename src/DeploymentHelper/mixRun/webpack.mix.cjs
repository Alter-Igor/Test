
let path = require('path');
const fs = require('fs');
let mix = require('laravel-mix');
const targets = require('../targets.json');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require('laravel-mix-clean');
const colors = require('colors');

colors.enable();

 run();

 function run() {

    let l = console.log;
    let id = 0;

    for (let i = 0; i < targets.length; i++) {
        
        let target = targets[i];
        id++;
        l(`------------- ${id.toString()} ------------------`.america.bold);

        let idString =  id.toString() + " -  ";

        l(idString + '-'.repeat(100).america.bold);
        l(idString + `Building ${target.name}`.blue.bold)
        l(idString + '-'.repeat(100).america.bold);

        if (target.enabled === false) {
            l(idString + `Skipping ${target.name} enabled is false!`.bgCyan.bold)
            continue;
        }

        if (target.valid === false) {
            l(idString + `Skipping ${target.name} as configuration is not valid!`.red.bold)
            continue;

        }

        let indent = " ".repeat(4);

        if (target.type === "wf-action") {
            l(idString + indent + "Not Implemented Yet - Build Node ".red.bold);
            return;
        }
        l(idString + `Deleting Folder : ${target.deployPath}`.blue.bold)
        // deleteFolder(target.deployPath).finally(() => {


         let dist = "dist/" + target.name; 
        l(idString + `creating mix`.blue.bold)
        l("entryTSFile :" + target.entryTSFile);
        l("deployPath  :" + target.deployPath);
        l("dist  :" + dist);

       
       

        // mix.setResourceRoot(target.sourcePath);
        // mix.setPublicPath(target.deployPath);

        l(idString + `mix clean`.blue.bold);
        // mix.;
        if (target.modulesToExtract) {
            l(idString + `adding extract modules`.blue.bold);
            target.modulesToExtract.forEach(extract => {
                mix.extract(extract.modules, extract.extractedFileName);
            });
        }
         mix.extract();
         mix.autoload
        if (target.bundleAnalyzer === true) {
            l(idString + `adding bundle analyzer`.blue.bold);
            mix.webpackConfig({
                plugins: [
                    new BundleAnalyzerPlugin()
                ]
            });
        }

        mix.override(webpackConfig => {
            webpackConfig.output = {
                globalObject: 'self',
                publicPath: '',
                library: {
                  name: 'Look',
                  type: 'assign-properties',
                  umdNamedDefine: true,
                }
              };
        });
        

        // output: {
        //     globalObject: 'self',
        //     publicPath: '',
        //     library: {
        //       name: 'Aspects',
        //       type: 'assign-properties',
        //       umdNamedDefine: true,
        //     },
        //     path: path.join(__dirname, outputLocation),
        //     filename: "[name].js",
        //   },

        l(idString + `copying files to ${target.deployPath}`.blue.bold);
        // mix.copy(target.sourcePath,dist);
        mix.copy(target.sourcePath + '/*.html',dist);
        mix.copy(target.sourcePath + '/*.json',dist);
        mix.copy(target.sourcePath + '/*.css',dist);
        mix.sourceMaps();
        // mix.browserSync({
        //     server: "./dist"
        // });


        l("------- building".blue.bold)
       
        mix.ts(target.entryTSFile, dist);
        mix.copy(dist,target.deployPath);
        mix.then(() => {
            
            l(idString + `mix done....`.blue.bold);
        });

       

        // // Using async/await


   // })

    }
}


async function deleteFolder(folderPath) {
    try {
        await fs.promises.rmdir(folderPath, { recursive: true });
        console.log(`Folder ${folderPath} has been deleted!`);
    } catch (error) {
        console.error('Error deleting folder:', error);
    }
}

