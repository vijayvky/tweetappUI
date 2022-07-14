import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  UserLogin: FormGroup;
  submitted = false;
  invalid: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.UserLogin = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  OnSubmit() {
    this.submitted = true;
    if (this.UserLogin.invalid) {
      console.log('invalid');
      return;
    }
    let token: any;
    this.loginService.checkUserCredentials(this.UserLogin.value).subscribe(
      (data) => {
        this.loginService.getToken().subscribe(
          (token) => {
            token = token.token;
            console.log('token from onsubmit ' + JSON.stringify(token));
            this.loginService.storeUserData(
              data.loginId,
              data.firstName,
              token
            );

            this.router.navigateByUrl('/home');
          },
          (err) => {
            alert(err.message);
          }
        );
        this.loginService.storeUserData(data.loginId, data.firstName, token);
        this.router.navigateByUrl('/home');
      },
      (error) => {
        if (error.message.includes('400')) {
          this.invalid = 'Invalid Credentials';
        } else {
          alert(error.message);
        }
      }
    );
  }
}
