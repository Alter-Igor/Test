import { AUTOCOMPLETE_CARD_TYPE, AUTOCOMPLETE_MODE } from "../../../Interfaces/components/IAutoCompleteFindCardOptions";
import { getNestedProperty, gvko, setAllFieldsToNull } from "../../Common/ObjectHelper";
import { TExecuteFetchResponse, executeFetch, executeGetv2 } from "../../Common/api/api";
import { IDefaultSettingsWithSpecificComponentConfig, IWidgetJson } from "../BaseClasses/Interfaces";
import ko, { Observable } from "knockout";
import { Settings } from "./ExternalMatterSearchSettings";
import { Default } from "./ExternalMatterSearchDefaults";
import {  inf,  secBackOne } from "../../../Common/Log";
import { IExternalMatterSearchConfiguration, TAPIExecutionSettings } from "./ExternalMatterSearchInterface";
import { autoGenerateTemplate, generateHtmlDiv } from "../BaseClasses/Template/TemplateGenerator";
import { validateJSON } from "../../../helpers/Schema";
import * as SCHEMA from "./ConfigSchema.json";
import { mapData } from "./DataMapper";
import { NestedObservableObject } from "../BaseClasses/KOConverter";
import { TemplateApplicator } from "../BaseClasses/Template/TemplateApplicator";
import { BaseIDEAspect } from "../BaseClasses/BaseIDEAspect";
import { deserializeObjectFromBase64, serializeObjectToBase64 } from "../../../helpers/Serialization";
import { executeEmbeddedCode, evaluteRule } from "../../../helpers/evaluteRule";
import { IRule, IFieldPlacement } from "../BaseClasses/Template/Interfaces";

const CSS_CLASS_SELECTED_ITEM = "ems-selected-item";
const CSS_CLASS_RESULT_ITEM = "ems-result-item";
const CSS_CLASS_ROW_CONTAINER = "ems-row-container";
const CUSTOM_TEMPLATE_CONTENT_ID = "resultItem";
const AUTOCOMPLETE_ID = "externalMatterSearch";
const SEARCH_TEMPLATE_NAME = "__matter_search_item_template";
const SEARCH_TERM = "searchTerm";
const SEARCH_STATUS_ID = "searchStatus";

//customTemplateContentId = "resultItem";

interface IExternalResultItem {
    [key: string]: any;
}


export class ExternalMatterSearch extends BaseIDEAspect<IExternalMatterSearchConfiguration, any> {
  

    autoComplete: Sharedo.UI.Framework.Components.AutoCompleteHandler | undefined;
    selectedDiv: HTMLDivElement | undefined;
    selectedMatter!: Observable<IExternalResultItem | undefined>;
    // searchIFieldPlacement: IFieldPlacement | undefined;
    searchCustomTemplateId: string | undefined;
    customTemplateContentId: string | undefined;
    searchCustomTemplateDiv: HTMLTemplateElement | undefined;
    searchCustomTemplateContentsDiv: HTMLDivElement | undefined;
    searchTemplateToUseName: string | undefined;
    searchTemplateGeneratedDiv: HTMLDivElement | undefined;
    selectedTemplateGeneratedDiv: HTMLDivElement | undefined;
    // selectedIFieldPlacement: IFieldPlacement | undefined;
    inputVisability: ko.Computed<boolean> | undefined;
    searchStatusDiv: HTMLDivElement | undefined;
    selectedFieldsSubscription: ko.Subscription | undefined;
    title : ko.Computed<string> | undefined;


    // private initialise() {//! Note: UI framework looks for this method name and if found behaves differently and wont call loadAndBind

