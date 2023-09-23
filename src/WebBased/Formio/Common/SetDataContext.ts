

import * as ko from "knockout";
import { checkLowdashCompatability } from "./Styling";
import { DeferredPromise } from "../../Common/DifferedPromise";


let defaultContext :DataContext;
export {defaultContext as DEFAULT_CONTEXT};

export async function setDataContext(additionalContext?: any) {
    let dataContext = new DataContext(additionalContext);
    let dc = await dataContext.deferredPromise.promise;
    console.log("---- Setting up the data dc ------", dc);
    console.log("---- Setting up the data dataContext ------", dataContext);
    defaultContext = dataContext;
    return dataContext;
}


export class DataContext {

    userOrganisation = ko.observable();
    userTeam = ko.observable();
    countries = ko.observable();
    user = ko.observable();
    userDetails = ko.observable();
    workItem = ko.observable();
    workItemAttributes = ko.observable();
    deferredPromise: DeferredPromise<DataContext>;

    constructor(additionalContext?: any) {
        console.log("dataContext constructor");
        this.deferredPromise = new DeferredPromise<any>();
        this.setDataContext(additionalContext).then((value) => {
            console.log("dataContext constructor done",value);
            
            this.deferredPromise.resolve(this);
        });

    }



    async getOptionSet(name: string) {

        return this.wrapInPromise($ajax.get(`/api/v1/public/modeller/optionSets/${name}/values`));
        // return new Promise((resolve, reject) => {
        //     $ajax.get(`/api/v1/public/modeller/optionSets/${name}/values`).then((d: any) => {
        //         console.log("Options Set:", d)
        //         resolve(d)
        //     })
        // });
    }

    async getOrg(id: any) {

        console.log("getOrg", id);
        if (!id) {
            console.error("----- No Organisation ID ----");
        }
        return this.wrapInPromise($ajax.get("/api/v2/public/organisation/" + id));
    }

    //    getTeamsID(id:any)
    // {
    //     return this.wrapInPromise($ajax.get("/api/public/v1/teams/" + id));
    //     // return $ajax.get("/api/public/v1/people/" + id);
    // }

    // /api/v2/public/people/{id}
    async getPeople(id: any) {
        return this.wrapInPromise($ajax.get("/api/v2/public/people/" + id));
        // return $ajax.get("/api/public/v1/people/" + id);
    }

    // /api/v1/public/workItem//{workItemId}
    async getWorkItem(id: any) {
        return this.wrapInPromise($ajax.get("/api/v1/public/workItem/" + id));
        // return $ajax.get("/api/public/v1/people/" + id);
    }

    async getCountries() {

        return this.wrapInPromise($ajaxMutex.getOnce("/api/countries/forAddressEntry")
            .then((data: any) => {
                console.log("Countries", data);
                this.countries(data);
                return data;
            }));
    }

    // /api/v1/public/workItem/{workItemId}/attributes
    async getWorkItemAttributes(id: any) {
        return this.wrapInPromise($ajax.get("/api/v2/public/workItem/" + id + "/attributes"));
        // return $ajax.get("/api/public/v1/people/" + id);
    }

    async wrapInPromise(data: any) {
        return new Promise((resolve, reject) => {
            resolve(data);
        });
    }




    async setUserOrganisation() {
        return this.getOrg($ui.pageContext.user.organisationId()).then((value) => {
            console.log("Organisation", value);
            this.userOrganisation(value);
        });
    }

    //   setUserTeam()
    // {
    //     return getTeamsID($ui.pageContext.user.userid()).then((value){
    //         console.log("Team", value);
    //         userTeam(value);
    //     });
    // }



    async setPeople() {
        return this.getPeople($ui.pageContext.user.userid()).then((value) => {
            console.log("People", value);
            this.userDetails($ui.pageContext.user);

        });
    }

    async setWorkItem() {

        if (!$ui.pageContext.sharedoId) {
            return Promise.resolve();
        }

        let workItemId = $ui.pageContext.sharedoId();
        if (workItemId === undefined) { return Promise.resolve() };

        return this.getWorkItem(workItemId).then((value) => {
            console.log("WorkItem", value);
            this.workItem(value);
        });
    }

    async setWorkItemAttributes() {
        if (!$ui.pageContext.sharedoId) {
            return Promise.resolve();
        }

        let workItemId = $ui.pageContext.sharedoId();
        if (workItemId === undefined) { return Promise.resolve() };
        return this.getWorkItemAttributes(workItemId).then((value) => {
            console.log("WorkItemAttributes", value);
            this.workItemAttributes(value);
        });
    }

    async setAdditionalContext(additionalContext?: any) {

        if (!additionalContext) { return Promise.resolve() }
      

        return new Promise((resolve, reject) => {
            Object.assign(this, additionalContext);
            resolve(this);
        });
    }

    async setDataContext(additionalContext?: any) {

        console.log("---- Setting up the data ------");
        checkLowdashCompatability();


        if (typeof $ === "undefined" || typeof $ui === "undefined" || !$ui?.pageContext || !$ui.pageContext.user) {
            console.log("No $, $ui or $ui.pageContext.user");
            return;
        }

        this.user(JSON.parse(ko.toJSON($ui.pageContext.user)));

        let pArray = new Array<Promise<any>>();
        pArray.push(this.setUserOrganisation());
        // pArray.push(this.setUserTeam());
        // pArray.push(this.setCountries());
        pArray.push(this.setPeople());
        pArray.push(this.setWorkItem());
        pArray.push(this.setWorkItemAttributes());
        pArray.push(this.setAdditionalContext(additionalContext));


        let done = false;

        let retValue = await Promise.all(pArray).then((values) => {
            // let dataContext = (window as any).dataContext || {};
            // (window as any).dataContext = thisModule;
            done = true;
            console.log("All Promises", values);
            console.log("---- Data is ready ------");
        });

        return retValue;


    };

    // document.addEventListener("DOMContentLoaded", (event) {




    //     setAll();
    //     console.log("---- Setting up the data ------",this);

    // });


    //  /api/v2/public/people/{id}
    // /api/v1/public/workItem//{workItemId}
    // /api/v1/public/workItem/{workItemId}/attributes


}

