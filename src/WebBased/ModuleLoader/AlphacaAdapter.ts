
//this class is to be used to adapt the Alpaca API to the API used by the ModuleLoader
//this is so we can allow for deprication of the Alpaca API
//Adapter for Alpaca API

import { IAlpacaField, TChildrenByPropertyId } from "../../Typings/FormBuilder/IAlpacaForm";


export type TFormBuilderFields = { 
    [key:string]: FormBuilder | undefined
};

//this is so we can allow for deprication of the Alpaca API
export class FormBuilder {

    alpacaForm: IAlpacaField;
    fieldsById: TFormBuilderFields = {};
    fields: Array<FormBuilder> =[];
    parent: FormBuilder | undefined;
    name: string ='';
    
    constructor(context: HTMLElement | IAlpacaField, parent?: FormBuilder) {
        //check to see if context is a HTMLElement or an AlpacaField
        if (context instanceof HTMLElement) {
            this.alpacaForm = ($(context) as any).alpaca();
        } else {
            this.alpacaForm = context;
        }
        this.parent = parent;
        this.name = this.alpacaForm.name;
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
            let childAlpacaForm = this.alpacaForm.childrenByPropertyId[key];
            let newItem = new FormBuilder(childAlpacaForm,this);
            newItem.parent = this;
            this.fieldsById[key] = newItem;
            this.fields.push(newItem);
        }
    }








}