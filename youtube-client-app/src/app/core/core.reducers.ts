import { ActionReducerMap } from '@ngrx/store';
import { IState } from './state.model';
import { customItemsReducer } from './components/admin/store/admin.reducer';
import { itemsReducer } from '../you-tube/store/you-tube.reducer';
import { searchReducer } from './store/search/search.reducer';

export const reducers: ActionReducerMap<IState> = {
  searchOptions: searchReducer,
  items: itemsReducer,
  customItems: customItemsReducer,
};
