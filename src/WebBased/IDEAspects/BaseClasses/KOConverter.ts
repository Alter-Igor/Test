import * as ko from 'knockout';
import { I_IDE_Aspect_Modeller_Configuration } from './IWidgetJson';

export type NestedObservableObject<T> = {
    [K in keyof T]      : T[K] extends Array<infer U> ? ko.ObservableArray<NestedObservableObject<U>> :
    T[K] extends object ? ko.Observable<NestedObservableObject<T[K]>> : ko.Observable<T[K]>;
};

export function toObservableObject<T>(obj: T, existing?: NestedObservableObject<T>): NestedObservableObject<T> {
    
    if(!existing) existing = {} as NestedObservableObject<T>;
   
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && key !== "__ko_mapping__" && key !== "_host") {
            const value = obj[key as keyof T];

            if (Array.isArray(value)) {
                if (!existing[key]) {
                    existing[key] = ko.observableArray(value.map(item => toObservableObject(item, {} as NestedObservableObject<typeof item>))) as any;
                } else {
                    // existing[key]=ensureIsObservableArray(existing, key)
                    existing[key](value.map(item => toObservableObject(item, {} as NestedObservableObject<typeof item>)));
                }
            } else if (value !== null && typeof value === 'object') {
                if (!existing[key]) {
                    existing[key] = ko.observable(toObservableObject(value, {} as NestedObservableObject<typeof value>)) as any;
                } else {
                    // existing[key]  = ensureIsObservable(existing, key);
                    existing[key](toObservableObject((value as any), (existing[key]() as any)));
                }
            } else {
                if (!existing[key]) {
                    (existing[key] as any) = ko.observable(value);
                } else {
                    // existing[key] = ensureIsObservable(existing, key);
                    existing[key]((value as any));
                    
                }
            }
        }
    }

    return existing as NestedObservableObject<T>;
}
export interface IDebug {
    supportRequestEnabled?: boolean;
      enabled: boolean;
      logToConsole: boolean;
      showInAspect: boolean;
      liveConfig?: boolean;
    }
  


function ensureIsObservable(existing: any, key: string) {
    if (ko.isObservable(existing[key])) {
        return existing[key] ;
    }
    else {
        return ko.observable();
    }
}



function ensureIsObservableArray(existing: any, key: string) {
    if (ko.isObservableArray(existing[key])) {
        return existing[key] ;
    }
    else {
        return ko.observableArray();
    }
}

// export type I_IDE_Aspect_Modeller_Configuration<TConfig> = TConfig & {
//     debug: IDebug;
//   }

// export type ObservableConfigurationOptions<TConfig> = 
// { [K in keyof IBaseIDEAspectConfiguration<TConfig>]: ko.Observable<IBaseIDEAspectConfiguration<TConfig>[K]>; }

// export interface IConfigurationHost {
//     _host: {
//         blade: Sharedo.Core.Case.Sharedo.AddEditSharedo;
//         enabled: ko.Observable<boolean>; // Using 'any' for return type as it's not clear what these functions return
//         model: Sharedo.Core.Case.Sharedo.Models.Sharedo;
//     }
// }

// export type IBaseIDEAspectConfiguration<TConfig> = IConfigurationHost & I_IDE_Aspect_Modeller_Configuration<TConfig>;

// interface RootObject {
//   l1: string;
//   o1: O1;
// }

// interface O1 {
//   l2: string;
//   o2: O2;
//   a1: A1[];
// }

// interface A1 {
//   l4: string;
// }

// interface O2 {
//   l3: string;
// }
// // Now let's use the function:
// const x: I_IDE_Aspect_Modeller_Configuration<RootObject> = {
//     l1: "l1",
//     o1: {
//         l2:"l2",
//         o2: {
//             l3: "l3",
//         },
//         a1: [
//             { l4: "l4" }
//         ]
//     },
//     debug:
//     {
//         enabled: false,
//         logToConsole: false,
//         showInAspect: false
//     }
// }

// let m :  NestedObservableObject<I_IDE_Aspect_Modeller_Configuration<RootObject>>

// let y = toObservableObject(x,{} as any) as  NestedObservableObject<I_IDE_Aspect_Modeller_Configuration<RootObject>>

// let p = y.debug().liveConfig!()

// export function toObservableObject(obj: any, existingObservables?:ko.Observable<any>): ko.Observable {
//     const result = existingObservables || {} as ko.Observable;

//     for (const key in obj) {
//         if(key === "__ko_mapping__") continue;
//         if(key === "_host") continue;

//         if (Object.prototype.hasOwnProperty.call(obj, key)) {
//             let newv = obj[key];
//             let curr = (result as any)[key] ;

//             if (!Array.isArray(newv) && typeof newv === "object" && newv !== null && !ko.isObservable(newv)) {
//                 (result as any)[key] = toObservableObject(newv as object) 
//                 console.log("toObservableObject", (result as any)[key]);
//                 (result as any)[key] = ko.observable((result as any)[key]);
//                 continue;
//             }

//             if (Array.isArray(newv)) {
//                 if (curr && ko.isObservableArray(curr)) {
//                     (result as any)[key](newv);
//                 } else {
//                     (result as any)[key] = ko.observableArray(newv) as any;
//                 }
//                 continue;
//             }

//             if (ko.isObservable(newv)) {
//                 newv = newv(); // pull out the value
//             }

//             if (curr && ko.isObservable(curr)) {
//                 (result as any)[key](newv); // update the existing observable
//             } else {
//                 (result as any)[key] = ko.observable(newv);
                
//             }
//         }
//     }

//     return result;
// }
