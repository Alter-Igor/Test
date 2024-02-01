
import { IGraphQuery } from "../../../../Interfaces/api/graph/IGraphQuery";
import { IGraphQueryResonse } from "../../../../Interfaces/api/graph/IGraphQueryResponse";
import { executePost, executePostv2 } from "../api";



export function executeFindByGraph(inputOption: IGraphQuery)
{
    return executePostv2<IGraphQueryResonse>("/api/graph/workitem/query", inputOption)
}
