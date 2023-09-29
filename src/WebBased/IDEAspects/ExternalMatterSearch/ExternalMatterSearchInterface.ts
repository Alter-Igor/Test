export interface IExternalMatterSearchConfiguration {
  fackMode: boolean;
  title: string |  undefined;
  inputVisability: boolean | IRule | IRule[];
  // searchApiUrl: string; ///"api/externalMatterProvider/query/{0}"
  // searchApiResultCollectionPath: string; //"data"
  loadApiResultDataPath: string; //"data"
  loadApiUrl: string; //"api/externalMatterProvider/details/{data.code}" 
  selectedFieldDisplayValue:string
  searchFields: IFieldPlacement; // "code,description"
  selectedFields: IFieldPlacement; // "code,description"
  dataMapping: IDataMapping[],
  formBuilderFieldSerialisedData: string;
  fackSearchDataIDEPath: string | undefined;
  fackLoadDataIDEPath: string | undefined;  

  searchApiExecutionSettings?: Array<TAPIExecutionSettings>;
  loadApiExecutionSettings?: Array<TAPIExecutionSettings>;

}

export type TAPIExecutionSettings = {
  method:"GET"|"POST"|"PUT"|"DELETE",
  url:string,
  data?:any,
  resultDataPath?:string,
  resultDatapPrefixName?:string
  name?:string
}


export type IStyleEntry =IStyleRule[] |string| INameValue | null

export interface IDataMapping {
  formBuilderField: string;
  searchResultField: string;
}


export interface IFieldPlacement {
  cssClass?: ICSSRule[] | string | null;
  style?: IStyleEntry;
  icon?: IIconRule[] | string | null;
  rows: IFieldRow[] | null;
  container?: IFieldContainer | null;
}

export interface IFieldContainer {
  cssClass?: ICSSRule[] | string | null;
  style?: IStyleEntry;
  alignItems?: "space-between" | "space-around" | "flex-start" | "flex-end" | "center"| null;
}

export interface IFieldRow {
  cssClass?: ICSSRule[] | string | null;
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
  icon?: IIconRule[] | string | null;
  cssClass?: ICSSRule[] | string | null;
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

export interface ICSSRule {
  rule?: string| null;
  cssClass?: string| null;
}

export interface IStyleRule {
  rule?: string| null;
  style?: INameValue | string| null;
}

export interface INameValue {
  [key: string]: string;
}


export interface IRule {
  rule?: string| null;
}