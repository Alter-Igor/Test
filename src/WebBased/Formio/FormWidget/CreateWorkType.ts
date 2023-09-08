
import { safeEval } from '../../Common/SafeEval';
import { executePost, getBearerToken } from '../../Common/api/api';
import * as DataContext from '../Common/SetDataContext';
export async function createWorkType(workItem: string, aspectData: string, keyDates: string, participants: string, formBuilder: any) {

    console.log("createWorkType", workItem, aspectData, keyDates, participants, formBuilder);

    let request: any = {};


    let cleanFormBuilderData = cleanFormBuilder(formBuilder.FormBuilder.formData);


    DataContext.setDataContext();

    let context = {
        formBuilder: formBuilder.FormBuilder.formData,
        dataContext: DataContext,
    };

    if (workItem) {
        // request["workItem"] = JSON.parse(workItem);
        request["workItem"] = processFunctions(JSON.parse(workItem), context);
    }

    if (aspectData) {
        request["aspectData"] = processFunctions(JSON.parse(aspectData), context);
    }

    if (keyDates) {
        request["keyDates"] = processFunctions(JSON.parse(keyDates), context);
    }

    if (participants) {
        request["participants"] = processFunctions(JSON.parse(participants), context);
    }

    request.aspectData = request.aspectData || {};
    if (cleanFormBuilderData) {

        request.aspectData.FormBuilder = request.aspectData.FormBuilder || {};
        request.aspectData.FormBuilder.formData = request.aspectData.FormBuilder.formData || {};
        request.aspectData.FormBuilder.formData = cleanFormBuilderData;
    }

    // Use fetch API instead of $ajax for a more modern approach. 
    // This example assumes a JSON response and POST request type. 
    // Adjust as necessary. 



    // Assuming you've acquired the token from somewhere, e.g., from local storage
    const bearerToken = getBearerToken(); // This is just an example, modify as per your logic

    const urlOrigin = window.location.origin; // Gets the origin, e.g., 'https://example.com'
    $ui.startWaitingFor("step1", "Create instruction");

    ///api/v1/public/workItem/
    let result: any
    try {

        result = await executePost(`${urlOrigin}/api/v1/public/workItem/`, request);
    }
    catch (error: any) {
        console.error("There was a problem with the fetch operation:", error.message);
    }
    finally {
        $ui.stopWaitingFor("step1");
    }


    // let result = await fetch(`${urlOrigin}/api/v1/public/workItem/`, {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${bearerToken}`
    //     },
    //     body: JSON.stringify(request)
    // })
    //     .then(response => {
    //         $ui.stopWaitingFor("step1");
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         return data.workItem;
    //     })
    //     .catch(error => {
    //         console.error("There was a problem with the fetch operation:", error.message);
    //     });

    console.log("result", result);

};


function processFunctions(obj: any, context: { formBuilder: any; dataContext: typeof DataContext; }): any {
    if (typeof obj === "string") {
        if (obj.startsWith("func:")) {
            let func = obj.replace("func:", "");
            return safeEval(func, context);
        } else {
            return obj;
        }
    } else if (typeof obj === "object" && obj !== null) { // added a check for null
        let result: any = Array.isArray(obj) ? [] : {}; // Initialize result as an array or object based on the input
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result[key] = processFunctions(obj[key], context);
            }
        }
        return result;
    }
    return obj;  // default return, for numbers, undefined, etc.
}

function cleanFormBuilder(formBuilder: any): any {

    //make sure all the values are strings
    let result: any = {};
    for (const key in formBuilder) {
        if (Object.prototype.hasOwnProperty.call(formBuilder, key)) {
            let newValue= JSON.stringify(formBuilder[key]);
            //remove outter ' and " from the string
            result[key] = newValue.substring(1, newValue.length - 1);
        }
    }

    return result;

}