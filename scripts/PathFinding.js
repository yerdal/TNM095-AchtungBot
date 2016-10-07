var PriorityQueue = require("js-priority-queue");

class PathFinding {
	constructor(grid, currentIndex) {
		this.currentGridSection = grid.sections[currentIndex];
		this.currentIndex = currentIndex;
		this.grid = grid;
		this.setGoal();
		this.visitedList = [];
		this.visitedList.push(this.grid[currentIndex]);
		this.queue = new PriorityQueue({comparator: function(a, b) {
			return (a.g + a.h) - (b.g + b.h);
		}});
		this.init();
	}
	setGoal() {
		this.goalIndex = 0;
	}
	addToQueue(obj) {
		var found = false;
		for (var i = 0; i < visitedList.length; i++) {
			if (visitedList[i].index == obj.index) {
				found = true;
			}
		}
		if (!found) {
			this.queue.queue(obj);
		}
	}
	run(currentGridSection) {
		if (this.queue.length > 0) {
			if (currentGridSection.index == this.currentGridSection.index) {
				this.currentGridSection = this.queue.dequeue();
				console.log(this.currentGridSection.index);
				this.visitedList.push(this.currentGridSection);
				if (this.currentGridSection.reachedGoal()) {
					console.log("TJU  DU E KLAR");
					return;
				}
				var adjArr = this.setAdjacentSections(this.positionCheck());
				var validSections = [];
				for (var i = 0; i < adjArr.length; i++) {
					if (adjArr[i].occupation == 0) {
						this.grid.sections[adjArr[i]].h = this.calcManhattan(adjArr[i], this.goalIndex);
						this.grid.sections[adjArr[i]].g++;
						this.addToQueue(this.grid.sections[adjArr[i]]);
						this.grid.sections[adjArr[i]]

					}
				}
			}
		}
	}
	init() {
		this.queue.queue(this.currentGridSection);
		var adjArr = this.setAdjacentSections(this.positionCheck());
		var validSections = [];
		this.visitedList.push(this.currentGridSection);

		for (var i = 0; i < adjArr.length; i++) {
			if (this.grid.sections[adjArr[i]].occupation == 0) {
				this.grid.sections[adjArr[i]].h = this.calcManhattan(adjArr[i], this.goalIndex);
				this.grid.sections[adjArr[i]].g++;
				this.queue.queue(this.grid.sections[adjArr[i]]);
			}
		}
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
		var i = this.currentGridSection.index;
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
		var adjSections = [];
		if (check == "LAST_COL_NO_CORNERS") {
			adjSections.push(this.currentIndex - 1);
			adjSections.push(this.currentIndex - 10);
			adjSections.push(this.currentIndex + 10);
		}
		else if (check == "FIRST_COL_NO_CORNERS") {
			adjSections.push(this.currentIndex + 1);
			adjSections.push(this.currentIndex - 10);
			adjSections.push(this.currentIndex + 10);
		}
		else if (check == "FIRST_ROW_NO_CORNERS") {
			adjSections.push(this.currentIndex + 1);
			adjSections.push(this.currentIndex - 1);
			adjSections.push(this.currentIndex + 10);
		}
		else if (check == "LAST_ROW_NOT_CORNERS") {
			adjSections.push(this.currentIndex + 1);
			adjSections.push(this.currentIndex - 1);
			adjSections.push(this.currentIndex - 10);
		}
		else if (check == "TOP_RIGHT_CORNER") {
			adjSections.push(this.currentIndex - 1);
			adjSections.push(this.currentIndex + 10);
		}
		else if (check == "TOP_LEFT_CORNER") {
				adjSections.push(this.currentIndex + 1);
				adjSections.push(this.currentIndex + 10);
			
		}
		else if (check == "BOTTOM_LEFT_CORNER") {
			adjSections.push(this.currentIndex + 1);
			adjSections.push(this.currentIndex - 10);
		}
		else if (check == "BOTTOM_RIGHT_CORNER") {
			adjSections.push(this.currentIndex - 1);
			adjSections.push(this.currentIndex - 10);
		}
		// middle
		else {
			adjSections.push(this.currentIndex + 1);
			adjSections.push(this.currentIndex - 1);
			adjSections.push(this.currentIndex + 10);
			adjSections.push(this.currentIndex - 10);

		}
		return adjSections;

	}

}

module.exports = PathFinding;