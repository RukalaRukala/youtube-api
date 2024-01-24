import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, filter, fromEvent, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { setSearchQuery } from '../../../store/search/search.actions';
import { load } from '../../../../you-tube/store/you-tube.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  @Output() filterVisibility = new EventEmitter<boolean>();

  @ViewChild('searchInput')
  searchInput!: ElementRef;

  filterVisible = true;

  constructor(private store: Store) {}

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement as HTMLInputElement, 'input')
      .pipe(
        map(event => (event.target as HTMLInputElement).value),
        debounceTime(500),
        filter(value => value.length > 2)
      )
      .pipe(
        map(data => {
          this.store.dispatch(setSearchQuery({ searchQuery: data }));
          return data;
        })
      )
      .subscribe(data => {
        this.store.dispatch(load({ payload: data }));
      });
  }

  toggleFilter() {
    this.filterVisible = !this.filterVisible;
    this.filterVisibility.emit(this.filterVisible);
  }
}
