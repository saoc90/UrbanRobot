import { Component, OnInit ,Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { MaterializeDirective } from 'angular2-materialize';
import { UserServiceService } from '../../../shared/user-service.service';

@Component({
  moduleId: module.id,
  selector: 'companySetting',
  templateUrl: 'company-setting.component.html',
  styleUrls: ['company-setting.component.css'],
  directives: [ MaterializeDirective ]
})
export class CompanySettingComponent implements OnInit {

  @Input () companyID: string;

  userList: FirebaseListObservable<any>

  constructor(private af :AngularFire,
              private userservice: UserServiceService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userList = this.af.database.list('/unternehmen/' + this.companyID + '/users', {
      query : {
        orderByChild: 'name' 
      }
    });
  }

    deleteUser(user){
    const userToDelete = this.af.database.object('/unternehmen/' + this.companyID + '/users/' + user.uid);
    userToDelete.update({
      isDeleted : true
    });
  }

  resetUser(user){
    const userToDelete = this.af.database.object('/unternehmen/' + this.companyID + '/users/' + user.uid);
    userToDelete.update({
      isDeleted : false
    });
  }

  SaveUserChanges(user){
       const userToDelete = this.af.database.object('/unternehmen/' + this.companyID + '/users/' + user.uid);
    userToDelete.update({
      role: user.role
    });
    const userNode = this.af.database.object('/users/' + user.uid);
    userNode.update({
      role: user.role
    })
  }

   resetPassword(user){
    this.userservice.resetPassword(user.email);
  }

}
