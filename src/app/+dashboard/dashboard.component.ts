import { Component, OnInit } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {InputText, Button, Dialog} from 'primeng/primeng';

import {ScanListComponent} from "./scanlist/scanlist.component";
import {SideBarFilterComponent} from "./sideBarFilter/sideBarFilter.component";
import { SystemStatus } from './shared/systemStatus'
import { AngularFire, FirebaseObjectObservable } from "angularfire2";
import { Observable } from "rxjs";
import { UserServiceService } from '../shared';
import { Router, OnActivate } from '@angular/router';

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+dashboard/dashboard.component.html',
  styleUrls: ['app/+dashboard/dashboard.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, InputText, Button, Dialog, SideBarFilterComponent, ScanListComponent]
})
export class DashboardComponent implements OnActivate {
  systemStatus: string = "hello";
  scans: string;
  systemLoad: string;
  errors: string;
  status: Observable<SystemStatus>;
  userRole: string = "";

  constructor(af: AngularFire, private provider: UserServiceService, private router: Router) {
    this.status = af.database.object("/unternehmen/unternhmen1/systemStatus");
    this.status.subscribe(status => {
      this.systemStatus = status.systemStatus;
      this.errors = status.scanErrors;
      this.systemLoad = status.systemLoad;
      this.scans = status.scans;
    });



    //provider.userRole.subscribe( u => this.userRole = u );
  }

  routerOnActivate() {
      if(!this.provider.isLogedIn()){
        this.router.navigateByUrl("/login");
      }
  }

}
