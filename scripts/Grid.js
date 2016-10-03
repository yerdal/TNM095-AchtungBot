let GridSection = require("./GridSection");
class Grid {
	constructor(gridSize, width, height) {
		this.size = gridSize;
		this.width = width;
		this.height = height;
		this.sections = [];
		this.initGrid();
	}
	initGrid() {
		for (let i = 0; i < this.size * this.size; i++) {
			this.sections.push(new GridSection());
		}
	}
	getGridSection(index) {
		return this.grid[index];
	}
	getCurrentGridSection(position) {
		var index = -1;
		if(position.x <= this.width && position.y <= this.height){
			index = 0;
		}else if(position.x <= this.width*2 && position.y <= this.height){
			index = 1;
		}else if(position.x <= this.width*3 && position.y <= this.height){
			index = 2;
		}else if(position.x <= this.width && position.y <= this.height*2){
			index = 3;
		}else if(position.x <= this.width*2 && position.y <= this.height*2){
			index = 4;
		}else if(position.x <= this.width*3 && position.y <= this.height*2){
			index = 5;
		}else if(position.x <= this.width*1 && position.y <= this.height*3){
			index = 6;
		}else if(position.x <= this.width*2 && position.y <= this.height*3){
			index = 7;
		}else if(position.x <= this.width*3 && position.y <= this.height*3){
			index = 8;
		}
		return index;
	}
	getGridSectionWithLeastOccupation() {
		var leastOccupiedGrid = this.sections[0];
		let leastGridIndex = 0;

		for (let i = 1; i < this.sections.length; i++){
			if(this.sections[i].occupation < leastOccupiedGrid.occupation){
				leastOccupiedGrid = this.sections[i];
				leastGridIndex = i;
			}
		}
		//console.log("leastOccupiedGrid", leastGridIndex);
		return leastGridIndex;
	}
	updateGridOccupation(position) {
		var counter = 0;
		firstLoop:
		for(var y = 1; y <= this.size; y++){
			for (var x = 1; x <= this.size; x++) {
				if(position.x < (this.width * x) && position.y < (this.height*y)){
					// add occupation for grid
					this.sections[counter].occupation++;
					break firstLoop;
				}
				counter++;
			}
		}
	}
}

module.exports = Grid;