var Player = require("./Player");
var _ = require("underscore");
class Bot extends Player {
	constructor(width, height, color, x, y, gameArea) {
		super(width, height, color, x, y, gameArea);

		this.obstacle = {};
	}

	decide(pixelColors, k) {
		/*var k = position.y/position.x;
		var m = position.y - k*position.x;*/
		for (var i = 0; i < pixelColors.data.length; i++) {
			if (pixelColors.data[i] != 0) {
					this.moveAngle = 4;
					this.obstacle = pixelColors;
			}	
			else {
				this.moveAngle = 0;
				this.obstacle = {};
				console.log("hejs");
			}
			
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

	   	// obstacle already detected
	   	if (!_.isEmpty(this.obstacle)) {
	   		this.decide(this.obstacle, k);
	   	}
	   	// check if new obstacle
	   	else {
	   		var newPos = {};
	   		newPos.x = this.position.x + Math.cos(Math.atan(k))*40;
	   		newPos.y = this.position.y + Math.sin(Math.atan(k))*40;
	   		var pixelColors = this.ctx.getImageData(newPos.x, newPos.y, 1, 1);
	   		this.decide(pixelColors, k);
	   	}
	   	this.checkCollisions();
	   	this.update();
	}

	update() {
		this.ctx.save();
		this.ctx.translate(this.position.x, this.position.y);
		this.ctx.rotate(this.angle);
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.width / 2, this.height / 2, this.width, this.height);
		this.ctx.restore();
	}
	
}
module.exports = Bot;