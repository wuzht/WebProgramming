/*
* Homework 9 - Signup
* index.js
* Name: wuzht
* Start date: 2017-11-30
* Last edit date: 2017-12-2
*/

var http = require("http");
var url = require('url');
var querystring = require('querystring');
var swig = require('swig');
var fs = require('fs');
var PORT = 8000;
var users = {};

var server = http.createServer(function(request, response) {
	switch(request.url) {
		case '/style/signup.css': 
			sendFile(response, 'style/signup.css', 'text/css'); break;
		case '/style/detail.css': 
			sendFile(response, 'style/detail.css', 'text/css'); break;
		case '/clientSideValidator.js': 
			sendFile(response, 'clientSideValidator.js', 'text/javascript'); break;
		case '/jquery/jquery-3.2.1.min.js': 
			sendFile(response, 'jquery/jquery-3.2.1.min.js', 'text/javascript'); break;
		default:
			if (request.method === 'POST')
				registUser(request, response);
			else
				sendPage(request, response);
	}
});
server.listen(PORT);
console.log("Server is listening");
console.log("Available on: \n  http://localhost: " + PORT);
console.log("Hit CTRL-C to stop the server");

function sendFile(response, path, type) {
	response.writeHead(200, {"Content-Type": type});
	response.end(fs.readFileSync(path));
}

function registUser(request, response) {
	request.on('data', function(chunk) {
		try {
			var user = getUser(chunk.toString());
			validateUser(user);
			console.log("A new user has registed: ", user);
			users[user.username] = user;
			response.writeHead(301, {Location: '?username=' + user.username});
			response.end();
		}
		catch (error) {
			console.log("Error: ", error.message);
			sendSignupPage(response, user, error.message);
		}
	});
}

function getUser(myStr) {
	myStr = myStr.replace(/%40/, "@");
	var temp = myStr.match(/username=(.+)&stuId=(.+)&phone=(.+)&email=(.+)/);
	var user = {username: temp[1], stuId: temp[2], phone: temp[3], email: temp[4]};
	return user;
}

function sendPage(request, response) {
	var urlQuery = url.parse(request.url).query;
	var username = querystring.parse(urlQuery).username;
	if (!username || !users[username])
		sendSignupPage(response, null, null);
	else
		sendDetialPage(response, users[username]);
}

function sendSignupPage(response, user, error) {
	var signup = swig.compileFile("signup.html");
	var renderHtml = signup({
		user: user,
		errorMessages: error
	});
	response.writeHead(200, {"Content-Type": "text/html"});
	response.end(renderHtml);
}

function sendDetialPage(response, user) {
	var detail = swig.compileFile("detail.html");
	var renderHtml = detail({
		username: user.username,
		stuId: user.stuId,
		phone: user.phone,
		email: user.email
	});
	response.writeHead(200, {"Content-Type": "text/html"});
	response.end(renderHtml);
}

//validate in server side
function validateUser(user) {
	var errMsgs = [];
	if (!/^[a-zA-z][a-zA-z0-9_]{5,17}$/.test(user.username))
		errMsgs.push("\u2718用户名6~18位英文字母、数字或下划线，必须以英文字母开头");
	if (!/^[1-9]\d{7}$/.test(user.stuId))
		errMsgs.push("\u2718学号8位数字，不能以0开头");
	if (!/^[1-9]\d{10}$/.test(user.phone))
		errMsgs.push("\u2718电话11位数字，不能以0开头");
	if (!/^[a-zA-z0-9_\-]+\@([a-zA-z0-9_\-]+\.)+[a-zA-z]{2,4}$/.test(user.email))
		errMsgs.push("\u2718请输入合法邮箱");
	for (var key in user) {
		if (!isKeyUnique(user, key)) {
			var myMsg = "";
			switch (key) {
				case 'username': myMsg += "用户名"; break;
				case 'stuId': myMsg += "学号"; break;
				case 'phone': myMsg += "电话"; break;
				case 'email': myMsg += "邮箱"; break;
			}
			myMsg += user[key] + "已被注册";
			errMsgs.push(myMsg);
		}
	}
	if (errMsgs.length > 0)
		throw new Error(errMsgs.join('<br>\n'));
}

function isKeyUnique(user, key) {
	for (var i in users) {
		if (users[i][key] == user[key])
			return false;
	}
	return true;
}