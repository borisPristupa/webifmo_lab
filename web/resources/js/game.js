let win_width = null, win_height = null;

let canvas = null;
let ctx = null;

let game_started = null;
let game_finished = null;

let game = null;

function max(a, b) {
    return a < b ? b : a;
}

function min(a, b) {
    return a > b ? b : a;
}

class Drawable {
    constructor(w, h, x, y) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
    }

    draw(context) {
        throw new Error("Not implemented");
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx += this.ax;
        this.vy += this.ay;
    }

}

class ColorArea extends Drawable {
    constructor(w, h, x, y, color) {
        super(w, h, x, y);
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Sprite extends Drawable {
    constructor(w, h, x, y, img, flips, color) {
        super(w, h, x, y);
        this.img = img;
        this.flips = flips;
        this.state = 'stays';
        this.color = color;
    }

    hurt() {
        this.lives--;
        if (this.lives < 1) {
            game_finished = true;
            this.state = 'dead';
            this.img.src = "resources/assets/dead.png";

            let other;
            if (this === game.duck1) {
                other = game.duck2;
            } else {
                other = game.duck1;
            }

            other.state = 'wins';
            other.img.src = "resources/assets/wins.png";
            if (other.flips) {
                other.x = max(game.ground.x, other.x - this.w / 2);
                this.x = max(this.x, other.x + other.w);
            } else {
                other.x = min(game.ground.x + game.ground.w - other.w, other.x + this.w / 2);
                this.x = min(this.x, other.x - this.w);
            }

            this.vx = this.vy = this.ax = this.ay = 0;
            other.vx = other.vy = other.ax = other.ay = 0;
        }
    }

    imageUpdates() {
        if (this.state === 'wins') {
            this.img.src = "resources/assets/wins.png";
            return;
        }

        if (this.vx !== 0 && this.state.startsWith('stays'))
            this.state = 'walks';
        if (this.state.startsWith('walks')) {
            if (this.ticker > 0) {
                this.ticker--;
            } else {
                if (this.state === "walks1") {
                    this.img.src = "resources/assets/stays.png";
                    this.state = 'walks0';
                } else {
                    this.img.src = "resources/assets/walks.png";
                    this.state = 'walks1';
                }
                this.ticker = game.FPS / 5;
            }
        } else if (this.state.startsWith('hits')) {
            if (this.ticker > 0) {
                this.ticker--;
            } else {
                if (this.state === "hits1") {
                    this.img.src = "resources/assets/hits.png";
                    this.state = 'hits0';
                } else if (this.state === "hits0") {
                    this.img.src = "resources/assets/hits0.png";
                    this.state = 'hits1';
                } else {
                    this.img.src = "resources/assets/hits0.png";
                }
                this.ticker = game.FPS / 3;
            }
        }
    }

    update() {
        super.update();
        if (this.x <= game.ground.x) this.x = game.ground.x + 1;
        if (this.x + this.w >= game.ground.w + game.ground.x) this.x = game.ground.w + game.ground.x - 1 - this.w;

        if (this.y + this.h > game.ground.h + game.ground.y) {
            this.y = game.ground.h + game.ground.y - this.h;

            if (this.up) {
                duckFly(this);
            } else {
                this.state = 'stays';
                this.img.src = "resources/assets/stays.png";
                this.ay = 0;
                this.vy = 0;
            }
        }
        this.imageUpdates();
    }

    drawLives(ctx, x, y) {
        ctx.font = "30px Arial";
        ctx.fillStyle = this.lives > 5 ? 'green' :
            (this.lives > 2 ? 'orange' : 'red');
        ctx.fillText("Lives: " + this.lives, x, y);
    }

    draw(ctx) {
        this.img.width = this.w;
        this.img.height = this.h;

        if (this.flips) {
            ctx.scale(-1, 1);
            ctx.drawImage(this.img, -this.w - this.x, this.y);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.w / 2 - this.x, this.y - 20, 10, 10);
            ctx.scale(-1, 1);
        } else {
            ctx.drawImage(this.img, this.x, this.y);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x + this.w / 2, this.y - 20, 10, 10);
        }
        this.drawLives(ctx, this.x, 30);
    }
}


window.onload = function () {
    game_started = false;
    game_finished = false;

    game = {FPS: 60, objects: []};

    win_width = window.innerWidth;
    win_height = window.innerHeight;
    canvas = document.getElementById("game_canvas");
    ctx = canvas.getContext('2d');

    let duck1_img = new Image(128, 128);
    let duck2_img = new Image(128, 128);
    duck1_img.id = "duck1";
    duck2_img.id = "duck2";

    duck1_img.src = "resources/assets/stays.png";
    duck2_img.src = "resources/assets/stays.png";

    game.ground = new ColorArea(canvas.width, 20, 0, canvas.height - 20, "#0E0");

    game.duck1 = new Sprite(128, 128, game.ground.x + 10, canvas.height - 128, duck1_img, true, 'blue');
    game.duck2 = new Sprite(128, 128, game.ground.w - 138, canvas.height - 128, duck2_img, false, 'red');

    game.duck1.lives = 10;
    game.duck2.lives = 10;


    this.duckGo = function (duck) {
        // duck.ticker = game.FPS / 5;
        duck.state = 'walks0';
    };

    this.duckFly = function (duck) {
        duck.vy = -18;
        duck.ay = 1;
        duck.state = 'flies';
        duck.img.src = "resources/assets/flies.png";
    };

    this.duckHit = function (duck) {
        duck.img.src = "resources/assets/hits0.png";
        if (duck.vx === 0) {
            duck.state = "hits";
        } else {
            duck.ticker = game.FPS / 3;
            duck.state = "hits0";
        }

        let other;
        if (duck === game.duck1) {
            other = game.duck2;
        } else {
            other = game.duck1;
        }

        let flower;
        if (duck.flips) {
            flower = duck.x + duck.w - 10;
        } else {
            flower = duck.x + 10;
        }
        let headLeft, headRight;
        if (other.flips) {
            headRight = other.x + other.w - 30;
            headLeft = other.x + 35;
        } else {
            headRight = other.x + other.w - 35;
            headLeft = other.x + 30;
        }
        if (flower >= headLeft && flower <= headRight
            && !other.state.startsWith('flies'))
            other.hurt();
    };

    game.objects.push(game.ground, game.duck1, game.duck2);

    duck1_img.onload = function () {
        draw();
    };
    duck2_img.onload = function () {
        draw();
    };
};

