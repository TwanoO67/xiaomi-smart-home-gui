export class XiaomiEvent{
  public id: number = 0;
  public date: number = 0;
  public sid: string = "";
  public model: string = "";
  public cmd: string = "";
  public data_type: string = "";
  public data: string = "";
  public comment: string = "";
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
