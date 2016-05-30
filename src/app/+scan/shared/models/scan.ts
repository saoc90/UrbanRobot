export class Scan {
    constructor() {
        this.name = 'Name ' + Math.random();
        this.sid = '' + Math.random();
        this.timestamp = new Date();
        this.typ = 'Type x';
    }
    public name: string;
    public sid: string;
    public timestamp: Date;
    public typ: string;
}