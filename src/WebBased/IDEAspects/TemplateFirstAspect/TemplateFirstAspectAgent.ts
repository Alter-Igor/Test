import { executePost, executePut } from "../../Common/api/api";
import { ITemplatesListViewResult } from "./ITemplates";


export interface Data {
    informationBarrier: boolean;
    lastCheckDate: Date;
}

/**
 * Example of using findByQuery API to load work item
 * by it's ID, and enrich with specific parameters
 */
export const getTemplates = async function (workTypeSystemName: string) : Promise<ITemplatesListViewResult | undefined> {
    return executePost<any>(`https://demo-aus.sharedo.tech/api/listview/core-admin-document-templates-documents/2000/1/title/asc/`,{}) .then(data => {
        
        //log color
        console.log("%c document-templates-documents", "color: #ff0000");
        console.log(data);
        
        if (!data) {
                throw new Error("Not found");
            }
            else {
                return data as ITemplatesListViewResult;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            return undefined;
        });
}
//https://morae-vnext.sharedo.tech/api/featureframework/flags/subFeatures/ud-pre-instruction/ud-pre-instruction-plan-drafting
// export const getFeatureFlag = async function (featureSystemName: string) : Promise<IPhaseFeatures> {
//     return executeGet<IPhaseFeatures>(`/api/featureframework/flags/subFeatures/${featureSystemName}`) .then(data => {
        
//         //log color
//         console.log("%c loadWorkItem", "color: #ff0000");
//         console.log(data);
        
//         if (!data) {
//                 throw new Error("Not found");
//             }
//             else {
//                 return data as IPhaseFeatures;
//             }
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             return false;
//         });
// }

export const saveAspect = async function (id: string, data:any) : Promise<void> {
      executePut<any>(`/api/v1/public/workItem/${id}`, data).then((data) => {
        console.log("updated",data);
      }).catch((error) => {
        console.error('Error:', error);
    });
}