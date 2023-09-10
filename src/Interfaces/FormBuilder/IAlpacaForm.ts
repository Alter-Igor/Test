


export type TChildrenByPropertyId = { 
    [key:string]: IAlpacaField
};

export interface IAlpacaField {
    _events: { change?: () => void; };
    name: string ;
    parent: IAlpacaField;
    childrenByPropertyId: TChildrenByPropertyId ;
    isValid: () => boolean;
    children: any[];
    refresh: () => void;
    getValue: () => any;
    setValue: (value: any) => void;
    schema: any;
    options: IOptions;
    on: (event: string, callback: (this: any, ev: any) => void) => void;
}


export interface IOptions {
  hidden: boolean;
  placeholder: string;
  showMessages: boolean;
  data: any;
  dependencies: any;
  dependencyExpression: string;
  focus: boolean;
  fieldClass: string;
  type: string;
  label: string;
  readonly: boolean;
  validate: boolean;
  disabled: boolean;
  attributes: any;
  allowOptionalEmpty: boolean;
  hideIfNoData: boolean | undefined;
  multiple: boolean | undefined;
  noneLabel: string | undefined;


}
