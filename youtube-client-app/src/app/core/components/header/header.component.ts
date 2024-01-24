import { Component, EventEmitter, Output } from '@angular/core';
import { IFilter } from './filter/filter.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() filterCriteria = new EventEmitter<IFilter>();

  filterVisible = true;
}
