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
var modules = [
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
import { MessagesBoxComponent } from "./widgets/messages-box";
import { NotificationBoxComponent } from "./widgets/notification-box";
import { TasksBoxComponent } from "./widgets/tasks-box";
import { UserBoxComponent } from "./widgets/user-box";
import { BreadcrumbComponent } from "./widgets/breadcrumb";
var widgets = [
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
import { DeviceService } from "./services/data/device.service";
import { Configuration } from "./app.constants";
var services = [
    Configuration,
    UserService,
    MessagesService,
    NotificationService,
    DeviceService
];
import { HomeComponent } from './pages/home/home.component';
var pages = [
    HomeComponent,
];
import { toDevicePipe } from "./pipes/device";
var pipes = [
    toDevicePipe
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