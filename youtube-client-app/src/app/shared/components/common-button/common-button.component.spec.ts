import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonButtonComponent } from './common-button.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CommonButtonComponent', () => {
  let component: CommonButtonComponent;
  let fixture: ComponentFixture<CommonButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(CommonButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
