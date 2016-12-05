var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from "../../services/breadcrumb.service";
import { FactureService } from "../../services/data/facture.service";
import { Facture } from "../../models/facture";
import { ClientService } from "../../services/data/client.service";
import { Client } from "../../models/client";
import { ProduitService } from "../../services/data/produit.service";
import { AchatService } from "../../services/data/achat.service";
import { Achat } from "../../models/achat";
import { PrestationService } from "../../services/data/prestation.service";
var HomeComponent = (function () {
    function HomeComponent(_bread_serv, _client_serv, _produit_serv, _presta_serv, _facture_serv, _achat_serv, _route, _router) {
        this._bread_serv = _bread_serv;
        this._client_serv = _client_serv;
        this._produit_serv = _produit_serv;
        this._presta_serv = _presta_serv;
        this._facture_serv = _facture_serv;
        this._achat_serv = _achat_serv;
        this._route = _route;
        this._router = _router;
        this.date = new Date();
        this.facture = null;
        this.etapesValides = [
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
        this.current_step = 1;
        this.client = null;
        this.liste_clients = null;
        this.produit = null;
        this.liste_produits = null;
        this.prestation = null;
        this.liste_prestations = null;
        this.achat = null;
        this.liste_achats = null;
        this.cash_selected = false;
        this.check_selected = false;
        this.cash = 0;
        this.a_rendre = 0;
        this.use_reduc = true;
        this.id = 0;
        this._bread_serv.set([{
                label: "C-Coiffure",
                link: "/",
                icon: "dashboard"
            }, {
                label: "Nouvelle facture",
                link: "/",
                icon: "dollar"
            }]);
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            _this.id = +params['id'];
            _this.initClient();
        });
        this.facture = new Facture();
        this.facture.date = Math.floor(Date.now() / 1000);
        this.liste_achats = [];
        this._client_serv.getAll().subscribe(function (list) {
            _this.liste_clients = list.sort(function (a, b) {
                if (a.nom < b.nom) {
                    return -1;
                }
                else if (a.nom > b.nom) {
                    return 1;
                }
                else if (a.prenom < b.prenom) {
                    return -1;
                }
                else if (a.prenom > b.prenom) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            _this.initClient();
        });
        this._produit_serv.getAll().subscribe(function (list) {
            _this.liste_produits = list.sort(function (a, b) {
                if (a.nom < b.nom) {
                    return -1;
                }
                else if (a.nom > b.nom) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        });
        this._presta_serv.getAll().subscribe(function (list) {
            _this.liste_prestations = list.sort(function (a, b) {
                if (a.nom < b.nom) {
                    return -1;
                }
                else if (a.nom > b.nom) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        });
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this._bread_serv.clear();
    };
    HomeComponent.prototype.initClient = function () {
        console.log("client init", this.id, this.client);
        if (this.id > 0 && !this.client) {
            console.log('la');
            this.client = this._client_serv.getFromCache(this.id);
        }
    };
    HomeComponent.prototype.validerStep1 = function () {
        this.changeValidOfStep(1, true);
        this.setCurrentToFirstStepNotTrue();
    };
    HomeComponent.prototype.create = function () {
        this._router.navigate(["/client/" + 0]);
        return false;
    };
    HomeComponent.prototype.clientAnonyme = function () {
        this.client = new Client({
            id: 0,
            nom: "ANONYME",
            prenom: ""
        });
        this.validerStep1();
    };
    HomeComponent.prototype.ajouterPresta = function (id) {
        var presta = this.getPresta(id);
        var achat = this.getAchatByPresta(presta);
        if (!achat) {
            achat = new Achat({
                prestation_id: presta.id,
                quantite: 1,
                montant_unitaire: presta.tarif
            });
            this.liste_achats.push(achat);
        }
        else {
            achat.quantite++;
        }
    };
    HomeComponent.prototype.ajouterProduit = function (id) {
        var produit = this.getProduit(id);
        var achat = this.getAchatByProduit(produit);
        if (!achat) {
            achat = new Achat({
                produit_id: produit.id,
                quantite: 1,
                montant_unitaire: produit.tarif
            });
            this.liste_achats.push(achat);
        }
        else {
            achat.quantite++;
        }
    };
    HomeComponent.prototype.retirerProduit = function (id) {
        var produit = this.getProduit(id);
        var achat = this.getAchatByProduit(produit);
        if (achat) {
            achat.quantite--;
            if (achat.quantite <= 0) {
                this.liste_achats = this.liste_achats.filter(function (unit) { return unit !== achat; });
            }
        }
    };
    HomeComponent.prototype.retirerPresta = function (id) {
        var presta = this.getPresta(id);
        var achat = this.getAchatByPresta(presta);
        if (achat) {
            achat.quantite--;
            if (achat.quantite <= 0) {
                this.liste_achats = this.liste_achats.filter(function (unit) { return unit !== achat; });
            }
        }
    };
    HomeComponent.prototype.getProduit = function (id) {
        return this.liste_produits.find(function (unit) { return unit.id === id; });
    };
    HomeComponent.prototype.getAchatByProduit = function (produit) {
        return this.liste_achats.find(function (unit) { return unit.produit_id === produit.id; });
    };
    HomeComponent.prototype.getPresta = function (id) {
        return this.liste_prestations.find(function (unit) { return unit.id === id; });
    };
    HomeComponent.prototype.getAchatByPresta = function (presta) {
        return this.liste_achats.find(function (unit) { return unit.prestation_id === presta.id; });
    };
    HomeComponent.prototype.getListePresta = function () {
        return this.liste_achats.filter(function (unit) { return unit.prestation_id > 0; });
    };
    HomeComponent.prototype.getListeProduit = function () {
        return this.liste_achats.filter(function (unit) { return unit.produit_id > 0; });
    };
    HomeComponent.prototype.validerStep2 = function () {
        this.changeValidOfStep(2, true);
        this.setCurrentToFirstStepNotTrue();
    };
    HomeComponent.prototype.goBackStep1 = function () {
        this.changeValidOfStep(1, false);
        this.setCurrentToFirstStepNotTrue();
    };
    HomeComponent.prototype.goBackStep2 = function () {
        this.changeValidOfStep(2, false);
        this.setCurrentToFirstStepNotTrue();
    };
    HomeComponent.prototype.changeValidOfStep = function (num_step, value) {
        this.etapesValides = this.etapesValides.map(function (step) {
            if (num_step === step.ordre) {
                step.valid = value;
            }
            return step;
        });
    };
    HomeComponent.prototype.toRealNumber = function (num) {
        return (Math.floor(num * 100)) / 100;
    };
    HomeComponent.prototype.totalDesAchats = function () {
        var total = 0;
        this.liste_achats.forEach(function (achat) {
            total += achat.getMontantTotal();
        });
        return total;
    };
    HomeComponent.prototype.calcTotal = function () {
        return this.toRealNumber(this.totalDesAchats() - this.calcReduction());
    };
    HomeComponent.prototype.calcReduction = function () {
        var reduc = 0;
        if (true && this.use_reduc) {
            reduc = (this.totalDesAchats() * 0.15);
        }
        return reduc;
    };
    HomeComponent.prototype.noReduction = function () {
        this.use_reduc = false;
    };
    HomeComponent.prototype.useReduction = function () {
        this.use_reduc = true;
    };
    HomeComponent.prototype.paiementCash = function () {
        this.cash_selected = true;
    };
    HomeComponent.prototype.paiementCheck = function () {
        this.check_selected = true;
    };
    HomeComponent.prototype.cancelPaiement = function () {
        this.cash_selected = false;
        this.check_selected = false;
    };
    HomeComponent.prototype.setCurrentToFirstStepNotTrue = function () {
        var mini = 0;
        this.etapesValides.forEach(function (step) {
            if (!step.valid && (mini === 0 || step.ordre < mini)) {
                mini = step.ordre;
            }
        });
        this.current_step = mini;
    };
    HomeComponent.prototype.saveFacture = function () {
        var _this = this;
        this.facture.client_id = parseInt(this.client.id + "");
        this.facture.facture_par_user_id = parseInt(this.client.id + "");
        this.facture.realise_par_user_id = parseInt(this.client.id + "");
        this.facture.date = this.date.getTime();
        this.facture.montant_total = this.calcTotal() + "";
        if (this.cash_selected)
            this.facture.paiement_id = 1;
        if (this.check_selected)
            this.facture.paiement_id = 2;
        console.log(this.facture);
        this._facture_serv.add(this.facture).subscribe(function (id) {
            console.log(id);
            _this.liste_achats.forEach(function (element, index, arr) {
                element.facture_id = id;
            });
            _this._achat_serv.addAll(_this.liste_achats).subscribe(function (data) {
                console.log(data);
            });
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    }),
    __metadata("design:paramtypes", [BreadcrumbService,
        ClientService,
        ProduitService,
        PrestationService,
        FactureService,
        AchatService,
        ActivatedRoute,
        Router])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=../../../../../src/app/pages/home/home.component.js.map