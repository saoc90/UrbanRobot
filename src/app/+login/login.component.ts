import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../shared/user-service.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  private username: string;
  private password: string;
  private loginInvalid: string;
  private errorForgotPassword: string;
  private successForgotPassword: string;
  private emailOfPassworedForgotten: string;

  constructor(private userService: UserServiceService,
    private router: Router) { }

  ngOnInit() {
    this.resetEntries();
  }

  register() {
    this.router.navigateByUrl('/register');
  }

  doLogin() {
    this.userService.login(this.username, this.password, this)
      .then(aut => {
        this.userService.userUid.subscribe(user => {
          if (user) {
            this.loginInvalid = null;

            console.log('user is now logged in', user);
          } else {
            this.loginInvalid = 'Wrong email or password';
          }
        },
          error => console.error(error));
      });
}

  routeToDashboard(){
      this.resetEntries();
      this.router.navigateByUrl('/dashboard');
  }

  forgotPassword() {
    if (this.emailOfPassworedForgotten) {
      this.userService.resetPassword(this.emailOfPassworedForgotten)
        .then(() => {
          this.resetEntries();
          this.successForgotPassword = 'Password reset email sent successfully!';
        })
        .catch((error) => {
          console.error(error);
          this.errorForgotPassword = 'check your email';
        });
    } else {
      this.errorForgotPassword = 'Please enter your email';
    }
  }

  resetEntries() {
    this.errorForgotPassword = '';
    this.successForgotPassword = '';
    this.loginInvalid = '';
  }
}
