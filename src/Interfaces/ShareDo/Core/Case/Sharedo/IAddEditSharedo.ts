
import * as ko from 'knockout';
import { Sharedo } from '../../../Sharedo';

export interface IAddEditSharedo {
    approvingStatusContainerId: string;
    approvingStatusWidget: any; // Replace with the actual type if known
    aspectDefinitions: ko.Observable;
    aspectService: Sharedo.Core.Case.Aspects.AspectsService;
    aspects: ko.Observable;
    displayTitle: ko.Observable;
    element: any;  // Replace with the actual type if known, for example: HTMLElement or similar
    enabled: ko.Observable;
    eventSubscriptions: number[];
    fixValidationBeforeInitialSave: ko.Observable;
    footerCount: ko.Observable;
    footerHeightEst: ko.Observable;
    insufficientPermissionsBladeMessage: ko.Observable;
    isInClosedPhase: ko.Observable;
    isMaximised: ko.Observable;
    isValid: ko.Observable;
    model: Sharedo.Core.Case.Sharedo.Models.Sharedo;
    needCreatePermission: ko.Observable;
    needInitialSave: ko.Observable;
    needUpdatePermission: ko.Observable;
    options: {
        id: any; // It seems like this could be null or a string or some other type.
        typeSystemName: string;
        categoryId: any; // Again, it could be null or a string
        parentSharedoId: string;
        title: string;
        // ... Other options properties
    };
    sharedoTypeIcon: ko.Observable;
    sharedoTypeName: ko.Observable;
    stackModel: {
        _isStackModel: boolean;
        id: string;
        innerWidth: number;
        outerWidth: number;
        element: any;  // Replace with the actual type if known
        // ... Other stackModel properties
    };
    stripingContext: any;
    title: ko.Observable;
    validationErrorCount: ko.Observable;
}