    /**
     * @method setup
     * @description Sets up the auto complete handler
     * @returns {void}
     */
    setup() {

        this.selectedMatter =this.selectedMatter || ko.observable<IExternalResultItem | undefined>(undefined);
        if (!validateJSON(this.configuration, (SCHEMA as any))) {
            this.wrn("SearchFields does not match schema");
        }

        this.inputVisability = this.inputVisability || ko.computed(() => {
            return this.getInputVisability();
        });

        this.validateFormbuilderJSONFieldSetup();


        if (!gvko(this.options?.searchFields) || !gvko(this.options?.searchFields).rows) {
            this.err("No searchFields defined");
            throw new Error("No searchFields defined");
        }

        if (!gvko(this.options?.selectedFields) || !gvko(this.options?.selectedFields).rows) {
            this.wrn("No selectedFields defined, using searchFields as selectedFields");
            this.options?.selectedFields(this.options?.searchFields());
        }

        this.ensureSearchTemplate();

        this.selectedDiv = this.selectedDiv || this.element.querySelector(`.${CSS_CLASS_SELECTED_ITEM}`) as HTMLDivElement;
        if (!this.selectedDiv) {
            this.err(`Could not find element with class '${CSS_CLASS_SELECTED_ITEM}'`);
            throw new Error(`Could not find element with class '${CSS_CLASS_SELECTED_ITEM}'`);
        }

        this.autoComplete = this.autoComplete || this.setupAutoComplete()
        this.selectedMatter.subscribe((newValue) => {
            this.ensureSelectedMatterTemplate();
            this.updateFields();
        });


        
        this.selectedFieldsSubscription = this.selectedFieldsSubscription || this.options?.selectedFields.subscribe((newValue) => {
            this.ensureSelectedMatterTemplate();

           
        });

       
        
  
        this.title  = ko.computed(() => {
            let title= executeEmbeddedCode(this.options?.title(), this); 
            return title;
        });


    }


    setupAutoComplete(): Sharedo.UI.Framework.Components.AutoCompleteHandler | undefined {
        // this.searchTemplateToUseName = SEARCH_TEMPLATE_NAME;
        return new Sharedo.UI.Framework.Components.AutoCompleteHandler(
            {
                enabled: true,
                mode: AUTOCOMPLETE_MODE.SELECT,
                text:
                {
                    placeholder: "Search for matter",
                    empty: "Start typing to lookup a matter by number",
                    emptyIcon: "fa-search",
                    typing: "Will search when you stop typing",
                    searching: "One moment...",
                    noResults: "Nothing found"
                },
                select:
                {
                    allowClear: true,
                    selectedValue: null,
                    onLoad: this.loadSelectedExternalResult.bind(this)
                },
                onFind: this.querySearchAPI.bind(this),
                templates: { result: this.searchTemplateToUseName! },
            }
        );
    }

    liveConfigurationRefreshed(): void {
        this.ensureSelectedMatterTemplate();
        this.updateFields();
    }

    private validateFormbuilderJSONFieldSetup() {
        if (!this.options?.formBuilderFieldSerialisedData()) {
            this.wrn("No formBuilderFieldSerialisedData defined - this will prevent the matter from being saved and loaded");
            this.wrn("Add a field to the form builder and set the formBuilderFieldSerialisedData to the field name in the configuration of the aspect");
        }
    }

    /**
     * @method load
     * @description Initial loads the data from the sharedo model form builder
     * @param {IExternalResultItem} model - The model to load from
     * @returns {void}
     */
    async load(model: any) {
    
        this.inf("Loading Data", this.model)
        if (this.options?.formBuilderFieldSerialisedData()) {

            //let data = this.formbuilder()[this.options?.formBuilderFieldSerialisedData()];
            let data = await this.getData();
            if (data) {
                let base64Decoded = deserializeObjectFromBase64<any>(data);
                this.selectedMatter(base64Decoded);
            }
        }
    }

    /**
     * After the user clicks a search result, this method is called to load the matter details
     * If the configuration has a loadApiUrl defined, then this will be used to load the matter details
     * If the configuration does not have a loadApiUrl defined, then the matter details will be loaded from the search results
     * @param model 
     * @returns 
     */
    async loadSelectedExternalResult(model: IExternalResultItem) {

        let resultModel:any|undefined = undefined;

        try {
            //https://hsf-vnext.sharedo.co.uk/api/externalMatterProvider/details/81735089

            if (this.searchStatusDiv) {
                this.searchStatusDiv.classList.remove("show");

            }

            // if (!model || !model.code) return null; //removed in favor of generic result
            $ui.stacks.lock(self, "Loading");

            if (!this.options?.loadApiUrl()) {
                this.log(inf("No Load API URL defined, using search results"));

                this.selectedMatter(model);
                $ui.stacks.unlock(self);
            }
            else {
                resultModel = await this.loadMatterDetailsFromLoadAPI(model);
                this.selectedMatter(resultModel);

                // let mappedData = mapData(this.selectedMatter!(), ko.toJS(this.options?.dataMapping()));
                // this.inf("Mapped Data", mappedData)

                // let reverse = reverseMapData(mappedData, ko.toJS(this.options?.dataMapping()));
                // this.inf("Mapped Reverse", mappedData)

                $ui.stacks.unlock(self);
            }


            // this.ensureSelectedMatterTemplate();


            let textValue = this.options?.selectedFieldDisplayValue();
            if (!textValue) {
                textValue = "{matterCode} - {shortName}";
            }

            //find any values within {} and replace with the value from the model
            // let matches = textValue.match(/{([^}]+)}/g);
            // if (matches) {
            //     matches.forEach((m: any) => {
            //         let key = m.replace("{", "").replace("}", "");
            //         let val = getNestedProperty(model, key)
            //         textValue = textValue.replace(m, val);
            //     });
            // }

            if(resultModel)
            {
                textValue = executeEmbeddedCode(textValue, resultModel)
            }
            else{
                textValue = executeEmbeddedCode(textValue, model)
            }

            


            //Resut the basic selected display card to the auto complete
            return new Sharedo.UI.Framework.Components.AutoCompleteDisplayCard({
                id: model,
                icon: null,
                text: textValue
            });
        }
        catch (e) {
            $ui.stacks.unlock(self);
            this.err("Error loading matter details", e);
        }



    };

