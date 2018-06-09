/*
* Homework 6 - Games - Mole
* mole.js
* Name: wuzht
* Start date: 2017-11-3
* Last edit date: 2017-11-4
*/

(function() {
    var rdbtns = document.getElementsByClassName('radio-button');
    var isChecked = [];
    var count = 30;
    var score = 0;
    var isStartGame = false;
    var isOnGame = false;
    
    window.onload = function() {
        document.getElementById('start-button').addEventListener("click", startOrStopGame);
        for (var index = 0; index < rdbtns.length; index++) {
        	(function(index) {
        		rdbtns[index].onclick = function() {
            		handleClick(index);
            	};
        	})(index);
        }
        for (var i = 0; i < 60; i++) {
        	isChecked[i] = false;
        }
        
    };

    function generateMole() {
    	var nextMole = parseInt(59 * Math.random());
    	rdbtns[nextMole].checked = true;
    	isChecked[nextMole] = true;
    }

    function handleClick(index) {
    	if (!isStartGame)
    		rdbtns[index].checked = false;
    	else if (!isOnGame && isChecked[index] == false)
    		rdbtns[index].checked = false;
    	else if (isOnGame) {
    		rdbtns[index].checked = false;
	        if (isChecked[index] == true) {
	        	score++;
	        	document.getElementById('score').innerText = score;
	            isChecked[index] = false;
	            generateMole();
	        }
	        else {
	        	score--;
	        	document.getElementById('score').innerText = score;
	        }
    	}
    }

    function startOrStopGame() {
    	if (!isStartGame) {
    		generateMole();
    		isStartGame = true;
    		isOnGame = false;
    		count = 30;
    		score = 0;
    		document.getElementById('time').innerText = count;
    		document.getElementById('score').innerText = score;
    		document.getElementById('game-state').innerText = "Playing";
    	}
    	if (!isOnGame) {
    		isOnGame = true;
    		gameTimer();
    		document.getElementById('game-state').innerText = "Playing"
    	}
    	else {
    		document.getElementById('game-state').innerText = "Playing & Pausing";
    		isOnGame = false;
    	}
    }

    function gameTimer() {
    	if (isOnGame && count >= 0) {
    		document.getElementById('time').innerText = count;
	        count--;
	        if (count < 0) {
	    		document.getElementById('game-state').innerText = "Game Over";
    			isStartGame = false;
    			isOnGame = false;
    			for (var i = 0; i < rdbtns.length; i++) {
    				rdbtns[i].checked = false;
    				isChecked[i] = false;
    			}
    			var outCome = "Game Over,\nYour score is: " + score;
    			setTimeout(function(){ 
					alert(outCome); 
				}, 1); 
    			return;
	    	}
	        setTimeout(function() {
	        	gameTimer();
	        }, 1000);
    	}
    }   
})();