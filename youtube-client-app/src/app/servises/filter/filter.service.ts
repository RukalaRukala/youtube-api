import { Injectable } from '@angular/core';
import {
  Criteria,
  FilterDirection,
  ISearchOptions,
} from '../../core/components/header/filter/filter.model';
import { IItemModel } from '../../you-tube/item/item.model';
import { map, Observable, switchMap } from 'rxjs';
import { IDateCountState } from '../../core/store/search/search.reducer';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  concatItems(
    items$: Observable<IItemModel[]>,
    customItems$: Observable<IItemModel[]>,
    searchOptions: ISearchOptions
  ): Observable<IItemModel[]> {
    return items$.pipe(
      switchMap(items =>
        customItems$.pipe(
          map(customItems => [
            ...this.applyFilter(customItems, searchOptions),
            ...this.applyFilter(items, searchOptions),
          ])
        )
      )
    );
  }

  filterByDate(a: IItemModel, b: IItemModel, searchOptions: ISearchOptions) {
    let result = 0;
    if (searchOptions.date !== FilterDirection.NULL) {
      result = a.date.getTime() - b.date.getTime();
      result =
        searchOptions.date !== FilterDirection.ADS ? result * -1 : result;
    }
    return result;
  }

  filterByViews(a: IItemModel, b: IItemModel, searchOptions: ISearchOptions) {
    let result = 0;
    if (searchOptions.count !== FilterDirection.NULL) {
      result = +a.actions.viewCount - +b.actions.viewCount;
      result =
        searchOptions.count !== FilterDirection.ADS ? result * -1 : result;
    }
    return result;
  }

  applyFilter(arr: IItemModel[], searchOptions: ISearchOptions) {
    const arrResult = [...arr];
    if (
      searchOptions.lastFilter === Criteria.DATE &&
      searchOptions.date !== FilterDirection.NULL
    ) {
      arrResult
        .sort((a, b) => this.filterByViews(a, b, searchOptions))
        .sort((a, b) => this.filterByDate(a, b, searchOptions));
    }
    if (
      searchOptions.lastFilter === Criteria.COUNT &&
      searchOptions.count !== FilterDirection.NULL
    ) {
      arrResult
        .sort((a, b) => this.filterByDate(a, b, searchOptions))
        .sort((a, b) => this.filterByViews(a, b, searchOptions));
    }
    return arrResult.length === 0 ? arr : arrResult;
  }

  changeDateOrCount(value: string, direct: FilterDirection): IDateCountState {
    return {
      direct: this.changeDirection(direct),
      lastFilter: value as Criteria,
    };
  }

  changeDirection(state: FilterDirection) {
    let nextDirection: FilterDirection = FilterDirection.NULL;

    if (state === FilterDirection.NULL) {
      nextDirection = FilterDirection.ADS;
    }

    if (state === FilterDirection.ADS) {
      nextDirection = FilterDirection.DESC;
    }

    if (state === FilterDirection.DESC) {
      nextDirection = FilterDirection.NULL;
    }

    return nextDirection;
  }
}
