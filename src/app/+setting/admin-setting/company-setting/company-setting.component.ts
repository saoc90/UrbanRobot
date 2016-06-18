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
    this.userservice.removeUser(user);
  }

  SaveUserChanges(user){
    this.userservice.updateUser(user);
  }

   resetPassword(user){
    this.userservice.resetPassword(user.email);
  }

}
