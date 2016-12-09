import { Component, OnInit }  from '@angular/core';
import { Router }             from "@angular/router";
import { BreadcrumbService }        from "../../services/breadcrumb.service";

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  private display: boolean = false;
  private header: string = "";
  private description: string = "";
  private levels : Array<any> = [];

  constructor(private _bread_serv: BreadcrumbService){
    //recuperation des données depuis le service
    this._bread_serv.current.subscribe((data) => {
      this.display = data.display;
      this.header = data.header;
      this.description = data.description;
      this.levels = data.levels;
    });
  }

  ngOnInit() {

  }

}
