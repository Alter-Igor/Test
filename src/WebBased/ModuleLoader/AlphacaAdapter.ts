
//this class is to be used to adapt the Alpaca API to the API used by the ModuleLoader
//this is so we can allow for deprication of the Alpaca API
//Adapter for Alpaca API

import { IAlpacaField } from "../../Typings/FormBuilder/IAlpacaForm";


export type TFormBuilderFields = { 
    [key:string]: FormBuilder | undefined
};

//this is so we can allow for deprication of the Alpaca API
export class FormBuilder {

    alpacaForm: IAlpacaField;
    fieldsById: TFormBuilderFields = {};
    fields: Array<FormBuilder> | undefined;
    parent: FormBuilder | undefined;
    
    constructor(context: any) {
        this.alpacaForm = ($(context) as any).alpaca();
        this.populateFields();
    }

   

    public readonly(value?: boolean): boolean {
        if (value != undefined) {
            this.alpacaForm.options.readonly = value;
            this.alpacaForm.refresh();
        }
        return this.alpacaForm.options.readonly;
    }

    public hidden(value?: boolean): boolean {
        if (value != undefined) {
            this.alpacaForm.options.hidden = !value;
            this.alpacaForm.refresh();
        }
        return !this.alpacaForm.options.hidden;
    }

    public getValue(): any {
        return this.alpacaForm.getValue();
    }
    
    public setValue(value: any) {
        this.alpacaForm.setValue(value);
    }

    public isValid(): boolean {
        return this.alpacaForm.isValid();
    }
    

    public on(event: string, callback: any) {
        this.alpacaForm.on(event, callback);
    }
    

    public populateFields(){
        this.fieldsById = {};
        this.fields = [];
        for(let key in this.alpacaForm.childrenByPropertyId) {
            let newItem = new FormBuilder(this.alpacaForm.childrenByPropertyId[key]);
            newItem.parent = this;
            this.fieldsById[key] = newItem;
            this.fields.push(newItem);
        }
    }








}