var Player = require("./Player");
var Bot = require("./Bot");
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
		this.player = new Player(3, 3, "blue", 50, 120, this, false);
		this.enemy = new Bot(3, 3, "red", 20, 120, this, true);
		this.player.addListeners();
		this.gridSize = 3;
		this.grid = Array.apply(null, Array(this.gridSize * this.gridSize)).map(Number.prototype.valueOf,0);
	}

	start() {
		this.interval = setInterval(this.updateGameArea.bind(this), 20);
		this.player.nextHoleTimer();
		//this.enemy.nextHoleTimer();
	}

	updateGameArea() {
		this.player.moveAngle = 0;
		this.player.newPos();
		this.enemy.newPos();
	}
}
module.exports = Game;