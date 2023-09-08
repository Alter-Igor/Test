
import { IFormBuilderContext } from "../../../../Typings/FormBuilder/IFormBuilderContext";
import { IShareDoOptionSet } from "../../../../Typings/OptionSets/IShareDoOptionSet";
import { IOdsEntity } from "../../../../Typings/WidgetsOdsEntityPicker/IOdsEntity";
import {  getAllRoleConfigForRole, searchForClients, searchForUsers } from "../../../Common/OdsHelper";
import { executeGet, executePost } from "../../../Common/api/api";
import { FormBuilder } from "../../../ModuleLoader/AlphacaAdapter";

import { IExpertMatter } from "../Typings/IExpertMatterData";

type OdsWidget = {
    [key:string]: any
};

//constants 
const matterPartnerRoleSystemName = "matter-partner";
const clientRoleSystemName = "client";

//This function is called from the module-loader webcomponent in the form builder
export function runMe(context: IFormBuilderContext) : boolean {
   
    let { expertMatterNumber, matterDetails, pipelineMatter } = createVariables(context);

    if(!expertMatterNumber) throw new Error("No expertMatterNumber");
    if(!matterDetails) throw new Error("No matterDetails");
    if(!pipelineMatter) throw new Error("No pipelineMatter");
    
    (window as any).tester = context; //just for debugging
    
    if(context.workItemContext.id() !== undefined)
    {
        ensureReadOnlyFields(context);
       // validateTempMatterNumber(context);
        let exit = true;
        //if the work item is new or in draft dont exit
        if(context.workItemContext?.phaseName()?.toLowerCase().includes("draft") || !context.workItemContext?.phaseName())
        {
            exit = false;
        }
        
        if(exit===true)
        {
             //only run this code if the work item is new
            console.log("%c [ModuleLoader] FB_MatterDetails - exit (only run on new)", "background: #222; color: #bada55", context.workItemContext.id());
            console.log("%c [ModuleLoader] context.workItemContext.id() ", "background: #222; color: #bada55", context.workItemContext.id());
            console.log("%c [ModuleLoader] context.workItemContext?.phaseName() ", "background: #222; color: #bada55", context.workItemContext?.phaseName());
            return true;
        }
    }

    
    (window as any).aspectDebuger = (window as any).aspectDebuger || {};
    (window as any).aspectDebuger.matterDetailsFormBuilder = matterDetails;

    hideShowMatterDetails(context,matterDetails, expertMatterNumber, pipelineMatter);
    //add a change event to the expert-matter-number
    addEventHandlers(context, matterDetails, expertMatterNumber, pipelineMatter);
    //generateTempMatterNumber(context);
    validateIfPipelineMatter(context,matterDetails);

    $ui.events.broadcast("script.matterDetailsLoaded", context);
    return true;
}

// This function creates variables for the form.
function createVariables(context: IFormBuilderContext) {
    // Get the fields
    // let matterDetails = context.fields[enumFields.matterDetails];

    if(!context.form) throw new Error("No form");

    let matterDetails = context.form.fieldsById[enumFields.matterDetails]; 
    let expertMatterNumber = context.form.fieldsById[enumFields.expertMatterNumber];
    let pipelineMatter = context.form.fieldsById[enumFields.pipelineMatter];
    

    // Return the variables
    return { expertMatterNumber, matterDetails, pipelineMatter };
}

