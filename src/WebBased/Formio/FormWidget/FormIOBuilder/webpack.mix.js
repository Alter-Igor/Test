
let path = require('path');
const fs = require('fs');
let mix = require('laravel-mix');
// const config = require('/Users/igorsharedo/Desktop/Test/src/BuildConfigurations.json');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require('laravel-mix-clean');



let deploymentPath = "/FormWidget/FormIOBuilder";

//combine the path to the IDE with the path to the widget
let destinationPath = "/Users/igorsharedo/Desktop/Test/_IDE/Widgets/FormWidget/FormIOBuilder";

console.log('destinationPath', destinationPath);


let devDist = 'dist';


deleteFolder(destinationPath);

let mx = mix.ts('app.ts', 'dist');
mx.clean();
mx.extract(['lodash'], 'lodash.js');
mx.extract(['jquery', 'axios'], 'utils.js');
mx.extract(['ace', 'axios'], 'ace.js');
mx.extract();
mx.webpackConfig({
    plugins: [
        new BundleAnalyzerPlugin()
    ]
});
mx.copy('*.html', devDist);
mx.setPublicPath('dist')
mx.copy(devDist, destinationPath);
mx.sourceMaps();
mx.copy('*.html', devDist);
mx.browserSync({
    server: "./dist"
});
mx.copy(devDist, destinationPath);




// Using async/await
async function deleteFolder(folderPath) {
    try {
        await fs.promises.rmdir(folderPath, { recursive: true });
        console.log(`Folder ${folderPath} has been deleted!`);
    } catch (error) {
        console.error('Error deleting folder:', error);
    }
}
