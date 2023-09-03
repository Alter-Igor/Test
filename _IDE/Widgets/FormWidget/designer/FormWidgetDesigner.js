/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "../../BaseClasses/Utility.ts":
/*!************************************!*\
  !*** ../../BaseClasses/Utility.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   camelize: () => (/* binding */ camelize),
/* harmony export */   cleanJSON: () => (/* binding */ cleanJSON)
/* harmony export */ });
function camelize(str) {
    if (!str)
        return str;
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}
function cleanJSON(rawData) {
    // Remove surrounding <p> tags, newline representations, and &nbsp;
    let cleanedString = rawData.replace(/^<p>|<\/p>|\/n|&nbsp;/g, '').trim();
    // Given that JSON keys should be wrapped in double quotes, but values could already contain them,
    // we'll use a regex to match the pattern of a key followed by a colon.
    let validJsonString = cleanedString.replace(/(?<!")(\b\w+\b)(?=:)/g, '"$1"');
    // The above will handle the JSON keys. Let's assume the values are already correctly formatted.
    // If they aren't, this can get a lot trickier.
    try {
        let jsonObject = JSON.parse(validJsonString);
        console.log(jsonObject);
        return JSON.stringify(jsonObject, null, 2);
    }
    catch (error) {
        console.error("Error parsing JSON:", error.message);
        return error.message;
    }
}


/***/ }),

/***/ "../../Common/DifferedPromise.ts":
/*!***************************************!*\
  !*** ../../Common/DifferedPromise.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeferredPromise: () => (/* binding */ DeferredPromise)
/* harmony export */ });
class DeferredPromise {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            // Type assertions here to satisfy TypeScript's strict checks.
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}


/***/ }),

/***/ "../Common/FormioBuilder.ts":
/*!**********************************!*\
  !*** ../Common/FormioBuilder.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createFormBuilderPage: () => (/* binding */ createFormBuilderPage),
/* harmony export */   exampleFormComponents: () => (/* binding */ exampleFormComponents)
/* harmony export */ });
/* harmony import */ var _Styling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Styling */ "../Common/Styling.ts");
/* harmony import */ var _Common_DifferedPromise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/DifferedPromise */ "../../Common/DifferedPromise.ts");


function createFormBuilderPage(element, schema) {
    //crerate a iframe using the html and insert it into the element
    (0,_Styling__WEBPACK_IMPORTED_MODULE_0__.checkLowdashCompatability)();
    const deferred = new _Common_DifferedPromise__WEBPACK_IMPORTED_MODULE_1__.DeferredPromise();
    let loadingDiv = addLoadingMessage(element);
    //check if iframe already exists
    let iframe = element.querySelector("iframe");
    if (iframe) {
        element.removeChild(iframe);
    }
    iframe = document.createElement("iframe");
    iframe.setAttribute("src", "/_ideFiles/Widgets/FormWidget/FormIOBuilder/page.html");
    iframe.setAttribute("width", "100%");
    //frameborder="0" scrolling="no" 
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("scrolling", "no");
    iframe.classList.add("formio-builder-iframe");
    deferred.promise.then(() => {
        loadingDiv.remove();
        iframe.classList.add("loaded");
    });
    //get current window height
    let screenHeight = element.clientHeight;
    ;
    iframe.setAttribute("height", screenHeight.toString());
    //monitor screen height and resize iframe
    window.addEventListener("resize", function () {
        if (!iframe) {
            return;
        }
        let screenHeight = element.clientHeight;
        ;
        iframe.setAttribute("height", screenHeight.toString());
    });
    element.appendChild(iframe);
    iframe.onload = function () {
        if (!iframe) {
            return;
        }
        render(iframe, schema, deferred);
    };
    return deferred;
}
function render(iframe, schema, deferred) {
    let formioId = "#formio";
    if (!iframe.contentWindow) {
        throw new Error("Could not find iframe.contentWindow");
    }
    let formioDiv = iframe.contentWindow.document.querySelector(formioId);
    if (!formioDiv) {
        throw new Error("Could not find element with id " + formioId);
    }
    // addDefaultFormIOStyleSheetsToIframe(iframe);
    // let fb=  new FormBuilder(formioDiv, undefined, undefined);
    // let formBuilder = (iframe.contentWindow as any)["formBuilder"] as FormBuilder;
    // (window as any)["FB"] = formBuilder;
    // (window as any)["formioDiv"] = formioDiv;
    // deferred.resolve(formBuilder);
    if (iframe.built === true) {
        return;
    }
    iframe.contentWindow.build(deferred, schema);
    iframe.built = true;
}
function addLoadingMessage(element) {
    let loadingMessage = document.createElement("div");
    loadingMessage.setAttribute("id", "loadingMessage");
    loadingMessage.innerText = "Loading...";
    document.body.appendChild(loadingMessage);
    element.appendChild(loadingMessage);
    return loadingMessage;
}
const exampleFormComponents = {
    "components": [
        {
            "label": "Tabs",
            "components": [
                {
                    "label": "Visuals",
                    "key": "tab1",
                    "components": [
                        {
                            "label": "Claim Reference/No.",
                            "widget": "",
                            "applyMaskOn": "change",
                            "autoExpand": false,
                            "tableView": true,
                            "validate": {
                                "required": true
                            },
                            "key": "claimReferenceNo",
                            "type": "textarea",
                            "rows": 1,
                            "input": true
                        },
                        {
                            "label": "Insured's Name",
                            "applyMaskOn": "change",
                            "tableView": true,
                            "validate": {
                                "required": true
                            },
                            "key": "insuredName",
                            "type": "textfield",
                            "input": true
                        },
                        {
                            "label": "Show me",
                            "tableView": false,
                            "key": "showMe",
                            "type": "checkbox",
                            "input": true,
                            "defaultValue": false
                        },
                        {
                            "label": "Survey",
                            "tableView": false,
                            "questions": [
                                {
                                    "label": "Did you eat steak",
                                    "value": "didYouEatSteak",
                                    "tooltip": ""
                                }
                            ],
                            "values": [
                                {
                                    "label": "Good",
                                    "value": "good",
                                    "tooltip": ""
                                },
                                {
                                    "label": "Bad",
                                    "value": "bad",
                                    "tooltip": ""
                                },
                                {
                                    "label": "Ugly",
                                    "value": "ugly",
                                    "tooltip": ""
                                }
                            ],
                            "key": "survey",
                            "customConditional": "show = !data.showMe",
                            "type": "survey",
                            "input": true
                        },
                        {
                            "title": "Personal Info",
                            "collapsible": false,
                            "key": "panel",
                            "conditional": {
                                "show": true,
                                "conjunction": "all",
                                "conditions": [
                                    {
                                        "component": "insuredsName",
                                        "operator": "isNotEmpty"
                                    }
                                ]
                            },
                            "type": "panel",
                            "label": "Panel",
                            "input": false,
                            "tableView": false,
                            "components": [
                                {
                                    "label": "First Name",
                                    "applyMaskOn": "change",
                                    "tableView": true,
                                    "key": "firstName",
                                    "type": "textfield",
                                    "input": true
                                },
                                {
                                    "label": "Married",
                                    "tableView": false,
                                    "key": "isMarried",
                                    "type": "checkbox",
                                    "input": true,
                                    "defaultValue": false
                                },
                                {
                                    "label": "Gender",
                                    "widget": "html5",
                                    "tableView": true,
                                    "data": {
                                        "values": [
                                            {
                                                "label": "Option 1",
                                                "value": "option1"
                                            },
                                            {
                                                "label": "Option 2",
                                                "value": "option2"
                                            },
                                            {
                                                "label": "Option 3",
                                                "value": "option3"
                                            }
                                        ]
                                    },
                                    "validate": {
                                        "required": true
                                    },
                                    "errorLabel": "Come on, you can do better!",
                                    "key": "gender",
                                    "type": "select",
                                    "input": true
                                },
                                {
                                    "label": "Password",
                                    "applyMaskOn": "change",
                                    "tableView": false,
                                    "validate": {
                                        "required": true
                                    },
                                    "key": "password",
                                    "conditional": {
                                        "show": true,
                                        "conjunction": "all",
                                        "conditions": [
                                            {
                                                "component": "whichApply",
                                                "operator": "isEqual",
                                                "value": "item2"
                                            }
                                        ]
                                    },
                                    "type": "password",
                                    "input": true,
                                    "protected": true
                                },
                                {
                                    "label": "Password",
                                    "applyMaskOn": "change",
                                    "tableView": false,
                                    "validate": {
                                        "custom": "valid = (input === data.password) ? true : 'Passwords must match';"
                                    },
                                    "key": "password1",
                                    "type": "password",
                                    "input": true,
                                    "protected": true
                                }
                            ]
                        },
                        {
                            "label": "Which Apply",
                            "optionsLabelPosition": "right",
                            "tableView": false,
                            "values": [
                                {
                                    "label": "Item 1",
                                    "value": "item1",
                                    "shortcut": "A"
                                },
                                {
                                    "label": "Item 2",
                                    "value": "item2",
                                    "shortcut": "B"
                                },
                                {
                                    "label": "Item 3",
                                    "value": "item3",
                                    "shortcut": "C"
                                }
                            ],
                            "key": "whichApply",
                            "conditional": {
                                "show": true,
                                "conjunction": "all"
                            },
                            "type": "selectboxes",
                            "input": true,
                            "inputType": "checkbox",
                            "defaultValue": {
                                "item1": false,
                                "item2": false,
                                "item3": false
                            }
                        },
                        {
                            "html": "<p><strong>Express Recoveries Terms and Conditions</strong></p><p>By submitting your matter through the W+K Express Recoveries Portal, you instruct Wotton + Kearney to undertake recovery action for you on the following terms and conditions:</p><p><strong>1. Fixed fee:&nbsp;</strong>For each express recovery matter (as defined in clause 2), Wotton + Kearney agrees to undertake the scope of work set out in clause 4, for the fixed fee set out in the table below corresponding to the relevant band for the total quantum of funds which we are instructed to seek to recover.</p><figure class=\"table\"><table><thead><tr><th><p style=\"margin-left:0cm;\"><span style=\"color:black;\"><strong>Band</strong></span></p></th><th><p style=\"margin-left:0cm;\"><span style=\"color:black;\"><strong>Fixed fee</strong></span></p></th></tr></thead><tbody><tr><td><p style=\"margin-left:0cm;\">For express recoveries &lt;$20,000</p></td><td><p style=\"margin-left:0cm;\">$1,<span style=\"color:black;\">200</span> ex GST, plus disbursements<i>&nbsp;</i></p></td></tr><tr><td><p style=\"margin-left:0cm;\">For express recoveries between $20k and $50k</p></td><td><p style=\"margin-left:0cm;\">$2,999 ex GST, plus disbursements</p></td></tr><tr><td><p style=\"margin-left:0cm;\">For express recoveries between $50k and $<span style=\"color:black;\">100</span>k</p></td><td><p style=\"margin-left:0cm;\">$4,999 ex GST, plus disbursements</p></td></tr><tr><td><p style=\"margin-left:0cm;\">For express recoveries over &gt;$100k</p></td><td><p style=\"margin-left:0cm;\">Agreed hourly rates</p></td></tr><tr><td><p style=\"margin-left:0cm;\">For instructions to litigate (any quantum)</p></td><td><p style=\"margin-left:0cm;\">Agreed hourly rates</p></td></tr></tbody></table></figure><p>&nbsp;</p><p><strong>2. Express recovery matters and exclusions:&nbsp;</strong>A qualifying express recovery is a matter which meets the following criteria:</p><p>2.1 &nbsp;you instruct us to seek recovery of funds you have paid in settling a claim involving impact damage to property (eg caused by other property or a motor vehicle);</p><p>2.2 &nbsp; the funds you seek to recover relate to loss and damage suffered by your insured;</p><p>2.3 &nbsp; no more than 3 years have passed since the date of loss;</p><p>2.4 &nbsp; there is no uninsured loss, besides the policy excess;</p><p>2.5 &nbsp; you submit the matter via this W+K Express Recoveries Portal;</p><p>2.6 &nbsp;based on available information, W+K is not conflicted in seeking to recover from a third party;</p><p>2.8 &nbsp;we agree the matter is an express recovery matter by confirming to you by email that we accept your instructions; and</p><p>2.9 &nbsp;the quantum of funds you instruct us to recover on your first instructions is ≤$100,000.</p><p><strong>3. Changes in eligibility:&nbsp;</strong>You acknowledge that in some cases, further information may come to light (after we confirm that we accept your instructions under clause 2.7 above) which means that the matter does not meet the qualifying criteria under clause 2 above (for example, where issue of an initial demand identifies another prospective third party/defendant, or we are made aware of uninsured losses to be claimed). At any time, matters which we, in our absolute discretion, determine to be complex matters, excluded or unsuitable for express recovery will take place at the hourly rates set out in your costs agreement (as defined under clause 7.2), if you instruct us to proceed. We will inform you in writing of any decision to re-classify a matter initially accepted as an express recovery as a complex matter or otherwise, and seek your instructions on how you wish to proceed. If you do not wish to proceed, the fixed fee set out in the table above remains payable.</p><p><strong>4. What’s included in an express recovery:&nbsp;</strong>Once we accept your instructions as an express recovery matter, Wotton + Kearney will undertake the following scope of work:</p><p>4.1 &nbsp;review the information provided and supporting documents, and verifying version of events with the insured for the purposes of issuing a demand;</p><p>4.2 &nbsp;conduct necessary investigations to identify a prospective third party (where not previously identified);</p><p>4.3 &nbsp;draft and send a letter of demand and up to two written follow-ups to a third party or their insurer, on your behalf, on Wotton + Kearney letterhead or email;</p><p>4.4 &nbsp;make up to 3 phone calls to a third party, or their insurer;</p><p>4.5 &nbsp;where a response is received from a third party, or their insurer, provide an update and brief outline of next steps to you; and</p><p>4.6 &nbsp;where a response is not received from a third party, provide a brief outline of potential next steps for your consideration.</p><p>4.7 &nbsp;At this point our retainer will end, unless otherwise agreed. &nbsp;Hourly rates as set out in your costs agreement (as defined under clause 7.2) will apply if you instruct us to:</p><p>4.8 &nbsp;engage in negotiation or settlement discussions with a third party or their insurer;</p><p>4.9 &nbsp;respond to a third party regarding disputes raised or requests for further information or requests for further documents;</p><p>4.10 take any further recovery action against a third party and/or their insurer;</p><p>4.11 take further recovery action against a third party;</p><p>4.12 commence legal proceedings against a third party and/or their insurer; and/or</p><p>4.13 perform any other tasks or take any other action.</p><p><strong>5. We don’t guarantee an outcome:&nbsp;</strong>We do not represent at any time that a particular recovery outcome will be obtained. Some or no funds may be recovered despite the merits of the recovery claim.</p><p><strong>6. What’s not included in an express recovery</strong>: To avoid any doubt, the express recovery work we agree to undertake for the fixed fee does not include (non-exhaustively):</p><p>6.1 &nbsp;liaising with an insured/broker regarding the claim, incident, loss; other than as set out in paragraphs&nbsp;4.1 and&nbsp;4.2 above;</p><p>6.2 &nbsp;updating any other stakeholders on the status or progress of a recovery, other than you (for example brokers, or the insured);</p><p>6.3 &nbsp;responding to disputes, or requests for further information by a third party or its representatives, including insurers;</p><p>6.4 &nbsp;engaging in negotiation or settlement discussions with the third party or its representatives, including insurers;</p><p>6.5 &nbsp;enforcement;</p><p>6.6 &nbsp;issuing or defending proceedings; and/or</p><p>6.7 &nbsp;disbursements.</p><p><strong>7. Other matters:</strong></p><p>7.1 &nbsp;In undertaking an express recovery, we may incur expenses or disbursements (being money which we pay or are liable to pay to others on your behalf). Expenses or disbursements may include search fees. You agree to pay disbursements incurred by us on an express recovery matter whether or not there is a recovery. We will bill you any such disbursements as and when incurred.</p><p>7.2 &nbsp;The terms and conditions of the existing engagement letter, master costs agreement or legal services agreement under which Wotton + Kearney has agreed to supply you with legal services (<strong>costs agreement</strong>) apply to express recoveries matters, irrespective of the name and form of that costs agreement. Despite any contrary term of that costs agreement, these terms and conditions form part of that costs agreement. For express recoveries, these terms and conditions prevail to the extent of any inconsistency with the existing terms and conditions of that costs agreement.</p><p>7.3 &nbsp;In these terms and conditions, ‘you’ means the Wotton + Kearney client which is a party to the costs agreement, and ‘your’ has a corresponding meaning; ‘we’ and ‘our’ means Wotton + Kearney Pty Ltd (ABN 94 632 932 131), an incorporated legal practice registered in Australia.</p><p>7.4 &nbsp;The person submitting the express recoveries request below and you represent and warrant that the submitter is authorised to submit the request and to accept these terms and conditions on your behalf.</p><p><strong>Note:</strong> We will confirm our assessment to you by email within 3 business days. Please note that the hourly rates set out in your costs agreement (as defined under clause 7.2) apply to all matters other than express&nbsp;</p>",
                            "label": "View Terms and Conditions",
                            "refreshOnChange": false,
                            "modalEdit": true,
                            "key": "termsAndConditions",
                            "type": "content",
                            "input": false,
                            "tableView": false
                        }
                    ]
                },
                {
                    "label": "Data",
                    "key": "data",
                    "components": [
                        {
                            "label": "Select Person",
                            "widget": "html5",
                            "tableView": true,
                            "dataSrc": "custom",
                            "data": {
                                "custom": "return Widgets.getOptionSet(\"jurisdictions\")\n"
                            },
                            "valueProperty": "name",
                            "template": "<span>{{ item.name }}</span>",
                            "refreshOn": "data",
                            "key": "selectPerson",
                            "type": "select",
                            "input": true
                        },
                        {
                            "label": "Your Organisation",
                            "applyMaskOn": "change",
                            "tableView": true,
                            "customDefaultValue": "console.log(\"-----=======--------======\",Widgets.userOrganisation());\nreturn Widgets.userOrganisation().name;",
                            "key": "yourOrganisation",
                            "type": "textfield",
                            "input": true
                        },
                        {
                            "label": "User Name",
                            "applyMaskOn": "change",
                            "tableView": true,
                            "customDefaultValue": "return Widgets.user().username()",
                            "key": "userName",
                            "type": "textfield",
                            "input": true
                        },
                        {
                            "label": "User Id",
                            "applyMaskOn": "change",
                            "tableView": true,
                            "customDefaultValue": "return $ui.pageContext.user.userid();",
                            "key": "userId",
                            "type": "textfield",
                            "input": true
                        },
                        {
                            "label": "Select Country",
                            "widget": "choicesjs",
                            "tableView": true,
                            "dataSrc": "custom",
                            "data": {
                                "custom": "return Widgets.getCountries()"
                            },
                            "idPath": "systemName",
                            "valueProperty": "name",
                            "template": "<span>{{ item.name }}</span>",
                            "key": "selectCountry",
                            "type": "select",
                            "input": true
                        }
                    ]
                }
            ],
            "key": "tabs",
            "type": "tabs",
            "input": false,
            "tableView": false
        },
        {
            "type": "button",
            "label": "Submit",
            "key": "submit",
            "disableOnInvalid": true,
            "input": true,
            "tableView": false
        }
    ]
};


