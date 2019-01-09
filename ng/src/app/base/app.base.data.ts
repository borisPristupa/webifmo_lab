import {Component, OnInit} from '@angular/core';
import {TemplateRef, ViewChild} from '@angular/core';
import {Point} from "../Point";
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";

import {SessionStorageService} from 'ngx-webstorage';
import {Records} from "../Records";


@Component({
    selector: 'data',
    templateUrl: './app.base.data.html',
    styleUrls: ['./app.base.data.css'],
    providers: [HttpService]
})
export class AppBaseData implements OnInit{
  //  @ViewChild('myTemplate') myTemplate: TemplateRef<any>;
    records: Array<Records> ;

    ngOnInit(){
        console.log("Переход на вторую страницу осуществлен");
        this.draw();

        this.httpService.getRecordsBySessionId(this.storage.retrieve("sessionId")).subscribe(
            data => {
                this.storage.store("records", data['records']);
                this.drawAllPoints();
                this.records = data['records']
            }
        );
    }

    point : Point = new Point();

    constructor(private httpService: HttpService,
                 private router: Router,
                private storage: SessionStorageService) {
        this.records = [];
    }

    x: number = 0;
    y: number;
    r: number = 1;

    hit: boolean;


    current_x: number;
    current_y: number;

    request_message: string;
    error_message: string;

    i: number;





    // addAllRecords(){
    //     const records = this.storage.retrieve("records");
    //     for (this.i=0;this.i<records.length;this.i++){
    //
    //         this.record.x = records[this.i]['x'];
    //         this.record.y = records[this.i]['y'];
    //         this.record.r = records[this.i]['r'];
    //         this.record.hit = records[this.i]['hit'];
    //
    //
    //     }
    // }

