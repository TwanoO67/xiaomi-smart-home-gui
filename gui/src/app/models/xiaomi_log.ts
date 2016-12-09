export class XiaomiLog{
  public id: number;
  public date: number;
  public sid: number;
  public model: string;
  public data: string;

  constructor(tab:any = {}){
    Object.assign(this, tab);
  }
}
