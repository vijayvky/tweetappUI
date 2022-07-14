import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login-service.service';

export function ConfirmedValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function ConfirmedValidatorEmail(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (
      matchingControl.errors &&
      !matchingControl.errors.confirmedValidatorEmail
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidatorEmail: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  UserRegister: FormGroup;
  submitted = false;
  message: string;
  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
    this.UserRegister = this.fb.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z ]*')],
        ],
        lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],

        contactNumber: [
          '',
          [Validators.required, Validators.pattern('^([6-9]{1})([0-9]{9})$')],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: [
          ConfirmedValidator('password', 'confirmPassword'),
          ConfirmedValidatorEmail('email', 'username'),
        ],
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.UserRegister.invalid) {
      return;
    }

    var userInfo = {
      firstName: this.UserRegister.value.firstName,
      lastName: this.UserRegister.value.lastName,
      loginId: this.UserRegister.value.username,
      emailId: this.UserRegister.value.email,
      contactNo: this.UserRegister.value.contactNumber,
      password: this.UserRegister.value.password,
    };

    this.loginService.register(userInfo).subscribe(
      (data) => {
        if (data.id == null) {
          this.message = 'User already exist';
        } else {
          this.message = 'detais saved';
        }
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
}
