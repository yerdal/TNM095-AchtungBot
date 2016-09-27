var Player = require("./Player");
class Bot extends Player {
	constructor(width, height, color, x, y, gameArea) {
		super(width, height, color, x, y, gameArea);
	}

	decide() {
		/*var k = position.y/position.x;
		var m = position.y - k*position.x;*/
		var pixelColors = this.ctx.getImageData(this.position.x, this.position.y+5, 1, 1);
		for (var i = 0; i < pixelColors.data.length; i++) {
			if (pixelColors.data[i] != 0) {
				console.log("hejru");
				this.moveAngle = -4;
			}
		}
		return 0;
	}

	newPos() {
		console.log("hej");
		var newAngle = this.moveAngle * Math.PI / 180; 
		this.angle += this.moveAngle * Math.PI / 180;
	    this.position.x += this.speed * Math.sin(this.angle);
	    this.position.y -= this.speed * Math.cos(this.angle);
	   this.decide();
	    this.checkCollisions();
	}
	
}
module.exports = Bot;