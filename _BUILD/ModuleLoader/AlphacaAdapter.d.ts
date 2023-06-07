//Alpaca FormBuilder Adapter
//This is a adapter to allow for the Alpaca API to be deprecated
//User of this adapter should be able to use the FormBuilder API
//without having to worry about the Alpaca API

export type TFormBuilderFields = {
    [key: string]: FormBuilder | undefined;
};

export declare class FormBuilder {  
    fieldsById: TFormBuilderFields;
    fields: Array<FormBuilder> | undefined;
    parent: FormBuilder | undefined;
    constructor(context: any);
    readonly(value?: boolean): boolean;
    hidden(value?: boolean): boolean;
    getValue(): any;
    setValue(value: any): void;
    isValid(): boolean;
    on(event: string, callback: any): void;
}
