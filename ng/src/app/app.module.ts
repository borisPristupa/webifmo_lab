import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppHeaderComponent} from "./app.header.component";
import {AppFooterComponent} from "./app.footer.component";
import {AppAuthorizationComponent} from "./app.authorization.component";

import {HttpClientModule} from '@angular/common/http';
import {AppBaseData} from "./app.base.data";


@NgModule({
    imports:      [ BrowserModule, FormsModule , HttpClientModule],
    declarations: [ AppComponent, AppHeaderComponent , AppFooterComponent, AppAuthorizationComponent,AppBaseData],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }