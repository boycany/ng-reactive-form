import { FormControl } from '@angular/forms';

export class CustomValidators {
  static invalidEmail(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'test@test.com') {
      return { invalidEmail: true };
    }
    return null;
  }
}
