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
import { User } from "./models/user";
import { UserService } from "./services/user.service";
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { BreadcrumbService } from "./services/breadcrumb.service";
import { TitleService } from "./services/title.service";
var AppComponent = (function () {
    function AppComponent(_user_serv, _toastr, _bread_serv, _title_serv) {
        var _this = this;
        this._user_serv = _user_serv;
        this._toastr = _toastr;
        this._bread_serv = _bread_serv;
        this._title_serv = _title_serv;
        this.toastrConfig = new ToasterConfig({
            showCloseButton: true,
            newestOnTop: true,
            tapToDismiss: false
        });
        this._bread_serv.current.subscribe(function (data) {
            _this.breadcrumb = data;
        });
        this._title_serv.current.subscribe(function (data) {
            _this.title = data;
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var ie = this.detectIE();
        if (!ie) {
            window.dispatchEvent(new Event('resize'));
        }
        else {
            var event = document.createEvent("Event");
            event.initEvent("resize", false, true);
            window.dispatchEvent(event);
        }
        var user1 = new User({
            firstname: "WALTER",
            lastname: "Caroline",
            email: "test@gmail.com",
            avatar_url: "public/assets/img/user2-160x160.jpg"
        });
        this._user_serv.setCurrentUser(user1);
    };
    AppComponent.prototype.detectIE = function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        return false;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
    }),
    __metadata("design:paramtypes", [UserService,
        ToasterService,
        BreadcrumbService,
        TitleService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=../../../src/app/app.component.js.map