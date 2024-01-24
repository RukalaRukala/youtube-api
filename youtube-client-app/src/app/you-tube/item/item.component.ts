import { Component, Input } from '@angular/core';
import { IItemModel } from './item.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCustomItems } from '../../core/components/admin/store/admin.selectors';
import { first } from 'rxjs';
import { deleteCard } from '../../core/components/admin/store/admin.actions';
import { setFavorite } from '../store/you-tube.actions';
import { selectItems } from '../store/you-tube.selectors';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() item!: IItemModel;

  customItems$ = this.store.select(selectCustomItems);

  items$ = this.store.select(selectItems);

  items!: IItemModel[];

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.items$.subscribe(items => (this.items = items));
  }

  showDetails() {
    this.router.navigate(['/search', this.item.id], {
      queryParams: { custom: this.item.custom, imageURL: this.item.imageURL },
    });
  }

  deleteCard() {
    this.customItems$.pipe(first()).subscribe(items => {
      const arr = items.filter(card => card.id !== this.item.id);
      this.store.dispatch(deleteCard({ payload: arr }));
    });
  }

  onFavorite() {
    const newItems = this.items.map(item =>
      item.id === this.item.id ? { ...item, favorite: !item.favorite } : item
    );
    this.store.dispatch(setFavorite({ payload: newItems }));
  }
}
