class PathFinding {
	constructor(grid, currentGridSection, goalIndex) {
		this.currentGridSection = currentGridSection;
		this.grid = grid;
		this.visitedList = [];
		this.queue = [];
		this.goalIndex = goalIndex;
		this.run();
	}

	addToQueue(obj) {
		var found = false;
		for (var i = 0; i < this.visitedList.length; i++) {
			if (this.visitedList[i].index == obj.index) {
				found = true;
			}
		}
		if (!found) {
			this.queue.push(obj);
			this.queue.sort(function(a, b) {
				if (a.f < b.f)
		    		return 1;
		  		if (a.f > b.f)
		    		return -1;

		  		return 0;
			});
		}
	}

	recalculate(currentSection) {
		this.currentGridSection = currentSection;
		this.visitedList = [];
		this.queue = [];
		//set g, f and h to 0 on all grid sections before recalculating
		for (var i = 0; i < this.grid.sections.length; i++) {
			this.grid.sections[i].g = 0;
			this.grid.sections[i].h = 0;
			this.grid.sections[i].f = 0;
		}
		this.run();
	}

	run() {
		this.currentGridSection.g = 0;
		this.currentGridSection.h = this.calcManhattan(this.currentGridSection.index, this.goalIndex);
		this.currentGridSection.f = this.currentGridSection.g+this.currentGridSection.h;
		this.addToQueue(this.currentGridSection);
		while (this.queue.length > 0) {
				this.currentGridSection = this.queue.pop();
				this.visitedList.push(this.currentGridSection);
				if (this.currentGridSection.reachedGoal()) {
					return;
				}
				var adjArr = [];
				var adjArr = this.setAdjacentSections(this.positionCheck());
				for (var i = 0; i < adjArr.length; i++) {
						this.grid.sections[adjArr[i]].h = this.calcManhattan(adjArr[i], this.goalIndex);
						this.grid.sections[adjArr[i]].g++;
						this.grid.sections[adjArr[i]].f = this.grid.sections[adjArr[i]].g + this.grid.sections[adjArr[i]].h;
						this.addToQueue(this.grid.sections[adjArr[i]]);
				}
		}
	}

	calcManhattan (a, b) {
		return Math.abs(Math.floor(a / 9) - Math.floor(b / 9)) + Math.abs(a % 9 - b % 9);
	}
	positionCheck() {
		var i = this.currentGridSection.index;
		var position;

		// corners
		if (i == 0) {
			position = "TOP_LEFT_CORNER";
		}
		else if (i == 8) {
			position = "TOP_RIGHT_CORNER";
		}
		else if (i == 72) {
			position = "BOTTOM_LEFT_CORNER";
		}
		else if (i == 81) {
			position = "BOTTOM_RIGHT_CORNER";
		}
		else if (i > 0 && i < 8) {
			position = "FIRST_ROW_NO_CORNERS";
		}
		else if (i > 72 && i < 81) {
			position = "LAST_ROW_NO_CORNERS";
		}
		else if(i % 9 == 0 && i != 72 && i != 0) {
			position = "FIRST_COLUMN_NO_CORNERS";
		}
		else if(i % 9 == 8 && i != 8 && i != 81) {
			position = "LAST_COLUMN_NO_CORNERS";
		}
		else {
			position = "MIDDLE";
		}
	
		return position;
	}
	setAdjacentSections(check) {
		var adjSections = [];
		if (check == "FIRST_ROW_NO_CORNERS") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index + 9);
		}
		else if (check == "LAST_ROW_NO_CORNERS") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index - 9);
		}
		else if (check == "TOP_RIGHT_CORNER") {
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index + 9);
		}
		else if (check == "TOP_LEFT_CORNER") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index + 9);
		}
		else if (check == "BOTTOM_LEFT_CORNER") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 9);
		}
		else if (check == "BOTTOM_RIGHT_CORNER") {
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index - 9);
		}
		else if(check == "FIRST_COLUMN_NO_CORNERS") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 9);
			adjSections.push(this.currentGridSection.index + 9);
		}
		else if(check == "LAST_COLUMN_NO_CORNERS") {
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index - 9);
			adjSections.push(this.currentGridSection.index + 9);
		}
		// middle
		else {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index + 9);
			adjSections.push(this.currentGridSection.index - 9);
		}
		return adjSections;

	}
}


module.exports = PathFinding;