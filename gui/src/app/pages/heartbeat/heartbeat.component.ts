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
  private graphs: Array<any> = [];

  // lineChart
  /*public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  */
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
      //this.updateChart();
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

  //reduis les timestamp a un par 10sec
  private cutTS(ts: number): number{
    return Math.floor(ts/10000);
  }

  private getGraphDataforHB(hb: XiaomiHeartbeat){
    let data = {};
    if(hb.model === "motion"){
      if( hb.data.status !== "no_motion" ){
        data = 1;
      }
      else{
        data = 0;
      }
    }
    else if(hb.model === "magnet"){
      if( hb.data.status !== "close" ){
        data = 1;
      }
      else{
        data = 0;
      }
    }
    else if(hb.model === "sensor_ht"){
      data = hb.data;
    }
    else{
      console.log('traitement non pris');
      console.log(hb);
    }
    return data;
  }

  private updateChart(){
    console.log("on recrée le graph");
    this.graphs = [];
    if(this.devices && this.heartbeats){
      // une série par device
      this.devices.forEach((device) => {
        if((device.model !== "motion" && device.model !== "magnet")){
          return true;
        }
        let mydata = [];
        let mylabel = [];
        this.heartbeats.forEach((hb) => {

          if(device.sid == hb.sid ){
              //Ajout du point de début
              mylabel.push(hb.interval_begin_date+"");
              let data = this.getGraphDataforHB(hb);
              if(data){
                mydata.push(data);
              }

              //si l'interval est fini on ajoute aussi le point final (avec les meme data)
              if(hb.interval_end_date > 0){
                mylabel.push(hb.interval_end_date);
                if(data){
                  mydata.push(data);
                }
              }


          }
        });

        let new_graph: any = {};
        new_graph.lineChartData = [];
        new_graph.lineChartData.push({data: mydata, label: "Ma série "+device.model});
        new_graph.lineChartLabels = mylabel;
        new_graph.lineChartColors = this.lineChartColors;
        new_graph.lineChartOptions = this.lineChartOptions;
        new_graph.lineChartType = this.lineChartType;
        new_graph.lineChartLegend = this.lineChartLegend;
        this.graphs.push(new_graph);

        console.log(this.graphs);

      });

    }
  }

  ngOnDestroy(){
    this._bread_serv.clear();
  }

}
