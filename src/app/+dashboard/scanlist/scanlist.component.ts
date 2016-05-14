import { Component, OnInit } from '@angular/core';
import { Scan } from "../shared/scan";
import { ScanService } from "../shared/scanService";
import {DataTable} from 'primeng/primeng';
import {Column} from 'primeng/primeng';
import {SideBarFilterComponent} from "../sideBarFilter/sideBarFilter.component";


@Component({
    selector: 'scanList',
    templateUrl: "/app/+dashboard/scanlist/scanlist.component.html",
    providers: [ScanService],
    directives: [DataTable, Column, SideBarFilterComponent] 
})
export class ScanListComponent implements OnInit {
    
    public scans: Array<Scan>;
    public columnState:any = [{"name":"name", "checked":true},
                        {"name":"sid", "checked":true}];
    
    constructor(private scanService: ScanService) {
        this.columnState = [{"name":"name", "checked":true},
                        {"name":"sid", "checked":true}];
     }

    ngOnInit() { 
        this.scans = this.scanService.getAllScans();
    }
    
    onFilterChange(value:[any]){
       this.columnState = value; 
    }
    

}