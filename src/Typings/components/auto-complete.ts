

export interface IAutoCompleteFindCard {
    type: "message" | "result",
    id: string,
    icon: string,
    text: string
}

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
    onFind: (v:string) => IAutoCompleteFindCard[],
    templates: {
        result: string
    }
}


