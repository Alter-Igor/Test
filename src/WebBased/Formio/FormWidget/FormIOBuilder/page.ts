import { FormBuilder, Formio } from 'formiojs';
import { DeferredPromise } from "../../../Common/DifferedPromise";
let formBuilder: FormBuilder;



document.addEventListener("DOMContentLoaded", () => {
    // build();
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

function build(deferred  : DeferredPromise<FormBuilder>,schema:string | undefined) {
    let formiolocation = document.querySelector("#formio")!;
    let schemaObj = schema ? JSON.parse(schema) : undefined;

    formBuilder = new FormBuilder(formiolocation, {
        components:schemaObj.components 
    },{});

    (window as any).formBuilder = formBuilder;
    deferred.resolve(formBuilder);
}

(window as any).build = build;