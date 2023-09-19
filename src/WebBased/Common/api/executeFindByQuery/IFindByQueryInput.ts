

export interface IFindByQueryOptions {
  search: Search;
  enrich: Enrich[];
}

export interface Enrich {
  path: string;
}

export interface Search {
  page?: Page ;
  sort?: Sort;
  title?: string ;
  reference?: string ;
  externalReference?: string ;
  freeText?: FreeText ;
  workItemIds?: string[] ;
  phase?: Phase ;
  types?: Types ;
  ownership?: Ownership ;
  graph?: Graph ;
  roles?: Role[] ;
  advancedRoles?: AdvancedRole[] ;
  dates?: Dates ;
  attributes?: Attribute[] ;
  tags?: string[] ;
}

export interface Attribute {
  key: string;
  selectedValues: string[];
}

export interface Dates {
  due: Due;
  created: Due;
  updated: Due;
}

export interface Due {
  from: string;
  to: string;
}

export interface AdvancedRole {
  postCode: string;
}

export interface Role {
  role: string;
  subjectIdsHoldingRole: string[];
}

export interface Graph {
  includeAncestors: boolean;
  ancestorIds: string[];
  maxAncestorDistance: number;
}

export interface Ownership {
  myScope: MyScope;
}

export interface MyScope {
  ownerIds: string[];
  primary: boolean;
  secondary: boolean;
}

export interface Types {
  includeTypes: string[];
  includeTypesDerivedFrom: string[];
  searchCategoryName: string;
}

export interface Phase {
  includeOpen: boolean;
  includeClosed: boolean;
  includeRemoved: boolean;
  searchPhaseName: string;
}

export interface FreeText {
  input: string;
  wildcardStart: boolean;
  wildCardEnd: boolean;
}

export interface Sort {
  direction: string;
  orderBy: string;
}

export interface Page {
  page: number;
  rowsPerPage: number;
}