    private ensureSearchTemplate() {

        let applicator = new TemplateApplicator();

        this.customTemplateContentId = CUSTOM_TEMPLATE_CONTENT_ID;
        this.searchCustomTemplateId = "__custom_matter_search_item_template";
        this.searchCustomTemplateDiv = this.element.querySelector("#" + this.searchCustomTemplateId) as HTMLTemplateElement;
        if (this.searchCustomTemplateDiv) {
            const content = this.searchCustomTemplateDiv.content;
            // const resultItem = content.querySelector(`.${CSS_CLASS_RESULT_ITEM}`) as HTMLDivElement;
            this.searchCustomTemplateContentsDiv = content.querySelector("#" + this.customTemplateContentId) as HTMLDivElement;
            if (this.searchCustomTemplateContentsDiv) {
                if (this.searchTemplateGeneratedDiv) {
                    this.searchTemplateGeneratedDiv.remove();
                }
                let unwrap = ko.toJS(this.options?.searchFields());


                if(!unwrap)
                {
                    this.err("No searchFields defined");
                    throw new Error("No searchFields defined");
                }
                
                    this.searchTemplateGeneratedDiv = generateHtmlDiv(unwrap, "data", this.searchCustomTemplateContentsDiv, applicator);
                
                // this.searchCustomTemplateContentsDiv.appendChild(this.searchTemplateGeneratedDiv);
                // ko.applyBindings(this, this.searchTemplateGeneratedDiv);
                this.searchTemplateToUseName = this.searchCustomTemplateId;
            }
        }
    }



    // setDynamic(setType:string,dataContext: IFieldRowField, field: string, dataContextName: string) {

    //     //setType: text or style or visability or value 
    //     //dataContext: { data:{ matterCode: "1234"}}
    //     //field: matterCode
    //     //dataContextName: "data" or "dataContext"

    //     this.lh1("setDynamic")
    //     this.l("setType:", setType)
    //     this.l("dataContext:", dataContext)
    //     this.l("field:", field)
    //     this.l("dataContextName:", dataContextName)

    //     if (!dataContext) {
    //         this.err("No value passed to formatFunc", dataContextName)
    //         this.errors?.push({
    //             code: "CONFIG_ERROR",
    //             message: "No value passed to formatFunc",
    //             userMessage: "No value passed to formatFunc, contact a system administrator.",
    //             additionalInfo: {
    //                 "Trying to apply type ": setType,
    //                 "To this field ": field,
    //                 "On this object ": dataContext,
    //                 "Using this key ": dataContextName,
    //             }
    //         })
    //         return;
    //     }

    //     if (!field) {
    //         return "";
    //     }

    //     let retValue = field //replaceValues(`${field}`, object);

    //     // if (formatter && formatter !== "undefined") {
    //     retValue = executeFunc(retValue, dataContext)
    //     // }
    //     // if (formatter && formatter !== "undefined") {
    //     //     retValue = formatFunc(retValue, formatter)
    //     // }


    //     return retValue;
    // };

