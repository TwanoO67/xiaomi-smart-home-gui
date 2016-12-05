import {User} from "./user";

export class Message{
  public id: number;
  public content:string;
  public title:string;
  public author:User;
  public destination:User;
  public date:string;

  constructor(tab:any = {}){
    Object.assign(this, tab);
  }
}
