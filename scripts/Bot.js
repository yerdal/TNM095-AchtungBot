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

		var goalIndex = this.behaviorTree.behavior(this.gameArea.largeGrid.getGridSectionWithLeastOccupation(), this.gameArea.grid, this.position, player.position);
		this.pathFinding = new PathFinding(this.gameArea.grid, this.gameArea.grid.getCurrentGridSection(this.position).index, goalIndex);
 		this.path = this.pathFinding.visitedList;
 		this.goal = this.path.pop();
 		this.collisionEvader = 0;
 		this.dodgeTimer = 0;
	}

	decide(forwardPixels, rightPixelVec, leftPixelVec) {
		if (forwardPixels != 0) {
			// console.log("EVADER: ", this.collisionEvader);
			if (this.collisionEvader == 0) {
				this.dodgeTimer = 5;
				for (var i = 0; i < rightPixelVec.length; i++) {
					if (rightPixelVec[i] != 0) {
						this.moveAngle = -4;
						this.collisionEvader = 1;
						break;
					} 
					else if (leftPixelVec[i] != 0) {
						this.moveAngle = 4;
						this.collisionEvader = 2;
						break;
					}
				}
			}
			else if (this.collisionEvader == 1) {
				this.moveAngle = -4;
			}
			else if (this.collisionEvader == 2) {
				this.moveAngle = 4;
			}
		}
		else {
			if (this.dodgeTimer > 0) {
				if (this.collisionEvader == 1) {
					this.moveAngle = -4;
					this.dodgeTimer--;
					// console.log("dodgeTimer 1", this.dodgeTimer);
				}
				else {
					this.moveAngle = 4;
					this.dodgeTimer--;
					// console.log("dodgeTimer 2", this.dodgeTimer);
				}
			} 
			else {
				this.moveAngle = 0;
				this.collisionEvader = 0;
				if (this.goalAngle[0] != -1) {
					this.goToGoalAngle();
				}
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
	   		// console.log("NÄMEN");
	   		// console.log("player pos: ");
	   		// console.log(this.player.position);
	   		var goalIndex = this.behaviorTree.behavior(this.gameArea.largeGrid.getGridSectionWithLeastOccupation(), this.gameArea.grid, this.position, this.player.position);
	   		this.pathFinding.goalIndex = goalIndex;
				this.pathFinding.recalculate(this.gameArea.grid.getCurrentGridSection(this.position));
				this.path = this.pathFinding.visitedList;
	   	}

	   	if (this.currentGridSection.index == this.path[0].index) {
	   		// console.log("DUKTIG");
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

	   	
	   	this.movementDecider();
	   	this.checkCollisions();
	   	this.update();
	}

	movementDecider() {
		var forwardPixelVec = [];
   	var rightPixelVec = [];
   	var leftPixelVec = [];
   	var forwardPixels, forwardPixelColors, rightPixelColors, leftPixelColors;
   	var forwardCheck = {};
   	var rightCheck = {};
   	var leftCheck = {};

		for (var i = 0; i < 60; i++) {
			forwardCheck.x =  this.position.x + Math.sin(this.angle)*i;
			forwardCheck.y =  this.position.y - Math.cos(this.angle)*i;
			rightCheck.x = this.position.x + Math.sin(this.angle+(Math.PI/8))*i;
			rightCheck.y = this.position.y - Math.cos(this.angle+(Math.PI/8))*i;
			leftCheck.x = this.position.x + Math.sin(this.angle-(Math.PI/8))*i;
			leftCheck.y = this.position.y - Math.cos(this.angle-(Math.PI/8))*i;

			forwardPixelColors = _.reduce(this.ctx.getImageData(forwardCheck.x, forwardCheck.y, 1, 1).data, function(memo, num) { return memo + num; }, 0);
			rightPixelColors = _.reduce(this.ctx.getImageData(rightCheck.x, rightCheck.y, 1, 1).data, function(memo, num) { return memo + num; }, 0);
			leftPixelColors = _.reduce(this.ctx.getImageData(leftCheck.x, leftCheck.y, 1, 1).data, function(memo, num) { return memo + num; }, 0);
			forwardPixelVec.push(forwardPixelColors);
			rightPixelVec.push(rightPixelColors);
			leftPixelVec.push(leftPixelColors);
		}

		forwardPixels = _.reduce(forwardPixelVec, function(memo, num) { return memo + num}, 0);
		this.decide(forwardPixels, rightPixelVec, leftPixelVec);
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