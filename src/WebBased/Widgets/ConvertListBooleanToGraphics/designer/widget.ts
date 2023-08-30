import * as ko from "knockout";


export function ConvertListBooleanToGraphicsDesigner(element: HTMLElement, configuration: any, baseModel: any): ConvertListBooleanToGraphicsDesignerClass {
    return new ConvertListBooleanToGraphicsDesignerClass(element, configuration, baseModel);
} 

export interface Configuration {
    blade?: any;
    __scope?: {
        mode?: any;
        sharedoTypeSystemName?: any;
    };
}

export interface thisModel extends Configuration
{
    todoMessage: ko.Observable<string> ,
}

export class ConvertListBooleanToGraphicsDesignerClass {
    model: thisModel;
    validation: any;
    validationErrorCount: ko.Computed<number>;

    constructor(element: HTMLElement, configuration: Configuration, baseModel: any) {
        
        const defaults = {
            todoMessage: "",
        };

        const options = $.extend(true, {}, defaults, configuration);

        this.model = {
            todoMessage: ko.observable(options.todoMessage),
        };

        this.validation = {
            todoMessage: ko.pureComputed(() => {

                const message = this.model?.todoMessage();
                if (!message) return "The message is required";
                return null;
            }),
        };

        this.validationErrorCount = ko.pureComputed(() => {
            let fails = 0;
            if (this.validation.todoMessage()) fails++;
            return fails;
        });
    }

    onDestroy(): void {
        // ...
    }

    loadAndBind(): void {
        // ...
    }

    getModel(): { todoMessage: string | undefined } {
        const self = this;
        return {
            todoMessage: self.model.todoMessage()
        };
    }
}