function addEventHandlers(context: IFormBuilderContext, matterDetails: FormBuilder, expertMatterNumber: FormBuilder, pipelineMatter: FormBuilder) {
    if(!context.form) throw new Error("No form");
    //add event handlet for expert-matter-number changed
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]?.on("change", function (this: any, ev: any) {
        console.log("%c Partner name changed to: " + matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]?.getValue(), "color: pink; font-size: 20px;");
    });

    //add event handlet for expert-matter-number changed
    context.form.fieldsById[enumFields.expertMatterNumber]?.on("change", function (this: any, ev: any) {
        // hide or show the matter details field
        hideShowMatterDetails(context,matterDetails, expertMatterNumber, pipelineMatter);
        // update the matter details field
        updateMatterDetails(context,matterDetails, expertMatterNumber, pipelineMatter);
    });

    //add event handlet for pipeline-matter changed
    context.form.fieldsById[enumFields.pipelineMatter]?.on("change", function (this: any, ev: any) {
        // hide or show the matter details field
        hideShowMatterDetails(context,matterDetails, expertMatterNumber, pipelineMatter);
        // update the matter details field
        updateMatterDetails(context,matterDetails, expertMatterNumber, pipelineMatter); 
    });

    //add event handlet for jurisdiction changed
    //update the OOB Jurisdiction aspect field and formbuilder fields
    context.form.fieldsById[enumFields.jurisdictionsCountry]?.on("change", async function (this: any, ev: any) {
        //update blade jurisdiction     
        let selectedId = context.form?.fieldsById["jurisdictions-country"]?.getValue();
        console.log("%c Jurisdiction changed to: " + context.form?.fieldsById["jurisdictions-country"]?.getValue(), "color: red; font-size: 20px;");
        let aspect = context.getAspect("Sharedo.Core.Legal.Aspects.Widgets.InstructionWorkTypeDetails");
        let selectedJurisdictionCountry = await $ajax.get(/* webpackIgnore: true */`/api/v1/public/modeller/optionSets/allValues/${selectedId}`) as IShareDoOptionSet;
        if (!selectedJurisdictionCountry) {
            //log issue
            console.log("%c [ModuleLoader] getAspect return value", "background: #222; color: #bada55", selectedJurisdictionCountry);
            return;
        }
        let options = await $ajax.get(/* webpackIgnore: true */`/api/v1/public/modeller/optionSets/jurisdictions/values`);
        let selectedJurisdiction = options.find((option: IShareDoOptionSet) => option.name === selectedJurisdictionCountry.name);
        if (!selectedJurisdiction) {
            //log issue
            console.log("%c [ModuleLoader] getAspect return value", "background: #222; color: #bada55", selectedJurisdiction);
            return;
        }
        aspect.widget.instruction.jurisdictionId(selectedJurisdiction.id);
    });
}

// hide or show the matter details field
function hideShowMatterDetails(context: IFormBuilderContext,matterDetails: FormBuilder , expertMatterNumber: FormBuilder, pipelineMatter: FormBuilder) {
    setMatterDetailsState(context,matterDetails, pipelineMatter.getValue());
}

// make all child properties readonly
function setMatterDetailsState(context: IFormBuilderContext,matterDetails: FormBuilder, status: boolean = true) {
    if(!matterDetails.fields) throw new Error("No fields");
    if(!matterDetails.fieldsById) throw new Error("No fieldsById");
    // get all the child properties
    matterDetails.fields.forEach(child =>
    {
        // set the readonly status of the child property
        child.readonly(!status);
    });

    // set the readonly status of the matter details sub area
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsIbLastChecked]?.hidden(true);

    ensureReadOnlyFields(context);


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
3. We find the selected matter by using the matter code and client code from the data we got from the endpoint
4. If the matter is undefined, we clear the matterDetails and return
5. If the matter is not undefined, we set the values of the matterDetails fields */
async function updateMatterDetails(context: IFormBuilderContext,matterDetails: FormBuilder, expertMatterNumber: FormBuilder, pipelineMatter: FormBuilder) {

    
    let data = await getMatterData(expertMatterNumber.getValue());
    console.log(data);
    //clearMatterDetails(matterDetails); //clear the matter details form
    let selectedMatter = data.find(function (matter: any) {
        //set the display portion of the expert-matter-number field
       // return expertMatterNumber.getValue() === `${matter.data.matterCode} - ${matter.data.client.name}`;
       return expertMatterNumber.getValue() === matter.data.matterCode;
        
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

     //set the value portion of the expert-matter-number field
     context.form?.fieldsById[enumFields.expertMatterNumberValue]?.setValue(selectedMatter?.data?.matterCode || "");
       

    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsClientName]?.setValue(selectedMatter?.data?.client?.name || "");
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsClientCode]?.setValue(selectedMatter?.data?.client?.code || "");
   // matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPracticeArea]?.setValue(selectedMatter?.data?.practiceArea?.name || "");
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsName]?.setValue(selectedMatter?.data?.shortName || "");
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]?.setValue(selectedMatter?.data?.partner?.name || "");
    matterDetails.fieldsById[enumMatterDetailFields.matterDetailsIb]?.setValue(selectedMatter?.data?.secure || "");

    console.log("matterDetails.isValid():" + matterDetails.isValid());


    try
    {
        tryUpdateClientOdsPicker(selectedMatter, context);
    }
    catch(e)
    {
        console.log("Failed to auto updating ods pickers, user required to select manually");
    }

    try
    {
        tryUpdatePartnerOdsPicker(selectedMatter, context);
    }
    catch(e)
    {
        console.log("Failed to auto updating ods pickers, user required to select manually");
    }
    
}


