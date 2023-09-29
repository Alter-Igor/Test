import { err, l } from "../../../../Common/Log";
import { formatFunc } from "../../../../helpers/Formatter";
import { evaluteRule, executeFunc } from "../../../../helpers/evaluteRule";
import { ICSSRule, IFieldPlacement, IFieldRowField, IFieldRule, IIconRule, INameValue, IStyleEntry, IStyleRule } from "../ExternalMatterSearchInterface";
import { TCustomBindingContext } from "./TemplateGenerator";


export class TemplateApplicator {

  constructor() {
  }


  setupElement(element: HTMLElement, valueAccessor: () => any, allBindings: any, viewModel: any, bindingContext: any) {
    let instruction = allBindings().matterSearchBinding as TCustomBindingContext
    if (!instruction) {
      l(err("No instruction defined"));
      return;
    }
    if (instruction.type == "IFieldPlacement") {
      let rowField = instruction.object as IFieldPlacement;
      this.buildPlacements(rowField, "dataContextName", viewModel, element as HTMLDivElement);
    }
  }

  updateElement(element: HTMLElement, valueAccessor: () => any, allBindings: any, viewModel: any, bindingContext: any) {
    l("updateElement", element, valueAccessor, allBindings, viewModel, bindingContext)

  }


  buildPlacements(placement: IFieldPlacement, dataContextName: string, viewModel: any, container: HTMLDivElement) {
    let rowCounter = 0;
    const rootDiv = document.createElement('div');
    container.appendChild(rootDiv);

    if (placement.container) {
      container.classList.add('ems-container');
      let containerParent = container.parentElement as HTMLDivElement;
      if (containerParent) {
        containerParent.classList.add('ems-container-parent');
        this.addCSS(placement.container.cssClass, containerParent, dataContextName, viewModel);
        this.addStyle(placement.container.style, containerParent, dataContextName, viewModel);
      }
    }


    // rootDiv.classList.add('flex-row');
    rootDiv.classList.add('ems-placement-item');
    rootDiv.id = 'resultItem';
    this.addCSS(placement.cssClass, rootDiv, dataContextName, viewModel);
    this.addStyle(placement.style, rootDiv, dataContextName, viewModel);

    if (placement.icon) {
      this.addIcons(placement.icon, dataContextName, rootDiv, viewModel);
    }

    const divRowContainer = document.createElement('div');
    divRowContainer.classList.add('ems-row-container');

    rootDiv.appendChild(divRowContainer);

    placement.rows?.forEach(row => {
      rowCounter++;
      const rowDiv = document.createElement('div');
      rowDiv.style.alignItems = row.alignItems || 'space-between';
      rowDiv.classList.add('ems-row' + rowCounter);
      rowDiv.classList.add('ems-row');
      this.addCSS(row.cssClass, rowDiv, dataContextName, viewModel);
      this.addStyle(row.style, rowDiv, dataContextName, viewModel);
      row.fields?.forEach(field => {
        this.addField(field, dataContextName, rowDiv, viewModel);
      });
      divRowContainer.appendChild(rowDiv);
    });
  }



  addField(field: IFieldRowField, dataContextName: string, rowDiv: HTMLDivElement, viewModel: any) {
    const fieldDiv = document.createElement('div');
    fieldDiv.classList.add('ems-row-group');
    this.addCSS(field.cssClass, fieldDiv, dataContextName, viewModel);

    if (field.width) fieldDiv.style.width = `${field.width}px`;
    if (field.position) fieldDiv.style.textAlign = field.position;
    this.addStyle(field.style, fieldDiv, dataContextName, viewModel);

    if (field.label) {
      const labelElem = document.createElement('label');
      labelElem.textContent = field.label;
      labelElem.classList.add('ems-label');
      fieldDiv.appendChild(labelElem);
    }


    this.addIcons(field.icon, dataContextName, fieldDiv, viewModel); //TODO


    const spanElem = document.createElement('span');



    // addCustomBinding(spanElem, field,"IFieldRowField");
    // else {
    //   spanElem.setAttribute('data-bind', `text:${dataContextName}.${field.field}`);
    // }
    spanElem.classList.add('ems-field-value');

    if (field.field instanceof Array) {
      this.addFieldArray(field.field, field.formatter, spanElem, viewModel);
    }

    if (typeof field.field === "string") {
      this.setInnerHTML(field.field, field.formatter, viewModel, spanElem);
    }

    fieldDiv.appendChild(spanElem);
    rowDiv.appendChild(fieldDiv);


  }

