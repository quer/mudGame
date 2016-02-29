commandsFun["get"] = function (data, socket, game, callback) {
	if (data[0] == "map") {
		if (data[1] == "users") {
			returnText = "Logon Users---";
			for (var i = 0; i < game.users.users.length; i++) {
				var user = game.users.users[i];
				if (i != 0) {
					returnText += "|";
				};
				returnText += "#blue:"+user.name+"# - - #Goldenrod:"+user.skills.Gold+"#";
			};
			callback(returnText);
		}else if (data[1] == "npcs") {
			returnText = "All Npcs---";
			for (var i = 0; i < game.npcs.npcs.length; i++) {
				var npc = game.npcs.npcs[i];
				if (i != 0) {
					returnText += "|";
				};
				
				returnText += "#blue:"+npc.name+"# - - #blue:x#"+npc.x+" - #blue:y#"+npc.y+"";
			};
			callback(returnText);
		};	
	}else if (data[0] == "slot") {
		returnText = "Users on your tile---";
		for (var i = 0; i < game.users.users.length; i++) {
			var user = game.users.users[i];
			if(user.x == socket.user.x && user.y == socket.user.y){
				if (i != 0) {
					returnText += "|";
				};
				returnText += "#blue:"+user.name+"# - - #Goldenrod:"+user.skills.Gold+"#";
			}
		};
		callback(returnText);
	}else if(data[0] == "help"){
		callback("get help cmd call");
	}
	callback("no get command like that");
};
