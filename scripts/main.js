var gamePiece;

function startGame() {
    gameArea.start();
    gamePiece = new component(3, 3, "red", 10, 120);
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}
function updateGameArea() {
    gamePiece.speedX = 0;
    gamePiece.speedY = 0;
    if (gameArea.keys && gameArea.keys[37]) {gamePiece.speedX = -2; }
    if (gameArea.keys && gameArea.keys[39]) {gamePiece.speedX = 2; }
    if (gameArea.keys && gameArea.keys[38]) {gamePiece.speedY = -2; }
    if (gameArea.keys && gameArea.keys[40]) {gamePiece.speedY = 2; }
    gamePiece.newPos();
    gamePiece.update();
}
