import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';
import {Router} from "@angular/router";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import Loader from "./game";

@Component({
    selector: 'my-app',
    templateUrl: './app.duck.html',
    styleUrls: ['./app.duck.css']
})
export class AppDuckComponent implements OnInit, OnDestroy{

    constructor(private storage: SessionStorageService,
                private router: Router){}


    returnBack(){
        if(this.storage.retrieve("auth") == false) {
            this.router.navigate(['']);
        }else this.router.navigate(['base']);

    }

    ngOnInit(): void {
        Loader.prototype.load();
    }

    ngOnDestroy(): void {
        Loader.prototype.stop_interval();
    }


}