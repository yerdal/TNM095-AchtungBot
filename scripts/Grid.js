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

		let counter = 0;
		for(var y = 1; y <= this.size; y++){
			for (var x = 1; x <= this.size; x++) {
					// Calculate center positions for grid 0-8
					this.sections[counter].centerX = (this.width*x) / 2;
					this.sections[counter].centerY = (this.height*y) / 2;
					this.sections[counter].index = counter;
					counter++
			}
		}
	}
	getGridSection(index) {
		return this.sections[index];
	}
	getCurrentGridSection(position) {
		//While getting the current grid index we update the 
		//occupations on the grid.
		var index = -1;
		var counter = 0;
		firstLoop:
		for(var y = 1; y <= this.size; y++){
			for (var x = 1; x <= this.size; x++) {
				if(position.x <= (this.width * x) && position.y <= (this.height*y)){
					index = counter;
					break firstLoop;
				}
				counter++;
			}
		}
		return this.sections[index];
	}
	getGridSectionWithLeastOccupation() {
		var leastOccupiedGrid = this.sections[0];

		for (let i = 1; i < this.sections.length; i++){
			if(this.sections[i].occupation < leastOccupiedGrid.occupation) {
				leastOccupiedGrid = this.sections[i];
			}
		}
		return leastOccupiedGrid;
	}
}

module.exports = Grid;