const TURN_RIGHT = 4;
const TURN_LEFT = -4;


class BehaviourTree {
	constructor (pathFinding){
		this.pathFinding = pathFinding;
	}
	getBehavior(currentGrid, bestGrid, botPosition) {
		//console.log("Behave", bestGrid);
		let nearestEmptyIndex = this.getNearestIndex(bestGrid, botPosition);	
		

		/*switch(currentGrid) {
			case 0:
				break;
			case 1:
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
			case 5:
				break;
			case 6:
				break;
			case 7:
				break;
			case 8:
				break;
		}*/

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

module.exports = BehaviourTree;