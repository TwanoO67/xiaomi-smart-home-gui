import { Component, OnInit } from '@angular/core';
import { XiaomiHeartbeat } from "../../models/xiaomi_heartbeat";
import { XiaomiDevice } from "../../models/xiaomi_device";
import { BreadcrumbService } from "../../services/breadcrumb.service";
import { XiaomiDeviceService } from "../../services/data/xiaomi_device.service";
import { XiaomiHeartbeatService } from "../../services/data/xiaomi_heartbeat.service";

@Component({
  selector: 'app-heartbeat',
  templateUrl: './heartbeat.component.html'
})
export class HeartbeatComponent implements OnInit {
  private heartbeats: Array<XiaomiHeartbeat> = [];
  private devices: Array<XiaomiDevice> = [];
  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    animation: false,
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(
    private _bread_serv: BreadcrumbService,
    private _heartbeats: XiaomiHeartbeatService,
    private _devices: XiaomiDeviceService
  ) { }

  ngOnInit() {
    //on charge les devices
    this._devices.getAll().subscribe((devices) => {
      this.devices = devices;
      console.log(devices);
      this.updateChart();
    });

    //on ecoute le service rest
    this._heartbeats.getAll().subscribe((all) => {
      this.heartbeats = all;
      this.updateChart();
    });

    //on place le header
    this._bread_serv.set({
      display: false,
      header : "Heartbeat",
      description: "Etat de la maison",
      levels: [
        {
          title: "Timeline",
          link: "/",
          icon: "clock-o"
        }
      ]
    });
  }

  updateChart(){
    if(this.devices && this.heartbeats){
      this.lineChartData = [];
      // une série pas device
      this.devices.forEach((device) => {
        if((device.model !== "motion" && device.model !== "magnet")){
          return true;
        }
        let mydata = [];
        let mylabel = [];
        this.heartbeats.forEach((hb) => {
          if(device.sid == hb.sid ){
              let value = 0;
              if(device.model == "motion" && hb.getData().status !== "no_motion"){
                value = 1;
              }
              else if(device.model == "magnet" && hb.getData().status !== "close"){
                value = 1;
              }
              else{
                value = hb.getData().status;
              }
              mydata.push(value);
              mylabel.push(hb.interval_begin_date);
          }
        });
        console.log(mydata);
        this.lineChartData.push({data: mydata, label: "Ma série "+device.model});
        this.lineChartLabels = mylabel;

      });

    }
  }

  ngOnDestroy(){
    this._bread_serv.clear();
  }

}
