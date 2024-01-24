import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { deleteCard } from '../../core/components/admin/store/admin.actions';
import { setFavorite } from '../store/you-tube.actions';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IItemModel } from './item.model';
import { IState } from '../../core/state.model';
import { provideMockStore } from '@ngrx/store/testing';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let router: Router;
  let store: Store;
  const state = {
    items: { items: [] as IItemModel[] },
    customItems: { customItems: [] as IItemModel[] },
  } as IState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        provideMockStore({ initialState: state }),
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    component = new ItemComponent(router, store);
    component.item = {
      id: 'test',
      itemName: 'test',
      imageURL: 'test',
      custom: false,
      date: new Date(),
      favorite: false,
      description: 'test',
      actions: {} as unknown,
    } as IItemModel;
    component.items = [component.item];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to details on showDetails()', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.showDetails();

    expect(navigateSpy).toHaveBeenCalledWith(['/search', 'test'], {
      queryParams: { custom: false, imageURL: 'test' },
    });
  });

  it('should dispatch deleteCard action on deleteCard()', fakeAsync(() => {
    const mockCustomItems = component.items;
    const mockCustomItems$ = of(mockCustomItems);
    jest
      .spyOn(component.customItems$, 'pipe')
      .mockReturnValue(mockCustomItems$);

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.deleteCard();

    tick();

    expect(dispatchSpy).toHaveBeenCalledWith(
      deleteCard({
        payload: mockCustomItems.filter(card => card.id !== component.item.id),
      })
    );
  }));

  it('should dispatch setFavorite action on onFavorite()', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.onFavorite();

    expect(dispatchSpy).toHaveBeenCalledWith(
      setFavorite({
        payload: component.items.map(item =>
          item.id === component.item.id
            ? { ...item, favorite: !item.favorite }
            : item
        ),
      })
    );
  });
});
