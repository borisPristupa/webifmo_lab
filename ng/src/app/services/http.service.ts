import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Point} from "../Point";
import {User} from '../User'
import {Injectable} from "@angular/core";

@Injectable()
export class HttpService {
    constructor(private http: HttpClient){ }

    postAuth(user: User){

         const body = new URLSearchParams();
         body.set('login',user.login);
         body.set('password',user.password);
         console.log("Авторизация");
        return this.http.post('http://localhost:44480/webifmo/app/auth', body.toString(), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
}

    postReg(user :User){
        const body = new URLSearchParams();
        body.set('login',user.login);
        body.set('password',user.password);
        console.log("Регистрация");
        return this.http.post('http://localhost:44480/webifmo/app/auth/reg', body.toString(), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }


    getRecordsBySessionId(sessionId: string){
        console.log("Получение всех записей пользователя");
        return this.http.get('http://localhost:44480/webifmo/app/main/records?sessionId='+sessionId, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    }

    getAllRecordsByNew(sessionId: string, point: Point){
        const body = new URLSearchParams();
        body.set('sessionId',sessionId);
        body.set('x',point.x.toString());
        body.set('y',point.y.toString());
        body.set('r',point.r.toString());

        console.log("Новая точка! Тело post - запроса "+ body.toString());

        return this.http.get('http://localhost:44480/webifmo/app/main/records/add?'+ body.toString(), {
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        });
    }

    getClearRecords(sessionId: string){
        console.log("Очистка истории ");
        return this.http.get('http://localhost:44480/webifmo/app/main/records/clear?sessionId='+sessionId, {
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        });

    }

    getExit(login: string){
        console.log("Завершение сессии");
        return this.http.get('http://localhost:44480/webifmo/app/auth/exit?login='+login, {
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        });
    }
}

