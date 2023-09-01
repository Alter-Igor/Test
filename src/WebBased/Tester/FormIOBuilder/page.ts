import { FormBuilder, Formio } from 'formiojs';

let formBuilder: FormBuilder;



document.addEventListener("DOMContentLoaded", () => {
    build();
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

function build() {
    let formiolocation = document.querySelector("#formio")!;
    // formBuilder = new FormBuilder(formiolocation, undefined, undefined);
    

    formBuilder = new FormBuilder(formiolocation, {}, {
        builder: {
            basic: true,
            advanced: true,
            data: false, 
        },
        editForm: {
            textfield: [
                {
                    key: 'api',
                    ignore: true
                }
            ]
        } 
    });

    (window as any).formBuilder = formBuilder;
}