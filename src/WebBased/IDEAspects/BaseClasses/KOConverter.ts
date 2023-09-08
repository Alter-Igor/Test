import * as ko from "knockout";

export function toObservableObject<T extends object>(obj: T): { [K in keyof T]: ko.Observable<T[K]> } {
    const result: any = {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            //check if obj[key] is already a observable
            if (ko.isObservable(obj[key])) {
                result[key] = obj[key];
                continue;
            }
            result[key] = ko.observable(obj[key]);
        }
    }

    return result;
}