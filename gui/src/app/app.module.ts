//external module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { environment } from '../environments/environment';

let modules = [
  AlertModule,
  DatepickerModule,
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule,
  ToasterModule
];

import { AppHeaderComponent } from "./widgets/app-header";
import { MenuAsideComponent } from "./widgets/menu-aside";
import { MessagesBoxComponent} from "./widgets/messages-box";
import { NotificationBoxComponent } from "./widgets/notification-box";
import { TasksBoxComponent } from "./widgets/tasks-box";
import { UserBoxComponent } from "./widgets/user-box";
import { BreadcrumbComponent } from "./widgets/breadcrumb";

let widgets = [
  AppComponent,
  AppHeaderComponent,
  MenuAsideComponent,
  MessagesBoxComponent,
  NotificationBoxComponent,
  TasksBoxComponent,
  UserBoxComponent,
  BreadcrumbComponent
];

import { UserService } from "./services/user.service";
import { MessagesService } from "./services/messages.service";
import { NotificationService } from './services/notification.service';
import { XiaomiDeviceService } from "./services/data/xiaomi_device.service";
import { BreadcrumbService } from "./services/breadcrumb.service";
import { NodeRestService } from "./services/node-rest.service";
import { XiaomiEventService } from "./services/data/xiaomi_event.service";

let services =  [
  UserService,
  MessagesService,
  NotificationService,
  BreadcrumbService,
  NodeRestService,
  XiaomiEventService,
  XiaomiDeviceService
];

import { HomeComponent } from './pages/home/home.component';

let pages = [
  HomeComponent,
]

import { toDevicePipe } from "./pipes/device";

let pipes = [
  toDevicePipe
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
