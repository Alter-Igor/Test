import { IAspectsServiceOptions } from "./Types/IAspectsServiceOptions";
import * as WidgersNamespace from "./Widgets/Sharedo.Core.Case.Aspects.Widgets";

export declare namespace Apspects
{
    export import Widgets = WidgersNamespace.Widgets;
    export class AspectsService {
        [x: string]: any;
        constructor(configuration:IAspectsServiceOptions)
    }
}
