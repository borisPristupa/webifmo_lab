import { Component } from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';
import {Router} from "@angular/router";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
    selector: 'my-app',
    templateUrl: './app.duck.html',
    styleUrls: ['./app.duck.css']
})
export class AppDuckComponent {

    constructor(private storage: SessionStorageService,
                private router: Router){}


    returnBack(){
        if(this.storage.retrieve("auth") == false) {
            this.router.navigate(['']);
        }else this.router.navigate(['base']);

    }


}