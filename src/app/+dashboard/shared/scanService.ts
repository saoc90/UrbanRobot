import {Scan} from "./scan";
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from "angularfire2";
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
    
    clientList: FirebaseListObservable<Client[]>;
    
    constructor(private af: AngularFire) { }
    getAllScans(companyId: string): Observable<any> {
        var id = "Muster AG";
        this.clientList = this.af.database.list('/unternehmenObj/' + id + '/lastScan');
        var mappedClients = this.clientList.map(
            clientArray => 
                clientArray.map(client => {
                   return {
                        name: client.name,
                        applications: client.applications.app.length,
                        nics: client.nics.nic.length,
                        printers: client.printers.printer.length
                    }
                })
            
        );
        
        mappedClients.subscribe(value => console.log(value));
        return mappedClients;
    }
}

export interface Client {
    name: string;
    applications: any;
    cpu: any;
    nics: any;
    os: any;
    printers: any;
}