/*
* Homework 10 - Asynchronous JavaScript - S5
* index.js
* Name: wuzht
* Start date: 2017-12-8
* Last edit date: 2017-12-9
*/

$(function() {
	$(".apb").css("cursor", "pointer");
	$(".apb").bind('click', apbAutoClick);
	$(".unread").hide();
	$(".button").bind('click', buttonOnClick);
});

function apbAutoClick() {
	$(".apb").unbind();
	$(".apb").css("cursor", "default");

	var order = new Array('C','A','E','D','B');
	order.sort(function(a, b) {
		return Math.random() - 0.5;
	});
	var orderStr = "(";
	for (var i = 0; i < order.length; i++) {
		orderStr += order[i];
		if (i != order.length - 1)
			orderStr += ", ";
	}
	orderStr += ")";
	$("#order").html(orderStr);

	var handlers = {
		A: aHandler,
		B: bHandler,
		C: cHandler,
		D: dHandler,
		E: eHandler
	};
	var i = 0;
	function autoRobot(message, sum){
		if (message)
			$("#message").append(message + "<br />");
		if (i < 5)
			handlers[order[i++]](sum, autoRobot);
		else
			bubbleHandler(sum);
	}
	autoRobot(null, 0);
}

function aHandler(currentSum, callback) {
	var thisButton = $("#btnA");
	var otherButtons = $('.button').not("#btnA");
	var unread = $("#btnA").find(".unread");
	thisButton.unbind('click');
	disableButton(otherButtons);
	unread.show();
	var request = $.get("http://localhost:3000", function(data) {
		if (Math.round(Math.random())) {
			thisButton.css("background-color", "#666666").css("cursor", "default");
			thisButton.addClass("hasGotNum");
			callback("A: 这不是个天大的秘密", currentSum);
		}
		else {
			console.log(data);
			unread.html(data);
			thisButton.css("background-color", "#666666").css("cursor", "default");
			thisButton.addClass("hasGotNum");
			enableButton(otherButtons);
			if (canSum()) {
				$("#info-bar").css("background-color", "rgba(48, 63, 159, 1)").css("cursor", "pointer");
				$("#info-bar").bind('click', sum);
			}
			$("#message").append("A: 这是个天大的秘密" + "<br />");
			callback(null, parseInt(currentSum) + parseInt(data));
		}
	});
	$("#button").unbind('mouseleave');
	$("#button").bind('mouseleave', function() {
		reset();
		if (request)
			request.abort();
	});
}

function bHandler(currentSum, callback) {
	var thisButton = $("#btnB");
	var otherButtons = $('.button').not("#btnB");
	var unread = $("#btnB").find(".unread");
	thisButton.unbind('click');
	disableButton(otherButtons);
	unread.show();
	var request = $.get("http://localhost:3000", function(data) {
		if (Math.round(Math.random())) {
			thisButton.css("background-color", "#666666").css("cursor", "default");
			thisButton.addClass("hasGotNum");
			callback("B: 我知道", currentSum);
		}
		else {
			console.log(data);
			unread.html(data);
			thisButton.css("background-color", "#666666").css("cursor", "default");
			thisButton.addClass("hasGotNum");
			enableButton(otherButtons);
			if (canSum()) {
				$("#info-bar").css("background-color", "rgba(48, 63, 159, 1)").css("cursor", "pointer");
				$("#info-bar").bind('click', sum);
			}
			$("#message").append("B: 我不知道" + "<br />");
			callback(null, parseInt(currentSum) + parseInt(data));
		}
	});
	$("#button").unbind('mouseleave');
	$("#button").bind('mouseleave', function() {
		reset();
		if (request)
			request.abort();
	});
}

function cHandler(currentSum, callback) {
	var thisButton = $("#btnC");
	var otherButtons = $('.button').not("#btnC");
	var unread = $("#btnC").find(".unread");
	thisButton.unbind('click');
	disableButton(otherButtons);
	unread.show();
	var request = $.get("http://localhost:3000", function(data) {
		if (Math.round(Math.random())) {
			thisButton.css("background-color", "#666666").css("cursor", "default");
			thisButton.addClass("hasGotNum");
			callback("C: 你知道", currentSum);
		}
		else {
			console.log(data);
			unread.html(data);
			thisButton.css("background-color", "#666666").css("cursor", "default");
			thisButton.addClass("hasGotNum");
			enableButton(otherButtons);
			if (canSum()) {
				$("#info-bar").css("background-color", "rgba(48, 63, 159, 1)").css("cursor", "pointer");
				$("#info-bar").bind('click', sum);
			}
			$("#message").append("C: 你不知道" + "<br />");
			callback(null, parseInt(currentSum) + parseInt(data));
		}
	});
	$("#button").unbind('mouseleave');
	$("#button").bind('mouseleave', function() {
		reset();
		if (request)
			request.abort();
	});
}

