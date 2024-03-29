"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ClientDetailComponent = (function () {
    function ClientDetailComponent(scanServie) {
        this.scanServie = scanServie;
    }
    ClientDetailComponent.prototype.ngOnInit = function () {
    };
    ClientDetailComponent.prototype.routerOnActivate = function (curr) {
        this.curSegment = curr;
        console.log('route params: ', curr.getParam('id'));
    };
    ClientDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-client-detail',
            templateUrl: 'client-detail.component.html',
            styleUrls: ['client-detail.component.css']
        })
    ], ClientDetailComponent);
    return ClientDetailComponent;
}());
exports.ClientDetailComponent = ClientDetailComponent;
//# sourceMappingURL=client-detail.component.js.map