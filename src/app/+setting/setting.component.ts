import { Component, OnInit } from '@angular/core';
import { OnActivate } from '@angular/router';
import { UserServiceService } from '../shared/user-service.service'
import { AngularFire, FirebaseObjectObservable } from "angularfire2";
import { Observable } from "rxjs";

@Component({
  moduleId: module.id,
  selector: 'app-setting',
  templateUrl: 'setting.component.html',
  styleUrls: ['setting.component.css']
})
export class SettingComponent implements OnInit {
  
  constructor(private userservice : UserServiceService) {}

  ngOnInit() {
   
  }

}
