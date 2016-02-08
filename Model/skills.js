module.exports = function (data) {
	this.Strength = data.Strength;
	this.Dexterity = data.Dexterity;
	this.Health = data.Health;
	this.HealthBack = data.Health;
	this.Energy = data.Energy;
	this.EnergyBack = data.Energy;
	this.Gold = data.Gold;
	this.QuestPoints = data.QuestPoints;
	this.Level = data.Level;
	this.ExpLevel = data.ExpLevel;
	this.toClient = function(){
		return {
			"ajaxStr": this.Strength,
			"ajaxDex": this.Dexterity,
			"ajaxHealth": this.Health +" /" + this.HealthBack,
			"ajaxEng": this.Energy +" /" + this.EnergyBack,
			"ajaxGold": this.Gold,
			"ajaxQP": this.QuestPoints,
			"ajaxLvl": this.Level,
			"ajaxExpL": this.ExpLevel
		}
	}
}