var Player = require("./Player");
var _ = require("underscore");
class Bot extends Player {
	constructor(width, height, color, x, y, gameArea) {
		super(width, height, color, x, y, gameArea);
	}

	decide(pixelVec, k) {
		/*var k = position.y/position.x;
		var m = position.y - k*position.x;*/
		var white = true;
		for (var i = 0; i < pixelVec.length; i++) {
			for (var j = 0; j < pixelVec[i].data.length; j++) {
				if (pixelVec[i].data[j] != 0) {
						this.moveAngle = 4;
						white = false;
						break;
				}
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

	   	var pixelVec = [];
	   	// check if new obstacle
	   	var newPos = {};
	   	for (var i = 0; i < 40; i++) {
	   		newPos.x = this.position.x + Math.cos(Math.atan(k))*i;
	   		newPos.y = this.position.y + Math.sin(Math.atan(k))*i;
	   		var pixelColors = this.ctx.getImageData(newPos.x, newPos.y, 1, 1);
	   		pixelVec.push(pixelColors);
	   	}
	   	this.decide(pixelVec, k);
	   	
	   	this.checkCollisions();
	   	this.update();
	}
	
}
module.exports = Bot;