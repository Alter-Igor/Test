

export interface IDataMapping {
  formBuilderField: string;
  searchResultField: string;
}


export interface IFieldPlacement {
  cssClass?: ICssClassEntry;
  style?: IStyleEntry;
  icon?: IIconEntry;
  rows: IFieldRow[] | null;
  container?: IFieldContainer | null;
}

export interface IFieldContainer {
  cssClass?: ICssClassEntry;
  style?: IStyleEntry;
  alignItems?: "space-between" | "space-around" | "flex-start" | "flex-end" | "center"| null;
}

export interface IFieldRow {
  cssClass?: ICssClassEntry;
  style?: IStyleEntry;
  alignItems?: "space-between" | "space-around" | "flex-start" | "flex-end" | "center"| null;
  fields: IFieldRowField[]| null;
}

export interface IFieldRowField {
  field: IFieldRule[] | string | null;
  valueOnNull?: string | null;
  valueOnEmpty?: string | null;
  formatter?: string | null;
  label?: string | null;
  position?: "left" | "right" | "center" | null;
  width?: number | null;
  icon?: IIconEntry;
  cssClass?: ICssClassEntry;
  style?: IStyleEntry;
}

export interface IFieldRule {
  rule: string;
  field: string;
}

export interface IIconRule {
  rule?: string| null;
  icon: string;
  cssClass?: string| null;
  style?: INameValue | string| null;
  position?: "before" | "after" | null;
}



export type ICssClassEntry = string | ICSSRule[] | null | undefined;
export type IStyleEntry =IStyleRule[] |string| INameValue | null | undefined;
export type IIconEntry = IIconRule[] | string | null | undefined;

export interface INameValue {
  [key: string]: string;
}


export interface IRule {
  rule?: string| null;
}


export interface ICSSRule {
    rule?: string| null;
    cssClass?: string| null;
  }
  
  export interface IStyleRule {
    rule?: string| null;
    style?: INameValue | string| null;
  }