var _ = require("underscore");

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
		this.angle = Math.random() * Math.PI * 2;
		this.moveAngle = 0;
		this.color = color;
		this.addListeners();
		this.ctx = this.gameArea.context;
		this.hole = 0;
		this.holeID;
		this.isDead = false;
		this.currentGridSection = -1;
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
			this.ctx.fillRect(this.width/2, this.height/2, this.width, this.height);
			this.ctx.restore();
			this.gameArea.grid.getCurrentGridSection(this.position).occupation++;
			this.gameArea.largeGrid.getCurrentGridSection(this.position).occupation++;

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
	    var pixelColors = this.ctx.getImageData(this.position.x, this.position.y, 1, 1);

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
	}
	
	checkWallCollision() {
		var canvasWidth = this.gameArea.canvas.width;
		var canvasHeight = this.gameArea.canvas.height;

		if (this.position.x+this.width >= canvasWidth && this.position.x > canvasWidth) {
			this.position.x = 0;

		} else if(this.position.x < 0) {
			this.position.x = canvasWidth;
		}
		if (this.position.y+this.height > canvasHeight && this.position.y > canvasHeight){
			this.position.y = 0;
		
		} else if(this.position.y < 0) {
			this.position.y = canvasHeight;
		}
	}
	checkAngle(angle) {
		var answer = angle % (Math.PI*2);
		answer = (answer * 180) / Math.PI;
		if (answer < 0)
			answer+=360;
		return answer; 
	}
	checkWormCollision() {	
		var pixelColors;
		var forwardCheck = {x: 0, y: 0};
		forwardCheck.x =  this.position.x + Math.sin(this.angle)*2;
		forwardCheck.y =  this.position.y - Math.cos(this.angle)*2;
		if ((this.checkAngle(this.angle) >= 0 && this.checkAngle(this.angle) <=90)) {
			//this.ctx.fillRect(this.position.x+ this.width/2, this.position.y + this.height/2, 3, 3);
			pixelColors = _.reduce(this.ctx.getImageData(forwardCheck.x + this.width/2, forwardCheck.y + this.height/2, 1, 1)
				.data, function(memo, num) { return memo + num; }, 0);
		}
		else if (this.checkAngle(this.angle) > 90 && this.checkAngle(this.angle) <= 180) {
			//this.ctx.fillRect(this.position.x - this.width/2, this.position.y + this.height/2, -3, 3);
			pixelColors = _.reduce(this.ctx.getImageData(forwardCheck.x - this.width/2, forwardCheck.y + this.height/2, -1, 1)
				.data, function(memo, num) { return memo + num; }, 0);
		}
		else if (this.checkAngle(this.angle) > 180 && this.checkAngle(this.angle) <= 270) {
			//this.ctx.fillRect(this.position.x- this.width/2, this.position.y - this.height/2, -3, -3);
			pixelColors = _.reduce(this.ctx.getImageData(forwardCheck.x - this.width/2, forwardCheck.y - this.height/2, -1, -1)
				.data, function(memo, num) { return memo + num; }, 0);
		}
		else {
			//this.ctx.fillRect(this.position.x+this.width/2, this.position.y + this.height/2, 3, -3);
			pixelColors = _.reduce(this.ctx.getImageData(forwardCheck.x + this.width/2, forwardCheck.y + this.height/2, 1, -1)
				.data, function(memo, num) { return memo + num; }, 0);
		}
		if (pixelColors != 0) {
			console.log("CHECK");
			this.isDead = true;
		}
	}


}

module.exports = Player;