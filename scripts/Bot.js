var Player = require("./Player");
var _ = require("underscore");
class Bot extends Player {
	constructor(width, height, color, x, y, gameArea) {
		super(width, height, color, x, y, gameArea);

		this.obstacle = {};
		this.gridIndex = 0;
		this.currentGrid = 0;
		
	}

	decide(pixelVec, k) {

		/*var k = position.y/position.x;
		var m = position.y - k*position.x;*/
		var white = true;
		for (var i = 0; i < pixelVec.length; i++) {
			for (var j = 0; j < pixelVec[i].data.length; j++) {
				if (pixelVec[i].data[j] != 0) {
						this.moveAngle = 10;
						//console.log("hej");
						//console.log("pixelvec", pixelVec[i].data[j]);
						white = false;
						break;
				}
			}
		}
		if (white) {
			this.moveAngle = 0;
		}
	}

	newPos() {
		var x1, x2, y1, y2;
	   	var newAngle = this.moveAngle * Math.PI / 180; 	
	   	this.angle += this.moveAngle * Math.PI / 180;
	   	y1 = this.position.y;
	   	x1 = this.position.x;
	   	this.position.x += this.speed * Math.sin(this.angle);
	   	this.position.y -= this.speed * Math.cos(this.angle);
	   	x2 = this.position.x;
	   	y2 = this.position.y;
	   	var k = (y2-y1)/(x2-x1);

	   	var pixelVec = [];
	   	// check if new obstacle
	   	var newPos = {};
	   	for (var i = 0; i < 40; i++) {
	   		newPos.x = (this.position.x) + Math.cos(Math.atan(k))*i;
	   		newPos.y = (this.position.y) + Math.sin(Math.atan(k))*i;
	   		var pixelColors = this.ctx.getImageData(newPos.x, newPos.y, 1, 1);
	   		pixelVec.push(pixelColors);
	   	}
	   	this.decide(pixelVec, k);
	   	this.checkCollisions();
	   	this.update();
	   	//console.log(this.gameArea.grid);
	   	//this.gridWithLeastPoints();
	   	this.getCurrentGrid();
	}

	getCurrentGrid(){
		var gridSize = this.gameArea.gridSize;
		var gridWidth = this.gameArea.canvas.width / gridSize;
		var gridHeight = this.gameArea.canvas.height / gridSize;

		if(this.position.x <= gridWidth && this.position.y <= gridHeight){
			this.currentGrid = 0;
		}else if(this.position.x <= gridWidth*2 && this.position.y <= gridHeight){
			this.currentGrid = 1;
		}else if(this.position.x <= gridWidth*3 && this.position.y <= gridHeight){
			this.currentGrid = 2;
		}else if(this.position.x <= gridWidth && this.position.y <= gridHeight*2){
			this.currentGrid = 3;
		}else if(this.position.x <= gridWidth*2 && this.position.y <= gridHeight*2){
			this.currentGrid = 4;
		}else if(this.position.x <= gridWidth*3 && this.position.y <= gridHeight*2){
			this.currentGrid = 5;
		}else if(this.position.x <= gridWidth*1 && this.position.y <= gridHeight*3){
			this.currentGrid = 6;
		}else if(this.position.x <= gridWidth*2 && this.position.y <= gridHeight*3){
			this.currentGrid = 7;
		}else if(this.position.x <= gridWidth*3 && this.position.y <= gridHeight*3){
			this.currentGrid = 8;
		}
		//console.log("currGrid", this.currentGrid);

	}

	gridWithLeastPoints(){
		var leastGrid = this.gameArea.grid[0];
		for (var i = 1; i <= this.gameArea.grid.length; i++){
			if(this.gameArea.grid[i] < leastGrid){
				leastGrid = this.gameArea.grid[i];
				this.gridIndex = i;
			}
		}
		//console.log("gridIndex", this.gridIndex);
	}
	
}
module.exports = Bot;