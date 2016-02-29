module.exports = new function () {
	this.users = [];
	this.add = function (user) {
		this.users.push(user);
	}
	this.remove = function (userName) {
		for (var i = 0; i < this.users.length; i++) {
			if(this.users[i].name == userName){
				this.users.splice(i, 1);
				return true;
			}
		}
		return false;
	}
}