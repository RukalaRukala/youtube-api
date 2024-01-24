import { createAction, props } from '@ngrx/store';
import { FilterDirection } from '../../components/header/filter/filter.model';
import { IItemModel } from '../../../you-tube/item/item.model';
import { IDateCountState } from '../search/search.reducer';

export const setFilterCriteria = createAction(
  '[FILTER] set filter criteria',
  props<{ payload: { criteria: string; direct: FilterDirection } }>()
);

export const setFilterByWord = createAction(
  '[FILTER] set filter by word',
  props<{ payload: string }>()
);

export const filterSuccess = createAction(
  '[FILTER] set filter criteria success',
  props<{ payload: IDateCountState }>()
);

export const applyFilter = createAction(
  '[FILTER] apply filter',
  props<{ payload: IItemModel[] }>()
);
