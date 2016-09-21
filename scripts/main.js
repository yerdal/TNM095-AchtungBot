var gamePiece;
const UP_KEY = 38;
const DOWN_KEY = 40;
const RIGHT_KEY = 39;
const LEFT_KEY = 37;
var currSpeed = {
    x: 0,
    y: 0
}
function startGame() {
    gameArea.start();
    gamePiece = new component(3, 3, "red", 10, 120);
}

var gameArea = {
    canvas: document.getElementById("canvas"),
    start : function() {
        
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function component(width, height, color, x, y) {
    this.gamearea = gameArea;
    this.width = width;
    this.height = height;
    this.speed = {
        x: 0,
        y: 0
    }
    this.position = {
        x: x,
        y: y
    }
    this.update = function() {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    this.newPos = function() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }
}

function updateGameArea() {

    if (gameArea.keys && gameArea.keys[LEFT_KEY]) {
        gamePiece.speed.x = -2;
        gamePiece.speed.y = 0;
    }
    if (gameArea.keys && gameArea.keys[RIGHT_KEY]) {
        gamePiece.speed.x = 2;
        gamePiece.speed.y = 0;
    }
    if (gameArea.keys && gameArea.keys[UP_KEY]) {
        gamePiece.speed.y = -2;
        gamePiece.speed.x = 0;
    }
    if (gameArea.keys && gameArea.keys[DOWN_KEY]) {
        gamePiece.speed.y = 2;
        gamePiece.speed.x = 0;
    }
    gamePiece.newPos();
    gamePiece.update();
}

function prevState(direction) {


}
