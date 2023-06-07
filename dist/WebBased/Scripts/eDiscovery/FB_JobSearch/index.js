var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//This function is called from the module-loader webcomponent in the form builder
//it is called when the form is loaded
//It checks the current phase is in anything except draft it makes the fomr readonly.
export function runMe(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let sharedoId = context.workItemContext.id();
        let currentPhaseName = context.workItemContext.phaseName();
        //Check the current phase, undefined mean its a new form 
        //Draft means its a saved new form that has not been submitted
        if (currentPhaseName === undefined) {
            return;
        }
        if (currentPhaseName === "Draft") {
            return;
        }
        if (!context.form) {
            return;
        }
        //if the form is already readonly then return as we dont need to do anything
        if (context.form.readonly() === true) {
            return;
        }
        //set the form to readonly
        context.form.readonly(true);
    });
}
// example of gettig data from sharedo
// let data = await $ajax.get("/api/v1/public/workItem/" + sharedoId);    
// if(data.aspectData.formBuilder.formData.altEDiscoverySearchDescription === "test") {
//         console.log("its test");
// } 
//# sourceMappingURL=index.js.map