import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteComponent } from './favorite.component';
import { Store, StoreModule } from '@ngrx/store';
import { FilterService } from '../servises/filter/filter.service';
import { PaginatePipe } from '../shared/pipes/paginate.pipe';
import { IncludesPhrasePipe } from '../shared/pipes/includes-phrase.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { IState } from '../core/state.model';
import { FilterDirection } from '../core/components/header/filter/filter.model';

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;
  let store: Store;
  let mockFilterService: FilterService;
  const state = {
    searchOptions: {
      searchOptions: {
        searchQuery: '',
        date: FilterDirection.NULL,
        count: FilterDirection.NULL,
        key: '',
        lastFilter: null,
      },
    },
  } as IState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [FavoriteComponent, PaginatePipe, IncludesPhrasePipe],
      providers: [provideMockStore({ initialState: state })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteComponent);
    store = TestBed.inject(Store);
    mockFilterService = TestBed.inject(FilterService);
    component = new FavoriteComponent(store, mockFilterService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties and subscriptions in the constructor', () => {
    fixture.detectChanges();

    expect(component.startItem).toEqual(0);
    expect(component.endItem).toEqual(20);
  });

  it('should set values of start and end items when call setSliceProps', () => {
    component.setSliceProps([2, 5]);
    expect(component.startItem).toBe(2);
    expect(component.endItem).toBe(5);
  });
});
