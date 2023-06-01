//log with  color
console.log("%c [ModuleLoader] module-loader webcomponent loaded", "background: #222; color: #bada55", this);
var template = document.createElement('template');
template.innerHTML = "\n<div style=\"display:none;\" class=\"module-loader\">  \n    <slot></slot>\n</div>";
class ModuleLoader extends HTMLElement {
  constructor() {
    super();
    console.log("%c [ModuleLoader] constructor", "background: #222; color: #bada55", this);
    this.attachShadow({
      mode: 'open'
    });
    if (!this.shadowRoot) throw new Error("No shadowRoot");
    this.thisShadowRoot = this.shadowRoot;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    console.log("%c [ModuleLoader] connectedCallback", "background: #222; color: #bada55", this);

    // setTimeout(() => {
    var slots = this.thisShadowRoot.querySelectorAll('slot');
    console.log(slots);
    var scriptURL = slots[0].assignedNodes()[0].textContent;
    console.log(scriptURL);
    if (!scriptURL) return;
    //import the script with no cache

    var scriptUrl = window.location.origin + scriptURL + "?v=" + new Date().getTime();
    import(scriptUrl).then(module => {
      console.log("module", module);
      var runMe = module.runMe;
      if (!runMe) throw new Error("No runMe function");
      if (!this.parentElement) throw new Error("No parentElement");
      var closestForm = this.parentElement.closest("form");
      if (!closestForm) throw new Error("No closestForm");
      var context = createFormBuilderContext(closestForm);
      runMe(context);
    }).catch(err => {
      console.log(err);
    });

    // }, 1000);

    this.render();
  }
  render() {
    console.log("%c [ModuleLoader] render", "background: #222; color: #bada55", this);
  }
}
window.customElements.define('module-loader', ModuleLoader);
function createFormBuilderContext(element) {
  if (!element) throw new Error("No element");
  if (!element.parentElement) throw new Error("No element.parentElement");
  var retValue = {
    koContext: window.ko.contextFor(element.parentElement),
    element: element,
    fields: getAlpacaFormFields(element),
    form: getAlpacaForm(element),
    workItemContext: window.ko.contextFor(element.parentElement).$parentContext.$data.options.model
  };
  //log with color
  console.log("%c [ModuleLoader] createFormBuilderContext return value", "background: #222; color: #bada55", retValue);
  return retValue;
}
function getAlpacaFormFields(context) {
  var alpaca = $(context).alpaca();
  return alpaca.childrenByPropertyId;
}
function getAlpacaForm(context) {
  var alpaca = $(context).alpaca();
  return alpaca;
}
export {};
//# sourceMappingURL=ModuleLoader.js.map