import {Scan} from "./scan";
import {Injectable} from '@angular/core';

@Injectable() 
export class ScanService{
    private scans : Array<Scan> = 
    [
        new Scan(),
        new Scan(),
        new Scan(),
        new Scan(),
        new Scan()
    ];
     
    getAllScans(): Array<Scan>{
        return this.scans;
    }
}