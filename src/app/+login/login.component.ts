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
  private notValid: string;
  
  constructor(private userService :UserServiceService, private router: Router) {}

  ngOnInit() {

  }


  doLogin(){
    this.userService.login(this.username, this.password);
    this.userService.userUid.subscribe(user => {
      if(user){
        this.notValid = null;
        console.log("user is now logged in", user);
        this.router.navigateByUrl('/dashboard');
      } else {
        this.notValid = "Wrong email or password";
      }
    }, 
    error => console.error(error));
  }
}
