import { IRefreshWatcherConfiguration } from "./RefreshWatcherConfiguration";
import { TSharedo } from "../../../Interfaces/TSharedo";
import { IBaseIDEAspectConfiguration} from "../../IDEAspects/BaseClasses/BaseIDEAspect";
import { strToClass } from "../../Common/ObjectHelper";
import ko from "knockout";
import { IDefaultSettingsWithSpecificComponentConfig } from "../../IDEAspects/BaseClasses/Interfaces";




export function RefreshWatcher(element: HTMLElement, configuration: any, baseModel: any): RefreshWatcherClass {
    return new RefreshWatcherClass(element, configuration, baseModel);
}

interface IConfig {
    configuration: IRefreshWatcherConfiguration
}

class RefreshWatcherClass {

    defaults: IRefreshWatcherConfiguration =
        {
            widgets: [],
            useIntervalRefreshEveryXSeconds: false,
            refreshOnEvents: false,
            eventsToListenTo: [],
            intervalSeconds: 0
        }
    configuration: IBaseIDEAspectConfiguration<IRefreshWatcherConfiguration>; disposables: any;
    interval: NodeJS.Timeout | undefined;
    model: ko.Observable<IDefaultSettingsWithSpecificComponentConfig<IRefreshWatcherConfiguration>>
    originalConfiguration: IBaseIDEAspectConfiguration<IRefreshWatcherConfiguration>;
    lastRefresh: Date = new Date();
    refreshLog: any[] = [];

    constructor(element: HTMLElement, configuration: IBaseIDEAspectConfiguration<IRefreshWatcherConfiguration>, baseModel: TSharedo<any>) {

        this.originalConfiguration = configuration as IBaseIDEAspectConfiguration<IRefreshWatcherConfiguration>;;
        this.configuration = $.extend(true, {}, this.defaults, configuration);

        let x = ko.observable(this.configuration.configuration);
        this.model = x;

    }

    public onDestroy(): void {

        $ui.util.dispose(this.disposables);
    }



    public loadAndBind(): void {


        this.disposables = [];

        this.model().eventsToListenTo?.forEach((event) => {
            console.log("Subscribing to event", event);
            this.disposables.push(
           $ui.events.subscribe(event.eventName, (e:any)=>{
                 this.refreshComponents(event.eventName);
            }, this));

        });

        if (this.model().useIntervalRefreshEveryXSeconds && this.model().intervalSeconds && this.model().intervalSeconds! > 0) {
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.interval = setInterval(() => {
                this.refreshComponents("interval");

            }, this.model().intervalSeconds! * 1000);

            this.disposables.push(this.interval);
        }

    }

    refreshComponents(eventName:string) {

        this.refreshLog = this.refreshLog || [];
        

        if(this.lastRefresh) //TODO: change this so we collect all refreshes and do them in one go
        {
            let secondsSinceLastRefresh = (new Date().getTime() - this.lastRefresh.getTime()) / 100;
            console.log("Seconds since last refresh", secondsSinceLastRefresh);
            if(secondsSinceLastRefresh < 10)
            {
                console.log("Skipping refresh, too soon");
                return;
            } 
        }

        this.lastRefresh = new Date();

        console.log("Refreshing components");

        let widgetsToRefresh = this.model().widgets;
        console.log("Widgets to refresh: ", widgetsToRefresh.length);

        widgetsToRefresh?.forEach((widgetToRefresh) => {

            let logItem = {eventName:eventName, widgets:widgetToRefresh, time: new Date(), success:false};
           
            try {
                let componentToRefresh = $ui.widgets.instances().find((x: any) => 
                {
                    let classReference = strToClass(widgetToRefresh.typeName, window);
                    if(!classReference)
                    {
                        return false;
                    }
                     return x instanceof strToClass(widgetToRefresh.typeName, window) 
                });

                if (componentToRefresh && componentToRefresh[widgetToRefresh.methodToExecute]) {
                    // let params = widgets.parameters;
                    console.log("Refreshing", widgetToRefresh.typeName, widgetToRefresh.methodToExecute);
                    componentToRefresh[widgetToRefresh.methodToExecute](); //todo: parameters
                }
            } 
            catch (e) {
                console.log(e);

            }
            finally 
            {
                logItem.success = true;
                this.refreshLog.push(logItem);
            }
        });
    }
}

