import { ICustomItemState } from './components/admin/store/admin.reducer';
import { IItemState } from '../you-tube/store/you-tube.reducer';
import { ISearchState } from './store/search/search.reducer';

export interface IState {
  searchOptions: ISearchState;
  items: IItemState;
  customItems: ICustomItemState;
}
