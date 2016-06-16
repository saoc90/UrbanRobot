import { Scan, ScanEvent } from '../models/scan';
import { Client } from '../models/client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';

@Injectable()
export class ScanService {
    private scans: Array<Scan> =
    [
        new Scan(),
        new Scan(),
        new Scan(),
        new Scan(),
        new Scan()
    ];


    constructor(private af: AngularFire) { }

    getAllScans(companyId: string): Observable<ScanEvent[]> {
       return  this.af.database.list('/unternehmenObj/' + companyId + '/scandata');
    }

    getScanById(companyId: string, scanId: string): Observable<ScanEvent> {
        return  this.af.database.object('/unternehmenObj/' + companyId + '/scandata/' + scanId);
    }

    getScanRequest(companyId: string): Observable<number> {
        return  this.af.database.object('/unternehmenObj/' + companyId + '/scanRequested/');
    }

    setScanRequest(companyId: string): Promise<void> {
        let scanRequest =
            this.af.database.object('/unternehmenObj/' + companyId + '/scanRequested/');
        return scanRequest.set(1);
    }

    getClientByIndex(companyId: string, scanId: string, index: string): Observable<Client> {
       return this.af.database.object('/unternehmenObj/'
       + companyId
       + '/scandata/'
       + scanId
       + '/inventory/clients/client/'
       + index
       ).map((c: Client) => this.mapArraysOfClient(c));
    }

    mapArraysOfClient(client: Client): Client {

        if (!Array.isArray(client.applications.app)) {
            var application = client.applications.app;
            client.applications.app = [application];
        }

        if (!Array.isArray(client.nics.nic)) {
            var nic = client.nics.nic;
            client.nics.nic = [nic];
        }

        return client;
    }
}
