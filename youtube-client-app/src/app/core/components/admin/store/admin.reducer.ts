import { IItemModel } from '../../../../you-tube/item/item.model';
import { createReducer, on } from '@ngrx/store';
import { addItemSuccess, deleteCard } from './admin.actions';

export interface ICustomItemState {
  customItems: IItemModel[];
}

const initialState: ICustomItemState = { customItems: [] };

export const customItemsReducer = createReducer(
  initialState,
  on(
    addItemSuccess,
    (state, { payload }): ICustomItemState => ({
      ...state,
      customItems: [...state.customItems, payload],
    })
  ),
  on(deleteCard, (state, { payload }): ICustomItemState => {
    return { ...state, customItems: payload };
  })
);
