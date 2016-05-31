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
    inventory: {
        clients: Client[];
        date: Date;
    };
}

export class ScanListEntry {
    date: Date;
    deviceCount: number;
    clientDiff: number;
    constructor(date: Date, deviceCount: number, deviceDiff: number) {
        this.date = date;
        this.deviceCount = deviceCount;
        this.clientDiff = deviceDiff;
    }
}