/**
 * Try to update the client ods picker using the selected matter 
 * Uses searchForClient function whic is a common ods helper function
 * @param selectedMatter The selected matter
 * @param context The form builder context
 */
function tryUpdateClientOdsPicker(selectedMatter: IExpertMatter, context: IFormBuilderContext) {
    let clientCode = selectedMatter.data.client.code;
    searchForClients(clientCode).then((clients) => {
        let client = clients[0];
        console.log("%c Found Client name : " + client?.name, "color: pink; font-size: 20px;", clients);
        let odsClient = getClientOdsPicker(context);
        let odsRoleConfig = odsClient.roleConfig[0];
        let odsEntities = odsClient.ODSEntities[0];
    
        if (!odsRoleConfig || !odsEntities)
            return;

        if (!client) {
            odsEntities.selected(false);
            return;
        }
        let entity : IOdsEntity = odsRoleConfig.addService.createSelectedEntityModel(client.id, "organisation", client.name);
        odsRoleConfig.addService.selectedEntity(entity);
    });
}

/**
 * Tries to update the partner ods picker
 * @param selectedMatter The selected matter
 * @param context  The form builder context
 */
function tryUpdatePartnerOdsPicker(selectedMatter: IExpertMatter, context: IFormBuilderContext) {
    let partnerLastName = selectedMatter.data.partner.name.split(",")[0];
    searchForUsers(selectedMatter.data.partner.email).then((users) => {
        let user = users[0];
        console.log("%c Partner name changed to: " + user?.id, "color: pink; font-size: 20px;", user);
        let odsMatterPartner = getPartnerOdsPicker(context);
        let odsRoleConfig = odsMatterPartner.roleConfig[0];
        let odsEntities = odsMatterPartner.ODSEntities[0];
    
        if (!odsRoleConfig || !odsEntities)
            return;

        if (!user) {
            odsEntities.selected(false);
            return;
        }

        let entity : IOdsEntity = odsRoleConfig.addService.createSelectedEntityModel(user.id, "user", user.firstName + " " + user.surname);
        odsRoleConfig.addService.selectedEntity(entity);
    });
}

/**
 * Call the server to get the matter data
 * @returns the data from the server without cache
 */
async function getMatterData(expertMatterNumber?:string) : Promise<IExpertMatter[]> {
    
    let retValue:IExpertMatter[] = [];
    if(expertMatterNumber === undefined || expertMatterNumber.length === 0)
    {
        return retValue;
    }
   
    //return await $ajax.get(/* webpackIgnore: true */ window.document.location.origin + "/_ideFiles/SampleData/eDiscovery/matters.json") as IExpertMatter[];
    // //get the data from the server without cache
    try
    {
        let data = await executeGet<any>(`/api/externalMatterProvider/details/${expertMatterNumber}`);
        console.log("%c [ModuleLoader] getMatterData return value", "background: #222; color: #bada55", data)
        if(data && data.matterCode)
        {
            let matter:IExpertMatter = {
                data: data
            };

            retValue.push(matter);
        }
    }
    catch(e)
    {
        console.log("Failed to get matter data from server",e);

    }
     return retValue;
}

/**
 * Generates a temp matter number and sets it to the temp-matter-number field
 * @param context The form builder context
 */
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
   // let tempMatterNumber = `T${year}${month}${day}${hour}${minute}${second}${millisecond}`;
   let tempMatterNumber = `T[${year}]`;
    context.form?.fieldsById[enumFields.tempMatterNumber]?.setValue(tempMatterNumber);
}

/**
 * Enum for the fields in the form builder
 */
export enum enumFields {
    customAltEdiscoveryInstructionMatterDetails = "custom-alt-ediscovery-instruction-matter-details",
    jurisdictionsCountry = "jurisdictions-country",
    pipelineMatter = "pipeline-matter",
    expertMatterNumber = "expert-matter-number",
    expertMatterNumberValue = "expert-matter-number-value",
    tempMatterNumber = "temp-matter-number",
    subMatterCode = "sub-matter-code",
    abcMatterNumber = "abc-matter-number",
    matterDetails = "matter-details",
    
}

/**
 * Enum for the fields in the matter details sub area of the form builder
 */
