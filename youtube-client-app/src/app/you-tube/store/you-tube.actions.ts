import { createAction, props } from '@ngrx/store';
import { IItemState } from './you-tube.reducer';
import { IItemModel } from '../item/item.model';

export const load = createAction(
  '[YOU_TUBE] load items',
  props<{ payload: string }>()
);

export const loadSuccess = createAction(
  '[YOU_TUBE] load items success',
  props<{ payload: IItemState }>()
);

export const setFavorite = createAction(
  '[YOU_TUBE] set favorite status',
  props<{ payload: IItemModel[] }>()
);
