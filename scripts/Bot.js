var Player = require("./Player");
var _ = require("underscore");
var PathFinding = require("./PathFinding");
class Bot extends Player {
	constructor(width, height, color, x, y, gameArea) {
		super(width, height, color, x, y, gameArea);

		this.gridIndex = 0;
		this.currentGrid = 0;
		this.pathFinding = new PathFinding(this.gameArea.grid, this.gameArea.grid.getCurrentGridSection(this.position));

	}

	decide(pixelVec, k) {
		var white = true;
		for (var i = 0; i < pixelVec.length; i++) {
			if (pixelVec[i] != 0) {
					this.moveAngle = 4;
					white = false;
					break;
			}
		}
		if (white) {
			this.moveAngle = 0;
		}
	}

	newPos() {
		var x1, x2, y1, y2;
	   	var newAngle = this.moveAngle * Math.PI / 180; 	
	   	this.angle += this.moveAngle * Math.PI / 180;
	   	y1 = this.position.y;
	   	x1 = this.position.x;
	   	this.position.x += this.speed * Math.sin(this.angle);
	   	this.position.y -= this.speed * Math.cos(this.angle);
	   	x2 = this.position.x;
	   	y2 = this.position.y;
	   	var k = (y2-y1)/(x2-x1);
	   	// console.log(k);

	   	var pixelVec = [];
	   	// check if new obstacle
	   	var newPos = {};
	   	for (var i = 0; i < 40; i++) {
	   		newPos.x = this.position.x + Math.cos(Math.atan(k))*i;
	   		newPos.y = this.position.y + Math.sin(Math.atan(k))*i;
	   		var pixelColors = _.reduce(this.ctx.getImageData(newPos.x, newPos.y, 1, 1).data, function(memo, num) { return memo + num; }, 0);
	   		pixelVec.push(pixelColors);
	   	}
	   	this.decide(pixelVec, k);
	   	this.checkCollisions();
	   	this.update();

	}
	
}
module.exports = Bot;