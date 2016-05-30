import { Component, OnInit } from '@angular/core';
import { ScanService } from '../shared/services/scan-service.service';
import { UserServiceService } from '../../shared/user-Service.service';

@Component({
  moduleId: module.id,
  selector: 'app-scan-history-list',
  templateUrl: 'scan-history-list.component.html',
  styleUrls: ['scan-history-list.component.css'],
  providers: [ScanService]
})
export class ScanHistoryListComponent implements OnInit {

  companyId: string;

  constructor(private scanService: ScanService,
    private userService: UserServiceService) {
  }

  ngOnInit() {
    this.userService.userCompany.subscribe(c =>
     this.companyId = c);

    
  }

}
