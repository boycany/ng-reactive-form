import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  isFormValid = false;

  formData = {
    username: '',
    email: '',
    gender: '',
    hobbies: [],
  };

  submitted = false;

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    this.signupForm.statusChanges
      .pipe(
        switchMap((status) => {
          // console.log('status :>> ', status);
          if (status === 'VALID') {
            this.isFormValid = true;
          } else {
            this.isFormValid = false;
          }
          return this.signupForm.valueChanges;
        })
      )
      .subscribe((value) => {
        // console.log('value :>> ', value);
      });

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log('value :>> ', value);
    // });
  }

  get userName() {
    return this.signupForm.get('userData.username');
  }

  get email() {
    return this.signupForm.get('userData.email');
  }

  get hobbies() {
    return this.signupForm.get('hobbies') as FormArray;
  }

  onSubmit() {
    console.log('this.signupForm :>> ', this.signupForm.value);
    const { userData, gender, hobbies } = this.signupForm.value;
    const { username, email } = userData;

    this.formData = {
      username,
      email,
      gender,
      hobbies,
    };

    this.submitted = true;

    this.signupForm.reset({
      gender: 'male',
    });
    this.hobbies.clear();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    this.hobbies.push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // Angular Form Validator will execute the method, and at that time,
    // 'this' won't be bound to the class AppComponent.
    // As a result, it won't be able to find the variable 'this.forbiddenUsernames'.
    // So we should bind this when setting this.forbiddenNames on Validator.
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null; //It should return null if username pass the Validator
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }

  removeHobbyControl(index: number) {
    this.hobbies.removeAt(index);
  }
}
