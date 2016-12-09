export class XiaomiLog{
  public id: number = 0;
  public date: number = 0;
  public sid: number = 0;
  public model: string = "";
  public data: string = "";

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
