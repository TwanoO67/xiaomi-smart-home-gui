export class Produit {
    public id: number;
    public nom: string;
    public tarif: number;
    public stock_restant: number;

    constructor(tab:any = {}){
      Object.assign(this, tab);
    }
}
