import { createAction, props } from '@ngrx/store';

export const setSearchQuery = createAction(
  '[SEARCH] set search query',
  props<{ searchQuery: string }>()
);
