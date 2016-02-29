commandsFun["help"] = function (data, socket, game, callback) {
	if(data.length == 0){
		callback("help commands is comming soon");
	}else if (commandsFun[data[0]] != undefined) {
		var cmd = data[0];
		data[0] = "help";
		commandsFun[cmd](data, socket, game, callback);
	}else{
		callback("#red:no help Command like that#");
	}
}