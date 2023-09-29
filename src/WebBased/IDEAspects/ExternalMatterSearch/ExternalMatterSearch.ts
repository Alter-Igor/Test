import { AUTOCOMPLETE_CARD_TYPE, AUTOCOMPLETE_MODE } from "../../../Interfaces/components/IAutoCompleteFindCardOptions";
import { getNestedProperty, setAllFieldsToNull } from "../../Common/ObjectHelper";
import { TExecuteFetchResponse, TUserErrors, executeFetch, executeGet, executeGetv2 } from "../../Common/api/api";
import { BaseIDEAspect, IDefaultSettings } from "../BaseClasses/BaseIDEAspect";
import { IWidgetJson } from "../BaseClasses/IWidgetJson";
import ko, { Observable } from "knockout";
import { Settings } from "./ExternalMatterSearchSettings";
import { Default } from "./ExternalMatterSearchDefaults";
import { formatFunc } from "../../../helpers/Formatter";
import { evaluteRule, executeFunc } from "../../../helpers/evaluteRule";
import { Section, inf, lh, secBackOne } from "../../../Common/Log";
import { IExternalMatterSearchConfiguration, IFieldPlacement, IFieldRowField, INameValue, IRule, IStyleEntry, IStyleRule, TAPIExecutionSettings } from "./ExternalMatterSearchInterface";
import { autoGenerateTemplate, generateHtmlDiv } from "./Template/TemplateGenerator";
import { validateJSON } from "../../../helpers/Schema";
import { DEFAULT_SEARCH_FIELDS_CONFIG } from "./DefaultSearchFields";
import * as SCHEMA from "./ConfigSchema.json";
import { DEFAULT_SELECTED_FIELDS_CONFIG } from "./DefaultSelectedFields";
import { mapData, reverseMapData } from "./DataMapper";
import { forEach, set } from "lodash";
import { NestedObservableObject } from "../BaseClasses/KOConverter";
import { data, error } from "jquery";
import { replaceValues } from "../../Common/TemplateValueReplaces";
import { TemplateApplicator } from "./Template/TemplateApplicator";

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
    selectedMatter: Observable<IExternalResultItem | undefined> | undefined;
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



    // private initialise() {//! Note: UI framework looks for this method name and if found behaves differently and wont call loadAndBind

    /**
     * @method setup
     * @description Sets up the auto complete handler
     * @returns {void}
     */
    setup() {

        if (!validateJSON(this.configuration, (SCHEMA as any))) {
            this.wrn("SearchFields does not match schema");
        }

        this.inputVisability = ko.computed(() => {
            this.getInputVisability();
            return true;
        });

        this.validateFormbuilderJSONFieldSetup();

        if (!this.options.searchFields() || !this.options.searchFields().rows) {
            this.err("No searchFields defined");
            throw new Error("No searchFields defined");
        }

        if (!this.options.selectedFields() || !this.options.selectedFields().rows) {
            this.wrn("No selectedFields defined, using searchFields as selectedFields");
            this.options.selectedFields(this.options.searchFields());
        }

        this.ensureSearchTemplate();

        this.selectedDiv = this.element.querySelector(`.${CSS_CLASS_SELECTED_ITEM}`) as HTMLDivElement;
        if (!this.selectedDiv) {
            this.err(`Could not find element with class '${CSS_CLASS_SELECTED_ITEM}'`);
            throw new Error(`Could not find element with class '${CSS_CLASS_SELECTED_ITEM}'`);
        }

        this.autoComplete = this.autoComplete || this.setupAutoComplete()
        this.selectedMatter = ko.observable<IExternalResultItem | undefined>();
        this.selectedMatter.subscribe((newValue) => {
            this.ensureSelectedMatterTemplate();
        });

        this.options.selectedFields.subscribe((newValue) => {
            this.ensureSelectedMatterTemplate();
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

    private validateFormbuilderJSONFieldSetup() {
        if (!this.options.formBuilderFieldSerialisedData()) {
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
    load(model: any) {
        if (!this.sharedoId()) return;
        this.inf("Loading Data", this.model)
        if (this.options.formBuilderFieldSerialisedData()) {
            let data = this.formbuilder()[this.options.formBuilderFieldSerialisedData()];
            if (data) {
                let base64Decoded = atob(data);
                this.selectedMatter = ko.observable<IExternalResultItem | undefined>();
                this.selectedMatter(JSON.parse(base64Decoded));
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

        try {
            //https://hsf-vnext.sharedo.co.uk/api/externalMatterProvider/details/81735089

            // if (!model || !model.code) return null; //removed in favor of generic result
            $ui.stacks.lock(self, "Loading");

            if (!this.options.loadApiUrl()) {
                this.log(inf("No Load API URL defined, using search results"));

                this.selectedMatter!(model);
                $ui.stacks.unlock(self);
            }
            else {
                model = await this.loadMatterDetailsFromLoadAPI(model);
                this.selectedMatter!(model);

                let mappedData = mapData(this.selectedMatter!(), ko.toJS(this.options.dataMapping()));
                this.inf("Mapped Data", mappedData)

                let reverse = reverseMapData(mappedData, ko.toJS(this.options.dataMapping()));
                this.inf("Mapped Reverse", mappedData)

                $ui.stacks.unlock(self);
            }


            // this.ensureSelectedMatterTemplate();


            let textValue = this.options.selectedFieldDisplayValue();
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
            textValue = executeFunc(textValue, model)


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
                let unwrap = ko.toJS(this.options.searchFields());


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

        if (this.selectedMatter && this.selectedMatter() === undefined) {
            this.selectedDiv.classList.remove("ems-show");
            return;
        }

        this.selectedDiv.classList.add("ems-show");

        this.lh1("ensureSelectedMatterTemplate")

        if (this.selectedTemplateGeneratedDiv) {
            ko.cleanNode(this.selectedTemplateGeneratedDiv);
            this.selectedTemplateGeneratedDiv.remove();
        }
        if (!this.options.selectedFields()) {
            this.err("No searchIFieldPlacement defined");
            throw new Error("No searchIFieldPlacement defined");
        }

        let applicator = new TemplateApplicator();

        this.selectedTemplateGeneratedDiv = generateHtmlDiv(ko.toJS(this.options.selectedFields()), "selectedMatter()", this.selectedDiv, applicator);
        // this.selectedDiv.appendChild(this.selectedTemplateGeneratedDiv);
        // ko.cleanNode(this.selectedDiv);
        if (this.selectedMatter && this.selectedMatter()) {
            let data = { data: this.selectedMatter() } //! we do this so there is consistency between the search and selected templates
            ko.applyBindings(data, this.selectedTemplateGeneratedDiv);
        }

        this.clearSec();

    }

    async loadMatterDetailsFromLoadAPI(model: IExternalResultItem) {

        this.clearErrors();

        try {
            let retValue: any = model;

            let url = this.options.loadApiUrl();

            try {
                url = executeFunc(url, model)
            }
            catch (e) {
                this.err("Error executing url function", e);
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
                    url = url.replace(m, val);
                });
            }
            this.log("Loading Matter using : " + url, "green");

            return executeGetv2(url).then((response) => {
                let dataPath = this.options.loadApiResultDataPath();
                let data = this.validateResponseData(response, dataPath);
                if (response.info.success === false) {
                    this.buildUserErrors(response);
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

    private buildUserErrors(response: TExecuteFetchResponse) {
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

    createSupportTask() {
        //TODO: Create a support task
        $ui.nav.invoke({
            "invokeType": "panel",
            "invoke": "Sharedo.Core.Case.Sharedo.AddEditSharedo",
            "config": "{\"typeSystemName\":\"task-eddiscovery-adhoc\",\"title\":\"\",\"Support Request\":\"\"}"
        });

    }

    save(model: any) {
        let mappedData = mapData(this.selectedMatter!(), ko.toJS(this.options.dataMapping()), this.options.formBuilderFieldSerialisedData());
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
        if (this.options.searchApiExecutionSettings && this.options.searchApiExecutionSettings()) {
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
        if (!this.options.searchApiExecutionSettings) {
            this.err("No searchApiExecutionSettings defined");
            return;
        }

        dataContext = dataContext || {}; //ensure there is a data context

        //create div to hold the results
        let searchStatusInfoDiv = document.createElement("div");
        searchStatusInfoDiv.id = "searchResults";

        //Find the seach status div in the HTML and add the results div to it
        this.searchStatusDiv = this.element.querySelector(`#${SEARCH_STATUS_ID}`) as HTMLDivElement;
        if (!this.searchStatusDiv) {
            this.err(`Could not find element with id '${SEARCH_STATUS_ID}'`);
            throw new Error(`Could not find element with id '${SEARCH_STATUS_ID}'`);
        }

        //clear any existing results
        if (this.searchStatusDiv) {
            this.searchStatusDiv.innerHTML = "";
            this.searchStatusDiv.appendChild(searchStatusInfoDiv);
            this.searchStatusDiv.classList.add("ems-search-status");
        }


        //loop through each searchApiExecutionSetting and call the API for each one
        this.options.searchApiExecutionSettings()?.forEach((setting) => {

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

            // Searching <span class="ems-search-result-name">${setting.name || setting.url}</span>
            let eachSearchResultMessage = document.createElement("div");
            eachSearchResultMessage.classList.add("ems-search-result-message");
            eachSearchResultMessage.innerHTML = `Searching <span class="ems-search-result-name">${setting.name || setting.url}</span>`
            forEachSearchStatusDiv.appendChild(eachSearchResultMessage);

            let elapsedTimeDiv = document.createElement("div");
            elapsedTimeDiv.classList.add("ems-search-result-elapsed-time");
            forEachSearchStatusDiv.appendChild(elapsedTimeDiv);

            //set a timer to show the user that the search is taking place
            let interVal = setInterval(() => {

                this.l("Still searching for:", setting.name || setting.url)
                let elapsed = new Date().getTime() - startTime.getTime();
                if (elapsedTimeDiv) {
                    elapsedTimeDiv.innerHTML = `Elapsed time: ${elapsed / 1000} seconds`;
                }
                if (!weAreStillSearching) {
                    clearInterval(interVal);
                    return;
                }

            }, 1000);


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
            url = replaceValues(setting.url, dataContext);

            //if there is data defined in the setting, then replace any values in the data with the values from the data context
            if (setting.data) {
                data = replaceValues(setting.data, dataContext);
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


    override onSave(model: any): void {
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
    validateResponseData(response: TExecuteFetchResponse, dataPath: string, setting?: TAPIExecutionSettings, addErrors?: boolean) {
        let retValue: any | undefined = undefined

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
        // this.setup();
    }


    reset(newConfig: any): void {
        // this.searchIFieldPlacement = this.options.searchFields();
        // this.selectedIFieldPlacement = this.options.selectedFields();
    }

    setWidgetJsonSettings(): IWidgetJson<IExternalMatterSearchConfiguration> {
        return Settings
    }

    setThisComponentName(): string {
        return "ExternalMatterSearch";
    }

    setDefaults(): IDefaultSettings<IExternalMatterSearchConfiguration> {
        return Default
    }

    setLocationOfDataToLoadAndSave(): string | undefined {
        return undefined;
    }



    getInputVisability() {

        let retValue = true;
        if (!this.options.inputVisability()) {
            retValue = true;
        }

        //check if readOnly is a boolean
        if (typeof this.options.inputVisability() === "boolean") {
            retValue = this.options.inputVisability() as boolean;
        }
        //
        //check if the readOnly is a rule
        if (typeof this.options.inputVisability() === "object") {
            //check if its an array
            if (!Array.isArray(this.options.inputVisability())) {
                this.options.inputVisability([this.options.inputVisability() as any]);
            }
            if (this.options.inputVisability() instanceof Array) {
                let rules = this.options.inputVisability() as IRule[];
                //check if any of the rules evaluate to true
                for (let i = 0; i < rules.length; i++) {
                    const rule = rules[i] as NestedObservableObject<IRule>;
                    if (!rule.rule) continue;
                    retValue = evaluteRule(`model.${rule.rule()}`, this.model, "model");
                }
            }
        }



        let input = this.element.querySelector("#externalMatterSearch") as HTMLDivElement
        if (input) {
            if (retValue === true) {
                input.style.display = "none";
            }
        }


        // return false; //default
    }

    getConfiguration(): IExternalMatterSearchConfiguration {
        return this.configuration;
    }

    getSearchFieldPlacement(): IFieldPlacement | undefined {
        return ko.toJS(this.options.searchFields());
    }

    getSelectedIFieldPlacement(): IFieldPlacement | undefined {
        let retValue = ko.toJS(this.options.selectedFields());
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
