
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