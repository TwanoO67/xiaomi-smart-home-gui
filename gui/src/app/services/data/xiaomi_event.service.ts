import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { XiaomiEvent } from '../../models/xiaomi_event';
import { NodeRestService } from "../node-rest.service";

@Injectable()
export class XiaomiEventService extends NodeRestService {

    constructor( _http: Http ) {
        super( _http );
        this.modelName = 'events';
    }

    public getAll(): Observable<XiaomiEvent[]> {
        return super.getAll().map((tab)=> {
          return <XiaomiEvent[]>tab.map(unit => new XiaomiEvent(unit) );
        });
    }

    public get(id: number): Observable<XiaomiEvent> {
        return super.get(id).map((unit) => <XiaomiEvent>unit);
    }
}
