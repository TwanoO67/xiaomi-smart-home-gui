import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Client } from '../../models/client';
import { RestService } from "../rest.service";
import { Configuration } from '../../app.constants';

@Injectable()
export class ClientService extends RestService {

    constructor(_http: Http, _configuration: Configuration) {
        super(_http,_configuration);
        this.modelName = 'client';
    }

    public getAll(): Observable<Client[]>{
        return super.getAll().map((tab)=> {
          return <Client[]>tab.map(unit => new Client(unit) );
        });
    }

    public get(id: number): Observable<Client>{
        return super.get(id).map((unit) => <Client>unit);
    }
}
