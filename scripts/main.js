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
var worm ={
	width: 3,
	height: 3,
	color: "red",
	xPos: 10,
	yPos: 120
}
function startGame() {
	gameArea.start();
    gamePiece = new component(worm);
}

function loadScreen(){
	gameArea.load();
}

var gameArea = {
    canvas: document.createElement("canvas"),
    load : function() {        
    	this.canvas.width = screenWidth;
    	this.canvas.height = screenHeight;
        this.context = this.canvas.getContext("2d");
         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        window.addEventListener('keydown', function (e) {
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    start: function(){
    	this.interval = setInterval(updateGameArea, 20);
       
    },
}


function component(worm) {
    this.gamearea = gameArea;
    this.width = worm.width;
    this.height = worm.height;

    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.speed = {
        x: 0,
        y: 0
    }
    /*this.position = {
        x: worm.xPos,
        y: worm.yPos
    }*/

    this.update = function() {
        ctx = gameArea.context;
        ctx.save();
        ctx.translate(worm.xPos, worm.yPos);
        ctx.rotate(this.angle);
        ctx.fillStyle = worm.color;
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    this.newPos = function() {
    	this.angle += this.moveAngle * Math.PI / 180;
        worm.xPos += this.speed * Math.sin(this.angle);
        worm.yPos -= this.speed * Math.cos(this.angle);
        this.checkBorder(worm, gameArea.context);

    }

    this.checkBorder = function(worm, ctx){

    	if(worm.xPos+worm.width > this.gamearea.canvas.width && worm.xPos > this.gamearea.canvas.width){
    		ctx.fillRect(worm.x-this.gamearea.canvas.width, worm.y, worm.width, worm.height );
    		worm.xPos = 0;

    	}else if(worm.xPos < 0){
    		worm.xPos = this.gamearea.canvas.width;
    	}

    	if(worm.yPos+worm.height > this.gamearea.canvas.height && worm.yPos > this.gamearea.canvas.height){
    		ctx.fillRect(worm.x, worm.y-this.gamearea.canvas.height, worm.width, worm.height );
    		worm.yPos = 0;
    	}else if(worm.yPos < 0){
    		worm.yPos = this.gamearea.canvas.height;
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
