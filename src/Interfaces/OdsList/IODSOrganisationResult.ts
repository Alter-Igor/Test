export interface IODSOrganisationResult {
  tags: string[];
  tagNames: string[];
  locations: any[];
  aspectData: AspectData;
  canEdit: boolean;
  odsEntityType: string;
  id: string;
  parentId?: any;
  sourceSystem?: any;
  name: string;
  shortName: string;
  industrySICCodeId?: any;
  isVATRegistered?: any;
  vatCountrySystemName?: any;
  vatNumber?: any;
  vatComments?: any;
  companyNumber?: any;
  previousName?: any;
  registeredName?: any;
  registeredShortName?: any;
  statusId?: any;
  isDefault: boolean;
  isActive: boolean;
  reference?: any;
  shortNameIsGenerated: boolean;
  externalReference?: any;
}

export interface AspectData {
  OdsEntityInformationWalls: OdsEntityInformationWalls;
  ContactDetails: any[];
  ContactPreferences: ContactPreferences;
}

export interface ContactPreferences {
  odsId: string;
  primaryContactDetailId?: any;
  sendFromEmailContactId?: any;
  contactHoursFrom?: any;
  contactHoursTo?: any;
}

export interface OdsEntityInformationWalls {
  selectedWalls: any[];
}