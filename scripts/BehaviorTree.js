const TURN_RIGHT = 4;
const TURN_LEFT = -4;

class BehaviorTree {
	behavior(bestLargeGridSections, grid, botPosition, playerPosition){
		//return this.attackBehavior(playerPosition, grid);
		var counter = 0;
		for (var i = 0; i < grid.sections.length; i++) {
			if (grid.sections[i].occupation > 0)
				counter++;
		}
		if (counter > grid.sections.length / 2)
			return this.attackBehavior(playerPosition, grid);

		
		return this.surviveBehavior(bestLargeGridSections, botPosition);
	}


	surviveBehavior(bestLargeGridSections, botPosition) {
		var mappedIndex;
		let nearestEmptyIndex = this.getNearestIndex(bestLargeGridSections, botPosition);
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

	attackBehavior(playerPosition, grid){
		return grid.getCurrentGridSection(playerPosition).index;
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