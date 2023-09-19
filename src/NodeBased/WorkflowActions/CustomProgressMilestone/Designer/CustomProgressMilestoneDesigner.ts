// Assuming there are relevant type definitions for the used properties and methods.
// For the purpose of this conversion, I'm making some assumptions about the types, which might need further refinement.

export function CustomProgressMilestoneDesigner(element: HTMLElement, configuration: any, baseModel: any): CustomProgressMilestoneDesignerClass {
    return new CustomProgressMilestoneDesignerClass(element, configuration, baseModel);
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
        
        export class CustomProgressMilestoneDesignerClass {
            action: any;
            model: any;
            expectedTypePicker: ExpectedTypePicker ;
            phasesLoading: ko.Observable<boolean> ;
            phases: ko.ObservableArray<any[]> ;
            reasonsLoading: ko.Observable<boolean> ;
            reasons: ko.ObservableArray<any[]> ;
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

                this.expectedTypePicker = {
                    multiSelect: false,
                    selectMode: "systemName",
                    selectedItem: this.action.config.expectedTypeSystemName
                };

                this.phasesLoading = ko.observable(true);
                this.phasesFeaturesLoading = ko.observable(true);
                this.phases = ko.observableArray();
                this.phaseFeatures = ko.observableArray();

                this.reasonsLoading = ko.observable(true);
                this.reasons = ko.observableArray();
                this.loadAvailablePhasesFeatures();

                if(this.action.config)
                {
                this.disposables = [
                    this.action.config.expectedTypeSystemName?.subscribe(() => {
                        this.loadAvailablePhases();
                        this.loadReasons();
                        
                    })
                ];
            }
            }

            onDestroy(): void {
                this.loadAvailablePhases();
            }

            loadAndBind(): void {
                this.loadAvailablePhases();
                this.loadReasons();
                this.loadAvailablePhasesFeatures();
            }

            loadAvailablePhases(): void {
                this.phasesLoading(true);

                const setPhases = (validPhases: any[]): void => { // Define specific type if known.
                    this.phases(validPhases);
                    this.phasesLoading(false);
                };

                const type = this.action.config.expectedTypeSystemName();
                if (!type) {
                    setPhases([]);
                } else {
                    $ajaxMutex.getOnce(`/api/modeller/sharedoTypes/${type}/phasePlan`).then((res:any) => {
                        setPhases(res.phases);
                    });
                }
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
           

            loadReasons(): void {
                this.reasonsLoading(true);

                const type = this.action.config.expectedTypeSystemName();
                if (!type) {
                    this.reasons([]);
                    this.reasonsLoading(false);
                    return;
                }

                $ajaxMutex.getOnce(`/api/jumpToPhase/reasons/for/${type}`).then((reasons: any) => {
                    this.reasons(reasons);
                    this.reasonsLoading(false);
                });
            }
            
        }


  