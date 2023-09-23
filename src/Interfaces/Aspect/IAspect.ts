import { IWidget } from "../Widgets/IWidget";
import { IFormBuilder } from "./IFormBuilder";

export interface IAspect<T extends IWidget> {
    aspectDefinitionId: string;
    model: IModel
    widget: T
}

export interface IAspectData{
    model: IModel
    formBuilder?: IFormBuilder | undefined
}

export interface IModel {
    instanceId: string | undefined,
    id: () => string | undefined,
    parentSharedoId: () => string | undefined,
    title: () => string | undefined,
    titleIsUserProvided: () => string | undefined
}