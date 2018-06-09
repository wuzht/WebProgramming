/*
* Homework 6 - Games - Maze
* maze.js
* Name: wuzht
* Start date: 2017-11-3
* Last edit date: 2017-11-4
*/

(function() {
	var isStart = false;
	var isLose = false;
	var isCheat = false;
    var wallsArr = document.getElementsByClassName("walls");

	window.onload = function() {
        document.getElementById("start").addEventListener("mouseover", gameStart);
        document.getElementById("end").addEventListener("mouseover", gameWin);
	    for (var i = 0; i < wallsArr.length; i++) {
	        wallsArr[i].addEventListener("mouseover", gameLose);
	    }
	    document.getElementById("game-zone").addEventListener("mouseout", cursorOut);
    };

    function reset() {
    	isStart = false;
    	isLose = false;
    	isCheat = false;
    }

    function cursorOut(event) {
    	var div = document.getElementById("game-zone");
    	var x = event.clientX;
    	var y = event.clientY;
    	var divx1 = div.offsetLeft;
    	var divy1 = div.offsetTop;
    	var divx2 = div.offsetLeft + div.offsetWidth;
    	var divy2 = div.offsetTop + div.offsetHeight;
    	if ((x < divx1 || x > divx2 || y < divy1 || y > divy2) && isStart == true) {
    		isCheat = true;
    	}
    }

    function gameStart() {
    	reset();
    	isStart = true;
        for (var i = 0; i < wallsArr.length; i++) {
            wallsArr[i].className = "walls wallsAfterStart";
        }
    	cursorHandler(0);
    	document.getElementById("game-state").innerText = "";
    }

    function gameLose() {
    	if (isStart == true && isCheat == false) {
    		document.getElementById("game-state").innerText = "You Lose";
    		cursorHandler(1);
    		reset();
    	}
    }

    function gameWin() {
    	if (isStart == true && isLose == false && isCheat == false) {
    		document.getElementById("game-state").innerText = "You Win";
    		reset();
    	}
    	else if (isStart == true && isLose == false && isCheat == true) {
    		document.getElementById("game-state").innerText = "Don't cheat, you should start from 'S' and move to the 'E' inside the maze!";
    		reset();
    	}
    }
    
	function cursorHandler(cursorType) {
		switch(cursorType) {
			case 0:
				document.getElementById("game-zone").className = "cursorHand";
				break;
			case 1:
				document.getElementById("game-zone").className = "cursorDefault";
				break;
		}
	}
})();