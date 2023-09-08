
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
         //deleteFolder(target.deployPath);


        l(idString + `creating mix`.blue.bold)
        l("entryTSFile :" + target.entryTSFile);
        l("deployPath  :" + target.deployPath);
        const mx = mix.ts(target.entryTSFile, target.deployPath);
       

        // mx.setResourceRoot(target.sourcePath);
        // mx.setPublicPath(target.deployPath);

        l(idString + `mix clean`.blue.bold);
        mx.clean();
        if (target.modulesToExtract) {
            l(idString + `adding extract modules`.blue.bold);
            target.modulesToExtract.forEach(extract => {
                mx.extract(extract.modules, extract.extractedFileName);
            });
        }
        //  mx.extract();
        if (target.bundleAnalyzer === true) {
            l(idString + `adding bundle analyzer`.blue.bold);
            mx.webpackConfig({
                plugins: [
                    new BundleAnalyzerPlugin()
                ]
            });
        }
        l(idString + `copying files to ${target.deployPath}`.blue.bold);
        mx.copy('*.html', target.deployPath);
        mx.copy('*.json', target.deployPath);
        mx.copy('*.css', target.deployPath);



        mx.setPublicPath(target.deployPath);
        // mx.copy(devDist, destinationPath);
        // mx.sourceMaps();
        // mx.copy('*.html', devDist);
        // mx.browserSync({
        //     server: "./dist"
        // });
        // mx.copy(devDist, destinationPath);

        l("------- building".blue.bold)
       

        mx.then(() => {
            l(idString + `mix done....`.blue.bold);
        });
        // // Using async/await




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

