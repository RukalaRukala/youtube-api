import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IItemModel } from '../you-tube/item/item.model';
import { selectItems } from '../you-tube/store/you-tube.selectors';
import { selectCustomItems } from '../core/components/admin/store/admin.selectors';
import {
  selectKey,
  selectSearchOptions,
} from '../core/store/search/search.selectors';
import { Store } from '@ngrx/store';
import { FilterService } from '../servises/filter/filter.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
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
        (this.allItems$ = this.filterService
          .concatItems(this.items$, this.customItems$, options)
          .pipe(map(items => items?.filter(item => item.favorite))))
    );
  }

  setSliceProps([start, end]: number[]) {
    this.startItem = start;
    this.endItem = end;
  }
}
