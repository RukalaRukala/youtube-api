import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IItemState } from './you-tube.reducer';

export const selectItemsList = createFeatureSelector<IItemState>('items');

export const selectItems = createSelector(
  selectItemsList,
  state => state.items
);
