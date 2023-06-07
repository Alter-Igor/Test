
export interface IODSPersonResult {
    tags: any[];
    tagNames: any[];
    locations: any[];
    aspectData: AspectData;
    canEdit: boolean;
    odsEntityType: string;
    isUser: boolean;
    id: string;
    sourceSystem?: any;
    presenceIdentity?: any;
    titleId: number;
    genderId: number;
    firstName: string;
    surname: string;
    middleNameOrInitial?: any;
    dateOfBirth?: any;
    dateOfDeath?: any;
    niNumber?: any;
    nhsNumber?: any;
    isActive: boolean;
    organisationId: string;
    primaryTeamId?: any;
    tradingName?: any;
    suffix?: any;
    jobTitle?: any;
    preferredLanguageCode: string;
    signatureImageId?: any;
    passportNo?: any;
    drivingLicenceNo?: any;
    externalReference?: any;
    profileImageId?: any;
    shortName?: any;
    shortNameIsGenerated: boolean;
    reference?: any;
    timeZone: string;
  }
  
  export interface AspectData {
    OdsEntityInformationWalls: OdsEntityInformationWalls;
    UserAvailabilityAndDelegationStatus: UserAvailabilityAndDelegationStatus;
    ContactPreferences: ContactPreferences;
    ContactDetails: ContactDetail[];
  }
  
  export interface ContactDetail {
    id: string;
    organisationId?: any;
    personId: string;
    teamId?: any;
    isPrimary: boolean;
    contactTypeSystemName: string;
    contactValue: string;
    isActive: boolean;
    externalReference?: any;
  }
  
  export interface ContactPreferences {
    odsId: string;
    primaryContactDetailId?: any;
    sendFromEmailContactId: string;
    contactHoursFrom?: any;
    contactHoursTo?: any;
  }
  
  export interface UserAvailabilityAndDelegationStatus {
    displayName: string;
    css: string;
    icon: string;
    absenceStartDate?: any;
    absenceEndDate?: any;
    hasAbsenceDates: boolean;
    autoTaskDelegationActive: boolean;
    autoTaskDelegateeOdsId?: any;
    autoTaskDelegateeOdsName?: any;
  }
  
  export interface OdsEntityInformationWalls {
    selectedWalls: any[];
  }