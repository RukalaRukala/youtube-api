import { createReducer, on } from '@ngrx/store';
import { setSearchQuery } from './search.actions';
import {
  Criteria,
  FilterDirection,
  ISearchOptions,
} from '../../components/header/filter/filter.model';
import { filterSuccess, setFilterByWord } from '../filter/filter.actions';

export interface ISearchState {
  searchOptions: ISearchOptions;
}

export interface IDateCountState {
  direct: FilterDirection;
  lastFilter: Criteria | null;
}

const initialState: ISearchState = {
  searchOptions: {
    searchQuery: '',
    date: FilterDirection.NULL,
    count: FilterDirection.NULL,
    key: '',
    lastFilter: null,
  },
};

export const searchReducer = createReducer(
  initialState,
  on(
    setSearchQuery,
    (state, { searchQuery }): ISearchState => ({
      searchOptions: { ...state.searchOptions, searchQuery: searchQuery },
    })
  ),
  on(
    filterSuccess,
    (state, { payload }): ISearchState => ({
      searchOptions: {
        ...state.searchOptions,
        [payload.lastFilter as string]: payload.direct,
        lastFilter: payload.lastFilter,
      },
    })
  ),
  on(
    setFilterByWord,
    (state, { payload }): ISearchState => ({
      searchOptions: { ...state.searchOptions, key: payload },
    })
  )
);
