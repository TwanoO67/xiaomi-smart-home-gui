import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Prestation } from '../../models/prestation';
import { RestService } from "../rest.service";
import { Configuration } from '../../app.constants';

@Injectable()
export class PrestationService extends RestService {

    constructor(_http: Http, _configuration: Configuration) {
        super(_http,_configuration);
        this.modelName = 'prestation';
    }

    public getAll(): Observable<Prestation[]>{
      return super.getAll().map((tab)=> {
        return <Prestation[]>tab.map(unit => new Prestation(unit) );
      });
    }

    public get(id: number): Observable<Prestation>{
        return super.get(id).map((unit) => <Prestation>unit);
    }

}
