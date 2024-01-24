import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { load, loadSuccess } from './you-tube.actions';
import { exhaustMap, map } from 'rxjs';
import { ApiService } from '../../servises/api/api.service';

@Injectable()
export class YouTubeEffects {
  loadSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(load),
      exhaustMap(({ payload }) =>
        this.api
          .search(payload)
          .pipe(map(items => loadSuccess({ payload: { items: items } })))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private api: ApiService
  ) {}
}
