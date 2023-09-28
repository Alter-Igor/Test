import { AUTOCOMPLETE_CARD_TYPE, AUTOCOMPLETE_MODE } from "../../../Interfaces/components/IAutoCompleteFindCardOptions";
import { setAllFieldsToNull } from "../../Common/ObjectHelper";
import { TExecuteFetchResponse, TUserErrors, executeGet, executeGetv2 } from "../../Common/api/api";
import { BaseIDEAspect, IDefaultSettings } from "../BaseClasses/BaseIDEAspect";
import { IWidgetJson } from "../BaseClasses/IWidgetJson";
import ko, { Observable } from "knockout";
import { Settings } from "./ExternalMatterSearchSettings";
import { Default } from "./ExternalMatterSearchDefaults";
import { formatFunc } from "../../../helpers/Formatter";
import { evaluteRule } from "../../../helpers/evaluteRule";
import { Section, inf, lh } from "../../../Common/Log";
import { IExternalMatterSearchConfiguration, IFieldPlacement, INameValue, IRule, IStyleEntry, IStyleRule } from "./ExternalMatterSearchInterface";
import { autoGenerateTemplate, generateHtmlDiv } from "./ExternalMatterSearchTemplateGenerator";
import { validateJSON } from "../../../helpers/Schema";
import { DEFAULT_SEARCH_FIELDS_CONFIG } from "./DefaultSearchFields";
import * as SCHEMA from "./ConfigSchema.json";
import { DEFAULT_SELECTED_FIELDS_CONFIG } from "./DefaultSelectedFields";
import { mapData, reverseMapData } from "./DataMapper";
import { getNestedProperty } from "../BaseClasses/ObjectHelpers";
import { forEach, set } from "lodash";
import { NestedObservableObject } from "../BaseClasses/KOConverter";

