
/**
 * This file contains the api calls to the backend.
 * utilising the axios library to make the calls.
 * inclusing of webpackIgnore is to allow the webpack to ignore the calls and not try to bundle them.
 */

export async function executePost<T>(api: string, postBody: any) : Promise<T>{
    //return await $ajax.post(/* webpackIgnore: true */ validateApi(api), postBody);
    return executeFetch<T>(api,"POST",postBody);
}

// export async function executeGet<T>(api: string) : Promise<T>{
//     return await $ajax.get(/* webpackIgnore: true */ validateApi(api));
// } 

export async function executeGet<T>(api: string) : Promise<T>{
   return executeFetch<T>(api,"GET",undefined);
}





export async function executePut<T>(api: string, postBody: any) : Promise<T>{
    //return await $ajax.put(/* webpackIgnore: true */ validateApi(api), postBody);
    return executeFetch<T>(api,"PUT",postBody);
}

export async function executeDelete<T>(api: string) : Promise<T>{
    //return await $ajax.delete(/* webpackIgnore: true */ validateApi(api));
    return executeFetch<T>(api,"DELETE",undefined);
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

export async function executeFetch<T>(api: string, method:string,data:any) : Promise<T>{
    let url = validateApi(api);
    let fetchHeaders = buildHeaders();
    let response = await fetch(url,{
        method: method,
        headers: fetchHeaders,
        body: data? JSON.stringify(data): undefined
    }
    ).then((response) => {
        
        console.log(response);
        //check if response is JSON
        if(response.headers.get("content-type")?.indexOf("application/json") === -1){
            throw new Error("Response was not JSON");
        }
        //return the json as object
        return response.json();
    });
    return response;
}

function buildHeaders() {
    let bearer = getBearerToken();
    let fetchHeaders = new Headers();
    fetchHeaders.append("Content-Type", "application/json");
    if (bearer) {
        fetchHeaders.append("Authorization", bearer);
    }
    return fetchHeaders;
}


export function getCookies(): { [key:string]:string }
{
    let retValue: { [key:string]:string } = {};
    let cookies = document.cookie.split(";").reduce(function (cookies, cookie)
    {
        var parts = cookie.split("=");
        if (parts.length === 2)
        {
            var key = parts[0].trim();
            var value = parts[1];

            retValue[key] = value;
        }
        return cookies;
    }, {});

    return retValue;
};

export function getBearerToken()
{
    var cookies = getCookies();
    var token = cookies["_api"];

    if( token ) return "Bearer " + token;
    return null;
};