import {Component} from '@angular/core';
import {User} from '../User';
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";

import {SessionStorageService} from 'ngx-webstorage';


@Component({
    selector: 'authorization',
    templateUrl: './app.authorization.html',
    styleUrls: ['./app.authorization.css'],
    providers: [HttpService]
})

export class AppAuthorizationComponent{
    login = "";
    password = "";
    message = "";

    new_login ="";
    new_password_1 = "";
    new_password_2 = "";
    reg_message = "";
    correct_message ="";

    user : User = new User();
    newUser : User = new User();

    constructor(private httpService: HttpService,
                private router: Router,
                private storage: SessionStorageService){}

    entry(login : string, password : string){
        this.submit(this.getData(login, password))
    }

    getData(login : string, password : string){
        //console.log("login = "+login+" and password = "+ password);
        //this.router.navigate(['base']);

        this.user.login = this.login;
        this.user.password = this.password;

        return this.user;
     }

    submit(user: User ){

        this.httpService.postAuth(user)
            .subscribe(
                data => {this.message = data['message'];
                                this.storage.store("sessionId",data['sessionId']);
                                this.storage.store("message",data['message']);
                                this.storage.store("login",this.user.login);
                    this.storage.store("auth",true);
                    console.log(this.message);
                    if(this.message == null ) {
                        this.router.navigate(['base']);
                    }
                 },
                error => {
                    //console.log("the code is " + error.statusCode);
                    this.storage.store("auth",false);
                    this.router.navigate(['duck']);
                }
            );


    }


    goToReg(){
        console.log("переходим к регистрации");
        const auth = document.getElementById("auth");
        const reg = document.getElementById("reg");

        reg.style.visibility = "visible";
        auth.style.visibility = "hidden";

    }

    registrate(){
        if(this.new_password_1 == this.new_password_2){
            this.newUser.login = this.new_login;
            this.newUser.password = this.new_password_1;
           this.httpService.postReg(this.newUser).subscribe(
               data => {
                   this.reg_message = data['message'];
                   this.storage.store("sessionId",data['sessionId']);
                   this.storage.store("message",data['message']);
                   this.storage.store("login",this.user.login);
                   this.storage.store("auth",true);
                   //console.log(this.message);
                   if(this.reg_message == null ) {
                       this.router.navigate(['base']);
                   }
               },
               error => {
                   //console.log("the code is " + error.statusCode);
                   this.storage.store("auth",false);
                   this.router.navigate(['duck']);
               }
           )
        }
    }

// проверка идентиности вводимых паролей
    checkPassword(){
        const text = document.getElementById("cM");
        if (this.new_password_1 != this.new_password_2) {
            this.correct_message = "Пароли не совпадают";
            text.style.color = "red";
        }
        else {
            this.correct_message = "Пароли совпадают :) ";
            text.style.color = "green";
        }
    }


//todo: 1. проверить css для footer (видно ли все при всех раскладках)
    //todo: 2. уточки и основная страница  (для основной скорее грид-ы а не media)

}