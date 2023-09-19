export type ConfigurationType = {
  workItemIdVariable: string | undefined | null;
  attribute:string;
  outputVariable: string | undefined | null;
  parents: boolean;
  children: boolean;

};

export 
type HttpResultType<T> = {
  success: boolean;
  status: string;
  body: T;
};



export interface ObservableConfig {
  workItemIdVariable: ko.Observable<string | undefined | null>;
  attribute: ko.Observable<string>;
  outputVariable: ko.Observable<string | undefined | null>;
  parents: ko.Observable<boolean>;
  children: ko.Observable<boolean>;
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
  'parent.id': string | undefined;
  reference?: any;
  [key: string]: string | undefined;
}



export interface DefaultConfiguration {
  defaultPriorityId?: any;
  isParticipantsContainer?: boolean;
  viewMode?: number;
  viewOpSystemName?: any;
  createMode?: number;
  createOpSystemName?: any;
}
