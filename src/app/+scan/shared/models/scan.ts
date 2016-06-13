import { Client } from './client';

export class Scan {
    constructor() {
        this.name = 'Name ' + Math.random();
        this.sid = '' + Math.random();
        this.timestamp = new Date();
        this.typ = 'Type x';
    }
    public name: string;
    public applications: string;
    public sid: string;
    public timestamp: Date;
    public typ: string;
}

export interface LastScan {
    clientDiff: number;
    inventory: {
        clients: {
            client: Client[];
        };
        date: Date;
    };
}

export interface ScanEvent {
    clientCountDiff: number;
    $key: string;
    inventory: {
        clients: {
            client: Client[];
        };
        date: string;
    };
    timeStamp?: string;
}

export class ScanListEntry {
    date: string;
    deviceCount: number;
    clientCountDiff: number;
    id: string;
    constructor(date: string, deviceCount: number, deviceDiff: number, id: string) {
        this.date = date;
        this.deviceCount = deviceCount;
        this.clientCountDiff = deviceDiff;
        this.id = id;
    }
}
