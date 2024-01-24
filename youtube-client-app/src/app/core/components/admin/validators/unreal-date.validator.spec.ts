import { FormControl } from '@angular/forms';
import { unrealDateValidator } from './ureal-date.validator';

describe('unrealDateValidator', () => {
  const validator = unrealDateValidator();

  it('should return an object if date is in the future', () => {
    const tomorrow = new Date();
    const control = new FormControl(`${tomorrow.getFullYear() + 1}-01-01`);
    const result = validator(control);
    expect(result).toEqual({ unrealDate: true });
  });

  it('should return null if date is not in the future', () => {
    const control = new FormControl('2021-01-01');
    const result = validator(control);
    expect(result).toBeNull();
  });
});
