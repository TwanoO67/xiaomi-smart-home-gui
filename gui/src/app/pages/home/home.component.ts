import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BreadcrumbService } from "../../services/breadcrumb.service";
import { FactureService } from "../../services/data/facture.service";
import { Facture } from "../../models/facture";
import { ClientService } from "../../services/data/client.service";
import { Client } from "../../models/client";
import { ProduitService } from "../../services/data/produit.service";
import { Produit } from "../../models/produit";
import { AchatService } from "../../services/data/achat.service";
import { Achat } from "../../models/achat";
import { PrestationService } from "../../services/data/prestation.service";
import { Prestation } from "../../models/prestation";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public date: Date = new Date();
  public facture: Facture = null;

  private etapesValides: any = [
    {
      ordre: 1,
      valid: false
    },
    {
      ordre: 2,
      valid: false
    },
    {
      ordre: 3,
      valid: false
    }
  ];

  private current_step: number = 1;

  public client: Client = null; //le client en cours pour la facture
  public liste_clients: Array<Client> = null;

  public produit: Produit = null; //le produit en cours d'ajout
  public liste_produits: Array<Produit> = null;//liste des produits disponibles

  public prestation: Prestation= null; //le prestation en cours d'ajout
  public liste_prestations: Array<Prestation> = null;//liste des prestations disponibles

