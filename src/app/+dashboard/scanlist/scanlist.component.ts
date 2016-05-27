import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Scan } from "../shared/scan";
import { ScanService, Client } from "../shared/scanService";
import {DataTable} from 'primeng/primeng';
import {Column} from 'primeng/primeng';
import {SideBarFilterComponent} from "../sideBarFilter/sideBarFilter.component";
import { FirebaseListObservable } from 'angularFire2';
import { Observable } from 'rxjs';
import { UserServiceService } from './../../shared/user-service.service'; 
import 'firebase';


@Component({
    selector: 'scanList',
    templateUrl: "/app/+dashboard/scanlist/scanlist.component.html",
    providers: [ScanService],
    directives: [DataTable, Column, SideBarFilterComponent] 
})
export class ScanListComponent implements OnInit {
    
    public scans: Client[] = 
    [
        {
            name: "",
            applications: "",
            cpu: "",
            nics: "",
            printers: "",
            os: ""
        }
    ];

    public columnState:any = [{"name":"name", "checked":true},
                        {"name":"applications", "checked":true},
                        {"name":"nics", "checked":true},
                        {"name":"printers", "checked":true},
                        {"name":"os", "checked":true},
                        {"name":"cpu", "checked":true}
                        ];
                        
    
    constructor(private scanService: ScanService, private userService: UserServiceService) {
        this.columnState = [{"name":"name", "checked":true},
                        {"name":"applications", "checked":true},
                        {"name":"nics", "checked":true},
                        {"name":"printers", "checked":true},
                         {"name":"os", "checked":true},
                          {"name":"cpu", "checked":true}
                        ];
     }

    ngOnInit() { 
        this.userService.userCompany.subscribe(
            userCompany =>
                this.scanService.getAllScans(userCompany).subscribe(a =>
                    this.scans = a)
        );
    }
    
    onFilterChange(value:[any]){
       this.columnState = value; 
    }
    

}