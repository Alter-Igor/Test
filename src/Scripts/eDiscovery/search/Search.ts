import { IFormBuilderContext } from "../../../Typings/FormBuilder/IFormBuilderContext";

export async function runMe(context: IFormBuilderContext) {
    let thisModuleName = "altEDiscoverySearchDescription";
    console.log(`%c[${thisModuleName}] - RunMe Executing`, "color: #00aaff", context);
   
    if(context.koContext.$parentContext === undefined) {return;}
     
    let sharedoId = context.workItemContext.id();
    
    // example of gettig data from sharedo
    // let data = await $ajax.get("/api/v1/public/workItem/" + sharedoId);    
    // if(data.aspectData.formBuilder.formData.altEDiscoverySearchDescription === "test") {
    //         console.log("its test");
    // }  
      
    let currentPhaseName = context.workItemContext.phaseName();
    console.log(`%c[${thisModuleName}] - currentPhaseName`, "color: #00aaff", currentPhaseName);

    if(currentPhaseName === undefined) {return;}
    if(currentPhaseName === "Draft") {return;}    

    if(context.form.options.readonly===true) {return;}
    context.form.options.readonly=true;
    context.form.refresh();
      
}


