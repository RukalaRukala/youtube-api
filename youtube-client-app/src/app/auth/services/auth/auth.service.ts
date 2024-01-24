import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuth_ = false;

  constructor(private router: Router) {}

  get isAuth() {
    return this.isAuth_;
  }

  login(login: string, password: string) {
    if (login && password) {
      const token = `${login}${password}`;
      localStorage.setItem('token', token);
      this.isAuth_ = true;
      this.router.navigate(['/search']);
    }
  }

  logout() {
    this.isAuth_ = false;
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
  }
}
