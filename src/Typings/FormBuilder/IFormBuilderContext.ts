import * as ko from "knockout";
import { IWorkTypeContext } from "../ShareDo/IWorkTypeContext";
import { FormBuilderField, TChildrenByPropertyId } from "./IAlpacaForm";

export interface IFormBuilderContext {
    form: FormBuilderField;
    koContext: ko.BindingContext;
    element: HTMLElement;
    fields: TChildrenByPropertyId;
    workItemContext: IWorkTypeContext    
}    


