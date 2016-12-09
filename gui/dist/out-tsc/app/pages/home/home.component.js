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
import { XiaomiLog } from "../../models/xiaomi_log";
var HomeComponent = (function () {
    function HomeComponent() {
        this.date = new Date();
        this.last_log = [];
        this.dates = [];
        this.last_log = [
            new XiaomiLog({
                id: 1,
                date: 1481282539000,
                sid: 4321,
                model: "motion",
                data: '{"status": "motion"}'
            }),
            new XiaomiLog({
                id: 2,
                date: 1481289876000,
                sid: 1234,
                model: "motion",
                data: '{"status": "motion"}'
            }),
            new XiaomiLog({
                id: 3,
                date: 1241289876000,
                sid: 3456,
                model: "magnet",
                data: '{"status": "close"}'
            })
        ];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.log_by_day = {};
        console.log(this.last_log);
        this.last_log.forEach(function (log) {
            var date = new Date(log.date);
            var day = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            if (typeof _this.log_by_day[day] === "undefined")
                _this.log_by_day[day] = [];
            _this.log_by_day[day].push(log);
            _this.dates.push(day);
        });
        console.log(this.log_by_day);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=../../../../../src/app/pages/home/home.component.js.map