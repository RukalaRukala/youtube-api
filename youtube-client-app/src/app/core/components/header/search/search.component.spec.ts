import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { SearchComponent } from './search.component';
import { Store, StoreModule } from '@ngrx/store';
import { setSearchQuery } from '../../../store/search/search.actions';
import { load } from '../../../../you-tube/store/you-tube.actions';
import { debounceTime, filter, of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [SearchComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch actions when input event is triggered', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const fakeInput = of('test');
    fakeInput
      .pipe(
        debounceTime(500),
        filter(value => value.length > 2)
      )
      .subscribe(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(
          setSearchQuery({ searchQuery: 'test' })
        );
        expect(dispatchSpy).toHaveBeenCalledWith(load({ payload: 'test' }));
      });
  });

  it('should toggle filter visibility and emit event', () => {
    const mockElementRef: ElementRef = {
      nativeElement: {
        value: 'test',
      },
    };

    component.searchInput = mockElementRef as ElementRef<HTMLInputElement>;

    const spy = jest.spyOn(component.filterVisibility, 'emit');

    component.toggleFilter();

    expect(component.filterVisible).toBe(false);
    expect(spy).toHaveBeenCalledWith(false);
  });
});
