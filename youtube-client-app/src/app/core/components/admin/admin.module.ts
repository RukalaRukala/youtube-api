import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonButtonComponent } from '../../../shared/components/common-button/common-button.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, ReactiveFormsModule, CommonButtonComponent],
})
export class AdminModule {}
