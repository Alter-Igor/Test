import { IAspectsService } from "./IAspectsService";
import * as SharedoNamespace from "./Sharedo/Sharedo.Core.Case.Sharedo";
import * as AspectNamespace from "./Aspects/Sharedo.Core.Case.Aspects";
import * as ActionsNamespace from "./SharedoActions/Sharedo.Core.Case.SharedoActions";
import * as WorkflowEditorNamespace from "./WorkflowEditor/Sharedo.Core.Case.WorkflowEditor"
import * as ParticipantsNamespace from "./Participants/Sharedo.Core.Case.Participants"

export declare namespace Case {
    export type AspectsService = IAspectsService
    export import Sharedo = SharedoNamespace.Sharedo;
    export import Aspects = AspectNamespace.Apspects;
    export import SharedoActions = ActionsNamespace.SharedoActions;
    export import WorkflowEditor = WorkflowEditorNamespace.WorkflowEditor;
    export import Participants = ParticipantsNamespace.Participants;
}


