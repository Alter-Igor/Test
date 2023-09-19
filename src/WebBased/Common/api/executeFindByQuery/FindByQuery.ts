import { executePost } from "../api";
import { IFindByQueryOptions } from "./IFindByQueryInput";
import { IFindByQueryResult } from "./IFindByQueryResult";


export function executeFindByQuery<T>(inputOption: IFindByQueryOptions): Promise<IFindByQueryResult<T>>
{
    return executePost<IFindByQueryResult<T>>("/api/v1/public/workItem/findByQuery", inputOption).then((result) => {
        return result;
    });
}