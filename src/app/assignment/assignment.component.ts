import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
})
export class AssignmentComponent implements OnInit {
  projectForm: FormGroup;
  projectStatusOptions = ['Stable', 'Critical', 'Finished'];
  forbiddenName = 'Test';

  isFormValid = false;

  constructor() {}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      project_name: new FormControl(
        null,
        Validators.required,
        this.validateForbiddenName.bind(this)
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      project_status: new FormControl('Stable'),
    });

    this.projectForm.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.isFormValid = true;
      } else {
        this.isFormValid = false;
      }
    });
  }

  get projectName() {
    return this.projectForm.get('project_name');
  }

  get email() {
    return this.projectForm.get('email');
  }

  get projectStatus() {
    return this.projectForm.get('project_status');
  }

  onSubmit() {
    console.log('this.projectForm.status :>> ', this.projectForm.status);
    console.log('this.projectForm.value :>> ', this.projectForm.value);
  }

  validateForbiddenName(control: FormControl) {
    const forbiddenResult = new Observable<any>((subscriber) => {
      setTimeout(() => {
        if (control.value === this.forbiddenName) {
          subscriber.next({
            nameIsForbidden: true,
          });
        } else {
          subscriber.next(null);
        }
        subscriber.complete();
      }, 1500);
    });
    return forbiddenResult;

    // const promise = new Promise<any>((resolve, reject) => {
    //   setTimeout(() => {
    //     if (control.value === 'Test') {
    //       resolve({ nameIsForbidden: true });
    //     } else {
    //       resolve(null);
    //     }
    //   }, 1500);
    // });
    // return promise;
  }
}
