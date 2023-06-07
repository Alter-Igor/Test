

export interface IODSearchResult {
  startPage: number;
  endPage: number;
  totalPages: number;
  startRow: number;
  endRow: number;
  totalRows: number;
  rows: Row[];
}

export interface Row {
  odsEntityType: string;
  id: string;
  result: string;
  aspectSearchResultWidgets?: any;
}

