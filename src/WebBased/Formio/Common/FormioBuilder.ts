import { FormBuilder } from "formiojs";
import { checkLowdashCompatability } from "./Styling";
import { DeferredPromise } from "../../Common/DifferedPromise";


export function createFormBuilderPage(element: Element,schema: string) : DeferredPromise<FormBuilder> {
    //crerate a iframe using the html and insert it into the element
    checkLowdashCompatability();

    const deferred = new DeferredPromise<FormBuilder>();

    //check if iframe already exists
    let iframe = element.querySelector("iframe");
    if (iframe) {
        element.removeChild(iframe);
    }
 

    iframe = document.createElement("iframe");
    iframe.setAttribute("src", "/_ideFiles/Widgets/FormWidget/FormIOBuilder/page.html");

    iframe.setAttribute("width", "100%");

    //get current window height
    let screenHeight = window.innerHeight - 200;
    iframe.setAttribute("height", screenHeight.toString());

    //monitor screen height and resize iframe
    window.addEventListener("resize", function () {
        let screenHeight = window.innerHeight - 200;
        if (!iframe) { return; }
        iframe.setAttribute("height", screenHeight.toString());
    });



    element.appendChild(iframe);


    iframe.onload = function () {
        if (!iframe) { return; }

        

        //deferred.resolve(iframe.contentWindow as any);
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
    

    (iframe.contentWindow as any).build(deferred,schema);
}
