import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Point} from "./Point";
import {User} from './User'
import {Injectable} from "@angular/core";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient){ }

    postAuth(user: User){
        const body = {login: user.login, password: user.password};
        let headers = new HttpHeaders();
        return this.http.post('http://localhost:44480/webifmo/app/auth', body,{
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        })
}


    postData(point: Point){

        const body = {x: point.x, y: point.y, r: point.r};
        return this.http.post('http://localhost:44480/Webifmo_war_exploadad/app/main/records', body, {
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        });
    }
}