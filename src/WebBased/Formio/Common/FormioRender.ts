import { Formio } from 'formiojs';
import { TestForm } from '../FormWidget/TestForm';
import { addDefaultFormIOStyleSheetsToShadow, checkLowdashCompatability } from './Styling';
import { setAll } from './SetDataContext';

export function renderForm(element: HTMLElement | Element, formDefinition: string | Object | undefined, data?: Object | undefined) {
    if (!formDefinition) {
        throw new Error("Form definition is undefined");
    }
    checkLowdashCompatability();
    // add shadowdom to element, this will allow us to encapsulate the form and its styles
    // so that it does not interfere with the rest of the page or vice versa
    // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
    // this is a best practice for web components and is supported by all modern browsers

    let shadow = element.attachShadow({ mode: 'open' });
    addDefaultFormIOStyleSheetsToShadow(shadow);

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



function createFormIODivInsideShadowDom(shadow: ShadowRoot) {
    let div = document.createElement('div');
    div.id = "formio";
    shadow.appendChild(div);
    return div;
}

export async function renderTestForm(element: Element | HTMLElement) {

    checkLowdashCompatability();

    // add shadowdom to element
    let shadow = element.attachShadow({ mode: 'open' });

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

document.addEventListener("DOMContentLoaded", function (event) {
    //Set all data context
    //only after the DOM is loaded as page context is not available before that
    setAll();
});
