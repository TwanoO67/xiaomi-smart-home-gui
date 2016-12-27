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
      <button type="button" class="btn btn-success btn-sm" (click)="save();"><i class="fa fa-check"></i></button>
      <button type="button" class="btn btn-error btn-sm" (click)="cancel();"><i class="fa fa-times"></i></button>
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

  private save(){
    this._events.update(this.event.id,this.event).subscribe((data)=>{
      console.log(data);
    });
  }

  private cancel(){
    this.event.comment = "";
  }

  ngOnInit() {

   }

}