export enum enumMatterDetailFields {
    matterDetailsPartnerSelector = "matter-details-partner-selector",
    matterDetailsPartnerName = "matter-details-partner-name",
    matterDetailsClientName = "matter-details-client-name",
    matterDetailsClientCode = "matter-details-client-code",
    matterDetailsPracticeArea = "matter-details-practice-area",
    matterDetailsName = "matter-details-name",
    matterDetailsIb = "matter-details-ib",
    matterDetailsIbLastChecked = "matter-details-ib-last-check"
}

/**
 * Searches for the partner ods picker in the blade using common ods helper functions
 * @param context 
 * @returns 
 */
function getPartnerOdsPicker(context: IFormBuilderContext) {
    return getAllRoleConfigForRole(context.blade,matterPartnerRoleSystemName);
}

/**
 * Searches for the partner ods picker in the blade using common ods helper functions
 * @param context 
 * @returns 
 */
function getClientOdsPicker(context: IFormBuilderContext) {
    return getAllRoleConfigForRole(context.blade, clientRoleSystemName);
}

function validateIfPipelineMatter(context: IFormBuilderContext,matterDetails: FormBuilder)
{
    //log color
    console.log("%c [MatterDetails] validateIfPipelineMatter", "color: #green");
    console.log("%c [MatterDetails] context.workItemContext()", " color: #green", context.workItemContext);

    if(context.workItemContext.sharedoTypeSystemName()?.includes("pipeline") !== true)
    {
        return;
    }
    
    let pipelineFormField = context.form?.fieldsById[enumFields.pipelineMatter];
  
    if(pipelineFormField)
    {    
        //ensure pipleine matter is readonly
        
        console.log("%c [MatterDetails] pipelineFormField.setValue(true)", " color: #green");   
        pipelineFormField.setValue(true);
    }

      


}

function ensureReadOnlyFields(context: IFormBuilderContext)
{
    let pipelineFormField = context.form?.fieldsById[enumFields.pipelineMatter];
    if(pipelineFormField)
    {
        pipelineFormField.readonly(true);
        pipelineFormField.hidden(true);
    }
}


// function validateTempMatterNumber(context: IFormBuilderContext) {

//     //log color
//     console.log("%c [MatterDetails] validateTempMatterNumber", "background: #222; color: #bada55");
//     //exit is still new and matter not saved
//     if(context.workItemContext.id()===undefined)
//     {
//         return;
//     }

//     //exit if the temp matter number is set
//     let tempMatterNumber = context.form?.fieldsById[enumFields.tempMatterNumber]?.getValue();
//     console.log("%c [MatterDetails] tempMatterNumber", "background: #222; color: #bada55", tempMatterNumber);
//     if(tempMatterNumber != undefined && tempMatterNumber.startsWith("T["))
//     {
//         return;
//     }

//     //run every 500ms to check for a temp matter number
//     let interval = setInterval(async () => {
//         console.log("validateTempMatterNumber");
//         let tempMatterNumber = await getPipelineMatterNumber(context.workItemContext.id());
//         if(tempMatterNumber != undefined && tempMatterNumber.length > 0)
//         {
//             context.form?.fieldsById[enumFields.tempMatterNumber]?.setValue(tempMatterNumber);
//             clearInterval(interval);
//             return;
//         }
        
//     },500);


// }

// async function getPipelineMatterNumber(id:string) : Promise<string>
// {
//     let api = `/api/v1/public/workItem/findByQuery`;
//     let data = {
//         "search": {
//           "workItemIds": [
//             id
//           ]
//         },
//         "enrich": [
    
//                   {
//                       "path": "form-custom-alt-ediscovery-instruction-matter-details.temp-matter-number"
//                   }
//         ]};

//     return executePost<TGetPipelineMatterNumberResponse>(api,data).then((data) => {
//          console.log("getPipelineMatterNumber",data);
//          let retValue : string = data.results[0].data["form-custom-alt-ediscovery-instruction-matter-details.temp-matter-number"];
       
//         return retValue;
//     });


// }

// type TGetPipelineMatterNumberResponse = {
//         "totalCount": 1,
//         "tookMs": 71,
//         "results": [
//             {
//                 "score": 0,
//                 "id": "4dd70e3f-b294-4479-902e-b057009e3e63",
//                 "data": {
//                     "form-custom-alt-ediscovery-instruction-matter-details.temp-matter-number": "T[2023]000007",
//                     "title": "Gareth Jackson Ltd - ",
//                     "phase.name": "Draft"
//                 }
//             }
//         ]
//     }
