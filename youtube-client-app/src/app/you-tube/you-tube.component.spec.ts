import { YouTubeComponent } from './you-tube.component';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { IItemModel } from './item/item.model';
import { FilterService } from '../servises/filter/filter.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { reducers } from '../core/core.reducers';
import { IStatistics } from '../core/components/header/search/search-response.model';
import {
  FilterDirection,
  ISearchOptions,
} from '../core/components/header/filter/filter.model';

describe('YouTubeComponent', () => {
  let component: YouTubeComponent;
  let store: Store;
  let filterService: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers, {})],
      providers: [FilterService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    store = TestBed.inject(Store);
    filterService = TestBed.inject(FilterService);

    component = new YouTubeComponent(store, filterService);
    component.allItems$ = of([{}] as IItemModel[]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set allItems$ property based on filterService.concatItems', () => {
    const mockActions: IStatistics = {
      commentCount: 'test',
      viewCount: 'test',
      favoriteCount: 'test',
      likeCount: 'test',
      dislikeCount: 'test',
    };

    const mockItems: IItemModel[] = [
      {
        id: 'test',
        itemName: 'test',
        imageURL: 'test',
        custom: false,
        date: new Date(),
        favorite: false,
        description: 'test',
        actions: mockActions,
      },
    ];

    const mockCustomItems: IItemModel[] = [...mockItems];

    const mockSearchOptions: ISearchOptions = {
      date: FilterDirection.NULL,
      count: FilterDirection.NULL,
      lastFilter: null,
      key: 'test',
      searchQuery: 'test',
    };

    const items$Mock: Observable<IItemModel[]> = of(mockItems);
    const customItems$Mock: Observable<IItemModel[]> = of(mockCustomItems);
    const searchOptions$Mock: Observable<ISearchOptions> =
      of(mockSearchOptions);

    jest.spyOn(store, 'select').mockReturnValueOnce(items$Mock);
    jest.spyOn(store, 'select').mockReturnValueOnce(customItems$Mock);
    jest.spyOn(store, 'select').mockReturnValueOnce(searchOptions$Mock);

    component.allItems$.subscribe(result => {
      expect(result).toBeDefined();
    });
  });

  it('should set values of start and end items when call setSliceProps', () => {
    component.setSliceProps([2, 5]);
    expect(component.startItem).toBe(2);
    expect(component.endItem).toBe(5);
  });
});
