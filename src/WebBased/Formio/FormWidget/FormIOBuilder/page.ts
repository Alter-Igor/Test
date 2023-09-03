import { FormBuilder, Formio } from 'formiojs';
import { DeferredPromise } from "../../../Common/DifferedPromise";
import { exampleFormComponents } from '../../Common/FormioBuilder';
import { renderForm } from '../../Common/FormioRender';
import {FormPreviewSettings} from './FormSettings';
let formBuilder: FormBuilder;
let formPreview: any;
let formSettings: any;

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

    setupDataContext();
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
            renderPreview();
          });

          renderPreviewSettingsForm();

    (window as any).formBuilder = formBuilder;
    deferred.resolve(formBuilder);
}


function renderPreview() {
    let renderFormLocation = document.querySelector("#formPreview")!;
    renderFormLocation.innerHTML = "";
    
    if(formPreview)
    {
        formPreview.setForm(formBuilder.instance.schema);
        return;
    }

     renderForm(renderFormLocation, formBuilder.instance.schema).then((form) => {
        formPreview = form;
     });
}

function buildWithExample(deferred: DeferredPromise<FormBuilder>)
{
    build(new DeferredPromise<FormBuilder>(), JSON.stringify(exampleFormComponents, null, 2));    
}

(window as any).build = build;
(window as any).buildWithExample = buildWithExample;
(window as any).openTab = openTab;


function renderPreviewSettingsForm() {
    let formiolocation = document.querySelector("#formPreviewSettings")!;
    let shareDoId;
    
    // if ($ui && $ui.pageContext && $ui.pageContext.shareDoId) {
    //     shareDoId = $ui.pageContext.shareDoId; //when testing witin a ShareDo instance
    // }
    renderForm(formiolocation, FormPreviewSettings, { "shareDoId": shareDoId }).then((form) => {

        formSettings = form;
        form.on('submit', (submission: any) => {
            console.log('Submission was made!', submission);
            let shareDoId = submission.data.shareDoId;

        });
    }  );


}

function configureTabs() {
   
    //onclick="openTab(event, 'Builder')"

    let tabs = document.querySelectorAll(".tablinks");
    for (let i = 0; i < tabs.length; i++) {
        let tab = tabs[i];
        tab.addEventListener("click", (event) => {
            let target = event.target as HTMLElement;
            let tabName = target.dataset.tabname!;
            openTab(event, tabName);
        });
    }

    document!.getElementById("defaultOpen")!.click();
}

function setupDataContext() {
    let parent = document.parentElement;

    try
    {
    (window as any).Widgest = (parent as any).Widgest
    (window as any).$ui = (parent as any).$ui
    }
    catch(e)
    {
        console.error(e);
    }

}

