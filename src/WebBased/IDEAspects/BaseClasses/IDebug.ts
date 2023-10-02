
export interface IDebug {
  supportRequestEnabled?: boolean;
    enabled: boolean;
    logToConsole: boolean;
    showInAspect: boolean;
    liveConfig: boolean;
  }

  export type ObservableIDebug ={
    [K in keyof IDebug]: ko.Observable<IDebug[K]>;
  }

