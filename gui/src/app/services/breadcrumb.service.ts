import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";

@Injectable()
export class BreadcrumbService {
  public current: ReplaySubject<any>;
  private initialData : any = [
    {
      label: "C-Coiffure",
      link: "/",
      icon: "dashboard"
    }
  ]

  constructor() {
    this.current = new ReplaySubject(1);
    this.clear();
  }

  set(data: any){
    this.current.next(data);
  }

  clear(){
    this.set(this.initialData);
  }

}
