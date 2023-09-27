import Ajv from 'ajv';
import { createGenerator } from 'ts-json-schema-generator';
import * as fs from 'fs';
import * as path from 'path';
import { JSONSchema7 } from 'json-schema';

function test()
{
  let TSInterfaceFileName = "ExternalMatterSearchInterface.ts"
  let TSInterfaceName = "IExternalMatterSearchConfiguration"
  let repoRoot ="/Users/igorsharedo/Desktop/Test"
  let outputPath = path.join(repoRoot, "src","/WebBased/IDEAspects/ExternalMatterSearch")
  let inputPath = path.join(repoRoot, "src","/WebBased/IDEAspects/ExternalMatterSearch")
  generateInterface(TSInterfaceFileName,TSInterfaceName,repoRoot,outputPath,inputPath)
}

export function generateInterface(TSInterfaceFileName:string,TSInterfaceName: string, solutionRoot:string, outputPath:string, inputPath:string)
{
  const config = {
    path: path.join(inputPath,TSInterfaceFileName),
    tsconfig: path.join(solutionRoot, "tsconfig.json"),
    type: TSInterfaceName
  };
  let schema = createGenerator(config).createSchema(TSInterfaceName)
  let outputFilePath = path.join(outputPath,TSInterfaceName+".json")
  fs.writeFileSync(outputFilePath, JSON.stringify(schema, null, 2));
}

export function validate(data: any,schema:JSONSchema7) {
  const ajv = new Ajv();
  const validateFn = ajv.compile(schema);
  return validateFn(data);
};
