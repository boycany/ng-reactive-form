import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValidators {
  static invalidEmail(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'test@test.com') {
      return { invalidEmail: true };
    }
    return null;
  }

  static asyncInvalidEmail(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            control.value === 'XXXXXXXXXXXXX' ? { invalidEmail: true } : null
          ),
        1500
      )
    );
    return promise;
  }
}
