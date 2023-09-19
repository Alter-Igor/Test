import { IAutoCompleteFindCardOptions } from "./IAutoCompleteFindCardOptions";
import { IAutoCompleteOptions } from "./IAutoCompleteOptions";

 export interface  AutoCompleteHandler  
 { }

 export interface AutoCompleteHandlerConstructor {
    new (options: IAutoCompleteOptions) :AutoCompleteHandler
}


export interface AutoCompleteFindCard {
}
export interface AutoCompleteFindCardConstructor {
    new (options: IAutoCompleteFindCardOptions) :AutoCompleteFindCard
}

export interface AutoCompleteDisplayCard {
}
export interface AutoCompleteDisplayCardConstructor {
    new (options: IAutoCompleteFindCardOptions) :AutoCompleteDisplayCard
}

// export class AutoCompleteFindCard { constructor(options: IAutoCompleteFindCardOptions) }
// export class AutoCompleteDisplayCard {constructor(options:IAutoCompleteFindCardOptions) }

