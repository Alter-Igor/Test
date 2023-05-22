import { IFormBuilderContext } from "../Typings/FormBuilder/IFormBuilderContext";

//log with  color
console.log("%c [ModuleLoader] module-loader webcomponent loaded", "background: #222; color: #bada55", this);

const template = document.createElement('template');
template.innerHTML = `
<div style="display:none;" class="module-loader">  
    <slot></slot>
</div>`;
 
class ModuleLoader extends HTMLElement{
  thisShadowRoot: ShadowRoot
 constructor(){
     super();
     console.log("%c [ModuleLoader] constructor", "background: #222; color: #bada55", this);
     this.attachShadow({ mode: 'open'});
     if(!this.shadowRoot) throw new Error("No shadowRoot");
     this.thisShadowRoot = this.shadowRoot;
     this.shadowRoot.appendChild(template.content.cloneNode(true));
     
    
 } 

 connectedCallback(){
    console.log("%c [ModuleLoader] connectedCallback", "background: #222; color: #bada55", this);
     
    // setTimeout(() => {
    let slots = this.thisShadowRoot.querySelectorAll('slot');
    console.log(slots);

    let scriptURL = slots[0].assignedNodes()[0].textContent;
    console.log(scriptURL);
    if(!scriptURL) return;
    import(window.location.origin + scriptURL).then((module) => {
        console.log("module",module);
        let runMe = module.runMe; 
        if(!runMe) throw new Error("No runMe function");
        if(!this.parentElement) throw new Error("No parentElement");
        let closestForm = this.parentElement.closest("form");
        if(!closestForm) throw new Error("No closestForm");
        let context = createFormBuilderContext(closestForm);
        runMe(context);
    });
    
    // }, 1000);
  

   this.render();
 }

 render(){
    console.log("%c [ModuleLoader] render", "background: #222; color: #bada55", this);
 }
}
window.customElements.define('module-loader', ModuleLoader);


function createFormBuilderContext(element: HTMLElement) : IFormBuilderContext {
    if(!element) throw new Error("No element");
    if(!element.parentElement) throw new Error("No element.parentElement");

    let retValue : IFormBuilderContext = {
        koContext: window.ko.contextFor(element.parentElement),
        element: element,
        alpacaForm: getAlpacaForm(element),
        workItemContext: (window.ko.contextFor(element.parentElement) as any).$parentContext.$data.options.model
    }
    //log with color
    console.log("%c [ModuleLoader] createFormBuilderContext return value", "background: #222; color: #bada55", retValue);

    return retValue;

}

function getAlpacaForm(context: any) {
    return ($(context) as any).alpaca();
}
