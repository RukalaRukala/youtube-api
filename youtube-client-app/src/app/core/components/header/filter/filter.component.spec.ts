import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { Store } from '@ngrx/store';
import { map, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FilterDirection } from './filter.model';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let storeMock: Partial<Store>;

  beforeEach(async () => {
    storeMock = {
      select: jest.fn().mockReturnValue(of({})),
      dispatch: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      providers: [{ provide: Store, useValue: storeMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch setFilterByWord action for word', () => {
    const value = 'word';
    component.onChangeFilter(value);
    expect(storeMock.dispatch).toHaveBeenCalledWith({
      payload: value,
      type: '[FILTER] set filter by word',
    });
  });

  it('should dispatch setFilterCriteria action for Criteria.DATE', () => {
    const value = 'date';
    const options = {
      date: FilterDirection.NULL,
      count: FilterDirection.NULL,
    };
    component.onChangeFilter(value);
    jest.spyOn(storeMock, 'select').mockReturnValueOnce(
      of(options).pipe(
        map(opt =>
          expect(storeMock.dispatch).toHaveBeenCalledWith({
            payload: { criteria: value, direct: opt[value] },
            type: '[FILTER] set filter criteria',
          })
        )
      )
    );
  });

  it('should dispatch setFilterCriteria action for Criteria.COUNT', () => {
    const value = 'count';
    const options = {
      date: FilterDirection.NULL,
      count: FilterDirection.NULL,
    };
    component.onChangeFilter(value);
    jest.spyOn(storeMock, 'select').mockReturnValueOnce(
      of(options).pipe(
        map(opt =>
          expect(storeMock.dispatch).toHaveBeenCalledWith({
            payload: { criteria: value, direct: opt[value] },
            type: '[FILTER] set filter criteria',
          })
        )
      )
    );
  });
});
