import { IAspect } from "../Aspect/IAspect";
import { ISharedoBladeModel } from "./IShareDoBaseModel";


export type TShareDoBlade  = 
{
    model: ISharedoBladeModel;   
    element : HTMLElement
    isMaximised : () => boolean
    options : {
        id: null,
        typeSystemName: null,
        categoryId: null, // Used to define a default categoryId for the createSharedoType command
        parentSharedoId: null, // Used to create this sharedo as a child of another
        title: "",
        description: "",
        sharedoTypeName: "Sharedo type name",
        sharedoTypeIcon?: "fa-edit",
        aspectData: {},
        // Used to create this sharedo with existing relationships, takes objects of type: { fromSharedoId: null, toSharedoId: null, relationshipTypeSystemName: '' }
        relatedSharedos: [],
        [key : string]: any
    }

    sharedoTypeIcon : ko.Observable
    sharedoTypeName : ko.Observable
    title : ko.Observable | undefined

    displayTitle :ko.Observable
    aspects : ko.ObservableArray<IAspect<any>>
    aspectDefinitions : ko.Observable
    validationErrorCount : ko.Observable
    isValid :ko.Observable
    eventSubscriptions : []

};

