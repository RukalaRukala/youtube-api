import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorBorderDirective } from './color-border.directive';
import { Colors } from './color-border.model';

@Component({
  template: ` <div [appColorBorder]="date"></div>`,
})
class TestComponent {
  date: Date = new Date();
}

describe('ColorBorderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let divElement: HTMLElement;
  let currentDate: Date;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorBorderDirective, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    divElement = fixture.debugElement.query(
      By.directive(ColorBorderDirective)
    ).nativeElement;
    currentDate = new Date();
  });

  it('should create the component with ColorBorderDirective', () => {
    expect(testComponent).toBeTruthy();
    expect(divElement).toBeTruthy();
  });

  it('should set the border color to YELLOW when date is less than 7 days ago', () => {
    testComponent.date = new Date(
      currentDate.setDate(currentDate.getDate() - 6)
    );
    fixture.detectChanges();

    expect(divElement.style.borderColor).toEqual(Colors.YELLOW);
  });

  it('should set the border color to GREEN when date is between 7 and 29 days ago', () => {
    testComponent.date = new Date(
      currentDate.setDate(currentDate.getDate() - 20)
    );
    fixture.detectChanges();

    expect(divElement.style.borderColor).toEqual(Colors.GREEN);
  });

  it('should set the border color to BLUE when date is between 30 and 179 days ago', () => {
    testComponent.date = new Date(
      currentDate.setDate(currentDate.getDate() - 150)
    );
    fixture.detectChanges();

    expect(divElement.style.borderColor).toEqual(Colors.BLUE);
  });

  it('should set the border color to RED when date is more than 180 days ago', () => {
    testComponent.date = new Date(
      currentDate.setDate(currentDate.getDate() - 200)
    );
    fixture.detectChanges();

    expect(divElement.style.borderColor).toEqual(Colors.RED);
  });
});