function dHandler(currentSum, callback) {
	var thisButton = $("#btnD");
	var otherButtons = $('.button').not("#btnD");
	var unread = $("#btnD").find(".unread");
	thisButton.unbind('click');
	disableButton(otherButtons);
	unread.show();
	var request = $.get("http://localhost:3000", function(data) {
		if (Math.round(Math.random())) {
			thisButton.css("background-color", "#666666").css("cursor", "default");
			thisButton.addClass("hasGotNum");
			callback("D: 他知道", currentSum);
		}
		else {
			console.log(data);
			unread.html(data);
			thisButton.css("background-color", "#666666").css("cursor", "default");
			thisButton.addClass("hasGotNum");
			enableButton(otherButtons);
			if (canSum()) {
				$("#info-bar").css("background-color", "rgba(48, 63, 159, 1)").css("cursor", "pointer");
				$("#info-bar").bind('click', sum);
			}
			$("#message").append("D: 他不知道" + "<br />");
			callback(null, parseInt(currentSum) + parseInt(data));
		}
	});
	$("#button").unbind('mouseleave');
	$("#button").bind('mouseleave', function() {
		reset();
		if (request)
			request.abort();
	});
}

function eHandler(currentSum, callback) {
	var thisButton = $("#btnE");
	var otherButtons = $('.button').not("#btnE");
	var unread = $("#btnE").find(".unread");
	thisButton.unbind('click');
	disableButton(otherButtons);
	unread.show();
	var request = $.get("http://localhost:3000", function(data) {
		if (Math.round(Math.random())) {
			thisButton.css("background-color", "#666666").css("cursor", "default");
			thisButton.addClass("hasGotNum");
			callback("E: 才不怪", currentSum);
		}
		else {
			console.log(data);
			unread.html(data);
			thisButton.css("background-color", "#666666").css("cursor", "default");
			thisButton.addClass("hasGotNum");
			enableButton(otherButtons);
			if (canSum()) {
				$("#info-bar").css("background-color", "rgba(48, 63, 159, 1)").css("cursor", "pointer");
				$("#info-bar").bind('click', sum);
			}
			$("#message").append("E: 才怪" + "<br />");
			callback(null, parseInt(currentSum) + parseInt(data));
		}
	});
	$("#button").unbind('mouseleave');
	$("#button").bind('mouseleave', function() {
		reset();
		if (request)
			request.abort();
	});
}

function bubbleHandler(sum){
	$("#message").append("大气泡：楼主异步调用战斗力感人，目测不超过" + sum + "<br />");
	$("#sum").hide().html(sum);
	$("#sum").fadeIn();
	$("#info-bar").unbind('click');
	$("#info-bar").css("background-color", "gray").css("cursor", "default");
}

function buttonOnClick() {
	var thisButton = $(this);
	var otherButtons = $('.button').not(this);
	var unread = $(this).find(".unread");

	thisButton.unbind('click');
	disableButton(otherButtons);
	unread.show();
	
	var request = $.get("http://localhost:3000", function(data) {
		console.log(data);
		unread.html(data);
		thisButton.css("background-color", "#666666").css("cursor", "default");
		thisButton.addClass("hasGotNum");
		enableButton(otherButtons);

		if (canSum()) {
			$("#info-bar").css("background-color", "rgba(48, 63, 159, 1)").css("cursor", "pointer");
			$("#info-bar").bind('click', sum);
		}
	});

	$("#button").unbind('mouseleave');
	$("#button").bind('mouseleave', function() {
		reset();
		if (request)
			request.abort();
	});
}

function sum() {
	var amount = 0;
	$(".unread").each(function() {
		amount += parseInt($(this).html());
	});
	$("#sum").hide().html(amount);
	$("#sum").fadeIn();
	$("#info-bar").unbind('click');
	$("#info-bar").css("background-color", "gray").css("cursor", "default");
}

function reset() {
	$("#message").html("");
	$("#order").html("");
	$(".apb").unbind();
	$(".apb").bind('click', apbAutoClick);
	$(".apb").css("cursor", "pointer");

	$(".unread").hide();
	$(".unread").html("...");
	$(".button").unbind('click');
	$(".button").bind('click', buttonOnClick);
	$(".button").removeClass("hasGotNum");
	$(".button").css("background-color", "rgba(48, 63, 159, 1)").css("cursor", "pointer");
	$("#info-bar").unbind('click');
	$("#info-bar").css("background-color", "gray").css("cursor", "default");
	$("#sum").html("");
}

function disableButton(button) {
	button.unbind('click');
	button.css("background-color", "#666666").css("cursor", "default");
}

function enableButton(button) {
	var toDo = button.not(".hasGotNum");
	toDo.unbind('click');
	toDo.bind('click', buttonOnClick);
	toDo.css("background-color", "rgba(48, 63, 159, 1)").css("cursor", "pointer");
}

function canSum() {
	return $(".button").not(".hasGotNum").length == 0;
}