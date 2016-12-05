import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreadcrumbService } from "../../../services/breadcrumb.service";
import { ClientService } from "../../../services/data/client.service";
import { Client } from "../../../models/client";
import { TitleService } from "../../../services/title.service";
import { ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'app-client-edit',
  templateUrl: './edit.html'
})
export class ClientEditComponent implements OnInit {
  private id:number = 0;
  private client:Client = null;

    constructor(
      private _bread_serv: BreadcrumbService,
      private _client_serv: ClientService,
      private _title_serv: TitleService,
      private _toaster: ToasterService,
      private _route: ActivatedRoute,
      private _router: Router
    ) {

      this._title_serv.set({
        title: "Liste des clients",
        description: "Editer les fiches clients"
      });


    }

    ngOnInit() {
      this._route.params.forEach((params: Params) => {
        this.id = +params['id'];

        //on recupere les données de la table
        if(this.id && this.id > 0){
          this._bread_serv.set([{
            label: "C-Coiffure",
            link: "/",
            icon: "dashboard"
          },{
            label: "Listing Client",
            link: "/client",
            icon: "users"
          },{
            label: "Editer une fiche",
            link: "/client/"+this.id,
            icon: "user"
          }]);

          this._client_serv.get(this.id).subscribe((edit) => {
            this.client = edit;
          });
        }
        else{
          this._bread_serv.set([{
            label: "C-Coiffure",
            link: "/",
            icon: "dashboard"
          },{
            label: "Listing Client",
            link: "/client",
            icon: "users"
          },{
            label: "Création d'une fiche",
            link: "/client/"+0,
            icon: "user"
          }]);

          this.client = new Client();

        }
      })



    }

    ngOnDestroy(){
      this._bread_serv.clear();
    }

    save(client:Client){
      if(client.id > 0){
        this._client_serv.update(client.id,client).subscribe((retour) => {
          //go back to list
          this._router.navigate(["/client/"]);
        });
      }
      else{
        this._client_serv.add(client).subscribe((retour) => {
          console.log(retour);
          client.id = retour;
          //go back to list
          this._router.navigate(["/client/"+retour]);
        });
      }
    }

    cancel(){
      this._router.navigate(["/client/"]);
    }

    delete(client:Client){
      if(confirm('Êtes vous sûr?')){
        //suppression
        this._client_serv.delete(client.id).subscribe((retour) => {
          //update data
          this._router.navigate(["/client/"]);
        },
        (error)=>{
          this._toaster.pop('error', 'Erreur de suppression', "La suppression n'a pas marché");
        });

      }
    }

    facture(){
      this._router.navigate(["/facture/client/"+this.id]);
    }





  }
