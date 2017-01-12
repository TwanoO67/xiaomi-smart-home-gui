export class XiaomiEvent{
  public id: number = 0;
  public sid: string = "";
  public model: string = "";
  public cmd: string = "";
  public data_type: string = "";
  public data: any = null;
  public comment: string = "";
  public createdAt: number = 0;
  public updatedAt: number = 0;

  constructor(tab:any = {}){
    Object.assign(this, tab);
  }
}
