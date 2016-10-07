var Player = require("./Player");
var _ = require("underscore");
var PathFinding = require("./PathFinding");
class Bot extends Player {
	constructor(width, height, color, x, y, gameArea) {
		super(width, height, color, x, y, gameArea);
		var _this = this;
		this.gridIndex = 0;
		this.currentGrid = 0;
		this.pathFinding = new PathFinding(this.gameArea.grid, this.gameArea.grid.getCurrentGridSection(this.position).index, _this);
		this.goalAngle = [-1 -2];
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
	   	this.currentGridSection = this.gameArea.grid.getCurrentGridSection(this.position);
	   	this.currentGridSection.occupation++;
	   	this.pathFinding.run(this.currentGridSection);
	   	this.checkCollisions();
	   	this.update();
	}
	
}
module.exports = Bot;