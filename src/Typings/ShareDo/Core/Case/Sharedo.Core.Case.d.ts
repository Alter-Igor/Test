import { IAspectsService } from "./IAspectsService";
import * as SharedoNamespace from "./Sharedo/Sharedo.Core.Case.Sharedo";
import * as AspectServiceClass from "./AspectServiceClass";
import * as ActionsNamespace from "./SharedoActions/Sharedo.Core.Case.SharedoActions";
import * as WorkflowEditorNamespace from "./WorkflowEditor/Sharedo.Core.Case.WorkflowEditor"

export namespace Case {
    export type AspectsService = IAspectsService
    export import Sharedo = SharedoNamespace.Sharedo;
    export import Aspects = AspectServiceClass.AspectService;
    export import SharedoActions = ActionsNamespace.SharedoActions;
    export import WorkflowEditor = WorkflowEditorNamespace.WorkflowEditor;
}


