const TURN_RIGHT = 4;
const TURN_LEFT = -4;


class BehaviorTree {
	/*behaviorTactics(tactic){
		switch(tactic){
			case 0:
				this.survieBehavior();
			case 1:
				this.attackBehavior();
		}
	}*/

	surviveBehavior(currentGrid, bestGrid, botPosition) {
		//console.log("Behave", bestGrid);
		var mappedIndex;
		let nearestEmptyIndex = this.getNearestIndex(bestGrid, botPosition);
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

	attackBehavior(playerPosition, botPosition){
		//console.log("playerpos", playerPosition);
		//console.log("botpos", botPosition);

	}

	getNearestIndex(bestGrid, botPosition){
		let bestSection = bestGrid[0]; 

		let bestValue = Math.abs(bestSection.centerX - botPosition.x) + Math.abs(bestSection.centerY - botPosition.y);
		let newValue;
		for (var i = 1; i < bestGrid.length; i++) {
			newValue = Math.abs(bestGrid[i].centerX - botPosition.y) + Math.abs(bestGrid[i].centerY - botPosition.y);
			if(bestValue > newValue){
				bestValue = newValue;
				bestSection = bestGrid[i];
			}
		}
		//console.log("bestIndex", best.index);
		return bestSection;
	}
}

module.exports = BehaviorTree;