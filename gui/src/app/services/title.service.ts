import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";

@Injectable()
export class TitleService {
  public current: ReplaySubject<any>;
  private initialData : any =
    {
      title: "Facturation",
      description: "Ajouter une nouvelle facture à un client"
    };


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
