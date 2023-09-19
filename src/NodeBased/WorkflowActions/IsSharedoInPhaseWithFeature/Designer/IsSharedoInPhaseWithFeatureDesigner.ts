// Assuming there are relevant type definitions for the used properties and methods.
// For the purpose of this conversion, I'm making some assumptions about the types, which might need further refinement.

export function IsSharedoInPhaseWithFeatureDesigner(element: HTMLElement, configuration: any, baseModel: any): IsSharedoInPhaseWithFeatureDesignerClass {
    return new IsSharedoInPhaseWithFeatureDesignerClass(element, configuration, baseModel);
}


interface Configuration {
    node?: any; // Define a specific type if known.
    model?: any; // Define a specific type if known.
}

interface ExpectedTypePicker {
    multiSelect: boolean;
    selectMode: string;
    selectedItem: ko.Observable<string | null>;
}

export class IsSharedoInPhaseWithFeatureDesignerClass {
    action: any;
    model: any;
    disposables: any[] = []; // Define specific type if known.
    phaseFeatures: ko.ObservableArray<any[]> ;
    phasesFeaturesLoading:  ko.Observable<boolean> ;;


    constructor(element: HTMLElement, configuration: Configuration, baseModel: any) {
        const defaults = {
            node: null,
            model: null
        };

        const options = $.extend(true, {}, defaults, configuration);

        this.action = options.node;
        this.model = options.model;

        this.phasesFeaturesLoading = ko.observable(true);
        this.phaseFeatures = ko.observableArray();

        this.loadAvailablePhasesFeatures();

        if(this.action.config)
                {
                this.disposables = [
                    this.action.config.expectedTypeSystemName?.subscribe(() => {
                    })
                ];
            }
        // if (this.action.config) {
        //     this.disposables = [
        //         this.action.config.expectedTypeSystemName?.subscribe(() => {
        //             this.loadAvailablePhases();
        //             this.loadReasons();

        //         })
        //     ];
        // }
    }

    onDestroy(): void {
       
    }

    loadAndBind(): void {

        this.loadAvailablePhasesFeatures();
    }


    loadAvailablePhasesFeatures(): void {
        this.phasesFeaturesLoading(true);

        $ajaxMutex.getOnce(`/api/featureframework/flags/subFeatures`).then((res:any) => {
            console.log("subFeatures");
            console.log(res);
            this.phasesFeaturesLoading(false);
            this.phaseFeatures(res);
        });
    }


}


