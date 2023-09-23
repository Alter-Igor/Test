

/**
 * @interface IAutoCompleteFindCardOptions
 * @description Options for the AutoCompleteFindCard
 * @property {AUTOCOMPLETE_CARD_TYPE} type - The type of card to render
 * @property {any} id - The id of the card
 * @property {any} data - The data package for the match
 * @property {string} icon - The icon to display
 * @property {string} text - The text to display
 * @property {string} styles - The styles to apply to the card
 * @property {string} template - The template to use to render the card,if this isn't specified, will use the default template for the type  which is either a standard template from the auto complete (uses simple properties only), or a globally overridden template.
 * @property {string} cssClass - The css class to apply to the card
 */
export interface IAutoCompleteFindCardOptions {
    type?: AUTOCOMPLETE_CARD_TYPE,
    id?: any,
    data?: any, // data: The data package for the match
    icon?: string | null,
    text?: string,
    styles?: string | null,
    template?: any,
    cssClass?: string | null,
}

export enum AUTOCOMPLETE_MODE {
    CHOOSE = 'choose',
    SELECT = 'select'
}

export enum AUTOCOMPLETE_CARD_TYPE {
    RESULT = 'result',
    MESSAGE = 'message'
}

export enum AUTOCOMPLETE_DISPLAY_MODE {
    SEARCH = 'search',
    LOADING = 'loading',
    RESULT = 'result'
}