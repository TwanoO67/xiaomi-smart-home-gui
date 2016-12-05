var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { Ng2AutoCompleteModule } from "ng2-auto-complete";
import { DataTableModule } from "angular2-datatable";
var modules = [
    AlertModule,
    DatepickerModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    Ng2AutoCompleteModule,
    DataTableModule,
    ToasterModule
];
import { AppHeaderComponent } from "./widgets/app-header";
import { MenuAsideComponent } from "./widgets/menu-aside";
import { MessagesBoxComponent } from "./widgets/messages-box";
import { NotificationBoxComponent } from "./widgets/notification-box";
import { TasksBoxComponent } from "./widgets/tasks-box";
import { UserBoxComponent } from "./widgets/user-box";
var widgets = [
    AppComponent,
    AppHeaderComponent,
    MenuAsideComponent,
    MessagesBoxComponent,
    NotificationBoxComponent,
    TasksBoxComponent,
    UserBoxComponent
];
import { toProduitPipe } from "./pipes/produit";
import { toPrestationPipe } from "./pipes/prestation";
var pipes = [
    toProduitPipe,
    toPrestationPipe
];
import { UserService } from "./services/user.service";
import { MessagesService } from "./services/messages.service";
import { BreadcrumbService } from "./services/breadcrumb.service";
import { TitleService } from "./services/title.service";
import { FactureService } from "./services/data/facture.service";
import { ClientService } from "./services/data/client.service";
import { ProduitService } from "./services/data/produit.service";
import { PrestationService } from "./services/data/prestation.service";
import { AchatService } from "./services/data/achat.service";
import { Configuration } from "./app.constants";
var services = [
    Configuration,
    UserService,
    MessagesService,
    BreadcrumbService,
    TitleService,
    FactureService,
    ClientService,
    ProduitService,
    PrestationService,
    AchatService
];
import { HomeComponent } from './pages/home/home.component';
import { PageNumComponent } from './pages/page-num/page-num.component';
import { ClientComponent } from './pages/client/client.component';
import { ClientEditComponent } from './pages/client/edit/edit';
var pages = [
    HomeComponent,
    PageNumComponent,
    ClientComponent,
    ClientEditComponent
];
import { AppComponent } from './app.component';
import { routing } from './app.routes';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: widgets.concat(pages, pipes),
        imports: modules.concat([
            routing
        ]),
        providers: services.slice(),
        bootstrap: [AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
export { AppModule };
//# sourceMappingURL=../../../src/app/app.module.js.map