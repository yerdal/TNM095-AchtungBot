var Player = require("./Player");
var _ = require("underscore");
var PathFinding = require("./PathFinding");
var BehaviorTree = require('./BehaviorTree');
const GO_LEFT = 1;
const GO_RIGHT = 2;
class Bot extends Player {
	constructor(width, height, color, x, y, gameArea, player) {
		super(width, height, color, x, y, gameArea);
		this.player = player;
		this.gridIndex = 0;
		this.currentGrid = 0;
		this.goalAngle = [-1 -1];
 		this.behaviorTree = new BehaviorTree(this.gameArea.context, this.gameArea.grid);
 		this.currentBehavior = "survive";
 		this.hasFinishedBehavior = false;
		var goalIndex = this.behaviorTree.getBehavior(this.gameArea.largeGrid.getGridSectionsWithLeastOccupation(), this.position, player.position, this.checkAngle(this.angle), this.checkAngle(player.angle), true);
		this.pathFinding = new PathFinding(this.gameArea.grid, this.position, goalIndex);
 		this.path = this.pathFinding.visitedList;
 		this.goal = this.path.pop();
 		this.collisionEvader = 0;
 		this.dodgeTimer = 0;

	}

	newPos() {
		// get index
		this.currentGridSection = this.gameArea.grid.getCurrentGridSection(this.position);
		var goalIndex = this.behaviorTree.getBehavior(this.gameArea.largeGrid.getGridSectionsWithLeastOccupation(), 
			this.position, this.player.position, this.checkAngle(this.angle), this.checkAngle(this.player.angle), this.hasFinishedBehavior);
		// if new behavior
		if (goalIndex != -1) {
			console.log("new behavior");
			this.pathFinding.goalIndex = goalIndex;
			this.pathFinding.recalculate(this.position);
			this.path = this.pathFinding.visitedList;
			this.hasFinishedBehavior = false;
		}
		if (this.behaviorTree.currentBehavior == "survive") {
		   	// if last index and survive behavior, map to large grid section index
		  	if (this.path.length == 1 && 
		   		this.getLargeGridIndex(this.currentGridSection.index) == this.getLargeGridIndex(this.path[0].index)) {
		   			console.log("REACHED LARGE GRID INDEX");
		   		 	this.path.shift();
		   	}
		}

	   	// if fallen out of path
	   	if(this.currentGridSection.index != this.gameArea.grid.getCurrentGridSection(this.position).index) {
	   	   	console.log("TJU");
	   	   	this.pathFinding.recalculate(this.position);
	   	   	this.path = this.pathFinding.visitedList;
	   	}
	   	   	// if pathfinding done
	   	if (this.path.length == 0) {
	   	   		this.hasFinishedBehavior = true;
	   			console.log("REACHED GOAL");
	   	   	}
	   	// if part of pathfinding done
	   	else if (this.currentGridSection.index == this.path[0].index) {
	   		this.path.shift();
	   		console.log("PART GOAL");
	   	}
	   	// if moving to new index
	   	else
	   	{
	   		this.setGoalAngle();
	   	}
	   	this.angle += this.moveAngle * Math.PI / 180;
	   	this.position.x += this.speed * Math.sin(this.angle);
	   	this.position.y -= this.speed * Math.cos(this.angle);

	   	this.movementDecider();

	   	this.checkCollisions();

	   	this.update();
	}

