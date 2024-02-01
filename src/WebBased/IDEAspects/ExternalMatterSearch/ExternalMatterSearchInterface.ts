import { IRule, IFieldPlacement, IDataMapping } from "../BaseClasses/Template/Interfaces";

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
  // refreshIfSharedoIdChanged: boolean;
  dataMapping: IDataMapping[],
  fieldMapping?: IDataMapping[],
  formBuilderName: string;
  formBuilderFieldSerialisedData: string;
  fackSearchDataIDEPath: string | undefined;
  fackLoadDataIDEPath: string | undefined;  
  showSearchingStatus: boolean;
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

