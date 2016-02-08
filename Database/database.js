var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mudGame'
});
module.exports = {
	query: function (query, callback) {
		connection.query(query, function(err, rows, fields) {
		  	console.log("get query data");
		  	if (err){
		  		console.error('error connecting: ' + err);
		  	};
		  	callback(rows);
		});
	}
}