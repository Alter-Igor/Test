//this class is to be used to adapt the Alpaca API to the API used by the ModuleLoader
//this is so we can allow for deprication of the Alpaca API
//Adapter for Alpaca API
//this is so we can allow for deprication of the Alpaca API
export class FormBuilder {
    constructor(context, parent) {
        this.fieldsById = {};
        this.fields = [];
        this.name = '';
        //check to see if context is a HTMLElement or an AlpacaField
        if (context instanceof HTMLElement) {
            this.alpacaForm = $(context).alpaca();
        }
        else {
            this.alpacaForm = context;
        }
        this.parent = parent;
        this.name = this.alpacaForm.name;
        this.populateFields();
    }
    readonly(value) {
        if (value != undefined) {
            this.alpacaForm.options.readonly = value;
            this.alpacaForm.refresh();
        }
        return this.alpacaForm.options.readonly;
    }
    hidden(value) {
        if (value != undefined) {
            this.alpacaForm.options.hidden = !value;
            this.alpacaForm.refresh();
        }
        return !this.alpacaForm.options.hidden;
    }
    getValue() {
        return this.alpacaForm.getValue();
    }
    setValue(value) {
        this.alpacaForm.setValue(value);
    }
    isValid() {
        return this.alpacaForm.isValid();
    }
    on(event, callback) {
        this.alpacaForm.on(event, callback);
    }
    populateFields() {
        this.fieldsById = {};
        this.fields = [];
        for (let key in this.alpacaForm.childrenByPropertyId) {
            let childAlpacaForm = this.alpacaForm.childrenByPropertyId[key];
            let newItem = new FormBuilder(childAlpacaForm, this);
            newItem.parent = this;
            this.fieldsById[key] = newItem;
            this.fields.push(newItem);
        }
    }
}
//# sourceMappingURL=AlphacaAdapter.js.map