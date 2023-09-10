import * as ko from "knockout";
import { camelize} from "../../../BaseClasses/Utility";
import { DEFAULT_FORM } from "./DefaultForm";
import { createFormBuilderPage } from "../../Common/FormioBuilder";
import { renderForm } from "../../Common/FormioRender";
import { FormPreviewSettings } from "./FormSettings";
import { checkLowdashCompatability } from "../../Common/Styling";
import { setDataContext } from "../../Common/SetDataContext";
import { TShareDoBlade } from "../../../../Interfaces/SharedoAspectModels";
import { IWidgetBase } from "../../../../Interfaces/Widgets/IWidget";


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
    showPreview: boolean;
    formData: any; //formbuilder data
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
    showPreview: ko.Observable<boolean>

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

    formPreview: any;
    formSettings: any;

    designerCreated: boolean = false;
    designerDiv: HTMLDivElement | undefined;
    previewDiv: HTMLDivElement | undefined;
    previewSettingsDiv: HTMLDivElement | undefined;
    previewAreaDiv: HTMLDivElement | undefined;
    modelDialog: HTMLElement | undefined | undefined;


    constructor(element: HTMLElement, configuration: ConfgurationAndBlade, baseModel: IWidgetBase) {
        checkLowdashCompatability(); // this is required for formio to work
        this.title = configuration?.blade?.model?.title || baseModel.title
        this.element = element;
        const defaults: IFormWidgetConfiguration = {
            formBuilderDefinition: JSON.stringify(DEFAULT_FORM, null, 4),
            broadcastOnSubmit: true,
            formData: {},
            broadcastOnSubmitEventName: `${baseModel.systemName}.${camelize(this.title())}.onSubmit`,
            createWorkTypeOnSubmit: false,
            showPreview: true,
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
            participants: ko.observable(options.participants),
            showPreview: ko.observable(options.showPreview)
        };

        this.title.subscribe((newValue) => {
            this.model.broadcastOnSubmitEventName(`${baseModel.systemName}.${camelize(newValue)}.onSubmit`);
        });




        this.validationErrorCount = ko.pureComputed(() => {
            return 0;
        });


        this.showHidePreview(this.model.showPreview());

        this.model.showPreview.subscribe((newValue) => {
            if(!this.previewAreaDiv)
                {
                    console.error("this.previewAreaDiv not set");
                    return;
                }

            this.showHidePreview(newValue);
        });


    }

    private showHidePreview(newValue: boolean) {
        
        if(!this.previewAreaDiv)
        {  
            console.error("this.previewAreaDiv not set");
            return;
        }
        
        if (newValue === true) {

            this.previewAreaDiv.classList.remove("hidden");
        }

        else {
            this.previewAreaDiv.classList.add("hidden");
        }
    }

    private getDivs() {

        if(this.designerDiv && this.previewDiv && this.previewSettingsDiv)
        {
            return;
        }

        let id = "#formio-designer";
        this.designerDiv = this.element.querySelector(id) as HTMLDivElement;

        let previewId = "#formio-preview";
        this.previewDiv = this.element.querySelector(previewId) as HTMLDivElement;

        let previewSettingsId = "#formio-preview-settings";
        this.previewSettingsDiv = this.element.querySelector(previewSettingsId) as HTMLDivElement;

        let previewAreaDivId = "#formio-preview-area";
        this.previewAreaDiv = this.element.querySelector(previewAreaDivId) as HTMLDivElement;

        let ModalDialogId = ".Widgets-FormWidgetDesigner.modal";
        this.modelDialog = this.element.querySelector(ModalDialogId) as HTMLElement;
    }

    onDestroy(): void {
        // ...
    }

    loadAndBind(): void {

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

        this.getDivs();

        if (!this.designerDiv) {
            console.error("this.designerDiv not set");
            return
        }

        if (!this.designerCreated) {
            //Do this last so the query selectors work
            this.modelDialog = this.element.querySelector(".Widgets-FormWidgetDesigner.modal") as HTMLElement;
            // // move model dialog to the body
            document.body.appendChild(this.modelDialog);
        }

        if (!this.modelDialog) {
            console.error("this.modelDialog not set");
            return
        }
        (window as any).testD = $(this.modelDialog)

        this.designerCreated = true;

        createFormBuilderPage(this.designerDiv, this.formBuilderDefinition()).promise.then((formBuilder) => {
            this.formBuilder = formBuilder;
            (window as any).formBuilder = formBuilder;
            this.renderPreview();
            this.renderPreviewSettingsForm();
            formBuilder.instance.on('change', () => {
                this.renderPreview();
                this.formBuilderDefinition(JSON.stringify(formBuilder.instance.schema, null, 2));
            });
        });




        // window.open("http://127.0.0.1:5500/src/WebBased/Tester/FormIOBuilder/page.html", "_blank");


    }



    async renderPreviewSettingsForm() {

        let shareDoId;

        if (!this.previewSettingsDiv) {
            console.error("this.previewSettingsDiv not set");
            return;
        }

        if (this.formSettings) {
            return; //dont render again
        }

        // if ($ui && $ui.pageContext && $ui.pageContext.shareDoId) {
        //     shareDoId = $ui.pageContext.shareDoId; //when testing witin a ShareDo instance
        // }
        renderForm(this.previewSettingsDiv, FormPreviewSettings, { "shareDoId": shareDoId }).then((form) => {
            this.formSettings = form;
            form.on('submit', (submission: any) => {
                console.log('Submission was made!', submission);
                let shareDoId = submission.data.shareDoId;

            });
        });


    }

    async renderPreview() {

        if (!this.previewDiv) {
            console.error("this.previewDiv not set");
            return;
        }

        await setDataContext();

        if (this.formPreview) {
            this.formPreview.setForm(this.formBuilder.instance.schema);
            return;
        }

        renderForm(this.previewDiv, this.formBuilder.instance.schema).then((form) => {
            this.formPreview = form;
        });
    }
}