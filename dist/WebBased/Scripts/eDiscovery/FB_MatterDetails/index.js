var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllOdsPickerForRole, searchForClient, searchForUser } from "../../../Common/OdsHelper";
//This function is called from the module-loader webcomponent in the form builder
export function runMe(context) {
    let { expertMatterNumber, matterDetails, pipelineMatter } = createVariables(context);
    if (!expertMatterNumber)
        throw new Error("No expertMatterNumber");
    if (!matterDetails)
        throw new Error("No matterDetails");
    if (!pipelineMatter)
        throw new Error("No pipelineMatter");
    window.tester = context; //just for debugging
    hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);
    //add a change event to the expert-matter-number
    addEventHandlers(context, matterDetails, expertMatterNumber, pipelineMatter);
    generateTempMatterNumber(context);
}
// This function creates variables for the form.
function createVariables(context) {
    // Get the fields
    // let matterDetails = context.fields[enumFields.matterDetails];
    if (!context.form)
        throw new Error("No form");
    let matterDetails = context.form.fieldsById[enumFields.matterDetails];
    let expertMatterNumber = context.form.fieldsById[enumFields.expertMatterNumber];
    let pipelineMatter = context.form.fieldsById[enumFields.pipelineMatter];
    // Return the variables
    return { expertMatterNumber, matterDetails, pipelineMatter };
}
function addEventHandlers(context, matterDetails, expertMatterNumber, pipelineMatter) {
    var _a, _b, _c, _d;
    if (!context.form)
        throw new Error("No form");
    (_a = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]) === null || _a === void 0 ? void 0 : _a.on("change", function (ev) {
        var _a;
        //log color
        console.log("%c Partner name changed to: " + ((_a = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]) === null || _a === void 0 ? void 0 : _a.getValue()), "color: pink; font-size: 20px;");
    });
    (_b = context.form.fieldsById[enumFields.expertMatterNumber]) === null || _b === void 0 ? void 0 : _b.on("change", function (ev) {
        // hide or show the matter details field
        hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);
        // update the matter details field
        updateMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter);
    });
    //add event handlet for pipeline-matter changed
    (_c = context.form.fieldsById[enumFields.pipelineMatter]) === null || _c === void 0 ? void 0 : _c.on("change", function (ev) {
        // hide or show the matter details field
        hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter);
        // update the matter details field
        updateMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter);
    });
    //add event handlet for jurisdiction changed
    (_d = context.form.fieldsById[enumFields.jurisdictionsCountry]) === null || _d === void 0 ? void 0 : _d.on("change", function (ev) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            //update blade jurisdiction     
            let selectedId = (_b = (_a = context.form) === null || _a === void 0 ? void 0 : _a.fieldsById["jurisdictions-country"]) === null || _b === void 0 ? void 0 : _b.getValue();
            console.log("%c Jurisdiction changed to: " + ((_d = (_c = context.form) === null || _c === void 0 ? void 0 : _c.fieldsById["jurisdictions-country"]) === null || _d === void 0 ? void 0 : _d.getValue()), "color: red; font-size: 20px;");
            let aspect = context.getAspect("Sharedo.Core.Legal.Aspects.Widgets.InstructionWorkTypeDetails");
            let selectedJurisdictionCountry = yield $ajax.get(/* webpackIgnore: true */ `/api/v1/public/modeller/optionSets/allValues/${selectedId}`);
            if (!selectedJurisdictionCountry) {
                //log issue
                console.log("%c [ModuleLoader] getAspect return value", "background: #222; color: #bada55", selectedJurisdictionCountry);
                return;
            }
            let options = yield $ajax.get(/* webpackIgnore: true */ `/api/v1/public/modeller/optionSets/jurisdictions/values`);
            let selectedJurisdiction = options.find((option) => option.name === selectedJurisdictionCountry.name);
            if (!selectedJurisdiction) {
                //log issue
                console.log("%c [ModuleLoader] getAspect return value", "background: #222; color: #bada55", selectedJurisdiction);
                return;
            }
            aspect.widget.instruction.jurisdictionId(selectedJurisdiction.id);
        });
    });
}
// hide or show the matter details field
function hideShowMatterDetails(matterDetails, expertMatterNumber, pipelineMatter) {
    setMatterDetailsState(matterDetails, pipelineMatter.getValue());
}
// make all child properties readonly
function setMatterDetailsState(matterDetails, status = true) {
    if (!matterDetails.fields)
        throw new Error("No fields");
    if (!matterDetails.fieldsById)
        throw new Error("No fieldsById");
    // get all the child properties
    matterDetails.fields.forEach(child => {
        // set the readonly status of the child property
        child.readonly(!status);
    });
    // show/hide the partner name and selector
    // matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerSelector]?.hidden(!status);
    // matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]?.hidden(status);
}
// clear all the child properties of the matter details sub area of the form builder
function clearMatterDetails(matterDetails) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        (_a = matterDetails.fields) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
            child.setValue("");
        });
    });
}
function clearMatterPartnerOdsPicker(context) {
    let odsMatterPartner = getPartnerOdsPicker(context);
    if (odsMatterPartner) {
        odsMatterPartner.selected(false);
    }
}
/*
1. We first get the data from the endpoint by calling getMatterData() function
2. Then we clear the matterDetails
3. We find the selected matter by using the matter code and client name from the data we got from the endpoint
4. If the matter is undefined, we clear the matterDetails and return
5. If the matter is not undefined, we set the values of the matterDetails fields */
function updateMatterDetails(context, matterDetails, expertMatterNumber, pipelineMatter) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield getMatterData();
        clearMatterDetails(matterDetails); //clear the matter details form
        let selectedMatter = data.find(function (matter) {
            //set the display portion of the expert-matter-number field
            return expertMatterNumber.getValue() === `${matter.data.matterCode} - ${matter.data.client.name}`;
        });
        if (selectedMatter === undefined || pipelineMatter.getValue() === true) { //if the matter is not found or if the matter is a pipeline matter, clear the matter details form and return
            clearMatterDetails(matterDetails);
            return;
        }
        if (!((_a = matterDetails.parent) === null || _a === void 0 ? void 0 : _a.fieldsById))
            throw new Error("No client");
        let tempMatterNumber = (_c = (_b = matterDetails.parent) === null || _b === void 0 ? void 0 : _b.fieldsById['temp-matter-number']) === null || _c === void 0 ? void 0 : _c.getValue();
        if (tempMatterNumber === undefined || tempMatterNumber.length === 0) {
            // matterDetails.parent.childrenByPropertyId['temp-matter-number'].setValue("N/A");
        }
        //set the value portion of the expert-matter-number field
        (_e = (_d = context.form) === null || _d === void 0 ? void 0 : _d.fieldsById[enumFields.expertMatterNumberValue]) === null || _e === void 0 ? void 0 : _e.setValue(selectedMatter.data.matterCode);
        (_f = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsClientName]) === null || _f === void 0 ? void 0 : _f.setValue(selectedMatter.data.client.name);
        (_g = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsClientCode]) === null || _g === void 0 ? void 0 : _g.setValue(selectedMatter.data.client.code);
        (_h = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPracticeArea]) === null || _h === void 0 ? void 0 : _h.setValue(selectedMatter.data.practiceArea.name);
        (_j = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsName]) === null || _j === void 0 ? void 0 : _j.setValue(selectedMatter.data.shortName);
        (_k = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsPartnerName]) === null || _k === void 0 ? void 0 : _k.setValue(selectedMatter.data.partner.name);
        (_l = matterDetails.fieldsById[enumMatterDetailFields.matterDetailsIb]) === null || _l === void 0 ? void 0 : _l.setValue(selectedMatter.data.secure);
        console.log("matterDetails.isValid():" + matterDetails.isValid());
        tryUpdatePartnerOdsPicker(selectedMatter, context);
        tryUpdateClientOdsPicker(selectedMatter, context);
    });
}
function tryUpdateClientOdsPicker(selectedMatter, context) {
    let clientCode = selectedMatter.data.client.code;
    searchForClient(clientCode).then((clients) => {
        let client = clients[0];
        console.log("%c Partner name changed to: " + (client === null || client === void 0 ? void 0 : client.id), "color: pink; font-size: 20px;", clients);
        let odsClientPicker = getClientOdsPicker(context);
        if (!odsClientPicker)
            return;
        if (!client) {
            odsClientPicker.selected(false);
            return;
        }
        odsClientPicker.icon('fa-bank');
        odsClientPicker.odsName(client.name);
        odsClientPicker.odsId(client.id);
        odsClientPicker.selected(true);
    });
}
function tryUpdatePartnerOdsPicker(selectedMatter, context) {
    let partnerLastName = selectedMatter.data.partner.name.split(",")[0];
    searchForUser(selectedMatter.data.partner.email).then((users) => {
        let user = users[0];
        console.log("%c Partner name changed to: " + (user === null || user === void 0 ? void 0 : user.id), "color: pink; font-size: 20px;", user);
        let odsMatterPartner = getPartnerOdsPicker(context);
        if (!odsMatterPartner)
            return;
        if (!user) {
            odsMatterPartner.selected(false);
            return;
        }
        odsMatterPartner.icon('fa-male');
        odsMatterPartner.odsName(user.firstName + " " + user.surname);
        odsMatterPartner.odsId(user.id);
        odsMatterPartner.selected(true);
    });
}
function getMatterData() {
    return __awaiter(this, void 0, void 0, function* () {
        //get the data from the server without cache
        return yield $ajax.get(/* webpackIgnore: true */ window.document.location.origin + "/_ideFiles/SampleData/eDiscovery/matters.json");
    });
}
function generateTempMatterNumber(context) {
    var _a, _b;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let millisecond = date.getMilliseconds();
    let tempMatterNumber = `T${year}${month}${day}${hour}${minute}${second}${millisecond}`;
    (_b = (_a = context.form) === null || _a === void 0 ? void 0 : _a.fieldsById[enumFields.tempMatterNumber]) === null || _b === void 0 ? void 0 : _b.setValue(tempMatterNumber);
}
export var enumFields;
(function (enumFields) {
    enumFields["customAltEdiscoveryInstructionMatterDetails"] = "custom-alt-ediscovery-instruction-matter-details";
    enumFields["jurisdictionsCountry"] = "jurisdictions-country";
    enumFields["pipelineMatter"] = "pipeline-matter";
    enumFields["expertMatterNumber"] = "expert-matter-number";
    enumFields["expertMatterNumberValue"] = "expert-matter-number-value";
    enumFields["tempMatterNumber"] = "temp-matter-number";
    enumFields["subMatterCode"] = "sub-matter-code";
    enumFields["abcMatterNumber"] = "abc-matter-number";
    enumFields["matterDetails"] = "matter-details";
})(enumFields || (enumFields = {}));
export var enumMatterDetailFields;
(function (enumMatterDetailFields) {
    enumMatterDetailFields["matterDetailsPartnerSelector"] = "matter-details-partner-selector";
    enumMatterDetailFields["matterDetailsPartnerName"] = "matter-details-partner-name";
    enumMatterDetailFields["matterDetailsClientName"] = "matter-details-client-name";
    enumMatterDetailFields["matterDetailsClientCode"] = "matter-details-client-code";
    enumMatterDetailFields["matterDetailsPracticeArea"] = "matter-details-practice-area";
    enumMatterDetailFields["matterDetailsName"] = "matter-details-name";
    enumMatterDetailFields["matterDetailsIb"] = "matter-details-ib";
})(enumMatterDetailFields || (enumMatterDetailFields = {}));
function getPartnerOdsPicker(context) {
    return getAllOdsPickerForRole(context.blade, "Matter Partner")[0];
}
function getClientOdsPicker(context) {
    return getAllOdsPickerForRole(context.blade, "Client")[0];
}
//# sourceMappingURL=index.js.map