window.onkeydown = function (e) {
    if (!game_started)
        start_game();

    if (game_finished && e.key !== 'Enter') return;

    if (e.key === 'Enter' && game_finished) {
        window.onload(e);
    } else if (e.key === 'ArrowLeft') {
        game.duck2.vx = -5;
        game.duck2.flips = false;
        if (!game.duck2.state.startsWith('walks') && !game.duck2.state.startsWith('flies')) {
            duckGo(game.duck2);
        }
    } else if (e.key === 'ArrowRight') {
        game.duck2.vx = 5;
        game.duck2.flips = true;
        if (!game.duck2.state.startsWith('walks') && !game.duck2.state.startsWith('flies')) {
            duckGo(game.duck2);
        }
    } else if (e.key === 'a') {
        game.duck1.vx = -5;
        game.duck1.flips = false;
        if (!game.duck1.state.startsWith('walks') && !game.duck1.state.startsWith('flies')) {
            duckGo(game.duck1);
        }
    } else if (e.key === 'd') {
        game.duck1.vx = 5;
        game.duck1.flips = true;
        if (!game.duck1.state.startsWith('walks') && !game.duck1.state.startsWith('flies')) {
            duckGo(game.duck1);
        }
    } else if (e.key === 'ArrowUp' && !game.duck2.state.startsWith('flies')) {
        // game.duck2.vy = -18;
        // game.duck2.ay = 1;
        game.duck2.up = true;
        if (!game.duck2.state.startsWith('flies'))
            duckFly(game.duck2)
    } else if (e.key === 'w' && !game.duck1.state.startsWith('flies')) {
        // game.duck1.vy = -18;
        // game.duck1.ay = 1;
        game.duck1.up = true;
        if (!game.duck1.state.startsWith('flies'))
            duckFly(game.duck1)
    } else if ((e.key === '/' || e.key === '.') && !game.duck2.state.startsWith('flies') && !game.duck2.state.startsWith('hits')) {
        duckHit(game.duck2);
    } else if ((e.key === '`' || e.key === 'ё') && !game.duck1.state.startsWith('flies') && !game.duck1.state.startsWith('hits')) {
        duckHit(game.duck1);
    }
};

window.onkeyup = function (e) {
    if (game_finished) return;

    if (!game_started) {
        start_game();
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        game.duck2.vx = 0;
        if (!game.duck2.state.startsWith('flies')) {
            game.duck2.img.src = "resources/assets/stays.png";
            game.duck2.state = 'stays';
        }
    } else if (e.key === 'a' || e.key === 'd') {
        game.duck1.vx = 0;
        if (!game.duck1.state.startsWith('flies')) {
            game.duck1.img.src = "resources/assets/stays.png";
            game.duck1.state = 'stays';
        }
    } else if (e.key === '/' || e.key === '.') {
        if (!game.duck2.state.startsWith('flies')) {
            game.duck2.state = 'stays';
            game.duck2.img.src = 'resources/assets/stays.png';
        }
    } else if (e.key === '`' || e.key === 'ё') {
        if (!game.duck1.state.startsWith('flies')) {
            game.duck1.state = 'stays';
            game.duck1.img.src = 'resources/assets/stays.png';
        }
    } else if (e.key === 'ArrowUp') {
        game.duck2.up = false;
    } else if (e.key === 'w') {
        game.duck1.up = false;
    }
};
let loop;

function start_game() {
    draw();

    game_started = true;
    loop = setInterval(draw, 1000 / game.FPS);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.objects.forEach(o => {
        o.update();
        o.draw(ctx)
    });

    ctx.font = "18px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Left: a", 0, canvas.height/2 - 80);
    ctx.fillText("Right: d", 0, canvas.height/2 - 60);
    ctx.fillText("Fly: w", 0, canvas.height/2 - 40);
    ctx.fillText("Hit: ` (ё)", 0, canvas.height/2 - 20);

    ctx.fillText("Left: arrow left", canvas.width - 150, canvas.height/2 - 80);
    ctx.fillText("Right: arrow right", canvas.width - 150, canvas.height/2 - 60);
    ctx.fillText("Fly: arrow up", canvas.width - 150, canvas.height/2 - 40);
    ctx.fillText("Hit: /", canvas.width - 150, canvas.height/2 - 20);

    if (game_finished) {
        ctx.font = "50px Arial";
        ctx.fillStyle = 'red';
        ctx.fillText("Press ENTER", canvas.width / 2 - 50, canvas.height / 2 - 20);

        window.clearInterval(loop);
    }
}
