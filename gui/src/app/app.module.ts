//external module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { Ng2AutoCompleteModule } from "ng2-auto-complete";
import { DataTableModule } from "angular2-datatable";

let modules = [
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
import { MessagesBoxComponent} from "./widgets/messages-box";
import { NotificationBoxComponent } from "./widgets/notification-box";
import { TasksBoxComponent } from "./widgets/tasks-box";
import { UserBoxComponent } from "./widgets/user-box"

let widgets = [
  AppComponent,
  AppHeaderComponent,
  MenuAsideComponent,
  MessagesBoxComponent,
  NotificationBoxComponent,
  TasksBoxComponent,
  UserBoxComponent
];

import {toProduitPipe} from "./pipes/produit";
import {toPrestationPipe} from "./pipes/prestation";

let pipes = [
  toProduitPipe,
  toPrestationPipe
]

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

let services =  [
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

let pages = [
  HomeComponent,
  PageNumComponent,
  ClientComponent,
  ClientEditComponent
]

//main bootstrap
import { AppComponent } from './app.component';
import { routing } from './app.routes';

@NgModule({
  declarations: [
    ...widgets,
    ...pages,
    ...pipes
  ],
  imports: [
    ...modules,
    routing
  ],
  providers: [
    ...services
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
