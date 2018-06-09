/*
* Homework 7 - Fifteen Puzzle
* FifteenPuzzle.js
* Name: wuzht
* Start date: 2017-11-17
* Last edit date: 2017-11-18
*/
var isGameStart = false;
var isShowPic = false;
var isShowNum = false;
var steps = 0;
var pos = [];
var gameMin = 0;
var gameSec = 0;
var int = 0;
for (var i = 1; i <= 16; i++) {
	pos[i] = i;
}

$(function(){
	creatPuzzle();
	$("#restart-btn").click(restartGame);
	$("#show-num-btn").click(function() {
		if (!isShowNum){
			isShowNum = true;
			for (var i = 1; i <= 16; i++)
				$("#grid"+i).html(i);
		}
		else {
			isShowNum = false;
			for (var i = 1; i <= 16; i++)
				$("#grid"+i).html("");
		}
	});
	$("#origin-pic-btn").click(function() {
		if (!isShowPic) {
			isShowPic = true;
			$("#origin-pic").attr("class", "show-origin-pic");
		}
		else {
			isShowPic = false;
			$("#origin-pic").attr("class", "");
		}
	});
});

function gameTimer() {
	if (isGameStart) {
		var timeStr = "";
		if (gameMin < 10) timeStr += "0";
		if (gameMin == 0) timeStr += "0";
		else timeStr += gameMin;
		timeStr += ":";
		if (gameSec < 10) timeStr += "0";
		if (gameSec == 0) timeStr += "0";
		else timeStr += gameSec;
		$("#myTime").html(timeStr);
		gameSec++;
		if (gameSec >= 60) {
			gameMin++;
			gameSec = 0;
		}
	}
}

function creatPuzzle() {
	for (var i = 1; i <= 15; ++i) {
		var grid = document.createElement("div");
		grid.className = "grid puzzle-grid pos" + i;
		grid.id = "grid" + i;
		// grid.innerText = "" + i;
		(function(i) {
    		grid.onclick = function() {
        		move(i);
        	};
    	})(i);
		$("#game-block").append(grid);
	}
	$("#game-block").append("<div class=\"grid empty-grid pos16\" id=\"grid16\"></div>");
	$("#grid16").hide();
}

function isArrValid(arr) {
	var count = 0;
	for (var i = 0; i < 16; i++) {
		for (var j = i + 1; j < 16; j++) {
			if (arr[j] < arr[i])
				count++;
		}
	}
	if (arr[15] == 2 || arr[15] == 4 || arr[15] == 5 || arr[15] == 7 || arr[15] == 10 || arr[15] == 12 || arr[15] == 13 || arr[15] == 15)
		count++;
	return count % 2 == 0;
}

function generateRandomPos() {
	var arr = [];
	for (var i = 0; i < 16; i++)
		arr[i] = i + 1;
	arr.sort(function() {
		return Math.random() - 0.5;
	});
	while (!isArrValid(arr)) {
		for (var i = 0; i < 16; i++)
			arr[i] = i + 1;
		arr.sort(function() {
			return Math.random() - 0.5;
		});
	}
	for (var i = 0; i < 16; i++)
		pos[i + 1] = arr[i];
}


function restartGame() {
	isGameStart = true;
	steps = 0;
	gameMin = 0;
	gameSec = 0;
	window.clearInterval(int);
	gameTimer();
	int = setInterval(gameTimer, 1000);
	$("#game-state").html("游戏中");
	$("#restart-btn").html("重新开始");
	$("#game-steps").html("步数：" + steps); 
	generateRandomPos();
	for (var i = 1; i <= 15; i++) {
		$("#grid"+i).attr("class", "grid puzzle-grid pos" + pos[i]);
	}
	$("#grid16").attr("class", "grid empty-grid pos" + pos[16]);
}

function isNextToEmpty(thisGridPos) {
	return (pos[16] - 4 == thisGridPos) ||
		   (pos[16] + 4 == thisGridPos) ||
		   (pos[16] - 1 == thisGridPos && thisGridPos % 4 != 0) ||
		   (pos[16] + 1 == thisGridPos && thisGridPos % 4 != 1);
}

function move(thisGridNum) {
	if (isGameStart && isNextToEmpty(pos[thisGridNum])) {
		$("#grid"+thisGridNum).attr("class", "grid puzzle-grid pos" + pos[16]);
		$("#grid16").attr("class", "grid empty-grid pos" + pos[thisGridNum]);
		var temp = pos[16];
		pos[16] = pos[thisGridNum];
		pos[thisGridNum] = temp;
		steps++;
		$("#game-steps").html("步数：" + steps); 
		checkIfWin();	
	}
}

function checkIfWin() {
	for (var i = 1; i <= 16; i++) {
		if (pos[i] != i)
			return;
	}
	$("#game-state").html("恭喜您赢了！大吉大利！今晚吃鸡！");
	isGameStart = false;
	window.clearInterval(int);
}