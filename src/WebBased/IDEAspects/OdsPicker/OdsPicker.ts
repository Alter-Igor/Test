


console.log("=========================== ODSPICKER ===========================");

export class OdsPicker {
    defaults: { roleConfigModels: never[]; showPreSharedo: boolean; showPostSharedo: boolean; noOdsEntityMessage: string; noOdsEntityRequiredMessage: string; narrowLabel: boolean; debug: { enabled: boolean; logToConsole: boolean; showInAspect: boolean; }; };
 

    constructor(element: HTMLElement, configuration: any, baseModel: any) {

        this.defaults = {
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
        // super("OdsPicker", "aspectData.odsEntityPicker", element, configuration, baseModel,defaults )
        

    }


    /**
     * Do not create a method called initialise unless you want to handle all KO bindings yourself.
     */
    // private initialise() {
    //     // Map the roleConfigModels
        
    // }

     loadAndBind(): void {

        console.log("OdsPicker loadAndBind");

    };





    // override onSave(model: any): void {
    //     super.onSave(model);
    // };
}
