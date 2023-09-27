import { NestedObservableObject } from "../BaseClasses/KOConverter";
import { ICSSRule, IFieldPlacement, IFieldRow, IFieldRowField, IIconRule, INameValue, IStyleRule } from "./ExternalMatterSearchInterface";

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


export function generateHtmlDiv(placement: IFieldPlacement, dataContextName: string, container: HTMLDivElement) {
  // <div id="resultItem" class="flex-row result-item">
  const rootDiv = document.createElement('div');
  container.appendChild(rootDiv);

  
  if(placement.container) {
    container.classList.add('ems-container');
    addCSS(placement.container.cssClass, container, dataContextName);
    addStyle(placement.container.style, container, dataContextName);
  }


  // rootDiv.classList.add('flex-row');
  rootDiv.classList.add('ems-result-item');
  rootDiv.id = 'resultItem';
  addCSS(placement.cssClass, rootDiv, dataContextName);
  addStyle(placement.style, rootDiv, dataContextName);

  if (placement.icon) {
    addIcons(placement.icon, dataContextName, rootDiv);
  }

  const divElemColumn = document.createElement('div');
  divElemColumn.classList.add('ems-row-container');
  rootDiv.appendChild(divElemColumn);

  let rowCounter = 0;
  placement.rows?.forEach(row => {
    rowCounter++;
    const rowDiv = document.createElement('div');
    rowDiv.style.alignItems = row.alignItems || 'space-between';
    rowDiv.classList.add('ems-row' + rowCounter);
    rowDiv.classList.add('ems-row');
    addCSS(row.cssClass, rowDiv, dataContextName);
    addStyle(row.style, rowDiv, dataContextName);
    row.fields?.forEach(field => {
      addField(field, dataContextName, rowDiv);
    });
    divElemColumn.appendChild(rowDiv);
  });

  return rootDiv;
}

function addCSS(cssClass: string | ICSSRule[] | null | undefined, rootDiv: HTMLDivElement, dataContextName: string) {
  
  if(typeof cssClass === "string") {
    cssClass = [{cssClass: cssClass}];
  }
  
  if (cssClass instanceof Array) {
    let arrItem = cssClass as ICSSRule[];
    for (let i = 0; i < arrItem.length; i++) {
      let cssRule = arrItem[i];
      if (cssRule.rule) {
        let currentDataBind = rootDiv.getAttribute('data-bind') || '';
        if (currentDataBind) {
          currentDataBind += ',';
        }
        rootDiv.setAttribute('data-bind', `${currentDataBind} css: { ${cssRule.cssClass} : $root.evalFunc("${dataContextName}.${cssRule.rule}",${dataContextName}, "${dataContextName}") }`);
      }
      else {
        rootDiv.classList.add(cssRule.cssClass as string);
      }
    }
  }
  
}

function addStyle(style: string | IStyleRule[] | INameValue | null | undefined, rootDiv: HTMLDivElement, dataContextName: string) {
  
  if(!style) return;

  if (style instanceof String) {
    style = [{style: style as string}];
  }
  
    let currentDataBind = rootDiv.getAttribute('data-bind') || '';
        if (currentDataBind) {
          currentDataBind += ',';
        }
 
    let jsonStyleRules = JSON.stringify(style);
    //base64 encode
    jsonStyleRules = btoa(jsonStyleRules);
    rootDiv.setAttribute('data-bind', `${currentDataBind} style: $root.setStyles('${jsonStyleRules}',${dataContextName},"${dataContextName}")`);
  
 
}

function addField(field: IFieldRowField, dataContextName: string, rowDiv: HTMLDivElement) {
  const fieldDiv = document.createElement('div');
  fieldDiv.classList.add(`ems-${field.field}`);
  fieldDiv.classList.add('ems-row-group');
  //if (field.cssClass) fieldDiv.classList.add(field.cssClass);
  addCSS(field.cssClass, fieldDiv, dataContextName);

  if (field.width) fieldDiv.style.width = `${field.width}px`;
  if (field.position) fieldDiv.style.textAlign = field.position;
  // if (field.style) fieldDiv.setAttribute('style', field.style);
  addStyle(field.style, fieldDiv, dataContextName);

  if (field.label) {
    const labelElem = document.createElement('label');
    labelElem.textContent = field.label;
    labelElem.classList.add('ems-label');
    fieldDiv.appendChild(labelElem);
  }

  if (field.icon && field.icon.length > 0) {
    addIcons(field.icon, dataContextName, fieldDiv);
  }

  const spanElem = document.createElement('span');
  if (field.formatter) {
    spanElem.setAttribute('data-bind', `text:$root.formatFunc(${dataContextName}.${field.field},'${field.formatter}')`);
  }

  else {
    spanElem.setAttribute('data-bind', `text:${dataContextName}.${field.field}`);
  }
  spanElem.classList.add('ems-field-value');
  fieldDiv.appendChild(spanElem);
  rowDiv.appendChild(fieldDiv);
}

function addIcons(icons: IIconRule[] | string | undefined, dataContextName: string, fieldDiv: HTMLDivElement) {

  if (!icons) return;

  if(typeof icons === "string") {
    icons = [{icon: icons}];
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
      iconElem.setAttribute('data-bind', `visible:$root.evalFunc("${dataContextName}.${iconRule.rule}",${dataContextName}, "${dataContextName}")`);
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