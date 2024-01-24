import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';
import { IItemModel } from '../../you-tube/item/item.model';
import {
  Criteria,
  FilterDirection,
  ISearchOptions,
} from '../../core/components/header/filter/filter.model';
import { of } from 'rxjs';
import { IDateCountState } from '../../core/store/search/search.reducer';

describe('FilterService', () => {
  let service: FilterService;
  let items: IItemModel[];
  let customItems: IItemModel[];
  let searchOptions: ISearchOptions;
  let itemA: IItemModel;
  let itemB: IItemModel;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FilterService] });
    service = TestBed.inject(FilterService);
    items = [
      {
        id: 'test1',
        itemName: 'test',
        imageURL: 'test',
        custom: false,
        date: new Date('2023-01-01'),
        favorite: false,
        description: 'test dogs',
        actions: { viewCount: 100 } as unknown,
      } as IItemModel,
    ];
    customItems = [
      {
        id: 'test',
        itemName: 'test',
        imageURL: 'test',
        custom: true,
        date: new Date('2023-02-01'),
        favorite: false,
        description: 'test dogs',
        actions: { viewCount: 200 } as unknown,
      } as IItemModel,
    ];
    searchOptions = {
      key: '',
      date: FilterDirection.NULL,
      count: FilterDirection.NULL,
      searchQuery: 'test',
      lastFilter: null,
    };
    itemA = items[0];
    itemB = customItems[0];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should concatenate and apply filter to items correctly', done => {
    const items$ = of(items);
    const customItems$ = of(customItems);

    service
      .concatItems(items$, customItems$, searchOptions)
      .subscribe(result => {
        const expectedResult: IItemModel[] = [...customItems, ...items];
        expect(result).toEqual(expectedResult);
        done();
      });
  });

  it('should correctly sort items by date in ascending order', () => {
    searchOptions.date = FilterDirection.ADS;
    const result = service.filterByDate(itemA, itemB, searchOptions);
    expect(result).toBeLessThan(0);
  });

  it('should correctly sort items by date in descending order', () => {
    searchOptions.date = FilterDirection.DESC;
    const result = service.filterByDate(itemA, itemB, searchOptions);
    expect(result).toBeGreaterThan(0);
  });

  it('should return 0 if searchOptions.date is NULL', () => {
    searchOptions.date = FilterDirection.NULL;
    const result = service.filterByDate(itemA, itemB, searchOptions);
    expect(result).toBe(0);
  });

  it('should correctly sort items by view count in ascending order', () => {
    searchOptions.count = FilterDirection.ADS;
    const result = service.filterByViews(itemA, itemB, searchOptions);
    expect(result).toBeLessThan(0);
  });

  it('should correctly sort items by view count in descending order', () => {
    searchOptions.count = FilterDirection.DESC;
    const result = service.filterByViews(itemA, itemB, searchOptions);
    expect(result).toBeGreaterThan(0);
  });

  it('should return 0 if searchOptions.count is NULL', () => {
    searchOptions.count = FilterDirection.NULL;
    const result = service.filterByViews(itemA, itemB, searchOptions);
    expect(result).toBe(0);
  });

  it('should apply filter by DATE and sort items correctly', () => {
    const itemsToCompare: IItemModel[] = [itemA, itemB];
    const searchOptions1 = {
      lastFilter: Criteria.DATE,
      date: FilterDirection.DESC,
      count: FilterDirection.NULL,
    } as ISearchOptions;

    const filteredItems = service.applyFilter(itemsToCompare, searchOptions1);

    const expectedSortedItems: IItemModel[] = [itemB, itemA];
    expect(filteredItems).toEqual(expectedSortedItems);
  });

  it('should apply filter by COUNT and sort items correctly', () => {
    const itemsToCompare: IItemModel[] = [itemA, itemB];
    const searchOptions2 = {
      lastFilter: Criteria.COUNT,
      date: FilterDirection.NULL,
      count: FilterDirection.ADS,
    } as ISearchOptions;

    const filteredItems = service.applyFilter(itemsToCompare, searchOptions2);

    const expectedSortedItems: IItemModel[] = [itemA, itemB];
    expect(filteredItems).toEqual(expectedSortedItems);
  });

  it('should change state for DATE correctly', () => {
    const result: IDateCountState = service.changeDateOrCount(
      'date',
      FilterDirection.DESC
    );

    const expectedStateForDate: IDateCountState = {
      direct: FilterDirection.NULL,
      lastFilter: Criteria.DATE,
    };
    expect(result).toEqual(expectedStateForDate);
  });

  it('should change state for COUNT correctly', () => {
    const result: IDateCountState = service.changeDateOrCount(
      'count',
      FilterDirection.ADS
    );

    const expectedStateForCount: IDateCountState = {
      direct: FilterDirection.DESC,
      lastFilter: Criteria.COUNT,
    };
    expect(result).toEqual(expectedStateForCount);
  });
});
