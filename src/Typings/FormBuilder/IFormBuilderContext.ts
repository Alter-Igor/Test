import * as ko from "knockout";
import {  IWorkTypeContext } from "../ShareDo/IWorkTypeContext";
import { TShareDoBlade } from "../SharedoAspectModels/TShareDoBlade";
import { FormBuilder } from "../../WebBased/ModuleLoader/AlphacaAdapter";
import { IAspect } from "../Aspect/IAspect";


export interface IFormBuilderContext {
    getAspect(aspecSystemName: string): IAspect<any>;   
    form :FormBuilder | undefined;
    blade:TShareDoBlade | undefined;
    koContext: ko.BindingContext;
    element: HTMLElement;
    workItemContext: IWorkTypeContext    
}    



