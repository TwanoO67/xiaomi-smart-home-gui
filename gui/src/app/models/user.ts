export class User{
  public id: number;
  public firstname:string;
  public lastname:string;
  public email:string;
  public avatar_url:string;
  public creation_date: string;

  constructor(tab:any = {}){
    Object.assign(this, tab);
  }

  public getName(){
    return this.firstname+" "+this.lastname;
  }
}
