import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Produit } from '../../models/produit';
import { RestService } from "../rest.service";
import { Configuration } from '../../app.constants';

@Injectable()
export class ProduitService extends RestService {

    constructor(_http: Http, _configuration: Configuration) {
        super(_http,_configuration);
        this.modelName = 'produit';
    }

    public getAll(): Observable<Produit[]>{
      return super.getAll().map((tab)=> {
        return <Produit[]>tab.map(unit => new Produit(unit) );
      });
    }

    public get(id: number): Observable<Produit>{
        return super.get(id).map((unit) => <Produit>unit);
    }
}
