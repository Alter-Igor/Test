import * as ko from "knockout";
import { IWorkTypeContext } from "../ShareDo/IWorkTypeContext";
import { TShareDoBlade } from "../ShareDoJS/AddEditSharedo";
import { FormBuilder } from "../../ModuleLoader/AlphacaAdapter";
export interface IFormBuilderContext {
    getAspect(aspecSystemName: string): IAspect;
    form: FormBuilder | undefined;
    blade: TShareDoBlade;
    koContext: ko.BindingContext;
    element: HTMLElement;
    workItemContext: IWorkTypeContext;
}
export interface IAspect {
    aspectDefinitionId: string;
    model: {
        instanceId: string;
        id: () => string;
        parentSharedoId: () => string;
        title: () => string;
        titleIsUserProvided: () => string;
    };
    widget: {
        options: {};
        enabled: () => boolean;
        description: () => string;
        reference: () => string;
        widgetExpanded(): boolean;
        validationErrorCount?: () => number;
        displayStyle: string;
        bladeOpen: boolean;
        base: {
            systemName: string;
            id: string;
            title: () => string;
            isExpanded: () => boolean;
            hasTitle: () => boolean;
            canContextCollapse: () => boolean;
            icon: () => string;
        };
        [key: string]: any;
    };
}
