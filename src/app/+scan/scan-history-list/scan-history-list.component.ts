import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScanService } from '../shared/services/scan-service.service';
import { UserServiceService } from '../../shared/user-Service.service';
import { Observable } from 'rxjs';
import { Scan, ScanEvent, ScanListEntry } from '../shared/models/scan';
import { DataTable } from 'primeng/primeng';
import { Column } from 'primeng/primeng';
import 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-scan-history-list',
  templateUrl: 'scan-history-list.component.html',
  styleUrls: ['scan-history-list.component.css'],
  directives: [DataTable, Column]
})
export class ScanHistoryListComponent implements OnInit {

  companyId: string;
  scanHistory: Observable<ScanEvent[]>;
  amountOfScans: Observable<number>;
  scanHistoryEntries: Observable<ScanListEntry[]>;

  constructor(private scanService: ScanService,
    private userService: UserServiceService,
    private router: Router) {

    this.scanHistory = this.userService.userCompanyId.switchMap(id =>
      this.scanService.getAllScans(id)
    );

    this.scanHistory.subscribe(s =>
      console.log(s)
    );

    this.scanHistoryEntries = this.scanHistory.map(event =>
      event.map(e => new ScanListEntry(
        e.$key, e.inventory.clients.client.length, e.clientCountDiff, e.$key))
    );

    this.scanHistoryEntries.subscribe(
      s =>
      console.log(s)
    );

  }

  rowSelected(scan: ScanListEntry) {
    this.router.navigate(['/scan/detail/', {id: scan.id}]);
    console.log(scan);
  }

  ngOnInit() {

  }

}
