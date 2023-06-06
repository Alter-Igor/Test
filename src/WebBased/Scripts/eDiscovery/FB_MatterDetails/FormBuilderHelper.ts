
import { FormBuilder } from "../../../WebBased/ModuleLoader/src/AlphacaAdapter";
import { IFormBuilderContext } from "../../../../Typings/FormBuilder/IFormBuilderContext";
import { IShareDoOptionSet } from "../../../../Typings/OptionSets/IShareDoOptionSet";
import { IExpertMatter } from "../Typings/IExpertMatterData";

//This function is called from the module-loader webcomponent in the form builder
export async function runMe(context: IFormBuilderContext) {
    let { expertMatterNumber, matterDetails, pipelineMatter } = createVariables(context);

    if(!expertMatterNumber) throw new Error("No expertMatterNumber");
    if(!matterDetails) throw new Error("No matterDetails");
    if(!pipelineMatter) throw new Error("No pipelineMatter");
    
    (window as any).tester = context; //just for debugging
    hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);
    //add a change event to the expert-matter-number
    addEventHandlers(context, matterDetails, expertMatterNumber, pipelineMatter);
    generateTempMatterNumber(context);

}

// This function creates variables for the form.
function createVariables(context: IFormBuilderContext) {
    // Get the fields
    // let matterDetails = context.fields[enumFields.matterDetails];

    if(!context.form) throw new Error("No form");

    let matterDetails = context.form.fieldsById[enumFields.customAltEdiscoveryInstructionMatterDetails]; 
    let expertMatterNumber = context.form.fieldsById[enumFields.expertMatterNumber];
    let pipelineMatter = context.form.fieldsById[enumFields.pipelineMatter];
    

    // Return the variables
    return { expertMatterNumber, matterDetails, pipelineMatter };
}

function addEventHandlers(context: IFormBuilderContext, matterDetails: FormBuilder, expertMatterNumber: FormBuilder, pipelineMatter: FormBuilder) {
    if(!context.form) throw new Error("No form");

    context.form.fieldsById[enumFields.expertMatterNumber]?.on("change", function (this: any, ev: any) {

        // hide or show the matter details field
        hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);

        // update the matter details field
        updateMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);
    });

    //add event handlet for pipeline-matter changed
    context.form.fieldsById[enumFields.pipelineMatter]?.on("change", function (this: any, ev: any) {

        // hide or show the matter details field
        hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);

        // update the matter details field
        updateMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);
    });

    //add event handlet for jurisdiction changed
    context.form.fieldsById[enumFields.jurisdictionsCountry]?.on("change", async function (this: any, ev: any) {

        //update blade jurisdiction     
        let selectedId = context.form?.fieldsById["jurisdictions-country"]?.getValue();
        console.log("%c Jurisdiction changed to: " + context.form?.fieldsById["jurisdictions-country"]?.getValue(), "color: red; font-size: 20px;");
        let aspect = context.getAspect("Sharedo.Core.Legal.Aspects.Widgets.InstructionWorkTypeDetails");

        let selectedJurisdictionCountry = await $ajax.get(`/api/v1/public/modeller/optionSets/allValues/${selectedId}`) as IShareDoOptionSet;

        if (!selectedJurisdictionCountry) {
            //log issue
            console.log("%c [ModuleLoader] getAspect return value", "background: #222; color: #bada55", selectedJurisdictionCountry);
            return;
        }
        let options = await $ajax.get(`/api/v1/public/modeller/optionSets/jurisdictions/values`);
        let selectedJurisdiction = options.find((option: IShareDoOptionSet) => option.name === selectedJurisdictionCountry.name);
        if (!selectedJurisdiction) {
            //log issue
            console.log("%c [ModuleLoader] getAspect return value", "background: #222; color: #bada55", selectedJurisdiction);
            return;
        }
        aspect.widget.instruction.jurisdictionId(selectedJurisdiction.id);
    }
    );

}

// hide or show the matter details field
function hideShowMatterDetails(matterDetails: FormBuilder , expertMatterNumber: FormBuilder, pipelineMatter: FormBuilder) {
    setMatterDetailsState(matterDetails, pipelineMatter.getValue());
}

