
/**
 * Interface for the search result when executing API /api/v1/public/workItem/findByQuery
 */
export interface IFindByQueryResult<T> {
    totalCount: number;
    tookMs: number;
    results: Array<IFindByQueryResults<T>>
  }
  
  /**
   * Interface for the search result when executing API /api/v1/public/workItem/findByQuery
   * results
   * Parent: IFindByQueryResult
   */
  export interface IFindByQueryResults<T> {
    score?: any;
    id: string;
    data: T;
  }