import { Component, OnInit } from '@angular/core';
import { OnActivate } from '@angular/router';
import { UserServiceService } from '../shared/user-service.service'
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';2
import { Observable } from "rxjs";
import {MaterializeDirective} from 'angular2-materialize';

@Component({
  moduleId: module.id,
  selector: 'app-setting',
  directives: [MaterializeDirective],
  templateUrl: 'setting.component.html',
  styleUrls: ['setting.component.css']
})
export class SettingComponent implements OnInit {
  private error: string = null;
   passwordA: string = "";
   passwordB: string = "";
   email: string = "";
   userRole: string = "";
   isAdmin: boolean = false;
  
  constructor(private userservice : UserServiceService,private af: AngularFire) {
    
  }

  ngOnInit() {
    this.af.object("/users/" + this.userservice.uid + "/role")
      .subscribe(role => {
        if(role=="admin"){
          this.isAdmin = true;
        } else {
          this.isAdmin =false; 
        }
      });
  }

  createUser(){
    if(this.passwordA != this.passwordB){
      this.error = "Please Check Password";
      return;
    } else {
      this.error = null;
    }
    var uid = this.userservice.uid;
    var company = this.af.object("/users/" + uid + "/company");
    company.subscribe(company => {
      this.userservice.createUser(this.email, this.passwordA, company, this.userRole)
        .then(() => {
          this.email = "";
          this.passwordA = "";
          this.passwordB = "";
          this.userRole = "";
          this.error = "";
        }).catch(error => this.error = error.message);
    });
    
    
  }

}
