import { FormBuilderField } from "../../Typings/FormBuilder/IAlpacaForm";
import { IFormBuilderContext } from "../../Typings/FormBuilder/IFormBuilderContext";
import { IExpertMatter } from "./IExpertMatterData";

//This function is called from the module-loader webcomponent in the form builder
export async function runMe(context: IFormBuilderContext) {    
    let { expertMatterNumber, matterDetails, pipelineMatter } = createVariables(context);
    (window as any).tester = context; //just for debugging
    hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);
    //add a change event to the expert-matter-number
    addEventHandlers(context, matterDetails, expertMatterNumber, pipelineMatter);
}

// This function creates variables for the form.
function createVariables(context: IFormBuilderContext) {
    // Get the fields
    let matterDetails = context.fields[enumFields.matterDetails];
    let expertMatterNumber = context.fields[enumFields.expertMatterNumber];
    let pipelineMatter = context.fields[enumFields.pipelineMatter];
    let jurisdiction = context.fields[enumFields.jurisdictionsCountry];

    // Return the variables
    return { expertMatterNumber, matterDetails, pipelineMatter };
}

function addEventHandlers(context: IFormBuilderContext, matterDetails: FormBuilderField, expertMatterNumber: FormBuilderField, pipelineMatter: FormBuilderField) {
    context.fields[enumFields.expertMatterNumber].on("change", function (this: any, ev: any) {

        // hide or show the matter details field
        hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);

        // update the matter details field
        updateMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);
    });

    //add event handlet for pipeline-matter changed
    context.fields["pipeline-matter"].on("change", function (this: any, ev: any) {

        // hide or show the matter details field
        hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);

        // update the matter details field
        updateMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);
    });
}

function hideShowMatterDetails(matterDetails: FormBuilderField, expertMatterNumber: FormBuilderField, pipelineMatter: FormBuilderField) {
        setMatterDetailsState(matterDetails,pipelineMatter.getValue());    
}

// make all child properties readonly
function setMatterDetailsState(matterDetails: FormBuilderField, status: boolean = true) {
    // get all the child properties
    matterDetails.children.forEach(function (child: any) {
        // set the readonly status of the child property
        child.options.readonly = !status;
        // refresh the child property
        child.refresh();
    });

    // show/hide the partner name and selector
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsPartnerSelector].options.hidden = !status;
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsPartnerName].options.hidden = status;    
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsPartnerName].refresh();
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsPartnerSelector].refresh();
}


async function clearMatterDetails(matterDetails: FormBuilderField) {
    matterDetails.children.forEach(function (child: any) {
        child.setValue("-");
    });
}

/* Here is the explanation for the code above:
1. We first get the data from the endpoint by calling getMatterData() function
2. Then we clear the matterDetails
3. We find the selected matter by using the matter code and client name from the data we got from the endpoint
4. If the matter is undefined, we clear the matterDetails and return
5. If the matter is not undefined, we set the values of the matterDetails fields */
async function updateMatterDetails(matterDetails: FormBuilderField, expertMatterNumber: FormBuilderField,pipelineMatter:FormBuilderField) {
    
let data = await getMatterData();

    clearMatterDetails(matterDetails); //clear the matter details form

    let selectedMatter = data.find(function (matter: any) {
        return expertMatterNumber.getValue() === `${matter.data.matterCode} - ${matter.data.client.name}`;
    });
 
    if(selectedMatter === undefined || pipelineMatter.getValue() === true) { //if the matter is not found or if the matter is a pipeline matter, clear the matter details form and return
        clearMatterDetails(matterDetails);
        return;
    }
    
    let tempMatterNumber = matterDetails.parent.childrenByPropertyId['temp-matter-number'].getValue();

    if(tempMatterNumber === undefined || tempMatterNumber.length === 0 )
    {
        matterDetails.parent.childrenByPropertyId['temp-matter-number'].setValue("N/A");
    }

    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsClientName].setValue(selectedMatter.data.client.name);
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsClientCode].setValue(selectedMatter.data.client.code);
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsPracticeArea].setValue(selectedMatter.data.practiceArea.name);
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsName].setValue(selectedMatter.data.shortName);
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsPartnerName].setValue(selectedMatter.data.partner.name);
    matterDetails.childrenByPropertyId[enumMatterDetailFields.matterDetailsIb].setValue(selectedMatter.data.secure);

    console.log("matterDetails.isValid():" + matterDetails.isValid());

    
}

async function getMatterData() {
    //get the data from the server without cache
    return await $ajax.get(window.document.location.origin +  "/_ideFiles/SampleData/eDiscovery/matters.json") as IExpertMatter[];
}


export enum enumFields {
    customAltEdiscoveryInstructionMatterDetails = "custom-alt-ediscovery-instruction-matter-details" ,
    jurisdictionsCountry = "jurisdictions-country" ,
    pipelineMatter = "pipeline-matter" ,
    expertMatterNumber = "expert-matter-number" ,
    tempMatterNumber = "temp-matter-number" ,
    subMatterCode = "sub-matter-code" ,
    abcMatterNumber = "abc-matter-number" ,
    matterDetails = "matter-details" 
 }

export enum enumMatterDetailFields {
    matterDetailsPartnerSelector = "matter-details-partner-selector" ,
    matterDetailsPartnerName = "matter-details-partner-name" ,
    matterDetailsClientName = "matter-details-client-name" ,
    matterDetailsClientCode = "matter-details-client-code" ,
    matterDetailsPracticeArea = "matter-details-practice-area" ,
    matterDetailsName = "matter-details-name" ,
    matterDetailsIb = "matter-details-ib"
}


