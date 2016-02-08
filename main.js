//the maps.. auto load all js files in map
/*var normalizedPath = require("path").join(__dirname, "map");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./map/" + file);
});*/

var Commands = require('./Control/Commands');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = 3000;
var users = [];
var game = {
	users: []
}
console.log("starter server on port "+port);
server.listen(port);
app.use("/site/", express.static(__dirname + '/site/'));
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/site/index.html');
});
io.sockets.on('connection', function (socket) {
	console.log("New connection");
	
	socket.on('ping', function() {
	    socket.emit('pong');
	});

	socket.on('command', function(data, callback) {
		console.log("do command");
		var hold = new Commands(data, socket, game, callback);
	});

	socket.on('disconnect', function(){
    	
	});
});