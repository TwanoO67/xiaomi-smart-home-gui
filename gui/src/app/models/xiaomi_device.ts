export class XiaomiDevice{
  public sid: string = "";
  public model: string;
  public name: string;
  public createdAt: number;
  public updatedAt: number;

  constructor(tab:any = {}){
    Object.assign(this, tab);
  }
}
