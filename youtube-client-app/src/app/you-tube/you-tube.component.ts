import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectItems } from './store/you-tube.selectors';
import {
  selectKey,
  selectSearchOptions,
} from '../core/store/search/search.selectors';
import { Observable } from 'rxjs';
import { selectCustomItems } from '../core/components/admin/store/admin.selectors';
import { IItemModel } from './item/item.model';
import { FilterService } from '../servises/filter/filter.service';

@Component({
  selector: 'app-you-tube',
  templateUrl: './you-tube.component.html',
  styleUrls: ['./you-tube.component.scss'],
})
export class YouTubeComponent {
  allItems$!: Observable<IItemModel[]>;

  items$ = this.store.select(selectItems);

  customItems$ = this.store.select(selectCustomItems);

  searchOptions$ = this.store.select(selectSearchOptions);

  key$ = this.store.select(selectKey);

  startItem = 0;

  endItem = 20;

  constructor(
    private store: Store,
    private filterService: FilterService
  ) {
    this.searchOptions$.subscribe(
      options =>
        (this.allItems$ = this.filterService.concatItems(
          this.items$,
          this.customItems$,
          options
        ))
    );
  }

  setSliceProps([start, end]: number[]) {
    this.startItem = start;
    this.endItem = end;
  }
}
