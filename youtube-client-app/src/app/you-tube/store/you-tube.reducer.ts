import { createReducer, on } from '@ngrx/store';
import { IItemModel } from '../item/item.model';
import { applyFilter } from '../../core/store/filter/filter.actions';
import { loadSuccess, setFavorite } from './you-tube.actions';

export interface IItemState {
  items: IItemModel[];
}

const initialState: IItemState = { items: [] };

export const itemsReducer = createReducer(
  initialState,
  on(
    loadSuccess,
    (state, { payload }): IItemState => ({ ...state, items: payload.items })
  ),
  on(
    applyFilter,
    (state, { payload }): IItemState => ({ ...state, items: payload })
  ),
  on(
    setFavorite,
    (state, { payload }): IItemState => ({ ...state, items: payload })
  )
);
