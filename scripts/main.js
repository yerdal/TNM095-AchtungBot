//browserify scripts/main.js -o dist/bundle.js

const SCREEN_WIDTH = window.innerWidth-100;
const SCREEN_HEIGHT = window.innerHeight-100;
var Game = require("./Game");
var startBtn = document.getElementById("start-btn");
var restartBtn = document.getElementById("restart-btn");
var canvas = document.createElement("canvas");

startBtn.onclick = (event) => {
    new Game(SCREEN_WIDTH, SCREEN_HEIGHT).start();
    startBtn.style.display = "none";
}
