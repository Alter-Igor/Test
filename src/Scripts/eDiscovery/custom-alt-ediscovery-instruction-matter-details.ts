import { IFormBuilderContext } from "../../Typings/FormBuilder/IFormBuilderContext";

//This function is called from the module-loader webcomponent in the form builder
export async function runMe(context: IFormBuilderContext) {
    let matterDetails = context.alpacaForm.childrenByPropertyId["matter-details"];
    let expertMatterNumber = context.alpacaForm.childrenByPropertyId["expert-matter-number"];
    let pipelineMatter = context.alpacaForm.childrenByPropertyId["pipeline-matter"];
    hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);

    //add a change event to the expert-matter-number
    context.alpacaForm.childrenByPropertyId["expert-matter-number"].on("change", function(this:any,ev:any) {
        hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter); 
    });  
}

function hideShowMatterDetails(matterDetails: any, expertMatterNumber: any, pipelineMatter: any) {
    if(expertMatterNumber.getValue() === "" || pipelineMatter.getValue()==true) {
        matterDetails.options.hidden = true;
        matterDetails.refresh();
    } else {
        matterDetails.options.hidden = false;
        matterDetails.refresh();
    }
}


