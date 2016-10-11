var Player = require("./Player");
var Bot = require("./Bot");
var Grid = require("./Grid");
const UP_KEY = 38;
const DOWN_KEY = 40;
const RIGHT_KEY = 39;
const LEFT_KEY = 37;

class Game {
	constructor(width, height) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.gridSize = 10
		this.largeGridSize = 3;
		this.grid = new Grid(this.gridSize, this.canvas.width/this.gridSize, this.canvas.height/this.gridSize);
		this.largeGrid = new Grid(this.largeGridSize, this.canvas.width/this.largeGridSize, this.canvas.height/this.largeGridSize);
		
		this.player = new Player(3, 3, "blue", Math.floor(Math.random() * width), Math.floor(Math.random() * height), this);
		this.enemy = new Bot(3, 3, "red", Math.floor(Math.random() * width), Math.floor(Math.random() * height), this);
		this.player.addListeners();
	}

	start() {
		this.interval = setInterval(this.updateGameArea.bind(this), 20);
		this.player.nextHoleTimer();
		this.enemy.nextHoleTimer();
	}

	updateGameArea() {
		if (this.player.isDead || this.enemy.isDead) {
			var _this = this;
			this.context.beginPath();
			var xPos = (this.canvas.width/2)-100;
			var yPos = (this.canvas.height/2)-50;
		    this.context.rect(xPos, yPos, 200, 100); 
		    this.context.fillStyle = '#FFFFFF'; 
		    this.context.fillStyle = 'rgba(225,225,225,0.5)';
		    this.context.fill();
		    this.context.lineWidth = 2;
		    this.context.strokeStyle = '#000000'; 
		    this.context.stroke();
		    this.context.closePath();
		    this.context.font = '40pt Kremlin Pro Web';
		    this.context.fillStyle = '#000000';
		    this.context.fillText('Restart', xPos+20, yPos+60);

	    	this.canvas.addEventListener('click', function(evt) {
	    			
		    	_this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
					_this.player = new Player(3, 3, "blue", 50, 120, _this);
					_this.enemy = new Bot(3, 3, "red", 20, 120, _this);
					_this.player.addListeners();
	    }, false);
		}
		else {
			this.player.moveAngle = 0;
			this.player.newPos();
			this.enemy.newPos();
		}
	}
}
module.exports = Game;