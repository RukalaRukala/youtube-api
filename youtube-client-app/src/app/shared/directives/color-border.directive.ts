import { Directive, HostBinding, Input } from '@angular/core';
import { Colors } from './color-border.model';

@Directive({
  selector: '[appColorBorder]',
})
export class ColorBorderDirective {
  @Input() set appColorBorder(value: Date) {
    this.colorBorder = this.getColor(value);
  }

  @HostBinding('style.borderColor') colorBorder!: string;

  getColor(date: Date) {
    const differDay =
      (new Date().getTime() - new Date(date).getTime()) / 1000 / 60 / 60 / 24;
    if (differDay < 7) {
      return Colors.YELLOW;
    } else if (differDay < 30) {
      return Colors.GREEN;
    } else if (differDay < 180) {
      return Colors.BLUE;
    } else {
      return Colors.RED;
    }
  }
}
