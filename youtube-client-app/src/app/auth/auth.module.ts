import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonButtonComponent } from '../shared/components/common-button/common-button.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    CommonButtonComponent,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [LoginPageComponent],
})
export class AuthModule {}
