import { IAutoCompleteFindCard } from "../../../../components/auto-complete";
import { AutoCompleteOptions } from "./Types/AutoCompleteHandler";

export declare namespace Components {
    export class AutoCompleteHandler {
        constructor(options: AutoCompleteOptions)
    }
    export class AutoCompleteFindCard {
        constructor(options: IAutoCompleteFindCard)
    }
    export class AutoCompleteDisplayCard {
        constructor(options: {
            id?: any,
            type?: any,
            icon?: string,
            data?:any,
            text?: string
        })
    }

}
