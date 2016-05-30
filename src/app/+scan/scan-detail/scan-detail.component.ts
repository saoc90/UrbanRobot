import { Component, OnInit } from '@angular/core';
import { OnActivate, RouteSegment } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-scan-detail',
  templateUrl: 'scan-detail.component.html',
  styleUrls: ['scan-detail.component.css']
})
export class ScanDetailComponent implements OnInit, OnActivate {

  curSegment: RouteSegment;
  id: number;

  constructor() {}

  ngOnInit() {
  }

  routerOnActivate(curr: RouteSegment) {
    this.curSegment = curr;

    this.id = +curr.getParam('id');
  }

}
