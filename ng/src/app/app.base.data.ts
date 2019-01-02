import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Point} from "./Point";
import {HttpService} from "./http.service";
import {Records} from "./Records";


@Component({
    selector: 'data',
    templateUrl: './app.base.data.html',
    styleUrls: ['./app.base.data.css'],
    providers: [HttpService]
})
export class AppBaseData implements OnInit{
    ngOnInit(){
        console.log("i am working");
        this.draw();
    }

    point : Point = new Point();
    records: Records = new Records();
    http : HttpClient;


    constructor(private httpService: HttpService){}

    x: number = 0;
    y: number;
    r: number = 1;

    current_x: number;
    current_y: number;

    error_message: string;

    getValues(){
        if(this.validateY(this.y)){
            this.point.x = this.x;
            this.point.y = this.y;
            this.point.r = this.r;
            this.submit( this.point);
        }
    }

    submit(point: Point){
        this.httpService.postData(point)
            .subscribe(
                (data: Point)=>{this.records = data["recordList"]});
    }

    validateY(y:number){
        if  (y>=3 && y <= 5 && y!=null)  {
            this.error_message = "";
            return true;
        }
        else {
            this.error_message = "Некорректное значение y";
            return false;

        }
   }

    getCoordinates(event: MouseEvent){
        const graph = document.getElementById('sys').getBoundingClientRect();
       this.current_x = (event.offsetX - 150) * this.r * 0.01;
       this.current_y = (event.offsetY - 150) * this.r * 0.01;
    }

    draw(){

        const canvas = <HTMLCanvasElement>document.getElementById("sys");
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,300,300);

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
        ctx.arc(150, 150, 100,  Math.PI / 2,  Math.PI);
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

}