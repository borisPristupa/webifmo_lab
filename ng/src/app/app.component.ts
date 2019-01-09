///<reference path="./duck/app.duck.component.ts"/>
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: '<router-outlet> </router-outlet>',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    name= '';
}