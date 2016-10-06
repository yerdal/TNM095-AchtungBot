var PriorityQueue = require("js-priority-queue");

class PathFinding {
	constructor(grid, currentIndex) {
		this.currGridSection = grid[currentIndex];
		this.currentIndex = currentIndex;
		this.grid = grid;
		this.setGoal();
		this.visitedList = [];
		this.visitedList.push(this.grid[currentIndex]);
		this.queue = new PriorityQueue({comparator: function() {a, b
			return b-a;
		}});

		this.run();
	}
	setGoal() {
		this.goalIndex = 22;
	}
	run() {
		var adjArr = this.setAdjacentSections(this.positionCheck());
		var validSections = [];
		for (var i = 0; i < adjArr.length; i++) {
			if (adjArr[i].occupation == 0) {
				validSections.push(this.grid.sections[adjArr[i]]);
			}
		}

		this.h = this.calcManhattan(this.currentIndex, this.goalIndex);
	}

	calcManhattan (a, b) {
		var dist = Math.abs(Math.floor(a / 10) - Math.floor(b / 10)) + Math.abs(a % 10 - b % 10);
		return dist;
	}
	nextGrid(index) {
		if (index != this.currentIndex) {
			this.visitedList.push(this.grid[currentIndex]);
			this.currentIndex = index;
			this.grid.sections[this.currentIndex].g++;
			run();
		}
	}
	positionCheck() {
		var i = this.currentIndex;
		var position;

		if (i % 10 == 9 && (i != 9 || i != 99)) {
			position = "LAST_COL_NO_CORNERS";
		}
		else if (i % 10 == 0 && (i != 0 || i != 90)) {
			position = "FIRST_COL_NO_CORNERS";
		}
		else if (i < 9 && i != 0) {
			position = "FIRST_ROW_NO_CORNERS";
		}
		else if (i > 90 && i != 99) {
			position = "LAST_ROW_NOT_CORNERS";
		}
		else if (i == 9 ) {
			position = "TOP_RIGHT_CORNER";
		}
		else if (i == 99) {
			position = "BOTTOM_RIGHT_CORNER";
		}
		else if (i == 0) {
			position = "TOP_LEFT_CORNER";
		}
		else if (i == 90) {
			position = "BOTTOM_LEFT_CORNER";
		}
		else {
			position ="MIDDLE";
		}
		return position;
	}
	setAdjacentSections(check) {
		var adjIndexArr = [];
		if (check == "LAST_COL_NO_CORNERS") {
			adjIndexArr.push(this.currentIndex - 1);
			adjIndexArr.push(this.currentIndex - 10);
			adjIndexArr.push(this.currentIndex + 10);
		}
		else if (check == "FIRST_COL_NO_CORNERS") {
			adjIndexArr.push(this.currentIndex + 1);
			adjIndexArr.push(this.currentIndex - 10);
			adjIndexArr.push(this.currentIndex + 10);
		}
		else if (check == "FIRST_ROW_NO_CORNERS") {
			adjIndexArr.push(this.currentIndex + 1);
			adjIndexArr.push(this.currentIndex - 1);
			adjIndexArr.push(this.currentIndex + 10);
		}
		else if (check == "LAST_ROW_NOT_CORNERS") {
			adjIndexArr.push(this.currentIndex + 1);
			adjIndexArr.push(this.currentIndex - 1);
			adjIndexArr.push(this.currentIndex - 10);
		}
		else if (check == "TOP_RIGHT_CORNER") {
			adjIndexArr.push(this.currentIndex - 1);
			adjIndexArr.push(this.currentIndex + 10);
		}
		else if (check == "TOP_LEFT_CORNER") {
				adjIndexArr.push(this.currentIndex + 1);
				adjIndexArr.push(this.currentIndex + 10);
			
		}
		else if (check == "BOTTOM_LEFT_CORNER") {
			adjIndexArr.push(this.currentIndex + 1);
			adjIndexArr.push(this.currentIndex - 10);
		}
		else if (check == "BOTTOM_RIGHT_CORNER") {
			adjIndexArr.push(this.currentIndex - 1);
			adjIndexArr.push(this.currentIndex - 10);
		}
		// middle
		else {
			adjIndexArr.push(this.currentIndex + 1);
			adjIndexArr.push(this.currentIndex - 1);
			adjIndexArr.push(this.currentIndex + 10);
			adjIndexArr.push(this.currentIndex - 10);

		}
		return adjIndexArr;

	}

}

module.exports = PathFinding;