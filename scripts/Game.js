var Worm = require("./Player");

class Game {
	constructor(width, height) {
		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.player = new Worm(3, 3, "blue", 10, 120, this);
		this.enemy = new Worm(3, 3, "red", 150, 110, this);
		this.addListeners();

	}

	start() {
		this.interval = setInterval(this.updateGameArea.bind(this), 20);
	}

	updateGameArea() {
		this.player.moveAngle = 0;
		this.enemy.moveAngle = Math.random();
		if (this.keys && this.keys[LEFT_KEY]) {this.player.moveAngle = -4;}
		if (this.keys && this.keys[RIGHT_KEY]) {this.player.moveAngle = 4;}
		this.player.newPos();
		this.player.update();
		this.enemy.newPos();
		this.enemy.update();
	}
}
module.exports = Game;