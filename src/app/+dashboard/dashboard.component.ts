import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { InputText, Button, Dialog } from 'primeng/primeng';
import { ScanListComponent } from './scanlist/scanlist.component';
import { SideBarFilterComponent } from './sideBarFilter/sideBarFilter.component';
import { SystemStatus } from './shared/systemStatus'
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { UserServiceService } from '../shared/user-service.service';
import { Router, OnActivate } from '@angular/router';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import { UnitHistoryChartComponent } from './unit-history-chart/unit-history-chart.component';
import { ScanService } from '../+scan/shared/services/scan-service.service';


@Component({
  selector: 'sd-home',
  templateUrl: 'app/+dashboard/dashboard.component.html',
  styleUrls: ['app/+dashboard/dashboard.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, InputText,
   Button, Dialog, SideBarFilterComponent, ScanListComponent,
   UnitHistoryChartComponent],
   providers: [ScanService]
})
export class DashboardComponent implements OnActivate, OnInit {
  systemStatus: string = 'hello';
  scans: string;
  systemLoad: string;
  errors: string;
  status: Observable<SystemStatus>;
  userRole: string = '';
  unitCountOverTime: Observable<any>;
  historyTitle: string;
  options: Object;

  constructor(private af: AngularFire,
  private provider: UserServiceService,
  private router: Router,
  private scanService: ScanService) {
    this.historyTitle = 'units history';
    this.unitCountOverTime = this.provider.userCompanyId.switchMap(id =>
      this.scanService.getAllScans(id).map(
        scan => scan.map(
          event => [ +event.$key , event.inventory.clients.client.length])
    ));
      this.unitCountOverTime.subscribe(c =>  {this.options = {
      title: { text: 'Unit history'},
      series: [{
        name: 'Units',
        data: c
      }]
    };
    console.log(c);
  });
    // rovider.userRole.subscribe( u => this.userRole = u );
  }

  ngOnInit() {

    this.provider.userCompanyId.distinctUntilChanged()
      .switchMap(company =>
        this.af.database.object('/unternehmenObj/' + company + '/systemStatus')
      ).subscribe(systemStatus => this.setDashboardValues(systemStatus));
  }

  setDashboardValues(status: any) {
    this.systemStatus = status.systemStatus;
    this.errors = status.scanErrors;
    this.systemLoad = status.systemLoad;
    this.scans = status.scans;
  }

  routerOnActivate() {
    if (!this.provider.isLogedIn()) {
      this.router.navigateByUrl('/login');
    }
  }

}
