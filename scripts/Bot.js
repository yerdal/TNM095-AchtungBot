var Player = require("./Player");
var _ = require("underscore");
var PathFinding = require("./PathFinding");
class Bot extends Player {
	constructor(width, height, color, x, y, gameArea) {
		super(width, height, color, x, y, gameArea);

		this.gridIndex = 0;
		this.currentGrid = 0;
		this.pathFinding = new PathFinding(this.gameArea.grid, this.gameArea.grid.getCurrentGridSection(this.position).index);
 		this.path = this.pathFinding.visitedList;
 		this.goal = this.path.pop();
 		console.log("start: " + this.gameArea.grid.getCurrentGridSection(this.position).index);
 		console.log("goal: " + this.goal.index);
 		this.gameArea.context.beginPath();
 		this.gameArea.context.moveTo(this.position.x, this.position.y);
 		this.gameArea.context.lineTo(this.goal.centerX, this.goal.centerY);
 		this.gameArea.context.stroke();
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
	goToNextGridSection(k) {
		/*this.position.x += this.speed* + Math.cos(Math.atan(k));
		this.position.y-= this.speed * + Math.sin(Math.atan(k));*/
		this.angle= Math.atan(k);
		this.position.x += this.speed * Math.sin(this.angle*2);
		this.position.y -= this.speed * Math.cos(this.angle*2);
	}

	newPos() {
		/*var x1, x2, y1, y2;
	   	var newAngle = this.moveAngle * Math.PI / 180; 	
	   	this.angle += this.moveAngle * Math.PI / 180;
	   	y1 = this.position.y;
	   	x1 = this.position.x;
	   	this.position.x += this.speed * Math.sin(this.angle);
	   	this.position.y -= this.speed * Math.cos(this.angle);
	   	x2 = this.position.x;
	   	y2 = this.position.y;*/
	   	//var k = (y2-y1)/(x2-x1);

	   	/*var pixelVec = [];
	   	// check if new obstacle
	   	var newPos = {};
	   	for (var i = 0; i < 40; i++) {
	   		newPos.x = this.position.x + Math.cos(Math.atan(k))*i;
	   		newPos.y = this.position.y + Math.sin(Math.atan(k))*i;
	   		var pixelColors = _.reduce(this.ctx.getImageData(newPos.x, newPos.y, 1, 1).data, function(memo, num) { return memo + num; }, 0);
	   		pixelVec.push(pixelColors);
	   	}
	   	this.decide(pixelVec, k);*/
	   	//this.checkCollisions();
	   	this.currentGridSection = this.gameArea.grid.getCurrentGridSection(this.position);
	   	/*console.log("anim: " + this.currentGridSection.index);
	   	console.log("next: " + this.pathFinding.currentGridSection.index);*/
	   //	this.pathFinding.run();
	   //	this.pathFinding.run(this.currentGridSection);
	   	/*var kNew = (this.pathFinding.currentGridSection.centerY - this.position.y) / 
	   	(this.pathFinding.currentGridSection.centerX - this.position.x);
	   	this.goToNextGridSection(kNew);*/
	   	if (this.currentGridSection.index == this.path[0].index) {
	   		this.path.shift();
	   	}
	   	else
	   	{
	   		var kNew = (this.path[0].centerY - this.position.y) / (this.path[0].centerX - this.position.x);
	   		this.goToNextGridSection(kNew);
	   		this.update();
	   	}
	   	this.update();
	   	this.moveAngle = 0;
	   	
	}
	update() {

		if(this.hole == 0) {
			this.ctx.save();
			this.ctx.translate(this.position.x, this.position.y);
			this.ctx.rotate(this.angle);
		  	this.ctx.fillStyle = this.color;
			this.ctx.fillRect(this.width / 2, this.height / 2, this.width, this.height);
			this.ctx.restore();
			this.currentGridSection.occupation++;


		} else {
			this.hole--;
			if(this.hole == 0) {
				this.nextHoleTimer();
			}
		}
	}
	
}
module.exports = Bot;