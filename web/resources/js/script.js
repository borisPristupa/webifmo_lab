// отрисовка часов
$(function () {
    let context = $("#clock")[0].getContext('2d'), circle, mini_circle;
    circle = new Path2D();
    circle.arc(150, 150, 100, 0, 2 * Math.PI);
    context.fillStyle = "#59daff";
    context.fill(circle);

    let timeId = setInterval(function () {
        context.clearRect(0, 0, 300, 300);
        context.lineWidth = 1;
        circle.arc(150, 150, 100, 0, 2 * Math.PI);
        context.fillStyle = "#59daff";
        context.fill(circle);

        let date = new Date(), hours, minuters, seconds;
        hours = date.getHours();
        if (hours > 12) hours = hours - 12;
        minuters = date.getMinutes();
        seconds = date.getSeconds();

        let secondsAngle, minutersAngle, hoursAngle;
        secondsAngle = (seconds * 2 * Math.PI) / 60 - Math.PI / 2;
        minutersAngle = (minuters * 2 * Math.PI) / 60 - Math.PI / 2;
        hoursAngle = (hours * 2 * Math.PI) / 12 - Math.PI / 2;

        let lineSeconds = new Path2D(),
            lineMinuters = new Path2D(),
            lineHours = new Path2D();
        lineSeconds.moveTo(150, 150);
        lineSeconds.lineTo(150 + Math.cos(secondsAngle) * 100, 150 + Math.sin(secondsAngle) * 100);
        context.strokeStyle = "red";
        context.lineWidth = 1;
        context.stroke(lineSeconds);

        lineMinuters.moveTo(150, 150);
        lineMinuters.lineTo(150 + Math.cos(minutersAngle) * 90, 150 + Math.sin(minutersAngle) * 90);
        context.lineWidth = 5;
        context.strokeStyle = "black";
        context.stroke(lineMinuters);

        lineHours.moveTo(150, 150);
        lineHours.lineTo(150 + Math.cos(hoursAngle) * 60, 150 + Math.sin(hoursAngle) * 60);
        context.lineWidth = 10;
        context.stroke(lineHours);


        mini_circle = new Path2D();
        mini_circle.arc(150, 150, 10, 0, 2 * Math.PI);
        context.fillStyle = "black";
        context.fill(mini_circle);

        context.lineWidth = 5;
        context.strokeStyle = "blue";
        context.beginPath();
        context.moveTo(150,50); // 12
        context.lineTo(150,60);
        context.moveTo(240,150); // 3
        context.lineTo(250,150);
        context.moveTo(150,240); // 6
        context.lineTo(150,250);
        context.moveTo(50,150); // 9
        context.lineTo(60,150);

        context.fillStyle = "blue";
        context.font = "16px Times New Roman bold";
        context.fillText("12", 143, 45);
        context.fillText("3", 255, 157);
        context.fillText("6", 143, 263);
        context.fillText("9", 40, 157);

        context.stroke();

    }, 1000);
});

// вывод текущий значений даты и времени
$(function () {
   print_current_date();
});
$(function () {
    let timeId5 = setInterval(function () {
        print_current_date();
    }, 5000);
});
function print_current_date() {
    let current_time = $("#current_time"),
        current_date = $("#current_day");

    let   moment = new Date(),
        hours, minutes, seconds,
        day, month, year;
    hours = moment.getHours();
    minutes = moment.getMinutes();
    seconds = moment.getSeconds();

    day = moment.getDate();
    month = moment.getMonth()+1;
    year = moment.getFullYear();
    let date = "Сегодня - "+day+"."+month+"."+year,
        time = "Текущее время: "+hours+":"+minutes+":"+seconds;
    current_date.html(date);
    current_time.html(time);
}

