
/**
 * This file contains the api calls to the backend.
 * utilising the axios library to make the calls.
 * inclusing of webpackIgnore is to allow the webpack to ignore the calls and not try to bundle them.
 */

import { err, inf, l, lh1, secBackOne } from "../../../Common/Log";

export async function executePost<T>(api: string, postBody: any): Promise<T> {
    //return await $ajax.post(/* webpackIgnore: true */ validateApi(api), postBody);
    return (await executeFetch<T>(api, "POST", postBody)).data;
}

// export async function executeGet<T>(api: string) : Promise<T>{
//     return await $ajax.get(/* webpackIgnore: true */ validateApi(api));
// } 

export async function executeGet<T>(api: string): Promise<T> {
    return (await executeFetch<T>(api, "GET", undefined)).data;
}


export async function executeGetv2<T>(api: string){
    return  executeFetch<T>(api, "GET", undefined);
}



export async function executePut<T>(api: string, postBody: any): Promise<T> {
    //return await $ajax.put(/* webpackIgnore: true */ validateApi(api), postBody);
    return (await executeFetch<T>(api, "PUT", postBody)).data;
}

export async function executeDelete<T>(api: string): Promise<T> {
    //return await $ajax.delete(/* webpackIgnore: true */ validateApi(api));
    return (await executeFetch<T>(api, "DELETE", undefined)).data;
}

function validateApi(api: string): string {
    let location = window.document.location.origin;

    //if api does not include the location then add it.
    if (api.indexOf(location) === -1) {
        //check if api start with a / if not add it.
        if (api.indexOf("/") !== 0) {
            api = "/" + api;
        }

        api = location + api;
    }
    return api;

}

export type TExecuteFetchResponse =
    {
        data: any | undefined,
        response: Response | undefined,
        info:
        {
            success: boolean,
            error: Array<TUserErrors>
        }
    }

export type TUserErrors =
    {
        code: string,
        message: string,
        userMessage: string,
        suggestions?: Array<string>
        internalSuggestions?: Array<string>
        actions?: Array<string>
        errorStack?: string,
        additionalInfo?: any
    }

export async function executeFetch<T>(api: string, method: string, data: any): Promise<TExecuteFetchResponse> {
    let retValue: TExecuteFetchResponse = {
        data: undefined,
        response: undefined,
        info: {
            success: false,
            error: []
        }
    }
        //to get new token TODO: check if fail then call
    // await $ajax.get("https://hsf-vnext.sharedo.co.uk/security/refreshTokens?_=" + Date.now);

    

    let url = validateApi(api);
    let fetchHeaders = buildHeaders();
    let response = await fetch(url, {
        method: method,
        headers: fetchHeaders,
        body: data ? JSON.stringify(data) : undefined
    }
    ).then(async (response) => {
        retValue.response = response;
        if (response.ok === false) {
            retValue.info.error.push({
                code: "API_ERROR",
                message: `An error occured while trying to call the API. statusText: ${response.statusText}`,
                userMessage: "An error occured while trying to call the API."
            });
        }

        let data;
        //check if response is JSON
        try {
            if (response.headers.get("content-type")?.includes("application/json")) {
                data = await response.json();
            }
            else {
                data = await response.text();
            }
            retValue.info.success = true;
        }
        catch (e: any) {
            retValue.info.error.push({
                code: "API_ERROR",
                message: `An error occured while trying to extract the data from the API. Message: ${e?.message || "Unknown"}`,
                userMessage: `An error occured while trying to extract the data from the API.`
            });
        }
        return { data, response };
    }).catch((error) => {
        l(err(`Error from API Call ${url}`), error);

        retValue.info.error.push({
            code: "API_ERROR",
            message: error.message,
            userMessage: error.message
        });

        return { data: undefined, response: undefined };
    })

    lh1(`Response from ${url}`);
    l(response);

    retValue.data = response.data;

    if(retValue.info.error.length > 0){
        retValue.info.success = false;
        retValue.info.error.forEach(e => {
            l(err(`Error from API Call ${url}`), e);
        })
    }

    secBackOne();

    return retValue;
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


export function getCookies(): { [key: string]: string } {
    let retValue: { [key: string]: string } = {};
    let cookies = document.cookie.split(";").reduce(function (cookies, cookie) {
        var parts = cookie.split("=");
        if (parts.length === 2) {
            var key = parts[0].trim();
            var value = parts[1];

            retValue[key] = value;
        }
        return cookies;
    }, {});

    return retValue;
};

export function getBearerToken() {
    var cookies = getCookies();
    var token = cookies["_api"];

    if (token) return "Bearer " + token;
    return null;
};