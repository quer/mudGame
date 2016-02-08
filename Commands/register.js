var mysql = require('./../Database/database');
commandsFun["register"] = function (data, socket, game, callback) {
	if (socket.user != undefined ) {
		callback("#red:You allready have a user#");
	}else{
		if (data.length > 1) {
			mysql.query("SELECT * FROM `user` WHERE `user`.`name` = \""+data[0]+"\"", function(user){
				if (user.length > 0) {
					callback("#red:Username allready used");
				}else{
					mysql.query("INSERT INTO `user`(`name`, `pass`) VALUES ('"+data[0]+"','"+data[1]+"')", function (insertData) {
						var userId = insertData.insertId;
						mysql.query("INSERT INTO `skills`(`userid`) VALUES ('"+userId+"')", function (respons) {
							if (respons.insertId) {
								callback("#green:You can now login#");
							}else{
								callback("#red:somfing whent wong in the query#");
							}
						});		
					});
				}
			})
		}else{
			callback("#red:register username password#");
		}
	}
}