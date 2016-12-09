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

  constructor() { }

  ngOnInit() {
  }

}
