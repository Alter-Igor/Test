import * as ko from 'knockout';
import { IAspect } from './Aspect/IAspect';
import { IWidget } from './Widgets/IWidget';
//for Sharedo.Core.Case.Sharedo.Models.Sharedo
export interface TSharedo<T extends IWidget> {
    instanceId: ko.Observable<string>;
    id: ko.Observable<any>;
    parentSharedoId: ko.Observable<any>;
    title: ko.Observable<string>;
    titleIsUserProvided: ko.Observable<boolean>;
    categoryId: ko.Observable<any>;
    reference: ko.Observable<string>;
    referenceIsUserProvided: ko.Observable<boolean>;
    externalReference: ko.Observable<string>;
    description: ko.Observable<string>;
    sharedoTypeSystemName: ko.Observable<string>;
    phaseSystemName: ko.Observable<string>;
    phaseName: ko.Observable<string>;
    phaseIsOpen: ko.Observable<boolean>;
    priorityId: ko.Observable<any>;
    currencyCode: ko.Observable<string>;
    timeZone: ko.Observable<string>;
    aspectData: IAspect<T>;

    map(data: TSharedo<T>): void;
    clone(): TSharedo<T>;
}



