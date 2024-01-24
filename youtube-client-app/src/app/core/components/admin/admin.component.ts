import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addItem } from './store/admin.actions';
import { IItemModel } from '../../../you-tube/item/item.model';
import { ICustomItem } from './admin.model';
import { Router } from '@angular/router';
import { unrealDateValidator } from './validators/ureal-date.validator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  customItem!: IItemModel;

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    description: new FormControl(null, [Validators.maxLength(255)]),
    img: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required, unrealDateValidator()]),
    tags: new FormArray([new FormControl('', [Validators.required])]),
  });

  constructor(
    private store: Store,
    private router: Router
  ) {}

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  get img() {
    return this.form.get('img');
  }

  get link() {
    return this.form.get('link');
  }

  get date() {
    return this.form.get('date');
  }

  get tags() {
    return this.form.get('tags') as FormArray;
  }

  submit() {
    if (this.form.valid) {
      this.store.dispatch(addItem({ payload: this.form.value as ICustomItem }));
      this.router.navigate(['/search']).then(() => this.form.reset());
    }
  }

  addTag() {
    const control = new FormControl('', [Validators.required]);
    (<FormArray>this.form.get('tags')).push(control);
  }

  isChanged(value: HTMLInputElement) {
    return value.checked;
  }

  reset() {
    this.form.reset();
    this.tags.controls = [...this.tags.controls.slice(0, 1)];
  }
}
