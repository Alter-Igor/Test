import { FormBuilder, Formio } from 'formiojs';
import { DeferredPromise } from "../../../Common/DifferedPromise";
import { exampleFormComponents } from '../../Common/FormioBuilder';
import { renderForm } from '../../Common/FormioRender';
import {FormPreviewSettings} from '../designer/FormSettings';
import * as f from "flatpickr-formio"
let formBuilder: FormBuilder;
let formPreview: any;
let formSettings: any;
import * as Ace from "ace-builds";


Formio.baseUrl = 'http://127.0.0.1:5500/_IDE';
Formio.setBaseUrl('http://127.0.0.1:5500/_IDE');


declare global {
    interface Window {
      ace: any;
      Ace: any;
    }
  }
  
  // const Ace = require("ace-builds/src-noconflict/ace");
  
  // const modeHtmlFile = require("ace-builds/src-noconflict/mode-html.js");
  // Ace.config.setModuleUrl("ace/mode/html", modeHtmlFile);
  
  // const modeJsonFile = require("ace-builds/src-noconflict/mode-json.js");
  // Ace.config.setModuleUrl("ace/mode/json", modeJsonFile);
  
  // const xcodeFile = require("ace-builds/src-noconflict/theme-xcode.js");
  // Ace.config.setModuleUrl("ace/theme/xcode", xcodeFile);
  
  // const htmlWorkerFile = require("ace-builds/src-noconflict/worker-html.js");
  // Ace.config.setModuleUrl("ace/mode/html_worker", htmlWorkerFile);
  
  // const jsonWorkerFile = require("ace-builds/src-noconflict/worker-json.js");
  // Ace.config.setModuleUrl("ace/mode/json_worker", jsonWorkerFile);
  
  Ace.config.set("basePath", "ace/");
  Ace.config.set("loadWorkerFromBlob", true);
  
  window.ace = Ace;
  window.Ace = Ace;


  

document.addEventListener("DOMContentLoaded", () => {
    
    let formiolocation = document.querySelector("#formio")!;

    //create a button
    let button = document.createElement('button');
    button.textContent = "Get JSON";
    button.onclick = () => {
        console.log(formBuilder.instance);
        let textarea = document.querySelector("#rawJSON") as HTMLTextAreaElement;
        textarea.value = JSON.stringify(formBuilder.instance.schema, null, 2);
    }

    formiolocation.parentElement?.appendChild(button);


    //chech if this page is contained in a iframe
    if (window.parent === window) {
      //we are not in a iframe
      console.log("Not in a iframe - so build with example");
        buildWithExample(new DeferredPromise<FormBuilder>());
    }


    // configureTabs();

    // document!.getElementById("defaultOpen")!.click();
});

function openTab(evt:any, cityName:string) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document!.getElementById(cityName)!.style.display = "block";
    evt.currentTarget.className += " active";
  }

function build(deferred: DeferredPromise<FormBuilder>, schema: string | undefined) {

    // setupDataContext();
    let schemaObj: any;
    let components: any;
    if (schema) {
        try {
            schemaObj = schema ? JSON.parse(schema) : undefined;
            components = schemaObj.components ? schemaObj.components : undefined;
        }
        catch (e) {
            console.error(e);
        }
    }

    

    let formiolocation = document.querySelector("#formio")!;
    
    formBuilder = new FormBuilder(formiolocation, {
        components: components
    }
        , {
            // builder: {
            //     resource: true,
            //     advanced: true,
            //     premium: false
            // }
        });

        formBuilder.instance.on('change', function (event:any) {
            console.log('Form Builder Change:', event);
            // renderPreviewSettingsForm();
            //renderPreview();
          });

        //   renderPreviewSettingsForm();

    (window as any).formBuilder = formBuilder;
    deferred.resolve(formBuilder);
}




function buildWithExample(deferred: DeferredPromise<FormBuilder>)
{
    build(new DeferredPromise<FormBuilder>(), JSON.stringify(exampleFormComponents, null, 2));    
}

(window as any).build = build;
(window as any).buildWithExample = buildWithExample;
(window as any).openTab = openTab;


// function renderPreviewSettingsForm() {
//     let formiolocation = document.querySelector("#formPreviewSettings")!;
//     let shareDoId;
    
//     // if ($ui && $ui.pageContext && $ui.pageContext.shareDoId) {
//     //     shareDoId = $ui.pageContext.shareDoId; //when testing witin a ShareDo instance
//     // }
//     renderForm(formiolocation, FormPreviewSettings, { "shareDoId": shareDoId }).then((form) => {

//         formSettings = form;
//         form.on('submit', (submission: any) => {
//             console.log('Submission was made!', submission);
//             let shareDoId = submission.data.shareDoId;

//         });
//     }  );


// }

// function configureTabs() {
   
//     //onclick="openTab(event, 'Builder')"

//     let tabs = document.querySelectorAll(".tablinks");
//     for (let i = 0; i < tabs.length; i++) {
//         let tab = tabs[i];
//         tab.addEventListener("click", (event) => {
//             let target = event.target as HTMLElement;
//             let tabName = target.dataset.tabname!;
//             openTab(event, tabName);
//         });
//     }

//     document!.getElementById("defaultOpen")!.click();
// }

// function setupDataContext() {

//     if(!window.parent)
//     {
//         console.log("No parent");
//         return;
//     }
//     // let parent = document.parentElement;

//     try
//     {
//     (window as any).Widgest = (window.parent as any).Widgets;
//     (window as any).$ui = (parent as any).$ui
//     }
//     catch(e)
//     {
//         console.error(e);
//     }

// }

