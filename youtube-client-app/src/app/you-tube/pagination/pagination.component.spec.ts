import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { of } from 'rxjs';
import { IItemModel } from '../item/item.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    const items: IItemModel[] = [
      {
        id: 'test',
        itemName: 'test',
        imageURL: 'test',
        custom: false,
        date: new Date(),
        favorite: false,
        description: 'test',
        actions: {} as unknown,
      } as IItemModel,
    ];
    component.allItems$ = of(items);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit current page range when onPage is called', () => {
    const emitSpy = jest.spyOn(component.currentPage, 'emit');
    const pageNumber = 2;
    const itemPerPage = 20;

    component.onPage(pageNumber);

    expect(emitSpy).toHaveBeenCalledWith([
      (pageNumber - 1) * itemPerPage,
      pageNumber * itemPerPage,
    ]);
  });

  it('should decrease active page and emit current page range when goToPrev is called', () => {
    const emitSpy = jest.spyOn(component.currentPage, 'emit');
    component.activePage = 3;
    const itemPerPage = 20;

    component.goToPrev();

    expect(emitSpy).toHaveBeenCalledWith([
      (component.activePage - 1) * itemPerPage,
      component.activePage * itemPerPage,
    ]);
    expect(component.activePage).toBe(2);
  });

  it('should increase active page and emit current page range when goToNext is called', () => {
    const emitSpy = jest.spyOn(component.currentPage, 'emit');
    component.activePage = 2;
    const itemPerPage = 20;

    component.goToNext();

    expect(emitSpy).toHaveBeenCalledWith([
      (component.activePage - 1) * itemPerPage,
      component.activePage * itemPerPage,
    ]);
    expect(component.activePage).toBe(3);
  });

  it('should initialize pageQuantity and p array on subscription to allItems$', fakeAsync(() => {
    component.ngOnInit();

    tick();

    expect(component.pageQuantity).toBe(1);
    expect(component.p.length).toBe(1);
  }));
});
