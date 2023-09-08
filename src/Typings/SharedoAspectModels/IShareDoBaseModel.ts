export interface ISharedoBladeModel {
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


