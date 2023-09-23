import { Formio } from 'formiojs';
import { TestForm } from '../FormWidget/TestForm';
import { addDefaultFormIOStyleSheetsToShadow, checkLowdashCompatability } from './Styling';
import * as DataContext from './SetDataContext';



export async function renderForm(element: HTMLElement | Element, formDefinition: string | Object | undefined, data?: Object | undefined, additionalContext?:any) {
    if (!formDefinition) {
        throw new Error("Form definition is undefined");
    }
    checkLowdashCompatability();
    await ensureDataContext(additionalContext);
   
    // add shadowdom to element, this will allow us to encapsulate the form and its styles
    // so that it does not interfere with the rest of the page or vice versa
    // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
    // this is a best practice for web components and is supported by all modern browsers

    let shadow = element.attachShadow({ mode: 'open' });
    addDefaultFormIOStyleSheetsToShadow(shadow);

    addChoicesJsToShadow(shadow);
    addChoicesJsToPage(document);

    let div = createFormIODivInsideShadowDom(shadow);

    let formDefAsObject: Object;

    if (typeof formDefinition === "string") {
        let cleanedString = formDefinition.replace(/^<p>|<\/p>$|\n/g, ''); // remove <p> and </p> tags and new lines
        formDefAsObject = JSON.parse(cleanedString);
    }
    else {
        formDefAsObject = formDefinition;
    }

  

    return Formio.createForm(div, formDefAsObject).then((form) => {
        if (data) {
            form.submission = { data: data };
        }

        form.on('submit', (submission: any) => {
            console.log('Submission was made!', submission);
        });

        return form;
    });
}

async function ensureDataContext(additionalContext?:any) {

    console.log("---- ensureDataContext ------");
    let dc = await DataContext.setDataContext(additionalContext);
    (window as any)["dataContext"] = dc;
    console.log("---- ensureDataContext End ------",dc);
}

function createFormIODivInsideShadowDom(shadow: ShadowRoot) {
    let div = document.createElement('div');
    div.id = "formio";
    shadow.appendChild(div);
    return div;
}

export async function renderTestForm(element: Element | HTMLElement) {

    checkLowdashCompatability();
    await ensureDataContext();
   

    // add shadowdom to element
    let shadow = element.attachShadow({ mode: 'open' });
    addChoicesJsToShadow(shadow);
    //  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    //  <link rel="stylesheet" href="https://cdn.form.io/formiojs/formio.full.min.css">

    addDefaultFormIOStyleSheetsToShadow(shadow);


    let div = document.createElement('div');
    div.id = "formio";
    shadow.appendChild(div);



    return Formio.createForm(div, TestForm, {
    }).then((form) => {
        console.log("Form: ", form);
        form.on('submit', (submission: any) => {
            console.log('Submission was made!', submission);
        });

        return form;
    });

}

function addChoicesJsToShadow(shadow: ShadowRoot) {
 
    ///_ideFiles/Libs/choices/choices.min.js

    // let script = document.createElement("script");
    // script.src = "_ideFiles/Libs/choices/choices.min.js";
    // shadow.appendChild(script);

    // let link = document.createElement("link");
    // link.rel = "stylesheet";
    // link.href = "_ideFiles/Libs/choices/choices.min.css";
    // shadow.appendChild(link);
}

function addChoicesJsToPage(page: Document) {
    // let script = document.createElement("script");
    // script.src = "_ideFiles/Libs/choices/choices.min.js";
    // page.head.appendChild(script);

    // let link = document.createElement("link");
    // link.rel = "stylesheet";
    // link.href = "_ideFiles/Libs/choices/choices.min.css";
    // page.head.appendChild(link);
 
 
}

