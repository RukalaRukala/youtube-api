import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreLayoutComponent } from './core-layout.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CoreLayoutComponent', () => {
  let component: CoreLayoutComponent;
  let fixture: ComponentFixture<CoreLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoreLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(CoreLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
