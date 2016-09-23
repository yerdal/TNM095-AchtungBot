class Player {
	constructor(width, height, color, x, y, gameArea) {
		this.gamearea = gameArea;
		this.width = width;
		this.height = height;
		this.speed = 2;
		this.angle = 0;
		this.moveAngle = 0;
		this.color = color;
		this.ctx = this.gamearea.context;
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
		this.ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
		this.ctx.restore();
	}
	newPos() {
		this.angle += this.moveAngle * Math.PI / 180;
	    this.position.x += this.speed * Math.sin(this.angle);
	    this.position.y -= this.speed * Math.cos(this.angle);
	    this.checkBorder();
	}

	checkBorder() {
		if(this.position.x+this.width > this.gamearea.canvas.width && this.position.x > this.gamearea.canvas.width){
			this.ctx.fillRect(this.position.x-this.gamearea.canvas.width, this.position.y, this.width, this.height );
			this.position.x = 0;

		}else if(this.position.x < 0){
			this.position.x = this.gamearea.canvas.width;
		}

		if(this.position.y+this.height > this.gamearea.canvas.height && this.position.y > this.gamearea.canvas.height){
			this.ctx.fillRect(this.position.x, this.position.y-this.gamearea.canvas.height, this.width, this.height);
			this.position.y = 0;
		}else if(this.position.y < 0){
			this.position.y = this.gamearea.canvas.height;
		}
	}


}

module.exports = Player;