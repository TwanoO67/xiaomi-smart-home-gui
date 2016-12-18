export class XiaomiDevice{
  public sid: number;
  public model: string;
  public name: string;
  public createdAt: number;
  public updatedAt: number;

  constructor(tab:any = {}){
    Object.assign(this, tab);
  }
}
