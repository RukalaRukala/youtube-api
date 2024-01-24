import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-common-button',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./common-button.component.scss'],
})
export class CommonButtonComponent {}
