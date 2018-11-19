function pressed(number) {
    let x_5 = $(".x_5"),
        x_4 = $(".x_4"),
        x_3 = $(".x_3"),
        x_2 = $(".x_2"),
        x_1 = $(".x_1"),
        x0 = $(".x0"),
        x1 = $(".x1"),
        x2 = $(".x2"),
        x3 = $(".x3");

    switch (number){
        case -5:{
            x_5.css({background: "blanchedalmond"});
            x_4.css({background: "white"});
            x_3.css({background: "white"});
            x_2.css({background: "white"});
            x_1.css({background: "white"});
            x0.css({background: "white"});
            x1.css({background: "white"});
            x2.css({background: "white"});
            x3.css({background: "white"});
            break
        }
        case -4:{
            x_5.css({background: "white"});
            x_4.css({background: "blanchedalmond"});
            x_3.css({background: "white"});
            x_2.css({background: "white"});
            x_1.css({background: "white"});
            x0.css({background: "white"});
            x1.css({background: "white"});
            x2.css({background: "white"});
            x3.css({background: "white"});
            break
        }
        case -3:{
            x_5.css({background: "white"});
            x_4.css({background: "white"});
            x_3.css({background: "blanchedalmond"});
            x_2.css({background: "white"});
            x_1.css({background: "white"});
            x0.css({background: "white"});
            x1.css({background: "white"});
            x2.css({background: "white"});
            x3.css({background: "white"});
            break
        }
        case -2:{
            x_5.css({background: "white"});
            x_4.css({background: "white"});
            x_3.css({background: "white"});
            x_2.css({background: "blanchedalmond"});
            x_1.css({background: "white"});
            x0.css({background: "white"});
            x1.css({background: "white"});
            x2.css({background: "white"});
            x3.css({background: "white"});
            break
        }
        case -1:{
            x_5.css({background: "white"});
            x_4.css({background: "white"});
            x_3.css({background: "white"});
            x_2.css({background: "white"});
            x_1.css({background: "blanchedalmond"});
            x0.css({background: "white"});
            x1.css({background: "white"});
            x2.css({background: "white"});
            x3.css({background: "white"});
            break
        }
        case 0:{
            x_5.css({background: "white"});
            x_4.css({background: "white"});
            x_3.css({background: "white"});
            x_2.css({background: "white"});
            x_1.css({background: "white"});
            x0.css({background: "blanchedalmond"});
            x1.css({background: "white"});
            x2.css({background: "white"});
            x3.css({background: "white"});
            break
        }
        case 1:{
            x_5.css({background: "white"});
            x_4.css({background: "white"});
            x_3.css({background: "white"});
            x_2.css({background: "white"});
            x_1.css({background: "white"});
            x0.css({background: "white"});
            x1.css({background: "blanchedalmond"});
            x2.css({background: "white"});
            x3.css({background: "white"});
            break
        }
        case 2:{
            x_5.css({background: "white"});
            x_4.css({background: "white"});
            x_3.css({background: "white"});
            x_2.css({background: "white"});
            x_1.css({background: "white"});
            x0.css({background: "white"});
            x1.css({background: "white"});
            x2.css({background: "blanchedalmond"});
            x3.css({background: "white"});
            break
        }
        case 3:{
            x_5.css({background: "white"});
            x_4.css({background: "white"});
            x_3.css({background: "white"});
            x_2.css({background: "white"});
            x_1.css({background: "white"});
            x0.css({background: "white"});
            x1.css({background: "white"});
            x2.css({background: "white"});
            x3.css({background: "blanchedalmond"});
            break
        }


    }
}

function graphClicked(event) {
    let x = event.offsetX - 200,
        y = event.offsetY - 200,
        r = getR();
    // 100px = r ;
    x = x*r/145.45;
    y = y*r/145.45;
    let hit = checkHit(x, y, r);//

    document.getElementById("graphForm:xGraph").value = x;
    document.getElementById("graphForm:yGraph").value = y;
    document.getElementById("graphForm:rGraph").value = r;
    document.getElementById("graphForm:graphButton").click();


    //отрисовать точку, но пока только проверим, что запись добавляется, что оооочень вряд ли выйдет так быстро и просто
    // давай кадр 1 дубль 3
}

function getR() {
    return document.getElementById("someForm:r_value_input").value;
}

function checkHit(x, y, r) {
    let hit = false;

    if (x <= 0 && y >= 0)
        hit = -x <= r && y <= r / 2;

    if (x <= 0 && y <= 0)
        hit |= x * x + y * y <= r * r / 4;

    if (x >= 0 && y <= 0)
        hit |= x - y <= r / 2;

    return hit;
}

 $(function () {
     $(".x0").css({background:"blanchedalmond"})
     $(".x_5").css({background: "white"});
     $(".x_4").css({background: "white"});
     $(".x_3").css({background: "white"});
     $(".x_2").css({background: "white"});
     $(".x_1").css({background: "white"});
     $(".x1").css({background: "white"});
     $(".x2").css({background: "white"});
     $(".x3").css({background: "white"});
 });
