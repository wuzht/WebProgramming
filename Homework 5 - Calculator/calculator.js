/*
 * Homework 5 - Calculator
 * calculator.js
 * Name: wuzht
 * Start date: 2017-10-17
 * Last edit date: 2017-10-21
 */
var screenContent = "";
var outcome = "0";
var flag = false;

window.onload = function(){
    var numbersArr = document.getElementsByClassName("digit");
    for (var i = 0; i < numbersArr.length; i++) {
        numbersArr[i].onclick = numClick;
    }
    document.getElementById("plus").onclick = function() {
        calOperators(3);
    }
    document.getElementById("subtract").onclick = function() {
        calOperators(2);
    }
    document.getElementById("times").onclick = function() {
        calOperators(1);
    }
    document.getElementById("divide").onclick = function() {
        calOperators(0);
    }
    document.getElementById("equal").onclick = calEqual;
    document.getElementById("decimal-point").onclick = decimalPoint;
    document.getElementById("back-space").onclick = backSpace;
    document.getElementById("clear-entry").onclick = clearEntry;
    document.getElementById("left-backet").onclick = leftBacket;
    document.getElementById("right-backet").onclick = rightBacket;
};

function calShow() {
    document.getElementById("expression").textContent = screenContent;
}

function calShowOutcome() {
    var len = outcome.length;
    if (len <= 10) 
    	document.getElementById("outcome").style.fontSize = 25 + 'pt';
    else 
    	document.getElementById("outcome").style.fontSize = 250 / len + 'pt';
    document.getElementById("outcome").textContent = outcome;
}

function numClick() {
    if (flag) {
        screenContent = "";
        outcome = "0";
        calShowOutcome();
        flag = false;
    }
    var lastLetter = screenContent.charAt(screenContent.length - 1);
    if (lastLetter == ")")
        return;
    if (screenContent.length == 1 && lastLetter == "0")
        return;
    if (screenContent.length > 1) {
        var secondLastLetter = screenContent.charAt(screenContent.length - 2);
        if (isNaN(secondLastLetter) && secondLastLetter != "." && lastLetter == "0")
            return;
    }
    var num = this.textContent;
    screenContent += num;
    calShow();
}

function calOperators(operatorNum) {
    flag = false;
    if (screenContent.length == 0) 
    	return;
    var lastLetter = screenContent.charAt(screenContent.length - 1);
    if (lastLetter == ".")
        return;
    var lastLetter = screenContent.charAt(screenContent.length - 1);
    if (lastLetter == "+" || lastLetter == "-" || lastLetter == "*" || lastLetter == "/") 
    	screenContent = screenContent.substring(0, screenContent.length - 1);
    if (operatorNum == 3) 
        screenContent += "+";
    else if (operatorNum == 2) 
    	screenContent += "-";
    else if (operatorNum == 1) 
    	screenContent += "*";
    else if (operatorNum == 0) 
    	screenContent += "/";
    calShow();
}

function decimalPoint() {
    if (flag) {
        screenContent = "";
        outcome = "0";
        calShowOutcome();
        flag = false;
    }
    var now = screenContent;
    for (var i = screenContent.length - 1; i >= 0; i--) {
        if (isNaN(screenContent[i]) && screenContent[i] != ".") {
            now = screenContent.substring(i+1);
            break;
        }
    }
    for (var i = 0; i < now.length; i++) {
        if (now[i] == ".")
            return;
    }
    var lastLetter = screenContent.charAt(screenContent.length - 1);
    if (lastLetter == ".") 
        return;
    if (isNaN(lastLetter) || screenContent.length == 0) 
    	screenContent += "0.";
    else 
    	screenContent += ".";
    calShow();
}

function leftBacket() {
    if (flag) {
        screenContent = "";
        outcome = "0";
        calShowOutcome();
        flag = false;
    }
    if (screenContent.length >= 1) {
        var lastLetter = screenContent.charAt(screenContent.length - 1);
        if (lastLetter == ".")
            return;
        if (!isNaN(lastLetter) || lastLetter == ")")
            screenContent += "*";
    }
    screenContent += "(";
    calShow();
}

function rightBacket() {
    if (screenContent.length == 0 || flag)
        return;
    var lastLetter = screenContent.charAt(screenContent.length - 1);
    if (isNaN(lastLetter) && lastLetter != ")")
        return;
    screenContent += ")";
    calShow();
}

function calEqual() {
    try {
        if (screenContent == "")
            return;
        var lastLetter = screenContent.charAt(screenContent.length - 1);
        if (isNaN(lastLetter) && lastLetter != ")")
            return;
        flag = true;
        outcome = parseFloat(eval(screenContent).toFixed(15));
        outcome += "";
        calShowOutcome();
    } 
    catch (exception) {
        alert(exception);
        flag = false;
    }
}

function clearEntry() {
    flag = false;
    screenContent = "";
    outcome = "0";
    calShow();
    calShowOutcome();
}

function backSpace() {
    flag = false;
    if (screenContent.length >= 1) 
    	screenContent = screenContent.substring(0, screenContent.length - 1);
    calShow();
}