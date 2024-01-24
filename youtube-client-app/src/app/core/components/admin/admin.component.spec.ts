import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let storeMock: Partial<Store>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    storeMock = {
      dispatch: jest.fn(),
    };
    routerMock = {
      navigate: jest.fn().mockReturnValue(Promise.resolve(true)),
    };

    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: Router, useValue: routerMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the expected controls', () => {
    expect(component.form).toBeInstanceOf(FormGroup);
    expect(component.title).toBeInstanceOf(FormControl);
    expect(component.description).toBeInstanceOf(FormControl);
    expect(component.img).toBeInstanceOf(FormControl);
    expect(component.link).toBeInstanceOf(FormControl);
    expect(component.date).toBeInstanceOf(FormControl);
    expect(component.tags).toBeInstanceOf(FormArray);
  });

  it('should add a tag to the tags FormArray', () => {
    const initialTagsLength = component.tags.length;
    component.addTag();
    expect(component.tags.length).toBe(initialTagsLength + 1);
    expect(component.tags.at(initialTagsLength)).toBeInstanceOf(FormControl);
  });

  it('should reset the form and keep one tag control', () => {
    component.addTag();
    component.reset();
    expect(component.form.value).toEqual({
      title: null,
      description: null,
      img: null,
      link: null,
      date: null,
      tags: [null, null],
    });
  });
});
