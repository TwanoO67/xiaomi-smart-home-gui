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
import { XiaomiDeviceService } from "../../services/data/xiaomi_device.service";
import { XiaomiHeartbeatService } from "../../services/data/xiaomi_heartbeat.service";
var HeartbeatComponent = (function () {
    function HeartbeatComponent(_bread_serv, _heartbeats, _devices) {
        this._bread_serv = _bread_serv;
        this._heartbeats = _heartbeats;
        this._devices = _devices;
        this.heartbeats = [];
        this.devices = [];
        this.graphs = [];
        this.lineChartOptions = {
            animation: false,
            responsive: true
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    HeartbeatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._devices.getAll().subscribe(function (devices) {
            _this.devices = devices;
            console.log(devices);
            _this.updateChart();
        });
        this._heartbeats.getAll().subscribe(function (all) {
            _this.heartbeats = all;
            _this.updateChart();
        });
        this._bread_serv.set({
            display: false,
            header: "Heartbeat",
            description: "Etat de la maison",
            levels: [
                {
                    title: "Timeline",
                    link: "/",
                    icon: "clock-o"
                }
            ]
        });
    };
    HeartbeatComponent.prototype.cutTS = function (ts) {
        return Math.floor(ts / 10000);
    };
    HeartbeatComponent.prototype.updateChart = function () {
        var _this = this;
        console.log("on recrée le graph");
        this.graphs = [];
        if (this.devices && this.heartbeats) {
            this.devices.forEach(function (device) {
                if ((device.model !== "motion" && device.model !== "magnet")) {
                    return true;
                }
                var mydata = [];
                var mydata2 = [];
                var mylabel = [];
                _this.heartbeats.forEach(function (hb) {
                    if (device.sid == hb.sid) {
                        mylabel.push(hb.interval_begin_date);
                        if (device.model === "motion") {
                            if (hb.getData().status !== "no_motion") {
                                mydata.push(1);
                            }
                            else {
                                mydata.push(0);
                            }
                        }
                        else if (device.model === "magnet") {
                            if (hb.getData().status !== "close") {
                                mydata.push(1);
                            }
                            else {
                                mydata.push(0);
                            }
                        }
                        else if (device.model === "sensor_ht") {
                            mydata.push(hb.getData().temperature);
                            mydata2.push(hb.getData().humidity);
                        }
                        else {
                            console.log('traitement non pris');
                            console.log(hb);
                            mydata.push(hb.getData().status);
                        }
                    }
                });
                var new_graph = {};
                new_graph.lineChartData = [];
                new_graph.lineChartData.push({ data: mydata, label: "Ma série " + device.model });
                if (mydata2.length > 0) {
                    new_graph.lineChartData.push({ data: mydata2, label: "Ma série 2 " + device.model });
                }
                new_graph.lineChartLabels = mylabel;
                new_graph.lineChartColors = _this.lineChartColors;
                new_graph.lineChartOptions = _this.lineChartOptions;
                new_graph.lineChartType = _this.lineChartType;
                new_graph.lineChartLegend = _this.lineChartLegend;
                _this.graphs.push(new_graph);
            });
        }
    };
    HeartbeatComponent.prototype.ngOnDestroy = function () {
        this._bread_serv.clear();
    };
    return HeartbeatComponent;
}());
HeartbeatComponent = __decorate([
    Component({
        selector: 'app-heartbeat',
        templateUrl: './heartbeat.component.html'
    }),
    __metadata("design:paramtypes", [BreadcrumbService,
        XiaomiHeartbeatService,
        XiaomiDeviceService])
], HeartbeatComponent);
export { HeartbeatComponent };
//# sourceMappingURL=../../../../../src/app/pages/heartbeat/heartbeat.component.js.map