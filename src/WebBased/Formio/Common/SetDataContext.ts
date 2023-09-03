

import * as ko from "knockout";

export const userOrganisation = ko.observable();
export const userTeam = ko.observable();
export const countries = ko.observable();
export const user = ko.observable();
export const userDetails = ko.observable();
export const workItem = ko.observable();
export const workItemAttributes = ko.observable();



export function getOptionSet(name: string) {

    return wrapInPromise($ajax.get(`/api/v1/public/modeller/optionSets/${name}/values`));
    // return new Promise((resolve, reject) => {
    //     $ajax.get(`/api/v1/public/modeller/optionSets/${name}/values`).then((d: any) => {
    //         console.log("Options Set:", d)
    //         resolve(d)
    //     })
    // });
}

export function getOrg(id:any)
{
    return wrapInPromise($ajax.get("api/v2/public/organisation/" + id));
}

// export function  getTeamsID(id:any)
// {
//     return wrapInPromise($ajax.get("api/public/v1/teams/" + id));
//     // return $ajax.get("/api/public/v1/people/" + id);
// }

// /api/v2/public/people/{id}
export function getPeople(id:any)
{
    return wrapInPromise($ajax.get("api/v2/public/people/" + id));
    // return $ajax.get("/api/public/v1/people/" + id);
}

// /api/v1/public/workItem//{workItemId}
export function getWorkItem(id:any)
{
    return wrapInPromise($ajax.get("api/v2/public/workItem/" + id));
    // return $ajax.get("/api/public/v1/people/" + id);
}

export function getCountries() {
  
    return wrapInPromise($ajaxMutex.getOnce("/api/countries/forAddressEntry")
        .then( (data:any)=> {
            console.log("Countries", data);
            countries(data);
            return data;
        }));
}

// /api/v1/public/workItem/{workItemId}/attributes
export function getWorkItemAttributes(id:any)
{
    return wrapInPromise($ajax.get("api/v2/public/workItem/" + id + "/attributes"));
    // return $ajax.get("/api/public/v1/people/" + id);
}

function wrapInPromise(data: any) {
    return new Promise((resolve, reject) => {
        
        resolve(data);
    });
}




 function setUserOrganisation()
{
    return getOrg($ui.pageContext.user.organisationId()).then(function(value){
        console.log("Organisation", value);
        userOrganisation(value);
    });
}

//  function setUserTeam()
// {
//     return getTeamsID($ui.pageContext.user.userid()).then(function(value){
//         console.log("Team", value);
//         userTeam(value);
//     });
// }
 


function setPeople() {
    return getPeople($ui.pageContext.user.userid()).then(function(value){
        console.log("People", value);
        userDetails($ui.pageContext.user);

    });
}

function setWorkItem() {

    if(!$ui.pageContext.sharedoId)
    {
        return Promise.resolve();
    }

    let workItemId = $ui.pageContext.sharedoId();
    if(workItemId === undefined) {return Promise.resolve()};

    return getWorkItem(workItemId).then(function(value){
        console.log("WorkItem", value);
        workItem(value);
    });
}

function setWorkItemAttributes() {
    if(!$ui.pageContext.sharedoId)
    {
        return Promise.resolve();
    }

    let workItemId = $ui.pageContext.sharedoId();
    if(workItemId === undefined) {return Promise.resolve()};
    return getWorkItemAttributes(workItemId).then(function(value){
        console.log("WorkItemAttributes", value);
        workItemAttributes(value);
    });
}

export function setAll() {
    console.log("---- Setting up the data ------");

    if(!$ && !$ui && !$ui.pageContext && !$ui.pageContext.user)
    {
        console.log("No $, $ui or $ui.pageContext.user");
        return;
    }

    user($ui.pageContext.user);

    let pArray = new Array<Promise<any>>();
    pArray.push(setUserOrganisation());
    // pArray.push(setUserTeam());
    // pArray.push(setCountries());
    pArray.push(setPeople());
    pArray.push(setWorkItem());
    pArray.push(setWorkItemAttributes());

    return Promise.all(pArray).then(function(values) {
        console.log("All Promises", values);
        console.log("---- Data is ready ------");
    });
};

document.addEventListener("DOMContentLoaded", function(event) {


    if(!$ && !$ui && !$ui.pageContext && !$ui.pageContext.user)
    {
        console.log("No $, $ui or $ui.pageContext.user");
        return;
    }

    if($ui.pageContext.user === undefined)

    setAll();
});


//  /api/v2/public/people/{id}
// /api/v1/public/workItem//{workItemId}
// /api/v1/public/workItem/{workItemId}/attributes


