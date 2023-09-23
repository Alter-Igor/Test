export type ConfigurationType = {
  workItemIdVariable: string;
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
