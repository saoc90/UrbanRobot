import { Component, OnInit } from '@angular/core';
import { ScanService } from './shared/services/scan-service.service';
import { UserServiceService } from './../shared/user-Service.service';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, OnActivate } from '@angular/router';
import { ScanHistoryListComponent } from './scan-history-list/scan-history-list.component';
import { ScanDetailComponent } from './scan-detail/scan-detail.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

@Component({
  moduleId: module.id,
  selector: 'app-scan',
  templateUrl: 'scan.component.html',
  styleUrls: ['scan.component.css'],
  directives: [ROUTER_DIRECTIVES, ScanHistoryListComponent],
  providers: [ScanService, UserServiceService]
})
@Routes([
  {path: '', component: ScanHistoryListComponent},
  {path: '/scanHistory', component: ScanHistoryListComponent},
  {path: '/detail', component: ScanDetailComponent},
  {path: '/clientDetail', component: ClientDetailComponent}
])
export class ScanComponent implements OnInit {

  constructor() {}
  ngOnInit() {
  }
}
