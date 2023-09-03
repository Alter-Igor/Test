import { FormBuilder, Formio } from 'formiojs';
import { DeferredPromise } from "../../Common/DifferedPromise";
import { exampleFormComponents } from '../../Formio/Common/FormioBuilder';
let formBuilder: FormBuilder;



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
});

function build(deferred: DeferredPromise<FormBuilder>, schema: string | undefined) {

    let schemaObj: any;
    if (schema) {
        try {
            schemaObj = schema ? JSON.parse(schema) : undefined;
        }
        catch (e) {
            console.error(e);
        }
    }

    let formiolocation = document.querySelector("#formio")!;
    
    formBuilder = new FormBuilder(formiolocation, {
        components: schemaObj.component
    }
        , {
            builder: {
                resource: false,
                advanced: false,
                premium: false
            }
        });


    (window as any).formBuilder = formBuilder;
    deferred.resolve(formBuilder);
}

function buildWithExample(deferred: DeferredPromise<FormBuilder>)
{
    build(new DeferredPromise<FormBuilder>(), JSON.stringify(exampleFormComponents, null, 2));
}

(window as any).build = build;
(window as any).buildWithExample = buildWithExample
