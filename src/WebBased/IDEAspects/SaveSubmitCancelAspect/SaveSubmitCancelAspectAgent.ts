import { IPhaseFeatures } from "../../../Interfaces/api/PhasePlan/PhaseFeatures";
import { IPhasePlan } from "../../../Interfaces/api/PhasePlan/PhasePlan";
import { executeGet, executePut } from "../../Common/api/api";


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

export const getFeatureFlag = async function (phasePlanName: string, phaseName: string) : Promise<IPhaseFeatures[] | undefined> {
    console.log("API - getFeatureFlag featureSystemName",phasePlanName);
    ///api/featureframework/flags/subFeatures/ud-pre-instruction/ud-pre-instruction-plan-drafting
    return executeGet<IPhaseFeatures[]>(`/api/featureframework/flags/subFeatures/${phasePlanName}/${phaseName}`) .then(data => {
        
        //log color
        console.log("%c IPhaseFeatures", "color: #ff0000");
        console.log(data);
        
        if (!data) {
                throw new Error("Not found");
            }
            else {
                return data as IPhaseFeatures[];
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            return undefined;
        });
}

export const saveAspect = async function (id: string, data:any) : Promise<void> {
      executePut<any>(`/api/v1/public/workItem/${id}`, data).then((data) => {
        console.log("updated",data);
      }).catch((error) => {
        console.error('Error:', error);
    });
}