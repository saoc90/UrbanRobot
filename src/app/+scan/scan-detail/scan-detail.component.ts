import { Component, OnInit } from '@angular/core';
import { OnActivate, RouteSegment } from '@angular/router';
import { Scan, ScanEvent, ScanListEntry } from '../shared/models/scan';
import { ScanService } from '../shared/services/scan-service.service';
import { UserServiceService } from '../../shared/user-Service.service';
import { Observable } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-scan-detail',
  templateUrl: 'scan-detail.component.html',
  styleUrls: ['scan-detail.component.css'],
  providers: [UserServiceService, ScanService]
})
export class ScanDetailComponent implements OnInit, OnActivate {

  curSegment: RouteSegment;
  id: string;
  public scan: Observable<ScanEvent>;

  constructor(private userService: UserServiceService, private scanService: ScanService) {

  }

  ngOnInit() {
  }

  routerOnActivate(curr: RouteSegment) {
    this.curSegment = curr;
    console.log('route params: ', curr.getParam('id'));
    this.id = curr.getParam('id');
    this.scan = this.userService.userCompanyId.switchMap(id =>
    this.scanService.getScanById(id, curr.getParam('id')));
    this.scan.subscribe(e => console.log(e));
  }

}
