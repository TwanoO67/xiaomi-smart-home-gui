import { Component, OnInit } from '@angular/core';
import { XiaomiLog } from "../../models/xiaomi_log";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public date: Date = new Date();

  public last_log : Array<XiaomiLog> = [];
  public log_by_day: any;
  public dates : Array<string> = [];

  constructor() {
  //donnée de test
  this.last_log = [
    new XiaomiLog({
      id: 1,
      date: 1481282539000,
      sid: 4321,
      model: "motion",
      data: "{status: 'motion'}"
    }),
    new XiaomiLog({
      id: 2,
      date: 1481289876000,
      sid: 1234,
      model: "motion",
      data: "{status: 'motion'}"
    }),
    new XiaomiLog({
      id: 3,
      date: 1241289876000,
      sid: 3456,
      model: "magnet",
      data: "{status: 'close'}"
    })
  ];
}

  ngOnInit() {
    //tri des données par jours
    this.log_by_day = {};
    console.log(this.last_log);
    this.last_log.forEach((log)=>{
      let date: Date = new Date(log.date);
      let day = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
      if(typeof this.log_by_day[day] === "undefined")
        this.log_by_day[day] = [];
      this.log_by_day[day].push(log);
      this.dates.push(day);
    });
    console.log(this.log_by_day);
    //this.dates = this.dates.unique();

  }

}
