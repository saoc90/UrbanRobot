export interface CompanyObject {
    lastScan: {
        clientCountDiff: number;
        timeStamp: string;
        inventory?: any;
    };
    scanRequested: number;
    systemStatus: {
        scanErrors: number;
        scans: number;
        systemLoad: number;
        systemStatus?: string;
    };
    scandata?: any;
}
