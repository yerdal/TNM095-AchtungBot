
class PathFinding {
	constructor(grid, currentIndex) {
		this.currentGridSection = grid.sections[currentIndex];
		this.currentIndex = currentIndex;
		this.grid = grid;
		this.setGoal();
		this.visitedList = [];
		this.queue = [];
		this.run();
	}
	setGoal(index) {
		this.goalIndex = 15;
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
		var dist = Math.abs(Math.floor(a / 10) - Math.floor(b / 10)) + Math.abs(a % 10 - b % 10);

		return dist;
	}
	positionCheck() {
		var i = this.currentGridSection.index;
		var position;

		// corners
		if (i == 0) {
			position = "TOP_LEFT_CORNER";
		}
		else if (i == 9) {
			position = "TOP_RIGHT_CORNER";
		}
		else if (i == 90) {
			position = "BOTTOM_LEFT_CORNER";
		}
		else if (i == 99) {
			position = "BOTTOM_RIGHT_CORNER";
		}
		else if (i > 0 && i < 9) {
			position = "FIRST_ROW_NO_CORNERS";
		}
		else if (i > 10 && i < 19) {
			position = "MIDDLE";
		}
		else if (i > 20 && i <29) {
			position = "MIDDLE";
		}
		else if (i > 30 && i < 39) {
			position = "MIDDLE";

		}
		else if (i >  40 && i < 49) {
			position = "MIDDLE";

		}
		else if (i > 50 && i < 59) {
			position = "MIDDLE";

		}
		else if (i > 60 && i < 69) {
			position = "MIDDLE";

		}
		else if (i > 70 && i <= 79) {
			position = "MIDDLE";

		}
		else if (i > 80 && i < 89) {
			position = "MIDDLE";

		}
		else if (i > 90 && i < 99) {
			position = "LAST_ROW_NO_CORNERS";

		}
		return position;
	}
	setAdjacentSections(check) {
		var adjSections = [];
		if (check == "FIRST_ROW_NO_CORNERS") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index + 10);
		}
		else if (check == "LAST_ROW_NO_CORNERS") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index - 10);
		}
		else if (check == "TOP_RIGHT_CORNER") {
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index + 10);
		}
		else if (check == "TOP_LEFT_CORNER") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index + 10);
		}
		else if (check == "BOTTOM_LEFT_CORNER") {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 10);
		}
		else if (check == "BOTTOM_RIGHT_CORNER") {
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index - 10);
		}
		// middle
		else {
			adjSections.push(this.currentGridSection.index + 1);
			adjSections.push(this.currentGridSection.index - 1);
			adjSections.push(this.currentGridSection.index + 10);
			adjSections.push(this.currentGridSection.index - 10);
		}
		return adjSections;

	}

}

module.exports = PathFinding;