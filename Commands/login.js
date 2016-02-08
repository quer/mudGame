var mysql = require('./../Database/database');
var skills = require('./../Model/skills');
commandsFun["login"] = function (data, socket, game, callback) {
	if (socket.user != undefined) {
		callback("#red:you are allreay login as# #green:"+socket.user.name+"#")
	}else{
		if (data.length > 1) {
			mysql.query("SELECT * FROM `user`, `skills` WHERE `user`.`ID` = `skills`.`userid` AND  `user`.`name` = \""+data[0]+"\" AND `user`.`pass` = \""+data[1]+"\"", function(user){
				if (user.length <= 0) {
					callback("#red:Login fail#");
				}else{
					var skill = new skills(user[0]);
					var userObj = {
						"name": user[0].name,
						"id": user[0].id,
						"x": user[0].x,
						"y": user[0].y,
						"skills": skill,
						"socket": socket
					}
					socket.user = userObj;
					game.users.push(userObj);
					callback("#green:Welcommen to "+ userObj.name +"#");
					socket.emit("mapPoss",(user[0].x + (user[0].y*25)));
					socket.emit("skills", skill.toClient());
				}
			}); 
		}
		else{
			callback("#red:Login metod faild. use 'username password'#");
		}
	}
}
console.log("login file");
console.log(commandsFun);