/***/ }),

/***/ "../Common/Styling.ts":
/*!****************************!*\
  !*** ../Common/Styling.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDefaultFormIOStyleSheetsToIframe: () => (/* binding */ addDefaultFormIOStyleSheetsToIframe),
/* harmony export */   addDefaultFormIOStyleSheetsToShadow: () => (/* binding */ addDefaultFormIOStyleSheetsToShadow),
/* harmony export */   checkLowdashCompatability: () => (/* binding */ checkLowdashCompatability)
/* harmony export */ });
function addDefaultFormIOStyleSheetsToShadow(shadow) {
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
    shadow.appendChild(link);
    link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://cdn.form.io/formiojs/formio.full.min.css";
    shadow.appendChild(link);
    //<link rel="stylesheet" type="text/css" href="https://cdn.form.io/formiojs/formio.full.min.css">
    //<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
    //<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
    link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";
    shadow.appendChild(link);
}
function addDefaultFormIOStyleSheetsToIframe(iframe) {
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
    iframe.contentDocument.head.appendChild(link);
    link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://cdn.form.io/formiojs/formio.full.min.css";
    iframe.contentDocument.head.appendChild(link);
    link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";
    iframe.contentDocument.head.appendChild(link);
}
function checkLowdashCompatability() {
    //lowdash 4 and above has changed contains to includes
    //here we are just aliasing it back to contains for backwards compatibility
    if (!_.contains) {
        console.log("!_.contains");
    }
    if (!_.findWhere) {
        console.log("!_.findWhere");
    }
}
if (!_.contains) {
    _.contains = _.includes;
}
if (!_.findWhere) {
    _.findWhere = _.find;
}


/***/ }),

/***/ "./designer/DefaultForm.ts":
/*!*********************************!*\
  !*** ./designer/DefaultForm.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_FORM: () => (/* binding */ DEFAULT_FORM)
/* harmony export */ });
const DEFAULT_FORM = { "_id": "64f09a1b26b9aefee64fa1de", "title": "Basic Elements", "name": "BasicElements", "path": "basicelements", "type": "form", "display": "form", "tags": [], "access": [{ "type": "read_all", "roles": ["64eff57f57da848e7393cc32", "64eff57f57da848e7393cc38", "64eff57f57da848e7393cc3e"] }], "submissionAccess": [], "owner": "64eff50f57da848e7393c75d", "components": [{ "label": "Text Field 1", "applyMaskOn": "change", "tableView": true, "key": "textField1", "type": "textfield", "input": true }, { "label": "Text Area 1", "applyMaskOn": "change", "autoExpand": false, "tableView": true, "key": "textArea1", "type": "textarea", "input": true }, { "label": "Number 1", "applyMaskOn": "change", "mask": false, "tableView": false, "delimiter": false, "requireDecimal": false, "inputFormat": "plain", "truncateMultipleSpaces": false, "key": "number1", "type": "number", "input": true }, { "label": "Password 1", "applyMaskOn": "change", "tableView": false, "key": "password1", "type": "password", "input": true, "protected": true }, { "label": "Checkbox 1", "tableView": false, "key": "checkbox1", "type": "checkbox", "input": true, "defaultValue": false }, { "type": "button", "label": "Submit", "key": "submit", "disableOnInvalid": true, "input": true, "tableView": false }], "settings": {}, "properties": {}, "project": "64eff57f57da848e7393cc2b", "controller": "", "revisions": "", "submissionRevisions": "", "_vid": 0, "created": "2023-08-31T13:48:11.835Z", "modified": "2023-08-31T13:48:11.844Z", "machineName": "saehwyndnftzzmk:BasicElements", "plan": "trial" };


/***/ }),

/***/ "knockout":
/*!*********************!*\
  !*** external "ko" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = ko;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************************!*\
  !*** ./designer/FormWidgetDesigner.ts ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormWidgetDesigner: () => (/* binding */ FormWidgetDesigner),
/* harmony export */   FormWidgetDesignerClass: () => (/* binding */ FormWidgetDesignerClass)
/* harmony export */ });
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! knockout */ "knockout");
/* harmony import */ var knockout__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(knockout__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseClasses_Utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../BaseClasses/Utility */ "../../BaseClasses/Utility.ts");
/* harmony import */ var _DefaultForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultForm */ "./designer/DefaultForm.ts");
/* harmony import */ var _Common_FormioBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Common/FormioBuilder */ "../Common/FormioBuilder.ts");




