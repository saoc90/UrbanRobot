import { Component, OnInit } from '@angular/core';
import { CompanySettingComponent } from './company-setting/company-setting.component';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';



@Component({
  moduleId: module.id,
  selector: 'adminSetting',
  templateUrl: 'admin-setting.component.html',
  styleUrls: ['admin-setting.component.css'],
  directives: [CompanySettingComponent]
})
export class AdminSettingComponent implements OnInit {

  companyList: FirebaseListObservable<any>

  constructor(private af: AngularFire) {}

  ngOnInit() {
    this.getAllCompanys();
  }

  getAllCompanys(){
    this.companyList = this.af.database.list('/unternehmen')
  }

}
