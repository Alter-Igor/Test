export type ConfigurationType = {
  workItemIdVariable: string;
  phaseSystemName: string | null;
  jumpToPhase?: boolean;
  description?: string;
  dynamic: boolean;
  reasonType?: any;
  suppressEvents?: boolean;
  suppressChecksAndGuards?: boolean;
  reasonText?: string;
  expectedTypeSystemName: string | null;
  phaseFeature: string | null;
};

export 
type HttpResultType<T> = {
  success: boolean;
  status: string;
  body: T;
};



export interface ObservableConfig {
  workItemIdVariable: ko.Observable<string>;
  expectedTypeSystemName: ko.Observable<string | null>;
  phaseSystemName: ko.Observable<string | null>;
  reasonText: ko.Observable<string | undefined>;
  jumpToPhase: ko.Observable<boolean | undefined>;
  reasonType: ko.Observable<any>;
  description: ko.Observable<string>;
  suppressChecksAndGuards: ko.Observable<boolean>;
  suppressEvents: ko.Observable<boolean>;
  dynamic: ko.Observable<boolean>;
  phaseFeature: ko.Observable<any>;
}


export interface IMatterSearchResult {
  totalCount: number;
  tookMs: number;
  results: IResult[];
}

export interface IResult {
  score?: any;
  id: string;
  data: IData;
}

export interface IData {
  title: string;
  'type.systemName': string;
  'phase.systemName': string;
  reference?: any;
}



export interface DefaultConfiguration {
  defaultPriorityId?: any;
  isParticipantsContainer?: boolean;
  viewMode?: number;
  viewOpSystemName?: any;
  createMode?: number;
  createOpSystemName?: any;
}