// make all child properties readonly
function setMatterDetailsState(matterDetails: FormBuilder, status: boolean = true) {

    if(!matterDetails.fields) throw new Error("No fields");
    if(!matterDetails.fieldsById) throw new Error("No fieldsById");

    // get all the child properties
    matterDetails.fields.forEach(child =>
    {
        // set the readonly status of the child property
        child.readonly(!status);
    });
  
    // show/hide the partner name and selector
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerSelector]?.hidden(!status);
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]?.hidden(status);
    
}

// clear all the child properties of the matter details sub area of the form builder
async function clearMatterDetails(matterDetails: FormBuilder) {
    matterDetails.fields?.forEach(function (child: any) {
        child.setValue("");
    });
}

/* 
1. We first get the data from the endpoint by calling getMatterData() function
2. Then we clear the matterDetails
3. We find the selected matter by using the matter code and client name from the data we got from the endpoint
4. If the matter is undefined, we clear the matterDetails and return
5. If the matter is not undefined, we set the values of the matterDetails fields */
async function updateMatterDetails(matterDetails: FormBuilder, expertMatterNumber: FormBuilder, pipelineMatter: FormBuilder) {

    let data = await getMatterData();

    clearMatterDetails(matterDetails); //clear the matter details form

    let selectedMatter = data.find(function (matter: any) {
        return expertMatterNumber.getValue() === `${matter.data.matterCode} - ${matter.data.client.name}`;
    });

    if (selectedMatter === undefined || pipelineMatter.getValue() === true) { //if the matter is not found or if the matter is a pipeline matter, clear the matter details form and return
        clearMatterDetails(matterDetails);
        return;
    }

    if(!matterDetails.parent?.fieldsById) throw new Error("No client");
    let tempMatterNumber = matterDetails.parent?.fieldsById['temp-matter-number']?.getValue();

    if (tempMatterNumber === undefined || tempMatterNumber.length === 0) {
        // matterDetails.parent.childrenByPropertyId['temp-matter-number'].setValue("N/A");
    }

    

    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsClientName]?.setValue(selectedMatter.data.client.name);
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsClientCode]?.setValue(selectedMatter.data.client.code);
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPracticeArea]?.setValue(selectedMatter.data.practiceArea.name);
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsName]?.setValue(selectedMatter.data.shortName);
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]?.setValue(selectedMatter.data.partner.name);
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsIb]?.setValue(selectedMatter.data.secure);

    console.log("matterDetails.isValid():" + matterDetails.isValid());


}

async function getMatterData() {
    //get the data from the server without cache
    return await $ajax.get(window.document.location.origin + "/_ideFiles/SampleData/eDiscovery/matters.json") as IExpertMatter[];
}

function generateTempMatterNumber(context: IFormBuilderContext)
{
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate(); 
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let millisecond = date.getMilliseconds();

    let tempMatterNumber = `T${year}${month}${day}${hour}${minute}${second}${millisecond}`;

    context.form?.fieldsById[enumFields.tempMatterNumber]?.setValue(tempMatterNumber);
    
}


export enum enumFields {
    customAltEdiscoveryInstructionMatterDetails = "custom-alt-ediscovery-instruction-matter-details",
    jurisdictionsCountry = "jurisdictions-country",
    pipelineMatter = "pipeline-matter",
    expertMatterNumber = "expert-matter-number",
    tempMatterNumber = "temp-matter-number",
    subMatterCode = "sub-matter-code",
    abcMatterNumber = "abc-matter-number",
    matterDetails = "matter-details"
}

export enum enumMatterDetailFields {
    matterDetailsPartnerSelector = "matter-details-partner-selector",
    matterDetailsPartnerName = "matter-details-partner-name",
    matterDetailsClientName = "matter-details-client-name",
    matterDetailsClientCode = "matter-details-client-code",
    matterDetailsPracticeArea = "matter-details-practice-area",
    matterDetailsName = "matter-details-name",
    matterDetailsIb = "matter-details-ib"
}




