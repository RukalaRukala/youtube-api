import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of } from 'rxjs';
import { filterSuccess, setFilterCriteria } from './filter.actions';
import { FilterService } from '../../../servises/filter/filter.service';

@Injectable()
export class FilterEffects {
  filterSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setFilterCriteria),
      exhaustMap(({ payload }) =>
        of(
          this.filter.changeDateOrCount(payload.criteria, payload.direct)
        ).pipe(map(options => filterSuccess({ payload: options })))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private filter: FilterService
  ) {}
}
