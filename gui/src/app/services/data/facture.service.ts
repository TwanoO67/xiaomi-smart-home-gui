import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Facture } from '../../models/facture';
import { RestService } from "../rest.service";
import { Configuration } from '../../app.constants';

@Injectable()
export class FactureService extends RestService {

    constructor(_http: Http, _configuration: Configuration) {
        super(_http,_configuration);
        this.modelName = 'facture';
    }

    public getAll(): Observable<Facture[]>{
      return super.getAll().map((tab)=> {
        return <Facture[]>tab.map(unit => new Facture(unit) );
      });
    }

    public get(id: number): Observable<Facture>{
        return super.get(id).map((unit) => <Facture>unit);
    }

}
