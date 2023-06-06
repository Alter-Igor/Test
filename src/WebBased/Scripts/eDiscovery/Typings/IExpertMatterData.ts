export interface IExpertMatter{
  data : IExpertMatterData;
}

export interface IExpertMatterData {
  created: string;
  closedDate?: string;
  matterCode: string;
  shortName: string;
  secure: boolean;
  status: string;
  client: IExpertMatterClient;
  practiceGroup: string;
  department: string;
  practiceArea: IExpertMatterClient;
  profitCentre: string;
  location: Location;
  currency: IExpertMatterClient;
  categories: string[];
  type: string;
  timeClass: string;
  timeType: string;
  feeRateSet: string;
  meta: IExpertMatterMeta;
  partner: IExpertMatterPartner;
  timeKeepers: IExpertMatterPartner[];
}

export interface IExpertMatterPartner {
  code: string;
  name: string;
  email: string;
}

export interface IExpertMatterMeta {
  sourceDatabase: string;
  eBillingEnabled: boolean;
}

export interface IExpertMatterLocation {
  office: string;
  country: string;
  region: string;
}

export interface IExpertMatterClient {
  code: string;
  name: string;
}