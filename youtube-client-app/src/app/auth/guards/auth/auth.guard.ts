import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  return localStorage['token'] ? true : inject(AuthService).isAuth;
};