	decide(forwardPixels) {
		var rightPixelVec = [];
   		var leftPixelVec = [];
		var rightCheck = {};
   		var leftCheck = {};
   		var rightPixelColors, leftPixelColors;

		if (forwardPixels != 0) {

			if (this.collisionEvader == 0) {
				for (var i = 0; i < 50; i++) {
					rightCheck.x = this.position.x + Math.sin(this.angle+(Math.PI/8))*i;
					rightCheck.y = this.position.y - Math.cos(this.angle+(Math.PI/8))*i;
					leftCheck.x = this.position.x + Math.sin(this.angle-(Math.PI/8))*i;
					leftCheck.y = this.position.y - Math.cos(this.angle-(Math.PI/8))*i;
					rightPixelColors = _.reduce(this.ctx.getImageData(rightCheck.x, rightCheck.y, 1, 1).data, function(memo, num) { return memo + num; }, 0);
					leftPixelColors = _.reduce(this.ctx.getImageData(leftCheck.x, leftCheck.y, 1, 1).data, function(memo, num) { return memo + num; }, 0);
					rightPixelVec.push(rightPixelColors);
					leftPixelVec.push(leftPixelColors);
				}

				this.dodgeTimer = 5;
				for (var i = 0; i < rightPixelVec.length; i++) {
					if (rightPixelVec[i] != 0) {
						this.moveAngle = -4;
						this.collisionEvader = GO_LEFT;
						break;
					} 
					else if (leftPixelVec[i] != 0) {
						this.moveAngle = 4;
						this.collisionEvader = GO_RIGHT;
						break;
					}
				}
			}
			else if (this.collisionEvader == GO_LEFT) {
				this.moveAngle = -4;
			}
			else if (this.collisionEvader == GO_RIGHT) {
				this.moveAngle = 4;
			}
		}
		else {
			if (this.dodgeTimer > 0) {
				if (this.collisionEvader == GO_LEFT) {
					this.moveAngle = -4;
					this.dodgeTimer--;
				}
				else {
					this.moveAngle = 4;
					this.dodgeTimer--;
				}
			} 
			else {
				this.moveAngle = 0;
				this.collisionEvader = 0;
				if (this.goalAngle[0] != -1) {
					this.proceedToGoal();
				}
			}
		}
	}
	proceedToGoal() {
		this.moveAngle = 0;
		if (this.goalAngle[0] != -1) {
			this.goToGoalAngle();
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

	getLargeGridIndex(smallGridIndex) {
		// first row
		if ((smallGridIndex >= 0 && smallGridIndex <= 2) || (smallGridIndex >= 9 && smallGridIndex <= 11) ||
			(smallGridIndex >= 18 && smallGridIndex <=20)) {
			return 0;
		}

		else if ((smallGridIndex >= 3 && smallGridIndex <= 5) || (smallGridIndex >= 12 && smallGridIndex <= 14) ||
			(smallGridIndex >= 21 && smallGridIndex <= 23)) {
			return 1;
		}

		else if ((smallGridIndex >= 6 && smallGridIndex <= 8) || (smallGridIndex >= 15 && smallGridIndex <= 17) ||
			(smallGridIndex >= 24 && smallGridIndex <= 26)) {
			return 2;
		}
		
		//second row
		else if ((smallGridIndex >= 27 && smallGridIndex <= 29) || (smallGridIndex >= 36 && smallGridIndex <= 38) ||
			(smallGridIndex >=45 && smallGridIndex <= 47)) {
			return 3;
		}
		else if ((smallGridIndex >= 30 && smallGridIndex <=32) || (smallGridIndex >=39 && smallGridIndex <=41) ||
			(smallGridIndex >=48 && smallGridIndex <= 50)) {
			return 4;
		}
		else if ((smallGridIndex >= 33 && smallGridIndex <=35) || (smallGridIndex >= 42 && smallGridIndex <= 44) ||
			(smallGridIndex <=51 && smallGridIndex <=53)) {
			return 5;
		}

		// third row
		else if ((smallGridIndex >= 54 && smallGridIndex <= 56) || (smallGridIndex >= 63 && smallGridIndex <= 65) ||
			(smallGridIndex >= 72 && smallGridIndex <= 74)) {
			return 6;
		}
		else if ((smallGridIndex >= 57 && smallGridIndex <= 59) || (smallGridIndex >= 66 && smallGridIndex <= 68) ||
			(smallGridIndex >= 75 && smallGridIndex <= 77)) {
			return 7;
		}
		else if ((smallGridIndex >= 60 || smallGridIndex <= 62) || (smallGridIndex >= 69 && smallGridIndex <= 71) ||
			(smallGridIndex >= 78 && smallGridIndex <= 80)) {
			return 8;
		}

	}

	movementDecider() {
		var forwardPixelVec = [];
   		var forwardPixels, forwardPixelColors;
   		var forwardCheck = {};

		for (var i = 0; i < 50; i++) {
			forwardCheck.x =  this.position.x + Math.sin(this.angle)*i;
			forwardCheck.y =  this.position.y - Math.cos(this.angle)*i;

			forwardPixelColors = _.reduce(this.ctx.getImageData(forwardCheck.x, forwardCheck.y, 1, 1).data, function(memo, num) { return memo + num; }, 0);
			forwardPixelVec.push(forwardPixelColors);
		}

		forwardPixels = _.reduce(forwardPixelVec, function(memo, num) { return memo + num}, 0);
		this.decide(forwardPixels);

	}
	setGoalAngle() {
		if(this.currentGridSection.index + 1 == this.path[0].index) {
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
	
}
module.exports = Bot;
