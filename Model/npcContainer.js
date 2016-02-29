var mysql = require('./../Database/database');
var npcObj = require('./npc');
module.exports = new function () {
	this.npcs = [];
	this.add = function (npc) {
		this.npcs.push(npc);
	}
	this.getFromPoss = function(x,y){
		var returnArray = [];
		for (var i = 0; i < this.npcs.length; i++) {
			if(this.npcs[i].x == x && this.npcs[i].y == y){
				this.returnArray.push(this.npcs[i]);
			}
		};
		return returnArray;
	}
	/* pre load npc */
	var that = this;
	mysql.query("SELECT * FROM npc", function(npcs){
		for (var i = 0; i < npcs.length; i++) {
			var newNpc = new npcObj({"id":npcs[i].id,"name":npcs[i].name, "x": npcs[i].x, "y":npcs[i].y});
			that.add(newNpc);
		};
	});
};