import { AbstractControl, ValidatorFn } from '@angular/forms';

export function unrealDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let valid: boolean;
    if (control.value) {
      const today = new Date();
      const inputDate = new Date(
        +control.value.slice(0, 4),
        +control.value.slice(5, 7) - 1,
        +control.value.slice(-2)
      );
      valid = today.getTime() - inputDate.getTime() < 0;
      return !valid ? null : { unrealDate: true };
    }
    return null;
  };
}
