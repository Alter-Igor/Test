

export interface IGraphQueryResonse {
  took: number;
  data: IGraphQueryResonseData;
  trace: any[];
  metrics: IGraphQueryResonseMetrics;
}

export interface IGraphQueryResonseMetrics {
  counts: IGraphQueryResonseCounts;
}

export interface IGraphQueryResonseCounts {
  resolveCalculatedFields: number;
  getSharedo: number;
  getUserTeamIds: number;
  'batchLoad.Aspect.TaskDueDate': number;
  'batchLoad.SharedoAncestors': number;
  getForm: number;
  'batchLoad.Sharedos': number;
  'elasticQuery.ChildKeyDates.alt-ediscovery-expected-delivery-date': number;
}

export interface IGraphQueryResonseData {
  [key: string]: string;
}