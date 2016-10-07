class GridSection {
	constructor() {
		this.occupation = 0;
		this.centerX = 0;
		this.centerY = 0;
		this.g = 0;
		this.h = 0;
		this.index = -1;
	}
	getF () {
		this.g + this.h;
	}
	getG() {
		return this.g;
	}
	reachedGoal() {
		if (this.h == 0)
			return true;

		return false;
		
	}
}
module.exports = GridSection;