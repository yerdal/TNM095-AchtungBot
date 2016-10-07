var Player = require("./Player");
var _ = require("underscore");
var PathFinding = require("./PathFinding");
class Bot extends Player {
	constructor(width, height, color, x, y, gameArea) {
		super(width, height, color, x, y, gameArea);
		var _this = this;
		this.gridIndex = 0;
		this.currentGrid = 0;
		this.goalAngle = [-1 -1];
		this.pathFinding = new PathFinding(this.gameArea.grid, this.gameArea.grid.getCurrentGridSection(this.position).index);
 		this.path = this.pathFinding.visitedList;
 		console.log("path: ");
 		for (var i = 0; i < this.path.length; i++) {
 			console.log(this.path[i].index);
 		}
 		this.goal = this.path.pop();
 		console.log("start: " + this.gameArea.grid.getCurrentGridSection(this.position).index);
 		console.log("goal: " + this.goal.index);
	}

	decide(pixelVec, k) {
		var white = true;
		for (var i = 0; i < pixelVec.length; i++) {
			if (pixelVec[i] != 0) {
					this.moveAngle = 4;
					white = false;
					return;
			}
		}
		if (white) {
			this.moveAngle = 0;
		}
		if (this.goalAngle[0] != -1) {
			this.goToGoalAngle();
		}
	}
	goToNextGridSection(k) {
		/*this.position.x += this.speed* + Math.cos(Math.atan(k));
		this.position.y-= this.speed * + Math.sin(Math.atan(k));*/
		this.angle= Math.atan(k);
		this.position.x += this.speed * Math.sin(this.angle*2);
		this.position.y -= this.speed * Math.cos(this.angle*2);
	}

	goToGoalAngle() {
		var curAngle = this.checkAngle(this.angle);
		if (curAngle > this.goalAngle[0] && curAngle < this.goalAngle[1]) {
			this.goalAngle[0] = -1;
			this.goalAngle[1] = -1;
			
		} else {
			var goal = this.goalAngle[0]+5;
			var opposite = goal + 180;
			opposite = goal % 360;
			if(goal < 180) {
				if (curAngle > opposite) {
					this.moveAngle = 4;
				} else {
					this.moveAngle = -4;
				}
			} else {
				if (curAngle > goal || curAngle < opposite) {
					this.moveAngle = -4;
				} else {
					this.moveAngle = 4;
				}
			}
		}
	}

	checkAngle(angle) {
		var answer = angle % (Math.PI*2);
		answer = (answer * 180) * Math.PI;
		return answer; 
	}

	// goRight() {
	// 	console.log("Jag vill åt höger!");
	// 	console.log(this.angle);
	// 	let curAngle = this.checkAngle(this.angle);
	// 	if (curAngle < 180) {
	// 		do {
	// 			this.moveAngle = -4;
	// 		} while (curAngle > 5 && checkAngle(curAngle < 0));
	// 	} else {
	// 					do {
	// 			this.moveAngle = 4;
	// 		} while (curAngle > 5 && curAngle < 0);
	// 	}
	// }

	// goLeft() {
	// 	console.log("VÄNSTER!");
	// 	console.log(this.angle);
	// 	let curAngle = this.checkAngle(this.angle);
	// 	if (curAngle < 180) {
	// 		this.moveAngle = 4;
	// 	} else {
	// 		this.moveAngle = -4;
	// 	}
	// }

	// goUp() {
	// 	console.log("Uppåt kanske?");
	// 	console.log(this.angle);
	// 	let curAngle = this.checkAngle(this.angle);
	// 	if (curAngle < 90 || curAngle > 270) {
	// 		this.moveAngle = 4;
	// 	} else {
	// 		this.moveAngle = -4;
	// 	}
	// }

	// goDown() {
	// 	console.log("Lets get down tonight!");
	// 	console.log(this.angle);
	// 	let curAngle = this.checkAngle(this.angle);
	// 	if (curAngle < 90 || curAngle > 270) {
	// 		this.moveAngle = -4;
	// 	} else {
	// 		this.moveAngle = 4;
	// 	}
	// }

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
	   		var pixelColors = _.reduce(this.ctx.getImageData(newPos.x, newPos.y, 1, 1).data, function(memo, num) { return memo + num; }, 0);
	   		pixelVec.push(pixelColors);
	   	}
	   	this.decide(pixelVec, k);
	   	this.checkCollisions();
	   	this.currentGridSection = this.gameArea.grid.getCurrentGridSection(this.position);
	   	/*console.log("anim: " + this.currentGridSection.index);
	   	console.log("next: " + this.pathFinding.currentGridSection.index);*/
	   //	this.pathFinding.run();
	   //	this.pathFinding.run(this.currentGridSection);
	   	/*var kNew = (this.pathFinding.currentGridSection.centerY - this.position.y) / 
	   	(this.pathFinding.currentGridSection.centerX - this.position.x);
	   	this.goToNextGridSection(kNew);*/
	   	if (this.path.length == 0) {
	   		console.log("NÄMEN");
	   	}
	   	if (this.currentGridSection.index == this.path[0].index) {
	   		console.log("DUKTIG");
	   		this.path.shift();
	   	}
	   	else
	   	{
	   		if(this.currentGridSection.index+1 == this.path[0].index) {
				// go Right
					this.goalAngle[0] = 355;
					this.goalAngle[1] = 5;
				} else if(this.currentGridSection.index-1 == this.path[0].index) {
					// this.parent.goLeft();
					this.goalAngle[0] = 175;
					this.goalAngle[1] = 185;
				} else if(this.currentGridSection.index-10 == this.path[0].index) {
					// this.parent.goDown();
					this.goalAngle[0] = 265;
					this.goalAngle[1] = 275;
				} else if(this.currentGridSection.index+10 == this.path[0].index) {
					// this.parent.goUp();
					this.goalAngle[0] = 85;
					this.goalAngle[1] = 95;
	   		}
	   	}
	   	this.update();	   	
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