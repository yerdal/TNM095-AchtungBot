var Player = require("./Player");
var _ = require("underscore");
var PathFinding = require("./PathFinding");
var BehaviorTree = require('./BehaviorTree');
class Bot extends Player {
	constructor(width, height, color, x, y, gameArea) {
		super(width, height, color, x, y, gameArea);
		var _this = this;
		this.gridIndex = 0;
		this.currentGrid = 0;
		this.goalAngle = [-1 -1];
 		this.behaviorTree = new BehaviorTree();
		var goalIndex = this.behaviorTree.getBehavior(this.gameArea.largeGrid.getCurrentGridSection(this.position), this.gameArea.largeGrid.getGridSectionWithLeastOccupation(), this.position);
		this.pathFinding = new PathFinding(this.gameArea.grid, this.gameArea.grid.getCurrentGridSection(this.position).index, goalIndex);
 		this.path = this.pathFinding.visitedList;
 		this.goal = this.path.pop();
	}

	decide(pixels, k) {
		var white = true;
		if (pixels != 0) {
			this.moveAngle = 4;
			white = false;
		}
		else if (white) {
			this.moveAngle = 0;
			if (this.goalAngle[0] != -1) {
				this.goToGoalAngle();
			}
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
		} 
		// special case for 0 and 355
		else if (this.goalAngle[0] == 355 && this.goalAngle[1] == 5) {
			if (curAngle < this.goalAngle[1] || curAngle > this.goalAngle[0]) {
				this.goalAngle[0] = -1;
				this.goalAngle[1] = -1;
			}
			else{
				var goal = this.goalAngle[0]+5;

				var opposite = goal + 180;
				opposite = opposite % 360;
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
		else {
			var goal = this.goalAngle[0]+5;

			var opposite = goal + 180;
			opposite = opposite % 360;
			if (goal == 0) {
				if (curAngle < 180) {
					this.moveAngle = -4;
				}
				else
					this.moveAngle = 4;
			}
			else if (goal == 90) {
				if (curAngle < goal || curAngle > 270) {
					this.moveAngle = 4;
				}
				else if (curAngle > goal && curAngle < 270) {
					this.moveAngle = -4;
				}
			}
			else if (goal == 180) {
				if (curAngle < 180) {
					this.moveAngle = 4;
				}
				else
					this.moveAngle = -4;
			}
			else if (goal == 270) {
				if (curAngle < 270 && curAngle > 90) {
					this.moveAngle = 4;
				}
				else
					this.moveAngle = -4;
			}
		}
	}

	checkAngle(angle) {
		var answer = angle % (Math.PI*2);
		answer = (answer * 180) / Math.PI;
		if (answer < 0)
			answer+=360;
		return answer; 
	}

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
	   	var pixels = 0;
	   	// check if new obstacle
	   	var newPos = {};

	   	if(this.currentGridSection.index != this.gameArea.grid.getCurrentGridSection(this.position).index) {
	   		this.pathFinding.recalculate(this.gameArea.grid.getCurrentGridSection(this.position));
	   		this.path = this.pathFinding.visitedList;
	   	}
	   	this.currentGridSection = this.gameArea.grid.getCurrentGridSection(this.position);

	   	if (this.path.length == 0) {
	   		console.log("NÄMEN");
	   		var goalIndex = this.behaviorTree.getBehavior(this.gameArea.largeGrid.getCurrentGridSection(this.position), this.gameArea.largeGrid.getGridSectionWithLeastOccupation(), this.position);
	   		this.pathFinding.goalIndex = goalIndex;
			this.pathFinding.recalculate(this.gameArea.grid.getCurrentGridSection(this.position));
			this.path = this.pathFinding.visitedList;


	   	}
	   	if (this.currentGridSection.index == this.path[0].index) {
	   		console.log("DUKTIG");
	   		this.path.shift();
	   	}

	   	else
	   	{
	   		if(this.currentGridSection.index+1 == this.path[0].index) {
				// go right
				this.goalAngle[0] = 85;
				this.goalAngle[1] = 95;
			} else if(this.currentGridSection.index - 1 == this.path[0].index) {
					// go left
					this.goalAngle[0] = 265;
					this.goalAngle[1] = 275;

			} else if(this.currentGridSection.index + 9 == this.path[0].index) {
					// go down
					this.goalAngle[0] = 175;
					this.goalAngle[1] = 185;

			} else if(this.currentGridSection.index - 9 == this.path[0].index) {
					// go up
					this.goalAngle[0] = 355;
					this.goalAngle[1] = 5;
	   		}
	   	}
	   	for (var i = 0; i < 40; i++) {
	   		newPos.x = this.position.x + Math.cos(Math.atan(k))*i;
	   		newPos.y = this.position.y + Math.sin(Math.atan(k))*i;
	   		var pixelColors = _.reduce(this.ctx.getImageData(newPos.x, newPos.y, 1, 1).data, function(memo, num) { return memo + num; }, 0);
	   		pixelVec.push(pixelColors);
	   	}
	   	var pixels = _.reduce(pixelVec, function(memo, num) { return memo + num}, 0);
	   	this.decide(pixels, k);
	   	this.checkCollisions();

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
			this.gameArea.largeGrid.getCurrentGridSection(this.position).occupation++;

		} else {
			this.hole--;
			if(this.hole == 0) {
				this.nextHoleTimer();
			}
		}
	}
	
}
module.exports = Bot;