export class XiaomiHeartbeat{
  public id: number = 0;
  public sid: string = "";
  public model: string = "";
  public is_last_state: boolean = false;
  public interval_begin_date: number = 0;
  public interval_end_date: number = 0;
  public last_heartbeat_date: number = 0;
  public data: string = "";
  public createdAt: number = 0;
  public updatedAt: number = 0;

  constructor(tab:any = {}){
    Object.assign(this, tab);
  }

  //renvoi le conteu de data, au format objet
  public getData(): any{
    let decod = null;
    console.log(this.data);
    try{
      decod = JSON.parse(this.data);
    }
    catch(e){
      console.error(e);
    }
    return decod;
  }
}
