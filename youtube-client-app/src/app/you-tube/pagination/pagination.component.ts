import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IItemModel } from '../item/item.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Output() currentPage = new EventEmitter<number[]>();

  @Input() allItems$!: Observable<IItemModel[]>;

  pageQuantity!: number;

  itemPerPage = 20;

  p!: number[];

  activePage = 1;

  ngOnInit(): void {
    this.allItems$.subscribe(items => {
      this.pageQuantity = Math.ceil(items.length / this.itemPerPage);
      this.p = new Array(this.pageQuantity).fill(1);
    });
  }

  onPage(pageNumber: number) {
    this.activePage = pageNumber;
    this.emitSliceProps(this.activePage, this.itemPerPage);
  }

  goToPrev() {
    this.activePage = this.activePage - 1;
    this.emitSliceProps(this.activePage, this.itemPerPage);
  }

  goToNext() {
    this.activePage = this.activePage + 1;
    this.emitSliceProps(this.activePage, this.itemPerPage);
  }

  emitSliceProps(activePage: number, itemPerPage: number) {
    this.currentPage.emit([
      (activePage - 1) * itemPerPage,
      activePage * itemPerPage,
    ]);
  }
}
