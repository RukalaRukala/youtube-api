import { Component, OnInit } from '@angular/core';
import { IItemModel } from '../item/item.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first, map, switchMap } from 'rxjs';
import { ApiService } from '../../servises/api/api.service';
import { deleteCard } from '../../core/components/admin/store/admin.actions';
import { selectCustomItems } from '../../core/components/admin/store/admin.selectors';
import { Store } from '@ngrx/store';
import { setFavorite } from '../store/you-tube.actions';
import { selectItems } from '../store/you-tube.selectors';

interface IQuery {
  custom: boolean;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  item!: IItemModel;

  customItems$ = this.store.select(selectCustomItems);

  items$ = this.store.select(selectItems);

  items!: IItemModel[];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private store: Store
  ) {
    this.items$.subscribe(items => (this.items = items));
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.route.queryParams.subscribe(queryParams => {
        const query = queryParams as IQuery;
        if (!query.custom) {
          this.api
            .getById(params['id'])
            .pipe(
              switchMap(item =>
                this.items$.pipe(
                  map(items => items.filter(card => card.id === item.id))
                )
              )
            )
            .subscribe(item => (this.item = item[0]));
        } else {
          this.customItems$.subscribe(items => {
            this.item = items.filter(item => item.id === params['id'])[0];
          });
        }
      });
    });
  }

  deleteCard() {
    this.customItems$.pipe(first()).subscribe(items => {
      const arr = items.filter(card => card.id !== this.item.id);
      this.store.dispatch(deleteCard({ payload: arr }));
      this.router.navigate(['/search']);
    });
  }

  onFavorite() {
    const newItems = this.items.map(item =>
      item.id === this.item.id ? { ...item, favorite: !item.favorite } : item
    );
    this.store.dispatch(setFavorite({ payload: newItems }));
  }
}
