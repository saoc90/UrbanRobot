import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../shared/user-service.service'
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';2
import { Observable } from "rxjs";
import {MaterializeDirective} from 'angular2-materialize';
import { Router, OnActivate } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-setting',
  directives: [MaterializeDirective],
  templateUrl: 'setting.component.html',
  styleUrls: ['setting.component.css']
})
export class SettingComponent implements OnInit, OnActivate {
  private error: string = null;
   passwordA: string = "";
   passwordB: string = "";
   email: string = "";
   userRole: string = "";
   isAdmin: boolean = false;
   userList: Observable<any[]>;
  
constructor(private userservice: UserServiceService,
            private af: AngularFire,
            private router: Router) { }

  routerOnActivate() {
      if(!this.userservice.isLogedIn()){
        this.router.navigateByUrl("/login");
      }
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
      this.getUserList();
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
  
  getUserList(){
    this.af.object("/users/" + this.userservice.uid + "/company")
        .subscribe(company => this.getUsersInMyCompany(company));
  }
  
  private getUsersInMyCompany(company: any){
    this.userList = this.af.list('/users', {
      query: {
        orderByChild: 'company',
        equalTo: company,
      }
    });
  }

  deleteUser(user){
    console.log(user);
  }
  
  SaveUserChanges(user){
    console.log(user);
  }
}
