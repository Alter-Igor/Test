
import { IAddEditSharedo } from "./src/Interfaces/Aspect/IAddEditSharedo";
import { IAspectsServiceOptions } from "./src/Interfaces/Aspect/IAspectsServiceOptions";
import { IAddParticipantServiceArgs } from "./src/Interfaces/Participants/IAddParticipantService";
import { TSharedo } from "./src/Interfaces/TSharedo";
import { IAutoCompleteOptions } from "./src/Interfaces/components/IAutoCompleteOptions";
import { IAutoCompleteFindCardOptions } from "./src/Interfaces/components/IAutoCompleteFindCardOptions";


declare module 'ctx' {
	interface Ctx {
		[x: string]: any;
	}
	export = Ctx;
}

declare global {

	declare var ctx: Ctx;
	declare var Validator: any;
	declare var actions: any;
	declare var sharedo: any;
	
	declare var log: any;
	declare var $model: any;
	declare var $ajaxMutex: any;
	declare var trigger : any;

	declare var Guid: any;
	declare var DateTime: any;
	declare var $ajax: any;

	declare const $ui: any;
	declare const _: typeof import("lodash");

	interface Window {
		declare Custom: any;
	}
	

	// interface Window {
	// 	Custom: any
	// }


	declare module UI.Striping {
		export interface Model {
			callbacks: any[];  // Specify the actual type if known
			properties: any;  // and so on for the other properties
			propertyLastValues: any;
			propertyKoSubscriptions: any;
			nextCallbackId: number;
			// ... Add other properties
		}
	}

	// Sharedo.Core.Case.SharedoActions.changePhase(config, (result: any)

	declare namespace Sharedo {
		namespace Core {
			namespace Case {
				namespace SharedoActions {
					export function changePhase(config: any, callback: any)
				}
				
				namespace WorkflowEditor {
					export class WFAssignments {
						constructor(self: any, optionsAssignments: any)
					}
					export class WFPhaseOutlets {
						constructor(self: any, optionsPhaseOutlets: any)
					}
				}
				namespace Sharedo {
					namespace Models {
						export type Sharedo = TSharedo
					}
					export type AddEditSharedo = IAddEditSharedo
				}
				namespace Aspects {
					export class AspectsService {
						[x: string]: any;
						constructor(configuration: IAspectsServiceOptions)
					}
					namespace Widgets {
						export class OdsEntityPicker {
							constructor(options: any)
						}
					}
				}
				namespace Participants {
					export class AddParticipantService {
						constructor(args: IAddParticipantServiceArgs)
					}
				}
			}
		}
		namespace UI {
			namespace Framework {
				namespace Components {
					export class AutoCompleteHandler { constructor(options: IAutoCompleteOptions) }
					export class AutoCompleteFindCard { constructor(options: IAutoCompleteFindCardOptions) }
					export class AutoCompleteDisplayCard {constructor(options:IAutoCompleteFindCardOptions) }
				}
			}
		}
	}

}