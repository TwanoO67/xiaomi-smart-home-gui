import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { XiaomiDeviceService } from "../../services/data/xiaomi_device.service";
import { XiaomiDevice } from "../../models/xiaomi_device";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html'
})
export class DeviceComponent implements OnInit, OnDestroy {
  private devices: any;

  constructor(private _devices: XiaomiDeviceService, private breadServ: BreadcrumbService) {
    // TODO
  }

  public ngOnInit() {
    this._devices.getAll().subscribe((all) => {
      this.devices = all;
    });

    this.breadServ.set({
      description: 'This is our Devices page',
      display: true,
      levels: [
        {
          icon: 'dashboard',
          link: ['/'],
          title: 'Home'
        },
        {
          icon: 'gears',
          link: ['/device'],
          title: 'Devices'
        }
      ]
    });

  }

  public ngOnDestroy() {
    this.breadServ.clear();
    this.devices = null;
  }

  private save = (device: XiaomiDevice): void => {
    this._devices.update(device.sid, device).subscribe((result)=>{
      console.log(result);
    });
  }

  private delete = (device: XiaomiDevice): void => {
    this._devices.delete(device.sid).subscribe((result)=>{
      console.log(result);
    });
  }

  private add = (): void => {
    this._devices.add(new XiaomiDevice()).subscribe((result)=>{
      console.log(result);
    });
  }
}
