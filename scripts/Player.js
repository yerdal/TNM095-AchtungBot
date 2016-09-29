
const UP_KEY = 38;
const DOWN_KEY = 40;
const RIGHT_KEY = 39;
const LEFT_KEY = 37;

class Player {
	constructor(width, height, color, x, y, gameArea) {
		this.gameArea = gameArea;
		this.width = width;
		this.height = height;
		this.speed = 2;
		this.angle = 0;
		this.moveAngle = 0;
		this.color = color;
		this.addListeners();
		this.ctx = this.gameArea.context;
		this.hole = 0;
		this.holeID;
		this.isDead = false;
		this.position = {
		    x: x,
		    y: y
		};
	}

	update() {

		if(this.hole == 0) {
			this.ctx.save();
			this.ctx.translate(this.position.x, this.position.y);
			this.ctx.rotate(this.angle);
		  	this.ctx.fillStyle = this.color;
			this.ctx.fillRect(this.width / 2, this.height / 2, this.width, this.height);
			this.ctx.restore();

		} else {
			this.hole--;

			if(this.hole == 0) {
				this.nextHoleTimer();
			}
		}
	}

	nextHoleTimer() {
		var _this = this;
		var time = 4 + Math.random() * 2;

		this.holeID = setTimeout(function() {
			_this.hole = 10;
		},time*1000);
	}

	newPos() {
		if (this.keys && this.keys[LEFT_KEY]) {this.moveAngle = -4;}
		if (this.keys && this.keys[RIGHT_KEY]) {this.moveAngle = 4;}
		var newAngle = this.moveAngle * Math.PI / 180; 
		this.angle += this.moveAngle * Math.PI / 180;
	    this.position.x += this.speed * Math.sin(this.angle);
	    this.position.y -= this.speed * Math.cos(this.angle);

	    this.checkCollisions();
	    this.update();
	}
	addListeners() {
		window.addEventListener('keydown', function (e) {
		    this.keys = (this.keys || []);
		    this.keys[e.keyCode] = (e.type == "keydown");
		}.bind(this));
		window.addEventListener('keyup', function (e) {
		    this.keys[e.keyCode] = (e.type == "keydown");
		}.bind(this));
	}

	checkCollisions() {
		this.checkWallCollision();
		this.checkWormCollision();
		this.updateGrid();
	}

	updateGrid(){
		//var grid = this.gameArea.grid;
		var gridSize = this.gameArea.gridSize;
		var gridWidth = this.gameArea.canvas.width / gridSize;
		var gridHeight = this.gameArea.canvas.height / gridSize;
		var counter = 0;

		firstLoop:
		for(var y = 1; y <= gridSize; y++){
			for (var x = 1; x <= gridSize; x++) {
				if(this.position.x < (gridWidth * x) && this.position.y < (gridHeight*y)){
					this.gameArea.grid[counter]++;
					break firstLoop;
				}
				counter++;
			}
		}
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
				this.isDead = true;
			}
		}
	}


}

module.exports = Player;