const CSS_CLASS_SELECTED_ITEM = "ems-selected-item";
const CSS_CLASS_RESULT_ITEM = "ems-result-item";
const CSS_CLASS_ROW_CONTAINER = "ems-row-container";
const CUSTOM_TEMPLATE_CONTENT_ID = "resultItem";
const AUTOCOMPLETE_ID = "externalMatterSearch";
const SEARCH_TEMPLATE_NAME = "__matter_search_item_template";
const SEARCH_TERM = "searchTerm";

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



    refresh(newConfig: any): void {
        // this.setup();
    }


    reset(newConfig: any): void {
        // this.searchIFieldPlacement = this.options.searchFields();
        // this.selectedIFieldPlacement = this.options.selectedFields();
    }

    formatFunc(value: any, formatter: string) {

        return formatFunc(value, formatter)
    };

    evalFunc(value: any, dataContext: string, dataContextName: string) {
        this.inf("evalFunc", value, dataContext, dataContextName)
        return evaluteRule(value, dataContext, dataContextName)
    }

    // constructor(element: HTMLElement, configuration: IExternalMatterSearchConfiguration, baseModel: any) {
    //     super(thisWidgetSystemName, "aspectData.odsEntityPicker", element, configuration, baseModel)
    // }

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

    setStyles(strStyle: string, data: any, dataContextName: string): any {
        let retValue: INameValue = {};

        //base64 decode
        strStyle = atob(strStyle);

        let style: IStyleEntry = JSON.parse(strStyle);

        if (!style) {
            this.err("No style defined");
            return "";

        };

        this.inf("setStyles", style)

        if (typeof style === "string") {
            let n: IStyleRule = {
                style: style
            }
            return this.buildStyling(n, retValue);
        }

        if (Array.isArray(style)) {
            let arrItem = style as IStyleRule[];
            if (Array.isArray(arrItem)) {
                for (let i = 0; i < arrItem.length; i++) {
                    let styleRuleOrNameValue = arrItem[i];
                    if (styleRuleOrNameValue.rule) {
                        if (evaluteRule(`${dataContextName}.${styleRuleOrNameValue.rule}`, data, dataContextName)) {
                            if (!styleRuleOrNameValue.style) continue;
                            retValue = this.buildStyling(styleRuleOrNameValue, retValue);
                        }
                    }
                    else {
                        retValue = this.buildStyling(styleRuleOrNameValue, retValue);
                    }
                }
            }

            for (let i = 0; i < arrItem.length; i++) {
                let styleRuleOrNameValue = arrItem[i];
                if (styleRuleOrNameValue.rule) {
                    if (evaluteRule(`${dataContextName}.${styleRuleOrNameValue.rule}`, data, dataContextName)) {
                        if (!styleRuleOrNameValue.style) continue;
                        retValue = this.buildStyling(styleRuleOrNameValue, retValue);
                    }
                }
                else {
                    retValue = this.buildStyling(styleRuleOrNameValue, retValue);
                }
            }
        }
        else {

            if (typeof style === "object") { //must be a NameValue
                return style;
            }
        }


        return retValue;
    }
    buildStyling(rule: IStyleRule, retValue: INameValue) {

        if (typeof rule.style === "object") {
            retValue = { ...retValue, ...rule.style };
        }

        if (typeof rule.style === "string") {
            let styleItems = rule.style.split(";");
            for (let i = 0; i < styleItems.length; i++) {
                let styleItem = styleItems[i];
                let nameValue = styleItem.split(":");
                if (nameValue.length == 2) {
                    retValue[nameValue[0].trim()] = nameValue[1].trim();
                }
            }
        }
        return retValue;
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
                let rules = this.options.inputVisability() as  IRule[];
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
        return  ko.toJS(this.options.searchFields());
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

        this.customTemplateContentId = CUSTOM_TEMPLATE_CONTENT_ID;
        this.searchCustomTemplateId = "__custom_matter_search_item_template";
        this.searchCustomTemplateDiv = this.element.querySelector("#" + this.searchCustomTemplateId) as HTMLTemplateElement;
        if (this.searchCustomTemplateDiv) {
            const content = this.searchCustomTemplateDiv.content;
            const resultItem = content.querySelector(`.${CSS_CLASS_RESULT_ITEM}`) as HTMLDivElement;
            this.searchCustomTemplateContentsDiv = content.querySelector("#" + this.customTemplateContentId) as HTMLDivElement;
            if (this.searchCustomTemplateContentsDiv) {
                if (this.searchTemplateGeneratedDiv) {
                    this.searchTemplateGeneratedDiv.remove();
                }
                let unwrap = ko.toJS(this.options.searchFields());
                this.searchTemplateGeneratedDiv = generateHtmlDiv(unwrap, "data", this.searchCustomTemplateContentsDiv);
                // this.searchCustomTemplateContentsDiv.appendChild(this.searchTemplateGeneratedDiv);
                this.searchTemplateToUseName = this.searchCustomTemplateId;
            }
        }

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
    this.searchTemplateToUseName = SEARCH_TEMPLATE_NAME;
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
                templates: { result: this.searchTemplateToUseName  },
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
            let matches = textValue.match(/{([^}]+)}/g);
            if (matches) {
                matches.forEach((m: any) => {
                    let key = m.replace("{", "").replace("}", "");
                    let val = getNestedProperty(model, key)
                    textValue = textValue.replace(m, val);
                });
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

    private ensureSelectedMatterTemplate() {

        if (!this.selectedDiv) {
            this.err("No selectedDiv defined");
            return;
        }

        if (this.selectedMatter!() === undefined) {
            this.selectedDiv.classList.remove("ems-show");
        };



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

        this.selectedTemplateGeneratedDiv = generateHtmlDiv(ko.toJS(this.options.selectedFields()), "selectedMatter()", this.selectedDiv);
        // this.selectedDiv.appendChild(this.selectedTemplateGeneratedDiv);
        // ko.cleanNode(this.selectedDiv);
        ko.applyBindings(this, this.selectedTemplateGeneratedDiv);

        this.clearSec();

    }

    async loadMatterDetailsFromLoadAPI(model: IExternalResultItem) {

        this.clearErrors();

        try {
            let retValue: any = model;

            let url = this.options.loadApiUrl();

            //find any values within {} and replace with the value from the model
            let matches = url.match(/{([^}]+)}/g);
            if (matches) {
                matches.forEach((m: any) => {
                    let key = m.replace("{", "").replace("}", "");
                    let val = getNestedProperty(model, key)
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

        if (errorMessageFromSharedo) {
            this.errors?.push({
                code: "SHAREDO_ERROR",
                message: errorMessageFromSharedo,
                userMessage: errorMessageFromSharedo
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
        // var matter = {
        //     externalMatter_Code: null,
        //     externalMatter_Title: null,
        //     externalMatter_Client: null,
        //     externalMatter_Partner: null,
        //     externalMatter_Status: null,
        //     externalMatter_IsSecure: false
        // };

        // var modelMatter = this.selectedMatter();

        // if (modelMatter) {
        //     matter.externalMatter_Client = modelMatter.client;
        //     matter.externalMatter_Partner = modelMatter.partner;
        //     matter.externalMatter_Title = modelMatter.title;
        //     matter.externalMatter_Code = modelMatter.code;
        //     matter.externalMatter_Status = modelMatter.status;
        //     matter.externalMatter_IsSecure = modelMatter.isSecure;
        // }

        //this.ensureFormbuilder(model) //make sure there is a formbuilder

        let dataToSave = this.ensureFormbuilder(model);
        $.extend(this.ensureFormbuilder(model), mappedData);
        this.l("dataToSave", dataToSave)

    };


    querySearchAPI(v: string, handler: any) {
        this.clearErrors();
        var search = v.toLowerCase();
        var result = $.Deferred();

        this.log("Searching for: " + search, "green");
        let url = this.options.searchApiUrl();

        if (url.indexOf(SEARCH_TERM) > -1) {
            url = url.replace(SEARCH_TERM, search);
        }

        executeGetv2(url).then((response) => {
            let cards = new Array<Sharedo.UI.Framework.Components.AutoCompleteFindCard>();
            let data: any;


            let dataPath = this.options.searchApiResultCollectionPath();
            let dataItems = this.validateResponseData(response, dataPath);

            if (!Array.isArray(dataItems)) {
                this.err("Data at path: " + dataPath + " is not an array");
                return [];
            }


            dataItems.forEach((d: any) => {
                // addVisualExtension(d);
                d.forma = this.formatFunc;

                cards.push(new Sharedo.UI.Framework.Components.AutoCompleteFindCard({
                    type: AUTOCOMPLETE_CARD_TYPE.RESULT,
                    data: d,
                    icon: d.icon,
                    id: d,
                    styles: null,
                    cssClass: d.cssClass,
                }));
            });
            this.clearSec();
            this.lh1("querySearchAPI")
            result.resolve(cards);
            this.clearSec();
        });

        return result;
    };


    querySearchAPIMulti(v: string, handler: any) {
    
        this.clearErrors();
        var search = v.toLowerCase();
        var result = $.Deferred();

        this.log("Searching for: " + search, "green");

        if(!this.options.searchApiExecutionSettings){
            this.err("No searchApiExecutionSettings defined");
            return;
        }

        this.options.searchApiExecutionSettings()?.forEach((setting) => {
            this.lh1("querySearchAPIMulti")
            this.log("Searching for: " + search, "green");
            let url = setting.url;

            if (url.indexOf(SEARCH_TERM) > -1) {
                url = url.replace(SEARCH_TERM, search);
            }

            

        });


        // let url = this.options.searchApiUrl();

        // if (url.indexOf(SEARCH_TERM) > -1) {
        //     url = url.replace(SEARCH_TERM, search);
        // }



      
    
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



    validateResponseData(response: TExecuteFetchResponse, dataPath: string) {
        let retValue: any | undefined = undefined

        if (response.info.success === false) {
            this.buildUserErrors(response);

        }

        if (typeof response.data === "string") {
            retValue = JSON.parse(response.data);
        }


        this.inf("querySearchAPI", retValue)


        let dataItems = getNestedProperty(retValue, dataPath) as any[];

        if (!dataItems) {
            this.err("No data found at path: " + dataPath);
            return [];
        }
        return dataItems;
    }

}

// function addVisualExtension(matterModel: IExternalResultItem) {

//     if (!matterModel) return;

//     matterModel.cssClass = "";


//     //add Icon
//     if (matterModel.status == "Closed") {
//         matterModel.icon = "fa-lock  text-danger";
//         matterModel.cssClass = "closed-matter";
//     }
//     else {
//         matterModel.icon = "fa-unlock text-success";
//         matterModel.cssClass = "open-matter";
//     }

//     //add css class
//     if (matterModel.isSecure) {
//         matterModel.cssClass += " secure-matter";
//         matterModel.isSecureIcon = "fa-solid fa-shield text-danger";
//     }
//     else {
//         matterModel.isSecureIcon = "fa-solid fa-file text-success";

//     }


// }
