import { extractValue } from "../../../helpers/VakueExtractor";
import { getNestedProperty, setNestedProperty } from "../../Common/ObjectHelper";
import { IDataMapping } from "./ExternalMatterSearchInterface";

  
//   function getNestedProperty(obj: any, path: string) {
//     return path.split('.').reduce((acc, part) => acc && acc[part], obj);
//   }
  
/**
 * Maps data from one format to another according to a provided mapping. 
 * Below is a step-by-step explanation of this function
 * @param data The input data that needs to be mapped.
 * @param dataMapping An array of mapping objects that defines how the data should be transformed.
 * @param rawJSONField An optional string parameter to store the original data as a Base64-encoded JSON string.
 * @returns  It returns the mappedData object containing all the mapped values.
 * 1. Iteration Over Mappings: The function iterates over each mapping object in the dataMapping array.
      Destructuring Mapping Object: For each mapping object, it extracts formBuilderField and searchResultField.
   2.  Handle Wildcard Mappings:
      If searchResultField contains the string "{*}", the function handles wildcard mappings.
      It retrieves the base string of searchResultField by removing the "{*}" and subsequent characters.
      It removes curly braces and trims the trailing period if present.
      It retrieves the value from the data object using getNestedProperty(data, objectBase).
      If the retrieved value is an object, it iterates over the object's entries, capitalizes the first letter of each key, and adds the subvalue to mappedData with a key constructed by replacing "{*}" in formBuilderField with the capitalized key.
   3. Handle Regular Mappings:
      For searchResultField values without "{*}", it handles regular mappings.
      If searchResultField contains curly braces, it retrieves the value by removing the curly braces, splitting by '-', retrieving nested properties for each part, and joining the parts with '-'.
      Otherwise, it retrieves the value by removing curly braces from searchResultField and getting the nested property.
      It assigns the retrieved value to mappedData using formBuilderField as the key.
      Optional Base64 Encoding:
      If rawJSONField is provided, it converts the data object to a JSON string, encodes it in Base64, and assigns it to mappedData with the key specified by rawJSONField.
 */
  export function mapData(data: any, dataMapping: IDataMapping[], dataContextName?:string): any {
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
  
        // const value = getNestedProperty(data, objectBase);
        const value = extractValue(objectBase, data, null,dataContextName);
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
          value = extractValue(value, data, null,dataContextName);
          // value = value.split('-').map((part) => {
          //   // return getNestedProperty(data, part);
          //   return extractValue(part, data, null);
          // }).join('-');
          mappedData[formBuilderField] = value;
        } else {
          let value = getNestedProperty(data, searchResultField.replace(/{|}/g, ''));
          value = extractValue(value, data, null,dataContextName);
          mappedData[formBuilderField] = value;
        }
      }
    }

    
  
    return mappedData;
  }


/**
 * Attemps reverse mapping of data from one format to another according to a provided mapping.
 * @param mappedData 
 * @param dataMapping 
 * @returns 
 */
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