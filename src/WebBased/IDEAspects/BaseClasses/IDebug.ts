
export interface IDebug {
  supportRequestEnabled?: boolean;
    enabled: boolean;
    logToConsole: boolean;
    showInAspect: boolean;
    liveConfig?: boolean;
  }

  export type ObservableIDebug ={
    [K in keyof IDebug]: ko.Observable<IDebug[K]>;
  }

  export const DEBUG_DEFAULT: IDebug = {
    enabled: false,
    logToConsole: false,
    showInAspect: false
  }