import * as esbuild from 'esbuild';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function compileTypeScriptToJavaScript(filePath: string) {
    

  const outFilePath = path.join(__dirname, '/builds/outTemp.js');  // Specify output file path

  try {
      const result = await esbuild.build({
        entryPoints: [filePath],
        bundle: true,
        write: true,
        platform: 'node',
        outfile: outFilePath,
      });
  
      return outFilePath;

      
    } catch (err) {
      console.error('esbuild failed:', err);
    }
  }


  
    
      // Extract JavaScript code as string
      // if (result.outputFiles && result.outputFiles[0]) {

      //   return result.outputFiles[0].text;

        // //const jsCode = String.fromCharCode.apply(null, new Uint16Array(result.outputFiles[0].contents));
        // const jsCode = String.fromCharCode.apply(null, Array.from(new Uint16Array(result.outputFiles[0].contents)));

        // // const jsCode = String.fromCharCode.apply(null, new Uint16Array(result.outputFiles[0].contents));
        // console.log('Generated JavaScript:', jsCode);
        // return jsCode;
        // Do something with the generated JavaScript code...


        