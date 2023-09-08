
declare var Validator: any;
declare var actions: any;
declare var sharedo: any;
declare var ctx: any;
declare var log: any;
declare var $model: any;
declare var $ajaxMutex: any;
declare var _: any;
declare var Guid: any;
declare var DateTime: any;
declare var $ajax: any;
declare var $ui = any;


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

interface Window {
	Custom: any;
}



// export declare module "Sharedo.UI.Framework.Components" {
// 	export type AutoCompleteHandler = any
// }

// declare module "Sharedo.Core.Case.Sharedo" {
// 	export type AddEditSharedo = IAddEditSharedo
// 	namespace Models {
// 		export type Sharedo = SharedoCoreCaseSharedoModelsSharedo
// 	}
// }

// declare module "Sharedo.Core.Case.Aspects" {
// 	export type AspectsService = IAspectsService
// }



// export namespace  Sharedo{
// 	export namespace UI {
// 		export namespace Framework {
// 			export namespace Components {
// 				export type AutoCompleteHandler = any
// 			}
// 		}
// 	}
// 	namespace Core  {
// 		namespace Case {
// 			namespace Sharedo {
// 				export type AddEditSharedo = IAddEditSharedo
// 				namespace Models {
// 					export type Sharedo = SharedoCoreCaseSharedoModelsSharedo
// 				}
// 			}
// 			namespace Aspects {
// 				export type AspectsService = IAspectsService
// 			}

// 		}
// 	}

// }



// declare namespace Sharedo {
//     // namespace Core {
//     //     namespace Case {
//     //         namespace Aspects {
//     //             namespace Widgets {
//     //                 class CommentNav {
//     //                     constructor(); // Assuming no parameters for the constructor
//     //                     // Other methods and properties for CommentNav can be added here.
//     //                 }
//     //             }
//     //         }
//     //     }
//     // }

//     namespace UI {
//         namespace Framework {
//             namespace Components {

//                 type TextOptions = {
//                     placeholder: string;
//                     empty: string;
//                     emptyIcon: string;
//                     typing: string;
//                     searching: string;
//                     noResults: string;
//                 };

//                 type TemplateOptions = {
//                     result: string;
//                     message?: string;
//                 };

//                 type SelectOptions = {
//                     allowClear: boolean;
//                     selectedValue: any; // Should be replaced with the correct type
//                     onLoad: () => void;
//                 };

             

//                 class AutoCompleteHandler {
//                     constructor(options: AutoCompleteHandlerOptions);
//                     // Other methods and properties for AutoCompleteHandler can be added here.
//                 }

//             }
//         }
//     }
// }

// Usage:



// let autoComplete = new Sharedo.UI.Framework.Components.AutoCompleteHandler(
// 	{
// 		enabled: true,
// 		mode: "select",
// 		text:
// 		{
// 			placeholder: "Search for matter",
// 			empty: "Start typing to lookup a matter by number",
// 			emptyIcon: "fa-search",
// 			typing: "Will search when you stop typing",
// 			searching: "One moment...",
// 			noResults: "Nothing found"
// 		},
// 		templates:
// 		{
// 			result: "_components_play_template",
// 			message: undefined
// 		},
// 		select:
// 		{
// 			allowClear: true,
// 			selectedValue: this.selectedAutoCompleteValue,
// 			onLoad: this.autoCompleteLoad.bind(this)
// 		},

// 		onFind: this.autoCompleteFinder.bind(this)

// 	}
// );

// declare module Sharedo.Core.Case.Sharedo.Models {

// 	export type Sharedo = SharedoCoreCaseSharedoModelsSharedo
// }

// // You'll also need an interface for 'Sharedo.Core.Case.Sharedo.AddEditSharedo'. 
// // I've made a stub here, but you'd have to fill in the actual details.
// declare module Sharedo.Core.Case.Sharedo {
// 	export type AddEditSharedo = IAddEditSharedo;
// }

// declare module Sharedo.Core.Case.Aspects {
//     export interface AspectsService {
//         options: any;  // Specify the actual type if known
//         stripingSub: number;
//         // ... Add other properties
//     }
// }