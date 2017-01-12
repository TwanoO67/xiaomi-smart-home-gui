export class XiaomiHeartbeat{
  public id: number = 0;
  public sid: string = "";
  public model: string = "";
  public is_last_state: boolean = false;
  public interval_begin_date: number = 0;
  public interval_end_date: number = 0;
  public data: any = null;
  public createdAt: number = 0;
  public updatedAt: number = 0;

  constructor(tab:any = {}){
    Object.assign(this, tab);
  }
}
