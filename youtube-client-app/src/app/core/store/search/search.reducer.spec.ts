import { ISearchState, searchReducer } from './search.reducer';
import { setSearchQuery } from './search.actions';
import { filterSuccess } from '../filter/filter.actions';
import {
  Criteria,
  FilterDirection,
} from '../../components/header/filter/filter.model';

describe('searchReducer', () => {
  let initialState: ISearchState;

  beforeEach(() => {
    initialState = {
      searchOptions: {
        searchQuery: '',
        date: FilterDirection.NULL,
        count: FilterDirection.NULL,
        key: '',
        lastFilter: null,
      },
    };
  });

  it('should handle setSearchQuery action correctly', () => {
    const searchQuery = 'test query';
    const action = setSearchQuery({ searchQuery });

    const newState = searchReducer(initialState, action);

    expect(newState.searchOptions.searchQuery).toEqual(searchQuery);
    expect(newState).toEqual({
      searchOptions: {
        ...initialState.searchOptions,
        searchQuery,
      },
    });
  });

  it('should handle filterSuccess action correctly', () => {
    const payload = {
      lastFilter: Criteria.DATE,
      direct: FilterDirection.ADS,
    };
    const action = filterSuccess({ payload });

    const newState = searchReducer(initialState, action);

    expect(newState.searchOptions.date).toEqual(FilterDirection.ADS);
    expect(newState.searchOptions.lastFilter).toEqual('date');
    expect(newState).toEqual({
      searchOptions: {
        ...initialState.searchOptions,
        date: FilterDirection.ADS,
        lastFilter: 'date',
      },
    });
  });

  it('should return the default state for unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = searchReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
