import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';
import {Router} from "@angular/router";

import Loader from "./game";

@Component({
    selector: 'my-app',
    templateUrl: './app.duck.html',
    styleUrls: ['./app.duck.css']
})
export class AppDuckComponent implements OnInit, OnDestroy{
    cause : string;

    ngOnInit(): void {
        if (this.storage.retrieve("message") == null ||
            this.storage.retrieve("message") == "") this.cause = "not found";
        else this.cause = this.storage.retrieve("message");

        Loader.prototype.load();
    }


    constructor(private storage: SessionStorageService,
                private router: Router){}


    returnBack(){
        if(this.storage.retrieve("auth") == false) {
            this.router.navigate(['']);
        }else this.router.navigate(['base']);

    }

    ngOnDestroy(): void {
        Loader.prototype.stop_interval();
    }

}