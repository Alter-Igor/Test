import * as ko from "knockout";
import { Data, loadWorkItem, updateIBLastCheckedDate } from "./IBMatterWarningAgent";
import * as moment from "moment";


interface Person {
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
}
interface Response {
    data: Person[];
}

export function IBMatterWarning(element: HTMLElement, configuration: any, baseModel: any): IBMatterWarningClass {
    return new IBMatterWarningClass(element, configuration, baseModel);
}
 
class IBMatterWarningClass {
    private model: {
        todoMessage: string | null,
        id: string | null,
        informationBarrier: ko.Observable<boolean | undefined>,
        informationBarrierMessage: ko.Observable<string | undefined>,
        lastCheckDate: ko.Observable<Date | undefined>,
        lastCheckDateFormatted: ko.Observable<string | undefined>,

    };

    constructor(element: HTMLElement, configuration: any, baseModel: any) {
        const defaults = {
            id: null,
            todoMessage: null
        };
        const options = $.extend(true, {}, defaults, configuration);

        if (!options.id && $ui && $ui.pageContext && $ui.pageContext.sharedoId) {
            options.id = $ui.pageContext.sharedoId();
        }

        this.model = {
            todoMessage: options.todoMessage,
            id: options.id,
            informationBarrier: ko.observable(),
            informationBarrierMessage: ko.observable(),
            lastCheckDate: ko.observable(),
            lastCheckDateFormatted:ko.observable(),

        };
    }

    public onDestroy(): void {
    }

   

    public loadAndBind(): void {
        if (!this.model.id) return;
        this.model.informationBarrierMessage("Checking Information Barrier Status....");
        loadWorkItem(this.model.id).then((data: Data | undefined) => {
            //wait 5 seconds
            setTimeout(() => {
                if (!data) return;
                //log color
                console.log("%c loadWorkItem", "color: #ff0000",data); 

                this.model.lastCheckDate(new Date(Date.now()));
                this.model.informationBarrier(data.informationBarrier);
                console.log("informationBarrier", data.informationBarrier);
                console.log(typeof data.informationBarrier);

                if (data.informationBarrier == false) {
                    console.log("informationBarrier is true");
                    this.model.informationBarrierMessage("<div class='information_barrier_message active'>Warning! This matter is subject to an information barrier.</div>");
                }
                else
                {console.log("informationBarrier is not true");
                    this.model.informationBarrierMessage("<div class='information_barrier_message'>This matter is not subject to an information barrier.</div>");
                }
                if(this.model.id)
                {
                    updateIBLastCheckedDate(this.model.id, !data.informationBarrier)
                }
            }, 5000);
 

            //set the last check date every 5 seconds
            setInterval(() => {
                if(this.model.lastCheckDate())
                {
                    this.model.lastCheckDateFormatted(moment(this.model.lastCheckDate()).fromNow());
                }
            }   , 5000);


        });

    }
}

