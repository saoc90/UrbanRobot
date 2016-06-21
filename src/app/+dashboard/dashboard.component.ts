import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { InputText, Button, Dialog } from 'primeng/primeng';
import { ScanListComponent } from './scanlist/scanlist.component';
import { SideBarFilterComponent } from './sideBarFilter/sideBarFilter.component';
import { SystemStatus } from './shared/systemStatus'
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
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
  scans: number;
  systemLoad: string;
  errors: string;
  status: Observable<SystemStatus>;
  userRole: string = '';
  unitCountOverTime: Observable<any>;
  historyTitle: string;
  options: Object;
  errorPercentage: string = "100";

  constructor(private af: AngularFire,
    private provider: UserServiceService,
    private router: Router,
    private scanService: ScanService) {
    this.historyTitle = 'units history';
    this.unitCountOverTime = this.provider.userCompanyId.switchMap(id =>
      this.scanService.getAllScans(id).map(
        scan => scan.map(
          event => [+event.$key * 1000, event.inventory.clients.client.length])
      ));
    this.unitCountOverTime.subscribe(c => {
      this.options = {
        title: { text: 'Unit history' },
        series: [{
          name: 'Units',
          data: c
        }]
      };
    });
    // rovider.userRole.subscribe( u => this.userRole = u );
  }

  ngOnInit() {

    this.provider.userCompanyId.distinctUntilChanged()
      .switchMap(company =>
        this.af.database.object('/unternehmenObj/' + company + '/systemStatus')
      ).subscribe(systemStatus => this.setDashboardValues(systemStatus));

    this.provider.userCompanyId.distinctUntilChanged()
      .switchMap(company =>
        this.af.database.object('/unternehmenObj/' + company)
      ).subscribe((systemStatus: any) => {
        this.systemLoad = systemStatus.scanRequested == 1 ? '100%' : '0%';
        this.errors = "" + Object.keys(systemStatus.scandata).filter(s =>
          systemStatus.scandata[s].hasFailed
        ).length;
        this.errorPercentage = ((+this.errors) / (+this.scans) * 100).toFixed(2);
      }
      );
    this.provider.userCompanyId.distinctUntilChanged()
      .switchMap(company =>
        this.af.database.list('/unternehmenObj/' + company + '/scandata').distinctUntilChanged()
      ).subscribe((obj: any) =>
        this.scans = obj.length
      );
  }

  setDashboardValues(status: any) {
    this.systemStatus = status.systemStatus;
    this.errors = status.scanErrors;
    this.systemLoad = status.systemLoad;
  }

  routerOnActivate() {
    if (!this.provider.isLogedIn()) {
      this.router.navigateByUrl('/login');
    }
  }

}
