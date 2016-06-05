"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var scan_1 = require('../models/scan');
var core_1 = require('@angular/core');
require('rxjs/Rx');
var ScanService = (function () {
    function ScanService(af) {
        this.af = af;
        this.scans = [
            new scan_1.Scan(),
            new scan_1.Scan(),
            new scan_1.Scan(),
            new scan_1.Scan(),
            new scan_1.Scan()
        ];
    }
    ScanService.prototype.getAllScans = function (companyId) {
        return this.af.list('/unternehmenObj/' + companyId + '/scandata');
    };
    ScanService.prototype.getScanById = function (companyId, scanId) {
        return this.af.object('/unternehmenObj/' + companyId + '/scandata/' + scanId);
    };
    ScanService = __decorate([
        core_1.Injectable()
    ], ScanService);
    return ScanService;
}());
exports.ScanService = ScanService;
//# sourceMappingURL=scan-service.service.js.map