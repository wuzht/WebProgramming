/*
* Homework 9 - Signup
* clientSideValidator.js
* Name: wuzht
* Start date: 2017-11-30
* Last edit date: 2017-12-2
*/

$(function() {
	$("#username").blur(function() {
		if (!isUsernameValid($(this).val())) {
			$("#error-username").css("color", "red");
			$("#error-username").html("\u2718用户名6~18位英文字母、数字或下划线，必须以英文字母开头");
		}
		else {
			$("#error-username").css("color", "#00FF00");
			$("#error-username").html("\u2714");
		}
	});
	$("#stuId").blur(function() {
		if (!isStuIdValid($(this).val())) {
			$("#error-stuId").css("color", "red");
			$("#error-stuId").html("\u2718学号8位数字，不能以0开头");
		}
		else {
			$("#error-stuId").css("color", "#00FF00");
			$("#error-stuId").html("\u2714");
		}
	});
	$("#phone").blur(function() {
		if (!isPhoneValid($(this).val())) {
			$("#error-phone").css("color", "red");
			$("#error-phone").html("\u2718电话11位数字，不能以0开头");
		}
		else {
			$("#error-phone").css("color", "#00FF00");
			$("#error-phone").html("\u2714");
		}
	});
	$("#email").blur(function() {
		if (!isEmailValid($(this).val())) {
			$("#error-email").css("color", "red");
			$("#error-email").html("\u2718请输入合法邮箱");
		}
		else {
			$("#error-email").css("color", "#00FF00");
			$("#error-email").html("\u2714");
		}
	});
	$("#hand-in").click(function() {
		$(".text-input").blur();
		if (!isAllValid())
			return false;
	});
	$("#clear").click(function() {
		$(".text-input").attr("value", "");
		$(".error-info").html("");
	});
});

function isUsernameValid(username) {
	return /^[a-zA-z][a-zA-z0-9_]{5,17}$/.test(username);
}

function isStuIdValid(stuId) {
	return /^[1-9]\d{7}$/.test(stuId);
}

function isPhoneValid(phone) {
	return /^[1-9]\d{10}$/.test(phone);
}

function isEmailValid(email) {
	return /^[a-zA-z0-9_\-]+\@([a-zA-z0-9_\-]+\.)+[a-zA-z]{2,4}$/.test(email);
}

function isAllValid() {
	return isUsernameValid($("#username").val()) &&
		   isStuIdValid($("#stuId").val()) &&
		   isPhoneValid($("#phone").val()) &&
		   isEmailValid($("#email").val());
}