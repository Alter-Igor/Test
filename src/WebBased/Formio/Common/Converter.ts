import { IFormIOSubmitData } from "./IFormIOData";

type IFormBuilderField = {
    id: string;
    type: number;
    name: string;
    title: string | null;
    description: string | null;
    readonly: boolean;
    required: boolean;
    layoutLocation: string;
    displayOrder: number;
    attributes: any;
};

type FormIOComponent = {
    key: string;
    label: string;
    type: string;
    // ... other properties
};





                
// }


export function convertFormIOData_To_FormBuilderData(form:IFormIOSubmitData, aspectData: any)
{
    
    if(aspectData === undefined)
    {
        aspectData = {};
    }

    aspectData.FormBuilder = aspectData.FormBuilder || {};
    aspectData.FormBuilder.formData = aspectData.FormBuilder.formData || {};


    aspectData.FormBuilder.formData = form.data;
    aspectData.FormBuilder.formData.metadata = form.metadata;

    return aspectData;
}


function convertToFormIO(data: any): any {
    return {
        display: "form",
        type: "form",
        components: data.fields.map((field: IFormBuilderField): FormIOComponent => {
            let component: FormIOComponent = {
                key: field.name,
                label: field.title || '',
                type: '',  // You'll have to determine how to map your 'type' to a FormIO type
                // ... any other relevant conversions
            };
            return component;
        }),
    };
}

function convertFromFormIO(formIOData: any): any {
    return {
        id: '',  // You might need to provide some logic here
        systemName: '',
        title: '',
        description: null,
        layout: '',
        layoutParent: '',
        showTitle: false,
        readonly: false,
        fields: formIOData.components.map((component: FormIOComponent): IFormBuilderField => {
            let field: IFormBuilderField = {
                id: '',  // You might need to provide some logic here
                type: 0,  // Again, how to map back?
                name: component.key,
                title: component.label,
                description: null,
                readonly: false, // Fill appropriately
                required: false, // Fill appropriately
                layoutLocation: '', // Provide logic
                displayOrder: 0, // Provide logic
                attributes: {}, // Map from FormIO properties
            };
            return field;
        }),
        sections: [],
        smartVariableSystemName: null
    };
}

