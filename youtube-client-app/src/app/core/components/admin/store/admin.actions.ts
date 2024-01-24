import { createAction, props } from '@ngrx/store';
import { ICustomItem } from '../admin.model';
import { IItemModel } from '../../../../you-tube/item/item.model';

export const addItem = createAction(
  '[CUSTOM_ITEMS] add item',
  props<{ payload: ICustomItem }>()
);

export const addItemSuccess = createAction(
  '[CUSTOM_ITEMS] add item success',
  props<{ payload: IItemModel }>()
);

export const deleteCard = createAction(
  '[YOU_TUBE] delete custom item',
  props<{ payload: IItemModel[] }>()
);
