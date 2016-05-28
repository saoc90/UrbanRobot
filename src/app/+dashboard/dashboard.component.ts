import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { InputText, Button, Dialog } from 'primeng/primeng';
import { ScanListComponent } from "./scanlist/scanlist.component";
import { SideBarFilterComponent } from "./sideBarFilter/sideBarFilter.component";
import { SystemStatus } from './shared/systemStatus'
import { AngularFire, FirebaseObjectObservable } from "angularfire2";
import { Observable } from "rxjs";
import { UserServiceService } from '../shared/user-service.service';
import { Router, OnActivate } from '@angular/router';

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+dashboard/dashboard.component.html',
  styleUrls: ['app/+dashboard/dashboard.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, InputText, Button, Dialog, SideBarFilterComponent, ScanListComponent]
})
export class DashboardComponent implements OnActivate, OnInit {
  systemStatus: string = "hello";
  scans: string;
  systemLoad: string;
  errors: string;
  status: Observable<SystemStatus>;
  userRole: string = "";

  constructor(private af: AngularFire, private provider: UserServiceService, private router: Router) {
    
    //rovider.userRole.subscribe( u => this.userRole = u );
  }

  ngOnInit() {
    this.provider.userCompany.subscribe(company =>
      this.af.database.object("/unternehmenObj/" + company + "/systemStatus")
        .subscribe(systemStatus => this.setDashboardValues(systemStatus))

    );
  }

  setDashboardValues(status: any) {
    this.systemStatus = status.systemStatus;
    this.errors = status.scanErrors;
    this.systemLoad = status.systemLoad;
    this.scans = status.scans;
  }

  routerOnActivate() {
    if (!this.provider.isLogedIn()) {
      this.router.navigateByUrl("/login");
    }
  }

}
