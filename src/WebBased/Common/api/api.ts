
/**
 * This file contains the api calls to the backend.
 * utilising the axios library to make the calls.
 * inclusing of webpackIgnore is to allow the webpack to ignore the calls and not try to bundle them.
 */

export async function executePost<T>(api: string, postBody: any) : Promise<T>{
    return await $ajax.post(/* webpackIgnore: true */ window.document.location.origin + api, postBody);
}

export async function executeGet<T>(api: string) : Promise<T>{
    return await $ajax.get(/* webpackIgnore: true */ window.document.location.origin + api);
}

export async function executePut<T>(api: string, postBody: any) : Promise<T>{
    return await $ajax.put(/* webpackIgnore: true */ window.document.location.origin + api, postBody);
}

export async function executeDelete<T>(api: string) : Promise<T>{
    return await $ajax.delete(/* webpackIgnore: true */ window.document.location.origin + api);
}
