import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  submitMessage: string;

  constructor(
    private routerservice: RouterService,
    private authservice: AuthenticationService
  ) {}
  ngOnInit() {
    this.submitMessage = '';
  }
  loginSubmit() {
    this.authservice
      .authenticateUser({
        username: this.username.value,
        password: this.password.value,
      })
      .subscribe(
        (res) => {
          this.authservice.setBearerToken(res['token']);
          this.routerservice.routeToDashboard();
        },
        (err) => {
          if (err.error) {
            this.submitMessage = err.error.message;
          } else {
            this.submitMessage = err.message;
          }
        }
      );
  }
}
