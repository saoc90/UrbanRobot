"use strict";
var Scan = (function () {
    function Scan() {
        this.name = 'Name ' + Math.random();
        this.sid = '' + Math.random();
        this.timestamp = new Date();
        this.typ = 'Type x';
    }
    return Scan;
}());
exports.Scan = Scan;
var ScanListEntry = (function () {
    function ScanListEntry(date, deviceCount, deviceDiff, id) {
        this.date = date;
        this.deviceCount = deviceCount;
        this.clientDiff = deviceDiff;
        this.id = id;
    }
    return ScanListEntry;
}());
exports.ScanListEntry = ScanListEntry;
//# sourceMappingURL=scan.js.map