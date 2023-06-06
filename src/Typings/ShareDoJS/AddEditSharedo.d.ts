export type TShareDoBlade = {
    element: HTMLElement;
    isMaximised: () => boolean;
    options: {
        id: null;
        typeSystemName: null;
        categoryId: null;
        parentSharedoId: null;
        title: "";
        description: "";
        sharedoTypeName: "Sharedo type name";
        sharedoTypeIcon?: "fa-edit";
        aspectData: {};
        relatedSharedos: [];
        [key: string]: any;
    };
    sharedoTypeIcon: ko.Observable;
    sharedoTypeName: ko.Observable;
    title: ko.Observable;
    displayTitle: ko.Observable;
    aspects: ko.ObservableArray;
    aspectDefinitions: ko.Observable;
    validationErrorCount: ko.Observable;
    isValid: ko.Observable;
    eventSubscriptions: [];
};
