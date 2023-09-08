
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
    const properties = propertyPath.split('.');
    let current = obj;

    for (const prop of properties) {
        if (current[prop] === undefined) {
            return undefined;
        }
        current = current[prop];
    }
    return current;
}
