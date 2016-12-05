
export class Paiement{
    public type:string;
    public id: number;

    constructor(tab:any = {}){
      Object.assign(this, tab);
    }
}
