import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from "../../services/breadcrumb.service";
import { ClientService } from "../../services/data/client.service";
import { Client } from "../../models/client";
import { TitleService } from "../../services/title.service";
import { ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
    public data: Array<Client> = null;
    //@ViewChild('datatable') datatable: Ng2SmartTableComponent;

    /*
    Gestion de la table
    */
    private settings: any = {
      columns: {
        nom: {
          title: 'NOM'
        },
       prenom: {
          title: 'Prénom'
        },
        email: {
          title: 'Email'
        }
      }
    };

    constructor(
      private _bread_serv: BreadcrumbService,
      private _client_serv: ClientService,
      private _title_serv: TitleService,
      private _toaster: ToasterService,
      private _router: Router
    ) {
      //on définie le fil d'ariane
      this._bread_serv.set([{
        label: "C-Coiffure",
        link: "/",
        icon: "dashboard"
      },{
        label: "Listing Client",
        link: "/client",
        icon: "users"
      }]);

      this._title_serv.set({
        title: "Liste des clients",
        description: "Editer les fiches clients"
      });


    }

    ngOnInit() {
      //on recupere les données de la table
      this._client_serv.getAll().subscribe((list) => {
        this.data = list;
      });

    }

    ngOnDestroy(){
      this._bread_serv.clear();
    }

    create(){
      this._router.navigate(["/client/"+0]);
      return false;
    }

    edit(client:Client){
      this._router.navigate(["/client/"+client.id]);
      return false;
    }

    delete(client:Client){
      if(confirm('Êtes vous sûr?')){
        //suppression
        this._client_serv.delete(client.id).subscribe((retour) => {
          //update data
          this.data = this.data.filter((unit) => unit !== client);
        },
        (error)=>{
          this._toaster.pop('error', 'Erreur de suppression', "La suppression n'a pas marché");
        });

      }
    }





  }
