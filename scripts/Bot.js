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
				if (Math.round(k) != 1 ) {
					this.moveAngle = 4;
					this.obstacle = pixelColors;
				}
				else
				{
					this.moveAngle = 0;
					this.obstacle = {};
				}
			}
		}
	}

	newPos() {
		// obstacle already detected
			var x1, x2, y1, y2;
			y1 = this.position.y;
			x1 = this.position.x;
		    x2 = this.position.x + this.speed * Math.sin(this.angle);
		    y2 = this.position.y - this.speed * Math.cos(this.angle);
		    var k = (y2-y1)/(x2-x1);
		    console.log(k);
		if (!_.isEmpty(this.obstacle)) {
			this.decide(this.obstacle, k);
		}
		// check if new obstacle
		else
		{
			var pixelColors = this.ctx.getImageData(this.position.x, this.position.y-60, 1, 1);
			this.decide(pixelColors, k);
		}
	   	var newAngle = this.moveAngle * Math.PI / 180; 
	   	this.angle += this.moveAngle * Math.PI / 180;
	   	this.position.x += this.speed * Math.sin(this.angle);
	   	this.position.y -= this.speed * Math.cos(this.angle);
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