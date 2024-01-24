import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { CommonButtonComponent } from './components/common-button/common-button.component';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [CommonModule, CommonButtonComponent],
})
export class SharedModule {}
