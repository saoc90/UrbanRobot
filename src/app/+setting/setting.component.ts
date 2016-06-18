import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../shared/user-service.service';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import {MaterializeDirective} from 'angular2-materialize';
import { Router, OnActivate } from '@angular/router';
import { AdminSettingComponent } from './admin-setting/admin-setting.component';

@Component({
  moduleId: module.id,
  selector: 'app-setting',
  directives: [MaterializeDirective],
  templateUrl: 'setting.component.html',
  styleUrls: ['setting.component.css']
})
export class SettingComponent implements OnInit, OnActivate {
  private error: string = null;
   passwordA: string = '';
   passwordB: string = '';
   email: string = '';
   userRole: string = '';
   isAdmin: boolean = false;
   userList: Observable<any[]>;

   // Var for change Password:
   private oldPassword: string;
   private newPasswordA: string;
   private newPasswordB: string;
   private passwordError: string;
   private passwordSuccess: string;

constructor(private userservice: UserServiceService,
            private af: AngularFire,
            private router: Router) { }

  routerOnActivate() {
      if (!this.userservice.isLogedIn()) {
        this.router.navigateByUrl('/login');
      }
  }

  ngOnInit() {
      this.userservice.userInfoRef.subscribe(user => this.isAdmin = user.role == 'admin');
      this.userList = this.getUserList();
      this.passwordError = '';
      this.passwordSuccess = '';
  }

  changePassword() {
    this.passwordError = '';
    this.passwordSuccess = '';
    if (this.newPasswordA != this.newPasswordB) {
      this.passwordError = 'Please Check Password';
      return;
    }
    if (!this.newPasswordA || this.newPasswordA.length < 6) {
      this.passwordError = 'password must be at least 6 characters';
      return;
    }
    this.userservice.changePassword(this.oldPassword, this.newPasswordA)
      .then(e => {
        this.passwordSuccess = 'Password changed';
      })
      .catch(error => this.passwordError = error.text || error);
      this.clearPasswordFields();
  }

  clearPasswordFields() {
    this.newPasswordA = '';
    this.newPasswordB = '';
    this.oldPassword = '';
  }

  createUser() {
    if (this.passwordA != this.passwordB) {
      this.error = 'Please Check Password';
      return;
    } else {
      this.error = null;
    }
    var uid = this.userservice.uid;

      this.userservice.createUser(this.email, this.passwordA, this.userRole)
        .then(() => {
          this.email = '';
          this.passwordA = '';
          this.passwordB = '';
          this.userRole = '';
          this.error = '';
        }).catch(error => this.error = error.message);
  }

  getUserList(){
    return this.af.database.list('/unternehmen/' + this.userservice.companyId + '/users' , {
      query : {
        orderByChild: 'isDeleted',
        equalTo: false
      }
    } );
  }

  deleteUser(user){
    console.log(user , 'In Delete User');
    this.userservice.removeUser(user);
  }

  SaveUserChanges(user){
    this.userservice.updateUser(user);
  }
}