    private ensureSelectedMatterTemplate() {


        if (!this.selectedDiv) {
            this.err("No selectedDiv defined");
            
            return;
        }

        this.selectedDiv.innerHTML = "";

        if (!this.selectedMatter || this.selectedMatter() === undefined) {
            this.selectedDiv.classList.remove("ems-show");
            return;
        }

        this.selectedDiv.classList.add("ems-show");

        this.lh1("ensureSelectedMatterTemplate")

        if (this.selectedTemplateGeneratedDiv) {
            ko.cleanNode(this.selectedTemplateGeneratedDiv);
            this.selectedTemplateGeneratedDiv.remove();
        }
        if (!this.options?.selectedFields()) {
            this.err("No searchIFieldPlacement defined");
            throw new Error("No searchIFieldPlacement defined");
        }

        let applicator = new TemplateApplicator();

        this.selectedTemplateGeneratedDiv = generateHtmlDiv(ko.toJS(this.options?.selectedFields()), "selectedMatter()", this.selectedDiv, applicator);
        // this.selectedDiv.appendChild(this.selectedTemplateGeneratedDiv);
        // ko.cleanNode(this.selectedDiv);
        if (this.selectedMatter && this.selectedMatter()) {
            let data = { data: this.selectedMatter() } //! we do this so there is consistency between the search and selected templates
            ko.applyBindings(data, this.selectedTemplateGeneratedDiv);
        }

        this.clearSec();

    }

    async updateFields()
    {
        if(!this.options?.fieldMapping || !this.options?.fieldMapping()) 
        {
            return  
        }

        this.options?.fieldMapping()?.forEach((mapping) => {

            let searchResultField = gvko(mapping.searchResultField);
            let formBuilderField = gvko(mapping.formBuilderField)
 
            let data =  { data: this.selectedMatter()}
            let value = executeEmbeddedCode( searchResultField,data,undefined)
            this.updateFieldValue(formBuilderField, value);
        });


    }
    async updateFieldValue(fieldName: string, value: any) {
        let divElement = document.querySelector(`div[data-alpaca-container-item-name="${fieldName}"]`);

        if (!divElement) {
            this.err(`Could not find element with data-alpaca-container-item-name='${fieldName}'`)
            return;
        }
 
        try {
            let alp = ($(divElement) as any).alpaca()
            if (alp.selectOptions) {
                let found = alp.selectOptions.find((s: any) => s.text.toLowerCase() === value.toLowerCase());
                if (found) {
                    let currValue =  alp.getValue()
                    if(currValue)
                    {
                        return //dont override an already set vlaue
                    }
                    alp.setValue(found.value);
                    if(alp._events.change){
                        alp._events.change();
                    }
                    alp.refresh();
                    return;
                }
                return;
            }

            alp.setValue(value);
        }
        catch (e) {
            this.err("Error updating field value", e)
        }



    }

