
export interface IFormIOSubmitData {
  data: Object;
  metadata: IIFormMetadata;
  state: string;
  _vnote: string;
}

export interface IIFormMetadata {
  selectData: any;
  timezone: string;
  offset: number;
  origin: string;
  referrer: string;
  browserName: string;
  userAgent: string;
  pathName: string;
  onLine: boolean;
}
