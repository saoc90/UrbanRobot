import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  
  private username: string;
  private password: string;
  
  constructor(private userService :UserServiceService) {}

  ngOnInit() {
  }

  doLogin(){
    this.userService.login(this.username, this.password);
    this.userService.userInfoRef.subscribe(user => {
      if(user){
        console.log("user is now logged in", user);
      }
    });
  }
}
