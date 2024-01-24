import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISearchState } from './search.reducer';

const selectSearchState = createFeatureSelector<ISearchState>('searchOptions');

export const selectSearchOptions = createSelector(
  selectSearchState,
  state => state.searchOptions
);

export const selectSearchQuery = createSelector(
  selectSearchOptions,
  state => state.searchQuery
);

export const selectKey = createSelector(
  selectSearchOptions,
  state => state.key
);
