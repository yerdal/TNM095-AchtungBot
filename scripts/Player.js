
class Player {
	constructor(width, height, color, x, y, gameArea) {
		this.gameArea = gameArea;
		this.width = width;
		this.height = height;
		this.speed = 2;
		this.angle = 0;
		this.moveAngle = 0;
		this.color = color;

		//this.canvasWidth = this.gameArea.canvas.width; 
		//this.canvasHeight = this.gameArea.canvas.height;
		this.ctx = this.gameArea.context;

		this.position = {
		    x: x,
		    y: y
		};
	}

	update() {
		this.ctx.save();
		this.ctx.translate(this.position.x, this.position.y);
		this.ctx.rotate(this.angle);
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.width / 2, this.height / 2, this.width, this.height);
		this.ctx.restore();

	}

	newPos() {
		var newAngle = this.moveAngle * Math.PI / 180; 
		this.angle += this.moveAngle * Math.PI / 180;
	    this.position.x += this.speed * Math.sin(this.angle);
	    this.position.y -= this.speed * Math.cos(this.angle);
	    this.checkCollisions();
	}




		//if(this.position.x+this.width > this.canvasWidth && this.position.x > this.canvasWidth){

	checkCollisions() {
		this.checkWallCollision();
		this.checkWormCollision();
	}

	checkWallCollision() {
		var canvasWidth = this.gameArea.canvas.width;
		var canvasHeight = this.gameArea.canvas.height;
		
		if(this.position.x+this.width >= canvasWidth && this.position.x > canvasWidth){
			this.position.x = 0;
		}else if(this.position.x < 0){
			this.position.x = canvasWidth;
		}
		if(this.position.y+this.height > canvasHeight && this.position.y > canvasHeight){
			this.position.y = 0;
		
		}else if(this.position.y < 0){
			this.position.y = canvasHeight;
		}
	}

	checkWormCollision() {
		var pixelColors = this.ctx.getImageData(this.position.x, this.position.y, 1, 1);
		for (var i = 0; i < pixelColors.data.length; i++) {
			if (pixelColors.data[i] != 0) {
				console.log("Hit!");
			}
		}
	}


}

module.exports = Player;