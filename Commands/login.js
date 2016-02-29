var mysql = require('./../Database/database');
var userObj = require('./../Model/user');
commandsFun["login"] = function (data, socket, game, callback) {
	if(data[0] == "help"){
		callback("login help cmd call");
	}else if (socket.user != undefined) {
		callback("#red:you are allreay login as# #green:"+socket.user.name+"#")
	}else{
		if (data.length > 1) {
			mysql.query("SELECT * FROM `user`, `skills` WHERE `user`.`ID` = `skills`.`userid` AND  `user`.`name` = \""+data[0]+"\" AND `user`.`pass` = \""+data[1]+"\"", function(user){
				if (user.length <= 0) {
					callback("#red:Login fail#");
				}else{
					var newUserObj = new userObj(user[0], socket);
					socket.user = newUserObj;
					game.users.add(newUserObj);
					callback("#green:Welcommen to "+ newUserObj.name +"#");
					socket.emit("mapPoss",(newUserObj.x + (newUserObj.y*25)));
					socket.emit("skills", newUserObj.skills.toClient());
				}
			}); 
		}
		else{
			callback("#red:Login metod faild. use 'username password'#");
		}
	}
}