  setInnerHTML(value: string, formatter: string | null | undefined, viewModel: any, element: HTMLElement) {
    let valueToSet = executeFunc(value, viewModel);

    if (typeof valueToSet !== "string") {
      valueToSet = JSON.stringify(valueToSet, null, 2);
    }

    if (formatter) {
      valueToSet = formatFunc(valueToSet, formatter);
    }
    element.innerHTML = valueToSet;
  }

  addIcons(icons: IIconRule[] | string | undefined | null, dataContextName: string, fieldDiv: HTMLDivElement, viewModel: any) {

    if (!icons) return;

    if (typeof icons === "string") {
      icons = [{ icon: icons }];
    }
    icons.forEach(iconRule => {
      // <div class="column-auto" style="margin-right:5px">
      // <span class="fa card-icon" data-bind="css:icon"></span>
      // </div>

      const iconElem = document.createElement('span');
      iconElem.className = 'fa card-icon ' + iconRule.icon;
      iconElem.classList.add('ems-icon');
      if (iconRule.cssClass) iconElem.classList.add(iconRule.cssClass);
      if (typeof iconRule.style === "string") iconElem.setAttribute('style', iconRule.style);
      if (iconRule.rule) {
        console.log("iconRule.rule", iconRule.rule);

        // let fullRulePath = `${iconRule.rule}`
        // if (dataContextName) {
        //   fullRulePath = `${dataContextName}.${iconRule.rule}`;
        // }

        // iconElem.setAttribute('data-bind', `visible:$root.evalFunc("${fullRulePath}",${dataContextName}, "${dataContextName}")`);
        let value = evaluteRule(iconRule.rule, viewModel);
        if (!value) {
          iconElem.style.display = "none";
        }
      }

      if (iconRule.position === 'before') {
        fieldDiv.insertBefore(iconElem, fieldDiv.firstChild);
      }

      if (iconRule.position === 'after') {
        fieldDiv.appendChild(iconElem);
      }

      if (!iconRule.position) {
        fieldDiv.appendChild(iconElem);
      }

    });
  }

  addCSS(cssClass: string | ICSSRule[] | null | undefined, rootDiv: HTMLDivElement, dataContextName: string, viewModel: any) {

    if (typeof cssClass === "string") {
      cssClass = [{ cssClass: cssClass }];
    }

    if (cssClass instanceof Array) {
      let arrItem = cssClass as ICSSRule[];
      for (let i = 0; i < arrItem.length; i++) {
        let cssRule = arrItem[i];
        let cssValue = executeFunc(cssRule.cssClass, viewModel);

        if (cssRule.rule) {
          let currentDataBind = rootDiv.getAttribute('data-bind') || '';
          if (currentDataBind) {
            currentDataBind += ',';
          }
          //rootDiv.setAttribute('data-bind', `${currentDataBind} css: { ${cssRule.cssClass} : $root.evalFunc("${dataContextName}.${cssRule.rule}",${dataContextName}, "${dataContextName}") }`);

          let rule = cssRule.rule;

          let value = evaluteRule(rule, viewModel);
          if (value) {
            rootDiv.classList.add(cssValue);
          }

        }
        else {
          rootDiv.classList.add(cssValue);
        }
      }
    }

  }

