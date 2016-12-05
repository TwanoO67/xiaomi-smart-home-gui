export class Client {
    public id: number;
    public nom: string;
    public prenom: string;
    public email: string;
    public adresse: string;
    public ville: string;
    public telephone: string;
    public date_naissance: Date;

    get fullname(): string{
      return (this.nom.toUpperCase()+' '+this.prenom);
    }

    constructor(tab:any = {}){
      Object.assign(this, tab);
    }
}
