import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import 'rxjs/operator';
import { Client } from '../../+scan/shared/models/client';

@Injectable()
export class ScanService {

    clientList: FirebaseObjectObservable<LastScan>;
    public differentOS: Array<string> = [];

    constructor(private af: AngularFire) { }
    getAllScans(companyId: string): Observable<any> {
        this.clientList = this.af.database.object('/unternehmenObj/' + companyId + '/lastScan');
        var mappedClients = this.clientList.map(
            clientArray => {

            this.differentOS = [];
           return clientArray.inventory.clients.client.map((client: Client) => {
                    if(client.nics != typeof(Array))
                    client.nics = [client.nics];
                    // count different os's in system.
                    if(this.differentOS.indexOf(client.os.name) == -1){
                        this.differentOS.push(client.os.name);
                    }
                    return {
                        name: client.name,
                        applications:
                        client.applications.apps.length ? client.applications.apps.length : 1,
                        nics: client.nics.length ? client.nics.lenght : 1,
                        printers:
                        client.printers.printer.length ? client.printers.printer.length : 1,
                        ipv4: client.nics[0].nic[0].ipv4,
                        os: client.os.name,
                        cpu: client.cpu.model,
                        sid: client.sid,
                        ram: client.ram
                    };
                });

            }

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
