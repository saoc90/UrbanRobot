export interface Client {
    name: string;
    applications: any;
    cpu: any;
    nics: any;
    os: any;
    printers: any;
    ram: number;
    sid: string;
    diffText?: string;
}