    // loadTemplate(record: Records){
    //     return this.myTemplate;
    // }

// отправление запроса по нажатию кнопки
    submitByButton(point: Point){
        this.httpService.getAllRecordsByNew(this.storage.retrieve('sessionId'),point)
            .subscribe(
                data=>{this.storage.store("records",data['records']);
                            this.request_message = data['message'];

                            this.drawAllPoints();
                            this.records = data['records']

                    }, error => {
                    this.router.navigate(['duck']);
                });
    }

// отправление запроса по нажатию точки на графике
    submitByGraphic(event: MouseEvent){
        this.httpService.getAllRecordsByNew(this.storage.retrieve('sessionId'),this.getCoordinates(event))
            .subscribe(
                data=>{this.storage.store("records",data['records']);
                            this.request_message = data['message'];

                            this.drawAllPoints();
                            this.records = data['records']
                }, error => {
                    this.router.navigate(['duck']);
                }
            )
    }

// при некорректных значениях сообщение об ошибке
    validateY(y:number){
        if  (y>=-3 && y <= 5 && y!=null)  {
            this.error_message = "";
            return true;
        }
        else {
            this.error_message = "Некорректное значение y";
            return false;
        }
   }

// считывание введенных значений координат
    getValues(){
        if(this.validateY(this.y)){
            this.point.x = this.x;
            this.point.y = this.y;
            this.point.r = this.r;
            this.submitByButton( this.point);
        }
    }

// чтение координат с графика
    getCoordinates(event: MouseEvent){
        //const graph = document.getElementById('sys').getBoundingClientRect();
       this.current_x = (event.offsetX - 150) * this.r * 0.01;
       this.current_y = (-1) * (event.offsetY - 150) * this.r * 0.01;
       this.point.x = this.current_x;
       this.point.y = this.current_y;
       this.point.r = this.r;

       return this.point;
    }

// отрисовка графика (пустого)
    draw(){

        const canvas = <HTMLCanvasElement>document.getElementById("sys");
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.clearRect(0,0,300,300);
        ctx.closePath();


        // оси координат

        ctx.strokeStyle = "#55ccff";
        ctx.lineWidth = 2;
        ctx.moveTo(0, 150);
        ctx.lineTo(300, 150);
        ctx.moveTo(150, 0);
        ctx.lineTo(150, 300);

        ctx.moveTo(300, 150);
        ctx.lineTo(290, 145);
        ctx.moveTo(300, 150);
        ctx.lineTo(290, 155);

        ctx.moveTo(150, 0);
        ctx.lineTo(145, 10);
        ctx.moveTo(150, 0);
        ctx.lineTo(155, 10);

        ctx.stroke();

        ctx.strokeStyle = "#blueviolet";
        ctx.fillStyle = "rgba(138,43,226, 0.5)";

// часть окружности (3 четверть)
        ctx.beginPath();
        ctx.arc(150, 150, 50,  Math.PI / 2,  Math.PI);
        ctx.lineTo(150, 150);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

// прямоугольник (2 четверть)
        ctx.beginPath();
        ctx.moveTo(50, 150);
        ctx.lineTo(50, 100);
        ctx.lineTo(150, 100);
        ctx.lineTo(150, 150);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

// треугольник (4 четверть)
        ctx.moveTo(150, 150);
        ctx.lineTo(150, 200);
        ctx.lineTo(200, 150);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

// штрихи на координатных осях
        // вдоль Ох
        ctx.strokeStyle = "#55ccff";
        ctx.beginPath();
        ctx.moveTo(50, 145);
        ctx.lineTo(50, 155);
        ctx.moveTo(100, 145);
        ctx.lineTo(100, 155);
        ctx.moveTo(200, 145);
        ctx.lineTo(200, 155);
        ctx.moveTo(250, 145);
        ctx.lineTo(250, 155);
        ctx.closePath();
        ctx.stroke();
        // вдоль Оy
        ctx.beginPath();
        ctx.moveTo(145, 50);
        ctx.lineTo(155, 50);
        ctx.moveTo(145, 100);
        ctx.lineTo(155, 100);
        ctx.moveTo(145, 200);
        ctx.lineTo(155, 200);
        ctx.moveTo(145, 250);
        ctx.lineTo(155, 250);
        ctx.closePath();
        ctx.stroke();

// подпись осей
        ctx.fillStyle = "black";
        ctx.font = "16px Times New Roman bold";
        ctx.fillText("-R", 40, 170);
        ctx.fillText("-R/2", 90, 170);
        ctx.fillText("R/2", 190, 170);
        ctx.fillText("R", 240, 170);

        ctx.fillText("R", 130, 55);
        ctx.fillText("R/2", 120, 105);
        ctx.fillText("-R/2", 120, 205);
        ctx.fillText("-R", 130, 255);

        ctx.fillText("y", 135, 10);
        ctx.fillText("x", 290, 165);

        ctx.stroke();
    }


// отрисовка всех точек
    drawAllPoints(){
        this.draw();
        const all_records = this.storage.retrieve("records");

        for (this.i=0;this.i<all_records.length;this.i++){
            this.point.x = all_records[this.i]['x'];
            this.point.y = all_records[this.i]['y'];
            this.point.r = all_records[this.i]['r'];

            this.hit = all_records[this.i]['hit'] == "true";

            this.drawOnePoint(this.point,this.hit);
        }
    }

// при изменении радиуса
    reDraw(){
        console.log("new r = "+ this.r);

        this.draw();
        const all_records = this.storage.retrieve("records");

        for (this.i=0;this.i<all_records.length;this.i++){
            this.point.x = all_records[this.i]['x'];
            this.point.y = all_records[this.i]['y'];
            this.point.r = this.r;
            this.hit = this.checkHit(this.point);

            this.drawOnePoint(this.point,this.hit);
        }

    }

// одна новая точка на графике
    drawOnePoint(point: Point, hit: boolean) {
        const canvas = <HTMLCanvasElement>document.getElementById("sys");
        const ctx = canvas.getContext('2d');
        const x = point.x * 100 / point.r + 150;
        const y = (-1) * point.y * 100 / point.r + 150;

        console.log(hit);

        ctx.beginPath();

        if (hit) {
            ctx.strokeStyle = "green";
            console.log("green");
        }
        else {
            ctx.strokeStyle = "red";
            console.log("red");
        }


        ctx.arc(x, y,3,0,2*Math.PI);
        ctx.closePath();

        ctx.stroke();
    }

    checkHit(point: Point){
        const x = point.x, y = point.y, r = point.r;
        return (x>=(-1)*r && x<=0 && y>=0 && y<=0.5*r) ||
                    (x<=0 && y<=0 && (x*x + y*y <= r*r*0.25) ) ||
                    (x>=0 && y<=0 && y>= (x-r*0.5)) ;
    }



// очистка истории нажатий - запрос
    clearRecords(){
        this.httpService.getClearRecords(this.storage.retrieve("sessionId"))
            .subscribe(data=> {this.storage.clear("records");
                            this.draw();
                            this.records = [];
            },error => {
                this.router.navigate(['duck']);
            }
        );
    }

// завершение текущей сессии пользователя - запрос
    closeSession(){
        this.httpService.getExit(this.storage.retrieve("login"))
            .subscribe(data=> {
                        this.storage.store('auth',"false");
                        this.storage.clear("login");
                        this.storage.clear("sessionId");
                        this.storage.clear("message");
                        this.storage.clear("records");
                this.router.navigate(['']);
            },
                    error => {
                    this.router.navigate(['duck']);
            });
    }

}