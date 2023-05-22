import * as ko from "knockout";
import { IWorkTypeContext } from "../ShareDo/IWorkTypeContext";

export interface IFormBuilderContext {
    koContext: ko.BindingContext;
    element: HTMLElement;
    alpacaForm: any;
    workItemContext: IWorkTypeContext
    
}    

