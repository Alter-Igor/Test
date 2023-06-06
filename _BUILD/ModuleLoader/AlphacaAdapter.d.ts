import { IAlpacaField } from "../Typings/FormBuilder/IAlpacaForm";
export type TFormBuilderFields = {
    [key: string]: FormBuilder | undefined;
};
export declare class FormBuilder {
    alpacaForm: IAlpacaField;
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
    populateFields(): void;
}
