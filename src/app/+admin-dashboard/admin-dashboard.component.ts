import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from './shared/admin-service.service';
import { DataTable } from 'primeng/primeng';
import { Column } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/mergeMap';

@Component({
  moduleId: module.id,
  selector: 'app-admin-dashboard',
  templateUrl: 'admin-dashboard.component.html',
  styleUrls: ['admin-dashboard.component.css'],
  providers: [AdminServiceService],
  directives: [DataTable, Column]
})
export class AdminDashboardComponent implements OnInit {

  private customerUsers: number;
  private companies: number;
  private systemHealth: string = 'healthy' || 'faulty';
  private systemLoad: string = 'idle' || 'busy' || 'gasping' || 'gonna die';
  private devicesCompany: Observable<any>;

  constructor(private adminService: AdminServiceService) {

    this.adminService.userCustomers.subscribe(users =>
      this.customerUsers = users.length
    );

    this.adminService.companies.subscribe(companies =>
      this.companies = companies.length
    );

    this.devicesCompany = this.adminService.companies.zip(
      this.adminService.companyObj)
      .map(arr => {
        var count = 0;
        var companies = arr[0];
        var companyObj = arr[1];
        var combined = [];
        companies.forEach((company: any, index: number, array: any[]) =>
          combined.push(
            {
              name: company.name,
              devices: companyObj[index].lastScan.inventory != null ? companyObj[index].lastScan.inventory.clients.client.length : 0
            }
          )
        );
        return combined;
      }
      );
    this.devicesCompany.subscribe(s => console.log(s));

  }

  ngOnInit() {
  }

}