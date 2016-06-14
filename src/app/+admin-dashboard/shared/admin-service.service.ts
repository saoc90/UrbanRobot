import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class AdminServiceService {

  public userCustomers: FirebaseListObservable<any>;
  public companies: FirebaseListObservable<any>;
  public companyObj: FirebaseListObservable<any>;

  constructor(private af: AngularFire) {

    this.userCustomers = this.af.database.list('/users');
    this.companies = this.af.database.list('/unternehmen');
    this.companyObj = this.af.database.list('/unternehmenObj');
  }

  getCompanyObjById(id: string): FirebaseListObservable<any> {
    return this.af.database.list('/unternehmenObj/' + id);
  };

}
