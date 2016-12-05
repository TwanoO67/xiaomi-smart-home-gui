import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Achat } from '../../models/achat';
import { RestService } from "../rest.service";
import { Configuration } from '../../app.constants';

@Injectable()
export class AchatService extends RestService {

    constructor(_http: Http, _configuration: Configuration) {
        super(_http,_configuration);
        this.modelName = 'achat';
    }

    public getAll(): Observable<Achat[]>{
      return super.getAll().map((tab)=> {
        return <Achat[]>tab.map(unit => new Achat(unit) );
      });
    }

    public get(id: number): Observable<Achat>{
        return super.get(id).map((unit) => <Achat>unit);
    }

}
