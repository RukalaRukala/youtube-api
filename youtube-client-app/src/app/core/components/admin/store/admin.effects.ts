import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of } from 'rxjs';
import { addItem, addItemSuccess } from './admin.actions';
import { ICustomItem } from '../admin.model';
import { IItemModel } from '../../../../you-tube/item/item.model';

@Injectable()
export class AdminEffects {
  customItemSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(addItem),
      exhaustMap(({ payload }) =>
        of(this.setItemProps(payload)).pipe(
          map(item => addItemSuccess({ payload: item }))
        )
      )
    );
  });

  constructor(private actions$: Actions) {}

  setItemProps(customItem: ICustomItem): IItemModel {
    return {
      id: customItem.link,
      itemName: customItem.title,
      description: customItem.description || '',
      imageURL: customItem.img,
      date: new Date(customItem.date),
      actions: {
        viewCount: customItem.tags[0],
        likeCount: customItem.tags[1] || '',
        dislikeCount: customItem.tags[2] || '',
        commentCount: customItem.tags[3] || '',
        favoriteCount: customItem.tags[4] || '',
      },
      custom: true,
      favorite: false,
    };
  }
}
