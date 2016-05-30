import { Scan } from '../models/scan';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import 'rxjs/operator';

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
    getAllScans(companyId: string){

    }
}
