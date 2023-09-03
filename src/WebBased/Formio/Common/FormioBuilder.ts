import { FormBuilder } from "formiojs";
import { addDefaultFormIOStyleSheetsToIframe, checkLowdashCompatability } from "./Styling";
import { DeferredPromise } from "../../Common/DifferedPromise";
import { defaultFormat } from "moment";


export function createFormBuilderPage(element: Element,schema: string) : DeferredPromise<FormBuilder> {
    //crerate a iframe using the html and insert it into the element
    checkLowdashCompatability();

    const deferred = new DeferredPromise<FormBuilder>();

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
        iframe!.classList.add("loaded");
    });

    //get current window height
    let screenHeight = element.clientHeight;;
    iframe.setAttribute("height", screenHeight.toString());

    //monitor screen height and resize iframe
    window.addEventListener("resize", function () {
        
        if (!iframe) { return; }
        let screenHeight = element.clientHeight;;
        iframe.setAttribute("height", screenHeight.toString());
    });

    element.appendChild(iframe);
    iframe.onload = function () {
        if (!iframe) { return; }
        render(iframe,schema,deferred);
    }

    return deferred;

}

function render(iframe: HTMLIFrameElement,schema:string | undefined,deferred  : DeferredPromise<FormBuilder>) {
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
    
    if((iframe as any).built === true) {
        return;
    }

    (iframe.contentWindow as any).build(deferred,schema);
    (iframe as any).built = true;
}


function addLoadingMessage(element: Element) : HTMLDivElement
{
    let loadingMessage = document.createElement("div");
    loadingMessage.setAttribute("id","loadingMessage");
    loadingMessage.innerText = "Loading...";
    document.body.appendChild(loadingMessage);
    element.appendChild(loadingMessage);
    return loadingMessage
}

export const exampleFormComponents={

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
    }
