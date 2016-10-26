const TURN_RIGHT = 4;
const TURN_LEFT = -4;

class BehaviorTree {
	constructor(ctx, grid) {
		this.ctx = ctx;
		this.grid = grid;
	}

	getBehavior(bestLargeGridSections, botPosition, playerPosition, botAngle, playerAngle, hasFinishedBehavior) {
		this.bestLargeGridSections = bestLargeGridSections;
		this.botPosition = botPosition;
		this.playerPosition = playerPosition;
		this.botAngle = botAngle;
		this.playerAngle = playerAngle;

		if (hasFinishedBehavior) {
			if (this.shouldAttack()) {
					// go to 30 px in front of player
					var playerNextPosition = {x: 0, y: 0};
					playerNextPosition.x =  this.playerPosition.x + Math.sin(this.playerAngle * (Math.PI/180))*30;
					playerNextPosition.y =  this.playerPosition.y - Math.cos(this.playerAngle * (Math.PI/180))*30;
					this.currentBehavior = "attack";
					console.log("ATTACK");
					return this.grid.getCurrentGridSection(playerNextPosition).index;
			}
			else {
				console.log("SURVIVE");
				this.currentBehavior = "survive";
				return this.getSurviveBehaviorIndex();
			}
		}
		// not yet finished survival path, but should still be able to attack if possible
		else {
			if (this.shouldAttack() && this.currentBehavior == "survive") {
					// go to 30 px in front of player
					var playerNextPosition = {x: 0, y: 0};
					playerNextPosition.x =  this.playerPosition.x + Math.sin(this.playerAngle * (Math.PI/180))*30;
					playerNextPosition.y =  this.playerPosition.y - Math.cos(this.playerAngle * (Math.PI/180))*30;
					console.log("ATTAAAACK");
					this.currentBehavior = "attack";
					return this.grid.getCurrentGridSection(playerNextPosition).index;
			}
			return -1;
		}

		return -1;
	}

	shouldAttack() {
		var angleBetweenBodies;
		var curr;
		var vec = {x: 0, y: 0}
		if (this.playerAngle > this.botAngle) {
			angleBetweenBodies = this.playerAngle - this.botAngle;
			vec.x = this.botPosition.x + Math.sin((angleBetweenBodies) * Math.PI/180);
			vec.y = this.botPosition.y - Math.cos((angleBetweenBodies) * Math.PI/180);
			curr = this.playerPosition;
		}
		else {
			angleBetweenBodies = this.botAngle - this.playerAngle;
			vec.x = this.playerPosition.x + Math.sin((angleBetweenBodies) * Math.PI/180);
			vec.y = this.playerPosition.y - Math.cos((angleBetweenBodies) * Math.PI/180);
			curr = this.botPosition;
		}
		var lengthBetweenWorms = Math.sqrt(Math.pow(this.botPosition.x - this.playerPosition.x, 2) + 
			Math.pow(this.botPosition.y - this.playerPosition.y, 2));
		if (angleBetweenBodies < 90 && lengthBetweenWorms < 120) {
			return true;
		}
		return false;
	}
	getSurviveBehaviorIndex() {
		var mappedIndex;
		let nearestEmptyIndex = this.getNearestIndex(this.bestLargeGridSections, this.botPosition);
		if(nearestEmptyIndex.index == 0) {
			mappedIndex = 10;
		} else if(nearestEmptyIndex.index == 1) {
			mappedIndex = 13;
		} else if(nearestEmptyIndex.index == 2) {
			mappedIndex = 16;
		} else if(nearestEmptyIndex.index == 3) {
			mappedIndex = 37;
		} else if(nearestEmptyIndex.index == 4) {
			mappedIndex = 40;
		} else if(nearestEmptyIndex.index == 5) {
			mappedIndex = 43;
		} else if(nearestEmptyIndex.index == 6) {
			mappedIndex = 64;
		} else if(nearestEmptyIndex.index == 7) {
			mappedIndex = 67;
		} else if(nearestEmptyIndex.index == 8) {
			mappedIndex = 70;
		}
		return mappedIndex;
	}
	checkAngle(angle) {
		var answer = angle % (Math.PI*2);
		answer = (answer * 180) / Math.PI;
		if (answer < 0)
			answer+=360;
		return answer; 
	}

	getNearestIndex(bestLargeGridSections, botPosition){
		let bestSection = bestLargeGridSections[0]; 

		let bestValue = Math.abs(bestSection.centerX - botPosition.x) + Math.abs(bestSection.centerY - botPosition.y);
		let newValue;
		for (var i = 1; i < bestLargeGridSections.length; i++) {
			newValue = Math.abs(bestLargeGridSections[i].centerX - botPosition.y) + Math.abs(bestLargeGridSections[i].centerY - botPosition.y);
			if(bestValue > newValue){
				bestValue = newValue;
				bestSection = bestLargeGridSections[i];
			}
		}
		//console.log("bestIndex", best.index);
		return bestSection;
	}
}

module.exports = BehaviorTree;