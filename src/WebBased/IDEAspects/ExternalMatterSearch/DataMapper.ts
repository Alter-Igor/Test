import { getNestedProperty, setNestedProperty } from "../BaseClasses/ObjectHelpers";
import { IDataMapping } from "./ExternalMatterSearchInterface";

  
//   function getNestedProperty(obj: any, path: string) {
//     return path.split('.').reduce((acc, part) => acc && acc[part], obj);
//   }
  
  export function mapData(data: any, dataMapping: IDataMapping[], rawJSONField?: string): any {
    const mappedData: any = {};
  
    for (const mapping of dataMapping) {
      const { formBuilderField, searchResultField } = mapping;
  
      if (searchResultField.includes("{*}")) {
        // Handle wildcard mappings
        const searchResultBase = searchResultField.split("{*}")[0];
        let objectBase = searchResultBase.replace(/{|}/g, '');
        if (objectBase.endsWith(".")) {
          objectBase = objectBase.substring(0, objectBase.length - 1);
        }
  
        const value = getNestedProperty(data, objectBase);
        if (typeof value === 'object') {
          for (const [key, subValue] of Object.entries(value)) {
            let keyWithFirstLetterCapitalized = key.charAt(0).toUpperCase() + key.slice(1);
            mappedData[`${formBuilderField.replace("{*}", keyWithFirstLetterCapitalized)}`] = subValue;
          }
        }
      } else {
        // Handle regular mappings
        if (searchResultField.includes("{") && searchResultField.includes("}")) {
          let value = searchResultField.replace(/{|}/g, '');
          value = value.split('-').map((part) => {
            return getNestedProperty(data, part);
          }).join('-');
          mappedData[formBuilderField] = value;
        } else {
          const value = getNestedProperty(data, searchResultField.replace(/{|}/g, ''));
          mappedData[formBuilderField] = value;
        }
      }
    }

    if(rawJSONField){
      let base64EncodedData = btoa(JSON.stringify(data));
      mappedData[rawJSONField] =  base64EncodedData;
    }
  
    return mappedData;
  }



export function reverseMapData(mappedData: any, dataMapping: IDataMapping[]): any {
    const originalData: any = {};
  
    for (const mapping of dataMapping) {
      const { formBuilderField, searchResultField } = mapping;
  
      if (searchResultField.includes("{*}")) {
        // Handle wildcard mappings
        const searchResultBase = searchResultField.split("{*}")[0];
        let objectBase = searchResultBase.replace(/{|}/g, '');
        if (objectBase.endsWith(".")) {
          objectBase = objectBase.substring(0, objectBase.length - 1);
        }
  
        originalData[objectBase] = originalData[objectBase] || {};
  
        for (const [key, value] of Object.entries(mappedData)) {
          if (key.startsWith(formBuilderField.replace("{*}", ''))) {
            const subKey = key.replace(formBuilderField.replace("{*}", ''), '').charAt(0).toLowerCase() + key.slice(formBuilderField.length);
            setNestedProperty(originalData, `${objectBase}.${subKey}`, value);
          }
        }
      } else {
        // Handle regular mappings
        if (searchResultField.includes("{") && searchResultField.includes("}")) {
          let value = mappedData[formBuilderField];
          if (value && searchResultField.includes('-')) {
            const parts = searchResultField.split('-');
            const values = value.split('-');
            for (let i = 0; i < parts.length; i++) {
              setNestedProperty(originalData, parts[i].replace(/{|}/g, ''), values[i]);
            }
          } else {
            setNestedProperty(originalData, searchResultField.replace(/{|}/g, ''), value);
          }
        } else {
          const value = mappedData[formBuilderField];
          setNestedProperty(originalData, searchResultField.replace(/{|}/g, ''), value);
        }
      }
    }
  
    return originalData;
  }