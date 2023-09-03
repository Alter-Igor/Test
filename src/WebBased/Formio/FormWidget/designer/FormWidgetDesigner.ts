import * as ko from "knockout";
import { IWidgetBase } from "../../../../Typings/Widgets/IWidget";
import { camelize, cleanJSON } from "../../../BaseClasses/Utility";
import { DEFAULT_FORM } from "./DefaultForm";
import { TShareDoBlade } from "../../../../Typings/ShareDoJS/AddEditSharedo";
import { createFormBuilderPage } from "../../Common/FormioBuilder";
import { setAll } from "../../Common/SetDataContext";


export function FormWidgetDesigner(element: HTMLElement, configuration: any, baseModel: any): FormWidgetDesignerClass {
    return new FormWidgetDesignerClass(element, configuration, baseModel);
}

export interface IFormWidgetConfiguration {
    formBuilderDefinition: string;
    broadcastOnSubmit: boolean;
    broadcastOnSubmitEventName: string;
    createWorkTypeOnSubmit: boolean;
    workItem: string;
    aspectData: string;
    keyDates: string;
    participants: string;
}

export interface IFormWidgetDesignerModel {
    formBuilderDefinition: ko.Observable<string>
    broadcastOnSubmit: ko.Observable<boolean>
    broadcastOnSubmitEventName: ko.Observable<string>
    createWorkTypeOnSubmit: ko.Observable<boolean>
    workItem: ko.Observable<string>
    aspectData: ko.Observable<string>
    keyDates: ko.Observable<string>
    participants: ko.Observable<string>

}

interface ConfgurationAndBlade extends IFormWidgetConfiguration {
    blade: TShareDoBlade
}

export class FormWidgetDesignerClass {
    validation: any;
    validationErrorCount: ko.Computed<number>;
    formBuilderDefinition: ko.Observable<string>;
    model: IFormWidgetDesignerModel;
    textEditorFormBuilderDefinition: any;
    title: ko.Observable<string>;
    textEditorAspectData: any;
    textEditorKeyDates: any;
    textEditorWorkItem: any;
    textEditorParticipants: any;
    element: HTMLElement;
    formBuilder: any | undefined;
    designerCreated: boolean = false;
    modelDialog: HTMLElement;
    designerDiv: HTMLDivElement;


    constructor(element: HTMLElement, configuration: ConfgurationAndBlade, baseModel: IWidgetBase) {
        this.title = configuration?.blade?.model?.title || baseModel.title
        this.element = element;
        const defaults: IFormWidgetConfiguration = {
            formBuilderDefinition: JSON.stringify(DEFAULT_FORM, null, 4),
            broadcastOnSubmit: true,
            broadcastOnSubmitEventName: `${baseModel.systemName}.${camelize(this.title())}.onSubmit`,
            createWorkTypeOnSubmit: false,
            workItem: JSON.stringify({
                sharedoTypeSystemName: "instruction-b2b-dispute-plaintiff",
                titleIsUserProvided: false,
                reference: null,
                referenecIsUserProvided: false
            }, null, 4),
            aspectData: JSON.stringify(
                {
                    instructionWorkTypeDetails:
                    {
                        caseSharedoTypeSystemName: "wk-matter-dispute-plaintiff-recoveries",
                        caseWorkTypeId: 500000284,
                        jurisdictionId: "func:formBuilder.selectedLocation",
                    },
                    incidentDetailsLocation:
                    {
                        IncidentLocationId: "func:formBuilder.address",
                        IncidentTypeId: "['street']"
                    }
                }, null, 4),
            keyDates: JSON.stringify(
                {
                    "kd-instruction-received": new Date()
                }, null, 4),
            participants: JSON.stringify([
                {
                    roleSystemName: "client-case-handler",
                    odsReference: $ui.pageContext.user.username(),
                    odsType: "person",
                    odsId: $ui.pageContext.user.userid()
                },
            ], null, 4)
        };

        const options = $.extend(true, {}, defaults, configuration);
        this.formBuilderDefinition = ko.observable(options.formBuilderDefinition)

        console.log("options", options);
        this.model = {
            formBuilderDefinition: this.formBuilderDefinition,
            broadcastOnSubmit: ko.observable(options.broadcastOnSubmit),
            broadcastOnSubmitEventName: ko.observable(options.broadcastOnSubmitEventName),
            createWorkTypeOnSubmit: ko.observable(options.createWorkTypeOnSubmit),
            workItem: ko.observable(options.workItem),
            aspectData: ko.observable(options.aspectData),
            keyDates: ko.observable(options.keyDates),
            participants: ko.observable(options.participants)

        };

        this.title.subscribe((newValue) => {
            this.model.broadcastOnSubmitEventName(`${baseModel.systemName}.${camelize(newValue)}.onSubmit`);
        });

        this.validationErrorCount = ko.pureComputed(() => {
            return 0;
        });

        let id = "#formio-designer";
        this.designerDiv = this.element.querySelector(id) as HTMLDivElement;
        
        this.modelDialog = this.element.querySelector(".Widgets-FormWidgetDesigner.modal") as HTMLElement;
        // move model dialog to the body
        document.body.appendChild(this.modelDialog);

        

    }

    onDestroy(): void {
        // ...
    }

    loadAndBind(): void {
        // ...
    }

    getModel() {
        var koModel = ko.toJS(this.model);
        return koModel;
    }

    onFocusOut(data: any, event: any) {
        let id = event.target.parentElement.id;
        let koObject = (this.model as any)[id];
        try {
            let newValue = JSON.stringify(JSON.parse(koObject()), null, 4);
            koObject(newValue);
        }
        catch (e) {
            console.log("error", e);
        }

    };

    checkComplex() { 

        if(this.designerCreated) {
            // return;
        }

        this.designerCreated = true;
        this.designerDiv.innerHTML
        
        createFormBuilderPage(this.designerDiv,this.formBuilderDefinition()).promise.then((formBuilder) => {
            this.formBuilder = formBuilder;
            (window as any).formBuilder = formBuilder;
            formBuilder.instance.on('change', () => {
                this.formBuilderDefinition(JSON.stringify(formBuilder.instance.schema, null, 2));
            });
        });
      

        // window.open("http://127.0.0.1:5500/src/WebBased/Tester/FormIOBuilder/page.html", "_blank");


    }

}


