import { Component, OnInit } from '@angular/core';
import { Router, OnActivate, RouteSegment } from '@angular/router';
import { Client } from '../shared/models/client';
import {ScanService} from "../shared/services/scan-service.service";
import { UserServiceService } from '../../shared/user-Service.service';
import { Observable } from 'rxjs/Rx';
import { DataTable } from 'primeng/primeng';
import { Column } from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'app-client-detail',
  templateUrl: 'client-detail.component.html',
  styleUrls: ['client-detail.component.css'],
  directives: [DataTable, Column]
})
export class ClientDetailComponent implements OnInit, OnActivate {

  curSegment: RouteSegment;
  client: Observable<Client>;
  clientObj: Client;
  scanId: string;
  clientId: string;

  constructor(private scanService: ScanService, private userService: UserServiceService) {

  }

  ngOnInit() {
  }

  routerOnActivate(curr: RouteSegment) {
    this.curSegment = curr;
    this.scanId = curr.getParam('scanId');
    this.clientId = curr.getParam('id');
    console.log('route params: ', curr.getParam('id'));
    this.client = <Observable<Client>>this.userService.userCompanyId.switchMap(id =>
      this.client = this.scanService.getClientByIndex(id, this.scanId, this.clientId));
    this.client.subscribe(c => this.clientObj = c);
  }

}
