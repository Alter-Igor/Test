import { IAspectData } from "../Aspect/IAspect";

export interface ISharedoBladeModel {
    aspectData: IAspectData;
    sharedoTypeSystemName: any;
    id: any;
    title: ko.Observable<string>
    canExpandCollapse: ko.Observable<boolean>;
    hasTitle: ko.Observable<boolean>;
    helpText: ko.Observable<string>;
    icon: ko.Observable<string>;
    isExpanded: ko.Observable<boolean>;
    systemName: string
}


