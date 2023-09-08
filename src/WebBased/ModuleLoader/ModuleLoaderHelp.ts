/**
 * ModuleLoader
 * created by: Igor Jericevich
 * created on: 2023/05/31
 * @module ModuleLoader
 * @description This module is used to load other modules into the form builder
 * Note: This module is used in the eDiscovery project to provide helper functions to the form builder
 * within form builder add a 
 */

import { BindingContext } from "knockout";
import { IFormBuilderContext } from "../../Typings/FormBuilder/IFormBuilderContext";
import { TShareDoBlade } from "../../Typings/SharedoAspectModels/TShareDoBlade";
import { FormBuilder } from "./AlphacaAdapter";

//log to the screen that this file has been loaed into the browser
console.log("%c [ModuleLoader] module-loader webcomponent loaded", "background: #222; color: #bada55", this);

//create the template for the webcomponent
const template = document.createElement('template');
template.innerHTML = `
<div style="display:none;" class="module-loader">  
    <slot></slot>
</div>`;
 
//create the webcomponent
//using shadow dom to isolate any html and css produced by the module
class ModuleLoader extends HTMLElement{
  thisShadowRoot: ShadowRoot | undefined;
 constructor(){
     super();
     //log that the constructor has been called
     console.log("%c [ModuleLoader] constructor", "background: #222; color: #bada55", this);
     //attach the shadow dom and add the template
     this.addTemplateToShadowRoot();    
 } 


   /**
    * Attaches the template to the shadow root
    * @private
    * @memberof ModuleLoader
    * @returns {void}
    */
    private addTemplateToShadowRoot() {
        this.attachShadow({ mode: 'open' });
        if (!this.shadowRoot)
            throw new Error("No shadowRoot");
        this.thisShadowRoot = this.shadowRoot;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

 connectedCallback(){
    console.log("%c [ModuleLoader] connectedCallback", "background: #222; color: #bada55", this);
     
    // setTimeout(() => {
    if(!this.thisShadowRoot) throw new Error("No thisShadowRoot");

    let slots = this.thisShadowRoot.querySelectorAll('slot');
    console.log(slots);

    let scriptURL = slots[0].assignedNodes()[0].textContent;
    console.log(scriptURL);
    if(!scriptURL) return;
    //import the script with no cache
    
    let scriptUrl = window.location.origin + scriptURL + "?v=" + new Date().getTime();
    let loadScript = async () =>
    {

    
    let {runMe} = await import(/* webpackIgnore: true */ scriptUrl);

        console.log("module",runMe);
        //let runMe = module.runMe; 
        if(!runMe) throw new Error("No runMe function");
        if(!this.parentElement) throw new Error("No parentElement");
        let closestForm = this.parentElement.closest("form");
        if(!closestForm) throw new Error("No closestForm");
        let context = createFormBuilderContext(closestForm);
        runMe(context);
    }

    loadScript();
      
   this.render();
 }

 render(){
    console.log("%c [ModuleLoader] render", "background: #222; color: #bada55", this);
 }
}
window.customElements.define('module-loader', ModuleLoader);


function createFormBuilderContext(element: HTMLElement) : IFormBuilderContext {
    //log
    console.log("%c [ModuleLoader] createFormBuilderContext", "background: #222; color: #bada55", element);
    if(!element) throw new Error("No element");
    if(!element.parentElement) throw new Error("No element.parentElement");
   
    console.log("%c [ModuleLoader] Applying context", "background: #222; color: #bada55");
    let koContext = window.ko.contextFor(element.parentElement);
    let blade = getBlade(koContext);
    let workItemContext = (window.ko.contextFor(element.parentElement) as any).$parentContext.$data.options.model;

    console.log("%c [ModuleLoader] createFormBuilderContext", "background: #222; color: #bada55", koContext, blade, element, workItemContext);

    let retValue : IFormBuilderContext = {
        koContext: koContext,
        blade: blade,
        element: element,
        form: getAlpacaFormAdapter(element),
        workItemContext: workItemContext,
        getAspect: (aspectSystemName: string) => getAspect(aspectSystemName,blade)
    }
    //log with color
    console.log("%c [ModuleLoader] createFormBuilderContext return value", "background: #222; color: #bada55", retValue);

    return retValue;

}

function getAlpacaFormFields(context: any) {
    let alpaca = ($(context) as any).alpaca();
    return alpaca.childrenByPropertyId
}

function getAlpacaForm(context: any) {
    let alpaca = ($(context) as any).alpaca();
    return alpaca;
}

function getBlade(context: BindingContext<any>) : TShareDoBlade {
    let blade = context.$parentContext?.$root.options.blade;
    return blade;
}

function getAspect(aspectSystemName: string, blade:TShareDoBlade): any {
    let find = blade.aspects().find(t=>t.widget.base.systemName=="Sharedo.Core.Legal.Aspects.Widgets.InstructionWorkTypeDetails")
    if(!find) {
        //log
        console.log("%c [ModuleLoader] getAspect return value", "background: #222; color: #bada55", find);
    }
    return find;
}

function getAlpacaFormAdapter(element: HTMLElement) :FormBuilder | undefined
{
    return new FormBuilder(element);
}

