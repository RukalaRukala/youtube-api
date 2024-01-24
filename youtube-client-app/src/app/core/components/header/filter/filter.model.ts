export enum Criteria {
  DATE = 'date',
  COUNT = 'count',
}

export interface IFilter {
  date: FilterDirection;
  count: FilterDirection;
  key: string;
}

export interface ISearchOptions extends IFilter {
  lastFilter: Criteria | null;
  searchQuery: string;
}

export enum FilterDirection {
  ADS,
  DESC,
  NULL,
}
