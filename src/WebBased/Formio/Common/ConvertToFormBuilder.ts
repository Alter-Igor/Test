
// formData: {


import { IFormIOSubmitData } from "./IFormIOData";

                
// }


export function convertFormIO_To_FormBuilder(form:IFormIOSubmitData, aspectData: any)
{
    
    if(aspectData === undefined)
    {
        aspectData = {};
    }

    aspectData.FormBuilder = aspectData.FormBuilder || {};
    aspectData.FormBuilder.formData = aspectData.FormBuilder.formData || {};


    aspectData.FormBuilder.formData = form.data;
    aspectData.FormBuilder.formData.metadata = form.metadata;

    return aspectData;
}