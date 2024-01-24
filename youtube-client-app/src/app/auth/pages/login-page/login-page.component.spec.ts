import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [ReactiveFormsModule],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with controls', () => {
    expect(component.form).toBeDefined();
    expect(component.login).toBeDefined();
    expect(component.password).toBeDefined();
  });

  it('should set validators for login and password controls', () => {
    const loginValidators = component.login?.validator;
    const passwordValidators = component.password?.validator;

    expect(loginValidators).not.toBeNull();
    expect(passwordValidators).not.toBeNull();
  });

  it('should reset the form and call AuthService.login() on submit if form is valid', () => {
    const authServiceSpy = jest.spyOn(authService, 'login');
    const validEmail = 'test@example.com';
    const validPassword = 'Password123!';

    component.form.setValue({ login: validEmail, password: validPassword });
    component.submit(validEmail, validPassword);

    expect(component.form.value).toEqual({ login: null, password: null });
    expect(authServiceSpy).toHaveBeenCalledWith(validEmail, validPassword);
  });

  it('should not call AuthService.login() on submit if form is invalid', () => {
    const authServiceSpy = jest.spyOn(authService, 'login');
    const invalidEmail = 'invalid-email';
    const invalidPassword = 'pass';

    component.form.setValue({ login: invalidEmail, password: invalidPassword });
    component.submit(invalidEmail, invalidPassword);

    expect(component.form.valid).toBeFalsy();
    expect(authServiceSpy).not.toHaveBeenCalled();
  });
});
