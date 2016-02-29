var skills = require('./skills');
module.exports = function (user, socket) {
	this.name = user.name;
	this.id = user.id;
	this.x = user.x;
	this.y = user.y;
	this.skills = new skills(user);
	this.socket = socket;
}