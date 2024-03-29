import { Component, OnInit } from '@angular/core';
import { OnActivate, RouteSegment, Router } from '@angular/router';
import { Scan, ScanEvent, ScanListEntry } from '../shared/models/scan';
import { ScanService } from '../shared/services/scan-service.service';
import { UserServiceService } from '../../shared/user-Service.service';
import { Observable } from 'rxjs/Rx';
import { Client } from '../shared/models/client';
import { DataTable } from 'primeng/primeng';
import { Column } from 'primeng/primeng';


@Component({
  moduleId: module.id,
  selector: 'app-scan-detail',
  templateUrl: 'scan-detail.component.html',
  styleUrls: ['scan-detail.component.css'],
  directives: [DataTable, Column]
})
export class ScanDetailComponent implements OnInit, OnActivate {

  curSegment: RouteSegment;
  id: string;
  public scan: Observable<ScanEvent> = null;

  constructor(private userService: UserServiceService,
    private scanService: ScanService,
    private router: Router) {
  }

  ngOnInit() {
  }

  routerOnActivate(curr: RouteSegment) {
    this.curSegment = curr;
    console.log('route params: ', curr.getParam('id'));
    this.id = curr.getParam('id');
    this.scan = <Observable<ScanEvent>>this.userService.userCompanyId.switchMap(id =>
      this.scanService.getScanById(id, curr.getParam('id')));
    this.scan.subscribe(e => console.log(e));
  }

  rowSelected(client: Client) {
    this.scan.map(s =>
      s.inventory.clients.client.findIndex(c => c.sid === client.sid)
    ).subscribe(index => {
      this.router.navigate(['/scan/clientDetail/', { id: index, scanId: this.id }]);
      console.log('Selected to following client: ', client);
      console.log('Selected to following index: ', index);
    }
      );

  }

}
