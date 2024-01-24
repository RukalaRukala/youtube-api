import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICustomItemState } from './admin.reducer';

export const selectCustomItemsList =
  createFeatureSelector<ICustomItemState>('customItems');

export const selectCustomItems = createSelector(
  selectCustomItemsList,
  state => state.customItems
);
