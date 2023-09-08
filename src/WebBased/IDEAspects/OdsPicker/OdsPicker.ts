import * as ko from "knockout";
import {IODSPickerConfiguration} from "./IOdsPickerConfig"
import { BaseIDEAspect } from "../BaseClasses/BaseIDEAspect";

interface OdsEntityModel {
    roleName: string;
    label: string;
    roleSystemName: ko.Observable<string>;
    participantType: ko.Observable<string>;
    odsId: ko.Observable<string>;
    odsName: ko.Observable<string>;
    status: ko.Observable<boolean>;
    icon: ko.Observable<string>;
    selected: ko.Observable<boolean>;
    showSearchOds: boolean;
    required: ko.Observable<boolean>;
    addMenuOptions: ko.ObservableArray<any>;
}


// export function OdsPicker(element: HTMLElement, configuration: Configuration, baseModel: any): OdsPickerClass {
//     return new OdsPickerClass(element, configuration, baseModel);
// }
 
export class OdsPicker extends BaseIDEAspect<IODSPickerConfiguration, any> {
 
    constructor(element: HTMLElement, configuration: IODSPickerConfiguration, baseModel: any) {

        let defaults = {
            roleConfigModels: [],
            showPreSharedo: true,
            showPostSharedo: true,
            noOdsEntityMessage: 'No participant selected',
            noOdsEntityRequiredMessage: 'Participant required',
            narrowLabel: false,
            debug: {
                enabled: false,
                logToConsole: false,
                showInAspect: false
            }

        };
        super("OdsPicker", "aspectData.odsEntityPicker", element, configuration, baseModel,defaults )
        

    }


    /**
     * Do not create a method called initialise unless you want to handle all KO bindings yourself.
     */
    // private initialise() {
    //     // Map the roleConfigModels
        
    // }

    // override loadAndBind(): void {

    //     this.log("Loading data (model) passed in", "green");
    //     super.loadAndBind();

    // };





    // override onSave(model: any): void {
    //     super.onSave(model);
    // };
}
