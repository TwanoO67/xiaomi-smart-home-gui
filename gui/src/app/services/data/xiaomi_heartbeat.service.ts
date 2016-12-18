import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { XiaomiHeartbeat } from '../../models/xiaomi_heartbeat';
import { NodeRestService } from "../node-rest.service";

@Injectable()
export class XiaomiHeartbeatService extends NodeRestService {

    constructor( _http: Http ) {
        super( _http );
        this.modelName = 'xiaomi_heartbeat';
    }

    public getAll(): Observable<XiaomiHeartbeat[]> {
        return super.getAll().map((tab)=> {
          return <XiaomiHeartbeat[]>tab.map(unit => new XiaomiHeartbeat(unit) );
        });
    }

    public get(id: number): Observable<XiaomiHeartbeat> {
        return super.get(id).map((unit) => <XiaomiHeartbeat>unit);
    }
}