//les achats séléctionnées
  public achat: Achat = null; //le produit en cours d'ajout
  public liste_achats: Array<Achat> = null;//liste des achats fait (= panier)

  public cash_selected:boolean = false;
  public check_selected = false;
  public cash:number = 0;
  public a_rendre:number = 0;

  private use_reduc = true;//utilisation de la reduc si dispo
  private id:number = 0;//id de client si on vient par une route de client

  constructor(
    private _bread_serv: BreadcrumbService,
    private _client_serv: ClientService,
    private _produit_serv: ProduitService,
    private _presta_serv: PrestationService,
    private _facture_serv: FactureService,
    private _achat_serv: AchatService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._bread_serv.set([{
      label: "C-Coiffure",
      link: "/",
      icon: "dashboard"
    },{
      label: "Nouvelle facture",
      link: "/",
      icon: "dollar"
    }]);
  }

  ngOnInit() {

    //recuperation des parametres de route
    this._route.params.forEach((params: Params) => {
      this.id = +params['id'];
      this.initClient();
    });

    //initialisation de la facture
    this.facture = new Facture();
    this.facture.date = Math.floor( Date.now() / 1000 );
    //this.facture.realise_par_user_id = this.user.id;
    //this.facture.facture_par_user_id = this.user.id;

    this.liste_achats = [];

    //recuperation des clients et tri
    this._client_serv.getAll().subscribe((list) => {

      this.liste_clients = list.sort((a,b)=>{
        if( a.nom < b.nom){
          return -1;
        }
        else if ( a.nom > b.nom){
          return 1;
        }
        else if ( a.prenom < b.prenom ){
          return -1;
        }
        else if ( a.prenom > b.prenom ){
          return 1;
        }
        else{
          return 0;
        }
      });

      this.initClient();

    });

    //recuperation des produits et tri
    this._produit_serv.getAll().subscribe((list) => {
      this.liste_produits = list.sort((a,b)=>{
        if( a.nom < b.nom){
          return -1;
        }
        else if ( a.nom > b.nom){
          return 1;
        }
        else{
          return 0;
        }
      });
    });

    //recuperation des produits et tri
    this._presta_serv.getAll().subscribe((list) => {
      this.liste_prestations = list.sort((a,b)=>{
        if( a.nom < b.nom){
          return -1;
        }
        else if ( a.nom > b.nom){
          return 1;
        }
        else{
          return 0;
        }
      });
    });


  }

  ngOnDestroy(){
    this._bread_serv.clear();
  }

  initClient(){
    console.log("client init",this.id,this.client);
    if(this.id > 0 && !this.client){
      console.log('la')
      this.client = this._client_serv.getFromCache(this.id);
    }
  }

  //STEP 1 : choix du client

  validerStep1(){
    this.changeValidOfStep(1,true);
    this.setCurrentToFirstStepNotTrue();
  }

  create(){
    this._router.navigate(["/client/"+0]);
    return false;
  }

  clientAnonyme(){
    //init avec client anonyme
    this.client = new Client({
      id: 0,
      nom: "ANONYME",
      prenom: ""
    });
    this.validerStep1();
  }

  //STEP 2 : choix des produits et prestation
  ajouterPresta(id){
    let presta = this.getPresta(id);
    let achat: Achat = this.getAchatByPresta(presta);
    //on verifie s'il y a deja un achat de cette prestation sinon on en crée un nouveau
    if(!achat){
      achat = new Achat({
        prestation_id: presta.id,
        quantite: 1,
        montant_unitaire: presta.tarif
      });
      this.liste_achats.push(achat);
    }
    //si oui, on ajoute a la quantité
    else{
      achat.quantite++;
    }
  }

  ajouterProduit(id){
    let produit = this.getProduit(id);
    let achat: Achat = this.getAchatByProduit(produit);
    //on verifie s'il y a deja un achat de ce produit sinon on en crée un nouveau
    if(!achat){
      achat = new Achat({
        produit_id: produit.id,
        quantite: 1,
        montant_unitaire: produit.tarif
      });
      this.liste_achats.push(achat);
    }
    //si oui, on ajoute a la quantité
    else{
      achat.quantite++;
    }

  }

  retirerProduit(id){
    let produit = this.getProduit(id);
    let achat: Achat = this.getAchatByProduit(produit);
    //on verifie s'il y a deja un achat de ce produit, si oui, on le decremente
    if(achat){
      achat.quantite--;
      //si y'a plus de quantité on supprime l'achat
      if(achat.quantite <= 0){
        this.liste_achats = this.liste_achats.filter((unit) => unit !== achat);
      }
    }
  }

  retirerPresta(id){
    let presta = this.getPresta(id);
    let achat: Achat = this.getAchatByPresta(presta);
    //on verifie s'il y a deja un achat de ce produit, si oui, on le decremente
    if(achat){
      achat.quantite--;
      //si y'a plus de quantité on supprime l'achat
      if(achat.quantite <= 0){
        this.liste_achats = this.liste_achats.filter((unit) => unit !== achat);
      }
    }
  }

  getProduit(id): Produit{
    return this.liste_produits.find((unit) => unit.id === id);
  }
  getAchatByProduit( produit: Produit): Achat{
    return this.liste_achats.find((unit: Achat) => unit.produit_id === produit.id);
  }

  getPresta(id): Prestation{
    return this.liste_prestations.find((unit) => unit.id === id);
  }
  getAchatByPresta( presta: Prestation): Achat{
    return this.liste_achats.find((unit: Achat) => unit.prestation_id === presta.id);
  }

  getListePresta(){
    return this.liste_achats.filter((unit) => { return unit.prestation_id > 0});
  }

  getListeProduit(){
    return this.liste_achats.filter((unit) => { return unit.produit_id > 0});
  }

  validerStep2(){
    this.changeValidOfStep(2,true);
    this.setCurrentToFirstStepNotTrue();
  }

  goBackStep1(){
    this.changeValidOfStep(1,false);
    this.setCurrentToFirstStepNotTrue();
  }

  goBackStep2(){
    this.changeValidOfStep(2,false);
    this.setCurrentToFirstStepNotTrue();
  }

  changeValidOfStep(num_step,value){
    this.etapesValides = this.etapesValides.map((step) => {
      if(num_step === step.ordre){
        step.valid = value;
      }
      return step;
    });
  }

  //STEP 3
  toRealNumber(num){
    return (Math.floor(num*100))/100;
  }

  totalDesAchats(){
    let total:number = 0;
    this.liste_achats.forEach((achat: Achat) => {
      total += achat.getMontantTotal();
    });
    return total;
  }

  calcTotal(){
    return this.toRealNumber(this.totalDesAchats() - this.calcReduction());
  }

  calcReduction(){
    //test si le client a le droit
    let reduc = 0;
    if(true && this.use_reduc ){
      reduc = (this.totalDesAchats() * 0.15)
    }
    return reduc;
  }

  noReduction(){
    this.use_reduc = false;
  }

  useReduction(){
    this.use_reduc = true;
  }

  paiementCash(){
    this.cash_selected = true;
  }

  paiementCheck(){
    this.check_selected = true;
  }

  cancelPaiement(){
    this.cash_selected = false;
    this.check_selected = false;
  }


  setCurrentToFirstStepNotTrue(){
    let mini: number = 0;
    this.etapesValides.forEach((step) => {
        if( !step.valid && (mini === 0 || step.ordre < mini) ){
          mini = step.ordre;
        }
    });
    this.current_step = mini;
  }

  saveFacture(){
    this.facture.client_id = parseInt(this.client.id+"");
    this.facture.facture_par_user_id = parseInt(this.client.id+"");
    this.facture.realise_par_user_id = parseInt(this.client.id+"");
    this.facture.date = this.date.getTime();
    this.facture.montant_total = this.calcTotal()+"";
    if(this.cash_selected)
      this.facture.paiement_id = 1;
    if(this.check_selected)
      this.facture.paiement_id = 2;
    console.log(this.facture);

    this._facture_serv.add(this.facture).subscribe((id)=>{
      console.log(id);

      //une fois qu'on a l'id de la facture, on le mets dans chaque achat
      this.liste_achats.forEach((element,index,arr)=>{
        element.facture_id = id;
      });
      //puis on les sauvegardes
      this._achat_serv.addAll(this.liste_achats).subscribe((data)=>{
        console.log(data);
      });

    });

/*
    public produit: Produit = null; //le produit en cours d'ajout
    public liste_produits: Array<Produit> = null;

    public prestation: Prestation= null; //le prestation en cours d'ajout
    public liste_prestations: Array<Prestation> = null;

    public achat: Achat = null; //le produit en cours d'ajout
    public liste_achats: Array<Achat> = null;

    public cash_selected:boolean = false;
    public check_selected = false;
    public cash:number = 0;
    public a_rendre:number = 0;

    private use_reduc = true;//utilisation de la reduc si dispo
    private id:number = 0;//id de client si on vient par une route de client
*/
  }

}
