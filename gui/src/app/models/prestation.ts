export class Prestation {
    public id: number;
    public nom: string;
    public tarif: number;

    constructor(tab:any = {}){
      Object.assign(this, tab);
    }
}
