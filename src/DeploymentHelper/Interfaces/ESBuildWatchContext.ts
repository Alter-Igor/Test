import * as esbuild from "esbuild";

export interface ESBuildWatchContext extends esbuild.BuildOptions 
  {
    entryPoints: string[];
    outfile: string;
    sourcemap: "inline";
    target: string[];
    logLevel: "debug";
  }