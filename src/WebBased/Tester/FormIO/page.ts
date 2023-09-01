import { Formio } from 'formiojs';
import { renderTestForm } from '../../Formio/Common/FormioRender';

const TestForm =
    { "_id": "64eff607f75f288e9113f708", "title": "Test Form", "name": "testForm", "path": "testform", "type": "form", "display": "form", "tags": [], "access": [{ "type": "create_own", "roles": [] }, { "type": "create_all", "roles": [] }, { "type": "read_own", "roles": [] }, { "type": "read_all", "roles": ["64eff57f57da848e7393cc32", "64eff57f57da848e7393cc38", "64eff57f57da848e7393cc3e"] }, { "type": "update_own", "roles": [] }, { "type": "update_all", "roles": [] }, { "type": "delete_own", "roles": [] }, { "type": "delete_all", "roles": [] }, { "type": "team_read", "roles": [] }, { "type": "team_write", "roles": [] }, { "type": "team_admin", "roles": [] }], "submissionAccess": [{ "type": "create_own", "roles": [] }, { "type": "create_all", "roles": [] }, { "type": "read_own", "roles": [] }, { "type": "read_all", "roles": [] }, { "type": "update_own", "roles": [] }, { "type": "update_all", "roles": [] }, { "type": "delete_own", "roles": [] }, { "type": "delete_all", "roles": [] }, { "type": "team_read", "roles": [] }, { "type": "team_write", "roles": [] }, { "type": "team_admin", "roles": [] }], "owner": "64eff50f57da848e7393c75d", "components": [{ "label": "Claim Reference/No.", "widget": "", "applyMaskOn": "change", "autoExpand": false, "tableView": true, "validate": { "required": true }, "key": "claimReferenceNo", "type": "textarea", "rows": 1, "input": true }, { "label": "Insured's Name", "applyMaskOn": "change", "tableView": true, "validate": { "required": true }, "key": "insuredsName", "conditional": { "show": true, "conjunction": "all", "conditions": [{ "component": "claimReferenceNo", "operator": "isNotEmpty" }] }, "type": "textfield", "input": true }, { "label": "Text Field", "applyMaskOn": "change", "tableView": true, "key": "textField", "type": "textfield", "input": true }, { "label": "Checkbox", "tableView": false, "key": "checkbox", "type": "checkbox", "input": true }, { "label": "Select", "widget": "choicesjs", "tableView": true, "data": { "values": [{ "label": "Option 1", "value": "option1" }, { "label": "Option 2", "value": "option2" }, { "label": "Option 3", "value": "option3" }] }, "key": "select", "type": "select", "input": true }, { "label": "Select Boxes", "optionsLabelPosition": "right", "tableView": false, "values": [{ "label": "Item 1", "value": "item1", "shortcut": "A" }, { "label": "Item 2", "value": "item2", "shortcut": "B" }], "key": "selectBoxes", "type": "selectboxes", "input": true, "inputType": "checkbox" }, { "type": "button", "label": "Submit", "key": "submit", "disableOnInvalid": true, "input": true, "tableView": false }], "settings": {}, "properties": {}, "project": "64eff57f57da848e7393cc2b", "controller": "", "revisions": "", "submissionRevisions": "", "_vid": 0, "created": "2023-08-31T02:08:07.519Z", "modified": "2023-08-31T10:23:16.180Z", "machineName": "saehwyndnftzzmk:testForm", "plan": "trial" }

// function loadForm() {
//     let formiolocation = document.querySelector("#formio")!;


//     //add shadowdom to element
//     //  let shadow = element.attachShadow({mode: 'open'});

//     let div = document.createElement('div');
//     div.id = "formio";
//     formiolocation.appendChild(div);


//     Formio.createForm(div, TestForm, {
//     }).then((form) => {
//         console.log("Form: ", form);
//         form.on('submit', (submission: any) => {
//             console.log('Submission was made!', submission);
//         });

//         return form;
//     });
// }

document.addEventListener("DOMContentLoaded", () => {
    let formiolocation = document.querySelector("#formio")!;
    renderTestForm(formiolocation);
});