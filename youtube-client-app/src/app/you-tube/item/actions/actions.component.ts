import { Component, Input } from '@angular/core';
import { IStatistics } from '../../../core/components/header/search/search-response.model';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  @Input() actions!: IStatistics;
}
