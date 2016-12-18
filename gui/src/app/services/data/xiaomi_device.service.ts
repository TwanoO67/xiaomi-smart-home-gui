import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { XiaomiDevice } from '../../models/xiaomi_device';
import { NodeRestService } from "../node-rest.service";

@Injectable()
export class XiaomiDeviceService extends NodeRestService {

    constructor(_http: Http) {
        super(_http);
        this.modelName = 'xiaomi_device';
    }

    //fake data pour le pipe
    public getFromSid(id: number): XiaomiDevice{
      return this.getFromCache(id);
    }

    public getAll(): Observable<XiaomiDevice[]>{
      return super.getAll().map((tab)=> {
        return <XiaomiDevice[]>tab.map(unit => new XiaomiDevice(unit) );
      });
    }

    public get(id: number): Observable<XiaomiDevice>{
        return super.get(id).map((unit) => <XiaomiDevice>unit);
    }

}
