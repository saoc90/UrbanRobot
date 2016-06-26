import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../shared/user-service.service';
import { Router } from '@angular/router';
import {MaterializeDirective} from 'angular2-materialize';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  directives: [MaterializeDirective],
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userservice: UserServiceService,
            private router: Router) {}

  ngOnInit() {
  }
  
  email:string = '';
  passwordA: string = '';
  passwordB: string = '';
  company:string = '';
  error:string = '';
  
  public register(){
    if(!this.checkPassword()){
      return;
    }
    if(!this.company){
      return;
    }
    this.userservice.createANewUser(this.email, this.passwordA, this.company)
      .then(e => {
        this.router.navigateByUrl("/login"); 
        this.userservice.logout();
      }, error => this.error = error.text || error);
      
    
    
    this.error = '';
  }
    
  
  
  private checkPassword():boolean{
     if(this.passwordA!=this.passwordB){
      this.error = 'Please check your password.';
      this.erasePasswords();
      return false;
     }
     if(this.passwordA.length<6){
       this.erasePasswords();
       this.error = 'Password must contain at least 6 character.';
     }
     return true;
  }
  
  private erasePasswords(){
    this.passwordA = '';
    this.passwordB = '';
  }
  
}
