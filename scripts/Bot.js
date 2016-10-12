var Player = require("./Player");
var _ = require("underscore");
var PathFinding = require("./PathFinding");
var BehaviorTree = require('./BehaviorTree');
class Bot extends Player {
	constructor(width, height, color, x, y, gameArea, player) {
		super(width, height, color, x, y, gameArea);
		this.player = player;
		this.gridIndex = 0;
		this.currentGrid = 0;
		this.goalAngle = [-1 -1];
 		this.behaviorTree = new BehaviorTree();

		var goalIndex = this.behaviorTree.surviveBehavior(this.gameArea.largeGrid.getCurrentGridSection(this.position), this.gameArea.largeGrid.getGridSectionWithLeastOccupation(), this.position);
		this.pathFinding = new PathFinding(this.gameArea.grid, this.gameArea.grid.getCurrentGridSection(this.position).index, goalIndex);
 		this.path = this.pathFinding.visitedList;
 		this.goal = this.path.pop();
	}

	decide(pixels) {
		var white = true;
		if (pixels != 0) {
			this.moveAngle = 6;
			white = false;
		}
		else if (white) {
			this.moveAngle = 0;
			if (this.goalAngle[0] != -1) {
				this.goToGoalAngle();
			}
		}
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

	   	if(this.currentGridSection.index != this.gameArea.grid.getCurrentGridSection(this.position).index) {
	   		this.pathFinding.recalculate(this.gameArea.grid.getCurrentGridSection(this.position));
	   		this.path = this.pathFinding.visitedList;
	   	}
	   	this.currentGridSection = this.gameArea.grid.getCurrentGridSection(this.position);

	   	if (this.path.length == 0) {
	   		console.log("NÄMEN");
	   		var goalIndex = this.behaviorTree.surviveBehavior(this.gameArea.largeGrid.getCurrentGridSection(this.position), this.gameArea.largeGrid.getGridSectionWithLeastOccupation(), this.position);
	   		this.pathFinding.goalIndex = goalIndex;
			this.pathFinding.recalculate(this.gameArea.grid.getCurrentGridSection(this.position));
			this.path = this.pathFinding.visitedList;


	   	}
	   	if (this.currentGridSection.index == this.path[0].index) {
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
	   	this.angle += this.moveAngle * Math.PI / 180;
	   	this.position.x += this.speed * Math.sin(this.angle);
	   	this.position.y -= this.speed * Math.cos(this.angle);

	   	
	   	var pixelVec = [];
	   	var newPos = {x: 0, y: 0};
	   	for (var i = 0; i < 60; i++) {
	   		newPos.x =  this.position.x + Math.sin(this.angle)*i;
	   		newPos.y =  this.position.y - Math.cos(this.angle)*i;
	   		var pixelColors = _.reduce(this.ctx.getImageData(newPos.x, newPos.y, 1, 1).data, function(memo, num) { return memo + num; }, 0);
	   		pixelVec.push(pixelColors);
	   	}
	   /*	this.ctx.beginPath();
	   	this.ctx.moveTo(this.position.x, this.position.y);
	   	this.ctx.lineTo(newPos.x, newPos.y);
	   	this.ctx.stroke();*/
	   	var pixels = _.reduce(pixelVec, function(memo, num) { return memo + num}, 0);
	   	this.decide(pixels);
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
			this.behaviorTree.attackBehavior(this.player.position, this.position);

		} else {
			this.hole--;
			if(this.hole == 0) {
				this.nextHoleTimer();
			}
		}
	}
	
}
module.exports = Bot;