
export interface IAutoCompleteHandler {
    enabled: boolean,
    mode: "choose" | "select",
    text: {
        placeholder: string,
        empty: string,
        emptyIcon: string,
        typing: string,
        searching: string,
        noResults: string
    },
    select: {
        allowClear: boolean,
        selectedValue: any,
        onLoad: () => void
    },
    onFind: (v:string) => Sharedo.UI.Framework.Components.AutoCompleteFindCard[],
    templates: {
        result: string
    }
}