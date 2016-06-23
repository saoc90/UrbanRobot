import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ScanService } from './../shared/scanService';
import { Client } from '../../+scan/shared/models/client';
import { DataTable } from 'primeng/primeng';
import { Column } from 'primeng/primeng';
import { SideBarFilterComponent } from '../sideBarFilter/sideBarFilter.component';
import { FirebaseListObservable } from 'angularFire2';
import { Observable } from 'rxjs';
import { UserServiceService } from './../../shared/user-service.service';



@Component({
    moduleId: module.id,
    selector: 'scanList',
    styleUrls: ['/app/+dashboard/scanlist/scanlist.component.css'],
    templateUrl: '/app/+dashboard/scanlist/scanlist.component.html',
    providers: [ScanService],
    directives: [DataTable, Column, SideBarFilterComponent]
})
export class ScanListComponent implements OnInit {

    public scans: Client[] =
    [
        {
            name: '',
            applications: '',
            cpu: '',
            nics: '',
            printers: '',
            os: '',
            sid: '',
            ram: 0
        }
    ];

    public columnState: any = [{ 'name': 'name', 'checked': true },
        { 'name': 'sid', 'checked': true },
        { 'name': 'applications', 'checked': true },
        { 'name': 'ipv4', 'checked': true },
        { 'name': 'sid', 'checked': true },
        { 'name': 'nics', 'checked': false },
        { 'name': 'printers', 'checked': true },
        { 'name': 'os', 'checked': true },
        { 'name': 'cpu', 'checked': false },
        { 'name': 'ram', 'checked': false }
    ];

    constructor(private scanService: ScanService, private userService: UserServiceService) {
        this.columnState = [{ 'name': 'name', 'checked': true },
            { 'name': 'sid', 'checked': true },
            { 'name': 'applications', 'checked': true },
            { 'name': 'ipv4', 'checked': true },
            { 'name': 'sid', 'checked': true },
            { 'name': 'nics', 'checked': false },
            { 'name': 'printers', 'checked': true },
            { 'name': 'os', 'checked': true },
            { 'name': 'cpu', 'checked': false },
            { 'name': 'ram', 'checked': false }
        ];
    }

    ngOnInit() {
        this.userService.userCompanyId.subscribe(
            userCompany =>
                this.scanService.getAllScans(userCompany).subscribe(a =>
                    this.scans = a)
        );
    }

    onFilterChange(value: [any]) {
        this.columnState = value;
    }


}
