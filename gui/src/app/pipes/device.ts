import { Pipe, PipeTransform } from '@angular/core';
import { DeviceService } from "../services/data/device.service";
import { Device } from "../models/device";

//Transforme un id de prestation en Prestation

@Pipe({name: 'toDevice'})
export class toDevicePipe implements PipeTransform {

  constructor(
    private _device_serv: DeviceService
  ){ }

  transform(id: number): Device {
    return this._device_serv.getFromSid(id);
  }
}
