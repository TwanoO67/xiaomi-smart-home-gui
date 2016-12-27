import { Component, OnInit, EventEmitter } from '@angular/core';
import { XiaomiEvent } from "../../models/xiaomi_event";
import { XiaomiEventService } from "../../services/data/xiaomi_event.service";

@Component({
  selector: 'app-home-bar',
  inputs: ['event','write_mode'],
  template:`
  <span class="time"><i class="fa fa-clock-o"></i> {{event.date | date : 'mediumTime' }}</span>
  `
})
export class CommentComponent implements OnInit {
  private event: XiaomiEvent;
  private write_mode: boolean = false;
  @Ouput() write_mode_toggle: EventEmitter<boolean>;

  constructor(
    private _events: XiaomiEventService
  ) {
    this.event = new XiaomiEvent();
    this.write_mode_toggle = new EventEmitter();
  }

  ngOnInit() {
   }

}
