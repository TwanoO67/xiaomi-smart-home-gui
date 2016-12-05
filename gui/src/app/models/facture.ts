export class Facture {
    public id: number;
    public client_id: number;
    public realise_par_user_id: number;
    public facture_par_user_id: number;
    public date: number;
    public montant_total: string;
    public paiement_id: number;

    constructor(tab:any = {}){
      Object.assign(this, tab);
    }
}
