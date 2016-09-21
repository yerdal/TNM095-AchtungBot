var gamePiece;

function startGame() {
    gameArea.start();
    gamePiece = new component(3, 3, "red", 10, 120);
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth-100;
        this.canvas.height = window.innerHeight-100;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
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
    //this.speedX = 0;
    //this.speedY = 0;
    this.speed = 0;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.moveAngle = 0;
    this.update = function() {
        ctx = gameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    this.newPos = function() {
    	this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}
function updateGameArea() {

    //gamePiece.speedX = 0;
    //gamePiece.speedY = 0;
    gamePiece.speed = 0;
    gamePiece.moveAngle = 0;
    if (gameArea.keys && gameArea.keys[37]) {gamePiece.moveAngle = -4; }
    if (gameArea.keys && gameArea.keys[39]) {gamePiece.moveAngle = 4; }
    if (gameArea.keys && gameArea.keys[38]) {gamePiece.speed = -2; }
    if (gameArea.keys && gameArea.keys[40]) {gamePiece.speed = 2; }
    gamePiece.newPos();
    gamePiece.update();
}
