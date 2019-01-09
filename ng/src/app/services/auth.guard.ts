import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {SessionStorageService} from 'ngx-webstorage';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard  implements CanActivate{

    constructor(private router: Router,
                private storage: SessionStorageService){}

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        return this.storage.retrieve("sessionId") != null && this.storage.retrieve("message") == null;
    }
}