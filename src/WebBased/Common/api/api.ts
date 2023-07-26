
/**
 * This file contains the api calls to the backend.
 * utilising the axios library to make the calls.
 * inclusing of webpackIgnore is to allow the webpack to ignore the calls and not try to bundle them.
 */

export async function executePost<T>(api: string, postBody: any) : Promise<T>{
    return await $ajax.post(/* webpackIgnore: true */ validateApi(api), postBody);
}

export async function executeGet<T>(api: string) : Promise<T>{
    return await $ajax.get(/* webpackIgnore: true */ validateApi(api));
}

export async function executePut<T>(api: string, postBody: any) : Promise<T>{
    return await $ajax.put(/* webpackIgnore: true */ validateApi(api), postBody);
}

export async function executeDelete<T>(api: string) : Promise<T>{
    return await $ajax.delete(/* webpackIgnore: true */ validateApi(api));
}

function validateApi(api: string) : string{
   let location=  window.document.location.origin;

   //if api does not include the location then add it.
    if(api.indexOf(location) === -1){
        //check if api start with a / if not add it.
        if(api.indexOf("/") !== 0){
            api = "/" + api;
        }
        
        api = location + api;
    }
    return api;
    
}