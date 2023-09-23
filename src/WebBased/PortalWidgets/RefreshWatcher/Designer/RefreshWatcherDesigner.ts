import * as ko from "knockout";
import * as $ from "jquery";
import { renderForm } from "../../../Formio/Common/FormioRender";
import { REFRESH_WATCHER_FORMIO, SHAREDO_EVENTS } from "./TheDesignerForm";
import * as Formio from "formiojs";
import { IRefreshWatcherConfiguration } from "../RefreshWatcherConfiguration";


export function RefreshWatcherDesigner(element: HTMLElement, configuration: any, baseModel: any): RefreshWatcherDesignerClass {
    return new RefreshWatcherDesignerClass(element, configuration, baseModel);
}

export interface Configuration {
    blade?: any;
    __scope?: {
        mode?: any;
        sharedoTypeSystemName?: any;
    };
    configuration: IRefreshWatcherConfiguration
}



export class RefreshWatcherDesignerClass {
    model: ko.Observable<any>;
    validation: any;
    validationErrorCount: ko.Computed<number>;
    formIO: Formio.Form | undefined;
    element: HTMLElement;
    jsonOfModel: ko.Observable<string>;
   

    constructor(element: HTMLElement, configuration: Configuration, baseModel: any) {

        this.element = element;
        const defaults: Configuration = {
            configuration: {
                widgets: [],
                useIntervalRefreshEveryXSeconds: false,
                refreshOnEvents: false,
                eventsToListenTo: [],
                intervalSeconds: undefined
            }
        };

        const options = $.extend(true, {}, defaults, configuration);

        this.model = ko.observable(options.configuration);
        this.jsonOfModel = ko.observable(JSON.stringify(this.model()))
        this.model.subscribe((newValue) => {
            console.log(newValue);
            this.jsonOfModel(JSON.stringify(newValue))
        });


        this.model.subscribe((newValue) => {
            console.log(newValue);
            if (this.formIO) {
                console.log("setting data");//todo
            }
        });

        this.validation = {
            configuration: ko.pureComputed(() => {
                const message = this.model();
                if (!message) return "The message is required";
                return null;
            }),
        };

        this.validationErrorCount = ko.pureComputed(() => {
            let fails = 0;
            if (this.validation.configuration()) fails++;
            return fails;
        });
    }

    onDestroy(): void { }
    loadAndBind(): void {
        this.render();
    }

    async render(): Promise<void> {
        let formDiv = this.element.querySelector(".formio-component-form");
        if (!formDiv) { throw new Error("Could not find formio-component-form") }

        let data: Object | undefined;
        if (this.model()) {
            // data = JSON.parse(this.model()); 
            data = this.model();
        }
        console.log(data);

        renderForm(formDiv, REFRESH_WATCHER_FORMIO, data, { eventsOptions: SHAREDO_EVENTS }).then((form) => {
            this.formIO = form;
            if (!this.formIO) {
                throw new Error("Could not render formio");
            }

            form.submission = {
                data: data
            };

            this.formIO.on('change', (submission: any) => {
                console.log(submission)
                try {
                    // let data = JSON.stringify(submission.data)
                    this.model(submission.data)
                }
                catch (e) {
                    console.error(e);
                }
                // this.handleFormSubmit(submission); 

            }, false);
        });
    }

    getModel() {

        let koModel = ko.toJS(this.model);
        return {configuration:koModel};
    }
}

