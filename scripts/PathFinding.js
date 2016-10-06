class PathFinding {
	constructor(grid, startIndex) {
		this.currGridSection = grid[startIndex];
		this.startIndex = startIndex;
		this.grid = grid;
		this.setGoal();
		this.closedList = [];
		this.closedList.push(this.currGridSection);
		this.run();
		this.g = 0;
	}
	setGoal() {
		this.goalIndex = 0;
	}
	run() {
		var adjArr = this.setAdjacentSections(this.positionCheck());
		var validSections = [];
		for (var i = 0; i < adjArr.length; i++) {
			if (adjArr[i].occupation == 0) {
				validSections.push(adjArr[i]);
			}
		}
		var dist = this.calcManhattan(this.startIndex, this.goalIndex);
		console.log(dist);
	}
	calcG () {
		this.g++;
	}
	calcManhattan (a, b) {
		console.log("a " + a);
		console.log("b " + b);
		var dist = Math.abs(Math.floor(a / 10) - Math.floor(b / 10)) + Math.abs(a % 10 - b % 10);

		return dist;

	}
	positionCheck() {
		var i = this.startIndex;
		var positionCheck;

		// last column, not corners
		if (i % 10 == 9 && (i != 9 || i != 99)) {
			positionCheck = "LAST_COL_NO_CORNERS";
		}
		// first column, not corners
		else if (i % 10 == 0 && (i != 0 || i != 90)) {
			positionCheck = "FIRST_COL_NO_CORNERS";
		}
		// first row, not corners
		else if (i < 9 && i != 0) {
			positionCheck = "FIRST_ROW_NO_CORNERS";
		}
		// last row, not corners
		else if (i > 90 && i != 99) {
			positionCheck = "LAST_ROW_NOT_CORNERS";
		}
		// middle 
		else {
			positionCheck ="MIDDLE";
		}
		return positionCheck;
	}
	setAdjacentSections(check) {
		var adjIndexArr = [];
		if (check == "LAST_COL_NO_CORNERS") {
			adjIndexArr.push(this.startIndex - 1);
			adjIndexArr.push(this.startIndex - 10);
			adjIndexArr.push(this.startIndex + 10);
		}
		else if (check == "FIRST_COL_NO_CORNERS") {
			adjIndexArr.push(this.startIndex + 1);
			adjIndexArr.push(this.startIndex - 10);
			adjIndexArr.push(this.startIndex + 10);
		}
		else if (check == "FIRST_ROW_NO_CORNERS") {
			adjIndexArr.push(this.startIndex + 1);
			adjIndexArr.push(this.startIndex - 1);
			adjIndexArr.push(this.startIndex + 10);
		}
		else if (check == "LAST_ROW_NOT_CORNERS") {
			adjIndexArr.push(this.startIndex + 1);
			adjIndexArr.push(this.startIndex - 1);
			adjIndexArr.push(this.startIndex - 10);
		}
		// middle
		else {
			adjIndexArr.push(this.startIndex + 1);
			adjIndexArr.push(this.startIndex - 1);
			adjIndexArr.push(this.startIndex + 10);
			adjIndexArr.push(this.startIndex - 10);

		}
		return adjIndexArr;

	}

}

module.exports = PathFinding;