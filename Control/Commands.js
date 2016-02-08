commandsFun = {};
var normalizedPath = require("path").join(__dirname, "../Commands");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./../Commands/" + file);
});

module.exports = function (command, socket, game, callback) {
	var args = command.split(" ");
	var cmd = args[0];
	args.shift();
	if (commandsFun[cmd] != undefined) {
		commandsFun[cmd](args, socket, game, callback);
	}else{
		callback("#red:no Command like that#");
	}
	return;
}