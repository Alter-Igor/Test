
import { IODSSearchPostBody } from "../../../../Interfaces/api/ods/_search";
import { IODSearchResult } from "../../../../Interfaces/OdsList/IODSSearchResult";
import { executePost } from "../api";


export async function _search<T>(postBody:IODSSearchPostBody) : Promise<IODSearchResult<T> | undefined>
{
    try
    {
        let api = "/api/ods/_search";
        return await executePost<IODSearchResult<T>>(window.document.location.origin + api, postBody);
    }
    catch (e)
    {
        console.warn("ODS Search Error", e,postBody);
    }
    return undefined;
}

