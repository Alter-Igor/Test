import * as ko from "knockout";
import * as moment from "moment";
import { ISharedoCoreCaseOdsEntityPicker } from "../../../Typings/components/sharedo-core-case-ods-entity-picker";
import { IAutoCompleteFindCard } from "../../../Typings/components/auto-complete";


export function ComponentsPlay(element: HTMLElement, configuration: any, baseModel: any): ComponentsPlayClass {
    return new ComponentsPlayClass(element, configuration, baseModel);
}



class ComponentsPlayClass {
    model: {
        todoMessage: string | null,
        sharedoId: string | null,
        sharedoTypeSystemName: string | null,
    };

    odsEntityPickerConfig: any;

    autoComplete: any;
    selectedMatter: any;
    odsPicker: any;
    odsCountdown: ko.Observable<number> | undefined;

    constructor(element: HTMLElement, configuration: any, baseModel: any) {
        this.log("constructor", configuration);
        const defaults = {
            id: null,
            todoMessage: null
        };
        const options = $.extend(true, {}, defaults, configuration);
        this.setModelDefaults(options);
        this.model = {
            todoMessage: options.todoMessage,
            sharedoId: options.id,
            sharedoTypeSystemName: options.sharedoTypeSystemName
        };

        this.setupOdsPickerConfig();
        this.setupAutoComplete();

    }
    setupAutoComplete() {
        this.autoComplete = new Sharedo.UI.Framework.Components.AutoCompleteHandler(
            {
                enabled: true,
                mode: "select",
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
                    selectedValue: this.selectedMatter,
                    onLoad: this.autoCompleteLoadMatter.bind(this)
                },
                onFind: this.autoCompleteFinder.bind(this),
                templates: { result: "__matter_search_item_template" },

            }
        );
    }

    autoCompleteFinder(v:string) {

            this.log("autoCompleteFinder", v);
            let search = v.toLowerCase();
        

            let results: Array<IAutoCompleteFindCard> = [];

            //create a list of 100 items
            for (let i = 0; i < 100; i++) {
                results.push(new Sharedo.UI.Framework.Components.AutoCompleteFindCard({
                    type: "result",
                    id: i,
                    icon: "fa-users",
                    text: "Team " + i
                }));
            }

            if (results.length > 0) {
                results = _.sortBy(results, "text");
                results.splice(0, 0, new Sharedo.UI.Framework.Components.AutoCompleteFindCard({
                    type: "message",
                    icon: "fa-check text-success",
                    text: "Found " + results.length + " teams"
                }));
            }
        
            return results;
        };

    
    autoCompleteLoadMatter() {
        this.log("loadMatter", this)
    }

    private setModelDefaults(options: any) {
        if (!options.id && $ui && $ui.pageContext && $ui.pageContext.sharedoId) {
            options.id = $ui.pageContext.sharedoId;
        }

        if (!options.sharedoTypeSystemName && $ui && $ui.pageContext && $ui.pageContext.sharedoTypeSystemName) {
            options.sharedoTypeSystemName = $ui.pageContext.sharedoTypeSystemName;
        }

        this.odsEntityPickerConfig = null;

    }

    public onDestroy(): void {
        this.log("onDestroy", this);
    }

    log(message: string, data: any) {
        //log with name of the component and with color
        console.log("%c ComponentsPlay: " + message, "color: #ff0000", data);
    }


    public loadAndBind(): void {
        this.log("loadAndBind", this);
    }

    setupOdsPickerConfig() {

        this.log("setupOdsPickerConfig", this);

        let roleConfigModels = [{
            "displayName": "Client",
            "roleSystemName": "client",
            "showSearchOds": true,
            "required": true,
            "icon": "",
            "disabled": false,
            "odsId": null
        }];

        this.odsEntityPickerConfig =
        {
            odsEntityValues: ko.observableArray(),
            validationErrorCount: ko.observableArray(),
            odsEntityValidationErrorCount: ko.observable(0),
            configuration:
            {
                sharedoId: this.model.sharedoId,
                sharedoTypeSystemName: this.model.sharedoTypeSystemName,
                showPreSharedo: true,
                showPostSharedo: true,
                roleConfigModels: ko.observableArray(roleConfigModels)
            }
        };

        (window as any).testComp = this.odsEntityPickerConfig;

        this.log("setupOdsPickerConfig", this.odsEntityPickerConfig);
        this.log("setupOdsPickerConfig", this.odsEntityPickerConfig.configuration.roleConfigModels());
        this.odsPicker = this.odsEntityPickerConfig;

        //countdown 10 seconds and update odsDefaultCountdown value on each second
        this.countdownAndSetOdsPickerDefaultExample();


    }

    /**
     * Countdown 10 seconds and update odsDefaultCountdown value on each second
     */
    private countdownAndSetOdsPickerDefaultExample() {
        let interval = 1000;
        let odsDefaultCountdown = 100;
        this.odsCountdown = ko.observable(odsDefaultCountdown);

        let tickFunction = () => {
            interval = interval - 50;
            if (interval < 5) { interval = 30; }
            console.log("interval", interval);
            if (!this.odsCountdown) { return; }
            this.odsCountdown(this.odsCountdown() - 1);
            let currentCountdown = this.odsCountdown();

            if (currentCountdown <= 0) {
                let currentOds = this.odsEntityPickerConfig.odsEntityValues()[0].odsId();
                if (currentOds) { return } //do nothing as value is set

                this.odsEntityPickerConfig.configuration.roleConfigModels()[0].odsId = $ui.pageContext.user.userid();

                let updateMethod = this.odsEntityPickerConfig.odsEntityValues()[0]?.component?.updateComponentFromConfig;
                console.log("updateMethod", updateMethod);
                if (updateMethod)

                    updateMethod.bind(this.odsEntityPickerConfig.odsEntityValues()[0].component)();
            }
            else {
                setTimeout(tickFunction, interval);
            }
        };
        setTimeout(tickFunction, interval);
    }
}

