import { Component } from '@angular/core';
import { Criteria } from './filter.model';
import { Store } from '@ngrx/store';
import {
  setFilterByWord,
  setFilterCriteria,
} from '../../../store/filter/filter.actions';
import { selectSearchOptions } from '../../../store/search/search.selectors';
import { first } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  searchOptions$ = this.store.select(selectSearchOptions);

  protected readonly Criteria = Criteria;

  constructor(private store: Store) {}

  onChangeFilter(value: string) {
    this.searchOptions$.pipe(first()).subscribe(options => {
      if (value === Criteria.DATE || value === Criteria.COUNT) {
        this.store.dispatch(
          setFilterCriteria({
            payload: { criteria: value, direct: options[value] },
          })
        );
      } else {
        this.store.dispatch(setFilterByWord({ payload: value }));
      }
    });
  }
}
