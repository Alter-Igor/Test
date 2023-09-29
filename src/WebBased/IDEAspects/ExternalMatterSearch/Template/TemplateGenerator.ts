import ko from "knockout";
import { NestedObservableObject } from "../../BaseClasses/KOConverter";
import { ICSSRule, IFieldPlacement, IFieldRow, IFieldRowField, IIconRule, INameValue, IStyleRule } from "../ExternalMatterSearchInterface";
import { TemplateApplicator } from "./TemplateApplicator";



export type TCustomBindingContext =
{
  type: "IFieldRowField" | "IFieldRow" | "IFieldPlacement",
  object: IFieldRowField | IFieldRow | IFieldPlacement
}


export function autoGenerateTemplate(fieldNames: string[]): IFieldPlacement {
  const rows: IFieldRow[] = [];

  for (let i = 0; i < fieldNames.length; i++) {
    const fieldName = fieldNames[i];
    const row: IFieldRow = {
      fields: [
        {
          field: fieldName,
          formatter: i < 2 ? 'value.toUpperCase()' : undefined,
          style: i < 1 ? 'font-weight:bold' : undefined,
          icon: i < 1 ? [{ rule: 'isSecure', icon: 'fa-shield', position: "before" }] : undefined,
          label: i === 1 ? 'Status' : undefined,
          position: i === 1 ? 'right' : undefined,
          width: null,
        }
      ]
    };



    rows.push(row);
  }

  return {
    rows: rows,
    // icon: [
    //   {
    //     icon: 'fa-search'
    //   }
    // ]
    // Add other properties if you want
    // for example: cssClass, style, icon, etc.
  };
};

// element — The DOM element involved in this binding
// valueAccessor — A JavaScript function that you can call to get the current model property that is involved in this binding. Call this without passing any parameters (i.e., call valueAccessor()) to get the current model property value. To easily accept both observable and plain values, call ko.unwrap on the returned value.
// allBindings — A JavaScript object that you can use to access all the model values bound to this DOM element. Call allBindings.get('name') to retrieve the value of the name binding (returns undefined if the binding doesn’t exist); or allBindings.has('name') to determine if the name binding is present for the current element.
// viewModel — This parameter is deprecated in Knockout 3.x. Use bindingContext.$data or bindingContext.$rawData to access the view model instead.
// bindingContext — An object that holds the binding context available to this element’s bindings. This object includes special properties including $parent, $parents, and $root that can be used to access data that is bound against ancestors of this context.
export type ISetDynamic = (element: HTMLElement, valueAccessor: () => any, allBindings: any, viewModel: any, bindingContext: any) => void;

export function generateHtmlDiv(placement: IFieldPlacement, dataContextName: string, container: HTMLDivElement, applicator: TemplateApplicator) {
  // <div id="resultItem" class="flex-row result-item">


  ko.bindingHandlers.matterSearchBinding = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      applicator.setupElement(element, valueAccessor, allBindings, viewModel, bindingContext);
      // This will be called when the binding is first applied to an element
      // Set up any initial state, event handlers, etc. here
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      applicator.updateElement(element, valueAccessor, allBindings, viewModel, bindingContext);
      // This will be called once when the binding is first applied to an element,
      // and again whenever any observables/computeds that are accessed change
      // Update the DOM element based on the supplied values here.

      // customUpdateBinding(element, valueAccessor, allBindings, viewModel, bindingContext);
    }
  };


  const rootDiv = document.createElement('div');
  container.appendChild(rootDiv);


  // if (placement.container) {
  //   container.classList.add('ems-container');
  //   addCSS(placement.container.cssClass, container, dataContextName);
  //   addStyle(placement.container.style, container, dataContextName);
  // }


  // rootDiv.classList.add('flex-row');
  // rootDiv.classList.add('ems-result-item');
  // rootDiv.id = 'resultItem';
  // addCSS(placement.cssClass, rootDiv, dataContextName);
  // addStyle(placement.style, rootDiv, dataContextName);

  // if (placement.icon) {
  //   addIcons(placement.icon, dataContextName, rootDiv);
  // }

  const divElemColumn = document.createElement('div');
  // divElemColumn.classList.add('ems-row-container');
  
  // rootDiv.appendChild(divElemColumn);

  addCustomBinding(rootDiv, placement,"IFieldPlacement");
  // buildPlacements(placement, dataContextName, divElemColumn);
   return rootDiv;
}


