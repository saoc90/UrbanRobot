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
        clients: Client[];
        date: Date;
    };
}

export interface ScanEvent {
    clientDiff: number;
    $key: string;
    inventory: {
        clients: Client[];
        date: string;
    };
}

export class ScanListEntry {
    date: string;
    deviceCount: number;
    clientDiff: number;
    id: string;
    constructor(date: string, deviceCount: number, deviceDiff: number, id: string) {
        this.date = date;
        this.deviceCount = deviceCount;
        this.clientDiff = deviceDiff;
        this.id = id;
    }
}
