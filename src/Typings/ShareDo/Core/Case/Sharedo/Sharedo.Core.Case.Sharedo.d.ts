import { IAddEditSharedo } from "./IAddEditSharedo";
import * as ModelsNamespace from "./Models/Sharedo.Core.Case.Sharedo.Models";

/**
 *  * @namespace Sharedo for the Sharedo main window object 
 */
export namespace Sharedo {
    export import Models = ModelsNamespace.Models;
    export type AddEditSharedo = IAddEditSharedo
}

