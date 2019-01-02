import {Component} from '@angular/core';
import {User} from './User';
import {HttpService} from "./http.service";

@Component({
    selector: 'authorization',
    templateUrl: './app.authorization.html',
    styleUrls: ['./app.authorization.css'],
    providers: [HttpService]
})
export class AppAuthorizationComponent{
    login = "";
    password = "";

    user : User = new User();

    constructor(private httpService: HttpService){}

    getData(login : string, password : string){
        console.log("login = "+login+" and password = "+ password);
        this.setValues();
    }
     setValues(){
        this.user.login = this.login;
        this.user.password = this.password;
        this.submit(this.user);
     }

    submit(user: User ){
        this.httpService.postAuth(user)
            .subscribe(
                (data: User) => {this.user = data["userInfo"]},
                error1 => console.log(error1)
            )
    }
}