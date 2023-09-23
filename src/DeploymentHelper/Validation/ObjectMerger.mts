
export function mergeValues(targetValue: any, defaultValue: any): any {
    if (targetValue === null || targetValue === undefined) {
      return defaultValue;
    }
  
    if (Array.isArray(targetValue)) {
      return targetValue.length > 0 ? targetValue : defaultValue;
    }
  
    if (typeof targetValue === 'object') {
      return mergeObjects(targetValue, defaultValue);
    }
  
    return targetValue;
  }

function mergeObjects(target: any, defaults: any): any {
    const output = { ...defaults };
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        if (typeof target[key] === 'object' && !Array.isArray(target[key]) && target[key] !== null) {
          output[key] = mergeObjects(target[key], defaults[key] || {});
        } else {
          output[key] = target[key];
        }
      }
    }
    return output;
  }
