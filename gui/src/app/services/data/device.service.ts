import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Device } from '../../models/device';
import { NodeRestService } from "../node-rest.service";

@Injectable()
export class DeviceService extends NodeRestService {

    constructor(_http: Http) {
        super(_http);
        this.modelName = 'device';
    }

    public fake = {
      4321: {
        id:4321,
        name: "Detecteur Cuisine",
        model: "motion"
      },
      1234: {
        id:1234,
        name: "Detecteur Couloir",
        model: "motion"
      },
      3456: {
        id:3456,
        name: "Porte d'entrée",
        model: "magnet"
      }
    };

    //fake data pour le pipe
    public getFromSid(id: number): Device{
      return new Device(this.fake[id]);
    }

    public getAll(): Observable<Device[]>{
      return super.getAll().map((tab)=> {
        return <Device[]>tab.map(unit => new Device(unit) );
      });
    }

    public get(id: number): Observable<Device>{
        return super.get(id).map((unit) => <Device>unit);
    }

}
