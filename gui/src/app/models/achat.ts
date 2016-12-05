
export class Achat {
    public id: number;
    public produit_id: number;
    public facture_id: number;
    public prestation_id: number;
    public quantite: number;
    public montant_unitaire: number;//on fixe le montant ici car le tarif peut changer lui
    public montant_total_paye: number;//prend en compte les eventuelles reductions

    constructor(tab:any = {}){
      Object.assign(this, tab);
    }

    public getMontantTotal(){
      return this.montant_unitaire * this.quantite;
    }
}
