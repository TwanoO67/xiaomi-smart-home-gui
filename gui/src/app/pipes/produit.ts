import { Pipe, PipeTransform } from '@angular/core';
import { ProduitService } from "../services/data/produit.service";
import { Produit } from "../models/produit";

//Transforme un id de produit en Produit

@Pipe({name: 'toProduit'})
export class toProduitPipe implements PipeTransform {

  constructor(
    private _produit_serv: ProduitService
  ){ }

  transform(id: number): Produit {
    return this._produit_serv.getFromCache(id);
  }
}
