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
    selectedAutoCompleteValue = ko.observable({
        firstName: "igor",
        lastName: "Jericevich",
        email: "igor@nothgin.com"
    });
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
                templates:
                {
                    result: "_components_play_template",
                    message: undefined
                },
                select:
                {
                    allowClear: true,
                    selectedValue: this.selectedAutoCompleteValue,
                    onLoad: this.autoCompleteLoad.bind(this)
                },

                onFind: this.autoCompleteFinder.bind(this)

            }
        );
    }


    autocompleteSelected(v: any) {
        this.log("autocompleteSelected: ", v);
    }

    autoCompleteChoose(v: any) {
        this.log("autoCompleteChoose: ", v);
    }

    autoCompleteFinder(v: string) {

        this.log("autoCompleteFinder: ", v);
        let search = v.toLowerCase();
        let results: Array<IAutoCompleteFindCard> = [];

        //create 100 records of fake contact data
        let fakeData = [];
        for (let i = 0; i < 100; i++) {

            let newItem = {
                firstName: "First " + i,
                lastName: "Last " + i,
                email:"email" + i + "@test.com",
                phone: "0123456789" + i
            }
            fakeData.push(newItem);
        }


        //filter fake data by search term
        fakeData = fakeData.filter(item => {
            return item.firstName.toLowerCase().indexOf(search) > -1 ||
                item.lastName.toLowerCase().indexOf(search) > -1 ||
                item.email.toLowerCase().indexOf(search) > -1 ||
                item.phone.toLowerCase().indexOf(search) > -1;
        });
        

        //create a result for each fake data item
        fakeData.forEach(item => {
            results.push(new Sharedo.UI.Framework.Components.AutoCompleteFindCard({
                type: "result",
                id: item,
                data:item,
                icon: "fa-users",
                text: item.firstName + " " + item.lastName,
            }));
        });
        

        if (results.length > 0) {
            results.splice(0, 0, new Sharedo.UI.Framework.Components.AutoCompleteFindCard({
                type: "message",
                icon: "fa-check text-success",
                text: "Found " + results.length + " teams"
            }));
        }

        return results;
    };


    autoCompleteLoad(v: any) {
        this.log("autoCompleteLoad", v)
        
        return new Sharedo.UI.Framework.Components.AutoCompleteDisplayCard({
            id: v,
            type: "result",
            icon: "fa-users",
            data: v,
            text: v.firstName + " - " + v.lastName
        });

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

