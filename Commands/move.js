commandsFun["move"] = function (data, socket, game, callback) {
	if (socket.user != undefined)  {
		var user = socket.user;
		if (data[0] == "N") {
			if (user.y -1 >= 0) {
				user.y -= 1;
				socket.emit("mapPoss",(user.x + (user.y*25)));
				callback("#green:you moved North#");
			}else{
				outOffBounce(callback);
			}
		}else if (data[0] == "S") {
			if (user.y +1 < 25) {
				user.y += 1;
				socket.emit("mapPoss",(user.x + (user.y*25)));
				callback("#green:you moved South#");
			}else{
				outOffBounce(callback);
			}
		}else if (data[0] == "E") {
			if (user.x +1 < 25) {
				user.y += 1;
				socket.emit("mapPoss",(user.x + (user.y*25)));
				callback("#green:you moved East#");
			}else{
				outOffBounce(callback);
			}
		}else if (data[0] == "W") {
			if (user.x -1 >= 0) {
				user.x -= 1;
				socket.emit("mapPoss",(user.x + (user.y*25)));
				callback("#green:you moved West#");
			}else{
				outOffBounce(callback);
			}
		}else {
			callback("#red:that is not a way.# you can use N,S,E,W");
		}
	}else{
		callback("#red: login first#");
	}
};
function outOffBounce(callback){
	callback("#red:you cant go that way#, you hit a wall")
}