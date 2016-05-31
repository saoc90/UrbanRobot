import { Scan, ScanEvent } from '../models/scan';
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
}
