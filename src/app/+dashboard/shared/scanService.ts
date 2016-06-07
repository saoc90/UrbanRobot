import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import 'rxjs/operator';
import { Client } from '../../+scan/shared/models/client';

@Injectable()
export class ScanService {

    clientList: FirebaseObjectObservable<LastScan>;

    constructor(private af: AngularFire) { }
    getAllScans(companyId: string): Observable<any> {
        this.clientList = this.af.database.object('/unternehmenObj/' + companyId + '/lastScan');
        var mappedClients = this.clientList.map(
            clientArray =>
                clientArray.inventory.clients.client.map((client: Client) => {
                    return {
                        name: client.name,
                        applications: client.applications.app.length,
                        nics: client.nics.nic.length,
                        printers: client.printers.printer.length,
                        os: client.os.name,
                        cpu: client.cpu.model,
                        sid: client.sid,
                        ram: client.ram
                    };
                })

        );

        mappedClients.subscribe(value => console.log(value));
        return mappedClients;
    }
}

export interface LastScan {
    clientCountDiff: number;
    inventory: {
        clients: {
           client: Client[];
        };
        date: Date;
    };
}
