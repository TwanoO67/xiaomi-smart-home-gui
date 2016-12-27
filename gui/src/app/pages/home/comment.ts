import { Component, OnInit } from '@angular/core';
import { XiaomiEvent } from "../../models/xiaomi_event";
import { XiaomiEventService } from "../../services/data/xiaomi_event.service";

@Component({
  selector: 'app-home-comment',
  inputs: ['event','write_mode'],
  template:`
  <div class="timeline-body" *ngIf="write_mode || event.comment.length > 0">
      <textarea *ngIf="write_mode" class="form-control" rows="2" placeholder="Commentaire" [(ngModel)]="event.comment" ></textarea>
      <span *ngIf="!write_mode" >{{event.comment}}</span>
  </div>
  `
})
export class CommentComponent implements OnInit {
  private event: XiaomiEvent;
  private write_mode: boolean = false;

  constructor(
    private _events: XiaomiEventService
  ) {
    this.event = new XiaomiEvent();
  }

  ngOnInit() {
   }

}
