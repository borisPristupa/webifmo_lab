import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import {AppHeaderComponent} from "./header/app.header.component";
import {AppFooterComponent} from "./footer/app.footer.component";
import {AppAuthorizationComponent} from "./authorization/app.authorization.component";
import {RouterModule, Routes} from "@angular/router";
import { HttpClientModule }   from '@angular/common/http';

import {NgxWebstorageModule} from 'ngx-webstorage';


import {AppBaseData} from "./base/app.base.data";
import {AppBaseComponent} from "./app.base.component";
import {AppEnterComponent} from "./app.enter.component";
import {AppDuckComponent} from "./duck/app.duck.component";
import {AuthGuard} from "./services/auth.guard";

const routes: Routes = [
    {path: '', component: AppEnterComponent},
    {path: 'base', component: AppBaseComponent, canActivate: [AuthGuard]},
    {path: 'duck', component: AppDuckComponent}
];

@NgModule({
    imports:      [ BrowserModule, FormsModule , HttpClientModule,
                        RouterModule.forRoot(routes) , NgxWebstorageModule.forRoot()],
    declarations: [ AppComponent, AppEnterComponent,
                        AppHeaderComponent , AppFooterComponent,
                        AppAuthorizationComponent, AppBaseComponent,
                        AppBaseData, AppDuckComponent],
    bootstrap:    [ AppComponent ],
    providers: [AuthGuard]
})
export class AppModule { }