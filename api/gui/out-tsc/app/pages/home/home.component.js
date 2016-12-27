var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { BreadcrumbService } from "../../services/breadcrumb.service";
import { XiaomiEventService } from "../../services/data/xiaomi_event.service";
import { XiaomiDeviceService } from "../../services/data/xiaomi_device.service";
var HomeComponent = (function () {
    function HomeComponent(_bread_serv, _events, _devices) {
        this._bread_serv = _bread_serv;
        this._events = _events;
        this._devices = _devices;
        this.date = new Date();
        this.last_events = [];
        this.dates = [];
        this.mode = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._devices.getAll().subscribe(function (devices) {
            console.log(devices);
        });
        this._events.getAll().subscribe(function (all) {
            _this.last_events = all;
            _this.event_by_day = {};
            _this.last_events.forEach(function (event) {
                var date = new Date(event.date);
                var day = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                if (typeof _this.event_by_day[day] === "undefined") {
                    _this.event_by_day[day] = [];
                    _this.dates.push(day);
                }
                _this.event_by_day[day].push(event);
            });
        });
        this._bread_serv.set({
            display: false,
            header: "Timeline",
            description: "Activité de la maison",
            levels: [
                {
                    title: "Timeline",
                    link: "/",
                    icon: "clock-o"
                }
            ]
        });
    };
    HomeComponent.prototype.toggleModeCommentaire = function () {
        this.mode = !this.mode;
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this._bread_serv.clear();
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    }),
    __metadata("design:paramtypes", [BreadcrumbService,
        XiaomiEventService,
        XiaomiDeviceService])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=../../../../../src/app/pages/home/home.component.js.map