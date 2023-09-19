
export interface IAutoCompleteOptions {
    enabled: boolean;
    mode: string;
    text: {
        placeholder: string;
        empty: string;
        emptyIcon: string;
        typing: string;
        searching: string;
        noResults: string;
    };
    templates: {
        result: string;
        message?: string;
    };
    select: {
        allowClear: boolean;
        selectedValue: any; // Replace 'any' with the appropriate type if known
        onLoad: (v?: any) => void; // You might want to refine this function type further
    };
    onFind: (v?: any) => void; // You might want to refine this function type further
}