    async loadMatterDetailsFromLoadAPI(model: IExternalResultItem) {

        this.clearErrors();

        try {
            // let retValue: any = model;
            let retValue: any | undefined = undefined;

            let url = this.options?.loadApiUrl();

            try {
                url = executeEmbeddedCode(url, model)
            }
            catch (e) {
                this.err("Error executing url function", e);
            }

            if(!url)
            {
                this.err("No url defined");
                throw new Error("No url defined");
            }

            //find any values within {} and replace with the value from the model
            let matches = url.match(/{([^}]+)}/g);
            if (matches) {
                matches.forEach((m: any) => {
                    let key = m.replace("{", "").replace("}", "");
                    let val = getNestedProperty(model, key)
                    if (val === undefined) {
                        this.err(`Could not find value for key [${key}] in the data model:`, model);
                        this.errors?.push({
                            code: "CONFIG_ERROR",
                            message: `Could not find value for key ${key} in model`,
                            userMessage: `Could not find value for key ${key} in model, contact a system administrator.`,
                            additionalInfo: {
                                "Looking for the key ": key,
                                "Inside this model ": model
                            }

                        })
                        return;
                    }
                    url = url!.replace(m, val);
                });
            }
            this.log("Loading Matter using : " + url, "green");

            return executeGetv2(url).then((response) => {
                let dataPath = this.options?.loadApiResultDataPath();
                let data = this.validateResponseData(response, dataPath);
                if (response.info.success === false) {
                    // this.buildUserErrors(response);
                    this.selectedMatter(undefined);
                    return retValue;
                }
                this.inf("loadMatterDetailsFromLoadAPI", data)
                return data;

            }).catch((error: any) => {
                setAllFieldsToNull(retValue);
                return retValue;
            })
        }
        catch (e) {
            this.err("Error loading matter details", e);
        }
    }

    private buildUserErrors(response: TExecuteFetchResponse<any>) {
        this.err("Error loading matter details", response);

        let errorMessageFromSharedo = response.data?.errorMessage;

        // if(errorMessageFromSharedo && errorMessageFromSharedo.indexOf("service has been unlinked or revoked") > -1){

        //     this.errors?.push({
        //         code: "SHAREDO_ERROR",
        //         message: errorMessageFromSharedo,
        //         userMessage: "The service is currently no linked, contact a system administrator."
        //     });
        //     return; //no need for other errors
        // }

        //get the current error stack
        let errorStack = (new Error()).stack;

        if (errorMessageFromSharedo) {
            this.errors?.push({
                code: "SHAREDO_ERROR",
                message: errorMessageFromSharedo,
                userMessage: errorMessageFromSharedo,
                errorStack: errorStack,
                additionalInfo: {
                    responseUrl: response.response?.url || "",
                    responseStatus: response.response?.status || "",
                    responseStatusText: response.response?.statusText || "",
                    responseData: response.data || "",
                }


            });
        }

        response.info.error.forEach((e) => {
            this.errors?.push(e);
        });
    }

    _aspectReload(model: any) {
        this.load(model);
    };

  

    save(model: any) {
        let data =
        {
            data: this.selectedMatter!() //! To keep consistency with the search template and search results
        }

        let dataMappings = ko.toJS(this.options?.dataMapping());
        if(!dataMappings)
        {
            this.err("No dataMappings defined");
            throw new Error("No dataMappings defined");
        }

        let mappedData = mapData(data, dataMappings);
        if (gvko(this.options?.formBuilderFieldSerialisedData)) {
            // let base64EncodedData = btoa(JSON.stringify(this.selectedMatter!())); //! note does not include the data attribute as this is specific to the search template
            let base64EncodedData = serializeObjectToBase64(this.selectedMatter!()); //! note does not include the data attribute as this is specific to the search template
            mappedData[gvko(this.options?.formBuilderFieldSerialisedData)] = base64EncodedData;
        }

        this.inf("save", mappedData)
        let dataToSave = this.ensureFormbuilder(model);
        $.extend(this.ensureFormbuilder(model), mappedData);
        this.l("dataToSave", dataToSave)

    };


    /**
     * This method is called by the auto complete when the user types in the search box
     * @param searchTerm the term the user has typed in
     * @param handler The auto complete handler - not used
     * @returns This method returns an array of cards to display in the auto complete
     */
    async querySearchAPI(searchTerm: string, handler: any) {
        this.clearErrors();
        this.ensureSearchTemplate();
        let results = new Array<any>();
        var search = searchTerm.toLowerCase();

        let multiAPICallResults: Promise<any> | undefined = undefined;
        if (this.options?.searchApiExecutionSettings && gvko(this.options?.searchApiExecutionSettings)) {
            multiAPICallResults = this.querySearchAPIMulti(search, {}).then(data => {
                if (!data) {
                    this.wrn("No results from multi search")
                }
                else {
                    results.push(...data);
                    this.l("results after multi api call:", results)
                }
            });
        }
        return Promise.all([multiAPICallResults]).then(() => {

            let cards = new Array<Sharedo.UI.Framework.Components.AutoCompleteFindCard>();
            results.forEach((d: any) => {
                // addVisualExtension(d);
                //d.forma = this.formatFunc;

                cards.push(new Sharedo.UI.Framework.Components.AutoCompleteFindCard({
                    type: AUTOCOMPLETE_CARD_TYPE.RESULT,
                    data: d,
                    icon: d.icon,
                    id: d,
                    styles: null,
                    cssClass: d.cssClass,
                }));
            });
            return cards;
        });
    };


    /**
     * This method is called by the querySearchAPI when the user types in the search box
     * It will call the search API and return the results by itterating through the searchApiExecutionSettings
     * It calls the APIs in parallel and returns the results in the order they are defined in the configuration
     * @param searchTerm 
     * @param dataContext 
     * @returns 
     */
    async querySearchAPIMulti(searchTerm: string, dataContext: any) {
        let executionResults: Promise<any>[] = [];
        this.clearErrors(); //clear any errors from previous searches
        var search = searchTerm.toLowerCase();

        this.log("Searching for: " + search);
        if (!this.options?.searchApiExecutionSettings) {
            this.err("No searchApiExecutionSettings defined");
            return;
        }

        dataContext = dataContext || {}; //ensure there is a data context

        //create div to hold the results
        let searchStatusInfoDiv = document.createElement("div");
        searchStatusInfoDiv.id = "searchResults";
        searchStatusInfoDiv.classList.add("ems-search-results");




        //Find the seach status div in the HTML and add the results div to it
        this.searchStatusDiv = this.element.querySelector(`#${SEARCH_STATUS_ID}`) as HTMLDivElement;
        this.searchStatusDiv.classList.remove("show");
        this.searchStatusDiv.classList.remove("all-searches-completed");

        if (!this.searchStatusDiv) {
            this.err(`Could not find element with id '${SEARCH_STATUS_ID}'`);
            throw new Error(`Could not find element with id '${SEARCH_STATUS_ID}'`);
        }

        //clear any existing results
        if (this.searchStatusDiv) {
            this.searchStatusDiv.innerHTML = "";
            this.searchStatusDiv.appendChild(searchStatusInfoDiv);
            this.searchStatusDiv.classList.add("ems-search-status");

            if (gvko(this.options?.showSearchingStatus)) {
                this.searchStatusDiv.classList.add("show");
            }
        }


        //loop through each searchApiExecutionSetting and call the API for each one
        gvko(this.options?.searchApiExecutionSettings)?.forEach((setting:TAPIExecutionSettings) => {

            //convert the setting to a plain object
            setting = ko.toJS(setting)

            //create a timer to show the user that the search is taking place
            let weAreStillSearching: boolean = true;
            let startTime = new Date();

            //create a div to hold the status of this individual search
            let searchDiv = document.createElement("div");
            searchDiv.classList.add("ems-search-result");;
            searchStatusInfoDiv.appendChild(searchDiv);



            //`<div class='ems-search-result-status searching'></div>`
            let forEachSearchStatusDiv = document.createElement("div");
            forEachSearchStatusDiv.classList.add("ems-each-search-status");
            forEachSearchStatusDiv.classList.add("searching");
            searchDiv.appendChild(forEachSearchStatusDiv);

            let indicatorDiv = document.createElement("div");
            indicatorDiv.classList.add("ems-search-results-indicator");
            indicatorDiv.classList.add("ring")
            indicatorDiv.classList.add("show")
            forEachSearchStatusDiv.appendChild(indicatorDiv);

            // Searching <span class="ems-search-result-name">${setting.name || setting.url}</span>
            let eachSearchResultMessage = document.createElement("div");
            eachSearchResultMessage.classList.add("ems-search-result-message");
            eachSearchResultMessage.innerHTML = `Searching <span class="ems-search-result-name">${setting.name || setting.url}</span>`
            forEachSearchStatusDiv.appendChild(eachSearchResultMessage);

            let elapsedTimeDiv = document.createElement("div");
            elapsedTimeDiv.classList.add("ems-search-result-elapsed-time");
            forEachSearchStatusDiv.appendChild(elapsedTimeDiv);

            //elapsed time area
            let innerSpan = document.createElement("span");
            innerSpan.classList.add("esm-elapsed");
            innerSpan.innerHTML = "elapsed time";

            let innerSpan2 = document.createElement("span");
            innerSpan2.classList.add("esm-elapsed-value");

            let innerSpanIndicator = document.createElement("span");
            innerSpanIndicator.classList.add("esm-elapsed-indicator");


            elapsedTimeDiv.appendChild(innerSpan);
            elapsedTimeDiv.appendChild(innerSpan2);
            elapsedTimeDiv.appendChild(innerSpanIndicator);

            //set a timer to show the user that the search is taking place
            let interVal = setInterval(() => {

                this.l("Still searching for:", setting.name || setting.url)
                let elapsed = new Date().getTime() - startTime.getTime();
                if (elapsedTimeDiv) {
                    // elapsedTimeDiv.innerHTML = `elapsed time: ${elapsed / 1000}:${elapsed / 10000} seconds`;
                    //show elapsed with seconds and milliseconds
                    // elapsedTimeDiv.innerHTML = `<span class="esm-elapsed">elapsed time</span><span class="ring esm-elapsed-value">${elapsed / 1000}</span>`;

                    //<span class="esm-elapsed">elapsed time</span><span class="ring esm-elapsed-value">${elapsed / 1000}</span>
                    let seconds = Math.floor(elapsed / 1000);
                    let milliseconds = Math.floor((elapsed % 1000) / 10);
                    let millisecondsString = milliseconds.toString();
                    if (milliseconds < 10) {
                        millisecondsString = "0" + millisecondsString;
                    }

                    if (seconds > 3 && seconds < 6) {
                        innerSpan2.classList.add("long")
                    }
                    if (seconds > 6 && seconds < 9) {
                        innerSpan2.classList.add("very-long")
                        innerSpan2.classList.remove("long")
                    }

                    if (seconds > 9) {
                        innerSpan2.classList.remove("very-long")
                        innerSpan2.classList.add("very-very-long")

                    }


                    innerSpan2.innerHTML = `${seconds}.${millisecondsString}`;

                }
                if (!weAreStillSearching) {
                    elapsedTimeDiv.innerHTML = `<span class="esm-elapsed">completed in</span><span class="esm-elapsed-value">${elapsed / 1000}</span>`;
                    forEachSearchStatusDiv.classList.remove("searching");
                    indicatorDiv.classList.remove("show")
                    clearInterval(interVal);
                    return;
                }

            }, 10);


            let data: any | undefined = undefined; //Data for the fetch
            let url: string | undefined = undefined; //url for the fetch
            let method = setting.method || "GET"; //default to GET

            //ensure there is a search term in the data context
            //this is used to replace the {searchTerm} in the url 
            if (!dataContext[SEARCH_TERM]) {
                dataContext[SEARCH_TERM] = searchTerm;
            }

            //make sure there is a url defined
            if (!setting.url) {
                this.err("No url defined in searchApiExecutionSettings");
                this.errors?.push({
                    code: "USER_ERROR",
                    message: "No url defined in searchApiExecutionSettings - check the configuration of the aspect",
                    userMessage: "No url defined in settings of this component, contact a system administrator."
                })
                return [];
            }
            //replace any values in the url with the values from the data context i.e. searchTerm and any other values
            url = executeEmbeddedCode(setting.url, dataContext);

            //if there is data defined in the setting, then replace any values in the data with the values from the data context
            if (setting.data) {
                data = executeEmbeddedCode(setting.data, dataContext);
            }

            try {
                //execute the fetch and add the promise to the executionResults array
                let executionResult = executeFetch(url, method, data).then((response) => {

                    this.lh1(`Results from ${url}`)
                    this.l("Response:", response)
                    let dataPath = setting.resultDataPath || "";
                    this.l("dataPath:", dataPath)
                    let dataItems = this.validateResponseData(response, dataPath, setting, false);
                    if (!dataItems) {
                        this.err("No data items returned from search")
                        eachSearchResultMessage.classList.add("no-results");
                        eachSearchResultMessage.innerHTML = `Search <span class="ems-search-result-name">${setting.name || setting.url}</span> returned no results`
                        return [];
                    }
                    this.l("dataItems:", dataItems)
                    if (!Array.isArray(dataItems)) {
                        dataItems = [dataItems]; //convert to array as the result could be a single object
                        this.l(inf(`Data Items is not an array, converting to array`))
                    }
                    this.nv("Total results:", dataItems.length)
                    eachSearchResultMessage.classList.add("completed");
                    eachSearchResultMessage.innerHTML = `Search <span class="ems-search-result-name">${setting.name || setting.url}</span> returned <span class="ems-search-result-count">${dataItems.length}</span> results`

                    dataItems.forEach((d: any) => {
                        if (setting.resultDatapPrefixName) {
                            d[setting.resultDatapPrefixName] = d;
                        }

                    });
                    secBackOne();
                    return dataItems;


                }).catch((error: any) => {
                    eachSearchResultMessage.classList.add("error");
                    eachSearchResultMessage.innerHTML = `Search <span class="ems-search-result-name">${setting.name || setting.url}</span> returned an error <span class="ems-search-result-error">${error}</span>`

                }).finally(() => {
                    weAreStillSearching = false;
                });
                executionResults.push(executionResult);
            }
            catch (e) {
                weAreStillSearching = false;
                this.err("Error executing search", e)
                eachSearchResultMessage.classList.add("error");
            }



        });


        return Promise.all(executionResults).then(() => {
            this.searchStatusDiv?.classList.add("all-searches-completed");

            setTimeout(() => {
                this.searchStatusDiv?.classList.remove("show");
            }, 8000);

            let ultimateResult: any[] = []; //the final result
            executionResults.forEach((result) => {
                result.then((data) => {
                    this.l("Data:", data)
                    ultimateResult.push(...data);
                })
            })

            return ultimateResult
        });

    }

    autoCompleteSelect(selectCard: any, handler: any) {
    };

    override loadAndBind(): void {
        this.validateFormbuilderJSONFieldSetup();
        this.load(this.model);
    };


    override onSave(model: any) {
        // this.log("No Save Implemented", "green");
        this.validateFormbuilderJSONFieldSetup();
        this.save(model);
    };



    /**
     * This method checks the response from the search API and returns the data from the dataPath
     * @param response the response from the search API
     * @param dataPath the path to the data in the response
     * @param setting the searchApiExecutionSetting that was used to call the API
     * @param addErrors if set to false then no errors will be added to the errors array
     * @returns 
     */
    validateResponseData(response: TExecuteFetchResponse<any>, dataPath: string | undefined, setting?: TAPIExecutionSettings, addErrors?: boolean) {
        let retValue: any | undefined = undefined

        if(!dataPath)
        {
            this.err("No dataPath defined");
            throw new Error("No dataPath defined");
        }


        if (response.info.success === false) {
            this.buildUserErrors(response);

        }

        try {
            if (typeof response.data === "string") {
                retValue = JSON.parse(response.data);
            }
        }
        catch (e) {
            retValue = "";
        }

        if (typeof response.data === "object") {
            retValue = response.data;
        }


        this.inf("querySearchAPI", retValue)


        let dataItems = getNestedProperty(retValue, dataPath) as any[];


        if (!dataItems) {

            this.err("No data found at path: " + dataPath);
            if (addErrors) {
                this.errors?.push({
                    code: "DATA_ERROR",
                    message: "No data found at path: " + dataPath,
                    userMessage: "Results from the search API are not in the expected format, contact a system administrator.",
                    additionalInfo: {
                        responseUrl: response.response?.url || "",
                        responseStatus: response.response?.status || "",
                        responseStatusText: response.response?.statusText || "",
                        responseData: response.data || "",
                        widgetConfig: ko.toJS(this.options)
                    }
                })
            }
            return [];
        }
        return dataItems;
    }

    refresh(newConfig: any): void {
         this.loadAndBind();
    }


    reset(newConfig: any): void {
        // this.searchIFieldPlacement = this.options?.searchFields();
        // this.selectedIFieldPlacement = this.options?.selectedFields();
    }

    setWidgetJsonSettings(): IWidgetJson<IExternalMatterSearchConfiguration> {
        return Settings
    }

    setThisComponentName(): string {
        return "ExternalMatterSearch";
    }

    setDefaults(): IDefaultSettingsWithSpecificComponentConfig<IExternalMatterSearchConfiguration> {
        return Default
    }

    setLocationOfDataToLoadAndSave(): string | undefined {
        if (this.options?.formBuilderFieldSerialisedData() && this.options?.formBuilderName()) {
            return "form-" + this.options?.formBuilderName() + "." + this.options?.formBuilderFieldSerialisedData();
        }

        return undefined;
    }



    getInputVisability() {

        let retValue = true;
        if (!this.options?.inputVisability()) {
            retValue = true;
        }

        //check if readOnly is a boolean
        if (typeof this.options?.inputVisability() === "boolean") {
            retValue = this.options?.inputVisability() as boolean;
        }
        //
        //check if the readOnly is a rule
        if (typeof this.options?.inputVisability() === "object") {
            //check if its an array
            if (!Array.isArray(this.options?.inputVisability())) {
                this.options?.inputVisability([this.options?.inputVisability() as any]);
            }
            if (this.options?.inputVisability() instanceof Array) {
                let rules = this.options?.inputVisability() as IRule[];
                //check if any of the rules evaluate to true
                for (let i = 0; i < rules.length; i++) {
                    const rule = rules[i] as NestedObservableObject<IRule>;
                    if (!rule.rule) continue;
                    let ruleToEval = rule.rule();
                    let dataContext = ko.toJS(this.model);
                    retValue = evaluteRule(ruleToEval, dataContext);
                }
            }
        }



        let input = this.element.querySelector("#externalMatterSearch") as HTMLDivElement
        if (input) {
            if (retValue === false) {
                input.style.display = "none";
            }
        }

        return retValue;

        // return false; //default
    }

    getConfiguration(): IExternalMatterSearchConfiguration | undefined {
        return this.configuration;
    }

    getSearchFieldPlacement(): IFieldPlacement | undefined {
        return ko.toJS(this.options?.searchFields());
    }

    getSelectedIFieldPlacement(): IFieldPlacement | undefined {
        let retValue = ko.toJS(this.options?.selectedFields());
        return retValue
    }

    /**
     * Helper method to generate a field placement based on the field names passed in
     * @param fieldNames 
     * @returns 
     */
    autoGenerateIFeildPlacement(fieldNames: string[]): IFieldPlacement {
        return autoGenerateTemplate(fieldNames);
    }


}
