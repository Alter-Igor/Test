

export interface IODSearchResult<T> {
  startPage: number;
  endPage: number;
  totalPages: number;
  startRow: number;
  endRow: number;
  totalRows: number;
  rows: Row<T>[];
}

export interface Row<T> {
  odsEntityType: string;
  id: string;
  result: string;
  aspectSearchResultWidgets?: T;
}

