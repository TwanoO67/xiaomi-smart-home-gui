export class Device{
  public sid: number;
  public model: string;
  public name: string;

  constructor(tab:any = {}){
    Object.assign(this, tab);
  }
}
