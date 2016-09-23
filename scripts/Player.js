function Player(width, height, color, x, y, gameArea) {
	this.gamearea = gameArea;
	this.width = width;
	this.height = height;

	this.speed = 0;
	this.angle = 0;
	this.moveAngle = 0;
	this.speed = {
	    x: 0,
	    y: 0
	}
	this.position = {
	    x: x,
	    y: y
	}

	this.update = function() {
	    ctx = gameArea.context;
	    ctx.save();
	    ctx.translate(this.position.x, this.position.y);
	    ctx.rotate(this.angle);
	    ctx.fillStyle = color;
	    //ctx.fillRect(this.x, this.y, this.width, this.height);
	    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
	    ctx.restore();
	}
	this.newPos = function() {
		this.angle += this.moveAngle * Math.PI / 180;
	    this.position.x += this.speed * Math.sin(this.angle);
	    this.position.y -= this.speed * Math.cos(this.angle);

	}
	
}
module.exports = Player;