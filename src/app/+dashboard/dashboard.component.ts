import { Component, OnInit } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {InputText,Button,Dialog} from 'primeng/primeng';

import {ScanListComponent} from "./scanlist.component";
import {SideBarFilterComponent} from "./sideBarFilter.component";

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+dashboard/dashboard.component.html',
  styleUrls: ['app/+dashboard/dashboard.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, InputText, Button, Dialog, SideBarFilterComponent, ScanListComponent]
})
export class DashboardComponent {
  newName: string;
  constructor() {}

}
