import { getNestedProperty } from "./ObjectHelper";


export function replaceValues(template:string, data:any) {
    return template.replace(/\{([^}]+)\}/g, function(match, p1) {
      // Removing the data prefix and accessing the property on the data object
      let propertyPath = p1.replace('data.', '');
      return getNestedProperty(data, propertyPath);
    });
  }