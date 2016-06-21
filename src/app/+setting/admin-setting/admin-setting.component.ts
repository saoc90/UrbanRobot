import { Component, OnInit } from '@angular/core';
import { CompanySettingComponent } from './company-setting/company-setting.component';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { UserServiceService } from '../../shared/user-service.service';



@Component({
  moduleId: module.id,
  selector: 'adminSetting',
  templateUrl: 'admin-setting.component.html',
  styleUrls: ['admin-setting.component.css'],
  directives: [CompanySettingComponent]
})
export class AdminSettingComponent implements OnInit {

  companyList: FirebaseListObservable<any>
  adminUsers: FirebaseListObservable<any>

  constructor(private af: AngularFire,
              private userservice: UserServiceService) {}

email: string = '';
passwordA: string = '';
passwordB: string = '';
error: string = '';

  ngOnInit() {
    this.getAllCompanys();
    this.adminUsers = this.af.database.list('/admins' , {
      query : {
        orderByChild: 'isDeleted',
        equalTo: false
      }
    });
  }

  getAllCompanys(){
    this.companyList = this.af.database.list('/unternehmen');
  }

createUser() {
    if (this.passwordA != this.passwordB) {
      this.error = 'Please Check Password';
      return;
    } else {
      this.error = null;
    }
    var uid = this.userservice.uid;

      this.userservice.createAdministrator(this.email, this.passwordA, 'administrator')
        .then(() => {
          this.email = '';
          this.passwordA = '';
          this.passwordB = '';
          this.error = '';
        }).catch(error => this.error = error.message);
  }

  toggleUser(user: any){
    const admin = this.af.database.object('/admins/' + user.uid);
    admin.update({
      isDeleted: !user.isDeleted
    });
    const company = this.af.database.object('/unternehmen/' + this.userservice.companyId + '/users/' + user.uid);
    company.update({
      isDeleted: !user.isDeleted
    })
  }

  resetPassword(user: any){
    this.userservice.resetPassword(user.email);
  }

  toggleCompany(company){
    const comp = this.af.database.object('/unternehmen/' + company.id );
    comp.update({
      isDeactivated: !company.isDeactivated
    })
  }

}