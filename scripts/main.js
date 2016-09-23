//browserify scripts/main.js -o dist/bundle.js
var gamePiece;
const UP_KEY = 38;
const DOWN_KEY = 40;
const RIGHT_KEY = 39;
const LEFT_KEY = 37;
const SCREEN_WIDTH = window.innerWidth-100;
const SCREEN_HEIGHT= window.innerHeight-100;
var Player = require("./Player");
var player;
function startGame() {
    gameArea.load();
    gameArea.start();
    player = new Player(3, 3, "red", 10, 120, gameArea);
}


function loadScreen(){
	gameArea.load();
}

var gameArea = {
    canvas: document.createElement("canvas"),
    load : function() {        
    	this.canvas.width = SCREEN_WIDTH;
    	this.canvas.height = SCREEN_HEIGHT;
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

function updateGameArea() {
    player.speed = 2;
    player.moveAngle = 0;
    if (gameArea.keys && gameArea.keys[LEFT_KEY]) {player.moveAngle = -4; }
    if (gameArea.keys && gameArea.keys[RIGHT_KEY]) {player.moveAngle = 4; }
    player.newPos();
    player.update();
}

startGame();