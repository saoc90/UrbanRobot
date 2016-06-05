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
       return this.af.list('/unternehmenObj/' + companyId + '/scandata');
    }

    getScanById(companyId: string, scanId: string): Observable<ScanEvent> {
        return this.af.object('/unternehmenObj/' + companyId + '/scandata/' + scanId);
    }

    getClientByIndex(companyId: string, scanId: string, index: string): Observable<Client> {
       return this.af.object('/unternehmenObj/'
       + companyId
       + '/scandata/'
       + scanId
       + '/inventory/clients/'
       + index
       );
    }
}
