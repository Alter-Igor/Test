import { l, inf, err } from "../../Common/Log";

export function strToClass(className:string, base:any) {
    const classParts = className.split('.');
    let classReference = base;

    for (const part of classParts) {
        if(!classReference[part]) 
        {
            return undefined;
        }
        classReference = classReference[part];
    }; 
    return classReference;
}


export function setAllFieldsToNull(model:any) {
    let keys = Object.keys(model);
    keys.forEach((key: any) => {
        model[key] = null;
    });
}


export function flattenObject(ob: any) {
    var toReturn: any = {};

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if ((typeof ob[i]) == 'object') {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}


export function setNestedProperty(obj: any, propertyPath: string, value: any): void {
    const properties = propertyPath.split('.');
    let current = obj;

    for (let i = 0; i < properties.length - 1; i++) {
        const prop = properties[i];
        if (!current[prop]) {
            current[prop] = {};
        }
        current = current[prop];
    }
    current[properties[properties.length - 1]] = value;
}

export function getNestedProperty(obj: any, propertyPath: string): any {
    l(inf(`getNestedProperty(${propertyPath})`),obj);
    
    const properties = propertyPath.split('.');
    let current = obj;

    for (const prop of properties) {
        // Check if the property has an array index, e.g., "data[0]"
        const matches = prop.match(/^([a-zA-Z0-9_]+)\[([0-9]+)\]$/);

        if (matches) {
            const arrayProp = matches[1];
            const index = parseInt(matches[2], 10);

            if (!Array.isArray(current[arrayProp]) || current[arrayProp][index] === undefined) {
                l(err(`getNestedProperty(${propertyPath}): arrayProp or index is undefined`),obj)
                return undefined;
            }

            current = current[arrayProp][index];
        } else if (current[prop] === undefined) {
            l(err(`getNestedProperty(${propertyPath}): prop is undefined`),obj)
            return undefined;
        } else {
            current = current[prop];
        }
    }

    return current;
}