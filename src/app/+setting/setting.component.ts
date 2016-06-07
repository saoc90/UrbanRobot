import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../shared/user-service.service';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
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
   passwordA: string = '';
   passwordB: string = '';
   email: string = '';
   userRole: string = '';
   isAdmin: boolean = false;
   userList: Observable<any[]>;

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
    //var companyID = this.userservice.userCompanyId;
    //return companyID.switchMap(id => this.af.list('/unternehmen/' + id + '/users'));
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