function FormWidgetDesigner(element, configuration, baseModel) {
    return new FormWidgetDesignerClass(element, configuration, baseModel);
}
class FormWidgetDesignerClass {
    constructor(element, configuration, baseModel) {
        var _a, _b;
        this.designerCreated = false;
        this.title = ((_b = (_a = configuration === null || configuration === void 0 ? void 0 : configuration.blade) === null || _a === void 0 ? void 0 : _a.model) === null || _b === void 0 ? void 0 : _b.title) || baseModel.title;
        this.element = element;
        const defaults = {
            formBuilderDefinition: JSON.stringify(_DefaultForm__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_FORM, null, 4),
            broadcastOnSubmit: true,
            broadcastOnSubmitEventName: `${baseModel.systemName}.${(0,_BaseClasses_Utility__WEBPACK_IMPORTED_MODULE_1__.camelize)(this.title())}.onSubmit`,
            createWorkTypeOnSubmit: false,
            workItem: JSON.stringify({
                sharedoTypeSystemName: "instruction-b2b-dispute-plaintiff",
                titleIsUserProvided: false,
                reference: null,
                referenecIsUserProvided: false
            }, null, 4),
            aspectData: JSON.stringify({
                instructionWorkTypeDetails: {
                    caseSharedoTypeSystemName: "wk-matter-dispute-plaintiff-recoveries",
                    caseWorkTypeId: 500000284,
                    jurisdictionId: "func:formBuilder.selectedLocation",
                },
                incidentDetailsLocation: {
                    IncidentLocationId: "func:formBuilder.address",
                    IncidentTypeId: "['street']"
                }
            }, null, 4),
            keyDates: JSON.stringify({
                "kd-instruction-received": new Date()
            }, null, 4),
            participants: JSON.stringify([
                {
                    roleSystemName: "client-case-handler",
                    odsReference: $ui.pageContext.user.username(),
                    odsType: "person",
                    odsId: $ui.pageContext.user.userid()
                },
            ], null, 4)
        };
        const options = $.extend(true, {}, defaults, configuration);
        this.formBuilderDefinition = knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.formBuilderDefinition);
        console.log("options", options);
        this.model = {
            formBuilderDefinition: this.formBuilderDefinition,
            broadcastOnSubmit: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.broadcastOnSubmit),
            broadcastOnSubmitEventName: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.broadcastOnSubmitEventName),
            createWorkTypeOnSubmit: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.createWorkTypeOnSubmit),
            workItem: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.workItem),
            aspectData: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.aspectData),
            keyDates: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.keyDates),
            participants: knockout__WEBPACK_IMPORTED_MODULE_0__.observable(options.participants)
        };
        this.title.subscribe((newValue) => {
            this.model.broadcastOnSubmitEventName(`${baseModel.systemName}.${(0,_BaseClasses_Utility__WEBPACK_IMPORTED_MODULE_1__.camelize)(newValue)}.onSubmit`);
        });
        this.validationErrorCount = knockout__WEBPACK_IMPORTED_MODULE_0__.pureComputed(() => {
            return 0;
        });
        let id = "#formio-designer";
        this.designerDiv = this.element.querySelector(id);
        this.modelDialog = this.element.querySelector(".Widgets-FormWidgetDesigner.modal");
        // move model dialog to the body
        document.body.appendChild(this.modelDialog);
    }
    onDestroy() {
        // ...
    }
    loadAndBind() {
        // ...
    }
    getModel() {
        var koModel = knockout__WEBPACK_IMPORTED_MODULE_0__.toJS(this.model);
        return koModel;
    }
    onFocusOut(data, event) {
        let id = event.target.parentElement.id;
        let koObject = this.model[id];
        try {
            let newValue = JSON.stringify(JSON.parse(koObject()), null, 4);
            koObject(newValue);
        }
        catch (e) {
            console.log("error", e);
        }
    }
    ;
    checkComplex() {
        if (this.designerCreated) {
            // return;
        }
        this.designerCreated = true;
        this.designerDiv.innerHTML;
        (0,_Common_FormioBuilder__WEBPACK_IMPORTED_MODULE_3__.createFormBuilderPage)(this.designerDiv, this.formBuilderDefinition()).promise.then((formBuilder) => {
            this.formBuilder = formBuilder;
            window.formBuilder = formBuilder;
            formBuilder.instance.on('change', () => {
                this.formBuilderDefinition(JSON.stringify(formBuilder.instance.schema, null, 2));
            });
        });
        // window.open("http://127.0.0.1:5500/src/WebBased/Tester/FormIOBuilder/page.html", "_blank");
    }
}

})();

