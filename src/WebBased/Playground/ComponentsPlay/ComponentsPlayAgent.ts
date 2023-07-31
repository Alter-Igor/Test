import { executePost, executePut } from "../../Common/api/api";

export interface WorkItem {
    informationBarrier: boolean;
    lastCheckDate: Date;
}

/**
 * Example of using findByQuery API to load work item
 * by it's ID, and enrich with specific parameters
 */
export const loadWorkItem = async function (id: string) : Promise<any | undefined> {

    var request = {
        // Simple search - get by id
        search:
        {
            workItemIds: [id]
        },

        // Enrich with fields from data composer - use data composer
        // screen in modeller to browse around the data graph and find
        // the fields you might need
        enrich:
            [
             
                { path: "infromationBarrierPathLocation" },
                { path: "infromationBarrierLastCheckPathLocation" }
               
            ]
    }; 
    
    return executePost<any>("/api/v1/public/workItem/findByQuery", request) .then(data => {
        
        //log color
        console.log("%c loadWorkItem", "color: #ff0000");
        console.log(data);
        
        if (!data || data.totalCount < 1 || data.results.length < 1) {
                throw new Error("Not found");
            }
            else {
                return {
                    informationBarrier: data.results[0].data["infromationBarrierPathLocation"],
                    lastCheckDate: data.results[0].data["infromationBarrierLastCheckPathLocation"]

                };
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            return undefined;
        });
    

}

// export const updateWorkItem = async function (id: string, ib:boolean) : Promise<void> {

//     let data = {
//       "workItem": {},
//         "aspectData": {
//           "FormBuilder": {
//             "formData": {
//               "matter-details-ib-last-check": new Date(Date.now()),
//               "matter-details-ib": ib
//             },
//             "formIds": [
//               "81ec0946-d9e8-4181-ad5a-9496e4fdd130"
//             ]
//           }
//         }
//       }

//       executePut<any>(`/api/v1/public/workItem/${id}`, data).then((data) => {
//         console.log("updated",data);
//       }).catch((error) => {
//         console.error('Error:', error);
//     });
    

// }