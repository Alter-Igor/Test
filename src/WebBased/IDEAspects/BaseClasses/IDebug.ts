
export interface IDebug {
    enabled: boolean;
    logToConsole: boolean;
    showInAspect: boolean;
  }


  export const DEBUG_DEFAULT: IDebug = {
    enabled: false,
    logToConsole: false,
    showInAspect: false
  }