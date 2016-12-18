import { Pipe, PipeTransform } from '@angular/core';
import { XiaomiDeviceService } from "../services/data/xiaomi_device.service";
import { XiaomiDevice } from "../models/xiaomi_device";

//Transforme un id de prestation en Prestation

@Pipe({name: 'toDevice'})
export class toDevicePipe implements PipeTransform {

  constructor(
    private _device_serv: XiaomiDeviceService
  ){ }

  transform(id: number): XiaomiDevice {
    let mymodel = this._device_serv.getFromSid(id);
    if( mymodel ){
      return mymodel
    }
    else{
      return new XiaomiDevice();
    }
  }
}
