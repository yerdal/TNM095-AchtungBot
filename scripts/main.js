//browserify scripts/main.js -o dist/bundle.js
var gamePiece;
const UP_KEY = 38;
const DOWN_KEY = 40;
const RIGHT_KEY = 39;
const LEFT_KEY = 37;
var Player = require("./Player");
var player;
function startGame() {
    gameArea.start();
    player = new Player(3, 3, "red", 10, 120, gameArea);
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start : function() {
    	this.canvas.width = window.innerWidth-100;
    	this.canvas.height = window.innerHeight-100;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        window.addEventListener('keydown', function (e) {
            console.log("hej");
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
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