var __webpack_export_target__ = (Widgets = typeof Widgets === "undefined" ? {} : Widgets);
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckYsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUdILDhGQUE4RjtJQUdsRyxDQUFDO0NBRUoiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9XaWRnZXRzLy4uLy4uL0Jhc2VDbGFzc2VzL1V0aWxpdHkudHMiLCJ3ZWJwYWNrOi8vV2lkZ2V0cy8uLi8uLi9Db21tb24vRGlmZmVyZWRQcm9taXNlLnRzIiwid2VicGFjazovL1dpZGdldHMvLi4vQ29tbW9uL0Zvcm1pb0J1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vV2lkZ2V0cy8uLi9Db21tb24vU3R5bGluZy50cyIsIndlYnBhY2s6Ly9XaWRnZXRzLy4vZGVzaWduZXIvRGVmYXVsdEZvcm0udHMiLCJ3ZWJwYWNrOi8vV2lkZ2V0cy9leHRlcm5hbCB2YXIgXCJrb1wiIiwid2VicGFjazovL1dpZGdldHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vV2lkZ2V0cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9XaWRnZXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9XaWRnZXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vV2lkZ2V0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1dpZGdldHMvLi9kZXNpZ25lci9Gb3JtV2lkZ2V0RGVzaWduZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cbmV4cG9ydCBmdW5jdGlvbiBjYW1lbGl6ZShzdHI6IHN0cmluZykge1xuICBpZiAoIXN0cikgcmV0dXJuIHN0cjtcblxuICByZXR1cm4gc3RyLnJlcGxhY2UoLyg/Ol5cXHd8W0EtWl18XFxiXFx3KS9nLCBmdW5jdGlvbiAod29yZCwgaW5kZXgpIHtcbiAgICByZXR1cm4gaW5kZXggPT09IDAgPyB3b3JkLnRvTG93ZXJDYXNlKCkgOiB3b3JkLnRvVXBwZXJDYXNlKCk7XG4gIH0pLnJlcGxhY2UoL1xccysvZywgJycpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhbkpTT04ocmF3RGF0YTogc3RyaW5nKSB7XG5cbiAgLy8gUmVtb3ZlIHN1cnJvdW5kaW5nIDxwPiB0YWdzLCBuZXdsaW5lIHJlcHJlc2VudGF0aW9ucywgYW5kICZuYnNwO1xuICBsZXQgY2xlYW5lZFN0cmluZyA9IHJhd0RhdGEucmVwbGFjZSgvXjxwPnw8XFwvcD58XFwvbnwmbmJzcDsvZywgJycpLnRyaW0oKTtcblxuICAvLyBHaXZlbiB0aGF0IEpTT04ga2V5cyBzaG91bGQgYmUgd3JhcHBlZCBpbiBkb3VibGUgcXVvdGVzLCBidXQgdmFsdWVzIGNvdWxkIGFscmVhZHkgY29udGFpbiB0aGVtLFxuICAvLyB3ZSdsbCB1c2UgYSByZWdleCB0byBtYXRjaCB0aGUgcGF0dGVybiBvZiBhIGtleSBmb2xsb3dlZCBieSBhIGNvbG9uLlxuICBsZXQgdmFsaWRKc29uU3RyaW5nID0gY2xlYW5lZFN0cmluZy5yZXBsYWNlKC8oPzwhXCIpKFxcYlxcdytcXGIpKD89OikvZywgJ1wiJDFcIicpO1xuXG4gIC8vIFRoZSBhYm92ZSB3aWxsIGhhbmRsZSB0aGUgSlNPTiBrZXlzLiBMZXQncyBhc3N1bWUgdGhlIHZhbHVlcyBhcmUgYWxyZWFkeSBjb3JyZWN0bHkgZm9ybWF0dGVkLlxuICAvLyBJZiB0aGV5IGFyZW4ndCwgdGhpcyBjYW4gZ2V0IGEgbG90IHRyaWNraWVyLlxuXG4gIHRyeSB7XG4gICAgbGV0IGpzb25PYmplY3QgPSBKU09OLnBhcnNlKHZhbGlkSnNvblN0cmluZyk7XG4gICAgY29uc29sZS5sb2coanNvbk9iamVjdCk7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGpzb25PYmplY3QsIG51bGwsIDIpO1xuICB9IGNhdGNoIChlcnJvcjphbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBKU09OOlwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICByZXR1cm4gZXJyb3IubWVzc2FnZTtcbiAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIERlZmVycmVkUHJvbWlzZTxUPiB7XG4gICAgcHJvbWlzZTogUHJvbWlzZTxUPjtcbiAgICByZXNvbHZlITogKHZhbHVlPzogVCB8IFByb21pc2VMaWtlPFQ+KSA9PiB2b2lkO1xuICAgIHJlamVjdCE6IChyZWFzb24/OiBhbnkpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgLy8gVHlwZSBhc3NlcnRpb25zIGhlcmUgdG8gc2F0aXNmeSBUeXBlU2NyaXB0J3Mgc3RyaWN0IGNoZWNrcy5cbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmUgYXMgYW55O1xuICAgICAgICAgICAgdGhpcy5yZWplY3QgPSByZWplY3Q7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEZvcm1CdWlsZGVyIH0gZnJvbSBcImZvcm1pb2pzXCI7XG5pbXBvcnQgeyBhZGREZWZhdWx0Rm9ybUlPU3R5bGVTaGVldHNUb0lmcmFtZSwgY2hlY2tMb3dkYXNoQ29tcGF0YWJpbGl0eSB9IGZyb20gXCIuL1N0eWxpbmdcIjtcbmltcG9ydCB7IERlZmVycmVkUHJvbWlzZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRGlmZmVyZWRQcm9taXNlXCI7XG5pbXBvcnQgeyBkZWZhdWx0Rm9ybWF0IH0gZnJvbSBcIm1vbWVudFwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb3JtQnVpbGRlclBhZ2UoZWxlbWVudDogRWxlbWVudCxzY2hlbWE6IHN0cmluZykgOiBEZWZlcnJlZFByb21pc2U8Rm9ybUJ1aWxkZXI+IHtcbiAgICAvL2NyZXJhdGUgYSBpZnJhbWUgdXNpbmcgdGhlIGh0bWwgYW5kIGluc2VydCBpdCBpbnRvIHRoZSBlbGVtZW50XG4gICAgY2hlY2tMb3dkYXNoQ29tcGF0YWJpbGl0eSgpO1xuXG4gICAgY29uc3QgZGVmZXJyZWQgPSBuZXcgRGVmZXJyZWRQcm9taXNlPEZvcm1CdWlsZGVyPigpO1xuXG4gICAgbGV0IGxvYWRpbmdEaXYgPSBhZGRMb2FkaW5nTWVzc2FnZShlbGVtZW50KTtcbiAgICAvL2NoZWNrIGlmIGlmcmFtZSBhbHJlYWR5IGV4aXN0c1xuICAgIGxldCBpZnJhbWUgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpZnJhbWVcIik7XG4gICAgaWYgKGlmcmFtZSkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgfVxuIFxuXG4gICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiL19pZGVGaWxlcy9XaWRnZXRzL0Zvcm1XaWRnZXQvRm9ybUlPQnVpbGRlci9wYWdlLmh0bWxcIik7XG4gICAgaWZyYW1lLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFwiMTAwJVwiKTtcblxuICAgIC8vZnJhbWVib3JkZXI9XCIwXCIgc2Nyb2xsaW5nPVwibm9cIiBcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKFwiZnJhbWVib3JkZXJcIiwgXCIwXCIpO1xuICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoXCJzY3JvbGxpbmdcIiwgXCJub1wiKTtcblxuICAgIFxuXG4gICAgaWZyYW1lLmNsYXNzTGlzdC5hZGQoXCJmb3JtaW8tYnVpbGRlci1pZnJhbWVcIik7XG4gICAgZGVmZXJyZWQucHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgbG9hZGluZ0Rpdi5yZW1vdmUoKTtcbiAgICAgICAgaWZyYW1lIS5jbGFzc0xpc3QuYWRkKFwibG9hZGVkXCIpO1xuICAgIH0pO1xuXG4gICAgLy9nZXQgY3VycmVudCB3aW5kb3cgaGVpZ2h0XG4gICAgbGV0IHNjcmVlbkhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0OztcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsIHNjcmVlbkhlaWdodC50b1N0cmluZygpKTtcblxuICAgIC8vbW9uaXRvciBzY3JlZW4gaGVpZ2h0IGFuZCByZXNpemUgaWZyYW1lXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKCFpZnJhbWUpIHsgcmV0dXJuOyB9XG4gICAgICAgIGxldCBzY3JlZW5IZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDs7XG4gICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgc2NyZWVuSGVpZ2h0LnRvU3RyaW5nKCkpO1xuICAgIH0pO1xuXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgIGlmcmFtZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghaWZyYW1lKSB7IHJldHVybjsgfVxuICAgICAgICByZW5kZXIoaWZyYW1lLHNjaGVtYSxkZWZlcnJlZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmVycmVkO1xuXG59XG5cbmZ1bmN0aW9uIHJlbmRlcihpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LHNjaGVtYTpzdHJpbmcgfCB1bmRlZmluZWQsZGVmZXJyZWQgIDogRGVmZXJyZWRQcm9taXNlPEZvcm1CdWlsZGVyPikge1xuICAgIGxldCBmb3JtaW9JZCA9IFwiI2Zvcm1pb1wiO1xuICAgIGlmICghaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgaWZyYW1lLmNvbnRlbnRXaW5kb3dcIik7XG4gICAgfVxuXG4gICAgbGV0IGZvcm1pb0RpdiA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZm9ybWlvSWQpO1xuXG4gICAgaWYgKCFmb3JtaW9EaXYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZpbmQgZWxlbWVudCB3aXRoIGlkIFwiICsgZm9ybWlvSWQpO1xuICAgIH1cbiAgICAvLyBhZGREZWZhdWx0Rm9ybUlPU3R5bGVTaGVldHNUb0lmcmFtZShpZnJhbWUpO1xuXG4gICAvLyBsZXQgZmI9ICBuZXcgRm9ybUJ1aWxkZXIoZm9ybWlvRGl2LCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG5cbiAgICBcbiAgIFxuICAgIC8vIGxldCBmb3JtQnVpbGRlciA9IChpZnJhbWUuY29udGVudFdpbmRvdyBhcyBhbnkpW1wiZm9ybUJ1aWxkZXJcIl0gYXMgRm9ybUJ1aWxkZXI7XG4gICAgLy8gKHdpbmRvdyBhcyBhbnkpW1wiRkJcIl0gPSBmb3JtQnVpbGRlcjtcbiAgICAvLyAod2luZG93IGFzIGFueSlbXCJmb3JtaW9EaXZcIl0gPSBmb3JtaW9EaXY7XG4gICAgLy8gZGVmZXJyZWQucmVzb2x2ZShmb3JtQnVpbGRlcik7XG4gICAgXG4gICAgaWYoKGlmcmFtZSBhcyBhbnkpLmJ1aWx0ID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAoaWZyYW1lLmNvbnRlbnRXaW5kb3cgYXMgYW55KS5idWlsZChkZWZlcnJlZCxzY2hlbWEpO1xuICAgIChpZnJhbWUgYXMgYW55KS5idWlsdCA9IHRydWU7XG59XG5cblxuZnVuY3Rpb24gYWRkTG9hZGluZ01lc3NhZ2UoZWxlbWVudDogRWxlbWVudCkgOiBIVE1MRGl2RWxlbWVudFxue1xuICAgIGxldCBsb2FkaW5nTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbG9hZGluZ01lc3NhZ2Uuc2V0QXR0cmlidXRlKFwiaWRcIixcImxvYWRpbmdNZXNzYWdlXCIpO1xuICAgIGxvYWRpbmdNZXNzYWdlLmlubmVyVGV4dCA9IFwiTG9hZGluZy4uLlwiO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9hZGluZ01lc3NhZ2UpO1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQobG9hZGluZ01lc3NhZ2UpO1xuICAgIHJldHVybiBsb2FkaW5nTWVzc2FnZVxufVxuXG5leHBvcnQgY29uc3QgZXhhbXBsZUZvcm1Db21wb25lbnRzPXtcblxuICAgICAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibGFiZWxcIjogXCJUYWJzXCIsXG4gICAgICAgICAgICAgICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIlZpc3VhbHNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6IFwidGFiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wb25lbnRzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogXCJDbGFpbSBSZWZlcmVuY2UvTm8uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkZ2V0XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbHlNYXNrT25cIjogXCJjaGFuZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhdXRvRXhwYW5kXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhYmxlVmlld1wiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbGlkYXRlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOiBcImNsYWltUmVmZXJlbmNlTm9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwidGV4dGFyZWFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyb3dzXCI6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5wdXRcIjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IFwiSW5zdXJlZCdzIE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBseU1hc2tPblwiOiBcImNoYW5nZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhYmxlVmlld1wiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbGlkYXRlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOiBcImluc3VyZWROYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRmaWVsZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlucHV0XCI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIlNob3cgbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWJsZVZpZXdcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6IFwic2hvd01lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNoZWNrYm94XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5wdXRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkZWZhdWx0VmFsdWVcIjogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIlN1cnZleVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhYmxlVmlld1wiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJxdWVzdGlvbnNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogXCJEaWQgeW91IGVhdCBzdGVha1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJkaWRZb3VFYXRTdGVha1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG9vbHRpcFwiOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IFwiR29vZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJnb29kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b29sdGlwXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIkJhZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJiYWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRvb2x0aXBcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IFwiVWdseVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJ1Z2x5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b29sdGlwXCI6IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIjogXCJzdXJ2ZXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXN0b21Db25kaXRpb25hbFwiOiBcInNob3cgPSAhZGF0YS5zaG93TWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3VydmV5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5wdXRcIjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiUGVyc29uYWwgSW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbGxhcHNpYmxlXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOiBcInBhbmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29uZGl0aW9uYWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbmp1bmN0aW9uXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbmRpdGlvbnNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wb25lbnRcIjogXCJpbnN1cmVkc05hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvcGVyYXRvclwiOiBcImlzTm90RW1wdHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicGFuZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIlBhbmVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5wdXRcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFibGVWaWV3XCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogXCJGaXJzdCBOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBseU1hc2tPblwiOiBcImNoYW5nZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFibGVWaWV3XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIjogXCJmaXJzdE5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0ZmllbGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlucHV0XCI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIk1hcnJpZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRhYmxlVmlld1wiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOiBcImlzTWFycmllZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNoZWNrYm94XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVmYXVsdFZhbHVlXCI6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogXCJHZW5kZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZGdldFwiOiBcImh0bWw1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWJsZVZpZXdcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIk9wdGlvbiAxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIm9wdGlvbjFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IFwiT3B0aW9uIDJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwib3B0aW9uMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogXCJPcHRpb24gM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJvcHRpb24zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZGF0ZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVxdWlyZWRcIjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlcnJvckxhYmVsXCI6IFwiQ29tZSBvbiwgeW91IGNhbiBkbyBiZXR0ZXIhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIjogXCJnZW5kZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZWxlY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlucHV0XCI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIlBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBseU1hc2tPblwiOiBcImNoYW5nZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFibGVWaWV3XCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsaWRhdGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcXVpcmVkXCI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6IFwicGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbmRpdGlvbmFsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29uanVuY3Rpb25cIjogXCJhbGxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb25kaXRpb25zXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBvbmVudFwiOiBcIndoaWNoQXBwbHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9wZXJhdG9yXCI6IFwiaXNFcXVhbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJpdGVtMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvdGVjdGVkXCI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIlBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBseU1hc2tPblwiOiBcImNoYW5nZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFibGVWaWV3XCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsaWRhdGVcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1c3RvbVwiOiBcInZhbGlkID0gKGlucHV0ID09PSBkYXRhLnBhc3N3b3JkKSA/IHRydWUgOiAnUGFzc3dvcmRzIG11c3QgbWF0Y2gnO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOiBcInBhc3N3b3JkMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvdGVjdGVkXCI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IFwiV2hpY2ggQXBwbHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvcHRpb25zTGFiZWxQb3NpdGlvblwiOiBcInJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFibGVWaWV3XCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIkl0ZW0gMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJpdGVtMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvcnRjdXRcIjogXCJBXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIkl0ZW0gMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJpdGVtMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvcnRjdXRcIjogXCJCXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIkl0ZW0gM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJpdGVtM1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvcnRjdXRcIjogXCJDXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIjogXCJ3aGljaEFwcGx5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29uZGl0aW9uYWxcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbmp1bmN0aW9uXCI6IFwiYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2VsZWN0Ym94ZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlucHV0VHlwZVwiOiBcImNoZWNrYm94XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVmYXVsdFZhbHVlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaXRlbTFcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIml0ZW0yXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpdGVtM1wiOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaHRtbFwiOiBcIjxwPjxzdHJvbmc+RXhwcmVzcyBSZWNvdmVyaWVzIFRlcm1zIGFuZCBDb25kaXRpb25zPC9zdHJvbmc+PC9wPjxwPkJ5IHN1Ym1pdHRpbmcgeW91ciBtYXR0ZXIgdGhyb3VnaCB0aGUgVytLIEV4cHJlc3MgUmVjb3ZlcmllcyBQb3J0YWwsIHlvdSBpbnN0cnVjdCBXb3R0b24gKyBLZWFybmV5IHRvIHVuZGVydGFrZSByZWNvdmVyeSBhY3Rpb24gZm9yIHlvdSBvbiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zOjwvcD48cD48c3Ryb25nPjEuIEZpeGVkIGZlZTombmJzcDs8L3N0cm9uZz5Gb3IgZWFjaCBleHByZXNzIHJlY292ZXJ5IG1hdHRlciAoYXMgZGVmaW5lZCBpbiBjbGF1c2UgMiksIFdvdHRvbiArIEtlYXJuZXkgYWdyZWVzIHRvIHVuZGVydGFrZSB0aGUgc2NvcGUgb2Ygd29yayBzZXQgb3V0IGluIGNsYXVzZSA0LCBmb3IgdGhlIGZpeGVkIGZlZSBzZXQgb3V0IGluIHRoZSB0YWJsZSBiZWxvdyBjb3JyZXNwb25kaW5nIHRvIHRoZSByZWxldmFudCBiYW5kIGZvciB0aGUgdG90YWwgcXVhbnR1bSBvZiBmdW5kcyB3aGljaCB3ZSBhcmUgaW5zdHJ1Y3RlZCB0byBzZWVrIHRvIHJlY292ZXIuPC9wPjxmaWd1cmUgY2xhc3M9XFxcInRhYmxlXFxcIj48dGFibGU+PHRoZWFkPjx0cj48dGg+PHAgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OjBjbTtcXFwiPjxzcGFuIHN0eWxlPVxcXCJjb2xvcjpibGFjaztcXFwiPjxzdHJvbmc+QmFuZDwvc3Ryb25nPjwvc3Bhbj48L3A+PC90aD48dGg+PHAgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OjBjbTtcXFwiPjxzcGFuIHN0eWxlPVxcXCJjb2xvcjpibGFjaztcXFwiPjxzdHJvbmc+Rml4ZWQgZmVlPC9zdHJvbmc+PC9zcGFuPjwvcD48L3RoPjwvdHI+PC90aGVhZD48dGJvZHk+PHRyPjx0ZD48cCBzdHlsZT1cXFwibWFyZ2luLWxlZnQ6MGNtO1xcXCI+Rm9yIGV4cHJlc3MgcmVjb3ZlcmllcyAmbHQ7JDIwLDAwMDwvcD48L3RkPjx0ZD48cCBzdHlsZT1cXFwibWFyZ2luLWxlZnQ6MGNtO1xcXCI+JDEsPHNwYW4gc3R5bGU9XFxcImNvbG9yOmJsYWNrO1xcXCI+MjAwPC9zcGFuPiBleCBHU1QsIHBsdXMgZGlzYnVyc2VtZW50czxpPiZuYnNwOzwvaT48L3A+PC90ZD48L3RyPjx0cj48dGQ+PHAgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OjBjbTtcXFwiPkZvciBleHByZXNzIHJlY292ZXJpZXMgYmV0d2VlbiAkMjBrIGFuZCAkNTBrPC9wPjwvdGQ+PHRkPjxwIHN0eWxlPVxcXCJtYXJnaW4tbGVmdDowY207XFxcIj4kMiw5OTkgZXggR1NULCBwbHVzIGRpc2J1cnNlbWVudHM8L3A+PC90ZD48L3RyPjx0cj48dGQ+PHAgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OjBjbTtcXFwiPkZvciBleHByZXNzIHJlY292ZXJpZXMgYmV0d2VlbiAkNTBrIGFuZCAkPHNwYW4gc3R5bGU9XFxcImNvbG9yOmJsYWNrO1xcXCI+MTAwPC9zcGFuPms8L3A+PC90ZD48dGQ+PHAgc3R5bGU9XFxcIm1hcmdpbi1sZWZ0OjBjbTtcXFwiPiQ0LDk5OSBleCBHU1QsIHBsdXMgZGlzYnVyc2VtZW50czwvcD48L3RkPjwvdHI+PHRyPjx0ZD48cCBzdHlsZT1cXFwibWFyZ2luLWxlZnQ6MGNtO1xcXCI+Rm9yIGV4cHJlc3MgcmVjb3ZlcmllcyBvdmVyICZndDskMTAwazwvcD48L3RkPjx0ZD48cCBzdHlsZT1cXFwibWFyZ2luLWxlZnQ6MGNtO1xcXCI+QWdyZWVkIGhvdXJseSByYXRlczwvcD48L3RkPjwvdHI+PHRyPjx0ZD48cCBzdHlsZT1cXFwibWFyZ2luLWxlZnQ6MGNtO1xcXCI+Rm9yIGluc3RydWN0aW9ucyB0byBsaXRpZ2F0ZSAoYW55IHF1YW50dW0pPC9wPjwvdGQ+PHRkPjxwIHN0eWxlPVxcXCJtYXJnaW4tbGVmdDowY207XFxcIj5BZ3JlZWQgaG91cmx5IHJhdGVzPC9wPjwvdGQ+PC90cj48L3Rib2R5PjwvdGFibGU+PC9maWd1cmU+PHA+Jm5ic3A7PC9wPjxwPjxzdHJvbmc+Mi4gRXhwcmVzcyByZWNvdmVyeSBtYXR0ZXJzIGFuZCBleGNsdXNpb25zOiZuYnNwOzwvc3Ryb25nPkEgcXVhbGlmeWluZyBleHByZXNzIHJlY292ZXJ5IGlzIGEgbWF0dGVyIHdoaWNoIG1lZXRzIHRoZSBmb2xsb3dpbmcgY3JpdGVyaWE6PC9wPjxwPjIuMSAmbmJzcDt5b3UgaW5zdHJ1Y3QgdXMgdG8gc2VlayByZWNvdmVyeSBvZiBmdW5kcyB5b3UgaGF2ZSBwYWlkIGluIHNldHRsaW5nIGEgY2xhaW0gaW52b2x2aW5nIGltcGFjdCBkYW1hZ2UgdG8gcHJvcGVydHkgKGVnIGNhdXNlZCBieSBvdGhlciBwcm9wZXJ0eSBvciBhIG1vdG9yIHZlaGljbGUpOzwvcD48cD4yLjIgJm5ic3A7IHRoZSBmdW5kcyB5b3Ugc2VlayB0byByZWNvdmVyIHJlbGF0ZSB0byBsb3NzIGFuZCBkYW1hZ2Ugc3VmZmVyZWQgYnkgeW91ciBpbnN1cmVkOzwvcD48cD4yLjMgJm5ic3A7IG5vIG1vcmUgdGhhbiAzIHllYXJzIGhhdmUgcGFzc2VkIHNpbmNlIHRoZSBkYXRlIG9mIGxvc3M7PC9wPjxwPjIuNCAmbmJzcDsgdGhlcmUgaXMgbm8gdW5pbnN1cmVkIGxvc3MsIGJlc2lkZXMgdGhlIHBvbGljeSBleGNlc3M7PC9wPjxwPjIuNSAmbmJzcDsgeW91IHN1Ym1pdCB0aGUgbWF0dGVyIHZpYSB0aGlzIFcrSyBFeHByZXNzIFJlY292ZXJpZXMgUG9ydGFsOzwvcD48cD4yLjYgJm5ic3A7YmFzZWQgb24gYXZhaWxhYmxlIGluZm9ybWF0aW9uLCBXK0sgaXMgbm90IGNvbmZsaWN0ZWQgaW4gc2Vla2luZyB0byByZWNvdmVyIGZyb20gYSB0aGlyZCBwYXJ0eTs8L3A+PHA+Mi44ICZuYnNwO3dlIGFncmVlIHRoZSBtYXR0ZXIgaXMgYW4gZXhwcmVzcyByZWNvdmVyeSBtYXR0ZXIgYnkgY29uZmlybWluZyB0byB5b3UgYnkgZW1haWwgdGhhdCB3ZSBhY2NlcHQgeW91ciBpbnN0cnVjdGlvbnM7IGFuZDwvcD48cD4yLjkgJm5ic3A7dGhlIHF1YW50dW0gb2YgZnVuZHMgeW91IGluc3RydWN0IHVzIHRvIHJlY292ZXIgb24geW91ciBmaXJzdCBpbnN0cnVjdGlvbnMgaXMg4omkJDEwMCwwMDAuPC9wPjxwPjxzdHJvbmc+My4gQ2hhbmdlcyBpbiBlbGlnaWJpbGl0eTombmJzcDs8L3N0cm9uZz5Zb3UgYWNrbm93bGVkZ2UgdGhhdCBpbiBzb21lIGNhc2VzLCBmdXJ0aGVyIGluZm9ybWF0aW9uIG1heSBjb21lIHRvIGxpZ2h0IChhZnRlciB3ZSBjb25maXJtIHRoYXQgd2UgYWNjZXB0IHlvdXIgaW5zdHJ1Y3Rpb25zIHVuZGVyIGNsYXVzZSAyLjcgYWJvdmUpIHdoaWNoIG1lYW5zIHRoYXQgdGhlIG1hdHRlciBkb2VzIG5vdCBtZWV0IHRoZSBxdWFsaWZ5aW5nIGNyaXRlcmlhIHVuZGVyIGNsYXVzZSAyIGFib3ZlIChmb3IgZXhhbXBsZSwgd2hlcmUgaXNzdWUgb2YgYW4gaW5pdGlhbCBkZW1hbmQgaWRlbnRpZmllcyBhbm90aGVyIHByb3NwZWN0aXZlIHRoaXJkIHBhcnR5L2RlZmVuZGFudCwgb3Igd2UgYXJlIG1hZGUgYXdhcmUgb2YgdW5pbnN1cmVkIGxvc3NlcyB0byBiZSBjbGFpbWVkKS4gQXQgYW55IHRpbWUsIG1hdHRlcnMgd2hpY2ggd2UsIGluIG91ciBhYnNvbHV0ZSBkaXNjcmV0aW9uLCBkZXRlcm1pbmUgdG8gYmUgY29tcGxleCBtYXR0ZXJzLCBleGNsdWRlZCBvciB1bnN1aXRhYmxlIGZvciBleHByZXNzIHJlY292ZXJ5IHdpbGwgdGFrZSBwbGFjZSBhdCB0aGUgaG91cmx5IHJhdGVzIHNldCBvdXQgaW4geW91ciBjb3N0cyBhZ3JlZW1lbnQgKGFzIGRlZmluZWQgdW5kZXIgY2xhdXNlIDcuMiksIGlmIHlvdSBpbnN0cnVjdCB1cyB0byBwcm9jZWVkLiBXZSB3aWxsIGluZm9ybSB5b3UgaW4gd3JpdGluZyBvZiBhbnkgZGVjaXNpb24gdG8gcmUtY2xhc3NpZnkgYSBtYXR0ZXIgaW5pdGlhbGx5IGFjY2VwdGVkIGFzIGFuIGV4cHJlc3MgcmVjb3ZlcnkgYXMgYSBjb21wbGV4IG1hdHRlciBvciBvdGhlcndpc2UsIGFuZCBzZWVrIHlvdXIgaW5zdHJ1Y3Rpb25zIG9uIGhvdyB5b3Ugd2lzaCB0byBwcm9jZWVkLiBJZiB5b3UgZG8gbm90IHdpc2ggdG8gcHJvY2VlZCwgdGhlIGZpeGVkIGZlZSBzZXQgb3V0IGluIHRoZSB0YWJsZSBhYm92ZSByZW1haW5zIHBheWFibGUuPC9wPjxwPjxzdHJvbmc+NC4gV2hhdOKAmXMgaW5jbHVkZWQgaW4gYW4gZXhwcmVzcyByZWNvdmVyeTombmJzcDs8L3N0cm9uZz5PbmNlIHdlIGFjY2VwdCB5b3VyIGluc3RydWN0aW9ucyBhcyBhbiBleHByZXNzIHJlY292ZXJ5IG1hdHRlciwgV290dG9uICsgS2Vhcm5leSB3aWxsIHVuZGVydGFrZSB0aGUgZm9sbG93aW5nIHNjb3BlIG9mIHdvcms6PC9wPjxwPjQuMSAmbmJzcDtyZXZpZXcgdGhlIGluZm9ybWF0aW9uIHByb3ZpZGVkIGFuZCBzdXBwb3J0aW5nIGRvY3VtZW50cywgYW5kIHZlcmlmeWluZyB2ZXJzaW9uIG9mIGV2ZW50cyB3aXRoIHRoZSBpbnN1cmVkIGZvciB0aGUgcHVycG9zZXMgb2YgaXNzdWluZyBhIGRlbWFuZDs8L3A+PHA+NC4yICZuYnNwO2NvbmR1Y3QgbmVjZXNzYXJ5IGludmVzdGlnYXRpb25zIHRvIGlkZW50aWZ5IGEgcHJvc3BlY3RpdmUgdGhpcmQgcGFydHkgKHdoZXJlIG5vdCBwcmV2aW91c2x5IGlkZW50aWZpZWQpOzwvcD48cD40LjMgJm5ic3A7ZHJhZnQgYW5kIHNlbmQgYSBsZXR0ZXIgb2YgZGVtYW5kIGFuZCB1cCB0byB0d28gd3JpdHRlbiBmb2xsb3ctdXBzIHRvIGEgdGhpcmQgcGFydHkgb3IgdGhlaXIgaW5zdXJlciwgb24geW91ciBiZWhhbGYsIG9uIFdvdHRvbiArIEtlYXJuZXkgbGV0dGVyaGVhZCBvciBlbWFpbDs8L3A+PHA+NC40ICZuYnNwO21ha2UgdXAgdG8gMyBwaG9uZSBjYWxscyB0byBhIHRoaXJkIHBhcnR5LCBvciB0aGVpciBpbnN1cmVyOzwvcD48cD40LjUgJm5ic3A7d2hlcmUgYSByZXNwb25zZSBpcyByZWNlaXZlZCBmcm9tIGEgdGhpcmQgcGFydHksIG9yIHRoZWlyIGluc3VyZXIsIHByb3ZpZGUgYW4gdXBkYXRlIGFuZCBicmllZiBvdXRsaW5lIG9mIG5leHQgc3RlcHMgdG8geW91OyBhbmQ8L3A+PHA+NC42ICZuYnNwO3doZXJlIGEgcmVzcG9uc2UgaXMgbm90IHJlY2VpdmVkIGZyb20gYSB0aGlyZCBwYXJ0eSwgcHJvdmlkZSBhIGJyaWVmIG91dGxpbmUgb2YgcG90ZW50aWFsIG5leHQgc3RlcHMgZm9yIHlvdXIgY29uc2lkZXJhdGlvbi48L3A+PHA+NC43ICZuYnNwO0F0IHRoaXMgcG9pbnQgb3VyIHJldGFpbmVyIHdpbGwgZW5kLCB1bmxlc3Mgb3RoZXJ3aXNlIGFncmVlZC4gJm5ic3A7SG91cmx5IHJhdGVzIGFzIHNldCBvdXQgaW4geW91ciBjb3N0cyBhZ3JlZW1lbnQgKGFzIGRlZmluZWQgdW5kZXIgY2xhdXNlIDcuMikgd2lsbCBhcHBseSBpZiB5b3UgaW5zdHJ1Y3QgdXMgdG86PC9wPjxwPjQuOCAmbmJzcDtlbmdhZ2UgaW4gbmVnb3RpYXRpb24gb3Igc2V0dGxlbWVudCBkaXNjdXNzaW9ucyB3aXRoIGEgdGhpcmQgcGFydHkgb3IgdGhlaXIgaW5zdXJlcjs8L3A+PHA+NC45ICZuYnNwO3Jlc3BvbmQgdG8gYSB0aGlyZCBwYXJ0eSByZWdhcmRpbmcgZGlzcHV0ZXMgcmFpc2VkIG9yIHJlcXVlc3RzIGZvciBmdXJ0aGVyIGluZm9ybWF0aW9uIG9yIHJlcXVlc3RzIGZvciBmdXJ0aGVyIGRvY3VtZW50czs8L3A+PHA+NC4xMCB0YWtlIGFueSBmdXJ0aGVyIHJlY292ZXJ5IGFjdGlvbiBhZ2FpbnN0IGEgdGhpcmQgcGFydHkgYW5kL29yIHRoZWlyIGluc3VyZXI7PC9wPjxwPjQuMTEgdGFrZSBmdXJ0aGVyIHJlY292ZXJ5IGFjdGlvbiBhZ2FpbnN0IGEgdGhpcmQgcGFydHk7PC9wPjxwPjQuMTIgY29tbWVuY2UgbGVnYWwgcHJvY2VlZGluZ3MgYWdhaW5zdCBhIHRoaXJkIHBhcnR5IGFuZC9vciB0aGVpciBpbnN1cmVyOyBhbmQvb3I8L3A+PHA+NC4xMyBwZXJmb3JtIGFueSBvdGhlciB0YXNrcyBvciB0YWtlIGFueSBvdGhlciBhY3Rpb24uPC9wPjxwPjxzdHJvbmc+NS4gV2UgZG9u4oCZdCBndWFyYW50ZWUgYW4gb3V0Y29tZTombmJzcDs8L3N0cm9uZz5XZSBkbyBub3QgcmVwcmVzZW50IGF0IGFueSB0aW1lIHRoYXQgYSBwYXJ0aWN1bGFyIHJlY292ZXJ5IG91dGNvbWUgd2lsbCBiZSBvYnRhaW5lZC4gU29tZSBvciBubyBmdW5kcyBtYXkgYmUgcmVjb3ZlcmVkIGRlc3BpdGUgdGhlIG1lcml0cyBvZiB0aGUgcmVjb3ZlcnkgY2xhaW0uPC9wPjxwPjxzdHJvbmc+Ni4gV2hhdOKAmXMgbm90IGluY2x1ZGVkIGluIGFuIGV4cHJlc3MgcmVjb3Zlcnk8L3N0cm9uZz46IFRvIGF2b2lkIGFueSBkb3VidCwgdGhlIGV4cHJlc3MgcmVjb3Zlcnkgd29yayB3ZSBhZ3JlZSB0byB1bmRlcnRha2UgZm9yIHRoZSBmaXhlZCBmZWUgZG9lcyBub3QgaW5jbHVkZSAobm9uLWV4aGF1c3RpdmVseSk6PC9wPjxwPjYuMSAmbmJzcDtsaWFpc2luZyB3aXRoIGFuIGluc3VyZWQvYnJva2VyIHJlZ2FyZGluZyB0aGUgY2xhaW0sIGluY2lkZW50LCBsb3NzOyBvdGhlciB0aGFuIGFzIHNldCBvdXQgaW4gcGFyYWdyYXBocyZuYnNwOzQuMSBhbmQmbmJzcDs0LjIgYWJvdmU7PC9wPjxwPjYuMiAmbmJzcDt1cGRhdGluZyBhbnkgb3RoZXIgc3Rha2Vob2xkZXJzIG9uIHRoZSBzdGF0dXMgb3IgcHJvZ3Jlc3Mgb2YgYSByZWNvdmVyeSwgb3RoZXIgdGhhbiB5b3UgKGZvciBleGFtcGxlIGJyb2tlcnMsIG9yIHRoZSBpbnN1cmVkKTs8L3A+PHA+Ni4zICZuYnNwO3Jlc3BvbmRpbmcgdG8gZGlzcHV0ZXMsIG9yIHJlcXVlc3RzIGZvciBmdXJ0aGVyIGluZm9ybWF0aW9uIGJ5IGEgdGhpcmQgcGFydHkgb3IgaXRzIHJlcHJlc2VudGF0aXZlcywgaW5jbHVkaW5nIGluc3VyZXJzOzwvcD48cD42LjQgJm5ic3A7ZW5nYWdpbmcgaW4gbmVnb3RpYXRpb24gb3Igc2V0dGxlbWVudCBkaXNjdXNzaW9ucyB3aXRoIHRoZSB0aGlyZCBwYXJ0eSBvciBpdHMgcmVwcmVzZW50YXRpdmVzLCBpbmNsdWRpbmcgaW5zdXJlcnM7PC9wPjxwPjYuNSAmbmJzcDtlbmZvcmNlbWVudDs8L3A+PHA+Ni42ICZuYnNwO2lzc3Vpbmcgb3IgZGVmZW5kaW5nIHByb2NlZWRpbmdzOyBhbmQvb3I8L3A+PHA+Ni43ICZuYnNwO2Rpc2J1cnNlbWVudHMuPC9wPjxwPjxzdHJvbmc+Ny4gT3RoZXIgbWF0dGVyczo8L3N0cm9uZz48L3A+PHA+Ny4xICZuYnNwO0luIHVuZGVydGFraW5nIGFuIGV4cHJlc3MgcmVjb3ZlcnksIHdlIG1heSBpbmN1ciBleHBlbnNlcyBvciBkaXNidXJzZW1lbnRzIChiZWluZyBtb25leSB3aGljaCB3ZSBwYXkgb3IgYXJlIGxpYWJsZSB0byBwYXkgdG8gb3RoZXJzIG9uIHlvdXIgYmVoYWxmKS4gRXhwZW5zZXMgb3IgZGlzYnVyc2VtZW50cyBtYXkgaW5jbHVkZSBzZWFyY2ggZmVlcy4gWW91IGFncmVlIHRvIHBheSBkaXNidXJzZW1lbnRzIGluY3VycmVkIGJ5IHVzIG9uIGFuIGV4cHJlc3MgcmVjb3ZlcnkgbWF0dGVyIHdoZXRoZXIgb3Igbm90IHRoZXJlIGlzIGEgcmVjb3ZlcnkuIFdlIHdpbGwgYmlsbCB5b3UgYW55IHN1Y2ggZGlzYnVyc2VtZW50cyBhcyBhbmQgd2hlbiBpbmN1cnJlZC48L3A+PHA+Ny4yICZuYnNwO1RoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB0aGUgZXhpc3RpbmcgZW5nYWdlbWVudCBsZXR0ZXIsIG1hc3RlciBjb3N0cyBhZ3JlZW1lbnQgb3IgbGVnYWwgc2VydmljZXMgYWdyZWVtZW50IHVuZGVyIHdoaWNoIFdvdHRvbiArIEtlYXJuZXkgaGFzIGFncmVlZCB0byBzdXBwbHkgeW91IHdpdGggbGVnYWwgc2VydmljZXMgKDxzdHJvbmc+Y29zdHMgYWdyZWVtZW50PC9zdHJvbmc+KSBhcHBseSB0byBleHByZXNzIHJlY292ZXJpZXMgbWF0dGVycywgaXJyZXNwZWN0aXZlIG9mIHRoZSBuYW1lIGFuZCBmb3JtIG9mIHRoYXQgY29zdHMgYWdyZWVtZW50LiBEZXNwaXRlIGFueSBjb250cmFyeSB0ZXJtIG9mIHRoYXQgY29zdHMgYWdyZWVtZW50LCB0aGVzZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyBmb3JtIHBhcnQgb2YgdGhhdCBjb3N0cyBhZ3JlZW1lbnQuIEZvciBleHByZXNzIHJlY292ZXJpZXMsIHRoZXNlIHRlcm1zIGFuZCBjb25kaXRpb25zIHByZXZhaWwgdG8gdGhlIGV4dGVudCBvZiBhbnkgaW5jb25zaXN0ZW5jeSB3aXRoIHRoZSBleGlzdGluZyB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB0aGF0IGNvc3RzIGFncmVlbWVudC48L3A+PHA+Ny4zICZuYnNwO0luIHRoZXNlIHRlcm1zIGFuZCBjb25kaXRpb25zLCDigJh5b3XigJkgbWVhbnMgdGhlIFdvdHRvbiArIEtlYXJuZXkgY2xpZW50IHdoaWNoIGlzIGEgcGFydHkgdG8gdGhlIGNvc3RzIGFncmVlbWVudCwgYW5kIOKAmHlvdXLigJkgaGFzIGEgY29ycmVzcG9uZGluZyBtZWFuaW5nOyDigJh3ZeKAmSBhbmQg4oCYb3Vy4oCZIG1lYW5zIFdvdHRvbiArIEtlYXJuZXkgUHR5IEx0ZCAoQUJOIDk0IDYzMiA5MzIgMTMxKSwgYW4gaW5jb3Jwb3JhdGVkIGxlZ2FsIHByYWN0aWNlIHJlZ2lzdGVyZWQgaW4gQXVzdHJhbGlhLjwvcD48cD43LjQgJm5ic3A7VGhlIHBlcnNvbiBzdWJtaXR0aW5nIHRoZSBleHByZXNzIHJlY292ZXJpZXMgcmVxdWVzdCBiZWxvdyBhbmQgeW91IHJlcHJlc2VudCBhbmQgd2FycmFudCB0aGF0IHRoZSBzdWJtaXR0ZXIgaXMgYXV0aG9yaXNlZCB0byBzdWJtaXQgdGhlIHJlcXVlc3QgYW5kIHRvIGFjY2VwdCB0aGVzZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvbiB5b3VyIGJlaGFsZi48L3A+PHA+PHN0cm9uZz5Ob3RlOjwvc3Ryb25nPiBXZSB3aWxsIGNvbmZpcm0gb3VyIGFzc2Vzc21lbnQgdG8geW91IGJ5IGVtYWlsIHdpdGhpbiAzIGJ1c2luZXNzIGRheXMuIFBsZWFzZSBub3RlIHRoYXQgdGhlIGhvdXJseSByYXRlcyBzZXQgb3V0IGluIHlvdXIgY29zdHMgYWdyZWVtZW50IChhcyBkZWZpbmVkIHVuZGVyIGNsYXVzZSA3LjIpIGFwcGx5IHRvIGFsbCBtYXR0ZXJzIG90aGVyIHRoYW4gZXhwcmVzcyZuYnNwOzwvcD5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIlZpZXcgVGVybXMgYW5kIENvbmRpdGlvbnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWZyZXNoT25DaGFuZ2VcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibW9kYWxFZGl0XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6IFwidGVybXNBbmRDb25kaXRpb25zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImNvbnRlbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dFwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWJsZVZpZXdcIjogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogXCJEYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImtleVwiOiBcImRhdGFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcG9uZW50c1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IFwiU2VsZWN0IFBlcnNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZGdldFwiOiBcImh0bWw1XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFibGVWaWV3XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVNyY1wiOiBcImN1c3RvbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXN0b21cIjogXCJyZXR1cm4gV2lkZ2V0cy5nZXRPcHRpb25TZXQoXFxcImp1cmlzZGljdGlvbnNcXFwiKVxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVQcm9wZXJ0eVwiOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZW1wbGF0ZVwiOiBcIjxzcGFuPnt7IGl0ZW0ubmFtZSB9fTwvc3Bhbj5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWZyZXNoT25cIjogXCJkYXRhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6IFwic2VsZWN0UGVyc29uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNlbGVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlucHV0XCI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIllvdXIgT3JnYW5pc2F0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbHlNYXNrT25cIjogXCJjaGFuZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWJsZVZpZXdcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXN0b21EZWZhdWx0VmFsdWVcIjogXCJjb25zb2xlLmxvZyhcXFwiLS0tLS09PT09PT09LS0tLS0tLS09PT09PT1cXFwiLFdpZGdldHMudXNlck9yZ2FuaXNhdGlvbigpKTtcXG5yZXR1cm4gV2lkZ2V0cy51c2VyT3JnYW5pc2F0aW9uKCkubmFtZTtcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIjogXCJ5b3VyT3JnYW5pc2F0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRmaWVsZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlucHV0XCI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIlVzZXIgTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGx5TWFza09uXCI6IFwiY2hhbmdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFibGVWaWV3XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VzdG9tRGVmYXVsdFZhbHVlXCI6IFwicmV0dXJuIFdpZGdldHMudXNlcigpLnVzZXJuYW1lKClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJrZXlcIjogXCJ1c2VyTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0ZXh0ZmllbGRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dFwiOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFiZWxcIjogXCJVc2VyIElkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbHlNYXNrT25cIjogXCJjaGFuZ2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YWJsZVZpZXdcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXN0b21EZWZhdWx0VmFsdWVcIjogXCJyZXR1cm4gJHVpLnBhZ2VDb250ZXh0LnVzZXIudXNlcmlkKCk7XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6IFwidXNlcklkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInRleHRmaWVsZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlucHV0XCI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBcIlNlbGVjdCBDb3VudHJ5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkZ2V0XCI6IFwiY2hvaWNlc2pzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGFibGVWaWV3XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVNyY1wiOiBcImN1c3RvbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXN0b21cIjogXCJyZXR1cm4gV2lkZ2V0cy5nZXRDb3VudHJpZXMoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRQYXRoXCI6IFwic3lzdGVtTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlUHJvcGVydHlcIjogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGVtcGxhdGVcIjogXCI8c3Bhbj57eyBpdGVtLm5hbWUgfX08L3NwYW4+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5XCI6IFwic2VsZWN0Q291bnRyeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZWxlY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnB1dFwiOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBcImtleVwiOiBcInRhYnNcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ0YWJzXCIsXG4gICAgICAgICAgICAgICAgXCJpbnB1dFwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBcInRhYmxlVmlld1wiOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJidXR0b25cIixcbiAgICAgICAgICAgICAgICBcImxhYmVsXCI6IFwiU3VibWl0XCIsXG4gICAgICAgICAgICAgICAgXCJrZXlcIjogXCJzdWJtaXRcIixcbiAgICAgICAgICAgICAgICBcImRpc2FibGVPbkludmFsaWRcIjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBcImlucHV0XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgXCJ0YWJsZVZpZXdcIjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH1cbiIsIlxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRGVmYXVsdEZvcm1JT1N0eWxlU2hlZXRzVG9TaGFkb3coc2hhZG93OiBTaGFkb3dSb290KSB7XG4gICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgbGluay5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiAgICBsaW5rLmhyZWYgPSBcImh0dHBzOi8vc3RhY2twYXRoLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzQuNC4xL2Nzcy9ib290c3RyYXAubWluLmNzc1wiO1xuICAgIHNoYWRvdy5hcHBlbmRDaGlsZChsaW5rKTtcblxuICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgbGluay5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiAgICBsaW5rLmhyZWYgPSBcImh0dHBzOi8vY2RuLmZvcm0uaW8vZm9ybWlvanMvZm9ybWlvLmZ1bGwubWluLmNzc1wiO1xuICAgIHNoYWRvdy5hcHBlbmRDaGlsZChsaW5rKTtcblxuXG4gICAgIC8vPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJodHRwczovL2Nkbi5mb3JtLmlvL2Zvcm1pb2pzL2Zvcm1pby5mdWxsLm1pbi5jc3NcIj5cbiAgICAgLy88bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vYm9vdHN0cmFwQDQuNi4wL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCI+XG5cbiAgICAgLy88bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS80LjcuMC9jc3MvZm9udC1hd2Vzb21lLmNzc1wiPlxuXG4gICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgIGxpbmsucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gICAgIGxpbmsuaHJlZiA9IFwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzQuNy4wL2Nzcy9mb250LWF3ZXNvbWUuY3NzXCI7XG4gICAgIHNoYWRvdy5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgXG5cbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGREZWZhdWx0Rm9ybUlPU3R5bGVTaGVldHNUb0lmcmFtZShpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgbGluay5yZWwgPSBcInN0eWxlc2hlZXRcIjtcbiAgICBsaW5rLmhyZWYgPSBcImh0dHBzOi8vc3RhY2twYXRoLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzQuNC4xL2Nzcy9ib290c3RyYXAubWluLmNzc1wiO1xuICAgIGlmcmFtZS5jb250ZW50RG9jdW1lbnQhLmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG5cbiAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIGxpbmsucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gICAgbGluay5ocmVmID0gXCJodHRwczovL2Nkbi5mb3JtLmlvL2Zvcm1pb2pzL2Zvcm1pby5mdWxsLm1pbi5jc3NcIjtcbiAgICBpZnJhbWUuY29udGVudERvY3VtZW50IS5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuXG5cbiAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgIGxpbmsucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gICAgbGluay5ocmVmID0gXCJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNC43LjAvY3NzL2ZvbnQtYXdlc29tZS5jc3NcIjtcbiAgICBpZnJhbWUuY29udGVudERvY3VtZW50IS5oZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgICBcblxufVxuXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tMb3dkYXNoQ29tcGF0YWJpbGl0eSgpIHtcbiAgICAvL2xvd2Rhc2ggNCBhbmQgYWJvdmUgaGFzIGNoYW5nZWQgY29udGFpbnMgdG8gaW5jbHVkZXNcbiAgICAvL2hlcmUgd2UgYXJlIGp1c3QgYWxpYXNpbmcgaXQgYmFjayB0byBjb250YWlucyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgICBpZighXy5jb250YWlucylcbiAgICB7XG4gICAgICAgY29uc29sZS5sb2coXCIhXy5jb250YWluc1wiKVxuICAgIH1cblxuICAgIGlmKCFfLmZpbmRXaGVyZSlcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiIV8uZmluZFdoZXJlXCIpXG4gICAgfVxufVxuXG5pZighXy5jb250YWlucylcbntcbiAgICBfLmNvbnRhaW5zID0gXy5pbmNsdWRlcztcbn1cblxuaWYoIV8uZmluZFdoZXJlKVxue1xuICAgIF8uZmluZFdoZXJlID0gXy5maW5kO1xufSIsImV4cG9ydCBjb25zdCBERUZBVUxUX0ZPUk0gPSBcbntcIl9pZFwiOlwiNjRmMDlhMWIyNmI5YWVmZWU2NGZhMWRlXCIsXCJ0aXRsZVwiOlwiQmFzaWMgRWxlbWVudHNcIixcIm5hbWVcIjpcIkJhc2ljRWxlbWVudHNcIixcInBhdGhcIjpcImJhc2ljZWxlbWVudHNcIixcInR5cGVcIjpcImZvcm1cIixcImRpc3BsYXlcIjpcImZvcm1cIixcInRhZ3NcIjpbXSxcImFjY2Vzc1wiOlt7XCJ0eXBlXCI6XCJyZWFkX2FsbFwiLFwicm9sZXNcIjpbXCI2NGVmZjU3ZjU3ZGE4NDhlNzM5M2NjMzJcIixcIjY0ZWZmNTdmNTdkYTg0OGU3MzkzY2MzOFwiLFwiNjRlZmY1N2Y1N2RhODQ4ZTczOTNjYzNlXCJdfV0sXCJzdWJtaXNzaW9uQWNjZXNzXCI6W10sXCJvd25lclwiOlwiNjRlZmY1MGY1N2RhODQ4ZTczOTNjNzVkXCIsXCJjb21wb25lbnRzXCI6W3tcImxhYmVsXCI6XCJUZXh0IEZpZWxkIDFcIixcImFwcGx5TWFza09uXCI6XCJjaGFuZ2VcIixcInRhYmxlVmlld1wiOnRydWUsXCJrZXlcIjpcInRleHRGaWVsZDFcIixcInR5cGVcIjpcInRleHRmaWVsZFwiLFwiaW5wdXRcIjp0cnVlfSx7XCJsYWJlbFwiOlwiVGV4dCBBcmVhIDFcIixcImFwcGx5TWFza09uXCI6XCJjaGFuZ2VcIixcImF1dG9FeHBhbmRcIjpmYWxzZSxcInRhYmxlVmlld1wiOnRydWUsXCJrZXlcIjpcInRleHRBcmVhMVwiLFwidHlwZVwiOlwidGV4dGFyZWFcIixcImlucHV0XCI6dHJ1ZX0se1wibGFiZWxcIjpcIk51bWJlciAxXCIsXCJhcHBseU1hc2tPblwiOlwiY2hhbmdlXCIsXCJtYXNrXCI6ZmFsc2UsXCJ0YWJsZVZpZXdcIjpmYWxzZSxcImRlbGltaXRlclwiOmZhbHNlLFwicmVxdWlyZURlY2ltYWxcIjpmYWxzZSxcImlucHV0Rm9ybWF0XCI6XCJwbGFpblwiLFwidHJ1bmNhdGVNdWx0aXBsZVNwYWNlc1wiOmZhbHNlLFwia2V5XCI6XCJudW1iZXIxXCIsXCJ0eXBlXCI6XCJudW1iZXJcIixcImlucHV0XCI6dHJ1ZX0se1wibGFiZWxcIjpcIlBhc3N3b3JkIDFcIixcImFwcGx5TWFza09uXCI6XCJjaGFuZ2VcIixcInRhYmxlVmlld1wiOmZhbHNlLFwia2V5XCI6XCJwYXNzd29yZDFcIixcInR5cGVcIjpcInBhc3N3b3JkXCIsXCJpbnB1dFwiOnRydWUsXCJwcm90ZWN0ZWRcIjp0cnVlfSx7XCJsYWJlbFwiOlwiQ2hlY2tib3ggMVwiLFwidGFibGVWaWV3XCI6ZmFsc2UsXCJrZXlcIjpcImNoZWNrYm94MVwiLFwidHlwZVwiOlwiY2hlY2tib3hcIixcImlucHV0XCI6dHJ1ZSxcImRlZmF1bHRWYWx1ZVwiOmZhbHNlfSx7XCJ0eXBlXCI6XCJidXR0b25cIixcImxhYmVsXCI6XCJTdWJtaXRcIixcImtleVwiOlwic3VibWl0XCIsXCJkaXNhYmxlT25JbnZhbGlkXCI6dHJ1ZSxcImlucHV0XCI6dHJ1ZSxcInRhYmxlVmlld1wiOmZhbHNlfV0sXCJzZXR0aW5nc1wiOnt9LFwicHJvcGVydGllc1wiOnt9LFwicHJvamVjdFwiOlwiNjRlZmY1N2Y1N2RhODQ4ZTczOTNjYzJiXCIsXCJjb250cm9sbGVyXCI6XCJcIixcInJldmlzaW9uc1wiOlwiXCIsXCJzdWJtaXNzaW9uUmV2aXNpb25zXCI6XCJcIixcIl92aWRcIjowLFwiY3JlYXRlZFwiOlwiMjAyMy0wOC0zMVQxMzo0ODoxMS44MzVaXCIsXCJtb2RpZmllZFwiOlwiMjAyMy0wOC0zMVQxMzo0ODoxMS44NDRaXCIsXCJtYWNoaW5lTmFtZVwiOlwic2FlaHd5bmRuZnR6em1rOkJhc2ljRWxlbWVudHNcIixcInBsYW5cIjpcInRyaWFsXCJ9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGtvOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcclxuaW1wb3J0IHsgSVdpZGdldEJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwaW5ncy9XaWRnZXRzL0lXaWRnZXRcIjtcclxuaW1wb3J0IHsgY2FtZWxpemUsIGNsZWFuSlNPTiB9IGZyb20gXCIuLi8uLi8uLi9CYXNlQ2xhc3Nlcy9VdGlsaXR5XCI7XHJcbmltcG9ydCB7IERFRkFVTFRfRk9STSB9IGZyb20gXCIuL0RlZmF1bHRGb3JtXCI7XHJcbmltcG9ydCB7IFRTaGFyZURvQmxhZGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vVHlwaW5ncy9TaGFyZURvSlMvQWRkRWRpdFNoYXJlZG9cIjtcclxuaW1wb3J0IHsgY3JlYXRlRm9ybUJ1aWxkZXJQYWdlIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9Gb3JtaW9CdWlsZGVyXCI7XHJcbmltcG9ydCB7IHNldEFsbCB9IGZyb20gXCIuLi8uLi9Db21tb24vU2V0RGF0YUNvbnRleHRcIjtcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRm9ybVdpZGdldERlc2lnbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWd1cmF0aW9uOiBhbnksIGJhc2VNb2RlbDogYW55KTogRm9ybVdpZGdldERlc2lnbmVyQ2xhc3Mge1xyXG4gICAgcmV0dXJuIG5ldyBGb3JtV2lkZ2V0RGVzaWduZXJDbGFzcyhlbGVtZW50LCBjb25maWd1cmF0aW9uLCBiYXNlTW9kZWwpO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGb3JtV2lkZ2V0Q29uZmlndXJhdGlvbiB7XHJcbiAgICBmb3JtQnVpbGRlckRlZmluaXRpb246IHN0cmluZztcclxuICAgIGJyb2FkY2FzdE9uU3VibWl0OiBib29sZWFuO1xyXG4gICAgYnJvYWRjYXN0T25TdWJtaXRFdmVudE5hbWU6IHN0cmluZztcclxuICAgIGNyZWF0ZVdvcmtUeXBlT25TdWJtaXQ6IGJvb2xlYW47XHJcbiAgICB3b3JrSXRlbTogc3RyaW5nO1xyXG4gICAgYXNwZWN0RGF0YTogc3RyaW5nO1xyXG4gICAga2V5RGF0ZXM6IHN0cmluZztcclxuICAgIHBhcnRpY2lwYW50czogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGb3JtV2lkZ2V0RGVzaWduZXJNb2RlbCB7XHJcbiAgICBmb3JtQnVpbGRlckRlZmluaXRpb246IGtvLk9ic2VydmFibGU8c3RyaW5nPlxyXG4gICAgYnJvYWRjYXN0T25TdWJtaXQ6IGtvLk9ic2VydmFibGU8Ym9vbGVhbj5cclxuICAgIGJyb2FkY2FzdE9uU3VibWl0RXZlbnROYW1lOiBrby5PYnNlcnZhYmxlPHN0cmluZz5cclxuICAgIGNyZWF0ZVdvcmtUeXBlT25TdWJtaXQ6IGtvLk9ic2VydmFibGU8Ym9vbGVhbj5cclxuICAgIHdvcmtJdGVtOiBrby5PYnNlcnZhYmxlPHN0cmluZz5cclxuICAgIGFzcGVjdERhdGE6IGtvLk9ic2VydmFibGU8c3RyaW5nPlxyXG4gICAga2V5RGF0ZXM6IGtvLk9ic2VydmFibGU8c3RyaW5nPlxyXG4gICAgcGFydGljaXBhbnRzOiBrby5PYnNlcnZhYmxlPHN0cmluZz5cclxuXHJcbn1cclxuXHJcbmludGVyZmFjZSBDb25mZ3VyYXRpb25BbmRCbGFkZSBleHRlbmRzIElGb3JtV2lkZ2V0Q29uZmlndXJhdGlvbiB7XHJcbiAgICBibGFkZTogVFNoYXJlRG9CbGFkZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRm9ybVdpZGdldERlc2lnbmVyQ2xhc3Mge1xyXG4gICAgdmFsaWRhdGlvbjogYW55O1xyXG4gICAgdmFsaWRhdGlvbkVycm9yQ291bnQ6IGtvLkNvbXB1dGVkPG51bWJlcj47XHJcbiAgICBmb3JtQnVpbGRlckRlZmluaXRpb246IGtvLk9ic2VydmFibGU8c3RyaW5nPjtcclxuICAgIG1vZGVsOiBJRm9ybVdpZGdldERlc2lnbmVyTW9kZWw7XHJcbiAgICB0ZXh0RWRpdG9yRm9ybUJ1aWxkZXJEZWZpbml0aW9uOiBhbnk7XHJcbiAgICB0aXRsZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG4gICAgdGV4dEVkaXRvckFzcGVjdERhdGE6IGFueTtcclxuICAgIHRleHRFZGl0b3JLZXlEYXRlczogYW55O1xyXG4gICAgdGV4dEVkaXRvcldvcmtJdGVtOiBhbnk7XHJcbiAgICB0ZXh0RWRpdG9yUGFydGljaXBhbnRzOiBhbnk7XHJcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICAgIGZvcm1CdWlsZGVyOiBhbnkgfCB1bmRlZmluZWQ7XHJcbiAgICBkZXNpZ25lckNyZWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIG1vZGVsRGlhbG9nOiBIVE1MRWxlbWVudDtcclxuICAgIGRlc2lnbmVyRGl2OiBIVE1MRGl2RWxlbWVudDtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNvbmZpZ3VyYXRpb246IENvbmZndXJhdGlvbkFuZEJsYWRlLCBiYXNlTW9kZWw6IElXaWRnZXRCYXNlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IGNvbmZpZ3VyYXRpb24/LmJsYWRlPy5tb2RlbD8udGl0bGUgfHwgYmFzZU1vZGVsLnRpdGxlXHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICBjb25zdCBkZWZhdWx0czogSUZvcm1XaWRnZXRDb25maWd1cmF0aW9uID0ge1xyXG4gICAgICAgICAgICBmb3JtQnVpbGRlckRlZmluaXRpb246IEpTT04uc3RyaW5naWZ5KERFRkFVTFRfRk9STSwgbnVsbCwgNCksXHJcbiAgICAgICAgICAgIGJyb2FkY2FzdE9uU3VibWl0OiB0cnVlLFxyXG4gICAgICAgICAgICBicm9hZGNhc3RPblN1Ym1pdEV2ZW50TmFtZTogYCR7YmFzZU1vZGVsLnN5c3RlbU5hbWV9LiR7Y2FtZWxpemUodGhpcy50aXRsZSgpKX0ub25TdWJtaXRgLFxyXG4gICAgICAgICAgICBjcmVhdGVXb3JrVHlwZU9uU3VibWl0OiBmYWxzZSxcclxuICAgICAgICAgICAgd29ya0l0ZW06IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIHNoYXJlZG9UeXBlU3lzdGVtTmFtZTogXCJpbnN0cnVjdGlvbi1iMmItZGlzcHV0ZS1wbGFpbnRpZmZcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlSXNVc2VyUHJvdmlkZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcmVmZXJlbmVjSXNVc2VyUHJvdmlkZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sIG51bGwsIDQpLFxyXG4gICAgICAgICAgICBhc3BlY3REYXRhOiBKU09OLnN0cmluZ2lmeShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbldvcmtUeXBlRGV0YWlsczpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2VTaGFyZWRvVHlwZVN5c3RlbU5hbWU6IFwid2stbWF0dGVyLWRpc3B1dGUtcGxhaW50aWZmLXJlY292ZXJpZXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZVdvcmtUeXBlSWQ6IDUwMDAwMDI4NCxcclxuICAgICAgICAgICAgICAgICAgICAgICAganVyaXNkaWN0aW9uSWQ6IFwiZnVuYzpmb3JtQnVpbGRlci5zZWxlY3RlZExvY2F0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBpbmNpZGVudERldGFpbHNMb2NhdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEluY2lkZW50TG9jYXRpb25JZDogXCJmdW5jOmZvcm1CdWlsZGVyLmFkZHJlc3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgSW5jaWRlbnRUeXBlSWQ6IFwiWydzdHJlZXQnXVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgbnVsbCwgNCksXHJcbiAgICAgICAgICAgIGtleURhdGVzOiBKU09OLnN0cmluZ2lmeShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImtkLWluc3RydWN0aW9uLXJlY2VpdmVkXCI6IG5ldyBEYXRlKClcclxuICAgICAgICAgICAgICAgIH0sIG51bGwsIDQpLFxyXG4gICAgICAgICAgICBwYXJ0aWNpcGFudHM6IEpTT04uc3RyaW5naWZ5KFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByb2xlU3lzdGVtTmFtZTogXCJjbGllbnQtY2FzZS1oYW5kbGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb2RzUmVmZXJlbmNlOiAkdWkucGFnZUNvbnRleHQudXNlci51c2VybmFtZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG9kc1R5cGU6IFwicGVyc29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb2RzSWQ6ICR1aS5wYWdlQ29udGV4dC51c2VyLnVzZXJpZCgpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLCBudWxsLCA0KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIGNvbmZpZ3VyYXRpb24pO1xyXG4gICAgICAgIHRoaXMuZm9ybUJ1aWxkZXJEZWZpbml0aW9uID0ga28ub2JzZXJ2YWJsZShvcHRpb25zLmZvcm1CdWlsZGVyRGVmaW5pdGlvbilcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvcHRpb25zXCIsIG9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSB7XHJcbiAgICAgICAgICAgIGZvcm1CdWlsZGVyRGVmaW5pdGlvbjogdGhpcy5mb3JtQnVpbGRlckRlZmluaXRpb24sXHJcbiAgICAgICAgICAgIGJyb2FkY2FzdE9uU3VibWl0OiBrby5vYnNlcnZhYmxlKG9wdGlvbnMuYnJvYWRjYXN0T25TdWJtaXQpLFxyXG4gICAgICAgICAgICBicm9hZGNhc3RPblN1Ym1pdEV2ZW50TmFtZToga28ub2JzZXJ2YWJsZShvcHRpb25zLmJyb2FkY2FzdE9uU3VibWl0RXZlbnROYW1lKSxcclxuICAgICAgICAgICAgY3JlYXRlV29ya1R5cGVPblN1Ym1pdDoga28ub2JzZXJ2YWJsZShvcHRpb25zLmNyZWF0ZVdvcmtUeXBlT25TdWJtaXQpLFxyXG4gICAgICAgICAgICB3b3JrSXRlbToga28ub2JzZXJ2YWJsZShvcHRpb25zLndvcmtJdGVtKSxcclxuICAgICAgICAgICAgYXNwZWN0RGF0YToga28ub2JzZXJ2YWJsZShvcHRpb25zLmFzcGVjdERhdGEpLFxyXG4gICAgICAgICAgICBrZXlEYXRlczoga28ub2JzZXJ2YWJsZShvcHRpb25zLmtleURhdGVzKSxcclxuICAgICAgICAgICAgcGFydGljaXBhbnRzOiBrby5vYnNlcnZhYmxlKG9wdGlvbnMucGFydGljaXBhbnRzKVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnRpdGxlLnN1YnNjcmliZSgobmV3VmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5icm9hZGNhc3RPblN1Ym1pdEV2ZW50TmFtZShgJHtiYXNlTW9kZWwuc3lzdGVtTmFtZX0uJHtjYW1lbGl6ZShuZXdWYWx1ZSl9Lm9uU3VibWl0YCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yQ291bnQgPSBrby5wdXJlQ29tcHV0ZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGlkID0gXCIjZm9ybWlvLWRlc2lnbmVyXCI7XHJcbiAgICAgICAgdGhpcy5kZXNpZ25lckRpdiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKGlkKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1vZGVsRGlhbG9nID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuV2lkZ2V0cy1Gb3JtV2lkZ2V0RGVzaWduZXIubW9kYWxcIikgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgLy8gbW92ZSBtb2RlbCBkaWFsb2cgdG8gdGhlIGJvZHlcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kZWxEaWFsb2cpO1xyXG5cclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRBbmRCaW5kKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgfVxyXG5cclxuICAgIGdldE1vZGVsKCkge1xyXG4gICAgICAgIHZhciBrb01vZGVsID0ga28udG9KUyh0aGlzLm1vZGVsKTtcclxuICAgICAgICByZXR1cm4ga29Nb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBvbkZvY3VzT3V0KGRhdGE6IGFueSwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGxldCBpZCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmlkO1xyXG4gICAgICAgIGxldCBrb09iamVjdCA9ICh0aGlzLm1vZGVsIGFzIGFueSlbaWRdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IEpTT04uc3RyaW5naWZ5KEpTT04ucGFyc2Uoa29PYmplY3QoKSksIG51bGwsIDQpO1xyXG4gICAgICAgICAgICBrb09iamVjdChuZXdWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIiwgZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgY2hlY2tDb21wbGV4KCkgeyBcclxuXHJcbiAgICAgICAgaWYodGhpcy5kZXNpZ25lckNyZWF0ZWQpIHtcclxuICAgICAgICAgICAgLy8gcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kZXNpZ25lckNyZWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGVzaWduZXJEaXYuaW5uZXJIVE1MXHJcbiAgICAgICAgXHJcbiAgICAgICAgY3JlYXRlRm9ybUJ1aWxkZXJQYWdlKHRoaXMuZGVzaWduZXJEaXYsdGhpcy5mb3JtQnVpbGRlckRlZmluaXRpb24oKSkucHJvbWlzZS50aGVuKChmb3JtQnVpbGRlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1CdWlsZGVyID0gZm9ybUJ1aWxkZXI7XHJcbiAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5mb3JtQnVpbGRlciA9IGZvcm1CdWlsZGVyO1xyXG4gICAgICAgICAgICBmb3JtQnVpbGRlci5pbnN0YW5jZS5vbignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQnVpbGRlckRlZmluaXRpb24oSlNPTi5zdHJpbmdpZnkoZm9ybUJ1aWxkZXIuaW5zdGFuY2Uuc2NoZW1hLCBudWxsLCAyKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICBcclxuXHJcbiAgICAgICAgLy8gd2luZG93Lm9wZW4oXCJodHRwOi8vMTI3LjAuMC4xOjU1MDAvc3JjL1dlYkJhc2VkL1Rlc3Rlci9Gb3JtSU9CdWlsZGVyL3BhZ2UuaHRtbFwiLCBcIl9ibGFua1wiKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==