function addCustomBinding(element: HTMLElement, field: any,type: "IFieldRowField" | "IFieldRow" | "IFieldPlacement") {

  // data-bind="yourBindingName: someValue">

  let currentDataBind = element.getAttribute('data-bind') || '';
  if (currentDataBind) {
    currentDataBind += ',';
  }

  let customContext: TCustomBindingContext =
  {
    type: type,
    object: field
  }

  element.setAttribute('data-bind', `${currentDataBind} matterSearchBinding: ${JSON.stringify(customContext, null, 2)}`);
}






//converted:



// function addField(field: IFieldRowField, dataContextName: string, rowDiv: HTMLDivElement) {
//   const fieldDiv = document.createElement('div');
//   fieldDiv.classList.add('ems-row-group');
//   //if (field.cssClass) fieldDiv.classList.add(field.cssClass);
//   addCSS(field.cssClass, fieldDiv, dataContextName);

//   if (field.width) fieldDiv.style.width = `${field.width}px`;
//   if (field.position) fieldDiv.style.textAlign = field.position;
//   // if (field.style) fieldDiv.setAttribute('style', field.style);
//   addStyle(field.style, fieldDiv, dataContextName);

//   if (field.label) {
//     const labelElem = document.createElement('label');
//     labelElem.textContent = field.label;
//     labelElem.classList.add('ems-label');
//     fieldDiv.appendChild(labelElem);
//   }

//   if (field.icon && field.icon.length > 0) {
//     addIcons(field.icon, dataContextName, fieldDiv);
//   }

//   const spanElem = document.createElement('span');
//   // if (field.formatter) {
//   //spanElem.setAttribute('data-bind', `text:$root.formatFunc(${dataContextName},'${field.field}','${field.formatter}','${dataContextName}.${field.field}')`);
//   // }

//   addCustomBinding(spanElem, field,"IFieldRowField");
//   // else {
//   //   spanElem.setAttribute('data-bind', `text:${dataContextName}.${field.field}`);
//   // }
//   spanElem.classList.add('ems-field-value');
//   fieldDiv.appendChild(spanElem);
//   rowDiv.appendChild(fieldDiv);
// }

// function addCSS(cssClass: string | ICSSRule[] | null | undefined, rootDiv: HTMLDivElement, dataContextName: string) {

//   if (typeof cssClass === "string") {
//     cssClass = [{ cssClass: cssClass }];
//   }

//   if (cssClass instanceof Array) {
//     let arrItem = cssClass as ICSSRule[];
//     for (let i = 0; i < arrItem.length; i++) {
//       let cssRule = arrItem[i];
//       if (cssRule.rule) {
//         let currentDataBind = rootDiv.getAttribute('data-bind') || '';
//         if (currentDataBind) {
//           currentDataBind += ',';
//         }
//         rootDiv.setAttribute('data-bind', `${currentDataBind} css: { ${cssRule.cssClass} : $root.evalFunc("${dataContextName}.${cssRule.rule}",${dataContextName}, "${dataContextName}") }`);
//       }
//       else {
//         rootDiv.classList.add(cssRule.cssClass as string);
//       }
//     }
//   }

// }

// function addStyle(style: string | IStyleRule[] | INameValue | null | undefined, rootDiv: HTMLDivElement, dataContextName: string) {

//   if (!style) return;

//   if (style instanceof String) {
//     style = [{ style: style as string }];
//   }

//   let currentDataBind = rootDiv.getAttribute('data-bind') || '';
//   if (currentDataBind) {
//     currentDataBind += ',';
//   }

//   let jsonStyleRules = JSON.stringify(style);
//   //base64 encode
//   jsonStyleRules = btoa(jsonStyleRules);
//   rootDiv.setAttribute('data-bind', `${currentDataBind} style: $root.setStyles('${jsonStyleRules}',${dataContextName},"${dataContextName}")`);


// }