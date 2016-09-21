var gamePiece;
const UP_KEY = 38;
const DOWN_KEY = 40;
const RIGHT_KEY = 39;
const LEFT_KEY = 37;
const screenWidth = window.innerWidth-100;
const screenHeight= window.innerHeight-100;
var currSpeed = {
    x: 0,
    y: 0
}
function startGame() {
    gameArea.start();
    gamePiece = new component(3, 3, "red", 10, 120);
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start : function() {        
    	this.canvas.width = screenWidth;
    	this.canvas.height = screenHeight;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        window.addEventListener('keydown', function (e) {
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
}


function component(width, height, color, x, y) {
    this.gamearea = gameArea;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
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
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    this.newPos = function() {
    	this.angle += this.moveAngle * Math.PI / 180;
        this.position.x += this.speed * Math.sin(this.angle);
        this.position.y -= this.speed * Math.cos(this.angle);
        this.checkBorder();

    }

    this.checkBorder = function(){
    	var bottom = this.gamearea.canvas.height - this.height;
    	var top = this.height;
    	var leftSide = this.width;
    	var rightSide = this.gamearea.canvas.width - this.width;
		if (this.position.y > bottom) {
			console.log("BOTTOM IS REACEHD");
	            this.position.y = 2;
	    }else if(this.position.y < top){
	    	console.log("TOP REACHED")
	    	this.position.y = this.gamearea.canvas.height-2;
	    }else if(this.position.x > rightSide){
	    	this.position.x = 2;
	    }
	    else if(this.position.x < leftSide){
	    	this.position.x = this.gamearea.canvas.width-2;
	    }

    }
}

function updateGameArea() {

    gamePiece.speed = 2;
    gamePiece.moveAngle = 0;
    if (gameArea.keys && gameArea.keys[LEFT_KEY]) {gamePiece.moveAngle = -4; }
    if (gameArea.keys && gameArea.keys[RIGHT_KEY]) {gamePiece.moveAngle = 4; }

    //if (gameArea.keys && gameArea.keys[UP_KEY]) {gamePiece.speed = -2; }
    //if (gameArea.keys && gameArea.keys[DOWN_KEY]) {gamePiece.speed = 2; }
    gamePiece.newPos();
    gamePiece.update();
}


function prevState(direction) {


}
