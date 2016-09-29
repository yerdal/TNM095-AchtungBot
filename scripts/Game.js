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
		this.player = new Player(3, 3, "blue", 10, 120, this, false);
		this.enemy = new Bot(3, 3, "red", 20, 120, this, true);
		this.player.addListeners();
		this.grid = [0, 0, 0, 0];
	}

	start() {
		this.interval = setInterval(this.updateGameArea.bind(this), 20);
		this.player.nextHoleTimer();
		this.enemy.nextHoleTimer();
	}

	updateGameArea() {
		this.player.moveAngle = 0;
		//this.enemy.moveAngle = Math.random();
		this.enemy.moveAngle = 0;
		/*if (this.keys && this.keys[LEFT_KEY]) {this.player.moveAngle = -4;}
		if (this.keys && this.keys[RIGHT_KEY]) {this.player.moveAngle = 4;}*/
		this.player.newPos();
		this.player.update(this.grid);
		this.enemy.newPos();
		this.enemy.update(this.grid);
		console.log("grid1: " + this.grid[0]);
		console.log("grid2: " + this.grid[1]);
		console.log("grid3: " + this.grid[2]);
		console.log("grid4: " + this.grid[3]);

	}
}
module.exports = Game;