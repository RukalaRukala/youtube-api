import { DetailsComponent } from './details.component';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ApiService } from '../../servises/api/api.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IItemModel } from '../item/item.model';
import { deleteCard } from '../../core/components/admin/store/admin.actions';
import { setFavorite } from '../store/you-tube.actions';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let router: Router;
  let mockApiService: ApiService;
  let store: Store;
  let mockCustomItems$: Observable<IItemModel[]>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'testId' }),
            queryParams: of({ custom: false }),
          },
        },
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: ApiService, useValue: { getById: jest.fn() } },
        provideMockStore(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    mockApiService = TestBed.inject(ApiService);
    store = TestBed.inject(Store);
    component.item = {
      id: 'testId',
      itemName: 'test',
      imageURL: 'test',
      custom: false,
      date: new Date(),
      favorite: false,
      description: 'test',
      actions: {} as unknown,
    } as IItemModel;
    component.items = [component.item];
    mockCustomItems$ = of(component.items);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch item details based on params and query params', () => {
    component.ngOnInit();

    expect(mockApiService.getById).toHaveBeenCalledWith('testId');
    expect(component.item).toEqual(component.item);
  });

  it('should delete card and navigate to /search', fakeAsync(() => {
    jest
      .spyOn(component.customItems$, 'pipe')
      .mockReturnValue(mockCustomItems$);

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.deleteCard();

    tick();

    expect(dispatchSpy).toHaveBeenCalledWith(
      deleteCard({
        payload: component.items.filter(item => item.id !== component.item.id),
      })
    );
    expect(router.navigate).toHaveBeenCalledWith(['/search']);
  }));

  it('should toggle favorite', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.onFavorite();

    const expectedItems = [{ ...component.item, favorite: true }];
    expect(dispatchSpy).toHaveBeenCalledWith(
      setFavorite({ payload: expectedItems })
    );
  });
});
