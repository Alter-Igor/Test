import { AUTOCOMPLETE_MODE, AUTOCOMPLETE_CARD_TYPE} from "../../../Interfaces/components/IAutoCompleteFindCardOptions";
import { setAllFieldsToNull } from "../../Common/ObjectHelper";
import { executeGet } from "../../Common/api/api";
import { BaseIDEAspect, Defaults} from "../BaseClasses/BaseIDEAspect";
import { Default, IExternalMatterSearchConfiguration } from "./ExternalMatterSearchInterface";
import { IWidgetJson} from "../BaseClasses/IWidgetJson";
import ko, { Observable } from "knockout";
import { Settings } from "./ExternalMatterSearchSettings";



export class ExternalMatterSearch extends BaseIDEAspect<IExternalMatterSearchConfiguration, any> {
    autoComplete: Sharedo.UI.Framework.Components.AutoCompleteHandler | undefined;
    selectedDiv: any;
    selectedMatter: Observable<any> = ko.observable<any>();
    
    
    // constructor(element: HTMLElement, configuration: IExternalMatterSearchConfiguration, baseModel: any) {
    //     super(thisWidgetSystemName, "aspectData.odsEntityPicker", element, configuration, baseModel)
    // }

    setWidgetJsonSettings(): IWidgetJson {
        return Settings
    }
   
    setThisComponentName(): string {
        return "ExternalMatterSearch";
    }

    setDefaults(): Defaults<IExternalMatterSearchConfiguration> {
        return Default
    }

    setLocationOfDataToLoadAndSave(): string | undefined {
        return undefined;
    }

    // private initialise() {//! Note: UI framework looks for this method name and if found behaves differently and wont call loadAndBind

    /**
     * @method setup
     * @description Sets up the auto complete handler
     * @returns {void}
     */
     setup() {
        this.autoComplete = new Sharedo.UI.Framework.Components.AutoCompleteHandler(
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
                    onLoad: this.loadMatter.bind(this)
                },
                onFind: this.autoCompleteFinder.bind(this),
                templates: { result: "__matter_search_item_template" },
            }
        );
    }

    /**
     * @method load
     * @description Loads the data from the sharedo model form builder
     * @param {any} model - The model to load from
     * @returns {void}
     */
    load(model: any) {
        if (!this.sharedoId()) return;
        model.aspectData = model.aspectData || {};
        model.aspectData.formBuilder = model.aspectData.formBuilder || {};
        model.aspectData.formBuilder.formData = model.aspectData.formBuilder.formData || {};
        var formData = model.aspectData.formBuilder.formData;

        let matterModel = {
            code: formData.externalMatter_Code,
            title: formData.externalMatter_Title,
            client: formData.externalMatter_Client,
            partner: formData.externalMatter_Partner,
            status: formData.externalMatter_Status,
            isSecure: formData.externalMatter_IsSecure,
        };

        addVisualExtension(matterModel);

        this.selectedMatter(matterModel);
    }

    loadMatter(model: any) {
        //https://hsf-vnext.sharedo.co.uk/api/externalMatterProvider/details/81735089

        if (!model || !model.code) return null;
        $ui.stacks.lock(self, "Loading");
        this.log("Loading Matter: " + model.code, "green");

        let url = this.options.loadApiUrl();

        //find any values within {} and replace with the value from the model
        let matches = url.match(/{([^}]+)}/g);
        if (matches) {
            matches.forEach((m: any) => {
                let key = m.replace("{", "").replace("}", "");
                url = url.replace(m, model[key]);
            });
        }
       this.log("Loading Matter using : " + url, "green");

        executeGet(url).then((response: any) => {
            model.code = response.matterCode;
            model.shortName = response.shortName;
            model.client = response.client?.name;
            model.partner = response.partner?.name;
            model.status = response.status;
            model.isSecure = response.secure;
        }).catch((error: any) => {
            setAllFieldsToNull(model);
        }).finally(() => {
            addVisualExtension(model);
            this.selectedMatter(model);
            $ui.stacks.unlock(self);
        });

        //Resut the basic selected display card to the auto complete
        return new Sharedo.UI.Framework.Components.AutoCompleteDisplayCard({
            id: model,
            icon: null,
            text: model.code + " - " + model.title
        });


       
    };

    _aspectReload(model: any) {
        this.load(model);
    };

    save(model: any) {
        var matter = {
            externalMatter_Code: null,
            externalMatter_Title: null,
            externalMatter_Client: null,
            externalMatter_Partner: null,
            externalMatter_Status: null,
            externalMatter_IsSecure: false
        };

        var modelMatter = this.selectedMatter();

        if (modelMatter) {
            matter.externalMatter_Client = modelMatter.client;
            matter.externalMatter_Partner = modelMatter.partner;
            matter.externalMatter_Title = modelMatter.title;
            matter.externalMatter_Code = modelMatter.code;
            matter.externalMatter_Status = modelMatter.status;
            matter.externalMatter_IsSecure = modelMatter.isSecure;
        }

        $.extend(model.aspectData.formBuilder.formData, matter);

    };

   

    autoCompleteFinder(v: string, handler: any) {

        var search = v.toLowerCase();
        var result = $.Deferred();

        //if (!self.sharedoId()) return;

        this.log("Searching for: " + search, "green");
        let url = this.options.searchApiUrl();

        //replace any {0} with the search term
        if (url.indexOf("{searchTerm}") > -1) {
            url = url.replace("{searchTerm}", search);
        }

        executeGet(url).then((data: any) => {
            let cards = new Array<Sharedo.UI.Framework.Components.AutoCompleteFindCard>();
            data.externalMatterProviderSearchResults.forEach((d: any) => {
                addVisualExtension(d);
                cards.push(new Sharedo.UI.Framework.Components.AutoCompleteFindCard({
                    type: AUTOCOMPLETE_CARD_TYPE.RESULT,
                    data: d,
                    icon: d.icon,
                    id: d,
                    styles: null,
                    cssClass: d.cssClass,
                }));
            });
            result.resolve(cards);
        });

        return result;
    };

    autoCompleteSelect(selectCard: any, handler: any) {
    };

    override loadAndBind(): void {
        this.log("No LoadAndBind Implemented", "green");
        // super.loadAndBind();

        this.selectedDiv = this.element.querySelector("#selected");
        
    };

    buildSelectedCard(): void {
        this.log("No BuildSelectedCard Implemented", "green");
        this.selectedDiv.innerHTML = "";


    }

    override onSave(model: any): void {
        this.log("No Save Implemented", "green");
        // super.onSave(model);
    };
} 




function addVisualExtension(matterModel: any) {
    
    if (!matterModel) return;

    matterModel.cssClass = "";
    

    //add Icon
    if(matterModel.status == "Closed"){
        matterModel.icon = "fa-lock  text-danger";
        matterModel.cssClass = "closed-matter";
    }
    else
    {
        matterModel.icon = "fa-unlock text-success";
        matterModel.cssClass = "open-matter";
    }

    //add css class
    if(matterModel.isSecure){
        matterModel.cssClass += " secure-matter";
    }


}
