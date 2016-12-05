import { Pipe, PipeTransform } from '@angular/core';
import { PrestationService } from "../services/data/prestation.service";
import { Prestation } from "../models/prestation";

//Transforme un id de prestation en Prestation

@Pipe({name: 'toPrestation'})
export class toPrestationPipe implements PipeTransform {

  constructor(
    private _prestation_serv: PrestationService
  ){ }

  transform(id: number): Prestation {
    return this._prestation_serv.getFromCache(id);
  }
}
