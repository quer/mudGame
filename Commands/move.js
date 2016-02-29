commandsFun["move"] = function (data, socket, game, callback) {
	if (socket.user != undefined)  {
		if (data[0] == "N") {
			moveTo (socket, 0, -1, "North", callback);
		}else if (data[0] == "S") {
			moveTo (socket, 0, +1, "South", callback);
		}else if (data[0] == "E") {
			moveTo (socket, +1, 0, "East", callback);
		}else if (data[0] == "W") {
			moveTo (socket, -1, 0, "West", callback);
		}else if(data[0] == "help"){
			callback("move help cmd call");
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
function moveTo (socket, x, y, way, callback) {
	var user = socket.user;
	if (user.x + x >= 0 && user.x + x < 25 && user.y + y >= 0 && user.y + y < 25) {
		if (!waterCollision(user.x + x, user.y + y)) {
			user.x += x;
			user.y += y;
			socket.emit("mapPoss",(user.x + (user.y*25)));
			callback("#green:you moved "+ way +"#");
		}else{
			callback("#red:You cant wark in water");
		}
	}else{
		outOffBounce(callback);
	}
}
function waterCollision (x,y) {
	var waterCollision = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,49,50,51,74,75,76,99,100,121,122,123,124,125,133,134,145,146,149,150,157,158,159,168,170,174,175,182,191,192,193,199,200,205,206,207,215,216,224,225,240,241,242,243,249,250,255,265,266,267,268,274,275,280,290,299,300,305,324,325,330,340,349,350,351,353,354,355,356,365,366,374,375,380,381,382,383,391,392,399,400,406,407,408,417,418,424,425,432,442,443,449,450,457,466,467,474,475,482,491,492,499,500,507,516,524,525,549,550,557,566,574,575,582,591,599,600,601,602,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624];
	var index = x + (y*25);
	for (var i = 0; i < waterCollision.length; i++) {
		if (waterCollision[i] == index) {
			return true;
		}
	}
	return false;
}