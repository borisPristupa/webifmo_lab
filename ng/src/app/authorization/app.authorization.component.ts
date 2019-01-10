import {Component, OnInit} from '@angular/core';
import {User} from '../User';
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";

import {SessionStorageService} from 'ngx-webstorage';
import {el} from "@angular/platform-browser/testing/src/browser_util";


@Component({
    selector: 'authorization',
    templateUrl: './app.authorization.html',
    styleUrls: ['./app.authorization.css'],
    providers: [HttpService]
})

export class AppAuthorizationComponent implements OnInit{
    login = "";
    password = "";
    auth_message = "";

    new_login ="";
    new_password_1 = "";
    new_password_2 = "";
    reg_message = "";
    correct_message ="";

    user : User = new User();
    newUser : User = new User();

    ngOnInit(){
        this.storage.store("auth",false);
        this.storage.store("message", "");
    }

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
                data => {this.auth_message = data['message'];
                                this.storage.store("sessionId",data['sessionId']);
                                this.storage.store("message",data['message']);
                                this.storage.store("login",this.user.login);
                    this.storage.store("auth",true);
                    console.log(this.auth_message);
                    if(this.auth_message == null || this.auth_message == "Already authorized") {
                        this.router.navigate(['base']);
                    }
                    else if (this.isServerError()) {
                        this.router.navigate(['duck']);
                    }
                 },
                error => {
                    //console.log("the code is " + error.statusCode);
                    this.storage.store("auth",false);
                    this.storage.store("message","Connection error");
                    this.router.navigate(['duck']);
                }
            );


    }

    //
    // goToReg(){
    //     console.log("переходим к регистрации");
    //     const auth = document.getElementById("auth");
    //     const reg = document.getElementById("reg");
    //
    //     reg.style.visibility = "visible";
    //     auth.style.visibility = "hidden";
    //
    // }

    registrate(){
        if(this.isNewDataCorrect()){
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
                   if (this.reg_message == null || this.reg_message == "Already authorized") {
                       this.router.navigate(['base']);
                   }
                   else if (this.isServerError()) {
                       this.router.navigate(['duck']);
                   }
               },
               error => {
                   //console.log("the code is " + error.statusCode);
                   this.storage.store("auth",false);
                   this.storage.store("message","Connection error");
                   this.router.navigate(['duck']);
               }
           )
        }
    }

    isNewDataCorrect() {
        this.checkEmptyData();
        return this.new_login != "" && this.new_password_1 != "" && this.new_password_1 == this.new_password_2;
    }

    checkEmptyData() {

        if (this.new_login == "") document.getElementById("newLogin").style.background = "red";
            else document.getElementById("newLogin").style.background = "white";
        if (this.new_password_1 == "") document.getElementById("newPassword1").style.background = "red";
            else document.getElementById("newPassword1").style.background = "white";
        if (this.new_password_2 == "") document.getElementById("newPassword2").style.background = "red";
            else document.getElementById("newPassword2").style.background = "white";

    }

// проверка идентичности вводимых паролей
    checkPassword(){
        const text = document.getElementById("cM");
        if (this.new_password_1 != this.new_password_2  ) {
            this.correct_message = "Пароли не совпадают";
            text.style.color = "red";
        }
        else if (this.new_password_2 != "") {
            this.correct_message = "Пароли совпадают :) ";
            text.style.color = "green";
        }
    }

    isServerError(){
        let isSevere = this.storage.retrieve("message") != "Wrong login/password" &&
            !this.storage.retrieve("message").includes('No such user') &&
            this.storage.retrieve("message") != "Already authorized" &&
            this.storage.retrieve("message") != "User "+this.new_login+" already registered" &&
            this.storage.retrieve("message") != null ;
        console.log("_________________" + this.storage.retrieve('message') + " = " + isSevere);
        return isSevere ;

    }


//todo: 1. проверить css для footer (видно ли все при всех раскладках)
    //todo: 2. уточки и основная страница  (для основной скорее грид-ы а не media)

}