  addFieldArray(fields: IFieldRule[] | undefined | null, formatter: string | null| undefined, fieldDiv: HTMLElement, viewModel: any) {


    if (!fields) return;


    fields.forEach(field => {



      if (field.rule) {
        console.log("fieldRule.rule", field.rule);
        let value = evaluteRule(field.rule, viewModel);
        if (value) {
          this.setInnerHTML(field.field, formatter, viewModel, fieldDiv);
          // fieldDiv.innerHTML = fieldValue;
        }
      }
      else {
        this.setInnerHTML(field.field, formatter, viewModel, fieldDiv);
      }
    });
  }

  addStyle(style: IStyleEntry | undefined, rootDiv: HTMLDivElement, dataContextName: string, viewModel: any) {
    if (style == undefined) return;
    if (typeof style === "string") {
      style = [{ style: style }];
    }

    // if(!Array.isArray(style))
    // {
    //   style = [style];
    // }

    if (style instanceof Array) {
      let arrItem = style as IStyleRule[];
      for (let i = 0; i < arrItem.length; i++) {
        let styleRule = arrItem[i].rule;


        if (styleRule) {
          let currentDataBind = rootDiv.getAttribute('data-bind') || '';
          if (currentDataBind) {
            currentDataBind += ',';
          }
          //rootDiv.setAttribute('data-bind', `${currentDataBind} css: { ${cssRule.cssClass} : $root.evalFunc("${dataContextName}.${cssRule.rule}",${dataContextName}, "${dataContextName}") }`);
          let value = evaluteRule(styleRule, viewModel);
          if (value) {
            this.setStyles(style, viewModel, dataContextName, rootDiv)
          }

        }
        else {
          this.setStyles(style, viewModel, dataContextName, rootDiv)
        }
      }
    }
    else {
      this.setStyles(style, viewModel, dataContextName, rootDiv)
    }

  }

  setStyles(style: IStyleEntry, data: any, dataContextName: string, rootDiv: HTMLElement): any {
    let retValue: INameValue = {};

    if (!style) {
      return "";
    };

    if (typeof style === "string") {
      let n: IStyleRule = {
        style: style
      }
      return this.buildStyleNameValue(n, retValue);
    }



    if (Array.isArray(style)) {
      let arrItem = style as IStyleRule[];
      if (Array.isArray(arrItem)) {
        for (let i = 0; i < arrItem.length; i++) {
          let styleRuleOrNameValue = arrItem[i];
          if (styleRuleOrNameValue.rule) {
            if (evaluteRule(styleRuleOrNameValue.rule, data)) {
              if (!styleRuleOrNameValue.style) continue;
              retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
            }
          }
          else {
            retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
          }
        }
      }

      for (let i = 0; i < arrItem.length; i++) {
        let styleRuleOrNameValue = arrItem[i];
        if (styleRuleOrNameValue.rule) {
          if (evaluteRule(styleRuleOrNameValue.rule, data)) {
            if (!styleRuleOrNameValue.style) continue;
            retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
          }
        }
        else {
          retValue = this.buildStyleNameValue(styleRuleOrNameValue, retValue);
        }
      }
    }
    else {

      if (typeof style === "object") { //must be a NameValue
        retValue = style;
      }
    }

    //loop through the retValue and add styles to element
    for (let key in retValue) {
      if (retValue.hasOwnProperty(key)) {
        rootDiv.style[key as any] = retValue[key as any];
      }
    }
  }


  buildStyleNameValue(rule: IStyleRule, retValue: INameValue) {

    if (typeof rule.style === "object") {
      retValue = { ...retValue, ...rule.style };
    }

    if (typeof rule.style === "string") {
      let styleItems = rule.style.split(";");
      for (let i = 0; i < styleItems.length; i++) {
        let styleItem = styleItems[i];
        let nameValue = styleItem.split(":");
        if (nameValue.length == 2) {
          retValue[nameValue[0].trim()] = nameValue[1].trim();
        }
      }
    }
    return retValue;
  }



}