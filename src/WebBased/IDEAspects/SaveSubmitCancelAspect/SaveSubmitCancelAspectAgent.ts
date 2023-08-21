import { IPhasePlan } from "../../../Typings/api/PhasePlan/PhasePlan";
import { IPhaseFeatures } from "../../../Typings/api/PhasePlan/PhaseFeatures";


import { executeGet, executePost, executePut } from "../../Common/api/api";


export interface Data {
    informationBarrier: boolean;
    lastCheckDate: Date;
}

/**
 * Example of using findByQuery API to load work item
 * by it's ID, and enrich with specific parameters
 */
export const getPhasePlan = async function (workTypeSystemName: string) : Promise<IPhasePlan | undefined> {
    return executeGet<any>(`/api/modeller/sharedoTypes/${workTypeSystemName}/phasePlan`) .then(data => {
        
        //log color
        console.log("%c loadWorkItem", "color: #ff0000");
        console.log(data);
        
        if (!data) {
                throw new Error("Not found");
            }
            else {
                return data as IPhasePlan;
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